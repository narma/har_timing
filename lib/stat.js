
function Stat() {
    this._empty = true;
    this._finished = false;
    this.min = 555550;
    this.max = 0;
    this.avg = 0;
    this.count = 0;
    this.sum = 0;
}

Stat.prototype.consume = function(time) {
   if(time < this.min) this.min = time;
   if(time > this.max) this.max = time;
   this.count += 1;
   this.sum += time;
   this._empty = false;
}

Stat.prototype.finish = function() {
   if(this.count > 0)
     this.avg = (this.sum/this.count).toFixed();
   this._finished = true;
}

Stat.prototype.get_row = function() {
   if(this._empty) return [0,0,0,0,0];
   if(!this._finished) this.finish();
   return [this.min, this.max, this.avg, this.count, this.sum];
}


function GroupStat() {
  this.stats = {};
  this._finished = false;
  this.overall = null;
}

GroupStat.prototype.consume = function(time, group_by) {
    if(!(group_by in this.stats)) {
       this.stats[group_by] = new Stat();
    }
    var stat = this.stats[group_by];
    stat.consume(time);
}

GroupStat.prototype.finish = function() {
  var calc_overall = Object.keys(this.stats).length > 1;
  if(calc_overall) this.overall = new Stat();

  for(var i in this.stats) {
    var stat = this.stats[i];
    stat.finish();

    if(calc_overall) {
      this.overall._empty = false;
      if(this.overall.max < stat.max) this.overall.max = stat.max;
      if(this.overall.min > stat.min) this.overall.min = stat.min;
      this.overall.count += stat.count;
      this.overall.sum += stat.sum;
      this.overall.finish();
    }
  }
  this._finished = true;
}

GroupStat.prototype.get_rows = function(prepare_row) {
  if(!this._finished) this.finish();

  var res = [];
  for(var i in this.stats) {
    var stat = this.stats[i];
    var obj = {};
    obj[i] = stat.get_row();
    if(prepare_row) obj[i] = prepare_row(obj[i]);
    res.push(obj);
  }
  if(this.overall) {
    var overall_row = this.overall.get_row();
    if(prepare_row) overall_row = prepare_row(overall_row);
    res.push({"all": overall_row});
  }
  return res;
}



exports.Group = GroupStat;

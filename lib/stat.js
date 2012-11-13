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
  this.overall_stat = new Stat();
}

GroupStat.prototype.consume = function(time, group_by) {
    if(!(group_by in this.stats)) {
       this.stats[group_by] = new Stat();
    }
    var stat = this.stats[group_by];
    stat.consume(time);
    this.overall_stat.consume(time);
}

GroupStat.prototype.finish = function() {
  for(var i in this.stats) {
    var stat = this.stats[i];
    stat.finish();
  }
  this.overall_stat.finish();
}

GroupStat.prototype.get_rows = function(prepare_row) {
  var res = [];
  for(var i in this.stats) {
    var stat = this.stats[i];
    var obj = {};
    obj[i] = stat.get_row();
    if(prepare_row) obj[i] = prepare_row(obj[i]);
    res.push(obj);
  }
  var overall_row = this.overall_stat.get_row();
  if(prepare_row) overall_row = prepare_row(overall_row);
  res.push({"all": overall_row});
  return res;
}



exports.Group = GroupStat;

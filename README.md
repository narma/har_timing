har_timing
==========

Get timing stats from HTTP Archive Format, known as [HAR].
HAR supports in chromium or google chrome via developer tools and firefox with firebug addon.

Usage: har_timing <har> [opts]

    <har> may be gzipped. It's detected by file extension .gz

    Options:
      -m, --mime    Filter by response mime/type. Ex: -m image                                      
      -u, --url     Filter by request url. Ex: -u assets                                            
      -f, --filter  Filter by property of entry har, can pass many times.
                           For ex: -f request.method=GET
      -g, --group   Group by this property                                                            

Usage example, group by response.status and filter by mime matches to image:

    $ har_timing assets/maps.2gis.ru.har -g response.status -m image                                                  
    ┌─────┬──────┬───────┬───────┬───────┬──────────┐
    │     │ Min  │ Max   │ Avg   │ Count │ Sum      │
    ├─────┼──────┼───────┼───────┼───────┼──────────┤
    │ 200 │ 7ms  │ 682ms │ 188ms │ 576   │ 108416ms │
    ├─────┼──────┼───────┼───────┼───────┼──────────┤
    │ 304 │ 10ms │ 831ms │ 203ms │ 40    │ 8104ms   │
    ├─────┼──────┼───────┼───────┼───────┼──────────┤
    │ all │ 7ms  │ 831ms │ 189ms │ 616   │ 116520ms │
    └─────┴──────┴───────┴───────┴───────┴──────────┘

Install: npm install har_timing


  [HAR]: http://httparchive.org/



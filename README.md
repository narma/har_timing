har_timing
==========

Get timing stats from HTTP Archive Format, known as [HAR].

HAR supports in chromium or google chrome via developer tools and firefox with firebug addon.

Usage example, group by response.status and filter by mime matches to image:

    $ har_timing assets/maps.2gis.ru.har --group response.status -m image                                                  
    ┌─────┬──────┬───────┬───────┬───────┬──────────┐
    │     │ Min  │ Max   │ Avg   │ Count │ Sum      │
    ├─────┼──────┼───────┼───────┼───────┼──────────┤
    │ 200 │ 7ms  │ 682ms │ 188ms │ 576   │ 108416ms │
    ├─────┼──────┼───────┼───────┼───────┼──────────┤
    │ 304 │ 10ms │ 831ms │ 203ms │ 40    │ 8104ms   │
    ├─────┼──────┼───────┼───────┼───────┼──────────┤
    │ all │ 7ms  │ 831ms │ 189ms │ 616   │ 116520ms │
    └─────┴──────┴───────┴───────┴───────┴──────────┘

  [HAR]: http://httparchive.org/



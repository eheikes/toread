
# ToRead

ToRead is a simple bookmarking service, similar to browser bookmarks, [delicious.com](https://delicious.com), or [Shaarli](https://github.com/shaarli/Shaarli).

![screenshot](https://github.com/eheikes/toread/blob/docs/screenshot.png)

This originally began as a single PHP script, but was then rewritten in Angular with a separate PHP API backend.

*Warning* This was created for personal use. It is not guaranteed to be robust or secure enough for a public-facing website.

## What You Can Do

* Add a link for later reading
* View a (rough) snapshot of the page
* Add a link *with description* to save for reference
* Add "tags" to categorize your bookmarks
* See how many items are in your list
* See at a glance how many items were added/deleted today and in the past week
* Filter the list by tag
* Search the list for specific words
* Choose an item from list at random
* Delete selected items from the list

## Installation

This software requires a server running PHP 5.6+ (with the [mbstring](http://php.net/mbstring) extension) and a MySQL (or compatible) database.

1. Create a new database using the `toread.sql` schema.
2. Modify the `toread.ini` file with your server+database configuration.
3. Copy all files (except `toread.sql` and `toreadtest.php`) to your server.
4. Make sure that `toread.ini` is not accessible from the web! Here is an example for Apache:

    ```
    <Files "toread.ini">
      Deny from all
    </Files>
    ```

  You can modify the first line in `toreadapi.php` to point to somewhere else.

## File Manifest

* `toread.html` -- HTML partial for Angular
* `toread.ini` -- configuration file
* `toread.js` -- Angular app
* `toread.php` -- App boilerplate
* `toread.sql` -- database schema
* `toreadapi.php` -- API backend
* `toreadcommon.php` -- common routines
* `toreadcontrols.html` -- HTML partial for Angular
* `toreadsnapshot.php` -- snapshot view for a link
* `toreadtest.php` -- tests

## Contributing

Bug reports and contributions are welcome. [Create an issue or feature request](https://github.com/eheikes/toread/issues), or [submit a pull request](https://help.github.com/articles/creating-a-pull-request/) with your proposed changes.

To run tests, you must have [atoum](http://atoum.org/) installed. Then run it against the `toreadtest.php` file: `vendor/bin/atoum toreadtest.php`.

## Legal

Copyright 2015-2017 Eric Heikes.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this software except in compliance with the License. You may obtain a copy of the License at [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0).

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

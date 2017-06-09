# Remote Lock

For Ubuntu Desktop

## Local environment setup

1. Install npm dependencies & init dbs
```shell
$ npm install
```
2. Install bower dependencies
```shell
$ bower install
```
3. Start the web service
```shell
$ ./bin/service
```
4. Angular.js GUI http://localhost:3000/index.html
5. Express.js API routes
```
GET http://localhost:3000/info
GET http://localhost:3000/device/uuid(:deviceUuid)
GET http://localhost:3000/command/uuid(:commandUuid)
POST http://localhost:3000/incoming/commands
```

## License

By [Eviratec Software](https://www.eviratec.com.au)

```
Copyright (c) 2017 Callan Peter Milne

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
```

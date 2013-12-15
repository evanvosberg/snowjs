# [Snow JS](http://github.com/evanvosberg/snowjs)
A snowflake (module) based Javascript library.

## Library

- [Snow modules](http://github.com/evanvosberg/snowjs)
- [RequireJS](http://github.com/jrburke/requirejs)
- [jQuery](http://github.com/jquery/jquery)
- [jQuery UI](http://github.com/jquery/jquery-ui)
- [jQuery Color](http://github.com/jquery/jquery-color)
- [jQuery Datalink](http://github.com/jquery-orphans/jquery-datalink)
- [jQuery Metadata](http://github.com/github.com/jquery-orphans/jquery-metadata)
- [jQuery scrollTo](http://github.com/flesler/jquery.scrollTo)
- [JSON 2](http://github.com/douglascrockford/JSON-js)
- [QUnit](http://github.com/jquery/qunit)
 
## Getting started

### Clone repository

First, clone a copy of the main Snow JS git repo by running:

```bash
git clone git://github.com/evanvosberg/snowjs.git && cd snowjs
```

### Install grunt command line interface

```bash
npm install grunt-cli -g
```

Make sure you have `grunt` installed by testing:

```bash
grunt -version
```

### Initialize sub modules

#### jQuery UI

Enter the directory, install the Node dependencies and build a complete version of jQuery UI:

```bash
cd external/jquery-ui && npm install && grunt release && ../..
```

### Initialize Snow JS

Enter the directory, install the Node dependencies and run the setup task:

```bash
npm install && grunt setup
```

### Running grunt build / test tasks

Get a complete, minified (w/ Uglify.js), linted (w/ JSHint) distribution, type the following:

```bash
grunt
```

Get a just built distribution, type the following:

```bash
grunt build
```

Get a just test cases, type the following:

```bash
grunt test
```

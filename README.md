## Starter for NodeJS projects

[![Status](https://img.shields.io/travis/prismicio/nodejs-sdk/master.svg)](https://travis-ci.org/prismicio/nodejs-sdk)
[![Dependency Status](https://david-dm.org/prismicio/nodejs-sdk.svg)](https://david-dm.org/prismicio/nodejs-sdk)

This is a blank [NodeJS](http://nodejs.org/) (using [express](http://expressjs.com/)) project that will connect to any prismic.io repository, and trivially list its documents. It uses the prismic.io JavaScript development kit, and provides a few helpers to integrate with [express](http://expressjs.com/).

### Getting started

#### Launch the starter project

*(Assuming you've [installed Node.js and npm](http://www.joyent.com/blog/installing-node-and-npm/))*

Fork this repository, then clone your fork, and run this in your newly created directory:

```sh
npm install
node app
```

Your Node.js starter project is now up and running! However, by default, it will display some documentation to help you getting started with your Node.js project.

#### Configure the starter project

Edit the `prismic-configuration.js` file to get the application connected to the right repository:

```
exports.Configuration = {

  apiEndpoint: 'https://your-repo-name.prismic.io/api',

  // -- Access token if the Master is not open
  // accessToken: 'xxxxxx',

  ...
```

You may have to restart your server.

#### Get started with prismic.io

You can find out [how to get started with prismic.io](https://prismic.io/quickstart#?lang=node) and [our full documentation](https://prismic.io/docs).

#### Understand the JavaScript development kit

You'll find more information about how to use the development kit included in this starter project, by reading [its README file](https://github.com/prismicio/javascript-kit/blob/master/README.md).
In this particular starter, we use the [prismic-nodejs kit](https://github.com/prismicio/prismic-nodejs/blob/master/README.md) based on the javascript-kit and which implement the prismic preview for Node.js.

### Licence

This software is licensed under the Apache 2 license, quoted below.

Copyright 2017 Prismic.io (https://prismic.io).

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this project except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

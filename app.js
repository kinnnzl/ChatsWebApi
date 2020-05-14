'use strict';

const express = require('express');
const config = require('./config/config');
const bodyParser = require('body-parser');
const app = new express();

// register JSON parser middlewear
app.use(bodyParser.json());

require('./routes/chatRoutes')(app, express);
require('./routes/versionRoutes')(app, config);

app.listen(process.env.PORT || 3000, () => {
  /* eslint-disable */
  console.log('Server up!');
});

//import {polyfill()} from 'es6-promise';
//import rutoken from 'rutoken';
//global.rutoken = rutoken

require('es6-promise').polyfill();
require('console-polyfill');
global.rutoken = require('rutoken');
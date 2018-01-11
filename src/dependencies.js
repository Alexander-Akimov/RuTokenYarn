import Dog from './dog'
import rutoken from 'rutoken';// global.rutoken = require('rutoken');
import _ from 'console-polyfill'; // require('console-polyfill');
import __ from 'es6-promise/auto'; //require('es6-promise').polyfill();

global.rutoken = rutoken



window.onload = () => {
	const browserToby = new Dog('Browser Toby');
	document.querySelector('.app').innerText = browserToby.bark();
	console.log(rutoken)
}
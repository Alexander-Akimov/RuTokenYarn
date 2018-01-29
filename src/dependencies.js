import Dog from './dog'
import CryptoPlugin from './cryptoPlugin'
import rutoken from 'rutoken';// global.rutoken = require('rutoken');
import _ from 'console-polyfill'; // require('console-polyfill');
import __ from 'es6-promise/auto'; //require('es6-promise').polyfill();
//window.onload = () => {
	//const browserToby = new Dog('Browser Toby');	
	//document.querySelector('.app').innerText = browserToby.bark();
	//console.log(rutoken)   
//}
((w, d) => {
    global.rutoken = rutoken
    // console.log(w);
    // console.log(d);

    //var onPluginLoaded = () => {}

    function onPluginLoaded(pluginObject) {
        const cryptoPlugin = new CryptoPlugin(pluginObject, true);
        console.log(cryptoPlugin);
    };
    function showError(reason) {
    //ui.writeln(reason);
        console.log(reason);
    };
    rutoken.ready.then(function () {
      //  initUi();
        var isChrome = !!window.chrome;
        var isFirefox = typeof InstallTrigger !== 'undefined';
        var isWindows = window.navigator.appVersion.indexOf('Win') != -1;
        var verOffset, fullVersion, majorVersion;
        var performCheck = true;
        if ((verOffset = navigator.userAgent.indexOf('Firefox')) != -1) {
            fullVersion = navigator.userAgent.substring(verOffset + 8);
            majorVersion = parseInt(''+fullVersion,10);
            console.log(majorVersion);
            if (!isWindows && majorVersion >= 53)
                throw "Firefox 53+ не поддерживается плагином на mac/linux";
            if (majorVersion < 50)
                performCheck = false;
        }
        if (performCheck && (isChrome || isFirefox) && isWindows) {//for firefox 50+ only
            return rutoken.isExtensionInstalled();
        } else {
            return Promise.resolve(true);
        }
    }).then(function (result) {
        if (result) {
            return rutoken.isPluginInstalled();
        } else {
            throw "Расширение \"Адаптер Рутокен Плагин\" не установлено";
        }
    }).then(function (result) {
        if (result) {
            return rutoken.loadPlugin();
        } else {
            throw "Рутокен Плагин не установлен";
        }
    }).then(function (plugin) {
        return plugin;
        // return plugin.wrapWithOldInterface();
    }).then(function (wrappedPlugin) {
        onPluginLoaded(wrappedPlugin);
    }).then(undefined, function (reason) {
        showError(reason);
    });

}) (window, document);
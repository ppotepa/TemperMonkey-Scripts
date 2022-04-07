// ==UserScript==
// @name         FilmWeb Anti-Adblock Script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Lazy one but does the trick
// @author       You
// @match        https://www.filmweb.pl/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=filmweb.pl
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';
    var targetElement = document.querySelector('#uqrqi');
    var observer = new MutationObserver(function (mutations) {
        if (document.contains(targetElement)) {
            targetElement.remove();
            observer.disconnect();
        }
    });

    observer.observe(document, { attributes: false, childList: true, characterData: false, subtree: true });

})();
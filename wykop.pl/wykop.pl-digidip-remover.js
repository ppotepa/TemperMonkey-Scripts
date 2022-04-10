// ==UserScript==
// @name         Removes digidip check
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Lazy one but does the trick
// @author       Paweł Potępa
// @match        https://www.wykop.pl/*
// @website      https://github.com/ppotepa
// @icon         https://www.google.com/s2/favicons?sz=64&domain=filmweb.pl
// @grant        none
// @run-at       document-start
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

/* global $ */
/* global wykop */
(async function (wykop) {
    Object.defineProperty(window, 'wykop', {
        value: {},
        writable: false
    });

    Object.defineProperty(window.wykop, 'digidip', {
        value: (a, b, c, d, e, f, g) => false,
        writable: false
    });
}

)(window);



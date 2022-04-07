"use strict";
// ==UserScript==
// @name         FilmWeb Anti-Adblock Script
// @namespace    http://filmweb.pl/
// @version      0.1.1
// @description  Lazy one but does the trick
// @author       Paweł Potępa - pawel.potepa@hotmail.com
// @match        https://www.filmweb.pl/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=filmweb.pl
// @grant        none
// @run-at       document-start
// ==/UserScript==
(async function () {
    'use strict';
    const $$ = document.querySelector.bind(document);
    const $$all = document.querySelectorAll.bind(document);
    const pad = (d) => (d < 10) ? '0' + d.toString() : d.toString();
    //@ts-ignore
    Date.prototype.dateHash = function dateHash() {
        const today = new Date();
        const hash = new Number(`${today.getFullYear()}${pad(today.getMonth() + 1)}${pad(today.getDate())}`);
        return hash.toString(36);
    };
    //@ts-ignore
    const localStorageKey = `filmweb-adblock-selector__${new Date().dateHash()}`;
    var targetSelector = localStorage.getItem(localStorageKey);
    const filmCheaterSectionClass = '.FilmCheaterSection';
    const observer = new MutationObserver(function (mutations) {
        if (document.contains($$(targetSelector))) {
            $$(targetSelector)?.remove();
            observer.disconnect();
        }
        if (document.contains($$(filmCheaterSectionClass))) {
            const targetElement = $$(filmCheaterSectionClass);
            targetSelector = targetElement?.classList[0];
            localStorage.setItem(localStorageKey, `#${targetSelector}`);
            window.location.reload();
            observer.disconnect();
        }
    });
    await observer.observe(document, { attributes: false, childList: true, characterData: false, subtree: true });
})();

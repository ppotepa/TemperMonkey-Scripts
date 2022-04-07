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
    const pad = (d:number) => (d < 10) ? '0' + d.toString() : d.toString();

    //@ts-ignore
    Date.prototype.dateHash = function dateHash() : string {
            const today = new Date();
            const hash = new Number(`${today.getFullYear()}${pad(today.getMonth()+1)}${pad(today.getDate())}`);
            return hash.toString(36);
    }
    
    //@ts-ignore
    const localStorageKey = `filmweb-adblock-selector__${new Date().dateHash()}`;
    var targetSelector: string | null = localStorage.getItem(localStorageKey);

    const filmCheaterSectionClass : string = '.FilmCheaterSection';
 
    const observer = new MutationObserver(function (mutations) {
        
        if (document.contains($$(targetSelector as string))) {
            $$(targetSelector as string)?.remove();
            observer.disconnect();
        }

        if (document.contains($$(filmCheaterSectionClass as string))) {
            const targetElement = $$(filmCheaterSectionClass as string);
            targetSelector = targetElement?.classList[0] as string;
            localStorage.setItem(localStorageKey, `#${targetSelector}`);
            window.location.reload();
            observer.disconnect();
        }
        
    });

    await observer.observe(document, { attributes: false, childList: true, characterData: false, subtree: true });
  
})();


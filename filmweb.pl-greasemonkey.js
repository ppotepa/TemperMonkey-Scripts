// ==UserScript==
// @name         FilmWeb Anti-Adblock Script
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Lazy one but does the trick
// @author       Paweł Potępa
// @match        https://www.filmweb.pl/*
// @web-site     https://github.com/ppotepa
// @icon         https://www.google.com/s2/favicons?sz=64&domain=filmweb.pl
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
  "use strict";
  var targetSelector = document.contains(document.querySelector("#qiqxx"));
  var observer = new MutationObserver(function (mutations) {
    if (document.contains(targetSelector)) {
      targetSelector.remove();
      observer.disconnect();
    }
  });

  observer.observe(document, {
    attributes: false,
    childList: true,
    characterData: false,
    subtree: true,
  });
})();

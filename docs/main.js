!function(e){var o={};function n(t){if(o[t])return o[t].exports;var r=o[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=o,n.d=function(e,o,t){n.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,o){if(1&o&&(e=n(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var r in e)n.d(t,r,function(o){return e[o]}.bind(null,r));return t},n.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(o,"a",o),o},n.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},n.p="",n(n.s=0)}([function(e,o,n){"use strict";n.r(o);var t=async e=>{let o=[];for await(let n of e)o.push(n);return o};var r=async e=>new Promise((o,n)=>{for(let t of e){if(!(null!=t&&t instanceof Promise))return o(t);t.then(o,n)}});console.log("JS Async"),t([]).then(e=>{console.log("Test promise.all: To powinien być []:",JSON.stringify(e))}),t([s(1),s(2),s(3)]).then(e=>{console.log("Test promise.all: To powinien być [1, 2, 3]:",e)}),t([s(1),Promise.reject("X"),s(3)]).then(()=>{console.log("Test promise.all: WAT?! Nie powinno nas tu być..")}).catch(e=>{"X"!==e&&console.log("Test promise.all:Coś poszło nie tak..:",e),console.log("Test promise.all:To powinien być X:",e)}),r([1,2,3]).then(e=>{console.log("Test promise.race: This should be 1:",e)});const i=performance.now();function s(e){return new Promise(o=>{setTimeout(()=>o(e),500*Math.random())})}function l(e,o){return new Promise(n=>{setTimeout(()=>n(e),o)})}r([l(1,300),l(2,200),l(3,100)]).then(e=>{const o=performance.now()-i;if(o<100)throw"Test promise.race: Za szybko!";if(o>=200)throw"Test promise.race: Za wolno!";console.log("Test promise.race: To powinno być 3:",e)}),r([s(1),Promise.reject("X"),s(3)]).then(()=>{console.log("Test promise.race:WAT?! Nie powinno nas tu być..")}).catch(e=>{"X"!==e&&console.log("Test promise.race: Coś poszło nie tak..:",e),console.log("Test promise.race: To powinien być X:",e)})}]);
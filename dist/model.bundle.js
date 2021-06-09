/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/domain/model.class.ts":
/*!***********************************!*\
  !*** ./src/domain/model.class.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Photographer\": () => (/* binding */ Photographer),\n/* harmony export */   \"Media\": () => (/* binding */ Media),\n/* harmony export */   \"Image\": () => (/* binding */ Image),\n/* harmony export */   \"Video\": () => (/* binding */ Video)\n/* harmony export */ });\nclass Photographer {\r\n    /**\r\n     * @param name\r\n     * @param id\r\n     * @param city\r\n     * @param country\r\n     * @param price\r\n     * @param portrait\r\n     * @param tagLine\r\n     * @param tag\r\n     */\r\n    constructor(name, id, city, country, price, portrait, tagLine, tags) {\r\n        this.name = name;\r\n        this.id = id;\r\n        this.city = city;\r\n        this.country = country;\r\n        this.price = price;\r\n        this.portrait = portrait;\r\n        this.tagLine = tagLine;\r\n        this.tags = tags;\r\n        this.medias = new Array();\r\n    }\r\n    profileSummary() {\r\n        `\r\n        <div >\r\n    <a class=\"profile__header\" aria-label=\"visit profile\" href=\"build/profilePage.html?id=${this.id}\">\r\n      <img class=\"profile__header__profilepicture profile-rounded\" title=\"${this.name}\"  src=\"/dist/images/ProfilePicture/${this.portrait}\" alt=\"\">\r\n      <h2 class=\"profile__header__name\">${this.name}</h2>\r\n    </a>\r\n  </div>\r\n  <div class=\"profile__description\">\r\n    <p class=\"profile__description__city\"><span class=\"location\">${this.city}, ${this.country}</span></p>\r\n    <p class=\"profile__description__quote\">${this.tagLine}</p>\r\n    <p class=\"profile__description__rate\"><span class=\"rate\">${this.price}€/jour</span></p>\r\n  </div>\r\n  <div >\r\n    <ul id=\"${this.id}\" class=\"profile__hashtag\">\r\n    </ul>\r\n  </div>\r\n        `;\r\n    }\r\n}\r\nclass Media {\r\n    /**\r\n     *\r\n     * @param id\r\n     * @param photographerId\r\n     * @param date\r\n     * @param altTxt\r\n     * @param price\r\n     * @param tags\r\n     * @param likes\r\n     */\r\n    constructor(id, photographerId, date, altTxt, price, tags, likes) {\r\n        this.id = id;\r\n        this.photographerId = photographerId;\r\n        this.date = date;\r\n        this.altTxt = altTxt;\r\n        this.price = price;\r\n        this.tags = tags;\r\n        this.likes = likes;\r\n    }\r\n}\r\nclass Image extends Media {\r\n    constructor(id, photographerId, date, altTxt, price, tags, likes, image) {\r\n        super(id, photographerId, date, altTxt, price, tags, likes);\r\n        this.id = id;\r\n        this.photographerId = photographerId;\r\n        this.date = date;\r\n        this.altTxt = altTxt;\r\n        this.price = price;\r\n        this.tags = tags;\r\n        this.likes = likes;\r\n        this.image = image;\r\n    }\r\n}\r\nclass Video extends Media {\r\n    constructor(id, photographerId, date, altTxt, price, tags, likes, video) {\r\n        super(id, photographerId, date, altTxt, price, tags, likes);\r\n        this.video = video;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://typescript-starter/./src/domain/model.class.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/domain/model.class.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;
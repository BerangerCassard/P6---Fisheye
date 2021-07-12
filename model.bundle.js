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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Photographer\": () => (/* binding */ Photographer),\n/* harmony export */   \"Media\": () => (/* binding */ Media),\n/* harmony export */   \"Image\": () => (/* binding */ Image),\n/* harmony export */   \"Video\": () => (/* binding */ Video),\n/* harmony export */   \"MediaFactory\": () => (/* binding */ MediaFactory)\n/* harmony export */ });\nclass Photographer {\r\n    /**\r\n     * @param name\r\n     * @param id\r\n     * @param city\r\n     * @param country\r\n     * @param price\r\n     * @param portrait\r\n     * @param tagLine\r\n     * @param tag\r\n     */\r\n    constructor(name, id, city, country, price, portrait, tagLine, tags) {\r\n        this.name = name;\r\n        this.id = id;\r\n        this.city = city;\r\n        this.country = country;\r\n        this.price = price;\r\n        this.portrait = portrait;\r\n        this.tagLine = tagLine;\r\n        this.tags = tags;\r\n        this.medias = new Array();\r\n    }\r\n    profileSummary() {\r\n        return `\r\n    <div id=\"${this.id}\" class=\"components profile\">\r\n         <div>\r\n            <a class=\"profile__header\"aria-label=\"aller vers la page de ${this.name}\" href=\"photographer.html?id=${this.id}\">\r\n              <img class=\"profile__header__profilepicture profile-rounded\" title=\"${this.name}\" src=\"/assets/images/ProfilePicture/${this.portrait}\" alt=\"\">\r\n              <h2 class=\"profile__header__name\">${this.name}</h2>\r\n            </a>\r\n        </div>\r\n      <div class=\"profile__description\">\r\n        <p class=\"profile__description__city\"><span class=\"location\">${this.city}, ${this.country}</span></p>\r\n        <p class=\"profile__description__quote\">${this.tagLine}</p>\r\n        <p class=\"profile__description__rate\"><span class=\"rate\">${this.price}€/jour</span></p>\r\n      </div>\r\n      <div>\r\n        <ul class=\"profile__hashtag tagList\">\r\n        ${this.tagsList()}\r\n        </ul>\r\n      </div>\r\n    </div>`;\r\n    }\r\n    tagsList() {\r\n        const tagsHTML = [];\r\n        this.tags.forEach(tag => {\r\n            tagsHTML.push(`<li><button class=\"hashtag\" title=\"${tag}\" aria-label=\"filtrer par ${tag}\">#${tag}</button></li>`);\r\n        });\r\n        return tagsHTML.join('');\r\n    }\r\n    tagsListKeyHidden() {\r\n        const tagsHTML = [];\r\n        this.tags.forEach(tag => {\r\n            tagsHTML.push(`<li><button tabindex=\"-1\" class=\"hashtag\" title=\"${tag}\" aria-label=\"filtrer par ${tag}\">#${tag}</button></li>`);\r\n        });\r\n        return tagsHTML.join('');\r\n    }\r\n    profileHeaderAndSummary(sumLikes) {\r\n        document.getElementById('profile-header').innerHTML = `${this.name}`;\r\n        document.getElementById('profile-location').innerHTML = `${this.city}, ${this.country}`;\r\n        document.getElementById('profile-quote').innerHTML = `${this.tagLine}`;\r\n        document.getElementById('profile-picture').setAttribute('src', `./assets/images/ProfilePicture/${this.id}.jpg`);\r\n        document.getElementById('tagsList').innerHTML = `${this.tagsListKeyHidden()}`;\r\n        document.getElementById('summary-rate').innerHTML = `${this.price}€/jour`;\r\n        document.getElementById('summary-likes').innerHTML += sumLikes;\r\n        document.getElementById('contact-name').innerHTML = `${this.name}`;\r\n    }\r\n}\r\nclass Media {\r\n    /**\r\n     *\r\n     * @param id\r\n     * @param photographerId\r\n     * @param date\r\n     * @param altTxt\r\n     * @param price\r\n     * @param tags\r\n     * @param likes\r\n     */\r\n    constructor(id, photographerId, date, altTxt, price, tags, likes) {\r\n        this.id = id;\r\n        this.photographerId = photographerId;\r\n        this.date = date;\r\n        this.altTxt = altTxt;\r\n        this.price = price;\r\n        this.tags = tags;\r\n        this.likes = likes;\r\n    }\r\n}\r\nclass Image extends Media {\r\n    constructor(id, photographerId, date, altTxt, price, tags, likes, image) {\r\n        super(id, photographerId, date, altTxt, price, tags, likes);\r\n        this.id = id;\r\n        this.photographerId = photographerId;\r\n        this.date = date;\r\n        this.altTxt = altTxt;\r\n        this.price = price;\r\n        this.tags = tags;\r\n        this.likes = likes;\r\n        this.image = image;\r\n    }\r\n    publication() {\r\n        return `\r\n    <div class=\"publication\" data-date=\"${this.date}\" data-likes=\"${this.likes}\" data-id=\"${this.id}\">\r\n           <div class=\"publication__picture\">\r\n            <img tabindex=\"0\" id=\"${this.id}\" class=\"post\" src=\"./assets/images/${this.photographerId}/${this.image}\" alt=\"${this.altTxt}\" role=\"img\" aria-label=\"afficher ${this.altTxt}\">\r\n        </div>\r\n        <div class=\"publication__description\">\r\n          <div id=\"title\" class=\"publication__description__title caption\">${this.altTxt}</div>\r\n          <div class=\"publication__description__infos\">\r\n            <p id=\"price\" class=\"publication__description__infos__price caption\">${this.price}€</p>\r\n            <p tabindex=\"0\" id=\"like\" aria-label=\"nombre de likes\" title=\"likes\" class=\"publication__description__infos__like like\">${this.likes}<span>likes</span></p>\r\n          </div>\r\n        </div>  \r\n    </div>\r\n`;\r\n    }\r\n}\r\nclass Video extends Media {\r\n    constructor(id, photographerId, date, altTxt, price, tags, likes, video) {\r\n        super(id, photographerId, date, altTxt, price, tags, likes);\r\n        this.video = video;\r\n    }\r\n    publication() {\r\n        return `\r\n    <div class=\"publication\" data-date=\"${this.date}\" data-likes=\"${this.likes}\" data-id=\"${this.id}\">\r\n        <div    class=\"publication__picture\">\r\n            <video tabindex=\"0\" id=\"${this.id}\" class=\"post\" src=\"./assets/images/${this.photographerId}/${this.video}\" alt=\"${this.altTxt}\" role=\"img\" aria-label=\"afficher ${this.altTxt}\"></video>\r\n        </div>\r\n        <div class=\"publication__description\">\r\n          <div id=\"title\" class=\"publication__description__title caption\">${this.altTxt}</div>\r\n          <div class=\"publication__description__infos\">\r\n            <p id=\"price\" class=\"publication__description__infos__price caption\">${this.price}€</p>\r\n                <p tabindex=\"0\" id=\"like\" aria-label=\"nombre de likes\" title=\"likes\" class=\"publication__description__infos__like like\">${this.likes}<span>likes</span></p>\r\n          </div>\r\n        </div>\r\n    </div>`;\r\n    }\r\n}\r\nclass MediaFactory {\r\n    /**\r\n     * Create a Video or an Image Object according to file type\r\n     */\r\n    createMedia(id, photographerID, date, altTxt, price, tags, likes, type) {\r\n        if (type.includes('jpg')) {\r\n            return new Image(id, photographerID, date, altTxt, price, tags, likes, type);\r\n        }\r\n        else if (type.includes('mp4')) {\r\n            return new Video(id, photographerID, date, altTxt, price, tags, likes, type);\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://typescript-starter/./src/domain/model.class.ts?");

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
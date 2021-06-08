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

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _domain_model_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domain/model.class */ \"./src/domain/model.class.ts\");\n\r\n\r\n\r\n\r\n//import { createRequire } from 'module';\r\n//const require = createRequire(import.meta.url)\r\nconst photographerA = new _domain_model_class__WEBPACK_IMPORTED_MODULE_0__.Photographer('Jean', 456, \"nantes\", 'France', 45654, \"portrait\", 'portrait', [\"string\"]);\r\nconst mediaA = new _domain_model_class__WEBPACK_IMPORTED_MODULE_0__.Media(454, 5645, 'date', 'altxt', 456, ['string'], 325);\r\nphotographerA.medias.push(mediaA);\r\n//const fetch = require(\"node-fetch\");\r\nconst dataFile = \"./assets/data/photographers.json\";\r\nfetch(dataFile, {\r\n    headers: {\r\n        'Content-Type': 'application/json',\r\n        'Accept': 'application/json'\r\n    }\r\n})\r\n    .then((res) => {\r\n    try {\r\n        const data = res.json;\r\n        console.log('response data ?', data);\r\n    }\r\n    catch (e) {\r\n        console.log('error happened here!');\r\n        console.error(e);\r\n    }\r\n})\r\n    .then((json) => {\r\n    let allPhotographersInstances = [];\r\n    json.photographers.forEach((photographer) => {\r\n        let profile = new _domain_model_class__WEBPACK_IMPORTED_MODULE_0__.Photographer(photographer.name, photographer.id, photographer.city, photographer.country, photographer.tags, photographer.tagline, photographer.price, photographer.portrait);\r\n        allPhotographersInstances.push(profile);\r\n    });\r\n    let images = json.media.filter((media) => media.image);\r\n    let videos = json.media.filter(((media) => media.video));\r\n    //console.log(\"images\", images)\r\n    //console.log(\"videos\", videos)\r\n    const imagesInstances = [];\r\n    images.forEach((image) => {\r\n        let imageMedia = new _domain_model_class__WEBPACK_IMPORTED_MODULE_0__.Image(image.id, image.photographerId, image.date, image.altTxt, image.price, image.tags, image.likes, image.image);\r\n        imagesInstances.push(imageMedia);\r\n    });\r\n    //console.log('images instances', imagesInstances)\r\n    const videosInstances = [];\r\n    videos.forEach((video) => {\r\n        let videoMedia = new _domain_model_class__WEBPACK_IMPORTED_MODULE_0__.Video(video.id, video.photographerId.id, video.date, video.altTxt, video.price, video.tags, video.likes, video.stringify);\r\n        videosInstances.push(videoMedia);\r\n    });\r\n    let AllMediasInstances = imagesInstances.concat(videosInstances);\r\n    //console.log('All Medias', AllMediasInstances)\r\n    allPhotographersInstances.forEach(photographer => {\r\n        let ownedMedias = AllMediasInstances.filter(media => media.photographerId = photographer.id);\r\n        photographer.medias = ownedMedias;\r\n    });\r\n    //console.log('all photographers', allPhotographersInstances)\r\n    console.log('test');\r\n    allPhotographersInstances.forEach(photographer => {\r\n        const container = document.getElementById('profiles');\r\n        container.innerHTML = `${photographer.profileSummary()}`;\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack://typescript-starter/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
var myIndex;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
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
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "onContactLoad": () => (/* binding */ onContactLoad)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function onContactLoad() {
    const button = document.getElementById("contactSendButton");
    button.addEventListener("click", contactSend, false);
}
function createNotificationList(messages) {
    const ret = document.createElement("ul");
    for (const message of messages) {
        const ch = document.createElement("li");
        ch.innerText = message;
        ret.appendChild(ch);
    }
    return ret;
}
function contactSend(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const formEl = document.getElementById("contactForm");
        const data = new URLSearchParams();
        for (const pair of new FormData(formEl)) {
            data.append(pair[0], pair[1].toString());
        }
        const name = data.get("entry.93707027");
        const email = data.get("entry.325718895");
        const note = document.getElementById("contactNotfication");
        for (const ch of note.children) {
            note.removeChild(ch);
        }
        const notifications = [];
        if (name === "") {
            notifications.push("お名前を入力して下さい");
        }
        if (email === "") {
            notifications.push("メールアドレスを入力して下さい");
        }
        if (notifications.length > 0) {
            note.appendChild(createNotificationList(notifications));
            return;
        }
        const url = "https://docs.google.com/forms/d/e/1FAIpQLScRgUE_SNZhxSgkddiMjiU8biXClYXVoD0C85Hc8oTYjKsZSQ/formResponse";
        const ret = yield fetch(url, {
            method: "post",
            body: data,
        });
        console.log("contactSend", ret.status);
        note.innerText = ret.status.toString();
    });
}

myIndex = __webpack_exports__;
/******/ })()
;
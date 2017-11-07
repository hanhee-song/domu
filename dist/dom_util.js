/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

const callbackArray = [];
let documentReady = false;

window.u = function(argument) {
  let elArray;
  if (typeof argument === 'string') {
    elArray = Array.from(document.querySelectorAll(argument));
    return new DOMNodeCollection(elArray);
  } else if (argument instanceof HTMLElement) {
    return new DOMNodeCollection([argument]);
  } else if (typeof argument === 'function') {
    return documentReadyCallback(argument);
  }
};

documentReadyCallback = (callback) => {
  if (!documentReady) {
    callbackArray.push(callback);
  } else {
    callback();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  documentReady = true;
  callbackArray.forEach(callback => callback());
});

u.extend = function(...objects) {
  return Object.assign.apply(Object, [{}].concat(objects));
};

u.ajax = function(options) {
  const defaults = {
    dataType: "json",
    method: "GET",
    url: "",
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: () => {},
    error: () => {},
    data: {},
  };

  options = u.extend(defaults, options);

  const xhr = new XMLHttpRequest();

  xhr.open(options.method, options.url);
  xhr.responseType = options.dataType;
  xhr.setRequestHeader("Content-type", options.contentType);

  xhr.onload = options.success;
  xhr.onerror = options.error;

  xhr.send(options.data);
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(elArray) {
    this.elArray = elArray;
    
    this.elArray.forEach((el) => {
      if (el.callbacks === undefined) {
        el.callbacks = {};
      }
    });
  }
  
  each(callback) {
    this.elArray.forEach(callback);
  }
  
  html(content) {
    if (content === undefined) {
      return this.elArray[0].innerHTML;
    } else {
      this.each((el) => {
        el.innerHTML = content;
      });
      return this;
    }
  }
  
  empty() {
    this.html('');
  }
  
  append(argument) {
    if (typeof argument === 'string') {
      this.each((el) => {
        el.innerHTML += argument;
      });
    } else if (argument instanceof HTMLElement) {
      this.each((el) => {
        el.append(argument.cloneNode(true));
      });
    } else if (argument instanceof DOMNodeCollection) {
      this.each((el1) => {
        argument.each((el2) => {
          el1.append(el2.cloneNode(true));
        });
      });
    }
  }
  
  attr(property, value) {
    if (value === undefined) {
      return this.elArray[0].getAttribute(property);
    } else {
      this.each((el) => {
        el.setAttribute(property, value);
      });
    }
  }
  
  addClass(value) {
    this.each((el) => {
      el.classList.add(value);
    });
  }
  
  removeClass(value) {
    this.each((el) => {
      el.classList.remove(value);
    });
  }
  
  toggleClass(value) {
    this.each((el) => {
      el.classList.toggle(value);
    });
  }
  
  children() {
    const childrenArray = [];
    this.each((el) => {
      for (var i = 0; i < el.children.length; i++) {
        childrenArray.push(el.children[i]);
      }
    });
    return new DOMNodeCollection(childrenArray);
  }
  
  parent() {
    const parentsArray = [];
    
    this.each((el) => {
      if (!parentsArray.includes(el.parentElement)) {
        parentsArray.push(el.parentElement);
      }
    });
    return new DOMNodeCollection(parentsArray);
  }
  
  find(selector) {
    const foundArray = [];
    this.each((el) => {
      const foundChildren = el.querySelectorAll(selector);
      for (var i = 0; i < foundChildren.length; i++) {
        foundArray.push(foundChildren[i]);
      }
    });
    return new DOMNodeCollection(foundArray);
  }
  
  remove() {
    this.each((el) => {
      el.remove();
    });
  }
  
  on(eventName, callback) {
    this.each((el) => {
      el.addEventListener(eventName, callback);
      const key = `event-${eventName}`;
      if (el[key] === undefined) {
        el[key] = [];
      }
      el[key].push(callback);
    });
  }
  
  off(eventName) {
    this.each((el) => {
      const key = `event-${eventName}`;
      el[key] = el[key] || [];
      el[key].forEach((callback) => {
        el.removeEventListener(eventName, callback);
      });
    });
  }
}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);
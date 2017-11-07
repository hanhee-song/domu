const DOMNodeCollection = require('./dom_node_collection.js');

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

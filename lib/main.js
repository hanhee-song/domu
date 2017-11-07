const DOMNodes = require('./dom_nodes.js');

const callbackArray = [];
let documentReady = false;

window.u = function(argument) {
  let elArray;
  if (typeof argument === 'string') {
    elArray = Array.from(document.querySelectorAll(argument));
    return new DOMNodes(elArray);
  } else if (argument instanceof HTMLElement) {
    return new DOMNodes([argument]);
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

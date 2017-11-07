const DOMNodes = require('./dom_nodes.js');

window.u = function(argument) {
  let elArray;
  if (typeof argument === 'string') {
    elArray = Array.from(document.querySelectorAll(argument));
    return new DOMNodes(elArray);
  } else if (argument instanceof "HTMLElement") {
    return new DOMNodes([argument]);
  }
};

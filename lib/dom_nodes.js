class DOMNodes {
  constructor(elArray) {
    this.elArray = elArray;
  }
  
  html(content) {
    if (content === undefined) {
      return this.elArray[0].innerHTML;
    } else {
      this.elArray.forEach((el) => {
        el.innerHTML = content;
      });
      return this;
    }
  }
}

module.exports = DOMNodes;

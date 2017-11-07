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
  
  empty() {
    this.elArray.forEach((el) => {
      el.innerHTML = "";
    });
  }
  
  append(argument) {
    if (typeof argument === 'string') {
      this.elArray.forEach((el) => {
        el.innerHTML += argument;
      });
    } else if (argument instanceof HTMLElement) {
      this.elArray.forEach((el) => {
        el.append(argument.cloneNode(true));
      });
    } else if (argument instanceof DOMNodes) {
      this.elArray.forEach((el1) => {
        argument.elArray.forEach((el2) => {
          el1.append(el2.cloneNode(true));
        });
      });
    }
  }
  
  
}

module.exports = DOMNodes;

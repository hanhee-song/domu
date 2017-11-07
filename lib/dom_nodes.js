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
  
  attr(property, value) {
    if (value === undefined) {
      return this.elArray[0].getAttribute(property);
    } else {
      this.elArray.forEach((el) => {
        el.setAttribute(property, value);
      });
    }
  }
  
  addClass(value) {
    this.elArray.forEach((el) => {
      el.classList.add(value);
    });
  }
  
  removeClass(value) {
    this.elArray.forEach((el) => {
      el.classList.remove(value);
    });
  }
  
  children() {
    const childrenArray = [];
    this.elArray.forEach((el) => {
      for (var i = 0; i < el.children.length; i++) {
        childrenArray.push(el.children[i]);
      }
    });
    return new DOMNodes(childrenArray);
  }
  
  parent() {
    const parentsArray = [];
    
    this.elArray.forEach((el) => {
      if (!parentsArray.includes(el.parentElement)) {
        parentsArray.push(el.parentElement);
      }
    });
    return new DOMNodes(parentsArray);
  }
  
  find(selector) {
    const foundArray = [];
    this.elArray.forEach((el) => {
      const foundChildren = el.querySelectorAll(selector);
      for (var i = 0; i < foundChildren.length; i++) {
        foundArray.push(foundChildren[i]);
      }
    });
    return new DOMNodes(foundArray);
  }
  
  
}

module.exports = DOMNodes;

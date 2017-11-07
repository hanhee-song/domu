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

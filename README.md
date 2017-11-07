# DOMUtil

DOMUtil is a JavaScript library for streamlining DOM interaction. Features include:

* Appending or removing content from DOM elements
* Accessing and modifying element attributes and classes
* Searching by parent, children, or selector
* Attaching events to elements
* Queuing functions until the document is loaded
* Making XML HTTP requests

## Getting Started

To use DOMutil in your project, run ```webpack --watch lib/main.js lib/dom_util.js```. In your HTML file, include
```HTML
<head>
  ...
  <script type="text/javascript" src="../lib/dom_util.js"></script>
</head>
```

## API

* [u](#u)

#### DOM Traversal
* [parent](#parent)
* [children](#children)
* [find](#find)

#### DOM Manipulation
* [each](#each)
* [html](#html)
* [empty](#empty)
* [append](#append)
* [attr](#attr)
* [addClass](#addClass)
* [removeClass](#removeClass)
* [toggleClass](#toggleClass)

#### u

This library uses ```u``` as a wrapper for all of its methods. It has the following uses:
* selecting elements via CSS selectors: selector arguments, e.g. ```u("li")```, will return a ```DOMNodeCollection``` object, which holds an array of ```HTMLElement```s.
* creating a ```DOMNodeCollection``` object: unwrapped ```HTMLElement``` arguments will create a ```DOMNodeCollection``` object wrapping the ```HTMLElement```, giving access to all of DOMUtil's methods
* queuing functions to run when the document is loaded. The following will print to the console when fully loaded.
```javascript
  u(() => {
    console.log("The document is ready!");
  })
```

### DOM Traversal

#### ```parent```

Syntax: ```DOMNodeCollection.parent()```

Returns a ```DOMNodeCollection``` of every parent of elements in the ```DOMNodeCollection``` with no duplicates.

Example:

```javascript
// retrieve every parent of li elements
u("li").parent();
```

#### ```children```

Syntax: ```DOMNodeCollection.children()```

Returns a ```DOMNodeCollection``` of every children of elements in the ```DOMNodeCollection``` with no duplicates.

Example:

```javascript
// retrieve all children of the element with the id 'root'
u("#root").children();
```

#### ```find```

Syntax: ```DOMNodeCollection.find(selector)```

Returns a ```DOMNodeCollection``` of children elements that match the selector

Example:

```javascript
// return all elements with a class of message-index-item
// that are children of ul elements
u("ul").find(".message-index-item");
```

### DOM Manipulation

#### ```each```

Syntax: ```DOMNodeCollection.each(callback)```

Applies a callback function to each element in the ```DOMNodeCollection```.

Example:

```javascript
// delete every li element
u("li").each(el => {
  el.remove();
})
```

#### ```html```

Syntax: ```DOMNodeCollection.html([text])```

Returns the HTML content of the first element in the ```DOMNodeCollection```. If passed a string as an optional argument, it will change the HTML content of each element to the given string.

#### ```empty```

Syntax: ```DOMNodeCollection.empty()```

Empties the HTML content of each element. Equivalent to ```DOMNodeCollection.html("")```.

#### ```append```

Syntax: ```DOMNodeCollection.append(argument)```

Appends a ```string```, ```HTMLElement```, or ```DOMNodeCollection``` object to the end of each element.

#### ```attr```

Syntax: ```DOMNodeCollection.attr(property[, value])```

Returns the value of the given attribute of the first element in the ```DOMNodeCollection```. If an optional value argument is provided, all elements in the ```DOMNodeCollection``` are given the value as the property.

#### ```addClass```

Syntax: ```DOMNodeCollection.addClass(value)```

Takes a string as an argument and appends the given class to the list of classes for each element in the ```DOMNodeCollection```.

#### ```removeClass```

Syntax: ```DOMNodeCollection.removeClass(value)```

Takes a string as an argument and removes the given class from the list of classes for each element in the ```DOMNodeCollection```.

#### ```toggleClass```

Syntax: ```DOMNodeCollection.toggleClass(value)```

Takes a string as an argument and toggles the class for each element in the ```DOMNodeCollection```.

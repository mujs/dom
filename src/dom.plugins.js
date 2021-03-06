/**
* html content
* ------------
*
* *   html
* *   empty
* *   append
*/

define('mu.dom.html', function (require) {
  'use strict';

  var isDefined = require('mu.is.defined');

  var html = function (node, content) {
    if (isDefined(content)) { node.innerHTML = content; }
    else { return node.innerHTML; }
  };

  return html;
});

define('mu.dom.empty', function () {
  'use strict';

  var empty = function (node) {
    node.innerHTML = '';
  };

  return empty;
});

define('mu.dom.append', function (require) {
  'use strict';

  var isString = require('mu.is.string');

  var append = function (node, content) {
    if (isString(content)) {
      node.innerHTML += content;
      return;
    }

    node.appendChild(content);
  };

  return append;
});

/**
* properties
* ----------
*
* *   attr
* *   css
*/

define('mu.dom.attr', function (require) {
  'use strict';

  var isDefined = require('mu.is.defined'),
      isString  = require('mu.is.string'),
      apply     = require('mu.fn.apply'),
      partial   = require('mu.fn.partial'),
      each      = require('mu.list.each');
      reduce    = require('mu.list.reduce');

  var elementAttributes = function (node) {
    return reduce(node.attributes, {}, function (acc, item) {
      acc[item.name] = item.value;
      return acc;
    });
  };

  var attribute = function (node, attr, value) {
    if (isDefined(value)) { node[attr] = value; }
    else { return node[attr]; }
  };

  var attributes = function (node, attrs) {
    each(attrs, partial(attribute, node));
  };

  var attr = function (node, /* attr | attr, value | { attr: value } */) {
    var args = [].slice.call(arguments, 1);
    if (!args.length) { return elementAttributes(node); }
    if (isString(args[0])) { return apply(partial(attribute, node), args); }
    return apply(partial(attributes, node), args);
  };

  return attr;
});

define('mu.dom.css', function (require) {
  'use strict';

  var isDefined = require('mu.is.defined'),
      isString  = require('mu.is.string'),
      apply     = require('mu.fn.apply'),
      partial   = require('mu.fn.partial'),
      each      = require('mu.list.each');

  var style = function (node, attr, value) {
    if (isDefined(value)) { node.style[attr] = value; }
    else { return node.style[attr]; }
  };

  var styles = function (node, attrs) {
    each(attrs, partial(style, node));
  };

  var css = function (node, /* attr | attr, value | { attr: value } */) {
    var args = [].slice.call(arguments, 1);
    if (isString(args[0])) { return apply(partial(style, node), args); }
    return apply(partial(styles, node), args);
  };

  return css;
});

/**
* class
* -----
*
* *   classList
* *   hasClass
* *   addClass
* *   removeClass
* *   toggleClass
*/

define('mu.dom.classList', function () {
  'use strict';

  var classList = function (node) {
    var raw = node.className,
        list = raw.length ? raw.split(' ') : [];

    return list;
  };

  return classList;
});

define('mu.dom.hasClass', function (require) {
  'use strict';

  var contains  = require('mu.list.contains'),
      classList = require('mu.dom.classList');

  var hasClass = function (node, className) {
    return contains(classList(node), className);
  };

  return hasClass;
});

define('mu.dom.addClass', function (require) {
  'use strict';

  var contains  = require('mu.list.contains'),
      classList = require('mu.dom.classList');

  var addClass = function (node, className) {
    var list = classList(node);
    if (contains(list, className)) { return }
    list.push(className);
    node.className = list.join(' ');
  };

  return addClass;
});

define('mu.dom.removeClass', function (require) {
  'use strict';

  var isDefined = require('mu.is.defined'),
      remove    = require('mu.list.remove'),
      classList = require('mu.dom.classList');

  var removeClass = function (node, className) {
    var list = classList(node);
    if (!isDefined(remove(list, className))) { return; }
    node.className = list.join(' ');
  };

  return removeClass;
});

define('mu.dom.toggleClass', function (require) {
  'use strict';

  var hasClass    = require('mu.dom.hasClass'),
      addClass    = require('mu.dom.addClass'),
      removeClass = require('mu.dom.removeClass');

  var toggleClass = function (node, className) {
    if (hasClass(node, className)) { removeClass(node, className); }
    else { addClass(node, className); }
  };

  return toggleClass;
});

/**
* user input
* ----------
*
* *   val
*/

define('mu.dom.val', function (require) {
  'use strict';

  var isDefined = require('mu.is.defined')

  var val = function (node, newVal) {
    if (isDefined(newVal)) { node.value = newVal }
    return node.value;
  };

  return val;
});

/**
* event listeners
* ---------------
*
* *   on
*/

define('mu.dom.on', function () {
  'use strict';

  var on = function (node, event, fn) {
    node.addEventListener(event, fn);
  };

  return on;
});

/**
* tree manipulation
* -----------------
*
* *   clone
* *   remove
*/

define('mu.dom.clone', function () {
  'use strict';

  var clone = function (node) {
    return node.cloneNode(true);
  };

  return clone;
});

define('mu.dom.remove', function () {
  'use strict';

  var remove = function (node) {
    node.parentNode.removeChild(node);
  };

  return remove;
});


var global$1 = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};

// shim for using process in browser
// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
if (typeof global$1.setTimeout === 'function') {
  cachedSetTimeout = setTimeout;
}
if (typeof global$1.clearTimeout === 'function') {
  cachedClearTimeout = clearTimeout;
}
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  }
  // if setTimeout wasn't available but was latter defined
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  }
  // if clearTimeout wasn't available but was latter defined
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
function nextTick(fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}
// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};
var title = 'browser';
var platform = 'browser';
var browser$2 = true;
var env = {};
var argv = [];
var version$1 = ''; // empty string to avoid regexp issues
var versions = {};
var release = {};
var config = {};
function noop() {}
var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;
function binding(name) {
  throw new Error('process.binding is not supported');
}
function cwd() {
  return '/';
}
function chdir(dir) {
  throw new Error('process.chdir is not supported');
}
function umask() {
  return 0;
}

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance = global$1.performance || {};
var performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {
  return new Date().getTime();
};

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp) {
  var clocktime = performanceNow.call(performance) * 1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor(clocktime % 1 * 1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds, nanoseconds];
}
var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}
var process = {
  nextTick: nextTick,
  title: title,
  browser: browser$2,
  env: env,
  argv: argv,
  version: version$1,
  versions: versions,
  on: on,
  addListener: addListener,
  once: once,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform,
  release: release,
  config: config,
  uptime: uptime
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var react = {exports: {}};

function _typeof$2(obj) {
  "@babel/helpers - typeof";

  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$2(obj);
}

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }
  return Object(val);
}
function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    }

    // Detect buggy property enumeration order in older V8 versions.

    // https://bugs.chromium.org/p/v8/issues/detail?id=4118
    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
    test1[5] = 'de';
    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    }

    // https://bugs.chromium.org/p/v8/issues/detail?id=3056
    var test2 = {};
    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }
    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });
    if (order2.join('') !== '0123456789') {
      return false;
    }

    // https://bugs.chromium.org/p/v8/issues/detail?id=3056
    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });
    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }
    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}
var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;
  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);
    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);
      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }
  return to;
};

var emptyObject = {};
if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}
var emptyObject_1 = emptyObject;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction$2 = function emptyFunction() {};
emptyFunction$2.thatReturns = makeEmptyFunction;
emptyFunction$2.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction$2.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction$2.thatReturnsNull = makeEmptyFunction(null);
emptyFunction$2.thatReturnsThis = function () {
  return this;
};
emptyFunction$2.thatReturnsArgument = function (arg) {
  return arg;
};
var emptyFunction_1 = emptyFunction$2;

var m$1 = objectAssign,
  n$1 = emptyObject_1,
  p$1 = emptyFunction_1,
  q$1 = "function" === typeof Symbol && Symbol["for"],
  r$1 = q$1 ? Symbol["for"]("react.element") : 60103,
  t$1 = q$1 ? Symbol["for"]("react.call") : 60104,
  u = q$1 ? Symbol["for"]("react.return") : 60105,
  v$1 = q$1 ? Symbol["for"]("react.portal") : 60106,
  w$1 = q$1 ? Symbol["for"]("react.fragment") : 60107,
  x$1 = "function" === typeof Symbol && Symbol.iterator;
function y$1(a) {
  for (var b = arguments.length - 1, e = "Minified React error #" + a + "; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d" + a, c = 0; c < b; c++) e += "\x26args[]\x3d" + encodeURIComponent(arguments[c + 1]);
  b = Error(e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");
  b.name = "Invariant Violation";
  b.framesToPop = 1;
  throw b;
}
var z$1 = {
  isMounted: function isMounted() {
    return !1;
  },
  enqueueForceUpdate: function enqueueForceUpdate() {},
  enqueueReplaceState: function enqueueReplaceState() {},
  enqueueSetState: function enqueueSetState() {}
};
function A$1(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = n$1;
  this.updater = e || z$1;
}
A$1.prototype.isReactComponent = {};
A$1.prototype.setState = function (a, b) {
  "object" !== _typeof$2(a) && "function" !== typeof a && null != a ? y$1("85") : void 0;
  this.updater.enqueueSetState(this, a, b, "setState");
};
A$1.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function B(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = n$1;
  this.updater = e || z$1;
}
function C() {}
C.prototype = A$1.prototype;
var D = B.prototype = new C();
D.constructor = B;
m$1(D, A$1.prototype);
D.isPureReactComponent = !0;
function E(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = n$1;
  this.updater = e || z$1;
}
var F = E.prototype = new C();
F.constructor = E;
m$1(F, A$1.prototype);
F.unstable_isAsyncReactComponent = !0;
F.render = function () {
  return this.props.children;
};
var G = {
    current: null
  },
  H = Object.prototype.hasOwnProperty,
  I = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  };
function J(a, b, e) {
  var c,
    d = {},
    g = null,
    k = null;
  if (null != b) for (c in void 0 !== b.ref && (k = b.ref), void 0 !== b.key && (g = "" + b.key), b) H.call(b, c) && !I.hasOwnProperty(c) && (d[c] = b[c]);
  var f = arguments.length - 2;
  if (1 === f) d.children = e;else if (1 < f) {
    for (var h = Array(f), l = 0; l < f; l++) h[l] = arguments[l + 2];
    d.children = h;
  }
  if (a && a.defaultProps) for (c in f = a.defaultProps, f) void 0 === d[c] && (d[c] = f[c]);
  return {
    $$typeof: r$1,
    type: a,
    key: g,
    ref: k,
    props: d,
    _owner: G.current
  };
}
function K(a) {
  return "object" === _typeof$2(a) && null !== a && a.$$typeof === r$1;
}
function escape$1(a) {
  var b = {
    "\x3d": "\x3d0",
    ":": "\x3d2"
  };
  return "$" + ("" + a).replace(/[=:]/g, function (a) {
    return b[a];
  });
}
var L = /\/+/g,
  M = [];
function N(a, b, e, c) {
  if (M.length) {
    var d = M.pop();
    d.result = a;
    d.keyPrefix = b;
    d.func = e;
    d.context = c;
    d.count = 0;
    return d;
  }
  return {
    result: a,
    keyPrefix: b,
    func: e,
    context: c,
    count: 0
  };
}
function O(a) {
  a.result = null;
  a.keyPrefix = null;
  a.func = null;
  a.context = null;
  a.count = 0;
  10 > M.length && M.push(a);
}
function P(a, b, e, c) {
  var d = _typeof$2(a);
  if ("undefined" === d || "boolean" === d) a = null;
  var g = !1;
  if (null === a) g = !0;else switch (d) {
    case "string":
    case "number":
      g = !0;
      break;
    case "object":
      switch (a.$$typeof) {
        case r$1:
        case t$1:
        case u:
        case v$1:
          g = !0;
      }
  }
  if (g) return e(c, a, "" === b ? "." + Q(a, 0) : b), 1;
  g = 0;
  b = "" === b ? "." : b + ":";
  if (Array.isArray(a)) for (var k = 0; k < a.length; k++) {
    d = a[k];
    var f = b + Q(d, k);
    g += P(d, f, e, c);
  } else if (null === a || "undefined" === typeof a ? f = null : (f = x$1 && a[x$1] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), k = 0; !(d = a.next()).done;) d = d.value, f = b + Q(d, k++), g += P(d, f, e, c);else "object" === d && (e = "" + a, y$1("31", "[object Object]" === e ? "object with keys {" + Object.keys(a).join(", ") + "}" : e, ""));
  return g;
}
function Q(a, b) {
  return "object" === _typeof$2(a) && null !== a && null != a.key ? escape$1(a.key) : b.toString(36);
}
function R(a, b) {
  a.func.call(a.context, b, a.count++);
}
function S(a, b, e) {
  var c = a.result,
    d = a.keyPrefix;
  a = a.func.call(a.context, b, a.count++);
  Array.isArray(a) ? T(a, c, e, p$1.thatReturnsArgument) : null != a && (K(a) && (b = d + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(L, "$\x26/") + "/") + e, a = {
    $$typeof: r$1,
    type: a.type,
    key: b,
    ref: a.ref,
    props: a.props,
    _owner: a._owner
  }), c.push(a));
}
function T(a, b, e, c, d) {
  var g = "";
  null != e && (g = ("" + e).replace(L, "$\x26/") + "/");
  b = N(b, g, c, d);
  null == a || P(a, "", S, b);
  O(b);
}
var U = {
    Children: {
      map: function map(a, b, e) {
        if (null == a) return a;
        var c = [];
        T(a, c, null, b, e);
        return c;
      },
      forEach: function forEach(a, b, e) {
        if (null == a) return a;
        b = N(null, null, b, e);
        null == a || P(a, "", R, b);
        O(b);
      },
      count: function count(a) {
        return null == a ? 0 : P(a, "", p$1.thatReturnsNull, null);
      },
      toArray: function toArray(a) {
        var b = [];
        T(a, b, null, p$1.thatReturnsArgument);
        return b;
      },
      only: function only(a) {
        K(a) ? void 0 : y$1("143");
        return a;
      }
    },
    Component: A$1,
    PureComponent: B,
    unstable_AsyncComponent: E,
    Fragment: w$1,
    createElement: J,
    cloneElement: function cloneElement(a, b, e) {
      var c = m$1({}, a.props),
        d = a.key,
        g = a.ref,
        k = a._owner;
      if (null != b) {
        void 0 !== b.ref && (g = b.ref, k = G.current);
        void 0 !== b.key && (d = "" + b.key);
        if (a.type && a.type.defaultProps) var f = a.type.defaultProps;
        for (h in b) H.call(b, h) && !I.hasOwnProperty(h) && (c[h] = void 0 === b[h] && void 0 !== f ? f[h] : b[h]);
      }
      var h = arguments.length - 2;
      if (1 === h) c.children = e;else if (1 < h) {
        f = Array(h);
        for (var l = 0; l < h; l++) f[l] = arguments[l + 2];
        c.children = f;
      }
      return {
        $$typeof: r$1,
        type: a.type,
        key: d,
        ref: g,
        props: c,
        _owner: k
      };
    },
    createFactory: function createFactory(a) {
      var b = J.bind(null, a);
      b.type = a;
      return b;
    },
    isValidElement: K,
    version: "16.2.0",
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
      ReactCurrentOwner: G,
      assign: m$1
    }
  },
  V = Object.freeze({
    default: U
  }),
  W = V && U || V;
var react_production_min = W["default"] ? W["default"] : W;

var react_development = {exports: {}};

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};
if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}
function invariant$1(condition, format, a, b, c, d, e, f) {
  validateFormat(format);
  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }
    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}
var invariant_1 = invariant$1;

var emptyFunction$1 = emptyFunction_1;

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction$1;
if (process.env.NODE_ENV !== 'production') {
  var printWarning$2 = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }
      printWarning$2.apply(undefined, [format].concat(args));
    }
  };
}
var warning_1 = warning;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ReactPropTypesSecret$3 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
var ReactPropTypesSecret_1 = ReactPropTypesSecret$3;

var has$2 = Function.call.bind(Object.prototype.hasOwnProperty);

var printWarning$1 = function printWarning() {};
if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret$2 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
  var has$1 = has$2;
  printWarning$1 = function printWarning(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {/**/}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes$1(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has$1(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + _typeof$2(typeSpecs[typeSpecName]) + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$2);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning$1((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + _typeof$2(error) + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;
          var stack = getStack ? getStack() : '';
          printWarning$1('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes$1.resetWarningCache = function () {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {};
  }
};
var checkPropTypes_1 = checkPropTypes$1;

if (process.env.NODE_ENV !== "production") {
  (function () {

    var _assign = objectAssign;
    var emptyObject = emptyObject_1;
    var invariant = invariant_1;
    var warning = warning_1;
    var emptyFunction = emptyFunction_1;
    var checkPropTypes = checkPropTypes_1;

    // TODO: this is special because it gets imported during build.

    var ReactVersion = '16.2.0';

    // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.
    var hasSymbol = typeof Symbol === 'function' && Symbol['for'];
    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol['for']('react.element') : 0xeac7;
    var REACT_CALL_TYPE = hasSymbol ? Symbol['for']('react.call') : 0xeac8;
    var REACT_RETURN_TYPE = hasSymbol ? Symbol['for']('react.return') : 0xeac9;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol['for']('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol['for']('react.fragment') : 0xeacb;
    var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator';
    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || typeof maybeIterable === 'undefined') {
        return null;
      }
      var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
      if (typeof maybeIterator === 'function') {
        return maybeIterator;
      }
      return null;
    }

    /**
     * WARNING: DO NOT manually require this module.
     * This is a replacement for `invariant(...)` used by the error code system
     * and will _only_ be required by the corresponding babel pass.
     * It always throws.
     */

    /**
     * Forked from fbjs/warning:
     * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
     *
     * Only change is we use console.warn instead of console.error,
     * and do nothing when 'console' is not supported.
     * This really simplifies the code.
     * ---
     * Similar to invariant but only logs a warning if the condition is not met.
     * This can be used to log issues in development environments in critical
     * paths. Removing the logging code for production environments will keep the
     * same logic and follow the same code paths.
     */

    var lowPriorityWarning = function lowPriorityWarning() {};
    {
      var printWarning = function printWarning(format) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        var argIndex = 0;
        var message = 'Warning: ' + format.replace(/%s/g, function () {
          return args[argIndex++];
        });
        if (typeof console !== 'undefined') {
          console.warn(message);
        }
        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          throw new Error(message);
        } catch (x) {}
      };
      lowPriorityWarning = function lowPriorityWarning(condition, format) {
        if (format === undefined) {
          throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
        }
        if (!condition) {
          for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
          }
          printWarning.apply(undefined, [format].concat(args));
        }
      };
    }
    var lowPriorityWarning$1 = lowPriorityWarning;
    var didWarnStateUpdateForUnmountedComponent = {};
    function warnNoop(publicInstance, callerName) {
      {
        var constructor = publicInstance.constructor;
        var componentName = constructor && (constructor.displayName || constructor.name) || 'ReactClass';
        var warningKey = componentName + '.' + callerName;
        if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
          return;
        }
        warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, componentName);
        didWarnStateUpdateForUnmountedComponent[warningKey] = true;
      }
    }

    /**
     * This is the abstract API for an update queue.
     */
    var ReactNoopUpdateQueue = {
      /**
       * Checks whether or not this composite component is mounted.
       * @param {ReactClass} publicInstance The instance we want to test.
       * @return {boolean} True if mounted, false otherwise.
       * @protected
       * @final
       */
      isMounted: function isMounted(publicInstance) {
        return false;
      },
      /**
       * Forces an update. This should only be invoked when it is known with
       * certainty that we are **not** in a DOM transaction.
       *
       * You may want to call this when you know that some deeper aspect of the
       * component's state has changed but `setState` was not called.
       *
       * This will not invoke `shouldComponentUpdate`, but it will invoke
       * `componentWillUpdate` and `componentDidUpdate`.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueForceUpdate: function enqueueForceUpdate(publicInstance, callback, callerName) {
        warnNoop(publicInstance, 'forceUpdate');
      },
      /**
       * Replaces all of the state. Always use this or `setState` to mutate state.
       * You should treat `this.state` as immutable.
       *
       * There is no guarantee that `this.state` will be immediately updated, so
       * accessing `this.state` after calling this method may return the old value.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} completeState Next state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueReplaceState: function enqueueReplaceState(publicInstance, completeState, callback, callerName) {
        warnNoop(publicInstance, 'replaceState');
      },
      /**
       * Sets a subset of the state. This only exists because _pendingState is
       * internal. This provides a merging strategy that is not available to deep
       * properties which is confusing. TODO: Expose pendingState or don't use it
       * during the merge.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} partialState Next partial state to be merged with state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} Name of the calling function in the public API.
       * @internal
       */
      enqueueSetState: function enqueueSetState(publicInstance, partialState, callback, callerName) {
        warnNoop(publicInstance, 'setState');
      }
    };

    /**
     * Base class helpers for the updating state of a component.
     */
    function Component(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      // We initialize the default updater but the real one gets injected by the
      // renderer.
      this.updater = updater || ReactNoopUpdateQueue;
    }
    Component.prototype.isReactComponent = {};

    /**
     * Sets a subset of the state. Always use this to mutate
     * state. You should treat `this.state` as immutable.
     *
     * There is no guarantee that `this.state` will be immediately updated, so
     * accessing `this.state` after calling this method may return the old value.
     *
     * There is no guarantee that calls to `setState` will run synchronously,
     * as they may eventually be batched together.  You can provide an optional
     * callback that will be executed when the call to setState is actually
     * completed.
     *
     * When a function is provided to setState, it will be called at some point in
     * the future (not synchronously). It will be called with the up to date
     * component arguments (state, props, context). These values can be different
     * from this.* because your function may be called after receiveProps but before
     * shouldComponentUpdate, and this new state, props, and context will not yet be
     * assigned to this.
     *
     * @param {object|function} partialState Next partial state or function to
     *        produce next partial state to be merged with current state.
     * @param {?function} callback Called after state is updated.
     * @final
     * @protected
     */
    Component.prototype.setState = function (partialState, callback) {
      !(_typeof$2(partialState) === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
      this.updater.enqueueSetState(this, partialState, callback, 'setState');
    };

    /**
     * Forces an update. This should only be invoked when it is known with
     * certainty that we are **not** in a DOM transaction.
     *
     * You may want to call this when you know that some deeper aspect of the
     * component's state has changed but `setState` was not called.
     *
     * This will not invoke `shouldComponentUpdate`, but it will invoke
     * `componentWillUpdate` and `componentDidUpdate`.
     *
     * @param {?function} callback Called after update is complete.
     * @final
     * @protected
     */
    Component.prototype.forceUpdate = function (callback) {
      this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
    };

    /**
     * Deprecated APIs. These APIs used to exist on classic React classes but since
     * we would like to deprecate them, we're not going to move them over to this
     * modern base class. Instead, we define a getter that warns if it's accessed.
     */
    {
      var deprecatedAPIs = {
        isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
        replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
      };
      var defineDeprecationWarning = function defineDeprecationWarning(methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
          get: function get() {
            lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
            return undefined;
          }
        });
      };
      for (var fnName in deprecatedAPIs) {
        if (deprecatedAPIs.hasOwnProperty(fnName)) {
          defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        }
      }
    }

    /**
     * Base class helpers for the updating state of a component.
     */
    function PureComponent(props, context, updater) {
      // Duplicated from Component.
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      // We initialize the default updater but the real one gets injected by the
      // renderer.
      this.updater = updater || ReactNoopUpdateQueue;
    }
    function ComponentDummy() {}
    ComponentDummy.prototype = Component.prototype;
    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
    pureComponentPrototype.constructor = PureComponent;
    // Avoid an extra prototype jump for these methods.
    _assign(pureComponentPrototype, Component.prototype);
    pureComponentPrototype.isPureReactComponent = true;
    function AsyncComponent(props, context, updater) {
      // Duplicated from Component.
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      // We initialize the default updater but the real one gets injected by the
      // renderer.
      this.updater = updater || ReactNoopUpdateQueue;
    }
    var asyncComponentPrototype = AsyncComponent.prototype = new ComponentDummy();
    asyncComponentPrototype.constructor = AsyncComponent;
    // Avoid an extra prototype jump for these methods.
    _assign(asyncComponentPrototype, Component.prototype);
    asyncComponentPrototype.unstable_isAsyncReactComponent = true;
    asyncComponentPrototype.render = function () {
      return this.props.children;
    };

    /**
     * Keeps track of the current owner.
     *
     * The current owner is the component who should own any components that are
     * currently being constructed.
     */
    var ReactCurrentOwner = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var RESERVED_PROPS = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };
    var specialPropKeyWarningShown;
    var specialPropRefWarningShown;
    function hasValidRef(config) {
      {
        if (hasOwnProperty.call(config, 'ref')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.ref !== undefined;
    }
    function hasValidKey(config) {
      {
        if (hasOwnProperty.call(config, 'key')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.key !== undefined;
    }
    function defineKeyPropWarningGetter(props, displayName) {
      var warnAboutAccessingKey = function warnAboutAccessingKey() {
        if (!specialPropKeyWarningShown) {
          specialPropKeyWarningShown = true;
          warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
        }
      };
      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, 'key', {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }
    function defineRefPropWarningGetter(props, displayName) {
      var warnAboutAccessingRef = function warnAboutAccessingRef() {
        if (!specialPropRefWarningShown) {
          specialPropRefWarningShown = true;
          warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
        }
      };
      warnAboutAccessingRef.isReactWarning = true;
      Object.defineProperty(props, 'ref', {
        get: warnAboutAccessingRef,
        configurable: true
      });
    }

    /**
     * Factory method to create a new React element. This no longer adheres to
     * the class pattern, so do not use new to call it. Also, no instanceof check
     * will work. Instead test $$typeof field against Symbol.for('react.element') to check
     * if something is a React Element.
     *
     * @param {*} type
     * @param {*} key
     * @param {string|object} ref
     * @param {*} self A *temporary* helper to detect places where `this` is
     * different from the `owner` when React.createElement is called, so that we
     * can warn. We want to get rid of owner and replace string `ref`s with arrow
     * functions, and as long as `this` and owner are the same, there will be no
     * change in behavior.
     * @param {*} source An annotation object (added by a transpiler or otherwise)
     * indicating filename, line number, and/or other information.
     * @param {*} owner
     * @param {*} props
     * @internal
     */
    var ReactElement = function ReactElement(type, key, ref, self, source, owner, props) {
      var element = {
        // This tag allow us to uniquely identify this as a React Element
        $$typeof: REACT_ELEMENT_TYPE,
        // Built-in properties that belong on the element
        type: type,
        key: key,
        ref: ref,
        props: props,
        // Record the component responsible for creating this element.
        _owner: owner
      };
      {
        // The validation flag is currently mutative. We put it on
        // an external backing store so that we can freeze the whole object.
        // This can be replaced with a WeakMap once they are implemented in
        // commonly used development environments.
        element._store = {};

        // To make comparing ReactElements easier for testing purposes, we make
        // the validation flag non-enumerable (where possible, which should
        // include every environment we run tests in), so the test framework
        // ignores it.
        Object.defineProperty(element._store, 'validated', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: false
        });
        // self and source are DEV only properties.
        Object.defineProperty(element, '_self', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: self
        });
        // Two elements created in two different places should be considered
        // equal for testing purposes and therefore we hide it from enumeration.
        Object.defineProperty(element, '_source', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: source
        });
        if (Object.freeze) {
          Object.freeze(element.props);
          Object.freeze(element);
        }
      }
      return element;
    };

    /**
     * Create and return a new ReactElement of the given type.
     * See https://reactjs.org/docs/react-api.html#createelement
     */
    function createElement(type, config, children) {
      var propName;

      // Reserved names are extracted
      var props = {};
      var key = null;
      var ref = null;
      var self = null;
      var source = null;
      if (config != null) {
        if (hasValidRef(config)) {
          ref = config.ref;
        }
        if (hasValidKey(config)) {
          key = '' + config.key;
        }
        self = config.__self === undefined ? null : config.__self;
        source = config.__source === undefined ? null : config.__source;
        // Remaining properties are added to a new props object
        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
          }
        }
      }

      // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }
        {
          if (Object.freeze) {
            Object.freeze(childArray);
          }
        }
        props.children = childArray;
      }

      // Resolve default props
      if (type && type.defaultProps) {
        var defaultProps = type.defaultProps;
        for (propName in defaultProps) {
          if (props[propName] === undefined) {
            props[propName] = defaultProps[propName];
          }
        }
      }
      {
        if (key || ref) {
          if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
            var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }
            if (ref) {
              defineRefPropWarningGetter(props, displayName);
            }
          }
        }
      }
      return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
    }

    /**
     * Return a function that produces ReactElements of a given type.
     * See https://reactjs.org/docs/react-api.html#createfactory
     */

    function cloneAndReplaceKey(oldElement, newKey) {
      var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
      return newElement;
    }

    /**
     * Clone and return a new ReactElement using element as the starting point.
     * See https://reactjs.org/docs/react-api.html#cloneelement
     */
    function cloneElement(element, config, children) {
      var propName;

      // Original props are copied
      var props = _assign({}, element.props);

      // Reserved names are extracted
      var key = element.key;
      var ref = element.ref;
      // Self is preserved since the owner is preserved.
      var self = element._self;
      // Source is preserved since cloneElement is unlikely to be targeted by a
      // transpiler, and the original source is probably a better indicator of the
      // true owner.
      var source = element._source;

      // Owner will be preserved, unless ref is overridden
      var owner = element._owner;
      if (config != null) {
        if (hasValidRef(config)) {
          // Silently steal the ref from the parent.
          ref = config.ref;
          owner = ReactCurrentOwner.current;
        }
        if (hasValidKey(config)) {
          key = '' + config.key;
        }

        // Remaining properties override existing props
        var defaultProps;
        if (element.type && element.type.defaultProps) {
          defaultProps = element.type.defaultProps;
        }
        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            if (config[propName] === undefined && defaultProps !== undefined) {
              // Resolve default props
              props[propName] = defaultProps[propName];
            } else {
              props[propName] = config[propName];
            }
          }
        }
      }

      // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }
        props.children = childArray;
      }
      return ReactElement(element.type, key, ref, self, source, owner, props);
    }

    /**
     * Verifies the object is a ReactElement.
     * See https://reactjs.org/docs/react-api.html#isvalidelement
     * @param {?object} object
     * @return {boolean} True if `object` is a valid component.
     * @final
     */
    function isValidElement(object) {
      return _typeof$2(object) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var ReactDebugCurrentFrame = {};
    {
      // Component that is being worked on
      ReactDebugCurrentFrame.getCurrentStack = null;
      ReactDebugCurrentFrame.getStackAddendum = function () {
        var impl = ReactDebugCurrentFrame.getCurrentStack;
        if (impl) {
          return impl();
        }
        return null;
      };
    }
    var SEPARATOR = '.';
    var SUBSEPARATOR = ':';

    /**
     * Escape and wrap key so it is safe to use as a reactid
     *
     * @param {string} key to be escaped.
     * @return {string} the escaped key.
     */
    function escape(key) {
      var escapeRegex = /[=:]/g;
      var escaperLookup = {
        '=': '=0',
        ':': '=2'
      };
      var escapedString = ('' + key).replace(escapeRegex, function (match) {
        return escaperLookup[match];
      });
      return '$' + escapedString;
    }

    /**
     * TODO: Test that a single child and an array with one item have the same key
     * pattern.
     */

    var didWarnAboutMaps = false;
    var userProvidedKeyEscapeRegex = /\/+/g;
    function escapeUserProvidedKey(text) {
      return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
    }
    var POOL_SIZE = 10;
    var traverseContextPool = [];
    function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
      if (traverseContextPool.length) {
        var traverseContext = traverseContextPool.pop();
        traverseContext.result = mapResult;
        traverseContext.keyPrefix = keyPrefix;
        traverseContext.func = mapFunction;
        traverseContext.context = mapContext;
        traverseContext.count = 0;
        return traverseContext;
      } else {
        return {
          result: mapResult,
          keyPrefix: keyPrefix,
          func: mapFunction,
          context: mapContext,
          count: 0
        };
      }
    }
    function releaseTraverseContext(traverseContext) {
      traverseContext.result = null;
      traverseContext.keyPrefix = null;
      traverseContext.func = null;
      traverseContext.context = null;
      traverseContext.count = 0;
      if (traverseContextPool.length < POOL_SIZE) {
        traverseContextPool.push(traverseContext);
      }
    }

    /**
     * @param {?*} children Children tree container.
     * @param {!string} nameSoFar Name of the key path so far.
     * @param {!function} callback Callback to invoke with each child found.
     * @param {?*} traverseContext Used to pass information throughout the traversal
     * process.
     * @return {!number} The number of children in this subtree.
     */
    function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
      var type = _typeof$2(children);
      if (type === 'undefined' || type === 'boolean') {
        // All of the above are perceived as null.
        children = null;
      }
      var invokeCallback = false;
      if (children === null) {
        invokeCallback = true;
      } else {
        switch (type) {
          case 'string':
          case 'number':
            invokeCallback = true;
            break;
          case 'object':
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_CALL_TYPE:
              case REACT_RETURN_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
            }
        }
      }
      if (invokeCallback) {
        callback(traverseContext, children,
        // If it's the only child, treat the name as if it was wrapped in an array
        // so that it's consistent if the number of children grows.
        nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
        return 1;
      }
      var child;
      var nextName;
      var subtreeCount = 0; // Count of children found in the current subtree.
      var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;
      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; i++) {
          child = children[i];
          nextName = nextNamePrefix + getComponentKey(child, i);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        var iteratorFn = getIteratorFn(children);
        if (typeof iteratorFn === 'function') {
          {
            // Warn about using Maps as children
            if (iteratorFn === children.entries) {
              warning(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', ReactDebugCurrentFrame.getStackAddendum());
              didWarnAboutMaps = true;
            }
          }
          var iterator = iteratorFn.call(children);
          var step;
          var ii = 0;
          while (!(step = iterator.next()).done) {
            child = step.value;
            nextName = nextNamePrefix + getComponentKey(child, ii++);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        } else if (type === 'object') {
          var addendum = '';
          {
            addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
          }
          var childrenString = '' + children;
          invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
        }
      }
      return subtreeCount;
    }

    /**
     * Traverses children that are typically specified as `props.children`, but
     * might also be specified through attributes:
     *
     * - `traverseAllChildren(this.props.children, ...)`
     * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
     *
     * The `traverseContext` is an optional argument that is passed through the
     * entire traversal. It can be used to store accumulations or anything else that
     * the callback might find relevant.
     *
     * @param {?*} children Children tree object.
     * @param {!function} callback To invoke upon traversing each child.
     * @param {?*} traverseContext Context for traversal.
     * @return {!number} The number of children in this subtree.
     */
    function traverseAllChildren(children, callback, traverseContext) {
      if (children == null) {
        return 0;
      }
      return traverseAllChildrenImpl(children, '', callback, traverseContext);
    }

    /**
     * Generate a key string that identifies a component within a set.
     *
     * @param {*} component A component that could contain a manual key.
     * @param {number} index Index that is used if a manual key is not provided.
     * @return {string}
     */
    function getComponentKey(component, index) {
      // Do some typechecking here since we call this blindly. We want to ensure
      // that we don't block potential future ES APIs.
      if (_typeof$2(component) === 'object' && component !== null && component.key != null) {
        // Explicit key
        return escape(component.key);
      }
      // Implicit key determined by the index in the set
      return index.toString(36);
    }
    function forEachSingleChild(bookKeeping, child, name) {
      var func = bookKeeping.func,
        context = bookKeeping.context;
      func.call(context, child, bookKeeping.count++);
    }

    /**
     * Iterates through children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.foreach
     *
     * The provided forEachFunc(child, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} forEachFunc
     * @param {*} forEachContext Context for forEachContext.
     */
    function forEachChildren(children, forEachFunc, forEachContext) {
      if (children == null) {
        return children;
      }
      var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
      traverseAllChildren(children, forEachSingleChild, traverseContext);
      releaseTraverseContext(traverseContext);
    }
    function mapSingleChildIntoContext(bookKeeping, child, childKey) {
      var result = bookKeeping.result,
        keyPrefix = bookKeeping.keyPrefix,
        func = bookKeeping.func,
        context = bookKeeping.context;
      var mappedChild = func.call(context, child, bookKeeping.count++);
      if (Array.isArray(mappedChild)) {
        mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
      } else if (mappedChild != null) {
        if (isValidElement(mappedChild)) {
          mappedChild = cloneAndReplaceKey(mappedChild,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
        }
        result.push(mappedChild);
      }
    }
    function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
      var escapedPrefix = '';
      if (prefix != null) {
        escapedPrefix = escapeUserProvidedKey(prefix) + '/';
      }
      var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
      traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
      releaseTraverseContext(traverseContext);
    }

    /**
     * Maps children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.map
     *
     * The provided mapFunction(child, key, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} func The map function.
     * @param {*} context Context for mapFunction.
     * @return {object} Object containing the ordered map of results.
     */
    function mapChildren(children, func, context) {
      if (children == null) {
        return children;
      }
      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, func, context);
      return result;
    }

    /**
     * Count the number of children that are typically specified as
     * `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.count
     *
     * @param {?*} children Children tree container.
     * @return {number} The number of children.
     */
    function countChildren(children, context) {
      return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
    }

    /**
     * Flatten a children object (typically specified as `props.children`) and
     * return an array with appropriately re-keyed children.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.toarray
     */
    function toArray(children) {
      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
      return result;
    }

    /**
     * Returns the first child in a collection of children and verifies that there
     * is only one child in the collection.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.only
     *
     * The current implementation of this function assumes that a single child gets
     * passed without a wrapper, but the purpose of this helper function is to
     * abstract away the particular structure of children.
     *
     * @param {?object} children Child collection structure.
     * @return {ReactElement} The first and only `ReactElement` contained in the
     * structure.
     */
    function onlyChild(children) {
      !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
      return children;
    }
    var describeComponentFrame = function describeComponentFrame(name, source, ownerName) {
      return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
    };
    function getComponentName(fiber) {
      var type = fiber.type;
      if (typeof type === 'string') {
        return type;
      }
      if (typeof type === 'function') {
        return type.displayName || type.name;
      }
      return null;
    }

    /**
     * ReactElementValidator provides a wrapper around a element factory
     * which validates the props passed to the element. This is intended to be
     * used only in DEV and could be replaced by a static type checker for languages
     * that support it.
     */

    {
      var currentlyValidatingElement = null;
      var propTypesMisspellWarningShown = false;
      var getDisplayName = function getDisplayName(element) {
        if (element == null) {
          return '#empty';
        } else if (typeof element === 'string' || typeof element === 'number') {
          return '#text';
        } else if (typeof element.type === 'string') {
          return element.type;
        } else if (element.type === REACT_FRAGMENT_TYPE) {
          return 'React.Fragment';
        } else {
          return element.type.displayName || element.type.name || 'Unknown';
        }
      };
      var getStackAddendum = function getStackAddendum() {
        var stack = '';
        if (currentlyValidatingElement) {
          var name = getDisplayName(currentlyValidatingElement);
          var owner = currentlyValidatingElement._owner;
          stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
        }
        stack += ReactDebugCurrentFrame.getStackAddendum() || '';
        return stack;
      };
      var VALID_FRAGMENT_PROPS = new Map([['children', true], ['key', true]]);
    }
    function getDeclarationErrorAddendum() {
      if (ReactCurrentOwner.current) {
        var name = getComponentName(ReactCurrentOwner.current);
        if (name) {
          return '\n\nCheck the render method of `' + name + '`.';
        }
      }
      return '';
    }
    function getSourceInfoErrorAddendum(elementProps) {
      if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
        var source = elementProps.__source;
        var fileName = source.fileName.replace(/^.*[\\\/]/, '');
        var lineNumber = source.lineNumber;
        return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
      }
      return '';
    }

    /**
     * Warn if there's no key explicitly set on dynamic arrays of children or
     * object keys are not valid. This allows us to keep track of children between
     * updates.
     */
    var ownerHasKeyUseWarning = {};
    function getCurrentComponentErrorInfo(parentType) {
      var info = getDeclarationErrorAddendum();
      if (!info) {
        var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
        if (parentName) {
          info = '\n\nCheck the top-level render call using <' + parentName + '>.';
        }
      }
      return info;
    }

    /**
     * Warn if the element doesn't have an explicit key assigned to it.
     * This element is in an array. The array could grow and shrink or be
     * reordered. All children that haven't already been validated are required to
     * have a "key" property assigned to it. Error statuses are cached so a warning
     * will only be shown once.
     *
     * @internal
     * @param {ReactElement} element Element that requires a key.
     * @param {*} parentType element's parent's type.
     */
    function validateExplicitKey(element, parentType) {
      if (!element._store || element._store.validated || element.key != null) {
        return;
      }
      element._store.validated = true;
      var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
      if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
        return;
      }
      ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

      // Usually the current owner is the offender, but if it accepts children as a
      // property, it may be the creator of the child that's responsible for
      // assigning it a key.
      var childOwner = '';
      if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
        // Give the component that originally created this child.
        childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
      }
      currentlyValidatingElement = element;
      {
        warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum());
      }
      currentlyValidatingElement = null;
    }

    /**
     * Ensure that every element either is passed in a static location, in an
     * array with an explicit keys property defined, or in an object literal
     * with valid key property.
     *
     * @internal
     * @param {ReactNode} node Statically passed child of any type.
     * @param {*} parentType node's parent's type.
     */
    function validateChildKeys(node, parentType) {
      if (_typeof$2(node) !== 'object') {
        return;
      }
      if (Array.isArray(node)) {
        for (var i = 0; i < node.length; i++) {
          var child = node[i];
          if (isValidElement(child)) {
            validateExplicitKey(child, parentType);
          }
        }
      } else if (isValidElement(node)) {
        // This element was passed in a valid location.
        if (node._store) {
          node._store.validated = true;
        }
      } else if (node) {
        var iteratorFn = getIteratorFn(node);
        if (typeof iteratorFn === 'function') {
          // Entry iterators used to provide implicit keys,
          // but now we print a separate warning for them later.
          if (iteratorFn !== node.entries) {
            var iterator = iteratorFn.call(node);
            var step;
            while (!(step = iterator.next()).done) {
              if (isValidElement(step.value)) {
                validateExplicitKey(step.value, parentType);
              }
            }
          }
        }
      }
    }

    /**
     * Given an element, validate that its props follow the propTypes definition,
     * provided by the type.
     *
     * @param {ReactElement} element
     */
    function validatePropTypes(element) {
      var componentClass = element.type;
      if (typeof componentClass !== 'function') {
        return;
      }
      var name = componentClass.displayName || componentClass.name;
      var propTypes = componentClass.propTypes;
      if (propTypes) {
        currentlyValidatingElement = element;
        checkPropTypes(propTypes, element.props, 'prop', name, getStackAddendum);
        currentlyValidatingElement = null;
      } else if (componentClass.PropTypes !== undefined && !propTypesMisspellWarningShown) {
        propTypesMisspellWarningShown = true;
        warning(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
      }
      if (typeof componentClass.getDefaultProps === 'function') {
        warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
      }
    }

    /**
     * Given a fragment, validate that it can only be provided with fragment props
     * @param {ReactElement} fragment
     */
    function validateFragmentProps(fragment) {
      currentlyValidatingElement = fragment;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;
      try {
        for (var _iterator = Object.keys(fragment.props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;
          if (!VALID_FRAGMENT_PROPS.has(key)) {
            warning(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.%s', key, getStackAddendum());
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
      if (fragment.ref !== null) {
        warning(false, 'Invalid attribute `ref` supplied to `React.Fragment`.%s', getStackAddendum());
      }
      currentlyValidatingElement = null;
    }
    function createElementWithValidation(type, props, children) {
      var validType = typeof type === 'string' || typeof type === 'function' || _typeof$2(type) === 'symbol' || typeof type === 'number';
      // We warn in this case but don't throw. We expect the element creation to
      // succeed and there will likely be errors in render.
      if (!validType) {
        var info = '';
        if (type === undefined || _typeof$2(type) === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
        }
        var sourceInfo = getSourceInfoErrorAddendum(props);
        if (sourceInfo) {
          info += sourceInfo;
        } else {
          info += getDeclarationErrorAddendum();
        }
        info += getStackAddendum() || '';
        warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : _typeof$2(type), info);
      }
      var element = createElement.apply(this, arguments);

      // The result can be nullish if a mock or a custom function is used.
      // TODO: Drop this when these are no longer allowed as the type argument.
      if (element == null) {
        return element;
      }

      // Skip key warning if the type isn't valid since our key validation logic
      // doesn't expect a non-string/function type and can throw confusing errors.
      // We don't want exception behavior to differ between dev and prod.
      // (Rendering will throw with a helpful message and as soon as the type is
      // fixed, the key warnings will appear.)
      if (validType) {
        for (var i = 2; i < arguments.length; i++) {
          validateChildKeys(arguments[i], type);
        }
      }
      if (_typeof$2(type) === 'symbol' && type === REACT_FRAGMENT_TYPE) {
        validateFragmentProps(element);
      } else {
        validatePropTypes(element);
      }
      return element;
    }
    function createFactoryWithValidation(type) {
      var validatedFactory = createElementWithValidation.bind(null, type);
      // Legacy hook TODO: Warn if this is accessed
      validatedFactory.type = type;
      {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function get() {
            lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
      return validatedFactory;
    }
    function cloneElementWithValidation(element, props, children) {
      var newElement = cloneElement.apply(this, arguments);
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], newElement.type);
      }
      validatePropTypes(newElement);
      return newElement;
    }
    var React = {
      Children: {
        map: mapChildren,
        forEach: forEachChildren,
        count: countChildren,
        toArray: toArray,
        only: onlyChild
      },
      Component: Component,
      PureComponent: PureComponent,
      unstable_AsyncComponent: AsyncComponent,
      Fragment: REACT_FRAGMENT_TYPE,
      createElement: createElementWithValidation,
      cloneElement: cloneElementWithValidation,
      createFactory: createFactoryWithValidation,
      isValidElement: isValidElement,
      version: ReactVersion,
      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
        ReactCurrentOwner: ReactCurrentOwner,
        // Used by renderers to avoid bundling object-assign twice in UMD bundles:
        assign: _assign
      }
    };
    {
      _assign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
        // These should not be included in production.
        ReactDebugCurrentFrame: ReactDebugCurrentFrame,
        // Shim for React DOM 16.0.0 which still destructured (but not used) this.
        // TODO: remove in React 17.0.
        ReactComponentTreeHook: {}
      });
    }
    var React$2 = Object.freeze({
      default: React
    });
    var React$3 = React$2 && React || React$2;

    // TODO: decide on the top-level export form.
    // This is hacky but makes it work with both Rollup and Jest.
    var react = React$3['default'] ? React$3['default'] : React$3;
    react_development.exports = react;
  })();
}

if (process.env.NODE_ENV === 'production') {
  react.exports = react_production_min;
} else {
  react.exports = react_development.exports;
}
var React = react.exports;

var allLocaleData = {};

var intlMessageformat = {exports: {}};

var main$2 = {};

var core$1 = {};

var utils$f = {};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
utils$f.extend = extend$1;
var hop$1 = Object.prototype.hasOwnProperty;
function extend$1(obj) {
  var sources = Array.prototype.slice.call(arguments, 1),
    i,
    len,
    source,
    key;
  for (i = 0, len = sources.length; i < len; i += 1) {
    source = sources[i];
    if (!source) {
      continue;
    }
    for (key in source) {
      if (hop$1.call(source, key)) {
        obj[key] = source[key];
      }
    }
  }
  return obj;
}
utils$f.hop = hop$1;

var es5$1 = {};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
var src$utils$$ = utils$f;

// Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License

var realDefineProp$1 = function () {
  try {
    return !!Object.defineProperty({}, 'a', {});
  } catch (e) {
    return false;
  }
}();
var defineProperty$1 = realDefineProp$1 ? Object.defineProperty : function (obj, name, desc) {
  if ('get' in desc && obj.__defineGetter__) {
    obj.__defineGetter__(name, desc.get);
  } else if (!src$utils$$.hop.call(obj, name) || 'value' in desc) {
    obj[name] = desc.value;
  }
};
var objCreate$1 = Object.create || function (proto, props) {
  var obj, k;
  function F() {}
  F.prototype = proto;
  obj = new F();
  for (k in props) {
    if (src$utils$$.hop.call(props, k)) {
      defineProperty$1(obj, k, props[k]);
    }
  }
  return obj;
};
es5$1.defineProperty = defineProperty$1, es5$1.objCreate = objCreate$1;

var compiler = {};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
(function (exports) {

  exports["default"] = Compiler;
  function Compiler(locales, formats, pluralFn) {
    this.locales = locales;
    this.formats = formats;
    this.pluralFn = pluralFn;
  }
  Compiler.prototype.compile = function (ast) {
    this.pluralStack = [];
    this.currentPlural = null;
    this.pluralNumberFormat = null;
    return this.compileMessage(ast);
  };
  Compiler.prototype.compileMessage = function (ast) {
    if (!(ast && ast.type === 'messageFormatPattern')) {
      throw new Error('Message AST is not of type: "messageFormatPattern"');
    }
    var elements = ast.elements,
      pattern = [];
    var i, len, element;
    for (i = 0, len = elements.length; i < len; i += 1) {
      element = elements[i];
      switch (element.type) {
        case 'messageTextElement':
          pattern.push(this.compileMessageText(element));
          break;
        case 'argumentElement':
          pattern.push(this.compileArgument(element));
          break;
        default:
          throw new Error('Message element does not have a valid type');
      }
    }
    return pattern;
  };
  Compiler.prototype.compileMessageText = function (element) {
    // When this `element` is part of plural sub-pattern and its value contains
    // an unescaped '#', use a `PluralOffsetString` helper to properly output
    // the number with the correct offset in the string.
    if (this.currentPlural && /(^|[^\\])#/g.test(element.value)) {
      // Create a cache a NumberFormat instance that can be reused for any
      // PluralOffsetString instance in this message.
      if (!this.pluralNumberFormat) {
        this.pluralNumberFormat = new Intl.NumberFormat(this.locales);
      }
      return new PluralOffsetString(this.currentPlural.id, this.currentPlural.format.offset, this.pluralNumberFormat, element.value);
    }

    // Unescape the escaped '#'s in the message text.
    return element.value.replace(/\\#/g, '#');
  };
  Compiler.prototype.compileArgument = function (element) {
    var format = element.format;
    if (!format) {
      return new StringFormat(element.id);
    }
    var formats = this.formats,
      locales = this.locales,
      pluralFn = this.pluralFn,
      options;
    switch (format.type) {
      case 'numberFormat':
        options = formats.number[format.style];
        return {
          id: element.id,
          format: new Intl.NumberFormat(locales, options).format
        };
      case 'dateFormat':
        options = formats.date[format.style];
        return {
          id: element.id,
          format: new Intl.DateTimeFormat(locales, options).format
        };
      case 'timeFormat':
        options = formats.time[format.style];
        return {
          id: element.id,
          format: new Intl.DateTimeFormat(locales, options).format
        };
      case 'pluralFormat':
        options = this.compileOptions(element);
        return new PluralFormat(element.id, format.ordinal, format.offset, options, pluralFn);
      case 'selectFormat':
        options = this.compileOptions(element);
        return new SelectFormat(element.id, options);
      default:
        throw new Error('Message element does not have a valid format type');
    }
  };
  Compiler.prototype.compileOptions = function (element) {
    var format = element.format,
      options = format.options,
      optionsHash = {};

    // Save the current plural element, if any, then set it to a new value when
    // compiling the options sub-patterns. This conforms the spec's algorithm
    // for handling `"#"` syntax in message text.
    this.pluralStack.push(this.currentPlural);
    this.currentPlural = format.type === 'pluralFormat' ? element : null;
    var i, len, option;
    for (i = 0, len = options.length; i < len; i += 1) {
      option = options[i];

      // Compile the sub-pattern and save it under the options's selector.
      optionsHash[option.selector] = this.compileMessage(option.value);
    }

    // Pop the plural stack to put back the original current plural value.
    this.currentPlural = this.pluralStack.pop();
    return optionsHash;
  };

  // -- Compiler Helper Classes --------------------------------------------------

  function StringFormat(id) {
    this.id = id;
  }
  StringFormat.prototype.format = function (value) {
    if (!value && typeof value !== 'number') {
      return '';
    }
    return typeof value === 'string' ? value : String(value);
  };
  function PluralFormat(id, useOrdinal, offset, options, pluralFn) {
    this.id = id;
    this.useOrdinal = useOrdinal;
    this.offset = offset;
    this.options = options;
    this.pluralFn = pluralFn;
  }
  PluralFormat.prototype.getOption = function (value) {
    var options = this.options;
    var option = options['=' + value] || options[this.pluralFn(value - this.offset, this.useOrdinal)];
    return option || options.other;
  };
  function PluralOffsetString(id, offset, numberFormat, string) {
    this.id = id;
    this.offset = offset;
    this.numberFormat = numberFormat;
    this.string = string;
  }
  PluralOffsetString.prototype.format = function (value) {
    var number = this.numberFormat.format(value - this.offset);
    return this.string.replace(/(^|[^\\])#/g, '$1' + number).replace(/\\#/g, '#');
  };
  function SelectFormat(id, options) {
    this.id = id;
    this.options = options;
  }
  SelectFormat.prototype.getOption = function (value) {
    var options = this.options;
    return options[value] || options.other;
  };
})(compiler);

var intlMessageformatParser = {exports: {}};

var parser = {};

(function (exports) {

  exports["default"] = function () {

    /*
     * Generated by PEG.js 0.9.0.
     *
     * http://pegjs.org/
     */
    function peg$subclass(child, parent) {
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
    }
    function peg$SyntaxError(message, expected, found, location) {
      this.message = message;
      this.expected = expected;
      this.found = found;
      this.location = location;
      this.name = "SyntaxError";
      if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(this, peg$SyntaxError);
      }
    }
    peg$subclass(peg$SyntaxError, Error);
    function peg$parse(input) {
      var options = arguments.length > 1 ? arguments[1] : {},
        peg$FAILED = {},
        peg$startRuleFunctions = {
          start: peg$parsestart
        },
        peg$startRuleFunction = peg$parsestart,
        peg$c0 = function peg$c0(elements) {
          return {
            type: 'messageFormatPattern',
            elements: elements,
            location: location()
          };
        },
        peg$c1 = function peg$c1(text) {
          var string = '',
            i,
            j,
            outerLen,
            inner,
            innerLen;
          for (i = 0, outerLen = text.length; i < outerLen; i += 1) {
            inner = text[i];
            for (j = 0, innerLen = inner.length; j < innerLen; j += 1) {
              string += inner[j];
            }
          }
          return string;
        },
        peg$c2 = function peg$c2(messageText) {
          return {
            type: 'messageTextElement',
            value: messageText,
            location: location()
          };
        },
        peg$c3 = /^[^ \t\n\r,.+={}#]/,
        peg$c4 = {
          type: "class",
          value: "[^ \\t\\n\\r,.+={}#]",
          description: "[^ \\t\\n\\r,.+={}#]"
        },
        peg$c5 = "{",
        peg$c6 = {
          type: "literal",
          value: "{",
          description: "\"{\""
        },
        peg$c7 = ",",
        peg$c8 = {
          type: "literal",
          value: ",",
          description: "\",\""
        },
        peg$c9 = "}",
        peg$c10 = {
          type: "literal",
          value: "}",
          description: "\"}\""
        },
        peg$c11 = function peg$c11(id, format) {
          return {
            type: 'argumentElement',
            id: id,
            format: format && format[2],
            location: location()
          };
        },
        peg$c12 = "number",
        peg$c13 = {
          type: "literal",
          value: "number",
          description: "\"number\""
        },
        peg$c14 = "date",
        peg$c15 = {
          type: "literal",
          value: "date",
          description: "\"date\""
        },
        peg$c16 = "time",
        peg$c17 = {
          type: "literal",
          value: "time",
          description: "\"time\""
        },
        peg$c18 = function peg$c18(type, style) {
          return {
            type: type + 'Format',
            style: style && style[2],
            location: location()
          };
        },
        peg$c19 = "plural",
        peg$c20 = {
          type: "literal",
          value: "plural",
          description: "\"plural\""
        },
        peg$c21 = function peg$c21(pluralStyle) {
          return {
            type: pluralStyle.type,
            ordinal: false,
            offset: pluralStyle.offset || 0,
            options: pluralStyle.options,
            location: location()
          };
        },
        peg$c22 = "selectordinal",
        peg$c23 = {
          type: "literal",
          value: "selectordinal",
          description: "\"selectordinal\""
        },
        peg$c24 = function peg$c24(pluralStyle) {
          return {
            type: pluralStyle.type,
            ordinal: true,
            offset: pluralStyle.offset || 0,
            options: pluralStyle.options,
            location: location()
          };
        },
        peg$c25 = "select",
        peg$c26 = {
          type: "literal",
          value: "select",
          description: "\"select\""
        },
        peg$c27 = function peg$c27(options) {
          return {
            type: 'selectFormat',
            options: options,
            location: location()
          };
        },
        peg$c28 = "=",
        peg$c29 = {
          type: "literal",
          value: "=",
          description: "\"=\""
        },
        peg$c30 = function peg$c30(selector, pattern) {
          return {
            type: 'optionalFormatPattern',
            selector: selector,
            value: pattern,
            location: location()
          };
        },
        peg$c31 = "offset:",
        peg$c32 = {
          type: "literal",
          value: "offset:",
          description: "\"offset:\""
        },
        peg$c33 = function peg$c33(number) {
          return number;
        },
        peg$c34 = function peg$c34(offset, options) {
          return {
            type: 'pluralFormat',
            offset: offset,
            options: options,
            location: location()
          };
        },
        peg$c35 = {
          type: "other",
          description: "whitespace"
        },
        peg$c36 = /^[ \t\n\r]/,
        peg$c37 = {
          type: "class",
          value: "[ \\t\\n\\r]",
          description: "[ \\t\\n\\r]"
        },
        peg$c38 = {
          type: "other",
          description: "optionalWhitespace"
        },
        peg$c39 = /^[0-9]/,
        peg$c40 = {
          type: "class",
          value: "[0-9]",
          description: "[0-9]"
        },
        peg$c41 = /^[0-9a-f]/i,
        peg$c42 = {
          type: "class",
          value: "[0-9a-f]i",
          description: "[0-9a-f]i"
        },
        peg$c43 = "0",
        peg$c44 = {
          type: "literal",
          value: "0",
          description: "\"0\""
        },
        peg$c45 = /^[1-9]/,
        peg$c46 = {
          type: "class",
          value: "[1-9]",
          description: "[1-9]"
        },
        peg$c47 = function peg$c47(digits) {
          return parseInt(digits, 10);
        },
        peg$c48 = /^[^{}\\\0-\x1F \t\n\r]/,
        peg$c49 = {
          type: "class",
          value: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]",
          description: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]"
        },
        peg$c50 = "\\\\",
        peg$c51 = {
          type: "literal",
          value: "\\\\",
          description: "\"\\\\\\\\\""
        },
        peg$c52 = function peg$c52() {
          return '\\';
        },
        peg$c53 = "\\#",
        peg$c54 = {
          type: "literal",
          value: "\\#",
          description: "\"\\\\#\""
        },
        peg$c55 = function peg$c55() {
          return '\\#';
        },
        peg$c56 = "\\{",
        peg$c57 = {
          type: "literal",
          value: "\\{",
          description: "\"\\\\{\""
        },
        peg$c58 = function peg$c58() {
          return "{";
        },
        peg$c59 = "\\}",
        peg$c60 = {
          type: "literal",
          value: "\\}",
          description: "\"\\\\}\""
        },
        peg$c61 = function peg$c61() {
          return "}";
        },
        peg$c62 = "\\u",
        peg$c63 = {
          type: "literal",
          value: "\\u",
          description: "\"\\\\u\""
        },
        peg$c64 = function peg$c64(digits) {
          return String.fromCharCode(parseInt(digits, 16));
        },
        peg$c65 = function peg$c65(chars) {
          return chars.join('');
        },
        peg$currPos = 0,
        peg$savedPos = 0,
        peg$posDetailsCache = [{
          line: 1,
          column: 1,
          seenCR: false
        }],
        peg$maxFailPos = 0,
        peg$maxFailExpected = [],
        peg$silentFails = 0,
        peg$result;
      if ("startRule" in options) {
        if (!(options.startRule in peg$startRuleFunctions)) {
          throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
        }
        peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
      }
      function location() {
        return peg$computeLocation(peg$savedPos, peg$currPos);
      }
      function peg$computePosDetails(pos) {
        var details = peg$posDetailsCache[pos],
          p,
          ch;
        if (details) {
          return details;
        } else {
          p = pos - 1;
          while (!peg$posDetailsCache[p]) {
            p--;
          }
          details = peg$posDetailsCache[p];
          details = {
            line: details.line,
            column: details.column,
            seenCR: details.seenCR
          };
          while (p < pos) {
            ch = input.charAt(p);
            if (ch === "\n") {
              if (!details.seenCR) {
                details.line++;
              }
              details.column = 1;
              details.seenCR = false;
            } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
              details.line++;
              details.column = 1;
              details.seenCR = true;
            } else {
              details.column++;
              details.seenCR = false;
            }
            p++;
          }
          peg$posDetailsCache[pos] = details;
          return details;
        }
      }
      function peg$computeLocation(startPos, endPos) {
        var startPosDetails = peg$computePosDetails(startPos),
          endPosDetails = peg$computePosDetails(endPos);
        return {
          start: {
            offset: startPos,
            line: startPosDetails.line,
            column: startPosDetails.column
          },
          end: {
            offset: endPos,
            line: endPosDetails.line,
            column: endPosDetails.column
          }
        };
      }
      function peg$fail(expected) {
        if (peg$currPos < peg$maxFailPos) {
          return;
        }
        if (peg$currPos > peg$maxFailPos) {
          peg$maxFailPos = peg$currPos;
          peg$maxFailExpected = [];
        }
        peg$maxFailExpected.push(expected);
      }
      function peg$buildException(message, expected, found, location) {
        function cleanupExpected(expected) {
          var i = 1;
          expected.sort(function (a, b) {
            if (a.description < b.description) {
              return -1;
            } else if (a.description > b.description) {
              return 1;
            } else {
              return 0;
            }
          });
          while (i < expected.length) {
            if (expected[i - 1] === expected[i]) {
              expected.splice(i, 1);
            } else {
              i++;
            }
          }
        }
        function buildMessage(expected, found) {
          function stringEscape(s) {
            function hex(ch) {
              return ch.charCodeAt(0).toString(16).toUpperCase();
            }
            return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\x08/g, '\\b').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\f/g, '\\f').replace(/\r/g, '\\r').replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch) {
              return '\\x0' + hex(ch);
            }).replace(/[\x10-\x1F\x80-\xFF]/g, function (ch) {
              return '\\x' + hex(ch);
            }).replace(/[\u0100-\u0FFF]/g, function (ch) {
              return "\\u0" + hex(ch);
            }).replace(/[\u1000-\uFFFF]/g, function (ch) {
              return "\\u" + hex(ch);
            });
          }
          var expectedDescs = new Array(expected.length),
            expectedDesc,
            foundDesc,
            i;
          for (i = 0; i < expected.length; i++) {
            expectedDescs[i] = expected[i].description;
          }
          expectedDesc = expected.length > 1 ? expectedDescs.slice(0, -1).join(", ") + " or " + expectedDescs[expected.length - 1] : expectedDescs[0];
          foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";
          return "Expected " + expectedDesc + " but " + foundDesc + " found.";
        }
        if (expected !== null) {
          cleanupExpected(expected);
        }
        return new peg$SyntaxError(message !== null ? message : buildMessage(expected, found), expected, found, location);
      }
      function peg$parsestart() {
        var s0;
        s0 = peg$parsemessageFormatPattern();
        return s0;
      }
      function peg$parsemessageFormatPattern() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsemessageFormatElement();
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsemessageFormatElement();
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c0(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parsemessageFormatElement() {
        var s0;
        s0 = peg$parsemessageTextElement();
        if (s0 === peg$FAILED) {
          s0 = peg$parseargumentElement();
        }
        return s0;
      }
      function peg$parsemessageText() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$currPos;
        s3 = peg$parse_();
        if (s3 !== peg$FAILED) {
          s4 = peg$parsechars();
          if (s4 !== peg$FAILED) {
            s5 = peg$parse_();
            if (s5 !== peg$FAILED) {
              s3 = [s3, s4, s5];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$currPos;
            s3 = peg$parse_();
            if (s3 !== peg$FAILED) {
              s4 = peg$parsechars();
              if (s4 !== peg$FAILED) {
                s5 = peg$parse_();
                if (s5 !== peg$FAILED) {
                  s3 = [s3, s4, s5];
                  s2 = s3;
                } else {
                  peg$currPos = s2;
                  s2 = peg$FAILED;
                }
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c1(s1);
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parsews();
          if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
          } else {
            s0 = s1;
          }
        }
        return s0;
      }
      function peg$parsemessageTextElement() {
        var s0, s1;
        s0 = peg$currPos;
        s1 = peg$parsemessageText();
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parseargument() {
        var s0, s1, s2;
        s0 = peg$parsenumber();
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = [];
          if (peg$c3.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c4);
            }
          }
          if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              if (peg$c3.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c4);
                }
              }
            }
          } else {
            s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
          } else {
            s0 = s1;
          }
        }
        return s0;
      }
      function peg$parseargumentElement() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 123) {
          s1 = peg$c5;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c6);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseargument();
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 44) {
                  s6 = peg$c7;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c8);
                  }
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parseelementFormat();
                    if (s8 !== peg$FAILED) {
                      s6 = [s6, s7, s8];
                      s5 = s6;
                    } else {
                      peg$currPos = s5;
                      s5 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
                if (s5 === peg$FAILED) {
                  s5 = null;
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 125) {
                      s7 = peg$c9;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c10);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c11(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseelementFormat() {
        var s0;
        s0 = peg$parsesimpleFormat();
        if (s0 === peg$FAILED) {
          s0 = peg$parsepluralFormat();
          if (s0 === peg$FAILED) {
            s0 = peg$parseselectOrdinalFormat();
            if (s0 === peg$FAILED) {
              s0 = peg$parseselectFormat();
            }
          }
        }
        return s0;
      }
      function peg$parsesimpleFormat() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 6) === peg$c12) {
          s1 = peg$c12;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c13);
          }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c14) {
            s1 = peg$c14;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c15);
            }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c16) {
              s1 = peg$c16;
              peg$currPos += 4;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c17);
              }
            }
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 44) {
              s4 = peg$c7;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsechars();
                if (s6 !== peg$FAILED) {
                  s4 = [s4, s5, s6];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
            if (s3 === peg$FAILED) {
              s3 = null;
            }
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c18(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsepluralFormat() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 6) === peg$c19) {
          s1 = peg$c19;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c20);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s3 = peg$c7;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsepluralStyle();
                if (s5 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c21(s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseselectOrdinalFormat() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 13) === peg$c22) {
          s1 = peg$c22;
          peg$currPos += 13;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c23);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s3 = peg$c7;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsepluralStyle();
                if (s5 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c24(s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseselectFormat() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 6) === peg$c25) {
          s1 = peg$c25;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c26);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s3 = peg$c7;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$parseoptionalFormatPattern();
                if (s6 !== peg$FAILED) {
                  while (s6 !== peg$FAILED) {
                    s5.push(s6);
                    s6 = peg$parseoptionalFormatPattern();
                  }
                } else {
                  s5 = peg$FAILED;
                }
                if (s5 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c27(s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseselector() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 61) {
          s2 = peg$c28;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c29);
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsenumber();
          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s0 = input.substring(s0, peg$currPos);
        } else {
          s0 = s1;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$parsechars();
        }
        return s0;
      }
      function peg$parseoptionalFormatPattern() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseselector();
          if (s2 !== peg$FAILED) {
            s3 = peg$parse_();
            if (s3 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 123) {
                s4 = peg$c5;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c6);
                }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parse_();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parsemessageFormatPattern();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parse_();
                    if (s7 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 125) {
                        s8 = peg$c9;
                        peg$currPos++;
                      } else {
                        s8 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c10);
                        }
                      }
                      if (s8 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c30(s2, s6);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseoffset() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 7) === peg$c31) {
          s1 = peg$c31;
          peg$currPos += 7;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c32);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parsenumber();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c33(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsepluralStyle() {
        var s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = peg$parseoffset();
        if (s1 === peg$FAILED) {
          s1 = null;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$parseoptionalFormatPattern();
            if (s4 !== peg$FAILED) {
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parseoptionalFormatPattern();
              }
            } else {
              s3 = peg$FAILED;
            }
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c34(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsews() {
        var s0, s1;
        peg$silentFails++;
        s0 = [];
        if (peg$c36.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c37);
          }
        }
        if (s1 !== peg$FAILED) {
          while (s1 !== peg$FAILED) {
            s0.push(s1);
            if (peg$c36.test(input.charAt(peg$currPos))) {
              s1 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c37);
              }
            }
          }
        } else {
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c35);
          }
        }
        return s0;
      }
      function peg$parse_() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsews();
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsews();
        }
        if (s1 !== peg$FAILED) {
          s0 = input.substring(s0, peg$currPos);
        } else {
          s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c38);
          }
        }
        return s0;
      }
      function peg$parsedigit() {
        var s0;
        if (peg$c39.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c40);
          }
        }
        return s0;
      }
      function peg$parsehexDigit() {
        var s0;
        if (peg$c41.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c42);
          }
        }
        return s0;
      }
      function peg$parsenumber() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 48) {
          s1 = peg$c43;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c44);
          }
        }
        if (s1 === peg$FAILED) {
          s1 = peg$currPos;
          s2 = peg$currPos;
          if (peg$c45.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c46);
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsedigit();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsedigit();
            }
            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
          if (s2 !== peg$FAILED) {
            s1 = input.substring(s1, peg$currPos);
          } else {
            s1 = s2;
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c47(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parsechar() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        if (peg$c48.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c49);
          }
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c50) {
            s1 = peg$c50;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c51);
            }
          }
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c52();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c53) {
              s1 = peg$c53;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c54);
              }
            }
            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c55();
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.substr(peg$currPos, 2) === peg$c56) {
                s1 = peg$c56;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c57);
                }
              }
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c58();
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.substr(peg$currPos, 2) === peg$c59) {
                  s1 = peg$c59;
                  peg$currPos += 2;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c60);
                  }
                }
                if (s1 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c61();
                }
                s0 = s1;
                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;
                  if (input.substr(peg$currPos, 2) === peg$c62) {
                    s1 = peg$c62;
                    peg$currPos += 2;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c63);
                    }
                  }
                  if (s1 !== peg$FAILED) {
                    s2 = peg$currPos;
                    s3 = peg$currPos;
                    s4 = peg$parsehexDigit();
                    if (s4 !== peg$FAILED) {
                      s5 = peg$parsehexDigit();
                      if (s5 !== peg$FAILED) {
                        s6 = peg$parsehexDigit();
                        if (s6 !== peg$FAILED) {
                          s7 = peg$parsehexDigit();
                          if (s7 !== peg$FAILED) {
                            s4 = [s4, s5, s6, s7];
                            s3 = s4;
                          } else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s3;
                          s3 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                    if (s3 !== peg$FAILED) {
                      s2 = input.substring(s2, peg$currPos);
                    } else {
                      s2 = s3;
                    }
                    if (s2 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c64(s2);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                }
              }
            }
          }
        }
        return s0;
      }
      function peg$parsechars() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsechar();
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parsechar();
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c65(s1);
        }
        s0 = s1;
        return s0;
      }
      peg$result = peg$startRuleFunction();
      if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
      } else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
          peg$fail({
            type: "end",
            description: "end of input"
          });
        }
        throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
      }
    }
    return {
      SyntaxError: peg$SyntaxError,
      parse: peg$parse
    };
  }();
})(parser);

(function (module, exports) {

  exports = module.exports = parser['default'];
  exports['default'] = exports;
})(intlMessageformatParser, intlMessageformatParser.exports);

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
(function (exports) {

  var src$utils$$ = utils$f,
    src$es5$$ = es5$1,
    src$compiler$$ = compiler,
    intl$messageformat$parser$$ = intlMessageformatParser.exports;
  exports["default"] = MessageFormat;

  // -- MessageFormat --------------------------------------------------------

  function MessageFormat(message, locales, formats) {
    // Parse string messages into an AST.
    var ast = typeof message === 'string' ? MessageFormat.__parse(message) : message;
    if (!(ast && ast.type === 'messageFormatPattern')) {
      throw new TypeError('A message must be provided as a String or AST.');
    }

    // Creates a new object with the specified `formats` merged with the default
    // formats.
    formats = this._mergeFormats(MessageFormat.formats, formats);

    // Defined first because it's used to build the format pattern.
    src$es5$$.defineProperty(this, '_locale', {
      value: this._resolveLocale(locales)
    });

    // Compile the `ast` to a pattern that is highly optimized for repeated
    // `format()` invocations. **Note:** This passes the `locales` set provided
    // to the constructor instead of just the resolved locale.
    var pluralFn = this._findPluralRuleFunction(this._locale);
    var pattern = this._compilePattern(ast, locales, formats, pluralFn);

    // "Bind" `format()` method to `this` so it can be passed by reference like
    // the other `Intl` APIs.
    var messageFormat = this;
    this.format = function (values) {
      try {
        return messageFormat._format(pattern, values);
      } catch (e) {
        if (e.variableId) {
          throw new Error('The intl string context variable \'' + e.variableId + '\'' + ' was not provided to the string \'' + message + '\'');
        } else {
          throw e;
        }
      }
    };
  }

  // Default format options used as the prototype of the `formats` provided to the
  // constructor. These are used when constructing the internal Intl.NumberFormat
  // and Intl.DateTimeFormat instances.
  src$es5$$.defineProperty(MessageFormat, 'formats', {
    enumerable: true,
    value: {
      number: {
        'currency': {
          style: 'currency'
        },
        'percent': {
          style: 'percent'
        }
      },
      date: {
        'short': {
          month: 'numeric',
          day: 'numeric',
          year: '2-digit'
        },
        'medium': {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        },
        'long': {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        },
        'full': {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }
      },
      time: {
        'short': {
          hour: 'numeric',
          minute: 'numeric'
        },
        'medium': {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        },
        'long': {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZoneName: 'short'
        },
        'full': {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZoneName: 'short'
        }
      }
    }
  });

  // Define internal private properties for dealing with locale data.
  src$es5$$.defineProperty(MessageFormat, '__localeData__', {
    value: src$es5$$.objCreate(null)
  });
  src$es5$$.defineProperty(MessageFormat, '__addLocaleData', {
    value: function value(data) {
      if (!(data && data.locale)) {
        throw new Error('Locale data provided to IntlMessageFormat is missing a ' + '`locale` property');
      }
      MessageFormat.__localeData__[data.locale.toLowerCase()] = data;
    }
  });

  // Defines `__parse()` static method as an exposed private.
  src$es5$$.defineProperty(MessageFormat, '__parse', {
    value: intl$messageformat$parser$$["default"].parse
  });

  // Define public `defaultLocale` property which defaults to English, but can be
  // set by the developer.
  src$es5$$.defineProperty(MessageFormat, 'defaultLocale', {
    enumerable: true,
    writable: true,
    value: undefined
  });
  MessageFormat.prototype.resolvedOptions = function () {
    // TODO: Provide anything else?
    return {
      locale: this._locale
    };
  };
  MessageFormat.prototype._compilePattern = function (ast, locales, formats, pluralFn) {
    var compiler = new src$compiler$$["default"](locales, formats, pluralFn);
    return compiler.compile(ast);
  };
  MessageFormat.prototype._findPluralRuleFunction = function (locale) {
    var localeData = MessageFormat.__localeData__;
    var data = localeData[locale.toLowerCase()];

    // The locale data is de-duplicated, so we have to traverse the locale's
    // hierarchy until we find a `pluralRuleFunction` to return.
    while (data) {
      if (data.pluralRuleFunction) {
        return data.pluralRuleFunction;
      }
      data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
    }
    throw new Error('Locale data added to IntlMessageFormat is missing a ' + '`pluralRuleFunction` for :' + locale);
  };
  MessageFormat.prototype._format = function (pattern, values) {
    var result = '',
      i,
      len,
      part,
      id,
      value,
      err;
    for (i = 0, len = pattern.length; i < len; i += 1) {
      part = pattern[i];

      // Exist early for string parts.
      if (typeof part === 'string') {
        result += part;
        continue;
      }
      id = part.id;

      // Enforce that all required values are provided by the caller.
      if (!(values && src$utils$$.hop.call(values, id))) {
        err = new Error('A value must be provided for: ' + id);
        err.variableId = id;
        throw err;
      }
      value = values[id];

      // Recursively format plural and select parts' option — which can be a
      // nested pattern structure. The choosing of the option to use is
      // abstracted-by and delegated-to the part helper object.
      if (part.options) {
        result += this._format(part.getOption(value), values);
      } else {
        result += part.format(value);
      }
    }
    return result;
  };
  MessageFormat.prototype._mergeFormats = function (defaults, formats) {
    var mergedFormats = {},
      type,
      mergedType;
    for (type in defaults) {
      if (!src$utils$$.hop.call(defaults, type)) {
        continue;
      }
      mergedFormats[type] = mergedType = src$es5$$.objCreate(defaults[type]);
      if (formats && src$utils$$.hop.call(formats, type)) {
        src$utils$$.extend(mergedType, formats[type]);
      }
    }
    return mergedFormats;
  };
  MessageFormat.prototype._resolveLocale = function (locales) {
    if (typeof locales === 'string') {
      locales = [locales];
    }

    // Create a copy of the array so we can push on the default locale.
    locales = (locales || []).concat(MessageFormat.defaultLocale);
    var localeData = MessageFormat.__localeData__;
    var i, len, localeParts, data;

    // Using the set of locales + the default locale, we look for the first one
    // which that has been registered. When data does not exist for a locale, we
    // traverse its ancestors to find something that's been registered within
    // its hierarchy of locales. Since we lack the proper `parentLocale` data
    // here, we must take a naive approach to traversal.
    for (i = 0, len = locales.length; i < len; i += 1) {
      localeParts = locales[i].toLowerCase().split('-');
      while (localeParts.length) {
        data = localeData[localeParts.join('-')];
        if (data) {
          // Return the normalized locale string; e.g., we return "en-US",
          // instead of "en-us".
          return data.locale;
        }
        localeParts.pop();
      }
    }
    var defaultLocale = locales.pop();
    throw new Error('No locale data has been added to IntlMessageFormat for: ' + locales.join(', ') + ', or the default locale: ' + defaultLocale);
  };
})(core$1);

var en$1 = {};

(function (exports) {

  exports["default"] = {
    "locale": "en",
    "pluralRuleFunction": function pluralRuleFunction(n, ord) {
      var s = String(n).split("."),
        v0 = !s[1],
        t0 = Number(s[0]) == n,
        n10 = t0 && s[0].slice(-1),
        n100 = t0 && s[0].slice(-2);
      if (ord) return n10 == 1 && n100 != 11 ? "one" : n10 == 2 && n100 != 12 ? "two" : n10 == 3 && n100 != 13 ? "few" : "other";
      return n == 1 && v0 ? "one" : "other";
    }
  };
})(en$1);

/* jslint esnext: true */
(function (exports) {

  var src$core$$ = core$1,
    src$en$$ = en$1;
  src$core$$["default"].__addLocaleData(src$en$$["default"]);
  src$core$$["default"].defaultLocale = 'en';
  exports["default"] = src$core$$["default"];
})(main$2);

/* jshint node:true */
(function (module, exports) {

  var IntlMessageFormat = main$2['default'];

  // Add all locale data to `IntlMessageFormat`. This module will be ignored when
  // bundling for the browser with Browserify/Webpack.

  // Re-export `IntlMessageFormat` as the CommonJS default exports with all the
  // locale data registered, and with English set as the default locale. Define
  // the `default` prop for use with other compiled ES6 Modules.
  exports = module.exports = IntlMessageFormat;
  exports['default'] = exports;
})(intlMessageformat, intlMessageformat.exports);
var IntlMessageFormat = intlMessageformat.exports;

var intlRelativeformat = {exports: {}};

var main$1 = {};

var core = {};

var diff = {};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
Object.defineProperty(diff, "__esModule", {
  value: true
});
/* jslint esnext: true */
var round = Math.round;
function daysToYears(days) {
  // 400 years have 146097 days (taking into account leap year rules)
  return days * 400 / 146097;
}
// Thanks to date-fns
// https://github.com/date-fns/date-fns
// MIT © Sasha Koss
var MILLISECONDS_IN_MINUTE = 60000;
var MILLISECONDS_IN_DAY = 86400000;
function startOfDay(dirtyDate) {
  var date = new Date(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}
function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
  var startOfDayLeft = startOfDay(dirtyDateLeft);
  var startOfDayRight = startOfDay(dirtyDateRight);
  var timestampLeft = startOfDayLeft.getTime() - startOfDayLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE;
  var timestampRight = startOfDayRight.getTime() - startOfDayRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE;
  // Round the number of days to the nearest integer
  // because the number of milliseconds in a day is not constant
  // (e.g. it's different in the day of the daylight saving time clock shift)
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
}
function default_1(from, to) {
  // Convert to ms timestamps.
  from = +from;
  to = +to;
  var millisecond = round(to - from),
    second = round(millisecond / 1000),
    minute = round(second / 60),
    hour = round(minute / 60);
  // We expect a more precision in rounding when dealing with
  // days as it feels wrong when something happended 13 hours ago and
  // is regarded as "yesterday" even if the time was this morning.
  var day = differenceInCalendarDays(to, from);
  var week = round(day / 7);
  var rawYears = daysToYears(day),
    month = round(rawYears * 12),
    year = round(rawYears);
  return {
    millisecond: millisecond,
    second: second,
    'second-short': second,
    minute: minute,
    'minute-short': minute,
    hour: hour,
    'hour-short': hour,
    day: day,
    'day-short': day,
    week: week,
    'week-short': week,
    month: month,
    'month-short': month,
    year: year,
    'year-short': year
  };
}
diff.default = default_1;

var es5 = {};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
Object.defineProperty(es5, "__esModule", {
  value: true
});
/* jslint esnext: true */
// Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License
var hop = Object.prototype.hasOwnProperty;
var toString$1 = Object.prototype.toString;
var realDefineProp = function () {
  try {
    return !!Object.defineProperty({}, 'a', {});
  } catch (e) {
    return false;
  }
}();
var defineProperty = realDefineProp ? Object.defineProperty : function (obj, name, desc) {
  if ('get' in desc && obj.__defineGetter__) {
    obj.__defineGetter__(name, desc.get);
  } else if (!hop.call(obj, name) || 'value' in desc) {
    obj[name] = desc.value;
  }
};
es5.defineProperty = defineProperty;
var objCreate = Object.create || function (proto, props) {
  var obj, k;
  function F() {}
  F.prototype = proto;
  obj = new F();
  for (k in props) {
    if (hop.call(props, k)) {
      defineProperty(obj, k, props[k]);
    }
  }
  return obj;
};
es5.objCreate = objCreate;
var arrIndexOf = Array.prototype.indexOf || function (search, fromIndex) {
  /*jshint validthis:true */
  var arr = this;
  if (!arr.length) {
    return -1;
  }
  for (var i = fromIndex || 0, max = arr.length; i < max; i++) {
    if (arr[i] === search) {
      return i;
    }
  }
  return -1;
};
es5.arrIndexOf = arrIndexOf;
var isArray$1 = Array.isArray || function (obj) {
  return toString$1.call(obj) === '[object Array]';
};
es5.isArray = isArray$1;
var dateNow = Date.now || function () {
  return new Date().getTime();
};
es5.dateNow = dateNow;

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
Object.defineProperty(core, "__esModule", {
  value: true
});
/* jslint esnext: true */
var intl_messageformat_1 = intlMessageformat.exports;
var diff_1 = diff;
var es5_1 = es5;
core.default = RelativeFormat;
// -----------------------------------------------------------------------------
var FIELDS = ['second', 'second-short', 'minute', 'minute-short', 'hour', 'hour-short', 'day', 'day-short', 'month', 'month-short', 'year', 'year-short'];
var STYLES = ['best fit', 'numeric'];
// -- RelativeFormat -----------------------------------------------------------
function RelativeFormat(locales, options) {
  options = options || {};
  // Make a copy of `locales` if it's an array, so that it doesn't change
  // since it's used lazily.
  if (es5_1.isArray(locales)) {
    locales = locales.concat();
  }
  es5_1.defineProperty(this, '_locale', {
    value: this._resolveLocale(locales)
  });
  es5_1.defineProperty(this, '_options', {
    value: {
      style: this._resolveStyle(options.style),
      units: this._isValidUnits(options.units) && options.units
    }
  });
  es5_1.defineProperty(this, '_locales', {
    value: locales
  });
  es5_1.defineProperty(this, '_fields', {
    value: this._findFields(this._locale)
  });
  es5_1.defineProperty(this, '_messages', {
    value: es5_1.objCreate(null)
  });
  // "Bind" `format()` method to `this` so it can be passed by reference like
  // the other `Intl` APIs.
  var relativeFormat = this;
  this.format = function format(date, options) {
    return relativeFormat._format(date, options);
  };
}
// Define internal private properties for dealing with locale data.
es5_1.defineProperty(RelativeFormat, '__localeData__', {
  value: es5_1.objCreate(null)
});
es5_1.defineProperty(RelativeFormat, '__addLocaleData', {
  value: function value() {
    for (var i = 0; i < arguments.length; i++) {
      var datum = arguments[i];
      if (!(datum && datum.locale)) {
        throw new Error('Locale data provided to IntlRelativeFormat is missing a ' + '`locale` property value');
      }
      RelativeFormat.__localeData__[datum.locale.toLowerCase()] = datum;
      // Add data to IntlMessageFormat.
      intl_messageformat_1.default.__addLocaleData(datum);
    }
  }
});
// Define public `defaultLocale` property which can be set by the developer, or
// it will be set when the first RelativeFormat instance is created by
// leveraging the resolved locale from `Intl`.
es5_1.defineProperty(RelativeFormat, 'defaultLocale', {
  enumerable: true,
  writable: true,
  value: undefined
});
// Define public `thresholds` property which can be set by the developer, and
// defaults to relative time thresholds from moment.js.
es5_1.defineProperty(RelativeFormat, 'thresholds', {
  enumerable: true,
  value: {
    second: 45,
    'second-short': 45,
    minute: 45,
    'minute-short': 45,
    hour: 22,
    'hour-short': 22,
    day: 26,
    'day-short': 26,
    month: 11,
    'month-short': 11 // months to year
  }
});

RelativeFormat.prototype.resolvedOptions = function () {
  return {
    locale: this._locale,
    style: this._options.style,
    units: this._options.units
  };
};
RelativeFormat.prototype._compileMessage = function (units) {
  // `this._locales` is the original set of locales the user specified to the
  // constructor, while `this._locale` is the resolved root locale.
  var locales = this._locales;
  this._locale;
  var field = this._fields[units];
  var relativeTime = field.relativeTime;
  var future = '';
  var past = '';
  var i;
  for (i in relativeTime.future) {
    if (relativeTime.future.hasOwnProperty(i)) {
      future += ' ' + i + ' {' + relativeTime.future[i].replace('{0}', '#') + '}';
    }
  }
  for (i in relativeTime.past) {
    if (relativeTime.past.hasOwnProperty(i)) {
      past += ' ' + i + ' {' + relativeTime.past[i].replace('{0}', '#') + '}';
    }
  }
  var message = '{when, select, future {{0, plural, ' + future + '}}' + 'past {{0, plural, ' + past + '}}}';
  // Create the synthetic IntlMessageFormat instance using the original
  // locales value specified by the user when constructing the the parent
  // IntlRelativeFormat instance.
  return new intl_messageformat_1.default(message, locales);
};
RelativeFormat.prototype._getMessage = function (units) {
  var messages = this._messages;
  // Create a new synthetic message based on the locale data from CLDR.
  if (!messages[units]) {
    messages[units] = this._compileMessage(units);
  }
  return messages[units];
};
RelativeFormat.prototype._getRelativeUnits = function (diff, units) {
  var field = this._fields[units];
  if (field.relative) {
    return field.relative[diff];
  }
};
RelativeFormat.prototype._findFields = function (locale) {
  var localeData = RelativeFormat.__localeData__;
  var data = localeData[locale.toLowerCase()];
  // The locale data is de-duplicated, so we have to traverse the locale's
  // hierarchy until we find `fields` to return.
  while (data) {
    if (data.fields) {
      return data.fields;
    }
    data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
  }
  throw new Error('Locale data added to IntlRelativeFormat is missing `fields` for :' + locale);
};
RelativeFormat.prototype._format = function (date, options) {
  var now = options && options.now !== undefined ? options.now : es5_1.dateNow();
  if (date === undefined) {
    date = now;
  }
  // Determine if the `date` and optional `now` values are valid, and throw a
  // similar error to what `Intl.DateTimeFormat#format()` would throw.
  if (!isFinite(now)) {
    throw new RangeError('The `now` option provided to IntlRelativeFormat#format() is not ' + 'in valid range.');
  }
  if (!isFinite(date)) {
    throw new RangeError('The date value provided to IntlRelativeFormat#format() is not ' + 'in valid range.');
  }
  var diffReport = diff_1.default(now, date);
  var units = this._options.units || this._selectUnits(diffReport);
  var diffInUnits = diffReport[units];
  if (this._options.style !== 'numeric') {
    var relativeUnits = this._getRelativeUnits(diffInUnits, units);
    if (relativeUnits) {
      return relativeUnits;
    }
  }
  return this._getMessage(units).format({
    '0': Math.abs(diffInUnits),
    when: diffInUnits < 0 ? 'past' : 'future'
  });
};
RelativeFormat.prototype._isValidUnits = function (units) {
  if (!units || es5_1.arrIndexOf.call(FIELDS, units) >= 0) {
    return true;
  }
  if (typeof units === 'string') {
    var suggestion = /s$/.test(units) && units.substr(0, units.length - 1);
    if (suggestion && es5_1.arrIndexOf.call(FIELDS, suggestion) >= 0) {
      throw new Error('"' + units + '" is not a valid IntlRelativeFormat `units` ' + 'value, did you mean: ' + suggestion);
    }
  }
  throw new Error('"' + units + '" is not a valid IntlRelativeFormat `units` value, it ' + 'must be one of: "' + FIELDS.join('", "') + '"');
};
RelativeFormat.prototype._resolveLocale = function (locales) {
  if (typeof locales === 'string') {
    locales = [locales];
  }
  // Create a copy of the array so we can push on the default locale.
  locales = (locales || []).concat(RelativeFormat.defaultLocale);
  var localeData = RelativeFormat.__localeData__;
  var i, len, localeParts, data;
  // Using the set of locales + the default locale, we look for the first one
  // which that has been registered. When data does not exist for a locale, we
  // traverse its ancestors to find something that's been registered within
  // its hierarchy of locales. Since we lack the proper `parentLocale` data
  // here, we must take a naive approach to traversal.
  for (i = 0, len = locales.length; i < len; i += 1) {
    localeParts = locales[i].toLowerCase().split('-');
    while (localeParts.length) {
      data = localeData[localeParts.join('-')];
      if (data) {
        // Return the normalized locale string; e.g., we return "en-US",
        // instead of "en-us".
        return data.locale;
      }
      localeParts.pop();
    }
  }
  var defaultLocale = locales.pop();
  throw new Error('No locale data has been added to IntlRelativeFormat for: ' + locales.join(', ') + ', or the default locale: ' + defaultLocale);
};
RelativeFormat.prototype._resolveStyle = function (style) {
  // Default to "best fit" style.
  if (!style) {
    return STYLES[0];
  }
  if (es5_1.arrIndexOf.call(STYLES, style) >= 0) {
    return style;
  }
  throw new Error('"' + style + '" is not a valid IntlRelativeFormat `style` value, it ' + 'must be one of: "' + STYLES.join('", "') + '"');
};
RelativeFormat.prototype._selectUnits = function (diffReport) {
  var i, l, units;
  var fields = FIELDS.filter(function (field) {
    return field.indexOf('-short') < 1;
  });
  for (i = 0, l = fields.length; i < l; i += 1) {
    units = fields[i];
    if (Math.abs(diffReport[units]) < RelativeFormat.thresholds[units]) {
      break;
    }
  }
  return units;
};

var en = {};

Object.defineProperty(en, "__esModule", {
  value: true
});
/* @generated */
en.default = {
  "locale": "en",
  "pluralRuleFunction": function pluralRuleFunction(n, ord) {
    var s = String(n).split('.'),
      v0 = !s[1],
      t0 = Number(s[0]) == n,
      n10 = t0 && s[0].slice(-1),
      n100 = t0 && s[0].slice(-2);
    if (ord) return n10 == 1 && n100 != 11 ? 'one' : n10 == 2 && n100 != 12 ? 'two' : n10 == 3 && n100 != 13 ? 'few' : 'other';
    return n == 1 && v0 ? 'one' : 'other';
  },
  "fields": {
    "year": {
      "displayName": "year",
      "relative": {
        "0": "this year",
        "1": "next year",
        "-1": "last year"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} year",
          "other": "in {0} years"
        },
        "past": {
          "one": "{0} year ago",
          "other": "{0} years ago"
        }
      }
    },
    "year-short": {
      "displayName": "yr.",
      "relative": {
        "0": "this yr.",
        "1": "next yr.",
        "-1": "last yr."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} yr.",
          "other": "in {0} yr."
        },
        "past": {
          "one": "{0} yr. ago",
          "other": "{0} yr. ago"
        }
      }
    },
    "month": {
      "displayName": "month",
      "relative": {
        "0": "this month",
        "1": "next month",
        "-1": "last month"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} month",
          "other": "in {0} months"
        },
        "past": {
          "one": "{0} month ago",
          "other": "{0} months ago"
        }
      }
    },
    "month-short": {
      "displayName": "mo.",
      "relative": {
        "0": "this mo.",
        "1": "next mo.",
        "-1": "last mo."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} mo.",
          "other": "in {0} mo."
        },
        "past": {
          "one": "{0} mo. ago",
          "other": "{0} mo. ago"
        }
      }
    },
    "week": {
      "displayName": "week",
      "relativePeriod": "the week of {0}",
      "relative": {
        "0": "this week",
        "1": "next week",
        "-1": "last week"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} week",
          "other": "in {0} weeks"
        },
        "past": {
          "one": "{0} week ago",
          "other": "{0} weeks ago"
        }
      }
    },
    "week-short": {
      "displayName": "wk.",
      "relativePeriod": "the week of {0}",
      "relative": {
        "0": "this wk.",
        "1": "next wk.",
        "-1": "last wk."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} wk.",
          "other": "in {0} wk."
        },
        "past": {
          "one": "{0} wk. ago",
          "other": "{0} wk. ago"
        }
      }
    },
    "day": {
      "displayName": "day",
      "relative": {
        "0": "today",
        "1": "tomorrow",
        "-1": "yesterday"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} day",
          "other": "in {0} days"
        },
        "past": {
          "one": "{0} day ago",
          "other": "{0} days ago"
        }
      }
    },
    "day-short": {
      "displayName": "day",
      "relative": {
        "0": "today",
        "1": "tomorrow",
        "-1": "yesterday"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} day",
          "other": "in {0} days"
        },
        "past": {
          "one": "{0} day ago",
          "other": "{0} days ago"
        }
      }
    },
    "hour": {
      "displayName": "hour",
      "relative": {
        "0": "this hour"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} hour",
          "other": "in {0} hours"
        },
        "past": {
          "one": "{0} hour ago",
          "other": "{0} hours ago"
        }
      }
    },
    "hour-short": {
      "displayName": "hr.",
      "relative": {
        "0": "this hour"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} hr.",
          "other": "in {0} hr."
        },
        "past": {
          "one": "{0} hr. ago",
          "other": "{0} hr. ago"
        }
      }
    },
    "minute": {
      "displayName": "minute",
      "relative": {
        "0": "this minute"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} minute",
          "other": "in {0} minutes"
        },
        "past": {
          "one": "{0} minute ago",
          "other": "{0} minutes ago"
        }
      }
    },
    "minute-short": {
      "displayName": "min.",
      "relative": {
        "0": "this minute"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} min.",
          "other": "in {0} min."
        },
        "past": {
          "one": "{0} min. ago",
          "other": "{0} min. ago"
        }
      }
    },
    "second": {
      "displayName": "second",
      "relative": {
        "0": "now"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} second",
          "other": "in {0} seconds"
        },
        "past": {
          "one": "{0} second ago",
          "other": "{0} seconds ago"
        }
      }
    },
    "second-short": {
      "displayName": "sec.",
      "relative": {
        "0": "now"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} sec.",
          "other": "in {0} sec."
        },
        "past": {
          "one": "{0} sec. ago",
          "other": "{0} sec. ago"
        }
      }
    }
  }
};

/* jslint esnext: true */
Object.defineProperty(main$1, "__esModule", {
  value: true
});
var core_1 = core;
var en_1 = en;
core_1.default.__addLocaleData(en_1.default);
core_1.default.defaultLocale = 'en';
main$1.default = core_1.default;

/* jshint node:true */
(function (module, exports) {

  var IntlRelativeFormat = main$1['default'];

  // Add all locale data to `IntlRelativeFormat`. This module will be ignored when
  // bundling for the browser with Browserify/Webpack.

  // Re-export `IntlRelativeFormat` as the CommonJS default exports with all the
  // locale data registered, and with English set as the default locale. Define
  // the `default` prop for use with other compiled ES6 Modules.
  exports = module.exports = IntlRelativeFormat;
  exports['default'] = exports;
})(intlRelativeformat, intlRelativeformat.exports);
var IntlRelativeFormat = intlRelativeformat.exports;

var propTypes = {exports: {}};

var reactIs = {exports: {}};

var reactIs_production_min = {};

var b = "function" === typeof Symbol && Symbol.for,
  c = b ? Symbol.for("react.element") : 60103,
  d = b ? Symbol.for("react.portal") : 60106,
  e = b ? Symbol.for("react.fragment") : 60107,
  f = b ? Symbol.for("react.strict_mode") : 60108,
  g = b ? Symbol.for("react.profiler") : 60114,
  h = b ? Symbol.for("react.provider") : 60109,
  k = b ? Symbol.for("react.context") : 60110,
  l = b ? Symbol.for("react.async_mode") : 60111,
  m = b ? Symbol.for("react.concurrent_mode") : 60111,
  n = b ? Symbol.for("react.forward_ref") : 60112,
  p = b ? Symbol.for("react.suspense") : 60113,
  q = b ? Symbol.for("react.suspense_list") : 60120,
  r = b ? Symbol.for("react.memo") : 60115,
  t = b ? Symbol.for("react.lazy") : 60116,
  v = b ? Symbol.for("react.block") : 60121,
  w = b ? Symbol.for("react.fundamental") : 60117,
  x = b ? Symbol.for("react.responder") : 60118,
  y = b ? Symbol.for("react.scope") : 60119;
function z(a) {
  if ("object" === _typeof$2(a) && null !== a) {
    var u = a.$$typeof;
    switch (u) {
      case c:
        switch (a = a.type, a) {
          case l:
          case m:
          case e:
          case g:
          case f:
          case p:
            return a;
          default:
            switch (a = a && a.$$typeof, a) {
              case k:
              case n:
              case t:
              case r:
              case h:
                return a;
              default:
                return u;
            }
        }
      case d:
        return u;
    }
  }
}
function A(a) {
  return z(a) === m;
}
reactIs_production_min.AsyncMode = l;
reactIs_production_min.ConcurrentMode = m;
reactIs_production_min.ContextConsumer = k;
reactIs_production_min.ContextProvider = h;
reactIs_production_min.Element = c;
reactIs_production_min.ForwardRef = n;
reactIs_production_min.Fragment = e;
reactIs_production_min.Lazy = t;
reactIs_production_min.Memo = r;
reactIs_production_min.Portal = d;
reactIs_production_min.Profiler = g;
reactIs_production_min.StrictMode = f;
reactIs_production_min.Suspense = p;
reactIs_production_min.isAsyncMode = function (a) {
  return A(a) || z(a) === l;
};
reactIs_production_min.isConcurrentMode = A;
reactIs_production_min.isContextConsumer = function (a) {
  return z(a) === k;
};
reactIs_production_min.isContextProvider = function (a) {
  return z(a) === h;
};
reactIs_production_min.isElement = function (a) {
  return "object" === _typeof$2(a) && null !== a && a.$$typeof === c;
};
reactIs_production_min.isForwardRef = function (a) {
  return z(a) === n;
};
reactIs_production_min.isFragment = function (a) {
  return z(a) === e;
};
reactIs_production_min.isLazy = function (a) {
  return z(a) === t;
};
reactIs_production_min.isMemo = function (a) {
  return z(a) === r;
};
reactIs_production_min.isPortal = function (a) {
  return z(a) === d;
};
reactIs_production_min.isProfiler = function (a) {
  return z(a) === g;
};
reactIs_production_min.isStrictMode = function (a) {
  return z(a) === f;
};
reactIs_production_min.isSuspense = function (a) {
  return z(a) === p;
};
reactIs_production_min.isValidElementType = function (a) {
  return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === _typeof$2(a) && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
};
reactIs_production_min.typeOf = z;

var reactIs_development = {};

if (process.env.NODE_ENV !== "production") {
  (function () {

    // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.
    var hasSymbol = typeof Symbol === 'function' && Symbol.for;
    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
    var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
    var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
    var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
    var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
    // (unstable) APIs that have been removed. Can we remove the symbols?

    var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
    var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
    var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
    var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
    var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
    var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
    var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
    var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
    var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
    var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
    var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;
    function isValidElementType(type) {
      return typeof type === 'string' || typeof type === 'function' ||
      // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || _typeof$2(type) === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
    }
    function typeOf(object) {
      if (_typeof$2(object) === 'object' && object !== null) {
        var $$typeof = object.$$typeof;
        switch ($$typeof) {
          case REACT_ELEMENT_TYPE:
            var type = object.type;
            switch (type) {
              case REACT_ASYNC_MODE_TYPE:
              case REACT_CONCURRENT_MODE_TYPE:
              case REACT_FRAGMENT_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_SUSPENSE_TYPE:
                return type;
              default:
                var $$typeofType = type && type.$$typeof;
                switch ($$typeofType) {
                  case REACT_CONTEXT_TYPE:
                  case REACT_FORWARD_REF_TYPE:
                  case REACT_LAZY_TYPE:
                  case REACT_MEMO_TYPE:
                  case REACT_PROVIDER_TYPE:
                    return $$typeofType;
                  default:
                    return $$typeof;
                }
            }
          case REACT_PORTAL_TYPE:
            return $$typeof;
        }
      }
      return undefined;
    } // AsyncMode is deprecated along with isAsyncMode

    var AsyncMode = REACT_ASYNC_MODE_TYPE;
    var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
    var ContextConsumer = REACT_CONTEXT_TYPE;
    var ContextProvider = REACT_PROVIDER_TYPE;
    var Element = REACT_ELEMENT_TYPE;
    var ForwardRef = REACT_FORWARD_REF_TYPE;
    var Fragment = REACT_FRAGMENT_TYPE;
    var Lazy = REACT_LAZY_TYPE;
    var Memo = REACT_MEMO_TYPE;
    var Portal = REACT_PORTAL_TYPE;
    var Profiler = REACT_PROFILER_TYPE;
    var StrictMode = REACT_STRICT_MODE_TYPE;
    var Suspense = REACT_SUSPENSE_TYPE;
    var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

    function isAsyncMode(object) {
      {
        if (!hasWarnedAboutDeprecatedIsAsyncMode) {
          hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

          console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
        }
      }
      return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
    }
    function isConcurrentMode(object) {
      return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
    }
    function isContextConsumer(object) {
      return typeOf(object) === REACT_CONTEXT_TYPE;
    }
    function isContextProvider(object) {
      return typeOf(object) === REACT_PROVIDER_TYPE;
    }
    function isElement(object) {
      return _typeof$2(object) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function isForwardRef(object) {
      return typeOf(object) === REACT_FORWARD_REF_TYPE;
    }
    function isFragment(object) {
      return typeOf(object) === REACT_FRAGMENT_TYPE;
    }
    function isLazy(object) {
      return typeOf(object) === REACT_LAZY_TYPE;
    }
    function isMemo(object) {
      return typeOf(object) === REACT_MEMO_TYPE;
    }
    function isPortal(object) {
      return typeOf(object) === REACT_PORTAL_TYPE;
    }
    function isProfiler(object) {
      return typeOf(object) === REACT_PROFILER_TYPE;
    }
    function isStrictMode(object) {
      return typeOf(object) === REACT_STRICT_MODE_TYPE;
    }
    function isSuspense(object) {
      return typeOf(object) === REACT_SUSPENSE_TYPE;
    }
    reactIs_development.AsyncMode = AsyncMode;
    reactIs_development.ConcurrentMode = ConcurrentMode;
    reactIs_development.ContextConsumer = ContextConsumer;
    reactIs_development.ContextProvider = ContextProvider;
    reactIs_development.Element = Element;
    reactIs_development.ForwardRef = ForwardRef;
    reactIs_development.Fragment = Fragment;
    reactIs_development.Lazy = Lazy;
    reactIs_development.Memo = Memo;
    reactIs_development.Portal = Portal;
    reactIs_development.Profiler = Profiler;
    reactIs_development.StrictMode = StrictMode;
    reactIs_development.Suspense = Suspense;
    reactIs_development.isAsyncMode = isAsyncMode;
    reactIs_development.isConcurrentMode = isConcurrentMode;
    reactIs_development.isContextConsumer = isContextConsumer;
    reactIs_development.isContextProvider = isContextProvider;
    reactIs_development.isElement = isElement;
    reactIs_development.isForwardRef = isForwardRef;
    reactIs_development.isFragment = isFragment;
    reactIs_development.isLazy = isLazy;
    reactIs_development.isMemo = isMemo;
    reactIs_development.isPortal = isPortal;
    reactIs_development.isProfiler = isProfiler;
    reactIs_development.isStrictMode = isStrictMode;
    reactIs_development.isSuspense = isSuspense;
    reactIs_development.isValidElementType = isValidElementType;
    reactIs_development.typeOf = typeOf;
  })();
}

if (process.env.NODE_ENV === 'production') {
  reactIs.exports = reactIs_production_min;
} else {
  reactIs.exports = reactIs_development;
}

var ReactIs$2 = reactIs.exports;
var assign = objectAssign;
var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
var has = has$2;
var checkPropTypes = checkPropTypes_1;
var printWarning = function printWarning() {};
if (process.env.NODE_ENV !== 'production') {
  printWarning = function printWarning(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}
function emptyFunctionThatReturnsNull() {
  return null;
}
var factoryWithTypeCheckers = function factoryWithTypeCheckers(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bigint: createPrimitiveTypeChecker('bigint'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),
    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && _typeof$2(data) === 'object' ? data : {};
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;
  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;
      if (secret !== ReactPropTypesSecret$1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (!manualPropTypeCallCache[cacheKey] &&
          // Avoid spamming the console because they are often not actionable except for lib authors
          manualPropTypeWarningCount < 3) {
            printWarning('You are manually calling a React.PropTypes validation ' + 'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.');
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }
    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
    return chainedCheckType;
  }
  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'), {
          expectedType: expectedType
        });
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }
  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret$1);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs$2.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (process.env.NODE_ENV !== 'production') {
        if (arguments.length > 1) {
          printWarning('Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' + 'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).');
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }
      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }
  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }
    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning('Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.');
        return emptyFunctionThatReturnsNull;
      }
    }
    function validate(props, propName, componentName, location, propFullName) {
      var expectedTypes = [];
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret$1);
        if (checkerResult == null) {
          return null;
        }
        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }
      var expectedTypesMessage = expectedTypes.length > 0 ? ', expected one of type [' + expectedTypes.join(', ') + ']' : '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
    }
    return createChainableTypeChecker(validate);
  }
  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError((componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + type + '`.');
  }
  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        if (!checker) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function isNode(propValue) {
    switch (_typeof$2(propValue)) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }
        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }
        return true;
      default:
        return false;
    }
  }
  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }
    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = _typeof$2(propValue);
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }
  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ReactPropTypesSecret = ReactPropTypesSecret_1;
function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;
var factoryWithThrowingShims = function factoryWithThrowingShims() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
    err.name = 'Invariant Violation';
    throw err;
  }
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

if (process.env.NODE_ENV !== 'production') {
  var ReactIs$1 = reactIs.exports;

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  propTypes.exports = factoryWithTypeCheckers(ReactIs$1.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  propTypes.exports = factoryWithThrowingShims();
}
var PropTypes = propTypes.exports;

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var ReactIs = reactIs.exports;
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var TYPE_STATICS = {};
TYPE_STATICS[ReactIs.ForwardRef] = FORWARD_REF_STATICS;

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function invariant(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }
  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }
    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};
var browser$1 = invariant;

// -- Utilities ----------------------------------------------------------------
function getCacheId(inputs) {
  return JSON.stringify(inputs.map(function (input) {
    return input && _typeof$2(input) === 'object' ? orderedProps(input) : input;
  }));
}
function orderedProps(obj) {
  return Object.keys(obj).sort().map(function (k) {
    var _a;
    return _a = {}, _a[k] = obj[k], _a;
  });
}
var memoizeFormatConstructor = function memoizeFormatConstructor(FormatConstructor, cache) {
  if (cache === void 0) {
    cache = {};
  }
  return function () {
    var _a;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var cacheId = getCacheId(args);
    var format = cacheId && cache[cacheId];
    if (!format) {
      format = new ((_a = FormatConstructor).bind.apply(_a, [void 0].concat(args)))();
      if (cacheId) {
        cache[cacheId] = format;
      }
    }
    return format;
  };
};

// GENERATED FILE
var defaultLocaleData = {
  "locale": "en",
  "pluralRuleFunction": function pluralRuleFunction(n, ord) {
    var s = String(n).split("."),
      v0 = !s[1],
      t0 = Number(s[0]) == n,
      n10 = t0 && s[0].slice(-1),
      n100 = t0 && s[0].slice(-2);
    if (ord) return n10 == 1 && n100 != 11 ? "one" : n10 == 2 && n100 != 12 ? "two" : n10 == 3 && n100 != 13 ? "few" : "other";
    return n == 1 && v0 ? "one" : "other";
  },
  "fields": {
    "year": {
      "displayName": "year",
      "relative": {
        "0": "this year",
        "1": "next year",
        "-1": "last year"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} year",
          "other": "in {0} years"
        },
        "past": {
          "one": "{0} year ago",
          "other": "{0} years ago"
        }
      }
    },
    "year-short": {
      "displayName": "yr.",
      "relative": {
        "0": "this yr.",
        "1": "next yr.",
        "-1": "last yr."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} yr.",
          "other": "in {0} yr."
        },
        "past": {
          "one": "{0} yr. ago",
          "other": "{0} yr. ago"
        }
      }
    },
    "month": {
      "displayName": "month",
      "relative": {
        "0": "this month",
        "1": "next month",
        "-1": "last month"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} month",
          "other": "in {0} months"
        },
        "past": {
          "one": "{0} month ago",
          "other": "{0} months ago"
        }
      }
    },
    "month-short": {
      "displayName": "mo.",
      "relative": {
        "0": "this mo.",
        "1": "next mo.",
        "-1": "last mo."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} mo.",
          "other": "in {0} mo."
        },
        "past": {
          "one": "{0} mo. ago",
          "other": "{0} mo. ago"
        }
      }
    },
    "day": {
      "displayName": "day",
      "relative": {
        "0": "today",
        "1": "tomorrow",
        "-1": "yesterday"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} day",
          "other": "in {0} days"
        },
        "past": {
          "one": "{0} day ago",
          "other": "{0} days ago"
        }
      }
    },
    "day-short": {
      "displayName": "day",
      "relative": {
        "0": "today",
        "1": "tomorrow",
        "-1": "yesterday"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} day",
          "other": "in {0} days"
        },
        "past": {
          "one": "{0} day ago",
          "other": "{0} days ago"
        }
      }
    },
    "hour": {
      "displayName": "hour",
      "relative": {
        "0": "this hour"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} hour",
          "other": "in {0} hours"
        },
        "past": {
          "one": "{0} hour ago",
          "other": "{0} hours ago"
        }
      }
    },
    "hour-short": {
      "displayName": "hr.",
      "relative": {
        "0": "this hour"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} hr.",
          "other": "in {0} hr."
        },
        "past": {
          "one": "{0} hr. ago",
          "other": "{0} hr. ago"
        }
      }
    },
    "minute": {
      "displayName": "minute",
      "relative": {
        "0": "this minute"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} minute",
          "other": "in {0} minutes"
        },
        "past": {
          "one": "{0} minute ago",
          "other": "{0} minutes ago"
        }
      }
    },
    "minute-short": {
      "displayName": "min.",
      "relative": {
        "0": "this minute"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} min.",
          "other": "in {0} min."
        },
        "past": {
          "one": "{0} min. ago",
          "other": "{0} min. ago"
        }
      }
    },
    "second": {
      "displayName": "second",
      "relative": {
        "0": "now"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} second",
          "other": "in {0} seconds"
        },
        "past": {
          "one": "{0} second ago",
          "other": "{0} seconds ago"
        }
      }
    },
    "second-short": {
      "displayName": "sec.",
      "relative": {
        "0": "now"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} sec.",
          "other": "in {0} sec."
        },
        "past": {
          "one": "{0} sec. ago",
          "other": "{0} sec. ago"
        }
      }
    }
  }
};

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

function addLocaleData() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var locales = Array.isArray(data) ? data : [data];
  locales.forEach(function (localeData) {
    if (localeData && localeData.locale) {
      IntlMessageFormat.__addLocaleData(localeData);
      IntlRelativeFormat.__addLocaleData(localeData);
    }
  });
}
function hasLocaleData(locale) {
  var localeParts = (locale || '').split('-');
  while (localeParts.length > 0) {
    if (hasIMFAndIRFLocaleData(localeParts.join('-'))) {
      return true;
    }
    localeParts.pop();
  }
  return false;
}
function hasIMFAndIRFLocaleData(locale) {
  var normalizedLocale = locale && locale.toLowerCase();
  return !!(IntlMessageFormat.__localeData__[normalizedLocale] && IntlRelativeFormat.__localeData__[normalizedLocale]);
}
var _typeof$1 = typeof Symbol === "function" && _typeof$2(Symbol.iterator) === "symbol" ? function (obj) {
  return _typeof$2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof$2(obj);
};
var classCallCheck = function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var inherits = function inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof$2(superClass));
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};
var objectWithoutProperties = function objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
};
var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (_typeof$2(call) === "object" || typeof call === "function") ? call : self;
};
var toConsumableArray = function toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
    return arr2;
  } else {
    return Array.from(arr);
  }
};

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var bool = PropTypes.bool;
var number = PropTypes.number;
var string = PropTypes.string;
var func = PropTypes.func;
var object = PropTypes.object;
var oneOf = PropTypes.oneOf;
var shape = PropTypes.shape;
var any = PropTypes.any;
var oneOfType = PropTypes.oneOfType;
var localeMatcher = oneOf(['best fit', 'lookup']);
var narrowShortLong = oneOf(['narrow', 'short', 'long']);
var numeric2digit = oneOf(['numeric', '2-digit']);
var funcReq = func.isRequired;
var intlConfigPropTypes = {
  locale: string,
  timeZone: string,
  formats: object,
  messages: object,
  textComponent: any,
  defaultLocale: string,
  defaultFormats: object,
  onError: func
};
var intlFormatPropTypes = {
  formatDate: funcReq,
  formatTime: funcReq,
  formatRelative: funcReq,
  formatNumber: funcReq,
  formatPlural: funcReq,
  formatMessage: funcReq,
  formatHTMLMessage: funcReq
};
var intlShape = shape(_extends({}, intlConfigPropTypes, intlFormatPropTypes, {
  formatters: object,
  now: funcReq
}));
var messageDescriptorPropTypes = {
  id: string.isRequired,
  description: oneOfType([string, object]),
  defaultMessage: string
};
var dateTimeFormatPropTypes = {
  localeMatcher: localeMatcher,
  formatMatcher: oneOf(['basic', 'best fit']),
  timeZone: string,
  hour12: bool,
  weekday: narrowShortLong,
  era: narrowShortLong,
  year: numeric2digit,
  month: oneOf(['numeric', '2-digit', 'narrow', 'short', 'long']),
  day: numeric2digit,
  hour: numeric2digit,
  minute: numeric2digit,
  second: numeric2digit,
  timeZoneName: oneOf(['short', 'long'])
};
var numberFormatPropTypes = {
  localeMatcher: localeMatcher,
  style: oneOf(['decimal', 'currency', 'percent']),
  currency: string,
  currencyDisplay: oneOf(['symbol', 'code', 'name']),
  useGrouping: bool,
  minimumIntegerDigits: number,
  minimumFractionDigits: number,
  maximumFractionDigits: number,
  minimumSignificantDigits: number,
  maximumSignificantDigits: number
};
var relativeFormatPropTypes = {
  style: oneOf(['best fit', 'numeric']),
  units: oneOf(['second', 'minute', 'hour', 'day', 'month', 'year', 'second-short', 'minute-short', 'hour-short', 'day-short', 'month-short', 'year-short'])
};
var pluralFormatPropTypes = {
  style: oneOf(['cardinal', 'ordinal'])
};

/*
HTML escaping and shallow-equals implementations are the same as React's
(on purpose.) Therefore, it has the following Copyright and Licensing:

Copyright 2013-2014, Facebook, Inc.
All rights reserved.

This source code is licensed under the BSD-style license found in the LICENSE
file in the root directory of React's source tree.
*/

var intlConfigPropNames = Object.keys(intlConfigPropTypes);
var ESCAPED_CHARS = {
  '&': '&amp;',
  '>': '&gt;',
  '<': '&lt;',
  '"': '&quot;',
  "'": '&#x27;'
};
var UNSAFE_CHARS_REGEX = /[&><"']/g;
function escape(str) {
  return ('' + str).replace(UNSAFE_CHARS_REGEX, function (match) {
    return ESCAPED_CHARS[match];
  });
}
function filterProps(props, whitelist) {
  var defaults$$1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return whitelist.reduce(function (filtered, name) {
    if (props.hasOwnProperty(name)) {
      filtered[name] = props[name];
    } else if (defaults$$1.hasOwnProperty(name)) {
      filtered[name] = defaults$$1[name];
    }
    return filtered;
  }, {});
}
function invariantIntlContext() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    intl = _ref.intl;
  browser$1(intl, '[React Intl] Could not find required `intl` object. ' + '<IntlProvider> needs to exist in the component ancestry.');
}
function shallowEquals(objA, objB) {
  if (objA === objB) {
    return true;
  }
  if ((typeof objA === 'undefined' ? 'undefined' : _typeof$1(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof$1(objB)) !== 'object' || objB === null) {
    return false;
  }
  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }
  return true;
}
function shouldIntlComponentUpdate(_ref2, nextProps, nextState) {
  var props = _ref2.props,
    state = _ref2.state,
    _ref2$context = _ref2.context,
    context = _ref2$context === undefined ? {} : _ref2$context;
  var nextContext = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _context$intl = context.intl,
    intl = _context$intl === undefined ? {} : _context$intl;
  var _nextContext$intl = nextContext.intl,
    nextIntl = _nextContext$intl === undefined ? {} : _nextContext$intl;
  return !shallowEquals(nextProps, props) || !shallowEquals(nextState, state) || !(nextIntl === intl || shallowEquals(filterProps(nextIntl, intlConfigPropNames), filterProps(intl, intlConfigPropNames)));
}
function createError$3(message, exception) {
  var eMsg = exception ? '\n' + exception : '';
  return '[React Intl] ' + message + eMsg;
}
function defaultErrorHandler(error) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error);
  }
}

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

// This is a "hack" until a proper `intl-pluralformat` package is created.

function resolveLocale(locales) {
  // IntlMessageFormat#_resolveLocale() does not depend on `this`.
  return IntlMessageFormat.prototype._resolveLocale(locales);
}
function findPluralFunction(locale) {
  // IntlMessageFormat#_findPluralFunction() does not depend on `this`.
  return IntlMessageFormat.prototype._findPluralRuleFunction(locale);
}
var IntlPluralFormat = function IntlPluralFormat(locales) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  classCallCheck(this, IntlPluralFormat);
  var useOrdinal = options.style === 'ordinal';
  var pluralFn = findPluralFunction(resolveLocale(locales));
  this.format = function (value) {
    return pluralFn(value, useOrdinal);
  };
};

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var DATE_TIME_FORMAT_OPTIONS = Object.keys(dateTimeFormatPropTypes);
var NUMBER_FORMAT_OPTIONS = Object.keys(numberFormatPropTypes);
var RELATIVE_FORMAT_OPTIONS = Object.keys(relativeFormatPropTypes);
var PLURAL_FORMAT_OPTIONS = Object.keys(pluralFormatPropTypes);
var RELATIVE_FORMAT_THRESHOLDS = {
  second: 60,
  // seconds to minute
  minute: 60,
  // minutes to hour
  hour: 24,
  // hours to day
  day: 30,
  // days to month
  month: 12
};
function updateRelativeFormatThresholds(newThresholds) {
  var thresholds = IntlRelativeFormat.thresholds;
  thresholds.second = newThresholds.second;
  thresholds.minute = newThresholds.minute;
  thresholds.hour = newThresholds.hour;
  thresholds.day = newThresholds.day;
  thresholds.month = newThresholds.month;
  thresholds['second-short'] = newThresholds['second-short'];
  thresholds['minute-short'] = newThresholds['minute-short'];
  thresholds['hour-short'] = newThresholds['hour-short'];
  thresholds['day-short'] = newThresholds['day-short'];
  thresholds['month-short'] = newThresholds['month-short'];
}
function getNamedFormat(formats, type, name, onError) {
  var format = formats && formats[type] && formats[type][name];
  if (format) {
    return format;
  }
  onError(createError$3('No ' + type + ' format named: ' + name));
}
function formatDate(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
    formats = config.formats,
    timeZone = config.timeZone;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var date = new Date(value);
  var defaults$$1 = _extends({}, timeZone && {
    timeZone: timeZone
  }, format && getNamedFormat(formats, 'date', format, onError));
  var filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults$$1);
  try {
    return state.getDateTimeFormat(locale, filteredOptions).format(date);
  } catch (e) {
    onError(createError$3('Error formatting date.', e));
  }
  return String(date);
}
function formatTime(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
    formats = config.formats,
    timeZone = config.timeZone;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var date = new Date(value);
  var defaults$$1 = _extends({}, timeZone && {
    timeZone: timeZone
  }, format && getNamedFormat(formats, 'time', format, onError));
  var filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults$$1);
  if (!filteredOptions.hour && !filteredOptions.minute && !filteredOptions.second) {
    // Add default formatting options if hour, minute, or second isn't defined.
    filteredOptions = _extends({}, filteredOptions, {
      hour: 'numeric',
      minute: 'numeric'
    });
  }
  try {
    return state.getDateTimeFormat(locale, filteredOptions).format(date);
  } catch (e) {
    onError(createError$3('Error formatting time.', e));
  }
  return String(date);
}
function formatRelative(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
    formats = config.formats;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var date = new Date(value);
  var now = new Date(options.now);
  var defaults$$1 = format && getNamedFormat(formats, 'relative', format, onError);
  var filteredOptions = filterProps(options, RELATIVE_FORMAT_OPTIONS, defaults$$1);

  // Capture the current threshold values, then temporarily override them with
  // specific values just for this render.
  var oldThresholds = _extends({}, IntlRelativeFormat.thresholds);
  updateRelativeFormatThresholds(RELATIVE_FORMAT_THRESHOLDS);
  try {
    return state.getRelativeFormat(locale, filteredOptions).format(date, {
      now: isFinite(now) ? now : state.now()
    });
  } catch (e) {
    onError(createError$3('Error formatting relative time.', e));
  } finally {
    updateRelativeFormatThresholds(oldThresholds);
  }
  return String(date);
}
function formatNumber(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
    formats = config.formats;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var defaults$$1 = format && getNamedFormat(formats, 'number', format, onError);
  var filteredOptions = filterProps(options, NUMBER_FORMAT_OPTIONS, defaults$$1);
  try {
    return state.getNumberFormat(locale, filteredOptions).format(value);
  } catch (e) {
    onError(createError$3('Error formatting number.', e));
  }
  return String(value);
}
function formatPlural(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale;
  var filteredOptions = filterProps(options, PLURAL_FORMAT_OPTIONS);
  var onError = config.onError || defaultErrorHandler;
  try {
    return state.getPluralFormat(locale, filteredOptions).format(value);
  } catch (e) {
    onError(createError$3('Error formatting plural.', e));
  }
  return 'other';
}
function formatMessage(config, state) {
  var messageDescriptor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var values = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
    formats = config.formats,
    messages = config.messages,
    defaultLocale = config.defaultLocale,
    defaultFormats = config.defaultFormats;
  var id = messageDescriptor.id,
    defaultMessage = messageDescriptor.defaultMessage;

  // Produce a better error if the user calls `intl.formatMessage(element)`

  if (process.env.NODE_ENV !== 'production') {
    browser$1(! /*#__PURE__*/react.exports.isValidElement(config), '[React Intl] Don\'t pass React elements to ' + 'formatMessage(), pass `.props`.');
  }

  // `id` is a required field of a Message Descriptor.
  browser$1(id, '[React Intl] An `id` must be provided to format a message.');
  var message = messages && messages[id];
  var hasValues = Object.keys(values).length > 0;

  // Avoid expensive message formatting for simple messages without values. In
  // development messages will always be formatted in case of missing values.
  if (!hasValues && process.env.NODE_ENV === 'production') {
    return message || defaultMessage || id;
  }
  var formattedMessage = void 0;
  var onError = config.onError || defaultErrorHandler;
  if (message) {
    try {
      var formatter = state.getMessageFormat(message, locale, formats);
      formattedMessage = formatter.format(values);
    } catch (e) {
      onError(createError$3('Error formatting message: "' + id + '" for locale: "' + locale + '"' + (defaultMessage ? ', using default message as fallback.' : ''), e));
    }
  } else {
    // This prevents warnings from littering the console in development
    // when no `messages` are passed into the <IntlProvider> for the
    // default locale, and a default message is in the source.
    if (!defaultMessage || locale && locale.toLowerCase() !== defaultLocale.toLowerCase()) {
      onError(createError$3('Missing message: "' + id + '" for locale: "' + locale + '"' + (defaultMessage ? ', using default message as fallback.' : '')));
    }
  }
  if (!formattedMessage && defaultMessage) {
    try {
      var _formatter = state.getMessageFormat(defaultMessage, defaultLocale, defaultFormats);
      formattedMessage = _formatter.format(values);
    } catch (e) {
      onError(createError$3('Error formatting the default message for: "' + id + '"', e));
    }
  }
  if (!formattedMessage) {
    onError(createError$3('Cannot format message: "' + id + '", ' + ('using message ' + (message || defaultMessage ? 'source' : 'id') + ' as fallback.')));
  }
  return formattedMessage || message || defaultMessage || id;
}
function formatHTMLMessage(config, state, messageDescriptor) {
  var rawValues = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  // Process all the values before they are used when formatting the ICU
  // Message string. Since the formatted message might be injected via
  // `innerHTML`, all String-based values need to be HTML-escaped.
  var escapedValues = Object.keys(rawValues).reduce(function (escaped, name) {
    var value = rawValues[name];
    escaped[name] = typeof value === 'string' ? escape(value) : value;
    return escaped;
  }, {});
  return formatMessage(config, state, messageDescriptor, escapedValues);
}
var format = Object.freeze({
  formatDate: formatDate,
  formatTime: formatTime,
  formatRelative: formatRelative,
  formatNumber: formatNumber,
  formatPlural: formatPlural,
  formatMessage: formatMessage,
  formatHTMLMessage: formatHTMLMessage
});

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var intlConfigPropNames$1 = Object.keys(intlConfigPropTypes);
var intlFormatPropNames = Object.keys(intlFormatPropTypes);

// These are not a static property on the `IntlProvider` class so the intl
// config values can be inherited from an <IntlProvider> ancestor.
var defaultProps = {
  formats: {},
  messages: {},
  timeZone: null,
  textComponent: 'span',
  defaultLocale: 'en',
  defaultFormats: {},
  onError: defaultErrorHandler
};
var IntlProvider = function (_Component) {
  inherits(IntlProvider, _Component);
  function IntlProvider(props) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, IntlProvider);
    var _this = possibleConstructorReturn(this, (IntlProvider.__proto__ || Object.getPrototypeOf(IntlProvider)).call(this, props, context));
    browser$1(typeof Intl !== 'undefined', '[React Intl] The `Intl` APIs must be available in the runtime, ' + 'and do not appear to be built-in. An `Intl` polyfill should be loaded.\n' + 'See: http://formatjs.io/guides/runtime-environments/');
    var intlContext = context.intl;

    // Used to stabilize time when performing an initial rendering so that
    // all relative times use the same reference "now" time.

    var initialNow = void 0;
    if (isFinite(props.initialNow)) {
      initialNow = Number(props.initialNow);
    } else {
      // When an `initialNow` isn't provided via `props`, look to see an
      // <IntlProvider> exists in the ancestry and call its `now()`
      // function to propagate its value for "now".
      initialNow = intlContext ? intlContext.now() : Date.now();
    }

    // Creating `Intl*` formatters is expensive. If there's a parent
    // `<IntlProvider>`, then its formatters will be used. Otherwise, this
    // memoize the `Intl*` constructors and cache them for the lifecycle of
    // this IntlProvider instance.

    var _ref = intlContext || {},
      _ref$formatters = _ref.formatters,
      formatters = _ref$formatters === undefined ? {
        getDateTimeFormat: memoizeFormatConstructor(Intl.DateTimeFormat),
        getNumberFormat: memoizeFormatConstructor(Intl.NumberFormat),
        getMessageFormat: memoizeFormatConstructor(IntlMessageFormat),
        getRelativeFormat: memoizeFormatConstructor(IntlRelativeFormat),
        getPluralFormat: memoizeFormatConstructor(IntlPluralFormat)
      } : _ref$formatters;
    _this.state = _extends({}, formatters, {
      // Wrapper to provide stable "now" time for initial render.
      now: function now() {
        return _this._didDisplay ? Date.now() : initialNow;
      }
    });
    return _this;
  }
  createClass(IntlProvider, [{
    key: 'getConfig',
    value: function getConfig() {
      var intlContext = this.context.intl;

      // Build a whitelisted config object from `props`, defaults, and
      // `context.intl`, if an <IntlProvider> exists in the ancestry.

      var config = filterProps(this.props, intlConfigPropNames$1, intlContext);

      // Apply default props. This must be applied last after the props have
      // been resolved and inherited from any <IntlProvider> in the ancestry.
      // This matches how React resolves `defaultProps`.
      for (var propName in defaultProps) {
        if (config[propName] === undefined) {
          config[propName] = defaultProps[propName];
        }
      }
      if (!hasLocaleData(config.locale)) {
        var _config = config,
          locale = _config.locale,
          defaultLocale = _config.defaultLocale,
          defaultFormats = _config.defaultFormats,
          onError = _config.onError;
        onError(createError$3('Missing locale data for locale: "' + locale + '". ' + ('Using default locale: "' + defaultLocale + '" as fallback.')));

        // Since there's no registered locale data for `locale`, this will
        // fallback to the `defaultLocale` to make sure things can render.
        // The `messages` are overridden to the `defaultProps` empty object
        // to maintain referential equality across re-renders. It's assumed
        // each <FormattedMessage> contains a `defaultMessage` prop.
        config = _extends({}, config, {
          locale: defaultLocale,
          formats: defaultFormats,
          messages: defaultProps.messages
        });
      }
      return config;
    }
  }, {
    key: 'getBoundFormatFns',
    value: function getBoundFormatFns(config, state) {
      return intlFormatPropNames.reduce(function (boundFormatFns, name) {
        boundFormatFns[name] = format[name].bind(null, config, state);
        return boundFormatFns;
      }, {});
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      var config = this.getConfig();

      // Bind intl factories and current config to the format functions.
      var boundFormatFns = this.getBoundFormatFns(config, this.state);
      var _state = this.state,
        now = _state.now,
        formatters = objectWithoutProperties(_state, ['now']);
      return {
        intl: _extends({}, config, boundFormatFns, {
          formatters: formatters,
          now: now
        })
      };
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }
      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._didDisplay = true;
    }
  }, {
    key: 'render',
    value: function render() {
      return react.exports.Children.only(this.props.children);
    }
  }]);
  return IntlProvider;
}(react.exports.Component);
IntlProvider.displayName = 'IntlProvider';
IntlProvider.contextTypes = {
  intl: intlShape
};
IntlProvider.childContextTypes = {
  intl: intlShape.isRequired
};
process.env.NODE_ENV !== "production" ? IntlProvider.propTypes = _extends({}, intlConfigPropTypes, {
  children: PropTypes.element.isRequired,
  initialNow: PropTypes.any
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedDate = function (_Component) {
  inherits(FormattedDate, _Component);
  function FormattedDate(props, context) {
    classCallCheck(this, FormattedDate);
    var _this = possibleConstructorReturn(this, (FormattedDate.__proto__ || Object.getPrototypeOf(FormattedDate)).call(this, props, context));
    invariantIntlContext(context);
    return _this;
  }
  createClass(FormattedDate, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }
      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
        formatDate = _context$intl.formatDate,
        Text = _context$intl.textComponent;
      var _props = this.props,
        value = _props.value,
        children = _props.children;
      var formattedDate = formatDate(value, this.props);
      if (typeof children === 'function') {
        return children(formattedDate);
      }
      return /*#__PURE__*/React.createElement(Text, null, formattedDate);
    }
  }]);
  return FormattedDate;
}(react.exports.Component);
FormattedDate.displayName = 'FormattedDate';
FormattedDate.contextTypes = {
  intl: intlShape
};
process.env.NODE_ENV !== "production" ? FormattedDate.propTypes = _extends({}, dateTimeFormatPropTypes, {
  value: PropTypes.any.isRequired,
  format: PropTypes.string,
  children: PropTypes.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedTime = function (_Component) {
  inherits(FormattedTime, _Component);
  function FormattedTime(props, context) {
    classCallCheck(this, FormattedTime);
    var _this = possibleConstructorReturn(this, (FormattedTime.__proto__ || Object.getPrototypeOf(FormattedTime)).call(this, props, context));
    invariantIntlContext(context);
    return _this;
  }
  createClass(FormattedTime, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }
      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
        formatTime = _context$intl.formatTime,
        Text = _context$intl.textComponent;
      var _props = this.props,
        value = _props.value,
        children = _props.children;
      var formattedTime = formatTime(value, this.props);
      if (typeof children === 'function') {
        return children(formattedTime);
      }
      return /*#__PURE__*/React.createElement(Text, null, formattedTime);
    }
  }]);
  return FormattedTime;
}(react.exports.Component);
FormattedTime.displayName = 'FormattedTime';
FormattedTime.contextTypes = {
  intl: intlShape
};
process.env.NODE_ENV !== "production" ? FormattedTime.propTypes = _extends({}, dateTimeFormatPropTypes, {
  value: PropTypes.any.isRequired,
  format: PropTypes.string,
  children: PropTypes.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var SECOND = 1000;
var MINUTE = 1000 * 60;
var HOUR = 1000 * 60 * 60;
var DAY = 1000 * 60 * 60 * 24;

// The maximum timer delay value is a 32-bit signed integer.
// See: https://mdn.io/setTimeout
var MAX_TIMER_DELAY = 2147483647;
function selectUnits(delta) {
  var absDelta = Math.abs(delta);
  if (absDelta < MINUTE) {
    return 'second';
  }
  if (absDelta < HOUR) {
    return 'minute';
  }
  if (absDelta < DAY) {
    return 'hour';
  }

  // The maximum scheduled delay will be measured in days since the maximum
  // timer delay is less than the number of milliseconds in 25 days.
  return 'day';
}
function getUnitDelay(units) {
  switch (units) {
    case 'second':
      return SECOND;
    case 'minute':
      return MINUTE;
    case 'hour':
      return HOUR;
    case 'day':
      return DAY;
    default:
      return MAX_TIMER_DELAY;
  }
}
function isSameDate(a, b) {
  if (a === b) {
    return true;
  }
  var aTime = new Date(a).getTime();
  var bTime = new Date(b).getTime();
  return isFinite(aTime) && isFinite(bTime) && aTime === bTime;
}
var FormattedRelative = function (_Component) {
  inherits(FormattedRelative, _Component);
  function FormattedRelative(props, context) {
    classCallCheck(this, FormattedRelative);
    var _this = possibleConstructorReturn(this, (FormattedRelative.__proto__ || Object.getPrototypeOf(FormattedRelative)).call(this, props, context));
    invariantIntlContext(context);
    var now = isFinite(props.initialNow) ? Number(props.initialNow) : context.intl.now();

    // `now` is stored as state so that `render()` remains a function of
    // props + state, instead of accessing `Date.now()` inside `render()`.
    _this.state = {
      now: now
    };
    return _this;
  }
  createClass(FormattedRelative, [{
    key: 'scheduleNextUpdate',
    value: function scheduleNextUpdate(props, state) {
      var _this2 = this;

      // Cancel and pending update because we're scheduling a new update.
      clearTimeout(this._timer);
      var value = props.value,
        units = props.units,
        updateInterval = props.updateInterval;
      var time = new Date(value).getTime();

      // If the `updateInterval` is falsy, including `0` or we don't have a
      // valid date, then auto updates have been turned off, so we bail and
      // skip scheduling an update.
      if (!updateInterval || !isFinite(time)) {
        return;
      }
      var delta = time - state.now;
      var unitDelay = getUnitDelay(units || selectUnits(delta));
      var unitRemainder = Math.abs(delta % unitDelay);

      // We want the largest possible timer delay which will still display
      // accurate information while reducing unnecessary re-renders. The delay
      // should be until the next "interesting" moment, like a tick from
      // "1 minute ago" to "2 minutes ago" when the delta is 120,000ms.
      var delay = delta < 0 ? Math.max(updateInterval, unitDelay - unitRemainder) : Math.max(updateInterval, unitRemainder);
      this._timer = setTimeout(function () {
        _this2.setState({
          now: _this2.context.intl.now()
        });
      }, delay);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.scheduleNextUpdate(this.props, this.state);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var nextValue = _ref.value;

      // When the `props.value` date changes, `state.now` needs to be updated,
      // and the next update can be rescheduled.
      if (!isSameDate(nextValue, this.props.value)) {
        this.setState({
          now: this.context.intl.now()
        });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }
      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      this.scheduleNextUpdate(nextProps, nextState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this._timer);
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
        formatRelative = _context$intl.formatRelative,
        Text = _context$intl.textComponent;
      var _props = this.props,
        value = _props.value,
        children = _props.children;
      var formattedRelative = formatRelative(value, _extends({}, this.props, this.state));
      if (typeof children === 'function') {
        return children(formattedRelative);
      }
      return /*#__PURE__*/React.createElement(Text, null, formattedRelative);
    }
  }]);
  return FormattedRelative;
}(react.exports.Component);
FormattedRelative.displayName = 'FormattedRelative';
FormattedRelative.contextTypes = {
  intl: intlShape
};
FormattedRelative.defaultProps = {
  updateInterval: 1000 * 10
};
process.env.NODE_ENV !== "production" ? FormattedRelative.propTypes = _extends({}, relativeFormatPropTypes, {
  value: PropTypes.any.isRequired,
  format: PropTypes.string,
  updateInterval: PropTypes.number,
  initialNow: PropTypes.any,
  children: PropTypes.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedNumber = function (_Component) {
  inherits(FormattedNumber, _Component);
  function FormattedNumber(props, context) {
    classCallCheck(this, FormattedNumber);
    var _this = possibleConstructorReturn(this, (FormattedNumber.__proto__ || Object.getPrototypeOf(FormattedNumber)).call(this, props, context));
    invariantIntlContext(context);
    return _this;
  }
  createClass(FormattedNumber, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }
      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
        formatNumber = _context$intl.formatNumber,
        Text = _context$intl.textComponent;
      var _props = this.props,
        value = _props.value,
        children = _props.children;
      var formattedNumber = formatNumber(value, this.props);
      if (typeof children === 'function') {
        return children(formattedNumber);
      }
      return /*#__PURE__*/React.createElement(Text, null, formattedNumber);
    }
  }]);
  return FormattedNumber;
}(react.exports.Component);
FormattedNumber.displayName = 'FormattedNumber';
FormattedNumber.contextTypes = {
  intl: intlShape
};
process.env.NODE_ENV !== "production" ? FormattedNumber.propTypes = _extends({}, numberFormatPropTypes, {
  value: PropTypes.any.isRequired,
  format: PropTypes.string,
  children: PropTypes.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedPlural = function (_Component) {
  inherits(FormattedPlural, _Component);
  function FormattedPlural(props, context) {
    classCallCheck(this, FormattedPlural);
    var _this = possibleConstructorReturn(this, (FormattedPlural.__proto__ || Object.getPrototypeOf(FormattedPlural)).call(this, props, context));
    invariantIntlContext(context);
    return _this;
  }
  createClass(FormattedPlural, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }
      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
        formatPlural = _context$intl.formatPlural,
        Text = _context$intl.textComponent;
      var _props = this.props,
        value = _props.value,
        other = _props.other,
        children = _props.children;
      var pluralCategory = formatPlural(value, this.props);
      var formattedPlural = this.props[pluralCategory] || other;
      if (typeof children === 'function') {
        return children(formattedPlural);
      }
      return /*#__PURE__*/React.createElement(Text, null, formattedPlural);
    }
  }]);
  return FormattedPlural;
}(react.exports.Component);
FormattedPlural.displayName = 'FormattedPlural';
FormattedPlural.contextTypes = {
  intl: intlShape
};
FormattedPlural.defaultProps = {
  style: 'cardinal'
};
process.env.NODE_ENV !== "production" ? FormattedPlural.propTypes = _extends({}, pluralFormatPropTypes, {
  value: PropTypes.any.isRequired,
  other: PropTypes.node.isRequired,
  zero: PropTypes.node,
  one: PropTypes.node,
  two: PropTypes.node,
  few: PropTypes.node,
  many: PropTypes.node,
  children: PropTypes.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var defaultFormatMessage = function defaultFormatMessage(descriptor, values) {
  if (process.env.NODE_ENV !== 'production') {
    console.error('[React Intl] Could not find required `intl` object. <IntlProvider> needs to exist in the component ancestry. Using default message as fallback.');
  }
  return formatMessage({}, {
    getMessageFormat: memoizeFormatConstructor(IntlMessageFormat)
  }, descriptor, values);
};
var FormattedMessage = function (_Component) {
  inherits(FormattedMessage, _Component);
  function FormattedMessage(props, context) {
    classCallCheck(this, FormattedMessage);
    var _this = possibleConstructorReturn(this, (FormattedMessage.__proto__ || Object.getPrototypeOf(FormattedMessage)).call(this, props, context));
    if (!props.defaultMessage) {
      invariantIntlContext(context);
    }
    return _this;
  }
  createClass(FormattedMessage, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var values = this.props.values;
      var nextValues = nextProps.values;
      if (!shallowEquals(nextValues, values)) {
        return true;
      }

      // Since `values` has already been checked, we know they're not
      // different, so the current `values` are carried over so the shallow
      // equals comparison on the other props isn't affected by the `values`.
      var nextPropsToCheck = _extends({}, nextProps, {
        values: values
      });
      for (var _len = arguments.length, next = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        next[_key - 1] = arguments[_key];
      }
      return shouldIntlComponentUpdate.apply(undefined, [this, nextPropsToCheck].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _ref = this.context.intl || {},
        _ref$formatMessage = _ref.formatMessage,
        formatMessage$$1 = _ref$formatMessage === undefined ? defaultFormatMessage : _ref$formatMessage,
        _ref$textComponent = _ref.textComponent,
        Text = _ref$textComponent === undefined ? 'span' : _ref$textComponent;
      var _props = this.props,
        id = _props.id,
        description = _props.description,
        defaultMessage = _props.defaultMessage,
        values = _props.values,
        _props$tagName = _props.tagName,
        Component$$1 = _props$tagName === undefined ? Text : _props$tagName,
        children = _props.children;
      var tokenDelimiter = void 0;
      var tokenizedValues = void 0;
      var elements = void 0;
      var hasValues = values && Object.keys(values).length > 0;
      if (hasValues) {
        // Creates a token with a random UID that should not be guessable or
        // conflict with other parts of the `message` string.
        var uid = Math.floor(Math.random() * 0x10000000000).toString(16);
        var generateToken = function () {
          var counter = 0;
          return function () {
            return 'ELEMENT-' + uid + '-' + (counter += 1);
          };
        }();

        // Splitting with a delimiter to support IE8. When using a regex
        // with a capture group IE8 does not include the capture group in
        // the resulting array.
        tokenDelimiter = '@__' + uid + '__@';
        tokenizedValues = {};
        elements = {};

        // Iterates over the `props` to keep track of any React Element
        // values so they can be represented by the `token` as a placeholder
        // when the `message` is formatted. This allows the formatted
        // message to then be broken-up into parts with references to the
        // React Elements inserted back in.
        Object.keys(values).forEach(function (name) {
          var value = values[name];
          if ( /*#__PURE__*/react.exports.isValidElement(value)) {
            var token = generateToken();
            tokenizedValues[name] = tokenDelimiter + token + tokenDelimiter;
            elements[token] = value;
          } else {
            tokenizedValues[name] = value;
          }
        });
      }
      var descriptor = {
        id: id,
        description: description,
        defaultMessage: defaultMessage
      };
      var formattedMessage = formatMessage$$1(descriptor, tokenizedValues || values);
      var nodes = void 0;
      var hasElements = elements && Object.keys(elements).length > 0;
      if (hasElements) {
        // Split the message into parts so the React Element values captured
        // above can be inserted back into the rendered message. This
        // approach allows messages to render with React Elements while
        // keeping React's virtual diffing working properly.
        nodes = formattedMessage.split(tokenDelimiter).filter(function (part) {
          return !!part;
        }).map(function (part) {
          return elements[part] || part;
        });
      } else {
        nodes = [formattedMessage];
      }
      if (typeof children === 'function') {
        return children.apply(undefined, toConsumableArray(nodes));
      }

      // Needs to use `createElement()` instead of JSX, otherwise React will
      // warn about a missing `key` prop with rich-text message formatting.
      return react.exports.createElement.apply(undefined, [Component$$1, null].concat(toConsumableArray(nodes)));
    }
  }]);
  return FormattedMessage;
}(react.exports.Component);
FormattedMessage.displayName = 'FormattedMessage';
FormattedMessage.contextTypes = {
  intl: intlShape
};
FormattedMessage.defaultProps = {
  values: {}
};
process.env.NODE_ENV !== "production" ? FormattedMessage.propTypes = _extends({}, messageDescriptorPropTypes, {
  values: PropTypes.object,
  tagName: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedHTMLMessage = function (_Component) {
  inherits(FormattedHTMLMessage, _Component);
  function FormattedHTMLMessage(props, context) {
    classCallCheck(this, FormattedHTMLMessage);
    var _this = possibleConstructorReturn(this, (FormattedHTMLMessage.__proto__ || Object.getPrototypeOf(FormattedHTMLMessage)).call(this, props, context));
    invariantIntlContext(context);
    return _this;
  }
  createClass(FormattedHTMLMessage, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var values = this.props.values;
      var nextValues = nextProps.values;
      if (!shallowEquals(nextValues, values)) {
        return true;
      }

      // Since `values` has already been checked, we know they're not
      // different, so the current `values` are carried over so the shallow
      // equals comparison on the other props isn't affected by the `values`.
      var nextPropsToCheck = _extends({}, nextProps, {
        values: values
      });
      for (var _len = arguments.length, next = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        next[_key - 1] = arguments[_key];
      }
      return shouldIntlComponentUpdate.apply(undefined, [this, nextPropsToCheck].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
        formatHTMLMessage = _context$intl.formatHTMLMessage,
        Text = _context$intl.textComponent;
      var _props = this.props,
        id = _props.id,
        description = _props.description,
        defaultMessage = _props.defaultMessage,
        rawValues = _props.values,
        _props$tagName = _props.tagName,
        Component$$1 = _props$tagName === undefined ? Text : _props$tagName,
        children = _props.children;
      var descriptor = {
        id: id,
        description: description,
        defaultMessage: defaultMessage
      };
      var formattedHTMLMessage = formatHTMLMessage(descriptor, rawValues);
      if (typeof children === 'function') {
        return children(formattedHTMLMessage);
      }

      // Since the message presumably has HTML in it, we need to set
      // `innerHTML` in order for it to be rendered and not escaped by React.
      // To be safe, all string prop values were escaped when formatting the
      // message. It is assumed that the message is not UGC, and came from the
      // developer making it more like a template.
      //
      // Note: There's a perf impact of using this component since there's no
      // way for React to do its virtual DOM diffing.
      var html = {
        __html: formattedHTMLMessage
      };
      return /*#__PURE__*/React.createElement(Component$$1, {
        dangerouslySetInnerHTML: html
      });
    }
  }]);
  return FormattedHTMLMessage;
}(react.exports.Component);
FormattedHTMLMessage.displayName = 'FormattedHTMLMessage';
FormattedHTMLMessage.contextTypes = {
  intl: intlShape
};
FormattedHTMLMessage.defaultProps = {
  values: {}
};
process.env.NODE_ENV !== "production" ? FormattedHTMLMessage.propTypes = _extends({}, messageDescriptorPropTypes, {
  values: PropTypes.object,
  tagName: PropTypes.string,
  children: PropTypes.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

addLocaleData(defaultLocaleData);

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

addLocaleData(allLocaleData);

var img$1 = "data:image/png;base64,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";

var img = "data:image/png;base64,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";

var translationMap = {
  'ja': {
    'gui.extension.gpt32scratch.description': 'OpenAI の GPT-3 からの返答を得る。'
  },
  'ja-Hira': {
    'gui.extension.gpt32scratch.description': 'OpenAI の GPT-3 からのへんとうをえる。'
  }
};
var entry = {
  name: 'Gpt32Scratch',
  extensionId: 'gpt32scratch',
  extensionURL: 'https://ichiroc.github.io/gpt32scratch.mjs',
  collaborator: 'ichiroc',
  iconURL: img$1,
  insetIconURL: img,
  description: /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: "GPT32Scratch Blocks.",
    description: "Description for GPT32Scratch Blocks",
    id: "gui.extension.gpt32scratch.description"
  }),
  featured: true,
  disabled: false,
  bluetoothRequired: false,
  internetConnectionRequired: true,
  helpLink: 'https://github.com/ichiroc/gpt32scratch/',
  translationMap: translationMap
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _toPrimitive(input, hint) {
  if (_typeof$2(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof$2(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof$2(key) === "symbol" ? key : String(key);
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var dist = {};

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof$2(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

var regeneratorRuntime$1 = {exports: {}};

var _typeof = {exports: {}};

(function (module) {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
  }
  module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(_typeof);

(function (module) {
  var _typeof$1 = _typeof.exports["default"];
  function _regeneratorRuntime() {

    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
    module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
      return exports;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
    var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      defineProperty = Object.defineProperty || function (obj, key, desc) {
        obj[key] = desc.value;
      },
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      return Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function define(obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
      return defineProperty(generator, "_invoke", {
        value: makeInvokeMethod(innerFn, self, context)
      }), generator;
    }
    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if ("throw" !== record.type) {
          var result = record.arg,
            value = result.value;
          return value && "object" == _typeof$1(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          }) : PromiseImpl.resolve(value).then(function (unwrapped) {
            result.value = unwrapped, resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }
        reject(record.arg);
      }
      var previousPromise;
      defineProperty(this, "_invoke", {
        value: function value(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }
          return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");
        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }
        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }
          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);
          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }
          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var methodName = context.method,
        method = delegate.iterator[methodName];
      if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
      var record = tryCatch(method, delegate.iterator, context.arg);
      if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
      var info = record.arg;
      return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) return iteratorMethod.call(iterable);
        if ("function" == typeof iterable.next) return iterable;
        if (!isNaN(iterable.length)) {
          var i = -1,
            next = function next() {
              for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
              return next.value = undefined, next.done = !0, next;
            };
          return next.next = next;
        }
      }
      return {
        next: doneResult
      };
    }
    function doneResult() {
      return {
        value: undefined,
        done: !0
      };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function (genFun) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function (arg) {
      return {
        __await: arg
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
      return this;
    }), define(Gp, "toString", function () {
      return "[object Generator]";
    }), exports.keys = function (val) {
      var object = Object(val),
        keys = [];
      for (var key in object) keys.push(key);
      return keys.reverse(), function next() {
        for (; keys.length;) {
          var key = keys.pop();
          if (key in object) return next.value = key, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, exports.values = values, Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      },
      stop: function stop() {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) throw exception;
        var context = this;
        function handle(loc, caught) {
          return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
            record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally) throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        return this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
      }
    }, exports;
  }
  module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(regeneratorRuntime$1);

// TODO(Babel 8): Remove this file.

var runtime = regeneratorRuntime$1.exports();
var regenerator = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if ((typeof globalThis === "undefined" ? "undefined" : _typeof$2(globalThis)) === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

var api = {};

var axios$2 = {exports: {}};

var bind$2 = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

var bind$1 = bind$2;

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return Array.isArray(val);
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return toString.call(val) === '[object FormData]';
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && _typeof$2(val) === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }
  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return toString.call(val) === '[object URLSearchParams]';
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
    return false;
  }
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (_typeof$2(obj) !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }
  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge( /* obj1, obj2, obj3, ... */
) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }
  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind$1(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}
var utils$e = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};

var utils$d = utils$e;
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
var buildURL$2 = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }
  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils$d.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils$d.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }
      if (utils$d.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }
      utils$d.forEach(val, function parseValue(v) {
        if (utils$d.isDate(v)) {
          v = v.toISOString();
        } else if (utils$d.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });
    serializedParams = parts.join('&');
  }
  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }
  return url;
};

var utils$c = utils$e;
function InterceptorManager$1() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager$1.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager$1.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager$1.prototype.forEach = function forEach(fn) {
  utils$c.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};
var InterceptorManager_1 = InterceptorManager$1;

var utils$b = utils$e;
var normalizeHeaderName$1 = function normalizeHeaderName(headers, normalizedName) {
  utils$b.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
var enhanceError$2 = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  error.isAxiosError = true;
  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  };
  return error;
};

var transitional = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};

var enhanceError$1 = enhanceError$2;

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
var createError$2 = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError$1(error, config, code, request, response);
};

var createError$1 = createError$2;

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
var settle$1 = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError$1('Request failed with status code ' + response.status, response.config, null, response.request, response));
  }
};

var utils$a = utils$e;
var cookies$1 = utils$a.isStandardBrowserEnv() ?
// Standard browser envs support document.cookie
function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + '=' + encodeURIComponent(value));
      if (utils$a.isNumber(expires)) {
        cookie.push('expires=' + new Date(expires).toGMTString());
      }
      if (utils$a.isString(path)) {
        cookie.push('path=' + path);
      }
      if (utils$a.isString(domain)) {
        cookie.push('domain=' + domain);
      }
      if (secure === true) {
        cookie.push('secure');
      }
      document.cookie = cookie.join('; ');
    },
    read: function read(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  };
}() :
// Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return {
    write: function write() {},
    read: function read() {
      return null;
    },
    remove: function remove() {}
  };
}();

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
var isAbsoluteURL$1 = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
var combineURLs$1 = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};

var isAbsoluteURL = isAbsoluteURL$1;
var combineURLs = combineURLs$1;

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
var buildFullPath$1 = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

var utils$9 = utils$e;

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders$1 = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;
  if (!headers) {
    return parsed;
  }
  utils$9.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils$9.trim(line.substr(0, i)).toLowerCase();
    val = utils$9.trim(line.substr(i + 1));
    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });
  return parsed;
};

var utils$8 = utils$e;
var isURLSameOrigin$1 = utils$8.isStandardBrowserEnv() ?
// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement('a');
  var originURL;

  /**
  * Parse a URL to discover it's components
  *
  * @param {String} url The URL to be parsed
  * @returns {Object}
  */
  function resolveURL(url) {
    var href = url;
    if (msie) {
      // IE needs attribute set twice to normalize properties
      urlParsingNode.setAttribute('href', href);
      href = urlParsingNode.href;
    }
    urlParsingNode.setAttribute('href', href);

    // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
    };
  }
  originURL = resolveURL(window.location.href);

  /**
  * Determine if a URL shares the same origin as the current location
  *
  * @param {String} requestURL The URL to test
  * @returns {boolean} True if URL shares the same origin, otherwise false
  */
  return function isURLSameOrigin(requestURL) {
    var parsed = utils$8.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() :
// Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel$3(message) {
  this.message = message;
}
Cancel$3.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};
Cancel$3.prototype.__CANCEL__ = true;
var Cancel_1 = Cancel$3;

var utils$7 = utils$e;
var settle = settle$1;
var cookies = cookies$1;
var buildURL$1 = buildURL$2;
var buildFullPath = buildFullPath$1;
var parseHeaders = parseHeaders$1;
var isURLSameOrigin = isURLSameOrigin$1;
var createError = createError$2;
var transitionalDefaults$1 = transitional;
var Cancel$2 = Cancel_1;
var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }
      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }
    if (utils$7.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }
    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL$1(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' || responseType === 'json' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };
      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }
    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      var transitional = config.transitional || transitionalDefaults$1;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils$7.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;
      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils$7.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils$7.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }
    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function onCanceled(cancel) {
        if (!request) {
          return;
        }
        reject(!cancel || cancel && cancel.type ? new Cancel$2('canceled') : cancel);
        request.abort();
        request = null;
      };
      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }
    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

var utils$6 = utils$e;
var normalizeHeaderName = normalizeHeaderName$1;
var enhanceError = enhanceError$2;
var transitionalDefaults = transitional;
var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};
function setContentTypeIfUnset(headers, value) {
  if (!utils$6.isUndefined(headers) && utils$6.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}
function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = xhr;
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = xhr;
  }
  return adapter;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$6.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$6.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
var defaults$3 = {
  transitional: transitionalDefaults,
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils$6.isFormData(data) || utils$6.isArrayBuffer(data) || utils$6.isBuffer(data) || utils$6.isStream(data) || utils$6.isFile(data) || utils$6.isBlob(data)) {
      return data;
    }
    if (utils$6.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils$6.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils$6.isObject(data) || headers && headers['Content-Type'] === 'application/json') {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }
    return data;
  }],
  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional || defaults$3.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';
    if (strictJSONParsing || forcedJSONParsing && utils$6.isString(data) && data.length) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
    }
    return data;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  maxBodyLength: -1,
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};
utils$6.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults$3.headers[method] = {};
});
utils$6.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults$3.headers[method] = utils$6.merge(DEFAULT_CONTENT_TYPE);
});
var defaults_1 = defaults$3;

var utils$5 = utils$e;
var defaults$2 = defaults_1;

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
var transformData$1 = function transformData(data, headers, fns) {
  var context = this || defaults$2;
  /*eslint no-param-reassign:0*/
  utils$5.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });
  return data;
};

var isCancel$1 = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

var utils$4 = utils$e;
var transformData = transformData$1;
var isCancel = isCancel$1;
var defaults$1 = defaults_1;
var Cancel$1 = Cancel_1;

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new Cancel$1('canceled');
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
var dispatchRequest$1 = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(config, config.data, config.headers, config.transformRequest);

  // Flatten headers
  config.headers = utils$4.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
  utils$4.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });
  var adapter = config.adapter || defaults$1.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(config, response.data, response.headers, config.transformResponse);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(config, reason.response.data, reason.response.headers, config.transformResponse);
      }
    }
    return Promise.reject(reason);
  });
};

var utils$3 = utils$e;

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
var mergeConfig$2 = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};
  function getMergedValue(target, source) {
    if (utils$3.isPlainObject(target) && utils$3.isPlainObject(source)) {
      return utils$3.merge(target, source);
    } else if (utils$3.isPlainObject(source)) {
      return utils$3.merge({}, source);
    } else if (utils$3.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils$3.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    } else if (!utils$3.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(undefined, config1[prop]);
    }
  }
  var mergeMap = {
    'url': valueFromConfig2,
    'method': valueFromConfig2,
    'data': valueFromConfig2,
    'baseURL': defaultToConfig2,
    'transformRequest': defaultToConfig2,
    'transformResponse': defaultToConfig2,
    'paramsSerializer': defaultToConfig2,
    'timeout': defaultToConfig2,
    'timeoutMessage': defaultToConfig2,
    'withCredentials': defaultToConfig2,
    'adapter': defaultToConfig2,
    'responseType': defaultToConfig2,
    'xsrfCookieName': defaultToConfig2,
    'xsrfHeaderName': defaultToConfig2,
    'onUploadProgress': defaultToConfig2,
    'onDownloadProgress': defaultToConfig2,
    'decompress': defaultToConfig2,
    'maxContentLength': defaultToConfig2,
    'maxBodyLength': defaultToConfig2,
    'transport': defaultToConfig2,
    'httpAgent': defaultToConfig2,
    'httpsAgent': defaultToConfig2,
    'cancelToken': defaultToConfig2,
    'socketPath': defaultToConfig2,
    'responseEncoding': defaultToConfig2,
    'validateStatus': mergeDirectKeys
  };
  utils$3.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge(prop);
    utils$3.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
};

var data = {
  "version": "0.26.1"
};

var VERSION = data.version;
var validators$1 = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function (type, i) {
  validators$1[type] = function validator(thing) {
    return _typeof$2(thing) === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});
var deprecatedWarnings = {};

/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */
validators$1.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function (value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')));
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(formatMessage(opt, ' has been deprecated since v' + version + ' and will be removed in the near future'));
    }
    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (_typeof$2(options) !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}
var validator$1 = {
  assertOptions: assertOptions,
  validators: validators$1
};

var utils$2 = utils$e;
var buildURL = buildURL$2;
var InterceptorManager = InterceptorManager_1;
var dispatchRequest = dispatchRequest$1;
var mergeConfig$1 = mergeConfig$2;
var validator = validator$1;
var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios$1(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios$1.prototype.request = function request(configOrUrl, config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof configOrUrl === 'string') {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }
  config = mergeConfig$1(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }
  var transitional = config.transitional;
  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }
    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });
  var promise;
  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];
    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);
    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise;
  }
  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }
  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }
  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }
  return promise;
};
Axios$1.prototype.getUri = function getUri(config) {
  config = mergeConfig$1(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils$2.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios$1.prototype[method] = function (url, config) {
    return this.request(mergeConfig$1(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});
utils$2.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios$1.prototype[method] = function (url, data, config) {
    return this.request(mergeConfig$1(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});
var Axios_1 = Axios$1;

var Cancel = Cancel_1;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }
  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  var token = this;

  // eslint-disable-next-line func-names
  this.promise.then(function (cancel) {
    if (!token._listeners) return;
    var i;
    var l = token._listeners.length;
    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });

  // eslint-disable-next-line func-names
  this.promise.then = function (onfulfilled) {
    var _resolve;
    // eslint-disable-next-line func-names
    var promise = new Promise(function (resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);
    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };
    return promise;
  };
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }
    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Subscribe to the cancel signal
 */

CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }
  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};

/**
 * Unsubscribe from the cancel signal
 */

CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};
var CancelToken_1 = CancelToken;

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
var spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

var utils$1 = utils$e;

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
var isAxiosError = function isAxiosError(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
};

var utils = utils$e;
var bind = bind$2;
var Axios = Axios_1;
var mergeConfig = mergeConfig$2;
var defaults = defaults_1;

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };
  return instance;
}

// Create the default instance to be exported
var axios$1 = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios$1.Axios = Axios;

// Expose Cancel & CancelToken
axios$1.Cancel = Cancel_1;
axios$1.CancelToken = CancelToken_1;
axios$1.isCancel = isCancel$1;
axios$1.VERSION = data.version;

// Expose all/spread
axios$1.all = function all(promises) {
  return Promise.all(promises);
};
axios$1.spread = spread;

// Expose isAxiosError
axios$1.isAxiosError = isAxiosError;
axios$2.exports = axios$1;

// Allow use of default import syntax in TypeScript
axios$2.exports.default = axios$1;

var axios = axios$2.exports;

var common = {};

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _isNativeReflectConstruct$2() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct$2()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;
  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;
    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);
      _cache.set(Class, Wrapper);
    }
    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };
  return _wrapNativeSuper(Class);
}

var base = {};

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
(function (exports) {

  /* tslint:disable */
  /* eslint-disable */
  /**
   * OpenAI API
   * APIs for sampling from and fine-tuning language models
   *
   * The version of the OpenAPI document: 1.2.0
   *
   *
   * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
   * https://openapi-generator.tech
   * Do not edit the class manually.
   */
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RequiredError = exports.BaseAPI = exports.COLLECTION_FORMATS = exports.BASE_PATH = void 0;
  var axios_1 = axios;
  exports.BASE_PATH = "https://api.openai.com/v1".replace(/\/+$/, "");
  /**
   *
   * @export
   */
  exports.COLLECTION_FORMATS = {
    csv: ",",
    ssv: " ",
    tsv: "\t",
    pipes: "|"
  };
  /**
   *
   * @export
   * @class BaseAPI
   */
  var BaseAPI = /*#__PURE__*/_createClass(function BaseAPI(configuration) {
    var basePath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : exports.BASE_PATH;
    var axios = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : axios_1.default;
    _classCallCheck(this, BaseAPI);
    this.basePath = basePath;
    this.axios = axios;
    if (configuration) {
      this.configuration = configuration;
      this.basePath = configuration.basePath || this.basePath;
    }
  });
  exports.BaseAPI = BaseAPI;
  /**
   *
   * @export
   * @class RequiredError
   * @extends {Error}
   */
  var RequiredError = /*#__PURE__*/function (_Error) {
    _inherits(RequiredError, _Error);
    var _super = _createSuper$1(RequiredError);
    function RequiredError(field, msg) {
      var _this;
      _classCallCheck(this, RequiredError);
      _this = _super.call(this, msg);
      _this.field = field;
      _this.name = "RequiredError";
      return _this;
    }
    return _createClass(RequiredError);
  }( /*#__PURE__*/_wrapNativeSuper(Error));
  exports.RequiredError = RequiredError;
})(base);

/* tslint:disable */
/* eslint-disable */
/**
 * OpenAI API
 * APIs for sampling from and fine-tuning language models
 *
 * The version of the OpenAPI document: 1.2.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(common, "__esModule", {
  value: true
});
common.createRequestFunction = common.toPathString = common.serializeDataIfNeeded = common.setSearchParams = common.setOAuthToObject = common.setBearerAuthToObject = common.setBasicAuthToObject = common.setApiKeyToObject = common.assertParamExists = common.DUMMY_BASE_URL = void 0;
var base_1 = base;
/**
 *
 * @export
 */
common.DUMMY_BASE_URL = 'https://example.com';
/**
 *
 * @throws {RequiredError}
 * @export
 */
common.assertParamExists = function (functionName, paramName, paramValue) {
  if (paramValue === null || paramValue === undefined) {
    throw new base_1.RequiredError(paramName, "Required parameter ".concat(paramName, " was null or undefined when calling ").concat(functionName, "."));
  }
};
/**
 *
 * @export
 */
common.setApiKeyToObject = function (object, keyParamName, configuration) {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee() {
    var localVarApiKeyValue;
    return regenerator.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(configuration && configuration.apiKey)) {
            _context.next = 12;
            break;
          }
          if (!(typeof configuration.apiKey === 'function')) {
            _context.next = 7;
            break;
          }
          _context.next = 4;
          return configuration.apiKey(keyParamName);
        case 4:
          _context.t0 = _context.sent;
          _context.next = 10;
          break;
        case 7:
          _context.next = 9;
          return configuration.apiKey;
        case 9:
          _context.t0 = _context.sent;
        case 10:
          localVarApiKeyValue = _context.t0;
          object[keyParamName] = localVarApiKeyValue;
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
};
/**
 *
 * @export
 */
common.setBasicAuthToObject = function (object, configuration) {
  if (configuration && (configuration.username || configuration.password)) {
    object["auth"] = {
      username: configuration.username,
      password: configuration.password
    };
  }
};
/**
 *
 * @export
 */
common.setBearerAuthToObject = function (object, configuration) {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee2() {
    var accessToken;
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!(configuration && configuration.accessToken)) {
            _context2.next = 12;
            break;
          }
          if (!(typeof configuration.accessToken === 'function')) {
            _context2.next = 7;
            break;
          }
          _context2.next = 4;
          return configuration.accessToken();
        case 4:
          _context2.t0 = _context2.sent;
          _context2.next = 10;
          break;
        case 7:
          _context2.next = 9;
          return configuration.accessToken;
        case 9:
          _context2.t0 = _context2.sent;
        case 10:
          accessToken = _context2.t0;
          object["Authorization"] = "Bearer " + accessToken;
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
};
/**
 *
 * @export
 */
common.setOAuthToObject = function (object, name, scopes, configuration) {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee3() {
    var localVarAccessTokenValue;
    return regenerator.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (!(configuration && configuration.accessToken)) {
            _context3.next = 12;
            break;
          }
          if (!(typeof configuration.accessToken === 'function')) {
            _context3.next = 7;
            break;
          }
          _context3.next = 4;
          return configuration.accessToken(name, scopes);
        case 4:
          _context3.t0 = _context3.sent;
          _context3.next = 10;
          break;
        case 7:
          _context3.next = 9;
          return configuration.accessToken;
        case 9:
          _context3.t0 = _context3.sent;
        case 10:
          localVarAccessTokenValue = _context3.t0;
          object["Authorization"] = "Bearer " + localVarAccessTokenValue;
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
};
function setFlattenedQueryParams(urlSearchParams, parameter) {
  var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  if (parameter == null) return;
  if (_typeof$2(parameter) === "object") {
    if (Array.isArray(parameter)) {
      parameter.forEach(function (item) {
        return setFlattenedQueryParams(urlSearchParams, item, key);
      });
    } else {
      Object.keys(parameter).forEach(function (currentKey) {
        return setFlattenedQueryParams(urlSearchParams, parameter[currentKey], "".concat(key).concat(key !== '' ? '.' : '').concat(currentKey));
      });
    }
  } else {
    if (urlSearchParams.has(key)) {
      urlSearchParams.append(key, parameter);
    } else {
      urlSearchParams.set(key, parameter);
    }
  }
}
/**
 *
 * @export
 */
common.setSearchParams = function (url) {
  var searchParams = new URLSearchParams(url.search);
  for (var _len = arguments.length, objects = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    objects[_key - 1] = arguments[_key];
  }
  setFlattenedQueryParams(searchParams, objects);
  url.search = searchParams.toString();
};
/**
 *
 * @export
 */
common.serializeDataIfNeeded = function (value, requestOptions, configuration) {
  var nonString = typeof value !== 'string';
  var needsSerialization = nonString && configuration && configuration.isJsonMime ? configuration.isJsonMime(requestOptions.headers['Content-Type']) : nonString;
  return needsSerialization ? JSON.stringify(value !== undefined ? value : {}) : value || "";
};
/**
 *
 * @export
 */
common.toPathString = function (url) {
  return url.pathname + url.search + url.hash;
};
/**
 *
 * @export
 */
common.createRequestFunction = function (axiosArgs, globalAxios, BASE_PATH, configuration) {
  return function () {
    var axios = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : globalAxios;
    var basePath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : BASE_PATH;
    var axiosRequestArgs = Object.assign(Object.assign({}, axiosArgs.options), {
      url: ((configuration === null || configuration === void 0 ? void 0 : configuration.basePath) || basePath) + axiosArgs.url
    });
    return axios.request(axiosRequestArgs);
  };
};

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
(function (exports) {

  /* tslint:disable */
  /* eslint-disable */
  /**
   * OpenAI API
   * APIs for sampling from and fine-tuning language models
   *
   * The version of the OpenAPI document: 1.2.0
   *
   *
   * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
   * https://openapi-generator.tech
   * Do not edit the class manually.
   */
  var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.OpenAIApi = exports.OpenAIApiFactory = exports.OpenAIApiFp = exports.OpenAIApiAxiosParamCreator = exports.CreateImageRequestResponseFormatEnum = exports.CreateImageRequestSizeEnum = exports.ChatCompletionResponseMessageRoleEnum = exports.ChatCompletionRequestMessageRoleEnum = void 0;
  var axios_1 = axios;
  // Some imports not used depending on template conditions
  // @ts-ignore
  var common_1 = common;
  // @ts-ignore
  var base_1 = base;
  exports.ChatCompletionRequestMessageRoleEnum = {
    System: 'system',
    User: 'user',
    Assistant: 'assistant'
  };
  exports.ChatCompletionResponseMessageRoleEnum = {
    System: 'system',
    User: 'user',
    Assistant: 'assistant'
  };
  exports.CreateImageRequestSizeEnum = {
    _256x256: '256x256',
    _512x512: '512x512',
    _1024x1024: '1024x1024'
  };
  exports.CreateImageRequestResponseFormatEnum = {
    Url: 'url',
    B64Json: 'b64_json'
  };
  /**
   * OpenAIApi - axios parameter creator
   * @export
   */
  exports.OpenAIApiAxiosParamCreator = function (configuration) {
    var _this = this;
    return {
      /**
       *
       * @summary Immediately cancel a fine-tune job.
       * @param {string} fineTuneId The ID of the fine-tune job to cancel
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      cancelFineTune: function cancelFineTune(fineTuneId) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee() {
          var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
          return regenerator.wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                // verify required parameter 'fineTuneId' is not null or undefined
                common_1.assertParamExists('cancelFineTune', 'fineTuneId', fineTuneId);
                localVarPath = "/fine-tunes/{fine_tune_id}/cancel".replace("{".concat("fine_tune_id", "}"), encodeURIComponent(String(fineTuneId))); // use dummy base URL string because the URL constructor only accepts absolute URLs.
                localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }
                localVarRequestOptions = Object.assign(Object.assign({
                  method: 'POST'
                }, baseOptions), options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                return _context.abrupt("return", {
                  url: common_1.toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });
              case 11:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
      },
      /**
       *
       * @summary Answers the specified question using the provided documents and examples.  The endpoint first [searches](/docs/api-reference/searches) over provided documents or files to find relevant context. The relevant context is combined with the provided examples and question to create the prompt for [completion](/docs/api-reference/completions).
       * @param {CreateAnswerRequest} createAnswerRequest
       * @param {*} [options] Override http request option.
       * @deprecated
       * @throws {RequiredError}
       */
      createAnswer: function createAnswer(createAnswerRequest) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee2() {
          var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
          return regenerator.wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                // verify required parameter 'createAnswerRequest' is not null or undefined
                common_1.assertParamExists('createAnswer', 'createAnswerRequest', createAnswerRequest);
                localVarPath = "/answers"; // use dummy base URL string because the URL constructor only accepts absolute URLs.
                localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }
                localVarRequestOptions = Object.assign(Object.assign({
                  method: 'POST'
                }, baseOptions), options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                localVarHeaderParameter['Content-Type'] = 'application/json';
                common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                localVarRequestOptions.data = common_1.serializeDataIfNeeded(createAnswerRequest, localVarRequestOptions, configuration);
                return _context2.abrupt("return", {
                  url: common_1.toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });
              case 13:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }));
      },
      /**
       *
       * @summary Creates a completion for the chat message
       * @param {CreateChatCompletionRequest} createChatCompletionRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createChatCompletion: function createChatCompletion(createChatCompletionRequest) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee3() {
          var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
          return regenerator.wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                // verify required parameter 'createChatCompletionRequest' is not null or undefined
                common_1.assertParamExists('createChatCompletion', 'createChatCompletionRequest', createChatCompletionRequest);
                localVarPath = "/chat/completions"; // use dummy base URL string because the URL constructor only accepts absolute URLs.
                localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }
                localVarRequestOptions = Object.assign(Object.assign({
                  method: 'POST'
                }, baseOptions), options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                localVarHeaderParameter['Content-Type'] = 'application/json';
                common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                localVarRequestOptions.data = common_1.serializeDataIfNeeded(createChatCompletionRequest, localVarRequestOptions, configuration);
                return _context3.abrupt("return", {
                  url: common_1.toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });
              case 13:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }));
      },
      /**
       *
       * @summary Classifies the specified `query` using provided examples.  The endpoint first [searches](/docs/api-reference/searches) over the labeled examples to select the ones most relevant for the particular query. Then, the relevant examples are combined with the query to construct a prompt to produce the final label via the [completions](/docs/api-reference/completions) endpoint.  Labeled examples can be provided via an uploaded `file`, or explicitly listed in the request using the `examples` parameter for quick tests and small scale use cases.
       * @param {CreateClassificationRequest} createClassificationRequest
       * @param {*} [options] Override http request option.
       * @deprecated
       * @throws {RequiredError}
       */
      createClassification: function createClassification(createClassificationRequest) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee4() {
          var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
          return regenerator.wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                // verify required parameter 'createClassificationRequest' is not null or undefined
                common_1.assertParamExists('createClassification', 'createClassificationRequest', createClassificationRequest);
                localVarPath = "/classifications"; // use dummy base URL string because the URL constructor only accepts absolute URLs.
                localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }
                localVarRequestOptions = Object.assign(Object.assign({
                  method: 'POST'
                }, baseOptions), options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                localVarHeaderParameter['Content-Type'] = 'application/json';
                common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                localVarRequestOptions.data = common_1.serializeDataIfNeeded(createClassificationRequest, localVarRequestOptions, configuration);
                return _context4.abrupt("return", {
                  url: common_1.toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });
              case 13:
              case "end":
                return _context4.stop();
            }
          }, _callee4);
        }));
      },
      /**
       *
       * @summary Creates a completion for the provided prompt and parameters
       * @param {CreateCompletionRequest} createCompletionRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createCompletion: function createCompletion(createCompletionRequest) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee5() {
          var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
          return regenerator.wrap(function _callee5$(_context5) {
            while (1) switch (_context5.prev = _context5.next) {
              case 0:
                // verify required parameter 'createCompletionRequest' is not null or undefined
                common_1.assertParamExists('createCompletion', 'createCompletionRequest', createCompletionRequest);
                localVarPath = "/completions"; // use dummy base URL string because the URL constructor only accepts absolute URLs.
                localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }
                localVarRequestOptions = Object.assign(Object.assign({
                  method: 'POST'
                }, baseOptions), options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                localVarHeaderParameter['Content-Type'] = 'application/json';
                common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                localVarRequestOptions.data = common_1.serializeDataIfNeeded(createCompletionRequest, localVarRequestOptions, configuration);
                return _context5.abrupt("return", {
                  url: common_1.toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });
              case 13:
              case "end":
                return _context5.stop();
            }
          }, _callee5);
        }));
      },
      /**
       *
       * @summary Creates a new edit for the provided input, instruction, and parameters.
       * @param {CreateEditRequest} createEditRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createEdit: function createEdit(createEditRequest) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee6() {
          var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
          return regenerator.wrap(function _callee6$(_context6) {
            while (1) switch (_context6.prev = _context6.next) {
              case 0:
                // verify required parameter 'createEditRequest' is not null or undefined
                common_1.assertParamExists('createEdit', 'createEditRequest', createEditRequest);
                localVarPath = "/edits"; // use dummy base URL string because the URL constructor only accepts absolute URLs.
                localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }
                localVarRequestOptions = Object.assign(Object.assign({
                  method: 'POST'
                }, baseOptions), options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                localVarHeaderParameter['Content-Type'] = 'application/json';
                common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                localVarRequestOptions.data = common_1.serializeDataIfNeeded(createEditRequest, localVarRequestOptions, configuration);
                return _context6.abrupt("return", {
                  url: common_1.toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });
              case 13:
              case "end":
                return _context6.stop();
            }
          }, _callee6);
        }));
      },
      /**
       *
       * @summary Creates an embedding vector representing the input text.
       * @param {CreateEmbeddingRequest} createEmbeddingRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createEmbedding: function createEmbedding(createEmbeddingRequest) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee7() {
          var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
          return regenerator.wrap(function _callee7$(_context7) {
            while (1) switch (_context7.prev = _context7.next) {
              case 0:
                // verify required parameter 'createEmbeddingRequest' is not null or undefined
                common_1.assertParamExists('createEmbedding', 'createEmbeddingRequest', createEmbeddingRequest);
                localVarPath = "/embeddings"; // use dummy base URL string because the URL constructor only accepts absolute URLs.
                localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }
                localVarRequestOptions = Object.assign(Object.assign({
                  method: 'POST'
                }, baseOptions), options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                localVarHeaderParameter['Content-Type'] = 'application/json';
                common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                localVarRequestOptions.data = common_1.serializeDataIfNeeded(createEmbeddingRequest, localVarRequestOptions, configuration);
                return _context7.abrupt("return", {
                  url: common_1.toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });
              case 13:
              case "end":
                return _context7.stop();
            }
          }, _callee7);
        }));
      },
      /**
       *
       * @summary Upload a file that contains document(s) to be used across various endpoints/features. Currently, the size of all the files uploaded by one organization can be up to 1 GB. Please contact us if you need to increase the storage limit.
       * @param {File} file Name of the [JSON Lines](https://jsonlines.readthedocs.io/en/latest/) file to be uploaded.  If the &#x60;purpose&#x60; is set to \\\&quot;fine-tune\\\&quot;, each line is a JSON record with \\\&quot;prompt\\\&quot; and \\\&quot;completion\\\&quot; fields representing your [training examples](/docs/guides/fine-tuning/prepare-training-data).
       * @param {string} purpose The intended purpose of the uploaded documents.  Use \\\&quot;fine-tune\\\&quot; for [Fine-tuning](/docs/api-reference/fine-tunes). This allows us to validate the format of the uploaded file.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createFile: function createFile(file, purpose) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee8() {
          var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, localVarFormParams, headersFromBaseOptions;
          return regenerator.wrap(function _callee8$(_context8) {
            while (1) switch (_context8.prev = _context8.next) {
              case 0:
                // verify required parameter 'file' is not null or undefined
                common_1.assertParamExists('createFile', 'file', file);
                // verify required parameter 'purpose' is not null or undefined
                common_1.assertParamExists('createFile', 'purpose', purpose);
                localVarPath = "/files"; // use dummy base URL string because the URL constructor only accepts absolute URLs.
                localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }
                localVarRequestOptions = Object.assign(Object.assign({
                  method: 'POST'
                }, baseOptions), options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                localVarFormParams = new (configuration && configuration.formDataCtor || FormData)();
                if (file !== undefined) {
                  localVarFormParams.append('file', file);
                }
                if (purpose !== undefined) {
                  localVarFormParams.append('purpose', purpose);
                }
                localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
                common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), localVarFormParams.getHeaders()), headersFromBaseOptions), options.headers);
                localVarRequestOptions.data = localVarFormParams;
                return _context8.abrupt("return", {
                  url: common_1.toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });
              case 17:
              case "end":
                return _context8.stop();
            }
          }, _callee8);
        }));
      },
      /**
       *
       * @summary Creates a job that fine-tunes a specified model from a given dataset.  Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
       * @param {CreateFineTuneRequest} createFineTuneRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createFineTune: function createFineTune(createFineTuneRequest) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee9() {
          var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
          return regenerator.wrap(function _callee9$(_context9) {
            while (1) switch (_context9.prev = _context9.next) {
              case 0:
                // verify required parameter 'createFineTuneRequest' is not null or undefined
                common_1.assertParamExists('createFineTune', 'createFineTuneRequest', createFineTuneRequest);
                localVarPath = "/fine-tunes"; // use dummy base URL string because the URL constructor only accepts absolute URLs.
                localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }
                localVarRequestOptions = Object.assign(Object.assign({
                  method: 'POST'
                }, baseOptions), options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                localVarHeaderParameter['Content-Type'] = 'application/json';
                common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                localVarRequestOptions.data = common_1.serializeDataIfNeeded(createFineTuneRequest, localVarRequestOptions, configuration);
                return _context9.abrupt("return", {
                  url: common_1.toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });
              case 13:
              case "end":
                return _context9.stop();
            }
          }, _callee9);
        }));
      },
      /**
       *
       * @summary Creates an image given a prompt.
       * @param {CreateImageRequest} createImageRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createImage: function createImage(createImageRequest) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee10() {
          var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
          return regenerator.wrap(function _callee10$(_context10) {
            while (1) switch (_context10.prev = _context10.next) {
              case 0:
                // verify required parameter 'createImageRequest' is not null or undefined
                common_1.assertParamExists('createImage', 'createImageRequest', createImageRequest);
                localVarPath = "/images/generations"; // use dummy base URL string because the URL constructor only accepts absolute URLs.
                localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }
                localVarRequestOptions = Object.assign(Object.assign({
                  method: 'POST'
                }, baseOptions), options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                localVarHeaderParameter['Content-Type'] = 'application/json';
                common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                localVarRequestOptions.data = common_1.serializeDataIfNeeded(createImageRequest, localVarRequestOptions, configuration);
                return _context10.abrupt("return", {
                  url: common_1.toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });
              case 13:
              case "end":
                return _context10.stop();
            }
          }, _callee10);
        }));
      },
      /**
       *
       * @summary Creates an edited or extended image given an original image and a prompt.
       * @param {File} image The image to edit. Must be a valid PNG file, less than 4MB, and square. If mask is not provided, image must have transparency, which will be used as the mask.
       * @param {string} prompt A text description of the desired image(s). The maximum length is 1000 characters.
       * @param {File} [mask] An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where &#x60;image&#x60; should be edited. Must be a valid PNG file, less than 4MB, and have the same dimensions as &#x60;image&#x60;.
       * @param {number} [n] The number of images to generate. Must be between 1 and 10.
       * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
       * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
       * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createImageEdit: function createImageEdit(image, prompt, mask, n, size, responseFormat, user) {
        var options = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : {};
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee11() {
          var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, localVarFormParams, headersFromBaseOptions;
          return regenerator.wrap(function _callee11$(_context11) {
            while (1) switch (_context11.prev = _context11.next) {
              case 0:
                // verify required parameter 'image' is not null or undefined
                common_1.assertParamExists('createImageEdit', 'image', image);
                // verify required parameter 'prompt' is not null or undefined
                common_1.assertParamExists('createImageEdit', 'prompt', prompt);
                localVarPath = "/images/edits"; // use dummy base URL string because the URL constructor only accepts absolute URLs.
                localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }
                localVarRequestOptions = Object.assign(Object.assign({
                  method: 'POST'
                }, baseOptions), options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                localVarFormParams = new (configuration && configuration.formDataCtor || FormData)();
                if (image !== undefined) {
                  localVarFormParams.append('image', image);
                }
                if (mask !== undefined) {
                  localVarFormParams.append('mask', mask);
                }
                if (prompt !== undefined) {
                  localVarFormParams.append('prompt', prompt);
                }
                if (n !== undefined) {
                  localVarFormParams.append('n', n);
                }
                if (size !== undefined) {
                  localVarFormParams.append('size', size);
                }
                if (responseFormat !== undefined) {
                  localVarFormParams.append('response_format', responseFormat);
                }
                if (user !== undefined) {
                  localVarFormParams.append('user', user);
                }
                localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
                common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), localVarFormParams.getHeaders()), headersFromBaseOptions), options.headers);
                localVarRequestOptions.data = localVarFormParams;
                return _context11.abrupt("return", {
                  url: common_1.toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });
              case 22:
              case "end":
                return _context11.stop();
            }
          }, _callee11);
        }));
      },
      /**
       *
       * @summary Creates a variation of a given image.
       * @param {File} image The image to use as the basis for the variation(s). Must be a valid PNG file, less than 4MB, and square.
       * @param {number} [n] The number of images to generate. Must be between 1 and 10.
       * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
       * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
       * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createImageVariation: function createImageVariation(image, n, size, responseFormat, user) {
        var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee12() {
          var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, localVarFormParams, headersFromBaseOptions;
          return regenerator.wrap(function _callee12$(_context12) {
            while (1) switch (_context12.prev = _context12.next) {
              case 0:
                // verify required parameter 'image' is not null or undefined
                common_1.assertParamExists('createImageVariation', 'image', image);
                localVarPath = "/images/variations"; // use dummy base URL string because the URL constructor only accepts absolute URLs.
                localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }
                localVarRequestOptions = Object.assign(Object.assign({
                  method: 'POST'
                }, baseOptions), options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                localVarFormParams = new (configuration && configuration.formDataCtor || FormData)();
                if (image !== undefined) {
                  localVarFormParams.append('image', image);
                }
                if (n !== undefined) {
                  localVarFormParams.append('n', n);
                }
                if (size !== undefined) {
                  localVarFormParams.append('size', size);
                }
                if (responseFormat !== undefined) {
                  localVarFormParams.append('response_format', responseFormat);
                }
                if (user !== undefined) {
                  localVarFormParams.append('user', user);
                }
                localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
                common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), localVarFormParams.getHeaders()), headersFromBaseOptions), options.headers);
                localVarRequestOptions.data = localVarFormParams;
                return _context12.abrupt("return", {
                  url: common_1.toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });
              case 19:
              case "end":
                return _context12.stop();
            }
          }, _callee12);
        }));
      },
      /**
       *
       * @summary Classifies if text violates OpenAI\'s Content Policy
       * @param {CreateModerationRequest} createModerationRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createModeration: function createModeration(createModerationRequest) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee13() {
          var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
          return regenerator.wrap(function _callee13$(_context13) {
            while (1) switch (_context13.prev = _context13.next) {
              case 0:
                // verify required parameter 'createModerationRequest' is not null or undefined
                common_1.assertParamExists('createModeration', 'createModerationRequest', createModerationRequest);
                localVarPath = "/moderations"; // use dummy base URL string because the URL constructor only accepts absolute URLs.
                localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }
                localVarRequestOptions = Object.assign(Object.assign({
                  method: 'POST'
                }, baseOptions), options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                localVarHeaderParameter['Content-Type'] = 'application/json';
                common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                localVarRequestOptions.data = common_1.serializeDataIfNeeded(createModerationRequest, localVarRequestOptions, configuration);
                return _context13.abrupt("return", {
                  url: common_1.toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });
              case 13:
              case "end":
                return _context13.stop();
            }
          }, _callee13);
        }));
      },
      /**
       *
       * @summary The search endpoint computes similarity scores between provided query and documents. Documents can be passed directly to the API if there are no more than 200 of them.  To go beyond the 200 document limit, documents can be processed offline and then used for efficient retrieval at query time. When `file` is set, the search endpoint searches over all the documents in the given file and returns up to the `max_rerank` number of documents. These documents will be returned along with their search scores.  The similarity score is a positive score that usually ranges from 0 to 300 (but can sometimes go higher), where a score above 200 usually means the document is semantically similar to the query.
       * @param {string} engineId The ID of the engine to use for this request.  You can select one of &#x60;ada&#x60;, &#x60;babbage&#x60;, &#x60;curie&#x60;, or &#x60;davinci&#x60;.
       * @param {CreateSearchRequest} createSearchRequest
       * @param {*} [options] Override http request option.
       * @deprecated
       * @throws {RequiredError}
       */
      createSearch: function createSearch(engineId, createSearchRequest) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee14() {
          var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
          return regenerator.wrap(function _callee14$(_context14) {
            while (1) switch (_context14.prev = _context14.next) {
              case 0:
                // verify required parameter 'engineId' is not null or undefined
                common_1.assertParamExists('createSearch', 'engineId', engineId);
                // verify required parameter 'createSearchRequest' is not null or undefined
                common_1.assertParamExists('createSearch', 'createSearchRequest', createSearchRequest);
                localVarPath = "/engines/{engine_id}/search".replace("{".concat("engine_id", "}"), encodeURIComponent(String(engineId))); // use dummy base URL string because the URL constructor only accepts absolute URLs.
                localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }
                localVarRequestOptions = Object.assign(Object.assign({
                  method: 'POST'
                }, baseOptions), options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                localVarHeaderParameter['Content-Type'] = 'application/json';
                common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                localVarRequestOptions.data = common_1.serializeDataIfNeeded(createSearchRequest, localVarRequestOptions, configuration);
                return _context14.abrupt("return", {
                  url: common_1.toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });
              case 14:
              case "end":
                return _context14.stop();
            }
          }, _callee14);
        }));
      },
      /**
       *
       * @summary Transcribes audio into the input language.
       * @param {File} file The audio file to transcribe, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
       * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
       * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should match the audio language.
       * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
       * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
       * @param {string} [language] The language of the input audio. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format will improve accuracy and latency.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createTranscription: function createTranscription(file, model, prompt, responseFormat, temperature, language) {
        var options = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee15() {
          var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, localVarFormParams, headersFromBaseOptions;
          return regenerator.wrap(function _callee15$(_context15) {
            while (1) switch (_context15.prev = _context15.next) {
              case 0:
                // verify required parameter 'file' is not null or undefined
                common_1.assertParamExists('createTranscription', 'file', file);
                // verify required parameter 'model' is not null or undefined
                common_1.assertParamExists('createTranscription', 'model', model);
                localVarPath = "/audio/transcriptions"; // use dummy base URL string because the URL constructor only accepts absolute URLs.
                localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }
                localVarRequestOptions = Object.assign(Object.assign({
                  method: 'POST'
                }, baseOptions), options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                localVarFormParams = new (configuration && configuration.formDataCtor || FormData)();
                if (file !== undefined) {
                  localVarFormParams.append('file', file);
                }
                if (model !== undefined) {
                  localVarFormParams.append('model', model);
                }
                if (prompt !== undefined) {
                  localVarFormParams.append('prompt', prompt);
                }
                if (responseFormat !== undefined) {
                  localVarFormParams.append('response_format', responseFormat);
                }
                if (temperature !== undefined) {
                  localVarFormParams.append('temperature', temperature);
                }
                if (language !== undefined) {
                  localVarFormParams.append('language', language);
                }
                localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
                common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), localVarFormParams.getHeaders()), headersFromBaseOptions), options.headers);
                localVarRequestOptions.data = localVarFormParams;
                return _context15.abrupt("return", {
                  url: common_1.toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });
              case 21:
              case "end":
                return _context15.stop();
            }
          }, _callee15);
        }));
      },
      /**
       *
       * @summary Translates audio into into English.
       * @param {File} file The audio file to translate, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
       * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
       * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should be in English.
       * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
       * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createTranslation: function createTranslation(file, model, prompt, responseFormat, temperature) {
        var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee16() {
          var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, localVarFormParams, headersFromBaseOptions;
          return regenerator.wrap(function _callee16$(_context16) {
            while (1) switch (_context16.prev = _context16.next) {
              case 0:
                // verify required parameter 'file' is not null or undefined
                common_1.assertParamExists('createTranslation', 'file', file);
                // verify required parameter 'model' is not null or undefined
                common_1.assertParamExists('createTranslation', 'model', model);
                localVarPath = "/audio/translations"; // use dummy base URL string because the URL constructor only accepts absolute URLs.
                localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }
                localVarRequestOptions = Object.assign(Object.assign({
                  method: 'POST'
                }, baseOptions), options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                localVarFormParams = new (configuration && configuration.formDataCtor || FormData)();
                if (file !== undefined) {
                  localVarFormParams.append('file', file);
                }
                if (model !== undefined) {
                  localVarFormParams.append('model', model);
                }
                if (prompt !== undefined) {
                  localVarFormParams.append('prompt', prompt);
                }
                if (responseFormat !== undefined) {
                  localVarFormParams.append('response_format', responseFormat);
                }
                if (temperature !== undefined) {
                  localVarFormParams.append('temperature', temperature);
                }
                localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
                common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), localVarFormParams.getHeaders()), headersFromBaseOptions), options.headers);
                localVarRequestOptions.data = localVarFormParams;
                return _context16.abrupt("return", {
                  url: common_1.toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });
              case 20:
              case "end":
                return _context16.stop();
            }
          }, _callee16);
        }));
      },
      /**
       *
       * @summary Delete a file.
       * @param {string} fileId The ID of the file to use for this request
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      deleteFile: function deleteFile(fileId) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee17() {
          var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
          return regenerator.wrap(function _callee17$(_context17) {
            while (1) switch (_context17.prev = _context17.next) {
              case 0:
                // verify required parameter 'fileId' is not null or undefined
                common_1.assertParamExists('deleteFile', 'fileId', fileId);
                localVarPath = "/files/{file_id}".replace("{".concat("file_id", "}"), encodeURIComponent(String(fileId))); // use dummy base URL string because the URL constructor only accepts absolute URLs.
                localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }
                localVarRequestOptions = Object.assign(Object.assign({
                  method: 'DELETE'
                }, baseOptions), options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                return _context17.abrupt("return", {
                  url: common_1.toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });
              case 11:
              case "end":
                return _context17.stop();
            }
          }, _callee17);
        }));
      },
      /**
       *
       * @summary Delete a fine-tuned model. You must have the Owner role in your organization.
       * @param {string} model The model to delete
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      deleteModel: function deleteModel(model) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee18() {
          var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
          return regenerator.wrap(function _callee18$(_context18) {
            while (1) switch (_context18.prev = _context18.next) {
              case 0:
                // verify required parameter 'model' is not null or undefined
                common_1.assertParamExists('deleteModel', 'model', model);
                localVarPath = "/models/{model}".replace("{".concat("model", "}"), encodeURIComponent(String(model))); // use dummy base URL string because the URL constructor only accepts absolute URLs.
                localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }
                localVarRequestOptions = Object.assign(Object.assign({
                  method: 'DELETE'
                }, baseOptions), options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                return _context18.abrupt("return", {
                  url: common_1.toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });
              case 11:
              case "end":
                return _context18.stop();
            }
          }, _callee18);
        }));
      },
      /**
       *
       * @summary Returns the contents of the specified file
       * @param {string} fileId The ID of the file to use for this request
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      downloadFile: function downloadFile(fileId) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee19() {
          var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
          return regenerator.wrap(function _callee19$(_context19) {
            while (1) switch (_context19.prev = _context19.next) {
              case 0:
                // verify required parameter 'fileId' is not null or undefined
                common_1.assertParamExists('downloadFile', 'fileId', fileId);
                localVarPath = "/files/{file_id}/content".replace("{".concat("file_id", "}"), encodeURIComponent(String(fileId))); // use dummy base URL string because the URL constructor only accepts absolute URLs.
                localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }
                localVarRequestOptions = Object.assign(Object.assign({
                  method: 'GET'
                }, baseOptions), options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                return _context19.abrupt("return", {
                  url: common_1.toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });
              case 11:
              case "end":
                return _context19.stop();
            }
          }, _callee19);
        }));
      },
      /**
       *
       * @summary Lists the currently available (non-finetuned) models, and provides basic information about each one such as the owner and availability.
       * @param {*} [options] Override http request option.
       * @deprecated
       * @throws {RequiredError}
       */
      listEngines: function listEngines() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee20() {
          var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
          return regenerator.wrap(function _callee20$(_context20) {
            while (1) switch (_context20.prev = _context20.next) {
              case 0:
                localVarPath = "/engines"; // use dummy base URL string because the URL constructor only accepts absolute URLs.
                localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }
                localVarRequestOptions = Object.assign(Object.assign({
                  method: 'GET'
                }, baseOptions), options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                return _context20.abrupt("return", {
                  url: common_1.toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });
              case 10:
              case "end":
                return _context20.stop();
            }
          }, _callee20);
        }));
      },
      /**
       *
       * @summary Returns a list of files that belong to the user\'s organization.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      listFiles: function listFiles() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee21() {
          var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
          return regenerator.wrap(function _callee21$(_context21) {
            while (1) switch (_context21.prev = _context21.next) {
              case 0:
                localVarPath = "/files"; // use dummy base URL string because the URL constructor only accepts absolute URLs.
                localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }
                localVarRequestOptions = Object.assign(Object.assign({
                  method: 'GET'
                }, baseOptions), options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                return _context21.abrupt("return", {
                  url: common_1.toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });
              case 10:
              case "end":
                return _context21.stop();
            }
          }, _callee21);
        }));
      },
      /**
       *
       * @summary Get fine-grained status updates for a fine-tune job.
       * @param {string} fineTuneId The ID of the fine-tune job to get events for.
       * @param {boolean} [stream] Whether to stream events for the fine-tune job. If set to true, events will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available. The stream will terminate with a &#x60;data: [DONE]&#x60; message when the job is finished (succeeded, cancelled, or failed).  If set to false, only events generated so far will be returned.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      listFineTuneEvents: function listFineTuneEvents(fineTuneId, stream) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee22() {
          var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
          return regenerator.wrap(function _callee22$(_context22) {
            while (1) switch (_context22.prev = _context22.next) {
              case 0:
                // verify required parameter 'fineTuneId' is not null or undefined
                common_1.assertParamExists('listFineTuneEvents', 'fineTuneId', fineTuneId);
                localVarPath = "/fine-tunes/{fine_tune_id}/events".replace("{".concat("fine_tune_id", "}"), encodeURIComponent(String(fineTuneId))); // use dummy base URL string because the URL constructor only accepts absolute URLs.
                localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }
                localVarRequestOptions = Object.assign(Object.assign({
                  method: 'GET'
                }, baseOptions), options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                if (stream !== undefined) {
                  localVarQueryParameter['stream'] = stream;
                }
                common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                return _context22.abrupt("return", {
                  url: common_1.toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });
              case 12:
              case "end":
                return _context22.stop();
            }
          }, _callee22);
        }));
      },
      /**
       *
       * @summary List your organization\'s fine-tuning jobs
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      listFineTunes: function listFineTunes() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee23() {
          var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
          return regenerator.wrap(function _callee23$(_context23) {
            while (1) switch (_context23.prev = _context23.next) {
              case 0:
                localVarPath = "/fine-tunes"; // use dummy base URL string because the URL constructor only accepts absolute URLs.
                localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }
                localVarRequestOptions = Object.assign(Object.assign({
                  method: 'GET'
                }, baseOptions), options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                return _context23.abrupt("return", {
                  url: common_1.toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });
              case 10:
              case "end":
                return _context23.stop();
            }
          }, _callee23);
        }));
      },
      /**
       *
       * @summary Lists the currently available models, and provides basic information about each one such as the owner and availability.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      listModels: function listModels() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee24() {
          var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
          return regenerator.wrap(function _callee24$(_context24) {
            while (1) switch (_context24.prev = _context24.next) {
              case 0:
                localVarPath = "/models"; // use dummy base URL string because the URL constructor only accepts absolute URLs.
                localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }
                localVarRequestOptions = Object.assign(Object.assign({
                  method: 'GET'
                }, baseOptions), options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                return _context24.abrupt("return", {
                  url: common_1.toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });
              case 10:
              case "end":
                return _context24.stop();
            }
          }, _callee24);
        }));
      },
      /**
       *
       * @summary Retrieves a model instance, providing basic information about it such as the owner and availability.
       * @param {string} engineId The ID of the engine to use for this request
       * @param {*} [options] Override http request option.
       * @deprecated
       * @throws {RequiredError}
       */
      retrieveEngine: function retrieveEngine(engineId) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee25() {
          var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
          return regenerator.wrap(function _callee25$(_context25) {
            while (1) switch (_context25.prev = _context25.next) {
              case 0:
                // verify required parameter 'engineId' is not null or undefined
                common_1.assertParamExists('retrieveEngine', 'engineId', engineId);
                localVarPath = "/engines/{engine_id}".replace("{".concat("engine_id", "}"), encodeURIComponent(String(engineId))); // use dummy base URL string because the URL constructor only accepts absolute URLs.
                localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }
                localVarRequestOptions = Object.assign(Object.assign({
                  method: 'GET'
                }, baseOptions), options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                return _context25.abrupt("return", {
                  url: common_1.toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });
              case 11:
              case "end":
                return _context25.stop();
            }
          }, _callee25);
        }));
      },
      /**
       *
       * @summary Returns information about a specific file.
       * @param {string} fileId The ID of the file to use for this request
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      retrieveFile: function retrieveFile(fileId) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee26() {
          var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
          return regenerator.wrap(function _callee26$(_context26) {
            while (1) switch (_context26.prev = _context26.next) {
              case 0:
                // verify required parameter 'fileId' is not null or undefined
                common_1.assertParamExists('retrieveFile', 'fileId', fileId);
                localVarPath = "/files/{file_id}".replace("{".concat("file_id", "}"), encodeURIComponent(String(fileId))); // use dummy base URL string because the URL constructor only accepts absolute URLs.
                localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }
                localVarRequestOptions = Object.assign(Object.assign({
                  method: 'GET'
                }, baseOptions), options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                return _context26.abrupt("return", {
                  url: common_1.toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });
              case 11:
              case "end":
                return _context26.stop();
            }
          }, _callee26);
        }));
      },
      /**
       *
       * @summary Gets info about the fine-tune job.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
       * @param {string} fineTuneId The ID of the fine-tune job
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      retrieveFineTune: function retrieveFineTune(fineTuneId) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee27() {
          var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
          return regenerator.wrap(function _callee27$(_context27) {
            while (1) switch (_context27.prev = _context27.next) {
              case 0:
                // verify required parameter 'fineTuneId' is not null or undefined
                common_1.assertParamExists('retrieveFineTune', 'fineTuneId', fineTuneId);
                localVarPath = "/fine-tunes/{fine_tune_id}".replace("{".concat("fine_tune_id", "}"), encodeURIComponent(String(fineTuneId))); // use dummy base URL string because the URL constructor only accepts absolute URLs.
                localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }
                localVarRequestOptions = Object.assign(Object.assign({
                  method: 'GET'
                }, baseOptions), options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                return _context27.abrupt("return", {
                  url: common_1.toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });
              case 11:
              case "end":
                return _context27.stop();
            }
          }, _callee27);
        }));
      },
      /**
       *
       * @summary Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
       * @param {string} model The ID of the model to use for this request
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      retrieveModel: function retrieveModel(model) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee28() {
          var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
          return regenerator.wrap(function _callee28$(_context28) {
            while (1) switch (_context28.prev = _context28.next) {
              case 0:
                // verify required parameter 'model' is not null or undefined
                common_1.assertParamExists('retrieveModel', 'model', model);
                localVarPath = "/models/{model}".replace("{".concat("model", "}"), encodeURIComponent(String(model))); // use dummy base URL string because the URL constructor only accepts absolute URLs.
                localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }
                localVarRequestOptions = Object.assign(Object.assign({
                  method: 'GET'
                }, baseOptions), options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                return _context28.abrupt("return", {
                  url: common_1.toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });
              case 11:
              case "end":
                return _context28.stop();
            }
          }, _callee28);
        }));
      }
    };
  };
  /**
   * OpenAIApi - functional programming interface
   * @export
   */
  exports.OpenAIApiFp = function (configuration) {
    var localVarAxiosParamCreator = exports.OpenAIApiAxiosParamCreator(configuration);
    return {
      /**
       *
       * @summary Immediately cancel a fine-tune job.
       * @param {string} fineTuneId The ID of the fine-tune job to cancel
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      cancelFineTune: function cancelFineTune(fineTuneId, options) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee29() {
          var localVarAxiosArgs;
          return regenerator.wrap(function _callee29$(_context29) {
            while (1) switch (_context29.prev = _context29.next) {
              case 0:
                _context29.next = 2;
                return localVarAxiosParamCreator.cancelFineTune(fineTuneId, options);
              case 2:
                localVarAxiosArgs = _context29.sent;
                return _context29.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));
              case 4:
              case "end":
                return _context29.stop();
            }
          }, _callee29);
        }));
      },
      /**
       *
       * @summary Answers the specified question using the provided documents and examples.  The endpoint first [searches](/docs/api-reference/searches) over provided documents or files to find relevant context. The relevant context is combined with the provided examples and question to create the prompt for [completion](/docs/api-reference/completions).
       * @param {CreateAnswerRequest} createAnswerRequest
       * @param {*} [options] Override http request option.
       * @deprecated
       * @throws {RequiredError}
       */
      createAnswer: function createAnswer(createAnswerRequest, options) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee30() {
          var localVarAxiosArgs;
          return regenerator.wrap(function _callee30$(_context30) {
            while (1) switch (_context30.prev = _context30.next) {
              case 0:
                _context30.next = 2;
                return localVarAxiosParamCreator.createAnswer(createAnswerRequest, options);
              case 2:
                localVarAxiosArgs = _context30.sent;
                return _context30.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));
              case 4:
              case "end":
                return _context30.stop();
            }
          }, _callee30);
        }));
      },
      /**
       *
       * @summary Creates a completion for the chat message
       * @param {CreateChatCompletionRequest} createChatCompletionRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createChatCompletion: function createChatCompletion(createChatCompletionRequest, options) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee31() {
          var localVarAxiosArgs;
          return regenerator.wrap(function _callee31$(_context31) {
            while (1) switch (_context31.prev = _context31.next) {
              case 0:
                _context31.next = 2;
                return localVarAxiosParamCreator.createChatCompletion(createChatCompletionRequest, options);
              case 2:
                localVarAxiosArgs = _context31.sent;
                return _context31.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));
              case 4:
              case "end":
                return _context31.stop();
            }
          }, _callee31);
        }));
      },
      /**
       *
       * @summary Classifies the specified `query` using provided examples.  The endpoint first [searches](/docs/api-reference/searches) over the labeled examples to select the ones most relevant for the particular query. Then, the relevant examples are combined with the query to construct a prompt to produce the final label via the [completions](/docs/api-reference/completions) endpoint.  Labeled examples can be provided via an uploaded `file`, or explicitly listed in the request using the `examples` parameter for quick tests and small scale use cases.
       * @param {CreateClassificationRequest} createClassificationRequest
       * @param {*} [options] Override http request option.
       * @deprecated
       * @throws {RequiredError}
       */
      createClassification: function createClassification(createClassificationRequest, options) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee32() {
          var localVarAxiosArgs;
          return regenerator.wrap(function _callee32$(_context32) {
            while (1) switch (_context32.prev = _context32.next) {
              case 0:
                _context32.next = 2;
                return localVarAxiosParamCreator.createClassification(createClassificationRequest, options);
              case 2:
                localVarAxiosArgs = _context32.sent;
                return _context32.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));
              case 4:
              case "end":
                return _context32.stop();
            }
          }, _callee32);
        }));
      },
      /**
       *
       * @summary Creates a completion for the provided prompt and parameters
       * @param {CreateCompletionRequest} createCompletionRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createCompletion: function createCompletion(createCompletionRequest, options) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee33() {
          var localVarAxiosArgs;
          return regenerator.wrap(function _callee33$(_context33) {
            while (1) switch (_context33.prev = _context33.next) {
              case 0:
                _context33.next = 2;
                return localVarAxiosParamCreator.createCompletion(createCompletionRequest, options);
              case 2:
                localVarAxiosArgs = _context33.sent;
                return _context33.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));
              case 4:
              case "end":
                return _context33.stop();
            }
          }, _callee33);
        }));
      },
      /**
       *
       * @summary Creates a new edit for the provided input, instruction, and parameters.
       * @param {CreateEditRequest} createEditRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createEdit: function createEdit(createEditRequest, options) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee34() {
          var localVarAxiosArgs;
          return regenerator.wrap(function _callee34$(_context34) {
            while (1) switch (_context34.prev = _context34.next) {
              case 0:
                _context34.next = 2;
                return localVarAxiosParamCreator.createEdit(createEditRequest, options);
              case 2:
                localVarAxiosArgs = _context34.sent;
                return _context34.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));
              case 4:
              case "end":
                return _context34.stop();
            }
          }, _callee34);
        }));
      },
      /**
       *
       * @summary Creates an embedding vector representing the input text.
       * @param {CreateEmbeddingRequest} createEmbeddingRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createEmbedding: function createEmbedding(createEmbeddingRequest, options) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee35() {
          var localVarAxiosArgs;
          return regenerator.wrap(function _callee35$(_context35) {
            while (1) switch (_context35.prev = _context35.next) {
              case 0:
                _context35.next = 2;
                return localVarAxiosParamCreator.createEmbedding(createEmbeddingRequest, options);
              case 2:
                localVarAxiosArgs = _context35.sent;
                return _context35.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));
              case 4:
              case "end":
                return _context35.stop();
            }
          }, _callee35);
        }));
      },
      /**
       *
       * @summary Upload a file that contains document(s) to be used across various endpoints/features. Currently, the size of all the files uploaded by one organization can be up to 1 GB. Please contact us if you need to increase the storage limit.
       * @param {File} file Name of the [JSON Lines](https://jsonlines.readthedocs.io/en/latest/) file to be uploaded.  If the &#x60;purpose&#x60; is set to \\\&quot;fine-tune\\\&quot;, each line is a JSON record with \\\&quot;prompt\\\&quot; and \\\&quot;completion\\\&quot; fields representing your [training examples](/docs/guides/fine-tuning/prepare-training-data).
       * @param {string} purpose The intended purpose of the uploaded documents.  Use \\\&quot;fine-tune\\\&quot; for [Fine-tuning](/docs/api-reference/fine-tunes). This allows us to validate the format of the uploaded file.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createFile: function createFile(file, purpose, options) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee36() {
          var localVarAxiosArgs;
          return regenerator.wrap(function _callee36$(_context36) {
            while (1) switch (_context36.prev = _context36.next) {
              case 0:
                _context36.next = 2;
                return localVarAxiosParamCreator.createFile(file, purpose, options);
              case 2:
                localVarAxiosArgs = _context36.sent;
                return _context36.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));
              case 4:
              case "end":
                return _context36.stop();
            }
          }, _callee36);
        }));
      },
      /**
       *
       * @summary Creates a job that fine-tunes a specified model from a given dataset.  Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
       * @param {CreateFineTuneRequest} createFineTuneRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createFineTune: function createFineTune(createFineTuneRequest, options) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee37() {
          var localVarAxiosArgs;
          return regenerator.wrap(function _callee37$(_context37) {
            while (1) switch (_context37.prev = _context37.next) {
              case 0:
                _context37.next = 2;
                return localVarAxiosParamCreator.createFineTune(createFineTuneRequest, options);
              case 2:
                localVarAxiosArgs = _context37.sent;
                return _context37.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));
              case 4:
              case "end":
                return _context37.stop();
            }
          }, _callee37);
        }));
      },
      /**
       *
       * @summary Creates an image given a prompt.
       * @param {CreateImageRequest} createImageRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createImage: function createImage(createImageRequest, options) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee38() {
          var localVarAxiosArgs;
          return regenerator.wrap(function _callee38$(_context38) {
            while (1) switch (_context38.prev = _context38.next) {
              case 0:
                _context38.next = 2;
                return localVarAxiosParamCreator.createImage(createImageRequest, options);
              case 2:
                localVarAxiosArgs = _context38.sent;
                return _context38.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));
              case 4:
              case "end":
                return _context38.stop();
            }
          }, _callee38);
        }));
      },
      /**
       *
       * @summary Creates an edited or extended image given an original image and a prompt.
       * @param {File} image The image to edit. Must be a valid PNG file, less than 4MB, and square. If mask is not provided, image must have transparency, which will be used as the mask.
       * @param {string} prompt A text description of the desired image(s). The maximum length is 1000 characters.
       * @param {File} [mask] An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where &#x60;image&#x60; should be edited. Must be a valid PNG file, less than 4MB, and have the same dimensions as &#x60;image&#x60;.
       * @param {number} [n] The number of images to generate. Must be between 1 and 10.
       * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
       * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
       * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createImageEdit: function createImageEdit(image, prompt, mask, n, size, responseFormat, user, options) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee39() {
          var localVarAxiosArgs;
          return regenerator.wrap(function _callee39$(_context39) {
            while (1) switch (_context39.prev = _context39.next) {
              case 0:
                _context39.next = 2;
                return localVarAxiosParamCreator.createImageEdit(image, prompt, mask, n, size, responseFormat, user, options);
              case 2:
                localVarAxiosArgs = _context39.sent;
                return _context39.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));
              case 4:
              case "end":
                return _context39.stop();
            }
          }, _callee39);
        }));
      },
      /**
       *
       * @summary Creates a variation of a given image.
       * @param {File} image The image to use as the basis for the variation(s). Must be a valid PNG file, less than 4MB, and square.
       * @param {number} [n] The number of images to generate. Must be between 1 and 10.
       * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
       * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
       * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createImageVariation: function createImageVariation(image, n, size, responseFormat, user, options) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee40() {
          var localVarAxiosArgs;
          return regenerator.wrap(function _callee40$(_context40) {
            while (1) switch (_context40.prev = _context40.next) {
              case 0:
                _context40.next = 2;
                return localVarAxiosParamCreator.createImageVariation(image, n, size, responseFormat, user, options);
              case 2:
                localVarAxiosArgs = _context40.sent;
                return _context40.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));
              case 4:
              case "end":
                return _context40.stop();
            }
          }, _callee40);
        }));
      },
      /**
       *
       * @summary Classifies if text violates OpenAI\'s Content Policy
       * @param {CreateModerationRequest} createModerationRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createModeration: function createModeration(createModerationRequest, options) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee41() {
          var localVarAxiosArgs;
          return regenerator.wrap(function _callee41$(_context41) {
            while (1) switch (_context41.prev = _context41.next) {
              case 0:
                _context41.next = 2;
                return localVarAxiosParamCreator.createModeration(createModerationRequest, options);
              case 2:
                localVarAxiosArgs = _context41.sent;
                return _context41.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));
              case 4:
              case "end":
                return _context41.stop();
            }
          }, _callee41);
        }));
      },
      /**
       *
       * @summary The search endpoint computes similarity scores between provided query and documents. Documents can be passed directly to the API if there are no more than 200 of them.  To go beyond the 200 document limit, documents can be processed offline and then used for efficient retrieval at query time. When `file` is set, the search endpoint searches over all the documents in the given file and returns up to the `max_rerank` number of documents. These documents will be returned along with their search scores.  The similarity score is a positive score that usually ranges from 0 to 300 (but can sometimes go higher), where a score above 200 usually means the document is semantically similar to the query.
       * @param {string} engineId The ID of the engine to use for this request.  You can select one of &#x60;ada&#x60;, &#x60;babbage&#x60;, &#x60;curie&#x60;, or &#x60;davinci&#x60;.
       * @param {CreateSearchRequest} createSearchRequest
       * @param {*} [options] Override http request option.
       * @deprecated
       * @throws {RequiredError}
       */
      createSearch: function createSearch(engineId, createSearchRequest, options) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee42() {
          var localVarAxiosArgs;
          return regenerator.wrap(function _callee42$(_context42) {
            while (1) switch (_context42.prev = _context42.next) {
              case 0:
                _context42.next = 2;
                return localVarAxiosParamCreator.createSearch(engineId, createSearchRequest, options);
              case 2:
                localVarAxiosArgs = _context42.sent;
                return _context42.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));
              case 4:
              case "end":
                return _context42.stop();
            }
          }, _callee42);
        }));
      },
      /**
       *
       * @summary Transcribes audio into the input language.
       * @param {File} file The audio file to transcribe, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
       * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
       * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should match the audio language.
       * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
       * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
       * @param {string} [language] The language of the input audio. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format will improve accuracy and latency.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createTranscription: function createTranscription(file, model, prompt, responseFormat, temperature, language, options) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee43() {
          var localVarAxiosArgs;
          return regenerator.wrap(function _callee43$(_context43) {
            while (1) switch (_context43.prev = _context43.next) {
              case 0:
                _context43.next = 2;
                return localVarAxiosParamCreator.createTranscription(file, model, prompt, responseFormat, temperature, language, options);
              case 2:
                localVarAxiosArgs = _context43.sent;
                return _context43.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));
              case 4:
              case "end":
                return _context43.stop();
            }
          }, _callee43);
        }));
      },
      /**
       *
       * @summary Translates audio into into English.
       * @param {File} file The audio file to translate, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
       * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
       * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should be in English.
       * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
       * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createTranslation: function createTranslation(file, model, prompt, responseFormat, temperature, options) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee44() {
          var localVarAxiosArgs;
          return regenerator.wrap(function _callee44$(_context44) {
            while (1) switch (_context44.prev = _context44.next) {
              case 0:
                _context44.next = 2;
                return localVarAxiosParamCreator.createTranslation(file, model, prompt, responseFormat, temperature, options);
              case 2:
                localVarAxiosArgs = _context44.sent;
                return _context44.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));
              case 4:
              case "end":
                return _context44.stop();
            }
          }, _callee44);
        }));
      },
      /**
       *
       * @summary Delete a file.
       * @param {string} fileId The ID of the file to use for this request
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      deleteFile: function deleteFile(fileId, options) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee45() {
          var localVarAxiosArgs;
          return regenerator.wrap(function _callee45$(_context45) {
            while (1) switch (_context45.prev = _context45.next) {
              case 0:
                _context45.next = 2;
                return localVarAxiosParamCreator.deleteFile(fileId, options);
              case 2:
                localVarAxiosArgs = _context45.sent;
                return _context45.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));
              case 4:
              case "end":
                return _context45.stop();
            }
          }, _callee45);
        }));
      },
      /**
       *
       * @summary Delete a fine-tuned model. You must have the Owner role in your organization.
       * @param {string} model The model to delete
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      deleteModel: function deleteModel(model, options) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee46() {
          var localVarAxiosArgs;
          return regenerator.wrap(function _callee46$(_context46) {
            while (1) switch (_context46.prev = _context46.next) {
              case 0:
                _context46.next = 2;
                return localVarAxiosParamCreator.deleteModel(model, options);
              case 2:
                localVarAxiosArgs = _context46.sent;
                return _context46.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));
              case 4:
              case "end":
                return _context46.stop();
            }
          }, _callee46);
        }));
      },
      /**
       *
       * @summary Returns the contents of the specified file
       * @param {string} fileId The ID of the file to use for this request
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      downloadFile: function downloadFile(fileId, options) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee47() {
          var localVarAxiosArgs;
          return regenerator.wrap(function _callee47$(_context47) {
            while (1) switch (_context47.prev = _context47.next) {
              case 0:
                _context47.next = 2;
                return localVarAxiosParamCreator.downloadFile(fileId, options);
              case 2:
                localVarAxiosArgs = _context47.sent;
                return _context47.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));
              case 4:
              case "end":
                return _context47.stop();
            }
          }, _callee47);
        }));
      },
      /**
       *
       * @summary Lists the currently available (non-finetuned) models, and provides basic information about each one such as the owner and availability.
       * @param {*} [options] Override http request option.
       * @deprecated
       * @throws {RequiredError}
       */
      listEngines: function listEngines(options) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee48() {
          var localVarAxiosArgs;
          return regenerator.wrap(function _callee48$(_context48) {
            while (1) switch (_context48.prev = _context48.next) {
              case 0:
                _context48.next = 2;
                return localVarAxiosParamCreator.listEngines(options);
              case 2:
                localVarAxiosArgs = _context48.sent;
                return _context48.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));
              case 4:
              case "end":
                return _context48.stop();
            }
          }, _callee48);
        }));
      },
      /**
       *
       * @summary Returns a list of files that belong to the user\'s organization.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      listFiles: function listFiles(options) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee49() {
          var localVarAxiosArgs;
          return regenerator.wrap(function _callee49$(_context49) {
            while (1) switch (_context49.prev = _context49.next) {
              case 0:
                _context49.next = 2;
                return localVarAxiosParamCreator.listFiles(options);
              case 2:
                localVarAxiosArgs = _context49.sent;
                return _context49.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));
              case 4:
              case "end":
                return _context49.stop();
            }
          }, _callee49);
        }));
      },
      /**
       *
       * @summary Get fine-grained status updates for a fine-tune job.
       * @param {string} fineTuneId The ID of the fine-tune job to get events for.
       * @param {boolean} [stream] Whether to stream events for the fine-tune job. If set to true, events will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available. The stream will terminate with a &#x60;data: [DONE]&#x60; message when the job is finished (succeeded, cancelled, or failed).  If set to false, only events generated so far will be returned.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      listFineTuneEvents: function listFineTuneEvents(fineTuneId, stream, options) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee50() {
          var localVarAxiosArgs;
          return regenerator.wrap(function _callee50$(_context50) {
            while (1) switch (_context50.prev = _context50.next) {
              case 0:
                _context50.next = 2;
                return localVarAxiosParamCreator.listFineTuneEvents(fineTuneId, stream, options);
              case 2:
                localVarAxiosArgs = _context50.sent;
                return _context50.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));
              case 4:
              case "end":
                return _context50.stop();
            }
          }, _callee50);
        }));
      },
      /**
       *
       * @summary List your organization\'s fine-tuning jobs
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      listFineTunes: function listFineTunes(options) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee51() {
          var localVarAxiosArgs;
          return regenerator.wrap(function _callee51$(_context51) {
            while (1) switch (_context51.prev = _context51.next) {
              case 0:
                _context51.next = 2;
                return localVarAxiosParamCreator.listFineTunes(options);
              case 2:
                localVarAxiosArgs = _context51.sent;
                return _context51.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));
              case 4:
              case "end":
                return _context51.stop();
            }
          }, _callee51);
        }));
      },
      /**
       *
       * @summary Lists the currently available models, and provides basic information about each one such as the owner and availability.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      listModels: function listModels(options) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee52() {
          var localVarAxiosArgs;
          return regenerator.wrap(function _callee52$(_context52) {
            while (1) switch (_context52.prev = _context52.next) {
              case 0:
                _context52.next = 2;
                return localVarAxiosParamCreator.listModels(options);
              case 2:
                localVarAxiosArgs = _context52.sent;
                return _context52.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));
              case 4:
              case "end":
                return _context52.stop();
            }
          }, _callee52);
        }));
      },
      /**
       *
       * @summary Retrieves a model instance, providing basic information about it such as the owner and availability.
       * @param {string} engineId The ID of the engine to use for this request
       * @param {*} [options] Override http request option.
       * @deprecated
       * @throws {RequiredError}
       */
      retrieveEngine: function retrieveEngine(engineId, options) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee53() {
          var localVarAxiosArgs;
          return regenerator.wrap(function _callee53$(_context53) {
            while (1) switch (_context53.prev = _context53.next) {
              case 0:
                _context53.next = 2;
                return localVarAxiosParamCreator.retrieveEngine(engineId, options);
              case 2:
                localVarAxiosArgs = _context53.sent;
                return _context53.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));
              case 4:
              case "end":
                return _context53.stop();
            }
          }, _callee53);
        }));
      },
      /**
       *
       * @summary Returns information about a specific file.
       * @param {string} fileId The ID of the file to use for this request
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      retrieveFile: function retrieveFile(fileId, options) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee54() {
          var localVarAxiosArgs;
          return regenerator.wrap(function _callee54$(_context54) {
            while (1) switch (_context54.prev = _context54.next) {
              case 0:
                _context54.next = 2;
                return localVarAxiosParamCreator.retrieveFile(fileId, options);
              case 2:
                localVarAxiosArgs = _context54.sent;
                return _context54.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));
              case 4:
              case "end":
                return _context54.stop();
            }
          }, _callee54);
        }));
      },
      /**
       *
       * @summary Gets info about the fine-tune job.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
       * @param {string} fineTuneId The ID of the fine-tune job
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      retrieveFineTune: function retrieveFineTune(fineTuneId, options) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee55() {
          var localVarAxiosArgs;
          return regenerator.wrap(function _callee55$(_context55) {
            while (1) switch (_context55.prev = _context55.next) {
              case 0:
                _context55.next = 2;
                return localVarAxiosParamCreator.retrieveFineTune(fineTuneId, options);
              case 2:
                localVarAxiosArgs = _context55.sent;
                return _context55.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));
              case 4:
              case "end":
                return _context55.stop();
            }
          }, _callee55);
        }));
      },
      /**
       *
       * @summary Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
       * @param {string} model The ID of the model to use for this request
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      retrieveModel: function retrieveModel(model, options) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee56() {
          var localVarAxiosArgs;
          return regenerator.wrap(function _callee56$(_context56) {
            while (1) switch (_context56.prev = _context56.next) {
              case 0:
                _context56.next = 2;
                return localVarAxiosParamCreator.retrieveModel(model, options);
              case 2:
                localVarAxiosArgs = _context56.sent;
                return _context56.abrupt("return", common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration));
              case 4:
              case "end":
                return _context56.stop();
            }
          }, _callee56);
        }));
      }
    };
  };
  /**
   * OpenAIApi - factory interface
   * @export
   */
  exports.OpenAIApiFactory = function (configuration, basePath, axios) {
    var localVarFp = exports.OpenAIApiFp(configuration);
    return {
      /**
       *
       * @summary Immediately cancel a fine-tune job.
       * @param {string} fineTuneId The ID of the fine-tune job to cancel
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      cancelFineTune: function cancelFineTune(fineTuneId, options) {
        return localVarFp.cancelFineTune(fineTuneId, options).then(function (request) {
          return request(axios, basePath);
        });
      },
      /**
       *
       * @summary Answers the specified question using the provided documents and examples.  The endpoint first [searches](/docs/api-reference/searches) over provided documents or files to find relevant context. The relevant context is combined with the provided examples and question to create the prompt for [completion](/docs/api-reference/completions).
       * @param {CreateAnswerRequest} createAnswerRequest
       * @param {*} [options] Override http request option.
       * @deprecated
       * @throws {RequiredError}
       */
      createAnswer: function createAnswer(createAnswerRequest, options) {
        return localVarFp.createAnswer(createAnswerRequest, options).then(function (request) {
          return request(axios, basePath);
        });
      },
      /**
       *
       * @summary Creates a completion for the chat message
       * @param {CreateChatCompletionRequest} createChatCompletionRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createChatCompletion: function createChatCompletion(createChatCompletionRequest, options) {
        return localVarFp.createChatCompletion(createChatCompletionRequest, options).then(function (request) {
          return request(axios, basePath);
        });
      },
      /**
       *
       * @summary Classifies the specified `query` using provided examples.  The endpoint first [searches](/docs/api-reference/searches) over the labeled examples to select the ones most relevant for the particular query. Then, the relevant examples are combined with the query to construct a prompt to produce the final label via the [completions](/docs/api-reference/completions) endpoint.  Labeled examples can be provided via an uploaded `file`, or explicitly listed in the request using the `examples` parameter for quick tests and small scale use cases.
       * @param {CreateClassificationRequest} createClassificationRequest
       * @param {*} [options] Override http request option.
       * @deprecated
       * @throws {RequiredError}
       */
      createClassification: function createClassification(createClassificationRequest, options) {
        return localVarFp.createClassification(createClassificationRequest, options).then(function (request) {
          return request(axios, basePath);
        });
      },
      /**
       *
       * @summary Creates a completion for the provided prompt and parameters
       * @param {CreateCompletionRequest} createCompletionRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createCompletion: function createCompletion(createCompletionRequest, options) {
        return localVarFp.createCompletion(createCompletionRequest, options).then(function (request) {
          return request(axios, basePath);
        });
      },
      /**
       *
       * @summary Creates a new edit for the provided input, instruction, and parameters.
       * @param {CreateEditRequest} createEditRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createEdit: function createEdit(createEditRequest, options) {
        return localVarFp.createEdit(createEditRequest, options).then(function (request) {
          return request(axios, basePath);
        });
      },
      /**
       *
       * @summary Creates an embedding vector representing the input text.
       * @param {CreateEmbeddingRequest} createEmbeddingRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createEmbedding: function createEmbedding(createEmbeddingRequest, options) {
        return localVarFp.createEmbedding(createEmbeddingRequest, options).then(function (request) {
          return request(axios, basePath);
        });
      },
      /**
       *
       * @summary Upload a file that contains document(s) to be used across various endpoints/features. Currently, the size of all the files uploaded by one organization can be up to 1 GB. Please contact us if you need to increase the storage limit.
       * @param {File} file Name of the [JSON Lines](https://jsonlines.readthedocs.io/en/latest/) file to be uploaded.  If the &#x60;purpose&#x60; is set to \\\&quot;fine-tune\\\&quot;, each line is a JSON record with \\\&quot;prompt\\\&quot; and \\\&quot;completion\\\&quot; fields representing your [training examples](/docs/guides/fine-tuning/prepare-training-data).
       * @param {string} purpose The intended purpose of the uploaded documents.  Use \\\&quot;fine-tune\\\&quot; for [Fine-tuning](/docs/api-reference/fine-tunes). This allows us to validate the format of the uploaded file.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createFile: function createFile(file, purpose, options) {
        return localVarFp.createFile(file, purpose, options).then(function (request) {
          return request(axios, basePath);
        });
      },
      /**
       *
       * @summary Creates a job that fine-tunes a specified model from a given dataset.  Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
       * @param {CreateFineTuneRequest} createFineTuneRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createFineTune: function createFineTune(createFineTuneRequest, options) {
        return localVarFp.createFineTune(createFineTuneRequest, options).then(function (request) {
          return request(axios, basePath);
        });
      },
      /**
       *
       * @summary Creates an image given a prompt.
       * @param {CreateImageRequest} createImageRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createImage: function createImage(createImageRequest, options) {
        return localVarFp.createImage(createImageRequest, options).then(function (request) {
          return request(axios, basePath);
        });
      },
      /**
       *
       * @summary Creates an edited or extended image given an original image and a prompt.
       * @param {File} image The image to edit. Must be a valid PNG file, less than 4MB, and square. If mask is not provided, image must have transparency, which will be used as the mask.
       * @param {string} prompt A text description of the desired image(s). The maximum length is 1000 characters.
       * @param {File} [mask] An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where &#x60;image&#x60; should be edited. Must be a valid PNG file, less than 4MB, and have the same dimensions as &#x60;image&#x60;.
       * @param {number} [n] The number of images to generate. Must be between 1 and 10.
       * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
       * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
       * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createImageEdit: function createImageEdit(image, prompt, mask, n, size, responseFormat, user, options) {
        return localVarFp.createImageEdit(image, prompt, mask, n, size, responseFormat, user, options).then(function (request) {
          return request(axios, basePath);
        });
      },
      /**
       *
       * @summary Creates a variation of a given image.
       * @param {File} image The image to use as the basis for the variation(s). Must be a valid PNG file, less than 4MB, and square.
       * @param {number} [n] The number of images to generate. Must be between 1 and 10.
       * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
       * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
       * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createImageVariation: function createImageVariation(image, n, size, responseFormat, user, options) {
        return localVarFp.createImageVariation(image, n, size, responseFormat, user, options).then(function (request) {
          return request(axios, basePath);
        });
      },
      /**
       *
       * @summary Classifies if text violates OpenAI\'s Content Policy
       * @param {CreateModerationRequest} createModerationRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createModeration: function createModeration(createModerationRequest, options) {
        return localVarFp.createModeration(createModerationRequest, options).then(function (request) {
          return request(axios, basePath);
        });
      },
      /**
       *
       * @summary The search endpoint computes similarity scores between provided query and documents. Documents can be passed directly to the API if there are no more than 200 of them.  To go beyond the 200 document limit, documents can be processed offline and then used for efficient retrieval at query time. When `file` is set, the search endpoint searches over all the documents in the given file and returns up to the `max_rerank` number of documents. These documents will be returned along with their search scores.  The similarity score is a positive score that usually ranges from 0 to 300 (but can sometimes go higher), where a score above 200 usually means the document is semantically similar to the query.
       * @param {string} engineId The ID of the engine to use for this request.  You can select one of &#x60;ada&#x60;, &#x60;babbage&#x60;, &#x60;curie&#x60;, or &#x60;davinci&#x60;.
       * @param {CreateSearchRequest} createSearchRequest
       * @param {*} [options] Override http request option.
       * @deprecated
       * @throws {RequiredError}
       */
      createSearch: function createSearch(engineId, createSearchRequest, options) {
        return localVarFp.createSearch(engineId, createSearchRequest, options).then(function (request) {
          return request(axios, basePath);
        });
      },
      /**
       *
       * @summary Transcribes audio into the input language.
       * @param {File} file The audio file to transcribe, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
       * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
       * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should match the audio language.
       * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
       * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
       * @param {string} [language] The language of the input audio. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format will improve accuracy and latency.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createTranscription: function createTranscription(file, model, prompt, responseFormat, temperature, language, options) {
        return localVarFp.createTranscription(file, model, prompt, responseFormat, temperature, language, options).then(function (request) {
          return request(axios, basePath);
        });
      },
      /**
       *
       * @summary Translates audio into into English.
       * @param {File} file The audio file to translate, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
       * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
       * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should be in English.
       * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
       * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      createTranslation: function createTranslation(file, model, prompt, responseFormat, temperature, options) {
        return localVarFp.createTranslation(file, model, prompt, responseFormat, temperature, options).then(function (request) {
          return request(axios, basePath);
        });
      },
      /**
       *
       * @summary Delete a file.
       * @param {string} fileId The ID of the file to use for this request
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      deleteFile: function deleteFile(fileId, options) {
        return localVarFp.deleteFile(fileId, options).then(function (request) {
          return request(axios, basePath);
        });
      },
      /**
       *
       * @summary Delete a fine-tuned model. You must have the Owner role in your organization.
       * @param {string} model The model to delete
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      deleteModel: function deleteModel(model, options) {
        return localVarFp.deleteModel(model, options).then(function (request) {
          return request(axios, basePath);
        });
      },
      /**
       *
       * @summary Returns the contents of the specified file
       * @param {string} fileId The ID of the file to use for this request
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      downloadFile: function downloadFile(fileId, options) {
        return localVarFp.downloadFile(fileId, options).then(function (request) {
          return request(axios, basePath);
        });
      },
      /**
       *
       * @summary Lists the currently available (non-finetuned) models, and provides basic information about each one such as the owner and availability.
       * @param {*} [options] Override http request option.
       * @deprecated
       * @throws {RequiredError}
       */
      listEngines: function listEngines(options) {
        return localVarFp.listEngines(options).then(function (request) {
          return request(axios, basePath);
        });
      },
      /**
       *
       * @summary Returns a list of files that belong to the user\'s organization.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      listFiles: function listFiles(options) {
        return localVarFp.listFiles(options).then(function (request) {
          return request(axios, basePath);
        });
      },
      /**
       *
       * @summary Get fine-grained status updates for a fine-tune job.
       * @param {string} fineTuneId The ID of the fine-tune job to get events for.
       * @param {boolean} [stream] Whether to stream events for the fine-tune job. If set to true, events will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available. The stream will terminate with a &#x60;data: [DONE]&#x60; message when the job is finished (succeeded, cancelled, or failed).  If set to false, only events generated so far will be returned.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      listFineTuneEvents: function listFineTuneEvents(fineTuneId, stream, options) {
        return localVarFp.listFineTuneEvents(fineTuneId, stream, options).then(function (request) {
          return request(axios, basePath);
        });
      },
      /**
       *
       * @summary List your organization\'s fine-tuning jobs
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      listFineTunes: function listFineTunes(options) {
        return localVarFp.listFineTunes(options).then(function (request) {
          return request(axios, basePath);
        });
      },
      /**
       *
       * @summary Lists the currently available models, and provides basic information about each one such as the owner and availability.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      listModels: function listModels(options) {
        return localVarFp.listModels(options).then(function (request) {
          return request(axios, basePath);
        });
      },
      /**
       *
       * @summary Retrieves a model instance, providing basic information about it such as the owner and availability.
       * @param {string} engineId The ID of the engine to use for this request
       * @param {*} [options] Override http request option.
       * @deprecated
       * @throws {RequiredError}
       */
      retrieveEngine: function retrieveEngine(engineId, options) {
        return localVarFp.retrieveEngine(engineId, options).then(function (request) {
          return request(axios, basePath);
        });
      },
      /**
       *
       * @summary Returns information about a specific file.
       * @param {string} fileId The ID of the file to use for this request
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      retrieveFile: function retrieveFile(fileId, options) {
        return localVarFp.retrieveFile(fileId, options).then(function (request) {
          return request(axios, basePath);
        });
      },
      /**
       *
       * @summary Gets info about the fine-tune job.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
       * @param {string} fineTuneId The ID of the fine-tune job
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      retrieveFineTune: function retrieveFineTune(fineTuneId, options) {
        return localVarFp.retrieveFineTune(fineTuneId, options).then(function (request) {
          return request(axios, basePath);
        });
      },
      /**
       *
       * @summary Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
       * @param {string} model The ID of the model to use for this request
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      retrieveModel: function retrieveModel(model, options) {
        return localVarFp.retrieveModel(model, options).then(function (request) {
          return request(axios, basePath);
        });
      }
    };
  };
  /**
   * OpenAIApi - object-oriented interface
   * @export
   * @class OpenAIApi
   * @extends {BaseAPI}
   */
  var OpenAIApi = /*#__PURE__*/function (_base_1$BaseAPI) {
    _inherits(OpenAIApi, _base_1$BaseAPI);
    var _super = _createSuper(OpenAIApi);
    function OpenAIApi() {
      _classCallCheck(this, OpenAIApi);
      return _super.apply(this, arguments);
    }
    _createClass(OpenAIApi, [{
      key: "cancelFineTune",
      value:
      /**
       *
       * @summary Immediately cancel a fine-tune job.
       * @param {string} fineTuneId The ID of the fine-tune job to cancel
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
      function cancelFineTune(fineTuneId, options) {
        var _this2 = this;
        return exports.OpenAIApiFp(this.configuration).cancelFineTune(fineTuneId, options).then(function (request) {
          return request(_this2.axios, _this2.basePath);
        });
      }
      /**
       *
       * @summary Answers the specified question using the provided documents and examples.  The endpoint first [searches](/docs/api-reference/searches) over provided documents or files to find relevant context. The relevant context is combined with the provided examples and question to create the prompt for [completion](/docs/api-reference/completions).
       * @param {CreateAnswerRequest} createAnswerRequest
       * @param {*} [options] Override http request option.
       * @deprecated
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
    }, {
      key: "createAnswer",
      value: function createAnswer(createAnswerRequest, options) {
        var _this3 = this;
        return exports.OpenAIApiFp(this.configuration).createAnswer(createAnswerRequest, options).then(function (request) {
          return request(_this3.axios, _this3.basePath);
        });
      }
      /**
       *
       * @summary Creates a completion for the chat message
       * @param {CreateChatCompletionRequest} createChatCompletionRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
    }, {
      key: "createChatCompletion",
      value: function createChatCompletion(createChatCompletionRequest, options) {
        var _this4 = this;
        return exports.OpenAIApiFp(this.configuration).createChatCompletion(createChatCompletionRequest, options).then(function (request) {
          return request(_this4.axios, _this4.basePath);
        });
      }
      /**
       *
       * @summary Classifies the specified `query` using provided examples.  The endpoint first [searches](/docs/api-reference/searches) over the labeled examples to select the ones most relevant for the particular query. Then, the relevant examples are combined with the query to construct a prompt to produce the final label via the [completions](/docs/api-reference/completions) endpoint.  Labeled examples can be provided via an uploaded `file`, or explicitly listed in the request using the `examples` parameter for quick tests and small scale use cases.
       * @param {CreateClassificationRequest} createClassificationRequest
       * @param {*} [options] Override http request option.
       * @deprecated
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
    }, {
      key: "createClassification",
      value: function createClassification(createClassificationRequest, options) {
        var _this5 = this;
        return exports.OpenAIApiFp(this.configuration).createClassification(createClassificationRequest, options).then(function (request) {
          return request(_this5.axios, _this5.basePath);
        });
      }
      /**
       *
       * @summary Creates a completion for the provided prompt and parameters
       * @param {CreateCompletionRequest} createCompletionRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
    }, {
      key: "createCompletion",
      value: function createCompletion(createCompletionRequest, options) {
        var _this6 = this;
        return exports.OpenAIApiFp(this.configuration).createCompletion(createCompletionRequest, options).then(function (request) {
          return request(_this6.axios, _this6.basePath);
        });
      }
      /**
       *
       * @summary Creates a new edit for the provided input, instruction, and parameters.
       * @param {CreateEditRequest} createEditRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
    }, {
      key: "createEdit",
      value: function createEdit(createEditRequest, options) {
        var _this7 = this;
        return exports.OpenAIApiFp(this.configuration).createEdit(createEditRequest, options).then(function (request) {
          return request(_this7.axios, _this7.basePath);
        });
      }
      /**
       *
       * @summary Creates an embedding vector representing the input text.
       * @param {CreateEmbeddingRequest} createEmbeddingRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
    }, {
      key: "createEmbedding",
      value: function createEmbedding(createEmbeddingRequest, options) {
        var _this8 = this;
        return exports.OpenAIApiFp(this.configuration).createEmbedding(createEmbeddingRequest, options).then(function (request) {
          return request(_this8.axios, _this8.basePath);
        });
      }
      /**
       *
       * @summary Upload a file that contains document(s) to be used across various endpoints/features. Currently, the size of all the files uploaded by one organization can be up to 1 GB. Please contact us if you need to increase the storage limit.
       * @param {File} file Name of the [JSON Lines](https://jsonlines.readthedocs.io/en/latest/) file to be uploaded.  If the &#x60;purpose&#x60; is set to \\\&quot;fine-tune\\\&quot;, each line is a JSON record with \\\&quot;prompt\\\&quot; and \\\&quot;completion\\\&quot; fields representing your [training examples](/docs/guides/fine-tuning/prepare-training-data).
       * @param {string} purpose The intended purpose of the uploaded documents.  Use \\\&quot;fine-tune\\\&quot; for [Fine-tuning](/docs/api-reference/fine-tunes). This allows us to validate the format of the uploaded file.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
    }, {
      key: "createFile",
      value: function createFile(file, purpose, options) {
        var _this9 = this;
        return exports.OpenAIApiFp(this.configuration).createFile(file, purpose, options).then(function (request) {
          return request(_this9.axios, _this9.basePath);
        });
      }
      /**
       *
       * @summary Creates a job that fine-tunes a specified model from a given dataset.  Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
       * @param {CreateFineTuneRequest} createFineTuneRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
    }, {
      key: "createFineTune",
      value: function createFineTune(createFineTuneRequest, options) {
        var _this10 = this;
        return exports.OpenAIApiFp(this.configuration).createFineTune(createFineTuneRequest, options).then(function (request) {
          return request(_this10.axios, _this10.basePath);
        });
      }
      /**
       *
       * @summary Creates an image given a prompt.
       * @param {CreateImageRequest} createImageRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
    }, {
      key: "createImage",
      value: function createImage(createImageRequest, options) {
        var _this11 = this;
        return exports.OpenAIApiFp(this.configuration).createImage(createImageRequest, options).then(function (request) {
          return request(_this11.axios, _this11.basePath);
        });
      }
      /**
       *
       * @summary Creates an edited or extended image given an original image and a prompt.
       * @param {File} image The image to edit. Must be a valid PNG file, less than 4MB, and square. If mask is not provided, image must have transparency, which will be used as the mask.
       * @param {string} prompt A text description of the desired image(s). The maximum length is 1000 characters.
       * @param {File} [mask] An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where &#x60;image&#x60; should be edited. Must be a valid PNG file, less than 4MB, and have the same dimensions as &#x60;image&#x60;.
       * @param {number} [n] The number of images to generate. Must be between 1 and 10.
       * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
       * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
       * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
    }, {
      key: "createImageEdit",
      value: function createImageEdit(image, prompt, mask, n, size, responseFormat, user, options) {
        var _this12 = this;
        return exports.OpenAIApiFp(this.configuration).createImageEdit(image, prompt, mask, n, size, responseFormat, user, options).then(function (request) {
          return request(_this12.axios, _this12.basePath);
        });
      }
      /**
       *
       * @summary Creates a variation of a given image.
       * @param {File} image The image to use as the basis for the variation(s). Must be a valid PNG file, less than 4MB, and square.
       * @param {number} [n] The number of images to generate. Must be between 1 and 10.
       * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
       * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
       * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
    }, {
      key: "createImageVariation",
      value: function createImageVariation(image, n, size, responseFormat, user, options) {
        var _this13 = this;
        return exports.OpenAIApiFp(this.configuration).createImageVariation(image, n, size, responseFormat, user, options).then(function (request) {
          return request(_this13.axios, _this13.basePath);
        });
      }
      /**
       *
       * @summary Classifies if text violates OpenAI\'s Content Policy
       * @param {CreateModerationRequest} createModerationRequest
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
    }, {
      key: "createModeration",
      value: function createModeration(createModerationRequest, options) {
        var _this14 = this;
        return exports.OpenAIApiFp(this.configuration).createModeration(createModerationRequest, options).then(function (request) {
          return request(_this14.axios, _this14.basePath);
        });
      }
      /**
       *
       * @summary The search endpoint computes similarity scores between provided query and documents. Documents can be passed directly to the API if there are no more than 200 of them.  To go beyond the 200 document limit, documents can be processed offline and then used for efficient retrieval at query time. When `file` is set, the search endpoint searches over all the documents in the given file and returns up to the `max_rerank` number of documents. These documents will be returned along with their search scores.  The similarity score is a positive score that usually ranges from 0 to 300 (but can sometimes go higher), where a score above 200 usually means the document is semantically similar to the query.
       * @param {string} engineId The ID of the engine to use for this request.  You can select one of &#x60;ada&#x60;, &#x60;babbage&#x60;, &#x60;curie&#x60;, or &#x60;davinci&#x60;.
       * @param {CreateSearchRequest} createSearchRequest
       * @param {*} [options] Override http request option.
       * @deprecated
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
    }, {
      key: "createSearch",
      value: function createSearch(engineId, createSearchRequest, options) {
        var _this15 = this;
        return exports.OpenAIApiFp(this.configuration).createSearch(engineId, createSearchRequest, options).then(function (request) {
          return request(_this15.axios, _this15.basePath);
        });
      }
      /**
       *
       * @summary Transcribes audio into the input language.
       * @param {File} file The audio file to transcribe, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
       * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
       * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should match the audio language.
       * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
       * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
       * @param {string} [language] The language of the input audio. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format will improve accuracy and latency.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
    }, {
      key: "createTranscription",
      value: function createTranscription(file, model, prompt, responseFormat, temperature, language, options) {
        var _this16 = this;
        return exports.OpenAIApiFp(this.configuration).createTranscription(file, model, prompt, responseFormat, temperature, language, options).then(function (request) {
          return request(_this16.axios, _this16.basePath);
        });
      }
      /**
       *
       * @summary Translates audio into into English.
       * @param {File} file The audio file to translate, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
       * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
       * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should be in English.
       * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
       * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
    }, {
      key: "createTranslation",
      value: function createTranslation(file, model, prompt, responseFormat, temperature, options) {
        var _this17 = this;
        return exports.OpenAIApiFp(this.configuration).createTranslation(file, model, prompt, responseFormat, temperature, options).then(function (request) {
          return request(_this17.axios, _this17.basePath);
        });
      }
      /**
       *
       * @summary Delete a file.
       * @param {string} fileId The ID of the file to use for this request
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
    }, {
      key: "deleteFile",
      value: function deleteFile(fileId, options) {
        var _this18 = this;
        return exports.OpenAIApiFp(this.configuration).deleteFile(fileId, options).then(function (request) {
          return request(_this18.axios, _this18.basePath);
        });
      }
      /**
       *
       * @summary Delete a fine-tuned model. You must have the Owner role in your organization.
       * @param {string} model The model to delete
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
    }, {
      key: "deleteModel",
      value: function deleteModel(model, options) {
        var _this19 = this;
        return exports.OpenAIApiFp(this.configuration).deleteModel(model, options).then(function (request) {
          return request(_this19.axios, _this19.basePath);
        });
      }
      /**
       *
       * @summary Returns the contents of the specified file
       * @param {string} fileId The ID of the file to use for this request
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
    }, {
      key: "downloadFile",
      value: function downloadFile(fileId, options) {
        var _this20 = this;
        return exports.OpenAIApiFp(this.configuration).downloadFile(fileId, options).then(function (request) {
          return request(_this20.axios, _this20.basePath);
        });
      }
      /**
       *
       * @summary Lists the currently available (non-finetuned) models, and provides basic information about each one such as the owner and availability.
       * @param {*} [options] Override http request option.
       * @deprecated
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
    }, {
      key: "listEngines",
      value: function listEngines(options) {
        var _this21 = this;
        return exports.OpenAIApiFp(this.configuration).listEngines(options).then(function (request) {
          return request(_this21.axios, _this21.basePath);
        });
      }
      /**
       *
       * @summary Returns a list of files that belong to the user\'s organization.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
    }, {
      key: "listFiles",
      value: function listFiles(options) {
        var _this22 = this;
        return exports.OpenAIApiFp(this.configuration).listFiles(options).then(function (request) {
          return request(_this22.axios, _this22.basePath);
        });
      }
      /**
       *
       * @summary Get fine-grained status updates for a fine-tune job.
       * @param {string} fineTuneId The ID of the fine-tune job to get events for.
       * @param {boolean} [stream] Whether to stream events for the fine-tune job. If set to true, events will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available. The stream will terminate with a &#x60;data: [DONE]&#x60; message when the job is finished (succeeded, cancelled, or failed).  If set to false, only events generated so far will be returned.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
    }, {
      key: "listFineTuneEvents",
      value: function listFineTuneEvents(fineTuneId, stream, options) {
        var _this23 = this;
        return exports.OpenAIApiFp(this.configuration).listFineTuneEvents(fineTuneId, stream, options).then(function (request) {
          return request(_this23.axios, _this23.basePath);
        });
      }
      /**
       *
       * @summary List your organization\'s fine-tuning jobs
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
    }, {
      key: "listFineTunes",
      value: function listFineTunes(options) {
        var _this24 = this;
        return exports.OpenAIApiFp(this.configuration).listFineTunes(options).then(function (request) {
          return request(_this24.axios, _this24.basePath);
        });
      }
      /**
       *
       * @summary Lists the currently available models, and provides basic information about each one such as the owner and availability.
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
    }, {
      key: "listModels",
      value: function listModels(options) {
        var _this25 = this;
        return exports.OpenAIApiFp(this.configuration).listModels(options).then(function (request) {
          return request(_this25.axios, _this25.basePath);
        });
      }
      /**
       *
       * @summary Retrieves a model instance, providing basic information about it such as the owner and availability.
       * @param {string} engineId The ID of the engine to use for this request
       * @param {*} [options] Override http request option.
       * @deprecated
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
    }, {
      key: "retrieveEngine",
      value: function retrieveEngine(engineId, options) {
        var _this26 = this;
        return exports.OpenAIApiFp(this.configuration).retrieveEngine(engineId, options).then(function (request) {
          return request(_this26.axios, _this26.basePath);
        });
      }
      /**
       *
       * @summary Returns information about a specific file.
       * @param {string} fileId The ID of the file to use for this request
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
    }, {
      key: "retrieveFile",
      value: function retrieveFile(fileId, options) {
        var _this27 = this;
        return exports.OpenAIApiFp(this.configuration).retrieveFile(fileId, options).then(function (request) {
          return request(_this27.axios, _this27.basePath);
        });
      }
      /**
       *
       * @summary Gets info about the fine-tune job.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
       * @param {string} fineTuneId The ID of the fine-tune job
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
    }, {
      key: "retrieveFineTune",
      value: function retrieveFineTune(fineTuneId, options) {
        var _this28 = this;
        return exports.OpenAIApiFp(this.configuration).retrieveFineTune(fineTuneId, options).then(function (request) {
          return request(_this28.axios, _this28.basePath);
        });
      }
      /**
       *
       * @summary Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
       * @param {string} model The ID of the model to use for this request
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       * @memberof OpenAIApi
       */
    }, {
      key: "retrieveModel",
      value: function retrieveModel(model, options) {
        var _this29 = this;
        return exports.OpenAIApiFp(this.configuration).retrieveModel(model, options).then(function (request) {
          return request(_this29.axios, _this29.basePath);
        });
      }
    }]);
    return OpenAIApi;
  }(base_1.BaseAPI);
  exports.OpenAIApi = OpenAIApi;
})(api);

var configuration = {};

var name = "openai";
var version = "3.2.1";
var description = "Node.js library for the OpenAI API";
var repository = {
	type: "git",
	url: "git@github.com:openai/openai-node.git"
};
var keywords = [
	"openai",
	"open",
	"ai",
	"gpt-3",
	"gpt3"
];
var author = "OpenAI";
var license = "MIT";
var main = "./dist/index.js";
var types = "./dist/index.d.ts";
var scripts = {
	build: "tsc --outDir dist/"
};
var dependencies = {
	axios: "^0.26.0",
	"form-data": "^4.0.0"
};
var devDependencies = {
	"@types/node": "^12.11.5",
	typescript: "^3.6.4"
};
var require$$0 = {
	name: name,
	version: version,
	description: description,
	repository: repository,
	keywords: keywords,
	author: author,
	license: license,
	main: main,
	types: types,
	scripts: scripts,
	dependencies: dependencies,
	devDependencies: devDependencies
};

var browser = (typeof self === "undefined" ? "undefined" : _typeof$2(self)) == 'object' ? self.FormData : window.FormData;

/* tslint:disable */
/* eslint-disable */
/**
 * OpenAI API
 * APIs for sampling from and fine-tuning language models
 *
 * The version of the OpenAPI document: 1.2.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
Object.defineProperty(configuration, "__esModule", {
  value: true
});
configuration.Configuration = void 0;
var packageJson = require$$0;
var Configuration$1 = /*#__PURE__*/function () {
  function Configuration() {
    var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Configuration);
    this.apiKey = param.apiKey;
    this.organization = param.organization;
    this.username = param.username;
    this.password = param.password;
    this.accessToken = param.accessToken;
    this.basePath = param.basePath;
    this.baseOptions = param.baseOptions;
    this.formDataCtor = param.formDataCtor;
    if (!this.baseOptions) {
      this.baseOptions = {};
    }
    this.baseOptions.headers = Object.assign({
      'User-Agent': "OpenAI/NodeJS/".concat(packageJson.version),
      'Authorization': "Bearer ".concat(this.apiKey)
    }, this.baseOptions.headers);
    if (this.organization) {
      this.baseOptions.headers['OpenAI-Organization'] = this.organization;
    }
    if (!this.formDataCtor) {
      this.formDataCtor = browser;
    }
  }
  /**
   * Check if the given MIME is a JSON MIME.
   * JSON MIME examples:
   *   application/json
   *   application/json; charset=UTF8
   *   APPLICATION/JSON
   *   application/vnd.company+json
   * @param mime - MIME (Multipurpose Internet Mail Extensions)
   * @return True if the given MIME is JSON, false otherwise.
   */
  _createClass(Configuration, [{
    key: "isJsonMime",
    value: function isJsonMime(mime) {
      var jsonMime = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
      return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
    }
  }]);
  return Configuration;
}();
configuration.Configuration = Configuration$1;

(function (exports) {

  /* tslint:disable */
  /* eslint-disable */
  /**
   * OpenAI API
   * APIs for sampling from and fine-tuning language models
   *
   * The version of the OpenAPI document: 1.2.0
   *
   *
   * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
   * https://openapi-generator.tech
   * Do not edit the class manually.
   */
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    });
  } : function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function (m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
  };
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  __exportStar(api, exports);
  __exportStar(configuration, exports);
})(dist);

/**
 * Block argument types
 * @enum {string}
 */
var ArgumentType$1 = {
  /**
   * Numeric value with angle picker
   */
  ANGLE: 'angle',
  /**
   * Boolean value with hexagonal placeholder
   */
  BOOLEAN: 'Boolean',
  /**
   * Numeric value with color picker
   */
  COLOR: 'color',
  /**
   * Numeric value with text field
   */
  NUMBER: 'number',
  /**
   * String value with text field
   */
  STRING: 'string',
  /**
   * String value with matrix field
   */
  MATRIX: 'matrix',
  /**
   * MIDI note number with note picker (piano) field
   */
  NOTE: 'note',
  /**
   * Inline image on block (as part of the label)
   */
  IMAGE: 'image'
};
var argumentType = ArgumentType$1;

/**
 * Types of block
 * @enum {string}
 */
var BlockType$1 = {
  /**
   * Boolean reporter with hexagonal shape
   */
  BOOLEAN: 'Boolean',
  /**
   * A button (not an actual block) for some special action, like making a variable
   */
  BUTTON: 'button',
  /**
   * Command block
   */
  COMMAND: 'command',
  /**
   * Specialized command block which may or may not run a child branch
   * The thread continues with the next block whether or not a child branch ran.
   */
  CONDITIONAL: 'conditional',
  /**
   * Specialized hat block with no implementation function
   * This stack only runs if the corresponding event is emitted by other code.
   */
  EVENT: 'event',
  /**
   * Hat block which conditionally starts a block stack
   */
  HAT: 'hat',
  /**
   * Specialized command block which may or may not run a child branch
   * If a child branch runs, the thread evaluates the loop block again.
   */
  LOOP: 'loop',
  /**
   * General reporter with numeric or string value
   */
  REPORTER: 'reporter'
};
var blockType = BlockType$1;

var Color$1 = /*#__PURE__*/function () {
  function Color() {
    _classCallCheck(this, Color);
  }
  _createClass(Color, null, [{
    key: "RGB_BLACK",
    get:
    /**
     * @typedef {object} RGBObject - An object representing a color in RGB format.
     * @property {number} r - the red component, in the range [0, 255].
     * @property {number} g - the green component, in the range [0, 255].
     * @property {number} b - the blue component, in the range [0, 255].
     */

    /**
     * @typedef {object} HSVObject - An object representing a color in HSV format.
     * @property {number} h - hue, in the range [0-359).
     * @property {number} s - saturation, in the range [0,1].
     * @property {number} v - value, in the range [0,1].
     */

    /** @type {RGBObject} */
    function get() {
      return {
        r: 0,
        g: 0,
        b: 0
      };
    }

    /** @type {RGBObject} */
  }, {
    key: "RGB_WHITE",
    get: function get() {
      return {
        r: 255,
        g: 255,
        b: 255
      };
    }

    /**
     * Convert a Scratch decimal color to a hex string, #RRGGBB.
     * @param {number} decimal RGB color as a decimal.
     * @return {string} RGB color as #RRGGBB hex string.
     */
  }, {
    key: "decimalToHex",
    value: function decimalToHex(decimal) {
      if (decimal < 0) {
        decimal += 0xFFFFFF + 1;
      }
      var hex = Number(decimal).toString(16);
      hex = "#".concat('000000'.substr(0, 6 - hex.length)).concat(hex);
      return hex;
    }

    /**
     * Convert a Scratch decimal color to an RGB color object.
     * @param {number} decimal RGB color as decimal.
     * @return {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
     */
  }, {
    key: "decimalToRgb",
    value: function decimalToRgb(decimal) {
      var a = decimal >> 24 & 0xFF;
      var r = decimal >> 16 & 0xFF;
      var g = decimal >> 8 & 0xFF;
      var b = decimal & 0xFF;
      return {
        r: r,
        g: g,
        b: b,
        a: a > 0 ? a : 255
      };
    }

    /**
     * Convert a hex color (e.g., F00, #03F, #0033FF) to an RGB color object.
     * CC-BY-SA Tim Down:
     * https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
     * @param {!string} hex Hex representation of the color.
     * @return {RGBObject} null on failure, or rgb: {r: red [0,255], g: green [0,255], b: blue [0,255]}.
     */
  }, {
    key: "hexToRgb",
    value: function hexToRgb(hex) {
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
      });
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }

    /**
     * Convert an RGB color object to a hex color.
     * @param {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
     * @return {!string} Hex representation of the color.
     */
  }, {
    key: "rgbToHex",
    value: function rgbToHex(rgb) {
      return Color.decimalToHex(Color.rgbToDecimal(rgb));
    }

    /**
     * Convert an RGB color object to a Scratch decimal color.
     * @param {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
     * @return {!number} Number representing the color.
     */
  }, {
    key: "rgbToDecimal",
    value: function rgbToDecimal(rgb) {
      return (rgb.r << 16) + (rgb.g << 8) + rgb.b;
    }

    /**
    * Convert a hex color (e.g., F00, #03F, #0033FF) to a decimal color number.
    * @param {!string} hex Hex representation of the color.
    * @return {!number} Number representing the color.
    */
  }, {
    key: "hexToDecimal",
    value: function hexToDecimal(hex) {
      return Color.rgbToDecimal(Color.hexToRgb(hex));
    }

    /**
     * Convert an HSV color to RGB format.
     * @param {HSVObject} hsv - {h: hue [0,360), s: saturation [0,1], v: value [0,1]}
     * @return {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
     */
  }, {
    key: "hsvToRgb",
    value: function hsvToRgb(hsv) {
      var h = hsv.h % 360;
      if (h < 0) h += 360;
      var s = Math.max(0, Math.min(hsv.s, 1));
      var v = Math.max(0, Math.min(hsv.v, 1));
      var i = Math.floor(h / 60);
      var f = h / 60 - i;
      var p = v * (1 - s);
      var q = v * (1 - s * f);
      var t = v * (1 - s * (1 - f));
      var r;
      var g;
      var b;
      switch (i) {
        default:
        case 0:
          r = v;
          g = t;
          b = p;
          break;
        case 1:
          r = q;
          g = v;
          b = p;
          break;
        case 2:
          r = p;
          g = v;
          b = t;
          break;
        case 3:
          r = p;
          g = q;
          b = v;
          break;
        case 4:
          r = t;
          g = p;
          b = v;
          break;
        case 5:
          r = v;
          g = p;
          b = q;
          break;
      }
      return {
        r: Math.floor(r * 255),
        g: Math.floor(g * 255),
        b: Math.floor(b * 255)
      };
    }

    /**
     * Convert an RGB color to HSV format.
     * @param {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
     * @return {HSVObject} hsv - {h: hue [0,360), s: saturation [0,1], v: value [0,1]}
     */
  }, {
    key: "rgbToHsv",
    value: function rgbToHsv(rgb) {
      var r = rgb.r / 255;
      var g = rgb.g / 255;
      var b = rgb.b / 255;
      var x = Math.min(Math.min(r, g), b);
      var v = Math.max(Math.max(r, g), b);

      // For grays, hue will be arbitrarily reported as zero. Otherwise, calculate
      var h = 0;
      var s = 0;
      if (x !== v) {
        var f = r === x ? g - b : g === x ? b - r : r - g;
        var i = r === x ? 3 : g === x ? 5 : 1;
        h = (i - f / (v - x)) * 60 % 360;
        s = (v - x) / v;
      }
      return {
        h: h,
        s: s,
        v: v
      };
    }

    /**
     * Linear interpolation between rgb0 and rgb1.
     * @param {RGBObject} rgb0 - the color corresponding to fraction1 <= 0.
     * @param {RGBObject} rgb1 - the color corresponding to fraction1 >= 1.
     * @param {number} fraction1 - the interpolation parameter. If this is 0.5, for example, mix the two colors equally.
     * @return {RGBObject} the interpolated color.
     */
  }, {
    key: "mixRgb",
    value: function mixRgb(rgb0, rgb1, fraction1) {
      if (fraction1 <= 0) return rgb0;
      if (fraction1 >= 1) return rgb1;
      var fraction0 = 1 - fraction1;
      return {
        r: fraction0 * rgb0.r + fraction1 * rgb1.r,
        g: fraction0 * rgb0.g + fraction1 * rgb1.g,
        b: fraction0 * rgb0.b + fraction1 * rgb1.b
      };
    }
  }]);
  return Color;
}();
var color = Color$1;

var Color = color;

/**
 * @fileoverview
 * Utilities for casting and comparing Scratch data-types.
 * Scratch behaves slightly differently from JavaScript in many respects,
 * and these differences should be encapsulated below.
 * For example, in Scratch, add(1, join("hello", world")) -> 1.
 * This is because "hello world" is cast to 0.
 * In JavaScript, 1 + Number("hello" + "world") would give you NaN.
 * Use when coercing a value before computation.
 */
var Cast$1 = /*#__PURE__*/function () {
  function Cast() {
    _classCallCheck(this, Cast);
  }
  _createClass(Cast, null, [{
    key: "toNumber",
    value:
    /**
     * Scratch cast to number.
     * Treats NaN as 0.
     * In Scratch 2.0, this is captured by `interp.numArg.`
     * @param {*} value Value to cast to number.
     * @return {number} The Scratch-casted number value.
     */
    function toNumber(value) {
      // If value is already a number we don't need to coerce it with
      // Number().
      if (typeof value === 'number') {
        // Scratch treats NaN as 0, when needed as a number.
        // E.g., 0 + NaN -> 0.
        if (Number.isNaN(value)) {
          return 0;
        }
        return value;
      }
      var n = Number(value);
      if (Number.isNaN(n)) {
        // Scratch treats NaN as 0, when needed as a number.
        // E.g., 0 + NaN -> 0.
        return 0;
      }
      return n;
    }

    /**
     * Scratch cast to boolean.
     * In Scratch 2.0, this is captured by `interp.boolArg.`
     * Treats some string values differently from JavaScript.
     * @param {*} value Value to cast to boolean.
     * @return {boolean} The Scratch-casted boolean value.
     */
  }, {
    key: "toBoolean",
    value: function toBoolean(value) {
      // Already a boolean?
      if (typeof value === 'boolean') {
        return value;
      }
      if (typeof value === 'string') {
        // These specific strings are treated as false in Scratch.
        if (value === '' || value === '0' || value.toLowerCase() === 'false') {
          return false;
        }
        // All other strings treated as true.
        return true;
      }
      // Coerce other values and numbers.
      return Boolean(value);
    }

    /**
     * Scratch cast to string.
     * @param {*} value Value to cast to string.
     * @return {string} The Scratch-casted string value.
     */
  }, {
    key: "toString",
    value: function toString(value) {
      return String(value);
    }

    /**
     * Cast any Scratch argument to an RGB color array to be used for the renderer.
     * @param {*} value Value to convert to RGB color array.
     * @return {Array.<number>} [r,g,b], values between 0-255.
     */
  }, {
    key: "toRgbColorList",
    value: function toRgbColorList(value) {
      var color = Cast.toRgbColorObject(value);
      return [color.r, color.g, color.b];
    }

    /**
     * Cast any Scratch argument to an RGB color object to be used for the renderer.
     * @param {*} value Value to convert to RGB color object.
     * @return {RGBOject} [r,g,b], values between 0-255.
     */
  }, {
    key: "toRgbColorObject",
    value: function toRgbColorObject(value) {
      var color;
      if (typeof value === 'string' && value.substring(0, 1) === '#') {
        color = Color.hexToRgb(value);

        // If the color wasn't *actually* a hex color, cast to black
        if (!color) color = {
          r: 0,
          g: 0,
          b: 0,
          a: 255
        };
      } else {
        color = Color.decimalToRgb(Cast.toNumber(value));
      }
      return color;
    }

    /**
     * Determine if a Scratch argument is a white space string (or null / empty).
     * @param {*} val value to check.
     * @return {boolean} True if the argument is all white spaces or null / empty.
     */
  }, {
    key: "isWhiteSpace",
    value: function isWhiteSpace(val) {
      return val === null || typeof val === 'string' && val.trim().length === 0;
    }

    /**
     * Compare two values, using Scratch cast, case-insensitive string compare, etc.
     * In Scratch 2.0, this is captured by `interp.compare.`
     * @param {*} v1 First value to compare.
     * @param {*} v2 Second value to compare.
     * @returns {number} Negative number if v1 < v2; 0 if equal; positive otherwise.
     */
  }, {
    key: "compare",
    value: function compare(v1, v2) {
      var n1 = Number(v1);
      var n2 = Number(v2);
      if (n1 === 0 && Cast.isWhiteSpace(v1)) {
        n1 = NaN;
      } else if (n2 === 0 && Cast.isWhiteSpace(v2)) {
        n2 = NaN;
      }
      if (isNaN(n1) || isNaN(n2)) {
        // At least one argument can't be converted to a number.
        // Scratch compares strings as case insensitive.
        var s1 = String(v1).toLowerCase();
        var s2 = String(v2).toLowerCase();
        if (s1 < s2) {
          return -1;
        } else if (s1 > s2) {
          return 1;
        }
        return 0;
      }
      // Handle the special case of Infinity
      if (n1 === Infinity && n2 === Infinity || n1 === -Infinity && n2 === -Infinity) {
        return 0;
      }
      // Compare as numbers.
      return n1 - n2;
    }

    /**
     * Determine if a Scratch argument number represents a round integer.
     * @param {*} val Value to check.
     * @return {boolean} True if number looks like an integer.
     */
  }, {
    key: "isInt",
    value: function isInt(val) {
      // Values that are already numbers.
      if (typeof val === 'number') {
        if (isNaN(val)) {
          // NaN is considered an integer.
          return true;
        }
        // True if it's "round" (e.g., 2.0 and 2).
        return val === parseInt(val, 10);
      } else if (typeof val === 'boolean') {
        // `True` and `false` always represent integer after Scratch cast.
        return true;
      } else if (typeof val === 'string') {
        // If it contains a decimal point, don't consider it an int.
        return val.indexOf('.') < 0;
      }
      return false;
    }
  }, {
    key: "LIST_INVALID",
    get: function get() {
      return 'INVALID';
    }
  }, {
    key: "LIST_ALL",
    get: function get() {
      return 'ALL';
    }

    /**
     * Compute a 1-based index into a list, based on a Scratch argument.
     * Two special cases may be returned:
     * LIST_ALL: if the block is referring to all of the items in the list.
     * LIST_INVALID: if the index was invalid in any way.
     * @param {*} index Scratch arg, including 1-based numbers or special cases.
     * @param {number} length Length of the list.
     * @param {boolean} acceptAll Whether it should accept "all" or not.
     * @return {(number|string)} 1-based index for list, LIST_ALL, or LIST_INVALID.
     */
  }, {
    key: "toListIndex",
    value: function toListIndex(index, length, acceptAll) {
      if (typeof index !== 'number') {
        if (index === 'all') {
          return acceptAll ? Cast.LIST_ALL : Cast.LIST_INVALID;
        }
        if (index === 'last') {
          if (length > 0) {
            return length;
          }
          return Cast.LIST_INVALID;
        } else if (index === 'random' || index === 'any') {
          if (length > 0) {
            return 1 + Math.floor(Math.random() * length);
          }
          return Cast.LIST_INVALID;
        }
      }
      index = Math.floor(Cast.toNumber(index));
      if (index < 1 || index > length) {
        return Cast.LIST_INVALID;
      }
      return index;
    }
  }]);
  return Cast;
}();
var cast = Cast$1;

/**
 * Fetch a remote resource like `fetch` does, but with a time limit.
 * @param {Request|string} resource Remote resource to fetch.
 * @param {?object} init An options object containing any custom settings that you want to apply to the request.
 * @param {number} timeout The amount of time before the request is canceled, in milliseconds
 * @returns {Promise<Response>} The response from the server.
 */
var fetchWithTimeout$1 = function fetchWithTimeout(resource, init, timeout) {
  var timeoutID = null;
  // Not supported in Safari <11
  var controller = window.AbortController ? new window.AbortController() : null;
  var signal = controller ? controller.signal : null;
  // The fetch call races a timer.
  return Promise.race([fetch(resource, Object.assign({
    signal: signal
  }, init)).then(function (response) {
    clearTimeout(timeoutID);
    return response;
  }), new Promise(function (resolve, reject) {
    timeoutID = setTimeout(function () {
      if (controller) controller.abort();
      reject(new Error("Fetch timed out after ".concat(timeout, " ms")));
    }, timeout);
  })]);
};
var fetchWithTimeout_1 = fetchWithTimeout$1;

var Configuration = dist.Configuration,
  OpenAIApi = dist.OpenAIApi;
var ArgumentType = argumentType;
var BlockType = blockType;
var Cast = cast;
var fetchWithTimeout = fetchWithTimeout_1;
// const log = require('../../util/log');

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
var blockIconURI = 'data:image/png;base64,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';

/**
 * Class for the new blocks in Scratch 3.0
 * @param {Runtime} runtime - the runtime instantiating this block package.
 * @constructor
 */
var Scratch3Gpt3Blocks = /*#__PURE__*/function () {
  function Scratch3Gpt3Blocks(runtime) {
    _classCallCheck(this, Scratch3Gpt3Blocks);
    _defineProperty(this, "apiKey", '');
    /**
     * The runtime instantiating this block package.
     * @type {Runtime}
     */
    this.runtime = runtime;

    // this._onTargetCreated = this._onTargetCreated.bind(this);
    // this.runtime.on('targetWasCreated', this._onTargetCreated);
  }

  /**
  * @returns {object} metadata for this extension and its blocks.
  */
  _createClass(Scratch3Gpt3Blocks, [{
    key: "getInfo",
    value: function getInfo() {
      return {
        id: 'gpt32scratch',
        name: 'GPT32Scratch',
        blockIconURI: blockIconURI,
        blocks: [{
          opcode: 'ask',
          blockType: BlockType.REPORTER,
          text: '[TEXT]の回答',
          arguments: {
            TEXT: {
              type: ArgumentType.STRING,
              defaultValue: 'Scratchの上達方法は？'
            }
          }
        }, {
          opcode: 'setApiKey',
          blockType: BlockType.COMMAND,
          text: 'APIキーをセット'
        }],
        menus: {}
      };
    }
  }, {
    key: "ask",
    value: function ask(args) {
      var _this = this;
      if (this.apiKey === 'APIキー' || this.apiKey === '') {
        return 'openai.com のサイトからAPIキーを取得してセットください';
      }
      var question = Cast.toString(args.TEXT);
      var configuration = new Configuration({
        apiKey: this.apiKey
      });
      new OpenAIApi(configuration);
      var params = {
        method: 'POST',
        headers: {
          'Authorization': "Bearer ".concat(this.apiKey),
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{
            "role": "system",
            "content": "You are a helpful assistant in the Scratch programming language."
          }, {
            "role": "user",
            "content": question
          }],
          max_tokens: 300
        })
      };
      var completionPromise = fetchWithTimeout('https:api.openai.com/v1/chat/completions', params, 10000).then(function (response) {
        return response.json();
      }).then(function (json) {
        _this._lastAnswer = json.choices[0].message.content.replaceAll("\n", '');
        _this._lastQuestion = question;
        return _this._lastAnswer;
      }).catch(function (error) {
        log.warn(error);
        return "".concat(_this.i18n.answerFuncFailedToGetAnswer, " | ").concat(error);
      });
      return completionPromise;
    }
  }, {
    key: "setApiKey",
    value: function setApiKey() {
      this.apiKey = window.prompt('OpenAI のAPIキーを入力してください');
    }
  }]);
  return Scratch3Gpt3Blocks;
}();
var blockClass = Scratch3Gpt3Blocks;

export { blockClass, entry };

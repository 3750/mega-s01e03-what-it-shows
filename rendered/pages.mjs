var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// node_modules/svelte/src/constants.js
var EACH_INDEX_REACTIVE = 1 << 1;
var EACH_IS_CONTROLLED = 1 << 2;
var EACH_IS_ANIMATED = 1 << 3;
var EACH_ITEM_IMMUTABLE = 1 << 4;
var PROPS_IS_RUNES = 1 << 1;
var PROPS_IS_UPDATED = 1 << 2;
var PROPS_IS_BINDABLE = 1 << 3;
var PROPS_IS_LAZY_INITIAL = 1 << 4;
var TRANSITION_OUT = 1 << 1;
var TRANSITION_GLOBAL = 1 << 2;
var TEMPLATE_USE_IMPORT_NODE = 1 << 1;
var TEMPLATE_USE_SVG = 1 << 2;
var TEMPLATE_USE_MATHML = 1 << 3;
var HYDRATION_START = "[";
var HYDRATION_START_ELSE = "[!";
var HYDRATION_START_FAILED = "[?";
var HYDRATION_END = "]";
var ELEMENT_IS_NAMESPACED = 1;
var ELEMENT_PRESERVE_ATTRIBUTE_CASE = 1 << 1;
var ELEMENT_IS_INPUT = 1 << 2;
var UNINITIALIZED = /* @__PURE__ */ Symbol("uninitialized");

// node_modules/svelte/src/escaping.js
var ATTR_REGEX = /[&"<]/g;
var CONTENT_REGEX = /[&<]/g;
function escape_html(value, is_attr) {
  const str = String(value ?? "");
  const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern.test(str)) {
    const i = pattern.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}

// node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}

// node_modules/svelte/src/internal/shared/utils.js
var is_array = Array.isArray;
var index_of = Array.prototype.indexOf;
var includes = Array.prototype.includes;
var object_prototype = Object.prototype;
var array_prototype = Array.prototype;
var has_own_property = Object.prototype.hasOwnProperty;
var noop = () => {
};
function deferred() {
  var resolve;
  var reject;
  var promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

// node_modules/svelte/src/internal/shared/attributes.js
var replacements = {
  translate: /* @__PURE__ */ new Map([
    [true, "yes"],
    [false, "no"]
  ])
};
function attr(name, value, is_boolean = false) {
  if (name === "hidden" && value !== "until-found") {
    is_boolean = true;
  }
  if (value == null || is_boolean && !value && value !== "") return "";
  const normalized = has_own_property.call(replacements, name) && replacements[name].get(value) || value;
  const assignment = is_boolean ? `=""` : `="${escape_html(normalized, true)}"`;
  return ` ${name}${assignment}`;
}
function clsx2(value) {
  if (typeof value === "object") {
    return clsx(value);
  } else {
    return value ?? "";
  }
}
var whitespace = [..." 	\n\r\f\xA0\v\uFEFF"];
function to_class(value, hash2, directives) {
  var classname = value == null ? "" : "" + value;
  if (hash2) {
    classname = classname ? classname + " " + hash2 : hash2;
  }
  if (directives) {
    for (var key of Object.keys(directives)) {
      if (directives[key]) {
        classname = classname ? classname + " " + key : key;
      } else if (classname.length) {
        var len = key.length;
        var a = 0;
        while ((a = classname.indexOf(key, a)) >= 0) {
          var b = a + len;
          if ((a === 0 || whitespace.includes(classname[a - 1])) && (b === classname.length || whitespace.includes(classname[b]))) {
            classname = (a === 0 ? "" : classname.substring(0, a)) + classname.substring(b + 1);
          } else {
            a = b;
          }
        }
      }
    }
  }
  return classname === "" ? null : classname;
}
function append_styles(styles, important = false) {
  var separator = important ? " !important;" : ";";
  var css = "";
  for (var key of Object.keys(styles)) {
    var value = styles[key];
    if (value != null && value !== "") {
      css += " " + key + ": " + value + separator;
    }
  }
  return css;
}
function to_css_name(name) {
  if (name[0] !== "-" || name[1] !== "-") {
    return name.toLowerCase();
  }
  return name;
}
function to_style(value, styles) {
  if (styles) {
    var new_style = "";
    var normal_styles;
    var important_styles;
    if (Array.isArray(styles)) {
      normal_styles = styles[0];
      important_styles = styles[1];
    } else {
      normal_styles = styles;
    }
    if (value) {
      value = String(value).replaceAll(/\/\*.*?\*\//g, "").trim();
      var in_str = false;
      var in_apo = 0;
      var in_comment = false;
      var reserved_names = [];
      if (normal_styles) {
        reserved_names.push(...Object.keys(normal_styles).map(to_css_name));
      }
      if (important_styles) {
        reserved_names.push(...Object.keys(important_styles).map(to_css_name));
      }
      var start_index = 0;
      var name_index = -1;
      const len = value.length;
      for (var i = 0; i < len; i++) {
        var c = value[i];
        if (in_comment) {
          if (c === "/" && value[i - 1] === "*") {
            in_comment = false;
          }
        } else if (in_str) {
          if (in_str === c) {
            in_str = false;
          }
        } else if (c === "/" && value[i + 1] === "*") {
          in_comment = true;
        } else if (c === '"' || c === "'") {
          in_str = c;
        } else if (c === "(") {
          in_apo++;
        } else if (c === ")") {
          in_apo--;
        }
        if (!in_comment && in_str === false && in_apo === 0) {
          if (c === ":" && name_index === -1) {
            name_index = i;
          } else if (c === ";" || i === len - 1) {
            if (name_index !== -1) {
              var name = to_css_name(value.substring(start_index, name_index).trim());
              if (!reserved_names.includes(name)) {
                if (c !== ";") {
                  i++;
                }
                var property = value.substring(start_index, i).trim();
                new_style += " " + property + ";";
              }
            }
            start_index = i + 1;
            name_index = -1;
          }
        }
      }
    }
    if (normal_styles) {
      new_style += append_styles(normal_styles);
    }
    if (important_styles) {
      new_style += append_styles(important_styles, true);
    }
    new_style = new_style.trim();
    return new_style === "" ? null : new_style;
  }
  return value == null ? null : String(value);
}

// node_modules/esm-env/browser-fallback.js
var browser_fallback_default = typeof window !== "undefined";

// node_modules/esm-env/dev-fallback.js
var node_env = globalThis.process?.env?.NODE_ENV;
var dev_fallback_default = node_env && !node_env.toLowerCase().startsWith("prod");

// node_modules/svelte/src/internal/client/constants.js
var DERIVED = 1 << 1;
var EFFECT = 1 << 2;
var RENDER_EFFECT = 1 << 3;
var MANAGED_EFFECT = 1 << 24;
var BLOCK_EFFECT = 1 << 4;
var BRANCH_EFFECT = 1 << 5;
var ROOT_EFFECT = 1 << 6;
var BOUNDARY_EFFECT = 1 << 7;
var PAUSED = 1 << 8;
var CONNECTED = 1 << 9;
var CLEAN = 1 << 10;
var DIRTY = 1 << 11;
var MAYBE_DIRTY = 1 << 12;
var INERT = 1 << 13;
var DESTROYED = 1 << 14;
var REACTION_RAN = 1 << 15;
var DESTROYING = 1 << 25;
var EFFECT_TRANSPARENT = 1 << 16;
var EAGER_EFFECT = 1 << 17;
var HEAD_EFFECT = 1 << 18;
var EFFECT_PRESERVED = 1 << 19;
var USER_EFFECT = 1 << 20;
var EFFECT_OFFSCREEN = 1 << 25;
var REACTION_IS_UPDATING = 1 << 21;
var ASYNC = 1 << 22;
var ERROR_VALUE = 1 << 23;
var STALE_REACTION = new class StaleReactionError extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
var IS_XHTML = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
);

// node_modules/svelte/src/internal/flags/index.js
var async_mode_flag = false;

// node_modules/svelte/src/internal/client/reactivity/status.js
var STATUS_MASK = ~(DIRTY | MAYBE_DIRTY | CLEAN);

// node_modules/svelte/src/internal/server/hydration.js
var BLOCK_OPEN = `<!--${HYDRATION_START}-->`;
var BLOCK_OPEN_ELSE = `<!--${HYDRATION_START_ELSE}-->`;
var BLOCK_CLOSE = `<!--${HYDRATION_END}-->`;
var EMPTY_COMMENT = `<!---->`;

// node_modules/svelte/src/utils.js
var DOM_BOOLEAN_ATTRIBUTES = [
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "disabled",
  "formnovalidate",
  "indeterminate",
  "inert",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "seamless",
  "selected",
  "webkitdirectory",
  "defer",
  "disablepictureinpicture",
  "disableremoteplayback"
];
function is_boolean_attribute(name) {
  return DOM_BOOLEAN_ATTRIBUTES.includes(name);
}
var DOM_PROPERTIES = [
  ...DOM_BOOLEAN_ATTRIBUTES,
  "formNoValidate",
  "isMap",
  "noModule",
  "playsInline",
  "readOnly",
  "value",
  "volume",
  "defaultValue",
  "defaultChecked",
  "srcObject",
  "noValidate",
  "allowFullscreen",
  "disablePictureInPicture",
  "disableRemotePlayback"
];
var STATE_CREATION_RUNES = (
  /** @type {const} */
  [
    "$state",
    "$state.raw",
    "$derived",
    "$derived.by"
  ]
);
var RUNES = (
  /** @type {const} */
  [
    ...STATE_CREATION_RUNES,
    "$state.eager",
    "$state.snapshot",
    "$props",
    "$props.id",
    "$bindable",
    "$effect",
    "$effect.pre",
    "$effect.tracking",
    "$effect.root",
    "$effect.pending",
    "$inspect",
    "$inspect().with",
    "$inspect.trace",
    "$host"
  ]
);

// node_modules/svelte/src/internal/server/errors.js
function async_local_storage_unavailable() {
  const error = new Error(`async_local_storage_unavailable
The node API \`AsyncLocalStorage\` is not available, but is required to use async server rendering.
https://svelte.dev/e/async_local_storage_unavailable`);
  error.name = "Svelte error";
  throw error;
}
function await_invalid() {
  const error = new Error(`await_invalid
Encountered asynchronous work while rendering synchronously.
https://svelte.dev/e/await_invalid`);
  error.name = "Svelte error";
  throw error;
}
function html_deprecated() {
  const error = new Error(`html_deprecated
The \`html\` property of server render results has been deprecated. Use \`body\` instead.
https://svelte.dev/e/html_deprecated`);
  error.name = "Svelte error";
  throw error;
}
function invalid_csp() {
  const error = new Error(`invalid_csp
\`csp.nonce\` was set while \`csp.hash\` was \`true\`. These options cannot be used simultaneously.
https://svelte.dev/e/invalid_csp`);
  error.name = "Svelte error";
  throw error;
}
function invalid_id_prefix() {
  const error = new Error(`invalid_id_prefix
The \`idPrefix\` option cannot include \`--\`.
https://svelte.dev/e/invalid_id_prefix`);
  error.name = "Svelte error";
  throw error;
}
function server_context_required() {
  const error = new Error(`server_context_required
Could not resolve \`render\` context.
https://svelte.dev/e/server_context_required`);
  error.name = "Svelte error";
  throw error;
}

// node_modules/svelte/src/internal/server/context.js
var ssr_context = null;
function set_ssr_context(v) {
  ssr_context = v;
}
function push(fn) {
  ssr_context = { p: ssr_context, c: null, r: null, i: false };
  if (dev_fallback_default) {
    ssr_context.function = fn;
    ssr_context.element = ssr_context.p?.element;
  }
}
function pop() {
  ssr_context = /** @type {SSRContext} */
  ssr_context.p;
}

// node_modules/svelte/src/internal/server/warnings.js
var bold = "font-weight: bold";
var normal = "font-weight: normal";
function unresolved_hydratable(key, stack) {
  if (dev_fallback_default) {
    console.warn(
      `%c[svelte] unresolved_hydratable
%cA \`hydratable\` value with key \`${key}\` was created, but at least part of it was not used during the render.

The \`hydratable\` was initialized in:
${stack}
https://svelte.dev/e/unresolved_hydratable`,
      bold,
      normal
    );
  } else {
    console.warn(`https://svelte.dev/e/unresolved_hydratable`);
  }
}

// node_modules/svelte/src/internal/server/render-context.js
var current_render = null;
var context = null;
function get_render_context() {
  const store = context ?? als?.getStore();
  if (!store) {
    server_context_required();
  }
  return store;
}
async function with_render_context(fn) {
  context = {
    hydratable: {
      lookup: /* @__PURE__ */ new Map(),
      comparisons: [],
      unresolved_promises: /* @__PURE__ */ new Map()
    }
  };
  if (in_webcontainer()) {
    const { promise, resolve } = deferred();
    const previous_render = current_render;
    current_render = promise;
    await previous_render;
    return fn().finally(resolve);
  }
  try {
    if (als === null) {
      async_local_storage_unavailable();
    }
    return als.run(context, fn);
  } finally {
    context = null;
  }
}
var als = null;
var als_import = null;
function init_render_context() {
  als_import ??= import("node:async_hooks").then((hooks) => {
    als = new hooks.AsyncLocalStorage();
  }).then(noop, noop);
  return als_import;
}
function in_webcontainer() {
  return !!globalThis.process?.versions?.webcontainer;
}

// node_modules/svelte/src/internal/server/crypto.js
var text_encoder;
var crypto;
var obfuscated_import = (module_name) => import(
  /* @vite-ignore */
  module_name
);
async function sha256(data) {
  text_encoder ??= new TextEncoder();
  crypto ??= globalThis.crypto?.subtle?.digest ? globalThis.crypto : (
    // @ts-ignore - we don't install node types in the prod build
    // don't use import('node:crypto') directly because static analysers will think we rely on node when we don't
    (await obfuscated_import("node:crypto")).webcrypto
  );
  const hash_buffer = await crypto.subtle.digest("SHA-256", text_encoder.encode(data));
  return base64_encode(hash_buffer);
}
function base64_encode(bytes) {
  if (!browser_fallback_default && globalThis.Buffer) {
    return globalThis.Buffer.from(bytes).toString("base64");
  }
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// node_modules/devalue/src/constants.js
var MAX_ARRAY_LEN = 2 ** 32 - 1;
var MAX_ARRAY_INDEX = MAX_ARRAY_LEN - 1;

// node_modules/devalue/src/utils.js
var escaped = {
  "<": "\\u003C",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var DevalueError = class extends Error {
  /**
   * @param {string} message
   * @param {string[]} keys
   * @param {any} [value] - The value that failed to be serialized
   * @param {any} [root] - The root value being serialized
   */
  constructor(message, keys, value, root) {
    super(message);
    this.name = "DevalueError";
    this.path = keys.join("");
    this.value = value;
    this.root = root;
  }
};
function is_primitive(thing) {
  return thing === null || typeof thing !== "object" && typeof thing !== "function";
}
var object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getPrototypeOf(proto) === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function is_buffer(thing) {
  return typeof Buffer !== "undefined" && Buffer.isBuffer(thing);
}
function get_escaped_char(char) {
  switch (char) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(str) {
  let result = "";
  let last_pos = 0;
  const len = str.length;
  for (let i = 0; i < len; i += 1) {
    const char = str[i];
    const replacement = get_escaped_char(char);
    if (replacement) {
      result += str.slice(last_pos, i) + replacement;
      last_pos = i + 1;
    }
  }
  return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}
function enumerable_symbols(object) {
  return Object.getOwnPropertySymbols(object).filter(
    (symbol) => Object.getOwnPropertyDescriptor(object, symbol).enumerable
  );
}
var is_identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
function stringify_key(key) {
  return is_identifier.test(key) ? "." + key : "[" + JSON.stringify(key) + "]";
}
function is_valid_array_index(n) {
  if (!Number.isInteger(n)) return false;
  if (n < 0) return false;
  if (n > MAX_ARRAY_INDEX) return false;
  return true;
}
function is_valid_array_index_string(s) {
  if (s.length === 0) return false;
  if (s.length > 1 && s.charCodeAt(0) === 48) return false;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    if (c < 48 || c > 57) return false;
  }
  return is_valid_array_index(+s);
}
function array_index_cut(keys) {
  for (var i = keys.length - 1; i >= 0; i--) {
    if (is_valid_array_index_string(keys[i])) {
      break;
    }
  }
  return i + 1;
}
function valid_array_indices(array) {
  const keys = Object.keys(array);
  keys.length = array_index_cut(keys);
  return keys;
}

// node_modules/devalue/src/uneval.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var MIN_STRING_LENGTH = 128;
var unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom = /* @__PURE__ */ new Map();
  let primitives;
  function stringify_cached_primitive(thing) {
    if (typeof thing === "string" && thing.length >= MIN_STRING_LENGTH || typeof thing === "bigint") {
      primitives ??= /* @__PURE__ */ new Map();
      let literal = primitives.get(thing);
      if (literal === void 0) {
        literal = stringify_primitive(thing);
        primitives.set(thing, literal);
      }
      return literal;
    }
    return stringify_primitive(thing);
  }
  function walk(thing) {
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing, (value2) => uneval(value2, replacer));
        if (typeof str2 === "string") {
          custom.set(thing, str2);
          return;
        }
      }
      if (typeof thing === "function") {
        throw new DevalueError(`Cannot stringify a function`, keys, thing, value);
      }
      const type = get_type(thing);
      switch (type) {
        case "BigInt":
        case "String":
          walk(thing.valueOf());
          return;
        case "Number":
        case "Boolean":
        case "Date":
        case "RegExp":
        case "URL":
        case "URLSearchParams":
          return;
        case "Array":
          for (const i of valid_array_indices(thing)) {
            keys.push(`[${i}]`);
            walk(thing[i]);
            keys.pop();
          }
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key, value2] of thing) {
            keys.push(`.get(${is_primitive(key) ? stringify_cached_primitive(key) : "..."})`);
            walk(key);
            walk(value2);
            keys.pop();
          }
          break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Float16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array":
        case "DataView":
          if (!is_buffer(thing)) walk(thing.buffer);
          return;
        case "ArrayBuffer":
          return;
        case "Temporal.Duration":
        case "Temporal.Instant":
        case "Temporal.PlainDate":
        case "Temporal.PlainTime":
        case "Temporal.PlainDateTime":
        case "Temporal.PlainMonthDay":
        case "Temporal.PlainYearMonth":
        case "Temporal.ZonedDateTime":
          return;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(`Cannot stringify arbitrary non-POJOs`, keys, thing, value);
          }
          if (enumerable_symbols(thing).length > 0) {
            throw new DevalueError(`Cannot stringify POJOs with symbolic keys`, keys, thing, value);
          }
          for (const key of Object.keys(thing)) {
            if (key === "__proto__") {
              throw new DevalueError(
                `Cannot stringify objects with __proto__ keys`,
                keys,
                thing,
                value
              );
            }
            keys.push(stringify_key(key));
            walk(thing[key]);
            keys.pop();
          }
      }
    } else if (typeof thing === "symbol") {
      throw new DevalueError(`Cannot stringify a Symbol primitive`, keys, thing, value);
    } else if (typeof thing === "string" && thing.length >= MIN_STRING_LENGTH || typeof thing === "bigint") {
      counts.set(thing, (counts.get(thing) || 0) + 1);
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  const repeated = [];
  counts.forEach((count, thing) => {
    if (count > 1) repeated.push([thing, count]);
  });
  repeated.sort((a, b) => b[1] - a[1]).forEach(([thing, count]) => {
    const name = get_name(names.size);
    if (is_primitive(thing)) {
      const length = stringify_cached_primitive(thing).length;
      if (length * count <= length + (count + 1) * name.length + 25) return;
    }
    names.set(thing, name);
  });
  function stringify2(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive(thing);
    }
    if (custom.has(thing)) {
      return custom.get(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
      case "BigInt":
        return `Object(${stringify2(thing.valueOf())})`;
      case "RegExp":
        const { source: source2, flags } = thing;
        return flags ? `new RegExp(${stringify_string(source2)},"${flags}")` : `new RegExp(${stringify_string(source2)})`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "URL":
        return `new URL(${stringify_string(thing.toString())})`;
      case "URLSearchParams":
        return `new URLSearchParams(${stringify_string(thing.toString())})`;
      case "Array": {
        let has_holes = false;
        let result = "[";
        for (let i = 0; i < thing.length; i += 1) {
          if (i > 0) result += ",";
          if (Object.hasOwn(thing, i)) {
            result += stringify2(thing[i]);
          } else if (!has_holes) {
            const populated_keys = valid_array_indices(thing);
            const population = populated_keys.length;
            const d = String(thing.length).length;
            const array = stringify_sparse_array(thing.length);
            const hole_cost = thing.length + 2;
            const sparse_cost = array.length + 18 + population * (d + 2);
            if (hole_cost > sparse_cost) {
              const entries = populated_keys.map((k) => `${k}:${stringify2(thing[k])}`).join(",");
              return `Object.assign(${array},{${entries}})`;
            }
            has_holes = true;
          }
        }
        const tail = thing.length === 0 || Object.hasOwn(thing, thing.length - 1) ? "" : ",";
        return result + tail + "]";
      }
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify2).join(",")}])`;
      case "Int8Array":
      case "Uint8Array":
      case "Uint8ClampedArray":
      case "Int16Array":
      case "Uint16Array":
      case "Float16Array":
      case "Int32Array":
      case "Uint32Array":
      case "Float32Array":
      case "Float64Array":
      case "BigInt64Array":
      case "BigUint64Array": {
        if (is_buffer(thing)) thing = new Uint8Array(thing);
        let str2 = `new ${type}`;
        if (!names.has(thing.buffer)) {
          str2 += `([${stringify_typed_array_elements(type, thing.buffer)}])`;
        } else {
          str2 += `(${stringify2(thing.buffer)})`;
        }
        if (thing.byteLength !== thing.buffer.byteLength) {
          const start = thing.byteOffset / thing.BYTES_PER_ELEMENT;
          const end = start + thing.length;
          str2 += `.subarray(${start},${end})`;
        }
        return str2;
      }
      case "DataView": {
        let str2 = `new DataView`;
        if (!names.has(thing.buffer)) {
          str2 += `(new Uint8Array([${new Uint8Array(thing.buffer)}]).buffer`;
        } else {
          str2 += `(${stringify2(thing.buffer)}`;
        }
        if (thing.byteLength !== thing.buffer.byteLength) {
          str2 += `,${thing.byteOffset},${thing.byteLength}`;
        }
        return str2 + ")";
      }
      case "ArrayBuffer": {
        const ui8 = new Uint8Array(thing);
        return `new Uint8Array([${ui8.toString()}]).buffer`;
      }
      case "Temporal.Duration":
      case "Temporal.Instant":
      case "Temporal.PlainDate":
      case "Temporal.PlainTime":
      case "Temporal.PlainDateTime":
      case "Temporal.PlainMonthDay":
      case "Temporal.PlainYearMonth":
      case "Temporal.ZonedDateTime":
        return `${type}.from(${stringify_string(thing.toString())})`;
      default:
        const keys2 = Object.keys(thing);
        const obj = keys2.map((key) => `${safe_key(key)}:${stringify2(thing[key])}`).join(",");
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return keys2.length > 0 ? `{${obj},__proto__:null}` : `{__proto__:null}`;
        }
        return `{${obj}}`;
    }
  }
  const str = stringify2(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    const reconstructions = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (custom.has(thing)) {
        values.push(
          /** @type {string} */
          custom.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_cached_primitive(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "BigInt": {
          const primitive = thing.valueOf();
          if (names.has(primitive)) {
            values.push("{}");
            reconstructions.push(`${name}=Object(${stringify2(primitive)})`);
          } else {
            values.push(`Object(${stringify2(primitive)})`);
          }
          break;
        }
        case "RegExp":
          const { source: source2, flags } = thing;
          const regexp = flags ? `new RegExp(${stringify_string(source2)},"${flags}")` : `new RegExp(${stringify_string(source2)})`;
          values.push(regexp);
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "URL":
          values.push(`new URL(${stringify_string(thing.toString())})`);
          break;
        case "URLSearchParams":
          values.push(`new URLSearchParams(${stringify_string(thing.toString())})`);
          break;
        case "Array": {
          const populated_keys = valid_array_indices(thing);
          values.push(
            thing.length > 32 + 2 * populated_keys.length ? stringify_sparse_array(thing.length) : `Array(${thing.length})`
          );
          for (const i of populated_keys) {
            statements.push(`${name}[${i}]=${stringify2(thing[i])}`);
          }
          break;
        }
        case "Set": {
          values.push(`new Set`);
          const adds = Array.from(thing).map((v) => `.add(${stringify2(v)})`);
          if (adds.length > 0) statements.push(name + adds.join(""));
          break;
        }
        case "Map": {
          values.push(`new Map`);
          const sets = Array.from(thing).map(
            ([k, v]) => `.set(${stringify2(k)}, ${stringify2(v)})`
          );
          if (sets.length > 0) statements.push(name + sets.join(""));
          break;
        }
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Float16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array": {
          if (is_buffer(thing)) thing = new Uint8Array(thing);
          let str2 = `new ${type}`;
          if (!names.has(thing.buffer)) {
            str2 += `([${stringify_typed_array_elements(type, thing.buffer)}])`;
          } else {
            str2 += `(${stringify2(thing.buffer)})`;
          }
          if (thing.byteLength !== thing.buffer.byteLength) {
            const start = thing.byteOffset / thing.BYTES_PER_ELEMENT;
            const end = start + thing.length;
            str2 += `.subarray(${start},${end})`;
          }
          values.push(`{}`);
          reconstructions.push(`${name}=${str2}`);
          break;
        }
        case "DataView": {
          let str2 = `new DataView`;
          if (!names.has(thing.buffer)) {
            str2 += `(new Uint8Array([${new Uint8Array(thing.buffer)}]).buffer`;
          } else {
            str2 += `(${stringify2(thing.buffer)}`;
          }
          if (thing.byteLength !== thing.buffer.byteLength) {
            str2 += `,${thing.byteOffset},${thing.byteLength}`;
          }
          str2 += ")";
          values.push(`{}`);
          reconstructions.push(`${name}=${str2}`);
          break;
        }
        case "ArrayBuffer":
          values.push(`new Uint8Array([${new Uint8Array(thing)}]).buffer`);
          break;
        case "Temporal.Duration":
        case "Temporal.Instant":
        case "Temporal.PlainDate":
        case "Temporal.PlainTime":
        case "Temporal.PlainDateTime":
        case "Temporal.PlainMonthDay":
        case "Temporal.PlainYearMonth":
        case "Temporal.ZonedDateTime":
          values.push(`${type}.from(${stringify_string(thing.toString())})`);
          break;
        default:
          values.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach((key) => {
            statements.push(`${name}${safe_prop(key)}=${stringify2(thing[key])}`);
          });
      }
    });
    statements.push(`return ${str}`);
    const body = [...reconstructions, ...statements].join(";");
    if (params.length > 65534) {
      return `(function(){var[${params.join(",")}]=arguments[0];${body}}([${values.join(",")}]))`;
    }
    return `(function(${params.join(",")}){${body}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function stringify_sparse_array(length) {
  return `(function(a){a[${MAX_ARRAY_INDEX}]=0;delete a[${MAX_ARRAY_INDEX}];a.length=${length};return a}([]))`;
}
function stringify_typed_array_elements(type, buffer) {
  const array = new /** @type {any} */
  globalThis[type](buffer);
  if (type === "BigInt64Array" || type === "BigUint64Array") {
    return Array.from(array, (element) => `${element}n`).join(",");
  }
  if (array instanceof Float32Array || array instanceof Float64Array || typeof Float16Array !== "undefined" && array instanceof Float16Array) {
    return Array.from(array, (element) => Object.is(element, -0) ? "-0" : `${element}`).join(",");
  }
  return array.toString();
}
function get_name(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function escape_unsafe_char(c) {
  return escaped[c] || c;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escape_unsafe_chars(JSON.stringify(key));
}
function safe_prop(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? `.${key}` : `[${escape_unsafe_chars(JSON.stringify(key))}]`;
}
function stringify_primitive(thing) {
  const type = typeof thing;
  if (type === "string") return stringify_string(thing);
  if (thing === void 0) return "void 0";
  if (thing === 0 && 1 / thing < 0) return "-0";
  const str = String(thing);
  if (type === "number") return str.replace(/^(-)?0\./, "$1.");
  if (type === "bigint") return thing + "n";
  return str;
}

// node_modules/svelte/src/internal/server/renderer.js
var RenderResult = class {
  /** @type {() => AccumulatedContent} */
  #render;
  /** @type {() => Promise<AccumulatedContent & { hashes: { script: Sha256Source[] } }>} */
  #render_async;
  /** @type {AccumulatedContent | undefined} */
  #sync;
  /** @type {{ script: '' }} */
  #hashes = { script: "" };
  /** @type {Promise<AccumulatedContent & { hashes: { script: Sha256Source[] } }> | undefined} */
  #promise;
  /**
   * @param {() => AccumulatedContent} render
   * @param {() => Promise<AccumulatedContent & { hashes: { script: Sha256Source[] } }>} render_async
   */
  constructor(render2, render_async) {
    this.#render = render2;
    this.#render_async = render_async;
  }
  #get() {
    return this.#sync ??= this.#render();
  }
  get html() {
    return this.#get().body;
  }
  get head() {
    return this.#get().head;
  }
  get body() {
    return this.#get().body;
  }
  get hashes() {
    return this.#hashes;
  }
  /**
   * This is not type-safe, but honestly it's the best I can do right now, and it's a straightforward function.
   *
   * @template TResult1
   * @template [TResult2=never]
   * @param {(value: SyncRenderOutput) => TResult1} onfulfilled
   * @param {(reason: unknown) => TResult2} onrejected
   */
  then(onfulfilled, onrejected) {
    if (!async_mode_flag) {
      const result = this.#get();
      const user_result = onfulfilled({
        head: result.head,
        body: result.body,
        html: result.body,
        hashes: { script: [] }
      });
      return Promise.resolve(user_result);
    }
    this.#promise ??= this.#render_async().then((result) => {
      Object.defineProperty(result, "html", {
        // eslint-disable-next-line getter-return
        get: () => {
          html_deprecated();
        }
      });
      return result;
    });
    return this.#promise.then(
      (result) => onfulfilled(
        /** @type {SyncRenderOutput} */
        result
      ),
      onrejected
    );
  }
};
var Renderer = class _Renderer {
  /**
   * The contents of the renderer.
   * @type {RendererItem[]}
   */
  #out = [];
  /**
   * Any `onDestroy` callbacks registered during execution of this renderer.
   * @type {(() => void)[] | undefined}
   */
  #on_destroy = void 0;
  /**
   * Whether this renderer is a component body.
   * @type {boolean}
   */
  #is_component_body = false;
  /**
   * If set, this renderer is an error boundary. When async collection
   * of the children fails, the failed snippet is rendered instead.
   * @type {{
   * 	failed: (renderer: Renderer, error: unknown, reset: () => void) => void;
   * 	transformError: (error: unknown) => unknown;
   * 	context: SSRContext | null;
   * } | null}
   */
  #boundary = null;
  /**
   * The type of string content that this renderer is accumulating.
   * @type {RendererType}
   */
  type;
  /** @type {Renderer | undefined} */
  #parent;
  /**
   * Asynchronous work associated with this renderer
   * @type {Promise<void> | undefined}
   */
  promise = void 0;
  /**
   * State which is associated with the content tree as a whole.
   * It will be re-exposed, uncopied, on all children.
   * @type {SSRState}
   * @readonly
   */
  global;
  /**
   * State that is local to the branch it is declared in.
   * It will be shallow-copied to all children.
   *
   * @type {{ select_value: any, multiple: boolean }}
   */
  local;
  /**
   * @param {SSRState} global
   * @param {Renderer | undefined} [parent]
   */
  constructor(global, parent) {
    this.#parent = parent;
    this.global = global;
    this.local = parent ? { ...parent.local } : { select_value: void 0, multiple: false };
    this.type = parent ? parent.type : "body";
  }
  /**
   * @param {(renderer: Renderer) => void} fn
   */
  head(fn) {
    const head2 = new _Renderer(this.global, this);
    head2.type = "head";
    this.#out.push(head2);
    head2.child(fn);
  }
  /**
   * @param {Array<Promise<void>>} blockers
   * @param {(renderer: Renderer) => void} fn
   */
  async_block(blockers, fn) {
    this.#out.push(BLOCK_OPEN);
    this.async(blockers, fn);
    this.#out.push(BLOCK_CLOSE);
  }
  /**
   * @param {Array<Promise<void>>} blockers
   * @param {(renderer: Renderer) => void} fn
   */
  async(blockers, fn) {
    let callback = fn;
    if (blockers.length > 0) {
      const context2 = ssr_context;
      callback = (renderer) => {
        return Promise.all(blockers).then(() => {
          const previous_context = ssr_context;
          try {
            set_ssr_context(context2);
            return fn(renderer);
          } finally {
            set_ssr_context(previous_context);
          }
        });
      };
    }
    this.child(callback);
  }
  /**
   * @param {Array<() => void>} thunks
   */
  run(thunks) {
    const context2 = ssr_context;
    let promise = Promise.resolve(thunks[0]());
    const promises = [promise];
    if (context2 !== null && thunks.length > 1) {
      context2.i = true;
    }
    for (const fn of thunks.slice(1)) {
      promise = promise.then(() => {
        const previous_context = ssr_context;
        set_ssr_context(context2);
        try {
          return fn();
        } finally {
          set_ssr_context(previous_context);
        }
      });
      promises.push(promise);
    }
    promise.catch(noop);
    this.promise = this.global.track(promise);
    return promises;
  }
  /**
   * @param {(renderer: Renderer) => MaybePromise<void>} fn
   */
  child_block(fn) {
    this.#out.push(BLOCK_OPEN);
    this.child(fn);
    this.#out.push(BLOCK_CLOSE);
  }
  /**
   * Create a child renderer. The child renderer inherits the state from the parent,
   * but has its own content.
   * @param {(renderer: Renderer) => MaybePromise<void>} fn
   */
  child(fn) {
    const child = new _Renderer(this.global, this);
    this.#out.push(child);
    const parent = ssr_context;
    set_ssr_context({
      ...ssr_context,
      p: parent,
      c: null,
      r: child,
      i: ssr_context?.i ?? false
    });
    const result = fn(child);
    set_ssr_context(parent);
    if (result instanceof Promise) {
      result.catch(noop);
      result.finally(() => set_ssr_context(null)).catch(noop);
      if (child.global.mode === "sync") {
        await_invalid();
      }
      child.promise = child.global.track(result);
    }
    return child;
  }
  /**
   * Render children inside an error boundary. If the children throw and the API-level
   * `transformError` transform handles the error (doesn't re-throw), the `failed` snippet is
   * rendered instead. Otherwise the error propagates.
   *
   * @param {{ failed?: (renderer: Renderer, error: unknown, reset: () => void) => void }} props
   * @param {(renderer: Renderer) => MaybePromise<void>} children_fn
   */
  boundary(props, children_fn) {
    const child = new _Renderer(this.global, this);
    this.#out.push(child);
    const parent_context = ssr_context;
    if (props.failed) {
      child.#boundary = {
        failed: props.failed,
        transformError: this.global.transformError,
        context: parent_context
      };
    }
    set_ssr_context({
      ...ssr_context,
      p: parent_context,
      c: null,
      r: child,
      i: ssr_context?.i ?? false
    });
    try {
      const result = children_fn(child);
      set_ssr_context(parent_context);
      if (result instanceof Promise) {
        if (child.global.mode === "sync") {
          await_invalid();
        }
        result.catch(noop);
        child.promise = child.global.track(result);
      }
    } catch (error) {
      set_ssr_context(parent_context);
      const failed_snippet = props.failed;
      if (!failed_snippet) throw error;
      const result = this.global.transformError(error);
      child.#out.length = 0;
      child.#boundary = null;
      if (result instanceof Promise) {
        if (this.global.mode === "sync") {
          await_invalid();
        }
        child.promise = child.global.track(
          /** @type {Promise<unknown>} */
          result.then((transformed) => {
            set_ssr_context(parent_context);
            child.#out.push(_Renderer.#serialize_failed_boundary(transformed));
            failed_snippet(child, transformed, noop);
            child.#out.push(BLOCK_CLOSE);
          })
        );
        child.promise.catch(noop);
      } else {
        child.#out.push(_Renderer.#serialize_failed_boundary(result));
        failed_snippet(child, result, noop);
        child.#out.push(BLOCK_CLOSE);
      }
    }
  }
  /**
   * Create a component renderer. The component renderer inherits the state from the parent,
   * but has its own content. It is treated as an ordering boundary for ondestroy callbacks.
   * @param {(renderer: Renderer) => MaybePromise<void>} fn
   * @param {Function} [component_fn]
   * @returns {void}
   */
  component(fn, component_fn) {
    push(component_fn);
    this.child((renderer) => {
      renderer.#is_component_body = true;
      return fn(renderer);
    });
    pop();
  }
  /**
   * @param {Record<string, any>} attrs
   * @param {(renderer: Renderer) => void} fn
   * @param {string | undefined} [css_hash]
   * @param {Record<string, boolean> | undefined} [classes]
   * @param {Record<string, string> | undefined} [styles]
   * @param {number | undefined} [flags]
   * @param {boolean | undefined} [is_rich]
   * @returns {void}
   */
  select(attrs, fn, css_hash, classes, styles, flags, is_rich) {
    const { value, defaultValue, ...select_attrs } = attrs;
    if (select_attrs.multiple === "") select_attrs.multiple = true;
    this.push(`<select${attributes(select_attrs, css_hash, classes, styles, flags)}>`);
    this.child((renderer) => {
      renderer.local.select_value = value === void 0 ? defaultValue : value;
      renderer.local.multiple = !!select_attrs.multiple;
      fn(renderer);
    });
    this.push(`${is_rich ? "<!>" : ""}</select>`);
  }
  /**
   * @param {Record<string, any>} attrs
   * @param {string | number | boolean | ((renderer: Renderer) => void)} body
   * @param {string | undefined} [css_hash]
   * @param {Record<string, boolean> | undefined} [classes]
   * @param {Record<string, string> | undefined} [styles]
   * @param {number | undefined} [flags]
   * @param {boolean | undefined} [is_rich]
   */
  option(attrs, body, css_hash, classes, styles, flags, is_rich) {
    this.#out.push(`<option${attributes(attrs, css_hash, classes, styles, flags)}`);
    const close = (renderer, value, { head: head2, body: body2 }) => {
      if (has_own_property.call(attrs, "value")) {
        value = attrs.value;
      }
      var select_value = this.local.select_value;
      if (
        // Super edge-case, but theoretically someone could use arrays with non-multiple selects,
        // so we gotta check for the multiple attribute presence, too.
        this.local.multiple && is_array(select_value) ? select_value.includes(value) : value === select_value
      ) {
        renderer.#out.push(' selected=""');
      }
      renderer.#out.push(`>${body2}${is_rich ? "<!>" : ""}</option>`);
      if (head2) {
        renderer.head((child) => child.push(head2));
      }
    };
    if (typeof body === "function") {
      this.child((renderer) => {
        const r2 = new _Renderer(this.global, this);
        body(r2);
        if (this.global.mode === "async") {
          return r2.#collect_content_async().then((content) => {
            close(renderer, content.body.replaceAll("<!---->", ""), content);
          });
        } else {
          const content = r2.#collect_content();
          close(renderer, content.body.replaceAll("<!---->", ""), content);
        }
      });
    } else {
      close(this, body, { body: escape_html(body) });
    }
  }
  /**
   * @param {(renderer: Renderer) => void} fn
   */
  title(fn) {
    const path = this.get_path();
    const close = (head2) => {
      this.global.set_title(head2, path);
    };
    this.child((renderer) => {
      const r2 = new _Renderer(renderer.global, renderer);
      fn(r2);
      if (renderer.global.mode === "async") {
        return r2.#collect_content_async().then((content) => {
          close(content.head);
        });
      } else {
        const content = r2.#collect_content();
        close(content.head);
      }
    });
  }
  /**
   * @param {string | (() => Promise<string>)} content
   */
  push(content) {
    if (typeof content === "function") {
      this.child(async (renderer) => renderer.push(await content()));
    } else {
      this.#out.push(content);
    }
  }
  /**
   * @param {() => void} fn
   */
  on_destroy(fn) {
    (this.#on_destroy ??= []).push(fn);
  }
  /**
   * @returns {number[]}
   */
  get_path() {
    return this.#parent ? [...this.#parent.get_path(), this.#parent.#out.indexOf(this)] : [];
  }
  /**
   * @deprecated this is needed for legacy component bindings
   */
  copy() {
    const copy = new _Renderer(this.global, this.#parent);
    copy.type = this.type;
    copy.#out = this.#out.map((item) => item instanceof _Renderer ? item.copy() : item);
    copy.promise = this.promise;
    return copy;
  }
  /**
   * @param {Renderer} other
   * @deprecated this is needed for legacy component bindings
   */
  subsume(other) {
    if (this.global.mode !== other.global.mode) {
      throw new Error(
        "invariant: A renderer cannot switch modes. If you're seeing this, there's a compiler bug. File an issue!"
      );
    }
    this.local = other.local;
    this.#out = other.#out.map((item, i) => {
      const current = this.#out[i];
      if (current instanceof _Renderer && item instanceof _Renderer) {
        current.subsume(item);
        return current;
      }
      return item;
    });
    this.promise = other.promise;
    this.type = other.type;
  }
  get length() {
    return this.#out.length;
  }
  /**
   * Creates the hydration comment that marks the start of a failed boundary.
   * The error is JSON-serialized and embedded inside an HTML comment for the client
   * to parse during hydration. The JSON is escaped to prevent `-->` or `<!--` sequences
   * from breaking out of the comment (XSS). Uses unicode escapes which `JSON.parse()`
   * handles transparently.
   * @param {unknown} error
   * @returns {string}
   */
  static #serialize_failed_boundary(error) {
    var json = JSON.stringify(error);
    var escaped2 = json.replace(/>/g, "\\u003e").replace(/</g, "\\u003c");
    return `<!--${HYDRATION_START_FAILED}${escaped2}-->`;
  }
  /**
   * Only available on the server and when compiling with the `server` option.
   * Takes a component and returns an object with `body` and `head` properties on it, which you can use to populate the HTML when server-rendering your app.
   * @template {Record<string, any>} Props
   * @param {Component<Props>} component
   * @param {{ props?: Omit<Props, '$$slots' | '$$events'>; context?: Map<any, any>; idPrefix?: string; csp?: Csp }} [options]
   * @returns {RenderOutput}
   */
  static render(component, options = {}) {
    return (
      /** @type {RenderOutput} */
      /** @type {unknown} */
      new RenderResult(
        () => _Renderer.#render(component, options),
        () => init_render_context().then(
          () => with_render_context(() => _Renderer.#render_async(component, options))
        )
      )
    );
  }
  /**
   * Collect all of the `onDestroy` callbacks registered during rendering. In an async context, this is only safe to call
   * after awaiting `collect_async`.
   *
   * Child renderers are "porous" and don't affect execution order, but component body renderers
   * create ordering boundaries. Within a renderer, callbacks run in order until hitting a component boundary.
   * @returns {Iterable<() => void>}
   */
  *#collect_on_destroy() {
    for (const component of this.#traverse_components()) {
      yield* component.#collect_ondestroy();
    }
  }
  /**
   * Performs a depth-first search of renderers, yielding the deepest components first, then additional components as we backtrack up the tree.
   * @returns {Iterable<Renderer>}
   */
  *#traverse_components() {
    for (const child of this.#out) {
      if (typeof child !== "string") {
        yield* child.#traverse_components();
      }
    }
    if (this.#is_component_body) {
      yield this;
    }
  }
  /**
   * @returns {Iterable<() => void>}
   */
  *#collect_ondestroy() {
    if (this.#on_destroy) {
      for (const fn of this.#on_destroy) {
        yield fn;
      }
    }
    for (const child of this.#out) {
      if (child instanceof _Renderer && !child.#is_component_body) {
        yield* child.#collect_ondestroy();
      }
    }
  }
  /**
   * Runs every `onDestroy` callback in this renderer tree. On a failed render,
   * cleanup errors are suppressed so they do not mask the render error.
   * @param {boolean} suppress_errors
   */
  #run_on_destroy(suppress_errors) {
    let first_error;
    let has_error = false;
    for (const cleanup of this.#collect_on_destroy()) {
      try {
        cleanup();
      } catch (error) {
        if (!suppress_errors && !has_error) {
          first_error = error;
          has_error = true;
        }
      }
    }
    if (has_error) throw first_error;
  }
  /**
   * @param {'sync' | 'async'} mode
   * @param {{ idPrefix?: string; csp?: Csp; transformError?: (error: unknown) => unknown }} options
   * @returns {Renderer}
   */
  static #create(mode, options) {
    if (options.idPrefix?.includes("--")) {
      invalid_id_prefix();
    }
    return new _Renderer(
      new SSRState(
        mode,
        options.idPrefix ? options.idPrefix + "-" : "",
        options.csp,
        options.transformError
      )
    );
  }
  /**
   * Render a component. Throws if any of the children are performing asynchronous work.
   *
   * @template {Record<string, any>} Props
   * @param {Component<Props>} component
   * @param {{ props?: Omit<Props, '$$slots' | '$$events'>; context?: Map<any, any>; idPrefix?: string }} options
   * @returns {AccumulatedContent}
   */
  static #render(component, options) {
    var previous_context = ssr_context;
    const renderer = _Renderer.#create("sync", options);
    let result;
    let render_error;
    let failed = false;
    try {
      try {
        _Renderer.#open_render(renderer, component, options);
        result = _Renderer.#close_render(renderer.#collect_content(), renderer);
      } catch (error) {
        render_error = error;
        failed = true;
      }
      renderer.#run_on_destroy(failed);
      if (failed) throw render_error;
      return (
        /** @type {AccumulatedContent} */
        result
      );
    } finally {
      renderer.global.abort();
      set_ssr_context(previous_context);
    }
  }
  /**
   * Render a component.
   *
   * @template {Record<string, any>} Props
   * @param {Component<Props>} component
   * @param {{ props?: Omit<Props, '$$slots' | '$$events'>; context?: Map<any, any>; idPrefix?: string; csp?: Csp }} options
   * @returns {Promise<AccumulatedContent & { hashes: { script: Sha256Source[] } }>}
   */
  static async #render_async(component, options) {
    const previous_context = ssr_context;
    const renderer = _Renderer.#create("async", options);
    let result;
    let render_error;
    let failed = false;
    try {
      try {
        _Renderer.#open_render(renderer, component, options);
        const content = await renderer.#collect_content_async();
        const hydratables = await renderer.#collect_hydratables();
        if (hydratables !== null) {
          content.head = hydratables + content.head;
        }
        result = _Renderer.#close_render(content, renderer);
      } catch (error) {
        render_error = error;
        failed = true;
        renderer.global.abort();
        await renderer.global.settle();
      }
      renderer.#run_on_destroy(failed);
      if (failed) throw render_error;
      return (
        /** @type {AccumulatedContent & { hashes: { script: Sha256Source[] } }} */
        result
      );
    } finally {
      set_ssr_context(previous_context);
      renderer.global.abort();
    }
  }
  /**
   * Collect all of the code from the `out` array and return it as a string, or a promise resolving to a string.
   * @param {AccumulatedContent} content
   * @returns {AccumulatedContent}
   */
  #collect_content(content = { head: "", body: "" }) {
    for (const item of this.#out) {
      if (typeof item === "string") {
        content[this.type] += item;
      } else if (item instanceof _Renderer) {
        item.#collect_content(content);
      }
    }
    return content;
  }
  /**
   * Collect all of the code from the `out` array and return it as a string.
   * @param {AccumulatedContent} content
   * @returns {Promise<AccumulatedContent>}
   */
  async #collect_content_async(content = { head: "", body: "" }) {
    await this.promise;
    for (const item of this.#out) {
      if (typeof item === "string") {
        content[this.type] += item;
      } else if (item instanceof _Renderer) {
        if (item.#boundary) {
          const boundary_content = { head: "", body: "" };
          try {
            await item.#collect_content_async(boundary_content);
            content.head += boundary_content.head;
            content.body += boundary_content.body;
          } catch (error) {
            const { context: context2, failed, transformError } = item.#boundary;
            set_ssr_context(context2);
            let promise = transformError(error);
            set_ssr_context(null);
            let transformed = await promise;
            set_ssr_context(context2);
            const failed_renderer = new _Renderer(item.global, item);
            failed_renderer.type = item.type;
            failed_renderer.#out.push(_Renderer.#serialize_failed_boundary(transformed));
            failed(failed_renderer, transformed, noop);
            failed_renderer.#out.push(BLOCK_CLOSE);
            await failed_renderer.#collect_content_async(content);
          }
        } else {
          await item.#collect_content_async(content);
        }
      }
    }
    return content;
  }
  async #collect_hydratables() {
    const ctx = get_render_context().hydratable;
    for (const [_, key] of ctx.unresolved_promises) {
      unresolved_hydratable(key, ctx.lookup.get(key)?.stack ?? "<missing stack trace>");
    }
    for (const comparison of ctx.comparisons) {
      await comparison;
    }
    return await this.#hydratable_block(ctx);
  }
  /**
   * @template {Record<string, any>} Props
   * @param {Renderer} renderer
   * @param {import('svelte').Component<Props>} component
   * @param {{ props?: Omit<Props, '$$slots' | '$$events'>; context?: Map<any, any>; idPrefix?: string; csp?: Csp; transformError?: (error: unknown) => unknown }} options
   * @returns {void}
   */
  static #open_render(renderer, component, options) {
    var previous_context = ssr_context;
    try {
      const context2 = { p: null, c: options.context ?? null, r: renderer, i: false };
      set_ssr_context(context2);
      renderer.push(BLOCK_OPEN);
      component(renderer, options.props ?? {});
      renderer.push(BLOCK_CLOSE);
    } finally {
      set_ssr_context(previous_context);
    }
  }
  /**
   * @param {AccumulatedContent} content
   * @param {Renderer} renderer
   * @returns {AccumulatedContent & { hashes: { script: Sha256Source[] } }}
   */
  static #close_render(content, renderer) {
    let head2 = content.head + renderer.global.get_title();
    let body = content.body;
    for (const { hash: hash2, code } of renderer.global.css) {
      head2 += `<style id="${hash2}">${code}</style>`;
    }
    return {
      head: head2,
      body,
      hashes: {
        script: renderer.global.csp.script_hashes
      }
    };
  }
  /**
   * @param {HydratableContext} ctx
   */
  async #hydratable_block(ctx) {
    if (ctx.lookup.size === 0) {
      return null;
    }
    let entries = [];
    let has_promises = false;
    for (const [k, v] of ctx.lookup) {
      if (v.promises) {
        has_promises = true;
        for (const p of v.promises) await p;
      }
      entries.push(`[${uneval(k)},${v.serialized}]`);
    }
    let prelude = `const h = (window.__svelte ??= {}).h ??= new Map();`;
    if (has_promises) {
      prelude = `const r = (v) => Promise.resolve(v);
				${prelude}`;
    }
    const body = `
			{
				${prelude}

				for (const [k, v] of [
					${entries.join(",\n					")}
				]) {
					h.set(k, v);
				}
			}
		`;
    let csp_attr = "";
    if (this.global.csp.nonce) {
      csp_attr = ` nonce="${this.global.csp.nonce}"`;
    } else if (this.global.csp.hash) {
      const hash2 = await sha256(body);
      this.global.csp.script_hashes.push(`sha256-${hash2}`);
    }
    return `
		<script${csp_attr}>${body}</script>`;
  }
};
var SSRState = class {
  /** @readonly @type {Csp & { script_hashes: Sha256Source[] }} */
  csp;
  /** @readonly @type {'sync' | 'async'} */
  mode;
  /** @readonly @type {() => string} */
  uid;
  /** @readonly @type {Set<{ hash: string; code: string }>} */
  css = /* @__PURE__ */ new Set();
  /** @type {Set<Promise<unknown>>} */
  #pending = /* @__PURE__ */ new Set();
  /** @type {AbortController | null} */
  #controller = null;
  #aborted = false;
  /**
   * `transformError` passed to `render`. Called when an error boundary catches an error.
   * Throws by default if unset in `render`.
   * @type {(error: unknown) => unknown}
   */
  transformError;
  /** @type {{ path: number[], value: string }} */
  #title = { path: [], value: "" };
  /**
   * @param {'sync' | 'async'} mode
   * @param {string} id_prefix
   * @param {Csp} csp
   * @param {((error: unknown) => unknown) | undefined} [transformError]
   */
  constructor(mode, id_prefix = "", csp = { hash: false }, transformError) {
    this.mode = mode;
    this.csp = { ...csp, script_hashes: [] };
    this.transformError = transformError ?? ((error) => {
      throw error;
    });
    let uid = 1;
    this.uid = () => `${id_prefix}s${uid++}`;
  }
  /**
   * @template T
   * @param {Promise<T>} promise
   * @returns {Promise<T>}
   */
  track(promise) {
    this.#pending.add(promise);
    promise.then(
      () => this.#pending.delete(promise),
      () => this.#pending.delete(promise)
    );
    return promise;
  }
  async settle() {
    while (this.#pending.size > 0) {
      await Promise.allSettled([...this.#pending]);
    }
  }
  abort() {
    if (this.#aborted) return;
    this.#aborted = true;
    this.#controller?.abort(STALE_REACTION);
  }
  get_abort_signal() {
    const controller = this.#controller ??= new AbortController();
    if (this.#aborted) controller.abort(STALE_REACTION);
    return controller.signal;
  }
  get_title() {
    return this.#title.value;
  }
  /**
   * Performs a depth-first (lexicographic) comparison using the path. Rejects sets
   * from earlier than or equal to the current value.
   * @param {string} value
   * @param {number[]} path
   */
  set_title(value, path) {
    const current = this.#title.path;
    let i = 0;
    let l = Math.min(path.length, current.length);
    while (i < l && path[i] === current[i]) i += 1;
    if (path[i] === void 0) return;
    if (current[i] === void 0 || path[i] > current[i]) {
      this.#title.path = path;
      this.#title.value = value;
    }
  }
};

// node_modules/svelte/src/html-tree-validation.js
var autoclosing_children = {
  // based on http://developers.whatwg.org/syntax.html#syntax-tag-omission
  li: { direct: ["li"] },
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dt#technical_summary
  dt: { descendant: ["dt", "dd"], reset_by: ["dl"] },
  dd: { descendant: ["dt", "dd"], reset_by: ["dl"] },
  p: {
    descendant: [
      "address",
      "article",
      "aside",
      "blockquote",
      "div",
      "dl",
      "fieldset",
      "footer",
      "form",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "header",
      "hgroup",
      "hr",
      "main",
      "menu",
      "nav",
      "ol",
      "p",
      "pre",
      "section",
      "table",
      "ul"
    ]
  },
  rt: { descendant: ["rt", "rp"] },
  rp: { descendant: ["rt", "rp"] },
  optgroup: { descendant: ["optgroup"] },
  option: { descendant: ["option", "optgroup"] },
  thead: { direct: ["tbody", "tfoot"] },
  tbody: { direct: ["tbody", "tfoot"] },
  tfoot: { direct: ["tbody"] },
  tr: { direct: ["tr", "tbody"] },
  td: { direct: ["td", "th", "tr"] },
  th: { direct: ["td", "th", "tr"] }
};
var disallowed_children = {
  ...autoclosing_children,
  // Strictly speaking, seeing an <option> doesn't mean we're in a <select>, but we assume it here
  // option or optgroup does not have an `only` restriction because newer browsers support rich HTML content
  // inside option elements. For older browsers, hydration will handle the mismatch.
  form: { descendant: ["form"] },
  a: { descendant: ["a"] },
  button: { descendant: ["button"] },
  h1: { descendant: ["h1", "h2", "h3", "h4", "h5", "h6"] },
  h2: { descendant: ["h1", "h2", "h3", "h4", "h5", "h6"] },
  h3: { descendant: ["h1", "h2", "h3", "h4", "h5", "h6"] },
  h4: { descendant: ["h1", "h2", "h3", "h4", "h5", "h6"] },
  h5: { descendant: ["h1", "h2", "h3", "h4", "h5", "h6"] },
  h6: { descendant: ["h1", "h2", "h3", "h4", "h5", "h6"] },
  // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intd
  // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incaption
  // No special behavior since these rules fall back to "in body" mode for
  // all except special table nodes which cause bad parsing behavior anyway.
  // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intd
  tr: { only: ["th", "td", "style", "script", "template"] },
  // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intbody
  tbody: { only: ["tr", "style", "script", "template"] },
  thead: { only: ["tr", "style", "script", "template"] },
  tfoot: { only: ["tr", "style", "script", "template"] },
  // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incolgroup
  colgroup: { only: ["col", "template"] },
  // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intable
  table: {
    only: ["caption", "colgroup", "tbody", "thead", "tfoot", "style", "script", "template"]
  },
  // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inhead
  head: {
    only: [
      "base",
      "basefont",
      "bgsound",
      "link",
      "meta",
      "title",
      "noscript",
      "noframes",
      "style",
      "script",
      "template"
    ]
  },
  // https://html.spec.whatwg.org/multipage/semantics.html#the-html-element
  html: { only: ["head", "body", "frameset"] },
  frameset: { only: ["frame"] },
  "#document": { only: ["html"] }
};

// node_modules/svelte/src/internal/server/index.js
var INVALID_ATTR_NAME_CHAR_REGEX = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
function render(component, options = {}) {
  if (options.csp?.hash && options.csp.nonce) {
    invalid_csp();
  }
  return Renderer.render(
    /** @type {Component<Props>} */
    component,
    options
  );
}
function head(hash2, renderer, fn) {
  renderer.head((renderer2) => {
    renderer2.push(`<!--${hash2}-->`);
    renderer2.child(fn);
    renderer2.push(EMPTY_COMMENT);
  });
}
function attributes(attrs, css_hash, classes, styles, flags = 0) {
  if (styles) {
    attrs.style = to_style(attrs.style, styles);
  }
  if (attrs.class) {
    attrs.class = clsx2(attrs.class);
  }
  if (css_hash || classes) {
    attrs.class = to_class(attrs.class, css_hash, classes);
  }
  let attr_str = "";
  let name;
  const is_html = (flags & ELEMENT_IS_NAMESPACED) === 0;
  const lowercase = (flags & ELEMENT_PRESERVE_ATTRIBUTE_CASE) === 0;
  const is_input = (flags & ELEMENT_IS_INPUT) !== 0;
  const names = Object.keys(attrs);
  outer: for (let i = 0; i < names.length; i++) {
    name = names[i];
    if (typeof attrs[name] === "function") continue;
    if (name[0] === "$" && name[1] === "$") continue;
    if (name === "" || INVALID_ATTR_NAME_CHAR_REGEX.test(name)) continue;
    var value = attrs[name];
    var lower = name.toLowerCase();
    if (lowercase) name = lower;
    if (lower.length > 2 && lower.startsWith("on")) continue;
    if (is_input) {
      if (name === "defaultvalue" || name === "defaultchecked") {
        name = name === "defaultvalue" ? "value" : "checked";
        if (name in attrs) continue;
        for (let j = 0; j < names.length; j++) {
          if (names[j].toLowerCase() === name) continue outer;
        }
      }
    }
    attr_str += attr(name, value, is_html && is_boolean_attribute(name));
  }
  return attr_str;
}
function spread_props(props) {
  const merged_props = {};
  let key;
  for (let i = 0; i < props.length; i++) {
    const obj = props[i];
    if (obj == null) continue;
    for (key of Object.keys(obj)) {
      const desc = Object.getOwnPropertyDescriptor(obj, key);
      if (desc) {
        Object.defineProperty(merged_props, key, desc);
      } else {
        merged_props[key] = obj[key];
      }
    }
  }
  return merged_props;
}
function stringify(value) {
  return typeof value === "string" ? value : value == null ? "" : value + "";
}
function attr_class(value, hash2, directives) {
  var result = to_class(value, hash2, directives);
  return result ? ` class="${escape_html(result, true)}"` : "";
}
function sanitize_props(props) {
  const { children, $$slots, ...sanitized } = props;
  return sanitized;
}
function ensure_array_like(array_like_or_iterator) {
  if (array_like_or_iterator) {
    return array_like_or_iterator.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
  }
  return [];
}
function once(get_value) {
  let value = (
    /** @type {V} */
    UNINITIALIZED
  );
  return () => {
    if (value === UNINITIALIZED) {
      value = get_value();
    }
    return value;
  };
}
function derived2(fn) {
  const get_value = ssr_context === null ? fn : once(fn);
  let updated_value;
  return function(new_value) {
    if (arguments.length === 0) {
      return updated_value ?? get_value();
    }
    updated_value = new_value;
    return updated_value;
  };
}

// src/lib/kb/staleness.ts
var STALE_AFTER_DAYS = 180;
function isoDay(d) {
  return new Date(d).toISOString().slice(0, 10);
}
function daysSince(d, now = /* @__PURE__ */ new Date()) {
  return Math.floor((now.getTime() - new Date(d).getTime()) / 864e5);
}

// src/lib/layouts/runbook.svelte
function Runbook($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { title: title7, owner: owner7, status: status7, reviewed: reviewed7, children } = $$props;
    const age = derived2(() => daysSince(reviewed7));
    const stale = derived2(() => age() > STALE_AFTER_DAYS);
    head("e2jw2j", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(title7)} \xB7 support kb</title>`);
      });
    });
    $$renderer2.push(`<div class="kb svelte-e2jw2j"><header><a class="crumb svelte-e2jw2j" href="/kb">support desk \xB7 kb</a> <h1 class="svelte-e2jw2j">${escape_html(title7)}</h1> <p class="meta svelte-e2jw2j"><span>owner <b>${escape_html(owner7)}</b></span> <span${attr_class(`status ${stringify(status7)}`, "svelte-e2jw2j")}>${escape_html(status7)}</span> <span${attr_class("svelte-e2jw2j", void 0, { "stale": stale() })}>reviewed ${escape_html(isoDay(reviewed7))} \xB7 ${escape_html(age())} days ago${escape_html(stale() ? " \xB7 stale" : "")}</span></p></header> `);
    if (stale()) {
      $$renderer2.push(`<!--[0--><p class="banner svelte-e2jw2j">Nobody has re-read this page in ${escape_html(age())} days. Check it against the live views before you rely on it.</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <main>`);
    children($$renderer2);
    $$renderer2.push(`<!----></main> <footer class="svelte-e2jw2j">Pages are written by people. Tables and charts are built from data at render time.</footer></div>`);
  });
}

// src/routes/kb/decisions/0001-dedupe-by-subject/+page.svx
var page_exports = {};
__export(page_exports, {
  default: () => _page_svx,
  metadata: () => metadata
});
var metadata = {
  "layout": "runbook",
  "title": "0001 \xB7 Duplicates share a subject line",
  "owner": "rune",
  "status": "accepted",
  "reviewed": "2024-06-11T00:00:00.000Z"
};
var { layout, title, owner, status, reviewed } = metadata;
function _page_svx($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  Runbook($$renderer, spread_props([
    $$sanitized_props,
    metadata,
    {
      children: ($$renderer2) => {
        $$renderer2.push(`<p><strong>Date:</strong> 11 June 2024 \xB7 <strong>Deciders:</strong> Rune (product), support desk</p> <h2>Context</h2> <p>Reports arrive faster than the desk can read them. During incidents the same problem comes in
hundreds of times, and engineering asks for one ticket per issue.</p> <h2>Decision</h2> <p>Two reports are the same issue when their subject lines match after lowercasing and stripping
punctuation. The desk merges on subject alone; nobody has to read the body.</p> <h2>Consequences</h2> <ul><li>Fast: one person can triage an incident morning.</li> <li>Reports with different subjects about the same bug end up in separate tickets. Accepted;
engineering merges them later.</li></ul>`);
      },
      $$slots: { default: true }
    }
  ]));
}

// src/routes/kb/decisions/0002-evidence-before-merge/+page.svx
var page_exports2 = {};
__export(page_exports2, {
  default: () => _page_svx2,
  metadata: () => metadata2
});

// src/lib/kb/desk-ref.ts
var ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
function fnv1a(text, seed) {
  let h = seed >>> 0;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}
function deskRef(signature3) {
  const t = signature3.trim();
  const a = fnv1a(t, 2166136261);
  const b = fnv1a(t, 2654435769);
  let bits = BigInt(a) << 8n | BigInt(b & 255);
  let out = "";
  for (let i = 0; i < 8; i++) {
    out = ALPHABET[Number(bits & 31n)] + out;
    bits >>= 5n;
  }
  return `DR-${out.slice(0, 4)}-${out.slice(4)}`;
}

// src/lib/kb/RenderStamp.svelte
function RenderStamp($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { signature: signature3 } = $$props;
    const ref = derived2(() => signature3 ? deskRef(signature3) : null);
    if (ref()) {
      $$renderer2.push(`<!--[0--><p class="stamp svelte-1280m42">desk ref <b class="svelte-1280m42">${escape_html(ref())}</b></p>`);
    } else {
      $$renderer2.push(`<!--[-1--><p class="stamp missing svelte-1280m42">no desk ref: this page isn't signed (no <code>signature</code> in its frontmatter)</p>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}

// src/routes/kb/decisions/0002-evidence-before-merge/+page.svx
var metadata2 = {
  "layout": "runbook",
  "title": "Decision 0002: evidence before merging reports",
  "owner": "Marcin Mielnicki / OpenCode review",
  "status": "proposed",
  "reviewed": "2026-11-13",
  "signature": "OpenCode / GPT-6.1 Sol / S01E03 / Marcin Mielnicki"
};
var { layout: layout2, title: title2, owner: owner2, status: status2, reviewed: reviewed2, signature } = metadata2;
function _page_svx2($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  Runbook($$renderer, spread_props([
    $$sanitized_props,
    metadata2,
    {
      children: ($$renderer2) => {
        $$renderer2.push(`<h2>Proposed successor to decision 0001</h2> <p>The accepted <a href="/kb/decisions/0001-dedupe-by-subject">decision 0001</a> remains unchanged as
a historical record. This proposal replaces subject matching as sufficient evidence for a merge.
The support desk must approve the policy; this document does not claim that approval.</p> <h2>Context</h2> <p>The <a href="/kb/incidents/4471-review">incident review</a> shows that matching subjects can hide different
failures, and that different subjects or intake tags can describe the same failure.
The existing tenant-based classifier also assigns some conflicting bodies to a broad bucket;
therefore its label alone is not proof of diagnosis.</p> <h2>Proposed rule</h2> <ol><li>Deduplicate overlapping export rows by report ID, not by subject, body, or person.</li> <li>Read the body and record the product, tenant, locale, form version, channel, and reproduction.</li> <li>Use subject matching to find candidate tickets only. Merge when the observed failure and
reproduction support the same mechanism and fix boundary.</li> <li>Keep different mechanisms in separate tickets, with distinct report counts and ID coverage.</li> <li>Keep unknown or conflicting evidence unconfirmed and visible for investigation.</li> <li>Reconcile new reports against existing IDs and review changed copies before updating counts.</li></ol> <h2>Limits and verification</h2> <p>The scheduling classifier models shared-parser and booking-v3-hint failures for known
day-first tenants. It is not a general classifier for other support products.
Preserve symptom exceptions as unresolved until reproduced, even when the tenant classifier
assigns them to an existing group. A fix must cover the actual failure, not merely its intake label.</p> <p>Before adopting this proposal, replay the explorer fixtures, review the exceptions, and ask
the support desk to approve the operating rule. Reconsider the rule when fresh evidence changes
the failure mechanisms, not only when subject wording changes.</p> `);
        RenderStamp($$renderer2, { signature });
        $$renderer2.push(`<!---->`);
      },
      $$slots: { default: true }
    }
  ]));
}

// src/routes/kb/incidents/4471-review/+page.svx
var page_exports3 = {};
__export(page_exports3, {
  default: () => _page_svx3,
  metadata: () => metadata3
});

// src/lib/data/reports-4471.json
var reports_4471_default = [
  {
    id: "R-41200",
    receivedAt: "2026-04-01T09:12:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: "Our 7 April reminder went out on 4 July. Is this a joke. It is not April Fools where we are.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:03:00+02:00"
  },
  {
    id: "R-41201",
    receivedAt: "2026-04-01T09:34:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Appointment moved by itself",
    body: "Sorry. 4 July went out on 7 April. I have been up since five.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:05:00+02:00"
  },
  {
    id: "R-41202",
    receivedAt: "2026-04-02T10:41:00+02:00",
    tenant: "kettle.books",
    channel: "email",
    subject: "Wrong day on the invite",
    body: "Invite says Tuesday 12 May. Calendar says Monday 11 May. My client turned up on the Monday. We had coffee.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:06:00+02:00"
  },
  {
    id: "R-41203",
    receivedAt: "2026-04-03T12:14:00+02:00",
    tenant: "lantern.row",
    channel: "app",
    subject: "Calendar invite is wrong",
    body: "Booked for 2 December. The invite says 12 February.",
    meta: {
      browserLocale: "cs-CZ",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:09:00+02:00"
  },
  {
    id: "R-41204",
    receivedAt: "2026-04-04T21:55:00+02:00",
    tenant: "kettle.books",
    channel: "email",
    subject: "Dates mixed up",
    body: "Invite says Thursday 10 December. We agreed Monday 12 October. Which one do I trust?",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:10:00+02:00"
  },
  {
    id: "R-41205",
    receivedAt: "2026-04-05T12:29:00+02:00",
    tenant: "morrow.tax",
    channel: "app",
    subject: "Booking shows a different day",
    body: "Customer booked 3 October and got an invite for 10 March. Please look at this.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:13:00+02:00"
  },
  {
    id: "R-41206",
    receivedAt: "2026-04-05T16:54:00+02:00",
    tenant: "long.table",
    channel: "app",
    subject: "Calendar invite is wrong",
    body: "Second time this month: 4 March turned into 3 April.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:15:00+02:00"
  },
  {
    id: "R-41208",
    receivedAt: "2026-04-06T14:52:00+02:00",
    tenant: "ridge.clinic",
    channel: "email",
    subject: "Dates mixed up",
    body: "Booked for 2 March. The invite says 3 February.",
    meta: {
      browserLocale: "da-DK",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:18:00+02:00"
  },
  {
    id: "R-41209",
    receivedAt: "2026-04-06T15:18:00+02:00",
    tenant: "alder.physio",
    channel: "app",
    subject: "Month and day swapped?",
    body: "Every booking in June is one day off. Only June. Why only June.",
    meta: {
      browserLocale: "de-DE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:19:00+02:00"
  },
  {
    id: "R-41210",
    receivedAt: "2026-04-07T08:53:00+02:00",
    tenant: "long.table",
    channel: "app",
    subject: "Month and day swapped?",
    body: "Second time this month: 12 April turned into 4 December.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:20:00+02:00"
  },
  {
    id: "R-41211",
    receivedAt: "2026-04-07T09:28:00+01:00",
    tenant: "pale.harbour",
    channel: "app",
    subject: "Booking on the wrong date",
    body: "The reminder for 5 March arrived for 3 May.",
    meta: {
      browserLocale: "pt-PT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:23:00+02:00"
  },
  {
    id: "R-41212",
    receivedAt: "2026-04-07T10:22:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Appointment moved by itself",
    body: "Every booking we make shows the wrong day. 8 December is now 12 August.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:25:00+02:00"
  },
  {
    id: "R-41213",
    receivedAt: "2026-04-07T17:14:00+02:00",
    tenant: "kettle.books",
    channel: "email",
    subject: "Calendar invite is wrong",
    body: "Monday 1 June showed as Tuesday 6 January. I moved it myself.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:27:00+02:00"
  },
  {
    id: "R-41214",
    receivedAt: "2026-04-08T18:22:00+02:00",
    tenant: "copper.studio",
    channel: "email",
    subject: "Date is wrong",
    body: "Invite says Thursday 9 July. We agreed Monday 7 September. Which one do I trust?",
    meta: {
      browserLocale: "es-ES",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:28:00+02:00"
  },
  {
    id: "R-41215",
    receivedAt: "2026-04-08T19:23:00+02:00",
    tenant: "kettle.books",
    channel: "app",
    subject: "Appointment moved by itself",
    body: "My client came on 3 February instead of 2 March. We sorted it out.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:30:00+02:00"
  },
  {
    id: "R-41216",
    receivedAt: "2026-04-11T12:34:00+02:00",
    tenant: "nine.lanterns",
    channel: "app",
    subject: "Booking on the wrong date",
    body: "We had two people show up on 5 December. They were booked for 12 May.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:33:00+02:00"
  },
  {
    id: "R-41217",
    receivedAt: "2026-04-12T15:23:00+02:00",
    tenant: "ridge.clinic",
    channel: "email",
    subject: "Booking on the wrong date",
    body: "The reminder for 9 May arrived for 5 September.",
    meta: {
      browserLocale: "da-DK",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:34:00+02:00"
  },
  {
    id: "R-41218",
    receivedAt: "2026-04-12T18:55:00+01:00",
    tenant: "pale.harbour",
    channel: "email",
    subject: "Reminder went out on the wrong day",
    body: "Customer booked 6 November and got an invite for 11 June. Please look at this.",
    meta: {
      browserLocale: "pt-PT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:35:00+02:00"
  },
  {
    id: "R-41219",
    receivedAt: "2026-04-13T13:46:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: "Thursday 12 March showed as Thursday 3 December. I moved it myself.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:36:00+02:00"
  },
  {
    id: "R-41220",
    receivedAt: "2026-04-13T18:08:00+02:00",
    tenant: "nine.lanterns",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: "We had two people show up on 5 June. They were booked for 6 May.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:38:00+02:00"
  },
  {
    id: "R-41221",
    receivedAt: "2026-04-13T21:27:00+02:00",
    tenant: "long.table",
    channel: "email",
    subject: "Date is wrong",
    body: "Booked for 2 July. The invite says 7 February.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:41:00+02:00"
  },
  {
    id: "R-41222",
    receivedAt: "2026-04-14T17:49:00+01:00",
    tenant: "pale.harbour",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: "Customer booked 1 October and got an invite for 10 January. Please look at this.",
    meta: {
      browserLocale: "pt-PT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:43:00+02:00"
  },
  {
    id: "R-41223",
    receivedAt: "2026-04-14T19:08:00+02:00",
    tenant: "long.table",
    channel: "email",
    subject: "Wrong date again",
    body: "Tuesday 8 December showed as Wednesday 12 August. I moved it myself.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:44:00+02:00"
  },
  {
    id: "R-41224",
    receivedAt: "2026-04-17T13:50:00+02:00",
    tenant: "morrow.tax",
    channel: "email",
    subject: "Invite came on the wrong day",
    body: "Every booking we make shows the wrong day. 10 September is now 9 October.",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:47:00+02:00"
  },
  {
    id: "R-41225",
    receivedAt: "2026-04-17T14:02:00+02:00",
    tenant: "alder.physio",
    channel: "email",
    subject: "Wrong date again",
    body: "The reminder for 3 May arrived for 5 March.",
    meta: {
      browserLocale: "de-DE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:48:00+02:00"
  },
  {
    id: "R-41227",
    receivedAt: "2026-04-17T14:23:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Booking on the wrong date",
    body: "We had two people show up on 2 June. They were booked for 6 February.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:50:00+02:00"
  },
  {
    id: "R-41228",
    receivedAt: "2026-04-17T17:27:00+02:00",
    tenant: "long.table",
    channel: "app",
    subject: "Calendar invite is wrong",
    body: "Customer booked 2 July and got an invite for 7 February. Please look at this.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:51:00+02:00"
  },
  {
    id: "R-41229",
    receivedAt: "2026-04-17T20:59:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Month and day swapped?",
    body: "Every booking we make shows the wrong day. 5 March is now 3 May.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:54:00+02:00"
  },
  {
    id: "R-41230",
    receivedAt: "2026-04-17T22:44:00+02:00",
    tenant: "copper.studio",
    channel: "form",
    subject: "Wrong day on the invite",
    body: "My client came on 1 June instead of 6 January. We sorted it out.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:56:00+02:00"
  },
  {
    id: "R-41231",
    receivedAt: "2026-04-18T11:22:00+02:00",
    tenant: "long.table",
    channel: "app",
    subject: "Calendar invite is wrong",
    body: "Second time this month: 8 January turned into 1 August.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T09:58:00+02:00"
  },
  {
    id: "R-41232",
    receivedAt: "2026-04-19T13:15:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Date is wrong",
    body: "Second time this month: 6 January turned into 1 June.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:00:00+02:00"
  },
  {
    id: "R-41233",
    receivedAt: "2026-04-19T21:27:00+02:00",
    tenant: "nine.lanterns",
    channel: "email",
    subject: "Month and day swapped?",
    body: "We had two people show up on 10 November. They were booked for 11 October.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:01:00+02:00"
  },
  {
    id: "R-41234",
    receivedAt: "2026-04-20T07:46:00+01:00",
    tenant: "pale.harbour",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: "Every booking we make shows the wrong day. 1 March is now 3 January.",
    meta: {
      browserLocale: "pt-PT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:03:00+02:00"
  },
  {
    id: "R-41235",
    receivedAt: "2026-04-20T10:50:00+02:00",
    tenant: "ridge.clinic",
    channel: "app",
    subject: "Wrong date again",
    body: "Second time this month: 2 May turned into 5 February.",
    meta: {
      browserLocale: "da-DK",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:06:00+02:00"
  },
  {
    id: "R-41236",
    receivedAt: "2026-04-20T11:52:00+02:00",
    tenant: "nine.lanterns",
    channel: "app",
    subject: "Client turned up on the wrong day",
    body: "The invite arrived before I made the booking. I would like to know how.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:08:00+02:00"
  },
  {
    id: "R-41237",
    receivedAt: "2026-04-20T21:02:00+01:00",
    tenant: "pale.harbour",
    channel: "app",
    subject: "Date is wrong",
    body: "The reminder for 12 January arrived for 1 December.",
    meta: {
      browserLocale: "pt-PT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:08:00+02:00"
  },
  {
    id: "R-41238",
    receivedAt: "2026-04-20T22:16:00+02:00",
    tenant: "alder.physio",
    channel: "app",
    subject: "Appointment moved by itself",
    body: "Every booking we make shows the wrong day. 8 March is now 3 August.",
    meta: {
      browserLocale: "de-DE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:11:00+02:00"
  },
  {
    id: "R-41239",
    receivedAt: "2026-04-21T10:21:00+02:00",
    tenant: "kettle.books",
    channel: "form",
    subject: "Wrong day on the invite",
    body: "The reminder for 8 November arrived for 11 August.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:13:00+02:00"
  },
  {
    id: "R-41240",
    receivedAt: "2026-04-21T12:34:00+02:00",
    tenant: "morrow.tax",
    channel: "form",
    subject: "Month and day swapped?",
    body: "Second time this month: 7 February turned into 2 July.",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:14:00+02:00"
  },
  {
    id: "R-41241",
    receivedAt: "2026-04-21T19:21:00+02:00",
    tenant: "alder.physio",
    channel: "form",
    subject: "Invite came on the wrong day",
    body: "We had two people show up on 8 June. They were booked for 6 August.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:15:00+02:00"
  },
  {
    id: "R-41242",
    receivedAt: "2026-04-22T14:50:00+02:00",
    tenant: "copper.studio",
    channel: "app",
    subject: "Appointment moved by itself",
    body: "The reminder for 5 October arrived for 10 May.",
    meta: {
      browserLocale: "es-ES",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:16:00+02:00"
  },
  {
    id: "R-41243",
    receivedAt: "2026-04-22T21:56:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Client turned up on the wrong day",
    body: "My client came on 5 October instead of 10 May. We sorted it out.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:18:00+02:00"
  },
  {
    id: "R-41244",
    receivedAt: "2026-04-23T13:35:00+02:00",
    tenant: "lantern.row",
    channel: "email",
    subject: "Wrong date again",
    body: "Second time this month: 1 December turned into 12 January.",
    meta: {
      browserLocale: "cs-CZ",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:19:00+02:00"
  },
  {
    id: "R-41245",
    receivedAt: "2026-04-23T18:38:00+02:00",
    tenant: "ridge.clinic",
    channel: "app",
    subject: "Month and day swapped?",
    body: "My client came on 10 November instead of 11 October. We sorted it out.",
    meta: {
      browserLocale: "da-DK",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:21:00+02:00"
  },
  {
    id: "R-41246",
    receivedAt: "2026-04-24T10:27:00+01:00",
    tenant: "stone.and.sons",
    channel: "form",
    subject: "Dates mixed up",
    body: "We had two people show up on 12 June. They were booked for 6 December.",
    meta: {
      browserLocale: "en-IE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:22:00+02:00"
  },
  {
    id: "R-41247",
    receivedAt: "2026-04-24T12:30:00+02:00",
    tenant: "long.table",
    channel: "app",
    subject: "Wrong day on the invite",
    body: "Customer booked 11 March and got an invite for 3 November. Please look at this.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:25:00+02:00"
  },
  {
    id: "R-41248",
    receivedAt: "2026-04-24T15:13:00+02:00",
    tenant: "long.table",
    channel: "form",
    subject: "Invite came on the wrong day",
    body: "Invite says Wednesday 5 August. We agreed Friday 8 May. Which one do I trust?",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:27:00+02:00"
  },
  {
    id: "R-41249",
    receivedAt: "2026-04-24T19:27:00+02:00",
    tenant: "morrow.tax",
    channel: "email",
    subject: "Date is wrong",
    body: "My client came on 10 November instead of 11 October. We sorted it out.",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:28:00+02:00"
  },
  {
    id: "R-41250",
    receivedAt: "2026-04-24T19:35:00+01:00",
    tenant: "stone.and.sons",
    channel: "email",
    subject: "Wrong date again",
    body: "Booked for 10 December. The invite says 12 October.",
    meta: {
      browserLocale: "en-IE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:29:00+02:00"
  },
  {
    id: "R-41251",
    receivedAt: "2026-04-25T20:48:00+01:00",
    tenant: "pale.harbour",
    channel: "form",
    subject: "Booking on the wrong date",
    body: "Wednesday 7 January showed as Wednesday 1 July. I moved it myself.",
    meta: {
      browserLocale: "pt-PT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:30:00+02:00"
  },
  {
    id: "R-41251",
    receivedAt: "2026-04-25T20:48:00+01:00",
    tenant: "pale.harbour",
    channel: "form",
    subject: "Booking on the wrong date",
    body: "Wednesday 7 January showed as Wednesday 1 July. I moved it myself.",
    meta: {
      browserLocale: "pt-PT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:30:00+02:00"
  },
  {
    id: "R-41252",
    receivedAt: "2026-04-26T15:56:00+02:00",
    tenant: "nine.lanterns",
    channel: "email",
    subject: "Wrong date again",
    body: "The reminder for 3 January arrived for 1 March.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:31:00+02:00"
  },
  {
    id: "R-41253",
    receivedAt: "2026-04-27T13:56:00+01:00",
    tenant: "harbour.dental",
    channel: "email",
    subject: "Wrong day on the invite",
    body: "My client came on 4 February instead of 2 April. We sorted it out.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:33:00+02:00"
  },
  {
    id: "R-41254",
    receivedAt: "2026-04-28T20:08:00+01:00",
    tenant: "stone.and.sons",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: "The reminder for 8 April arrived for 4 August.",
    meta: {
      browserLocale: "en-IE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:35:00+02:00"
  },
  {
    id: "R-41255",
    receivedAt: "2026-04-29T13:22:00+02:00",
    tenant: "kettle.books",
    channel: "email",
    subject: "Dates mixed up",
    body: "Customer booked 6 December and got an invite for 12 June. Please look at this.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:38:00+02:00"
  },
  {
    id: "R-41256",
    receivedAt: "2026-04-29T16:38:00+02:00",
    tenant: "long.table",
    channel: "form",
    subject: "Month and day swapped?",
    body: "My client came on 6 July instead of 7 June. We sorted it out.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:40:00+02:00"
  },
  {
    id: "R-41257",
    receivedAt: "2026-04-30T09:53:00+01:00",
    tenant: "harbour.dental",
    channel: "email",
    subject: "Month and day swapped?",
    body: "Every booking we make shows the wrong day. 12 August is now 8 December.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:42:00+02:00"
  },
  {
    id: "R-41258",
    receivedAt: "2026-05-01T11:08:00+02:00",
    tenant: "ridge.clinic",
    channel: "email",
    subject: "Calendar invite is wrong",
    body: "We had two people show up on 9 December. They were booked for 12 September.",
    meta: {
      browserLocale: "da-DK",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:44:00+02:00"
  },
  {
    id: "R-41259",
    receivedAt: "2026-05-01T12:24:00+02:00",
    tenant: "copper.studio",
    channel: "form",
    subject: "Client turned up on the wrong day",
    body: "Customer booked 11 April and got an invite for 4 November. Please look at this.",
    meta: {
      browserLocale: "es-ES",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:45:00+02:00"
  },
  {
    id: "R-41260",
    receivedAt: "2026-05-01T21:18:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Client turned up on the wrong day",
    body: "Second time this month: 1 November turned into 11 January.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:47:00+02:00"
  },
  {
    id: "R-41261",
    receivedAt: "2026-05-02T10:47:00+02:00",
    tenant: "lantern.row",
    channel: "email",
    subject: "Wrong day on the invite",
    body: "Booked for 2 September. The invite says 9 February.",
    meta: {
      browserLocale: "cs-CZ",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:50:00+02:00"
  },
  {
    id: "R-41262",
    receivedAt: "2026-05-02T13:17:00+01:00",
    tenant: "pale.harbour",
    channel: "form",
    subject: "Month and day swapped?",
    body: "We had two people show up on 3 February. They were booked for 2 March.",
    meta: {
      browserLocale: "pt-PT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:52:00+02:00"
  },
  {
    id: "R-41263",
    receivedAt: "2026-05-02T15:49:00+01:00",
    tenant: "stone.and.sons",
    channel: "email",
    subject: "Reminder went out on the wrong day",
    body: "The reminder for 3 February arrived for 2 March.",
    meta: {
      browserLocale: "en-IE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:53:00+02:00"
  },
  {
    id: "R-41264",
    receivedAt: "2026-05-02T18:18:00+02:00",
    tenant: "alder.physio",
    channel: "email",
    subject: "Wrong day on the invite",
    body: "Invite says Sunday 5 April. We agreed Monday 4 May. Which one do I trust?",
    meta: {
      browserLocale: "de-DE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:56:00+02:00"
  },
  {
    id: "R-41265",
    receivedAt: "2026-05-03T08:12:00+02:00",
    tenant: "long.table",
    channel: "form",
    subject: "Booking shows a different day",
    body: "The reminder for 7 August arrived for 8 July.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T10:59:00+02:00"
  },
  {
    id: "R-41266",
    receivedAt: "2026-05-03T11:40:00+02:00",
    tenant: "copper.studio",
    channel: "email",
    subject: "Reminder went out on the wrong day",
    body: "Every booking we make shows the wrong day. 12 November is now 11 December.",
    meta: {
      browserLocale: "es-ES",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:01:00+02:00"
  },
  {
    id: "R-41267",
    receivedAt: "2026-05-03T14:36:00+02:00",
    tenant: "kettle.books",
    channel: "app",
    subject: "Date is wrong",
    body: "The calendar invite for 12 November landed on 11 December. Nobody here touched it.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:02:00+02:00"
  },
  {
    id: "R-41268",
    receivedAt: "2026-05-03T16:23:00+01:00",
    tenant: "stone.and.sons",
    channel: "email",
    subject: "Wrong date again",
    body: "The reminder for 5 February arrived for 2 May.",
    meta: {
      browserLocale: "en-IE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:03:00+02:00"
  },
  {
    id: "R-41269",
    receivedAt: "2026-05-04T14:49:00+02:00",
    tenant: "lantern.row",
    channel: "email",
    subject: "Wrong day on the invite",
    body: "Second time this month: 5 August turned into 8 May.",
    meta: {
      browserLocale: "cs-CZ",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:05:00+02:00"
  },
  {
    id: "R-41270",
    receivedAt: "2026-05-04T16:03:00+02:00",
    tenant: "morrow.tax",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: "Our 5 June invoice meeting is shown as 6 May. We paid someone on the wrong day because of this. Not your problem. Noting it.",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:08:00+02:00"
  },
  {
    id: "R-41271",
    receivedAt: "2026-05-04T16:33:00+02:00",
    tenant: "nine.lanterns",
    channel: "email",
    subject: "Wrong date again",
    body: "Second time this month: 12 January turned into 1 December.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:10:00+02:00"
  },
  {
    id: "R-41272",
    receivedAt: "2026-05-04T21:05:00+02:00",
    tenant: "lantern.row",
    channel: "app",
    subject: "Wrong day on the invite",
    body: "We had two people show up on 12 January. They were booked for 1 December.",
    meta: {
      browserLocale: "cs-CZ",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:11:00+02:00"
  },
  {
    id: "R-41273",
    receivedAt: "2026-05-07T10:16:00+02:00",
    tenant: "ridge.clinic",
    channel: "app",
    subject: "Dates mixed up",
    body: "Saturday 3 January showed as Sunday 1 March. I moved it myself.",
    meta: {
      browserLocale: "da-DK",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:14:00+02:00"
  },
  {
    id: "R-41274",
    receivedAt: "2026-05-07T15:27:00+02:00",
    tenant: "nine.lanterns",
    channel: "app",
    subject: "Booking on the wrong date",
    body: "Friday 7 August showed as Wednesday 8 July. I moved it myself.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:16:00+02:00"
  },
  {
    id: "R-41275",
    receivedAt: "2026-05-07T18:27:00+02:00",
    tenant: "alder.physio",
    channel: "form",
    subject: "Month and day swapped?",
    body: "My client came on 11 July instead of 7 November. We sorted it out.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:18:00+02:00"
  },
  {
    id: "R-41276",
    receivedAt: "2026-05-08T12:58:00+02:00",
    tenant: "morrow.tax",
    channel: "app",
    subject: "Month and day swapped?",
    body: "Customer booked 11 June and got an invite for 6 November. Please look at this.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:20:00+02:00"
  },
  {
    id: "R-41277",
    receivedAt: "2026-05-08T17:43:00+02:00",
    tenant: "ridge.clinic",
    channel: "email",
    subject: "Booking on the wrong date",
    body: "The reminder for 11 January arrived for 1 November.",
    meta: {
      browserLocale: "da-DK",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:23:00+02:00"
  },
  {
    id: "R-41278",
    receivedAt: "2026-05-08T18:54:00+02:00",
    tenant: "morrow.tax",
    channel: "app",
    subject: "Client turned up on the wrong day",
    body: "Invite says Thursday 10 September. We agreed Friday 9 October. Which one do I trust?",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:25:00+02:00"
  },
  {
    id: "R-41279",
    receivedAt: "2026-05-08T19:21:00+02:00",
    tenant: "nine.lanterns",
    channel: "email",
    subject: "Appointment moved by itself",
    body: "Second time this month: 6 November turned into 11 June.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:28:00+02:00"
  },
  {
    id: "R-41280",
    receivedAt: "2026-05-10T16:29:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: "Every booking we make shows the wrong day. 11 January is now 1 November.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:31:00+02:00"
  },
  {
    id: "R-41281",
    receivedAt: "2026-05-11T09:44:00+02:00",
    tenant: "alder.physio",
    channel: "email",
    subject: "Appointment moved by itself",
    body: "Booked for 7 June. The invite says 6 July.",
    meta: {
      browserLocale: "de-DE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:34:00+02:00"
  },
  {
    id: "R-41282",
    receivedAt: "2026-05-12T13:50:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Calendar invite is wrong",
    body: "Second time this month: 11 April turned into 4 November.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:37:00+02:00"
  },
  {
    id: "R-41283",
    receivedAt: "2026-05-12T16:23:00+01:00",
    tenant: "stone.and.sons",
    channel: "app",
    subject: "Date is wrong",
    body: "My client came on 10 December instead of 12 October. We sorted it out.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:40:00+02:00"
  },
  {
    id: "R-41284",
    receivedAt: "2026-05-14T11:06:00+01:00",
    tenant: "harbour.dental",
    channel: "email",
    subject: "Booking on the wrong date",
    body: "Every booking we make shows the wrong day. 6 August is now 8 June.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:42:00+02:00"
  },
  {
    id: "R-41285",
    receivedAt: "2026-05-14T22:27:00+02:00",
    tenant: "lantern.row",
    channel: "form",
    subject: "Calendar invite is wrong",
    body: "Booked for 1 December. The invite says 12 January.",
    meta: {
      browserLocale: "cs-CZ",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:43:00+02:00"
  },
  {
    id: "R-41286",
    receivedAt: "2026-05-17T09:27:00+02:00",
    tenant: "long.table",
    channel: "app",
    subject: "Appointment moved by itself",
    body: "Invite says Monday 9 November. We agreed Friday 11 September. Which one do I trust?",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:45:00+02:00"
  },
  {
    id: "R-41287",
    receivedAt: "2026-05-17T17:10:00+02:00",
    tenant: "nine.lanterns",
    channel: "app",
    subject: "Date is wrong",
    body: "Second time this month: 8 February turned into 2 August.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:47:00+02:00"
  },
  {
    id: "R-41288",
    receivedAt: "2026-05-17T21:53:00+02:00",
    tenant: "kettle.books",
    channel: "app",
    subject: "Booking on the wrong date",
    body: "Customer booked 7 October and got an invite for 10 July. Please look at this.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:49:00+02:00"
  },
  {
    id: "R-41289",
    receivedAt: "2026-05-18T15:42:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Month and day swapped?",
    body: "Every booking we make shows the wrong day. 7 August is now 8 July.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:50:00+02:00"
  },
  {
    id: "R-41290",
    receivedAt: "2026-05-19T13:44:00+02:00",
    tenant: "long.table",
    channel: "app",
    subject: "Appointment moved by itself",
    body: 'Is there a setting for "my country writes the day first". I have looked. I would pay for it.',
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:51:00+02:00"
  },
  {
    id: "R-41291",
    receivedAt: "2026-05-20T09:56:00+01:00",
    tenant: "pale.harbour",
    channel: "email",
    subject: "Calendar invite is wrong",
    body: "The calendar invite for 12 February landed on 2 December. Nobody here touched it.",
    meta: {
      browserLocale: "pt-PT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:53:00+02:00"
  },
  {
    id: "R-41292",
    receivedAt: "2026-05-20T14:29:00+01:00",
    tenant: "harbour.dental",
    channel: "form",
    subject: "Wrong day on the invite",
    body: "Tuesday 10 November showed as Sunday 11 October. I moved it myself.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:54:00+02:00"
  },
  {
    id: "R-41293",
    receivedAt: "2026-05-20T21:10:00+01:00",
    tenant: "pale.harbour",
    channel: "email",
    subject: "Date is wrong",
    body: "Customer booked 1 September and got an invite for 9 January. Please look at this.",
    meta: {
      browserLocale: "pt-PT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:55:00+02:00"
  },
  {
    id: "R-41294",
    receivedAt: "2026-05-21T21:10:00+01:00",
    tenant: "pale.harbour",
    channel: "form",
    subject: "Wrong date again",
    body: "Thursday 5 November showed as Monday 11 May. I moved it myself.",
    meta: {
      browserLocale: "pt-PT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T11:58:00+02:00"
  },
  {
    id: "R-41295",
    receivedAt: "2026-05-22T20:49:00+02:00",
    tenant: "nine.lanterns",
    channel: "app",
    subject: "Wrong date again",
    body: "Invite says Monday 2 March. We agreed Tuesday 3 February. Which one do I trust?",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:01:00+02:00"
  },
  {
    id: "R-41296",
    receivedAt: "2026-05-23T18:39:00+02:00",
    tenant: "copper.studio",
    channel: "email",
    subject: "Calendar invite is wrong",
    body: "Invite says Monday 6 July. We agreed Sunday 7 June. Which one do I trust?",
    meta: {
      browserLocale: "es-ES",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:04:00+02:00"
  },
  {
    id: "R-41297",
    receivedAt: "2026-05-23T21:58:00+01:00",
    tenant: "harbour.dental",
    channel: "email",
    subject: "Wrong date again",
    body: "Customer booked 7 June and got an invite for 6 July. Please look at this.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:06:00+02:00"
  },
  {
    id: "R-41298",
    receivedAt: "2026-05-24T14:52:00+02:00",
    tenant: "ridge.clinic",
    channel: "email",
    subject: "Booking on the wrong date",
    body: "The reminder for 12 January arrived for 1 December.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:08:00+02:00"
  },
  {
    id: "R-41299",
    receivedAt: "2026-05-24T14:39:00+01:00",
    tenant: "stone.and.sons",
    channel: "email",
    subject: "Month and day swapped?",
    body: "We had two people show up on 9 October. They were booked for 10 September.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:08:00+02:00"
  },
  {
    id: "R-41300",
    receivedAt: "2026-05-24T22:57:00+02:00",
    tenant: "long.table",
    channel: "email",
    subject: "Month and day swapped?",
    body: "Booked for 12 October. The invite says 10 December.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:10:00+02:00"
  },
  {
    id: "R-41301",
    receivedAt: "2026-05-26T09:53:00+01:00",
    tenant: "harbour.dental",
    channel: "email",
    subject: "Wrong date again",
    body: "Booked for 2 July. The invite says 7 February.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:12:00+02:00"
  },
  {
    id: "R-41300",
    receivedAt: "2026-05-24T22:57:00+02:00",
    tenant: "long.table",
    channel: "email",
    subject: "Month and day swapped?",
    body: "Booked for 12 October. The invite says 10 December.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:10:00+02:00"
  },
  {
    id: "R-41301",
    receivedAt: "2026-05-26T09:53:00+01:00",
    tenant: "harbour.dental",
    channel: "email",
    subject: "Wrong date again",
    body: "Booked for 2 July. The invite says 7 February.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:12:00+02:00"
  },
  {
    id: "R-41302",
    receivedAt: "2026-05-26T18:23:00+02:00",
    tenant: "lantern.row",
    channel: "email",
    subject: "Dates mixed up",
    body: "The reminder for 5 November arrived for 11 May.",
    meta: {
      browserLocale: "cs-CZ",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:14:00+02:00"
  },
  {
    id: "R-41303",
    receivedAt: "2026-05-27T08:55:00+02:00",
    tenant: "long.table",
    channel: "app",
    subject: "Booking on the wrong date",
    body: "Booked for 8 November. The invite says 11 August.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:16:00+02:00"
  },
  {
    id: "R-41304",
    receivedAt: "2026-05-27T09:16:00+02:00",
    tenant: "lantern.row",
    channel: "form",
    subject: "Appointment moved by itself",
    body: "The calendar invite for 8 January landed on 1 August. Nobody here touched it.",
    meta: {
      browserLocale: "cs-CZ",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:18:00+02:00"
  },
  {
    id: "R-41305",
    receivedAt: "2026-05-27T13:04:00+02:00",
    tenant: "copper.studio",
    channel: "form",
    subject: "Reminder went out on the wrong day",
    body: "Booked for 9 August. The invite says 8 September.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:19:00+02:00"
  },
  {
    id: "R-41306",
    receivedAt: "2026-05-27T14:19:00+01:00",
    tenant: "harbour.dental",
    channel: "email",
    subject: "Reminder went out on the wrong day",
    body: "Thursday 10 December showed as Monday 12 October. I moved it myself.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:22:00+02:00"
  },
  {
    id: "R-41308",
    receivedAt: "2026-05-28T09:27:00+02:00",
    tenant: "alder.physio",
    channel: "form",
    subject: "Invite came on the wrong day",
    body: "We had two people show up on 3 May. They were booked for 5 March.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:25:00+02:00"
  },
  {
    id: "R-41309",
    receivedAt: "2026-05-28T17:27:00+02:00",
    tenant: "long.table",
    channel: "app",
    subject: "Wrong date again",
    body: "Thursday 8 January showed as Saturday 1 August. I moved it myself.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:28:00+02:00"
  },
  {
    id: "R-41310",
    receivedAt: "2026-05-29T21:44:00+02:00",
    tenant: "morrow.tax",
    channel: "app",
    subject: "Reminder went out on the wrong day",
    body: "The calendar invite for 12 July landed on 7 December. Nobody here touched it.",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:29:00+02:00"
  },
  {
    id: "R-41311",
    receivedAt: "2026-05-30T10:55:00+02:00",
    tenant: "alder.physio",
    channel: "email",
    subject: "Booking shows a different day",
    body: "Booked for 8 May. The invite says 5 August.",
    meta: {
      browserLocale: "de-DE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:30:00+02:00"
  },
  {
    id: "R-41312",
    receivedAt: "2026-05-30T20:00:00+01:00",
    tenant: "pale.harbour",
    channel: "app",
    subject: "Month and day swapped?",
    body: "We had two people show up on 4 June. They were booked for 6 April.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:33:00+02:00"
  },
  {
    id: "R-41313",
    receivedAt: "2026-05-31T09:05:00+02:00",
    tenant: "long.table",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: "Customer booked 11 May and got an invite for 5 November. Please look at this.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:36:00+02:00"
  },
  {
    id: "R-41314",
    receivedAt: "2026-05-31T13:28:00+02:00",
    tenant: "nine.lanterns",
    channel: "app",
    subject: "Reminder went out on the wrong day",
    body: "Booked for 8 April. The invite says 4 August.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:37:00+02:00"
  },
  {
    id: "R-41315",
    receivedAt: "2026-05-31T19:21:00+02:00",
    tenant: "ridge.clinic",
    channel: "email",
    subject: "Wrong day on the invite",
    body: "The calendar invite for 1 November landed on 11 January. Nobody here touched it.",
    meta: {
      browserLocale: "da-DK",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:38:00+02:00"
  },
  {
    id: "R-41316",
    receivedAt: "2026-06-01T18:59:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: "Friday 2 October showed as Tuesday 10 February. I moved it myself.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:40:00+02:00"
  },
  {
    id: "R-41317",
    receivedAt: "2026-06-01T20:05:00+01:00",
    tenant: "stone.and.sons",
    channel: "app",
    subject: "Wrong date again",
    body: "Second time this month: 1 September turned into 9 January.",
    meta: {
      browserLocale: "en-IE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:42:00+02:00"
  },
  {
    id: "R-41318",
    receivedAt: "2026-06-02T22:28:00+02:00",
    tenant: "lantern.row",
    channel: "app",
    subject: "Wrong day on the invite",
    body: "Every booking we make shows the wrong day. 12 November is now 11 December.",
    meta: {
      browserLocale: "cs-CZ",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:44:00+02:00"
  },
  {
    id: "R-41319",
    receivedAt: "2026-06-03T12:43:00+01:00",
    tenant: "harbour.dental",
    channel: "email",
    subject: "Wrong day on the invite",
    body: "Invite says Wednesday 4 November. We agreed Saturday 11 April. Which one do I trust?",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:45:00+02:00"
  },
  {
    id: "R-41320",
    receivedAt: "2026-06-04T15:35:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: "We had two people show up on 5 November. They were booked for 11 May.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:47:00+02:00"
  },
  {
    id: "R-41321",
    receivedAt: "2026-06-04T16:56:00+01:00",
    tenant: "harbour.dental",
    channel: "form",
    subject: "Dates mixed up",
    body: "Customer booked 12 May and got an invite for 5 December. Please look at this.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:49:00+02:00"
  },
  {
    id: "R-41322",
    receivedAt: "2026-06-05T09:57:00+02:00",
    tenant: "lantern.row",
    channel: "app",
    subject: "Month and day swapped?",
    body: "My client came on 10 December instead of 12 October. We sorted it out.",
    meta: {
      browserLocale: "cs-CZ",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:52:00+02:00"
  },
  {
    id: "R-41323",
    receivedAt: "2026-06-05T12:35:00+02:00",
    tenant: "morrow.tax",
    channel: "form",
    subject: "Client turned up on the wrong day",
    body: "The reminder for 12 August arrived for 8 December.",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:53:00+02:00"
  },
  {
    id: "R-41324",
    receivedAt: "2026-06-05T16:33:00+02:00",
    tenant: "kettle.books",
    channel: "app",
    subject: "Reminder went out on the wrong day",
    body: "Customer booked 4 December and got an invite for 12 April. Please look at this.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:56:00+02:00"
  },
  {
    id: "R-41325",
    receivedAt: "2026-06-05T22:13:00+02:00",
    tenant: "copper.studio",
    channel: "app",
    subject: "Month and day swapped?",
    body: "The reminder for 12 June arrived for 6 December.",
    meta: {
      browserLocale: "es-ES",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T12:59:00+02:00"
  },
  {
    id: "R-41327",
    receivedAt: "2026-06-06T08:52:00+02:00",
    tenant: "morrow.tax",
    channel: "email",
    subject: "Wrong day on the invite",
    body: "My client came on 9 January instead of 1 September. We sorted it out.",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:02:00+02:00"
  },
  {
    id: "R-41328",
    receivedAt: "2026-06-06T20:06:00+02:00",
    tenant: "morrow.tax",
    channel: "app",
    subject: "Reminder went out on the wrong day",
    body: "My client came on 2 May instead of 5 February. We sorted it out.",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:05:00+02:00"
  },
  {
    id: "R-41329",
    receivedAt: "2026-06-07T11:27:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Booking on the wrong date",
    body: "The calendar invite for 12 November landed on 11 December. Nobody here touched it.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:06:00+02:00"
  },
  {
    id: "R-41330",
    receivedAt: "2026-06-07T16:11:00+02:00",
    tenant: "alder.physio",
    channel: "app",
    subject: "Wrong day on the invite",
    body: "Customer booked 7 April and got an invite for 4 July. Please look at this.",
    meta: {
      browserLocale: "de-DE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:08:00+02:00"
  },
  {
    id: "R-41331",
    receivedAt: "2026-06-07T17:36:00+02:00",
    tenant: "alder.physio",
    channel: "email",
    subject: "Client turned up on the wrong day",
    body: "Customer booked 2 April and got an invite for 4 February. Please look at this.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:09:00+02:00"
  },
  {
    id: "R-41332",
    receivedAt: "2026-06-07T20:06:00+02:00",
    tenant: "nine.lanterns",
    channel: "app",
    subject: "Reminder went out on the wrong day",
    body: "We had two people show up on 1 September. They were booked for 9 January.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:11:00+02:00"
  },
  {
    id: "R-41333",
    receivedAt: "2026-06-07T22:08:00+02:00",
    tenant: "long.table",
    channel: "email",
    subject: "Reminder went out on the wrong day",
    body: "Saturday 12 September showed as Wednesday 9 December. I moved it myself.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:14:00+02:00"
  },
  {
    id: "R-41334",
    receivedAt: "2026-06-08T10:59:00+02:00",
    tenant: "lantern.row",
    channel: "app",
    subject: "Reminder went out on the wrong day",
    body: "My client came on 2 May instead of 5 February. We sorted it out.",
    meta: {
      browserLocale: "cs-CZ",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:15:00+02:00"
  },
  {
    id: "R-41335",
    receivedAt: "2026-06-08T20:22:00+02:00",
    tenant: "ridge.clinic",
    channel: "email",
    subject: "Client turned up on the wrong day",
    body: "The calendar invite for 9 October landed on 10 September. Nobody here touched it.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:16:00+02:00"
  },
  {
    id: "R-41336",
    receivedAt: "2026-06-08T20:25:00+02:00",
    tenant: "kettle.books",
    channel: "app",
    subject: "Wrong day on the invite",
    body: "Tuesday 12 May showed as Saturday 5 December. I moved it myself.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:19:00+02:00"
  },
  {
    id: "R-41337",
    receivedAt: "2026-06-08T21:27:00+02:00",
    tenant: "ridge.clinic",
    channel: "email",
    subject: "Invite came on the wrong day",
    body: "We had two people show up on 8 June. They were booked for 6 August.",
    meta: {
      browserLocale: "da-DK",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:21:00+02:00"
  },
  {
    id: "R-41338",
    receivedAt: "2026-06-09T08:51:00+02:00",
    tenant: "kettle.books",
    channel: "app",
    subject: "Date is wrong",
    body: "Saturday 7 February showed as Thursday 2 July. I moved it myself.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:22:00+02:00"
  },
  {
    id: "R-41339",
    receivedAt: "2026-06-09T22:38:00+02:00",
    tenant: "morrow.tax",
    channel: "form",
    subject: "Appointment moved by itself",
    body: "The calendar invite for 5 March landed on 3 May. Nobody here touched it.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:25:00+02:00"
  },
  {
    id: "R-41340",
    receivedAt: "2026-06-10T18:22:00+02:00",
    tenant: "morrow.tax",
    channel: "app",
    subject: "Month and day swapped?",
    body: "Invite says Sunday 9 August. We agreed Tuesday 8 September. Which one do I trust?",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:27:00+02:00"
  },
  {
    id: "R-41341",
    receivedAt: "2026-06-10T22:43:00+02:00",
    tenant: "nine.lanterns",
    channel: "app",
    subject: "Booking shows a different day",
    body: "The calendar invite for 9 June landed on 6 September. Nobody here touched it.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:29:00+02:00"
  },
  {
    id: "R-41342",
    receivedAt: "2026-06-11T08:32:00+01:00",
    tenant: "stone.and.sons",
    channel: "email",
    subject: "Invite came on the wrong day",
    body: "Every booking we make shows the wrong day. 4 March is now 3 April.",
    meta: {
      browserLocale: "en-IE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:31:00+02:00"
  },
  {
    id: "R-41343",
    receivedAt: "2026-06-11T15:23:00+02:00",
    tenant: "long.table",
    channel: "email",
    subject: "Dates mixed up",
    body: "The calendar invite for 6 May landed on 5 June. Nobody here touched it.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:33:00+02:00"
  },
  {
    id: "R-41344",
    receivedAt: "2026-06-12T09:58:00+01:00",
    tenant: "pale.harbour",
    channel: "email",
    subject: "Reminder went out on the wrong day",
    body: "Client in Lisbon got Tuesday. Client in Toronto got Monday. Same meeting. We held it twice.",
    meta: {
      browserLocale: "pt-PT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:35:00+02:00"
  },
  {
    id: "R-41345",
    receivedAt: "2026-06-12T22:52:00+02:00",
    tenant: "ridge.clinic",
    channel: "app",
    subject: "Booking on the wrong date",
    body: "Customer booked 9 February and got an invite for 2 September. Please look at this.",
    meta: {
      browserLocale: "da-DK",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:38:00+02:00"
  },
  {
    id: "R-41346",
    receivedAt: "2026-06-13T13:25:00+02:00",
    tenant: "nine.lanterns",
    channel: "app",
    subject: "Date is wrong",
    body: "Booked for 11 January. The invite says 1 November.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:39:00+02:00"
  },
  {
    id: "R-41347",
    receivedAt: "2026-06-13T17:11:00+02:00",
    tenant: "morrow.tax",
    channel: "app",
    subject: "Month and day swapped?",
    body: "Second time this month: 1 July turned into 7 January.",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:41:00+02:00"
  },
  {
    id: "R-41348",
    receivedAt: "2026-06-14T12:50:00+02:00",
    tenant: "morrow.tax",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: "The reminder for 10 July arrived for 7 October.",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:42:00+02:00"
  },
  {
    id: "R-41349",
    receivedAt: "2026-06-14T14:49:00+02:00",
    tenant: "ridge.clinic",
    channel: "form",
    subject: "Month and day swapped?",
    body: "Thursday 10 September showed as Friday 9 October. I moved it myself.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:43:00+02:00"
  },
  {
    id: "R-41350",
    receivedAt: "2026-06-15T16:29:00+02:00",
    tenant: "kettle.books",
    channel: "email",
    subject: "Wrong date again",
    body: "Second time this month: 2 June turned into 6 February.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:45:00+02:00"
  },
  {
    id: "R-41351",
    receivedAt: "2026-06-16T08:43:00+02:00",
    tenant: "nine.lanterns",
    channel: "app",
    subject: "Client turned up on the wrong day",
    body: "Every booking we make shows the wrong day. 11 February is now 2 November.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:47:00+02:00"
  },
  {
    id: "R-41352",
    receivedAt: "2026-06-16T10:44:00+02:00",
    tenant: "ridge.clinic",
    channel: "app",
    subject: "Month and day swapped?",
    body: "Second time this month: 5 March turned into 3 May.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:48:00+02:00"
  },
  {
    id: "R-41353",
    receivedAt: "2026-06-16T10:46:00+02:00",
    tenant: "alder.physio",
    channel: "email",
    subject: "Month and day swapped?",
    body: "Every booking we make shows the wrong day. 3 August is now 8 March.",
    meta: {
      browserLocale: "de-DE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:50:00+02:00"
  },
  {
    id: "R-41352",
    receivedAt: "2026-06-16T10:44:00+02:00",
    tenant: "ridge.clinic",
    channel: "app",
    subject: "Month and day swapped?",
    body: "Second time this month: 5 March turned into 3 May.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:48:00+02:00"
  },
  {
    id: "R-41353",
    receivedAt: "2026-06-16T10:46:00+02:00",
    tenant: "alder.physio",
    channel: "email",
    subject: "Month and day swapped?",
    body: "Every booking we make shows the wrong day. 3 August is now 8 March.",
    meta: {
      browserLocale: "de-DE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:50:00+02:00"
  },
  {
    id: "R-41354",
    receivedAt: "2026-06-16T15:49:00+02:00",
    tenant: "long.table",
    channel: "app",
    subject: "Month and day swapped?",
    body: "The calendar invite for 8 June landed on 6 August. Nobody here touched it.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:53:00+02:00"
  },
  {
    id: "R-41355",
    receivedAt: "2026-06-16T20:42:00+02:00",
    tenant: "copper.studio",
    channel: "app",
    subject: "Month and day swapped?",
    body: "Customer booked 6 November and got an invite for 11 June. Please look at this.",
    meta: {
      browserLocale: "es-ES",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:56:00+02:00"
  },
  {
    id: "R-41356",
    receivedAt: "2026-06-17T12:32:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Calendar invite is wrong",
    body: "Wednesday 5 August showed as Friday 8 May. I moved it myself.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T13:58:00+02:00"
  },
  {
    id: "R-41357",
    receivedAt: "2026-06-17T14:48:00+02:00",
    tenant: "kettle.books",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: "Wednesday 1 July showed as Wednesday 7 January. I moved it myself.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:01:00+02:00"
  },
  {
    id: "R-41358",
    receivedAt: "2026-06-17T21:40:00+01:00",
    tenant: "harbour.dental",
    channel: "email",
    subject: "Month and day swapped?",
    body: "The reminder for 1 July arrived for 7 January.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:04:00+02:00"
  },
  {
    id: "R-41359",
    receivedAt: "2026-06-18T08:01:00+02:00",
    tenant: "ridge.clinic",
    channel: "email",
    subject: "Invite came on the wrong day",
    body: "Invite says Friday 4 September. We agreed Thursday 9 April. Which one do I trust?",
    meta: {
      browserLocale: "da-DK",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:06:00+02:00"
  },
  {
    id: "R-41360",
    receivedAt: "2026-06-18T11:29:00+02:00",
    tenant: "lantern.row",
    channel: "email",
    subject: "Reminder went out on the wrong day",
    body: "We had two people show up on 4 October. They were booked for 10 April.",
    meta: {
      browserLocale: "cs-CZ",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:09:00+02:00"
  },
  {
    id: "R-41361",
    receivedAt: "2026-06-18T21:08:00+01:00",
    tenant: "harbour.dental",
    channel: "email",
    subject: "Booking on the wrong date",
    body: "The calendar invite for 1 August landed on 8 January. Nobody here touched it.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:12:00+02:00"
  },
  {
    id: "R-41362",
    receivedAt: "2026-06-19T13:21:00+02:00",
    tenant: "morrow.tax",
    channel: "email",
    subject: "Date is wrong",
    body: "Customer booked 12 February and got an invite for 2 December. Please look at this.",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:14:00+02:00"
  },
  {
    id: "R-41363",
    receivedAt: "2026-06-19T14:27:00+02:00",
    tenant: "nine.lanterns",
    channel: "email",
    subject: "Month and day swapped?",
    body: "My client came on 12 January instead of 1 December. We sorted it out.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:15:00+02:00"
  },
  {
    id: "R-41364",
    receivedAt: "2026-06-20T14:19:00+02:00",
    tenant: "ridge.clinic",
    channel: "email",
    subject: "Wrong day on the invite",
    body: "We had two people show up on 10 January. They were booked for 1 October.",
    meta: {
      browserLocale: "da-DK",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:16:00+02:00"
  },
  {
    id: "R-41365",
    receivedAt: "2026-06-20T21:21:00+02:00",
    tenant: "morrow.tax",
    channel: "app",
    subject: "Appointment moved by itself",
    body: "Invite says Tuesday 4 August. We agreed Wednesday 8 April. Which one do I trust?",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:19:00+02:00"
  },
  {
    id: "R-41366",
    receivedAt: "2026-06-21T13:17:00+02:00",
    tenant: "alder.physio",
    channel: "form",
    subject: "Calendar invite is wrong",
    body: "Sunday 11 October showed as Tuesday 10 November. I moved it myself.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:22:00+02:00"
  },
  {
    id: "R-41367",
    receivedAt: "2026-06-22T12:14:00+02:00",
    tenant: "kettle.books",
    channel: "app",
    subject: "Booking on the wrong date",
    body: "Wednesday 11 March showed as Tuesday 3 November. I moved it myself.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:25:00+02:00"
  },
  {
    id: "R-41368",
    receivedAt: "2026-06-24T09:08:00+02:00",
    tenant: "long.table",
    channel: "app",
    subject: "Month and day swapped?",
    body: "We had two people show up on 9 April. They were booked for 4 September.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:27:00+02:00"
  },
  {
    id: "R-41369",
    receivedAt: "2026-06-25T11:43:00+02:00",
    tenant: "nine.lanterns",
    channel: "form",
    subject: "Wrong day on the invite",
    body: "Booked for 5 November. The invite says 11 May.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:27:00+02:00"
  },
  {
    id: "R-41370",
    receivedAt: "2026-06-25T11:59:00+01:00",
    tenant: "pale.harbour",
    channel: "email",
    subject: "Booking shows a different day",
    body: "The calendar invite for 9 December landed on 12 September. Nobody here touched it.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:29:00+02:00"
  },
  {
    id: "R-41371",
    receivedAt: "2026-06-25T15:06:00+02:00",
    tenant: "copper.studio",
    channel: "app",
    subject: "Wrong day on the invite",
    body: "The calendar invite for 7 June landed on 6 July. Nobody here touched it.",
    meta: {
      browserLocale: "es-ES",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:32:00+02:00"
  },
  {
    id: "R-41372",
    receivedAt: "2026-06-25T20:34:00+02:00",
    tenant: "alder.physio",
    channel: "form",
    subject: "Dates mixed up",
    body: "Invite says Tuesday 8 September. We agreed Sunday 9 August. Which one do I trust?",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:35:00+02:00"
  },
  {
    id: "R-41373",
    receivedAt: "2026-06-26T09:18:00+02:00",
    tenant: "kettle.books",
    channel: "app",
    subject: "Month and day swapped?",
    body: "Booked for 7 March. The invite says 3 July.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:37:00+02:00"
  },
  {
    id: "R-41374",
    receivedAt: "2026-06-26T09:57:00+02:00",
    tenant: "nine.lanterns",
    channel: "app",
    subject: "Appointment moved by itself",
    body: "The reminder for 9 November arrived for 11 September.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:39:00+02:00"
  },
  {
    id: "R-41375",
    receivedAt: "2026-06-27T11:13:00+02:00",
    tenant: "ridge.clinic",
    channel: "email",
    subject: "Invite came on the wrong day",
    body: "The calendar invite for 7 April landed on 4 July. Nobody here touched it.",
    meta: {
      browserLocale: "da-DK",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:41:00+02:00"
  },
  {
    id: "R-41376",
    receivedAt: "2026-06-27T19:29:00+02:00",
    tenant: "kettle.books",
    channel: "app",
    subject: "Reminder went out on the wrong day",
    body: "The reminder for 12 March arrived for 3 December.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:42:00+02:00"
  },
  {
    id: "R-41377",
    receivedAt: "2026-06-28T10:38:00+01:00",
    tenant: "harbour.dental",
    channel: "email",
    subject: "Wrong day on the invite",
    body: "Second time this month: 2 March turned into 3 February.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:43:00+02:00"
  },
  {
    id: "R-41378",
    receivedAt: "2026-06-29T08:06:00+02:00",
    tenant: "long.table",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: "The reminder for 7 February arrived for 2 July.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:44:00+02:00"
  },
  {
    id: "R-41379",
    receivedAt: "2026-06-30T08:21:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Booking on the wrong date",
    body: "We had two people show up on 12 October. They were booked for 10 December.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:47:00+02:00"
  },
  {
    id: "R-41380",
    receivedAt: "2026-06-30T10:27:00+02:00",
    tenant: "long.table",
    channel: "email",
    subject: "Month and day swapped?",
    body: "We had two people show up on 7 May. They were booked for 5 July.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:49:00+02:00"
  },
  {
    id: "R-41381",
    receivedAt: "2026-06-30T16:46:00+02:00",
    tenant: "kettle.books",
    channel: "email",
    subject: "Wrong day on the invite",
    body: "My client came on 10 February instead of 2 October. We sorted it out.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:52:00+02:00"
  },
  {
    id: "R-41382",
    receivedAt: "2026-06-30T18:12:00+02:00",
    tenant: "alder.physio",
    channel: "app",
    subject: "Appointment moved by itself",
    body: "Every booking we make shows the wrong day. 6 August is now 8 June.",
    meta: {
      browserLocale: "de-DE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:53:00+02:00"
  },
  {
    id: "R-41383",
    receivedAt: "2026-07-01T13:45:00+02:00",
    tenant: "long.table",
    channel: "app",
    subject: "Booking on the wrong date",
    body: "Monday 3 August showed as Sunday 8 March. I moved it myself.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:55:00+02:00"
  },
  {
    id: "R-41384",
    receivedAt: "2026-07-01T15:19:00+02:00",
    tenant: "copper.studio",
    channel: "form",
    subject: "Calendar invite is wrong",
    body: "The calendar invite for 8 January landed on 1 August. Nobody here touched it.",
    meta: {
      browserLocale: "es-ES",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:56:00+02:00"
  },
  {
    id: "R-41385",
    receivedAt: "2026-07-01T20:36:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Appointment moved by itself",
    body: "Second time this month: 5 December turned into 12 May.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T14:57:00+02:00"
  },
  {
    id: "R-41386",
    receivedAt: "2026-07-01T21:52:00+01:00",
    tenant: "harbour.dental",
    channel: "form",
    subject: "Dates mixed up",
    body: "Second time this month: 10 August turned into 8 October.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T15:00:00+02:00"
  },
  {
    id: "R-41387",
    receivedAt: "2026-07-02T08:17:00+02:00",
    tenant: "copper.studio",
    channel: "form",
    subject: "Date is wrong",
    body: "Invite says Sunday 4 October. We agreed Friday 10 April. Which one do I trust?",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-02T15:01:00+02:00"
  },
  {
    id: "R-41388",
    receivedAt: "2026-07-02T21:41:00+01:00",
    tenant: "pale.harbour",
    channel: "email",
    subject: "Wrong date again",
    body: "Invite says Sunday 4 January. We agreed Wednesday 1 April. Which one do I trust?",
    meta: {
      browserLocale: "pt-PT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-03T00:32:00+02:00"
  },
  {
    id: "R-41389",
    receivedAt: "2026-07-03T19:42:00+02:00",
    tenant: "ridge.clinic",
    channel: "email",
    subject: "Dates mixed up",
    body: "Wednesday 4 February showed as Thursday 2 April. I moved it myself.",
    meta: {
      browserLocale: "da-DK",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-03T23:58:00+02:00"
  },
  {
    id: "R-41390",
    receivedAt: "2026-07-05T08:08:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Wrong day on the invite",
    body: "We had two people show up on 9 August. They were booked for 8 September.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-05T10:56:00+02:00"
  },
  {
    id: "R-41391",
    receivedAt: "2026-07-05T11:06:00+02:00",
    tenant: "copper.studio",
    channel: "email",
    subject: "Booking on the wrong date",
    body: "The reminder for 12 October arrived for 10 December.",
    meta: {
      browserLocale: "es-ES",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-05T15:27:00+02:00"
  },
  {
    id: "R-41392",
    receivedAt: "2026-07-05T13:19:00+02:00",
    tenant: "ridge.clinic",
    channel: "app",
    subject: "Wrong date again",
    body: "The reminder for 3 February arrived for 2 March.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-05T17:02:00+02:00"
  },
  {
    id: "R-41393",
    receivedAt: "2026-07-06T12:22:00+02:00",
    tenant: "kettle.books",
    channel: "email",
    subject: "Booking on the wrong date",
    body: "The reminder for 1 July arrived for 7 January.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-06T15:28:00+02:00"
  },
  {
    id: "R-41394",
    receivedAt: "2026-07-06T13:12:00+02:00",
    tenant: "morrow.tax",
    channel: "app",
    subject: "Reminder went out on the wrong day",
    body: "We had two people show up on 1 September. They were booked for 9 January.",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-06T18:00:00+02:00"
  },
  {
    id: "R-41395",
    receivedAt: "2026-07-07T17:15:00+02:00",
    tenant: "ridge.clinic",
    channel: "app",
    subject: "Reminder went out on the wrong day",
    body: "Sunday 5 July showed as Thursday 7 May. I moved it myself.",
    meta: {
      browserLocale: "da-DK",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-07T18:54:00+02:00"
  },
  {
    id: "R-41396",
    receivedAt: "2026-07-07T19:19:00+02:00",
    tenant: "alder.physio",
    channel: "form",
    subject: "Dates mixed up",
    body: "My client came on 10 April instead of 4 October. We sorted it out.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-07T23:59:00+02:00"
  },
  {
    id: "R-41397",
    receivedAt: "2026-07-07T19:05:00+01:00",
    tenant: "stone.and.sons",
    channel: "form",
    subject: "Calendar invite is wrong",
    body: "My client came on 4 December instead of 12 April. We sorted it out.",
    meta: {
      browserLocale: "en-IE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-08T00:24:00+02:00"
  },
  {
    id: "R-41398",
    receivedAt: "2026-07-07T22:47:00+02:00",
    tenant: "ridge.clinic",
    channel: "app",
    subject: "Wrong day on the invite",
    body: "The calendar invite for 7 June landed on 6 July. Nobody here touched it.",
    meta: {
      browserLocale: "da-DK",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-08T00:12:00+02:00"
  },
  {
    id: "R-41399",
    receivedAt: "2026-07-08T12:03:00+02:00",
    tenant: "ridge.clinic",
    channel: "email",
    subject: "Wrong date again",
    body: "The reminder for 2 March arrived for 3 February.",
    meta: {
      browserLocale: "da-DK",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-08T12:54:00+02:00"
  },
  {
    id: "R-41400",
    receivedAt: "2026-07-09T15:16:00+02:00",
    tenant: "copper.studio",
    channel: "form",
    subject: "Reminder went out on the wrong day",
    body: "We had two people show up on 11 October. They were booked for 10 November.",
    meta: {
      browserLocale: "es-ES",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-09T19:04:00+02:00"
  },
  {
    id: "R-41401",
    receivedAt: "2026-07-09T16:13:00+02:00",
    tenant: "copper.studio",
    channel: "app",
    subject: "Reminder went out on the wrong day",
    body: "We had two people show up on 10 June. They were booked for 6 October.",
    meta: {
      browserLocale: "es-ES",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-09T17:31:00+02:00"
  },
  {
    id: "R-41402",
    receivedAt: "2026-07-10T13:17:00+01:00",
    tenant: "pale.harbour",
    channel: "app",
    subject: "Appointment moved by itself",
    body: "The reminder for 4 September arrived for 9 April.",
    meta: {
      browserLocale: "pt-PT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-10T15:17:00+02:00"
  },
  {
    id: "R-41403",
    receivedAt: "2026-07-10T16:32:00+02:00",
    tenant: "copper.studio",
    channel: "app",
    subject: "Booking on the wrong date",
    body: "The reminder for 7 February arrived for 2 July.",
    meta: {
      browserLocale: "es-ES",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-10T20:11:00+02:00"
  },
  {
    id: "R-41402",
    receivedAt: "2026-07-10T13:17:00+01:00",
    tenant: "pale.harbour",
    channel: "app",
    subject: "Appointment moved by itself",
    body: "The reminder for 4 September arrived for 9 April.",
    meta: {
      browserLocale: "pt-PT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-10T15:17:00+02:00"
  },
  {
    id: "R-41403",
    receivedAt: "2026-07-10T16:32:00+02:00",
    tenant: "copper.studio",
    channel: "app",
    subject: "Booking on the wrong date",
    body: "The reminder for 7 February arrived for 2 July.",
    meta: {
      browserLocale: "es-ES",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-10T20:11:00+02:00"
  },
  {
    id: "R-41404",
    receivedAt: "2026-07-10T15:56:00+01:00",
    tenant: "harbour.dental",
    channel: "email",
    subject: "Wrong date again",
    body: "My client came on 1 February instead of 2 January. We sorted it out.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-10T20:23:00+02:00"
  },
  {
    id: "R-41405",
    receivedAt: "2026-07-11T15:22:00+02:00",
    tenant: "kettle.books",
    channel: "email",
    subject: "Appointment moved by itself",
    body: "Every booking we make shows the wrong day. 1 October is now 10 January.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-11T15:45:00+02:00"
  },
  {
    id: "R-41406",
    receivedAt: "2026-07-11T17:06:00+01:00",
    tenant: "pale.harbour",
    channel: "form",
    subject: "Wrong day on the invite",
    body: "Every booking we make shows the wrong day. 8 July is now 7 August.",
    meta: {
      browserLocale: "pt-PT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-11T20:34:00+02:00"
  },
  {
    id: "R-41408",
    receivedAt: "2026-07-12T14:40:00+02:00",
    tenant: "kettle.books",
    channel: "app",
    subject: "Wrong date again",
    body: "Every booking we make shows the wrong day. 12 November is now 11 December.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-12T16:14:00+02:00"
  },
  {
    id: "R-41409",
    receivedAt: "2026-07-12T14:52:00+02:00",
    tenant: "kettle.books",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: "My client came on 4 June instead of 6 April. We sorted it out.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-12T18:38:00+02:00"
  },
  {
    id: "R-41410",
    receivedAt: "2026-07-12T15:02:00+02:00",
    tenant: "morrow.tax",
    channel: "form",
    subject: "Reminder went out on the wrong day",
    body: "Invite says Friday 2 October. We agreed Tuesday 10 February. Which one do I trust?",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-12T16:52:00+02:00"
  },
  {
    id: "R-41411",
    receivedAt: "2026-07-12T17:04:00+02:00",
    tenant: "nine.lanterns",
    channel: "email",
    subject: "Calendar invite is wrong",
    body: "Invite says Friday 7 August. We agreed Wednesday 8 July. Which one do I trust?",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-12T20:29:00+02:00"
  },
  {
    id: "R-41412",
    receivedAt: "2026-07-12T22:40:00+02:00",
    tenant: "nine.lanterns",
    channel: "form",
    subject: "Date is wrong",
    body: "Wednesday 8 July showed as Friday 7 August. I moved it myself.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-13T00:16:00+02:00"
  },
  {
    id: "R-41413",
    receivedAt: "2026-07-13T16:27:00+02:00",
    tenant: "alder.physio",
    channel: "email",
    subject: "Dates mixed up",
    body: "The reminder for 10 May arrived for 5 October.",
    meta: {
      browserLocale: "de-DE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-13T19:21:00+02:00"
  },
  {
    id: "R-41414",
    receivedAt: "2026-07-13T20:54:00+01:00",
    tenant: "harbour.dental",
    channel: "email",
    subject: "Invite came on the wrong day",
    body: "Invite says Monday 6 July. We agreed Sunday 7 June. Which one do I trust?",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-13T22:12:00+02:00"
  },
  {
    id: "R-41415",
    receivedAt: "2026-07-14T07:43:00+01:00",
    tenant: "pale.harbour",
    channel: "form",
    subject: "Invite came on the wrong day",
    body: "The calendar invite for 9 January landed on 1 September. Nobody here touched it.",
    meta: {
      browserLocale: "pt-PT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-14T12:44:00+02:00"
  },
  {
    id: "R-41416",
    receivedAt: "2026-07-14T09:29:00+01:00",
    tenant: "pale.harbour",
    channel: "form",
    subject: "Month and day swapped?",
    body: "The reminder for 1 November arrived for 11 January.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-14T14:01:00+02:00"
  },
  {
    id: "R-41417",
    receivedAt: "2026-07-14T14:21:00+02:00",
    tenant: "ridge.clinic",
    channel: "app",
    subject: "Wrong day on the invite",
    body: "Your software sent my mother to the dentist on the wrong day. She went anyway. They fitted her in. This is not a complaint about the dentist.",
    meta: {
      browserLocale: "da-DK",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-14T15:49:00+02:00"
  },
  {
    id: "R-41418",
    receivedAt: "2026-07-14T17:03:00+02:00",
    tenant: "alder.physio",
    channel: "form",
    subject: "Dates mixed up",
    body: "The reminder for 1 December arrived for 12 January.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-14T21:39:00+02:00"
  },
  {
    id: "R-41419",
    receivedAt: "2026-07-15T17:57:00+02:00",
    tenant: "alder.physio",
    channel: "email",
    subject: "Appointment moved by itself",
    body: "Booked for 9 August. The invite says 8 September.",
    meta: {
      browserLocale: "de-DE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-15T18:38:00+02:00"
  },
  {
    id: "R-41420",
    receivedAt: "2026-07-15T21:14:00+02:00",
    tenant: "copper.studio",
    channel: "email",
    subject: "Month and day swapped?",
    body: "Invite says Monday 9 November. We agreed Friday 11 September. Which one do I trust?",
    meta: {
      browserLocale: "es-ES",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-15T21:37:00+02:00"
  },
  {
    id: "R-41421",
    receivedAt: "2026-07-15T22:49:00+02:00",
    tenant: "alder.physio",
    channel: "app",
    subject: "Booking on the wrong date",
    body: "My client came on 7 August instead of 8 July. We sorted it out.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-15T23:24:00+02:00"
  },
  {
    id: "R-41422",
    receivedAt: "2026-07-16T09:20:00+02:00",
    tenant: "kettle.books",
    channel: "app",
    subject: "Date is wrong",
    body: "Invite says Wednesday 6 May. We agreed Friday 5 June. Which one do I trust?",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-16T11:45:00+02:00"
  },
  {
    id: "R-41423",
    receivedAt: "2026-07-16T12:00:00+02:00",
    tenant: "nine.lanterns",
    channel: "app",
    subject: "Wrong day on the invite",
    body: "We had two people show up on 10 August. They were booked for 8 October.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-16T16:33:00+02:00"
  },
  {
    id: "R-41424",
    receivedAt: "2026-07-16T20:03:00+02:00",
    tenant: "alder.physio",
    channel: "app",
    subject: "Booking on the wrong date",
    body: "Customer booked 4 August and got an invite for 8 April. Please look at this.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-17T00:53:00+02:00"
  },
  {
    id: "R-41425",
    receivedAt: "2026-07-16T22:17:00+02:00",
    tenant: "lantern.row",
    channel: "email",
    subject: "Dates mixed up",
    body: "Invite says Thursday 8 January. We agreed Saturday 1 August. Which one do I trust?",
    meta: {
      browserLocale: "cs-CZ",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-16T23:53:00+02:00"
  },
  {
    id: "R-41427",
    receivedAt: "2026-07-18T18:09:00+02:00",
    tenant: "lantern.row",
    channel: "email",
    subject: "Calendar invite is wrong",
    body: "We had two people show up on 7 October. They were booked for 10 July.",
    meta: {
      browserLocale: "cs-CZ",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-18T22:18:00+02:00"
  },
  {
    id: "R-41428",
    receivedAt: "2026-07-19T08:01:00+02:00",
    tenant: "copper.studio",
    channel: "form",
    subject: "Client turned up on the wrong day",
    body: "My client came on 6 July instead of 7 June. We sorted it out.",
    meta: {
      browserLocale: "es-ES",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-19T11:13:00+02:00"
  },
  {
    id: "R-41429",
    receivedAt: "2026-07-19T15:45:00+02:00",
    tenant: "alder.physio",
    channel: "app",
    subject: "Appointment moved by itself",
    body: "Booked for 5 December. The invite says 12 May.",
    meta: {
      browserLocale: "de-DE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-19T19:24:00+02:00"
  },
  {
    id: "R-41430",
    receivedAt: "2026-07-19T22:06:00+02:00",
    tenant: "lantern.row",
    channel: "app",
    subject: "Reminder went out on the wrong day",
    body: "Tuesday 1 September showed as Friday 9 January. I moved it myself.",
    meta: {
      browserLocale: "cs-CZ",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-19T22:42:00+02:00"
  },
  {
    id: "R-41431",
    receivedAt: "2026-07-20T12:27:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Dates mixed up",
    body: "Invite says Friday 10 April. We agreed Sunday 4 October. Which one do I trust?",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-20T15:43:00+02:00"
  },
  {
    id: "R-41432",
    receivedAt: "2026-07-20T15:14:00+02:00",
    tenant: "lantern.row",
    channel: "app",
    subject: "Booking on the wrong date",
    body: "Monday 12 January showed as Tuesday 1 December. I moved it myself.",
    meta: {
      browserLocale: "cs-CZ",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-20T16:02:00+02:00"
  },
  {
    id: "R-41433",
    receivedAt: "2026-07-21T13:32:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: "Customer booked 12 July and got an invite for 7 December. Please look at this.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-21T15:19:00+02:00"
  },
  {
    id: "R-41434",
    receivedAt: "2026-07-21T18:41:00+02:00",
    tenant: "nine.lanterns",
    channel: "email",
    subject: "Invite came on the wrong day",
    body: "The reminder for 1 October arrived for 10 January.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-21T21:10:00+02:00"
  },
  {
    id: "R-41435",
    receivedAt: "2026-07-21T19:00:00+01:00",
    tenant: "harbour.dental",
    channel: "email",
    subject: "Booking on the wrong date",
    body: "Customer booked 7 October and got an invite for 10 July. Please look at this.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-22T00:47:00+02:00"
  },
  {
    id: "R-41436",
    receivedAt: "2026-07-21T21:40:00+02:00",
    tenant: "morrow.tax",
    channel: "app",
    subject: "Wrong date again",
    body: "Customer booked 2 January and got an invite for 1 February. Please look at this.",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-22T00:01:00+02:00"
  },
  {
    id: "R-41437",
    receivedAt: "2026-07-22T07:02:00+01:00",
    tenant: "stone.and.sons",
    channel: "app",
    subject: "Booking on the wrong date",
    body: "Wednesday 4 March showed as Friday 3 April. I moved it myself.",
    meta: {
      browserLocale: "en-IE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-22T10:59:00+02:00"
  },
  {
    id: "R-41438",
    receivedAt: "2026-07-22T11:54:00+02:00",
    tenant: "kettle.books",
    channel: "email",
    subject: "Wrong day on the invite",
    body: "Wednesday 3 June showed as Friday 6 March. I moved it myself.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-22T16:24:00+02:00"
  },
  {
    id: "R-41439",
    receivedAt: "2026-07-22T14:51:00+02:00",
    tenant: "alder.physio",
    channel: "form",
    subject: "Date is wrong",
    body: "Booked for 3 January. The invite says 1 March.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-22T15:38:00+02:00"
  },
  {
    id: "R-41440",
    receivedAt: "2026-07-23T16:06:00+02:00",
    tenant: "morrow.tax",
    channel: "email",
    subject: "Reminder went out on the wrong day",
    body: "Booked for 1 November. The invite says 11 January.",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-23T18:10:00+02:00"
  },
  {
    id: "R-41441",
    receivedAt: "2026-07-23T15:17:00+01:00",
    tenant: "pale.harbour",
    channel: "form",
    subject: "Dates mixed up",
    body: "The reminder for 6 April arrived for 4 June.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-23T17:49:00+02:00"
  },
  {
    id: "R-41442",
    receivedAt: "2026-07-24T10:15:00+02:00",
    tenant: "morrow.tax",
    channel: "email",
    subject: "Month and day swapped?",
    body: "Every booking we make shows the wrong day. 4 June is now 6 April.",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-24T11:20:00+02:00"
  },
  {
    id: "R-41443",
    receivedAt: "2026-07-24T12:28:00+02:00",
    tenant: "nine.lanterns",
    channel: "app",
    subject: "Wrong date again",
    body: "Second time this month: 10 May turned into 5 October.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-24T16:23:00+02:00"
  },
  {
    id: "R-41444",
    receivedAt: "2026-07-25T21:59:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Reminder went out on the wrong day",
    body: "Customer booked 2 May and got an invite for 5 February. Please look at this.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-26T00:11:00+02:00"
  },
  {
    id: "R-41445",
    receivedAt: "2026-07-26T09:05:00+02:00",
    tenant: "lantern.row",
    channel: "email",
    subject: "Reminder went out on the wrong day",
    body: "Second time this month: 10 March turned into 3 October.",
    meta: {
      browserLocale: "cs-CZ",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-26T10:34:00+02:00"
  },
  {
    id: "R-41446",
    receivedAt: "2026-07-27T18:22:00+02:00",
    tenant: "copper.studio",
    channel: "app",
    subject: "Wrong day on the invite",
    body: "We had two people show up on 6 May. They were booked for 5 June.",
    meta: {
      browserLocale: "es-ES",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-27T20:30:00+02:00"
  },
  {
    id: "R-41447",
    receivedAt: "2026-07-27T21:45:00+02:00",
    tenant: "nine.lanterns",
    channel: "app",
    subject: "Calendar invite is wrong",
    body: "My client came on 6 February instead of 2 June. We sorted it out.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-27T22:50:00+02:00"
  },
  {
    id: "R-41448",
    receivedAt: "2026-07-28T09:48:00+02:00",
    tenant: "nine.lanterns",
    channel: "email",
    subject: "Date is wrong",
    body: "Tuesday 4 August showed as Wednesday 8 April. I moved it myself.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-28T12:42:00+02:00"
  },
  {
    id: "R-41449",
    receivedAt: "2026-07-29T17:47:00+02:00",
    tenant: "alder.physio",
    channel: "form",
    subject: "Wrong day on the invite",
    body: "Thursday 8 January showed as Saturday 1 August. I moved it myself.",
    meta: {
      browserLocale: "de-DE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-29T22:38:00+02:00"
  },
  {
    id: "R-41450",
    receivedAt: "2026-07-29T20:22:00+02:00",
    tenant: "kettle.books",
    channel: "app",
    subject: "Client turned up on the wrong day",
    body: "Sunday 5 April showed as Monday 4 May. I moved it myself.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-30T01:08:00+02:00"
  },
  {
    id: "R-41451",
    receivedAt: "2026-07-30T11:32:00+02:00",
    tenant: "ridge.clinic",
    channel: "email",
    subject: "Date is wrong",
    body: "We had two people show up on 6 August. They were booked for 8 June.",
    meta: {
      browserLocale: "da-DK",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-30T14:50:00+02:00"
  },
  {
    id: "R-41452",
    receivedAt: "2026-07-30T11:48:00+02:00",
    tenant: "kettle.books",
    channel: "email",
    subject: "Date is wrong",
    body: "We had two people show up on 2 October. They were booked for 10 February.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-30T14:34:00+02:00"
  },
  {
    id: "R-41453",
    receivedAt: "2026-07-30T15:44:00+02:00",
    tenant: "copper.studio",
    channel: "form",
    subject: "Calendar invite is wrong",
    body: "Booked for 10 February. The invite says 2 October.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-30T19:05:00+02:00"
  },
  {
    id: "R-41454",
    receivedAt: "2026-07-31T16:31:00+02:00",
    tenant: "lantern.row",
    channel: "app",
    subject: "Wrong day on the invite",
    body: "The calendar invite for 10 June landed on 6 October. Nobody here touched it.",
    meta: {
      browserLocale: "cs-CZ",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-31T20:19:00+02:00"
  },
  {
    id: "R-41455",
    receivedAt: "2026-07-31T17:03:00+02:00",
    tenant: "kettle.books",
    channel: "email",
    subject: "Booking shows a different day",
    body: "My client came on 5 September instead of 9 May. We sorted it out.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-31T21:06:00+02:00"
  },
  {
    id: "R-41454",
    receivedAt: "2026-07-31T16:31:00+02:00",
    tenant: "lantern.row",
    channel: "app",
    subject: "Wrong day on the invite",
    body: "The calendar invite for 10 June landed on 6 October. Nobody here touched it.",
    meta: {
      browserLocale: "cs-CZ",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-31T20:19:00+02:00"
  },
  {
    id: "R-41455",
    receivedAt: "2026-07-31T17:03:00+02:00",
    tenant: "kettle.books",
    channel: "email",
    subject: "Booking shows a different day",
    body: "My client came on 5 September instead of 9 May. We sorted it out.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-31T21:06:00+02:00"
  },
  {
    id: "R-41456",
    receivedAt: "2026-07-31T17:35:00+02:00",
    tenant: "alder.physio",
    channel: "form",
    subject: "Invite came on the wrong day",
    body: "My client came on 6 January instead of 1 June. We sorted it out.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-31T21:49:00+02:00"
  },
  {
    id: "R-41457",
    receivedAt: "2026-07-31T19:10:00+02:00",
    tenant: "morrow.tax",
    channel: "app",
    subject: "Appointment moved by itself",
    body: "Customer booked 6 February and got an invite for 2 June. Please look at this.",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-07-31T20:30:00+02:00"
  },
  {
    id: "R-41458",
    receivedAt: "2026-08-01T08:35:00+02:00",
    tenant: "morrow.tax",
    channel: "app",
    subject: "Reminder went out on the wrong day",
    body: "Customer booked 2 September and got an invite for 9 February. Please look at this.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-01T11:44:00+02:00"
  },
  {
    id: "R-41459",
    receivedAt: "2026-08-01T09:27:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Booking on the wrong date",
    body: "Second time this month: 9 June turned into 6 September.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-01T11:21:00+02:00"
  },
  {
    id: "R-41460",
    receivedAt: "2026-08-01T13:05:00+01:00",
    tenant: "pale.harbour",
    channel: "form",
    subject: "Month and day swapped?",
    body: "Second time this month: 5 July turned into 7 May.",
    meta: {
      browserLocale: "pt-PT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-01T15:09:00+02:00"
  },
  {
    id: "R-41461",
    receivedAt: "2026-08-01T16:27:00+02:00",
    tenant: "long.table",
    channel: "email",
    subject: "Wrong day on the invite",
    body: "We had two people show up on 5 March. They were booked for 3 May.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-01T18:12:00+02:00"
  },
  {
    id: "R-41462",
    receivedAt: "2026-08-01T16:35:00+01:00",
    tenant: "harbour.dental",
    channel: "email",
    subject: "Wrong date again",
    body: "Every booking we make shows the wrong day. 8 April is now 4 August.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-01T21:29:00+02:00"
  },
  {
    id: "R-41463",
    receivedAt: "2026-08-02T07:37:00+01:00",
    tenant: "stone.and.sons",
    channel: "app",
    subject: "Wrong date again",
    body: "Second time this month: 5 October turned into 10 May.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-02T11:04:00+02:00"
  },
  {
    id: "R-41464",
    receivedAt: "2026-08-02T14:27:00+02:00",
    tenant: "morrow.tax",
    channel: "app",
    subject: "Date is wrong",
    body: "Invite says Friday 4 December. We agreed Sunday 12 April. Which one do I trust?",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-02T19:08:00+02:00"
  },
  {
    id: "R-41465",
    receivedAt: "2026-08-04T07:55:00+01:00",
    tenant: "pale.harbour",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: "The calendar invite for 10 August landed on 8 October. Nobody here touched it.",
    meta: {
      browserLocale: "pt-PT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-04T09:39:00+02:00"
  },
  {
    id: "R-41466",
    receivedAt: "2026-08-04T22:44:00+02:00",
    tenant: "lantern.row",
    channel: "app",
    subject: "Booking on the wrong date",
    body: "We had two people show up on 9 November. They were booked for 11 September.",
    meta: {
      browserLocale: "cs-CZ",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-05T01:00:00+02:00"
  },
  {
    id: "R-41467",
    receivedAt: "2026-08-05T14:32:00+02:00",
    tenant: "kettle.books",
    channel: "form",
    subject: "Month and day swapped?",
    body: "Saturday 10 January showed as Thursday 1 October. I moved it myself.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-05T15:41:00+02:00"
  },
  {
    id: "R-41468",
    receivedAt: "2026-08-05T14:53:00+02:00",
    tenant: "nine.lanterns",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: "Booked for 6 May. The invite says 5 June.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-05T18:30:00+02:00"
  },
  {
    id: "R-41469",
    receivedAt: "2026-08-05T13:59:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Wrong date again",
    body: "The reminder for 1 August arrived for 8 January.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-05T18:37:00+02:00"
  },
  {
    id: "R-41470",
    receivedAt: "2026-08-06T11:37:00+01:00",
    tenant: "stone.and.sons",
    channel: "email",
    subject: "Wrong day on the invite",
    body: "The calendar invite for 10 December landed on 12 October. Nobody here touched it.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-06T15:35:00+02:00"
  },
  {
    id: "R-41471",
    receivedAt: "2026-08-06T18:29:00+01:00",
    tenant: "pale.harbour",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: "Second time this month: 11 January turned into 1 November.",
    meta: {
      browserLocale: "pt-PT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-06T20:29:00+02:00"
  },
  {
    id: "R-41472",
    receivedAt: "2026-08-09T20:37:00+02:00",
    tenant: "alder.physio",
    channel: "form",
    subject: "Wrong day on the invite",
    body: "Tuesday 9 June showed as Sunday 6 September. I moved it myself.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-09T23:31:00+02:00"
  },
  {
    id: "R-41473",
    receivedAt: "2026-08-10T15:27:00+02:00",
    tenant: "nine.lanterns",
    channel: "email",
    subject: "Date is wrong",
    body: "Wednesday 1 July showed as Wednesday 7 January. I moved it myself.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-10T20:20:00+02:00"
  },
  {
    id: "R-41474",
    receivedAt: "2026-08-11T11:28:00+02:00",
    tenant: "nine.lanterns",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: "The calendar invite for 4 January landed on 1 April. Nobody here touched it.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-11T16:09:00+02:00"
  },
  {
    id: "R-41475",
    receivedAt: "2026-08-11T19:53:00+02:00",
    tenant: "morrow.tax",
    channel: "app",
    subject: "Reminder went out on the wrong day",
    body: "Booked for 2 July. The invite says 7 February.",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-11T23:22:00+02:00"
  },
  {
    id: "R-41476",
    receivedAt: "2026-08-12T09:16:00+02:00",
    tenant: "nine.lanterns",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: "Booked for 2 March. The invite says 3 February.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-12T12:12:00+02:00"
  },
  {
    id: "R-41477",
    receivedAt: "2026-08-12T22:58:00+02:00",
    tenant: "kettle.books",
    channel: "email",
    subject: "Booking on the wrong date",
    body: "Every booking we make shows the wrong day. 10 June is now 6 October.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-12T23:38:00+02:00"
  },
  {
    id: "R-41478",
    receivedAt: "2026-08-13T09:09:00+01:00",
    tenant: "harbour.dental",
    channel: "email",
    subject: "Invite came on the wrong day",
    body: "We had two people show up on 3 June. They were booked for 6 March.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-13T13:41:00+02:00"
  },
  {
    id: "R-41479",
    receivedAt: "2026-08-14T09:32:00+02:00",
    tenant: "long.table",
    channel: "app",
    subject: "Calendar invite is wrong",
    body: "Invite says Thursday 10 September. We agreed Friday 9 October. Which one do I trust?",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-14T14:25:00+02:00"
  },
  {
    id: "R-41480",
    receivedAt: "2026-08-14T14:24:00+02:00",
    tenant: "long.table",
    channel: "app",
    subject: "Client turned up on the wrong day",
    body: "Monday 8 June showed as Thursday 6 August. I moved it myself.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-14T15:01:00+02:00"
  },
  {
    id: "R-41481",
    receivedAt: "2026-08-14T15:28:00+02:00",
    tenant: "morrow.tax",
    channel: "email",
    subject: "Booking shows a different day",
    body: "We had two people show up on 12 January. They were booked for 1 December.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-14T20:20:00+02:00"
  },
  {
    id: "R-41482",
    receivedAt: "2026-08-14T14:59:00+01:00",
    tenant: "pale.harbour",
    channel: "email",
    subject: "Booking on the wrong date",
    body: "The reminder for 1 November arrived for 11 January.",
    meta: {
      browserLocale: "pt-PT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-14T18:56:00+02:00"
  },
  {
    id: "R-41483",
    receivedAt: "2026-08-14T17:27:00+02:00",
    tenant: "lantern.row",
    channel: "app",
    subject: "Booking on the wrong date",
    body: "The reminder for 2 May arrived for 5 February.",
    meta: {
      browserLocale: "cs-CZ",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-14T20:25:00+02:00"
  },
  {
    id: "R-41484",
    receivedAt: "2026-08-14T17:28:00+02:00",
    tenant: "long.table",
    channel: "app",
    subject: "Appointment moved by itself",
    body: "Thursday 8 January showed as Saturday 1 August. I moved it myself.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-14T20:17:00+02:00"
  },
  {
    id: "R-41485",
    receivedAt: "2026-08-14T21:55:00+02:00",
    tenant: "alder.physio",
    channel: "form",
    subject: "Client turned up on the wrong day",
    body: "The reminder for 4 November arrived for 11 April.",
    meta: {
      browserLocale: "de-DE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-14T22:20:00+02:00"
  },
  {
    id: "R-41486",
    receivedAt: "2026-08-15T09:19:00+02:00",
    tenant: "kettle.books",
    channel: "app",
    subject: "Month and day swapped?",
    body: "Customer booked 5 December and got an invite for 12 May. Please look at this.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-15T10:14:00+02:00"
  },
  {
    id: "R-41487",
    receivedAt: "2026-08-15T14:00:00+02:00",
    tenant: "nine.lanterns",
    channel: "email",
    subject: "Wrong day on the invite",
    body: "The reminder for 10 September arrived for 9 October.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-15T15:55:00+02:00"
  },
  {
    id: "R-41488",
    receivedAt: "2026-08-17T16:50:00+02:00",
    tenant: "kettle.books",
    channel: "app",
    subject: "Client turned up on the wrong day",
    body: "Monday 6 July showed as Sunday 7 June. I moved it myself.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-17T21:49:00+02:00"
  },
  {
    id: "R-41489",
    receivedAt: "2026-08-18T09:32:00+02:00",
    tenant: "kettle.books",
    channel: "app",
    subject: "Wrong day on the invite",
    body: "The reminder for 5 April arrived for 4 May.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-18T13:37:00+02:00"
  },
  {
    id: "R-41490",
    receivedAt: "2026-08-18T10:36:00+02:00",
    tenant: "ridge.clinic",
    channel: "app",
    subject: "Dates mixed up",
    body: "We had two people show up on 6 February. They were booked for 2 June.",
    meta: {
      browserLocale: "da-DK",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-18T12:17:00+02:00"
  },
  {
    id: "R-41491",
    receivedAt: "2026-08-18T17:53:00+02:00",
    tenant: "ridge.clinic",
    channel: "app",
    subject: "Wrong date again",
    body: "Booked for 12 October. The invite says 10 December.",
    meta: {
      browserLocale: "da-DK",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-18T18:22:00+02:00"
  },
  {
    id: "R-41492",
    receivedAt: "2026-08-19T12:08:00+02:00",
    tenant: "lantern.row",
    channel: "email",
    subject: "Wrong day on the invite",
    body: "Second time this month: 12 November turned into 11 December.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-19T16:11:00+02:00"
  },
  {
    id: "R-41493",
    receivedAt: "2026-08-19T11:18:00+01:00",
    tenant: "pale.harbour",
    channel: "form",
    subject: "Dates mixed up",
    body: "The reminder for 2 July arrived for 7 February.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-19T17:16:00+02:00"
  },
  {
    id: "R-41494",
    receivedAt: "2026-08-19T16:11:00+02:00",
    tenant: "alder.physio",
    channel: "app",
    subject: "Client turned up on the wrong day",
    body: "Customer booked 3 November and got an invite for 11 March. Please look at this.",
    meta: {
      browserLocale: "de-DE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-19T18:42:00+02:00"
  },
  {
    id: "R-41495",
    receivedAt: "2026-08-19T15:12:00+01:00",
    tenant: "stone.and.sons",
    channel: "app",
    subject: "Booking on the wrong date",
    body: "Invite says Tuesday 10 February. We agreed Friday 2 October. Which one do I trust?",
    meta: {
      browserLocale: "en-IE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-19T19:04:00+02:00"
  },
  {
    id: "R-41496",
    receivedAt: "2026-08-19T18:17:00+02:00",
    tenant: "nine.lanterns",
    channel: "email",
    subject: "Invite came on the wrong day",
    body: "Booked for 11 February. The invite says 2 November.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-19T19:47:00+02:00"
  },
  {
    id: "R-41497",
    receivedAt: "2026-08-19T22:37:00+02:00",
    tenant: "morrow.tax",
    channel: "app",
    subject: "Date is wrong",
    body: "Second time this month: 12 November turned into 11 December.",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-20T02:54:00+02:00"
  },
  {
    id: "R-41498",
    receivedAt: "2026-08-20T14:10:00+02:00",
    tenant: "long.table",
    channel: "app",
    subject: "Calendar invite is wrong",
    body: "Second time this month: 9 August turned into 8 September.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-20T16:29:00+02:00"
  },
  {
    id: "R-41499",
    receivedAt: "2026-08-20T16:53:00+02:00",
    tenant: "lantern.row",
    channel: "app",
    subject: "Calendar invite is wrong",
    body: "Second time this month: 3 June turned into 6 March.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-20T17:33:00+02:00"
  },
  {
    id: "R-41500",
    receivedAt: "2026-08-20T22:53:00+02:00",
    tenant: "kettle.books",
    channel: "email",
    subject: "Wrong day on the invite",
    body: "Second time this month: 6 February turned into 2 June.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-20T23:41:00+02:00"
  },
  {
    id: "R-41501",
    receivedAt: "2026-08-21T08:13:00+02:00",
    tenant: "morrow.tax",
    channel: "email",
    subject: "Date is wrong",
    body: "Invite says Monday 7 September. We agreed Thursday 9 July. Which one do I trust?",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-21T11:55:00+02:00"
  },
  {
    id: "R-41502",
    receivedAt: "2026-08-21T09:49:00+02:00",
    tenant: "kettle.books",
    channel: "email",
    subject: "Calendar invite is wrong",
    body: "Thursday 5 March showed as Sunday 3 May. I moved it myself.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-21T09:59:00+02:00"
  },
  {
    id: "R-41503",
    receivedAt: "2026-08-21T17:09:00+02:00",
    tenant: "copper.studio",
    channel: "app",
    subject: "Reminder went out on the wrong day",
    body: "My client came on 1 February instead of 2 January. We sorted it out.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-21T18:38:00+02:00"
  },
  {
    id: "R-41504",
    receivedAt: "2026-08-21T19:24:00+02:00",
    tenant: "morrow.tax",
    channel: "app",
    subject: "Client turned up on the wrong day",
    body: "Customer booked 9 November and got an invite for 11 September. Please look at this.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-21T20:13:00+02:00"
  },
  {
    id: "R-41505",
    receivedAt: "2026-08-22T12:08:00+02:00",
    tenant: "morrow.tax",
    channel: "email",
    subject: "Appointment moved by itself",
    body: "Customer booked 9 June and got an invite for 6 September. Please look at this.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-22T13:25:00+02:00"
  },
  {
    id: "R-41504",
    receivedAt: "2026-08-21T19:24:00+02:00",
    tenant: "morrow.tax",
    channel: "app",
    subject: "Client turned up on the wrong day",
    body: "Customer booked 9 November and got an invite for 11 September. Please look at this.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-21T20:13:00+02:00"
  },
  {
    id: "R-41505",
    receivedAt: "2026-08-22T12:08:00+02:00",
    tenant: "morrow.tax",
    channel: "email",
    subject: "Appointment moved by itself",
    body: "Customer booked 9 June and got an invite for 6 September. Please look at this.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-22T13:25:00+02:00"
  },
  {
    id: "R-41506",
    receivedAt: "2026-08-22T14:21:00+02:00",
    tenant: "alder.physio",
    channel: "app",
    subject: "Calendar invite is wrong",
    body: "Invite says Friday 8 May. We agreed Wednesday 5 August. Which one do I trust?",
    meta: {
      browserLocale: "de-DE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-22T15:30:00+02:00"
  },
  {
    id: "R-41508",
    receivedAt: "2026-08-22T18:19:00+01:00",
    tenant: "stone.and.sons",
    channel: "app",
    subject: "Appointment moved by itself",
    body: "Booked for 12 July. The invite says 7 December.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-22T23:00:00+02:00"
  },
  {
    id: "R-41509",
    receivedAt: "2026-08-24T15:09:00+02:00",
    tenant: "morrow.tax",
    channel: "app",
    subject: "Booking shows a different day",
    body: "Sunday 7 June showed as Monday 6 July. I moved it myself.",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-24T15:25:00+02:00"
  },
  {
    id: "R-41510",
    receivedAt: "2026-08-24T20:19:00+02:00",
    tenant: "lantern.row",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: "Customer booked 12 March and got an invite for 3 December. Please look at this.",
    meta: {
      browserLocale: "cs-CZ",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-24T21:54:00+02:00"
  },
  {
    id: "R-41511",
    receivedAt: "2026-08-26T14:32:00+02:00",
    tenant: "long.table",
    channel: "email",
    subject: "Client turned up on the wrong day",
    body: "Every booking we make shows the wrong day. 5 October is now 10 May.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-26T18:54:00+02:00"
  },
  {
    id: "R-41512",
    receivedAt: "2026-08-26T21:51:00+02:00",
    tenant: "alder.physio",
    channel: "app",
    subject: "Reminder went out on the wrong day",
    body: "Monday 8 June showed as Thursday 6 August. I moved it myself.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-27T00:32:00+02:00"
  },
  {
    id: "R-41513",
    receivedAt: "2026-08-26T22:28:00+02:00",
    tenant: "kettle.books",
    channel: "form",
    subject: "Month and day swapped?",
    body: "Second time this month: 2 September turned into 9 February.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-27T00:01:00+02:00"
  },
  {
    id: "R-41514",
    receivedAt: "2026-08-27T17:35:00+02:00",
    tenant: "copper.studio",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: 'I have started telling clients the date in words. "The second Tuesday." It works. Your product is now a phone call.',
    meta: {
      browserLocale: "es-ES",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-27T19:49:00+02:00"
  },
  {
    id: "R-41515",
    receivedAt: "2026-08-27T20:34:00+01:00",
    tenant: "stone.and.sons",
    channel: "email",
    subject: "Wrong day on the invite",
    body: "Booked for 6 April. The invite says 4 June.",
    meta: {
      browserLocale: "en-IE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-28T02:32:00+02:00"
  },
  {
    id: "R-41516",
    receivedAt: "2026-08-28T07:30:00+01:00",
    tenant: "stone.and.sons",
    channel: "email",
    subject: "Invite came on the wrong day",
    body: "My client came on 7 December instead of 12 July. We sorted it out.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-28T08:56:00+02:00"
  },
  {
    id: "R-41517",
    receivedAt: "2026-08-29T09:25:00+02:00",
    tenant: "lantern.row",
    channel: "email",
    subject: "Booking on the wrong date",
    body: "Customer booked 10 September and got an invite for 9 October. Please look at this.",
    meta: {
      browserLocale: "cs-CZ",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-29T14:20:00+02:00"
  },
  {
    id: "R-41518",
    receivedAt: "2026-08-29T18:47:00+02:00",
    tenant: "lantern.row",
    channel: "app",
    subject: "Wrong date again",
    body: "My client came on 7 November instead of 11 July. We sorted it out.",
    meta: {
      browserLocale: "cs-CZ",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-29T21:45:00+02:00"
  },
  {
    id: "R-41519",
    receivedAt: "2026-08-29T19:02:00+02:00",
    tenant: "nine.lanterns",
    channel: "form",
    subject: "Booking on the wrong date",
    body: "Invite says Friday 3 April. We agreed Wednesday 4 March. Which one do I trust?",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-29T23:24:00+02:00"
  },
  {
    id: "R-41520",
    receivedAt: "2026-08-29T19:09:00+01:00",
    tenant: "stone.and.sons",
    channel: "email",
    subject: "Appointment moved by itself",
    body: "The calendar invite for 7 November landed on 11 July. Nobody here touched it.",
    meta: {
      browserLocale: "en-IE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-30T00:14:00+02:00"
  },
  {
    id: "R-41521",
    receivedAt: "2026-08-30T11:29:00+02:00",
    tenant: "kettle.books",
    channel: "email",
    subject: "Dates mixed up",
    body: "Customer booked 7 May and got an invite for 5 July. Please look at this.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-30T15:39:00+02:00"
  },
  {
    id: "R-41522",
    receivedAt: "2026-08-30T14:29:00+02:00",
    tenant: "kettle.books",
    channel: "app",
    subject: "Reminder went out on the wrong day",
    body: "Customer booked 7 December and got an invite for 12 July. Please look at this.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-30T17:41:00+02:00"
  },
  {
    id: "R-41523",
    receivedAt: "2026-08-31T11:17:00+02:00",
    tenant: "long.table",
    channel: "email",
    subject: "Wrong day on the invite",
    body: "My client came on 11 July instead of 7 November. We sorted it out.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-31T16:08:00+02:00"
  },
  {
    id: "R-41524",
    receivedAt: "2026-08-31T13:30:00+02:00",
    tenant: "copper.studio",
    channel: "app",
    subject: "Booking shows a different day",
    body: "The calendar invite for 11 October landed on 10 November. Nobody here touched it.",
    meta: {
      browserLocale: "es-ES",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-31T16:12:00+02:00"
  },
  {
    id: "R-41525",
    receivedAt: "2026-08-31T19:47:00+02:00",
    tenant: "lantern.row",
    channel: "email",
    subject: "Wrong date again",
    body: "Customer booked 12 January and got an invite for 1 December. Please look at this.",
    meta: {
      browserLocale: "cs-CZ",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-08-31T23:25:00+02:00"
  },
  {
    id: "R-41527",
    receivedAt: "2026-08-31T22:57:00+02:00",
    tenant: "long.table",
    channel: "app",
    subject: "Month and day swapped?",
    body: "We had two people show up on 9 October. They were booked for 10 September.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-01T03:49:00+02:00"
  },
  {
    id: "R-41528",
    receivedAt: "2026-09-01T08:30:00+02:00",
    tenant: "long.table",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: "Wednesday 7 January showed as Wednesday 1 July. I moved it myself.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-01T12:36:00+02:00"
  },
  {
    id: "R-41529",
    receivedAt: "2026-09-01T20:06:00+02:00",
    tenant: "ridge.clinic",
    channel: "form",
    subject: "Month and day swapped?",
    body: "Booked for 5 November. The invite says 11 May.",
    meta: {
      browserLocale: "da-DK",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-02T00:10:00+02:00"
  },
  {
    id: "R-41530",
    receivedAt: "2026-09-01T20:56:00+02:00",
    tenant: "kettle.books",
    channel: "app",
    subject: "Wrong date again",
    body: "We had two people show up on 3 July. They were booked for 7 March.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-01T21:53:00+02:00"
  },
  {
    id: "R-41531",
    receivedAt: "2026-09-02T09:34:00+02:00",
    tenant: "morrow.tax",
    channel: "app",
    subject: "Date is wrong",
    body: "Customer booked 3 August and got an invite for 8 March. Please look at this.",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-02T12:37:00+02:00"
  },
  {
    id: "R-41532",
    receivedAt: "2026-09-02T09:00:00+01:00",
    tenant: "pale.harbour",
    channel: "email",
    subject: "Month and day swapped?",
    body: "Booked for 5 August. The invite says 8 May.",
    meta: {
      browserLocale: "pt-PT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-02T13:04:00+02:00"
  },
  {
    id: "R-41533",
    receivedAt: "2026-09-03T12:19:00+02:00",
    tenant: "nine.lanterns",
    channel: "app",
    subject: "Calendar invite is wrong",
    body: "The calendar invite for 10 September landed on 9 October. Nobody here touched it.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-03T14:39:00+02:00"
  },
  {
    id: "R-41534",
    receivedAt: "2026-09-03T19:14:00+02:00",
    tenant: "nine.lanterns",
    channel: "email",
    subject: "Invite came on the wrong day",
    body: "Saturday 5 December showed as Tuesday 12 May. I moved it myself.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-03T20:42:00+02:00"
  },
  {
    id: "R-41535",
    receivedAt: "2026-09-03T20:34:00+01:00",
    tenant: "stone.and.sons",
    channel: "app",
    subject: "Month and day swapped?",
    body: "Booked for 5 August. The invite says 8 May.",
    meta: {
      browserLocale: "en-IE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-03T21:45:00+02:00"
  },
  {
    id: "R-41536",
    receivedAt: "2026-09-04T13:31:00+02:00",
    tenant: "kettle.books",
    channel: "app",
    subject: "Client turned up on the wrong day",
    body: "The reminder for 5 December arrived for 12 May.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-04T16:10:00+02:00"
  },
  {
    id: "R-41537",
    receivedAt: "2026-09-04T14:11:00+02:00",
    tenant: "long.table",
    channel: "app",
    subject: "Date is wrong",
    body: "Saturday 10 January showed as Thursday 1 October. I moved it myself.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-04T15:08:00+02:00"
  },
  {
    id: "R-41538",
    receivedAt: "2026-09-04T16:25:00+02:00",
    tenant: "long.table",
    channel: "app",
    subject: "Dates mixed up",
    body: "Invite says Wednesday 4 February. We agreed Thursday 2 April. Which one do I trust?",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-04T19:14:00+02:00"
  },
  {
    id: "R-41539",
    receivedAt: "2026-09-04T16:31:00+02:00",
    tenant: "copper.studio",
    channel: "form",
    subject: "Reminder went out on the wrong day",
    body: "The reminder for 2 March arrived for 3 February.",
    meta: {
      browserLocale: "es-ES",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-04T19:44:00+02:00"
  },
  {
    id: "R-41540",
    receivedAt: "2026-09-05T13:58:00+02:00",
    tenant: "kettle.books",
    channel: "email",
    subject: "Month and day swapped?",
    body: "Invite says Tuesday 2 June. We agreed Friday 6 February. Which one do I trust?",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-05T15:57:00+02:00"
  },
  {
    id: "R-41541",
    receivedAt: "2026-09-06T10:14:00+02:00",
    tenant: "kettle.books",
    channel: "app",
    subject: "Reminder went out on the wrong day",
    body: "My client came on 10 January instead of 1 October. We sorted it out.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-06T12:15:00+02:00"
  },
  {
    id: "R-41542",
    receivedAt: "2026-09-06T14:06:00+02:00",
    tenant: "ridge.clinic",
    channel: "form",
    subject: "Invite came on the wrong day",
    body: "The reminder for 11 May arrived for 5 November.",
    meta: {
      browserLocale: "da-DK",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-06T15:36:00+02:00"
  },
  {
    id: "R-41543",
    receivedAt: "2026-09-06T15:04:00+02:00",
    tenant: "alder.physio",
    channel: "app",
    subject: "Calendar invite is wrong",
    body: "Second time this month: 1 February turned into 2 January.",
    meta: {
      browserLocale: "de-DE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-06T19:17:00+02:00"
  },
  {
    id: "R-41544",
    receivedAt: "2026-09-06T17:10:00+01:00",
    tenant: "harbour.dental",
    channel: "email",
    subject: "Invite came on the wrong day",
    body: "Sunday 10 May showed as Monday 5 October. I moved it myself.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-06T18:43:00+02:00"
  },
  {
    id: "R-41545",
    receivedAt: "2026-09-07T08:06:00+01:00",
    tenant: "pale.harbour",
    channel: "app",
    subject: "Month and day swapped?",
    body: "Wednesday 6 May showed as Friday 5 June. I moved it myself.",
    meta: {
      browserLocale: "pt-PT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-07T11:42:00+02:00"
  },
  {
    id: "R-41546",
    receivedAt: "2026-09-07T09:00:00+01:00",
    tenant: "stone.and.sons",
    channel: "app",
    subject: "Wrong day on the invite",
    body: "The calendar invite for 1 December landed on 12 January. Nobody here touched it.",
    meta: {
      browserLocale: "en-IE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-07T11:35:00+02:00"
  },
  {
    id: "R-41547",
    receivedAt: "2026-09-07T21:27:00+02:00",
    tenant: "long.table",
    channel: "app",
    subject: "Wrong day on the invite",
    body: "Every booking we make shows the wrong day. 8 November is now 11 August.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-08T01:17:00+02:00"
  },
  {
    id: "R-41548",
    receivedAt: "2026-09-08T08:51:00+01:00",
    tenant: "stone.and.sons",
    channel: "app",
    subject: "Appointment moved by itself",
    body: "My client came on 9 December instead of 12 September. We sorted it out.",
    meta: {
      browserLocale: "en-IE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-08T12:33:00+02:00"
  },
  {
    id: "R-41549",
    receivedAt: "2026-09-08T10:00:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: "Friday 3 July showed as Saturday 7 March. I moved it myself.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-08T15:59:00+02:00"
  },
  {
    id: "R-41550",
    receivedAt: "2026-09-08T17:55:00+02:00",
    tenant: "ridge.clinic",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: "Monday 7 September showed as Thursday 9 July. I moved it myself.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-08T22:17:00+02:00"
  },
  {
    id: "R-41551",
    receivedAt: "2026-09-08T18:03:00+02:00",
    tenant: "kettle.books",
    channel: "email",
    subject: "Date is wrong",
    body: "Second time this month: 9 June turned into 6 September.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-08T22:44:00+02:00"
  },
  {
    id: "R-41552",
    receivedAt: "2026-09-09T10:06:00+02:00",
    tenant: "ridge.clinic",
    channel: "email",
    subject: "Invite came on the wrong day",
    body: "We had two people show up on 5 January. They were booked for 1 May.",
    meta: {
      browserLocale: "da-DK",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-09T13:15:00+02:00"
  },
  {
    id: "R-41553",
    receivedAt: "2026-09-09T14:21:00+01:00",
    tenant: "stone.and.sons",
    channel: "app",
    subject: "Appointment moved by itself",
    body: "Booked for 11 February. The invite says 2 November.",
    meta: {
      browserLocale: "en-IE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-09T16:21:00+02:00"
  },
  {
    id: "R-41554",
    receivedAt: "2026-09-09T17:50:00+02:00",
    tenant: "morrow.tax",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: "Customer booked 8 February and got an invite for 2 August. Please look at this.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-09T19:56:00+02:00"
  },
  {
    id: "R-41555",
    receivedAt: "2026-09-10T15:00:00+02:00",
    tenant: "ridge.clinic",
    channel: "app",
    subject: "Date is wrong",
    body: "My client came on 1 November instead of 11 January. We sorted it out.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-10T16:14:00+02:00"
  },
  {
    id: "R-41556",
    receivedAt: "2026-09-10T21:14:00+01:00",
    tenant: "pale.harbour",
    channel: "app",
    subject: "Calendar invite is wrong",
    body: "Invite says Tuesday 10 February. We agreed Friday 2 October. Which one do I trust?",
    meta: {
      browserLocale: "pt-PT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-10T22:39:00+02:00"
  },
  {
    id: "R-41557",
    receivedAt: "2026-09-11T09:38:00+02:00",
    tenant: "morrow.tax",
    channel: "email",
    subject: "Dates mixed up",
    body: "The calendar invite for 4 October landed on 10 April. Nobody here touched it.",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-11T12:37:00+02:00"
  },
  {
    id: "R-41556",
    receivedAt: "2026-09-10T21:14:00+01:00",
    tenant: "pale.harbour",
    channel: "app",
    subject: "Calendar invite is wrong",
    body: "Invite says Tuesday 10 February. We agreed Friday 2 October. Which one do I trust?",
    meta: {
      browserLocale: "pt-PT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-10T22:39:00+02:00"
  },
  {
    id: "R-41557",
    receivedAt: "2026-09-11T09:38:00+02:00",
    tenant: "morrow.tax",
    channel: "email",
    subject: "Dates mixed up",
    body: "The calendar invite for 4 October landed on 10 April. Nobody here touched it.",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-11T12:37:00+02:00"
  },
  {
    id: "R-41558",
    receivedAt: "2026-09-11T13:08:00+02:00",
    tenant: "kettle.books",
    channel: "email",
    subject: "Reminder went out on the wrong day",
    body: "The reminder for 4 June arrived for 6 April.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-11T14:29:00+02:00"
  },
  {
    id: "R-41559",
    receivedAt: "2026-09-11T20:20:00+01:00",
    tenant: "stone.and.sons",
    channel: "email",
    subject: "Wrong day on the invite",
    body: "Invite says Sunday 2 August. We agreed Sunday 8 February. Which one do I trust?",
    meta: {
      browserLocale: "en-IE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-12T01:56:00+02:00"
  },
  {
    id: "R-41560",
    receivedAt: "2026-09-12T18:31:00+02:00",
    tenant: "long.table",
    channel: "app",
    subject: "Reminder went out on the wrong day",
    body: "Second time this month: 10 August turned into 8 October.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-12T19:45:00+02:00"
  },
  {
    id: "R-41561",
    receivedAt: "2026-09-12T20:47:00+02:00",
    tenant: "alder.physio",
    channel: "email",
    subject: "Dates mixed up",
    body: "Customer booked 1 April and got an invite for 4 January. Please look at this.",
    meta: {
      browserLocale: "de-DE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-13T01:44:00+02:00"
  },
  {
    id: "R-41562",
    receivedAt: "2026-09-13T09:32:00+01:00",
    tenant: "stone.and.sons",
    channel: "app",
    subject: "Wrong date again",
    body: "We had two people show up on 9 October. They were booked for 10 September.",
    meta: {
      browserLocale: "en-IE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-13T14:59:00+02:00"
  },
  {
    id: "R-41563",
    receivedAt: "2026-09-13T12:54:00+02:00",
    tenant: "morrow.tax",
    channel: "email",
    subject: "Appointment moved by itself",
    body: "Customer booked 1 September and got an invite for 9 January. Please look at this.",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-13T16:36:00+02:00"
  },
  {
    id: "R-41564",
    receivedAt: "2026-09-13T17:15:00+02:00",
    tenant: "nine.lanterns",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: "Booked for 7 August. The invite says 8 July.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-13T20:36:00+02:00"
  },
  {
    id: "R-41565",
    receivedAt: "2026-09-14T16:40:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Client turned up on the wrong day",
    body: "Booked for 9 March. The invite says 3 September.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-14T20:51:00+02:00"
  },
  {
    id: "R-41566",
    receivedAt: "2026-09-14T17:31:00+01:00",
    tenant: "pale.harbour",
    channel: "app",
    subject: "Date is wrong",
    body: "Second time this month: 7 June turned into 6 July.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-14T19:03:00+02:00"
  },
  {
    id: "R-41567",
    receivedAt: "2026-09-15T15:52:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Wrong day on the invite",
    body: "Thursday 11 June showed as Friday 6 November. I moved it myself.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-15T17:51:00+02:00"
  },
  {
    id: "R-41568",
    receivedAt: "2026-09-15T20:35:00+02:00",
    tenant: "alder.physio",
    channel: "app",
    subject: "Client turned up on the wrong day",
    body: "Booked for 4 December. The invite says 12 April.",
    meta: {
      browserLocale: "de-DE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-15T21:02:00+02:00"
  },
  {
    id: "R-41569",
    receivedAt: "2026-09-16T13:14:00+02:00",
    tenant: "morrow.tax",
    channel: "email",
    subject: "Wrong day on the invite",
    body: "Booked for 10 February. The invite says 2 October.",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-16T16:48:00+02:00"
  },
  {
    id: "R-41570",
    receivedAt: "2026-09-17T12:08:00+02:00",
    tenant: "nine.lanterns",
    channel: "app",
    subject: "Booking on the wrong date",
    body: "Second time this month: 1 June turned into 6 January.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-17T12:56:00+02:00"
  },
  {
    id: "R-41571",
    receivedAt: "2026-09-17T13:08:00+02:00",
    tenant: "ridge.clinic",
    channel: "email",
    subject: "Appointment moved by itself",
    body: "The reminder for 4 November arrived for 11 April.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-17T13:32:00+02:00"
  },
  {
    id: "R-41572",
    receivedAt: "2026-09-17T17:17:00+02:00",
    tenant: "copper.studio",
    channel: "form",
    subject: "Invite came on the wrong day",
    body: "Invite says Sunday 5 July. We agreed Thursday 7 May. Which one do I trust?",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-17T20:38:00+02:00"
  },
  {
    id: "R-41573",
    receivedAt: "2026-09-17T22:45:00+02:00",
    tenant: "morrow.tax",
    channel: "email",
    subject: "Booking on the wrong date",
    body: "The reminder for 3 February arrived for 2 March.",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-18T00:06:00+02:00"
  },
  {
    id: "R-41574",
    receivedAt: "2026-09-18T12:27:00+02:00",
    tenant: "long.table",
    channel: "email",
    subject: "Booking on the wrong date",
    body: "Wednesday 12 August showed as Tuesday 8 December. I moved it myself.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-18T15:54:00+02:00"
  },
  {
    id: "R-41575",
    receivedAt: "2026-09-18T12:46:00+02:00",
    tenant: "nine.lanterns",
    channel: "email",
    subject: "Month and day swapped?",
    body: "Thursday 2 July showed as Saturday 7 February. I moved it myself.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-18T14:41:00+02:00"
  },
  {
    id: "R-41576",
    receivedAt: "2026-09-19T22:35:00+02:00",
    tenant: "kettle.books",
    channel: "email",
    subject: "Dates mixed up",
    body: "Customer booked 12 January and got an invite for 1 December. Please look at this.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-19T23:55:00+02:00"
  },
  {
    id: "R-41577",
    receivedAt: "2026-09-20T10:02:00+02:00",
    tenant: "nine.lanterns",
    channel: "email",
    subject: "Invite came on the wrong day",
    body: "The calendar invite for 8 June landed on 6 August. Nobody here touched it.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-20T11:35:00+02:00"
  },
  {
    id: "R-41578",
    receivedAt: "2026-09-20T19:01:00+02:00",
    tenant: "nine.lanterns",
    channel: "email",
    subject: "Month and day swapped?",
    body: "Invite says Thursday 10 September. We agreed Friday 9 October. Which one do I trust?",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-20T23:38:00+02:00"
  },
  {
    id: "R-41579",
    receivedAt: "2026-09-20T18:49:00+01:00",
    tenant: "pale.harbour",
    channel: "email",
    subject: "Date is wrong",
    body: "The calendar invite for 1 March landed on 3 January. Nobody here touched it.",
    meta: {
      browserLocale: "pt-PT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-20T22:51:00+02:00"
  },
  {
    id: "R-41580",
    receivedAt: "2026-09-21T08:29:00+01:00",
    tenant: "harbour.dental",
    channel: "email",
    subject: "Date is wrong",
    body: "Saturday 5 December showed as Tuesday 12 May. I moved it myself.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-21T14:20:00+02:00"
  },
  {
    id: "R-41581",
    receivedAt: "2026-09-22T12:37:00+02:00",
    tenant: "ridge.clinic",
    channel: "app",
    subject: "Reminder went out on the wrong day",
    body: "My client came on 10 May instead of 5 October. We sorted it out.",
    meta: {
      browserLocale: "da-DK",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-22T15:54:00+02:00"
  },
  {
    id: "R-41582",
    receivedAt: "2026-09-22T17:15:00+01:00",
    tenant: "pale.harbour",
    channel: "form",
    subject: "Calendar invite is wrong",
    body: "The reminder for 7 March arrived for 3 July.",
    meta: {
      browserLocale: "pt-PT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-22T20:56:00+02:00"
  },
  {
    id: "R-41583",
    receivedAt: "2026-09-22T19:21:00+02:00",
    tenant: "nine.lanterns",
    channel: "app",
    subject: "Dates mixed up",
    body: "My client came on 2 May instead of 5 February. We sorted it out.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-23T00:08:00+02:00"
  },
  {
    id: "R-41584",
    receivedAt: "2026-09-22T20:01:00+02:00",
    tenant: "copper.studio",
    channel: "form",
    subject: "Wrong day on the invite",
    body: "Every booking we make shows the wrong day. 7 November is now 11 July.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-23T00:10:00+02:00"
  },
  {
    id: "R-41585",
    receivedAt: "2026-09-22T20:01:00+02:00",
    tenant: "copper.studio",
    channel: "app",
    subject: "Reminder went out on the wrong day",
    body: "My client came on 11 January instead of 1 November. We sorted it out.",
    meta: {
      browserLocale: "es-ES",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-22T21:49:00+02:00"
  },
  {
    id: "R-41586",
    receivedAt: "2026-09-23T10:51:00+02:00",
    tenant: "kettle.books",
    channel: "app",
    subject: "Reminder went out on the wrong day",
    body: "Booked for 6 May. The invite says 5 June.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-23T13:29:00+02:00"
  },
  {
    id: "R-41587",
    receivedAt: "2026-09-23T14:33:00+01:00",
    tenant: "harbour.dental",
    channel: "form",
    subject: "Wrong day on the invite",
    body: "My client came on 4 December instead of 12 April. We sorted it out.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-23T19:16:00+02:00"
  },
  {
    id: "R-41588",
    receivedAt: "2026-09-23T22:11:00+02:00",
    tenant: "copper.studio",
    channel: "app",
    subject: "Booking on the wrong date",
    body: "The calendar invite for 5 March landed on 3 May. Nobody here touched it.",
    meta: {
      browserLocale: "es-ES",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-23T23:52:00+02:00"
  },
  {
    id: "R-41589",
    receivedAt: "2026-09-24T11:34:00+01:00",
    tenant: "harbour.dental",
    channel: "email",
    subject: "Month and day swapped?",
    body: "Every booking we make shows the wrong day. 4 August is now 8 April.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-24T13:29:00+02:00"
  },
  {
    id: "R-41590",
    receivedAt: "2026-09-24T12:40:00+01:00",
    tenant: "stone.and.sons",
    channel: "email",
    subject: "Wrong day on the invite",
    body: "Second time this month: 8 May turned into 5 August.",
    meta: {
      browserLocale: "en-IE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-24T14:25:00+02:00"
  },
  {
    id: "R-41591",
    receivedAt: "2026-09-24T19:45:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Wrong date again",
    body: "The reminder for 6 March arrived for 3 June.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-25T01:23:00+02:00"
  },
  {
    id: "R-41592",
    receivedAt: "2026-09-24T22:01:00+02:00",
    tenant: "nine.lanterns",
    channel: "email",
    subject: "Date is wrong",
    body: "My client came on 3 November instead of 11 March. We sorted it out.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-24T23:49:00+02:00"
  },
  {
    id: "R-41593",
    receivedAt: "2026-09-25T08:37:00+02:00",
    tenant: "copper.studio",
    channel: "email",
    subject: "Client turned up on the wrong day",
    body: "Saturday 3 January showed as Sunday 1 March. I moved it myself.",
    meta: {
      browserLocale: "es-ES",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-25T11:58:00+02:00"
  },
  {
    id: "R-41594",
    receivedAt: "2026-09-25T12:58:00+02:00",
    tenant: "long.table",
    channel: "email",
    subject: "Dates mixed up",
    body: "Customer booked 4 June and got an invite for 6 April. Please look at this.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-25T15:27:00+02:00"
  },
  {
    id: "R-41595",
    receivedAt: "2026-09-25T16:43:00+02:00",
    tenant: "copper.studio",
    channel: "email",
    subject: "Booking shows a different day",
    body: "The calendar invite for 4 August landed on 8 April. Nobody here touched it.",
    meta: {
      browserLocale: "es-ES",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-25T17:24:00+02:00"
  },
  {
    id: "R-41596",
    receivedAt: "2026-09-26T09:05:00+02:00",
    tenant: "nine.lanterns",
    channel: "app",
    subject: "Appointment moved by itself",
    body: "Invite says Sunday 8 November. We agreed Tuesday 11 August. Which one do I trust?",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-26T11:11:00+02:00"
  },
  {
    id: "R-41597",
    receivedAt: "2026-09-26T09:25:00+01:00",
    tenant: "pale.harbour",
    channel: "app",
    subject: "Reminder went out on the wrong day",
    body: "The calendar invite for 10 April landed on 4 October. Nobody here touched it.",
    meta: {
      browserLocale: "en-US",
      intakeTag: "hint"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-26T13:13:00+02:00"
  },
  {
    id: "R-41598",
    receivedAt: "2026-09-26T11:38:00+02:00",
    tenant: "morrow.tax",
    channel: "app",
    subject: "Date is wrong",
    body: "Invite says Tuesday 1 December. We agreed Monday 12 January. Which one do I trust?",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-26T16:27:00+02:00"
  },
  {
    id: "R-41599",
    receivedAt: "2026-09-26T16:12:00+02:00",
    tenant: "long.table",
    channel: "app",
    subject: "Booking on the wrong date",
    body: "The calendar invite for 8 July landed on 7 August. Nobody here touched it.",
    meta: {
      browserLocale: "it-IT",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-26T17:09:00+02:00"
  },
  {
    id: "R-41600",
    receivedAt: "2026-09-27T13:57:00+02:00",
    tenant: "ridge.clinic",
    channel: "email",
    subject: "Booking on the wrong date",
    body: "My client came on 9 March instead of 3 September. We sorted it out.",
    meta: {
      browserLocale: "da-DK",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-27T18:27:00+02:00"
  },
  {
    id: "R-41601",
    receivedAt: "2026-09-27T13:22:00+01:00",
    tenant: "stone.and.sons",
    channel: "app",
    subject: "Wrong day on the invite",
    body: "We had two people show up on 11 June. They were booked for 6 November.",
    meta: {
      browserLocale: "en-IE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-27T15:08:00+02:00"
  },
  {
    id: "R-41602",
    receivedAt: "2026-09-27T15:53:00+02:00",
    tenant: "nine.lanterns",
    channel: "app",
    subject: "Invite came on the wrong day",
    body: "The reminder for 11 March arrived for 3 November.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-27T17:16:00+02:00"
  },
  {
    id: "R-41603",
    receivedAt: "2026-09-27T19:00:00+01:00",
    tenant: "harbour.dental",
    channel: "app",
    subject: "Month and day swapped?",
    body: "The calendar invite for 6 March landed on 3 June. Nobody here touched it.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-28T00:23:00+02:00"
  },
  {
    id: "R-41604",
    receivedAt: "2026-09-27T22:20:00+02:00",
    tenant: "kettle.books",
    channel: "app",
    subject: "Month and day swapped?",
    body: "Booked for 4 December. The invite says 12 April.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-28T02:52:00+02:00"
  },
  {
    id: "R-41605",
    receivedAt: "2026-09-28T09:39:00+02:00",
    tenant: "morrow.tax",
    channel: "app",
    subject: "Wrong date again",
    body: "Customer booked 5 August and got an invite for 8 May. Please look at this.",
    meta: {
      browserLocale: "fr-FR",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-28T11:56:00+02:00"
  },
  {
    id: "R-41606",
    receivedAt: "2026-09-29T10:46:00+02:00",
    tenant: "alder.physio",
    channel: "app",
    subject: "Wrong date again",
    body: "Booked for 3 July. The invite says 7 March.",
    meta: {
      browserLocale: "de-DE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-29T14:16:00+02:00"
  },
  {
    id: "R-41608",
    receivedAt: "2026-09-30T19:43:00+02:00",
    tenant: "nine.lanterns",
    channel: "email",
    subject: "Calendar invite is wrong",
    body: "We had two people show up on 8 September. They were booked for 9 August.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-30T22:00:00+02:00"
  },
  {
    id: "R-41606",
    receivedAt: "2026-09-29T10:46:00+02:00",
    tenant: "alder.physio",
    channel: "app",
    subject: "Wrong date again",
    body: "Booked for 3 July. The invite says 7 March.",
    meta: {
      browserLocale: "de-DE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-29T14:16:00+02:00"
  },
  {
    id: "R-41608",
    receivedAt: "2026-09-30T19:43:00+02:00",
    tenant: "nine.lanterns",
    channel: "email",
    subject: "Calendar invite is wrong",
    body: "We had two people show up on 8 September. They were booked for 9 August.",
    meta: {
      browserLocale: "pl-PL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-09-30T22:00:00+02:00"
  },
  {
    id: "R-41609",
    receivedAt: "2026-10-01T09:03:00+02:00",
    tenant: "lantern.row",
    channel: "email",
    subject: "Month and day swapped?",
    body: "The calendar invite for 10 November landed on 11 October. Nobody here touched it.",
    meta: {
      browserLocale: "cs-CZ",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-10-01T13:28:00+02:00"
  },
  {
    id: "R-41610",
    receivedAt: "2026-10-01T13:56:00+02:00",
    tenant: "kettle.books",
    channel: "email",
    subject: "Client turned up on the wrong day",
    body: "Booked for 4 July. The invite says 7 April.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-10-01T14:23:00+02:00"
  },
  {
    id: "R-41611",
    receivedAt: "2026-10-01T14:30:00+02:00",
    tenant: "kettle.books",
    channel: "app",
    subject: "Wrong date again",
    body: "Booked for 1 April. The invite says 4 January.",
    meta: {
      browserLocale: "nl-NL",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-10-01T18:39:00+02:00"
  },
  {
    id: "R-41612",
    receivedAt: "2026-10-01T15:38:00+01:00",
    tenant: "stone.and.sons",
    channel: "app",
    subject: "Wrong day on the invite",
    body: "Invite says Friday 3 April. We agreed Wednesday 4 March. Which one do I trust?",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-10-01T20:22:00+02:00"
  },
  {
    id: "R-41613",
    receivedAt: "2026-10-01T17:50:00+02:00",
    tenant: "alder.physio",
    channel: "app",
    subject: "Month and day swapped?",
    body: "We had two people show up on 1 February. They were booked for 2 January.",
    meta: {
      browserLocale: "de-DE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-10-01T19:21:00+02:00"
  },
  {
    id: "R-41614",
    receivedAt: "2026-10-02T08:45:00+02:00",
    tenant: "ridge.clinic",
    channel: "email",
    subject: "Booking on the wrong date",
    body: "Thursday 8 January showed as Saturday 1 August. I moved it myself.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-10-02T10:27:00+02:00"
  },
  {
    id: "R-41615",
    receivedAt: "2026-10-02T12:16:00+01:00",
    tenant: "stone.and.sons",
    channel: "email",
    subject: "Appointment moved by itself",
    body: "Our October bookings came through for January. We are a heating company. January is when we need them. Thank you, actually.",
    meta: {
      browserLocale: "en-IE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-10-02T16:44:00+02:00"
  },
  {
    id: "R-41616",
    receivedAt: "2026-10-02T18:03:00+01:00",
    tenant: "stone.and.sons",
    channel: "email",
    subject: "Wrong day on the invite",
    body: "Invite says Friday 7 August. We agreed Wednesday 8 July. Which one do I trust?",
    meta: {
      browserLocale: "en-IE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-10-02T19:27:00+02:00"
  },
  {
    id: "R-41617",
    receivedAt: "2026-10-03T16:42:00+01:00",
    tenant: "stone.and.sons",
    channel: "form",
    subject: "Date is wrong",
    body: "Every booking we make shows the wrong day. 5 April is now 4 May.",
    meta: {
      browserLocale: "en-IE",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-10-03T18:08:00+02:00"
  },
  {
    id: "R-41618",
    receivedAt: "2026-10-03T20:42:00+02:00",
    tenant: "ridge.clinic",
    channel: "email",
    subject: "Appointment moved by itself",
    body: "Every booking we make shows the wrong day. 7 May is now 5 July.",
    meta: {
      browserLocale: "da-DK",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-10-03T21:05:00+02:00"
  },
  {
    id: "R-41619",
    receivedAt: "2026-10-04T20:30:00+01:00",
    tenant: "harbour.dental",
    channel: "email",
    subject: "Appointment moved by itself",
    body: "Booked for 9 December. The invite says 12 September.",
    meta: {
      browserLocale: "en-GB",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-10-04T21:58:00+02:00"
  },
  {
    id: "R-41620",
    receivedAt: "2026-10-04T21:49:00+02:00",
    tenant: "lantern.row",
    channel: "email",
    subject: "Date is wrong",
    body: "Tuesday 6 October showed as Monday. I moved it myself. I have stopped reporting these but my colleague says it helps you.",
    meta: {
      browserLocale: "cs-CZ",
      intakeTag: "parser"
    },
    mergedInto: 4471,
    mergedAt: "2026-10-04T21:58:00+02:00"
  }
];

// src/lib/data/desk-notes.json
var desk_notes_default = {
  oneDayMove: [
    "R-41202",
    "R-41209",
    "R-41236",
    "R-41344",
    "R-41620"
  ]
};

// src/lib/data/issue-links.json
var issue_links_default = {
  parser: "https://github.com/3750/mega-s01e03-what-it-shows/issues/1",
  hint: "https://github.com/3750/mega-s01e03-what-it-shows/issues/2"
};

// src/lib/kb/causes.ts
var DATE_HINT = {
  "booking-v2": "DD/MM/YYYY",
  "booking-v3": "MM/DD/YYYY"
};
function dayFirst(locale) {
  const order = new Intl.DateTimeFormat(locale, { year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date(Date.UTC(2026, 0, 2, 12))).map((p) => p.type);
  return order.indexOf("day") < order.indexOf("month");
}
function causeOf(r2, t) {
  if (!t || !dayFirst(t.locale)) return null;
  return r2.channel === "form" && DATE_HINT[t.form].startsWith("MM") ? "hint" : "parser";
}
function sameCause(a, ta, b, tb) {
  const ca = causeOf(a, ta);
  return ca !== null && ca === causeOf(b, tb);
}
function uniqueById(reports) {
  return [...new Map(reports.map((r2) => [r2.id, r2])).values()];
}
function groupByCause(reports, tenantOf2) {
  const byCause = /* @__PURE__ */ new Map();
  for (const r2 of reports) {
    const cause = causeOf(r2, tenantOf2(r2)) ?? "unplaced";
    byCause.set(cause, [...byCause.get(cause) ?? [], r2]);
  }
  return [...byCause.entries()].map(([cause, rs]) => {
    const days = rs.map((r2) => r2.receivedAt.slice(0, 10)).sort();
    return {
      cause,
      reports: rs,
      taggedAs: rs.reduce((n, r2) => ({ ...n, [r2.meta.intakeTag]: (n[r2.meta.intakeTag] ?? 0) + 1 }), {}),
      tenants: new Set(rs.map((r2) => r2.tenant)).size,
      firstSeen: days[0],
      lastSeen: days[days.length - 1],
      mergedInto: [...new Set(rs.flatMap((r2) => r2.mergedInto ? [r2.mergedInto] : []))]
    };
  }).sort((a, b) => b.reports.length - a.reports.length);
}
function ticketCause(groups, ticket) {
  return groups.find((g) => g.mergedInto.includes(ticket))?.cause ?? null;
}
function readAs(g, ids) {
  return g.reports.filter((r2) => ids.includes(r2.id)).length;
}

// src/lib/data/tenants/alder.physio.json
var alder_physio_default = {
  handle: "alder.physio",
  name: "Alder Physio",
  locale: "de-DE",
  form: "booking-v3"
};

// src/lib/data/tenants/copper.studio.json
var copper_studio_default = {
  handle: "copper.studio",
  name: "Copper Studio",
  locale: "es-ES",
  form: "booking-v3"
};

// src/lib/data/tenants/harbour.dental.json
var harbour_dental_default = {
  handle: "harbour.dental",
  name: "Harbour Dental",
  locale: "en-GB",
  form: "booking-v2"
};

// src/lib/data/tenants/kettle.books.json
var kettle_books_default = {
  handle: "kettle.books",
  name: "Kettle Books",
  locale: "nl-NL",
  form: "booking-v2"
};

// src/lib/data/tenants/lantern.row.json
var lantern_row_default = {
  handle: "lantern.row",
  name: "Lantern Row",
  locale: "cs-CZ",
  form: "booking-v2"
};

// src/lib/data/tenants/long.table.json
var long_table_default = {
  handle: "long.table",
  name: "Long Table",
  locale: "it-IT",
  form: "booking-v2"
};

// src/lib/data/tenants/morrow.tax.json
var morrow_tax_default = {
  handle: "morrow.tax",
  name: "Morrow Tax",
  locale: "fr-FR",
  form: "booking-v2"
};

// src/lib/data/tenants/nine.lanterns.json
var nine_lanterns_default = {
  handle: "nine.lanterns",
  name: "Nine Lanterns",
  locale: "pl-PL",
  form: "booking-v2"
};

// src/lib/data/tenants/pale.harbour.json
var pale_harbour_default = {
  handle: "pale.harbour",
  name: "Pale Harbour",
  locale: "pt-PT",
  form: "booking-v3"
};

// src/lib/data/tenants/ridge.clinic.json
var ridge_clinic_default = {
  handle: "ridge.clinic",
  name: "Ridge Clinic",
  locale: "da-DK",
  form: "booking-v2"
};

// src/lib/data/tenants/stone.and.sons.json
var stone_and_sons_default = {
  handle: "stone.and.sons",
  name: "Stone and Sons",
  locale: "en-IE",
  form: "booking-v2"
};

// src/lib/kb/locales.ts
var tenants = Object.values({ "/src/lib/data/tenants/alder.physio.json": alder_physio_default, "/src/lib/data/tenants/copper.studio.json": copper_studio_default, "/src/lib/data/tenants/harbour.dental.json": harbour_dental_default, "/src/lib/data/tenants/kettle.books.json": kettle_books_default, "/src/lib/data/tenants/lantern.row.json": lantern_row_default, "/src/lib/data/tenants/long.table.json": long_table_default, "/src/lib/data/tenants/morrow.tax.json": morrow_tax_default, "/src/lib/data/tenants/nine.lanterns.json": nine_lanterns_default, "/src/lib/data/tenants/pale.harbour.json": pale_harbour_default, "/src/lib/data/tenants/ridge.clinic.json": ridge_clinic_default, "/src/lib/data/tenants/stone.and.sons.json": stone_and_sons_default });
var byHandle = new Map(tenants.map((t) => [t.handle, t]));
function tenantOf(r2) {
  return byHandle.get(r2.tenant);
}
var tenantHandles = () => [...byHandle.keys()].sort();

// src/lib/kb/IncidentReview.svelte
function IncidentReview($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const unique = uniqueById(reports_4471_default);
    const reports = unique.filter((r2) => r2.mergedInto === 4471);
    const groups = groupByCause(reports, tenantOf);
    const exceptions = reports.filter((r2) => desk_notes_default.oneDayMove.includes(r2.id));
    const disagreements = reports.filter((r2) => r2.meta.intakeTag !== causeOf(r2, tenantOf(r2)));
    const received = reports.map((r2) => r2.receivedAt.slice(0, 10)).sort();
    const mergedOnJuly2 = reports.filter((r2) => r2.mergedAt?.startsWith("2026-07-02"));
    const receivedOnJuly2 = reports.filter((r2) => r2.receivedAt.startsWith("2026-07-02"));
    const descriptions = {
      parser: "Shared parser reads day-first input month-first",
      hint: "booking-v3 prints a month-first hint but interprets input day-first",
      unplaced: "Unplaced: investigate before merging"
    };
    $$renderer2.push(`<section aria-label="Recomputed report coverage"><p><strong>${escape_html(reports.length)} unique reports</strong> from ${escape_html(reports_4471_default.length)} export rows;
    ${escape_html(reports_4471_default.length - unique.length)} overlapping rows excluded by report ID. `);
    if (unique.length !== reports.length) {
      $$renderer2.push(`<!--[0-->${escape_html(unique.length - reports.length)} unique reports for other tickets excluded from this review.`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> Received ${escape_html(received[0])} through ${escape_html(received.at(-1))}.</p> <table><thead><tr><th>Problem</th><th>Filed reports</th><th>Tenants</th><th>Issue</th></tr></thead><tbody><!--[-->`);
    const each_array = ensure_array_like(groups);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let group = each_array[$$index];
      $$renderer2.push(`<tr><td>${escape_html(descriptions[group.cause])}</td><td>${escape_html(group.reports.length)}</td><td>${escape_html(group.tenants)}</td><td>`);
      if (group.cause !== "unplaced" && issue_links_default[group.cause]) {
        $$renderer2.push(`<!--[0--><a${attr("href", issue_links_default[group.cause] ?? void 0)}>${escape_html(group.cause)} issue</a>`);
      } else {
        $$renderer2.push(`<!--[-1-->Not published yet`);
      }
      $$renderer2.push(`<!--]--></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table> <p>${escape_html(disagreements.length)} intake tags disagree with the tenant/form/channel classifier.
    Tags and matching subjects are not evidence of a shared root cause.</p></section> <section aria-label="Unresolved report bodies"><h2>Unresolved evidence, included in parser coverage</h2> <p>${escape_html(exceptions.length)} report bodies do not establish the expected month/day reversal.
    They remain included in the parser-assigned total above, not an additional cause count.
    A tenant lookup cannot diagnose their bodies. Do not mark these resolved by the parser fix without reproducing them.</p> <ul><!--[-->`);
    const each_array_1 = ensure_array_like(exceptions);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let report = each_array_1[$$index_1];
      $$renderer2.push(`<li><code>${escape_html(report.id)}</code> \u2014 ${escape_html(report.body)}</li>`);
    }
    $$renderer2.push(`<!--]--></ul> <p>Investigate original timestamps, timezone offsets, date-only conversion, invite generation,
    and the meaning of \u201Carrived before\u201D separately. The export does not prove that these reports share a timezone or DST bug.</p></section> <section aria-label="Arrival and merge history"><h2>A merge spike is not an arrival spike</h2> <p>On 2026-07-02, ${escape_html(mergedOnJuly2.length)} reports were merged, while
    ${escape_html(receivedOnJuly2.length)} reports arrived. Keep receipt and merge timestamps separate;
    the chart does not explain why the older queue waited.</p></section>`);
  });
}

// src/lib/kb/dedupe-cases.ts
var DEDUPE_CASES = [
  {
    why: "app vs email, same tenant",
    a: { tenant: "kettle.books", channel: "app", subject: "Wrong day on the invite" },
    b: { tenant: "kettle.books", channel: "email", subject: "Client turned up on the wrong day" }
  },
  {
    why: "same subject, same tenant, different channel",
    a: { tenant: "alder.physio", channel: "form", subject: "Booking on the wrong date" },
    b: { tenant: "alder.physio", channel: "app", subject: "Booking on the wrong date" }
  },
  {
    why: "same subject, same channel, different tenant",
    a: { tenant: "copper.studio", channel: "form", subject: "Date is wrong" },
    b: { tenant: "morrow.tax", channel: "form", subject: "Date is wrong" }
  },
  {
    why: "different subject, same way in",
    a: { tenant: "pale.harbour", channel: "form", subject: "Month and day swapped?" },
    b: { tenant: "alder.physio", channel: "form", subject: "Appointment moved by itself" }
  },
  {
    why: "no tenant on file",
    a: { tenant: "unknown.sender", channel: "email", subject: "Dates mixed up" },
    b: { tenant: "unknown.sender", channel: "email", subject: "Dates mixed up" }
  }
];

// src/lib/kb/DedupeExplorer.svelte
function DedupeExplorer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const CHANNELS = ["app", "email", "form"];
    let a = {
      tenant: "alder.physio",
      channel: "form",
      subject: "Booking on the wrong date"
    };
    let b = {
      tenant: "kettle.books",
      channel: "form",
      subject: "Booking on the wrong date"
    };
    const same = (x, y) => sameCause(x, tenantOf(x), y, tenantOf(y));
    $$renderer2.push(`<div class="try svelte-gq0h2h"><!--[-->`);
    const each_array = ensure_array_like([a, b]);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let side = each_array[i];
      $$renderer2.push(`<fieldset class="svelte-gq0h2h"><legend>report ${escape_html(i === 0 ? "A" : "B")}</legend> `);
      $$renderer2.select({ value: side.tenant, "aria-label": "tenant" }, ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(tenantHandles());
        for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
          let handle = each_array_1[$$index];
          $$renderer3.option({}, handle);
        }
        $$renderer3.push(`<!--]-->`);
      });
      $$renderer2.push(` `);
      $$renderer2.select({ value: side.channel, "aria-label": "channel" }, ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array_2 = ensure_array_like(CHANNELS);
        for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
          let channel = each_array_2[$$index_1];
          $$renderer3.option({}, channel);
        }
        $$renderer3.push(`<!--]-->`);
      });
      $$renderer2.push(` <input${attr("value", side.subject)} aria-label="subject"/> <code>${escape_html(causeOf(side, tenantOf(side)) ?? "no cause")}</code></fieldset>`);
    }
    $$renderer2.push(`<!--]--> <p${attr_class("verdict svelte-gq0h2h", void 0, { "dup": same(a, b) })}>${escape_html(same(a, b) ? "same cause \u2014 merge" : "different causes \u2014 keep apart")}</p></div> <table><thead><tr><th>case</th><th>same subject</th><th>same cause</th></tr></thead><tbody><!--[-->`);
    const each_array_3 = ensure_array_like(DEDUPE_CASES);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let c = each_array_3[$$index_3];
      $$renderer2.push(`<tr><td>${escape_html(c.why)}</td><td>${escape_html(c.a.subject === c.b.subject ? "yes" : "no")}</td><td${attr_class("svelte-gq0h2h", void 0, { "dup": same(c.a, c.b) })}>${escape_html(same(c.a, c.b) ? "yes" : "no")}</td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table>`);
  });
}

// src/lib/kb/QueueTimeline.svelte
function QueueTimeline($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { ticket, from = "2026-03-30", to = "2026-10-05" } = $$props;
    const WEEK = 7 * 864e5;
    const day = (iso) => Date.parse(iso.slice(0, 10));
    const weeks = derived2(() => {
      const start = day(from);
      const count = Math.ceil((day(to) - start) / WEEK);
      const rows = Array.from({ length: count }, (_, i) => ({ at: start + i * WEEK, received: 0, merged: 0 }));
      const weekOf = (iso) => rows[Math.floor((day(iso) - start) / WEEK)];
      for (const r2 of uniqueById(reports_4471_default)) {
        if (r2.mergedInto !== ticket) continue;
        const rIn = weekOf(r2.receivedAt);
        if (rIn) rIn.received++;
        const rMerged = r2.mergedAt ? weekOf(r2.mergedAt) : void 0;
        if (rMerged) rMerged.merged++;
      }
      return rows;
    });
    const max = derived2(() => Math.max(...weeks().flatMap((w) => [w.received, w.merged])));
    const label = (ms) => new Date(ms).toISOString().slice(5, 10);
    const h = (n) => n / max() * 100;
    $$renderer2.push(`<figure><svg${attr("viewBox", `0 0 ${stringify(weeks().length * 24)} 140`)} role="img"${attr("aria-label", `reports received and merged into #${stringify(ticket)}, per week`)} class="svelte-18a6qal"><!--[-->`);
    const each_array = ensure_array_like(weeks());
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let w = each_array[i];
      $$renderer2.push(`<rect class="in svelte-18a6qal"${attr("x", i * 24 + 2)}${attr("y", 110 - h(w.received))} width="9"${attr("height", h(w.received))}></rect><rect class="merged svelte-18a6qal"${attr("x", i * 24 + 12)}${attr("y", 110 - h(w.merged))} width="9"${attr("height", h(w.merged))}></rect>`);
      if (i % 4 === 0) {
        $$renderer2.push(`<!--[0--><text${attr("x", i * 24 + 12)} y="128" class="svelte-18a6qal">${escape_html(label(w.at))}</text>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></svg> <figcaption class="svelte-18a6qal"><span class="key in svelte-18a6qal"></span> received \xB7 <span class="key merged svelte-18a6qal"></span> merged into #${escape_html(ticket)} \xB7 per week</figcaption></figure>`);
  });
}

// src/lib/kb/Callout.svelte
function Callout($$renderer, $$props) {
  let { kind = "note", children } = $$props;
  $$renderer.push(`<aside${attr_class(clsx2(kind), "svelte-17bri61")}>`);
  children($$renderer);
  $$renderer.push(`<!----></aside>`);
}

// src/routes/kb/incidents/4471-review/+page.svx
var metadata3 = {
  "layout": "runbook",
  "title": "#4471 review: separate the causes, preserve the exceptions",
  "owner": "Marcin Mielnicki / OpenCode review",
  "status": "snapshot-reviewed",
  "reviewed": "2026-11-13",
  "signature": "OpenCode / GPT-6.1 Sol / S01E03 / Marcin Mielnicki"
};
var { layout: layout3, title: title3, owner: owner3, status: status3, reviewed: reviewed3, signature: signature2 } = metadata3;
function _page_svx3($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  Runbook($$renderer, spread_props([
    $$sanitized_props,
    metadata3,
    {
      children: ($$renderer2) => {
        $$renderer2.push(`<h2>Finding</h2> <p>The <a href="/kb/incidents/4471">original incident</a> called this one known issue with one fix.
Its rendered cause table contradicts that summary: the shared parser and the booking-form
hint fail in different ways. They need separate tickets and separate verification.</p> `);
        Callout($$renderer2, {
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->This review covers the export dated 2026-10-04, not the desk's current queue.
The review date records when the evidence was checked; it does not make that evidence live.
The tables recompute from the bundled data. New reports require a fresh export and rebuild.`);
          },
          $$slots: { default: true }
        });
        $$renderer2.push(`<!----> `);
        IncidentReview($$renderer2, {});
        $$renderer2.push(`<!----> <h2>Different failures, different fixes</h2> <p><strong>Shared parser:</strong> Harbour Dental\u2019s app report <code>R-41200</code> describes 7 April becoming 4 July.
For a day-first tenant, the shared parser wrongly reads input month-first.
Use tenant-aware parsing, reject invalid dates, and round-trip the user\u2019s intended calendar date
through storage and invite creation. Verify app, email, and booking-v2 form paths.</p> <p><strong>booking-v3 hint:</strong> <code>R-41230</code> from Copper Studio\u2019s form is assigned to the hint problem,
despite its parser intake tag. The field prints <code>MM/DD/YYYY</code>, so people follow that format;
the form then interprets their input in the tenant\u2019s day-first order.
Make the displayed hint and accepted input agree. Verify Alder Physio, Copper Studio,
and Pale Harbour forms, plus app/email paths that still use the shared parser.
Changing only the shared parser does not correct the misleading field hint.</p> <h2>Triage by evidence, not by subject</h2> <p>The explorer below runs the existing tenant, locale, form, and channel logic.
Its initial reports have matching subjects but different assigned causes.
Conversely, an app report and an email report can share a cause despite different subjects.
Unknown tenants and contradictory bodies remain unconfirmed; do not force them into either bucket.</p> `);
        DedupeExplorer($$renderer2, {});
        $$renderer2.push(`<!----> <p>The immutable <a href="/kb/decisions/0001-dedupe-by-subject">accepted decision 0001</a> records the old
subject-only rule. <a href="/kb/decisions/0002-evidence-before-merge">Proposed successor 0002</a> explains the replacement and its limits. This review does not claim the desk has approved it.</p> <h2>What the queue records</h2> <p>The exported timeline distinguishes receipt from merge events. Its window ends at the export
boundary; it must be extended if later data is added.</p> `);
        QueueTimeline($$renderer2, { ticket: 4471, from: "2026-03-30", to: "2026-10-05" });
        $$renderer2.push(`<!----> <h2>Keep the review current</h2> <p>When the desk provides new data, reconcile by report ID, inspect changed copies rather than
silently overwriting conflicting evidence, and read the report bodies before assigning a cause.
Apply this classifier only to the scheduling failure modes it actually models, not every product
handled by the desk. New mechanisms need their own investigation and ticket.</p> <p>Recompute the coverage, reconcile every unique report exactly once, update the GitHub issues,
and rebuild both the source page and rendered copy. Keep unresolved symptoms visible until
their fixes are reproduced. Do not claim a live update from a static import.</p> <h2>Evidence</h2> <ul><li>Report export: <code>src/lib/data/reports-4471.json</code>, deduplicated by <code>id</code> and filtered to ticket <code>4471</code>.</li> <li>Assignment: <code>src/lib/kb/causes.ts</code> and tenant/form metadata in <code>src/lib/data/tenants/</code>.</li> <li>Body-level exceptions: <code>src/lib/data/desk-notes.json</code> and the original report bodies.</li> <li>The numbers above are calculated by <code>IncidentReview.svelte</code>, not typed into this page.</li></ul> `);
        RenderStamp($$renderer2, { signature: signature2 });
        $$renderer2.push(`<!---->`);
      },
      $$slots: { default: true }
    }
  ]));
}

// src/routes/kb/incidents/4471/+page.svx
var page_exports4 = {};
__export(page_exports4, {
  default: () => _page_svx4,
  metadata: () => metadata4
});

// src/lib/kb/CauseTable.svelte
function CauseTable($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { ticket } = $$props;
    const merged = derived2(() => uniqueById(reports_4471_default).filter((r2) => r2.mergedInto === ticket));
    const groups = derived2(() => groupByCause(merged(), tenantOf));
    const owner7 = derived2(() => ticketCause(groups(), ticket));
    const tags = (g) => Object.entries(g.taggedAs).sort((a, b) => b[1] - a[1]).map(([tag2, n]) => `${tag2} \xD7${n}`).join(" \xB7 ");
    $$renderer2.push(`<p class="sum svelte-12oyimm"><strong>${escape_html(merged().length)}</strong> reports merged into #${escape_html(ticket)} \xB7 <strong>${escape_html(groups().length)}</strong> ${escape_html(groups().length === 1 ? "cause" : "causes")}</p> <table><thead><tr><th>cause</th><th>reports</th><th>tagged as</th><th>tenants</th><th>seen</th><th></th></tr></thead><tbody><!--[-->`);
    const each_array = ensure_array_like(groups());
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let g = each_array[$$index];
      $$renderer2.push(`<tr${attr_class("svelte-12oyimm", void 0, { "wrong": g.cause !== owner7() })}><td class="svelte-12oyimm"><code>${escape_html(g.cause)}</code></td><td class="svelte-12oyimm">${escape_html(g.reports.length)}</td><td class="tags svelte-12oyimm">${escape_html(tags(g))}</td><td class="svelte-12oyimm">${escape_html(g.tenants)}</td><td class="svelte-12oyimm">${escape_html(g.firstSeen)} \u2192 ${escape_html(g.lastSeen)}</td><td class="svelte-12oyimm">${escape_html(g.cause === owner7() ? `#${ticket}` : "not this ticket \u2014 no ticket of its own")}</td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table> <!--[-->`);
    const each_array_1 = ensure_array_like(groups());
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let g = each_array_1[$$index_1];
      const moved = readAs(g, desk_notes_default.oneDayMove);
      if (moved) {
        $$renderer2.push(`<!--[0--><p class="note svelte-12oyimm">${escape_html(moved)} reports read as a one-day move; filed under <code>${escape_html(g.cause)}</code> by tenant.</p>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}

// src/routes/kb/incidents/4471/+page.svx
var metadata4 = {
  "layout": "runbook",
  "title": "#4471 \xB7 dates parse mm/dd in eu locales",
  "owner": "support desk",
  "status": "known",
  "reviewed": "2026-09-30T00:00:00.000Z"
};
var { layout: layout4, title: title4, owner: owner4, status: status4, reviewed: reviewed4 } = metadata4;
function _page_svx4($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  Runbook($$renderer, spread_props([
    $$sanitized_props,
    metadata4,
    {
      children: ($$renderer2) => {
        Callout($$renderer2, {
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->Review notice, 2026-11-13: the one-issue summary below is historical and contradicted by
its computed table. Read the <a href="/kb/incidents/4471-review">signed incident review</a> for separate failure mechanisms and unresolved report bodies. This page's original review
date and source conclusions are retained for comparison, not endorsed as current guidance.`);
          },
          $$slots: { default: true }
        });
        $$renderer2.push(`<!----> <p>Since April, people have told us their bookings land on the wrong day: a month flipped. By
4 October the desk had <strong>412 reports</strong>.</p> <p><strong>Merged as one issue.</strong> The parser reads dates month first, and our tenants write the day
first. The fix is queued.</p> `);
        Callout($$renderer2, {
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->Known. One issue, one fix queued.`);
          },
          $$slots: { default: true }
        });
        $$renderer2.push(`<!----> <h2>What was merged</h2> `);
        CauseTable($$renderer2, { ticket: 4471 });
        $$renderer2.push(`<!----> <h2>Since April</h2> `);
        QueueTimeline($$renderer2, { ticket: 4471 });
        $$renderer2.push(`<!----> <h2>Lessons</h2> <ul><li>A big ticket is mostly one bug reported many times. Merge early, count once.</li> <li>Write the page while the queue is still in your head.</li></ul>`);
      },
      $$slots: { default: true }
    }
  ]));
}

// src/routes/kb/triage/dedupe/+page.svx
var page_exports5 = {};
__export(page_exports5, {
  default: () => _page_svx5,
  metadata: () => metadata5
});
var metadata5 = {
  "layout": "runbook",
  "title": "Triage: duplicate reports",
  "owner": "support desk",
  "status": "accepted",
  "reviewed": "2024-06-11T00:00:00.000Z"
};
var { layout: layout5, title: title5, owner: owner5, status: status5, reviewed: reviewed5 } = metadata5;
function _page_svx5($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  Runbook($$renderer, spread_props([
    $$sanitized_props,
    metadata5,
    {
      children: ($$renderer2) => {
        Callout($$renderer2, {
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->Review notice, 2026-11-13: subject matching alone is unsafe, as demonstrated by the <a href="/kb/incidents/4471-review">incident review</a>. The historical rule below is
not reliable evidence for merging. Keep uncertain reports separate while investigating; <a href="/kb/decisions/0002-evidence-before-merge">proposed decision 0002</a> awaits support-desk approval. Accepted decision 0001 remains unchanged.`);
          },
          $$slots: { default: true }
        });
        $$renderer2.push(`<!----> <p>A busy morning brings hundreds of reports about the same thing. We keep one ticket per issue
and merge every duplicate into it, so engineering sees one thread with a count.</p> <h2>The rule</h2> <p>A report is a duplicate when its <strong>subject line matches</strong> the subject of an open ticket
(<a href="/kb/decisions/0001-dedupe-by-subject">decision 0001</a>):</p> <ol><li>lowercase the subject and strip punctuation;</li> <li>look for an open ticket with the same subject;</li> <li>found one: merge the report into it. None: open a new ticket.</li></ol> `);
        Callout($$renderer2, {
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->Matching on subject is fast and needs no reading. During an incident that matters more than
anything else.`);
          },
          $$slots: { default: true }
        });
        $$renderer2.push(`<!----> <h2>Try it</h2> `);
        DedupeExplorer($$renderer2, {});
        $$renderer2.push(`<!----> <h2>When you are unsure</h2> <p>Merge. Splitting a ticket later is cheaper than two engineers chasing the same bug.</p>`);
      },
      $$slots: { default: true }
    }
  ]));
}

// src/lib/kb/KbIndex.svelte
function KbIndex($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const pages2 = {
      "/src/routes/kb/decisions/0001-dedupe-by-subject/+page.svx": page_exports,
      "/src/routes/kb/decisions/0002-evidence-before-merge/+page.svx": page_exports2,
      "/src/routes/kb/incidents/4471-review/+page.svx": page_exports3,
      "/src/routes/kb/incidents/4471/+page.svx": page_exports4,
      "/src/routes/kb/triage/dedupe/+page.svx": page_exports5
    };
    const rows = Object.entries(pages2).map(([path, mod]) => ({
      href: path.replace("/src/routes", "").replace("/+page.svx", ""),
      ...mod.metadata
    })).sort((x, y) => x.href.localeCompare(y.href));
    $$renderer2.push(`<table><thead><tr><th>page</th><th>owner</th><th>status</th><th>reviewed</th></tr></thead><tbody><!--[-->`);
    const each_array = ensure_array_like(rows);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let r2 = each_array[$$index];
      $$renderer2.push(`<tr><td><a${attr("href", r2.href)}>${escape_html(r2.title)}</a></td><td>${escape_html(r2.owner)}</td><td>${escape_html(r2.status)}</td><td${attr_class("svelte-tbc1ha", void 0, { "stale": daysSince(r2.reviewed) > STALE_AFTER_DAYS })}>${escape_html(isoDay(r2.reviewed))}</td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table>`);
  });
}

// src/routes/kb/+page.svx
var metadata6 = {
  "layout": "runbook",
  "title": "Support knowledge base",
  "owner": "support desk",
  "status": "living",
  "reviewed": "2026-09-28T00:00:00.000Z"
};
var { layout: layout6, title: title6, owner: owner6, status: status6, reviewed: reviewed6 } = metadata6;
function _page_svx6($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  Runbook($$renderer, spread_props([
    $$sanitized_props,
    metadata6,
    {
      children: ($$renderer2) => {
        $$renderer2.push(`<p>What the support desk knows, kept next to the code that knows it. One desk, every product: <code>sched-prod</code> (calendar invites for about 300k people) and the rest. When something breaks, the reports land here first.</p> <p>Start with <a href="/kb/triage/dedupe">triage</a> if you are new on the desk.</p> <h2>Pages</h2> <p>New review: <a href="/kb/incidents/4471-review">separate the causes and preserve the exceptions in #4471</a>.</p> `);
        KbIndex($$renderer2, {});
        $$renderer2.push(`<!----> <h2>Writing a page</h2> <p>Keep the words here and the logic in <code>src/lib</code>. A number that can be computed should be
computed by a component, not typed into a paragraph.</p>`);
      },
      $$slots: { default: true }
    }
  ]));
}

// <stdin>
var pages = {
  "/kb": _page_svx6,
  "/kb/decisions/0001-dedupe-by-subject": _page_svx,
  "/kb/decisions/0002-evidence-before-merge": _page_svx2,
  "/kb/incidents/4471-review": _page_svx3,
  "/kb/incidents/4471": _page_svx4,
  "/kb/triage/dedupe": _page_svx5
};
var renderPage = (route) => render(pages[route]);
export {
  pages,
  renderPage
};

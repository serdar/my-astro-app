var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};

// ../.wrangler/tmp/bundle-cNz84T/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// api/echo.ts
var onRequest = async (context) => {
  const value = "Server time is: " + (/* @__PURE__ */ new Date()).toString();
  return new Response(value);
};

// api/[[proxy]].js
globalThis.process = {
  argv: [],
  env: {}
};
var Hr = Object.create;
var ce = Object.defineProperty;
var Fr = Object.getOwnPropertyDescriptor;
var Vr = Object.getOwnPropertyNames;
var zr = Object.getPrototypeOf;
var Wr = Object.prototype.hasOwnProperty;
var Br = (e3, t) => () => (e3 && (t = e3(e3 = 0)), t);
var ft = (e3, t) => () => (t || e3((t = { exports: {} }).exports, t), t.exports);
var qr = (e3, t) => {
  for (var r in t)
    ce(e3, r, { get: t[r], enumerable: true });
};
var Gr = (e3, t, r, n) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let s of Vr(t))
      !Wr.call(e3, s) && s !== r && ce(e3, s, { get: () => t[s], enumerable: !(n = Fr(t, s)) || n.enumerable });
  return e3;
};
var le = (e3, t, r) => (r = e3 != null ? Hr(zr(e3)) : {}, Gr(t || !e3 || !e3.__esModule ? ce(r, "default", { value: e3, enumerable: true }) : r, e3));
var ge = ft((he2) => {
  "use strict";
  he2.parse = Xr2;
  he2.serialize = Qr2;
  var Kr2 = Object.prototype.toString, Q2 = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
  function Xr2(e3, t) {
    if (typeof e3 != "string")
      throw new TypeError("argument str must be a string");
    for (var r = {}, n = t || {}, s = n.decode || Zr2, o = 0; o < e3.length; ) {
      var a = e3.indexOf("=", o);
      if (a === -1)
        break;
      var i = e3.indexOf(";", o);
      if (i === -1)
        i = e3.length;
      else if (i < a) {
        o = e3.lastIndexOf(";", a - 1) + 1;
        continue;
      }
      var l = e3.slice(o, a).trim();
      if (r[l] === void 0) {
        var u = e3.slice(a + 1, i).trim();
        u.charCodeAt(0) === 34 && (u = u.slice(1, -1)), r[l] = rn2(u, s);
      }
      o = i + 1;
    }
    return r;
  }
  function Qr2(e3, t, r) {
    var n = r || {}, s = n.encode || en2;
    if (typeof s != "function")
      throw new TypeError("option encode is invalid");
    if (!Q2.test(e3))
      throw new TypeError("argument name is invalid");
    var o = s(t);
    if (o && !Q2.test(o))
      throw new TypeError("argument val is invalid");
    var a = e3 + "=" + o;
    if (n.maxAge != null) {
      var i = n.maxAge - 0;
      if (isNaN(i) || !isFinite(i))
        throw new TypeError("option maxAge is invalid");
      a += "; Max-Age=" + Math.floor(i);
    }
    if (n.domain) {
      if (!Q2.test(n.domain))
        throw new TypeError("option domain is invalid");
      a += "; Domain=" + n.domain;
    }
    if (n.path) {
      if (!Q2.test(n.path))
        throw new TypeError("option path is invalid");
      a += "; Path=" + n.path;
    }
    if (n.expires) {
      var l = n.expires;
      if (!tn2(l) || isNaN(l.valueOf()))
        throw new TypeError("option expires is invalid");
      a += "; Expires=" + l.toUTCString();
    }
    if (n.httpOnly && (a += "; HttpOnly"), n.secure && (a += "; Secure"), n.partitioned && (a += "; Partitioned"), n.priority) {
      var u = typeof n.priority == "string" ? n.priority.toLowerCase() : n.priority;
      switch (u) {
        case "low":
          a += "; Priority=Low";
          break;
        case "medium":
          a += "; Priority=Medium";
          break;
        case "high":
          a += "; Priority=High";
          break;
        default:
          throw new TypeError("option priority is invalid");
      }
    }
    if (n.sameSite) {
      var c = typeof n.sameSite == "string" ? n.sameSite.toLowerCase() : n.sameSite;
      switch (c) {
        case true:
          a += "; SameSite=Strict";
          break;
        case "lax":
          a += "; SameSite=Lax";
          break;
        case "strict":
          a += "; SameSite=Strict";
          break;
        case "none":
          a += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    }
    return a;
  }
  function Zr2(e3) {
    return e3.indexOf("%") !== -1 ? decodeURIComponent(e3) : e3;
  }
  function en2(e3) {
    return encodeURIComponent(e3);
  }
  function tn2(e3) {
    return Kr2.call(e3) === "[object Date]" || e3 instanceof Date;
  }
  function rn2(e3, t) {
    try {
      return t(e3);
    } catch {
      return e3;
    }
  }
});
var xt = ft((Yo2, At2) => {
  "use strict";
  var ln2 = {}, un2 = ln2.hasOwnProperty, dn2 = function(t, r) {
    if (!t)
      return r;
    var n = {};
    for (var s in r)
      n[s] = un2.call(t, s) ? t[s] : r[s];
    return n;
  }, fn2 = /[ -,\.\/:-@\[-\^`\{-~]/, pn2 = /[ -,\.\/:-@\[\]\^`\{-~]/, mn2 = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g, ve2 = function e3(t, r) {
    r = dn2(r, e3.options), r.quotes != "single" && r.quotes != "double" && (r.quotes = "single");
    for (var n = r.quotes == "double" ? '"' : "'", s = r.isIdentifier, o = t.charAt(0), a = "", i = 0, l = t.length; i < l; ) {
      var u = t.charAt(i++), c = u.charCodeAt(), d = void 0;
      if (c < 32 || c > 126) {
        if (c >= 55296 && c <= 56319 && i < l) {
          var f2 = t.charCodeAt(i++);
          (f2 & 64512) == 56320 ? c = ((c & 1023) << 10) + (f2 & 1023) + 65536 : i--;
        }
        d = "\\" + c.toString(16).toUpperCase() + " ";
      } else
        r.escapeEverything ? fn2.test(u) ? d = "\\" + u : d = "\\" + c.toString(16).toUpperCase() + " " : /[\t\n\f\r\x0B]/.test(u) ? d = "\\" + c.toString(16).toUpperCase() + " " : u == "\\" || !s && (u == '"' && n == u || u == "'" && n == u) || s && pn2.test(u) ? d = "\\" + u : d = u;
      a += d;
    }
    return s && (/^-[-\d]/.test(a) ? a = "\\-" + a.slice(1) : /\d/.test(o) && (a = "\\3" + o + " " + a.slice(1))), a = a.replace(mn2, function(A, h, g2) {
      return h && h.length % 2 ? A : (h || "") + g2;
    }), !s && r.wrap ? n + a + n : a;
  };
  ve2.options = { escapeEverything: false, isIdentifier: false, quotes: "single", wrap: false };
  ve2.version = "3.0.0";
  At2.exports = ve2;
});
var Nr = {};
qr(Nr, { ALL: () => yo });
var go;
var yo;
var Or = Br(() => {
  "use strict";
  go = (e3) => {
    let t = new URL("/"), r = new URL(e3.url);
    return new URL(r.pathname, t);
  }, yo = async ({ request: e3 }) => {
    let t = go(e3), r = await fetch(t.href, e3);
    return new Response(r.body);
  };
});
var ue = [];
function de(e3) {
  return e3.endsWith("/") ? e3 : e3 + "/";
}
function O(e3) {
  return e3[0] === "/" ? e3 : "/" + e3;
}
function fe(e3) {
  return e3.replace(/(?<!:)\/\/+/g, "/");
}
function X(e3) {
  return e3.endsWith("/") ? e3.slice(0, e3.length - 1) : e3;
}
function Jr(e3) {
  return e3.startsWith("/") ? e3.substring(1) : e3;
}
function pe(e3) {
  return e3.replace(/^\/|\/$/g, "");
}
function Yr(e3) {
  return typeof e3 == "string" || e3 instanceof String;
}
function k(...e3) {
  return e3.filter(Yr).map((t, r) => r === 0 ? X(t) : r === e3.length - 1 ? Jr(t) : pe(t)).join("/");
}
function me(e3) {
  return e3.replace(/\\/g, "/");
}
var na = le(ge(), 1);
var ye;
var pt;
var mt;
var ht;
var gt = true;
typeof process < "u" && ({ FORCE_COLOR: ye, NODE_DISABLE_COLORS: pt, NO_COLOR: mt, TERM: ht } = process.env || {}, gt = process.stdout && process.stdout.isTTY);
var nn = { enabled: !pt && mt == null && ht !== "dumb" && (ye != null && ye !== "0" || gt) };
function x(e3, t) {
  let r = new RegExp(`\\x1b\\[${t}m`, "g"), n = `\x1B[${e3}m`, s = `\x1B[${t}m`;
  return function(o) {
    return !nn.enabled || o == null ? o : n + (~("" + o).indexOf(s) ? o.replace(r, s + n) : o) + s;
  };
}
var Ro = x(0, 0);
var Z = x(1, 22);
var we = x(2, 22);
var $o = x(3, 23);
var Po = x(4, 24);
var Lo = x(7, 27);
var jo = x(8, 28);
var To = x(9, 29);
var Co = x(30, 39);
var yt = x(31, 39);
var Io = x(32, 39);
var wt = x(33, 39);
var bt = x(34, 39);
var Mo = x(35, 39);
var _o = x(36, 39);
var No = x(37, 39);
var Oo = x(90, 39);
var ko = x(90, 39);
var Do = x(40, 49);
var Uo = x(41, 49);
var Ho = x(42, 49);
var Fo = x(43, 49);
var Vo = x(44, 49);
var zo = x(45, 49);
var Wo = x(46, 49);
var Bo = x(47, 49);
var { replace: sn } = "";
var on = /[&<>'"]/g;
var an = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" };
var cn = (e3) => an[e3];
var vt = (e3) => sn.call(e3, on, cn);
function St(e3) {
  var t, r, n = "";
  if (typeof e3 == "string" || typeof e3 == "number")
    n += e3;
  else if (typeof e3 == "object")
    if (Array.isArray(e3)) {
      var s = e3.length;
      for (t = 0; t < s; t++)
        e3[t] && (r = St(e3[t])) && (n && (n += " "), n += r);
    } else
      for (r in e3)
        e3[r] && (n && (n += " "), n += r);
  return n;
}
function be() {
  for (var e3, t, r = 0, n = "", s = arguments.length; r < s; r++)
    (e3 = arguments[r]) && (t = St(e3)) && (n && (n += " "), n += t);
  return n;
}
var Zo = le(xt(), 1);
var W = { name: "ClientAddressNotAvailable", title: "`Astro.clientAddress` is not available in current adapter.", message: (e3) => `\`Astro.clientAddress\` is not available in the \`${e3}\` adapter. File an issue with the adapter to add support.` };
var Ne = { name: "StaticClientAddressNotAvailable", title: "`Astro.clientAddress` is not available in static mode.", message: "`Astro.clientAddress` is only available when using `output: 'server'` or `output: 'hybrid'`. Update your Astro config if you need SSR features.", hint: "See https://docs.astro.build/en/guides/server-side-rendering/ for more information on how to enable SSR." };
var te = { name: "NoMatchingStaticPathFound", title: "No static path found for requested path.", message: (e3) => `A \`getStaticPaths()\` route pattern was matched, but no matching static path was found for requested path \`${e3}\`.`, hint: (e3) => `Possible dynamic routes being matched: ${e3.join(", ")}.` };
var Et = { name: "OnlyResponseCanBeReturned", title: "Invalid type returned by Astro page.", message: (e3, t) => `Route \`${e3 || ""}\` returned a \`${t}\`. Only a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) can be returned from Astro files.`, hint: "See https://docs.astro.build/en/guides/server-side-rendering/#response for more information." };
var hn = { name: "MissingMediaQueryDirective", title: "Missing value for `client:media` directive.", message: 'Media query not provided for `client:media` directive. A media query similar to `client:media="(max-width: 600px)"` must be provided' };
var Se = { name: "NoMatchingRenderer", title: "No matching renderer found.", message: (e3, t, r, n) => `Unable to render \`${e3}\`.

${n > 0 ? `There ${r ? "are" : "is"} ${n} renderer${r ? "s" : ""} configured in your \`astro.config.mjs\` file,
but ${r ? "none were" : "it was not"} able to server-side render \`${e3}\`.` : `No valid renderer was found ${t ? `for the \`.${t}\` file extension.` : "for this file extension."}`}`, hint: (e3) => `Did you mean to enable the ${e3} integration?

See https://docs.astro.build/en/guides/framework-components/ for more information on how to install and configure integrations.` };
var Rt = { name: "NoClientEntrypoint", title: "No client entrypoint specified in renderer.", message: (e3, t, r) => `\`${e3}\` component has a \`client:${t}\` directive, but no client entrypoint was provided by \`${r}\`.`, hint: "See https://docs.astro.build/en/reference/integrations-reference/#addrenderer-option for more information on how to configure your renderer." };
var Ae = { name: "NoClientOnlyHint", title: "Missing hint on client:only directive.", message: (e3) => `Unable to render \`${e3}\`. When using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.`, hint: (e3) => `Did you mean to pass \`client:only="${e3}"\`? See https://docs.astro.build/en/reference/directives-reference/#clientonly for more information on client:only` };
var Oe = { name: "InvalidGetStaticPathsEntry", title: "Invalid entry inside getStaticPath's return value", message: (e3) => `Invalid entry returned by getStaticPaths. Expected an object, got \`${e3}\``, hint: "If you're using a `.map` call, you might be looking for `.flatMap()` instead. See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths." };
var ke = { name: "InvalidGetStaticPathsReturn", title: "Invalid value returned by getStaticPaths.", message: (e3) => `Invalid type returned by \`getStaticPaths\`. Expected an \`array\`, got \`${e3}\``, hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths." };
var Ot = { name: "GetStaticPathsExpectedParams", title: "Missing params property on `getStaticPaths` route.", message: "Missing or empty required `params` property on `getStaticPaths` route.", hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths." };
var De = { name: "GetStaticPathsInvalidRouteParam", title: "Invalid value for `getStaticPaths` route parameter.", message: (e3, t, r) => `Invalid getStaticPaths route parameter for \`${e3}\`. Expected undefined, a string or a number, received \`${r}\` (\`${t}\`)`, hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths." };
var kt = { name: "GetStaticPathsRequired", title: "`getStaticPaths()` function required for dynamic routes.", message: "`getStaticPaths()` function is required for dynamic routes. Make sure that you `export` a `getStaticPaths` function from your dynamic route.", hint: 'See https://docs.astro.build/en/guides/routing/#dynamic-routes for more information on dynamic routes.\n\nAlternatively, set `output: "server"` or `output: "hybrid"` in your Astro config file to switch to a non-static server build. This error can also occur if using `export const prerender = true;`.\nSee https://docs.astro.build/en/guides/server-side-rendering/ for more information on non-static rendering.' };
var Ue = { name: "ReservedSlotName", title: "Invalid slot name.", message: (e3) => `Unable to create a slot named \`${e3}\`. \`${e3}\` is a reserved slot name. Please update the name of this slot.` };
var $t = { name: "NoMatchingImport", title: "No import found for component.", message: (e3) => `Could not render \`${e3}\`. No matching import has been found for \`${e3}\`.`, hint: "Please make sure the component is properly imported." };
var He = { name: "PageNumberParamNotFound", title: "Page number param not found.", message: (e3) => `[paginate()] page number param \`${e3}\` not found in your filepath.`, hint: "Rename your file to `[page].astro` or `[...page].astro`." };
var re = { name: "PrerenderDynamicEndpointPathCollide", title: "Prerendered dynamic endpoint has path collision.", message: (e3) => `Could not render \`${e3}\` with an \`undefined\` param as the generated path will collide during prerendering. Prevent passing \`undefined\` as \`params\` for the endpoint's \`getStaticPaths()\` function, or add an additional extension to the endpoint's filename.`, hint: (e3) => `Rename \`${e3}\` to \`${e3.replace(/\.(?:js|ts)/, (t) => ".json" + t)}\`` };
var B = { name: "ResponseSentError", title: "Unable to set response.", message: "The response has already been sent to the browser and cannot be altered." };
var Dt = { name: "MiddlewareNoDataOrNextCalled", title: "The middleware didn't return a `Response`.", message: "Make sure your middleware returns a `Response` object, either directly or by returning the `Response` from calling the `next` function." };
var ne = { name: "MiddlewareNotAResponse", title: "The middleware returned something that is not a `Response` object.", message: "Any data returned from middleware must be a valid `Response` object." };
var se = { name: "LocalsNotAnObject", title: "Value assigned to `locals` is not accepted.", message: "`locals` can only be assigned to an object. Other values like numbers, strings, etc. are not accepted.", hint: "If you tried to remove some information from the `locals` object, try to use `delete` or set the property to `undefined`." };
var Ut = { name: "CantRenderPage", title: "Astro can't render the route.", message: "Astro cannot find any content to render for this route. There is no file or redirect associated with this route.", hint: "If you expect to find a route here, this may be an Astro bug. Please file an issue/restart the dev server" };
function gn(e3) {
  return e3.replace(/\r\n|\r(?!\n)|\n/g, `
`);
}
function yn(e3, t) {
  if (!t || t.line === void 0 || t.column === void 0)
    return "";
  let r = gn(e3).split(`
`).map((a) => a.replace(/\t/g, "  ")), n = [];
  for (let a = -2; a <= 2; a++)
    r[t.line + a] && n.push(t.line + a);
  let s = 0;
  for (let a of n) {
    let i = `> ${a}`;
    i.length > s && (s = i.length);
  }
  let o = "";
  for (let a of n) {
    let i = a === t.line - 1;
    o += i ? "> " : "  ", o += `${a + 1} | ${r[a]}
`, i && (o += `${Array.from({ length: s }).join(" ")}  | ${Array.from({ length: t.column }).join(" ")}^
`);
  }
  return o;
}
var w = class extends Error {
  loc;
  title;
  hint;
  frame;
  type = "AstroError";
  constructor(t, r) {
    let { name: n, title: s, message: o, stack: a, location: i, hint: l, frame: u } = t;
    super(o, r), this.title = s, this.name = n, o && (this.message = o), this.stack = a || this.stack, this.loc = i, this.hint = l, this.frame = u;
  }
  setLocation(t) {
    this.loc = t;
  }
  setName(t) {
    this.name = t;
  }
  setMessage(t) {
    this.message = t;
  }
  setHint(t) {
    this.hint = t;
  }
  setFrame(t, r) {
    this.frame = yn(t, r);
  }
  static is(t) {
    return t.type === "AstroError";
  }
};
var Ht = "4.4.0";
var Fe = "astro.routeData";
var q = "X-Astro-Reroute";
async function Ve(e3, t, r, n) {
  let { request: s, url: o } = t, a = s.method.toUpperCase(), i = e3[a] ?? e3.ALL;
  if (!r && r === false && a !== "GET" && n.warn("router", `${o.pathname} ${Z(a)} requests are not available for a static site. Update your config to \`output: 'server'\` or \`output: 'hybrid'\` to enable.`), i === void 0)
    return n.warn("router", `No API Route handler exists for the method "${a}" for the route "${o.pathname}".
Found handlers: ${Object.keys(e3).map((u) => JSON.stringify(u)).join(", ")}
` + ("all" in e3 ? `One of the exported handlers is "all" (lowercase), did you mean to export 'ALL'?
` : "")), new Response(null, { status: 404 });
  if (typeof i != "function")
    return n.error("router", `The route "${o.pathname}" exports a value for the method "${a}", but it is of the type ${typeof i} instead of a function.`), new Response(null, { status: 500 });
  let l = await i.call(e3, t);
  return (l.status === 404 || l.status === 500) && l.headers.set(q, "no"), l;
}
function ze(e3) {
  return !!e3 && typeof e3 == "object" && typeof e3.then == "function";
}
var V = vt;
var _ = class extends String {
  get [Symbol.toStringTag]() {
    return "HTMLString";
  }
};
var v = (e3) => e3 instanceof _ ? e3 : typeof e3 == "string" ? new _(e3) : e3;
function wn(e3) {
  return Object.prototype.toString.call(e3) === "[object HTMLString]";
}
var Ft = "astro:jsx";
function Pt(e3) {
  return e3 && typeof e3 == "object" && e3[Ft];
}
var Vt = Symbol.for("astro:render");
function $e(e3) {
  return Object.defineProperty(e3, Vt, { value: true });
}
function bn(e3) {
  return e3 && typeof e3 == "object" && e3[Vt];
}
var T = { Value: 0, JSON: 1, RegExp: 2, Date: 3, Map: 4, Set: 5, BigInt: 6, URL: 7, Uint8Array: 8, Uint16Array: 9, Uint32Array: 10 };
function xe(e3, t = {}, r = /* @__PURE__ */ new WeakSet()) {
  if (r.has(e3))
    throw new Error(`Cyclic reference detected while serializing props for <${t.displayName} client:${t.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  r.add(e3);
  let n = e3.map((s) => Wt(s, t, r));
  return r.delete(e3), n;
}
function zt(e3, t = {}, r = /* @__PURE__ */ new WeakSet()) {
  if (r.has(e3))
    throw new Error(`Cyclic reference detected while serializing props for <${t.displayName} client:${t.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  r.add(e3);
  let n = Object.fromEntries(Object.entries(e3).map(([s, o]) => [s, Wt(o, t, r)]));
  return r.delete(e3), n;
}
function Wt(e3, t = {}, r = /* @__PURE__ */ new WeakSet()) {
  switch (Object.prototype.toString.call(e3)) {
    case "[object Date]":
      return [T.Date, e3.toISOString()];
    case "[object RegExp]":
      return [T.RegExp, e3.source];
    case "[object Map]":
      return [T.Map, xe(Array.from(e3), t, r)];
    case "[object Set]":
      return [T.Set, xe(Array.from(e3), t, r)];
    case "[object BigInt]":
      return [T.BigInt, e3.toString()];
    case "[object URL]":
      return [T.URL, e3.toString()];
    case "[object Array]":
      return [T.JSON, xe(e3, t, r)];
    case "[object Uint8Array]":
      return [T.Uint8Array, Array.from(e3)];
    case "[object Uint16Array]":
      return [T.Uint16Array, Array.from(e3)];
    case "[object Uint32Array]":
      return [T.Uint32Array, Array.from(e3)];
    default:
      return e3 !== null && typeof e3 == "object" ? [T.Value, zt(e3, t, r)] : e3 === void 0 ? [T.Value] : [T.Value, e3];
  }
}
function Bt(e3, t) {
  return JSON.stringify(zt(e3, t));
}
var qt = Object.freeze(["data-astro-transition-scope", "data-astro-transition-persist"]);
function vn(e3, t) {
  let r = { isPage: false, hydration: null, props: {}, propsWithoutTransitionAttributes: {} };
  for (let [n, s] of Object.entries(e3))
    if (n.startsWith("server:") && n === "server:root" && (r.isPage = true), n.startsWith("client:"))
      switch (r.hydration || (r.hydration = { directive: "", value: "", componentUrl: "", componentExport: { value: "" } }), n) {
        case "client:component-path": {
          r.hydration.componentUrl = s;
          break;
        }
        case "client:component-export": {
          r.hydration.componentExport.value = s;
          break;
        }
        case "client:component-hydration":
          break;
        case "client:display-name":
          break;
        default: {
          if (r.hydration.directive = n.split(":")[1], r.hydration.value = s, !t.has(r.hydration.directive)) {
            let o = Array.from(t.keys()).map((a) => `client:${a}`).join(", ");
            throw new Error(`Error: invalid hydration directive "${n}". Supported hydration methods: ${o}`);
          }
          if (r.hydration.directive === "media" && typeof r.hydration.value != "string")
            throw new w(hn);
          break;
        }
      }
    else
      r.props[n] = s, qt.includes(n) || (r.propsWithoutTransitionAttributes[n] = s);
  for (let n of Object.getOwnPropertySymbols(e3))
    r.props[n] = e3[n], r.propsWithoutTransitionAttributes[n] = e3[n];
  return r;
}
async function Sn(e3, t) {
  let { renderer: r, result: n, astroId: s, props: o, attrs: a } = e3, { hydrate: i, componentUrl: l, componentExport: u } = t;
  if (!u.value)
    throw new w({ ...$t, message: $t.message(t.displayName) });
  let c = { children: "", props: { uid: s } };
  if (a)
    for (let [f2, A] of Object.entries(a))
      c.props[f2] = V(A);
  c.props["component-url"] = await n.resolve(decodeURI(l)), r.clientEntrypoint && (c.props["component-export"] = u.value, c.props["renderer-url"] = await n.resolve(decodeURI(r.clientEntrypoint)), c.props.props = V(Bt(o, t))), c.props.ssr = "", c.props.client = i;
  let d = await n.resolve("astro:scripts/before-hydration.js");
  return d.length && (c.props["before-hydration-url"] = d), c.props.opts = V(JSON.stringify({ name: t.displayName, value: t.hydrateArgs || "" })), qt.forEach((f2) => {
    o[f2] && (c.props[f2] = o[f2]);
  }), c;
}
var Pe = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
var Ee = Pe.length;
function An(e3) {
  let t = 0;
  if (e3.length === 0)
    return t;
  for (let r = 0; r < e3.length; r++) {
    let n = e3.charCodeAt(r);
    t = (t << 5) - t + n, t = t & t;
  }
  return t;
}
function xn(e3) {
  let t, r = "", n = An(e3), s = n < 0 ? "Z" : "";
  for (n = Math.abs(n); n >= Ee; )
    t = n % Ee, n = Math.floor(n / Ee), r = Pe[t] + r;
  return n > 0 && (r = Pe[n] + r), s + r;
}
function Gt(e3) {
  return e3 == null ? false : e3.isAstroComponentFactory === true;
}
function En(e3, t) {
  let r = t.propagation || "none";
  return t.moduleId && e3.componentMetadata.has(t.moduleId) && r === "none" && (r = e3.componentMetadata.get(t.moduleId).propagation), r === "in-tree" || r === "self";
}
var Rn = Symbol.for("astro.headAndContent");
function We(e3) {
  return typeof e3 == "object" && !!e3[Rn];
}
var $n = '(()=>{var v=Object.defineProperty;var A=(c,s,a)=>s in c?v(c,s,{enumerable:!0,configurable:!0,writable:!0,value:a}):c[s]=a;var d=(c,s,a)=>(A(c,typeof s!="symbol"?s+"":s,a),a);var u;{let c={0:t=>m(t),1:t=>a(t),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(a(t)),5:t=>new Set(a(t)),6:t=>BigInt(t),7:t=>new URL(t),8:t=>new Uint8Array(t),9:t=>new Uint16Array(t),10:t=>new Uint32Array(t)},s=t=>{let[e,n]=t;return e in c?c[e](n):void 0},a=t=>t.map(s),m=t=>typeof t!="object"||t===null?t:Object.fromEntries(Object.entries(t).map(([e,n])=>[e,s(n)]));customElements.get("astro-island")||customElements.define("astro-island",(u=class extends HTMLElement{constructor(){super(...arguments);d(this,"Component");d(this,"hydrator");d(this,"hydrate",async()=>{var f;if(!this.hydrator||!this.isConnected)return;let e=(f=this.parentElement)==null?void 0:f.closest("astro-island[ssr]");if(e){e.addEventListener("astro:hydrate",this.hydrate,{once:!0});return}let n=this.querySelectorAll("astro-slot"),r={},l=this.querySelectorAll("template[data-astro-template]");for(let o of l){let i=o.closest(this.tagName);i!=null&&i.isSameNode(this)&&(r[o.getAttribute("data-astro-template")||"default"]=o.innerHTML,o.remove())}for(let o of n){let i=o.closest(this.tagName);i!=null&&i.isSameNode(this)&&(r[o.getAttribute("name")||"default"]=o.innerHTML)}let h;try{h=this.hasAttribute("props")?m(JSON.parse(this.getAttribute("props"))):{}}catch(o){let i=this.getAttribute("component-url")||"<unknown>",b=this.getAttribute("component-export");throw b&&(i+=` (export ${b})`),console.error(`[hydrate] Error parsing props for component ${i}`,this.getAttribute("props"),o),o}let p;await this.hydrator(this)(this.Component,h,r,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),this.dispatchEvent(new CustomEvent("astro:hydrate"))});d(this,"unmount",()=>{this.isConnected||this.dispatchEvent(new CustomEvent("astro:unmount"))})}disconnectedCallback(){document.removeEventListener("astro:after-swap",this.unmount),document.addEventListener("astro:after-swap",this.unmount,{once:!0})}connectedCallback(){if(!this.hasAttribute("await-children")||document.readyState==="interactive"||document.readyState==="complete")this.childrenConnectedCallback();else{let e=()=>{document.removeEventListener("DOMContentLoaded",e),n.disconnect(),this.childrenConnectedCallback()},n=new MutationObserver(()=>{var r;((r=this.lastChild)==null?void 0:r.nodeType)===Node.COMMENT_NODE&&this.lastChild.nodeValue==="astro:end"&&(this.lastChild.remove(),e())});n.observe(this,{childList:!0}),document.addEventListener("DOMContentLoaded",e)}}async childrenConnectedCallback(){let e=this.getAttribute("before-hydration-url");e&&await import(e),this.start()}async start(){let e=JSON.parse(this.getAttribute("opts")),n=this.getAttribute("client");if(Astro[n]===void 0){window.addEventListener(`astro:${n}`,()=>this.start(),{once:!0});return}try{await Astro[n](async()=>{let r=this.getAttribute("renderer-url"),[l,{default:h}]=await Promise.all([import(this.getAttribute("component-url")),r?import(r):()=>()=>{}]),p=this.getAttribute("component-export")||"default";if(!p.includes("."))this.Component=l[p];else{this.Component=l;for(let y of p.split("."))this.Component=this.Component[y]}return this.hydrator=h,this.hydrate},e,this)}catch(r){console.error(`[astro-island] Error hydrating ${this.getAttribute("component-url")}`,r)}}attributeChangedCallback(){this.hydrate()}},d(u,"observedAttributes",["props"]),u))}})();';
var Pn = "<style>astro-island,astro-slot,astro-static-slot{display:contents}</style>";
function Ln(e3) {
  return e3._metadata.hasHydrationScript ? false : e3._metadata.hasHydrationScript = true;
}
function jn(e3, t) {
  return e3._metadata.hasDirectives.has(t) ? false : (e3._metadata.hasDirectives.add(t), true);
}
function Lt(e3, t) {
  let n = e3.clientDirectives.get(t);
  if (!n)
    throw new Error(`Unknown directive: ${t}`);
  return n;
}
function Tn(e3, t, r) {
  switch (t) {
    case "both":
      return `${Pn}<script>${Lt(e3, r)};${$n}<\/script>`;
    case "directive":
      return `<script>${Lt(e3, r)}<\/script>`;
  }
  return "";
}
var Be = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i;
var Cn = /^(?:allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i;
var In = /^(?:contenteditable|draggable|spellcheck|value)$/i;
var Mn = /^(?:autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i;
var _n = /* @__PURE__ */ new Set(["set:html", "set:text"]);
var Nn = (e3) => e3.trim().replace(/(?!^)\b\w|\s+|\W+/g, (t, r) => /\W/.test(t) ? "" : r === 0 ? t : t.toUpperCase());
var D = (e3, t = true) => t ? String(e3).replace(/&/g, "&#38;").replace(/"/g, "&#34;") : e3;
var On = (e3) => e3.toLowerCase() === e3 ? e3 : e3.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
var jt = (e3) => Object.entries(e3).filter(([t, r]) => typeof r == "string" && r.trim() || typeof r == "number").map(([t, r]) => t[0] !== "-" && t[1] !== "-" ? `${On(t)}:${r}` : `${t}:${r}`).join(";");
function kn(e3) {
  let t = "";
  for (let [r, n] of Object.entries(e3))
    t += `const ${Nn(r)} = ${JSON.stringify(n)?.replace(/<\/script>/g, "\\x3C/script>")};
`;
  return v(t);
}
function Tt(e3) {
  return e3.length === 1 ? e3[0] : `${e3.slice(0, -1).join(", ")} or ${e3[e3.length - 1]}`;
}
function Jt(e3, t, r = true) {
  if (e3 == null)
    return "";
  if (e3 === false)
    return In.test(t) || Mn.test(t) ? v(` ${t}="false"`) : "";
  if (_n.has(t))
    return console.warn(`[astro] The "${t}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${t}={value}\`) instead of the dynamic spread syntax (\`{...{ "${t}": value }}\`).`), "";
  if (t === "class:list") {
    let n = D(be(e3), r);
    return n === "" ? "" : v(` ${t.slice(0, -5)}="${n}"`);
  }
  if (t === "style" && !(e3 instanceof _)) {
    if (Array.isArray(e3) && e3.length === 2)
      return v(` ${t}="${D(`${jt(e3[0])};${e3[1]}`, r)}"`);
    if (typeof e3 == "object")
      return v(` ${t}="${D(jt(e3), r)}"`);
  }
  return t === "className" ? v(` class="${D(e3, r)}"`) : e3 === true && (t.startsWith("data-") || Cn.test(t)) ? v(` ${t}`) : v(` ${t}="${D(e3, r)}"`);
}
function Le(e3, t = true) {
  let r = "";
  for (let [n, s] of Object.entries(e3))
    r += Jt(s, n, t);
  return v(r);
}
function F(e3, { props: t, children: r = "" }, n = true) {
  let { lang: s, "data-astro-id": o, "define:vars": a, ...i } = t;
  return a && (e3 === "style" && (delete i["is:global"], delete i["is:scoped"]), e3 === "script" && (delete i.hoist, r = kn(a) + `
` + r)), (r == null || r == "") && Be.test(e3) ? `<${e3}${Le(i, n)} />` : `<${e3}${Le(i, n)}>${r}</${e3}>`;
}
function Yt(e3) {
  let t = [], r = { write: (s) => t.push(s) }, n = e3(r);
  return { async renderToFinalDestination(s) {
    for (let o of t)
      s.write(o);
    r.write = (o) => s.write(o), await n;
  } };
}
var Dn = typeof process < "u" && Object.prototype.toString.call(process) === "[object process]";
function Ct() {
  let e3, t;
  return { promise: new Promise((n, s) => {
    e3 = n, t = s;
  }), resolve: e3, reject: t };
}
var Re = (e3, t, r) => {
  let n = JSON.stringify(e3.props), s = e3.children;
  return t === r.findIndex((o) => JSON.stringify(o.props) === n && o.children == s);
};
function It(e3) {
  e3._metadata.hasRenderedHead = true;
  let t = Array.from(e3.styles).filter(Re).map((o) => o.props.rel === "stylesheet" ? F("link", o) : F("style", o));
  e3.styles.clear();
  let r = Array.from(e3.scripts).filter(Re).map((o) => F("script", o, false)), n = Array.from(e3.links).filter(Re).map((o) => F("link", o, false)), s = t.join(`
`) + n.join(`
`) + r.join(`
`);
  if (e3._metadata.extraHead.length > 0)
    for (let o of e3._metadata.extraHead)
      s += o;
  return v(s);
}
function* Un() {
  yield $e({ type: "maybe-head" });
}
var je = Symbol.for("astro:slot-string");
var ee = class extends _ {
  instructions;
  [je];
  constructor(t, r) {
    super(t), this.instructions = r, this[je] = true;
  }
};
function Hn(e3) {
  return !!e3[je];
}
function Kt(e3, t, r) {
  return !t && r ? Kt(e3, r) : { async render(n) {
    await U(n, typeof t == "function" ? t(e3) : t);
  } };
}
async function N(e3, t, r) {
  let n = "", s = null, o = { write(i) {
    i instanceof Response || (typeof i == "object" && "type" in i && typeof i.type == "string" ? (s === null && (s = []), s.push(i)) : n += I(e3, i));
  } };
  return await Kt(e3, t, r).render(o), v(new ee(n, s));
}
async function Xt(e3, t = {}) {
  let r = null, n = {};
  return t && await Promise.all(Object.entries(t).map(([s, o]) => N(e3, o).then((a) => {
    a.instructions && (r === null && (r = []), r.push(...a.instructions)), n[s] = a;
  }))), { slotInstructions: r, children: n };
}
var Fn = Symbol.for("astro:fragment");
var Mt = Symbol.for("astro:renderer");
var z = new TextEncoder();
var Vn = new TextDecoder();
function qe(e3, t) {
  if (bn(t)) {
    let r = t;
    switch (r.type) {
      case "directive": {
        let { hydration: n } = r, s = n && Ln(e3), o = n && jn(e3, n.directive), a = s ? "both" : o ? "directive" : null;
        if (a) {
          let i = Tn(e3, a, n.directive);
          return v(i);
        } else
          return "";
      }
      case "head":
        return e3._metadata.hasRenderedHead || e3.partial ? "" : It(e3);
      case "maybe-head":
        return e3._metadata.hasRenderedHead || e3._metadata.headInTree || e3.partial ? "" : It(e3);
      case "renderer-hydration-script": {
        let { rendererSpecificHydrationScripts: n } = e3._metadata, { rendererName: s } = r;
        return n.has(s) ? "" : (n.add(s), r.render());
      }
      default:
        throw new Error(`Unknown chunk type: ${t.type}`);
    }
  } else {
    if (t instanceof Response)
      return "";
    if (Hn(t)) {
      let r = "", n = t;
      if (n.instructions)
        for (let s of n.instructions)
          r += qe(e3, s);
      return r += t.toString(), r;
    }
  }
  return t.toString();
}
function I(e3, t) {
  return ArrayBuffer.isView(t) ? Vn.decode(t) : qe(e3, t);
}
function Qt(e3, t) {
  if (ArrayBuffer.isView(t))
    return t;
  {
    let r = qe(e3, t);
    return z.encode(r.toString());
  }
}
function zn(e3) {
  return !!e3 && typeof e3 == "object" && "render" in e3 && typeof e3.render == "function";
}
async function U(e3, t) {
  if (t = await t, t instanceof ee)
    e3.write(t);
  else if (wn(t))
    e3.write(t);
  else if (Array.isArray(t)) {
    let r = t.map((n) => Yt((s) => U(s, n)));
    for (let n of r)
      n && await n.renderToFinalDestination(e3);
  } else if (typeof t == "function")
    await U(e3, t());
  else if (typeof t == "string")
    e3.write(v(V(t)));
  else if (!(!t && t !== 0))
    if (zn(t))
      await t.render(e3);
    else if (tr(t))
      await t.render(e3);
    else if (qn(t))
      await t.render(e3);
    else if (ArrayBuffer.isView(t))
      e3.write(t);
    else if (typeof t == "object" && (Symbol.asyncIterator in t || Symbol.iterator in t))
      for await (let r of t)
        await U(e3, r);
    else
      e3.write(t);
}
var Zt = Symbol.for("astro.componentInstance");
var Te = class {
  [Zt] = true;
  result;
  props;
  slotValues;
  factory;
  returnValue;
  constructor(t, r, n, s) {
    this.result = t, this.props = r, this.factory = s, this.slotValues = {};
    for (let o in n) {
      let a = false, i = n[o](t);
      this.slotValues[o] = () => a ? n[o](t) : (a = true, i);
    }
  }
  async init(t) {
    return this.returnValue !== void 0 ? this.returnValue : (this.returnValue = this.factory(t, this.props, this.slotValues), this.returnValue);
  }
  async render(t) {
    this.returnValue === void 0 && await this.init(this.result);
    let r = this.returnValue;
    ze(r) && (r = await r), We(r) ? await r.content.render(t) : await U(t, r);
  }
};
function Wn(e3, t) {
  if (e3 != null)
    for (let r of Object.keys(e3))
      r.startsWith("client:") && console.warn(`You are attempting to render <${t} ${r} />, but ${t} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`);
}
function Bn(e3, t, r, n, s = {}) {
  Wn(n, t);
  let o = new Te(e3, n, s, r);
  return En(e3, r) && e3._metadata.propagators.add(o), o;
}
function qn(e3) {
  return typeof e3 == "object" && !!e3[Zt];
}
var er = Symbol.for("astro.renderTemplateResult");
var Ce = class {
  [er] = true;
  htmlParts;
  expressions;
  error;
  constructor(t, r) {
    this.htmlParts = t, this.error = void 0, this.expressions = r.map((n) => ze(n) ? Promise.resolve(n).catch((s) => {
      if (!this.error)
        throw this.error = s, s;
    }) : n);
  }
  async render(t) {
    let r = this.expressions.map((n) => Yt((s) => {
      if (n || n === 0)
        return U(s, n);
    }));
    for (let n = 0; n < this.htmlParts.length; n++) {
      let s = this.htmlParts[n], o = r[n];
      t.write(v(s)), o && await o.renderToFinalDestination(t);
    }
  }
};
function tr(e3) {
  return typeof e3 == "object" && !!e3[er];
}
function Gn(e3, ...t) {
  return new Ce(e3, t);
}
var Ge = /<!doctype html/i;
async function rr(e3, t, r, n, s = false, o) {
  let a = await Je(e3, t, r, n, o);
  if (a instanceof Response)
    return a;
  let i = "", l = false, u = { write(c) {
    if (s && !l && (l = true, !e3.partial && !Ge.test(String(c)))) {
      let d = e3.compressHTML ? "<!DOCTYPE html>" : `<!DOCTYPE html>
`;
      i += d;
    }
    c instanceof Response || (i += I(e3, c));
  } };
  return await a.render(u), i;
}
async function Jn(e3, t, r, n, s = false, o) {
  let a = await Je(e3, t, r, n, o);
  if (a instanceof Response)
    return a;
  let i = false;
  return s && await nr(e3), new ReadableStream({ start(l) {
    let u = { write(c) {
      if (s && !i && (i = true, !e3.partial && !Ge.test(String(c)))) {
        let f2 = e3.compressHTML ? "<!DOCTYPE html>" : `<!DOCTYPE html>
`;
        l.enqueue(z.encode(f2));
      }
      if (c instanceof Response)
        throw new w({ ...B });
      let d = Qt(e3, c);
      l.enqueue(d);
    } };
    (async () => {
      try {
        await a.render(u), l.close();
      } catch (c) {
        w.is(c) && !c.loc && c.setLocation({ file: o?.component }), setTimeout(() => l.error(c), 0);
      }
    })();
  } });
}
async function Je(e3, t, r, n, s) {
  let o = await t(e3, r, n);
  if (o instanceof Response)
    return o;
  if (!tr(o))
    throw new w({ ...Et, message: Et.message(s?.route, typeof o), location: { file: s?.component } });
  return We(o) ? o.content : o;
}
async function nr(e3) {
  let t = e3._metadata.propagators.values();
  for (; ; ) {
    let { value: r, done: n } = t.next();
    if (n)
      break;
    let s = await r.init(e3);
    We(s) && e3._metadata.extraHead.push(s.head);
  }
}
async function Yn(e3, t, r, n, s = false, o) {
  let a = await Je(e3, t, r, n, o);
  if (a instanceof Response)
    return a;
  let i = false;
  s && await nr(e3);
  let l = null, u = Ct(), c = [], d = { async next() {
    if (await u.promise, l)
      throw l;
    let h = 0;
    for (let y2 = 0, $ = c.length; y2 < $; y2++)
      h += c[y2].length;
    let g2 = new Uint8Array(h), p2 = 0;
    for (let y2 = 0, $ = c.length; y2 < $; y2++) {
      let E3 = c[y2];
      g2.set(E3, p2), p2 += E3.length;
    }
    return c.length = 0, { done: h === 0, value: g2 };
  } }, f2 = { write(h) {
    if (s && !i && (i = true, !e3.partial && !Ge.test(String(h)))) {
      let p2 = e3.compressHTML ? "<!DOCTYPE html>" : `<!DOCTYPE html>
`;
      c.push(z.encode(p2));
    }
    if (h instanceof Response)
      throw new w(B);
    let g2 = Qt(e3, h);
    g2.length > 0 && (c.push(g2), u.resolve(), u = Ct());
  } };
  return a.render(f2).then(() => {
    u.resolve();
  }).catch((h) => {
    l = h, u.resolve();
  }), { [Symbol.asyncIterator]() {
    return d;
  } };
}
function Kn(e3) {
  return typeof HTMLElement < "u" && HTMLElement.isPrototypeOf(e3);
}
async function Xn(e3, t, r, n) {
  let s = Qn(t), o = "";
  for (let a in r)
    o += ` ${a}="${D(await r[a])}"`;
  return v(`<${s}${o}>${await N(e3, n?.default)}</${s}>`);
}
function Qn(e3) {
  let t = customElements.getName(e3);
  return t || e3.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
}
var Zn = Symbol.for("astro.needsHeadRendering");
var _t = /* @__PURE__ */ new Map([["solid", "solid-js"]]);
function es(e3) {
  switch (e3?.split(".").pop()) {
    case "svelte":
      return ["@astrojs/svelte"];
    case "vue":
      return ["@astrojs/vue"];
    case "jsx":
    case "tsx":
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/solid-js", "@astrojs/vue (jsx)"];
    default:
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/solid-js", "@astrojs/vue", "@astrojs/svelte", "@astrojs/lit"];
  }
}
function ts(e3) {
  return e3 === Fn;
}
function rs(e3) {
  return e3 && e3["astro:html"] === true;
}
var ns = /<\/?astro-slot\b[^>]*>/g;
var ss = /<\/?astro-static-slot\b[^>]*>/g;
function os(e3, t) {
  let r = t ? ss : ns;
  return e3.replace(r, "");
}
async function as(e3, t, r, n, s = {}) {
  if (!r && !n["client:only"])
    throw new Error(`Unable to render ${t} because it is ${r}!
Did you forget to import the component or is it possible there is a typo?`);
  let { renderers: o, clientDirectives: a } = e3, i = { astroStaticSlot: true, displayName: t }, { hydration: l, isPage: u, props: c, propsWithoutTransitionAttributes: d } = vn(n, a), f2 = "", A;
  l && (i.hydrate = l.directive, i.hydrateArgs = l.value, i.componentExport = l.componentExport, i.componentUrl = l.componentUrl);
  let h = es(i.componentUrl), g2 = o.filter((m2) => m2.name !== "astro:jsx"), { children: p2, slotInstructions: b2 } = await Xt(e3, s), y2;
  if (i.hydrate !== "only") {
    let m2 = false;
    try {
      m2 = r && r[Mt];
    } catch {
    }
    if (m2) {
      let S = r[Mt];
      y2 = o.find(({ name: R2 }) => R2 === S);
    }
    if (!y2) {
      let S;
      for (let R2 of o)
        try {
          if (await R2.ssr.check.call({ result: e3 }, r, c, p2)) {
            y2 = R2;
            break;
          }
        } catch (H2) {
          S ??= H2;
        }
      if (!y2 && S)
        throw S;
    }
    if (!y2 && typeof HTMLElement == "function" && Kn(r)) {
      let S = await Xn(e3, r, n, s);
      return { render(R2) {
        R2.write(S);
      } };
    }
  } else {
    if (i.hydrateArgs) {
      let m2 = i.hydrateArgs, S = _t.has(m2) ? _t.get(m2) : m2;
      y2 = o.find(({ name: R2 }) => R2 === `@astrojs/${S}` || R2 === S);
    }
    if (!y2 && g2.length === 1 && (y2 = g2[0]), !y2) {
      let m2 = i.componentUrl?.split(".").pop();
      y2 = o.filter(({ name: S }) => S === `@astrojs/${m2}` || S === m2)[0];
    }
  }
  if (y2)
    i.hydrate === "only" ? f2 = await N(e3, s?.fallback) : (performance.now(), { html: f2, attrs: A } = await y2.ssr.renderToStaticMarkup.call({ result: e3 }, r, d, p2, i));
  else {
    if (i.hydrate === "only")
      throw new w({ ...Ae, message: Ae.message(i.displayName), hint: Ae.hint(h.map((m2) => m2.replace("@astrojs/", "")).join("|")) });
    if (typeof r != "string") {
      let m2 = g2.filter((R2) => h.includes(R2.name)), S = g2.length > 1;
      if (m2.length === 0)
        throw new w({ ...Se, message: Se.message(i.displayName, i?.componentUrl?.split(".").pop(), S, g2.length), hint: Se.hint(Tt(h.map((R2) => "`" + R2 + "`"))) });
      if (m2.length === 1)
        y2 = m2[0], { html: f2, attrs: A } = await y2.ssr.renderToStaticMarkup.call({ result: e3 }, r, d, p2, i);
      else
        throw new Error(`Unable to render ${i.displayName}!

This component likely uses ${Tt(h)},
but Astro encountered an error during server-side rendering.

Please ensure that ${i.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
    }
  }
  if (y2 && !y2.clientEntrypoint && y2.name !== "@astrojs/lit" && i.hydrate)
    throw new w({ ...Rt, message: Rt.message(t, i.hydrate, y2.name) });
  if (!f2 && typeof r == "string") {
    let m2 = is(r), S = Object.values(p2).join(""), R2 = Gn`<${m2}${Le(c)}${v(S === "" && Be.test(m2) ? "/>" : `>${S}</${m2}>`)}`;
    f2 = "";
    let H2 = { write(dt2) {
      dt2 instanceof Response || (f2 += I(e3, dt2));
    } };
    await R2.render(H2);
  }
  if (!l)
    return { render(m2) {
      if (b2)
        for (let S of b2)
          m2.write(S);
      u || y2?.name === "astro:jsx" ? m2.write(f2) : f2 && f2.length > 0 && m2.write(v(os(f2, y2?.ssr?.supportsAstroStaticSlot ?? false)));
    } };
  let $ = xn(`<!--${i.componentExport.value}:${i.componentUrl}-->
${f2}
${Bt(c, i)}`), E3 = await Sn({ renderer: y2, result: e3, astroId: $, props: c, attrs: A }, i), L3 = [];
  if (f2) {
    if (Object.keys(p2).length > 0)
      for (let m2 of Object.keys(p2)) {
        let S = y2?.ssr?.supportsAstroStaticSlot ? i.hydrate ? "astro-slot" : "astro-static-slot" : "astro-slot", R2 = m2 === "default" ? `<${S}>` : `<${S} name="${m2}">`;
        f2.includes(R2) || L3.push(m2);
      }
  } else
    L3 = Object.keys(p2);
  let j2 = L3.length > 0 ? L3.map((m2) => `<template data-astro-template${m2 !== "default" ? `="${m2}"` : ""}>${p2[m2]}</template>`).join("") : "";
  return E3.children = `${f2 ?? ""}${j2}`, E3.children && (E3.props["await-children"] = "", E3.children += "<!--astro:end-->"), { render(m2) {
    if (b2)
      for (let S of b2)
        m2.write(S);
    m2.write($e({ type: "directive", hydration: l })), l.directive !== "only" && y2?.ssr.renderHydrationScript && m2.write($e({ type: "renderer-hydration-script", rendererName: y2.name, render: y2.ssr.renderHydrationScript })), m2.write(v(F("astro-island", E3, false)));
  } };
}
function is(e3) {
  let t = /[&<>'"\s]+/;
  return t.test(e3) ? e3.trim().split(t)[0].trim() : e3;
}
async function cs(e3, t = {}) {
  let r = await N(e3, t?.default);
  return { render(n) {
    r != null && n.write(r);
  } };
}
async function ls(e3, t, r, n = {}) {
  let { slotInstructions: s, children: o } = await Xt(e3, n), a = t({ slots: o }), i = s ? s.map((l) => I(e3, l)).join("") : "";
  return { render(l) {
    l.write(v(i + a));
  } };
}
function us(e3, t, r, n, s = {}) {
  let o = Bn(e3, t, r, n, s);
  return { async render(a) {
    await o.render(a);
  } };
}
async function ds(e3, t, r, n, s = {}) {
  return ze(r) && (r = await r), ts(r) ? await cs(e3, s) : (n = fs(n), rs(r) ? await ls(e3, r, n, s) : Gt(r) ? us(e3, t, r, n, s) : await as(e3, t, r, n, s));
}
function fs(e3) {
  if (e3["class:list"] !== void 0) {
    let t = e3["class:list"];
    delete e3["class:list"], e3.class = be(e3.class, t), e3.class === "" && delete e3.class;
  }
  return e3;
}
async function Ie(e3, t, r, n, s = {}, o = false, a) {
  let i = "", l = false, u = "";
  if (ps(r))
    for (let c of Un())
      u += I(e3, c);
  try {
    let c = { write(f2) {
      if (o && !l && (l = true, !e3.partial && !/<!doctype html/i.test(String(f2)))) {
        let A = e3.compressHTML ? "<!DOCTYPE html>" : `<!DOCTYPE html>
`;
        i += A + u;
      }
      f2 instanceof Response || (i += I(e3, f2));
    } };
    await (await ds(e3, t, r, n, s)).render(c);
  } catch (c) {
    throw w.is(c) && !c.loc && c.setLocation({ file: a?.component }), c;
  }
  return i;
}
function ps(e3) {
  return !!e3?.[Zn];
}
var Nt = "astro-client-only";
var _a;
var M = (_a = class {
  constructor(t) {
    this.vnode = t, this.count = 0;
  }
  count;
  increment() {
    this.count++;
  }
  haveNoTried() {
    return this.count === 0;
  }
  isCompleted() {
    return this.count > 2;
  }
}, __publicField(_a, "symbol", Symbol("astro:jsx:skip")), _a);
var Me;
var Ye = 0;
async function C(e3, t) {
  switch (true) {
    case t instanceof _:
      return t.toString().trim() === "" ? "" : t;
    case typeof t == "string":
      return v(V(t));
    case typeof t == "function":
      return t;
    case (!t && t !== 0):
      return "";
    case Array.isArray(t):
      return v((await Promise.all(t.map((n) => C(e3, n)))).join(""));
  }
  let r;
  return t.props ? t.props[M.symbol] ? r = t.props[M.symbol] : r = new M(t) : r = new M(t), _e(e3, t, r);
}
async function _e(e3, t, r) {
  if (Pt(t)) {
    switch (true) {
      case !t.type:
        throw new Error(`Unable to render ${e3.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`);
      case t.type === Symbol.for("astro:fragment"):
        return C(e3, t.props.children);
      case t.type.isAstroComponentFactory: {
        let n = {}, s = {};
        for (let [i, l] of Object.entries(t.props ?? {}))
          i === "children" || l && typeof l == "object" && l.$$slot ? s[i === "children" ? "default" : i] = () => C(e3, l) : n[i] = l;
        let o = await rr(e3, t.type, n, s);
        if (o instanceof Response)
          throw o;
        return v(o);
      }
      case (!t.type && t.type !== 0):
        return "";
      case (typeof t.type == "string" && t.type !== Nt):
        return v(await ms(e3, t.type, t.props ?? {}));
    }
    if (t.type) {
      let n = function(c) {
        if (Array.isArray(c))
          return c.map((d) => n(d));
        if (!Pt(c)) {
          a.default.push(c);
          return;
        }
        if ("slot" in c.props) {
          a[c.props.slot] = [...a[c.props.slot] ?? [], c], delete c.props.slot;
          return;
        }
        a.default.push(c);
      };
      if (typeof t.type == "function" && t.type["astro:renderer"] && r.increment(), typeof t.type == "function" && t.props["server:root"]) {
        let c = await t.type(t.props ?? {});
        return await C(e3, c);
      }
      if (typeof t.type == "function")
        if (r.haveNoTried() || r.isCompleted()) {
          gs();
          try {
            let c = await t.type(t.props ?? {}), d;
            if (c?.[Ft])
              return d = await _e(e3, c, r), d;
            if (!c)
              return d = await _e(e3, c, r), d;
          } catch (c) {
            if (r.isCompleted())
              throw c;
            r.increment();
          } finally {
            ys();
          }
        } else
          r.increment();
      let { children: s = null, ...o } = t.props ?? {}, a = { default: [] };
      n(s);
      for (let [c, d] of Object.entries(o))
        d.$$slot && (a[c] = d, delete o[c]);
      let i = [], l = {};
      for (let [c, d] of Object.entries(a))
        i.push(C(e3, d).then((f2) => {
          f2.toString().trim().length !== 0 && (l[c] = () => f2);
        }));
      await Promise.all(i), o[M.symbol] = r;
      let u;
      return t.type === Nt && t.props["client:only"] ? u = await Ie(e3, t.props["client:display-name"] ?? "", null, o, l) : u = await Ie(e3, typeof t.type == "function" ? t.type.name : t.type, t.type, o, l), v(u);
    }
  }
  return v(`${t}`);
}
async function ms(e3, t, { children: r, ...n }) {
  return v(`<${t}${bs(n)}${v((r == null || r == "") && Be.test(t) ? "/>" : `>${r == null ? "" : await C(e3, hs(t, r))}</${t}>`)}`);
}
function hs(e3, t) {
  return typeof t == "string" && (e3 === "style" || e3 === "script") ? v(t) : t;
}
function gs() {
  if (Ye++, !Me) {
    Me = console.error;
    try {
      console.error = ws;
    } catch {
    }
  }
}
function ys() {
  Ye--;
}
function ws(e3, ...t) {
  Ye > 0 && typeof e3 == "string" && e3.includes("Warning: Invalid hook call.") && e3.includes("https://reactjs.org/link/invalid-hook-call") || Me(e3, ...t);
}
async function sr(e3, t, r, n, s, o) {
  if (!Gt(t)) {
    e3._metadata.headInTree = e3.componentMetadata.get(t.moduleId)?.containsHead ?? false;
    let c = { ...r ?? {}, "server:root": true }, d = await Ie(e3, t.name, t, c, {}, true, o), f2 = z.encode(d);
    return new Response(f2, { headers: new Headers([["Content-Type", "text/html; charset=utf-8"], ["Content-Length", f2.byteLength.toString()]]) });
  }
  e3._metadata.headInTree = e3.componentMetadata.get(t.moduleId)?.containsHead ?? false;
  let a;
  if (s ? Dn ? a = await Yn(e3, t, r, n, true, o) : a = await Jn(e3, t, r, n, true, o) : a = await rr(e3, t, r, n, true, o), a instanceof Response)
    return a;
  let i = e3.response, l = new Headers(i.headers);
  return !s && typeof a == "string" && (a = z.encode(a), l.set("Content-Length", a.byteLength.toString())), o?.component.endsWith(".md") && l.set("Content-Type", "text/html; charset=utf-8"), new Response(a, { ...i, headers: l });
}
"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_".split("").reduce((e3, t) => (e3[t.charCodeAt(0)] = t, e3), []);
"-0123456789_".split("").reduce((e3, t) => (e3[t.charCodeAt(0)] = t, e3), []);
function bs(e3 = {}, t, { class: r } = {}) {
  let n = "";
  r && (typeof e3.class < "u" ? e3.class += ` ${r}` : typeof e3["class:list"] < "u" ? e3["class:list"] = [e3["class:list"], r] : e3.class = r);
  for (let [s, o] of Object.entries(e3))
    n += Jt(o, s, true);
  return v(n);
}
function vs(e3) {
  for (var t = [], r = 0; r < e3.length; ) {
    var n = e3[r];
    if (n === "*" || n === "+" || n === "?") {
      t.push({ type: "MODIFIER", index: r, value: e3[r++] });
      continue;
    }
    if (n === "\\") {
      t.push({ type: "ESCAPED_CHAR", index: r++, value: e3[r++] });
      continue;
    }
    if (n === "{") {
      t.push({ type: "OPEN", index: r, value: e3[r++] });
      continue;
    }
    if (n === "}") {
      t.push({ type: "CLOSE", index: r, value: e3[r++] });
      continue;
    }
    if (n === ":") {
      for (var s = "", o = r + 1; o < e3.length; ) {
        var a = e3.charCodeAt(o);
        if (a >= 48 && a <= 57 || a >= 65 && a <= 90 || a >= 97 && a <= 122 || a === 95) {
          s += e3[o++];
          continue;
        }
        break;
      }
      if (!s)
        throw new TypeError("Missing parameter name at ".concat(r));
      t.push({ type: "NAME", index: r, value: s }), r = o;
      continue;
    }
    if (n === "(") {
      var i = 1, l = "", o = r + 1;
      if (e3[o] === "?")
        throw new TypeError('Pattern cannot start with "?" at '.concat(o));
      for (; o < e3.length; ) {
        if (e3[o] === "\\") {
          l += e3[o++] + e3[o++];
          continue;
        }
        if (e3[o] === ")") {
          if (i--, i === 0) {
            o++;
            break;
          }
        } else if (e3[o] === "(" && (i++, e3[o + 1] !== "?"))
          throw new TypeError("Capturing groups are not allowed at ".concat(o));
        l += e3[o++];
      }
      if (i)
        throw new TypeError("Unbalanced pattern at ".concat(r));
      if (!l)
        throw new TypeError("Missing pattern at ".concat(r));
      t.push({ type: "PATTERN", index: r, value: l }), r = o;
      continue;
    }
    t.push({ type: "CHAR", index: r, value: e3[r++] });
  }
  return t.push({ type: "END", index: r, value: "" }), t;
}
function Ss(e3, t) {
  t === void 0 && (t = {});
  for (var r = vs(e3), n = t.prefixes, s = n === void 0 ? "./" : n, o = "[^".concat(xs(t.delimiter || "/#?"), "]+?"), a = [], i = 0, l = 0, u = "", c = function(j2) {
    if (l < r.length && r[l].type === j2)
      return r[l++].value;
  }, d = function(j2) {
    var m2 = c(j2);
    if (m2 !== void 0)
      return m2;
    var S = r[l], R2 = S.type, H2 = S.index;
    throw new TypeError("Unexpected ".concat(R2, " at ").concat(H2, ", expected ").concat(j2));
  }, f2 = function() {
    for (var j2 = "", m2; m2 = c("CHAR") || c("ESCAPED_CHAR"); )
      j2 += m2;
    return j2;
  }; l < r.length; ) {
    var A = c("CHAR"), h = c("NAME"), g2 = c("PATTERN");
    if (h || g2) {
      var p2 = A || "";
      s.indexOf(p2) === -1 && (u += p2, p2 = ""), u && (a.push(u), u = ""), a.push({ name: h || i++, prefix: p2, suffix: "", pattern: g2 || o, modifier: c("MODIFIER") || "" });
      continue;
    }
    var b2 = A || c("ESCAPED_CHAR");
    if (b2) {
      u += b2;
      continue;
    }
    u && (a.push(u), u = "");
    var y2 = c("OPEN");
    if (y2) {
      var p2 = f2(), $ = c("NAME") || "", E3 = c("PATTERN") || "", L3 = f2();
      d("CLOSE"), a.push({ name: $ || (E3 ? i++ : ""), pattern: $ && !E3 ? o : E3, prefix: p2, suffix: L3, modifier: c("MODIFIER") || "" });
      continue;
    }
    d("END");
  }
  return a;
}
function or(e3, t) {
  return As(Ss(e3, t), t);
}
function As(e3, t) {
  t === void 0 && (t = {});
  var r = Es(t), n = t.encode, s = n === void 0 ? function(l) {
    return l;
  } : n, o = t.validate, a = o === void 0 ? true : o, i = e3.map(function(l) {
    if (typeof l == "object")
      return new RegExp("^(?:".concat(l.pattern, ")$"), r);
  });
  return function(l) {
    for (var u = "", c = 0; c < e3.length; c++) {
      var d = e3[c];
      if (typeof d == "string") {
        u += d;
        continue;
      }
      var f2 = l ? l[d.name] : void 0, A = d.modifier === "?" || d.modifier === "*", h = d.modifier === "*" || d.modifier === "+";
      if (Array.isArray(f2)) {
        if (!h)
          throw new TypeError('Expected "'.concat(d.name, '" to not repeat, but got an array'));
        if (f2.length === 0) {
          if (A)
            continue;
          throw new TypeError('Expected "'.concat(d.name, '" to not be empty'));
        }
        for (var g2 = 0; g2 < f2.length; g2++) {
          var p2 = s(f2[g2], d);
          if (a && !i[c].test(p2))
            throw new TypeError('Expected all "'.concat(d.name, '" to match "').concat(d.pattern, '", but got "').concat(p2, '"'));
          u += d.prefix + p2 + d.suffix;
        }
        continue;
      }
      if (typeof f2 == "string" || typeof f2 == "number") {
        var p2 = s(String(f2), d);
        if (a && !i[c].test(p2))
          throw new TypeError('Expected "'.concat(d.name, '" to match "').concat(d.pattern, '", but got "').concat(p2, '"'));
        u += d.prefix + p2 + d.suffix;
        continue;
      }
      if (!A) {
        var b2 = h ? "an array" : "a string";
        throw new TypeError('Expected "'.concat(d.name, '" to be ').concat(b2));
      }
    }
    return u;
  };
}
function xs(e3) {
  return e3.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function Es(e3) {
  return e3 && e3.sensitive ? "" : "i";
}
var Rs = new Intl.DateTimeFormat([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
var G = { debug: 20, info: 30, warn: 40, error: 50, silent: 90 };
function Ke(e3, t, r, n, s = true) {
  let o = e3.level, a = e3.dest, i = { label: r, level: t, message: n, newLine: s };
  $s(o, t) && a.write(i);
}
function $s(e3, t) {
  return G[e3] <= G[t];
}
function ar(e3, t, r, n = true) {
  return Ke(e3, "info", t, r, n);
}
function ir(e3, t, r, n = true) {
  return Ke(e3, "warn", t, r, n);
}
function cr(e3, t, r, n = true) {
  return Ke(e3, "error", t, r, n);
}
function lr(...e3) {
  "_astroGlobalDebug" in globalThis && globalThis._astroGlobalDebug(...e3);
}
function ur({ level: e3, label: t }) {
  let r = `${Rs.format(/* @__PURE__ */ new Date())}`, n = [];
  return e3 === "error" || e3 === "warn" ? (n.push(Z(r)), n.push(`[${e3.toUpperCase()}]`)) : n.push(r), t && n.push(`[${t}]`), e3 === "error" ? yt(n.join(" ")) : e3 === "warn" ? wt(n.join(" ")) : n.length === 1 ? we(n[0]) : we(n[0]) + " " + bt(n.splice(1).join(" "));
}
if (typeof process < "u") {
  let e3 = process;
  "argv" in e3 && Array.isArray(e3.argv) && (e3.argv.includes("--verbose") || e3.argv.includes("--silent"));
}
var oe = class {
  options;
  constructor(t) {
    this.options = t;
  }
  info(t, r, n = true) {
    ar(this.options, t, r, n);
  }
  warn(t, r, n = true) {
    ir(this.options, t, r, n);
  }
  error(t, r, n = true) {
    cr(this.options, t, r, n);
  }
  debug(t, ...r) {
    lr(t, ...r);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(t) {
    return new J(this.options, t);
  }
};
var J = class e {
  options;
  label;
  constructor(t, r) {
    this.options = t, this.label = r;
  }
  fork(t) {
    return new e(this.options, t);
  }
  info(t) {
    ar(this.options, this.label, t);
  }
  warn(t) {
    ir(this.options, this.label, t);
  }
  error(t) {
    cr(this.options, this.label, t);
  }
  debug(t) {
    lr(this.label, t);
  }
};
function Ps(e3, t) {
  let r = e3.map((o) => "/" + o.map((a) => a.spread ? `:${a.content.slice(3)}(.*)?` : a.dynamic ? `:${a.content}` : a.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("")).join(""), n = "";
  return t === "always" && e3.length && (n = "/"), or(r + n);
}
function ae(e3) {
  return { route: e3.route, type: e3.type, pattern: new RegExp(e3.pattern), params: e3.params, component: e3.component, generate: Ps(e3.segments, e3._meta.trailingSlash), pathname: e3.pathname || void 0, segments: e3.segments, prerender: e3.prerender, redirect: e3.redirect, redirectRoute: e3.redirectRoute ? ae(e3.redirectRoute) : void 0, fallbackRoutes: e3.fallbackRoutes.map((t) => ae(t)), isIndex: e3.isIndex };
}
function Ls(e3) {
  let t = [];
  for (let o of e3.routes) {
    t.push({ ...o, routeData: ae(o.routeData) });
    let a = o;
    a.routeData = ae(o.routeData);
  }
  let r = new Set(e3.assets), n = new Map(e3.componentMetadata), s = new Map(e3.clientDirectives);
  return { middleware(o, a) {
    return a();
  }, ...e3, assets: r, componentMetadata: n, clientDirectives: s, routes: t };
}
var dr = Ls({ adapterName: "@astrojs/cloudflare", routes: [{ file: "", links: [], scripts: [], styles: [], routeData: { type: "endpoint", isIndex: false, route: "/_image", pattern: "^\\/_image$", segments: [[{ content: "_image", dynamic: false, spread: false }]], params: [], component: "node_modules/.pnpm/astro@4.4.0_typescript@5.3.3/node_modules/astro/dist/assets/endpoint/generic.js", pathname: "/_image", prerender: false, fallbackRoutes: [], _meta: { trailingSlash: "ignore" } } }, { file: "", links: [], scripts: [], styles: [], routeData: { route: "/404", isIndex: false, type: "page", pattern: "^\\/404\\/?$", segments: [[{ content: "404", dynamic: false, spread: false }]], params: [], component: "src/pages/404.astro", pathname: "/404", prerender: false, fallbackRoutes: [], _meta: { trailingSlash: "ignore" } } }, { file: "", links: [], scripts: [], styles: [], routeData: { route: "/api/[...proxy]", isIndex: false, type: "endpoint", pattern: "^\\/api(?:\\/(.*?))?\\/?$", segments: [[{ content: "api", dynamic: false, spread: false }], [{ content: "...proxy", dynamic: true, spread: true }]], params: ["...proxy"], component: "src/pages/api/[...proxy].ts", prerender: false, fallbackRoutes: [], _meta: { trailingSlash: "ignore" } } }, { file: "", links: [], scripts: [], styles: [{ type: "inline", content: `:root{--accent: 136, 58, 234;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% )}html{font-family:system-ui,sans-serif;background:#13151a;background-size:224px}code{font-family:Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace}.link-card[data-astro-cid-dohjnao5]{list-style:none;display:flex;padding:1px;background-color:#23262d;background-image:none;background-size:400%;border-radius:7px;background-position:100%;transition:background-position .6s cubic-bezier(.22,1,.36,1);box-shadow:inset 0 0 0 1px #ffffff1a}.link-card[data-astro-cid-dohjnao5]>a[data-astro-cid-dohjnao5]{width:100%;text-decoration:none;line-height:1.4;padding:calc(1.5rem - 1px);border-radius:8px;color:#fff;background-color:#23262d;opacity:.8}h2[data-astro-cid-dohjnao5]{margin:0;font-size:1.25rem;transition:color .6s cubic-bezier(.22,1,.36,1)}p[data-astro-cid-dohjnao5]{margin-top:.5rem;margin-bottom:0}.link-card[data-astro-cid-dohjnao5]:is(:hover,:focus-within){background-position:0;background-image:var(--accent-gradient)}.link-card[data-astro-cid-dohjnao5]:is(:hover,:focus-within) h2[data-astro-cid-dohjnao5]{color:rgb(var(--accent-light))}main[data-astro-cid-j7pv25f6]{margin:auto;padding:1rem;width:800px;max-width:calc(100% - 2rem);color:#fff;font-size:20px;line-height:1.6}.astro-a[data-astro-cid-j7pv25f6]{position:absolute;top:-32px;left:50%;transform:translate(-50%);width:220px;height:auto;z-index:-1}h1[data-astro-cid-j7pv25f6]{font-size:4rem;font-weight:700;line-height:1;text-align:center;margin-bottom:1em}.text-gradient[data-astro-cid-j7pv25f6]{background-image:var(--accent-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:400%;background-position:0%}.instructions[data-astro-cid-j7pv25f6]{margin-bottom:2rem;border:1px solid rgba(var(--accent-light),25%);background:linear-gradient(rgba(var(--accent-dark),66%),rgba(var(--accent-dark),33%));padding:1.5rem;border-radius:8px}.instructions[data-astro-cid-j7pv25f6] code[data-astro-cid-j7pv25f6]{font-size:.8em;font-weight:700;background:rgba(var(--accent-light),12%);color:rgb(var(--accent-light));border-radius:4px;padding:.3em .4em}.instructions[data-astro-cid-j7pv25f6] strong[data-astro-cid-j7pv25f6]{color:rgb(var(--accent-light))}.link-card-grid[data-astro-cid-j7pv25f6]{display:grid;grid-template-columns:repeat(auto-fit,minmax(24ch,1fr));gap:2rem;padding:0}
` }], routeData: { route: "/", isIndex: true, type: "page", pattern: "^\\/$", segments: [], params: [], component: "src/pages/index.astro", pathname: "/", prerender: false, fallbackRoutes: [], _meta: { trailingSlash: "ignore" } } }], base: "/", trailingSlash: "ignore", compressHTML: true, componentMetadata: [["/home/serdar/dev/cf-astro/my-astro-app/src/pages/index.astro", { propagation: "none", containsHead: true }]], renderers: [], clientDirectives: [["idle", '(()=>{var i=t=>{let e=async()=>{await(await t())()};"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event("astro:idle"));})();'], ["load", '(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event("astro:load"));})();'], ["media", '(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener("change",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event("astro:media"));})();'], ["only", '(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event("astro:only"));})();'], ["visible", '(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value=="object"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event("astro:visible"));})();']], entryModules: { "\0@astro-page-split:node_modules/.pnpm/astro@4.4.0_typescript@5.3.3/node_modules/astro/dist/assets/endpoint/generic@_@js": "pages/entry._image.astro.mjs", "\0@astro-page-split:src/pages/404@_@astro": "pages/entry.404.astro.mjs", "\0@astro-page-split:src/pages/api/[...proxy]@_@ts": "pages/api/entry._---proxy_.astro.mjs", "\0@astro-page-split:src/pages/index@_@astro": "pages/entry.index.astro.mjs", "\0@astro-renderers": "renderers.mjs", "\0noop-middleware": "_noop-middleware.mjs", "/src/pages/404.astro": "chunks/pages/404_94oKy-KE.mjs", "/src/pages/api/[...proxy].ts": "chunks/pages/__ruGLC-ye.mjs", "/node_modules/.pnpm/astro@4.4.0_typescript@5.3.3/node_modules/astro/dist/assets/endpoint/generic.js": "chunks/pages/generic_Bz7-DnVN.mjs", "/src/pages/index.astro": "chunks/pages/index_CaHdtGM1.mjs", "\0@astrojs-manifest": "manifest_BmtOzj0D.mjs", "astro:scripts/before-hydration.js": "" }, assets: ["/favicon.svg", "/$server_build/_noop-middleware.mjs", "/$server_build/renderers.mjs", "/$server_build/pages/entry.404.astro.mjs", "/$server_build/pages/entry._image.astro.mjs", "/$server_build/pages/entry.index.astro.mjs", "/$server_build/chunks/astro_klGzt4yx.mjs", "/$server_build/chunks/server.directory_CHAy37g5.mjs", "/$server_build/pages/api/entry._---proxy_.astro.mjs", "/$server_build/chunks/astro/assets-service_Bata7KjQ.mjs", "/$server_build/chunks/pages/404_94oKy-KE.mjs", "/$server_build/chunks/pages/__ruGLC-ye.mjs", "/$server_build/chunks/pages/generic_Bz7-DnVN.mjs", "/$server_build/chunks/pages/index_CaHdtGM1.mjs"], buildFormat: "directory" });
var Y = le(ge(), 1);
function js(e3, t) {
  switch (e3) {
    case "always":
      return true;
    case "never":
      return false;
    case "ignore":
      switch (t) {
        case "directory":
          return true;
        case "preserve":
        case "file":
          return false;
      }
  }
}
function Ts(e3, t) {
  for (let r of t)
    if (typeof r == "string") {
      if (r === e3)
        return r;
    } else
      for (let n of r.codes)
        if (n === e3)
          return r.path;
  throw new et();
}
function P(e3) {
  return e3.replaceAll("_", "-").toLowerCase();
}
function Cs(e3) {
  return e3.map((t) => typeof t == "string" ? t : t.codes[0]);
}
var et = class extends Error {
  constructor() {
    super(`Astro encountered an unexpected line of code.
In most cases, this is not your fault, but a bug in astro code.
If there isn't one already, please create an issue.
https://astro.build/issues`);
  }
};
var xr = Symbol.for(Fe);
function fr(e3, t) {
  let r = e3.split("/");
  for (let n of r)
    for (let s of t)
      if (typeof s == "string") {
        if (P(n) === P(s))
          return true;
      } else if (n === s.path)
        return true;
  return false;
}
function Is(e3, t, r, n) {
  if (!e3)
    return (i, l) => l();
  let s = (i, l, u) => {
    if (i.pathname === t + "/" || i.pathname === t)
      return js(r, n) ? u.redirect(`${de(k(t, e3.defaultLocale))}`) : u.redirect(`${k(t, e3.defaultLocale)}`);
    if (!fr(i.pathname, e3.locales))
      return new Response(null, { status: 404, headers: l.headers });
  }, o = (i, l) => {
    let u = false;
    for (let c of i.pathname.split("/"))
      if (P(c) === P(e3.defaultLocale)) {
        u = true;
        break;
      }
    if (u) {
      let c = i.pathname.replace(`/${e3.defaultLocale}`, "");
      return l.headers.set("Location", c), new Response(null, { status: 404, headers: l.headers });
    }
  }, a = (i, l) => {
    if (!(i.pathname === t + "/" || i.pathname === t || fr(i.pathname, e3.locales)))
      return new Response(null, { status: 404, headers: l.headers });
  };
  return async (i, l) => {
    let u = Reflect.get(i.request, xr);
    if (u?.type !== "page" && u?.type !== "fallback")
      return await l();
    let c = i.currentLocale, d = i.url, { locales: f2, defaultLocale: A, fallback: h, routing: g2 } = e3, p2 = await l();
    if (p2 instanceof Response) {
      switch (e3.routing) {
        case "domains-prefix-other-locales": {
          if (Xe(e3, c)) {
            let b2 = o(d, p2);
            if (b2)
              return b2;
          }
          break;
        }
        case "pathname-prefix-other-locales": {
          let b2 = o(d, p2);
          if (b2)
            return b2;
          break;
        }
        case "domains-prefix-always-no-redirect": {
          if (Xe(e3, c)) {
            let b2 = a(d, p2);
            if (b2)
              return b2;
          }
          break;
        }
        case "pathname-prefix-always-no-redirect": {
          let b2 = a(d, p2);
          if (b2)
            return b2;
          break;
        }
        case "pathname-prefix-always": {
          let b2 = s(d, p2, i);
          if (b2)
            return b2;
          break;
        }
        case "domains-prefix-always": {
          if (Xe(e3, c)) {
            let b2 = s(d, p2, i);
            if (b2)
              return b2;
          }
          break;
        }
      }
      if (p2.status >= 300 && h) {
        let b2 = e3.fallback ? Object.keys(e3.fallback) : [], $ = d.pathname.split("/").find((E3) => {
          for (let L3 of f2)
            if (typeof L3 == "string") {
              if (L3 === E3)
                return true;
            } else if (L3.path === E3)
              return true;
          return false;
        });
        if ($ && b2.includes($)) {
          let E3 = h[$], L3 = Ts(E3, f2), j2;
          return L3 === A && g2 === "pathname-prefix-other-locales" ? j2 = d.pathname.replace(`/${$}`, "") : j2 = d.pathname.replace(`/${$}`, `/${L3}`), i.redirect(j2);
        }
      }
    }
    return p2;
  };
}
var Ms = (e3) => {
  Reflect.set(e3.request, xr, e3.route);
};
function Xe(e3, t) {
  for (let r of Object.values(e3.domainLookupTable))
    if (r === t)
      return false;
  return true;
}
var _s = /* @__PURE__ */ new Date(0);
var pr = "deleted";
var Ns = Symbol.for("astro.responseSent");
var ie = class {
  constructor(t) {
    this.value = t;
  }
  json() {
    if (this.value === void 0)
      throw new Error("Cannot convert undefined to an object.");
    return JSON.parse(this.value);
  }
  number() {
    return Number(this.value);
  }
  boolean() {
    return this.value === "false" || this.value === "0" ? false : !!this.value;
  }
};
var K = class {
  #e;
  #t;
  #r;
  #s;
  constructor(t) {
    this.#e = t, this.#t = null, this.#r = null, this.#s = false;
  }
  delete(t, r) {
    let n = { expires: _s };
    r?.domain && (n.domain = r.domain), r?.path && (n.path = r.path), this.#n().set(t, [pr, (0, Y.serialize)(t, pr, n), false]);
  }
  get(t, r = void 0) {
    if (this.#r?.has(t)) {
      let [s, , o] = this.#r.get(t);
      return o ? new ie(s) : void 0;
    }
    let n = this.#o(r);
    if (t in n) {
      let s = n[t];
      return new ie(s);
    }
  }
  has(t, r = void 0) {
    if (this.#r?.has(t)) {
      let [, , s] = this.#r.get(t);
      return s;
    }
    return !!this.#o(r)[t];
  }
  set(t, r, n) {
    if (this.#s) {
      let a = new Error(`Astro.cookies.set() was called after the cookies had already been sent to the browser.
This may have happened if this method was called in an imported component.
Please make sure that Astro.cookies.set() is only called in the frontmatter of the main page.`);
      a.name = "Warning", console.warn(a);
    }
    let s;
    if (typeof r == "string")
      s = r;
    else {
      let a = r.toString();
      a === Object.prototype.toString.call(r) ? s = JSON.stringify(r) : s = a;
    }
    let o = {};
    if (n && Object.assign(o, n), this.#n().set(t, [s, (0, Y.serialize)(t, s, o), true]), this.#e[Ns])
      throw new w({ ...B });
  }
  *headers() {
    if (this.#r != null)
      for (let [, t] of this.#r)
        yield t[1];
  }
  static consume(t) {
    return t.#s = true, t.headers();
  }
  #o(t = void 0) {
    return this.#t || this.#a(t), this.#t || (this.#t = {}), this.#t;
  }
  #n() {
    return this.#r || (this.#r = /* @__PURE__ */ new Map()), this.#r;
  }
  #a(t = void 0) {
    let r = this.#e.headers.get("cookie");
    r && (this.#t = (0, Y.parse)(r, t));
  }
};
var at = Symbol.for("astro.cookies");
function it(e3, t) {
  Reflect.set(e3, at, t);
}
function Os(e3) {
  return Reflect.has(e3, at);
}
function ks(e3) {
  let t = Reflect.get(e3, at);
  if (t != null)
    return t;
}
function* mr(e3) {
  let t = ks(e3);
  if (!t)
    return [];
  for (let r of K.consume(t))
    yield r;
  return [];
}
var Ds = { write(e3) {
  let t = console.error;
  return G[e3.level] < G.error && (t = console.log), e3.label === "SKIP_FORMAT" ? t(e3.message) : t(ur(e3) + " " + e3.message), true;
} };
async function Er(e3, t, r) {
  let n = false, s, a = e3(t, async () => (n = true, s = r(), s));
  return await Promise.resolve(a).then(async (i) => {
    if (n)
      if (typeof i < "u") {
        if (!(i instanceof Response))
          throw new w(ne);
        return hr(t, i);
      } else {
        if (s)
          return s;
        throw new w(ne);
      }
    else {
      if (typeof i > "u")
        throw new w(Dt);
      if (i instanceof Response)
        return hr(t, i);
      throw new w(ne);
    }
  });
}
function hr(e3, t) {
  return e3.cookies !== void 0 && !Os(t) && it(t, e3.cookies), t;
}
function Rr(e3) {
  return e3?.type === "redirect";
}
function $r(e3) {
  return e3?.type === "fallback";
}
function Us(e3, t) {
  let r = e3.redirectRoute, n = e3.redirect;
  if (typeof r < "u")
    return r?.generate(t) || r?.pathname || "/";
  if (typeof n == "string") {
    let s = n;
    for (let o of Object.keys(t)) {
      let a = t[o];
      s = s.replace(`[${o}]`, a), s = s.replace(`[...${o}]`, a);
    }
    return s;
  } else if (typeof n > "u")
    return "/";
  return n.destination;
}
function Hs(e3, t = "GET") {
  return e3.redirectRoute && typeof e3.redirect == "object" ? e3.redirect.status : t !== "GET" ? 308 : 301;
}
var Fs = { default() {
  return new Response(null, { status: 301 });
} };
var Vs = { page: () => Promise.resolve(Fs), onRequest: (e3, t) => t(), renderers: [] };
var zs = ["string", "number", "undefined"];
function Ws([e3, t], r) {
  if (!zs.includes(typeof t))
    throw new w({ ...De, message: De.message(e3, t, typeof t), location: { file: r } });
}
function Bs(e3, { ssr: t, route: r }) {
  if ((!t || r.prerender) && !e3.getStaticPaths)
    throw new w({ ...kt, location: { file: r.component } });
}
function qs(e3, t, r) {
  if (!Array.isArray(e3))
    throw new w({ ...ke, message: ke.message(typeof e3), location: { file: r.component } });
  e3.forEach((n) => {
    if (typeof n == "object" && Array.isArray(n) || n === null)
      throw new w({ ...Oe, message: Oe.message(Array.isArray(n) ? "array" : typeof n) });
    if (n.params === void 0 || n.params === null || n.params && Object.keys(n.params).length === 0)
      throw new w({ ...Ot, location: { file: r.component } });
    for (let [s, o] of Object.entries(n.params))
      typeof o > "u" || typeof o == "string" || typeof o == "number" || t.warn("router", `getStaticPaths() returned an invalid path param: "${s}". A string, number or undefined value was expected, but got \`${JSON.stringify(o)}\`.`), typeof o == "string" && o === "" && t.warn("router", `getStaticPaths() returned an invalid path param: "${s}". \`undefined\` expected for an optional param, but got empty string.`);
  });
}
function Gs(e3) {
  return (r) => {
    let n = {};
    return e3.forEach((s, o) => {
      s.startsWith("...") ? n[s.slice(3)] = r[o + 1] ? r[o + 1] : void 0 : n[s] = r[o + 1];
    }), n;
  };
}
function Pr(e3, t) {
  let r = Object.entries(e3).reduce((n, s) => {
    Ws(s, t.component);
    let [o, a] = s;
    return a !== void 0 && (n[o] = typeof a == "string" ? pe(a) : a.toString()), n;
  }, {});
  return JSON.stringify(t.generate(r));
}
function Js(e3) {
  return function(r, n = {}) {
    let { pageSize: s, params: o, props: a } = n, i = s || 10, l = "page", u = o || {}, c = a || {}, d;
    if (e3.params.includes(`...${l}`))
      d = false;
    else if (e3.params.includes(`${l}`))
      d = true;
    else
      throw new w({ ...He, message: He.message(l) });
    let f2 = Math.max(1, Math.ceil(r.length / i));
    return [...Array(f2).keys()].map((h) => {
      let g2 = h + 1, p2 = i === 1 / 0 ? 0 : (g2 - 1) * i, b2 = Math.min(p2 + i, r.length), y2 = { ...u, [l]: d || g2 > 1 ? String(g2) : void 0 }, $ = Qe(e3.generate({ ...y2 })), E3 = g2 === f2 ? void 0 : Qe(e3.generate({ ...y2, page: String(g2 + 1) })), L3 = g2 === 1 ? void 0 : Qe(e3.generate({ ...y2, page: !d && g2 - 1 === 1 ? void 0 : String(g2 - 1) }));
      return { params: y2, props: { ...c, page: { data: r.slice(p2, b2), start: p2, end: b2 - 1, size: i, total: r.length, currentPage: g2, lastPage: f2, url: { current: $, next: E3, prev: L3 } } } };
    });
  };
}
function Qe(e3) {
  return e3 === "" ? "/" : e3;
}
async function Ys({ mod: e3, route: t, routeCache: r, logger: n, ssr: s }) {
  let o = r.get(t);
  if (!e3)
    throw new Error("This is an error caused by Astro and not your code. Please file an issue.");
  if (o?.staticPaths)
    return o.staticPaths;
  if (Bs(e3, { ssr: s, route: t }), s && !t.prerender) {
    let l = Object.assign([], { keyed: /* @__PURE__ */ new Map() });
    return r.set(t, { ...o, staticPaths: l }), l;
  }
  let a = [];
  if (!e3.getStaticPaths)
    throw new Error("Unexpected Error.");
  a = await e3.getStaticPaths({ paginate: Js(t) }), qs(a, n, t);
  let i = a;
  i.keyed = /* @__PURE__ */ new Map();
  for (let l of i) {
    let u = Pr(l.params, t);
    i.keyed.set(u, l);
  }
  return r.set(t, { ...o, staticPaths: i }), i;
}
var tt = class {
  logger;
  cache = {};
  mode;
  constructor(t, r = "production") {
    this.logger = t, this.mode = r;
  }
  clearAll() {
    this.cache = {};
  }
  set(t, r) {
    this.mode === "production" && this.cache[t.component]?.staticPaths && this.logger.warn(null, `Internal Warning: route cache overwritten. (${t.component})`), this.cache[t.component] = r;
  }
  get(t) {
    return this.cache[t.component];
  }
};
function Ks(e3, t, r, n) {
  let s = Pr(t, r), o = e3.keyed.get(s);
  if (o)
    return o;
  n.debug("router", `findPathItemByKey() - Unexpected cache miss looking for ${s}`);
}
async function Xs(e3) {
  let { logger: t, mod: r, route: n, routeCache: s, pathname: o, ssr: a } = e3;
  if (!n || n.pathname)
    return [{}, {}];
  let i = Qs(n, o) ?? {};
  if (Rr(n) || $r(n))
    return [i, {}];
  r && Zs(n, r, i);
  let l = await Ys({ mod: r, route: n, routeCache: s, logger: t, ssr: a }), u = Ks(l, i, n, t);
  if (!u && (!a || n.prerender))
    throw new w({ ...te, message: te.message(o), hint: te.hint([n.component]) });
  let c = u?.props ? { ...u.props } : {};
  return [i, c];
}
function Qs(e3, t) {
  if (e3.params.length) {
    let r = e3.pattern.exec(decodeURIComponent(t));
    if (r)
      return Gs(e3.params)(r);
  }
}
function Zs(e3, t, r) {
  if (e3.type === "endpoint" && t.getStaticPaths) {
    let n = e3.segments[e3.segments.length - 1], s = Object.values(r), o = s[s.length - 1];
    if (n.length === 1 && n[0].dynamic && o === void 0)
      throw new w({ ...re, message: re.message(e3.route), hint: re.hint(e3.component), location: { file: e3.component } });
  }
}
var gr = Symbol.for("astro.locals");
var eo = Symbol.for(Fe);
async function yr(e3) {
  let t = e3.request, r = e3.pathname ?? new URL(t.url).pathname, [n, s] = await Xs({ mod: e3.mod, route: e3.route, routeCache: e3.env.routeCache, pathname: r, logger: e3.env.logger, ssr: e3.env.ssr }), o = { ...e3, pathname: r, params: n, props: s, locales: e3.locales, routing: e3.routing, defaultLocale: e3.defaultLocale };
  return Object.defineProperty(o, "locals", { enumerable: true, get() {
    return Reflect.get(t, gr);
  }, set(a) {
    if (typeof a != "object")
      throw new w(se);
    Reflect.set(t, gr, a);
  } }), o;
}
function Lr(e3) {
  if (e3 === "*")
    return [{ locale: e3, qualityValue: void 0 }];
  let t = [], r = e3.split(",").map((n) => n.trim());
  for (let n of r) {
    let s = n.split(";").map((i) => i.trim()), o = s[0], a = s[1];
    if (s)
      if (a && a.startsWith("q=")) {
        let i = Number.parseFloat(a.slice(2));
        Number.isNaN(i) || i > 1 ? t.push({ locale: o, qualityValue: void 0 }) : t.push({ locale: o, qualityValue: i });
      } else
        t.push({ locale: o, qualityValue: void 0 });
  }
  return t;
}
function jr(e3, t) {
  let r = Cs(t).map(P);
  return e3.filter((n) => n.locale !== "*" ? r.includes(P(n.locale)) : true).sort((n, s) => {
    if (n.qualityValue && s.qualityValue) {
      if (n.qualityValue > s.qualityValue)
        return -1;
      if (n.qualityValue < s.qualityValue)
        return 1;
    }
    return 0;
  });
}
function Tr(e3, t) {
  let r = e3.headers.get("Accept-Language"), n;
  if (r) {
    let o = jr(Lr(r), t).at(0);
    if (o && o.locale !== "*")
      for (let a of t)
        if (typeof a == "string")
          P(a) === P(o.locale) && (n = a);
        else
          for (let i of a.codes)
            P(i) === P(o.locale) && (n = a.path);
  }
  return n;
}
function Cr(e3, t) {
  let r = e3.headers.get("Accept-Language"), n = [];
  if (r) {
    let s = jr(Lr(r), t);
    if (s.length === 1 && s.at(0).locale === "*")
      return t.map((o) => typeof o == "string" ? o : o.codes.at(0));
    if (s.length > 0)
      for (let o of s)
        for (let a of t)
          if (typeof a == "string")
            P(a) === P(o.locale) && n.push(a);
          else
            for (let i of a.codes)
              i === o.locale && n.push(a.path);
  }
  return n;
}
function Ir(e3, t, r, n) {
  let s = Reflect.get(e3, eo);
  if (!s)
    return n;
  let o = s.pathname ?? new URL(e3.url).pathname;
  for (let a of o.split("/").filter(Boolean))
    for (let i of t)
      if (typeof i == "string") {
        if (!a.includes(i))
          continue;
        if (P(i) === P(a))
          return i;
      } else {
        if (i.path === a)
          return i.codes.at(0);
        for (let l of i.codes)
          if (P(l) === P(a))
            return l;
      }
  if (r === "pathname-prefix-other-locales" || r === "domains-prefix-other-locales")
    return n;
}
var wr = Symbol.for("astro.clientAddress");
var Ze = Symbol.for("astro.locals");
function Mr({ request: e3, params: t, site: r, props: n, adapterName: s, locales: o, routingStrategy: a, defaultLocale: i }) {
  let l, u, c;
  return { cookies: new K(e3), request: e3, params: t, site: r ? new URL(r) : void 0, generator: `Astro v${Ht}`, props: n, redirect(f2, A) {
    return new Response(null, { status: A || 302, headers: { Location: f2 } });
  }, get preferredLocale() {
    if (l)
      return l;
    if (o)
      return l = Tr(e3, o), l;
  }, get preferredLocaleList() {
    if (u)
      return u;
    if (o)
      return u = Cr(e3, o), u;
  }, get currentLocale() {
    return c || (o && (c = Ir(e3, o, a, i)), c);
  }, url: new URL(e3.url), get clientAddress() {
    if (wr in e3)
      return Reflect.get(e3, wr);
    throw s ? new w({ ...W, message: W.message(s) }) : new w(Ne);
  }, get locals() {
    let f2 = Reflect.get(e3, Ze);
    if (f2 === void 0 && (f2 = {}, Reflect.set(e3, Ze, f2)), typeof f2 != "object")
      throw new w(se);
    return f2;
  }, set locals(f2) {
    if (typeof f2 != "object")
      throw new w(se);
    Reflect.set(e3, Ze, f2);
  } };
}
async function to(e3, t, r, n) {
  let s = Mr({ request: r.request, params: r.params, props: r.props, site: t.site, adapterName: t.adapterName, routingStrategy: r.routing, defaultLocale: r.defaultLocale, locales: r.locales }), o;
  return n ? o = await Er(n, s, async () => await Ve(e3, s, t.ssr, t.logger)) : o = await Ve(e3, s, t.ssr, t.logger), it(o, s.cookies), o;
}
function ro(...e3) {
  let t = e3.filter((n) => !!n), r = t.length;
  return r ? (n, s) => {
    return o(0, n);
    function o(a, i) {
      let l = t[a];
      return l(i, async () => a < r - 1 ? o(a + 1, i) : s());
    }
  } : (s, o) => o();
}
function ct(e3, t, r) {
  return r ? k(r, me(e3)) : t ? O(k(t, me(e3))) : e3;
}
function no(e3, t, r) {
  return e3.type === "inline" ? { props: {}, children: e3.content } : { props: { rel: "stylesheet", href: ct(e3.src, t, r) }, children: "" };
}
function so(e3, t, r) {
  return new Set(e3.map((n) => no(n, t, r)));
}
function oo(e3, t, r) {
  return e3.type === "external" ? ao(e3.value, t, r) : { props: { type: "module" }, children: e3.value };
}
function ao(e3, t, r) {
  return { props: { type: "module", src: ct(e3, t, r) }, children: "" };
}
function br(e3, t) {
  let r = decodeURI(e3);
  return t.routes.find((n) => n.pattern.test(r) || n.fallbackRoutes.some((s) => s.pattern.test(r)));
}
var vr = Symbol.for("astro.clientAddress");
var io = Symbol.for("astro.responseSent");
function co(e3) {
  if (e3 && e3.expressions?.length === 1)
    return e3.expressions[0];
}
var rt = class {
  #e;
  #t;
  #r;
  constructor(t, r, n) {
    if (this.#e = t, this.#t = r, this.#r = n, r)
      for (let s of Object.keys(r)) {
        if (this[s] !== void 0)
          throw new w({ ...Ue, message: Ue.message(s) });
        Object.defineProperty(this, s, { get() {
          return true;
        }, enumerable: true });
      }
  }
  has(t) {
    return this.#t ? !!this.#t[t] : false;
  }
  async render(t, r = []) {
    if (!this.#t || !this.has(t))
      return;
    let n = this.#e;
    if (!Array.isArray(r))
      this.#r.warn(null, `Expected second parameter to be an array, received a ${typeof r}. If you're trying to pass an array as a single argument and getting unexpected results, make sure you're passing your array as a item of an array. Ex: Astro.slots.render('default', [["Hello", "World"]])`);
    else if (r.length > 0) {
      let a = this.#t[t], i = typeof a == "function" ? await a(n) : await a, l = co(i);
      if (l)
        return await N(n, async () => typeof l == "function" ? l(...r) : l).then((c) => c != null ? String(c) : c);
      if (typeof i == "function")
        return await C(n, i(...r)).then((u) => u != null ? String(u) : u);
    }
    let s = await N(n, this.#t[t]);
    return I(n, s);
  }
};
function lo(e3) {
  let { params: t, request: r, resolve: n, locals: s } = e3, o = new URL(r.url), a = new Headers();
  a.set("Content-Type", "text/html");
  let i = { status: e3.status, statusText: "OK", headers: a };
  Object.defineProperty(i, "headers", { value: i.headers, enumerable: true, writable: false });
  let l = e3.cookies, u, c, d, f2 = { styles: e3.styles ?? /* @__PURE__ */ new Set(), scripts: e3.scripts ?? /* @__PURE__ */ new Set(), links: e3.links ?? /* @__PURE__ */ new Set(), componentMetadata: e3.componentMetadata ?? /* @__PURE__ */ new Map(), renderers: e3.renderers, clientDirectives: e3.clientDirectives, compressHTML: e3.compressHTML, partial: e3.partial, pathname: e3.pathname, cookies: l, createAstro(A, h, g2) {
    let p2 = new rt(f2, g2, e3.logger);
    return { __proto__: A, get clientAddress() {
      if (!(vr in r))
        throw e3.adapterName ? new w({ ...W, message: W.message(e3.adapterName) }) : new w(Ne);
      return Reflect.get(r, vr);
    }, get cookies() {
      return l || (l = new K(r), f2.cookies = l, l);
    }, get preferredLocale() {
      if (u)
        return u;
      if (e3.locales)
        return u = Tr(r, e3.locales), u;
    }, get preferredLocaleList() {
      if (c)
        return c;
      if (e3.locales)
        return c = Cr(r, e3.locales), c;
    }, get currentLocale() {
      if (d || e3.locales && (d = Ir(r, e3.locales, e3.routingStrategy, e3.defaultLocale), d))
        return d;
    }, params: t, props: h, locals: s, request: r, url: o, redirect(y2, $) {
      if (r[io])
        throw new w({ ...B });
      return new Response(null, { status: $ || 302, headers: { Location: y2 } });
    }, response: i, slots: p2 };
  }, resolve: n, response: i, _metadata: { hasHydrationScript: false, rendererSpecificHydrationScripts: /* @__PURE__ */ new Set(), hasRenderedHead: false, hasDirectives: /* @__PURE__ */ new Set(), headInTree: false, extraHead: [], propagators: /* @__PURE__ */ new Set() } };
  return f2;
}
async function Sr({ mod: e3, renderContext: t, env: r, cookies: n }) {
  if (Rr(t.route))
    return new Response(null, { status: Hs(t.route, t.request.method), headers: { location: Us(t.route, t.params) } });
  if ($r(t.route))
    return new Response(null, { status: 404 });
  if (!e3)
    throw new w(Ut);
  let s = e3.default;
  if (!s)
    throw new Error(`Expected an exported Astro component but received typeof ${typeof s}`);
  let o = lo({ adapterName: r.adapterName, links: t.links, styles: t.styles, logger: r.logger, params: t.params, pathname: t.pathname, componentMetadata: t.componentMetadata, resolve: r.resolve, renderers: r.renderers, clientDirectives: r.clientDirectives, compressHTML: r.compressHTML, request: t.request, partial: !!e3.partial, site: r.site, scripts: t.scripts, ssr: r.ssr, status: t.status ?? 200, cookies: n, locals: t.locals ?? {}, locales: t.locales, defaultLocale: t.defaultLocale, routingStrategy: t.routing }), a = await sr(o, s, t.props, {}, r.streaming, t.route);
  return o.cookies && it(a, o.cookies), a;
}
var nt = class {
  env;
  #e;
  #t = { before: [] };
  constructor(t) {
    this.env = t;
  }
  setEnvironment() {
  }
  setMiddlewareFunction(t) {
    this.#e = t;
  }
  unsetMiddlewareFunction() {
    this.#e = void 0;
  }
  getEnvironment() {
    return this.env;
  }
  async renderRoute(t, r) {
    for (let n of this.#t.before)
      n(t, r);
    return await this.#r(t, this.env, r, this.#e);
  }
  async #r(t, r, n, s) {
    let o = Mr({ request: t.request, params: t.params, props: t.props, site: r.site, adapterName: r.adapterName, locales: t.locales, routingStrategy: t.routing, defaultLocale: t.defaultLocale });
    switch (t.route.type) {
      case "page":
      case "fallback":
      case "redirect":
        return s ? await Er(s, o, () => Sr({ mod: n, renderContext: t, env: r, cookies: o.cookies })) : await Sr({ mod: n, renderContext: t, env: r, cookies: o.cookies });
      case "endpoint":
        return await to(n, r, t, s);
      default:
        throw new Error(`Couldn't find route of type [${t.route.type}]`);
    }
  }
  onBeforeRenderRoute(t) {
    this.#t.before.push(t);
  }
};
var st = class extends nt {
};
var uo = Symbol.for("astro.locals");
var fo = Symbol.for("astro.clientAddress");
var Ar = Symbol.for("astro.responseSent");
var po = /* @__PURE__ */ new Set([404, 500]);
var _e2, _t2, _r, _s2, _o2, _n2, _a3, _l, _f, f_fn, _p, p_fn, _m, m_fn, _h, h_fn, _a2, _u, u_fn, _i, i_fn, _c, c_fn, _g, g_fn, _d, d_fn;
var ot = (_a2 = class {
  constructor(t, r = true) {
    __privateAdd(this, _f);
    __privateAdd(this, _p);
    __privateAdd(this, _m);
    __privateAdd(this, _h);
    __privateAdd(this, _u);
    __privateAdd(this, _i);
    __privateAdd(this, _c);
    __privateAdd(this, _g);
    __privateAdd(this, _d);
    __privateAdd(this, _e2, void 0);
    __privateAdd(this, _t2, void 0);
    __privateAdd(this, _r, void 0);
    __privateAdd(this, _s2, new oe({ dest: Ds, level: "info" }));
    __privateAdd(this, _o2, void 0);
    __privateAdd(this, _n2, void 0);
    __privateAdd(this, _a3, void 0);
    __privateAdd(this, _l, false);
    __privateSet(this, _e2, t), __privateSet(this, _t2, { routes: t.routes.map((n) => n.routeData) }), __privateSet(this, _r, new Map(t.routes.map((n) => [n.routeData, n]))), __privateSet(this, _o2, X(__privateGet(this, _e2).base)), __privateSet(this, _n2, new st(__privateMethod(this, _f, f_fn).call(this, r))), __privateSet(this, _a3, new J(__privateGet(this, _s2).options, __privateGet(this, _e2).adapterName));
  }
  getAdapterLogger() {
    return __privateGet(this, _a3);
  }
  set setManifestData(t) {
    __privateSet(this, _t2, t);
  }
  removeBase(t) {
    return t.startsWith(__privateGet(this, _e2).base) ? t.slice(__privateGet(this, _o2).length + 1) : t;
  }
  match(t) {
    let r = new URL(t.url);
    if (__privateGet(this, _e2).assets.has(r.pathname))
      return;
    let n = __privateMethod(this, _m, m_fn).call(this, t);
    n || (n = O(this.removeBase(r.pathname)));
    let s = br(n, __privateGet(this, _t2));
    if (!(!s || s.prerender))
      return s;
  }
  async render(t, r, n) {
    let s, o, a, i;
    if (r && ("addCookieHeader" in r || "clientAddress" in r || "locals" in r || "routeData" in r) ? ("addCookieHeader" in r && (i = r.addCookieHeader), "clientAddress" in r && (a = r.clientAddress), "routeData" in r && (s = r.routeData), "locals" in r && (o = r.locals)) : (s = r, o = n, (r || o) && __privateMethod(this, _h, h_fn).call(this)), o && Reflect.set(t, uo, o), a && Reflect.set(t, fo, a), t.url !== fe(t.url) && (t = new Request(fe(t.url), t)), s || (s = this.match(t)), !s)
      return __privateMethod(this, _i, i_fn).call(this, t, { status: 404 });
    let l = __privateMethod(this, _p, p_fn).call(this, t), u = __privateMethod(this, _g, g_fn).call(this, s, l), c = await __privateMethod(this, _d, d_fn).call(this, s), d = await c.page(), f2 = new URL(t.url), A = await __privateMethod(this, _u, u_fn).call(this, f2, t, s, c, u), h;
    try {
      let g2 = Is(__privateGet(this, _e2).i18n, __privateGet(this, _e2).base, __privateGet(this, _e2).trailingSlash, __privateGet(this, _e2).buildFormat);
      g2 ? (__privateGet(this, _n2).setMiddlewareFunction(ro(g2, __privateGet(this, _e2).middleware)), __privateGet(this, _n2).onBeforeRenderRoute(Ms)) : __privateGet(this, _n2).setMiddlewareFunction(__privateGet(this, _e2).middleware), h = await __privateGet(this, _n2).renderRoute(A, d);
    } catch (g2) {
      return __privateGet(this, _s2).error(null, g2.stack || g2.message || String(g2)), __privateMethod(this, _i, i_fn).call(this, t, { status: 500 });
    }
    if (po.has(h.status) && h.headers.get(q) !== "no")
      return __privateMethod(this, _i, i_fn).call(this, t, { response: h, status: h.status });
    if (h.headers.has(q) && h.headers.delete(q), i)
      for (let g2 of _a2.getSetCookieFromResponse(h))
        h.headers.append("set-cookie", g2);
    return Reflect.set(h, Ar, true), h;
  }
  setCookieHeaders(t) {
    return mr(t);
  }
}, _e2 = new WeakMap(), _t2 = new WeakMap(), _r = new WeakMap(), _s2 = new WeakMap(), _o2 = new WeakMap(), _n2 = new WeakMap(), _a3 = new WeakMap(), _l = new WeakMap(), _f = new WeakSet(), f_fn = function(t = false) {
  return { adapterName: __privateGet(this, _e2).adapterName, logger: __privateGet(this, _s2), mode: "production", compressHTML: __privateGet(this, _e2).compressHTML, renderers: __privateGet(this, _e2).renderers, clientDirectives: __privateGet(this, _e2).clientDirectives, resolve: async (r) => {
    if (!(r in __privateGet(this, _e2).entryModules))
      throw new Error(`Unable to resolve [${r}]`);
    let n = __privateGet(this, _e2).entryModules[r];
    switch (true) {
      case n.startsWith("data:"):
      case n.length === 0:
        return n;
      default:
        return ct(n, __privateGet(this, _e2).base, __privateGet(this, _e2).assetsPrefix);
    }
  }, routeCache: new tt(__privateGet(this, _s2)), site: __privateGet(this, _e2).site, ssr: true, streaming: t };
}, _p = new WeakSet(), p_fn = function(t) {
  let r = new URL(t.url);
  return O(this.removeBase(r.pathname));
}, _m = new WeakSet(), m_fn = function(t) {
  let r, n = new URL(t.url);
  if (__privateGet(this, _e2).i18n && (__privateGet(this, _e2).i18n.routing === "domains-prefix-always" || __privateGet(this, _e2).i18n.routing === "domains-prefix-other-locales" || __privateGet(this, _e2).i18n.routing === "domains-prefix-always-no-redirect")) {
    let s = t.headers.get("X-Forwarded-Host"), o = t.headers.get("X-Forwarded-Proto");
    if (o ? o = o + ":" : o = n.protocol, s || (s = t.headers.get("Host")), s && o) {
      s = s.split(":")[0];
      try {
        let a, i = new URL(`${o}//${s}`);
        for (let [l, u] of Object.entries(__privateGet(this, _e2).i18n.domainLookupTable)) {
          let c = new URL(l);
          if (i.host === c.host && i.protocol === c.protocol) {
            a = u;
            break;
          }
        }
        a && (r = O(k(P(a), this.removeBase(n.pathname))), n.pathname.endsWith("/") && (r = de(r)));
      } catch (a) {
        __privateGet(this, _s2).error("router", `Astro tried to parse ${o}//${s} as an URL, but it threw a parsing error. Check the X-Forwarded-Host and X-Forwarded-Proto headers.`), __privateGet(this, _s2).error("router", `Error: ${a}`);
      }
    }
  }
  return r;
}, _h = new WeakSet(), h_fn = function() {
  __privateGet(this, _l) || (__privateGet(this, _s2).warn("deprecated", `The adapter ${__privateGet(this, _e2).adapterName} is using a deprecated signature of the 'app.render()' method. From Astro 4.0, locals and routeData are provided as properties on an optional object to this method. Using the old signature will cause an error in Astro 5.0. See https://github.com/withastro/astro/pull/9199 for more information.`), __privateSet(this, _l, true));
}, _u = new WeakSet(), u_fn = async function(t, r, n, s, o = 200) {
  if (n.type === "endpoint") {
    let a = "/" + this.removeBase(t.pathname), l = await s.page();
    return await yr({ request: r, pathname: a, route: n, status: o, env: __privateGet(this, _n2).env, mod: l, locales: __privateGet(this, _e2).i18n?.locales, routing: __privateGet(this, _e2).i18n?.routing, defaultLocale: __privateGet(this, _e2).i18n?.defaultLocale });
  } else {
    let a = O(this.removeBase(t.pathname)), i = __privateGet(this, _r).get(n), l = /* @__PURE__ */ new Set(), u = so(i.styles), c = /* @__PURE__ */ new Set();
    for (let f2 of i.scripts)
      "stage" in f2 ? f2.stage === "head-inline" && c.add({ props: {}, children: f2.children }) : c.add(oo(f2));
    let d = await s.page();
    return await yr({ request: r, pathname: a, componentMetadata: __privateGet(this, _e2).componentMetadata, scripts: c, styles: u, links: l, route: n, status: o, mod: d, env: __privateGet(this, _n2).env, locales: __privateGet(this, _e2).i18n?.locales, routing: __privateGet(this, _e2).i18n?.routing, defaultLocale: __privateGet(this, _e2).i18n?.defaultLocale });
  }
}, _i = new WeakSet(), i_fn = async function(t, { status: r, response: n, skipMiddleware: s = false }) {
  let o = `/${r}${__privateGet(this, _e2).trailingSlash === "always" ? "/" : ""}`, a = br(o, __privateGet(this, _t2)), i = new URL(t.url);
  if (a) {
    if (a.prerender) {
      let c = a.route.endsWith(`/${r}`) ? ".html" : "", d = new URL(`${__privateGet(this, _o2)}/${r}${c}`, i), f2 = await fetch(d.toString()), A = { status: r };
      return __privateMethod(this, _c, c_fn).call(this, f2, n, A);
    }
    let u = await __privateMethod(this, _d, d_fn).call(this, a);
    try {
      let c = await __privateMethod(this, _u, u_fn).call(this, i, t, a, u, r), d = await u.page();
      s === false && __privateGet(this, _n2).setMiddlewareFunction(__privateGet(this, _e2).middleware), s && __privateGet(this, _n2).unsetMiddlewareFunction();
      let f2 = await __privateGet(this, _n2).renderRoute(c, d);
      return __privateMethod(this, _c, c_fn).call(this, f2, n);
    } catch {
      if (s === false)
        return __privateMethod(this, _i, i_fn).call(this, t, { status: r, response: n, skipMiddleware: true });
    }
  }
  let l = __privateMethod(this, _c, c_fn).call(this, new Response(null, { status: r }), n);
  return Reflect.set(l, Ar, true), l;
}, _c = new WeakSet(), c_fn = function(t, r, n) {
  if (!r)
    return n !== void 0 ? new Response(t.body, { status: n.status, statusText: t.statusText, headers: t.headers }) : t;
  let s = n?.status ? n.status : r.status === 200 ? t.status : r.status;
  try {
    r.headers.delete("Content-type");
  } catch {
  }
  return new Response(t.body, { status: s, statusText: s === 200 ? t.statusText : r.statusText, headers: new Headers([...Array.from(t.headers), ...Array.from(r.headers)]) });
}, _g = new WeakSet(), g_fn = function(t, r) {
  if (!t.pattern.exec(r)) {
    for (let s of t.fallbackRoutes)
      if (s.pattern.test(r))
        return 302;
  }
  let n = X(t.route);
  return n.endsWith("/404") ? 404 : n.endsWith("/500") ? 500 : 200;
}, _d = new WeakSet(), d_fn = async function(t) {
  if (t.type === "redirect")
    return Vs;
  if (__privateGet(this, _e2).pageMap) {
    let r = __privateGet(this, _e2).pageMap.get(t.component);
    if (!r)
      throw new Error(`Unexpectedly unable to find a component instance for route ${t.route}`);
    return await r();
  } else {
    if (__privateGet(this, _e2).pageModule)
      return __privateGet(this, _e2).pageModule;
    throw new Error("Astro couldn't find the correct page to render, probably because it wasn't correctly mapped for SSR usage. This is an internal error, please file an issue.");
  }
}, __publicField(_a2, "getSetCookieFromResponse", mr), _a2);
var mo = typeof process == "object" && Object.prototype.toString.call(process) === "[object process]";
function ho() {
  return new Proxy({}, { get: (e3, t) => {
    console.warn(`Unable to access \`import.meta\0.env.${t.toString()}\` on initialization as the Cloudflare platform only provides the environment variables per request. Please move the environment variable access inside a function that's only called after a request has been received.`);
  } });
}
mo || (process.env = ho());
function lt(e3) {
  let t = new ot(e3);
  return { onRequest: async (n) => {
    let s = n.request, { env: o } = n;
    process.env = o;
    let { pathname: a } = new URL(s.url);
    if (e3.assets.has(a))
      return o.ASSETS.fetch(s);
    let i = t.match(s);
    Reflect.set(s, Symbol.for("astro.clientAddress"), s.headers.get("cf-connecting-ip"));
    let l = { runtime: { waitUntil: (c) => {
      n.waitUntil(c);
    }, env: n.env, cf: s.cf, caches } }, u = await t.render(s, { routeData: i, locals: l });
    if (t.setCookieHeaders)
      for (let c of t.setCookieHeaders(u))
        u.headers.append("Set-Cookie", c);
    return u;
  }, manifest: e3 };
}
var ut = Object.freeze(Object.defineProperty({ __proto__: null, createExports: lt }, Symbol.toStringTag, { value: "Module" }));
var _r2 = (e3, t) => t();
var wo = () => Promise.resolve().then(() => (Or(), Nr));
var bo = Object.freeze(Object.defineProperty({ __proto__: null, page: wo, renderers: ue }, Symbol.toStringTag, { value: "Module" }));
var Dr = Object.assign(dr, { pageModule: bo, renderers: ue, middleware: _r2 });
var vo = void 0;
var Ur = lt(Dr);
var Aa = Ur.onRequest;
var xa = Ur.manifest;
var kr = "start";
kr in ut && ut[kr](Dr, vo);

// [[path]].js
globalThis.process = {
  argv: [],
  env: {}
};
var dp = Object.create;
var wr2 = Object.defineProperty;
var pp = Object.getOwnPropertyDescriptor;
var up = Object.getOwnPropertyNames;
var mp = Object.getPrototypeOf;
var hp = Object.prototype.hasOwnProperty;
var m = (e3, t) => () => (e3 && (t = e3(e3 = 0)), t);
var Ke2 = (e3, t) => () => (t || e3((t = { exports: {} }).exports, t), t.exports);
var f = (e3, t) => {
  for (var r in t)
    wr2(e3, r, { get: t[r], enumerable: true });
};
var fp = (e3, t, r, s) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let n of up(t))
      !hp.call(e3, n) && n !== r && wr2(e3, n, { get: () => t[n], enumerable: !(s = pp(t, n)) || s.enumerable });
  return e3;
};
var ne2 = (e3, t, r) => (r = e3 != null ? dp(mp(e3)) : {}, fp(t || !e3 || !e3.__esModule ? wr2(r, "default", { value: e3, enumerable: true }) : r, e3));
function z2(e3, t) {
  let r = new RegExp(`\\x1b\\[${t}m`, "g"), s = `\x1B[${e3}m`, n = `\x1B[${t}m`;
  return function(o) {
    return !gp.enabled || o == null ? o : s + (~("" + o).indexOf(n) ? o.replace(r, n + s) : o) + n;
  };
}
var vr2;
var Os2;
var Hs2;
var zs2;
var Fs2;
var gp;
var qx;
var bt2;
var br2;
var Gx;
var Xx;
var Kx;
var Yx;
var Jx;
var Qx;
var Vs2;
var e_;
var Bs2;
var Ws2;
var t_;
var r_;
var s_;
var n_;
var o_;
var a_;
var i_;
var c_;
var l_;
var d_;
var p_;
var u_;
var m_;
var le2 = m(() => {
  Fs2 = true;
  typeof process < "u" && ({ FORCE_COLOR: vr2, NODE_DISABLE_COLORS: Os2, NO_COLOR: Hs2, TERM: zs2 } = process.env || {}, Fs2 = process.stdout && process.stdout.isTTY);
  gp = { enabled: !Os2 && Hs2 == null && zs2 !== "dumb" && (vr2 != null && vr2 !== "0" || Fs2) };
  qx = z2(0, 0), bt2 = z2(1, 22), br2 = z2(2, 22), Gx = z2(3, 23), Xx = z2(4, 24), Kx = z2(7, 27), Yx = z2(8, 28), Jx = z2(9, 29), Qx = z2(30, 39), Vs2 = z2(31, 39), e_ = z2(32, 39), Bs2 = z2(33, 39), Ws2 = z2(34, 39), t_ = z2(35, 39), r_ = z2(36, 39), s_ = z2(37, 39), n_ = z2(90, 39), o_ = z2(90, 39), a_ = z2(40, 49), i_ = z2(41, 49), c_ = z2(42, 49), l_ = z2(43, 49), d_ = z2(44, 49), p_ = z2(45, 49), u_ = z2(46, 49), m_ = z2(47, 49);
});
function Zs2(e3) {
  var t, r, s = "";
  if (typeof e3 == "string" || typeof e3 == "number")
    s += e3;
  else if (typeof e3 == "object")
    if (Array.isArray(e3)) {
      var n = e3.length;
      for (t = 0; t < n; t++)
        e3[t] && (r = Zs2(e3[t])) && (s && (s += " "), s += r);
    } else
      for (r in e3)
        e3[r] && (s && (s += " "), s += r);
  return s;
}
function xr2() {
  for (var e3, t, r = 0, s = "", n = arguments.length; r < n; r++)
    (e3 = arguments[r]) && (t = Zs2(e3)) && (s && (s += " "), s += t);
  return s;
}
var L = m(() => {
});
var de2 = Ke2((g_, qs2) => {
  "use strict";
  var yp = {}, wp = yp.hasOwnProperty, vp = function(t, r) {
    if (!t)
      return r;
    var s = {};
    for (var n in r)
      s[n] = wp.call(t, n) ? t[n] : r[n];
    return s;
  }, bp = /[ -,\.\/:-@\[-\^`\{-~]/, xp = /[ -,\.\/:-@\[\]\^`\{-~]/, _p3 = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g, _r4 = function e3(t, r) {
    r = vp(r, e3.options), r.quotes != "single" && r.quotes != "double" && (r.quotes = "single");
    for (var s = r.quotes == "double" ? '"' : "'", n = r.isIdentifier, o = t.charAt(0), a = "", i = 0, l = t.length; i < l; ) {
      var d = t.charAt(i++), c = d.charCodeAt(), u = void 0;
      if (c < 32 || c > 126) {
        if (c >= 55296 && c <= 56319 && i < l) {
          var h = t.charCodeAt(i++);
          (h & 64512) == 56320 ? c = ((c & 1023) << 10) + (h & 1023) + 65536 : i--;
        }
        u = "\\" + c.toString(16).toUpperCase() + " ";
      } else
        r.escapeEverything ? bp.test(d) ? u = "\\" + d : u = "\\" + c.toString(16).toUpperCase() + " " : /[\t\n\f\r\x0B]/.test(d) ? u = "\\" + c.toString(16).toUpperCase() + " " : d == "\\" || !n && (d == '"' && s == d || d == "'" && s == d) || n && xp.test(d) ? u = "\\" + d : u = d;
      a += u;
    }
    return n && (/^-[-\d]/.test(a) ? a = "\\-" + a.slice(1) : /\d/.test(o) && (a = "\\3" + o + " " + a.slice(1))), a = a.replace(_p3, function($, S, A) {
      return S && S.length % 2 ? $ : (S || "") + A;
    }), !n && r.wrap ? s + a + s : a;
  };
  _r4.options = { escapeEverything: false, isIdentifier: false, quotes: "single", wrap: false };
  _r4.version = "3.0.0";
  qs2.exports = _r4;
});
var kp;
var Sp;
var jp;
var Ap;
var Gs2;
var Xs2 = m(() => {
  ({ replace: kp } = ""), Sp = /[&<>'"]/g, jp = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }, Ap = (e3) => jp[e3], Gs2 = (e3) => kp.call(e3, Sp, Ap);
});
function Cp(e3) {
  return e3.replace(/\r\n|\r(?!\n)|\n/g, `
`);
}
function Tp(e3, t) {
  if (!t || t.line === void 0 || t.column === void 0)
    return "";
  let r = Cp(e3).split(`
`).map((a) => a.replace(/\t/g, "  ")), s = [];
  for (let a = -2; a <= 2; a++)
    r[t.line + a] && s.push(t.line + a);
  let n = 0;
  for (let a of s) {
    let i = `> ${a}`;
    i.length > n && (n = i.length);
  }
  let o = "";
  for (let a of s) {
    let i = a === t.line - 1;
    o += i ? "> " : "  ", o += `${a + 1} | ${r[a]}
`, i && (o += `${Array.from({ length: n }).join(" ")}  | ${Array.from({ length: t.column }).join(" ")}^
`);
  }
  return o;
}
function Ip(e3) {
  return !(e3.length !== 3 || !e3[0] || typeof e3[0] != "object");
}
function bn2(e3, t, r) {
  let s = t?.split("/").pop()?.replace(".astro", "") ?? "", n = (...o) => {
    if (!Ip(o))
      throw new x2({ ...Qs2, message: Qs2.message(s) });
    return e3(...o);
  };
  return Object.defineProperty(n, "name", { value: s, writable: false }), n.isAstroComponentFactory = true, n.moduleId = t, n.propagation = r, n;
}
function Dp(e3) {
  return bn2(e3.factory, e3.moduleId, e3.propagation);
}
function W2(e3, t, r) {
  return typeof e3 == "function" ? bn2(e3, t, r) : Dp(e3);
}
function Rp() {
  return (t) => {
    if (typeof t == "string")
      throw new x2({ ...en, message: en.message(JSON.stringify(t)) });
    let r = [...Object.values(t)];
    if (r.length === 0)
      throw new x2({ ...tn, message: tn.message(JSON.stringify(t)) });
    return Promise.all(r.map((s) => s()));
  };
}
function X2(e3) {
  return { site: e3 ? new URL(e3) : void 0, generator: `Astro v${qr2}`, glob: Rp() };
}
async function Xr(e3, t, r, s) {
  let { request: n, url: o } = t, a = n.method.toUpperCase(), i = e3[a] ?? e3.ALL;
  if (!r && r === false && a !== "GET" && s.warn("router", `${o.pathname} ${bt2(a)} requests are not available for a static site. Update your config to \`output: 'server'\` or \`output: 'hybrid'\` to enable.`), i === void 0)
    return s.warn("router", `No API Route handler exists for the method "${a}" for the route "${o.pathname}".
Found handlers: ${Object.keys(e3).map((d) => JSON.stringify(d)).join(", ")}
` + ("all" in e3 ? `One of the exported handlers is "all" (lowercase), did you mean to export 'ALL'?
` : "")), new Response(null, { status: 404 });
  if (typeof i != "function")
    return s.error("router", `The route "${o.pathname}" exports a value for the method "${a}", but it is of the type ${typeof i} instead of a function.`), new Response(null, { status: 500 });
  let l = await i.call(e3, t);
  return (l.status === 404 || l.status === 500) && l.headers.set(et2, "no"), l;
}
function Kr(e3) {
  return !!e3 && typeof e3 == "object" && typeof e3.then == "function";
}
async function* Mp(e3) {
  let t = e3.getReader();
  try {
    for (; ; ) {
      let { done: r, value: s } = await t.read();
      if (r)
        return;
      yield s;
    }
  } finally {
    t.releaseLock();
  }
}
function Ep(e3) {
  return Object.prototype.toString.call(e3) === "[object HTMLString]";
}
function Pp(e3) {
  return new xt2(e3);
}
function xn2(e3) {
  return typeof e3.getReader == "function";
}
async function* rn(e3) {
  if (xn2(e3))
    for await (let t of Mp(e3))
      yield Ee2(t);
  else
    for await (let t of e3)
      yield Ee2(t);
}
function* Lp(e3) {
  for (let t of e3)
    yield Ee2(t);
}
function Ee2(e3) {
  if (e3 && typeof e3 == "object") {
    if (e3 instanceof Uint8Array)
      return Pp(e3);
    if (e3 instanceof Response && e3.body) {
      let t = e3.body;
      return rn(t);
    } else {
      if (typeof e3.then == "function")
        return Promise.resolve(e3).then((t) => Ee2(t));
      if (Symbol.iterator in e3)
        return Lp(e3);
      if (Symbol.asyncIterator in e3 || xn2(e3))
        return rn(e3);
    }
  }
  return U2(e3);
}
function _t3(e3) {
  return Object.defineProperty(e3, _n3, { value: true });
}
function Up(e3) {
  return e3 && typeof e3 == "object" && e3[_n3];
}
function jr2(e3, t = {}, r = /* @__PURE__ */ new WeakSet()) {
  if (r.has(e3))
    throw new Error(`Cyclic reference detected while serializing props for <${t.displayName} client:${t.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  r.add(e3);
  let s = e3.map((n) => Sn2(n, t, r));
  return r.delete(e3), s;
}
function kn2(e3, t = {}, r = /* @__PURE__ */ new WeakSet()) {
  if (r.has(e3))
    throw new Error(`Cyclic reference detected while serializing props for <${t.displayName} client:${t.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  r.add(e3);
  let s = Object.fromEntries(Object.entries(e3).map(([n, o]) => [n, Sn2(o, t, r)]));
  return r.delete(e3), s;
}
function Sn2(e3, t = {}, r = /* @__PURE__ */ new WeakSet()) {
  switch (Object.prototype.toString.call(e3)) {
    case "[object Date]":
      return [re2.Date, e3.toISOString()];
    case "[object RegExp]":
      return [re2.RegExp, e3.source];
    case "[object Map]":
      return [re2.Map, jr2(Array.from(e3), t, r)];
    case "[object Set]":
      return [re2.Set, jr2(Array.from(e3), t, r)];
    case "[object BigInt]":
      return [re2.BigInt, e3.toString()];
    case "[object URL]":
      return [re2.URL, e3.toString()];
    case "[object Array]":
      return [re2.JSON, jr2(e3, t, r)];
    case "[object Uint8Array]":
      return [re2.Uint8Array, Array.from(e3)];
    case "[object Uint16Array]":
      return [re2.Uint16Array, Array.from(e3)];
    case "[object Uint32Array]":
      return [re2.Uint32Array, Array.from(e3)];
    default:
      return e3 !== null && typeof e3 == "object" ? [re2.Value, kn2(e3, t, r)] : e3 === void 0 ? [re2.Value] : [re2.Value, e3];
  }
}
function jn2(e3, t) {
  return JSON.stringify(kn2(e3, t));
}
function Np(e3, t) {
  let r = { isPage: false, hydration: null, props: {}, propsWithoutTransitionAttributes: {} };
  for (let [s, n] of Object.entries(e3))
    if (s.startsWith("server:") && s === "server:root" && (r.isPage = true), s.startsWith("client:"))
      switch (r.hydration || (r.hydration = { directive: "", value: "", componentUrl: "", componentExport: { value: "" } }), s) {
        case "client:component-path": {
          r.hydration.componentUrl = n;
          break;
        }
        case "client:component-export": {
          r.hydration.componentExport.value = n;
          break;
        }
        case "client:component-hydration":
          break;
        case "client:display-name":
          break;
        default: {
          if (r.hydration.directive = s.split(":")[1], r.hydration.value = n, !t.has(r.hydration.directive)) {
            let o = Array.from(t.keys()).map((a) => `client:${a}`).join(", ");
            throw new Error(`Error: invalid hydration directive "${s}". Supported hydration methods: ${o}`);
          }
          if (r.hydration.directive === "media" && typeof r.hydration.value != "string")
            throw new x2($p);
          break;
        }
      }
    else
      r.props[s] = n, An2.includes(s) || (r.propsWithoutTransitionAttributes[s] = n);
  for (let s of Object.getOwnPropertySymbols(e3))
    r.props[s] = e3[s], r.propsWithoutTransitionAttributes[s] = e3[s];
  return r;
}
async function Op(e3, t) {
  let { renderer: r, result: s, astroId: n, props: o, attrs: a } = e3, { hydrate: i, componentUrl: l, componentExport: d } = t;
  if (!d.value)
    throw new x2({ ...Js2, message: Js2.message(t.displayName) });
  let c = { children: "", props: { uid: n } };
  if (a)
    for (let [h, $] of Object.entries(a))
      c.props[h] = Ye2($);
  c.props["component-url"] = await s.resolve(decodeURI(l)), r.clientEntrypoint && (c.props["component-export"] = d.value, c.props["renderer-url"] = await s.resolve(decodeURI(r.clientEntrypoint)), c.props.props = Ye2(jn2(o, t))), c.props.ssr = "", c.props.client = i;
  let u = await s.resolve("astro:scripts/before-hydration.js");
  return u.length && (c.props["before-hydration-url"] = u), c.props.opts = Ye2(JSON.stringify({ name: t.displayName, value: t.hydrateArgs || "" })), An2.forEach((h) => {
    o[h] && (c.props[h] = o[h]);
  }), c;
}
function Hp(e3) {
  let t = 0;
  if (e3.length === 0)
    return t;
  for (let r = 0; r < e3.length; r++) {
    let s = e3.charCodeAt(r);
    t = (t << 5) - t + s, t = t & t;
  }
  return t;
}
function zp(e3) {
  let t, r = "", s = Hp(e3), n = s < 0 ? "Z" : "";
  for (s = Math.abs(s); s >= Ar2; )
    t = s % Ar2, s = Math.floor(s / Ar2), r = Tr2[t] + r;
  return s > 0 && (r = Tr2[s] + r), n + r;
}
function Cn2(e3) {
  return e3 == null ? false : e3.isAstroComponentFactory === true;
}
function Fp(e3, t) {
  let r = t.propagation || "none";
  return t.moduleId && e3.componentMetadata.has(t.moduleId) && r === "none" && (r = e3.componentMetadata.get(t.moduleId).propagation), r === "in-tree" || r === "self";
}
function Yr2(e3) {
  return typeof e3 == "object" && !!e3[Tn2];
}
function $n2(e3, t) {
  return { [Tn2]: true, head: e3, content: t };
}
function Wp(e3) {
  return e3._metadata.hasHydrationScript ? false : e3._metadata.hasHydrationScript = true;
}
function Zp(e3, t) {
  return e3._metadata.hasDirectives.has(t) ? false : (e3._metadata.hasDirectives.add(t), true);
}
function sn2(e3, t) {
  let s = e3.clientDirectives.get(t);
  if (!s)
    throw new Error(`Unknown directive: ${t}`);
  return s;
}
function qp(e3, t, r) {
  switch (t) {
    case "both":
      return `${Bp}<script>${sn2(e3, r)};${Vp}<\/script>`;
    case "directive":
      return `<script>${sn2(e3, r)}<\/script>`;
  }
  return "";
}
function eu(e3) {
  let t = "";
  for (let [r, s] of Object.entries(e3))
    t += `const ${Jp(r)} = ${JSON.stringify(s)?.replace(/<\/script>/g, "\\x3C/script>")};
`;
  return U2(t);
}
function on2(e3) {
  return e3.length === 1 ? e3[0] : `${e3.slice(0, -1).join(", ")} or ${e3[e3.length - 1]}`;
}
function ie2(e3, t, r = true) {
  if (e3 == null)
    return "";
  if (e3 === false)
    return Xp.test(t) || Kp.test(t) ? U2(` ${t}="false"`) : "";
  if (Yp.has(t))
    return console.warn(`[astro] The "${t}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${t}={value}\`) instead of the dynamic spread syntax (\`{...{ "${t}": value }}\`).`), "";
  if (t === "class:list") {
    let s = Re2(xr2(e3), r);
    return s === "" ? "" : U2(` ${t.slice(0, -5)}="${s}"`);
  }
  if (t === "style" && !(e3 instanceof Ce2)) {
    if (Array.isArray(e3) && e3.length === 2)
      return U2(` ${t}="${Re2(`${nn2(e3[0])};${e3[1]}`, r)}"`);
    if (typeof e3 == "object")
      return U2(` ${t}="${Re2(nn2(e3), r)}"`);
  }
  return t === "className" ? U2(` class="${Re2(e3, r)}"`) : e3 === true && (t.startsWith("data-") || Gp.test(t)) ? U2(` ${t}`) : U2(` ${t}="${Re2(e3, r)}"`);
}
function $r2(e3, t = true) {
  let r = "";
  for (let [s, n] of Object.entries(e3))
    r += ie2(n, s, t);
  return U2(r);
}
function we2(e3, { props: t, children: r = "" }, s = true) {
  let { lang: n, "data-astro-id": o, "define:vars": a, ...i } = t;
  return a && (e3 === "style" && (delete i["is:global"], delete i["is:scoped"]), e3 === "script" && (delete i.hoist, r = eu(a) + `
` + r)), (r == null || r == "") && Jr2.test(e3) ? `<${e3}${$r2(i, s)} />` : `<${e3}${$r2(i, s)}>${r}</${e3}>`;
}
function In2(e3) {
  let t = [], r = { write: (n) => t.push(n) }, s = e3(r);
  return { async renderToFinalDestination(n) {
    for (let o of t)
      n.write(o);
    r.write = (o) => n.write(o), await s;
  } };
}
function an2(e3) {
  e3._metadata.hasRenderedHead = true;
  let t = Array.from(e3.styles).filter(Cr2).map((o) => o.props.rel === "stylesheet" ? we2("link", o) : we2("style", o));
  e3.styles.clear();
  let r = Array.from(e3.scripts).filter(Cr2).map((o) => we2("script", o, false)), s = Array.from(e3.links).filter(Cr2).map((o) => we2("link", o, false)), n = t.join(`
`) + s.join(`
`) + r.join(`
`);
  if (e3._metadata.extraHead.length > 0)
    for (let o of e3._metadata.extraHead)
      n += o;
  return U2(n);
}
function* Dn2() {
  yield _t3({ type: "head" });
}
function* J2() {
  yield _t3({ type: "maybe-head" });
}
function tu(e3) {
  return !!e3[Ir2];
}
function Dt2(e3, t, r) {
  return !t && r ? Dt2(e3, r) : { async render(s) {
    await Me2(s, typeof t == "function" ? t(e3) : t);
  } };
}
async function Te2(e3, t, r) {
  let s = "", n = null, o = { write(i) {
    i instanceof Response || (typeof i == "object" && "type" in i && typeof i.type == "string" ? (n === null && (n = []), n.push(i)) : s += ve(e3, i));
  } };
  return await Dt2(e3, t, r).render(o), U2(new kt2(s, n));
}
async function Rn2(e3, t = {}) {
  let r = null, s = {};
  return t && await Promise.all(Object.entries(t).map(([n, o]) => Te2(e3, o).then((a) => {
    a.instructions && (r === null && (r = []), r.push(...a.instructions)), s[n] = a;
  }))), { slotInstructions: r, children: s };
}
function Qr(e3, t) {
  if (Up(t)) {
    let r = t;
    switch (r.type) {
      case "directive": {
        let { hydration: s } = r, n = s && Wp(e3), o = s && Zp(e3, s.directive), a = n ? "both" : o ? "directive" : null;
        if (a) {
          let i = qp(e3, a, s.directive);
          return U2(i);
        } else
          return "";
      }
      case "head":
        return e3._metadata.hasRenderedHead || e3.partial ? "" : an2(e3);
      case "maybe-head":
        return e3._metadata.hasRenderedHead || e3._metadata.headInTree || e3.partial ? "" : an2(e3);
      case "renderer-hydration-script": {
        let { rendererSpecificHydrationScripts: s } = e3._metadata, { rendererName: n } = r;
        return s.has(n) ? "" : (s.add(n), r.render());
      }
      default:
        throw new Error(`Unknown chunk type: ${t.type}`);
    }
  } else {
    if (t instanceof Response)
      return "";
    if (tu(t)) {
      let r = "", s = t;
      if (s.instructions)
        for (let n of s.instructions)
          r += Qr(e3, n);
      return r += t.toString(), r;
    }
  }
  return t.toString();
}
function ve(e3, t) {
  return ArrayBuffer.isView(t) ? ru.decode(t) : Qr(e3, t);
}
function su(e3, t) {
  if (ArrayBuffer.isView(t))
    return t;
  {
    let r = Qr(e3, t);
    return jt2.encode(r.toString());
  }
}
function nu(e3) {
  return !!e3 && typeof e3 == "object" && "render" in e3 && typeof e3.render == "function";
}
async function Me2(e3, t) {
  if (t = await t, t instanceof kt2)
    e3.write(t);
  else if (Ep(t))
    e3.write(t);
  else if (Array.isArray(t)) {
    let r = t.map((s) => In2((n) => Me2(n, s)));
    for (let s of r)
      s && await s.renderToFinalDestination(e3);
  } else if (typeof t == "function")
    await Me2(e3, t());
  else if (typeof t == "string")
    e3.write(U2(Ye2(t)));
  else if (!(!t && t !== 0))
    if (nu(t))
      await t.render(e3);
    else if (Pn2(t))
      await t.render(e3);
    else if (iu(t))
      await t.render(e3);
    else if (ArrayBuffer.isView(t))
      e3.write(t);
    else if (typeof t == "object" && (Symbol.asyncIterator in t || Symbol.iterator in t))
      for await (let r of t)
        await Me2(e3, r);
    else
      e3.write(t);
}
function ou(e3, t) {
  if (e3 != null)
    for (let r of Object.keys(e3))
      r.startsWith("client:") && console.warn(`You are attempting to render <${t} ${r} />, but ${t} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`);
}
function au(e3, t, r, s, n = {}) {
  ou(s, t);
  let o = new Dr2(e3, s, n, r);
  return Fp(e3, r) && e3._metadata.propagators.add(o), o;
}
function iu(e3) {
  return typeof e3 == "object" && !!e3[Mn2];
}
function Pn2(e3) {
  return typeof e3 == "object" && !!e3[En2];
}
function F2(e3, ...t) {
  return new Rr2(e3, t);
}
async function Ln2(e3, t, r, s, n = false, o) {
  let a = await Un2(e3, t, r, s, o);
  if (a instanceof Response)
    return a;
  let i = "", l = false, d = { write(c) {
    if (n && !l && (l = true, !e3.partial && !/<!doctype html/i.test(String(c)))) {
      let u = e3.compressHTML ? "<!DOCTYPE html>" : `<!DOCTYPE html>
`;
      i += u;
    }
    c instanceof Response || (i += ve(e3, c));
  } };
  return await a.render(d), i;
}
async function cu(e3, t, r, s, n = false, o) {
  let a = await Un2(e3, t, r, s, o);
  if (a instanceof Response)
    return a;
  let i = false;
  return n && await lu(e3), new ReadableStream({ start(l) {
    let d = { write(c) {
      if (n && !i && (i = true, !e3.partial && !/<!doctype html/i.test(String(c)))) {
        let h = e3.compressHTML ? "<!DOCTYPE html>" : `<!DOCTYPE html>
`;
        l.enqueue(jt2.encode(h));
      }
      if (c instanceof Response)
        throw new x2({ ...Tt2 });
      let u = su(e3, c);
      l.enqueue(u);
    } };
    (async () => {
      try {
        await a.render(d), l.close();
      } catch (c) {
        x2.is(c) && !c.loc && c.setLocation({ file: o?.component }), setTimeout(() => l.error(c), 0);
      }
    })();
  } });
}
async function Un2(e3, t, r, s, n) {
  let o = await t(e3, r, s);
  if (o instanceof Response)
    return o;
  if (!Pn2(o))
    throw new x2({ ...Ks2, message: Ks2.message(n?.route, typeof o), location: { file: n?.component } });
  return Yr2(o) ? o.content : o;
}
async function lu(e3) {
  let t = e3._metadata.propagators.values();
  for (; ; ) {
    let { value: r, done: s } = t.next();
    if (s)
      break;
    let n = await r.init(e3);
    Yr2(n) && e3._metadata.extraHead.push(n.head);
  }
}
function du(e3) {
  return typeof HTMLElement < "u" && HTMLElement.isPrototypeOf(e3);
}
async function pu(e3, t, r, s) {
  let n = uu(t), o = "";
  for (let a in r)
    o += ` ${a}="${Re2(await r[a])}"`;
  return U2(`<${n}${o}>${await Te2(e3, s?.default)}</${n}>`);
}
function uu(e3) {
  let t = customElements.getName(e3);
  return t || e3.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
}
function hu(e3) {
  switch (e3?.split(".").pop()) {
    case "svelte":
      return ["@astrojs/svelte"];
    case "vue":
      return ["@astrojs/vue"];
    case "jsx":
    case "tsx":
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/solid-js", "@astrojs/vue (jsx)"];
    default:
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/solid-js", "@astrojs/vue", "@astrojs/svelte", "@astrojs/lit"];
  }
}
function fu(e3) {
  return e3 === b;
}
function gu(e3) {
  return e3 && e3["astro:html"] === true;
}
function vu(e3, t) {
  let r = t ? wu : yu;
  return e3.replace(r, "");
}
async function bu(e3, t, r, s, n = {}) {
  if (!r && !s["client:only"])
    throw new Error(`Unable to render ${t} because it is ${r}!
Did you forget to import the component or is it possible there is a typo?`);
  let { renderers: o, clientDirectives: a } = e3, i = { astroStaticSlot: true, displayName: t }, { hydration: l, isPage: d, props: c, propsWithoutTransitionAttributes: u } = Np(s, a), h = "", $;
  l && (i.hydrate = l.directive, i.hydrateArgs = l.value, i.componentExport = l.componentExport, i.componentUrl = l.componentUrl);
  let S = hu(i.componentUrl), A = o.filter((T2) => T2.name !== "astro:jsx"), { children: C2, slotInstructions: I2 } = await Rn2(e3, n), M2;
  if (i.hydrate !== "only") {
    let T2 = false;
    try {
      T2 = r && r[St2];
    } catch {
    }
    if (T2) {
      let O2 = r[St2];
      M2 = o.find(({ name: B2 }) => B2 === O2);
    }
    if (!M2) {
      let O2;
      for (let B2 of o)
        try {
          if (await B2.ssr.check.call({ result: e3 }, r, c, C2)) {
            M2 = B2;
            break;
          }
        } catch (Xe2) {
          O2 ??= Xe2;
        }
      if (!M2 && O2)
        throw O2;
    }
    if (!M2 && typeof HTMLElement == "function" && du(r)) {
      let O2 = await pu(e3, r, s, n);
      return { render(B2) {
        B2.write(O2);
      } };
    }
  } else {
    if (i.hydrateArgs) {
      let T2 = i.hydrateArgs, O2 = cn2.has(T2) ? cn2.get(T2) : T2;
      M2 = o.find(({ name: B2 }) => B2 === `@astrojs/${O2}` || B2 === O2);
    }
    if (!M2 && A.length === 1 && (M2 = A[0]), !M2) {
      let T2 = i.componentUrl?.split(".").pop();
      M2 = o.filter(({ name: O2 }) => O2 === `@astrojs/${T2}` || O2 === T2)[0];
    }
  }
  if (M2)
    i.hydrate === "only" ? h = await Te2(e3, n?.fallback) : { html: h, attrs: $ } = await M2.ssr.renderToStaticMarkup.call({ result: e3 }, r, u, C2, i);
  else {
    if (i.hydrate === "only")
      throw new x2({ ...Sr2, message: Sr2.message(i.displayName), hint: Sr2.hint(S.map((T2) => T2.replace("@astrojs/", "")).join("|")) });
    if (typeof r != "string") {
      let T2 = A.filter((B2) => S.includes(B2.name)), O2 = A.length > 1;
      if (T2.length === 0)
        throw new x2({ ...kr2, message: kr2.message(i.displayName, i?.componentUrl?.split(".").pop(), O2, A.length), hint: kr2.hint(on2(S.map((B2) => "`" + B2 + "`"))) });
      if (T2.length === 1)
        M2 = T2[0], { html: h, attrs: $ } = await M2.ssr.renderToStaticMarkup.call({ result: e3 }, r, u, C2, i);
      else
        throw new Error(`Unable to render ${i.displayName}!

This component likely uses ${on2(S)},
but Astro encountered an error during server-side rendering.

Please ensure that ${i.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
    }
  }
  if (M2 && !M2.clientEntrypoint && M2.name !== "@astrojs/lit" && i.hydrate)
    throw new x2({ ...Ys2, message: Ys2.message(t, i.hydrate, M2.name) });
  if (!h && typeof r == "string") {
    let T2 = xu(r), O2 = Object.values(C2).join(""), B2 = F2`<${T2}${$r2(c)}${U2(O2 === "" && Jr2.test(T2) ? "/>" : `>${O2}</${T2}>`)}`;
    h = "";
    let Xe2 = { write(Ns2) {
      Ns2 instanceof Response || (h += ve(e3, Ns2));
    } };
    await B2.render(Xe2);
  }
  if (!l)
    return { render(T2) {
      if (I2)
        for (let O2 of I2)
          T2.write(O2);
      d || M2?.name === "astro:jsx" ? T2.write(h) : h && h.length > 0 && T2.write(U2(vu(h, M2?.ssr?.supportsAstroStaticSlot ?? false)));
    } };
  let V2 = zp(`<!--${i.componentExport.value}:${i.componentUrl}-->
${h}
${jn2(c, i)}`), G2 = await Op({ renderer: M2, result: e3, astroId: V2, props: c, attrs: $ }, i), K2 = [];
  if (h) {
    if (Object.keys(C2).length > 0)
      for (let T2 of Object.keys(C2)) {
        let O2 = M2?.ssr?.supportsAstroStaticSlot ? i.hydrate ? "astro-slot" : "astro-static-slot" : "astro-slot", B2 = T2 === "default" ? `<${O2}>` : `<${O2} name="${T2}">`;
        h.includes(B2) || K2.push(T2);
      }
  } else
    K2 = Object.keys(C2);
  let te2 = K2.length > 0 ? K2.map((T2) => `<template data-astro-template${T2 !== "default" ? `="${T2}"` : ""}>${C2[T2]}</template>`).join("") : "";
  return G2.children = `${h ?? ""}${te2}`, G2.children && (G2.props["await-children"] = "", G2.children += "<!--astro:end-->"), { render(T2) {
    if (I2)
      for (let O2 of I2)
        T2.write(O2);
    T2.write(_t3({ type: "directive", hydration: l })), l.directive !== "only" && M2?.ssr.renderHydrationScript && T2.write(_t3({ type: "renderer-hydration-script", rendererName: M2.name, render: M2.ssr.renderHydrationScript })), T2.write(U2(we2("astro-island", G2, false)));
  } };
}
function xu(e3) {
  let t = /[&<>'"\s]+/;
  return t.test(e3) ? e3.trim().split(t)[0].trim() : e3;
}
async function _u2(e3, t = {}) {
  let r = await Te2(e3, t?.default);
  return { render(s) {
    r != null && s.write(r);
  } };
}
async function ku(e3, t, r, s = {}) {
  let { slotInstructions: n, children: o } = await Rn2(e3, s), a = t({ slots: o }), i = n ? n.map((l) => ve(e3, l)).join("") : "";
  return { render(l) {
    l.write(U2(i + a));
  } };
}
function Su(e3, t, r, s, n = {}) {
  let o = au(e3, t, r, s, n);
  return { async render(a) {
    await o.render(a);
  } };
}
async function Q(e3, t, r, s, n = {}) {
  return Kr(r) && (r = await r), fu(r) ? await _u2(e3, n) : (s = ju(s), gu(r) ? await ku(e3, r, s, n) : Cn2(r) ? Su(e3, t, r, s, n) : await bu(e3, t, r, s, n));
}
function ju(e3) {
  if (e3["class:list"] !== void 0) {
    let t = e3["class:list"];
    delete e3["class:list"], e3.class = xr2(e3.class, t), e3.class === "" && delete e3.class;
  }
  return e3;
}
async function Mr2(e3, t, r, s, n = {}, o = false, a) {
  let i = "", l = false, d = "";
  if (Au(r))
    for (let c of J2())
      d += ve(e3, c);
  try {
    let c = { write(h) {
      if (o && !l && (l = true, !e3.partial && !/<!doctype html/i.test(String(h)))) {
        let $ = e3.compressHTML ? "<!DOCTYPE html>" : `<!DOCTYPE html>
`;
        i += $ + d;
      }
      h instanceof Response || (i += ve(e3, h));
    } };
    await (await Q(e3, t, r, s, n)).render(c);
  } catch (c) {
    throw x2.is(c) && !c.loc && c.setLocation({ file: a?.component }), c;
  }
  return i;
}
function Au(e3) {
  return !!e3?.[mu];
}
async function pe2(e3, t) {
  switch (true) {
    case t instanceof Ce2:
      return t.toString().trim() === "" ? "" : t;
    case typeof t == "string":
      return U2(Ye2(t));
    case typeof t == "function":
      return t;
    case (!t && t !== 0):
      return "";
    case Array.isArray(t):
      return U2((await Promise.all(t.map((s) => pe2(e3, s)))).join(""));
  }
  let r;
  return t.props ? t.props[Ae2.symbol] ? r = t.props[Ae2.symbol] : r = new Ae2(t) : r = new Ae2(t), Pr2(e3, t, r);
}
async function Pr2(e3, t, r) {
  if (Je2(t)) {
    switch (true) {
      case !t.type:
        throw new Error(`Unable to render ${e3.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`);
      case t.type === Symbol.for("astro:fragment"):
        return pe2(e3, t.props.children);
      case t.type.isAstroComponentFactory: {
        let s = {}, n = {};
        for (let [i, l] of Object.entries(t.props ?? {}))
          i === "children" || l && typeof l == "object" && l.$$slot ? n[i === "children" ? "default" : i] = () => pe2(e3, l) : s[i] = l;
        let o = await Ln2(e3, t.type, s, n);
        if (o instanceof Response)
          throw o;
        return U2(o);
      }
      case (!t.type && t.type !== 0):
        return "";
      case (typeof t.type == "string" && t.type !== ln):
        return U2(await Cu(e3, t.type, t.props ?? {}));
    }
    if (t.type) {
      let s = function(c) {
        if (Array.isArray(c))
          return c.map((u) => s(u));
        if (!Je2(c)) {
          a.default.push(c);
          return;
        }
        if ("slot" in c.props) {
          a[c.props.slot] = [...a[c.props.slot] ?? [], c], delete c.props.slot;
          return;
        }
        a.default.push(c);
      };
      if (typeof t.type == "function" && t.type["astro:renderer"] && r.increment(), typeof t.type == "function" && t.props["server:root"]) {
        let c = await t.type(t.props ?? {});
        return await pe2(e3, c);
      }
      if (typeof t.type == "function")
        if (r.haveNoTried() || r.isCompleted()) {
          $u();
          try {
            let c = await t.type(t.props ?? {}), u;
            if (c?.[tt2])
              return u = await Pr2(e3, c, r), u;
            if (!c)
              return u = await Pr2(e3, c, r), u;
          } catch (c) {
            if (r.isCompleted())
              throw c;
            r.increment();
          } finally {
            Iu();
          }
        } else
          r.increment();
      let { children: n = null, ...o } = t.props ?? {}, a = { default: [] };
      s(n);
      for (let [c, u] of Object.entries(o))
        u.$$slot && (a[c] = u, delete o[c]);
      let i = [], l = {};
      for (let [c, u] of Object.entries(a))
        i.push(pe2(e3, u).then((h) => {
          h.toString().trim().length !== 0 && (l[c] = () => h);
        }));
      await Promise.all(i), o[Ae2.symbol] = r;
      let d;
      return t.type === ln && t.props["client:only"] ? d = await Mr2(e3, t.props["client:display-name"] ?? "", null, o, l) : d = await Mr2(e3, typeof t.type == "function" ? t.type.name : t.type, t.type, o, l), U2(d);
    }
  }
  return U2(`${t}`);
}
async function Cu(e3, t, { children: r, ...s }) {
  return U2(`<${t}${be2(s)}${U2((r == null || r == "") && Jr2.test(t) ? "/>" : `>${r == null ? "" : await pe2(e3, Tu(t, r))}</${t}>`)}`);
}
function Tu(e3, t) {
  return typeof t == "string" && (e3 === "style" || e3 === "script") ? U2(t) : t;
}
function $u() {
  if (es2++, !Er2) {
    Er2 = console.error;
    try {
      console.error = Du;
    } catch {
    }
  }
}
function Iu() {
  es2--;
}
function Du(e3, ...t) {
  es2 > 0 && typeof e3 == "string" && e3.includes("Warning: Invalid hook call.") && e3.includes("https://reactjs.org/link/invalid-hook-call") || Er2(e3, ...t);
}
async function Nn2(e3, t, r, s, n, o) {
  if (!Cn2(t)) {
    e3._metadata.headInTree = e3.componentMetadata.get(t.moduleId)?.containsHead ?? false;
    let c = { ...r ?? {}, "server:root": true }, u = await Mr2(e3, t.name, t, c, {}, true, o), h = jt2.encode(u);
    return new Response(h, { headers: new Headers([["Content-Type", "text/html; charset=utf-8"], ["Content-Length", h.byteLength.toString()]]) });
  }
  e3._metadata.headInTree = e3.componentMetadata.get(t.moduleId)?.containsHead ?? false;
  let a;
  if (n ? a = await cu(e3, t, r, s, true, o) : a = await Ln2(e3, t, r, s, true, o), a instanceof Response)
    return a;
  let i = e3.response, l = new Headers(i.headers);
  return !n && typeof a == "string" && (a = jt2.encode(a), l.set("Content-Length", a.byteLength.toString())), o?.component.endsWith(".md") && l.set("Content-Type", "text/html; charset=utf-8"), new Response(a, { ...i, headers: l });
}
function On2({ props: e3, children: t }) {
  return we2("script", { props: e3, children: t });
}
function ts2(e3, t) {
  if (t.type === "external")
    return Array.from(e3.styles).some((r) => r.props.href === t.src) ? "" : we2("link", { props: { rel: "stylesheet", href: t.src }, children: "" });
  if (t.type === "inline")
    return Array.from(e3.styles).some((r) => r.children.includes(t.content)) ? "" : we2("style", { props: {}, children: t.content });
}
function y(e3, t) {
  e3 && typeof e3 == "function" && Object.defineProperty(e3, St2, { value: t, enumerable: false, writable: false });
}
function be2(e3 = {}, t, { class: r } = {}) {
  let s = "";
  r && (typeof e3.class < "u" ? e3.class += ` ${r}` : typeof e3["class:list"] < "u" ? e3["class:list"] = [e3["class:list"], r] : e3.class = r);
  for (let [n, o] of Object.entries(e3))
    s += ie2(o, n, true);
  return U2(s);
}
function Je2(e3) {
  return e3 && typeof e3 == "object" && e3[tt2];
}
function Ru(e3) {
  if (typeof e3.type == "string")
    return e3;
  let t = {};
  if (Je2(e3.props.children)) {
    let r = e3.props.children;
    if (!Je2(r) || !("slot" in r.props))
      return;
    let s = pn(r.props.slot);
    t[s] = [r], t[s].$$slot = true, delete r.props.slot, delete e3.props.children;
  }
  Array.isArray(e3.props.children) && (e3.props.children = e3.props.children.map((r) => {
    if (!Je2(r) || !("slot" in r.props))
      return r;
    let s = pn(r.props.slot);
    return Array.isArray(t[s]) ? t[s].push(r) : (t[s] = [r], t[s].$$slot = true), delete r.props.slot, dn;
  }).filter((r) => r !== dn)), Object.assign(e3.props, t);
}
function Hn2(e3) {
  return typeof e3 == "string" ? U2(e3) : Array.isArray(e3) ? e3.map((t) => Hn2(t)) : e3;
}
function Mu(e3) {
  if ("set:html" in e3.props || "set:text" in e3.props) {
    if ("set:html" in e3.props) {
      let t = Hn2(e3.props["set:html"]);
      delete e3.props["set:html"], Object.assign(e3.props, { children: t });
      return;
    }
    if ("set:text" in e3.props) {
      let t = e3.props["set:text"];
      delete e3.props["set:text"], Object.assign(e3.props, { children: t });
      return;
    }
  }
}
function p(e3, t) {
  let r = { [St2]: "astro:jsx", [tt2]: true, type: e3, props: t ?? {} };
  return Mu(r), Ru(r), r;
}
var b_;
var x2;
var Qe2;
var Lr2;
var At;
var Ks2;
var $p;
var kr2;
var Ys2;
var Sr2;
var Ur2;
var Nr2;
var un;
var Or2;
var mn;
var Hr2;
var Js2;
var Qs2;
var zr2;
var Fr2;
var hn2;
var Vr2;
var Br2;
var fn;
var Ct2;
var Pe2;
var Wr2;
var gn2;
var Tt2;
var yn2;
var $t2;
var It2;
var Zr;
var en;
var tn;
var wn2;
var vn2;
var qr2;
var Gr2;
var et2;
var Ye2;
var xt2;
var Ce2;
var U2;
var _n3;
var re2;
var An2;
var Tr2;
var Ar2;
var Tn2;
var Vp;
var Bp;
var Jr2;
var Gp;
var Xp;
var Kp;
var Yp;
var Jp;
var Re2;
var Qp;
var nn2;
var Cr2;
var Ir2;
var kt2;
var b;
var St2;
var jt2;
var ru;
var Mn2;
var Dr2;
var En2;
var Rr2;
var mu;
var cn2;
var yu;
var wu;
var ln;
var Ae2;
var Er2;
var es2;
var tt2;
var dn;
var pn;
var P2 = m(() => {
  "use strict";
  le2();
  L();
  b_ = ne2(de2(), 1);
  Xs2();
  x2 = class extends Error {
    loc;
    title;
    hint;
    frame;
    type = "AstroError";
    constructor(t, r) {
      let { name: s, title: n, message: o, stack: a, location: i, hint: l, frame: d } = t;
      super(o, r), this.title = n, this.name = s, o && (this.message = o), this.stack = a || this.stack, this.loc = i, this.hint = l, this.frame = d;
    }
    setLocation(t) {
      this.loc = t;
    }
    setName(t) {
      this.name = t;
    }
    setMessage(t) {
      this.message = t;
    }
    setHint(t) {
      this.hint = t;
    }
    setFrame(t, r) {
      this.frame = Tp(t, r);
    }
    static is(t) {
      return t.type === "AstroError";
    }
  }, Qe2 = { name: "ClientAddressNotAvailable", title: "`Astro.clientAddress` is not available in current adapter.", message: (e3) => `\`Astro.clientAddress\` is not available in the \`${e3}\` adapter. File an issue with the adapter to add support.` }, Lr2 = { name: "StaticClientAddressNotAvailable", title: "`Astro.clientAddress` is not available in static mode.", message: "`Astro.clientAddress` is only available when using `output: 'server'` or `output: 'hybrid'`. Update your Astro config if you need SSR features.", hint: "See https://docs.astro.build/en/guides/server-side-rendering/ for more information on how to enable SSR." }, At = { name: "NoMatchingStaticPathFound", title: "No static path found for requested path.", message: (e3) => `A \`getStaticPaths()\` route pattern was matched, but no matching static path was found for requested path \`${e3}\`.`, hint: (e3) => `Possible dynamic routes being matched: ${e3.join(", ")}.` }, Ks2 = { name: "OnlyResponseCanBeReturned", title: "Invalid type returned by Astro page.", message: (e3, t) => `Route \`${e3 || ""}\` returned a \`${t}\`. Only a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) can be returned from Astro files.`, hint: "See https://docs.astro.build/en/guides/server-side-rendering/#response for more information." }, $p = { name: "MissingMediaQueryDirective", title: "Missing value for `client:media` directive.", message: 'Media query not provided for `client:media` directive. A media query similar to `client:media="(max-width: 600px)"` must be provided' }, kr2 = { name: "NoMatchingRenderer", title: "No matching renderer found.", message: (e3, t, r, s) => `Unable to render \`${e3}\`.

${s > 0 ? `There ${r ? "are" : "is"} ${s} renderer${r ? "s" : ""} configured in your \`astro.config.mjs\` file,
but ${r ? "none were" : "it was not"} able to server-side render \`${e3}\`.` : `No valid renderer was found ${t ? `for the \`.${t}\` file extension.` : "for this file extension."}`}`, hint: (e3) => `Did you mean to enable the ${e3} integration?

See https://docs.astro.build/en/guides/framework-components/ for more information on how to install and configure integrations.` }, Ys2 = { name: "NoClientEntrypoint", title: "No client entrypoint specified in renderer.", message: (e3, t, r) => `\`${e3}\` component has a \`client:${t}\` directive, but no client entrypoint was provided by \`${r}\`.`, hint: "See https://docs.astro.build/en/reference/integrations-reference/#addrenderer-option for more information on how to configure your renderer." }, Sr2 = { name: "NoClientOnlyHint", title: "Missing hint on client:only directive.", message: (e3) => `Unable to render \`${e3}\`. When using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.`, hint: (e3) => `Did you mean to pass \`client:only="${e3}"\`? See https://docs.astro.build/en/reference/directives-reference/#clientonly for more information on client:only` }, Ur2 = { name: "InvalidGetStaticPathsEntry", title: "Invalid entry inside getStaticPath's return value", message: (e3) => `Invalid entry returned by getStaticPaths. Expected an object, got \`${e3}\``, hint: "If you're using a `.map` call, you might be looking for `.flatMap()` instead. See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths." }, Nr2 = { name: "InvalidGetStaticPathsReturn", title: "Invalid value returned by getStaticPaths.", message: (e3) => `Invalid type returned by \`getStaticPaths\`. Expected an \`array\`, got \`${e3}\``, hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths." }, un = { name: "GetStaticPathsExpectedParams", title: "Missing params property on `getStaticPaths` route.", message: "Missing or empty required `params` property on `getStaticPaths` route.", hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths." }, Or2 = { name: "GetStaticPathsInvalidRouteParam", title: "Invalid value for `getStaticPaths` route parameter.", message: (e3, t, r) => `Invalid getStaticPaths route parameter for \`${e3}\`. Expected undefined, a string or a number, received \`${r}\` (\`${t}\`)`, hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths." }, mn = { name: "GetStaticPathsRequired", title: "`getStaticPaths()` function required for dynamic routes.", message: "`getStaticPaths()` function is required for dynamic routes. Make sure that you `export` a `getStaticPaths` function from your dynamic route.", hint: 'See https://docs.astro.build/en/guides/routing/#dynamic-routes for more information on dynamic routes.\n\nAlternatively, set `output: "server"` or `output: "hybrid"` in your Astro config file to switch to a non-static server build. This error can also occur if using `export const prerender = true;`.\nSee https://docs.astro.build/en/guides/server-side-rendering/ for more information on non-static rendering.' }, Hr2 = { name: "ReservedSlotName", title: "Invalid slot name.", message: (e3) => `Unable to create a slot named \`${e3}\`. \`${e3}\` is a reserved slot name. Please update the name of this slot.` }, Js2 = { name: "NoMatchingImport", title: "No import found for component.", message: (e3) => `Could not render \`${e3}\`. No matching import has been found for \`${e3}\`.`, hint: "Please make sure the component is properly imported." }, Qs2 = { name: "InvalidComponentArgs", title: "Invalid component arguments.", message: (e3) => `Invalid arguments passed to${e3 ? ` <${e3}>` : ""} component.`, hint: "Astro components cannot be rendered directly via function call, such as `Component()` or `{items.map(Component)}`." }, zr2 = { name: "PageNumberParamNotFound", title: "Page number param not found.", message: (e3) => `[paginate()] page number param \`${e3}\` not found in your filepath.`, hint: "Rename your file to `[page].astro` or `[...page].astro`." }, Fr2 = { name: "ImageMissingAlt", title: 'Image missing required "alt" property.', message: 'Image missing "alt" property. "alt" text is required to describe important images on the page.', hint: 'Use an empty string ("") for decorative images.' }, hn2 = { name: "InvalidImageService", title: "Error while loading image service.", message: "There was an error loading the configured image service. Please see the stack trace for more information." }, Vr2 = { name: "MissingImageDimension", title: "Missing image dimensions", message: (e3, t) => `Missing ${e3 === "both" ? "width and height attributes" : `${e3} attribute`} for ${t}. When using remote images, both dimensions are always required in order to avoid CLS.`, hint: "If your image is inside your `src` folder, you probably meant to import it instead. See [the Imports guide for more information](https://docs.astro.build/en/guides/imports/#other-assets)." }, Br2 = { name: "UnsupportedImageFormat", title: "Unsupported image format", message: (e3, t, r) => `Received unsupported format \`${e3}\` from \`${t}\`. Currently only ${r.join(", ")} are supported by our image services.`, hint: "Using an `img` tag directly instead of the `Image` component might be what you're looking for." }, fn = { name: "UnsupportedImageConversion", title: "Unsupported image conversion", message: "Converting between vector (such as SVGs) and raster (such as PNGs and JPEGs) images is not currently supported." }, Ct2 = { name: "PrerenderDynamicEndpointPathCollide", title: "Prerendered dynamic endpoint has path collision.", message: (e3) => `Could not render \`${e3}\` with an \`undefined\` param as the generated path will collide during prerendering. Prevent passing \`undefined\` as \`params\` for the endpoint's \`getStaticPaths()\` function, or add an additional extension to the endpoint's filename.`, hint: (e3) => `Rename \`${e3}\` to \`${e3.replace(/\.(?:js|ts)/, (t) => ".json" + t)}\`` }, Pe2 = { name: "ExpectedImage", title: "Expected src to be an image.", message: (e3, t, r) => `Expected \`src\` property for \`getImage\` or \`<Image />\` to be either an ESM imported image or a string with the path of a remote image. Received \`${e3}\` (type: \`${t}\`).

Full serialized options received: \`${r}\`.`, hint: "This error can often happen because of a wrong path. Make sure the path to your image is correct. If you're passing an async function, make sure to call and await it." }, Wr2 = { name: "ExpectedImageOptions", title: "Expected image options.", message: (e3) => `Expected getImage() parameter to be an object. Received \`${e3}\`.` }, gn2 = { name: "IncompatibleDescriptorOptions", title: "Cannot set both `densities` and `widths`", message: "Only one of `densities` or `widths` can be specified. In most cases, you'll probably want to use only `widths` if you require specific widths.", hint: "Those attributes are used to construct a `srcset` attribute, which cannot have both `x` and `w` descriptors." }, Tt2 = { name: "ResponseSentError", title: "Unable to set response.", message: "The response has already been sent to the browser and cannot be altered." }, yn2 = { name: "MiddlewareNoDataOrNextCalled", title: "The middleware didn't return a `Response`.", message: "Make sure your middleware returns a `Response` object, either directly or by returning the `Response` from calling the `next` function." }, $t2 = { name: "MiddlewareNotAResponse", title: "The middleware returned something that is not a `Response` object.", message: "Any data returned from middleware must be a valid `Response` object." }, It2 = { name: "LocalsNotAnObject", title: "Value assigned to `locals` is not accepted.", message: "`locals` can only be assigned to an object. Other values like numbers, strings, etc. are not accepted.", hint: "If you tried to remove some information from the `locals` object, try to use `delete` or set the property to `undefined`." }, Zr = { name: "LocalImageUsedWrongly", title: "Local images must be imported.", message: (e3) => `\`Image\`'s and \`getImage\`'s \`src\` parameter must be an imported image or an URL, it cannot be a string filepath. Received \`${e3}\`.`, hint: "If you want to use an image from your `src` folder, you need to either import it or if the image is coming from a content collection, use the [image() schema helper](https://docs.astro.build/en/guides/images/#images-in-content-collections). See https://docs.astro.build/en/guides/images/#src-required for more information on the `src` property." }, en = { name: "AstroGlobUsedOutside", title: "Astro.glob() used outside of an Astro file.", message: (e3) => `\`Astro.glob(${e3})\` can only be used in \`.astro\` files. \`import.meta.glob(${e3})\` can be used instead to achieve a similar result.`, hint: "See Vite's documentation on `import.meta.glob` for more information: https://vitejs.dev/guide/features.html#glob-import" }, tn = { name: "AstroGlobNoMatch", title: "Astro.glob() did not match any files.", message: (e3) => `\`Astro.glob(${e3})\` did not return any matching files.`, hint: "Check the pattern for typos." }, wn2 = { name: "CantRenderPage", title: "Astro can't render the route.", message: "Astro cannot find any content to render for this route. There is no file or redirect associated with this route.", hint: "If you expect to find a route here, this may be an Astro bug. Please file an issue/restart the dev server" }, vn2 = { name: "UnknownContentCollectionError", title: "Unknown Content Collection Error." };
  qr2 = "4.3.7", Gr2 = "astro.routeData";
  et2 = "X-Astro-Reroute";
  Ye2 = Gs2, xt2 = class extends Uint8Array {
  };
  Object.defineProperty(xt2.prototype, Symbol.toStringTag, { get() {
    return "HTMLBytes";
  } });
  Ce2 = class extends String {
    get [Symbol.toStringTag]() {
      return "HTMLString";
    }
  }, U2 = (e3) => e3 instanceof Ce2 ? e3 : typeof e3 == "string" ? new Ce2(e3) : e3;
  _n3 = Symbol.for("astro:render");
  re2 = { Value: 0, JSON: 1, RegExp: 2, Date: 3, Map: 4, Set: 5, BigInt: 6, URL: 7, Uint8Array: 8, Uint16Array: 9, Uint32Array: 10 };
  An2 = Object.freeze(["data-astro-transition-scope", "data-astro-transition-persist"]);
  Tr2 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY", Ar2 = Tr2.length;
  Tn2 = Symbol.for("astro.headAndContent");
  Vp = '(()=>{var b=Object.defineProperty;var f=(c,s,a)=>s in c?b(c,s,{enumerable:!0,configurable:!0,writable:!0,value:a}):c[s]=a;var l=(c,s,a)=>(f(c,typeof s!="symbol"?s+"":s,a),a);var p;{let c={0:t=>m(t),1:t=>a(t),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(a(t)),5:t=>new Set(a(t)),6:t=>BigInt(t),7:t=>new URL(t),8:t=>new Uint8Array(t),9:t=>new Uint16Array(t),10:t=>new Uint32Array(t)},s=t=>{let[e,r]=t;return e in c?c[e](r):void 0},a=t=>t.map(s),m=t=>typeof t!="object"||t===null?t:Object.fromEntries(Object.entries(t).map(([e,r])=>[e,s(r)]));customElements.get("astro-island")||customElements.define("astro-island",(p=class extends HTMLElement{constructor(){super(...arguments);l(this,"Component");l(this,"hydrator");l(this,"hydrate",async()=>{var d;if(!this.hydrator||!this.isConnected)return;let e=(d=this.parentElement)==null?void 0:d.closest("astro-island[ssr]");if(e){e.addEventListener("astro:hydrate",this.hydrate,{once:!0});return}let r=this.querySelectorAll("astro-slot"),o={},h=this.querySelectorAll("template[data-astro-template]");for(let n of h){let i=n.closest(this.tagName);i!=null&&i.isSameNode(this)&&(o[n.getAttribute("data-astro-template")||"default"]=n.innerHTML,n.remove())}for(let n of r){let i=n.closest(this.tagName);i!=null&&i.isSameNode(this)&&(o[n.getAttribute("name")||"default"]=n.innerHTML)}let u;try{u=this.hasAttribute("props")?m(JSON.parse(this.getAttribute("props"))):{}}catch(n){let i=this.getAttribute("component-url")||"<unknown>",y=this.getAttribute("component-export");throw y&&(i+=` (export ${y})`),console.error(`[hydrate] Error parsing props for component ${i}`,this.getAttribute("props"),n),n}await this.hydrator(this)(this.Component,u,o,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),this.dispatchEvent(new CustomEvent("astro:hydrate"))});l(this,"unmount",()=>{this.isConnected||this.dispatchEvent(new CustomEvent("astro:unmount"))})}disconnectedCallback(){document.removeEventListener("astro:after-swap",this.unmount),document.addEventListener("astro:after-swap",this.unmount,{once:!0})}connectedCallback(){if(!this.hasAttribute("await-children")||document.readyState==="interactive"||document.readyState==="complete")this.childrenConnectedCallback();else{let e=()=>{document.removeEventListener("DOMContentLoaded",e),r.disconnect(),this.childrenConnectedCallback()},r=new MutationObserver(()=>{var o;((o=this.lastChild)==null?void 0:o.nodeType)===Node.COMMENT_NODE&&this.lastChild.nodeValue==="astro:end"&&(this.lastChild.remove(),e())});r.observe(this,{childList:!0}),document.addEventListener("DOMContentLoaded",e)}}async childrenConnectedCallback(){let e=this.getAttribute("before-hydration-url");e&&await import(e),this.start()}async start(){let e=JSON.parse(this.getAttribute("opts")),r=this.getAttribute("client");if(Astro[r]===void 0){window.addEventListener(`astro:${r}`,()=>this.start(),{once:!0});return}try{await Astro[r](async()=>{let o=this.getAttribute("renderer-url"),[h,{default:u}]=await Promise.all([import(this.getAttribute("component-url")),o?import(o):()=>()=>{}]),d=this.getAttribute("component-export")||"default";if(!d.includes("."))this.Component=h[d];else{this.Component=h;for(let n of d.split("."))this.Component=this.Component[n]}return this.hydrator=u,this.hydrate},e,this)}catch(o){console.error(`[astro-island] Error hydrating ${this.getAttribute("component-url")}`,o)}}attributeChangedCallback(){this.hydrate()}},l(p,"observedAttributes",["props"]),p))}})();', Bp = "<style>astro-island,astro-slot,astro-static-slot{display:contents}</style>";
  Jr2 = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i, Gp = /^(?:allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i, Xp = /^(?:contenteditable|draggable|spellcheck|value)$/i, Kp = /^(?:autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i, Yp = /* @__PURE__ */ new Set(["set:html", "set:text"]), Jp = (e3) => e3.trim().replace(/(?!^)\b\w|\s+|\W+/g, (t, r) => /\W/.test(t) ? "" : r === 0 ? t : t.toUpperCase()), Re2 = (e3, t = true) => t ? String(e3).replace(/&/g, "&#38;").replace(/"/g, "&#34;") : e3, Qp = (e3) => e3.toLowerCase() === e3 ? e3 : e3.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`), nn2 = (e3) => Object.entries(e3).filter(([t, r]) => typeof r == "string" && r.trim() || typeof r == "number").map(([t, r]) => t[0] !== "-" && t[1] !== "-" ? `${Qp(t)}:${r}` : `${t}:${r}`).join(";");
  Cr2 = (e3, t, r) => {
    let s = JSON.stringify(e3.props), n = e3.children;
    return t === r.findIndex((o) => JSON.stringify(o.props) === s && o.children == n);
  };
  Ir2 = Symbol.for("astro:slot-string"), kt2 = class extends Ce2 {
    instructions;
    [Ir2];
    constructor(t, r) {
      super(t), this.instructions = r, this[Ir2] = true;
    }
  };
  b = Symbol.for("astro:fragment"), St2 = Symbol.for("astro:renderer"), jt2 = new TextEncoder(), ru = new TextDecoder();
  Mn2 = Symbol.for("astro.componentInstance"), Dr2 = class {
    [Mn2] = true;
    result;
    props;
    slotValues;
    factory;
    returnValue;
    constructor(t, r, s, n) {
      this.result = t, this.props = r, this.factory = n, this.slotValues = {};
      for (let o in s) {
        let a = false, i = s[o](t);
        this.slotValues[o] = () => a ? s[o](t) : (a = true, i);
      }
    }
    async init(t) {
      return this.returnValue !== void 0 ? this.returnValue : (this.returnValue = this.factory(t, this.props, this.slotValues), this.returnValue);
    }
    async render(t) {
      this.returnValue === void 0 && await this.init(this.result);
      let r = this.returnValue;
      Kr(r) && (r = await r), Yr2(r) ? await r.content.render(t) : await Me2(t, r);
    }
  };
  En2 = Symbol.for("astro.renderTemplateResult"), Rr2 = class {
    [En2] = true;
    htmlParts;
    expressions;
    error;
    constructor(t, r) {
      this.htmlParts = t, this.error = void 0, this.expressions = r.map((s) => Kr(s) ? Promise.resolve(s).catch((n) => {
        if (!this.error)
          throw this.error = n, n;
      }) : s);
    }
    async render(t) {
      let r = this.expressions.map((s) => In2((n) => {
        if (s || s === 0)
          return Me2(n, s);
      }));
      for (let s = 0; s < this.htmlParts.length; s++) {
        let n = this.htmlParts[s], o = r[s];
        t.write(U2(n)), o && await o.renderToFinalDestination(t);
      }
    }
  };
  mu = Symbol.for("astro.needsHeadRendering"), cn2 = /* @__PURE__ */ new Map([["solid", "solid-js"]]);
  yu = /<\/?astro-slot\b[^>]*>/g, wu = /<\/?astro-static-slot\b[^>]*>/g;
  ln = "astro-client-only", Ae2 = class {
    constructor(t) {
      this.vnode = t, this.count = 0;
    }
    count;
    increment() {
      this.count++;
    }
    haveNoTried() {
      return this.count === 0;
    }
    isCompleted() {
      return this.count > 2;
    }
    static symbol = Symbol("astro:jsx:skip");
  }, es2 = 0;
  tt2 = "astro:jsx", dn = Symbol("empty"), pn = (e3) => e3;
});
async function Eu(e3, t, { default: r = null, ...s } = {}) {
  if (typeof e3 != "function")
    return false;
  let n = {};
  for (let [o, a] of Object.entries(s)) {
    let i = zn2(o);
    n[i] = a;
  }
  try {
    return (await e3({ ...t, ...n, children: r }))[tt2];
  } catch (o) {
    let a = o;
    if (e3[Symbol.for("mdx-component")])
      throw new x2({ message: a.message, title: a.name, hint: "This issue often occurs when your MDX component encounters runtime errors.", name: a.name, stack: a.stack });
  }
  return false;
}
async function Pu(e3, t = {}, { default: r = null, ...s } = {}) {
  let n = {};
  for (let [i, l] of Object.entries(s)) {
    let d = zn2(i);
    n[d] = l;
  }
  let { result: o } = this;
  return { html: await pe2(o, p(e3, { ...t, ...n, children: r })) };
}
var zn2;
var Lu;
var Z2;
var ue2 = m(() => {
  "use strict";
  P2();
  zn2 = (e3) => e3.trim().replace(/[-_]([a-z])/g, (t, r) => r.toUpperCase());
  Lu = { check: Eu, renderToStaticMarkup: Pu }, Z2 = [Object.assign({ name: "astro:jsx", serverEntrypoint: "astro/jsx/server.js", jsxImportSource: "astro" }, { ssr: Lu })];
});
function rs2(e3) {
  return e3.endsWith("/") ? e3 : e3 + "/";
}
function xe2(e3) {
  return e3[0] === "/" ? e3 : "/" + e3;
}
function ss2(e3) {
  return e3.replace(/(?<!:)\/\/+/g, "/");
}
function Rt2(e3) {
  return e3.endsWith("/") ? e3.slice(0, e3.length - 1) : e3;
}
function Uu(e3) {
  return e3.startsWith("/") ? e3.substring(1) : e3;
}
function ns2(e3) {
  return e3.replace(/^\/|\/$/g, "");
}
function Nu(e3) {
  return typeof e3 == "string" || e3 instanceof String;
}
function _e3(...e3) {
  return e3.filter(Nu).map((t, r) => r === 0 ? Rt2(t) : r === e3.length - 1 ? Uu(t) : ns2(t)).join("/");
}
function Le2(e3) {
  return /^(http|ftp|https|ws):?\/\//.test(e3) || e3.startsWith("data:");
}
function os2(e3) {
  return e3.replace(/\\/g, "/");
}
var Ue2 = m(() => {
});
var is2 = Ke2((as2) => {
  "use strict";
  as2.parse = Hu;
  as2.serialize = zu;
  var Ou = Object.prototype.toString, Mt2 = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
  function Hu(e3, t) {
    if (typeof e3 != "string")
      throw new TypeError("argument str must be a string");
    for (var r = {}, s = t || {}, n = s.decode || Fu, o = 0; o < e3.length; ) {
      var a = e3.indexOf("=", o);
      if (a === -1)
        break;
      var i = e3.indexOf(";", o);
      if (i === -1)
        i = e3.length;
      else if (i < a) {
        o = e3.lastIndexOf(";", a - 1) + 1;
        continue;
      }
      var l = e3.slice(o, a).trim();
      if (r[l] === void 0) {
        var d = e3.slice(a + 1, i).trim();
        d.charCodeAt(0) === 34 && (d = d.slice(1, -1)), r[l] = Wu(d, n);
      }
      o = i + 1;
    }
    return r;
  }
  function zu(e3, t, r) {
    var s = r || {}, n = s.encode || Vu;
    if (typeof n != "function")
      throw new TypeError("option encode is invalid");
    if (!Mt2.test(e3))
      throw new TypeError("argument name is invalid");
    var o = n(t);
    if (o && !Mt2.test(o))
      throw new TypeError("argument val is invalid");
    var a = e3 + "=" + o;
    if (s.maxAge != null) {
      var i = s.maxAge - 0;
      if (isNaN(i) || !isFinite(i))
        throw new TypeError("option maxAge is invalid");
      a += "; Max-Age=" + Math.floor(i);
    }
    if (s.domain) {
      if (!Mt2.test(s.domain))
        throw new TypeError("option domain is invalid");
      a += "; Domain=" + s.domain;
    }
    if (s.path) {
      if (!Mt2.test(s.path))
        throw new TypeError("option path is invalid");
      a += "; Path=" + s.path;
    }
    if (s.expires) {
      var l = s.expires;
      if (!Bu(l) || isNaN(l.valueOf()))
        throw new TypeError("option expires is invalid");
      a += "; Expires=" + l.toUTCString();
    }
    if (s.httpOnly && (a += "; HttpOnly"), s.secure && (a += "; Secure"), s.partitioned && (a += "; Partitioned"), s.priority) {
      var d = typeof s.priority == "string" ? s.priority.toLowerCase() : s.priority;
      switch (d) {
        case "low":
          a += "; Priority=Low";
          break;
        case "medium":
          a += "; Priority=Medium";
          break;
        case "high":
          a += "; Priority=High";
          break;
        default:
          throw new TypeError("option priority is invalid");
      }
    }
    if (s.sameSite) {
      var c = typeof s.sameSite == "string" ? s.sameSite.toLowerCase() : s.sameSite;
      switch (c) {
        case true:
          a += "; SameSite=Strict";
          break;
        case "lax":
          a += "; SameSite=Lax";
          break;
        case "strict":
          a += "; SameSite=Strict";
          break;
        case "none":
          a += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    }
    return a;
  }
  function Fu(e3) {
    return e3.indexOf("%") !== -1 ? decodeURIComponent(e3) : e3;
  }
  function Vu(e3) {
    return encodeURIComponent(e3);
  }
  function Bu(e3) {
    return Ou.call(e3) === "[object Date]" || e3 instanceof Date;
  }
  function Wu(e3, t) {
    try {
      return t(e3);
    } catch {
      return e3;
    }
  }
});
var Yn2 = Ke2((U_, Kn2) => {
  "use strict";
  function Lt2() {
    this._types = /* @__PURE__ */ Object.create(null), this._extensions = /* @__PURE__ */ Object.create(null);
    for (let e3 = 0; e3 < arguments.length; e3++)
      this.define(arguments[e3]);
    this.define = this.define.bind(this), this.getType = this.getType.bind(this), this.getExtension = this.getExtension.bind(this);
  }
  Lt2.prototype.define = function(e3, t) {
    for (let r in e3) {
      let s = e3[r].map(function(n) {
        return n.toLowerCase();
      });
      r = r.toLowerCase();
      for (let n = 0; n < s.length; n++) {
        let o = s[n];
        if (o[0] !== "*") {
          if (!t && o in this._types)
            throw new Error('Attempt to change mapping for "' + o + '" extension from "' + this._types[o] + '" to "' + r + '". Pass `force=true` to allow this, otherwise remove "' + o + '" from the list of extensions for "' + r + '".');
          this._types[o] = r;
        }
      }
      if (t || !this._extensions[r]) {
        let n = s[0];
        this._extensions[r] = n[0] !== "*" ? n : n.substr(1);
      }
    }
  };
  Lt2.prototype.getType = function(e3) {
    e3 = String(e3);
    let t = e3.replace(/^.*[/\\]/, "").toLowerCase(), r = t.replace(/^.*\./, "").toLowerCase(), s = t.length < e3.length;
    return (r.length < t.length - 1 || !s) && this._types[r] || null;
  };
  Lt2.prototype.getExtension = function(e3) {
    return e3 = /^\s*([^;\s]*)/.test(e3) && RegExp.$1, e3 && this._extensions[e3.toLowerCase()] || null;
  };
  Kn2.exports = Lt2;
});
var Qn2 = Ke2((N_, Jn2) => {
  Jn2.exports = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["es", "ecma"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/express": ["exp"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/trig": ["trig"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/step+xml": ["stpx"], "model/step+zip": ["stpz"], "model/step-xml+zip": ["stpxz"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
});
var to2 = Ke2((O_, eo2) => {
  "use strict";
  var tm = Yn2();
  eo2.exports = new tm(Qn2());
});
var ao2 = {};
f(ao2, { D: () => Ut2, a: () => ds2, b: () => ls2, c: () => Nt2, i: () => fe2, n: () => lm });
function fe2(e3) {
  return typeof e3 == "object";
}
function ls2(e3) {
  return typeof e3 == "string";
}
function rm(e3, t) {
  return nm(e3, t.protocol) && oo2(e3, t.hostname, true) && sm(e3, t.port) && om(e3, t.pathname, true);
}
function sm(e3, t) {
  return !t || t === e3.port;
}
function nm(e3, t) {
  return !t || t === e3.protocol.slice(0, -1);
}
function oo2(e3, t, r) {
  if (t) {
    if (!r || !t.startsWith("*"))
      return t === e3.hostname;
    if (t.startsWith("**.")) {
      let s = t.slice(2);
      return s !== e3.hostname && e3.hostname.endsWith(s);
    } else if (t.startsWith("*.")) {
      let s = t.slice(1);
      return e3.hostname.replace(s, "").split(".").filter(Boolean).length === 1;
    }
  } else
    return true;
  return false;
}
function om(e3, t, r) {
  if (t) {
    if (!r || !t.endsWith("*"))
      return t === e3.pathname;
    if (t.endsWith("/**")) {
      let s = t.slice(0, -2);
      return s !== e3.pathname && e3.pathname.startsWith(s);
    } else if (t.endsWith("/*")) {
      let s = t.slice(0, -1);
      return e3.pathname.replace(s, "").split("/").filter(Boolean).length === 1;
    }
  } else
    return true;
  return false;
}
function Nt2(e3, { domains: t = [], remotePatterns: r = [] }) {
  if (!Le2(e3))
    return false;
  let s = new URL(e3);
  return t.some((n) => oo2(s, n)) || r.some((n) => rm(s, n));
}
function ds2(e3) {
  return e3 ? "transform" in e3 : false;
}
function no2(e3) {
  let t = e3.width, r = e3.height;
  if (fe2(e3.src)) {
    let s = e3.src.width / e3.src.height;
    r && !t ? t = Math.round(r * s) : t && !r ? r = Math.round(t / s) : !t && !r && (t = e3.src.width, r = e3.src.height);
  }
  return { targetWidth: t, targetHeight: r };
}
var ro2;
var so2;
var Ut2;
var am;
var im;
var cm;
var lm;
var ps2 = m(() => {
  "use strict";
  Ue2();
  P2();
  ro2 = ["jpeg", "jpg", "png", "tiff", "webp", "gif", "svg", "avif"], so2 = "webp", Ut2 = ["src", "width", "height", "format", "quality"];
  am = { propertiesToHash: Ut2, validateOptions(e3) {
    if (!e3.src || typeof e3.src != "string" && typeof e3.src != "object")
      throw new x2({ ...Pe2, message: Pe2.message(JSON.stringify(e3.src), typeof e3.src, JSON.stringify(e3, (t, r) => r === void 0 ? null : r)) });
    if (fe2(e3.src)) {
      if (!ro2.includes(e3.src.format))
        throw new x2({ ...Br2, message: Br2.message(e3.src.format, e3.src.src, ro2) });
      if (e3.widths && e3.densities)
        throw new x2(gn2);
      if (e3.src.format === "svg" && (e3.format = "svg"), e3.src.format === "svg" && e3.format !== "svg" || e3.src.format !== "svg" && e3.format === "svg")
        throw new x2(fn);
    } else {
      if (e3.src.startsWith("/@fs/") || !Le2(e3.src) && !e3.src.startsWith("/"))
        throw new x2({ ...Zr, message: Zr.message(e3.src) });
      let t;
      if (!e3.width && !e3.height ? t = "both" : !e3.width && e3.height ? t = "width" : e3.width && !e3.height && (t = "height"), t)
        throw new x2({ ...Vr2, message: Vr2.message(t, e3.src) });
    }
    return e3.format || (e3.format = so2), e3.width && (e3.width = Math.round(e3.width)), e3.height && (e3.height = Math.round(e3.height)), e3;
  }, getHTMLAttributes(e3) {
    let { targetWidth: t, targetHeight: r } = no2(e3), { src: s, width: n, height: o, format: a, quality: i, densities: l, widths: d, formats: c, ...u } = e3;
    return { ...u, width: t, height: r, loading: u.loading ?? "lazy", decoding: u.decoding ?? "async" };
  }, getSrcSet(e3) {
    let t = [], { targetWidth: r } = no2(e3), { widths: s, densities: n } = e3, o = e3.format ?? so2, a = e3.width, i = 1 / 0;
    fe2(e3.src) && (a = e3.src.width, i = a);
    let { width: l, height: d, ...c } = e3, u = [];
    if (n) {
      let h = n.map((S) => typeof S == "number" ? S : parseFloat(S)), $ = h.sort().map((S) => Math.round(r * S));
      u.push(...$.map((S, A) => ({ maxTargetWidth: Math.min(S, i), descriptor: `${h[A]}x` })));
    } else
      s && u.push(...s.map((h) => ({ maxTargetWidth: Math.min(h, i), descriptor: `${h}w` })));
    for (let { maxTargetWidth: h, descriptor: $ } of u) {
      let S = { ...c };
      h !== a ? S.width = h : e3.width && e3.height && (S.width = e3.width, S.height = e3.height), t.push({ transform: S, descriptor: $, attributes: { type: `image/${o}` } });
    }
    return t;
  }, getURL(e3, t) {
    let r = new URLSearchParams();
    if (fe2(e3.src))
      r.append("href", e3.src.src);
    else if (Nt2(e3.src, t))
      r.append("href", e3.src);
    else
      return e3.src;
    return Object.entries({ w: "width", h: "height", q: "quality", f: "format" }).forEach(([o, a]) => {
      e3[a] && r.append(o, e3[a].toString());
    }), `${_e3("/", "/_image")}?${r}`;
  }, parseURL(e3) {
    let t = e3.searchParams;
    return t.has("href") ? { src: t.get("href"), width: t.has("w") ? parseInt(t.get("w")) : void 0, height: t.has("h") ? parseInt(t.get("h")) : void 0, format: t.get("f"), quality: t.get("q") } : void 0;
  } };
  im = { ...am, propertiesToHash: ["src"], async transform(e3, t) {
    return { data: e3, format: t.format };
  } }, cm = im, lm = Object.freeze(Object.defineProperty({ __proto__: null, default: cm }, Symbol.toStringTag, { value: "Module" }));
});
var lo2 = {};
f(lo2, { $: () => k2, g: () => wm });
async function co2() {
  if (!globalThis?.astroAsset?.imageService) {
    let { default: e3 } = await Promise.resolve().then(() => (ps2(), ao2)).then((t) => t.n).catch((t) => {
      let r = new x2(hn2);
      throw r.cause = t, r;
    });
    return globalThis.astroAsset || (globalThis.astroAsset = {}), globalThis.astroAsset.imageService = e3, e3;
  }
  return globalThis.astroAsset.imageService;
}
async function dm(e3, t) {
  if (!e3 || typeof e3 != "object")
    throw new x2({ ...Wr2, message: Wr2.message(JSON.stringify(e3)) });
  if (typeof e3.src > "u")
    throw new x2({ ...Pe2, message: Pe2.message(e3.src, "undefined", JSON.stringify(e3)) });
  let r = await co2(), s = { ...e3, src: typeof e3.src == "object" && "then" in e3.src ? (await e3.src).default ?? await e3.src : e3.src }, n = fe2(s.src) ? s.src.fsPath : s.src, o = fe2(s.src) ? s.src.clone ?? s.src : s.src;
  s.src = o;
  let a = r.validateOptions ? await r.validateOptions(s, t) : s, i = r.getSrcSet ? await r.getSrcSet(a, t) : [], l = await r.getURL(a, t), d = await Promise.all(i.map(async (c) => ({ transform: c.transform, url: await r.getURL(c.transform, t), descriptor: c.descriptor, attributes: c.attributes })));
  if (ds2(r) && globalThis.astroAsset.addStaticImage && !(ls2(a.src) && l === a.src)) {
    let c = r.propertiesToHash ?? Ut2;
    l = globalThis.astroAsset.addStaticImage(a, c, n), d = i.map((u) => ({ transform: u.transform, url: globalThis.astroAsset.addStaticImage(u.transform, c, n), descriptor: u.descriptor, attributes: u.attributes }));
  }
  return { rawOptions: s, options: a, src: l, srcSet: { values: d, attribute: d.map((c) => `${c.url} ${c.descriptor}`).join(", ") }, attributes: r.getHTMLAttributes !== void 0 ? await r.getHTMLAttributes(a, t) : {} };
}
async function gm(e3) {
  try {
    let t = await fetch(e3);
    return t.ok ? await t.arrayBuffer() : void 0;
  } catch {
    return;
  }
}
var io2;
var pm;
var um;
var mm;
var k2;
var hm;
var fm;
var Ot2;
var us2;
var ym;
var wm;
var H = m(() => {
  "use strict";
  Ue2();
  io2 = ne2(to2(), 1);
  P2();
  ps2();
  L();
  pm = (e3) => {
    let t = e3.length, r = 0, s = 0, n = 8997, o = 0, a = 33826, i = 0, l = 40164, d = 0, c = 52210;
    for (; r < t; )
      n ^= e3.charCodeAt(r++), s = n * 435, o = a * 435, i = l * 435, d = c * 435, i += n << 8, d += a << 8, o += s >>> 16, n = s & 65535, i += o >>> 16, a = o & 65535, c = d + (i >>> 16) & 65535, l = i & 65535;
    return (c & 15) * 281474976710656 + l * 4294967296 + a * 65536 + (n ^ c >> 4);
  }, um = (e3, t = false) => (t ? 'W/"' : '"') + pm(e3).toString(36) + e3.length.toString(36) + '"', mm = X2(), k2 = W2(async (e3, t, r) => {
    let s = e3.createAstro(mm, t, r);
    s.self = k2;
    let n = s.props;
    if (n.alt === void 0 || n.alt === null)
      throw new x2(Fr2);
    typeof n.width == "string" && (n.width = parseInt(n.width)), typeof n.height == "string" && (n.height = parseInt(n.height));
    let o = await us2(n), a = {};
    return o.srcSet.values.length > 0 && (a.srcset = o.srcSet.attribute), F2`${J2()}<img${ie2(o.src, "src")}${be2(a)}${be2(o.attributes)}>`;
  }, "/Users/serdar/dev/projects/my-astro-app/node_modules/astro/components/Image.astro", void 0), hm = X2(), fm = W2(async (e3, t, r) => {
    let s = e3.createAstro(hm, t, r);
    s.self = fm;
    let n = ["webp"], o = "png", a = ["gif", "svg", "jpg", "jpeg"], { formats: i = n, pictureAttributes: l = {}, fallbackFormat: d, ...c } = s.props;
    if (c.alt === void 0 || c.alt === null)
      throw new x2(Fr2);
    let u = await Promise.all(i.map(async (C2) => await us2({ ...c, format: C2, widths: c.widths, densities: c.densities }))), h = d ?? o;
    !d && fe2(c.src) && a.includes(c.src.format) && (h = c.src.format);
    let $ = await us2({ ...c, format: h, widths: c.widths, densities: c.densities }), S = {}, A = {};
    return c.sizes && (A.sizes = c.sizes), $.srcSet.values.length > 0 && (S.srcset = $.srcSet.attribute), F2`${J2()}<picture${be2(l)}> ${Object.entries(u).map(([C2, I2]) => {
      let M2 = c.densities || !c.densities && !c.widths ? `${I2.src}${I2.srcSet.values.length > 0 ? ", " + I2.srcSet.attribute : ""}` : I2.srcSet.attribute;
      return F2`<source${ie2(M2, "srcset")}${ie2("image/" + I2.options.format, "type")}${be2(A)}>`;
    })} <img${ie2($.src, "src")}${be2(S)}${be2($.attributes)}> </picture>`;
  }, "/Users/serdar/dev/projects/my-astro-app/node_modules/astro/components/Picture.astro", void 0), Ot2 = { service: { entrypoint: "astro/assets/services/noop", config: {} }, domains: [], remotePatterns: [] };
  new URL("file:///Users/serdar/dev/projects/my-astro-app/dist/");
  us2 = async (e3) => await dm(e3, Ot2);
  ym = async ({ request: e3 }) => {
    try {
      let t = await co2();
      if (!("transform" in t))
        throw new Error("Configured image service is not a local service");
      let r = new URL(e3.url), s = await t.parseURL(r, Ot2);
      if (!s?.src)
        throw new Error("Incorrect transform returned by `parseURL`");
      let n, o = Le2(s.src) ? new URL(s.src) : new URL(s.src, r.origin);
      if (Le2(s.src) && Nt2(s.src, Ot2) === false)
        return new Response("Forbidden", { status: 403 });
      if (n = await gm(o), !n)
        return new Response("Not Found", { status: 404 });
      let { data: a, format: i } = await t.transform(new Uint8Array(n), s, Ot2);
      return new Response(a, { status: 200, headers: { "Content-Type": io2.default.getType(i) ?? `image/${i}`, "Cache-Control": "public, max-age=31536000", ETag: um(a.toString()), Date: (/* @__PURE__ */ new Date()).toUTCString() } });
    } catch (t) {
      return console.error("Could not process image request:", t), new Response(`Server Error: ${t}`, { status: 500 });
    }
  }, wm = Object.freeze(Object.defineProperty({ __proto__: null, GET: ym }, Symbol.toStringTag, { value: "Module" }));
});
var po2 = {};
f(po2, { page: () => vm, renderers: () => Z2 });
var vm;
var uo2 = m(() => {
  "use strict";
  ue2();
  vm = () => Promise.resolve().then(() => (H(), lo2)).then((e3) => e3.g);
});
var ho2 = {};
f(ho2, { default: () => mo2, file: () => xm, url: () => _m2 });
var K_;
var bm;
var mo2;
var xm;
var _m2;
var fo2 = m(() => {
  "use strict";
  P2();
  le2();
  L();
  K_ = ne2(de2(), 1), bm = X2(), mo2 = W2(async (e3, t, r) => {
    let s = e3.createAstro(bm, t, r);
    return s.self = mo2, F2`not found`;
  }, "/Users/serdar/dev/projects/my-astro-app/src/pages/404.astro", void 0), xm = "/Users/serdar/dev/projects/my-astro-app/src/pages/404.astro", _m2 = "/404";
});
var go2 = {};
f(go2, { page: () => km, renderers: () => Z2 });
var km;
var yo2 = m(() => {
  "use strict";
  ue2();
  km = () => Promise.resolve().then(() => (fo2(), ho2));
});
var bo2 = {};
f(bo2, { $: () => ge2, a: () => $m });
var t0;
var Sm;
var wo2;
var jm;
var ge2;
var Am;
var vo2;
var Cm;
var Tm;
var $m;
var nt2 = m(() => {
  "use strict";
  P2();
  le2();
  L();
  t0 = ne2(de2(), 1), Sm = X2(), wo2 = W2(async (e3, t, r) => {
    let s = e3.createAstro(Sm, t, r);
    return s.self = wo2, F2`${J2()}<ul> <li><a href="/">home</a></li> <li><a href="/post/knet-v2">knet-v2</a></li> <li><a href="/about">about</a></li> <li><a href="/archives">archives</a></li> </ul>`;
  }, "/Users/serdar/dev/projects/my-astro-app/src/components/HeaderNav.astro", void 0), jm = X2(), ge2 = W2(async (e3, t, r) => {
    let s = e3.createAstro(jm, t, r);
    s.self = ge2;
    let { title: n } = s.props;
    return F2`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${ie2(s.generator, "content")}><title>${n}</title>${Dn2()}</head> <body> ${Q(e3, "HeaderNav", wo2, {})} ${Dt2(e3, r.default)} </body></html>`;
  }, "/Users/serdar/dev/projects/my-astro-app/src/layouts/Layout.astro", void 0), Am = X2(), vo2 = W2(async (e3, t, r) => {
    let s = e3.createAstro(Am, t, r);
    return s.self = vo2, F2`${Q(e3, "Layout", ge2, { title: "Welcome to Astro." }, { default: (n) => F2` ${J2()}<main> <section>
Historical About section:
<hr> <h2>About Serdar Kili&#x0E7;</h2> <p> <img src="https://cdn.kilic.net/images/serdar-kerem.jpg" width="240" height="180" alt="Serdar and Kerem" id="about-img">Serdar was born in the last few days of 1975 in <a href="http://maps.google.com.au/maps?q=Sydney+Australia">Sydney, Australia</a>. He is happily married to Selcen and in 2007 they welcomed Kerem Kiliç
        into this world.
</p> <p>
Hobbies? Absolutely! He has an interest in foreign films and cultures
        (especially French and Japanese). <a href="http://imdb.com/title/tt0211915/">Amélie</a> is his all time favourite movie, followed closely by Ronin. <a href="http://www.flickr.com/photos/serdar/">Photography</a>, Cycling, Foreign Policy, and of course, the World Wide Web take up
        his time as well.
</p> <p>
He's done some traveling too, to Tokyo (twice), Istanbul and Ankara
        (several times), Calgary, Auckland, and Paris (twice as well).
</p> <p>
He spends his time keeping up with the latest in technologies and
        developments regarding the Open Web. Ruby on Rails is his preferred web
        framework for development which also includes other open source tools
        and applications.
</p> <h2>About KILI&#x0C7;.NET</h2> <p>
The site is being hosted at <a href="http://www.mediatemple.net">Media Temple</a> on their Grid Server, and published using <a href="http://www.sixapart.com/movabletype">MovableType</a> (v5.2). The pages are coded to be HTML 5 and utilise <a href="http://microformats.org">Microformats</a> such as <a href="http://microformats.org/wiki/hcard">hCard</a> and <a href="http://microformats.org/wiki/hAtom">hAtom</a>.
</p> <h2>Disclaimer</h2> <p>
The opinions expressed here are not necessarily those of my previous or
        currently employer(s).
</p> </section> </main> ` })}`;
  }, "/Users/serdar/dev/projects/my-astro-app/src/pages/about.astro", void 0), Cm = "/Users/serdar/dev/projects/my-astro-app/src/pages/about.astro", Tm = "/about", $m = Object.freeze(Object.defineProperty({ __proto__: null, default: vo2, file: Cm, url: Tm }, Symbol.toStringTag, { value: "Module" }));
});
var xo = {};
f(xo, { page: () => Im, renderers: () => Z2 });
var Im;
var _o3 = m(() => {
  "use strict";
  ue2();
  Im = () => Promise.resolve().then(() => (nt2(), bo2)).then((e3) => e3.a);
});
var So = {};
f(So, { default: () => ko2, file: () => Rm, url: () => Mm });
var a0;
var Dm;
var ko2;
var Rm;
var Mm;
var jo2 = m(() => {
  "use strict";
  P2();
  le2();
  L();
  a0 = ne2(de2(), 1);
  nt2();
  Dm = X2(), ko2 = W2(async (e3, t, r) => {
    let s = e3.createAstro(Dm, t, r);
    return s.self = ko2, F2`${Q(e3, "Layout", ge2, { title: "Coffee Gear" }, { default: (n) => F2` ${J2()}<main> <section> <h2>Coffee Gear</h2> <h3>Espresso</h3> <ul> <li>Profitec Pro 600</li> <li>Breville Smart Grinder</li> </ul> <h3>Filter</h3> <ul> <li>V60 Recipe</li> </ul> <h3>Turkish</h3> <ul> <li>Fakir</li> </ul> </section> </main> ` })}`;
  }, "/Users/serdar/dev/projects/my-astro-app/src/pages/gear/coffee.astro", void 0), Rm = "/Users/serdar/dev/projects/my-astro-app/src/pages/gear/coffee.astro", Mm = "/gear/coffee";
});
var Ao = {};
f(Ao, { page: () => Em, renderers: () => Z2 });
var Em;
var Co2 = m(() => {
  "use strict";
  ue2();
  Em = () => Promise.resolve().then(() => (jo2(), So));
});
var $o2 = {};
f($o2, { default: () => To2, file: () => Lm, url: () => Um });
var u0;
var Pm;
var To2;
var Lm;
var Um;
var Io2 = m(() => {
  "use strict";
  P2();
  le2();
  L();
  u0 = ne2(de2(), 1);
  nt2();
  Pm = X2(), To2 = W2(async (e3, t, r) => {
    let s = e3.createAstro(Pm, t, r);
    return s.self = To2, F2`${Q(e3, "Layout", ge2, { title: "Photography Gear" }, { default: (n) => F2` ${J2()}<main> <section> <h2>Cameras Gear</h2> <ul> <li>DJI Osmo Pocket 3</li> <li>Nikon Z6</li> </ul> </section> <section> <h2>Drones</h2> <ul> <li>DJI Mini 4 Pro</li> <li>DJI Phantom 4 Advanced</li> </ul> </section> </main> ` })}`;
  }, "/Users/serdar/dev/projects/my-astro-app/src/pages/gear/photography.astro", void 0), Lm = "/Users/serdar/dev/projects/my-astro-app/src/pages/gear/photography.astro", Um = "/gear/photography";
});
var Do2 = {};
f(Do2, { page: () => Nm, renderers: () => Z2 });
var Nm;
var Ro2 = m(() => {
  "use strict";
  ue2();
  Nm = () => Promise.resolve().then(() => (Io2(), $o2));
});
function hs2() {
  return Om;
}
function v2(e3, t) {
  let r = fs2({ issueData: t, data: e3.data, path: e3.path, errorMaps: [e3.common.contextualErrorMap, e3.schemaErrorMap, hs2(), zt2].filter((s) => !!s) });
  e3.common.issues.push(r);
}
function D2(e3) {
  if (!e3)
    return {};
  let { errorMap: t, invalid_type_error: r, required_error: s, description: n } = e3;
  if (t && (r || s))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return t ? { errorMap: t, description: n } : { errorMap: (a, i) => a.code !== "invalid_type" ? { message: i.defaultError } : typeof i.data > "u" ? { message: s ?? i.defaultError } : { message: r ?? i.defaultError }, description: n };
}
function Km(e3, t) {
  return !!((t === "v4" || !t) && qm.test(e3) || (t === "v6" || !t) && Gm.test(e3));
}
function Ym(e3, t) {
  let r = (e3.toString().split(".")[1] || "").length, s = (t.toString().split(".")[1] || "").length, n = r > s ? r : s, o = parseInt(e3.toFixed(n).replace(".", "")), a = parseInt(t.toFixed(n).replace(".", ""));
  return o % a / Math.pow(10, n);
}
function Ne2(e3) {
  if (e3 instanceof se2) {
    let t = {};
    for (let r in e3.shape) {
      let s = e3.shape[r];
      t[r] = me2.create(Ne2(s));
    }
    return new se2({ ...e3._def, shape: () => t });
  } else
    return e3 instanceof Se2 ? new Se2({ ...e3._def, type: Ne2(e3.element) }) : e3 instanceof me2 ? me2.create(Ne2(e3.unwrap())) : e3 instanceof je2 ? je2.create(Ne2(e3.unwrap())) : e3 instanceof ye2 ? ye2.create(e3.items.map((t) => Ne2(t))) : e3;
}
function ws2(e3, t) {
  let r = $e2(e3), s = $e2(t);
  if (e3 === t)
    return { valid: true, data: e3 };
  if (r === w2.object && s === w2.object) {
    let n = N2.objectKeys(t), o = N2.objectKeys(e3).filter((i) => n.indexOf(i) !== -1), a = { ...e3, ...t };
    for (let i of o) {
      let l = ws2(e3[i], t[i]);
      if (!l.valid)
        return { valid: false };
      a[i] = l.data;
    }
    return { valid: true, data: a };
  } else if (r === w2.array && s === w2.array) {
    if (e3.length !== t.length)
      return { valid: false };
    let n = [];
    for (let o = 0; o < e3.length; o++) {
      let a = e3[o], i = t[o], l = ws2(a, i);
      if (!l.valid)
        return { valid: false };
      n.push(l.data);
    }
    return { valid: true, data: n };
  } else
    return r === w2.date && s === w2.date && +e3 == +t ? { valid: true, data: e3 } : { valid: false };
}
function Uo2(e3, t) {
  return new Ze2({ values: e3, typeName: j.ZodEnum, ...D2(t) });
}
var N2;
var Mo2;
var w2;
var $e2;
var g;
var oe2;
var zt2;
var Om;
var fs2;
var Y2;
var R;
var Hm;
var ee2;
var Eo;
var Po2;
var Ft2;
var gs2;
var _2;
var ae2;
var Lo2;
var E;
var zm;
var Fm;
var Vm;
var Bm;
var Wm;
var Zm;
var ms2;
var qm;
var Gm;
var Xm;
var Oe2;
var ot2;
var at2;
var it2;
var ct2;
var lt2;
var He2;
var ze2;
var dt;
var ke2;
var he;
var pt2;
var Se2;
var se2;
var Fe2;
var Ht2;
var ys2;
var Ve2;
var ye2;
var vs2;
var ut2;
var mt2;
var bs2;
var Be2;
var We2;
var Ze2;
var qe2;
var Ie2;
var ce2;
var me2;
var je2;
var Ge2;
var ht2;
var ft2;
var f0;
var xs2;
var Vt2;
var gt2;
var g0;
var j;
var De2;
var y0;
var w0;
var v0;
var b0;
var No2;
var x0;
var _0;
var k0;
var S0;
var j0;
var A0;
var C0;
var Oo2;
var _s3;
var T0;
var $0;
var I0;
var D0;
var R0;
var M0;
var E0;
var P0;
var L0;
var U0;
var N0;
var O0;
var H0;
var z0;
var F0;
var V0;
var B0;
var W0;
var Z0;
var Ho2 = m(() => {
  (function(e3) {
    e3.assertEqual = (n) => n;
    function t(n) {
    }
    e3.assertIs = t;
    function r(n) {
      throw new Error();
    }
    e3.assertNever = r, e3.arrayToEnum = (n) => {
      let o = {};
      for (let a of n)
        o[a] = a;
      return o;
    }, e3.getValidEnumValues = (n) => {
      let o = e3.objectKeys(n).filter((i) => typeof n[n[i]] != "number"), a = {};
      for (let i of o)
        a[i] = n[i];
      return e3.objectValues(a);
    }, e3.objectValues = (n) => e3.objectKeys(n).map(function(o) {
      return n[o];
    }), e3.objectKeys = typeof Object.keys == "function" ? (n) => Object.keys(n) : (n) => {
      let o = [];
      for (let a in n)
        Object.prototype.hasOwnProperty.call(n, a) && o.push(a);
      return o;
    }, e3.find = (n, o) => {
      for (let a of n)
        if (o(a))
          return a;
    }, e3.isInteger = typeof Number.isInteger == "function" ? (n) => Number.isInteger(n) : (n) => typeof n == "number" && isFinite(n) && Math.floor(n) === n;
    function s(n, o = " | ") {
      return n.map((a) => typeof a == "string" ? `'${a}'` : a).join(o);
    }
    e3.joinValues = s, e3.jsonStringifyReplacer = (n, o) => typeof o == "bigint" ? o.toString() : o;
  })(N2 || (N2 = {}));
  (function(e3) {
    e3.mergeShapes = (t, r) => ({ ...t, ...r });
  })(Mo2 || (Mo2 = {}));
  w2 = N2.arrayToEnum(["string", "nan", "number", "integer", "float", "boolean", "date", "bigint", "symbol", "function", "undefined", "null", "array", "object", "unknown", "promise", "void", "never", "map", "set"]), $e2 = (e3) => {
    switch (typeof e3) {
      case "undefined":
        return w2.undefined;
      case "string":
        return w2.string;
      case "number":
        return isNaN(e3) ? w2.nan : w2.number;
      case "boolean":
        return w2.boolean;
      case "function":
        return w2.function;
      case "bigint":
        return w2.bigint;
      case "symbol":
        return w2.symbol;
      case "object":
        return Array.isArray(e3) ? w2.array : e3 === null ? w2.null : e3.then && typeof e3.then == "function" && e3.catch && typeof e3.catch == "function" ? w2.promise : typeof Map < "u" && e3 instanceof Map ? w2.map : typeof Set < "u" && e3 instanceof Set ? w2.set : typeof Date < "u" && e3 instanceof Date ? w2.date : w2.object;
      default:
        return w2.unknown;
    }
  }, g = N2.arrayToEnum(["invalid_type", "invalid_literal", "custom", "invalid_union", "invalid_union_discriminator", "invalid_enum_value", "unrecognized_keys", "invalid_arguments", "invalid_return_type", "invalid_date", "invalid_string", "too_small", "too_big", "invalid_intersection_types", "not_multiple_of", "not_finite"]), oe2 = class extends Error {
    constructor(t) {
      super(), this.issues = [], this.addIssue = (s) => {
        this.issues = [...this.issues, s];
      }, this.addIssues = (s = []) => {
        this.issues = [...this.issues, ...s];
      };
      let r = new.target.prototype;
      Object.setPrototypeOf ? Object.setPrototypeOf(this, r) : this.__proto__ = r, this.name = "ZodError", this.issues = t;
    }
    get errors() {
      return this.issues;
    }
    format(t) {
      let r = t || function(o) {
        return o.message;
      }, s = { _errors: [] }, n = (o) => {
        for (let a of o.issues)
          if (a.code === "invalid_union")
            a.unionErrors.map(n);
          else if (a.code === "invalid_return_type")
            n(a.returnTypeError);
          else if (a.code === "invalid_arguments")
            n(a.argumentsError);
          else if (a.path.length === 0)
            s._errors.push(r(a));
          else {
            let i = s, l = 0;
            for (; l < a.path.length; ) {
              let d = a.path[l];
              l === a.path.length - 1 ? (i[d] = i[d] || { _errors: [] }, i[d]._errors.push(r(a))) : i[d] = i[d] || { _errors: [] }, i = i[d], l++;
            }
          }
      };
      return n(this), s;
    }
    toString() {
      return this.message;
    }
    get message() {
      return JSON.stringify(this.issues, N2.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
      return this.issues.length === 0;
    }
    flatten(t = (r) => r.message) {
      let r = {}, s = [];
      for (let n of this.issues)
        n.path.length > 0 ? (r[n.path[0]] = r[n.path[0]] || [], r[n.path[0]].push(t(n))) : s.push(t(n));
      return { formErrors: s, fieldErrors: r };
    }
    get formErrors() {
      return this.flatten();
    }
  };
  oe2.create = (e3) => new oe2(e3);
  zt2 = (e3, t) => {
    let r;
    switch (e3.code) {
      case g.invalid_type:
        e3.received === w2.undefined ? r = "Required" : r = `Expected ${e3.expected}, received ${e3.received}`;
        break;
      case g.invalid_literal:
        r = `Invalid literal value, expected ${JSON.stringify(e3.expected, N2.jsonStringifyReplacer)}`;
        break;
      case g.unrecognized_keys:
        r = `Unrecognized key(s) in object: ${N2.joinValues(e3.keys, ", ")}`;
        break;
      case g.invalid_union:
        r = "Invalid input";
        break;
      case g.invalid_union_discriminator:
        r = `Invalid discriminator value. Expected ${N2.joinValues(e3.options)}`;
        break;
      case g.invalid_enum_value:
        r = `Invalid enum value. Expected ${N2.joinValues(e3.options)}, received '${e3.received}'`;
        break;
      case g.invalid_arguments:
        r = "Invalid function arguments";
        break;
      case g.invalid_return_type:
        r = "Invalid function return type";
        break;
      case g.invalid_date:
        r = "Invalid date";
        break;
      case g.invalid_string:
        typeof e3.validation == "object" ? "includes" in e3.validation ? (r = `Invalid input: must include "${e3.validation.includes}"`, typeof e3.validation.position == "number" && (r = `${r} at one or more positions greater than or equal to ${e3.validation.position}`)) : "startsWith" in e3.validation ? r = `Invalid input: must start with "${e3.validation.startsWith}"` : "endsWith" in e3.validation ? r = `Invalid input: must end with "${e3.validation.endsWith}"` : N2.assertNever(e3.validation) : e3.validation !== "regex" ? r = `Invalid ${e3.validation}` : r = "Invalid";
        break;
      case g.too_small:
        e3.type === "array" ? r = `Array must contain ${e3.exact ? "exactly" : e3.inclusive ? "at least" : "more than"} ${e3.minimum} element(s)` : e3.type === "string" ? r = `String must contain ${e3.exact ? "exactly" : e3.inclusive ? "at least" : "over"} ${e3.minimum} character(s)` : e3.type === "number" ? r = `Number must be ${e3.exact ? "exactly equal to " : e3.inclusive ? "greater than or equal to " : "greater than "}${e3.minimum}` : e3.type === "date" ? r = `Date must be ${e3.exact ? "exactly equal to " : e3.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e3.minimum))}` : r = "Invalid input";
        break;
      case g.too_big:
        e3.type === "array" ? r = `Array must contain ${e3.exact ? "exactly" : e3.inclusive ? "at most" : "less than"} ${e3.maximum} element(s)` : e3.type === "string" ? r = `String must contain ${e3.exact ? "exactly" : e3.inclusive ? "at most" : "under"} ${e3.maximum} character(s)` : e3.type === "number" ? r = `Number must be ${e3.exact ? "exactly" : e3.inclusive ? "less than or equal to" : "less than"} ${e3.maximum}` : e3.type === "bigint" ? r = `BigInt must be ${e3.exact ? "exactly" : e3.inclusive ? "less than or equal to" : "less than"} ${e3.maximum}` : e3.type === "date" ? r = `Date must be ${e3.exact ? "exactly" : e3.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e3.maximum))}` : r = "Invalid input";
        break;
      case g.custom:
        r = "Invalid input";
        break;
      case g.invalid_intersection_types:
        r = "Intersection results could not be merged";
        break;
      case g.not_multiple_of:
        r = `Number must be a multiple of ${e3.multipleOf}`;
        break;
      case g.not_finite:
        r = "Number must be finite";
        break;
      default:
        r = t.defaultError, N2.assertNever(e3);
    }
    return { message: r };
  }, Om = zt2;
  fs2 = (e3) => {
    let { data: t, path: r, errorMaps: s, issueData: n } = e3, o = [...r, ...n.path || []], a = { ...n, path: o }, i = "", l = s.filter((d) => !!d).slice().reverse();
    for (let d of l)
      i = d(a, { data: t, defaultError: i }).message;
    return { ...n, path: o, message: n.message || i };
  };
  Y2 = class e3 {
    constructor() {
      this.value = "valid";
    }
    dirty() {
      this.value === "valid" && (this.value = "dirty");
    }
    abort() {
      this.value !== "aborted" && (this.value = "aborted");
    }
    static mergeArray(t, r) {
      let s = [];
      for (let n of r) {
        if (n.status === "aborted")
          return R;
        n.status === "dirty" && t.dirty(), s.push(n.value);
      }
      return { status: t.value, value: s };
    }
    static async mergeObjectAsync(t, r) {
      let s = [];
      for (let n of r)
        s.push({ key: await n.key, value: await n.value });
      return e3.mergeObjectSync(t, s);
    }
    static mergeObjectSync(t, r) {
      let s = {};
      for (let n of r) {
        let { key: o, value: a } = n;
        if (o.status === "aborted" || a.status === "aborted")
          return R;
        o.status === "dirty" && t.dirty(), a.status === "dirty" && t.dirty(), o.value !== "__proto__" && (typeof a.value < "u" || n.alwaysSet) && (s[o.value] = a.value);
      }
      return { status: t.value, value: s };
    }
  }, R = Object.freeze({ status: "aborted" }), Hm = (e3) => ({ status: "dirty", value: e3 }), ee2 = (e3) => ({ status: "valid", value: e3 }), Eo = (e3) => e3.status === "aborted", Po2 = (e3) => e3.status === "dirty", Ft2 = (e3) => e3.status === "valid", gs2 = (e3) => typeof Promise < "u" && e3 instanceof Promise;
  (function(e3) {
    e3.errToObj = (t) => typeof t == "string" ? { message: t } : t || {}, e3.toString = (t) => typeof t == "string" ? t : t?.message;
  })(_2 || (_2 = {}));
  ae2 = class {
    constructor(t, r, s, n) {
      this._cachedPath = [], this.parent = t, this.data = r, this._path = s, this._key = n;
    }
    get path() {
      return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
    }
  }, Lo2 = (e3, t) => {
    if (Ft2(t))
      return { success: true, data: t.value };
    if (!e3.common.issues.length)
      throw new Error("Validation failed but no issues detected.");
    return { success: false, get error() {
      if (this._error)
        return this._error;
      let r = new oe2(e3.common.issues);
      return this._error = r, this._error;
    } };
  };
  E = class {
    constructor(t) {
      this.spa = this.safeParseAsync, this._def = t, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
    }
    get description() {
      return this._def.description;
    }
    _getType(t) {
      return $e2(t.data);
    }
    _getOrReturnCtx(t, r) {
      return r || { common: t.parent.common, data: t.data, parsedType: $e2(t.data), schemaErrorMap: this._def.errorMap, path: t.path, parent: t.parent };
    }
    _processInputParams(t) {
      return { status: new Y2(), ctx: { common: t.parent.common, data: t.data, parsedType: $e2(t.data), schemaErrorMap: this._def.errorMap, path: t.path, parent: t.parent } };
    }
    _parseSync(t) {
      let r = this._parse(t);
      if (gs2(r))
        throw new Error("Synchronous parse encountered promise.");
      return r;
    }
    _parseAsync(t) {
      let r = this._parse(t);
      return Promise.resolve(r);
    }
    parse(t, r) {
      let s = this.safeParse(t, r);
      if (s.success)
        return s.data;
      throw s.error;
    }
    safeParse(t, r) {
      var s;
      let n = { common: { issues: [], async: (s = r?.async) !== null && s !== void 0 ? s : false, contextualErrorMap: r?.errorMap }, path: r?.path || [], schemaErrorMap: this._def.errorMap, parent: null, data: t, parsedType: $e2(t) }, o = this._parseSync({ data: t, path: n.path, parent: n });
      return Lo2(n, o);
    }
    async parseAsync(t, r) {
      let s = await this.safeParseAsync(t, r);
      if (s.success)
        return s.data;
      throw s.error;
    }
    async safeParseAsync(t, r) {
      let s = { common: { issues: [], contextualErrorMap: r?.errorMap, async: true }, path: r?.path || [], schemaErrorMap: this._def.errorMap, parent: null, data: t, parsedType: $e2(t) }, n = this._parse({ data: t, path: s.path, parent: s }), o = await (gs2(n) ? n : Promise.resolve(n));
      return Lo2(s, o);
    }
    refine(t, r) {
      let s = (n) => typeof r == "string" || typeof r > "u" ? { message: r } : typeof r == "function" ? r(n) : r;
      return this._refinement((n, o) => {
        let a = t(n), i = () => o.addIssue({ code: g.custom, ...s(n) });
        return typeof Promise < "u" && a instanceof Promise ? a.then((l) => l ? true : (i(), false)) : a ? true : (i(), false);
      });
    }
    refinement(t, r) {
      return this._refinement((s, n) => t(s) ? true : (n.addIssue(typeof r == "function" ? r(s, n) : r), false));
    }
    _refinement(t) {
      return new ce2({ schema: this, typeName: j.ZodEffects, effect: { type: "refinement", refinement: t } });
    }
    superRefine(t) {
      return this._refinement(t);
    }
    optional() {
      return me2.create(this, this._def);
    }
    nullable() {
      return je2.create(this, this._def);
    }
    nullish() {
      return this.nullable().optional();
    }
    array() {
      return Se2.create(this, this._def);
    }
    promise() {
      return Ie2.create(this, this._def);
    }
    or(t) {
      return Fe2.create([this, t], this._def);
    }
    and(t) {
      return Ve2.create(this, t, this._def);
    }
    transform(t) {
      return new ce2({ ...D2(this._def), schema: this, typeName: j.ZodEffects, effect: { type: "transform", transform: t } });
    }
    default(t) {
      let r = typeof t == "function" ? t : () => t;
      return new Ge2({ ...D2(this._def), innerType: this, defaultValue: r, typeName: j.ZodDefault });
    }
    brand() {
      return new xs2({ typeName: j.ZodBranded, type: this, ...D2(this._def) });
    }
    catch(t) {
      let r = typeof t == "function" ? t : () => t;
      return new ht2({ ...D2(this._def), innerType: this, catchValue: r, typeName: j.ZodCatch });
    }
    describe(t) {
      let r = this.constructor;
      return new r({ ...this._def, description: t });
    }
    pipe(t) {
      return Vt2.create(this, t);
    }
    readonly() {
      return gt2.create(this);
    }
    isOptional() {
      return this.safeParse(void 0).success;
    }
    isNullable() {
      return this.safeParse(null).success;
    }
  }, zm = /^c[^\s-]{8,}$/i, Fm = /^[a-z][a-z0-9]*$/, Vm = /^[0-9A-HJKMNP-TV-Z]{26}$/, Bm = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, Wm = /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, Zm = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", qm = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/, Gm = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/, Xm = (e3) => e3.precision ? e3.offset ? new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${e3.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`) : new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${e3.precision}}Z$`) : e3.precision === 0 ? e3.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$") : e3.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$");
  Oe2 = class e3 extends E {
    _parse(t) {
      if (this._def.coerce && (t.data = String(t.data)), this._getType(t) !== w2.string) {
        let o = this._getOrReturnCtx(t);
        return v2(o, { code: g.invalid_type, expected: w2.string, received: o.parsedType }), R;
      }
      let s = new Y2(), n;
      for (let o of this._def.checks)
        if (o.kind === "min")
          t.data.length < o.value && (n = this._getOrReturnCtx(t, n), v2(n, { code: g.too_small, minimum: o.value, type: "string", inclusive: true, exact: false, message: o.message }), s.dirty());
        else if (o.kind === "max")
          t.data.length > o.value && (n = this._getOrReturnCtx(t, n), v2(n, { code: g.too_big, maximum: o.value, type: "string", inclusive: true, exact: false, message: o.message }), s.dirty());
        else if (o.kind === "length") {
          let a = t.data.length > o.value, i = t.data.length < o.value;
          (a || i) && (n = this._getOrReturnCtx(t, n), a ? v2(n, { code: g.too_big, maximum: o.value, type: "string", inclusive: true, exact: true, message: o.message }) : i && v2(n, { code: g.too_small, minimum: o.value, type: "string", inclusive: true, exact: true, message: o.message }), s.dirty());
        } else if (o.kind === "email")
          Wm.test(t.data) || (n = this._getOrReturnCtx(t, n), v2(n, { validation: "email", code: g.invalid_string, message: o.message }), s.dirty());
        else if (o.kind === "emoji")
          ms2 || (ms2 = new RegExp(Zm, "u")), ms2.test(t.data) || (n = this._getOrReturnCtx(t, n), v2(n, { validation: "emoji", code: g.invalid_string, message: o.message }), s.dirty());
        else if (o.kind === "uuid")
          Bm.test(t.data) || (n = this._getOrReturnCtx(t, n), v2(n, { validation: "uuid", code: g.invalid_string, message: o.message }), s.dirty());
        else if (o.kind === "cuid")
          zm.test(t.data) || (n = this._getOrReturnCtx(t, n), v2(n, { validation: "cuid", code: g.invalid_string, message: o.message }), s.dirty());
        else if (o.kind === "cuid2")
          Fm.test(t.data) || (n = this._getOrReturnCtx(t, n), v2(n, { validation: "cuid2", code: g.invalid_string, message: o.message }), s.dirty());
        else if (o.kind === "ulid")
          Vm.test(t.data) || (n = this._getOrReturnCtx(t, n), v2(n, { validation: "ulid", code: g.invalid_string, message: o.message }), s.dirty());
        else if (o.kind === "url")
          try {
            new URL(t.data);
          } catch {
            n = this._getOrReturnCtx(t, n), v2(n, { validation: "url", code: g.invalid_string, message: o.message }), s.dirty();
          }
        else
          o.kind === "regex" ? (o.regex.lastIndex = 0, o.regex.test(t.data) || (n = this._getOrReturnCtx(t, n), v2(n, { validation: "regex", code: g.invalid_string, message: o.message }), s.dirty())) : o.kind === "trim" ? t.data = t.data.trim() : o.kind === "includes" ? t.data.includes(o.value, o.position) || (n = this._getOrReturnCtx(t, n), v2(n, { code: g.invalid_string, validation: { includes: o.value, position: o.position }, message: o.message }), s.dirty()) : o.kind === "toLowerCase" ? t.data = t.data.toLowerCase() : o.kind === "toUpperCase" ? t.data = t.data.toUpperCase() : o.kind === "startsWith" ? t.data.startsWith(o.value) || (n = this._getOrReturnCtx(t, n), v2(n, { code: g.invalid_string, validation: { startsWith: o.value }, message: o.message }), s.dirty()) : o.kind === "endsWith" ? t.data.endsWith(o.value) || (n = this._getOrReturnCtx(t, n), v2(n, { code: g.invalid_string, validation: { endsWith: o.value }, message: o.message }), s.dirty()) : o.kind === "datetime" ? Xm(o).test(t.data) || (n = this._getOrReturnCtx(t, n), v2(n, { code: g.invalid_string, validation: "datetime", message: o.message }), s.dirty()) : o.kind === "ip" ? Km(t.data, o.version) || (n = this._getOrReturnCtx(t, n), v2(n, { validation: "ip", code: g.invalid_string, message: o.message }), s.dirty()) : N2.assertNever(o);
      return { status: s.value, value: t.data };
    }
    _regex(t, r, s) {
      return this.refinement((n) => t.test(n), { validation: r, code: g.invalid_string, ..._2.errToObj(s) });
    }
    _addCheck(t) {
      return new e3({ ...this._def, checks: [...this._def.checks, t] });
    }
    email(t) {
      return this._addCheck({ kind: "email", ..._2.errToObj(t) });
    }
    url(t) {
      return this._addCheck({ kind: "url", ..._2.errToObj(t) });
    }
    emoji(t) {
      return this._addCheck({ kind: "emoji", ..._2.errToObj(t) });
    }
    uuid(t) {
      return this._addCheck({ kind: "uuid", ..._2.errToObj(t) });
    }
    cuid(t) {
      return this._addCheck({ kind: "cuid", ..._2.errToObj(t) });
    }
    cuid2(t) {
      return this._addCheck({ kind: "cuid2", ..._2.errToObj(t) });
    }
    ulid(t) {
      return this._addCheck({ kind: "ulid", ..._2.errToObj(t) });
    }
    ip(t) {
      return this._addCheck({ kind: "ip", ..._2.errToObj(t) });
    }
    datetime(t) {
      var r;
      return typeof t == "string" ? this._addCheck({ kind: "datetime", precision: null, offset: false, message: t }) : this._addCheck({ kind: "datetime", precision: typeof t?.precision > "u" ? null : t?.precision, offset: (r = t?.offset) !== null && r !== void 0 ? r : false, ..._2.errToObj(t?.message) });
    }
    regex(t, r) {
      return this._addCheck({ kind: "regex", regex: t, ..._2.errToObj(r) });
    }
    includes(t, r) {
      return this._addCheck({ kind: "includes", value: t, position: r?.position, ..._2.errToObj(r?.message) });
    }
    startsWith(t, r) {
      return this._addCheck({ kind: "startsWith", value: t, ..._2.errToObj(r) });
    }
    endsWith(t, r) {
      return this._addCheck({ kind: "endsWith", value: t, ..._2.errToObj(r) });
    }
    min(t, r) {
      return this._addCheck({ kind: "min", value: t, ..._2.errToObj(r) });
    }
    max(t, r) {
      return this._addCheck({ kind: "max", value: t, ..._2.errToObj(r) });
    }
    length(t, r) {
      return this._addCheck({ kind: "length", value: t, ..._2.errToObj(r) });
    }
    nonempty(t) {
      return this.min(1, _2.errToObj(t));
    }
    trim() {
      return new e3({ ...this._def, checks: [...this._def.checks, { kind: "trim" }] });
    }
    toLowerCase() {
      return new e3({ ...this._def, checks: [...this._def.checks, { kind: "toLowerCase" }] });
    }
    toUpperCase() {
      return new e3({ ...this._def, checks: [...this._def.checks, { kind: "toUpperCase" }] });
    }
    get isDatetime() {
      return !!this._def.checks.find((t) => t.kind === "datetime");
    }
    get isEmail() {
      return !!this._def.checks.find((t) => t.kind === "email");
    }
    get isURL() {
      return !!this._def.checks.find((t) => t.kind === "url");
    }
    get isEmoji() {
      return !!this._def.checks.find((t) => t.kind === "emoji");
    }
    get isUUID() {
      return !!this._def.checks.find((t) => t.kind === "uuid");
    }
    get isCUID() {
      return !!this._def.checks.find((t) => t.kind === "cuid");
    }
    get isCUID2() {
      return !!this._def.checks.find((t) => t.kind === "cuid2");
    }
    get isULID() {
      return !!this._def.checks.find((t) => t.kind === "ulid");
    }
    get isIP() {
      return !!this._def.checks.find((t) => t.kind === "ip");
    }
    get minLength() {
      let t = null;
      for (let r of this._def.checks)
        r.kind === "min" && (t === null || r.value > t) && (t = r.value);
      return t;
    }
    get maxLength() {
      let t = null;
      for (let r of this._def.checks)
        r.kind === "max" && (t === null || r.value < t) && (t = r.value);
      return t;
    }
  };
  Oe2.create = (e3) => {
    var t;
    return new Oe2({ checks: [], typeName: j.ZodString, coerce: (t = e3?.coerce) !== null && t !== void 0 ? t : false, ...D2(e3) });
  };
  ot2 = class e3 extends E {
    constructor() {
      super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
    }
    _parse(t) {
      if (this._def.coerce && (t.data = Number(t.data)), this._getType(t) !== w2.number) {
        let o = this._getOrReturnCtx(t);
        return v2(o, { code: g.invalid_type, expected: w2.number, received: o.parsedType }), R;
      }
      let s, n = new Y2();
      for (let o of this._def.checks)
        o.kind === "int" ? N2.isInteger(t.data) || (s = this._getOrReturnCtx(t, s), v2(s, { code: g.invalid_type, expected: "integer", received: "float", message: o.message }), n.dirty()) : o.kind === "min" ? (o.inclusive ? t.data < o.value : t.data <= o.value) && (s = this._getOrReturnCtx(t, s), v2(s, { code: g.too_small, minimum: o.value, type: "number", inclusive: o.inclusive, exact: false, message: o.message }), n.dirty()) : o.kind === "max" ? (o.inclusive ? t.data > o.value : t.data >= o.value) && (s = this._getOrReturnCtx(t, s), v2(s, { code: g.too_big, maximum: o.value, type: "number", inclusive: o.inclusive, exact: false, message: o.message }), n.dirty()) : o.kind === "multipleOf" ? Ym(t.data, o.value) !== 0 && (s = this._getOrReturnCtx(t, s), v2(s, { code: g.not_multiple_of, multipleOf: o.value, message: o.message }), n.dirty()) : o.kind === "finite" ? Number.isFinite(t.data) || (s = this._getOrReturnCtx(t, s), v2(s, { code: g.not_finite, message: o.message }), n.dirty()) : N2.assertNever(o);
      return { status: n.value, value: t.data };
    }
    gte(t, r) {
      return this.setLimit("min", t, true, _2.toString(r));
    }
    gt(t, r) {
      return this.setLimit("min", t, false, _2.toString(r));
    }
    lte(t, r) {
      return this.setLimit("max", t, true, _2.toString(r));
    }
    lt(t, r) {
      return this.setLimit("max", t, false, _2.toString(r));
    }
    setLimit(t, r, s, n) {
      return new e3({ ...this._def, checks: [...this._def.checks, { kind: t, value: r, inclusive: s, message: _2.toString(n) }] });
    }
    _addCheck(t) {
      return new e3({ ...this._def, checks: [...this._def.checks, t] });
    }
    int(t) {
      return this._addCheck({ kind: "int", message: _2.toString(t) });
    }
    positive(t) {
      return this._addCheck({ kind: "min", value: 0, inclusive: false, message: _2.toString(t) });
    }
    negative(t) {
      return this._addCheck({ kind: "max", value: 0, inclusive: false, message: _2.toString(t) });
    }
    nonpositive(t) {
      return this._addCheck({ kind: "max", value: 0, inclusive: true, message: _2.toString(t) });
    }
    nonnegative(t) {
      return this._addCheck({ kind: "min", value: 0, inclusive: true, message: _2.toString(t) });
    }
    multipleOf(t, r) {
      return this._addCheck({ kind: "multipleOf", value: t, message: _2.toString(r) });
    }
    finite(t) {
      return this._addCheck({ kind: "finite", message: _2.toString(t) });
    }
    safe(t) {
      return this._addCheck({ kind: "min", inclusive: true, value: Number.MIN_SAFE_INTEGER, message: _2.toString(t) })._addCheck({ kind: "max", inclusive: true, value: Number.MAX_SAFE_INTEGER, message: _2.toString(t) });
    }
    get minValue() {
      let t = null;
      for (let r of this._def.checks)
        r.kind === "min" && (t === null || r.value > t) && (t = r.value);
      return t;
    }
    get maxValue() {
      let t = null;
      for (let r of this._def.checks)
        r.kind === "max" && (t === null || r.value < t) && (t = r.value);
      return t;
    }
    get isInt() {
      return !!this._def.checks.find((t) => t.kind === "int" || t.kind === "multipleOf" && N2.isInteger(t.value));
    }
    get isFinite() {
      let t = null, r = null;
      for (let s of this._def.checks) {
        if (s.kind === "finite" || s.kind === "int" || s.kind === "multipleOf")
          return true;
        s.kind === "min" ? (r === null || s.value > r) && (r = s.value) : s.kind === "max" && (t === null || s.value < t) && (t = s.value);
      }
      return Number.isFinite(r) && Number.isFinite(t);
    }
  };
  ot2.create = (e3) => new ot2({ checks: [], typeName: j.ZodNumber, coerce: e3?.coerce || false, ...D2(e3) });
  at2 = class e3 extends E {
    constructor() {
      super(...arguments), this.min = this.gte, this.max = this.lte;
    }
    _parse(t) {
      if (this._def.coerce && (t.data = BigInt(t.data)), this._getType(t) !== w2.bigint) {
        let o = this._getOrReturnCtx(t);
        return v2(o, { code: g.invalid_type, expected: w2.bigint, received: o.parsedType }), R;
      }
      let s, n = new Y2();
      for (let o of this._def.checks)
        o.kind === "min" ? (o.inclusive ? t.data < o.value : t.data <= o.value) && (s = this._getOrReturnCtx(t, s), v2(s, { code: g.too_small, type: "bigint", minimum: o.value, inclusive: o.inclusive, message: o.message }), n.dirty()) : o.kind === "max" ? (o.inclusive ? t.data > o.value : t.data >= o.value) && (s = this._getOrReturnCtx(t, s), v2(s, { code: g.too_big, type: "bigint", maximum: o.value, inclusive: o.inclusive, message: o.message }), n.dirty()) : o.kind === "multipleOf" ? t.data % o.value !== BigInt(0) && (s = this._getOrReturnCtx(t, s), v2(s, { code: g.not_multiple_of, multipleOf: o.value, message: o.message }), n.dirty()) : N2.assertNever(o);
      return { status: n.value, value: t.data };
    }
    gte(t, r) {
      return this.setLimit("min", t, true, _2.toString(r));
    }
    gt(t, r) {
      return this.setLimit("min", t, false, _2.toString(r));
    }
    lte(t, r) {
      return this.setLimit("max", t, true, _2.toString(r));
    }
    lt(t, r) {
      return this.setLimit("max", t, false, _2.toString(r));
    }
    setLimit(t, r, s, n) {
      return new e3({ ...this._def, checks: [...this._def.checks, { kind: t, value: r, inclusive: s, message: _2.toString(n) }] });
    }
    _addCheck(t) {
      return new e3({ ...this._def, checks: [...this._def.checks, t] });
    }
    positive(t) {
      return this._addCheck({ kind: "min", value: BigInt(0), inclusive: false, message: _2.toString(t) });
    }
    negative(t) {
      return this._addCheck({ kind: "max", value: BigInt(0), inclusive: false, message: _2.toString(t) });
    }
    nonpositive(t) {
      return this._addCheck({ kind: "max", value: BigInt(0), inclusive: true, message: _2.toString(t) });
    }
    nonnegative(t) {
      return this._addCheck({ kind: "min", value: BigInt(0), inclusive: true, message: _2.toString(t) });
    }
    multipleOf(t, r) {
      return this._addCheck({ kind: "multipleOf", value: t, message: _2.toString(r) });
    }
    get minValue() {
      let t = null;
      for (let r of this._def.checks)
        r.kind === "min" && (t === null || r.value > t) && (t = r.value);
      return t;
    }
    get maxValue() {
      let t = null;
      for (let r of this._def.checks)
        r.kind === "max" && (t === null || r.value < t) && (t = r.value);
      return t;
    }
  };
  at2.create = (e3) => {
    var t;
    return new at2({ checks: [], typeName: j.ZodBigInt, coerce: (t = e3?.coerce) !== null && t !== void 0 ? t : false, ...D2(e3) });
  };
  it2 = class extends E {
    _parse(t) {
      if (this._def.coerce && (t.data = !!t.data), this._getType(t) !== w2.boolean) {
        let s = this._getOrReturnCtx(t);
        return v2(s, { code: g.invalid_type, expected: w2.boolean, received: s.parsedType }), R;
      }
      return ee2(t.data);
    }
  };
  it2.create = (e3) => new it2({ typeName: j.ZodBoolean, coerce: e3?.coerce || false, ...D2(e3) });
  ct2 = class e3 extends E {
    _parse(t) {
      if (this._def.coerce && (t.data = new Date(t.data)), this._getType(t) !== w2.date) {
        let o = this._getOrReturnCtx(t);
        return v2(o, { code: g.invalid_type, expected: w2.date, received: o.parsedType }), R;
      }
      if (isNaN(t.data.getTime())) {
        let o = this._getOrReturnCtx(t);
        return v2(o, { code: g.invalid_date }), R;
      }
      let s = new Y2(), n;
      for (let o of this._def.checks)
        o.kind === "min" ? t.data.getTime() < o.value && (n = this._getOrReturnCtx(t, n), v2(n, { code: g.too_small, message: o.message, inclusive: true, exact: false, minimum: o.value, type: "date" }), s.dirty()) : o.kind === "max" ? t.data.getTime() > o.value && (n = this._getOrReturnCtx(t, n), v2(n, { code: g.too_big, message: o.message, inclusive: true, exact: false, maximum: o.value, type: "date" }), s.dirty()) : N2.assertNever(o);
      return { status: s.value, value: new Date(t.data.getTime()) };
    }
    _addCheck(t) {
      return new e3({ ...this._def, checks: [...this._def.checks, t] });
    }
    min(t, r) {
      return this._addCheck({ kind: "min", value: t.getTime(), message: _2.toString(r) });
    }
    max(t, r) {
      return this._addCheck({ kind: "max", value: t.getTime(), message: _2.toString(r) });
    }
    get minDate() {
      let t = null;
      for (let r of this._def.checks)
        r.kind === "min" && (t === null || r.value > t) && (t = r.value);
      return t != null ? new Date(t) : null;
    }
    get maxDate() {
      let t = null;
      for (let r of this._def.checks)
        r.kind === "max" && (t === null || r.value < t) && (t = r.value);
      return t != null ? new Date(t) : null;
    }
  };
  ct2.create = (e3) => new ct2({ checks: [], coerce: e3?.coerce || false, typeName: j.ZodDate, ...D2(e3) });
  lt2 = class extends E {
    _parse(t) {
      if (this._getType(t) !== w2.symbol) {
        let s = this._getOrReturnCtx(t);
        return v2(s, { code: g.invalid_type, expected: w2.symbol, received: s.parsedType }), R;
      }
      return ee2(t.data);
    }
  };
  lt2.create = (e3) => new lt2({ typeName: j.ZodSymbol, ...D2(e3) });
  He2 = class extends E {
    _parse(t) {
      if (this._getType(t) !== w2.undefined) {
        let s = this._getOrReturnCtx(t);
        return v2(s, { code: g.invalid_type, expected: w2.undefined, received: s.parsedType }), R;
      }
      return ee2(t.data);
    }
  };
  He2.create = (e3) => new He2({ typeName: j.ZodUndefined, ...D2(e3) });
  ze2 = class extends E {
    _parse(t) {
      if (this._getType(t) !== w2.null) {
        let s = this._getOrReturnCtx(t);
        return v2(s, { code: g.invalid_type, expected: w2.null, received: s.parsedType }), R;
      }
      return ee2(t.data);
    }
  };
  ze2.create = (e3) => new ze2({ typeName: j.ZodNull, ...D2(e3) });
  dt = class extends E {
    constructor() {
      super(...arguments), this._any = true;
    }
    _parse(t) {
      return ee2(t.data);
    }
  };
  dt.create = (e3) => new dt({ typeName: j.ZodAny, ...D2(e3) });
  ke2 = class extends E {
    constructor() {
      super(...arguments), this._unknown = true;
    }
    _parse(t) {
      return ee2(t.data);
    }
  };
  ke2.create = (e3) => new ke2({ typeName: j.ZodUnknown, ...D2(e3) });
  he = class extends E {
    _parse(t) {
      let r = this._getOrReturnCtx(t);
      return v2(r, { code: g.invalid_type, expected: w2.never, received: r.parsedType }), R;
    }
  };
  he.create = (e3) => new he({ typeName: j.ZodNever, ...D2(e3) });
  pt2 = class extends E {
    _parse(t) {
      if (this._getType(t) !== w2.undefined) {
        let s = this._getOrReturnCtx(t);
        return v2(s, { code: g.invalid_type, expected: w2.void, received: s.parsedType }), R;
      }
      return ee2(t.data);
    }
  };
  pt2.create = (e3) => new pt2({ typeName: j.ZodVoid, ...D2(e3) });
  Se2 = class e3 extends E {
    _parse(t) {
      let { ctx: r, status: s } = this._processInputParams(t), n = this._def;
      if (r.parsedType !== w2.array)
        return v2(r, { code: g.invalid_type, expected: w2.array, received: r.parsedType }), R;
      if (n.exactLength !== null) {
        let a = r.data.length > n.exactLength.value, i = r.data.length < n.exactLength.value;
        (a || i) && (v2(r, { code: a ? g.too_big : g.too_small, minimum: i ? n.exactLength.value : void 0, maximum: a ? n.exactLength.value : void 0, type: "array", inclusive: true, exact: true, message: n.exactLength.message }), s.dirty());
      }
      if (n.minLength !== null && r.data.length < n.minLength.value && (v2(r, { code: g.too_small, minimum: n.minLength.value, type: "array", inclusive: true, exact: false, message: n.minLength.message }), s.dirty()), n.maxLength !== null && r.data.length > n.maxLength.value && (v2(r, { code: g.too_big, maximum: n.maxLength.value, type: "array", inclusive: true, exact: false, message: n.maxLength.message }), s.dirty()), r.common.async)
        return Promise.all([...r.data].map((a, i) => n.type._parseAsync(new ae2(r, a, r.path, i)))).then((a) => Y2.mergeArray(s, a));
      let o = [...r.data].map((a, i) => n.type._parseSync(new ae2(r, a, r.path, i)));
      return Y2.mergeArray(s, o);
    }
    get element() {
      return this._def.type;
    }
    min(t, r) {
      return new e3({ ...this._def, minLength: { value: t, message: _2.toString(r) } });
    }
    max(t, r) {
      return new e3({ ...this._def, maxLength: { value: t, message: _2.toString(r) } });
    }
    length(t, r) {
      return new e3({ ...this._def, exactLength: { value: t, message: _2.toString(r) } });
    }
    nonempty(t) {
      return this.min(1, t);
    }
  };
  Se2.create = (e3, t) => new Se2({ type: e3, minLength: null, maxLength: null, exactLength: null, typeName: j.ZodArray, ...D2(t) });
  se2 = class e3 extends E {
    constructor() {
      super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
    }
    _getCached() {
      if (this._cached !== null)
        return this._cached;
      let t = this._def.shape(), r = N2.objectKeys(t);
      return this._cached = { shape: t, keys: r };
    }
    _parse(t) {
      if (this._getType(t) !== w2.object) {
        let d = this._getOrReturnCtx(t);
        return v2(d, { code: g.invalid_type, expected: w2.object, received: d.parsedType }), R;
      }
      let { status: s, ctx: n } = this._processInputParams(t), { shape: o, keys: a } = this._getCached(), i = [];
      if (!(this._def.catchall instanceof he && this._def.unknownKeys === "strip"))
        for (let d in n.data)
          a.includes(d) || i.push(d);
      let l = [];
      for (let d of a) {
        let c = o[d], u = n.data[d];
        l.push({ key: { status: "valid", value: d }, value: c._parse(new ae2(n, u, n.path, d)), alwaysSet: d in n.data });
      }
      if (this._def.catchall instanceof he) {
        let d = this._def.unknownKeys;
        if (d === "passthrough")
          for (let c of i)
            l.push({ key: { status: "valid", value: c }, value: { status: "valid", value: n.data[c] } });
        else if (d === "strict")
          i.length > 0 && (v2(n, { code: g.unrecognized_keys, keys: i }), s.dirty());
        else if (d !== "strip")
          throw new Error("Internal ZodObject error: invalid unknownKeys value.");
      } else {
        let d = this._def.catchall;
        for (let c of i) {
          let u = n.data[c];
          l.push({ key: { status: "valid", value: c }, value: d._parse(new ae2(n, u, n.path, c)), alwaysSet: c in n.data });
        }
      }
      return n.common.async ? Promise.resolve().then(async () => {
        let d = [];
        for (let c of l) {
          let u = await c.key;
          d.push({ key: u, value: await c.value, alwaysSet: c.alwaysSet });
        }
        return d;
      }).then((d) => Y2.mergeObjectSync(s, d)) : Y2.mergeObjectSync(s, l);
    }
    get shape() {
      return this._def.shape();
    }
    strict(t) {
      return _2.errToObj, new e3({ ...this._def, unknownKeys: "strict", ...t !== void 0 ? { errorMap: (r, s) => {
        var n, o, a, i;
        let l = (a = (o = (n = this._def).errorMap) === null || o === void 0 ? void 0 : o.call(n, r, s).message) !== null && a !== void 0 ? a : s.defaultError;
        return r.code === "unrecognized_keys" ? { message: (i = _2.errToObj(t).message) !== null && i !== void 0 ? i : l } : { message: l };
      } } : {} });
    }
    strip() {
      return new e3({ ...this._def, unknownKeys: "strip" });
    }
    passthrough() {
      return new e3({ ...this._def, unknownKeys: "passthrough" });
    }
    extend(t) {
      return new e3({ ...this._def, shape: () => ({ ...this._def.shape(), ...t }) });
    }
    merge(t) {
      return new e3({ unknownKeys: t._def.unknownKeys, catchall: t._def.catchall, shape: () => ({ ...this._def.shape(), ...t._def.shape() }), typeName: j.ZodObject });
    }
    setKey(t, r) {
      return this.augment({ [t]: r });
    }
    catchall(t) {
      return new e3({ ...this._def, catchall: t });
    }
    pick(t) {
      let r = {};
      return N2.objectKeys(t).forEach((s) => {
        t[s] && this.shape[s] && (r[s] = this.shape[s]);
      }), new e3({ ...this._def, shape: () => r });
    }
    omit(t) {
      let r = {};
      return N2.objectKeys(this.shape).forEach((s) => {
        t[s] || (r[s] = this.shape[s]);
      }), new e3({ ...this._def, shape: () => r });
    }
    deepPartial() {
      return Ne2(this);
    }
    partial(t) {
      let r = {};
      return N2.objectKeys(this.shape).forEach((s) => {
        let n = this.shape[s];
        t && !t[s] ? r[s] = n : r[s] = n.optional();
      }), new e3({ ...this._def, shape: () => r });
    }
    required(t) {
      let r = {};
      return N2.objectKeys(this.shape).forEach((s) => {
        if (t && !t[s])
          r[s] = this.shape[s];
        else {
          let o = this.shape[s];
          for (; o instanceof me2; )
            o = o._def.innerType;
          r[s] = o;
        }
      }), new e3({ ...this._def, shape: () => r });
    }
    keyof() {
      return Uo2(N2.objectKeys(this.shape));
    }
  };
  se2.create = (e3, t) => new se2({ shape: () => e3, unknownKeys: "strip", catchall: he.create(), typeName: j.ZodObject, ...D2(t) });
  se2.strictCreate = (e3, t) => new se2({ shape: () => e3, unknownKeys: "strict", catchall: he.create(), typeName: j.ZodObject, ...D2(t) });
  se2.lazycreate = (e3, t) => new se2({ shape: e3, unknownKeys: "strip", catchall: he.create(), typeName: j.ZodObject, ...D2(t) });
  Fe2 = class extends E {
    _parse(t) {
      let { ctx: r } = this._processInputParams(t), s = this._def.options;
      function n(o) {
        for (let i of o)
          if (i.result.status === "valid")
            return i.result;
        for (let i of o)
          if (i.result.status === "dirty")
            return r.common.issues.push(...i.ctx.common.issues), i.result;
        let a = o.map((i) => new oe2(i.ctx.common.issues));
        return v2(r, { code: g.invalid_union, unionErrors: a }), R;
      }
      if (r.common.async)
        return Promise.all(s.map(async (o) => {
          let a = { ...r, common: { ...r.common, issues: [] }, parent: null };
          return { result: await o._parseAsync({ data: r.data, path: r.path, parent: a }), ctx: a };
        })).then(n);
      {
        let o, a = [];
        for (let l of s) {
          let d = { ...r, common: { ...r.common, issues: [] }, parent: null }, c = l._parseSync({ data: r.data, path: r.path, parent: d });
          if (c.status === "valid")
            return c;
          c.status === "dirty" && !o && (o = { result: c, ctx: d }), d.common.issues.length && a.push(d.common.issues);
        }
        if (o)
          return r.common.issues.push(...o.ctx.common.issues), o.result;
        let i = a.map((l) => new oe2(l));
        return v2(r, { code: g.invalid_union, unionErrors: i }), R;
      }
    }
    get options() {
      return this._def.options;
    }
  };
  Fe2.create = (e3, t) => new Fe2({ options: e3, typeName: j.ZodUnion, ...D2(t) });
  Ht2 = (e3) => e3 instanceof Be2 ? Ht2(e3.schema) : e3 instanceof ce2 ? Ht2(e3.innerType()) : e3 instanceof We2 ? [e3.value] : e3 instanceof Ze2 ? e3.options : e3 instanceof qe2 ? Object.keys(e3.enum) : e3 instanceof Ge2 ? Ht2(e3._def.innerType) : e3 instanceof He2 ? [void 0] : e3 instanceof ze2 ? [null] : null, ys2 = class e3 extends E {
    _parse(t) {
      let { ctx: r } = this._processInputParams(t);
      if (r.parsedType !== w2.object)
        return v2(r, { code: g.invalid_type, expected: w2.object, received: r.parsedType }), R;
      let s = this.discriminator, n = r.data[s], o = this.optionsMap.get(n);
      return o ? r.common.async ? o._parseAsync({ data: r.data, path: r.path, parent: r }) : o._parseSync({ data: r.data, path: r.path, parent: r }) : (v2(r, { code: g.invalid_union_discriminator, options: Array.from(this.optionsMap.keys()), path: [s] }), R);
    }
    get discriminator() {
      return this._def.discriminator;
    }
    get options() {
      return this._def.options;
    }
    get optionsMap() {
      return this._def.optionsMap;
    }
    static create(t, r, s) {
      let n = /* @__PURE__ */ new Map();
      for (let o of r) {
        let a = Ht2(o.shape[t]);
        if (!a)
          throw new Error(`A discriminator value for key \`${t}\` could not be extracted from all schema options`);
        for (let i of a) {
          if (n.has(i))
            throw new Error(`Discriminator property ${String(t)} has duplicate value ${String(i)}`);
          n.set(i, o);
        }
      }
      return new e3({ typeName: j.ZodDiscriminatedUnion, discriminator: t, options: r, optionsMap: n, ...D2(s) });
    }
  };
  Ve2 = class extends E {
    _parse(t) {
      let { status: r, ctx: s } = this._processInputParams(t), n = (o, a) => {
        if (Eo(o) || Eo(a))
          return R;
        let i = ws2(o.value, a.value);
        return i.valid ? ((Po2(o) || Po2(a)) && r.dirty(), { status: r.value, value: i.data }) : (v2(s, { code: g.invalid_intersection_types }), R);
      };
      return s.common.async ? Promise.all([this._def.left._parseAsync({ data: s.data, path: s.path, parent: s }), this._def.right._parseAsync({ data: s.data, path: s.path, parent: s })]).then(([o, a]) => n(o, a)) : n(this._def.left._parseSync({ data: s.data, path: s.path, parent: s }), this._def.right._parseSync({ data: s.data, path: s.path, parent: s }));
    }
  };
  Ve2.create = (e3, t, r) => new Ve2({ left: e3, right: t, typeName: j.ZodIntersection, ...D2(r) });
  ye2 = class e3 extends E {
    _parse(t) {
      let { status: r, ctx: s } = this._processInputParams(t);
      if (s.parsedType !== w2.array)
        return v2(s, { code: g.invalid_type, expected: w2.array, received: s.parsedType }), R;
      if (s.data.length < this._def.items.length)
        return v2(s, { code: g.too_small, minimum: this._def.items.length, inclusive: true, exact: false, type: "array" }), R;
      !this._def.rest && s.data.length > this._def.items.length && (v2(s, { code: g.too_big, maximum: this._def.items.length, inclusive: true, exact: false, type: "array" }), r.dirty());
      let o = [...s.data].map((a, i) => {
        let l = this._def.items[i] || this._def.rest;
        return l ? l._parse(new ae2(s, a, s.path, i)) : null;
      }).filter((a) => !!a);
      return s.common.async ? Promise.all(o).then((a) => Y2.mergeArray(r, a)) : Y2.mergeArray(r, o);
    }
    get items() {
      return this._def.items;
    }
    rest(t) {
      return new e3({ ...this._def, rest: t });
    }
  };
  ye2.create = (e3, t) => {
    if (!Array.isArray(e3))
      throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    return new ye2({ items: e3, typeName: j.ZodTuple, rest: null, ...D2(t) });
  };
  vs2 = class e3 extends E {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(t) {
      let { status: r, ctx: s } = this._processInputParams(t);
      if (s.parsedType !== w2.object)
        return v2(s, { code: g.invalid_type, expected: w2.object, received: s.parsedType }), R;
      let n = [], o = this._def.keyType, a = this._def.valueType;
      for (let i in s.data)
        n.push({ key: o._parse(new ae2(s, i, s.path, i)), value: a._parse(new ae2(s, s.data[i], s.path, i)) });
      return s.common.async ? Y2.mergeObjectAsync(r, n) : Y2.mergeObjectSync(r, n);
    }
    get element() {
      return this._def.valueType;
    }
    static create(t, r, s) {
      return r instanceof E ? new e3({ keyType: t, valueType: r, typeName: j.ZodRecord, ...D2(s) }) : new e3({ keyType: Oe2.create(), valueType: t, typeName: j.ZodRecord, ...D2(r) });
    }
  }, ut2 = class extends E {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(t) {
      let { status: r, ctx: s } = this._processInputParams(t);
      if (s.parsedType !== w2.map)
        return v2(s, { code: g.invalid_type, expected: w2.map, received: s.parsedType }), R;
      let n = this._def.keyType, o = this._def.valueType, a = [...s.data.entries()].map(([i, l], d) => ({ key: n._parse(new ae2(s, i, s.path, [d, "key"])), value: o._parse(new ae2(s, l, s.path, [d, "value"])) }));
      if (s.common.async) {
        let i = /* @__PURE__ */ new Map();
        return Promise.resolve().then(async () => {
          for (let l of a) {
            let d = await l.key, c = await l.value;
            if (d.status === "aborted" || c.status === "aborted")
              return R;
            (d.status === "dirty" || c.status === "dirty") && r.dirty(), i.set(d.value, c.value);
          }
          return { status: r.value, value: i };
        });
      } else {
        let i = /* @__PURE__ */ new Map();
        for (let l of a) {
          let d = l.key, c = l.value;
          if (d.status === "aborted" || c.status === "aborted")
            return R;
          (d.status === "dirty" || c.status === "dirty") && r.dirty(), i.set(d.value, c.value);
        }
        return { status: r.value, value: i };
      }
    }
  };
  ut2.create = (e3, t, r) => new ut2({ valueType: t, keyType: e3, typeName: j.ZodMap, ...D2(r) });
  mt2 = class e3 extends E {
    _parse(t) {
      let { status: r, ctx: s } = this._processInputParams(t);
      if (s.parsedType !== w2.set)
        return v2(s, { code: g.invalid_type, expected: w2.set, received: s.parsedType }), R;
      let n = this._def;
      n.minSize !== null && s.data.size < n.minSize.value && (v2(s, { code: g.too_small, minimum: n.minSize.value, type: "set", inclusive: true, exact: false, message: n.minSize.message }), r.dirty()), n.maxSize !== null && s.data.size > n.maxSize.value && (v2(s, { code: g.too_big, maximum: n.maxSize.value, type: "set", inclusive: true, exact: false, message: n.maxSize.message }), r.dirty());
      let o = this._def.valueType;
      function a(l) {
        let d = /* @__PURE__ */ new Set();
        for (let c of l) {
          if (c.status === "aborted")
            return R;
          c.status === "dirty" && r.dirty(), d.add(c.value);
        }
        return { status: r.value, value: d };
      }
      let i = [...s.data.values()].map((l, d) => o._parse(new ae2(s, l, s.path, d)));
      return s.common.async ? Promise.all(i).then((l) => a(l)) : a(i);
    }
    min(t, r) {
      return new e3({ ...this._def, minSize: { value: t, message: _2.toString(r) } });
    }
    max(t, r) {
      return new e3({ ...this._def, maxSize: { value: t, message: _2.toString(r) } });
    }
    size(t, r) {
      return this.min(t, r).max(t, r);
    }
    nonempty(t) {
      return this.min(1, t);
    }
  };
  mt2.create = (e3, t) => new mt2({ valueType: e3, minSize: null, maxSize: null, typeName: j.ZodSet, ...D2(t) });
  bs2 = class e3 extends E {
    constructor() {
      super(...arguments), this.validate = this.implement;
    }
    _parse(t) {
      let { ctx: r } = this._processInputParams(t);
      if (r.parsedType !== w2.function)
        return v2(r, { code: g.invalid_type, expected: w2.function, received: r.parsedType }), R;
      function s(i, l) {
        return fs2({ data: i, path: r.path, errorMaps: [r.common.contextualErrorMap, r.schemaErrorMap, hs2(), zt2].filter((d) => !!d), issueData: { code: g.invalid_arguments, argumentsError: l } });
      }
      function n(i, l) {
        return fs2({ data: i, path: r.path, errorMaps: [r.common.contextualErrorMap, r.schemaErrorMap, hs2(), zt2].filter((d) => !!d), issueData: { code: g.invalid_return_type, returnTypeError: l } });
      }
      let o = { errorMap: r.common.contextualErrorMap }, a = r.data;
      if (this._def.returns instanceof Ie2) {
        let i = this;
        return ee2(async function(...l) {
          let d = new oe2([]), c = await i._def.args.parseAsync(l, o).catch(($) => {
            throw d.addIssue(s(l, $)), d;
          }), u = await Reflect.apply(a, this, c);
          return await i._def.returns._def.type.parseAsync(u, o).catch(($) => {
            throw d.addIssue(n(u, $)), d;
          });
        });
      } else {
        let i = this;
        return ee2(function(...l) {
          let d = i._def.args.safeParse(l, o);
          if (!d.success)
            throw new oe2([s(l, d.error)]);
          let c = Reflect.apply(a, this, d.data), u = i._def.returns.safeParse(c, o);
          if (!u.success)
            throw new oe2([n(c, u.error)]);
          return u.data;
        });
      }
    }
    parameters() {
      return this._def.args;
    }
    returnType() {
      return this._def.returns;
    }
    args(...t) {
      return new e3({ ...this._def, args: ye2.create(t).rest(ke2.create()) });
    }
    returns(t) {
      return new e3({ ...this._def, returns: t });
    }
    implement(t) {
      return this.parse(t);
    }
    strictImplement(t) {
      return this.parse(t);
    }
    static create(t, r, s) {
      return new e3({ args: t || ye2.create([]).rest(ke2.create()), returns: r || ke2.create(), typeName: j.ZodFunction, ...D2(s) });
    }
  }, Be2 = class extends E {
    get schema() {
      return this._def.getter();
    }
    _parse(t) {
      let { ctx: r } = this._processInputParams(t);
      return this._def.getter()._parse({ data: r.data, path: r.path, parent: r });
    }
  };
  Be2.create = (e3, t) => new Be2({ getter: e3, typeName: j.ZodLazy, ...D2(t) });
  We2 = class extends E {
    _parse(t) {
      if (t.data !== this._def.value) {
        let r = this._getOrReturnCtx(t);
        return v2(r, { received: r.data, code: g.invalid_literal, expected: this._def.value }), R;
      }
      return { status: "valid", value: t.data };
    }
    get value() {
      return this._def.value;
    }
  };
  We2.create = (e3, t) => new We2({ value: e3, typeName: j.ZodLiteral, ...D2(t) });
  Ze2 = class e3 extends E {
    _parse(t) {
      if (typeof t.data != "string") {
        let r = this._getOrReturnCtx(t), s = this._def.values;
        return v2(r, { expected: N2.joinValues(s), received: r.parsedType, code: g.invalid_type }), R;
      }
      if (this._def.values.indexOf(t.data) === -1) {
        let r = this._getOrReturnCtx(t), s = this._def.values;
        return v2(r, { received: r.data, code: g.invalid_enum_value, options: s }), R;
      }
      return ee2(t.data);
    }
    get options() {
      return this._def.values;
    }
    get enum() {
      let t = {};
      for (let r of this._def.values)
        t[r] = r;
      return t;
    }
    get Values() {
      let t = {};
      for (let r of this._def.values)
        t[r] = r;
      return t;
    }
    get Enum() {
      let t = {};
      for (let r of this._def.values)
        t[r] = r;
      return t;
    }
    extract(t) {
      return e3.create(t);
    }
    exclude(t) {
      return e3.create(this.options.filter((r) => !t.includes(r)));
    }
  };
  Ze2.create = Uo2;
  qe2 = class extends E {
    _parse(t) {
      let r = N2.getValidEnumValues(this._def.values), s = this._getOrReturnCtx(t);
      if (s.parsedType !== w2.string && s.parsedType !== w2.number) {
        let n = N2.objectValues(r);
        return v2(s, { expected: N2.joinValues(n), received: s.parsedType, code: g.invalid_type }), R;
      }
      if (r.indexOf(t.data) === -1) {
        let n = N2.objectValues(r);
        return v2(s, { received: s.data, code: g.invalid_enum_value, options: n }), R;
      }
      return ee2(t.data);
    }
    get enum() {
      return this._def.values;
    }
  };
  qe2.create = (e3, t) => new qe2({ values: e3, typeName: j.ZodNativeEnum, ...D2(t) });
  Ie2 = class extends E {
    unwrap() {
      return this._def.type;
    }
    _parse(t) {
      let { ctx: r } = this._processInputParams(t);
      if (r.parsedType !== w2.promise && r.common.async === false)
        return v2(r, { code: g.invalid_type, expected: w2.promise, received: r.parsedType }), R;
      let s = r.parsedType === w2.promise ? r.data : Promise.resolve(r.data);
      return ee2(s.then((n) => this._def.type.parseAsync(n, { path: r.path, errorMap: r.common.contextualErrorMap })));
    }
  };
  Ie2.create = (e3, t) => new Ie2({ type: e3, typeName: j.ZodPromise, ...D2(t) });
  ce2 = class extends E {
    innerType() {
      return this._def.schema;
    }
    sourceType() {
      return this._def.schema._def.typeName === j.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
    }
    _parse(t) {
      let { status: r, ctx: s } = this._processInputParams(t), n = this._def.effect || null, o = { addIssue: (a) => {
        v2(s, a), a.fatal ? r.abort() : r.dirty();
      }, get path() {
        return s.path;
      } };
      if (o.addIssue = o.addIssue.bind(o), n.type === "preprocess") {
        let a = n.transform(s.data, o);
        return s.common.issues.length ? { status: "dirty", value: s.data } : s.common.async ? Promise.resolve(a).then((i) => this._def.schema._parseAsync({ data: i, path: s.path, parent: s })) : this._def.schema._parseSync({ data: a, path: s.path, parent: s });
      }
      if (n.type === "refinement") {
        let a = (i) => {
          let l = n.refinement(i, o);
          if (s.common.async)
            return Promise.resolve(l);
          if (l instanceof Promise)
            throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
          return i;
        };
        if (s.common.async === false) {
          let i = this._def.schema._parseSync({ data: s.data, path: s.path, parent: s });
          return i.status === "aborted" ? R : (i.status === "dirty" && r.dirty(), a(i.value), { status: r.value, value: i.value });
        } else
          return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((i) => i.status === "aborted" ? R : (i.status === "dirty" && r.dirty(), a(i.value).then(() => ({ status: r.value, value: i.value }))));
      }
      if (n.type === "transform")
        if (s.common.async === false) {
          let a = this._def.schema._parseSync({ data: s.data, path: s.path, parent: s });
          if (!Ft2(a))
            return a;
          let i = n.transform(a.value, o);
          if (i instanceof Promise)
            throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
          return { status: r.value, value: i };
        } else
          return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((a) => Ft2(a) ? Promise.resolve(n.transform(a.value, o)).then((i) => ({ status: r.value, value: i })) : a);
      N2.assertNever(n);
    }
  };
  ce2.create = (e3, t, r) => new ce2({ schema: e3, typeName: j.ZodEffects, effect: t, ...D2(r) });
  ce2.createWithPreprocess = (e3, t, r) => new ce2({ schema: t, effect: { type: "preprocess", transform: e3 }, typeName: j.ZodEffects, ...D2(r) });
  me2 = class extends E {
    _parse(t) {
      return this._getType(t) === w2.undefined ? ee2(void 0) : this._def.innerType._parse(t);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  me2.create = (e3, t) => new me2({ innerType: e3, typeName: j.ZodOptional, ...D2(t) });
  je2 = class extends E {
    _parse(t) {
      return this._getType(t) === w2.null ? ee2(null) : this._def.innerType._parse(t);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  je2.create = (e3, t) => new je2({ innerType: e3, typeName: j.ZodNullable, ...D2(t) });
  Ge2 = class extends E {
    _parse(t) {
      let { ctx: r } = this._processInputParams(t), s = r.data;
      return r.parsedType === w2.undefined && (s = this._def.defaultValue()), this._def.innerType._parse({ data: s, path: r.path, parent: r });
    }
    removeDefault() {
      return this._def.innerType;
    }
  };
  Ge2.create = (e3, t) => new Ge2({ innerType: e3, typeName: j.ZodDefault, defaultValue: typeof t.default == "function" ? t.default : () => t.default, ...D2(t) });
  ht2 = class extends E {
    _parse(t) {
      let { ctx: r } = this._processInputParams(t), s = { ...r, common: { ...r.common, issues: [] } }, n = this._def.innerType._parse({ data: s.data, path: s.path, parent: { ...s } });
      return gs2(n) ? n.then((o) => ({ status: "valid", value: o.status === "valid" ? o.value : this._def.catchValue({ get error() {
        return new oe2(s.common.issues);
      }, input: s.data }) })) : { status: "valid", value: n.status === "valid" ? n.value : this._def.catchValue({ get error() {
        return new oe2(s.common.issues);
      }, input: s.data }) };
    }
    removeCatch() {
      return this._def.innerType;
    }
  };
  ht2.create = (e3, t) => new ht2({ innerType: e3, typeName: j.ZodCatch, catchValue: typeof t.catch == "function" ? t.catch : () => t.catch, ...D2(t) });
  ft2 = class extends E {
    _parse(t) {
      if (this._getType(t) !== w2.nan) {
        let s = this._getOrReturnCtx(t);
        return v2(s, { code: g.invalid_type, expected: w2.nan, received: s.parsedType }), R;
      }
      return { status: "valid", value: t.data };
    }
  };
  ft2.create = (e3) => new ft2({ typeName: j.ZodNaN, ...D2(e3) });
  f0 = Symbol("zod_brand"), xs2 = class extends E {
    _parse(t) {
      let { ctx: r } = this._processInputParams(t), s = r.data;
      return this._def.type._parse({ data: s, path: r.path, parent: r });
    }
    unwrap() {
      return this._def.type;
    }
  }, Vt2 = class e3 extends E {
    _parse(t) {
      let { status: r, ctx: s } = this._processInputParams(t);
      if (s.common.async)
        return (async () => {
          let o = await this._def.in._parseAsync({ data: s.data, path: s.path, parent: s });
          return o.status === "aborted" ? R : o.status === "dirty" ? (r.dirty(), Hm(o.value)) : this._def.out._parseAsync({ data: o.value, path: s.path, parent: s });
        })();
      {
        let n = this._def.in._parseSync({ data: s.data, path: s.path, parent: s });
        return n.status === "aborted" ? R : n.status === "dirty" ? (r.dirty(), { status: "dirty", value: n.value }) : this._def.out._parseSync({ data: n.value, path: s.path, parent: s });
      }
    }
    static create(t, r) {
      return new e3({ in: t, out: r, typeName: j.ZodPipeline });
    }
  }, gt2 = class extends E {
    _parse(t) {
      let r = this._def.innerType._parse(t);
      return Ft2(r) && (r.value = Object.freeze(r.value)), r;
    }
  };
  gt2.create = (e3, t) => new gt2({ innerType: e3, typeName: j.ZodReadonly, ...D2(t) });
  g0 = { object: se2.lazycreate };
  (function(e3) {
    e3.ZodString = "ZodString", e3.ZodNumber = "ZodNumber", e3.ZodNaN = "ZodNaN", e3.ZodBigInt = "ZodBigInt", e3.ZodBoolean = "ZodBoolean", e3.ZodDate = "ZodDate", e3.ZodSymbol = "ZodSymbol", e3.ZodUndefined = "ZodUndefined", e3.ZodNull = "ZodNull", e3.ZodAny = "ZodAny", e3.ZodUnknown = "ZodUnknown", e3.ZodNever = "ZodNever", e3.ZodVoid = "ZodVoid", e3.ZodArray = "ZodArray", e3.ZodObject = "ZodObject", e3.ZodUnion = "ZodUnion", e3.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", e3.ZodIntersection = "ZodIntersection", e3.ZodTuple = "ZodTuple", e3.ZodRecord = "ZodRecord", e3.ZodMap = "ZodMap", e3.ZodSet = "ZodSet", e3.ZodFunction = "ZodFunction", e3.ZodLazy = "ZodLazy", e3.ZodLiteral = "ZodLiteral", e3.ZodEnum = "ZodEnum", e3.ZodEffects = "ZodEffects", e3.ZodNativeEnum = "ZodNativeEnum", e3.ZodOptional = "ZodOptional", e3.ZodNullable = "ZodNullable", e3.ZodDefault = "ZodDefault", e3.ZodCatch = "ZodCatch", e3.ZodPromise = "ZodPromise", e3.ZodBranded = "ZodBranded", e3.ZodPipeline = "ZodPipeline", e3.ZodReadonly = "ZodReadonly";
  })(j || (j = {}));
  De2 = Oe2.create, y0 = ot2.create, w0 = ft2.create, v0 = at2.create, b0 = it2.create, No2 = ct2.create, x0 = lt2.create, _0 = He2.create, k0 = ze2.create, S0 = dt.create, j0 = ke2.create, A0 = he.create, C0 = pt2.create, Oo2 = Se2.create, _s3 = se2.create, T0 = se2.strictCreate, $0 = Fe2.create, I0 = ys2.create, D0 = Ve2.create, R0 = ye2.create, M0 = vs2.create, E0 = ut2.create, P0 = mt2.create, L0 = bs2.create, U0 = Be2.create, N0 = We2.create, O0 = Ze2.create, H0 = qe2.create, z0 = Ie2.create, F0 = ce2.create, V0 = me2.create, B0 = je2.create, W0 = ce2.createWithPreprocess, Z0 = Vt2.create;
});
var zo2 = {};
f(zo2, { _internal: () => nh, body: () => rh, collection: () => eh, data: () => sh, id: () => Qm, slug: () => th });
var Qm;
var eh;
var th;
var rh;
var sh;
var nh;
var Fo2 = m(() => {
  "use strict";
  Qm = "blue-beanie-day.mdx", eh = "post", th = "blue-beanie-day", rh = `
&lt;p&gt;November 30 for most web standard-istas represents &lt;a href="http://bluebeanieday.tumblr.com/post/103643267347/have-we-got-a-beanie-for-you"&gt;Blue Beanie Day&lt;/a&gt;, a showing of support to web standards. In recognition of this day my &lt;a href="https://twitter.com/serdar"&gt;Twitter&lt;/a&gt; profile photo has been updated to show my support. Standards FTW!&lt;/p&gt;`, sh = { title: "Blue Beanie Day", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: /* @__PURE__ */ new Date(1417291404e3) }, nh = { type: "content", filePath: "/Users/serdar/dev/projects/my-astro-app/src/content/post/blue-beanie-day.mdx", rawData: void 0 };
});
var Vo2 = {};
f(Vo2, { _internal: () => dh, body: () => ch, collection: () => ah, data: () => lh, id: () => oh, slug: () => ih });
var oh;
var ah;
var ih;
var ch;
var lh;
var dh;
var Bo2 = m(() => {
  "use strict";
  oh = "cycling.mdx", ah = "post", ih = "cycling", ch = `
&lt;p&gt;Professional cycling has it\u2019s work cut out to improve its image that\u2019s been tarnished through rampant drug and illegal supplement abuse. Not a day goes by as I sift through my &lt;a href="http://www.cyclingnews.com/"&gt;Cycling News&lt;/a&gt; feed that there isn\u2019t some mention of a pro cyclist that is coming off probation, . Lance, personally, was a huge disappointment.&lt;/p&gt; &lt;p&gt;I still enjoy cycling as a sport and will continue to keep up with the pro-cycling races albeit with a slight scepticism when the winners step up to the podium.&lt;/p&gt; &lt;p&gt;My Trek Madone that was &lt;a href="http://weblog.kilic.net/previously/2010/07/24/stolen_-_trek_madone_45_-_glenwood_nsw_area"&gt;stolen-then-recovered&lt;/a&gt; is destined for a complete make-over, new wheels, new parts \u2013 this is going to be a side-project of mine to completely rebuild it. Should be fun!&lt;/p&gt;`, lh = { title: "Cycling", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: /* @__PURE__ */ new Date(1386985372e3) }, dh = { type: "content", filePath: "/Users/serdar/dev/projects/my-astro-app/src/content/post/cycling.mdx", rawData: void 0 };
});
var Wo2 = {};
f(Wo2, { _internal: () => gh, body: () => hh, collection: () => uh, data: () => fh, id: () => ph, slug: () => mh });
var ph;
var uh;
var mh;
var hh;
var fh;
var gh;
var Zo2 = m(() => {
  "use strict";
  ph = "dell-m3800.mdx", uh = "post", mh = "dell-m3800", hh = `
A few of us at work got to renew our laptops and we've all gone for the latest Dell M3800.&lt;br /&gt;&lt;br /&gt;Sporting a 3200x1800 (touch) display, 16GB RAM, and a 256GB SSD this is a beast of a machine to work with. Scott's post about &lt;a href="http://www.hanselman.com/blog/LivingAHighDPIDesktopLifestyleCanBePainful.aspx"&gt;High-DPI displays&lt;/a&gt; couldn't have come at a better time, there's plenty of well written apps (Visual Studio 2013) and not some great ones.&lt;br /&gt;&lt;br /&gt;Being 15" inches it's larger than what I would prefer but it tips the scale just a bit over 2kg - so it's going to be much more practical lugging it home each night.&lt;br /&gt;&lt;br /&gt;Since Microsoft removed the &lt;a href="http://www.neowin.net/news/windows-81-preview-removes-windows-experience-index"&gt;windows experience index&lt;/a&gt; from 8.1 there's no scoring of this unit, but the screen is really bright and startup times are one of the best I've seen.&lt;br /&gt;`, fh = { title: "Dell M3800", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: /* @__PURE__ */ new Date(1394255434e3) }, gh = { type: "content", filePath: "/Users/serdar/dev/projects/my-astro-app/src/content/post/dell-m3800.mdx", rawData: void 0 };
});
var qo = {};
f(qo, { _internal: () => _h2, body: () => bh, collection: () => wh, data: () => xh, id: () => yh, slug: () => vh });
var yh;
var wh;
var vh;
var bh;
var xh;
var _h2;
var Go = m(() => {
  "use strict";
  yh = "excuse-the-updates.mdx", wh = "post", vh = "excuse-the-updates", bh = `
&lt;p&gt;Well it seems as though me tinkering with the CMS (MiniBlog) that runs this blog has made the posts giving a 404 error. I think it has something to do with the HttpCache not refreshing. Regardless, there will be a few oddities whilst I get things back in order around here.&lt;/p&gt;`, xh = { title: "Excuse the updates", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: /* @__PURE__ */ new Date(141121904e4) }, _h2 = { type: "content", filePath: "/Users/serdar/dev/projects/my-astro-app/src/content/post/excuse-the-updates.mdx", rawData: void 0 };
});
var Xo = {};
f(Xo, { _internal: () => Th, body: () => Ah, collection: () => Sh, data: () => Ch, id: () => kh, slug: () => jh });
var kh;
var Sh;
var jh;
var Ah;
var Ch;
var Th;
var Ko = m(() => {
  "use strict";
  kh = "galatasaray.mdx", Sh = "post", jh = "galatasaray", Ah = `
&lt;p&gt;A week or so ago my phone started buzzing with notifications from Twitter. I had a whole bunch of new followers (almost all from Turkey) and a &lt;a href="https://twitter.com/serdar/status/5669297"&gt;tweet&lt;/a&gt; that was favourited quite a few times. I didn\u2019t realise till I saw a tweet this evening as to why:&lt;/p&gt; &lt;blockquote lang="en" class="twitter-tweet"&gt; &lt;p&gt;Twitter'da Fenerbah\xE7e ile ilgili at\u0131lan ilk tweet: &lt;a href="https://t.co/RtaPU1omzm"&gt;https://t.co/RtaPU1omzm&lt;/a&gt; Galatasaray ile ilgili at\u0131lan ilk tweet: &lt;a href="https://t.co/J3mXSUZ7VF"&gt;https://t.co/J3mXSUZ7VF&lt;/a&gt;&lt;/p&gt;\u2014 An\u0131l G\xFCler (@anilgulerr) &lt;a href="https://twitter.com/anilgulerr/status/537624302192164864"&gt;November 26, 2014&lt;/a&gt;&lt;/blockquote&gt;&lt;script async src="//platform.twitter.com/widgets.js" charset="utf-8"&gt;&lt;/script&gt;Translating to English it basically reads that that my tweet was the first mention of &lt;a href="http://www.galatasaray.org/en/"&gt;Galatasaray&lt;/a&gt; on Twitter. Nice!`, Ch = { title: "Galatasaray", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: /* @__PURE__ */ new Date(1417166264e3) }, Th = { type: "content", filePath: "/Users/serdar/dev/projects/my-astro-app/src/content/post/galatasaray.mdx", rawData: void 0 };
});
var Yo = {};
f(Yo, { _internal: () => Eh, body: () => Rh, collection: () => Ih, data: () => Mh, id: () => $h, slug: () => Dh });
var $h;
var Ih;
var Dh;
var Rh;
var Mh;
var Eh;
var Jo = m(() => {
  "use strict";
  $h = "getting-the-new-york-times-app-working-in-windows-8.mdx", Ih = "post", Dh = "getting-the-new-york-times-app-working-in-windows-8", Rh = `
&lt;p&gt;I recently re-subscribed to the New York Times after offering a 12-week access for only USD$0.99, can\u2019t beat that \u2013 I\u2019ll decide later if I\u2019ll keep my subscription at the end of the program. However for those NY Times readers who live outside of the US and running Windows 8/8.1 you might have a hard time getting the app to launch.&lt;/p&gt; &lt;p&gt;Installation is quick and straightforward from the app store but upon launching the app you\u2019ll be greeted with the following splash screen along with the rotating progress bar (which doesn\u2019t get captured using the print screen button).&lt;/p&gt; &lt;p&gt;&lt;img title="nytimes-loading" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="nytimes-loading" src="http://kilic.net/images/2013/12/nytimes-loading.png"&gt;&lt;/p&gt; &lt;p&gt;So I fired up Fiddler 2 to see what\u2019s going on behind the scenes and found this little nugget. Notice that the url contains the region and language code that\u2019s set for my PC.&lt;/p&gt; &lt;p&gt;&lt;img title="nytimes-404" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="nytimes-404" src="http://kilic.net/images/2013/12/nytimes-404.png"&gt;&lt;/p&gt; &lt;p&gt;I then grabbed the URL and modified the region-language to be &lt;em&gt;en-us&lt;/em&gt; and sure enough I got a valid JSON response in return.&lt;/p&gt; &lt;p&gt;Now to get this working without some URL hack one needs to simply change the home location via region settings to be US. Of course you may not want to do this as it may affect other sites but as a quick measure to grab your news this little hack seems to get around the problem.&lt;/p&gt; &lt;p&gt;&lt;img title="region-nytimes-location-us" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="region-nytimes-location-us" src="http://kilic.net/images/2013/12/region-nytimes-location-us.png"&gt;&lt;/p&gt;`, Mh = { title: "Getting the New York Times app working in Windows 8", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: /* @__PURE__ */ new Date(1388469836e3) }, Eh = { type: "content", filePath: "/Users/serdar/dev/projects/my-astro-app/src/content/post/getting-the-new-york-times-app-working-in-windows-8.mdx", rawData: void 0 };
});
var Qo = {};
f(Qo, { _internal: () => Hh, body: () => Nh, collection: () => Lh, data: () => Oh, id: () => Ph, slug: () => Uh });
var Ph;
var Lh;
var Uh;
var Nh;
var Oh;
var Hh;
var ea = m(() => {
  "use strict";
  Ph = "goodbye-five-simple-steps.mdx", Lh = "post", Uh = "goodbye-five-simple-steps", Nh = `
&lt;p&gt;Sad to see these guys fold up shop, I've enjoyed several of their titles throughout the years and was looking forward to Bolton's grid book.&lt;/p&gt;&lt;p&gt;Their &lt;a href="http://www.fivesimplesteps.com/"&gt;farewell statement.&lt;/a&gt;&lt;/p&gt;`, Oh = { title: "Goodbye Five Simple Steps", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: /* @__PURE__ */ new Date(1397827919e3) }, Hh = { type: "content", filePath: "/Users/serdar/dev/projects/my-astro-app/src/content/post/goodbye-five-simple-steps.mdx", rawData: void 0 };
});
var ta = {};
f(ta, { _internal: () => Zh, body: () => Bh, collection: () => Fh, data: () => Wh, id: () => zh, slug: () => Vh });
var zh;
var Fh;
var Vh;
var Bh;
var Wh;
var Zh;
var ra = m(() => {
  "use strict";
  zh = "google-test-post.mdx", Fh = "post", Vh = "google-test-post", Bh = `
&lt;a href="https://plus.google.com/110854991323348293549" rel="publisher"&gt;Google+&lt;/a&gt;`, Wh = { title: "Google+ Test Post", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: "2014-05-17 03:18:5" }, Zh = { type: "content", filePath: "/Users/serdar/dev/projects/my-astro-app/src/content/post/google-test-post.mdx", rawData: void 0 };
});
var sa = {};
f(sa, { _internal: () => Jh, body: () => Kh, collection: () => Gh, data: () => Yh, id: () => qh, slug: () => Xh });
var qh;
var Gh;
var Xh;
var Kh;
var Yh;
var Jh;
var na2 = m(() => {
  "use strict";
  qh = "graduation.mdx", Gh = "post", Xh = "graduation", Kh = `
&lt;p&gt;At long last the day has come, well, will come, on the 13th September 2014 the day that I graduate from Southern Cross University with a Bachelor of Information Technology degree. It\u2019s more of a relief than excitement right now, but I\u2019m sure once I hold my testamur in my hand it will be sheer joy.&lt;/p&gt;`, Yh = { title: "Graduation", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: /* @__PURE__ */ new Date(140341494e4) }, Jh = { type: "content", filePath: "/Users/serdar/dev/projects/my-astro-app/src/content/post/graduation.mdx", rawData: void 0 };
});
var oa = {};
f(oa, { _internal: () => nf, body: () => rf, collection: () => ef, data: () => sf, id: () => Qh, slug: () => tf });
var Qh;
var ef;
var tf;
var rf;
var sf;
var nf;
var aa = m(() => {
  "use strict";
  Qh = "happy-birthday-microformats.mdx", ef = "post", tf = "happy-birthday-microformats", rf = `
&lt;p&gt;It\u2019s been 9 years since Microformats were conceived, and whilst we don\u2019t talk about it as much these days it\u2019s reassuring to see the effort and development continue. There\u2019s more info at this &lt;a href="http://microformats.org/2014/06/20/microformats-org-turns-9-upgrade-to-microformats2"&gt;blog post&lt;/a&gt; at &lt;a href="http://microformats.org"&gt;microformats.org&lt;/a&gt;.&lt;/p&gt;`, sf = { title: "Happy Birthday Microformats", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: /* @__PURE__ */ new Date(1403581158e3) }, nf = { type: "content", filePath: "/Users/serdar/dev/projects/my-astro-app/src/content/post/happy-birthday-microformats.mdx", rawData: void 0 };
});
var ia = {};
f(ia, { _internal: () => pf, body: () => lf, collection: () => af, data: () => df, id: () => of, slug: () => cf });
var of;
var af;
var cf;
var lf;
var df;
var pf;
var ca = m(() => {
  "use strict";
  of = "is-this-still-on-2020-edition.mdx", af = "post", cf = "is-this-still-on-2020-edition", lf = `
A single yearly post is becoming tradition, one that I'm not too fond of TBH. Much prefer to build the tools then to write about them I suppose. :)
`, df = { title: "Is this still on 2020 edition", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: "2020-07-07 11:45:46 AM" }, pf = { type: "content", filePath: "/Users/serdar/dev/projects/my-astro-app/src/content/post/is-this-still-on-2020-edition.mdx", rawData: void 0 };
});
var la = {};
f(la, { _internal: () => yf, body: () => ff, collection: () => mf, data: () => gf, id: () => uf, slug: () => hf });
var uf;
var mf;
var hf;
var ff;
var gf;
var yf;
var da = m(() => {
  "use strict";
  uf = "is-this-thing-still-on.mdx", mf = "post", hf = "is-this-thing-still-on", ff = `
Yes, yes it is.&lt;br /&gt;&lt;br /&gt;Time to start publishing again, locally.&lt;br /&gt;`, gf = { title: "Is this thing still on?", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: /* @__PURE__ */ new Date(1546347746e3) }, yf = { type: "content", filePath: "/Users/serdar/dev/projects/my-astro-app/src/content/post/is-this-thing-still-on.mdx", rawData: void 0 };
});
var pa = {};
f(pa, { _internal: () => kf, body: () => xf, collection: () => vf, data: () => _f2, id: () => wf, slug: () => bf });
var wf;
var vf;
var bf;
var xf;
var _f2;
var kf;
var ua = m(() => {
  "use strict";
  wf = "kilic.net-logo.mdx", vf = "post", bf = "kilicnet-logo", xf = `
I've started tweaking some aspects of this weblog, starting with a refresh of the logo. The current design (which is been with me for several years now) looks dated, low quality, and a bit uninspiring. I'm a developer first! You can see transition of the old to new logo in the image below: 

<a title="kilic.net logo - previous by Serdar Kilic, on Flickr" href="https://www.flickr.com/photos/serdar/15756872787"><img alt="kilic.net logo - previous" src="https://farm8.staticflickr.com/7487/15756872787_d9a27353d0.jpg" width="500" height="308" /></a> 
&amp;nbsp;

The new logo has dropped the border around the icon, introduced a modified colour palette, and also introduced a transparency gradient originating from the top-left corner to the bottom-right corner.

As any web developer would know, you just don't have a single icon these days. With such vast array of platforms these days they have their own way of displaying "favourite" icons. As of now, I've specified a good old Web 1.0 <a href="http://kilic.net/favicon.ico">favicon.ico</a>, an iPhone icon (using the apple-touch-icon meta tag) and also for the Windows 8.1 devices, a whole range of logo sizes to suite the Live Tiles format. The Windows 8.1 icons are specified in my <a href="http://kilic.net/browserconfig.xml">browserconfig.xml</a> file that's referenced via an msapplication-config meta tag on this page.`, _f2 = { title: "kilic.net logo", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: /* @__PURE__ */ new Date(1417666685e3) }, kf = { type: "content", filePath: "/Users/serdar/dev/projects/my-astro-app/src/content/post/kilic.net-logo.mdx", rawData: void 0 };
});
var ma = {};
f(ma, { _internal: () => $f, body: () => Cf, collection: () => jf, data: () => Tf, id: () => Sf, slug: () => Af });
var Sf;
var jf;
var Af;
var Cf;
var Tf;
var $f;
var ha = m(() => {
  "use strict";
  Sf = "knet-v2.mdx", jf = "post", Af = "knet-v2", Cf = `
Been working on this for a short while now, a new design, a new more modern blogging system... It's been a blast working on the new site, the design is almost complete with only a few more pages left to build out.

Once the system build is complete I'll outline how I went about the design and the build.

<img src="//cdn.kilic.net/posts/files/49a7295e-0a74-4606-9db6-6f14a5c393b2.png" alt="" />
`, Tf = { title: "knet-v22", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: "2022-09-13 9:39:18 AM" }, $f = { type: "content", filePath: "/Users/serdar/dev/projects/my-astro-app/src/content/post/knet-v2.mdx", rawData: void 0 };
});
var fa = {};
f(fa, { _internal: () => Pf, body: () => Mf, collection: () => Df, data: () => Ef, id: () => If, slug: () => Rf });
var If;
var Df;
var Rf;
var Mf;
var Ef;
var Pf;
var ga = m(() => {
  "use strict";
  If = "lenovo-miix-2.mdx", Df = "post", Rf = "lenovo-miix-2", Mf = `
&lt;p&gt;Whilst waiting on the mrs for I popped in to the local JB Hi Fi stored to have a look at the new Lenovo Miix 2 8" Windows tablet (say that ten times fast!). After reading great reviews about this device\xA0I really thought this might fill the lack of a similarly speced Surface tablet.&lt;/p&gt;&lt;p&gt;Unfortunately, what most reviews fail to state is that there's only 9GB of user storage space left (on a 32 GB device), and this is without Office 2013 installed! I had\xA0a look to see if there was any bloat ware that could be removed and there isn't much space that can be saved on this device - so they're running pretty lean already.&lt;/p&gt;&lt;p&gt;So if you are in the market for a Windows tablet before you swipe that credit card have\xA0a quick peek at what storage space is actually available. You may be surprised.&lt;/p&gt;`, Ef = { title: "Lenovo Miix 2", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: /* @__PURE__ */ new Date(1388399293e3) }, Pf = { type: "content", filePath: "/Users/serdar/dev/projects/my-astro-app/src/content/post/lenovo-miix-2.mdx", rawData: void 0 };
});
var ya = {};
f(ya, { _internal: () => zf, body: () => Of, collection: () => Uf, data: () => Hf, id: () => Lf, slug: () => Nf });
var Lf;
var Uf;
var Nf;
var Of;
var Hf;
var zf;
var wa = m(() => {
  "use strict";
  Lf = "mean-people.mdx", Uf = "post", Nf = "mean-people", Of = `
&lt;p&gt;I don\u2019t read &lt;a href="http://paulgraham.com/index.html"&gt;Paul Graham&lt;/a&gt; as often as I should, to read not because of his startup super-star status, but for his insights into the world of &lt;a href="http://paulgraham.com/articles.html"&gt;startups&lt;/a&gt;. His latest article, &lt;a href="http://paulgraham.com/mean.html"&gt;Mean People Fail&lt;/a&gt;, flies right into the face of the age old &lt;a href="http://en.wikipedia.org/wiki/Aphorism"&gt;aphorism&lt;/a&gt; \u201C&lt;a href="http://en.wikipedia.org/wiki/Nice_guy#The_.22nice_guys_finish_last.22_view"&gt;nice guys finish last&lt;/a&gt;\u201D. Well worth your time today to go have a read.&lt;/p&gt;`, Hf = { title: "Mean People", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: /* @__PURE__ */ new Date(1417290251e3) }, zf = { type: "content", filePath: "/Users/serdar/dev/projects/my-astro-app/src/content/post/mean-people.mdx", rawData: void 0 };
});
var va = {};
f(va, { _internal: () => qf, body: () => Wf, collection: () => Vf, data: () => Zf, id: () => Ff, slug: () => Bf });
var Ff;
var Vf;
var Bf;
var Wf;
var Zf;
var qf;
var ba = m(() => {
  "use strict";
  Ff = "microsoft-sculpt-ergonomic-desktop.mdx", Vf = "post", Bf = "microsoft-sculpt-ergonomic-desktop", Wf = `
&lt;p&gt;When my original keyboard loss some functionality (it had a missing key on the number pad and both Windows keys stopped working) after being in the hands of my 3 year old, it was time to search for a replacement.  &lt;p&gt;I came across &lt;a href="http://www.istartedsomething.com/20131012/microsoft-sculpt-ergonomic-desktop-falling-in-love-with-ergonomics-again/"&gt;Long Zheng's article&lt;/a&gt; about the &lt;a href="http://www.microsoft.com/hardware/en-us/p/sculpt-ergonomic-desktop"&gt;Microsoft Sculpt Ergonomic Desktop&lt;/a&gt;, I thought it looked pretty cool, and having been a previous owner of a Microsoft ergo keyboard I thought I'd give it another try.  &lt;p&gt;The desktop consists of the keyboard, mouse, an external number pad, and a "raiser" that makes the keyboard sit a bit higher. All input devices come with Duracell batteries. Oddly, the keyboard takes two AAA batteries whilst the mouse takes two AA batteries - I thought it would have been the other way around as this makes the mouse a bit heavier on the desk and thus restricts movement.  &lt;p&gt;The standout of the package is most definitely the keyboard, after using my Razer Lycos with the soft rubber keys, it's going to take some time to get use to the more typical finish on the Sculpt keyboard. The travel is pretty short on the keys but it feels really good and responsive, my favourite keyboard still being the one on my Lenovo X1 Carbon. They sure know how to put a great keyboard on their laptops!  &lt;p&gt;The mouse is a different story, whilst the movement is precise its physical size is massive - my current breed of mice is the Logitech Anywhere MX which is quite small so it's a big difference to the Sculpt mouse. After about 30 minutes of use my wrist started to hurt, and apparently there's a right way to hold it as depicted in one of the booklets you get with it. I'm going to need to give it more time to get comfortable with it. Here\u2019s a &lt;a title="Logitech Anywhere MX vs Microsoft Ergonomic Sculpt by Serdar Kilic, on Flickr" href="http://www.flickr.com/photos/serdar/11351801796"&gt;size comparison&lt;/a&gt; between the two mice.  &lt;p&gt;I inserted the USB receiver (yep, it's not Bluetooth, it's &lt;em&gt;Bluetrack&lt;/em&gt;!) to the back USB port on my PC that sits below my desk, and both mouse and keyboard had absolutely no problems finding it to get them working. Great stuff!  &lt;p&gt;Finally, would I recommend this? Absolutely - but give the mouse a try to see if it is to your liking, especially if you're not use to larger mice.&lt;/p&gt;`, Zf = { title: "Microsoft Sculpt Ergonomic Desktop", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: /* @__PURE__ */ new Date(138693654e4) }, qf = { type: "content", filePath: "/Users/serdar/dev/projects/my-astro-app/src/content/post/microsoft-sculpt-ergonomic-desktop.mdx", rawData: void 0 };
});
var xa2 = {};
f(xa2, { _internal: () => Qf, body: () => Yf, collection: () => Xf, data: () => Jf, id: () => Gf, slug: () => Kf });
var Gf;
var Xf;
var Kf;
var Yf;
var Jf;
var Qf;
var _a4 = m(() => {
  "use strict";
  Gf = "my-new-post.mdx", Xf = "post", Kf = "my-new-post", Yf = `
<img src="//cdn.kilic.net/posts/files/d0bd67e4-d7af-49e8-b092-0c63622a35c1.jpeg" alt="" />`, Jf = { title: "Pixel 3 XL", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: /* @__PURE__ */ new Date(1546516872e3) }, Qf = { type: "content", filePath: "/Users/serdar/dev/projects/my-astro-app/src/content/post/my-new-post.mdx", rawData: void 0 };
});
var ka = {};
f(ka, { _internal: () => og, body: () => sg, collection: () => tg, data: () => ng, id: () => eg, slug: () => rg });
var eg;
var tg;
var rg;
var sg;
var ng;
var og;
var Sa = m(() => {
  "use strict";
  eg = "on-blogging.mdx", tg = "post", rg = "on-blogging", sg = `
&lt;p&gt;It goes without saying that I really haven't been keeping this site updated as frequently as I would have hoped to but here's some tidbits on what's new around here. &lt;/p&gt; &lt;p&gt;For the last six years I've been hosting this site and others with Media Temple (mt) and after hearing that they've been acquired by GoDaddy I decided that it's time to move my site. I had previously migrated domains over to Hover (I use NetRegistry for .au domains) from GoDaddy. See a theme here? &lt;/p&gt; &lt;p&gt;The website move is slightly more involved as I was also using Media Temple to host my DNS records. I ended up moving my DNS to Amazon Route 53, whilst not free, it has some great tools and it really isn't that expensive - unless this domain gets a ridiculous amount of DNS queries. &lt;/p&gt; &lt;p&gt;By day I'm a .NET developer but I've actually never hosted my own sites on .NET, this had to change! After visiting TechEd this year I decided to learn more about Windows Azure. The blogs of &lt;a href="http://www.hanselman.com/blog/"&gt;Scott Hanselman&lt;/a&gt; and &lt;a href="http://weblogs.asp.net/scottgu/"&gt;Scott Guthrie&lt;/a&gt; were great to get up to speed on the how and what things need to be done. That said, if you use Visual Studio it's surprisingly easy to publish a site straight from the IDE - things get even easier if you're using Visual Studio 2013! &lt;/p&gt; &lt;p&gt;A few hoops later I had migrated my sites and emails over to Azure - actually, I'm using a hosted Exchange service for my emails that's linked to my Azure Active Directory. Of course this all meant that I had to swap out blog engines but I'll save that for a future post. &lt;/p&gt;`, ng = { title: "On Blogging", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: /* @__PURE__ */ new Date(138563658e4) }, og = { type: "content", filePath: "/Users/serdar/dev/projects/my-astro-app/src/content/post/on-blogging.mdx", rawData: void 0 };
});
var ja = {};
f(ja, { _internal: () => pg, body: () => lg, collection: () => ig, data: () => dg, id: () => ag, slug: () => cg });
var ag;
var ig;
var cg;
var lg;
var dg;
var pg;
var Aa2 = m(() => {
  "use strict";
  ag = "reading-list-api.mdx", ig = "post", cg = "reading-list-api", lg = `
If you have a Windows 8 tablet or laptop you'll be familiar with the &lt;a href="http://windows.microsoft.com/en-au/windows/reading-list-app-faq#1TC=windows-8"&gt;Reading List&lt;/a&gt; bookmark app from Microsoft. Whilst great as it is, we have a native application used to save &lt;i&gt;web &lt;/i&gt;based resources, yet not have any &lt;i&gt;web &lt;/i&gt;way of retrieving that same data!\xA0&lt;br /&gt;&lt;br /&gt;I've &lt;a href="http://microsoft.uservoice.com/forums/173122-general/suggestions/6658706-reading-list-api"&gt;submitted a request&lt;/a&gt; to Microsoft via its UserVoice feedback system to allow for an open API access to the Reading List service, thus enabling the community to build additional methods of accessing said bookmarks.&lt;br /&gt;&lt;br /&gt;&lt;a href="http://microsoft.uservoice.com/forums/173122-general/suggestions/6658706-reading-list-api"&gt;Vote up&lt;/a&gt; if you think it's a good idea!&lt;br /&gt;`, dg = { title: "Reading List API", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: /* @__PURE__ */ new Date(1416617562e3) }, pg = { type: "content", filePath: "/Users/serdar/dev/projects/my-astro-app/src/content/post/reading-list-api.mdx", rawData: void 0 };
});
var Ca = {};
f(Ca, { _internal: () => yg, body: () => fg, collection: () => mg, data: () => gg, id: () => ug, slug: () => hg });
var ug;
var mg;
var hg;
var fg;
var gg;
var yg;
var Ta = m(() => {
  "use strict";
  ug = "test-title.mdx", mg = "post", hg = "test-title", fg = `
&lt;p&gt;this is a post&lt;/p&gt; &lt;h1&gt;with a H1&lt;/h1&gt; &lt;p&gt;and a &lt;/p&gt; &lt;h2&gt;h2&lt;/h2&gt;`, gg = { title: "Test title", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: /* @__PURE__ */ new Date(1385631887e3) }, yg = { type: "content", filePath: "/Users/serdar/dev/projects/my-astro-app/src/content/post/test-title.mdx", rawData: void 0 };
});
var $a = {};
f($a, { _internal: () => kg, body: () => xg, collection: () => vg, data: () => _g2, id: () => wg, slug: () => bg });
var wg;
var vg;
var bg;
var xg;
var _g2;
var kg;
var Ia = m(() => {
  "use strict";
  wg = "title-lss-rss.mdx", vg = "post", bg = "title-lss-rss", xg = `
The previous version of Scripting News toyed with the idea of having title-less feeds, but resulted in a view like below in NextGen Reader.
 
<a title="Scripting News - No Titles by Serdar Kilic, on Flickr" href="https://www.flickr.com/photos/serdar/15663069888"><img alt="Scripting News - No Titles" src="https://farm9.staticflickr.com/8561/15663069888_54d2411796.jpg" width="500" height="441"/></a> 
 
Recently however, Dave updated his software (i.e. his weblog) and along with it titles came back into play. You can see this in the first post in the screenshot below, makes quite a difference doesn\u2019t it? Fact is that most feed readers area geared to work with a title accompanying the post albeit such a requirement isn\u2019t mandated by the <a href="http://cyber.law.harvard.edu/rss/rss.html#hrelementsOfLtitemgt">spec</a>.
 
<a title="Scripting News - With Titles by Serdar Kilic, on Flickr" href="https://www.flickr.com/photos/serdar/15663240060"><img alt="Scripting News - With Titles" src="https://farm8.staticflickr.com/7542/15663240060_6a4311112f.jpg" width="500" height="137" /></a>
 
Whilst RSS without titles are a great idea if you post multiple updates per day, but with the lack of tooling to support it, it leaves the user experience for the readers in a less enviable position. Then again, is it much different to how Twitter works? What if we were allowed to import our OPML lists into Twitter and have items come through as they were posted?
`, _g2 = { title: "Title-less RSS", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: /* @__PURE__ */ new Date(14166588e5) }, kg = { type: "content", filePath: "/Users/serdar/dev/projects/my-astro-app/src/content/post/title-lss-rss.mdx", rawData: void 0 };
});
var Da = {};
f(Da, { _internal: () => $g, body: () => Cg, collection: () => jg, data: () => Tg, id: () => Sg, slug: () => Ag });
var Sg;
var jg;
var Ag;
var Cg;
var Tg;
var $g;
var Ra = m(() => {
  "use strict";
  Sg = "weblog-structure.mdx", jg = "post", Ag = "weblog-structure", Cg = `
&lt;div&gt;Part of starting to blog again is to reacquaint myself with the code base that runs this site. The site itself is hosted within a Microsoft Azure App Service and the source code hosted in a private github repo.&lt;/div&gt;&lt;div&gt;&lt;br /&gt;&lt;/div&gt;&lt;div&gt;Each commit to the branch triggers a webhook that Azure is listening on that pulls in the latest code. Easy mode!&lt;/div&gt;&lt;div&gt;&lt;br /&gt;&lt;/div&gt;&lt;div&gt;Visual Studio code is my current editor of choice, the seamless integration with GitHub and it allowing me to run on my Mac or Windows PC makes it an easy choice.&lt;/div&gt;&lt;div&gt;&lt;br /&gt;&lt;/div&gt;&lt;div&gt;&lt;img src="//cdn.kilic.net/posts/files/99eb7649-2918-44e4-a224-1b55adcd6802.jpeg" alt=""  /&gt;&lt;br /&gt;&lt;/div&gt;`, Tg = { title: "Weblog Structure", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: /* @__PURE__ */ new Date(1546421262e3) }, $g = { type: "content", filePath: "/Users/serdar/dev/projects/my-astro-app/src/content/post/weblog-structure.mdx", rawData: void 0 };
});
var Ma = {};
f(Ma, { _internal: () => Pg, body: () => Mg, collection: () => Dg, data: () => Eg, id: () => Ig, slug: () => Rg });
var Ig;
var Dg;
var Rg;
var Mg;
var Eg;
var Pg;
var Ea = m(() => {
  "use strict";
  Ig = "windows-azure-migration.mdx", Dg = "post", Rg = "windows-azure-migration", Mg = `
With any luck and having the stars aligned this post should appear on my blog hosted at Windows Azure.`, Eg = { title: "Windows Azure Migration", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: /* @__PURE__ */ new Date(1385634246e3) }, Pg = { type: "content", filePath: "/Users/serdar/dev/projects/my-astro-app/src/content/post/windows-azure-migration.mdx", rawData: void 0 };
});
var Pa = {};
f(Pa, { _internal: () => zg, body: () => Og, collection: () => Ug, data: () => Hg, id: () => Lg, slug: () => Ng });
var Lg;
var Ug;
var Ng;
var Og;
var Hg;
var zg;
var La = m(() => {
  "use strict";
  Lg = "zeldman.mdx", Ug = "post", Ng = "zeldman", Og = `
&lt;p&gt;This video is a must watch on how web design has evolved over the last 20 years or so. Amazingly, I\u2019m happy to have been involved with the web for 16 of those years (though no where near at the calibre of Zeldman).&lt;/p&gt; &lt;p&gt;&lt;iframe height="281" src="//player.vimeo.com/video/104641191" frameborder="0" width="500" allowfullscreen mozallowfullscreen webkitallowfullscreen&gt;&lt;/iframe&gt;&lt;/p&gt;`, Hg = { title: "Zeldman", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: /* @__PURE__ */ new Date(1411217277e3) }, zg = { type: "content", filePath: "/Users/serdar/dev/projects/my-astro-app/src/content/post/zeldman.mdx", rawData: void 0 };
});
var za = {};
f(za, { Content: () => Bt2, __usesAstroImage: () => Fg, default: () => Bt2, file: () => Bg, frontmatter: () => Na, getHeadings: () => Oa, url: () => Vg });
function Oa() {
  return [];
}
function Ua(e3) {
  let t = { a: "a", p: "p", ...e3.components };
  return p(t.p, { children: ["<p>November 30 for most web standard-istas represents <a href=\u201C", p(t.a, { href: "http://bluebeanieday.tumblr.com/post/103643267347/have-we-got-a-beanie-for-you%22&gt;Blue", children: "http://bluebeanieday.tumblr.com/post/103643267347/have-we-got-a-beanie-for-you\u201D&gt;Blue" }), " Beanie Day</a>, a showing of support to web standards. In recognition of this day my <a href=\u201C", p(t.a, { href: "https://twitter.com/serdar%22&gt;Twitter&lt;/a", children: "https://twitter.com/serdar\u201D&gt;Twitter&lt;/a" }), "> profile photo has been updated to show my support. Standards FTW!</p>"] });
}
function Ha(e3 = {}) {
  let { wrapper: t } = e3.components || {};
  return t ? p(t, { ...e3, children: p(Ua, { ...e3 }) }) : Ua(e3);
}
var Na;
var Fg;
var Vg;
var Bg;
var Bt2;
var Fa = m(() => {
  "use strict";
  P2();
  H();
  L();
  Na = { title: "Blue Beanie Day", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: "2014-11-29T20:03:24.000Z" };
  Fg = true;
  y(Oa, "astro:jsx");
  y(Ha, "astro:jsx");
  Vg = "src/content/post/blue-beanie-day.mdx", Bg = "/Users/serdar/dev/projects/my-astro-app/src/content/post/blue-beanie-day.mdx", Bt2 = (e3 = {}) => Ha({ ...e3, components: { Fragment: b, ...e3.components, "astro-image": e3.components?.img ?? k2 } });
  Bt2[Symbol.for("mdx-component")] = true;
  Bt2[Symbol.for("astro.needsHeadRendering")] = !Na.layout;
  Bt2.moduleId = "/Users/serdar/dev/projects/my-astro-app/src/content/post/blue-beanie-day.mdx";
});
var Va = {};
f(Va, { default: () => Xg });
async function Wg() {
  return Promise.resolve().then(() => (Fa(), za));
}
var Zg;
var qg;
var Gg;
var Xg;
var Ba = m(() => {
  "use strict";
  Zg = [], qg = [], Gg = [], Xg = { __astroPropagation: true, getMod: Wg, collectedLinks: Zg, collectedStyles: qg, collectedScripts: Gg };
});
var Xa = {};
f(Xa, { Content: () => Wt2, __usesAstroImage: () => Kg, default: () => Wt2, file: () => Jg, frontmatter: () => Za, getHeadings: () => qa, url: () => Yg });
function qa() {
  return [];
}
function Wa(e3) {
  let t = { a: "a", p: "p", ...e3.components };
  return p(t.p, { children: ["<p>Professional cycling has it\u2019s work cut out to improve its image that\u2019s been tarnished through rampant drug and illegal supplement abuse. Not a day goes by as I sift through my <a href=\u201C", p(t.a, { href: "http://www.cyclingnews.com/%22&gt;Cycling", children: "http://www.cyclingnews.com/\u201C&gt;Cycling" }), " News</a> feed that there isn\u2019t some mention of a pro cyclist that is coming off probation, . Lance, personally, was a huge disappointment.</p> <p>I still enjoy cycling as a sport and will continue to keep up with the pro-cycling races albeit with a slight scepticism when the winners step up to the podium.</p> <p>My Trek Madone that was <a href=\u201C", p(t.a, { href: "http://weblog.kilic.net/previously/2010/07/24/stolen_-_trek_madone_45_-_glenwood_nsw_area%22&gt;stolen-then-recovered&lt;/a", children: "http://weblog.kilic.net/previously/2010/07/24/stolen_-_trek_madone_45_-_glenwood_nsw_area\u201D&gt;stolen-then-recovered&lt;/a" }), "> is destined for a complete make-over, new wheels, new parts \u2013 this is going to be a side-project of mine to completely rebuild it. Should be fun!</p>"] });
}
function Ga(e3 = {}) {
  let { wrapper: t } = e3.components || {};
  return t ? p(t, { ...e3, children: p(Wa, { ...e3 }) }) : Wa(e3);
}
var Za;
var Kg;
var Yg;
var Jg;
var Wt2;
var Ka = m(() => {
  "use strict";
  P2();
  H();
  L();
  Za = { title: "Cycling", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: "2013-12-14T01:42:52.000Z" };
  Kg = true;
  y(qa, "astro:jsx");
  y(Ga, "astro:jsx");
  Yg = "src/content/post/cycling.mdx", Jg = "/Users/serdar/dev/projects/my-astro-app/src/content/post/cycling.mdx", Wt2 = (e3 = {}) => Ga({ ...e3, components: { Fragment: b, ...e3.components, "astro-image": e3.components?.img ?? k2 } });
  Wt2[Symbol.for("mdx-component")] = true;
  Wt2[Symbol.for("astro.needsHeadRendering")] = !Za.layout;
  Wt2.moduleId = "/Users/serdar/dev/projects/my-astro-app/src/content/post/cycling.mdx";
});
var Ya = {};
f(Ya, { default: () => sy });
async function Qg() {
  return Promise.resolve().then(() => (Ka(), Xa));
}
var ey;
var ty;
var ry;
var sy;
var Ja = m(() => {
  "use strict";
  ey = [], ty = [], ry = [], sy = { __astroPropagation: true, getMod: Qg, collectedLinks: ey, collectedStyles: ty, collectedScripts: ry };
});
var si = {};
f(si, { Content: () => Zt2, __usesAstroImage: () => ny, default: () => Zt2, file: () => ay, frontmatter: () => ei, getHeadings: () => ti, url: () => oy });
function ti() {
  return [];
}
function Qa(e3) {
  let t = { a: "a", p: "p", ...e3.components };
  return p(t.p, { children: ["A few of us at work got to renew our laptops and we\u2019ve all gone for the latest Dell M3800.<br /><br />Sporting a 3200x1800 (touch) display, 16GB RAM, and a 256GB SSD this is a beast of a machine to work with. Scott\u2019s post about <a href=\u201C", p(t.a, { href: "http://www.hanselman.com/blog/LivingAHighDPIDesktopLifestyleCanBePainful.aspx%22&gt;High-DPI", children: "http://www.hanselman.com/blog/LivingAHighDPIDesktopLifestyleCanBePainful.aspx\u201D&gt;High-DPI" }), " displays</a> couldn\u2019t have come at a better time, there\u2019s plenty of well written apps (Visual Studio 2013) and not some great ones.<br /><br />Being 15\u201D inches it\u2019s larger than what I would prefer but it tips the scale just a bit over 2kg - so it\u2019s going to be much more practical lugging it home each night.<br /><br />Since Microsoft removed the <a href=\u201C", p(t.a, { href: "http://www.neowin.net/news/windows-81-preview-removes-windows-experience-index%22&gt;windows", children: "http://www.neowin.net/news/windows-81-preview-removes-windows-experience-index\u201D&gt;windows" }), " experience index</a> from 8.1 there\u2019s no scoring of this unit, but the screen is really bright and startup times are one of the best I\u2019ve seen.<br />"] });
}
function ri(e3 = {}) {
  let { wrapper: t } = e3.components || {};
  return t ? p(t, { ...e3, children: p(Qa, { ...e3 }) }) : Qa(e3);
}
var ei;
var ny;
var oy;
var ay;
var Zt2;
var ni = m(() => {
  "use strict";
  P2();
  H();
  L();
  ei = { title: "Dell M3800", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: "2014-03-08T05:10:34.000Z" };
  ny = true;
  y(ti, "astro:jsx");
  y(ri, "astro:jsx");
  oy = "src/content/post/dell-m3800.mdx", ay = "/Users/serdar/dev/projects/my-astro-app/src/content/post/dell-m3800.mdx", Zt2 = (e3 = {}) => ri({ ...e3, components: { Fragment: b, ...e3.components, "astro-image": e3.components?.img ?? k2 } });
  Zt2[Symbol.for("mdx-component")] = true;
  Zt2[Symbol.for("astro.needsHeadRendering")] = !ei.layout;
  Zt2.moduleId = "/Users/serdar/dev/projects/my-astro-app/src/content/post/dell-m3800.mdx";
});
var oi = {};
f(oi, { default: () => py });
async function iy() {
  return Promise.resolve().then(() => (ni(), si));
}
var cy;
var ly;
var dy;
var py;
var ai = m(() => {
  "use strict";
  cy = [], ly = [], dy = [], py = { __astroPropagation: true, getMod: iy, collectedLinks: cy, collectedStyles: ly, collectedScripts: dy };
});
var pi = {};
f(pi, { Content: () => qt2, __usesAstroImage: () => uy, default: () => qt2, file: () => hy, frontmatter: () => ci, getHeadings: () => li, url: () => my });
function li() {
  return [];
}
function ii(e3) {
  let t = { p: "p", ...e3.components };
  return p(t.p, { children: "<p>Well it seems as though me tinkering with the CMS (MiniBlog) that runs this blog has made the posts giving a 404 error. I think it has something to do with the HttpCache not refreshing. Regardless, there will be a few oddities whilst I get things back in order around here.</p>" });
}
function di(e3 = {}) {
  let { wrapper: t } = e3.components || {};
  return t ? p(t, { ...e3, children: p(ii, { ...e3 }) }) : ii(e3);
}
var ci;
var uy;
var my;
var hy;
var qt2;
var ui = m(() => {
  "use strict";
  P2();
  H();
  L();
  ci = { title: "Excuse the updates", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: "2014-09-20T13:17:20.000Z" };
  uy = true;
  y(li, "astro:jsx");
  y(di, "astro:jsx");
  my = "src/content/post/excuse-the-updates.mdx", hy = "/Users/serdar/dev/projects/my-astro-app/src/content/post/excuse-the-updates.mdx", qt2 = (e3 = {}) => di({ ...e3, components: { Fragment: b, ...e3.components, "astro-image": e3.components?.img ?? k2 } });
  qt2[Symbol.for("mdx-component")] = true;
  qt2[Symbol.for("astro.needsHeadRendering")] = !ci.layout;
  qt2.moduleId = "/Users/serdar/dev/projects/my-astro-app/src/content/post/excuse-the-updates.mdx";
});
var mi = {};
f(mi, { default: () => vy });
async function fy() {
  return Promise.resolve().then(() => (ui(), pi));
}
var gy;
var yy;
var wy;
var vy;
var hi = m(() => {
  "use strict";
  gy = [], yy = [], wy = [], vy = { __astroPropagation: true, getMod: fy, collectedLinks: gy, collectedStyles: yy, collectedScripts: wy };
});
var vi = {};
f(vi, { Content: () => Gt2, __usesAstroImage: () => by, default: () => Gt2, file: () => _y, frontmatter: () => gi, getHeadings: () => yi, url: () => xy });
function yi() {
  return [];
}
function fi(e3) {
  let t = { a: "a", p: "p", ...e3.components };
  return p(t.p, { children: ["<p>A week or so ago my phone started buzzing with notifications from Twitter. I had a whole bunch of new followers (almost all from Turkey) and a <a href=\u201C", p(t.a, { href: "https://twitter.com/serdar/status/5669297%22&gt;tweet&lt;/a", children: "https://twitter.com/serdar/status/5669297\u201D&gt;tweet&lt;/a" }), "> that was favourited quite a few times. I didn\u2019t realise till I saw a tweet this evening as to why:</p> <blockquote lang=\u201Cen\u201D class=\u201Ctwitter-tweet\u201D> <p>Twitter\u2019da Fenerbah\xE7e ile ilgili at\u0131lan ilk tweet: <a href=\u201C", p(t.a, { href: "https://t.co/RtaPU1omzm%22&gt;https://t.co/RtaPU1omzm&lt;/a", children: "https://t.co/RtaPU1omzm\u201D&gt;https://t.co/RtaPU1omzm&lt;/a" }), "> Galatasaray ile ilgili at\u0131lan ilk tweet: <a href=\u201C", p(t.a, { href: "https://t.co/J3mXSUZ7VF%22&gt;https://t.co/J3mXSUZ7VF&lt;/a&gt;&lt;/p&gt;%E2%80%94", children: "https://t.co/J3mXSUZ7VF\u201D&gt;https://t.co/J3mXSUZ7VF&lt;/a&gt;&lt;/p&gt;\u2014" }), " An\u0131l G\xFCler (@anilgulerr) <a href=\u201C", p(t.a, { href: "https://twitter.com/anilgulerr/status/537624302192164864%22&gt;November", children: "https://twitter.com/anilgulerr/status/537624302192164864\u201D&gt;November" }), " 26, 2014</a></blockquote><script async src=\u201C//platform.twitter.com/widgets.js\u201D charset=\u201Cutf-8\u201D><\/script>Translating to English it basically reads that that my tweet was the first mention of <a href=\u201C", p(t.a, { href: "http://www.galatasaray.org/en/%22&gt;Galatasaray&lt;/a", children: "http://www.galatasaray.org/en/\u201D&gt;Galatasaray&lt;/a" }), "> on Twitter. Nice!"] });
}
function wi(e3 = {}) {
  let { wrapper: t } = e3.components || {};
  return t ? p(t, { ...e3, children: p(fi, { ...e3 }) }) : fi(e3);
}
var gi;
var by;
var xy;
var _y;
var Gt2;
var bi = m(() => {
  "use strict";
  P2();
  H();
  L();
  gi = { title: "Galatasaray", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: "2014-11-28T09:17:44.000Z" };
  by = true;
  y(yi, "astro:jsx");
  y(wi, "astro:jsx");
  xy = "src/content/post/galatasaray.mdx", _y = "/Users/serdar/dev/projects/my-astro-app/src/content/post/galatasaray.mdx", Gt2 = (e3 = {}) => wi({ ...e3, components: { Fragment: b, ...e3.components, "astro-image": e3.components?.img ?? k2 } });
  Gt2[Symbol.for("mdx-component")] = true;
  Gt2[Symbol.for("astro.needsHeadRendering")] = !gi.layout;
  Gt2.moduleId = "/Users/serdar/dev/projects/my-astro-app/src/content/post/galatasaray.mdx";
});
var xi = {};
f(xi, { default: () => Cy });
async function ky() {
  return Promise.resolve().then(() => (bi(), vi));
}
var Sy;
var jy;
var Ay;
var Cy;
var _i2 = m(() => {
  "use strict";
  Sy = [], jy = [], Ay = [], Cy = { __astroPropagation: true, getMod: ky, collectedLinks: Sy, collectedStyles: jy, collectedScripts: Ay };
});
var Ci = {};
f(Ci, { Content: () => Xt2, __usesAstroImage: () => Ty, default: () => Xt2, file: () => Iy, frontmatter: () => Si, getHeadings: () => ji, url: () => $y });
function ji() {
  return [];
}
function ki(e3) {
  let t = { a: "a", p: "p", ...e3.components };
  return p(t.p, { children: ["<p>I recently re-subscribed to the New York Times after offering a 12-week access for only USD$0.99, can\u2019t beat that \u2013 I\u2019ll decide later if I\u2019ll keep my subscription at the end of the program. However for those NY Times readers who live outside of the US and running Windows 8/8.1 you might have a hard time getting the app to launch.</p> <p>Installation is quick and straightforward from the app store but upon launching the app you\u2019ll be greeted with the following splash screen along with the rotating progress bar (which doesn\u2019t get captured using the print screen button).</p> <p><img title=\u201Cnytimes-loading\u201D style=\u201Cborder-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px\u201D border=\u201C0\u201D alt=\u201Cnytimes-loading\u201D src=\u201C", p(t.a, { href: "http://kilic.net/images/2013/12/nytimes-loading.png%22&gt;&lt;/p", children: "http://kilic.net/images/2013/12/nytimes-loading.png\u201D&gt;&lt;/p" }), "> <p>So I fired up Fiddler 2 to see what\u2019s going on behind the scenes and found this little nugget. Notice that the url contains the region and language code that\u2019s set for my PC.</p> <p><img title=\u201Cnytimes-404\u201D style=\u201Cborder-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px\u201D border=\u201C0\u201D alt=\u201Cnytimes-404\u201D src=\u201C", p(t.a, { href: "http://kilic.net/images/2013/12/nytimes-404.png%22&gt;&lt;/p", children: "http://kilic.net/images/2013/12/nytimes-404.png\u201D&gt;&lt;/p" }), "> <p>I then grabbed the URL and modified the region-language to be <em>en-us</em> and sure enough I got a valid JSON response in return.</p> <p>Now to get this working without some URL hack one needs to simply change the home location via region settings to be US. Of course you may not want to do this as it may affect other sites but as a quick measure to grab your news this little hack seems to get around the problem.</p> <p><img title=\u201Cregion-nytimes-location-us\u201D style=\u201Cborder-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px\u201D border=\u201C0\u201D alt=\u201Cregion-nytimes-location-us\u201D src=\u201C", p(t.a, { href: "http://kilic.net/images/2013/12/region-nytimes-location-us.png%22&gt;&lt;/p", children: "http://kilic.net/images/2013/12/region-nytimes-location-us.png\u201D&gt;&lt;/p" }), ">"] });
}
function Ai(e3 = {}) {
  let { wrapper: t } = e3.components || {};
  return t ? p(t, { ...e3, children: p(ki, { ...e3 }) }) : ki(e3);
}
var Si;
var Ty;
var $y;
var Iy;
var Xt2;
var Ti = m(() => {
  "use strict";
  P2();
  H();
  L();
  Si = { title: "Getting the New York Times app working in Windows 8", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: "2013-12-31T06:03:56.000Z" };
  Ty = true;
  y(ji, "astro:jsx");
  y(Ai, "astro:jsx");
  $y = "src/content/post/getting-the-new-york-times-app-working-in-windows-8.mdx", Iy = "/Users/serdar/dev/projects/my-astro-app/src/content/post/getting-the-new-york-times-app-working-in-windows-8.mdx", Xt2 = (e3 = {}) => Ai({ ...e3, components: { Fragment: b, ...e3.components, "astro-image": e3.components?.img ?? k2 } });
  Xt2[Symbol.for("mdx-component")] = true;
  Xt2[Symbol.for("astro.needsHeadRendering")] = !Si.layout;
  Xt2.moduleId = "/Users/serdar/dev/projects/my-astro-app/src/content/post/getting-the-new-york-times-app-working-in-windows-8.mdx";
});
var $i = {};
f($i, { default: () => Py });
async function Dy() {
  return Promise.resolve().then(() => (Ti(), Ci));
}
var Ry;
var My;
var Ey;
var Py;
var Ii = m(() => {
  "use strict";
  Ry = [], My = [], Ey = [], Py = { __astroPropagation: true, getMod: Dy, collectedLinks: Ry, collectedStyles: My, collectedScripts: Ey };
});
var Pi = {};
f(Pi, { Content: () => Kt2, __usesAstroImage: () => Ly, default: () => Kt2, file: () => Ny, frontmatter: () => Ri, getHeadings: () => Mi, url: () => Uy });
function Mi() {
  return [];
}
function Di(e3) {
  let t = { a: "a", p: "p", ...e3.components };
  return p(t.p, { children: ["<p>Sad to see these guys fold up shop, I\u2019ve enjoyed several of their titles throughout the years and was looking forward to Bolton\u2019s grid book.</p><p>Their <a href=\u201C", p(t.a, { href: "http://www.fivesimplesteps.com/%22&gt;farewell", children: "http://www.fivesimplesteps.com/\u201C&gt;farewell" }), " statement.</a></p>"] });
}
function Ei(e3 = {}) {
  let { wrapper: t } = e3.components || {};
  return t ? p(t, { ...e3, children: p(Di, { ...e3 }) }) : Di(e3);
}
var Ri;
var Ly;
var Uy;
var Ny;
var Kt2;
var Li = m(() => {
  "use strict";
  P2();
  H();
  L();
  Ri = { title: "Goodbye Five Simple Steps", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: "2014-04-18T13:31:59.000Z" };
  Ly = true;
  y(Mi, "astro:jsx");
  y(Ei, "astro:jsx");
  Uy = "src/content/post/goodbye-five-simple-steps.mdx", Ny = "/Users/serdar/dev/projects/my-astro-app/src/content/post/goodbye-five-simple-steps.mdx", Kt2 = (e3 = {}) => Ei({ ...e3, components: { Fragment: b, ...e3.components, "astro-image": e3.components?.img ?? k2 } });
  Kt2[Symbol.for("mdx-component")] = true;
  Kt2[Symbol.for("astro.needsHeadRendering")] = !Ri.layout;
  Kt2.moduleId = "/Users/serdar/dev/projects/my-astro-app/src/content/post/goodbye-five-simple-steps.mdx";
});
var Ui = {};
f(Ui, { default: () => Vy });
async function Oy() {
  return Promise.resolve().then(() => (Li(), Pi));
}
var Hy;
var zy;
var Fy;
var Vy;
var Ni = m(() => {
  "use strict";
  Hy = [], zy = [], Fy = [], Vy = { __astroPropagation: true, getMod: Oy, collectedLinks: Hy, collectedStyles: zy, collectedScripts: Fy };
});
var Vi = {};
f(Vi, { Content: () => Yt2, __usesAstroImage: () => By, default: () => Yt2, file: () => Zy, frontmatter: () => Hi, getHeadings: () => zi, url: () => Wy });
function zi() {
  return [];
}
function Oi(e3) {
  let t = { a: "a", p: "p", ...e3.components };
  return p(t.p, { children: ["<a href=\u201C", p(t.a, { href: "https://plus.google.com/110854991323348293549", children: "https://plus.google.com/110854991323348293549" }), "\u201D rel=\u201Cpublisher\u201D>Google+</a>"] });
}
function Fi(e3 = {}) {
  let { wrapper: t } = e3.components || {};
  return t ? p(t, { ...e3, children: p(Oi, { ...e3 }) }) : Oi(e3);
}
var Hi;
var By;
var Wy;
var Zy;
var Yt2;
var Bi = m(() => {
  "use strict";
  P2();
  H();
  L();
  Hi = { title: "Google+ Test Post", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: "2014-05-17 03:18:5" };
  By = true;
  y(zi, "astro:jsx");
  y(Fi, "astro:jsx");
  Wy = "src/content/post/google-test-post.mdx", Zy = "/Users/serdar/dev/projects/my-astro-app/src/content/post/google-test-post.mdx", Yt2 = (e3 = {}) => Fi({ ...e3, components: { Fragment: b, ...e3.components, "astro-image": e3.components?.img ?? k2 } });
  Yt2[Symbol.for("mdx-component")] = true;
  Yt2[Symbol.for("astro.needsHeadRendering")] = !Hi.layout;
  Yt2.moduleId = "/Users/serdar/dev/projects/my-astro-app/src/content/post/google-test-post.mdx";
});
var Wi = {};
f(Wi, { default: () => Yy });
async function qy() {
  return Promise.resolve().then(() => (Bi(), Vi));
}
var Gy;
var Xy;
var Ky;
var Yy;
var Zi = m(() => {
  "use strict";
  Gy = [], Xy = [], Ky = [], Yy = { __astroPropagation: true, getMod: qy, collectedLinks: Gy, collectedStyles: Xy, collectedScripts: Ky };
});
var Yi = {};
f(Yi, { Content: () => Jt2, __usesAstroImage: () => Jy, default: () => Jt2, file: () => ew, frontmatter: () => Gi, getHeadings: () => Xi, url: () => Qy });
function Xi() {
  return [];
}
function qi(e3) {
  let t = { p: "p", ...e3.components };
  return p(t.p, { children: "<p>At long last the day has come, well, will come, on the 13th September 2014 the day that I graduate from Southern Cross University with a Bachelor of Information Technology degree. It\u2019s more of a relief than excitement right now, but I\u2019m sure once I hold my testamur in my hand it will be sheer joy.</p>" });
}
function Ki(e3 = {}) {
  let { wrapper: t } = e3.components || {};
  return t ? p(t, { ...e3, children: p(qi, { ...e3 }) }) : qi(e3);
}
var Gi;
var Jy;
var Qy;
var ew;
var Jt2;
var Ji = m(() => {
  "use strict";
  P2();
  H();
  L();
  Gi = { title: "Graduation", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: "2014-06-22T05:29:00.000Z" };
  Jy = true;
  y(Xi, "astro:jsx");
  y(Ki, "astro:jsx");
  Qy = "src/content/post/graduation.mdx", ew = "/Users/serdar/dev/projects/my-astro-app/src/content/post/graduation.mdx", Jt2 = (e3 = {}) => Ki({ ...e3, components: { Fragment: b, ...e3.components, "astro-image": e3.components?.img ?? k2 } });
  Jt2[Symbol.for("mdx-component")] = true;
  Jt2[Symbol.for("astro.needsHeadRendering")] = !Gi.layout;
  Jt2.moduleId = "/Users/serdar/dev/projects/my-astro-app/src/content/post/graduation.mdx";
});
var Qi = {};
f(Qi, { default: () => ow });
async function tw() {
  return Promise.resolve().then(() => (Ji(), Yi));
}
var rw;
var sw;
var nw;
var ow;
var ec = m(() => {
  "use strict";
  rw = [], sw = [], nw = [], ow = { __astroPropagation: true, getMod: tw, collectedLinks: rw, collectedStyles: sw, collectedScripts: nw };
});
var oc = {};
f(oc, { Content: () => Qt2, __usesAstroImage: () => aw, default: () => Qt2, file: () => cw, frontmatter: () => rc, getHeadings: () => sc, url: () => iw });
function sc() {
  return [];
}
function tc(e3) {
  let t = { a: "a", p: "p", ...e3.components };
  return p(t.p, { children: ["<p>It\u2019s been 9 years since Microformats were conceived, and whilst we don\u2019t talk about it as much these days it\u2019s reassuring to see the effort and development continue. There\u2019s more info at this <a href=\u201C", p(t.a, { href: "http://microformats.org/2014/06/20/microformats-org-turns-9-upgrade-to-microformats2%22&gt;blog", children: "http://microformats.org/2014/06/20/microformats-org-turns-9-upgrade-to-microformats2\u201D&gt;blog" }), " post</a> at <a href=\u201C", p(t.a, { href: "http://microformats.org%22&gt;microformats.org&lt;/a&gt;.&lt;/p", children: "http://microformats.org\u201D&gt;microformats.org&lt;/a&gt;.&lt;/p" }), ">"] });
}
function nc(e3 = {}) {
  let { wrapper: t } = e3.components || {};
  return t ? p(t, { ...e3, children: p(tc, { ...e3 }) }) : tc(e3);
}
var rc;
var aw;
var iw;
var cw;
var Qt2;
var ac = m(() => {
  "use strict";
  P2();
  H();
  L();
  rc = { title: "Happy Birthday Microformats", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: "2014-06-24T03:39:18.000Z" };
  aw = true;
  y(sc, "astro:jsx");
  y(nc, "astro:jsx");
  iw = "src/content/post/happy-birthday-microformats.mdx", cw = "/Users/serdar/dev/projects/my-astro-app/src/content/post/happy-birthday-microformats.mdx", Qt2 = (e3 = {}) => nc({ ...e3, components: { Fragment: b, ...e3.components, "astro-image": e3.components?.img ?? k2 } });
  Qt2[Symbol.for("mdx-component")] = true;
  Qt2[Symbol.for("astro.needsHeadRendering")] = !rc.layout;
  Qt2.moduleId = "/Users/serdar/dev/projects/my-astro-app/src/content/post/happy-birthday-microformats.mdx";
});
var ic = {};
f(ic, { default: () => mw });
async function lw() {
  return Promise.resolve().then(() => (ac(), oc));
}
var dw;
var pw;
var uw;
var mw;
var cc = m(() => {
  "use strict";
  dw = [], pw = [], uw = [], mw = { __astroPropagation: true, getMod: lw, collectedLinks: dw, collectedStyles: pw, collectedScripts: uw };
});
var mc = {};
f(mc, { Content: () => er2, __usesAstroImage: () => hw, default: () => er2, file: () => gw, frontmatter: () => dc, getHeadings: () => pc, url: () => fw });
function pc() {
  return [];
}
function lc(e3) {
  let t = { p: "p", ...e3.components };
  return p(t.p, { children: "A single yearly post is becoming tradition, one that I\u2019m not too fond of TBH. Much prefer to build the tools then to write about them I suppose. :)" });
}
function uc(e3 = {}) {
  let { wrapper: t } = e3.components || {};
  return t ? p(t, { ...e3, children: p(lc, { ...e3 }) }) : lc(e3);
}
var dc;
var hw;
var fw;
var gw;
var er2;
var hc = m(() => {
  "use strict";
  P2();
  H();
  L();
  dc = { title: "Is this still on 2020 edition", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: "2020-07-07 11:45:46 AM" };
  hw = true;
  y(pc, "astro:jsx");
  y(uc, "astro:jsx");
  fw = "src/content/post/is-this-still-on-2020-edition.mdx", gw = "/Users/serdar/dev/projects/my-astro-app/src/content/post/is-this-still-on-2020-edition.mdx", er2 = (e3 = {}) => uc({ ...e3, components: { Fragment: b, ...e3.components, "astro-image": e3.components?.img ?? k2 } });
  er2[Symbol.for("mdx-component")] = true;
  er2[Symbol.for("astro.needsHeadRendering")] = !dc.layout;
  er2.moduleId = "/Users/serdar/dev/projects/my-astro-app/src/content/post/is-this-still-on-2020-edition.mdx";
});
var fc = {};
f(fc, { default: () => xw });
async function yw() {
  return Promise.resolve().then(() => (hc(), mc));
}
var ww;
var vw;
var bw;
var xw;
var gc = m(() => {
  "use strict";
  ww = [], vw = [], bw = [], xw = { __astroPropagation: true, getMod: yw, collectedLinks: ww, collectedStyles: vw, collectedScripts: bw };
});
var xc = {};
f(xc, { Content: () => tr2, __usesAstroImage: () => _w, default: () => tr2, file: () => Sw, frontmatter: () => wc, getHeadings: () => vc, url: () => kw });
function vc() {
  return [];
}
function yc(e3) {
  let t = { p: "p", ...e3.components };
  return p(t.p, { children: "Yes, yes it is.<br /><br />Time to start publishing again, locally.<br />" });
}
function bc(e3 = {}) {
  let { wrapper: t } = e3.components || {};
  return t ? p(t, { ...e3, children: p(yc, { ...e3 }) }) : yc(e3);
}
var wc;
var _w;
var kw;
var Sw;
var tr2;
var _c2 = m(() => {
  "use strict";
  P2();
  H();
  L();
  wc = { title: "Is this thing still on?", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: "2019-01-01T13:02:26.000Z" };
  _w = true;
  y(vc, "astro:jsx");
  y(bc, "astro:jsx");
  kw = "src/content/post/is-this-thing-still-on.mdx", Sw = "/Users/serdar/dev/projects/my-astro-app/src/content/post/is-this-thing-still-on.mdx", tr2 = (e3 = {}) => bc({ ...e3, components: { Fragment: b, ...e3.components, "astro-image": e3.components?.img ?? k2 } });
  tr2[Symbol.for("mdx-component")] = true;
  tr2[Symbol.for("astro.needsHeadRendering")] = !wc.layout;
  tr2.moduleId = "/Users/serdar/dev/projects/my-astro-app/src/content/post/is-this-thing-still-on.mdx";
});
var kc = {};
f(kc, { default: () => $w });
async function jw() {
  return Promise.resolve().then(() => (_c2(), xc));
}
var Aw;
var Cw;
var Tw;
var $w;
var Sc = m(() => {
  "use strict";
  Aw = [], Cw = [], Tw = [], $w = { __astroPropagation: true, getMod: jw, collectedLinks: Aw, collectedStyles: Cw, collectedScripts: Tw };
});
var $c = {};
f($c, { Content: () => rr2, __usesAstroImage: () => Iw, default: () => rr2, file: () => Rw, frontmatter: () => Ac, getHeadings: () => Cc, url: () => Dw });
function Cc() {
  return [];
}
function jc(e3) {
  let t = { p: "p", ...e3.components };
  return p(b, { children: [p(t.p, { children: "I\u2019ve started tweaking some aspects of this weblog, starting with a refresh of the logo. The current design (which is been with me for several years now) looks dated, low quality, and a bit uninspiring. I\u2019m a developer first! You can see transition of the old to new logo in the image below:" }), `
`, p("a", { title: "kilic.net logo - previous by Serdar Kilic, on Flickr", href: "https://www.flickr.com/photos/serdar/15756872787", children: p("img", { alt: "kilic.net logo - previous", src: "https://farm8.staticflickr.com/7487/15756872787_d9a27353d0.jpg", width: "500", height: "308" }) }), `
`, p(t.p, { children: "&nbsp;" }), `
`, p(t.p, { children: "The new logo has dropped the border around the icon, introduced a modified colour palette, and also introduced a transparency gradient originating from the top-left corner to the bottom-right corner." }), `
`, p(t.p, { children: ["As any web developer would know, you just don\u2019t have a single icon these days. With such vast array of platforms these days they have their own way of displaying \u201Cfavourite\u201D icons. As of now, I\u2019ve specified a good old Web 1.0 ", p("a", { href: "http://kilic.net/favicon.ico", children: "favicon.ico" }), ", an iPhone icon (using the apple-touch-icon meta tag) and also for the Windows 8.1 devices, a whole range of logo sizes to suite the Live Tiles format. The Windows 8.1 icons are specified in my ", p("a", { href: "http://kilic.net/browserconfig.xml", children: "browserconfig.xml" }), " file that\u2019s referenced via an msapplication-config meta tag on this page."] })] });
}
function Tc(e3 = {}) {
  let { wrapper: t } = e3.components || {};
  return t ? p(t, { ...e3, children: p(jc, { ...e3 }) }) : jc(e3);
}
var Ac;
var Iw;
var Dw;
var Rw;
var rr2;
var Ic = m(() => {
  "use strict";
  P2();
  H();
  L();
  Ac = { title: "kilic.net logo", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: "2014-12-04T04:18:05.000Z" };
  Iw = true;
  y(Cc, "astro:jsx");
  y(Tc, "astro:jsx");
  Dw = "src/content/post/kilic.net-logo.mdx", Rw = "/Users/serdar/dev/projects/my-astro-app/src/content/post/kilic.net-logo.mdx", rr2 = (e3 = {}) => Tc({ ...e3, components: { Fragment: b, ...e3.components, "astro-image": e3.components?.img ?? k2 } });
  rr2[Symbol.for("mdx-component")] = true;
  rr2[Symbol.for("astro.needsHeadRendering")] = !Ac.layout;
  rr2.moduleId = "/Users/serdar/dev/projects/my-astro-app/src/content/post/kilic.net-logo.mdx";
});
var Dc = {};
f(Dc, { default: () => Uw });
async function Mw() {
  return Promise.resolve().then(() => (Ic(), $c));
}
var Ew;
var Pw;
var Lw;
var Uw;
var Rc = m(() => {
  "use strict";
  Ew = [], Pw = [], Lw = [], Uw = { __astroPropagation: true, getMod: Mw, collectedLinks: Ew, collectedStyles: Pw, collectedScripts: Lw };
});
var Uc = {};
f(Uc, { Content: () => sr2, __usesAstroImage: () => Nw, default: () => sr2, file: () => Hw, frontmatter: () => Ec, getHeadings: () => Pc, url: () => Ow });
function Pc() {
  return [];
}
function Mc(e3) {
  let t = { p: "p", ...e3.components };
  return p(b, { children: [p(t.p, { children: "Been working on this for a short while now, a new design, a new more modern blogging system\u2026 It\u2019s been a blast working on the new site, the design is almost complete with only a few more pages left to build out." }), `
`, p(t.p, { children: "Once the system build is complete I\u2019ll outline how I went about the design and the build." }), `
`, p("img", { src: "//cdn.kilic.net/posts/files/49a7295e-0a74-4606-9db6-6f14a5c393b2.png", alt: "" })] });
}
function Lc(e3 = {}) {
  let { wrapper: t } = e3.components || {};
  return t ? p(t, { ...e3, children: p(Mc, { ...e3 }) }) : Mc(e3);
}
var Ec;
var Nw;
var Ow;
var Hw;
var sr2;
var Nc = m(() => {
  "use strict";
  P2();
  H();
  L();
  Ec = { title: "knet-v22", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: "2022-09-13 9:39:18 AM" };
  Nw = true;
  y(Pc, "astro:jsx");
  y(Lc, "astro:jsx");
  Ow = "src/content/post/knet-v2.mdx", Hw = "/Users/serdar/dev/projects/my-astro-app/src/content/post/knet-v2.mdx", sr2 = (e3 = {}) => Lc({ ...e3, components: { Fragment: b, ...e3.components, "astro-image": e3.components?.img ?? k2 } });
  sr2[Symbol.for("mdx-component")] = true;
  sr2[Symbol.for("astro.needsHeadRendering")] = !Ec.layout;
  sr2.moduleId = "/Users/serdar/dev/projects/my-astro-app/src/content/post/knet-v2.mdx";
});
var Oc = {};
f(Oc, { default: () => Ww });
async function zw() {
  return Promise.resolve().then(() => (Nc(), Uc));
}
var Fw;
var Vw;
var Bw;
var Ww;
var Hc = m(() => {
  "use strict";
  Fw = [], Vw = [], Bw = [], Ww = { __astroPropagation: true, getMod: zw, collectedLinks: Fw, collectedStyles: Vw, collectedScripts: Bw };
});
var Wc = {};
f(Wc, { Content: () => nr2, __usesAstroImage: () => Zw, default: () => nr2, file: () => Gw, frontmatter: () => Fc, getHeadings: () => Vc, url: () => qw });
function Vc() {
  return [];
}
function zc(e3) {
  let t = { p: "p", ...e3.components };
  return p(t.p, { children: "<p>Whilst waiting on the mrs for I popped in to the local JB Hi Fi stored to have a look at the new Lenovo Miix 2 8\u201D Windows tablet (say that ten times fast!). After reading great reviews about this device\xA0I really thought this might fill the lack of a similarly speced Surface tablet.</p><p>Unfortunately, what most reviews fail to state is that there\u2019s only 9GB of user storage space left (on a 32 GB device), and this is without Office 2013 installed! I had\xA0a look to see if there was any bloat ware that could be removed and there isn\u2019t much space that can be saved on this device - so they\u2019re running pretty lean already.</p><p>So if you are in the market for a Windows tablet before you swipe that credit card have\xA0a quick peek at what storage space is actually available. You may be surprised.</p>" });
}
function Bc(e3 = {}) {
  let { wrapper: t } = e3.components || {};
  return t ? p(t, { ...e3, children: p(zc, { ...e3 }) }) : zc(e3);
}
var Fc;
var Zw;
var qw;
var Gw;
var nr2;
var Zc = m(() => {
  "use strict";
  P2();
  H();
  L();
  Fc = { title: "Lenovo Miix 2", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: "2013-12-30T10:28:13.000Z" };
  Zw = true;
  y(Vc, "astro:jsx");
  y(Bc, "astro:jsx");
  qw = "src/content/post/lenovo-miix-2.mdx", Gw = "/Users/serdar/dev/projects/my-astro-app/src/content/post/lenovo-miix-2.mdx", nr2 = (e3 = {}) => Bc({ ...e3, components: { Fragment: b, ...e3.components, "astro-image": e3.components?.img ?? k2 } });
  nr2[Symbol.for("mdx-component")] = true;
  nr2[Symbol.for("astro.needsHeadRendering")] = !Fc.layout;
  nr2.moduleId = "/Users/serdar/dev/projects/my-astro-app/src/content/post/lenovo-miix-2.mdx";
});
var qc = {};
f(qc, { default: () => Qw });
async function Xw() {
  return Promise.resolve().then(() => (Zc(), Wc));
}
var Kw;
var Yw;
var Jw;
var Qw;
var Gc = m(() => {
  "use strict";
  Kw = [], Yw = [], Jw = [], Qw = { __astroPropagation: true, getMod: Xw, collectedLinks: Kw, collectedStyles: Yw, collectedScripts: Jw };
});
var Qc = {};
f(Qc, { Content: () => or2, __usesAstroImage: () => ev, default: () => or2, file: () => rv, frontmatter: () => Kc, getHeadings: () => Yc, url: () => tv });
function Yc() {
  return [];
}
function Xc(e3) {
  let t = { a: "a", p: "p", ...e3.components };
  return p(t.p, { children: ["<p>I don\u2019t read <a href=\u201C", p(t.a, { href: "http://paulgraham.com/index.html%22&gt;Paul", children: "http://paulgraham.com/index.html\u201D&gt;Paul" }), " Graham</a> as often as I should, to read not because of his startup super-star status, but for his insights into the world of <a href=\u201C", p(t.a, { href: "http://paulgraham.com/articles.html%22&gt;startups&lt;/a", children: "http://paulgraham.com/articles.html\u201D&gt;startups&lt;/a" }), ">. His latest article, <a href=\u201C", p(t.a, { href: "http://paulgraham.com/mean.html%22&gt;Mean", children: "http://paulgraham.com/mean.html\u201D&gt;Mean" }), " People Fail</a>, flies right into the face of the age old <a href=\u201C", p(t.a, { href: "http://en.wikipedia.org/wiki/Aphorism%22&gt;aphorism&lt;/a", children: "http://en.wikipedia.org/wiki/Aphorism\u201D&gt;aphorism&lt;/a" }), "> \u201C<a href=\u201C", p(t.a, { href: "http://en.wikipedia.org/wiki/Nice_guy#The_.22nice_guys_finish_last.22_view%22&gt;nice", children: "http://en.wikipedia.org/wiki/Nice_guy#The_.22nice_guys_finish_last.22_view\u201D&gt;nice" }), " guys finish last</a>\u201D. Well worth your time today to go have a read.</p>"] });
}
function Jc(e3 = {}) {
  let { wrapper: t } = e3.components || {};
  return t ? p(t, { ...e3, children: p(Xc, { ...e3 }) }) : Xc(e3);
}
var Kc;
var ev;
var tv;
var rv;
var or2;
var el = m(() => {
  "use strict";
  P2();
  H();
  L();
  Kc = { title: "Mean People", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: "2014-11-29T19:44:11.000Z" };
  ev = true;
  y(Yc, "astro:jsx");
  y(Jc, "astro:jsx");
  tv = "src/content/post/mean-people.mdx", rv = "/Users/serdar/dev/projects/my-astro-app/src/content/post/mean-people.mdx", or2 = (e3 = {}) => Jc({ ...e3, components: { Fragment: b, ...e3.components, "astro-image": e3.components?.img ?? k2 } });
  or2[Symbol.for("mdx-component")] = true;
  or2[Symbol.for("astro.needsHeadRendering")] = !Kc.layout;
  or2.moduleId = "/Users/serdar/dev/projects/my-astro-app/src/content/post/mean-people.mdx";
});
var tl = {};
f(tl, { default: () => iv });
async function sv() {
  return Promise.resolve().then(() => (el(), Qc));
}
var nv;
var ov;
var av;
var iv;
var rl = m(() => {
  "use strict";
  nv = [], ov = [], av = [], iv = { __astroPropagation: true, getMod: sv, collectedLinks: nv, collectedStyles: ov, collectedScripts: av };
});
var il = {};
f(il, { Content: () => ar2, __usesAstroImage: () => cv, default: () => ar2, file: () => dv, frontmatter: () => nl, getHeadings: () => ol, url: () => lv });
function ol() {
  return [];
}
function sl(e3) {
  let t = { a: "a", p: "p", ...e3.components };
  return p(t.p, { children: ["<p>When my original keyboard loss some functionality (it had a missing key on the number pad and both Windows keys stopped working) after being in the hands of my 3 year old, it was time to search for a replacement.  <p>I came across <a href=\u201C", p(t.a, { href: "http://www.istartedsomething.com/20131012/microsoft-sculpt-ergonomic-desktop-falling-in-love-with-ergonomics-again/%22&gt;Long", children: "http://www.istartedsomething.com/20131012/microsoft-sculpt-ergonomic-desktop-falling-in-love-with-ergonomics-again/\u201C&gt;Long" }), " Zheng\u2019s article</a> about the <a href=\u201C", p(t.a, { href: "http://www.microsoft.com/hardware/en-us/p/sculpt-ergonomic-desktop%22&gt;Microsoft", children: "http://www.microsoft.com/hardware/en-us/p/sculpt-ergonomic-desktop\u201D&gt;Microsoft" }), " Sculpt Ergonomic Desktop</a>, I thought it looked pretty cool, and having been a previous owner of a Microsoft ergo keyboard I thought I\u2019d give it another try.  <p>The desktop consists of the keyboard, mouse, an external number pad, and a \u201Craiser\u201D that makes the keyboard sit a bit higher. All input devices come with Duracell batteries. Oddly, the keyboard takes two AAA batteries whilst the mouse takes two AA batteries - I thought it would have been the other way around as this makes the mouse a bit heavier on the desk and thus restricts movement.  <p>The standout of the package is most definitely the keyboard, after using my Razer Lycos with the soft rubber keys, it\u2019s going to take some time to get use to the more typical finish on the Sculpt keyboard. The travel is pretty short on the keys but it feels really good and responsive, my favourite keyboard still being the one on my Lenovo X1 Carbon. They sure know how to put a great keyboard on their laptops!  <p>The mouse is a different story, whilst the movement is precise its physical size is massive - my current breed of mice is the Logitech Anywhere MX which is quite small so it\u2019s a big difference to the Sculpt mouse. After about 30 minutes of use my wrist started to hurt, and apparently there\u2019s a right way to hold it as depicted in one of the booklets you get with it. I\u2019m going to need to give it more time to get comfortable with it. Here\u2019s a <a title=\u201CLogitech Anywhere MX vs Microsoft Ergonomic Sculpt by Serdar Kilic, on Flickr\u201D href=\u201C", p(t.a, { href: "http://www.flickr.com/photos/serdar/11351801796%22&gt;size", children: "http://www.flickr.com/photos/serdar/11351801796\u201D&gt;size" }), " comparison</a> between the two mice.  <p>I inserted the USB receiver (yep, it\u2019s not Bluetooth, it\u2019s <em>Bluetrack</em>!) to the back USB port on my PC that sits below my desk, and both mouse and keyboard had absolutely no problems finding it to get them working. Great stuff!  <p>Finally, would I recommend this? Absolutely - but give the mouse a try to see if it is to your liking, especially if you\u2019re not use to larger mice.</p>"] });
}
function al(e3 = {}) {
  let { wrapper: t } = e3.components || {};
  return t ? p(t, { ...e3, children: p(sl, { ...e3 }) }) : sl(e3);
}
var nl;
var cv;
var lv;
var dv;
var ar2;
var cl = m(() => {
  "use strict";
  P2();
  H();
  L();
  nl = { title: "Microsoft Sculpt Ergonomic Desktop", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: "2013-12-13T12:09:00.000Z" };
  cv = true;
  y(ol, "astro:jsx");
  y(al, "astro:jsx");
  lv = "src/content/post/microsoft-sculpt-ergonomic-desktop.mdx", dv = "/Users/serdar/dev/projects/my-astro-app/src/content/post/microsoft-sculpt-ergonomic-desktop.mdx", ar2 = (e3 = {}) => al({ ...e3, components: { Fragment: b, ...e3.components, "astro-image": e3.components?.img ?? k2 } });
  ar2[Symbol.for("mdx-component")] = true;
  ar2[Symbol.for("astro.needsHeadRendering")] = !nl.layout;
  ar2.moduleId = "/Users/serdar/dev/projects/my-astro-app/src/content/post/microsoft-sculpt-ergonomic-desktop.mdx";
});
var ll = {};
f(ll, { default: () => fv });
async function pv() {
  return Promise.resolve().then(() => (cl(), il));
}
var uv;
var mv;
var hv;
var fv;
var dl = m(() => {
  "use strict";
  uv = [], mv = [], hv = [], fv = { __astroPropagation: true, getMod: pv, collectedLinks: uv, collectedStyles: mv, collectedScripts: hv };
});
var fl = {};
f(fl, { Content: () => ir2, __usesAstroImage: () => gv, default: () => ir2, file: () => wv, frontmatter: () => ul, getHeadings: () => ml, url: () => yv });
function ml() {
  return [];
}
function pl(e3) {
  return p("img", { src: "//cdn.kilic.net/posts/files/d0bd67e4-d7af-49e8-b092-0c63622a35c1.jpeg", alt: "" });
}
function hl(e3 = {}) {
  let { wrapper: t } = e3.components || {};
  return t ? p(t, { ...e3, children: p(pl, { ...e3 }) }) : pl();
}
var ul;
var gv;
var yv;
var wv;
var ir2;
var gl = m(() => {
  "use strict";
  P2();
  H();
  L();
  ul = { title: "Pixel 3 XL", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: "2019-01-03T12:01:12.000Z" };
  gv = true;
  y(ml, "astro:jsx");
  y(hl, "astro:jsx");
  yv = "src/content/post/my-new-post.mdx", wv = "/Users/serdar/dev/projects/my-astro-app/src/content/post/my-new-post.mdx", ir2 = (e3 = {}) => hl({ ...e3, components: { Fragment: b, ...e3.components, "astro-image": e3.components?.img ?? k2 } });
  ir2[Symbol.for("mdx-component")] = true;
  ir2[Symbol.for("astro.needsHeadRendering")] = !ul.layout;
  ir2.moduleId = "/Users/serdar/dev/projects/my-astro-app/src/content/post/my-new-post.mdx";
});
var yl = {};
f(yl, { default: () => kv });
async function vv() {
  return Promise.resolve().then(() => (gl(), fl));
}
var bv;
var xv;
var _v;
var kv;
var wl = m(() => {
  "use strict";
  bv = [], xv = [], _v = [], kv = { __astroPropagation: true, getMod: vv, collectedLinks: bv, collectedStyles: xv, collectedScripts: _v };
});
var kl = {};
f(kl, { Content: () => cr2, __usesAstroImage: () => Sv, default: () => cr2, file: () => Av, frontmatter: () => bl, getHeadings: () => xl, url: () => jv });
function xl() {
  return [];
}
function vl(e3) {
  let t = { a: "a", p: "p", ...e3.components };
  return p(t.p, { children: ["<p>It goes without saying that I really haven\u2019t been keeping this site updated as frequently as I would have hoped to but here\u2019s some tidbits on what\u2019s new around here. </p> <p>For the last six years I\u2019ve been hosting this site and others with Media Temple (mt) and after hearing that they\u2019ve been acquired by GoDaddy I decided that it\u2019s time to move my site. I had previously migrated domains over to Hover (I use NetRegistry for .au domains) from GoDaddy. See a theme here? </p> <p>The website move is slightly more involved as I was also using Media Temple to host my DNS records. I ended up moving my DNS to Amazon Route 53, whilst not free, it has some great tools and it really isn\u2019t that expensive - unless this domain gets a ridiculous amount of DNS queries. </p> <p>By day I\u2019m a .NET developer but I\u2019ve actually never hosted my own sites on .NET, this had to change! After visiting TechEd this year I decided to learn more about Windows Azure. The blogs of <a href=\u201C", p(t.a, { href: "http://www.hanselman.com/blog/%22&gt;Scott", children: "http://www.hanselman.com/blog/\u201C&gt;Scott" }), " Hanselman</a> and <a href=\u201C", p(t.a, { href: "http://weblogs.asp.net/scottgu/%22&gt;Scott", children: "http://weblogs.asp.net/scottgu/\u201C&gt;Scott" }), " Guthrie</a> were great to get up to speed on the how and what things need to be done. That said, if you use Visual Studio it\u2019s surprisingly easy to publish a site straight from the IDE - things get even easier if you\u2019re using Visual Studio 2013! </p> <p>A few hoops later I had migrated my sites and emails over to Azure - actually, I\u2019m using a hosted Exchange service for my emails that\u2019s linked to my Azure Active Directory. Of course this all meant that I had to swap out blog engines but I\u2019ll save that for a future post. </p>"] });
}
function _l2(e3 = {}) {
  let { wrapper: t } = e3.components || {};
  return t ? p(t, { ...e3, children: p(vl, { ...e3 }) }) : vl(e3);
}
var bl;
var Sv;
var jv;
var Av;
var cr2;
var Sl = m(() => {
  "use strict";
  P2();
  H();
  L();
  bl = { title: "On Blogging", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: "2013-11-28T11:03:00.000Z" };
  Sv = true;
  y(xl, "astro:jsx");
  y(_l2, "astro:jsx");
  jv = "src/content/post/on-blogging.mdx", Av = "/Users/serdar/dev/projects/my-astro-app/src/content/post/on-blogging.mdx", cr2 = (e3 = {}) => _l2({ ...e3, components: { Fragment: b, ...e3.components, "astro-image": e3.components?.img ?? k2 } });
  cr2[Symbol.for("mdx-component")] = true;
  cr2[Symbol.for("astro.needsHeadRendering")] = !bl.layout;
  cr2.moduleId = "/Users/serdar/dev/projects/my-astro-app/src/content/post/on-blogging.mdx";
});
var jl = {};
f(jl, { default: () => Dv });
async function Cv() {
  return Promise.resolve().then(() => (Sl(), kl));
}
var Tv;
var $v;
var Iv;
var Dv;
var Al = m(() => {
  "use strict";
  Tv = [], $v = [], Iv = [], Dv = { __astroPropagation: true, getMod: Cv, collectedLinks: Tv, collectedStyles: $v, collectedScripts: Iv };
});
var Dl = {};
f(Dl, { Content: () => lr2, __usesAstroImage: () => Rv, default: () => lr2, file: () => Ev, frontmatter: () => Tl, getHeadings: () => $l, url: () => Mv });
function $l() {
  return [];
}
function Cl(e3) {
  let t = { a: "a", p: "p", ...e3.components };
  return p(t.p, { children: ["If you have a Windows 8 tablet or laptop you\u2019ll be familiar with the <a href=\u201C", p(t.a, { href: "http://windows.microsoft.com/en-au/windows/reading-list-app-faq#1TC=windows-8%22&gt;Reading", children: "http://windows.microsoft.com/en-au/windows/reading-list-app-faq#1TC=windows-8\u201D&gt;Reading" }), " List</a> bookmark app from Microsoft. Whilst great as it is, we have a native application used to save <i>web </i>based resources, yet not have any <i>web </i>way of retrieving that same data!\xA0<br /><br />I\u2019ve <a href=\u201C", p(t.a, { href: "http://microsoft.uservoice.com/forums/173122-general/suggestions/6658706-reading-list-api%22&gt;submitted", children: "http://microsoft.uservoice.com/forums/173122-general/suggestions/6658706-reading-list-api\u201D&gt;submitted" }), " a request</a> to Microsoft via its UserVoice feedback system to allow for an open API access to the Reading List service, thus enabling the community to build additional methods of accessing said bookmarks.<br /><br /><a href=\u201C", p(t.a, { href: "http://microsoft.uservoice.com/forums/173122-general/suggestions/6658706-reading-list-api%22&gt;Vote", children: "http://microsoft.uservoice.com/forums/173122-general/suggestions/6658706-reading-list-api\u201D&gt;Vote" }), " up</a> if you think it\u2019s a good idea!<br />"] });
}
function Il(e3 = {}) {
  let { wrapper: t } = e3.components || {};
  return t ? p(t, { ...e3, children: p(Cl, { ...e3 }) }) : Cl(e3);
}
var Tl;
var Rv;
var Mv;
var Ev;
var lr2;
var Rl = m(() => {
  "use strict";
  P2();
  H();
  L();
  Tl = { title: "Reading List API", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: "2014-11-22T00:52:42.000Z" };
  Rv = true;
  y($l, "astro:jsx");
  y(Il, "astro:jsx");
  Mv = "src/content/post/reading-list-api.mdx", Ev = "/Users/serdar/dev/projects/my-astro-app/src/content/post/reading-list-api.mdx", lr2 = (e3 = {}) => Il({ ...e3, components: { Fragment: b, ...e3.components, "astro-image": e3.components?.img ?? k2 } });
  lr2[Symbol.for("mdx-component")] = true;
  lr2[Symbol.for("astro.needsHeadRendering")] = !Tl.layout;
  lr2.moduleId = "/Users/serdar/dev/projects/my-astro-app/src/content/post/reading-list-api.mdx";
});
var Ml = {};
f(Ml, { default: () => Ov });
async function Pv() {
  return Promise.resolve().then(() => (Rl(), Dl));
}
var Lv;
var Uv;
var Nv;
var Ov;
var El = m(() => {
  "use strict";
  Lv = [], Uv = [], Nv = [], Ov = { __astroPropagation: true, getMod: Pv, collectedLinks: Lv, collectedStyles: Uv, collectedScripts: Nv };
});
var Ol = {};
f(Ol, { Content: () => dr2, __usesAstroImage: () => Hv, default: () => dr2, file: () => Fv, frontmatter: () => Ll, getHeadings: () => Ul, url: () => zv });
function Ul() {
  return [];
}
function Pl(e3) {
  let t = { p: "p", ...e3.components };
  return p(t.p, { children: "<p>this is a post</p> <h1>with a H1</h1> <p>and a </p> <h2>h2</h2>" });
}
function Nl(e3 = {}) {
  let { wrapper: t } = e3.components || {};
  return t ? p(t, { ...e3, children: p(Pl, { ...e3 }) }) : Pl(e3);
}
var Ll;
var Hv;
var zv;
var Fv;
var dr2;
var Hl = m(() => {
  "use strict";
  P2();
  H();
  L();
  Ll = { title: "Test title", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: "2013-11-28T09:44:47.000Z" };
  Hv = true;
  y(Ul, "astro:jsx");
  y(Nl, "astro:jsx");
  zv = "src/content/post/test-title.mdx", Fv = "/Users/serdar/dev/projects/my-astro-app/src/content/post/test-title.mdx", dr2 = (e3 = {}) => Nl({ ...e3, components: { Fragment: b, ...e3.components, "astro-image": e3.components?.img ?? k2 } });
  dr2[Symbol.for("mdx-component")] = true;
  dr2[Symbol.for("astro.needsHeadRendering")] = !Ll.layout;
  dr2.moduleId = "/Users/serdar/dev/projects/my-astro-app/src/content/post/test-title.mdx";
});
var zl = {};
f(zl, { default: () => qv });
async function Vv() {
  return Promise.resolve().then(() => (Hl(), Ol));
}
var Bv;
var Wv;
var Zv;
var qv;
var Fl = m(() => {
  "use strict";
  Bv = [], Wv = [], Zv = [], qv = { __astroPropagation: true, getMod: Vv, collectedLinks: Bv, collectedStyles: Wv, collectedScripts: Zv };
});
var ql = {};
f(ql, { Content: () => pr2, __usesAstroImage: () => Gv, default: () => pr2, file: () => Kv, frontmatter: () => Bl, getHeadings: () => Wl, url: () => Xv });
function Wl() {
  return [];
}
function Vl(e3) {
  let t = { p: "p", ...e3.components };
  return p(b, { children: [p(t.p, { children: "The previous version of Scripting News toyed with the idea of having title-less feeds, but resulted in a view like below in NextGen Reader." }), `
`, p("a", { title: "Scripting News - No Titles by Serdar Kilic, on Flickr", href: "https://www.flickr.com/photos/serdar/15663069888", children: p("img", { alt: "Scripting News - No Titles", src: "https://farm9.staticflickr.com/8561/15663069888_54d2411796.jpg", width: "500", height: "441" }) }), `
`, p(t.p, { children: ["Recently however, Dave updated his software (i.e. his weblog) and along with it titles came back into play. You can see this in the first post in the screenshot below, makes quite a difference doesn\u2019t it? Fact is that most feed readers area geared to work with a title accompanying the post albeit such a requirement isn\u2019t mandated by the ", p("a", { href: "http://cyber.law.harvard.edu/rss/rss.html#hrelementsOfLtitemgt", children: "spec" }), "."] }), `
`, p("a", { title: "Scripting News - With Titles by Serdar Kilic, on Flickr", href: "https://www.flickr.com/photos/serdar/15663240060", children: p("img", { alt: "Scripting News - With Titles", src: "https://farm8.staticflickr.com/7542/15663240060_6a4311112f.jpg", width: "500", height: "137" }) }), `
`, p(t.p, { children: "Whilst RSS without titles are a great idea if you post multiple updates per day, but with the lack of tooling to support it, it leaves the user experience for the readers in a less enviable position. Then again, is it much different to how Twitter works? What if we were allowed to import our OPML lists into Twitter and have items come through as they were posted?" })] });
}
function Zl(e3 = {}) {
  let { wrapper: t } = e3.components || {};
  return t ? p(t, { ...e3, children: p(Vl, { ...e3 }) }) : Vl(e3);
}
var Bl;
var Gv;
var Xv;
var Kv;
var pr2;
var Gl = m(() => {
  "use strict";
  P2();
  H();
  L();
  Bl = { title: "Title-less RSS", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: "2014-11-22T12:20:00.000Z" };
  Gv = true;
  y(Wl, "astro:jsx");
  y(Zl, "astro:jsx");
  Xv = "src/content/post/title-lss-rss.mdx", Kv = "/Users/serdar/dev/projects/my-astro-app/src/content/post/title-lss-rss.mdx", pr2 = (e3 = {}) => Zl({ ...e3, components: { Fragment: b, ...e3.components, "astro-image": e3.components?.img ?? k2 } });
  pr2[Symbol.for("mdx-component")] = true;
  pr2[Symbol.for("astro.needsHeadRendering")] = !Bl.layout;
  pr2.moduleId = "/Users/serdar/dev/projects/my-astro-app/src/content/post/title-lss-rss.mdx";
});
var Xl = {};
f(Xl, { default: () => tb });
async function Yv() {
  return Promise.resolve().then(() => (Gl(), ql));
}
var Jv;
var Qv;
var eb;
var tb;
var Kl = m(() => {
  "use strict";
  Jv = [], Qv = [], eb = [], tb = { __astroPropagation: true, getMod: Yv, collectedLinks: Jv, collectedStyles: Qv, collectedScripts: eb };
});
var td = {};
f(td, { Content: () => ur2, __usesAstroImage: () => rb, default: () => ur2, file: () => nb, frontmatter: () => Jl, getHeadings: () => Ql, url: () => sb });
function Ql() {
  return [];
}
function Yl(e3) {
  let t = { p: "p", ...e3.components };
  return p(t.p, { children: '<div>Part of starting to blog again is to reacquaint myself with the code base that runs this site. The site itself is hosted within a Microsoft Azure App Service and the source code hosted in a private github repo.</div><div><br /></div><div>Each commit to the branch triggers a webhook that Azure is listening on that pulls in the latest code. Easy mode!</div><div><br /></div><div>Visual Studio code is my current editor of choice, the seamless integration with GitHub and it allowing me to run on my Mac or Windows PC makes it an easy choice.</div><div><br /></div><div><img src=\u201C//cdn.kilic.net/posts/files/99eb7649-2918-44e4-a224-1b55adcd6802.jpeg\u201D alt=""  /><br /></div>' });
}
function ed(e3 = {}) {
  let { wrapper: t } = e3.components || {};
  return t ? p(t, { ...e3, children: p(Yl, { ...e3 }) }) : Yl(e3);
}
var Jl;
var rb;
var sb;
var nb;
var ur2;
var rd = m(() => {
  "use strict";
  P2();
  H();
  L();
  Jl = { title: "Weblog Structure", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: "2019-01-02T09:27:42.000Z" };
  rb = true;
  y(Ql, "astro:jsx");
  y(ed, "astro:jsx");
  sb = "src/content/post/weblog-structure.mdx", nb = "/Users/serdar/dev/projects/my-astro-app/src/content/post/weblog-structure.mdx", ur2 = (e3 = {}) => ed({ ...e3, components: { Fragment: b, ...e3.components, "astro-image": e3.components?.img ?? k2 } });
  ur2[Symbol.for("mdx-component")] = true;
  ur2[Symbol.for("astro.needsHeadRendering")] = !Jl.layout;
  ur2.moduleId = "/Users/serdar/dev/projects/my-astro-app/src/content/post/weblog-structure.mdx";
});
var sd = {};
f(sd, { default: () => lb });
async function ob() {
  return Promise.resolve().then(() => (rd(), td));
}
var ab;
var ib;
var cb;
var lb;
var nd = m(() => {
  "use strict";
  ab = [], ib = [], cb = [], lb = { __astroPropagation: true, getMod: ob, collectedLinks: ab, collectedStyles: ib, collectedScripts: cb };
});
var ld = {};
f(ld, { Content: () => mr2, __usesAstroImage: () => db, default: () => mr2, file: () => ub, frontmatter: () => ad, getHeadings: () => id, url: () => pb });
function id() {
  return [];
}
function od(e3) {
  let t = { p: "p", ...e3.components };
  return p(t.p, { children: "With any luck and having the stars aligned this post should appear on my blog hosted at Windows Azure." });
}
function cd(e3 = {}) {
  let { wrapper: t } = e3.components || {};
  return t ? p(t, { ...e3, children: p(od, { ...e3 }) }) : od(e3);
}
var ad;
var db;
var pb;
var ub;
var mr2;
var dd = m(() => {
  "use strict";
  P2();
  H();
  L();
  ad = { title: "Windows Azure Migration", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: "2013-11-28T10:24:06.000Z" };
  db = true;
  y(id, "astro:jsx");
  y(cd, "astro:jsx");
  pb = "src/content/post/windows-azure-migration.mdx", ub = "/Users/serdar/dev/projects/my-astro-app/src/content/post/windows-azure-migration.mdx", mr2 = (e3 = {}) => cd({ ...e3, components: { Fragment: b, ...e3.components, "astro-image": e3.components?.img ?? k2 } });
  mr2[Symbol.for("mdx-component")] = true;
  mr2[Symbol.for("astro.needsHeadRendering")] = !ad.layout;
  mr2.moduleId = "/Users/serdar/dev/projects/my-astro-app/src/content/post/windows-azure-migration.mdx";
});
var pd = {};
f(pd, { default: () => yb });
async function mb() {
  return Promise.resolve().then(() => (dd(), ld));
}
var hb;
var fb;
var gb;
var yb;
var ud = m(() => {
  "use strict";
  hb = [], fb = [], gb = [], yb = { __astroPropagation: true, getMod: mb, collectedLinks: hb, collectedStyles: fb, collectedScripts: gb };
});
var yd = {};
f(yd, { Content: () => hr2, __usesAstroImage: () => wb, default: () => hr2, file: () => bb, frontmatter: () => hd, getHeadings: () => fd, url: () => vb });
function fd() {
  return [];
}
function md(e3) {
  let t = { p: "p", ...e3.components };
  return p(t.p, { children: "<p>This video is a must watch on how web design has evolved over the last 20 years or so. Amazingly, I\u2019m happy to have been involved with the web for 16 of those years (though no where near at the calibre of Zeldman).</p> <p><iframe height=\u201C281\u201D src=\u201C//player.vimeo.com/video/104641191\u201D frameborder=\u201C0\u201D width=\u201C500\u201D allowfullscreen mozallowfullscreen webkitallowfullscreen></iframe></p>" });
}
function gd(e3 = {}) {
  let { wrapper: t } = e3.components || {};
  return t ? p(t, { ...e3, children: p(md, { ...e3 }) }) : md(e3);
}
var hd;
var wb;
var vb;
var bb;
var hr2;
var wd = m(() => {
  "use strict";
  P2();
  H();
  L();
  hd = { title: "Zeldman", author: "Serdar Kilic", description: "knet-v2 excerpt", pubDate: "2014-09-20T12:47:57.000Z" };
  wb = true;
  y(fd, "astro:jsx");
  y(gd, "astro:jsx");
  vb = "src/content/post/zeldman.mdx", bb = "/Users/serdar/dev/projects/my-astro-app/src/content/post/zeldman.mdx", hr2 = (e3 = {}) => gd({ ...e3, components: { Fragment: b, ...e3.components, "astro-image": e3.components?.img ?? k2 } });
  hr2[Symbol.for("mdx-component")] = true;
  hr2[Symbol.for("astro.needsHeadRendering")] = !hd.layout;
  hr2.moduleId = "/Users/serdar/dev/projects/my-astro-app/src/content/post/zeldman.mdx";
});
var vd = {};
f(vd, { default: () => jb });
async function xb() {
  return Promise.resolve().then(() => (wd(), yd));
}
var _b;
var kb;
var Sb;
var jb;
var bd = m(() => {
  "use strict";
  _b = [], kb = [], Sb = [], jb = { __astroPropagation: true, getMod: xb, collectedLinks: _b, collectedStyles: kb, collectedScripts: Sb };
});
var Sd = {};
f(Sd, { c: () => Ub, g: () => Ss2 });
function Ab(e3) {
  return e3.type || (e3.type = "content"), e3;
}
function fr2({ globResult: e3, contentDir: t }) {
  let r = {};
  for (let s in e3) {
    let o = s.replace(new RegExp(`^${t}`), "").split("/");
    if (o.length <= 1)
      continue;
    let a = o[0];
    r[a] ??= {}, r[a][s] = e3[s];
  }
  return r;
}
function Cb({ contentCollectionToEntryMap: e3, dataCollectionToEntryMap: t, getRenderEntryImport: r }) {
  return async function(n, o) {
    let a;
    if (n in e3)
      a = "content";
    else if (n in t)
      a = "data";
    else {
      console.warn(`The collection **${n}** does not exist or is empty. Ensure a collection directory with this name exists.`);
      return;
    }
    let i = Object.values(a === "content" ? e3[n] : t[n]), l = [];
    return !Object.assign({ BASE_URL: "/", MODE: "production", DEV: false, PROD: true, SSR: true, SITE: void 0, ASSETS_PREFIX: void 0 }, { _: process.env._ })?.DEV && ks2.has(n) ? l = [...ks2.get(n)] : (l = await Promise.all(i.map(async (d) => {
      let c = await d();
      return a === "content" ? { id: c.id, slug: c.slug, body: c.body, collection: c.collection, data: c.data, async render() {
        return Tb({ collection: c.collection, id: c.id, renderEntryImport: await r(n, c.slug) });
      } } : { id: c.id, collection: c.collection, data: c.data };
    })), ks2.set(n, l)), typeof o == "function" ? l.filter(o) : l;
  };
}
async function Tb({ collection: e3, id: t, renderEntryImport: r }) {
  let s = new x2({ ...vn2, message: `Unexpected error while rendering ${String(e3)} \u2192 ${String(t)}.` });
  if (typeof r != "function")
    throw s;
  let n = await r();
  if (n == null || typeof n != "object")
    throw s;
  let { default: o } = n;
  if ($b(o)) {
    let { collectedStyles: a, collectedLinks: i, collectedScripts: l, getMod: d } = o;
    if (typeof d != "function")
      throw s;
    let c = await d();
    if (c == null || typeof c != "object")
      throw s;
    return { Content: W2({ factory(h, $, S) {
      let A = "", C2 = "", I2 = "";
      Array.isArray(a) && (A = a.map((V2) => ts2(h, { type: "inline", content: V2 })).join("")), Array.isArray(i) && (C2 = i.map((V2) => ts2(h, { type: "external", src: xe2(V2) })).join("")), Array.isArray(l) && (I2 = l.map((V2) => On2(V2)).join(""));
      let M2 = $;
      return t.endsWith("mdx") && (M2 = { components: c.components ?? {}, ...$ }), $n2(Ee2(A + C2 + I2), F2`${Q(h, "Content", c.Content, M2, S)}`);
    }, propagation: "self" }), headings: c.getHeadings?.() ?? [], remarkPluginFrontmatter: c.frontmatter ?? {} };
  } else {
    if (n.Content && typeof n.Content == "function")
      return { Content: n.Content, headings: n.getHeadings?.() ?? [], remarkPluginFrontmatter: n.frontmatter ?? {} };
    throw s;
  }
}
function $b(e3) {
  return typeof e3 == "object" && e3 != null && "__astroPropagation" in e3;
}
function Rb(e3) {
  return async (t, r) => {
    let s = kd[t]?.entries[r];
    if (s)
      return e3[t][s];
  };
}
var w22;
var ks2;
var gr2;
var xd;
var Ib;
var _d2;
var Db;
var kd;
var Mb;
var Eb;
var Ss2;
var Pb;
var Lb;
var Ub;
var js2 = m(() => {
  "use strict";
  P2();
  Ue2();
  le2();
  L();
  w22 = ne2(de2(), 1);
  Ho2();
  ks2 = /* @__PURE__ */ new Map();
  gr2 = "/src/content/", xd = Object.assign({ "/src/content/post/blue-beanie-day.mdx": () => Promise.resolve().then(() => (Fo2(), zo2)), "/src/content/post/cycling.mdx": () => Promise.resolve().then(() => (Bo2(), Vo2)), "/src/content/post/dell-m3800.mdx": () => Promise.resolve().then(() => (Zo2(), Wo2)), "/src/content/post/excuse-the-updates.mdx": () => Promise.resolve().then(() => (Go(), qo)), "/src/content/post/galatasaray.mdx": () => Promise.resolve().then(() => (Ko(), Xo)), "/src/content/post/getting-the-new-york-times-app-working-in-windows-8.mdx": () => Promise.resolve().then(() => (Jo(), Yo)), "/src/content/post/goodbye-five-simple-steps.mdx": () => Promise.resolve().then(() => (ea(), Qo)), "/src/content/post/google-test-post.mdx": () => Promise.resolve().then(() => (ra(), ta)), "/src/content/post/graduation.mdx": () => Promise.resolve().then(() => (na2(), sa)), "/src/content/post/happy-birthday-microformats.mdx": () => Promise.resolve().then(() => (aa(), oa)), "/src/content/post/is-this-still-on-2020-edition.mdx": () => Promise.resolve().then(() => (ca(), ia)), "/src/content/post/is-this-thing-still-on.mdx": () => Promise.resolve().then(() => (da(), la)), "/src/content/post/kilic.net-logo.mdx": () => Promise.resolve().then(() => (ua(), pa)), "/src/content/post/knet-v2.mdx": () => Promise.resolve().then(() => (ha(), ma)), "/src/content/post/lenovo-miix-2.mdx": () => Promise.resolve().then(() => (ga(), fa)), "/src/content/post/mean-people.mdx": () => Promise.resolve().then(() => (wa(), ya)), "/src/content/post/microsoft-sculpt-ergonomic-desktop.mdx": () => Promise.resolve().then(() => (ba(), va)), "/src/content/post/my-new-post.mdx": () => Promise.resolve().then(() => (_a4(), xa2)), "/src/content/post/on-blogging.mdx": () => Promise.resolve().then(() => (Sa(), ka)), "/src/content/post/reading-list-api.mdx": () => Promise.resolve().then(() => (Aa2(), ja)), "/src/content/post/test-title.mdx": () => Promise.resolve().then(() => (Ta(), Ca)), "/src/content/post/title-lss-rss.mdx": () => Promise.resolve().then(() => (Ia(), $a)), "/src/content/post/weblog-structure.mdx": () => Promise.resolve().then(() => (Ra(), Da)), "/src/content/post/windows-azure-migration.mdx": () => Promise.resolve().then(() => (Ea(), Ma)), "/src/content/post/zeldman.mdx": () => Promise.resolve().then(() => (La(), Pa)) }), Ib = fr2({ globResult: xd, contentDir: gr2 }), _d2 = Object.assign({}), Db = fr2({ globResult: _d2, contentDir: gr2 });
  fr2({ globResult: { ...xd, ..._d2 }, contentDir: gr2 });
  kd = {};
  kd = { post: { type: "content", entries: { "blue-beanie-day": "/src/content/post/blue-beanie-day.mdx", cycling: "/src/content/post/cycling.mdx", "dell-m3800": "/src/content/post/dell-m3800.mdx", "getting-the-new-york-times-app-working-in-windows-8": "/src/content/post/getting-the-new-york-times-app-working-in-windows-8.mdx", "goodbye-five-simple-steps": "/src/content/post/goodbye-five-simple-steps.mdx", "excuse-the-updates": "/src/content/post/excuse-the-updates.mdx", "google-test-post": "/src/content/post/google-test-post.mdx", galatasaray: "/src/content/post/galatasaray.mdx", "happy-birthday-microformats": "/src/content/post/happy-birthday-microformats.mdx", graduation: "/src/content/post/graduation.mdx", "is-this-still-on-2020-edition": "/src/content/post/is-this-still-on-2020-edition.mdx", "is-this-thing-still-on": "/src/content/post/is-this-thing-still-on.mdx", "kilicnet-logo": "/src/content/post/kilic.net-logo.mdx", "lenovo-miix-2": "/src/content/post/lenovo-miix-2.mdx", "mean-people": "/src/content/post/mean-people.mdx", "microsoft-sculpt-ergonomic-desktop": "/src/content/post/microsoft-sculpt-ergonomic-desktop.mdx", "knet-v2": "/src/content/post/knet-v2.mdx", "my-new-post": "/src/content/post/my-new-post.mdx", "on-blogging": "/src/content/post/on-blogging.mdx", "reading-list-api": "/src/content/post/reading-list-api.mdx", "title-lss-rss": "/src/content/post/title-lss-rss.mdx", "test-title": "/src/content/post/test-title.mdx", "windows-azure-migration": "/src/content/post/windows-azure-migration.mdx", zeldman: "/src/content/post/zeldman.mdx", "weblog-structure": "/src/content/post/weblog-structure.mdx" } } };
  Mb = Object.assign({ "/src/content/post/blue-beanie-day.mdx": () => Promise.resolve().then(() => (Ba(), Va)), "/src/content/post/cycling.mdx": () => Promise.resolve().then(() => (Ja(), Ya)), "/src/content/post/dell-m3800.mdx": () => Promise.resolve().then(() => (ai(), oi)), "/src/content/post/excuse-the-updates.mdx": () => Promise.resolve().then(() => (hi(), mi)), "/src/content/post/galatasaray.mdx": () => Promise.resolve().then(() => (_i2(), xi)), "/src/content/post/getting-the-new-york-times-app-working-in-windows-8.mdx": () => Promise.resolve().then(() => (Ii(), $i)), "/src/content/post/goodbye-five-simple-steps.mdx": () => Promise.resolve().then(() => (Ni(), Ui)), "/src/content/post/google-test-post.mdx": () => Promise.resolve().then(() => (Zi(), Wi)), "/src/content/post/graduation.mdx": () => Promise.resolve().then(() => (ec(), Qi)), "/src/content/post/happy-birthday-microformats.mdx": () => Promise.resolve().then(() => (cc(), ic)), "/src/content/post/is-this-still-on-2020-edition.mdx": () => Promise.resolve().then(() => (gc(), fc)), "/src/content/post/is-this-thing-still-on.mdx": () => Promise.resolve().then(() => (Sc(), kc)), "/src/content/post/kilic.net-logo.mdx": () => Promise.resolve().then(() => (Rc(), Dc)), "/src/content/post/knet-v2.mdx": () => Promise.resolve().then(() => (Hc(), Oc)), "/src/content/post/lenovo-miix-2.mdx": () => Promise.resolve().then(() => (Gc(), qc)), "/src/content/post/mean-people.mdx": () => Promise.resolve().then(() => (rl(), tl)), "/src/content/post/microsoft-sculpt-ergonomic-desktop.mdx": () => Promise.resolve().then(() => (dl(), ll)), "/src/content/post/my-new-post.mdx": () => Promise.resolve().then(() => (wl(), yl)), "/src/content/post/on-blogging.mdx": () => Promise.resolve().then(() => (Al(), jl)), "/src/content/post/reading-list-api.mdx": () => Promise.resolve().then(() => (El(), Ml)), "/src/content/post/test-title.mdx": () => Promise.resolve().then(() => (Fl(), zl)), "/src/content/post/title-lss-rss.mdx": () => Promise.resolve().then(() => (Kl(), Xl)), "/src/content/post/weblog-structure.mdx": () => Promise.resolve().then(() => (nd(), sd)), "/src/content/post/windows-azure-migration.mdx": () => Promise.resolve().then(() => (ud(), pd)), "/src/content/post/zeldman.mdx": () => Promise.resolve().then(() => (bd(), vd)) }), Eb = fr2({ globResult: Mb, contentDir: gr2 }), Ss2 = Cb({ contentCollectionToEntryMap: Ib, dataCollectionToEntryMap: Db, getRenderEntryImport: Rb(Eb) }), Pb = Ab({ type: "content", schema: _s3({ title: De2(), pubDate: No2(), description: De2(), author: De2(), image: _s3({ url: De2(), alt: De2() }), tags: Oo2(De2()) }) }), Lb = { posts: Pb }, Ub = Object.freeze(Object.defineProperty({ __proto__: null, collections: Lb }, Symbol.toStringTag, { value: "Module" }));
});
var jd = {};
f(jd, { page: () => Nb, renderers: () => Z2 });
var Nb;
var Ad = m(() => {
  "use strict";
  ue2();
  Nb = () => Promise.resolve().then(() => (js2(), Sd)).then((e3) => e3.c);
});
var Cd = {};
f(Cd, { default: () => Ob, file: () => Hb, getStaticPaths: () => zb, prerender: () => Fb, url: () => Vb });
var yt2;
var Ob;
var Hb;
var zb;
var Fb;
var Vb;
var Td = m(() => {
  "use strict";
  yt2 = () => {
  }, Ob = yt2, Hb = yt2, zb = yt2, Fb = yt2, Vb = yt2;
});
var $d = {};
f($d, { page: () => Bb, renderers: () => Z2 });
var Bb;
var Id = m(() => {
  "use strict";
  ue2();
  Bb = () => Promise.resolve().then(() => (Td(), Cd));
});
var Md = {};
f(Md, { default: () => Rd, file: () => qb, url: () => Gb });
var S2;
var Wb;
var Dd;
var Zb;
var Rd;
var qb;
var Gb;
var Ed = m(() => {
  "use strict";
  P2();
  le2();
  L();
  S2 = ne2(de2(), 1);
  nt2();
  js2();
  Wb = X2(), Dd = W2(async (e3, t, r) => {
    let s = e3.createAstro(Wb, t, r);
    s.self = Dd;
    let { url: n, title: o } = s.props;
    return F2`${o} - ${J2()}<a${ie2(n, "href")}>${n}</a>`;
  }, "/Users/serdar/dev/projects/my-astro-app/src/components/BlogPost.astro", void 0), Zb = X2(), Rd = W2(async (e3, t, r) => {
    let s = e3.createAstro(Zb, t, r);
    s.self = Rd;
    let n = await Ss2("post"), a = await (await fetch(s.url + "api/echo")).text();
    return F2`${Q(e3, "Layout", ge2, { title: "Welcome to Astro.", "data-astro-cid-j7pv25f6": true }, { default: (i) => F2`
pre-comments
${J2()}<main data-astro-cid-j7pv25f6> <!-- {newPost.length}
    {
      newPost?.map((comment) => {
        {
          return comment.title;
        }
      })
    } -->
comments
<ul data-astro-cid-j7pv25f6>
Previously:
<hr data-astro-cid-j7pv25f6> ${n.map((l) => F2`${Q(i, "Fragment", b, { "data-astro-cid-j7pv25f6": true }, { default: (d) => F2` ${Q(d, "BlogPost", Dd, { url: `/post/${l.slug}/`, title: l.data.title, "data-astro-cid-j7pv25f6": true })} <br data-astro-cid-j7pv25f6> ` })}`)} ${a} </ul> </main> ` })} `;
  }, "/Users/serdar/dev/projects/my-astro-app/src/pages/index.astro", void 0), qb = "/Users/serdar/dev/projects/my-astro-app/src/pages/index.astro", Gb = "";
});
var Pd = {};
f(Pd, { page: () => Xb, renderers: () => Z2 });
var Xb;
var Ld = m(() => {
  "use strict";
  ue2();
  Xb = () => Promise.resolve().then(() => (Ed(), Md));
});
ue2();
Ue2();
var $_ = ne2(is2(), 1);
le2();
P2();
L();
var M_ = ne2(de2(), 1);
function Zu(e3) {
  for (var t = [], r = 0; r < e3.length; ) {
    var s = e3[r];
    if (s === "*" || s === "+" || s === "?") {
      t.push({ type: "MODIFIER", index: r, value: e3[r++] });
      continue;
    }
    if (s === "\\") {
      t.push({ type: "ESCAPED_CHAR", index: r++, value: e3[r++] });
      continue;
    }
    if (s === "{") {
      t.push({ type: "OPEN", index: r, value: e3[r++] });
      continue;
    }
    if (s === "}") {
      t.push({ type: "CLOSE", index: r, value: e3[r++] });
      continue;
    }
    if (s === ":") {
      for (var n = "", o = r + 1; o < e3.length; ) {
        var a = e3.charCodeAt(o);
        if (a >= 48 && a <= 57 || a >= 65 && a <= 90 || a >= 97 && a <= 122 || a === 95) {
          n += e3[o++];
          continue;
        }
        break;
      }
      if (!n)
        throw new TypeError("Missing parameter name at ".concat(r));
      t.push({ type: "NAME", index: r, value: n }), r = o;
      continue;
    }
    if (s === "(") {
      var i = 1, l = "", o = r + 1;
      if (e3[o] === "?")
        throw new TypeError('Pattern cannot start with "?" at '.concat(o));
      for (; o < e3.length; ) {
        if (e3[o] === "\\") {
          l += e3[o++] + e3[o++];
          continue;
        }
        if (e3[o] === ")") {
          if (i--, i === 0) {
            o++;
            break;
          }
        } else if (e3[o] === "(" && (i++, e3[o + 1] !== "?"))
          throw new TypeError("Capturing groups are not allowed at ".concat(o));
        l += e3[o++];
      }
      if (i)
        throw new TypeError("Unbalanced pattern at ".concat(r));
      if (!l)
        throw new TypeError("Missing pattern at ".concat(r));
      t.push({ type: "PATTERN", index: r, value: l }), r = o;
      continue;
    }
    t.push({ type: "CHAR", index: r, value: e3[r++] });
  }
  return t.push({ type: "END", index: r, value: "" }), t;
}
function qu(e3, t) {
  t === void 0 && (t = {});
  for (var r = Zu(e3), s = t.prefixes, n = s === void 0 ? "./" : s, o = "[^".concat(Xu(t.delimiter || "/#?"), "]+?"), a = [], i = 0, l = 0, d = "", c = function(te2) {
    if (l < r.length && r[l].type === te2)
      return r[l++].value;
  }, u = function(te2) {
    var T2 = c(te2);
    if (T2 !== void 0)
      return T2;
    var O2 = r[l], B2 = O2.type, Xe2 = O2.index;
    throw new TypeError("Unexpected ".concat(B2, " at ").concat(Xe2, ", expected ").concat(te2));
  }, h = function() {
    for (var te2 = "", T2; T2 = c("CHAR") || c("ESCAPED_CHAR"); )
      te2 += T2;
    return te2;
  }; l < r.length; ) {
    var $ = c("CHAR"), S = c("NAME"), A = c("PATTERN");
    if (S || A) {
      var C2 = $ || "";
      n.indexOf(C2) === -1 && (d += C2, C2 = ""), d && (a.push(d), d = ""), a.push({ name: S || i++, prefix: C2, suffix: "", pattern: A || o, modifier: c("MODIFIER") || "" });
      continue;
    }
    var I2 = $ || c("ESCAPED_CHAR");
    if (I2) {
      d += I2;
      continue;
    }
    d && (a.push(d), d = "");
    var M2 = c("OPEN");
    if (M2) {
      var C2 = h(), V2 = c("NAME") || "", G2 = c("PATTERN") || "", K2 = h();
      u("CLOSE"), a.push({ name: V2 || (G2 ? i++ : ""), pattern: V2 && !G2 ? o : G2, prefix: C2, suffix: K2, modifier: c("MODIFIER") || "" });
      continue;
    }
    u("END");
  }
  return a;
}
function Fn2(e3, t) {
  return Gu(qu(e3, t), t);
}
function Gu(e3, t) {
  t === void 0 && (t = {});
  var r = Ku(t), s = t.encode, n = s === void 0 ? function(l) {
    return l;
  } : s, o = t.validate, a = o === void 0 ? true : o, i = e3.map(function(l) {
    if (typeof l == "object")
      return new RegExp("^(?:".concat(l.pattern, ")$"), r);
  });
  return function(l) {
    for (var d = "", c = 0; c < e3.length; c++) {
      var u = e3[c];
      if (typeof u == "string") {
        d += u;
        continue;
      }
      var h = l ? l[u.name] : void 0, $ = u.modifier === "?" || u.modifier === "*", S = u.modifier === "*" || u.modifier === "+";
      if (Array.isArray(h)) {
        if (!S)
          throw new TypeError('Expected "'.concat(u.name, '" to not repeat, but got an array'));
        if (h.length === 0) {
          if ($)
            continue;
          throw new TypeError('Expected "'.concat(u.name, '" to not be empty'));
        }
        for (var A = 0; A < h.length; A++) {
          var C2 = n(h[A], u);
          if (a && !i[c].test(C2))
            throw new TypeError('Expected all "'.concat(u.name, '" to match "').concat(u.pattern, '", but got "').concat(C2, '"'));
          d += u.prefix + C2 + u.suffix;
        }
        continue;
      }
      if (typeof h == "string" || typeof h == "number") {
        var C2 = n(String(h), u);
        if (a && !i[c].test(C2))
          throw new TypeError('Expected "'.concat(u.name, '" to match "').concat(u.pattern, '", but got "').concat(C2, '"'));
        d += u.prefix + C2 + u.suffix;
        continue;
      }
      if (!$) {
        var I2 = S ? "an array" : "a string";
        throw new TypeError('Expected "'.concat(u.name, '" to be ').concat(I2));
      }
    }
    return d;
  };
}
function Xu(e3) {
  return e3.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function Ku(e3) {
  return e3 && e3.sensitive ? "" : "i";
}
var Yu = new Intl.DateTimeFormat([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
var rt2 = { debug: 20, info: 30, warn: 40, error: 50, silent: 90 };
function cs2(e3, t, r, s, n = true) {
  let o = e3.level, a = e3.dest, i = { label: r, level: t, message: s, newLine: n };
  Ju(o, t) && a.write(i);
}
function Ju(e3, t) {
  return rt2[e3] <= rt2[t];
}
function Vn2(e3, t, r, s = true) {
  return cs2(e3, "info", t, r, s);
}
function Bn2(e3, t, r, s = true) {
  return cs2(e3, "warn", t, r, s);
}
function Wn2(e3, t, r, s = true) {
  return cs2(e3, "error", t, r, s);
}
function Zn2(...e3) {
  "_astroGlobalDebug" in globalThis && globalThis._astroGlobalDebug(...e3);
}
function qn2({ level: e3, label: t }) {
  let r = `${Yu.format(/* @__PURE__ */ new Date())}`, s = [];
  return e3 === "error" || e3 === "warn" ? (s.push(bt2(r)), s.push(`[${e3.toUpperCase()}]`)) : s.push(r), t && s.push(`[${t}]`), e3 === "error" ? Vs2(s.join(" ")) : e3 === "warn" ? Bs2(s.join(" ")) : s.length === 1 ? br2(s[0]) : br2(s[0]) + " " + Ws2(s.splice(1).join(" "));
}
if (typeof process < "u") {
  let e3 = process;
  "argv" in e3 && Array.isArray(e3.argv) && (e3.argv.includes("--verbose") || e3.argv.includes("--silent"));
}
var Et2 = class {
  options;
  constructor(t) {
    this.options = t;
  }
  info(t, r, s = true) {
    Vn2(this.options, t, r, s);
  }
  warn(t, r, s = true) {
    Bn2(this.options, t, r, s);
  }
  error(t, r, s = true) {
    Wn2(this.options, t, r, s);
  }
  debug(t, ...r) {
    Zn2(t, ...r);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(t) {
    return new st2(this.options, t);
  }
};
var st2 = class e2 {
  options;
  label;
  constructor(t, r) {
    this.options = t, this.label = r;
  }
  fork(t) {
    return new e2(this.options, t);
  }
  info(t) {
    Vn2(this.options, this.label, t);
  }
  warn(t) {
    Bn2(this.options, this.label, t);
  }
  error(t) {
    Wn2(this.options, this.label, t);
  }
  debug(t) {
    Zn2(this.label, t);
  }
};
function Qu(e3, t) {
  let r = e3.map((o) => "/" + o.map((a) => a.spread ? `:${a.content.slice(3)}(.*)?` : a.dynamic ? `:${a.content}` : a.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("")).join(""), s = "";
  return t === "always" && e3.length && (s = "/"), Fn2(r + s);
}
function Pt2(e3) {
  return { route: e3.route, type: e3.type, pattern: new RegExp(e3.pattern), params: e3.params, component: e3.component, generate: Qu(e3.segments, e3._meta.trailingSlash), pathname: e3.pathname || void 0, segments: e3.segments, prerender: e3.prerender, redirect: e3.redirect, redirectRoute: e3.redirectRoute ? Pt2(e3.redirectRoute) : void 0, fallbackRoutes: e3.fallbackRoutes.map((t) => Pt2(t)), isIndex: e3.isIndex };
}
function em(e3) {
  let t = [];
  for (let o of e3.routes) {
    t.push({ ...o, routeData: Pt2(o.routeData) });
    let a = o;
    a.routeData = Pt2(o.routeData);
  }
  let r = new Set(e3.assets), s = new Map(e3.componentMetadata), n = new Map(e3.clientDirectives);
  return { middleware(o, a) {
    return a();
  }, ...e3, assets: r, componentMetadata: s, clientDirectives: n, routes: t };
}
var Gn2 = em({ adapterName: "@astrojs/cloudflare", routes: [{ file: "", links: [], scripts: [], styles: [], routeData: { type: "endpoint", isIndex: false, route: "/_image", pattern: "^\\/_image$", segments: [[{ content: "_image", dynamic: false, spread: false }]], params: [], component: "node_modules/astro/dist/assets/endpoint/generic.js", pathname: "/_image", prerender: false, fallbackRoutes: [], _meta: { trailingSlash: "ignore" } } }, { file: "", links: [], scripts: [], styles: [], routeData: { route: "/404", isIndex: false, type: "page", pattern: "^\\/404\\/?$", segments: [[{ content: "404", dynamic: false, spread: false }]], params: [], component: "src/pages/404.astro", pathname: "/404", prerender: false, fallbackRoutes: [], _meta: { trailingSlash: "ignore" } } }, { file: "", links: [], scripts: [], styles: [{ type: "inline", content: `:root{--accent: 136, 58, 234;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% )}html{font-family:system-ui,sans-serif;abackground:#13151a;background-size:224px}code{font-family:Cousine,Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace}
` }], routeData: { route: "/about", isIndex: false, type: "page", pattern: "^\\/about\\/?$", segments: [[{ content: "about", dynamic: false, spread: false }]], params: [], component: "src/pages/about.astro", pathname: "/about", prerender: false, fallbackRoutes: [], _meta: { trailingSlash: "ignore" } } }, { file: "", links: [], scripts: [], styles: [{ type: "inline", content: `:root{--accent: 136, 58, 234;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% )}html{font-family:system-ui,sans-serif;abackground:#13151a;background-size:224px}code{font-family:Cousine,Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace}
` }], routeData: { route: "/gear/coffee", isIndex: false, type: "page", pattern: "^\\/gear\\/coffee\\/?$", segments: [[{ content: "gear", dynamic: false, spread: false }], [{ content: "coffee", dynamic: false, spread: false }]], params: [], component: "src/pages/gear/coffee.astro", pathname: "/gear/coffee", prerender: false, fallbackRoutes: [], _meta: { trailingSlash: "ignore" } } }, { file: "", links: [], scripts: [], styles: [{ type: "inline", content: `:root{--accent: 136, 58, 234;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% )}html{font-family:system-ui,sans-serif;abackground:#13151a;background-size:224px}code{font-family:Cousine,Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace}
` }], routeData: { route: "/gear/photography", isIndex: false, type: "page", pattern: "^\\/gear\\/photography\\/?$", segments: [[{ content: "gear", dynamic: false, spread: false }], [{ content: "photography", dynamic: false, spread: false }]], params: [], component: "src/pages/gear/photography.astro", pathname: "/gear/photography", prerender: false, fallbackRoutes: [], _meta: { trailingSlash: "ignore" } } }, { file: "", links: [], scripts: [], styles: [], routeData: { route: "/post/config", isIndex: false, type: "endpoint", pattern: "^\\/post\\/config\\/?$", segments: [[{ content: "post", dynamic: false, spread: false }], [{ content: "config", dynamic: false, spread: false }]], params: [], component: "src/pages/post/config.ts", pathname: "/post/config", prerender: false, fallbackRoutes: [], _meta: { trailingSlash: "ignore" } } }, { file: "", links: [], scripts: [], styles: [{ type: "inline", content: `:root{--accent: 136, 58, 234;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% )}html{font-family:system-ui,sans-serif;abackground:#13151a;background-size:224px}code{font-family:Cousine,Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace}
main[data-astro-cid-j7pv25f6]{margin:auto;padding:1rem;width:800px;max-width:calc(100% - 2rem);font-size:20px;line-height:1.6}
` }], routeData: { route: "/", isIndex: true, type: "page", pattern: "^\\/$", segments: [], params: [], component: "src/pages/index.astro", pathname: "/", prerender: false, fallbackRoutes: [], _meta: { trailingSlash: "ignore" } } }], base: "/", trailingSlash: "ignore", compressHTML: true, componentMetadata: [["/Users/serdar/dev/projects/my-astro-app/src/pages/about.astro", { propagation: "none", containsHead: true }], ["/Users/serdar/dev/projects/my-astro-app/src/pages/gear/coffee.astro", { propagation: "none", containsHead: true }], ["/Users/serdar/dev/projects/my-astro-app/src/pages/gear/photography.astro", { propagation: "none", containsHead: true }], ["/Users/serdar/dev/projects/my-astro-app/src/pages/index.astro", { propagation: "in-tree", containsHead: true }], ["\0astro:content", { propagation: "in-tree", containsHead: false }], ["\0@astro-page:src/pages/index@_@astro", { propagation: "in-tree", containsHead: false }], ["\0@astrojs-ssr-virtual-entry", { propagation: "in-tree", containsHead: false }], ["/Users/serdar/dev/projects/my-astro-app/src/pages/post/[...slug].astro", { propagation: "in-tree", containsHead: false }], ["\0@astro-page:src/pages/post/[...slug]@_@astro", { propagation: "in-tree", containsHead: false }], ["/Users/serdar/dev/projects/my-astro-app/src/pages/post/config.ts", { propagation: "in-tree", containsHead: false }], ["\0@astro-page:src/pages/post/config@_@ts", { propagation: "in-tree", containsHead: false }]], renderers: [], clientDirectives: [["idle", '(()=>{var i=t=>{let e=async()=>{await(await t())()};"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event("astro:idle"));})();'], ["load", '(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event("astro:load"));})();'], ["media", '(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener("change",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event("astro:media"));})();'], ["only", '(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event("astro:only"));})();'], ["visible", '(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value=="object"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event("astro:visible"));})();']], entryModules: { "\0@astrojs-ssr-virtual-entry": "_worker.mjs", "\0@astro-renderers": "renderers.mjs", "\0noop-middleware": "_noop-middleware.mjs", "/src/pages/404.astro": "chunks/pages/404_smyLrobg.mjs", "/src/pages/gear/coffee.astro": "chunks/pages/coffee_C1viseqY.mjs", "/src/pages/index.astro": "chunks/pages/index_C6i18DSo.mjs", "/src/pages/gear/photography.astro": "chunks/pages/photography_yyDAUnce.mjs", "/src/pages/post/[...slug].astro": "chunks/prerender_l9fPFieL.mjs", "\0@astrojs-manifest": "manifest_Dosraqmp.mjs", "\0@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js": "chunks/generic_G6sF7KXF.mjs", "\0@astro-page:src/pages/404@_@astro": "chunks/404_11oerQZ7.mjs", "\0@astro-page:src/pages/about@_@astro": "chunks/about_DbhtYCK3.mjs", "\0@astro-page:src/pages/gear/coffee@_@astro": "chunks/coffee_DkMQcz6N.mjs", "\0@astro-page:src/pages/gear/photography@_@astro": "chunks/photography_CgCyJMae.mjs", "\0@astro-page:src/pages/post/config@_@ts": "chunks/config_ePDh8HbI.mjs", "\0@astro-page:src/pages/post/[...slug]@_@astro": "chunks/_.._0bi_9xWg.mjs", "\0@astro-page:src/pages/index@_@astro": "chunks/index_DmcP0W0z.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/blue-beanie-day.mdx?astroContentCollectionEntry=true": "chunks/blue-beanie-day_CW90eXsV.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/cycling.mdx?astroContentCollectionEntry=true": "chunks/cycling_B1kj4bPZ.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/dell-m3800.mdx?astroContentCollectionEntry=true": "chunks/dell-m3800_DSRosLkH.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/excuse-the-updates.mdx?astroContentCollectionEntry=true": "chunks/excuse-the-updates_DifPb0I0.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/galatasaray.mdx?astroContentCollectionEntry=true": "chunks/galatasaray_Bqgxbvei.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/getting-the-new-york-times-app-working-in-windows-8.mdx?astroContentCollectionEntry=true": "chunks/getting-the-new-york-times-app-working-in-windows-8_00xh2qdm.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/goodbye-five-simple-steps.mdx?astroContentCollectionEntry=true": "chunks/goodbye-five-simple-steps_DfympEqD.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/google-test-post.mdx?astroContentCollectionEntry=true": "chunks/google-test-post_B7AcVu4i.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/graduation.mdx?astroContentCollectionEntry=true": "chunks/graduation_D69r6ziO.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/happy-birthday-microformats.mdx?astroContentCollectionEntry=true": "chunks/happy-birthday-microformats_pl4hFddq.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/is-this-still-on-2020-edition.mdx?astroContentCollectionEntry=true": "chunks/is-this-still-on-2020-edition_Bg6YAI06.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/is-this-thing-still-on.mdx?astroContentCollectionEntry=true": "chunks/is-this-thing-still-on_Cq1rnrmY.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/kilic.net-logo.mdx?astroContentCollectionEntry=true": "chunks/kilic.net-logo_DLW58K4z.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/knet-v2.mdx?astroContentCollectionEntry=true": "chunks/knet-v2_hj-3QR-g.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/lenovo-miix-2.mdx?astroContentCollectionEntry=true": "chunks/lenovo-miix-2_CnXaTnFA.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/mean-people.mdx?astroContentCollectionEntry=true": "chunks/mean-people_BfW2H83s.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/microsoft-sculpt-ergonomic-desktop.mdx?astroContentCollectionEntry=true": "chunks/microsoft-sculpt-ergonomic-desktop_DAVvLril.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/my-new-post.mdx?astroContentCollectionEntry=true": "chunks/my-new-post_BSyJGW26.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/on-blogging.mdx?astroContentCollectionEntry=true": "chunks/on-blogging_B35-2jo3.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/reading-list-api.mdx?astroContentCollectionEntry=true": "chunks/reading-list-api_DNbRFBrw.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/test-title.mdx?astroContentCollectionEntry=true": "chunks/test-title_QoX1R3UD.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/title-lss-rss.mdx?astroContentCollectionEntry=true": "chunks/title-lss-rss_VkIbxdsZ.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/weblog-structure.mdx?astroContentCollectionEntry=true": "chunks/weblog-structure_uJfYqqwy.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/windows-azure-migration.mdx?astroContentCollectionEntry=true": "chunks/windows-azure-migration_D8pFg3Nf.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/zeldman.mdx?astroContentCollectionEntry=true": "chunks/zeldman_XsycG4w_.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/blue-beanie-day.mdx?astroPropagatedAssets": "chunks/blue-beanie-day_DfUFzDOG.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/cycling.mdx?astroPropagatedAssets": "chunks/cycling_C-RKsGbL.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/dell-m3800.mdx?astroPropagatedAssets": "chunks/dell-m3800_CJrW4F9F.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/excuse-the-updates.mdx?astroPropagatedAssets": "chunks/excuse-the-updates_CEw-LJ_1.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/galatasaray.mdx?astroPropagatedAssets": "chunks/galatasaray_DE9wNfwf.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/getting-the-new-york-times-app-working-in-windows-8.mdx?astroPropagatedAssets": "chunks/getting-the-new-york-times-app-working-in-windows-8_Deur0wMK.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/goodbye-five-simple-steps.mdx?astroPropagatedAssets": "chunks/goodbye-five-simple-steps_BNwkM-vU.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/google-test-post.mdx?astroPropagatedAssets": "chunks/google-test-post_JzI_PDya.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/graduation.mdx?astroPropagatedAssets": "chunks/graduation_CzOxe0Mk.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/happy-birthday-microformats.mdx?astroPropagatedAssets": "chunks/happy-birthday-microformats_msAeleR6.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/is-this-still-on-2020-edition.mdx?astroPropagatedAssets": "chunks/is-this-still-on-2020-edition_spaBsgFS.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/is-this-thing-still-on.mdx?astroPropagatedAssets": "chunks/is-this-thing-still-on_BV6ZCqzH.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/kilic.net-logo.mdx?astroPropagatedAssets": "chunks/kilic.net-logo_8BMzgkPA.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/knet-v2.mdx?astroPropagatedAssets": "chunks/knet-v2_BOjW-ooY.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/lenovo-miix-2.mdx?astroPropagatedAssets": "chunks/lenovo-miix-2_DACI2OAL.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/mean-people.mdx?astroPropagatedAssets": "chunks/mean-people_D0itVIoV.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/microsoft-sculpt-ergonomic-desktop.mdx?astroPropagatedAssets": "chunks/microsoft-sculpt-ergonomic-desktop_CwzqhXl_.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/my-new-post.mdx?astroPropagatedAssets": "chunks/my-new-post_DVIir3Hv.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/on-blogging.mdx?astroPropagatedAssets": "chunks/on-blogging_CkpYYM6X.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/reading-list-api.mdx?astroPropagatedAssets": "chunks/reading-list-api_B8rmPh_E.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/test-title.mdx?astroPropagatedAssets": "chunks/test-title_CNygHIsR.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/title-lss-rss.mdx?astroPropagatedAssets": "chunks/title-lss-rss_oGsSHTI_.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/weblog-structure.mdx?astroPropagatedAssets": "chunks/weblog-structure_DpOdFDgs.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/windows-azure-migration.mdx?astroPropagatedAssets": "chunks/windows-azure-migration_DZBH7q61.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/zeldman.mdx?astroPropagatedAssets": "chunks/zeldman_BaEZfj4U.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/blue-beanie-day.mdx": "chunks/blue-beanie-day_CI8vPXNB.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/cycling.mdx": "chunks/cycling_-1tfPzGs.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/dell-m3800.mdx": "chunks/dell-m3800_mHWQ5dnj.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/excuse-the-updates.mdx": "chunks/excuse-the-updates_DprGtdlA.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/galatasaray.mdx": "chunks/galatasaray_D1FXHtCD.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/getting-the-new-york-times-app-working-in-windows-8.mdx": "chunks/getting-the-new-york-times-app-working-in-windows-8_CTocwM8v.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/goodbye-five-simple-steps.mdx": "chunks/goodbye-five-simple-steps_Bs74tb0R.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/google-test-post.mdx": "chunks/google-test-post_D-dMhVSE.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/graduation.mdx": "chunks/graduation_CtN8zv4O.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/happy-birthday-microformats.mdx": "chunks/happy-birthday-microformats_CzfUGtJe.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/is-this-still-on-2020-edition.mdx": "chunks/is-this-still-on-2020-edition_Dvkq7mAa.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/is-this-thing-still-on.mdx": "chunks/is-this-thing-still-on_DMscMbqo.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/kilic.net-logo.mdx": "chunks/kilic.net-logo_DKnCxqjq.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/knet-v2.mdx": "chunks/knet-v2_DcATC58m.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/lenovo-miix-2.mdx": "chunks/lenovo-miix-2_CRjCGtTX.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/mean-people.mdx": "chunks/mean-people_CuntKe62.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/microsoft-sculpt-ergonomic-desktop.mdx": "chunks/microsoft-sculpt-ergonomic-desktop_C_BhwtVH.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/my-new-post.mdx": "chunks/my-new-post_Ccg4Ewzh.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/on-blogging.mdx": "chunks/on-blogging__SNbzyri.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/reading-list-api.mdx": "chunks/reading-list-api_Bt7OLCRQ.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/test-title.mdx": "chunks/test-title_C9pe3NZ0.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/title-lss-rss.mdx": "chunks/title-lss-rss_Cwq6JWmz.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/weblog-structure.mdx": "chunks/weblog-structure_D0TGpCZh.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/windows-azure-migration.mdx": "chunks/windows-azure-migration_DZ7R8zlG.mjs", "/Users/serdar/dev/projects/my-astro-app/src/content/post/zeldman.mdx": "chunks/zeldman_C1yGwoia.mjs", "astro:scripts/before-hydration.js": "" }, assets: ["/favicon.svg", "/$server_build/_noop-middleware.mjs", "/$server_build/_worker.mjs", "/$server_build/renderers.mjs", "/$server_build/chunks/404_11oerQZ7.mjs", "/$server_build/chunks/_.._0bi_9xWg.mjs", "/$server_build/chunks/about_DbhtYCK3.mjs", "/$server_build/chunks/astro_DrNHXGmj.mjs", "/$server_build/chunks/blue-beanie-day_CI8vPXNB.mjs", "/$server_build/chunks/blue-beanie-day_CW90eXsV.mjs", "/$server_build/chunks/blue-beanie-day_DfUFzDOG.mjs", "/$server_build/chunks/coffee_DkMQcz6N.mjs", "/$server_build/chunks/config_ePDh8HbI.mjs", "/$server_build/chunks/cycling_-1tfPzGs.mjs", "/$server_build/chunks/cycling_B1kj4bPZ.mjs", "/$server_build/chunks/cycling_C-RKsGbL.mjs", "/$server_build/chunks/dell-m3800_CJrW4F9F.mjs", "/$server_build/chunks/dell-m3800_DSRosLkH.mjs", "/$server_build/chunks/dell-m3800_mHWQ5dnj.mjs", "/$server_build/chunks/excuse-the-updates_CEw-LJ_1.mjs", "/$server_build/chunks/excuse-the-updates_DifPb0I0.mjs", "/$server_build/chunks/excuse-the-updates_DprGtdlA.mjs", "/$server_build/chunks/galatasaray_Bqgxbvei.mjs", "/$server_build/chunks/galatasaray_D1FXHtCD.mjs", "/$server_build/chunks/galatasaray_DE9wNfwf.mjs", "/$server_build/chunks/generic_G6sF7KXF.mjs", "/$server_build/chunks/getting-the-new-york-times-app-working-in-windows-8_00xh2qdm.mjs", "/$server_build/chunks/getting-the-new-york-times-app-working-in-windows-8_CTocwM8v.mjs", "/$server_build/chunks/getting-the-new-york-times-app-working-in-windows-8_Deur0wMK.mjs", "/$server_build/chunks/goodbye-five-simple-steps_BNwkM-vU.mjs", "/$server_build/chunks/goodbye-five-simple-steps_Bs74tb0R.mjs", "/$server_build/chunks/goodbye-five-simple-steps_DfympEqD.mjs", "/$server_build/chunks/google-test-post_B7AcVu4i.mjs", "/$server_build/chunks/google-test-post_D-dMhVSE.mjs", "/$server_build/chunks/google-test-post_JzI_PDya.mjs", "/$server_build/chunks/graduation_CtN8zv4O.mjs", "/$server_build/chunks/graduation_CzOxe0Mk.mjs", "/$server_build/chunks/graduation_D69r6ziO.mjs", "/$server_build/chunks/happy-birthday-microformats_CzfUGtJe.mjs", "/$server_build/chunks/happy-birthday-microformats_msAeleR6.mjs", "/$server_build/chunks/happy-birthday-microformats_pl4hFddq.mjs", "/$server_build/chunks/index_DmcP0W0z.mjs", "/$server_build/chunks/is-this-still-on-2020-edition_Bg6YAI06.mjs", "/$server_build/chunks/is-this-still-on-2020-edition_Dvkq7mAa.mjs", "/$server_build/chunks/is-this-still-on-2020-edition_spaBsgFS.mjs", "/$server_build/chunks/is-this-thing-still-on_BV6ZCqzH.mjs", "/$server_build/chunks/is-this-thing-still-on_Cq1rnrmY.mjs", "/$server_build/chunks/is-this-thing-still-on_DMscMbqo.mjs", "/$server_build/chunks/kilic.net-logo_8BMzgkPA.mjs", "/$server_build/chunks/kilic.net-logo_DKnCxqjq.mjs", "/$server_build/chunks/kilic.net-logo_DLW58K4z.mjs", "/$server_build/chunks/knet-v2_BOjW-ooY.mjs", "/$server_build/chunks/knet-v2_DcATC58m.mjs", "/$server_build/chunks/knet-v2_hj-3QR-g.mjs", "/$server_build/chunks/lenovo-miix-2_CRjCGtTX.mjs", "/$server_build/chunks/lenovo-miix-2_CnXaTnFA.mjs", "/$server_build/chunks/lenovo-miix-2_DACI2OAL.mjs", "/$server_build/chunks/mean-people_BfW2H83s.mjs", "/$server_build/chunks/mean-people_CuntKe62.mjs", "/$server_build/chunks/mean-people_D0itVIoV.mjs", "/$server_build/chunks/microsoft-sculpt-ergonomic-desktop_C_BhwtVH.mjs", "/$server_build/chunks/microsoft-sculpt-ergonomic-desktop_CwzqhXl_.mjs", "/$server_build/chunks/microsoft-sculpt-ergonomic-desktop_DAVvLril.mjs", "/$server_build/chunks/my-new-post_BSyJGW26.mjs", "/$server_build/chunks/my-new-post_Ccg4Ewzh.mjs", "/$server_build/chunks/my-new-post_DVIir3Hv.mjs", "/$server_build/chunks/on-blogging_B35-2jo3.mjs", "/$server_build/chunks/on-blogging_CkpYYM6X.mjs", "/$server_build/chunks/on-blogging__SNbzyri.mjs", "/$server_build/chunks/photography_CgCyJMae.mjs", "/$server_build/chunks/prerender_l9fPFieL.mjs", "/$server_build/chunks/reading-list-api_B8rmPh_E.mjs", "/$server_build/chunks/reading-list-api_Bt7OLCRQ.mjs", "/$server_build/chunks/reading-list-api_DNbRFBrw.mjs", "/$server_build/chunks/test-title_C9pe3NZ0.mjs", "/$server_build/chunks/test-title_CNygHIsR.mjs", "/$server_build/chunks/test-title_QoX1R3UD.mjs", "/$server_build/chunks/title-lss-rss_Cwq6JWmz.mjs", "/$server_build/chunks/title-lss-rss_VkIbxdsZ.mjs", "/$server_build/chunks/title-lss-rss_oGsSHTI_.mjs", "/$server_build/chunks/weblog-structure_D0TGpCZh.mjs", "/$server_build/chunks/weblog-structure_DpOdFDgs.mjs", "/$server_build/chunks/weblog-structure_uJfYqqwy.mjs", "/$server_build/chunks/windows-azure-migration_D8pFg3Nf.mjs", "/$server_build/chunks/windows-azure-migration_DZ7R8zlG.mjs", "/$server_build/chunks/windows-azure-migration_DZBH7q61.mjs", "/$server_build/chunks/zeldman_BaEZfj4U.mjs", "/$server_build/chunks/zeldman_C1yGwoia.mjs", "/$server_build/chunks/zeldman_XsycG4w_.mjs", "/$server_build/chunks/astro/assets-service_FlfnVxXy.mjs", "/$server_build/chunks/pages/404_smyLrobg.mjs", "/$server_build/chunks/pages/about_DaTHhBn5.mjs", "/$server_build/chunks/pages/coffee_C1viseqY.mjs", "/$server_build/chunks/pages/config_Dy30zr_S.mjs", "/$server_build/chunks/pages/generic_CgTfwemn.mjs", "/$server_build/chunks/pages/index_C6i18DSo.mjs", "/$server_build/chunks/pages/photography_yyDAUnce.mjs"], buildFormat: "directory" });
Ue2();
P2();
var wt2 = ne2(is2(), 1);
le2();
L();
var E2 = ne2(de2(), 1);
var Xn2 = (e3, t) => t();
function Kb(e3, t) {
  switch (e3) {
    case "always":
      return true;
    case "never":
      return false;
    case "ignore":
      switch (t) {
        case "directory":
          return true;
        case "preserve":
        case "file":
          return false;
      }
  }
}
function Yb(e3, t) {
  for (let r of t)
    if (typeof r == "string") {
      if (r === e3)
        return r;
    } else
      for (let s of r.codes)
        if (s === e3)
          return r.path;
  throw new $s2();
}
function q2(e3) {
  return e3.replaceAll("_", "-").toLowerCase();
}
function Jb(e3) {
  return e3.map((t) => typeof t == "string" ? t : t.codes[0]);
}
var $s2 = class extends Error {
  constructor() {
    super(`Astro encountered an unexpected line of code.
In most cases, this is not your fault, but a bug in astro code.
If there isn't one already, please create an issue.
https://astro.build/issues`);
  }
};
var Kd = Symbol.for(Gr2);
function Ud(e3, t) {
  let r = e3.split("/");
  for (let s of r)
    for (let n of t)
      if (typeof n == "string") {
        if (q2(s) === q2(n))
          return true;
      } else if (s === n.path)
        return true;
  return false;
}
function Qb(e3, t, r, s) {
  if (!e3)
    return (i, l) => l();
  let n = (i, l, d) => {
    if (i.pathname === t + "/" || i.pathname === t)
      return Kb(r, s) ? d.redirect(`${rs2(_e3(t, e3.defaultLocale))}`) : d.redirect(`${_e3(t, e3.defaultLocale)}`);
    if (!Ud(i.pathname, e3.locales))
      return new Response(null, { status: 404, headers: l.headers });
  }, o = (i, l) => {
    let d = false;
    for (let c of i.pathname.split("/"))
      if (q2(c) === q2(e3.defaultLocale)) {
        d = true;
        break;
      }
    if (d) {
      let c = i.pathname.replace(`/${e3.defaultLocale}`, "");
      return l.headers.set("Location", c), new Response(null, { status: 404, headers: l.headers });
    }
  }, a = (i, l) => {
    if (!(i.pathname === t + "/" || i.pathname === t || Ud(i.pathname, e3.locales)))
      return new Response(null, { status: 404, headers: l.headers });
  };
  return async (i, l) => {
    let d = Reflect.get(i.request, Kd);
    if (d?.type !== "page" && d?.type !== "fallback")
      return await l();
    let c = i.currentLocale, u = i.url, { locales: h, defaultLocale: $, fallback: S, routing: A } = e3, C2 = await l();
    if (C2 instanceof Response) {
      switch (e3.routing) {
        case "domains-prefix-other-locales": {
          if (As2(e3, c)) {
            let I2 = o(u, C2);
            if (I2)
              return I2;
          }
          break;
        }
        case "pathname-prefix-other-locales": {
          let I2 = o(u, C2);
          if (I2)
            return I2;
          break;
        }
        case "domains-prefix-always-no-redirect": {
          if (As2(e3, c)) {
            let I2 = a(u, C2);
            if (I2)
              return I2;
          }
          break;
        }
        case "pathname-prefix-always-no-redirect": {
          let I2 = a(u, C2);
          if (I2)
            return I2;
          break;
        }
        case "pathname-prefix-always": {
          let I2 = n(u, C2, i);
          if (I2)
            return I2;
          break;
        }
        case "domains-prefix-always": {
          if (As2(e3, c)) {
            let I2 = n(u, C2, i);
            if (I2)
              return I2;
          }
          break;
        }
      }
      if (C2.status >= 300 && S) {
        let I2 = e3.fallback ? Object.keys(e3.fallback) : [], V2 = u.pathname.split("/").find((G2) => {
          for (let K2 of h)
            if (typeof K2 == "string") {
              if (K2 === G2)
                return true;
            } else if (K2.path === G2)
              return true;
          return false;
        });
        if (V2 && I2.includes(V2)) {
          let G2 = S[V2], K2 = Yb(G2, h), te2;
          return K2 === $ && A === "pathname-prefix-other-locales" ? te2 = u.pathname.replace(`/${V2}`, "") : te2 = u.pathname.replace(`/${V2}`, `/${K2}`), i.redirect(te2);
        }
      }
    }
    return C2;
  };
}
var ex = (e3) => {
  Reflect.set(e3.request, Kd, e3.route);
};
function As2(e3, t) {
  for (let r of Object.values(e3.domainLookupTable))
    if (r === t)
      return false;
  return true;
}
var tx = /* @__PURE__ */ new Date(0);
var Nd = "deleted";
var rx = Symbol.for("astro.responseSent");
var yr2 = class {
  constructor(t) {
    this.value = t;
  }
  json() {
    if (this.value === void 0)
      throw new Error("Cannot convert undefined to an object.");
    return JSON.parse(this.value);
  }
  number() {
    return Number(this.value);
  }
  boolean() {
    return this.value === "false" || this.value === "0" ? false : !!this.value;
  }
};
var vt2 = class {
  #e;
  #t;
  #r;
  #n;
  constructor(t) {
    this.#e = t, this.#t = null, this.#r = null, this.#n = false;
  }
  delete(t, r) {
    let s = { expires: tx };
    r?.domain && (s.domain = r.domain), r?.path && (s.path = r.path), this.#s().set(t, [Nd, (0, wt2.serialize)(t, Nd, s), false]);
  }
  get(t, r = void 0) {
    if (this.#r?.has(t)) {
      let [n, , o] = this.#r.get(t);
      return o ? new yr2(n) : void 0;
    }
    let s = this.#o(r);
    if (t in s) {
      let n = s[t];
      return new yr2(n);
    }
  }
  has(t, r = void 0) {
    if (this.#r?.has(t)) {
      let [, , n] = this.#r.get(t);
      return n;
    }
    return !!this.#o(r)[t];
  }
  set(t, r, s) {
    if (this.#n) {
      let a = new Error(`Astro.cookies.set() was called after the cookies had already been sent to the browser.
This may have happened if this method was called in an imported component.
Please make sure that Astro.cookies.set() is only called in the frontmatter of the main page.`);
      a.name = "Warning", console.warn(a);
    }
    let n;
    if (typeof r == "string")
      n = r;
    else {
      let a = r.toString();
      a === Object.prototype.toString.call(r) ? n = JSON.stringify(r) : n = a;
    }
    let o = {};
    if (s && Object.assign(o, s), this.#s().set(t, [n, (0, wt2.serialize)(t, n, o), true]), this.#e[rx])
      throw new x2({ ...Tt2 });
  }
  *headers() {
    if (this.#r != null)
      for (let [, t] of this.#r)
        yield t[1];
  }
  static consume(t) {
    return t.#n = true, t.headers();
  }
  #o(t = void 0) {
    return this.#t || this.#a(t), this.#t || (this.#t = {}), this.#t;
  }
  #s() {
    return this.#r || (this.#r = /* @__PURE__ */ new Map()), this.#r;
  }
  #a(t = void 0) {
    let r = this.#e.headers.get("cookie");
    r && (this.#t = (0, wt2.parse)(r, t));
  }
};
var Ps2 = Symbol.for("astro.cookies");
function Ls2(e3, t) {
  Reflect.set(e3, Ps2, t);
}
function sx(e3) {
  return Reflect.has(e3, Ps2);
}
function nx(e3) {
  let t = Reflect.get(e3, Ps2);
  if (t != null)
    return t;
}
function* Od(e3) {
  let t = nx(e3);
  if (!t)
    return [];
  for (let r of vt2.consume(t))
    yield r;
  return [];
}
var ox = { write(e3) {
  let t = console.error;
  return rt2[e3.level] < rt2.error && (t = console.log), e3.label === "SKIP_FORMAT" ? t(e3.message) : t(qn2(e3) + " " + e3.message), true;
} };
async function Yd(e3, t, r) {
  let s = false, n, a = e3(t, async () => (s = true, n = r(), n));
  return await Promise.resolve(a).then(async (i) => {
    if (s)
      if (typeof i < "u") {
        if (!(i instanceof Response))
          throw new x2($t2);
        return Hd(t, i);
      } else {
        if (n)
          return n;
        throw new x2($t2);
      }
    else {
      if (typeof i > "u")
        throw new x2(yn2);
      if (i instanceof Response)
        return Hd(t, i);
      throw new x2($t2);
    }
  });
}
function Hd(e3, t) {
  return e3.cookies !== void 0 && !sx(t) && Ls2(t, e3.cookies), t;
}
function Jd(e3) {
  return e3?.type === "redirect";
}
function Qd(e3) {
  return e3?.type === "fallback";
}
function ax(e3, t) {
  let r = e3.redirectRoute, s = e3.redirect;
  if (typeof r < "u")
    return r?.generate(t) || r?.pathname || "/";
  if (typeof s == "string") {
    let n = s;
    for (let o of Object.keys(t)) {
      let a = t[o];
      n = n.replace(`[${o}]`, a), n = n.replace(`[...${o}]`, a);
    }
    return n;
  } else if (typeof s > "u")
    return "/";
  return s.destination;
}
function ix(e3, t = "GET") {
  return e3.redirectRoute && typeof e3.redirect == "object" ? e3.redirect.status : t !== "GET" ? 308 : 301;
}
var cx = { default() {
  return new Response(null, { status: 301 });
} };
var lx = { page: () => Promise.resolve(cx), onRequest: (e3, t) => t(), renderers: [] };
var dx = ["string", "number", "undefined"];
function px([e3, t], r) {
  if (!dx.includes(typeof t))
    throw new x2({ ...Or2, message: Or2.message(e3, t, typeof t), location: { file: r } });
}
function ux(e3, { ssr: t, route: r }) {
  if ((!t || r.prerender) && !e3.getStaticPaths)
    throw new x2({ ...mn, location: { file: r.component } });
}
function mx(e3, t, r) {
  if (!Array.isArray(e3))
    throw new x2({ ...Nr2, message: Nr2.message(typeof e3), location: { file: r.component } });
  e3.forEach((s) => {
    if (typeof s == "object" && Array.isArray(s) || s === null)
      throw new x2({ ...Ur2, message: Ur2.message(Array.isArray(s) ? "array" : typeof s) });
    if (s.params === void 0 || s.params === null || s.params && Object.keys(s.params).length === 0)
      throw new x2({ ...un, location: { file: r.component } });
    for (let [n, o] of Object.entries(s.params))
      typeof o > "u" || typeof o == "string" || typeof o == "number" || t.warn("router", `getStaticPaths() returned an invalid path param: "${n}". A string, number or undefined value was expected, but got \`${JSON.stringify(o)}\`.`), typeof o == "string" && o === "" && t.warn("router", `getStaticPaths() returned an invalid path param: "${n}". \`undefined\` expected for an optional param, but got empty string.`);
  });
}
function hx(e3) {
  return (r) => {
    let s = {};
    return e3.forEach((n, o) => {
      n.startsWith("...") ? s[n.slice(3)] = r[o + 1] ? r[o + 1] : void 0 : s[n] = r[o + 1];
    }), s;
  };
}
function ep(e3, t) {
  let r = Object.entries(e3).reduce((s, n) => {
    px(n, t.component);
    let [o, a] = n;
    return a !== void 0 && (s[o] = typeof a == "string" ? ns2(a) : a.toString()), s;
  }, {});
  return JSON.stringify(t.generate(r));
}
function fx(e3) {
  return function(r, s = {}) {
    let { pageSize: n, params: o, props: a } = s, i = n || 10, l = "page", d = o || {}, c = a || {}, u;
    if (e3.params.includes(`...${l}`))
      u = false;
    else if (e3.params.includes(`${l}`))
      u = true;
    else
      throw new x2({ ...zr2, message: zr2.message(l) });
    let h = Math.max(1, Math.ceil(r.length / i));
    return [...Array(h).keys()].map((S) => {
      let A = S + 1, C2 = i === 1 / 0 ? 0 : (A - 1) * i, I2 = Math.min(C2 + i, r.length), M2 = { ...d, [l]: u || A > 1 ? String(A) : void 0 }, V2 = Cs2(e3.generate({ ...M2 })), G2 = A === h ? void 0 : Cs2(e3.generate({ ...M2, page: String(A + 1) })), K2 = A === 1 ? void 0 : Cs2(e3.generate({ ...M2, page: !u && A - 1 === 1 ? void 0 : String(A - 1) }));
      return { params: M2, props: { ...c, page: { data: r.slice(C2, I2), start: C2, end: I2 - 1, size: i, total: r.length, currentPage: A, lastPage: h, url: { current: V2, next: G2, prev: K2 } } } };
    });
  };
}
function Cs2(e3) {
  return e3 === "" ? "/" : e3;
}
async function gx({ mod: e3, route: t, routeCache: r, logger: s, ssr: n }) {
  let o = r.get(t);
  if (!e3)
    throw new Error("This is an error caused by Astro and not your code. Please file an issue.");
  if (o?.staticPaths)
    return o.staticPaths;
  if (ux(e3, { ssr: n, route: t }), n && !t.prerender) {
    let l = Object.assign([], { keyed: /* @__PURE__ */ new Map() });
    return r.set(t, { ...o, staticPaths: l }), l;
  }
  let a = [];
  if (!e3.getStaticPaths)
    throw new Error("Unexpected Error.");
  a = await e3.getStaticPaths({ paginate: fx(t) }), mx(a, s, t);
  let i = a;
  i.keyed = /* @__PURE__ */ new Map();
  for (let l of i) {
    let d = ep(l.params, t);
    i.keyed.set(d, l);
  }
  return r.set(t, { ...o, staticPaths: i }), i;
}
var Is2 = class {
  logger;
  cache = {};
  mode;
  constructor(t, r = "production") {
    this.logger = t, this.mode = r;
  }
  clearAll() {
    this.cache = {};
  }
  set(t, r) {
    this.mode === "production" && this.cache[t.component]?.staticPaths && this.logger.warn(null, `Internal Warning: route cache overwritten. (${t.component})`), this.cache[t.component] = r;
  }
  get(t) {
    return this.cache[t.component];
  }
};
function yx(e3, t, r, s) {
  let n = ep(t, r), o = e3.keyed.get(n);
  if (o)
    return o;
  s.debug("router", `findPathItemByKey() - Unexpected cache miss looking for ${n}`);
}
async function wx(e3) {
  let { logger: t, mod: r, route: s, routeCache: n, pathname: o, ssr: a } = e3;
  if (!s || s.pathname)
    return [{}, {}];
  let i = vx(s, o) ?? {};
  if (Jd(s) || Qd(s))
    return [i, {}];
  r && bx(s, r, i);
  let l = await gx({ mod: r, route: s, routeCache: n, logger: t, ssr: a }), d = yx(l, i, s, t);
  if (!d && (!a || s.prerender))
    throw new x2({ ...At, message: At.message(o), hint: At.hint([s.component]) });
  let c = d?.props ? { ...d.props } : {};
  return [i, c];
}
function vx(e3, t) {
  if (e3.params.length) {
    let r = e3.pattern.exec(decodeURIComponent(t));
    if (r)
      return hx(e3.params)(r);
  }
}
function bx(e3, t, r) {
  if (e3.type === "endpoint" && t.getStaticPaths) {
    let s = e3.segments[e3.segments.length - 1], n = Object.values(r), o = n[n.length - 1];
    if (s.length === 1 && s[0].dynamic && o === void 0)
      throw new x2({ ...Ct2, message: Ct2.message(e3.route), hint: Ct2.hint(e3.component), location: { file: e3.component } });
  }
}
var zd = Symbol.for("astro.locals");
var xx = Symbol.for(Gr2);
async function Fd(e3) {
  let t = e3.request, r = e3.pathname ?? new URL(t.url).pathname, [s, n] = await wx({ mod: e3.mod, route: e3.route, routeCache: e3.env.routeCache, pathname: r, logger: e3.env.logger, ssr: e3.env.ssr }), o = { ...e3, pathname: r, params: s, props: n, locales: e3.locales, routing: e3.routing, defaultLocale: e3.defaultLocale };
  return Object.defineProperty(o, "locals", { enumerable: true, get() {
    return Reflect.get(t, zd);
  }, set(a) {
    if (typeof a != "object")
      throw new x2(It2);
    Reflect.set(t, zd, a);
  } }), o;
}
function tp(e3) {
  if (e3 === "*")
    return [{ locale: e3, qualityValue: void 0 }];
  let t = [], r = e3.split(",").map((s) => s.trim());
  for (let s of r) {
    let n = s.split(";").map((i) => i.trim()), o = n[0], a = n[1];
    if (n)
      if (a && a.startsWith("q=")) {
        let i = Number.parseFloat(a.slice(2));
        Number.isNaN(i) || i > 1 ? t.push({ locale: o, qualityValue: void 0 }) : t.push({ locale: o, qualityValue: i });
      } else
        t.push({ locale: o, qualityValue: void 0 });
  }
  return t;
}
function rp(e3, t) {
  let r = Jb(t).map(q2);
  return e3.filter((s) => s.locale !== "*" ? r.includes(q2(s.locale)) : true).sort((s, n) => {
    if (s.qualityValue && n.qualityValue) {
      if (s.qualityValue > n.qualityValue)
        return -1;
      if (s.qualityValue < n.qualityValue)
        return 1;
    }
    return 0;
  });
}
function sp(e3, t) {
  let r = e3.headers.get("Accept-Language"), s;
  if (r) {
    let o = rp(tp(r), t).at(0);
    if (o && o.locale !== "*")
      for (let a of t)
        if (typeof a == "string")
          q2(a) === q2(o.locale) && (s = a);
        else
          for (let i of a.codes)
            q2(i) === q2(o.locale) && (s = a.path);
  }
  return s;
}
function np(e3, t) {
  let r = e3.headers.get("Accept-Language"), s = [];
  if (r) {
    let n = rp(tp(r), t);
    if (n.length === 1 && n.at(0).locale === "*")
      return t.map((o) => typeof o == "string" ? o : o.codes.at(0));
    if (n.length > 0)
      for (let o of n)
        for (let a of t)
          if (typeof a == "string")
            q2(a) === q2(o.locale) && s.push(a);
          else
            for (let i of a.codes)
              i === o.locale && s.push(a.path);
  }
  return s;
}
function op(e3, t, r, s) {
  let n = Reflect.get(e3, xx);
  if (!n)
    return s;
  let o = n.pathname ?? new URL(e3.url).pathname;
  for (let a of o.split("/").filter(Boolean))
    for (let i of t)
      if (typeof i == "string") {
        if (!a.includes(i))
          continue;
        if (q2(i) === q2(a))
          return i;
      } else {
        if (i.path === a)
          return i.codes.at(0);
        for (let l of i.codes)
          if (q2(l) === q2(a))
            return l;
      }
  if (r === "pathname-prefix-other-locales" || r === "domains-prefix-other-locales")
    return s;
}
var Vd = Symbol.for("astro.clientAddress");
var Ts2 = Symbol.for("astro.locals");
function ap({ request: e3, params: t, site: r, props: s, adapterName: n, locales: o, routingStrategy: a, defaultLocale: i }) {
  let l, d, c;
  return { cookies: new vt2(e3), request: e3, params: t, site: r ? new URL(r) : void 0, generator: `Astro v${qr2}`, props: s, redirect(h, $) {
    return new Response(null, { status: $ || 302, headers: { Location: h } });
  }, get preferredLocale() {
    if (l)
      return l;
    if (o)
      return l = sp(e3, o), l;
  }, get preferredLocaleList() {
    if (d)
      return d;
    if (o)
      return d = np(e3, o), d;
  }, get currentLocale() {
    return c || (o && (c = op(e3, o, a, i)), c);
  }, url: new URL(e3.url), get clientAddress() {
    if (Vd in e3)
      return Reflect.get(e3, Vd);
    throw n ? new x2({ ...Qe2, message: Qe2.message(n) }) : new x2(Lr2);
  }, get locals() {
    let h = Reflect.get(e3, Ts2);
    if (h === void 0 && (h = {}, Reflect.set(e3, Ts2, h)), typeof h != "object")
      throw new x2(It2);
    return h;
  }, set locals(h) {
    if (typeof h != "object")
      throw new x2(It2);
    Reflect.set(e3, Ts2, h);
  } };
}
async function _x(e3, t, r, s) {
  let n = ap({ request: r.request, params: r.params, props: r.props, site: t.site, adapterName: t.adapterName, routingStrategy: r.routing, defaultLocale: r.defaultLocale, locales: r.locales }), o;
  return s ? o = await Yd(s, n, async () => await Xr(e3, n, t.ssr, t.logger)) : o = await Xr(e3, n, t.ssr, t.logger), Ls2(o, n.cookies), o;
}
function kx(...e3) {
  let t = e3.filter((s) => !!s), r = t.length;
  return r ? (s, n) => {
    return o(0, s);
    function o(a, i) {
      let l = t[a];
      return l(i, async () => a < r - 1 ? o(a + 1, i) : n());
    }
  } : (n, o) => o();
}
function Us2(e3, t, r) {
  return r ? _e3(r, os2(e3)) : t ? xe2(_e3(t, os2(e3))) : e3;
}
function Sx(e3, t, r) {
  return e3.type === "inline" ? { props: {}, children: e3.content } : { props: { rel: "stylesheet", href: Us2(e3.src, t, r) }, children: "" };
}
function jx(e3, t, r) {
  return new Set(e3.map((s) => Sx(s, t, r)));
}
function Ax(e3, t, r) {
  return e3.type === "external" ? Cx(e3.value, t, r) : { props: { type: "module" }, children: e3.value };
}
function Cx(e3, t, r) {
  return { props: { type: "module", src: Us2(e3, t, r) }, children: "" };
}
function Bd(e3, t) {
  let r = decodeURI(e3);
  return t.routes.find((s) => s.pattern.test(r) || s.fallbackRoutes.some((n) => n.pattern.test(r)));
}
var Wd = Symbol.for("astro.clientAddress");
var Tx = Symbol.for("astro.responseSent");
function $x(e3) {
  if (e3 && e3.expressions?.length === 1)
    return e3.expressions[0];
}
var Ds2 = class {
  #e;
  #t;
  #r;
  constructor(t, r, s) {
    if (this.#e = t, this.#t = r, this.#r = s, r)
      for (let n of Object.keys(r)) {
        if (this[n] !== void 0)
          throw new x2({ ...Hr2, message: Hr2.message(n) });
        Object.defineProperty(this, n, { get() {
          return true;
        }, enumerable: true });
      }
  }
  has(t) {
    return this.#t ? !!this.#t[t] : false;
  }
  async render(t, r = []) {
    if (!this.#t || !this.has(t))
      return;
    let s = this.#e;
    if (!Array.isArray(r))
      this.#r.warn(null, `Expected second parameter to be an array, received a ${typeof r}. If you're trying to pass an array as a single argument and getting unexpected results, make sure you're passing your array as a item of an array. Ex: Astro.slots.render('default', [["Hello", "World"]])`);
    else if (r.length > 0) {
      let a = this.#t[t], i = typeof a == "function" ? await a(s) : await a, l = $x(i);
      if (l)
        return await Te2(s, async () => typeof l == "function" ? l(...r) : l).then((c) => c != null ? String(c) : c);
      if (typeof i == "function")
        return await pe2(s, i(...r)).then((d) => d != null ? String(d) : d);
    }
    let n = await Te2(s, this.#t[t]);
    return ve(s, n);
  }
};
function Ix(e3) {
  let { params: t, request: r, resolve: s, locals: n } = e3, o = new URL(r.url), a = new Headers();
  a.set("Content-Type", "text/html");
  let i = { status: e3.status, statusText: "OK", headers: a };
  Object.defineProperty(i, "headers", { value: i.headers, enumerable: true, writable: false });
  let l = e3.cookies, d, c, u, h = { styles: e3.styles ?? /* @__PURE__ */ new Set(), scripts: e3.scripts ?? /* @__PURE__ */ new Set(), links: e3.links ?? /* @__PURE__ */ new Set(), componentMetadata: e3.componentMetadata ?? /* @__PURE__ */ new Map(), renderers: e3.renderers, clientDirectives: e3.clientDirectives, compressHTML: e3.compressHTML, partial: e3.partial, pathname: e3.pathname, cookies: l, createAstro($, S, A) {
    let C2 = new Ds2(h, A, e3.logger);
    return { __proto__: $, get clientAddress() {
      if (!(Wd in r))
        throw e3.adapterName ? new x2({ ...Qe2, message: Qe2.message(e3.adapterName) }) : new x2(Lr2);
      return Reflect.get(r, Wd);
    }, get cookies() {
      return l || (l = new vt2(r), h.cookies = l, l);
    }, get preferredLocale() {
      if (d)
        return d;
      if (e3.locales)
        return d = sp(r, e3.locales), d;
    }, get preferredLocaleList() {
      if (c)
        return c;
      if (e3.locales)
        return c = np(r, e3.locales), c;
    }, get currentLocale() {
      if (u || e3.locales && (u = op(r, e3.locales, e3.routingStrategy, e3.defaultLocale), u))
        return u;
    }, params: t, props: S, locals: n, request: r, url: o, redirect(M2, V2) {
      if (r[Tx])
        throw new x2({ ...Tt2 });
      return new Response(null, { status: V2 || 302, headers: { Location: M2 } });
    }, response: i, slots: C2 };
  }, resolve: s, response: i, _metadata: { hasHydrationScript: false, rendererSpecificHydrationScripts: /* @__PURE__ */ new Set(), hasRenderedHead: false, hasDirectives: /* @__PURE__ */ new Set(), headInTree: false, extraHead: [], propagators: /* @__PURE__ */ new Set() } };
  return h;
}
async function Zd({ mod: e3, renderContext: t, env: r, cookies: s }) {
  if (Jd(t.route))
    return new Response(null, { status: ix(t.route, t.request.method), headers: { location: ax(t.route, t.params) } });
  if (Qd(t.route))
    return new Response(null, { status: 404 });
  if (!e3)
    throw new x2(wn2);
  let n = e3.default;
  if (!n)
    throw new Error(`Expected an exported Astro component but received typeof ${typeof n}`);
  let o = Ix({ adapterName: r.adapterName, links: t.links, styles: t.styles, logger: r.logger, params: t.params, pathname: t.pathname, componentMetadata: t.componentMetadata, resolve: r.resolve, renderers: r.renderers, clientDirectives: r.clientDirectives, compressHTML: r.compressHTML, request: t.request, partial: !!e3.partial, site: r.site, scripts: t.scripts, ssr: r.ssr, status: t.status ?? 200, cookies: s, locals: t.locals ?? {}, locales: t.locales, defaultLocale: t.defaultLocale, routingStrategy: t.routing }), a = await Nn2(o, n, t.props, {}, r.streaming, t.route);
  return o.cookies && Ls2(a, o.cookies), a;
}
var Rs2 = class {
  env;
  #e;
  #t = { before: [] };
  constructor(t) {
    this.env = t;
  }
  setEnvironment() {
  }
  setMiddlewareFunction(t) {
    this.#e = t;
  }
  unsetMiddlewareFunction() {
    this.#e = void 0;
  }
  getEnvironment() {
    return this.env;
  }
  async renderRoute(t, r) {
    for (let s of this.#t.before)
      s(t, r);
    return await this.#r(t, this.env, r, this.#e);
  }
  async #r(t, r, s, n) {
    let o = ap({ request: t.request, params: t.params, props: t.props, site: r.site, adapterName: r.adapterName, locales: t.locales, routingStrategy: t.routing, defaultLocale: t.defaultLocale });
    switch (t.route.type) {
      case "page":
      case "fallback":
      case "redirect":
        return n ? await Yd(n, o, () => Zd({ mod: s, renderContext: t, env: r, cookies: o.cookies })) : await Zd({ mod: s, renderContext: t, env: r, cookies: o.cookies });
      case "endpoint":
        return await _x(s, r, t, n);
      default:
        throw new Error(`Couldn't find route of type [${t.route.type}]`);
    }
  }
  onBeforeRenderRoute(t) {
    this.#t.before.push(t);
  }
};
var Ms2 = class extends Rs2 {
};
var Dx = Symbol.for("astro.locals");
var Rx = Symbol.for("astro.clientAddress");
var qd = Symbol.for("astro.responseSent");
var Mx = /* @__PURE__ */ new Set([404, 500]);
var _e4, _t4, _r3, _n4, _o4, _s4, _a6, _l3, _u3, u_fn2, _m3, m_fn2, _h3, h_fn2, _f3, f_fn2, _a5, _d3, d_fn2, _i3, i_fn2, _c3, c_fn2, _g3, g_fn2, _p2, p_fn2;
var Es2 = (_a5 = class {
  constructor(t, r = true) {
    __privateAdd(this, _u3);
    __privateAdd(this, _m3);
    __privateAdd(this, _h3);
    __privateAdd(this, _f3);
    __privateAdd(this, _d3);
    __privateAdd(this, _i3);
    __privateAdd(this, _c3);
    __privateAdd(this, _g3);
    __privateAdd(this, _p2);
    __privateAdd(this, _e4, void 0);
    __privateAdd(this, _t4, void 0);
    __privateAdd(this, _r3, void 0);
    __privateAdd(this, _n4, new Et2({ dest: ox, level: "info" }));
    __privateAdd(this, _o4, void 0);
    __privateAdd(this, _s4, void 0);
    __privateAdd(this, _a6, void 0);
    __privateAdd(this, _l3, false);
    __privateSet(this, _e4, t), __privateSet(this, _t4, { routes: t.routes.map((s) => s.routeData) }), __privateSet(this, _r3, new Map(t.routes.map((s) => [s.routeData, s]))), __privateSet(this, _o4, Rt2(__privateGet(this, _e4).base)), __privateSet(this, _s4, new Ms2(__privateMethod(this, _u3, u_fn2).call(this, r))), __privateSet(this, _a6, new st2(__privateGet(this, _n4).options, __privateGet(this, _e4).adapterName));
  }
  getAdapterLogger() {
    return __privateGet(this, _a6);
  }
  set setManifestData(t) {
    __privateSet(this, _t4, t);
  }
  removeBase(t) {
    return t.startsWith(__privateGet(this, _e4).base) ? t.slice(__privateGet(this, _o4).length + 1) : t;
  }
  match(t) {
    let r = new URL(t.url);
    if (__privateGet(this, _e4).assets.has(r.pathname))
      return;
    let s = __privateMethod(this, _h3, h_fn2).call(this, t);
    s || (s = xe2(this.removeBase(r.pathname)));
    let n = Bd(s, __privateGet(this, _t4));
    if (!(!n || n.prerender))
      return n;
  }
  async render(t, r, s) {
    let n, o, a, i;
    if (r && ("addCookieHeader" in r || "clientAddress" in r || "locals" in r || "routeData" in r) ? ("addCookieHeader" in r && (i = r.addCookieHeader), "clientAddress" in r && (a = r.clientAddress), "routeData" in r && (n = r.routeData), "locals" in r && (o = r.locals)) : (n = r, o = s, (r || o) && __privateMethod(this, _f3, f_fn2).call(this)), o && Reflect.set(t, Dx, o), a && Reflect.set(t, Rx, a), t.url !== ss2(t.url) && (t = new Request(ss2(t.url), t)), n || (n = this.match(t)), !n)
      return __privateMethod(this, _i3, i_fn2).call(this, t, { status: 404 });
    let l = __privateMethod(this, _m3, m_fn2).call(this, t), d = __privateMethod(this, _g3, g_fn2).call(this, n, l), c = await __privateMethod(this, _p2, p_fn2).call(this, n), u = await c.page(), h = new URL(t.url), $ = await __privateMethod(this, _d3, d_fn2).call(this, h, t, n, c, d), S;
    try {
      let A = Qb(__privateGet(this, _e4).i18n, __privateGet(this, _e4).base, __privateGet(this, _e4).trailingSlash, __privateGet(this, _e4).buildFormat);
      A ? (__privateGet(this, _s4).setMiddlewareFunction(kx(A, __privateGet(this, _e4).middleware)), __privateGet(this, _s4).onBeforeRenderRoute(ex)) : __privateGet(this, _s4).setMiddlewareFunction(__privateGet(this, _e4).middleware), S = await __privateGet(this, _s4).renderRoute($, u);
    } catch (A) {
      return __privateGet(this, _n4).error(null, A.stack || A.message || String(A)), __privateMethod(this, _i3, i_fn2).call(this, t, { status: 500 });
    }
    if (Mx.has(S.status) && S.headers.get(et2) !== "no")
      return __privateMethod(this, _i3, i_fn2).call(this, t, { response: S, status: S.status });
    if (S.headers.has(et2) && S.headers.delete(et2), i)
      for (let A of _a5.getSetCookieFromResponse(S))
        S.headers.append("set-cookie", A);
    return Reflect.set(S, qd, true), S;
  }
  setCookieHeaders(t) {
    return Od(t);
  }
}, _e4 = new WeakMap(), _t4 = new WeakMap(), _r3 = new WeakMap(), _n4 = new WeakMap(), _o4 = new WeakMap(), _s4 = new WeakMap(), _a6 = new WeakMap(), _l3 = new WeakMap(), _u3 = new WeakSet(), u_fn2 = function(t = false) {
  return { adapterName: __privateGet(this, _e4).adapterName, logger: __privateGet(this, _n4), mode: "production", compressHTML: __privateGet(this, _e4).compressHTML, renderers: __privateGet(this, _e4).renderers, clientDirectives: __privateGet(this, _e4).clientDirectives, resolve: async (r) => {
    if (!(r in __privateGet(this, _e4).entryModules))
      throw new Error(`Unable to resolve [${r}]`);
    let s = __privateGet(this, _e4).entryModules[r];
    switch (true) {
      case s.startsWith("data:"):
      case s.length === 0:
        return s;
      default:
        return Us2(s, __privateGet(this, _e4).base, __privateGet(this, _e4).assetsPrefix);
    }
  }, routeCache: new Is2(__privateGet(this, _n4)), site: __privateGet(this, _e4).site, ssr: true, streaming: t };
}, _m3 = new WeakSet(), m_fn2 = function(t) {
  let r = new URL(t.url);
  return xe2(this.removeBase(r.pathname));
}, _h3 = new WeakSet(), h_fn2 = function(t) {
  let r, s = new URL(t.url);
  if (__privateGet(this, _e4).i18n && (__privateGet(this, _e4).i18n.routing === "domains-prefix-always" || __privateGet(this, _e4).i18n.routing === "domains-prefix-other-locales" || __privateGet(this, _e4).i18n.routing === "domains-prefix-always-no-redirect")) {
    let n = t.headers.get("X-Forwarded-Host"), o = t.headers.get("X-Forwarded-Proto");
    if (o ? o = o + ":" : o = s.protocol, n || (n = t.headers.get("Host")), n && o) {
      n = n.split(":")[0];
      try {
        let a, i = new URL(`${o}//${n}`);
        for (let [l, d] of Object.entries(__privateGet(this, _e4).i18n.domainLookupTable)) {
          let c = new URL(l);
          if (i.host === c.host && i.protocol === c.protocol) {
            a = d;
            break;
          }
        }
        a && (r = xe2(_e3(q2(a), this.removeBase(s.pathname))), s.pathname.endsWith("/") && (r = rs2(r)));
      } catch (a) {
        __privateGet(this, _n4).error("router", `Astro tried to parse ${o}//${n} as an URL, but it threw a parsing error. Check the X-Forwarded-Host and X-Forwarded-Proto headers.`), __privateGet(this, _n4).error("router", `Error: ${a}`);
      }
    }
  }
  return r;
}, _f3 = new WeakSet(), f_fn2 = function() {
  __privateGet(this, _l3) || (__privateGet(this, _n4).warn("deprecated", `The adapter ${__privateGet(this, _e4).adapterName} is using a deprecated signature of the 'app.render()' method. From Astro 4.0, locals and routeData are provided as properties on an optional object to this method. Using the old signature will cause an error in Astro 5.0. See https://github.com/withastro/astro/pull/9199 for more information.`), __privateSet(this, _l3, true));
}, _d3 = new WeakSet(), d_fn2 = async function(t, r, s, n, o = 200) {
  if (s.type === "endpoint") {
    let a = "/" + this.removeBase(t.pathname), l = await n.page();
    return await Fd({ request: r, pathname: a, route: s, status: o, env: __privateGet(this, _s4).env, mod: l, locales: __privateGet(this, _e4).i18n?.locales, routing: __privateGet(this, _e4).i18n?.routing, defaultLocale: __privateGet(this, _e4).i18n?.defaultLocale });
  } else {
    let a = xe2(this.removeBase(t.pathname)), i = __privateGet(this, _r3).get(s), l = /* @__PURE__ */ new Set(), d = jx(i.styles), c = /* @__PURE__ */ new Set();
    for (let h of i.scripts)
      "stage" in h ? h.stage === "head-inline" && c.add({ props: {}, children: h.children }) : c.add(Ax(h));
    let u = await n.page();
    return await Fd({ request: r, pathname: a, componentMetadata: __privateGet(this, _e4).componentMetadata, scripts: c, styles: d, links: l, route: s, status: o, mod: u, env: __privateGet(this, _s4).env, locales: __privateGet(this, _e4).i18n?.locales, routing: __privateGet(this, _e4).i18n?.routing, defaultLocale: __privateGet(this, _e4).i18n?.defaultLocale });
  }
}, _i3 = new WeakSet(), i_fn2 = async function(t, { status: r, response: s, skipMiddleware: n = false }) {
  let o = `/${r}${__privateGet(this, _e4).trailingSlash === "always" ? "/" : ""}`, a = Bd(o, __privateGet(this, _t4)), i = new URL(t.url);
  if (a) {
    if (a.prerender) {
      let c = a.route.endsWith(`/${r}`) ? ".html" : "", u = new URL(`${__privateGet(this, _o4)}/${r}${c}`, i), h = await fetch(u.toString()), $ = { status: r };
      return __privateMethod(this, _c3, c_fn2).call(this, h, s, $);
    }
    let d = await __privateMethod(this, _p2, p_fn2).call(this, a);
    try {
      let c = await __privateMethod(this, _d3, d_fn2).call(this, i, t, a, d, r), u = await d.page();
      n === false && __privateGet(this, _s4).setMiddlewareFunction(__privateGet(this, _e4).middleware), n && __privateGet(this, _s4).unsetMiddlewareFunction();
      let h = await __privateGet(this, _s4).renderRoute(c, u);
      return __privateMethod(this, _c3, c_fn2).call(this, h, s);
    } catch {
      if (n === false)
        return __privateMethod(this, _i3, i_fn2).call(this, t, { status: r, response: s, skipMiddleware: true });
    }
  }
  let l = __privateMethod(this, _c3, c_fn2).call(this, new Response(null, { status: r }), s);
  return Reflect.set(l, qd, true), l;
}, _c3 = new WeakSet(), c_fn2 = function(t, r, s) {
  if (!r)
    return s !== void 0 ? new Response(t.body, { status: s.status, statusText: t.statusText, headers: t.headers }) : t;
  let n = s?.status ? s.status : r.status === 200 ? t.status : r.status;
  try {
    r.headers.delete("Content-type");
  } catch {
  }
  return new Response(t.body, { status: n, statusText: n === 200 ? t.statusText : r.statusText, headers: new Headers([...Array.from(t.headers), ...Array.from(r.headers)]) });
}, _g3 = new WeakSet(), g_fn2 = function(t, r) {
  if (!t.pattern.exec(r)) {
    for (let n of t.fallbackRoutes)
      if (n.pattern.test(r))
        return 302;
  }
  let s = Rt2(t.route);
  return s.endsWith("/404") ? 404 : s.endsWith("/500") ? 500 : 200;
}, _p2 = new WeakSet(), p_fn2 = async function(t) {
  if (t.type === "redirect")
    return lx;
  if (__privateGet(this, _e4).pageMap) {
    let r = __privateGet(this, _e4).pageMap.get(t.component);
    if (!r)
      throw new Error(`Unexpectedly unable to find a component instance for route ${t.route}`);
    return await r();
  } else {
    if (__privateGet(this, _e4).pageModule)
      return __privateGet(this, _e4).pageModule;
    throw new Error("Astro couldn't find the correct page to render, probably because it wasn't correctly mapped for SSR usage. This is an internal error, please file an issue.");
  }
}, __publicField(_a5, "getSetCookieFromResponse", Od), _a5);
var Ex = typeof process == "object" && Object.prototype.toString.call(process) === "[object process]";
function Px() {
  return new Proxy({}, { get: (e3, t) => {
    console.warn(`Unable to access \`import.meta\0.env.${t.toString()}\` on initialization as the Cloudflare platform only provides the environment variables per request. Please move the environment variable access inside a function that's only called after a request has been received.`);
  } });
}
Ex || (process.env = Px());
function ip(e3) {
  let t = new Es2(e3);
  return { onRequest: async (s) => {
    let n = s.request, { env: o } = s;
    process.env = o;
    let { pathname: a } = new URL(n.url);
    if (e3.assets.has(a))
      return o.ASSETS.fetch(n);
    let i = t.match(n);
    Reflect.set(n, Symbol.for("astro.clientAddress"), n.headers.get("cf-connecting-ip"));
    let l = { runtime: { waitUntil: (c) => {
      s.waitUntil(c);
    }, env: s.env, cf: n.cf, caches } }, d = await t.render(n, { routeData: i, locals: l });
    if (t.setCookieHeaders)
      for (let c of t.setCookieHeaders(d))
        d.headers.append("Set-Cookie", c);
    return d;
  }, manifest: e3 };
}
var Gd = Object.freeze(Object.defineProperty({ __proto__: null, createExports: ip }, Symbol.toStringTag, { value: "Module" }));
var Lx = () => Promise.resolve().then(() => (uo2(), po2));
var Ux = () => Promise.resolve().then(() => (yo2(), go2));
var Nx = () => Promise.resolve().then(() => (_o3(), xo));
var Ox = () => Promise.resolve().then(() => (Co2(), Ao));
var Hx = () => Promise.resolve().then(() => (Ro2(), Do2));
var zx = () => Promise.resolve().then(() => (Ad(), jd));
var Fx = () => Promise.resolve().then(() => (Id(), $d));
var Vx = () => Promise.resolve().then(() => (Ld(), Pd));
var Bx = /* @__PURE__ */ new Map([["node_modules/astro/dist/assets/endpoint/generic.js", Lx], ["src/pages/404.astro", Ux], ["src/pages/about.astro", Nx], ["src/pages/gear/coffee.astro", Ox], ["src/pages/gear/photography.astro", Hx], ["src/pages/post/config.ts", zx], ["src/pages/post/[...slug].astro", Fx], ["src/pages/index.astro", Vx]]);
var cp = Object.assign(Gn2, { pageMap: Bx, renderers: Z2, middleware: Xn2 });
var Wx = void 0;
var lp = ip(cp);
var L2 = lp.onRequest;
var U22 = lp.manifest;
var Xd = "start";
Xd in Gd && Gd[Xd](cp, Wx);

// ../.wrangler/tmp/pages-TRdlNn/functionsRoutes-0.0035798878668711342.mjs
var routes = [
  {
    routePath: "/api/echo",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest]
  },
  {
    routePath: "/api/:proxy*",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [Aa]
  },
  {
    routePath: "/:path*",
    mountPath: "/",
    method: "",
    middlewares: [],
    modules: [L2]
  }
];

// ../node_modules/.pnpm/path-to-regexp@6.2.1/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j2 = i + 1;
      while (j2 < str.length) {
        var code = str.charCodeAt(j2);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j2++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j2;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j2 = i + 1;
      if (str[j2] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j2));
      }
      while (j2 < str.length) {
        if (str[j2] === "\\") {
          pattern += str[j2++] + str[j2++];
          continue;
        }
        if (str[j2] === ")") {
          count--;
          if (count === 0) {
            j2++;
            break;
          }
        } else if (str[j2] === "(") {
          count++;
          if (str[j2 + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j2));
          }
        }
        pattern += str[j2++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j2;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a7 = options.prefixes, prefixes = _a7 === void 0 ? "./" : _a7;
  var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a8 = tokens[i], nextType = _a8.type, index = _a8.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || defaultPattern,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function match(str, options) {
  var keys = [];
  var re3 = pathToRegexp(str, keys, options);
  return regexpToFunction(re3, keys, options);
}
function regexpToFunction(re3, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a7 = options.decode, decode = _a7 === void 0 ? function(x3) {
    return x3;
  } : _a7;
  return function(pathname) {
    var m2 = re3.exec(pathname);
    if (!m2)
      return false;
    var path = m2[0], index = m2.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m2[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m2[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m2[i2], key);
      }
    };
    for (var i = 1; i < m2.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a7 = options.strict, strict = _a7 === void 0 ? false : _a7, _b2 = options.start, start = _b2 === void 0 ? true : _b2, _c4 = options.end, end = _c4 === void 0 ? true : _c4, _d4 = options.encode, encode = _d4 === void 0 ? function(x3) {
    return x3;
  } : _d4, _e5 = options.delimiter, delimiter = _e5 === void 0 ? "/#?" : _e5, _f4 = options.endsWith, endsWith = _f4 === void 0 ? "" : _f4;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i4 = 0, tokens_1 = tokens; _i4 < tokens_1.length; _i4++) {
    var token = tokens_1[_i4];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            route += "((?:".concat(token.pattern, ")").concat(token.modifier, ")");
          } else {
            route += "(".concat(token.pattern, ")").concat(token.modifier);
          }
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}

// ../node_modules/.pnpm/wrangler@3.28.2_@cloudflare+workers-types@4.20240208.0/node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: () => {
            isFailOpen = true;
          }
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    };
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = (response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
);

// ../node_modules/.pnpm/wrangler@3.28.2_@cloudflare+workers-types@4.20240208.0/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e3) {
  return {
    name: e3?.name,
    message: e3?.message ?? String(e3),
    stack: e3?.stack,
    cause: e3?.cause === void 0 ? void 0 : reduceError(e3.cause)
  };
}
var jsonError = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e3) {
    const error = reduceError(e3);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
};
var middleware_miniflare3_json_error_default = jsonError;
var wrap = void 0;

// ../.wrangler/tmp/bundle-cNz84T/middleware-insertion-facade.js
var envWrappers = [wrap].filter(Boolean);
var facade = {
  ...pages_template_worker_default,
  envWrappers,
  middleware: [
    middleware_miniflare3_json_error_default,
    ...pages_template_worker_default.middleware ? pages_template_worker_default.middleware : []
  ].filter(Boolean)
};
var middleware_insertion_facade_default = facade;

// ../node_modules/.pnpm/wrangler@3.28.2_@cloudflare+workers-types@4.20240208.0/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}

// ../.wrangler/tmp/bundle-cNz84T/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
var __facade_modules_fetch__ = function(request, env, ctx) {
  if (middleware_insertion_facade_default.fetch === void 0)
    throw new Error("Handler does not export a fetch() function.");
  return middleware_insertion_facade_default.fetch(request, env, ctx);
};
function getMaskedEnv(rawEnv) {
  let env = rawEnv;
  if (middleware_insertion_facade_default.envWrappers && middleware_insertion_facade_default.envWrappers.length > 0) {
    for (const wrapFn of middleware_insertion_facade_default.envWrappers) {
      env = wrapFn(env);
    }
  }
  return env;
}
var registeredMiddleware = false;
var facade2 = {
  ...middleware_insertion_facade_default.tail && {
    tail: maskHandlerEnv(middleware_insertion_facade_default.tail)
  },
  ...middleware_insertion_facade_default.trace && {
    trace: maskHandlerEnv(middleware_insertion_facade_default.trace)
  },
  ...middleware_insertion_facade_default.scheduled && {
    scheduled: maskHandlerEnv(middleware_insertion_facade_default.scheduled)
  },
  ...middleware_insertion_facade_default.queue && {
    queue: maskHandlerEnv(middleware_insertion_facade_default.queue)
  },
  ...middleware_insertion_facade_default.test && {
    test: maskHandlerEnv(middleware_insertion_facade_default.test)
  },
  ...middleware_insertion_facade_default.email && {
    email: maskHandlerEnv(middleware_insertion_facade_default.email)
  },
  fetch(request, rawEnv, ctx) {
    const env = getMaskedEnv(rawEnv);
    if (middleware_insertion_facade_default.middleware && middleware_insertion_facade_default.middleware.length > 0) {
      if (!registeredMiddleware) {
        registeredMiddleware = true;
        for (const middleware of middleware_insertion_facade_default.middleware) {
          __facade_register__(middleware);
        }
      }
      const __facade_modules_dispatch__ = function(type, init) {
        if (type === "scheduled" && middleware_insertion_facade_default.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return middleware_insertion_facade_default.scheduled(controller, env, ctx);
        }
      };
      return __facade_invoke__(
        request,
        env,
        ctx,
        __facade_modules_dispatch__,
        __facade_modules_fetch__
      );
    } else {
      return __facade_modules_fetch__(request, env, ctx);
    }
  }
};
function maskHandlerEnv(handler) {
  return (data, env, ctx) => handler(data, getMaskedEnv(env), ctx);
}
var middleware_loader_entry_default = facade2;
export {
  middleware_loader_entry_default as default
};
/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

cssesc/cssesc.js:
  (*! https://mths.be/cssesc v3.0.0 by @mathias *)
*/
/*! Bundled license information:

cssesc/cssesc.js:
  (*! https://mths.be/cssesc v3.0.0 by @mathias *)

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
//# sourceMappingURL=functionsWorker-0.899448445731992.mjs.map

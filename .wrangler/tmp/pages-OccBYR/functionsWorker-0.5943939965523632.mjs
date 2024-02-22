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

// ../.wrangler/tmp/bundle-X7GrUK/checked-fetch.js
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
function onRequest(context) {
  console.log(context);
  console.log("function called");
  return new Response((/* @__PURE__ */ new Date()).toString());
}

// [[path]].js
globalThis.process = {
  argv: [],
  env: {}
};
var qn = Object.create;
var Oe = Object.defineProperty;
var zn = Object.getOwnPropertyDescriptor;
var Vn = Object.getOwnPropertyNames;
var Bn = Object.getPrototypeOf;
var Gn = Object.prototype.hasOwnProperty;
var C = (e2, t) => () => (e2 && (t = e2(e2 = 0)), t);
var ae = (e2, t) => () => (t || e2((t = { exports: {} }).exports, t), t.exports);
var se = (e2, t) => {
  for (var r in t)
    Oe(e2, r, { get: t[r], enumerable: true });
};
var Jn = (e2, t, r, n) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let a of Vn(t))
      !Gn.call(e2, a) && a !== r && Oe(e2, a, { get: () => t[a], enumerable: !(n = zn(t, a)) || n.enumerable });
  return e2;
};
var H = (e2, t, r) => (r = e2 != null ? qn(Bn(e2)) : {}, Jn(t || !e2 || !e2.__esModule ? Oe(r, "default", { value: e2, enumerable: true }) : r, e2));
var G;
var ye = C(() => {
  "use strict";
  G = [];
});
function Ue(e2) {
  return e2.endsWith("/") ? e2 : e2 + "/";
}
function J(e2) {
  return e2[0] === "/" ? e2 : "/" + e2;
}
function De(e2) {
  return e2.replace(/(?<!:)\/\/+/g, "/");
}
function we(e2) {
  return e2.endsWith("/") ? e2.slice(0, e2.length - 1) : e2;
}
function Yn(e2) {
  return e2.startsWith("/") ? e2.substring(1) : e2;
}
function He(e2) {
  return e2.replace(/^\/|\/$/g, "");
}
function Xn(e2) {
  return typeof e2 == "string" || e2 instanceof String;
}
function _(...e2) {
  return e2.filter(Xn).map((t, r) => r === 0 ? we(t) : r === e2.length - 1 ? Yn(t) : He(t)).join("/");
}
function Y(e2) {
  return /^(http|ftp|https|ws):?\/\//.test(e2) || e2.startsWith("data:");
}
function Fe(e2) {
  return e2.replace(/\\/g, "/");
}
var ie = C(() => {
});
var qe = ae((We) => {
  "use strict";
  We.parse = Qn;
  We.serialize = Zn;
  var Kn = Object.prototype.toString, be = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
  function Qn(e2, t) {
    if (typeof e2 != "string")
      throw new TypeError("argument str must be a string");
    for (var r = {}, n = t || {}, a = n.decode || ea, s = 0; s < e2.length; ) {
      var i = e2.indexOf("=", s);
      if (i === -1)
        break;
      var o = e2.indexOf(";", s);
      if (o === -1)
        o = e2.length;
      else if (o < i) {
        s = e2.lastIndexOf(";", i - 1) + 1;
        continue;
      }
      var l = e2.slice(s, i).trim();
      if (r[l] === void 0) {
        var d = e2.slice(i + 1, o).trim();
        d.charCodeAt(0) === 34 && (d = d.slice(1, -1)), r[l] = na(d, a);
      }
      s = o + 1;
    }
    return r;
  }
  function Zn(e2, t, r) {
    var n = r || {}, a = n.encode || ta;
    if (typeof a != "function")
      throw new TypeError("option encode is invalid");
    if (!be.test(e2))
      throw new TypeError("argument name is invalid");
    var s = a(t);
    if (s && !be.test(s))
      throw new TypeError("argument val is invalid");
    var i = e2 + "=" + s;
    if (n.maxAge != null) {
      var o = n.maxAge - 0;
      if (isNaN(o) || !isFinite(o))
        throw new TypeError("option maxAge is invalid");
      i += "; Max-Age=" + Math.floor(o);
    }
    if (n.domain) {
      if (!be.test(n.domain))
        throw new TypeError("option domain is invalid");
      i += "; Domain=" + n.domain;
    }
    if (n.path) {
      if (!be.test(n.path))
        throw new TypeError("option path is invalid");
      i += "; Path=" + n.path;
    }
    if (n.expires) {
      var l = n.expires;
      if (!ra(l) || isNaN(l.valueOf()))
        throw new TypeError("option expires is invalid");
      i += "; Expires=" + l.toUTCString();
    }
    if (n.httpOnly && (i += "; HttpOnly"), n.secure && (i += "; Secure"), n.partitioned && (i += "; Partitioned"), n.priority) {
      var d = typeof n.priority == "string" ? n.priority.toLowerCase() : n.priority;
      switch (d) {
        case "low":
          i += "; Priority=Low";
          break;
        case "medium":
          i += "; Priority=Medium";
          break;
        case "high":
          i += "; Priority=High";
          break;
        default:
          throw new TypeError("option priority is invalid");
      }
    }
    if (n.sameSite) {
      var c = typeof n.sameSite == "string" ? n.sameSite.toLowerCase() : n.sameSite;
      switch (c) {
        case true:
          i += "; SameSite=Strict";
          break;
        case "lax":
          i += "; SameSite=Lax";
          break;
        case "strict":
          i += "; SameSite=Strict";
          break;
        case "none":
          i += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    }
    return i;
  }
  function ea(e2) {
    return e2.indexOf("%") !== -1 ? decodeURIComponent(e2) : e2;
  }
  function ta(e2) {
    return encodeURIComponent(e2);
  }
  function ra(e2) {
    return Kn.call(e2) === "[object Date]" || e2 instanceof Date;
  }
  function na(e2, t) {
    try {
      return t(e2);
    } catch {
      return e2;
    }
  }
});
function A(e2, t) {
  let r = new RegExp(`\\x1b\\[${t}m`, "g"), n = `\x1B[${e2}m`, a = `\x1B[${t}m`;
  return function(s) {
    return !aa.enabled || s == null ? s : n + (~("" + s).indexOf(a) ? s.replace(r, a + n) : s) + a;
  };
}
var ze;
var zt;
var Vt;
var Bt;
var Gt;
var aa;
var Gi;
var ve;
var Ve;
var Ji;
var Yi;
var Xi;
var Ki;
var Qi;
var Zi;
var Jt;
var eo;
var Yt;
var Xt;
var to;
var ro;
var no;
var ao;
var so;
var io;
var oo;
var co;
var lo;
var po;
var uo;
var fo;
var mo;
var oe = C(() => {
  Gt = true;
  typeof process < "u" && ({ FORCE_COLOR: ze, NODE_DISABLE_COLORS: zt, NO_COLOR: Vt, TERM: Bt } = process.env || {}, Gt = process.stdout && process.stdout.isTTY);
  aa = { enabled: !zt && Vt == null && Bt !== "dumb" && (ze != null && ze !== "0" || Gt) };
  Gi = A(0, 0), ve = A(1, 22), Ve = A(2, 22), Ji = A(3, 23), Yi = A(4, 24), Xi = A(7, 27), Ki = A(8, 28), Qi = A(9, 29), Zi = A(30, 39), Jt = A(31, 39), eo = A(32, 39), Yt = A(33, 39), Xt = A(34, 39), to = A(35, 39), ro = A(36, 39), no = A(37, 39), ao = A(90, 39), so = A(90, 39), io = A(40, 49), oo = A(41, 49), co = A(42, 49), lo = A(43, 49), po = A(44, 49), uo = A(45, 49), fo = A(46, 49), mo = A(47, 49);
});
var sa;
var ia;
var oa;
var ca;
var Kt;
var X = C(() => {
  ({ replace: sa } = ""), ia = /[&<>'"]/g, oa = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }, ca = (e2) => oa[e2], Kt = (e2) => sa.call(e2, ia, ca);
});
function Qt(e2) {
  var t, r, n = "";
  if (typeof e2 == "string" || typeof e2 == "number")
    n += e2;
  else if (typeof e2 == "object")
    if (Array.isArray(e2)) {
      var a = e2.length;
      for (t = 0; t < a; t++)
        e2[t] && (r = Qt(e2[t])) && (n && (n += " "), n += r);
    } else
      for (r in e2)
        e2[r] && (n && (n += " "), n += r);
  return n;
}
function Be() {
  for (var e2, t, r = 0, n = "", a = arguments.length; r < a; r++)
    (e2 = arguments[r]) && (t = Qt(e2)) && (n && (n += " "), n += t);
  return n;
}
var K = C(() => {
});
var ce = ae((wo, Zt) => {
  "use strict";
  var la = {}, da = la.hasOwnProperty, pa = function(t, r) {
    if (!t)
      return r;
    var n = {};
    for (var a in r)
      n[a] = da.call(t, a) ? t[a] : r[a];
    return n;
  }, ua = /[ -,\.\/:-@\[-\^`\{-~]/, fa = /[ -,\.\/:-@\[\]\^`\{-~]/, ma = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g, Ge = function e2(t, r) {
    r = pa(r, e2.options), r.quotes != "single" && r.quotes != "double" && (r.quotes = "single");
    for (var n = r.quotes == "double" ? '"' : "'", a = r.isIdentifier, s = t.charAt(0), i = "", o = 0, l = t.length; o < l; ) {
      var d = t.charAt(o++), c = d.charCodeAt(), p = void 0;
      if (c < 32 || c > 126) {
        if (c >= 55296 && c <= 56319 && o < l) {
          var u = t.charCodeAt(o++);
          (u & 64512) == 56320 ? c = ((c & 1023) << 10) + (u & 1023) + 65536 : o--;
        }
        p = "\\" + c.toString(16).toUpperCase() + " ";
      } else
        r.escapeEverything ? ua.test(d) ? p = "\\" + d : p = "\\" + c.toString(16).toUpperCase() + " " : /[\t\n\f\r\x0B]/.test(d) ? p = "\\" + c.toString(16).toUpperCase() + " " : d == "\\" || !a && (d == '"' && n == d || d == "'" && n == d) || a && fa.test(d) ? p = "\\" + d : p = d;
      i += p;
    }
    return a && (/^-[-\d]/.test(i) ? i = "\\-" + i.slice(1) : /\d/.test(s) && (i = "\\3" + s + " " + i.slice(1))), i = i.replace(ma, function(v, m, g) {
      return m && m.length % 2 ? v : (m || "") + g;
    }), !a && r.wrap ? n + i + n : i;
  };
  Ge.options = { escapeEverything: false, isIdentifier: false, quotes: "single", wrap: false };
  Ge.version = "3.0.0";
  Zt.exports = Ge;
});
function ga(e2) {
  return e2.replace(/\r\n|\r(?!\n)|\n/g, `
`);
}
function ya(e2, t) {
  if (!t || t.line === void 0 || t.column === void 0)
    return "";
  let r = ga(e2).split(`
`).map((i) => i.replace(/\t/g, "  ")), n = [];
  for (let i = -2; i <= 2; i++)
    r[t.line + i] && n.push(t.line + i);
  let a = 0;
  for (let i of n) {
    let o = `> ${i}`;
    o.length > a && (a = o.length);
  }
  let s = "";
  for (let i of n) {
    let o = i === t.line - 1;
    s += o ? "> " : "  ", s += `${i + 1} | ${r[i]}
`, o && (s += `${Array.from({ length: a }).join(" ")}  | ${Array.from({ length: t.column }).join(" ")}^
`);
  }
  return s;
}
function wa(e2) {
  return !(e2.length !== 3 || !e2[0] || typeof e2[0] != "object");
}
function xr(e2, t, r) {
  let n = t?.split("/").pop()?.replace(".astro", "") ?? "", a = (...s) => {
    if (!wa(s))
      throw new f({ ...nr, message: nr.message(n) });
    return e2(...s);
  };
  return Object.defineProperty(a, "name", { value: n, writable: false }), a.isAstroComponentFactory = true, a.moduleId = t, a.propagation = r, a;
}
function ba(e2) {
  return xr(e2.factory, e2.moduleId, e2.propagation);
}
function q(e2, t, r) {
  return typeof e2 == "function" ? xr(e2, t, r) : ba(e2);
}
function va() {
  return (t) => {
    if (typeof t == "string")
      throw new f({ ...ar, message: ar.message(JSON.stringify(t)) });
    let r = [...Object.values(t)];
    if (r.length === 0)
      throw new f({ ...sr, message: sr.message(JSON.stringify(t)) });
    return Promise.all(r.map((n) => n()));
  };
}
function z(e2) {
  return { site: e2 ? new URL(e2) : void 0, generator: `Astro v${wt}`, glob: va() };
}
async function vt(e2, t, r, n) {
  let { request: a, url: s } = t, i = a.method.toUpperCase(), o = e2[i] ?? e2.ALL;
  if (!r && r === false && i !== "GET" && n.warn("router", `${s.pathname} ${ve(i)} requests are not available for a static site. Update your config to \`output: 'server'\` or \`output: 'hybrid'\` to enable.`), o === void 0)
    return n.warn("router", `No API Route handler exists for the method "${i}" for the route "${s.pathname}".
Found handlers: ${Object.keys(e2).map((d) => JSON.stringify(d)).join(", ")}
` + ("all" in e2 ? `One of the exported handlers is "all" (lowercase), did you mean to export 'ALL'?
` : "")), new Response(null, { status: 404 });
  if (typeof o != "function")
    return n.error("router", `The route "${s.pathname}" exports a value for the method "${i}", but it is of the type ${typeof o} instead of a function.`), new Response(null, { status: 500 });
  let l = await o.call(e2, t);
  return (l.status === 404 || l.status === 500) && l.headers.set(ue, "no"), l;
}
function xt(e2) {
  return !!e2 && typeof e2 == "object" && typeof e2.then == "function";
}
function xa(e2) {
  return Object.prototype.toString.call(e2) === "[object HTMLString]";
}
function ir(e2) {
  return e2 && typeof e2 == "object" && e2[Sr];
}
function xe(e2) {
  return Object.defineProperty(e2, Ar, { value: true });
}
function Sa(e2) {
  return e2 && typeof e2 == "object" && e2[Ar];
}
function Xe(e2, t = {}, r = /* @__PURE__ */ new WeakSet()) {
  if (r.has(e2))
    throw new Error(`Cyclic reference detected while serializing props for <${t.displayName} client:${t.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  r.add(e2);
  let n = e2.map((a) => $r(a, t, r));
  return r.delete(e2), n;
}
function jr(e2, t = {}, r = /* @__PURE__ */ new WeakSet()) {
  if (r.has(e2))
    throw new Error(`Cyclic reference detected while serializing props for <${t.displayName} client:${t.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  r.add(e2);
  let n = Object.fromEntries(Object.entries(e2).map(([a, s]) => [a, $r(s, t, r)]));
  return r.delete(e2), n;
}
function $r(e2, t = {}, r = /* @__PURE__ */ new WeakSet()) {
  switch (Object.prototype.toString.call(e2)) {
    case "[object Date]":
      return [L.Date, e2.toISOString()];
    case "[object RegExp]":
      return [L.RegExp, e2.source];
    case "[object Map]":
      return [L.Map, Xe(Array.from(e2), t, r)];
    case "[object Set]":
      return [L.Set, Xe(Array.from(e2), t, r)];
    case "[object BigInt]":
      return [L.BigInt, e2.toString()];
    case "[object URL]":
      return [L.URL, e2.toString()];
    case "[object Array]":
      return [L.JSON, Xe(e2, t, r)];
    case "[object Uint8Array]":
      return [L.Uint8Array, Array.from(e2)];
    case "[object Uint16Array]":
      return [L.Uint16Array, Array.from(e2)];
    case "[object Uint32Array]":
      return [L.Uint32Array, Array.from(e2)];
    default:
      return e2 !== null && typeof e2 == "object" ? [L.Value, jr(e2, t, r)] : e2 === void 0 ? [L.Value] : [L.Value, e2];
  }
}
function Er(e2, t) {
  return JSON.stringify(jr(e2, t));
}
function Aa(e2, t) {
  let r = { isPage: false, hydration: null, props: {}, propsWithoutTransitionAttributes: {} };
  for (let [n, a] of Object.entries(e2))
    if (n.startsWith("server:") && n === "server:root" && (r.isPage = true), n.startsWith("client:"))
      switch (r.hydration || (r.hydration = { directive: "", value: "", componentUrl: "", componentExport: { value: "" } }), n) {
        case "client:component-path": {
          r.hydration.componentUrl = a;
          break;
        }
        case "client:component-export": {
          r.hydration.componentExport.value = a;
          break;
        }
        case "client:component-hydration":
          break;
        case "client:display-name":
          break;
        default: {
          if (r.hydration.directive = n.split(":")[1], r.hydration.value = a, !t.has(r.hydration.directive)) {
            let s = Array.from(t.keys()).map((i) => `client:${i}`).join(", ");
            throw new Error(`Error: invalid hydration directive "${n}". Supported hydration methods: ${s}`);
          }
          if (r.hydration.directive === "media" && typeof r.hydration.value != "string")
            throw new f(ha);
          break;
        }
      }
    else
      r.props[n] = a, Rr.includes(n) || (r.propsWithoutTransitionAttributes[n] = a);
  for (let n of Object.getOwnPropertySymbols(e2))
    r.props[n] = e2[n], r.propsWithoutTransitionAttributes[n] = e2[n];
  return r;
}
async function ja(e2, t) {
  let { renderer: r, result: n, astroId: a, props: s, attrs: i } = e2, { hydrate: o, componentUrl: l, componentExport: d } = t;
  if (!d.value)
    throw new f({ ...rr, message: rr.message(t.displayName) });
  let c = { children: "", props: { uid: a } };
  if (i)
    for (let [u, v] of Object.entries(i))
      c.props[u] = de(v);
  c.props["component-url"] = await n.resolve(decodeURI(l)), r.clientEntrypoint && (c.props["component-export"] = d.value, c.props["renderer-url"] = await n.resolve(decodeURI(r.clientEntrypoint)), c.props.props = de(Er(s, t))), c.props.ssr = "", c.props.client = o;
  let p = await n.resolve("astro:scripts/before-hydration.js");
  return p.length && (c.props["before-hydration-url"] = p), c.props.opts = de(JSON.stringify({ name: t.displayName, value: t.hydrateArgs || "" })), Rr.forEach((u) => {
    s[u] && (c.props[u] = s[u]);
  }), c;
}
function $a(e2) {
  let t = 0;
  if (e2.length === 0)
    return t;
  for (let r = 0; r < e2.length; r++) {
    let n = e2.charCodeAt(r);
    t = (t << 5) - t + n, t = t & t;
  }
  return t;
}
function Ea(e2) {
  let t, r = "", n = $a(e2), a = n < 0 ? "Z" : "";
  for (n = Math.abs(n); n >= Ke; )
    t = n % Ke, n = Math.floor(n / Ke), r = Ze[t] + r;
  return n > 0 && (r = Ze[n] + r), a + r;
}
function Tr(e2) {
  return e2 == null ? false : e2.isAstroComponentFactory === true;
}
function Ra(e2, t) {
  let r = t.propagation || "none";
  return t.moduleId && e2.componentMetadata.has(t.moduleId) && r === "none" && (r = e2.componentMetadata.get(t.moduleId).propagation), r === "in-tree" || r === "self";
}
function St(e2) {
  return typeof e2 == "object" && !!e2[Ta];
}
function Ca(e2) {
  return e2._metadata.hasHydrationScript ? false : e2._metadata.hasHydrationScript = true;
}
function Ia(e2, t) {
  return e2._metadata.hasDirectives.has(t) ? false : (e2._metadata.hasDirectives.add(t), true);
}
function or(e2, t) {
  let n = e2.clientDirectives.get(t);
  if (!n)
    throw new Error(`Unknown directive: ${t}`);
  return n;
}
function ka(e2, t, r) {
  switch (t) {
    case "both":
      return `${La}<script>${or(e2, r)};${Pa}<\/script>`;
    case "directive":
      return `<script>${or(e2, r)}<\/script>`;
  }
  return "";
}
function Ha(e2) {
  let t = "";
  for (let [r, n] of Object.entries(e2))
    t += `const ${Ua(r)} = ${JSON.stringify(n)?.replace(/<\/script>/g, "\\x3C/script>")};
`;
  return x(t);
}
function lr(e2) {
  return e2.length === 1 ? e2[0] : `${e2.slice(0, -1).join(", ")} or ${e2[e2.length - 1]}`;
}
function I(e2, t, r = true) {
  if (e2 == null)
    return "";
  if (e2 === false)
    return _a.test(t) || Na.test(t) ? x(` ${t}="false"`) : "";
  if (Oa.has(t))
    return console.warn(`[astro] The "${t}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${t}={value}\`) instead of the dynamic spread syntax (\`{...{ "${t}": value }}\`).`), "";
  if (t === "class:list") {
    let n = Q(Be(e2), r);
    return n === "" ? "" : x(` ${t.slice(0, -5)}="${n}"`);
  }
  if (t === "style" && !(e2 instanceof W)) {
    if (Array.isArray(e2) && e2.length === 2)
      return x(` ${t}="${Q(`${cr(e2[0])};${e2[1]}`, r)}"`);
    if (typeof e2 == "object")
      return x(` ${t}="${Q(cr(e2), r)}"`);
  }
  return t === "className" ? x(` class="${Q(e2, r)}"`) : e2 === true && (t.startsWith("data-") || Ma.test(t)) ? x(` ${t}`) : x(` ${t}="${Q(e2, r)}"`);
}
function et(e2, t = true) {
  let r = "";
  for (let [n, a] of Object.entries(e2))
    r += I(a, n, t);
  return x(r);
}
function le(e2, { props: t, children: r = "" }, n = true) {
  let { lang: a, "data-astro-id": s, "define:vars": i, ...o } = t;
  return i && (e2 === "style" && (delete o["is:global"], delete o["is:scoped"]), e2 === "script" && (delete o.hoist, r = Ha(i) + `
` + r)), (r == null || r == "") && At.test(e2) ? `<${e2}${et(o, n)} />` : `<${e2}${et(o, n)}>${r}</${e2}>`;
}
function Pr(e2) {
  let t = [], r = { write: (a) => t.push(a) }, n = e2(r);
  return { async renderToFinalDestination(a) {
    for (let s of t)
      a.write(s);
    r.write = (s) => a.write(s), await n;
  } };
}
function dr(e2) {
  e2._metadata.hasRenderedHead = true;
  let t = Array.from(e2.styles).filter(Qe).map((s) => s.props.rel === "stylesheet" ? le("link", s) : le("style", s));
  e2.styles.clear();
  let r = Array.from(e2.scripts).filter(Qe).map((s) => le("script", s, false)), n = Array.from(e2.links).filter(Qe).map((s) => le("link", s, false)), a = t.join(`
`) + n.join(`
`) + r.join(`
`);
  if (e2._metadata.extraHead.length > 0)
    for (let s of e2._metadata.extraHead)
      a += s;
  return x(a);
}
function* Lr() {
  yield xe({ type: "head" });
}
function* V() {
  yield xe({ type: "maybe-head" });
}
function Fa(e2) {
  return !!e2[tt];
}
function Pe(e2, t, r) {
  return !t && r ? Pe(e2, r) : { async render(n) {
    await Z(n, typeof t == "function" ? t(e2) : t);
  } };
}
async function B(e2, t, r) {
  let n = "", a = null, s = { write(o) {
    o instanceof Response || (typeof o == "object" && "type" in o && typeof o.type == "string" ? (a === null && (a = []), a.push(o)) : n += O(e2, o));
  } };
  return await Pe(e2, t, r).render(s), x(new Se(n, a));
}
async function Cr(e2, t = {}) {
  let r = null, n = {};
  return t && await Promise.all(Object.entries(t).map(([a, s]) => B(e2, s).then((i) => {
    i.instructions && (r === null && (r = []), r.push(...i.instructions)), n[a] = i;
  }))), { slotInstructions: r, children: n };
}
function jt(e2, t) {
  if (Sa(t)) {
    let r = t;
    switch (r.type) {
      case "directive": {
        let { hydration: n } = r, a = n && Ca(e2), s = n && Ia(e2, n.directive), i = a ? "both" : s ? "directive" : null;
        if (i) {
          let o = ka(e2, i, n.directive);
          return x(o);
        } else
          return "";
      }
      case "head":
        return e2._metadata.hasRenderedHead || e2.partial ? "" : dr(e2);
      case "maybe-head":
        return e2._metadata.hasRenderedHead || e2._metadata.headInTree || e2.partial ? "" : dr(e2);
      case "renderer-hydration-script": {
        let { rendererSpecificHydrationScripts: n } = e2._metadata, { rendererName: a } = r;
        return n.has(a) ? "" : (n.add(a), r.render());
      }
      default:
        throw new Error(`Unknown chunk type: ${t.type}`);
    }
  } else {
    if (t instanceof Response)
      return "";
    if (Fa(t)) {
      let r = "", n = t;
      if (n.instructions)
        for (let a of n.instructions)
          r += jt(e2, a);
      return r += t.toString(), r;
    }
  }
  return t.toString();
}
function O(e2, t) {
  return ArrayBuffer.isView(t) ? qa.decode(t) : jt(e2, t);
}
function za(e2, t) {
  if (ArrayBuffer.isView(t))
    return t;
  {
    let r = jt(e2, t);
    return Ae.encode(r.toString());
  }
}
function Va(e2) {
  return !!e2 && typeof e2 == "object" && "render" in e2 && typeof e2.render == "function";
}
async function Z(e2, t) {
  if (t = await t, t instanceof Se)
    e2.write(t);
  else if (xa(t))
    e2.write(t);
  else if (Array.isArray(t)) {
    let r = t.map((n) => Pr((a) => Z(a, n)));
    for (let n of r)
      n && await n.renderToFinalDestination(e2);
  } else if (typeof t == "function")
    await Z(e2, t());
  else if (typeof t == "string")
    e2.write(x(de(t)));
  else if (!(!t && t !== 0))
    if (Va(t))
      await t.render(e2);
    else if (Mr(t))
      await t.render(e2);
    else if (Ja(t))
      await t.render(e2);
    else if (ArrayBuffer.isView(t))
      e2.write(t);
    else if (typeof t == "object" && (Symbol.asyncIterator in t || Symbol.iterator in t))
      for await (let r of t)
        await Z(e2, r);
    else
      e2.write(t);
}
function Ba(e2, t) {
  if (e2 != null)
    for (let r of Object.keys(e2))
      r.startsWith("client:") && console.warn(`You are attempting to render <${t} ${r} />, but ${t} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`);
}
function Ga(e2, t, r, n, a = {}) {
  Ba(n, t);
  let s = new rt(e2, n, a, r);
  return Ra(e2, r) && e2._metadata.propagators.add(s), s;
}
function Ja(e2) {
  return typeof e2 == "object" && !!e2[Ir];
}
function Mr(e2) {
  return typeof e2 == "object" && !!e2[kr];
}
function k(e2, ...t) {
  return new nt(e2, t);
}
async function _r(e2, t, r, n, a = false, s) {
  let i = await Nr(e2, t, r, n, s);
  if (i instanceof Response)
    return i;
  let o = "", l = false, d = { write(c) {
    if (a && !l && (l = true, !e2.partial && !/<!doctype html/i.test(String(c)))) {
      let p = e2.compressHTML ? "<!DOCTYPE html>" : `<!DOCTYPE html>
`;
      o += p;
    }
    c instanceof Response || (o += O(e2, c));
  } };
  return await i.render(d), o;
}
async function Ya(e2, t, r, n, a = false, s) {
  let i = await Nr(e2, t, r, n, s);
  if (i instanceof Response)
    return i;
  let o = false;
  return a && await Xa(e2), new ReadableStream({ start(l) {
    let d = { write(c) {
      if (a && !o && (o = true, !e2.partial && !/<!doctype html/i.test(String(c)))) {
        let u = e2.compressHTML ? "<!DOCTYPE html>" : `<!DOCTYPE html>
`;
        l.enqueue(Ae.encode(u));
      }
      if (c instanceof Response)
        throw new f({ ...Ee });
      let p = za(e2, c);
      l.enqueue(p);
    } };
    (async () => {
      try {
        await i.render(d), l.close();
      } catch (c) {
        f.is(c) && !c.loc && c.setLocation({ file: s?.component }), setTimeout(() => l.error(c), 0);
      }
    })();
  } });
}
async function Nr(e2, t, r, n, a) {
  let s = await t(e2, r, n);
  if (s instanceof Response)
    return s;
  if (!Mr(s))
    throw new f({ ...er, message: er.message(a?.route, typeof s), location: { file: a?.component } });
  return St(s) ? s.content : s;
}
async function Xa(e2) {
  let t = e2._metadata.propagators.values();
  for (; ; ) {
    let { value: r, done: n } = t.next();
    if (n)
      break;
    let a = await r.init(e2);
    St(a) && e2._metadata.extraHead.push(a.head);
  }
}
function Ka(e2) {
  return typeof HTMLElement < "u" && HTMLElement.isPrototypeOf(e2);
}
async function Qa(e2, t, r, n) {
  let a = Za(t), s = "";
  for (let i in r)
    s += ` ${i}="${Q(await r[i])}"`;
  return x(`<${a}${s}>${await B(e2, n?.default)}</${a}>`);
}
function Za(e2) {
  let t = customElements.getName(e2);
  return t || e2.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
}
function ts(e2) {
  switch (e2?.split(".").pop()) {
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
function rs(e2) {
  return e2 === Wa;
}
function ns(e2) {
  return e2 && e2["astro:html"] === true;
}
function is(e2, t) {
  let r = t ? ss : as;
  return e2.replace(r, "");
}
async function os(e2, t, r, n, a = {}) {
  if (!r && !n["client:only"])
    throw new Error(`Unable to render ${t} because it is ${r}!
Did you forget to import the component or is it possible there is a typo?`);
  let { renderers: s, clientDirectives: i } = e2, o = { astroStaticSlot: true, displayName: t }, { hydration: l, isPage: d, props: c, propsWithoutTransitionAttributes: p } = Aa(n, i), u = "", v;
  l && (o.hydrate = l.directive, o.hydrateArgs = l.value, o.componentExport = l.componentExport, o.componentUrl = l.componentUrl);
  let m = ts(o.componentUrl), g = s.filter((h) => h.name !== "astro:jsx"), { children: y, slotInstructions: w } = await Cr(e2, a), b;
  if (o.hydrate !== "only") {
    let h = false;
    try {
      h = r && r[pr];
    } catch {
    }
    if (h) {
      let S = r[pr];
      b = s.find(({ name: j }) => j === S);
    }
    if (!b) {
      let S;
      for (let j of s)
        try {
          if (await j.ssr.check.call({ result: e2 }, r, c, y)) {
            b = j;
            break;
          }
        } catch (ne) {
          S ??= ne;
        }
      if (!b && S)
        throw S;
    }
    if (!b && typeof HTMLElement == "function" && Ka(r)) {
      let S = await Qa(e2, r, n, a);
      return { render(j) {
        j.write(S);
      } };
    }
  } else {
    if (o.hydrateArgs) {
      let h = o.hydrateArgs, S = ur.has(h) ? ur.get(h) : h;
      b = s.find(({ name: j }) => j === `@astrojs/${S}` || j === S);
    }
    if (!b && g.length === 1 && (b = g[0]), !b) {
      let h = o.componentUrl?.split(".").pop();
      b = s.filter(({ name: S }) => S === `@astrojs/${h}` || S === h)[0];
    }
  }
  if (b)
    o.hydrate === "only" ? u = await B(e2, a?.fallback) : { html: u, attrs: v } = await b.ssr.renderToStaticMarkup.call({ result: e2 }, r, p, y, o);
  else {
    if (o.hydrate === "only")
      throw new f({ ...Ye, message: Ye.message(o.displayName), hint: Ye.hint(m.map((h) => h.replace("@astrojs/", "")).join("|")) });
    if (typeof r != "string") {
      let h = g.filter((j) => m.includes(j.name)), S = g.length > 1;
      if (h.length === 0)
        throw new f({ ...Je, message: Je.message(o.displayName, o?.componentUrl?.split(".").pop(), S, g.length), hint: Je.hint(lr(m.map((j) => "`" + j + "`"))) });
      if (h.length === 1)
        b = h[0], { html: u, attrs: v } = await b.ssr.renderToStaticMarkup.call({ result: e2 }, r, p, y, o);
      else
        throw new Error(`Unable to render ${o.displayName}!

This component likely uses ${lr(m)},
but Astro encountered an error during server-side rendering.

Please ensure that ${o.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
    }
  }
  if (b && !b.clientEntrypoint && b.name !== "@astrojs/lit" && o.hydrate)
    throw new f({ ...tr, message: tr.message(t, o.hydrate, b.name) });
  if (!u && typeof r == "string") {
    let h = cs(r), S = Object.values(y).join(""), j = k`<${h}${et(c)}${x(S === "" && At.test(h) ? "/>" : `>${S}</${h}>`)}`;
    u = "";
    let ne = { write(qt) {
      qt instanceof Response || (u += O(e2, qt));
    } };
    await j.render(ne);
  }
  if (!l)
    return { render(h) {
      if (w)
        for (let S of w)
          h.write(S);
      d || b?.name === "astro:jsx" ? h.write(u) : u && u.length > 0 && h.write(x(is(u, b?.ssr?.supportsAstroStaticSlot ?? false)));
    } };
  let T = Ea(`<!--${o.componentExport.value}:${o.componentUrl}-->
${u}
${Er(c, o)}`), E = await ja({ renderer: b, result: e2, astroId: T, props: c, attrs: v }, o), R = [];
  if (u) {
    if (Object.keys(y).length > 0)
      for (let h of Object.keys(y)) {
        let S = b?.ssr?.supportsAstroStaticSlot ? o.hydrate ? "astro-slot" : "astro-static-slot" : "astro-slot", j = h === "default" ? `<${S}>` : `<${S} name="${h}">`;
        u.includes(j) || R.push(h);
      }
  } else
    R = Object.keys(y);
  let P = R.length > 0 ? R.map((h) => `<template data-astro-template${h !== "default" ? `="${h}"` : ""}>${y[h]}</template>`).join("") : "";
  return E.children = `${u ?? ""}${P}`, E.children && (E.props["await-children"] = "", E.children += "<!--astro:end-->"), { render(h) {
    if (w)
      for (let S of w)
        h.write(S);
    h.write(xe({ type: "directive", hydration: l })), l.directive !== "only" && b?.ssr.renderHydrationScript && h.write(xe({ type: "renderer-hydration-script", rendererName: b.name, render: b.ssr.renderHydrationScript })), h.write(x(le("astro-island", E, false)));
  } };
}
function cs(e2) {
  let t = /[&<>'"\s]+/;
  return t.test(e2) ? e2.trim().split(t)[0].trim() : e2;
}
async function ls(e2, t = {}) {
  let r = await B(e2, t?.default);
  return { render(n) {
    r != null && n.write(r);
  } };
}
async function ds(e2, t, r, n = {}) {
  let { slotInstructions: a, children: s } = await Cr(e2, n), i = t({ slots: s }), o = a ? a.map((l) => O(e2, l)).join("") : "";
  return { render(l) {
    l.write(x(o + i));
  } };
}
function ps(e2, t, r, n, a = {}) {
  let s = Ga(e2, t, r, n, a);
  return { async render(i) {
    await s.render(i);
  } };
}
async function U(e2, t, r, n, a = {}) {
  return xt(r) && (r = await r), rs(r) ? await ls(e2, a) : (n = us(n), ns(r) ? await ds(e2, r, n, a) : Tr(r) ? ps(e2, t, r, n, a) : await os(e2, t, r, n, a));
}
function us(e2) {
  if (e2["class:list"] !== void 0) {
    let t = e2["class:list"];
    delete e2["class:list"], e2.class = Be(e2.class, t), e2.class === "" && delete e2.class;
  }
  return e2;
}
async function at(e2, t, r, n, a = {}, s = false, i) {
  let o = "", l = false, d = "";
  if (fs(r))
    for (let c of V())
      d += O(e2, c);
  try {
    let c = { write(u) {
      if (s && !l && (l = true, !e2.partial && !/<!doctype html/i.test(String(u)))) {
        let v = e2.compressHTML ? "<!DOCTYPE html>" : `<!DOCTYPE html>
`;
        o += v + d;
      }
      u instanceof Response || (o += O(e2, u));
    } };
    await (await U(e2, t, r, n, a)).render(c);
  } catch (c) {
    throw f.is(c) && !c.loc && c.setLocation({ file: i?.component }), c;
  }
  return o;
}
function fs(e2) {
  return !!e2?.[es];
}
async function N(e2, t) {
  switch (true) {
    case t instanceof W:
      return t.toString().trim() === "" ? "" : t;
    case typeof t == "string":
      return x(de(t));
    case typeof t == "function":
      return t;
    case (!t && t !== 0):
      return "";
    case Array.isArray(t):
      return x((await Promise.all(t.map((n) => N(e2, n)))).join(""));
  }
  let r;
  return t.props ? t.props[F.symbol] ? r = t.props[F.symbol] : r = new F(t) : r = new F(t), it(e2, t, r);
}
async function it(e2, t, r) {
  if (ir(t)) {
    switch (true) {
      case !t.type:
        throw new Error(`Unable to render ${e2.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`);
      case t.type === Symbol.for("astro:fragment"):
        return N(e2, t.props.children);
      case t.type.isAstroComponentFactory: {
        let n = {}, a = {};
        for (let [o, l] of Object.entries(t.props ?? {}))
          o === "children" || l && typeof l == "object" && l.$$slot ? a[o === "children" ? "default" : o] = () => N(e2, l) : n[o] = l;
        let s = await _r(e2, t.type, n, a);
        if (s instanceof Response)
          throw s;
        return x(s);
      }
      case (!t.type && t.type !== 0):
        return "";
      case (typeof t.type == "string" && t.type !== fr):
        return x(await ms(e2, t.type, t.props ?? {}));
    }
    if (t.type) {
      let n = function(c) {
        if (Array.isArray(c))
          return c.map((p) => n(p));
        if (!ir(c)) {
          i.default.push(c);
          return;
        }
        if ("slot" in c.props) {
          i[c.props.slot] = [...i[c.props.slot] ?? [], c], delete c.props.slot;
          return;
        }
        i.default.push(c);
      };
      if (typeof t.type == "function" && t.type["astro:renderer"] && r.increment(), typeof t.type == "function" && t.props["server:root"]) {
        let c = await t.type(t.props ?? {});
        return await N(e2, c);
      }
      if (typeof t.type == "function")
        if (r.haveNoTried() || r.isCompleted()) {
          gs();
          try {
            let c = await t.type(t.props ?? {}), p;
            if (c?.[Sr])
              return p = await it(e2, c, r), p;
            if (!c)
              return p = await it(e2, c, r), p;
          } catch (c) {
            if (r.isCompleted())
              throw c;
            r.increment();
          } finally {
            ys();
          }
        } else
          r.increment();
      let { children: a = null, ...s } = t.props ?? {}, i = { default: [] };
      n(a);
      for (let [c, p] of Object.entries(s))
        p.$$slot && (i[c] = p, delete s[c]);
      let o = [], l = {};
      for (let [c, p] of Object.entries(i))
        o.push(N(e2, p).then((u) => {
          u.toString().trim().length !== 0 && (l[c] = () => u);
        }));
      await Promise.all(o), s[F.symbol] = r;
      let d;
      return t.type === fr && t.props["client:only"] ? d = await at(e2, t.props["client:display-name"] ?? "", null, s, l) : d = await at(e2, typeof t.type == "function" ? t.type.name : t.type, t.type, s, l), x(d);
    }
  }
  return x(`${t}`);
}
async function ms(e2, t, { children: r, ...n }) {
  return x(`<${t}${D(n)}${x((r == null || r == "") && At.test(t) ? "/>" : `>${r == null ? "" : await N(e2, hs(t, r))}</${t}>`)}`);
}
function hs(e2, t) {
  return typeof t == "string" && (e2 === "style" || e2 === "script") ? x(t) : t;
}
function gs() {
  if ($t++, !st) {
    st = console.error;
    try {
      console.error = ws;
    } catch {
    }
  }
}
function ys() {
  $t--;
}
function ws(e2, ...t) {
  $t > 0 && typeof e2 == "string" && e2.includes("Warning: Invalid hook call.") && e2.includes("https://reactjs.org/link/invalid-hook-call") || st(e2, ...t);
}
async function Or(e2, t, r, n, a, s) {
  if (!Tr(t)) {
    e2._metadata.headInTree = e2.componentMetadata.get(t.moduleId)?.containsHead ?? false;
    let c = { ...r ?? {}, "server:root": true }, p = await at(e2, t.name, t, c, {}, true, s), u = Ae.encode(p);
    return new Response(u, { headers: new Headers([["Content-Type", "text/html; charset=utf-8"], ["Content-Length", u.byteLength.toString()]]) });
  }
  e2._metadata.headInTree = e2.componentMetadata.get(t.moduleId)?.containsHead ?? false;
  let i;
  if (a ? i = await Ya(e2, t, r, n, true, s) : i = await _r(e2, t, r, n, true, s), i instanceof Response)
    return i;
  let o = e2.response, l = new Headers(o.headers);
  return !a && typeof i == "string" && (i = Ae.encode(i), l.set("Content-Length", i.byteLength.toString())), s?.component.endsWith(".md") && l.set("Content-Type", "text/html; charset=utf-8"), new Response(i, { ...o, headers: l });
}
function D(e2 = {}, t, { class: r } = {}) {
  let n = "";
  r && (typeof e2.class < "u" ? e2.class += ` ${r}` : typeof e2["class:list"] < "u" ? e2["class:list"] = [e2["class:list"], r] : e2.class = r);
  for (let [a, s] of Object.entries(e2))
    n += I(s, a, true);
  return x(n);
}
var So;
var pe;
var ot;
var je;
var er;
var ha;
var Je;
var tr;
var Ye;
var ct;
var lt;
var mr;
var dt;
var hr;
var pt;
var rr;
var nr;
var ut;
var ft;
var gr;
var mt;
var ht;
var yr;
var $e;
var ee;
var gt;
var wr;
var Ee;
var br;
var Re;
var Te;
var yt;
var ar;
var sr;
var vr;
var f;
var wt;
var bt;
var ue;
var de;
var W;
var x;
var Sr;
var Ar;
var L;
var Rr;
var Ze;
var Ke;
var Ta;
var Pa;
var La;
var At;
var Ma;
var _a;
var Na;
var Oa;
var Ua;
var Q;
var Da;
var cr;
var Qe;
var tt;
var Se;
var Wa;
var pr;
var Ae;
var qa;
var Ir;
var rt;
var kr;
var nt;
var es;
var ur;
var as;
var ss;
var fr;
var F;
var st;
var $t;
var te = C(() => {
  "use strict";
  oe();
  X();
  K();
  So = H(ce(), 1), pe = { name: "ClientAddressNotAvailable", title: "`Astro.clientAddress` is not available in current adapter.", message: (e2) => `\`Astro.clientAddress\` is not available in the \`${e2}\` adapter. File an issue with the adapter to add support.` }, ot = { name: "StaticClientAddressNotAvailable", title: "`Astro.clientAddress` is not available in static mode.", message: "`Astro.clientAddress` is only available when using `output: 'server'` or `output: 'hybrid'`. Update your Astro config if you need SSR features.", hint: "See https://docs.astro.build/en/guides/server-side-rendering/ for more information on how to enable SSR." }, je = { name: "NoMatchingStaticPathFound", title: "No static path found for requested path.", message: (e2) => `A \`getStaticPaths()\` route pattern was matched, but no matching static path was found for requested path \`${e2}\`.`, hint: (e2) => `Possible dynamic routes being matched: ${e2.join(", ")}.` }, er = { name: "OnlyResponseCanBeReturned", title: "Invalid type returned by Astro page.", message: (e2, t) => `Route \`${e2 || ""}\` returned a \`${t}\`. Only a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) can be returned from Astro files.`, hint: "See https://docs.astro.build/en/guides/server-side-rendering/#response for more information." }, ha = { name: "MissingMediaQueryDirective", title: "Missing value for `client:media` directive.", message: 'Media query not provided for `client:media` directive. A media query similar to `client:media="(max-width: 600px)"` must be provided' }, Je = { name: "NoMatchingRenderer", title: "No matching renderer found.", message: (e2, t, r, n) => `Unable to render \`${e2}\`.

${n > 0 ? `There ${r ? "are" : "is"} ${n} renderer${r ? "s" : ""} configured in your \`astro.config.mjs\` file,
but ${r ? "none were" : "it was not"} able to server-side render \`${e2}\`.` : `No valid renderer was found ${t ? `for the \`.${t}\` file extension.` : "for this file extension."}`}`, hint: (e2) => `Did you mean to enable the ${e2} integration?

See https://docs.astro.build/en/guides/framework-components/ for more information on how to install and configure integrations.` }, tr = { name: "NoClientEntrypoint", title: "No client entrypoint specified in renderer.", message: (e2, t, r) => `\`${e2}\` component has a \`client:${t}\` directive, but no client entrypoint was provided by \`${r}\`.`, hint: "See https://docs.astro.build/en/reference/integrations-reference/#addrenderer-option for more information on how to configure your renderer." }, Ye = { name: "NoClientOnlyHint", title: "Missing hint on client:only directive.", message: (e2) => `Unable to render \`${e2}\`. When using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.`, hint: (e2) => `Did you mean to pass \`client:only="${e2}"\`? See https://docs.astro.build/en/reference/directives-reference/#clientonly for more information on client:only` }, ct = { name: "InvalidGetStaticPathsEntry", title: "Invalid entry inside getStaticPath's return value", message: (e2) => `Invalid entry returned by getStaticPaths. Expected an object, got \`${e2}\``, hint: "If you're using a `.map` call, you might be looking for `.flatMap()` instead. See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths." }, lt = { name: "InvalidGetStaticPathsReturn", title: "Invalid value returned by getStaticPaths.", message: (e2) => `Invalid type returned by \`getStaticPaths\`. Expected an \`array\`, got \`${e2}\``, hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths." }, mr = { name: "GetStaticPathsExpectedParams", title: "Missing params property on `getStaticPaths` route.", message: "Missing or empty required `params` property on `getStaticPaths` route.", hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths." }, dt = { name: "GetStaticPathsInvalidRouteParam", title: "Invalid value for `getStaticPaths` route parameter.", message: (e2, t, r) => `Invalid getStaticPaths route parameter for \`${e2}\`. Expected undefined, a string or a number, received \`${r}\` (\`${t}\`)`, hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths." }, hr = { name: "GetStaticPathsRequired", title: "`getStaticPaths()` function required for dynamic routes.", message: "`getStaticPaths()` function is required for dynamic routes. Make sure that you `export` a `getStaticPaths` function from your dynamic route.", hint: 'See https://docs.astro.build/en/guides/routing/#dynamic-routes for more information on dynamic routes.\n\nAlternatively, set `output: "server"` or `output: "hybrid"` in your Astro config file to switch to a non-static server build. This error can also occur if using `export const prerender = true;`.\nSee https://docs.astro.build/en/guides/server-side-rendering/ for more information on non-static rendering.' }, pt = { name: "ReservedSlotName", title: "Invalid slot name.", message: (e2) => `Unable to create a slot named \`${e2}\`. \`${e2}\` is a reserved slot name. Please update the name of this slot.` }, rr = { name: "NoMatchingImport", title: "No import found for component.", message: (e2) => `Could not render \`${e2}\`. No matching import has been found for \`${e2}\`.`, hint: "Please make sure the component is properly imported." }, nr = { name: "InvalidComponentArgs", title: "Invalid component arguments.", message: (e2) => `Invalid arguments passed to${e2 ? ` <${e2}>` : ""} component.`, hint: "Astro components cannot be rendered directly via function call, such as `Component()` or `{items.map(Component)}`." }, ut = { name: "PageNumberParamNotFound", title: "Page number param not found.", message: (e2) => `[paginate()] page number param \`${e2}\` not found in your filepath.`, hint: "Rename your file to `[page].astro` or `[...page].astro`." }, ft = { name: "ImageMissingAlt", title: 'Image missing required "alt" property.', message: 'Image missing "alt" property. "alt" text is required to describe important images on the page.', hint: 'Use an empty string ("") for decorative images.' }, gr = { name: "InvalidImageService", title: "Error while loading image service.", message: "There was an error loading the configured image service. Please see the stack trace for more information." }, mt = { name: "MissingImageDimension", title: "Missing image dimensions", message: (e2, t) => `Missing ${e2 === "both" ? "width and height attributes" : `${e2} attribute`} for ${t}. When using remote images, both dimensions are always required in order to avoid CLS.`, hint: "If your image is inside your `src` folder, you probably meant to import it instead. See [the Imports guide for more information](https://docs.astro.build/en/guides/imports/#other-assets)." }, ht = { name: "UnsupportedImageFormat", title: "Unsupported image format", message: (e2, t, r) => `Received unsupported format \`${e2}\` from \`${t}\`. Currently only ${r.join(", ")} are supported by our image services.`, hint: "Using an `img` tag directly instead of the `Image` component might be what you're looking for." }, yr = { name: "UnsupportedImageConversion", title: "Unsupported image conversion", message: "Converting between vector (such as SVGs) and raster (such as PNGs and JPEGs) images is not currently supported." }, $e = { name: "PrerenderDynamicEndpointPathCollide", title: "Prerendered dynamic endpoint has path collision.", message: (e2) => `Could not render \`${e2}\` with an \`undefined\` param as the generated path will collide during prerendering. Prevent passing \`undefined\` as \`params\` for the endpoint's \`getStaticPaths()\` function, or add an additional extension to the endpoint's filename.`, hint: (e2) => `Rename \`${e2}\` to \`${e2.replace(/\.(?:js|ts)/, (t) => ".json" + t)}\`` }, ee = { name: "ExpectedImage", title: "Expected src to be an image.", message: (e2, t, r) => `Expected \`src\` property for \`getImage\` or \`<Image />\` to be either an ESM imported image or a string with the path of a remote image. Received \`${e2}\` (type: \`${t}\`).

Full serialized options received: \`${r}\`.`, hint: "This error can often happen because of a wrong path. Make sure the path to your image is correct. If you're passing an async function, make sure to call and await it." }, gt = { name: "ExpectedImageOptions", title: "Expected image options.", message: (e2) => `Expected getImage() parameter to be an object. Received \`${e2}\`.` }, wr = { name: "IncompatibleDescriptorOptions", title: "Cannot set both `densities` and `widths`", message: "Only one of `densities` or `widths` can be specified. In most cases, you'll probably want to use only `widths` if you require specific widths.", hint: "Those attributes are used to construct a `srcset` attribute, which cannot have both `x` and `w` descriptors." }, Ee = { name: "ResponseSentError", title: "Unable to set response.", message: "The response has already been sent to the browser and cannot be altered." }, br = { name: "MiddlewareNoDataOrNextCalled", title: "The middleware didn't return a `Response`.", message: "Make sure your middleware returns a `Response` object, either directly or by returning the `Response` from calling the `next` function." }, Re = { name: "MiddlewareNotAResponse", title: "The middleware returned something that is not a `Response` object.", message: "Any data returned from middleware must be a valid `Response` object." }, Te = { name: "LocalsNotAnObject", title: "Value assigned to `locals` is not accepted.", message: "`locals` can only be assigned to an object. Other values like numbers, strings, etc. are not accepted.", hint: "If you tried to remove some information from the `locals` object, try to use `delete` or set the property to `undefined`." }, yt = { name: "LocalImageUsedWrongly", title: "Local images must be imported.", message: (e2) => `\`Image\`'s and \`getImage\`'s \`src\` parameter must be an imported image or an URL, it cannot be a string filepath. Received \`${e2}\`.`, hint: "If you want to use an image from your `src` folder, you need to either import it or if the image is coming from a content collection, use the [image() schema helper](https://docs.astro.build/en/guides/images/#images-in-content-collections). See https://docs.astro.build/en/guides/images/#src-required for more information on the `src` property." }, ar = { name: "AstroGlobUsedOutside", title: "Astro.glob() used outside of an Astro file.", message: (e2) => `\`Astro.glob(${e2})\` can only be used in \`.astro\` files. \`import.meta.glob(${e2})\` can be used instead to achieve a similar result.`, hint: "See Vite's documentation on `import.meta.glob` for more information: https://vitejs.dev/guide/features.html#glob-import" }, sr = { name: "AstroGlobNoMatch", title: "Astro.glob() did not match any files.", message: (e2) => `\`Astro.glob(${e2})\` did not return any matching files.`, hint: "Check the pattern for typos." }, vr = { name: "CantRenderPage", title: "Astro can't render the route.", message: "Astro cannot find any content to render for this route. There is no file or redirect associated with this route.", hint: "If you expect to find a route here, this may be an Astro bug. Please file an issue/restart the dev server" };
  f = class extends Error {
    loc;
    title;
    hint;
    frame;
    type = "AstroError";
    constructor(t, r) {
      let { name: n, title: a, message: s, stack: i, location: o, hint: l, frame: d } = t;
      super(s, r), this.title = a, this.name = n, s && (this.message = s), this.stack = i || this.stack, this.loc = o, this.hint = l, this.frame = d;
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
      this.frame = ya(t, r);
    }
    static is(t) {
      return t.type === "AstroError";
    }
  }, wt = "4.3.7", bt = "astro.routeData", ue = "X-Astro-Reroute";
  de = Kt, W = class extends String {
    get [Symbol.toStringTag]() {
      return "HTMLString";
    }
  }, x = (e2) => e2 instanceof W ? e2 : typeof e2 == "string" ? new W(e2) : e2;
  Sr = "astro:jsx";
  Ar = Symbol.for("astro:render");
  L = { Value: 0, JSON: 1, RegExp: 2, Date: 3, Map: 4, Set: 5, BigInt: 6, URL: 7, Uint8Array: 8, Uint16Array: 9, Uint32Array: 10 };
  Rr = Object.freeze(["data-astro-transition-scope", "data-astro-transition-persist"]);
  Ze = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY", Ke = Ze.length;
  Ta = Symbol.for("astro.headAndContent");
  Pa = '(()=>{var b=Object.defineProperty;var f=(c,s,a)=>s in c?b(c,s,{enumerable:!0,configurable:!0,writable:!0,value:a}):c[s]=a;var l=(c,s,a)=>(f(c,typeof s!="symbol"?s+"":s,a),a);var p;{let c={0:t=>m(t),1:t=>a(t),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(a(t)),5:t=>new Set(a(t)),6:t=>BigInt(t),7:t=>new URL(t),8:t=>new Uint8Array(t),9:t=>new Uint16Array(t),10:t=>new Uint32Array(t)},s=t=>{let[e,r]=t;return e in c?c[e](r):void 0},a=t=>t.map(s),m=t=>typeof t!="object"||t===null?t:Object.fromEntries(Object.entries(t).map(([e,r])=>[e,s(r)]));customElements.get("astro-island")||customElements.define("astro-island",(p=class extends HTMLElement{constructor(){super(...arguments);l(this,"Component");l(this,"hydrator");l(this,"hydrate",async()=>{var d;if(!this.hydrator||!this.isConnected)return;let e=(d=this.parentElement)==null?void 0:d.closest("astro-island[ssr]");if(e){e.addEventListener("astro:hydrate",this.hydrate,{once:!0});return}let r=this.querySelectorAll("astro-slot"),o={},h=this.querySelectorAll("template[data-astro-template]");for(let n of h){let i=n.closest(this.tagName);i!=null&&i.isSameNode(this)&&(o[n.getAttribute("data-astro-template")||"default"]=n.innerHTML,n.remove())}for(let n of r){let i=n.closest(this.tagName);i!=null&&i.isSameNode(this)&&(o[n.getAttribute("name")||"default"]=n.innerHTML)}let u;try{u=this.hasAttribute("props")?m(JSON.parse(this.getAttribute("props"))):{}}catch(n){let i=this.getAttribute("component-url")||"<unknown>",y=this.getAttribute("component-export");throw y&&(i+=` (export ${y})`),console.error(`[hydrate] Error parsing props for component ${i}`,this.getAttribute("props"),n),n}await this.hydrator(this)(this.Component,u,o,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),this.dispatchEvent(new CustomEvent("astro:hydrate"))});l(this,"unmount",()=>{this.isConnected||this.dispatchEvent(new CustomEvent("astro:unmount"))})}disconnectedCallback(){document.removeEventListener("astro:after-swap",this.unmount),document.addEventListener("astro:after-swap",this.unmount,{once:!0})}connectedCallback(){if(!this.hasAttribute("await-children")||document.readyState==="interactive"||document.readyState==="complete")this.childrenConnectedCallback();else{let e=()=>{document.removeEventListener("DOMContentLoaded",e),r.disconnect(),this.childrenConnectedCallback()},r=new MutationObserver(()=>{var o;((o=this.lastChild)==null?void 0:o.nodeType)===Node.COMMENT_NODE&&this.lastChild.nodeValue==="astro:end"&&(this.lastChild.remove(),e())});r.observe(this,{childList:!0}),document.addEventListener("DOMContentLoaded",e)}}async childrenConnectedCallback(){let e=this.getAttribute("before-hydration-url");e&&await import(e),this.start()}async start(){let e=JSON.parse(this.getAttribute("opts")),r=this.getAttribute("client");if(Astro[r]===void 0){window.addEventListener(`astro:${r}`,()=>this.start(),{once:!0});return}try{await Astro[r](async()=>{let o=this.getAttribute("renderer-url"),[h,{default:u}]=await Promise.all([import(this.getAttribute("component-url")),o?import(o):()=>()=>{}]),d=this.getAttribute("component-export")||"default";if(!d.includes("."))this.Component=h[d];else{this.Component=h;for(let n of d.split("."))this.Component=this.Component[n]}return this.hydrator=u,this.hydrate},e,this)}catch(o){console.error(`[astro-island] Error hydrating ${this.getAttribute("component-url")}`,o)}}attributeChangedCallback(){this.hydrate()}},l(p,"observedAttributes",["props"]),p))}})();', La = "<style>astro-island,astro-slot,astro-static-slot{display:contents}</style>";
  At = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i, Ma = /^(?:allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i, _a = /^(?:contenteditable|draggable|spellcheck|value)$/i, Na = /^(?:autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i, Oa = /* @__PURE__ */ new Set(["set:html", "set:text"]), Ua = (e2) => e2.trim().replace(/(?!^)\b\w|\s+|\W+/g, (t, r) => /\W/.test(t) ? "" : r === 0 ? t : t.toUpperCase()), Q = (e2, t = true) => t ? String(e2).replace(/&/g, "&#38;").replace(/"/g, "&#34;") : e2, Da = (e2) => e2.toLowerCase() === e2 ? e2 : e2.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`), cr = (e2) => Object.entries(e2).filter(([t, r]) => typeof r == "string" && r.trim() || typeof r == "number").map(([t, r]) => t[0] !== "-" && t[1] !== "-" ? `${Da(t)}:${r}` : `${t}:${r}`).join(";");
  Qe = (e2, t, r) => {
    let n = JSON.stringify(e2.props), a = e2.children;
    return t === r.findIndex((s) => JSON.stringify(s.props) === n && s.children == a);
  };
  tt = Symbol.for("astro:slot-string"), Se = class extends W {
    instructions;
    [tt];
    constructor(t, r) {
      super(t), this.instructions = r, this[tt] = true;
    }
  };
  Wa = Symbol.for("astro:fragment"), pr = Symbol.for("astro:renderer"), Ae = new TextEncoder(), qa = new TextDecoder();
  Ir = Symbol.for("astro.componentInstance"), rt = class {
    [Ir] = true;
    result;
    props;
    slotValues;
    factory;
    returnValue;
    constructor(t, r, n, a) {
      this.result = t, this.props = r, this.factory = a, this.slotValues = {};
      for (let s in n) {
        let i = false, o = n[s](t);
        this.slotValues[s] = () => i ? n[s](t) : (i = true, o);
      }
    }
    async init(t) {
      return this.returnValue !== void 0 ? this.returnValue : (this.returnValue = this.factory(t, this.props, this.slotValues), this.returnValue);
    }
    async render(t) {
      this.returnValue === void 0 && await this.init(this.result);
      let r = this.returnValue;
      xt(r) && (r = await r), St(r) ? await r.content.render(t) : await Z(t, r);
    }
  };
  kr = Symbol.for("astro.renderTemplateResult"), nt = class {
    [kr] = true;
    htmlParts;
    expressions;
    error;
    constructor(t, r) {
      this.htmlParts = t, this.error = void 0, this.expressions = r.map((n) => xt(n) ? Promise.resolve(n).catch((a) => {
        if (!this.error)
          throw this.error = a, a;
      }) : n);
    }
    async render(t) {
      let r = this.expressions.map((n) => Pr((a) => {
        if (n || n === 0)
          return Z(a, n);
      }));
      for (let n = 0; n < this.htmlParts.length; n++) {
        let a = this.htmlParts[n], s = r[n];
        t.write(x(a)), s && await s.renderToFinalDestination(t);
      }
    }
  };
  es = Symbol.for("astro.needsHeadRendering"), ur = /* @__PURE__ */ new Map([["solid", "solid-js"]]);
  as = /<\/?astro-slot\b[^>]*>/g, ss = /<\/?astro-static-slot\b[^>]*>/g;
  fr = "astro-client-only", F = class {
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
  }, $t = 0;
});
var Gr = ae((_o2, Br) => {
  "use strict";
  function Ie() {
    this._types = /* @__PURE__ */ Object.create(null), this._extensions = /* @__PURE__ */ Object.create(null);
    for (let e2 = 0; e2 < arguments.length; e2++)
      this.define(arguments[e2]);
    this.define = this.define.bind(this), this.getType = this.getType.bind(this), this.getExtension = this.getExtension.bind(this);
  }
  Ie.prototype.define = function(e2, t) {
    for (let r in e2) {
      let n = e2[r].map(function(a) {
        return a.toLowerCase();
      });
      r = r.toLowerCase();
      for (let a = 0; a < n.length; a++) {
        let s = n[a];
        if (s[0] !== "*") {
          if (!t && s in this._types)
            throw new Error('Attempt to change mapping for "' + s + '" extension from "' + this._types[s] + '" to "' + r + '". Pass `force=true` to allow this, otherwise remove "' + s + '" from the list of extensions for "' + r + '".');
          this._types[s] = r;
        }
      }
      if (t || !this._extensions[r]) {
        let a = n[0];
        this._extensions[r] = a[0] !== "*" ? a : a.substr(1);
      }
    }
  };
  Ie.prototype.getType = function(e2) {
    e2 = String(e2);
    let t = e2.replace(/^.*[/\\]/, "").toLowerCase(), r = t.replace(/^.*\./, "").toLowerCase(), n = t.length < e2.length;
    return (r.length < t.length - 1 || !n) && this._types[r] || null;
  };
  Ie.prototype.getExtension = function(e2) {
    return e2 = /^\s*([^;\s]*)/.test(e2) && RegExp.$1, e2 && this._extensions[e2.toLowerCase()] || null;
  };
  Br.exports = Ie;
});
var Yr = ae((No, Jr) => {
  Jr.exports = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["es", "ecma"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/express": ["exp"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/trig": ["trig"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/step+xml": ["stpx"], "model/step+zip": ["stpz"], "model/step-xml+zip": ["stpxz"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
});
var Kr = ae((Oo, Xr) => {
  "use strict";
  var Ts = Gr();
  Xr.exports = new Ts(Yr());
});
var rn = {};
se(rn, { D: () => ke, a: () => Tt, b: () => Rt, c: () => Me, i: () => M, n: () => Ns });
function M(e2) {
  return typeof e2 == "object";
}
function Rt(e2) {
  return typeof e2 == "string";
}
function Ps(e2, t) {
  return Cs(e2, t.protocol) && tn(e2, t.hostname, true) && Ls(e2, t.port) && Is(e2, t.pathname, true);
}
function Ls(e2, t) {
  return !t || t === e2.port;
}
function Cs(e2, t) {
  return !t || t === e2.protocol.slice(0, -1);
}
function tn(e2, t, r) {
  if (t) {
    if (!r || !t.startsWith("*"))
      return t === e2.hostname;
    if (t.startsWith("**.")) {
      let n = t.slice(2);
      return n !== e2.hostname && e2.hostname.endsWith(n);
    } else if (t.startsWith("*.")) {
      let n = t.slice(1);
      return e2.hostname.replace(n, "").split(".").filter(Boolean).length === 1;
    }
  } else
    return true;
  return false;
}
function Is(e2, t, r) {
  if (t) {
    if (!r || !t.endsWith("*"))
      return t === e2.pathname;
    if (t.endsWith("/**")) {
      let n = t.slice(0, -2);
      return n !== e2.pathname && e2.pathname.startsWith(n);
    } else if (t.endsWith("/*")) {
      let n = t.slice(0, -1);
      return e2.pathname.replace(n, "").split("/").filter(Boolean).length === 1;
    }
  } else
    return true;
  return false;
}
function Me(e2, { domains: t = [], remotePatterns: r = [] }) {
  if (!Y(e2))
    return false;
  let n = new URL(e2);
  return t.some((a) => tn(n, a)) || r.some((a) => Ps(n, a));
}
function Tt(e2) {
  return e2 ? "transform" in e2 : false;
}
function en(e2) {
  let t = e2.width, r = e2.height;
  if (M(e2.src)) {
    let n = e2.src.width / e2.src.height;
    r && !t ? t = Math.round(r * n) : t && !r ? r = Math.round(t / n) : !t && !r && (t = e2.src.width, r = e2.src.height);
  }
  return { targetWidth: t, targetHeight: r };
}
var Qr;
var Zr;
var ke;
var ks;
var Ms;
var _s;
var Ns;
var Pt = C(() => {
  "use strict";
  ie();
  te();
  Qr = ["jpeg", "jpg", "png", "tiff", "webp", "gif", "svg", "avif"], Zr = "webp", ke = ["src", "width", "height", "format", "quality"];
  ks = { propertiesToHash: ke, validateOptions(e2) {
    if (!e2.src || typeof e2.src != "string" && typeof e2.src != "object")
      throw new f({ ...ee, message: ee.message(JSON.stringify(e2.src), typeof e2.src, JSON.stringify(e2, (t, r) => r === void 0 ? null : r)) });
    if (M(e2.src)) {
      if (!Qr.includes(e2.src.format))
        throw new f({ ...ht, message: ht.message(e2.src.format, e2.src.src, Qr) });
      if (e2.widths && e2.densities)
        throw new f(wr);
      if (e2.src.format === "svg" && (e2.format = "svg"), e2.src.format === "svg" && e2.format !== "svg" || e2.src.format !== "svg" && e2.format === "svg")
        throw new f(yr);
    } else {
      if (e2.src.startsWith("/@fs/") || !Y(e2.src) && !e2.src.startsWith("/"))
        throw new f({ ...yt, message: yt.message(e2.src) });
      let t;
      if (!e2.width && !e2.height ? t = "both" : !e2.width && e2.height ? t = "width" : e2.width && !e2.height && (t = "height"), t)
        throw new f({ ...mt, message: mt.message(t, e2.src) });
    }
    return e2.format || (e2.format = Zr), e2.width && (e2.width = Math.round(e2.width)), e2.height && (e2.height = Math.round(e2.height)), e2;
  }, getHTMLAttributes(e2) {
    let { targetWidth: t, targetHeight: r } = en(e2), { src: n, width: a, height: s, format: i, quality: o, densities: l, widths: d, formats: c, ...p } = e2;
    return { ...p, width: t, height: r, loading: p.loading ?? "lazy", decoding: p.decoding ?? "async" };
  }, getSrcSet(e2) {
    let t = [], { targetWidth: r } = en(e2), { widths: n, densities: a } = e2, s = e2.format ?? Zr, i = e2.width, o = 1 / 0;
    M(e2.src) && (i = e2.src.width, o = i);
    let { width: l, height: d, ...c } = e2, p = [];
    if (a) {
      let u = a.map((m) => typeof m == "number" ? m : parseFloat(m)), v = u.sort().map((m) => Math.round(r * m));
      p.push(...v.map((m, g) => ({ maxTargetWidth: Math.min(m, o), descriptor: `${u[g]}x` })));
    } else
      n && p.push(...n.map((u) => ({ maxTargetWidth: Math.min(u, o), descriptor: `${u}w` })));
    for (let { maxTargetWidth: u, descriptor: v } of p) {
      let m = { ...c };
      u !== i ? m.width = u : e2.width && e2.height && (m.width = e2.width, m.height = e2.height), t.push({ transform: m, descriptor: v, attributes: { type: `image/${s}` } });
    }
    return t;
  }, getURL(e2, t) {
    let r = new URLSearchParams();
    if (M(e2.src))
      r.append("href", e2.src.src);
    else if (Me(e2.src, t))
      r.append("href", e2.src);
    else
      return e2.src;
    return Object.entries({ w: "width", h: "height", q: "quality", f: "format" }).forEach(([s, i]) => {
      e2[i] && r.append(s, e2[i].toString());
    }), `${_("/", "/_image")}?${r}`;
  }, parseURL(e2) {
    let t = e2.searchParams;
    return t.has("href") ? { src: t.get("href"), width: t.has("w") ? parseInt(t.get("w")) : void 0, height: t.has("h") ? parseInt(t.get("h")) : void 0, format: t.get("f"), quality: t.get("q") } : void 0;
  } };
  Ms = { ...ks, propertiesToHash: ["src"], async transform(e2, t) {
    return { data: e2, format: t.format };
  } }, _s = Ms, Ns = Object.freeze(Object.defineProperty({ __proto__: null, default: _s }, Symbol.toStringTag, { value: "Module" }));
});
var sn = {};
se(sn, { GET: () => Vs });
async function an() {
  if (!globalThis?.astroAsset?.imageService) {
    let { default: e2 } = await Promise.resolve().then(() => (Pt(), rn)).then((t) => t.n).catch((t) => {
      let r = new f(gr);
      throw r.cause = t, r;
    });
    return globalThis.astroAsset || (globalThis.astroAsset = {}), globalThis.astroAsset.imageService = e2, e2;
  }
  return globalThis.astroAsset.imageService;
}
async function Os(e2, t) {
  if (!e2 || typeof e2 != "object")
    throw new f({ ...gt, message: gt.message(JSON.stringify(e2)) });
  if (typeof e2.src > "u")
    throw new f({ ...ee, message: ee.message(e2.src, "undefined", JSON.stringify(e2)) });
  let r = await an(), n = { ...e2, src: typeof e2.src == "object" && "then" in e2.src ? (await e2.src).default ?? await e2.src : e2.src }, a = M(n.src) ? n.src.fsPath : n.src, s = M(n.src) ? n.src.clone ?? n.src : n.src;
  n.src = s;
  let i = r.validateOptions ? await r.validateOptions(n, t) : n, o = r.getSrcSet ? await r.getSrcSet(i, t) : [], l = await r.getURL(i, t), d = await Promise.all(o.map(async (c) => ({ transform: c.transform, url: await r.getURL(c.transform, t), descriptor: c.descriptor, attributes: c.attributes })));
  if (Tt(r) && globalThis.astroAsset.addStaticImage && !(Rt(i.src) && l === i.src)) {
    let c = r.propertiesToHash ?? ke;
    l = globalThis.astroAsset.addStaticImage(i, c, a), d = o.map((p) => ({ transform: p.transform, url: globalThis.astroAsset.addStaticImage(p.transform, c, a), descriptor: p.descriptor, attributes: p.attributes }));
  }
  return { rawOptions: n, options: i, src: l, srcSet: { values: d, attribute: d.map((c) => `${c.url} ${c.descriptor}`).join(", ") }, attributes: r.getHTMLAttributes !== void 0 ? await r.getHTMLAttributes(i, t) : {} };
}
async function zs(e2) {
  try {
    let t = await fetch(e2);
    return t.ok ? await t.arrayBuffer() : void 0;
  } catch {
    return;
  }
}
var nn;
var Us;
var Ds;
var Hs;
var Fs;
var Ws;
var qs;
var _e;
var Lt;
var Vs;
var on = C(() => {
  "use strict";
  ie();
  nn = H(Kr(), 1);
  te();
  Pt();
  X();
  K();
  Us = (e2) => {
    let t = e2.length, r = 0, n = 0, a = 8997, s = 0, i = 33826, o = 0, l = 40164, d = 0, c = 52210;
    for (; r < t; )
      a ^= e2.charCodeAt(r++), n = a * 435, s = i * 435, o = l * 435, d = c * 435, o += a << 8, d += i << 8, s += n >>> 16, a = n & 65535, o += s >>> 16, i = s & 65535, c = d + (o >>> 16) & 65535, l = o & 65535;
    return (c & 15) * 281474976710656 + l * 4294967296 + i * 65536 + (a ^ c >> 4);
  }, Ds = (e2, t = false) => (t ? 'W/"' : '"') + Us(e2).toString(36) + e2.length.toString(36) + '"', Hs = z(), Fs = q(async (e2, t, r) => {
    let n = e2.createAstro(Hs, t, r);
    n.self = Fs;
    let a = n.props;
    if (a.alt === void 0 || a.alt === null)
      throw new f(ft);
    typeof a.width == "string" && (a.width = parseInt(a.width)), typeof a.height == "string" && (a.height = parseInt(a.height));
    let s = await Lt(a), i = {};
    return s.srcSet.values.length > 0 && (i.srcset = s.srcSet.attribute), k`${V()}<img${I(s.src, "src")}${D(i)}${D(s.attributes)}>`;
  }, "/Users/serdar/dev/projects/my-astro-app/node_modules/astro/components/Image.astro", void 0), Ws = z(), qs = q(async (e2, t, r) => {
    let n = e2.createAstro(Ws, t, r);
    n.self = qs;
    let a = ["webp"], s = "png", i = ["gif", "svg", "jpg", "jpeg"], { formats: o = a, pictureAttributes: l = {}, fallbackFormat: d, ...c } = n.props;
    if (c.alt === void 0 || c.alt === null)
      throw new f(ft);
    let p = await Promise.all(o.map(async (y) => await Lt({ ...c, format: y, widths: c.widths, densities: c.densities }))), u = d ?? s;
    !d && M(c.src) && i.includes(c.src.format) && (u = c.src.format);
    let v = await Lt({ ...c, format: u, widths: c.widths, densities: c.densities }), m = {}, g = {};
    return c.sizes && (g.sizes = c.sizes), v.srcSet.values.length > 0 && (m.srcset = v.srcSet.attribute), k`${V()}<picture${D(l)}> ${Object.entries(p).map(([y, w]) => {
      let b = c.densities || !c.densities && !c.widths ? `${w.src}${w.srcSet.values.length > 0 ? ", " + w.srcSet.attribute : ""}` : w.srcSet.attribute;
      return k`<source${I(b, "srcset")}${I("image/" + w.options.format, "type")}${D(g)}>`;
    })} <img${I(v.src, "src")}${D(m)}${D(v.attributes)}> </picture>`;
  }, "/Users/serdar/dev/projects/my-astro-app/node_modules/astro/components/Picture.astro", void 0), _e = { service: { entrypoint: "astro/assets/services/noop", config: {} }, domains: [], remotePatterns: [] };
  new URL("file:///Users/serdar/dev/projects/my-astro-app/dist/");
  Lt = async (e2) => await Os(e2, _e);
  Vs = async ({ request: e2 }) => {
    try {
      let t = await an();
      if (!("transform" in t))
        throw new Error("Configured image service is not a local service");
      let r = new URL(e2.url), n = await t.parseURL(r, _e);
      if (!n?.src)
        throw new Error("Incorrect transform returned by `parseURL`");
      let a, s = Y(n.src) ? new URL(n.src) : new URL(n.src, r.origin);
      if (Y(n.src) && Me(n.src, _e) === false)
        return new Response("Forbidden", { status: 403 });
      if (a = await zs(s), !a)
        return new Response("Not Found", { status: 404 });
      let { data: i, format: o } = await t.transform(new Uint8Array(a), n, _e);
      return new Response(i, { status: 200, headers: { "Content-Type": nn.default.getType(o) ?? `image/${o}`, "Cache-Control": "public, max-age=31536000", ETag: Ds(i.toString()), Date: (/* @__PURE__ */ new Date()).toUTCString() } });
    } catch (t) {
      return console.error("Could not process image request:", t), new Response(`Server Error: ${t}`, { status: 500 });
    }
  };
});
var cn = {};
se(cn, { page: () => Bs, renderers: () => G });
var Bs;
var ln = C(() => {
  "use strict";
  ye();
  Bs = () => Promise.resolve().then(() => (on(), sn));
});
var un = {};
se(un, { default: () => pn, file: () => Xs, url: () => Ks });
var Xo;
var Gs;
var dn;
var Js;
var re;
var Ys;
var pn;
var Xs;
var Ks;
var fn = C(() => {
  "use strict";
  te();
  oe();
  X();
  K();
  Xo = H(ce(), 1), Gs = z(), dn = q(async (e2, t, r) => {
    let n = e2.createAstro(Gs, t, r);
    n.self = dn;
    let { title: a } = n.props;
    return k`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${I(n.generator, "content")}><title>${a}</title>${Lr()}</head> <body> ${Pe(e2, r.default)} </body></html>`;
  }, "/Users/serdar/dev/projects/my-astro-app/src/layouts/Layout.astro", void 0), Js = z(), re = q(async (e2, t, r) => {
    let n = e2.createAstro(Js, t, r);
    n.self = re;
    let { href: a, title: s, body: i } = n.props;
    return k`${V()}<li class="link-card" data-astro-cid-dohjnao5> <a${I(a, "href")} data-astro-cid-dohjnao5> <h2 data-astro-cid-dohjnao5> ${s} <span data-astro-cid-dohjnao5>&rarr;</span> </h2> <p data-astro-cid-dohjnao5> ${i} </p> </a> </li> `;
  }, "/Users/serdar/dev/projects/my-astro-app/src/components/Card.astro", void 0), Ys = z(), pn = q(async (e2, t, r) => {
    let n = e2.createAstro(Ys, t, r);
    n.self = pn;
    let s = await (await fetch("api/echo")).text();
    return k`${U(e2, "Layout", dn, { title: "Welcome to Astro.", "data-astro-cid-j7pv25f6": true }, { default: (i) => k` ${V()}<main data-astro-cid-j7pv25f6> <svg class="astro-a" width="495" height="623" viewBox="0 0 495 623" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-astro-cid-j7pv25f6> <path fill-rule="evenodd" clip-rule="evenodd" d="M167.19 364.254C83.4786 364.254 0 404.819 0 404.819C0 404.819 141.781 19.4876 142.087 18.7291C146.434 7.33701 153.027 0 162.289 0H332.441C341.703 0 348.574 7.33701 352.643 18.7291C352.92 19.5022 494.716 404.819 494.716 404.819C494.716 404.819 426.67 364.254 327.525 364.254L264.41 169.408C262.047 159.985 255.147 153.581 247.358 153.581C239.569 153.581 232.669 159.985 230.306 169.408L167.19 364.254ZM160.869 530.172C160.877 530.18 160.885 530.187 160.894 530.195L160.867 530.181C160.868 530.178 160.868 530.175 160.869 530.172ZM136.218 411.348C124.476 450.467 132.698 504.458 160.869 530.172C160.997 529.696 161.125 529.242 161.248 528.804C161.502 527.907 161.737 527.073 161.917 526.233C165.446 509.895 178.754 499.52 195.577 500.01C211.969 500.487 220.67 508.765 223.202 527.254C224.141 534.12 224.23 541.131 224.319 548.105C224.328 548.834 224.337 549.563 224.347 550.291C224.563 566.098 228.657 580.707 237.264 593.914C245.413 606.426 256.108 615.943 270.749 622.478C270.593 621.952 270.463 621.508 270.35 621.126C270.045 620.086 269.872 619.499 269.685 618.911C258.909 585.935 266.668 563.266 295.344 543.933C298.254 541.971 301.187 540.041 304.12 538.112C310.591 533.854 317.059 529.599 323.279 525.007C345.88 508.329 360.09 486.327 363.431 457.844C364.805 446.148 363.781 434.657 359.848 423.275C358.176 424.287 356.587 425.295 355.042 426.275C351.744 428.366 348.647 430.33 345.382 431.934C303.466 452.507 259.152 455.053 214.03 448.245C184.802 443.834 156.584 436.019 136.218 411.348Z" fill="url(#paint0_linear_1805_24383)" data-astro-cid-j7pv25f6></path> <defs data-astro-cid-j7pv25f6> <linearGradient id="paint0_linear_1805_24383" x1="247.358" y1="0" x2="247.358" y2="622.479" gradientUnits="userSpaceOnUse" data-astro-cid-j7pv25f6> <stop stop-opacity="0.9" data-astro-cid-j7pv25f6></stop> <stop offset="1" stop-opacity="0.2" data-astro-cid-j7pv25f6></stop> </linearGradient> </defs> </svg> <h1 data-astro-cid-j7pv25f6>Welcome to <span class="text-gradient" data-astro-cid-j7pv25f6>Astro</span></h1> <p class="instructions" data-astro-cid-j7pv25f6>
To get started, open the directory <code data-astro-cid-j7pv25f6>src/pages</code> in your project.<br data-astro-cid-j7pv25f6> <strong data-astro-cid-j7pv25f6>Code Challenge:</strong> Tweak the "Welcome to Astro" message above.
</p> <ul role="list" class="link-card-grid" data-astro-cid-j7pv25f6> ${U(i, "Card", re, { href: "https://docs.astro.build/", title: "Documentation", body: "Learn how Astro works and explore the official API docs.", "data-astro-cid-j7pv25f6": true })} ${U(i, "Card", re, { href: "https://astro.build/integrations/", title: "Integrations", body: "Supercharge your project with new frameworks and libraries.", "data-astro-cid-j7pv25f6": true })} ${U(i, "Card", re, { href: "https://astro.build/themes/", title: "Themes", body: "Explore a galaxy of community-built starter themes.", "data-astro-cid-j7pv25f6": true })} ${U(i, "Card", re, { href: "https://astro.build/chat/", title: "Community", body: "Come say hi to our amazing Discord community. \u2764\uFE0F", "data-astro-cid-j7pv25f6": true })} ${U(i, "Card", re, { href: "https://kilic.net", title: "knet", body: s, "data-astro-cid-j7pv25f6": true })} </ul> </main> ` })} `;
  }, "/Users/serdar/dev/projects/my-astro-app/src/pages/index.astro", void 0), Xs = "/Users/serdar/dev/projects/my-astro-app/src/pages/index.astro", Ks = "";
});
var mn = {};
se(mn, { page: () => Qs, renderers: () => G });
var Qs;
var hn = C(() => {
  "use strict";
  ye();
  Qs = () => Promise.resolve().then(() => (fn(), un));
});
ye();
ie();
var Eo = H(qe(), 1);
oe();
X();
K();
te();
var Co = H(ce(), 1);
function bs(e2) {
  for (var t = [], r = 0; r < e2.length; ) {
    var n = e2[r];
    if (n === "*" || n === "+" || n === "?") {
      t.push({ type: "MODIFIER", index: r, value: e2[r++] });
      continue;
    }
    if (n === "\\") {
      t.push({ type: "ESCAPED_CHAR", index: r++, value: e2[r++] });
      continue;
    }
    if (n === "{") {
      t.push({ type: "OPEN", index: r, value: e2[r++] });
      continue;
    }
    if (n === "}") {
      t.push({ type: "CLOSE", index: r, value: e2[r++] });
      continue;
    }
    if (n === ":") {
      for (var a = "", s = r + 1; s < e2.length; ) {
        var i = e2.charCodeAt(s);
        if (i >= 48 && i <= 57 || i >= 65 && i <= 90 || i >= 97 && i <= 122 || i === 95) {
          a += e2[s++];
          continue;
        }
        break;
      }
      if (!a)
        throw new TypeError("Missing parameter name at ".concat(r));
      t.push({ type: "NAME", index: r, value: a }), r = s;
      continue;
    }
    if (n === "(") {
      var o = 1, l = "", s = r + 1;
      if (e2[s] === "?")
        throw new TypeError('Pattern cannot start with "?" at '.concat(s));
      for (; s < e2.length; ) {
        if (e2[s] === "\\") {
          l += e2[s++] + e2[s++];
          continue;
        }
        if (e2[s] === ")") {
          if (o--, o === 0) {
            s++;
            break;
          }
        } else if (e2[s] === "(" && (o++, e2[s + 1] !== "?"))
          throw new TypeError("Capturing groups are not allowed at ".concat(s));
        l += e2[s++];
      }
      if (o)
        throw new TypeError("Unbalanced pattern at ".concat(r));
      if (!l)
        throw new TypeError("Missing pattern at ".concat(r));
      t.push({ type: "PATTERN", index: r, value: l }), r = s;
      continue;
    }
    t.push({ type: "CHAR", index: r, value: e2[r++] });
  }
  return t.push({ type: "END", index: r, value: "" }), t;
}
function vs(e2, t) {
  t === void 0 && (t = {});
  for (var r = bs(e2), n = t.prefixes, a = n === void 0 ? "./" : n, s = "[^".concat(Ss(t.delimiter || "/#?"), "]+?"), i = [], o = 0, l = 0, d = "", c = function(P) {
    if (l < r.length && r[l].type === P)
      return r[l++].value;
  }, p = function(P) {
    var h = c(P);
    if (h !== void 0)
      return h;
    var S = r[l], j = S.type, ne = S.index;
    throw new TypeError("Unexpected ".concat(j, " at ").concat(ne, ", expected ").concat(P));
  }, u = function() {
    for (var P = "", h; h = c("CHAR") || c("ESCAPED_CHAR"); )
      P += h;
    return P;
  }; l < r.length; ) {
    var v = c("CHAR"), m = c("NAME"), g = c("PATTERN");
    if (m || g) {
      var y = v || "";
      a.indexOf(y) === -1 && (d += y, y = ""), d && (i.push(d), d = ""), i.push({ name: m || o++, prefix: y, suffix: "", pattern: g || s, modifier: c("MODIFIER") || "" });
      continue;
    }
    var w = v || c("ESCAPED_CHAR");
    if (w) {
      d += w;
      continue;
    }
    d && (i.push(d), d = "");
    var b = c("OPEN");
    if (b) {
      var y = u(), T = c("NAME") || "", E = c("PATTERN") || "", R = u();
      p("CLOSE"), i.push({ name: T || (E ? o++ : ""), pattern: T && !E ? s : E, prefix: y, suffix: R, modifier: c("MODIFIER") || "" });
      continue;
    }
    p("END");
  }
  return i;
}
function Ur(e2, t) {
  return xs(vs(e2, t), t);
}
function xs(e2, t) {
  t === void 0 && (t = {});
  var r = As(t), n = t.encode, a = n === void 0 ? function(l) {
    return l;
  } : n, s = t.validate, i = s === void 0 ? true : s, o = e2.map(function(l) {
    if (typeof l == "object")
      return new RegExp("^(?:".concat(l.pattern, ")$"), r);
  });
  return function(l) {
    for (var d = "", c = 0; c < e2.length; c++) {
      var p = e2[c];
      if (typeof p == "string") {
        d += p;
        continue;
      }
      var u = l ? l[p.name] : void 0, v = p.modifier === "?" || p.modifier === "*", m = p.modifier === "*" || p.modifier === "+";
      if (Array.isArray(u)) {
        if (!m)
          throw new TypeError('Expected "'.concat(p.name, '" to not repeat, but got an array'));
        if (u.length === 0) {
          if (v)
            continue;
          throw new TypeError('Expected "'.concat(p.name, '" to not be empty'));
        }
        for (var g = 0; g < u.length; g++) {
          var y = a(u[g], p);
          if (i && !o[c].test(y))
            throw new TypeError('Expected all "'.concat(p.name, '" to match "').concat(p.pattern, '", but got "').concat(y, '"'));
          d += p.prefix + y + p.suffix;
        }
        continue;
      }
      if (typeof u == "string" || typeof u == "number") {
        var y = a(String(u), p);
        if (i && !o[c].test(y))
          throw new TypeError('Expected "'.concat(p.name, '" to match "').concat(p.pattern, '", but got "').concat(y, '"'));
        d += p.prefix + y + p.suffix;
        continue;
      }
      if (!v) {
        var w = m ? "an array" : "a string";
        throw new TypeError('Expected "'.concat(p.name, '" to be ').concat(w));
      }
    }
    return d;
  };
}
function Ss(e2) {
  return e2.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function As(e2) {
  return e2 && e2.sensitive ? "" : "i";
}
var js = new Intl.DateTimeFormat([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
var fe = { debug: 20, info: 30, warn: 40, error: 50, silent: 90 };
function Et(e2, t, r, n, a = true) {
  let s = e2.level, i = e2.dest, o = { label: r, level: t, message: n, newLine: a };
  $s(s, t) && i.write(o);
}
function $s(e2, t) {
  return fe[e2] <= fe[t];
}
function Dr(e2, t, r, n = true) {
  return Et(e2, "info", t, r, n);
}
function Hr(e2, t, r, n = true) {
  return Et(e2, "warn", t, r, n);
}
function Fr(e2, t, r, n = true) {
  return Et(e2, "error", t, r, n);
}
function Wr(...e2) {
  "_astroGlobalDebug" in globalThis && globalThis._astroGlobalDebug(...e2);
}
function qr({ level: e2, label: t }) {
  let r = `${js.format(/* @__PURE__ */ new Date())}`, n = [];
  return e2 === "error" || e2 === "warn" ? (n.push(ve(r)), n.push(`[${e2.toUpperCase()}]`)) : n.push(r), t && n.push(`[${t}]`), e2 === "error" ? Jt(n.join(" ")) : e2 === "warn" ? Yt(n.join(" ")) : n.length === 1 ? Ve(n[0]) : Ve(n[0]) + " " + Xt(n.splice(1).join(" "));
}
if (typeof process < "u") {
  let e2 = process;
  "argv" in e2 && Array.isArray(e2.argv) && (e2.argv.includes("--verbose") || e2.argv.includes("--silent"));
}
var Le = class {
  options;
  constructor(t) {
    this.options = t;
  }
  info(t, r, n = true) {
    Dr(this.options, t, r, n);
  }
  warn(t, r, n = true) {
    Hr(this.options, t, r, n);
  }
  error(t, r, n = true) {
    Fr(this.options, t, r, n);
  }
  debug(t, ...r) {
    Wr(t, ...r);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(t) {
    return new me(this.options, t);
  }
};
var me = class e {
  options;
  label;
  constructor(t, r) {
    this.options = t, this.label = r;
  }
  fork(t) {
    return new e(this.options, t);
  }
  info(t) {
    Dr(this.options, this.label, t);
  }
  warn(t) {
    Hr(this.options, this.label, t);
  }
  error(t) {
    Fr(this.options, this.label, t);
  }
  debug(t) {
    Wr(this.label, t);
  }
};
function Es(e2, t) {
  let r = e2.map((s) => "/" + s.map((i) => i.spread ? `:${i.content.slice(3)}(.*)?` : i.dynamic ? `:${i.content}` : i.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("")).join(""), n = "";
  return t === "always" && e2.length && (n = "/"), Ur(r + n);
}
function Ce(e2) {
  return { route: e2.route, type: e2.type, pattern: new RegExp(e2.pattern), params: e2.params, component: e2.component, generate: Es(e2.segments, e2._meta.trailingSlash), pathname: e2.pathname || void 0, segments: e2.segments, prerender: e2.prerender, redirect: e2.redirect, redirectRoute: e2.redirectRoute ? Ce(e2.redirectRoute) : void 0, fallbackRoutes: e2.fallbackRoutes.map((t) => Ce(t)), isIndex: e2.isIndex };
}
function Rs(e2) {
  let t = [];
  for (let s of e2.routes) {
    t.push({ ...s, routeData: Ce(s.routeData) });
    let i = s;
    i.routeData = Ce(s.routeData);
  }
  let r = new Set(e2.assets), n = new Map(e2.componentMetadata), a = new Map(e2.clientDirectives);
  return { middleware(s, i) {
    return i();
  }, ...e2, assets: r, componentMetadata: n, clientDirectives: a, routes: t };
}
var zr = Rs({ adapterName: "@astrojs/cloudflare", routes: [{ file: "", links: [], scripts: [], styles: [], routeData: { type: "endpoint", isIndex: false, route: "/_image", pattern: "^\\/_image$", segments: [[{ content: "_image", dynamic: false, spread: false }]], params: [], component: "node_modules/astro/dist/assets/endpoint/generic.js", pathname: "/_image", prerender: false, fallbackRoutes: [], _meta: { trailingSlash: "ignore" } } }, { file: "", links: [], scripts: [], styles: [{ type: "inline", content: `:root{--accent: 136, 58, 234;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% )}html{font-family:system-ui,sans-serif;background:#13151a;background-size:224px}code{font-family:Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace}.link-card[data-astro-cid-dohjnao5]{list-style:none;display:flex;padding:1px;background-color:#23262d;background-image:none;background-size:400%;border-radius:7px;background-position:100%;transition:background-position .6s cubic-bezier(.22,1,.36,1);box-shadow:inset 0 0 0 1px #ffffff1a}.link-card[data-astro-cid-dohjnao5]>a[data-astro-cid-dohjnao5]{width:100%;text-decoration:none;line-height:1.4;padding:calc(1.5rem - 1px);border-radius:8px;color:#fff;background-color:#23262d;opacity:.8}h2[data-astro-cid-dohjnao5]{margin:0;font-size:1.25rem;transition:color .6s cubic-bezier(.22,1,.36,1)}p[data-astro-cid-dohjnao5]{margin-top:.5rem;margin-bottom:0}.link-card[data-astro-cid-dohjnao5]:is(:hover,:focus-within){background-position:0;background-image:var(--accent-gradient)}.link-card[data-astro-cid-dohjnao5]:is(:hover,:focus-within) h2[data-astro-cid-dohjnao5]{color:rgb(var(--accent-light))}main[data-astro-cid-j7pv25f6]{margin:auto;padding:1rem;width:800px;max-width:calc(100% - 2rem);color:#fff;font-size:20px;line-height:1.6}.astro-a[data-astro-cid-j7pv25f6]{position:absolute;top:-32px;left:50%;transform:translate(-50%);width:220px;height:auto;z-index:-1}h1[data-astro-cid-j7pv25f6]{font-size:4rem;font-weight:700;line-height:1;text-align:center;margin-bottom:1em}.text-gradient[data-astro-cid-j7pv25f6]{background-image:var(--accent-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:400%;background-position:0%}.instructions[data-astro-cid-j7pv25f6]{margin-bottom:2rem;border:1px solid rgba(var(--accent-light),25%);background:linear-gradient(rgba(var(--accent-dark),66%),rgba(var(--accent-dark),33%));padding:1.5rem;border-radius:8px}.instructions[data-astro-cid-j7pv25f6] code[data-astro-cid-j7pv25f6]{font-size:.8em;font-weight:700;background:rgba(var(--accent-light),12%);color:rgb(var(--accent-light));border-radius:4px;padding:.3em .4em}.instructions[data-astro-cid-j7pv25f6] strong[data-astro-cid-j7pv25f6]{color:rgb(var(--accent-light))}.link-card-grid[data-astro-cid-j7pv25f6]{display:grid;grid-template-columns:repeat(auto-fit,minmax(24ch,1fr));gap:2rem;padding:0}
` }], routeData: { route: "/", isIndex: true, type: "page", pattern: "^\\/$", segments: [], params: [], component: "src/pages/index.astro", pathname: "/", prerender: false, fallbackRoutes: [], _meta: { trailingSlash: "ignore" } } }], base: "/", trailingSlash: "ignore", compressHTML: true, componentMetadata: [["/Users/serdar/dev/projects/my-astro-app/src/pages/index.astro", { propagation: "none", containsHead: true }]], renderers: [], clientDirectives: [["idle", '(()=>{var i=t=>{let e=async()=>{await(await t())()};"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event("astro:idle"));})();'], ["load", '(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event("astro:load"));})();'], ["media", '(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener("change",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event("astro:media"));})();'], ["only", '(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event("astro:only"));})();'], ["visible", '(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value=="object"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event("astro:visible"));})();']], entryModules: { "\0@astrojs-ssr-virtual-entry": "_worker.mjs", "\0@astro-renderers": "renderers.mjs", "\0noop-middleware": "_noop-middleware.mjs", "/node_modules/astro/dist/assets/endpoint/generic.js": "chunks/pages/generic_CVqorNjE.mjs", "/src/pages/index.astro": "chunks/pages/index_-kBWDYVQ.mjs", "\0@astrojs-manifest": "manifest_DAQQPDR8.mjs", "\0@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js": "chunks/generic_Chcv_BmN.mjs", "\0@astro-page:src/pages/index@_@astro": "chunks/index_zd03ScC2.mjs", "astro:scripts/before-hydration.js": "" }, assets: ["/favicon.svg", "/$server_build/_noop-middleware.mjs", "/$server_build/_worker.mjs", "/$server_build/renderers.mjs", "/$server_build/chunks/astro_ChsRqb8s.mjs", "/$server_build/chunks/generic_Chcv_BmN.mjs", "/$server_build/chunks/index_zd03ScC2.mjs", "/$server_build/chunks/astro/assets-service_Ddxos8rd.mjs", "/$server_build/chunks/pages/generic_CVqorNjE.mjs", "/$server_build/chunks/pages/index_-kBWDYVQ.mjs"], buildFormat: "directory" });
ie();
te();
var he = H(qe(), 1);
oe();
X();
K();
var sc = H(ce(), 1);
var Vr = (e2, t) => t();
function Zs(e2, t) {
  switch (e2) {
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
function ei(e2, t) {
  for (let r of t)
    if (typeof r == "string") {
      if (r === e2)
        return r;
    } else
      for (let n of r.codes)
        if (n === e2)
          return r.path;
  throw new Mt();
}
function $(e2) {
  return e2.replaceAll("_", "-").toLowerCase();
}
function ti(e2) {
  return e2.map((t) => typeof t == "string" ? t : t.codes[0]);
}
var Mt = class extends Error {
  constructor() {
    super(`Astro encountered an unexpected line of code.
In most cases, this is not your fault, but a bug in astro code.
If there isn't one already, please create an issue.
https://astro.build/issues`);
  }
};
var Pn = Symbol.for(bt);
function gn(e2, t) {
  let r = e2.split("/");
  for (let n of r)
    for (let a of t)
      if (typeof a == "string") {
        if ($(n) === $(a))
          return true;
      } else if (n === a.path)
        return true;
  return false;
}
function ri(e2, t, r, n) {
  if (!e2)
    return (o, l) => l();
  let a = (o, l, d) => {
    if (o.pathname === t + "/" || o.pathname === t)
      return Zs(r, n) ? d.redirect(`${Ue(_(t, e2.defaultLocale))}`) : d.redirect(`${_(t, e2.defaultLocale)}`);
    if (!gn(o.pathname, e2.locales))
      return new Response(null, { status: 404, headers: l.headers });
  }, s = (o, l) => {
    let d = false;
    for (let c of o.pathname.split("/"))
      if ($(c) === $(e2.defaultLocale)) {
        d = true;
        break;
      }
    if (d) {
      let c = o.pathname.replace(`/${e2.defaultLocale}`, "");
      return l.headers.set("Location", c), new Response(null, { status: 404, headers: l.headers });
    }
  }, i = (o, l) => {
    if (!(o.pathname === t + "/" || o.pathname === t || gn(o.pathname, e2.locales)))
      return new Response(null, { status: 404, headers: l.headers });
  };
  return async (o, l) => {
    let d = Reflect.get(o.request, Pn);
    if (d?.type !== "page" && d?.type !== "fallback")
      return await l();
    let c = o.currentLocale, p = o.url, { locales: u, defaultLocale: v, fallback: m, routing: g } = e2, y = await l();
    if (y instanceof Response) {
      switch (e2.routing) {
        case "domains-prefix-other-locales": {
          if (Ct(e2, c)) {
            let w = s(p, y);
            if (w)
              return w;
          }
          break;
        }
        case "pathname-prefix-other-locales": {
          let w = s(p, y);
          if (w)
            return w;
          break;
        }
        case "domains-prefix-always-no-redirect": {
          if (Ct(e2, c)) {
            let w = i(p, y);
            if (w)
              return w;
          }
          break;
        }
        case "pathname-prefix-always-no-redirect": {
          let w = i(p, y);
          if (w)
            return w;
          break;
        }
        case "pathname-prefix-always": {
          let w = a(p, y, o);
          if (w)
            return w;
          break;
        }
        case "domains-prefix-always": {
          if (Ct(e2, c)) {
            let w = a(p, y, o);
            if (w)
              return w;
          }
          break;
        }
      }
      if (y.status >= 300 && m) {
        let w = e2.fallback ? Object.keys(e2.fallback) : [], T = p.pathname.split("/").find((E) => {
          for (let R of u)
            if (typeof R == "string") {
              if (R === E)
                return true;
            } else if (R.path === E)
              return true;
          return false;
        });
        if (T && w.includes(T)) {
          let E = m[T], R = ei(E, u), P;
          return R === v && g === "pathname-prefix-other-locales" ? P = p.pathname.replace(`/${T}`, "") : P = p.pathname.replace(`/${T}`, `/${R}`), o.redirect(P);
        }
      }
    }
    return y;
  };
}
var ni = (e2) => {
  Reflect.set(e2.request, Pn, e2.route);
};
function Ct(e2, t) {
  for (let r of Object.values(e2.domainLookupTable))
    if (r === t)
      return false;
  return true;
}
var ai = /* @__PURE__ */ new Date(0);
var yn = "deleted";
var si = Symbol.for("astro.responseSent");
var Ne = class {
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
var ge = class {
  #e;
  #t;
  #r;
  #a;
  constructor(t) {
    this.#e = t, this.#t = null, this.#r = null, this.#a = false;
  }
  delete(t, r) {
    let n = { expires: ai };
    r?.domain && (n.domain = r.domain), r?.path && (n.path = r.path), this.#n().set(t, [yn, (0, he.serialize)(t, yn, n), false]);
  }
  get(t, r = void 0) {
    if (this.#r?.has(t)) {
      let [a, , s] = this.#r.get(t);
      return s ? new Ne(a) : void 0;
    }
    let n = this.#s(r);
    if (t in n) {
      let a = n[t];
      return new Ne(a);
    }
  }
  has(t, r = void 0) {
    if (this.#r?.has(t)) {
      let [, , a] = this.#r.get(t);
      return a;
    }
    return !!this.#s(r)[t];
  }
  set(t, r, n) {
    if (this.#a) {
      let i = new Error(`Astro.cookies.set() was called after the cookies had already been sent to the browser.
This may have happened if this method was called in an imported component.
Please make sure that Astro.cookies.set() is only called in the frontmatter of the main page.`);
      i.name = "Warning", console.warn(i);
    }
    let a;
    if (typeof r == "string")
      a = r;
    else {
      let i = r.toString();
      i === Object.prototype.toString.call(r) ? a = JSON.stringify(r) : a = i;
    }
    let s = {};
    if (n && Object.assign(s, n), this.#n().set(t, [a, (0, he.serialize)(t, a, s), true]), this.#e[si])
      throw new f({ ...Ee });
  }
  *headers() {
    if (this.#r != null)
      for (let [, t] of this.#r)
        yield t[1];
  }
  static consume(t) {
    return t.#a = true, t.headers();
  }
  #s(t = void 0) {
    return this.#t || this.#i(t), this.#t || (this.#t = {}), this.#t;
  }
  #n() {
    return this.#r || (this.#r = /* @__PURE__ */ new Map()), this.#r;
  }
  #i(t = void 0) {
    let r = this.#e.headers.get("cookie");
    r && (this.#t = (0, he.parse)(r, t));
  }
};
var Ht = Symbol.for("astro.cookies");
function Ft(e2, t) {
  Reflect.set(e2, Ht, t);
}
function ii(e2) {
  return Reflect.has(e2, Ht);
}
function oi(e2) {
  let t = Reflect.get(e2, Ht);
  if (t != null)
    return t;
}
function* wn(e2) {
  let t = oi(e2);
  if (!t)
    return [];
  for (let r of ge.consume(t))
    yield r;
  return [];
}
var ci = { write(e2) {
  let t = console.error;
  return fe[e2.level] < fe.error && (t = console.log), e2.label === "SKIP_FORMAT" ? t(e2.message) : t(qr(e2) + " " + e2.message), true;
} };
async function Ln(e2, t, r) {
  let n = false, a, i = e2(t, async () => (n = true, a = r(), a));
  return await Promise.resolve(i).then(async (o) => {
    if (n)
      if (typeof o < "u") {
        if (!(o instanceof Response))
          throw new f(Re);
        return bn(t, o);
      } else {
        if (a)
          return a;
        throw new f(Re);
      }
    else {
      if (typeof o > "u")
        throw new f(br);
      if (o instanceof Response)
        return bn(t, o);
      throw new f(Re);
    }
  });
}
function bn(e2, t) {
  return e2.cookies !== void 0 && !ii(t) && Ft(t, e2.cookies), t;
}
function Cn(e2) {
  return e2?.type === "redirect";
}
function In(e2) {
  return e2?.type === "fallback";
}
function li(e2, t) {
  let r = e2.redirectRoute, n = e2.redirect;
  if (typeof r < "u")
    return r?.generate(t) || r?.pathname || "/";
  if (typeof n == "string") {
    let a = n;
    for (let s of Object.keys(t)) {
      let i = t[s];
      a = a.replace(`[${s}]`, i), a = a.replace(`[...${s}]`, i);
    }
    return a;
  } else if (typeof n > "u")
    return "/";
  return n.destination;
}
function di(e2, t = "GET") {
  return e2.redirectRoute && typeof e2.redirect == "object" ? e2.redirect.status : t !== "GET" ? 308 : 301;
}
var pi = { default() {
  return new Response(null, { status: 301 });
} };
var ui = { page: () => Promise.resolve(pi), onRequest: (e2, t) => t(), renderers: [] };
var fi = ["string", "number", "undefined"];
function mi([e2, t], r) {
  if (!fi.includes(typeof t))
    throw new f({ ...dt, message: dt.message(e2, t, typeof t), location: { file: r } });
}
function hi(e2, { ssr: t, route: r }) {
  if ((!t || r.prerender) && !e2.getStaticPaths)
    throw new f({ ...hr, location: { file: r.component } });
}
function gi(e2, t, r) {
  if (!Array.isArray(e2))
    throw new f({ ...lt, message: lt.message(typeof e2), location: { file: r.component } });
  e2.forEach((n) => {
    if (typeof n == "object" && Array.isArray(n) || n === null)
      throw new f({ ...ct, message: ct.message(Array.isArray(n) ? "array" : typeof n) });
    if (n.params === void 0 || n.params === null || n.params && Object.keys(n.params).length === 0)
      throw new f({ ...mr, location: { file: r.component } });
    for (let [a, s] of Object.entries(n.params))
      typeof s > "u" || typeof s == "string" || typeof s == "number" || t.warn("router", `getStaticPaths() returned an invalid path param: "${a}". A string, number or undefined value was expected, but got \`${JSON.stringify(s)}\`.`), typeof s == "string" && s === "" && t.warn("router", `getStaticPaths() returned an invalid path param: "${a}". \`undefined\` expected for an optional param, but got empty string.`);
  });
}
function yi(e2) {
  return (r) => {
    let n = {};
    return e2.forEach((a, s) => {
      a.startsWith("...") ? n[a.slice(3)] = r[s + 1] ? r[s + 1] : void 0 : n[a] = r[s + 1];
    }), n;
  };
}
function kn(e2, t) {
  let r = Object.entries(e2).reduce((n, a) => {
    mi(a, t.component);
    let [s, i] = a;
    return i !== void 0 && (n[s] = typeof i == "string" ? He(i) : i.toString()), n;
  }, {});
  return JSON.stringify(t.generate(r));
}
function wi(e2) {
  return function(r, n = {}) {
    let { pageSize: a, params: s, props: i } = n, o = a || 10, l = "page", d = s || {}, c = i || {}, p;
    if (e2.params.includes(`...${l}`))
      p = false;
    else if (e2.params.includes(`${l}`))
      p = true;
    else
      throw new f({ ...ut, message: ut.message(l) });
    let u = Math.max(1, Math.ceil(r.length / o));
    return [...Array(u).keys()].map((m) => {
      let g = m + 1, y = o === 1 / 0 ? 0 : (g - 1) * o, w = Math.min(y + o, r.length), b = { ...d, [l]: p || g > 1 ? String(g) : void 0 }, T = It(e2.generate({ ...b })), E = g === u ? void 0 : It(e2.generate({ ...b, page: String(g + 1) })), R = g === 1 ? void 0 : It(e2.generate({ ...b, page: !p && g - 1 === 1 ? void 0 : String(g - 1) }));
      return { params: b, props: { ...c, page: { data: r.slice(y, w), start: y, end: w - 1, size: o, total: r.length, currentPage: g, lastPage: u, url: { current: T, next: E, prev: R } } } };
    });
  };
}
function It(e2) {
  return e2 === "" ? "/" : e2;
}
async function bi({ mod: e2, route: t, routeCache: r, logger: n, ssr: a }) {
  let s = r.get(t);
  if (!e2)
    throw new Error("This is an error caused by Astro and not your code. Please file an issue.");
  if (s?.staticPaths)
    return s.staticPaths;
  if (hi(e2, { ssr: a, route: t }), a && !t.prerender) {
    let l = Object.assign([], { keyed: /* @__PURE__ */ new Map() });
    return r.set(t, { ...s, staticPaths: l }), l;
  }
  let i = [];
  if (!e2.getStaticPaths)
    throw new Error("Unexpected Error.");
  i = await e2.getStaticPaths({ paginate: wi(t) }), gi(i, n, t);
  let o = i;
  o.keyed = /* @__PURE__ */ new Map();
  for (let l of o) {
    let d = kn(l.params, t);
    o.keyed.set(d, l);
  }
  return r.set(t, { ...s, staticPaths: o }), o;
}
var _t = class {
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
function vi(e2, t, r, n) {
  let a = kn(t, r), s = e2.keyed.get(a);
  if (s)
    return s;
  n.debug("router", `findPathItemByKey() - Unexpected cache miss looking for ${a}`);
}
async function xi(e2) {
  let { logger: t, mod: r, route: n, routeCache: a, pathname: s, ssr: i } = e2;
  if (!n || n.pathname)
    return [{}, {}];
  let o = Si(n, s) ?? {};
  if (Cn(n) || In(n))
    return [o, {}];
  r && Ai(n, r, o);
  let l = await bi({ mod: r, route: n, routeCache: a, logger: t, ssr: i }), d = vi(l, o, n, t);
  if (!d && (!i || n.prerender))
    throw new f({ ...je, message: je.message(s), hint: je.hint([n.component]) });
  let c = d?.props ? { ...d.props } : {};
  return [o, c];
}
function Si(e2, t) {
  if (e2.params.length) {
    let r = e2.pattern.exec(decodeURIComponent(t));
    if (r)
      return yi(e2.params)(r);
  }
}
function Ai(e2, t, r) {
  if (e2.type === "endpoint" && t.getStaticPaths) {
    let n = e2.segments[e2.segments.length - 1], a = Object.values(r), s = a[a.length - 1];
    if (n.length === 1 && n[0].dynamic && s === void 0)
      throw new f({ ...$e, message: $e.message(e2.route), hint: $e.hint(e2.component), location: { file: e2.component } });
  }
}
var vn = Symbol.for("astro.locals");
var ji = Symbol.for(bt);
async function xn(e2) {
  let t = e2.request, r = e2.pathname ?? new URL(t.url).pathname, [n, a] = await xi({ mod: e2.mod, route: e2.route, routeCache: e2.env.routeCache, pathname: r, logger: e2.env.logger, ssr: e2.env.ssr }), s = { ...e2, pathname: r, params: n, props: a, locales: e2.locales, routing: e2.routing, defaultLocale: e2.defaultLocale };
  return Object.defineProperty(s, "locals", { enumerable: true, get() {
    return Reflect.get(t, vn);
  }, set(i) {
    if (typeof i != "object")
      throw new f(Te);
    Reflect.set(t, vn, i);
  } }), s;
}
function Mn(e2) {
  if (e2 === "*")
    return [{ locale: e2, qualityValue: void 0 }];
  let t = [], r = e2.split(",").map((n) => n.trim());
  for (let n of r) {
    let a = n.split(";").map((o) => o.trim()), s = a[0], i = a[1];
    if (a)
      if (i && i.startsWith("q=")) {
        let o = Number.parseFloat(i.slice(2));
        Number.isNaN(o) || o > 1 ? t.push({ locale: s, qualityValue: void 0 }) : t.push({ locale: s, qualityValue: o });
      } else
        t.push({ locale: s, qualityValue: void 0 });
  }
  return t;
}
function _n(e2, t) {
  let r = ti(t).map($);
  return e2.filter((n) => n.locale !== "*" ? r.includes($(n.locale)) : true).sort((n, a) => {
    if (n.qualityValue && a.qualityValue) {
      if (n.qualityValue > a.qualityValue)
        return -1;
      if (n.qualityValue < a.qualityValue)
        return 1;
    }
    return 0;
  });
}
function Nn(e2, t) {
  let r = e2.headers.get("Accept-Language"), n;
  if (r) {
    let s = _n(Mn(r), t).at(0);
    if (s && s.locale !== "*")
      for (let i of t)
        if (typeof i == "string")
          $(i) === $(s.locale) && (n = i);
        else
          for (let o of i.codes)
            $(o) === $(s.locale) && (n = i.path);
  }
  return n;
}
function On(e2, t) {
  let r = e2.headers.get("Accept-Language"), n = [];
  if (r) {
    let a = _n(Mn(r), t);
    if (a.length === 1 && a.at(0).locale === "*")
      return t.map((s) => typeof s == "string" ? s : s.codes.at(0));
    if (a.length > 0)
      for (let s of a)
        for (let i of t)
          if (typeof i == "string")
            $(i) === $(s.locale) && n.push(i);
          else
            for (let o of i.codes)
              o === s.locale && n.push(i.path);
  }
  return n;
}
function Un(e2, t, r, n) {
  let a = Reflect.get(e2, ji);
  if (!a)
    return n;
  let s = a.pathname ?? new URL(e2.url).pathname;
  for (let i of s.split("/").filter(Boolean))
    for (let o of t)
      if (typeof o == "string") {
        if (!i.includes(o))
          continue;
        if ($(o) === $(i))
          return o;
      } else {
        if (o.path === i)
          return o.codes.at(0);
        for (let l of o.codes)
          if ($(l) === $(i))
            return l;
      }
  if (r === "pathname-prefix-other-locales" || r === "domains-prefix-other-locales")
    return n;
}
var Sn = Symbol.for("astro.clientAddress");
var kt = Symbol.for("astro.locals");
function Dn({ request: e2, params: t, site: r, props: n, adapterName: a, locales: s, routingStrategy: i, defaultLocale: o }) {
  let l, d, c;
  return { cookies: new ge(e2), request: e2, params: t, site: r ? new URL(r) : void 0, generator: `Astro v${wt}`, props: n, redirect(u, v) {
    return new Response(null, { status: v || 302, headers: { Location: u } });
  }, get preferredLocale() {
    if (l)
      return l;
    if (s)
      return l = Nn(e2, s), l;
  }, get preferredLocaleList() {
    if (d)
      return d;
    if (s)
      return d = On(e2, s), d;
  }, get currentLocale() {
    return c || (s && (c = Un(e2, s, i, o)), c);
  }, url: new URL(e2.url), get clientAddress() {
    if (Sn in e2)
      return Reflect.get(e2, Sn);
    throw a ? new f({ ...pe, message: pe.message(a) }) : new f(ot);
  }, get locals() {
    let u = Reflect.get(e2, kt);
    if (u === void 0 && (u = {}, Reflect.set(e2, kt, u)), typeof u != "object")
      throw new f(Te);
    return u;
  }, set locals(u) {
    if (typeof u != "object")
      throw new f(Te);
    Reflect.set(e2, kt, u);
  } };
}
async function $i(e2, t, r, n) {
  let a = Dn({ request: r.request, params: r.params, props: r.props, site: t.site, adapterName: t.adapterName, routingStrategy: r.routing, defaultLocale: r.defaultLocale, locales: r.locales }), s;
  return n ? s = await Ln(n, a, async () => await vt(e2, a, t.ssr, t.logger)) : s = await vt(e2, a, t.ssr, t.logger), Ft(s, a.cookies), s;
}
function Ei(...e2) {
  let t = e2.filter((n) => !!n), r = t.length;
  return r ? (n, a) => {
    return s(0, n);
    function s(i, o) {
      let l = t[i];
      return l(o, async () => i < r - 1 ? s(i + 1, o) : a());
    }
  } : (a, s) => s();
}
function Wt(e2, t, r) {
  return r ? _(r, Fe(e2)) : t ? J(_(t, Fe(e2))) : e2;
}
function Ri(e2, t, r) {
  return e2.type === "inline" ? { props: {}, children: e2.content } : { props: { rel: "stylesheet", href: Wt(e2.src, t, r) }, children: "" };
}
function Ti(e2, t, r) {
  return new Set(e2.map((n) => Ri(n, t, r)));
}
function Pi(e2, t, r) {
  return e2.type === "external" ? Li(e2.value, t, r) : { props: { type: "module" }, children: e2.value };
}
function Li(e2, t, r) {
  return { props: { type: "module", src: Wt(e2, t, r) }, children: "" };
}
function An(e2, t) {
  let r = decodeURI(e2);
  return t.routes.find((n) => n.pattern.test(r) || n.fallbackRoutes.some((a) => a.pattern.test(r)));
}
var jn = Symbol.for("astro.clientAddress");
var Ci = Symbol.for("astro.responseSent");
function Ii(e2) {
  if (e2 && e2.expressions?.length === 1)
    return e2.expressions[0];
}
var Nt = class {
  #e;
  #t;
  #r;
  constructor(t, r, n) {
    if (this.#e = t, this.#t = r, this.#r = n, r)
      for (let a of Object.keys(r)) {
        if (this[a] !== void 0)
          throw new f({ ...pt, message: pt.message(a) });
        Object.defineProperty(this, a, { get() {
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
      let i = this.#t[t], o = typeof i == "function" ? await i(n) : await i, l = Ii(o);
      if (l)
        return await B(n, async () => typeof l == "function" ? l(...r) : l).then((c) => c != null ? String(c) : c);
      if (typeof o == "function")
        return await N(n, o(...r)).then((d) => d != null ? String(d) : d);
    }
    let a = await B(n, this.#t[t]);
    return O(n, a);
  }
};
function ki(e2) {
  let { params: t, request: r, resolve: n, locals: a } = e2, s = new URL(r.url), i = new Headers();
  i.set("Content-Type", "text/html");
  let o = { status: e2.status, statusText: "OK", headers: i };
  Object.defineProperty(o, "headers", { value: o.headers, enumerable: true, writable: false });
  let l = e2.cookies, d, c, p, u = { styles: e2.styles ?? /* @__PURE__ */ new Set(), scripts: e2.scripts ?? /* @__PURE__ */ new Set(), links: e2.links ?? /* @__PURE__ */ new Set(), componentMetadata: e2.componentMetadata ?? /* @__PURE__ */ new Map(), renderers: e2.renderers, clientDirectives: e2.clientDirectives, compressHTML: e2.compressHTML, partial: e2.partial, pathname: e2.pathname, cookies: l, createAstro(v, m, g) {
    let y = new Nt(u, g, e2.logger);
    return { __proto__: v, get clientAddress() {
      if (!(jn in r))
        throw e2.adapterName ? new f({ ...pe, message: pe.message(e2.adapterName) }) : new f(ot);
      return Reflect.get(r, jn);
    }, get cookies() {
      return l || (l = new ge(r), u.cookies = l, l);
    }, get preferredLocale() {
      if (d)
        return d;
      if (e2.locales)
        return d = Nn(r, e2.locales), d;
    }, get preferredLocaleList() {
      if (c)
        return c;
      if (e2.locales)
        return c = On(r, e2.locales), c;
    }, get currentLocale() {
      if (p || e2.locales && (p = Un(r, e2.locales, e2.routingStrategy, e2.defaultLocale), p))
        return p;
    }, params: t, props: m, locals: a, request: r, url: s, redirect(b, T) {
      if (r[Ci])
        throw new f({ ...Ee });
      return new Response(null, { status: T || 302, headers: { Location: b } });
    }, response: o, slots: y };
  }, resolve: n, response: o, _metadata: { hasHydrationScript: false, rendererSpecificHydrationScripts: /* @__PURE__ */ new Set(), hasRenderedHead: false, hasDirectives: /* @__PURE__ */ new Set(), headInTree: false, extraHead: [], propagators: /* @__PURE__ */ new Set() } };
  return u;
}
async function $n({ mod: e2, renderContext: t, env: r, cookies: n }) {
  if (Cn(t.route))
    return new Response(null, { status: di(t.route, t.request.method), headers: { location: li(t.route, t.params) } });
  if (In(t.route))
    return new Response(null, { status: 404 });
  if (!e2)
    throw new f(vr);
  let a = e2.default;
  if (!a)
    throw new Error(`Expected an exported Astro component but received typeof ${typeof a}`);
  let s = ki({ adapterName: r.adapterName, links: t.links, styles: t.styles, logger: r.logger, params: t.params, pathname: t.pathname, componentMetadata: t.componentMetadata, resolve: r.resolve, renderers: r.renderers, clientDirectives: r.clientDirectives, compressHTML: r.compressHTML, request: t.request, partial: !!e2.partial, site: r.site, scripts: t.scripts, ssr: r.ssr, status: t.status ?? 200, cookies: n, locals: t.locals ?? {}, locales: t.locales, defaultLocale: t.defaultLocale, routingStrategy: t.routing }), i = await Or(s, a, t.props, {}, r.streaming, t.route);
  return s.cookies && Ft(i, s.cookies), i;
}
var Ot = class {
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
  async #r(t, r, n, a) {
    let s = Dn({ request: t.request, params: t.params, props: t.props, site: r.site, adapterName: r.adapterName, locales: t.locales, routingStrategy: t.routing, defaultLocale: t.defaultLocale });
    switch (t.route.type) {
      case "page":
      case "fallback":
      case "redirect":
        return a ? await Ln(a, s, () => $n({ mod: n, renderContext: t, env: r, cookies: s.cookies })) : await $n({ mod: n, renderContext: t, env: r, cookies: s.cookies });
      case "endpoint":
        return await $i(n, r, t, a);
      default:
        throw new Error(`Couldn't find route of type [${t.route.type}]`);
    }
  }
  onBeforeRenderRoute(t) {
    this.#t.before.push(t);
  }
};
var Ut = class extends Ot {
};
var Mi = Symbol.for("astro.locals");
var _i = Symbol.for("astro.clientAddress");
var En = Symbol.for("astro.responseSent");
var Ni = /* @__PURE__ */ new Set([404, 500]);
var _e2, _t2, _r2, _a3, _s2, _n2, _i2, _l, _u, u_fn, _f, f_fn, _m, m_fn, _h, h_fn, _a2, _d, d_fn, _o, o_fn, _c, c_fn, _g, g_fn, _p, p_fn;
var Dt = (_a2 = class {
  constructor(t, r = true) {
    __privateAdd(this, _u);
    __privateAdd(this, _f);
    __privateAdd(this, _m);
    __privateAdd(this, _h);
    __privateAdd(this, _d);
    __privateAdd(this, _o);
    __privateAdd(this, _c);
    __privateAdd(this, _g);
    __privateAdd(this, _p);
    __privateAdd(this, _e2, void 0);
    __privateAdd(this, _t2, void 0);
    __privateAdd(this, _r2, void 0);
    __privateAdd(this, _a3, new Le({ dest: ci, level: "info" }));
    __privateAdd(this, _s2, void 0);
    __privateAdd(this, _n2, void 0);
    __privateAdd(this, _i2, void 0);
    __privateAdd(this, _l, false);
    __privateSet(this, _e2, t), __privateSet(this, _t2, { routes: t.routes.map((n) => n.routeData) }), __privateSet(this, _r2, new Map(t.routes.map((n) => [n.routeData, n]))), __privateSet(this, _s2, we(__privateGet(this, _e2).base)), __privateSet(this, _n2, new Ut(__privateMethod(this, _u, u_fn).call(this, r))), __privateSet(this, _i2, new me(__privateGet(this, _a3).options, __privateGet(this, _e2).adapterName));
  }
  getAdapterLogger() {
    return __privateGet(this, _i2);
  }
  set setManifestData(t) {
    __privateSet(this, _t2, t);
  }
  removeBase(t) {
    return t.startsWith(__privateGet(this, _e2).base) ? t.slice(__privateGet(this, _s2).length + 1) : t;
  }
  match(t) {
    let r = new URL(t.url);
    if (__privateGet(this, _e2).assets.has(r.pathname))
      return;
    let n = __privateMethod(this, _m, m_fn).call(this, t);
    n || (n = J(this.removeBase(r.pathname)));
    let a = An(n, __privateGet(this, _t2));
    if (!(!a || a.prerender))
      return a;
  }
  async render(t, r, n) {
    let a, s, i, o;
    if (r && ("addCookieHeader" in r || "clientAddress" in r || "locals" in r || "routeData" in r) ? ("addCookieHeader" in r && (o = r.addCookieHeader), "clientAddress" in r && (i = r.clientAddress), "routeData" in r && (a = r.routeData), "locals" in r && (s = r.locals)) : (a = r, s = n, (r || s) && __privateMethod(this, _h, h_fn).call(this)), s && Reflect.set(t, Mi, s), i && Reflect.set(t, _i, i), t.url !== De(t.url) && (t = new Request(De(t.url), t)), a || (a = this.match(t)), !a)
      return __privateMethod(this, _o, o_fn).call(this, t, { status: 404 });
    let l = __privateMethod(this, _f, f_fn).call(this, t), d = __privateMethod(this, _g, g_fn).call(this, a, l), c = await __privateMethod(this, _p, p_fn).call(this, a), p = await c.page(), u = new URL(t.url), v = await __privateMethod(this, _d, d_fn).call(this, u, t, a, c, d), m;
    try {
      let g = ri(__privateGet(this, _e2).i18n, __privateGet(this, _e2).base, __privateGet(this, _e2).trailingSlash, __privateGet(this, _e2).buildFormat);
      g ? (__privateGet(this, _n2).setMiddlewareFunction(Ei(g, __privateGet(this, _e2).middleware)), __privateGet(this, _n2).onBeforeRenderRoute(ni)) : __privateGet(this, _n2).setMiddlewareFunction(__privateGet(this, _e2).middleware), m = await __privateGet(this, _n2).renderRoute(v, p);
    } catch (g) {
      return __privateGet(this, _a3).error(null, g.stack || g.message || String(g)), __privateMethod(this, _o, o_fn).call(this, t, { status: 500 });
    }
    if (Ni.has(m.status) && m.headers.get(ue) !== "no")
      return __privateMethod(this, _o, o_fn).call(this, t, { response: m, status: m.status });
    if (m.headers.has(ue) && m.headers.delete(ue), o)
      for (let g of _a2.getSetCookieFromResponse(m))
        m.headers.append("set-cookie", g);
    return Reflect.set(m, En, true), m;
  }
  setCookieHeaders(t) {
    return wn(t);
  }
}, _e2 = new WeakMap(), _t2 = new WeakMap(), _r2 = new WeakMap(), _a3 = new WeakMap(), _s2 = new WeakMap(), _n2 = new WeakMap(), _i2 = new WeakMap(), _l = new WeakMap(), _u = new WeakSet(), u_fn = function(t = false) {
  return { adapterName: __privateGet(this, _e2).adapterName, logger: __privateGet(this, _a3), mode: "production", compressHTML: __privateGet(this, _e2).compressHTML, renderers: __privateGet(this, _e2).renderers, clientDirectives: __privateGet(this, _e2).clientDirectives, resolve: async (r) => {
    if (!(r in __privateGet(this, _e2).entryModules))
      throw new Error(`Unable to resolve [${r}]`);
    let n = __privateGet(this, _e2).entryModules[r];
    switch (true) {
      case n.startsWith("data:"):
      case n.length === 0:
        return n;
      default:
        return Wt(n, __privateGet(this, _e2).base, __privateGet(this, _e2).assetsPrefix);
    }
  }, routeCache: new _t(__privateGet(this, _a3)), site: __privateGet(this, _e2).site, ssr: true, streaming: t };
}, _f = new WeakSet(), f_fn = function(t) {
  let r = new URL(t.url);
  return J(this.removeBase(r.pathname));
}, _m = new WeakSet(), m_fn = function(t) {
  let r, n = new URL(t.url);
  if (__privateGet(this, _e2).i18n && (__privateGet(this, _e2).i18n.routing === "domains-prefix-always" || __privateGet(this, _e2).i18n.routing === "domains-prefix-other-locales" || __privateGet(this, _e2).i18n.routing === "domains-prefix-always-no-redirect")) {
    let a = t.headers.get("X-Forwarded-Host"), s = t.headers.get("X-Forwarded-Proto");
    if (s ? s = s + ":" : s = n.protocol, a || (a = t.headers.get("Host")), a && s) {
      a = a.split(":")[0];
      try {
        let i, o = new URL(`${s}//${a}`);
        for (let [l, d] of Object.entries(__privateGet(this, _e2).i18n.domainLookupTable)) {
          let c = new URL(l);
          if (o.host === c.host && o.protocol === c.protocol) {
            i = d;
            break;
          }
        }
        i && (r = J(_($(i), this.removeBase(n.pathname))), n.pathname.endsWith("/") && (r = Ue(r)));
      } catch (i) {
        __privateGet(this, _a3).error("router", `Astro tried to parse ${s}//${a} as an URL, but it threw a parsing error. Check the X-Forwarded-Host and X-Forwarded-Proto headers.`), __privateGet(this, _a3).error("router", `Error: ${i}`);
      }
    }
  }
  return r;
}, _h = new WeakSet(), h_fn = function() {
  __privateGet(this, _l) || (__privateGet(this, _a3).warn("deprecated", `The adapter ${__privateGet(this, _e2).adapterName} is using a deprecated signature of the 'app.render()' method. From Astro 4.0, locals and routeData are provided as properties on an optional object to this method. Using the old signature will cause an error in Astro 5.0. See https://github.com/withastro/astro/pull/9199 for more information.`), __privateSet(this, _l, true));
}, _d = new WeakSet(), d_fn = async function(t, r, n, a, s = 200) {
  if (n.type === "endpoint") {
    let i = "/" + this.removeBase(t.pathname), l = await a.page();
    return await xn({ request: r, pathname: i, route: n, status: s, env: __privateGet(this, _n2).env, mod: l, locales: __privateGet(this, _e2).i18n?.locales, routing: __privateGet(this, _e2).i18n?.routing, defaultLocale: __privateGet(this, _e2).i18n?.defaultLocale });
  } else {
    let i = J(this.removeBase(t.pathname)), o = __privateGet(this, _r2).get(n), l = /* @__PURE__ */ new Set(), d = Ti(o.styles), c = /* @__PURE__ */ new Set();
    for (let u of o.scripts)
      "stage" in u ? u.stage === "head-inline" && c.add({ props: {}, children: u.children }) : c.add(Pi(u));
    let p = await a.page();
    return await xn({ request: r, pathname: i, componentMetadata: __privateGet(this, _e2).componentMetadata, scripts: c, styles: d, links: l, route: n, status: s, mod: p, env: __privateGet(this, _n2).env, locales: __privateGet(this, _e2).i18n?.locales, routing: __privateGet(this, _e2).i18n?.routing, defaultLocale: __privateGet(this, _e2).i18n?.defaultLocale });
  }
}, _o = new WeakSet(), o_fn = async function(t, { status: r, response: n, skipMiddleware: a = false }) {
  let s = `/${r}${__privateGet(this, _e2).trailingSlash === "always" ? "/" : ""}`, i = An(s, __privateGet(this, _t2)), o = new URL(t.url);
  if (i) {
    if (i.prerender) {
      let c = i.route.endsWith(`/${r}`) ? ".html" : "", p = new URL(`${__privateGet(this, _s2)}/${r}${c}`, o), u = await fetch(p.toString()), v = { status: r };
      return __privateMethod(this, _c, c_fn).call(this, u, n, v);
    }
    let d = await __privateMethod(this, _p, p_fn).call(this, i);
    try {
      let c = await __privateMethod(this, _d, d_fn).call(this, o, t, i, d, r), p = await d.page();
      a === false && __privateGet(this, _n2).setMiddlewareFunction(__privateGet(this, _e2).middleware), a && __privateGet(this, _n2).unsetMiddlewareFunction();
      let u = await __privateGet(this, _n2).renderRoute(c, p);
      return __privateMethod(this, _c, c_fn).call(this, u, n);
    } catch {
      if (a === false)
        return __privateMethod(this, _o, o_fn).call(this, t, { status: r, response: n, skipMiddleware: true });
    }
  }
  let l = __privateMethod(this, _c, c_fn).call(this, new Response(null, { status: r }), n);
  return Reflect.set(l, En, true), l;
}, _c = new WeakSet(), c_fn = function(t, r, n) {
  if (!r)
    return n !== void 0 ? new Response(t.body, { status: n.status, statusText: t.statusText, headers: t.headers }) : t;
  let a = n?.status ? n.status : r.status === 200 ? t.status : r.status;
  try {
    r.headers.delete("Content-type");
  } catch {
  }
  return new Response(t.body, { status: a, statusText: a === 200 ? t.statusText : r.statusText, headers: new Headers([...Array.from(t.headers), ...Array.from(r.headers)]) });
}, _g = new WeakSet(), g_fn = function(t, r) {
  if (!t.pattern.exec(r)) {
    for (let a of t.fallbackRoutes)
      if (a.pattern.test(r))
        return 302;
  }
  let n = we(t.route);
  return n.endsWith("/404") ? 404 : n.endsWith("/500") ? 500 : 200;
}, _p = new WeakSet(), p_fn = async function(t) {
  if (t.type === "redirect")
    return ui;
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
}, __publicField(_a2, "getSetCookieFromResponse", wn), _a2);
var Oi = typeof process == "object" && Object.prototype.toString.call(process) === "[object process]";
function Ui() {
  return new Proxy({}, { get: (e2, t) => {
    console.warn(`Unable to access \`import.meta\0.env.${t.toString()}\` on initialization as the Cloudflare platform only provides the environment variables per request. Please move the environment variable access inside a function that's only called after a request has been received.`);
  } });
}
Oi || (process.env = Ui());
function Hn(e2) {
  let t = new Dt(e2);
  return { onRequest: async (n) => {
    let a = n.request, { env: s } = n;
    process.env = s;
    let { pathname: i } = new URL(a.url);
    if (e2.assets.has(i))
      return s.ASSETS.fetch(a);
    let o = t.match(a);
    Reflect.set(a, Symbol.for("astro.clientAddress"), a.headers.get("cf-connecting-ip"));
    let l = { runtime: { waitUntil: (c) => {
      n.waitUntil(c);
    }, env: n.env, cf: a.cf, caches } }, d = await t.render(a, { routeData: o, locals: l });
    if (t.setCookieHeaders)
      for (let c of t.setCookieHeaders(d))
        d.headers.append("Set-Cookie", c);
    return d;
  }, manifest: e2 };
}
var Rn = Object.freeze(Object.defineProperty({ __proto__: null, createExports: Hn }, Symbol.toStringTag, { value: "Module" }));
var Di = () => Promise.resolve().then(() => (ln(), cn));
var Hi = () => Promise.resolve().then(() => (hn(), mn));
var Fi = /* @__PURE__ */ new Map([["node_modules/astro/dist/assets/endpoint/generic.js", Di], ["src/pages/index.astro", Hi]]);
var Fn = Object.assign(zr, { pageMap: Fi, renderers: G, middleware: Vr });
var Wi = void 0;
var Wn = Hn(Fn);
var oc = Wn.onRequest;
var cc = Wn.manifest;
var Tn = "start";
Tn in Rn && Rn[Tn](Fn, Wi);

// ../.wrangler/tmp/pages-OccBYR/functionsRoutes-0.8439797700348892.mjs
var routes = [
  {
    routePath: "/api/echo",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest]
  },
  {
    routePath: "/:path*",
    mountPath: "/",
    method: "",
    middlewares: [],
    modules: [oc]
  }
];

// ../node_modules/path-to-regexp/dist.es2015/index.js
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
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
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
  var _a4 = options.prefixes, prefixes = _a4 === void 0 ? "./" : _a4;
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
    var _a5 = tokens[i], nextType = _a5.type, index = _a5.index;
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
  var re2 = pathToRegexp(str, keys, options);
  return regexpToFunction(re2, keys, options);
}
function regexpToFunction(re2, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a4 = options.decode, decode = _a4 === void 0 ? function(x2) {
    return x2;
  } : _a4;
  return function(pathname) {
    var m = re2.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
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
  var _a4 = options.strict, strict = _a4 === void 0 ? false : _a4, _b = options.start, start = _b === void 0 ? true : _b, _c2 = options.end, end = _c2 === void 0 ? true : _c2, _d2 = options.encode, encode = _d2 === void 0 ? function(x2) {
    return x2;
  } : _d2, _e3 = options.delimiter, delimiter = _e3 === void 0 ? "/#?" : _e3, _f2 = options.endsWith, endsWith = _f2 === void 0 ? "" : _f2;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i3 = 0, tokens_1 = tokens; _i3 < tokens_1.length; _i3++) {
    var token = tokens_1[_i3];
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

// ../node_modules/wrangler/templates/pages-template-worker.ts
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

// ../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e2) {
  return {
    name: e2?.name,
    message: e2?.message ?? String(e2),
    stack: e2?.stack,
    cause: e2?.cause === void 0 ? void 0 : reduceError(e2.cause)
  };
}
var jsonError = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e2) {
    const error = reduceError(e2);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
};
var middleware_miniflare3_json_error_default = jsonError;
var wrap = void 0;

// ../.wrangler/tmp/bundle-X7GrUK/middleware-insertion-facade.js
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

// ../node_modules/wrangler/templates/middleware/common.ts
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

// ../.wrangler/tmp/bundle-X7GrUK/middleware-loader.entry.ts
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
//# sourceMappingURL=functionsWorker-0.5943939965523632.mjs.map

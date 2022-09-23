function js(t, e) {
  const i = /* @__PURE__ */ Object.create(null), n = t.split(",");
  for (let o = 0; o < n.length; o++)
    i[n[o]] = !0;
  return e ? (o) => !!i[o.toLowerCase()] : (o) => !!i[o];
}
function Ri(t) {
  if (Z(t)) {
    const e = {};
    for (let i = 0; i < t.length; i++) {
      const n = t[i], o = lt(n) ? qs(n) : Ri(n);
      if (o)
        for (const s in o)
          e[s] = o[s];
    }
    return e;
  } else {
    if (lt(t))
      return t;
    if (tt(t))
      return t;
  }
}
const Gs = /;(?![^(]*\))/g, $s = /:(.+)/;
function qs(t) {
  const e = {};
  return t.split(Gs).forEach((i) => {
    if (i) {
      const n = i.split($s);
      n.length > 1 && (e[n[0].trim()] = n[1].trim());
    }
  }), e;
}
function Di(t) {
  let e = "";
  if (lt(t))
    e = t;
  else if (Z(t))
    for (let i = 0; i < t.length; i++) {
      const n = Di(t[i]);
      n && (e += n + " ");
    }
  else if (tt(t))
    for (const i in t)
      t[i] && (e += i + " ");
  return e.trim();
}
const et = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, Ks = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], to = () => {
}, Ys = () => !1, Js = /^on[^a-z]/, Xs = (t) => Js.test(t), ut = Object.assign, Qs = (t, e) => {
  const i = t.indexOf(e);
  i > -1 && t.splice(i, 1);
}, tr = Object.prototype.hasOwnProperty, A = (t, e) => tr.call(t, e), Z = Array.isArray, Jt = (t) => ii(t) === "[object Map]", er = (t) => ii(t) === "[object Set]", G = (t) => typeof t == "function", lt = (t) => typeof t == "string", Fi = (t) => typeof t == "symbol", tt = (t) => t !== null && typeof t == "object", ir = (t) => tt(t) && G(t.then) && G(t.catch), nr = Object.prototype.toString, ii = (t) => nr.call(t), eo = (t) => ii(t).slice(8, -1), or = (t) => ii(t) === "[object Object]", Hi = (t) => lt(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, io = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (i) => e[i] || (e[i] = t(i));
}, no = io((t) => t.charAt(0).toUpperCase() + t.slice(1)), sr = io((t) => t ? `on${no(t)}` : ""), pe = (t, e) => !Object.is(t, e), rr = (t, e, i) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    value: i
  });
};
let On;
const ar = () => On || (On = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Cn(t, ...e) {
  console.warn(`[Vue warn] ${t}`, ...e);
}
let hr;
function ur(t, e = hr) {
  e && e.active && e.effects.push(t);
}
const me = (t) => {
  const e = new Set(t);
  return e.w = 0, e.n = 0, e;
}, oo = (t) => (t.w & zt) > 0, so = (t) => (t.n & zt) > 0, lr = ({ deps: t }) => {
  if (t.length)
    for (let e = 0; e < t.length; e++)
      t[e].w |= zt;
}, cr = (t) => {
  const { deps: e } = t;
  if (e.length) {
    let i = 0;
    for (let n = 0; n < e.length; n++) {
      const o = e[n];
      oo(o) && !so(o) ? o.delete(t) : e[i++] = o, o.w &= ~zt, o.n &= ~zt;
    }
    e.length = i;
  }
}, wi = /* @__PURE__ */ new WeakMap();
let ue = 0, zt = 1;
const xi = 30;
let q;
const Rt = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), Pi = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class fr {
  constructor(e, i = null, n) {
    this.fn = e, this.scheduler = i, this.active = !0, this.deps = [], this.parent = void 0, ur(this, n);
  }
  run() {
    if (!this.active)
      return this.fn();
    let e = q, i = Ot;
    for (; e; ) {
      if (e === this)
        return;
      e = e.parent;
    }
    try {
      return this.parent = q, q = this, Ot = !0, zt = 1 << ++ue, ue <= xi ? lr(this) : zn(this), this.fn();
    } finally {
      ue <= xi && cr(this), zt = 1 << --ue, q = this.parent, Ot = i, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    q === this ? this.deferStop = !0 : this.active && (zn(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function zn(t) {
  const { deps: e } = t;
  if (e.length) {
    for (let i = 0; i < e.length; i++)
      e[i].delete(t);
    e.length = 0;
  }
}
let Ot = !0;
const ro = [];
function Vi() {
  ro.push(Ot), Ot = !1;
}
function Wi() {
  const t = ro.pop();
  Ot = t === void 0 ? !0 : t;
}
function st(t, e, i) {
  if (Ot && q) {
    let n = wi.get(t);
    n || wi.set(t, n = /* @__PURE__ */ new Map());
    let o = n.get(i);
    o || n.set(i, o = me());
    const s = process.env.NODE_ENV !== "production" ? { effect: q, target: t, type: e, key: i } : void 0;
    bi(o, s);
  }
}
function bi(t, e) {
  let i = !1;
  ue <= xi ? so(t) || (t.n |= zt, i = !oo(t)) : i = !t.has(q), i && (t.add(q), q.deps.push(t), process.env.NODE_ENV !== "production" && q.onTrack && q.onTrack(Object.assign({ effect: q }, e)));
}
function It(t, e, i, n, o, s) {
  const r = wi.get(t);
  if (!r)
    return;
  let a = [];
  if (e === "clear")
    a = [...r.values()];
  else if (i === "length" && Z(t))
    r.forEach((u, c) => {
      (c === "length" || c >= n) && a.push(u);
    });
  else
    switch (i !== void 0 && a.push(r.get(i)), e) {
      case "add":
        Z(t) ? Hi(i) && a.push(r.get("length")) : (a.push(r.get(Rt)), Jt(t) && a.push(r.get(Pi)));
        break;
      case "delete":
        Z(t) || (a.push(r.get(Rt)), Jt(t) && a.push(r.get(Pi)));
        break;
      case "set":
        Jt(t) && a.push(r.get(Rt));
        break;
    }
  const h = process.env.NODE_ENV !== "production" ? { target: t, type: e, key: i, newValue: n, oldValue: o, oldTarget: s } : void 0;
  if (a.length === 1)
    a[0] && (process.env.NODE_ENV !== "production" ? Kt(a[0], h) : Kt(a[0]));
  else {
    const u = [];
    for (const c of a)
      c && u.push(...c);
    process.env.NODE_ENV !== "production" ? Kt(me(u), h) : Kt(me(u));
  }
}
function Kt(t, e) {
  const i = Z(t) ? t : [...t];
  for (const n of i)
    n.computed && In(n, e);
  for (const n of i)
    n.computed || In(n, e);
}
function In(t, e) {
  (t !== q || t.allowRecurse) && (process.env.NODE_ENV !== "production" && t.onTrigger && t.onTrigger(ut({ effect: t }, e)), t.scheduler ? t.scheduler() : t.run());
}
const dr = /* @__PURE__ */ js("__proto__,__v_isRef,__isVue"), ao = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(Fi)
), _r = /* @__PURE__ */ Ui(), pr = /* @__PURE__ */ Ui(!0), mr = /* @__PURE__ */ Ui(!0, !0), Nn = /* @__PURE__ */ gr();
function gr() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    t[e] = function(...i) {
      const n = v(this);
      for (let s = 0, r = this.length; s < r; s++)
        st(n, "get", s + "");
      const o = n[e](...i);
      return o === -1 || o === !1 ? n[e](...i.map(v)) : o;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    t[e] = function(...i) {
      Vi();
      const n = v(this)[e].apply(this, i);
      return Wi(), n;
    };
  }), t;
}
function Ui(t = !1, e = !1) {
  return function(n, o, s) {
    if (o === "__v_isReactive")
      return !t;
    if (o === "__v_isReadonly")
      return t;
    if (o === "__v_isShallow")
      return e;
    if (o === "__v_raw" && s === (t ? e ? fo : co : e ? Nr : lo).get(n))
      return n;
    const r = Z(n);
    if (!t && r && A(Nn, o))
      return Reflect.get(Nn, o, s);
    const a = Reflect.get(n, o, s);
    return (Fi(o) ? ao.has(o) : dr(o)) || (t || st(n, "get", o), e) ? a : K(a) ? r && Hi(o) ? a : a.value : tt(a) ? t ? po(a) : _o(a) : a;
  };
}
const vr = /* @__PURE__ */ yr();
function yr(t = !1) {
  return function(i, n, o, s) {
    let r = i[n];
    if (Nt(r) && K(r) && !K(o))
      return !1;
    if (!t && (!We(o) && !Nt(o) && (r = v(r), o = v(o)), !Z(i) && K(r) && !K(o)))
      return r.value = o, !0;
    const a = Z(i) && Hi(n) ? Number(n) < i.length : A(i, n), h = Reflect.set(i, n, o, s);
    return i === v(s) && (a ? pe(o, r) && It(i, "set", n, o, r) : It(i, "add", n, o)), h;
  };
}
function wr(t, e) {
  const i = A(t, e), n = t[e], o = Reflect.deleteProperty(t, e);
  return o && i && It(t, "delete", e, void 0, n), o;
}
function xr(t, e) {
  const i = Reflect.has(t, e);
  return (!Fi(e) || !ao.has(e)) && st(t, "has", e), i;
}
function Pr(t) {
  return st(t, "iterate", Z(t) ? "length" : Rt), Reflect.ownKeys(t);
}
const br = {
  get: _r,
  set: vr,
  deleteProperty: wr,
  has: xr,
  ownKeys: Pr
}, ho = {
  get: pr,
  set(t, e) {
    return process.env.NODE_ENV !== "production" && Cn(`Set operation on key "${String(e)}" failed: target is readonly.`, t), !0;
  },
  deleteProperty(t, e) {
    return process.env.NODE_ENV !== "production" && Cn(`Delete operation on key "${String(e)}" failed: target is readonly.`, t), !0;
  }
}, Lr = /* @__PURE__ */ ut({}, ho, {
  get: mr
}), ji = (t) => t, ni = (t) => Reflect.getPrototypeOf(t);
function ze(t, e, i = !1, n = !1) {
  t = t.__v_raw;
  const o = v(t), s = v(e);
  i || (e !== s && st(o, "get", e), st(o, "get", s));
  const { has: r } = ni(o), a = n ? ji : i ? qi : ge;
  if (r.call(o, e))
    return a(t.get(e));
  if (r.call(o, s))
    return a(t.get(s));
  t !== o && t.get(e);
}
function Ie(t, e = !1) {
  const i = this.__v_raw, n = v(i), o = v(t);
  return e || (t !== o && st(n, "has", t), st(n, "has", o)), t === o ? i.has(t) : i.has(t) || i.has(o);
}
function Ne(t, e = !1) {
  return t = t.__v_raw, !e && st(v(t), "iterate", Rt), Reflect.get(t, "size", t);
}
function kn(t) {
  t = v(t);
  const e = v(this);
  return ni(e).has.call(e, t) || (e.add(t), It(e, "add", t, t)), this;
}
function An(t, e) {
  e = v(e);
  const i = v(this), { has: n, get: o } = ni(i);
  let s = n.call(i, t);
  s ? process.env.NODE_ENV !== "production" && uo(i, n, t) : (t = v(t), s = n.call(i, t));
  const r = o.call(i, t);
  return i.set(t, e), s ? pe(e, r) && It(i, "set", t, e, r) : It(i, "add", t, e), this;
}
function Zn(t) {
  const e = v(this), { has: i, get: n } = ni(e);
  let o = i.call(e, t);
  o ? process.env.NODE_ENV !== "production" && uo(e, i, t) : (t = v(t), o = i.call(e, t));
  const s = n ? n.call(e, t) : void 0, r = e.delete(t);
  return o && It(e, "delete", t, void 0, s), r;
}
function Bn() {
  const t = v(this), e = t.size !== 0, i = process.env.NODE_ENV !== "production" ? Jt(t) ? new Map(t) : new Set(t) : void 0, n = t.clear();
  return e && It(t, "clear", void 0, void 0, i), n;
}
function ke(t, e) {
  return function(n, o) {
    const s = this, r = s.__v_raw, a = v(r), h = e ? ji : t ? qi : ge;
    return !t && st(a, "iterate", Rt), r.forEach((u, c) => n.call(o, h(u), h(c), s));
  };
}
function Ae(t, e, i) {
  return function(...n) {
    const o = this.__v_raw, s = v(o), r = Jt(s), a = t === "entries" || t === Symbol.iterator && r, h = t === "keys" && r, u = o[t](...n), c = i ? ji : e ? qi : ge;
    return !e && st(s, "iterate", h ? Pi : Rt), {
      next() {
        const { value: l, done: f } = u.next();
        return f ? { value: l, done: f } : {
          value: a ? [c(l[0]), c(l[1])] : c(l),
          done: f
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Tt(t) {
  return function(...e) {
    if (process.env.NODE_ENV !== "production") {
      const i = e[0] ? `on key "${e[0]}" ` : "";
      console.warn(`${no(t)} operation ${i}failed: target is readonly.`, v(this));
    }
    return t === "delete" ? !1 : this;
  };
}
function Tr() {
  const t = {
    get(s) {
      return ze(this, s);
    },
    get size() {
      return Ne(this);
    },
    has: Ie,
    add: kn,
    set: An,
    delete: Zn,
    clear: Bn,
    forEach: ke(!1, !1)
  }, e = {
    get(s) {
      return ze(this, s, !1, !0);
    },
    get size() {
      return Ne(this);
    },
    has: Ie,
    add: kn,
    set: An,
    delete: Zn,
    clear: Bn,
    forEach: ke(!1, !0)
  }, i = {
    get(s) {
      return ze(this, s, !0);
    },
    get size() {
      return Ne(this, !0);
    },
    has(s) {
      return Ie.call(this, s, !0);
    },
    add: Tt("add"),
    set: Tt("set"),
    delete: Tt("delete"),
    clear: Tt("clear"),
    forEach: ke(!0, !1)
  }, n = {
    get(s) {
      return ze(this, s, !0, !0);
    },
    get size() {
      return Ne(this, !0);
    },
    has(s) {
      return Ie.call(this, s, !0);
    },
    add: Tt("add"),
    set: Tt("set"),
    delete: Tt("delete"),
    clear: Tt("clear"),
    forEach: ke(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    t[s] = Ae(s, !1, !1), i[s] = Ae(s, !0, !1), e[s] = Ae(s, !1, !0), n[s] = Ae(s, !0, !0);
  }), [
    t,
    i,
    e,
    n
  ];
}
const [Er, Sr, Mr, Or] = /* @__PURE__ */ Tr();
function Gi(t, e) {
  const i = e ? t ? Or : Mr : t ? Sr : Er;
  return (n, o, s) => o === "__v_isReactive" ? !t : o === "__v_isReadonly" ? t : o === "__v_raw" ? n : Reflect.get(A(i, o) && o in n ? i : n, o, s);
}
const Cr = {
  get: /* @__PURE__ */ Gi(!1, !1)
}, zr = {
  get: /* @__PURE__ */ Gi(!0, !1)
}, Ir = {
  get: /* @__PURE__ */ Gi(!0, !0)
};
function uo(t, e, i) {
  const n = v(i);
  if (n !== i && e.call(t, n)) {
    const o = eo(t);
    console.warn(`Reactive ${o} contains both the raw and reactive versions of the same object${o === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const lo = /* @__PURE__ */ new WeakMap(), Nr = /* @__PURE__ */ new WeakMap(), co = /* @__PURE__ */ new WeakMap(), fo = /* @__PURE__ */ new WeakMap();
function kr(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Ar(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : kr(eo(t));
}
function _o(t) {
  return Nt(t) ? t : $i(t, !1, br, Cr, lo);
}
function po(t) {
  return $i(t, !0, ho, zr, co);
}
function Ze(t) {
  return $i(t, !0, Lr, Ir, fo);
}
function $i(t, e, i, n, o) {
  if (!tt(t))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(t)}`), t;
  if (t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const s = o.get(t);
  if (s)
    return s;
  const r = Ar(t);
  if (r === 0)
    return t;
  const a = new Proxy(t, r === 2 ? n : i);
  return o.set(t, a), a;
}
function Dt(t) {
  return Nt(t) ? Dt(t.__v_raw) : !!(t && t.__v_isReactive);
}
function Nt(t) {
  return !!(t && t.__v_isReadonly);
}
function We(t) {
  return !!(t && t.__v_isShallow);
}
function Li(t) {
  return Dt(t) || Nt(t);
}
function v(t) {
  const e = t && t.__v_raw;
  return e ? v(e) : t;
}
function Zr(t) {
  return rr(t, "__v_skip", !0), t;
}
const ge = (t) => tt(t) ? _o(t) : t, qi = (t) => tt(t) ? po(t) : t;
function Br(t) {
  Ot && q && (t = v(t), process.env.NODE_ENV !== "production" ? bi(t.dep || (t.dep = me()), {
    target: t,
    type: "get",
    key: "value"
  }) : bi(t.dep || (t.dep = me())));
}
function Rr(t, e) {
  t = v(t), t.dep && (process.env.NODE_ENV !== "production" ? Kt(t.dep, {
    target: t,
    type: "set",
    key: "value",
    newValue: e
  }) : Kt(t.dep));
}
function K(t) {
  return !!(t && t.__v_isRef === !0);
}
function Dr(t) {
  return Fr(t, !1);
}
function Fr(t, e) {
  return K(t) ? t : new Hr(t, e);
}
class Hr {
  constructor(e, i) {
    this.__v_isShallow = i, this.dep = void 0, this.__v_isRef = !0, this._rawValue = i ? e : v(e), this._value = i ? e : ge(e);
  }
  get value() {
    return Br(this), this._value;
  }
  set value(e) {
    const i = this.__v_isShallow || We(e) || Nt(e);
    e = i ? e : v(e), pe(e, this._rawValue) && (this._rawValue = e, this._value = i ? e : ge(e), Rr(this, e));
  }
}
function Vr(t) {
  return K(t) ? t.value : t;
}
const Wr = {
  get: (t, e, i) => Vr(Reflect.get(t, e, i)),
  set: (t, e, i, n) => {
    const o = t[e];
    return K(o) && !K(i) ? (o.value = i, !0) : Reflect.set(t, e, i, n);
  }
};
function Ur(t) {
  return Dt(t) ? t : new Proxy(t, Wr);
}
const Ft = [];
function jr(t) {
  Ft.push(t);
}
function Gr() {
  Ft.pop();
}
function Y(t, ...e) {
  Vi();
  const i = Ft.length ? Ft[Ft.length - 1].component : null, n = i && i.appContext.config.warnHandler, o = $r();
  if (n)
    Ht(n, i, 11, [
      t + e.join(""),
      i && i.proxy,
      o.map(({ vnode: s }) => `at <${No(i, s.type)}>`).join(`
`),
      o
    ]);
  else {
    const s = [`[Vue warn]: ${t}`, ...e];
    o.length && s.push(`
`, ...qr(o)), console.warn(...s);
  }
  Wi();
}
function $r() {
  let t = Ft[Ft.length - 1];
  if (!t)
    return [];
  const e = [];
  for (; t; ) {
    const i = e[0];
    i && i.vnode === t ? i.recurseCount++ : e.push({
      vnode: t,
      recurseCount: 0
    });
    const n = t.component && t.component.parent;
    t = n && n.vnode;
  }
  return e;
}
function qr(t) {
  const e = [];
  return t.forEach((i, n) => {
    e.push(...n === 0 ? [] : [`
`], ...Kr(i));
  }), e;
}
function Kr({ vnode: t, recurseCount: e }) {
  const i = e > 0 ? `... (${e} recursive calls)` : "", n = t.component ? t.component.parent == null : !1, o = ` at <${No(t.component, t.type, n)}`, s = ">" + i;
  return t.props ? [o, ...Yr(t.props), s] : [o + s];
}
function Yr(t) {
  const e = [], i = Object.keys(t);
  return i.slice(0, 3).forEach((n) => {
    e.push(...mo(n, t[n]));
  }), i.length > 3 && e.push(" ..."), e;
}
function mo(t, e, i) {
  return lt(e) ? (e = JSON.stringify(e), i ? e : [`${t}=${e}`]) : typeof e == "number" || typeof e == "boolean" || e == null ? i ? e : [`${t}=${e}`] : K(e) ? (e = mo(t, v(e.value), !0), i ? e : [`${t}=Ref<`, e, ">"]) : G(e) ? [`${t}=fn${e.name ? `<${e.name}>` : ""}`] : (e = v(e), i ? e : [`${t}=`, e]);
}
const Ki = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function Ht(t, e, i, n) {
  let o;
  try {
    o = n ? t(...n) : t();
  } catch (s) {
    go(s, e, i);
  }
  return o;
}
function Ue(t, e, i, n) {
  if (G(t)) {
    const s = Ht(t, e, i, n);
    return s && ir(s) && s.catch((r) => {
      go(r, e, i);
    }), s;
  }
  const o = [];
  for (let s = 0; s < t.length; s++)
    o.push(Ue(t[s], e, i, n));
  return o;
}
function go(t, e, i, n = !0) {
  const o = e ? e.vnode : null;
  if (e) {
    let s = e.parent;
    const r = e.proxy, a = process.env.NODE_ENV !== "production" ? Ki[i] : i;
    for (; s; ) {
      const u = s.ec;
      if (u) {
        for (let c = 0; c < u.length; c++)
          if (u[c](t, r, a) === !1)
            return;
      }
      s = s.parent;
    }
    const h = e.appContext.config.errorHandler;
    if (h) {
      Ht(h, null, 10, [t, r, a]);
      return;
    }
  }
  Jr(t, i, o, n);
}
function Jr(t, e, i, n = !0) {
  if (process.env.NODE_ENV !== "production") {
    const o = Ki[e];
    if (i && jr(i), Y(`Unhandled error${o ? ` during execution of ${o}` : ""}`), i && Gr(), n)
      throw t;
    console.error(t);
  } else
    console.error(t);
}
let je = !1, Ti = !1;
const at = [];
let St = 0;
const Xt = [];
let _t = null, Et = 0;
const vo = /* @__PURE__ */ Promise.resolve();
let Yi = null;
const Xr = 100;
function Qr(t) {
  const e = Yi || vo;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function ta(t) {
  let e = St + 1, i = at.length;
  for (; e < i; ) {
    const n = e + i >>> 1;
    ve(at[n]) < t ? e = n + 1 : i = n;
  }
  return e;
}
function Ji(t) {
  (!at.length || !at.includes(t, je && t.allowRecurse ? St + 1 : St)) && (t.id == null ? at.push(t) : at.splice(ta(t.id), 0, t), yo());
}
function yo() {
  !je && !Ti && (Ti = !0, Yi = vo.then(xo));
}
function wo(t) {
  Z(t) ? Xt.push(...t) : (!_t || !_t.includes(t, t.allowRecurse ? Et + 1 : Et)) && Xt.push(t), yo();
}
function ea(t) {
  if (Xt.length) {
    const e = [...new Set(Xt)];
    if (Xt.length = 0, _t) {
      _t.push(...e);
      return;
    }
    for (_t = e, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), _t.sort((i, n) => ve(i) - ve(n)), Et = 0; Et < _t.length; Et++)
      process.env.NODE_ENV !== "production" && Po(t, _t[Et]) || _t[Et]();
    _t = null, Et = 0;
  }
}
const ve = (t) => t.id == null ? 1 / 0 : t.id, ia = (t, e) => {
  const i = ve(t) - ve(e);
  if (i === 0) {
    if (t.pre && !e.pre)
      return -1;
    if (e.pre && !t.pre)
      return 1;
  }
  return i;
};
function xo(t) {
  Ti = !1, je = !0, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), at.sort(ia);
  const e = process.env.NODE_ENV !== "production" ? (i) => Po(t, i) : to;
  try {
    for (St = 0; St < at.length; St++) {
      const i = at[St];
      if (i && i.active !== !1) {
        if (process.env.NODE_ENV !== "production" && e(i))
          continue;
        Ht(i, null, 14);
      }
    }
  } finally {
    St = 0, at.length = 0, ea(t), je = !1, Yi = null, (at.length || Xt.length) && xo(t);
  }
}
function Po(t, e) {
  if (!t.has(e))
    t.set(e, 1);
  else {
    const i = t.get(e);
    if (i > Xr) {
      const n = e.ownerInstance, o = n && Io(n.type);
      return Y(`Maximum recursive updates exceeded${o ? ` in component <${o}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      t.set(e, i + 1);
  }
}
const ae = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (ar().__VUE_HMR_RUNTIME__ = {
  createRecord: gi(na),
  rerender: gi(oa),
  reload: gi(sa)
});
const Ge = /* @__PURE__ */ new Map();
function na(t, e) {
  return Ge.has(t) ? !1 : (Ge.set(t, {
    initialDef: ce(e),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function ce(t) {
  return ko(t) ? t.__vccOpts : t;
}
function oa(t, e) {
  const i = Ge.get(t);
  !i || (i.initialDef.render = e, [...i.instances].forEach((n) => {
    e && (n.render = e, ce(n.type).render = e), n.renderCache = [], n.update();
  }));
}
function sa(t, e) {
  const i = Ge.get(t);
  if (!i)
    return;
  e = ce(e), Rn(i.initialDef, e);
  const n = [...i.instances];
  for (const o of n) {
    const s = ce(o.type);
    ae.has(s) || (s !== i.initialDef && Rn(s, e), ae.add(s)), o.appContext.optionsCache.delete(o.type), o.ceReload ? (ae.add(s), o.ceReload(e.styles), ae.delete(s)) : o.parent ? (Ji(o.parent.update), o.parent.type.__asyncLoader && o.parent.ceReload && o.parent.ceReload(e.styles)) : o.appContext.reload ? o.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
  }
  wo(() => {
    for (const o of n)
      ae.delete(ce(o.type));
  });
}
function Rn(t, e) {
  ut(t, e);
  for (const i in t)
    i !== "__file" && !(i in e) && delete t[i];
}
function gi(t) {
  return (e, i) => {
    try {
      return t(e, i);
    } catch (n) {
      console.error(n), console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.");
    }
  };
}
let Bt = null, ra = null;
const aa = (t) => t.__isSuspense;
function ha(t, e) {
  e && e.pendingBranch ? Z(t) ? e.effects.push(...t) : e.effects.push(t) : wo(t);
}
const Dn = {};
function ua(t, e, { immediate: i, deep: n, flush: o, onTrack: s, onTrigger: r } = et) {
  process.env.NODE_ENV !== "production" && !e && (i !== void 0 && Y('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), n !== void 0 && Y('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const a = (I) => {
    Y("Invalid watch source: ", I, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, h = Ct;
  let u, c = !1, l = !1;
  if (K(t) ? (u = () => t.value, c = We(t)) : Dt(t) ? (u = () => t, n = !0) : Z(t) ? (l = !0, c = t.some((I) => Dt(I) || We(I)), u = () => t.map((I) => {
    if (K(I))
      return I.value;
    if (Dt(I))
      return Yt(I);
    if (G(I))
      return Ht(I, h, 2);
    process.env.NODE_ENV !== "production" && a(I);
  })) : G(t) ? e ? u = () => Ht(t, h, 2) : u = () => {
    if (!(h && h.isUnmounted))
      return f && f(), Ue(t, h, 3, [w]);
  } : (u = to, process.env.NODE_ENV !== "production" && a(t)), e && n) {
    const I = u;
    u = () => Yt(I());
  }
  let f, w = (I) => {
    f = H.onStop = () => {
      Ht(I, h, 4);
    };
  }, x = l ? [] : Dn;
  const O = () => {
    if (!!H.active)
      if (e) {
        const I = H.run();
        (n || c || (l ? I.some((_i, pi) => pe(_i, x[pi])) : pe(I, x))) && (f && f(), Ue(e, h, 3, [
          I,
          x === Dn ? void 0 : x,
          w
        ]), x = I);
      } else
        H.run();
  };
  O.allowRecurse = !!e;
  let W;
  o === "sync" ? W = O : o === "post" ? W = () => Vn(O, h && h.suspense) : (O.pre = !0, h && (O.id = h.uid), W = () => Ji(O));
  const H = new fr(u, W);
  return process.env.NODE_ENV !== "production" && (H.onTrack = s, H.onTrigger = r), e ? i ? O() : x = H.run() : o === "post" ? Vn(H.run.bind(H), h && h.suspense) : H.run(), () => {
    H.stop(), h && h.scope && Qs(h.scope.effects, H);
  };
}
function la(t, e, i) {
  const n = this.proxy, o = lt(t) ? t.includes(".") ? ca(n, t) : () => n[t] : t.bind(n, n);
  let s;
  G(e) ? s = e : (s = e.handler, i = e);
  const r = Ct;
  Si(this);
  const a = ua(o, s.bind(n), i);
  return r ? Si(r) : zo(), a;
}
function ca(t, e) {
  const i = e.split(".");
  return () => {
    let n = t;
    for (let o = 0; o < i.length && n; o++)
      n = n[i[o]];
    return n;
  };
}
function Yt(t, e) {
  if (!tt(t) || t.__v_skip || (e = e || /* @__PURE__ */ new Set(), e.has(t)))
    return t;
  if (e.add(t), K(t))
    Yt(t.value, e);
  else if (Z(t))
    for (let i = 0; i < t.length; i++)
      Yt(t[i], e);
  else if (er(t) || Jt(t))
    t.forEach((i) => {
      Yt(i, e);
    });
  else if (or(t))
    for (const i in t)
      Yt(t[i], e);
  return t;
}
function fa(t) {
  return G(t) ? { setup: t, name: t.name } : t;
}
function da(t, e, i = Ct, n = !1) {
  if (i) {
    const o = i[t] || (i[t] = []), s = e.__weh || (e.__weh = (...r) => {
      if (i.isUnmounted)
        return;
      Vi(), Si(i);
      const a = Ue(e, i, t, r);
      return zo(), Wi(), a;
    });
    return n ? o.unshift(s) : o.push(s), s;
  } else if (process.env.NODE_ENV !== "production") {
    const o = sr(Ki[t].replace(/ hook$/, ""));
    Y(`${o} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
  }
}
const _a = (t) => (e, i = Ct) => da(t, e, i), pa = _a("m"), ma = Symbol(), Ei = (t) => t ? Aa(t) ? Za(t) || t.proxy : Ei(t.parent) : null, $e = /* @__PURE__ */ ut(/* @__PURE__ */ Object.create(null), {
  $: (t) => t,
  $el: (t) => t.vnode.el,
  $data: (t) => t.data,
  $props: (t) => process.env.NODE_ENV !== "production" ? Ze(t.props) : t.props,
  $attrs: (t) => process.env.NODE_ENV !== "production" ? Ze(t.attrs) : t.attrs,
  $slots: (t) => process.env.NODE_ENV !== "production" ? Ze(t.slots) : t.slots,
  $refs: (t) => process.env.NODE_ENV !== "production" ? Ze(t.refs) : t.refs,
  $parent: (t) => Ei(t.parent),
  $root: (t) => Ei(t.root),
  $emit: (t) => t.emit,
  $options: (t) => ya(t),
  $forceUpdate: (t) => t.f || (t.f = () => Ji(t.update)),
  $nextTick: (t) => t.n || (t.n = Qr.bind(t.proxy)),
  $watch: (t) => la.bind(t)
}), ga = (t) => t === "_" || t === "$", va = {
  get({ _: t }, e) {
    const { ctx: i, setupState: n, data: o, props: s, accessCache: r, type: a, appContext: h } = t;
    if (process.env.NODE_ENV !== "production" && e === "__isVue")
      return !0;
    if (process.env.NODE_ENV !== "production" && n !== et && n.__isScriptSetup && A(n, e))
      return n[e];
    let u;
    if (e[0] !== "$") {
      const w = r[e];
      if (w !== void 0)
        switch (w) {
          case 1:
            return n[e];
          case 2:
            return o[e];
          case 4:
            return i[e];
          case 3:
            return s[e];
        }
      else {
        if (n !== et && A(n, e))
          return r[e] = 1, n[e];
        if (o !== et && A(o, e))
          return r[e] = 2, o[e];
        if ((u = t.propsOptions[0]) && A(u, e))
          return r[e] = 3, s[e];
        if (i !== et && A(i, e))
          return r[e] = 4, i[e];
        r[e] = 0;
      }
    }
    const c = $e[e];
    let l, f;
    if (c)
      return e === "$attrs" && (st(t, "get", e), process.env.NODE_ENV !== "production" && void 0), c(t);
    if ((l = a.__cssModules) && (l = l[e]))
      return l;
    if (i !== et && A(i, e))
      return r[e] = 4, i[e];
    if (f = h.config.globalProperties, A(f, e))
      return f[e];
    process.env.NODE_ENV !== "production" && Bt && (!lt(e) || e.indexOf("__v") !== 0) && (o !== et && ga(e[0]) && A(o, e) ? Y(`Property ${JSON.stringify(e)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : t === Bt && Y(`Property ${JSON.stringify(e)} was accessed during render but is not defined on instance.`));
  },
  set({ _: t }, e, i) {
    const { data: n, setupState: o, ctx: s } = t;
    return o !== et && A(o, e) ? (o[e] = i, !0) : n !== et && A(n, e) ? (n[e] = i, !0) : A(t.props, e) ? (process.env.NODE_ENV !== "production" && Y(`Attempting to mutate prop "${e}". Props are readonly.`, t), !1) : e[0] === "$" && e.slice(1) in t ? (process.env.NODE_ENV !== "production" && Y(`Attempting to mutate public property "${e}". Properties starting with $ are reserved and readonly.`, t), !1) : (process.env.NODE_ENV !== "production" && e in t.appContext.config.globalProperties ? Object.defineProperty(s, e, {
      enumerable: !0,
      configurable: !0,
      value: i
    }) : s[e] = i, !0);
  },
  has({ _: { data: t, setupState: e, accessCache: i, ctx: n, appContext: o, propsOptions: s } }, r) {
    let a;
    return !!i[r] || t !== et && A(t, r) || e !== et && A(e, r) || (a = s[0]) && A(a, r) || A(n, r) || A($e, r) || A(o.config.globalProperties, r);
  },
  defineProperty(t, e, i) {
    return i.get != null ? t._.accessCache[e] = 0 : A(i, "value") && this.set(t, e, i.value, null), Reflect.defineProperty(t, e, i);
  }
};
process.env.NODE_ENV !== "production" && (va.ownKeys = (t) => (Y("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(t)));
function ya(t) {
  const e = t.type, { mixins: i, extends: n } = e, { mixins: o, optionsCache: s, config: { optionMergeStrategies: r } } = t.appContext, a = s.get(e);
  let h;
  return a ? h = a : !o.length && !i && !n ? h = e : (h = {}, o.length && o.forEach((u) => qe(h, u, r, !0)), qe(h, e, r)), tt(e) && s.set(e, h), h;
}
function qe(t, e, i, n = !1) {
  const { mixins: o, extends: s } = e;
  s && qe(t, s, i, !0), o && o.forEach((r) => qe(t, r, i, !0));
  for (const r in e)
    if (n && r === "expose")
      process.env.NODE_ENV !== "production" && Y('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const a = wa[r] || i && i[r];
      t[r] = a ? a(t[r], e[r]) : e[r];
    }
  return t;
}
const wa = {
  data: Fn,
  props: Zt,
  emits: Zt,
  methods: Zt,
  computed: Zt,
  beforeCreate: $,
  created: $,
  beforeMount: $,
  mounted: $,
  beforeUpdate: $,
  updated: $,
  beforeDestroy: $,
  beforeUnmount: $,
  destroyed: $,
  unmounted: $,
  activated: $,
  deactivated: $,
  errorCaptured: $,
  serverPrefetch: $,
  components: Zt,
  directives: Zt,
  watch: Pa,
  provide: Fn,
  inject: xa
};
function Fn(t, e) {
  return e ? t ? function() {
    return ut(G(t) ? t.call(this, this) : t, G(e) ? e.call(this, this) : e);
  } : e : t;
}
function xa(t, e) {
  return Zt(Hn(t), Hn(e));
}
function Hn(t) {
  if (Z(t)) {
    const e = {};
    for (let i = 0; i < t.length; i++)
      e[t[i]] = t[i];
    return e;
  }
  return t;
}
function $(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function Zt(t, e) {
  return t ? ut(ut(/* @__PURE__ */ Object.create(null), t), e) : e;
}
function Pa(t, e) {
  if (!t)
    return e;
  if (!e)
    return t;
  const i = ut(/* @__PURE__ */ Object.create(null), t);
  for (const n in e)
    i[n] = $(t[n], e[n]);
  return i;
}
function ba() {
  return {
    app: null,
    config: {
      isNativeTag: Ys,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
const Vn = ha, La = (t) => t.__isTeleport, bo = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0), Ta = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0), Ea = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0);
Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0);
const Be = [];
let ht = null;
function Lo(t = !1) {
  Be.push(ht = t ? null : []);
}
function Sa() {
  Be.pop(), ht = Be[Be.length - 1] || null;
}
function Ma(t) {
  return t.dynamicChildren = ht || Ks, Sa(), ht && ht.push(t), t;
}
function To(t, e, i, n, o, s) {
  return Ma(Mo(t, e, i, n, o, s, !0));
}
function Oa(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
const Ca = (...t) => Oo(...t), Eo = "__vInternal", So = ({ key: t }) => t != null ? t : null, Re = ({ ref: t, ref_key: e, ref_for: i }) => t != null ? lt(t) || K(t) || G(t) ? { i: Bt, r: t, k: e, f: !!i } : t : null;
function Mo(t, e = null, i = null, n = 0, o = null, s = t === bo ? 0 : 1, r = !1, a = !1) {
  const h = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && So(e),
    ref: e && Re(e),
    scopeId: ra,
    slotScopeIds: null,
    children: i,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: n,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null
  };
  return a ? (Xi(h, i), s & 128 && t.normalize(h)) : i && (h.shapeFlag |= lt(i) ? 8 : 16), process.env.NODE_ENV !== "production" && h.key !== h.key && Y("VNode created with invalid key (NaN). VNode type:", h.type), !r && ht && (h.patchFlag > 0 || s & 6) && h.patchFlag !== 32 && ht.push(h), h;
}
const za = process.env.NODE_ENV !== "production" ? Ca : Oo;
function Oo(t, e = null, i = null, n = 0, o = null, s = !1) {
  if ((!t || t === ma) && (process.env.NODE_ENV !== "production" && !t && Y(`Invalid vnode type when creating vnode: ${t}.`), t = Ea), Oa(t)) {
    const a = Ke(t, e, !0);
    return i && Xi(a, i), !s && ht && (a.shapeFlag & 6 ? ht[ht.indexOf(t)] = a : ht.push(a)), a.patchFlag |= -2, a;
  }
  if (ko(t) && (t = t.__vccOpts), e) {
    e = Ia(e);
    let { class: a, style: h } = e;
    a && !lt(a) && (e.class = Di(a)), tt(h) && (Li(h) && !Z(h) && (h = ut({}, h)), e.style = Ri(h));
  }
  const r = lt(t) ? 1 : aa(t) ? 128 : La(t) ? 64 : tt(t) ? 4 : G(t) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && r & 4 && Li(t) && (t = v(t), Y("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, t)), Mo(t, e, i, n, o, r, s, !0);
}
function Ia(t) {
  return t ? Li(t) || Eo in t ? ut({}, t) : t : null;
}
function Ke(t, e, i = !1) {
  const { props: n, ref: o, patchFlag: s, children: r } = t, a = e ? ka(n || {}, e) : n;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: a,
    key: a && So(a),
    ref: e && e.ref ? i && o ? Z(o) ? o.concat(Re(e)) : [o, Re(e)] : Re(e) : o,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && s === -1 && Z(r) ? r.map(Co) : r,
    target: t.target,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    patchFlag: e && t.type !== bo ? s === -1 ? 16 : s | 16 : s,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: t.transition,
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && Ke(t.ssContent),
    ssFallback: t.ssFallback && Ke(t.ssFallback),
    el: t.el,
    anchor: t.anchor
  };
}
function Co(t) {
  const e = Ke(t);
  return Z(t.children) && (e.children = t.children.map(Co)), e;
}
function Na(t = " ", e = 0) {
  return za(Ta, null, t, e);
}
function Xi(t, e) {
  let i = 0;
  const { shapeFlag: n } = t;
  if (e == null)
    e = null;
  else if (Z(e))
    i = 16;
  else if (typeof e == "object")
    if (n & 65) {
      const o = e.default;
      o && (o._c && (o._d = !1), Xi(t, o()), o._c && (o._d = !0));
      return;
    } else {
      i = 32;
      const o = e._;
      !o && !(Eo in e) ? e._ctx = Bt : o === 3 && Bt && (Bt.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else
    G(e) ? (e = { default: e, _ctx: Bt }, i = 32) : (e = String(e), n & 64 ? (i = 16, e = [Na(e)]) : i = 8);
  t.children = e, t.shapeFlag |= i;
}
function ka(...t) {
  const e = {};
  for (let i = 0; i < t.length; i++) {
    const n = t[i];
    for (const o in n)
      if (o === "class")
        e.class !== n.class && (e.class = Di([e.class, n.class]));
      else if (o === "style")
        e.style = Ri([e.style, n.style]);
      else if (Xs(o)) {
        const s = e[o], r = n[o];
        r && s !== r && !(Z(s) && s.includes(r)) && (e[o] = s ? [].concat(s, r) : r);
      } else
        o !== "" && (e[o] = n[o]);
  }
  return e;
}
ba();
let Ct = null;
const Si = (t) => {
  Ct = t, t.scope.on();
}, zo = () => {
  Ct && Ct.scope.off(), Ct = null;
};
function Aa(t) {
  return t.vnode.shapeFlag & 4;
}
function Za(t) {
  if (t.exposed)
    return t.exposeProxy || (t.exposeProxy = new Proxy(Ur(Zr(t.exposed)), {
      get(e, i) {
        if (i in e)
          return e[i];
        if (i in $e)
          return $e[i](t);
      }
    }));
}
const Ba = /(?:^|[-_])(\w)/g, Ra = (t) => t.replace(Ba, (e) => e.toUpperCase()).replace(/[-_]/g, "");
function Io(t, e = !0) {
  return G(t) ? t.displayName || t.name : t.name || e && t.__name;
}
function No(t, e, i = !1) {
  let n = Io(e);
  if (!n && e.__file) {
    const o = e.__file.match(/([^/\\]+)\.\w+$/);
    o && (n = o[1]);
  }
  if (!n && t && t.parent) {
    const o = (s) => {
      for (const r in s)
        if (s[r] === e)
          return r;
    };
    n = o(t.components || t.parent.type.components) || o(t.appContext.components);
  }
  return n ? Ra(n) : i ? "App" : "Anonymous";
}
function ko(t) {
  return G(t) && "__vccOpts" in t;
}
Symbol(process.env.NODE_ENV !== "production" ? "ssrContext" : "");
function vi(t) {
  return !!(t && t.__v_isShallow);
}
function Da() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const t = { style: "color:#3ba776" }, e = { style: "color:#0b1bc9" }, i = { style: "color:#b62e24" }, n = { style: "color:#9d288c" }, o = {
    header(l) {
      return tt(l) ? l.__isVue ? ["div", t, "VueInstance"] : K(l) ? [
        "div",
        {},
        ["span", t, c(l)],
        "<",
        a(l.value),
        ">"
      ] : Dt(l) ? [
        "div",
        {},
        ["span", t, vi(l) ? "ShallowReactive" : "Reactive"],
        "<",
        a(l),
        `>${Nt(l) ? " (readonly)" : ""}`
      ] : Nt(l) ? [
        "div",
        {},
        ["span", t, vi(l) ? "ShallowReadonly" : "Readonly"],
        "<",
        a(l),
        ">"
      ] : null : null;
    },
    hasBody(l) {
      return l && l.__isVue;
    },
    body(l) {
      if (l && l.__isVue)
        return [
          "div",
          {},
          ...s(l.$)
        ];
    }
  };
  function s(l) {
    const f = [];
    l.type.props && l.props && f.push(r("props", v(l.props))), l.setupState !== et && f.push(r("setup", l.setupState)), l.data !== et && f.push(r("data", v(l.data)));
    const w = h(l, "computed");
    w && f.push(r("computed", w));
    const x = h(l, "inject");
    return x && f.push(r("injected", x)), f.push([
      "div",
      {},
      [
        "span",
        {
          style: n.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), f;
  }
  function r(l, f) {
    return f = ut({}, f), Object.keys(f).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        l
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(f).map((w) => [
          "div",
          {},
          ["span", n, w + ": "],
          a(f[w], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function a(l, f = !0) {
    return typeof l == "number" ? ["span", e, l] : typeof l == "string" ? ["span", i, JSON.stringify(l)] : typeof l == "boolean" ? ["span", n, l] : tt(l) ? ["object", { object: f ? v(l) : l }] : ["span", i, String(l)];
  }
  function h(l, f) {
    const w = l.type;
    if (G(w))
      return;
    const x = {};
    for (const O in l.ctx)
      u(w, O, f) && (x[O] = l.ctx[O]);
    return x;
  }
  function u(l, f, w) {
    const x = l[w];
    if (Z(x) && x.includes(f) || tt(x) && f in x || l.extends && u(l.extends, f, w) || l.mixins && l.mixins.some((O) => u(O, f, w)))
      return !0;
  }
  function c(l) {
    return vi(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(o) : window.devtoolsFormatters = [o];
}
function Fa() {
  Da();
}
process.env.NODE_ENV !== "production" && Fa();
const Ao = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [n, o] of e)
    i[n] = o;
  return i;
}, Ha = {};
function Va(t, e) {
  return Lo(), To("div", null, "11");
}
const mu = /* @__PURE__ */ Ao(Ha, [["render", Va], ["__file", "/Users/wangchen/WebstormProjects/njhh-ui/lib/demo-ui.vue"]]);
/* @preserve
 * Leaflet 1.9.0+main.a7e1bbc, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2022 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */
var Wa = "1.9.0+main.a7e1bbcb";
function T(t) {
  var e, i, n, o;
  for (i = 1, n = arguments.length; i < n; i++) {
    o = arguments[i];
    for (e in o)
      t[e] = o[e];
  }
  return t;
}
var Ye = Object.create || function() {
  function t() {
  }
  return function(e) {
    return t.prototype = e, new t();
  };
}();
function C(t, e) {
  var i = Array.prototype.slice;
  if (t.bind)
    return t.bind.apply(t, i.call(arguments, 1));
  var n = i.call(arguments, 2);
  return function() {
    return t.apply(e, n.length ? n.concat(i.call(arguments)) : arguments);
  };
}
var Zo = 0;
function b(t) {
  return "_leaflet_id" in t || (t._leaflet_id = ++Zo), t._leaflet_id;
}
function Bo(t, e, i) {
  var n, o, s, r;
  return r = function() {
    n = !1, o && (s.apply(i, o), o = !1);
  }, s = function() {
    n ? o = arguments : (t.apply(i, arguments), setTimeout(r, e), n = !0);
  }, s;
}
function ye(t, e, i) {
  var n = e[1], o = e[0], s = n - o;
  return t === n && i ? t : ((t - o) % s + s) % s + o;
}
function D() {
  return !1;
}
function pt(t, e) {
  if (e === !1)
    return t;
  var i = Math.pow(10, e === void 0 ? 6 : e);
  return Math.round(t * i) / i;
}
function Qi(t) {
  return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
}
function Vt(t) {
  return Qi(t).split(/\s+/);
}
function z(t, e) {
  Object.prototype.hasOwnProperty.call(t, "options") || (t.options = t.options ? Ye(t.options) : {});
  for (var i in e)
    t.options[i] = e[i];
  return t.options;
}
function Ro(t, e, i) {
  var n = [];
  for (var o in t)
    n.push(encodeURIComponent(i ? o.toUpperCase() : o) + "=" + encodeURIComponent(t[o]));
  return (!e || e.indexOf("?") === -1 ? "?" : "&") + n.join("&");
}
var Ua = /\{ *([\w_ -]+) *\}/g;
function Do(t, e) {
  return t.replace(Ua, function(i, n) {
    var o = e[n];
    if (o === void 0)
      throw new Error("No value provided for variable " + i);
    return typeof o == "function" && (o = o(e)), o;
  });
}
var ft = Array.isArray || function(t) {
  return Object.prototype.toString.call(t) === "[object Array]";
};
function tn(t, e) {
  for (var i = 0; i < t.length; i++)
    if (t[i] === e)
      return i;
  return -1;
}
var De = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
function Mi(t) {
  return window["webkit" + t] || window["moz" + t] || window["ms" + t];
}
var Wn = 0;
function Fo(t) {
  var e = +new Date(), i = Math.max(0, 16 - (e - Wn));
  return Wn = e + i, window.setTimeout(t, i);
}
var Oi = window.requestAnimationFrame || Mi("RequestAnimationFrame") || Fo, Ho = window.cancelAnimationFrame || Mi("CancelAnimationFrame") || Mi("CancelRequestAnimationFrame") || function(t) {
  window.clearTimeout(t);
};
function X(t, e, i) {
  if (i && Oi === Fo)
    t.call(e);
  else
    return Oi.call(window, C(t, e));
}
function ot(t) {
  t && Ho.call(window, t);
}
var ja = {
  __proto__: null,
  extend: T,
  create: Ye,
  bind: C,
  get lastId() {
    return Zo;
  },
  stamp: b,
  throttle: Bo,
  wrapNum: ye,
  falseFn: D,
  formatNum: pt,
  trim: Qi,
  splitWords: Vt,
  setOptions: z,
  getParamString: Ro,
  template: Do,
  isArray: ft,
  indexOf: tn,
  emptyImageUrl: De,
  requestFn: Oi,
  cancelFn: Ho,
  requestAnimFrame: X,
  cancelAnimFrame: ot
};
function Pt() {
}
Pt.extend = function(t) {
  var e = function() {
    z(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
  }, i = e.__super__ = this.prototype, n = Ye(i);
  n.constructor = e, e.prototype = n;
  for (var o in this)
    Object.prototype.hasOwnProperty.call(this, o) && o !== "prototype" && o !== "__super__" && (e[o] = this[o]);
  return t.statics && T(e, t.statics), t.includes && (Ga(t.includes), T.apply(null, [n].concat(t.includes))), T(n, t), delete n.statics, delete n.includes, n.options && (n.options = i.options ? Ye(i.options) : {}, T(n.options, t.options)), n._initHooks = [], n.callInitHooks = function() {
    if (!this._initHooksCalled) {
      i.callInitHooks && i.callInitHooks.call(this), this._initHooksCalled = !0;
      for (var s = 0, r = n._initHooks.length; s < r; s++)
        n._initHooks[s].call(this);
    }
  }, e;
};
Pt.include = function(t) {
  var e = this.prototype.options;
  return T(this.prototype, t), t.options && (this.prototype.options = e, this.mergeOptions(t.options)), this;
};
Pt.mergeOptions = function(t) {
  return T(this.prototype.options, t), this;
};
Pt.addInitHook = function(t) {
  var e = Array.prototype.slice.call(arguments, 1), i = typeof t == "function" ? t : function() {
    this[t].apply(this, e);
  };
  return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(i), this;
};
function Ga(t) {
  if (!(typeof L > "u" || !L || !L.Mixin)) {
    t = ft(t) ? t : [t];
    for (var e = 0; e < t.length; e++)
      t[e] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
  }
}
var it = {
  on: function(t, e, i) {
    if (typeof t == "object")
      for (var n in t)
        this._on(n, t[n], e);
    else {
      t = Vt(t);
      for (var o = 0, s = t.length; o < s; o++)
        this._on(t[o], e, i);
    }
    return this;
  },
  off: function(t, e, i) {
    if (!arguments.length)
      delete this._events;
    else if (typeof t == "object")
      for (var n in t)
        this._off(n, t[n], e);
    else {
      t = Vt(t);
      for (var o = arguments.length === 1, s = 0, r = t.length; s < r; s++)
        o ? this._off(t[s]) : this._off(t[s], e, i);
    }
    return this;
  },
  _on: function(t, e, i, n) {
    if (typeof e != "function") {
      console.warn("wrong listener type: " + typeof e);
      return;
    }
    if (this._listens(t, e, i) === !1) {
      i === this && (i = void 0);
      var o = { fn: e, ctx: i };
      n && (o.once = !0), this._events = this._events || {}, this._events[t] = this._events[t] || [], this._events[t].push(o);
    }
  },
  _off: function(t, e, i) {
    var n, o, s;
    if (!!this._events && (n = this._events[t], !!n)) {
      if (arguments.length === 1) {
        if (this._firingCount)
          for (o = 0, s = n.length; o < s; o++)
            n[o].fn = D;
        delete this._events[t];
        return;
      }
      if (typeof e != "function") {
        console.warn("wrong listener type: " + typeof e);
        return;
      }
      var r = this._listens(t, e, i);
      if (r !== !1) {
        var a = n[r];
        this._firingCount && (a.fn = D, this._events[t] = n = n.slice()), n.splice(r, 1);
      }
    }
  },
  fire: function(t, e, i) {
    if (!this.listens(t, i))
      return this;
    var n = T({}, e, {
      type: t,
      target: this,
      sourceTarget: e && e.sourceTarget || this
    });
    if (this._events) {
      var o = this._events[t];
      if (o) {
        this._firingCount = this._firingCount + 1 || 1;
        for (var s = 0, r = o.length; s < r; s++) {
          var a = o[s], h = a.fn;
          a.once && this.off(t, h, a.ctx), h.call(a.ctx || this, n);
        }
        this._firingCount--;
      }
    }
    return i && this._propagateEvent(n), this;
  },
  listens: function(t, e, i, n) {
    typeof t != "string" && console.warn('"string" type argument expected'), typeof e != "function" && (n = !!e, e = void 0, i = void 0);
    var o = this._events && this._events[t];
    if (o && o.length && this._listens(t, e, i) !== !1)
      return !0;
    if (n) {
      for (var s in this._eventParents)
        if (this._eventParents[s].listens(t, e, i, n))
          return !0;
    }
    return !1;
  },
  _listens: function(t, e, i) {
    if (!this._events)
      return !1;
    var n = this._events[t] || [];
    if (!e)
      return !!n.length;
    i === this && (i = void 0);
    for (var o = 0, s = n.length; o < s; o++)
      if (n[o].fn === e && n[o].ctx === i)
        return o;
    return !1;
  },
  once: function(t, e, i) {
    if (typeof t == "object")
      for (var n in t)
        this._on(n, t[n], e, !0);
    else {
      t = Vt(t);
      for (var o = 0, s = t.length; o < s; o++)
        this._on(t[o], e, i, !0);
    }
    return this;
  },
  addEventParent: function(t) {
    return this._eventParents = this._eventParents || {}, this._eventParents[b(t)] = t, this;
  },
  removeEventParent: function(t) {
    return this._eventParents && delete this._eventParents[b(t)], this;
  },
  _propagateEvent: function(t) {
    for (var e in this._eventParents)
      this._eventParents[e].fire(t.type, T({
        layer: t.target,
        propagatedFrom: t.target
      }, t), !0);
  }
};
it.addEventListener = it.on;
it.removeEventListener = it.clearAllEventListeners = it.off;
it.addOneTimeEventListener = it.once;
it.fireEvent = it.fire;
it.hasEventListeners = it.listens;
var be = Pt.extend(it);
function m(t, e, i) {
  this.x = i ? Math.round(t) : t, this.y = i ? Math.round(e) : e;
}
var Un = Math.trunc || function(t) {
  return t > 0 ? Math.floor(t) : Math.ceil(t);
};
m.prototype = {
  clone: function() {
    return new m(this.x, this.y);
  },
  add: function(t) {
    return this.clone()._add(_(t));
  },
  _add: function(t) {
    return this.x += t.x, this.y += t.y, this;
  },
  subtract: function(t) {
    return this.clone()._subtract(_(t));
  },
  _subtract: function(t) {
    return this.x -= t.x, this.y -= t.y, this;
  },
  divideBy: function(t) {
    return this.clone()._divideBy(t);
  },
  _divideBy: function(t) {
    return this.x /= t, this.y /= t, this;
  },
  multiplyBy: function(t) {
    return this.clone()._multiplyBy(t);
  },
  _multiplyBy: function(t) {
    return this.x *= t, this.y *= t, this;
  },
  scaleBy: function(t) {
    return new m(this.x * t.x, this.y * t.y);
  },
  unscaleBy: function(t) {
    return new m(this.x / t.x, this.y / t.y);
  },
  round: function() {
    return this.clone()._round();
  },
  _round: function() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  },
  floor: function() {
    return this.clone()._floor();
  },
  _floor: function() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  },
  ceil: function() {
    return this.clone()._ceil();
  },
  _ceil: function() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  },
  trunc: function() {
    return this.clone()._trunc();
  },
  _trunc: function() {
    return this.x = Un(this.x), this.y = Un(this.y), this;
  },
  distanceTo: function(t) {
    t = _(t);
    var e = t.x - this.x, i = t.y - this.y;
    return Math.sqrt(e * e + i * i);
  },
  equals: function(t) {
    return t = _(t), t.x === this.x && t.y === this.y;
  },
  contains: function(t) {
    return t = _(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y);
  },
  toString: function() {
    return "Point(" + pt(this.x) + ", " + pt(this.y) + ")";
  }
};
function _(t, e, i) {
  return t instanceof m ? t : ft(t) ? new m(t[0], t[1]) : t == null ? t : typeof t == "object" && "x" in t && "y" in t ? new m(t.x, t.y) : new m(t, e, i);
}
function k(t, e) {
  if (!!t)
    for (var i = e ? [t, e] : t, n = 0, o = i.length; n < o; n++)
      this.extend(i[n]);
}
k.prototype = {
  extend: function(t) {
    var e, i;
    if (!t)
      return this;
    if (t instanceof m || typeof t[0] == "number" || "x" in t)
      e = i = _(t);
    else if (t = J(t), e = t.min, i = t.max, !e || !i)
      return this;
    return !this.min && !this.max ? (this.min = e.clone(), this.max = i.clone()) : (this.min.x = Math.min(e.x, this.min.x), this.max.x = Math.max(i.x, this.max.x), this.min.y = Math.min(e.y, this.min.y), this.max.y = Math.max(i.y, this.max.y)), this;
  },
  getCenter: function(t) {
    return _(
      (this.min.x + this.max.x) / 2,
      (this.min.y + this.max.y) / 2,
      t
    );
  },
  getBottomLeft: function() {
    return _(this.min.x, this.max.y);
  },
  getTopRight: function() {
    return _(this.max.x, this.min.y);
  },
  getTopLeft: function() {
    return this.min;
  },
  getBottomRight: function() {
    return this.max;
  },
  getSize: function() {
    return this.max.subtract(this.min);
  },
  contains: function(t) {
    var e, i;
    return typeof t[0] == "number" || t instanceof m ? t = _(t) : t = J(t), t instanceof k ? (e = t.min, i = t.max) : e = i = t, e.x >= this.min.x && i.x <= this.max.x && e.y >= this.min.y && i.y <= this.max.y;
  },
  intersects: function(t) {
    t = J(t);
    var e = this.min, i = this.max, n = t.min, o = t.max, s = o.x >= e.x && n.x <= i.x, r = o.y >= e.y && n.y <= i.y;
    return s && r;
  },
  overlaps: function(t) {
    t = J(t);
    var e = this.min, i = this.max, n = t.min, o = t.max, s = o.x > e.x && n.x < i.x, r = o.y > e.y && n.y < i.y;
    return s && r;
  },
  isValid: function() {
    return !!(this.min && this.max);
  },
  pad: function(t) {
    var e = this.min, i = this.max, n = Math.abs(e.x - i.x) * t, o = Math.abs(e.y - i.y) * t;
    return J(
      _(e.x - n, e.y - o),
      _(i.x + n, i.y + o)
    );
  },
  equals: function(t) {
    return t ? (t = J(t), this.min.equals(t.getTopLeft()) && this.max.equals(t.getBottomRight())) : !1;
  }
};
function J(t, e) {
  return !t || t instanceof k ? t : new k(t, e);
}
function Q(t, e) {
  if (!!t)
    for (var i = e ? [t, e] : t, n = 0, o = i.length; n < o; n++)
      this.extend(i[n]);
}
Q.prototype = {
  extend: function(t) {
    var e = this._southWest, i = this._northEast, n, o;
    if (t instanceof E)
      n = t, o = t;
    else if (t instanceof Q) {
      if (n = t._southWest, o = t._northEast, !n || !o)
        return this;
    } else
      return t ? this.extend(S(t) || V(t)) : this;
    return !e && !i ? (this._southWest = new E(n.lat, n.lng), this._northEast = new E(o.lat, o.lng)) : (e.lat = Math.min(n.lat, e.lat), e.lng = Math.min(n.lng, e.lng), i.lat = Math.max(o.lat, i.lat), i.lng = Math.max(o.lng, i.lng)), this;
  },
  pad: function(t) {
    var e = this._southWest, i = this._northEast, n = Math.abs(e.lat - i.lat) * t, o = Math.abs(e.lng - i.lng) * t;
    return new Q(
      new E(e.lat - n, e.lng - o),
      new E(i.lat + n, i.lng + o)
    );
  },
  getCenter: function() {
    return new E(
      (this._southWest.lat + this._northEast.lat) / 2,
      (this._southWest.lng + this._northEast.lng) / 2
    );
  },
  getSouthWest: function() {
    return this._southWest;
  },
  getNorthEast: function() {
    return this._northEast;
  },
  getNorthWest: function() {
    return new E(this.getNorth(), this.getWest());
  },
  getSouthEast: function() {
    return new E(this.getSouth(), this.getEast());
  },
  getWest: function() {
    return this._southWest.lng;
  },
  getSouth: function() {
    return this._southWest.lat;
  },
  getEast: function() {
    return this._northEast.lng;
  },
  getNorth: function() {
    return this._northEast.lat;
  },
  contains: function(t) {
    typeof t[0] == "number" || t instanceof E || "lat" in t ? t = S(t) : t = V(t);
    var e = this._southWest, i = this._northEast, n, o;
    return t instanceof Q ? (n = t.getSouthWest(), o = t.getNorthEast()) : n = o = t, n.lat >= e.lat && o.lat <= i.lat && n.lng >= e.lng && o.lng <= i.lng;
  },
  intersects: function(t) {
    t = V(t);
    var e = this._southWest, i = this._northEast, n = t.getSouthWest(), o = t.getNorthEast(), s = o.lat >= e.lat && n.lat <= i.lat, r = o.lng >= e.lng && n.lng <= i.lng;
    return s && r;
  },
  overlaps: function(t) {
    t = V(t);
    var e = this._southWest, i = this._northEast, n = t.getSouthWest(), o = t.getNorthEast(), s = o.lat > e.lat && n.lat < i.lat, r = o.lng > e.lng && n.lng < i.lng;
    return s && r;
  },
  toBBoxString: function() {
    return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",");
  },
  equals: function(t, e) {
    return t ? (t = V(t), this._southWest.equals(t.getSouthWest(), e) && this._northEast.equals(t.getNorthEast(), e)) : !1;
  },
  isValid: function() {
    return !!(this._southWest && this._northEast);
  }
};
function V(t, e) {
  return t instanceof Q ? t : new Q(t, e);
}
function E(t, e, i) {
  if (isNaN(t) || isNaN(e))
    throw new Error("Invalid LatLng object: (" + t + ", " + e + ")");
  this.lat = +t, this.lng = +e, i !== void 0 && (this.alt = +i);
}
E.prototype = {
  equals: function(t, e) {
    if (!t)
      return !1;
    t = S(t);
    var i = Math.max(
      Math.abs(this.lat - t.lat),
      Math.abs(this.lng - t.lng)
    );
    return i <= (e === void 0 ? 1e-9 : e);
  },
  toString: function(t) {
    return "LatLng(" + pt(this.lat, t) + ", " + pt(this.lng, t) + ")";
  },
  distanceTo: function(t) {
    return kt.distance(this, S(t));
  },
  wrap: function() {
    return kt.wrapLatLng(this);
  },
  toBounds: function(t) {
    var e = 180 * t / 40075017, i = e / Math.cos(Math.PI / 180 * this.lat);
    return V(
      [this.lat - e, this.lng - i],
      [this.lat + e, this.lng + i]
    );
  },
  clone: function() {
    return new E(this.lat, this.lng, this.alt);
  }
};
function S(t, e, i) {
  return t instanceof E ? t : ft(t) && typeof t[0] != "object" ? t.length === 3 ? new E(t[0], t[1], t[2]) : t.length === 2 ? new E(t[0], t[1]) : null : t == null ? t : typeof t == "object" && "lat" in t ? new E(t.lat, "lng" in t ? t.lng : t.lon, t.alt) : e === void 0 ? null : new E(t, e, i);
}
var bt = {
  latLngToPoint: function(t, e) {
    var i = this.projection.project(t), n = this.scale(e);
    return this.transformation._transform(i, n);
  },
  pointToLatLng: function(t, e) {
    var i = this.scale(e), n = this.transformation.untransform(t, i);
    return this.projection.unproject(n);
  },
  project: function(t) {
    return this.projection.project(t);
  },
  unproject: function(t) {
    return this.projection.unproject(t);
  },
  scale: function(t) {
    return 256 * Math.pow(2, t);
  },
  zoom: function(t) {
    return Math.log(t / 256) / Math.LN2;
  },
  getProjectedBounds: function(t) {
    if (this.infinite)
      return null;
    var e = this.projection.bounds, i = this.scale(t), n = this.transformation.transform(e.min, i), o = this.transformation.transform(e.max, i);
    return new k(n, o);
  },
  infinite: !1,
  wrapLatLng: function(t) {
    var e = this.wrapLng ? ye(t.lng, this.wrapLng, !0) : t.lng, i = this.wrapLat ? ye(t.lat, this.wrapLat, !0) : t.lat, n = t.alt;
    return new E(i, e, n);
  },
  wrapLatLngBounds: function(t) {
    var e = t.getCenter(), i = this.wrapLatLng(e), n = e.lat - i.lat, o = e.lng - i.lng;
    if (n === 0 && o === 0)
      return t;
    var s = t.getSouthWest(), r = t.getNorthEast(), a = new E(s.lat - n, s.lng - o), h = new E(r.lat - n, r.lng - o);
    return new Q(a, h);
  }
}, kt = T({}, bt, {
  wrapLng: [-180, 180],
  R: 6371e3,
  distance: function(t, e) {
    var i = Math.PI / 180, n = t.lat * i, o = e.lat * i, s = Math.sin((e.lat - t.lat) * i / 2), r = Math.sin((e.lng - t.lng) * i / 2), a = s * s + Math.cos(n) * Math.cos(o) * r * r, h = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.R * h;
  }
}), jn = 6378137, Ci = {
  R: jn,
  MAX_LATITUDE: 85.0511287798,
  project: function(t) {
    var e = Math.PI / 180, i = this.MAX_LATITUDE, n = Math.max(Math.min(i, t.lat), -i), o = Math.sin(n * e);
    return new m(
      this.R * t.lng * e,
      this.R * Math.log((1 + o) / (1 - o)) / 2
    );
  },
  unproject: function(t) {
    var e = 180 / Math.PI;
    return new E(
      (2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * e,
      t.x * e / this.R
    );
  },
  bounds: function() {
    var t = jn * Math.PI;
    return new k([-t, -t], [t, t]);
  }()
};
function en(t, e, i, n) {
  if (ft(t)) {
    this._a = t[0], this._b = t[1], this._c = t[2], this._d = t[3];
    return;
  }
  this._a = t, this._b = e, this._c = i, this._d = n;
}
en.prototype = {
  transform: function(t, e) {
    return this._transform(t.clone(), e);
  },
  _transform: function(t, e) {
    return e = e || 1, t.x = e * (this._a * t.x + this._b), t.y = e * (this._c * t.y + this._d), t;
  },
  untransform: function(t, e) {
    return e = e || 1, new m(
      (t.x / e - this._b) / this._a,
      (t.y / e - this._d) / this._c
    );
  }
};
function Le(t, e, i, n) {
  return new en(t, e, i, n);
}
var nn = T({}, kt, {
  code: "EPSG:3857",
  projection: Ci,
  transformation: function() {
    var t = 0.5 / (Math.PI * Ci.R);
    return Le(t, 0.5, -t, 0.5);
  }()
}), $a = T({}, nn, {
  code: "EPSG:900913"
});
function Vo(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t);
}
function Wo(t, e) {
  var i = "", n, o, s, r, a, h;
  for (n = 0, s = t.length; n < s; n++) {
    for (a = t[n], o = 0, r = a.length; o < r; o++)
      h = a[o], i += (o ? "L" : "M") + h.x + " " + h.y;
    i += e ? d.svg ? "z" : "x" : "";
  }
  return i || "M0 0";
}
var on = document.documentElement.style, oi = "ActiveXObject" in window, qa = oi && !document.addEventListener, Uo = "msLaunchUri" in navigator && !("documentMode" in document), sn = vt("webkit"), jo = vt("android"), Go = vt("android 2") || vt("android 3"), Ka = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), Ya = jo && vt("Google") && Ka < 537 && !("AudioNode" in window), rn = !!window.opera, $o = !Uo && vt("chrome"), qo = vt("gecko") && !sn && !rn && !oi, Ja = !$o && vt("safari"), Ko = vt("phantom"), Yo = "OTransition" in on, Xa = navigator.platform.indexOf("Win") === 0, Jo = oi && "transition" in on, an = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !Go, Xo = "MozPerspective" in on, Qa = !window.L_DISABLE_3D && (Jo || an || Xo) && !Yo && !Ko, Te = typeof orientation < "u" || vt("mobile"), th = Te && sn, eh = Te && an, Qo = !window.PointerEvent && window.MSPointerEvent, ts = !!(window.PointerEvent || Qo), es = "ontouchstart" in window || !!window.TouchEvent, ih = !window.L_NO_TOUCH && (es || ts), nh = Te && rn, oh = Te && qo, sh = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, rh = function() {
  var t = !1;
  try {
    var e = Object.defineProperty({}, "passive", {
      get: function() {
        t = !0;
      }
    });
    window.addEventListener("testPassiveEventSupport", D, e), window.removeEventListener("testPassiveEventSupport", D, e);
  } catch {
  }
  return t;
}(), ah = function() {
  return !!document.createElement("canvas").getContext;
}(), hn = !!(document.createElementNS && Vo("svg").createSVGRect), hh = !!hn && function() {
  var t = document.createElement("div");
  return t.innerHTML = "<svg/>", (t.firstChild && t.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
}(), uh = !hn && function() {
  try {
    var t = document.createElement("div");
    t.innerHTML = '<v:shape adj="1"/>';
    var e = t.firstChild;
    return e.style.behavior = "url(#default#VML)", e && typeof e.adj == "object";
  } catch {
    return !1;
  }
}(), lh = navigator.platform.indexOf("Mac") === 0, ch = navigator.platform.indexOf("Linux") === 0;
function vt(t) {
  return navigator.userAgent.toLowerCase().indexOf(t) >= 0;
}
var d = {
  ie: oi,
  ielt9: qa,
  edge: Uo,
  webkit: sn,
  android: jo,
  android23: Go,
  androidStock: Ya,
  opera: rn,
  chrome: $o,
  gecko: qo,
  safari: Ja,
  phantom: Ko,
  opera12: Yo,
  win: Xa,
  ie3d: Jo,
  webkit3d: an,
  gecko3d: Xo,
  any3d: Qa,
  mobile: Te,
  mobileWebkit: th,
  mobileWebkit3d: eh,
  msPointer: Qo,
  pointer: ts,
  touch: ih,
  touchNative: es,
  mobileOpera: nh,
  mobileGecko: oh,
  retina: sh,
  passiveEvents: rh,
  canvas: ah,
  svg: hn,
  vml: uh,
  inlineSvg: hh,
  mac: lh,
  linux: ch
}, is = d.msPointer ? "MSPointerDown" : "pointerdown", ns = d.msPointer ? "MSPointerMove" : "pointermove", os = d.msPointer ? "MSPointerUp" : "pointerup", ss = d.msPointer ? "MSPointerCancel" : "pointercancel", zi = {
  touchstart: is,
  touchmove: ns,
  touchend: os,
  touchcancel: ss
}, Gn = {
  touchstart: gh,
  touchmove: Fe,
  touchend: Fe,
  touchcancel: Fe
}, ee = {}, $n = !1;
function fh(t, e, i) {
  return e === "touchstart" && mh(), Gn[e] ? (i = Gn[e].bind(this, i), t.addEventListener(zi[e], i, !1), i) : (console.warn("wrong event specified:", e), L.Util.falseFn);
}
function dh(t, e, i) {
  if (!zi[e]) {
    console.warn("wrong event specified:", e);
    return;
  }
  t.removeEventListener(zi[e], i, !1);
}
function _h(t) {
  ee[t.pointerId] = t;
}
function ph(t) {
  ee[t.pointerId] && (ee[t.pointerId] = t);
}
function qn(t) {
  delete ee[t.pointerId];
}
function mh() {
  $n || (document.addEventListener(is, _h, !0), document.addEventListener(ns, ph, !0), document.addEventListener(os, qn, !0), document.addEventListener(ss, qn, !0), $n = !0);
}
function Fe(t, e) {
  if (e.pointerType !== (e.MSPOINTER_TYPE_MOUSE || "mouse")) {
    e.touches = [];
    for (var i in ee)
      e.touches.push(ee[i]);
    e.changedTouches = [e], t(e);
  }
}
function gh(t, e) {
  e.MSPOINTER_TYPE_TOUCH && e.pointerType === e.MSPOINTER_TYPE_TOUCH && j(e), Fe(t, e);
}
function vh(t) {
  var e = {}, i, n;
  for (n in t)
    i = t[n], e[n] = i && i.bind ? i.bind(t) : i;
  return t = e, e.type = "dblclick", e.detail = 2, e.isTrusted = !1, e._simulated = !0, e;
}
var yh = 200;
function wh(t, e) {
  t.addEventListener("dblclick", e);
  var i = 0, n;
  function o(s) {
    if (s.detail !== 1) {
      n = s.detail;
      return;
    }
    if (!(s.pointerType === "mouse" || s.sourceCapabilities && !s.sourceCapabilities.firesTouchEvents)) {
      var r = us(s);
      if (!(r.some(function(h) {
        return h instanceof HTMLLabelElement && h.attributes.for;
      }) && !r.some(function(h) {
        return h instanceof HTMLInputElement || h instanceof HTMLSelectElement;
      }))) {
        var a = Date.now();
        a - i <= yh ? (n++, n === 2 && e(vh(s))) : n = 1, i = a;
      }
    }
  }
  return t.addEventListener("click", o), {
    dblclick: e,
    simDblclick: o
  };
}
function xh(t, e) {
  t.removeEventListener("dblclick", e.dblclick), t.removeEventListener("click", e.simDblclick);
}
var un = ri(
  ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
), fe = ri(
  ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
), rs = fe === "webkitTransition" || fe === "OTransition" ? fe + "End" : "transitionend";
function as(t) {
  return typeof t == "string" ? document.getElementById(t) : t;
}
function we(t, e) {
  var i = t.style[e] || t.currentStyle && t.currentStyle[e];
  if ((!i || i === "auto") && document.defaultView) {
    var n = document.defaultView.getComputedStyle(t, null);
    i = n ? n[e] : null;
  }
  return i === "auto" ? null : i;
}
function P(t, e, i) {
  var n = document.createElement(t);
  return n.className = e || "", i && i.appendChild(n), n;
}
function N(t) {
  var e = t.parentNode;
  e && e.removeChild(t);
}
function Je(t) {
  for (; t.firstChild; )
    t.removeChild(t.firstChild);
}
function se(t) {
  var e = t.parentNode;
  e && e.lastChild !== t && e.appendChild(t);
}
function re(t) {
  var e = t.parentNode;
  e && e.firstChild !== t && e.insertBefore(t, e.firstChild);
}
function ln(t, e) {
  if (t.classList !== void 0)
    return t.classList.contains(e);
  var i = si(t);
  return i.length > 0 && new RegExp("(^|\\s)" + e + "(\\s|$)").test(i);
}
function g(t, e) {
  if (t.classList !== void 0)
    for (var i = Vt(e), n = 0, o = i.length; n < o; n++)
      t.classList.add(i[n]);
  else if (!ln(t, e)) {
    var s = si(t);
    cn(t, (s ? s + " " : "") + e);
  }
}
function B(t, e) {
  t.classList !== void 0 ? t.classList.remove(e) : cn(t, Qi((" " + si(t) + " ").replace(" " + e + " ", " ")));
}
function cn(t, e) {
  t.className.baseVal === void 0 ? t.className = e : t.className.baseVal = e;
}
function si(t) {
  return t.correspondingElement && (t = t.correspondingElement), t.className.baseVal === void 0 ? t.className : t.className.baseVal;
}
function nt(t, e) {
  "opacity" in t.style ? t.style.opacity = e : "filter" in t.style && Ph(t, e);
}
function Ph(t, e) {
  var i = !1, n = "DXImageTransform.Microsoft.Alpha";
  try {
    i = t.filters.item(n);
  } catch {
    if (e === 1)
      return;
  }
  e = Math.round(e * 100), i ? (i.Enabled = e !== 100, i.Opacity = e) : t.style.filter += " progid:" + n + "(opacity=" + e + ")";
}
function ri(t) {
  for (var e = document.documentElement.style, i = 0; i < t.length; i++)
    if (t[i] in e)
      return t[i];
  return !1;
}
function Gt(t, e, i) {
  var n = e || new m(0, 0);
  t.style[un] = (d.ie3d ? "translate(" + n.x + "px," + n.y + "px)" : "translate3d(" + n.x + "px," + n.y + "px,0)") + (i ? " scale(" + i + ")" : "");
}
function F(t, e) {
  t._leaflet_pos = e, d.any3d ? Gt(t, e) : (t.style.left = e.x + "px", t.style.top = e.y + "px");
}
function $t(t) {
  return t._leaflet_pos || new m(0, 0);
}
var xe, Pe, yi;
if ("onselectstart" in document)
  xe = function() {
    p(window, "selectstart", j);
  }, Pe = function() {
    M(window, "selectstart", j);
  };
else {
  var he = ri(
    ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
  );
  xe = function() {
    if (he) {
      var t = document.documentElement.style;
      yi = t[he], t[he] = "none";
    }
  }, Pe = function() {
    he && (document.documentElement.style[he] = yi, yi = void 0);
  };
}
function fn() {
  p(window, "dragstart", j);
}
function dn() {
  M(window, "dragstart", j);
}
var He, Ii;
function _n(t) {
  for (; t.tabIndex === -1; )
    t = t.parentNode;
  !t.style || (Xe(), He = t, Ii = t.style.outline, t.style.outline = "none", p(window, "keydown", Xe));
}
function Xe() {
  !He || (He.style.outline = Ii, He = void 0, Ii = void 0, M(window, "keydown", Xe));
}
function hs(t) {
  do
    t = t.parentNode;
  while ((!t.offsetWidth || !t.offsetHeight) && t !== document.body);
  return t;
}
function pn(t) {
  var e = t.getBoundingClientRect();
  return {
    x: e.width / t.offsetWidth || 1,
    y: e.height / t.offsetHeight || 1,
    boundingClientRect: e
  };
}
var bh = {
  __proto__: null,
  TRANSFORM: un,
  TRANSITION: fe,
  TRANSITION_END: rs,
  get: as,
  getStyle: we,
  create: P,
  remove: N,
  empty: Je,
  toFront: se,
  toBack: re,
  hasClass: ln,
  addClass: g,
  removeClass: B,
  setClass: cn,
  getClass: si,
  setOpacity: nt,
  testProp: ri,
  setTransform: Gt,
  setPosition: F,
  getPosition: $t,
  get disableTextSelection() {
    return xe;
  },
  get enableTextSelection() {
    return Pe;
  },
  disableImageDrag: fn,
  enableImageDrag: dn,
  preventOutline: _n,
  restoreOutline: Xe,
  getSizedParentNode: hs,
  getScale: pn
};
function p(t, e, i, n) {
  if (e && typeof e == "object")
    for (var o in e)
      ki(t, o, e[o], i);
  else {
    e = Vt(e);
    for (var s = 0, r = e.length; s < r; s++)
      ki(t, e[s], i, n);
  }
  return this;
}
var mt = "_leaflet_events";
function M(t, e, i, n) {
  if (arguments.length === 1)
    Kn(t), delete t[mt];
  else if (e && typeof e == "object")
    for (var o in e)
      Ai(t, o, e[o], i);
  else if (e = Vt(e), arguments.length === 2)
    Kn(t, function(a) {
      return tn(e, a) !== -1;
    });
  else
    for (var s = 0, r = e.length; s < r; s++)
      Ai(t, e[s], i, n);
  return this;
}
function Kn(t, e) {
  for (var i in t[mt]) {
    var n = i.split(/\d/)[0];
    (!e || e(n)) && Ai(t, n, null, null, i);
  }
}
var Ni = {
  mouseenter: "mouseover",
  mouseleave: "mouseout",
  wheel: !("onwheel" in window) && "mousewheel"
};
function ki(t, e, i, n) {
  var o = e + b(i) + (n ? "_" + b(n) : "");
  if (t[mt] && t[mt][o])
    return this;
  var s = function(a) {
    return i.call(n || t, a || window.event);
  }, r = s;
  !d.touchNative && d.pointer && e.indexOf("touch") === 0 ? s = fh(t, e, s) : d.touch && e === "dblclick" ? s = wh(t, s) : "addEventListener" in t ? e === "touchstart" || e === "touchmove" || e === "wheel" || e === "mousewheel" ? t.addEventListener(Ni[e] || e, s, d.passiveEvents ? { passive: !1 } : !1) : e === "mouseenter" || e === "mouseleave" ? (s = function(a) {
    a = a || window.event, gn(t, a) && r(a);
  }, t.addEventListener(Ni[e], s, !1)) : t.addEventListener(e, r, !1) : t.attachEvent("on" + e, s), t[mt] = t[mt] || {}, t[mt][o] = s;
}
function Ai(t, e, i, n, o) {
  o = o || e + b(i) + (n ? "_" + b(n) : "");
  var s = t[mt] && t[mt][o];
  if (!s)
    return this;
  !d.touchNative && d.pointer && e.indexOf("touch") === 0 ? dh(t, e, s) : d.touch && e === "dblclick" ? xh(t, s) : "removeEventListener" in t ? t.removeEventListener(Ni[e] || e, s, !1) : t.detachEvent("on" + e, s), t[mt][o] = null;
}
function Wt(t) {
  return t.stopPropagation ? t.stopPropagation() : t.originalEvent ? t.originalEvent._stopped = !0 : t.cancelBubble = !0, this;
}
function mn(t) {
  return ki(t, "wheel", Wt), this;
}
function Ee(t) {
  return p(t, "mousedown touchstart dblclick contextmenu", Wt), t._leaflet_disable_click = !0, this;
}
function j(t) {
  return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this;
}
function qt(t) {
  return j(t), Wt(t), this;
}
function us(t) {
  if (t.composedPath)
    return t.composedPath();
  for (var e = [], i = t.target; i; )
    e.push(i), i = i.parentNode;
  return e;
}
function ls(t, e) {
  if (!e)
    return new m(t.clientX, t.clientY);
  var i = pn(e), n = i.boundingClientRect;
  return new m(
    (t.clientX - n.left) / i.x - e.clientLeft,
    (t.clientY - n.top) / i.y - e.clientTop
  );
}
var Lh = d.linux && d.chrome ? window.devicePixelRatio : d.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
function cs(t) {
  return d.edge ? t.wheelDeltaY / 2 : t.deltaY && t.deltaMode === 0 ? -t.deltaY / Lh : t.deltaY && t.deltaMode === 1 ? -t.deltaY * 20 : t.deltaY && t.deltaMode === 2 ? -t.deltaY * 60 : t.deltaX || t.deltaZ ? 0 : t.wheelDelta ? (t.wheelDeltaY || t.wheelDelta) / 2 : t.detail && Math.abs(t.detail) < 32765 ? -t.detail * 20 : t.detail ? t.detail / -32765 * 60 : 0;
}
function gn(t, e) {
  var i = e.relatedTarget;
  if (!i)
    return !0;
  try {
    for (; i && i !== t; )
      i = i.parentNode;
  } catch {
    return !1;
  }
  return i !== t;
}
var Th = {
  __proto__: null,
  on: p,
  off: M,
  stopPropagation: Wt,
  disableScrollPropagation: mn,
  disableClickPropagation: Ee,
  preventDefault: j,
  stop: qt,
  getPropagationPath: us,
  getMousePosition: ls,
  getWheelDelta: cs,
  isExternalTarget: gn,
  addListener: p,
  removeListener: M
}, fs = be.extend({
  run: function(t, e, i, n) {
    this.stop(), this._el = t, this._inProgress = !0, this._duration = i || 0.25, this._easeOutPower = 1 / Math.max(n || 0.5, 0.2), this._startPos = $t(t), this._offset = e.subtract(this._startPos), this._startTime = +new Date(), this.fire("start"), this._animate();
  },
  stop: function() {
    !this._inProgress || (this._step(!0), this._complete());
  },
  _animate: function() {
    this._animId = X(this._animate, this), this._step();
  },
  _step: function(t) {
    var e = +new Date() - this._startTime, i = this._duration * 1e3;
    e < i ? this._runFrame(this._easeOut(e / i), t) : (this._runFrame(1), this._complete());
  },
  _runFrame: function(t, e) {
    var i = this._startPos.add(this._offset.multiplyBy(t));
    e && i._round(), F(this._el, i), this.fire("step");
  },
  _complete: function() {
    ot(this._animId), this._inProgress = !1, this.fire("end");
  },
  _easeOut: function(t) {
    return 1 - Math.pow(1 - t, this._easeOutPower);
  }
}), y = be.extend({
  options: {
    crs: nn,
    center: void 0,
    zoom: void 0,
    minZoom: void 0,
    maxZoom: void 0,
    layers: [],
    maxBounds: void 0,
    renderer: void 0,
    zoomAnimation: !0,
    zoomAnimationThreshold: 4,
    fadeAnimation: !0,
    markerZoomAnimation: !0,
    transform3DLimit: 8388608,
    zoomSnap: 1,
    zoomDelta: 1,
    trackResize: !0
  },
  initialize: function(t, e) {
    e = z(this, e), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(t), this._initLayout(), this._onResize = C(this._onResize, this), this._initEvents(), e.maxBounds && this.setMaxBounds(e.maxBounds), e.zoom !== void 0 && (this._zoom = this._limitZoom(e.zoom)), e.center && e.zoom !== void 0 && this.setView(S(e.center), e.zoom, { reset: !0 }), this.callInitHooks(), this._zoomAnimated = fe && d.any3d && !d.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), p(this._proxy, rs, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
  },
  setView: function(t, e, i) {
    if (e = e === void 0 ? this._zoom : this._limitZoom(e), t = this._limitCenter(S(t), e, this.options.maxBounds), i = i || {}, this._stop(), this._loaded && !i.reset && i !== !0) {
      i.animate !== void 0 && (i.zoom = T({ animate: i.animate }, i.zoom), i.pan = T({ animate: i.animate, duration: i.duration }, i.pan));
      var n = this._zoom !== e ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, e, i.zoom) : this._tryAnimatedPan(t, i.pan);
      if (n)
        return clearTimeout(this._sizeTimer), this;
    }
    return this._resetView(t, e, i.pan && i.pan.noMoveStart), this;
  },
  setZoom: function(t, e) {
    return this._loaded ? this.setView(this.getCenter(), t, { zoom: e }) : (this._zoom = t, this);
  },
  zoomIn: function(t, e) {
    return t = t || (d.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom + t, e);
  },
  zoomOut: function(t, e) {
    return t = t || (d.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom - t, e);
  },
  setZoomAround: function(t, e, i) {
    var n = this.getZoomScale(e), o = this.getSize().divideBy(2), s = t instanceof m ? t : this.latLngToContainerPoint(t), r = s.subtract(o).multiplyBy(1 - 1 / n), a = this.containerPointToLatLng(o.add(r));
    return this.setView(a, e, { zoom: i });
  },
  _getBoundsCenterZoom: function(t, e) {
    e = e || {}, t = t.getBounds ? t.getBounds() : V(t);
    var i = _(e.paddingTopLeft || e.padding || [0, 0]), n = _(e.paddingBottomRight || e.padding || [0, 0]), o = this.getBoundsZoom(t, !1, i.add(n));
    if (o = typeof e.maxZoom == "number" ? Math.min(e.maxZoom, o) : o, o === 1 / 0)
      return {
        center: t.getCenter(),
        zoom: o
      };
    var s = n.subtract(i).divideBy(2), r = this.project(t.getSouthWest(), o), a = this.project(t.getNorthEast(), o), h = this.unproject(r.add(a).divideBy(2).add(s), o);
    return {
      center: h,
      zoom: o
    };
  },
  fitBounds: function(t, e) {
    if (t = V(t), !t.isValid())
      throw new Error("Bounds are not valid.");
    var i = this._getBoundsCenterZoom(t, e);
    return this.setView(i.center, i.zoom, e);
  },
  fitWorld: function(t) {
    return this.fitBounds([[-90, -180], [90, 180]], t);
  },
  panTo: function(t, e) {
    return this.setView(t, this._zoom, { pan: e });
  },
  panBy: function(t, e) {
    if (t = _(t).round(), e = e || {}, !t.x && !t.y)
      return this.fire("moveend");
    if (e.animate !== !0 && !this.getSize().contains(t))
      return this._resetView(this.unproject(this.project(this.getCenter()).add(t)), this.getZoom()), this;
    if (this._panAnim || (this._panAnim = new fs(), this._panAnim.on({
      step: this._onPanTransitionStep,
      end: this._onPanTransitionEnd
    }, this)), e.noMoveStart || this.fire("movestart"), e.animate !== !1) {
      g(this._mapPane, "leaflet-pan-anim");
      var i = this._getMapPanePos().subtract(t).round();
      this._panAnim.run(this._mapPane, i, e.duration || 0.25, e.easeLinearity);
    } else
      this._rawPanBy(t), this.fire("move").fire("moveend");
    return this;
  },
  flyTo: function(t, e, i) {
    if (i = i || {}, i.animate === !1 || !d.any3d)
      return this.setView(t, e, i);
    this._stop();
    var n = this.project(this.getCenter()), o = this.project(t), s = this.getSize(), r = this._zoom;
    t = S(t), e = e === void 0 ? r : e;
    var a = Math.max(s.x, s.y), h = a * this.getZoomScale(r, e), u = o.distanceTo(n) || 1, c = 1.42, l = c * c;
    function f(R) {
      var Ce = R ? -1 : 1, Hs = R ? h : a, Vs = h * h - a * a + Ce * l * l * u * u, Ws = 2 * Hs * l * u, mi = Vs / Ws, Mn = Math.sqrt(mi * mi + 1) - mi, Us = Mn < 1e-9 ? -18 : Math.log(Mn);
      return Us;
    }
    function w(R) {
      return (Math.exp(R) - Math.exp(-R)) / 2;
    }
    function x(R) {
      return (Math.exp(R) + Math.exp(-R)) / 2;
    }
    function O(R) {
      return w(R) / x(R);
    }
    var W = f(0);
    function H(R) {
      return a * (x(W) / x(W + c * R));
    }
    function I(R) {
      return a * (x(W) * O(W + c * R) - w(W)) / l;
    }
    function _i(R) {
      return 1 - Math.pow(1 - R, 1.5);
    }
    var pi = Date.now(), En = (f(1) - W) / c, Fs = i.duration ? 1e3 * i.duration : 1e3 * En * 0.8;
    function Sn() {
      var R = (Date.now() - pi) / Fs, Ce = _i(R) * En;
      R <= 1 ? (this._flyToFrame = X(Sn, this), this._move(
        this.unproject(n.add(o.subtract(n).multiplyBy(I(Ce) / u)), r),
        this.getScaleZoom(a / H(Ce), r),
        { flyTo: !0 }
      )) : this._move(t, e)._moveEnd(!0);
    }
    return this._moveStart(!0, i.noMoveStart), Sn.call(this), this;
  },
  flyToBounds: function(t, e) {
    var i = this._getBoundsCenterZoom(t, e);
    return this.flyTo(i.center, i.zoom, e);
  },
  setMaxBounds: function(t) {
    return t = V(t), this.listens("moveend", this._panInsideMaxBounds) && this.off("moveend", this._panInsideMaxBounds), t.isValid() ? (this.options.maxBounds = t, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this);
  },
  setMinZoom: function(t) {
    var e = this.options.minZoom;
    return this.options.minZoom = t, this._loaded && e !== t && (this.fire("zoomlevelschange"), this.getZoom() < this.options.minZoom) ? this.setZoom(t) : this;
  },
  setMaxZoom: function(t) {
    var e = this.options.maxZoom;
    return this.options.maxZoom = t, this._loaded && e !== t && (this.fire("zoomlevelschange"), this.getZoom() > this.options.maxZoom) ? this.setZoom(t) : this;
  },
  panInsideBounds: function(t, e) {
    this._enforcingBounds = !0;
    var i = this.getCenter(), n = this._limitCenter(i, this._zoom, V(t));
    return i.equals(n) || this.panTo(n, e), this._enforcingBounds = !1, this;
  },
  panInside: function(t, e) {
    e = e || {};
    var i = _(e.paddingTopLeft || e.padding || [0, 0]), n = _(e.paddingBottomRight || e.padding || [0, 0]), o = this.project(this.getCenter()), s = this.project(t), r = this.getPixelBounds(), a = J([r.min.add(i), r.max.subtract(n)]), h = a.getSize();
    if (!a.contains(s)) {
      this._enforcingBounds = !0;
      var u = s.subtract(a.getCenter()), c = a.extend(s).getSize().subtract(h);
      o.x += u.x < 0 ? -c.x : c.x, o.y += u.y < 0 ? -c.y : c.y, this.panTo(this.unproject(o), e), this._enforcingBounds = !1;
    }
    return this;
  },
  invalidateSize: function(t) {
    if (!this._loaded)
      return this;
    t = T({
      animate: !1,
      pan: !0
    }, t === !0 ? { animate: !0 } : t);
    var e = this.getSize();
    this._sizeChanged = !0, this._lastCenter = null;
    var i = this.getSize(), n = e.divideBy(2).round(), o = i.divideBy(2).round(), s = n.subtract(o);
    return !s.x && !s.y ? this : (t.animate && t.pan ? this.panBy(s) : (t.pan && this._rawPanBy(s), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(C(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
      oldSize: e,
      newSize: i
    }));
  },
  stop: function() {
    return this.setZoom(this._limitZoom(this._zoom)), this.options.zoomSnap || this.fire("viewreset"), this._stop();
  },
  locate: function(t) {
    if (t = this._locateOptions = T({
      timeout: 1e4,
      watch: !1
    }, t), !("geolocation" in navigator))
      return this._handleGeolocationError({
        code: 0,
        message: "Geolocation not supported."
      }), this;
    var e = C(this._handleGeolocationResponse, this), i = C(this._handleGeolocationError, this);
    return t.watch ? this._locationWatchId = navigator.geolocation.watchPosition(e, i, t) : navigator.geolocation.getCurrentPosition(e, i, t), this;
  },
  stopLocate: function() {
    return navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = !1), this;
  },
  _handleGeolocationError: function(t) {
    if (!!this._container._leaflet_id) {
      var e = t.code, i = t.message || (e === 1 ? "permission denied" : e === 2 ? "position unavailable" : "timeout");
      this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
        code: e,
        message: "Geolocation error: " + i + "."
      });
    }
  },
  _handleGeolocationResponse: function(t) {
    if (!!this._container._leaflet_id) {
      var e = t.coords.latitude, i = t.coords.longitude, n = new E(e, i), o = n.toBounds(t.coords.accuracy * 2), s = this._locateOptions;
      if (s.setView) {
        var r = this.getBoundsZoom(o);
        this.setView(n, s.maxZoom ? Math.min(r, s.maxZoom) : r);
      }
      var a = {
        latlng: n,
        bounds: o,
        timestamp: t.timestamp
      };
      for (var h in t.coords)
        typeof t.coords[h] == "number" && (a[h] = t.coords[h]);
      this.fire("locationfound", a);
    }
  },
  addHandler: function(t, e) {
    if (!e)
      return this;
    var i = this[t] = new e(this);
    return this._handlers.push(i), this.options[t] && i.enable(), this;
  },
  remove: function() {
    if (this._initEvents(!0), this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds), this._containerId !== this._container._leaflet_id)
      throw new Error("Map container is being reused by another instance");
    try {
      delete this._container._leaflet_id, delete this._containerId;
    } catch {
      this._container._leaflet_id = void 0, this._containerId = void 0;
    }
    this._locationWatchId !== void 0 && this.stopLocate(), this._stop(), N(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest && (ot(this._resizeRequest), this._resizeRequest = null), this._clearHandlers(), this._loaded && this.fire("unload");
    var t;
    for (t in this._layers)
      this._layers[t].remove();
    for (t in this._panes)
      N(this._panes[t]);
    return this._layers = [], this._panes = [], delete this._mapPane, delete this._renderer, this;
  },
  createPane: function(t, e) {
    var i = "leaflet-pane" + (t ? " leaflet-" + t.replace("Pane", "") + "-pane" : ""), n = P("div", i, e || this._mapPane);
    return t && (this._panes[t] = n), n;
  },
  getCenter: function() {
    return this._checkIfLoaded(), this._lastCenter && !this._moved() ? this._lastCenter.clone() : this.layerPointToLatLng(this._getCenterLayerPoint());
  },
  getZoom: function() {
    return this._zoom;
  },
  getBounds: function() {
    var t = this.getPixelBounds(), e = this.unproject(t.getBottomLeft()), i = this.unproject(t.getTopRight());
    return new Q(e, i);
  },
  getMinZoom: function() {
    return this.options.minZoom === void 0 ? this._layersMinZoom || 0 : this.options.minZoom;
  },
  getMaxZoom: function() {
    return this.options.maxZoom === void 0 ? this._layersMaxZoom === void 0 ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom;
  },
  getBoundsZoom: function(t, e, i) {
    t = V(t), i = _(i || [0, 0]);
    var n = this.getZoom() || 0, o = this.getMinZoom(), s = this.getMaxZoom(), r = t.getNorthWest(), a = t.getSouthEast(), h = this.getSize().subtract(i), u = J(this.project(a, n), this.project(r, n)).getSize(), c = d.any3d ? this.options.zoomSnap : 1, l = h.x / u.x, f = h.y / u.y, w = e ? Math.max(l, f) : Math.min(l, f);
    return n = this.getScaleZoom(w, n), c && (n = Math.round(n / (c / 100)) * (c / 100), n = e ? Math.ceil(n / c) * c : Math.floor(n / c) * c), Math.max(o, Math.min(s, n));
  },
  getSize: function() {
    return (!this._size || this._sizeChanged) && (this._size = new m(
      this._container.clientWidth || 0,
      this._container.clientHeight || 0
    ), this._sizeChanged = !1), this._size.clone();
  },
  getPixelBounds: function(t, e) {
    var i = this._getTopLeftPoint(t, e);
    return new k(i, i.add(this.getSize()));
  },
  getPixelOrigin: function() {
    return this._checkIfLoaded(), this._pixelOrigin;
  },
  getPixelWorldBounds: function(t) {
    return this.options.crs.getProjectedBounds(t === void 0 ? this.getZoom() : t);
  },
  getPane: function(t) {
    return typeof t == "string" ? this._panes[t] : t;
  },
  getPanes: function() {
    return this._panes;
  },
  getContainer: function() {
    return this._container;
  },
  getZoomScale: function(t, e) {
    var i = this.options.crs;
    return e = e === void 0 ? this._zoom : e, i.scale(t) / i.scale(e);
  },
  getScaleZoom: function(t, e) {
    var i = this.options.crs;
    e = e === void 0 ? this._zoom : e;
    var n = i.zoom(t * i.scale(e));
    return isNaN(n) ? 1 / 0 : n;
  },
  project: function(t, e) {
    return e = e === void 0 ? this._zoom : e, this.options.crs.latLngToPoint(S(t), e);
  },
  unproject: function(t, e) {
    return e = e === void 0 ? this._zoom : e, this.options.crs.pointToLatLng(_(t), e);
  },
  layerPointToLatLng: function(t) {
    var e = _(t).add(this.getPixelOrigin());
    return this.unproject(e);
  },
  latLngToLayerPoint: function(t) {
    var e = this.project(S(t))._round();
    return e._subtract(this.getPixelOrigin());
  },
  wrapLatLng: function(t) {
    return this.options.crs.wrapLatLng(S(t));
  },
  wrapLatLngBounds: function(t) {
    return this.options.crs.wrapLatLngBounds(V(t));
  },
  distance: function(t, e) {
    return this.options.crs.distance(S(t), S(e));
  },
  containerPointToLayerPoint: function(t) {
    return _(t).subtract(this._getMapPanePos());
  },
  layerPointToContainerPoint: function(t) {
    return _(t).add(this._getMapPanePos());
  },
  containerPointToLatLng: function(t) {
    var e = this.containerPointToLayerPoint(_(t));
    return this.layerPointToLatLng(e);
  },
  latLngToContainerPoint: function(t) {
    return this.layerPointToContainerPoint(this.latLngToLayerPoint(S(t)));
  },
  mouseEventToContainerPoint: function(t) {
    return ls(t, this._container);
  },
  mouseEventToLayerPoint: function(t) {
    return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t));
  },
  mouseEventToLatLng: function(t) {
    return this.layerPointToLatLng(this.mouseEventToLayerPoint(t));
  },
  _initContainer: function(t) {
    var e = this._container = as(t);
    if (e) {
      if (e._leaflet_id)
        throw new Error("Map container is already initialized.");
    } else
      throw new Error("Map container not found.");
    p(e, "scroll", this._onScroll, this), this._containerId = b(e);
  },
  _initLayout: function() {
    var t = this._container;
    this._fadeAnimated = this.options.fadeAnimation && d.any3d, g(t, "leaflet-container" + (d.touch ? " leaflet-touch" : "") + (d.retina ? " leaflet-retina" : "") + (d.ielt9 ? " leaflet-oldie" : "") + (d.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
    var e = we(t, "position");
    e !== "absolute" && e !== "relative" && e !== "fixed" && (t.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
  },
  _initPanes: function() {
    var t = this._panes = {};
    this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), F(this._mapPane, new m(0, 0)), this.createPane("tilePane"), this.createPane("overlayPane"), this.createPane("shadowPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (g(t.markerPane, "leaflet-zoom-hide"), g(t.shadowPane, "leaflet-zoom-hide"));
  },
  _resetView: function(t, e, i) {
    F(this._mapPane, new m(0, 0));
    var n = !this._loaded;
    this._loaded = !0, e = this._limitZoom(e), this.fire("viewprereset");
    var o = this._zoom !== e;
    this._moveStart(o, i)._move(t, e)._moveEnd(o), this.fire("viewreset"), n && this.fire("load");
  },
  _moveStart: function(t, e) {
    return t && this.fire("zoomstart"), e || this.fire("movestart"), this;
  },
  _move: function(t, e, i, n) {
    e === void 0 && (e = this._zoom);
    var o = this._zoom !== e;
    return this._zoom = e, this._lastCenter = t, this._pixelOrigin = this._getNewPixelOrigin(t), n ? i && i.pinch && this.fire("zoom", i) : ((o || i && i.pinch) && this.fire("zoom", i), this.fire("move", i)), this;
  },
  _moveEnd: function(t) {
    return t && this.fire("zoomend"), this.fire("moveend");
  },
  _stop: function() {
    return ot(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
  },
  _rawPanBy: function(t) {
    F(this._mapPane, this._getMapPanePos().subtract(t));
  },
  _getZoomSpan: function() {
    return this.getMaxZoom() - this.getMinZoom();
  },
  _panInsideMaxBounds: function() {
    this._enforcingBounds || this.panInsideBounds(this.options.maxBounds);
  },
  _checkIfLoaded: function() {
    if (!this._loaded)
      throw new Error("Set map center and zoom first.");
  },
  _initEvents: function(t) {
    this._targets = {}, this._targets[b(this._container)] = this;
    var e = t ? M : p;
    e(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && e(window, "resize", this._onResize, this), d.any3d && this.options.transform3DLimit && (t ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
  },
  _onResize: function() {
    ot(this._resizeRequest), this._resizeRequest = X(
      function() {
        this.invalidateSize({ debounceMoveend: !0 });
      },
      this
    );
  },
  _onScroll: function() {
    this._container.scrollTop = 0, this._container.scrollLeft = 0;
  },
  _onMoveEnd: function() {
    var t = this._getMapPanePos();
    Math.max(Math.abs(t.x), Math.abs(t.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom());
  },
  _findEventTargets: function(t, e) {
    for (var i = [], n, o = e === "mouseout" || e === "mouseover", s = t.target || t.srcElement, r = !1; s; ) {
      if (n = this._targets[b(s)], n && (e === "click" || e === "preclick") && this._draggableMoved(n)) {
        r = !0;
        break;
      }
      if (n && n.listens(e, !0) && (o && !gn(s, t) || (i.push(n), o)) || s === this._container)
        break;
      s = s.parentNode;
    }
    return !i.length && !r && !o && this.listens(e, !0) && (i = [this]), i;
  },
  _isClickDisabled: function(t) {
    for (; t && t !== this._container; ) {
      if (t._leaflet_disable_click)
        return !0;
      t = t.parentNode;
    }
  },
  _handleDOMEvent: function(t) {
    var e = t.target || t.srcElement;
    if (!(!this._loaded || e._leaflet_disable_events || t.type === "click" && this._isClickDisabled(e))) {
      var i = t.type;
      i === "mousedown" && _n(e), this._fireDOMEvent(t, i);
    }
  },
  _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
  _fireDOMEvent: function(t, e, i) {
    if (t.type === "click") {
      var n = T({}, t);
      n.type = "preclick", this._fireDOMEvent(n, n.type, i);
    }
    var o = this._findEventTargets(t, e);
    if (i) {
      for (var s = [], r = 0; r < i.length; r++)
        i[r].listens(e, !0) && s.push(i[r]);
      o = s.concat(o);
    }
    if (!!o.length) {
      e === "contextmenu" && j(t);
      var a = o[0], h = {
        originalEvent: t
      };
      if (t.type !== "keypress" && t.type !== "keydown" && t.type !== "keyup") {
        var u = a.getLatLng && (!a._radius || a._radius <= 10);
        h.containerPoint = u ? this.latLngToContainerPoint(a.getLatLng()) : this.mouseEventToContainerPoint(t), h.layerPoint = this.containerPointToLayerPoint(h.containerPoint), h.latlng = u ? a.getLatLng() : this.layerPointToLatLng(h.layerPoint);
      }
      for (r = 0; r < o.length; r++)
        if (o[r].fire(e, h, !0), h.originalEvent._stopped || o[r].options.bubblingMouseEvents === !1 && tn(this._mouseEvents, e) !== -1)
          return;
    }
  },
  _draggableMoved: function(t) {
    return t = t.dragging && t.dragging.enabled() ? t : this, t.dragging && t.dragging.moved() || this.boxZoom && this.boxZoom.moved();
  },
  _clearHandlers: function() {
    for (var t = 0, e = this._handlers.length; t < e; t++)
      this._handlers[t].disable();
  },
  whenReady: function(t, e) {
    return this._loaded ? t.call(e || this, { target: this }) : this.on("load", t, e), this;
  },
  _getMapPanePos: function() {
    return $t(this._mapPane) || new m(0, 0);
  },
  _moved: function() {
    var t = this._getMapPanePos();
    return t && !t.equals([0, 0]);
  },
  _getTopLeftPoint: function(t, e) {
    var i = t && e !== void 0 ? this._getNewPixelOrigin(t, e) : this.getPixelOrigin();
    return i.subtract(this._getMapPanePos());
  },
  _getNewPixelOrigin: function(t, e) {
    var i = this.getSize()._divideBy(2);
    return this.project(t, e)._subtract(i)._add(this._getMapPanePos())._round();
  },
  _latLngToNewLayerPoint: function(t, e, i) {
    var n = this._getNewPixelOrigin(i, e);
    return this.project(t, e)._subtract(n);
  },
  _latLngBoundsToNewLayerBounds: function(t, e, i) {
    var n = this._getNewPixelOrigin(i, e);
    return J([
      this.project(t.getSouthWest(), e)._subtract(n),
      this.project(t.getNorthWest(), e)._subtract(n),
      this.project(t.getSouthEast(), e)._subtract(n),
      this.project(t.getNorthEast(), e)._subtract(n)
    ]);
  },
  _getCenterLayerPoint: function() {
    return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
  },
  _getCenterOffset: function(t) {
    return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint());
  },
  _limitCenter: function(t, e, i) {
    if (!i)
      return t;
    var n = this.project(t, e), o = this.getSize().divideBy(2), s = new k(n.subtract(o), n.add(o)), r = this._getBoundsOffset(s, i, e);
    return r.round().equals([0, 0]) ? t : this.unproject(n.add(r), e);
  },
  _limitOffset: function(t, e) {
    if (!e)
      return t;
    var i = this.getPixelBounds(), n = new k(i.min.add(t), i.max.add(t));
    return t.add(this._getBoundsOffset(n, e));
  },
  _getBoundsOffset: function(t, e, i) {
    var n = J(
      this.project(e.getNorthEast(), i),
      this.project(e.getSouthWest(), i)
    ), o = n.min.subtract(t.min), s = n.max.subtract(t.max), r = this._rebound(o.x, -s.x), a = this._rebound(o.y, -s.y);
    return new m(r, a);
  },
  _rebound: function(t, e) {
    return t + e > 0 ? Math.round(t - e) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(e));
  },
  _limitZoom: function(t) {
    var e = this.getMinZoom(), i = this.getMaxZoom(), n = d.any3d ? this.options.zoomSnap : 1;
    return n && (t = Math.round(t / n) * n), Math.max(e, Math.min(i, t));
  },
  _onPanTransitionStep: function() {
    this.fire("move");
  },
  _onPanTransitionEnd: function() {
    B(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
  },
  _tryAnimatedPan: function(t, e) {
    var i = this._getCenterOffset(t)._trunc();
    return (e && e.animate) !== !0 && !this.getSize().contains(i) ? !1 : (this.panBy(i, e), !0);
  },
  _createAnimProxy: function() {
    var t = this._proxy = P("div", "leaflet-proxy leaflet-zoom-animated");
    this._panes.mapPane.appendChild(t), this.on("zoomanim", function(e) {
      var i = un, n = this._proxy.style[i];
      Gt(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1)), n === this._proxy.style[i] && this._animatingZoom && this._onZoomTransitionEnd();
    }, this), this.on("load moveend", this._animMoveEnd, this), this._on("unload", this._destroyAnimProxy, this);
  },
  _destroyAnimProxy: function() {
    N(this._proxy), this.off("load moveend", this._animMoveEnd, this), delete this._proxy;
  },
  _animMoveEnd: function() {
    var t = this.getCenter(), e = this.getZoom();
    Gt(this._proxy, this.project(t, e), this.getZoomScale(e, 1));
  },
  _catchTransitionEnd: function(t) {
    this._animatingZoom && t.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd();
  },
  _nothingToAnimate: function() {
    return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
  },
  _tryAnimatedZoom: function(t, e, i) {
    if (this._animatingZoom)
      return !0;
    if (i = i || {}, !this._zoomAnimated || i.animate === !1 || this._nothingToAnimate() || Math.abs(e - this._zoom) > this.options.zoomAnimationThreshold)
      return !1;
    var n = this.getZoomScale(e), o = this._getCenterOffset(t)._divideBy(1 - 1 / n);
    return i.animate !== !0 && !this.getSize().contains(o) ? !1 : (X(function() {
      this._moveStart(!0, !1)._animateZoom(t, e, !0);
    }, this), !0);
  },
  _animateZoom: function(t, e, i, n) {
    !this._mapPane || (i && (this._animatingZoom = !0, this._animateToCenter = t, this._animateToZoom = e, g(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
      center: t,
      zoom: e,
      noUpdate: n
    }), this._tempFireZoomEvent || (this._tempFireZoomEvent = this._zoom !== this._animateToZoom), this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(C(this._onZoomTransitionEnd, this), 250));
  },
  _onZoomTransitionEnd: function() {
    !this._animatingZoom || (this._mapPane && B(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(!0));
  }
});
function Eh(t, e) {
  return new y(t, e);
}
var ct = Pt.extend({
  options: {
    position: "topright"
  },
  initialize: function(t) {
    z(this, t);
  },
  getPosition: function() {
    return this.options.position;
  },
  setPosition: function(t) {
    var e = this._map;
    return e && e.removeControl(this), this.options.position = t, e && e.addControl(this), this;
  },
  getContainer: function() {
    return this._container;
  },
  addTo: function(t) {
    this.remove(), this._map = t;
    var e = this._container = this.onAdd(t), i = this.getPosition(), n = t._controlCorners[i];
    return g(e, "leaflet-control"), i.indexOf("bottom") !== -1 ? n.insertBefore(e, n.firstChild) : n.appendChild(e), this._map.on("unload", this.remove, this), this;
  },
  remove: function() {
    return this._map ? (N(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), this._map = null, this) : this;
  },
  _refocusOnMap: function(t) {
    this._map && t && t.screenX > 0 && t.screenY > 0 && this._map.getContainer().focus();
  }
}), Se = function(t) {
  return new ct(t);
};
y.include({
  addControl: function(t) {
    return t.addTo(this), this;
  },
  removeControl: function(t) {
    return t.remove(), this;
  },
  _initControlPos: function() {
    var t = this._controlCorners = {}, e = "leaflet-", i = this._controlContainer = P("div", e + "control-container", this._container);
    function n(o, s) {
      var r = e + o + " " + e + s;
      t[o + s] = P("div", r, i);
    }
    n("top", "left"), n("top", "right"), n("bottom", "left"), n("bottom", "right");
  },
  _clearControlPos: function() {
    for (var t in this._controlCorners)
      N(this._controlCorners[t]);
    N(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
  }
});
var ds = ct.extend({
  options: {
    collapsed: !0,
    position: "topright",
    autoZIndex: !0,
    hideSingleBase: !1,
    sortLayers: !1,
    sortFunction: function(t, e, i, n) {
      return i < n ? -1 : n < i ? 1 : 0;
    }
  },
  initialize: function(t, e, i) {
    z(this, i), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1;
    for (var n in t)
      this._addLayer(t[n], n);
    for (n in e)
      this._addLayer(e[n], n, !0);
  },
  onAdd: function(t) {
    this._initLayout(), this._update(), this._map = t, t.on("zoomend", this._checkDisabledLayers, this);
    for (var e = 0; e < this._layers.length; e++)
      this._layers[e].layer.on("add remove", this._onLayerChange, this);
    return this._container;
  },
  addTo: function(t) {
    return ct.prototype.addTo.call(this, t), this._expandIfNotCollapsed();
  },
  onRemove: function() {
    this._map.off("zoomend", this._checkDisabledLayers, this);
    for (var t = 0; t < this._layers.length; t++)
      this._layers[t].layer.off("add remove", this._onLayerChange, this);
  },
  addBaseLayer: function(t, e) {
    return this._addLayer(t, e), this._map ? this._update() : this;
  },
  addOverlay: function(t, e) {
    return this._addLayer(t, e, !0), this._map ? this._update() : this;
  },
  removeLayer: function(t) {
    t.off("add remove", this._onLayerChange, this);
    var e = this._getLayer(b(t));
    return e && this._layers.splice(this._layers.indexOf(e), 1), this._map ? this._update() : this;
  },
  expand: function() {
    g(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
    var t = this._map.getSize().y - (this._container.offsetTop + 50);
    return t < this._section.clientHeight ? (g(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = t + "px") : B(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
  },
  collapse: function() {
    return B(this._container, "leaflet-control-layers-expanded"), this;
  },
  _initLayout: function() {
    var t = "leaflet-control-layers", e = this._container = P("div", t), i = this.options.collapsed;
    e.setAttribute("aria-haspopup", !0), Ee(e), mn(e);
    var n = this._section = P("section", t + "-list");
    i && (this._map.on("click", this.collapse, this), p(e, {
      mouseenter: function() {
        p(n, "click", j), this.expand(), setTimeout(function() {
          M(n, "click", j);
        });
      },
      mouseleave: this.collapse
    }, this));
    var o = this._layersLink = P("a", t + "-toggle", e);
    o.href = "#", o.title = "Layers", o.setAttribute("role", "button"), p(o, "click", j), p(o, "focus", this.expand, this), i || this.expand(), this._baseLayersList = P("div", t + "-base", n), this._separator = P("div", t + "-separator", n), this._overlaysList = P("div", t + "-overlays", n), e.appendChild(n);
  },
  _getLayer: function(t) {
    for (var e = 0; e < this._layers.length; e++)
      if (this._layers[e] && b(this._layers[e].layer) === t)
        return this._layers[e];
  },
  _addLayer: function(t, e, i) {
    this._map && t.on("add remove", this._onLayerChange, this), this._layers.push({
      layer: t,
      name: e,
      overlay: i
    }), this.options.sortLayers && this._layers.sort(C(function(n, o) {
      return this.options.sortFunction(n.layer, o.layer, n.name, o.name);
    }, this)), this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed();
  },
  _update: function() {
    if (!this._container)
      return this;
    Je(this._baseLayersList), Je(this._overlaysList), this._layerControlInputs = [];
    var t, e, i, n, o = 0;
    for (i = 0; i < this._layers.length; i++)
      n = this._layers[i], this._addItem(n), e = e || n.overlay, t = t || !n.overlay, o += n.overlay ? 0 : 1;
    return this.options.hideSingleBase && (t = t && o > 1, this._baseLayersList.style.display = t ? "" : "none"), this._separator.style.display = e && t ? "" : "none", this;
  },
  _onLayerChange: function(t) {
    this._handlingClick || this._update();
    var e = this._getLayer(b(t.target)), i = e.overlay ? t.type === "add" ? "overlayadd" : "overlayremove" : t.type === "add" ? "baselayerchange" : null;
    i && this._map.fire(i, e);
  },
  _createRadioElement: function(t, e) {
    var i = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"' + (e ? ' checked="checked"' : "") + "/>", n = document.createElement("div");
    return n.innerHTML = i, n.firstChild;
  },
  _addItem: function(t) {
    var e = document.createElement("label"), i = this._map.hasLayer(t.layer), n;
    t.overlay ? (n = document.createElement("input"), n.type = "checkbox", n.className = "leaflet-control-layers-selector", n.defaultChecked = i) : n = this._createRadioElement("leaflet-base-layers_" + b(this), i), this._layerControlInputs.push(n), n.layerId = b(t.layer), p(n, "click", this._onInputClick, this);
    var o = document.createElement("span");
    o.innerHTML = " " + t.name;
    var s = document.createElement("span");
    e.appendChild(s), s.appendChild(n), s.appendChild(o);
    var r = t.overlay ? this._overlaysList : this._baseLayersList;
    return r.appendChild(e), this._checkDisabledLayers(), e;
  },
  _onInputClick: function() {
    var t = this._layerControlInputs, e, i, n = [], o = [];
    this._handlingClick = !0;
    for (var s = t.length - 1; s >= 0; s--)
      e = t[s], i = this._getLayer(e.layerId).layer, e.checked ? n.push(i) : e.checked || o.push(i);
    for (s = 0; s < o.length; s++)
      this._map.hasLayer(o[s]) && this._map.removeLayer(o[s]);
    for (s = 0; s < n.length; s++)
      this._map.hasLayer(n[s]) || this._map.addLayer(n[s]);
    this._handlingClick = !1, this._refocusOnMap();
  },
  _checkDisabledLayers: function() {
    for (var t = this._layerControlInputs, e, i, n = this._map.getZoom(), o = t.length - 1; o >= 0; o--)
      e = t[o], i = this._getLayer(e.layerId).layer, e.disabled = i.options.minZoom !== void 0 && n < i.options.minZoom || i.options.maxZoom !== void 0 && n > i.options.maxZoom;
  },
  _expandIfNotCollapsed: function() {
    return this._map && !this.options.collapsed && this.expand(), this;
  }
}), Sh = function(t, e, i) {
  return new ds(t, e, i);
}, vn = ct.extend({
  options: {
    position: "topleft",
    zoomInText: '<span aria-hidden="true">+</span>',
    zoomInTitle: "Zoom in",
    zoomOutText: '<span aria-hidden="true">&#x2212;</span>',
    zoomOutTitle: "Zoom out"
  },
  onAdd: function(t) {
    var e = "leaflet-control-zoom", i = P("div", e + " leaflet-bar"), n = this.options;
    return this._zoomInButton = this._createButton(
      n.zoomInText,
      n.zoomInTitle,
      e + "-in",
      i,
      this._zoomIn
    ), this._zoomOutButton = this._createButton(
      n.zoomOutText,
      n.zoomOutTitle,
      e + "-out",
      i,
      this._zoomOut
    ), this._updateDisabled(), t.on("zoomend zoomlevelschange", this._updateDisabled, this), i;
  },
  onRemove: function(t) {
    t.off("zoomend zoomlevelschange", this._updateDisabled, this);
  },
  disable: function() {
    return this._disabled = !0, this._updateDisabled(), this;
  },
  enable: function() {
    return this._disabled = !1, this._updateDisabled(), this;
  },
  _zoomIn: function(t) {
    !this._disabled && this._map._zoom < this._map.getMaxZoom() && this._map.zoomIn(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1));
  },
  _zoomOut: function(t) {
    !this._disabled && this._map._zoom > this._map.getMinZoom() && this._map.zoomOut(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1));
  },
  _createButton: function(t, e, i, n, o) {
    var s = P("a", i, n);
    return s.innerHTML = t, s.href = "#", s.title = e, s.setAttribute("role", "button"), s.setAttribute("aria-label", e), Ee(s), p(s, "click", qt), p(s, "click", o, this), p(s, "click", this._refocusOnMap, this), s;
  },
  _updateDisabled: function() {
    var t = this._map, e = "leaflet-disabled";
    B(this._zoomInButton, e), B(this._zoomOutButton, e), this._zoomInButton.setAttribute("aria-disabled", "false"), this._zoomOutButton.setAttribute("aria-disabled", "false"), (this._disabled || t._zoom === t.getMinZoom()) && (g(this._zoomOutButton, e), this._zoomOutButton.setAttribute("aria-disabled", "true")), (this._disabled || t._zoom === t.getMaxZoom()) && (g(this._zoomInButton, e), this._zoomInButton.setAttribute("aria-disabled", "true"));
  }
});
y.mergeOptions({
  zoomControl: !0
});
y.addInitHook(function() {
  this.options.zoomControl && (this.zoomControl = new vn(), this.addControl(this.zoomControl));
});
var Mh = function(t) {
  return new vn(t);
}, _s = ct.extend({
  options: {
    position: "bottomleft",
    maxWidth: 100,
    metric: !0,
    imperial: !0
  },
  onAdd: function(t) {
    var e = "leaflet-control-scale", i = P("div", e), n = this.options;
    return this._addScales(n, e + "-line", i), t.on(n.updateWhenIdle ? "moveend" : "move", this._update, this), t.whenReady(this._update, this), i;
  },
  onRemove: function(t) {
    t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
  },
  _addScales: function(t, e, i) {
    t.metric && (this._mScale = P("div", e, i)), t.imperial && (this._iScale = P("div", e, i));
  },
  _update: function() {
    var t = this._map, e = t.getSize().y / 2, i = t.distance(
      t.containerPointToLatLng([0, e]),
      t.containerPointToLatLng([this.options.maxWidth, e])
    );
    this._updateScales(i);
  },
  _updateScales: function(t) {
    this.options.metric && t && this._updateMetric(t), this.options.imperial && t && this._updateImperial(t);
  },
  _updateMetric: function(t) {
    var e = this._getRoundNum(t), i = e < 1e3 ? e + " m" : e / 1e3 + " km";
    this._updateScale(this._mScale, i, e / t);
  },
  _updateImperial: function(t) {
    var e = t * 3.2808399, i, n, o;
    e > 5280 ? (i = e / 5280, n = this._getRoundNum(i), this._updateScale(this._iScale, n + " mi", n / i)) : (o = this._getRoundNum(e), this._updateScale(this._iScale, o + " ft", o / e));
  },
  _updateScale: function(t, e, i) {
    t.style.width = Math.round(this.options.maxWidth * i) + "px", t.innerHTML = e;
  },
  _getRoundNum: function(t) {
    var e = Math.pow(10, (Math.floor(t) + "").length - 1), i = t / e;
    return i = i >= 10 ? 10 : i >= 5 ? 5 : i >= 3 ? 3 : i >= 2 ? 2 : 1, e * i;
  }
}), Oh = function(t) {
  return new _s(t);
}, Ch = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>', yn = ct.extend({
  options: {
    position: "bottomright",
    prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (d.inlineSvg ? Ch + " " : "") + "Leaflet</a>"
  },
  initialize: function(t) {
    z(this, t), this._attributions = {};
  },
  onAdd: function(t) {
    t.attributionControl = this, this._container = P("div", "leaflet-control-attribution"), Ee(this._container);
    for (var e in t._layers)
      t._layers[e].getAttribution && this.addAttribution(t._layers[e].getAttribution());
    return this._update(), t.on("layeradd", this._addAttribution, this), this._container;
  },
  onRemove: function(t) {
    t.off("layeradd", this._addAttribution, this);
  },
  _addAttribution: function(t) {
    t.layer.getAttribution && (this.addAttribution(t.layer.getAttribution()), t.layer.once("remove", function() {
      this.removeAttribution(t.layer.getAttribution());
    }, this));
  },
  setPrefix: function(t) {
    return this.options.prefix = t, this._update(), this;
  },
  addAttribution: function(t) {
    return t ? (this._attributions[t] || (this._attributions[t] = 0), this._attributions[t]++, this._update(), this) : this;
  },
  removeAttribution: function(t) {
    return t ? (this._attributions[t] && (this._attributions[t]--, this._update()), this) : this;
  },
  _update: function() {
    if (!!this._map) {
      var t = [];
      for (var e in this._attributions)
        this._attributions[e] && t.push(e);
      var i = [];
      this.options.prefix && i.push(this.options.prefix), t.length && i.push(t.join(", ")), this._container.innerHTML = i.join(' <span aria-hidden="true">|</span> ');
    }
  }
});
y.mergeOptions({
  attributionControl: !0
});
y.addInitHook(function() {
  this.options.attributionControl && new yn().addTo(this);
});
var zh = function(t) {
  return new yn(t);
};
ct.Layers = ds;
ct.Zoom = vn;
ct.Scale = _s;
ct.Attribution = yn;
Se.layers = Sh;
Se.zoom = Mh;
Se.scale = Oh;
Se.attribution = zh;
var yt = Pt.extend({
  initialize: function(t) {
    this._map = t;
  },
  enable: function() {
    return this._enabled ? this : (this._enabled = !0, this.addHooks(), this);
  },
  disable: function() {
    return this._enabled ? (this._enabled = !1, this.removeHooks(), this) : this;
  },
  enabled: function() {
    return !!this._enabled;
  }
});
yt.addTo = function(t, e) {
  return t.addHandler(e, this), this;
};
var Ih = { Events: it }, Yn = d.touch ? "touchstart mousedown" : "mousedown", Mt = be.extend({
  options: {
    clickTolerance: 3
  },
  initialize: function(t, e, i, n) {
    z(this, n), this._element = t, this._dragStartTarget = e || t, this._preventOutline = i;
  },
  enable: function() {
    this._enabled || (p(this._dragStartTarget, Yn, this._onDown, this), this._enabled = !0);
  },
  disable: function() {
    !this._enabled || (Mt._dragging === this && this.finishDrag(!0), M(this._dragStartTarget, Yn, this._onDown, this), this._enabled = !1, this._moved = !1);
  },
  _onDown: function(t) {
    if (!!this._enabled && (this._moved = !1, !ln(this._element, "leaflet-zoom-anim"))) {
      if (t.touches && t.touches.length !== 1) {
        Mt._dragging === this && this.finishDrag();
        return;
      }
      if (!(Mt._dragging || t.shiftKey || t.which !== 1 && t.button !== 1 && !t.touches) && (Mt._dragging = this, this._preventOutline && _n(this._element), fn(), xe(), !this._moving)) {
        this.fire("down");
        var e = t.touches ? t.touches[0] : t, i = hs(this._element);
        this._startPoint = new m(e.clientX, e.clientY), this._startPos = $t(this._element), this._parentScale = pn(i);
        var n = t.type === "mousedown";
        p(document, n ? "mousemove" : "touchmove", this._onMove, this), p(document, n ? "mouseup" : "touchend touchcancel", this._onUp, this);
      }
    }
  },
  _onMove: function(t) {
    if (!!this._enabled) {
      if (t.touches && t.touches.length > 1) {
        this._moved = !0;
        return;
      }
      var e = t.touches && t.touches.length === 1 ? t.touches[0] : t, i = new m(e.clientX, e.clientY)._subtract(this._startPoint);
      !i.x && !i.y || Math.abs(i.x) + Math.abs(i.y) < this.options.clickTolerance || (i.x /= this._parentScale.x, i.y /= this._parentScale.y, j(t), this._moved || (this.fire("dragstart"), this._moved = !0, g(document.body, "leaflet-dragging"), this._lastTarget = t.target || t.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), g(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(i), this._moving = !0, this._lastEvent = t, this._updatePosition());
    }
  },
  _updatePosition: function() {
    var t = { originalEvent: this._lastEvent };
    this.fire("predrag", t), F(this._element, this._newPos), this.fire("drag", t);
  },
  _onUp: function() {
    !this._enabled || this.finishDrag();
  },
  finishDrag: function(t) {
    B(document.body, "leaflet-dragging"), this._lastTarget && (B(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null), M(document, "mousemove touchmove", this._onMove, this), M(document, "mouseup touchend touchcancel", this._onUp, this), dn(), Pe(), this._moved && this._moving && this.fire("dragend", {
      noInertia: t,
      distance: this._newPos.distanceTo(this._startPos)
    }), this._moving = !1, Mt._dragging = !1;
  }
});
function ps(t, e) {
  if (!e || !t.length)
    return t.slice();
  var i = e * e;
  return t = Ah(t, i), t = kh(t, i), t;
}
function ms(t, e, i) {
  return Math.sqrt(Me(t, e, i, !0));
}
function Nh(t, e, i) {
  return Me(t, e, i);
}
function kh(t, e) {
  var i = t.length, n = typeof Uint8Array != void 0 + "" ? Uint8Array : Array, o = new n(i);
  o[0] = o[i - 1] = 1, Zi(t, o, e, 0, i - 1);
  var s, r = [];
  for (s = 0; s < i; s++)
    o[s] && r.push(t[s]);
  return r;
}
function Zi(t, e, i, n, o) {
  var s = 0, r, a, h;
  for (a = n + 1; a <= o - 1; a++)
    h = Me(t[a], t[n], t[o], !0), h > s && (r = a, s = h);
  s > i && (e[r] = 1, Zi(t, e, i, n, r), Zi(t, e, i, r, o));
}
function Ah(t, e) {
  for (var i = [t[0]], n = 1, o = 0, s = t.length; n < s; n++)
    Zh(t[n], t[o]) > e && (i.push(t[n]), o = n);
  return o < s - 1 && i.push(t[s - 1]), i;
}
var Jn;
function gs(t, e, i, n, o) {
  var s = n ? Jn : Ut(t, i), r = Ut(e, i), a, h, u;
  for (Jn = r; ; ) {
    if (!(s | r))
      return [t, e];
    if (s & r)
      return !1;
    a = s || r, h = Qe(t, e, a, i, o), u = Ut(h, i), a === s ? (t = h, s = u) : (e = h, r = u);
  }
}
function Qe(t, e, i, n, o) {
  var s = e.x - t.x, r = e.y - t.y, a = n.min, h = n.max, u, c;
  return i & 8 ? (u = t.x + s * (h.y - t.y) / r, c = h.y) : i & 4 ? (u = t.x + s * (a.y - t.y) / r, c = a.y) : i & 2 ? (u = h.x, c = t.y + r * (h.x - t.x) / s) : i & 1 && (u = a.x, c = t.y + r * (a.x - t.x) / s), new m(u, c, o);
}
function Ut(t, e) {
  var i = 0;
  return t.x < e.min.x ? i |= 1 : t.x > e.max.x && (i |= 2), t.y < e.min.y ? i |= 4 : t.y > e.max.y && (i |= 8), i;
}
function Zh(t, e) {
  var i = e.x - t.x, n = e.y - t.y;
  return i * i + n * n;
}
function Me(t, e, i, n) {
  var o = e.x, s = e.y, r = i.x - o, a = i.y - s, h = r * r + a * a, u;
  return h > 0 && (u = ((t.x - o) * r + (t.y - s) * a) / h, u > 1 ? (o = i.x, s = i.y) : u > 0 && (o += r * u, s += a * u)), r = t.x - o, a = t.y - s, n ? r * r + a * a : new m(o, s);
}
function rt(t) {
  return !ft(t[0]) || typeof t[0][0] != "object" && typeof t[0][0] < "u";
}
function vs(t) {
  return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), rt(t);
}
function ys(t, e) {
  var i, n, o, s, r, a, h, u;
  if (!t || t.length === 0)
    throw new Error("latlngs not passed");
  rt(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
  var c = [];
  for (var l in t)
    c.push(e.project(S(t[l])));
  var f = c.length;
  for (i = 0, n = 0; i < f - 1; i++)
    n += c[i].distanceTo(c[i + 1]) / 2;
  if (n === 0)
    u = c[0];
  else
    for (i = 0, s = 0; i < f - 1; i++)
      if (r = c[i], a = c[i + 1], o = r.distanceTo(a), s += o, s > n) {
        h = (s - n) / o, u = [
          a.x - h * (a.x - r.x),
          a.y - h * (a.y - r.y)
        ];
        break;
      }
  return e.unproject(_(u));
}
var Bh = {
  __proto__: null,
  simplify: ps,
  pointToSegmentDistance: ms,
  closestPointOnSegment: Nh,
  clipSegment: gs,
  _getEdgeIntersection: Qe,
  _getBitCode: Ut,
  _sqClosestPointOnSegment: Me,
  isFlat: rt,
  _flat: vs,
  polylineCenter: ys
};
function ws(t, e, i) {
  var n, o = [1, 4, 2, 8], s, r, a, h, u, c, l, f;
  for (s = 0, c = t.length; s < c; s++)
    t[s]._code = Ut(t[s], e);
  for (a = 0; a < 4; a++) {
    for (l = o[a], n = [], s = 0, c = t.length, r = c - 1; s < c; r = s++)
      h = t[s], u = t[r], h._code & l ? u._code & l || (f = Qe(u, h, l, e, i), f._code = Ut(f, e), n.push(f)) : (u._code & l && (f = Qe(u, h, l, e, i), f._code = Ut(f, e), n.push(f)), n.push(h));
    t = n;
  }
  return t;
}
function xs(t, e) {
  var i, n, o, s, r, a, h, u, c;
  if (!t || t.length === 0)
    throw new Error("latlngs not passed");
  rt(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
  var l = [];
  for (var f in t)
    l.push(e.project(S(t[f])));
  var w = l.length;
  for (a = h = u = 0, i = 0, n = w - 1; i < w; n = i++)
    o = l[i], s = l[n], r = o.y * s.x - s.y * o.x, h += (o.x + s.x) * r, u += (o.y + s.y) * r, a += r * 3;
  return a === 0 ? c = l[0] : c = [h / a, u / a], e.unproject(_(c));
}
var Rh = {
  __proto__: null,
  clipPolygon: ws,
  polygonCenter: xs
}, wn = {
  project: function(t) {
    return new m(t.lng, t.lat);
  },
  unproject: function(t) {
    return new E(t.y, t.x);
  },
  bounds: new k([-180, -90], [180, 90])
}, Bi = {
  R: 6378137,
  R_MINOR: 6356752314245179e-9,
  bounds: new k([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
  project: function(t) {
    var e = Math.PI / 180, i = this.R, n = t.lat * e, o = this.R_MINOR / i, s = Math.sqrt(1 - o * o), r = s * Math.sin(n), a = Math.tan(Math.PI / 4 - n / 2) / Math.pow((1 - r) / (1 + r), s / 2);
    return n = -i * Math.log(Math.max(a, 1e-10)), new m(t.lng * e * i, n);
  },
  unproject: function(t) {
    for (var e = 180 / Math.PI, i = this.R, n = this.R_MINOR / i, o = Math.sqrt(1 - n * n), s = Math.exp(-t.y / i), r = Math.PI / 2 - 2 * Math.atan(s), a = 0, h = 0.1, u; a < 15 && Math.abs(h) > 1e-7; a++)
      u = o * Math.sin(r), u = Math.pow((1 - u) / (1 + u), o / 2), h = Math.PI / 2 - 2 * Math.atan(s * u) - r, r += h;
    return new E(r * e, t.x * e / i);
  }
}, Dh = {
  __proto__: null,
  LonLat: wn,
  Mercator: Bi,
  SphericalMercator: Ci
}, Fh = T({}, kt, {
  code: "EPSG:3395",
  projection: Bi,
  transformation: function() {
    var t = 0.5 / (Math.PI * Bi.R);
    return Le(t, 0.5, -t, 0.5);
  }()
}), Ps = T({}, kt, {
  code: "EPSG:4326",
  projection: wn,
  transformation: Le(1 / 180, 1, -1 / 180, 0.5)
}), Hh = T({}, bt, {
  projection: wn,
  transformation: Le(1, 0, -1, 0),
  scale: function(t) {
    return Math.pow(2, t);
  },
  zoom: function(t) {
    return Math.log(t) / Math.LN2;
  },
  distance: function(t, e) {
    var i = e.lng - t.lng, n = e.lat - t.lat;
    return Math.sqrt(i * i + n * n);
  },
  infinite: !0
});
bt.Earth = kt;
bt.EPSG3395 = Fh;
bt.EPSG3857 = nn;
bt.EPSG900913 = $a;
bt.EPSG4326 = Ps;
bt.Simple = Hh;
var dt = be.extend({
  options: {
    pane: "overlayPane",
    attribution: null,
    bubblingMouseEvents: !0
  },
  addTo: function(t) {
    return t.addLayer(this), this;
  },
  remove: function() {
    return this.removeFrom(this._map || this._mapToAdd);
  },
  removeFrom: function(t) {
    return t && t.removeLayer(this), this;
  },
  getPane: function(t) {
    return this._map.getPane(t ? this.options[t] || t : this.options.pane);
  },
  addInteractiveTarget: function(t) {
    return this._map._targets[b(t)] = this, this;
  },
  removeInteractiveTarget: function(t) {
    return delete this._map._targets[b(t)], this;
  },
  getAttribution: function() {
    return this.options.attribution;
  },
  _layerAdd: function(t) {
    var e = t.target;
    if (!!e.hasLayer(this)) {
      if (this._map = e, this._zoomAnimated = e._zoomAnimated, this.getEvents) {
        var i = this.getEvents();
        e.on(i, this), this.once("remove", function() {
          e.off(i, this);
        }, this);
      }
      this.onAdd(e), this.fire("add"), e.fire("layeradd", { layer: this });
    }
  }
});
y.include({
  addLayer: function(t) {
    if (!t._layerAdd)
      throw new Error("The provided object is not a Layer.");
    var e = b(t);
    return this._layers[e] ? this : (this._layers[e] = t, t._mapToAdd = this, t.beforeAdd && t.beforeAdd(this), this.whenReady(t._layerAdd, t), this);
  },
  removeLayer: function(t) {
    var e = b(t);
    return this._layers[e] ? (this._loaded && t.onRemove(this), delete this._layers[e], this._loaded && (this.fire("layerremove", { layer: t }), t.fire("remove")), t._map = t._mapToAdd = null, this) : this;
  },
  hasLayer: function(t) {
    return b(t) in this._layers;
  },
  eachLayer: function(t, e) {
    for (var i in this._layers)
      t.call(e, this._layers[i]);
    return this;
  },
  _addLayers: function(t) {
    t = t ? ft(t) ? t : [t] : [];
    for (var e = 0, i = t.length; e < i; e++)
      this.addLayer(t[e]);
  },
  _addZoomLimit: function(t) {
    (!isNaN(t.options.maxZoom) || !isNaN(t.options.minZoom)) && (this._zoomBoundLayers[b(t)] = t, this._updateZoomLevels());
  },
  _removeZoomLimit: function(t) {
    var e = b(t);
    this._zoomBoundLayers[e] && (delete this._zoomBoundLayers[e], this._updateZoomLevels());
  },
  _updateZoomLevels: function() {
    var t = 1 / 0, e = -1 / 0, i = this._getZoomSpan();
    for (var n in this._zoomBoundLayers) {
      var o = this._zoomBoundLayers[n].options;
      t = o.minZoom === void 0 ? t : Math.min(t, o.minZoom), e = o.maxZoom === void 0 ? e : Math.max(e, o.maxZoom);
    }
    this._layersMaxZoom = e === -1 / 0 ? void 0 : e, this._layersMinZoom = t === 1 / 0 ? void 0 : t, i !== this._getZoomSpan() && this.fire("zoomlevelschange"), this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom);
  }
});
var Qt = dt.extend({
  initialize: function(t, e) {
    z(this, e), this._layers = {};
    var i, n;
    if (t)
      for (i = 0, n = t.length; i < n; i++)
        this.addLayer(t[i]);
  },
  addLayer: function(t) {
    var e = this.getLayerId(t);
    return this._layers[e] = t, this._map && this._map.addLayer(t), this;
  },
  removeLayer: function(t) {
    var e = t in this._layers ? t : this.getLayerId(t);
    return this._map && this._layers[e] && this._map.removeLayer(this._layers[e]), delete this._layers[e], this;
  },
  hasLayer: function(t) {
    var e = typeof t == "number" ? t : this.getLayerId(t);
    return e in this._layers;
  },
  clearLayers: function() {
    return this.eachLayer(this.removeLayer, this);
  },
  invoke: function(t) {
    var e = Array.prototype.slice.call(arguments, 1), i, n;
    for (i in this._layers)
      n = this._layers[i], n[t] && n[t].apply(n, e);
    return this;
  },
  onAdd: function(t) {
    this.eachLayer(t.addLayer, t);
  },
  onRemove: function(t) {
    this.eachLayer(t.removeLayer, t);
  },
  eachLayer: function(t, e) {
    for (var i in this._layers)
      t.call(e, this._layers[i]);
    return this;
  },
  getLayer: function(t) {
    return this._layers[t];
  },
  getLayers: function() {
    var t = [];
    return this.eachLayer(t.push, t), t;
  },
  setZIndex: function(t) {
    return this.invoke("setZIndex", t);
  },
  getLayerId: function(t) {
    return b(t);
  }
}), Vh = function(t, e) {
  return new Qt(t, e);
}, jt = Qt.extend({
  addLayer: function(t) {
    return this.hasLayer(t) ? this : (t.addEventParent(this), Qt.prototype.addLayer.call(this, t), this.fire("layeradd", { layer: t }));
  },
  removeLayer: function(t) {
    return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]), t.removeEventParent(this), Qt.prototype.removeLayer.call(this, t), this.fire("layerremove", { layer: t })) : this;
  },
  setStyle: function(t) {
    return this.invoke("setStyle", t);
  },
  bringToFront: function() {
    return this.invoke("bringToFront");
  },
  bringToBack: function() {
    return this.invoke("bringToBack");
  },
  getBounds: function() {
    var t = new Q();
    for (var e in this._layers) {
      var i = this._layers[e];
      t.extend(i.getBounds ? i.getBounds() : i.getLatLng());
    }
    return t;
  }
}), Wh = function(t, e) {
  return new jt(t, e);
}, ie = Pt.extend({
  options: {
    popupAnchor: [0, 0],
    tooltipAnchor: [0, 0],
    crossOrigin: !1
  },
  initialize: function(t) {
    z(this, t);
  },
  createIcon: function(t) {
    return this._createIcon("icon", t);
  },
  createShadow: function(t) {
    return this._createIcon("shadow", t);
  },
  _createIcon: function(t, e) {
    var i = this._getIconUrl(t);
    if (!i) {
      if (t === "icon")
        throw new Error("iconUrl not set in Icon options (see the docs).");
      return null;
    }
    var n = this._createImg(i, e && e.tagName === "IMG" ? e : null);
    return this._setIconStyles(n, t), (this.options.crossOrigin || this.options.crossOrigin === "") && (n.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), n;
  },
  _setIconStyles: function(t, e) {
    var i = this.options, n = i[e + "Size"];
    typeof n == "number" && (n = [n, n]);
    var o = _(n), s = _(e === "shadow" && i.shadowAnchor || i.iconAnchor || o && o.divideBy(2, !0));
    t.className = "leaflet-marker-" + e + " " + (i.className || ""), s && (t.style.marginLeft = -s.x + "px", t.style.marginTop = -s.y + "px"), o && (t.style.width = o.x + "px", t.style.height = o.y + "px");
  },
  _createImg: function(t, e) {
    return e = e || document.createElement("img"), e.src = t, e;
  },
  _getIconUrl: function(t) {
    return d.retina && this.options[t + "RetinaUrl"] || this.options[t + "Url"];
  }
});
function Uh(t) {
  return new ie(t);
}
var de = ie.extend({
  options: {
    iconUrl: "marker-icon.png",
    iconRetinaUrl: "marker-icon-2x.png",
    shadowUrl: "marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  },
  _getIconUrl: function(t) {
    return typeof de.imagePath != "string" && (de.imagePath = this._detectIconPath()), (this.options.imagePath || de.imagePath) + ie.prototype._getIconUrl.call(this, t);
  },
  _stripUrl: function(t) {
    var e = function(i, n, o) {
      var s = n.exec(i);
      return s && s[o];
    };
    return t = e(t, /^url\((['"])?(.+)\1\)$/, 2), t && e(t, /^(.*)marker-icon\.png$/, 1);
  },
  _detectIconPath: function() {
    var t = P("div", "leaflet-default-icon-path", document.body), e = we(t, "background-image") || we(t, "backgroundImage");
    if (document.body.removeChild(t), e = this._stripUrl(e), e)
      return e;
    var i = document.querySelector('link[href$="leaflet.css"]');
    return i ? i.href.substring(0, i.href.length - 11 - 1) : "";
  }
}), Xn = yt.extend({
  initialize: function(t) {
    this._marker = t;
  },
  addHooks: function() {
    var t = this._marker._icon;
    this._draggable || (this._draggable = new Mt(t, t, !0)), this._draggable.on({
      dragstart: this._onDragStart,
      predrag: this._onPreDrag,
      drag: this._onDrag,
      dragend: this._onDragEnd
    }, this).enable(), g(t, "leaflet-marker-draggable");
  },
  removeHooks: function() {
    this._draggable.off({
      dragstart: this._onDragStart,
      predrag: this._onPreDrag,
      drag: this._onDrag,
      dragend: this._onDragEnd
    }, this).disable(), this._marker._icon && B(this._marker._icon, "leaflet-marker-draggable");
  },
  moved: function() {
    return this._draggable && this._draggable._moved;
  },
  _adjustPan: function(t) {
    var e = this._marker, i = e._map, n = this._marker.options.autoPanSpeed, o = this._marker.options.autoPanPadding, s = $t(e._icon), r = i.getPixelBounds(), a = i.getPixelOrigin(), h = J(
      r.min._subtract(a).add(o),
      r.max._subtract(a).subtract(o)
    );
    if (!h.contains(s)) {
      var u = _(
        (Math.max(h.max.x, s.x) - h.max.x) / (r.max.x - h.max.x) - (Math.min(h.min.x, s.x) - h.min.x) / (r.min.x - h.min.x),
        (Math.max(h.max.y, s.y) - h.max.y) / (r.max.y - h.max.y) - (Math.min(h.min.y, s.y) - h.min.y) / (r.min.y - h.min.y)
      ).multiplyBy(n);
      i.panBy(u, { animate: !1 }), this._draggable._newPos._add(u), this._draggable._startPos._add(u), F(e._icon, this._draggable._newPos), this._onDrag(t), this._panRequest = X(this._adjustPan.bind(this, t));
    }
  },
  _onDragStart: function() {
    this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
  },
  _onPreDrag: function(t) {
    this._marker.options.autoPan && (ot(this._panRequest), this._panRequest = X(this._adjustPan.bind(this, t)));
  },
  _onDrag: function(t) {
    var e = this._marker, i = e._shadow, n = $t(e._icon), o = e._map.layerPointToLatLng(n);
    i && F(i, n), e._latlng = o, t.latlng = o, t.oldLatLng = this._oldLatLng, e.fire("move", t).fire("drag", t);
  },
  _onDragEnd: function(t) {
    ot(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", t);
  }
}), ai = dt.extend({
  options: {
    icon: new de(),
    interactive: !0,
    keyboard: !0,
    title: "",
    alt: "Marker",
    zIndexOffset: 0,
    opacity: 1,
    riseOnHover: !1,
    riseOffset: 250,
    pane: "markerPane",
    shadowPane: "shadowPane",
    bubblingMouseEvents: !1,
    autoPanOnFocus: !0,
    draggable: !1,
    autoPan: !1,
    autoPanPadding: [50, 50],
    autoPanSpeed: 10
  },
  initialize: function(t, e) {
    z(this, e), this._latlng = S(t);
  },
  onAdd: function(t) {
    this._zoomAnimated = this._zoomAnimated && t.options.markerZoomAnimation, this._zoomAnimated && t.on("zoomanim", this._animateZoom, this), this._initIcon(), this.update();
  },
  onRemove: function(t) {
    this.dragging && this.dragging.enabled() && (this.options.draggable = !0, this.dragging.removeHooks()), delete this.dragging, this._zoomAnimated && t.off("zoomanim", this._animateZoom, this), this._removeIcon(), this._removeShadow();
  },
  getEvents: function() {
    return {
      zoom: this.update,
      viewreset: this.update
    };
  },
  getLatLng: function() {
    return this._latlng;
  },
  setLatLng: function(t) {
    var e = this._latlng;
    return this._latlng = S(t), this.update(), this.fire("move", { oldLatLng: e, latlng: this._latlng });
  },
  setZIndexOffset: function(t) {
    return this.options.zIndexOffset = t, this.update();
  },
  getIcon: function() {
    return this.options.icon;
  },
  setIcon: function(t) {
    return this.options.icon = t, this._map && (this._initIcon(), this.update()), this._popup && this.bindPopup(this._popup, this._popup.options), this;
  },
  getElement: function() {
    return this._icon;
  },
  update: function() {
    if (this._icon && this._map) {
      var t = this._map.latLngToLayerPoint(this._latlng).round();
      this._setPos(t);
    }
    return this;
  },
  _initIcon: function() {
    var t = this.options, e = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"), i = t.icon.createIcon(this._icon), n = !1;
    i !== this._icon && (this._icon && this._removeIcon(), n = !0, t.title && (i.title = t.title), i.tagName === "IMG" && (i.alt = t.alt || "")), g(i, e), t.keyboard && (i.tabIndex = "0", i.setAttribute("role", "button")), this._icon = i, t.riseOnHover && this.on({
      mouseover: this._bringToFront,
      mouseout: this._resetZIndex
    }), this.options.autoPanOnFocus && p(i, "focus", this._panOnFocus, this);
    var o = t.icon.createShadow(this._shadow), s = !1;
    o !== this._shadow && (this._removeShadow(), s = !0), o && (g(o, e), o.alt = ""), this._shadow = o, t.opacity < 1 && this._updateOpacity(), n && this.getPane().appendChild(this._icon), this._initInteraction(), o && s && this.getPane(t.shadowPane).appendChild(this._shadow);
  },
  _removeIcon: function() {
    this.options.riseOnHover && this.off({
      mouseover: this._bringToFront,
      mouseout: this._resetZIndex
    }), this.options.autoPanOnFocus && M(this._icon, "focus", this._panOnFocus, this), N(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null;
  },
  _removeShadow: function() {
    this._shadow && N(this._shadow), this._shadow = null;
  },
  _setPos: function(t) {
    this._icon && F(this._icon, t), this._shadow && F(this._shadow, t), this._zIndex = t.y + this.options.zIndexOffset, this._resetZIndex();
  },
  _updateZIndex: function(t) {
    this._icon && (this._icon.style.zIndex = this._zIndex + t);
  },
  _animateZoom: function(t) {
    var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
    this._setPos(e);
  },
  _initInteraction: function() {
    if (!!this.options.interactive && (g(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), Xn)) {
      var t = this.options.draggable;
      this.dragging && (t = this.dragging.enabled(), this.dragging.disable()), this.dragging = new Xn(this), t && this.dragging.enable();
    }
  },
  setOpacity: function(t) {
    return this.options.opacity = t, this._map && this._updateOpacity(), this;
  },
  _updateOpacity: function() {
    var t = this.options.opacity;
    this._icon && nt(this._icon, t), this._shadow && nt(this._shadow, t);
  },
  _bringToFront: function() {
    this._updateZIndex(this.options.riseOffset);
  },
  _resetZIndex: function() {
    this._updateZIndex(0);
  },
  _panOnFocus: function() {
    var t = this._map;
    if (!!t) {
      var e = this.options.icon.options, i = e.iconSize ? _(e.iconSize) : _(0, 0), n = e.iconAnchor ? _(e.iconAnchor) : _(0, 0);
      t.panInside(this._latlng, {
        paddingTopLeft: n,
        paddingBottomRight: i.subtract(n)
      });
    }
  },
  _getPopupAnchor: function() {
    return this.options.icon.options.popupAnchor;
  },
  _getTooltipAnchor: function() {
    return this.options.icon.options.tooltipAnchor;
  }
});
function jh(t, e) {
  return new ai(t, e);
}
var At = dt.extend({
  options: {
    stroke: !0,
    color: "#3388ff",
    weight: 3,
    opacity: 1,
    lineCap: "round",
    lineJoin: "round",
    dashArray: null,
    dashOffset: null,
    fill: !1,
    fillColor: null,
    fillOpacity: 0.2,
    fillRule: "evenodd",
    interactive: !0,
    bubblingMouseEvents: !0
  },
  beforeAdd: function(t) {
    this._renderer = t.getRenderer(this);
  },
  onAdd: function() {
    this._renderer._initPath(this), this._reset(), this._renderer._addPath(this);
  },
  onRemove: function() {
    this._renderer._removePath(this);
  },
  redraw: function() {
    return this._map && this._renderer._updatePath(this), this;
  },
  setStyle: function(t) {
    return z(this, t), this._renderer && (this._renderer._updateStyle(this), this.options.stroke && t && Object.prototype.hasOwnProperty.call(t, "weight") && this._updateBounds()), this;
  },
  bringToFront: function() {
    return this._renderer && this._renderer._bringToFront(this), this;
  },
  bringToBack: function() {
    return this._renderer && this._renderer._bringToBack(this), this;
  },
  getElement: function() {
    return this._path;
  },
  _reset: function() {
    this._project(), this._update();
  },
  _clickTolerance: function() {
    return (this.options.stroke ? this.options.weight / 2 : 0) + (this._renderer.options.tolerance || 0);
  }
}), hi = At.extend({
  options: {
    fill: !0,
    radius: 10
  },
  initialize: function(t, e) {
    z(this, e), this._latlng = S(t), this._radius = this.options.radius;
  },
  setLatLng: function(t) {
    var e = this._latlng;
    return this._latlng = S(t), this.redraw(), this.fire("move", { oldLatLng: e, latlng: this._latlng });
  },
  getLatLng: function() {
    return this._latlng;
  },
  setRadius: function(t) {
    return this.options.radius = this._radius = t, this.redraw();
  },
  getRadius: function() {
    return this._radius;
  },
  setStyle: function(t) {
    var e = t && t.radius || this._radius;
    return At.prototype.setStyle.call(this, t), this.setRadius(e), this;
  },
  _project: function() {
    this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds();
  },
  _updateBounds: function() {
    var t = this._radius, e = this._radiusY || t, i = this._clickTolerance(), n = [t + i, e + i];
    this._pxBounds = new k(this._point.subtract(n), this._point.add(n));
  },
  _update: function() {
    this._map && this._updatePath();
  },
  _updatePath: function() {
    this._renderer._updateCircle(this);
  },
  _empty: function() {
    return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
  },
  _containsPoint: function(t) {
    return t.distanceTo(this._point) <= this._radius + this._clickTolerance();
  }
});
function Gh(t, e) {
  return new hi(t, e);
}
var xn = hi.extend({
  initialize: function(t, e, i) {
    if (typeof e == "number" && (e = T({}, i, { radius: e })), z(this, e), this._latlng = S(t), isNaN(this.options.radius))
      throw new Error("Circle radius cannot be NaN");
    this._mRadius = this.options.radius;
  },
  setRadius: function(t) {
    return this._mRadius = t, this.redraw();
  },
  getRadius: function() {
    return this._mRadius;
  },
  getBounds: function() {
    var t = [this._radius, this._radiusY || this._radius];
    return new Q(
      this._map.layerPointToLatLng(this._point.subtract(t)),
      this._map.layerPointToLatLng(this._point.add(t))
    );
  },
  setStyle: At.prototype.setStyle,
  _project: function() {
    var t = this._latlng.lng, e = this._latlng.lat, i = this._map, n = i.options.crs;
    if (n.distance === kt.distance) {
      var o = Math.PI / 180, s = this._mRadius / kt.R / o, r = i.project([e + s, t]), a = i.project([e - s, t]), h = r.add(a).divideBy(2), u = i.unproject(h).lat, c = Math.acos((Math.cos(s * o) - Math.sin(e * o) * Math.sin(u * o)) / (Math.cos(e * o) * Math.cos(u * o))) / o;
      (isNaN(c) || c === 0) && (c = s / Math.cos(Math.PI / 180 * e)), this._point = h.subtract(i.getPixelOrigin()), this._radius = isNaN(c) ? 0 : h.x - i.project([u, t - c]).x, this._radiusY = h.y - r.y;
    } else {
      var l = n.unproject(n.project(this._latlng).subtract([this._mRadius, 0]));
      this._point = i.latLngToLayerPoint(this._latlng), this._radius = this._point.x - i.latLngToLayerPoint(l).x;
    }
    this._updateBounds();
  }
});
function $h(t, e, i) {
  return new xn(t, e, i);
}
var xt = At.extend({
  options: {
    smoothFactor: 1,
    noClip: !1
  },
  initialize: function(t, e) {
    z(this, e), this._setLatLngs(t);
  },
  getLatLngs: function() {
    return this._latlngs;
  },
  setLatLngs: function(t) {
    return this._setLatLngs(t), this.redraw();
  },
  isEmpty: function() {
    return !this._latlngs.length;
  },
  closestLayerPoint: function(t) {
    for (var e = 1 / 0, i = null, n = Me, o, s, r = 0, a = this._parts.length; r < a; r++)
      for (var h = this._parts[r], u = 1, c = h.length; u < c; u++) {
        o = h[u - 1], s = h[u];
        var l = n(t, o, s, !0);
        l < e && (e = l, i = n(t, o, s));
      }
    return i && (i.distance = Math.sqrt(e)), i;
  },
  getCenter: function() {
    if (!this._map)
      throw new Error("Must add layer to map before using getCenter()");
    return ys(this._defaultShape(), this._map.options.crs);
  },
  getBounds: function() {
    return this._bounds;
  },
  addLatLng: function(t, e) {
    return e = e || this._defaultShape(), t = S(t), e.push(t), this._bounds.extend(t), this.redraw();
  },
  _setLatLngs: function(t) {
    this._bounds = new Q(), this._latlngs = this._convertLatLngs(t);
  },
  _defaultShape: function() {
    return rt(this._latlngs) ? this._latlngs : this._latlngs[0];
  },
  _convertLatLngs: function(t) {
    for (var e = [], i = rt(t), n = 0, o = t.length; n < o; n++)
      i ? (e[n] = S(t[n]), this._bounds.extend(e[n])) : e[n] = this._convertLatLngs(t[n]);
    return e;
  },
  _project: function() {
    var t = new k();
    this._rings = [], this._projectLatlngs(this._latlngs, this._rings, t), this._bounds.isValid() && t.isValid() && (this._rawPxBounds = t, this._updateBounds());
  },
  _updateBounds: function() {
    var t = this._clickTolerance(), e = new m(t, t);
    !this._rawPxBounds || (this._pxBounds = new k([
      this._rawPxBounds.min.subtract(e),
      this._rawPxBounds.max.add(e)
    ]));
  },
  _projectLatlngs: function(t, e, i) {
    var n = t[0] instanceof E, o = t.length, s, r;
    if (n) {
      for (r = [], s = 0; s < o; s++)
        r[s] = this._map.latLngToLayerPoint(t[s]), i.extend(r[s]);
      e.push(r);
    } else
      for (s = 0; s < o; s++)
        this._projectLatlngs(t[s], e, i);
  },
  _clipPoints: function() {
    var t = this._renderer._bounds;
    if (this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
      if (this.options.noClip) {
        this._parts = this._rings;
        return;
      }
      var e = this._parts, i, n, o, s, r, a, h;
      for (i = 0, o = 0, s = this._rings.length; i < s; i++)
        for (h = this._rings[i], n = 0, r = h.length; n < r - 1; n++)
          a = gs(h[n], h[n + 1], t, n, !0), a && (e[o] = e[o] || [], e[o].push(a[0]), (a[1] !== h[n + 1] || n === r - 2) && (e[o].push(a[1]), o++));
    }
  },
  _simplifyPoints: function() {
    for (var t = this._parts, e = this.options.smoothFactor, i = 0, n = t.length; i < n; i++)
      t[i] = ps(t[i], e);
  },
  _update: function() {
    !this._map || (this._clipPoints(), this._simplifyPoints(), this._updatePath());
  },
  _updatePath: function() {
    this._renderer._updatePoly(this);
  },
  _containsPoint: function(t, e) {
    var i, n, o, s, r, a, h = this._clickTolerance();
    if (!this._pxBounds || !this._pxBounds.contains(t))
      return !1;
    for (i = 0, s = this._parts.length; i < s; i++)
      for (a = this._parts[i], n = 0, r = a.length, o = r - 1; n < r; o = n++)
        if (!(!e && n === 0) && ms(t, a[o], a[n]) <= h)
          return !0;
    return !1;
  }
});
function qh(t, e) {
  return new xt(t, e);
}
xt._flat = vs;
var ne = xt.extend({
  options: {
    fill: !0
  },
  isEmpty: function() {
    return !this._latlngs.length || !this._latlngs[0].length;
  },
  getCenter: function() {
    if (!this._map)
      throw new Error("Must add layer to map before using getCenter()");
    return xs(this._defaultShape(), this._map.options.crs);
  },
  _convertLatLngs: function(t) {
    var e = xt.prototype._convertLatLngs.call(this, t), i = e.length;
    return i >= 2 && e[0] instanceof E && e[0].equals(e[i - 1]) && e.pop(), e;
  },
  _setLatLngs: function(t) {
    xt.prototype._setLatLngs.call(this, t), rt(this._latlngs) && (this._latlngs = [this._latlngs]);
  },
  _defaultShape: function() {
    return rt(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
  },
  _clipPoints: function() {
    var t = this._renderer._bounds, e = this.options.weight, i = new m(e, e);
    if (t = new k(t.min.subtract(i), t.max.add(i)), this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
      if (this.options.noClip) {
        this._parts = this._rings;
        return;
      }
      for (var n = 0, o = this._rings.length, s; n < o; n++)
        s = ws(this._rings[n], t, !0), s.length && this._parts.push(s);
    }
  },
  _updatePath: function() {
    this._renderer._updatePoly(this, !0);
  },
  _containsPoint: function(t) {
    var e = !1, i, n, o, s, r, a, h, u;
    if (!this._pxBounds || !this._pxBounds.contains(t))
      return !1;
    for (s = 0, h = this._parts.length; s < h; s++)
      for (i = this._parts[s], r = 0, u = i.length, a = u - 1; r < u; a = r++)
        n = i[r], o = i[a], n.y > t.y != o.y > t.y && t.x < (o.x - n.x) * (t.y - n.y) / (o.y - n.y) + n.x && (e = !e);
    return e || xt.prototype._containsPoint.call(this, t, !0);
  }
});
function Kh(t, e) {
  return new ne(t, e);
}
var Lt = jt.extend({
  initialize: function(t, e) {
    z(this, e), this._layers = {}, t && this.addData(t);
  },
  addData: function(t) {
    var e = ft(t) ? t : t.features, i, n, o;
    if (e) {
      for (i = 0, n = e.length; i < n; i++)
        o = e[i], (o.geometries || o.geometry || o.features || o.coordinates) && this.addData(o);
      return this;
    }
    var s = this.options;
    if (s.filter && !s.filter(t))
      return this;
    var r = ti(t, s);
    return r ? (r.feature = li(t), r.defaultOptions = r.options, this.resetStyle(r), s.onEachFeature && s.onEachFeature(t, r), this.addLayer(r)) : this;
  },
  resetStyle: function(t) {
    return t === void 0 ? this.eachLayer(this.resetStyle, this) : (t.options = T({}, t.defaultOptions), this._setLayerStyle(t, this.options.style), this);
  },
  setStyle: function(t) {
    return this.eachLayer(function(e) {
      this._setLayerStyle(e, t);
    }, this);
  },
  _setLayerStyle: function(t, e) {
    t.setStyle && (typeof e == "function" && (e = e(t.feature)), t.setStyle(e));
  }
});
function ti(t, e) {
  var i = t.type === "Feature" ? t.geometry : t, n = i ? i.coordinates : null, o = [], s = e && e.pointToLayer, r = e && e.coordsToLatLng || Pn, a, h, u, c;
  if (!n && !i)
    return null;
  switch (i.type) {
    case "Point":
      return a = r(n), Qn(s, t, a, e);
    case "MultiPoint":
      for (u = 0, c = n.length; u < c; u++)
        a = r(n[u]), o.push(Qn(s, t, a, e));
      return new jt(o);
    case "LineString":
    case "MultiLineString":
      return h = ei(n, i.type === "LineString" ? 0 : 1, r), new xt(h, e);
    case "Polygon":
    case "MultiPolygon":
      return h = ei(n, i.type === "Polygon" ? 1 : 2, r), new ne(h, e);
    case "GeometryCollection":
      for (u = 0, c = i.geometries.length; u < c; u++) {
        var l = ti({
          geometry: i.geometries[u],
          type: "Feature",
          properties: t.properties
        }, e);
        l && o.push(l);
      }
      return new jt(o);
    case "FeatureCollection":
      for (u = 0, c = i.features.length; u < c; u++) {
        var f = ti(i.features[u], e);
        f && o.push(f);
      }
      return new jt(o);
    default:
      throw new Error("Invalid GeoJSON object.");
  }
}
function Qn(t, e, i, n) {
  return t ? t(e, i) : new ai(i, n && n.markersInheritOptions && n);
}
function Pn(t) {
  return new E(t[1], t[0], t[2]);
}
function ei(t, e, i) {
  for (var n = [], o = 0, s = t.length, r; o < s; o++)
    r = e ? ei(t[o], e - 1, i) : (i || Pn)(t[o]), n.push(r);
  return n;
}
function bn(t, e) {
  return t = S(t), t.alt !== void 0 ? [pt(t.lng, e), pt(t.lat, e), pt(t.alt, e)] : [pt(t.lng, e), pt(t.lat, e)];
}
function ui(t, e, i, n) {
  for (var o = [], s = 0, r = t.length; s < r; s++)
    o.push(e ? ui(t[s], rt(t[s]) ? 0 : e - 1, i, n) : bn(t[s], n));
  return !e && i && o.push(o[0]), o;
}
function oe(t, e) {
  return t.feature ? T({}, t.feature, { geometry: e }) : li(e);
}
function li(t) {
  return t.type === "Feature" || t.type === "FeatureCollection" ? t : {
    type: "Feature",
    properties: {},
    geometry: t
  };
}
var Ln = {
  toGeoJSON: function(t) {
    return oe(this, {
      type: "Point",
      coordinates: bn(this.getLatLng(), t)
    });
  }
};
ai.include(Ln);
xn.include(Ln);
hi.include(Ln);
xt.include({
  toGeoJSON: function(t) {
    var e = !rt(this._latlngs), i = ui(this._latlngs, e ? 1 : 0, !1, t);
    return oe(this, {
      type: (e ? "Multi" : "") + "LineString",
      coordinates: i
    });
  }
});
ne.include({
  toGeoJSON: function(t) {
    var e = !rt(this._latlngs), i = e && !rt(this._latlngs[0]), n = ui(this._latlngs, i ? 2 : e ? 1 : 0, !0, t);
    return e || (n = [n]), oe(this, {
      type: (i ? "Multi" : "") + "Polygon",
      coordinates: n
    });
  }
});
Qt.include({
  toMultiPoint: function(t) {
    var e = [];
    return this.eachLayer(function(i) {
      e.push(i.toGeoJSON(t).geometry.coordinates);
    }), oe(this, {
      type: "MultiPoint",
      coordinates: e
    });
  },
  toGeoJSON: function(t) {
    var e = this.feature && this.feature.geometry && this.feature.geometry.type;
    if (e === "MultiPoint")
      return this.toMultiPoint(t);
    var i = e === "GeometryCollection", n = [];
    return this.eachLayer(function(o) {
      if (o.toGeoJSON) {
        var s = o.toGeoJSON(t);
        if (i)
          n.push(s.geometry);
        else {
          var r = li(s);
          r.type === "FeatureCollection" ? n.push.apply(n, r.features) : n.push(r);
        }
      }
    }), i ? oe(this, {
      geometries: n,
      type: "GeometryCollection"
    }) : {
      type: "FeatureCollection",
      features: n
    };
  }
});
function bs(t, e) {
  return new Lt(t, e);
}
var Yh = bs, ci = dt.extend({
  options: {
    opacity: 1,
    alt: "",
    interactive: !1,
    crossOrigin: !1,
    errorOverlayUrl: "",
    zIndex: 1,
    className: ""
  },
  initialize: function(t, e, i) {
    this._url = t, this._bounds = V(e), z(this, i);
  },
  onAdd: function() {
    this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (g(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset();
  },
  onRemove: function() {
    N(this._image), this.options.interactive && this.removeInteractiveTarget(this._image);
  },
  setOpacity: function(t) {
    return this.options.opacity = t, this._image && this._updateOpacity(), this;
  },
  setStyle: function(t) {
    return t.opacity && this.setOpacity(t.opacity), this;
  },
  bringToFront: function() {
    return this._map && se(this._image), this;
  },
  bringToBack: function() {
    return this._map && re(this._image), this;
  },
  setUrl: function(t) {
    return this._url = t, this._image && (this._image.src = t), this;
  },
  setBounds: function(t) {
    return this._bounds = V(t), this._map && this._reset(), this;
  },
  getEvents: function() {
    var t = {
      zoom: this._reset,
      viewreset: this._reset
    };
    return this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
  },
  setZIndex: function(t) {
    return this.options.zIndex = t, this._updateZIndex(), this;
  },
  getBounds: function() {
    return this._bounds;
  },
  getElement: function() {
    return this._image;
  },
  _initImage: function() {
    var t = this._url.tagName === "IMG", e = this._image = t ? this._url : P("img");
    if (g(e, "leaflet-image-layer"), this._zoomAnimated && g(e, "leaflet-zoom-animated"), this.options.className && g(e, this.options.className), e.onselectstart = D, e.onmousemove = D, e.onload = C(this.fire, this, "load"), e.onerror = C(this._overlayOnError, this, "error"), (this.options.crossOrigin || this.options.crossOrigin === "") && (e.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), t) {
      this._url = e.src;
      return;
    }
    e.src = this._url, e.alt = this.options.alt;
  },
  _animateZoom: function(t) {
    var e = this._map.getZoomScale(t.zoom), i = this._map._latLngBoundsToNewLayerBounds(this._bounds, t.zoom, t.center).min;
    Gt(this._image, i, e);
  },
  _reset: function() {
    var t = this._image, e = new k(
      this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
      this._map.latLngToLayerPoint(this._bounds.getSouthEast())
    ), i = e.getSize();
    F(t, e.min), t.style.width = i.x + "px", t.style.height = i.y + "px";
  },
  _updateOpacity: function() {
    nt(this._image, this.options.opacity);
  },
  _updateZIndex: function() {
    this._image && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._image.style.zIndex = this.options.zIndex);
  },
  _overlayOnError: function() {
    this.fire("error");
    var t = this.options.errorOverlayUrl;
    t && this._url !== t && (this._url = t, this._image.src = t);
  },
  getCenter: function() {
    return this._bounds.getCenter();
  }
}), Jh = function(t, e, i) {
  return new ci(t, e, i);
}, Ls = ci.extend({
  options: {
    autoplay: !0,
    loop: !0,
    keepAspectRatio: !0,
    muted: !1,
    playsInline: !0
  },
  _initImage: function() {
    var t = this._url.tagName === "VIDEO", e = this._image = t ? this._url : P("video");
    if (g(e, "leaflet-image-layer"), this._zoomAnimated && g(e, "leaflet-zoom-animated"), this.options.className && g(e, this.options.className), e.onselectstart = D, e.onmousemove = D, e.onloadeddata = C(this.fire, this, "load"), t) {
      for (var i = e.getElementsByTagName("source"), n = [], o = 0; o < i.length; o++)
        n.push(i[o].src);
      this._url = i.length > 0 ? n : [e.src];
      return;
    }
    ft(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(e.style, "objectFit") && (e.style.objectFit = "fill"), e.autoplay = !!this.options.autoplay, e.loop = !!this.options.loop, e.muted = !!this.options.muted, e.playsInline = !!this.options.playsInline;
    for (var s = 0; s < this._url.length; s++) {
      var r = P("source");
      r.src = this._url[s], e.appendChild(r);
    }
  }
});
function Xh(t, e, i) {
  return new Ls(t, e, i);
}
var Ts = ci.extend({
  _initImage: function() {
    var t = this._image = this._url;
    g(t, "leaflet-image-layer"), this._zoomAnimated && g(t, "leaflet-zoom-animated"), this.options.className && g(t, this.options.className), t.onselectstart = D, t.onmousemove = D;
  }
});
function Qh(t, e, i) {
  return new Ts(t, e, i);
}
var gt = dt.extend({
  options: {
    interactive: !1,
    offset: [0, 0],
    className: "",
    pane: void 0,
    content: ""
  },
  initialize: function(t, e) {
    t && (t instanceof L.LatLng || ft(t)) ? (this._latlng = S(t), z(this, e)) : (z(this, t), this._source = e), this.options.content && (this._content = this.options.content);
  },
  openOn: function(t) {
    return t = arguments.length ? t : this._source._map, t.hasLayer(this) || t.addLayer(this), this;
  },
  close: function() {
    return this._map && this._map.removeLayer(this), this;
  },
  toggle: function(t) {
    return this._map ? this.close() : (arguments.length ? this._source = t : t = this._source, this._prepareOpen(), this.openOn(t._map)), this;
  },
  onAdd: function(t) {
    this._zoomAnimated = t._zoomAnimated, this._container || this._initLayout(), t._fadeAnimated && nt(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), t._fadeAnimated && nt(this._container, 1), this.bringToFront(), this.options.interactive && (g(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container));
  },
  onRemove: function(t) {
    t._fadeAnimated ? (nt(this._container, 0), this._removeTimeout = setTimeout(C(N, void 0, this._container), 200)) : N(this._container), this.options.interactive && (B(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
  },
  getLatLng: function() {
    return this._latlng;
  },
  setLatLng: function(t) {
    return this._latlng = S(t), this._map && (this._updatePosition(), this._adjustPan()), this;
  },
  getContent: function() {
    return this._content;
  },
  setContent: function(t) {
    return this._content = t, this.update(), this;
  },
  getElement: function() {
    return this._container;
  },
  update: function() {
    !this._map || (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan());
  },
  getEvents: function() {
    var t = {
      zoom: this._updatePosition,
      viewreset: this._updatePosition
    };
    return this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
  },
  isOpen: function() {
    return !!this._map && this._map.hasLayer(this);
  },
  bringToFront: function() {
    return this._map && se(this._container), this;
  },
  bringToBack: function() {
    return this._map && re(this._container), this;
  },
  _prepareOpen: function(t) {
    var e = this._source;
    if (!e._map)
      return !1;
    if (e instanceof jt) {
      e = null;
      var i = this._source._layers;
      for (var n in i)
        if (i[n]._map) {
          e = i[n];
          break;
        }
      if (!e)
        return !1;
      this._source = e;
    }
    if (!t)
      if (e.getCenter)
        t = e.getCenter();
      else if (e.getLatLng)
        t = e.getLatLng();
      else if (e.getBounds)
        t = e.getBounds().getCenter();
      else
        throw new Error("Unable to get source layer LatLng.");
    return this.setLatLng(t), this._map && this.update(), !0;
  },
  _updateContent: function() {
    if (!!this._content) {
      var t = this._contentNode, e = typeof this._content == "function" ? this._content(this._source || this) : this._content;
      if (typeof e == "string")
        t.innerHTML = e;
      else {
        for (; t.hasChildNodes(); )
          t.removeChild(t.firstChild);
        t.appendChild(e);
      }
      this.fire("contentupdate");
    }
  },
  _updatePosition: function() {
    if (!!this._map) {
      var t = this._map.latLngToLayerPoint(this._latlng), e = _(this.options.offset), i = this._getAnchor();
      this._zoomAnimated ? F(this._container, t.add(i)) : e = e.add(t).add(i);
      var n = this._containerBottom = -e.y, o = this._containerLeft = -Math.round(this._containerWidth / 2) + e.x;
      this._container.style.bottom = n + "px", this._container.style.left = o + "px";
    }
  },
  _getAnchor: function() {
    return [0, 0];
  }
});
y.include({
  _initOverlay: function(t, e, i, n) {
    var o = e;
    return o instanceof t || (o = new t(n).setContent(e)), i && o.setLatLng(i), o;
  }
});
dt.include({
  _initOverlay: function(t, e, i, n) {
    var o = i;
    return o instanceof t ? (z(o, n), o._source = this) : (o = e && !n ? e : new t(n, this), o.setContent(i)), o;
  }
});
var fi = gt.extend({
  options: {
    pane: "popupPane",
    offset: [0, 7],
    maxWidth: 300,
    minWidth: 50,
    maxHeight: null,
    autoPan: !0,
    autoPanPaddingTopLeft: null,
    autoPanPaddingBottomRight: null,
    autoPanPadding: [5, 5],
    keepInView: !1,
    closeButton: !0,
    autoClose: !0,
    closeOnEscapeKey: !0,
    className: ""
  },
  openOn: function(t) {
    return t = arguments.length ? t : this._source._map, !t.hasLayer(this) && t._popup && t._popup.options.autoClose && t.removeLayer(t._popup), t._popup = this, gt.prototype.openOn.call(this, t);
  },
  onAdd: function(t) {
    gt.prototype.onAdd.call(this, t), t.fire("popupopen", { popup: this }), this._source && (this._source.fire("popupopen", { popup: this }, !0), this._source instanceof At || this._source.on("preclick", Wt));
  },
  onRemove: function(t) {
    gt.prototype.onRemove.call(this, t), t.fire("popupclose", { popup: this }), this._source && (this._source.fire("popupclose", { popup: this }, !0), this._source instanceof At || this._source.off("preclick", Wt));
  },
  getEvents: function() {
    var t = gt.prototype.getEvents.call(this);
    return (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (t.preclick = this.close), this.options.keepInView && (t.moveend = this._adjustPan), t;
  },
  _initLayout: function() {
    var t = "leaflet-popup", e = this._container = P(
      "div",
      t + " " + (this.options.className || "") + " leaflet-zoom-animated"
    ), i = this._wrapper = P("div", t + "-content-wrapper", e);
    if (this._contentNode = P("div", t + "-content", i), Ee(e), mn(this._contentNode), p(e, "contextmenu", Wt), this._tipContainer = P("div", t + "-tip-container", e), this._tip = P("div", t + "-tip", this._tipContainer), this.options.closeButton) {
      var n = this._closeButton = P("a", t + "-close-button", e);
      n.setAttribute("role", "button"), n.setAttribute("aria-label", "Close popup"), n.href = "#close", n.innerHTML = '<span aria-hidden="true">&#215;</span>', p(n, "click", function(o) {
        j(o), this.close();
      }, this);
    }
  },
  _updateLayout: function() {
    var t = this._contentNode, e = t.style;
    e.width = "", e.whiteSpace = "nowrap";
    var i = t.offsetWidth;
    i = Math.min(i, this.options.maxWidth), i = Math.max(i, this.options.minWidth), e.width = i + 1 + "px", e.whiteSpace = "", e.height = "";
    var n = t.offsetHeight, o = this.options.maxHeight, s = "leaflet-popup-scrolled";
    o && n > o ? (e.height = o + "px", g(t, s)) : B(t, s), this._containerWidth = this._container.offsetWidth;
  },
  _animateZoom: function(t) {
    var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center), i = this._getAnchor();
    F(this._container, e.add(i));
  },
  _adjustPan: function(t) {
    if (!!this.options.autoPan) {
      this._map._panAnim && this._map._panAnim.stop();
      var e = this._map, i = parseInt(we(this._container, "marginBottom"), 10) || 0, n = this._container.offsetHeight + i, o = this._containerWidth, s = new m(this._containerLeft, -n - this._containerBottom);
      s._add($t(this._container));
      var r = e.layerPointToContainerPoint(s), a = _(this.options.autoPanPadding), h = _(this.options.autoPanPaddingTopLeft || a), u = _(this.options.autoPanPaddingBottomRight || a), c = e.getSize(), l = 0, f = 0;
      r.x + o + u.x > c.x && (l = r.x + o - c.x + u.x), r.x - l - h.x < 0 && (l = r.x - h.x), r.y + n + u.y > c.y && (f = r.y + n - c.y + u.y), r.y - f - h.y < 0 && (f = r.y - h.y), (l || f) && e.fire("autopanstart").panBy([l, f], { animate: t && t.type === "moveend" });
    }
  },
  _getAnchor: function() {
    return _(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
  }
}), tu = function(t, e) {
  return new fi(t, e);
};
y.mergeOptions({
  closePopupOnClick: !0
});
y.include({
  openPopup: function(t, e, i) {
    return this._initOverlay(fi, t, e, i).openOn(this), this;
  },
  closePopup: function(t) {
    return t = arguments.length ? t : this._popup, t && t.close(), this;
  }
});
dt.include({
  bindPopup: function(t, e) {
    return this._popup = this._initOverlay(fi, this._popup, t, e), this._popupHandlersAdded || (this.on({
      click: this._openPopup,
      keypress: this._onKeyPress,
      remove: this.closePopup,
      move: this._movePopup
    }), this._popupHandlersAdded = !0), this;
  },
  unbindPopup: function() {
    return this._popup && (this.off({
      click: this._openPopup,
      keypress: this._onKeyPress,
      remove: this.closePopup,
      move: this._movePopup
    }), this._popupHandlersAdded = !1, this._popup = null), this;
  },
  openPopup: function(t) {
    return this._popup && this._popup._prepareOpen(t) && this._popup.openOn(this._map), this;
  },
  closePopup: function() {
    return this._popup && this._popup.close(), this;
  },
  togglePopup: function() {
    return this._popup && this._popup.toggle(this), this;
  },
  isPopupOpen: function() {
    return this._popup ? this._popup.isOpen() : !1;
  },
  setPopupContent: function(t) {
    return this._popup && this._popup.setContent(t), this;
  },
  getPopup: function() {
    return this._popup;
  },
  _openPopup: function(t) {
    if (!(!this._popup || !this._map)) {
      qt(t);
      var e = t.layer || t.target;
      if (this._popup._source === e && !(e instanceof At)) {
        this._map.hasLayer(this._popup) ? this.closePopup() : this.openPopup(t.latlng);
        return;
      }
      this._popup._source = e, this.openPopup(t.latlng);
    }
  },
  _movePopup: function(t) {
    this._popup.setLatLng(t.latlng);
  },
  _onKeyPress: function(t) {
    t.originalEvent.keyCode === 13 && this._openPopup(t);
  }
});
var di = gt.extend({
  options: {
    pane: "tooltipPane",
    offset: [0, 0],
    direction: "auto",
    permanent: !1,
    sticky: !1,
    opacity: 0.9
  },
  onAdd: function(t) {
    gt.prototype.onAdd.call(this, t), this.setOpacity(this.options.opacity), t.fire("tooltipopen", { tooltip: this }), this._source && (this.addEventParent(this._source), this._source.fire("tooltipopen", { tooltip: this }, !0));
  },
  onRemove: function(t) {
    gt.prototype.onRemove.call(this, t), t.fire("tooltipclose", { tooltip: this }), this._source && (this.removeEventParent(this._source), this._source.fire("tooltipclose", { tooltip: this }, !0));
  },
  getEvents: function() {
    var t = gt.prototype.getEvents.call(this);
    return this.options.permanent || (t.preclick = this.close), t;
  },
  _initLayout: function() {
    var t = "leaflet-tooltip", e = t + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
    this._contentNode = this._container = P("div", e), this._container.setAttribute("role", "tooltip"), this._container.setAttribute("id", "leaflet-tooltip-" + b(this));
  },
  _updateLayout: function() {
  },
  _adjustPan: function() {
  },
  _setPosition: function(t) {
    var e, i, n = this._map, o = this._container, s = n.latLngToContainerPoint(n.getCenter()), r = n.layerPointToContainerPoint(t), a = this.options.direction, h = o.offsetWidth, u = o.offsetHeight, c = _(this.options.offset), l = this._getAnchor();
    a === "top" ? (e = h / 2, i = u) : a === "bottom" ? (e = h / 2, i = 0) : a === "center" ? (e = h / 2, i = u / 2) : a === "right" ? (e = 0, i = u / 2) : a === "left" ? (e = h, i = u / 2) : r.x < s.x ? (a = "right", e = 0, i = u / 2) : (a = "left", e = h + (c.x + l.x) * 2, i = u / 2), t = t.subtract(_(e, i, !0)).add(c).add(l), B(o, "leaflet-tooltip-right"), B(o, "leaflet-tooltip-left"), B(o, "leaflet-tooltip-top"), B(o, "leaflet-tooltip-bottom"), g(o, "leaflet-tooltip-" + a), F(o, t);
  },
  _updatePosition: function() {
    var t = this._map.latLngToLayerPoint(this._latlng);
    this._setPosition(t);
  },
  setOpacity: function(t) {
    this.options.opacity = t, this._container && nt(this._container, t);
  },
  _animateZoom: function(t) {
    var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
    this._setPosition(e);
  },
  _getAnchor: function() {
    return _(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
  }
}), eu = function(t, e) {
  return new di(t, e);
};
y.include({
  openTooltip: function(t, e, i) {
    return this._initOverlay(di, t, e, i).openOn(this), this;
  },
  closeTooltip: function(t) {
    return t.close(), this;
  }
});
dt.include({
  bindTooltip: function(t, e) {
    return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(di, this._tooltip, t, e), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
  },
  unbindTooltip: function() {
    return this._tooltip && (this._initTooltipInteractions(!0), this.closeTooltip(), this._tooltip = null), this;
  },
  _initTooltipInteractions: function(t) {
    if (!(!t && this._tooltipHandlersAdded)) {
      var e = t ? "off" : "on", i = {
        remove: this.closeTooltip,
        move: this._moveTooltip
      };
      this._tooltip.options.permanent ? i.add = this._openTooltip : (i.mouseover = this._openTooltip, i.mouseout = this.closeTooltip, i.click = this._openTooltip, this._map ? this._addFocusListeners() : i.add = this._addFocusListeners), this._tooltip.options.sticky && (i.mousemove = this._moveTooltip), this[e](i), this._tooltipHandlersAdded = !t;
    }
  },
  openTooltip: function(t) {
    return this._tooltip && this._tooltip._prepareOpen(t) && (this._tooltip.openOn(this._map), this.getElement ? this._setAriaDescribedByOnLayer(this) : this.eachLayer && this.eachLayer(this._setAriaDescribedByOnLayer, this)), this;
  },
  closeTooltip: function() {
    if (this._tooltip)
      return this._tooltip.close();
  },
  toggleTooltip: function() {
    return this._tooltip && this._tooltip.toggle(this), this;
  },
  isTooltipOpen: function() {
    return this._tooltip.isOpen();
  },
  setTooltipContent: function(t) {
    return this._tooltip && this._tooltip.setContent(t), this;
  },
  getTooltip: function() {
    return this._tooltip;
  },
  _addFocusListeners: function() {
    this.getElement ? this._addFocusListenersOnLayer(this) : this.eachLayer && this.eachLayer(this._addFocusListenersOnLayer, this);
  },
  _addFocusListenersOnLayer: function(t) {
    p(t.getElement(), "focus", function() {
      this._tooltip._source = t, this.openTooltip();
    }, this), p(t.getElement(), "blur", this.closeTooltip, this);
  },
  _setAriaDescribedByOnLayer: function(t) {
    t.getElement().setAttribute("aria-describedby", this._tooltip._container.id);
  },
  _openTooltip: function(t) {
    !this._tooltip || !this._map || this._map.dragging && this._map.dragging.moving() || (this._tooltip._source = t.layer || t.target, this.openTooltip(this._tooltip.options.sticky ? t.latlng : void 0));
  },
  _moveTooltip: function(t) {
    var e = t.latlng, i, n;
    this._tooltip.options.sticky && t.originalEvent && (i = this._map.mouseEventToContainerPoint(t.originalEvent), n = this._map.containerPointToLayerPoint(i), e = this._map.layerPointToLatLng(n)), this._tooltip.setLatLng(e);
  }
});
var Es = ie.extend({
  options: {
    iconSize: [12, 12],
    html: !1,
    bgPos: null,
    className: "leaflet-div-icon"
  },
  createIcon: function(t) {
    var e = t && t.tagName === "DIV" ? t : document.createElement("div"), i = this.options;
    if (i.html instanceof Element ? (Je(e), e.appendChild(i.html)) : e.innerHTML = i.html !== !1 ? i.html : "", i.bgPos) {
      var n = _(i.bgPos);
      e.style.backgroundPosition = -n.x + "px " + -n.y + "px";
    }
    return this._setIconStyles(e, "icon"), e;
  },
  createShadow: function() {
    return null;
  }
});
function iu(t) {
  return new Es(t);
}
ie.Default = de;
var _e = dt.extend({
  options: {
    tileSize: 256,
    opacity: 1,
    updateWhenIdle: d.mobile,
    updateWhenZooming: !0,
    updateInterval: 200,
    zIndex: 1,
    bounds: null,
    minZoom: 0,
    maxZoom: void 0,
    maxNativeZoom: void 0,
    minNativeZoom: void 0,
    noWrap: !1,
    pane: "tilePane",
    className: "",
    keepBuffer: 2
  },
  initialize: function(t) {
    z(this, t);
  },
  onAdd: function() {
    this._initContainer(), this._levels = {}, this._tiles = {}, this._resetView();
  },
  beforeAdd: function(t) {
    t._addZoomLimit(this);
  },
  onRemove: function(t) {
    this._removeAllTiles(), N(this._container), t._removeZoomLimit(this), this._container = null, this._tileZoom = void 0;
  },
  bringToFront: function() {
    return this._map && (se(this._container), this._setAutoZIndex(Math.max)), this;
  },
  bringToBack: function() {
    return this._map && (re(this._container), this._setAutoZIndex(Math.min)), this;
  },
  getContainer: function() {
    return this._container;
  },
  setOpacity: function(t) {
    return this.options.opacity = t, this._updateOpacity(), this;
  },
  setZIndex: function(t) {
    return this.options.zIndex = t, this._updateZIndex(), this;
  },
  isLoading: function() {
    return this._loading;
  },
  redraw: function() {
    if (this._map) {
      this._removeAllTiles();
      var t = this._clampZoom(this._map.getZoom());
      t !== this._tileZoom && (this._tileZoom = t, this._updateLevels()), this._update();
    }
    return this;
  },
  getEvents: function() {
    var t = {
      viewprereset: this._invalidateAll,
      viewreset: this._resetView,
      zoom: this._resetView,
      moveend: this._onMoveEnd
    };
    return this.options.updateWhenIdle || (this._onMove || (this._onMove = Bo(this._onMoveEnd, this.options.updateInterval, this)), t.move = this._onMove), this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
  },
  createTile: function() {
    return document.createElement("div");
  },
  getTileSize: function() {
    var t = this.options.tileSize;
    return t instanceof m ? t : new m(t, t);
  },
  _updateZIndex: function() {
    this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._container.style.zIndex = this.options.zIndex);
  },
  _setAutoZIndex: function(t) {
    for (var e = this.getPane().children, i = -t(-1 / 0, 1 / 0), n = 0, o = e.length, s; n < o; n++)
      s = e[n].style.zIndex, e[n] !== this._container && s && (i = t(i, +s));
    isFinite(i) && (this.options.zIndex = i + t(-1, 1), this._updateZIndex());
  },
  _updateOpacity: function() {
    if (!!this._map && !d.ielt9) {
      nt(this._container, this.options.opacity);
      var t = +new Date(), e = !1, i = !1;
      for (var n in this._tiles) {
        var o = this._tiles[n];
        if (!(!o.current || !o.loaded)) {
          var s = Math.min(1, (t - o.loaded) / 200);
          nt(o.el, s), s < 1 ? e = !0 : (o.active ? i = !0 : this._onOpaqueTile(o), o.active = !0);
        }
      }
      i && !this._noPrune && this._pruneTiles(), e && (ot(this._fadeFrame), this._fadeFrame = X(this._updateOpacity, this));
    }
  },
  _onOpaqueTile: D,
  _initContainer: function() {
    this._container || (this._container = P("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
  },
  _updateLevels: function() {
    var t = this._tileZoom, e = this.options.maxZoom;
    if (t !== void 0) {
      for (var i in this._levels)
        i = Number(i), this._levels[i].el.children.length || i === t ? (this._levels[i].el.style.zIndex = e - Math.abs(t - i), this._onUpdateLevel(i)) : (N(this._levels[i].el), this._removeTilesAtZoom(i), this._onRemoveLevel(i), delete this._levels[i]);
      var n = this._levels[t], o = this._map;
      return n || (n = this._levels[t] = {}, n.el = P("div", "leaflet-tile-container leaflet-zoom-animated", this._container), n.el.style.zIndex = e, n.origin = o.project(o.unproject(o.getPixelOrigin()), t).round(), n.zoom = t, this._setZoomTransform(n, o.getCenter(), o.getZoom()), D(n.el.offsetWidth), this._onCreateLevel(n)), this._level = n, n;
    }
  },
  _onUpdateLevel: D,
  _onRemoveLevel: D,
  _onCreateLevel: D,
  _pruneTiles: function() {
    if (!!this._map) {
      var t, e, i = this._map.getZoom();
      if (i > this.options.maxZoom || i < this.options.minZoom) {
        this._removeAllTiles();
        return;
      }
      for (t in this._tiles)
        e = this._tiles[t], e.retain = e.current;
      for (t in this._tiles)
        if (e = this._tiles[t], e.current && !e.active) {
          var n = e.coords;
          this._retainParent(n.x, n.y, n.z, n.z - 5) || this._retainChildren(n.x, n.y, n.z, n.z + 2);
        }
      for (t in this._tiles)
        this._tiles[t].retain || this._removeTile(t);
    }
  },
  _removeTilesAtZoom: function(t) {
    for (var e in this._tiles)
      this._tiles[e].coords.z === t && this._removeTile(e);
  },
  _removeAllTiles: function() {
    for (var t in this._tiles)
      this._removeTile(t);
  },
  _invalidateAll: function() {
    for (var t in this._levels)
      N(this._levels[t].el), this._onRemoveLevel(Number(t)), delete this._levels[t];
    this._removeAllTiles(), this._tileZoom = void 0;
  },
  _retainParent: function(t, e, i, n) {
    var o = Math.floor(t / 2), s = Math.floor(e / 2), r = i - 1, a = new m(+o, +s);
    a.z = +r;
    var h = this._tileCoordsToKey(a), u = this._tiles[h];
    return u && u.active ? (u.retain = !0, !0) : (u && u.loaded && (u.retain = !0), r > n ? this._retainParent(o, s, r, n) : !1);
  },
  _retainChildren: function(t, e, i, n) {
    for (var o = 2 * t; o < 2 * t + 2; o++)
      for (var s = 2 * e; s < 2 * e + 2; s++) {
        var r = new m(o, s);
        r.z = i + 1;
        var a = this._tileCoordsToKey(r), h = this._tiles[a];
        if (h && h.active) {
          h.retain = !0;
          continue;
        } else
          h && h.loaded && (h.retain = !0);
        i + 1 < n && this._retainChildren(o, s, i + 1, n);
      }
  },
  _resetView: function(t) {
    var e = t && (t.pinch || t.flyTo);
    this._setView(this._map.getCenter(), this._map.getZoom(), e, e);
  },
  _animateZoom: function(t) {
    this._setView(t.center, t.zoom, !0, t.noUpdate);
  },
  _clampZoom: function(t) {
    var e = this.options;
    return e.minNativeZoom !== void 0 && t < e.minNativeZoom ? e.minNativeZoom : e.maxNativeZoom !== void 0 && e.maxNativeZoom < t ? e.maxNativeZoom : t;
  },
  _setView: function(t, e, i, n) {
    var o = Math.round(e);
    this.options.maxZoom !== void 0 && o > this.options.maxZoom || this.options.minZoom !== void 0 && o < this.options.minZoom ? o = void 0 : o = this._clampZoom(o);
    var s = this.options.updateWhenZooming && o !== this._tileZoom;
    (!n || s) && (this._tileZoom = o, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), o !== void 0 && this._update(t), i || this._pruneTiles(), this._noPrune = !!i), this._setZoomTransforms(t, e);
  },
  _setZoomTransforms: function(t, e) {
    for (var i in this._levels)
      this._setZoomTransform(this._levels[i], t, e);
  },
  _setZoomTransform: function(t, e, i) {
    var n = this._map.getZoomScale(i, t.zoom), o = t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(e, i)).round();
    d.any3d ? Gt(t.el, o, n) : F(t.el, o);
  },
  _resetGrid: function() {
    var t = this._map, e = t.options.crs, i = this._tileSize = this.getTileSize(), n = this._tileZoom, o = this._map.getPixelWorldBounds(this._tileZoom);
    o && (this._globalTileRange = this._pxBoundsToTileRange(o)), this._wrapX = e.wrapLng && !this.options.noWrap && [
      Math.floor(t.project([0, e.wrapLng[0]], n).x / i.x),
      Math.ceil(t.project([0, e.wrapLng[1]], n).x / i.y)
    ], this._wrapY = e.wrapLat && !this.options.noWrap && [
      Math.floor(t.project([e.wrapLat[0], 0], n).y / i.x),
      Math.ceil(t.project([e.wrapLat[1], 0], n).y / i.y)
    ];
  },
  _onMoveEnd: function() {
    !this._map || this._map._animatingZoom || this._update();
  },
  _getTiledPixelBounds: function(t) {
    var e = this._map, i = e._animatingZoom ? Math.max(e._animateToZoom, e.getZoom()) : e.getZoom(), n = e.getZoomScale(i, this._tileZoom), o = e.project(t, this._tileZoom).floor(), s = e.getSize().divideBy(n * 2);
    return new k(o.subtract(s), o.add(s));
  },
  _update: function(t) {
    var e = this._map;
    if (!!e) {
      var i = this._clampZoom(e.getZoom());
      if (t === void 0 && (t = e.getCenter()), this._tileZoom !== void 0) {
        var n = this._getTiledPixelBounds(t), o = this._pxBoundsToTileRange(n), s = o.getCenter(), r = [], a = this.options.keepBuffer, h = new k(
          o.getBottomLeft().subtract([a, -a]),
          o.getTopRight().add([a, -a])
        );
        if (!(isFinite(o.min.x) && isFinite(o.min.y) && isFinite(o.max.x) && isFinite(o.max.y)))
          throw new Error("Attempted to load an infinite number of tiles");
        for (var u in this._tiles) {
          var c = this._tiles[u].coords;
          (c.z !== this._tileZoom || !h.contains(new m(c.x, c.y))) && (this._tiles[u].current = !1);
        }
        if (Math.abs(i - this._tileZoom) > 1) {
          this._setView(t, i);
          return;
        }
        for (var l = o.min.y; l <= o.max.y; l++)
          for (var f = o.min.x; f <= o.max.x; f++) {
            var w = new m(f, l);
            if (w.z = this._tileZoom, !!this._isValidTile(w)) {
              var x = this._tiles[this._tileCoordsToKey(w)];
              x ? x.current = !0 : r.push(w);
            }
          }
        if (r.sort(function(W, H) {
          return W.distanceTo(s) - H.distanceTo(s);
        }), r.length !== 0) {
          this._loading || (this._loading = !0, this.fire("loading"));
          var O = document.createDocumentFragment();
          for (f = 0; f < r.length; f++)
            this._addTile(r[f], O);
          this._level.el.appendChild(O);
        }
      }
    }
  },
  _isValidTile: function(t) {
    var e = this._map.options.crs;
    if (!e.infinite) {
      var i = this._globalTileRange;
      if (!e.wrapLng && (t.x < i.min.x || t.x > i.max.x) || !e.wrapLat && (t.y < i.min.y || t.y > i.max.y))
        return !1;
    }
    if (!this.options.bounds)
      return !0;
    var n = this._tileCoordsToBounds(t);
    return V(this.options.bounds).overlaps(n);
  },
  _keyToBounds: function(t) {
    return this._tileCoordsToBounds(this._keyToTileCoords(t));
  },
  _tileCoordsToNwSe: function(t) {
    var e = this._map, i = this.getTileSize(), n = t.scaleBy(i), o = n.add(i), s = e.unproject(n, t.z), r = e.unproject(o, t.z);
    return [s, r];
  },
  _tileCoordsToBounds: function(t) {
    var e = this._tileCoordsToNwSe(t), i = new Q(e[0], e[1]);
    return this.options.noWrap || (i = this._map.wrapLatLngBounds(i)), i;
  },
  _tileCoordsToKey: function(t) {
    return t.x + ":" + t.y + ":" + t.z;
  },
  _keyToTileCoords: function(t) {
    var e = t.split(":"), i = new m(+e[0], +e[1]);
    return i.z = +e[2], i;
  },
  _removeTile: function(t) {
    var e = this._tiles[t];
    !e || (N(e.el), delete this._tiles[t], this.fire("tileunload", {
      tile: e.el,
      coords: this._keyToTileCoords(t)
    }));
  },
  _initTile: function(t) {
    g(t, "leaflet-tile");
    var e = this.getTileSize();
    t.style.width = e.x + "px", t.style.height = e.y + "px", t.onselectstart = D, t.onmousemove = D, d.ielt9 && this.options.opacity < 1 && nt(t, this.options.opacity);
  },
  _addTile: function(t, e) {
    var i = this._getTilePos(t), n = this._tileCoordsToKey(t), o = this.createTile(this._wrapCoords(t), C(this._tileReady, this, t));
    this._initTile(o), this.createTile.length < 2 && X(C(this._tileReady, this, t, null, o)), F(o, i), this._tiles[n] = {
      el: o,
      coords: t,
      current: !0
    }, e.appendChild(o), this.fire("tileloadstart", {
      tile: o,
      coords: t
    });
  },
  _tileReady: function(t, e, i) {
    e && this.fire("tileerror", {
      error: e,
      tile: i,
      coords: t
    });
    var n = this._tileCoordsToKey(t);
    i = this._tiles[n], i && (i.loaded = +new Date(), this._map._fadeAnimated ? (nt(i.el, 0), ot(this._fadeFrame), this._fadeFrame = X(this._updateOpacity, this)) : (i.active = !0, this._pruneTiles()), e || (g(i.el, "leaflet-tile-loaded"), this.fire("tileload", {
      tile: i.el,
      coords: t
    })), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), d.ielt9 || !this._map._fadeAnimated ? X(this._pruneTiles, this) : setTimeout(C(this._pruneTiles, this), 250)));
  },
  _getTilePos: function(t) {
    return t.scaleBy(this.getTileSize()).subtract(this._level.origin);
  },
  _wrapCoords: function(t) {
    var e = new m(
      this._wrapX ? ye(t.x, this._wrapX) : t.x,
      this._wrapY ? ye(t.y, this._wrapY) : t.y
    );
    return e.z = t.z, e;
  },
  _pxBoundsToTileRange: function(t) {
    var e = this.getTileSize();
    return new k(
      t.min.unscaleBy(e).floor(),
      t.max.unscaleBy(e).ceil().subtract([1, 1])
    );
  },
  _noTilesToLoad: function() {
    for (var t in this._tiles)
      if (!this._tiles[t].loaded)
        return !1;
    return !0;
  }
});
function nu(t) {
  return new _e(t);
}
var te = _e.extend({
  options: {
    minZoom: 0,
    maxZoom: 18,
    subdomains: "abc",
    errorTileUrl: "",
    zoomOffset: 0,
    tms: !1,
    zoomReverse: !1,
    detectRetina: !1,
    crossOrigin: !1,
    referrerPolicy: !1
  },
  initialize: function(t, e) {
    this._url = t, e = z(this, e), e.detectRetina && d.retina && e.maxZoom > 0 ? (e.tileSize = Math.floor(e.tileSize / 2), e.zoomReverse ? (e.zoomOffset--, e.minZoom = Math.min(e.maxZoom, e.minZoom + 1)) : (e.zoomOffset++, e.maxZoom = Math.max(e.minZoom, e.maxZoom - 1)), e.minZoom = Math.max(0, e.minZoom)) : e.zoomReverse ? e.minZoom = Math.min(e.maxZoom, e.minZoom) : e.maxZoom = Math.max(e.minZoom, e.maxZoom), typeof e.subdomains == "string" && (e.subdomains = e.subdomains.split("")), this.on("tileunload", this._onTileRemove);
  },
  setUrl: function(t, e) {
    return this._url === t && e === void 0 && (e = !0), this._url = t, e || this.redraw(), this;
  },
  createTile: function(t, e) {
    var i = document.createElement("img");
    return p(i, "load", C(this._tileOnLoad, this, e, i)), p(i, "error", C(this._tileOnError, this, e, i)), (this.options.crossOrigin || this.options.crossOrigin === "") && (i.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), typeof this.options.referrerPolicy == "string" && (i.referrerPolicy = this.options.referrerPolicy), i.alt = "", i.src = this.getTileUrl(t), i;
  },
  getTileUrl: function(t) {
    var e = {
      r: d.retina ? "@2x" : "",
      s: this._getSubdomain(t),
      x: t.x,
      y: t.y,
      z: this._getZoomForUrl()
    };
    if (this._map && !this._map.options.crs.infinite) {
      var i = this._globalTileRange.max.y - t.y;
      this.options.tms && (e.y = i), e["-y"] = i;
    }
    return Do(this._url, T(e, this.options));
  },
  _tileOnLoad: function(t, e) {
    d.ielt9 ? setTimeout(C(t, this, null, e), 0) : t(null, e);
  },
  _tileOnError: function(t, e, i) {
    var n = this.options.errorTileUrl;
    n && e.getAttribute("src") !== n && (e.src = n), t(i, e);
  },
  _onTileRemove: function(t) {
    t.tile.onload = null;
  },
  _getZoomForUrl: function() {
    var t = this._tileZoom, e = this.options.maxZoom, i = this.options.zoomReverse, n = this.options.zoomOffset;
    return i && (t = e - t), t + n;
  },
  _getSubdomain: function(t) {
    var e = Math.abs(t.x + t.y) % this.options.subdomains.length;
    return this.options.subdomains[e];
  },
  _abortLoading: function() {
    var t, e;
    for (t in this._tiles)
      if (this._tiles[t].coords.z !== this._tileZoom && (e = this._tiles[t].el, e.onload = D, e.onerror = D, !e.complete)) {
        e.src = De;
        var i = this._tiles[t].coords;
        N(e), delete this._tiles[t], this.fire("tileabort", {
          tile: e,
          coords: i
        });
      }
  },
  _removeTile: function(t) {
    var e = this._tiles[t];
    if (!!e)
      return e.el.setAttribute("src", De), _e.prototype._removeTile.call(this, t);
  },
  _tileReady: function(t, e, i) {
    if (!(!this._map || i && i.getAttribute("src") === De))
      return _e.prototype._tileReady.call(this, t, e, i);
  }
});
function Ss(t, e) {
  return new te(t, e);
}
var Ms = te.extend({
  defaultWmsParams: {
    service: "WMS",
    request: "GetMap",
    layers: "",
    styles: "",
    format: "image/jpeg",
    transparent: !1,
    version: "1.1.1"
  },
  options: {
    crs: null,
    uppercase: !1
  },
  initialize: function(t, e) {
    this._url = t;
    var i = T({}, this.defaultWmsParams);
    for (var n in e)
      n in this.options || (i[n] = e[n]);
    e = z(this, e);
    var o = e.detectRetina && d.retina ? 2 : 1, s = this.getTileSize();
    i.width = s.x * o, i.height = s.y * o, this.wmsParams = i;
  },
  onAdd: function(t) {
    this._crs = this.options.crs || t.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
    var e = this._wmsVersion >= 1.3 ? "crs" : "srs";
    this.wmsParams[e] = this._crs.code, te.prototype.onAdd.call(this, t);
  },
  getTileUrl: function(t) {
    var e = this._tileCoordsToNwSe(t), i = this._crs, n = J(i.project(e[0]), i.project(e[1])), o = n.min, s = n.max, r = (this._wmsVersion >= 1.3 && this._crs === Ps ? [o.y, o.x, s.y, s.x] : [o.x, o.y, s.x, s.y]).join(","), a = te.prototype.getTileUrl.call(this, t);
    return a + Ro(this.wmsParams, a, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + r;
  },
  setParams: function(t, e) {
    return T(this.wmsParams, t), e || this.redraw(), this;
  }
});
function ou(t, e) {
  return new Ms(t, e);
}
te.WMS = Ms;
Ss.wms = ou;
var wt = dt.extend({
  options: {
    padding: 0.1
  },
  initialize: function(t) {
    z(this, t), b(this), this._layers = this._layers || {};
  },
  onAdd: function() {
    this._container || (this._initContainer(), this._zoomAnimated && g(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this);
  },
  onRemove: function() {
    this.off("update", this._updatePaths, this), this._destroyContainer();
  },
  getEvents: function() {
    var t = {
      viewreset: this._reset,
      zoom: this._onZoom,
      moveend: this._update,
      zoomend: this._onZoomEnd
    };
    return this._zoomAnimated && (t.zoomanim = this._onAnimZoom), t;
  },
  _onAnimZoom: function(t) {
    this._updateTransform(t.center, t.zoom);
  },
  _onZoom: function() {
    this._updateTransform(this._map.getCenter(), this._map.getZoom());
  },
  _updateTransform: function(t, e) {
    var i = this._map.getZoomScale(e, this._zoom), n = this._map.getSize().multiplyBy(0.5 + this.options.padding), o = this._map.project(this._center, e), s = n.multiplyBy(-i).add(o).subtract(this._map._getNewPixelOrigin(t, e));
    d.any3d ? Gt(this._container, s, i) : F(this._container, s);
  },
  _reset: function() {
    this._update(), this._updateTransform(this._center, this._zoom);
    for (var t in this._layers)
      this._layers[t]._reset();
  },
  _onZoomEnd: function() {
    for (var t in this._layers)
      this._layers[t]._project();
  },
  _updatePaths: function() {
    for (var t in this._layers)
      this._layers[t]._update();
  },
  _update: function() {
    var t = this.options.padding, e = this._map.getSize(), i = this._map.containerPointToLayerPoint(e.multiplyBy(-t)).round();
    this._bounds = new k(i, i.add(e.multiplyBy(1 + t * 2)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom();
  }
}), Os = wt.extend({
  options: {
    tolerance: 0
  },
  getEvents: function() {
    var t = wt.prototype.getEvents.call(this);
    return t.viewprereset = this._onViewPreReset, t;
  },
  _onViewPreReset: function() {
    this._postponeUpdatePaths = !0;
  },
  onAdd: function() {
    wt.prototype.onAdd.call(this), this._draw();
  },
  _initContainer: function() {
    var t = this._container = document.createElement("canvas");
    p(t, "mousemove", this._onMouseMove, this), p(t, "click dblclick mousedown mouseup contextmenu", this._onClick, this), p(t, "mouseout", this._handleMouseOut, this), t._leaflet_disable_events = !0, this._ctx = t.getContext("2d");
  },
  _destroyContainer: function() {
    ot(this._redrawRequest), delete this._ctx, N(this._container), M(this._container), delete this._container;
  },
  _updatePaths: function() {
    if (!this._postponeUpdatePaths) {
      var t;
      this._redrawBounds = null;
      for (var e in this._layers)
        t = this._layers[e], t._update();
      this._redraw();
    }
  },
  _update: function() {
    if (!(this._map._animatingZoom && this._bounds)) {
      wt.prototype._update.call(this);
      var t = this._bounds, e = this._container, i = t.getSize(), n = d.retina ? 2 : 1;
      F(e, t.min), e.width = n * i.x, e.height = n * i.y, e.style.width = i.x + "px", e.style.height = i.y + "px", d.retina && this._ctx.scale(2, 2), this._ctx.translate(-t.min.x, -t.min.y), this.fire("update");
    }
  },
  _reset: function() {
    wt.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths());
  },
  _initPath: function(t) {
    this._updateDashArray(t), this._layers[b(t)] = t;
    var e = t._order = {
      layer: t,
      prev: this._drawLast,
      next: null
    };
    this._drawLast && (this._drawLast.next = e), this._drawLast = e, this._drawFirst = this._drawFirst || this._drawLast;
  },
  _addPath: function(t) {
    this._requestRedraw(t);
  },
  _removePath: function(t) {
    var e = t._order, i = e.next, n = e.prev;
    i ? i.prev = n : this._drawLast = n, n ? n.next = i : this._drawFirst = i, delete t._order, delete this._layers[b(t)], this._requestRedraw(t);
  },
  _updatePath: function(t) {
    this._extendRedrawBounds(t), t._project(), t._update(), this._requestRedraw(t);
  },
  _updateStyle: function(t) {
    this._updateDashArray(t), this._requestRedraw(t);
  },
  _updateDashArray: function(t) {
    if (typeof t.options.dashArray == "string") {
      var e = t.options.dashArray.split(/[, ]+/), i = [], n, o;
      for (o = 0; o < e.length; o++) {
        if (n = Number(e[o]), isNaN(n))
          return;
        i.push(n);
      }
      t.options._dashArray = i;
    } else
      t.options._dashArray = t.options.dashArray;
  },
  _requestRedraw: function(t) {
    !this._map || (this._extendRedrawBounds(t), this._redrawRequest = this._redrawRequest || X(this._redraw, this));
  },
  _extendRedrawBounds: function(t) {
    if (t._pxBounds) {
      var e = (t.options.weight || 0) + 1;
      this._redrawBounds = this._redrawBounds || new k(), this._redrawBounds.extend(t._pxBounds.min.subtract([e, e])), this._redrawBounds.extend(t._pxBounds.max.add([e, e]));
    }
  },
  _redraw: function() {
    this._redrawRequest = null, this._redrawBounds && (this._redrawBounds.min._floor(), this._redrawBounds.max._ceil()), this._clear(), this._draw(), this._redrawBounds = null;
  },
  _clear: function() {
    var t = this._redrawBounds;
    if (t) {
      var e = t.getSize();
      this._ctx.clearRect(t.min.x, t.min.y, e.x, e.y);
    } else
      this._ctx.save(), this._ctx.setTransform(1, 0, 0, 1, 0, 0), this._ctx.clearRect(0, 0, this._container.width, this._container.height), this._ctx.restore();
  },
  _draw: function() {
    var t, e = this._redrawBounds;
    if (this._ctx.save(), e) {
      var i = e.getSize();
      this._ctx.beginPath(), this._ctx.rect(e.min.x, e.min.y, i.x, i.y), this._ctx.clip();
    }
    this._drawing = !0;
    for (var n = this._drawFirst; n; n = n.next)
      t = n.layer, (!e || t._pxBounds && t._pxBounds.intersects(e)) && t._updatePath();
    this._drawing = !1, this._ctx.restore();
  },
  _updatePoly: function(t, e) {
    if (!!this._drawing) {
      var i, n, o, s, r = t._parts, a = r.length, h = this._ctx;
      if (!!a) {
        for (h.beginPath(), i = 0; i < a; i++) {
          for (n = 0, o = r[i].length; n < o; n++)
            s = r[i][n], h[n ? "lineTo" : "moveTo"](s.x, s.y);
          e && h.closePath();
        }
        this._fillStroke(h, t);
      }
    }
  },
  _updateCircle: function(t) {
    if (!(!this._drawing || t._empty())) {
      var e = t._point, i = this._ctx, n = Math.max(Math.round(t._radius), 1), o = (Math.max(Math.round(t._radiusY), 1) || n) / n;
      o !== 1 && (i.save(), i.scale(1, o)), i.beginPath(), i.arc(e.x, e.y / o, n, 0, Math.PI * 2, !1), o !== 1 && i.restore(), this._fillStroke(i, t);
    }
  },
  _fillStroke: function(t, e) {
    var i = e.options;
    i.fill && (t.globalAlpha = i.fillOpacity, t.fillStyle = i.fillColor || i.color, t.fill(i.fillRule || "evenodd")), i.stroke && i.weight !== 0 && (t.setLineDash && t.setLineDash(e.options && e.options._dashArray || []), t.globalAlpha = i.opacity, t.lineWidth = i.weight, t.strokeStyle = i.color, t.lineCap = i.lineCap, t.lineJoin = i.lineJoin, t.stroke());
  },
  _onClick: function(t) {
    for (var e = this._map.mouseEventToLayerPoint(t), i, n, o = this._drawFirst; o; o = o.next)
      i = o.layer, i.options.interactive && i._containsPoint(e) && (!(t.type === "click" || t.type === "preclick") || !this._map._draggableMoved(i)) && (n = i);
    this._fireEvent(n ? [n] : !1, t);
  },
  _onMouseMove: function(t) {
    if (!(!this._map || this._map.dragging.moving() || this._map._animatingZoom)) {
      var e = this._map.mouseEventToLayerPoint(t);
      this._handleMouseHover(t, e);
    }
  },
  _handleMouseOut: function(t) {
    var e = this._hoveredLayer;
    e && (B(this._container, "leaflet-interactive"), this._fireEvent([e], t, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = !1);
  },
  _handleMouseHover: function(t, e) {
    if (!this._mouseHoverThrottled) {
      for (var i, n, o = this._drawFirst; o; o = o.next)
        i = o.layer, i.options.interactive && i._containsPoint(e) && (n = i);
      n !== this._hoveredLayer && (this._handleMouseOut(t), n && (g(this._container, "leaflet-interactive"), this._fireEvent([n], t, "mouseover"), this._hoveredLayer = n)), this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : !1, t), this._mouseHoverThrottled = !0, setTimeout(C(function() {
        this._mouseHoverThrottled = !1;
      }, this), 32);
    }
  },
  _fireEvent: function(t, e, i) {
    this._map._fireDOMEvent(e, i || e.type, t);
  },
  _bringToFront: function(t) {
    var e = t._order;
    if (!!e) {
      var i = e.next, n = e.prev;
      if (i)
        i.prev = n;
      else
        return;
      n ? n.next = i : i && (this._drawFirst = i), e.prev = this._drawLast, this._drawLast.next = e, e.next = null, this._drawLast = e, this._requestRedraw(t);
    }
  },
  _bringToBack: function(t) {
    var e = t._order;
    if (!!e) {
      var i = e.next, n = e.prev;
      if (n)
        n.next = i;
      else
        return;
      i ? i.prev = n : n && (this._drawLast = n), e.prev = null, e.next = this._drawFirst, this._drawFirst.prev = e, this._drawFirst = e, this._requestRedraw(t);
    }
  }
});
function Cs(t) {
  return d.canvas ? new Os(t) : null;
}
var le = function() {
  try {
    return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(t) {
      return document.createElement("<lvml:" + t + ' class="lvml">');
    };
  } catch {
  }
  return function(t) {
    return document.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
  };
}(), su = {
  _initContainer: function() {
    this._container = P("div", "leaflet-vml-container");
  },
  _update: function() {
    this._map._animatingZoom || (wt.prototype._update.call(this), this.fire("update"));
  },
  _initPath: function(t) {
    var e = t._container = le("shape");
    g(e, "leaflet-vml-shape " + (this.options.className || "")), e.coordsize = "1 1", t._path = le("path"), e.appendChild(t._path), this._updateStyle(t), this._layers[b(t)] = t;
  },
  _addPath: function(t) {
    var e = t._container;
    this._container.appendChild(e), t.options.interactive && t.addInteractiveTarget(e);
  },
  _removePath: function(t) {
    var e = t._container;
    N(e), t.removeInteractiveTarget(e), delete this._layers[b(t)];
  },
  _updateStyle: function(t) {
    var e = t._stroke, i = t._fill, n = t.options, o = t._container;
    o.stroked = !!n.stroke, o.filled = !!n.fill, n.stroke ? (e || (e = t._stroke = le("stroke")), o.appendChild(e), e.weight = n.weight + "px", e.color = n.color, e.opacity = n.opacity, n.dashArray ? e.dashStyle = ft(n.dashArray) ? n.dashArray.join(" ") : n.dashArray.replace(/( *, *)/g, " ") : e.dashStyle = "", e.endcap = n.lineCap.replace("butt", "flat"), e.joinstyle = n.lineJoin) : e && (o.removeChild(e), t._stroke = null), n.fill ? (i || (i = t._fill = le("fill")), o.appendChild(i), i.color = n.fillColor || n.color, i.opacity = n.fillOpacity) : i && (o.removeChild(i), t._fill = null);
  },
  _updateCircle: function(t) {
    var e = t._point.round(), i = Math.round(t._radius), n = Math.round(t._radiusY || i);
    this._setPath(t, t._empty() ? "M0 0" : "AL " + e.x + "," + e.y + " " + i + "," + n + " 0," + 65535 * 360);
  },
  _setPath: function(t, e) {
    t._path.v = e;
  },
  _bringToFront: function(t) {
    se(t._container);
  },
  _bringToBack: function(t) {
    re(t._container);
  }
}, Ve = d.vml ? le : Vo, Oe = wt.extend({
  _initContainer: function() {
    this._container = Ve("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = Ve("g"), this._container.appendChild(this._rootGroup);
  },
  _destroyContainer: function() {
    N(this._container), M(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
  },
  _update: function() {
    if (!(this._map._animatingZoom && this._bounds)) {
      wt.prototype._update.call(this);
      var t = this._bounds, e = t.getSize(), i = this._container;
      (!this._svgSize || !this._svgSize.equals(e)) && (this._svgSize = e, i.setAttribute("width", e.x), i.setAttribute("height", e.y)), F(i, t.min), i.setAttribute("viewBox", [t.min.x, t.min.y, e.x, e.y].join(" ")), this.fire("update");
    }
  },
  _initPath: function(t) {
    var e = t._path = Ve("path");
    t.options.className && g(e, t.options.className), t.options.interactive && g(e, "leaflet-interactive"), this._updateStyle(t), this._layers[b(t)] = t;
  },
  _addPath: function(t) {
    this._rootGroup || this._initContainer(), this._rootGroup.appendChild(t._path), t.addInteractiveTarget(t._path);
  },
  _removePath: function(t) {
    N(t._path), t.removeInteractiveTarget(t._path), delete this._layers[b(t)];
  },
  _updatePath: function(t) {
    t._project(), t._update();
  },
  _updateStyle: function(t) {
    var e = t._path, i = t.options;
    !e || (i.stroke ? (e.setAttribute("stroke", i.color), e.setAttribute("stroke-opacity", i.opacity), e.setAttribute("stroke-width", i.weight), e.setAttribute("stroke-linecap", i.lineCap), e.setAttribute("stroke-linejoin", i.lineJoin), i.dashArray ? e.setAttribute("stroke-dasharray", i.dashArray) : e.removeAttribute("stroke-dasharray"), i.dashOffset ? e.setAttribute("stroke-dashoffset", i.dashOffset) : e.removeAttribute("stroke-dashoffset")) : e.setAttribute("stroke", "none"), i.fill ? (e.setAttribute("fill", i.fillColor || i.color), e.setAttribute("fill-opacity", i.fillOpacity), e.setAttribute("fill-rule", i.fillRule || "evenodd")) : e.setAttribute("fill", "none"));
  },
  _updatePoly: function(t, e) {
    this._setPath(t, Wo(t._parts, e));
  },
  _updateCircle: function(t) {
    var e = t._point, i = Math.max(Math.round(t._radius), 1), n = Math.max(Math.round(t._radiusY), 1) || i, o = "a" + i + "," + n + " 0 1,0 ", s = t._empty() ? "M0 0" : "M" + (e.x - i) + "," + e.y + o + i * 2 + ",0 " + o + -i * 2 + ",0 ";
    this._setPath(t, s);
  },
  _setPath: function(t, e) {
    t._path.setAttribute("d", e);
  },
  _bringToFront: function(t) {
    se(t._path);
  },
  _bringToBack: function(t) {
    re(t._path);
  }
});
d.vml && Oe.include(su);
function zs(t) {
  return d.svg || d.vml ? new Oe(t) : null;
}
y.include({
  getRenderer: function(t) {
    var e = t.options.renderer || this._getPaneRenderer(t.options.pane) || this.options.renderer || this._renderer;
    return e || (e = this._renderer = this._createRenderer()), this.hasLayer(e) || this.addLayer(e), e;
  },
  _getPaneRenderer: function(t) {
    if (t === "overlayPane" || t === void 0)
      return !1;
    var e = this._paneRenderers[t];
    return e === void 0 && (e = this._createRenderer({ pane: t }), this._paneRenderers[t] = e), e;
  },
  _createRenderer: function(t) {
    return this.options.preferCanvas && Cs(t) || zs(t);
  }
});
var Is = ne.extend({
  initialize: function(t, e) {
    ne.prototype.initialize.call(this, this._boundsToLatLngs(t), e);
  },
  setBounds: function(t) {
    return this.setLatLngs(this._boundsToLatLngs(t));
  },
  _boundsToLatLngs: function(t) {
    return t = V(t), [
      t.getSouthWest(),
      t.getNorthWest(),
      t.getNorthEast(),
      t.getSouthEast()
    ];
  }
});
function ru(t, e) {
  return new Is(t, e);
}
Oe.create = Ve;
Oe.pointsToPath = Wo;
Lt.geometryToLayer = ti;
Lt.coordsToLatLng = Pn;
Lt.coordsToLatLngs = ei;
Lt.latLngToCoords = bn;
Lt.latLngsToCoords = ui;
Lt.getFeature = oe;
Lt.asFeature = li;
y.mergeOptions({
  boxZoom: !0
});
var Ns = yt.extend({
  initialize: function(t) {
    this._map = t, this._container = t._container, this._pane = t._panes.overlayPane, this._resetStateTimeout = 0, t.on("unload", this._destroy, this);
  },
  addHooks: function() {
    p(this._container, "mousedown", this._onMouseDown, this);
  },
  removeHooks: function() {
    M(this._container, "mousedown", this._onMouseDown, this);
  },
  moved: function() {
    return this._moved;
  },
  _destroy: function() {
    N(this._pane), delete this._pane;
  },
  _resetState: function() {
    this._resetStateTimeout = 0, this._moved = !1;
  },
  _clearDeferredResetState: function() {
    this._resetStateTimeout !== 0 && (clearTimeout(this._resetStateTimeout), this._resetStateTimeout = 0);
  },
  _onMouseDown: function(t) {
    if (!t.shiftKey || t.which !== 1 && t.button !== 1)
      return !1;
    this._clearDeferredResetState(), this._resetState(), xe(), fn(), this._startPoint = this._map.mouseEventToContainerPoint(t), p(document, {
      contextmenu: qt,
      mousemove: this._onMouseMove,
      mouseup: this._onMouseUp,
      keydown: this._onKeyDown
    }, this);
  },
  _onMouseMove: function(t) {
    this._moved || (this._moved = !0, this._box = P("div", "leaflet-zoom-box", this._container), g(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(t);
    var e = new k(this._point, this._startPoint), i = e.getSize();
    F(this._box, e.min), this._box.style.width = i.x + "px", this._box.style.height = i.y + "px";
  },
  _finish: function() {
    this._moved && (N(this._box), B(this._container, "leaflet-crosshair")), Pe(), dn(), M(document, {
      contextmenu: qt,
      mousemove: this._onMouseMove,
      mouseup: this._onMouseUp,
      keydown: this._onKeyDown
    }, this);
  },
  _onMouseUp: function(t) {
    if (!(t.which !== 1 && t.button !== 1) && (this._finish(), !!this._moved)) {
      this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(C(this._resetState, this), 0);
      var e = new Q(
        this._map.containerPointToLatLng(this._startPoint),
        this._map.containerPointToLatLng(this._point)
      );
      this._map.fitBounds(e).fire("boxzoomend", { boxZoomBounds: e });
    }
  },
  _onKeyDown: function(t) {
    t.keyCode === 27 && (this._finish(), this._clearDeferredResetState(), this._resetState());
  }
});
y.addInitHook("addHandler", "boxZoom", Ns);
y.mergeOptions({
  doubleClickZoom: !0
});
var ks = yt.extend({
  addHooks: function() {
    this._map.on("dblclick", this._onDoubleClick, this);
  },
  removeHooks: function() {
    this._map.off("dblclick", this._onDoubleClick, this);
  },
  _onDoubleClick: function(t) {
    var e = this._map, i = e.getZoom(), n = e.options.zoomDelta, o = t.originalEvent.shiftKey ? i - n : i + n;
    e.options.doubleClickZoom === "center" ? e.setZoom(o) : e.setZoomAround(t.containerPoint, o);
  }
});
y.addInitHook("addHandler", "doubleClickZoom", ks);
y.mergeOptions({
  dragging: !0,
  inertia: !0,
  inertiaDeceleration: 3400,
  inertiaMaxSpeed: 1 / 0,
  easeLinearity: 0.2,
  worldCopyJump: !1,
  maxBoundsViscosity: 0
});
var As = yt.extend({
  addHooks: function() {
    if (!this._draggable) {
      var t = this._map;
      this._draggable = new Mt(t._mapPane, t._container), this._draggable.on({
        dragstart: this._onDragStart,
        drag: this._onDrag,
        dragend: this._onDragEnd
      }, this), this._draggable.on("predrag", this._onPreDragLimit, this), t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), t.on("zoomend", this._onZoomEnd, this), t.whenReady(this._onZoomEnd, this));
    }
    g(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
  },
  removeHooks: function() {
    B(this._map._container, "leaflet-grab"), B(this._map._container, "leaflet-touch-drag"), this._draggable.disable();
  },
  moved: function() {
    return this._draggable && this._draggable._moved;
  },
  moving: function() {
    return this._draggable && this._draggable._moving;
  },
  _onDragStart: function() {
    var t = this._map;
    if (t._stop(), this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
      var e = V(this._map.options.maxBounds);
      this._offsetLimit = J(
        this._map.latLngToContainerPoint(e.getNorthWest()).multiplyBy(-1),
        this._map.latLngToContainerPoint(e.getSouthEast()).multiplyBy(-1).add(this._map.getSize())
      ), this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity));
    } else
      this._offsetLimit = null;
    t.fire("movestart").fire("dragstart"), t.options.inertia && (this._positions = [], this._times = []);
  },
  _onDrag: function(t) {
    if (this._map.options.inertia) {
      var e = this._lastTime = +new Date(), i = this._lastPos = this._draggable._absPos || this._draggable._newPos;
      this._positions.push(i), this._times.push(e), this._prunePositions(e);
    }
    this._map.fire("move", t).fire("drag", t);
  },
  _prunePositions: function(t) {
    for (; this._positions.length > 1 && t - this._times[0] > 50; )
      this._positions.shift(), this._times.shift();
  },
  _onZoomEnd: function() {
    var t = this._map.getSize().divideBy(2), e = this._map.latLngToLayerPoint([0, 0]);
    this._initialWorldOffset = e.subtract(t).x, this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
  },
  _viscousLimit: function(t, e) {
    return t - (t - e) * this._viscosity;
  },
  _onPreDragLimit: function() {
    if (!(!this._viscosity || !this._offsetLimit)) {
      var t = this._draggable._newPos.subtract(this._draggable._startPos), e = this._offsetLimit;
      t.x < e.min.x && (t.x = this._viscousLimit(t.x, e.min.x)), t.y < e.min.y && (t.y = this._viscousLimit(t.y, e.min.y)), t.x > e.max.x && (t.x = this._viscousLimit(t.x, e.max.x)), t.y > e.max.y && (t.y = this._viscousLimit(t.y, e.max.y)), this._draggable._newPos = this._draggable._startPos.add(t);
    }
  },
  _onPreDragWrap: function() {
    var t = this._worldWidth, e = Math.round(t / 2), i = this._initialWorldOffset, n = this._draggable._newPos.x, o = (n - e + i) % t + e - i, s = (n + e + i) % t - e - i, r = Math.abs(o + i) < Math.abs(s + i) ? o : s;
    this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = r;
  },
  _onDragEnd: function(t) {
    var e = this._map, i = e.options, n = !i.inertia || t.noInertia || this._times.length < 2;
    if (e.fire("dragend", t), n)
      e.fire("moveend");
    else {
      this._prunePositions(+new Date());
      var o = this._lastPos.subtract(this._positions[0]), s = (this._lastTime - this._times[0]) / 1e3, r = i.easeLinearity, a = o.multiplyBy(r / s), h = a.distanceTo([0, 0]), u = Math.min(i.inertiaMaxSpeed, h), c = a.multiplyBy(u / h), l = u / (i.inertiaDeceleration * r), f = c.multiplyBy(-l / 2).round();
      !f.x && !f.y ? e.fire("moveend") : (f = e._limitOffset(f, e.options.maxBounds), X(function() {
        e.panBy(f, {
          duration: l,
          easeLinearity: r,
          noMoveStart: !0,
          animate: !0
        });
      }));
    }
  }
});
y.addInitHook("addHandler", "dragging", As);
y.mergeOptions({
  keyboard: !0,
  keyboardPanDelta: 80
});
var Zs = yt.extend({
  keyCodes: {
    left: [37],
    right: [39],
    down: [40],
    up: [38],
    zoomIn: [187, 107, 61, 171],
    zoomOut: [189, 109, 54, 173]
  },
  initialize: function(t) {
    this._map = t, this._setPanDelta(t.options.keyboardPanDelta), this._setZoomDelta(t.options.zoomDelta);
  },
  addHooks: function() {
    var t = this._map._container;
    t.tabIndex <= 0 && (t.tabIndex = "0"), p(t, {
      focus: this._onFocus,
      blur: this._onBlur,
      mousedown: this._onMouseDown
    }, this), this._map.on({
      focus: this._addHooks,
      blur: this._removeHooks
    }, this);
  },
  removeHooks: function() {
    this._removeHooks(), M(this._map._container, {
      focus: this._onFocus,
      blur: this._onBlur,
      mousedown: this._onMouseDown
    }, this), this._map.off({
      focus: this._addHooks,
      blur: this._removeHooks
    }, this);
  },
  _onMouseDown: function() {
    if (!this._focused) {
      var t = document.body, e = document.documentElement, i = t.scrollTop || e.scrollTop, n = t.scrollLeft || e.scrollLeft;
      this._map._container.focus(), window.scrollTo(n, i);
    }
  },
  _onFocus: function() {
    this._focused = !0, this._map.fire("focus");
  },
  _onBlur: function() {
    this._focused = !1, this._map.fire("blur");
  },
  _setPanDelta: function(t) {
    var e = this._panKeys = {}, i = this.keyCodes, n, o;
    for (n = 0, o = i.left.length; n < o; n++)
      e[i.left[n]] = [-1 * t, 0];
    for (n = 0, o = i.right.length; n < o; n++)
      e[i.right[n]] = [t, 0];
    for (n = 0, o = i.down.length; n < o; n++)
      e[i.down[n]] = [0, t];
    for (n = 0, o = i.up.length; n < o; n++)
      e[i.up[n]] = [0, -1 * t];
  },
  _setZoomDelta: function(t) {
    var e = this._zoomKeys = {}, i = this.keyCodes, n, o;
    for (n = 0, o = i.zoomIn.length; n < o; n++)
      e[i.zoomIn[n]] = t;
    for (n = 0, o = i.zoomOut.length; n < o; n++)
      e[i.zoomOut[n]] = -t;
  },
  _addHooks: function() {
    p(document, "keydown", this._onKeyDown, this);
  },
  _removeHooks: function() {
    M(document, "keydown", this._onKeyDown, this);
  },
  _onKeyDown: function(t) {
    if (!(t.altKey || t.ctrlKey || t.metaKey)) {
      var e = t.keyCode, i = this._map, n;
      if (e in this._panKeys)
        (!i._panAnim || !i._panAnim._inProgress) && (n = this._panKeys[e], t.shiftKey && (n = _(n).multiplyBy(3)), i.panBy(n), i.options.maxBounds && i.panInsideBounds(i.options.maxBounds));
      else if (e in this._zoomKeys)
        i.setZoom(i.getZoom() + (t.shiftKey ? 3 : 1) * this._zoomKeys[e]);
      else if (e === 27 && i._popup && i._popup.options.closeOnEscapeKey)
        i.closePopup();
      else
        return;
      qt(t);
    }
  }
});
y.addInitHook("addHandler", "keyboard", Zs);
y.mergeOptions({
  scrollWheelZoom: !0,
  wheelDebounceTime: 40,
  wheelPxPerZoomLevel: 60
});
var Bs = yt.extend({
  addHooks: function() {
    p(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
  },
  removeHooks: function() {
    M(this._map._container, "wheel", this._onWheelScroll, this);
  },
  _onWheelScroll: function(t) {
    var e = cs(t), i = this._map.options.wheelDebounceTime;
    this._delta += e, this._lastMousePos = this._map.mouseEventToContainerPoint(t), this._startTime || (this._startTime = +new Date());
    var n = Math.max(i - (+new Date() - this._startTime), 0);
    clearTimeout(this._timer), this._timer = setTimeout(C(this._performZoom, this), n), qt(t);
  },
  _performZoom: function() {
    var t = this._map, e = t.getZoom(), i = this._map.options.zoomSnap || 0;
    t._stop();
    var n = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), o = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(n)))) / Math.LN2, s = i ? Math.ceil(o / i) * i : o, r = t._limitZoom(e + (this._delta > 0 ? s : -s)) - e;
    this._delta = 0, this._startTime = null, r && (t.options.scrollWheelZoom === "center" ? t.setZoom(e + r) : t.setZoomAround(this._lastMousePos, e + r));
  }
});
y.addInitHook("addHandler", "scrollWheelZoom", Bs);
var au = 600;
y.mergeOptions({
  tapHold: d.touchNative && d.safari && d.mobile,
  tapTolerance: 15
});
var Rs = yt.extend({
  addHooks: function() {
    p(this._map._container, "touchstart", this._onDown, this);
  },
  removeHooks: function() {
    M(this._map._container, "touchstart", this._onDown, this);
  },
  _onDown: function(t) {
    if (clearTimeout(this._holdTimeout), t.touches.length === 1) {
      var e = t.touches[0];
      this._startPos = this._newPos = new m(e.clientX, e.clientY), this._holdTimeout = setTimeout(C(function() {
        this._cancel(), this._isTapValid() && (p(document, "touchend", j), p(document, "touchend touchcancel", this._cancelClickPrevent), this._simulateEvent("contextmenu", e));
      }, this), au), p(document, "touchend touchcancel contextmenu", this._cancel, this), p(document, "touchmove", this._onMove, this);
    }
  },
  _cancelClickPrevent: function t() {
    M(document, "touchend", j), M(document, "touchend touchcancel", t);
  },
  _cancel: function() {
    clearTimeout(this._holdTimeout), M(document, "touchend touchcancel contextmenu", this._cancel, this), M(document, "touchmove", this._onMove, this);
  },
  _onMove: function(t) {
    var e = t.touches[0];
    this._newPos = new m(e.clientX, e.clientY);
  },
  _isTapValid: function() {
    return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
  },
  _simulateEvent: function(t, e) {
    var i = new MouseEvent(t, {
      bubbles: !0,
      cancelable: !0,
      view: window,
      screenX: e.screenX,
      screenY: e.screenY,
      clientX: e.clientX,
      clientY: e.clientY
    });
    i._simulated = !0, e.target.dispatchEvent(i);
  }
});
y.addInitHook("addHandler", "tapHold", Rs);
y.mergeOptions({
  touchZoom: d.touch,
  bounceAtZoomLimits: !0
});
var Ds = yt.extend({
  addHooks: function() {
    g(this._map._container, "leaflet-touch-zoom"), p(this._map._container, "touchstart", this._onTouchStart, this);
  },
  removeHooks: function() {
    B(this._map._container, "leaflet-touch-zoom"), M(this._map._container, "touchstart", this._onTouchStart, this);
  },
  _onTouchStart: function(t) {
    var e = this._map;
    if (!(!t.touches || t.touches.length !== 2 || e._animatingZoom || this._zooming)) {
      var i = e.mouseEventToContainerPoint(t.touches[0]), n = e.mouseEventToContainerPoint(t.touches[1]);
      this._centerPoint = e.getSize()._divideBy(2), this._startLatLng = e.containerPointToLatLng(this._centerPoint), e.options.touchZoom !== "center" && (this._pinchStartLatLng = e.containerPointToLatLng(i.add(n)._divideBy(2))), this._startDist = i.distanceTo(n), this._startZoom = e.getZoom(), this._moved = !1, this._zooming = !0, e._stop(), p(document, "touchmove", this._onTouchMove, this), p(document, "touchend touchcancel", this._onTouchEnd, this), j(t);
    }
  },
  _onTouchMove: function(t) {
    if (!(!t.touches || t.touches.length !== 2 || !this._zooming)) {
      var e = this._map, i = e.mouseEventToContainerPoint(t.touches[0]), n = e.mouseEventToContainerPoint(t.touches[1]), o = i.distanceTo(n) / this._startDist;
      if (this._zoom = e.getScaleZoom(o, this._startZoom), !e.options.bounceAtZoomLimits && (this._zoom < e.getMinZoom() && o < 1 || this._zoom > e.getMaxZoom() && o > 1) && (this._zoom = e._limitZoom(this._zoom)), e.options.touchZoom === "center") {
        if (this._center = this._startLatLng, o === 1)
          return;
      } else {
        var s = i._add(n)._divideBy(2)._subtract(this._centerPoint);
        if (o === 1 && s.x === 0 && s.y === 0)
          return;
        this._center = e.unproject(e.project(this._pinchStartLatLng, this._zoom).subtract(s), this._zoom);
      }
      this._moved || (e._moveStart(!0, !1), this._moved = !0), ot(this._animRequest);
      var r = C(e._move, e, this._center, this._zoom, { pinch: !0, round: !1 }, void 0);
      this._animRequest = X(r, this, !0), j(t);
    }
  },
  _onTouchEnd: function() {
    if (!this._moved || !this._zooming) {
      this._zooming = !1;
      return;
    }
    this._zooming = !1, ot(this._animRequest), M(document, "touchmove", this._onTouchMove, this), M(document, "touchend touchcancel", this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom));
  }
});
y.addInitHook("addHandler", "touchZoom", Ds);
y.BoxZoom = Ns;
y.DoubleClickZoom = ks;
y.Drag = As;
y.Keyboard = Zs;
y.ScrollWheelZoom = Bs;
y.TapHold = Rs;
y.TouchZoom = Ds;
var hu = {
  __proto__: null,
  version: Wa,
  Control: ct,
  control: Se,
  Class: Pt,
  Handler: yt,
  extend: T,
  bind: C,
  stamp: b,
  setOptions: z,
  Browser: d,
  Evented: be,
  Mixin: Ih,
  Util: ja,
  PosAnimation: fs,
  Draggable: Mt,
  DomEvent: Th,
  DomUtil: bh,
  Point: m,
  point: _,
  Bounds: k,
  bounds: J,
  Transformation: en,
  transformation: Le,
  LineUtil: Bh,
  PolyUtil: Rh,
  LatLng: E,
  latLng: S,
  LatLngBounds: Q,
  latLngBounds: V,
  CRS: bt,
  Projection: Dh,
  Layer: dt,
  LayerGroup: Qt,
  layerGroup: Vh,
  FeatureGroup: jt,
  featureGroup: Wh,
  ImageOverlay: ci,
  imageOverlay: Jh,
  VideoOverlay: Ls,
  videoOverlay: Xh,
  SVGOverlay: Ts,
  svgOverlay: Qh,
  DivOverlay: gt,
  Popup: fi,
  popup: tu,
  Tooltip: di,
  tooltip: eu,
  icon: Uh,
  DivIcon: Es,
  divIcon: iu,
  Marker: ai,
  marker: jh,
  Icon: ie,
  GridLayer: _e,
  gridLayer: nu,
  TileLayer: te,
  tileLayer: Ss,
  Renderer: wt,
  Canvas: Os,
  canvas: Cs,
  Path: At,
  CircleMarker: hi,
  circleMarker: Gh,
  Circle: xn,
  circle: $h,
  Polyline: xt,
  polyline: qh,
  Polygon: ne,
  polygon: Kh,
  Rectangle: Is,
  rectangle: ru,
  SVG: Oe,
  svg: zs,
  GeoJSON: Lt,
  geoJSON: bs,
  geoJson: Yh,
  Map: y,
  map: Eh
}, U = T(hu, { noConflict: lu }), Tn = cu(), uu = Tn.L;
Tn.L = U;
function lu() {
  return Tn.L = uu, U;
}
function cu() {
  if (typeof globalThis < "u")
    return globalThis;
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("Unable to locate global object.");
}
L.Proj && (L.CRS.Baidu = new L.Proj.CRS("EPSG:900913", "+proj=merc +a=6378206 +b=6356584.314245179 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs", {
  resolutions: function() {
    var t = 19, e = [];
    e[0] = Math.pow(2, 18);
    for (var i = 1; i < t; i++)
      e[i] = Math.pow(2, 18 - i);
    return e;
  }(),
  origin: [0, 0],
  bounds: L.bounds([20037508342789244e-9, 0], [0, 20037508342789244e-9])
}));
L.TileLayer.ChinaProvider = L.TileLayer.extend({
  initialize: function(t, e) {
    var i = L.TileLayer.ChinaProvider.providers;
    e = e || {};
    var n = t.split("."), o = n[0], s = n[1], r = n[2], a = i[o][s][r];
    e.subdomains = i[o].Subdomains, e.key = e.key || i[o].key, "tms" in i[o] && (e.tms = i[o].tms), L.TileLayer.prototype.initialize.call(this, a, e);
  },
  getTileUrl: function(t) {
    var e = {
      s: this._getSubdomain(t),
      x: t.x,
      y: t.y,
      z: this._getZoomForUrl()
    };
    if (this._map && !this._map.options.crs.infinite) {
      var i = this._globalTileRange.max.y - t.y;
      this.options.tms && (e.y = i), e["-y"] = i;
    }
    return e.sx = e.x >> 4, e.sy = (1 << e.z) - e.y >> 4, L.Util.template(this._url, L.Util.extend(e, this.options));
  }
});
L.TileLayer.ChinaProvider.providers = {
  TianDiTu: {
    Normal: {
      Map: "//t{s}.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk={key}",
      Annotion: "//t{s}.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk={key}"
    },
    Satellite: {
      Map: "//t{s}.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk={key}",
      Annotion: "//t{s}.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk={key}"
    },
    Terrain: {
      Map: "//t{s}.tianditu.gov.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}&tk={key}",
      Annotion: "//t{s}.tianditu.gov.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}&tk={key}"
    },
    Subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
    key: "174705aebfe31b79b3587279e211cb9a"
  },
  GaoDe: {
    Normal: {
      Map: "//webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
    },
    Satellite: {
      Map: "//webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
      Annotion: "//webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}"
    },
    Subdomains: ["1", "2", "3", "4"]
  },
  Google: {
    Normal: {
      Map: "//www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
    },
    Satellite: {
      Map: "//www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",
      Annotion: "//www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}"
    },
    Subdomains: []
  },
  Geoq: {
    Normal: {
      Map: "//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
      PurplishBlue: "//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
      Gray: "//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}",
      Warm: "//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}"
    },
    Theme: {
      Hydro: "//thematic.geoq.cn/arcgis/rest/services/ThematicMaps/WorldHydroMap/MapServer/tile/{z}/{y}/{x}"
    },
    Subdomains: []
  },
  OSM: {
    Normal: {
      Map: "//{s}.tile.osm.org/{z}/{x}/{y}.png"
    },
    Subdomains: ["a", "b", "c"]
  },
  Baidu: {
    Normal: {
      Map: "//online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1"
    },
    Satellite: {
      Map: "//shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46",
      Annotion: "//online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=sl&v=020"
    },
    Subdomains: "0123456789",
    tms: !0
  },
  Tencent: {
    Normal: {
      Map: "//rt{s}.map.gtimg.com/tile?z={z}&x={x}&y={-y}&type=vector&styleid=3"
    },
    Satellite: {
      Map: "//p{s}.map.gtimg.com/sateTiles/{z}/{sx}/{sy}/{x}_{-y}.jpg"
    },
    Terrain: {
      Map: "//p{s}.map.gtimg.com/demTiles/{z}/{sx}/{sy}/{x}_{-y}.jpg"
    },
    Subdomains: "0123"
  }
};
L.tileLayer.chinaProvider = function(t, e) {
  return new L.TileLayer.ChinaProvider(t, e);
};
U.TileLayer.BetterWMS = U.TileLayer.WMS.extend({
  onAdd: function(t) {
    U.TileLayer.WMS.prototype.onAdd.call(this, t), t.on("click", this.getFeatureInfo, this);
  },
  onRemove: function(t) {
    U.TileLayer.WMS.prototype.onRemove.call(this, t), t.off("click", this.getFeatureInfo, this);
  },
  getFeatureInfo: function(t) {
    const e = this.getFeatureInfoUrl(t.latlng), i = U.Util.bind(this.showGetFeatureInfo, this);
    fetch(e).then((n) => n.json()).then((n) => {
      i(typeof n == "object" ? null : n, t.latlng, JSON.stringify(n));
    });
  },
  getFeatureInfoUrl: function(t) {
    const e = this._map.latLngToContainerPoint(t, this._map.getZoom()), i = this._map.getSize(), n = {
      request: "GetFeatureInfo",
      service: "WMS",
      srs: "EPSG:4326",
      styles: this.wmsParams.styles,
      transparent: this.wmsParams.transparent,
      version: this.wmsParams.version,
      format: this.wmsParams.format,
      bbox: this._map.getBounds().toBBoxString(),
      height: i.y,
      width: i.x,
      layers: this.wmsParams.layers,
      query_layers: this.wmsParams.layers,
      info_format: "application/json"
    };
    return n[n.version === "1.3.0" ? "i" : "x"] = e.x, n[n.version === "1.3.0" ? "j" : "y"] = e.y, console.log(U.Util.getParamString(n, this._url, !0)), this._url + U.Util.getParamString(n, this._url, !0);
  },
  showGetFeatureInfo: function(t, e, i) {
    if (t) {
      console.log(t);
      return;
    }
    U.popup({ maxWidth: 800 }).setLatLng(e).setContent(i).openOn(this._map);
  }
});
U.tileLayer.betterWms = function(t, e) {
  return new U.TileLayer.BetterWMS(t, e);
};
const fu = `Basic ${btoa("admin:geoserver")}`;
async function du(t, e) {
  const n = await (await fetch(
    `/geoserver/rest/workspaces/${t}/datastores/${t}${e}/featuretypes/${e}.json`,
    {
      headers: {
        Authorization: fu
      }
    }
  )).json(), { minx: o, miny: s, maxx: r, maxy: a } = n.featureType.nativeBoundingBox;
  return [
    [s, o],
    [a, r]
  ];
}
async function _u(t, e) {
  return (await Promise.all(e.map((n) => du(t, n)))).map((n, o) => ({ bounds: n, layers: `${t}:${e[o]}` }));
}
const pu = /* @__PURE__ */ fa({
  __name: "njhh-wms-map",
  emits: ["featureClick"],
  setup(t, { emit: e }) {
    const i = Dr();
    return pa(() => {
      const n = U.map(i.value, {
        center: [34.15754, 117.20851],
        zoom: 15,
        zoomControl: !1
      });
      U.tileLayer.chinaProvider("TianDiTu.Normal.Map", {
        key: "f2ae54b1dcb16d4a9f478401edf0054e",
        maxZoom: 18,
        minZoom: 5
      }).addTo(n), U.tileLayer.chinaProvider("TianDiTu.Normal.Annotion", {
        key: "f2ae54b1dcb16d4a9f478401edf0054e",
        maxZoom: 18,
        minZoom: 5
      }).addTo(n);
      const o = "tongshan", s = ["guandao", "bengzhan"], r = `/geoserver/${o}/wms`, a = !0, h = "image/png";
      let u = [];
      _u(o, s).then((c) => {
        u = c.map(
          (l) => U.tileLayer.wms(r, {
            ...l,
            transparent: a,
            format: h
          }).addTo(n)
        );
      }), n.on("click", (c) => {
        const l = n.latLngToContainerPoint(c.latlng), f = n.getSize(), w = u.map((x) => {
          const O = x._url, W = {
            request: "GetFeatureInfo",
            service: "WMS",
            srs: "EPSG:4326",
            styles: x.wmsParams.styles,
            transparent: a,
            version: x.wmsParams.version,
            format: h,
            bbox: n.getBounds().toBBoxString(),
            height: f.y,
            width: f.x,
            layers: x.wmsParams.layers,
            query_layers: x.wmsParams.layers,
            info_format: "application/json",
            x: l.x,
            y: l.y
          };
          return fetch(O + U.Util.getParamString(W, O, !0)).then((H) => H.json());
        });
        Promise.all(w).then((x) => {
          let O = [];
          x.forEach((W) => {
            O = [...O, ...W.features];
          }), e("featureClick", O);
        });
      });
    }), (n, o) => (Lo(), To("div", {
      ref_key: "mapElement",
      ref: i,
      style: { width: "100%", height: "100%" }
    }, null, 512));
  }
}), gu = /* @__PURE__ */ Ao(pu, [["__file", "/Users/wangchen/WebstormProjects/njhh-ui/lib/njhh-wms-map.vue"]]);
export {
  mu as DemoUi,
  gu as NjhhWmsMap
};

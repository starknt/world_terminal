var bigInt = (function () {
  function t(t, e) { this.value = t, this.sign = e, this.isSmall = !1 } function e(t) { this.value = t, this.sign = t < 0, this.isSmall = !0 } function r(t) { return t > -T && T > t } function n(t) { return t < 1e7 ? [t] : t < 1e14 ? [t % 1e7, Math.floor(t / 1e7)] : [t % 1e7, Math.floor(t / 1e7) % 1e7, Math.floor(t / 1e14)] } function o(t) {
    i(t); const e = t.length; if (e < 4 && S(t, _) < 0)
      switch (e) { case 0:return 0; case 1:return t[0]; case 2:return t[0] + t[1] * U; default:return t[0] + (t[1] + t[2] * U) * U } return t
  } function i(t) { for (var e = t.length; t[--e] === 0;);t.length = e + 1 } function u(t) { for (var e = new Array(t), r = -1; ++r < t;)e[r] = 0; return e } function s(t) { return t > 0 ? Math.floor(t) : Math.ceil(t) } function a(t, e) { let r; let n; const o = t.length; const i = e.length; const u = new Array(o); let s = 0; const a = U; for (n = 0; i > n; n++)r = t[n] + e[n] + s, s = r >= a ? 1 : 0, u[n] = r - s * a; for (;o > n;)r = t[n] + s, s = r === a ? 1 : 0, u[n++] = r - s * a; return s > 0 && u.push(s), u } function p(t, e) { return t.length >= e.length ? a(t, e) : a(e, t) } function l(t, e) { let r; let n; const o = t.length; const i = new Array(o); const u = U; for (n = 0; o > n; n++)r = t[n] - u + e, e = Math.floor(r / u), i[n] = r - e * u, e += 1; for (;e > 0;)i[n++] = e % u, e = Math.floor(e / u); return i } function f(t, e) { let r; let n; const o = t.length; const u = e.length; const s = new Array(o); let a = 0; const p = U; for (r = 0; u > r; r++)n = t[r] - a - e[r], n < 0 ? (n += p, a = 1) : a = 0, s[r] = n; for (r = u; o > r; r++) { if (n = t[r] - a, !(n < 0)) { s[r++] = n; break }n += p, s[r] = n } for (;o > r; r++)s[r] = t[r]; return i(s), s } function h(r, n, i) { let u; return S(r, n) >= 0 ? u = f(r, n) : (u = f(n, r), i = !i), u = o(u), typeof u == 'number' ? (i && (u = -u), new e(u)) : new t(u, i) } function v(r, n, i) { let u; let s; const a = r.length; let p = new Array(a); let l = -n; const f = U; for (u = 0; a > u; u++)s = r[u] + l, l = Math.floor(s / f), s %= f, p[u] = s < 0 ? s + f : s; return p = o(p), typeof p == 'number' ? (i && (p = -p), new e(p)) : new t(p, i) } function y(t, e) { let r; let n; let o; let s; let a; const p = t.length; const l = e.length; const f = p + l; const h = u(f); const v = U; for (o = 0; p > o; ++o) { s = t[o]; for (let y = 0; l > y; ++y)a = e[y], r = s * a + h[o + y], n = Math.floor(r / v), h[o + y] = r - n * v, h[o + y + 1] += n } return i(h), h } function g(t, e) { let r; let n; const o = t.length; const i = new Array(o); const u = U; let s = 0; for (n = 0; o > n; n++)r = t[n] * e + s, s = Math.floor(r / u), i[n] = r - s * u; for (;s > 0;)i[n++] = s % u, s = Math.floor(s / u); return i } function c(t, e) { for (var r = []; e-- > 0;)r.push(0); return r.concat(t) } function m(t, e) {
    let r = Math.max(t.length, e.length); if (r <= 400)
      return y(t, e); r = Math.ceil(r / 2); const n = t.slice(r); const o = t.slice(0, r); const i = e.slice(r); const u = e.slice(0, r); const s = m(o, u); const a = m(n, i); const l = m(p(o, n), p(u, i)); return p(p(s, c(f(f(l, s), a), r)), c(a, 2 * r))
  } function d(e, r, o) { return U > e ? new t(g(r, e), o) : new t(y(r, n(e)), o) } function w(t) { let e; let r; let n; let o; let s; const a = t.length; const p = u(a + a); const l = U; for (n = 0; a > n; n++) { o = t[n]; for (let f = 0; a > f; f++)s = t[f], e = o * s + p[n + f], r = Math.floor(e / l), p[n + f] = e - r * l, p[n + f + 1] += r } return i(p), p } function b(t, e) { let r; let n; let i; let s; let a; let p; let l; const f = t.length; const h = e.length; const v = U; const y = u(e.length); let c = e[h - 1]; const m = Math.ceil(v / (2 * c)); let d = g(t, m); const w = g(e, m); for (d.length <= f && d.push(0), w.push(0), c = w[h - 1], n = f - h; n >= 0; n--) { for (r = v - 1, d[n + h] !== c && (r = Math.floor((d[n + h] * v + d[n + h - 1]) / c)), i = 0, s = 0, p = w.length, a = 0; p > a; a++)i += r * w[a], l = Math.floor(i / v), s += d[n + a] - (i - l * v), i = l, s < 0 ? (d[n + a] = s + v, s = -1) : (d[n + a] = s, s = 0); for (;s !== 0;) { for (r -= 1, i = 0, a = 0; p > a; a++)i += d[n + a] - v + w[a], i < 0 ? (d[n + a] = i + v, i = 0) : (d[n + a] = i, i = 1); s += i }y[n] = r } return d = q(d, m)[0], [o(y), o(d)] } function M(t, e) {
    for (var r, n, i, u, s, a = t.length, p = e.length, l = [], h = [], v = U; a;) {
      if (h.unshift(t[--a]), S(h, e) < 0) { l.push(0) }
      else {
        n = h.length, i = h[n - 1] * v + h[n - 2], u = e[p - 1] * v + e[p - 2], n > p && (i = (i + 1) * v), r = Math.ceil(i / u); do {
          if (s = g(e, r), S(s, h) <= 0)
            break; r--
        } while (r); l.push(r), h = f(h, s)
      }
    } return l.reverse(), [o(l), o(h)]
  } function q(t, e) { let r; let n; let o; let i; const a = t.length; const p = u(a); const l = U; for (o = 0, r = a - 1; r >= 0; --r)i = o * l + t[r], n = s(i / e), o = i - n * e, p[r] = 0 | n; return [p, 0 | o] } function E(r, i) {
    let u; let a; const p = R(i); const l = r.value; let f = p.value; if (f === 0)
      throw new Error('Cannot divide by zero'); if (r.isSmall)
      return p.isSmall ? [new e(s(l / f)), new e(l % f)] : [V[0], r]; if (p.isSmall) {
      if (f === 1)
        return [r, V[0]]; if (f == -1)
        return [r.negate(), V[0]]; const h = Math.abs(f); if (U > h) { u = q(l, h), a = o(u[0]); let v = u[1]; return r.sign && (v = -v), typeof a == 'number' ? (r.sign !== p.sign && (a = -a), [new e(a), new e(v)]) : [new t(a, r.sign !== p.sign), new e(v)] }f = n(h)
    } const y = S(l, f); if (y === -1)
      return [V[0], r]; if (y === 0)
      return [V[r.sign === p.sign ? 1 : -1], V[0]]; u = l.length + f.length <= 200 ? b(l, f) : M(l, f), a = u[0]; const g = r.sign !== p.sign; let c = u[1]; const m = r.sign; return typeof a == 'number' ? (g && (a = -a), a = new e(a)) : a = new t(a, g), typeof c == 'number' ? (m && (c = -c), c = new e(c)) : c = new t(c, m), [a, c]
  } function S(t, e) {
    if (t.length !== e.length)
      return t.length > e.length ? 1 : -1; for (let r = t.length - 1; r >= 0; r--) {
      if (t[r] !== e[r])
        return t[r] > e[r] ? 1 : -1
    } return 0
  } function P(t) { const e = t.abs(); return e.isUnit() ? !1 : e.equals(2) || e.equals(3) || e.equals(5) ? !0 : e.isEven() || e.isDivisibleBy(3) || e.isDivisibleBy(5) ? !1 : e.lesser(25) ? !0 : void 0 } function I(e) { return (typeof e == 'number' || typeof e == 'string') && +Math.abs(e) <= U || e instanceof t && e.value.length <= 1 } function A(t, e, r) { e = R(e); for (var n = t.isNegative(), o = e.isNegative(), i = n ? t.not() : t, u = o ? e.not() : e, s = [], a = [], p = !1, l = !1; !p || !l;)i.isZero() ? (p = !0, s.push(n ? 1 : 0)) : s.push(n ? i.isEven() ? 1 : 0 : i.isEven() ? 0 : 1), u.isZero() ? (l = !0, a.push(o ? 1 : 0)) : a.push(o ? u.isEven() ? 1 : 0 : u.isEven() ? 0 : 1), i = i.over(2), u = u.over(2); for (var f = [], h = 0; h < s.length; h++)f.push(r(s[h], a[h])); for (var v = bigInt(f.pop()).negate().times(bigInt(2).pow(f.length)); f.length;)v = v.add(bigInt(f.pop()).times(bigInt(2).pow(f.length))); return v } function O(t) { const e = t.value; const r = typeof e == 'number' ? e | H : e[0] + e[1] * U | K; return r & -r } function x(t, e) { return t = R(t), e = R(e), t.greater(e) ? t : e } function N(t, e) { return t = R(t), e = R(e), t.lesser(e) ? t : e } function Z(t, e) {
    if (t = R(t).abs(), e = R(e).abs(), t.equals(e))
      return t; if (t.isZero())
      return e; if (e.isZero())
      return t; for (var r, n, o = V[1]; t.isEven() && e.isEven();)r = Math.min(O(t), O(e)), t = t.divide(r), e = e.divide(r), o = o.multiply(r); for (;t.isEven();)t = t.divide(O(t)); do { for (;e.isEven();)e = e.divide(O(e)); t.greater(e) && (n = e, e = t, t = n), e = e.subtract(t) } while (!e.isZero()); return o.isUnit() ? t : t.multiply(o)
  } function B(t, e) { return t = R(t).abs(), e = R(e).abs(), t.divide(Z(t, e)).multiply(e) } function j(r, n) {
    r = R(r), n = R(n); const i = N(r, n); const u = x(r, n); const a = u.subtract(i); if (a.isSmall)
      return i.add(Math.round(Math.random() * a)); for (var p = a.value.length - 1, l = [], f = !0, h = p; h >= 0; h--) { const v = f ? a.value[h] : U; const y = s(Math.random() * v); l.unshift(y), v > y && (f = !1) } return l = o(l), i.add(typeof l == 'number' ? new e(l) : new t(l, !1))
  } function C(t) { let e = t.value; return typeof e == 'number' && (e = [e]), e.length === 1 && e[0] <= 36 ? '0123456789abcdefghijklmnopqrstuvwxyz'.charAt(e[0]) : `<${e}>` } function L(t, e) {
    if (e = bigInt(e), e.isZero()) {
      if (t.isZero())
        return '0'; throw new Error('Cannot convert nonzero numbers to base 0.')
    } if (e.equals(-1))
      return t.isZero() ? '0' : t.isNegative() ? new Array(1 - t).join('10') : `1${new Array(+t).join('01')}`; let r = ''; if (t.isNegative() && e.isPositive() && (r = '-', t = t.abs()), e.equals(1))
      return t.isZero() ? '0' : r + new Array(+t + 1).join(1); for (var n, o = [], i = t; i.isNegative() || i.compareAbs(e) >= 0;) { n = i.divmod(e), i = n.quotient; let u = n.remainder; u.isNegative() && (u = e.minus(u).abs(), i = i.next()), o.push(C(u)) } return o.push(C(i)), r + o.reverse().join('')
  } function k(n) {
    if (r(+n)) {
      const o = +n; if (o === s(o))
        return new e(o); throw `Invalid integer: ${n}`
    } const u = n[0] === '-'; u && (n = n.slice(1)); const a = n.split(/e/i); if (a.length > 2)
      throw new Error(`Invalid integer: ${l.join('e')}`); if (a.length === 2) {
      let p = a[1]; if (p[0] === '+' && (p = p.slice(1)), p = +p, p !== s(p) || !r(p))
        throw new Error(`Invalid integer: ${p} is not a valid exponent.`); var l = a[0]; const f = l.indexOf('.'); if (f >= 0 && (p -= l.length - f, l = l.slice(0, f) + l.slice(f + 1)), p < 0)
        throw new Error('Cannot include negative exponent part for integers'); l += new Array(p + 1).join('0'), n = l
    } const h = /^([0-9][0-9]*)$/.test(n); if (!h)
      throw new Error(`Invalid integer: ${n}`); for (var v = [], y = n.length, g = z, c = y - g; y > 0;)v.push(+n.slice(c, y)), c -= g, c < 0 && (c = 0), y -= g; return i(v), new t(v, u)
  } function D(t) { return r(t) ? new e(t) : k(t.toString()) } function R(t) { return typeof t == 'number' ? D(t) : typeof t == 'string' ? k(t) : t } var U = 1e7; var z = 7; var T = 9007199254740992; var _ = n(T); const J = Math.log(T); t.prototype.add = function (e) {
    const r = R(e); if (this.sign !== r.sign)
      return this.subtract(r.negate()); const n = this.value; const o = r.value; return r.isSmall ? new t(l(n, Math.abs(o)), this.sign) : new t(p(n, o), this.sign)
  }, t.prototype.plus = t.prototype.add, e.prototype.add = function (o) {
    const i = R(o); const u = this.value; if (u < 0 !== i.sign)
      return this.subtract(i.negate()); let s = i.value; if (i.isSmall) {
      if (r(u + s))
        return new e(u + s); s = n(Math.abs(s))
    } return new t(l(s, Math.abs(u)), u < 0)
  }, e.prototype.plus = e.prototype.add, t.prototype.subtract = function (t) {
    const e = R(t); if (this.sign !== e.sign)
      return this.add(e.negate()); const r = this.value; const n = e.value; return e.isSmall ? v(r, Math.abs(n), this.sign) : h(r, n, this.sign)
  }, t.prototype.minus = t.prototype.subtract, e.prototype.subtract = function (t) {
    const r = R(t); const n = this.value; if (n < 0 !== r.sign)
      return this.add(r.negate()); const o = r.value; return r.isSmall ? new e(n - o) : v(o, Math.abs(n), n >= 0)
  }, e.prototype.minus = e.prototype.subtract, t.prototype.negate = function () { return new t(this.value, !this.sign) }, e.prototype.negate = function () { const t = this.sign; const r = new e(-this.value); return r.sign = !t, r }, t.prototype.abs = function () { return new t(this.value, !1) }, e.prototype.abs = function () { return new e(Math.abs(this.value)) }, t.prototype.multiply = function (e) {
    let r; const o = R(e); const i = this.value; let u = o.value; const s = this.sign !== o.sign; if (o.isSmall) {
      if (u === 0)
        return V[0]; if (u === 1)
        return this; if (u === -1)
        return this.negate(); if (r = Math.abs(u), U > r)
        return new t(g(i, r), s); u = n(r)
    } return i.length + u.length > 4e3 ? new t(m(i, u), s) : new t(y(i, u), s)
  }, t.prototype.times = t.prototype.multiply, e.prototype._multiplyBySmall = function (t) { return r(t.value * this.value) ? new e(t.value * this.value) : d(Math.abs(t.value), n(Math.abs(this.value)), this.sign !== t.sign) }, t.prototype._multiplyBySmall = function (t) { return t.value === 0 ? V[0] : t.value === 1 ? this : t.value === -1 ? this.negate() : d(Math.abs(t.value), this.value, this.sign !== t.sign) }, e.prototype.multiply = function (t) { return R(t)._multiplyBySmall(this) }, e.prototype.times = e.prototype.multiply, t.prototype.square = function () { return new t(w(this.value), !1) }, e.prototype.square = function () { const o = this.value * this.value; return r(o) ? new e(o) : new t(w(n(Math.abs(this.value))), !1) }, t.prototype.divmod = function (t) { const e = E(this, t); return { quotient: e[0], remainder: e[1] } }, e.prototype.divmod = t.prototype.divmod, t.prototype.divide = function (t) { return E(this, t)[0] }, e.prototype.over = e.prototype.divide = t.prototype.over = t.prototype.divide, t.prototype.mod = function (t) { return E(this, t)[1] }, e.prototype.remainder = e.prototype.mod = t.prototype.remainder = t.prototype.mod, t.prototype.pow = function (t) {
    let n; let o; let i; const u = R(t); const a = this.value; let p = u.value; if (p === 0)
      return V[1]; if (a === 0)
      return V[0]; if (a === 1)
      return V[1]; if (a === -1)
      return u.isEven() ? V[1] : V[-1]; if (u.sign)
      return V[0]; if (!u.isSmall)
      throw new Error(`The exponent ${u.toString()} is too large.`); if (this.isSmall && r(n = a ** p))
      return new e(s(n)); for (o = this, i = V[1]; ;) {
      if (p & !0 && (i = i.times(o), --p), p === 0)
        break; p /= 2, o = o.square()
    } return i
  }, e.prototype.pow = t.prototype.pow, t.prototype.modPow = function (t, e) {
    if (t = R(t), e = R(e), e.isZero())
      throw new Error('Cannot take modPow with modulus 0'); for (var r = V[1], n = this.mod(e); t.isPositive();) {
      if (n.isZero())
        return V[0]; t.isOdd() && (r = r.multiply(n).mod(e)), t = t.divide(2), n = n.square().mod(e)
    } return r
  }, e.prototype.modPow = t.prototype.modPow, t.prototype.compareAbs = function (t) { const e = R(t); const r = this.value; const n = e.value; return e.isSmall ? 1 : S(r, n) }, e.prototype.compareAbs = function (t) { const e = R(t); const r = Math.abs(this.value); let n = e.value; return e.isSmall ? (n = Math.abs(n), r === n ? 0 : r > n ? 1 : -1) : -1 }, t.prototype.compare = function (t) {
    if (1 / 0 === t)
      return -1; if (t === -1 / 0)
      return 1; const e = R(t); const r = this.value; const n = e.value; return this.sign !== e.sign ? e.sign ? 1 : -1 : e.isSmall ? this.sign ? -1 : 1 : S(r, n) * (this.sign ? -1 : 1)
  }, t.prototype.compareTo = t.prototype.compare, e.prototype.compare = function (t) {
    if (1 / 0 === t)
      return -1; if (t === -1 / 0)
      return 1; const e = R(t); const r = this.value; const n = e.value; return e.isSmall ? r == n ? 0 : r > n ? 1 : -1 : r < 0 !== e.sign ? r < 0 ? -1 : 1 : r < 0 ? 1 : -1
  }, e.prototype.compareTo = e.prototype.compare, t.prototype.equals = function (t) { return this.compare(t) === 0 }, e.prototype.eq = e.prototype.equals = t.prototype.eq = t.prototype.equals, t.prototype.notEquals = function (t) { return this.compare(t) !== 0 }, e.prototype.neq = e.prototype.notEquals = t.prototype.neq = t.prototype.notEquals, t.prototype.greater = function (t) { return this.compare(t) > 0 }, e.prototype.gt = e.prototype.greater = t.prototype.gt = t.prototype.greater, t.prototype.lesser = function (t) { return this.compare(t) < 0 }, e.prototype.lt = e.prototype.lesser = t.prototype.lt = t.prototype.lesser, t.prototype.greaterOrEquals = function (t) { return this.compare(t) >= 0 }, e.prototype.geq = e.prototype.greaterOrEquals = t.prototype.geq = t.prototype.greaterOrEquals, t.prototype.lesserOrEquals = function (t) { return this.compare(t) <= 0 }, e.prototype.leq = e.prototype.lesserOrEquals = t.prototype.leq = t.prototype.lesserOrEquals, t.prototype.isEven = function () { return (1 & this.value[0]) === 0 }, e.prototype.isEven = function () { return (1 & this.value) === 0 }, t.prototype.isOdd = function () { return (1 & this.value[0]) === 1 }, e.prototype.isOdd = function () { return (1 & this.value) === 1 }, t.prototype.isPositive = function () { return !this.sign }, e.prototype.isPositive = function () { return this.value > 0 }, t.prototype.isNegative = function () { return this.sign }, e.prototype.isNegative = function () { return this.value < 0 }, t.prototype.isUnit = function () { return !1 }, e.prototype.isUnit = function () { return Math.abs(this.value) === 1 }, t.prototype.isZero = function () { return !1 }, e.prototype.isZero = function () { return this.value === 0 }, t.prototype.isDivisibleBy = function (t) { const e = R(t); const r = e.value; return r === 0 ? !1 : r === 1 ? !0 : r === 2 ? this.isEven() : this.mod(e).equals(V[0]) }, e.prototype.isDivisibleBy = t.prototype.isDivisibleBy, t.prototype.isPrime = function () {
    const t = P(this); if (void 0 !== t)
      return t; for (var e, r, n, o, i = this.abs(), u = i.prev(), s = [2, 3, 5, 7, 11, 13, 17, 19], a = u; a.isEven();)a = a.divide(2); for (n = 0; n < s.length; n++) {
      if (o = bigInt(s[n]).modPow(a, i), !o.equals(V[1]) && !o.equals(u)) {
        for (r = !0, e = a; r && e.lesser(u); e = e.multiply(2))o = o.square().mod(i), o.equals(u) && (r = !1); if (r)
          return !1
      }
    } return !0
  }, e.prototype.isPrime = t.prototype.isPrime, t.prototype.isProbablePrime = function (t) {
    const e = P(this); if (void 0 !== e)
      return e; for (let r = this.abs(), n = void 0 === t ? 5 : t, o = 0; n > o; o++) {
      const i = bigInt.randBetween(2, r.minus(2)); if (!i.modPow(r.prev(), r).isUnit())
        return !1
    } return !0
  }, e.prototype.isProbablePrime = t.prototype.isProbablePrime, t.prototype.next = function () { const e = this.value; return this.sign ? v(e, 1, this.sign) : new t(l(e, 1), this.sign) }, e.prototype.next = function () { const r = this.value; return T > r + 1 ? new e(r + 1) : new t(_, !1) }, t.prototype.prev = function () { const e = this.value; return this.sign ? new t(l(e, 1), !0) : v(e, 1, this.sign) }, e.prototype.prev = function () { const r = this.value; return r - 1 > -T ? new e(r - 1) : new t(_, !0) }; for (var $ = [1]; $[$.length - 1] <= U;)$.push(2 * $[$.length - 1]); const F = $.length; const G = $[F - 1]; t.prototype.shiftLeft = function (t) {
    if (!I(t))
      return t.isNegative() ? this.shiftRight(t.abs()) : this.times(V[2].pow(t)); if (t = +t, t < 0)
      return this.shiftRight(-t); for (var e = this; t >= F;)e = e.multiply(G), t -= F - 1; return e.multiply($[t])
  }, e.prototype.shiftLeft = t.prototype.shiftLeft, t.prototype.shiftRight = function (t) {
    let e; if (!I(t))
      return t.isNegative() ? this.shiftLeft(t.abs()) : (e = this.divmod(V[2].pow(t)), e.remainder.isNegative() ? e.quotient.prev() : e.quotient); if (t = +t, t < 0)
      return this.shiftLeft(-t); for (var r = this; t >= F;) {
      if (r.isZero())
        return r; e = E(r, G), r = e[1].isNegative() ? e[0].prev() : e[0], t -= F - 1
    } return e = E(r, $[t]), e[1].isNegative() ? e[0].prev() : e[0]
  }, e.prototype.shiftRight = t.prototype.shiftRight, t.prototype.not = function () { return this.negate().prev() }, e.prototype.not = t.prototype.not, t.prototype.and = function (t) { return A(this, t, (t, e) => { return t & e }) }, e.prototype.and = t.prototype.and, t.prototype.or = function (t) { return A(this, t, (t, e) => { return t | e }) }, e.prototype.or = t.prototype.or, t.prototype.xor = function (t) { return A(this, t, (t, e) => { return t ^ e }) }, e.prototype.xor = t.prototype.xor; var H = 1 << 30; var K = (U & -U) * (U & -U) | H; const Q = function (t, r) {
    let n = V[0]; let o = V[1]; const i = t.length; if (r >= 2 && r <= 36 && i <= J / Math.log(r))
      return new e(parseInt(t, r)); r = R(r); let u; const s = []; const a = t[0] === '-'; for (u = a ? 1 : 0; u < t.length; u++) {
      const p = t[u].toLowerCase(); const l = p.charCodeAt(0); if (l >= 48 && l <= 57) { s.push(R(p)) }
      else if (l >= 97 && l <= 122) { s.push(R(p.charCodeAt(0) - 87)) }
      else {
        if (p !== '<')
          throw new Error(`${p} is not a valid character`); const f = u; do u++; while (t[u] !== '>'); s.push(R(t.slice(f + 1, u)))
      }
    } for (s.reverse(), u = 0; u < s.length; u++)n = n.add(s[u].times(o)), o = o.times(r); return a ? n.negate() : n
  }; t.prototype.toString = function (t) {
    if (void 0 === t && (t = 10), t !== 10)
      return L(this, t); for (var e, r = this.value, n = r.length, o = String(r[--n]), i = '0000000'; --n >= 0;)e = String(r[n]), o += i.slice(e.length) + e; const u = this.sign ? '-' : ''; return u + o
  }, e.prototype.toString = function (t) { return void 0 === t && (t = 10), t != 10 ? L(this, t) : String(this.value) }, t.prototype.valueOf = function () { return +this.toString() }, t.prototype.toJSNumber = t.prototype.valueOf, e.prototype.valueOf = function () { return this.value }, e.prototype.toJSNumber = e.prototype.valueOf; for (var V = function (t, e) { return typeof t == 'undefined' ? V[0] : typeof e != 'undefined' ? +e === 10 ? R(t) : Q(t, e) : R(t) }, W = 0; W < 1e3; W++)V[W] = new e(W), W > 0 && (V[-W] = new e(-W)); return V.one = V[1], V.zero = V[0], V.minusOne = V[-1], V.max = x, V.min = N, V.gcd = Z, V.lcm = B, V.isInstance = function (r) { return r instanceof t || r instanceof e }, V.randBetween = j, V.BigInteger = t, V.SmallInteger = e, V
}())

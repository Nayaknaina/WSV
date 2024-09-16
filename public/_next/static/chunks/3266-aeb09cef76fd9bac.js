(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [3266], {
        67754: function(e, t, n) {
            "use strict";
            var i = n(534);
            n.o(i, "notFound") && n.d(t, {
                notFound: function() {
                    return i.notFound
                }
            }), n.o(i, "useParams") && n.d(t, {
                useParams: function() {
                    return i.useParams
                }
            }), n.o(i, "usePathname") && n.d(t, {
                usePathname: function() {
                    return i.usePathname
                }
            }), n.o(i, "useRouter") && n.d(t, {
                useRouter: function() {
                    return i.useRouter
                }
            }), n.o(i, "useSearchParams") && n.d(t, {
                useSearchParams: function() {
                    return i.useSearchParams
                }
            })
        },
        85307: function(e) {
            e.exports = {
                area: !0,
                base: !0,
                br: !0,
                col: !0,
                embed: !0,
                hr: !0,
                img: !0,
                input: !0,
                link: !0,
                meta: !0,
                param: !0,
                source: !0,
                track: !0,
                wbr: !0
            }
        },
        23579: function(e, t, n) {
            "use strict";
            n.d(t, {
                Fs: function() {
                    return B
                },
                ZP: function() {
                    return z
                }
            });
            let i = {
                type: "logger",
                log(e) {
                    this.output("log", e)
                },
                warn(e) {
                    this.output("warn", e)
                },
                error(e) {
                    this.output("error", e)
                },
                output(e, t) {
                    console && console[e] && console[e].apply(console, t)
                }
            };
            class s {
                constructor(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    this.init(e, t)
                }
                init(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    this.prefix = t.prefix || "i18next:", this.logger = e || i, this.options = t, this.debug = t.debug
                }
                log() {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    return this.forward(t, "log", "", !0)
                }
                warn() {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    return this.forward(t, "warn", "", !0)
                }
                error() {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    return this.forward(t, "error", "")
                }
                deprecate() {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    return this.forward(t, "warn", "WARNING DEPRECATED: ", !0)
                }
                forward(e, t, n, i) {
                    return i && !this.debug ? null : ("string" == typeof e[0] && (e[0] = `${n}${this.prefix} ${e[0]}`), this.logger[t](e))
                }
                create(e) {
                    return new s(this.logger, {
                        prefix: `${this.prefix}:${e}:`,
                        ...this.options
                    })
                }
                clone(e) {
                    return (e = e || this.options).prefix = e.prefix || this.prefix, new s(this.logger, e)
                }
            }
            var r = new s;
            class o {
                constructor() {
                    this.observers = {}
                }
                on(e, t) {
                    return e.split(" ").forEach(e => {
                        this.observers[e] || (this.observers[e] = new Map);
                        let n = this.observers[e].get(t) || 0;
                        this.observers[e].set(t, n + 1)
                    }), this
                }
                off(e, t) {
                    if (this.observers[e]) {
                        if (!t) {
                            delete this.observers[e];
                            return
                        }
                        this.observers[e].delete(t)
                    }
                }
                emit(e) {
                    for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) n[i - 1] = arguments[i];
                    this.observers[e] && Array.from(this.observers[e].entries()).forEach(e => {
                        let [t, i] = e;
                        for (let e = 0; e < i; e++) t(...n)
                    }), this.observers["*"] && Array.from(this.observers["*"].entries()).forEach(t => {
                        let [i, s] = t;
                        for (let t = 0; t < s; t++) i.apply(i, [e, ...n])
                    })
                }
            }

            function a() {
                let e, t;
                let n = new Promise((n, i) => {
                    e = n, t = i
                });
                return n.resolve = e, n.reject = t, n
            }

            function l(e) {
                return null == e ? "" : "" + e
            }
            let u = /###/g;

            function p(e, t, n) {
                function i(e) {
                    return e && e.indexOf("###") > -1 ? e.replace(u, ".") : e
                }

                function s() {
                    return !e || "string" == typeof e
                }
                let r = "string" != typeof t ? t : t.split("."),
                    o = 0;
                for (; o < r.length - 1;) {
                    if (s()) return {};
                    let t = i(r[o]);
                    !e[t] && n && (e[t] = new n), e = Object.prototype.hasOwnProperty.call(e, t) ? e[t] : {}, ++o
                }
                return s() ? {} : {
                    obj: e,
                    k: i(r[o])
                }
            }

            function h(e, t, n) {
                let {
                    obj: i,
                    k: s
                } = p(e, t, Object);
                if (void 0 !== i || 1 === t.length) {
                    i[s] = n;
                    return
                }
                let r = t[t.length - 1],
                    o = t.slice(0, t.length - 1),
                    a = p(e, o, Object);
                for (; void 0 === a.obj && o.length;) r = `${o[o.length-1]}.${r}`, (a = p(e, o = o.slice(0, o.length - 1), Object)) && a.obj && void 0 !== a.obj[`${a.k}.${r}`] && (a.obj = void 0);
                a.obj[`${a.k}.${r}`] = n
            }

            function g(e, t) {
                let {
                    obj: n,
                    k: i
                } = p(e, t);
                if (n) return n[i]
            }

            function c(e) {
                return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
            }
            var d = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
                "/": "&#x2F;"
            };

            function f(e) {
                return "string" == typeof e ? e.replace(/[&<>"'\/]/g, e => d[e]) : e
            }
            class m {
                constructor(e) {
                    this.capacity = e, this.regExpMap = new Map, this.regExpQueue = []
                }
                getRegExp(e) {
                    let t = this.regExpMap.get(e);
                    if (void 0 !== t) return t;
                    let n = new RegExp(e);
                    return this.regExpQueue.length === this.capacity && this.regExpMap.delete(this.regExpQueue.shift()), this.regExpMap.set(e, n), this.regExpQueue.push(e), n
                }
            }
            let y = [" ", ",", "?", "!", ";"],
                v = new m(20);

            function b(e, t) {
                let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ".";
                if (!e) return;
                if (e[t]) return e[t];
                let i = t.split(n),
                    s = e;
                for (let e = 0; e < i.length;) {
                    let t;
                    if (!s || "object" != typeof s) return;
                    let r = "";
                    for (let o = e; o < i.length; ++o)
                        if (o !== e && (r += n), r += i[o], void 0 !== (t = s[r])) {
                            if (["string", "number", "boolean"].indexOf(typeof t) > -1 && o < i.length - 1) continue;
                            e += o - e + 1;
                            break
                        }
                    s = t
                }
                return s
            }

            function x(e) {
                return e && e.indexOf("_") > 0 ? e.replace("_", "-") : e
            }
            class k extends o {
                constructor(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                        ns: ["translation"],
                        defaultNS: "translation"
                    };
                    super(), this.data = e || {}, this.options = t, void 0 === this.options.keySeparator && (this.options.keySeparator = "."), void 0 === this.options.ignoreJSONStructure && (this.options.ignoreJSONStructure = !0)
                }
                addNamespaces(e) {
                    0 > this.options.ns.indexOf(e) && this.options.ns.push(e)
                }
                removeNamespaces(e) {
                    let t = this.options.ns.indexOf(e);
                    t > -1 && this.options.ns.splice(t, 1)
                }
                getResource(e, t, n) {
                    let i, s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        r = void 0 !== s.keySeparator ? s.keySeparator : this.options.keySeparator,
                        o = void 0 !== s.ignoreJSONStructure ? s.ignoreJSONStructure : this.options.ignoreJSONStructure;
                    e.indexOf(".") > -1 ? i = e.split(".") : (i = [e, t], n && (Array.isArray(n) ? i.push(...n) : "string" == typeof n && r ? i.push(...n.split(r)) : i.push(n)));
                    let a = g(this.data, i);
                    return (!a && !t && !n && e.indexOf(".") > -1 && (e = i[0], t = i[1], n = i.slice(2).join(".")), a || !o || "string" != typeof n) ? a : b(this.data && this.data[e] && this.data[e][t], n, r)
                }
                addResource(e, t, n, i) {
                    let s = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {
                            silent: !1
                        },
                        r = void 0 !== s.keySeparator ? s.keySeparator : this.options.keySeparator,
                        o = [e, t];
                    n && (o = o.concat(r ? n.split(r) : n)), e.indexOf(".") > -1 && (o = e.split("."), i = t, t = o[1]), this.addNamespaces(t), h(this.data, o, i), s.silent || this.emit("added", e, t, n, i)
                }
                addResources(e, t, n) {
                    let i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {
                        silent: !1
                    };
                    for (let i in n)("string" == typeof n[i] || "[object Array]" === Object.prototype.toString.apply(n[i])) && this.addResource(e, t, i, n[i], {
                        silent: !0
                    });
                    i.silent || this.emit("added", e, t, n)
                }
                addResourceBundle(e, t, n, i, s) {
                    let r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {
                            silent: !1,
                            skipCopy: !1
                        },
                        o = [e, t];
                    e.indexOf(".") > -1 && (o = e.split("."), i = n, n = t, t = o[1]), this.addNamespaces(t);
                    let a = g(this.data, o) || {};
                    r.skipCopy || (n = JSON.parse(JSON.stringify(n))), i ? function e(t, n, i) {
                        for (let s in n) "__proto__" !== s && "constructor" !== s && (s in t ? "string" == typeof t[s] || t[s] instanceof String || "string" == typeof n[s] || n[s] instanceof String ? i && (t[s] = n[s]) : e(t[s], n[s], i) : t[s] = n[s]);
                        return t
                    }(a, n, s) : a = { ...a,
                        ...n
                    }, h(this.data, o, a), r.silent || this.emit("added", e, t, n)
                }
                removeResourceBundle(e, t) {
                    this.hasResourceBundle(e, t) && delete this.data[e][t], this.removeNamespaces(t), this.emit("removed", e, t)
                }
                hasResourceBundle(e, t) {
                    return void 0 !== this.getResource(e, t)
                }
                getResourceBundle(e, t) {
                    return (t || (t = this.options.defaultNS), "v1" === this.options.compatibilityAPI) ? { ...this.getResource(e, t)
                    } : this.getResource(e, t)
                }
                getDataByLanguage(e) {
                    return this.data[e]
                }
                hasLanguageSomeTranslations(e) {
                    let t = this.getDataByLanguage(e);
                    return !!(t && Object.keys(t) || []).find(e => t[e] && Object.keys(t[e]).length > 0)
                }
                toJSON() {
                    return this.data
                }
            }
            var S = {
                processors: {},
                addPostProcessor(e) {
                    this.processors[e.name] = e
                },
                handle(e, t, n, i, s) {
                    return e.forEach(e => {
                        this.processors[e] && (t = this.processors[e].process(t, n, i, s))
                    }), t
                }
            };
            let O = {};
            class w extends o {
                constructor(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    super(),
                        function(e, t, n) {
                            e.forEach(e => {
                                t[e] && (n[e] = t[e])
                            })
                        }(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], e, this), this.options = t, void 0 === this.options.keySeparator && (this.options.keySeparator = "."), this.logger = r.create("translator")
                }
                changeLanguage(e) {
                    e && (this.language = e)
                }
                exists(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                        interpolation: {}
                    };
                    if (null == e) return !1;
                    let n = this.resolve(e, t);
                    return n && void 0 !== n.res
                }
                extractFromKey(e, t) {
                    let n = void 0 !== t.nsSeparator ? t.nsSeparator : this.options.nsSeparator;
                    void 0 === n && (n = ":");
                    let i = void 0 !== t.keySeparator ? t.keySeparator : this.options.keySeparator,
                        s = t.ns || this.options.defaultNS || [],
                        r = n && e.indexOf(n) > -1,
                        o = !this.options.userDefinedKeySeparator && !t.keySeparator && !this.options.userDefinedNsSeparator && !t.nsSeparator && ! function(e, t, n) {
                            t = t || "", n = n || "";
                            let i = y.filter(e => 0 > t.indexOf(e) && 0 > n.indexOf(e));
                            if (0 === i.length) return !0;
                            let s = v.getRegExp(`(${i.map(e=>"?"===e?"\\?":e).join("|")})`),
                                r = !s.test(e);
                            if (!r) {
                                let t = e.indexOf(n);
                                t > 0 && !s.test(e.substring(0, t)) && (r = !0)
                            }
                            return r
                        }(e, n, i);
                    if (r && !o) {
                        let t = e.match(this.interpolator.nestingRegexp);
                        if (t && t.length > 0) return {
                            key: e,
                            namespaces: s
                        };
                        let r = e.split(n);
                        (n !== i || n === i && this.options.ns.indexOf(r[0]) > -1) && (s = r.shift()), e = r.join(i)
                    }
                    return "string" == typeof s && (s = [s]), {
                        key: e,
                        namespaces: s
                    }
                }
                translate(e, t, n) {
                    if ("object" != typeof t && this.options.overloadTranslationOptionHandler && (t = this.options.overloadTranslationOptionHandler(arguments)), "object" == typeof t && (t = { ...t
                        }), t || (t = {}), null == e) return "";
                    Array.isArray(e) || (e = [String(e)]);
                    let i = void 0 !== t.returnDetails ? t.returnDetails : this.options.returnDetails,
                        s = void 0 !== t.keySeparator ? t.keySeparator : this.options.keySeparator,
                        {
                            key: r,
                            namespaces: o
                        } = this.extractFromKey(e[e.length - 1], t),
                        a = o[o.length - 1],
                        l = t.lng || this.language,
                        u = t.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
                    if (l && "cimode" === l.toLowerCase()) {
                        if (u) {
                            let e = t.nsSeparator || this.options.nsSeparator;
                            return i ? {
                                res: `${a}${e}${r}`,
                                usedKey: r,
                                exactUsedKey: r,
                                usedLng: l,
                                usedNS: a,
                                usedParams: this.getUsedParamsDetails(t)
                            } : `${a}${e}${r}`
                        }
                        return i ? {
                            res: r,
                            usedKey: r,
                            exactUsedKey: r,
                            usedLng: l,
                            usedNS: a,
                            usedParams: this.getUsedParamsDetails(t)
                        } : r
                    }
                    let p = this.resolve(e, t),
                        h = p && p.res,
                        g = p && p.usedKey || r,
                        c = p && p.exactUsedKey || r,
                        d = Object.prototype.toString.apply(h),
                        f = void 0 !== t.joinArrays ? t.joinArrays : this.options.joinArrays,
                        m = !this.i18nFormat || this.i18nFormat.handleAsObject,
                        y = "string" != typeof h && "boolean" != typeof h && "number" != typeof h;
                    if (m && h && y && 0 > ["[object Number]", "[object Function]", "[object RegExp]"].indexOf(d) && !("string" == typeof f && "[object Array]" === d)) {
                        if (!t.returnObjects && !this.options.returnObjects) {
                            this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
                            let e = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(g, h, { ...t,
                                ns: o
                            }) : `key '${r} (${this.language})' returned an object instead of string.`;
                            return i ? (p.res = e, p.usedParams = this.getUsedParamsDetails(t), p) : e
                        }
                        if (s) {
                            let e = "[object Array]" === d,
                                n = e ? [] : {},
                                i = e ? c : g;
                            for (let e in h)
                                if (Object.prototype.hasOwnProperty.call(h, e)) {
                                    let r = `${i}${s}${e}`;
                                    n[e] = this.translate(r, { ...t,
                                        joinArrays: !1,
                                        ns: o
                                    }), n[e] === r && (n[e] = h[e])
                                }
                            h = n
                        }
                    } else if (m && "string" == typeof f && "[object Array]" === d)(h = h.join(f)) && (h = this.extendTranslation(h, e, t, n));
                    else {
                        let i = !1,
                            o = !1,
                            u = void 0 !== t.count && "string" != typeof t.count,
                            g = w.hasDefaultValue(t),
                            c = u ? this.pluralResolver.getSuffix(l, t.count, t) : "",
                            d = t.ordinal && u ? this.pluralResolver.getSuffix(l, t.count, {
                                ordinal: !1
                            }) : "",
                            f = u && !t.ordinal && 0 === t.count && this.pluralResolver.shouldUseIntlApi(),
                            m = f && t[`defaultValue${this.options.pluralSeparator}zero`] || t[`defaultValue${c}`] || t[`defaultValue${d}`] || t.defaultValue;
                        !this.isValidLookup(h) && g && (i = !0, h = m), this.isValidLookup(h) || (o = !0, h = r);
                        let y = (t.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && o ? void 0 : h,
                            v = g && m !== h && this.options.updateMissing;
                        if (o || i || v) {
                            if (this.logger.log(v ? "updateKey" : "missingKey", l, a, r, v ? m : h), s) {
                                let e = this.resolve(r, { ...t,
                                    keySeparator: !1
                                });
                                e && e.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")
                            }
                            let e = [],
                                n = this.languageUtils.getFallbackCodes(this.options.fallbackLng, t.lng || this.language);
                            if ("fallback" === this.options.saveMissingTo && n && n[0])
                                for (let t = 0; t < n.length; t++) e.push(n[t]);
                            else "all" === this.options.saveMissingTo ? e = this.languageUtils.toResolveHierarchy(t.lng || this.language) : e.push(t.lng || this.language);
                            let i = (e, n, i) => {
                                let s = g && i !== h ? i : y;
                                this.options.missingKeyHandler ? this.options.missingKeyHandler(e, a, n, s, v, t) : this.backendConnector && this.backendConnector.saveMissing && this.backendConnector.saveMissing(e, a, n, s, v, t), this.emit("missingKey", e, a, n, h)
                            };
                            this.options.saveMissing && (this.options.saveMissingPlurals && u ? e.forEach(e => {
                                let n = this.pluralResolver.getSuffixes(e, t);
                                f && t[`defaultValue${this.options.pluralSeparator}zero`] && 0 > n.indexOf(`${this.options.pluralSeparator}zero`) && n.push(`${this.options.pluralSeparator}zero`), n.forEach(n => {
                                    i([e], r + n, t[`defaultValue${n}`] || m)
                                })
                            }) : i(e, r, m))
                        }
                        h = this.extendTranslation(h, e, t, p, n), o && h === r && this.options.appendNamespaceToMissingKey && (h = `${a}:${r}`), (o || i) && this.options.parseMissingKeyHandler && (h = "v1" !== this.options.compatibilityAPI ? this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${a}:${r}` : r, i ? h : void 0) : this.options.parseMissingKeyHandler(h))
                    }
                    return i ? (p.res = h, p.usedParams = this.getUsedParamsDetails(t), p) : h
                }
                extendTranslation(e, t, n, i, s) {
                    var r = this;
                    if (this.i18nFormat && this.i18nFormat.parse) e = this.i18nFormat.parse(e, { ...this.options.interpolation.defaultVariables,
                        ...n
                    }, n.lng || this.language || i.usedLng, i.usedNS, i.usedKey, {
                        resolved: i
                    });
                    else if (!n.skipInterpolation) {
                        let o;
                        n.interpolation && this.interpolator.init({ ...n,
                            interpolation: { ...this.options.interpolation,
                                ...n.interpolation
                            }
                        });
                        let a = "string" == typeof e && (n && n.interpolation && void 0 !== n.interpolation.skipOnVariables ? n.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
                        if (a) {
                            let t = e.match(this.interpolator.nestingRegexp);
                            o = t && t.length
                        }
                        let l = n.replace && "string" != typeof n.replace ? n.replace : n;
                        if (this.options.interpolation.defaultVariables && (l = { ...this.options.interpolation.defaultVariables,
                                ...l
                            }), e = this.interpolator.interpolate(e, l, n.lng || this.language, n), a) {
                            let t = e.match(this.interpolator.nestingRegexp);
                            o < (t && t.length) && (n.nest = !1)
                        }!n.lng && "v1" !== this.options.compatibilityAPI && i && i.res && (n.lng = i.usedLng), !1 !== n.nest && (e = this.interpolator.nest(e, function() {
                            for (var e = arguments.length, i = Array(e), o = 0; o < e; o++) i[o] = arguments[o];
                            return s && s[0] === i[0] && !n.context ? (r.logger.warn(`It seems you are nesting recursively key: ${i[0]} in key: ${t[0]}`), null) : r.translate(...i, t)
                        }, n)), n.interpolation && this.interpolator.reset()
                    }
                    let o = n.postProcess || this.options.postProcess,
                        a = "string" == typeof o ? [o] : o;
                    return null != e && a && a.length && !1 !== n.applyPostProcessor && (e = S.handle(a, e, t, this.options && this.options.postProcessPassResolved ? {
                        i18nResolved: { ...i,
                            usedParams: this.getUsedParamsDetails(n)
                        },
                        ...n
                    } : n, this)), e
                }
                resolve(e) {
                    let t, n, i, s, r, o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return "string" == typeof e && (e = [e]), e.forEach(e => {
                        if (this.isValidLookup(t)) return;
                        let a = this.extractFromKey(e, o),
                            l = a.key;
                        n = l;
                        let u = a.namespaces;
                        this.options.fallbackNS && (u = u.concat(this.options.fallbackNS));
                        let p = void 0 !== o.count && "string" != typeof o.count,
                            h = p && !o.ordinal && 0 === o.count && this.pluralResolver.shouldUseIntlApi(),
                            g = void 0 !== o.context && ("string" == typeof o.context || "number" == typeof o.context) && "" !== o.context,
                            c = o.lngs ? o.lngs : this.languageUtils.toResolveHierarchy(o.lng || this.language, o.fallbackLng);
                        u.forEach(e => {
                            this.isValidLookup(t) || (r = e, !O[`${c[0]}-${e}`] && this.utils && this.utils.hasLoadedNamespace && !this.utils.hasLoadedNamespace(r) && (O[`${c[0]}-${e}`] = !0, this.logger.warn(`key "${n}" for languages "${c.join(", ")}" won't get resolved as namespace "${r}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), c.forEach(n => {
                                let r;
                                if (this.isValidLookup(t)) return;
                                s = n;
                                let a = [l];
                                if (this.i18nFormat && this.i18nFormat.addLookupKeys) this.i18nFormat.addLookupKeys(a, l, n, e, o);
                                else {
                                    let e;
                                    p && (e = this.pluralResolver.getSuffix(n, o.count, o));
                                    let t = `${this.options.pluralSeparator}zero`,
                                        i = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
                                    if (p && (a.push(l + e), o.ordinal && 0 === e.indexOf(i) && a.push(l + e.replace(i, this.options.pluralSeparator)), h && a.push(l + t)), g) {
                                        let n = `${l}${this.options.contextSeparator}${o.context}`;
                                        a.push(n), p && (a.push(n + e), o.ordinal && 0 === e.indexOf(i) && a.push(n + e.replace(i, this.options.pluralSeparator)), h && a.push(n + t))
                                    }
                                }
                                for (; r = a.pop();) this.isValidLookup(t) || (i = r, t = this.getResource(n, e, r, o))
                            }))
                        })
                    }), {
                        res: t,
                        usedKey: n,
                        exactUsedKey: i,
                        usedLng: s,
                        usedNS: r
                    }
                }
                isValidLookup(e) {
                    return void 0 !== e && !(!this.options.returnNull && null === e) && !(!this.options.returnEmptyString && "" === e)
                }
                getResource(e, t, n) {
                    let i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    return this.i18nFormat && this.i18nFormat.getResource ? this.i18nFormat.getResource(e, t, n, i) : this.resourceStore.getResource(e, t, n, i)
                }
                getUsedParamsDetails() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = e.replace && "string" != typeof e.replace,
                        n = t ? e.replace : e;
                    if (t && void 0 !== e.count && (n.count = e.count), this.options.interpolation.defaultVariables && (n = { ...this.options.interpolation.defaultVariables,
                            ...n
                        }), !t)
                        for (let e of (n = { ...n
                            }, ["defaultValue", "ordinal", "context", "replace", "lng", "lngs", "fallbackLng", "ns", "keySeparator", "nsSeparator", "returnObjects", "returnDetails", "joinArrays", "postProcess", "interpolation"])) delete n[e];
                    return n
                }
                static hasDefaultValue(e) {
                    let t = "defaultValue";
                    for (let n in e)
                        if (Object.prototype.hasOwnProperty.call(e, n) && t === n.substring(0, t.length) && void 0 !== e[n]) return !0;
                    return !1
                }
            }

            function L(e) {
                return e.charAt(0).toUpperCase() + e.slice(1)
            }
            class $ {
                constructor(e) {
                    this.options = e, this.supportedLngs = this.options.supportedLngs || !1, this.logger = r.create("languageUtils")
                }
                getScriptPartFromCode(e) {
                    if (!(e = x(e)) || 0 > e.indexOf("-")) return null;
                    let t = e.split("-");
                    return 2 === t.length ? null : (t.pop(), "x" === t[t.length - 1].toLowerCase()) ? null : this.formatLanguageCode(t.join("-"))
                }
                getLanguagePartFromCode(e) {
                    if (!(e = x(e)) || 0 > e.indexOf("-")) return e;
                    let t = e.split("-");
                    return this.formatLanguageCode(t[0])
                }
                formatLanguageCode(e) {
                    if ("string" == typeof e && e.indexOf("-") > -1) {
                        let t = ["hans", "hant", "latn", "cyrl", "cans", "mong", "arab"],
                            n = e.split("-");
                        return this.options.lowerCaseLng ? n = n.map(e => e.toLowerCase()) : 2 === n.length ? (n[0] = n[0].toLowerCase(), n[1] = n[1].toUpperCase(), t.indexOf(n[1].toLowerCase()) > -1 && (n[1] = L(n[1].toLowerCase()))) : 3 === n.length && (n[0] = n[0].toLowerCase(), 2 === n[1].length && (n[1] = n[1].toUpperCase()), "sgn" !== n[0] && 2 === n[2].length && (n[2] = n[2].toUpperCase()), t.indexOf(n[1].toLowerCase()) > -1 && (n[1] = L(n[1].toLowerCase())), t.indexOf(n[2].toLowerCase()) > -1 && (n[2] = L(n[2].toLowerCase()))), n.join("-")
                    }
                    return this.options.cleanCode || this.options.lowerCaseLng ? e.toLowerCase() : e
                }
                isSupportedCode(e) {
                    return ("languageOnly" === this.options.load || this.options.nonExplicitSupportedLngs) && (e = this.getLanguagePartFromCode(e)), !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(e) > -1
                }
                getBestMatchFromCodes(e) {
                    let t;
                    return e ? (e.forEach(e => {
                        if (t) return;
                        let n = this.formatLanguageCode(e);
                        (!this.options.supportedLngs || this.isSupportedCode(n)) && (t = n)
                    }), !t && this.options.supportedLngs && e.forEach(e => {
                        if (t) return;
                        let n = this.getLanguagePartFromCode(e);
                        if (this.isSupportedCode(n)) return t = n;
                        t = this.options.supportedLngs.find(e => {
                            if (e === n || !(0 > e.indexOf("-") && 0 > n.indexOf("-")) && (e.indexOf("-") > 0 && 0 > n.indexOf("-") && e.substring(0, e.indexOf("-")) === n || 0 === e.indexOf(n) && n.length > 1)) return e
                        })
                    }), t || (t = this.getFallbackCodes(this.options.fallbackLng)[0]), t) : null
                }
                getFallbackCodes(e, t) {
                    if (!e) return [];
                    if ("function" == typeof e && (e = e(t)), "string" == typeof e && (e = [e]), "[object Array]" === Object.prototype.toString.apply(e)) return e;
                    if (!t) return e.default || [];
                    let n = e[t];
                    return n || (n = e[this.getScriptPartFromCode(t)]), n || (n = e[this.formatLanguageCode(t)]), n || (n = e[this.getLanguagePartFromCode(t)]), n || (n = e.default), n || []
                }
                toResolveHierarchy(e, t) {
                    let n = this.getFallbackCodes(t || this.options.fallbackLng || [], e),
                        i = [],
                        s = e => {
                            e && (this.isSupportedCode(e) ? i.push(e) : this.logger.warn(`rejecting language code not found in supportedLngs: ${e}`))
                        };
                    return "string" == typeof e && (e.indexOf("-") > -1 || e.indexOf("_") > -1) ? ("languageOnly" !== this.options.load && s(this.formatLanguageCode(e)), "languageOnly" !== this.options.load && "currentOnly" !== this.options.load && s(this.getScriptPartFromCode(e)), "currentOnly" !== this.options.load && s(this.getLanguagePartFromCode(e))) : "string" == typeof e && s(this.formatLanguageCode(e)), n.forEach(e => {
                        0 > i.indexOf(e) && s(this.formatLanguageCode(e))
                    }), i
                }
            }
            let N = [{
                    lngs: ["ach", "ak", "am", "arn", "br", "fil", "gun", "ln", "mfe", "mg", "mi", "oc", "pt", "pt-BR", "tg", "tl", "ti", "tr", "uz", "wa"],
                    nr: [1, 2],
                    fc: 1
                }, {
                    lngs: ["af", "an", "ast", "az", "bg", "bn", "ca", "da", "de", "dev", "el", "en", "eo", "es", "et", "eu", "fi", "fo", "fur", "fy", "gl", "gu", "ha", "hi", "hu", "hy", "ia", "it", "kk", "kn", "ku", "lb", "mai", "ml", "mn", "mr", "nah", "nap", "nb", "ne", "nl", "nn", "no", "nso", "pa", "pap", "pms", "ps", "pt-PT", "rm", "sco", "se", "si", "so", "son", "sq", "sv", "sw", "ta", "te", "tk", "ur", "yo"],
                    nr: [1, 2],
                    fc: 2
                }, {
                    lngs: ["ay", "bo", "cgg", "fa", "ht", "id", "ja", "jbo", "ka", "km", "ko", "ky", "lo", "ms", "sah", "su", "th", "tt", "ug", "vi", "wo", "zh"],
                    nr: [1],
                    fc: 3
                }, {
                    lngs: ["be", "bs", "cnr", "dz", "hr", "ru", "sr", "uk"],
                    nr: [1, 2, 5],
                    fc: 4
                }, {
                    lngs: ["ar"],
                    nr: [0, 1, 2, 3, 11, 100],
                    fc: 5
                }, {
                    lngs: ["cs", "sk"],
                    nr: [1, 2, 5],
                    fc: 6
                }, {
                    lngs: ["csb", "pl"],
                    nr: [1, 2, 5],
                    fc: 7
                }, {
                    lngs: ["cy"],
                    nr: [1, 2, 3, 8],
                    fc: 8
                }, {
                    lngs: ["fr"],
                    nr: [1, 2],
                    fc: 9
                }, {
                    lngs: ["ga"],
                    nr: [1, 2, 3, 7, 11],
                    fc: 10
                }, {
                    lngs: ["gd"],
                    nr: [1, 2, 3, 20],
                    fc: 11
                }, {
                    lngs: ["is"],
                    nr: [1, 2],
                    fc: 12
                }, {
                    lngs: ["jv"],
                    nr: [0, 1],
                    fc: 13
                }, {
                    lngs: ["kw"],
                    nr: [1, 2, 3, 4],
                    fc: 14
                }, {
                    lngs: ["lt"],
                    nr: [1, 2, 10],
                    fc: 15
                }, {
                    lngs: ["lv"],
                    nr: [1, 2, 0],
                    fc: 16
                }, {
                    lngs: ["mk"],
                    nr: [1, 2],
                    fc: 17
                }, {
                    lngs: ["mnk"],
                    nr: [0, 1, 2],
                    fc: 18
                }, {
                    lngs: ["mt"],
                    nr: [1, 2, 11, 20],
                    fc: 19
                }, {
                    lngs: ["or"],
                    nr: [2, 1],
                    fc: 2
                }, {
                    lngs: ["ro"],
                    nr: [1, 2, 20],
                    fc: 20
                }, {
                    lngs: ["sl"],
                    nr: [5, 1, 2, 3],
                    fc: 21
                }, {
                    lngs: ["he", "iw"],
                    nr: [1, 2, 20, 21],
                    fc: 22
                }],
                C = {
                    1: function(e) {
                        return Number(e > 1)
                    },
                    2: function(e) {
                        return Number(1 != e)
                    },
                    3: function(e) {
                        return 0
                    },
                    4: function(e) {
                        return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2)
                    },
                    5: function(e) {
                        return Number(0 == e ? 0 : 1 == e ? 1 : 2 == e ? 2 : e % 100 >= 3 && e % 100 <= 10 ? 3 : e % 100 >= 11 ? 4 : 5)
                    },
                    6: function(e) {
                        return Number(1 == e ? 0 : e >= 2 && e <= 4 ? 1 : 2)
                    },
                    7: function(e) {
                        return Number(1 == e ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2)
                    },
                    8: function(e) {
                        return Number(1 == e ? 0 : 2 == e ? 1 : 8 != e && 11 != e ? 2 : 3)
                    },
                    9: function(e) {
                        return Number(e >= 2)
                    },
                    10: function(e) {
                        return Number(1 == e ? 0 : 2 == e ? 1 : e < 7 ? 2 : e < 11 ? 3 : 4)
                    },
                    11: function(e) {
                        return Number(1 == e || 11 == e ? 0 : 2 == e || 12 == e ? 1 : e > 2 && e < 20 ? 2 : 3)
                    },
                    12: function(e) {
                        return Number(e % 10 != 1 || e % 100 == 11)
                    },
                    13: function(e) {
                        return Number(0 !== e)
                    },
                    14: function(e) {
                        return Number(1 == e ? 0 : 2 == e ? 1 : 3 == e ? 2 : 3)
                    },
                    15: function(e) {
                        return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2)
                    },
                    16: function(e) {
                        return Number(e % 10 == 1 && e % 100 != 11 ? 0 : 0 !== e ? 1 : 2)
                    },
                    17: function(e) {
                        return Number(1 == e || e % 10 == 1 && e % 100 != 11 ? 0 : 1)
                    },
                    18: function(e) {
                        return Number(0 == e ? 0 : 1 == e ? 1 : 2)
                    },
                    19: function(e) {
                        return Number(1 == e ? 0 : 0 == e || e % 100 > 1 && e % 100 < 11 ? 1 : e % 100 > 10 && e % 100 < 20 ? 2 : 3)
                    },
                    20: function(e) {
                        return Number(1 == e ? 0 : 0 == e || e % 100 > 0 && e % 100 < 20 ? 1 : 2)
                    },
                    21: function(e) {
                        return Number(e % 100 == 1 ? 1 : e % 100 == 2 ? 2 : e % 100 == 3 || e % 100 == 4 ? 3 : 0)
                    },
                    22: function(e) {
                        return Number(1 == e ? 0 : 2 == e ? 1 : (e < 0 || e > 10) && e % 10 == 0 ? 2 : 3)
                    }
                },
                R = ["v1", "v2", "v3"],
                P = ["v4"],
                E = {
                    zero: 0,
                    one: 1,
                    two: 2,
                    few: 3,
                    many: 4,
                    other: 5
                };
            class j {
                constructor(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    this.languageUtils = e, this.options = t, this.logger = r.create("pluralResolver"), (!this.options.compatibilityJSON || P.includes(this.options.compatibilityJSON)) && ("undefined" == typeof Intl || !Intl.PluralRules) && (this.options.compatibilityJSON = "v3", this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")), this.rules = function() {
                        let e = {};
                        return N.forEach(t => {
                            t.lngs.forEach(n => {
                                e[n] = {
                                    numbers: t.nr,
                                    plurals: C[t.fc]
                                }
                            })
                        }), e
                    }()
                }
                addRule(e, t) {
                    this.rules[e] = t
                }
                getRule(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    if (this.shouldUseIntlApi()) try {
                        return new Intl.PluralRules(x("dev" === e ? "en" : e), {
                            type: t.ordinal ? "ordinal" : "cardinal"
                        })
                    } catch (e) {
                        return
                    }
                    return this.rules[e] || this.rules[this.languageUtils.getLanguagePartFromCode(e)]
                }
                needsPlural(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        n = this.getRule(e, t);
                    return this.shouldUseIntlApi() ? n && n.resolvedOptions().pluralCategories.length > 1 : n && n.numbers.length > 1
                }
                getPluralFormsOfKey(e, t) {
                    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    return this.getSuffixes(e, n).map(e => `${t}${e}`)
                }
                getSuffixes(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        n = this.getRule(e, t);
                    return n ? this.shouldUseIntlApi() ? n.resolvedOptions().pluralCategories.sort((e, t) => E[e] - E[t]).map(e => `${this.options.prepend}${t.ordinal?`ordinal${this.options.prepend}`:""}${e}`) : n.numbers.map(n => this.getSuffix(e, n, t)) : []
                }
                getSuffix(e, t) {
                    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        i = this.getRule(e, n);
                    return i ? this.shouldUseIntlApi() ? `${this.options.prepend}${n.ordinal?`ordinal${this.options.prepend}`:""}${i.select(t)}` : this.getSuffixRetroCompatible(i, t) : (this.logger.warn(`no plural rule found for: ${e}`), "")
                }
                getSuffixRetroCompatible(e, t) {
                    let n = e.noAbs ? e.plurals(t) : e.plurals(Math.abs(t)),
                        i = e.numbers[n];
                    this.options.simplifyPluralSuffix && 2 === e.numbers.length && 1 === e.numbers[0] && (2 === i ? i = "plural" : 1 === i && (i = ""));
                    let s = () => this.options.prepend && i.toString() ? this.options.prepend + i.toString() : i.toString();
                    return "v1" === this.options.compatibilityJSON ? 1 === i ? "" : "number" == typeof i ? `_plural_${i.toString()}` : s() : "v2" === this.options.compatibilityJSON || this.options.simplifyPluralSuffix && 2 === e.numbers.length && 1 === e.numbers[0] ? s() : this.options.prepend && n.toString() ? this.options.prepend + n.toString() : n.toString()
                }
                shouldUseIntlApi() {
                    return !R.includes(this.options.compatibilityJSON)
                }
            }

            function I(e, t, n) {
                let i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : ".",
                    s = !(arguments.length > 4) || void 0 === arguments[4] || arguments[4],
                    r = function(e, t, n) {
                        let i = g(e, n);
                        return void 0 !== i ? i : g(t, n)
                    }(e, t, n);
                return !r && s && "string" == typeof n && void 0 === (r = b(e, n, i)) && (r = b(t, n, i)), r
            }
            class F {
                constructor() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this.logger = r.create("interpolator"), this.options = e, this.format = e.interpolation && e.interpolation.format || (e => e), this.init(e)
                }
                init() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    e.interpolation || (e.interpolation = {
                        escapeValue: !0
                    });
                    let {
                        escape: t,
                        escapeValue: n,
                        useRawValueToEscape: i,
                        prefix: s,
                        prefixEscaped: r,
                        suffix: o,
                        suffixEscaped: a,
                        formatSeparator: l,
                        unescapeSuffix: u,
                        unescapePrefix: p,
                        nestingPrefix: h,
                        nestingPrefixEscaped: g,
                        nestingSuffix: d,
                        nestingSuffixEscaped: m,
                        nestingOptionsSeparator: y,
                        maxReplaces: v,
                        alwaysFormat: b
                    } = e.interpolation;
                    this.escape = void 0 !== t ? t : f, this.escapeValue = void 0 === n || n, this.useRawValueToEscape = void 0 !== i && i, this.prefix = s ? c(s) : r || "{{", this.suffix = o ? c(o) : a || "}}", this.formatSeparator = l || ",", this.unescapePrefix = u ? "" : p || "-", this.unescapeSuffix = this.unescapePrefix ? "" : u || "", this.nestingPrefix = h ? c(h) : g || c("$t("), this.nestingSuffix = d ? c(d) : m || c(")"), this.nestingOptionsSeparator = y || ",", this.maxReplaces = v || 1e3, this.alwaysFormat = void 0 !== b && b, this.resetRegExp()
                }
                reset() {
                    this.options && this.init(this.options)
                }
                resetRegExp() {
                    let e = (e, t) => e && e.source === t ? (e.lastIndex = 0, e) : RegExp(t, "g");
                    this.regexp = e(this.regexp, `${this.prefix}(.+?)${this.suffix}`), this.regexpUnescape = e(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`), this.nestingRegexp = e(this.nestingRegexp, `${this.nestingPrefix}(.+?)${this.nestingSuffix}`)
                }
                interpolate(e, t, n, i) {
                    let s, r, o;
                    let a = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};

                    function u(e) {
                        return e.replace(/\$/g, "$$$$")
                    }
                    let p = e => {
                        if (0 > e.indexOf(this.formatSeparator)) {
                            let s = I(t, a, e, this.options.keySeparator, this.options.ignoreJSONStructure);
                            return this.alwaysFormat ? this.format(s, void 0, n, { ...i,
                                ...t,
                                interpolationkey: e
                            }) : s
                        }
                        let s = e.split(this.formatSeparator),
                            r = s.shift().trim(),
                            o = s.join(this.formatSeparator).trim();
                        return this.format(I(t, a, r, this.options.keySeparator, this.options.ignoreJSONStructure), o, n, { ...i,
                            ...t,
                            interpolationkey: r
                        })
                    };
                    this.resetRegExp();
                    let h = i && i.missingInterpolationHandler || this.options.missingInterpolationHandler,
                        g = i && i.interpolation && void 0 !== i.interpolation.skipOnVariables ? i.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
                    return [{
                        regex: this.regexpUnescape,
                        safeValue: e => u(e)
                    }, {
                        regex: this.regexp,
                        safeValue: e => this.escapeValue ? u(this.escape(e)) : u(e)
                    }].forEach(t => {
                        for (o = 0; s = t.regex.exec(e);) {
                            let n = s[1].trim();
                            if (void 0 === (r = p(n))) {
                                if ("function" == typeof h) {
                                    let t = h(e, s, i);
                                    r = "string" == typeof t ? t : ""
                                } else if (i && Object.prototype.hasOwnProperty.call(i, n)) r = "";
                                else if (g) {
                                    r = s[0];
                                    continue
                                } else this.logger.warn(`missed to pass in variable ${n} for interpolating ${e}`), r = ""
                            } else "string" == typeof r || this.useRawValueToEscape || (r = l(r));
                            let a = t.safeValue(r);
                            if (e = e.replace(s[0], a), g ? (t.regex.lastIndex += r.length, t.regex.lastIndex -= s[0].length) : t.regex.lastIndex = 0, ++o >= this.maxReplaces) break
                        }
                    }), e
                }
                nest(e, t) {
                    let n, i, s, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};

                    function o(e, t) {
                        let n = this.nestingOptionsSeparator;
                        if (0 > e.indexOf(n)) return e;
                        let i = e.split(RegExp(`${n}[ ]*{`)),
                            r = `{${i[1]}`;
                        e = i[0];
                        let o = (r = this.interpolate(r, s)).match(/'/g),
                            a = r.match(/"/g);
                        (o && o.length % 2 == 0 && !a || a.length % 2 != 0) && (r = r.replace(/'/g, '"'));
                        try {
                            s = JSON.parse(r), t && (s = { ...t,
                                ...s
                            })
                        } catch (t) {
                            return this.logger.warn(`failed parsing options string in nesting for key ${e}`, t), `${e}${n}${r}`
                        }
                        return s.defaultValue && s.defaultValue.indexOf(this.prefix) > -1 && delete s.defaultValue, e
                    }
                    for (; n = this.nestingRegexp.exec(e);) {
                        let a = [];
                        (s = (s = { ...r
                        }).replace && "string" != typeof s.replace ? s.replace : s).applyPostProcessor = !1, delete s.defaultValue;
                        let u = !1;
                        if (-1 !== n[0].indexOf(this.formatSeparator) && !/{.*}/.test(n[1])) {
                            let e = n[1].split(this.formatSeparator).map(e => e.trim());
                            n[1] = e.shift(), a = e, u = !0
                        }
                        if ((i = t(o.call(this, n[1].trim(), s), s)) && n[0] === e && "string" != typeof i) return i;
                        "string" != typeof i && (i = l(i)), i || (this.logger.warn(`missed to resolve ${n[1]} for nesting ${e}`), i = ""), u && (i = a.reduce((e, t) => this.format(e, t, r.lng, { ...r,
                            interpolationkey: n[1].trim()
                        }), i.trim())), e = e.replace(n[0], i), this.regexp.lastIndex = 0
                    }
                    return e
                }
            }

            function T(e) {
                let t = {};
                return function(n, i, s) {
                    let r = i + JSON.stringify(s),
                        o = t[r];
                    return o || (o = e(x(i), s), t[r] = o), o(n)
                }
            }
            class V {
                constructor() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this.logger = r.create("formatter"), this.options = e, this.formats = {
                        number: T((e, t) => {
                            let n = new Intl.NumberFormat(e, { ...t
                            });
                            return e => n.format(e)
                        }),
                        currency: T((e, t) => {
                            let n = new Intl.NumberFormat(e, { ...t,
                                style: "currency"
                            });
                            return e => n.format(e)
                        }),
                        datetime: T((e, t) => {
                            let n = new Intl.DateTimeFormat(e, { ...t
                            });
                            return e => n.format(e)
                        }),
                        relativetime: T((e, t) => {
                            let n = new Intl.RelativeTimeFormat(e, { ...t
                            });
                            return e => n.format(e, t.range || "day")
                        }),
                        list: T((e, t) => {
                            let n = new Intl.ListFormat(e, { ...t
                            });
                            return e => n.format(e)
                        })
                    }, this.init(e)
                }
                init(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                            interpolation: {}
                        },
                        n = t.interpolation;
                    this.formatSeparator = n.formatSeparator ? n.formatSeparator : n.formatSeparator || ","
                }
                add(e, t) {
                    this.formats[e.toLowerCase().trim()] = t
                }
                addCached(e, t) {
                    this.formats[e.toLowerCase().trim()] = T(t)
                }
                format(e, t, n) {
                    let i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    return t.split(this.formatSeparator).reduce((e, t) => {
                        let {
                            formatName: s,
                            formatOptions: r
                        } = function(e) {
                            let t = e.toLowerCase().trim(),
                                n = {};
                            if (e.indexOf("(") > -1) {
                                let i = e.split("(");
                                t = i[0].toLowerCase().trim();
                                let s = i[1].substring(0, i[1].length - 1);
                                "currency" === t && 0 > s.indexOf(":") ? n.currency || (n.currency = s.trim()) : "relativetime" === t && 0 > s.indexOf(":") ? n.range || (n.range = s.trim()) : s.split(";").forEach(e => {
                                    if (!e) return;
                                    let [t, ...i] = e.split(":"), s = i.join(":").trim().replace(/^'+|'+$/g, "");
                                    n[t.trim()] || (n[t.trim()] = s), "false" === s && (n[t.trim()] = !1), "true" === s && (n[t.trim()] = !0), isNaN(s) || (n[t.trim()] = parseInt(s, 10))
                                })
                            }
                            return {
                                formatName: t,
                                formatOptions: n
                            }
                        }(t);
                        if (this.formats[s]) {
                            let t = e;
                            try {
                                let o = i && i.formatParams && i.formatParams[i.interpolationkey] || {},
                                    a = o.locale || o.lng || i.locale || i.lng || n;
                                t = this.formats[s](e, a, { ...r,
                                    ...i,
                                    ...o
                                })
                            } catch (e) {
                                this.logger.warn(e)
                            }
                            return t
                        }
                        return this.logger.warn(`there was no format function for ${s}`), e
                    }, e)
                }
            }
            class A extends o {
                constructor(e, t, n) {
                    let i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    super(), this.backend = e, this.store = t, this.services = n, this.languageUtils = n.languageUtils, this.options = i, this.logger = r.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = i.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = i.maxRetries >= 0 ? i.maxRetries : 5, this.retryTimeout = i.retryTimeout >= 1 ? i.retryTimeout : 350, this.state = {}, this.queue = [], this.backend && this.backend.init && this.backend.init(n, i.backend, i)
                }
                queueLoad(e, t, n, i) {
                    let s = {},
                        r = {},
                        o = {},
                        a = {};
                    return e.forEach(e => {
                        let i = !0;
                        t.forEach(t => {
                            let o = `${e}|${t}`;
                            !n.reload && this.store.hasResourceBundle(e, t) ? this.state[o] = 2 : this.state[o] < 0 || (1 === this.state[o] ? void 0 === r[o] && (r[o] = !0) : (this.state[o] = 1, i = !1, void 0 === r[o] && (r[o] = !0), void 0 === s[o] && (s[o] = !0), void 0 === a[t] && (a[t] = !0)))
                        }), i || (o[e] = !0)
                    }), (Object.keys(s).length || Object.keys(r).length) && this.queue.push({
                        pending: r,
                        pendingCount: Object.keys(r).length,
                        loaded: {},
                        errors: [],
                        callback: i
                    }), {
                        toLoad: Object.keys(s),
                        pending: Object.keys(r),
                        toLoadLanguages: Object.keys(o),
                        toLoadNamespaces: Object.keys(a)
                    }
                }
                loaded(e, t, n) {
                    let i = e.split("|"),
                        s = i[0],
                        r = i[1];
                    t && this.emit("failedLoading", s, r, t), n && this.store.addResourceBundle(s, r, n, void 0, void 0, {
                        skipCopy: !0
                    }), this.state[e] = t ? -1 : 2;
                    let o = {};
                    this.queue.forEach(n => {
                        (function(e, t, n, i) {
                            let {
                                obj: s,
                                k: r
                            } = p(e, t, Object);
                            s[r] = s[r] || [], s[r].push(n)
                        })(n.loaded, [s], r), void 0 !== n.pending[e] && (delete n.pending[e], n.pendingCount--), t && n.errors.push(t), 0 !== n.pendingCount || n.done || (Object.keys(n.loaded).forEach(e => {
                            o[e] || (o[e] = {});
                            let t = n.loaded[e];
                            t.length && t.forEach(t => {
                                void 0 === o[e][t] && (o[e][t] = !0)
                            })
                        }), n.done = !0, n.errors.length ? n.callback(n.errors) : n.callback())
                    }), this.emit("loaded", o), this.queue = this.queue.filter(e => !e.done)
                }
                read(e, t, n) {
                    let i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
                        s = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : this.retryTimeout,
                        r = arguments.length > 5 ? arguments[5] : void 0;
                    if (!e.length) return r(null, {});
                    if (this.readingCalls >= this.maxParallelReads) {
                        this.waitingReads.push({
                            lng: e,
                            ns: t,
                            fcName: n,
                            tried: i,
                            wait: s,
                            callback: r
                        });
                        return
                    }
                    this.readingCalls++;
                    let o = (o, a) => {
                            if (this.readingCalls--, this.waitingReads.length > 0) {
                                let e = this.waitingReads.shift();
                                this.read(e.lng, e.ns, e.fcName, e.tried, e.wait, e.callback)
                            }
                            if (o && a && i < this.maxRetries) {
                                setTimeout(() => {
                                    this.read.call(this, e, t, n, i + 1, 2 * s, r)
                                }, s);
                                return
                            }
                            r(o, a)
                        },
                        a = this.backend[n].bind(this.backend);
                    if (2 === a.length) {
                        try {
                            let n = a(e, t);
                            n && "function" == typeof n.then ? n.then(e => o(null, e)).catch(o) : o(null, n)
                        } catch (e) {
                            o(e)
                        }
                        return
                    }
                    return a(e, t, o)
                }
                prepareLoading(e, t) {
                    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        i = arguments.length > 3 ? arguments[3] : void 0;
                    if (!this.backend) return this.logger.warn("No backend was added via i18next.use. Will not load resources."), i && i();
                    "string" == typeof e && (e = this.languageUtils.toResolveHierarchy(e)), "string" == typeof t && (t = [t]);
                    let s = this.queueLoad(e, t, n, i);
                    if (!s.toLoad.length) return s.pending.length || i(), null;
                    s.toLoad.forEach(e => {
                        this.loadOne(e)
                    })
                }
                load(e, t, n) {
                    this.prepareLoading(e, t, {}, n)
                }
                reload(e, t, n) {
                    this.prepareLoading(e, t, {
                        reload: !0
                    }, n)
                }
                loadOne(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                        n = e.split("|"),
                        i = n[0],
                        s = n[1];
                    this.read(i, s, "read", void 0, void 0, (n, r) => {
                        n && this.logger.warn(`${t}loading namespace ${s} for language ${i} failed`, n), !n && r && this.logger.log(`${t}loaded namespace ${s} for language ${i}`, r), this.loaded(e, n, r)
                    })
                }
                saveMissing(e, t, n, i, s) {
                    let r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {},
                        o = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : () => {};
                    if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(t)) {
                        this.logger.warn(`did not save key "${n}" as the namespace "${t}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
                        return
                    }
                    if (null != n && "" !== n) {
                        if (this.backend && this.backend.create) {
                            let a = { ...r,
                                    isUpdate: s
                                },
                                l = this.backend.create.bind(this.backend);
                            if (l.length < 6) try {
                                let s;
                                (s = 5 === l.length ? l(e, t, n, i, a) : l(e, t, n, i)) && "function" == typeof s.then ? s.then(e => o(null, e)).catch(o) : o(null, s)
                            } catch (e) {
                                o(e)
                            } else l(e, t, n, i, o, a)
                        }
                        e && e[0] && this.store.addResource(e[0], t, n, i)
                    }
                }
            }

            function D() {
                return {
                    debug: !1,
                    initImmediate: !0,
                    ns: ["translation"],
                    defaultNS: ["translation"],
                    fallbackLng: ["dev"],
                    fallbackNS: !1,
                    supportedLngs: !1,
                    nonExplicitSupportedLngs: !1,
                    load: "all",
                    preload: !1,
                    simplifyPluralSuffix: !0,
                    keySeparator: ".",
                    nsSeparator: ":",
                    pluralSeparator: "_",
                    contextSeparator: "_",
                    partialBundledLanguages: !1,
                    saveMissing: !1,
                    updateMissing: !1,
                    saveMissingTo: "fallback",
                    saveMissingPlurals: !0,
                    missingKeyHandler: !1,
                    missingInterpolationHandler: !1,
                    postProcess: !1,
                    postProcessPassResolved: !1,
                    returnNull: !1,
                    returnEmptyString: !0,
                    returnObjects: !1,
                    joinArrays: !1,
                    returnedObjectHandler: !1,
                    parseMissingKeyHandler: !1,
                    appendNamespaceToMissingKey: !1,
                    appendNamespaceToCIMode: !1,
                    overloadTranslationOptionHandler: function(e) {
                        let t = {};
                        if ("object" == typeof e[1] && (t = e[1]), "string" == typeof e[1] && (t.defaultValue = e[1]), "string" == typeof e[2] && (t.tDescription = e[2]), "object" == typeof e[2] || "object" == typeof e[3]) {
                            let n = e[3] || e[2];
                            Object.keys(n).forEach(e => {
                                t[e] = n[e]
                            })
                        }
                        return t
                    },
                    interpolation: {
                        escapeValue: !0,
                        format: e => e,
                        prefix: "{{",
                        suffix: "}}",
                        formatSeparator: ",",
                        unescapePrefix: "-",
                        nestingPrefix: "$t(",
                        nestingSuffix: ")",
                        nestingOptionsSeparator: ",",
                        maxReplaces: 1e3,
                        skipOnVariables: !0
                    }
                }
            }

            function U(e) {
                return "string" == typeof e.ns && (e.ns = [e.ns]), "string" == typeof e.fallbackLng && (e.fallbackLng = [e.fallbackLng]), "string" == typeof e.fallbackNS && (e.fallbackNS = [e.fallbackNS]), e.supportedLngs && 0 > e.supportedLngs.indexOf("cimode") && (e.supportedLngs = e.supportedLngs.concat(["cimode"])), e
            }

            function M() {}
            class K extends o {
                constructor() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = arguments.length > 1 ? arguments[1] : void 0;
                    if (super(), this.options = U(e), this.services = {}, this.logger = r, this.modules = {
                            external: []
                        }, ! function(e) {
                            Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach(t => {
                                "function" == typeof e[t] && (e[t] = e[t].bind(e))
                            })
                        }(this), t && !this.isInitialized && !e.isClone) {
                        if (!this.options.initImmediate) return this.init(e, t), this;
                        setTimeout(() => {
                            this.init(e, t)
                        }, 0)
                    }
                }
                init() {
                    var e = this;
                    let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        n = arguments.length > 1 ? arguments[1] : void 0;
                    this.isInitializing = !0, "function" == typeof t && (n = t, t = {}), !t.defaultNS && !1 !== t.defaultNS && t.ns && ("string" == typeof t.ns ? t.defaultNS = t.ns : 0 > t.ns.indexOf("translation") && (t.defaultNS = t.ns[0]));
                    let i = D();

                    function s(e) {
                        return e ? "function" == typeof e ? new e : e : null
                    }
                    if (this.options = { ...i,
                            ...this.options,
                            ...U(t)
                        }, "v1" !== this.options.compatibilityAPI && (this.options.interpolation = { ...i.interpolation,
                            ...this.options.interpolation
                        }), void 0 !== t.keySeparator && (this.options.userDefinedKeySeparator = t.keySeparator), void 0 !== t.nsSeparator && (this.options.userDefinedNsSeparator = t.nsSeparator), !this.options.isClone) {
                        let t;
                        this.modules.logger ? r.init(s(this.modules.logger), this.options) : r.init(null, this.options), this.modules.formatter ? t = this.modules.formatter : "undefined" != typeof Intl && (t = V);
                        let n = new $(this.options);
                        this.store = new k(this.options.resources, this.options);
                        let o = this.services;
                        o.logger = r, o.resourceStore = this.store, o.languageUtils = n, o.pluralResolver = new j(n, {
                            prepend: this.options.pluralSeparator,
                            compatibilityJSON: this.options.compatibilityJSON,
                            simplifyPluralSuffix: this.options.simplifyPluralSuffix
                        }), t && (!this.options.interpolation.format || this.options.interpolation.format === i.interpolation.format) && (o.formatter = s(t), o.formatter.init(o, this.options), this.options.interpolation.format = o.formatter.format.bind(o.formatter)), o.interpolator = new F(this.options), o.utils = {
                            hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
                        }, o.backendConnector = new A(s(this.modules.backend), o.resourceStore, o, this.options), o.backendConnector.on("*", function(t) {
                            for (var n = arguments.length, i = Array(n > 1 ? n - 1 : 0), s = 1; s < n; s++) i[s - 1] = arguments[s];
                            e.emit(t, ...i)
                        }), this.modules.languageDetector && (o.languageDetector = s(this.modules.languageDetector), o.languageDetector.init && o.languageDetector.init(o, this.options.detection, this.options)), this.modules.i18nFormat && (o.i18nFormat = s(this.modules.i18nFormat), o.i18nFormat.init && o.i18nFormat.init(this)), this.translator = new w(this.services, this.options), this.translator.on("*", function(t) {
                            for (var n = arguments.length, i = Array(n > 1 ? n - 1 : 0), s = 1; s < n; s++) i[s - 1] = arguments[s];
                            e.emit(t, ...i)
                        }), this.modules.external.forEach(e => {
                            e.init && e.init(this)
                        })
                    }
                    if (this.format = this.options.interpolation.format, n || (n = M), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
                        let e = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
                        e.length > 0 && "dev" !== e[0] && (this.options.lng = e[0])
                    }
                    this.services.languageDetector || this.options.lng || this.logger.warn("init: no languageDetector is used and no lng is defined"), ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach(t => {
                        this[t] = function() {
                            return e.store[t](...arguments)
                        }
                    }), ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach(t => {
                        this[t] = function() {
                            return e.store[t](...arguments), e
                        }
                    });
                    let o = a(),
                        l = () => {
                            let e = (e, t) => {
                                this.isInitializing = !1, this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), o.resolve(t), n(e, t)
                            };
                            if (this.languages && "v1" !== this.options.compatibilityAPI && !this.isInitialized) return e(null, this.t.bind(this));
                            this.changeLanguage(this.options.lng, e)
                        };
                    return this.options.resources || !this.options.initImmediate ? l() : setTimeout(l, 0), o
                }
                loadResources(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : M,
                        n = t,
                        i = "string" == typeof e ? e : this.language;
                    if ("function" == typeof e && (n = e), !this.options.resources || this.options.partialBundledLanguages) {
                        if (i && "cimode" === i.toLowerCase() && (!this.options.preload || 0 === this.options.preload.length)) return n();
                        let e = [],
                            t = t => {
                                t && "cimode" !== t && this.services.languageUtils.toResolveHierarchy(t).forEach(t => {
                                    "cimode" !== t && 0 > e.indexOf(t) && e.push(t)
                                })
                            };
                        i ? t(i) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(e => t(e)), this.options.preload && this.options.preload.forEach(e => t(e)), this.services.backendConnector.load(e, this.options.ns, e => {
                            e || this.resolvedLanguage || !this.language || this.setResolvedLanguage(this.language), n(e)
                        })
                    } else n(null)
                }
                reloadResources(e, t, n) {
                    let i = a();
                    return e || (e = this.languages), t || (t = this.options.ns), n || (n = M), this.services.backendConnector.reload(e, t, e => {
                        i.resolve(), n(e)
                    }), i
                }
                use(e) {
                    if (!e) throw Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
                    if (!e.type) throw Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
                    return "backend" === e.type && (this.modules.backend = e), ("logger" === e.type || e.log && e.warn && e.error) && (this.modules.logger = e), "languageDetector" === e.type && (this.modules.languageDetector = e), "i18nFormat" === e.type && (this.modules.i18nFormat = e), "postProcessor" === e.type && S.addPostProcessor(e), "formatter" === e.type && (this.modules.formatter = e), "3rdParty" === e.type && this.modules.external.push(e), this
                }
                setResolvedLanguage(e) {
                    if (e && this.languages && !(["cimode", "dev"].indexOf(e) > -1))
                        for (let e = 0; e < this.languages.length; e++) {
                            let t = this.languages[e];
                            if (!(["cimode", "dev"].indexOf(t) > -1) && this.store.hasLanguageSomeTranslations(t)) {
                                this.resolvedLanguage = t;
                                break
                            }
                        }
                }
                changeLanguage(e, t) {
                    var n = this;
                    this.isLanguageChangingTo = e;
                    let i = a();
                    this.emit("languageChanging", e);
                    let s = e => {
                            this.language = e, this.languages = this.services.languageUtils.toResolveHierarchy(e), this.resolvedLanguage = void 0, this.setResolvedLanguage(e)
                        },
                        r = (e, r) => {
                            r ? (s(r), this.translator.changeLanguage(r), this.isLanguageChangingTo = void 0, this.emit("languageChanged", r), this.logger.log("languageChanged", r)) : this.isLanguageChangingTo = void 0, i.resolve(function() {
                                return n.t(...arguments)
                            }), t && t(e, function() {
                                return n.t(...arguments)
                            })
                        },
                        o = t => {
                            e || t || !this.services.languageDetector || (t = []);
                            let n = "string" == typeof t ? t : this.services.languageUtils.getBestMatchFromCodes(t);
                            n && (this.language || s(n), this.translator.language || this.translator.changeLanguage(n), this.services.languageDetector && this.services.languageDetector.cacheUserLanguage && this.services.languageDetector.cacheUserLanguage(n)), this.loadResources(n, e => {
                                r(e, n)
                            })
                        };
                    return e || !this.services.languageDetector || this.services.languageDetector.async ? !e && this.services.languageDetector && this.services.languageDetector.async ? 0 === this.services.languageDetector.detect.length ? this.services.languageDetector.detect().then(o) : this.services.languageDetector.detect(o) : o(e) : o(this.services.languageDetector.detect()), i
                }
                getFixedT(e, t, n) {
                    var i = this;
                    let s = function(e, t) {
                        let r, o;
                        if ("object" != typeof t) {
                            for (var a = arguments.length, l = Array(a > 2 ? a - 2 : 0), u = 2; u < a; u++) l[u - 2] = arguments[u];
                            r = i.options.overloadTranslationOptionHandler([e, t].concat(l))
                        } else r = { ...t
                        };
                        r.lng = r.lng || s.lng, r.lngs = r.lngs || s.lngs, r.ns = r.ns || s.ns, r.keyPrefix = r.keyPrefix || n || s.keyPrefix;
                        let p = i.options.keySeparator || ".";
                        return o = r.keyPrefix && Array.isArray(e) ? e.map(e => `${r.keyPrefix}${p}${e}`) : r.keyPrefix ? `${r.keyPrefix}${p}${e}` : e, i.t(o, r)
                    };
                    return "string" == typeof e ? s.lng = e : s.lngs = e, s.ns = t, s.keyPrefix = n, s
                }
                t() {
                    return this.translator && this.translator.translate(...arguments)
                }
                exists() {
                    return this.translator && this.translator.exists(...arguments)
                }
                setDefaultNamespace(e) {
                    this.options.defaultNS = e
                }
                hasLoadedNamespace(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    if (!this.isInitialized) return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages), !1;
                    if (!this.languages || !this.languages.length) return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages), !1;
                    let n = t.lng || this.resolvedLanguage || this.languages[0],
                        i = !!this.options && this.options.fallbackLng,
                        s = this.languages[this.languages.length - 1];
                    if ("cimode" === n.toLowerCase()) return !0;
                    let r = (e, t) => {
                        let n = this.services.backendConnector.state[`${e}|${t}`];
                        return -1 === n || 2 === n
                    };
                    if (t.precheck) {
                        let e = t.precheck(this, r);
                        if (void 0 !== e) return e
                    }
                    return !!(this.hasResourceBundle(n, e) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages || r(n, e) && (!i || r(s, e)))
                }
                loadNamespaces(e, t) {
                    let n = a();
                    return this.options.ns ? ("string" == typeof e && (e = [e]), e.forEach(e => {
                        0 > this.options.ns.indexOf(e) && this.options.ns.push(e)
                    }), this.loadResources(e => {
                        n.resolve(), t && t(e)
                    }), n) : (t && t(), Promise.resolve())
                }
                loadLanguages(e, t) {
                    let n = a();
                    "string" == typeof e && (e = [e]);
                    let i = this.options.preload || [],
                        s = e.filter(e => 0 > i.indexOf(e) && this.services.languageUtils.isSupportedCode(e));
                    return s.length ? (this.options.preload = i.concat(s), this.loadResources(e => {
                        n.resolve(), t && t(e)
                    }), n) : (t && t(), Promise.resolve())
                }
                dir(e) {
                    return (e || (e = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language)), e) ? ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"].indexOf((this.services && this.services.languageUtils || new $(D())).getLanguagePartFromCode(e)) > -1 || e.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr" : "rtl"
                }
                static createInstance() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = arguments.length > 1 ? arguments[1] : void 0;
                    return new K(e, t)
                }
                cloneInstance() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : M,
                        n = e.forkResourceStore;
                    n && delete e.forkResourceStore;
                    let i = { ...this.options,
                            ...e,
                            isClone: !0
                        },
                        s = new K(i);
                    return (void 0 !== e.debug || void 0 !== e.prefix) && (s.logger = s.logger.clone(e)), ["store", "services", "language"].forEach(e => {
                        s[e] = this[e]
                    }), s.services = { ...this.services
                    }, s.services.utils = {
                        hasLoadedNamespace: s.hasLoadedNamespace.bind(s)
                    }, n && (s.store = new k(this.store.data, i), s.services.resourceStore = s.store), s.translator = new w(s.services, i), s.translator.on("*", function(e) {
                        for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) n[i - 1] = arguments[i];
                        s.emit(e, ...n)
                    }), s.init(i, t), s.translator.options = i, s.translator.backendConnector.services.utils = {
                        hasLoadedNamespace: s.hasLoadedNamespace.bind(s)
                    }, s
                }
                toJSON() {
                    return {
                        options: this.options,
                        store: this.store,
                        language: this.language,
                        languages: this.languages,
                        resolvedLanguage: this.resolvedLanguage
                    }
                }
            }
            let z = K.createInstance();
            z.createInstance = K.createInstance;
            let B = z.createInstance;
            z.dir, z.init, z.loadResources, z.reloadResources, z.use, z.changeLanguage, z.getFixedT, z.t, z.exists, z.setDefaultNamespace, z.hasLoadedNamespace, z.loadNamespaces, z.loadLanguages
        },
        92196: function(e, t, n) {
            "use strict";
            n.d(t, {
                x0: function() {
                    return i
                }
            });
            let i = (e = 21) => {
                let t = "",
                    n = crypto.getRandomValues(new Uint8Array(e));
                for (; e--;) t += "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict" [63 & n[e]];
                return t
            }
        },
        25687: function(e, t, n) {
            "use strict";
            n.d(t, {
                c: function() {
                    return v
                }
            });
            var i = n(7653),
                s = n(85307),
                r = n.n(s),
                o = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;

            function a(e) {
                var t = {
                        type: "tag",
                        name: "",
                        voidElement: !1,
                        attrs: {},
                        children: []
                    },
                    n = e.match(/<\/?([^\s]+?)[/\s>]/);
                if (n && (t.name = n[1], (r()[n[1]] || "/" === e.charAt(e.length - 2)) && (t.voidElement = !0), t.name.startsWith("!--"))) {
                    var i = e.indexOf("-->");
                    return {
                        type: "comment",
                        comment: -1 !== i ? e.slice(4, i) : ""
                    }
                }
                for (var s = new RegExp(o), a = null; null !== (a = s.exec(e));)
                    if (a[0].trim()) {
                        if (a[1]) {
                            var l = a[1].trim(),
                                u = [l, ""];
                            l.indexOf("=") > -1 && (u = l.split("=")), t.attrs[u[0]] = u[1], s.lastIndex--
                        } else a[2] && (t.attrs[a[2]] = a[3].trim().substring(1, a[3].length - 1))
                    }
                return t
            }
            var l = /<[a-zA-Z0-9\-\!\/](?:"[^"]*"|'[^']*'|[^'">])*>/g,
                u = /^\s*$/,
                p = Object.create(null),
                h = {
                    parse: function(e, t) {
                        t || (t = {}), t.components || (t.components = p);
                        var n, i = [],
                            s = [],
                            r = -1,
                            o = !1;
                        if (0 !== e.indexOf("<")) {
                            var h = e.indexOf("<");
                            i.push({
                                type: "text",
                                content: -1 === h ? e : e.substring(0, h)
                            })
                        }
                        return e.replace(l, function(l, p) {
                            if (o) {
                                if (l !== "</" + n.name + ">") return;
                                o = !1
                            }
                            var h, g = "/" !== l.charAt(1),
                                c = l.startsWith("<!--"),
                                d = p + l.length,
                                f = e.charAt(d);
                            if (c) {
                                var m = a(l);
                                return r < 0 ? i.push(m) : (h = s[r]).children.push(m), i
                            }
                            if (g && (r++, "tag" === (n = a(l)).type && t.components[n.name] && (n.type = "component", o = !0), n.voidElement || o || !f || "<" === f || n.children.push({
                                    type: "text",
                                    content: e.slice(d, e.indexOf("<", d))
                                }), 0 === r && i.push(n), (h = s[r - 1]) && h.children.push(n), s[r] = n), (!g || n.voidElement) && (r > -1 && (n.voidElement || n.name === l.slice(2, -1)) && (n = -1 == --r ? i : s[r]), !o && "<" !== f && f)) {
                                h = -1 === r ? i : s[r].children;
                                var y = e.indexOf("<", d),
                                    v = e.slice(d, -1 === y ? void 0 : y);
                                u.test(v) && (v = " "), (y > -1 && r + h.length >= 0 || " " !== v) && h.push({
                                    type: "text",
                                    content: v
                                })
                            }
                        }), i
                    }
                },
                g = n(52888),
                c = n(91805),
                d = n(35234);

            function f(e, t) {
                if (!e) return !1;
                let n = e.props ? e.props.children : e.children;
                return t ? n.length > 0 : !!n
            }

            function m(e) {
                if (!e) return [];
                let t = e.props ? e.props.children : e.children;
                return e.props && e.props.i18nIsDynamicList ? y(t) : t
            }

            function y(e) {
                return Array.isArray(e) ? e : [e]
            }

            function v(e) {
                let {
                    children: t,
                    count: n,
                    parent: s,
                    i18nKey: r,
                    context: o,
                    tOptions: a = {},
                    values: l,
                    defaults: u,
                    components: p,
                    ns: v,
                    i18n: b,
                    t: x,
                    shouldUnescape: k,
                    ...S
                } = e, O = b || (0, d.n)();
                if (!O) return (0, g.O4)("You will need to pass in an i18next instance by using i18nextReactModule"), t;
                let w = x || O.t.bind(O) || (e => e),
                    L = { ...(0, c.J)(),
                        ...O.options && O.options.react
                    },
                    $ = v || w.ns || O.options && O.options.defaultNS;
                $ = "string" == typeof $ ? [$] : $ || ["translation"];
                let N = function e(t, n) {
                        if (!t) return "";
                        let s = "",
                            r = y(t),
                            o = n.transSupportBasicHtmlNodes && n.transKeepBasicHtmlNodesFor ? n.transKeepBasicHtmlNodesFor : [];
                        return r.forEach((t, r) => {
                            if ("string" == typeof t) s += `${t}`;
                            else if ((0, i.isValidElement)(t)) {
                                let i = Object.keys(t.props).length,
                                    a = o.indexOf(t.type) > -1,
                                    l = t.props.children;
                                if (!l && a && 0 === i) s += `<${t.type}/>`;
                                else if (l || a && 0 === i) {
                                    if (t.props.i18nIsDynamicList) s += `<${r}></${r}>`;
                                    else if (a && 1 === i && "string" == typeof l) s += `<${t.type}>${l}</${t.type}>`;
                                    else {
                                        let t = e(l, n);
                                        s += `<${r}>${t}</${r}>`
                                    }
                                } else s += `<${r}></${r}>`
                            } else if (null === t)(0, g.ZK)("Trans: the passed in value is invalid - seems you passed in a null child.");
                            else if ("object" == typeof t) {
                                let {
                                    format: e,
                                    ...n
                                } = t, i = Object.keys(n);
                                if (1 === i.length) {
                                    let t = e ? `${i[0]}, ${e}` : i[0];
                                    s += `{{${t}}}`
                                } else(0, g.ZK)("react-i18next: the passed in object contained more than one variable - the object should look like {{ value, format }} where format is optional.", t)
                            } else(0, g.ZK)("Trans: the passed in value is invalid - seems you passed in a variable like {number} - please pass in variables for interpolation as full objects like {{number}}.", t)
                        }), s
                    }(t, L),
                    C = u || N || L.transEmptyNodeValue || r,
                    {
                        hashTransKey: R
                    } = L,
                    P = r || (R ? R(N || C) : N || C);
                O.options && O.options.interpolation && O.options.interpolation.defaultVariables && (l = l && Object.keys(l).length > 0 ? { ...l,
                    ...O.options.interpolation.defaultVariables
                } : { ...O.options.interpolation.defaultVariables
                });
                let E = { ...a,
                        context: o || a.context,
                        count: n,
                        ...l,
                        defaultValue: C,
                        ns: $
                    },
                    j = P ? w(P, E) : C;
                p && Object.keys(p).forEach(e => {
                    let t = p[e];
                    "function" == typeof t.type || !t.props || !t.props.children || 0 > j.indexOf(`${e}/>`) && 0 > j.indexOf(`${e} />`) || (p[e] = (0, i.createElement)(function() {
                        return (0, i.createElement)(i.Fragment, null, t)
                    }))
                });
                let I = function(e, t, n, s, r, o) {
                        if ("" === t) return [];
                        let a = s.transKeepBasicHtmlNodesFor || [],
                            l = t && new RegExp(a.map(e => `<${e}`).join("|")).test(t);
                        if (!e && !l && !o) return [t];
                        let u = {};
                        ! function e(t) {
                            y(t).forEach(t => {
                                "string" == typeof t || (f(t) ? e(m(t)) : "object" != typeof t || (0, i.isValidElement)(t) || Object.assign(u, t))
                            })
                        }(e);
                        let p = h.parse(`<0>${t}</0>`),
                            g = { ...u,
                                ...r
                            };

                        function c(e, t, n) {
                            let s = m(e),
                                r = v(s, t.children, n);
                            return "[object Array]" === Object.prototype.toString.call(s) && s.every(e => (0, i.isValidElement)(e)) && 0 === r.length || e.props && e.props.i18nIsDynamicList ? s : r
                        }

                        function d(e, t, n, s, r) {
                            e.dummy ? (e.children = t, n.push((0, i.cloneElement)(e, {
                                key: s
                            }, r ? void 0 : t))) : n.push(...i.Children.map([e], e => {
                                let n = { ...e.props
                                };
                                return delete n.i18nIsDynamicList, (0, i.createElement)(e.type, { ...n,
                                    key: s,
                                    ref: e.ref
                                }, r ? null : t)
                            }))
                        }

                        function v(t, r, u) {
                            let p = y(t);
                            return y(r).reduce((t, r, h) => {
                                let m = r.children && r.children[0] && r.children[0].content && n.services.interpolator.interpolate(r.children[0].content, g, n.language);
                                if ("tag" === r.type) {
                                    let o = p[parseInt(r.name, 10)];
                                    1 !== u.length || o || (o = u[0][r.name]), o || (o = {});
                                    let y = 0 !== Object.keys(r.attrs).length ? function(e, t) {
                                            let n = { ...t
                                            };
                                            return n.props = Object.assign(e.props, t.props), n
                                        }({
                                            props: r.attrs
                                        }, o) : o,
                                        b = (0, i.isValidElement)(y),
                                        x = b && f(r, !0) && !r.voidElement,
                                        k = l && "object" == typeof y && y.dummy && !b,
                                        S = "object" == typeof e && null !== e && Object.hasOwnProperty.call(e, r.name);
                                    if ("string" == typeof y) {
                                        let e = n.services.interpolator.interpolate(y, g, n.language);
                                        t.push(e)
                                    } else if (f(y) || x) {
                                        let e = c(y, r, u);
                                        d(y, e, t, h)
                                    } else if (k) d(y, v(p, r.children, u), t, h);
                                    else if (Number.isNaN(parseFloat(r.name))) {
                                        if (S) {
                                            let e = c(y, r, u);
                                            d(y, e, t, h, r.voidElement)
                                        } else if (s.transSupportBasicHtmlNodes && a.indexOf(r.name) > -1) {
                                            if (r.voidElement) t.push((0, i.createElement)(r.name, {
                                                key: `${r.name}-${h}`
                                            }));
                                            else {
                                                let e = v(p, r.children, u);
                                                t.push((0, i.createElement)(r.name, {
                                                    key: `${r.name}-${h}`
                                                }, e))
                                            }
                                        } else if (r.voidElement) t.push(`<${r.name} />`);
                                        else {
                                            let e = v(p, r.children, u);
                                            t.push(`<${r.name}>${e}</${r.name}>`)
                                        }
                                    } else if ("object" != typeof y || b) d(y, m, t, h, 1 !== r.children.length || !m);
                                    else {
                                        let e = r.children[0] ? m : null;
                                        e && t.push(e)
                                    }
                                } else if ("text" === r.type) {
                                    let e = s.transWrapTextNodes,
                                        a = o ? s.unescape(n.services.interpolator.interpolate(r.content, g, n.language)) : n.services.interpolator.interpolate(r.content, g, n.language);
                                    e ? t.push((0, i.createElement)(e, {
                                        key: `${r.name}-${h}`
                                    }, a)) : t.push(a)
                                }
                                return t
                            }, [])
                        }
                        return m(v([{
                            dummy: !0,
                            children: e || []
                        }], p, y(e || []))[0])
                    }(p || t, j, O, L, E, k),
                    F = void 0 !== s ? s : L.defaultTransParent;
                return F ? (0, i.createElement)(F, S, I) : I
            }
        },
        91805: function(e, t, n) {
            "use strict";
            n.d(t, {
                J: function() {
                    return l
                },
                j: function() {
                    return a
                }
            });
            let i = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g,
                s = {
                    "&amp;": "&",
                    "&#38;": "&",
                    "&lt;": "<",
                    "&#60;": "<",
                    "&gt;": ">",
                    "&#62;": ">",
                    "&apos;": "'",
                    "&#39;": "'",
                    "&quot;": '"',
                    "&#34;": '"',
                    "&nbsp;": " ",
                    "&#160;": " ",
                    "&copy;": "\xa9",
                    "&#169;": "\xa9",
                    "&reg;": "\xae",
                    "&#174;": "\xae",
                    "&hellip;": "…",
                    "&#8230;": "…",
                    "&#x2F;": "/",
                    "&#47;": "/"
                },
                r = e => s[e],
                o = {
                    bindI18n: "languageChanged",
                    bindI18nStore: "",
                    transEmptyNodeValue: "",
                    transSupportBasicHtmlNodes: !0,
                    transWrapTextNodes: "",
                    transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
                    useSuspense: !0,
                    unescape: e => e.replace(i, r)
                };

            function a() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                o = { ...o,
                    ...e
                }
            }

            function l() {
                return o
            }
        },
        35234: function(e, t, n) {
            "use strict";
            let i;

            function s(e) {
                i = e
            }

            function r() {
                return i
            }
            n.d(t, {
                I: function() {
                    return s
                },
                n: function() {
                    return r
                }
            })
        },
        19237: function(e, t, n) {
            "use strict";
            n.d(t, {
                cC: function() {
                    return p
                },
                Db: function() {
                    return a.D
                },
                $G: function() {
                    return d
                }
            });
            var i = n(7653),
                s = n(25687),
                r = n(91805),
                o = n(35234),
                a = n(34666);
            let l = (0, i.createContext)();
            class u {
                constructor() {
                    this.usedNamespaces = {}
                }
                addUsedNamespaces(e) {
                    e.forEach(e => {
                        this.usedNamespaces[e] || (this.usedNamespaces[e] = !0)
                    })
                }
                getUsedNamespaces() {
                    return Object.keys(this.usedNamespaces)
                }
            }

            function p(e) {
                let {
                    children: t,
                    count: n,
                    parent: r,
                    i18nKey: a,
                    context: u,
                    tOptions: p = {},
                    values: h,
                    defaults: g,
                    components: c,
                    ns: d,
                    i18n: f,
                    t: m,
                    shouldUnescape: y,
                    ...v
                } = e, {
                    i18n: b,
                    defaultNS: x
                } = (0, i.useContext)(l) || {}, k = f || b || (0, o.n)(), S = m || k && k.t.bind(k);
                return (0, s.c)({
                    children: t,
                    count: n,
                    parent: r,
                    i18nKey: a,
                    context: u,
                    tOptions: p,
                    values: h,
                    defaults: g,
                    components: c,
                    ns: d || S && S.ns || x || k && k.options && k.options.defaultNS,
                    i18n: k,
                    t: m,
                    shouldUnescape: y,
                    ...v
                })
            }
            var h = n(52888);
            let g = (e, t) => {
                let n = (0, i.useRef)();
                return (0, i.useEffect)(() => {
                    n.current = t ? n.current : e
                }, [e, t]), n.current
            };

            function c(e, t, n, i) {
                return e.getFixedT(t, n, i)
            }

            function d(e) {
                var t, n;
                let s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    {
                        i18n: a
                    } = s,
                    {
                        i18n: p,
                        defaultNS: d
                    } = (0, i.useContext)(l) || {},
                    f = a || p || (0, o.n)();
                if (f && !f.reportNamespaces && (f.reportNamespaces = new u), !f) {
                    (0, h.O4)("You will need to pass in an i18next instance by using initReactI18next");
                    let e = (e, t) => "string" == typeof t ? t : t && "object" == typeof t && "string" == typeof t.defaultValue ? t.defaultValue : Array.isArray(e) ? e[e.length - 1] : e,
                        t = [e, {}, !1];
                    return t.t = e, t.i18n = {}, t.ready = !1, t
                }
                f.options.react && void 0 !== f.options.react.wait && (0, h.O4)("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");
                let m = { ...(0, r.J)(),
                        ...f.options.react,
                        ...s
                    },
                    {
                        useSuspense: y,
                        keyPrefix: v
                    } = m,
                    b = e || d || f.options && f.options.defaultNS;
                b = "string" == typeof b ? [b] : b || ["translation"], f.reportNamespaces.addUsedNamespaces && f.reportNamespaces.addUsedNamespaces(b);
                let x = (f.isInitialized || f.initializedStoreOnce) && b.every(e => (0, h.F0)(e, f, m)),
                    k = (t = s.lng || null, n = "fallback" === m.nsMode ? b : b[0], (0, i.useCallback)(c(f, t, n, v), [f, t, n, v])),
                    S = () => k,
                    O = () => c(f, s.lng || null, "fallback" === m.nsMode ? b : b[0], v),
                    [w, L] = (0, i.useState)(S),
                    $ = b.join();
                s.lng && ($ = `${s.lng}${$}`);
                let N = g($),
                    C = (0, i.useRef)(!0);
                (0, i.useEffect)(() => {
                    let {
                        bindI18n: e,
                        bindI18nStore: t
                    } = m;

                    function n() {
                        C.current && L(O)
                    }
                    return C.current = !0, x || y || (s.lng ? (0, h.Nl)(f, s.lng, b, () => {
                        C.current && L(O)
                    }) : (0, h.DC)(f, b, () => {
                        C.current && L(O)
                    })), x && N && N !== $ && C.current && L(O), e && f && f.on(e, n), t && f && f.store.on(t, n), () => {
                        C.current = !1, e && f && e.split(" ").forEach(e => f.off(e, n)), t && f && t.split(" ").forEach(e => f.store.off(e, n))
                    }
                }, [f, $]), (0, i.useEffect)(() => {
                    C.current && x && L(S)
                }, [f, v, x]);
                let R = [w, f, x];
                if (R.t = w, R.i18n = f, R.ready = x, x || !x && !y) return R;
                throw new Promise(e => {
                    s.lng ? (0, h.Nl)(f, s.lng, b, () => e()) : (0, h.DC)(f, b, () => e())
                })
            }
        },
        34666: function(e, t, n) {
            "use strict";
            n.d(t, {
                D: function() {
                    return r
                }
            });
            var i = n(91805),
                s = n(35234);
            let r = {
                type: "3rdParty",
                init(e) {
                    (0, i.j)(e.options.react), (0, s.I)(e)
                }
            }
        },
        52888: function(e, t, n) {
            "use strict";

            function i() {
                if (console && console.warn) {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    "string" == typeof t[0] && (t[0] = `react-i18next:: ${t[0]}`), console.warn(...t)
                }
            }
            n.d(t, {
                DC: function() {
                    return a
                },
                F0: function() {
                    return u
                },
                Nl: function() {
                    return l
                },
                O4: function() {
                    return r
                },
                ZK: function() {
                    return i
                }
            });
            let s = {};

            function r() {
                for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                "string" == typeof t[0] && s[t[0]] || ("string" == typeof t[0] && (s[t[0]] = new Date), i(...t))
            }
            let o = (e, t) => () => {
                if (e.isInitialized) t();
                else {
                    let n = () => {
                        setTimeout(() => {
                            e.off("initialized", n)
                        }, 0), t()
                    };
                    e.on("initialized", n)
                }
            };

            function a(e, t, n) {
                e.loadNamespaces(t, o(e, n))
            }

            function l(e, t, n, i) {
                "string" == typeof n && (n = [n]), n.forEach(t => {
                    0 > e.options.ns.indexOf(t) && e.options.ns.push(t)
                }), e.loadLanguages(t, o(e, i))
            }

            function u(e, t) {
                let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                return t.languages && t.languages.length ? void 0 !== t.options.ignoreJSONStructure ? t.hasLoadedNamespace(e, {
                    lng: n.lng,
                    precheck: (t, i) => {
                        if (n.bindI18n && n.bindI18n.indexOf("languageChanging") > -1 && t.services.backendConnector.backend && t.isLanguageChangingTo && !i(t.isLanguageChangingTo, e)) return !1
                    }
                }) : function(e, t) {
                    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        i = t.languages[0],
                        s = !!t.options && t.options.fallbackLng,
                        r = t.languages[t.languages.length - 1];
                    if ("cimode" === i.toLowerCase()) return !0;
                    let o = (e, n) => {
                        let i = t.services.backendConnector.state[`${e}|${n}`];
                        return -1 === i || 2 === i
                    };
                    return (!(n.bindI18n && n.bindI18n.indexOf("languageChanging") > -1) || !t.services.backendConnector.backend || !t.isLanguageChangingTo || !!o(t.isLanguageChangingTo, e)) && !!(t.hasResourceBundle(i, e) || !t.services.backendConnector.backend || t.options.resources && !t.options.partialBundledLanguages || o(i, e) && (!s || o(r, e)))
                }(e, t, n) : (r("i18n.languages were undefined or empty", t.languages), !0)
            }
        },
        92607: function(e, t, n) {
            "use strict";
            n.d(t, {
                P: function() {
                    return c
                }
            });
            var i = n(7653);
            n(27573);
            var s = e => {
                    let t = e;
                    for (; t = t.parentElement;) {
                        let e = getComputedStyle(t, null).getPropertyValue("overflow-y");
                        if (t === document.body) break;
                        if ("auto" === e || "scroll" === e || "overlay" === e) return t
                    }
                    return window
                },
                r = e => !e.firstChild || e.firstChild.offsetParent === e,
                o = (e, t) => {
                    let n = e,
                        i = 0;
                    r(t) || (i += e.offsetTop - t.offsetTop, t = e.offsetParent, i += -e.offsetTop);
                    do i += n.offsetTop, n = n.offsetParent; while (n && n !== t);
                    return i
                },
                a = e => {
                    let t = e.parentElement;
                    for (; t && "contents" === getComputedStyle(t, null).getPropertyValue("display");) t = t.parentElement;
                    return t || window
                },
                l = null;
            "undefined" != typeof CSS && CSS.supports && (CSS.supports("position", "sticky") ? l = "sticky" : CSS.supports("position", "-webkit-sticky") && (l = "-webkit-sticky"));
            var u = !1;
            try {
                let e = Object.defineProperty({}, "passive", {
                        get() {
                            u = {
                                passive: !0
                            }
                        }
                    }),
                    t = () => {};
                window.addEventListener("testPassive", t, e), window.removeEventListener("testPassive", t, e)
            } catch (e) {}
            var p = e => {
                    let {
                        el: t,
                        onChange: n,
                        unsubs: i,
                        measure: s
                    } = e;
                    if (t === window) {
                        let e = () => ({
                                top: 0,
                                left: 0,
                                height: window.innerHeight,
                                width: window.innerWidth
                            }),
                            t = s(e()),
                            r = () => {
                                Object.assign(t, s(e())), n()
                            };
                        return window.addEventListener("resize", r, u), i.push(() => window.removeEventListener("resize", r)), t
                    } {
                        let e = s(t.getBoundingClientRect()),
                            r = new ResizeObserver(() => {
                                Object.assign(e, s(t.getBoundingClientRect())), n()
                            });
                        return r.observe(t), i.push(() => r.disconnect()), e
                    }
                },
                h = e => {
                    let t = getComputedStyle(e, null);
                    return {
                        top: parseInt(t.getPropertyValue("padding-top"), 10),
                        bottom: parseInt(t.getPropertyValue("padding-bottom"), 10)
                    }
                },
                g = (e, t, n) => {
                    let {
                        bottom: i,
                        offsetBottom: g,
                        offsetTop: c
                    } = n, d = s(e), f = !1, m = () => {
                        f || requestAnimationFrame(() => {
                            let t = b();
                            if (t !== N) C(t);
                            else if (1 !== t || i) {
                                if (2 === t) {
                                    let {
                                        height: t,
                                        offsetTop: n
                                    } = k, {
                                        height: s,
                                        naturalTop: r
                                    } = w, {
                                        height: o
                                    } = L, a = Math.max(0, n + y + t - (r + o + g));
                                    i ? e.style.bottom = `${Math.max(0,s-o-a)}px` : e.style.top = `${a}px`
                                }
                            } else {
                                let {
                                    height: t
                                } = k, {
                                    height: n
                                } = L;
                                e.style.top = `${t-n-g}px`
                            }
                            f = !1
                        }), f = !0
                    }, y = d === window ? window.scrollY : d.scrollTop, v = e => {
                        let {
                            offsetTop: t,
                            height: n
                        } = k, {
                            naturalTop: i
                        } = w, {
                            height: s
                        } = L;
                        return e + t + n >= i + s + $ + g
                    }, b = () => {
                        let {
                            height: e
                        } = k, {
                            height: t
                        } = L;
                        return t + c + g <= e ? 3 : v(y) ? 1 : 2
                    }, x = d !== window && r(d), k = p({
                        el: d,
                        onChange: m,
                        unsubs: t,
                        measure: ({
                            height: e,
                            top: t
                        }) => ({
                            height: e,
                            offsetTop: x ? t : 0
                        })
                    }), S = a(e), O = S === window ? {
                        top: 0,
                        bottom: 0
                    } : h(S), w = p({
                        el: S,
                        onChange: m,
                        unsubs: t,
                        measure: ({
                            height: e
                        }) => ({
                            height: e - O.top - O.bottom,
                            naturalTop: S === window ? 0 : o(S, d) + O.top + k.offsetTop
                        })
                    }), L = p({
                        el: e,
                        onChange: m,
                        unsubs: t,
                        measure: ({
                            height: e
                        }) => ({
                            height: e
                        })
                    }), $ = 0, N = b(), C = t => {
                        let n = N;
                        if (N = t, 2 === n && ($ = -1), 3 === t) {
                            e.style.position = l, i ? e.style.bottom = `${g}px` : e.style.top = `${c}px`;
                            return
                        }
                        let {
                            height: s,
                            offsetTop: r
                        } = k, {
                            height: o,
                            naturalTop: a
                        } = w, {
                            height: u
                        } = L;
                        if (2 === t) {
                            if (e.style.position = "relative", $ = 0 === n ? Math.max(0, r + y - a + c) : Math.max(0, r + y + s - (a + u + g)), i) {
                                let t = Math.max(0, o - u - $);
                                e.style.bottom = `${t}px`
                            } else e.style.top = `${$}px`
                        } else e.style.position = l, 1 === t ? i ? e.style.bottom = `${g}px` : e.style.top = `${s-u-g}px` : i ? e.style.bottom = `${s-u-g}px` : e.style.top = `${c}px`
                    };
                    C(N);
                    let R = e => {
                            if (e === y) return;
                            let t = e - y;
                            if (y = e, 3 === N) return;
                            let {
                                offsetTop: n,
                                height: i
                            } = k, {
                                naturalTop: s,
                                height: r
                            } = w, {
                                height: o
                            } = L;
                            if (t > 0) {
                                if (0 === N) {
                                    if (e + n + c > s) {
                                        let t = Math.max(0, n + y - s + c);
                                        e + n + i <= s + o + t + g ? C(2) : C(1)
                                    }
                                } else 2 === N && v(e) && C(1)
                            } else if (1 === N) {
                                if (n + e + i < s + r + g) {
                                    let t = Math.max(0, n + y + i - (s + o + g));
                                    n + e + c >= s + t ? C(2) : C(0)
                                }
                            } else 2 === N && n + e + c < s + $ && C(0)
                        },
                        P = d === window ? () => R(window.scrollY) : () => R(d.scrollTop);
                    d.addEventListener("scroll", P, u), d.addEventListener("mousewheel", P, u), t.push(() => d.removeEventListener("scroll", P), () => d.removeEventListener("mousewheel", P))
                },
                c = ({
                    offsetTop: e = 0,
                    offsetBottom: t = 0,
                    bottom: n = !1
                } = {}) => {
                    let [s, r] = (0, i.useState)(null);
                    return (0, i.useEffect)(() => {
                        if (!s || !l) return;
                        let i = [];
                        return g(s, i, {
                            offsetBottom: t,
                            offsetTop: e,
                            bottom: n
                        }), () => {
                            i.forEach(e => e())
                        }
                    }, [s, t, e, n]), r
                }
        }
    }
]);
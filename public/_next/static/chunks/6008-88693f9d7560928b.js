(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [6008], {
        49437: function(e) {
            function t() {
                this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
            }

            function r(e) {
                return "function" == typeof e
            }

            function n(e) {
                return "object" == typeof e && null !== e
            }
            e.exports = t, t.prototype._events = void 0, t.prototype._maxListeners = void 0, t.defaultMaxListeners = 10, t.prototype.setMaxListeners = function(e) {
                if ("number" != typeof e || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");
                return this._maxListeners = e, this
            }, t.prototype.emit = function(e) {
                var t, i, a, o, s, c;
                if (this._events || (this._events = {}), "error" === e && (!this._events.error || n(this._events.error) && !this._events.error.length)) {
                    if (t = arguments[1], t instanceof Error) throw t;
                    var u = Error('Uncaught, unspecified "error" event. (' + t + ")");
                    throw u.context = t, u
                }
                if (void 0 === (i = this._events[e])) return !1;
                if (r(i)) switch (arguments.length) {
                    case 1:
                        i.call(this);
                        break;
                    case 2:
                        i.call(this, arguments[1]);
                        break;
                    case 3:
                        i.call(this, arguments[1], arguments[2]);
                        break;
                    default:
                        o = Array.prototype.slice.call(arguments, 1), i.apply(this, o)
                } else if (n(i))
                    for (s = 0, o = Array.prototype.slice.call(arguments, 1), a = (c = i.slice()).length; s < a; s++) c[s].apply(this, o);
                return !0
            }, t.prototype.addListener = function(e, i) {
                var a;
                if (!r(i)) throw TypeError("listener must be a function");
                return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, r(i.listener) ? i.listener : i), this._events[e] ? n(this._events[e]) ? this._events[e].push(i) : this._events[e] = [this._events[e], i] : this._events[e] = i, n(this._events[e]) && !this._events[e].warned && (a = void 0 === this._maxListeners ? t.defaultMaxListeners : this._maxListeners) && a > 0 && this._events[e].length > a && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace()), this
            }, t.prototype.on = t.prototype.addListener, t.prototype.once = function(e, t) {
                if (!r(t)) throw TypeError("listener must be a function");
                var n = !1;

                function i() {
                    this.removeListener(e, i), n || (n = !0, t.apply(this, arguments))
                }
                return i.listener = t, this.on(e, i), this
            }, t.prototype.removeListener = function(e, t) {
                var i, a, o, s;
                if (!r(t)) throw TypeError("listener must be a function");
                if (!this._events || !this._events[e]) return this;
                if (o = (i = this._events[e]).length, a = -1, i === t || r(i.listener) && i.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);
                else if (n(i)) {
                    for (s = o; s-- > 0;)
                        if (i[s] === t || i[s].listener && i[s].listener === t) {
                            a = s;
                            break
                        }
                    if (a < 0) return this;
                    1 === i.length ? (i.length = 0, delete this._events[e]) : i.splice(a, 1), this._events.removeListener && this.emit("removeListener", e, t)
                }
                return this
            }, t.prototype.removeAllListeners = function(e) {
                var t, n;
                if (!this._events) return this;
                if (!this._events.removeListener) return 0 == arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
                if (0 == arguments.length) {
                    for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);
                    return this.removeAllListeners("removeListener"), this._events = {}, this
                }
                if (r(n = this._events[e])) this.removeListener(e, n);
                else if (n)
                    for (; n.length;) this.removeListener(e, n[n.length - 1]);
                return delete this._events[e], this
            }, t.prototype.listeners = function(e) {
                return this._events && this._events[e] ? r(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
            }, t.prototype.listenerCount = function(e) {
                if (this._events) {
                    var t = this._events[e];
                    if (r(t)) return 1;
                    if (t) return t.length
                }
                return 0
            }, t.listenerCount = function(e, t) {
                return e.listenerCount(t)
            }
        },
        58544: function(e, t, r) {
            "use strict";
            var n = r(6088),
                i = r(98522),
                a = r(42853),
                o = r(59781);

            function s(e, t, r, i) {
                return new n(e, t, r, i)
            }
            s.version = r(29886), s.AlgoliaSearchHelper = n, s.SearchParameters = a, s.RecommendParameters = i, s.SearchResults = o, e.exports = s
        },
        54357: function(e, t, r) {
            "use strict";
            var n = r(49437);

            function i(e, t, r) {
                this.main = e, this.fn = t, this.recommendFn = r, this.lastResults = null, this.lastRecommendResults = null
            }
            r(43844)(i, n), i.prototype.detach = function() {
                this.removeAllListeners(), this.main.detachDerivedHelper(this)
            }, i.prototype.getModifiedState = function(e) {
                return this.fn(e)
            }, i.prototype.getModifiedRecommendState = function(e) {
                return this.recommendFn(e)
            }, e.exports = i
        },
        98522: function(e) {
            "use strict";

            function t(e) {
                e = e || {}, this.params = e.params || []
            }
            t.prototype = {
                constructor: t,
                addParams: function(e) {
                    var r = this.params.slice(),
                        n = this.params.findIndex(function(t) {
                            return t.$$id === e.$$id
                        });
                    return -1 !== n ? r.splice(n, 1, e) : r.push(e), new t({
                        params: r
                    })
                },
                removeParams: function(e) {
                    return new t({
                        params: this.params.filter(function(t) {
                            return t.$$id !== e
                        })
                    })
                },
                addFrequentlyBoughtTogether: function(e) {
                    return this.addParams(Object.assign({}, e, {
                        model: "bought-together"
                    }))
                },
                addRelatedProducts: function(e) {
                    return this.addParams(Object.assign({}, e, {
                        model: "related-products"
                    }))
                },
                addTrendingItems: function(e) {
                    return this.addParams(Object.assign({}, e, {
                        model: "trending-items"
                    }))
                },
                addTrendingFacets: function(e) {
                    return this.addParams(Object.assign({}, e, {
                        model: "trending-facets"
                    }))
                },
                addLookingSimilar: function(e) {
                    return this.addParams(Object.assign({}, e, {
                        model: "looking-similar"
                    }))
                },
                _buildQueries: function(e) {
                    return this.params.map(function(t) {
                        var r = Object.assign({}, t, {
                            indexName: e
                        });
                        return delete r.$$id, r
                    })
                }
            }, e.exports = t
        },
        47838: function(e, t, r) {
            "use strict";
            var n = r(7311),
                i = r(47769),
                a = r(38252),
                o = {
                    addRefinement: function(e, t, r) {
                        if (o.isRefined(e, t, r)) return e;
                        var i = "" + r,
                            a = e[t] ? e[t].concat(i) : [i],
                            s = {};
                        return s[t] = a, n({}, s, e)
                    },
                    removeRefinement: function(e, t, r) {
                        if (void 0 === r) return o.clearRefinement(e, function(e, r) {
                            return t === r
                        });
                        var n = "" + r;
                        return o.clearRefinement(e, function(e, r) {
                            return t === r && n === e
                        })
                    },
                    toggleRefinement: function(e, t, r) {
                        if (void 0 === r) throw Error("toggleRefinement should be used with a value");
                        return o.isRefined(e, t, r) ? o.removeRefinement(e, t, r) : o.addRefinement(e, t, r)
                    },
                    clearRefinement: function(e, t, r) {
                        if (void 0 === t) return i(e) ? {} : e;
                        if ("string" == typeof t) return a(e, [t]);
                        if ("function" == typeof t) {
                            var n = !1,
                                o = Object.keys(e).reduce(function(i, a) {
                                    var o = e[a] || [],
                                        s = o.filter(function(e) {
                                            return !t(e, a, r)
                                        });
                                    return s.length !== o.length && (n = !0), i[a] = s, i
                                }, {});
                            return n ? o : e
                        }
                    },
                    isRefined: function(e, t, r) {
                        var n = !!e[t] && e[t].length > 0;
                        return void 0 !== r && n ? -1 !== e[t].indexOf("" + r) : n
                    }
                };
            e.exports = o
        },
        42853: function(e, t, r) {
            "use strict";
            var n = r(7311),
                i = r(30405),
                a = r(97703),
                o = r(94260),
                s = r(47769),
                c = r(38252),
                u = r(80936),
                f = r(2534),
                l = r(47838);

            function h(e, t) {
                return Array.isArray(e) && Array.isArray(t) ? e.length === t.length && e.every(function(e, r) {
                    return h(t[r], e)
                }) : e === t
            }

            function d(e) {
                var t = e ? d._parseNumbers(e) : {};
                void 0 === t.userToken || f(t.userToken) || console.warn("[algoliasearch-helper] The `userToken` parameter is invalid. This can lead to wrong analytics.\n  - Format: [a-zA-Z0-9_-]{1,64}"), this.facets = t.facets || [], this.disjunctiveFacets = t.disjunctiveFacets || [], this.hierarchicalFacets = t.hierarchicalFacets || [], this.facetsRefinements = t.facetsRefinements || {}, this.facetsExcludes = t.facetsExcludes || {}, this.disjunctiveFacetsRefinements = t.disjunctiveFacetsRefinements || {}, this.numericRefinements = t.numericRefinements || {}, this.tagRefinements = t.tagRefinements || [], this.hierarchicalFacetsRefinements = t.hierarchicalFacetsRefinements || {};
                var r = this;
                Object.keys(t).forEach(function(e) {
                    var n = -1 !== d.PARAMETERS.indexOf(e),
                        i = void 0 !== t[e];
                    !n && i && (r[e] = t[e])
                })
            }
            d.PARAMETERS = Object.keys(new d), d._parseNumbers = function(e) {
                if (e instanceof d) return e;
                var t = {};
                if (["aroundPrecision", "aroundRadius", "getRankingInfo", "minWordSizefor2Typos", "minWordSizefor1Typo", "page", "maxValuesPerFacet", "distinct", "minimumAroundRadius", "hitsPerPage", "minProximity"].forEach(function(r) {
                        var n = e[r];
                        if ("string" == typeof n) {
                            var i = parseFloat(n);
                            t[r] = isNaN(i) ? n : i
                        }
                    }), Array.isArray(e.insideBoundingBox) && (t.insideBoundingBox = e.insideBoundingBox.map(function(e) {
                        return Array.isArray(e) ? e.map(function(e) {
                            return parseFloat(e)
                        }) : e
                    })), e.numericRefinements) {
                    var r = {};
                    Object.keys(e.numericRefinements).forEach(function(t) {
                        var n = e.numericRefinements[t] || {};
                        r[t] = {}, Object.keys(n).forEach(function(e) {
                            var i = n[e].map(function(e) {
                                return Array.isArray(e) ? e.map(function(e) {
                                    return "string" == typeof e ? parseFloat(e) : e
                                }) : "string" == typeof e ? parseFloat(e) : e
                            });
                            r[t][e] = i
                        })
                    }), t.numericRefinements = r
                }
                return o(e, t)
            }, d.make = function(e) {
                var t = new d(e);
                return (e.hierarchicalFacets || []).forEach(function(e) {
                    if (e.rootPath) {
                        var r = t.getHierarchicalRefinement(e.name);
                        r.length > 0 && 0 !== r[0].indexOf(e.rootPath) && (t = t.clearRefinements(e.name)), 0 === (r = t.getHierarchicalRefinement(e.name)).length && (t = t.toggleHierarchicalFacetRefinement(e.name, e.rootPath))
                    }
                }), t
            }, d.validate = function(e, t) {
                var r = t || {};
                return e.tagFilters && r.tagRefinements && r.tagRefinements.length > 0 ? Error("[Tags] Cannot switch from the managed tag API to the advanced API. It is probably an error, if it is really what you want, you should first clear the tags with clearTags method.") : e.tagRefinements.length > 0 && r.tagFilters ? Error("[Tags] Cannot switch from the advanced tag API to the managed API. It is probably an error, if it is not, you should first clear the tags with clearTags method.") : e.numericFilters && r.numericRefinements && s(r.numericRefinements) ? Error("[Numeric filters] Can't switch from the advanced to the managed API. It is probably an error, if this is really what you want, you have to first clear the numeric filters.") : s(e.numericRefinements) && r.numericFilters ? Error("[Numeric filters] Can't switch from the managed API to the advanced. It is probably an error, if this is really what you want, you have to first clear the numeric filters.") : null
            }, d.prototype = {
                constructor: d,
                clearRefinements: function(e) {
                    var t = {
                        numericRefinements: this._clearNumericRefinements(e),
                        facetsRefinements: l.clearRefinement(this.facetsRefinements, e, "conjunctiveFacet"),
                        facetsExcludes: l.clearRefinement(this.facetsExcludes, e, "exclude"),
                        disjunctiveFacetsRefinements: l.clearRefinement(this.disjunctiveFacetsRefinements, e, "disjunctiveFacet"),
                        hierarchicalFacetsRefinements: l.clearRefinement(this.hierarchicalFacetsRefinements, e, "hierarchicalFacet")
                    };
                    return t.numericRefinements === this.numericRefinements && t.facetsRefinements === this.facetsRefinements && t.facetsExcludes === this.facetsExcludes && t.disjunctiveFacetsRefinements === this.disjunctiveFacetsRefinements && t.hierarchicalFacetsRefinements === this.hierarchicalFacetsRefinements ? this : this.setQueryParameters(t)
                },
                clearTags: function() {
                    return void 0 === this.tagFilters && 0 === this.tagRefinements.length ? this : this.setQueryParameters({
                        tagFilters: void 0,
                        tagRefinements: []
                    })
                },
                setIndex: function(e) {
                    return e === this.index ? this : this.setQueryParameters({
                        index: e
                    })
                },
                setQuery: function(e) {
                    return e === this.query ? this : this.setQueryParameters({
                        query: e
                    })
                },
                setPage: function(e) {
                    return e === this.page ? this : this.setQueryParameters({
                        page: e
                    })
                },
                setFacets: function(e) {
                    return this.setQueryParameters({
                        facets: e
                    })
                },
                setDisjunctiveFacets: function(e) {
                    return this.setQueryParameters({
                        disjunctiveFacets: e
                    })
                },
                setHitsPerPage: function(e) {
                    return this.hitsPerPage === e ? this : this.setQueryParameters({
                        hitsPerPage: e
                    })
                },
                setTypoTolerance: function(e) {
                    return this.typoTolerance === e ? this : this.setQueryParameters({
                        typoTolerance: e
                    })
                },
                addNumericRefinement: function(e, t, r) {
                    var n = u(r);
                    if (this.isNumericRefined(e, t, n)) return this;
                    var i = o({}, this.numericRefinements);
                    return i[e] = o({}, i[e]), i[e][t] ? (i[e][t] = i[e][t].slice(), i[e][t].push(n)) : i[e][t] = [n], this.setQueryParameters({
                        numericRefinements: i
                    })
                },
                getConjunctiveRefinements: function(e) {
                    return this.isConjunctiveFacet(e) && this.facetsRefinements[e] || []
                },
                getDisjunctiveRefinements: function(e) {
                    return this.isDisjunctiveFacet(e) && this.disjunctiveFacetsRefinements[e] || []
                },
                getHierarchicalRefinement: function(e) {
                    return this.hierarchicalFacetsRefinements[e] || []
                },
                getExcludeRefinements: function(e) {
                    return this.isConjunctiveFacet(e) && this.facetsExcludes[e] || []
                },
                removeNumericRefinement: function(e, t, r) {
                    return void 0 !== r ? this.isNumericRefined(e, t, r) ? this.setQueryParameters({
                        numericRefinements: this._clearNumericRefinements(function(n, i) {
                            return i === e && n.op === t && h(n.val, u(r))
                        })
                    }) : this : void 0 !== t ? this.isNumericRefined(e, t) ? this.setQueryParameters({
                        numericRefinements: this._clearNumericRefinements(function(r, n) {
                            return n === e && r.op === t
                        })
                    }) : this : this.isNumericRefined(e) ? this.setQueryParameters({
                        numericRefinements: this._clearNumericRefinements(function(t, r) {
                            return r === e
                        })
                    }) : this
                },
                getNumericRefinements: function(e) {
                    return this.numericRefinements[e] || {}
                },
                getNumericRefinement: function(e, t) {
                    return this.numericRefinements[e] && this.numericRefinements[e][t]
                },
                _clearNumericRefinements: function(e) {
                    if (void 0 === e) return s(this.numericRefinements) ? {} : this.numericRefinements;
                    if ("string" == typeof e) return c(this.numericRefinements, [e]);
                    if ("function" == typeof e) {
                        var t = !1,
                            r = this.numericRefinements,
                            n = Object.keys(r).reduce(function(n, i) {
                                var a = r[i],
                                    o = {};
                                return Object.keys(a = a || {}).forEach(function(r) {
                                    var n = a[r] || [],
                                        s = [];
                                    n.forEach(function(t) {
                                        e({
                                            val: t,
                                            op: r
                                        }, i, "numeric") || s.push(t)
                                    }), s.length !== n.length && (t = !0), o[r] = s
                                }), n[i] = o, n
                            }, {});
                        return t ? n : this.numericRefinements
                    }
                },
                addFacet: function(e) {
                    return this.isConjunctiveFacet(e) ? this : this.setQueryParameters({
                        facets: this.facets.concat([e])
                    })
                },
                addDisjunctiveFacet: function(e) {
                    return this.isDisjunctiveFacet(e) ? this : this.setQueryParameters({
                        disjunctiveFacets: this.disjunctiveFacets.concat([e])
                    })
                },
                addHierarchicalFacet: function(e) {
                    if (this.isHierarchicalFacet(e.name)) throw Error("Cannot declare two hierarchical facets with the same name: `" + e.name + "`");
                    return this.setQueryParameters({
                        hierarchicalFacets: this.hierarchicalFacets.concat([e])
                    })
                },
                addFacetRefinement: function(e, t) {
                    if (!this.isConjunctiveFacet(e)) throw Error(e + " is not defined in the facets attribute of the helper configuration");
                    return l.isRefined(this.facetsRefinements, e, t) ? this : this.setQueryParameters({
                        facetsRefinements: l.addRefinement(this.facetsRefinements, e, t)
                    })
                },
                addExcludeRefinement: function(e, t) {
                    if (!this.isConjunctiveFacet(e)) throw Error(e + " is not defined in the facets attribute of the helper configuration");
                    return l.isRefined(this.facetsExcludes, e, t) ? this : this.setQueryParameters({
                        facetsExcludes: l.addRefinement(this.facetsExcludes, e, t)
                    })
                },
                addDisjunctiveFacetRefinement: function(e, t) {
                    if (!this.isDisjunctiveFacet(e)) throw Error(e + " is not defined in the disjunctiveFacets attribute of the helper configuration");
                    return l.isRefined(this.disjunctiveFacetsRefinements, e, t) ? this : this.setQueryParameters({
                        disjunctiveFacetsRefinements: l.addRefinement(this.disjunctiveFacetsRefinements, e, t)
                    })
                },
                addTagRefinement: function(e) {
                    if (this.isTagRefined(e)) return this;
                    var t = {
                        tagRefinements: this.tagRefinements.concat(e)
                    };
                    return this.setQueryParameters(t)
                },
                removeFacet: function(e) {
                    return this.isConjunctiveFacet(e) ? this.clearRefinements(e).setQueryParameters({
                        facets: this.facets.filter(function(t) {
                            return t !== e
                        })
                    }) : this
                },
                removeDisjunctiveFacet: function(e) {
                    return this.isDisjunctiveFacet(e) ? this.clearRefinements(e).setQueryParameters({
                        disjunctiveFacets: this.disjunctiveFacets.filter(function(t) {
                            return t !== e
                        })
                    }) : this
                },
                removeHierarchicalFacet: function(e) {
                    return this.isHierarchicalFacet(e) ? this.clearRefinements(e).setQueryParameters({
                        hierarchicalFacets: this.hierarchicalFacets.filter(function(t) {
                            return t.name !== e
                        })
                    }) : this
                },
                removeFacetRefinement: function(e, t) {
                    if (!this.isConjunctiveFacet(e)) throw Error(e + " is not defined in the facets attribute of the helper configuration");
                    return l.isRefined(this.facetsRefinements, e, t) ? this.setQueryParameters({
                        facetsRefinements: l.removeRefinement(this.facetsRefinements, e, t)
                    }) : this
                },
                removeExcludeRefinement: function(e, t) {
                    if (!this.isConjunctiveFacet(e)) throw Error(e + " is not defined in the facets attribute of the helper configuration");
                    return l.isRefined(this.facetsExcludes, e, t) ? this.setQueryParameters({
                        facetsExcludes: l.removeRefinement(this.facetsExcludes, e, t)
                    }) : this
                },
                removeDisjunctiveFacetRefinement: function(e, t) {
                    if (!this.isDisjunctiveFacet(e)) throw Error(e + " is not defined in the disjunctiveFacets attribute of the helper configuration");
                    return l.isRefined(this.disjunctiveFacetsRefinements, e, t) ? this.setQueryParameters({
                        disjunctiveFacetsRefinements: l.removeRefinement(this.disjunctiveFacetsRefinements, e, t)
                    }) : this
                },
                removeTagRefinement: function(e) {
                    if (!this.isTagRefined(e)) return this;
                    var t = {
                        tagRefinements: this.tagRefinements.filter(function(t) {
                            return t !== e
                        })
                    };
                    return this.setQueryParameters(t)
                },
                toggleRefinement: function(e, t) {
                    return this.toggleFacetRefinement(e, t)
                },
                toggleFacetRefinement: function(e, t) {
                    if (this.isHierarchicalFacet(e)) return this.toggleHierarchicalFacetRefinement(e, t);
                    if (this.isConjunctiveFacet(e)) return this.toggleConjunctiveFacetRefinement(e, t);
                    if (this.isDisjunctiveFacet(e)) return this.toggleDisjunctiveFacetRefinement(e, t);
                    throw Error("Cannot refine the undeclared facet " + e + "; it should be added to the helper options facets, disjunctiveFacets or hierarchicalFacets")
                },
                toggleConjunctiveFacetRefinement: function(e, t) {
                    if (!this.isConjunctiveFacet(e)) throw Error(e + " is not defined in the facets attribute of the helper configuration");
                    return this.setQueryParameters({
                        facetsRefinements: l.toggleRefinement(this.facetsRefinements, e, t)
                    })
                },
                toggleExcludeFacetRefinement: function(e, t) {
                    if (!this.isConjunctiveFacet(e)) throw Error(e + " is not defined in the facets attribute of the helper configuration");
                    return this.setQueryParameters({
                        facetsExcludes: l.toggleRefinement(this.facetsExcludes, e, t)
                    })
                },
                toggleDisjunctiveFacetRefinement: function(e, t) {
                    if (!this.isDisjunctiveFacet(e)) throw Error(e + " is not defined in the disjunctiveFacets attribute of the helper configuration");
                    return this.setQueryParameters({
                        disjunctiveFacetsRefinements: l.toggleRefinement(this.disjunctiveFacetsRefinements, e, t)
                    })
                },
                toggleHierarchicalFacetRefinement: function(e, t) {
                    if (!this.isHierarchicalFacet(e)) throw Error(e + " is not defined in the hierarchicalFacets attribute of the helper configuration");
                    var r = this._getHierarchicalFacetSeparator(this.getHierarchicalFacetByName(e)),
                        i = {};
                    return void 0 !== this.hierarchicalFacetsRefinements[e] && this.hierarchicalFacetsRefinements[e].length > 0 && (this.hierarchicalFacetsRefinements[e][0] === t || 0 === this.hierarchicalFacetsRefinements[e][0].indexOf(t + r)) ? -1 === t.indexOf(r) ? i[e] = [] : i[e] = [t.slice(0, t.lastIndexOf(r))] : i[e] = [t], this.setQueryParameters({
                        hierarchicalFacetsRefinements: n({}, i, this.hierarchicalFacetsRefinements)
                    })
                },
                addHierarchicalFacetRefinement: function(e, t) {
                    if (this.isHierarchicalFacetRefined(e)) throw Error(e + " is already refined.");
                    if (!this.isHierarchicalFacet(e)) throw Error(e + " is not defined in the hierarchicalFacets attribute of the helper configuration.");
                    var r = {};
                    return r[e] = [t], this.setQueryParameters({
                        hierarchicalFacetsRefinements: n({}, r, this.hierarchicalFacetsRefinements)
                    })
                },
                removeHierarchicalFacetRefinement: function(e) {
                    if (!this.isHierarchicalFacetRefined(e)) return this;
                    var t = {};
                    return t[e] = [], this.setQueryParameters({
                        hierarchicalFacetsRefinements: n({}, t, this.hierarchicalFacetsRefinements)
                    })
                },
                toggleTagRefinement: function(e) {
                    return this.isTagRefined(e) ? this.removeTagRefinement(e) : this.addTagRefinement(e)
                },
                isDisjunctiveFacet: function(e) {
                    return this.disjunctiveFacets.indexOf(e) > -1
                },
                isHierarchicalFacet: function(e) {
                    return void 0 !== this.getHierarchicalFacetByName(e)
                },
                isConjunctiveFacet: function(e) {
                    return this.facets.indexOf(e) > -1
                },
                isFacetRefined: function(e, t) {
                    return !!this.isConjunctiveFacet(e) && l.isRefined(this.facetsRefinements, e, t)
                },
                isExcludeRefined: function(e, t) {
                    return !!this.isConjunctiveFacet(e) && l.isRefined(this.facetsExcludes, e, t)
                },
                isDisjunctiveFacetRefined: function(e, t) {
                    return !!this.isDisjunctiveFacet(e) && l.isRefined(this.disjunctiveFacetsRefinements, e, t)
                },
                isHierarchicalFacetRefined: function(e, t) {
                    if (!this.isHierarchicalFacet(e)) return !1;
                    var r = this.getHierarchicalRefinement(e);
                    return t ? -1 !== r.indexOf(t) : r.length > 0
                },
                isNumericRefined: function(e, t, r) {
                    if (void 0 === r && void 0 === t) return !!this.numericRefinements[e];
                    var n = this.numericRefinements[e] && void 0 !== this.numericRefinements[e][t];
                    if (void 0 === r || !n) return n;
                    var a = u(r),
                        o = void 0 !== i(this.numericRefinements[e][t], function(e) {
                            return h(e, a)
                        });
                    return n && o
                },
                isTagRefined: function(e) {
                    return -1 !== this.tagRefinements.indexOf(e)
                },
                getRefinedDisjunctiveFacets: function() {
                    var e = this,
                        t = a(Object.keys(this.numericRefinements).filter(function(t) {
                            return Object.keys(e.numericRefinements[t]).length > 0
                        }), this.disjunctiveFacets);
                    return Object.keys(this.disjunctiveFacetsRefinements).filter(function(t) {
                        return e.disjunctiveFacetsRefinements[t].length > 0
                    }).concat(t).concat(this.getRefinedHierarchicalFacets()).sort()
                },
                getRefinedHierarchicalFacets: function() {
                    var e = this;
                    return a(this.hierarchicalFacets.map(function(e) {
                        return e.name
                    }), Object.keys(this.hierarchicalFacetsRefinements).filter(function(t) {
                        return e.hierarchicalFacetsRefinements[t].length > 0
                    })).sort()
                },
                getUnrefinedDisjunctiveFacets: function() {
                    var e = this.getRefinedDisjunctiveFacets();
                    return this.disjunctiveFacets.filter(function(t) {
                        return -1 === e.indexOf(t)
                    })
                },
                managedParameters: ["index", "facets", "disjunctiveFacets", "facetsRefinements", "hierarchicalFacets", "facetsExcludes", "disjunctiveFacetsRefinements", "numericRefinements", "tagRefinements", "hierarchicalFacetsRefinements"],
                getQueryParams: function() {
                    var e = this.managedParameters,
                        t = {},
                        r = this;
                    return Object.keys(this).forEach(function(n) {
                        var i = r[n]; - 1 === e.indexOf(n) && void 0 !== i && (t[n] = i)
                    }), t
                },
                setQueryParameter: function(e, t) {
                    if (this[e] === t) return this;
                    var r = {};
                    return r[e] = t, this.setQueryParameters(r)
                },
                setQueryParameters: function(e) {
                    if (!e) return this;
                    var t = d.validate(this, e);
                    if (t) throw t;
                    var r = this,
                        n = d._parseNumbers(e),
                        i = Object.keys(this).reduce(function(e, t) {
                            return e[t] = r[t], e
                        }, {}),
                        a = Object.keys(n).reduce(function(e, t) {
                            var r = void 0 !== e[t],
                                i = void 0 !== n[t];
                            return r && !i ? c(e, [t]) : (i && (e[t] = n[t]), e)
                        }, i);
                    return new this.constructor(a)
                },
                resetPage: function() {
                    return void 0 === this.page ? this : this.setPage(0)
                },
                _getHierarchicalFacetSortBy: function(e) {
                    return e.sortBy || ["isRefined:desc", "name:asc"]
                },
                _getHierarchicalFacetSeparator: function(e) {
                    return e.separator || " > "
                },
                _getHierarchicalRootPath: function(e) {
                    return e.rootPath || null
                },
                _getHierarchicalShowParentLevel: function(e) {
                    return "boolean" != typeof e.showParentLevel || e.showParentLevel
                },
                getHierarchicalFacetByName: function(e) {
                    return i(this.hierarchicalFacets, function(t) {
                        return t.name === e
                    })
                },
                getHierarchicalFacetBreadcrumb: function(e) {
                    if (!this.isHierarchicalFacet(e)) return [];
                    var t = this.getHierarchicalRefinement(e)[0];
                    if (!t) return [];
                    var r = this._getHierarchicalFacetSeparator(this.getHierarchicalFacetByName(e));
                    return t.split(r).map(function(e) {
                        return e.trim()
                    })
                },
                toString: function() {
                    return JSON.stringify(this, null, 2)
                }
            }, e.exports = d
        },
        30998: function(e, t, r) {
            "use strict";
            e.exports = function(e) {
                return function(t, r) {
                    var n = e.hierarchicalFacets[r],
                        u = e.hierarchicalFacetsRefinements[n.name] && e.hierarchicalFacetsRefinements[n.name][0] || "",
                        f = e._getHierarchicalFacetSeparator(n),
                        l = e._getHierarchicalRootPath(n),
                        h = e._getHierarchicalShowParentLevel(n),
                        d = a(e._getHierarchicalFacetSortBy(n)),
                        p = t.every(function(e) {
                            return e.exhaustive
                        }),
                        m = t;
                    return l && (m = t.slice(l.split(f).length)), m.reduce(function(e, t, r) {
                        var n = e;
                        if (r > 0) {
                            var a = 0;
                            for (n = e; a < r;) n = i(n && Array.isArray(n.data) ? n.data : [], function(e) {
                                return e.isRefined
                            }), a++
                        }
                        if (n) {
                            var p = Object.keys(t.data).map(function(e) {
                                return [e, t.data[e]]
                            }).filter(function(e) {
                                var t, r;
                                return t = e[0], r = n.path || l, (!l || 0 === t.indexOf(l) && l !== t) && (!l && -1 === t.indexOf(f) || l && t.split(f).length - l.split(f).length == 1 || -1 === t.indexOf(f) && -1 === u.indexOf(f) || 0 === u.indexOf(t) || 0 === t.indexOf(r + f) && (h || 0 === t.indexOf(u)))
                            });
                            n.data = o(p.map(function(e) {
                                var r, n, i, a, o = e[0];
                                return r = e[1], n = c(u), i = t.exhaustive, {
                                    name: (a = o.split(f))[a.length - 1].trim(),
                                    path: o,
                                    escapedValue: s(o),
                                    count: r,
                                    isRefined: n === o || 0 === n.indexOf(o + f),
                                    exhaustive: i,
                                    data: null
                                }
                            }), d[0], d[1])
                        }
                        return e
                    }, {
                        name: e.hierarchicalFacets[r].name,
                        count: null,
                        isRefined: !0,
                        path: null,
                        escapedValue: null,
                        exhaustive: p,
                        data: null
                    })
                }
            };
            var n = r(47029),
                i = r(30405),
                a = r(6660),
                o = r(46643),
                s = n.escapeFacetValue,
                c = n.unescapeFacetValue
        },
        59781: function(e, t, r) {
            "use strict";
            var n = r(54090),
                i = r(7311),
                a = r(47029),
                o = r(30405),
                s = r(66548),
                c = r(6660),
                u = r(94260),
                f = r(46643),
                l = a.escapeFacetValue,
                h = a.unescapeFacetValue,
                d = r(30998);

            function p(e) {
                var t = {};
                return e.forEach(function(e, r) {
                    t[e] = r
                }), t
            }

            function m(e, t, r) {
                t && t[r] && (e.stats = t[r])
            }

            function g(e, t, r) {
                var a = t[0];
                this._rawResults = t;
                var c = this;
                Object.keys(a).forEach(function(e) {
                    c[e] = a[e]
                });
                var f = u({
                    persistHierarchicalRootCount: !1
                }, r);
                Object.keys(f).forEach(function(e) {
                    c[e] = f[e]
                }), this.processingTimeMS = t.reduce(function(e, t) {
                    return void 0 === t.processingTimeMS ? e : e + t.processingTimeMS
                }, 0), this.disjunctiveFacets = [], this.hierarchicalFacets = e.hierarchicalFacets.map(function() {
                    return []
                }), this.facets = [];
                var l = e.getRefinedDisjunctiveFacets(),
                    g = p(e.facets),
                    y = p(e.disjunctiveFacets),
                    v = 1,
                    b = a.facets || {};
                Object.keys(b).forEach(function(t) {
                    var r = b[t],
                        n = o(e.hierarchicalFacets, function(e) {
                            return (e.attributes || []).indexOf(t) > -1
                        });
                    if (n) {
                        var i = n.attributes.indexOf(t),
                            u = s(e.hierarchicalFacets, function(e) {
                                return e.name === n.name
                            });
                        c.hierarchicalFacets[u][i] = {
                            attribute: t,
                            data: r,
                            exhaustive: a.exhaustiveFacetsCount
                        }
                    } else {
                        var f, l = -1 !== e.disjunctiveFacets.indexOf(t),
                            h = -1 !== e.facets.indexOf(t);
                        l && (f = y[t], c.disjunctiveFacets[f] = {
                            name: t,
                            data: r,
                            exhaustive: a.exhaustiveFacetsCount
                        }, m(c.disjunctiveFacets[f], a.facets_stats, t)), h && (f = g[t], c.facets[f] = {
                            name: t,
                            data: r,
                            exhaustive: a.exhaustiveFacetsCount
                        }, m(c.facets[f], a.facets_stats, t))
                    }
                }), this.hierarchicalFacets = n(this.hierarchicalFacets), l.forEach(function(r) {
                    var n = t[v],
                        o = n && n.facets ? n.facets : {},
                        f = e.getHierarchicalFacetByName(r);
                    Object.keys(o).forEach(function(t) {
                        var r, l = o[t];
                        if (f) {
                            r = s(e.hierarchicalFacets, function(e) {
                                return e.name === f.name
                            });
                            var d = s(c.hierarchicalFacets[r], function(e) {
                                return e.attribute === t
                            });
                            if (-1 === d) return;
                            c.hierarchicalFacets[r][d].data = u({}, c.hierarchicalFacets[r][d].data, l)
                        } else {
                            r = y[t];
                            var p = a.facets && a.facets[t] || {};
                            c.disjunctiveFacets[r] = {
                                name: t,
                                data: i({}, l, p),
                                exhaustive: n.exhaustiveFacetsCount
                            }, m(c.disjunctiveFacets[r], n.facets_stats, t), e.disjunctiveFacetsRefinements[t] && e.disjunctiveFacetsRefinements[t].forEach(function(n) {
                                !c.disjunctiveFacets[r].data[n] && e.disjunctiveFacetsRefinements[t].indexOf(h(n)) > -1 && (c.disjunctiveFacets[r].data[n] = 0)
                            })
                        }
                    }), v++
                }), e.getRefinedHierarchicalFacets().forEach(function(r) {
                    var n = e.getHierarchicalFacetByName(r),
                        a = e._getHierarchicalFacetSeparator(n),
                        o = e.getHierarchicalRefinement(r);
                    0 === o.length || o[0].split(a).length < 2 || t.slice(v).forEach(function(t) {
                        var r = t && t.facets ? t.facets : {};
                        Object.keys(r).forEach(function(t) {
                            var u = r[t],
                                f = s(e.hierarchicalFacets, function(e) {
                                    return e.name === n.name
                                }),
                                l = s(c.hierarchicalFacets[f], function(e) {
                                    return e.attribute === t
                                });
                            if (-1 !== l) {
                                var h = {};
                                if (o.length > 0 && !c.persistHierarchicalRootCount) {
                                    var d = o[0].split(a)[0];
                                    h[d] = c.hierarchicalFacets[f][l].data[d]
                                }
                                c.hierarchicalFacets[f][l].data = i(h, u, c.hierarchicalFacets[f][l].data)
                            }
                        }), v++
                    })
                }), Object.keys(e.facetsExcludes).forEach(function(t) {
                    var r = e.facetsExcludes[t],
                        n = g[t];
                    c.facets[n] = {
                        name: t,
                        data: b[t],
                        exhaustive: a.exhaustiveFacetsCount
                    }, r.forEach(function(e) {
                        c.facets[n] = c.facets[n] || {
                            name: t
                        }, c.facets[n].data = c.facets[n].data || {}, c.facets[n].data[e] = 0
                    })
                }), this.hierarchicalFacets = this.hierarchicalFacets.map(d(e)), this.facets = n(this.facets), this.disjunctiveFacets = n(this.disjunctiveFacets), this._state = e
            }

            function y(e, t) {
                var r = o(e, function(e) {
                    return e.name === t
                });
                return r && r.stats
            }

            function v(e, t, r, n, i) {
                var a = o(i, function(e) {
                        return e.name === r
                    }),
                    s = a && a.data && a.data[n] ? a.data[n] : 0;
                return {
                    type: t,
                    attributeName: r,
                    name: n,
                    count: s,
                    exhaustive: a && a.exhaustive || !1
                }
            }
            g.prototype.getFacetByName = function(e) {
                function t(t) {
                    return t.name === e
                }
                return o(this.facets, t) || o(this.disjunctiveFacets, t) || o(this.hierarchicalFacets, t)
            }, g.DEFAULT_SORT = ["isRefined:desc", "count:desc", "name:asc"], g.prototype.getFacetValues = function(e, t) {
                var r, n = function(e, t) {
                    function r(e) {
                        return e.name === t
                    }
                    if (e._state.isConjunctiveFacet(t)) {
                        var n = o(e.facets, r);
                        return n ? Object.keys(n.data).map(function(r) {
                            var i = l(r);
                            return {
                                name: r,
                                escapedValue: i,
                                count: n.data[r],
                                isRefined: e._state.isFacetRefined(t, i),
                                isExcluded: e._state.isExcludeRefined(t, r)
                            }
                        }) : []
                    }
                    if (e._state.isDisjunctiveFacet(t)) {
                        var i = o(e.disjunctiveFacets, r);
                        return i ? Object.keys(i.data).map(function(r) {
                            var n = l(r);
                            return {
                                name: r,
                                escapedValue: n,
                                count: i.data[r],
                                isRefined: e._state.isDisjunctiveFacetRefined(t, n)
                            }
                        }) : []
                    }
                    if (e._state.isHierarchicalFacet(t)) {
                        var a = o(e.hierarchicalFacets, r);
                        if (!a) return a;
                        var s = e._state.getHierarchicalFacetByName(t),
                            c = e._state._getHierarchicalFacetSeparator(s),
                            u = h(e._state.getHierarchicalRefinement(t)[0] || "");
                        0 === u.indexOf(s.rootPath) && (u = u.replace(s.rootPath + c, ""));
                        var f = u.split(c);
                        return f.unshift(t),
                            function e(t, r, n) {
                                t.isRefined = t.name === (r[n] && r[n].trim()), t.data && t.data.forEach(function(t) {
                                    e(t, r, n + 1)
                                })
                            }(a, f, 0), a
                    }
                }(this, e);
                if (n) {
                    var a = i({}, t, {
                            sortBy: g.DEFAULT_SORT,
                            facetOrdering: !(t && t.sortBy)
                        }),
                        s = this;
                    return r = Array.isArray(n) ? [e] : s._state.getHierarchicalFacetByName(n.name).attributes,
                        function e(t, r, n, a) {
                            if (a = a || 0, Array.isArray(r)) return t(r, n[a]);
                            if (!r.data || 0 === r.data.length) return r;
                            var o = r.data.map(function(r) {
                                return e(t, r, n, a + 1)
                            });
                            return i({
                                data: t(o, n[a])
                            }, r)
                        }(function(e, t) {
                            if (a.facetOrdering) {
                                var r, n, i, o, u, l, h = s.renderingContent && s.renderingContent.facetOrdering && s.renderingContent.facetOrdering.values && s.renderingContent.facetOrdering.values[t];
                                if (h) return i = [], o = [], u = (h.order || []).reduce(function(e, t, r) {
                                    return e[t] = r, e
                                }, {}), e.forEach(function(e) {
                                    var t = e.path || e.name;
                                    void 0 !== u[t] ? i[u[t]] = e : o.push(e)
                                }), i = i.filter(function(e) {
                                    return e
                                }), "hidden" === (l = h.sortRemainingBy) ? i : (n = "alpha" === l ? [
                                    ["path", "name"],
                                    ["asc", "asc"]
                                ] : [
                                    ["count"],
                                    ["desc"]
                                ], i.concat(f(o, n[0], n[1])))
                            }
                            if (Array.isArray(a.sortBy)) {
                                var d = c(a.sortBy, g.DEFAULT_SORT);
                                return f(e, d[0], d[1])
                            }
                            if ("function" == typeof a.sortBy) return r = a.sortBy, e.sort(r);
                            throw Error("options.sortBy is optional but if defined it must be either an array of string (predicates) or a sorting function")
                        }, n, r)
                }
            }, g.prototype.getFacetStats = function(e) {
                return this._state.isConjunctiveFacet(e) ? y(this.facets, e) : this._state.isDisjunctiveFacet(e) ? y(this.disjunctiveFacets, e) : void 0
            }, g.prototype.getRefinements = function() {
                var e = this._state,
                    t = this,
                    r = [];
                return Object.keys(e.facetsRefinements).forEach(function(n) {
                    e.facetsRefinements[n].forEach(function(i) {
                        r.push(v(e, "facet", n, i, t.facets))
                    })
                }), Object.keys(e.facetsExcludes).forEach(function(n) {
                    e.facetsExcludes[n].forEach(function(i) {
                        r.push(v(e, "exclude", n, i, t.facets))
                    })
                }), Object.keys(e.disjunctiveFacetsRefinements).forEach(function(n) {
                    e.disjunctiveFacetsRefinements[n].forEach(function(i) {
                        r.push(v(e, "disjunctive", n, i, t.disjunctiveFacets))
                    })
                }), Object.keys(e.hierarchicalFacetsRefinements).forEach(function(n) {
                    e.hierarchicalFacetsRefinements[n].forEach(function(i) {
                        var a, s, c, u, f, l, h, d;
                        r.push((a = t.hierarchicalFacets, s = e.getHierarchicalFacetByName(n), c = e._getHierarchicalFacetSeparator(s), u = i.split(c), f = o(a, function(e) {
                            return e.name === n
                        }), h = (l = u.reduce(function(e, t) {
                            var r = e && o(e.data, function(e) {
                                return e.name === t
                            });
                            return void 0 !== r ? r : e
                        }, f)) && l.count || 0, d = l && l.exhaustive || !1, {
                            type: "hierarchical",
                            attributeName: n,
                            name: l && l.path || "",
                            count: h,
                            exhaustive: d
                        }))
                    })
                }), Object.keys(e.numericRefinements).forEach(function(t) {
                    var n = e.numericRefinements[t];
                    Object.keys(n).forEach(function(e) {
                        n[e].forEach(function(n) {
                            r.push({
                                type: "numeric",
                                attributeName: t,
                                name: n,
                                numericValue: n,
                                operator: e
                            })
                        })
                    })
                }), e.tagRefinements.forEach(function(e) {
                    r.push({
                        type: "tag",
                        attributeName: "_tags",
                        name: e
                    })
                }), r
            }, e.exports = g
        },
        6088: function(e, t, r) {
            "use strict";
            var n = r(49437),
                i = r(54357),
                a = r(47029).escapeFacetValue,
                o = r(43844),
                s = r(94260),
                c = r(47769),
                u = r(38252),
                f = r(98522),
                l = r(70323),
                h = r(42853),
                d = r(59781),
                p = r(29886);

            function m(e, t, r, n) {
                "function" == typeof e.addAlgoliaAgent && e.addAlgoliaAgent("JS Helper (" + p + ")"), this.setClient(e);
                var i = r || {};
                i.index = t, this.state = h.make(i), this.recommendState = new f({
                    params: i.recommendState
                }), this.lastResults = null, this.lastRecommendResults = null, this._queryId = 0, this._recommendQueryId = 0, this._lastQueryIdReceived = -1, this._lastRecommendQueryIdReceived = -1, this.derivedHelpers = [], this._currentNbQueries = 0, this._currentNbRecommendQueries = 0, this._searchResultsOptions = n
            }

            function g(e) {
                if (e < 0) throw Error("Page requested below 0.");
                return this._change({
                    state: this.state.setPage(e),
                    isPageReset: !1
                }), this
            }

            function y() {
                return this.state.page
            }
            o(m, n), m.prototype.search = function() {
                return this._search({
                    onlyWithDerivedHelpers: !1
                }), this
            }, m.prototype.searchOnlyWithDerivedHelpers = function() {
                return this._search({
                    onlyWithDerivedHelpers: !0
                }), this
            }, m.prototype.recommend = function() {
                return this._recommend(), this
            }, m.prototype.getQuery = function() {
                var e = this.state;
                return l._getHitsSearchParams(e)
            }, m.prototype.searchOnce = function(e, t) {
                var r = e ? this.state.setQueryParameters(e) : this.state,
                    n = l._getQueries(r.index, r),
                    i = this;
                if (this._currentNbQueries++, this.emit("searchOnce", {
                        state: r
                    }), t) {
                    this.client.search(n).then(function(e) {
                        i._currentNbQueries--, 0 === i._currentNbQueries && i.emit("searchQueueEmpty"), t(null, new d(r, e.results), r)
                    }).catch(function(e) {
                        i._currentNbQueries--, 0 === i._currentNbQueries && i.emit("searchQueueEmpty"), t(e, null, r)
                    });
                    return
                }
                return this.client.search(n).then(function(e) {
                    return i._currentNbQueries--, 0 === i._currentNbQueries && i.emit("searchQueueEmpty"), {
                        content: new d(r, e.results),
                        state: r,
                        _originalResponse: e
                    }
                }, function(e) {
                    throw i._currentNbQueries--, 0 === i._currentNbQueries && i.emit("searchQueueEmpty"), e
                })
            }, m.prototype.findAnswers = function(e) {
                console.warn("[algoliasearch-helper] answers is no longer supported");
                var t = this.state,
                    r = this.derivedHelpers[0];
                if (!r) return Promise.resolve([]);
                var n = r.getModifiedState(t),
                    i = s({
                        attributesForPrediction: e.attributesForPrediction,
                        nbHits: e.nbHits
                    }, {
                        params: u(l._getHitsSearchParams(n), ["attributesToSnippet", "hitsPerPage", "restrictSearchableAttributes", "snippetEllipsisText"])
                    }),
                    a = "search for answers was called, but this client does not have a function client.initIndex(index).findAnswers";
                if ("function" != typeof this.client.initIndex) throw Error(a);
                var o = this.client.initIndex(n.index);
                if ("function" != typeof o.findAnswers) throw Error(a);
                return o.findAnswers(n.query, e.queryLanguages, i)
            }, m.prototype.searchForFacetValues = function(e, t, r, n) {
                var i, o = "function" == typeof this.client.searchForFacetValues,
                    s = "function" == typeof this.client.initIndex;
                if (!o && !s && "function" != typeof this.client.search) throw Error("search for facet values (searchable) was called, but this client does not have a function client.searchForFacetValues or client.initIndex(index).searchForFacetValues");
                var c = this.state.setQueryParameters(n || {}),
                    u = c.isDisjunctiveFacet(e),
                    f = l.getSearchForFacetQuery(e, t, r, c);
                this._currentNbQueries++;
                var h = this;
                return o ? i = this.client.searchForFacetValues([{
                    indexName: c.index,
                    params: f
                }]) : s ? i = this.client.initIndex(c.index).searchForFacetValues(f) : (delete f.facetName, i = this.client.search([{
                    type: "facet",
                    facet: e,
                    indexName: c.index,
                    params: f
                }]).then(function(e) {
                    return e.results[0]
                })), this.emit("searchForFacetValues", {
                    state: c,
                    facet: e,
                    query: t
                }), i.then(function(t) {
                    return h._currentNbQueries--, 0 === h._currentNbQueries && h.emit("searchQueueEmpty"), (t = Array.isArray(t) ? t[0] : t).facetHits.forEach(function(t) {
                        t.escapedValue = a(t.value), t.isRefined = u ? c.isDisjunctiveFacetRefined(e, t.escapedValue) : c.isFacetRefined(e, t.escapedValue)
                    }), t
                }, function(e) {
                    throw h._currentNbQueries--, 0 === h._currentNbQueries && h.emit("searchQueueEmpty"), e
                })
            }, m.prototype.setQuery = function(e) {
                return this._change({
                    state: this.state.resetPage().setQuery(e),
                    isPageReset: !0
                }), this
            }, m.prototype.clearRefinements = function(e) {
                return this._change({
                    state: this.state.resetPage().clearRefinements(e),
                    isPageReset: !0
                }), this
            }, m.prototype.clearTags = function() {
                return this._change({
                    state: this.state.resetPage().clearTags(),
                    isPageReset: !0
                }), this
            }, m.prototype.addDisjunctiveFacetRefinement = function(e, t) {
                return this._change({
                    state: this.state.resetPage().addDisjunctiveFacetRefinement(e, t),
                    isPageReset: !0
                }), this
            }, m.prototype.addDisjunctiveRefine = function() {
                return this.addDisjunctiveFacetRefinement.apply(this, arguments)
            }, m.prototype.addHierarchicalFacetRefinement = function(e, t) {
                return this._change({
                    state: this.state.resetPage().addHierarchicalFacetRefinement(e, t),
                    isPageReset: !0
                }), this
            }, m.prototype.addNumericRefinement = function(e, t, r) {
                return this._change({
                    state: this.state.resetPage().addNumericRefinement(e, t, r),
                    isPageReset: !0
                }), this
            }, m.prototype.addFacetRefinement = function(e, t) {
                return this._change({
                    state: this.state.resetPage().addFacetRefinement(e, t),
                    isPageReset: !0
                }), this
            }, m.prototype.addRefine = function() {
                return this.addFacetRefinement.apply(this, arguments)
            }, m.prototype.addFacetExclusion = function(e, t) {
                return this._change({
                    state: this.state.resetPage().addExcludeRefinement(e, t),
                    isPageReset: !0
                }), this
            }, m.prototype.addExclude = function() {
                return this.addFacetExclusion.apply(this, arguments)
            }, m.prototype.addTag = function(e) {
                return this._change({
                    state: this.state.resetPage().addTagRefinement(e),
                    isPageReset: !0
                }), this
            }, m.prototype.addFrequentlyBoughtTogether = function(e) {
                return this._recommendChange({
                    state: this.recommendState.addFrequentlyBoughtTogether(e)
                }), this
            }, m.prototype.addRelatedProducts = function(e) {
                return this._recommendChange({
                    state: this.recommendState.addRelatedProducts(e)
                }), this
            }, m.prototype.addTrendingItems = function(e) {
                return this._recommendChange({
                    state: this.recommendState.addTrendingItems(e)
                }), this
            }, m.prototype.addTrendingFacets = function(e) {
                return this._recommendChange({
                    state: this.recommendState.addTrendingFacets(e)
                }), this
            }, m.prototype.addLookingSimilar = function(e) {
                return this._recommendChange({
                    state: this.recommendState.addLookingSimilar(e)
                }), this
            }, m.prototype.removeNumericRefinement = function(e, t, r) {
                return this._change({
                    state: this.state.resetPage().removeNumericRefinement(e, t, r),
                    isPageReset: !0
                }), this
            }, m.prototype.removeDisjunctiveFacetRefinement = function(e, t) {
                return this._change({
                    state: this.state.resetPage().removeDisjunctiveFacetRefinement(e, t),
                    isPageReset: !0
                }), this
            }, m.prototype.removeDisjunctiveRefine = function() {
                return this.removeDisjunctiveFacetRefinement.apply(this, arguments)
            }, m.prototype.removeHierarchicalFacetRefinement = function(e) {
                return this._change({
                    state: this.state.resetPage().removeHierarchicalFacetRefinement(e),
                    isPageReset: !0
                }), this
            }, m.prototype.removeFacetRefinement = function(e, t) {
                return this._change({
                    state: this.state.resetPage().removeFacetRefinement(e, t),
                    isPageReset: !0
                }), this
            }, m.prototype.removeRefine = function() {
                return this.removeFacetRefinement.apply(this, arguments)
            }, m.prototype.removeFacetExclusion = function(e, t) {
                return this._change({
                    state: this.state.resetPage().removeExcludeRefinement(e, t),
                    isPageReset: !0
                }), this
            }, m.prototype.removeExclude = function() {
                return this.removeFacetExclusion.apply(this, arguments)
            }, m.prototype.removeTag = function(e) {
                return this._change({
                    state: this.state.resetPage().removeTagRefinement(e),
                    isPageReset: !0
                }), this
            }, m.prototype.removeFrequentlyBoughtTogether = function(e) {
                return this._recommendChange({
                    state: this.recommendState.removeParams(e)
                }), this
            }, m.prototype.removeRelatedProducts = function(e) {
                return this._recommendChange({
                    state: this.recommendState.removeParams(e)
                }), this
            }, m.prototype.removeTrendingItems = function(e) {
                return this._recommendChange({
                    state: this.recommendState.removeParams(e)
                }), this
            }, m.prototype.removeTrendingFacets = function(e) {
                return this._recommendChange({
                    state: this.recommendState.removeParams(e)
                }), this
            }, m.prototype.removeLookingSimilar = function(e) {
                return this._recommendChange({
                    state: this.recommendState.removeParams(e)
                }), this
            }, m.prototype.toggleFacetExclusion = function(e, t) {
                return this._change({
                    state: this.state.resetPage().toggleExcludeFacetRefinement(e, t),
                    isPageReset: !0
                }), this
            }, m.prototype.toggleExclude = function() {
                return this.toggleFacetExclusion.apply(this, arguments)
            }, m.prototype.toggleRefinement = function(e, t) {
                return this.toggleFacetRefinement(e, t)
            }, m.prototype.toggleFacetRefinement = function(e, t) {
                return this._change({
                    state: this.state.resetPage().toggleFacetRefinement(e, t),
                    isPageReset: !0
                }), this
            }, m.prototype.toggleRefine = function() {
                return this.toggleFacetRefinement.apply(this, arguments)
            }, m.prototype.toggleTag = function(e) {
                return this._change({
                    state: this.state.resetPage().toggleTagRefinement(e),
                    isPageReset: !0
                }), this
            }, m.prototype.nextPage = function() {
                var e = this.state.page || 0;
                return this.setPage(e + 1)
            }, m.prototype.previousPage = function() {
                var e = this.state.page || 0;
                return this.setPage(e - 1)
            }, m.prototype.setCurrentPage = g, m.prototype.setPage = g, m.prototype.setIndex = function(e) {
                return this._change({
                    state: this.state.resetPage().setIndex(e),
                    isPageReset: !0
                }), this
            }, m.prototype.setQueryParameter = function(e, t) {
                return this._change({
                    state: this.state.resetPage().setQueryParameter(e, t),
                    isPageReset: !0
                }), this
            }, m.prototype.setState = function(e) {
                return this._change({
                    state: h.make(e),
                    isPageReset: !1
                }), this
            }, m.prototype.overrideStateWithoutTriggeringChangeEvent = function(e) {
                return this.state = new h(e), this
            }, m.prototype.hasRefinements = function(e) {
                return !!c(this.state.getNumericRefinements(e)) || (this.state.isConjunctiveFacet(e) ? this.state.isFacetRefined(e) : this.state.isDisjunctiveFacet(e) ? this.state.isDisjunctiveFacetRefined(e) : !!this.state.isHierarchicalFacet(e) && this.state.isHierarchicalFacetRefined(e))
            }, m.prototype.isExcluded = function(e, t) {
                return this.state.isExcludeRefined(e, t)
            }, m.prototype.isDisjunctiveRefined = function(e, t) {
                return this.state.isDisjunctiveFacetRefined(e, t)
            }, m.prototype.hasTag = function(e) {
                return this.state.isTagRefined(e)
            }, m.prototype.isTagRefined = function() {
                return this.hasTagRefinements.apply(this, arguments)
            }, m.prototype.getIndex = function() {
                return this.state.index
            }, m.prototype.getCurrentPage = y, m.prototype.getPage = y, m.prototype.getTags = function() {
                return this.state.tagRefinements
            }, m.prototype.getRefinements = function(e) {
                var t = [];
                this.state.isConjunctiveFacet(e) ? (this.state.getConjunctiveRefinements(e).forEach(function(e) {
                    t.push({
                        value: e,
                        type: "conjunctive"
                    })
                }), this.state.getExcludeRefinements(e).forEach(function(e) {
                    t.push({
                        value: e,
                        type: "exclude"
                    })
                })) : this.state.isDisjunctiveFacet(e) && this.state.getDisjunctiveRefinements(e).forEach(function(e) {
                    t.push({
                        value: e,
                        type: "disjunctive"
                    })
                });
                var r = this.state.getNumericRefinements(e);
                return Object.keys(r).forEach(function(e) {
                    var n = r[e];
                    t.push({
                        value: n,
                        operator: e,
                        type: "numeric"
                    })
                }), t
            }, m.prototype.getNumericRefinement = function(e, t) {
                return this.state.getNumericRefinement(e, t)
            }, m.prototype.getHierarchicalFacetBreadcrumb = function(e) {
                return this.state.getHierarchicalFacetBreadcrumb(e)
            }, m.prototype._search = function(e) {
                var t = this.state,
                    r = [],
                    n = [];
                e.onlyWithDerivedHelpers || (n = l._getQueries(t.index, t), r.push({
                    state: t,
                    queriesCount: n.length,
                    helper: this
                }), this.emit("search", {
                    state: t,
                    results: this.lastResults
                }));
                var i = this.derivedHelpers.map(function(e) {
                        var n = e.getModifiedState(t),
                            i = n.index ? l._getQueries(n.index, n) : [];
                        return r.push({
                            state: n,
                            queriesCount: i.length,
                            helper: e
                        }), e.emit("search", {
                            state: n,
                            results: e.lastResults
                        }), i
                    }),
                    a = Array.prototype.concat.apply(n, i),
                    o = this._queryId++;
                if (this._currentNbQueries++, !a.length) return Promise.resolve({
                    results: []
                }).then(this._dispatchAlgoliaResponse.bind(this, r, o));
                try {
                    this.client.search(a).then(this._dispatchAlgoliaResponse.bind(this, r, o)).catch(this._dispatchAlgoliaError.bind(this, o))
                } catch (e) {
                    this.emit("error", {
                        error: e
                    })
                }
            }, m.prototype._recommend = function() {
                var e = this.state,
                    t = this.recommendState,
                    r = this.getIndex(),
                    n = [{
                        state: t,
                        index: r,
                        helper: this
                    }];
                this.emit("fetch", {
                    recommend: {
                        state: t,
                        results: this.lastRecommendResults
                    }
                });
                var i = this.derivedHelpers.map(function(t) {
                        var r = t.getModifiedState(e).index;
                        if (!r) return [];
                        var i = t.getModifiedRecommendState(new f);
                        return n.push({
                            state: i,
                            index: r,
                            helper: t
                        }), t.emit("fetch", {
                            recommend: {
                                state: i,
                                results: t.lastRecommendResults
                            }
                        }), i._buildQueries(r)
                    }),
                    a = Array.prototype.concat.apply(this.recommendState._buildQueries(r), i);
                if (0 !== a.length) {
                    if (a.length > 0 && void 0 === this.client.getRecommendations) {
                        console.warn("Please update algoliasearch/lite to the latest version in order to use recommendations widgets.");
                        return
                    }
                    var o = this._recommendQueryId++;
                    this._currentNbRecommendQueries++;
                    try {
                        this.client.getRecommendations(a).then(this._dispatchRecommendResponse.bind(this, o, n)).catch(this._dispatchRecommendError.bind(this, o))
                    } catch (e) {
                        this.emit("error", {
                            error: e
                        })
                    }
                }
            }, m.prototype._dispatchAlgoliaResponse = function(e, t, r) {
                var n = this;
                if (!(t < this._lastQueryIdReceived)) {
                    this._currentNbQueries -= t - this._lastQueryIdReceived, this._lastQueryIdReceived = t, 0 === this._currentNbQueries && this.emit("searchQueueEmpty");
                    var i = r.results.slice();
                    e.forEach(function(e) {
                        var t = e.state,
                            r = e.queriesCount,
                            a = e.helper,
                            o = i.splice(0, r);
                        if (!t.index) {
                            a.emit("result", {
                                results: null,
                                state: t
                            });
                            return
                        }
                        a.lastResults = new d(t, o, n._searchResultsOptions), a.emit("result", {
                            results: a.lastResults,
                            state: t
                        })
                    })
                }
            }, m.prototype._dispatchRecommendResponse = function(e, t, r) {
                if (!(e < this._lastRecommendQueryIdReceived)) {
                    this._currentNbRecommendQueries -= e - this._lastRecommendQueryIdReceived, this._lastRecommendQueryIdReceived = e, 0 === this._currentNbRecommendQueries && this.emit("recommendQueueEmpty");
                    var n = r.results.slice();
                    t.forEach(function(e) {
                        var t = e.state,
                            r = e.helper;
                        if (!e.index) {
                            r.emit("recommend:result", {
                                results: null,
                                state: t
                            });
                            return
                        }
                        r.lastRecommendResults = n, r.emit("recommend:result", {
                            recommend: {
                                results: r.lastRecommendResults,
                                state: t
                            }
                        })
                    })
                }
            }, m.prototype._dispatchAlgoliaError = function(e, t) {
                e < this._lastQueryIdReceived || (this._currentNbQueries -= e - this._lastQueryIdReceived, this._lastQueryIdReceived = e, this.emit("error", {
                    error: t
                }), 0 === this._currentNbQueries && this.emit("searchQueueEmpty"))
            }, m.prototype._dispatchRecommendError = function(e, t) {
                e < this._lastRecommendQueryIdReceived || (this._currentNbRecommendQueries -= e - this._lastRecommendQueryIdReceived, this._lastRecommendQueryIdReceived = e, this.emit("error", {
                    error: t
                }), 0 === this._currentNbRecommendQueries && this.emit("recommendQueueEmpty"))
            }, m.prototype.containsRefinement = function(e, t, r, n) {
                return e || 0 !== t.length || 0 !== r.length || 0 !== n.length
            }, m.prototype._hasDisjunctiveRefinements = function(e) {
                return this.state.disjunctiveRefinements[e] && this.state.disjunctiveRefinements[e].length > 0
            }, m.prototype._change = function(e) {
                var t = e.state,
                    r = e.isPageReset;
                t !== this.state && (this.state = t, this.emit("change", {
                    state: this.state,
                    results: this.lastResults,
                    isPageReset: r
                }))
            }, m.prototype._recommendChange = function(e) {
                var t = e.state;
                t !== this.recommendState && (this.recommendState = t, this.emit("recommend:change", {
                    search: {
                        results: this.lastResults,
                        state: this.state
                    },
                    recommend: {
                        results: this.lastRecommendResults,
                        state: this.recommendState
                    }
                }))
            }, m.prototype.clearCache = function() {
                return this.client.clearCache && this.client.clearCache(), this
            }, m.prototype.setClient = function(e) {
                return this.client === e || ("function" == typeof e.addAlgoliaAgent && e.addAlgoliaAgent("JS Helper (" + p + ")"), this.client = e), this
            }, m.prototype.getClient = function() {
                return this.client
            }, m.prototype.derive = function(e, t) {
                var r = new i(this, e, t);
                return this.derivedHelpers.push(r), r
            }, m.prototype.detachDerivedHelper = function(e) {
                var t = this.derivedHelpers.indexOf(e);
                if (-1 === t) throw Error("Derived helper already detached");
                this.derivedHelpers.splice(t, 1)
            }, m.prototype.hasPendingRequests = function() {
                return this._currentNbQueries > 0
            }, e.exports = m
        },
        54090: function(e) {
            "use strict";
            e.exports = function(e) {
                return Array.isArray(e) ? e.filter(Boolean) : []
            }
        },
        7311: function(e) {
            "use strict";
            e.exports = function() {
                var e = Array.prototype.slice.call(arguments);
                return e.reduceRight(function(e, t) {
                    return Object.keys(Object(t)).forEach(function(r) {
                        void 0 !== t[r] && (void 0 !== e[r] && delete e[r], e[r] = t[r])
                    }), e
                }, {})
            }
        },
        47029: function(e) {
            "use strict";
            e.exports = {
                escapeFacetValue: function(e) {
                    return "string" != typeof e ? e : String(e).replace(/^-/, "\\-")
                },
                unescapeFacetValue: function(e) {
                    return "string" != typeof e ? e : e.replace(/^\\-/, "-")
                }
            }
        },
        30405: function(e) {
            "use strict";
            e.exports = function(e, t) {
                if (Array.isArray(e)) {
                    for (var r = 0; r < e.length; r++)
                        if (t(e[r])) return e[r]
                }
            }
        },
        66548: function(e) {
            "use strict";
            e.exports = function(e, t) {
                if (!Array.isArray(e)) return -1;
                for (var r = 0; r < e.length; r++)
                    if (t(e[r])) return r;
                return -1
            }
        },
        6660: function(e, t, r) {
            "use strict";
            var n = r(30405);
            e.exports = function(e, t) {
                var r = (t || []).map(function(e) {
                    return e.split(":")
                });
                return e.reduce(function(e, t) {
                    var i = t.split(":"),
                        a = n(r, function(e) {
                            return e[0] === i[0]
                        });
                    return i.length > 1 || !a ? (e[0].push(i[0]), e[1].push(i[1])) : (e[0].push(a[0]), e[1].push(a[1])), e
                }, [
                    [],
                    []
                ])
            }
        },
        43844: function(e) {
            "use strict";
            e.exports = function(e, t) {
                e.prototype = Object.create(t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                })
            }
        },
        97703: function(e) {
            "use strict";
            e.exports = function(e, t) {
                return e.filter(function(r, n) {
                    return t.indexOf(r) > -1 && e.indexOf(r) === n
                })
            }
        },
        94260: function(e) {
            "use strict";

            function t(e) {
                return "function" == typeof e || Array.isArray(e) || "[object Object]" === Object.prototype.toString.call(e)
            }
            e.exports = function(e) {
                t(e) || (e = {});
                for (var r = 1, n = arguments.length; r < n; r++) {
                    var i = arguments[r];
                    t(i) && function e(r, n) {
                        if (r === n) return r;
                        for (var i in n)
                            if (Object.prototype.hasOwnProperty.call(n, i) && "__proto__" !== i && "constructor" !== i) {
                                var a = n[i],
                                    o = r[i];
                                (void 0 === o || void 0 !== a) && (t(o) && t(a) ? r[i] = e(o, a) : r[i] = "object" == typeof a && null !== a ? e(Array.isArray(a) ? [] : {}, a) : a)
                            }
                        return r
                    }(e, i)
                }
                return e
            }
        },
        47769: function(e) {
            "use strict";
            e.exports = function(e) {
                return e && Object.keys(e).length > 0
            }
        },
        38252: function(e) {
            "use strict";
            e.exports = function(e, t) {
                if (null === e) return {};
                var r, n, i = {},
                    a = Object.keys(e);
                for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) >= 0 || (i[r] = e[r]);
                return i
            }
        },
        46643: function(e) {
            "use strict";
            e.exports = function(e, t, r) {
                if (!Array.isArray(e)) return [];
                Array.isArray(r) || (r = []);
                var n = e.map(function(e, r) {
                    return {
                        criteria: t.map(function(t) {
                            return e[t]
                        }),
                        index: r,
                        value: e
                    }
                });
                return n.sort(function(e, t) {
                    for (var n = -1; ++n < e.criteria.length;) {
                        var i = function(e, t) {
                            if (e !== t) {
                                var r = void 0 !== e,
                                    n = null === e,
                                    i = void 0 !== t,
                                    a = null === t;
                                if (!a && e > t || n && i || !r) return 1;
                                if (!n && e < t || a && r || !i) return -1
                            }
                            return 0
                        }(e.criteria[n], t.criteria[n]);
                        if (i) {
                            if (n >= r.length) return i;
                            if ("desc" === r[n]) return -i;
                            return i
                        }
                    }
                    return e.index - t.index
                }), n.map(function(e) {
                    return e.value
                })
            }
        },
        80936: function(e) {
            "use strict";
            e.exports = function e(t) {
                if ("number" == typeof t) return t;
                if ("string" == typeof t) return parseFloat(t);
                if (Array.isArray(t)) return t.map(e);
                throw Error("The value should be a number, a parsable string or an array of those.")
            }
        },
        70323: function(e, t, r) {
            "use strict";
            var n = r(94260);

            function i(e) {
                return Object.keys(e).sort().reduce(function(t, r) {
                    return t[r] = e[r], t
                }, {})
            }
            var a = {
                _getQueries: function(e, t) {
                    var r = [];
                    return r.push({
                        indexName: e,
                        params: a._getHitsSearchParams(t)
                    }), t.getRefinedDisjunctiveFacets().forEach(function(n) {
                        r.push({
                            indexName: e,
                            params: a._getDisjunctiveFacetSearchParams(t, n)
                        })
                    }), t.getRefinedHierarchicalFacets().forEach(function(n) {
                        var i = t.getHierarchicalFacetByName(n),
                            o = t.getHierarchicalRefinement(n),
                            s = t._getHierarchicalFacetSeparator(i);
                        if (o.length > 0 && o[0].split(s).length > 1) {
                            var c = o[0].split(s).slice(0, -1).reduce(function(e, t, r) {
                                return e.concat({
                                    attribute: i.attributes[r],
                                    value: 0 === r ? t : [e[e.length - 1].value, t].join(s)
                                })
                            }, []);
                            c.forEach(function(n, o) {
                                var s = a._getDisjunctiveFacetSearchParams(t, n.attribute, 0 === o);

                                function u(e) {
                                    return i.attributes.some(function(t) {
                                        return t === e.split(":")[0]
                                    })
                                }
                                var f = (s.facetFilters || []).reduce(function(e, t) {
                                        if (Array.isArray(t)) {
                                            var r = t.filter(function(e) {
                                                return !u(e)
                                            });
                                            r.length > 0 && e.push(r)
                                        }
                                        return "string" != typeof t || u(t) || e.push(t), e
                                    }, []),
                                    l = c[o - 1];
                                o > 0 ? s.facetFilters = f.concat(l.attribute + ":" + l.value) : s.facetFilters = f.length > 0 ? f : void 0, r.push({
                                    indexName: e,
                                    params: s
                                })
                            })
                        }
                    }), r
                },
                _getHitsSearchParams: function(e) {
                    var t = e.facets.concat(e.disjunctiveFacets).concat(a._getHitsHierarchicalFacetsAttributes(e)).sort(),
                        r = a._getFacetFilters(e),
                        o = a._getNumericFilters(e),
                        s = a._getTagFilters(e),
                        c = {
                            facets: t.indexOf("*") > -1 ? ["*"] : t,
                            tagFilters: s
                        };
                    return r.length > 0 && (c.facetFilters = r), o.length > 0 && (c.numericFilters = o), i(n({}, e.getQueryParams(), c))
                },
                _getDisjunctiveFacetSearchParams: function(e, t, r) {
                    var o = a._getFacetFilters(e, t, r),
                        s = a._getNumericFilters(e, t),
                        c = a._getTagFilters(e),
                        u = {
                            hitsPerPage: 0,
                            page: 0,
                            analytics: !1,
                            clickAnalytics: !1
                        };
                    c.length > 0 && (u.tagFilters = c);
                    var f = e.getHierarchicalFacetByName(t);
                    return f ? u.facets = a._getDisjunctiveHierarchicalFacetAttribute(e, f, r) : u.facets = t, s.length > 0 && (u.numericFilters = s), o.length > 0 && (u.facetFilters = o), i(n({}, e.getQueryParams(), u))
                },
                _getNumericFilters: function(e, t) {
                    if (e.numericFilters) return e.numericFilters;
                    var r = [];
                    return Object.keys(e.numericRefinements).forEach(function(n) {
                        var i = e.numericRefinements[n] || {};
                        Object.keys(i).forEach(function(e) {
                            var a = i[e] || [];
                            t !== n && a.forEach(function(t) {
                                if (Array.isArray(t)) {
                                    var i = t.map(function(t) {
                                        return n + e + t
                                    });
                                    r.push(i)
                                } else r.push(n + e + t)
                            })
                        })
                    }), r
                },
                _getTagFilters: function(e) {
                    return e.tagFilters ? e.tagFilters : e.tagRefinements.join(",")
                },
                _getFacetFilters: function(e, t, r) {
                    var n = [],
                        i = e.facetsRefinements || {};
                    Object.keys(i).sort().forEach(function(e) {
                        (i[e] || []).slice().sort().forEach(function(t) {
                            n.push(e + ":" + t)
                        })
                    });
                    var a = e.facetsExcludes || {};
                    Object.keys(a).sort().forEach(function(e) {
                        (a[e] || []).sort().forEach(function(t) {
                            n.push(e + ":-" + t)
                        })
                    });
                    var o = e.disjunctiveFacetsRefinements || {};
                    Object.keys(o).sort().forEach(function(e) {
                        var r = o[e] || [];
                        if (e !== t && r && 0 !== r.length) {
                            var i = [];
                            r.slice().sort().forEach(function(t) {
                                i.push(e + ":" + t)
                            }), n.push(i)
                        }
                    });
                    var s = e.hierarchicalFacetsRefinements || {};
                    return Object.keys(s).sort().forEach(function(i) {
                        var a, o, c = (s[i] || [])[0];
                        if (void 0 !== c) {
                            var u = e.getHierarchicalFacetByName(i),
                                f = e._getHierarchicalFacetSeparator(u),
                                l = e._getHierarchicalRootPath(u);
                            if (t === i) {
                                if (-1 === c.indexOf(f) || !l && !0 === r || l && l.split(f).length === c.split(f).length) return;
                                l ? (o = l.split(f).length - 1, c = l) : (o = c.split(f).length - 2, c = c.slice(0, c.lastIndexOf(f))), a = u.attributes[o]
                            } else o = c.split(f).length - 1, a = u.attributes[o];
                            a && n.push([a + ":" + c])
                        }
                    }), n
                },
                _getHitsHierarchicalFacetsAttributes: function(e) {
                    return e.hierarchicalFacets.reduce(function(t, r) {
                        var n = e.getHierarchicalRefinement(r.name)[0];
                        if (!n) return t.push(r.attributes[0]), t;
                        var i = e._getHierarchicalFacetSeparator(r),
                            a = n.split(i).length,
                            o = r.attributes.slice(0, a + 1);
                        return t.concat(o)
                    }, [])
                },
                _getDisjunctiveHierarchicalFacetAttribute: function(e, t, r) {
                    var n = e._getHierarchicalFacetSeparator(t);
                    if (!0 === r) {
                        var i = e._getHierarchicalRootPath(t),
                            a = 0;
                        return i && (a = i.split(n).length), [t.attributes[a]]
                    }
                    var o = (e.getHierarchicalRefinement(t.name)[0] || "").split(n).length - 1;
                    return t.attributes.slice(0, o + 1)
                },
                getSearchForFacetQuery: function(e, t, r, o) {
                    var s = o.isDisjunctiveFacet(e) ? o.clearRefinements(e) : o,
                        c = {
                            facetQuery: t,
                            facetName: e
                        };
                    return "number" == typeof r && (c.maxFacetHits = r), i(n({}, a._getHitsSearchParams(s), c))
                }
            };
            e.exports = a
        },
        2534: function(e) {
            "use strict";
            e.exports = function(e) {
                return null !== e && /^[a-zA-Z0-9_-]{1,64}$/.test(e)
            }
        },
        29886: function(e) {
            "use strict";
            e.exports = "3.19.0"
        },
        99245: function(e) {
            var t; /*! algoliasearch.umd.js | 4.23.3 | © Algolia, inc. | https://github.com/algolia/algoliasearch-client-javascript */
            t = function() {
                "use strict";

                function e(e, t) {
                    var r = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var n = Object.getOwnPropertySymbols(e);
                        t && (n = n.filter(function(t) {
                            return Object.getOwnPropertyDescriptor(e, t).enumerable
                        })), r.push.apply(r, n)
                    }
                    return r
                }

                function t(t) {
                    for (var r = 1; r < arguments.length; r++) {
                        var n = null != arguments[r] ? arguments[r] : {};
                        r % 2 ? e(Object(n), !0).forEach(function(e) {
                            var r;
                            r = n[e], e in t ? Object.defineProperty(t, e, {
                                value: r,
                                enumerable: !0,
                                configurable: !0,
                                writable: !0
                            }) : t[e] = r
                        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : e(Object(n)).forEach(function(e) {
                            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
                        })
                    }
                    return t
                }

                function r(e, t) {
                    if (null == e) return {};
                    var r, n, i = function(e, t) {
                        if (null == e) return {};
                        var r, n, i = {},
                            a = Object.keys(e);
                        for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) >= 0 || (i[r] = e[r]);
                        return i
                    }(e, t);
                    if (Object.getOwnPropertySymbols) {
                        var a = Object.getOwnPropertySymbols(e);
                        for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) >= 0 || Object.prototype.propertyIsEnumerable.call(e, r) && (i[r] = e[r])
                    }
                    return i
                }

                function n(e, t) {
                    return function(e) {
                        if (Array.isArray(e)) return e
                    }(e) || function(e, t) {
                        if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) {
                            var r = [],
                                n = !0,
                                i = !1,
                                a = void 0;
                            try {
                                for (var o, s = e[Symbol.iterator](); !(n = (o = s.next()).done) && (r.push(o.value), !t || r.length !== t); n = !0);
                            } catch (e) {
                                i = !0, a = e
                            } finally {
                                try {
                                    n || null == s.return || s.return()
                                } finally {
                                    if (i) throw a
                                }
                            }
                            return r
                        }
                    }(e, t) || function() {
                        throw TypeError("Invalid attempt to destructure non-iterable instance")
                    }()
                }

                function i(e) {
                    return function(e) {
                        if (Array.isArray(e)) {
                            for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
                            return r
                        }
                    }(e) || function(e) {
                        if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e)
                    }(e) || function() {
                        throw TypeError("Invalid attempt to spread non-iterable instance")
                    }()
                }

                function a() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
                            serializable: !0
                        },
                        t = {};
                    return {
                        get: function(r, n) {
                            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {
                                    miss: function() {
                                        return Promise.resolve()
                                    }
                                },
                                a = JSON.stringify(r);
                            if (a in t) return Promise.resolve(e.serializable ? JSON.parse(t[a]) : t[a]);
                            var o = n(),
                                s = i && i.miss || function() {
                                    return Promise.resolve()
                                };
                            return o.then(function(e) {
                                return s(e)
                            }).then(function() {
                                return o
                            })
                        },
                        set: function(r, n) {
                            return t[JSON.stringify(r)] = e.serializable ? JSON.stringify(n) : n, Promise.resolve(n)
                        },
                        delete: function(e) {
                            return delete t[JSON.stringify(e)], Promise.resolve()
                        },
                        clear: function() {
                            return t = {}, Promise.resolve()
                        }
                    }
                }

                function o(e, t, r) {
                    var n = {
                        "x-algolia-api-key": r,
                        "x-algolia-application-id": t
                    };
                    return {
                        headers: function() {
                            return e === l.WithinHeaders ? n : {}
                        },
                        queryParameters: function() {
                            return e === l.WithinQueryParameters ? n : {}
                        }
                    }
                }

                function s(e) {
                    var t = 0;
                    return e(function r() {
                        return t++, new Promise(function(n) {
                            setTimeout(function() {
                                n(e(r))
                            }, Math.min(100 * t, 1e3))
                        })
                    })
                }

                function c(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function(e, t) {
                        return Promise.resolve()
                    };
                    return Object.assign(e, {
                        wait: function(r) {
                            return c(e.then(function(e) {
                                return Promise.all([t(e, r), e])
                            }).then(function(e) {
                                return e[1]
                            }))
                        }
                    })
                }

                function u(e, t) {
                    return t && Object.keys(t).forEach(function(r) {
                        e[r] = t[r](e)
                    }), e
                }

                function f(e) {
                    for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) r[n - 1] = arguments[n];
                    var i = 0;
                    return e.replace(/%s/g, function() {
                        return encodeURIComponent(r[i++])
                    })
                }
                var l = {
                    WithinQueryParameters: 0,
                    WithinHeaders: 1
                };

                function h(e, t) {
                    var r = e || {},
                        n = r.data || {};
                    return Object.keys(r).forEach(function(e) {
                        -1 === ["timeout", "headers", "queryParameters", "data", "cacheable"].indexOf(e) && (n[e] = r[e])
                    }), {
                        data: Object.entries(n).length > 0 ? n : void 0,
                        timeout: r.timeout || t,
                        headers: r.headers || {},
                        queryParameters: r.queryParameters || {},
                        cacheable: r.cacheable
                    }
                }
                var d = {
                    Read: 1,
                    Write: 2,
                    Any: 3
                };

                function p(e) {
                    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                    return t(t({}, e), {}, {
                        status: r,
                        lastUpdate: Date.now()
                    })
                }

                function m(e) {
                    return "string" == typeof e ? {
                        protocol: "https",
                        url: e,
                        accept: d.Any
                    } : {
                        protocol: e.protocol || "https",
                        url: e.url,
                        accept: e.accept || d.Any
                    }
                }
                var g = "DELETE",
                    y = "POST";

                function v(e, r, n, a) {
                    var o, s, c, u = [],
                        f = function(e, r) {
                            if ("GET" !== e.method && (void 0 !== e.data || void 0 !== r.data)) return JSON.stringify(Array.isArray(e.data) ? e.data : t(t({}, e.data), r.data))
                        }(n, a),
                        l = (o = t(t({}, e.headers), a.headers), s = {}, Object.keys(o).forEach(function(e) {
                            var t = o[e];
                            s[e.toLowerCase()] = t
                        }), s),
                        h = n.method,
                        d = "GET" !== n.method ? {} : t(t({}, n.data), a.data),
                        g = t(t(t({
                            "x-algolia-agent": e.userAgent.value
                        }, e.queryParameters), d), a.queryParameters),
                        y = 0,
                        v = function t(r, i) {
                            var o, s, c, d = r.pop();
                            if (void 0 === d) throw {
                                name: "RetryError",
                                message: "Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.",
                                transporterStackTrace: O(u)
                            };
                            var m = {
                                    data: f,
                                    headers: l,
                                    method: h,
                                    url: (o = n.path, s = S(g), c = "".concat(d.protocol, "://").concat(d.url, "/").concat("/" === o.charAt(0) ? o.substr(1) : o), s.length && (c += "?".concat(s)), c),
                                    connectTimeout: i(y, e.timeouts.connect),
                                    responseTimeout: i(y, a.timeout)
                                },
                                v = function(e) {
                                    var t = {
                                        request: m,
                                        response: e,
                                        host: d,
                                        triesLeft: r.length
                                    };
                                    return u.push(t), t
                                },
                                b = {
                                    onSuccess: function(e) {
                                        return function(e) {
                                            try {
                                                return JSON.parse(e.content)
                                            } catch (t) {
                                                throw {
                                                    name: "DeserializationError",
                                                    message: t.message,
                                                    response: e
                                                }
                                            }
                                        }(e)
                                    },
                                    onRetry: function(n) {
                                        var a = v(n);
                                        return n.isTimedOut && y++, Promise.all([e.logger.info("Retryable failure", j(a)), e.hostsCache.set(d, p(d, n.isTimedOut ? 3 : 2))]).then(function() {
                                            return t(r, i)
                                        })
                                    },
                                    onFail: function(e) {
                                        throw v(e),
                                            function(e, t) {
                                                var r = e.content,
                                                    n = e.status,
                                                    i = r;
                                                try {
                                                    i = JSON.parse(r).message
                                                } catch (e) {}
                                                return {
                                                    name: "ApiError",
                                                    message: i,
                                                    status: n,
                                                    transporterStackTrace: t
                                                }
                                            }(e, O(u))
                                    }
                                };
                            return e.requester.send(m).then(function(e) {
                                var t, r, n;
                                return (t = e.status, e.isTimedOut || (r = e.isTimedOut, n = e.status, !r && 0 == ~~n) || 2 != ~~(t / 100) && 4 != ~~(t / 100)) ? b.onRetry(e) : 2 == ~~(e.status / 100) ? b.onSuccess(e) : b.onFail(e)
                            })
                        };
                    return (c = e.hostsCache, Promise.all(r.map(function(e) {
                        return c.get(e, function() {
                            return Promise.resolve(p(e))
                        })
                    })).then(function(e) {
                        var t = e.filter(function(e) {
                                return 1 === e.status || Date.now() - e.lastUpdate > 12e4
                            }),
                            n = e.filter(function(e) {
                                return 3 === e.status && Date.now() - e.lastUpdate <= 12e4
                            }),
                            a = [].concat(i(t), i(n));
                        return {
                            getTimeout: function(e, t) {
                                return (0 === n.length && 0 === e ? 1 : n.length + 3 + e) * t
                            },
                            statelessHosts: a.length > 0 ? a.map(function(e) {
                                return m(e)
                            }) : r
                        }
                    })).then(function(e) {
                        return v(i(e.statelessHosts).reverse(), e.getTimeout)
                    })
                }

                function b(e) {
                    var t = e.hostsCache,
                        r = e.logger,
                        i = e.requester,
                        a = e.requestsCache,
                        o = e.responsesCache,
                        s = e.timeouts,
                        c = e.userAgent,
                        u = e.hosts,
                        f = e.queryParameters,
                        l = {
                            hostsCache: t,
                            logger: r,
                            requester: i,
                            requestsCache: a,
                            responsesCache: o,
                            timeouts: s,
                            userAgent: c,
                            headers: e.headers,
                            queryParameters: f,
                            hosts: u.map(function(e) {
                                return m(e)
                            }),
                            read: function(e, t) {
                                var r = h(t, l.timeouts.read),
                                    i = function() {
                                        return v(l, l.hosts.filter(function(e) {
                                            return 0 != (e.accept & d.Read)
                                        }), e, r)
                                    };
                                if (!0 !== (void 0 !== r.cacheable ? r.cacheable : e.cacheable)) return i();
                                var a = {
                                    request: e,
                                    mappedRequestOptions: r,
                                    transporter: {
                                        queryParameters: l.queryParameters,
                                        headers: l.headers
                                    }
                                };
                                return l.responsesCache.get(a, function() {
                                    return l.requestsCache.get(a, function() {
                                        return l.requestsCache.set(a, i()).then(function(e) {
                                            return Promise.all([l.requestsCache.delete(a), e])
                                        }, function(e) {
                                            return Promise.all([l.requestsCache.delete(a), Promise.reject(e)])
                                        }).then(function(e) {
                                            var t = n(e, 2);
                                            return t[0], t[1]
                                        })
                                    })
                                }, {
                                    miss: function(e) {
                                        return l.responsesCache.set(a, e)
                                    }
                                })
                            },
                            write: function(e, t) {
                                return v(l, l.hosts.filter(function(e) {
                                    return 0 != (e.accept & d.Write)
                                }), e, h(t, l.timeouts.write))
                            }
                        };
                    return l
                }

                function S(e) {
                    return Object.keys(e).map(function(t) {
                        var r;
                        return f("%s=%s", t, (r = e[t], "[object Object]" === Object.prototype.toString.call(r) || "[object Array]" === Object.prototype.toString.call(r) ? JSON.stringify(e[t]) : e[t]))
                    }).join("&")
                }

                function O(e) {
                    return e.map(function(e) {
                        return j(e)
                    })
                }

                function j(e) {
                    var r = e.request.headers["x-algolia-api-key"] ? {
                        "x-algolia-api-key": "*****"
                    } : {};
                    return t(t({}, e), {}, {
                        request: t(t({}, e.request), {}, {
                            headers: t(t({}, e.request.headers), r)
                        })
                    })
                }
                var P = function(e) {
                        return function(t, r) {
                            return e.transporter.write({
                                method: y,
                                path: "2/abtests",
                                data: t
                            }, r)
                        }
                    },
                    R = function(e) {
                        return function(t, r) {
                            return e.transporter.write({
                                method: g,
                                path: f("2/abtests/%s", t)
                            }, r)
                        }
                    },
                    w = function(e) {
                        return function(t, r) {
                            return e.transporter.read({
                                method: "GET",
                                path: f("2/abtests/%s", t)
                            }, r)
                        }
                    },
                    x = function(e) {
                        return function(t) {
                            return e.transporter.read({
                                method: "GET",
                                path: "2/abtests"
                            }, t)
                        }
                    },
                    E = function(e) {
                        return function(t, r) {
                            return e.transporter.write({
                                method: y,
                                path: f("2/abtests/%s/stop", t)
                            }, r)
                        }
                    },
                    F = function(e) {
                        return function(t) {
                            return e.transporter.read({
                                method: "GET",
                                path: "1/strategies/personalization"
                            }, t)
                        }
                    },
                    _ = function(e) {
                        return function(t, r) {
                            return e.transporter.write({
                                method: y,
                                path: "1/strategies/personalization",
                                data: t
                            }, r)
                        }
                    };

                function T(e) {
                    return function t(r) {
                        return e.request(r).then(function(n) {
                            if (void 0 !== e.batch && e.batch(n.hits), !e.shouldStop(n)) return n.cursor ? t({
                                cursor: n.cursor
                            }) : t({
                                page: (r.page || 0) + 1
                            })
                        })
                    }({})
                }
                var I = function(e) {
                        return function(n, i) {
                            var a = i || {},
                                o = a.queryParameters,
                                u = r(a, ["queryParameters"]),
                                f = t({
                                    acl: n
                                }, void 0 !== o ? {
                                    queryParameters: o
                                } : {});
                            return c(e.transporter.write({
                                method: y,
                                path: "1/keys",
                                data: f
                            }, u), function(t, r) {
                                return s(function(n) {
                                    return W(e)(t.key, r).catch(function(e) {
                                        if (404 !== e.status) throw e;
                                        return n()
                                    })
                                })
                            })
                        }
                    },
                    A = function(e) {
                        return function(t, r, n) {
                            var i = h(n);
                            return i.queryParameters["X-Algolia-User-ID"] = t, e.transporter.write({
                                method: y,
                                path: "1/clusters/mapping",
                                data: {
                                    cluster: r
                                }
                            }, i)
                        }
                    },
                    D = function(e) {
                        return function(t, r, n) {
                            return e.transporter.write({
                                method: y,
                                path: "1/clusters/mapping/batch",
                                data: {
                                    users: t,
                                    cluster: r
                                }
                            }, n)
                        }
                    },
                    k = function(e) {
                        return function(t, r) {
                            return c(e.transporter.write({
                                method: y,
                                path: f("/1/dictionaries/%s/batch", t),
                                data: {
                                    clearExistingDictionaryEntries: !0,
                                    requests: {
                                        action: "addEntry",
                                        body: []
                                    }
                                }
                            }, r), function(t, r) {
                                return ed(e)(t.taskID, r)
                            })
                        }
                    },
                    N = function(e) {
                        return function(t, r, n) {
                            return c(e.transporter.write({
                                method: y,
                                path: f("1/indexes/%s/operation", t),
                                data: {
                                    operation: "copy",
                                    destination: r
                                }
                            }, n), function(r, n) {
                                return Z(e)(t, {
                                    methods: {
                                        waitTask: eY
                                    }
                                }).waitTask(r.taskID, n)
                            })
                        }
                    },
                    H = function(e) {
                        return function(r, n, i) {
                            return N(e)(r, n, t(t({}, i), {}, {
                                scope: [e1.Rules]
                            }))
                        }
                    },
                    C = function(e) {
                        return function(r, n, i) {
                            return N(e)(r, n, t(t({}, i), {}, {
                                scope: [e1.Settings]
                            }))
                        }
                    },
                    q = function(e) {
                        return function(r, n, i) {
                            return N(e)(r, n, t(t({}, i), {}, {
                                scope: [e1.Synonyms]
                            }))
                        }
                    },
                    U = function(e) {
                        return function(t, r) {
                            return "GET" === t.method ? e.transporter.read(t, r) : e.transporter.write(t, r)
                        }
                    },
                    Q = function(e) {
                        return function(t, r) {
                            return c(e.transporter.write({
                                method: g,
                                path: f("1/keys/%s", t)
                            }, r), function(r, n) {
                                return s(function(r) {
                                    return W(e)(t, n).then(r).catch(function(e) {
                                        if (404 !== e.status) throw e
                                    })
                                })
                            })
                        }
                    },
                    L = function(e) {
                        return function(t, r, n) {
                            var i = r.map(function(e) {
                                return {
                                    action: "deleteEntry",
                                    body: {
                                        objectID: e
                                    }
                                }
                            });
                            return c(e.transporter.write({
                                method: y,
                                path: f("/1/dictionaries/%s/batch", t),
                                data: {
                                    clearExistingDictionaryEntries: !1,
                                    requests: i
                                }
                            }, n), function(t, r) {
                                return ed(e)(t.taskID, r)
                            })
                        }
                    },
                    W = function(e) {
                        return function(t, r) {
                            return e.transporter.read({
                                method: "GET",
                                path: f("1/keys/%s", t)
                            }, r)
                        }
                    },
                    $ = function(e) {
                        return function(t, r) {
                            return e.transporter.read({
                                method: "GET",
                                path: f("1/task/%s", t.toString())
                            }, r)
                        }
                    },
                    B = function(e) {
                        return function(t) {
                            return e.transporter.read({
                                method: "GET",
                                path: "/1/dictionaries/*/settings"
                            }, t)
                        }
                    },
                    M = function(e) {
                        return function(t) {
                            return e.transporter.read({
                                method: "GET",
                                path: "1/logs"
                            }, t)
                        }
                    },
                    J = function(e) {
                        return function(t) {
                            return e.transporter.read({
                                method: "GET",
                                path: "1/clusters/mapping/top"
                            }, t)
                        }
                    },
                    V = function(e) {
                        return function(t, r) {
                            return e.transporter.read({
                                method: "GET",
                                path: f("1/clusters/mapping/%s", t)
                            }, r)
                        }
                    },
                    z = function(e) {
                        return function(t) {
                            var n = t || {},
                                i = n.retrieveMappings,
                                a = r(n, ["retrieveMappings"]);
                            return !0 === i && (a.getClusters = !0), e.transporter.read({
                                method: "GET",
                                path: "1/clusters/mapping/pending"
                            }, a)
                        }
                    },
                    Z = function(e) {
                        return function(t) {
                            var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                            return u({
                                transporter: e.transporter,
                                appId: e.appId,
                                indexName: t
                            }, r.methods)
                        }
                    },
                    G = function(e) {
                        return function(t) {
                            return e.transporter.read({
                                method: "GET",
                                path: "1/keys"
                            }, t)
                        }
                    },
                    K = function(e) {
                        return function(t) {
                            return e.transporter.read({
                                method: "GET",
                                path: "1/clusters"
                            }, t)
                        }
                    },
                    X = function(e) {
                        return function(t) {
                            return e.transporter.read({
                                method: "GET",
                                path: "1/indexes"
                            }, t)
                        }
                    },
                    Y = function(e) {
                        return function(t) {
                            return e.transporter.read({
                                method: "GET",
                                path: "1/clusters/mapping"
                            }, t)
                        }
                    },
                    ee = function(e) {
                        return function(t, r, n) {
                            return c(e.transporter.write({
                                method: y,
                                path: f("1/indexes/%s/operation", t),
                                data: {
                                    operation: "move",
                                    destination: r
                                }
                            }, n), function(r, n) {
                                return Z(e)(t, {
                                    methods: {
                                        waitTask: eY
                                    }
                                }).waitTask(r.taskID, n)
                            })
                        }
                    },
                    et = function(e) {
                        return function(t, r) {
                            return c(e.transporter.write({
                                method: y,
                                path: "1/indexes/*/batch",
                                data: {
                                    requests: t
                                }
                            }, r), function(t, r) {
                                return Promise.all(Object.keys(t.taskID).map(function(n) {
                                    return Z(e)(n, {
                                        methods: {
                                            waitTask: eY
                                        }
                                    }).waitTask(t.taskID[n], r)
                                }))
                            })
                        }
                    },
                    er = function(e) {
                        return function(t, r) {
                            return e.transporter.read({
                                method: y,
                                path: "1/indexes/*/objects",
                                data: {
                                    requests: t
                                }
                            }, r)
                        }
                    },
                    en = function(e) {
                        return function(r, n) {
                            var i = r.map(function(e) {
                                return t(t({}, e), {}, {
                                    params: S(e.params || {})
                                })
                            });
                            return e.transporter.read({
                                method: y,
                                path: "1/indexes/*/queries",
                                data: {
                                    requests: i
                                },
                                cacheable: !0
                            }, n)
                        }
                    },
                    ei = function(e) {
                        return function(n, i) {
                            return Promise.all(n.map(function(n) {
                                var a = n.params,
                                    o = a.facetName,
                                    s = a.facetQuery,
                                    c = r(a, ["facetName", "facetQuery"]);
                                return Z(e)(n.indexName, {
                                    methods: {
                                        searchForFacetValues: eZ
                                    }
                                }).searchForFacetValues(o, s, t(t({}, i), c))
                            }))
                        }
                    },
                    ea = function(e) {
                        return function(t, r) {
                            var n = h(r);
                            return n.queryParameters["X-Algolia-User-ID"] = t, e.transporter.write({
                                method: g,
                                path: "1/clusters/mapping"
                            }, n)
                        }
                    },
                    eo = function(e) {
                        return function(t, r, n) {
                            var i = r.map(function(e) {
                                return {
                                    action: "addEntry",
                                    body: e
                                }
                            });
                            return c(e.transporter.write({
                                method: y,
                                path: f("/1/dictionaries/%s/batch", t),
                                data: {
                                    clearExistingDictionaryEntries: !0,
                                    requests: i
                                }
                            }, n), function(t, r) {
                                return ed(e)(t.taskID, r)
                            })
                        }
                    },
                    es = function(e) {
                        return function(t, r) {
                            return c(e.transporter.write({
                                method: y,
                                path: f("1/keys/%s/restore", t)
                            }, r), function(r, n) {
                                return s(function(r) {
                                    return W(e)(t, n).catch(function(e) {
                                        if (404 !== e.status) throw e;
                                        return r()
                                    })
                                })
                            })
                        }
                    },
                    ec = function(e) {
                        return function(t, r, n) {
                            var i = r.map(function(e) {
                                return {
                                    action: "addEntry",
                                    body: e
                                }
                            });
                            return c(e.transporter.write({
                                method: y,
                                path: f("/1/dictionaries/%s/batch", t),
                                data: {
                                    clearExistingDictionaryEntries: !1,
                                    requests: i
                                }
                            }, n), function(t, r) {
                                return ed(e)(t.taskID, r)
                            })
                        }
                    },
                    eu = function(e) {
                        return function(t, r, n) {
                            return e.transporter.read({
                                method: y,
                                path: f("/1/dictionaries/%s/search", t),
                                data: {
                                    query: r
                                },
                                cacheable: !0
                            }, n)
                        }
                    },
                    ef = function(e) {
                        return function(t, r) {
                            return e.transporter.read({
                                method: y,
                                path: "1/clusters/mapping/search",
                                data: {
                                    query: t
                                }
                            }, r)
                        }
                    },
                    el = function(e) {
                        return function(t, r) {
                            return c(e.transporter.write({
                                method: "PUT",
                                path: "/1/dictionaries/*/settings",
                                data: t
                            }, r), function(t, r) {
                                return ed(e)(t.taskID, r)
                            })
                        }
                    },
                    eh = function(e) {
                        return function(t, n) {
                            var i = Object.assign({}, n),
                                a = n || {},
                                o = a.queryParameters,
                                u = r(a, ["queryParameters"]),
                                l = ["acl", "indexes", "referers", "restrictSources", "queryParameters", "description", "maxQueriesPerIPPerHour", "maxHitsPerQuery"];
                            return c(e.transporter.write({
                                method: "PUT",
                                path: f("1/keys/%s", t),
                                data: o ? {
                                    queryParameters: o
                                } : {}
                            }, u), function(r, n) {
                                return s(function(r) {
                                    return W(e)(t, n).then(function(e) {
                                        return Object.keys(i).filter(function(e) {
                                            return -1 !== l.indexOf(e)
                                        }).every(function(t) {
                                            if (Array.isArray(e[t]) && Array.isArray(i[t])) {
                                                var r = e[t];
                                                return r.length === i[t].length && r.every(function(e, r) {
                                                    return e === i[t][r]
                                                })
                                            }
                                            return e[t] === i[t]
                                        }) ? Promise.resolve() : r()
                                    })
                                })
                            })
                        }
                    },
                    ed = function(e) {
                        return function(t, r) {
                            return s(function(n) {
                                return $(e)(t, r).then(function(e) {
                                    return "published" !== e.status ? n() : void 0
                                })
                            })
                        }
                    },
                    ep = function(e) {
                        return function(t, r) {
                            return c(e.transporter.write({
                                method: y,
                                path: f("1/indexes/%s/batch", e.indexName),
                                data: {
                                    requests: t
                                }
                            }, r), function(t, r) {
                                return eY(e)(t.taskID, r)
                            })
                        }
                    },
                    em = function(e) {
                        return function(r) {
                            return T(t(t({
                                shouldStop: function(e) {
                                    return void 0 === e.cursor
                                }
                            }, r), {}, {
                                request: function(t) {
                                    return e.transporter.read({
                                        method: y,
                                        path: f("1/indexes/%s/browse", e.indexName),
                                        data: t
                                    }, r)
                                }
                            }))
                        }
                    },
                    eg = function(e) {
                        return function(r) {
                            var n = t({
                                hitsPerPage: 1e3
                            }, r);
                            return T(t(t({
                                shouldStop: function(e) {
                                    return e.hits.length < n.hitsPerPage
                                }
                            }, n), {}, {
                                request: function(r) {
                                    return eG(e)("", t(t({}, n), r)).then(function(e) {
                                        return t(t({}, e), {}, {
                                            hits: e.hits.map(function(e) {
                                                return delete e._highlightResult, e
                                            })
                                        })
                                    })
                                }
                            }))
                        }
                    },
                    ey = function(e) {
                        return function(r) {
                            var n = t({
                                hitsPerPage: 1e3
                            }, r);
                            return T(t(t({
                                shouldStop: function(e) {
                                    return e.hits.length < n.hitsPerPage
                                }
                            }, n), {}, {
                                request: function(r) {
                                    return eK(e)("", t(t({}, n), r)).then(function(e) {
                                        return t(t({}, e), {}, {
                                            hits: e.hits.map(function(e) {
                                                return delete e._highlightResult, e
                                            })
                                        })
                                    })
                                }
                            }))
                        }
                    },
                    ev = function(e) {
                        return function(t, n, i) {
                            var a = i || {},
                                o = a.batchSize,
                                s = r(a, ["batchSize"]),
                                u = {
                                    taskIDs: [],
                                    objectIDs: []
                                };
                            return c(function r() {
                                var i, a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                                    c = [];
                                for (i = a; i < t.length && (c.push(t[i]), c.length !== (o || 1e3)); i++);
                                return 0 === c.length ? Promise.resolve(u) : ep(e)(c.map(function(e) {
                                    return {
                                        action: n,
                                        body: e
                                    }
                                }), s).then(function(e) {
                                    return u.objectIDs = u.objectIDs.concat(e.objectIDs), u.taskIDs.push(e.taskID), r(++i)
                                })
                            }(), function(t, r) {
                                return Promise.all(t.taskIDs.map(function(t) {
                                    return eY(e)(t, r)
                                }))
                            })
                        }
                    },
                    eb = function(e) {
                        return function(t) {
                            return c(e.transporter.write({
                                method: y,
                                path: f("1/indexes/%s/clear", e.indexName)
                            }, t), function(t, r) {
                                return eY(e)(t.taskID, r)
                            })
                        }
                    },
                    eS = function(e) {
                        return function(t) {
                            var n = t || {},
                                i = n.forwardToReplicas,
                                a = h(r(n, ["forwardToReplicas"]));
                            return i && (a.queryParameters.forwardToReplicas = 1), c(e.transporter.write({
                                method: y,
                                path: f("1/indexes/%s/rules/clear", e.indexName)
                            }, a), function(t, r) {
                                return eY(e)(t.taskID, r)
                            })
                        }
                    },
                    eO = function(e) {
                        return function(t) {
                            var n = t || {},
                                i = n.forwardToReplicas,
                                a = h(r(n, ["forwardToReplicas"]));
                            return i && (a.queryParameters.forwardToReplicas = 1), c(e.transporter.write({
                                method: y,
                                path: f("1/indexes/%s/synonyms/clear", e.indexName)
                            }, a), function(t, r) {
                                return eY(e)(t.taskID, r)
                            })
                        }
                    },
                    ej = function(e) {
                        return function(t, r) {
                            return c(e.transporter.write({
                                method: y,
                                path: f("1/indexes/%s/deleteByQuery", e.indexName),
                                data: t
                            }, r), function(t, r) {
                                return eY(e)(t.taskID, r)
                            })
                        }
                    },
                    eP = function(e) {
                        return function(t) {
                            return c(e.transporter.write({
                                method: g,
                                path: f("1/indexes/%s", e.indexName)
                            }, t), function(t, r) {
                                return eY(e)(t.taskID, r)
                            })
                        }
                    },
                    eR = function(e) {
                        return function(t, r) {
                            return c(ew(e)([t], r).then(function(e) {
                                return {
                                    taskID: e.taskIDs[0]
                                }
                            }), function(t, r) {
                                return eY(e)(t.taskID, r)
                            })
                        }
                    },
                    ew = function(e) {
                        return function(t, r) {
                            var n = t.map(function(e) {
                                return {
                                    objectID: e
                                }
                            });
                            return ev(e)(n, e0.DeleteObject, r)
                        }
                    },
                    ex = function(e) {
                        return function(t, n) {
                            var i = n || {},
                                a = i.forwardToReplicas,
                                o = h(r(i, ["forwardToReplicas"]));
                            return a && (o.queryParameters.forwardToReplicas = 1), c(e.transporter.write({
                                method: g,
                                path: f("1/indexes/%s/rules/%s", e.indexName, t)
                            }, o), function(t, r) {
                                return eY(e)(t.taskID, r)
                            })
                        }
                    },
                    eE = function(e) {
                        return function(t, n) {
                            var i = n || {},
                                a = i.forwardToReplicas,
                                o = h(r(i, ["forwardToReplicas"]));
                            return a && (o.queryParameters.forwardToReplicas = 1), c(e.transporter.write({
                                method: g,
                                path: f("1/indexes/%s/synonyms/%s", e.indexName, t)
                            }, o), function(t, r) {
                                return eY(e)(t.taskID, r)
                            })
                        }
                    },
                    eF = function(e) {
                        return function(t) {
                            return eN(e)(t).then(function() {
                                return !0
                            }).catch(function(e) {
                                if (404 !== e.status) throw e;
                                return !1
                            })
                        }
                    },
                    e_ = function(e) {
                        return function(t, r, n) {
                            return e.transporter.read({
                                method: y,
                                path: f("1/answers/%s/prediction", e.indexName),
                                data: {
                                    query: t,
                                    queryLanguages: r
                                },
                                cacheable: !0
                            }, n)
                        }
                    },
                    eT = function(e) {
                        return function(i, a) {
                            var o = a || {},
                                s = o.query,
                                c = o.paginate,
                                u = r(o, ["query", "paginate"]),
                                f = 0;
                            return function r() {
                                return ez(e)(s || "", t(t({}, u), {}, {
                                    page: f
                                })).then(function(e) {
                                    for (var t = 0, a = Object.entries(e.hits); t < a.length; t++) {
                                        var o = n(a[t], 2),
                                            s = o[0],
                                            u = o[1];
                                        if (i(u)) return {
                                            object: u,
                                            position: parseInt(s, 10),
                                            page: f
                                        }
                                    }
                                    if (f++, !1 === c || f >= e.nbPages) throw {
                                        name: "ObjectNotFoundError",
                                        message: "Object not found."
                                    };
                                    return r()
                                })
                            }()
                        }
                    },
                    eI = function(e) {
                        return function(t, r) {
                            return e.transporter.read({
                                method: "GET",
                                path: f("1/indexes/%s/%s", e.indexName, t)
                            }, r)
                        }
                    },
                    eA = function() {
                        return function(e, t) {
                            for (var r = 0, i = Object.entries(e.hits); r < i.length; r++) {
                                var a = n(i[r], 2),
                                    o = a[0];
                                if (a[1].objectID === t) return parseInt(o, 10)
                            }
                            return -1
                        }
                    },
                    eD = function(e) {
                        return function(n, i) {
                            var a = i || {},
                                o = a.attributesToRetrieve,
                                s = r(a, ["attributesToRetrieve"]),
                                c = n.map(function(r) {
                                    return t({
                                        indexName: e.indexName,
                                        objectID: r
                                    }, o ? {
                                        attributesToRetrieve: o
                                    } : {})
                                });
                            return e.transporter.read({
                                method: y,
                                path: "1/indexes/*/objects",
                                data: {
                                    requests: c
                                }
                            }, s)
                        }
                    },
                    ek = function(e) {
                        return function(t, r) {
                            return e.transporter.read({
                                method: "GET",
                                path: f("1/indexes/%s/rules/%s", e.indexName, t)
                            }, r)
                        }
                    },
                    eN = function(e) {
                        return function(t) {
                            return e.transporter.read({
                                method: "GET",
                                path: f("1/indexes/%s/settings", e.indexName),
                                data: {
                                    getVersion: 2
                                }
                            }, t)
                        }
                    },
                    eH = function(e) {
                        return function(t, r) {
                            return e.transporter.read({
                                method: "GET",
                                path: f("1/indexes/%s/synonyms/%s", e.indexName, t)
                            }, r)
                        }
                    },
                    eC = function(e) {
                        return function(t, r) {
                            return c(eq(e)([t], r).then(function(e) {
                                return {
                                    objectID: e.objectIDs[0],
                                    taskID: e.taskIDs[0]
                                }
                            }), function(t, r) {
                                return eY(e)(t.taskID, r)
                            })
                        }
                    },
                    eq = function(e) {
                        return function(t, n) {
                            var i = n || {},
                                a = i.createIfNotExists,
                                o = r(i, ["createIfNotExists"]),
                                s = a ? e0.PartialUpdateObject : e0.PartialUpdateObjectNoCreate;
                            return ev(e)(t, s, o)
                        }
                    },
                    eU = function(e) {
                        return function(a, o) {
                            var s = o || {},
                                u = s.safe,
                                l = s.autoGenerateObjectIDIfNotExist,
                                h = s.batchSize,
                                d = r(s, ["safe", "autoGenerateObjectIDIfNotExist", "batchSize"]),
                                p = function(t, r, n, i) {
                                    return c(e.transporter.write({
                                        method: y,
                                        path: f("1/indexes/%s/operation", t),
                                        data: {
                                            operation: n,
                                            destination: r
                                        }
                                    }, i), function(t, r) {
                                        return eY(e)(t.taskID, r)
                                    })
                                },
                                m = Math.random().toString(36).substring(7),
                                g = "".concat(e.indexName, "_tmp_").concat(m),
                                v = e$({
                                    appId: e.appId,
                                    transporter: e.transporter,
                                    indexName: g
                                }),
                                b = [],
                                S = p(e.indexName, g, "copy", t(t({}, d), {}, {
                                    scope: ["settings", "synonyms", "rules"]
                                }));
                            return b.push(S), c((u ? S.wait(d) : S).then(function() {
                                var e = v(a, t(t({}, d), {}, {
                                    autoGenerateObjectIDIfNotExist: l,
                                    batchSize: h
                                }));
                                return b.push(e), u ? e.wait(d) : e
                            }).then(function() {
                                var t = p(g, e.indexName, "move", d);
                                return b.push(t), u ? t.wait(d) : t
                            }).then(function() {
                                return Promise.all(b)
                            }).then(function(e) {
                                var t = n(e, 3),
                                    r = t[0],
                                    a = t[1],
                                    o = t[2];
                                return {
                                    objectIDs: a.objectIDs,
                                    taskIDs: [r.taskID].concat(i(a.taskIDs), [o.taskID])
                                }
                            }), function(e, t) {
                                return Promise.all(b.map(function(e) {
                                    return e.wait(t)
                                }))
                            })
                        }
                    },
                    eQ = function(e) {
                        return function(r, n) {
                            return eM(e)(r, t(t({}, n), {}, {
                                clearExistingRules: !0
                            }))
                        }
                    },
                    eL = function(e) {
                        return function(r, n) {
                            return eV(e)(r, t(t({}, n), {}, {
                                clearExistingSynonyms: !0
                            }))
                        }
                    },
                    eW = function(e) {
                        return function(t, r) {
                            return c(e$(e)([t], r).then(function(e) {
                                return {
                                    objectID: e.objectIDs[0],
                                    taskID: e.taskIDs[0]
                                }
                            }), function(t, r) {
                                return eY(e)(t.taskID, r)
                            })
                        }
                    },
                    e$ = function(e) {
                        return function(t, n) {
                            var i = n || {},
                                a = i.autoGenerateObjectIDIfNotExist,
                                o = r(i, ["autoGenerateObjectIDIfNotExist"]),
                                s = a ? e0.AddObject : e0.UpdateObject;
                            if (s === e0.UpdateObject) {
                                var u = !0,
                                    f = !1,
                                    l = void 0;
                                try {
                                    for (var h, d = t[Symbol.iterator](); !(u = (h = d.next()).done); u = !0)
                                        if (void 0 === h.value.objectID) return c(Promise.reject({
                                            name: "MissingObjectIDError",
                                            message: "All objects must have an unique objectID (like a primary key) to be valid. Algolia is also able to generate objectIDs automatically but *it's not recommended*. To do it, use the `{'autoGenerateObjectIDIfNotExist': true}` option."
                                        }))
                                } catch (e) {
                                    f = !0, l = e
                                } finally {
                                    try {
                                        u || null == d.return || d.return()
                                    } finally {
                                        if (f) throw l
                                    }
                                }
                            }
                            return ev(e)(t, s, o)
                        }
                    },
                    eB = function(e) {
                        return function(t, r) {
                            return eM(e)([t], r)
                        }
                    },
                    eM = function(e) {
                        return function(t, n) {
                            var i = n || {},
                                a = i.forwardToReplicas,
                                o = i.clearExistingRules,
                                s = h(r(i, ["forwardToReplicas", "clearExistingRules"]));
                            return a && (s.queryParameters.forwardToReplicas = 1), o && (s.queryParameters.clearExistingRules = 1), c(e.transporter.write({
                                method: y,
                                path: f("1/indexes/%s/rules/batch", e.indexName),
                                data: t
                            }, s), function(t, r) {
                                return eY(e)(t.taskID, r)
                            })
                        }
                    },
                    eJ = function(e) {
                        return function(t, r) {
                            return eV(e)([t], r)
                        }
                    },
                    eV = function(e) {
                        return function(t, n) {
                            var i = n || {},
                                a = i.forwardToReplicas,
                                o = i.clearExistingSynonyms,
                                s = i.replaceExistingSynonyms,
                                u = h(r(i, ["forwardToReplicas", "clearExistingSynonyms", "replaceExistingSynonyms"]));
                            return a && (u.queryParameters.forwardToReplicas = 1), (s || o) && (u.queryParameters.replaceExistingSynonyms = 1), c(e.transporter.write({
                                method: y,
                                path: f("1/indexes/%s/synonyms/batch", e.indexName),
                                data: t
                            }, u), function(t, r) {
                                return eY(e)(t.taskID, r)
                            })
                        }
                    },
                    ez = function(e) {
                        return function(t, r) {
                            return e.transporter.read({
                                method: y,
                                path: f("1/indexes/%s/query", e.indexName),
                                data: {
                                    query: t
                                },
                                cacheable: !0
                            }, r)
                        }
                    },
                    eZ = function(e) {
                        return function(t, r, n) {
                            return e.transporter.read({
                                method: y,
                                path: f("1/indexes/%s/facets/%s/query", e.indexName, t),
                                data: {
                                    facetQuery: r
                                },
                                cacheable: !0
                            }, n)
                        }
                    },
                    eG = function(e) {
                        return function(t, r) {
                            return e.transporter.read({
                                method: y,
                                path: f("1/indexes/%s/rules/search", e.indexName),
                                data: {
                                    query: t
                                }
                            }, r)
                        }
                    },
                    eK = function(e) {
                        return function(t, r) {
                            return e.transporter.read({
                                method: y,
                                path: f("1/indexes/%s/synonyms/search", e.indexName),
                                data: {
                                    query: t
                                }
                            }, r)
                        }
                    },
                    eX = function(e) {
                        return function(t, n) {
                            var i = n || {},
                                a = i.forwardToReplicas,
                                o = h(r(i, ["forwardToReplicas"]));
                            return a && (o.queryParameters.forwardToReplicas = 1), c(e.transporter.write({
                                method: "PUT",
                                path: f("1/indexes/%s/settings", e.indexName),
                                data: t
                            }, o), function(t, r) {
                                return eY(e)(t.taskID, r)
                            })
                        }
                    },
                    eY = function(e) {
                        return function(t, r) {
                            return s(function(n) {
                                return e.transporter.read({
                                    method: "GET",
                                    path: f("1/indexes/%s/task/%s", e.indexName, t.toString())
                                }, r).then(function(e) {
                                    return "published" !== e.status ? n() : void 0
                                })
                            })
                        }
                    },
                    e0 = {
                        AddObject: "addObject",
                        UpdateObject: "updateObject",
                        PartialUpdateObject: "partialUpdateObject",
                        PartialUpdateObjectNoCreate: "partialUpdateObjectNoCreate",
                        DeleteObject: "deleteObject"
                    },
                    e1 = {
                        Settings: "settings",
                        Synonyms: "synonyms",
                        Rules: "rules"
                    },
                    e2 = function(e) {
                        return function(r, n) {
                            var i = r.map(function(e) {
                                return t(t({}, e), {}, {
                                    threshold: e.threshold || 0
                                })
                            });
                            return e.transporter.read({
                                method: y,
                                path: "1/indexes/*/recommendations",
                                data: {
                                    requests: i
                                },
                                cacheable: !0
                            }, n)
                        }
                    },
                    e3 = function(e) {
                        return function(r, n) {
                            return e2(e)(r.map(function(e) {
                                return t(t({}, e), {}, {
                                    fallbackParameters: {},
                                    model: "bought-together"
                                })
                            }), n)
                        }
                    },
                    e8 = function(e) {
                        return function(r, n) {
                            return e2(e)(r.map(function(e) {
                                return t(t({}, e), {}, {
                                    model: "related-products"
                                })
                            }), n)
                        }
                    },
                    e6 = function(e) {
                        return function(r, n) {
                            var i = r.map(function(e) {
                                return t(t({}, e), {}, {
                                    model: "trending-facets",
                                    threshold: e.threshold || 0
                                })
                            });
                            return e.transporter.read({
                                method: y,
                                path: "1/indexes/*/recommendations",
                                data: {
                                    requests: i
                                },
                                cacheable: !0
                            }, n)
                        }
                    },
                    e9 = function(e) {
                        return function(r, n) {
                            var i = r.map(function(e) {
                                return t(t({}, e), {}, {
                                    model: "trending-items",
                                    threshold: e.threshold || 0
                                })
                            });
                            return e.transporter.read({
                                method: y,
                                path: "1/indexes/*/recommendations",
                                data: {
                                    requests: i
                                },
                                cacheable: !0
                            }, n)
                        }
                    },
                    e4 = function(e) {
                        return function(r, n) {
                            return e2(e)(r.map(function(e) {
                                return t(t({}, e), {}, {
                                    model: "looking-similar"
                                })
                            }), n)
                        }
                    },
                    e5 = function(e) {
                        return function(r, n) {
                            var i = r.map(function(e) {
                                return t(t({}, e), {}, {
                                    model: "recommended-for-you",
                                    threshold: e.threshold || 0
                                })
                            });
                            return e.transporter.read({
                                method: y,
                                path: "1/indexes/*/recommendations",
                                data: {
                                    requests: i
                                },
                                cacheable: !0
                            }, n)
                        }
                    };

                function e7(e, r, s) {
                    var c, f, h, p, m, g, y, v, S, O, j, T, ev = {
                            appId: e,
                            apiKey: r,
                            timeouts: {
                                connect: 1,
                                read: 2,
                                write: 30
                            },
                            requester: {
                                send: function(e) {
                                    return new Promise(function(t) {
                                        var r = new XMLHttpRequest;
                                        r.open(e.method, e.url, !0), Object.keys(e.headers).forEach(function(t) {
                                            return r.setRequestHeader(t, e.headers[t])
                                        });
                                        var n, i = function(e, n) {
                                                return setTimeout(function() {
                                                    r.abort(), t({
                                                        status: 0,
                                                        content: n,
                                                        isTimedOut: !0
                                                    })
                                                }, 1e3 * e)
                                            },
                                            a = i(e.connectTimeout, "Connection timeout");
                                        r.onreadystatechange = function() {
                                            r.readyState > r.OPENED && void 0 === n && (clearTimeout(a), n = i(e.responseTimeout, "Socket timeout"))
                                        }, r.onerror = function() {
                                            0 === r.status && (clearTimeout(a), clearTimeout(n), t({
                                                content: r.responseText || "Network request failed",
                                                status: r.status,
                                                isTimedOut: !1
                                            }))
                                        }, r.onload = function() {
                                            clearTimeout(a), clearTimeout(n), t({
                                                content: r.responseText,
                                                status: r.status,
                                                isTimedOut: !1
                                            })
                                        }, r.send(e.data)
                                    })
                                }
                            },
                            logger: {
                                debug: function(e, t) {
                                    return Promise.resolve()
                                },
                                info: function(e, t) {
                                    return Promise.resolve()
                                },
                                error: function(e, t) {
                                    return console.error(e, t), Promise.resolve()
                                }
                            },
                            responsesCache: a(),
                            requestsCache: a({
                                serializable: !1
                            }),
                            hostsCache: function e(t) {
                                var r = i(t.caches),
                                    a = r.shift();
                                return void 0 === a ? {
                                    get: function(e, t) {
                                        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {
                                            miss: function() {
                                                return Promise.resolve()
                                            }
                                        };
                                        return t().then(function(e) {
                                            return Promise.all([e, r.miss(e)])
                                        }).then(function(e) {
                                            return n(e, 1)[0]
                                        })
                                    },
                                    set: function(e, t) {
                                        return Promise.resolve(t)
                                    },
                                    delete: function(e) {
                                        return Promise.resolve()
                                    },
                                    clear: function() {
                                        return Promise.resolve()
                                    }
                                } : {
                                    get: function(t, n) {
                                        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {
                                            miss: function() {
                                                return Promise.resolve()
                                            }
                                        };
                                        return a.get(t, n, i).catch(function() {
                                            return e({
                                                caches: r
                                            }).get(t, n, i)
                                        })
                                    },
                                    set: function(t, n) {
                                        return a.set(t, n).catch(function() {
                                            return e({
                                                caches: r
                                            }).set(t, n)
                                        })
                                    },
                                    delete: function(t) {
                                        return a.delete(t).catch(function() {
                                            return e({
                                                caches: r
                                            }).delete(t)
                                        })
                                    },
                                    clear: function() {
                                        return a.clear().catch(function() {
                                            return e({
                                                caches: r
                                            }).clear()
                                        })
                                    }
                                }
                            }({
                                caches: [(c = {
                                    key: "".concat("4.23.3", "-").concat(e)
                                }, h = "algoliasearch-client-js-".concat(c.key), p = function() {
                                    return void 0 === f && (f = c.localStorage || window.localStorage), f
                                }, m = function() {
                                    return JSON.parse(p().getItem(h) || "{}")
                                }, g = function(e) {
                                    p().setItem(h, JSON.stringify(e))
                                }, y = function() {
                                    var e = c.timeToLive ? 1e3 * c.timeToLive : null,
                                        t = Object.fromEntries(Object.entries(m()).filter(function(e) {
                                            return void 0 !== n(e, 2)[1].timestamp
                                        }));
                                    g(t), e && g(Object.fromEntries(Object.entries(t).filter(function(t) {
                                        var r = n(t, 2)[1],
                                            i = (new Date).getTime();
                                        return !(r.timestamp + e < i)
                                    })))
                                }, {
                                    get: function(e, t) {
                                        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {
                                            miss: function() {
                                                return Promise.resolve()
                                            }
                                        };
                                        return Promise.resolve().then(function() {
                                            y();
                                            var t = JSON.stringify(e);
                                            return m()[t]
                                        }).then(function(e) {
                                            return Promise.all([e ? e.value : t(), void 0 !== e])
                                        }).then(function(e) {
                                            var t = n(e, 2),
                                                i = t[0];
                                            return Promise.all([i, t[1] || r.miss(i)])
                                        }).then(function(e) {
                                            return n(e, 1)[0]
                                        })
                                    },
                                    set: function(e, t) {
                                        return Promise.resolve().then(function() {
                                            var r = m();
                                            return r[JSON.stringify(e)] = {
                                                timestamp: (new Date).getTime(),
                                                value: t
                                            }, p().setItem(h, JSON.stringify(r)), t
                                        })
                                    },
                                    delete: function(e) {
                                        return Promise.resolve().then(function() {
                                            var t = m();
                                            delete t[JSON.stringify(e)], p().setItem(h, JSON.stringify(t))
                                        })
                                    },
                                    clear: function() {
                                        return Promise.resolve().then(function() {
                                            p().removeItem(h)
                                        })
                                    }
                                }), a()]
                            }),
                            userAgent: (v = {
                                value: "Algolia for JavaScript (".concat("4.23.3", ")"),
                                add: function(e) {
                                    var t = "; ".concat(e.segment).concat(void 0 !== e.version ? " (".concat(e.version, ")") : "");
                                    return -1 === v.value.indexOf(t) && (v.value = "".concat(v.value).concat(t)), v
                                }
                            }).add({
                                segment: "Browser"
                            })
                        },
                        e0 = t(t({}, ev), s),
                        e1 = function() {
                            return function(e) {
                                var r, n, i, a;
                                return n = (r = t(t(t({}, ev), e), {}, {
                                    methods: {
                                        getPersonalizationStrategy: F,
                                        setPersonalizationStrategy: _
                                    }
                                })).region || "us", i = o(l.WithinHeaders, r.appId, r.apiKey), a = b(t(t({
                                    hosts: [{
                                        url: "personalization.".concat(n, ".algolia.com")
                                    }]
                                }, r), {}, {
                                    headers: t(t(t({}, i.headers()), {
                                        "content-type": "application/json"
                                    }), r.headers),
                                    queryParameters: t(t({}, i.queryParameters()), r.queryParameters)
                                })), u({
                                    appId: r.appId,
                                    transporter: a
                                }, r.methods)
                            }
                        };
                    return O = (S = t(t({}, e0), {}, {
                        methods: {
                            search: en,
                            searchForFacetValues: ei,
                            multipleBatch: et,
                            multipleGetObjects: er,
                            multipleQueries: en,
                            copyIndex: N,
                            copySettings: C,
                            copySynonyms: q,
                            copyRules: H,
                            moveIndex: ee,
                            listIndices: X,
                            getLogs: M,
                            listClusters: K,
                            multipleSearchForFacetValues: ei,
                            getApiKey: W,
                            addApiKey: I,
                            listApiKeys: G,
                            updateApiKey: eh,
                            deleteApiKey: Q,
                            restoreApiKey: es,
                            assignUserID: A,
                            assignUserIDs: D,
                            getUserID: V,
                            searchUserIDs: ef,
                            listUserIDs: Y,
                            getTopUserIDs: J,
                            removeUserID: ea,
                            hasPendingMappings: z,
                            clearDictionaryEntries: k,
                            deleteDictionaryEntries: L,
                            getDictionarySettings: B,
                            getAppTask: $,
                            replaceDictionaryEntries: eo,
                            saveDictionaryEntries: ec,
                            searchDictionaryEntries: eu,
                            setDictionarySettings: el,
                            waitAppTask: ed,
                            customRequest: U,
                            initIndex: function(e) {
                                return function(t) {
                                    return Z(e)(t, {
                                        methods: {
                                            batch: ep,
                                            delete: eP,
                                            findAnswers: e_,
                                            getObject: eI,
                                            getObjects: eD,
                                            saveObject: eW,
                                            saveObjects: e$,
                                            search: ez,
                                            searchForFacetValues: eZ,
                                            waitTask: eY,
                                            setSettings: eX,
                                            getSettings: eN,
                                            partialUpdateObject: eC,
                                            partialUpdateObjects: eq,
                                            deleteObject: eR,
                                            deleteObjects: ew,
                                            deleteBy: ej,
                                            clearObjects: eb,
                                            browseObjects: em,
                                            getObjectPosition: eA,
                                            findObject: eT,
                                            exists: eF,
                                            saveSynonym: eJ,
                                            saveSynonyms: eV,
                                            getSynonym: eH,
                                            searchSynonyms: eK,
                                            browseSynonyms: ey,
                                            deleteSynonym: eE,
                                            clearSynonyms: eO,
                                            replaceAllObjects: eU,
                                            replaceAllSynonyms: eL,
                                            searchRules: eG,
                                            getRule: ek,
                                            deleteRule: ex,
                                            saveRule: eB,
                                            saveRules: eM,
                                            replaceAllRules: eQ,
                                            browseRules: eg,
                                            clearRules: eS
                                        }
                                    })
                                }
                            },
                            initAnalytics: function() {
                                return function(e) {
                                    var r, n, i, a;
                                    return n = (r = t(t(t({}, ev), e), {}, {
                                        methods: {
                                            addABTest: P,
                                            getABTest: w,
                                            getABTests: x,
                                            stopABTest: E,
                                            deleteABTest: R
                                        }
                                    })).region || "us", i = o(l.WithinHeaders, r.appId, r.apiKey), a = b(t(t({
                                        hosts: [{
                                            url: "analytics.".concat(n, ".algolia.com")
                                        }]
                                    }, r), {}, {
                                        headers: t(t(t({}, i.headers()), {
                                            "content-type": "application/json"
                                        }), r.headers),
                                        queryParameters: t(t({}, i.queryParameters()), r.queryParameters)
                                    })), u({
                                        appId: r.appId,
                                        transporter: a
                                    }, r.methods)
                                }
                            },
                            initPersonalization: e1,
                            initRecommendation: function() {
                                return function(e) {
                                    return e0.logger.info("The `initRecommendation` method is deprecated. Use `initPersonalization` instead."), e1()(e)
                                }
                            },
                            getRecommendations: e2,
                            getFrequentlyBoughtTogether: e3,
                            getLookingSimilar: e4,
                            getRecommendedForYou: e5,
                            getRelatedProducts: e8,
                            getTrendingFacets: e6,
                            getTrendingItems: e9
                        }
                    })).appId, j = o(void 0 !== S.authMode ? S.authMode : l.WithinHeaders, O, S.apiKey), u({
                        transporter: T = b(t(t({
                            hosts: [{
                                url: "".concat(O, "-dsn.algolia.net"),
                                accept: d.Read
                            }, {
                                url: "".concat(O, ".algolia.net"),
                                accept: d.Write
                            }].concat(function(e) {
                                for (var t = e.length - 1; t > 0; t--) {
                                    var r = Math.floor(Math.random() * (t + 1)),
                                        n = e[t];
                                    e[t] = e[r], e[r] = n
                                }
                                return e
                            }([{
                                url: "".concat(O, "-1.algolianet.com")
                            }, {
                                url: "".concat(O, "-2.algolianet.com")
                            }, {
                                url: "".concat(O, "-3.algolianet.com")
                            }]))
                        }, S), {}, {
                            headers: t(t(t({}, j.headers()), {
                                "content-type": "application/x-www-form-urlencoded"
                            }), S.headers),
                            queryParameters: t(t({}, j.queryParameters()), S.queryParameters)
                        })),
                        appId: O,
                        addAlgoliaAgent: function(e, t) {
                            T.userAgent.add({
                                segment: e,
                                version: t
                            })
                        },
                        clearCache: function() {
                            return Promise.all([T.requestsCache.clear(), T.responsesCache.clear()]).then(function() {})
                        }
                    }, S.methods)
                }
                return e7.version = "4.23.3", e7
            }, e.exports = t()
        },
        28464: function(e) {
            "use strict";
            var t = String.prototype.replace,
                r = /%20/g,
                n = "RFC3986";
            e.exports = {
                default: n,
                formatters: {
                    RFC1738: function(e) {
                        return t.call(e, r, "+")
                    },
                    RFC3986: function(e) {
                        return String(e)
                    }
                },
                RFC1738: "RFC1738",
                RFC3986: n
            }
        },
        97036: function(e, t, r) {
            "use strict";
            var n = r(24747),
                i = r(38543),
                a = r(28464);
            e.exports = {
                formats: a,
                parse: i,
                stringify: n
            }
        },
        38543: function(e, t, r) {
            "use strict";
            var n = r(12937),
                i = Object.prototype.hasOwnProperty,
                a = Array.isArray,
                o = {
                    allowDots: !1,
                    allowPrototypes: !1,
                    arrayLimit: 20,
                    charset: "utf-8",
                    charsetSentinel: !1,
                    comma: !1,
                    decoder: n.decode,
                    delimiter: "&",
                    depth: 5,
                    ignoreQueryPrefix: !1,
                    interpretNumericEntities: !1,
                    parameterLimit: 1e3,
                    parseArrays: !0,
                    plainObjects: !1,
                    strictNullHandling: !1
                },
                s = function(e, t) {
                    return e && "string" == typeof e && t.comma && e.indexOf(",") > -1 ? e.split(",") : e
                },
                c = function(e, t) {
                    var r = {},
                        c = t.ignoreQueryPrefix ? e.replace(/^\?/, "") : e,
                        u = t.parameterLimit === 1 / 0 ? void 0 : t.parameterLimit,
                        f = c.split(t.delimiter, u),
                        l = -1,
                        h = t.charset;
                    if (t.charsetSentinel)
                        for (d = 0; d < f.length; ++d) 0 === f[d].indexOf("utf8=") && ("utf8=%E2%9C%93" === f[d] ? h = "utf-8" : "utf8=%26%2310003%3B" === f[d] && (h = "iso-8859-1"), l = d, d = f.length);
                    for (d = 0; d < f.length; ++d)
                        if (d !== l) {
                            var d, p, m, g = f[d],
                                y = g.indexOf("]="),
                                v = -1 === y ? g.indexOf("=") : y + 1; - 1 === v ? (p = t.decoder(g, o.decoder, h, "key"), m = t.strictNullHandling ? null : "") : (p = t.decoder(g.slice(0, v), o.decoder, h, "key"), m = n.maybeMap(s(g.slice(v + 1), t), function(e) {
                                return t.decoder(e, o.decoder, h, "value")
                            })), m && t.interpretNumericEntities && "iso-8859-1" === h && (m = m.replace(/&#(\d+);/g, function(e, t) {
                                return String.fromCharCode(parseInt(t, 10))
                            })), g.indexOf("[]=") > -1 && (m = a(m) ? [m] : m), i.call(r, p) ? r[p] = n.combine(r[p], m) : r[p] = m
                        }
                    return r
                },
                u = function(e, t, r, n) {
                    for (var i = n ? t : s(t, r), a = e.length - 1; a >= 0; --a) {
                        var o, c = e[a];
                        if ("[]" === c && r.parseArrays) o = [].concat(i);
                        else {
                            o = r.plainObjects ? Object.create(null) : {};
                            var u = "[" === c.charAt(0) && "]" === c.charAt(c.length - 1) ? c.slice(1, -1) : c,
                                f = parseInt(u, 10);
                            r.parseArrays || "" !== u ? !isNaN(f) && c !== u && String(f) === u && f >= 0 && r.parseArrays && f <= r.arrayLimit ? (o = [])[f] = i : "__proto__" !== u && (o[u] = i) : o = {
                                0: i
                            }
                        }
                        i = o
                    }
                    return i
                },
                f = function(e, t, r, n) {
                    if (e) {
                        var a = r.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e,
                            o = /(\[[^[\]]*])/g,
                            s = r.depth > 0 && /(\[[^[\]]*])/.exec(a),
                            c = s ? a.slice(0, s.index) : a,
                            f = [];
                        if (c) {
                            if (!r.plainObjects && i.call(Object.prototype, c) && !r.allowPrototypes) return;
                            f.push(c)
                        }
                        for (var l = 0; r.depth > 0 && null !== (s = o.exec(a)) && l < r.depth;) {
                            if (l += 1, !r.plainObjects && i.call(Object.prototype, s[1].slice(1, -1)) && !r.allowPrototypes) return;
                            f.push(s[1])
                        }
                        return s && f.push("[" + a.slice(s.index) + "]"), u(f, t, r, n)
                    }
                },
                l = function(e) {
                    if (!e) return o;
                    if (null !== e.decoder && void 0 !== e.decoder && "function" != typeof e.decoder) throw TypeError("Decoder has to be a function.");
                    if (void 0 !== e.charset && "utf-8" !== e.charset && "iso-8859-1" !== e.charset) throw TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
                    var t = void 0 === e.charset ? o.charset : e.charset;
                    return {
                        allowDots: void 0 === e.allowDots ? o.allowDots : !!e.allowDots,
                        allowPrototypes: "boolean" == typeof e.allowPrototypes ? e.allowPrototypes : o.allowPrototypes,
                        arrayLimit: "number" == typeof e.arrayLimit ? e.arrayLimit : o.arrayLimit,
                        charset: t,
                        charsetSentinel: "boolean" == typeof e.charsetSentinel ? e.charsetSentinel : o.charsetSentinel,
                        comma: "boolean" == typeof e.comma ? e.comma : o.comma,
                        decoder: "function" == typeof e.decoder ? e.decoder : o.decoder,
                        delimiter: "string" == typeof e.delimiter || n.isRegExp(e.delimiter) ? e.delimiter : o.delimiter,
                        depth: "number" == typeof e.depth || !1 === e.depth ? +e.depth : o.depth,
                        ignoreQueryPrefix: !0 === e.ignoreQueryPrefix,
                        interpretNumericEntities: "boolean" == typeof e.interpretNumericEntities ? e.interpretNumericEntities : o.interpretNumericEntities,
                        parameterLimit: "number" == typeof e.parameterLimit ? e.parameterLimit : o.parameterLimit,
                        parseArrays: !1 !== e.parseArrays,
                        plainObjects: "boolean" == typeof e.plainObjects ? e.plainObjects : o.plainObjects,
                        strictNullHandling: "boolean" == typeof e.strictNullHandling ? e.strictNullHandling : o.strictNullHandling
                    }
                };
            e.exports = function(e, t) {
                var r = l(t);
                if ("" === e || null == e) return r.plainObjects ? Object.create(null) : {};
                for (var i = "string" == typeof e ? c(e, r) : e, a = r.plainObjects ? Object.create(null) : {}, o = Object.keys(i), s = 0; s < o.length; ++s) {
                    var u = o[s],
                        h = f(u, i[u], r, "string" == typeof e);
                    a = n.merge(a, h, r)
                }
                return n.compact(a)
            }
        },
        24747: function(e, t, r) {
            "use strict";
            var n = r(12937),
                i = r(28464),
                a = Object.prototype.hasOwnProperty,
                o = {
                    brackets: function(e) {
                        return e + "[]"
                    },
                    comma: "comma",
                    indices: function(e, t) {
                        return e + "[" + t + "]"
                    },
                    repeat: function(e) {
                        return e
                    }
                },
                s = Array.isArray,
                c = String.prototype.split,
                u = Array.prototype.push,
                f = function(e, t) {
                    u.apply(e, s(t) ? t : [t])
                },
                l = Date.prototype.toISOString,
                h = i.default,
                d = {
                    addQueryPrefix: !1,
                    allowDots: !1,
                    charset: "utf-8",
                    charsetSentinel: !1,
                    delimiter: "&",
                    encode: !0,
                    encoder: n.encode,
                    encodeValuesOnly: !1,
                    format: h,
                    formatter: i.formatters[h],
                    indices: !1,
                    serializeDate: function(e) {
                        return l.call(e)
                    },
                    skipNulls: !1,
                    strictNullHandling: !1
                },
                p = function e(t, r, i, a, o, u, l, h, p, m, g, y, v, b) {
                    var S, O, j = t;
                    if ("function" == typeof l ? j = l(r, j) : j instanceof Date ? j = m(j) : "comma" === i && s(j) && (j = n.maybeMap(j, function(e) {
                            return e instanceof Date ? m(e) : e
                        })), null === j) {
                        if (a) return u && !v ? u(r, d.encoder, b, "key", g) : r;
                        j = ""
                    }
                    if ("string" == typeof(S = j) || "number" == typeof S || "boolean" == typeof S || "symbol" == typeof S || "bigint" == typeof S || n.isBuffer(j)) {
                        if (u) {
                            var P = v ? r : u(r, d.encoder, b, "key", g);
                            if ("comma" === i && v) {
                                for (var R = c.call(String(j), ","), w = "", x = 0; x < R.length; ++x) w += (0 === x ? "" : ",") + y(u(R[x], d.encoder, b, "value", g));
                                return [y(P) + "=" + w]
                            }
                            return [y(P) + "=" + y(u(j, d.encoder, b, "value", g))]
                        }
                        return [y(r) + "=" + y(String(j))]
                    }
                    var E = [];
                    if (void 0 === j) return E;
                    if ("comma" === i && s(j)) O = [{
                        value: j.length > 0 ? j.join(",") || null : void 0
                    }];
                    else if (s(l)) O = l;
                    else {
                        var F = Object.keys(j);
                        O = h ? F.sort(h) : F
                    }
                    for (var _ = 0; _ < O.length; ++_) {
                        var T = O[_],
                            I = "object" == typeof T && void 0 !== T.value ? T.value : j[T];
                        o && null === I || f(E, e(I, s(j) ? "function" == typeof i ? i(r, T) : r : r + (p ? "." + T : "[" + T + "]"), i, a, o, u, l, h, p, m, g, y, v, b))
                    }
                    return E
                },
                m = function(e) {
                    if (!e) return d;
                    if (null !== e.encoder && void 0 !== e.encoder && "function" != typeof e.encoder) throw TypeError("Encoder has to be a function.");
                    var t = e.charset || d.charset;
                    if (void 0 !== e.charset && "utf-8" !== e.charset && "iso-8859-1" !== e.charset) throw TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
                    var r = i.default;
                    if (void 0 !== e.format) {
                        if (!a.call(i.formatters, e.format)) throw TypeError("Unknown format option provided.");
                        r = e.format
                    }
                    var n = i.formatters[r],
                        o = d.filter;
                    return ("function" == typeof e.filter || s(e.filter)) && (o = e.filter), {
                        addQueryPrefix: "boolean" == typeof e.addQueryPrefix ? e.addQueryPrefix : d.addQueryPrefix,
                        allowDots: void 0 === e.allowDots ? d.allowDots : !!e.allowDots,
                        charset: t,
                        charsetSentinel: "boolean" == typeof e.charsetSentinel ? e.charsetSentinel : d.charsetSentinel,
                        delimiter: void 0 === e.delimiter ? d.delimiter : e.delimiter,
                        encode: "boolean" == typeof e.encode ? e.encode : d.encode,
                        encoder: "function" == typeof e.encoder ? e.encoder : d.encoder,
                        encodeValuesOnly: "boolean" == typeof e.encodeValuesOnly ? e.encodeValuesOnly : d.encodeValuesOnly,
                        filter: o,
                        format: r,
                        formatter: n,
                        serializeDate: "function" == typeof e.serializeDate ? e.serializeDate : d.serializeDate,
                        skipNulls: "boolean" == typeof e.skipNulls ? e.skipNulls : d.skipNulls,
                        sort: "function" == typeof e.sort ? e.sort : null,
                        strictNullHandling: "boolean" == typeof e.strictNullHandling ? e.strictNullHandling : d.strictNullHandling
                    }
                };
            e.exports = function(e, t) {
                var r, n, i = e,
                    a = m(t);
                "function" == typeof a.filter ? i = (0, a.filter)("", i) : s(a.filter) && (r = a.filter);
                var c = [];
                if ("object" != typeof i || null === i) return "";
                n = t && t.arrayFormat in o ? t.arrayFormat : t && "indices" in t ? t.indices ? "indices" : "repeat" : "indices";
                var u = o[n];
                r || (r = Object.keys(i)), a.sort && r.sort(a.sort);
                for (var l = 0; l < r.length; ++l) {
                    var h = r[l];
                    a.skipNulls && null === i[h] || f(c, p(i[h], h, u, a.strictNullHandling, a.skipNulls, a.encode ? a.encoder : null, a.filter, a.sort, a.allowDots, a.serializeDate, a.format, a.formatter, a.encodeValuesOnly, a.charset))
                }
                var d = c.join(a.delimiter),
                    g = !0 === a.addQueryPrefix ? "?" : "";
                return a.charsetSentinel && ("iso-8859-1" === a.charset ? g += "utf8=%26%2310003%3B&" : g += "utf8=%E2%9C%93&"), d.length > 0 ? g + d : ""
            }
        },
        12937: function(e, t, r) {
            "use strict";
            var n = r(28464),
                i = Object.prototype.hasOwnProperty,
                a = Array.isArray,
                o = function() {
                    for (var e = [], t = 0; t < 256; ++t) e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
                    return e
                }(),
                s = function(e) {
                    for (; e.length > 1;) {
                        var t = e.pop(),
                            r = t.obj[t.prop];
                        if (a(r)) {
                            for (var n = [], i = 0; i < r.length; ++i) void 0 !== r[i] && n.push(r[i]);
                            t.obj[t.prop] = n
                        }
                    }
                },
                c = function(e, t) {
                    for (var r = t && t.plainObjects ? Object.create(null) : {}, n = 0; n < e.length; ++n) void 0 !== e[n] && (r[n] = e[n]);
                    return r
                };
            e.exports = {
                arrayToObject: c,
                assign: function(e, t) {
                    return Object.keys(t).reduce(function(e, r) {
                        return e[r] = t[r], e
                    }, e)
                },
                combine: function(e, t) {
                    return [].concat(e, t)
                },
                compact: function(e) {
                    for (var t = [{
                            obj: {
                                o: e
                            },
                            prop: "o"
                        }], r = [], n = 0; n < t.length; ++n)
                        for (var i = t[n], a = i.obj[i.prop], o = Object.keys(a), c = 0; c < o.length; ++c) {
                            var u = o[c],
                                f = a[u];
                            "object" == typeof f && null !== f && -1 === r.indexOf(f) && (t.push({
                                obj: a,
                                prop: u
                            }), r.push(f))
                        }
                    return s(t), e
                },
                decode: function(e, t, r) {
                    var n = e.replace(/\+/g, " ");
                    if ("iso-8859-1" === r) return n.replace(/%[0-9a-f]{2}/gi, unescape);
                    try {
                        return decodeURIComponent(n)
                    } catch (e) {
                        return n
                    }
                },
                encode: function(e, t, r, i, a) {
                    if (0 === e.length) return e;
                    var s = e;
                    if ("symbol" == typeof e ? s = Symbol.prototype.toString.call(e) : "string" != typeof e && (s = String(e)), "iso-8859-1" === r) return escape(s).replace(/%u[0-9a-f]{4}/gi, function(e) {
                        return "%26%23" + parseInt(e.slice(2), 16) + "%3B"
                    });
                    for (var c = "", u = 0; u < s.length; ++u) {
                        var f = s.charCodeAt(u);
                        if (45 === f || 46 === f || 95 === f || 126 === f || f >= 48 && f <= 57 || f >= 65 && f <= 90 || f >= 97 && f <= 122 || a === n.RFC1738 && (40 === f || 41 === f)) {
                            c += s.charAt(u);
                            continue
                        }
                        if (f < 128) {
                            c += o[f];
                            continue
                        }
                        if (f < 2048) {
                            c += o[192 | f >> 6] + o[128 | 63 & f];
                            continue
                        }
                        if (f < 55296 || f >= 57344) {
                            c += o[224 | f >> 12] + o[128 | f >> 6 & 63] + o[128 | 63 & f];
                            continue
                        }
                        u += 1, c += o[240 | (f = 65536 + ((1023 & f) << 10 | 1023 & s.charCodeAt(u))) >> 18] + o[128 | f >> 12 & 63] + o[128 | f >> 6 & 63] + o[128 | 63 & f]
                    }
                    return c
                },
                isBuffer: function(e) {
                    return !!e && "object" == typeof e && !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e))
                },
                isRegExp: function(e) {
                    return "[object RegExp]" === Object.prototype.toString.call(e)
                },
                maybeMap: function(e, t) {
                    if (a(e)) {
                        for (var r = [], n = 0; n < e.length; n += 1) r.push(t(e[n]));
                        return r
                    }
                    return t(e)
                },
                merge: function e(t, r, n) {
                    if (!r) return t;
                    if ("object" != typeof r) {
                        if (a(t)) t.push(r);
                        else {
                            if (!t || "object" != typeof t) return [t, r];
                            (n && (n.plainObjects || n.allowPrototypes) || !i.call(Object.prototype, r)) && (t[r] = !0)
                        }
                        return t
                    }
                    if (!t || "object" != typeof t) return [t].concat(r);
                    var o = t;
                    return (a(t) && !a(r) && (o = c(t, n)), a(t) && a(r)) ? (r.forEach(function(r, a) {
                        if (i.call(t, a)) {
                            var o = t[a];
                            o && "object" == typeof o && r && "object" == typeof r ? t[a] = e(o, r, n) : t.push(r)
                        } else t[a] = r
                    }), t) : Object.keys(r).reduce(function(t, a) {
                        var o = r[a];
                        return i.call(t, a) ? t[a] = e(t[a], o, n) : t[a] = o, t
                    }, o)
                }
            }
        },
        72887: function(e) {
            e.exports = function(e, t, r) {
                return e == e && (void 0 !== r && (e = e <= r ? e : r), void 0 !== t && (e = e >= t ? e : t)), e
            }
        },
        57713: function(e, t, r) {
            var n = r(72887),
                i = r(25522);
            e.exports = function(e, t, r) {
                return void 0 === r && (r = t, t = void 0), void 0 !== r && (r = (r = i(r)) == r ? r : 0), void 0 !== t && (t = (t = i(t)) == t ? t : 0), n(i(e), t, r)
            }
        },
        897: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), Object.defineProperty(t, "BailoutToCSR", {
                enumerable: !0,
                get: function() {
                    return i
                }
            });
            let n = r(86463);

            function i(e) {
                let {
                    reason: t,
                    children: r
                } = e;
                if ("undefined" == typeof window) throw new n.BailoutToCSRError(t);
                return r
            }
        },
        30697: function(e, t, r) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), Object.defineProperty(t, "PreloadCss", {
                enumerable: !0,
                get: function() {
                    return a
                }
            });
            let n = r(27573),
                i = r(51458);

            function a(e) {
                let {
                    moduleIds: t
                } = e;
                if ("undefined" != typeof window) return null;
                let r = (0, i.getExpectedRequestStore)("next/dynamic css"),
                    a = [];
                if (r.reactLoadableManifest && t) {
                    let e = r.reactLoadableManifest;
                    for (let r of t) {
                        if (!e[r]) continue;
                        let t = e[r].files.filter(e => e.endsWith(".css"));
                        a.push(...t)
                    }
                }
                return 0 === a.length ? null : (0, n.jsx)(n.Fragment, {
                    children: a.map(e => (0, n.jsx)("link", {
                        precedence: "dynamic",
                        rel: "stylesheet",
                        href: r.assetPrefix + "/_next/" + encodeURI(e),
                        as: "style"
                    }, e))
                })
            }
        },
        35954: function(e, t, r) {
            "use strict";
            /**
             * @license React
             * use-sync-external-store-shim.production.min.js
             *
             * Copyright (c) Facebook, Inc. and its affiliates.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */
            var n = r(7653),
                i = "function" == typeof Object.is ? Object.is : function(e, t) {
                    return e === t && (0 !== e || 1 / e == 1 / t) || e != e && t != t
                },
                a = n.useState,
                o = n.useEffect,
                s = n.useLayoutEffect,
                c = n.useDebugValue;

            function u(e) {
                var t = e.getSnapshot;
                e = e.value;
                try {
                    var r = t();
                    return !i(e, r)
                } catch (e) {
                    return !0
                }
            }
            var f = "undefined" == typeof window || void 0 === window.document || void 0 === window.document.createElement ? function(e, t) {
                return t()
            } : function(e, t) {
                var r = t(),
                    n = a({
                        inst: {
                            value: r,
                            getSnapshot: t
                        }
                    }),
                    i = n[0].inst,
                    f = n[1];
                return s(function() {
                    i.value = r, i.getSnapshot = t, u(i) && f({
                        inst: i
                    })
                }, [e, r, t]), o(function() {
                    return u(i) && f({
                        inst: i
                    }), e(function() {
                        u(i) && f({
                            inst: i
                        })
                    })
                }, [e]), c(r), r
            };
            t.useSyncExternalStore = void 0 !== n.useSyncExternalStore ? n.useSyncExternalStore : f
        },
        92666: function(e, t, r) {
            "use strict";
            e.exports = r(35954)
        },
        24435: function(e, t, r) {
            "use strict";

            function n() {
                for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                return t.reduce(function(e, t) {
                    return Array.isArray(t) ? e.concat(t) : e.concat([t])
                }, []).filter(Boolean).join(" ")
            }
            r.d(t, {
                cx: function() {
                    return n
                }
            })
        },
        26110: function(e, t, r) {
            "use strict";

            function n(e, t) {
                if (void 0 === e || "function" != typeof e) throw Error("The render function is not valid (received type ".concat(Object.prototype.toString.call(e).slice(8, -1), ").\n\n").concat(t))
            }
            r.d(t, {
                _: function() {
                    return n
                }
            })
        },
        83498: function(e, t, r) {
            "use strict";

            function n() {
                for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                var n = t.map(function(e) {
                    var t;
                    return ["https://www.algolia.com/doc/api-reference/widgets/", e.name, "/js/", void 0 !== (t = e.connector) && t ? "#connector" : ""].join("")
                }).join(", ");
                return function(e) {
                    return [e, "See documentation: ".concat(n)].filter(Boolean).join("\n\n")
                }
            }
            r.d(t, {
                K: function() {
                    return n
                }
            })
        },
        95589: function(e, t, r) {
            "use strict";
            r.d(t, {
                Rn: function() {
                    return l
                },
                dg: function() {
                    return f
                },
                mY: function() {
                    return d
                }
            });
            var n = r(71084),
                i = r(38628);

            function a(e) {
                return (a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }

            function o() {
                return (o = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }).apply(this, arguments)
            }

            function s(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), r.push.apply(r, n)
                }
                return r
            }

            function c(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? s(Object(r), !0).forEach(function(t) {
                        u(e, t, r[t])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : s(Object(r)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    })
                }
                return e
            }

            function u(e, t, r) {
                var n;
                return (n = function(e, t) {
                    if ("object" !== a(e) || null === e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var n = r.call(e, t || "default");
                        if ("object" !== a(n)) return n;
                        throw TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === t ? String : Number)(e)
                }(t, "string"), (t = "symbol" === a(n) ? n : String(n)) in e) ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }
            var f = {
                    highlightPreTag: "__ais-highlight__",
                    highlightPostTag: "__/ais-highlight__"
                },
                l = {
                    highlightPreTag: "<mark>",
                    highlightPostTag: "</mark>"
                };

            function h(e) {
                var t;
                return (0, i.P)(e) && "string" != typeof e.value ? Object.keys(e).reduce(function(t, r) {
                    return c(c({}, t), {}, u({}, r, h(e[r])))
                }, {}) : Array.isArray(e) ? e.map(h) : c(c({}, e), {}, {
                    value: (t = e.value, (0, n.Y)(t).replace(RegExp(f.highlightPreTag, "g"), l.highlightPreTag).replace(RegExp(f.highlightPostTag, "g"), l.highlightPostTag))
                })
            }

            function d(e) {
                return void 0 === e.__escaped && ((e = e.map(function(e) {
                    var t = o({}, (function(e) {
                        if (null == e) throw TypeError("Cannot destructure " + e)
                    }(e), e));
                    return t._highlightResult && (t._highlightResult = h(t._highlightResult)), t._snippetResult && (t._snippetResult = h(t._snippetResult)), t
                })).__escaped = !0), e
            }
        },
        71084: function(e, t, r) {
            "use strict";
            r.d(t, {
                A: function() {
                    return f
                },
                Y: function() {
                    return o
                }
            });
            var n = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;"
                },
                i = /[&<>"']/g,
                a = RegExp(i.source);

            function o(e) {
                return e && a.test(e) ? e.replace(i, function(e) {
                    return n[e]
                }) : e
            }
            var s = {
                    "&amp;": "&",
                    "&lt;": "<",
                    "&gt;": ">",
                    "&quot;": '"',
                    "&#39;": "'"
                },
                c = /&(amp|quot|lt|gt|#39);/g,
                u = RegExp(c.source);

            function f(e) {
                return e && u.test(e) ? e.replace(c, function(e) {
                    return s[e]
                }) : e
            }
        },
        91425: function(e, t, r) {
            "use strict";
            r.d(t, {
                H: function() {
                    return i
                }
            });
            var n = r(95589);

            function i(e) {
                var t = n.Rn.highlightPostTag,
                    r = n.Rn.highlightPreTag,
                    i = e.split(r),
                    a = i.shift(),
                    o = a ? [{
                        value: a,
                        isHighlighted: !1
                    }] : [];
                return i.forEach(function(e) {
                    var r = e.split(t);
                    o.push({
                        value: r[0],
                        isHighlighted: !0
                    }), "" !== r[1] && o.push({
                        value: r[1],
                        isHighlighted: !1
                    })
                }), o
            }
        },
        90195: function(e, t, r) {
            "use strict";

            function n(e, t) {
                return (Array.isArray(t) ? t : t.split(".")).reduce(function(e, t) {
                    return e && e[t]
                }, e)
            }
            r.d(t, {
                E: function() {
                    return n
                }
            })
        },
        37651: function(e, t, r) {
            "use strict";

            function n(e) {
                return "ais.index" === e.$$type
            }
            r.d(t, {
                J: function() {
                    return n
                }
            })
        },
        38628: function(e, t, r) {
            "use strict";

            function n(e) {
                return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }

            function i(e) {
                if (!("object" === n(e) && null !== e) || "[object Object]" !== (null === e ? void 0 === e ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e))) return !1;
                if (null === Object.getPrototypeOf(e)) return !0;
                for (var t = e; null !== Object.getPrototypeOf(t);) t = Object.getPrototypeOf(t);
                return Object.getPrototypeOf(e) === t
            }
            r.d(t, {
                P: function() {
                    return i
                }
            })
        },
        62598: function(e, t, r) {
            "use strict";

            function n(e) {
                return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }
            r.d(t, {
                Z: function() {
                    return u
                }
            });
            var i = ["facets", "disjunctiveFacets", "facetsRefinements", "facetsExcludes", "disjunctiveFacetsRefinements", "numericRefinements", "tagRefinements", "hierarchicalFacets", "hierarchicalFacetsRefinements", "ruleContexts"];

            function a(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), r.push.apply(r, n)
                }
                return r
            }

            function o(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? a(Object(r), !0).forEach(function(t) {
                        var i, a;
                        i = t, a = r[t], (i = function(e) {
                            var t = function(e, t) {
                                if ("object" !== n(e) || null === e) return e;
                                var r = e[Symbol.toPrimitive];
                                if (void 0 !== r) {
                                    var i = r.call(e, t || "default");
                                    if ("object" !== n(i)) return i;
                                    throw TypeError("@@toPrimitive must return a primitive value.")
                                }
                                return ("string" === t ? String : Number)(e)
                            }(e, "string");
                            return "symbol" === n(t) ? t : String(t)
                        }(i)) in e ? Object.defineProperty(e, i, {
                            value: a,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : e[i] = a
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : a(Object(r)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    })
                }
                return e
            }
            var s = function(e, t) {
                    t.facets, t.disjunctiveFacets, t.facetsRefinements, t.facetsExcludes, t.disjunctiveFacetsRefinements, t.numericRefinements, t.tagRefinements, t.hierarchicalFacets, t.hierarchicalFacetsRefinements, t.ruleContexts;
                    var r = function(e, t) {
                        if (null == e) return {};
                        var r, n, i = function(e, t) {
                            if (null == e) return {};
                            var r, n, i = {},
                                a = Object.keys(e);
                            for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) >= 0 || (i[r] = e[r]);
                            return i
                        }(e, t);
                        if (Object.getOwnPropertySymbols) {
                            var a = Object.getOwnPropertySymbols(e);
                            for (n = 0; n < a.length; n++) r = a[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (i[r] = e[r])
                        }
                        return i
                    }(t, i);
                    return e.setQueryParameters(r)
                },
                c = function(e, t) {
                    var r = [].concat(e.ruleContexts).concat(t.ruleContexts).filter(Boolean).filter(function(e, t, r) {
                        return r.indexOf(e) === t
                    });
                    return r.length > 0 ? e.setQueryParameters({
                        ruleContexts: r
                    }) : e
                },
                u = function() {
                    for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                    return t.reduce(function(e, t) {
                        var r, n, i, a, u, f, l, h;
                        return s((h = c((n = (r = e.setQueryParameters({
                            hierarchicalFacetsRefinements: o(o({}, e.hierarchicalFacetsRefinements), t.hierarchicalFacetsRefinements)
                        })).setQueryParameters({
                            hierarchicalFacets: t.hierarchicalFacets.reduce(function(e, t) {
                                var r = function(e, t) {
                                    if (!Array.isArray(e)) return -1;
                                    for (var r = 0; r < e.length; r++)
                                        if (t(e[r])) return r;
                                    return -1
                                }(e, function(e) {
                                    return e.name === t.name
                                });
                                if (-1 === r) return e.concat(t);
                                var n = e.slice();
                                return n.splice(r, 1, t), n
                            }, r.hierarchicalFacets)
                        }), l = (f = (u = (a = (i = t.tagRefinements.reduce(function(e, t) {
                            return e.addTagRefinement(t)
                        }, n)).setQueryParameters({
                            numericRefinements: o(o({}, i.numericRefinements), t.numericRefinements)
                        })).setQueryParameters({
                            disjunctiveFacetsRefinements: o(o({}, a.disjunctiveFacetsRefinements), t.disjunctiveFacetsRefinements)
                        })).setQueryParameters({
                            facetsExcludes: o(o({}, u.facetsExcludes), t.facetsExcludes)
                        })).setQueryParameters({
                            facetsRefinements: o(o({}, f.facetsRefinements), t.facetsRefinements)
                        }), t.disjunctiveFacets.reduce(function(e, t) {
                            return e.addDisjunctiveFacet(t)
                        }, l)), t), t.facets.reduce(function(e, t) {
                            return e.addFacet(t)
                        }, h)), t)
                    })
                }
        },
        1631: function(e, t, r) {
            "use strict";

            function n() {}
            r.d(t, {
                Z: function() {
                    return n
                }
            })
        },
        52996: function(e, t, r) {
            "use strict";

            function n(e, t, r) {
                var n = t.getHelper();
                return {
                    uiState: r,
                    helper: n,
                    parent: t,
                    instantSearchInstance: e,
                    state: n.state,
                    renderState: e.renderState,
                    templatesConfig: e.templatesConfig,
                    createURL: t.createURL,
                    scopedResults: [],
                    searchMetadata: {
                        isSearchStalled: "stalled" === e.status
                    },
                    status: e.status,
                    error: e.error
                }
            }

            function i(e, t) {
                var r = t.getResults(),
                    n = t.getHelper();
                return {
                    helper: n,
                    parent: t,
                    instantSearchInstance: e,
                    results: r,
                    scopedResults: t.getScopedResults(),
                    state: r ? r._state : n.state,
                    renderState: e.renderState,
                    templatesConfig: e.templatesConfig,
                    createURL: t.createURL,
                    searchMetadata: {
                        isSearchStalled: "stalled" === e.status
                    },
                    status: e.status,
                    error: e.error
                }
            }
            r.d(t, {
                d: function() {
                    return i
                },
                q: function() {
                    return n
                }
            })
        },
        19289: function(e, t, r) {
            "use strict";

            function n(e) {
                return btoa(encodeURIComponent(JSON.stringify(e)))
            }
            r.d(t, {
                a: function() {
                    return n
                }
            })
        },
        38383: function(e, t, r) {
            "use strict";
            r.d(t, {
                Z: function() {
                    return j
                }
            });
            var n = r(58544),
                i = r(83498),
                a = r(37651),
                o = r(52996),
                s = r(62598);

            function c(e) {
                return (c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }
            var u = ["initialSearchParameters"],
                f = ["initialRecommendParameters"];

            function l(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), r.push.apply(r, n)
                }
                return r
            }

            function h(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? l(Object(r), !0).forEach(function(t) {
                        d(e, t, r[t])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : l(Object(r)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    })
                }
                return e
            }

            function d(e, t, r) {
                var n;
                return (n = function(e, t) {
                    if ("object" !== c(e) || null === e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var n = r.call(e, t || "default");
                        if ("object" !== c(n)) return n;
                        throw TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === t ? String : Number)(e)
                }(t, "string"), (t = "symbol" === c(n) ? n : String(n)) in e) ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }

            function p(e) {
                return function(e) {
                    if (Array.isArray(e)) return m(e)
                }(e) || function(e) {
                    if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
                }(e) || function(e, t) {
                    if (e) {
                        if ("string" == typeof e) return m(e, void 0);
                        var r = Object.prototype.toString.call(e).slice(8, -1);
                        if ("Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r) return Array.from(e);
                        if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return m(e, void 0)
                    }
                }(e) || function() {
                    throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function m(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }

            function g(e, t) {
                if (null == e) return {};
                var r, n, i = function(e, t) {
                    if (null == e) return {};
                    var r, n, i = {},
                        a = Object.keys(e);
                    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) >= 0 || (i[r] = e[r]);
                    return i
                }(e, t);
                if (Object.getOwnPropertySymbols) {
                    var a = Object.getOwnPropertySymbols(e);
                    for (n = 0; n < a.length; n++) r = a[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (i[r] = e[r])
                }
                return i
            }
            var y = (0, i.K)({
                name: "index-widget"
            });

            function v(e, t) {
                var r = t.state,
                    n = t.recommendState,
                    i = t.isPageReset,
                    a = t._uiState;
                r !== e.state && (e.state = r, e.emit("change", {
                    state: e.state,
                    results: e.lastResults,
                    isPageReset: i,
                    _uiState: a
                })), n !== e.recommendState && (e.recommendState = n)
            }

            function b(e, t) {
                var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                return e.reduce(function(e, r) {
                    return !(0, a.J)(r) && (r.getWidgetUiState || r.getWidgetState) ? r.getWidgetUiState ? r.getWidgetUiState(e, t) : r.getWidgetState(e, t) : e
                }, r)
            }

            function S(e, t) {
                var r = t.initialSearchParameters,
                    n = g(t, u);
                return e.reduce(function(e, t) {
                    return !t.getWidgetSearchParameters || (0, a.J)(t) ? e : "search" === t.dependsOn && t.getWidgetParameters ? t.getWidgetParameters(e, n) : t.getWidgetSearchParameters(e, n)
                }, r)
            }

            function O(e, t) {
                var r = t.initialRecommendParameters,
                    n = g(t, f);
                return e.reduce(function(e, t) {
                    return !(0, a.J)(t) && "recommend" === t.dependsOn && t.getWidgetParameters ? t.getWidgetParameters(e, n) : e
                }, r)
            }
            var j = function(e) {
                if (void 0 === e || void 0 === e.indexName) throw Error(y("The `indexName` option is required."));
                var t = e.indexName,
                    r = e.indexId,
                    i = void 0 === r ? t : r,
                    c = [],
                    u = {},
                    f = null,
                    l = null,
                    m = null,
                    g = null,
                    j = null;
                return {
                    $$type: "ais.index",
                    $$widgetType: "ais.index",
                    getIndexName: function() {
                        return t
                    },
                    getIndexId: function() {
                        return i
                    },
                    getHelper: function() {
                        return m
                    },
                    getResults: function() {
                        var e;
                        return null !== (e = g) && void 0 !== e && e.lastResults ? (g.lastResults._state = m.state, g.lastResults) : null
                    },
                    getPreviousState: function() {
                        return j
                    },
                    getScopedResults: function() {
                        var e = this.getParent();
                        return function e(t) {
                            return t.filter(a.J).reduce(function(t, r) {
                                return t.concat.apply(t, [{
                                    indexId: r.getIndexId(),
                                    results: r.getResults(),
                                    helper: r.getHelper()
                                }].concat(p(e(r.getWidgets()))))
                            }, [])
                        }(e ? e.getWidgets() : 0 === t.length ? this.getWidgets() : [this])
                    },
                    getParent: function() {
                        return l
                    },
                    createURL: function(e) {
                        return "function" == typeof e ? f._createURL(d({}, i, e(u))) : f._createURL(d({}, i, b(c, {
                            searchParameters: e,
                            helper: m
                        })))
                    },
                    getWidgets: function() {
                        return c
                    },
                    addWidgets: function(e) {
                        var t = this;
                        if (!Array.isArray(e)) throw Error(y("The `addWidgets` method expects an array of widgets."));
                        if (e.some(function(e) {
                                return "function" != typeof e.init && "function" != typeof e.render
                            })) throw Error(y("The widget definition expects a `render` and/or an `init` method."));
                        return c = c.concat(e), f && e.length && (v(m, {
                            state: S(c, {
                                uiState: u,
                                initialSearchParameters: m.state
                            }),
                            recommendState: O(c, {
                                uiState: u,
                                initialRecommendParameters: m.recommendState
                            }),
                            _uiState: u
                        }), e.forEach(function(e) {
                            e.getRenderState && P({
                                renderState: e.getRenderState(f.renderState[t.getIndexId()] || {}, (0, o.q)(f, t, f._initialUiState)),
                                instantSearchInstance: f,
                                parent: t
                            })
                        }), e.forEach(function(e) {
                            e.init && e.init((0, o.q)(f, t, f._initialUiState))
                        }), f.scheduleSearch()), this
                    },
                    removeWidgets: function(e) {
                        var t = this;
                        if (!Array.isArray(e)) throw Error(y("The `removeWidgets` method expects an array of widgets."));
                        if (e.some(function(e) {
                                return "function" != typeof e.dispose
                            })) throw Error(y("The widget definition expects a `dispose` method."));
                        if (c = c.filter(function(t) {
                                return -1 === e.indexOf(t)
                            }), f && e.length) {
                            var r = e.reduce(function(e, r) {
                                    return r.dispose({
                                        helper: m,
                                        state: e,
                                        parent: t
                                    }) || e
                                }, m.state),
                                i = f.future.preserveSharedStateOnUnmount ? S(c, {
                                    uiState: u,
                                    initialSearchParameters: new n.SearchParameters({
                                        index: this.getIndexName()
                                    })
                                }) : S(c, {
                                    uiState: b(c, {
                                        searchParameters: r,
                                        helper: m
                                    }),
                                    initialSearchParameters: r
                                });
                            u = b(c, {
                                searchParameters: i,
                                helper: m
                            }), m.setState(i), c.length && f.scheduleSearch()
                        }
                        return this
                    },
                    init: function(e) {
                        var r, h = this,
                            d = e.instantSearchInstance,
                            y = e.parent,
                            R = e.uiState;
                        if (null === m) {
                            f = d, l = y, u = R[i] || {};
                            var w = d.mainHelper,
                                x = S(c, {
                                    uiState: u,
                                    initialSearchParameters: new n.SearchParameters({
                                        index: t
                                    })
                                }),
                                E = O(c, {
                                    uiState: u,
                                    initialRecommendParameters: new n.RecommendParameters
                                });
                            (m = n({}, x.index, x)).recommendState = E, m.search = function() {
                                return d.onStateChange ? (d.onStateChange({
                                    uiState: d.mainIndex.getWidgetUiState({}),
                                    setUiState: function(e) {
                                        return d.setUiState(e, !1)
                                    }
                                }), w) : w.search()
                            }, m.searchWithoutTriggeringOnStateChange = function() {
                                return w.search()
                            }, m.searchForFacetValues = function(e, t, r, n) {
                                var i = m.state.setQueryParameters(n);
                                return w.searchForFacetValues(e, t, r, i)
                            }, g = w.derive(function() {
                                return s.Z.apply(void 0, [w.state].concat(p(function(e) {
                                    for (var t = e.getParent(), r = [e.getHelper().state]; null !== t;) r = [t.getHelper().state].concat(r), t = t.getParent();
                                    return r
                                }(h))))
                            }, function() {
                                return h.getHelper().recommendState
                            });
                            var F = null === (r = d._initialResults) || void 0 === r ? void 0 : r[this.getIndexId()];
                            if (F) {
                                var _ = new n.SearchResults(new n.SearchParameters(F.state), F.results);
                                g.lastResults = _, m.lastResults = _
                            }
                            m.on("change", function(e) {
                                e.isPageReset && function e(t) {
                                    var r = t.filter(a.J);
                                    0 !== r.length && r.forEach(function(t) {
                                        var r = t.getHelper();
                                        v(r, {
                                            state: r.state.resetPage(),
                                            recommendState: r.recommendState,
                                            isPageReset: !0
                                        }), e(t.getWidgets())
                                    })
                                }(c)
                            }), g.on("search", function() {
                                d.scheduleStalledRender()
                            }), g.on("result", function(e) {
                                var t = e.results;
                                d.scheduleRender(), m.lastResults = t, j = null == t ? void 0 : t._state
                            }), g.on("recommend:result", function(e) {
                                var t = e.recommend;
                                d.scheduleRender(), m.lastRecommendResults = t.results
                            }), c.forEach(function(e) {
                                e.getRenderState && P({
                                    renderState: e.getRenderState(d.renderState[h.getIndexId()] || {}, (0, o.q)(d, h, R)),
                                    instantSearchInstance: d,
                                    parent: h
                                })
                            }), c.forEach(function(e) {
                                e.init && e.init((0, o.q)(d, h, R))
                            }), m.on("change", function(e) {
                                var t = e.state,
                                    r = e._uiState;
                                u = b(c, {
                                    searchParameters: t,
                                    helper: m
                                }, r || {}), d.onStateChange || d.onInternalStateChange()
                            }), F && d.scheduleRender()
                        }
                    },
                    render: function(e) {
                        var t = this,
                            r = e.instantSearchInstance;
                        "error" === r.status && !r.mainHelper.hasPendingRequests() && j && m.setState(j);
                        var n = this.getResults() ? c : c.filter(a.J);
                        (n = n.filter(function(e) {
                            return !e.shouldRender || e.shouldRender({
                                instantSearchInstance: r
                            })
                        })).forEach(function(e) {
                            e.getRenderState && P({
                                renderState: e.getRenderState(r.renderState[t.getIndexId()] || {}, (0, o.d)(r, t)),
                                instantSearchInstance: r,
                                parent: t
                            })
                        }), n.forEach(function(e) {
                            e.render && e.render((0, o.d)(r, t))
                        })
                    },
                    dispose: function() {
                        var e, t, r = this;
                        c.forEach(function(e) {
                            e.dispose && m && e.dispose({
                                helper: m,
                                state: m.state,
                                parent: r
                            })
                        }), f = null, l = null, null === (e = m) || void 0 === e || e.removeAllListeners(), m = null, null === (t = g) || void 0 === t || t.detach(), g = null
                    },
                    getWidgetUiState: function(e) {
                        return c.filter(a.J).reduce(function(e, t) {
                            return t.getWidgetUiState(e)
                        }, h(h({}, e), {}, d({}, i, h(h({}, e[i]), u))))
                    },
                    getWidgetState: function(e) {
                        return this.getWidgetUiState(e)
                    },
                    getWidgetSearchParameters: function(e, t) {
                        var r = t.uiState;
                        return S(c, {
                            uiState: r,
                            initialSearchParameters: e
                        })
                    },
                    refreshUiState: function() {
                        u = b(c, {
                            searchParameters: this.getHelper().state,
                            helper: this.getHelper()
                        }, u)
                    },
                    setIndexUiState: function(e) {
                        var t = "function" == typeof e ? e(u) : e;
                        f.setUiState(function(e) {
                            return h(h({}, e), {}, d({}, i, t))
                        })
                    }
                }
            };

            function P(e) {
                var t = e.renderState,
                    r = e.instantSearchInstance,
                    n = e.parent,
                    i = n ? n.getIndexId() : r.mainIndex.getIndexId();
                r.renderState = h(h({}, r.renderState), {}, d({}, i, h(h({}, r.renderState[i]), t)))
            }
        },
        28715: function(e, t, r) {
            "use strict";
            r.d(t, {
                T: function() {
                    return g
                }
            });
            var n = r(58544),
                i = r(83498),
                a = r(1631),
                o = r(38628),
                s = r(62598);

            function c(e) {
                return (c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }

            function u(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), r.push.apply(r, n)
                }
                return r
            }

            function f(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? u(Object(r), !0).forEach(function(t) {
                        l(e, t, r[t])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : u(Object(r)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    })
                }
                return e
            }

            function l(e, t, r) {
                var n;
                return (n = function(e, t) {
                    if ("object" !== c(e) || null === e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var n = r.call(e, t || "default");
                        if ("object" !== c(n)) return n;
                        throw TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === t ? String : Number)(e)
                }(t, "string"), (t = "symbol" === c(n) ? n : String(n)) in e) ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }
            var h = (0, i.K)({
                name: "configure",
                connector: !0
            });

            function d(e, t) {
                return e.setQueryParameters(Object.keys(t.searchParameters).reduce(function(e, t) {
                    return f(f({}, e), {}, l({}, t, void 0))
                }, {}))
            }
            var p = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a.Z,
                        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : a.Z;
                    return function(r) {
                        if (!r || !(0, o.P)(r.searchParameters)) throw Error(h("The `searchParameters` option expects an object."));
                        var i = {};
                        return {
                            $$type: "ais.configure",
                            init: function(t) {
                                var r = t.instantSearchInstance;
                                e(f(f({}, this.getWidgetRenderState(t)), {}, {
                                    instantSearchInstance: r
                                }), !0)
                            },
                            render: function(t) {
                                var r = t.instantSearchInstance;
                                e(f(f({}, this.getWidgetRenderState(t)), {}, {
                                    instantSearchInstance: r
                                }), !1)
                            },
                            dispose: function(e) {
                                var n = e.state;
                                return t(), d(n, r)
                            },
                            getRenderState: function(e, t) {
                                var r, i = this.getWidgetRenderState(t);
                                return f(f({}, e), {}, {
                                    configure: f(f({}, i), {}, {
                                        widgetParams: f(f({}, i.widgetParams), {}, {
                                            searchParameters: (0, s.Z)(new n.SearchParameters(null === (r = e.configure) || void 0 === r ? void 0 : r.widgetParams.searchParameters), new n.SearchParameters(i.widgetParams.searchParameters)).getQueryParams()
                                        })
                                    })
                                })
                            },
                            getWidgetRenderState: function(e) {
                                var t = e.helper;
                                return i.refine || (i.refine = function(e) {
                                    var i = d(t.state, r),
                                        a = (0, s.Z)(i, new n.SearchParameters(e));
                                    r.searchParameters = e, t.setState(a).search()
                                }), {
                                    refine: i.refine,
                                    widgetParams: r
                                }
                            },
                            getWidgetSearchParameters: function(e, t) {
                                var i = t.uiState;
                                return (0, s.Z)(e, new n.SearchParameters(f(f({}, i.configure), r.searchParameters)))
                            },
                            getWidgetUiState: function(e) {
                                return f(f({}, e), {}, {
                                    configure: f(f({}, e.configure), r.searchParameters)
                                })
                            }
                        }
                    }
                },
                m = r(36275);

            function g(e) {
                var t;
                return t = {
                    $$widgetType: "ais.configure"
                }, (0, m.B)(p, {
                    searchParameters: e
                }, t), null
            }
        },
        29008: function(e, t, r) {
            "use strict";
            r.d(t, {
                g: function() {
                    return p
                }
            });
            var n = r(7653),
                i = r(30837),
                a = r(38383),
                o = r(68019),
                s = r(13330),
                c = r(95911),
                u = r(8632),
                f = r(69423),
                l = r(92262),
                h = r(93714),
                d = ["children"];

            function p(e) {
                var t, r, p, m, g, y, v, b, S, O = e.children,
                    j = (t = function(e, t) {
                        if (null == e) return {};
                        var r, n, i = function(e, t) {
                            if (null == e) return {};
                            var r, n, i = {},
                                a = Object.keys(e);
                            for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) >= 0 || (i[r] = e[r]);
                            return i
                        }(e, t);
                        if (Object.getOwnPropertySymbols) {
                            var a = Object.getOwnPropertySymbols(e);
                            for (n = 0; n < a.length; n++) r = a[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (i[r] = e[r])
                        }
                        return i
                    }(e, d), r = (0, c.a)(), m = null == (p = (0, u.s)()) ? void 0 : p.initialResults, g = (0, o.a)(), y = (0, l.q)(t), b = (v = (0, n.useMemo)(function() {
                        return (0, a.Z)(y)
                    }, [y])).getHelper(), S = (0, s.N)(), (0, f.L)(function() {
                        S()
                    }, [b, S]), (0, h.F)({
                        widget: v,
                        parentIndex: g,
                        props: y,
                        shouldSsr: !!(r || m)
                    }), v);
                return null === j.getHelper() ? null : n.createElement(i.Z.Provider, {
                    value: j
                }, O)
            }
        },
        11566: function(e, t, r) {
            "use strict";
            r.d(t, {
                p: function() {
                    return eJ
                }
            });
            var n = r(7653),
                i = r(30837),
                a = r(37923),
                o = r(49437),
                s = r(58544);

            function c(e) {
                return (c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }

            function u(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                        fallback: function() {}
                    },
                    r = t.fallback;
                return "undefined" == typeof window ? r() : e({
                    window: window
                })
            }
            var f = r(1631);

            function l(e) {
                return (l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }

            function h(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), r.push.apply(r, n)
                }
                return r
            }

            function d(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? h(Object(r), !0).forEach(function(t) {
                        var n, i;
                        n = t, i = r[t], (n = function(e) {
                            var t = function(e, t) {
                                if ("object" !== l(e) || null === e) return e;
                                var r = e[Symbol.toPrimitive];
                                if (void 0 !== r) {
                                    var n = r.call(e, t || "default");
                                    if ("object" !== l(n)) return n;
                                    throw TypeError("@@toPrimitive must return a primitive value.")
                                }
                                return ("string" === t ? String : Number)(e)
                            }(e, "string");
                            return "symbol" === l(t) ? t : String(t)
                        }(n)) in e ? Object.defineProperty(e, n, {
                            value: i,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : e[n] = i
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : h(Object(r)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    })
                }
                return e
            }

            function p(e, t) {
                return function(e) {
                    if (Array.isArray(e)) return e
                }(e) || function(e, t) {
                    var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                    if (null != r) {
                        var n, i, a, o, s = [],
                            c = !0,
                            u = !1;
                        try {
                            if (a = (r = r.call(e)).next, 0 === t) {
                                if (Object(r) !== r) return;
                                c = !1
                            } else
                                for (; !(c = (n = a.call(r)).done) && (s.push(n.value), s.length !== t); c = !0);
                        } catch (e) {
                            u = !0, i = e
                        } finally {
                            try {
                                if (!c && null != r.return && (o = r.return(), Object(o) !== o)) return
                            } finally {
                                if (u) throw i
                            }
                        }
                        return s
                    }
                }(e, t) || m(e, t) || function() {
                    throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function m(e, t) {
                if (e) {
                    if ("string" == typeof e) return g(e, t);
                    var r = Object.prototype.toString.call(e).slice(8, -1);
                    if ("Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r) return Array.from(e);
                    if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return g(e, t)
                }
            }

            function g(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }
            var y = "2.13.0",
                v = "https://cdn.jsdelivr.net/npm/search-insights@".concat(y, "/dist/search-insights.min.js");

            function b() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = e.insightsClient,
                    r = e.insightsInitParams,
                    n = e.onEvent,
                    i = e.$$internal,
                    a = void 0 !== i && i,
                    o = e.$$automatic,
                    s = void 0 !== o && o,
                    l = t;
                t || null === t || u(function(e) {
                    var t = e.window,
                        r = t.AlgoliaAnalyticsObject || "aa";
                    "string" == typeof r && (l = t[r]), l || (t.AlgoliaAnalyticsObject = r, t[r] || (t[r] = function() {
                        t[r].queue || (t[r].queue = []);
                        for (var e = arguments.length, n = Array(e), i = 0; i < e; i++) n[i] = arguments[i];
                        t[r].queue.push(n)
                    }, t[r].version = y, t[r].shouldAddScript = !0), l = t[r])
                });
                var h = l || f.Z;
                return function(e) {
                    var t, i, o = e.instantSearchInstance,
                        u = o.middleware.filter(function(e) {
                            return "ais.insights" === e.instance.$$type && e.instance.$$internal
                        }).map(function(e) {
                            return e.creator
                        });
                    o.unuse.apply(o, function(e) {
                        if (Array.isArray(e)) return g(e)
                    }(u) || function(e) {
                        if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
                    }(u) || m(u) || function() {
                        throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }());
                    var l = p(function(e) {
                            if (!e.transporter) return [e.applicationID, e.apiKey];
                            var t = e.transporter,
                                r = t.headers,
                                n = t.queryParameters,
                                i = "x-algolia-application-id",
                                a = "x-algolia-api-key";
                            return [r[i] || n[i], r[a] || n[a]]
                        }(o.client), 2),
                        y = l[0],
                        b = l[1],
                        j = void 0,
                        P = void 0,
                        R = void 0,
                        w = void 0,
                        x = h.queue;
                    if (Array.isArray(x)) {
                        var E = ["setUserToken", "setAuthenticatedUserToken"].map(function(e) {
                                var t = function(e, t) {
                                    for (var r, n = 0; n < e.length; n++)
                                        if (t(r = e[n], n, e)) return r
                                }(x.slice().reverse(), function(t) {
                                    return p(t, 1)[0] === e
                                }) || [];
                                return p(t, 2)[1]
                            }),
                            F = p(E, 2);
                        j = F[0], P = F[1]
                    }
                    return h("getUserToken", null, function(e, t) {
                        R = O(t)
                    }), h("getAuthenticatedUserToken", null, function(e, t) {
                        w = O(t)
                    }), (r || !S(h)) && h("init", d({
                        appId: y,
                        apiKey: b,
                        partial: !0
                    }, r)), {
                        $$type: "ais.insights",
                        $$internal: a,
                        $$automatic: s,
                        onStateChange: function() {},
                        subscribe: function() {
                            if (h.shouldAddScript) {
                                var e = "[insights middleware]: could not load search-insights.js. Please load it manually following https://alg.li/insights-init";
                                try {
                                    var t = document.createElement("script");
                                    t.async = !0, t.src = v, t.onerror = function() {
                                        o.emit("error", Error(e))
                                    }, document.body.appendChild(t), h.shouldAddScript = !1
                                } catch (t) {
                                    h.shouldAddScript = !1, o.emit("error", Error(e))
                                }
                            }
                        },
                        started: function() {
                            h("addAlgoliaAgent", "insights-middleware"), t = {
                                userToken: (i = o.mainHelper).state.userToken,
                                clickAnalytics: i.state.clickAnalytics
                            }, s || i.overrideStateWithoutTriggeringChangeEvent(d(d({}, i.state), {}, {
                                clickAnalytics: !0
                            })), a || o.scheduleSearch();
                            var e = function(e) {
                                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                                        r = O(e);
                                    if (r) {
                                        var n = i.state.userToken;
                                        t ? a() : setTimeout(a, 0)
                                    }

                                    function a() {
                                        i.overrideStateWithoutTriggeringChangeEvent(d(d({}, i.state), {}, {
                                            userToken: r
                                        })), n && n !== e && o.scheduleSearch()
                                    }
                                },
                                r = function(e) {
                                    if (("undefined" == typeof document ? "undefined" : c(document)) === "object" && "string" == typeof document.cookie)
                                        for (var t = "".concat(e, "="), r = document.cookie.split(";"), n = 0; n < r.length; n++) {
                                            for (var i = r[n];
                                                " " === i.charAt(0);) i = i.substring(1);
                                            if (0 === i.indexOf(t)) return i.substring(t.length, i.length)
                                        }
                                }("_ALGOLIA");

                            function u(t, r, n) {
                                e(t, !0), r && h("setUserToken", r), n && h("setAuthenticatedUserToken", n)
                            }
                            r && e(r, !0);
                            var f = w || R,
                                l = P || j;
                            f ? u(f, R, w) : l && u(l, j, P), h("onUserTokenChange", e, {
                                immediate: !0
                            }), h("onAuthenticatedUserTokenChange", function(t) {
                                t || h("getUserToken", null, function(t, r) {
                                    e(r)
                                }), e(t)
                            }, {
                                immediate: !0
                            });
                            var p = h;
                            S(h) && (p = function(e, t) {
                                return h(e, t, {
                                    headers: {
                                        "X-Algolia-Application-Id": y,
                                        "X-Algolia-API-Key": b
                                    }
                                })
                            }), o.sendEventToInsights = function(e) {
                                n ? n(e, p) : e.insightsMethod && (e.payload.algoliaSource = ["instantsearch"], s && e.payload.algoliaSource.push("instantsearch-automatic"), "internal" === e.eventModifier && e.payload.algoliaSource.push("instantsearch-internal"), p(e.insightsMethod, e.payload))
                            }
                        },
                        unsubscribe: function() {
                            h("onUserTokenChange", void 0), h("onAuthenticatedUserTokenChange", void 0), o.sendEventToInsights = f.Z, i && t && (i.overrideStateWithoutTriggeringChangeEvent(d(d({}, i.state), t)), o.scheduleSearch())
                        }
                    }
                }
            }

            function S(e) {
                var t = p((e.version || "").split(".").map(Number), 2),
                    r = t[0],
                    n = t[1];
                return r >= 3 || 2 === r && n >= 6 || 1 === r && n >= 10
            }

            function O(e) {
                if (e) return "number" == typeof e ? e.toString() : e
            }
            var j = r(52996),
                P = r(97036);

            function R(e) {
                return (R = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }

            function w(e, t, r) {
                return (t = x(t)) in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }

            function x(e) {
                var t = function(e, t) {
                    if ("object" !== R(e) || null === e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var n = r.call(e, t || "default");
                        if ("object" !== R(n)) return n;
                        throw TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === t ? String : Number)(e)
                }(e, "string");
                return "symbol" === R(t) ? t : String(t)
            }
            var E = function(e) {
                    e && (window.document.title = e)
                },
                F = function() {
                    var e;

                    function t(e) {
                        var r = this,
                            n = e.windowTitle,
                            i = e.writeDelay,
                            a = e.createURL,
                            o = e.parseURL,
                            s = e.getLocation,
                            c = e.start,
                            f = e.dispose,
                            l = e.push,
                            h = e.cleanUrlOnDispose;
                        ! function(e, t) {
                            if (!(e instanceof t)) throw TypeError("Cannot call a class as a function")
                        }(this, t), w(this, "$$type", "ais.browser"), w(this, "windowTitle", void 0), w(this, "writeDelay", void 0), w(this, "_createURL", void 0), w(this, "parseURL", void 0), w(this, "getLocation", void 0), w(this, "writeTimer", void 0), w(this, "_onPopState", void 0), w(this, "inPopState", !1), w(this, "isDisposed", !1), w(this, "latestAcknowledgedHistory", 0), w(this, "_start", void 0), w(this, "_dispose", void 0), w(this, "_push", void 0), w(this, "_cleanUrlOnDispose", void 0), this.windowTitle = n, this.writeTimer = void 0, this.writeDelay = void 0 === i ? 400 : i, this._createURL = a, this.parseURL = o, this.getLocation = s, this._start = c, this._dispose = f, this._push = l, this._cleanUrlOnDispose = void 0 === h || h, u(function(e) {
                            var t = e.window;
                            E(r.windowTitle && r.windowTitle(r.read())), r.latestAcknowledgedHistory = t.history.length
                        })
                    }
                    return e = [{
                            key: "read",
                            value: function() {
                                return this.parseURL({
                                    qsModule: P,
                                    location: this.getLocation()
                                })
                            }
                        }, {
                            key: "write",
                            value: function(e) {
                                var t = this;
                                u(function(r) {
                                    var n = r.window,
                                        i = t.createURL(e),
                                        a = t.windowTitle && t.windowTitle(e);
                                    t.writeTimer && clearTimeout(t.writeTimer), t.writeTimer = setTimeout(function() {
                                        E(a), t.shouldWrite(i) && (t._push ? t._push(i) : n.history.pushState(e, a || "", i), t.latestAcknowledgedHistory = n.history.length), t.inPopState = !1, t.writeTimer = void 0
                                    }, t.writeDelay)
                                })
                            }
                        }, {
                            key: "onUpdate",
                            value: function(e) {
                                var t = this;
                                this._start && this._start(function() {
                                    e(t.read())
                                }), this._onPopState = function() {
                                    t.writeTimer && (clearTimeout(t.writeTimer), t.writeTimer = void 0), t.inPopState = !0, e(t.read())
                                }, u(function(e) {
                                    e.window.addEventListener("popstate", t._onPopState)
                                })
                            }
                        }, {
                            key: "createURL",
                            value: function(e) {
                                return this._createURL({
                                    qsModule: P,
                                    routeState: e,
                                    location: this.getLocation()
                                })
                            }
                        }, {
                            key: "dispose",
                            value: function() {
                                var e = this;
                                this._dispose && this._dispose(), this.isDisposed = !0, u(function(t) {
                                    var r = t.window;
                                    e._onPopState && r.removeEventListener("popstate", e._onPopState)
                                }), this.writeTimer && clearTimeout(this.writeTimer), this._cleanUrlOnDispose && this.write({})
                            }
                        }, {
                            key: "start",
                            value: function() {
                                this.isDisposed = !1
                            }
                        }, {
                            key: "shouldWrite",
                            value: function(e) {
                                var t = this;
                                return u(function(r) {
                                    var n = r.window,
                                        i = !(t.isDisposed && t.latestAcknowledgedHistory !== n.history.length);
                                    return !t.inPopState && i && e !== n.location.href
                                })
                            }
                        }],
                        function(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var n = t[r];
                                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, x(n.key), n)
                            }
                        }(t.prototype, e), Object.defineProperty(t, "prototype", {
                            writable: !1
                        }), t
                }();

            function _(e) {
                return (_ = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }
            var T = ["configure"];

            function I(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), r.push.apply(r, n)
                }
                return r
            }

            function A(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? I(Object(r), !0).forEach(function(t) {
                        D(e, t, r[t])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : I(Object(r)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    })
                }
                return e
            }

            function D(e, t, r) {
                var n;
                return (n = function(e, t) {
                    if ("object" !== _(e) || null === e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var n = r.call(e, t || "default");
                        if ("object" !== _(n)) return n;
                        throw TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === t ? String : Number)(e)
                }(t, "string"), (t = "symbol" === _(n) ? n : String(n)) in e) ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }

            function k(e) {
                return e.configure,
                    function(e, t) {
                        if (null == e) return {};
                        var r, n, i = function(e, t) {
                            if (null == e) return {};
                            var r, n, i = {},
                                a = Object.keys(e);
                            for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) >= 0 || (i[r] = e[r]);
                            return i
                        }(e, t);
                        if (Object.getOwnPropertySymbols) {
                            var a = Object.getOwnPropertySymbols(e);
                            for (n = 0; n < a.length; n++) r = a[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (i[r] = e[r])
                        }
                        return i
                    }(e, T)
            }

            function N(e) {
                return e !== Object(e)
            }

            function H(e) {
                return (H = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }

            function C(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), r.push.apply(r, n)
                }
                return r
            }

            function q(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? C(Object(r), !0).forEach(function(t) {
                        U(e, t, r[t])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : C(Object(r)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    })
                }
                return e
            }

            function U(e, t, r) {
                var n;
                return (n = function(e, t) {
                    if ("object" !== H(e) || null === e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var n = r.call(e, t || "default");
                        if ("object" !== H(n)) return n;
                        throw TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === t ? String : Number)(e)
                }(t, "string"), (t = "symbol" === H(n) ? n : String(n)) in e) ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }
            var Q = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = e.router,
                        r = void 0 === t ? function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                                t = e.createURL,
                                r = void 0 === t ? function(e) {
                                    var t = e.qsModule,
                                        r = e.routeState,
                                        n = e.location,
                                        i = n.protocol,
                                        a = n.hostname,
                                        o = n.port,
                                        s = void 0 === o ? "" : o,
                                        c = n.pathname,
                                        u = n.hash,
                                        f = t.stringify(r),
                                        l = "" === s ? "" : ":".concat(s);
                                    return f ? "".concat(i, "//").concat(a).concat(l).concat(c, "?").concat(f).concat(u) : "".concat(i, "//").concat(a).concat(l).concat(c).concat(u)
                                } : t,
                                n = e.parseURL,
                                i = e.writeDelay,
                                a = e.windowTitle,
                                o = e.getLocation;
                            return new F({
                                createURL: r,
                                parseURL: void 0 === n ? function(e) {
                                    var t = e.qsModule,
                                        r = e.location;
                                    return t.parse(r.search.slice(1), {
                                        arrayLimit: 99
                                    })
                                } : n,
                                writeDelay: void 0 === i ? 400 : i,
                                windowTitle: a,
                                getLocation: void 0 === o ? function() {
                                    return u(function(e) {
                                        return e.window.location
                                    }, {
                                        fallback: function() {
                                            throw Error("You need to provide `getLocation` to the `history` router in environments where `window` does not exist.")
                                        }
                                    })
                                } : o,
                                start: e.start,
                                dispose: e.dispose,
                                push: e.push,
                                cleanUrlOnDispose: e.cleanUrlOnDispose
                            })
                        }() : t,
                        n = e.stateMapping,
                        i = void 0 === n ? {
                            $$type: "ais.simple",
                            stateToRoute: function(e) {
                                return Object.keys(e).reduce(function(t, r) {
                                    return A(A({}, t), {}, D({}, r, k(e[r])))
                                }, {})
                            },
                            routeToState: function() {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                return Object.keys(e).reduce(function(t, r) {
                                    return A(A({}, t), {}, D({}, r, k(e[r])))
                                }, {})
                            }
                        } : n,
                        a = e.$$internal,
                        o = void 0 !== a && a;
                    return function(e) {
                        var t = e.instantSearchInstance;
                        t._createURL = function(e) {
                            var n = 0 === t.mainIndex.getWidgets().length ? t._initialUiState : t.mainIndex.getWidgetUiState({}),
                                a = Object.keys(e).reduce(function(t, r) {
                                    return q(q({}, t), {}, U({}, r, e[r]))
                                }, n),
                                o = i.stateToRoute(a);
                            return r.createURL(o)
                        };
                        var n = void 0,
                            a = t._initialUiState;
                        return {
                            $$type: "ais.router({router:".concat(r.$$type || "__unknown__", ", stateMapping:").concat(i.$$type || "__unknown__", "})"),
                            $$internal: o,
                            onStateChange: function(e) {
                                var t = e.uiState,
                                    a = i.stateToRoute(t);
                                (void 0 === n || ! function e(t, r) {
                                    if (t === r) return !0;
                                    if (N(t) || N(r) || "function" == typeof t || "function" == typeof r) return t === r;
                                    if (Object.keys(t).length !== Object.keys(r).length) return !1;
                                    for (var n = 0, i = Object.keys(t); n < i.length; n++) {
                                        var a = i[n];
                                        if (!(a in r) || !e(t[a], r[a])) return !1
                                    }
                                    return !0
                                }(n, a)) && (r.write(a), n = a)
                            },
                            subscribe: function() {
                                t._initialUiState = q(q({}, a), i.routeToState(r.read())), r.onUpdate(function(e) {
                                    t.mainIndex.getWidgets().length > 0 && t.setUiState(i.routeToState(e))
                                })
                            },
                            started: function() {
                                var e;
                                null === (e = r.start) || void 0 === e || e.call(r)
                            },
                            unsubscribe: function() {
                                r.dispose()
                            }
                        }
                    }
                },
                L = r(38383),
                W = function(e) {
                    return function() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            r = t.descendantName,
                            n = t.modifierName;
                        return "".concat("ais", "-").concat(e).concat(r ? "-".concat(r) : "").concat(n ? "--".concat(n) : "")
                    }
                },
                $ = r(90195),
                B = r(95589),
                M = W("Highlight");

            function J(e) {
                var t = B.Rn.highlightPreTag,
                    r = B.Rn.highlightPostTag;
                return e.map(function(e) {
                    return e.isHighlighted ? t + e.value + r : e.value
                }).join("")
            }
            var V = r(71084),
                z = new RegExp(/\w/i);

            function Z(e) {
                return (Z = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }

            function G(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), r.push.apply(r, n)
                }
                return r
            }

            function K(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? G(Object(r), !0).forEach(function(t) {
                        var n, i;
                        n = t, i = r[t], (n = function(e) {
                            var t = function(e, t) {
                                if ("object" !== Z(e) || null === e) return e;
                                var r = e[Symbol.toPrimitive];
                                if (void 0 !== r) {
                                    var n = r.call(e, t || "default");
                                    if ("object" !== Z(n)) return n;
                                    throw TypeError("@@toPrimitive must return a primitive value.")
                                }
                                return ("string" === t ? String : Number)(e)
                            }(e, "string");
                            return "symbol" === Z(t) ? t : String(t)
                        }(n)) in e ? Object.defineProperty(e, n, {
                            value: i,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : e[n] = i
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : G(Object(r)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    })
                }
                return e
            }

            function X(e) {
                return e.some(function(e) {
                    return e.isHighlighted
                }) ? e.map(function(t, r) {
                    var n, i, a, o, s;
                    return K(K({}, t), {}, {
                        isHighlighted: (a = e[r], o = (null === (n = e[r + 1]) || void 0 === n ? void 0 : n.isHighlighted) || !0, s = (null === (i = e[r - 1]) || void 0 === i ? void 0 : i.isHighlighted) || !0, z.test((0, V.A)(a.value)) || s !== o ? !a.isHighlighted : !s)
                    })
                }) : e.map(function(e) {
                    return K(K({}, e), {}, {
                        isHighlighted: !1
                    })
                })
            }
            var Y = r(91425),
                ee = W("ReverseHighlight"),
                et = W("Snippet"),
                er = W("ReverseSnippet"),
                en = r(19289);

            function ei(e) {
                return (ei = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }

            function ea(e) {
                return (ea = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }

            function eo(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), r.push.apply(r, n)
                }
                return r
            }

            function es(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? eo(Object(r), !0).forEach(function(t) {
                        var n, i;
                        n = t, i = r[t], (n = function(e) {
                            var t = function(e, t) {
                                if ("object" !== ea(e) || null === e) return e;
                                var r = e[Symbol.toPrimitive];
                                if (void 0 !== r) {
                                    var n = r.call(e, t || "default");
                                    if ("object" !== ea(n)) return n;
                                    throw TypeError("@@toPrimitive must return a primitive value.")
                                }
                                return ("string" === t ? String : Number)(e)
                            }(e, "string");
                            return "symbol" === ea(t) ? t : String(t)
                        }(n)) in e ? Object.defineProperty(e, n, {
                            value: i,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : e[n] = i
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : eo(Object(r)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    })
                }
                return e
            }
            var ec = r(83498),
                eu = Promise.resolve();

            function ef(e) {
                var t = null,
                    r = !1,
                    n = function() {
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        null === t && (t = eu.then(function() {
                            if (t = null, r) {
                                r = !1;
                                return
                            }
                            e.apply(void 0, i)
                        }))
                    };
                return n.wait = function() {
                    if (null === t) throw Error("The deferred function should be called before calling `wait()`");
                    return t
                }, n.cancel = function() {
                    null !== t && (r = !0)
                }, n
            }

            function el(e) {
                return (el = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }

            function eh(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }

            function ed(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), r.push.apply(r, n)
                }
                return r
            }

            function ep(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? ed(Object(r), !0).forEach(function(t) {
                        em(e, t, r[t])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ed(Object(r)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    })
                }
                return e
            }

            function em(e, t, r) {
                var n;
                return (n = function(e, t) {
                    if ("object" !== el(e) || null === e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var n = r.call(e, t || "default");
                        if ("object" !== el(n)) return n;
                        throw TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === t ? String : Number)(e)
                }(t, "string"), (t = "symbol" === el(n) ? n : String(n)) in e) ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }

            function eg(e) {
                var t = function(e) {
                    for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) r[n - 1] = arguments[n];
                    var i = 0;
                    return e.replace(/%s/g, function() {
                        return encodeURIComponent(r[i++])
                    })
                };
                return Object.keys(e).map(function(r) {
                    var n;
                    return t("%s=%s", r, (n = e[r], "[object Object]" === Object.prototype.toString.call(n) || "[object Array]" === Object.prototype.toString.call(n)) ? JSON.stringify(e[r]) : e[r])
                }).join("&")
            }
            var ey = r(37651);

            function ev(e, t) {
                var r = e[t.getIndexId()] || {};
                t.getHelper().setState(t.getWidgetSearchParameters(t.getHelper().state, {
                    uiState: r
                })), t.getWidgets().filter(ey.J).forEach(function(t) {
                    return ev(e, t)
                })
            }

            function eb(e) {
                return (eb = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }

            function eS(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), r.push.apply(r, n)
                }
                return r
            }

            function eO(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? eS(Object(r), !0).forEach(function(t) {
                        ew(e, t, r[t])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : eS(Object(r)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    })
                }
                return e
            }

            function ej(e, t) {
                return (ej = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                    return e.__proto__ = t, e
                })(e, t)
            }

            function eP(e) {
                if (void 0 === e) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }

            function eR(e) {
                return (eR = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                })(e)
            }

            function ew(e, t, r) {
                return (t = ex(t)) in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }

            function ex(e) {
                var t = function(e, t) {
                    if ("object" !== eb(e) || null === e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var n = r.call(e, t || "default");
                        if ("object" !== eb(n)) return n;
                        throw TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === t ? String : Number)(e)
                }(e, "string");
                return "symbol" === eb(t) ? t : String(t)
            }
            var eE = (0, ec.K)({
                name: "instantsearch"
            });

            function eF() {
                return "#"
            }
            var e_ = {
                    preserveSharedStateOnUnmount: !1,
                    persistHierarchicalRootCount: !1
                },
                eT = function(e) {
                    ! function(e, t) {
                        if ("function" != typeof t && null !== t) throw TypeError("Super expression must either be null or a function");
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                writable: !0,
                                configurable: !0
                            }
                        }), Object.defineProperty(e, "prototype", {
                            writable: !1
                        }), t && ej(e, t)
                    }(i, e);
                    var t, r, n = (t = function() {
                        if ("undefined" == typeof Reflect || !Reflect.construct || Reflect.construct.sham) return !1;
                        if ("function" == typeof Proxy) return !0;
                        try {
                            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
                        } catch (e) {
                            return !1
                        }
                    }(), function() {
                        var e, r = eR(i);
                        return e = t ? Reflect.construct(r, arguments, eR(this).constructor) : r.apply(this, arguments),
                            function(e, t) {
                                if (t && ("object" === eb(t) || "function" == typeof t)) return t;
                                if (void 0 !== t) throw TypeError("Derived constructors may only return object or undefined");
                                return eP(e)
                            }(this, e)
                    });

                    function i(e) {
                        ! function(e, t) {
                            if (!(e instanceof t)) throw TypeError("Cannot call a class as a function")
                        }(this, i), ew(eP(t = n.call(this)), "client", void 0), ew(eP(t), "indexName", void 0), ew(eP(t), "insightsClient", void 0), ew(eP(t), "onStateChange", null), ew(eP(t), "future", void 0), ew(eP(t), "helper", void 0), ew(eP(t), "mainHelper", void 0), ew(eP(t), "mainIndex", void 0), ew(eP(t), "started", void 0), ew(eP(t), "templatesConfig", void 0), ew(eP(t), "renderState", {}), ew(eP(t), "_stalledSearchDelay", void 0), ew(eP(t), "_searchStalledTimer", void 0), ew(eP(t), "_initialUiState", void 0), ew(eP(t), "_initialResults", void 0), ew(eP(t), "_createURL", void 0), ew(eP(t), "_searchFunction", void 0), ew(eP(t), "_mainHelperSearch", void 0), ew(eP(t), "_insights", void 0), ew(eP(t), "middleware", []), ew(eP(t), "sendEventToInsights", void 0), ew(eP(t), "status", "idle"), ew(eP(t), "error", void 0), ew(eP(t), "scheduleSearch", ef(function() {
                            t.started && t.mainHelper.search()
                        })), ew(eP(t), "scheduleRender", ef(function() {
                            var e, r = !(arguments.length > 0) || void 0 === arguments[0] || arguments[0];
                            !(null !== (e = t.mainHelper) && void 0 !== e && e.hasPendingRequests()) && (clearTimeout(t._searchStalledTimer), t._searchStalledTimer = null, r && (t.status = "idle", t.error = void 0)), t.mainIndex.render({
                                instantSearchInstance: eP(t)
                            }), t.emit("render")
                        })), ew(eP(t), "onInternalStateChange", ef(function() {
                            var e = t.mainIndex.getWidgetUiState({});
                            t.middleware.forEach(function(t) {
                                t.instance.onStateChange({
                                    uiState: e
                                })
                            })
                        })), t.setMaxListeners(100);
                        var t, r = e.indexName,
                            a = void 0 === r ? "" : r,
                            o = e.numberLocale,
                            s = e.initialUiState,
                            c = e.routing,
                            l = void 0 === c ? null : c,
                            h = e.insights,
                            d = void 0 === h ? void 0 : h,
                            p = e.searchFunction,
                            m = e.stalledSearchDelay,
                            g = e.searchClient,
                            y = void 0 === g ? null : g,
                            v = e.insightsClient,
                            S = void 0 === v ? null : v,
                            O = e.onStateChange,
                            P = e.future,
                            R = void 0 === P ? eO(eO({}, e_), e.future || {}) : P;
                        if (null === y) throw Error(eE("The `searchClient` option is required."));
                        if ("function" != typeof y.search) throw Error("The `searchClient` must implement a `search` method.\n\nSee: https://www.algolia.com/doc/guides/building-search-ui/going-further/backend-search/in-depth/backend-instantsearch/js/");
                        if ("function" == typeof y.addAlgoliaAgent && y.addAlgoliaAgent("instantsearch.js (".concat("4.68.1", ")")), S && "function" != typeof S) throw Error(eE("The `insightsClient` option should be a function."));
                        if (t.client = y, t.future = R, t.insightsClient = S, t.indexName = a, t.helper = null, t.mainHelper = null, t.mainIndex = (0, L.Z)({
                                indexName: a
                            }), t.onStateChange = void 0 === O ? null : O, t.started = !1, t.templatesConfig = {
                                helpers: {
                                    formatNumber: function(e, t) {
                                        return Number(t(e)).toLocaleString(o)
                                    },
                                    highlight: function(e, t) {
                                        try {
                                            var r, n, i, a, o, s, c, u, f, l = JSON.parse(e);
                                            return t((n = (r = es(es({}, l), {}, {
                                                hit: this
                                            })).attribute, i = r.highlightedTagName, a = void 0 === i ? "mark" : i, o = r.hit, s = r.cssClasses, c = void 0 === s ? {} : s, u = ((0, $.E)(o._highlightResult, n) || {}).value, f = M({
                                                descendantName: "highlighted"
                                            }) + (c.highlighted ? " ".concat(c.highlighted) : ""), (void 0 === u ? "" : u).replace(RegExp(B.Rn.highlightPreTag, "g"), "<".concat(a, ' class="').concat(f, '">')).replace(RegExp(B.Rn.highlightPostTag, "g"), "</".concat(a, ">"))))
                                        } catch (e) {
                                            throw Error('\nThe highlight helper expects a JSON object of the format:\n{ "attribute": "name", "highlightedTagName": "mark" }')
                                        }
                                    },
                                    reverseHighlight: function(e, t) {
                                        try {
                                            var r, n, i, a, o, s, c, u, f, l = JSON.parse(e);
                                            return t((n = (r = es(es({}, l), {}, {
                                                hit: this
                                            })).attribute, i = r.highlightedTagName, a = void 0 === i ? "mark" : i, o = r.hit, s = r.cssClasses, c = void 0 === s ? {} : s, u = ((0, $.E)(o._highlightResult, n) || {}).value, f = ee({
                                                descendantName: "highlighted"
                                            }) + (c.highlighted ? " ".concat(c.highlighted) : ""), J(X((0, Y.H)(void 0 === u ? "" : u))).replace(RegExp(B.Rn.highlightPreTag, "g"), "<".concat(a, ' class="').concat(f, '">')).replace(RegExp(B.Rn.highlightPostTag, "g"), "</".concat(a, ">"))))
                                        } catch (e) {
                                            throw Error('\n  The reverseHighlight helper expects a JSON object of the format:\n  { "attribute": "name", "highlightedTagName": "mark" }')
                                        }
                                    },
                                    snippet: function(e, t) {
                                        try {
                                            var r, n, i, a, o, s, c, u, f, l = JSON.parse(e);
                                            return t((n = (r = es(es({}, l), {}, {
                                                hit: this
                                            })).attribute, i = r.highlightedTagName, a = void 0 === i ? "mark" : i, o = r.hit, s = r.cssClasses, c = void 0 === s ? {} : s, u = ((0, $.E)(o._snippetResult, n) || {}).value, f = et({
                                                descendantName: "highlighted"
                                            }) + (c.highlighted ? " ".concat(c.highlighted) : ""), (void 0 === u ? "" : u).replace(RegExp(B.Rn.highlightPreTag, "g"), "<".concat(a, ' class="').concat(f, '">')).replace(RegExp(B.Rn.highlightPostTag, "g"), "</".concat(a, ">"))))
                                        } catch (e) {
                                            throw Error('\nThe snippet helper expects a JSON object of the format:\n{ "attribute": "name", "highlightedTagName": "mark" }')
                                        }
                                    },
                                    reverseSnippet: function(e, t) {
                                        try {
                                            var r, n, i, a, o, s, c, u, f, l = JSON.parse(e);
                                            return t((n = (r = es(es({}, l), {}, {
                                                hit: this
                                            })).attribute, i = r.highlightedTagName, a = void 0 === i ? "mark" : i, o = r.hit, s = r.cssClasses, c = void 0 === s ? {} : s, u = ((0, $.E)(o._snippetResult, n) || {}).value, f = er({
                                                descendantName: "highlighted"
                                            }) + (c.highlighted ? " ".concat(c.highlighted) : ""), J(X((0, Y.H)(void 0 === u ? "" : u))).replace(RegExp(B.Rn.highlightPreTag, "g"), "<".concat(a, ' class="').concat(f, '">')).replace(RegExp(B.Rn.highlightPostTag, "g"), "</".concat(a, ">"))))
                                        } catch (e) {
                                            throw Error('\n  The reverseSnippet helper expects a JSON object of the format:\n  { "attribute": "name", "highlightedTagName": "mark" }')
                                        }
                                    },
                                    insights: function(e, t) {
                                        try {
                                            var r, n = JSON.parse(e),
                                                i = n.method,
                                                a = n.payload;
                                            return t((r = es({
                                                objectIDs: [this.objectID]
                                            }, a), function(e) {
                                                var t, r = e.method,
                                                    n = e.payload;
                                                if ("object" !== ei(n)) throw Error("The insights helper expects the payload to be an object.");
                                                try {
                                                    t = (0, en.a)(n)
                                                } catch (e) {
                                                    throw Error("Could not JSON serialize the payload object.")
                                                }
                                                return 'data-insights-method="'.concat(r, '" data-insights-payload="').concat(t, '"')
                                            }({
                                                method: i,
                                                payload: r
                                            })))
                                        } catch (e) {
                                            throw Error('\nThe insights helper expects a JSON object of the format:\n{ "method": "method-name", "payload": { "eventName": "name of the event" } }')
                                        }
                                    }
                                },
                                compileOptions: {}
                            }, t._stalledSearchDelay = void 0 === m ? 200 : m, t._searchStalledTimer = null, t._createURL = eF, t._initialUiState = void 0 === s ? {} : s, t._initialResults = null, t._insights = d, p && (t._searchFunction = p), t.sendEventToInsights = f.Z, l) {
                            var w = "boolean" == typeof l ? {} : l;
                            w.$$internal = !0, t.use(Q(w))
                        }
                        if (d) {
                            var x = "boolean" == typeof d ? {} : d;
                            x.$$internal = !0, t.use(b(x))
                        }
                        return u(function(e) {
                            var t, r;
                            return (null === (t = e.window.navigator) || void 0 === t ? void 0 : null === (r = t.userAgent) || void 0 === r ? void 0 : r.indexOf("Algolia Crawler")) > -1
                        }, {
                            fallback: function() {
                                return !1
                            }
                        }) && t.use(function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                                t = e.$$internal,
                                r = void 0 !== t && t;
                            return function(e) {
                                var t = e.instantSearchInstance,
                                    n = {
                                        widgets: []
                                    },
                                    i = document.createElement("meta"),
                                    a = document.querySelector("head");
                                return i.name = "instantsearch:widgets", {
                                    $$type: "ais.metadata",
                                    $$internal: r,
                                    onStateChange: function() {},
                                    subscribe: function() {
                                        setTimeout(function() {
                                            var e = t.client;
                                            n.ua = e.transporter && e.transporter.userAgent ? e.transporter.userAgent.value : e._ua,
                                                function e(t, r, n) {
                                                    var i = (0, j.q)(r, r.mainIndex, r._initialUiState);
                                                    t.forEach(function(t) {
                                                        var a = {};
                                                        if (t.getWidgetRenderState) {
                                                            var o = t.getWidgetRenderState(i);
                                                            o && o.widgetParams && (a = o.widgetParams)
                                                        }
                                                        var s = Object.keys(a).filter(function(e) {
                                                            return void 0 !== a[e]
                                                        });
                                                        n.widgets.push({
                                                            type: t.$$type,
                                                            widgetType: t.$$widgetType,
                                                            params: s
                                                        }), "ais.index" === t.$$type && e(t.getWidgets(), r, n)
                                                    })
                                                }(t.mainIndex.getWidgets(), t, n), t.middleware.forEach(function(e) {
                                                    return n.widgets.push({
                                                        middleware: !0,
                                                        type: e.instance.$$type,
                                                        internal: e.instance.$$internal
                                                    })
                                                }), i.content = JSON.stringify(n), a.appendChild(i)
                                        }, 0)
                                    },
                                    started: function() {},
                                    unsubscribe: function() {
                                        i.remove()
                                    }
                                }
                            }
                        }({
                            $$internal: !0
                        })), t
                    }
                    return r = [{
                            key: "_isSearchStalled",
                            get: function() {
                                return "stalled" === this.status
                            }
                        }, {
                            key: "use",
                            value: function() {
                                for (var e = this, t = arguments.length, r = Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                                var i = r.map(function(t) {
                                    var r = eO({
                                        $$type: "__unknown__",
                                        $$internal: !1,
                                        subscribe: f.Z,
                                        started: f.Z,
                                        unsubscribe: f.Z,
                                        onStateChange: f.Z
                                    }, t({
                                        instantSearchInstance: e
                                    }));
                                    return e.middleware.push({
                                        creator: t,
                                        instance: r
                                    }), r
                                });
                                return this.started && i.forEach(function(e) {
                                    e.subscribe(), e.started()
                                }), this
                            }
                        }, {
                            key: "unuse",
                            value: function() {
                                for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                                return this.middleware.filter(function(e) {
                                    return t.includes(e.creator)
                                }).forEach(function(e) {
                                    return e.instance.unsubscribe()
                                }), this.middleware = this.middleware.filter(function(e) {
                                    return !t.includes(e.creator)
                                }), this
                            }
                        }, {
                            key: "EXPERIMENTAL_use",
                            value: function() {
                                return this.use.apply(this, arguments)
                            }
                        }, {
                            key: "addWidget",
                            value: function(e) {
                                return this.addWidgets([e])
                            }
                        }, {
                            key: "addWidgets",
                            value: function(e) {
                                if (!Array.isArray(e)) throw Error(eE("The `addWidgets` method expects an array of widgets. Please use `addWidget`."));
                                if (e.some(function(e) {
                                        return "function" != typeof e.init && "function" != typeof e.render
                                    })) throw Error(eE("The widget definition expects a `render` and/or an `init` method."));
                                return this.mainIndex.addWidgets(e), this
                            }
                        }, {
                            key: "removeWidget",
                            value: function(e) {
                                return this.removeWidgets([e])
                            }
                        }, {
                            key: "removeWidgets",
                            value: function(e) {
                                if (!Array.isArray(e)) throw Error(eE("The `removeWidgets` method expects an array of widgets. Please use `removeWidget`."));
                                if (e.some(function(e) {
                                        return "function" != typeof e.dispose
                                    })) throw Error(eE("The widget definition expects a `dispose` method."));
                                return this.mainIndex.removeWidgets(e), this
                            }
                        }, {
                            key: "start",
                            value: function() {
                                var e = this;
                                if (this.started) throw Error(eE("The `start` method has already been called once."));
                                var t = this.mainHelper || s(this.client, this.indexName, void 0, {
                                    persistHierarchicalRootCount: this.future.persistHierarchicalRootCount
                                });
                                if (t.search = function() {
                                        return e.status = "loading", e.scheduleRender(!1), t.searchOnlyWithDerivedHelpers() && t.recommend()
                                    }, this._searchFunction) {
                                    var r = {
                                        search: function() {
                                            return new Promise(f.Z)
                                        }
                                    };
                                    this._mainHelperSearch = t.search.bind(t), t.search = function() {
                                        var n = e.mainIndex.getHelper(),
                                            i = s(r, n.state.index, n.state);
                                        return i.once("search", function(t) {
                                            var r = t.state;
                                            n.overrideStateWithoutTriggeringChangeEvent(r), e._mainHelperSearch()
                                        }), i.on("change", function(e) {
                                            var t = e.state;
                                            n.setState(t)
                                        }), e._searchFunction(i), t
                                    }
                                }
                                if (t.on("error", function(t) {
                                        var r = t.error;
                                        if (!(r instanceof Error)) {
                                            var n = r;
                                            r = Object.keys(n).reduce(function(e, t) {
                                                return e[t] = n[t], e
                                            }, Error(n.message))
                                        }
                                        r.error = r, e.error = r, e.status = "error", e.scheduleRender(!1), e.emit("error", r)
                                    }), this.mainHelper = t, this.middleware.forEach(function(e) {
                                        e.instance.subscribe()
                                    }), this.mainIndex.init({
                                        instantSearchInstance: this,
                                        parent: null,
                                        uiState: this._initialUiState
                                    }), this._initialResults) {
                                    ! function(e, t) {
                                        if (t && ("transporter" in e && !e._cacheHydrated || e._useCache && "function" == typeof e.addAlgoliaAgent)) {
                                            var r = Object.keys(t).map(function(e) {
                                                    var r = t[e],
                                                        n = r.state,
                                                        i = r.requestParams;
                                                    return r.results.map(function(e) {
                                                        return ep({
                                                            indexName: n.index || e.index
                                                        }, i || e.params ? {
                                                            params: eg(i || e.params.split("&").reduce(function(e, t) {
                                                                var r, n = function(e) {
                                                                        if (Array.isArray(e)) return e
                                                                    }(r = t.split("=")) || function(e, t) {
                                                                        var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                                                                        if (null != r) {
                                                                            var n, i, a, o, s = [],
                                                                                c = !0,
                                                                                u = !1;
                                                                            try {
                                                                                for (a = (r = r.call(e)).next; !(c = (n = a.call(r)).done) && (s.push(n.value), 2 !== s.length); c = !0);
                                                                            } catch (e) {
                                                                                u = !0, i = e
                                                                            } finally {
                                                                                try {
                                                                                    if (!c && null != r.return && (o = r.return(), Object(o) !== o)) return
                                                                                } finally {
                                                                                    if (u) throw i
                                                                                }
                                                                            }
                                                                            return s
                                                                        }
                                                                    }(r, 2) || function(e, t) {
                                                                        if (e) {
                                                                            if ("string" == typeof e) return eh(e, 2);
                                                                            var r = Object.prototype.toString.call(e).slice(8, -1);
                                                                            if ("Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r) return Array.from(e);
                                                                            if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return eh(e, 2)
                                                                        }
                                                                    }(r, 2) || function() {
                                                                        throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                                                                    }(),
                                                                    i = n[0],
                                                                    a = n[1];
                                                                return e[i] = a ? decodeURIComponent(a) : "", e
                                                            }, {}))
                                                        } : {})
                                                    })
                                                }),
                                                n = Object.keys(t).reduce(function(e, r) {
                                                    return e.concat(t[r].results)
                                                }, []);
                                            if ("transporter" in e && !e._cacheHydrated) {
                                                e._cacheHydrated = !0;
                                                var i = e.search;
                                                e.search = function(t) {
                                                    for (var r = arguments.length, n = Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++) n[a - 1] = arguments[a];
                                                    var o = t.map(function(e) {
                                                        return ep(ep({}, e), {}, {
                                                            params: eg(e.params)
                                                        })
                                                    });
                                                    return e.transporter.responsesCache.get({
                                                        method: "search",
                                                        args: [o].concat(n)
                                                    }, function() {
                                                        return i.apply(void 0, [t].concat(n))
                                                    })
                                                }, e.transporter.responsesCache.set({
                                                    method: "search",
                                                    args: r
                                                }, {
                                                    results: n
                                                })
                                            }
                                            if (!("transporter" in e)) {
                                                var a = "/1/indexes/*/queries_body_".concat(JSON.stringify({
                                                    requests: r
                                                }));
                                                e.cache = ep(ep({}, e.cache), {}, em({}, a, JSON.stringify({
                                                    results: Object.keys(t).map(function(e) {
                                                        return t[e].results
                                                    })
                                                })))
                                            }
                                        }
                                    }(this.client, this._initialResults);
                                    var n = this.scheduleSearch;
                                    this.scheduleSearch = ef(f.Z), ef(function() {
                                        e.scheduleSearch = n
                                    })()
                                } else this.mainIndex.getWidgets().length > 0 && this.scheduleSearch();
                                this.helper = this.mainIndex.getHelper(), this.started = !0, this.middleware.forEach(function(e) {
                                    e.instance.started()
                                }), void 0 === this._insights && t.derivedHelpers[0].once("result", function() {
                                    e.mainIndex.getScopedResults().some(function(e) {
                                        var t = e.results;
                                        return null == t ? void 0 : t._automaticInsights
                                    }) && e.use(b({
                                        $$internal: !0,
                                        $$automatic: !0
                                    }))
                                })
                            }
                        }, {
                            key: "dispose",
                            value: function() {
                                var e;
                                this.scheduleSearch.cancel(), this.scheduleRender.cancel(), clearTimeout(this._searchStalledTimer), this.removeWidgets(this.mainIndex.getWidgets()), this.mainIndex.dispose(), this.started = !1, this.removeAllListeners(), null === (e = this.mainHelper) || void 0 === e || e.removeAllListeners(), this.mainHelper = null, this.helper = null, this.middleware.forEach(function(e) {
                                    e.instance.unsubscribe()
                                })
                            }
                        }, {
                            key: "scheduleStalledRender",
                            value: function() {
                                var e = this;
                                this._searchStalledTimer || (this._searchStalledTimer = setTimeout(function() {
                                    e.status = "stalled", e.scheduleRender()
                                }, this._stalledSearchDelay))
                            }
                        }, {
                            key: "setUiState",
                            value: function(e) {
                                var t = this,
                                    r = !(arguments.length > 1) || void 0 === arguments[1] || arguments[1];
                                if (!this.mainHelper) throw Error(eE("The `start` method needs to be called before `setUiState`."));
                                this.mainIndex.refreshUiState();
                                var n = "function" == typeof e ? e(this.mainIndex.getWidgetUiState({})) : e;
                                this.onStateChange && r ? this.onStateChange({
                                    uiState: n,
                                    setUiState: function(e) {
                                        ev("function" == typeof e ? e(n) : e, t.mainIndex), t.scheduleSearch(), t.onInternalStateChange()
                                    }
                                }) : (ev(n, this.mainIndex), this.scheduleSearch(), this.onInternalStateChange())
                            }
                        }, {
                            key: "getUiState",
                            value: function() {
                                return this.started && this.mainIndex.refreshUiState(), this.mainIndex.getWidgetUiState({})
                            }
                        }, {
                            key: "createURL",
                            value: function() {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                if (!this.started) throw Error(eE("The `start` method needs to be called before `createURL`."));
                                return this._createURL(e)
                            }
                        }, {
                            key: "refresh",
                            value: function() {
                                if (!this.mainHelper) throw Error(eE("The `start` method needs to be called before `refresh`."));
                                this.mainHelper.clearCache().search()
                            }
                        }],
                        function(e, t) {
                            for (var r = 0; r < t.length; r++) {
                                var n = t[r];
                                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, ex(n.key), n)
                            }
                        }(i.prototype, r), Object.defineProperty(i, "prototype", {
                            writable: !1
                        }), i
                }(o),
                eI = r(92666),
                eA = "7.8.0",
                eD = r(24887),
                ek = r(13330),
                eN = r(95911),
                eH = r(8632),
                eC = r(50113),
                eq = r(68571);

            function eU(e) {
                return (eU = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }

            function eQ(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), r.push.apply(r, n)
                }
                return r
            }

            function eL(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? eQ(Object(r), !0).forEach(function(t) {
                        var n, i;
                        n = t, i = r[t], (n = function(e) {
                            var t = function(e, t) {
                                if ("object" !== eU(e) || null === e) return e;
                                var r = e[Symbol.toPrimitive];
                                if (void 0 !== r) {
                                    var n = r.call(e, t || "default");
                                    if ("object" !== eU(n)) return n;
                                    throw TypeError("@@toPrimitive must return a primitive value.")
                                }
                                return ("string" === t ? String : Number)(e)
                            }(e, "string");
                            return "symbol" === eU(t) ? t : String(t)
                        }(n)) in e ? Object.defineProperty(e, n, {
                            value: i,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : e[n] = i
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : eQ(Object(r)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    })
                }
                return e
            }
            var eW = ["react (".concat(n.version, ")"), "react-instantsearch (".concat(eA, ")"), "react-instantsearch-core (".concat(eA, ")")],
                e$ = "react-instantsearch-server (".concat(eA, ")");

            function eB(e, t) {
                "function" == typeof e.addAlgoliaAgent && t.filter(Boolean).forEach(function(t) {
                    e.addAlgoliaAgent(t)
                })
            }
            var eM = ["children"];

            function eJ(e) {
                var t = e.children,
                    r = function(e) {
                        var t = (0, ek.N)(),
                            r = (0, eN.a)(),
                            i = (0, eH.s)(),
                            a = (0, eC.P)(),
                            o = null == i ? void 0 : i.initialResults,
                            s = (0, n.useRef)(e),
                            c = r || o || a,
                            u = (0, n.useRef)(null);
                        if (i && (u = i.ssrSearchRef), null === u.current) {
                            var f, l, h, d = new eT(e);
                            d._schedule = function(e) {
                                d._schedule.queue.push(e), clearTimeout(d._schedule.timer), d._schedule.timer = setTimeout(function() {
                                    d._schedule.queue.forEach(function(e) {
                                        e()
                                    }), d._schedule.queue = []
                                }, 0)
                            }, d._schedule.queue = [], c && (d._initialResults = o || {}), eB(e.searchClient, [].concat(eW, [r && e$, (h = "undefined" != typeof window && (null === (f = window.next) || void 0 === f ? void 0 : f.version) || (void 0 !== eq ? null === (l = eq.env) || void 0 === l ? void 0 : "" : void 0)) ? "next.js (".concat(h, ")") : null])), c && d.start(), r && r.notifyServer({
                                search: d
                            }), e.routing, u.current = d
                        }
                        var p, m = u.current,
                            g = s.current;
                        g.indexName !== e.indexName && (m.helper.setIndex(e.indexName || "").search(), s.current = e), g.searchClient !== e.searchClient && (eB(e.searchClient, [].concat(eW, [r && e$])), m.mainHelper.setClient(e.searchClient).search(), s.current = e), g.onStateChange !== e.onStateChange && (m.onStateChange = e.onStateChange, s.current = e), g.searchFunction !== e.searchFunction && (m._searchFunction = e.searchFunction, s.current = e), g.stalledSearchDelay !== e.stalledSearchDelay && (m._stalledSearchDelay = null !== (p = e.stalledSearchDelay) && void 0 !== p ? p : 200, s.current = e), (0, eD.J)(g.future, e.future) || (m.future = eL(eL({}, e_), e.future), s.current = e);
                        var y = (0, n.useRef)(null);
                        return (0, eI.useSyncExternalStore)((0, n.useCallback)(function() {
                            var e = u.current;
                            return null === y.current ? e.started || (e.start(), t()) : (clearTimeout(y.current), e._preventWidgetCleanup = !1),
                                function() {
                                    clearTimeout(e._schedule.timer), y.current = setTimeout(function() {
                                        e.dispose()
                                    }), e._preventWidgetCleanup = !0
                                }
                        }, [t]), function() {
                            return u.current
                        }, function() {
                            return u.current
                        })
                    }(function(e, t) {
                        if (null == e) return {};
                        var r, n, i = function(e, t) {
                            if (null == e) return {};
                            var r, n, i = {},
                                a = Object.keys(e);
                            for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) >= 0 || (i[r] = e[r]);
                            return i
                        }(e, t);
                        if (Object.getOwnPropertySymbols) {
                            var a = Object.getOwnPropertySymbols(e);
                            for (n = 0; n < a.length; n++) r = a[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (i[r] = e[r])
                        }
                        return i
                    }(e, eM));
                return r.started ? n.createElement(a.Z.Provider, {
                    value: r
                }, n.createElement(i.Z.Provider, {
                    value: r.mainIndex
                }, t)) : null
            }
        },
        55418: function(e, t, r) {
            "use strict";
            r.d(t, {
                O: function() {
                    return x
                }
            });
            var n = r(83498),
                i = r(1631),
                a = r(26110),
                o = r(19289);

            function s(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), r.push.apply(r, n)
                }
                return r
            }

            function c(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? s(Object(r), !0).forEach(function(t) {
                        var n, i;
                        n = t, i = r[t], (n = function(e) {
                            var t = function(e, t) {
                                if ("object" !== f(e) || null === e) return e;
                                var r = e[Symbol.toPrimitive];
                                if (void 0 !== r) {
                                    var n = r.call(e, t || "default");
                                    if ("object" !== f(n)) return n;
                                    throw TypeError("@@toPrimitive must return a primitive value.")
                                }
                                return ("string" === t ? String : Number)(e)
                            }(e, "string");
                            return "symbol" === f(t) ? t : String(t)
                        }(n)) in e ? Object.defineProperty(e, n, {
                            value: i,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : e[n] = i
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : s(Object(r)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    })
                }
                return e
            }

            function u(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }

            function f(e) {
                return (f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }

            function l(e) {
                var t, r = e.getIndex,
                    n = e.widgetType,
                    i = (e.methodName, e.args),
                    a = e.instantSearchInstance;
                if (1 === i.length && "object" === f(i[0])) return [i[0]];
                var o = function(e) {
                        if (Array.isArray(e)) return e
                    }(t = i[0].split(":")) || function(e, t) {
                        var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                        if (null != r) {
                            var n, i, a, o, s = [],
                                c = !0,
                                u = !1;
                            try {
                                for (a = (r = r.call(e)).next; !(c = (n = a.call(r)).done) && (s.push(n.value), 2 !== s.length); c = !0);
                            } catch (e) {
                                u = !0, i = e
                            } finally {
                                try {
                                    if (!c && null != r.return && (o = r.return(), Object(o) !== o)) return
                                } finally {
                                    if (u) throw i
                                }
                            }
                            return s
                        }
                    }(t, 2) || function(e, t) {
                        if (e) {
                            if ("string" == typeof e) return u(e, 2);
                            var r = Object.prototype.toString.call(e).slice(8, -1);
                            if ("Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r) return Array.from(e);
                            if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return u(e, 2)
                        }
                    }(t, 2) || function() {
                        throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }(),
                    s = o[0],
                    l = o[1],
                    h = i[1],
                    d = i[2],
                    p = i[3] || {};
                if (!h || ("click" === s || "conversion" === s) && !d) return [];
                var m = Array.isArray(h) ? h : [h];
                if (0 === m.length) return [];
                var g = m[0].__queryID,
                    y = function(e) {
                        for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 20, r = [], n = 0; n < Math.ceil(e.length / t); n++) r.push(e.slice(n * t, (n + 1) * t));
                        return r
                    }(m),
                    v = y.map(function(e) {
                        return e.map(function(e) {
                            return e.objectID
                        })
                    }),
                    b = y.map(function(e) {
                        return e.map(function(e) {
                            return e.__position
                        })
                    });
                return "view" === s ? "idle" !== a.status ? [] : y.map(function(e, t) {
                    return {
                        insightsMethod: "viewedObjectIDs",
                        widgetType: n,
                        eventType: s,
                        payload: c({
                            eventName: d || "Hits Viewed",
                            index: r(),
                            objectIDs: v[t]
                        }, p),
                        hits: e,
                        eventModifier: l
                    }
                }) : "click" === s ? y.map(function(e, t) {
                    return {
                        insightsMethod: "clickedObjectIDsAfterSearch",
                        widgetType: n,
                        eventType: s,
                        payload: c({
                            eventName: d || "Hit Clicked",
                            index: r(),
                            queryID: g,
                            objectIDs: v[t],
                            positions: b[t]
                        }, p),
                        hits: e,
                        eventModifier: l
                    }
                }) : "conversion" === s ? y.map(function(e, t) {
                    return {
                        insightsMethod: "convertedObjectIDsAfterSearch",
                        widgetType: n,
                        eventType: s,
                        payload: c({
                            eventName: d || "Hit Converted",
                            index: r(),
                            queryID: g,
                            objectIDs: v[t]
                        }, p),
                        hits: e,
                        eventModifier: l
                    }
                }) : []
            }
            var h = r(95589);

            function d(e) {
                return (d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }

            function p(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), r.push.apply(r, n)
                }
                return r
            }

            function m(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? p(Object(r), !0).forEach(function(t) {
                        var n, i;
                        n = t, i = r[t], (n = function(e) {
                            var t = function(e, t) {
                                if ("object" !== d(e) || null === e) return e;
                                var r = e[Symbol.toPrimitive];
                                if (void 0 !== r) {
                                    var n = r.call(e, t || "default");
                                    if ("object" !== d(n)) return n;
                                    throw TypeError("@@toPrimitive must return a primitive value.")
                                }
                                return ("string" === t ? String : Number)(e)
                            }(e, "string");
                            return "symbol" === d(t) ? t : String(t)
                        }(n)) in e ? Object.defineProperty(e, n, {
                            value: i,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : e[n] = i
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : p(Object(r)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    })
                }
                return e
            }

            function g(e) {
                return (g = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }

            function y(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), r.push.apply(r, n)
                }
                return r
            }

            function v(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? y(Object(r), !0).forEach(function(t) {
                        var n, i;
                        n = t, i = r[t], (n = function(e) {
                            var t = function(e, t) {
                                if ("object" !== g(e) || null === e) return e;
                                var r = e[Symbol.toPrimitive];
                                if (void 0 !== r) {
                                    var n = r.call(e, t || "default");
                                    if ("object" !== g(n)) return n;
                                    throw TypeError("@@toPrimitive must return a primitive value.")
                                }
                                return ("string" === t ? String : Number)(e)
                            }(e, "string");
                            return "symbol" === g(t) ? t : String(t)
                        }(n)) in e ? Object.defineProperty(e, n, {
                            value: i,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : e[n] = i
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : y(Object(r)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    })
                }
                return e
            }

            function b(e) {
                return (b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }

            function S(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), r.push.apply(r, n)
                }
                return r
            }

            function O(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? S(Object(r), !0).forEach(function(t) {
                        j(e, t, r[t])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : S(Object(r)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    })
                }
                return e
            }

            function j(e, t, r) {
                var n;
                return (n = function(e, t) {
                    if ("object" !== b(e) || null === e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var n = r.call(e, t || "default");
                        if ("object" !== b(n)) return n;
                        throw TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === t ? String : Number)(e)
                }(t, "string"), (t = "symbol" === b(n) ? n : String(n)) in e) ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }
            var P = (0, n.K)({
                    name: "hits",
                    connector: !0
                }),
                R = function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : i.Z;
                    return (0, a._)(e, P()),
                        function(r) {
                            var n, i, a = r || {},
                                s = a.escapeHTML,
                                c = void 0 === s || s,
                                u = a.transformItems,
                                f = void 0 === u ? function(e) {
                                    return e
                                } : u;
                            return {
                                $$type: "ais.hits",
                                init: function(t) {
                                    e(O(O({}, this.getWidgetRenderState(t)), {}, {
                                        instantSearchInstance: t.instantSearchInstance
                                    }), !0)
                                },
                                render: function(t) {
                                    var r = this.getWidgetRenderState(t);
                                    e(O(O({}, r), {}, {
                                        instantSearchInstance: t.instantSearchInstance
                                    }), !1), r.sendEvent("view:internal", r.hits)
                                },
                                getRenderState: function(e, t) {
                                    return O(O({}, e), {}, {
                                        hits: this.getWidgetRenderState(t)
                                    })
                                },
                                getWidgetRenderState: function(e) {
                                    var t, a, s, u, d, p, g, y, b, S, O, j, P, R, w, x, E, F, _ = e.results,
                                        T = e.helper,
                                        I = e.instantSearchInstance;
                                    if (n || (a = (t = {
                                            instantSearchInstance: I,
                                            getIndex: function() {
                                                return T.getIndex()
                                            },
                                            widgetType: this.$$type
                                        }).instantSearchInstance, s = t.getIndex, u = t.widgetType, d = {}, p = void 0, n = function() {
                                            for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                                            l({
                                                widgetType: u,
                                                getIndex: s,
                                                methodName: "sendEvent",
                                                args: t,
                                                instantSearchInstance: a
                                            }).forEach(function(e) {
                                                "click" === e.eventType && "internal" === e.eventModifier && d[e.eventType] || (d[e.eventType] = !0, a.sendEventToInsights(e))
                                            }), clearTimeout(p), p = setTimeout(function() {
                                                d = {}
                                            }, 0)
                                        }), i || (y = (g = {
                                            getIndex: function() {
                                                return T.getIndex()
                                            },
                                            widgetType: this.$$type,
                                            instantSearchInstance: I
                                        }).getIndex, b = g.widgetType, S = g.instantSearchInstance, i = function() {
                                            for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                                            var n = l({
                                                widgetType: b,
                                                getIndex: y,
                                                methodName: "bindEvent",
                                                args: t,
                                                instantSearchInstance: S
                                            });
                                            return n.length ? "data-insights-event=".concat((0, o.a)(n)) : ""
                                        }), !_) return {
                                        hits: [],
                                        results: void 0,
                                        banner: void 0,
                                        sendEvent: n,
                                        bindEvent: i,
                                        widgetParams: r
                                    };
                                    c && _.hits.length > 0 && (_.hits = (0, h.mY)(_.hits));
                                    var A = f((O = _.hits, j = _.page, P = _.hitsPerPage, R = O.map(function(e, t) {
                                            return m(m({}, e), {}, {
                                                __position: P * j + t + 1
                                            })
                                        }), (w = _.queryID) ? R.map(function(e) {
                                            return v(v({}, e), {}, {
                                                __queryID: w
                                            })
                                        }) : R), {
                                            results: _
                                        }),
                                        D = null === (x = _.renderingContent) || void 0 === x ? void 0 : null === (E = x.widgets) || void 0 === E ? void 0 : null === (F = E.banners) || void 0 === F ? void 0 : F[0];
                                    return {
                                        hits: A,
                                        results: _,
                                        banner: D,
                                        sendEvent: n,
                                        bindEvent: i,
                                        widgetParams: r
                                    }
                                },
                                dispose: function(e) {
                                    var r = e.state;
                                    return (t(), c) ? r.setQueryParameters(Object.keys(h.dg).reduce(function(e, t) {
                                        return O(O({}, e), {}, j({}, t, void 0))
                                    }, {})) : r
                                },
                                getWidgetSearchParameters: function(e) {
                                    return c ? e.setQueryParameters(h.dg) : e
                                }
                            }
                        }
                },
                w = r(36275);

            function x(e, t) {
                return (0, w.B)(R, e, t)
            }
        },
        39612: function(e, t, r) {
            "use strict";
            r.d(t, {
                l: function() {
                    return d
                }
            });
            var n = r(83498),
                i = r(1631),
                a = r(26110);

            function o(e) {
                return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }

            function s(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), r.push.apply(r, n)
                }
                return r
            }

            function c(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? s(Object(r), !0).forEach(function(t) {
                        var n, i;
                        n = t, i = r[t], (n = function(e) {
                            var t = function(e, t) {
                                if ("object" !== o(e) || null === e) return e;
                                var r = e[Symbol.toPrimitive];
                                if (void 0 !== r) {
                                    var n = r.call(e, t || "default");
                                    if ("object" !== o(n)) return n;
                                    throw TypeError("@@toPrimitive must return a primitive value.")
                                }
                                return ("string" === t ? String : Number)(e)
                            }(e, "string");
                            return "symbol" === o(t) ? t : String(t)
                        }(n)) in e ? Object.defineProperty(e, n, {
                            value: i,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : e[n] = i
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : s(Object(r)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    })
                }
                return e
            }
            var u = (0, n.K)({
                    name: "search-box",
                    connector: !0
                }),
                f = function(e, t) {
                    return t(e)
                },
                l = function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : i.Z;
                    return (0, a._)(e, u()),
                        function(r) {
                            var n, i, a = (r || {}).queryHook,
                                o = void 0 === a ? f : a;
                            return {
                                $$type: "ais.searchBox",
                                init: function(t) {
                                    var r = t.instantSearchInstance;
                                    e(c(c({}, this.getWidgetRenderState(t)), {}, {
                                        instantSearchInstance: r
                                    }), !0)
                                },
                                render: function(t) {
                                    var r = t.instantSearchInstance;
                                    e(c(c({}, this.getWidgetRenderState(t)), {}, {
                                        instantSearchInstance: r
                                    }), !1)
                                },
                                dispose: function(e) {
                                    var r = e.state;
                                    return t(), r.setQueryParameter("query", void 0)
                                },
                                getRenderState: function(e, t) {
                                    return c(c({}, e), {}, {
                                        searchBox: this.getWidgetRenderState(t)
                                    })
                                },
                                getWidgetRenderState: function(e) {
                                    var t = e.helper,
                                        a = e.instantSearchInstance,
                                        s = e.state;
                                    return n || (n = function(e) {
                                        o(e, function(e) {
                                            return t.setQuery(e).search()
                                        })
                                    }, i = function() {
                                        t.setQuery("").search()
                                    }), {
                                        query: s.query || "",
                                        refine: n,
                                        clear: i,
                                        widgetParams: r,
                                        isSearchStalled: "stalled" === a.status
                                    }
                                },
                                getWidgetUiState: function(e, t) {
                                    var r = t.searchParameters.query || "";
                                    return "" === r || e && e.query === r ? e : c(c({}, e), {}, {
                                        query: r
                                    })
                                },
                                getWidgetSearchParameters: function(e, t) {
                                    var r = t.uiState;
                                    return e.setQueryParameter("query", r.query || "")
                                }
                            }
                        }
                },
                h = r(36275);

            function d(e, t) {
                return (0, h.B)(l, e, t)
            }
        },
        36275: function(e, t, r) {
            "use strict";
            r.d(t, {
                B: function() {
                    return v
                }
            });
            var n = r(7653),
                i = r(24887),
                a = r(78529),
                o = r(68019),
                s = r(74993),
                c = r(95911),
                u = r(92262),
                f = r(93714);

            function l(e) {
                return (l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }
            var h = ["instantSearchInstance", "widgetParams"],
                d = ["widgetParams"];

            function p(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }

            function m(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), r.push.apply(r, n)
                }
                return r
            }

            function g(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? m(Object(r), !0).forEach(function(t) {
                        var n, i;
                        n = t, i = r[t], (n = function(e) {
                            var t = function(e, t) {
                                if ("object" !== l(e) || null === e) return e;
                                var r = e[Symbol.toPrimitive];
                                if (void 0 !== r) {
                                    var n = r.call(e, t || "default");
                                    if ("object" !== l(n)) return n;
                                    throw TypeError("@@toPrimitive must return a primitive value.")
                                }
                                return ("string" === t ? String : Number)(e)
                            }(e, "string");
                            return "symbol" === l(t) ? t : String(t)
                        }(n)) in e ? Object.defineProperty(e, n, {
                            value: i,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : e[n] = i
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : m(Object(r)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    })
                }
                return e
            }

            function y(e, t) {
                if (null == e) return {};
                var r, n, i = function(e, t) {
                    if (null == e) return {};
                    var r, n, i = {},
                        a = Object.keys(e);
                    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) >= 0 || (i[r] = e[r]);
                    return i
                }(e, t);
                if (Object.getOwnPropertySymbols) {
                    var a = Object.getOwnPropertySymbols(e);
                    for (n = 0; n < a.length; n++) r = a[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (i[r] = e[r])
                }
                return i
            }

            function v(e) {
                var t, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    l = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    m = (0, c.a)(),
                    v = (0, s.z)(),
                    b = (0, o.a)(),
                    S = (0, u.q)(r),
                    O = (0, u.q)(l),
                    j = (0, n.useRef)(!0),
                    P = (0, n.useRef)(null),
                    R = (0, n.useRef)(v.status),
                    w = (0, n.useMemo)(function() {
                        return g(g({}, e(function(e, t) {
                            if (t) {
                                j.current = !0;
                                return
                            }
                            if (j.current) {
                                var r = e.instantSearchInstance,
                                    n = (e.widgetParams, y(e, h));
                                (0, i.J)(n, P.current, function(e, t) {
                                    return (null == e ? void 0 : e.constructor) === Function && (null == t ? void 0 : t.constructor) === Function
                                }) && r.status === R.current || (F(n), P.current = n, R.current = r.status)
                            }
                        }, function() {
                            j.current = !1
                        })(S)), O)
                    }, [e, S, O]),
                    x = function(e) {
                        if (Array.isArray(e)) return e
                    }(t = (0, n.useState)(function() {
                        if (w.getWidgetRenderState) {
                            var e, t = b.getHelper(),
                                r = b.getWidgetUiState({})[b.getIndexId()];
                            t.state = (null === (e = w.getWidgetSearchParameters) || void 0 === e ? void 0 : e.call(w, t.state, {
                                uiState: r
                            })) || t.state;
                            var n = (0, a.E)(b),
                                i = n.results,
                                o = n.scopedResults,
                                s = w.getWidgetRenderState({
                                    helper: t,
                                    parent: b,
                                    instantSearchInstance: v,
                                    results: i,
                                    scopedResults: o,
                                    state: t.state,
                                    renderState: v.renderState,
                                    templatesConfig: v.templatesConfig,
                                    createURL: b.createURL,
                                    searchMetadata: {
                                        isSearchStalled: "stalled" === v.status
                                    },
                                    status: v.status,
                                    error: v.error
                                });
                            return s.widgetParams, y(s, d)
                        }
                        return {}
                    })) || function(e, t) {
                        var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                        if (null != r) {
                            var n, i, a, o, s = [],
                                c = !0,
                                u = !1;
                            try {
                                for (a = (r = r.call(e)).next; !(c = (n = a.call(r)).done) && (s.push(n.value), 2 !== s.length); c = !0);
                            } catch (e) {
                                u = !0, i = e
                            } finally {
                                try {
                                    if (!c && null != r.return && (o = r.return(), Object(o) !== o)) return
                                } finally {
                                    if (u) throw i
                                }
                            }
                            return s
                        }
                    }(t, 2) || function(e, t) {
                        if (e) {
                            if ("string" == typeof e) return p(e, 2);
                            var r = Object.prototype.toString.call(e).slice(8, -1);
                            if ("Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r) return Array.from(e);
                            if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return p(e, 2)
                        }
                    }(t, 2) || function() {
                        throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }(),
                    E = x[0],
                    F = x[1];
                return (0, f.F)({
                    widget: w,
                    parentIndex: b,
                    props: S,
                    shouldSsr: !!m
                }), E
            }
        },
        77087: function(e, t, r) {
            "use strict";
            r.d(t, {
                b: function() {
                    return h
                }
            });
            var n = r(7653),
                i = r(74993),
                a = r(69423),
                o = r(37651),
                s = r(78529),
                c = r(68019);

            function u(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }

            function f(e, t) {
                return function(e) {
                    if (Array.isArray(e)) return e
                }(e) || function(e, t) {
                    var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                    if (null != r) {
                        var n, i, a, o, s = [],
                            c = !0,
                            u = !1;
                        try {
                            if (a = (r = r.call(e)).next, 0 === t) {
                                if (Object(r) !== r) return;
                                c = !1
                            } else
                                for (; !(c = (n = a.call(r)).done) && (s.push(n.value), s.length !== t); c = !0);
                        } catch (e) {
                            u = !0, i = e
                        } finally {
                            try {
                                if (!c && null != r.return && (o = r.return(), Object(o) !== o)) return
                            } finally {
                                if (u) throw i
                            }
                        }
                        return s
                    }
                }(e, t) || function(e, t) {
                    if (e) {
                        if ("string" == typeof e) return l(e, t);
                        var r = Object.prototype.toString.call(e).slice(8, -1);
                        if ("Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r) return Array.from(e);
                        if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return l(e, t)
                    }
                }(e, t) || function() {
                    throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function l(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }

            function h() {
                var e, t, r, l, h, d, p, m, g, y, v, b, S, O, j, P, R, w, x, E = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    F = E.catchError,
                    _ = (0, i.z)(),
                    T = (e = (0, i.z)(), r = (t = (0, c.a)()).getIndexId(), h = (l = f((0, n.useState)(function() {
                        return e.getUiState()
                    }), 2))[0], d = l[1], p = h[r], g = (m = f((0, n.useState)(function() {
                        return e.renderState
                    }), 2))[0], y = m[1], v = g[r] || {}, b = (0, n.useCallback)(function(t) {
                        e.setUiState(t)
                    }, [e]), S = (0, n.useCallback)(function(e) {
                        t.setIndexUiState(e)
                    }, [t]), (0, n.useEffect)(function() {
                        function t() {
                            d(e.getUiState()), y(e.renderState)
                        }
                        return e.addListener("render", t),
                            function() {
                                e.removeListener("render", t)
                            }
                    }, [e]), {
                        uiState: h,
                        setUiState: b,
                        indexUiState: p,
                        setIndexUiState: S,
                        renderState: g,
                        indexRenderState: v
                    }),
                    I = T.uiState,
                    A = T.setUiState,
                    D = T.indexUiState,
                    k = T.setIndexUiState,
                    N = T.renderState,
                    H = T.indexRenderState,
                    C = (O = (0, i.z)(), j = (0, c.a)(), w = (R = function(e) {
                        if (Array.isArray(e)) return e
                    }(P = (0, n.useState)(function() {
                        return (0, s.E)(j)
                    })) || function(e, t) {
                        var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                        if (null != r) {
                            var n, i, a, o, s = [],
                                c = !0,
                                u = !1;
                            try {
                                for (a = (r = r.call(e)).next; !(c = (n = a.call(r)).done) && (s.push(n.value), 2 !== s.length); c = !0);
                            } catch (e) {
                                u = !0, i = e
                            } finally {
                                try {
                                    if (!c && null != r.return && (o = r.return(), Object(o) !== o)) return
                                } finally {
                                    if (u) throw i
                                }
                            }
                            return s
                        }
                    }(P, 2) || function(e, t) {
                        if (e) {
                            if ("string" == typeof e) return u(e, 2);
                            var r = Object.prototype.toString.call(e).slice(8, -1);
                            if ("Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r) return Array.from(e);
                            if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return u(e, 2)
                        }
                    }(P, 2) || function() {
                        throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }())[0], x = R[1], (0, n.useEffect)(function() {
                        function e() {
                            var e = j.getResults();
                            if (null !== e) x({
                                results: e,
                                scopedResults: j.getScopedResults()
                            });
                            else if (0 === O.mainIndex.getIndexName().length) {
                                var t = O.mainIndex.getWidgets().find(o.J);
                                t && x({
                                    results: (0, s.E)(j).results,
                                    scopedResults: t.getScopedResults()
                                })
                            }
                        }
                        return O.addListener("render", e),
                            function() {
                                O.removeListener("render", e)
                            }
                    }, [O, j]), w),
                    q = C.results,
                    U = C.scopedResults,
                    Q = (0, n.useCallback)(function() {
                        for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                        return _.use.apply(_, t),
                            function() {
                                _.unuse.apply(_, t)
                            }
                    }, [_]),
                    L = (0, n.useCallback)(function() {
                        _.refresh()
                    }, [_]);
                return (0, a.L)(function() {
                    if (F) {
                        var e = function() {};
                        return _.addListener("error", e),
                            function() {
                                return _.removeListener("error", e)
                            }
                    }
                    return function() {}
                }, [_, F]), {
                    results: q,
                    scopedResults: U,
                    uiState: I,
                    setUiState: A,
                    indexUiState: D,
                    setIndexUiState: k,
                    renderState: N,
                    indexRenderState: H,
                    addMiddlewares: Q,
                    refresh: L,
                    status: _.status,
                    error: _.error
                }
            }
        },
        30837: function(e, t, r) {
            "use strict";
            r.d(t, {
                Z: function() {
                    return n
                }
            });
            var n = (0, r(7653).createContext)(null)
        },
        37923: function(e, t, r) {
            "use strict";
            r.d(t, {
                Z: function() {
                    return n
                }
            });
            var n = (0, r(7653).createContext)(null)
        },
        24887: function(e, t, r) {
            "use strict";

            function n(e) {
                return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }
            r.d(t, {
                J: function() {
                    return function e(t, r, a) {
                        var o, s;
                        if (null != a && a(t, r) || t === r) return !0;
                        if (t && r && (o = t.constructor) === r.constructor) {
                            if (o === Date) return t.getTime() === r.getTime();
                            if (o === RegExp) return t.toString() === r.toString();
                            if (o === Array) {
                                if ((s = t.length) === r.length)
                                    for (; s-- && e(t[s], r[s], a););
                                return -1 === s
                            }
                            if (!o || "object" === n(t)) {
                                for (o in s = 0, t)
                                    if (i.call(t, o) && ++s && !i.call(r, o) || !(o in r) || !e(t[o], r[o], a)) return !1;
                                return Object.keys(r).length === s
                            }
                        }
                        return t != t && r != r
                    }
                }
            });
            var i = Object.prototype.hasOwnProperty
        },
        78529: function(e, t, r) {
            "use strict";
            r.d(t, {
                E: function() {
                    return c
                }
            });
            var n = r(58544);

            function i(e) {
                var t, r, i;
                return new n.SearchResults(e, [{
                    query: null !== (t = e.query) && void 0 !== t ? t : "",
                    page: null !== (r = e.page) && void 0 !== r ? r : 0,
                    hitsPerPage: null !== (i = e.hitsPerPage) && void 0 !== i ? i : 20,
                    hits: [],
                    nbHits: 0,
                    nbPages: 0,
                    params: "",
                    exhaustiveNbHits: !0,
                    exhaustiveFacetsCount: !0,
                    processingTimeMS: 0,
                    index: e.index
                }], {
                    __isArtificial: !0
                })
            }

            function a(e) {
                return (a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                })(e)
            }

            function o(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter(function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), r.push.apply(r, n)
                }
                return r
            }

            function s(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? o(Object(r), !0).forEach(function(t) {
                        var n, i;
                        n = t, i = r[t], (n = function(e) {
                            var t = function(e, t) {
                                if ("object" !== a(e) || null === e) return e;
                                var r = e[Symbol.toPrimitive];
                                if (void 0 !== r) {
                                    var n = r.call(e, t || "default");
                                    if ("object" !== a(n)) return n;
                                    throw TypeError("@@toPrimitive must return a primitive value.")
                                }
                                return ("string" === t ? String : Number)(e)
                            }(e, "string");
                            return "symbol" === a(t) ? t : String(t)
                        }(n)) in e ? Object.defineProperty(e, n, {
                            value: i,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : e[n] = i
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : o(Object(r)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    })
                }
                return e
            }

            function c(e) {
                var t = e.getHelper(),
                    r = e.getResults() || i(t.state),
                    n = e.getScopedResults().map(function(t) {
                        var n = t.indexId === e.getIndexId() ? r : i(t.helper.state);
                        return s(s({}, t), {}, {
                            results: t.results || n
                        })
                    });
                return {
                    results: r,
                    scopedResults: n
                }
            }
        },
        62163: function(e, t, r) {
            "use strict";

            function n(e, t) {
                if (!e) throw Error("Invariant failed")
            }
            r.d(t, {
                k: function() {
                    return n
                }
            })
        },
        13330: function(e, t, r) {
            "use strict";
            r.d(t, {
                N: function() {
                    return a
                }
            });
            var n = r(7653);

            function i(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }

            function a() {
                var e;
                return (function(e) {
                    if (Array.isArray(e)) return e
                }(e = (0, n.useReducer)(function(e) {
                    return e + 1
                }, 0)) || function(e, t) {
                    var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                    if (null != r) {
                        var n, i, a, o, s = [],
                            c = !0,
                            u = !1;
                        try {
                            for (a = (r = r.call(e)).next; !(c = (n = a.call(r)).done) && (s.push(n.value), 2 !== s.length); c = !0);
                        } catch (e) {
                            u = !0, i = e
                        } finally {
                            try {
                                if (!c && null != r.return && (o = r.return(), Object(o) !== o)) return
                            } finally {
                                if (u) throw i
                            }
                        }
                        return s
                    }
                }(e, 2) || function(e, t) {
                    if (e) {
                        if ("string" == typeof e) return i(e, 2);
                        var r = Object.prototype.toString.call(e).slice(8, -1);
                        if ("Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r) return Array.from(e);
                        if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return i(e, 2)
                    }
                }(e, 2) || function() {
                    throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }())[1]
            }
        },
        68019: function(e, t, r) {
            "use strict";
            r.d(t, {
                a: function() {
                    return o
                }
            });
            var n = r(7653),
                i = r(62163),
                a = r(30837);

            function o() {
                var e = (0, n.useContext)(a.Z);
                return (0, i.k)(null !== e, "The <Index> component must be used within <InstantSearch>."), e
            }
        },
        74993: function(e, t, r) {
            "use strict";
            r.d(t, {
                z: function() {
                    return o
                }
            });
            var n = r(7653),
                i = r(62163),
                a = r(37923);

            function o() {
                var e = (0, n.useContext)(a.Z);
                return (0, i.k)(null !== e, "Hooks must be used inside the <InstantSearch> component.\n\nThey are not compatible with the `react-instantsearch-core@6.x` and `react-instantsearch-dom` packages, so make sure to use the <InstantSearch> component from `react-instantsearch-core@7.x`."), e
            }
        },
        8632: function(e, t, r) {
            "use strict";
            r.d(t, {
                s: function() {
                    return a
                }
            });
            var n = r(7653),
                i = (0, n.createContext)(null);

            function a() {
                return (0, n.useContext)(i)
            }
        },
        95911: function(e, t, r) {
            "use strict";
            r.d(t, {
                a: function() {
                    return a
                }
            });
            var n = r(7653),
                i = (0, n.createContext)(null);

            function a() {
                return (0, n.useContext)(i)
            }
        },
        69423: function(e, t, r) {
            "use strict";
            r.d(t, {
                L: function() {
                    return i
                }
            });
            var n = r(7653),
                i = "undefined" != typeof window ? n.useLayoutEffect : n.useEffect
        },
        50113: function(e, t, r) {
            "use strict";
            r.d(t, {
                P: function() {
                    return a
                }
            });
            var n = r(7653),
                i = (0, n.createContext)(null);

            function a() {
                return (0, n.useContext)(i)
            }
        },
        92262: function(e, t, r) {
            "use strict";
            r.d(t, {
                q: function() {
                    return o
                }
            });
            var n = r(7653),
                i = r(24887);

            function a(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }

            function o(e) {
                var t, r = function(e) {
                        if (Array.isArray(e)) return e
                    }(t = (0, n.useState)(function() {
                        return e
                    })) || function(e, t) {
                        var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                        if (null != r) {
                            var n, i, a, o, s = [],
                                c = !0,
                                u = !1;
                            try {
                                for (a = (r = r.call(e)).next; !(c = (n = a.call(r)).done) && (s.push(n.value), 2 !== s.length); c = !0);
                            } catch (e) {
                                u = !0, i = e
                            } finally {
                                try {
                                    if (!c && null != r.return && (o = r.return(), Object(o) !== o)) return
                                } finally {
                                    if (u) throw i
                                }
                            }
                            return s
                        }
                    }(t, 2) || function(e, t) {
                        if (e) {
                            if ("string" == typeof e) return a(e, 2);
                            var r = Object.prototype.toString.call(e).slice(8, -1);
                            if ("Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r) return Array.from(e);
                            if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return a(e, 2)
                        }
                    }(t, 2) || function() {
                        throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }(),
                    o = r[0],
                    s = r[1];
                return (0, i.J)(o, e) || s(e), o
            }
        },
        93714: function(e, t, r) {
            "use strict";
            r.d(t, {
                F: function() {
                    return f
                }
            });
            var n = r(7653),
                i = r.t(n, 2),
                a = r(24887),
                o = i.use,
                s = r(74993),
                c = r(69423),
                u = r(50113);

            function f(e) {
                var t, r, i = e.widget,
                    f = e.parentIndex,
                    l = e.props,
                    h = e.shouldSsr,
                    d = (0, u.P)(),
                    p = (0, n.useRef)(l);
                (0, n.useEffect)(function() {
                    p.current = l
                }, [l]);
                var m = (0, n.useRef)(i);
                (0, n.useEffect)(function() {
                    m.current = i
                }, [i]);
                var g = (0, n.useRef)(null),
                    y = h && !f.getWidgets().includes(i),
                    v = (0, s.z)();
                (0, c.L)(function() {
                    var e = m.current;
                    return g.current ? (clearTimeout(g.current), (0, a.J)(l, p.current) || (f.removeWidgets([e]), f.addWidgets([i]))) : h || f.addWidgets([i]),
                        function() {
                            g.current = setTimeout(function() {
                                v._schedule(function() {
                                    v._preventWidgetCleanup || f.removeWidgets([e])
                                })
                            })
                        }
                }, [f, i, h, v, l]), (y || (null == d ? void 0 : null === (t = d.current) || void 0 === t ? void 0 : t.status) === "pending") && f.addWidgets([i]), "undefined" == typeof window && null != d && d.current && "ais.index" !== i.$$type && (o(d.current), "ais.dynamicWidgets" !== i.$$type && null !== (r = v.helper) && void 0 !== r && r.lastResults && o(d.current))
            }
        },
        13721: function(e, t, r) {
            "use strict";

            function n() {
                return (n = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }).apply(this, arguments)
            }
            r.d(t, {
                A: function() {
                    return l
                }
            });
            var i, a, o, s, c = r(24435),
                u = ["parts", "highlightedTagName", "nonHighlightedTagName", "separator", "className", "classNames"],
                f = r(7653),
                l = (a = (i = {
                    createElement: f.createElement,
                    Fragment: f.Fragment
                }).createElement, o = i.Fragment, s = function(e) {
                    var t = e.classNames,
                        r = e.children,
                        n = e.highlightedTagName,
                        i = e.isHighlighted,
                        o = e.nonHighlightedTagName;
                    return a(i ? n : o, {
                        className: i ? t.highlighted : t.nonHighlighted
                    }, r)
                }, function(e) {
                    var t = e.parts,
                        r = e.highlightedTagName,
                        i = void 0 === r ? "mark" : r,
                        f = e.nonHighlightedTagName,
                        l = void 0 === f ? "span" : f,
                        h = e.separator,
                        d = void 0 === h ? ", " : h,
                        p = e.className,
                        m = e.classNames,
                        g = void 0 === m ? {} : m,
                        y = function(e, t) {
                            if (null == e) return {};
                            var r, n, i = function(e, t) {
                                if (null == e) return {};
                                var r = {};
                                for (var n in e)
                                    if (Object.prototype.hasOwnProperty.call(e, n)) {
                                        if (t.indexOf(n) >= 0) continue;
                                        r[n] = e[n]
                                    }
                                return r
                            }(e, t);
                            if (Object.getOwnPropertySymbols) {
                                var a = Object.getOwnPropertySymbols(e);
                                for (n = 0; n < a.length; n++) r = a[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (i[r] = e[r])
                            }
                            return i
                        }(e, u);
                    return a("span", n({}, y, {
                        className: (0, c.cx)(g.root, p)
                    }), t.map(function(e, r) {
                        var n = r === t.length - 1;
                        return a(o, {
                            key: r
                        }, e.map(function(e, t) {
                            return a(s, {
                                key: t,
                                classNames: g,
                                highlightedTagName: i,
                                nonHighlightedTagName: l,
                                isHighlighted: e.isHighlighted
                            }, e.value)
                        }), !n && a("span", {
                            className: g.separator
                        }, d))
                    }))
                })
        },
        15346: function(e, t, r) {
            "use strict";
            r.d(t, {
                y: function() {
                    return p
                }
            });
            var n = r(90195),
                i = r(91425),
                a = r(71084),
                o = r(7653),
                s = r(24435),
                c = r(13721),
                u = ["classNames"];

            function f() {
                return (f = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }).apply(this, arguments)
            }

            function l(e) {
                var t = e.classNames,
                    r = void 0 === t ? {} : t,
                    n = function(e, t) {
                        if (null == e) return {};
                        var r, n, i = function(e, t) {
                            if (null == e) return {};
                            var r, n, i = {},
                                a = Object.keys(e);
                            for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) >= 0 || (i[r] = e[r]);
                            return i
                        }(e, t);
                        if (Object.getOwnPropertySymbols) {
                            var a = Object.getOwnPropertySymbols(e);
                            for (n = 0; n < a.length; n++) r = a[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (i[r] = e[r])
                        }
                        return i
                    }(e, u);
                return o.createElement(c.A, f({
                    classNames: {
                        root: (0, s.cx)("ais-Highlight", r.root),
                        highlighted: (0, s.cx)("ais-Highlight-highlighted", r.highlighted),
                        nonHighlighted: (0, s.cx)("ais-Highlight-nonHighlighted", r.nonHighlighted),
                        separator: (0, s.cx)("ais-Highlight-separator", r.separator)
                    }
                }, n))
            }
            var h = ["hit", "attribute", "highlightedTagName", "nonHighlightedTagName", "separator"];

            function d() {
                return (d = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }).apply(this, arguments)
            }

            function p(e) {
                var t = e.hit,
                    r = e.attribute,
                    s = e.highlightedTagName,
                    c = e.nonHighlightedTagName,
                    u = e.separator,
                    f = function(e, t) {
                        if (null == e) return {};
                        var r, n, i = function(e, t) {
                            if (null == e) return {};
                            var r, n, i = {},
                                a = Object.keys(e);
                            for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) >= 0 || (i[r] = e[r]);
                            return i
                        }(e, t);
                        if (Object.getOwnPropertySymbols) {
                            var a = Object.getOwnPropertySymbols(e);
                            for (n = 0; n < a.length; n++) r = a[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (i[r] = e[r])
                        }
                        return i
                    }(e, h),
                    p = (0, n.E)(t._highlightResult, r) || [],
                    m = (Array.isArray(p) ? p : [p]).map(function(e) {
                        return (0, i.H)((0, a.A)(e.value || ""))
                    });
                return o.createElement(l, d({}, f, {
                    parts: m,
                    highlightedTagName: s,
                    nonHighlightedTagName: c,
                    separator: u
                }))
            }
        },
        91648: function(e, t, r) {
            "use strict";
            r.d(t, {
                p: function() {
                    return p
                }
            });
            var n = r(90195),
                i = r(91425),
                a = r(71084),
                o = r(7653),
                s = r(24435),
                c = r(13721),
                u = ["classNames"];

            function f() {
                return (f = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }).apply(this, arguments)
            }

            function l(e) {
                var t = e.classNames,
                    r = void 0 === t ? {} : t,
                    n = function(e, t) {
                        if (null == e) return {};
                        var r, n, i = function(e, t) {
                            if (null == e) return {};
                            var r, n, i = {},
                                a = Object.keys(e);
                            for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) >= 0 || (i[r] = e[r]);
                            return i
                        }(e, t);
                        if (Object.getOwnPropertySymbols) {
                            var a = Object.getOwnPropertySymbols(e);
                            for (n = 0; n < a.length; n++) r = a[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (i[r] = e[r])
                        }
                        return i
                    }(e, u);
                return o.createElement(c.A, f({
                    classNames: {
                        root: (0, s.cx)("ais-Snippet", r.root),
                        highlighted: (0, s.cx)("ais-Snippet-highlighted", r.highlighted),
                        nonHighlighted: (0, s.cx)("ais-Snippet-nonHighlighted", r.nonHighlighted),
                        separator: (0, s.cx)("ais-Snippet-separator", r.separator)
                    }
                }, n))
            }
            var h = ["hit", "attribute", "highlightedTagName", "nonHighlightedTagName", "separator"];

            function d() {
                return (d = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }).apply(this, arguments)
            }

            function p(e) {
                var t = e.hit,
                    r = e.attribute,
                    s = e.highlightedTagName,
                    c = e.nonHighlightedTagName,
                    u = e.separator,
                    f = function(e, t) {
                        if (null == e) return {};
                        var r, n, i = function(e, t) {
                            if (null == e) return {};
                            var r, n, i = {},
                                a = Object.keys(e);
                            for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) >= 0 || (i[r] = e[r]);
                            return i
                        }(e, t);
                        if (Object.getOwnPropertySymbols) {
                            var a = Object.getOwnPropertySymbols(e);
                            for (n = 0; n < a.length; n++) r = a[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (i[r] = e[r])
                        }
                        return i
                    }(e, h),
                    p = (0, n.E)(t._snippetResult, r) || [],
                    m = (Array.isArray(p) ? p : [p]).map(function(e) {
                        return (0, i.H)((0, a.A)(e.value || ""))
                    });
                return o.createElement(l, d({}, f, {
                    parts: m,
                    highlightedTagName: s,
                    nonHighlightedTagName: c,
                    separator: u
                }))
            }
        }
    }
]);
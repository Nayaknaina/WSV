"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [3401], {
        70223: function(e, n, t) {
            t.d(n, {
                i: function() {
                    return a
                }
            });
            var l, a, r = t(27573),
                i = t(45531),
                s = t.n(i);
            t(7653);
            var o = t(62725),
                c = t.n(o);
            (l = a || (a = {})).Up = "up", l.Down = "down", l.Right = "right", n.Z = e => {
                let {
                    children: n,
                    delay: t,
                    direction: l = "up",
                    duration: a,
                    stretched: i
                } = e, o = 20;
                ("down" === l || "right" === l) && (o *= -1);
                let u = s()({
                    [c().component]: !0,
                    [c().stretched]: i,
                    [c().isUpDownAnimation]: "up" === l || "down" === l,
                    [c().isRightAnimation]: "right" === l
                });
                return (0, r.jsx)("div", {
                    className: u,
                    style: {
                        "--delay": `${null!=t?t:0}ms`,
                        "--distance": `${o}px`,
                        "--duration": `${null!=a?a:500}ms`
                    },
                    children: n
                })
            }
        },
        72381: function(e, n, t) {
            t.d(n, {
                q: function() {
                    return d
                }
            });
            var l, a = t(27573),
                r = t(45531),
                i = t.n(r);
            t(7653);
            var s = t(48567),
                o = t(67461),
                c = t(68290),
                u = t.n(c);
            (l || (l = {})).CircleGreen = "circle-green";
            let d = e => {
                let {
                    children: n,
                    highlightedColor: t,
                    iconType: l,
                    isHighlighted: r,
                    shapeType: c
                } = e, d = null != r ? r : void 0 !== t, p = void 0 !== t && (0, o.jn)(t);
                return (0, a.jsxs)("div", {
                    className: i()({
                        [u().component]: !0,
                        [u().isHighlighted]: d,
                        [u().isDark]: p,
                        [u().hasCircleGreen]: "circle-green" === c
                    }),
                    style: {
                        "--bg": d ? (0, o.Lq)(null != t ? t : o.YI.PrimaryGreen) : void 0
                    },
                    children: [null !== l && (0, a.jsx)("span", {
                        className: u().icon,
                        children: (0, a.jsx)(s._k, {
                            type: l
                        })
                    }), (0, a.jsx)("span", {
                        className: u().label,
                        children: n
                    })]
                })
            }
        },
        3203: function(e, n, t) {
            t.d(n, {
                L: function() {
                    return o
                }
            });
            var l = t(27573),
                a = t(57908);
            t(7653);
            var r = t(52155),
                i = t(27442),
                s = t.n(i);
            let o = e => {
                let {
                    bottom: n,
                    children: t,
                    isCenteredHorizontally: i,
                    left: o,
                    maxWidth: c,
                    right: u,
                    textAlign: d,
                    top: p
                } = e, [h, g, x] = (0, r.tv)(n), [m, v, b] = (0, r.tv)(o), [f, k, j] = (0, r.tv)(u), [C, y, S] = (0, r.tv)(p), [N, w, $] = (0, r.tv)(c), R = {
                    "--spacer-mobile-b-gap": !!n && `${h}px`,
                    "--spacer-tablet-b-gap": !!n && `${g}px`,
                    "--spacer-desktop-b-gap": !!n && `${x}px`,
                    "--spacer-mobile-l-gap": !!o && `${m}px`,
                    "--spacer-tablet-l-gap": !!o && `${v}px`,
                    "--spacer-desktop-l-gap": !!o && `${b}px`,
                    "--spacer-mobile-r-gap": !!u && `${f}px`,
                    "--spacer-tablet-r-gap": !!u && `${k}px`,
                    "--spacer-desktop-r-gap": !!u && `${j}px`,
                    "--spacer-mobile-t-gap": !!p && `${C}px`,
                    "--spacer-tablet-t-gap": !!p && `${y}px`,
                    "--spacer-desktop-t-gap": !!p && `${S}px`,
                    "--spacer-mobile-max-width": !!c && `${N}px`,
                    "--spacer-tablet-max-width": !!c && `${w}px`,
                    "--spacer-desktop-max-width": !!c && `${$}px`,
                    "--spacer-text-align": d
                };
                return (0, l.jsx)("div", {
                    className: (0, a.Z)({
                        [s().component]: !0,
                        [s().isCenteredHorizontally]: i
                    }),
                    style: R,
                    children: t
                })
            }
        },
        91362: function(e, n, t) {
            t.r(n), t.d(n, {
                default: function() {
                    return u
                },
                determineNudgeLanguage: function() {
                    return d
                }
            });
            var l = t(27573),
                a = t(7653),
                r = t(10400),
                i = t(70223),
                s = t(950),
                o = t(26918),
                c = t(89026);

            function u(e) {
                let {
                    language: n,
                    mobileBackgroundContext: t,
                    translations: u
                } = e, {
                    t: p
                } = (0, o.E)(n, "components"), [h, g] = (0, a.useState)(null), x = (0, c.D)();
                if ((0, a.useEffect)(() => {
                        u && x && g(d(n, x.acceptedLanguages, u))
                    }, [x, n, u]), null === h) return null;
                let m = (0, s.Q8)(h, u);
                return null === m ? null : (0, l.jsx)(i.Z, {
                    delay: 500,
                    direction: i.i.Down,
                    children: (0, l.jsx)(r.HeaderLanguageSwitcher, {
                        ariaLabel: p("LanguageNudge.ariaLabel", {
                            context: h
                        }),
                        description: p("LanguageNudge.description", {
                            context: h
                        }),
                        desktopLabel: p("LanguageNudge.desktopLabel", {
                            context: h
                        }),
                        href: m,
                        mobileBackgroundContext: t,
                        mobileLabel: p("LanguageNudge.mobileLabel", {
                            context: h
                        })
                    })
                })
            }

            function d(e, n, t) {
                var l;
                return null !== (l = n.filter(n => n !== e).find(e => (0, s.yv)(e) && (0, s.Q8)(e, t))) && void 0 !== l ? l : null
            }
        },
        60699: function(e, n, t) {
            t.d(n, {
                default: function() {
                    return es
                }
            });
            var l, a, r, i, s, o = t(27573),
                c = t(7653),
                u = t(79187),
                d = t(99245),
                p = t.n(d),
                h = t(11566),
                g = t(37391),
                x = t(58832),
                m = t(17098),
                v = t(54322),
                b = t(39612),
                f = t(97104),
                k = t(26918),
                j = function(e) {
                    let {
                        language: n,
                        searchInputRef: t
                    } = e, {
                        query: l,
                        refine: a
                    } = (0, b.l)(e), {
                        t: r
                    } = (0, k.E)(n, "components");
                    (0, c.useEffect)(() => {
                        var e;
                        a(null !== (e = (0, v.St)("searchQuery")) && void 0 !== e ? e : "")
                    }, [a]);
                    let i = (0, c.useCallback)(e => {
                            let n = e.currentTarget.value;
                            a(n), (0, v.D9)("searchQuery", n)
                        }, [a]),
                        s = (0, c.useCallback)(e => {
                            e.target.select()
                        }, []),
                        u = (0, c.useCallback)(e => {
                            "Enter" === e.code ? (en.emit("enter"), e.preventDefault()) : "ArrowDown" === e.code ? (en.emit("arrow", "down"), e.preventDefault()) : "ArrowUp" === e.code && (en.emit("arrow", "up"), e.preventDefault())
                        }, []);
                    return (0, o.jsx)(f.U, {
                        autoComplete: "off",
                        autoFocus: !0,
                        name: "search",
                        onChange: i,
                        onFocus: s,
                        onKeyDown: u,
                        placeholder: r("SearchModal.inputField.placeholder"),
                        ref: t,
                        size: [f.r.Medium, f.r.Medium, f.r.Large],
                        type: "search",
                        value: l
                    })
                },
                C = t(77087),
                y = t(29008),
                S = t(28715),
                N = t(3203),
                w = t(45531),
                $ = t.n(w),
                R = t(30720),
                L = t.n(R);
            (l = r || (r = {})).Dark = "dark", l.Light = "light";
            let E = e => {
                let {
                    announcement: n,
                    description: t,
                    variant: l = "dark"
                } = e;
                return (0, o.jsxs)("div", {
                    "aria-live": "polite",
                    className: $()({
                        [L().component]: !0,
                        [L().isDark]: "dark" === l,
                        [L().isLight]: "light" === l
                    }),
                    role: "status",
                    children: [(0, o.jsx)("div", {
                        className: L().announcement,
                        children: n
                    }), t && (0, o.jsx)("div", {
                        className: L().description,
                        children: t
                    })]
                })
            };
            var I = t(58358),
                D = t(674),
                A = t(950),
                T = t(90195),
                _ = t(57713),
                M = t.n(_),
                O = t(55418),
                P = t(91648),
                U = t(15346),
                H = t(48567),
                q = t(15932),
                Z = t(22547),
                z = t(29194),
                B = t(72381),
                F = t(78330),
                Q = t.n(F);
            let G = e => {
                let {
                    category: n = null,
                    href: t,
                    innerRef: l = null,
                    isHighlighted: a,
                    onClick: r,
                    testId: i,
                    text: s,
                    title: c
                } = e, u = (0, x.Bm)(t);
                return (0, o.jsxs)("div", {
                    className: $()({
                        [Q().component]: !0,
                        [Q().isHighlighted]: a
                    }),
                    "data-hoverable": "true",
                    "data-testid": i,
                    ref: l,
                    children: [null !== n && (0, o.jsx)("div", {
                        className: Q().badge,
                        children: (0, o.jsx)(B.q, {
                            iconType: n.iconType,
                            children: n.label
                        })
                    }), (0, o.jsx)("div", {
                        className: Q().title,
                        children: (0, o.jsxs)("a", {
                            className: Q().link,
                            href: t,
                            onClick: r,
                            rel: "noopener",
                            target: u ? "_blank" : void 0,
                            children: [c, u && (0, o.jsx)("span", {
                                className: "visually-hidden",
                                children: " (opens in a new tab)"
                            })]
                        })
                    }), s && (0, o.jsx)("div", {
                        className: Q().text,
                        children: s
                    })]
                })
            };
            var K = t(70223),
                V = t(85312);
            (a = i || (i = {})).About = "about", a.Academy = "academy", a.Blog = "blog", a.Careers = "careers", a.CustomerStories = "customer-stories", a.Events = "events", a.Industries = "industries", a.Partners = "partners", a.Platform = "platform", a.Press = "press";
            let W = {
                [i.About]: H.Rk.AboutUs,
                [i.Academy]: H.Rk.Academy,
                [i.Blog]: H.Rk.Blog,
                [i.Careers]: H.Rk.Careers,
                [i.CustomerStories]: H.Rk.CustomerStories,
                [i.Events]: H.Rk.Events,
                [i.Industries]: H.Rk.Sales,
                [i.Partners]: H.Rk.Partners,
                [i.Platform]: H.Rk.Engineering,
                [i.Press]: H.Rk.Press
            };

            function X(e, n) {
                if (n === m.O.algoliaZendeskIndex()) return `${m.O.algoliaZendeskUrl()}${e.id}-${(0,V.l)(e.title)}`;
                if (n === m.O.algoliaWebsiteIndex()) {
                    var t;
                    if ("none" === (null !== (t = (0, T.E)(e._snippetResult, ["content", "matchLevel"])) && void 0 !== t ? t : "none")) return e.slug;
                    let n = e.content.replace(/(\.|:)$/, "").toLowerCase().split(" ");
                    if (n.length > 10) {
                        let t = encodeURIComponent(n.slice(0, 4).join(" ")),
                            l = encodeURIComponent(n.slice(-2).join(" "));
                        return `${e.slug}#:~:text=${t},${l}`
                    }
                    return `${e.slug}#:~:text=${encodeURIComponent(n.join(" "))}`
                }
                throw Error(`Unknown index name: ${n}`)
            }(s || (s = {})).click = "click";
            let Y = "Result Clicked after Search";
            var J = function(e) {
                    var n;
                    let {
                        activeSearchIndex: t,
                        hitsPerPage: l = 5,
                        language: a,
                        onCloseCallback: r
                    } = e, {
                        hits: i,
                        results: s,
                        sendEvent: u
                    } = (0, O.O)(e), {
                        t: d
                    } = (0, k.E)(a, "components"), p = m.O.algoliaZendeskIndex(), h = null !== (n = null == s ? void 0 : s.query) && void 0 !== n ? n : "", g = "" !== h, x = i.length > 0, v = !0 === g && !1 === x && (null == s ? void 0 : s.__isArtificial) !== !0, [b, f] = (0, c.useState)(0), [j, C] = (0, c.useState)(l), y = i.length > j;
                    (0, c.useEffect)(() => {
                        f(0), C(l)
                    }, [h, l]), (0, c.useEffect)(() => en.on("arrow", e => {
                        t === (null == s ? void 0 : s.index) && f(n => {
                            let t = M()(n + ("up" === e ? -1 : 1), 0, i.length - 1);
                            return t >= j && C(j + l), t
                        })
                    }), [i.length, j, l, t, null == s ? void 0 : s.index]), (0, c.useEffect)(() => en.on("enter", () => {
                        let e = i[b];
                        u("click", e, Y), r(), window.open(X(e, null == s ? void 0 : s.index), "_self", "noopener")
                    }), [b, i, r, null == s ? void 0 : s.index, u]);
                    let S = (0, c.useCallback)(e => {
                        null !== e && e.scrollIntoView({
                            block: "nearest"
                        })
                    }, []);
                    return v ? (0, o.jsx)(K.Z, {
                        direction: K.i.Up,
                        duration: 160,
                        stretched: !0,
                        children: (0, o.jsx)(N.L, {
                            bottom: [30, 30, 35],
                            top: [30, 30, 35],
                            children: (0, o.jsx)(E, {
                                announcement: d("SearchModal.noResults.announcement"),
                                description: d("SearchModal.noResults.description")
                            })
                        })
                    }, "no-results") : (0, o.jsx)("div", {
                        style: {
                            paddingBottom: "20px",
                            width: "100%"
                        },
                        children: (0, o.jsx)(q.aV, {
                            gapSize: q.xz.Small,
                            hasDivider: !1,
                            showMoreCta: y ? (0, o.jsx)(Z.Button, {
                                onClick: () => C(j + l),
                                variant: z.Wu.Outline,
                                children: d("common.show_more", "common")
                            }) : null,
                            children: i.slice(0, j).map((e, n) => {
                                var t, l;
                                return (0, o.jsx)(G, {
                                    category: {
                                        label: s && s.index === p ? null === (t = e.section) || void 0 === t ? void 0 : t.title : d(`SearchModal.category.${e.category}`),
                                        iconType: null !== (l = W[e.category]) && void 0 !== l ? l : H.Rk.Conductor
                                    },
                                    href: X(e, null == s ? void 0 : s.index),
                                    innerRef: n === b ? S : null,
                                    isHighlighted: n === b,
                                    onClick: () => {
                                        u("click", e, Y), r()
                                    },
                                    text: (0, o.jsx)(P.p, {
                                        attribute: s && s.index === p ? "body_safe" : "content",
                                        highlightedTagName: "mark",
                                        hit: e
                                    }),
                                    title: (0, o.jsx)(U.y, {
                                        attribute: "title",
                                        highlightedTagName: "mark",
                                        hit: e
                                    })
                                }, e.objectID)
                            })
                        })
                    })
                },
                ee = function(e) {
                    var n;
                    let {
                        focusSearchField: t,
                        language: l,
                        onCloseCallback: a,
                        websiteIndexName: r,
                        zendeskIndexName: i
                    } = e, {
                        t: s
                    } = (0, k.E)(l, "components"), u = (0, c.useCallback)(e => {
                        t(), 0 === e ? b(r) : b(i)
                    }, [t, r, i]), {
                        results: d,
                        scopedResults: p
                    } = (0, C.b)(), h = null !== (n = null == d ? void 0 : d.query) && void 0 !== n ? n : "", g = p.find(e => e.indexId === i && e.results), x = p.find(e => e.indexId === r && e.results), m = (null != x ? x : !!g) ? 0 : 1, [v, b] = (0, c.useState)(0 === m ? r : i);
                    return "" !== h ? (0, o.jsx)(I.Tabs, {
                        hasAdaptiveHeight: !0,
                        initialActiveTab: m,
                        items: [{
                            label: (0, o.jsxs)("span", {
                                children: [s("SearchModal.tab.website.label"), (0, o.jsxs)("span", {
                                    children: [" ", (0, o.jsxs)("small", {
                                        children: [" (", x ? x.results.nbHits : 0, ")"]
                                    })]
                                })]
                            }),
                            content: (0, o.jsxs)(y.g, {
                                indexName: r,
                                children: [(0, o.jsx)(S.T, {
                                    filters: `language:${l}`
                                }), (0, o.jsx)(J, {
                                    activeSearchIndex: v,
                                    language: l,
                                    onCloseCallback: a
                                })]
                            })
                        }, {
                            label: (0, o.jsxs)("span", {
                                children: [s("SearchModal.tab.zendesk.label"), (0, o.jsxs)("small", {
                                    children: [" (", g ? g.results.nbHits : 0, ")"]
                                })]
                            }),
                            content: (0, o.jsxs)(y.g, {
                                indexName: i,
                                children: [(0, o.jsx)(S.T, {
                                    filters: `locale.locale:${l===A.SQ.English?"en-us":"de-DE"}`
                                }), (0, o.jsx)(J, {
                                    activeSearchIndex: v,
                                    language: l,
                                    onCloseCallback: a
                                })]
                            })
                        }],
                        onTabChange: u,
                        stretchTabs: !1,
                        tabsSize: D.K.Small,
                        variant: D.T.LightStone
                    }) : (0, o.jsx)(N.L, {
                        top: [30, 30, 35],
                        children: (0, o.jsx)(E, {
                            announcement: s("SearchModal.blankSlate.announcement")
                        })
                    })
                };
            let en = function() {
                let e = {};
                return {
                    emit(n) {
                        for (var t = arguments.length, l = Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++) l[a - 1] = arguments[a];
                        for (let t of e[n] || []) t(...l)
                    },
                    on: (n, t) => (e[n] = e[n] || [], e[n].push(t), function() {
                        var l;
                        e[n] = null === (l = e[n]) || void 0 === l ? void 0 : l.filter(e => t !== e)
                    })
                }
            }();
            var et = function(e) {
                    var n;
                    let {
                        isOpen: t,
                        language: l,
                        onCloseCallback: a
                    } = e, r = null !== (n = (0, v.St)("searchQuery")) && void 0 !== n ? n : null, i = m.O.algoliaWebsiteIndex(), s = (0, c.createRef)(), u = (0, c.useCallback)(() => {
                        var e;
                        null === (e = s.current) || void 0 === e || e.focus()
                    }, [s]), d = (0, c.useMemo)(() => {
                        let e = p()(m.O.algoliaAppId(), m.O.algoliaSearchOnlyKey()),
                            n = e.search;
                        return { ...e,
                            search: function() {
                                for (var e = arguments.length, l = Array(e), a = 0; a < e; a++) l[a] = arguments[a];
                                let r = l[0];
                                return r.some(e => {
                                    var n, t;
                                    let l = null !== (t = null === (n = e.params) || void 0 === n ? void 0 : n.query) && void 0 !== t ? t : null;
                                    return (0, x.HD)(l) && l.length > 0
                                }) && t ? n(...l) : Promise.resolve({
                                    results: r.map(() => ({
                                        hits: [],
                                        nbHits: 0,
                                        nbPages: 0,
                                        page: 0,
                                        processingTimeMS: 0,
                                        hitsPerPage: 0,
                                        exhaustiveNbHits: !1,
                                        query: "",
                                        params: ""
                                    }))
                                })
                            }
                        }
                    }, [t]);
                    return (0, o.jsx)(h.p, {
                        future: {
                            preserveSharedStateOnUnmount: !1
                        },
                        indexName: i,
                        initialUiState: {
                            websiteIndexName: {
                                query: r
                            },
                            ZENDESK_INDEX_NAME: {
                                query: r
                            }
                        },
                        insights: !0,
                        searchClient: d,
                        children: (0, o.jsx)(g.SearchModal, {
                            isOpen: t,
                            onCloseCallback: a,
                            searchField: (0, o.jsx)(j, {
                                language: l,
                                searchInputRef: s
                            }),
                            children: (0, o.jsx)(ee, {
                                focusSearchField: u,
                                language: l,
                                onCloseCallback: a,
                                websiteIndexName: i,
                                zendeskIndexName: m.O.algoliaZendeskIndex()
                            })
                        })
                    })
                },
                el = t(52060),
                ea = t(29039),
                er = t(36809),
                ei = function(e) {
                    let {
                        ariaLabel: n,
                        backgroundContext: t,
                        label: l,
                        onClick: a
                    } = e;
                    return (0, o.jsxs)(o.Fragment, {
                        children: [(0, o.jsx)(el.Visibility, {
                            visibility: [!0, !1],
                            children: (0, o.jsx)(Z.Button, {
                                iconLeft: (0, o.jsx)(H._k, {
                                    type: H.Rk.Search,
                                    variant: H.lC.Reversed
                                }),
                                isFullwidth: !0,
                                onClick: a,
                                variant: z.Wu.Ghost,
                                children: l
                            })
                        }), (0, o.jsx)(el.Visibility, {
                            visibility: [!1, !0],
                            children: (0, o.jsx)(ea.$D, {
                                "aria-label": n,
                                iconType: H.Rk.Search,
                                label: l,
                                onClick: a,
                                size: 20,
                                variant: t === er.N.Dark ? ea.of.Reversed : ea.of.Normal
                            })
                        })]
                    })
                },
                es = function(e) {
                    let {
                        ariaLabel: n,
                        backgroundContext: t,
                        label: l,
                        language: a
                    } = e, [r, i] = (0, c.useState)(!1);
                    return (0, o.jsxs)(o.Fragment, {
                        children: [(0, o.jsx)(ei, {
                            ariaLabel: n,
                            backgroundContext: t,
                            label: l,
                            onClick: () => i(!0)
                        }), u.j && (0, o.jsx)(et, {
                            isOpen: r,
                            language: a,
                            onCloseCallback: () => i(!1)
                        })]
                    })
                }
        }
    }
]);
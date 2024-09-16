(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [9008], {
        74652: function(e, t, a) {
            var n = {
                "./de/common.json": 83184,
                "./de/components.json": 42798,
                "./de/templates.json": 23469,
                "./en/common.json": 1807,
                "./en/components.json": 92514,
                "./en/templates.json": 20057
            };

            function i(e) {
                return Promise.resolve().then(function() {
                    if (!a.o(n, e)) {
                        var t = Error("Cannot find module '" + e + "'");
                        throw t.code = "MODULE_NOT_FOUND", t
                    }
                    var i = n[e];
                    return a.t(i, 19)
                })
            }
            i.keys = function() {
                return Object.keys(n)
            }, i.id = 74652, e.exports = i
        },
        22774: function(e, t, a) {
            Promise.resolve().then(a.t.bind(a, 65469, 23)), Promise.resolve().then(a.bind(a, 897)), Promise.resolve().then(a.bind(a, 30697)), Promise.resolve().then(a.bind(a, 16280)), Promise.resolve().then(a.bind(a, 12634)), Promise.resolve().then(a.bind(a, 68744)), Promise.resolve().then(a.bind(a, 22547)), Promise.resolve().then(a.bind(a, 47393)), Promise.resolve().then(a.bind(a, 2846)), Promise.resolve().then(a.bind(a, 29140)), Promise.resolve().then(a.bind(a, 13324)), Promise.resolve().then(a.bind(a, 48455)), Promise.resolve().then(a.bind(a, 77607)), Promise.resolve().then(a.bind(a, 12097)), Promise.resolve().then(a.t.bind(a, 56747, 23)), Promise.resolve().then(a.bind(a, 57320)), Promise.resolve().then(a.bind(a, 10400)), Promise.resolve().then(a.bind(a, 60095)), Promise.resolve().then(a.bind(a, 79492)), Promise.resolve().then(a.bind(a, 37391)), Promise.resolve().then(a.bind(a, 19730)), Promise.resolve().then(a.bind(a, 40081)), Promise.resolve().then(a.bind(a, 58358)), Promise.resolve().then(a.bind(a, 6889)), Promise.resolve().then(a.bind(a, 39252)), Promise.resolve().then(a.bind(a, 52060)), Promise.resolve().then(a.bind(a, 73099)), Promise.resolve().then(a.bind(a, 51410)), Promise.resolve().then(a.bind(a, 94938)), Promise.resolve().then(a.bind(a, 14535)), Promise.resolve().then(a.bind(a, 27404)), Promise.resolve().then(a.bind(a, 20523)), Promise.resolve().then(a.t.bind(a, 15545, 17)), Promise.resolve().then(a.t.bind(a, 79321, 17)), Promise.resolve().then(a.t.bind(a, 72037, 17)), Promise.resolve().then(a.t.bind(a, 78951, 17)), Promise.resolve().then(a.t.bind(a, 74289, 17)), Promise.resolve().then(a.bind(a, 46282)), Promise.resolve().then(a.bind(a, 71500)), Promise.resolve().then(a.bind(a, 81521)), Promise.resolve().then(a.bind(a, 2198)), Promise.resolve().then(a.bind(a, 93113)), Promise.resolve().then(a.bind(a, 4645)), Promise.resolve().then(a.bind(a, 91362)), Promise.resolve().then(a.bind(a, 62040)), Promise.resolve().then(a.bind(a, 60699)), Promise.resolve().then(a.bind(a, 22358)), Promise.resolve().then(a.bind(a, 97533)), Promise.resolve().then(a.bind(a, 25754)), Promise.resolve().then(a.bind(a, 72290)), Promise.resolve().then(a.bind(a, 70936))
        },
        42044: function(e, t, a) {
            "use strict";
            a.d(t, {
                f: function() {
                    return c
                }
            });
            var n = a(27573),
                i = a(45531),
                l = a.n(i);
            a(7653);
            var r = a(48455),
                o = a(17415),
                s = a.n(o);
            let c = e => {
                let {
                    alt: t,
                    aspectRatio: a,
                    bordered: i = !0,
                    caption: o,
                    captionNumber: c,
                    height: d,
                    inline: u,
                    lazyLoading: m,
                    metadata: h,
                    src: _,
                    width: g = [636, 776, 856]
                } = e, p = (0, n.jsx)("span", {
                    className: l()({
                        [s().component]: !0,
                        [s().inline]: u
                    }),
                    children: (0, n.jsx)("span", {
                        className: l()({
                            [s().image]: !0,
                            [s().bordered]: i
                        }),
                        children: (0, n.jsx)(r.default, {
                            alt: t,
                            aspectRatio: a,
                            height: d,
                            lazyLoading: m,
                            metadata: h,
                            src: _,
                            width: g
                        })
                    })
                });
                return (o && (p = (0, n.jsxs)("figure", {
                    className: s().figure,
                    children: [p, (0, n.jsxs)("figcaption", {
                        className: s().figCaption,
                        children: [c && (0, n.jsxs)("strong", {
                            className: s().figNumber,
                            children: ["Figure ", c, ":"]
                        }), " ", o]
                    })]
                })), u) ? p : (0, n.jsx)("div", {
                    className: "typo-block",
                    children: p
                })
            }
        },
        83730: function(e, t, a) {
            "use strict";
            a.d(t, {
                z: function() {
                    return c
                }
            });
            var n = a(27573),
                i = a(45531),
                l = a.n(i);
            a(7653);
            var r = a(82317),
                o = a(18757),
                s = a.n(o);
            let c = e => {
                let {
                    ariaLabel: t,
                    children: a,
                    href: i = null,
                    isCurrent: o,
                    onClick: c
                } = e;
                return null === i ? (0, n.jsx)("button", {
                    "aria-current": o,
                    "aria-label": t,
                    className: l()({
                        [s().component]: !0,
                        [s().isSelected]: o
                    }),
                    onClick: c,
                    children: a
                }) : (0, n.jsx)(r.l, {
                    "aria-current": o,
                    "aria-label": t,
                    className: l()({
                        [s().component]: !0,
                        [s().isSelected]: o
                    }),
                    href: i,
                    scroll: !1,
                    children: a
                })
            }
        },
        31657: function(e, t, a) {
            "use strict";
            a.d(t, {
                S: function() {
                    return d
                }
            });
            var n = a(27573),
                i = a(45531),
                l = a.n(i);
            a(7653);
            var r = a(25118),
                o = a(58832),
                s = a(44748),
                c = a.n(s);
            let d = e => {
                let {
                    ariaLabel: t,
                    children: a,
                    hasGaps: i = !0,
                    label: s
                } = e, d = (0, r.Z)(a).filter(o.Dw);
                return (0, n.jsxs)("nav", {
                    "aria-label": t,
                    className: l()({
                        [c().component]: !0,
                        [c().hasGaps]: i
                    }),
                    role: "navigation",
                    children: [s && (0, n.jsx)("span", {
                        className: c().label,
                        children: s
                    }), (0, n.jsx)("ul", {
                        className: c().list,
                        children: d.map((e, t) => (0, n.jsx)("li", {
                            className: c().item,
                            children: e
                        }, `filter-buttons-group-button-${t}`))
                    })]
                })
            }
        },
        97365: function(e, t, a) {
            "use strict";
            a.d(t, {
                I: function() {
                    return s
                }
            });
            var n = a(27573);
            a(7653);
            var i = a(70841),
                l = a(95770),
                r = a(67461),
                o = a(23845);
            let s = e => {
                let {
                    anchor: t = null,
                    backgroundColor: a,
                    blurb: s,
                    children: c,
                    decorationVariant: d = o.Uz.None,
                    filter: u,
                    leadingCtaElement: m,
                    title: h,
                    titleBadge: _,
                    trailingCtaElement: g
                } = e, p = a === r.YI.TertiaryStone || a === r.YI.GradientGreen || a === r.YI.AuxiliaryWhite, v = a === r.YI.AuxiliaryDarkCyan ? r.YI.AuxiliaryLightCyan : p ? r.YI.AuxiliaryLightGreen : r.YI.AuxiliaryNeutralBlue;
                return (0, n.jsx)(o.N, {
                    anchor: null != t ? t : "",
                    backgroundColor: a,
                    blurb: s,
                    decorationVariant: d,
                    filter: u,
                    gaps: o.tj.Large,
                    heading: h && null !== h ? (0, n.jsx)(i.X6, {
                        badge: _ && (0, n.jsx)(l.B, {
                            backgroundColor: v,
                            isWider: !0,
                            children: _
                        }),
                        level: i.y5.H2,
                        title: h
                    }) : void 0,
                    leadingCtaElement: m,
                    trailingCtaElement: g,
                    children: c
                })
            }
        },
        23845: function(e, t, a) {
            "use strict";
            a.d(t, {
                N: function() {
                    return _
                },
                Uz: function() {
                    return l
                },
                tj: function() {
                    return r
                }
            });
            var n, i, l, r, o = a(27573),
                s = a(45531),
                c = a.n(s);
            a(7653);
            var d = a(39666),
                u = a(67461),
                m = a(16312),
                h = a.n(m);
            (n = l || (l = {})).None = "none", n.LeftPuzzle = "left-puzzle", n.LeftStar = "left-star", n.RightPuzzle = "right-puzzle", n.RightStar = "right-star", n.PurpleBubbles = "purple-bubbles", n.OrangeBubbles = "orange-bubble", n.TwoBubbles = "two-bubbles", n.ThreeBubbles = "three-bubbles", n.ThreeLeftRightBottomBubbles = "three-left-right-bottom-bubbles", (i = r || (r = {})).NoGap = "no-gap", i.Small = "small", i.Medium = "medium", i.Large = "large";
            let _ = e => {
                let {
                    anchor: t = null,
                    backgroundColor: a = null,
                    backgroundImage: n,
                    blurb: i,
                    children: l,
                    decorationVariant: r = "none",
                    filter: s,
                    gaps: m = "no-gap",
                    heading: _,
                    isSticky: g = !1,
                    leadingCtaElement: p,
                    trailingCtaElement: v
                } = e, x = null !== a && (0, u.jn)(a), b = a === u.YI.GradientLimeTurquoiseDeepPurple, f = "two-bubbles" === r || "three-bubbles" === r || "three-left-right-bottom-bubbles" === r;
                return (0, o.jsxs)("section", {
                    className: c()({
                        [h().component]: !0,
                        [h().hasHeading]: _,
                        [h().hasNoHeading]: !_,
                        [h().hasBackgroundImage]: !!n,
                        [h().isDark]: x,
                        [h().isSticky]: g,
                        [h().isLight]: !x,
                        [h().hasSmallGap]: "small" === m,
                        [h().hasMediumGap]: "medium" === m,
                        [h().hasLargeGap]: "large" === m,
                        [h().hasNoBackground]: !a || a === u.YI.AuxiliaryWhite,
                        [h().hasGradientLimeTurquoiseDeepPurple]: a === u.YI.GradientLimeTurquoiseDeepPurple,
                        [h().hasGradientGreen]: a === u.YI.GradientGreen,
                        [h().hasLeftPuzzleDecoration]: "left-puzzle" === r,
                        [h().hasLeftStarDecoration]: "left-star" === r,
                        [h().hasRightStarDecoration]: "right-star" === r,
                        [h().hasRightPuzzleDecoration]: "right-puzzle" === r,
                        [h().hasPurpleBubblesDecoration]: "purple-bubbles" === r
                    }),
                    id: null != t ? t : void 0,
                    style: {
                        "--bg": a && !b ? (0, u.Lq)(a) : void 0,
                        backgroundImage: n ? `url(${n})` : void 0
                    },
                    children: [f && (0, o.jsxs)("div", {
                        className: c()({
                            [h().ellipses]: !0,
                            [h().hasCyanBgColor]: a === u.YI.AuxiliaryDarkCyan,
                            [h().hasStoneBgColor]: a === u.YI.TertiaryStone,
                            [h().hasGradientGreenBgColor]: a === u.YI.GradientGreen,
                            [h().hasPluralBgColor]: a === u.YI.PrimaryPurple
                        }),
                        children: [f && (0, o.jsx)("div", {
                            className: h().ellipsesTop
                        }), ("two-bubbles" === r || "three-bubbles" === r || "three-left-right-bottom-bubbles" === r) && (0, o.jsx)("div", {
                            className: h().ellipsesRight
                        }), "three-bubbles" === r && (0, o.jsx)("div", {
                            className: h().ellipsesBottomLeft
                        }), "three-left-right-bottom-bubbles" === r && (0, o.jsx)("div", {
                            className: h().ellipsesBottomRight
                        })]
                    }), (0, o.jsxs)("div", {
                        className: h().container,
                        children: [_ && (0, o.jsx)("div", {
                            className: h().heading,
                            children: _
                        }), i && (0, o.jsx)("div", {
                            className: h().blurb,
                            children: (0, o.jsx)(d.H, {
                                children: i
                            })
                        }), p && (0, o.jsx)("div", {
                            className: h().ctaElement,
                            children: p
                        }), s && (0, o.jsx)("div", {
                            className: h().content,
                            children: s
                        }), l && (0, o.jsx)("div", {
                            className: h().content,
                            children: l
                        }), v && (0, o.jsx)("div", {
                            className: h().ctaElement,
                            children: v
                        })]
                    })]
                })
            }
        },
        8292: function(e, t, a) {
            "use strict";
            a.d(t, {
                K: function() {
                    return l
                }
            });
            var n = a(27573);
            a(7653);
            var i = a(15932);
            let l = e => {
                let {
                    children: t,
                    gapSize: a = i.xz.Medium,
                    hasDivider: l
                } = e;
                return (0, n.jsx)(i.aV, {
                    gapSize: a,
                    hasDivider: l,
                    semanticRole: !1,
                    children: t
                })
            }
        },
        70841: function(e, t, a) {
            "use strict";
            a.d(t, {
                X6: function() {
                    return h
                },
                y5: function() {
                    return r
                }
            });
            var n, i, l, r, o = a(27573),
                s = a(45531),
                c = a.n(s);
            a(7653);
            var d = a(82317),
                u = a(67417),
                m = a.n(u);
            (n = l || (l = {})).Always = "always", n.Never = "never", n.OnMobiles = "small-only", n.OnMobilesAndTablets = "medium-and-small", (i = r || (r = {})).H1 = "h1", i.H2 = "h2", i.H3 = "h3", i.H4 = "h4";
            let h = e => {
                let {
                    badge: t,
                    centerAlignment: a = "never",
                    headline: n,
                    icon: i,
                    level: l = "h1",
                    subtitle: r,
                    title: s,
                    titleHref: u
                } = e;
                return (0, o.jsxs)("div", {
                    className: c()({
                        [m().component]: !0,
                        [m().centeredOnSmall]: "always" === a || "small-only" === a || "medium-and-small" === a,
                        [m().centeredOnMedium]: "always" === a || "medium-and-small" === a,
                        [m().centeredOnLarge]: "always" === a,
                        [m().isLarge]: "h1" === l,
                        [m().isSmall]: "h2" === l,
                        [m().isXSmall]: "h3" === l,
                        [m().isXXSmall]: "h4" === l
                    }),
                    children: [t && (0, o.jsx)("div", {
                        className: m().badge,
                        children: t
                    }), n && (0, o.jsx)("div", {
                        className: m().headline,
                        children: n
                    }), (0, o.jsxs)(l, {
                        className: m().title,
                        children: [u && (0, o.jsxs)(d.l, {
                            href: u,
                            children: [i && (0, o.jsx)("span", {
                                className: m().icon,
                                children: i
                            }), s]
                        }), !u && (0, o.jsxs)(o.Fragment, {
                            children: [i && (0, o.jsx)("span", {
                                className: m().icon,
                                children: i
                            }), s]
                        })]
                    }), r && (0, o.jsx)({
                        h1: "h2",
                        h2: "h3",
                        h3: "h4",
                        h4: "h5"
                    }[l], {
                        className: m().subtitle,
                        children: r
                    })]
                })
            }
        },
        95770: function(e, t, a) {
            "use strict";
            a.d(t, {
                B: function() {
                    return u
                }
            });
            var n, i, l = a(27573),
                r = a(45531),
                o = a.n(r);
            a(7653);
            var s = a(67461),
                c = a(18891),
                d = a.n(c);
            (n = i || (i = {})).PatternA = "a", n.PatternB = "b";
            let u = e => {
                let {
                    backgroundColor: t,
                    children: a,
                    color: n,
                    isWider: i = !1,
                    patternVariant: r = "a"
                } = e, c = (0, s.jn)(t);
                return t === s.YI.SecondaryTurquoise && (c = !0), (0, l.jsx)("strong", {
                    className: o()({
                        [d().component]: !0,
                        [d().isDark]: c,
                        [d().isLight]: !c,
                        [d().isWider]: i,
                        [d().hasPatternA]: "a" === r,
                        [d().hasPatternB]: "b" === r
                    }),
                    style: {
                        "--bg": (0, s.Lq)(t),
                        color: n ? (0, s.Lq)(n) : void 0
                    },
                    children: a
                })
            }
        },
        74925: function(e, t, a) {
            "use strict";

            function n() {
                let e = new Intl.DateTimeFormat().resolvedOptions().timeZone;
                return "Etc/Unknown" === e ? "America/New_York" : e
            }
            a.d(t, {
                u: function() {
                    return n
                }
            })
        },
        25754: function(e, t, a) {
            "use strict";
            a.d(t, {
                default: function() {
                    return z
                }
            });
            var n, i, l = a(27573),
                r = a(7653),
                o = a(45531),
                s = a.n(o),
                c = a(22547),
                d = a(6074),
                u = a(29194),
                m = a(48455),
                h = a(60580),
                _ = a(67461),
                g = a(85312),
                p = a(66504),
                v = a.n(p);
            (n = i || (i = {})).Session = "session", n.Break = "break";
            let x = e => {
                let {
                    "aria-label": t,
                    authors: a,
                    backgroundColor: n = _.YI.AuxiliaryWhite,
                    blurb: i,
                    ctaButton: r,
                    day: o,
                    stage: p,
                    time: x,
                    title: b,
                    type: f
                } = e, j = (0, h.G)("agenda-card-description"), k = n === _.YI.AuxiliaryWhite, B = n === _.YI.SecondaryTurquoise, N = n === _.YI.AuxiliaryNeutralBlue, S = n === _.YI.SecondaryAccentGold, L = n === _.YI.AuxiliaryLightGreen;
                return (0, l.jsxs)("div", {
                    "aria-label": t,
                    className: s()({
                        [v().component]: !0,
                        [v().hasReversedLook]: k,
                        [v().hasTurquoiseBgColor]: B,
                        [v().hasBlueBgColor]: N,
                        [v().hasGoldBgColor]: S,
                        [v().hasGreenBgColor]: L,
                        [v().isBreak]: "break" === f,
                        [v().alignTimeEnd]: void 0 === r
                    }),
                    children: [(0, l.jsx)("div", {
                        className: v().title,
                        children: b
                    }), i && (0, l.jsx)("div", {
                        className: v().blurb,
                        children: i
                    }), "session" === f && (0, l.jsx)("div", {
                        className: v().authors,
                        children: a.map((e, t) => (0, l.jsxs)("div", {
                            className: v().author,
                            children: [(0, l.jsx)("div", {
                                "aria-hidden": "true",
                                className: v().image,
                                children: (0, l.jsx)(m.default, {
                                    height: 48,
                                    metadata: e.image.metadata,
                                    src: e.image.src,
                                    width: [48]
                                })
                            }), (0, l.jsxs)("div", {
                                children: [(0, l.jsx)("div", {
                                    className: v().authorName,
                                    children: e.name
                                }), (0, l.jsx)("div", {
                                    className: v().authorTitle,
                                    children: e.title
                                })]
                            })]
                        }, `author-card-${t}-${(0,g.h)(e.name)}`))
                    }), (0, l.jsxs)("div", {
                        className: v().footer,
                        children: [r && (0, l.jsx)("div", {
                            "aria-hidden": !0,
                            className: v().cta,
                            id: j,
                            children: (0, l.jsx)(c.Button, {
                                href: r.href,
                                iconRight: (0, l.jsx)(d.e, {
                                    type: d.f.RightBlack
                                }),
                                size: u.qE.Small,
                                variant: u.Wu.Outline,
                                children: r.label
                            })
                        }), (0, l.jsxs)("div", {
                            className: v().time,
                            children: [(0, l.jsx)("div", {
                                children: o
                            }), (0, l.jsx)("div", {
                                children: x
                            }), (0, l.jsx)("div", {
                                children: p
                            })]
                        })]
                    })]
                })
            };
            var b = a(97365),
                f = a(8292),
                j = a(15932),
                k = a(31657),
                B = a(83730),
                N = a(72215),
                S = a(58732),
                L = a.n(S);

            function y(e) {
                return 60 * e * 1e3
            }
            var C = a(47080),
                w = a.n(C);

            function P(e) {
                var t, a, n;
                let {
                    backgroundColor: i,
                    events: o,
                    expandFirstTrack: c = !0,
                    highlightedTime: d,
                    locale: u,
                    pixelsPerHour: m = 180,
                    timeZone: h,
                    timelineInterval: g = y(30),
                    tracks: p
                } = e, [v, x] = (0, r.useState)(p[0].id), [b, f] = (0, r.useMemo)(() => {
                    let e = Number.MAX_VALUE,
                        t = Number.MIN_VALUE;
                    for (let a of o) e = Math.min(e, a.start.getTime()), t = Math.max(t, a.end.getTime());
                    return [new Date(e), new Date(t)]
                }, [o]), j = f.getTime() - b.getTime(), S = L()(Math.ceil(j / y(5)) + 1, e => y(5 * e));
                return (0, l.jsxs)("div", {
                    className: s()({
                        [w().component]: !0,
                        [w().isBgBlack]: i === _.YI.AuxiliaryBlack
                    }),
                    children: [p.length > 1 && (0, l.jsx)("div", {
                        className: w().trackFilters,
                        children: (0, l.jsx)(k.S, {
                            ariaLabel: "",
                            hasGaps: !1,
                            children: p.map(e => (0, l.jsx)(B.z, {
                                isCurrent: e.id === v,
                                onClick: () => x(e.id),
                                children: e.title
                            }, e.id))
                        })
                    }), (0, l.jsxs)("div", {
                        className: s()({
                            [w().grid]: !0,
                            [w().isFirstTrackVisible]: v === (null === (t = p[0]) || void 0 === t ? void 0 : t.id),
                            [w().isSecondTrackVisible]: v === (null === (a = p[1]) || void 0 === a ? void 0 : a.id),
                            [w().isThirdTrackVisible]: v === (null === (n = p[2]) || void 0 === n ? void 0 : n.id)
                        }),
                        style: {
                            "--tracks": p.length,
                            "--pixels-per-hour": `${m}px`,
                            "--five-minutes-intervals": S.length
                        },
                        children: [S.map((e, t) => {
                            let a = new Date(b.getTime() + e).toLocaleTimeString(u, {
                                    timeZone: h,
                                    hour: "2-digit",
                                    minute: "2-digit"
                                }),
                                n = t === S.length - 1,
                                i = null,
                                r = null;
                            if (1 === p.length && (i = o.find(e => {
                                    let t = new Date(e.start).toLocaleTimeString(u, {
                                            timeZone: h,
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        }),
                                        i = new Date(e.end).toLocaleTimeString(u, {
                                            timeZone: h,
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        }),
                                        l = !o.some(t => t.start.getTime() === e.end.getTime() && e !== t) && i === a;
                                    if (l && !n) {
                                        let t = o.filter(t => t.start.getTime() > e.end.getTime());
                                        t.length > 0 && (r = Math.min(...t.map(e => e.start.getTime())))
                                    }
                                    return t === a || l ? e : null
                                })), p.length > 1 && e % g != 0 && !n || !i && !n && 1 === p.length) return null;
                            let s = g / y(5);
                            return 1 === p.length && i && (s = (i.end.getTime() - i.start.getTime()) / y(5), r && !n && (s = (r - i.end.getTime()) / y(5))), (0, l.jsx)("span", {
                                "aria-hidden": !0,
                                className: w().timelineItem,
                                style: {
                                    gridRow: n ? void 0 : `${t+1} / span ${s}`
                                },
                                children: (0, l.jsx)("span", {
                                    className: w().timelineLabel,
                                    children: a
                                })
                            }, e)
                        }), o.map((e, t) => {
                            let a = !1,
                                n = null !== e.trackId,
                                i = p.findIndex(t => t.id === e.trackId),
                                r = Math.round((e.start.getTime() - b.getTime()) / y(5) + 1),
                                u = Math.round((e.end.getTime() - e.start.getTime()) / y(5)),
                                m = n ? "span 1" : "span 2";
                            if (c && 0 === i || !1 === n) try {
                                let t = o.some(t => e !== t && (0, N.i)(e, t));
                                !1 === t && (m = "-1")
                            } catch (e) {
                                a = !0
                            }
                            return !a && (0, l.jsx)("div", {
                                className: s()({
                                    [w().slot]: !0,
                                    [w().firstTrack]: 0 === i,
                                    [w().secondTrack]: 1 === i,
                                    [w().thirdTrack]: 2 === i,
                                    [w().isPast]: d && d.getTime() >= e.end.getTime()
                                }),
                                style: {
                                    "--column-start": n ? i + 2 : 2,
                                    "--column-end": m,
                                    "--row-start": r,
                                    "--row-end": `span ${u}`
                                },
                                children: e.children
                            }, `event-${t}`)
                        })]
                    })]
                })
            }
            var T = a(74925),
                A = a(26918);

            function D(e, t, a) {
                return e.toLocaleDateString(a, {
                    timeZone: t
                })
            }

            function I(e, t, a) {
                return e.toLocaleTimeString(a, {
                    timeZone: t,
                    hour: "2-digit",
                    minute: "2-digit"
                })
            }
            var z = e => {
                let {
                    agenda: t,
                    backgroundColor: a,
                    blurb: n,
                    language: o,
                    timeZone: s,
                    title: c
                } = e, {
                    t: d
                } = (0, A.E)(o, ["common"]), [u, m] = (0, r.useState)([]), [h, _] = (0, r.useState)([]), [p, v] = (0, r.useState)(0), [N, S] = (0, r.useState)([]), L = (0, T.u)(), y = "virtual" === s ? L : s, C = new Intl.DateTimeFormat().resolvedOptions().locale;
                return ((0, r.useEffect)(() => {
                    if (N.length > 0) return;
                    let e = [],
                        a = new Date,
                        n = new Date;
                    n.setDate(n.getDate() - 1);
                    let i = new Date;
                    i.setDate(i.getDate() + 1), t.forEach((t, l) => {
                        let r = D(new Date(t.stages[0].sessions[0].dateFrom), y, C);
                        D(a, y, C) === r ? (e.push(d("common.date.today", {
                            ns: "common"
                        })), v(l)) : D(n, y, C) === r ? e.push(d("common.date.yesterday", {
                            ns: "common"
                        })) : D(i, y, C) === r ? e.push(d("common.date.tomorrow", {
                            ns: "common"
                        })) : e.push(r)
                    }), S(e)
                }, [t, N.length, y, d, C]), (0, r.useEffect)(() => {
                    let e = [],
                        a = [];
                    t[p].stages.forEach(n => {
                        let r = n.stage.toLowerCase().replace(" ", "-");
                        e.push({
                            id: r,
                            title: n.stage
                        }), n.sessions.forEach(e => {
                            var o, s;
                            let c = I(new Date(e.dateFrom), y, C),
                                d = I(new Date(e.dateTo), y, C),
                                u = new Date(e.dateFrom).toLocaleDateString(C, {
                                    timeZone: y,
                                    month: "long",
                                    day: "numeric"
                                }),
                                m = {
                                    children: (0, l.jsx)(x, {
                                        "aria-label": "",
                                        authors: e.speakers ? e.speakers.map(e => {
                                            var t;
                                            return {
                                                name: e.name,
                                                image: e.photo,
                                                title: [e.title, null === (t = e.organization) || void 0 === t ? void 0 : t.name].filter(e => e).join(", ")
                                            }
                                        }) : [],
                                        backgroundColor: null !== (o = n.backgroundColor) && void 0 !== o ? o : void 0,
                                        blurb: e.blurb,
                                        day: u,
                                        stage: (null !== (s = e.break) && void 0 !== s ? s : t[p].stages.length < 2) ? "" : n.stage,
                                        time: `${c} - ${d}`,
                                        title: e.title,
                                        type: e.break ? i.Break : i.Session
                                    }),
                                    start: new Date(e.dateFrom),
                                    end: new Date(e.dateTo),
                                    trackId: e.break ? null : r
                                };
                            a.push(m)
                        })
                    }), _(e), m(a)
                }, [p, t, u.length, y, o, C]), 0 === u.length) ? null : (0, l.jsx)(b.I, {
                    anchor: (0, g.h)(c),
                    backgroundColor: a,
                    blurb: n,
                    filter: (0, l.jsx)(f.K, {
                        gapSize: j.xz.Medium,
                        children: t.length > 1 && (0, l.jsx)(k.S, {
                            ariaLabel: "Filter agenda by day",
                            hasGaps: !1,
                            children: t.map((e, t) => (0, l.jsx)(B.z, {
                                isCurrent: p === t,
                                onClick: () => v(t),
                                children: N[t]
                            }, `agenda-filter-${t}`))
                        })
                    }),
                    title: c,
                    children: (0, l.jsx)(P, {
                        events: u,
                        highlightedTime: new Date,
                        locale: C,
                        timeZone: y,
                        tracks: h
                    })
                })
            }
        },
        72290: function(e, t, a) {
            "use strict";
            a.d(t, {
                default: function() {
                    return tE
                }
            });
            var n, i, l, r, o, s, c, d, u = a(27573),
                m = a(97365),
                h = a(8292),
                _ = a(15932),
                g = a(31657),
                p = a(83730),
                v = a(11946),
                x = a(45531),
                b = a.n(x),
                f = a(7653),
                j = a(48455),
                k = a(82317),
                B = a(36809),
                N = a(58832),
                S = a(67461),
                L = a(85312),
                y = a(15757),
                C = a.n(y);
            let w = e => {
                let {
                    "aria-label": t,
                    backgroundColor: a,
                    backgroundContext: n = B.N.Dark,
                    href: i,
                    images: l,
                    persons: r,
                    title: o
                } = e, s = !!i && (0, N.Bm)(i), c = a === S.YI.AuxiliaryBlack || n !== B.N.Light;
                return (0, u.jsxs)("div", {
                    "aria-label": t,
                    className: b()({
                        [C().component]: !0,
                        [C().hasReversedLook]: c
                    }),
                    "data-hoverable": i ? "true" : void 0,
                    children: [(0, u.jsx)("div", {
                        className: b()({
                            [C().images]: !0,
                            [C().hasNoImage]: 0 === l.length
                        }),
                        children: l.map((e, t) => (0, u.jsx)("div", {
                            "aria-hidden": "true",
                            className: C().image,
                            children: (0, u.jsx)(j.default, {
                                height: 220,
                                metadata: e.metadata,
                                src: e.src,
                                width: [580]
                            })
                        }, `person-card-${t}`))
                    }), (0, u.jsxs)("div", {
                        className: C().textContainer,
                        children: [r.map((e, t) => (0, u.jsxs)("div", {
                            className: C().person,
                            children: [(0, u.jsx)(k.l, {
                                className: C().linkPerson,
                                href: e.href,
                                title: e.name,
                                children: e.name
                            }), e.organization && (0, u.jsx)("div", {
                                children: e.organization
                            })]
                        }, `person-card-${t}-${(0,L.h)(e.name)}`)), (0, u.jsx)("div", {
                            className: C().title,
                            children: i ? (0, u.jsx)(k.l, {
                                className: C().link,
                                href: i,
                                rel: s ? "noopener" : void 0,
                                target: s ? "_blank" : void 0,
                                title: o,
                                children: o
                            }) : (0, u.jsx)(u.Fragment, {
                                children: o
                            })
                        })]
                    })]
                })
            };
            var P = a(61427),
                T = a.n(P),
                A = a(93749),
                D = a.n(A);

            function I() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                return e.map(e => {
                    if (Array.isArray(e.children)) return e.children.map(e => "text" in e ? e.text : I([e])).join("");
                    if ("content.basicIcon" === e._type || "content.colorfulIcon" === e._type) return `[${D()(e,"icon")}]`;
                    if ("content.codeBlock" === e._type) return T()
                    `
					\`\`\`
					${D()(e,"code")}
					\`\`\`
				`;
                    if ("content.highlightBox" === e._type) return "title" in e && (0, N.HD)(e.title) ? T()
                    `
						${e.title}

						${I(D()(e,"content"))}
					`: I(D()(e, "content"));
                    if ("content.quote" === e._type) {
                        let t = D()(e, "quote"),
                            a = (0, N.HD)(t) ? t : I(t);
                        return T()
                        `
					${a}
					-${D()(e,"author.name")}
				`
                    }
                    return ""
                }).join("\n\n")
            }

            function z(e) {
                return null !== e && "" !== I(e).trim()
            }
            var G = a(281),
                M = a(48567),
                R = e => {
                    let {
                        value: t
                    } = e, {
                        icon: a = null
                    } = null != t ? t : {};
                    return (0, M.gM)(a) ? (0, u.jsx)(M._k, {
                        size: 24,
                        type: a
                    }) : null
                },
                E = a(39666),
                q = a(22547),
                H = a(6074),
                F = a(29194),
                Q = a(60580),
                Y = a(52961),
                $ = a.n(Y);
            let W = e => {
                var t;
                let {
                    button: a = null,
                    children: n,
                    title: i
                } = e, l = (0, Q.G)("linked-in-box-label"), r = (0, Q.G)("linked-in-box-description");
                return (0, u.jsx)("section", {
                    "aria-describedby": r,
                    "aria-labelledby": l,
                    className: b()({
                        [$().component]: !0,
                        "typo-block": !0
                    }),
                    children: (0, u.jsxs)("div", {
                        className: $().container,
                        children: [(0, u.jsx)("div", {
                            "aria-hidden": !0,
                            className: $().title,
                            id: l,
                            children: i
                        }), (0, u.jsxs)("div", {
                            id: r,
                            children: [n && (0, u.jsx)("div", {
                                className: $().text,
                                children: (0, u.jsx)(E.H, {
                                    children: n
                                })
                            }), null !== a && (0, u.jsx)("div", {
                                className: $().button,
                                children: (0, u.jsx)(q.Button, {
                                    href: a.href,
                                    iconLeft: (0, u.jsx)(H.e, {
                                        type: H.f.RightInBlackCircle
                                    }),
                                    size: [F.qE.Medium, F.qE.Large],
                                    variant: F.Wu.Neutral,
                                    children: null !== (t = a.label) && void 0 !== t ? t : "Learn more"
                                })
                            })]
                        })]
                    })
                })
            };
            var V = e => {
                    let {
                        language: t,
                        value: {
                            button: a,
                            description: n,
                            title: i
                        }
                    } = e;
                    return (0, u.jsx)(W, {
                        button: a,
                        title: i,
                        children: (0, u.jsx)(tM, {
                            content: n,
                            language: t
                        })
                    })
                },
                O = a(89532),
                U = a.n(O);
            let X = e => {
                let {
                    actionElement: t,
                    children: a,
                    title: n
                } = e, i = (0, Q.G)("call-to-action-label"), l = (0, Q.G)("call-to-action-description");
                return (0, u.jsxs)("section", {
                    "aria-describedby": l,
                    "aria-labelledby": i,
                    className: b()({
                        [U().component]: !0,
                        "typo-block": !0
                    }),
                    children: [(0, u.jsx)("div", {
                        "aria-hidden": !0,
                        className: U().title,
                        id: i,
                        children: n
                    }), (0, u.jsxs)("div", {
                        id: l,
                        children: [a && (0, u.jsx)("div", {
                            className: U().text,
                            children: (0, u.jsx)(E.H, {
                                children: a
                            })
                        }), (0, u.jsx)("div", {
                            className: U().form,
                            children: t
                        })]
                    })]
                })
            };
            var Z = a(81521),
                K = a(32124),
                J = a(97104),
                ee = a(950),
                et = a(23579),
                ea = a(65474),
                en = a(34666),
                ei = a(55315);
            async function el(e, t) {
                let n = (0, et.Fs)();
                await n.use(en.D).use((0, ea.Z)(async (e, t) => (await a(74652)(`./${e}/${t}.json`)).default)).init((0, ei.w)(e, t));
                let i = Array.isArray(t) ? t[0] : t;
                return {
                    t: n.getFixedT(e, i),
                    i18n: n
                }
            }
            async function er(e) {
                var t;
                let {
                    buttonLabel: a,
                    inlineFlow: n = [!1, !0],
                    language: i,
                    small: l = !1,
                    testId: r
                } = e, {
                    t: o
                } = await el(i, "components"), s = (0, ee.Q8)(i, {
                    [ee.SQ.English]: "/get-started/",
                    [ee.SQ.German]: "/de/jetzt-loslegen/"
                });
                return (0, u.jsxs)("form", {
                    action: s,
                    "data-testid": r,
                    method: "GET",
                    noValidate: !0,
                    children: [(0, u.jsx)("input", {
                        name: "tab",
                        type: "hidden",
                        value: "demo"
                    }), (0, u.jsx)(K.W, {
                        button: (0, u.jsx)(q.Button, {
                            isFullwidth: !0,
                            size: l ? F.qE.Medium : [F.qE.Medium, F.qE.Large],
                            type: F.L$.Submit,
                            variant: F.Wu.Highlight,
                            children: null != a ? a : o("GetDemoForm.button.get_started.label")
                        }),
                        field: (0, u.jsx)(J.U, {
                            name: "email",
                            placeholder: null !== (t = o("GetDemoForm.input.email.placeholder")) && void 0 !== t ? t : "",
                            size: l ? J.r.Medium : [J.r.Medium, J.r.Large],
                            type: "email"
                        }),
                        inlineFlow: n
                    })]
                })
            }
            var eo = a(4645);
            async function es(e) {
                let t;
                let {
                    language: a,
                    value: {
                        action: n,
                        button: i = null,
                        buttonLabel: l = null,
                        description: r,
                        gatedForm: o,
                        title: s
                    }
                } = e, {
                    t: c
                } = await el(a, "common");
                switch (n) {
                    case "demo":
                        t = (0, u.jsx)(er, {
                            buttonLabel: l,
                            language: a,
                            testId: "box-get-demo-form"
                        });
                        break;
                    case "trial":
                        t = (0, u.jsx)(eo.GetTrialForm, {
                            backgroundContext: B.N.Dark,
                            buttonLabel: l,
                            language: a
                        });
                        break;
                    case "button":
                        var d;
                        t = (0, u.jsx)(q.Button, {
                            href: i.href,
                            size: F.qE.Large,
                            variant: F.Wu.Highlight,
                            children: null !== (d = i.label) && void 0 !== d ? d : c("common.learn_more")
                        });
                        break;
                    case "form":
                        t = o && l ? (0, u.jsx)(Z.default, {
                            buttonLabel: l,
                            gatedForm: o,
                            language: a
                        }) : null;
                        break;
                    default:
                        t = null
                }
                return (0, u.jsx)(X, {
                    actionElement: t,
                    title: s,
                    children: r
                })
            }
            var ec = a(22335);
            a(78063), a(89025), a(8269), a(21500), a(82177);
            var ed = a(39014);
            a(42686);
            var eu = a(11600),
                em = a.n(eu);
            (n = o || (o = {})).Negative = "negative", n.Neutral = "neutral", n.Positive = "positive", (i = s || (s = {})).json = "json", i.javascript = "javascript", i.css = "css", i.markup = "markup", i.http = "http";
            let eh = e => {
                let t;
                let {
                    ariaLabel: a,
                    code: n,
                    codeLanguage: i = "markup",
                    variant: l = "neutral"
                } = e;
                "positive" === l ? t = ed.MA.GoodExample : "negative" === l && (t = ed.MA.BadExample);
                let r = (0, ec.highlight)(null != n ? n : "", ec.languages[i], i);
                return (0, u.jsxs)("div", {
                    "aria-label": a,
                    className: b()({
                        [em().component]: !0,
                        "typo-block": !0,
                        [em().isPositive]: "positive" === l,
                        [em().isNegative]: "negative" === l
                    }),
                    children: [t && (0, u.jsx)("div", {
                        "aria-hidden": !0,
                        className: em().icon,
                        children: (0, u.jsx)(ed.d0, {
                            size: 64,
                            type: t
                        })
                    }), (0, u.jsx)("pre", {
                        className: em().preformattedText,
                        children: (0, u.jsx)("code", {
                            className: `language-${i}`,
                            children: (0, u.jsx)("div", {
                                dangerouslySetInnerHTML: {
                                    __html: r
                                }
                            })
                        })
                    })]
                })
            };
            async function e_(e) {
                let {
                    language: t,
                    value: {
                        code: a,
                        codeLanguage: n,
                        variant: i
                    }
                } = e, {
                    t: l
                } = await el(t, "common");
                return (0, u.jsx)(eh, {
                    ariaLabel: l("common.content.codeBlock.ariaLabel"),
                    code: a,
                    codeLanguage: null != n ? n : void 0,
                    variant: i
                })
            }
            var eg = a(92883),
                ep = a.n(eg);
            let ev = e => {
                let {
                    children: t
                } = e;
                return (0, u.jsx)("code", {
                    className: ep().component,
                    children: t
                })
            };
            var ex = e => {
                    let {
                        children: t
                    } = e;
                    return (0, u.jsx)(ev, {
                        children: t
                    })
                },
                eb = e => {
                    let {
                        value: t
                    } = e, {
                        icon: a = null
                    } = null != t ? t : {};
                    return (0, ed.IP)(a) ? (0, u.jsx)(ed.d0, {
                        size: 24,
                        type: a
                    }) : null
                },
                ef = a(75929),
                ej = a.n(ef);
            let ek = e => {
                let {
                    actionElement: t,
                    note: a,
                    title: n
                } = e, i = (0, Q.G)("dispatch-box-label"), l = (0, Q.G)("dispatch-box-description");
                return (0, u.jsx)("section", {
                    "aria-describedby": l,
                    "aria-labelledby": i,
                    className: b()({
                        [ej().component]: !0,
                        "typo-block": !0
                    }),
                    children: (0, u.jsxs)("div", {
                        className: ej().container,
                        children: [(0, u.jsx)("div", {
                            "aria-hidden": !0,
                            className: ej().title,
                            id: i,
                            children: n
                        }), (0, u.jsxs)("div", {
                            id: l,
                            children: [(0, u.jsx)("div", {
                                className: ej().form,
                                children: t
                            }), a && (0, u.jsx)("div", {
                                className: ej().note,
                                children: (0, u.jsx)(E.H, {
                                    children: a
                                })
                            })]
                        })]
                    })
                })
            };
            var eB = a(70936),
                eN = e => {
                    let {
                        value: {
                            title: t
                        }
                    } = e;
                    return (0, u.jsx)(ek, {
                        actionElement: (0, u.jsx)(eB.default, {}),
                        title: t
                    })
                },
                eS = a(10214),
                eL = e => {
                    let {
                        children: t,
                        value: a
                    } = e, {
                        file: n
                    } = null != a ? a : {}, {
                        originalFilename: i = null,
                        url: l = "#"
                    } = null != n ? n : {};
                    return (0, u.jsx)(eS.B, {
                        download: i,
                        href: l,
                        children: t
                    })
                },
                ey = a(25687),
                eC = a(48342),
                ew = a.n(eC);
            let eP = e => {
                let t, {
                        children: a,
                        href: n,
                        message: i
                    } = e,
                    l = (0, Q.G)("term-tooltip");
                return t = n ? (0, u.jsx)(k.l, {
                    "aria-describedby": l,
                    className: ew().term,
                    href: n,
                    children: a
                }) : (0, u.jsx)("dfn", {
                    "aria-labelledby": l,
                    className: ew().term,
                    tabIndex: 0,
                    children: a
                }), (0, u.jsxs)("span", {
                    className: ew().component,
                    children: [t, (0, u.jsx)("span", {
                        className: ew().tooltip,
                        id: l,
                        children: (0, u.jsx)("span", {
                            className: ew().tooltipBubble,
                            children: i
                        })
                    })]
                })
            };
            async function eT(e) {
                let {
                    children: t,
                    language: a,
                    text: n,
                    value: i
                } = e, {
                    t: l
                } = await el(a, ["components", "common"]);
                if (!(null == i ? void 0 : i.term)) return null;
                let r = i.term,
                    o = r.title.toLowerCase() !== n.toLowerCase(),
                    s = (0, u.jsxs)(E.H, {
                        as: "span",
                        children: [(0, u.jsx)("strong", {
                            children: (0, u.jsx)(ey.c, {
                                components: {
                                    small: (0, u.jsx)("small", {})
                                },
                                i18nKey: "GlossaryTooltip.title",
                                ns: "components",
                                t: l,
                                values: {
                                    title: r.title,
                                    synonym: o ? n : null,
                                    context: o ? "synonym" : null
                                }
                            })
                        }), (0, u.jsx)("br", {}), r.blurb, (0, u.jsx)("br", {}), (0, u.jsx)(q.Button, {
                            href: r.slug,
                            iconLeft: (0, u.jsx)(H.e, {
                                type: H.f.RightWhite
                            }),
                            size: F.qE.Small,
                            children: l("common.learn_more")
                        })]
                    });
                return (0, u.jsx)(eP, {
                    message: s,
                    children: t
                })
            }
            var eA = a(99425),
                eD = a.n(eA);
            let eI = ["h1", "h2", "h3", "h4", "h5", "h6"],
                ez = e => {
                    let {
                        anchor: t,
                        children: a,
                        level: n
                    } = e;
                    if (!eI.includes(n)) throw Error(`Unknown heading level: ${n}`);
                    let i = t ? (0, u.jsx)("a", {
                        "aria-hidden": "true",
                        className: eD().anchorLink,
                        href: `#${t}`,
                        tabIndex: -1
                    }) : null;
                    return (0, u.jsxs)(n, {
                        className: b()({
                            [eD().heading]: !0,
                            [eD().level1]: "h1" === n,
                            [eD().level2]: "h2" === n,
                            [eD().level3]: "h3" === n,
                            [eD().level4]: "h4" === n,
                            [eD().level5]: "h5" === n,
                            [eD().level6]: "h6" === n
                        }),
                        id: null !== t ? t : void 0,
                        children: [i, a]
                    })
                };
            var eG = e => {
                    var t;
                    let {
                        children: a,
                        value: n
                    } = e, i = null !== (t = n.style) && void 0 !== t ? t : null;
                    if (null === i) throw Error(`Unknown heading level: ${null==n?void 0:n.style}`);
                    let l = (0, f.useMemo)(() => {
                        var e, t;
                        let a = null !== (t = null == n ? void 0 : null === (e = n.markDefs) || void 0 === e ? void 0 : e.find(e => "anchor" === e._type)) && void 0 !== t ? t : null;
                        return null !== a && (0, N.HD)(a.anchor) ? a.anchor : void 0 !== n ? (0, L.h)(I([n])) : void 0
                    }, [n]);
                    return (0, u.jsx)(ez, {
                        anchor: l,
                        level: i,
                        children: a
                    })
                },
                eM = a(2443),
                eR = a.n(eM);
            (l = c || (c = {})).Attention = "attention", l.FrequentlyAskedQuestions = "faq", l.Link = "link", l.ProTip = "pro-tip", l.Steps = "steps", l.UsefulResources = "useful-resources";
            let eE = e => {
                let {
                    anchor: t = null,
                    children: a,
                    title: n = null,
                    variant: i
                } = e, l = (0, Q.G)("highlight-box-label"), r = {
                    attention: ed.MA.PointingFinger,
                    faq: ed.MA.FrequentlyAskedQuestions,
                    link: ed.MA.ChainLink,
                    "pro-tip": ed.MA.Enlightening,
                    steps: ed.MA.OrderedList,
                    "useful-resources": ed.MA.Resource
                };
                return (0, u.jsxs)("section", {
                    "aria-labelledby": l,
                    className: b()({
                        [eR().component]: !0,
                        "typo-block": !0,
                        [eR().hasAttentionLook]: "attention" === i,
                        [eR().hasFAQLook]: "faq" === i,
                        [eR().hasLinkLook]: "link" === i,
                        [eR().hasProTipLook]: "pro-tip" === i,
                        [eR().hasStepsLook]: "steps" === i,
                        [eR().hasUsefulResourcesLook]: "pro-tip" === i
                    }),
                    id: null != t ? t : void 0,
                    children: [(0, u.jsx)("div", {
                        "aria-hidden": !0,
                        className: eR().icon,
                        children: (0, u.jsx)(ed.d0, {
                            size: 64,
                            type: r[i]
                        })
                    }), null !== n && (0, u.jsx)("div", {
                        "aria-hidden": !0,
                        className: eR().title,
                        id: l,
                        children: n
                    }), (0, u.jsx)("div", {
                        className: eR().text,
                        children: (0, u.jsx)(E.H, {
                            children: a
                        })
                    })]
                })
            };
            async function eq(e) {
                var t;
                let {
                    language: a,
                    value: {
                        content: n,
                        variant: i
                    }
                } = e, {
                    t: l
                } = await el(a, "templates"), r = null !== (t = e.value.title) && void 0 !== t ? t : null;
                return null === r && (r = ({
                    [c.Attention]: l("HighlightBoxTemplate.title.attention"),
                    [c.FrequentlyAskedQuestions]: l("HighlightBoxTemplate.title.faq"),
                    [c.Link]: null,
                    [c.ProTip]: l("HighlightBoxTemplate.title.pro_tip"),
                    [c.Steps]: null,
                    [c.UsefulResources]: l("HighlightBoxTemplate.title.useful_resources")
                })[i]), (0, u.jsx)(eE, {
                    title: r,
                    variant: i,
                    children: (0, u.jsx)(tM, {
                        content: n,
                        language: a
                    })
                })
            }
            var eH = a(42044),
                eF = e => {
                    let {
                        value: {
                            caption: t,
                            image: a
                        }
                    } = e;
                    return (0, u.jsx)(eH.f, {
                        alt: a.alt,
                        caption: t,
                        metadata: a.metadata,
                        src: a.src,
                        width: [636, 776, 856]
                    })
                },
                eQ = e => {
                    let {
                        value: {
                            caption: t,
                            image: a
                        }
                    } = e;
                    return (0, u.jsx)(eH.f, {
                        alt: a.alt,
                        bordered: a.metadata.isOpaque,
                        caption: t,
                        inline: !0,
                        metadata: a.metadata,
                        src: a.src,
                        width: [636, 776, 856]
                    })
                },
                eY = a(33840),
                e$ = a.n(eY);
            let eW = e => {
                let {
                    alt: t,
                    backgroundContext: a = B.N.Light,
                    lazyLoading: n,
                    metadata: i,
                    size: l = 100,
                    src: r
                } = e;
                return (0, u.jsx)("div", {
                    className: b()({
                        [e$().component]: !0,
                        [e$().hasReversedLook]: a === B.N.Dark
                    }),
                    children: (0, u.jsx)(j.default, {
                        alt: t,
                        aspectRatio: 1,
                        lazyLoading: n,
                        metadata: i,
                        src: r,
                        width: l
                    })
                })
            };
            var eV = a(74792),
                eO = a(69276),
                eU = a(67623),
                eX = a.n(eU);
            let eZ = e => {
                let {
                    avatar: t,
                    button: a = null,
                    children: n,
                    title: i
                } = e, l = (0, Q.G)("linked-in-box-label"), r = (0, Q.G)("linked-in-box-description");
                return (0, u.jsx)("section", {
                    "aria-describedby": r,
                    "aria-labelledby": l,
                    className: b()({
                        [eX().component]: !0,
                        "typo-block": !0
                    }),
                    children: (0, u.jsxs)("div", {
                        className: eX().container,
                        children: [(0, u.jsx)("div", {
                            "aria-hidden": !0,
                            className: eX().avatar,
                            children: (0, u.jsx)(eW, {
                                alt: t.alt,
                                metadata: t.metadata,
                                size: 200,
                                src: t.src
                            })
                        }), (0, u.jsxs)("div", {
                            className: eX().content,
                            children: [(0, u.jsx)("div", {
                                "aria-hidden": !0,
                                className: eX().title,
                                id: l,
                                children: i
                            }), (0, u.jsxs)("div", {
                                id: r,
                                children: [n && (0, u.jsx)("div", {
                                    className: eX().text,
                                    children: (0, u.jsx)(E.H, {
                                        children: n
                                    })
                                }), null !== a && (0, u.jsx)("div", {
                                    className: eX().button,
                                    children: (0, u.jsx)(q.Button, {
                                        href: a.href,
                                        iconLeft: (0, u.jsx)("span", {
                                            className: eX().icon,
                                            children: (0, u.jsx)(eV.QZ, {
                                                size: 20,
                                                type: eO.z.LinkedIn,
                                                variant: eV.zU.Light
                                            })
                                        }),
                                        size: [F.qE.Medium, F.qE.Large],
                                        variant: F.Wu.Outline,
                                        children: a.label
                                    })
                                })]
                            })]
                        })]
                    })
                })
            };
            async function eK(e) {
                var t;
                let {
                    language: a,
                    value: {
                        avatar: n,
                        button: i,
                        description: l,
                        title: r
                    }
                } = e, {
                    t: o
                } = await el(a, "common");
                return (0, u.jsx)(eZ, {
                    avatar: n,
                    button: { ...i,
                        label: null !== (t = null == i ? void 0 : i.label) && void 0 !== t ? t : o("common.view_linkedin_profile")
                    },
                    title: r,
                    children: (0, u.jsx)(tM, {
                        content: l,
                        language: a
                    })
                })
            }
            var eJ = e => {
                    let {
                        children: t,
                        value: a
                    } = e, {
                        href: n = "#"
                    } = null != a ? a : {};
                    return (0, u.jsx)(eS.B, {
                        href: n,
                        children: t
                    })
                },
                e0 = a(37409),
                e1 = a.n(e0);
            let e3 = e => {
                let {
                    children: t
                } = e;
                return (0, u.jsx)("mark", {
                    className: e1().component,
                    children: t
                })
            };
            var e2 = e => {
                    let {
                        children: t
                    } = e;
                    return (0, u.jsx)(e3, {
                        children: t
                    })
                },
                e7 = a(39289),
                e5 = a.n(e7);
            let e4 = e => {
                let {
                    ariaLabel: t,
                    description: a,
                    improvementRate: n
                } = e;
                return (0, u.jsx)("section", {
                    "aria-label": t,
                    className: b()({
                        [e5().component]: !0,
                        "typo-block": !0
                    }),
                    children: (0, u.jsxs)("div", {
                        className: e5().container,
                        children: [(0, u.jsx)("div", {
                            className: e5().improvementRate,
                            children: n
                        }), (0, u.jsx)("div", {
                            className: e5().description,
                            children: a
                        })]
                    })
                })
            };
            async function e6(e) {
                let {
                    language: t,
                    value: {
                        description: a,
                        improvement: n
                    }
                } = e, {
                    t: i
                } = await el(t, "common");
                return (0, u.jsx)(e4, {
                    ariaLabel: i("common.content.metricImprovementCallout.ariaLabel"),
                    description: a,
                    improvementRate: n
                })
            }
            var e8 = e => {
                    let {
                        children: t
                    } = e;
                    return (0, u.jsx)(u.Fragment, {
                        children: t
                    })
                },
                e9 = a(49514),
                te = a(93307),
                tt = a.n(te);
            let ta = e => {
                var t;
                let {
                    arbitraryAuthor: a,
                    "aria-label": n,
                    attribution: i = null,
                    language: l = ee.SQ.German,
                    photo: r = null,
                    quote: o,
                    socialLinks: s = null
                } = e, c = null !== i && i.length > 0;
                return (0, u.jsxs)("figure", {
                    "aria-label": n,
                    className: b()({
                        [tt().component]: !0,
                        "typo-block": !0
                    }),
                    children: [(0, u.jsx)("div", {
                        "aria-hidden": "true",
                        className: tt().avatar,
                        children: r ? (0, u.jsx)(eW, {
                            alt: null !== (t = null == i ? void 0 : i.join(", ")) && void 0 !== t ? t : r.alt,
                            metadata: r.metadata,
                            size: 100,
                            src: r.src
                        }) : (0, u.jsx)("div", {
                            className: tt().avatarPlaceholder
                        })
                    }), (0, u.jsxs)("div", {
                        className: tt().content,
                        children: [(0, u.jsx)("blockquote", {
                            className: b()({
                                [tt().blockquote]: !0,
                                [tt().germanQuotationMarks]: l === ee.SQ.German,
                                [tt().englishQuotationMarks]: l === ee.SQ.English
                            }),
                            children: o
                        }), !c && a && (0, u.jsx)("figcaption", {
                            className: tt().caption,
                            children: (0, u.jsx)("span", {
                                children: a
                            })
                        }), c && (0, u.jsxs)("figcaption", {
                            className: tt().caption,
                            children: [null !== s && (0, u.jsx)("span", {
                                className: tt().socialLinks,
                                children: s.map(e => (0, u.jsx)("span", {
                                    className: tt().socialButton,
                                    children: (0, u.jsx)(e9.Z0, {
                                        href: e,
                                        type: (0, eO.Y)(e)
                                    })
                                }, e))
                            }), i.map((e, t) => 0 === t ? (0, u.jsxs)("strong", {
                                className: tt().author,
                                children: [e, i.length > 1 && ", "]
                            }, t) : (0, u.jsxs)("span", {
                                children: [e, i.length - 1 !== t && ", "]
                            }, t))]
                        })]
                    })]
                })
            };
            var tn = a(70254);
            async function ti(e) {
                let {
                    arbitraryAuthor: t,
                    author: a = null,
                    language: n,
                    quote: i
                } = e, {
                    t: l
                } = await el(n, "common");
                if (null === a) return (0, u.jsx)(ta, {
                    arbitraryAuthor: t ? (0, u.jsx)(tM, {
                        content: t,
                        language: n
                    }) : void 0,
                    "aria-label": l("common.content.quote.ariaLabel"),
                    language: n,
                    quote: (0, u.jsx)(tM, {
                        content: i,
                        language: n
                    })
                });
                let r = null;
                if (a.website && (r = (0, u.jsx)(tn.G, {
                        href: a.website,
                        children: a.organization
                    })), "organization" === a._type) return (0, u.jsx)(ta, {
                    "aria-label": l("common.content.quote.ariaLabel"),
                    attribution: [null != r ? r : a.organization],
                    language: n,
                    quote: (0, u.jsx)(tM, {
                        content: i,
                        language: n
                    })
                });
                let o = [a.name, a.title, null != r ? r : a.organization].filter(N.Dw);
                return (0, u.jsx)(ta, {
                    "aria-label": l("common.content.quote.ariaLabel"),
                    attribution: o,
                    language: n,
                    photo: a.photo,
                    quote: (0, u.jsx)(tM, {
                        content: i,
                        language: n
                    }),
                    socialLinks: a.socialLinks
                })
            }
            async function tl(e) {
                let {
                    language: t,
                    value: {
                        author: a = null,
                        quote: n
                    }
                } = e, {
                    t: i
                } = await el(t, "common");
                return (0, u.jsx)(ti, {
                    "aria-label": i("common.content.quote.ariaLabel"),
                    author: a,
                    language: t,
                    quote: n
                })
            }
            var tr = a(55932),
                to = a(81088),
                ts = a.n(to);
            let tc = e => {
                let {
                    about: t,
                    ariaLabelSpeakerSocialGroup: a,
                    backgroundColor: n = S.YI.TertiaryStone,
                    name: i,
                    photo: l,
                    socialLinks: r,
                    testId: o,
                    title: s
                } = e;
                return (0, u.jsxs)("div", {
                    className: b()({
                        [ts().component]: !0,
                        [ts().isBgWhite]: n === S.YI.AuxiliaryWhite
                    }),
                    "data-testid": o,
                    children: [l && (0, u.jsx)("div", {
                        "aria-hidden": "true",
                        className: ts().avatar,
                        children: (0, u.jsx)(eW, {
                            alt: i,
                            metadata: l.metadata,
                            size: 100,
                            src: l.src
                        })
                    }), (0, u.jsxs)("div", {
                        className: ts().content,
                        children: [(0, u.jsxs)("div", {
                            className: ts().intro,
                            children: [(0, u.jsx)("div", {
                                className: ts().name,
                                children: i
                            }), s && (0, u.jsx)("div", {
                                className: ts().title,
                                children: s
                            })]
                        }), t && (0, u.jsx)("div", {
                            className: ts().about,
                            children: t
                        }), r && (0, u.jsx)("div", {
                            "aria-label": a,
                            className: ts().socialNetworks,
                            children: (0, u.jsx)(tr.q, {
                                children: r.map((e, t) => (0, u.jsx)(e9.Z0, {
                                    href: e,
                                    type: (0, eO.Y)(e)
                                }, `social-button-${t}`))
                            })
                        })]
                    })]
                })
            };
            var td = function(e) {
                    let {
                        value: {
                            about: t,
                            name: a,
                            organization: n,
                            photo: i,
                            socialLinks: l,
                            title: r
                        }
                    } = e;
                    return (0, u.jsx)(tc, {
                        about: t,
                        name: a,
                        photo: i,
                        socialLinks: l,
                        title: (0, N.HD)(r) && (0, N.HD)(n) ? `${r} at ${n}` : (0, N.HD)(r) ? r : null
                    })
                },
                tu = a(17114),
                tm = a.n(tu);
            let th = e => {
                let {
                    ariaLabel: t,
                    caption: a,
                    decorationColor: n,
                    description: i,
                    value: l
                } = e;
                return (0, u.jsx)("section", {
                    "aria-label": null != t ? t : void 0,
                    className: b()({
                        [tm().component]: !0,
                        [tm().hasCaption]: a
                    }),
                    style: {
                        "--statbox-decoration-color": n ? (0, S.Lq)(n) : void 0
                    },
                    children: (0, u.jsxs)("div", {
                        className: tm().container,
                        children: [a && (0, u.jsx)("div", {
                            className: tm().caption,
                            children: a
                        }), (0, u.jsx)("div", {
                            className: tm().value,
                            children: l
                        }), (0, u.jsx)("div", {
                            className: tm().description,
                            children: (0, u.jsx)(E.H, {
                                children: i
                            })
                        })]
                    })
                })
            };
            var t_ = e => {
                    let {
                        value: {
                            ariaLabel: t,
                            caption: a,
                            decorationColor: n,
                            description: i,
                            value: l
                        }
                    } = e;
                    return (0, u.jsx)(th, {
                        ariaLabel: t,
                        caption: a,
                        decorationColor: n,
                        description: i,
                        value: l
                    })
                },
                tg = a(58732),
                tp = a.n(tg),
                tv = a(34692),
                tx = a.n(tv);
            let tb = e => {
                let {
                    children: t,
                    isCompact: a
                } = e;
                return (0, u.jsx)("div", {
                    className: b()({
                        [tx().table]: !0,
                        [tx().isCompact]: a,
                        "typo-block": !0
                    }),
                    children: (0, u.jsx)("div", {
                        className: tx().scrollContainer,
                        children: t
                    })
                })
            };
            var tf = e => {
                    let {
                        language: t,
                        value: {
                            cells: a,
                            size: n
                        }
                    } = e;
                    return (0, u.jsx)(tb, {
                        isCompact: n.isCompact,
                        children: (0, u.jsxs)("table", {
                            children: [(0, u.jsx)("thead", {
                                children: (0, u.jsx)("tr", {
                                    children: tp()(n.columns, e => {
                                        let n = a[`0,${e}`];
                                        return (0, u.jsx)("th", {
                                            children: z(n) && (0, u.jsx)(tM, {
                                                content: n,
                                                language: t
                                            })
                                        }, e)
                                    })
                                })
                            }), (0, u.jsx)("tbody", {
                                children: tp()(n.rows - 1, e => (0, u.jsx)("tr", {
                                    children: tp()(n.columns, n => {
                                        let i = a[`${e+1},${n}`];
                                        return (0, u.jsx)("td", {
                                            children: z(i) && (0, u.jsx)(tM, {
                                                content: i,
                                                language: t
                                            })
                                        }, n)
                                    })
                                }, e))
                            })]
                        })
                    })
                },
                tj = a(87582),
                tk = a.n(tj);
            let tB = e => {
                let {
                    ariaLabel: t,
                    ariaLabelAuthorsSocialGroup: a,
                    authors: n,
                    isCompact: i = !1,
                    testId: l
                } = e;
                return (0, u.jsx)("div", {
                    "aria-label": t,
                    className: b()({
                        [tk().component]: !0,
                        [tk().isStretchable]: !i
                    }),
                    "data-testid": l,
                    role: "list",
                    children: n.map((e, t) => (0, u.jsxs)("div", {
                        className: tk().author,
                        role: "listitem",
                        children: [e.photo && (0, u.jsx)("div", {
                            "aria-hidden": "true",
                            className: tk().avatar,
                            children: (0, u.jsx)(eW, {
                                alt: e.name,
                                metadata: e.photo.metadata,
                                size: 100,
                                src: e.photo.src
                            })
                        }), (0, u.jsxs)("div", {
                            className: tk().content,
                            children: [(0, u.jsx)("div", {
                                className: tk().name,
                                children: e.name
                            }), e.about && (0, u.jsx)("div", {
                                className: tk().about,
                                children: e.about
                            }), e.href && (0, u.jsx)("div", {
                                className: tk().link,
                                children: (0, u.jsx)(tn.G, {
                                    href: e.href,
                                    iconLeft: (0, u.jsx)(H.e, {
                                        type: H.f.RightInBlackCircle
                                    }),
                                    children: e.hrefLabel
                                })
                            }), e.socialLinks && (0, u.jsx)("div", {
                                "aria-label": a,
                                className: tk().socialNetworks,
                                children: (0, u.jsx)(tr.q, {
                                    children: e.socialLinks.map((e, t) => (0, u.jsx)(e9.Z0, {
                                        href: e,
                                        type: (0, eO.Y)(e)
                                    }, `social-button-${t}`))
                                })
                            })]
                        })]
                    }, `author-${t}`))
                })
            };
            async function tN(e) {
                let {
                    authors: t,
                    language: a,
                    testId: n
                } = e, {
                    t: i
                } = await el(a, "components");
                return (0, u.jsx)(tB, {
                    ariaLabel: i("AuthorsBox.aria_label"),
                    ariaLabelAuthorsSocialGroup: i("AuthorsBox.socialLink.aria_label"),
                    authors: t.map(e => ({ ...e,
                        hrefLabel: i("AuthorsBox.link.read_bio", {
                            name: e.firstName
                        })
                    })),
                    testId: n
                })
            }
            var tS = function(e) {
                    let {
                        language: t,
                        value: {
                            about: a,
                            firstName: n,
                            href: i,
                            name: l,
                            photo: r,
                            socialLinks: o
                        }
                    } = e;
                    return (0, u.jsx)("div", {
                        className: "typo-block",
                        children: (0, u.jsx)(tN, {
                            authors: [{
                                about: a,
                                firstName: n,
                                href: i,
                                name: l,
                                photo: r,
                                socialLinks: o
                            }],
                            language: t
                        })
                    })
                },
                tL = a(6155),
                ty = a.n(tL);
            let tC = e => {
                    let {
                        caption: t,
                        captionNumber: a,
                        height: n = 720,
                        lazyLoading: i = !0,
                        src: l,
                        width: r = 1280
                    } = e, o = (0, u.jsx)("div", {
                        className: ty().component,
                        style: {
                            maxWidth: r
                        },
                        children: (0, u.jsx)("div", {
                            className: ty().element,
                            children: (0, u.jsx)("iframe", {
                                allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                                allowFullScreen: !0,
                                className: ty().iframe,
                                frameBorder: "0",
                                height: n,
                                loading: i ? "lazy" : "eager",
                                src: l,
                                style: {
                                    aspectRatio: `${r} / ${n}`
                                },
                                width: r
                            })
                        })
                    });
                    return t && (o = (0, u.jsxs)("figure", {
                        className: ty().figure,
                        children: [o, (0, u.jsxs)("figcaption", {
                            className: ty().figCaption,
                            children: [a && (0, u.jsxs)("strong", {
                                className: ty().figNumber,
                                children: ["Figure ", a, ":"]
                            }), " ", t]
                        })]
                    })), (0, u.jsx)("div", {
                        className: "typo-block",
                        children: o
                    })
                },
                tw = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v=))|youtu\.be\/)(?<videoId>[a-zA-Z0-9_-]{6,11})/,
                tP = /(?:vimeo\.com(?:[/\w:]*(?:\/videos)?)?\/(?<videoId>[0-9]+)[^\s]*)/,
                tT = e => {
                    var t;
                    let {
                        url: a
                    } = e, [n, i] = (t = a, tw.test(t) ? ["youtube", function(e) {
                        var t, a;
                        let n = e.match(tw);
                        return null !== (a = null == n ? void 0 : null === (t = n.groups) || void 0 === t ? void 0 : t.videoId) && void 0 !== a ? a : null
                    }(t)] : tP.test(t) ? ["vimeo", function(e) {
                        var t, a;
                        let n = e.match(tP);
                        return null !== (a = null == n ? void 0 : null === (t = n.groups) || void 0 === t ? void 0 : t.videoId) && void 0 !== a ? a : null
                    }(t)] : [null, null]);
                    if (null === n || null === i) return null;
                    let l = null;
                    return "youtube" === n ? l = (0, u.jsx)(tC, {
                        src: `https://www.youtube.com/embed/${i}?modestbranding=1&color=white`
                    }) : "vimeo" === n && (l = (0, u.jsx)(tC, {
                        src: `https://player.vimeo.com/video/${i}?byline=false&portrait=false`
                    })), l
                };
            var tA = e => {
                    let {
                        value: {
                            url: t
                        }
                    } = e;
                    return (0, u.jsx)(tT, {
                        url: t
                    })
                },
                tD = a(32031),
                tI = a.n(tD);
            (r = d || (d = {})).Is3030 = "3030", r.Non3030 = "non-3030";
            let tz = e => {
                var t;
                let {
                    button: a = null,
                    children: n,
                    title: i,
                    variant: l = "3030"
                } = e, r = (0, Q.G)("webinar-box-label"), o = (0, Q.G)("webinar-box-description");
                return (0, u.jsx)("section", {
                    "aria-describedby": o,
                    "aria-labelledby": r,
                    className: b()({
                        [tI().component]: !0,
                        [tI().is3030Webinar]: "3030" === l,
                        [tI().isNon3030Webinar]: "non-3030" === l,
                        "typo-block": !0
                    }),
                    children: (0, u.jsxs)("div", {
                        className: tI().container,
                        children: [(0, u.jsx)("div", {
                            "aria-hidden": !0,
                            className: tI().title,
                            id: r,
                            children: i
                        }), (0, u.jsxs)("div", {
                            id: o,
                            children: [n && (0, u.jsx)("div", {
                                className: tI().text,
                                children: (0, u.jsx)(E.H, {
                                    children: n
                                })
                            }), null !== a && (0, u.jsx)("div", {
                                className: tI().button,
                                children: (0, u.jsx)(q.Button, {
                                    href: a.href,
                                    iconLeft: (0, u.jsx)(H.e, {
                                        type: H.f.RightInBlackCircle
                                    }),
                                    size: [F.qE.Medium, F.qE.Large],
                                    variant: F.Wu.Neutral,
                                    children: null !== (t = a.label) && void 0 !== t ? t : "Save my spot"
                                })
                            })]
                        })]
                    })
                })
            };
            async function tG(e) {
                var t;
                let {
                    language: a,
                    value: {
                        button: n,
                        description: i,
                        title: l
                    }
                } = e, {
                    t: r
                } = await el(a, "common");
                return (0, u.jsx)(tz, {
                    button: n && { ...n,
                        label: null !== (t = null == n ? void 0 : n.label) && void 0 !== t ? t : r("common.button.save_spot.label")
                    },
                    title: l,
                    children: (0, u.jsx)(tM, {
                        content: i,
                        language: a
                    })
                })
            }
            var tM = e => {
                    let {
                        content: t,
                        language: a
                    } = e;
                    return (0, u.jsx)(G.YI, {
                        components: (() => {
                            function e(e) {
                                return t => (0, u.jsx)(e, { ...t,
                                    language: a
                                })
                            }
                            return {
                                block: {
                                    h1: eG,
                                    h2: eG,
                                    h3: eG,
                                    h4: eG,
                                    h5: eG,
                                    h6: eG
                                },
                                types: {
                                    "content.basicIcon": R,
                                    "content.colorfulIcon": eb,
                                    "content.c3OnDemandBox": e(V),
                                    "content.callToActionBox": e(es),
                                    "content.codeBlock": e(e_),
                                    "content.dispatchBox": eN,
                                    "content.highlightBox": e(eq),
                                    "content.image": eF,
                                    "content.inlineImage": eQ,
                                    "content.linkedInProfileBox": e(eK),
                                    "content.metricImprovementCallout": e(e6),
                                    "content.quote": e(tl),
                                    "content.speakerBox": e(td),
                                    "content.statbox": t_,
                                    "content.table": e(tf),
                                    "content.teamMemberBox": e(tS),
                                    "content.video": tA,
                                    "content.webinarBox": e(tG)
                                },
                                marks: {
                                    anchor: e8,
                                    code: ex,
                                    download: eL,
                                    glossaryTooltip: e => (0, u.jsx)(eT, { ...e,
                                        language: a
                                    }),
                                    link: eJ,
                                    mark: e2
                                }
                            }
                        })(),
                        value: t
                    })
                },
                tR = a(26918),
                tE = e => {
                    let {
                        backgroundColor: t,
                        blurb: a,
                        events: n,
                        language: i,
                        title: l
                    } = e, {
                        activeCategory: r,
                        activeEvent: o,
                        ariaLabelFilterCategories: s,
                        ariaLabelFilterEvents: c,
                        categories: d,
                        eventsList: x,
                        selectCategory: b,
                        selectEvent: j,
                        sessionsByCategory: k
                    } = function(e, t) {
                        let [a, n] = (0, f.useState)(null), [i, l] = (0, f.useState)(null), [r, o] = (0, f.useState)(e), [s, c] = (0, f.useState)([]), [d, u] = (0, f.useState)([]), [m, h] = (0, f.useState)([]), {
                            t: _
                        } = (0, tR.E)(t, ["templates"]), g = _("SessionsListSectionTemplate.filter.button.all"), p = (0, f.useCallback)((e, t) => (null == e ? void 0 : e.map(e => {
                            let a = e.sessions;
                            return t !== g && (a = e.sessions.filter(e => e.category === t)), a
                        })).flat(), [g]);
                        return (0, f.useEffect)(() => {
                            if (!a) {
                                let t = {
                                    title: g,
                                    slug: "",
                                    sessions: []
                                };
                                o([t, ...e]), u([t, ...e]), n(t);
                                let a = new Set;
                                e.forEach(e => {
                                    e.sessions.forEach(e => a.add(e.category))
                                }), h([g, ...a]), l(g), c(p([t, ...e], g))
                            }
                        }, [a, g, e, p]), {
                            allButtonLabel: g,
                            eventsList: d,
                            activeEvent: a,
                            selectEvent: t => {
                                if (t.title === g) {
                                    o(e);
                                    let t = new Set;
                                    e.forEach(e => {
                                        e.sessions.forEach(e => t.add(e.category))
                                    }), h([g, ...t]), l(g), c(p(e, g))
                                } else {
                                    o([t]);
                                    let e = new Set;
                                    t.sessions.forEach(t => e.add(t.category)), h([g, ...e]), l(g), c(p([t], g))
                                }
                                n(t)
                            },
                            categories: m,
                            activeCategory: i,
                            setActiveCategory: l,
                            ariaLabelFilterEvents: _("SessionsListSectionTemplate.filter.events.ariaLabel"),
                            ariaLabelFilterCategories: _("SessionsListSectionTemplate.filter.categories.ariaLabel"),
                            sessionsByCategory: s,
                            selectCategory: e => {
                                l(e), c(p(r, e))
                            }
                        }
                    }(n, i);
                    return (0, u.jsx)(m.I, {
                        backgroundColor: t,
                        blurb: z(a) && (0, u.jsx)(tM, {
                            content: a,
                            language: i
                        }),
                        filter: (0, u.jsxs)(h.K, {
                            gapSize: _.xz.Medium,
                            children: [n.length > 1 && (0, u.jsx)(g.S, {
                                ariaLabel: c,
                                hasGaps: !1,
                                children: x.map((e, t) => (0, u.jsx)(p.z, {
                                    isCurrent: (null == o ? void 0 : o.title) === e.title,
                                    onClick: () => j(e),
                                    children: e.title
                                }, `events-filter-${t}`))
                            }), (0, u.jsx)(g.S, {
                                ariaLabel: s,
                                hasGaps: !1,
                                children: d.map((e, t) => (0, u.jsx)(p.z, {
                                    isCurrent: r === e,
                                    onClick: () => b(e),
                                    children: e
                                }, `categories-filter-${t}`))
                            })]
                        }),
                        title: l,
                        children: (0, u.jsx)(v.r, {
                            columnsCount: [1, 2, 3],
                            gapSize: [v.X.Medium, v.X.Medium, v.X.Large],
                            children: k.map((e, t) => {
                                var a;
                                let n = [],
                                    i = [];
                                return e.speakers.forEach(e => {
                                    var t, a;
                                    n.push({
                                        href: null !== (a = null !== (t = e.slugTeamDetail) && void 0 !== t ? t : e.slugSpeaker) && void 0 !== a ? a : "#",
                                        name: e.name,
                                        organization: e.organization
                                    }), i.push(e.photo)
                                }), (0, u.jsx)(w, {
                                    "aria-label": "person",
                                    backgroundColor: S.YI.AuxiliaryBlack,
                                    backgroundContext: B.N.Light,
                                    href: null !== (a = e.slug) && void 0 !== a ? a : void 0,
                                    images: i,
                                    persons: n.length > 0 ? n : [],
                                    title: e.title
                                }, `person-card-${t}`)
                            })
                        })
                    })
                }
        },
        97533: function(e, t, a) {
            "use strict";
            a.d(t, {
                default: function() {
                    return m
                }
            });
            var n = a(27573),
                i = a(52989),
                l = a(89800),
                r = a(80941),
                o = a(7653),
                s = a(58832),
                c = a(950),
                d = a(74925);
            let u = "EEEE, MMMM d yyyy, h:mm a zzz";
            var m = e => {
                let {
                    date: t,
                    language: a
                } = e, m = (0, o.useMemo)(() => (0, s.HD)(t) ? new Date(t) : t, [t]), h = a === c.SQ.German ? (0, r.CV)(m, "America/New_York", u, {
                    locale: i.de
                }) : (0, r.CV)(m, "America/New_York", u, {
                    locale: l._
                }), [_, g] = (0, o.useState)(h);
                return (0, o.useEffect)(() => {
                    let e = (0, d.u)(),
                        t = ! function() {
                            try {
                                let e = new Date().toLocaleString([], {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                });
                                return !1 === /AM|PM/i.test(e)
                            } catch {
                                return !1
                            }
                        }() ? u : "EEEE, MMMM d yyyy, H:mm zzz";
                    a === c.SQ.German ? g((0, r.CV)(m, e, t, {
                        locale: i.de
                    })) : g((0, r.CV)(m, e, t))
                }, [a, m]), (0, n.jsx)("time", {
                    dateTime: m.toISOString(),
                    title: m.toUTCString(),
                    children: _
                })
            }
        },
        46282: function(e, t, a) {
            "use strict";
            a.r(t), a.d(t, {
                default: function() {
                    return P
                }
            });
            var n, i, l, r, o, s, c, d, u, m, h, _, g = a(27573),
                p = a(45531),
                v = a.n(p);
            a(7653);
            var x = a(27870),
                b = a.n(x);
            (n = c || (c = {})).Colorful = "colorful", n.Dark = "dark", n.Light = "light";
            let f = e => {
                let {
                    ariaLabel: t,
                    starsCount: a = 5,
                    starsRating: n,
                    variant: i = "dark"
                } = e;
                return (0, g.jsxs)("div", {
                    "aria-label": t,
                    className: v()({
                        [b().component]: !0,
                        [b().isColorful]: "colorful" === i,
                        [b().isDark]: "dark" === i,
                        [b().isLight]: "light" === i
                    }),
                    children: [(0, g.jsx)("div", {
                        "aria-hidden": !0,
                        className: b().topStarsGroup,
                        style: {
                            width: `${n/a*100}%`
                        },
                        children: Array.from(Array(a)).map((e, t) => (0, g.jsx)("span", {
                            className: b().star,
                            children: "★"
                        }, `${t}-star-top`))
                    }), (0, g.jsx)("div", {
                        "aria-hidden": !0,
                        className: b().bottomStarsGroup,
                        children: Array.from(Array(a)).map((e, t) => (0, g.jsx)("span", {
                            className: b().star,
                            children: "☆"
                        }, `${t}-star-bottom`))
                    })]
                })
            };
            var j = a(48455),
                k = a(96874),
                B = a.n(k);
            (i = d || (d = {})).Small = "small", i.Medium = "medium", i.Responsive = "responsive";
            let N = e => {
                let {
                    ariaLabel: t,
                    ariaLabelRatingStars: a,
                    lazyLoading: n,
                    logo: i,
                    size: l = "responsive",
                    stars: r,
                    variant: o = c.Dark
                } = e;
                return (0, g.jsxs)("div", {
                    "aria-label": t,
                    className: v()({
                        [B().component]: !0,
                        [B().isSmall]: "small" === l,
                        [B().isMedium]: "medium" === l,
                        [B().isResponsive]: "responsive" === l
                    }),
                    children: [(0, g.jsx)("div", {
                        className: B().logo,
                        children: (0, g.jsx)(j.default, {
                            alt: i.alt,
                            height: 65,
                            lazyLoading: n,
                            metadata: i.metadata,
                            src: i.src,
                            width: 180
                        })
                    }), (0, g.jsx)("div", {
                        className: B().ratingStars,
                        children: (0, g.jsx)(f, {
                            ariaLabel: a,
                            starsRating: r,
                            variant: o
                        })
                    })]
                })
            };
            var S = a(28534),
                L = a.n(S);
            (l = u || (u = {})).Dark = "dark", l.Light = "light", (r = m || (m = {})).Small = "small", r.Medium = "medium", r.Responsive = "responsive";
            let y = e => {
                var t, a;
                let {
                    ariaLabel: n,
                    lazyLoading: i,
                    logo: l,
                    size: r = "responsive",
                    title: o,
                    variant: s = "dark"
                } = e, c = null !== (a = null === (t = l.metadata) || void 0 === t ? void 0 : t.aspectRatio) && void 0 !== a ? a : 1;
                return (0, g.jsxs)("div", {
                    "aria-label": n,
                    className: v()({
                        [L().component]: !0,
                        [L().isSmall]: "small" === r,
                        [L().isMedium]: "medium" === r,
                        [L().isResponsive]: "responsive" === r,
                        [L().isDark]: "dark" === s,
                        [L().isLight]: "light" === s
                    }),
                    children: [(0, g.jsx)("div", {
                        className: L().logo,
                        children: (0, g.jsx)(j.default, {
                            alt: l.alt,
                            aspectRatio: c,
                            lazyLoading: i,
                            metadata: l.metadata,
                            src: l.src,
                            width: 180
                        })
                    }), c > 1.5 && (0, g.jsx)("div", {
                        className: L().title,
                        children: o
                    })]
                })
            };
            var C = a(7329),
                w = a(26918);
            (o = h || (h = {})).Colorful = "colorful", o.Dark = "dark", o.Light = "light", (s = _ || (_ = {})).Small = "small", s.Medium = "medium", s.Responsive = "responsive";
            var P = e => {
                let {
                    accolade: t,
                    language: a,
                    lazyLoading: n,
                    size: i = _.Responsive,
                    variant: l = h.Dark
                } = e, {
                    t: r
                } = (0, w.E)(a, ["common"]), o = (0, C.V)(i);
                if ("rating" === t.type) {
                    let e = {
                            [h.Colorful]: c.Colorful,
                            [h.Dark]: c.Dark,
                            [h.Light]: c.Light
                        }[l],
                        a = {
                            [_.Small]: d.Small,
                            [_.Medium]: d.Medium,
                            [_.Responsive]: d.Responsive
                        }[o];
                    return (0, g.jsx)(N, {
                        ariaLabel: `${t.organizationName} - ${t.score}/${t.scale}`,
                        ariaLabelRatingStars: r("common.rating.badge.aria_label", {
                            stars_rating: t.stars,
                            stars_count: 5
                        }),
                        lazyLoading: n,
                        logo: t.badge,
                        size: a,
                        stars: t.stars,
                        variant: e
                    })
                }
                if ("award" === t.type) {
                    let e = {
                            [h.Colorful]: u.Dark,
                            [h.Dark]: u.Dark,
                            [h.Light]: u.Light
                        }[l],
                        a = {
                            [_.Small]: m.Small,
                            [_.Medium]: m.Medium,
                            [_.Responsive]: m.Responsive
                        }[o];
                    return (0, g.jsx)(y, {
                        ariaLabel: `${t.organizationName} - ${t.awardName}`,
                        lazyLoading: n,
                        logo: t.badge,
                        size: a,
                        title: t.awardName,
                        variant: e
                    })
                }
                return (0, g.jsx)(g.Fragment, {
                    children: "why"
                })
            }
        },
        93113: function(e, t, a) {
            "use strict";
            let n;
            var i = a(27573),
                l = a(67754),
                r = a(7653),
                o = a(81781),
                s = a(13324),
                c = a(76362),
                d = a(1900),
                u = a(11946),
                m = a(26918),
                h = a(17098);
            t.default = (n = function(e) {
                let {
                    language: t,
                    marketoFormId: a,
                    templateVariant: n = o.i.Default
                } = e, {
                    t: u
                } = (0, m.E)(t, ["templates", "common"]), _ = (0, l.useRouter)(), g = (0, l.useSearchParams)(), p = (0, r.useMemo)(() => {
                    var e;
                    return {
                        Email: null !== (e = null == g ? void 0 : g.get("email")) && void 0 !== e ? e : ""
                    }
                }, [g]), v = (0, r.useCallback)(() => {
                    _.push("/get-started-thanks/")
                }, [_]);
                return (0, i.jsx)(s.MarketoForm, {
                    defaultValues: p,
                    formId: a,
                    marketoBaseUrl: h.O.marketoBaseUrl(),
                    minHeight: [604, 526],
                    onFinish: v,
                    templateVariant: n,
                    children: e => {
                        let {
                            isActive: t,
                            isFinished: a,
                            isLoading: n,
                            renderForm: l
                        } = e;
                        return (0, i.jsxs)(i.Fragment, {
                            children: [t && l(), a && (0, i.jsx)(c.H, {
                                announcement: u("common.thank_you", {
                                    ns: "common"
                                }),
                                ctaButton: {
                                    href: "/get-started-thanks/",
                                    label: u("MastheadBookADemoSectionTemplate.button.video.watch.label", {
                                        ns: "templates"
                                    })
                                },
                                description: u("MastheadBookADemoSectionTemplate.button.video.watch.description", {
                                    ns: "templates"
                                })
                            }), n && (0, i.jsx)(d.T, {})]
                        })
                    }
                })
            }, e => (0, i.jsx)(r.Suspense, {
                fallback: (0, i.jsx)(u.r, {
                    children: (0, i.jsx)(d.T, {})
                }),
                children: (0, i.jsx)(n, { ...e
                })
            }))
        },
        22358: function(e, t, a) {
            "use strict";
            var n = a(27573),
                i = a(7653),
                l = a(82392),
                r = a(76362),
                o = a(13324),
                s = a(1900),
                c = a(950),
                d = a(2198),
                u = a(26918),
                m = a(17098);
            t.default = function(e) {
                let {
                    blurb: t,
                    gatedForm: a,
                    language: h,
                    title: _
                } = e, {
                    t: g
                } = (0, u.E)(h, ["templates", "common"]), p = "label" in a.reward ? a.reward.label : null, v = null != p ? p : ({
                    download: g("GatedFormBlockTemplate.button.download.label", {
                        ns: "templates"
                    }),
                    link: g("GatedFormBlockTemplate.button.link.label", {
                        ns: "templates"
                    }),
                    message: void 0,
                    redirect: g("GatedFormBlockTemplate.button.redirect.label", {
                        ns: "templates"
                    }),
                    video: g("GatedFormBlockTemplate.button.video.label", {
                        ns: "templates"
                    })
                })[a.reward.type], x = (0, i.useCallback)(() => {
                    var e, i, o, s;
                    return (0, n.jsx)(l.b, {
                        ariaLabelButtonCloseWidget: g("common.block.widget.button.close.aria_label", {
                            ns: "common"
                        }),
                        description: null !== (o = null === (e = a.confirmation) || void 0 === e ? void 0 : e.blurb) && void 0 !== o ? o : t,
                        form: (0, n.jsx)(r.H, {
                            ctaButton: (0, n.jsx)(d.default, {
                                language: h,
                                reward: a.reward
                            }),
                            variant: r.x.Light
                        }),
                        title: null !== (s = null === (i = a.confirmation) || void 0 === i ? void 0 : i.title) && void 0 !== s ? s : _
                    })
                }, [t, a, h, g, _]), b = (0, i.useCallback)(() => {
                    "redirect" === a.reward.type && window.location.replace(a.reward.href)
                }, [a]);
                return null === a.marketoFormId ? x() : (0, n.jsx)(o.MarketoForm, {
                    defaultValues: {
                        rewardResource: a.reward.resource,
                        rewardLanguage: null != h ? h : c.SQ.English
                    },
                    formId: a.marketoFormId,
                    marketoBaseUrl: m.O.marketoBaseUrl(),
                    onFinish: b,
                    children: e => {
                        let {
                            isFinished: a,
                            isLoading: i,
                            renderForm: r
                        } = e;
                        return i ? (0, n.jsx)(l.b, {
                            ariaLabelButtonCloseWidget: g("common.block.widget.button.close.aria_label", {
                                ns: "common"
                            }),
                            collapsedWidgetButtonLabel: v,
                            description: t,
                            form: (0, n.jsx)(s.T, {
                                variant: s.C.Light
                            }),
                            title: _
                        }) : a ? x() : (0, n.jsx)(l.b, {
                            ariaLabelButtonCloseWidget: g("common.block.widget.button.close.aria_label", {
                                ns: "common"
                            }),
                            collapsedWidgetButtonLabel: v,
                            description: t,
                            form: r(),
                            title: _
                        })
                    }
                })
            }
        },
        28534: function(e) {
            e.exports = {
                component: "AwardBadge_component__OuMwH",
                isLight: "AwardBadge_isLight__XxB4I",
                logo: "AwardBadge_logo__n87H_",
                title: "AwardBadge_title__1R_k_",
                isSmall: "AwardBadge_isSmall__0Y1Cp",
                isMedium: "AwardBadge_isMedium__qgg1G",
                isResponsive: "AwardBadge_isResponsive__5eKOX"
            }
        },
        96874: function(e) {
            e.exports = {
                component: "RatingBadge_component__cZl7x",
                logo: "RatingBadge_logo__vKFkH",
                ratingStars: "RatingBadge_ratingStars__3NTzy",
                isMedium: "RatingBadge_isMedium__N1lcU",
                isResponsive: "RatingBadge_isResponsive__aGJlR"
            }
        },
        87582: function(e) {
            e.exports = {
                component: "AuthorsBlock_component__3tUa4",
                author: "AuthorsBlock_author__7SEsL",
                avatar: "AuthorsBlock_avatar__jyApi",
                name: "AuthorsBlock_name__CH8av",
                about: "AuthorsBlock_about__brgMm",
                link: "AuthorsBlock_link__A76q9",
                socialNetworks: "AuthorsBlock_socialNetworks__tcad9",
                isStretchable: "AuthorsBlock_isStretchable__m_rmX",
                content: "AuthorsBlock_content__0LSib"
            }
        },
        81088: function(e) {
            e.exports = {
                component: "SpeakerBlock_component__LcDJx",
                isBgWhite: "SpeakerBlock_isBgWhite__D0sxx",
                content: "SpeakerBlock_content__Wvydz",
                name: "SpeakerBlock_name__XEDTp",
                title: "SpeakerBlock_title__xOb2K",
                about: "SpeakerBlock_about__wzZQj",
                avatar: "SpeakerBlock_avatar__FQEBB",
                author: "SpeakerBlock_author__5bijo"
            }
        },
        66504: function(e) {
            e.exports = {
                component: "AgendaCard_component__grwOu",
                hasTurquoiseBgColor: "AgendaCard_hasTurquoiseBgColor__ABr_x",
                hasBlueBgColor: "AgendaCard_hasBlueBgColor__B2pQw",
                hasGoldBgColor: "AgendaCard_hasGoldBgColor__Y0_xg",
                hasGreenBgColor: "AgendaCard_hasGreenBgColor__f9sL9",
                isBreak: "AgendaCard_isBreak__3lP9S",
                title: "AgendaCard_title__pRiDv",
                blurb: "AgendaCard_blurb__PM85x",
                footer: "AgendaCard_footer__ZYtby",
                alignTimeEnd: "AgendaCard_alignTimeEnd__V3zoU",
                time: "AgendaCard_time__zBSQk",
                authors: "AgendaCard_authors__kAYsA",
                hasReversedLook: "AgendaCard_hasReversedLook__IPp3Q",
                author: "AgendaCard_author__xayJL",
                authorName: "AgendaCard_authorName__N9i82",
                authorTitle: "AgendaCard_authorTitle__PUquC",
                image: "AgendaCard_image__8Dn4z",
                cta: "AgendaCard_cta__6FeE8"
            }
        },
        15757: function(e) {
            e.exports = {
                cta: "PersonCard_cta__HLtYY",
                component: "PersonCard_component__z0hu_",
                hasReversedLook: "PersonCard_hasReversedLook__M1zx1",
                textContainer: "PersonCard_textContainer__Rbanu",
                person: "PersonCard_person__iZvjJ",
                title: "PersonCard_title__fCY9l",
                images: "PersonCard_images__c6yqv",
                hasNoImage: "PersonCard_hasNoImage__tQyVM",
                image: "PersonCard_image__ZywfF",
                link: "PersonCard_link__tRUVe",
                linkPerson: "PersonCard_linkPerson__7nkZ3"
            }
        },
        17114: function(e) {
            e.exports = {
                component: "Statbox_component__eHoiJ",
                hasCaption: "Statbox_hasCaption__5K5uE",
                container: "Statbox_container__84vq7",
                caption: "Statbox_caption__bARg7",
                description: "Statbox_description__mp7Hq",
                value: "Statbox_value__7zqSe"
            }
        },
        52961: function(e) {
            e.exports = {
                component: "C3OnDemandBox_component__i4l1Y",
                container: "C3OnDemandBox_container__kmzYn",
                title: "C3OnDemandBox_title__mG4ho",
                text: "C3OnDemandBox_text__5hMbi",
                button: "C3OnDemandBox_button__c8orF"
            }
        },
        89532: function(e) {
            e.exports = {
                component: "CallToActionBox_component__c2fX_",
                title: "CallToActionBox_title__mVnDG",
                text: "CallToActionBox_text__qdtgI",
                form: "CallToActionBox_form__VIOxJ"
            }
        },
        11600: function(e) {
            e.exports = {
                component: "CodeBlock_component__5rZDj",
                isNegative: "CodeBlock_isNegative__07fB_",
                isPositive: "CodeBlock_isPositive__9jiKK",
                icon: "CodeBlock_icon__q7HC7",
                preformattedText: "CodeBlock_preformattedText__1k0LO"
            }
        },
        6155: function(e) {
            e.exports = {
                component: "ContentIframe_component__GBWd5",
                element: "ContentIframe_element__kjYEw",
                iframe: "ContentIframe_iframe__R2hGB",
                figCaption: "ContentIframe_figCaption__0_neQ"
            }
        },
        17415: function(e) {
            e.exports = {
                component: "ContentImage_component__QLSNW",
                inline: "ContentImage_inline__wA3SR",
                image: "ContentImage_image__1RfoQ",
                bordered: "ContentImage_bordered__fmsqa",
                figCaption: "ContentImage_figCaption__kBdCQ"
            }
        },
        75929: function(e) {
            e.exports = {
                component: "DispatchBox_component__6uqpP",
                container: "DispatchBox_container__IqQph",
                title: "DispatchBox_title__MvmN_",
                form: "DispatchBox_form__7SgQu",
                note: "DispatchBox_note__Z0vzq"
            }
        },
        2443: function(e) {
            e.exports = {
                component: "HighlightBox_component__pm9wq",
                icon: "HighlightBox_icon__EKvEa",
                text: "HighlightBox_text__MRXKB",
                title: "HighlightBox_title__6LAtS"
            }
        },
        67623: function(e) {
            e.exports = {
                component: "LinkedInProfileBox_component__qjO5t",
                container: "LinkedInProfileBox_container__6q_rS",
                title: "LinkedInProfileBox_title__BbhQi",
                text: "LinkedInProfileBox_text__hkvXp",
                button: "LinkedInProfileBox_button__i_nd0",
                icon: "LinkedInProfileBox_icon__Pw9_E",
                avatar: "LinkedInProfileBox_avatar__eIngq"
            }
        },
        39289: function(e) {
            e.exports = {
                component: "MetricImprovementCallout_component__xscmu",
                container: "MetricImprovementCallout_container__P1g2D",
                improvementRate: "MetricImprovementCallout_improvementRate__uwvJ1",
                description: "MetricImprovementCallout_description__c4a65"
            }
        },
        93307: function(e) {
            e.exports = {
                component: "Quote_component__z7V4u",
                content: "Quote_content__SEJ2p",
                blockquote: "Quote_blockquote__3QKu9",
                englishQuotationMarks: "Quote_englishQuotationMarks__1EgR2",
                germanQuotationMarks: "Quote_germanQuotationMarks__JH5_B",
                avatar: "Quote_avatar__gk8z5",
                avatarPlaceholder: "Quote_avatarPlaceholder__2cCfC",
                caption: "Quote_caption__dNL4P",
                author: "Quote_author__bxaUq",
                socialLinks: "Quote_socialLinks__mHOQv"
            }
        },
        34692: function(e) {
            e.exports = {
                table: "Table_table__MUvex",
                isCompact: "Table_isCompact__63CSp",
                scrollContainer: "Table_scrollContainer__mrTWX"
            }
        },
        32031: function(e) {
            e.exports = {
                component: "WebinarBox_component__qwB3H",
                container: "WebinarBox_container__lSllb",
                isNon3030Webinar: "WebinarBox_isNon3030Webinar__KfM8a",
                title: "WebinarBox_title__rVzdg",
                text: "WebinarBox_text___h_ja",
                button: "WebinarBox_button__7lgva"
            }
        },
        18757: function(e) {
            e.exports = {
                component: "EventFilterButton_component__CDB1q",
                isSelected: "EventFilterButton_isSelected__HLKjW"
            }
        },
        44748: function(e) {
            e.exports = {
                component: "FilterButtonsGroup_component__3746L",
                label: "FilterButtonsGroup_label__49EfE",
                list: "FilterButtonsGroup_list__DPxX_",
                hasGaps: "FilterButtonsGroup_hasGaps__eMfAQ",
                item: "FilterButtonsGroup_item__d3BeJ"
            }
        },
        33840: function(e) {
            e.exports = {
                component: "Avatar_component__Fouz1",
                hasReversedLook: "Avatar_hasReversedLook__IIcAy"
            }
        },
        56747: function(e) {
            e.exports = {
                component: "MastheadSpeakerProfileSection_component__bmy9K",
                heading: "MastheadSpeakerProfileSection_heading__2LoYC",
                container: "MastheadSpeakerProfileSection_container__gg97o",
                text: "MastheadSpeakerProfileSection_text__b_fgD",
                contentPart: "MastheadSpeakerProfileSection_contentPart__63V37",
                image: "MastheadSpeakerProfileSection_image__lGdlg",
                imagePart: "MastheadSpeakerProfileSection_imagePart__mS9Um"
            }
        },
        27870: function(e) {
            e.exports = {
                component: "RatingStars_component__W0rW5",
                isLight: "RatingStars_isLight__l3FXc",
                topStarsGroup: "RatingStars_topStarsGroup__ARJxt",
                bottomStarsGroup: "RatingStars_bottomStarsGroup__5d2Rd",
                star: "RatingStars_star__wqxiC",
                isColorful: "RatingStars_isColorful__vlvoF"
            }
        },
        16312: function(e) {
            e.exports = {
                component: "SectionBuilder_component__VoD5I",
                isDark: "SectionBuilder_isDark__WeiaT",
                isLight: "SectionBuilder_isLight__jkgXk",
                isSticky: "SectionBuilder_isSticky__6l8eD",
                hasBackgroundImage: "SectionBuilder_hasBackgroundImage__VzhTv",
                hasGradientLimeTurquoiseDeepPurple: "SectionBuilder_hasGradientLimeTurquoiseDeepPurple__3RNSx",
                hasGradientGreen: "SectionBuilder_hasGradientGreen__4WVg4",
                hasSmallGap: "SectionBuilder_hasSmallGap__sS1dV",
                container: "SectionBuilder_container__7ATnm",
                hasMediumGap: "SectionBuilder_hasMediumGap__A0W8a",
                hasLargeGap: "SectionBuilder_hasLargeGap__ARi1n",
                heading: "SectionBuilder_heading__AfPSG",
                blurb: "SectionBuilder_blurb__jUY7S",
                ctaElement: "SectionBuilder_ctaElement__CA_7s",
                content: "SectionBuilder_content__vrG8_",
                hasNoBackground: "SectionBuilder_hasNoBackground__zLHdD",
                ellipsesTop: "SectionBuilder_ellipsesTop__uldQQ",
                hasCyanBgColor: "SectionBuilder_hasCyanBgColor__PT_7_",
                hasStoneBgColor: "SectionBuilder_hasStoneBgColor__2tfkF",
                hasGradientGreenBgColor: "SectionBuilder_hasGradientGreenBgColor__niHb4",
                hasPluralBgColor: "SectionBuilder_hasPluralBgColor__YpH1P",
                ellipsesRight: "SectionBuilder_ellipsesRight__E2Ab0",
                ellipsesBottomLeft: "SectionBuilder_ellipsesBottomLeft__RKBGQ",
                ellipsesBottomRight: "SectionBuilder_ellipsesBottomRight__8quZw",
                hasLeftStarDecoration: "SectionBuilder_hasLeftStarDecoration__S_W2m",
                hasRightStarDecoration: "SectionBuilder_hasRightStarDecoration__NoKz0",
                hasLeftPuzzleDecoration: "SectionBuilder_hasLeftPuzzleDecoration__VJykz",
                hasRightPuzzleDecoration: "SectionBuilder_hasRightPuzzleDecoration__HN5Dk",
                hasPurpleBubblesDecoration: "SectionBuilder_hasPurpleBubblesDecoration__TvUGF",
                hasNoHeading: "SectionBuilder_hasNoHeading__Ra_Kw"
            }
        },
        47080: function(e) {
            e.exports = {
                component: "Agenda_component__wteEr",
                isBgBlack: "Agenda_isBgBlack__dMmZd",
                trackFilters: "Agenda_trackFilters__OU3O9",
                grid: "Agenda_grid__wCmLa",
                isFirstTrackVisible: "Agenda_isFirstTrackVisible__zrynW",
                secondTrack: "Agenda_secondTrack__pZ1yL",
                thirdTrack: "Agenda_thirdTrack___LU0R",
                isSecondTrackVisible: "Agenda_isSecondTrackVisible__G_o8n",
                firstTrack: "Agenda_firstTrack__dDt1w",
                isThirdTrackVisible: "Agenda_isThirdTrackVisible__ZLoLs",
                timelineItem: "Agenda_timelineItem__N7Tjf",
                timelineLabel: "Agenda_timelineLabel__0iFMn",
                slot: "Agenda_slot__sS_HL",
                isPast: "Agenda_isPast__f_wDZ"
            }
        },
        92883: function(e) {
            e.exports = {
                component: "Code_component__YQoL6"
            }
        },
        67417: function(e) {
            e.exports = {
                headline: "Heading_headline__Uaj7J",
                title: "Heading_title__tq_gQ",
                subtitle: "Heading_subtitle__Q1V_d",
                icon: "Heading_icon__L9o57",
                badge: "Heading_badge__R7arb",
                isSmall: "Heading_isSmall__yr_eK",
                isXSmall: "Heading_isXSmall__arA5x",
                isXXSmall: "Heading_isXXSmall__3I5dr",
                isLarge: "Heading_isLarge__rYJTo"
            }
        },
        37409: function(e) {
            e.exports = {
                component: "Mark_component__NoRwT"
            }
        },
        99425: function(e) {
            e.exports = {
                heading: "RichTextHeading_heading__EC4rt",
                anchorLink: "RichTextHeading_anchorLink__pIgqi",
                level1: "RichTextHeading_level1__tJb76"
            }
        },
        18891: function(e) {
            e.exports = {
                component: "ScribbleLine_component__EXJyY",
                isLight: "ScribbleLine_isLight__q8XAo",
                isWider: "ScribbleLine_isWider__1J_Ld",
                hasPatternB: "ScribbleLine_hasPatternB__jY_cD"
            }
        },
        48342: function(e) {
            e.exports = {
                tooltip: "Term_tooltip__8VNIW",
                component: "Term_component__tB36_",
                tooltipBubble: "Term_tooltipBubble__muCRN",
                term: "Term_term__m2QVf"
            }
        }
    },
    function(e) {
        e.O(0, [4027, 1846, 6344, 4854, 8890, 3156, 1126, 4993, 281, 5203, 9504, 6302, 4235, 3266, 6008, 1350, 8538, 7645, 9949, 3401, 1293, 5162, 1744], function() {
            return e(e.s = 22774)
        }), _N_E = e.O()
    }
]);
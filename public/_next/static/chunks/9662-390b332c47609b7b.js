(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [9662], {
        29662: function(e, a, i) {
            "use strict";
            i.d(a, {
                X: function() {
                    return A
                }
            });
            var t = i(27573);
            i(7653);
            var n = i(55932),
                s = i(22547),
                r = i(6074),
                l = i(29194),
                o = i(39014),
                c = i(70841),
                d = i(95770),
                u = i(67461),
                h = i(48455),
                _ = i(45531),
                g = i.n(_),
                B = i(23845),
                m = i(52155),
                b = i(86593),
                S = i.n(b);
            let p = e => {
                    let {
                        backgroundColor: a = u.YI.AuxiliaryLightGrey,
                        backgroundImage: i = null,
                        blurb: n,
                        breadcrumbsNavigation: s,
                        ctaButton: r,
                        decorationVariant: l = B.Uz.None,
                        heading: o,
                        headline: c,
                        hidePosterOnMedium: d = !0,
                        hidePosterOnSmall: h = !0,
                        poster: _
                    } = e, b = null !== a && (0, u.jn)(a), p = !!i, A = i ? (0, m.OX)(m.Uo.Large, i.src) : void 0;
                    return (0, t.jsxs)("div", {
                        className: g()({
                            [S().component]: !0,
                            [S().hasGreyBackground]: a === u.YI.AuxiliaryLightGrey,
                            [S().hasWhiteBackground]: a === u.YI.AuxiliaryWhite,
                            [S().hasStoneBackground]: a === u.YI.TertiaryStone,
                            [S().hasBlackBackground]: a === u.YI.AuxiliaryBlack,
                            [S().isDark]: b,
                            [S().hasHiddenPosterOnSmall]: h,
                            [S().hasHiddenPosterOnMedium]: d,
                            [S().hasBackgroundImage]: p,
                            [S().hasOrangeBubblesDecoration]: l === B.Uz.OrangeBubbles
                        }),
                        children: [p && (0, t.jsx)("div", {
                            className: S().backgroundImage,
                            style: {
                                "--bg-image": `url(${A})`
                            }
                        }), (0, t.jsxs)("div", {
                            className: S().container,
                            children: [(0, t.jsxs)("div", {
                                className: S().contentPart,
                                children: [s && (0, t.jsx)("div", {
                                    className: S().breadcrumbsNavigation,
                                    children: s
                                }), (0, t.jsx)("div", {
                                    className: S().headline,
                                    children: c
                                }), (0, t.jsx)("div", {
                                    className: S().heading,
                                    children: o
                                }), n && (0, t.jsx)("div", {
                                    className: S().blurb,
                                    children: n
                                }), r && (0, t.jsx)("div", {
                                    className: S().ctaButton,
                                    children: r
                                })]
                            }), _ && (0, t.jsx)("div", {
                                "aria-hidden": !0,
                                className: S().imagePart,
                                children: _
                            })]
                        })]
                    })
                },
                A = e => {
                    let {
                        blurb: a,
                        headerBadgeLabel: i,
                        headerTitle: _,
                        posterAlt: g,
                        primaryHref: B,
                        primaryHrefLabel: m,
                        secondaryHref: b,
                        secondaryHrefLabel: S
                    } = e;
                    return (0, t.jsx)(p, {
                        backgroundColor: u.YI.AuxiliaryWhite,
                        blurb: a,
                        ctaButton: (0, t.jsxs)(n.q, {
                            children: [(0, t.jsx)(s.Button, {
                                href: B,
                                iconLeft: (0, t.jsx)(r.e, {
                                    type: r.f.RightInBlackCircle
                                }),
                                size: [l.qE.Medium, l.qE.Large],
                                variant: l.Wu.Highlight,
                                children: m
                            }), b && (0, t.jsx)(s.Button, {
                                href: b,
                                iconLeft: (0, t.jsx)(o.d0, {
                                    type: o.MA.Article
                                }),
                                size: [l.qE.Medium, l.qE.Large],
                                variant: l.Wu.Outline,
                                children: S
                            })]
                        }),
                        heading: (0, t.jsx)(c.X6, {
                            badge: i && (0, t.jsx)(d.B, {
                                backgroundColor: u.YI.AuxiliaryNeutralBlue,
                                isWider: !0,
                                children: i
                            }),
                            title: _
                        }),
                        hidePosterOnMedium: !1,
                        hidePosterOnSmall: !1,
                        poster: (0, t.jsx)(h.default, {
                            alt: g,
                            height: 440,
                            lazyLoading: !1,
                            metadata: {
                                aspectRatio: 1.22,
                                width: 1080,
                                height: 880,
                                isOpaque: !1,
                                lqip: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAACXBIWXMAAAsTAAALEwEAmpwYAAADJklEQVQ4jX1Ta0/bSBQ9M/Y4sZ2EvENMQhI7Jg+/Ypo3CZAEpaUERAoNbRG0u0KqVGk/rdT/uf9jf8RqjMtCu9ojXV3bc+fo3HOvAQCe5xHTNLP1er2tG3qxqBWp6zr8CFQghBAwAIISo4/fHhMHASDyMzyH4ziiZds927b/sG17YZqmzIslOSoRQWThJR5SmH9ACN858b8wDEOwLMtyXfeD7/t9wzA4YQJACUAuqpKoM4onrH6sXGvJKUID4gKAJoAKgNgLUkmSSLVaVSzLynS7XVVV1QioUJLisX6hoQ39ZaU5vcjsHV+mvKPLVIHSgOwUwGcANwDGAOKhH4EhJJRP3q4OIKtgJVur6xN7Za96Nweb5nJ0mrHHp1vl1Ze8QmigfAPgG4DvAH4DUHzeNREEQYgnVApESbkeYZP39b3p3f5Z72Y0f7X2R+5Zx6lNnFR+V+EatkJVNwA+AVgCyOBnRBTKldJUnkUOzvPl+cddt7sZOp37d3Pvbj3TF5MdANEwNAAWAB1A+qdhBe0yQSTBerS6cfnoYqsyvcg09j8uPP/3D2/aV29Hab1cymms0O7H8nUnwgch8XqBUcjp5BOZGE40TWmQpcV1Rj7/kjMn55lO47itV45G9a1KuRyRqeaOY87JJvPq+KpQ1FxDVJ0ZHoZAbT5GolR8IsyGLfCcLFYjyuQsmTY9RctpYtoZyDv+VNWrLVnzZ5nG4abW98+dVmngZ2Pbed6+SBl7Whv+wOXnw93i5gaLzf3UO9nY8rborr9uT19/ypbNyV7KWR/WrPWJXjkc5Jiq8F4ThAR2vfBQCYmj0WhUVlUlGYlEFHO+H5/c+vbyoT08uasVS6M+M9fv5NbVStn22hKhVA3vvRjKD1KhUqkgkUjsKIryWpIkP283Ev7nS819f7LXPB1lawOTquJTPX0WvyAomM1mnHBXUZRLxtiAqYo8/PMba6xXCf3NQt6dDgOvqCiKVBSpkk0B5OWv/NxL4nkeJ4zKslxgjHF/aL4/Ru+iid79Et2H67D6v0l+gWEYSCaTUFUVjD367N1f4fvff6Fzf43u19v/JfwHnnxjFKXkhxEAAAAASUVORK5CYII="
                            },
                            src: "https://cdn.sanity.io/images/tkl0o0xu/production/0c358b2c08f2e36fd7aed0b0407bfad9077f73a6-1080x880.png",
                            width: 540
                        })
                    })
                }
        },
        23845: function(e, a, i) {
            "use strict";
            i.d(a, {
                N: function() {
                    return g
                },
                Uz: function() {
                    return s
                },
                tj: function() {
                    return r
                }
            });
            var t, n, s, r, l = i(27573),
                o = i(45531),
                c = i.n(o);
            i(7653);
            var d = i(39666),
                u = i(67461),
                h = i(16312),
                _ = i.n(h);
            (t = s || (s = {})).None = "none", t.LeftPuzzle = "left-puzzle", t.LeftStar = "left-star", t.RightPuzzle = "right-puzzle", t.RightStar = "right-star", t.PurpleBubbles = "purple-bubbles", t.OrangeBubbles = "orange-bubble", t.TwoBubbles = "two-bubbles", t.ThreeBubbles = "three-bubbles", t.ThreeLeftRightBottomBubbles = "three-left-right-bottom-bubbles", (n = r || (r = {})).NoGap = "no-gap", n.Small = "small", n.Medium = "medium", n.Large = "large";
            let g = e => {
                let {
                    anchor: a = null,
                    backgroundColor: i = null,
                    backgroundImage: t,
                    blurb: n,
                    children: s,
                    decorationVariant: r = "none",
                    filter: o,
                    gaps: h = "no-gap",
                    heading: g,
                    isSticky: B = !1,
                    leadingCtaElement: m,
                    trailingCtaElement: b
                } = e, S = null !== i && (0, u.jn)(i), p = i === u.YI.GradientLimeTurquoiseDeepPurple, A = "two-bubbles" === r || "three-bubbles" === r || "three-left-right-bottom-bubbles" === r;
                return (0, l.jsxs)("section", {
                    className: c()({
                        [_().component]: !0,
                        [_().hasHeading]: g,
                        [_().hasNoHeading]: !g,
                        [_().hasBackgroundImage]: !!t,
                        [_().isDark]: S,
                        [_().isSticky]: B,
                        [_().isLight]: !S,
                        [_().hasSmallGap]: "small" === h,
                        [_().hasMediumGap]: "medium" === h,
                        [_().hasLargeGap]: "large" === h,
                        [_().hasNoBackground]: !i || i === u.YI.AuxiliaryWhite,
                        [_().hasGradientLimeTurquoiseDeepPurple]: i === u.YI.GradientLimeTurquoiseDeepPurple,
                        [_().hasGradientGreen]: i === u.YI.GradientGreen,
                        [_().hasLeftPuzzleDecoration]: "left-puzzle" === r,
                        [_().hasLeftStarDecoration]: "left-star" === r,
                        [_().hasRightStarDecoration]: "right-star" === r,
                        [_().hasRightPuzzleDecoration]: "right-puzzle" === r,
                        [_().hasPurpleBubblesDecoration]: "purple-bubbles" === r
                    }),
                    id: null != a ? a : void 0,
                    style: {
                        "--bg": i && !p ? (0, u.Lq)(i) : void 0,
                        backgroundImage: t ? `url(${t})` : void 0
                    },
                    children: [A && (0, l.jsxs)("div", {
                        className: c()({
                            [_().ellipses]: !0,
                            [_().hasCyanBgColor]: i === u.YI.AuxiliaryDarkCyan,
                            [_().hasStoneBgColor]: i === u.YI.TertiaryStone,
                            [_().hasGradientGreenBgColor]: i === u.YI.GradientGreen,
                            [_().hasPluralBgColor]: i === u.YI.PrimaryPurple
                        }),
                        children: [A && (0, l.jsx)("div", {
                            className: _().ellipsesTop
                        }), ("two-bubbles" === r || "three-bubbles" === r || "three-left-right-bottom-bubbles" === r) && (0, l.jsx)("div", {
                            className: _().ellipsesRight
                        }), "three-bubbles" === r && (0, l.jsx)("div", {
                            className: _().ellipsesBottomLeft
                        }), "three-left-right-bottom-bubbles" === r && (0, l.jsx)("div", {
                            className: _().ellipsesBottomRight
                        })]
                    }), (0, l.jsxs)("div", {
                        className: _().container,
                        children: [g && (0, l.jsx)("div", {
                            className: _().heading,
                            children: g
                        }), n && (0, l.jsx)("div", {
                            className: _().blurb,
                            children: (0, l.jsx)(d.H, {
                                children: n
                            })
                        }), m && (0, l.jsx)("div", {
                            className: _().ctaElement,
                            children: m
                        }), o && (0, l.jsx)("div", {
                            className: _().content,
                            children: o
                        }), s && (0, l.jsx)("div", {
                            className: _().content,
                            children: s
                        }), b && (0, l.jsx)("div", {
                            className: _().ctaElement,
                            children: b
                        })]
                    })]
                })
            }
        },
        70841: function(e, a, i) {
            "use strict";
            i.d(a, {
                X6: function() {
                    return _
                },
                y5: function() {
                    return r
                }
            });
            var t, n, s, r, l = i(27573),
                o = i(45531),
                c = i.n(o);
            i(7653);
            var d = i(82317),
                u = i(67417),
                h = i.n(u);
            (t = s || (s = {})).Always = "always", t.Never = "never", t.OnMobiles = "small-only", t.OnMobilesAndTablets = "medium-and-small", (n = r || (r = {})).H1 = "h1", n.H2 = "h2", n.H3 = "h3", n.H4 = "h4";
            let _ = e => {
                let {
                    badge: a,
                    centerAlignment: i = "never",
                    headline: t,
                    icon: n,
                    level: s = "h1",
                    subtitle: r,
                    title: o,
                    titleHref: u
                } = e;
                return (0, l.jsxs)("div", {
                    className: c()({
                        [h().component]: !0,
                        [h().centeredOnSmall]: "always" === i || "small-only" === i || "medium-and-small" === i,
                        [h().centeredOnMedium]: "always" === i || "medium-and-small" === i,
                        [h().centeredOnLarge]: "always" === i,
                        [h().isLarge]: "h1" === s,
                        [h().isSmall]: "h2" === s,
                        [h().isXSmall]: "h3" === s,
                        [h().isXXSmall]: "h4" === s
                    }),
                    children: [a && (0, l.jsx)("div", {
                        className: h().badge,
                        children: a
                    }), t && (0, l.jsx)("div", {
                        className: h().headline,
                        children: t
                    }), (0, l.jsxs)(s, {
                        className: h().title,
                        children: [u && (0, l.jsxs)(d.l, {
                            href: u,
                            children: [n && (0, l.jsx)("span", {
                                className: h().icon,
                                children: n
                            }), o]
                        }), !u && (0, l.jsxs)(l.Fragment, {
                            children: [n && (0, l.jsx)("span", {
                                className: h().icon,
                                children: n
                            }), o]
                        })]
                    }), r && (0, l.jsx)({
                        h1: "h2",
                        h2: "h3",
                        h3: "h4",
                        h4: "h5"
                    }[s], {
                        className: h().subtitle,
                        children: r
                    })]
                })
            }
        },
        95770: function(e, a, i) {
            "use strict";
            i.d(a, {
                B: function() {
                    return u
                }
            });
            var t, n, s = i(27573),
                r = i(45531),
                l = i.n(r);
            i(7653);
            var o = i(67461),
                c = i(18891),
                d = i.n(c);
            (t = n || (n = {})).PatternA = "a", t.PatternB = "b";
            let u = e => {
                let {
                    backgroundColor: a,
                    children: i,
                    color: t,
                    isWider: n = !1,
                    patternVariant: r = "a"
                } = e, c = (0, o.jn)(a);
                return a === o.YI.SecondaryTurquoise && (c = !0), (0, s.jsx)("strong", {
                    className: l()({
                        [d().component]: !0,
                        [d().isDark]: c,
                        [d().isLight]: !c,
                        [d().isWider]: n,
                        [d().hasPatternA]: "a" === r,
                        [d().hasPatternB]: "b" === r
                    }),
                    style: {
                        "--bg": (0, o.Lq)(a),
                        color: t ? (0, o.Lq)(t) : void 0
                    },
                    children: i
                })
            }
        },
        86593: function(e) {
            e.exports = {
                component: "MastheadBasicSectionBuilder_component__PAEKz",
                isDark: "MastheadBasicSectionBuilder_isDark__XeRVc",
                hasGreyBackground: "MastheadBasicSectionBuilder_hasGreyBackground___7vf8",
                hasWhiteBackground: "MastheadBasicSectionBuilder_hasWhiteBackground__uKuta",
                hasStoneBackground: "MastheadBasicSectionBuilder_hasStoneBackground__PoFYY",
                hasBlackBackground: "MastheadBasicSectionBuilder_hasBlackBackground__REYti",
                container: "MastheadBasicSectionBuilder_container__fW6jh",
                breadcrumbsNavigation: "MastheadBasicSectionBuilder_breadcrumbsNavigation__m6nTm",
                headline: "MastheadBasicSectionBuilder_headline__5koeM",
                blurb: "MastheadBasicSectionBuilder_blurb__qtn47",
                ctaButton: "MastheadBasicSectionBuilder_ctaButton__g1Y_6",
                imagePart: "MastheadBasicSectionBuilder_imagePart__0sbMU",
                hasHiddenPosterOnSmall: "MastheadBasicSectionBuilder_hasHiddenPosterOnSmall__Wy_0y",
                hasHiddenPosterOnMedium: "MastheadBasicSectionBuilder_hasHiddenPosterOnMedium__fe8kP",
                hasOrangeBubblesDecoration: "MastheadBasicSectionBuilder_hasOrangeBubblesDecoration__zFPiS",
                backgroundImage: "MastheadBasicSectionBuilder_backgroundImage__8t_EI",
                contentPart: "MastheadBasicSectionBuilder_contentPart__gm0np",
                hasBackgroundImage: "MastheadBasicSectionBuilder_hasBackgroundImage__mk2Ss"
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
        18891: function(e) {
            e.exports = {
                component: "ScribbleLine_component__EXJyY",
                isLight: "ScribbleLine_isLight__q8XAo",
                isWider: "ScribbleLine_isWider__1J_Ld",
                hasPatternB: "ScribbleLine_hasPatternB__jY_cD"
            }
        }
    }
]);
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [2372], {
        22620: function(e, t, i) {
            Promise.resolve().then(i.t.bind(i, 65469, 23)), Promise.resolve().then(i.bind(i, 897)), Promise.resolve().then(i.bind(i, 30697)), Promise.resolve().then(i.bind(i, 16280)), Promise.resolve().then(i.bind(i, 12634)), Promise.resolve().then(i.bind(i, 68744)), Promise.resolve().then(i.bind(i, 22547)), Promise.resolve().then(i.bind(i, 47393)), Promise.resolve().then(i.bind(i, 2846)), Promise.resolve().then(i.bind(i, 29140)), Promise.resolve().then(i.bind(i, 13324)), Promise.resolve().then(i.bind(i, 48455)), Promise.resolve().then(i.bind(i, 77607)), Promise.resolve().then(i.bind(i, 12097)), Promise.resolve().then(i.bind(i, 57320)), Promise.resolve().then(i.bind(i, 10400)), Promise.resolve().then(i.bind(i, 60095)), Promise.resolve().then(i.t.bind(i, 99707, 23)), Promise.resolve().then(i.bind(i, 79492)), Promise.resolve().then(i.bind(i, 37391)), Promise.resolve().then(i.bind(i, 19730)), Promise.resolve().then(i.bind(i, 40081)), Promise.resolve().then(i.bind(i, 58358)), Promise.resolve().then(i.bind(i, 6889)), Promise.resolve().then(i.bind(i, 39252)), Promise.resolve().then(i.bind(i, 52060)), Promise.resolve().then(i.bind(i, 73099)), Promise.resolve().then(i.bind(i, 51410)), Promise.resolve().then(i.bind(i, 94938)), Promise.resolve().then(i.bind(i, 14535)), Promise.resolve().then(i.bind(i, 27404)), Promise.resolve().then(i.bind(i, 20523)), Promise.resolve().then(i.t.bind(i, 15545, 17)), Promise.resolve().then(i.t.bind(i, 79321, 17)), Promise.resolve().then(i.t.bind(i, 72037, 17)), Promise.resolve().then(i.t.bind(i, 78951, 17)), Promise.resolve().then(i.t.bind(i, 74289, 17)), Promise.resolve().then(i.bind(i, 46282)), Promise.resolve().then(i.bind(i, 71500)), Promise.resolve().then(i.bind(i, 81521)), Promise.resolve().then(i.bind(i, 2198)), Promise.resolve().then(i.bind(i, 4645)), Promise.resolve().then(i.bind(i, 91362)), Promise.resolve().then(i.bind(i, 62040)), Promise.resolve().then(i.bind(i, 60699)), Promise.resolve().then(i.bind(i, 22358)), Promise.resolve().then(i.bind(i, 40513)), Promise.resolve().then(i.bind(i, 70936))
        },
        23845: function(e, t, i) {
            "use strict";
            i.d(t, {
                N: function() {
                    return b
                },
                Uz: function() {
                    return o
                },
                tj: function() {
                    return l
                }
            });
            var r, a, o, l, s = i(27573),
                n = i(45531),
                d = i.n(n);
            i(7653);
            var u = i(39666),
                m = i(67461),
                c = i(16312),
                h = i.n(c);
            (r = o || (o = {})).None = "none", r.LeftPuzzle = "left-puzzle", r.LeftStar = "left-star", r.RightPuzzle = "right-puzzle", r.RightStar = "right-star", r.PurpleBubbles = "purple-bubbles", r.OrangeBubbles = "orange-bubble", r.TwoBubbles = "two-bubbles", r.ThreeBubbles = "three-bubbles", r.ThreeLeftRightBottomBubbles = "three-left-right-bottom-bubbles", (a = l || (l = {})).NoGap = "no-gap", a.Small = "small", a.Medium = "medium", a.Large = "large";
            let b = e => {
                let {
                    anchor: t = null,
                    backgroundColor: i = null,
                    backgroundImage: r,
                    blurb: a,
                    children: o,
                    decorationVariant: l = "none",
                    filter: n,
                    gaps: c = "no-gap",
                    heading: b,
                    isSticky: g = !1,
                    leadingCtaElement: _,
                    trailingCtaElement: p
                } = e, v = null !== i && (0, m.jn)(i), B = i === m.YI.GradientLimeTurquoiseDeepPurple, S = "two-bubbles" === l || "three-bubbles" === l || "three-left-right-bottom-bubbles" === l;
                return (0, s.jsxs)("section", {
                    className: d()({
                        [h().component]: !0,
                        [h().hasHeading]: b,
                        [h().hasNoHeading]: !b,
                        [h().hasBackgroundImage]: !!r,
                        [h().isDark]: v,
                        [h().isSticky]: g,
                        [h().isLight]: !v,
                        [h().hasSmallGap]: "small" === c,
                        [h().hasMediumGap]: "medium" === c,
                        [h().hasLargeGap]: "large" === c,
                        [h().hasNoBackground]: !i || i === m.YI.AuxiliaryWhite,
                        [h().hasGradientLimeTurquoiseDeepPurple]: i === m.YI.GradientLimeTurquoiseDeepPurple,
                        [h().hasGradientGreen]: i === m.YI.GradientGreen,
                        [h().hasLeftPuzzleDecoration]: "left-puzzle" === l,
                        [h().hasLeftStarDecoration]: "left-star" === l,
                        [h().hasRightStarDecoration]: "right-star" === l,
                        [h().hasRightPuzzleDecoration]: "right-puzzle" === l,
                        [h().hasPurpleBubblesDecoration]: "purple-bubbles" === l
                    }),
                    id: null != t ? t : void 0,
                    style: {
                        "--bg": i && !B ? (0, m.Lq)(i) : void 0,
                        backgroundImage: r ? `url(${r})` : void 0
                    },
                    children: [S && (0, s.jsxs)("div", {
                        className: d()({
                            [h().ellipses]: !0,
                            [h().hasCyanBgColor]: i === m.YI.AuxiliaryDarkCyan,
                            [h().hasStoneBgColor]: i === m.YI.TertiaryStone,
                            [h().hasGradientGreenBgColor]: i === m.YI.GradientGreen,
                            [h().hasPluralBgColor]: i === m.YI.PrimaryPurple
                        }),
                        children: [S && (0, s.jsx)("div", {
                            className: h().ellipsesTop
                        }), ("two-bubbles" === l || "three-bubbles" === l || "three-left-right-bottom-bubbles" === l) && (0, s.jsx)("div", {
                            className: h().ellipsesRight
                        }), "three-bubbles" === l && (0, s.jsx)("div", {
                            className: h().ellipsesBottomLeft
                        }), "three-left-right-bottom-bubbles" === l && (0, s.jsx)("div", {
                            className: h().ellipsesBottomRight
                        })]
                    }), (0, s.jsxs)("div", {
                        className: h().container,
                        children: [b && (0, s.jsx)("div", {
                            className: h().heading,
                            children: b
                        }), a && (0, s.jsx)("div", {
                            className: h().blurb,
                            children: (0, s.jsx)(u.H, {
                                children: a
                            })
                        }), _ && (0, s.jsx)("div", {
                            className: h().ctaElement,
                            children: _
                        }), n && (0, s.jsx)("div", {
                            className: h().content,
                            children: n
                        }), o && (0, s.jsx)("div", {
                            className: h().content,
                            children: o
                        }), p && (0, s.jsx)("div", {
                            className: h().ctaElement,
                            children: p
                        })]
                    })]
                })
            }
        },
        40513: function(e, t, i) {
            "use strict";
            i.d(t, {
                default: function() {
                    return b
                }
            });
            var r = i(27573),
                a = i(7653),
                o = i(67461),
                l = i(23845);
            let s = e => {
                let {
                    anchor: t = null,
                    children: i,
                    gaps: a = l.tj.Small
                } = e;
                return (0, r.jsx)(l.N, {
                    anchor: null != t ? t : "",
                    backgroundColor: o.YI.TertiaryStone,
                    gaps: a,
                    isSticky: !0,
                    children: i
                })
            };
            var n = i(39252),
                d = i(57320),
                u = i(26918),
                m = i(61735),
                c = i.n(m),
                h = i(67754),
                b = e => {
                    let {
                        items: t,
                        language: i
                    } = e, {
                        t: o
                    } = (0, u.E)(i, ["common"]), {
                        handleLetterChanged: m,
                        links: b,
                        selectedLinkKey: g
                    } = function(e) {
                        let {
                            items: t
                        } = e, i = (0, h.useRouter)(), [r, o] = (0, a.useState)(void 0), l = (0, a.useMemo)(() => {
                            let e = [];
                            for (let [i] of t) e.push({
                                targetId: i.toLowerCase(),
                                key: i.toLowerCase(),
                                label: i.toUpperCase()
                            });
                            return e
                        }, [t]);
                        return (0, a.useEffect)(() => {
                            let e = document.querySelectorAll("[class^=GlossaryArticlesGroup_component]"),
                                t = c()(() => {
                                    let t = function(e) {
                                        for (let t of e) {
                                            let e = t.getBoundingClientRect(),
                                                i = e.top,
                                                r = e.bottom;
                                            if (i >= 0 && i <= window.innerHeight || i < 0 && r - 170 >= 0 && r - 170 <= window.innerHeight) return t
                                        }
                                        return null
                                    }(e);
                                    t && o(t.id)
                                }, 16);
                            return window.addEventListener("scroll", t), () => {
                                window.removeEventListener("scroll", t)
                            }
                        }, []), {
                            links: l,
                            selectedLinkKey: r,
                            handleLetterChanged: (0, a.useCallback)(e => {
                                i.push(`#${null==e?void 0:e.toString()}`), o(null == e ? void 0 : e.toString())
                            }, [i])
                        }
                    }({
                        items: t
                    });
                    return (0, r.jsxs)(s, {
                        gaps: l.tj.NoGap,
                        children: [(0, r.jsx)(n.ScrollOffset, {
                            topOffset: [154, 224, 174]
                        }), (0, r.jsx)(d.GlossaryNavigation, {
                            ariaLabel: o("common.scroll_to"),
                            links: b,
                            onChange: m,
                            selectedLinkKey: g
                        })]
                    })
                }
        },
        46282: function(e, t, i) {
            "use strict";
            i.r(t), i.d(t, {
                default: function() {
                    return j
                }
            });
            var r, a, o, l, s, n, d, u, m, c, h, b, g = i(27573),
                _ = i(45531),
                p = i.n(_);
            i(7653);
            var v = i(27870),
                B = i.n(v);
            (r = d || (d = {})).Colorful = "colorful", r.Dark = "dark", r.Light = "light";
            let S = e => {
                let {
                    ariaLabel: t,
                    starsCount: i = 5,
                    starsRating: r,
                    variant: a = "dark"
                } = e;
                return (0, g.jsxs)("div", {
                    "aria-label": t,
                    className: p()({
                        [B().component]: !0,
                        [B().isColorful]: "colorful" === a,
                        [B().isDark]: "dark" === a,
                        [B().isLight]: "light" === a
                    }),
                    children: [(0, g.jsx)("div", {
                        "aria-hidden": !0,
                        className: B().topStarsGroup,
                        style: {
                            width: `${r/i*100}%`
                        },
                        children: Array.from(Array(i)).map((e, t) => (0, g.jsx)("span", {
                            className: B().star,
                            children: "★"
                        }, `${t}-star-top`))
                    }), (0, g.jsx)("div", {
                        "aria-hidden": !0,
                        className: B().bottomStarsGroup,
                        children: Array.from(Array(i)).map((e, t) => (0, g.jsx)("span", {
                            className: B().star,
                            children: "☆"
                        }, `${t}-star-bottom`))
                    })]
                })
            };
            var f = i(48455),
                P = i(96874),
                k = i.n(P);
            (a = u || (u = {})).Small = "small", a.Medium = "medium", a.Responsive = "responsive";
            let L = e => {
                let {
                    ariaLabel: t,
                    ariaLabelRatingStars: i,
                    lazyLoading: r,
                    logo: a,
                    size: o = "responsive",
                    stars: l,
                    variant: s = d.Dark
                } = e;
                return (0, g.jsxs)("div", {
                    "aria-label": t,
                    className: p()({
                        [k().component]: !0,
                        [k().isSmall]: "small" === o,
                        [k().isMedium]: "medium" === o,
                        [k().isResponsive]: "responsive" === o
                    }),
                    children: [(0, g.jsx)("div", {
                        className: k().logo,
                        children: (0, g.jsx)(f.default, {
                            alt: a.alt,
                            height: 65,
                            lazyLoading: r,
                            metadata: a.metadata,
                            src: a.src,
                            width: 180
                        })
                    }), (0, g.jsx)("div", {
                        className: k().ratingStars,
                        children: (0, g.jsx)(S, {
                            ariaLabel: i,
                            starsRating: l,
                            variant: s
                        })
                    })]
                })
            };
            var R = i(28534),
                x = i.n(R);
            (o = m || (m = {})).Dark = "dark", o.Light = "light", (l = c || (c = {})).Small = "small", l.Medium = "medium", l.Responsive = "responsive";
            let w = e => {
                var t, i;
                let {
                    ariaLabel: r,
                    lazyLoading: a,
                    logo: o,
                    size: l = "responsive",
                    title: s,
                    variant: n = "dark"
                } = e, d = null !== (i = null === (t = o.metadata) || void 0 === t ? void 0 : t.aspectRatio) && void 0 !== i ? i : 1;
                return (0, g.jsxs)("div", {
                    "aria-label": r,
                    className: p()({
                        [x().component]: !0,
                        [x().isSmall]: "small" === l,
                        [x().isMedium]: "medium" === l,
                        [x().isResponsive]: "responsive" === l,
                        [x().isDark]: "dark" === n,
                        [x().isLight]: "light" === n
                    }),
                    children: [(0, g.jsx)("div", {
                        className: x().logo,
                        children: (0, g.jsx)(f.default, {
                            alt: o.alt,
                            aspectRatio: d,
                            lazyLoading: a,
                            metadata: o.metadata,
                            src: o.src,
                            width: 180
                        })
                    }), d > 1.5 && (0, g.jsx)("div", {
                        className: x().title,
                        children: s
                    })]
                })
            };
            var G = i(7329),
                N = i(26918);
            (s = h || (h = {})).Colorful = "colorful", s.Dark = "dark", s.Light = "light", (n = b || (b = {})).Small = "small", n.Medium = "medium", n.Responsive = "responsive";
            var j = e => {
                let {
                    accolade: t,
                    language: i,
                    lazyLoading: r,
                    size: a = b.Responsive,
                    variant: o = h.Dark
                } = e, {
                    t: l
                } = (0, N.E)(i, ["common"]), s = (0, G.V)(a);
                if ("rating" === t.type) {
                    let e = {
                            [h.Colorful]: d.Colorful,
                            [h.Dark]: d.Dark,
                            [h.Light]: d.Light
                        }[o],
                        i = {
                            [b.Small]: u.Small,
                            [b.Medium]: u.Medium,
                            [b.Responsive]: u.Responsive
                        }[s];
                    return (0, g.jsx)(L, {
                        ariaLabel: `${t.organizationName} - ${t.score}/${t.scale}`,
                        ariaLabelRatingStars: l("common.rating.badge.aria_label", {
                            stars_rating: t.stars,
                            stars_count: 5
                        }),
                        lazyLoading: r,
                        logo: t.badge,
                        size: i,
                        stars: t.stars,
                        variant: e
                    })
                }
                if ("award" === t.type) {
                    let e = {
                            [h.Colorful]: m.Dark,
                            [h.Dark]: m.Dark,
                            [h.Light]: m.Light
                        }[o],
                        i = {
                            [b.Small]: c.Small,
                            [b.Medium]: c.Medium,
                            [b.Responsive]: c.Responsive
                        }[s];
                    return (0, g.jsx)(w, {
                        ariaLabel: `${t.organizationName} - ${t.awardName}`,
                        lazyLoading: r,
                        logo: t.badge,
                        size: i,
                        title: t.awardName,
                        variant: e
                    })
                }
                return (0, g.jsx)(g.Fragment, {
                    children: "why"
                })
            }
        },
        22358: function(e, t, i) {
            "use strict";
            var r = i(27573),
                a = i(7653),
                o = i(82392),
                l = i(76362),
                s = i(13324),
                n = i(1900),
                d = i(950),
                u = i(2198),
                m = i(26918),
                c = i(17098);
            t.default = function(e) {
                let {
                    blurb: t,
                    gatedForm: i,
                    language: h,
                    title: b
                } = e, {
                    t: g
                } = (0, m.E)(h, ["templates", "common"]), _ = "label" in i.reward ? i.reward.label : null, p = null != _ ? _ : ({
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
                })[i.reward.type], v = (0, a.useCallback)(() => {
                    var e, a, s, n;
                    return (0, r.jsx)(o.b, {
                        ariaLabelButtonCloseWidget: g("common.block.widget.button.close.aria_label", {
                            ns: "common"
                        }),
                        description: null !== (s = null === (e = i.confirmation) || void 0 === e ? void 0 : e.blurb) && void 0 !== s ? s : t,
                        form: (0, r.jsx)(l.H, {
                            ctaButton: (0, r.jsx)(u.default, {
                                language: h,
                                reward: i.reward
                            }),
                            variant: l.x.Light
                        }),
                        title: null !== (n = null === (a = i.confirmation) || void 0 === a ? void 0 : a.title) && void 0 !== n ? n : b
                    })
                }, [t, i, h, g, b]), B = (0, a.useCallback)(() => {
                    "redirect" === i.reward.type && window.location.replace(i.reward.href)
                }, [i]);
                return null === i.marketoFormId ? v() : (0, r.jsx)(s.MarketoForm, {
                    defaultValues: {
                        rewardResource: i.reward.resource,
                        rewardLanguage: null != h ? h : d.SQ.English
                    },
                    formId: i.marketoFormId,
                    marketoBaseUrl: c.O.marketoBaseUrl(),
                    onFinish: B,
                    children: e => {
                        let {
                            isFinished: i,
                            isLoading: a,
                            renderForm: l
                        } = e;
                        return a ? (0, r.jsx)(o.b, {
                            ariaLabelButtonCloseWidget: g("common.block.widget.button.close.aria_label", {
                                ns: "common"
                            }),
                            collapsedWidgetButtonLabel: p,
                            description: t,
                            form: (0, r.jsx)(n.T, {
                                variant: n.C.Light
                            }),
                            title: b
                        }) : i ? v() : (0, r.jsx)(o.b, {
                            ariaLabelButtonCloseWidget: g("common.block.widget.button.close.aria_label", {
                                ns: "common"
                            }),
                            collapsedWidgetButtonLabel: p,
                            description: t,
                            form: l(),
                            title: b
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
        99707: function(e) {
            e.exports = {
                component: "RelatedPagesNavigation_component__B0L3q",
                link: "RelatedPagesNavigation_link__zgH5y"
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
        }
    },
    function(e) {
        e.O(0, [4027, 1846, 6344, 4854, 8890, 3156, 1126, 4993, 281, 5203, 6302, 4235, 3266, 6008, 8538, 7645, 9949, 3401, 1293, 5162, 1744], function() {
            return e(e.s = 22620)
        }), _N_E = e.O()
    }
]);
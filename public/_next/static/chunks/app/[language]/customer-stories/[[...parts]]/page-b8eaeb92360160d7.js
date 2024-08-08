(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [2443, 7772, 2563, 3539, 4370], {
        17572: function(e, r, i) {
            Promise.resolve().then(i.t.bind(i, 65469, 23)), Promise.resolve().then(i.bind(i, 897)), Promise.resolve().then(i.bind(i, 30697)), Promise.resolve().then(i.bind(i, 16280)), Promise.resolve().then(i.bind(i, 12634)), Promise.resolve().then(i.bind(i, 68744)), Promise.resolve().then(i.bind(i, 22547)), Promise.resolve().then(i.bind(i, 47393)), Promise.resolve().then(i.bind(i, 2846)), Promise.resolve().then(i.bind(i, 29140)), Promise.resolve().then(i.bind(i, 13324)), Promise.resolve().then(i.bind(i, 48455)), Promise.resolve().then(i.bind(i, 77607)), Promise.resolve().then(i.bind(i, 12097)), Promise.resolve().then(i.bind(i, 57320)), Promise.resolve().then(i.bind(i, 10400)), Promise.resolve().then(i.bind(i, 60095)), Promise.resolve().then(i.bind(i, 79492)), Promise.resolve().then(i.bind(i, 37391)), Promise.resolve().then(i.bind(i, 19730)), Promise.resolve().then(i.bind(i, 40081)), Promise.resolve().then(i.bind(i, 58358)), Promise.resolve().then(i.bind(i, 6889)), Promise.resolve().then(i.bind(i, 39252)), Promise.resolve().then(i.bind(i, 52060)), Promise.resolve().then(i.bind(i, 73099)), Promise.resolve().then(i.bind(i, 51410)), Promise.resolve().then(i.bind(i, 94938)), Promise.resolve().then(i.bind(i, 14535)), Promise.resolve().then(i.bind(i, 27404)), Promise.resolve().then(i.bind(i, 20523)), Promise.resolve().then(i.t.bind(i, 15545, 17)), Promise.resolve().then(i.t.bind(i, 79321, 17)), Promise.resolve().then(i.t.bind(i, 72037, 17)), Promise.resolve().then(i.t.bind(i, 78951, 17)), Promise.resolve().then(i.t.bind(i, 74289, 17)), Promise.resolve().then(i.bind(i, 46282)), Promise.resolve().then(i.bind(i, 71500)), Promise.resolve().then(i.bind(i, 81521)), Promise.resolve().then(i.bind(i, 2198)), Promise.resolve().then(i.bind(i, 4645)), Promise.resolve().then(i.bind(i, 91362)), Promise.resolve().then(i.bind(i, 62040)), Promise.resolve().then(i.bind(i, 60699)), Promise.resolve().then(i.bind(i, 22358)), Promise.resolve().then(i.bind(i, 70936))
        },
        46282: function(e, r, i) {
            "use strict";
            i.r(r), i.d(r, {
                default: function() {
                    return C
                }
            });
            var a, s, o, t, n, l, d, m, v, u, c, b, h = i(27573),
                g = i(45531),
                p = i.n(g);
            i(7653);
            var _ = i(27870),
                P = i.n(_);
            (a = d || (d = {})).Colorful = "colorful", a.Dark = "dark", a.Light = "light";
            let k = e => {
                let {
                    ariaLabel: r,
                    starsCount: i = 5,
                    starsRating: a,
                    variant: s = "dark"
                } = e;
                return (0, h.jsxs)("div", {
                    "aria-label": r,
                    className: p()({
                        [P().component]: !0,
                        [P().isColorful]: "colorful" === s,
                        [P().isDark]: "dark" === s,
                        [P().isLight]: "light" === s
                    }),
                    children: [(0, h.jsx)("div", {
                        "aria-hidden": !0,
                        className: P().topStarsGroup,
                        style: {
                            width: `${a/i*100}%`
                        },
                        children: Array.from(Array(i)).map((e, r) => (0, h.jsx)("span", {
                            className: P().star,
                            children: "★"
                        }, `${r}-star-top`))
                    }), (0, h.jsx)("div", {
                        "aria-hidden": !0,
                        className: P().bottomStarsGroup,
                        children: Array.from(Array(i)).map((e, r) => (0, h.jsx)("span", {
                            className: P().star,
                            children: "☆"
                        }, `${r}-star-bottom`))
                    })]
                })
            };
            var f = i(48455),
                w = i(96874),
                R = i.n(w);
            (s = m || (m = {})).Small = "small", s.Medium = "medium", s.Responsive = "responsive";
            let x = e => {
                let {
                    ariaLabel: r,
                    ariaLabelRatingStars: i,
                    lazyLoading: a,
                    logo: s,
                    size: o = "responsive",
                    stars: t,
                    variant: n = d.Dark
                } = e;
                return (0, h.jsxs)("div", {
                    "aria-label": r,
                    className: p()({
                        [R().component]: !0,
                        [R().isSmall]: "small" === o,
                        [R().isMedium]: "medium" === o,
                        [R().isResponsive]: "responsive" === o
                    }),
                    children: [(0, h.jsx)("div", {
                        className: R().logo,
                        children: (0, h.jsx)(f.default, {
                            alt: s.alt,
                            height: 65,
                            lazyLoading: a,
                            metadata: s.metadata,
                            src: s.src,
                            width: 180
                        })
                    }), (0, h.jsx)("div", {
                        className: R().ratingStars,
                        children: (0, h.jsx)(k, {
                            ariaLabel: i,
                            starsRating: t,
                            variant: n
                        })
                    })]
                })
            };
            var L = i(28534),
                S = i.n(L);
            (o = v || (v = {})).Dark = "dark", o.Light = "light", (t = u || (u = {})).Small = "small", t.Medium = "medium", t.Responsive = "responsive";
            let B = e => {
                var r, i;
                let {
                    ariaLabel: a,
                    lazyLoading: s,
                    logo: o,
                    size: t = "responsive",
                    title: n,
                    variant: l = "dark"
                } = e, d = null !== (i = null === (r = o.metadata) || void 0 === r ? void 0 : r.aspectRatio) && void 0 !== i ? i : 1;
                return (0, h.jsxs)("div", {
                    "aria-label": a,
                    className: p()({
                        [S().component]: !0,
                        [S().isSmall]: "small" === t,
                        [S().isMedium]: "medium" === t,
                        [S().isResponsive]: "responsive" === t,
                        [S().isDark]: "dark" === l,
                        [S().isLight]: "light" === l
                    }),
                    children: [(0, h.jsx)("div", {
                        className: S().logo,
                        children: (0, h.jsx)(f.default, {
                            alt: o.alt,
                            aspectRatio: d,
                            lazyLoading: s,
                            metadata: o.metadata,
                            src: o.src,
                            width: 180
                        })
                    }), d > 1.5 && (0, h.jsx)("div", {
                        className: S().title,
                        children: n
                    })]
                })
            };
            var j = i(7329),
                N = i(26918);
            (n = c || (c = {})).Colorful = "colorful", n.Dark = "dark", n.Light = "light", (l = b || (b = {})).Small = "small", l.Medium = "medium", l.Responsive = "responsive";
            var C = e => {
                let {
                    accolade: r,
                    language: i,
                    lazyLoading: a,
                    size: s = b.Responsive,
                    variant: o = c.Dark
                } = e, {
                    t
                } = (0, N.E)(i, ["common"]), n = (0, j.V)(s);
                if ("rating" === r.type) {
                    let e = {
                            [c.Colorful]: d.Colorful,
                            [c.Dark]: d.Dark,
                            [c.Light]: d.Light
                        }[o],
                        i = {
                            [b.Small]: m.Small,
                            [b.Medium]: m.Medium,
                            [b.Responsive]: m.Responsive
                        }[n];
                    return (0, h.jsx)(x, {
                        ariaLabel: `${r.organizationName} - ${r.score}/${r.scale}`,
                        ariaLabelRatingStars: t("common.rating.badge.aria_label", {
                            stars_rating: r.stars,
                            stars_count: 5
                        }),
                        lazyLoading: a,
                        logo: r.badge,
                        size: i,
                        stars: r.stars,
                        variant: e
                    })
                }
                if ("award" === r.type) {
                    let e = {
                            [c.Colorful]: v.Dark,
                            [c.Dark]: v.Dark,
                            [c.Light]: v.Light
                        }[o],
                        i = {
                            [b.Small]: u.Small,
                            [b.Medium]: u.Medium,
                            [b.Responsive]: u.Responsive
                        }[n];
                    return (0, h.jsx)(B, {
                        ariaLabel: `${r.organizationName} - ${r.awardName}`,
                        lazyLoading: a,
                        logo: r.badge,
                        size: i,
                        title: r.awardName,
                        variant: e
                    })
                }
                return (0, h.jsx)(h.Fragment, {
                    children: "why"
                })
            }
        },
        22358: function(e, r, i) {
            "use strict";
            var a = i(27573),
                s = i(7653),
                o = i(82392),
                t = i(76362),
                n = i(13324),
                l = i(1900),
                d = i(950),
                m = i(2198),
                v = i(26918),
                u = i(17098);
            r.default = function(e) {
                let {
                    blurb: r,
                    gatedForm: i,
                    language: c,
                    title: b
                } = e, {
                    t: h
                } = (0, v.E)(c, ["templates", "common"]), g = "label" in i.reward ? i.reward.label : null, p = null != g ? g : ({
                    download: h("GatedFormBlockTemplate.button.download.label", {
                        ns: "templates"
                    }),
                    link: h("GatedFormBlockTemplate.button.link.label", {
                        ns: "templates"
                    }),
                    message: void 0,
                    redirect: h("GatedFormBlockTemplate.button.redirect.label", {
                        ns: "templates"
                    }),
                    video: h("GatedFormBlockTemplate.button.video.label", {
                        ns: "templates"
                    })
                })[i.reward.type], _ = (0, s.useCallback)(() => {
                    var e, s, n, l;
                    return (0, a.jsx)(o.b, {
                        ariaLabelButtonCloseWidget: h("common.block.widget.button.close.aria_label", {
                            ns: "common"
                        }),
                        description: null !== (n = null === (e = i.confirmation) || void 0 === e ? void 0 : e.blurb) && void 0 !== n ? n : r,
                        form: (0, a.jsx)(t.H, {
                            ctaButton: (0, a.jsx)(m.default, {
                                language: c,
                                reward: i.reward
                            }),
                            variant: t.x.Light
                        }),
                        title: null !== (l = null === (s = i.confirmation) || void 0 === s ? void 0 : s.title) && void 0 !== l ? l : b
                    })
                }, [r, i, c, h, b]), P = (0, s.useCallback)(() => {
                    "redirect" === i.reward.type && window.location.replace(i.reward.href)
                }, [i]);
                return null === i.marketoFormId ? _() : (0, a.jsx)(n.MarketoForm, {
                    defaultValues: {
                        rewardResource: i.reward.resource,
                        rewardLanguage: null != c ? c : d.SQ.English
                    },
                    formId: i.marketoFormId,
                    marketoBaseUrl: u.O.marketoBaseUrl(),
                    onFinish: P,
                    children: e => {
                        let {
                            isFinished: i,
                            isLoading: s,
                            renderForm: t
                        } = e;
                        return s ? (0, a.jsx)(o.b, {
                            ariaLabelButtonCloseWidget: h("common.block.widget.button.close.aria_label", {
                                ns: "common"
                            }),
                            collapsedWidgetButtonLabel: p,
                            description: r,
                            form: (0, a.jsx)(l.T, {
                                variant: l.C.Light
                            }),
                            title: b
                        }) : i ? _() : (0, a.jsx)(o.b, {
                            ariaLabelButtonCloseWidget: h("common.block.widget.button.close.aria_label", {
                                ns: "common"
                            }),
                            collapsedWidgetButtonLabel: p,
                            description: r,
                            form: t(),
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
        27870: function(e) {
            e.exports = {
                component: "RatingStars_component__W0rW5",
                isLight: "RatingStars_isLight__l3FXc",
                topStarsGroup: "RatingStars_topStarsGroup__ARJxt",
                bottomStarsGroup: "RatingStars_bottomStarsGroup__5d2Rd",
                star: "RatingStars_star__wqxiC",
                isColorful: "RatingStars_isColorful__vlvoF"
            }
        }
    },
    function(e) {
        e.O(0, [4027, 1846, 6344, 4854, 8890, 3156, 1126, 4993, 281, 6302, 4235, 3266, 6008, 8538, 7645, 9949, 3401, 1293, 5162, 1744], function() {
            return e(e.s = 17572)
        }), _N_E = e.O()
    }
]);
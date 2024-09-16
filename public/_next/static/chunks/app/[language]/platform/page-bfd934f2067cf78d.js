(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [4627, 1344, 5638, 6985, 7314, 1091, 9736, 601], {
        1131: function(e, i, s) {
            Promise.resolve().then(s.t.bind(s, 65469, 23)), Promise.resolve().then(s.bind(s, 897)), Promise.resolve().then(s.bind(s, 30697)), Promise.resolve().then(s.bind(s, 16280)), Promise.resolve().then(s.bind(s, 12634)), Promise.resolve().then(s.bind(s, 68744)), Promise.resolve().then(s.bind(s, 22547)), Promise.resolve().then(s.bind(s, 47393)), Promise.resolve().then(s.bind(s, 2846)), Promise.resolve().then(s.bind(s, 29140)), Promise.resolve().then(s.bind(s, 13324)), Promise.resolve().then(s.bind(s, 48455)), Promise.resolve().then(s.bind(s, 77607)), Promise.resolve().then(s.bind(s, 12097)), Promise.resolve().then(s.bind(s, 57320)), Promise.resolve().then(s.bind(s, 10400)), Promise.resolve().then(s.bind(s, 60095)), Promise.resolve().then(s.bind(s, 79492)), Promise.resolve().then(s.bind(s, 37391)), Promise.resolve().then(s.bind(s, 19730)), Promise.resolve().then(s.bind(s, 40081)), Promise.resolve().then(s.bind(s, 58358)), Promise.resolve().then(s.bind(s, 6889)), Promise.resolve().then(s.bind(s, 39252)), Promise.resolve().then(s.bind(s, 52060)), Promise.resolve().then(s.bind(s, 73099)), Promise.resolve().then(s.bind(s, 51410)), Promise.resolve().then(s.bind(s, 94938)), Promise.resolve().then(s.bind(s, 14535)), Promise.resolve().then(s.bind(s, 27404)), Promise.resolve().then(s.bind(s, 20523)), Promise.resolve().then(s.t.bind(s, 15545, 17)), Promise.resolve().then(s.t.bind(s, 79321, 17)), Promise.resolve().then(s.t.bind(s, 72037, 17)), Promise.resolve().then(s.t.bind(s, 78951, 17)), Promise.resolve().then(s.t.bind(s, 74289, 17)), Promise.resolve().then(s.bind(s, 46282)), Promise.resolve().then(s.bind(s, 71500)), Promise.resolve().then(s.bind(s, 81521)), Promise.resolve().then(s.bind(s, 2198)), Promise.resolve().then(s.bind(s, 4645)), Promise.resolve().then(s.bind(s, 91362)), Promise.resolve().then(s.bind(s, 62040)), Promise.resolve().then(s.bind(s, 60699)), Promise.resolve().then(s.bind(s, 70936))
        },
        46282: function(e, i, s) {
            "use strict";
            s.r(i), s.d(i, {
                default: function() {
                    return y
                }
            });
            var r, a, o, n, t, l, d, m, v, h, g, _, b = s(27573),
                u = s(45531),
                c = s.n(u);
            s(7653);
            var p = s(27870),
                P = s.n(p);
            (r = d || (d = {})).Colorful = "colorful", r.Dark = "dark", r.Light = "light";
            let R = e => {
                let {
                    ariaLabel: i,
                    starsCount: s = 5,
                    starsRating: r,
                    variant: a = "dark"
                } = e;
                return (0, b.jsxs)("div", {
                    "aria-label": i,
                    className: c()({
                        [P().component]: !0,
                        [P().isColorful]: "colorful" === a,
                        [P().isDark]: "dark" === a,
                        [P().isLight]: "light" === a
                    }),
                    children: [(0, b.jsx)("div", {
                        "aria-hidden": !0,
                        className: P().topStarsGroup,
                        style: {
                            width: `${r/s*100}%`
                        },
                        children: Array.from(Array(s)).map((e, i) => (0, b.jsx)("span", {
                            className: P().star,
                            children: "★"
                        }, `${i}-star-top`))
                    }), (0, b.jsx)("div", {
                        "aria-hidden": !0,
                        className: P().bottomStarsGroup,
                        children: Array.from(Array(s)).map((e, i) => (0, b.jsx)("span", {
                            className: P().star,
                            children: "☆"
                        }, `${i}-star-bottom`))
                    })]
                })
            };
            var f = s(48455),
                S = s(96874),
                k = s.n(S);
            (a = m || (m = {})).Small = "small", a.Medium = "medium", a.Responsive = "responsive";
            let x = e => {
                let {
                    ariaLabel: i,
                    ariaLabelRatingStars: s,
                    lazyLoading: r,
                    logo: a,
                    size: o = "responsive",
                    stars: n,
                    variant: t = d.Dark
                } = e;
                return (0, b.jsxs)("div", {
                    "aria-label": i,
                    className: c()({
                        [k().component]: !0,
                        [k().isSmall]: "small" === o,
                        [k().isMedium]: "medium" === o,
                        [k().isResponsive]: "responsive" === o
                    }),
                    children: [(0, b.jsx)("div", {
                        className: k().logo,
                        children: (0, b.jsx)(f.default, {
                            alt: a.alt,
                            height: 65,
                            lazyLoading: r,
                            metadata: a.metadata,
                            src: a.src,
                            width: 180
                        })
                    }), (0, b.jsx)("div", {
                        className: k().ratingStars,
                        children: (0, b.jsx)(R, {
                            ariaLabel: s,
                            starsRating: n,
                            variant: t
                        })
                    })]
                })
            };
            var L = s(28534),
                N = s.n(L);
            (o = v || (v = {})).Dark = "dark", o.Light = "light", (n = h || (h = {})).Small = "small", n.Medium = "medium", n.Responsive = "responsive";
            let w = e => {
                var i, s;
                let {
                    ariaLabel: r,
                    lazyLoading: a,
                    logo: o,
                    size: n = "responsive",
                    title: t,
                    variant: l = "dark"
                } = e, d = null !== (s = null === (i = o.metadata) || void 0 === i ? void 0 : i.aspectRatio) && void 0 !== s ? s : 1;
                return (0, b.jsxs)("div", {
                    "aria-label": r,
                    className: c()({
                        [N().component]: !0,
                        [N().isSmall]: "small" === n,
                        [N().isMedium]: "medium" === n,
                        [N().isResponsive]: "responsive" === n,
                        [N().isDark]: "dark" === l,
                        [N().isLight]: "light" === l
                    }),
                    children: [(0, b.jsx)("div", {
                        className: N().logo,
                        children: (0, b.jsx)(f.default, {
                            alt: o.alt,
                            aspectRatio: d,
                            lazyLoading: a,
                            metadata: o.metadata,
                            src: o.src,
                            width: 180
                        })
                    }), d > 1.5 && (0, b.jsx)("div", {
                        className: N().title,
                        children: t
                    })]
                })
            };
            var j = s(7329),
                M = s(26918);
            (t = g || (g = {})).Colorful = "colorful", t.Dark = "dark", t.Light = "light", (l = _ || (_ = {})).Small = "small", l.Medium = "medium", l.Responsive = "responsive";
            var y = e => {
                let {
                    accolade: i,
                    language: s,
                    lazyLoading: r,
                    size: a = _.Responsive,
                    variant: o = g.Dark
                } = e, {
                    t: n
                } = (0, M.E)(s, ["common"]), t = (0, j.V)(a);
                if ("rating" === i.type) {
                    let e = {
                            [g.Colorful]: d.Colorful,
                            [g.Dark]: d.Dark,
                            [g.Light]: d.Light
                        }[o],
                        s = {
                            [_.Small]: m.Small,
                            [_.Medium]: m.Medium,
                            [_.Responsive]: m.Responsive
                        }[t];
                    return (0, b.jsx)(x, {
                        ariaLabel: `${i.organizationName} - ${i.score}/${i.scale}`,
                        ariaLabelRatingStars: n("common.rating.badge.aria_label", {
                            stars_rating: i.stars,
                            stars_count: 5
                        }),
                        lazyLoading: r,
                        logo: i.badge,
                        size: s,
                        stars: i.stars,
                        variant: e
                    })
                }
                if ("award" === i.type) {
                    let e = {
                            [g.Colorful]: v.Dark,
                            [g.Dark]: v.Dark,
                            [g.Light]: v.Light
                        }[o],
                        s = {
                            [_.Small]: h.Small,
                            [_.Medium]: h.Medium,
                            [_.Responsive]: h.Responsive
                        }[t];
                    return (0, b.jsx)(w, {
                        ariaLabel: `${i.organizationName} - ${i.awardName}`,
                        lazyLoading: r,
                        logo: i.badge,
                        size: s,
                        title: i.awardName,
                        variant: e
                    })
                }
                return (0, b.jsx)(b.Fragment, {
                    children: "why"
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
            return e(e.s = 1131)
        }), _N_E = e.O()
    }
]);
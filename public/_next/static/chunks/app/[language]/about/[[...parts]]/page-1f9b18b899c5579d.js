(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [8206], {
        11052: function(e, i, r) {
            Promise.resolve().then(r.t.bind(r, 65469, 23)), Promise.resolve().then(r.bind(r, 897)), Promise.resolve().then(r.bind(r, 30697)), Promise.resolve().then(r.bind(r, 16280)), Promise.resolve().then(r.bind(r, 12634)), Promise.resolve().then(r.bind(r, 68744)), Promise.resolve().then(r.bind(r, 22547)), Promise.resolve().then(r.bind(r, 47393)), Promise.resolve().then(r.bind(r, 2846)), Promise.resolve().then(r.bind(r, 29140)), Promise.resolve().then(r.bind(r, 13324)), Promise.resolve().then(r.bind(r, 48455)), Promise.resolve().then(r.bind(r, 77607)), Promise.resolve().then(r.bind(r, 12097)), Promise.resolve().then(r.bind(r, 57320)), Promise.resolve().then(r.bind(r, 10400)), Promise.resolve().then(r.bind(r, 60095)), Promise.resolve().then(r.bind(r, 79492)), Promise.resolve().then(r.bind(r, 37391)), Promise.resolve().then(r.bind(r, 19730)), Promise.resolve().then(r.bind(r, 40081)), Promise.resolve().then(r.bind(r, 58358)), Promise.resolve().then(r.bind(r, 6889)), Promise.resolve().then(r.bind(r, 39252)), Promise.resolve().then(r.bind(r, 52060)), Promise.resolve().then(r.bind(r, 73099)), Promise.resolve().then(r.bind(r, 51410)), Promise.resolve().then(r.bind(r, 94938)), Promise.resolve().then(r.bind(r, 14535)), Promise.resolve().then(r.bind(r, 27404)), Promise.resolve().then(r.bind(r, 20523)), Promise.resolve().then(r.t.bind(r, 15545, 17)), Promise.resolve().then(r.t.bind(r, 79321, 17)), Promise.resolve().then(r.t.bind(r, 72037, 17)), Promise.resolve().then(r.t.bind(r, 78951, 17)), Promise.resolve().then(r.t.bind(r, 74289, 17)), Promise.resolve().then(r.bind(r, 46282)), Promise.resolve().then(r.bind(r, 71500)), Promise.resolve().then(r.bind(r, 81521)), Promise.resolve().then(r.bind(r, 2198)), Promise.resolve().then(r.bind(r, 4645)), Promise.resolve().then(r.bind(r, 91362)), Promise.resolve().then(r.bind(r, 62040)), Promise.resolve().then(r.bind(r, 60699)), Promise.resolve().then(r.bind(r, 85078)), Promise.resolve().then(r.bind(r, 70936))
        },
        85078: function(e, i, r) {
            "use strict";
            r.d(i, {
                default: function() {
                    return S
                }
            });
            var t, n, s = r(27573),
                a = r(49252),
                l = r(56484),
                o = r(7653),
                d = r(75363),
                c = r.n(d);
            let m = e => {
                let {
                    children: i,
                    footerElement: r
                } = e;
                return (0, s.jsxs)("div", {
                    children: [i, (0, s.jsx)("div", {
                        className: c().component,
                        children: r
                    })]
                })
            };
            var h = r(70254),
                u = r(11946),
                _ = r(72381),
                v = r(68890),
                g = r.n(v);
            let b = e => {
                let {
                    items: i
                } = e;
                return (0, s.jsx)("ul", {
                    className: g().component,
                    children: i.map((e, i) => (0, s.jsx)("li", {
                        className: g().item,
                        children: e
                    }, `list-item-button-${i}`))
                })
            };
            var p = r(45531),
                f = r.n(p),
                x = r(6074),
                P = r(60580),
                N = r(58832),
                j = r(48455),
                R = r(82317),
                L = r(21019),
                B = r.n(L);
            (t = n || (n = {})).Bigger = "bigger", t.Pinned = "pinned", t.Standard = "standard";
            let k = e => {
                    var i;
                    let {
                        badgeLeft: r,
                        badgeRight: t,
                        blurb: n = null,
                        ctaLinkLabel: a,
                        href: l,
                        hrefExternalNote: o,
                        label: d,
                        poster: c = null,
                        testId: m,
                        title: u,
                        variant: _ = "standard"
                    } = e, v = (0, P.G)("customer-story-card-description"), g = (0, N.Bm)(l), b = [578, 243, 270];
                    return "bigger" === _ && (b = [578, 376, 376]), "pinned" === _ && (b = [400, 776, 756]), (0, s.jsx)("div", {
                        className: B().container,
                        children: (0, s.jsxs)("div", {
                            className: f()({
                                [B().component]: !0,
                                [B().hasNoPoster]: !c,
                                [B().isBigger]: "bigger" === _,
                                [B().isPinned]: "pinned" === _
                            }),
                            "data-hoverable": "true",
                            "data-testid": m,
                            children: [(null !== (i = null != c ? c : r) && void 0 !== i ? i : t) && (0, s.jsxs)("div", {
                                className: B().header,
                                children: [c && (0, s.jsx)("div", {
                                    "aria-hidden": !0,
                                    className: B().poster,
                                    children: (0, s.jsx)(j.default, {
                                        height: "pinned" === _ ? 360 : 220,
                                        metadata: c.metadata,
                                        src: c.src,
                                        width: b
                                    })
                                }), r && (0, s.jsx)("div", {
                                    className: B().badgeLeft,
                                    children: r
                                }), t && (0, s.jsx)("div", {
                                    className: B().badgeRight,
                                    children: t
                                })]
                            }), (0, s.jsxs)("div", {
                                className: B().content,
                                children: [(0, s.jsxs)("div", {
                                    className: f()({
                                        [B().title]: !0,
                                        [B().isDominant]: !d
                                    }),
                                    children: [(0, s.jsxs)(R.l, {
                                        "aria-describedby": v,
                                        className: B().link,
                                        href: l,
                                        rel: g ? "noopener" : void 0,
                                        target: g ? "_blank" : void 0,
                                        title: u,
                                        children: [u, g && (0, s.jsxs)("span", {
                                            className: "visually-hidden",
                                            children: [" ", o]
                                        })]
                                    }), n && (0, s.jsx)("div", {
                                        className: B().blurb,
                                        children: n
                                    })]
                                }), d && (0, s.jsx)("div", {
                                    className: B().label,
                                    children: d
                                }), (0, s.jsx)("div", {
                                    "aria-hidden": !0,
                                    className: B().cta,
                                    id: v,
                                    children: (0, s.jsx)(h.G, {
                                        iconLeft: (0, s.jsx)(x.e, {
                                            type: x.f.RightInBlackCircle
                                        }),
                                        children: a
                                    })
                                })]
                            })]
                        })
                    })
                },
                C = e => {
                    var i;
                    let {
                        blurb: r = null,
                        category: t = null,
                        ctaLinkLabel: a,
                        href: l,
                        hrefExternalNote: o,
                        labels: d,
                        poster: c = null,
                        testId: m,
                        title: h,
                        variant: u = n.Standard
                    } = e;
                    return (0, s.jsx)(k, {
                        badgeLeft: !c && null !== t && (0, s.jsx)(_.q, {
                            iconType: t.iconType,
                            isHighlighted: !0,
                            children: t.label
                        }),
                        badgeRight: c && null !== t && (0, s.jsx)(_.q, {
                            highlightedColor: null !== (i = t.categoryColor) && void 0 !== i ? i : void 0,
                            iconType: t.iconType,
                            isHighlighted: !0,
                            children: t.label
                        }),
                        blurb: r,
                        ctaLinkLabel: a,
                        href: l,
                        hrefExternalNote: o,
                        label: d && (0, s.jsx)(b, {
                            items: d
                        }),
                        poster: c,
                        testId: m,
                        title: h,
                        variant: u
                    })
                };
            var A = r(26918);

            function S(e) {
                var i, r;
                let {
                    articles: t,
                    language: n
                } = e, {
                    t: d
                } = (0, A.E)(n, ["templates", "common"]), c = function(e, i) {
                    let r = (0, a.Q)(e);
                    if (isNaN(-24)) return (0, l.L)(e, NaN);
                    let t = r.getDate(),
                        n = (0, l.L)(e, r.getTime());
                    return (n.setMonth(r.getMonth() + i + 1, 0), t >= n.getDate()) ? n : (r.setFullYear(n.getFullYear(), n.getMonth(), t), r)
                }(new Date, -24), _ = t.filter(e => (function(e, i) {
                    let r = (0, a.Q)(e),
                        t = (0, a.Q)(i);
                    return r.getTime() > t.getTime()
                })(e.publishedAt, c)).slice(0, 8), [v, g] = (0, o.useState)(_.length > 0 ? _ : t.slice(0, 8)), b = null !== (r = ({
                    1: [1],
                    2: [1]
                })[null !== (i = null == v ? void 0 : v.length) && void 0 !== i ? i : 1]) && void 0 !== r ? r : [1, 2, 4];
                return (0, s.jsx)(m, {
                    footerElement: v && v.length < (null == t ? void 0 : t.length) && (0, s.jsx)(h.G, {
                        onClick: () => void g(t.slice(0, v.length + 8)),
                        children: d("common.show_more", {
                            ns: "common"
                        })
                    }),
                    children: (0, s.jsx)(u.r, {
                        columnsCount: b,
                        gapSize: [u.X.Medium],
                        children: null == v ? void 0 : v.map(e => (0, s.jsx)(C, {
                            category: e.category,
                            ctaLinkLabel: d("common.read_now", {
                                ns: "common"
                            }),
                            href: e.href,
                            hrefExternalNote: d("common.cards.articleCard.hrefExternalNote", {
                                ns: "common"
                            }),
                            poster: e.poster,
                            title: e.title
                        }, e._id))
                    })
                })
            }
        },
        46282: function(e, i, r) {
            "use strict";
            r.r(i), r.d(i, {
                default: function() {
                    return S
                }
            });
            var t, n, s, a, l, o, d, c, m, h, u, _, v = r(27573),
                g = r(45531),
                b = r.n(g);
            r(7653);
            var p = r(27870),
                f = r.n(p);
            (t = d || (d = {})).Colorful = "colorful", t.Dark = "dark", t.Light = "light";
            let x = e => {
                let {
                    ariaLabel: i,
                    starsCount: r = 5,
                    starsRating: t,
                    variant: n = "dark"
                } = e;
                return (0, v.jsxs)("div", {
                    "aria-label": i,
                    className: b()({
                        [f().component]: !0,
                        [f().isColorful]: "colorful" === n,
                        [f().isDark]: "dark" === n,
                        [f().isLight]: "light" === n
                    }),
                    children: [(0, v.jsx)("div", {
                        "aria-hidden": !0,
                        className: f().topStarsGroup,
                        style: {
                            width: `${t/r*100}%`
                        },
                        children: Array.from(Array(r)).map((e, i) => (0, v.jsx)("span", {
                            className: f().star,
                            children: "★"
                        }, `${i}-star-top`))
                    }), (0, v.jsx)("div", {
                        "aria-hidden": !0,
                        className: f().bottomStarsGroup,
                        children: Array.from(Array(r)).map((e, i) => (0, v.jsx)("span", {
                            className: f().star,
                            children: "☆"
                        }, `${i}-star-bottom`))
                    })]
                })
            };
            var P = r(48455),
                N = r(96874),
                j = r.n(N);
            (n = c || (c = {})).Small = "small", n.Medium = "medium", n.Responsive = "responsive";
            let R = e => {
                let {
                    ariaLabel: i,
                    ariaLabelRatingStars: r,
                    lazyLoading: t,
                    logo: n,
                    size: s = "responsive",
                    stars: a,
                    variant: l = d.Dark
                } = e;
                return (0, v.jsxs)("div", {
                    "aria-label": i,
                    className: b()({
                        [j().component]: !0,
                        [j().isSmall]: "small" === s,
                        [j().isMedium]: "medium" === s,
                        [j().isResponsive]: "responsive" === s
                    }),
                    children: [(0, v.jsx)("div", {
                        className: j().logo,
                        children: (0, v.jsx)(P.default, {
                            alt: n.alt,
                            height: 65,
                            lazyLoading: t,
                            metadata: n.metadata,
                            src: n.src,
                            width: 180
                        })
                    }), (0, v.jsx)("div", {
                        className: j().ratingStars,
                        children: (0, v.jsx)(x, {
                            ariaLabel: r,
                            starsRating: a,
                            variant: l
                        })
                    })]
                })
            };
            var L = r(28534),
                B = r.n(L);
            (s = m || (m = {})).Dark = "dark", s.Light = "light", (a = h || (h = {})).Small = "small", a.Medium = "medium", a.Responsive = "responsive";
            let k = e => {
                var i, r;
                let {
                    ariaLabel: t,
                    lazyLoading: n,
                    logo: s,
                    size: a = "responsive",
                    title: l,
                    variant: o = "dark"
                } = e, d = null !== (r = null === (i = s.metadata) || void 0 === i ? void 0 : i.aspectRatio) && void 0 !== r ? r : 1;
                return (0, v.jsxs)("div", {
                    "aria-label": t,
                    className: b()({
                        [B().component]: !0,
                        [B().isSmall]: "small" === a,
                        [B().isMedium]: "medium" === a,
                        [B().isResponsive]: "responsive" === a,
                        [B().isDark]: "dark" === o,
                        [B().isLight]: "light" === o
                    }),
                    children: [(0, v.jsx)("div", {
                        className: B().logo,
                        children: (0, v.jsx)(P.default, {
                            alt: s.alt,
                            aspectRatio: d,
                            lazyLoading: n,
                            metadata: s.metadata,
                            src: s.src,
                            width: 180
                        })
                    }), d > 1.5 && (0, v.jsx)("div", {
                        className: B().title,
                        children: l
                    })]
                })
            };
            var C = r(7329),
                A = r(26918);
            (l = u || (u = {})).Colorful = "colorful", l.Dark = "dark", l.Light = "light", (o = _ || (_ = {})).Small = "small", o.Medium = "medium", o.Responsive = "responsive";
            var S = e => {
                let {
                    accolade: i,
                    language: r,
                    lazyLoading: t,
                    size: n = _.Responsive,
                    variant: s = u.Dark
                } = e, {
                    t: a
                } = (0, A.E)(r, ["common"]), l = (0, C.V)(n);
                if ("rating" === i.type) {
                    let e = {
                            [u.Colorful]: d.Colorful,
                            [u.Dark]: d.Dark,
                            [u.Light]: d.Light
                        }[s],
                        r = {
                            [_.Small]: c.Small,
                            [_.Medium]: c.Medium,
                            [_.Responsive]: c.Responsive
                        }[l];
                    return (0, v.jsx)(R, {
                        ariaLabel: `${i.organizationName} - ${i.score}/${i.scale}`,
                        ariaLabelRatingStars: a("common.rating.badge.aria_label", {
                            stars_rating: i.stars,
                            stars_count: 5
                        }),
                        lazyLoading: t,
                        logo: i.badge,
                        size: r,
                        stars: i.stars,
                        variant: e
                    })
                }
                if ("award" === i.type) {
                    let e = {
                            [u.Colorful]: m.Dark,
                            [u.Dark]: m.Dark,
                            [u.Light]: m.Light
                        }[s],
                        r = {
                            [_.Small]: h.Small,
                            [_.Medium]: h.Medium,
                            [_.Responsive]: h.Responsive
                        }[l];
                    return (0, v.jsx)(k, {
                        ariaLabel: `${i.organizationName} - ${i.awardName}`,
                        lazyLoading: t,
                        logo: i.badge,
                        size: r,
                        title: i.awardName,
                        variant: e
                    })
                }
                return (0, v.jsx)(v.Fragment, {
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
        21019: function(e) {
            e.exports = {
                container: "ArticleCardBuilder_container__EYAh1",
                component: "ArticleCardBuilder_component__1AHjZ",
                poster: "ArticleCardBuilder_poster__YX2Lf",
                header: "ArticleCardBuilder_header__TzRku",
                hasNoPoster: "ArticleCardBuilder_hasNoPoster__IXF_o",
                content: "ArticleCardBuilder_content__DJql0",
                label: "ArticleCardBuilder_label__yl05L",
                title: "ArticleCardBuilder_title__u1NuX",
                isDominant: "ArticleCardBuilder_isDominant__ao2uq",
                link: "ArticleCardBuilder_link__E8fID",
                cta: "ArticleCardBuilder_cta__N6NQi",
                badgeLeft: "ArticleCardBuilder_badgeLeft__n8S6J",
                badgeRight: "ArticleCardBuilder_badgeRight__4kqw5",
                blurb: "ArticleCardBuilder_blurb__U7Yg_",
                isPinned: "ArticleCardBuilder_isPinned__q_md0",
                isBigger: "ArticleCardBuilder_isBigger__rhL9X",
                badge: "ArticleCardBuilder_badge__Uvypo"
            }
        },
        68890: function(e) {
            e.exports = {
                component: "ListOfParams_component__mRnqv",
                item: "ListOfParams_item__6v5aq"
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
        75363: function(e) {
            e.exports = {
                component: "AttachedFooter_component__AcJLF"
            }
        },
        56484: function(e, i, r) {
            "use strict";

            function t(e, i) {
                return e instanceof Date ? new e.constructor(i) : new Date(i)
            }
            r.d(i, {
                L: function() {
                    return t
                }
            })
        },
        49252: function(e, i, r) {
            "use strict";

            function t(e) {
                let i = Object.prototype.toString.call(e);
                return e instanceof Date || "object" == typeof e && "[object Date]" === i ? new e.constructor(+e) : new Date("number" == typeof e || "[object Number]" === i || "string" == typeof e || "[object String]" === i ? e : NaN)
            }
            r.d(i, {
                Q: function() {
                    return t
                }
            })
        }
    },
    function(e) {
        e.O(0, [4027, 1846, 6344, 4854, 8890, 3156, 1126, 4993, 281, 6302, 4235, 3266, 6008, 8538, 7645, 9949, 3401, 1293, 5162, 1744], function() {
            return e(e.s = 11052)
        }), _N_E = e.O()
    }
]);
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [9949], {
        15545: function(e, t, i) {
            "use strict";
            e.exports = i.p + "static/chunks/globe-600087b166f189fc.svg"
        },
        16280: function(e, t, i) {
            "use strict";
            i.r(t), i.d(t, {
                CrossfadingElements: function() {
                    return g
                }
            });
            var n = i(27573),
                a = i(45531),
                o = i.n(a),
                r = i(7653),
                l = i(25118),
                s = i(58832),
                c = i(67461),
                d = i(52155),
                u = i(65859),
                m = i.n(u);
            let g = e => {
                let {
                    backgroundColor: t,
                    children: i,
                    columnsCount: a = [3, 3, 6],
                    itemsPerGroup: u = 6
                } = e, g = (0, l.Z)(i).filter(s.Dw), h = Math.ceil(g.length / u), p = Array(h).fill("").map((e, t) => g.slice(t * u, (t + 1) * u)), b = p.length > 1, _ = Array.from({
                    length: h - 2
                }, (e, t) => t + 2), [f, v] = (0, r.useState)(_), k = 3 * p.length, y = `cf${h}-fade-in-out`, w = `
		@keyframes ${y} {
			0% {
				opacity: 1;
			}

			${2/k*100}% {
				opacity: 1;
			}

			${1/p.length*100}% {
				opacity: 0;
			}

			${100-1/k*100}% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}
	`, L = e => {
                    f.length > 0 && v(f.filter(t => t !== e + 1))
                }, [S, C, x] = (0, d.tv)(a);
                return (0, n.jsxs)(n.Fragment, {
                    children: [(0, n.jsx)("div", {
                        className: m().component,
                        role: "list",
                        style: {
                            "--bg": t ? (0, c.Lq)(t) : void 0,
                            "--crossfading-elems-mobile-columns": `${S}`,
                            "--crossfading-elems-tablet-columns": `${C}`,
                            "--crossfading-elems-desktop-columns": `${x}`
                        },
                        children: p.map((e, t) => (0, n.jsx)("div", {
                            className: m().group,
                            onAnimationStart: () => L(t),
                            role: "presentation",
                            style: b ? {
                                animationName: y,
                                animationDelay: `${3*t}s`,
                                animationDuration: `${k}s`,
                                zIndex: p.length - t
                            } : {},
                            children: e.map((e, i) => (0, n.jsx)("div", {
                                className: o()({
                                    [m().item]: !0,
                                    [m().isHidden]: f.includes(t)
                                }),
                                role: "listitem",
                                children: e
                            }, `item-${i}`))
                        }, `elements-group-${t}`))
                    }), b && (0, n.jsx)("style", {
                        children: w
                    })]
                })
            }
        },
        12634: function(e, t, i) {
            "use strict";
            i.r(t), i.d(t, {
                CallToActionBlockBuilder: function() {
                    return k
                }
            });
            var n = i(27573),
                a = i(45531),
                o = i.n(a),
                r = i(81888),
                l = i.n(r),
                s = i(61735),
                c = i.n(s),
                d = i(7653),
                u = i(29039),
                m = i(48567),
                g = i(22547),
                h = i(29194),
                p = i(73099),
                b = i(20523),
                _ = i(67461),
                f = i(31237),
                v = i.n(f);
            let k = e => {
                let {
                    ariaLabelButtonCloseWidget: t,
                    backgroundColor: i,
                    children: a,
                    collapsedWidgetButtonLabel: r,
                    collapsedWidgetTitle: s
                } = e, f = (0, p.useLargeBreakpoint)(), k = (0, b.useScrollBlocking)(), [y, w] = (0, d.useState)(!1), [L, S] = (0, d.useState)(!0), C = (0, d.useRef)(null), x = (0, d.useCallback)(e => {
                    e ? (k(!0), w(!0)) : (k(!1), w(!1))
                }, [k]);
                (0, d.useEffect)(() => {
                    f && x(!1)
                }, [x, f, k]), (0, d.useEffect)(() => {
                    let e = c()(() => {
                        if (!C.current) return;
                        let e = C.current.getBoundingClientRect(),
                            t = window.innerHeight;
                        S(e.y - t > 0)
                    }, 32, {
                        leading: !0,
                        trailing: !0
                    });
                    return window.addEventListener("scroll", e, {
                        passive: !0
                    }), () => {
                        window.removeEventListener("scroll", e)
                    }
                }, []);
                let T = (0, n.jsx)("div", {
                    className: v().content,
                    children: (0, n.jsx)(l(), {
                        active: y,
                        children: (0, n.jsxs)("div", {
                            children: [a, (0, n.jsx)("div", {
                                "aria-hidden": !0,
                                className: v().closeButton,
                                children: (0, n.jsx)(u.$D, {
                                    "aria-label": t,
                                    iconType: m.Rk.Close,
                                    onClick: () => x(!1),
                                    variant: u.of.Reversed
                                })
                            })]
                        })
                    })
                });
                return (0, n.jsxs)(n.Fragment, {
                    children: [(0, n.jsx)("div", {
                        className: v().sensor,
                        ref: C
                    }), (0, n.jsxs)("div", {
                        className: o()({
                            [v().component]: !0,
                            [v().isStickyFooter]: !f && L,
                            [v().isFullscreen]: y,
                            [v().isTurquoise]: i === _.YI.SecondaryTurquoise,
                            [v().isLime]: i === _.YI.SecondaryLime,
                            [v().isWhite]: i === _.YI.AuxiliaryWhite
                        }),
                        children: [T, (0, n.jsxs)("div", {
                            "aria-hidden": !0,
                            className: v().collapsedBar,
                            children: [s && (0, n.jsx)("div", {
                                className: v().ctaTitle,
                                children: s
                            }), (0, n.jsx)("div", {
                                className: v().cta,
                                children: (0, n.jsx)(g.Button, {
                                    onClick: () => x(!0),
                                    size: [h.qE.Small, h.qE.Medium, h.qE.Large],
                                    testId: "call-to-action-block-mobile-widget-button",
                                    variant: h.Wu.Highlight,
                                    children: r
                                })
                            })]
                        })]
                    })]
                })
            }
        },
        82392: function(e, t, i) {
            "use strict";
            i.d(t, {
                b: function() {
                    return c
                }
            });
            var n = i(27573);
            i(7653);
            var a = i(39666),
                o = i(60580),
                r = i(12634),
                l = i(7831),
                s = i.n(l);
            let c = e => {
                let {
                    ariaLabelButtonCloseWidget: t,
                    backgroundColor: i,
                    collapsedWidgetButtonLabel: l = "Fill the form",
                    collapsedWidgetTitle: c,
                    description: d = null,
                    form: u,
                    title: m
                } = e, g = (0, o.G)("cta-form-block-label"), h = (0, o.G)("cta-form-block-description");
                return (0, n.jsx)(r.CallToActionBlockBuilder, {
                    ariaLabelButtonCloseWidget: t,
                    backgroundColor: i,
                    collapsedWidgetButtonLabel: l,
                    collapsedWidgetTitle: null != m ? m : c,
                    children: (0, n.jsxs)("div", {
                        "aria-describedby": d ? h : void 0,
                        "aria-labelledby": m ? g : void 0,
                        className: s().component,
                        children: [m && (0, n.jsx)("h2", {
                            "aria-hidden": !0,
                            className: s().title,
                            id: g,
                            children: m
                        }), d && (0, n.jsx)("div", {
                            className: s().description,
                            id: h,
                            children: (0, n.jsx)(a.H, {
                                children: d
                            })
                        }), (0, n.jsx)("div", {
                            className: s().ctaSection,
                            children: (0, n.jsx)("div", {
                                className: s().form,
                                children: u
                            })
                        })]
                    })
                })
            }
        },
        68744: function(e, t, i) {
            "use strict";
            i.r(t), i.d(t, {
                PlanComparisonBlock: function() {
                    return m
                }
            });
            var n, a, o = i(27573),
                r = i(57908),
                l = i(7653),
                s = i(10214),
                c = i(39666);
            (n = a || (a = {})).Conductor = "conductor", n.ContentKing = "content-king";
            var d = i(47794),
                u = i.n(d);
            let m = e => {
                let {
                    blurb: t,
                    children: i,
                    ctaElement: n,
                    title: d,
                    variant: m = a.Conductor
                } = e, [g, h] = (0, l.useState)(!0);
                return (0, o.jsxs)("div", {
                    className: (0, r.Z)({
                        [u().component]: !0,
                        [u().hasVariantConductor]: m === a.Conductor,
                        [u().hasVariantContentKing]: m === a.ContentKing
                    }),
                    children: [(0, o.jsx)("div", {
                        className: (0, r.Z)({
                            [u().logo]: !0,
                            [u().hasVariantConductor]: m === a.Conductor,
                            [u().hasVariantContentKing]: m === a.ContentKing
                        }),
                        children: (0, o.jsx)("h3", {
                            className: "visually-hidden",
                            children: d
                        })
                    }), t && (0, o.jsx)("div", {
                        className: u().blurb,
                        children: (0, o.jsx)(c.H, {
                            children: t
                        })
                    }), (0, o.jsx)("div", {
                        className: (0, r.Z)({
                            [u().ctaElement]: !0,
                            [u().isHiddenOnMobile]: !0
                        }),
                        children: n
                    }), (0, o.jsxs)("div", {
                        className: u().content,
                        children: [(0, o.jsx)(c.H, {
                            className: (0, r.Z)({
                                [u().text]: !0,
                                [u().isLongContentHidden]: g
                            }),
                            children: i
                        }), g && (0, o.jsx)("div", {
                            "aria-hidden": "true",
                            className: u().showContentLink,
                            children: (0, o.jsx)(s.B, {
                                href: "#",
                                onClick: e => {
                                    e.preventDefault(), h(!1)
                                },
                                children: "Learn more"
                            })
                        })]
                    }), (0, o.jsx)("div", {
                        className: u().ctaElement,
                        children: n
                    })]
                })
            }
        },
        49514: function(e, t, i) {
            "use strict";
            i.d(t, {
                Z0: function() {
                    return h
                }
            });
            var n, a, o, r, l = i(27573),
                s = i(45531),
                c = i.n(s);
            i(7653);
            var d = i(74792),
                u = i(82317),
                m = i(83494),
                g = i.n(m);
            (n = o || (o = {})).Medium = "medium", n.Large = "large", (a = r || (r = {})).Normal = "normal", a.Reversed = "reversed", a.Light = "light";
            let h = e => {
                let {
                    href: t,
                    onClick: i,
                    size: n = "medium",
                    title: a,
                    type: o,
                    variant: r = "normal"
                } = e;
                return (0, l.jsx)(u.l, {
                    className: c()({
                        [g().component]: !0,
                        [g().hasReversedLook]: "reversed" === r,
                        [g().hasLightLook]: "light" === r,
                        [g().isLarge]: "large" === n
                    }),
                    href: t,
                    onClick: i,
                    target: "ck_popup",
                    title: null != a ? a : o,
                    children: (0, l.jsx)(d.QZ, {
                        size: 20,
                        type: o,
                        variant: "light" === r ? d.zU.Dark : d.zU.Light
                    })
                })
            }
        },
        47393: function(e, t, i) {
            "use strict";
            i.r(t), i.d(t, {
                ShareThisArticle: function() {
                    return u
                }
            });
            var n = i(27573),
                a = i(45531),
                o = i.n(a);
            i(7653);
            var r = i(55932),
                l = i(49514),
                s = i(69276),
                c = i(76004),
                d = i.n(c);
            let u = e => {
                let {
                    label: t,
                    pageTitle: i,
                    shareFacebookTitle: a,
                    shareLinkedInTitle: c,
                    shareTwitterTitle: u,
                    url: m
                } = e, g = encodeURIComponent(i);
                return (0, n.jsxs)("section", {
                    className: o()({
                        [d().component]: !0,
                        "typo-block": !0
                    }),
                    children: [(0, n.jsx)("div", {
                        className: d().title,
                        children: t
                    }), (0, n.jsxs)(r.q, {
                        children: [(0, n.jsx)(l.Z0, {
                            href: `https://www.facebook.com/sharer/sharer.php?display=popup&u=${m}`,
                            onClick: () => window.open(`https://www.facebook.com/sharer/sharer.php?display=popup&u=${m}`, "ck_popup", "toolbar=0,status=0,resizable=1,width=626,height=600"),
                            title: a,
                            type: s.z.Facebook
                        }), (0, n.jsx)(l.Z0, {
                            href: `https://twitter.com/intent/tweet?title=${g}%20–&url=${m}`,
                            onClick: () => window.open(`https://twitter.com/intent/tweet?title=${g}%20–&url=${m}`, "ck_popup", "toolbar=0,status=0,resizable=1,width=600,height=340"),
                            title: u,
                            type: s.z.Twitter
                        }), (0, n.jsx)(l.Z0, {
                            href: `https://www.linkedin.com/sharing/share-offsite/?url=${m}`,
                            onClick: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${m}`, "ck_popup", "toolbar=0,status=0,resizable=1,width=600,height=560"),
                            title: c,
                            type: s.z.LinkedIn
                        })]
                    })]
                })
            }
        },
        2846: function(e, t, i) {
            "use strict";
            i.r(t), i.d(t, {
                BigMarkerForm: function() {
                    return p
                }
            });
            var n = i(27573),
                a = i(45531),
                o = i.n(a),
                r = i(7653),
                l = i(60580),
                s = i(14535),
                c = i(67461),
                d = i(52155),
                u = i(58832),
                m = i(23260),
                g = i(50002),
                h = i.n(g);
            let p = e => {
                let {
                    backgroundColor: t,
                    children: i = null,
                    formId: a,
                    liveButtonLabel: g,
                    liveTitle: p,
                    minHeight: b,
                    onReady: _,
                    recordingButtonLabel: f,
                    recordingTitle: v,
                    type: k = "webinar",
                    upcomingButtonLabel: y,
                    upcomingTitle: w
                } = e, L = `${a}`, [S, C] = (0, r.useState)(!0), [x, T] = (0, r.useState)(!1), B = (0, l.G)("big-marker-form-label"), N = (0, r.useRef)(null), z = new URLSearchParams({
                    cid: "1afee4288193",
                    club: "conductor",
                    componentId: B,
                    conference: a,
                    enable_iframe: "false",
                    link_to_channel: "false",
                    link_color: t === c.YI.SecondaryLime ? "000000" : "",
                    live_button_text: null != g ? g : "",
                    live_sub_title: null != p ? p : "",
                    rec_button_text: null != f ? f : "",
                    rec_sub_title: null != v ? v : "",
                    redirect_to_confirmation_page: "0",
                    upcoming_button_text: null != y ? y : "",
                    upcoming_sub_title: null != w ? w : "",
                    widget_button_registered_content: "",
                    series_register: "series" === k ? "series_register" : "",
                    widget_height: "",
                    widget_redirect_type: "no_redirect",
                    widget_type: "form_register",
                    widget_webinar_descriptions: "",
                    widget_width: ""
                }).toString();
                (0, s.useExternalScript)(`https://www.bigmarker.com/widget/register_widget.js?${z}`, () => C(!1));
                let [j, D] = (0, r.useState)(null);
                (0, r.useEffect)(() => {
                    let e;
                    return ! function t() {
                        var i, n, a;
                        let o = null === (i = N.current) || void 0 === i ? void 0 : i.querySelector(".bigmarker-widget-box");
                        o ? (D(null !== (a = null === (n = N.current) || void 0 === n ? void 0 : n.firstElementChild) && void 0 !== a ? a : null), setTimeout(() => {
                            let e = o.querySelector("form");
                            _ && e instanceof HTMLFormElement && _(e), T(!0)
                        }, 320)) : e = setTimeout(t, 16)
                    }(), () => {
                        clearTimeout(e)
                    }
                }, [_]);
                let M = (0, r.useMemo)(() => {
                        if (!b) return {};
                        let [e, t, i] = (0, d.tv)(b);
                        return {
                            "--bm-form-mobile-min-height": `${e}px`,
                            "--bm-form-tablet-min-height": `${t}px`,
                            "--bm-form-desktop-min-height": `${i}px`
                        }
                    }, [b]),
                    A = (0, r.useCallback)(() => {
                        let e = o()({
                            [h().form]: !0,
                            [h().isBtnBlue]: t === c.YI.SecondaryLime || t === c.YI.AuxiliaryWhite,
                            [h().ready]: x
                        });
                        return (0, n.jsx)("div", {
                            className: e,
                            children: (0, n.jsx)("div", {
                                id: "bigmarker-conference-widget",
                                children: (0, n.jsx)("div", {
                                    id: `bigmarker-conference-widget-container${L}`,
                                    ref: e => {
                                        (0, u.vT)(e) && null !== j && (e.innerHTML = "", e.appendChild(j))
                                    }
                                })
                            })
                        })
                    }, [t, j, L, x]);
                return null === i ? (0, n.jsxs)("div", {
                    className: o()({
                        [h().component]: !0
                    }),
                    style: M,
                    children: [null === j && (0, n.jsx)("div", {
                        id: `bigmarker-conference-widget-container${L}`,
                        ref: N,
                        style: {
                            display: "none"
                        }
                    }), A()]
                }) : (0, n.jsxs)("div", {
                    className: h().component,
                    id: "bigmarker-conference-widget",
                    style: M,
                    children: [null === j && (0, n.jsx)("div", {
                        id: `bigmarker-conference-widget-container${a}`,
                        ref: N,
                        style: {
                            display: "none"
                        }
                    }), (0, m.e)(i, {
                        renderForm: A,
                        isActive: !S,
                        isLoading: S || !x
                    })]
                })
            }
        },
        29140: function(e, t, i) {
            "use strict";
            i.r(t), i.d(t, {
                CheckboxField: function() {
                    return w
                },
                CheckboxFieldCheckedState: function() {
                    return l
                },
                CheckboxFieldSize: function() {
                    return s
                }
            });
            var n, a, o, r, l, s, c = i(27573),
                d = i(45531),
                u = i.n(d),
                m = i(7653),
                g = i(52155),
                h = i(43325),
                p = i(39666),
                b = i(35849),
                _ = i.n(b);
            (n = r || (r = {})).Medium = "medium", n.Large = "large";
            var f = e => {
                    let {
                        children: t,
                        description: i,
                        disabled: n = !1,
                        fieldName: a,
                        label: o,
                        size: r = "medium"
                    } = e;
                    return (0, c.jsxs)("div", {
                        className: u()({
                            [_().component]: !0,
                            [_().isMedium]: "medium" === r,
                            [_().isLarge]: "large" === r,
                            [_().isDisabled]: n
                        }),
                        children: [(0, c.jsxs)("div", {
                            className: _().fieldContainer,
                            children: [(0, c.jsx)("div", {
                                className: _().field,
                                children: t
                            }), (0, c.jsx)("label", {
                                className: _().label,
                                htmlFor: a,
                                children: o
                            })]
                        }), i && (0, c.jsx)("div", {
                            className: _().description,
                            children: (0, c.jsx)(p.H, {
                                children: i
                            })
                        })]
                    })
                },
                v = i(44458),
                k = i(42534),
                y = i.n(k);
            (a = l || (l = {})).Checked = "checked", a.Indeterminate = "indeterminate", a.Unchecked = "unchecked", (o = s || (s = {})).Medium = "medium", o.Large = "large";
            let w = e => {
                let {
                    checkedState: t = "unchecked",
                    description: i,
                    disabled: n,
                    errorText: a,
                    id: o,
                    label: l,
                    name: s,
                    onChange: d,
                    readOnly: p,
                    required: b,
                    size: _ = "medium",
                    validationStatus: k = h.c.Unknown,
                    value: w
                } = e, L = null != o ? o : s, S = (0, m.useRef)(null);
                (0, m.useEffect)(() => {
                    S.current && (S.current.indeterminate = "indeterminate" === t)
                }, [t]);
                let [C, x, T] = (0, g.tv)(_), B = (0, c.jsx)("input", {
                    "aria-describedby": a ? `${L}-description` : void 0,
                    "aria-required": b,
                    className: u()({
                        [y().component]: !0,
                        [y().hasIndeterminateState]: "indeterminate" === t,
                        [y().isInvalid]: k === h.c.Invalid,
                        [y().isValid]: k === h.c.Valid,
                        [y().isMediumOnMobile]: "medium" === C,
                        [y().isLargeOnMobile]: "large" === C,
                        [y().isMediumOnTablet]: "medium" === x,
                        [y().isLargeOnTablet]: "large" === x,
                        [y().isMediumOnDesktop]: "medium" === T,
                        [y().isLargeOnDesktop]: "large" === T
                    }),
                    defaultChecked: "unchecked" !== t,
                    disabled: null != p ? p : n,
                    id: s,
                    name: s,
                    onChange: d,
                    ref: S,
                    required: b,
                    type: "checkbox",
                    value: w
                });
                if (l) {
                    let e = r.Medium;
                    "large" === _ && (e = r.Large), B = (0, c.jsx)(f, {
                        description: i,
                        disabled: n,
                        fieldName: s,
                        label: l,
                        size: e,
                        children: B
                    })
                }
                return a && (B = (0, c.jsx)(v.Z, {
                    errorText: a,
                    fieldId: L,
                    fieldName: s,
                    children: B
                })), B
            }
        },
        43325: function(e, t, i) {
            "use strict";
            var n, a;
            i.d(t, {
                c: function() {
                    return n
                }
            }), (a = n || (n = {})).Invalid = "invalid", a.Unknown = "none", a.Valid = "valid"
        },
        44458: function(e, t, i) {
            "use strict";
            i.d(t, {
                O: function() {
                    return a
                },
                Z: function() {
                    return g
                }
            });
            var n, a, o = i(27573),
                r = i(45531),
                l = i.n(r);
            i(7653);
            var s = i(97454),
                c = i.n(s);
            let d = e => {
                let {
                    children: t
                } = e;
                return (0, o.jsx)("div", {
                    className: c().component,
                    children: t
                })
            };
            var u = i(96244),
                m = i.n(u);
            (n = a || (a = {})).Small = "small", n.Medium = "medium", n.Large = "large";
            var g = e => {
                let {
                    children: t,
                    errorText: i,
                    fieldId: n,
                    fieldName: a,
                    label: r,
                    size: s = "medium"
                } = e;
                return (0, o.jsxs)(a ? "div" : "fieldset", {
                    className: l()({
                        [m().component]: !0,
                        [m().isSmall]: "small" === s,
                        [m().isMedium]: "medium" === s,
                        [m().isLarge]: "large" === s
                    }),
                    children: [r && (0, o.jsx)(a ? "label" : "legend", {
                        className: m().label,
                        htmlFor: a,
                        id: n ? `${n}-label` : void 0,
                        children: r
                    }), (0, o.jsx)("div", {
                        className: m().field,
                        children: t
                    }), i && (0, o.jsx)("div", {
                        className: m().errorMessage,
                        id: n ? `${n}-description` : void 0,
                        children: (0, o.jsx)(d, {
                            children: i
                        })
                    })]
                })
            }
        },
        97104: function(e, t, i) {
            "use strict";
            i.d(t, {
                U: function() {
                    return h
                },
                r: function() {
                    return a
                }
            });
            var n, a, o = i(27573),
                r = i(45531),
                l = i.n(r),
                s = i(7653),
                c = i(52155),
                d = i(43325),
                u = i(44458),
                m = i(46886),
                g = i.n(m);
            (n = a || (a = {})).Small = "small", n.Medium = "medium", n.Large = "large";
            let h = (0, s.forwardRef)((e, t) => {
                let {
                    autoComplete: i,
                    autoFocus: n,
                    defaultValue: a,
                    disabled: r,
                    errorText: s,
                    id: m,
                    label: h,
                    name: p,
                    onBlur: b,
                    onChange: _,
                    onFocus: f,
                    onKeyDown: v,
                    placeholder: k,
                    readOnly: y,
                    required: w,
                    size: L = "medium",
                    type: S = "text",
                    validationStatus: C = d.c.Unknown,
                    value: x
                } = e, T = null != m ? m : p, [B, N, z] = (0, c.tv)(L), j = (0, o.jsx)("input", {
                    "aria-describedby": s ? `${T}-description` : void 0,
                    "aria-labelledby": h ? `${T}-label` : void 0,
                    "aria-required": w,
                    autoComplete: i,
                    autoFocus: n,
                    className: l()({
                        [g().component]: !0,
                        [g().isInvalid]: C === d.c.Invalid,
                        [g().isValid]: C === d.c.Valid,
                        [g().isSmallOnMobile]: "small" === B,
                        [g().isMediumOnMobile]: "medium" === B,
                        [g().isLargeOnMobile]: "large" === B,
                        [g().isSmallOnTablet]: "small" === N,
                        [g().isMediumOnTablet]: "medium" === N,
                        [g().isLargeOnTablet]: "large" === N,
                        [g().isSmallOnDesktop]: "small" === z,
                        [g().isMediumOnDesktop]: "medium" === z,
                        [g().isLargeOnDesktop]: "large" === z
                    }),
                    defaultValue: a,
                    disabled: r,
                    id: p,
                    name: p,
                    onBlur: b,
                    onChange: _,
                    onFocus: f,
                    onKeyDown: v,
                    placeholder: k,
                    readOnly: y,
                    ref: t,
                    required: w,
                    type: S,
                    value: x
                }), D = u.O.Medium;
                return "small" === L && (D = u.O.Small), "large" === L && (D = u.O.Large), (0, o.jsx)(u.Z, {
                    errorText: s,
                    fieldId: T,
                    fieldName: p,
                    label: h,
                    size: D,
                    children: j
                })
            })
        },
        32124: function(e, t, i) {
            "use strict";
            i.d(t, {
                W: function() {
                    return c
                }
            });
            var n = i(27573),
                a = i(45531),
                o = i.n(a);
            i(7653);
            var r = i(52155),
                l = i(466),
                s = i.n(l);
            let c = e => {
                let {
                    button: t,
                    errorMessage: i,
                    field: a,
                    inlineFlow: l = !0,
                    legalText: c
                } = e, [d, u, m] = (0, r.tv)(l);
                return (0, n.jsxs)(n.Fragment, {
                    children: [i && (0, n.jsx)("div", {
                        className: s().errorMessage,
                        children: i
                    }), (0, n.jsxs)("div", {
                        className: o()({
                            [s().component]: !0,
                            [s().isInlineOnMobile]: d,
                            [s().isInlineOnTablet]: u,
                            [s().isInlineOnDesktop]: m
                        }),
                        children: [(0, n.jsx)("div", {
                            className: s().field,
                            children: a
                        }), (0, n.jsx)("div", {
                            className: s().button,
                            children: t
                        })]
                    }), c && (0, n.jsx)("div", {
                        className: s().legalText,
                        children: c
                    })]
                })
            }
        },
        74792: function(e, t, i) {
            "use strict";
            i.d(t, {
                QZ: function() {
                    return u
                },
                zU: function() {
                    return a
                }
            });
            var n, a, o = i(27573),
                r = i(45531),
                l = i.n(r);
            i(7653);
            var s = i(69276),
                c = i(29949),
                d = i.n(c);
            (n = a || (a = {})).Dark = "dark", n.Light = "light";
            let u = e => {
                let {
                    size: t = 32,
                    type: i,
                    variant: n = "dark"
                } = e;
                return (0, o.jsx)("span", {
                    className: l()({
                        [d().component]: !0,
                        [d().CustomLink]: i === s.z.CustomLink,
                        [d().Facebook]: i === s.z.Facebook,
                        [d().Instagram]: i === s.z.Instagram,
                        [d().LinkedIn]: i === s.z.LinkedIn,
                        [d().Twitter]: i === s.z.Twitter,
                        [d().YouTube]: i === s.z.YouTube,
                        [d().X]: i === s.z.X,
                        [d().isDark]: "dark" === n,
                        [d().isLight]: "light" === n
                    }),
                    style: {
                        height: t,
                        width: t
                    },
                    children: i
                })
            }
        },
        77607: function(e, t, i) {
            "use strict";
            i.r(t), i.d(t, {
                WatchPLGFreeTrialPoster: function() {
                    return m
                }
            });
            var n = i(27573),
                a = i(7653),
                o = i(950),
                r = i(48455),
                l = i(82317),
                s = i(79492),
                c = i(89304),
                d = i(19866),
                u = i.n(d);
            let m = e => {
                let {
                    label: t,
                    language: i = o.SQ.English,
                    lazyLoading: d
                } = e, [m, g] = (0, a.useState)(!1), h = {
                    cloudflareVideoId: "b05695994d18661522c76b74670d9786",
                    posterSrc: "https://customer-wqaprkgy26y8ry4r.cloudflarestream.com/b05695994d18661522c76b74670d9786/thumbnails/thumbnail.jpg"
                };
                return i === o.SQ.German && (h.cloudflareVideoId = "61aa8993d202578545ff8a81c11dc045", h.posterSrc = "https://customer-wqaprkgy26y8ry4r.cloudflarestream.com/61aa8993d202578545ff8a81c11dc045/thumbnails/thumbnail.jpg"), (0, n.jsxs)(n.Fragment, {
                    children: [(0, n.jsx)("div", {
                        className: u().component,
                        children: (0, n.jsxs)(l.l, {
                            className: u().link,
                            onClick: () => g(!0),
                            title: t,
                            children: [(0, n.jsx)("span", {
                                className: u().cta,
                                children: t
                            }), (0, n.jsx)(r.default, {
                                className: u().image,
                                height: 356,
                                lazyLoading: d,
                                metadata: {
                                    aspectRatio: 1.333,
                                    height: 720,
                                    width: 960,
                                    isOpaque: !0,
                                    lqip: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAIAAABr+ngCAAAACXBIWXMAAAsTAAALEwEAmpwYAAADBUlEQVQokR2SS2/bRgCE+TtqJf1vPTRt48Sy49b+Ez00RRIYbhIDSY851IFdSxYliy9xuQ9yubt8U6RE6kHJVmW5KnwspMFcB/MNMNI3e9/9+PrXL1/P221ZNwzbtl1KmetyzsXWnHNKqW3bhBCEELCA0TMURel0ZGmn/uzFu9fnjStVU4FlOZQyzoQQnuf5W3m+x4VwmUspJYRABE0ANF1X1K5UO3heP33buGkDACBCNnVczrgQwve8wPe39gKfe4Ix5lAHEQwsSzcMVVOl2qvdg/cnsq5ijBHBDqVc8DAKkzRJ+mmcJGEUer4vPCF8wYWgrosJARbQDF2qHe4enp0qlsnZhjYIw7SflqNyWk2rqhqNx1meR3EUhGEYhcL3KKPUpZjgHjClJ0d7v3z60CM4SZJ+luXDYTEeV/PZYvnPcrlcLBbTajIosn4W+REzSKcLrm2KKaUWtKSnx/Wjzx+BY2dZNtgmR7Nqvri7f1it1+uHh1VVFWmMfaYg67Ihf7i++dN2gOu6EEHp6fH+0ecz4Nh5nhdlOamm87vb5f39+r/14+Pjev1vNS0SH/m24lrXUP9KoCy447Jt+Nvj+tGnj1vsOMuzstysvb27XS6Xq4fVcnU/u50XoyLP+1kaJ1EQBD73hU0dC0Hpyc8vDs/+6ALT5Uz4XhzH/SwbFsPJZFLNqmo+m1TTcjIpyjIf5HGa8CBAjJkE9ywg1Q5+2n9/0tIUhJHjUs/34yTOBnlZlqPxeDwuyzIfDvM8z9J+GsUR9zzsuiZGPdOUavs/1E/fNW46PbOHMGKchWG45S/KshgMsiT2wtALw2DzNs9zGbMdx4JQNwxpZ+/Zy5M3F3JLURRN1yCCjPMo8tPYSSMnDDimjkkwIMQiNrJtSIiFNrWKqkg7L7/fffv7efNKllstuaXpGiLYpgDDS6d3QaDRRaQFUQciFWEdYQ1CDQBV19ud9qb5+Zvf/vr7stlsNJqNrtI1LWBCQ+le6fKFrnU7EHUQ7iKsIqRalmKaimHcKN1m6/p/OOrDwxMZM8UAAAAASUVORK5CYII="
                                },
                                src: "https://cdn.sanity.io/images/tkl0o0xu/production/b6cc968d194520b0500821cf882e6edb0cab792e-960x720.png",
                                width: 476
                            })]
                        })
                    }), (0, n.jsx)(s.Modal, {
                        closeBtnAriaLabel: "Close This panel",
                        isClosable: !0,
                        isOpen: m,
                        maxWidth: 900,
                        onCloseCallback: () => g(!1),
                        children: (0, n.jsx)(c.B, {
                            autoplay: !0,
                            height: 1080,
                            loop: !1,
                            width: 1920,
                            ...h
                        })
                    })]
                })
            }
        },
        76362: function(e, t, i) {
            "use strict";
            i.d(t, {
                H: function() {
                    return h
                },
                x: function() {
                    return a
                }
            });
            var n, a, o = i(27573),
                r = i(45531),
                l = i.n(r),
                s = i(7653),
                c = i(22547),
                d = i(29194),
                u = i(58832),
                m = i(56215),
                g = i.n(m);
            (n = a || (a = {})).Dark = "dark", n.Light = "light";
            let h = e => {
                let {
                    announcement: t,
                    ctaButton: i = null,
                    description: n,
                    variant: a
                } = e;
                return (0, o.jsxs)("div", {
                    "aria-live": "polite",
                    className: l()({
                        [g().component]: !0,
                        [g().isDark]: "dark" === a,
                        [g().isLight]: "light" === a
                    }),
                    role: "status",
                    children: [t && (0, o.jsx)("div", {
                        className: g().message,
                        children: t
                    }), n && (0, o.jsx)("div", {
                        className: g().info,
                        children: n
                    }), i && (0, o.jsx)("div", {
                        className: g().ctaButton,
                        children: (0, s.isValidElement)(i) ? i : (0, u.Kn)(i) ? (0, o.jsx)(c.Button, {
                            download: i.download,
                            href: i.href,
                            onClick: i.onClick,
                            variant: d.Wu.Highlight,
                            children: i.label
                        }) : null
                    })]
                })
            }
        },
        57320: function(e, t, i) {
            "use strict";
            i.r(t), i.d(t, {
                GlossaryNavigation: function() {
                    return _
                }
            });
            var n, a, o = i(27573),
                r = i(45531),
                l = i.n(r);
            i(7653);
            var s = i(52155),
                c = i(43325),
                d = i(44458),
                u = i(79425),
                m = i.n(u);
            (n = a || (a = {})).Small = "small", n.Medium = "medium", n.Large = "large";
            let g = e => {
                let {
                    disabled: t,
                    errorText: i,
                    id: n,
                    label: a,
                    name: r,
                    onChange: u,
                    options: g,
                    placeholder: h,
                    size: p = "medium",
                    validationStatus: b = c.c.Unknown,
                    value: _
                } = e, f = null != n ? n : r, [v, k, y] = (0, s.tv)(p), w = e => {
                    u && u(e)
                }, L = (0, o.jsxs)("select", {
                    "aria-describedby": i ? `${f}-description` : void 0,
                    "aria-labelledby": a ? `${f}-label` : void 0,
                    className: l()({
                        [m().component]: !0,
                        [m().isInvalid]: b === c.c.Invalid,
                        [m().isValid]: b === c.c.Valid,
                        [m().isSmallOnMobile]: "small" === v,
                        [m().isMediumOnMobile]: "medium" === v,
                        [m().isLargeOnMobile]: "large" === v,
                        [m().isSmallOnTablet]: "small" === k,
                        [m().isMediumOnTablet]: "medium" === k,
                        [m().isLargeOnTablet]: "large" === k,
                        [m().isSmallOnDesktop]: "small" === y,
                        [m().isMediumOnDesktop]: "medium" === y,
                        [m().isLargeOnDesktop]: "large" === y
                    }),
                    disabled: t,
                    id: r,
                    name: r,
                    onChange: e => w(e.target.value),
                    required: !0,
                    value: _,
                    children: [(!_ || "" === _) && (0, o.jsx)("option", {
                        className: m().option,
                        disabled: !0,
                        value: "",
                        children: h
                    }), g.map((e, t) => (0, o.jsx)("option", {
                        className: m().option,
                        disabled: e.disabled,
                        hidden: e.hidden,
                        value: e.value,
                        children: e.label
                    }, `option-${t}`))]
                });
                if (null != a ? a : i) {
                    let e = d.O.Medium;
                    return "small" === p && (e = d.O.Small), "large" === p && (e = d.O.Large), (0, o.jsx)(d.Z, {
                        errorText: i,
                        fieldId: f,
                        fieldName: r,
                        label: a,
                        size: e,
                        children: L
                    })
                }
                return L
            };
            var h = i(82317),
                p = i(40329),
                b = i.n(p);
            let _ = e => {
                let {
                    ariaLabel: t = "Scroll to navigation",
                    links: i,
                    onChange: n,
                    selectedLinkKey: a
                } = e, r = e => n(e);
                return (0, o.jsxs)("nav", {
                    "aria-label": t,
                    className: b().component,
                    role: "navigation",
                    children: [(0, o.jsx)("div", {
                        className: b().select,
                        children: (0, o.jsx)(g, {
                            label: t,
                            name: "glossary-nav",
                            onChange: r,
                            options: i.map(e => ({
                                disabled: e.isDisabled,
                                label: e.label,
                                value: e.targetId
                            })),
                            placeholder: "-",
                            value: a
                        })
                    }), (0, o.jsx)("ul", {
                        className: b().list,
                        children: i.map((e, t) => (0, o.jsx)("li", {
                            className: b().item,
                            children: e.isDisabled ? (0, o.jsx)("span", {
                                className: l()({
                                    [b().link]: !0,
                                    [b().isDisabled]: !0
                                }),
                                children: e.label
                            }) : (0, o.jsx)(h.l, {
                                "aria-current": e.key === a,
                                className: l()({
                                    [b().link]: !0,
                                    [b().isActive]: e.key === a
                                }),
                                href: `#${e.targetId}`,
                                onClick: t => {
                                    t.preventDefault(), t.stopPropagation(), r(e.key)
                                },
                                children: e.label
                            })
                        }, `glossary-nav-item${t}`))
                    })]
                })
            }
        },
        10400: function(e, t, i) {
            "use strict";
            i.r(t), i.d(t, {
                HeaderLanguageSwitcher: function() {
                    return v
                }
            });
            var n, a, o = i(27573);
            i(7653);
            var r = i(36809),
                l = i(10214),
                s = i(18250),
                c = i.n(s);
            let d = e => {
                let {
                    description: t,
                    href: i,
                    linkLabel: n
                } = e;
                return (0, o.jsxs)("div", {
                    className: c().component,
                    children: [(0, o.jsx)("span", {
                        className: c().description,
                        children: t
                    }), (0, o.jsx)(l.B, {
                        href: i,
                        prefetch: !1,
                        variant: l.r.Dark,
                        children: n
                    })]
                })
            };
            var u = i(57908),
                m = i(48567),
                g = i(82317),
                h = i(79748),
                p = i.n(h);
            (n = a || (a = {})).Normal = "normal", n.Reversed = "reversed";
            let b = e => {
                let {
                    "aria-label": t,
                    href: i,
                    label: n,
                    variant: a = "normal"
                } = e;
                return (0, o.jsxs)(g.l, {
                    "aria-label": t,
                    className: (0, u.Z)({
                        [p().component]: !0,
                        [p().hasReversedLook]: "reversed" === a
                    }),
                    href: i,
                    prefetch: !1,
                    children: [(0, o.jsx)("span", {
                        className: p().icon,
                        children: (0, o.jsx)(m._k, {
                            size: 20,
                            type: m.Rk.Globe,
                            variant: "reversed" === a ? m.lC.Reversed : m.lC.Normal
                        })
                    }), (0, o.jsx)("span", {
                        className: p().label,
                        children: n
                    })]
                })
            };
            var _ = i(46129),
                f = i.n(_);
            let v = e => {
                let {
                    ariaLabel: t,
                    description: i,
                    desktopLabel: n,
                    href: l,
                    mobileBackgroundContext: s,
                    mobileLabel: c
                } = e;
                return (0, o.jsxs)(o.Fragment, {
                    children: [(0, o.jsx)("div", {
                        className: f().mobileLanguageSwitcher,
                        children: (0, o.jsx)(b, {
                            "aria-label": t,
                            href: l,
                            label: c,
                            variant: s === r.N.Dark ? a.Reversed : a.Normal
                        })
                    }), (0, o.jsx)("div", {
                        className: f().languageBar,
                        children: (0, o.jsx)(d, {
                            description: i,
                            href: l,
                            linkLabel: n
                        })
                    })]
                })
            }
        },
        10214: function(e, t, i) {
            "use strict";
            i.d(t, {
                B: function() {
                    return g
                },
                r: function() {
                    return a
                }
            });
            var n, a, o = i(27573),
                r = i(45531),
                l = i.n(r),
                s = i(7653),
                c = i(58832),
                d = i(82317),
                u = i(26259),
                m = i.n(u);
            (n = a || (a = {})).Dark = "dark", n.Default = "default", n.Light = "light";
            let g = (0, s.forwardRef)((e, t) => {
                let {
                    children: i,
                    download: n = null,
                    href: a,
                    hrefExternalNote: r,
                    iconLeft: s,
                    iconRight: u,
                    isExternal: g,
                    onClick: h,
                    prefetch: p,
                    variant: b = "default"
                } = e, _ = null != g ? g : (0, c.Bm)(a);
                return (0, o.jsxs)(d.l, {
                    className: l()({
                        [m().component]: !0,
                        [m().isDark]: "dark" === b,
                        [m().isLight]: "light" === b,
                        [m().isExternal]: _
                    }),
                    download: n,
                    href: a,
                    onClick: h,
                    prefetch: p,
                    ref: t,
                    rel: _ ? "noopener" : void 0,
                    target: _ ? "_blank" : void 0,
                    children: [s && (0, o.jsx)("span", {
                        className: m().icon,
                        children: s
                    }), (0, o.jsx)("span", {
                        className: m().link,
                        children: i
                    }), _ && (0, o.jsxs)("span", {
                        className: "visually-hidden",
                        children: [" ", r]
                    }), u && (0, o.jsx)("span", {
                        className: m().icon,
                        children: u
                    })]
                })
            })
        },
        60095: function(e, t, i) {
            "use strict";
            i.r(t), i.d(t, {
                MainNavigation: function() {
                    return b
                },
                MainNavigationDropdownVariant: function() {
                    return r
                },
                MainNavigationVariant: function() {
                    return o
                }
            });
            var n, a, o, r, l = i(27573),
                s = i(45531),
                c = i.n(s),
                d = i(7653),
                u = i(73099),
                m = i(58832),
                g = i(82317),
                h = i(28768),
                p = i.n(h);
            (n = o || (o = {})).PrimaryLight = "primary-light", n.PrimaryDark = "primary-dark", n.Secondary = "secondary", (a = r || (r = {})).Simple = "simple", a.Fullwidth = "fullwidth";
            let b = e => {
                let {
                    ariaLabel: t,
                    links: i,
                    variant: n
                } = e, a = (0, u.useSmallBreakpoint)(), [o, r] = (0, d.useState)(i.map(e => !("divider" in e) && !!e.dropdown));
                return (0, l.jsx)("nav", {
                    "aria-label": t,
                    className: c()({
                        [p().component]: !0,
                        [p().isPrimary]: "primary-dark" === n || "primary-light" === n,
                        [p().isPrimaryDark]: "primary-dark" === n,
                        [p().isPrimaryLight]: "primary-light" === n,
                        [p().isSecondary]: "secondary" === n
                    }),
                    role: "navigation",
                    children: (0, l.jsx)("ul", {
                        className: p().list,
                        children: i.map((e, t) => {
                            if ("divider" in e) return (0, l.jsx)("li", {
                                "aria-hidden": !0,
                                className: p().divider
                            }, `main-navigation-item-${t}`);
                            let i = a && e.dropdown,
                                n = i && o[t];
                            return (0, l.jsxs)("li", {
                                className: c()({
                                    [p().item]: !0,
                                    [p().hasDropdown]: e.dropdown,
                                    [p().hasSimpleDropdown]: "fullwidth" !== e.dropdownVariant,
                                    [p().hasFullwidthDropdown]: "fullwidth" === e.dropdownVariant
                                }),
                                children: [a && i ? (0, l.jsx)("button", {
                                    "aria-expanded": !n,
                                    "aria-haspopup": "true",
                                    className: c()({
                                        [p().link]: !0,
                                        [p().isActive]: e.isActive,
                                        [p().isCollapsed]: n
                                    }),
                                    onClick: () => {
                                        let e = [...o];
                                        e[t] = !e[t], r(e)
                                    },
                                    children: (0, l.jsxs)("span", {
                                        className: p().linkContainer,
                                        children: [e.icon && (0, l.jsx)(l.Fragment, {
                                            children: (0, m.Kn)(e.icon) && "default" in e.icon ? (0, l.jsxs)(l.Fragment, {
                                                children: [(0, l.jsx)("span", {
                                                    className: c()({
                                                        [p().linkIcon]: !0,
                                                        [p().isDefault]: !0
                                                    }),
                                                    children: e.icon.default
                                                }), (0, l.jsx)("span", {
                                                    className: c()({
                                                        [p().linkIcon]: !0,
                                                        [p().isHover]: !0
                                                    }),
                                                    children: e.icon.hover
                                                })]
                                            }) : (0, l.jsx)("span", {
                                                className: p().linkIcon,
                                                children: e.icon
                                            })
                                        }), (0, l.jsx)("span", {
                                            children: e.title
                                        })]
                                    })
                                }) : (0, l.jsx)(g.l, {
                                    className: c()({
                                        [p().link]: !0,
                                        [p().isActive]: e.isActive
                                    }),
                                    href: e.href,
                                    target: e.target,
                                    children: (0, l.jsxs)("span", {
                                        className: p().linkContainer,
                                        children: [e.icon && (0, l.jsx)(l.Fragment, {
                                            children: (0, m.Kn)(e.icon) && "default" in e.icon ? (0, l.jsxs)(l.Fragment, {
                                                children: [(0, l.jsx)("span", {
                                                    className: c()({
                                                        [p().linkIcon]: !0,
                                                        [p().isDefault]: !0
                                                    }),
                                                    children: e.icon.default
                                                }), (0, l.jsx)("span", {
                                                    className: c()({
                                                        [p().linkIcon]: !0,
                                                        [p().isHover]: !0
                                                    }),
                                                    children: e.icon.hover
                                                })]
                                            }) : (0, l.jsx)("span", {
                                                className: p().linkIcon,
                                                children: e.icon
                                            })
                                        }), (0, l.jsx)("span", {
                                            children: e.title
                                        })]
                                    })
                                }), e.dropdown && (0, l.jsx)("div", {
                                    className: c()({
                                        [p().dropdown]: !0,
                                        [p().isFullwidthDropdown]: "fullwidth" === e.dropdownVariant
                                    }),
                                    hidden: !!n || void 0,
                                    children: e.dropdown
                                })]
                            }, `main-navigation-item-${t}`)
                        })
                    })
                })
            }
        },
        70254: function(e, t, i) {
            "use strict";
            i.d(t, {
                G: function() {
                    return u
                }
            });
            var n = i(27573),
                a = i(45531),
                o = i.n(a);
            i(7653);
            var r = i(36809),
                l = i(58832),
                s = i(82317),
                c = i(11270),
                d = i.n(c);
            let u = e => {
                let {
                    backgroundContext: t = r.N.Light,
                    children: i,
                    href: a,
                    iconLeft: c,
                    iconRight: u,
                    onClick: m,
                    tabIndex: g
                } = e, h = (0, n.jsxs)(n.Fragment, {
                    children: [c && (0, n.jsx)("span", {
                        className: d().icon,
                        children: c
                    }), (0, n.jsx)("span", {
                        className: o()({
                            [d().link]: !0,
                            [d().hasReversedLook]: t === r.N.Dark
                        }),
                        children: i
                    }), u && (0, n.jsx)("span", {
                        className: d().icon,
                        children: u
                    })]
                });
                if (a) {
                    let e = (0, l.Bm)(a);
                    return (0, n.jsxs)(s.l, {
                        className: o()({
                            [d().component]: !0,
                            [d().hasReversedLook]: t === r.N.Dark
                        }),
                        href: a,
                        onClick: m,
                        rel: e ? "noopener" : void 0,
                        tabIndex: g,
                        target: e ? "_blank" : void 0,
                        children: [h, e && (0, n.jsx)("span", {
                            className: "visually-hidden",
                            children: " (opens in a new tab)"
                        })]
                    })
                }
                return (0, n.jsx)("span", {
                    className: d().component,
                    onClick: m,
                    children: h
                })
            }
        },
        79492: function(e, t, i) {
            "use strict";
            i.r(t), i.d(t, {
                Modal: function() {
                    return f
                },
                ModalVariant: function() {
                    return a
                }
            });
            var n, a, o = i(27573),
                r = i(45531),
                l = i.n(r),
                s = i(81888),
                c = i.n(s),
                d = i(7653),
                u = i(3458),
                m = i(20523),
                g = i(79187),
                h = i(29039),
                p = i(48567),
                b = i(86402),
                _ = i.n(b);
            (n = a || (a = {})).Default = "default", n.Lightweight = "lightweight", n.Orange = "orange", n.Turquoise = "turquoise";
            let f = e => {
                let {
                    actionElements: t,
                    children: i,
                    closeBtnAriaLabel: n,
                    initialFocus: a,
                    isClosable: r = !0,
                    isOpen: s,
                    maxWidth: b = 640,
                    onCloseCallback: f,
                    variant: v = "default"
                } = e, k = (0, m.useScrollBlocking)(), y = (0, d.useCallback)(() => {
                    f && f()
                }, [f]);
                if ((0, d.useEffect)(() => (k(null != s && s), () => {
                        k(!1)
                    }), [s, k]), (0, d.useEffect)(() => {
                        if (r) {
                            if (!s) {
                                document.removeEventListener("keydown", e);
                                return
                            }
                            return document.addEventListener("keydown", e), () => {
                                document.removeEventListener("keydown", e)
                            }
                        }

                        function e(t) {
                            ("Escape" === t.key || "Esc" === t.key) && (y(), document.removeEventListener("keydown", e))
                        }
                    }, [y, r, s]), !s || !g.j) return null;
                let w = (0, o.jsx)("div", {
                    "aria-hidden": !s,
                    "aria-modal": "true",
                    className: l()({
                        [_().component]: !0,
                        [_().isOpen]: s,
                        [_().hasDefaultLook]: "default" === v,
                        [_().hasLightweightLook]: "lightweight" === v,
                        [_().hasOrangeLook]: "orange" === v,
                        [_().hasTurquoiseLook]: "turquoise" === v
                    }),
                    role: "dialog",
                    style: {
                        "--modal-max-width": `${b}px`
                    },
                    children: (0, o.jsx)(c(), {
                        active: s,
                        focusTrapOptions: {
                            initialFocus: a,
                            delayInitialFocus: !0
                        },
                        children: (0, o.jsx)("div", {
                            className: _().centerContainer,
                            children: (0, o.jsxs)("div", {
                                className: _().panel,
                                children: [(0, o.jsx)("div", {
                                    className: _().panelContent,
                                    children: i
                                }), t && (0, o.jsx)("div", {
                                    className: _().actionElements,
                                    children: t
                                }), r && (0, o.jsx)("div", {
                                    className: _().closeButton,
                                    children: (0, o.jsx)(h.$D, {
                                        "aria-label": n,
                                        iconType: p.Rk.Close,
                                        isRounded: !0,
                                        onClick: y,
                                        variant: h.of.Normal
                                    })
                                })]
                            })
                        })
                    })
                });
                return (0, u.createPortal)(w, document.body)
            }
        },
        37391: function(e, t, i) {
            "use strict";
            i.r(t), i.d(t, {
                SearchModal: function() {
                    return b
                }
            });
            var n = i(27573),
                a = i(45531),
                o = i.n(a),
                r = i(81888),
                l = i.n(r),
                s = i(7653),
                c = i(3458),
                d = i(20523),
                u = i(79187),
                m = i(29039),
                g = i(48567),
                h = i(80452),
                p = i.n(h);
            let b = e => {
                let {
                    children: t,
                    closeBtnAriaLabel: i,
                    initialFocus: a,
                    isOpen: r,
                    onCloseCallback: h,
                    searchField: b
                } = e, _ = (0, d.useScrollBlocking)(), f = (0, s.useCallback)(() => {
                    h && h()
                }, [h]);
                if ((0, s.useEffect)(() => (_(null != r && r), () => {
                        _(!1)
                    }), [r, _]), (0, s.useEffect)(() => {
                        function e(e) {
                            ("Escape" === e.key || "Esc" === e.key) && f()
                        }
                        if (!r) {
                            document.removeEventListener("keydown", e);
                            return
                        }
                        return document.addEventListener("keydown", e), () => {
                            document.removeEventListener("keydown", e)
                        }
                    }, [f, r]), !r || !u.j) return null;
                let v = (0, n.jsx)("div", {
                    "aria-hidden": !r,
                    "aria-modal": "true",
                    className: o()({
                        [p().component]: !0,
                        [p().isOpen]: r
                    }),
                    role: "dialog",
                    children: (0, n.jsx)(l(), {
                        active: r,
                        focusTrapOptions: {
                            initialFocus: a,
                            delayInitialFocus: !0
                        },
                        children: (0, n.jsx)("div", {
                            className: p().centerContainer,
                            children: (0, n.jsxs)("div", {
                                className: p().panel,
                                children: [(0, n.jsxs)("div", {
                                    className: p().panelContent,
                                    children: [(0, n.jsx)("div", {
                                        className: p().searchField,
                                        children: b
                                    }), (0, n.jsx)("div", {
                                        className: p().searchResults,
                                        children: t
                                    })]
                                }), (0, n.jsx)("div", {
                                    className: p().closeButton,
                                    children: (0, n.jsx)(m.$D, {
                                        "aria-label": i,
                                        iconType: g.Rk.Close,
                                        isRounded: !0,
                                        onClick: f,
                                        variant: m.of.Normal
                                    })
                                })]
                            })
                        })
                    })
                });
                return (0, c.createPortal)(v, document.body)
            }
        },
        19730: function(e, t, i) {
            "use strict";
            i.r(t), i.d(t, {
                WatchVideoModal: function() {
                    return d
                }
            });
            var n = i(27573),
                a = i(7653),
                o = i(82317),
                r = i(79492),
                l = i(89304),
                s = i(58562),
                c = i.n(s);
            let d = e => {
                let {
                    label: t,
                    videoId: i
                } = e, [s, d] = (0, a.useState)(!1);
                return (0, n.jsxs)(n.Fragment, {
                    children: [(0, n.jsx)("div", {
                        className: c().component,
                        children: (0, n.jsx)(o.l, {
                            className: c().link,
                            onClick: () => d(!0),
                            title: t,
                            children: (0, n.jsx)("span", {
                                className: c().cta,
                                children: t
                            })
                        })
                    }), (0, n.jsx)(r.Modal, {
                        closeBtnAriaLabel: "Close This panel",
                        isClosable: !0,
                        isOpen: s,
                        maxWidth: 900,
                        onCloseCallback: () => d(!1),
                        children: (0, n.jsx)(l.B, {
                            autoplay: !0,
                            cloudflareVideoId: i,
                            height: 1080,
                            loop: !1,
                            width: 1920
                        })
                    })]
                })
            }
        },
        40081: function(e, t, i) {
            "use strict";
            i.r(t), i.d(t, {
                Accordion: function() {
                    return m
                }
            });
            var n = i(27573),
                a = i(45531),
                o = i.n(a),
                r = i(7653),
                l = i(60580),
                s = i(36809),
                c = i(6074),
                d = i(24451),
                u = i.n(d);
            let m = e => {
                var t;
                let {
                    backgroundContext: i,
                    items: a
                } = e, d = (0, l.G)("accordion"), m = null !== (t = e.ariaId) && void 0 !== t ? t : d, [g, h] = (0, r.useState)(0);
                return (0, n.jsx)("div", {
                    className: o()({
                        [u().component]: !0,
                        [u().hasReversedLook]: i === s.N.Dark
                    }),
                    children: (0, n.jsx)("div", {
                        className: u().sections,
                        children: a.map((e, t) => (0, n.jsxs)("div", {
                            className: o()({
                                [u().section]: !0,
                                [u().isActive]: g === t
                            }),
                            children: [(0, n.jsx)("h3", {
                                className: u().sectionLabel,
                                children: (0, n.jsxs)("button", {
                                    "aria-controls": `${m}-panel-${t}`,
                                    "aria-expanded": g === t ? "true" : "false",
                                    className: o()({
                                        [u().toggle]: !0,
                                        [u().isActive]: g === t
                                    }),
                                    id: `${m}-toggle-${t}`,
                                    onClick: () => h(t),
                                    type: "button",
                                    children: [(0, n.jsx)("span", {
                                        className: u().buttonLabel,
                                        children: e.label
                                    }), (0, n.jsx)("span", {
                                        "aria-hidden": !0,
                                        className: u().toggleIcon,
                                        children: (0, n.jsx)(c.e, {
                                            type: g === t ? c.f.UpBlack : c.f.DownBlack
                                        })
                                    })]
                                })
                            }), (0, n.jsx)("div", {
                                "aria-labelledby": `${m}-toggle-${t}`,
                                className: o()({
                                    [u().panel]: !0,
                                    [u().isActive]: g === t
                                }),
                                id: `${m}-panel-${t}`,
                                role: "region",
                                children: e.content
                            })]
                        }, `section-${t}`))
                    })
                })
            }
        },
        11946: function(e, t, i) {
            "use strict";
            i.d(t, {
                X: function() {
                    return a
                },
                r: function() {
                    return u
                }
            });
            var n, a, o = i(27573);
            i(7653);
            var r = i(25118),
                l = i(58832),
                s = i(52155),
                c = i(60941),
                d = i.n(c);
            (n = a || (a = {})).Small = "10", n.Medium = "20", n.Large = "30";
            let u = e => {
                let {
                    children: t,
                    columnsCount: i = [1, 2, 3],
                    gapSize: n = "20",
                    testId: a
                } = e, [c, u, m] = (0, s.tv)(n), [g, h, p] = (0, s.tv)(i), b = {
                    "--grid-mobile-gap-size": `${c}px`,
                    "--grid-tablet-gap-size": `${u}px`,
                    "--grid-desktop-gap-size": `${m}px`,
                    "--grid-mobile-columns": `${g}`,
                    "--grid-tablet-columns": `${h}`,
                    "--grid-desktop-columns": `${p}`
                }, _ = (0, r.Z)(t).filter(l.Dw);
                return (0, o.jsx)("div", {
                    className: d().component,
                    "data-testid": a,
                    role: "list",
                    style: b,
                    children: _.map((e, t) => (0, o.jsx)("div", {
                        className: d().cell,
                        role: "listitem",
                        children: e
                    }, `grid-cell-${t}`))
                })
            }
        },
        15932: function(e, t, i) {
            "use strict";
            i.d(t, {
                aV: function() {
                    return p
                },
                xz: function() {
                    return r
                }
            });
            var n, a, o, r, l = i(27573),
                s = i(45531),
                c = i.n(s);
            i(7653);
            var d = i(25118),
                u = i(58832),
                m = i(52155),
                g = i(9937),
                h = i.n(g);
            (n = o || (o = {})).Dashed = "dashed", n.Dotted = "dotted", n.Solid = "solid", (a = r || (r = {})).None = "0", a.XSmall = "5", a.Small = "10", a.Medium = "15", a.Large = "20", a.XLarge = "30", a.XXLarge = "45";
            let p = e => {
                let {
                    children: t,
                    columnsCount: i = 1,
                    dividerStyle: n,
                    gapSize: a = "15",
                    hasDivider: o,
                    semanticRole: r = !0,
                    showMoreCta: s,
                    testId: g
                } = e, [p, b, _] = (0, m.tv)(a), [f, v, k] = (0, m.tv)(i), y = {
                    "--list-mobile-gap-size": `${p}px`,
                    "--list-tablet-gap-size": `${b}px`,
                    "--list-desktop-gap-size": `${_}px`,
                    "--list-mobile-columns": `${f}`,
                    "--list-tablet-columns": `${v}`,
                    "--list-desktop-columns": `${k}`
                }, w = (0, d.Z)(t).filter(u.Dw);
                return (0, l.jsxs)(l.Fragment, {
                    children: [(0, l.jsx)("div", {
                        className: c()({
                            [h().component]: !0,
                            [h().hasDivider]: o,
                            [h().hasSolidDivider]: "solid" === n,
                            [h().hasDashedDivider]: "dashed" === n,
                            [h().hasDottedDivider]: "dotted" === n
                        }),
                        "data-testid": g,
                        role: r ? "list" : void 0,
                        style: y,
                        children: w.map((e, t) => (0, l.jsx)("div", {
                            className: h().item,
                            role: r ? "listitem" : void 0,
                            children: e
                        }, `list-item-${t}`))
                    }), s && (0, l.jsx)("div", {
                        className: c()({
                            [h().showMoreCta]: !0,
                            [h().hasDivider]: o
                        }),
                        style: y,
                        children: s
                    })]
                })
            }
        },
        674: function(e, t, i) {
            "use strict";
            var n, a, o, r;
            i.d(t, {
                K: function() {
                    return a
                },
                T: function() {
                    return n
                }
            }), (o = n || (n = {})).Turquoise = "turquoise", o.Stone = "stone", o.LightStone = "light-stone", (r = a || (a = {})).Small = "small", r.Large = "large"
        },
        58358: function(e, t, i) {
            "use strict";
            i.r(t), i.d(t, {
                Tabs: function() {
                    return m
                }
            });
            var n = i(27573),
                a = i(57908),
                o = i(7653),
                r = i(48567),
                l = i(39014),
                s = i(60580),
                c = i(674),
                d = i(53403),
                u = i.n(d);
            let m = e => {
                let {
                    ariaId: t,
                    hasAdaptiveHeight: i = !1,
                    initialActiveTab: d = 0,
                    items: m,
                    onTabChange: g,
                    stretchTabs: h = !1,
                    tabsSize: p = c.K.Large,
                    variant: b = c.T.Stone
                } = e, _ = (0, s.G)("tabs"), f = null != t ? t : _, [v, k] = (0, o.useState)(d);
                return (0, n.jsxs)("div", {
                    className: (0, a.Z)({
                        [u().component]: !0,
                        [u().lightStone]: b === c.T.LightStone,
                        [u().stone]: b === c.T.Stone,
                        [u().turquoise]: b === c.T.Turquoise,
                        [u().tabsSmall]: p === c.K.Small
                    }),
                    children: [(0, n.jsx)("ul", {
                        "aria-hidden": !0,
                        className: u().tabNavigation,
                        children: m.map((e, t) => (0, n.jsx)("li", {
                            className: (0, a.Z)({
                                [u().tabNavigationItem]: !0,
                                [u().stretch]: h,
                                [u().isActive]: v === t
                            }),
                            children: (0, n.jsxs)("button", {
                                "aria-controls": `${f}-panel-${t}`,
                                "aria-expanded": "true",
                                className: (0, a.Z)({
                                    [u().toggleTabButton]: !0,
                                    [u().isActive]: v === t
                                }),
                                onClick: () => {
                                    k(t), g && g(t)
                                },
                                type: "button",
                                children: [e.iconType && (0, n.jsxs)("span", {
                                    "aria-hidden": !0,
                                    className: u().toggleTabButtonIcon,
                                    children: [(0, r.gM)(e.iconType) && (0, n.jsx)(r._k, {
                                        type: e.iconType
                                    }), (0, l.IP)(e.iconType) && (0, n.jsx)(l.d0, {
                                        type: e.iconType
                                    })]
                                }), e.label]
                            })
                        }, `tab-nav-${t}`))
                    }), (0, n.jsx)("div", {
                        className: u().sections,
                        children: m.map((e, t) => (0, n.jsxs)("div", {
                            className: (0, a.Z)({
                                [u().section]: !0,
                                [u().isActive]: v === t
                            }),
                            children: [(0, n.jsx)("h3", {
                                className: u().sectionLabel,
                                children: (0, n.jsxs)("button", {
                                    "aria-controls": `${f}-panel-${t}`,
                                    "aria-expanded": v === t ? "true" : "false",
                                    className: (0, a.Z)({
                                        [u().toggle]: !0,
                                        [u().isActive]: v === t
                                    }),
                                    id: `${f}-toggle-${t}`,
                                    onClick: () => k(t),
                                    type: "button",
                                    children: [e.iconType && (0, n.jsxs)("span", {
                                        "aria-hidden": !0,
                                        className: u().toggleIcon,
                                        children: [(0, r.gM)(e.iconType) && (0, n.jsx)(r._k, {
                                            type: e.iconType
                                        }), (0, l.IP)(e.iconType) && (0, n.jsx)(l.d0, {
                                            type: e.iconType
                                        })]
                                    }), e.label]
                                })
                            }), (0, n.jsx)("div", {
                                "aria-labelledby": `${f}-toggle-${t}`,
                                className: (0, a.Z)({
                                    [u().panel]: !0,
                                    [u().isActive]: v === t,
                                    [u().hasAdaptiveHeight]: i
                                }),
                                hidden: v !== t || void 0,
                                id: `${f}-panel-${t}`,
                                role: "region",
                                children: e.content
                            })]
                        }, `section-${t}`))
                    })]
                })
            }
        },
        6889: function(e, t, i) {
            "use strict";
            i.r(t), i.d(t, {
                Mount: function() {
                    return a
                }
            });
            var n = i(7329);

            function a(e) {
                let {
                    children: t,
                    mount: i
                } = e;
                return (0, n.V)(i) ? t : null
            }
        },
        39252: function(e, t, i) {
            "use strict";
            i.r(t), i.d(t, {
                ScrollOffset: function() {
                    return o
                }
            });
            var n = i(27573);
            i(7653);
            var a = i(7329);

            function o(e) {
                var t;
                let {
                    topOffset: i
                } = e, o = null !== (t = (0, a.V)(i)) && void 0 !== t ? t : null;
                return null === o ? null : (0, n.jsx)("style", {
                    dangerouslySetInnerHTML: {
                        __html: `
					:root {
						--scroll-offset: ${o}px;
					}
				`
                    }
                })
            }
        },
        52060: function(e, t, i) {
            "use strict";
            i.r(t), i.d(t, {
                Visibility: function() {
                    return h
                }
            });
            var n = i(27573),
                a = i(45531),
                o = i.n(a);
            i(7653);
            var r = i(92607),
                l = i(73099),
                s = i(7329),
                c = i(51410),
                d = i(52155),
                u = i(36375),
                m = i.n(u);
            let g = [60, 80, 80],
                h = e => {
                    let {
                        bottomOffset: t = 10,
                        children: i,
                        sticky: a = !1,
                        topOffset: u = 0,
                        visibility: h = !0
                    } = e, p = (0, l.useMediaQuery)(`${(0,d.aK)(d.Uo.Medium)} and (max-width: ${(0,d.qV)("breakpoints-collapsed-tablet-navigation")})`), b = (0, s.V)(g);
                    p && (b = 140);
                    let _ = (0, s.V)(u) + b,
                        f = (0, s.V)(t),
                        v = (0, r.P)({
                            offsetBottom: f,
                            offsetTop: _
                        }),
                        k = (0, s.V)(a);
                    (0, c.useBrowserLayoutEffect)(() => {
                        k || v(null)
                    }, [v, k]);
                    let [y, w, L] = (0, d.tv)(h), [S, C, x] = (0, d.tv)(u);
                    return (0, n.jsx)("div", {
                        className: o()({
                            [m().component]: !0,
                            [m().isHiddenOnMobile]: !y,
                            [m().isHiddenOnTablet]: !w,
                            [m().isHiddenOnDesktop]: !L
                        }),
                        ref: k ? v : void 0,
                        style: {
                            position: k ? "sticky" : "initial",
                            "--sticky-mobile-top-offset": `${S}px`,
                            "--sticky-tablet-top-offset": `${C}px`,
                            "--sticky-desktop-top-offset": `${x}px`
                        },
                        children: i
                    })
                }
        },
        89304: function(e, t, i) {
            "use strict";
            i.d(t, {
                B: function() {
                    return s
                }
            });
            var n = i(27573),
                a = i(45531),
                o = i.n(a);
            i(7653);
            var r = i(71586),
                l = i.n(r);
            let s = e => {
                let {
                    autoplay: t = !1,
                    borders: i = !0,
                    cloudflareVideoId: a,
                    controls: r = !0,
                    height: s,
                    loop: c = !1,
                    muted: d = !1,
                    posterSrc: u,
                    width: m
                } = e, g = Math.round(s / m * 1e4) / 100;
                return (0, n.jsx)("div", {
                    className: o()({
                        [l().component]: !0,
                        [l().isClickable]: !t,
                        [l().hasBorders]: i
                    }),
                    style: {
                        maxHeight: s,
                        maxWidth: m
                    },
                    children: (0, n.jsx)("div", {
                        className: l().container,
                        style: {
                            paddingTop: `${g.toString()}%`
                        },
                        children: (0, n.jsx)("iframe", {
                            allow: "accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;",
                            allowFullScreen: !!r || void 0,
                            className: l().iframe,
                            loading: "lazy",
                            src: `https://iframe.videodelivery.net/${a}?letterboxColor=transparent&${t?"autoplay=true&":""}${r?"":"controls=false&"}${c?"loop=true&":""}${d?"muted=true&":""}${u?`poster=${u}`:""}`
                        })
                    })
                })
            }
        },
        60580: function(e, t, i) {
            "use strict";
            i.d(t, {
                G: function() {
                    return o
                }
            });
            var n = i(92196),
                a = i(7653);

            function o(e) {
                return (0, a.useMemo)(() => `${e}-${(0,n.x0)()}`, [e])
            }
        },
        7329: function(e, t, i) {
            "use strict";
            i.d(t, {
                V: function() {
                    return o
                }
            });
            var n = i(52155),
                a = i(73099);

            function o(e) {
                let t = (0, a.useSmallBreakpoint)(),
                    i = (0, a.useMediumBreakpoint)(),
                    o = (0, a.useLargeBreakpoint)();
                if (t);
                else if (i) return (0, n.OX)(n.Uo.Medium, e);
                else if (o) return (0, n.OX)(n.Uo.Large, e);
                return (0, n.OX)(n.Uo.Small, e)
            }
        },
        85312: function(e, t, i) {
            "use strict";

            function n(e) {
                return e.replace(/<(?:.|\n)*?>/gm, "").replace(/[!\"#$%&'\(\)\*\+,:;<=>\?\@\[\\\]\^`\{\\}~’]/g, "").trim().replace(/(\s|\.|\|)/g, "-").replace(/[—–]/g, "--").replace(/-{2,}/g, "-").replace(/\/{2,}/g, "/").replace(/^-/, "").replace(/-$/, "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            }

            function a(e) {
                return n(e.replace(/\//g, "-"))
            }
            i.d(t, {
                h: function() {
                    return a
                },
                l: function() {
                    return n
                }
            })
        },
        69276: function(e, t, i) {
            "use strict";
            var n, a;

            function o(e) {
                switch (!0) {
                    case /facebook.com/i.test(e):
                        return "Facebook";
                    case /instagram.com/i.test(e):
                        return "Instagram";
                    case /linkedin.com/i.test(e):
                        return "LinkedIn";
                    case /twitter.com/i.test(e):
                        return "X";
                    case /(?:youtube\.com|youtu\.be)/i.test(e):
                        return "YouTube";
                    case /x.com/i.test(e):
                        return "X";
                    default:
                        return "Custom link"
                }
            }
            i.d(t, {
                Y: function() {
                    return o
                },
                z: function() {
                    return n
                }
            }), (a = n || (n = {})).CustomLink = "Custom link", a.Facebook = "Facebook", a.Instagram = "Instagram", a.LinkedIn = "LinkedIn", a.Twitter = "Twitter", a.YouTube = "YouTube", a.X = "X"
        },
        71500: function(e, t, i) {
            "use strict";
            i.r(t), i.d(t, {
                default: function() {
                    return u
                }
            });
            var n = i(27573),
                a = i(7653),
                o = i(2846),
                r = i(82392),
                l = i(1900),
                s = i(67461),
                c = i(58832),
                d = i(26918),
                u = function(e) {
                    let {
                        backgroundColor: t,
                        bigMarkerWebinarId: i,
                        language: u,
                        type: m
                    } = e, {
                        t: g
                    } = (0, d.E)(u, "templates"), h = t === s.YI.SecondaryTurquoise || t === s.YI.SecondaryLime || t === s.YI.AuxiliaryWhite, p = (0, a.useCallback)(e => {
                        var t, i;
                        let n = null !== (t = e.querySelector("#new_member_email")) && void 0 !== t ? t : null,
                            a = null !== (i = e.querySelector('[type="submit"]')) && void 0 !== i ? i : null;
                        if (!(0, c.vT)(n) || !(0, c.vT)(a)) return;
                        let o = () => {
                            var e, t;
                            e = "User", t = {
                                eMail: n.value
                            }, "Bizible" in window || (window.Bizible = {
                                _queue: [],
                                Push(e, t) {
                                    this._queue.push({
                                        type: e,
                                        data: t
                                    })
                                }
                            }), window.Bizible.Push(e, t)
                        };
                        return a.addEventListener("click", o), () => {
                            a.removeEventListener("click", o)
                        }
                    }, []);
                    return (0, n.jsx)(o.BigMarkerForm, {
                        backgroundColor: t,
                        formId: i,
                        liveButtonLabel: g("BigMarkerFormBlockTemplate.liveButtonLabel"),
                        liveTitle: g("BigMarkerFormBlockTemplate.liveTitle"),
                        onReady: p,
                        recordingButtonLabel: g("BigMarkerFormBlockTemplate.recordingButtonLabel"),
                        recordingTitle: g("BigMarkerFormBlockTemplate.recordingTitle"),
                        type: m,
                        upcomingButtonLabel: g("BigMarkerFormBlockTemplate.upcomingButtonLabel"),
                        upcomingTitle: g("BigMarkerFormBlockTemplate.upcomingTitle"),
                        children: e => {
                            let {
                                isActive: i,
                                isLoading: a,
                                renderForm: o
                            } = e;
                            return a ? (0, n.jsx)(r.b, {
                                ariaLabelButtonCloseWidget: g("BigMarkerFormBlockTemplate.closeButton.aria_label"),
                                backgroundColor: t,
                                collapsedWidgetButtonLabel: g("BigMarkerFormBlockTemplate.collapsedWidgetButtonLabel"),
                                collapsedWidgetTitle: g("BigMarkerFormBlockTemplate.collapsedWidgetTitle"),
                                form: (0, n.jsx)(l.T, {
                                    variant: h ? l.C.Dark : l.C.Light
                                })
                            }) : i ? (0, n.jsx)(r.b, {
                                ariaLabelButtonCloseWidget: g("BigMarkerFormBlockTemplate.closeButton.aria_label"),
                                backgroundColor: t,
                                collapsedWidgetButtonLabel: g("BigMarkerFormBlockTemplate.collapsedWidgetButtonLabel"),
                                collapsedWidgetTitle: g("BigMarkerFormBlockTemplate.collapsedWidgetTitle"),
                                form: o()
                            }) : null
                        }
                    })
                }
        },
        81521: function(e, t, i) {
            "use strict";
            i.r(t), i.d(t, {
                default: function() {
                    return f
                }
            });
            var n, a, o = i(27573),
                r = i(7653);
            i(45531), i(72165), (n = a || (a = {})).C3 = "c3", n.Normal = "normal", n.SelfService = "selfService", n.SpringSummit = "springSummit";
            var l = i(22547),
                s = i(29194),
                c = i(79492),
                d = i(76362),
                u = i(58832),
                m = i(67461);

            function g(e, t) {
                return (0, u.Kn)(t) ? t[e] : t
            }
            var h = i(71500),
                p = i(62040),
                b = i(2198);
            let _ = "bigmarker-conference-widget-container";
            var f = e => {
                var t, i, n;
                let {
                    bigMarkerForm: f,
                    buttonIconRight: v,
                    buttonLabel: k,
                    gatedForm: y,
                    language: w,
                    websiteVariant: L = a.Normal
                } = e, [S, C] = (0, r.useState)(!1), x = g(L, {
                    [a.Normal]: c.ModalVariant.Default,
                    [a.C3]: c.ModalVariant.Turquoise,
                    [a.SelfService]: c.ModalVariant.Default,
                    [a.SpringSummit]: c.ModalVariant.Turquoise
                }), T = g(L, {
                    [a.Normal]: null,
                    [a.C3]: m.YI.SecondaryTurquoise,
                    [a.SelfService]: null,
                    [a.SpringSummit]: m.YI.SecondaryTurquoise
                });
                return (0, o.jsxs)("div", {
                    children: [(0, o.jsx)(l.Button, {
                        iconRight: v,
                        onClick: () => {
                            if (f) {
                                let e = document.getElementById(`${_}${f.webinarId}`);
                                e && (e.id = `${_}${f.webinarId}-unactive`)
                            }
                            C(!0)
                        },
                        size: s.qE.Large,
                        variant: s.Wu.Highlight,
                        children: k
                    }), S && (0, o.jsxs)(c.Modal, {
                        isClosable: !0,
                        isOpen: S,
                        onCloseCallback: () => {
                            if (f) {
                                let e = document.getElementById(`${_}${f.webinarId}-unactive`);
                                e && (e.id = `${_}${f.webinarId}`)
                            }
                            C(!1)
                        },
                        variant: x,
                        children: [(0, u.HD)(null == y ? void 0 : y.marketoFormId) && (0, o.jsx)(p.default, {
                            confirmation: y.confirmation,
                            formId: y.marketoFormId,
                            language: w,
                            reward: y.reward,
                            stickyFormPointer: {
                                display: !1
                            }
                        }), y && null === y.marketoFormId && (0, o.jsx)(d.H, {
                            announcement: null !== (n = null === (t = y.confirmation) || void 0 === t ? void 0 : t.title) && void 0 !== n ? n : y.reward.type,
                            ctaButton: (0, o.jsx)(b.default, {
                                language: w,
                                reward: y.reward
                            }),
                            description: null === (i = y.confirmation) || void 0 === i ? void 0 : i.blurb
                        }), f && (0, o.jsx)(h.default, {
                            backgroundColor: T,
                            bigMarkerWebinarId: f.webinarId,
                            language: w,
                            type: f.type
                        })]
                    })]
                })
            }
        },
        2198: function(e, t, i) {
            "use strict";
            i.r(t), i.d(t, {
                default: function() {
                    return l
                }
            });
            var n = i(27573),
                a = i(29194),
                o = i(22547),
                r = i(26918);

            function l(e) {
                var t, i, l, s;
                let {
                    language: c,
                    reward: d,
                    variant: u = a.Wu.Highlight
                } = e, {
                    t: m
                } = (0, r.E)(c, "components");
                return "download" === d.type ? (0, n.jsx)(o.Button, {
                    download: d.file.originalFilename,
                    href: d.file.url,
                    variant: u,
                    children: null !== (t = d.label) && void 0 !== t ? t : m("GatedFormRewardButton.button.download.label")
                }) : "link" === d.type ? (0, n.jsx)(o.Button, {
                    href: null !== (i = d.href) && void 0 !== i ? i : "#",
                    variant: u,
                    children: null !== (l = d.label) && void 0 !== l ? l : m("GatedFormRewardButton.button.get_resource.label")
                }) : "video" === d.type ? (0, n.jsx)(o.Button, {
                    href: d.video,
                    variant: u,
                    children: null !== (s = d.label) && void 0 !== s ? s : m("GatedFormRewardButton.button.watch.label")
                }) : "redirect" === d.type ? (0, n.jsx)(o.Button, {
                    href: d.href,
                    variant: u,
                    children: m("GatedFormRewardButton.button.get_resource.label")
                }) : null
            }
        },
        4645: function(e, t, i) {
            "use strict";
            i.r(t), i.d(t, {
                GetTrialForm: function() {
                    return h
                }
            });
            var n = i(27573),
                a = i(25687),
                o = i(10214),
                r = i(32124),
                l = i(29194),
                s = i(97104),
                c = i(36809),
                d = i(950),
                u = i(26918),
                m = i(26235),
                g = i(92795);

            function h(e) {
                let {
                    backgroundContext: t,
                    buttonLabel: i = null,
                    inlineFlow: h,
                    language: p
                } = e, {
                    t: b
                } = (0, u.E)(p, "components"), _ = (0, d.Q8)(p, {
                    [d.SQ.English]: "/free-trial/start/",
                    [d.SQ.German]: "/de/free-trial/start/"
                }), f = {
                    [c.N.Dark]: o.r.Light,
                    [c.N.Light]: o.r.Dark,
                    [c.N.Gradient]: o.r.Dark
                }[t];
                return (0, n.jsx)("form", {
                    action: _,
                    method: "GET",
                    children: (0, n.jsx)(r.W, {
                        button: (0, n.jsx)(m.M, {
                            isFullwidth: !0,
                            size: l.qE.Large,
                            variant: l.Wu.Highlight,
                            children: null != i ? i : b("GetTrialForm.submit.label", {
                                ns: "components"
                            })
                        }),
                        field: (0, n.jsx)(g.s, {
                            language: p,
                            name: "url",
                            placeholder: b("GetTrialForm.url.placeholder", {
                                ns: "components"
                            }),
                            size: s.r.Large
                        }),
                        inlineFlow: h,
                        legalText: (0, n.jsx)(a.c, {
                            components: {
                                LinkTermService: (0, n.jsx)(o.B, {
                                    href: "/legal/terms-of-use/",
                                    variant: f
                                }),
                                LinkPrivacyPolicy: (0, n.jsx)(o.B, {
                                    href: "/legal/privacy-policy/",
                                    variant: f
                                })
                            },
                            i18nKey: "GetTrialForm.legalDisclaimer",
                            ns: "components",
                            t: b
                        })
                    })
                })
            }
        },
        62040: function(e, t, i) {
            "use strict";
            let n;
            i.r(t), i.d(t, {
                default: function() {
                    return T
                }
            });
            var a = i(27573),
                o = i(67754),
                r = i(7653),
                l = i(76362),
                s = i(13324),
                c = i(1900),
                d = i(11946),
                u = i(950),
                m = i(22547),
                g = i(29194),
                h = i(48567),
                p = i(58832),
                b = i(56859),
                _ = i.n(b);
            let f = e => {
                let {
                    announcement: t,
                    ctaButton: i,
                    onCloseCallback: n
                } = e;
                return (0, a.jsxs)("div", {
                    className: _().component,
                    role: "presentation",
                    children: [t && (0, a.jsx)("div", {
                        className: _().message,
                        children: t
                    }), i && (0, a.jsx)("div", {
                        className: _().ctaButton,
                        children: (0, r.isValidElement)(i) ? i : (0, p.Kn)(i) ? (0, a.jsx)(m.Button, {
                            download: i.download,
                            href: i.href,
                            iconLeft: i.iconLeft,
                            iconRight: i.iconRight,
                            onClick: i.onClick,
                            size: [g.qE.Small, g.qE.Medium],
                            variant: g.Wu.Highlight,
                            children: i.label
                        }) : null
                    }), n && (0, a.jsx)("button", {
                        "aria-label": "Close this message",
                        className: _().closeButton,
                        onClick: n,
                        type: "button",
                        children: (0, a.jsx)(h._k, {
                            size: 16,
                            type: h.Rk.Close,
                            variant: h.lC.Normal
                        })
                    })]
                })
            };
            var v = i(6074),
                k = i(26918),
                y = i(94029),
                w = i.n(y);

            function L(e) {
                let t = e.getBoundingClientRect(),
                    i = t.top,
                    n = t.bottom;
                return i - 121 >= 0 && i < window.innerHeight || n > 0 && n / window.innerHeight > .4 && n / window.innerHeight <= 2.1
            }
            var S = e => {
                    let {
                        language: t,
                        refForm: i,
                        title: n
                    } = e, {
                        t: o
                    } = (0, k.E)(t, ["common"]), {
                        arrowDirection: l,
                        displayForm: s
                    } = function(e) {
                        let [t, i] = (0, r.useState)(!1), [n, a] = (0, r.useState)("down");
                        return (0, r.useEffect)(() => {
                            if (null == e ? void 0 : e.current) {
                                i(L(e.current)), a(e.current.getBoundingClientRect().top > 0 ? "down" : "up");
                                let t = w()(() => {
                                    e.current && (i(L(e.current)), a(e.current.getBoundingClientRect().top > 0 ? "down" : "up"))
                                }, 300);
                                return window.addEventListener("scroll", t), () => {
                                    window.removeEventListener("scroll", t)
                                }
                            }
                        }, [e]), {
                            displayForm: !t,
                            arrowDirection: n
                        }
                    }(i);
                    if (s && (null == i ? void 0 : i.current)) return (0, a.jsx)(f, {
                        announcement: null != n ? n : o("common.book_demo"),
                        ctaButton: {
                            iconLeft: (0, a.jsx)(v.e, {
                                type: "down" === l ? v.f.DownInBlackCircle : v.f.UpInBlackCircle
                            }),
                            label: o("common.scroll_to_form"),
                            onClick: () => {
                                i.current && i.current.scrollIntoView()
                            }
                        }
                    })
                },
                C = i(17098),
                x = i(2198),
                T = (n = function(e) {
                    let {
                        confirmation: t,
                        formId: i,
                        language: n,
                        reward: d,
                        stickyFormPointer: m,
                        templateVariant: g
                    } = e, h = (0, r.useRef)(null), p = (0, o.useSearchParams)(), b = (0, r.useMemo)(() => {
                        let e = {
                            rewardResource: d.resource,
                            rewardLanguage: null != n ? n : u.SQ.English
                        };
                        if (!p) return e;
                        for (let [t, i] of p.entries()) e[t] = i, "email" === t && (e.Email = i);
                        return e
                    }, [d.resource, n, p]);
                    return (0, a.jsxs)("div", {
                        ref: h,
                        children: [(0, a.jsx)(s.MarketoForm, {
                            defaultValues: b,
                            formId: i,
                            language: n,
                            marketoBaseUrl: C.O.marketoBaseUrl(),
                            onFinish: function() {
                                "redirect" === d.type && window.location.replace(d.href)
                            },
                            templateVariant: g,
                            children: e => {
                                let {
                                    isFinished: i,
                                    isLoading: o,
                                    renderForm: r
                                } = e;
                                return o ? (0, a.jsx)(c.T, {
                                    variant: c.C.Inherit
                                }) : i ? (0, a.jsx)(l.H, {
                                    announcement: null == t ? void 0 : t.title,
                                    ctaButton: (0, a.jsx)(x.default, {
                                        language: n,
                                        reward: d
                                    }),
                                    description: null == t ? void 0 : t.blurb
                                }) : r()
                            }
                        }), m.display && (0, a.jsx)(S, {
                            language: n,
                            refForm: h,
                            title: m.title
                        })]
                    })
                }, e => (0, a.jsx)(r.Suspense, {
                    fallback: (0, a.jsx)(d.r, {
                        children: (0, a.jsx)(c.T, {})
                    }),
                    children: (0, a.jsx)(n, { ...e
                    })
                }))
        },
        53356: function(e, t, i) {
            "use strict";
            i.d(t, {
                q: function() {
                    return d
                }
            });
            var n = i(27573),
                a = i(13623),
                o = i(7653),
                r = i(3458),
                l = i(43325),
                s = i(58832),
                c = i(26918);
            let d = (0, o.createContext)({
                dirty: !1,
                errors: null,
                values: new FormData,
                register: e => ({
                    defaultValue: void 0,
                    errorText: null,
                    name: e.name,
                    validationStatus: l.c.Unknown,
                    onBlur: () => void 0,
                    onChange: () => void 0
                })
            });

            function u(e) {
                let {
                    children: t,
                    dirty: i,
                    formState: u,
                    issues: m,
                    language: g,
                    setIssues: h
                } = e, {
                    i18n: p
                } = (0, c.E)(g, "common"), b = (0, r.useFormStatus)(), _ = (0, o.useCallback)(e => {
                    let {
                        formatError: t,
                        name: n,
                        validate: o
                    } = e, r = !1, c = {};
                    if (!b.pending) {
                        var d, g, _;
                        n in m ? null === m[n] ? r = !0 : (c.code = null === (g = m[n]) || void 0 === g ? void 0 : g.code, c.additionalInformation = null === (_ = m[n]) || void 0 === _ ? void 0 : _.additionalInformation) : (null === (d = u.errors) || void 0 === d ? void 0 : d[n]) && (c.code = u.errors[n].code, c.additionalInformation = u.errors[n].additionalInformation)
                    }
                    let f = c.code;
                    (0, s.HD)(c.code) && !r && (p.exists(`common.form.validation.${c.code}`) && (f = p.t(`common.form.validation.${c.code}`, c.additionalInformation)), t && (f = t(c, f)), f === c.code && ("form" === n ? f = p.t("common:common.form.error.general_error") : (console.warn(`Unknown form validation error code: ${c.code}`), (0, a.uT)(`Unknown form validation error code: ${c.code}`))));
                    let v = u.values instanceof FormData ? u.values.get(n) : (0, s.Kn)(u.values) ? u.values[n] : void 0,
                        k = (0, s.HD)(c.code) ? l.c.Invalid : r ? l.c.Valid : l.c.Unknown;

                    function y(e) {
                        if (!o) return;
                        let t = o(e);
                        t.success ? h({ ...m,
                            [n]: null
                        }) : h({ ...m,
                            [n]: t.error
                        })
                    }
                    return {
                        defaultValue: v,
                        errorText: f,
                        name: n,
                        validationStatus: k,
                        onBlur: e => {
                            let t = e.currentTarget.value;
                            t !== v && y(t)
                        },
                        onChange: e => {
                            let t = e.currentTarget.value;
                            (i || k !== l.c.Unknown) && y(t)
                        }
                    }
                }, [i, u, b, p, m, h]), f = {
                    dirty: i,
                    errors: u.errors,
                    values: u.values,
                    register: _
                };
                return (0, n.jsx)(d.Provider, {
                    value: f,
                    children: t
                })
            }
            t.Z = function(e) {
                let {
                    action: t,
                    children: i,
                    defaultValues: a = null,
                    hasGlobalError: l = !1,
                    language: s,
                    testId: c,
                    ...d
                } = e, m = (0, o.useMemo)(() => ({
                    errors: null,
                    values: null != a ? a : {}
                }), [a]), [g, h] = (0, o.useState)(l ? {
                    form: {
                        code: "general_error",
                        additionalInformation: null
                    }
                } : {}), [p, b] = (0, r.useFormState)(t, m), [_, f] = (0, o.useState)(!1);
                return (0, n.jsx)("form", { ...d,
                    action: b,
                    "data-testid": c,
                    onSubmit: e => {
                        for (let t of Object.values(g))
                            if (null !== t && "general_error" !== t.code) {
                                e.preventDefault();
                                return
                            }
                        f(!0), h({})
                    },
                    children: (0, n.jsx)(u, {
                        dirty: _,
                        formState: p,
                        issues: g,
                        language: s,
                        setIssues: h,
                        children: i
                    })
                })
            }
        },
        85401: function(e, t, i) {
            "use strict";
            i.d(t, {
                C: function() {
                    return l
                }
            });
            var n = i(27573),
                a = i(7653),
                o = i(97104),
                r = i(53356);
            let l = (0, a.forwardRef)((e, t) => {
                let {
                    formatError: i,
                    name: l,
                    validate: s,
                    ...c
                } = e, d = (0, a.useContext)(r.q).register({
                    formatError: i,
                    name: l,
                    validate: s
                });
                return (0, n.jsx)(o.U, { ...c,
                    ...d,
                    ref: t
                })
            })
        },
        26235: function(e, t, i) {
            "use strict";
            i.d(t, {
                M: function() {
                    return l
                }
            });
            var n = i(27573),
                a = i(3458),
                o = i(22547),
                r = i(29194);

            function l(e) {
                let {
                    children: t,
                    iconLeft: i,
                    iconRight: l,
                    isFullwidth: s,
                    size: c,
                    testId: d,
                    variant: u
                } = e, m = (0, a.useFormStatus)();
                return (0, n.jsx)(o.Button, {
                    iconLeft: i,
                    iconRight: l,
                    isFullwidth: s,
                    isLoading: m.pending,
                    size: c,
                    testId: d,
                    type: r.L$.Submit,
                    variant: u,
                    children: t
                })
            }
        },
        92795: function(e, t, i) {
            "use strict";
            i.d(t, {
                s: function() {
                    return u
                }
            });
            var n = i(27573),
                a = i(7653),
                o = i(25687),
                r = i(70254),
                l = i(58832),
                s = i(26918),
                c = i(85401),
                d = i(21420);

            function u(e) {
                let {
                    label: t,
                    language: i,
                    name: u,
                    placeholder: m,
                    size: g
                } = e, {
                    i18n: h,
                    t: p
                } = (0, s.E)(i, "components"), b = (0, a.useRef)(null);
                return (0, n.jsx)(c.C, {
                    formatError: (e, t) => {
                        if ("url_redirected" === e.code) {
                            let t = e.additionalInformation;
                            return (0, n.jsx)(o.c, {
                                components: {
                                    em: (0, n.jsx)("em", {}),
                                    Link: (0, n.jsx)(r.G, {
                                        onClick: () => {
                                            if ((0, l.vT)(b.current)) {
                                                var e;
                                                let i = null === (e = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")) || void 0 === e ? void 0 : e.set;
                                                i && i.call(b.current, t), b.current.dispatchEvent(new Event("input", {
                                                    bubbles: !0
                                                }))
                                            }
                                        }
                                    })
                                },
                                i18nKey: "UrlInputField.error.url_redirected",
                                t: p,
                                values: {
                                    target: e.additionalInformation
                                }
                            })
                        }
                        return h.exists(`UrlInputField.error.${e.code}`, {
                            ns: "components"
                        }) ? p(`UrlInputField.error.${e.code}`, e.additionalInformation) : t
                    },
                    label: t,
                    name: u,
                    placeholder: m,
                    ref: b,
                    size: g,
                    validate: (0, d.z2)(d.$0, d.QK, d.ub)
                })
            }
        },
        21420: function(e, t, i) {
            "use strict";
            i.d(t, {
                $0: function() {
                    return l
                },
                QK: function() {
                    return a
                },
                oH: function() {
                    return o
                },
                ub: function() {
                    return r
                },
                z2: function() {
                    return s
                }
            });
            var n = i(58832);
            let a = e => null == e || (0, n.HD)(e) && 0 === e.length ? {
                    success: !1,
                    error: {
                        code: "required"
                    }
                } : {
                    success: !0,
                    value: e
                },
                o = e => (0, n.HD)(e) && /.+@.+/.test(e) ? {
                    success: !0,
                    value: e
                } : {
                    success: !1,
                    error: {
                        code: "invalid-email"
                    }
                },
                r = e => (0, n.HD)(e) ? /[\^!@ ]/i.test(e) || !/.+\..{2,}/i.test(e) ? {
                    success: !1,
                    error: {
                        code: "invalid-domain"
                    }
                } : {
                    success: !0,
                    value: e
                } : {
                    success: !1,
                    error: {
                        code: "invalid-domain"
                    }
                },
                l = e => (0, n.HD)(e) ? {
                    success: !0,
                    value: e.trim()
                } : {
                    success: !0,
                    value: e
                };

            function s() {
                for (var e = arguments.length, t = Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                return function(e) {
                    for (let i of t) {
                        let t = i(e);
                        if (!0 === t.success && t.skip) return {
                            success: !0,
                            value: t.value
                        };
                        if (!1 === t.success) return t;
                        e = t.value
                    }
                    return {
                        success: !0,
                        value: e
                    }
                }
            }
        },
        54322: function(e, t, i) {
            "use strict";
            i.d(t, {
                D$: function() {
                    return r
                },
                D9: function() {
                    return s
                },
                St: function() {
                    return l
                },
                le: function() {
                    return o
                }
            });
            var n = i(79187);
            let a = {
                store: {},
                getItem(e) {
                    var t;
                    return null !== (t = this.store[e]) && void 0 !== t ? t : null
                },
                setItem(e, t) {
                    this.store[e] = t
                }
            };

            function o(e) {
                return d(e, "local")
            }

            function r(e, t) {
                return u(e, t, "local")
            }

            function l(e) {
                return d(e, "session")
            }

            function s(e, t) {
                return u(e, t, "session")
            }

            function c(e) {
                if (!n.j) return a;
                try {
                    let t = "session" === e ? window.sessionStorage : window.localStorage,
                        i = Math.random().toString(36).slice(2);
                    if (t.setItem("__storage__test__", i), t.getItem("__storage__test__") === i) return t.removeItem("__storage__test__"), t
                } catch (e) {}
                return a
            }

            function d(e, t) {
                if (!n.j) throw Error(`${t} storage is only available in the browser`);
                let i = c(t),
                    a = i.getItem("conductor");
                if (a) try {
                    var o;
                    let t = JSON.parse(a);
                    return null !== (o = t[e]) && void 0 !== o ? o : null
                } catch (e) {
                    i.setItem("conductor", "{}")
                }
                return null
            }

            function u(e, t, i) {
                if (!n.j) throw Error(`${i} storage is only available in the browser`);
                let a = c(i),
                    o = a.getItem("conductor"),
                    r = {};
                if (o) try {
                    r = JSON.parse(o)
                } catch (e) {
                    r = {}
                }
                r[e] = t, a.setItem("conductor", JSON.stringify(r))
            }
        },
        70936: function(e, t, i) {
            "use strict";
            i.r(t), i.d(t, {
                default: function() {
                    return m
                }
            });
            var n = i(27573),
                a = i(13324),
                o = i(81781),
                r = i(1900);
            i(7653);
            var l = i(39014),
                s = i(7618),
                c = i.n(s);
            let d = () => (0, n.jsxs)("div", {
                "aria-live": "polite",
                className: c().component,
                role: "status",
                children: [(0, n.jsx)("div", {
                    "aria-hidden": !0,
                    className: c().icon,
                    children: (0, n.jsx)(l.d0, {
                        type: l.MA.CheckMark
                    })
                }), (0, n.jsx)("div", {
                    className: c().message,
                    children: "Thank you for subscribing to\xa0Dispatch!"
                })]
            });
            var u = i(17098),
                m = () => (0, n.jsx)(a.MarketoForm, {
                    formId: "2010",
                    marketoBaseUrl: u.O.marketoBaseUrl(),
                    minHeight: 130,
                    templateVariant: o.i.Newsletter,
                    children: e => {
                        let {
                            isActive: t,
                            isFinished: i,
                            isLoading: a,
                            renderForm: o
                        } = e;
                        return (0, n.jsxs)(n.Fragment, {
                            children: [t && o(), a && (0, n.jsx)(r.T, {}), i && (0, n.jsx)(d, {})]
                        })
                    }
                })
        },
        26918: function(e, t, i) {
            "use strict";
            i.d(t, {
                E: function() {
                    return g
                }
            });
            var n = i(23579),
                a = i(19237),
                o = i(950),
                r = i(83184),
                l = i(42798),
                s = i(23469),
                c = i(1807),
                d = i(92514),
                u = i(20057);
            let m = (0, i(55315).w)(o.SQ.English);

            function g(e, t) {
                return (0, a.$G)(t, {
                    lng: e
                })
            }
            m.resources = {
                [o.SQ.English]: {
                    common: c,
                    components: d,
                    templates: u
                },
                [o.SQ.German]: {
                    common: r,
                    components: l,
                    templates: s
                }
            }, n.ZP.use(a.Db).init(m)
        },
        89026: function(e, t, i) {
            "use strict";
            i.d(t, {
                D: function() {
                    return o
                }
            });
            var n = i(7653),
                a = i(58832);

            function o() {
                let [e, t] = (0, n.useState)(null);
                return (0, n.useEffect)(() => {
                    fetch("/api/country/").then(async e => {
                        let i = await e.json();
                        (0, a.Ee)(i.countryCode), (0, a.qG)(i.isGdprCountry), (0, a.Wr)(i.acceptedLanguages), t({
                            acceptedLanguages: i.acceptedLanguages,
                            countryCode: i.countryCode,
                            isGdprCountry: i.isGdprCountry
                        })
                    })
                }, []), e
            }
        },
        55315: function(e, t, i) {
            "use strict";
            i.d(t, {
                w: function() {
                    return a
                }
            });
            var n = i(950);

            function a() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : n.SQ.English,
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "common";
                return {
                    debug: !1,
                    supportedLngs: [n.SQ.English, n.SQ.German],
                    fallbackLng: n.SQ.English,
                    lng: e,
                    fallbackNS: "common",
                    defaultNS: "common",
                    ns: t,
                    interpolation: {
                        escapeValue: !1
                    }
                }
            }
        },
        62725: function(e) {
            e.exports = {
                component: "AppearAnimation_component__dUnzN",
                isUpDownAnimation: "AppearAnimation_isUpDownAnimation__HlPNV",
                "appear-animation-up-down": "AppearAnimation_appear-animation-up-down__WjdI7",
                isRightAnimation: "AppearAnimation_isRightAnimation__I4aJk",
                "appear-animation-right": "AppearAnimation_appear-animation-right__VQ_EZ",
                stretched: "AppearAnimation_stretched__lMz6d"
            }
        },
        65859: function(e) {
            e.exports = {
                component: "CrossfadingElements_component__Zzr_j",
                group: "CrossfadingElements_group__1_arJ",
                item: "CrossfadingElements_item__d1hDY",
                isHidden: "CrossfadingElements_isHidden__oWsIZ"
            }
        },
        68290: function(e) {
            e.exports = {
                component: "CategoryLabel_component__r_zP3",
                isDark: "CategoryLabel_isDark__BDJlX",
                isHighlighted: "CategoryLabel_isHighlighted__oVlOC",
                hasCircleGreen: "CategoryLabel_hasCircleGreen__tMO44",
                icon: "CategoryLabel_icon__JbLsZ"
            }
        },
        31237: function(e) {
            e.exports = {
                component: "CallToActionBlockBuilder_component__cYE_b",
                isTurquoise: "CallToActionBlockBuilder_isTurquoise__IM9Tk",
                isLime: "CallToActionBlockBuilder_isLime__6G0k_",
                isWhite: "CallToActionBlockBuilder_isWhite__SlvNq",
                sensor: "CallToActionBlockBuilder_sensor__Lv1Bp",
                collapsedBar: "CallToActionBlockBuilder_collapsedBar__OwsAu",
                content: "CallToActionBlockBuilder_content__A_BA1",
                closeButton: "CallToActionBlockBuilder_closeButton__ydTmP",
                isFullscreen: "CallToActionBlockBuilder_isFullscreen__vGHFo",
                isStickyFooter: "CallToActionBlockBuilder_isStickyFooter__A2nH2",
                cta: "CallToActionBlockBuilder_cta__4wh8f",
                ctaTitle: "CallToActionBlockBuilder_ctaTitle__O8eO_",
                isCollapsible: "CallToActionBlockBuilder_isCollapsible__PJG6O"
            }
        },
        7831: function(e) {
            e.exports = {
                title: "CtaFormBlock_title__jPbzX",
                description: "CtaFormBlock_description__lHfqH",
                ctaSection: "CtaFormBlock_ctaSection__p5DJW",
                form: "CtaFormBlock_form__b_Fzv"
            }
        },
        47794: function(e) {
            e.exports = {
                component: "PlanComparisonBlock_component__CdZ7T",
                hasVariantContentKing: "PlanComparisonBlock_hasVariantContentKing__GHZIW",
                blurb: "PlanComparisonBlock_blurb__pOOgf",
                content: "PlanComparisonBlock_content__000IF",
                logo: "PlanComparisonBlock_logo__yZbIQ",
                text: "PlanComparisonBlock_text__uRds7",
                ctaElement: "PlanComparisonBlock_ctaElement__DT160",
                showContentLink: "PlanComparisonBlock_showContentLink__Nn64t",
                isLongContentHidden: "PlanComparisonBlock_isLongContentHidden__IW9Bt",
                isHiddenOnMobile: "PlanComparisonBlock_isHiddenOnMobile__ykHsG"
            }
        },
        83494: function(e) {
            e.exports = {
                component: "SocialButton_component__2DTHi",
                hasReversedLook: "SocialButton_hasReversedLook__WJwfK",
                isLarge: "SocialButton_isLarge__xS60E",
                hasLightLook: "SocialButton_hasLightLook__u9Rnr"
            }
        },
        78330: function(e) {
            e.exports = {
                component: "Snippet_component__AsLLh",
                isHighlighted: "Snippet_isHighlighted__ZT6kN",
                title: "Snippet_title__xf3Ju",
                text: "Snippet_text__j6b9f",
                link: "Snippet_link__aDB39",
                badge: "Snippet_badge__of56S"
            }
        },
        76004: function(e) {
            e.exports = {
                component: "ShareThisArticle_component__I_eyO",
                title: "ShareThisArticle_title__diHIH"
            }
        },
        50002: function(e) {
            e.exports = {
                component: "BigMarkerForm_component__pQkCj",
                form: "BigMarkerForm_form__Zw4yC",
                ready: "BigMarkerForm_ready__pnkW4",
                isBtnBlue: "BigMarkerForm_isBtnBlue__4ZHt_"
            }
        },
        42534: function(e) {
            e.exports = {
                component: "CheckboxField_component__Jq3RP",
                isMediumOnMobile: "CheckboxField_isMediumOnMobile__pzPLx",
                isLargeOnMobile: "CheckboxField_isLargeOnMobile__C0v4r",
                isValid: "CheckboxField_isValid__ODyKC",
                isInvalid: "CheckboxField_isInvalid__DpB9e",
                hasIndeterminateState: "CheckboxField_hasIndeterminateState__MWt_I",
                isMediumOnTablet: "CheckboxField_isMediumOnTablet__AHDRC",
                isLargeOnTablet: "CheckboxField_isLargeOnTablet__STPhd",
                isMediumOnDesktop: "CheckboxField_isMediumOnDesktop__0TYD_",
                isLargeOnDesktop: "CheckboxField_isLargeOnDesktop__cH21Y"
            }
        },
        97454: function(e) {
            e.exports = {
                component: "FieldErrorText_component__KFigB"
            }
        },
        35849: function(e) {
            e.exports = {
                fieldContainer: "FieldLabel_fieldContainer__HJ1D4",
                field: "FieldLabel_field__HqBWh",
                label: "FieldLabel_label__VISIG",
                isLarge: "FieldLabel_isLarge__aYtw1",
                isDisabled: "FieldLabel_isDisabled__TzY0d",
                description: "FieldLabel_description__MRTlu"
            }
        },
        96244: function(e) {
            e.exports = {
                component: "FieldRow_component__6R4EI",
                label: "FieldRow_label__th3BI",
                isSmall: "FieldRow_isSmall___FOJz",
                isLarge: "FieldRow_isLarge___j_8a",
                errorMessage: "FieldRow_errorMessage___SZIY"
            }
        },
        46886: function(e) {
            e.exports = {
                component: "InputField_component__BI_DQ",
                isSmallOnMobile: "InputField_isSmallOnMobile___0OuK",
                isMediumOnMobile: "InputField_isMediumOnMobile__ZDxad",
                isLargeOnMobile: "InputField_isLargeOnMobile__LvPOb",
                isValid: "InputField_isValid__JNgX9",
                isInvalid: "InputField_isInvalid__m01tN",
                isSmallOnTablet: "InputField_isSmallOnTablet__KOITy",
                isMediumOnTablet: "InputField_isMediumOnTablet__7mbxF",
                isLargeOnTablet: "InputField_isLargeOnTablet__yqtm_",
                isSmallOnDesktop: "InputField_isSmallOnDesktop__H2hBK",
                isMediumOnDesktop: "InputField_isMediumOnDesktop__xt_CR",
                isLargeOnDesktop: "InputField_isLargeOnDesktop__ll0Sb"
            }
        },
        79425: function(e) {
            e.exports = {
                component: "SelectField_component__sPXzY",
                isSmallOnMobile: "SelectField_isSmallOnMobile__18Evr",
                isMediumOnMobile: "SelectField_isMediumOnMobile__gTY6N",
                isLargeOnMobile: "SelectField_isLargeOnMobile__03u7M",
                isValid: "SelectField_isValid__qGcdm",
                isInvalid: "SelectField_isInvalid__wb95X",
                isSmallOnTablet: "SelectField_isSmallOnTablet__vWhwg",
                isMediumOnTablet: "SelectField_isMediumOnTablet__wVk0N",
                isLargeOnTablet: "SelectField_isLargeOnTablet__nYtQb",
                isSmallOnDesktop: "SelectField_isSmallOnDesktop__tuCwQ",
                isMediumOnDesktop: "SelectField_isMediumOnDesktop__lgjMY",
                isLargeOnDesktop: "SelectField_isLargeOnDesktop__UXO5J"
            }
        },
        466: function(e) {
            e.exports = {
                component: "SingleFieldFormLayout_component__NLVhu",
                field: "SingleFieldFormLayout_field__IlQ6I",
                button: "SingleFieldFormLayout_button__pY90m",
                isInlineOnMobile: "SingleFieldFormLayout_isInlineOnMobile__zUI0S",
                errorMessage: "SingleFieldFormLayout_errorMessage__l9w_t",
                legalText: "SingleFieldFormLayout_legalText__fKe_d",
                isInlineOnTablet: "SingleFieldFormLayout_isInlineOnTablet__9AvEP",
                isInlineOnDesktop: "SingleFieldFormLayout_isInlineOnDesktop__4_Smp"
            }
        },
        29949: function(e) {
            e.exports = {
                component: "SocialIcon_component__l5yxj",
                CustomLink: "SocialIcon_CustomLink__KqiTT",
                isDark: "SocialIcon_isDark__hj_C6",
                isLight: "SocialIcon_isLight__Nd9oo",
                Facebook: "SocialIcon_Facebook__4o3lz",
                Instagram: "SocialIcon_Instagram__RatQZ",
                LinkedIn: "SocialIcon_LinkedIn__UW302",
                Twitter: "SocialIcon_Twitter__27nIb",
                YouTube: "SocialIcon_YouTube__qhEXo",
                X: "SocialIcon_X__k19Lz"
            }
        },
        19866: function(e) {
            e.exports = {
                component: "WatchPLGFreeTrialPoster_component__K_UtN",
                cta: "WatchPLGFreeTrialPoster_cta__kQNHB",
                link: "WatchPLGFreeTrialPoster_link__YrTx6"
            }
        },
        72165: function(e) {
            e.exports = {
                component: "WebsiteVariantWrapper_component__gYVZ3",
                isSelfServicePage: "WebsiteVariantWrapper_isSelfServicePage__fevqz"
            }
        },
        30720: function(e) {
            e.exports = {
                component: "BlankSlateMessage_component__ZU77W",
                isLight: "BlankSlateMessage_isLight__UEyze",
                announcement: "BlankSlateMessage_announcement__t8_0z",
                description: "BlankSlateMessage_description__M_z6P"
            }
        },
        56859: function(e) {
            e.exports = {
                component: "CtaToast_component__N7Lb1",
                message: "CtaToast_message__ZJjph",
                closeButton: "CtaToast_closeButton__7foZJ"
            }
        },
        56215: function(e) {
            e.exports = {
                component: "MarketoFormConfirmation_component__peyGz",
                isDark: "MarketoFormConfirmation_isDark__rZYq4",
                isLight: "MarketoFormConfirmation_isLight__eTvEm",
                message: "MarketoFormConfirmation_message__9m6y1",
                info: "MarketoFormConfirmation_info__VdUyY",
                ctaButton: "MarketoFormConfirmation_ctaButton___yXr4"
            }
        },
        7618: function(e) {
            e.exports = {
                component: "NewsletterFormConfirmation_component__Fv8sz",
                icon: "NewsletterFormConfirmation_icon__wWA6t",
                message: "NewsletterFormConfirmation_message__DZagR"
            }
        },
        40329: function(e) {
            e.exports = {
                list: "GlossaryNavigation_list__vwZZa",
                link: "GlossaryNavigation_link__NP6yJ",
                isActive: "GlossaryNavigation_isActive__jE_k1",
                isDisabled: "GlossaryNavigation_isDisabled__To7iU",
                select: "GlossaryNavigation_select__8HkwW"
            }
        },
        46129: function(e) {
            e.exports = {
                languageBar: "HeaderLanguageSwitcher_languageBar__hJ5aT",
                toggleNavigationButton: "HeaderLanguageSwitcher_toggleNavigationButton__L6DeX",
                closeNavigationButton: "HeaderLanguageSwitcher_closeNavigationButton__A5HO8",
                languageSwitcher: "HeaderLanguageSwitcher_languageSwitcher__YUrAI",
                mobileLanguageSwitcher: "HeaderLanguageSwitcher_mobileLanguageSwitcher__NJ15w"
            }
        },
        18250: function(e) {
            e.exports = {
                component: "LanguageBar_component__WqNLl",
                description: "LanguageBar_description__YY7xM",
                closeButton: "LanguageBar_closeButton__zzfvZ"
            }
        },
        79748: function(e) {
            e.exports = {
                component: "LanguageSwitcher_component__1zq0F",
                hasReversedLook: "LanguageSwitcher_hasReversedLook__BiK_A",
                label: "LanguageSwitcher_label__WJiU8"
            }
        },
        26259: function(e) {
            e.exports = {
                component: "Link_component__z2xEn",
                link: "Link_link__oR4X_",
                isDark: "Link_isDark__802Lj",
                isLight: "Link_isLight__Gyg34",
                icon: "Link_icon__KKTO5",
                isExternal: "Link_isExternal__VsYm0"
            }
        },
        28768: function(e) {
            e.exports = {
                component: "MainNavigation_component__TlZRX",
                list: "MainNavigation_list__KxKwj",
                link: "MainNavigation_link__8CN_H",
                isPrimary: "MainNavigation_isPrimary__qmoOK",
                isPrimaryDark: "MainNavigation_isPrimaryDark__JDEri",
                isSecondary: "MainNavigation_isSecondary__Zz8cv",
                linkContainer: "MainNavigation_linkContainer__lsUyh",
                linkIcon: "MainNavigation_linkIcon___lQCS",
                isHover: "MainNavigation_isHover__ODzO2",
                divider: "MainNavigation_divider__GrAN2",
                hasDropdown: "MainNavigation_hasDropdown__mrki9",
                isActive: "MainNavigation_isActive__7XBcu",
                isCollapsed: "MainNavigation_isCollapsed__KlLVq",
                dropdown: "MainNavigation_dropdown__0bXz1",
                item: "MainNavigation_item__OvQGX",
                hasFullwidthDropdown: "MainNavigation_hasFullwidthDropdown__7O1IH",
                hasSimpleDropdown: "MainNavigation_hasSimpleDropdown__cEDaW",
                isFullwidthDropdown: "MainNavigation_isFullwidthDropdown__NEPw2",
                isDefault: "MainNavigation_isDefault__5eZUe"
            }
        },
        11270: function(e) {
            e.exports = {
                component: "StandaloneLink_component__zcHIq",
                hasReversedLook: "StandaloneLink_hasReversedLook__c0Qsw",
                icon: "StandaloneLink_icon__40Dj_",
                link: "StandaloneLink_link__PTAsD"
            }
        },
        86402: function(e) {
            e.exports = {
                component: "Modal_component__j6OCQ",
                isOpen: "Modal_isOpen__jD9mF",
                centerContainer: "Modal_centerContainer__xPk9b",
                panel: "Modal_panel__kfO_P",
                hasDefaultLook: "Modal_hasDefaultLook__c9_Ti",
                hasLightweightLook: "Modal_hasLightweightLook__c2wPN",
                hasOrangeLook: "Modal_hasOrangeLook___rRcF",
                hasTurquoiseLook: "Modal_hasTurquoiseLook____bZf",
                panelContent: "Modal_panelContent__On7Xt",
                closeButton: "Modal_closeButton__BAPrC",
                actionElements: "Modal_actionElements__I_KUa"
            }
        },
        80452: function(e) {
            e.exports = {
                component: "SearchModal_component__EiCn7",
                isOpen: "SearchModal_isOpen__SUeDT",
                centerContainer: "SearchModal_centerContainer__vRYST",
                panel: "SearchModal_panel__tvD5n",
                panelContent: "SearchModal_panelContent__CFR_h",
                closeButton: "SearchModal_closeButton__I7B5Y",
                searchField: "SearchModal_searchField__E1za8",
                searchResults: "SearchModal_searchResults__yWlOt"
            }
        },
        58562: function(e) {
            e.exports = {
                component: "WatchVideoModal_component__5QWiO",
                cta: "WatchVideoModal_cta__sXOgw",
                link: "WatchVideoModal_link__bmmpR"
            }
        },
        24451: function(e) {
            e.exports = {
                section: "Accordion_section__zhBQx",
                isActive: "Accordion_isActive__0Jj_5",
                hasReversedLook: "Accordion_hasReversedLook__zOFtg",
                toggle: "Accordion_toggle__Fd7wf",
                toggleIcon: "Accordion_toggleIcon__gJtg2",
                panel: "Accordion_panel__K6Asd"
            }
        },
        60941: function(e) {
            e.exports = {
                component: "Grid_component__QrO5r",
                cell: "Grid_cell__Ao0dj"
            }
        },
        9937: function(e) {
            e.exports = {
                component: "List_component__OCm_E",
                item: "List_item__wnzCC",
                hasDivider: "List_hasDivider__bWD3Z",
                hasDashedDivider: "List_hasDashedDivider__Hqtdp",
                hasDottedDivider: "List_hasDottedDivider__s5LN5",
                showMoreCta: "List_showMoreCta__UP2HI"
            }
        },
        53403: function(e) {
            e.exports = {
                section: "Tabs_section__vSomz",
                isActive: "Tabs_isActive__zeUGG",
                turquoise: "Tabs_turquoise__1gQqg",
                toggle: "Tabs_toggle__EIDyW",
                toggleIcon: "Tabs_toggleIcon__PmnvC",
                tabNavigation: "Tabs_tabNavigation__Zygck",
                panel: "Tabs_panel__Qg5DS",
                toggleTabButton: "Tabs_toggleTabButton__w8aQT",
                tabNavigationItem: "Tabs_tabNavigationItem__R9Y0J",
                stretch: "Tabs_stretch__Tw_Wg",
                tabsSmall: "Tabs_tabsSmall__Ljq9K",
                sectionLabel: "Tabs_sectionLabel__U8Dyf",
                lightStone: "Tabs_lightStone__L_MTy",
                toggleTabButtonIcon: "Tabs_toggleTabButtonIcon__evolf",
                sections: "Tabs_sections__KKwRp",
                hasAdaptiveHeight: "Tabs_hasAdaptiveHeight__s3IGM"
            }
        },
        27442: function(e) {
            e.exports = {
                component: "Spacer_component__Kq5vf",
                isCenteredHorizontally: "Spacer_isCenteredHorizontally__GfGuO"
            }
        },
        36375: function(e) {
            e.exports = {
                component: "Visibility_component__kd61P",
                isHiddenOnMobile: "Visibility_isHiddenOnMobile__uAMgz",
                isStickyOnMobile: "Visibility_isStickyOnMobile__vBPpj",
                isHiddenOnTablet: "Visibility_isHiddenOnTablet___o3TP",
                isStickyOnTablet: "Visibility_isStickyOnTablet__ehlWU",
                isHiddenOnDesktop: "Visibility_isHiddenOnDesktop__byOCY",
                isStickyOnDesktop: "Visibility_isStickyOnDesktop__JlMGq"
            }
        },
        71586: function(e) {
            e.exports = {
                component: "CloudflareVideo_component__KlF90",
                isClickable: "CloudflareVideo_isClickable__mrPfA",
                container: "CloudflareVideo_container__RCkVr",
                iframe: "CloudflareVideo_iframe__f4dRe",
                hasBorders: "CloudflareVideo_hasBorders__moOaw"
            }
        },
        83184: function(e) {
            "use strict";
            e.exports = JSON.parse('{"common":{"back":"Zur\xfcck","back_to":"Zur\xfcck zu","book_demo":"Frag eine Demo an","button.close.label":"Schlie\xdfen","date.today":"Heute","date.tomorrow":"Morgen","date.yesterday":"Gestern","download_now":"Jetzt herunterladen","learn_more":"Mehr erfahren","get_started":"Los geht\'s","all":"Alle","thank_you":"Vielen Dank","scroll_to":"Scrollen zu","see":"Zu","show_more":"Mehr anzeigen","read_now":"Jetzt lesen","read_more":"Weiterlesen","scroll_to_form":"Zum Formular","view_profile":"Profil anzeigen","view_profile_of":"Profil von {{name}} anzeigen","view_linkedin_profile":"LinkedIn-Profil anzeigen","view_video":"Video anzeigen","play_video":"Video abspielen","share.linkedin.title":"Auf LinkedIn teilen","share.facebook.title":"Auf Facebook teilen","share.twitter.title":"Auf Twitter teilen","share.article.label":"Teile diesen Artikel","button.save_spot.label":"Teilnahme sichern","field.select.placeholder":"Bitte ausw\xe4hlen","link.watch.free_trial.label":"Das erwartet dich im kostenlosen Test","images.link.watchWhatMakesConductorSpecialPoster.label":"Video abspielen","images.link.watchWhatMakesConductorSpecialPoster.title":"Finde heraus, was die Arbeit bei Conductor so besonders macht. Werde noch heute Teil unseres Teams!","page.footer.socialLinks.ariaLabel":"Profile des Dirigenten in sozialen Netzwerken","link.back_home.aria_label":"Zur\xfcck zur Startseite","link.close_navigation.aria_label":"Navigation schlie\xdfen","link.toggle_navigation.aria_label":"Navigation umschalten","panel.navigation.aria_label":"Website-Navigation","cookie.banner.content":"<p1>Wir verwenden Cookies f\xfcr eine gro\xdfartige Nutzererfahrung auf unserer Website.</p1><p2>Wenn du weitersurfst, stimmst du der Verwendung von Cookies zu, die in unserer <Link>Cookie-Richtlinie</Link> n\xe4hert erl\xe4utert wird.</p2>","badge.hiring.label":"Wir stellen ein","accolades.aria_label":"\xdcbersicht der Conductor-Auszeichnungen","articles.category.group.link.overview.label":"Zur Kategorie\xfcbersicht","block.widget.button.close.aria_label":"Dieses Widget schlie\xdfen","parts.eventDetailCard.link.eventPage.label":"Zur Eventseite","navigation.button.search.aria_label":"Suchdialog \xf6ffnen","navigation.button.search.label":"Suchen","navigation.button.get_started.label":"Los geht\'s","navigation.main.aria_label":"Hauptnavigation","navigation.secondary.aria_label":"Sekund\xe4re Navigation","modal.panel.button.close.aria_label":"Dieses Panel schlie\xdfen","organization.industry":"","organization.industry_Consulting":"Beratung","organization.industry_Consumer Electronics":"Unterhaltungselektronik","organization.industry_Ecommerce":"Elektronischer Handel","organization.industry_Education":"Bildung","organization.industry_Fashion":"Mode","organization.industry_Financial Services":"Finanzdienstleistungen","organization.industry_Health & Beauty":"Gesundheit und Sch\xf6nheit","organization.industry_Healthcare":"Gesundheitswesen","organization.industry_Law":"Recht","organization.industry_Manufacturing":"Fertigung","organization.industry_Medical":"Medizinisch","organization.industry_Non-Profit":"Gemeinn\xfctzig","organization.industry_Professional Services":"Professionelle Dienstleistungen","organization.industry_Real Estate":"Liegenschaften","organization.industry_Retail":"Einzelhandel","organization.industry_Technology":"Technologie","organization.industry_Telecommunications":"Telekommunikation","organization.size":"< 1.000","organization.size_< 1,000":"< 1.000","organization.size_1,000":"1.000","organization.size_5,000":"5.000","organization.size_10,000":"10.000","organization.size_15,000":"15.000","organization.size_20,000":"20.000","organization.size_25,000":"25.000","organization.size_35,000":"35.000","organization.size_50,000":"50.000","organization.size_75,000":"75.000","organization.size_100,000+":"100.000+","form.websiteMonitoring":{"buttonLabel":"Los geht\'s","input.domain.placehoder":"Webseite eingeben"},"rating.badge.aria_label":"Bewertung: {{stars_rating}} von {{stars_count}} Sternen","section.brandsShowcaseSection.label":"Vertrauen bei Top-Marken","section.callToAction":{"intelligence-trial.buttonLabel":"Conductor kostenlos testen","intelligence-trial.title":"Maximiere das Potenzial deiner Website!","orScheduleDemo":"oder <Link>jetzt Demo vereinbaren</Link>","schedule-demo.buttonLabel":"Jetzt Demo vereinbaren","schedule-demo.title":"Maximiere das Potenzial deiner Website!","self-service-form.blurb":"Jetzt Conductor Intelligence 30 Tage lang kostenlos testen","self-service-form.buttonLabel":"Los geht\'s","self-service-form.title":"Maximiere das Potenzial deiner Website!","self-service-form.website.placeholder":"Webseite eingeben","website-monitoring-trial.buttonLabel":"Conductor Website Monitoring kostenlos testen","website-monitoring-trial.title":"Maximiere das Potenzial deiner Website!"},"section.locations.title":"Unsere Standorte","section.locations.image.map.alt":"Weltkarte der Conductor-B\xfcros","section.exploreWorkSection.content":"Lerne die einzigartige Kultur von Conductor kennen und wie wir den Arbeitsplatz f\xfcr uns und f\xfcr dich neu definieren.","section.exploreWorkSection.header.title":"Entdecke die neue Art zu arbeiten bei Conductor","section.getDemo.header.title":"Bereit, das Potenzial deiner Website zu entfalten?","section.getDemo.link.watch":"Oder <Link>Product Tour ansehen</Link>","section.getTrial.link.label":"Oder <Link>fordern Sie eine Demo an</Link>","section.getTrial.tourLink":"<LinkFreeTrial>Conductor kostenlos testen</LinkFreeTrial> oder <LinkGetDemo>Demo anfragen</LinkGetDemo>","section.integrations.blurb":"Das System mit unseren Integrationspartnern vereint alle deine bevorzugten Technologien, Tools und Datens\xe4tze auf einer Plattform. Damit geh\xf6ren Datensilos der Vergangenheit an und dein Tech-System ist f\xfcr den Erfolg optimiert.","section.integrations.imageAlt":"\xdcbersicht \xfcber verf\xfcgbare Integrationen in Conductor","section.integrations.integrationsPageHrefLabel":"Alle Integrationspartner ansehen","section.integrations.title":"Conductor l\xe4sst sich in dein gesamtes Tech-System integrieren","section.integrations.titleBadge":"Integrationen","section.joinConductor.headerTitle":"Werde Teil des Conductor Teams","section.teamShowcase.imageAlt":"Conductor Team Showcase","section.mastheadContactSection.blurb":"<span>Lass uns \xfcber eine Strategie f\xfcr dein Online-Marketing (oder ein anderes Thema, das dir wichtig ist) sprechen.</span>","section.mastheadContactSection.bookADemoHrefLabel":"Demo","section.mastheadContactSection.emailHrefLabel":"E-Mail","section.mastheadContactSection.headerBadgeLabel":"Kontakt","section.mastheadContactSection.headerTitle":"Melde dich gerne bei uns","section.mastheadContactSection.liveChatButtonLabel":"Live-Chat","section.mastheadContactSection.posterAlt":"Illustration f\xfcr die Kontaktaufnahme","section.mastheadFoundation.hrefLabel":"F\xfcr einen Zuschuss bewerben","section.mastheadFoundation.posterAlt":"Illustration des Conductor Kultur Buchs","section.mastheadHome.title":"Mehr Traffic, Conversions, Leads, Nachfrage, Umsatz durch Suchen","section.mastheadHome.cta.productTour":"Product Tour ansehen","section.mastheadHome.cta.requestDemo":"Eine Demo anfordern","section.mastheadHome.cta.tryConductor":"Conductor kostenlos testen","cards.articleCard.hrefExternalNote":"(\xf6ffnet sich in einem neuen Tab)","content.codeBlock.ariaLabel":"Ein Code-Fragment","content.metricImprovementCallout.ariaLabel":"Hervorhebung einiger Verbesserungen","content.quote.ariaLabel":"Eingebettetes Zitat","filters.filterCategoriesGroup.ariaLabel":"\xdcbersicht \xfcber Kategorien","icon.glossaryTerm.label":"Glossarbegriff","form.error.general_error":"Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.","form.validation.required":"Dieses Feld ist erforderlich.","form.validation.invalid":"Bitte geben Sie einen g\xfcltigen Wert ein.","form.validation.invalid-email":"Bitte geben Sie eine g\xfcltige E-Mail Adresse ein.","form.validation.invalid-domain":"Bitte geben Sie eine g\xfcltige Domain ein.","form.validation.too-short":"Bitte geben Sie mindestens {{minLength}} Zeichen ein."}}')
        },
        42798: function(e) {
            "use strict";
            e.exports = JSON.parse('{"CookieConsentNotification":{"button.preferences.label":"Einstellungen","button.accept_all.label":"Alle akzeptieren","button.reject_all.label":"Alle ablehnen","title":"Diese Website verwendet Cookies","content":"Wir verwenden Cookies, um die Nutzererfahrung zu verbessern und den Website-Traffic zu analysieren. Indem du auf „Alle akzeptieren“ klickst, stimmst du der Verwendung von Cookies auf unserer Website zu, wie in unserer <CookiePolicyLink>Cookie-Richtlinie</CookiePolicyLink> beschrieben. Du kannst deine Cookie-Einstellungen \xe4ndern, indem du auf <PreferencesLink>Einstellungen</PreferencesLink> klickst."},"AuthorsBox":{"aria_label":"\xdcbersicht der Artikelautoren","link.read_bio":"Zu {{name}}s Bio","socialLink.aria_label":"Autorenprofile auf Social Media"},"AuthorLink":{"label.by_name":"Von {{name}}","link.label.by_name":"<span>Von <Link>{{name}}</Link></span>"},"AuthorsLink":{"label.by_multiple_authors":"Von mehreren Autor:innen"},"CookieConsentPolicy":{"title.cookie_policy":"Cookie-Richtlinie von Conductor"},"CookieConsentPreferences":{"title.preferences":"Deine Cookie-Einstellungen","content":"Wir verwenden verschiedene Arten von Cookies, um deine Nutzererfahrung auf unserer Website zu optimieren. Klicke auf die unten stehenden Kategorien, um mehr \xfcber ihre Zwecke zu erfahren. Du kannst ausw\xe4hlen, welche Arten von Cookies du zulassen m\xf6chtest. Denk daran, dass das Deaktivieren von Cookies deine Nutzererfahrung auf der Website beeintr\xe4chtigen kann. Du kannst mehr dar\xfcber erfahren, wie wir Cookies verwenden, indem du dir unsere <CookiePolicyLink>Cookie-Richtlinie</CookiePolicyLink> durchliest.","checkbox.functionality_storage.description":"Notwendige (technische) Cookies helfen dabei, eine Website nutzbar zu machen, indem sie grundlegende Funktionen wie die Ansichtsnavigation und den Zugriff auf sichere Bereiche der Website erm\xf6glichen. Ohne diese Cookies kann die Website nicht (ordnungsgem\xe4\xdf) funktionieren.","checkbox.functionality_storage.label":"Wesentliche (technische) Cookies","checkbox.analytics_storage.description":"Diese Cookies helfen uns zu verstehen, wie Besucher:innen mit Websites interagieren, indem sie anonym Informationen sammeln und melden.","checkbox.analytics_storage.label":"Statistiken (analytische Cookies)","checkbox.ad_storage.description":"Marketing-Cookies werden verwendet, um Besucher:innen \xfcber Websites hinweg zu folgen. Es werden Dinge angezeigt, die f\xfcr die einzelnen Nutzer:innen relevant und ansprechend sind und dadurch f\xfcr Publisher und dritte Werbetreibende wertvoller sind.","checkbox.ad_storage.label":"Marketing (Soziale Plugins, Marketing-Cookies von Drittanbietern, Pixel)"},"EventStatus":{"label.upcoming":"Demn\xe4chst","label.on_demand":"Auf Anfrage","label.past":"Vergangenes event"},"GetTrialForm":{"error.blacklisted_domain":"Diese Domain wird nicht unterst\xfctzt, bitte eine andere URL eingeben.","error.blacklisted_url":"Diese Domain wird nicht unterst\xfctzt, bitte eine andere URL eingeben.","error.invalid_url":"Bitte eine valide Domain eingeben.","error.too_many_redirects":"Diese Website hat zu viele Redirects. Bitte eine andere URL eingeben.","error.url_redirected":"Diese Website hat einen redirect auf <em>{{target}}</em>. Stattdessen <Link>diese Website</Link> nutzen?","europeDataResidency":"Meine Firma verlangt, dass Daten in der EU gehostet werden m\xfcssen.","legalDisclaimer":"Durch das Nutzen von Conductor stimmen Sie den <LinkTermService>Nutzungsbedingungen</LinkTermService> und der <LinkPrivacyPolicy>Datenschutzrichtlinie</LinkPrivacyPolicy> zu.","submit.label":"Conductor kostenlos testen","submit.note":"keine Kreditkarte n\xf6tig","url.placeholder":"mycompany.com"},"GatedFormRewardButton":{"button.download.label":"Jetzt herunterladen","button.get_resource.label":"Infos bekommen","button.watch.label":"Jetzt ansehen"},"GetDemoForm":{"button.get_started.label":"Los geht\'s","input.email.placeholder":"E-Mail-Adresse eingeben","input.domain.placeholder":"Webseite eingeben"},"GlossaryTooltip":{"title":"{{ title }}","title_synonym":"{{ title }} <small>(manchmal aufgerufen {{ synonym }})</small>"},"LanguageNudge":{"ariaLabel":"Translation navigation","ariaLabel_en":"Translation navigation","ariaLabel_de":"\xdcbersetzung Navigation","description":"This page is also available in your Language","description_en":"This page is also available in English","description_de":"Diese Seite ist auch auf Deutsch verf\xfcgbar","desktopLabel":"Switch","desktopLabel_en":"Switch to English","desktopLabel_de":"Zu Deutsch wechseln","mobileLabel":"Switch","mobileLabel_en":"English","mobileLabel_de":"Deutsch"},"ReadingTime":{"text.minutes_read":"Lesezeit: {{minutes}} Minuten"},"ResendActivationForm":{"submit":"Abschicken","email.placeholder":"me@mycompany.com","error.blacklisted_email_provider":"Leider k\xf6nnen wir f\xfcr diesen E-Mail-Anbieter keinen Testlauf starten.","error.invalid_email":"Bitte geben Sie eine g\xfcltige E-Mail-Adresse ein.","error.not_work_email":"Bitte geben Sie Ihre Arbeits-E-Mail-Adresse ein."},"SearchModal":{"blankSlate.announcement":"Beginnen Sie mit der Eingabe, um \xfcber die gesamte Conductor-Website mit Lichtgeschwindigkeit zu suchen!","category.about":"\xdcber uns","category.academy":"Academy","category.blog":"Blog","category.careers":"Karriere","category.customer-stories":"Erfolgsgeschichten","category.events":"Events","category.industries":"Branchen","category.partners":"Partner","category.platform":"Plattform","category.press":"Presse","hits.showMoreButton":"Mehr Ergebnisse anzeigen","inputField.placeholder":"Ich suche nach...","noResults.announcement":"F\xfcr diese Anfrage gibt es keine Ergebnisse.","noResults.description":"Versuchen Sie eine andere Abfrage oder schauen Sie sich unsere besten Bildungsressourcen zu allen Themen rund um Suche und Inhalte an.","tab.website.label":"Websiten Inhalt","tab.zendesk.label":"Wissensbasis Inhalt"},"StartTrialForm":{"email.label":"Berufliche E-Mail","email.placeholder":"me@mycompany.com","error.blacklisted_email_provider":"Dieser E-Mail Provider wird leider nicht unterst\xfctzt.","error.invalid_email":"Bitte eine valide E-Mail Adresse eingeben.","error.not_work_email":"Bitte berufliche E-Mail Adresse eingeben.","error.unable_to_obtain_dns_record":"Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.","europeDataResidency.label":"Meine Firma verlangt, dass Daten in der EU gehostet werden m\xfcssen.","legalDisclaimer":"Durch das Nutzen von Conductor stimmen Sie den <LinkTermService>Nutzungsbedingungen </LinkTermService> und der <LinkPrivacyPolicy>Datenschutzrichtlinie</LinkPrivacyPolicy> zu.","marketingConsent.label":"Ja, ich m\xf6chte Informationen \xfcber die Produkte und Services von Conductor erhalten und akzeptiere die <LinkPrivacyPolicy>Datenschutzbedingungen</LinkPrivacyPolicy> von Conductor.","submit":"Jetzt kostenlosen Test starten","url.label":"Website","url.placeholder":"mycompany.com"},"UrlInputField":{"error.blacklisted_domain":"Diese Domain wird nicht unterst\xfctzt, bitte eine andere URL eingeben.","error.blacklisted_url":"Diese Domain wird nicht unterst\xfctzt, bitte eine andere URL eingeben.","error.invalid_url":"Bitte eine valide Domain eingeben.","error.too_many_redirects":"Diese Website hat zu viele Redirects. Bitte eine andere URL eingeben.","error.url_redirected":"Diese Website hat einen redirect auf <em>{{target}}</em>. Stattdessen <Link>diese Website</Link> nutzen?"},"WeAreHiringBadge":{"text.we_are_hiring":"Wir stellen ein"}}')
        },
        23469: function(e) {
            "use strict";
            e.exports = JSON.parse('{"AcademyFaqArticleTemplate":{"content.share.label.suffix":"Teile die Infos zu diesem Artikel","footer.authors.caption":"Zu den Autor:innen","link.academyArticle.text":"Lies dir den vollst\xe4ndigen Academy-Artikel, um alles \xfcber das Thema <Link>„{{article}}“</Link> zu erfahren.","link.academyArticle.title":"Conductor Academy"},"AcademyFaqOverviewTemplate":{"faqSignpostNavigation.showMoreLink":"Alle h\xe4ufig gestellten Fragen ansehen"},"AcademyArticleFaqOverviewTemplate":{"heading.subtitle":"H\xe4ufig gestellte Fragen"},"AcademyGlossaryItemTemplate":{"footer.related_content.title":"\xc4hnlicher Content","footer.pagination.ariaLabel":"Navigation der Glossarbegriffe"},"BigMarkerFormBlockTemplate":{"closeButton.aria_label":"Anmeldeformular schlie\xdfen","collapsedWidgetButtonLabel":"Auf geht\'s","collapsedWidgetTitle":"Jetzt anmelden","liveButtonLabel":"Registrieren und teilnehmen","liveTitle":"Das Webinar findet gerade statt","recordingButtonLabel":"Zum Webinar","recordingTitle":"Jetzt Aufzeichnung ansehen","upcomingButtonLabel":"Anmeldung best\xe4tigen","upcomingTitle":"Jetzt anmelden"},"GatedFormBlockTemplate":{"button.download.label":"Jetzt herunterladen","button.link.label":"Infos bekommen","button.redirect.label":"Infos bekommen","button.video.label":"Jetzt ansehen"},"GetDemoBlockTemplate":{"button.start.label":"Los geht\'s","title":"Bereit, das Potenzial deiner Website zu entfalten?"},"GetForm":{"input.email.placeholder":"Enter your email"},"HighlightBoxTemplate":{"title.attention":"Warum dies wichtig ist","title.faq":"H\xe4ufig gestellte Frage","title.pro_tip":"Profi-Tipp","title.useful_resources":"N\xfctzliches Infomaterial"},"EventDetailCard":{"link.go_to_event.label":"Zur Eventseite"},"PageFooter":{"copyrightNotice":"\xa9 Conductor {{year}}. Alle Rechte vorbehalten","link.footer_navigation.aria_label":"Zus\xe4tzliche Navigation","language_navigation.aria_label":"Sprachen Navigation"},"FeaturesOverviewSectionTemplate":{"section.badge.title":"\xdcbersicht der Funktionen","section.ctaLinkLabel":"Mehr erfahren"},"JobBoardSectionTemplate":{"filter.category.departments.title":"Abteilungen","filter.button.all.label":"Alle","filter.category.locations.title":"Standorte","button.apply.label":"Jetzt bewerben","image.no_open_positions.caption":"Derzeit gibt es keine offenen Stellen in der Abteilung {{department_name}} am Standort {{location_name}}.","section.overview.subtitleJobLocation":"Aktuell gibt es <strong>$t(JobBoardSectionTemplate.section.overview.subtitle.job, {\\"count\\": {{jobs}} }) $t(JobBoardSectionTemplate.section.overview.subtitle.location, {\\"count\\": {{countries}} })</strong>.","section.overview.subtitle.job":"{{count}} freie Stelle","section.overview.subtitle.job_other":"{{count}} freie Stellen","section.overview.subtitle.location":"in {{count}} Land","section.overview.subtitle.location_other":"in {{count}} L\xe4ndern","card.link.applyToJob.label":"Bewerben"},"LeadershipOverviewSectionTemplate":{"header.board.title":"Unsere Vorstandsmitglieder"},"MastheadBookADemoSectionTemplate":{"button.video.watch.label":"Video ansehen","button.video.watch.description":"Wir k\xf6nnen es kaum abwarten, dir Conductor zu zeigen."},"MastheadCareersSectionTemplate":{"button.open_roles.label":"Zu den offenen Stellen","title.badge":"Karriere"},"MastheadCustomerStoriesSectionTemplate":{"button.read_stories.label":"Zu den Erfolgsgeschichten","header.title":"Erfolgsgeschichten"},"MastheadIndustryDetailSectionTemplate":{"signpost.other_industries.aria_label":"Andere Branchen"},"MastheadPlatformFeatureSectionTemplate":{"button.add_to_chrome.label":"Kostenlos zu Chrome hinzuf\xfcgen"},"OrganizationCardsSectionTemplate":{"informativeCard.ctaLinkLabel":"Zur Website"},"PlatformOverviewSectionTemplate":{"signpost.features.aria_label":"\xdcbersicht aller interessanten Funktionen"},"PressHighlightsSectionTemplate":{"button.press.label":"Zum Pressebereich","attachedcaption.caption":"Conductor auf dem Titelblatt"},"ResourceGroupBlocksSectionTemplate":{"signpost.navigation.aria_label":"Schnelle Navigation"},"SessionsListSectionTemplate":{"filter.button.all":"Alle","filter.events.ariaLabel":"W\xe4hlen Sie Ereignisse aus","filter.categories.ariaLabel":"W\xe4hlen Sie Kategorien aus","card.person.button.profile":"Go to speaker\'s profile"},"SpeakersSessionsSectionTemplate":{"button.label.register":"Register your spot","button.label.watch":"Watch this talk","flag.upcoming":"Upcoming","flag.past":"Past"},"AcademyArticleTemplate":{"article.summarybox.title":"Zusammenfassung: {{short_title}}","footer.article.caption":"Das k\xf6nnte dich auch interessieren","footer.authors.caption":"Zu den Autor:innen","masthead.updatedAtLabel":"Letztes Update:","tableOfContents.title":"Inhalts\xfcbersicht"},"AcademyOverviewTemplate":{"articles.group.caption":"Unsere beliebtesten Artikel zum Thema „{{category}}“","categories.all.title":"Alle","link.show_more.label":"Zur \xdcbersicht zu: {{category}}","sidebar.caption":"Neueste Artikel"},"BlogArticleTemplate":{"footer.article.authors.caption":"Zu den Autor:innen","footer.article.related_articles.caption":"\xc4hnliche Artikel","tableOfContents.title":"Inhalts\xfcbersicht"},"BlogOverviewTemplate":{"block.newspaper.title":"The Conductor Dispatch\xa0– der Marketing-Newsletter mit Fun Faktor","highlighted_article.caption":"Neueste Artikel","masthead.subtitle":"Die neuesten Erkenntnisse, Trends und Best Practices aus dem Online-Marketing.","masthead.title":"Unser Blog","sidebar.articles.caption":"Beliebte Artikel"},"CustomerStoriesTemplate":{"heading.title":"Erfolgsgeschichten"},"CustomerStoryTemplate":{"heading.title":"Erfolgsgeschichte","footer.story.caption":"Weitere Erfolgsgeschichten","content.prefix":"\xdcber {{organization_name}}","organization.info.term.headquarters":"Hauptsitz","organization.info.term.size":"Unternehmensgr\xf6\xdfe","organization.info.term.industry":"Branche"},"EventDetailTemplate":{"footer.related_events.caption":"\xc4hnliche Events","content.share.label.suffix":"Teile die Infos zu diesem Event"},"EventsOverviewTemplate":{"heading.browse.caption":"Alle Events ansehen","heading.title":"Events","leadParagraph.noEvents":"Zur Zeit sind keine Veranstaltungen geplant.<br/>Schauen Sie bald wieder vorbei, um mehr zu erfahren.","sidebar.events.caption":"Hervorgehobene Events"},"JobOpeningTemplate":{"heading.subtitle":"<>Standort: <strong>{{location}}</strong> — abteilung: <strong>{{department}}</strong></>","button.apply.label":"Jetzt bewerben"},"PartnerDetailTemplate":{"section.partners.title":"Weitere Partner","link.partners.label":"Zur \xdcbersicht aller Partner"},"PressOverviewTemplate":{"contact.hrefLabel":"E-Mail","contact.title":"Du hast eine Presseanfrage?<br />Dann kontaktiere gerne unser Team.","heading.subtitle":"Die neuesten Entwicklungen bei Conductor","heading.title":"In den Nachrichten","masthead.badge":"Presse und Auszeichnungen","masthead.subtitle":"Entdecke die neuesten Pressenachrichten, Auszeichnungen und Anerkennungen zu Conductor aus unserer Branche.","masthead.title":"Die [neuesten] [Nachrichten] und Auszeichnungen"},"SpeakerPage":{"headline":"Speakers profile","link.custom.label":"Personal website"},"TeamDetailTemplate":{"title":"Mehr Artikel von {{team_member_name}}","titlePress":"{{team_member_name}} in den Medien"},"NotFoundTemplate":{"title":"Hast du dich verirrt?","posterAlt":"Fehlerseite Illustration","badge":"404 Fehler","primaryHrefLabel":"Zur\xfcck zur Startseite","secondaryHrefLabel":"Mehr \xfcber HTTP-Statuscodes erfahren","blurb":"Keine Sorge! Zum Gl\xfcck sind wir Profis darin, daf\xfcr zu sorgen, dass Dinge gefunden werden."},"CareersNotFoundTemplate":{"title":"Tut uns leid! Diese Stellenausschreibung ist nicht mehr aktuell.","posterAlt":"Fehlerseite Illustration","primaryHrefLabel":"Zu den offenen Stellen","blurb":"Aber du w\xfcrdest sicher gut in unser Team passen. Schau dir gerne unsere offenen Stellen an. Da ist sicher das passende f\xfcr dich dabei."}}')
        },
        1807: function(e) {
            "use strict";
            e.exports = JSON.parse('{"common":{"back":"Back","back_to":"Back to","book_demo":"Book a Demo","button.close.label":"Close","date.today":"Today","date.tomorrow":"Tomorrow","date.yesterday":"Yesterday","download_now":"Download now","learn_more":"Learn more","get_started":"Get started","all":"All","thank_you":"Thank you","show_more":"Show more","scroll_to":"Scroll to","see":"See","read_now":"Read now","read_more":"Read more","scroll_to_form":"Scroll to the Form","view_profile":"View profile","view_profile_of":"View profile of {{name}}","view_linkedin_profile":"View LinkedIn Profile","view_video":"View the video","play_video":"Play the Video","share.linkedin.title":"Share on LinkedIn","share.facebook.title":"Share on Facebook","share.twitter.title":"Share on Twitter","share.article.label":"Share this article","button.save_spot.label":"Save my spot","field.select.placeholder":"Please select","link.watch.free_trial.label":"See what you get in the free trial","images.link.watchWhatMakesConductorSpecialPoster.label":"Play The Video","images.link.watchWhatMakesConductorSpecialPoster.title":"Find out what makes working at Conductor special. Join our team today!","page.footer.socialLinks.ariaLabel":"Conductor\'s profiles on social networks","link.back_home.aria_label":"Back to the homepage","link.close_navigation.aria_label":"Close Navigation","link.toggle_navigation.aria_label":"Toggle Navigation","panel.navigation.aria_label":"Website Navigation","cookie.banner.content":"<p1>We use cookies to ensure that you get the best experience on our website.</p1><p2>By continuing to browse, you agree to the use of cookies detailed in our <Link>cookie policy</Link></p2>","badge.hiring.label":"We are hiring","accolades.aria_label":"Overview of the Conductor Accolades","articles.category.group.link.overview.label":"Go to category overview","block.widget.button.close.aria_label":"Close this widget","parts.eventDetailCard.link.eventPage.label":"Go to Event page","navigation.button.search.aria_label":"Open search dialog","navigation.button.search.label":"Search","navigation.button.get_started.label":"Get Started","navigation.main.aria_label":"Main navigation","navigation.secondary.aria_label":"Secondary navigation","modal.panel.button.close.aria_label":"Close this panel","organization.industry":"","organization.industry_Consulting":"Consulting","organization.industry_Consumer Electronics":"Consumer Electronics","organization.industry_Ecommerce":"Ecommerce","organization.industry_Education":"Education","organization.industry_Fashion":"Fashion","organization.industry_Financial Services":"Financial Services","organization.industry_Health & Beauty":"Health & Beauty","organization.industry_Healthcare":"Healthcare","organization.industry_Law":"Law","organization.industry_Manufacturing":"Manufacturing","organization.industry_Medical":"Medical","organization.industry_Non-Profit":"Non-Profit","organization.industry_Professional Services":"Professional Services","organization.industry_Real Estate":"Real Estate","organization.industry_Retail":"Retail","organization.industry_Technology":"Technology","organization.industry_Telecommunications":"Telecommunications","organization.size":"< 1,000","organization.size_< 1,000":"< 1,000","organization.size_1,000":"1,000","organization.size_5,000":"5,000","organization.size_10,000":"10,000","organization.size_15,000":"15,000","organization.size_20,000":"20,000","organization.size_25,000":"25,000","organization.size_35,000":"35,000","organization.size_50,000":"50,000","organization.size_75,000":"75,000","organization.size_100,000+":"100,000+","rating.badge.aria_label":"Rating is {{stars_rating}} out of {{stars_count}} points","form.websiteMonitoring":{"buttonLabel":"Let\'s Go","input.domain.placehoder":"Enter your website"},"section.brandsShowcaseSection.label":"Trusted by Top Brands","section.callToAction":{"intelligence-trial.buttonLabel":"Try Conductor for free","intelligence-trial.title":"Ready to maximize your website\'s potential?","orScheduleDemo":"or <Link>schedule a demo</Link>","schedule-demo.buttonLabel":"Schedule a demo","schedule-demo.title":"Ready to maximize your website\'s potential?","self-service-form.blurb":"Try Conductor Intelligence free for 30 days","self-service-form.buttonLabel":"Let\'s go","self-service-form.title":"Ready to maximize your website\'s potential?","self-service-form.website.placeholder":"Enter your website","website-monitoring-trial.buttonLabel":"Try ContentKing for free","website-monitoring-trial.title":"Ready to maximize your website\'s potential?"},"section.locations.title":"Our Locations","section.locations.image.map.alt":"Global map of Conductor offices","section.exploreWorkSection.content":"Learn more about Conductor\'s unique culture and how we\'re redefining the workplace.","section.exploreWorkSection.header.title":"Explore the Future of Work at Conductor","section.getDemo.header.title":"Ready to unlock your website\'s potential?","section.getDemo.link.watch":"or <Link>watch product tour</Link>","section.getTrial.link.label":"or <Link>schedule a demo</Link>","section.getTrial.tourLink":"<LinkFreeTrial>Try Conductor for free</LinkFreeTrial> or <LinkGetDemo>request a demo</LinkGetDemo>","section.integrations.blurb":"Our integrated partner ecosystem brings all your favorite technology, tools, and datasets together in one platform to make data silos a thing of the past and ensure your stack is optimized for success.","section.integrations.imageAlt":"Overview of available integrations in Conductor","section.integrations.integrationsPageHrefLabel":"See all our integration partners","section.integrations.title":"Conductor integrates with your entire tech stack","section.integrations.titleBadge":"Integrations","section.joinConductor.headerTitle":"Join the Conductor community","section.teamShowcase.imageAlt":"Conductor team showcase","section.mastheadContactSection.blurb":"<span><strong>Searching for answers?</strong>Let\'s talk digital marketing strategy (or anything else that\'s on your mind).</span>","section.mastheadContactSection.bookADemoHrefLabel":"Book a demo","section.mastheadContactSection.emailHrefLabel":"Email us","section.mastheadContactSection.headerBadgeLabel":"Contact Us","section.mastheadContactSection.headerTitle":"Give us a shout","section.mastheadContactSection.liveChatButtonLabel":"Live Chat","section.mastheadContactSection.posterAlt":"Contact us illustration","section.mastheadFoundation.hrefLabel":"Apply for grant","section.mastheadFoundation.posterAlt":"Conductor Culture Book illustration","section.mastheadHome.title":"Increase Traffic, Conversions, Leads, Demand, Revenue from Search","section.mastheadHome.cta.productTour":"Watch product tour","section.mastheadHome.cta.requestDemo":"Request a demo","section.mastheadHome.cta.tryConductor":"Try Conductor for free","cards.articleCard.hrefExternalNote":"(opens in a new tab)","content.codeBlock.ariaLabel":"A fragment of code","content.metricImprovementCallout.ariaLabel":"Highlight of some improvements","content.quote.ariaLabel":"Embedded quote","filters.filterCategoriesGroup.ariaLabel":"Overview of categories","icon.glossaryTerm.label":"Glossary Term","form.error.general_error":"An error occurred. Please try again.","form.validation.required":"This field is required.","form.validation.invalid":"Please enter a valid value.","form.validation.invalid-email":"Please enter a valid email address.","form.validation.invalid-domain":"Please enter a valid domain.","form.validation.too-short":"Please enter at least {{minLength}} characters."}}')
        },
        92514: function(e) {
            "use strict";
            e.exports = JSON.parse('{"CookieConsentNotification":{"button.preferences.label":"Preferences","button.accept_all.label":"Accept all","button.reject_all.label":"Reject all","title":"This website uses cookies","content":"We use cookies to improve user experience and analyze website traffic. By clicking “Accept all“, you agree to our website\'s cookie use as described in our <CookiePolicyLink>Cookie Policy</CookiePolicyLink>. You can change your cookie settings by clicking <PreferencesLink>Preferences</PreferencesLink>."},"AuthorsBox":{"aria_label":"Overview of article authors","link.read_bio":"Read {{name}}\'s bio","socialLink.aria_label":"Author\'s profiles on social networks"},"AuthorLink":{"label.by_name":"By {{name}}","link.label.by_name":"<span>By <Link>{{name}}</Link></span>"},"AuthorsLink":{"label.by_multiple_authors":"By multiple authors"},"CookieConsentPolicy":{"title.cookie_policy":"Conductor Cookie Policy"},"CookieConsentPreferences":{"title.preferences":"Your Cookie Preferences","content":"We use different types of cookies to optimize your experience on our website. Click on the categories below to learn more about their purposes. You may choose which types of cookies to allow. Remember that disabling cookies may affect your experience on the website. You can learn more about how we use cookies by visiting our <CookiePolicyLink>Cookie Policy</CookiePolicyLink>.","checkbox.functionality_storage.description":"Essential (Technical) cookies help make a website usable by enabling basic functions like view navigation and access to secure areas of the website. The website cannot function (properly) without these cookies.","checkbox.functionality_storage.label":"Essential (Technical) cookies","checkbox.analytics_storage.description":"These cookies help us to understand how visitors interact with websites by collecting and reporting information anonymously.","checkbox.analytics_storage.label":"Statistics (analytical cookies)","checkbox.ad_storage.description":"Marketing cookies are used to follow visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.","checkbox.ad_storage.label":"Marketing (Social plug-ins, third party marketing cookies, pixels)"},"EventStatus":{"label.upcoming":"Upcoming","label.on_demand":"On demand","label.past":"Past event"},"GetTrialForm":{"error.blacklisted_domain":"This domain is not allowed. Please enter a different URL.","error.blacklisted_url":"This domain is not allowed. Please enter a different URL.","error.invalid_url":"Please enter a valid domain.","error.too_many_redirects":"This website redirects too many times. Please enter a different URL.","error.url_redirected":"This website redirects to <em>{{target}}</em>. Do you want to <Link>use this website</Link> instead?","europeDataResidency":"My company requires our data to be hosted in the EU.","legalDisclaimer":"By using Conductor, you agree to our <LinkTermService>Terms of Service</LinkTermService> and <LinkPrivacyPolicy>Privacy Policy</LinkPrivacyPolicy>.","submit.label":"Try Conductor for free","submit.note":"no credit card needed","url.placeholder":"mycompany.com"},"GatedFormRewardButton":{"button.download.label":"Download now","button.get_resource.label":"Get resource","button.watch.label":"Watch now"},"GetDemoForm":{"button.get_started.label":"Get started","input.email.placeholder":"Enter your email","input.domain.placeholder":"Enter your website"},"GlossaryTooltip":{"title":"{{ title }}","title_synonym":"{{ title }} <small>(sometimes called {{ synonym }})</small>"},"LanguageNudge":{"ariaLabel":"Translation navigation","ariaLabel_en":"Translation navigation","ariaLabel_de":"\xdcbersetzung Navigation","description":"This page is also available in your Language","description_en":"This page is also available in English","description_de":"Diese Seite ist auch auf Deutsch verf\xfcgbar","desktopLabel":"Switch","desktopLabel_en":"Switch to English","desktopLabel_de":"Zu Deutsch wechseln","mobileLabel":"Switch","mobileLabel_en":"English","mobileLabel_de":"Deutsch"},"ReadingTime":{"text.minutes_read":"{{minutes}} minutes read"},"ResendActivationForm":{"submit":"Send","email.placeholder":"me@mycompany.com","error.blacklisted_email_provider":"Unfortunately, we can\'t start a trial for this email provider.","error.invalid_email":"Please enter a valid email address.","error.not_work_email":"Please enter your work email address."},"SearchModal":{"blankSlate.announcement":"Start typing to search across the entire Conductor website at the speed of light!","category.about":"About","category.academy":"Academy","category.blog":"Blog","category.careers":"Careers","category.customer-stories":"Customer stories","category.events":"Events","category.industries":"Industries","category.partners":"Partners","category.platform":"Platform","category.press":"Press","hits.showMoreButton":"Show more results","inputField.placeholder":"I\'m looking for...","noResults.announcement":"There are no results for this query.","noResults.description":"Try a different query or check out our best educational resources on all things search and content.","tab.website.label":"Website Content","tab.zendesk.label":"Support Content"},"StartTrialForm":{"email.label":"Your work email","email.placeholder":"me@mycompany.com","error.blacklisted_email_provider":"Unfortunately, we can’t start a trial for this email address.","error.invalid_email":"Please enter a valid email address.","error.not_work_email":"Please enter your work email address.","error.unable_to_obtain_dns_record":"An error occurred. Please try again.","europeDataResidency.label":"My company requires our data to be hosted in the EU.","legalDisclaimer":"By using Conductor, you agree to our <LinkTermService>Terms of Service</LinkTermService> and <LinkPrivacyPolicy>Privacy Policy</LinkPrivacyPolicy>.","marketingConsent.label":"Yes, I would like to receive information about Conductor products and services by email. I can unsubscribe from promotional emails at any time. Further details in our <LinkPrivacyPolicy>Privacy Policy</LinkPrivacyPolicy>.","submit":"Start your free trial","url.label":"Your website","url.placeholder":"mycompany.com"},"UrlInputField":{"error.blacklisted_domain":"This domain is not allowed. Please enter a different URL.","error.blacklisted_url":"This domain is not allowed. Please enter a different URL.","error.invalid_url":"Please enter a valid domain.","error.too_many_redirects":"This website redirects too many times. Please enter a different URL.","error.url_redirected":"This website redirects to <em>{{target}}</em>. Do you want to <Link>use this website</Link> instead?"},"WeAreHiringBadge":{"text.we_are_hiring":"We are hiring"}}')
        },
        20057: function(e) {
            "use strict";
            e.exports = JSON.parse('{"AcademyFaqArticleTemplate":{"content.share.label.suffix":"Share Article Details","footer.authors.caption":"About the authors","link.academyArticle.text":"Read the full Academy article to learn everything about <Link>{{article}}</Link>","link.academyArticle.title":"Conductor Academy"},"AcademyFaqOverviewTemplate":{"faqSignpostNavigation.showMoreLink":"See all FAQs about this topic"},"AcademyArticleFaqOverviewTemplate":{"heading.subtitle":"Frequently Asked Questions"},"BigMarkerFormBlockTemplate":{"closeButton.aria_label":"Close registration form","collapsedWidgetButtonLabel":"Let\'s do it","collapsedWidgetTitle":"Reserve your spot","liveButtonLabel":"Register & Join","liveTitle":"Webinar happening now!","recordingButtonLabel":"View webinar","recordingTitle":"View our webinar","upcomingButtonLabel":"Confirm registration","upcomingTitle":"Reserve your spot"},"GatedFormBlockTemplate":{"button.download.label":"Download now","button.link.label":"Get resource","button.redirect.label":"Get resource","button.video.label":"Watch now"},"GetDemoBlockTemplate":{"button.start.label":"Get started","title":"Ready to unlock your website\'s potential?"},"GetForm":{"input.email.placeholder":"Enter your email"},"HighlightBoxTemplate":{"title.attention":"Why this is important","title.faq":"FAQ","title.pro_tip":"Pro tip","title.useful_resources":"Useful resources"},"EventDetailCard":{"link.go_to_event.label":"Go to Event page"},"PageFooter":{"copyrightNotice":"\xa9 Conductor {{year}}. All Rights Reserved","link.footer_navigation.aria_label":"Additional navigation","language_navigation.aria_label":"Language navigation"},"FeaturesOverviewSectionTemplate":{"section.badge.title":"Features Overview","section.ctaLinkLabel":"Learn more"},"JobBoardSectionTemplate":{"filter.category.departments.title":"Departments","filter.button.all.label":"All","filter.category.locations.title":"Locations","button.apply.label":"Apply here","image.no_open_positions.caption":"There are no open positions in {{department_name}} in {{location_name}} at this time.","section.overview.subtitleJobLocation":"Currently we have <strong>$t(JobBoardSectionTemplate.section.overview.subtitle.job, {\\"count\\": {{jobs}} }) $t(JobBoardSectionTemplate.section.overview.subtitle.location, {\\"count\\": {{countries}} })</strong>","section.overview.subtitle.job":"{{count}} open position","section.overview.subtitle.job_other":"{{count}} open positions","section.overview.subtitle.location":"in {{count}} country","section.overview.subtitle.location_other":"in {{count}} countries","card.link.applyToJob.label":"Apply to Job"},"LeadershipOverviewSectionTemplate":{"header.board.title":"Our Board Members"},"MastheadBookADemoSectionTemplate":{"button.video.watch.label":"Watch video","button.video.watch.description":"We can\'t wait to show you Conductor."},"MastheadCareersSectionTemplate":{"button.open_roles.label":"See Open Roles","title.badge":"Careers"},"MastheadCustomerStoriesSectionTemplate":{"button.read_stories.label":"Read Stories","header.title":"Customer Success Stories"},"MastheadIndustryDetailSectionTemplate":{"signpost.other_industries.aria_label":"Other industries"},"MastheadPlatformFeatureSectionTemplate":{"button.add_to_chrome.label":"Add to Chrome (it\'s free!)"},"OrganizationCardsSectionTemplate":{"informativeCard.ctaLinkLabel":"Visit Site"},"PlatformOverviewSectionTemplate":{"signpost.features.aria_label":"Overview of interesting features"},"PressHighlightsSectionTemplate":{"button.press.label":"Go to press section","attachedcaption.caption":"Latest Headlines"},"ResourceGroupBlocksSectionTemplate":{"signpost.navigation.aria_label":"Quick navigation"},"SessionsListSectionTemplate":{"filter.button.all":"All","filter.events.ariaLabel":"Select events","filter.categories.ariaLabel":"Select categories","card.person.button.profile":"Go to speaker\'s profile"},"SpeakersSessionsSectionTemplate":{"button.label.register":"Register your spot","button.label.watch":"Watch this talk","flag.upcoming":"Upcoming","flag.past":"Past"},"AcademyArticleTemplate":{"article.summarybox.title":" {{short_title}} in short","footer.article.caption":"Also worth checking out","footer.authors.caption":"About the authors","masthead.updatedAtLabel":"Last updated:","tableOfContents.title":"Table of Contents"},"AcademyOverviewTemplate":{"articles.group.caption":"Our most popular articles in {{category}}","categories.all.title":"All","link.show_more.label":"Go to {{category}} overview","sidebar.caption":"Latest articles"},"AcademyGlossaryItemTemplate":{"footer.related_content.title":"Related Content","footer.pagination.ariaLabel":"Glossary Items Navigation"},"BlogArticleTemplate":{"footer.article.authors.caption":"About the authors","footer.article.related_articles.caption":"Related Articles","tableOfContents.title":"Table of Contents"},"BlogOverviewTemplate":{"block.newspaper.title":"The Conductor Dispatch: The marketing newsletter that\'s actually fun to read","highlighted_article.caption":"Newest articles","masthead.subtitle":"Latest research, trends, and best practices across digital marketing.","masthead.title":"Conductor Blog","sidebar.articles.caption":"Top articles"},"CustomerStoriesTemplate":{"heading.title":"Customer Success Stories"},"CustomerStoryTemplate":{"heading.title":"Customer Success Story","footer.story.caption":"More Customer Success Stories","content.prefix":"About {{organization_name}}","organization.info.term.headquarters":"Headquarters","organization.info.term.size":"Company Size","organization.info.term.industry":"Industry"},"EventDetailTemplate":{"footer.related_events.caption":"Related Events","content.share.label.suffix":"Share Event Details"},"EventsOverviewTemplate":{"heading.browse.caption":"Browse All Events","heading.title":"Events","leadParagraph.noEvents":"There are no upcoming events at this time.<br/>Check back soon for updates.","sidebar.events.caption":"Highlighted Events"},"JobOpeningTemplate":{"heading.subtitle":"<>Location: <strong>{{location}}</strong> — department: <strong>{{department}}</strong></>","button.apply.label":"Apply here"},"PartnerDetailTemplate":{"section.partners.title":"More Partners","link.partners.label":"Go to Partners Overview"},"PressOverviewTemplate":{"contact.title":"Have a media inquiry?<br />Get in touch with our team.","contact.hrefLabel":"Email us here","heading.subtitle":"The latest developments at Conductor.","heading.title":"In the news","masthead.badge":"Press & Awards","masthead.subtitle":"Explore Conductor\'s latest press coverage, awards and accolades from our industry.","masthead.title":"See our [recent news]\xa0and recognition"},"SpeakerPage":{"headline":"Speakers profile","link.custom.label":"Personal website"},"TeamDetailTemplate":{"title":"More from {{team_member_name}}","titlePress":"{{team_member_name}} in the media"},"NotFoundTemplate":{"title":"Oh no. Looks like you\'re lost","posterAlt":"Error page illustration","badge":"404 Error","primaryHrefLabel":"Take me home","secondaryHrefLabel":"Learn about HTTP Status Codes","blurb":"Lucky for you, getting found is our speciality"},"CareersNotFoundTemplate":{"title":"Sorry, we\'re no longer hiring for this role.","posterAlt":"Error page illustration","primaryHrefLabel":"View open positions","blurb":"But having you on the team is music to our ears. Check out our open positions and find your fit!"}}')
        }
    }
]);
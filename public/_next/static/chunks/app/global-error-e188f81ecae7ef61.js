(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [6470], {
        42684: function(e, a, n) {
            Promise.resolve().then(n.bind(n, 41399))
        },
        41399: function(e, a, n) {
            "use strict";
            n.r(a), n.d(a, {
                default: function() {
                    return g
                }
            });
            var t = n(27573),
                o = n(13623),
                r = n(7653),
                i = n(12097),
                l = n(70514),
                s = n(14978),
                c = n(29662);

            function g(e) {
                let {
                    error: a
                } = e;
                return (0, r.useEffect)(() => {
                    o.Tb(a)
                }, [a]), (0, t.jsxs)("html", {
                    children: [(0, t.jsxs)("head", {
                        children: [(0, t.jsx)("meta", {
                            content: "width=device-width, initial-scale=1.0",
                            name: "viewport"
                        }), (0, t.jsx)("title", {
                            children: "Conductor"
                        })]
                    }), (0, t.jsxs)("body", {
                        children: [(0, t.jsx)(i.PageHeaderLayout, {
                            backToHomeBtnAriaLabel: "Back to homepage",
                            closeNavigationBtnAriaLabel: "Close navigation",
                            currentUrl: "/",
                            homepageHref: "/",
                            isBackToHomeDisabled: !1,
                            navigationPanelAriaLabel: "Navigation",
                            siteLogo: (0, t.jsx)(l.S, {
                                variant: l.D.Reversed
                            }),
                            toggleNavigationBtnAriaLabel: "Toggle navigation",
                            variant: s.a.Dark
                        }), (0, t.jsx)(c.X, {
                            blurb: "We're sorry, something went wrong. Try reloading the page or go to the homepage.",
                            headerBadgeLabel: "oh no!",
                            headerTitle: "Something went wrong",
                            posterAlt: "",
                            primaryHref: window.location.pathname,
                            primaryHrefLabel: "Reload the page",
                            secondaryHref: "/",
                            secondaryHrefLabel: "Go to homepage"
                        })]
                    })]
                })
            }
        }
    },
    function(e) {
        e.O(0, [6344, 4027, 1846, 5203, 3156, 4993, 6302, 4235, 8538, 9662, 1293, 5162, 1744], function() {
            return e(e.s = 42684)
        }), _N_E = e.O()
    }
]);
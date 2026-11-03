jQuery(document).ready(function($) {
    function getCurrentBreakpoint() {
        var width = window.innerWidth || document.documentElement.clientWidth;
        if (width < 768) {
            return "mobile"
        } else if (width < 1025) {
            return "tablet"
        } else if (width <= 1200) {
            return "tablet_extra"
        } else if (width <= 1366) {
            return "laptop"
        } else {
            return "desktop"
        }
    }

    function updateResponsiveColumns() {
        jQuery(".isotope-layout[data-columns]").each(function() {
            var $layout = jQuery(this);
            var breakpoint = getCurrentBreakpoint();
            var columns;
            $layout.removeClass(function(index, className) {
                return (className.match(/(^|\s)grid-\S+/g) || []).join(" ")
            });
            if (breakpoint === "mobile") {
                columns = $layout.attr("data-columns-mobile") || $layout.attr("data-columns-tablet") || $layout.attr("data-columns-tablet-extra") || $layout.attr("data-columns-laptop") || $layout.attr("data-columns")
            } else if (breakpoint === "tablet") {
                columns = $layout.attr("data-columns-tablet") || $layout.attr("data-columns-tablet-extra") || $layout.attr("data-columns-laptop") || $layout.attr("data-columns")
            } else if (breakpoint === "tablet_extra") {
                columns = $layout.attr("data-columns-tablet-extra") || $layout.attr("data-columns-laptop") || $layout.attr("data-columns")
            } else if (breakpoint === "laptop") {
                columns = $layout.attr("data-columns-laptop") || $layout.attr("data-columns")
            } else {
                columns = $layout.attr("data-columns")
            }
            if (columns) {
                $layout.addClass("grid-" + columns)
            }
        })
    }
    updateResponsiveColumns();
    var resizeTimer;
    jQuery(window).on("resize", function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            updateResponsiveColumns()
        }, 250)
    });
    jQuery(".mascot-intro-layout-gallery-grid .each-intro-layout .thumb").each(function(i, el) {
        if (jQuery(this).hasClass("img-auto-height")) {}
        jQuery(el).on("mouseover", function() {
            var height = jQuery(el).find("img").height() - jQuery(el).height();
            jQuery(this).find("img").css({
                "-webkit-transform": "translateY(-" + height + "px)",
                transform: "translateY(-" + height + "px)"
            })
        }).on("mouseout", function() {
            jQuery(this).find("img").css({
                "-webkit-transform": "translateY(0px)",
                transform: "translateY(0px)"
            })
        })
    })
});
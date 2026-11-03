(function($) {
    'use strict';

    function initVerticalImageSlider($scope, $) {
        var $slider = $scope.find('.tm-sc-vertical-image-slider');
        if ($slider.length === 0) {
            return
        }
        $slider.each(function() {
            var $this = $(this);
            var $swiperContainer = $this.find('.swiper');
            var existingSwiper = $this.data('swiper-instance');
            if (existingSwiper && typeof existingSwiper.destroy === 'function') {
                existingSwiper.destroy(!0, !0)
            }
            var direction = $this.data('direction') || 'vertical';
            var speed = parseInt($this.data('speed')) || 3000;
            var slidesPerView = $this.data('slides-per-view') || 2.5;
            var slidesPerViewTablet = $this.data('slides-per-view-tablet');
            var slidesPerViewMobile = $this.data('slides-per-view-mobile');
            var spaceBetween = parseInt($this.data('space-between')) || 20;
            var loop = $this.data('loop') === !0 || $this.data('loop') === 'true';
            var mousewheel = $this.data('mousewheel') === !0 || $this.data('mousewheel') === 'true' || $this.data('mousewheel') === 'yes';
            var allowDrag = $this.data('allow-drag');
            var allowDragEnabled = allowDrag === !0 || allowDrag === 'true' || allowDrag === 'yes' || allowDrag === undefined || allowDrag === '';
            var freeMode = $this.data('free-mode') === !0 || $this.data('free-mode') === 'true';
            var reverseDirection = $this.data('reverse-direction') === !0 || $this.data('reverse-direction') === 'true';
            var autoplay = $this.data('autoplay') === !0 || $this.data('autoplay') === 'true';
            var autoplayDelay = parseInt($this.data('autoplay-delay')) || 0;

            function parseSlidesPerView(value) {
                if (!value || value === '' || value === 'auto') {
                    return 'auto'
                }
                return parseFloat(value)
            }
            var desktopSlidesPerView = parseSlidesPerView(slidesPerView);
            var tabletSlidesPerView = slidesPerViewTablet && slidesPerViewTablet !== '' ? parseSlidesPerView(slidesPerViewTablet) : null;
            var mobileSlidesPerView = slidesPerViewMobile && slidesPerViewMobile !== '' ? parseSlidesPerView(slidesPerViewMobile) : null;
            var baseSlidesPerView = mobileSlidesPerView !== null ? mobileSlidesPerView : desktopSlidesPerView;
            var swiperConfig = {
                direction: direction,
                speed: speed,
                slidesPerView: baseSlidesPerView,
                spaceBetween: spaceBetween,
                loop: loop,
                grabCursor: allowDragEnabled,
                allowTouchMove: allowDragEnabled,
                simulateTouch: allowDragEnabled,
            };
            var breakpoints = {};
            if (tabletSlidesPerView !== null) {
                breakpoints[768] = {
                    slidesPerView: tabletSlidesPerView
                }
            }
            if (tabletSlidesPerView !== null || mobileSlidesPerView !== null) {
                var valueAt768 = tabletSlidesPerView !== null ? tabletSlidesPerView : baseSlidesPerView;
                if (desktopSlidesPerView !== valueAt768) {
                    breakpoints[1025] = {
                        slidesPerView: desktopSlidesPerView
                    }
                }
            }
            if (Object.keys(breakpoints).length > 0) {
                swiperConfig.breakpoints = breakpoints
            }
            swiperConfig.mousewheel = {
                enabled: mousewheel,
                releaseOnEdges: mousewheel,
                sensitivity: 1,
            };
            if (freeMode) {
                swiperConfig.freeMode = {
                    enabled: !0,
                    sticky: !1,
                    momentum: !0,
                    momentumRatio: 1,
                    momentumVelocityRatio: 1,
                }
            }
            if (autoplay) {
                swiperConfig.autoplay = {
                    delay: autoplayDelay,
                    disableOnInteraction: !1,
                    pauseOnMouseEnter: !0,
                    reverseDirection: reverseDirection,
                }
            }
            if (typeof Swiper !== 'undefined') {
                var swiper = new Swiper($swiperContainer[0], swiperConfig);
                $this.data('swiper-instance', swiper);
                var resizeTimer;
                $(window).on('resize', function() {
                    clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(function() {
                        if (swiper && typeof swiper.update === 'function') {
                            swiper.update()
                        }
                    }, 250)
                })
            }
        })
    }
    $(window).on('elementor/frontend/init', function() {
        if (typeof elementorFrontend !== 'undefined') {
            elementorFrontend.hooks.addAction('frontend/element_ready/tm-ele-vertical-image-slider.default', initVerticalImageSlider)
        }
    });
    $(document).ready(function() {
        if ($('.tm-sc-vertical-image-slider').length > 0) {
            $('.tm-sc-vertical-image-slider').each(function() {
                initVerticalImageSlider($(this), $)
            })
        }
    })
})(jQuery);
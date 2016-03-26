// page init
var grabMasonary

jQuery(function() {
	initMasonry();
	//initAutocomplete();
	//initCustomForms();
	initCycleCarousel();
	initSlideShow();
	initLightbox();
	initMobileNav();
	initBackgroundResize();
	initLayoutFix();
	jQuery('input, textarea').placeholder();
	initTabs();
});

$(window).load(function () {});

$(document).ready(function () {
    $('.search-opener').click(function () {
        $('body').toggleClass('openMenu');
    });
    initMasonry();
});

function getFavouritesCount(elem) {
    var thisElem = $(elem);
    $.ajax({
        type: 'GET',
        url: '/Ajax/getFavouritesCount.aspx',
        cache: false
    }).done(function (count) {
        $(thisElem).html('Favorites: <span class="specialFont" style="font-size: inherit">' + count + '</span>');
    });
}

// init layout fix
function initLayoutFix() {
	var animSpeed = 1000;
	var expandedClass = 'expanded';
	var hash = window.location.hash;
	var win = jQuery(window);
	var scrollingPage = function(offset) {
		jQuery('html, body').animate({
			scrollTop: offset.top,
			scrollleft: offset.left
		}, animSpeed);
	};
	var checkHash = function() {
		if (!hash) return;
		var targetBox = jQuery('[data-id="' + hash + '"]');
		if (targetBox && targetBox.length) {
			scrollingPage(targetBox.eq(0).offset());
		}
	};
	win.on('load', checkHash);
	jQuery('.item-container .item-block').each(function() {
		var block = jQuery(this);
		var btnDelete = block.find('.delete-link');
		var holder = block.closest('.item-container');
		var hideComplete = function () {
		    if (btnDelete.parent().siblings().length > 1) {
		        if (holder.hasClass(expandedClass)) {
		            jQuery(this).remove();
		        }
		        else {
                    jQuery(this).remove();
		        }
            }
		    else {
		        if (holder.hasClass('expanded')) {
		            if (btnDelete.parent().siblings().length > 1) {
		                jQuery(this).parent().removeClass('expanded').remove();
		            }
		            else {
		                jQuery(this).remove();
		            }
		        }
		        else {
		            jQuery(this).remove();
		        }
		    }
			
		};
		var deleteItem = function(e) {
			e.preventDefault();
			if (holder.hasClass(expandedClass)) {
			    if (btnDelete.parent().siblings().length > 1) {
			        block.parent().hide(animSpeed, hideComplete);
			    }
			    else {
			        block.hide(animSpeed, hideComplete);
			    }
			} else {
				holder.hide(animSpeed, hideComplete);
			}
		};
		btnDelete.on('click', deleteItem);
	});
}

// init masonry
function initMasonry() {
    grabMasonary = $('.masonry-holder').isotope({
                isOriginLeft: true,
                itemSelector: '.item-block, .item',
                layoutMode: 'masonry',
                transitionDuration: 0,
                stamp: '.stamp',
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    columnWidth: '.item-block, .item'
                }
            });

    $('.masonry-holder').imagesLoaded()
        .progress(function (instance, image) {
            if (image.isLoaded) {
                grabMasonary.isotope('layout');
            }
        })
        .done(function (instance) {
            grabMasonary.isotope('layout');
        });
}

// init autocomplete
function initAutocomplete() {
    jQuery('.search-form').autoCompleteForm({
        source: "../ashx/autocomplete.ashx",
		resultsHolder: '.ajax-drop',
		inputField: 'input',
		highlightMatches: true,
		listItemsFillsInput:true,
		filterResults: true,
		alwaysRefresh: true
	});
}

// initialize custom form elements
function initCustomForms() {
	jcf.replaceAll('.custom-form');
}

// cycle scroll gallery init
function initCycleCarousel() {
	jQuery('.cycle-gallery').scrollAbsoluteGallery({
		mask: '.mask',
		slider: '.slideset',
		slides: '.slide',
		btnPrev: 'a.btn-prev',
		btnNext: 'a.btn-next',
		generatePagination: '.switchers',
		stretchSlideToMask: true,
		pauseOnHover: true,
		maskAutoSize: true,
		autoRotation: false,
		switchTime: 3000,
		animSpeed: 500,
		onBeforeChange: function(obj) {
			var prevSlide = obj.slides.eq(obj.prevIndex);
			var videoHolder = prevSlide.find('.flowplayer');
			if (videoHolder.length && videoHolder.data('flowplayer')) {
				videoHolder.data('flowplayer').pause();
			}
		}
	});
}

// fade gallery init
function initSlideShow() {
	jQuery('.slideshow').fadeGallery({
		slides: '.slide',
		btnPrev: 'a.btn-prev',
		btnNext: 'a.btn-next',
		generatePagination: '.switchers',
		event: 'click',
		autoRotation: true,
		pauseOnHover: false,
		switchTime: 3000,
		animSpeed: 500
	});
}

// content tabs init
function initTabs() {
	var activeClass = 'active-tab';
	jQuery('.tabs-area').each(function() {
		var area = jQuery(this);
		var tempArea = jQuery('<div />');
		var tabs = area.find('.columns-holder');
		var tabset = area.find('.tabset');
		var radios = tabset.find('input:radio');
		var switchTabs = function(tab, tabsetHolder) {
			tabs.removeClass(activeClass).appendTo(tempArea);
			tab.addClass(activeClass).appendTo(area);
			tabset.appendTo(tabsetHolder);
		};
		radios.each(function() {
			var radio = jQuery(this);
			var tab = tabs.filter(radio.attr('data-tab'));
			var tabsetHolder = tab.find('.radio-list');
			var changeHandler = function() {
				if (radio.is(':checked')) {
					switchTabs(tab, tabsetHolder);
				}
			};
			changeHandler();
			radio.on('change', changeHandler);
		});
	});
}

// fancybox modal popup init
function initLightbox() {
	jQuery('a.lightbox, a[rel*="lightbox"]').fancybox({
		padding: 0,
		loop: false,
		helpers: {
			overlay: {
				css: {
					background: 'rgba(0, 0, 0, 0.9)'
				}
			}
		},
		afterLoad: function(current, previous) {
			// handle custom close button in inline modal
			if(current.href.indexOf('#') === 0) {
				jQuery(current.href).find('a.close').off('click.fb').on('click.fb', function(e){
					e.preventDefault();
					jQuery.fancybox.close();
				});
			}
		}
	});
}

// mobile menu init
function initMobileNav() {
	jQuery('#nav').mobileNav({
		menuActiveClass: 'nav-active',
		menuOpener: '.nav-opener'
	});
	jQuery('.search-block').mobileNav({
		menuActiveClass: 'search-active',
		menuOpener: '.search-opener'
	});
	jQuery('.nav-opener').click(function () {
	    if ($('#nav').hasClass("nav-active")) {
            jQuery('.search-block, .logo-block').fadeOut();
	    }
	    else {
            jQuery('.search-block, .logo-block').fadeIn();
	    }
	});
}

// stretch background to fill blocks
function initBackgroundResize() {
	jQuery('.bg-stretch').each(function() {
		ImageStretcher.add({
			container: this,
			image: 'img'
		});
	});
}

/*
 * jQuery Cycle Carousel plugin
 */
;(function($){
	function ScrollAbsoluteGallery(options) {
		this.options = $.extend({
			activeClass: 'active',
			mask: 'div.slides-mask',
			slider: '>ul',
			slides: '>li',
			btnPrev: '.btn-prev',
			btnNext: '.btn-next',
			pagerLinks: 'ul.pager > li',
			generatePagination: false,
			pagerList: '<ul>',
			pagerListItem: '<li><a href="#"></a></li>',
			pagerListItemText: 'a',
			galleryReadyClass: 'gallery-js-ready',
			currentNumber: 'span.current-num',
			totalNumber: 'span.total-num',
			maskAutoSize: false,
			autoRotation: false,
			pauseOnHover: false,
			stretchSlideToMask: false,
			switchTime: 3000,
			animSpeed: 500,
			handleTouch: true,
			swipeThreshold: 15,
			vertical: false
		}, options);
		this.init();
	}
	ScrollAbsoluteGallery.prototype = {
		init: function() {
			if(this.options.holder) {
				this.findElements();
				this.attachEvents();
				this.makeCallback('onInit', this);
			}
		},
		findElements: function() {
			// find structure elements
			this.holder = $(this.options.holder).addClass(this.options.galleryReadyClass);
			this.mask = this.holder.find(this.options.mask);
			this.slider = this.mask.find(this.options.slider);
			this.slides = this.slider.find(this.options.slides);
			this.btnPrev = this.holder.find(this.options.btnPrev);
			this.btnNext = this.holder.find(this.options.btnNext);

			// slide count display
			this.currentNumber = this.holder.find(this.options.currentNumber);
			this.totalNumber = this.holder.find(this.options.totalNumber);

			// create gallery pagination
			if(typeof this.options.generatePagination === 'string') {
				this.pagerLinks = this.buildPagination();
			} else {
				this.pagerLinks = this.holder.find(this.options.pagerLinks);
			}

			// define index variables
			this.sizeProperty = this.options.vertical ? 'height' : 'width';
			this.positionProperty = this.options.vertical ? 'top' : 'left';
			this.animProperty = this.options.vertical ? 'marginTop' : 'marginLeft';

			this.slideSize = this.slides[this.sizeProperty]();
			this.currentIndex = 0;
			this.prevIndex = 0;

			// reposition elements
			this.options.maskAutoSize = this.options.vertical ? false : this.options.maskAutoSize;
			if(this.options.vertical) {
				this.mask.css({
					height: this.slides.innerHeight()
				});
			}
			if(this.options.maskAutoSize){
				this.mask.css({
					height: this.slider.height()
				});
			}
			this.slider.css({
				position: 'relative',
				height: this.options.vertical ? this.slideSize * this.slides.length : '100%'
			});
			this.slides.css({
				position: 'absolute'
			}).css(this.positionProperty, -9999).eq(this.currentIndex).css(this.positionProperty, 0);
			this.refreshState();
		},
		buildPagination: function() {
			var pagerLinks = $();
			if(!this.pagerHolder) {
				this.pagerHolder = this.holder.find(this.options.generatePagination);
			}
			if(this.pagerHolder.length) {
				this.pagerHolder.empty();
				this.pagerList = $(this.options.pagerList).appendTo(this.pagerHolder);
				for(var i = 0; i < this.slides.length; i++) {
					$(this.options.pagerListItem).appendTo(this.pagerList).find(this.options.pagerListItemText).text(i+1);
				}
				pagerLinks = this.pagerList.children();
			}
			return pagerLinks;
		},
		attachEvents: function() {
			// attach handlers
			var self = this;
			if(this.btnPrev.length) {
				this.btnPrevHandler = function(e) {
					e.preventDefault();
					self.prevSlide();
				};
				this.btnPrev.click(this.btnPrevHandler);
			}
			if(this.btnNext.length) {
				this.btnNextHandler = function(e) {
					e.preventDefault();
					self.nextSlide();
				};
				this.btnNext.click(this.btnNextHandler);
			}
			if(this.pagerLinks.length) {
				this.pagerLinksHandler = function(e) {
					e.preventDefault();
					self.numSlide(self.pagerLinks.index(e.currentTarget));
				};
				this.pagerLinks.click(this.pagerLinksHandler);
			}

			// handle autorotation pause on hover
			if(this.options.pauseOnHover) {
				this.hoverHandler = function() {
					clearTimeout(self.timer);
				};
				this.leaveHandler = function() {
					self.autoRotate();
				};
				this.holder.bind({mouseenter: this.hoverHandler, mouseleave: this.leaveHandler});
			}

			// handle holder and slides dimensions
			this.resizeHandler = function() {
				if(!self.animating) {
					if(self.options.stretchSlideToMask) {
						self.resizeSlides();
					}
					self.resizeHolder();
					self.setSlidesPosition(self.currentIndex);
				}
			};
			$(window).bind('load resize orientationchange', this.resizeHandler);
			if(self.options.stretchSlideToMask) {
				self.resizeSlides();
			}

			// handle swipe on mobile devices
			if(this.options.handleTouch && window.Hammer && this.mask.length && this.slides.length > 1 && isTouchDevice) {
				this.swipeHandler = new Hammer.Manager(this.mask[0]);
				this.swipeHandler.add(new Hammer.Pan({
					direction: self.options.vertical ? Hammer.DIRECTION_VERTICAL : Hammer.DIRECTION_HORIZONTAL,
					threshold: self.options.swipeThreshold
				}));

				this.swipeHandler.on('panstart', function() {
					if(self.animating) {
						self.swipeHandler.stop();
					} else {
						clearTimeout(self.timer);
					}
				}).on('panmove', function(e) {
					self.swipeOffset = -self.slideSize + e[self.options.vertical ? 'deltaY' : 'deltaX'];
					self.slider.css(self.animProperty, self.swipeOffset);
					clearTimeout(self.timer);
				}).on('panend', function(e) {
					if(e.distance > self.options.swipeThreshold) {
						if(e.offsetDirection === Hammer.DIRECTION_RIGHT || e.offsetDirection === Hammer.DIRECTION_DOWN) {
							self.nextSlide();
						} else {
							self.prevSlide();
						}
					} else {
						var tmpObj = {};
						tmpObj[self.animProperty] = -self.slideSize;
						self.slider.animate(tmpObj, {duration: self.options.animSpeed});
						self.autoRotate();
					}
					self.swipeOffset = 0;
				});
			}

			// start autorotation
			this.autoRotate();
			this.resizeHolder();
			this.setSlidesPosition(this.currentIndex);
		},
		resizeSlides: function() {
			this.slideSize = this.mask[this.options.vertical ? 'height' : 'width']();
			this.slides.css(this.sizeProperty, this.slideSize);
		},
		resizeHolder: function() {
			if(this.options.maskAutoSize) {
				this.mask.css({
					height: this.slides.eq(this.currentIndex).outerHeight(true)
				});
			}
		},
		prevSlide: function() {
			if(!this.animating && this.slides.length > 1) {
				this.direction = -1;
				this.prevIndex = this.currentIndex;
				if(this.currentIndex > 0) this.currentIndex--;
				else this.currentIndex = this.slides.length - 1;
				this.switchSlide();
			}
		},
		nextSlide: function(fromAutoRotation) {
			if(!this.animating && this.slides.length > 1) {
				this.direction = 1;
				this.prevIndex = this.currentIndex;
				if(this.currentIndex < this.slides.length - 1) this.currentIndex++;
				else this.currentIndex = 0;
				this.switchSlide();
			}
		},
		numSlide: function(c) {
			if(!this.animating && this.currentIndex !== c && this.slides.length > 1) {
				this.direction = c > this.currentIndex ? 1 : -1;
				this.prevIndex = this.currentIndex;
				this.currentIndex = c;
				this.switchSlide();
			}
		},
		preparePosition: function() {
			// prepare slides position before animation
			this.setSlidesPosition(this.prevIndex, this.direction < 0 ? this.currentIndex : null, this.direction > 0 ? this.currentIndex : null, this.direction);
		},
		setSlidesPosition: function(index, slideLeft, slideRight, direction) {
			// reposition holder and nearest slides
			if(this.slides.length > 1) {
				var prevIndex = (typeof slideLeft === 'number' ? slideLeft : index > 0 ? index - 1 : this.slides.length - 1);
				var nextIndex = (typeof slideRight === 'number' ? slideRight : index < this.slides.length - 1 ? index + 1 : 0);

				this.slider.css(this.animProperty, this.swipeOffset ? this.swipeOffset : -this.slideSize);
				this.slides.css(this.positionProperty, -9999).eq(index).css(this.positionProperty, this.slideSize);
				if(prevIndex === nextIndex && typeof direction === 'number') {
					var calcOffset = direction > 0 ? this.slideSize*2 : 0;
					this.slides.eq(nextIndex).css(this.positionProperty, calcOffset);
				} else {
					this.slides.eq(prevIndex).css(this.positionProperty, 0);
					this.slides.eq(nextIndex).css(this.positionProperty, this.slideSize*2);
				}
			}
		},
		switchSlide: function() {
			// prepare positions and calculate offset
			var self = this;
			var oldSlide = this.slides.eq(this.prevIndex);
			var newSlide = this.slides.eq(this.currentIndex);
			this.animating = true;

			// resize mask to fit slide
			if(this.options.maskAutoSize) {
				this.mask.animate({
					height: newSlide.outerHeight(true)
				}, {
					duration: this.options.animSpeed
				});
			}

			// start animation
			var animProps = {};
			animProps[this.animProperty] = this.direction > 0 ? -this.slideSize*2 : 0;
			this.preparePosition();
			this.slider.animate(animProps,{duration:this.options.animSpeed, complete:function() {
				self.setSlidesPosition(self.currentIndex);

				// start autorotation
				self.animating = false;
				self.autoRotate();

				// onchange callback
				self.makeCallback('onChange', self);
			}});

			// refresh classes
			this.refreshState();

			// onchange callback
			this.makeCallback('onBeforeChange', this);
		},
		refreshState: function(initial) {
			// slide change function
			this.slides.removeClass(this.options.activeClass).eq(this.currentIndex).addClass(this.options.activeClass);
			this.pagerLinks.removeClass(this.options.activeClass).eq(this.currentIndex).addClass(this.options.activeClass);

			// display current slide number
			this.currentNumber.html(this.currentIndex + 1);
			this.totalNumber.html(this.slides.length);

			// add class if not enough slides
			this.holder.toggleClass('not-enough-slides', this.slides.length === 1);
		},
		autoRotate: function() {
			var self = this;
			clearTimeout(this.timer);
			if(this.options.autoRotation) {
				this.timer = setTimeout(function() {
					self.nextSlide();
				}, this.options.switchTime);
			}
		},
		makeCallback: function(name) {
			if(typeof this.options[name] === 'function') {
				var args = Array.prototype.slice.call(arguments);
				args.shift();
				this.options[name].apply(this, args);
			}
		},
		destroy: function() {
			// destroy handler
			this.btnPrev.unbind('click', this.btnPrevHandler);
			this.btnNext.unbind('click', this.btnNextHandler);
			this.pagerLinks.unbind('click', this.pagerLinksHandler);
			this.holder.unbind('mouseenter', this.hoverHandler);
			this.holder.unbind('mouseleave', this.leaveHandler);
			$(window).unbind('load resize orientationchange', this.resizeHandler);
			clearTimeout(this.timer);

			// destroy swipe handler
			if(this.swipeHandler) {
				this.swipeHandler.destroy();
			}

			// remove inline styles, classes and pagination
			this.holder.removeClass(this.options.galleryReadyClass);
			this.slider.add(this.slides).removeAttr('style');
			if(typeof this.options.generatePagination === 'string') {
				this.pagerHolder.empty();
			}
		}
	};

	// detect device type
	var isTouchDevice = /Windows Phone/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

	// jquery plugin
	$.fn.scrollAbsoluteGallery = function(opt){
		return this.each(function(){
			$(this).data('ScrollAbsoluteGallery', new ScrollAbsoluteGallery($.extend(opt,{holder:this})));
		});
	};
}(jQuery));

/*
 * jQuery SlideShow plugin
 */
;(function($){
	function FadeGallery(options) {
		this.options = $.extend({
			slides: 'ul.slideset > li',
			activeClass:'active',
			disabledClass:'disabled',
			btnPrev: 'a.btn-prev',
			btnNext: 'a.btn-next',
			generatePagination: false,
			pagerList: '<ul>',
			pagerListItem: '<li><a href="#"></a></li>',
			pagerListItemText: 'a',
			pagerLinks: '.pagination li',
			currentNumber: 'span.current-num',
			totalNumber: 'span.total-num',
			btnPlay: '.btn-play',
			btnPause: '.btn-pause',
			btnPlayPause: '.btn-play-pause',
			galleryReadyClass: 'gallery-js-ready',
			autorotationActiveClass: 'autorotation-active',
			autorotationDisabledClass: 'autorotation-disabled',
			autorotationStopAfterClick: false,
			circularRotation: true,
			switchSimultaneously: true,
			disableWhileAnimating: false,
			disableFadeIE: false,
			autoRotation: false,
			pauseOnHover: true,
			autoHeight: false,
			useSwipe: false,
			swipeThreshold: 15,
			switchTime: 4000,
			animSpeed: 600,
			event:'click'
		}, options);
		this.init();
	}
	FadeGallery.prototype = {
		init: function() {
			if(this.options.holder) {
				this.findElements();
				this.attachEvents();
				this.refreshState(true);
				this.autoRotate();
				this.makeCallback('onInit', this);
			}
		},
		findElements: function() {
			// control elements
			this.gallery = $(this.options.holder).addClass(this.options.galleryReadyClass);
			this.slides = this.gallery.find(this.options.slides);
			this.slidesHolder = this.slides.eq(0).parent();
			this.stepsCount = this.slides.length;
			this.btnPrev = this.gallery.find(this.options.btnPrev);
			this.btnNext = this.gallery.find(this.options.btnNext);
			this.currentIndex = 0;

			// disable fade effect in old IE
			if(this.options.disableFadeIE && !$.support.opacity) {
				this.options.animSpeed = 0;
			}

			// create gallery pagination
			if(typeof this.options.generatePagination === 'string') {
				this.pagerHolder = this.gallery.find(this.options.generatePagination).empty();
				this.pagerList = $(this.options.pagerList).appendTo(this.pagerHolder);
				for(var i = 0; i < this.stepsCount; i++) {
					$(this.options.pagerListItem).appendTo(this.pagerList).find(this.options.pagerListItemText).text(i+1);
				}
				this.pagerLinks = this.pagerList.children();
			} else {
				this.pagerLinks = this.gallery.find(this.options.pagerLinks);
			}

			// get start index
			var activeSlide = this.slides.filter('.'+this.options.activeClass);
			if(activeSlide.length) {
				this.currentIndex = this.slides.index(activeSlide);
			}
			this.prevIndex = this.currentIndex;

			// autorotation control buttons
			this.btnPlay = this.gallery.find(this.options.btnPlay);
			this.btnPause = this.gallery.find(this.options.btnPause);
			this.btnPlayPause = this.gallery.find(this.options.btnPlayPause);

			// misc elements
			this.curNum = this.gallery.find(this.options.currentNumber);
			this.allNum = this.gallery.find(this.options.totalNumber);

			// handle flexible layout
			this.slides.css({display:'block',opacity:0}).eq(this.currentIndex).css({
				opacity:''
			});
		},
		attachEvents: function() {
			var self = this;

			// flexible layout handler
			this.resizeHandler = function() {
				self.onWindowResize();
			};
			$(window).bind('load resize orientationchange', this.resizeHandler);

			if(this.btnPrev.length) {
				this.btnPrevHandler = function(e){
					e.preventDefault();
					self.prevSlide();
					if(self.options.autorotationStopAfterClick) {
						self.stopRotation();
					}
				};
				this.btnPrev.bind(this.options.event, this.btnPrevHandler);
			}
			if(this.btnNext.length) {
				this.btnNextHandler = function(e) {
					e.preventDefault();
					self.nextSlide();
					if(self.options.autorotationStopAfterClick) {
						self.stopRotation();
					}
				};
				this.btnNext.bind(this.options.event, this.btnNextHandler);
			}
			if(this.pagerLinks.length) {
				this.pagerLinksHandler = function(e) {
					e.preventDefault();
					self.numSlide(self.pagerLinks.index(e.currentTarget));
					if(self.options.autorotationStopAfterClick) {
						self.stopRotation();
					}
				};
				this.pagerLinks.bind(self.options.event, this.pagerLinksHandler);
			}

			// autorotation buttons handler
			if(this.btnPlay.length) {
				this.btnPlayHandler = function(e) {
					e.preventDefault();
					self.startRotation();
				};
				this.btnPlay.bind(this.options.event, this.btnPlayHandler);
			}
			if(this.btnPause.length) {
				this.btnPauseHandler = function(e) {
					e.preventDefault();
					self.stopRotation();
				};
				this.btnPause.bind(this.options.event, this.btnPauseHandler);
			}
			if(this.btnPlayPause.length) {
				this.btnPlayPauseHandler = function(e){
					e.preventDefault();
					if(!self.gallery.hasClass(self.options.autorotationActiveClass)) {
						self.startRotation();
					} else {
						self.stopRotation();
					}
				};
				this.btnPlayPause.bind(this.options.event, this.btnPlayPauseHandler);
			}

			// swipe gestures handler
			if(this.options.useSwipe && window.Hammer && isTouchDevice) {
				this.swipeHandler = new Hammer.Manager(this.gallery[0]);
				this.swipeHandler.add(new Hammer.Swipe({
					direction: Hammer.DIRECTION_HORIZONTAL,
					threshold: self.options.swipeThreshold
				}));
				this.swipeHandler.on('swipeleft', function() {
					self.nextSlide();
				}).on('swiperight', function() {
					self.prevSlide();
				});
			}

			// pause on hover handling
			if(this.options.pauseOnHover) {
				this.hoverHandler = function() {
					if(self.options.autoRotation) {
						self.galleryHover = true;
						self.pauseRotation();
					}
				};
				this.leaveHandler = function() {
					if(self.options.autoRotation) {
						self.galleryHover = false;
						self.resumeRotation();
					}
				};
				this.gallery.bind({mouseenter: this.hoverHandler, mouseleave: this.leaveHandler});
			}
		},
		onWindowResize: function(){
			if(this.options.autoHeight) {
				this.slidesHolder.css({height: this.slides.eq(this.currentIndex).outerHeight(true) });
			}
		},
		prevSlide: function() {
			if(!(this.options.disableWhileAnimating && this.galleryAnimating)) {
				this.prevIndex = this.currentIndex;
				if(this.currentIndex > 0) {
					this.currentIndex--;
					this.switchSlide();
				} else if(this.options.circularRotation) {
					this.currentIndex = this.stepsCount - 1;
					this.switchSlide();
				}
			}
		},
		nextSlide: function(fromAutoRotation) {
			if(!(this.options.disableWhileAnimating && this.galleryAnimating)) {
				this.prevIndex = this.currentIndex;
				if(this.currentIndex < this.stepsCount - 1) {
					this.currentIndex++;
					this.switchSlide();
				} else if(this.options.circularRotation || fromAutoRotation === true) {
					this.currentIndex = 0;
					this.switchSlide();
				}
			}
		},
		numSlide: function(c) {
			if(this.currentIndex != c) {
				this.prevIndex = this.currentIndex;
				this.currentIndex = c;
				this.switchSlide();
			}
		},
		switchSlide: function() {
			var self = this;
			if(this.slides.length > 1) {
				this.galleryAnimating = true;
				if(!this.options.animSpeed) {
					this.slides.eq(this.prevIndex).css({opacity:0});
				} else {
					this.slides.eq(this.prevIndex).stop().animate({opacity:0},{duration: this.options.animSpeed});
				}

				this.switchNext = function() {
					if(!self.options.animSpeed) {
						self.slides.eq(self.currentIndex).css({opacity:''});
					} else {
						self.slides.eq(self.currentIndex).stop().animate({opacity:1},{duration: self.options.animSpeed});
					}
					clearTimeout(this.nextTimer);
					this.nextTimer = setTimeout(function() {
						self.slides.eq(self.currentIndex).css({opacity:''});
						self.galleryAnimating = false;
						self.autoRotate();

						// onchange callback
						self.makeCallback('onChange', self);
					}, self.options.animSpeed);
				};

				if(this.options.switchSimultaneously) {
					self.switchNext();
				} else {
					clearTimeout(this.switchTimer);
					this.switchTimer = setTimeout(function(){
						self.switchNext();
					}, this.options.animSpeed);
				}
				this.refreshState();

				// onchange callback
				this.makeCallback('onBeforeChange', this);
			}
		},
		refreshState: function(initial) {
			this.slides.removeClass(this.options.activeClass).eq(this.currentIndex).addClass(this.options.activeClass);
			this.pagerLinks.removeClass(this.options.activeClass).eq(this.currentIndex).addClass(this.options.activeClass);
			this.curNum.html(this.currentIndex+1);
			this.allNum.html(this.stepsCount);

			// initial refresh
			if(this.options.autoHeight) {
				if(initial) {
					this.slidesHolder.css({height: this.slides.eq(this.currentIndex).outerHeight(true) });
				} else {
					this.slidesHolder.stop().animate({height: this.slides.eq(this.currentIndex).outerHeight(true)}, {duration: this.options.animSpeed});
				}
			}

			// disabled state
			if(!this.options.circularRotation) {
				this.btnPrev.add(this.btnNext).removeClass(this.options.disabledClass);
				if(this.currentIndex === 0) this.btnPrev.addClass(this.options.disabledClass);
				if(this.currentIndex === this.stepsCount - 1) this.btnNext.addClass(this.options.disabledClass);
			}

			// add class if not enough slides
			this.gallery.toggleClass('not-enough-slides', this.stepsCount === 1);
		},
		startRotation: function() {
			this.options.autoRotation = true;
			this.galleryHover = false;
			this.autoRotationStopped = false;
			this.resumeRotation();
		},
		stopRotation: function() {
			this.galleryHover = true;
			this.autoRotationStopped = true;
			this.pauseRotation();
		},
		pauseRotation: function() {
			this.gallery.addClass(this.options.autorotationDisabledClass);
			this.gallery.removeClass(this.options.autorotationActiveClass);
			clearTimeout(this.timer);
		},
		resumeRotation: function() {
			if(!this.autoRotationStopped) {
				this.gallery.addClass(this.options.autorotationActiveClass);
				this.gallery.removeClass(this.options.autorotationDisabledClass);
				this.autoRotate();
			}
		},
		autoRotate: function() {
			var self = this;
			clearTimeout(this.timer);
			if(this.options.autoRotation && !this.galleryHover && !this.autoRotationStopped) {
				this.gallery.addClass(this.options.autorotationActiveClass);
				this.timer = setTimeout(function(){
					self.nextSlide(true);
				}, this.options.switchTime);
			} else {
				this.pauseRotation();
			}
		},
		makeCallback: function(name) {
			if(typeof this.options[name] === 'function') {
				var args = Array.prototype.slice.call(arguments);
				args.shift();
				this.options[name].apply(this, args);
			}
		},
		destroy: function() {
			// navigation buttons handler
			this.btnPrev.unbind(this.options.event, this.btnPrevHandler);
			this.btnNext.unbind(this.options.event, this.btnNextHandler);
			this.pagerLinks.unbind(this.options.event, this.pagerLinksHandler);
			$(window).unbind('load resize orientationchange', this.resizeHandler);

			// remove autorotation handlers
			this.stopRotation();
			this.btnPlay.unbind(this.options.event, this.btnPlayHandler);
			this.btnPause.unbind(this.options.event, this.btnPauseHandler);
			this.btnPlayPause.unbind(this.options.event, this.btnPlayPauseHandler);
			this.gallery.unbind('mouseenter', this.hoverHandler);
			this.gallery.unbind('mouseleave', this.leaveHandler);

			// remove swipe handler if used
			if(this.swipeHandler) {
				this.swipeHandler.destroy();
			}
			if(typeof this.options.generatePagination === 'string') {
				this.pagerHolder.empty();
			}

			// remove unneeded classes and styles
			var unneededClasses = [this.options.galleryReadyClass, this.options.autorotationActiveClass, this.options.autorotationDisabledClass];
			this.gallery.removeClass(unneededClasses.join(' '));
			this.slidesHolder.add(this.slides).removeAttr('style');
		}
	};

	// detect device type
	var isTouchDevice = /Windows Phone/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

	// jquery plugin
	$.fn.fadeGallery = function(opt){
		return this.each(function(){
			$(this).data('FadeGallery', new FadeGallery($.extend(opt,{holder:this})));
		});
	};
}(jQuery));

/*
 * Simple Mobile Navigation
 */
;(function($) {
	function MobileNav(options) {
		this.options = $.extend({
			container: null,
			hideOnClickOutside: false,
			menuActiveClass: 'nav-active',
			menuOpener: '.nav-opener',
			menuDrop: '.nav-drop',
			toggleEvent: 'click',
			outsideClickEvent: 'click touchstart pointerdown MSPointerDown'
		}, options);
		this.initStructure();
		this.attachEvents();
	}
	MobileNav.prototype = {
		initStructure: function() {
			this.page = $('html');
			this.container = $(this.options.container);
			this.opener = this.container.find(this.options.menuOpener);
			this.drop = this.container.find(this.options.menuDrop);
		},
		attachEvents: function() {
			var self = this;

			if(activateResizeHandler) {
				activateResizeHandler();
				activateResizeHandler = null;
			}

			this.outsideClickHandler = function(e) {
				if(self.isOpened()) {
					var target = $(e.target);
					if(!target.closest(self.opener).length && !target.closest(self.drop).length) {
						self.hide();
					}
				}
			};

			this.openerClickHandler = function(e) {
				e.preventDefault();
				self.toggle();
			};

			this.opener.on(this.options.toggleEvent, this.openerClickHandler);
		},
		isOpened: function() {
			return this.container.hasClass(this.options.menuActiveClass);
		},
		show: function() {
			this.container.addClass(this.options.menuActiveClass);
			if(this.options.hideOnClickOutside) {
				this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
			}
		},
		hide: function() {
			this.container.removeClass(this.options.menuActiveClass);
			if(this.options.hideOnClickOutside) {
				this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
			}
		},
		toggle: function() {
			if(this.isOpened()) {
				this.hide();
			} else {
				this.show();
			}
		},
		destroy: function() {
			this.container.removeClass(this.options.menuActiveClass);
			this.opener.off(this.options.toggleEvent, this.clickHandler);
			this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
		}
	};

	var activateResizeHandler = function() {
		var win = $(window),
			doc = $('html'),
			resizeClass = 'resize-active',
			flag, timer;
		var removeClassHandler = function() {
			flag = false;
			doc.removeClass(resizeClass);
		};
		var resizeHandler = function() {
			if(!flag) {
				flag = true;
				doc.addClass(resizeClass);
			}
			clearTimeout(timer);
			timer = setTimeout(removeClassHandler, 500);
		};
		win.on('resize orientationchange', resizeHandler);
	};

	$.fn.mobileNav = function(options) {
		return this.each(function() {
			var params = $.extend({}, options, {container: this}),
				instance = new MobileNav(params);
			$.data(this, 'MobileNav', instance);
		});
	};
}(jQuery));

/*! http://mths.be/placeholder v2.0.7 by @mathias */
;(function(window, document, $) {

	// Opera Mini v7 doesn’t support placeholder although its DOM seems to indicate so
	var isOperaMini = Object.prototype.toString.call(window.operamini) == '[object OperaMini]';
	var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
	var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;
	var prototype = $.fn;
	var valHooks = $.valHooks;
	var propHooks = $.propHooks;
	var hooks;
	var placeholder;

	if (isInputSupported && isTextareaSupported) {

		placeholder = prototype.placeholder = function() {
			return this;
		};

		placeholder.input = placeholder.textarea = true;

	} else {

		placeholder = prototype.placeholder = function() {
			var $this = this;
			$this
				.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
				.not('.placeholder')
				.bind({
					'focus.placeholder': clearPlaceholder,
					'blur.placeholder': setPlaceholder
				})
				.data('placeholder-enabled', true)
				.trigger('blur.placeholder');
			return $this;
		};

		placeholder.input = isInputSupported;
		placeholder.textarea = isTextareaSupported;

		hooks = {
			'get': function(element) {
				var $element = $(element);

				var $passwordInput = $element.data('placeholder-password');
				if ($passwordInput) {
					return $passwordInput[0].value;
				}

				return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
			},
			'set': function(element, value) {
				var $element = $(element);

				var $passwordInput = $element.data('placeholder-password');
				if ($passwordInput) {
					return $passwordInput[0].value = value;
				}

				if (!$element.data('placeholder-enabled')) {
					return element.value = value;
				}
				if (value == '') {
					element.value = value;
					// Issue #56: Setting the placeholder causes problems if the element continues to have focus.
					if (element != safeActiveElement()) {
						// We can't use `triggerHandler` here because of dummy text/password inputs :(
						setPlaceholder.call(element);
					}
				} else if ($element.hasClass('placeholder')) {
					clearPlaceholder.call(element, true, value) || (element.value = value);
				} else {
					element.value = value;
				}
				// `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
				return $element;
			}
		};

		if (!isInputSupported) {
			valHooks.input = hooks;
			propHooks.value = hooks;
		}
		if (!isTextareaSupported) {
			valHooks.textarea = hooks;
			propHooks.value = hooks;
		}

		$(function() {
			// Look for forms
			$(document).delegate('form', 'submit.placeholder', function() {
				// Clear the placeholder values so they don't get submitted
				var $inputs = $('.placeholder', this).each(clearPlaceholder);
				setTimeout(function() {
					$inputs.each(setPlaceholder);
				}, 10);
			});
		});

		// Clear placeholder values upon page reload
		$(window).bind('beforeunload.placeholder', function() {
			$('.placeholder').each(function() {
				this.value = '';
			});
		});

	}

	function args(elem) {
		// Return an object of element attributes
		var newAttrs = {};
		var rinlinejQuery = /^jQuery\d+$/;
		$.each(elem.attributes, function(i, attr) {
			if (attr.specified && !rinlinejQuery.test(attr.name)) {
				newAttrs[attr.name] = attr.value;
			}
		});
		return newAttrs;
	}

	function clearPlaceholder(event, value) {
		var input = this;
		var $input = $(input);
		if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
			if ($input.data('placeholder-password')) {
				$input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
				// If `clearPlaceholder` was called from `$.valHooks.input.set`
				if (event === true) {
					return $input[0].value = value;
				}
				$input.focus();
			} else {
				input.value = '';
				$input.removeClass('placeholder');
				input == safeActiveElement() && input.select();
			}
		}
	}

	function setPlaceholder() {
		var $replacement;
		var input = this;
		var $input = $(input);
		var id = this.id;
		if (input.value == '') {
			if (input.type == 'password') {
				if (!$input.data('placeholder-textinput')) {
					try {
						$replacement = $input.clone().attr({ 'type': 'text' });
					} catch(e) {
						$replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
					}
					$replacement
						.removeAttr('name')
						.data({
							'placeholder-password': $input,
							'placeholder-id': id
						})
						.bind('focus.placeholder', clearPlaceholder);
					$input
						.data({
							'placeholder-textinput': $replacement,
							'placeholder-id': id
						})
						.before($replacement);
				}
				$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
				// Note: `$input[0] != input` now!
			}
			$input.addClass('placeholder');
			$input[0].value = $input.attr('placeholder');
		} else {
			$input.removeClass('placeholder');
		}
	}

	function safeActiveElement() {
		// Avoid IE9 `document.activeElement` of death
		// https://github.com/mathiasbynens/jquery-placeholder/pull/99
		try {
			return document.activeElement;
		} catch (err) {}
	}

}(this, document, jQuery));

/*!
 * JavaScript Custom Forms
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
;(function(root, factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(require('jquery'));
	} else {
		root.jcf = factory(jQuery);
	}
}(this, function($) {
	'use strict';

	// define version
	var version = '1.1.3';

	// private variables
	var customInstances = [];

	// default global options
	var commonOptions = {
		optionsKey: 'jcf',
		dataKey: 'jcf-instance',
		rtlClass: 'jcf-rtl',
		focusClass: 'jcf-focus',
		pressedClass: 'jcf-pressed',
		disabledClass: 'jcf-disabled',
		hiddenClass: 'jcf-hidden',
		resetAppearanceClass: 'jcf-reset-appearance',
		unselectableClass: 'jcf-unselectable'
	};

	// detect device type
	var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch,
		isWinPhoneDevice = /Windows Phone/.test(navigator.userAgent);
	commonOptions.isMobileDevice = !!(isTouchDevice || isWinPhoneDevice);

	// create global stylesheet if custom forms are used
	var createStyleSheet = function() {
		var styleTag = $('<style>').appendTo('head'),
			styleSheet = styleTag.prop('sheet') || styleTag.prop('styleSheet');

		// crossbrowser style handling
		var addCSSRule = function(selector, rules, index) {
			if (styleSheet.insertRule) {
				styleSheet.insertRule(selector + '{' + rules + '}', index);
			} else {
				styleSheet.addRule(selector, rules, index);
			}
		};

		// add special rules
		addCSSRule('.' + commonOptions.hiddenClass, 'position:absolute !important;left:-9999px !important;height:1px !important;width:1px !important;margin:0 !important;border-width:0 !important;-webkit-appearance:none;-moz-appearance:none;appearance:none');
		addCSSRule('.' + commonOptions.rtlClass + ' .' + commonOptions.hiddenClass, 'right:-9999px !important; left: auto !important');
		addCSSRule('.' + commonOptions.unselectableClass, '-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0);');
		addCSSRule('.' + commonOptions.resetAppearanceClass, 'background: none; border: none; -webkit-appearance: none; appearance: none; opacity: 0; filter: alpha(opacity=0);');

		// detect rtl pages
		var html = $('html'), body = $('body');
		if (html.css('direction') === 'rtl' || body.css('direction') === 'rtl') {
			html.addClass(commonOptions.rtlClass);
		}

		// handle form reset event
		html.on('reset', function() {
			setTimeout(function() {
				api.refreshAll();
			}, 0);
		});

		// mark stylesheet as created
		commonOptions.styleSheetCreated = true;
	};

	// simplified pointer events handler
	(function() {
		var pointerEventsSupported = navigator.pointerEnabled || navigator.msPointerEnabled,
			touchEventsSupported = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch,
			eventList, eventMap = {}, eventPrefix = 'jcf-';

		// detect events to attach
		if (pointerEventsSupported) {
			eventList = {
				pointerover: navigator.pointerEnabled ? 'pointerover' : 'MSPointerOver',
				pointerdown: navigator.pointerEnabled ? 'pointerdown' : 'MSPointerDown',
				pointermove: navigator.pointerEnabled ? 'pointermove' : 'MSPointerMove',
				pointerup: navigator.pointerEnabled ? 'pointerup' : 'MSPointerUp'
			};
		} else {
			eventList = {
				pointerover: 'mouseover',
				pointerdown: 'mousedown' + (touchEventsSupported ? ' touchstart' : ''),
				pointermove: 'mousemove' + (touchEventsSupported ? ' touchmove' : ''),
				pointerup: 'mouseup' + (touchEventsSupported ? ' touchend' : '')
			};
		}

		// create event map
		$.each(eventList, function(targetEventName, fakeEventList) {
			$.each(fakeEventList.split(' '), function(index, fakeEventName) {
				eventMap[fakeEventName] = targetEventName;
			});
		});

		// jQuery event hooks
		$.each(eventList, function(eventName, eventHandlers) {
			eventHandlers = eventHandlers.split(' ');
			$.event.special[eventPrefix + eventName] = {
				setup: function() {
					var self = this;
					$.each(eventHandlers, function(index, fallbackEvent) {
						if (self.addEventListener) self.addEventListener(fallbackEvent, fixEvent, false);
						else self['on' + fallbackEvent] = fixEvent;
					});
				},
				teardown: function() {
					var self = this;
					$.each(eventHandlers, function(index, fallbackEvent) {
						if (self.addEventListener) self.removeEventListener(fallbackEvent, fixEvent, false);
						else self['on' + fallbackEvent] = null;
					});
				}
			};
		});

		// check that mouse event are not simulated by mobile browsers
		var lastTouch = null;
		var mouseEventSimulated = function(e) {
			var dx = Math.abs(e.pageX - lastTouch.x),
				dy = Math.abs(e.pageY - lastTouch.y),
				rangeDistance = 25;

			if (dx <= rangeDistance && dy <= rangeDistance) {
				return true;
			}
		};

		// normalize event
		var fixEvent = function(e) {
			var origEvent = e || window.event,
				touchEventData = null,
				targetEventName = eventMap[origEvent.type];

			e = $.event.fix(origEvent);
			e.type = eventPrefix + targetEventName;

			if (origEvent.pointerType) {
				switch (origEvent.pointerType) {
					case 2: e.pointerType = 'touch'; break;
					case 3: e.pointerType = 'pen'; break;
					case 4: e.pointerType = 'mouse'; break;
					default: e.pointerType = origEvent.pointerType;
				}
			} else {
				e.pointerType = origEvent.type.substr(0, 5); // "mouse" or "touch" word length
			}

			if (!e.pageX && !e.pageY) {
				touchEventData = origEvent.changedTouches ? origEvent.changedTouches[0] : origEvent;
				e.pageX = touchEventData.pageX;
				e.pageY = touchEventData.pageY;
			}

			if (origEvent.type === 'touchend') {
				lastTouch = { x: e.pageX, y: e.pageY };
			}
			if (e.pointerType === 'mouse' && lastTouch && mouseEventSimulated(e)) {
				return;
			} else {
				return ($.event.dispatch || $.event.handle).call(this, e);
			}
		};
	}());

	// custom mousewheel/trackpad handler
	(function() {
		var wheelEvents = ('onwheel' in document || document.documentMode >= 9 ? 'wheel' : 'mousewheel DOMMouseScroll').split(' '),
			shimEventName = 'jcf-mousewheel';

		$.event.special[shimEventName] = {
			setup: function() {
				var self = this;
				$.each(wheelEvents, function(index, fallbackEvent) {
					if (self.addEventListener) self.addEventListener(fallbackEvent, fixEvent, false);
					else self['on' + fallbackEvent] = fixEvent;
				});
			},
			teardown: function() {
				var self = this;
				$.each(wheelEvents, function(index, fallbackEvent) {
					if (self.addEventListener) self.removeEventListener(fallbackEvent, fixEvent, false);
					else self['on' + fallbackEvent] = null;
				});
			}
		};

		var fixEvent = function(e) {
			var origEvent = e || window.event;
			e = $.event.fix(origEvent);
			e.type = shimEventName;

			// old wheel events handler
			if ('detail'      in origEvent) { e.deltaY = -origEvent.detail;      }
			if ('wheelDelta'  in origEvent) { e.deltaY = -origEvent.wheelDelta;  }
			if ('wheelDeltaY' in origEvent) { e.deltaY = -origEvent.wheelDeltaY; }
			if ('wheelDeltaX' in origEvent) { e.deltaX = -origEvent.wheelDeltaX; }

			// modern wheel event handler
			if ('deltaY' in origEvent) {
				e.deltaY = origEvent.deltaY;
			}
			if ('deltaX' in origEvent) {
				e.deltaX = origEvent.deltaX;
			}

			// handle deltaMode for mouse wheel
			e.delta = e.deltaY || e.deltaX;
			if (origEvent.deltaMode === 1) {
				var lineHeight = 16;
				e.delta *= lineHeight;
				e.deltaY *= lineHeight;
				e.deltaX *= lineHeight;
			}

			return ($.event.dispatch || $.event.handle).call(this, e);
		};
	}());

	// extra module methods
	var moduleMixin = {
		// provide function for firing native events
		fireNativeEvent: function(elements, eventName) {
			$(elements).each(function() {
				var element = this, eventObject;
				if (element.dispatchEvent) {
					eventObject = document.createEvent('HTMLEvents');
					eventObject.initEvent(eventName, true, true);
					element.dispatchEvent(eventObject);
				} else if (document.createEventObject) {
					eventObject = document.createEventObject();
					eventObject.target = element;
					element.fireEvent('on' + eventName, eventObject);
				}
			});
		},
		// bind event handlers for module instance (functions beggining with "on")
		bindHandlers: function() {
			var self = this;
			$.each(self, function(propName, propValue) {
				if (propName.indexOf('on') === 0 && $.isFunction(propValue)) {
					// dont use $.proxy here because it doesn't create unique handler
					self[propName] = function() {
						return propValue.apply(self, arguments);
					};
				}
			});
		}
	};

	// public API
	var api = {
		version: version,
		modules: {},
		getOptions: function() {
			return $.extend({}, commonOptions);
		},
		setOptions: function(moduleName, moduleOptions) {
			if (arguments.length > 1) {
				// set module options
				if (this.modules[moduleName]) {
					$.extend(this.modules[moduleName].prototype.options, moduleOptions);
				}
			} else {
				// set common options
				$.extend(commonOptions, moduleName);
			}
		},
		addModule: function(proto) {
			// add module to list
			var Module = function(options) {
				// save instance to collection
				if (!options.element.data(commonOptions.dataKey)) {
					options.element.data(commonOptions.dataKey, this);
				}
				customInstances.push(this);

				// save options
				this.options = $.extend({}, commonOptions, this.options, getInlineOptions(options.element), options);

				// bind event handlers to instance
				this.bindHandlers();

				// call constructor
				this.init.apply(this, arguments);
			};

			// parse options from HTML attribute
			var getInlineOptions = function(element) {
				var dataOptions = element.data(commonOptions.optionsKey),
					attrOptions = element.attr(commonOptions.optionsKey);

				if (dataOptions) {
					return dataOptions;
				} else if (attrOptions) {
					try {
						return $.parseJSON(attrOptions);
					} catch (e) {
						// ignore invalid attributes
					}
				}
			};

			// set proto as prototype for new module
			Module.prototype = proto;

			// add mixin methods to module proto
			$.extend(proto, moduleMixin);
			if (proto.plugins) {
				$.each(proto.plugins, function(pluginName, plugin) {
					$.extend(plugin.prototype, moduleMixin);
				});
			}

			// override destroy method
			var originalDestroy = Module.prototype.destroy;
			Module.prototype.destroy = function() {
				this.options.element.removeData(this.options.dataKey);

				for (var i = customInstances.length - 1; i >= 0; i--) {
					if (customInstances[i] === this) {
						customInstances.splice(i, 1);
						break;
					}
				}

				if (originalDestroy) {
					originalDestroy.apply(this, arguments);
				}
			};

			// save module to list
			this.modules[proto.name] = Module;
		},
		getInstance: function(element) {
			return $(element).data(commonOptions.dataKey);
		},
		replace: function(elements, moduleName, customOptions) {
			var self = this,
				instance;

			if (!commonOptions.styleSheetCreated) {
				createStyleSheet();
			}

			$(elements).each(function() {
				var moduleOptions,
					element = $(this);

				instance = element.data(commonOptions.dataKey);
				if (instance) {
					instance.refresh();
				} else {
					if (!moduleName) {
						$.each(self.modules, function(currentModuleName, module) {
							if (module.prototype.matchElement.call(module.prototype, element)) {
								moduleName = currentModuleName;
								return false;
							}
						});
					}
					if (moduleName) {
						moduleOptions = $.extend({ element: element }, customOptions);
						instance = new self.modules[moduleName](moduleOptions);
					}
				}
			});
			return instance;
		},
		refresh: function(elements) {
			$(elements).each(function() {
				var instance = $(this).data(commonOptions.dataKey);
				if (instance) {
					instance.refresh();
				}
			});
		},
		destroy: function(elements) {
			$(elements).each(function() {
				var instance = $(this).data(commonOptions.dataKey);
				if (instance) {
					instance.destroy();
				}
			});
		},
		replaceAll: function(context) {
			var self = this;
			$.each(this.modules, function(moduleName, module) {
				$(module.prototype.selector, context).each(function() {
					if (this.className.indexOf('jcf-ignore') < 0) {
						self.replace(this, moduleName);
					}
				});
			});
		},
		refreshAll: function(context) {
			if (context) {
				$.each(this.modules, function(moduleName, module) {
					$(module.prototype.selector, context).each(function() {
						var instance = $(this).data(commonOptions.dataKey);
						if (instance) {
							instance.refresh();
						}
					});
				});
			} else {
				for (var i = customInstances.length - 1; i >= 0; i--) {
					customInstances[i].refresh();
				}
			}
		},
		destroyAll: function(context) {
			if (context) {
				$.each(this.modules, function(moduleName, module) {
					$(module.prototype.selector, context).each(function(index, element) {
						var instance = $(element).data(commonOptions.dataKey);
						if (instance) {
							instance.destroy();
						}
					});
				});
			} else {
				while (customInstances.length) {
					customInstances[0].destroy();
				}
			}
		}
	};

	// always export API to the global window object
	window.jcf = api;

	return api;
}));

/*!
 * JavaScript Custom Forms : File Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
;(function($) {
	'use strict';

	jcf.addModule({
		name: 'File',
		selector: 'input[type="file"]',
		options: {
			fakeStructure: '<span class="jcf-file"><span class="jcf-fake-input"></span><span class="jcf-upload-button"><span class="jcf-button-content"></span></span></span>',
			buttonText: 'Choose file',
			placeholderText: 'No file chosen',
			realElementClass: 'jcf-real-element',
			extensionPrefixClass: 'jcf-extension-',
			selectedFileBlock: '.jcf-fake-input',
			buttonTextBlock: '.jcf-button-content'
		},
		matchElement: function(element) {
			return element.is('input[type="file"]');
		},
		init: function() {
			this.initStructure();
			this.attachEvents();
			this.refresh();
		},
		initStructure: function() {
			this.doc = $(document);
			this.realElement = $(this.options.element).addClass(this.options.realElementClass);
			this.fakeElement = $(this.options.fakeStructure).insertBefore(this.realElement);
			this.fileNameBlock = this.fakeElement.find(this.options.selectedFileBlock);
			this.buttonTextBlock = this.fakeElement.find(this.options.buttonTextBlock).text(this.options.buttonText);

			this.realElement.appendTo(this.fakeElement).css({
				position: 'absolute',
				opacity: 0
			});
		},
		attachEvents: function() {
			this.realElement.on({
				'jcf-pointerdown': this.onPress,
				change: this.onChange,
				focus: this.onFocus
			});
		},
		onChange: function() {
			this.refresh();
		},
		onFocus: function() {
			this.fakeElement.addClass(this.options.focusClass);
			this.realElement.on('blur', this.onBlur);
		},
		onBlur: function() {
			this.fakeElement.removeClass(this.options.focusClass);
			this.realElement.off('blur', this.onBlur);
		},
		onPress: function() {
			this.fakeElement.addClass(this.options.pressedClass);
			this.doc.on('jcf-pointerup', this.onRelease);
		},
		onRelease: function() {
			this.fakeElement.removeClass(this.options.pressedClass);
			this.doc.off('jcf-pointerup', this.onRelease);
		},
		getFileName: function() {
			var resultFileName = '',
				files = this.realElement.prop('files');

			if (files && files.length) {
				$.each(files, function(index, file) {
					resultFileName += (index > 0 ? ', ' : '') + file.name;
				});
			} else {
				resultFileName = this.realElement.val().replace(/^[\s\S]*(?:\\|\/)([\s\S^\\\/]*)$/g, '$1');
			}

			return resultFileName;
		},
		getFileExtension: function() {
			var fileName = this.realElement.val();
			return fileName.lastIndexOf('.') < 0 ? '' : fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
		},
		updateExtensionClass: function() {
			var currentExtension = this.getFileExtension(),
				currentClassList = this.fakeElement.prop('className'),
				cleanedClassList = currentClassList.replace(new RegExp('(\\s|^)' + this.options.extensionPrefixClass + '[^ ]+','gi'), '');

			this.fakeElement.prop('className', cleanedClassList);
			if (currentExtension) {
				this.fakeElement.addClass(this.options.extensionPrefixClass + currentExtension);
			}
		},
		refresh: function() {
			var selectedFileName = this.getFileName() || this.options.placeholderText;
			this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(':disabled'));
			this.fileNameBlock.text(selectedFileName);
			this.updateExtensionClass();
		},
		destroy: function() {
			// reset styles and restore element position
			this.realElement.insertBefore(this.fakeElement).removeClass(this.options.realElementClass).css({
				position: '',
				opacity: ''
			});
			this.fakeElement.remove();

			// remove event handlers
			this.realElement.off({
				'jcf-pointerdown': this.onPress,
				change: this.onChange,
				focus: this.onFocus,
				blur: this.onBlur
			});
			this.doc.off('jcf-pointerup', this.onRelease);
		}
	});

}(jQuery));


/*
 * Image Stretch module
 */
var ImageStretcher = {
	getDimensions: function(data) {
		// calculate element coords to fit in mask
		var ratio = data.imageRatio || (data.imageWidth / data.imageHeight),
			slideWidth = data.maskWidth,
			slideHeight = slideWidth / ratio;

		if(slideHeight < data.maskHeight) {
			slideHeight = data.maskHeight;
			slideWidth = slideHeight * ratio;
		}
		return {
			width: slideWidth,
			height: slideHeight,
			//top: (data.maskHeight - slideHeight) / 2,
			left: (data.maskWidth - slideWidth) / 2
		};
	},
	getRatio: function(image) {
		if(image.prop('naturalWidth')) {
			return image.prop('naturalWidth') / image.prop('naturalHeight');
		} else {
			var img = new Image();
			img.src = image.prop('src');
			return img.width / img.height;
		}
	},
	imageLoaded: function(image, callback) {
		var self = this;
		var loadHandler = function() {
			callback.call(self);
		};
		if(image.prop('complete')) {
			loadHandler();
		} else {
			image.one('load', loadHandler);
		}
	},
	resizeHandler: function() {
		var self = this;
		jQuery.each(this.imgList, function(index, item) {
			if(item.image.prop('complete')) {
				self.resizeImage(item.image, item.container);
			}
		});
	},
	resizeImage: function(image, container) {
		this.imageLoaded(image, function() {
			var styles = this.getDimensions({
				imageRatio: this.getRatio(image),
				maskWidth: container.width(),
				maskHeight: container.height()
			});
			image.css({
				width: styles.width,
				height: styles.height,
				marginTop: styles.top,
				marginLeft: styles.left
			});
		});
	},
	add: function(options) {
		var container = jQuery(options.container ? options.container : window),
			image = typeof options.image === 'string' ? container.find(options.image) : jQuery(options.image);

		// resize image
		this.resizeImage(image, container);

		// add resize handler once if needed
		if(!this.win) {
			this.resizeHandler = jQuery.proxy(this.resizeHandler, this);
			this.imgList = [];
			this.win = jQuery(window);
			this.win.on('resize orientationchange', this.resizeHandler);
		}

		// store item in collection
		this.imgList.push({
			container: container,
			image: image
		});
	}
};

// autocomplete plugin
;(function($,window){
	// jquery plugin interface
	$.fn.autoCompleteForm = function(opt) {
		opt = $.extend({
			startCount: 1,
			dataAttr: 'q',
			ajaxAttr: 'ajax=1',
			listItems: 'li',
			listItemsFillsInput:true,
			alwaysRefresh: false,
			filterResults: true,
			highlightMatches: false,
			selectedClass: 'selected-line',
			resultsHolder: '.ajax-holder',
			inputField: 'input.text-input',
			hideDelay: 200
		}, opt);
		return this.each(function(){
			var form = $(this);
			var target = form.attr('action');
			var input = form.find(opt.inputField).attr('autocomplete','off');
			var ajaxHolder = form.find(opt.resultsHolder).hide();
			var acXHR, listItems, lastData, inFocus, focusTimer, visibleItems, visibleCount, currentIndex = 0;
			if(opt.filterResults) opt.alwaysRefresh = false;
			
			// load autocomplete data
			function loadData(callback) {
				// abort previous request if not completed
				if(acXHR && typeof acXHR.abort === 'function') {
					acXHR.abort(); 
				}
				
				// start new request
				acXHR = $.ajax({
					url: target,
					dataType: 'text',
					data: opt.ajaxAttr + '&' + opt.dataAttr + '=' + input.val(),
					success: function(msg) {
						// updating results
						updateDrop(msg);
						filterData();
						showDrop();
					},
					error: function() {
						// ajax error handling
						if(typeof opt.onerror === 'function') {
							opt.onerror.apply(this,arguments);
						}
					}
				})
			}
			
			// filter loaded data
			function filterData() {
				if(listItems) {
					showDrop();
				
					// show only items containing input text
					if(opt.filterResults) {
						listItems.show().each(function(){
							var item = $(this);
							item.html(item.data('orightml'));
							if(item.text().toLowerCase().indexOf(input.val().toLowerCase()) != -1) {
								item.show();
							}
							else {
								item.hide();
							}
						});
						if(!listItems.filter(':visible').length) {
							hideDrop();
						}
					}
					
					// highlight matches
					if(opt.highlightMatches) {
						listItems.find('span').each(function(i,obj){
							if(input.val().length >= opt.startCount) {
								jQuery(obj).html(highlightWords(jQuery(obj).text(), input.val()));
							}
						});
					}
				}
			}
			
			// update dropdown content
			function updateDrop(text) {
				if(lastData != text) {
					lastData = text;
					currentIndex = -1;
					ajaxHolder.html(text);
					listItems = ajaxHolder.find(opt.listItems);
					listItems.each(function(){
						// save original html data
						var curItem = $(this);
						curItem.data('orightml',curItem.html());
						
						// element click behavior
						curItem.click(function(){
							return selectItem(curItem, true);
						});
						
						// element hover behavior
						curItem.hover(function(){
							listItems.removeClass(opt.selectedClass);
							curItem.addClass(opt.selectedClass);
							currentIndex = listItems.filter(':visible').index(curItem);
						});
					});
					
				}
			}
			
			// toggle autocomplete dropdown
			function showDrop() {
				if(input.val().length >= opt.startCount) {
					ajaxHolder.show();
					if(!listItems.filter(':visible').length) hideDrop();
				} else {
					ajaxHolder.hide();
				}
			}
			function hideDrop() {
				ajaxHolder.hide();
			}
			function selectItem(obj, realEvent) {
				hideDrop();
				if(opt.listItemsFillsInput) {
					input.val(obj.find('span').text()).focus();
					return false;
				} else {
					// example redirect
					if(!realEvent) {
						window.location.href = obj.find('a:eq(0)').attr('href');
					}
				}
			}
			
			
			// event handlers
			input.keyup(function(e){
				// skip system keys
				if (e.keyCode == 27 || e.keyCode == 13 || e.keyCode == 38 || e.keyCode == 40) return;
				
				// load data
				if(input.val().length < opt.startCount) hideDrop();
				if(opt.alwaysRefresh) {
					loadData();
				} else {
					if(!listItems) {
						loadData();
					}
					filterData();
				}
			}).keydown(function(e){
				if(listItems) {
					visibleItems = listItems.filter(':visible');
					visibleCount = visibleItems.length;
					switch(e.keyCode) {
						case 13:
							selectItem(visibleItems.eq(currentIndex));
							break;
						case 27: 
							hideDrop();
							break;
						case 38:
							if(currentIndex >= 0) currentIndex--;
							break;
						case 40:
							if(currentIndex < visibleCount - 1) currentIndex++;
							break;
					}
					
					// update classes
					listItems.removeClass(opt.selectedClass);
					if(currentIndex != -1) {
						visibleItems.eq(currentIndex).addClass(opt.selectedClass);
					}
				}
			}).focus(function(){
				clearTimeout(focusTimer);
				inFocus = true;
			}).blur(function(){
				inFocus = false;
				focusTimer = setTimeout(hideDrop, opt.hideDelay);
			});
			form.submit(function(){
				return false;
			});
		});
	}

	// regexp highlight function
	function escapeRegExp(str) {
		return str.replace(new RegExp("[.*+?|()\\[\\]{}\\\\]", "g"), "\\$&");
	}
	function highlightWords(str, word) {
		var regex = new RegExp("(" + escapeRegExp(word) + ")", "gi");
		return str.replace(regex, "<strong>$1</strong>");
	}
}(jQuery, this));

/*! Hammer.JS - v2.0.4 - 2014-09-28
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder;
 * Licensed under the MIT license */
if(Object.create){!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(k(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a}function i(a,b){return h(a,b,!0)}function j(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&h(d,c)}function k(a,b){return function(){return a.apply(b,arguments)}}function l(a,b){return typeof a==kb?a.apply(b?b[0]||d:d,b):a}function m(a,b){return a===d?b:a}function n(a,b,c){g(r(b),function(b){a.addEventListener(b,c,!1)})}function o(a,b,c){g(r(b),function(b){a.removeEventListener(b,c,!1)})}function p(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function q(a,b){return a.indexOf(b)>-1}function r(a){return a.trim().split(/\s+/g)}function s(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function t(a){return Array.prototype.slice.call(a,0)}function u(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];s(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function v(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ib.length;){if(c=ib[g],e=c?c+f:b,e in a)return e;g++}return d}function w(){return ob++}function x(a){var b=a.ownerDocument;return b.defaultView||b.parentWindow}function y(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){l(a.options.enable,[a])&&c.handler(b)},this.init()}function z(a){var b,c=a.options.inputClass;return new(b=c?c:rb?N:sb?Q:qb?S:M)(a,A)}function A(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&yb&&d-e===0,g=b&(Ab|Bb)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,B(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function B(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=E(b)),e>1&&!c.firstMultiple?c.firstMultiple=E(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=F(d);b.timeStamp=nb(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=J(h,i),b.distance=I(h,i),C(c,b),b.offsetDirection=H(b.deltaX,b.deltaY),b.scale=g?L(g.pointers,d):1,b.rotation=g?K(g.pointers,d):0,D(c,b);var j=a.element;p(b.srcEvent.target,j)&&(j=b.srcEvent.target),b.target=j}function C(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};(b.eventType===yb||f.eventType===Ab)&&(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function D(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Bb&&(i>xb||h.velocity===d)){var j=h.deltaX-b.deltaX,k=h.deltaY-b.deltaY,l=G(i,j,k);e=l.x,f=l.y,c=mb(l.x)>mb(l.y)?l.x:l.y,g=H(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function E(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:lb(a.pointers[c].clientX),clientY:lb(a.pointers[c].clientY)},c++;return{timeStamp:nb(),pointers:b,center:F(b),deltaX:a.deltaX,deltaY:a.deltaY}}function F(a){var b=a.length;if(1===b)return{x:lb(a[0].clientX),y:lb(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:lb(c/b),y:lb(d/b)}}function G(a,b,c){return{x:b/a||0,y:c/a||0}}function H(a,b){return a===b?Cb:mb(a)>=mb(b)?a>0?Db:Eb:b>0?Fb:Gb}function I(a,b,c){c||(c=Kb);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function J(a,b,c){c||(c=Kb);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function K(a,b){return J(b[1],b[0],Lb)-J(a[1],a[0],Lb)}function L(a,b){return I(b[0],b[1],Lb)/I(a[0],a[1],Lb)}function M(){this.evEl=Nb,this.evWin=Ob,this.allow=!0,this.pressed=!1,y.apply(this,arguments)}function N(){this.evEl=Rb,this.evWin=Sb,y.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function O(){this.evTarget=Ub,this.evWin=Vb,this.started=!1,y.apply(this,arguments)}function P(a,b){var c=t(a.touches),d=t(a.changedTouches);return b&(Ab|Bb)&&(c=u(c.concat(d),"identifier",!0)),[c,d]}function Q(){this.evTarget=Xb,this.targetIds={},y.apply(this,arguments)}function R(a,b){var c=t(a.touches),d=this.targetIds;if(b&(yb|zb)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=t(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return p(a.target,i)}),b===yb)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ab|Bb)&&delete d[g[e].identifier],e++;return h.length?[u(f.concat(h),"identifier",!0),h]:void 0}function S(){y.apply(this,arguments);var a=k(this.handler,this);this.touch=new Q(this.manager,a),this.mouse=new M(this.manager,a)}function T(a,b){this.manager=a,this.set(b)}function U(a){if(q(a,bc))return bc;var b=q(a,cc),c=q(a,dc);return b&&c?cc+" "+dc:b||c?b?cc:dc:q(a,ac)?ac:_b}function V(a){this.id=w(),this.manager=null,this.options=i(a||{},this.defaults),this.options.enable=m(this.options.enable,!0),this.state=ec,this.simultaneous={},this.requireFail=[]}function W(a){return a&jc?"cancel":a&hc?"end":a&gc?"move":a&fc?"start":""}function X(a){return a==Gb?"down":a==Fb?"up":a==Db?"left":a==Eb?"right":""}function Y(a,b){var c=b.manager;return c?c.get(a):a}function Z(){V.apply(this,arguments)}function $(){Z.apply(this,arguments),this.pX=null,this.pY=null}function _(){Z.apply(this,arguments)}function ab(){V.apply(this,arguments),this._timer=null,this._input=null}function bb(){Z.apply(this,arguments)}function cb(){Z.apply(this,arguments)}function db(){V.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function eb(a,b){return b=b||{},b.recognizers=m(b.recognizers,eb.defaults.preset),new fb(a,b)}function fb(a,b){b=b||{},this.options=i(b,eb.defaults),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.element=a,this.input=z(this),this.touchAction=new T(this,this.options.touchAction),gb(this,!0),g(b.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function gb(a,b){var c=a.element;g(a.options.cssProps,function(a,d){c.style[v(c.style,d)]=b?a:""})}function hb(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var ib=["","webkit","moz","MS","ms","o"],jb=b.createElement("div"),kb="function",lb=Math.round,mb=Math.abs,nb=Date.now,ob=1,pb=/mobile|tablet|ip(ad|hone|od)|android/i,qb="ontouchstart"in a,rb=v(a,"PointerEvent")!==d,sb=qb&&pb.test(navigator.userAgent),tb="touch",ub="pen",vb="mouse",wb="kinect",xb=25,yb=1,zb=2,Ab=4,Bb=8,Cb=1,Db=2,Eb=4,Fb=8,Gb=16,Hb=Db|Eb,Ib=Fb|Gb,Jb=Hb|Ib,Kb=["x","y"],Lb=["clientX","clientY"];y.prototype={handler:function(){},init:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(x(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&o(this.element,this.evEl,this.domHandler),this.evTarget&&o(this.target,this.evTarget,this.domHandler),this.evWin&&o(x(this.element),this.evWin,this.domHandler)}};var Mb={mousedown:yb,mousemove:zb,mouseup:Ab},Nb="mousedown",Ob="mousemove mouseup";j(M,y,{handler:function(a){var b=Mb[a.type];b&yb&&0===a.button&&(this.pressed=!0),b&zb&&1!==a.which&&(b=Ab),this.pressed&&this.allow&&(b&Ab&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:vb,srcEvent:a}))}});var Pb={pointerdown:yb,pointermove:zb,pointerup:Ab,pointercancel:Bb,pointerout:Bb},Qb={2:tb,3:ub,4:vb,5:wb},Rb="pointerdown",Sb="pointermove pointerup pointercancel";a.MSPointerEvent&&(Rb="MSPointerDown",Sb="MSPointerMove MSPointerUp MSPointerCancel"),j(N,y,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Pb[d],f=Qb[a.pointerType]||a.pointerType,g=f==tb,h=s(b,a.pointerId,"pointerId");e&yb&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ab|Bb)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Tb={touchstart:yb,touchmove:zb,touchend:Ab,touchcancel:Bb},Ub="touchstart",Vb="touchstart touchmove touchend touchcancel";j(O,y,{handler:function(a){var b=Tb[a.type];if(b===yb&&(this.started=!0),this.started){var c=P.call(this,a,b);b&(Ab|Bb)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:tb,srcEvent:a})}}});var Wb={touchstart:yb,touchmove:zb,touchend:Ab,touchcancel:Bb},Xb="touchstart touchmove touchend touchcancel";j(Q,y,{handler:function(a){var b=Wb[a.type],c=R.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:tb,srcEvent:a})}}),j(S,y,{handler:function(a,b,c){var d=c.pointerType==tb,e=c.pointerType==vb;if(d)this.mouse.allow=!1;else if(e&&!this.mouse.allow)return;b&(Ab|Bb)&&(this.mouse.allow=!0),this.callback(a,b,c)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Yb=v(jb.style,"touchAction"),Zb=Yb!==d,$b="compute",_b="auto",ac="manipulation",bc="none",cc="pan-x",dc="pan-y";T.prototype={set:function(a){a==$b&&(a=this.compute()),Zb&&(this.manager.element.style[Yb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){l(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),U(a.join(" "))},preventDefaults:function(a){if(!Zb){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=q(d,bc),f=q(d,dc),g=q(d,cc);return e||f&&c&Hb||g&&c&Ib?this.preventSrc(b):void 0}},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var ec=1,fc=2,gc=4,hc=8,ic=hc,jc=16,kc=32;V.prototype={defaults:{},set:function(a){return h(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=Y(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=Y(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=Y(a,this),-1===s(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=Y(a,this);var b=s(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(c.options.event+(b?W(d):""),a)}var c=this,d=this.state;hc>d&&b(!0),b(),d>=hc&&b(!0)},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=kc)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(kc|ec)))return!1;a++}return!0},recognize:function(a){var b=h({},a);return l(this.options.enable,[this,b])?(this.state&(ic|jc|kc)&&(this.state=ec),this.state=this.process(b),void(this.state&(fc|gc|hc|jc)&&this.tryEmit(b))):(this.reset(),void(this.state=kc))},process:function(){},getTouchAction:function(){},reset:function(){}},j(Z,V,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(fc|gc),e=this.attrTest(a);return d&&(c&Bb||!e)?b|jc:d||e?c&Ab?b|hc:b&fc?b|gc:fc:kc}}),j($,Z,{defaults:{event:"pan",threshold:10,pointers:1,direction:Jb},getTouchAction:function(){var a=this.options.direction,b=[];return a&Hb&&b.push(dc),a&Ib&&b.push(cc),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Hb?(e=0===f?Cb:0>f?Db:Eb,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Cb:0>g?Fb:Gb,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return Z.prototype.attrTest.call(this,a)&&(this.state&fc||!(this.state&fc)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this._super.emit.call(this,a)}}),j(_,Z,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[bc]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&fc)},emit:function(a){if(this._super.emit.call(this,a),1!==a.scale){var b=a.scale<1?"in":"out";this.manager.emit(this.options.event+b,a)}}}),j(ab,V,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[_b]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ab|Bb)&&!f)this.reset();else if(a.eventType&yb)this.reset(),this._timer=e(function(){this.state=ic,this.tryEmit()},b.time,this);else if(a.eventType&Ab)return ic;return kc},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===ic&&(a&&a.eventType&Ab?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=nb(),this.manager.emit(this.options.event,this._input)))}}),j(bb,Z,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[bc]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&fc)}}),j(cb,Z,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:Hb|Ib,pointers:1},getTouchAction:function(){return $.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Hb|Ib)?b=a.velocity:c&Hb?b=a.velocityX:c&Ib&&(b=a.velocityY),this._super.attrTest.call(this,a)&&c&a.direction&&a.distance>this.options.threshold&&mb(b)>this.options.velocity&&a.eventType&Ab},emit:function(a){var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),j(db,V,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[ac]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&yb&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ab)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||I(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=ic,this.tryEmit()},b.interval,this),fc):ic}return kc},failTimeout:function(){return this._timer=e(function(){this.state=kc},this.options.interval,this),kc},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==ic&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),eb.VERSION="2.0.4",eb.defaults={domEvents:!1,touchAction:$b,enable:!0,inputTarget:null,inputClass:null,preset:[[bb,{enable:!1}],[_,{enable:!1},["rotate"]],[cb,{direction:Hb}],[$,{direction:Hb},["swipe"]],[db],[db,{event:"doubletap",taps:2},["tap"]],[ab]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var lc=1,mc=2;fb.prototype={set:function(a){return h(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?mc:lc},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&ic)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===mc||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(fc|gc|hc)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof V)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;var b=this.recognizers;return a=this.get(a),b.splice(s(b,a),1),this.touchAction.update(),this},on:function(a,b){var c=this.handlers;return g(r(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this},off:function(a,b){var c=this.handlers;return g(r(a),function(a){b?c[a].splice(s(c[a],b),1):delete c[a]}),this},emit:function(a,b){this.options.domEvents&&hb(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&gb(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},h(eb,{INPUT_START:yb,INPUT_MOVE:zb,INPUT_END:Ab,INPUT_CANCEL:Bb,STATE_POSSIBLE:ec,STATE_BEGAN:fc,STATE_CHANGED:gc,STATE_ENDED:hc,STATE_RECOGNIZED:ic,STATE_CANCELLED:jc,STATE_FAILED:kc,DIRECTION_NONE:Cb,DIRECTION_LEFT:Db,DIRECTION_RIGHT:Eb,DIRECTION_UP:Fb,DIRECTION_DOWN:Gb,DIRECTION_HORIZONTAL:Hb,DIRECTION_VERTICAL:Ib,DIRECTION_ALL:Jb,Manager:fb,Input:y,TouchAction:T,TouchInput:Q,MouseInput:M,PointerEventInput:N,TouchMouseInput:S,SingleTouchInput:O,Recognizer:V,AttrRecognizer:Z,Tap:db,Pan:$,Swipe:cb,Pinch:_,Rotate:bb,Press:ab,on:n,off:o,each:g,merge:i,extend:h,inherit:j,bindFn:k,prefixed:v}),typeof define==kb&&define.amd?define(function(){return eb}):"undefined"!=typeof module&&module.exports?module.exports=eb:a[c]=eb}(window,document,"Hammer");}

/*! fancyBox v2.1.5 fancyapps.com | fancyapps.com/fancybox/#license */
;(function(r,G,f,v){var J=f("html"),n=f(r),p=f(G),b=f.fancybox=function(){b.open.apply(this,arguments)},I=navigator.userAgent.match(/msie/i),B=null,s=G.createTouch!==v,t=function(a){return a&&a.hasOwnProperty&&a instanceof f},q=function(a){return a&&"string"===f.type(a)},E=function(a){return q(a)&&0<a.indexOf("%")},l=function(a,d){var e=parseInt(a,10)||0;d&&E(a)&&(e*=b.getViewport()[d]/100);return Math.ceil(e)},w=function(a,b){return l(a,b)+"px"};f.extend(b,{version:"2.1.5",defaults:{padding:15,margin:20,width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,pixelRatio:1,autoSize:!0,autoHeight:!1,autoWidth:!1,autoResize:!0,autoCenter:!s,fitToView:!0,aspectRatio:!1,topRatio:0.5,leftRatio:0.5,scrolling:"auto",wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3E3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},iframe:{scrolling:"auto",preload:!0},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},keys:{next:{13:"left",34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:!0,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+(I?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:!0,openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:!0,title:!0},onCancel:f.noop,beforeLoad:f.noop,afterLoad:f.noop,beforeShow:f.noop,afterShow:f.noop,beforeChange:f.noop,beforeClose:f.noop,afterClose:f.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:!1,isOpen:!1,isOpened:!1,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(a,d){if(a&&(f.isPlainObject(d)||(d={}),!1!==b.close(!0)))return f.isArray(a)||(a=t(a)?f(a).get():[a]),f.each(a,function(e,c){var k={},g,h,j,m,l;"object"===f.type(c)&&(c.nodeType&&(c=f(c)),t(c)?(k={href:c.data("fancybox-href")||c.attr("href"),title:c.data("fancybox-title")||c.attr("title"),isDom:!0,element:c},f.metadata&&f.extend(!0,k,c.metadata())):k=c);g=d.href||k.href||(q(c)?c:null);h=d.title!==v?d.title:k.title||"";m=(j=d.content||k.content)?"html":d.type||k.type;!m&&k.isDom&&(m=c.data("fancybox-type"),m||(m=(m=c.prop("class").match(/fancybox\.(\w+)/))?m[1]:null));q(g)&&(m||(b.isImage(g)?m="image":b.isSWF(g)?m="swf":"#"===g.charAt(0)?m="inline":q(c)&&(m="html",j=c)),"ajax"===m&&(l=g.split(/\s+/,2),g=l.shift(),l=l.shift()));j||("inline"===m?g?j=f(q(g)?g.replace(/.*(?=#[^\s]+$)/,""):g):k.isDom&&(j=c):"html"===m?j=g:!m&&(!g&&k.isDom)&&(m="inline",j=c));f.extend(k,{href:g,type:m,content:j,title:h,selector:l});a[e]=k}),b.opts=f.extend(!0,{},b.defaults,d),d.keys!==v&&(b.opts.keys=d.keys?f.extend({},b.defaults.keys,d.keys):!1),b.group=a,b._start(b.opts.index)},cancel:function(){var a=b.coming;a&&!1!==b.trigger("onCancel")&&(b.hideLoading(),b.ajaxLoad&&b.ajaxLoad.abort(),b.ajaxLoad=null,b.imgPreload&&(b.imgPreload.onload=b.imgPreload.onerror=null),a.wrap&&a.wrap.stop(!0,!0).trigger("onReset").remove(),b.coming=null,b.current||b._afterZoomOut(a))},close:function(a){b.cancel();!1!==b.trigger("beforeClose")&&(b.unbindEvents(),b.isActive&&(!b.isOpen||!0===a?(f(".fancybox-wrap").stop(!0).trigger("onReset").remove(),b._afterZoomOut()):(b.isOpen=b.isOpened=!1,b.isClosing=!0,f(".fancybox-item, .fancybox-nav").remove(),b.wrap.stop(!0,!0).removeClass("fancybox-opened"),b.transitions[b.current.closeMethod]())))},play:function(a){var d=function(){clearTimeout(b.player.timer)},e=function(){d();b.current&&b.player.isActive&&(b.player.timer=setTimeout(b.next,b.current.playSpeed))},c=function(){d();p.unbind(".player");b.player.isActive=!1;b.trigger("onPlayEnd")};if(!0===a||!b.player.isActive&&!1!==a){if(b.current&&(b.current.loop||b.current.index<b.group.length-1))b.player.isActive=!0,p.bind({"onCancel.player beforeClose.player":c,"onUpdate.player":e,"beforeLoad.player":d}),e(),b.trigger("onPlayStart")}else c()},next:function(a){var d=b.current;d&&(q(a)||(a=d.direction.next),b.jumpto(d.index+1,a,"next"))},prev:function(a){var d=b.current;d&&(q(a)||(a=d.direction.prev),b.jumpto(d.index-1,a,"prev"))},jumpto:function(a,d,e){var c=b.current;c&&(a=l(a),b.direction=d||c.direction[a>=c.index?"next":"prev"],b.router=e||"jumpto",c.loop&&(0>a&&(a=c.group.length+a%c.group.length),a%=c.group.length),c.group[a]!==v&&(b.cancel(),b._start(a)))},reposition:function(a,d){var e=b.current,c=e?e.wrap:null,k;c&&(k=b._getPosition(d),a&&"scroll"===a.type?(delete k.position,c.stop(!0,!0).animate(k,200)):(c.css(k),e.pos=f.extend({},e.dim,k)))},update:function(a){var d=a&&a.type,e=!d||"orientationchange"===d;e&&(clearTimeout(B),B=null);b.isOpen&&!B&&(B=setTimeout(function(){var c=b.current;c&&!b.isClosing&&(b.wrap.removeClass("fancybox-tmp"),(e||"load"===d||"resize"===d&&c.autoResize)&&b._setDimension(),"scroll"===d&&c.canShrink||b.reposition(a),b.trigger("onUpdate"),B=null)},e&&!s?0:300))},toggle:function(a){b.isOpen&&(b.current.fitToView="boolean"===f.type(a)?a:!b.current.fitToView,s&&(b.wrap.removeAttr("style").addClass("fancybox-tmp"),b.trigger("onUpdate")),b.update())},hideLoading:function(){p.unbind(".loading");f("#fancybox-loading").remove()},showLoading:function(){var a,d;b.hideLoading();a=f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body");p.bind("keydown.loading",function(a){if(27===(a.which||a.keyCode))a.preventDefault(),b.cancel()});b.defaults.fixed||(d=b.getViewport(),a.css({position:"absolute",top:0.5*d.h+d.y,left:0.5*d.w+d.x}))},getViewport:function(){var a=b.current&&b.current.locked||!1,d={x:n.scrollLeft(),y:n.scrollTop()};a?(d.w=a[0].clientWidth,d.h=a[0].clientHeight):(d.w=s&&r.innerWidth?r.innerWidth:n.width(),d.h=s&&r.innerHeight?r.innerHeight:n.height());return d},unbindEvents:function(){b.wrap&&t(b.wrap)&&b.wrap.unbind(".fb");p.unbind(".fb");n.unbind(".fb")},bindEvents:function(){var a=b.current,d;a&&(n.bind("orientationchange.fb"+(s?"":" resize.fb")+(a.autoCenter&&!a.locked?" scroll.fb":""),b.update),(d=a.keys)&&p.bind("keydown.fb",function(e){var c=e.which||e.keyCode,k=e.target||e.srcElement;if(27===c&&b.coming)return!1;!e.ctrlKey&&(!e.altKey&&!e.shiftKey&&!e.metaKey&&(!k||!k.type&&!f(k).is("[contenteditable]")))&&f.each(d,function(d,k){if(1<a.group.length&&k[c]!==v)return b[d](k[c]),e.preventDefault(),!1;if(-1<f.inArray(c,k))return b[d](),e.preventDefault(),!1})}),f.fn.mousewheel&&a.mouseWheel&&b.wrap.bind("mousewheel.fb",function(d,c,k,g){for(var h=f(d.target||null),j=!1;h.length&&!j&&!h.is(".fancybox-skin")&&!h.is(".fancybox-wrap");)j=h[0]&&!(h[0].style.overflow&&"hidden"===h[0].style.overflow)&&(h[0].clientWidth&&h[0].scrollWidth>h[0].clientWidth||h[0].clientHeight&&h[0].scrollHeight>h[0].clientHeight),h=f(h).parent();if(0!==c&&!j&&1<b.group.length&&!a.canShrink){if(0<g||0<k)b.prev(0<g?"down":"left");else if(0>g||0>k)b.next(0>g?"up":"right");d.preventDefault()}}))},trigger:function(a,d){var e,c=d||b.coming||b.current;if(c){f.isFunction(c[a])&&(e=c[a].apply(c,Array.prototype.slice.call(arguments,1)));if(!1===e)return!1;c.helpers&&f.each(c.helpers,function(d,e){if(e&&b.helpers[d]&&f.isFunction(b.helpers[d][a]))b.helpers[d][a](f.extend(!0,{},b.helpers[d].defaults,e),c)});p.trigger(a)}},isImage:function(a){return q(a)&&a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)},isSWF:function(a){return q(a)&&a.match(/\.(swf)((\?|#).*)?$/i)},_start:function(a){var d={},e,c;a=l(a);e=b.group[a]||null;if(!e)return!1;d=f.extend(!0,{},b.opts,e);e=d.margin;c=d.padding;"number"===f.type(e)&&(d.margin=[e,e,e,e]);"number"===f.type(c)&&(d.padding=[c,c,c,c]);d.modal&&f.extend(!0,d,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,mouseWheel:!1,keys:null,helpers:{overlay:{closeClick:!1}}});d.autoSize&&(d.autoWidth=d.autoHeight=!0);"auto"===d.width&&(d.autoWidth=!0);"auto"===d.height&&(d.autoHeight=!0);d.group=b.group;d.index=a;b.coming=d;if(!1===b.trigger("beforeLoad"))b.coming=null;else{c=d.type;e=d.href;if(!c)return b.coming=null,b.current&&b.router&&"jumpto"!==b.router?(b.current.index=a,b[b.router](b.direction)):!1;b.isActive=!0;if("image"===c||"swf"===c)d.autoHeight=d.autoWidth=!1,d.scrolling="visible";"image"===c&&(d.aspectRatio=!0);"iframe"===c&&s&&(d.scrolling="scroll");d.wrap=f(d.tpl.wrap).addClass("fancybox-"+(s?"mobile":"desktop")+" fancybox-type-"+c+" fancybox-tmp "+d.wrapCSS).appendTo(d.parent||"body");f.extend(d,{skin:f(".fancybox-skin",d.wrap),outer:f(".fancybox-outer",d.wrap),inner:f(".fancybox-inner",d.wrap)});f.each(["Top","Right","Bottom","Left"],function(a,b){d.skin.css("padding"+b,w(d.padding[a]))});b.trigger("onReady");if("inline"===c||"html"===c){if(!d.content||!d.content.length)return b._error("content")}else if(!e)return b._error("href");"image"===c?b._loadImage():"ajax"===c?b._loadAjax():"iframe"===c?b._loadIframe():b._afterLoad()}},_error:function(a){f.extend(b.coming,{type:"html",autoWidth:!0,autoHeight:!0,minWidth:0,minHeight:0,scrolling:"no",hasError:a,content:b.coming.tpl.error});b._afterLoad()},_loadImage:function(){var a=b.imgPreload=new Image;a.onload=function(){this.onload=this.onerror=null;b.coming.width=this.width/b.opts.pixelRatio;b.coming.height=this.height/b.opts.pixelRatio;b._afterLoad()};a.onerror=function(){this.onload=this.onerror=null;b._error("image")};a.src=b.coming.href;!0!==a.complete&&b.showLoading()},_loadAjax:function(){var a=b.coming;b.showLoading();b.ajaxLoad=f.ajax(f.extend({},a.ajax,{url:a.href,error:function(a,e){b.coming&&"abort"!==e?b._error("ajax",a):b.hideLoading()},success:function(d,e){"success"===e&&(a.content=d,b._afterLoad())}}))},_loadIframe:function(){var a=b.coming,d=f(a.tpl.iframe.replace(/\{rnd\}/g,(new Date).getTime())).attr("scrolling",s?"auto":a.iframe.scrolling).attr("src",a.href);f(a.wrap).bind("onReset",function(){try{f(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(a){}});a.iframe.preload&&(b.showLoading(),d.one("load",function(){f(this).data("ready",1);s||f(this).bind("load.fb",b.update);f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();b._afterLoad()}));a.content=d.appendTo(a.inner);a.iframe.preload||b._afterLoad()},_preloadImages:function(){var a=b.group,d=b.current,e=a.length,c=d.preload?Math.min(d.preload,e-1):0,f,g;for(g=1;g<=c;g+=1)f=a[(d.index+g)%e],"image"===f.type&&f.href&&((new Image).src=f.href)},_afterLoad:function(){var a=b.coming,d=b.current,e,c,k,g,h;b.hideLoading();if(a&&!1!==b.isActive)if(!1===b.trigger("afterLoad",a,d))a.wrap.stop(!0).trigger("onReset").remove(),b.coming=null;else{d&&(b.trigger("beforeChange",d),d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove());b.unbindEvents();e=a.content;c=a.type;k=a.scrolling;f.extend(b,{wrap:a.wrap,skin:a.skin,outer:a.outer,inner:a.inner,current:a,previous:d});g=a.href;switch(c){case "inline":case "ajax":case "html":a.selector?e=f("<div>").html(e).find(a.selector):t(e)&&(e.data("fancybox-placeholder")||e.data("fancybox-placeholder",f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()),e=e.show().detach(),a.wrap.bind("onReset",function(){f(this).find(e).length&&e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder",!1)}));break;case "image":e=a.tpl.image.replace("{href}",g);break;case "swf":e='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+g+'"></param>',h="",f.each(a.swf,function(a,b){e+='<param name="'+a+'" value="'+b+'"></param>';h+=" "+a+'="'+b+'"'}),e+='<embed src="'+g+'" type="application/x-shockwave-flash" width="100%" height="100%"'+h+"></embed></object>"}(!t(e)||!e.parent().is(a.inner))&&a.inner.append(e);b.trigger("beforeShow");a.inner.css("overflow","yes"===k?"scroll":"no"===k?"hidden":k);b._setDimension();b.reposition();b.isOpen=!1;b.coming=null;b.bindEvents();if(b.isOpened){if(d.prevMethod)b.transitions[d.prevMethod]()}else f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove();b.transitions[b.isOpened?a.nextMethod:a.openMethod]();b._preloadImages()}},_setDimension:function(){var a=b.getViewport(),d=0,e=!1,c=!1,e=b.wrap,k=b.skin,g=b.inner,h=b.current,c=h.width,j=h.height,m=h.minWidth,u=h.minHeight,n=h.maxWidth,p=h.maxHeight,s=h.scrolling,q=h.scrollOutside?h.scrollbarWidth:0,x=h.margin,y=l(x[1]+x[3]),r=l(x[0]+x[2]),v,z,t,C,A,F,B,D,H;e.add(k).add(g).width("auto").height("auto").removeClass("fancybox-tmp");x=l(k.outerWidth(!0)-k.width());v=l(k.outerHeight(!0)-k.height());z=y+x;t=r+v;C=E(c)?(a.w-z)*l(c)/100:c;A=E(j)?(a.h-t)*l(j)/100:j;if("iframe"===h.type){if(H=h.content,h.autoHeight&&1===H.data("ready"))try{H[0].contentWindow.document.location&&(g.width(C).height(9999),F=H.contents().find("body"),q&&F.css("overflow-x","hidden"),A=F.outerHeight(!0))}catch(G){}}else if(h.autoWidth||h.autoHeight)g.addClass("fancybox-tmp"),h.autoWidth||g.width(C),h.autoHeight||g.height(A),h.autoWidth&&(C=g.width()),h.autoHeight&&(A=g.height()),g.removeClass("fancybox-tmp");c=l(C);j=l(A);D=C/A;m=l(E(m)?l(m,"w")-z:m);n=l(E(n)?l(n,"w")-z:n);u=l(E(u)?l(u,"h")-t:u);p=l(E(p)?l(p,"h")-t:p);F=n;B=p;h.fitToView&&(n=Math.min(a.w-z,n),p=Math.min(a.h-t,p));z=a.w-y;r=a.h-r;h.aspectRatio?(c>n&&(c=n,j=l(c/D)),j>p&&(j=p,c=l(j*D)),c<m&&(c=m,j=l(c/D)),j<u&&(j=u,c=l(j*D))):(c=Math.max(m,Math.min(c,n)),h.autoHeight&&"iframe"!==h.type&&(g.width(c),j=g.height()),j=Math.max(u,Math.min(j,p)));if(h.fitToView)if(g.width(c).height(j),e.width(c+x),a=e.width(),y=e.height(),h.aspectRatio)for(;(a>z||y>r)&&(c>m&&j>u)&&!(19<d++);)j=Math.max(u,Math.min(p,j-10)),c=l(j*D),c<m&&(c=m,j=l(c/D)),c>n&&(c=n,j=l(c/D)),g.width(c).height(j),e.width(c+x),a=e.width(),y=e.height();else c=Math.max(m,Math.min(c,c-(a-z))),j=Math.max(u,Math.min(j,j-(y-r)));q&&("auto"===s&&j<A&&c+x+q<z)&&(c+=q);g.width(c).height(j);e.width(c+x);a=e.width();y=e.height();e=(a>z||y>r)&&c>m&&j>u;c=h.aspectRatio?c<F&&j<B&&c<C&&j<A:(c<F||j<B)&&(c<C||j<A);f.extend(h,{dim:{width:w(a),height:w(y)},origWidth:C,origHeight:A,canShrink:e,canExpand:c,wPadding:x,hPadding:v,wrapSpace:y-k.outerHeight(!0),skinSpace:k.height()-j});!H&&(h.autoHeight&&j>u&&j<p&&!c)&&g.height("auto")},_getPosition:function(a){var d=b.current,e=b.getViewport(),c=d.margin,f=b.wrap.width()+c[1]+c[3],g=b.wrap.height()+c[0]+c[2],c={position:"absolute",top:c[0],left:c[3]};d.autoCenter&&d.fixed&&!a&&g<=e.h&&f<=e.w?c.position="fixed":d.locked||(c.top+=e.y,c.left+=e.x);c.top=w(Math.max(c.top,c.top+(e.h-g)*d.topRatio));c.left=w(Math.max(c.left,c.left+(e.w-f)*d.leftRatio));return c},_afterZoomIn:function(){var a=b.current;a&&(b.isOpen=b.isOpened=!0,b.wrap.css("overflow","visible").addClass("fancybox-opened"),b.update(),(a.closeClick||a.nextClick&&1<b.group.length)&&b.inner.css("cursor","pointer").bind("click.fb",function(d){!f(d.target).is("a")&&!f(d.target).parent().is("a")&&(d.preventDefault(),b[a.closeClick?"close":"next"]())}),a.closeBtn&&f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb",function(a){a.preventDefault();b.close()}),a.arrows&&1<b.group.length&&((a.loop||0<a.index)&&f(a.tpl.prev).appendTo(b.outer).bind("click.fb",b.prev),(a.loop||a.index<b.group.length-1)&&f(a.tpl.next).appendTo(b.outer).bind("click.fb",b.next)),b.trigger("afterShow"),!a.loop&&a.index===a.group.length-1?b.play(!1):b.opts.autoPlay&&!b.player.isActive&&(b.opts.autoPlay=!1,b.play()))},_afterZoomOut:function(a){a=a||b.current;f(".fancybox-wrap").trigger("onReset").remove();f.extend(b,{group:{},opts:{},router:!1,current:null,isActive:!1,isOpened:!1,isOpen:!1,isClosing:!1,wrap:null,skin:null,outer:null,inner:null});b.trigger("afterClose",a)}});b.transitions={getOrigPosition:function(){var a=b.current,d=a.element,e=a.orig,c={},f=50,g=50,h=a.hPadding,j=a.wPadding,m=b.getViewport();!e&&(a.isDom&&d.is(":visible"))&&(e=d.find("img:first"),e.length||(e=d));t(e)?(c=e.offset(),e.is("img")&&(f=e.outerWidth(),g=e.outerHeight())):(c.top=m.y+(m.h-g)*a.topRatio,c.left=m.x+(m.w-f)*a.leftRatio);if("fixed"===b.wrap.css("position")||a.locked)c.top-=m.y,c.left-=m.x;return c={top:w(c.top-h*a.topRatio),left:w(c.left-j*a.leftRatio),width:w(f+j),height:w(g+h)}},step:function(a,d){var e,c,f=d.prop;c=b.current;var g=c.wrapSpace,h=c.skinSpace;if("width"===f||"height"===f)e=d.end===d.start?1:(a-d.start)/(d.end-d.start),b.isClosing&&(e=1-e),c="width"===f?c.wPadding:c.hPadding,c=a-c,b.skin[f](l("width"===f?c:c-g*e)),b.inner[f](l("width"===f?c:c-g*e-h*e))},zoomIn:function(){var a=b.current,d=a.pos,e=a.openEffect,c="elastic"===e,k=f.extend({opacity:1},d);delete k.position;c?(d=this.getOrigPosition(),a.openOpacity&&(d.opacity=0.1)):"fade"===e&&(d.opacity=0.1);b.wrap.css(d).animate(k,{duration:"none"===e?0:a.openSpeed,easing:a.openEasing,step:c?this.step:null,complete:b._afterZoomIn})},zoomOut:function(){var a=b.current,d=a.closeEffect,e="elastic"===d,c={opacity:0.1};e&&(c=this.getOrigPosition(),a.closeOpacity&&(c.opacity=0.1));b.wrap.animate(c,{duration:"none"===d?0:a.closeSpeed,easing:a.closeEasing,step:e?this.step:null,complete:b._afterZoomOut})},changeIn:function(){var a=b.current,d=a.nextEffect,e=a.pos,c={opacity:1},f=b.direction,g;e.opacity=0.1;"elastic"===d&&(g="down"===f||"up"===f?"top":"left","down"===f||"right"===f?(e[g]=w(l(e[g])-200),c[g]="+=200px"):(e[g]=w(l(e[g])+200),c[g]="-=200px"));"none"===d?b._afterZoomIn():b.wrap.css(e).animate(c,{duration:a.nextSpeed,easing:a.nextEasing,complete:b._afterZoomIn})},changeOut:function(){var a=b.previous,d=a.prevEffect,e={opacity:0.1},c=b.direction;"elastic"===d&&(e["down"===c||"up"===c?"top":"left"]=("up"===c||"left"===c?"-":"+")+"=200px");a.wrap.animate(e,{duration:"none"===d?0:a.prevSpeed,easing:a.prevEasing,complete:function(){f(this).trigger("onReset").remove()}})}};b.helpers.overlay={defaults:{closeClick:!0,speedOut:200,showEarly:!0,css:{},locked:!s,fixed:!0},overlay:null,fixed:!1,el:f("html"),create:function(a){a=f.extend({},this.defaults,a);this.overlay&&this.close();this.overlay=f('<div class="fancybox-overlay"></div>').appendTo(b.coming?b.coming.parent:a.parent);this.fixed=!1;a.fixed&&b.defaults.fixed&&(this.overlay.addClass("fancybox-overlay-fixed"),this.fixed=!0)},open:function(a){var d=this;a=f.extend({},this.defaults,a);this.overlay?this.overlay.unbind(".overlay").width("auto").height("auto"):this.create(a);this.fixed||(n.bind("resize.overlay",f.proxy(this.update,this)),this.update());a.closeClick&&this.overlay.bind("click.overlay",function(a){if(f(a.target).hasClass("fancybox-overlay"))return b.isActive?b.close():d.close(),!1});this.overlay.css(a.css).show()},close:function(){var a,b;n.unbind("resize.overlay");this.el.hasClass("fancybox-lock")&&(f(".fancybox-margin").removeClass("fancybox-margin"),a=n.scrollTop(),b=n.scrollLeft(),this.el.removeClass("fancybox-lock"),n.scrollTop(a).scrollLeft(b));f(".fancybox-overlay").remove().hide();f.extend(this,{overlay:null,fixed:!1})},update:function(){var a="100%",b;this.overlay.width(a).height("100%");I?(b=Math.max(G.documentElement.offsetWidth,G.body.offsetWidth),p.width()>b&&(a=p.width())):p.width()>n.width()&&(a=p.width());this.overlay.width(a).height(p.height())},onReady:function(a,b){var e=this.overlay;f(".fancybox-overlay").stop(!0,!0);e||this.create(a);a.locked&&(this.fixed&&b.fixed)&&(e||(this.margin=p.height()>n.height()?f("html").css("margin-right").replace("px",""):!1),b.locked=this.overlay.append(b.wrap),b.fixed=!1);!0===a.showEarly&&this.beforeShow.apply(this,arguments)},beforeShow:function(a,b){var e,c;b.locked&&(!1!==this.margin&&(f("*").filter(function(){return"fixed"===f(this).css("position")&&!f(this).hasClass("fancybox-overlay")&&!f(this).hasClass("fancybox-wrap")}).addClass("fancybox-margin"),this.el.addClass("fancybox-margin")),e=n.scrollTop(),c=n.scrollLeft(),this.el.addClass("fancybox-lock"),n.scrollTop(e).scrollLeft(c));this.open(a)},onUpdate:function(){this.fixed||this.update()},afterClose:function(a){this.overlay&&!b.coming&&this.overlay.fadeOut(a.speedOut,f.proxy(this.close,this))}};b.helpers.title={defaults:{type:"float",position:"bottom"},beforeShow:function(a){var d=b.current,e=d.title,c=a.type;f.isFunction(e)&&(e=e.call(d.element,d));if(q(e)&&""!==f.trim(e)){d=f('<div class="fancybox-title fancybox-title-'+c+'-wrap">'+e+"</div>");switch(c){case "inside":c=b.skin;break;case "outside":c=b.wrap;break;case "over":c=b.inner;break;default:c=b.skin,d.appendTo("body"),I&&d.width(d.width()),d.wrapInner('<span class="child"></span>'),b.current.margin[2]+=Math.abs(l(d.css("margin-bottom")))}d["top"===a.position?"prependTo":"appendTo"](c)}}};f.fn.fancybox=function(a){var d,e=f(this),c=this.selector||"",k=function(g){var h=f(this).blur(),j=d,k,l;!g.ctrlKey&&(!g.altKey&&!g.shiftKey&&!g.metaKey)&&!h.is(".fancybox-wrap")&&(k=a.groupAttr||"data-fancybox-group",l=h.attr(k),l||(k="rel",l=h.get(0)[k]),l&&(""!==l&&"nofollow"!==l)&&(h=c.length?f(c):e,h=h.filter("["+k+'="'+l+'"]'),j=h.index(this)),a.index=j,!1!==b.open(h,a)&&g.preventDefault())};a=a||{};d=a.index||0;!c||!1===a.live?e.unbind("click.fb-start").bind("click.fb-start",k):p.undelegate(c,"click.fb-start").delegate(c+":not('.fancybox-item, .fancybox-nav')","click.fb-start",k);this.filter("[data-fancybox-start=1]").trigger("click");return this};p.ready(function(){var a,d;f.scrollbarWidth===v&&(f.scrollbarWidth=function(){var a=f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),b=a.children(),b=b.innerWidth()-b.height(99).innerWidth();a.remove();return b});if(f.support.fixedPosition===v){a=f.support;d=f('<div style="position:fixed;top:20px;"></div>').appendTo("body");var e=20===d[0].offsetTop||15===d[0].offsetTop;d.remove();a.fixedPosition=e}f.extend(b.defaults,{scrollbarWidth:f.scrollbarWidth(),fixed:f.support.fixedPosition,parent:f("body")});a=f(r).width();J.addClass("fancybox-lock-test");d=f(r).width();J.removeClass("fancybox-lock-test");f("<style type='text/css'>.fancybox-margin{margin-right:"+(d-a)+"px;}</style>").appendTo("head")})})(window,document,jQuery);

/*!
 * Isotope PACKAGED v2.2.2
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2015 Metafizzy
 */

!function(a){function b(){}function c(a){function c(b){b.prototype.option||(b.prototype.option=function(b){a.isPlainObject(b)&&(this.options=a.extend(!0,this.options,b))})}function e(b,c){a.fn[b]=function(e){if("string"==typeof e){for(var g=d.call(arguments,1),h=0,i=this.length;i>h;h++){var j=this[h],k=a.data(j,b);if(k)if(a.isFunction(k[e])&&"_"!==e.charAt(0)){var l=k[e].apply(k,g);if(void 0!==l)return l}else f("no such method '"+e+"' for "+b+" instance");else f("cannot call methods on "+b+" prior to initialization; attempted to call '"+e+"'")}return this}return this.each(function(){var d=a.data(this,b);d?(d.option(e),d._init()):(d=new c(this,e),a.data(this,b,d))})}}if(a){var f="undefined"==typeof console?b:function(a){console.error(a)};return a.bridget=function(a,b){c(b),e(a,b)},a.bridget}}var d=Array.prototype.slice;"function"==typeof define&&define.amd?define("jquery-bridget/jquery.bridget",["jquery"],c):c("object"==typeof exports?require("jquery"):a.jQuery)}(window),function(a){function b(b){var c=a.event;return c.target=c.target||c.srcElement||b,c}var c=document.documentElement,d=function(){};c.addEventListener?d=function(a,b,c){a.addEventListener(b,c,!1)}:c.attachEvent&&(d=function(a,c,d){a[c+d]=d.handleEvent?function(){var c=b(a);d.handleEvent.call(d,c)}:function(){var c=b(a);d.call(a,c)},a.attachEvent("on"+c,a[c+d])});var e=function(){};c.removeEventListener?e=function(a,b,c){a.removeEventListener(b,c,!1)}:c.detachEvent&&(e=function(a,b,c){a.detachEvent("on"+b,a[b+c]);try{delete a[b+c]}catch(d){a[b+c]=void 0}});var f={bind:d,unbind:e};"function"==typeof define&&define.amd?define("eventie/eventie",f):"object"==typeof exports?module.exports=f:a.eventie=f}(window),function(){"use strict";function a(){}function b(a,b){for(var c=a.length;c--;)if(a[c].listener===b)return c;return-1}function c(a){return function(){return this[a].apply(this,arguments)}}var d=a.prototype,e=this,f=e.EventEmitter;d.getListeners=function(a){var b,c,d=this._getEvents();if(a instanceof RegExp){b={};for(c in d)d.hasOwnProperty(c)&&a.test(c)&&(b[c]=d[c])}else b=d[a]||(d[a]=[]);return b},d.flattenListeners=function(a){var b,c=[];for(b=0;b<a.length;b+=1)c.push(a[b].listener);return c},d.getListenersAsObject=function(a){var b,c=this.getListeners(a);return c instanceof Array&&(b={},b[a]=c),b||c},d.addListener=function(a,c){var d,e=this.getListenersAsObject(a),f="object"==typeof c;for(d in e)e.hasOwnProperty(d)&&-1===b(e[d],c)&&e[d].push(f?c:{listener:c,once:!1});return this},d.on=c("addListener"),d.addOnceListener=function(a,b){return this.addListener(a,{listener:b,once:!0})},d.once=c("addOnceListener"),d.defineEvent=function(a){return this.getListeners(a),this},d.defineEvents=function(a){for(var b=0;b<a.length;b+=1)this.defineEvent(a[b]);return this},d.removeListener=function(a,c){var d,e,f=this.getListenersAsObject(a);for(e in f)f.hasOwnProperty(e)&&(d=b(f[e],c),-1!==d&&f[e].splice(d,1));return this},d.off=c("removeListener"),d.addListeners=function(a,b){return this.manipulateListeners(!1,a,b)},d.removeListeners=function(a,b){return this.manipulateListeners(!0,a,b)},d.manipulateListeners=function(a,b,c){var d,e,f=a?this.removeListener:this.addListener,g=a?this.removeListeners:this.addListeners;if("object"!=typeof b||b instanceof RegExp)for(d=c.length;d--;)f.call(this,b,c[d]);else for(d in b)b.hasOwnProperty(d)&&(e=b[d])&&("function"==typeof e?f.call(this,d,e):g.call(this,d,e));return this},d.removeEvent=function(a){var b,c=typeof a,d=this._getEvents();if("string"===c)delete d[a];else if(a instanceof RegExp)for(b in d)d.hasOwnProperty(b)&&a.test(b)&&delete d[b];else delete this._events;return this},d.removeAllListeners=c("removeEvent"),d.emitEvent=function(a,b){var c,d,e,f,g=this.getListenersAsObject(a);for(e in g)if(g.hasOwnProperty(e))for(d=g[e].length;d--;)c=g[e][d],c.once===!0&&this.removeListener(a,c.listener),f=c.listener.apply(this,b||[]),f===this._getOnceReturnValue()&&this.removeListener(a,c.listener);return this},d.trigger=c("emitEvent"),d.emit=function(a){var b=Array.prototype.slice.call(arguments,1);return this.emitEvent(a,b)},d.setOnceReturnValue=function(a){return this._onceReturnValue=a,this},d._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},d._getEvents=function(){return this._events||(this._events={})},a.noConflict=function(){return e.EventEmitter=f,a},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return a}):"object"==typeof module&&module.exports?module.exports=a:e.EventEmitter=a}.call(this),function(a){function b(a){if(a){if("string"==typeof d[a])return a;a=a.charAt(0).toUpperCase()+a.slice(1);for(var b,e=0,f=c.length;f>e;e++)if(b=c[e]+a,"string"==typeof d[b])return b}}var c="Webkit Moz ms Ms O".split(" "),d=document.documentElement.style;"function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function(){return b}):"object"==typeof exports?module.exports=b:a.getStyleProperty=b}(window),function(a,b){function c(a){var b=parseFloat(a),c=-1===a.indexOf("%")&&!isNaN(b);return c&&b}function d(){}function e(){for(var a={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},b=0,c=h.length;c>b;b++){var d=h[b];a[d]=0}return a}function f(b){function d(){if(!m){m=!0;var d=a.getComputedStyle;if(j=function(){var a=d?function(a){return d(a,null)}:function(a){return a.currentStyle};return function(b){var c=a(b);return c||g("Style returned "+c+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),c}}(),k=b("boxSizing")){var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style[k]="border-box";var f=document.body||document.documentElement;f.appendChild(e);var h=j(e);l=200===c(h.width),f.removeChild(e)}}}function f(a){if(d(),"string"==typeof a&&(a=document.querySelector(a)),a&&"object"==typeof a&&a.nodeType){var b=j(a);if("none"===b.display)return e();var f={};f.width=a.offsetWidth,f.height=a.offsetHeight;for(var g=f.isBorderBox=!(!k||!b[k]||"border-box"!==b[k]),m=0,n=h.length;n>m;m++){var o=h[m],p=b[o];p=i(a,p);var q=parseFloat(p);f[o]=isNaN(q)?0:q}var r=f.paddingLeft+f.paddingRight,s=f.paddingTop+f.paddingBottom,t=f.marginLeft+f.marginRight,u=f.marginTop+f.marginBottom,v=f.borderLeftWidth+f.borderRightWidth,w=f.borderTopWidth+f.borderBottomWidth,x=g&&l,y=c(b.width);y!==!1&&(f.width=y+(x?0:r+v));var z=c(b.height);return z!==!1&&(f.height=z+(x?0:s+w)),f.innerWidth=f.width-(r+v),f.innerHeight=f.height-(s+w),f.outerWidth=f.width+t,f.outerHeight=f.height+u,f}}function i(b,c){if(a.getComputedStyle||-1===c.indexOf("%"))return c;var d=b.style,e=d.left,f=b.runtimeStyle,g=f&&f.left;return g&&(f.left=b.currentStyle.left),d.left=c,c=d.pixelLeft,d.left=e,g&&(f.left=g),c}var j,k,l,m=!1;return f}var g="undefined"==typeof console?d:function(a){console.error(a)},h=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],f):"object"==typeof exports?module.exports=f(require("desandro-get-style-property")):a.getSize=f(a.getStyleProperty)}(window),function(a){function b(a){"function"==typeof a&&(b.isReady?a():g.push(a))}function c(a){var c="readystatechange"===a.type&&"complete"!==f.readyState;b.isReady||c||d()}function d(){b.isReady=!0;for(var a=0,c=g.length;c>a;a++){var d=g[a];d()}}function e(e){return"complete"===f.readyState?d():(e.bind(f,"DOMContentLoaded",c),e.bind(f,"readystatechange",c),e.bind(a,"load",c)),b}var f=a.document,g=[];b.isReady=!1,"function"==typeof define&&define.amd?define("doc-ready/doc-ready",["eventie/eventie"],e):"object"==typeof exports?module.exports=e(require("eventie")):a.docReady=e(a.eventie)}(window),function(a){"use strict";function b(a,b){return a[g](b)}function c(a){if(!a.parentNode){var b=document.createDocumentFragment();b.appendChild(a)}}function d(a,b){c(a);for(var d=a.parentNode.querySelectorAll(b),e=0,f=d.length;f>e;e++)if(d[e]===a)return!0;return!1}function e(a,d){return c(a),b(a,d)}var f,g=function(){if(a.matches)return"matches";if(a.matchesSelector)return"matchesSelector";for(var b=["webkit","moz","ms","o"],c=0,d=b.length;d>c;c++){var e=b[c],f=e+"MatchesSelector";if(a[f])return f}}();if(g){var h=document.createElement("div"),i=b(h,"div");f=i?b:e}else f=d;"function"==typeof define&&define.amd?define("matches-selector/matches-selector",[],function(){return f}):"object"==typeof exports?module.exports=f:window.matchesSelector=f}(Element.prototype),function(a,b){"use strict";"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["doc-ready/doc-ready","matches-selector/matches-selector"],function(c,d){return b(a,c,d)}):"object"==typeof exports?module.exports=b(a,require("doc-ready"),require("desandro-matches-selector")):a.fizzyUIUtils=b(a,a.docReady,a.matchesSelector)}(window,function(a,b,c){var d={};d.extend=function(a,b){for(var c in b)a[c]=b[c];return a},d.modulo=function(a,b){return(a%b+b)%b};var e=Object.prototype.toString;d.isArray=function(a){return"[object Array]"==e.call(a)},d.makeArray=function(a){var b=[];if(d.isArray(a))b=a;else if(a&&"number"==typeof a.length)for(var c=0,e=a.length;e>c;c++)b.push(a[c]);else b.push(a);return b},d.indexOf=Array.prototype.indexOf?function(a,b){return a.indexOf(b)}:function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},d.removeFrom=function(a,b){var c=d.indexOf(a,b);-1!=c&&a.splice(c,1)},d.isElement="function"==typeof HTMLElement||"object"==typeof HTMLElement?function(a){return a instanceof HTMLElement}:function(a){return a&&"object"==typeof a&&1==a.nodeType&&"string"==typeof a.nodeName},d.setText=function(){function a(a,c){b=b||(void 0!==document.documentElement.textContent?"textContent":"innerText"),a[b]=c}var b;return a}(),d.getParent=function(a,b){for(;a!=document.body;)if(a=a.parentNode,c(a,b))return a},d.getQueryElement=function(a){return"string"==typeof a?document.querySelector(a):a},d.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},d.filterFindElements=function(a,b){a=d.makeArray(a);for(var e=[],f=0,g=a.length;g>f;f++){var h=a[f];if(d.isElement(h))if(b){c(h,b)&&e.push(h);for(var i=h.querySelectorAll(b),j=0,k=i.length;k>j;j++)e.push(i[j])}else e.push(h)}return e},d.debounceMethod=function(a,b,c){var d=a.prototype[b],e=b+"Timeout";a.prototype[b]=function(){var a=this[e];a&&clearTimeout(a);var b=arguments,f=this;this[e]=setTimeout(function(){d.apply(f,b),delete f[e]},c||100)}},d.toDashed=function(a){return a.replace(/(.)([A-Z])/g,function(a,b,c){return b+"-"+c}).toLowerCase()};var f=a.console;return d.htmlInit=function(c,e){b(function(){for(var b=d.toDashed(e),g=document.querySelectorAll(".js-"+b),h="data-"+b+"-options",i=0,j=g.length;j>i;i++){var k,l=g[i],m=l.getAttribute(h);try{k=m&&JSON.parse(m)}catch(n){f&&f.error("Error parsing "+h+" on "+l.nodeName.toLowerCase()+(l.id?"#"+l.id:"")+": "+n);continue}var o=new c(l,k),p=a.jQuery;p&&p.data(l,e,o)}})},d}),function(a,b){"use strict";"function"==typeof define&&define.amd?define("outlayer/item",["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property","fizzy-ui-utils/utils"],function(c,d,e,f){return b(a,c,d,e,f)}):"object"==typeof exports?module.exports=b(a,require("wolfy87-eventemitter"),require("get-size"),require("desandro-get-style-property"),require("fizzy-ui-utils")):(a.Outlayer={},a.Outlayer.Item=b(a,a.EventEmitter,a.getSize,a.getStyleProperty,a.fizzyUIUtils))}(window,function(a,b,c,d,e){"use strict";function f(a){for(var b in a)return!1;return b=null,!0}function g(a,b){a&&(this.element=a,this.layout=b,this.position={x:0,y:0},this._create())}function h(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}var i=a.getComputedStyle,j=i?function(a){return i(a,null)}:function(a){return a.currentStyle},k=d("transition"),l=d("transform"),m=k&&l,n=!!d("perspective"),o={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[k],p=["transform","transition","transitionDuration","transitionProperty"],q=function(){for(var a={},b=0,c=p.length;c>b;b++){var e=p[b],f=d(e);f&&f!==e&&(a[e]=f)}return a}();e.extend(g.prototype,b.prototype),g.prototype._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},g.prototype.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},g.prototype.getSize=function(){this.size=c(this.element)},g.prototype.css=function(a){var b=this.element.style;for(var c in a){var d=q[c]||c;b[d]=a[c]}},g.prototype.getPosition=function(){var a=j(this.element),b=this.layout.options,c=b.isOriginLeft,d=b.isOriginTop,e=a[c?"left":"right"],f=a[d?"top":"bottom"],g=this.layout.size,h=-1!=e.indexOf("%")?parseFloat(e)/100*g.width:parseInt(e,10),i=-1!=f.indexOf("%")?parseFloat(f)/100*g.height:parseInt(f,10);h=isNaN(h)?0:h,i=isNaN(i)?0:i,h-=c?g.paddingLeft:g.paddingRight,i-=d?g.paddingTop:g.paddingBottom,this.position.x=h,this.position.y=i},g.prototype.layoutPosition=function(){var a=this.layout.size,b=this.layout.options,c={},d=b.isOriginLeft?"paddingLeft":"paddingRight",e=b.isOriginLeft?"left":"right",f=b.isOriginLeft?"right":"left",g=this.position.x+a[d];c[e]=this.getXValue(g),c[f]="";var h=b.isOriginTop?"paddingTop":"paddingBottom",i=b.isOriginTop?"top":"bottom",j=b.isOriginTop?"bottom":"top",k=this.position.y+a[h];c[i]=this.getYValue(k),c[j]="",this.css(c),this.emitEvent("layout",[this])},g.prototype.getXValue=function(a){var b=this.layout.options;return b.percentPosition&&!b.isHorizontal?a/this.layout.size.width*100+"%":a+"px"},g.prototype.getYValue=function(a){var b=this.layout.options;return b.percentPosition&&b.isHorizontal?a/this.layout.size.height*100+"%":a+"px"},g.prototype._transitionTo=function(a,b){this.getPosition();var c=this.position.x,d=this.position.y,e=parseInt(a,10),f=parseInt(b,10),g=e===this.position.x&&f===this.position.y;if(this.setPosition(a,b),g&&!this.isTransitioning)return void this.layoutPosition();var h=a-c,i=b-d,j={};j.transform=this.getTranslate(h,i),this.transition({to:j,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},g.prototype.getTranslate=function(a,b){var c=this.layout.options;return a=c.isOriginLeft?a:-a,b=c.isOriginTop?b:-b,n?"translate3d("+a+"px, "+b+"px, 0)":"translate("+a+"px, "+b+"px)"},g.prototype.goTo=function(a,b){this.setPosition(a,b),this.layoutPosition()},g.prototype.moveTo=m?g.prototype._transitionTo:g.prototype.goTo,g.prototype.setPosition=function(a,b){this.position.x=parseInt(a,10),this.position.y=parseInt(b,10)},g.prototype._nonTransition=function(a){this.css(a.to),a.isCleaning&&this._removeStyles(a.to);for(var b in a.onTransitionEnd)a.onTransitionEnd[b].call(this)},g.prototype._transition=function(a){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(a);var b=this._transn;for(var c in a.onTransitionEnd)b.onEnd[c]=a.onTransitionEnd[c];for(c in a.to)b.ingProperties[c]=!0,a.isCleaning&&(b.clean[c]=!0);if(a.from){this.css(a.from);var d=this.element.offsetHeight;d=null}this.enableTransition(a.to),this.css(a.to),this.isTransitioning=!0};var r="opacity,"+h(q.transform||"transform");g.prototype.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:r,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(o,this,!1))},g.prototype.transition=g.prototype[k?"_transition":"_nonTransition"],g.prototype.onwebkitTransitionEnd=function(a){this.ontransitionend(a)},g.prototype.onotransitionend=function(a){this.ontransitionend(a)};var s={"-webkit-transform":"transform","-moz-transform":"transform","-o-transform":"transform"};g.prototype.ontransitionend=function(a){if(a.target===this.element){var b=this._transn,c=s[a.propertyName]||a.propertyName;if(delete b.ingProperties[c],f(b.ingProperties)&&this.disableTransition(),c in b.clean&&(this.element.style[a.propertyName]="",delete b.clean[c]),c in b.onEnd){var d=b.onEnd[c];d.call(this),delete b.onEnd[c]}this.emitEvent("transitionEnd",[this])}},g.prototype.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(o,this,!1),this.isTransitioning=!1},g.prototype._removeStyles=function(a){var b={};for(var c in a)b[c]="";this.css(b)};var t={transitionProperty:"",transitionDuration:""};return g.prototype.removeTransitionStyles=function(){this.css(t)},g.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},g.prototype.remove=function(){if(!k||!parseFloat(this.layout.options.transitionDuration))return void this.removeElem();var a=this;this.once("transitionEnd",function(){a.removeElem()}),this.hide()},g.prototype.reveal=function(){delete this.isHidden,this.css({display:""});var a=this.layout.options,b={},c=this.getHideRevealTransitionEndProperty("visibleStyle");b[c]=this.onRevealTransitionEnd,this.transition({from:a.hiddenStyle,to:a.visibleStyle,isCleaning:!0,onTransitionEnd:b})},g.prototype.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},g.prototype.getHideRevealTransitionEndProperty=function(a){var b=this.layout.options[a];if(b.opacity)return"opacity";for(var c in b)return c},g.prototype.hide=function(){this.isHidden=!0,this.css({display:""});var a=this.layout.options,b={},c=this.getHideRevealTransitionEndProperty("hiddenStyle");b[c]=this.onHideTransitionEnd,this.transition({from:a.visibleStyle,to:a.hiddenStyle,isCleaning:!0,onTransitionEnd:b})},g.prototype.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},g.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},g}),function(a,b){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["eventie/eventie","eventEmitter/EventEmitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(c,d,e,f,g){return b(a,c,d,e,f,g)}):"object"==typeof exports?module.exports=b(a,require("eventie"),require("wolfy87-eventemitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):a.Outlayer=b(a,a.eventie,a.EventEmitter,a.getSize,a.fizzyUIUtils,a.Outlayer.Item)}(window,function(a,b,c,d,e,f){"use strict";function g(a,b){var c=e.getQueryElement(a);if(!c)return void(h&&h.error("Bad element for "+this.constructor.namespace+": "+(c||a)));this.element=c,i&&(this.$element=i(this.element)),this.options=e.extend({},this.constructor.defaults),this.option(b);var d=++k;this.element.outlayerGUID=d,l[d]=this,this._create(),this.options.isInitLayout&&this.layout()}var h=a.console,i=a.jQuery,j=function(){},k=0,l={};return g.namespace="outlayer",g.Item=f,g.defaults={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,isResizingContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},e.extend(g.prototype,c.prototype),g.prototype.option=function(a){e.extend(this.options,a)},g.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),e.extend(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},g.prototype.reloadItems=function(){this.items=this._itemize(this.element.children)},g.prototype._itemize=function(a){for(var b=this._filterFindItemElements(a),c=this.constructor.Item,d=[],e=0,f=b.length;f>e;e++){var g=b[e],h=new c(g,this);d.push(h)}return d},g.prototype._filterFindItemElements=function(a){return e.filterFindElements(a,this.options.itemSelector)},g.prototype.getItemElements=function(){for(var a=[],b=0,c=this.items.length;c>b;b++)a.push(this.items[b].element);return a},g.prototype.layout=function(){this._resetLayout(),this._manageStamps();var a=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,a),this._isLayoutInited=!0},g.prototype._init=g.prototype.layout,g.prototype._resetLayout=function(){this.getSize()},g.prototype.getSize=function(){this.size=d(this.element)},g.prototype._getMeasurement=function(a,b){var c,f=this.options[a];f?("string"==typeof f?c=this.element.querySelector(f):e.isElement(f)&&(c=f),this[a]=c?d(c)[b]:f):this[a]=0},g.prototype.layoutItems=function(a,b){a=this._getItemsForLayout(a),this._layoutItems(a,b),this._postLayout()},g.prototype._getItemsForLayout=function(a){for(var b=[],c=0,d=a.length;d>c;c++){var e=a[c];e.isIgnored||b.push(e)}return b},g.prototype._layoutItems=function(a,b){if(this._emitCompleteOnItems("layout",a),a&&a.length){for(var c=[],d=0,e=a.length;e>d;d++){var f=a[d],g=this._getItemLayoutPosition(f);g.item=f,g.isInstant=b||f.isLayoutInstant,c.push(g)}this._processLayoutQueue(c)}},g.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},g.prototype._processLayoutQueue=function(a){for(var b=0,c=a.length;c>b;b++){var d=a[b];this._positionItem(d.item,d.x,d.y,d.isInstant)}},g.prototype._positionItem=function(a,b,c,d){d?a.goTo(b,c):a.moveTo(b,c)},g.prototype._postLayout=function(){this.resizeContainer()},g.prototype.resizeContainer=function(){if(this.options.isResizingContainer){var a=this._getContainerSize();a&&(this._setContainerMeasure(a.width,!0),this._setContainerMeasure(a.height,!1))}},g.prototype._getContainerSize=j,g.prototype._setContainerMeasure=function(a,b){if(void 0!==a){var c=this.size;c.isBorderBox&&(a+=b?c.paddingLeft+c.paddingRight+c.borderLeftWidth+c.borderRightWidth:c.paddingBottom+c.paddingTop+c.borderTopWidth+c.borderBottomWidth),a=Math.max(a,0),this.element.style[b?"width":"height"]=a+"px"}},g.prototype._emitCompleteOnItems=function(a,b){function c(){e.dispatchEvent(a+"Complete",null,[b])}function d(){g++,g===f&&c()}var e=this,f=b.length;if(!b||!f)return void c();for(var g=0,h=0,i=b.length;i>h;h++){var j=b[h];j.once(a,d)}},g.prototype.dispatchEvent=function(a,b,c){var d=b?[b].concat(c):c;if(this.emitEvent(a,d),i)if(this.$element=this.$element||i(this.element),b){var e=i.Event(b);e.type=a,this.$element.trigger(e,c)}else this.$element.trigger(a,c)},g.prototype.ignore=function(a){var b=this.getItem(a);b&&(b.isIgnored=!0)},g.prototype.unignore=function(a){var b=this.getItem(a);b&&delete b.isIgnored},g.prototype.stamp=function(a){if(a=this._find(a)){this.stamps=this.stamps.concat(a);for(var b=0,c=a.length;c>b;b++){var d=a[b];this.ignore(d)}}},g.prototype.unstamp=function(a){if(a=this._find(a))for(var b=0,c=a.length;c>b;b++){var d=a[b];e.removeFrom(this.stamps,d),this.unignore(d)}},g.prototype._find=function(a){return a?("string"==typeof a&&(a=this.element.querySelectorAll(a)),a=e.makeArray(a)):void 0},g.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var a=0,b=this.stamps.length;b>a;a++){var c=this.stamps[a];this._manageStamp(c)}}},g.prototype._getBoundingRect=function(){var a=this.element.getBoundingClientRect(),b=this.size;this._boundingRect={left:a.left+b.paddingLeft+b.borderLeftWidth,top:a.top+b.paddingTop+b.borderTopWidth,right:a.right-(b.paddingRight+b.borderRightWidth),bottom:a.bottom-(b.paddingBottom+b.borderBottomWidth)}},g.prototype._manageStamp=j,g.prototype._getElementOffset=function(a){var b=a.getBoundingClientRect(),c=this._boundingRect,e=d(a),f={left:b.left-c.left-e.marginLeft,top:b.top-c.top-e.marginTop,right:c.right-b.right-e.marginRight,bottom:c.bottom-b.bottom-e.marginBottom};return f},g.prototype.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},g.prototype.bindResize=function(){this.isResizeBound||(b.bind(a,"resize",this),this.isResizeBound=!0)},g.prototype.unbindResize=function(){this.isResizeBound&&b.unbind(a,"resize",this),this.isResizeBound=!1},g.prototype.onresize=function(){function a(){b.resize(),delete b.resizeTimeout}this.resizeTimeout&&clearTimeout(this.resizeTimeout);var b=this;this.resizeTimeout=setTimeout(a,100)},g.prototype.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},g.prototype.needsResizeLayout=function(){var a=d(this.element),b=this.size&&a;return b&&a.innerWidth!==this.size.innerWidth},g.prototype.addItems=function(a){var b=this._itemize(a);return b.length&&(this.items=this.items.concat(b)),b},g.prototype.appended=function(a){var b=this.addItems(a);b.length&&(this.layoutItems(b,!0),this.reveal(b))},g.prototype.prepended=function(a){var b=this._itemize(a);if(b.length){var c=this.items.slice(0);this.items=b.concat(c),this._resetLayout(),this._manageStamps(),this.layoutItems(b,!0),this.reveal(b),this.layoutItems(c)}},g.prototype.reveal=function(a){this._emitCompleteOnItems("reveal",a);for(var b=a&&a.length,c=0;b&&b>c;c++){var d=a[c];d.reveal()}},g.prototype.hide=function(a){this._emitCompleteOnItems("hide",a);for(var b=a&&a.length,c=0;b&&b>c;c++){var d=a[c];d.hide()}},g.prototype.revealItemElements=function(a){var b=this.getItems(a);this.reveal(b)},g.prototype.hideItemElements=function(a){var b=this.getItems(a);this.hide(b)},g.prototype.getItem=function(a){for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];if(d.element===a)return d}},g.prototype.getItems=function(a){a=e.makeArray(a);for(var b=[],c=0,d=a.length;d>c;c++){var f=a[c],g=this.getItem(f);g&&b.push(g)}return b},g.prototype.remove=function(a){var b=this.getItems(a);if(this._emitCompleteOnItems("remove",b),b&&b.length)for(var c=0,d=b.length;d>c;c++){var f=b[c];f.remove(),e.removeFrom(this.items,f)}},g.prototype.destroy=function(){var a=this.element.style;a.height="",a.position="",a.width="";for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];d.destroy()}this.unbindResize();var e=this.element.outlayerGUID;delete l[e],delete this.element.outlayerGUID,i&&i.removeData(this.element,this.constructor.namespace)},g.data=function(a){a=e.getQueryElement(a);var b=a&&a.outlayerGUID;return b&&l[b]},g.create=function(a,b){function c(){g.apply(this,arguments)}return Object.create?c.prototype=Object.create(g.prototype):e.extend(c.prototype,g.prototype),c.prototype.constructor=c,c.defaults=e.extend({},g.defaults),e.extend(c.defaults,b),c.prototype.settings={},c.namespace=a,c.data=g.data,c.Item=function(){f.apply(this,arguments)},c.Item.prototype=new f,e.htmlInit(c,a),i&&i.bridget&&i.bridget(a,c),c},g.Item=f,g}),function(a,b){"use strict";"function"==typeof define&&define.amd?define("isotope/js/item",["outlayer/outlayer"],b):"object"==typeof exports?module.exports=b(require("outlayer")):(a.Isotope=a.Isotope||{},a.Isotope.Item=b(a.Outlayer))}(window,function(a){"use strict";function b(){a.Item.apply(this,arguments)}b.prototype=new a.Item,b.prototype._create=function(){this.id=this.layout.itemGUID++,a.Item.prototype._create.call(this),this.sortData={}},b.prototype.updateSortData=function(){if(!this.isIgnored){this.sortData.id=this.id,this.sortData["original-order"]=this.id,this.sortData.random=Math.random();var a=this.layout.options.getSortData,b=this.layout._sorters;for(var c in a){var d=b[c];this.sortData[c]=d(this.element,this)}}};var c=b.prototype.destroy;return b.prototype.destroy=function(){c.apply(this,arguments),this.css({display:""})},b}),function(a,b){"use strict";"function"==typeof define&&define.amd?define("isotope/js/layout-mode",["get-size/get-size","outlayer/outlayer"],b):"object"==typeof exports?module.exports=b(require("get-size"),require("outlayer")):(a.Isotope=a.Isotope||{},a.Isotope.LayoutMode=b(a.getSize,a.Outlayer))}(window,function(a,b){"use strict";function c(a){this.isotope=a,a&&(this.options=a.options[this.namespace],this.element=a.element,this.items=a.filteredItems,this.size=a.size)}return function(){function a(a){return function(){return b.prototype[a].apply(this.isotope,arguments)}}for(var d=["_resetLayout","_getItemLayoutPosition","_manageStamp","_getContainerSize","_getElementOffset","needsResizeLayout"],e=0,f=d.length;f>e;e++){var g=d[e];c.prototype[g]=a(g)}}(),c.prototype.needsVerticalResizeLayout=function(){var b=a(this.isotope.element),c=this.isotope.size&&b;return c&&b.innerHeight!=this.isotope.size.innerHeight},c.prototype._getMeasurement=function(){this.isotope._getMeasurement.apply(this,arguments)},c.prototype.getColumnWidth=function(){this.getSegmentSize("column","Width")},c.prototype.getRowHeight=function(){this.getSegmentSize("row","Height")},c.prototype.getSegmentSize=function(a,b){var c=a+b,d="outer"+b;if(this._getMeasurement(c,d),!this[c]){var e=this.getFirstItemSize();this[c]=e&&e[d]||this.isotope.size["inner"+b]}},c.prototype.getFirstItemSize=function(){var b=this.isotope.filteredItems[0];return b&&b.element&&a(b.element)},c.prototype.layout=function(){this.isotope.layout.apply(this.isotope,arguments)},c.prototype.getSize=function(){this.isotope.getSize(),this.size=this.isotope.size},c.modes={},c.create=function(a,b){function d(){c.apply(this,arguments)}return d.prototype=new c,b&&(d.options=b),d.prototype.namespace=a,c.modes[a]=d,d},c}),function(a,b){"use strict";"function"==typeof define&&define.amd?define("masonry/masonry",["outlayer/outlayer","get-size/get-size","fizzy-ui-utils/utils"],b):"object"==typeof exports?module.exports=b(require("outlayer"),require("get-size"),require("fizzy-ui-utils")):a.Masonry=b(a.Outlayer,a.getSize,a.fizzyUIUtils)}(window,function(a,b,c){var d=a.create("masonry");return d.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns();var a=this.cols;for(this.colYs=[];a--;)this.colYs.push(0);this.maxY=0},d.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var a=this.items[0],c=a&&a.element;this.columnWidth=c&&b(c).outerWidth||this.containerWidth}var d=this.columnWidth+=this.gutter,e=this.containerWidth+this.gutter,f=e/d,g=d-e%d,h=g&&1>g?"round":"floor";f=Math[h](f),this.cols=Math.max(f,1)},d.prototype.getContainerWidth=function(){var a=this.options.isFitWidth?this.element.parentNode:this.element,c=b(a);this.containerWidth=c&&c.innerWidth},d.prototype._getItemLayoutPosition=function(a){a.getSize();var b=a.size.outerWidth%this.columnWidth,d=b&&1>b?"round":"ceil",e=Math[d](a.size.outerWidth/this.columnWidth);e=Math.min(e,this.cols);for(var f=this._getColGroup(e),g=Math.min.apply(Math,f),h=c.indexOf(f,g),i={x:this.columnWidth*h,y:g},j=g+a.size.outerHeight,k=this.cols+1-f.length,l=0;k>l;l++)this.colYs[h+l]=j;return i},d.prototype._getColGroup=function(a){if(2>a)return this.colYs;for(var b=[],c=this.cols+1-a,d=0;c>d;d++){var e=this.colYs.slice(d,d+a);b[d]=Math.max.apply(Math,e)}return b},d.prototype._manageStamp=function(a){var c=b(a),d=this._getElementOffset(a),e=this.options.isOriginLeft?d.left:d.right,f=e+c.outerWidth,g=Math.floor(e/this.columnWidth);g=Math.max(0,g);var h=Math.floor(f/this.columnWidth);h-=f%this.columnWidth?0:1,h=Math.min(this.cols-1,h);for(var i=(this.options.isOriginTop?d.top:d.bottom)+c.outerHeight,j=g;h>=j;j++)this.colYs[j]=Math.max(i,this.colYs[j])},d.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var a={height:this.maxY};return this.options.isFitWidth&&(a.width=this._getContainerFitWidth()),a},d.prototype._getContainerFitWidth=function(){for(var a=0,b=this.cols;--b&&0===this.colYs[b];)a++;return(this.cols-a)*this.columnWidth-this.gutter},d.prototype.needsResizeLayout=function(){var a=this.containerWidth;return this.getContainerWidth(),a!==this.containerWidth},d}),function(a,b){"use strict";"function"==typeof define&&define.amd?define("isotope/js/layout-modes/masonry",["../layout-mode","masonry/masonry"],b):"object"==typeof exports?module.exports=b(require("../layout-mode"),require("masonry-layout")):b(a.Isotope.LayoutMode,a.Masonry)}(window,function(a,b){"use strict";function c(a,b){for(var c in b)a[c]=b[c];return a}var d=a.create("masonry"),e=d.prototype._getElementOffset,f=d.prototype.layout,g=d.prototype._getMeasurement;
c(d.prototype,b.prototype),d.prototype._getElementOffset=e,d.prototype.layout=f,d.prototype._getMeasurement=g;var h=d.prototype.measureColumns;d.prototype.measureColumns=function(){this.items=this.isotope.filteredItems,h.call(this)};var i=d.prototype._manageStamp;return d.prototype._manageStamp=function(){this.options.isOriginLeft=this.isotope.options.isOriginLeft,this.options.isOriginTop=this.isotope.options.isOriginTop,i.apply(this,arguments)},d}),function(a,b){"use strict";"function"==typeof define&&define.amd?define("isotope/js/layout-modes/fit-rows",["../layout-mode"],b):"object"==typeof exports?module.exports=b(require("../layout-mode")):b(a.Isotope.LayoutMode)}(window,function(a){"use strict";var b=a.create("fitRows");return b.prototype._resetLayout=function(){this.x=0,this.y=0,this.maxY=0,this._getMeasurement("gutter","outerWidth")},b.prototype._getItemLayoutPosition=function(a){a.getSize();var b=a.size.outerWidth+this.gutter,c=this.isotope.size.innerWidth+this.gutter;0!==this.x&&b+this.x>c&&(this.x=0,this.y=this.maxY);var d={x:this.x,y:this.y};return this.maxY=Math.max(this.maxY,this.y+a.size.outerHeight),this.x+=b,d},b.prototype._getContainerSize=function(){return{height:this.maxY}},b}),function(a,b){"use strict";"function"==typeof define&&define.amd?define("isotope/js/layout-modes/vertical",["../layout-mode"],b):"object"==typeof exports?module.exports=b(require("../layout-mode")):b(a.Isotope.LayoutMode)}(window,function(a){"use strict";var b=a.create("vertical",{horizontalAlignment:0});return b.prototype._resetLayout=function(){this.y=0},b.prototype._getItemLayoutPosition=function(a){a.getSize();var b=(this.isotope.size.innerWidth-a.size.outerWidth)*this.options.horizontalAlignment,c=this.y;return this.y+=a.size.outerHeight,{x:b,y:c}},b.prototype._getContainerSize=function(){return{height:this.y}},b}),function(a,b){"use strict";"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","matches-selector/matches-selector","fizzy-ui-utils/utils","isotope/js/item","isotope/js/layout-mode","isotope/js/layout-modes/masonry","isotope/js/layout-modes/fit-rows","isotope/js/layout-modes/vertical"],function(c,d,e,f,g,h){return b(a,c,d,e,f,g,h)}):"object"==typeof exports?module.exports=b(a,require("outlayer"),require("get-size"),require("desandro-matches-selector"),require("fizzy-ui-utils"),require("./item"),require("./layout-mode"),require("./layout-modes/masonry"),require("./layout-modes/fit-rows"),require("./layout-modes/vertical")):a.Isotope=b(a,a.Outlayer,a.getSize,a.matchesSelector,a.fizzyUIUtils,a.Isotope.Item,a.Isotope.LayoutMode)}(window,function(a,b,c,d,e,f,g){function h(a,b){return function(c,d){for(var e=0,f=a.length;f>e;e++){var g=a[e],h=c.sortData[g],i=d.sortData[g];if(h>i||i>h){var j=void 0!==b[g]?b[g]:b,k=j?1:-1;return(h>i?1:-1)*k}}return 0}}var i=a.jQuery,j=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^\s+|\s+$/g,"")},k=document.documentElement,l=k.textContent?function(a){return a.textContent}:function(a){return a.innerText},m=b.create("isotope",{layoutMode:"masonry",isJQueryFiltering:!0,sortAscending:!0});m.Item=f,m.LayoutMode=g,m.prototype._create=function(){this.itemGUID=0,this._sorters={},this._getSorters(),b.prototype._create.call(this),this.modes={},this.filteredItems=this.items,this.sortHistory=["original-order"];for(var a in g.modes)this._initLayoutMode(a)},m.prototype.reloadItems=function(){this.itemGUID=0,b.prototype.reloadItems.call(this)},m.prototype._itemize=function(){for(var a=b.prototype._itemize.apply(this,arguments),c=0,d=a.length;d>c;c++){var e=a[c];e.id=this.itemGUID++}return this._updateItemsSortData(a),a},m.prototype._initLayoutMode=function(a){var b=g.modes[a],c=this.options[a]||{};this.options[a]=b.options?e.extend(b.options,c):c,this.modes[a]=new b(this)},m.prototype.layout=function(){return!this._isLayoutInited&&this.options.isInitLayout?void this.arrange():void this._layout()},m.prototype._layout=function(){var a=this._getIsInstant();this._resetLayout(),this._manageStamps(),this.layoutItems(this.filteredItems,a),this._isLayoutInited=!0},m.prototype.arrange=function(a){function b(){d.reveal(c.needReveal),d.hide(c.needHide)}this.option(a),this._getIsInstant();var c=this._filter(this.items);this.filteredItems=c.matches;var d=this;this._bindArrangeComplete(),this._isInstant?this._noTransition(b):b(),this._sort(),this._layout()},m.prototype._init=m.prototype.arrange,m.prototype._getIsInstant=function(){var a=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;return this._isInstant=a,a},m.prototype._bindArrangeComplete=function(){function a(){b&&c&&d&&e.dispatchEvent("arrangeComplete",null,[e.filteredItems])}var b,c,d,e=this;this.once("layoutComplete",function(){b=!0,a()}),this.once("hideComplete",function(){c=!0,a()}),this.once("revealComplete",function(){d=!0,a()})},m.prototype._filter=function(a){var b=this.options.filter;b=b||"*";for(var c=[],d=[],e=[],f=this._getFilterTest(b),g=0,h=a.length;h>g;g++){var i=a[g];if(!i.isIgnored){var j=f(i);j&&c.push(i),j&&i.isHidden?d.push(i):j||i.isHidden||e.push(i)}}return{matches:c,needReveal:d,needHide:e}},m.prototype._getFilterTest=function(a){return i&&this.options.isJQueryFiltering?function(b){return i(b.element).is(a)}:"function"==typeof a?function(b){return a(b.element)}:function(b){return d(b.element,a)}},m.prototype.updateSortData=function(a){var b;a?(a=e.makeArray(a),b=this.getItems(a)):b=this.items,this._getSorters(),this._updateItemsSortData(b)},m.prototype._getSorters=function(){var a=this.options.getSortData;for(var b in a){var c=a[b];this._sorters[b]=n(c)}},m.prototype._updateItemsSortData=function(a){for(var b=a&&a.length,c=0;b&&b>c;c++){var d=a[c];d.updateSortData()}};var n=function(){function a(a){if("string"!=typeof a)return a;var c=j(a).split(" "),d=c[0],e=d.match(/^\[(.+)\]$/),f=e&&e[1],g=b(f,d),h=m.sortDataParsers[c[1]];return a=h?function(a){return a&&h(g(a))}:function(a){return a&&g(a)}}function b(a,b){var c;return c=a?function(b){return b.getAttribute(a)}:function(a){var c=a.querySelector(b);return c&&l(c)}}return a}();m.sortDataParsers={parseInt:function(a){return parseInt(a,10)},parseFloat:function(a){return parseFloat(a)}},m.prototype._sort=function(){var a=this.options.sortBy;if(a){var b=[].concat.apply(a,this.sortHistory),c=h(b,this.options.sortAscending);this.filteredItems.sort(c),a!=this.sortHistory[0]&&this.sortHistory.unshift(a)}},m.prototype._mode=function(){var a=this.options.layoutMode,b=this.modes[a];if(!b)throw new Error("No layout mode: "+a);return b.options=this.options[a],b},m.prototype._resetLayout=function(){b.prototype._resetLayout.call(this),this._mode()._resetLayout()},m.prototype._getItemLayoutPosition=function(a){return this._mode()._getItemLayoutPosition(a)},m.prototype._manageStamp=function(a){this._mode()._manageStamp(a)},m.prototype._getContainerSize=function(){return this._mode()._getContainerSize()},m.prototype.needsResizeLayout=function(){return this._mode().needsResizeLayout()},m.prototype.appended=function(a){var b=this.addItems(a);if(b.length){var c=this._filterRevealAdded(b);this.filteredItems=this.filteredItems.concat(c)}},m.prototype.prepended=function(a){var b=this._itemize(a);if(b.length){this._resetLayout(),this._manageStamps();var c=this._filterRevealAdded(b);this.layoutItems(this.filteredItems),this.filteredItems=c.concat(this.filteredItems),this.items=b.concat(this.items)}},m.prototype._filterRevealAdded=function(a){var b=this._filter(a);return this.hide(b.needHide),this.reveal(b.matches),this.layoutItems(b.matches,!0),b.matches},m.prototype.insert=function(a){var b=this.addItems(a);if(b.length){var c,d,e=b.length;for(c=0;e>c;c++)d=b[c],this.element.appendChild(d.element);var f=this._filter(b).matches;for(c=0;e>c;c++)b[c].isLayoutInstant=!0;for(this.arrange(),c=0;e>c;c++)delete b[c].isLayoutInstant;this.reveal(f)}};var o=m.prototype.remove;return m.prototype.remove=function(a){a=e.makeArray(a);var b=this.getItems(a);o.call(this,a);var c=b&&b.length;if(c)for(var d=0;c>d;d++){var f=b[d];e.removeFrom(this.filteredItems,f)}},m.prototype.shuffle=function(){for(var a=0,b=this.items.length;b>a;a++){var c=this.items[a];c.sortData.random=Math.random()}this.options.sortBy="random",this._sort(),this._layout()},m.prototype._noTransition=function(a){var b=this.options.transitionDuration;this.options.transitionDuration=0;var c=a.call(this);return this.options.transitionDuration=b,c},m.prototype.getFilteredItemElements=function(){for(var a=[],b=0,c=this.filteredItems.length;c>b;b++)a.push(this.filteredItems[b].element);return a},m});

/*!
 * Packery layout mode PACKAGED v1.1.3
 * sub-classes Packery
 * http://packery.metafizzy.co
 */

!function(a){function b(a){return new RegExp("(^|\\s+)"+a+"(\\s+|$)")}function c(a,b){var c=d(a,b)?f:e;c(a,b)}var d,e,f;"classList"in document.documentElement?(d=function(a,b){return a.classList.contains(b)},e=function(a,b){a.classList.add(b)},f=function(a,b){a.classList.remove(b)}):(d=function(a,c){return b(c).test(a.className)},e=function(a,b){d(a,b)||(a.className=a.className+" "+b)},f=function(a,c){a.className=a.className.replace(b(c)," ")});var g={hasClass:d,addClass:e,removeClass:f,toggleClass:c,has:d,add:e,remove:f,toggle:c};"function"==typeof define&&define.amd?define("classie/classie",g):"object"==typeof exports?module.exports=g:a.classie=g}(window),function(a,b){"function"==typeof define&&define.amd?define("packery/js/rect",b):"object"==typeof exports?module.exports=b():(a.Packery=a.Packery||{},a.Packery.Rect=b())}(window,function(){function a(b){for(var c in a.defaults)this[c]=a.defaults[c];for(c in b)this[c]=b[c]}var b=window.Packery=function(){};return b.Rect=a,a.defaults={x:0,y:0,width:0,height:0},a.prototype.contains=function(a){var b=a.width||0,c=a.height||0;return this.x<=a.x&&this.y<=a.y&&this.x+this.width>=a.x+b&&this.y+this.height>=a.y+c},a.prototype.overlaps=function(a){var b=this.x+this.width,c=this.y+this.height,d=a.x+a.width,e=a.y+a.height;return this.x<d&&b>a.x&&this.y<e&&c>a.y},a.prototype.getMaximalFreeRects=function(b){if(!this.overlaps(b))return!1;var c,d=[],e=this.x+this.width,f=this.y+this.height,g=b.x+b.width,h=b.y+b.height;return this.y<b.y&&(c=new a({x:this.x,y:this.y,width:this.width,height:b.y-this.y}),d.push(c)),e>g&&(c=new a({x:g,y:this.y,width:e-g,height:this.height}),d.push(c)),f>h&&(c=new a({x:this.x,y:h,width:this.width,height:f-h}),d.push(c)),this.x<b.x&&(c=new a({x:this.x,y:this.y,width:b.x-this.x,height:this.height}),d.push(c)),d},a.prototype.canFit=function(a){return this.width>=a.width&&this.height>=a.height},a}),function(a,b){if("function"==typeof define&&define.amd)define("packery/js/packer",["./rect"],b);else if("object"==typeof exports)module.exports=b(require("./rect"));else{var c=a.Packery=a.Packery||{};c.Packer=b(c.Rect)}}(window,function(a){function b(a,b,c){this.width=a||0,this.height=b||0,this.sortDirection=c||"downwardLeftToRight",this.reset()}b.prototype.reset=function(){this.spaces=[],this.newSpaces=[];var b=new a({x:0,y:0,width:this.width,height:this.height});this.spaces.push(b),this.sorter=c[this.sortDirection]||c.downwardLeftToRight},b.prototype.pack=function(a){for(var b=0,c=this.spaces.length;c>b;b++){var d=this.spaces[b];if(d.canFit(a)){this.placeInSpace(a,d);break}}},b.prototype.placeInSpace=function(a,b){a.x=b.x,a.y=b.y,this.placed(a)},b.prototype.placed=function(a){for(var b=[],c=0,d=this.spaces.length;d>c;c++){var e=this.spaces[c],f=e.getMaximalFreeRects(a);f?b.push.apply(b,f):b.push(e)}this.spaces=b,this.mergeSortSpaces()},b.prototype.mergeSortSpaces=function(){b.mergeRects(this.spaces),this.spaces.sort(this.sorter)},b.prototype.addSpace=function(a){this.spaces.push(a),this.mergeSortSpaces()},b.mergeRects=function(a){for(var b=0,c=a.length;c>b;b++){var d=a[b];if(d){var e=a.slice(0);e.splice(b,1);for(var f=0,g=0,h=e.length;h>g;g++){var i=e[g],j=b>g?0:1;d.contains(i)&&(a.splice(g+j-f,1),f++)}}}return a};var c={downwardLeftToRight:function(a,b){return a.y-b.y||a.x-b.x},rightwardTopToBottom:function(a,b){return a.x-b.x||a.y-b.y}};return b}),function(a,b){"function"==typeof define&&define.amd?define("packery/js/item",["get-style-property/get-style-property","outlayer/outlayer","./rect"],b):"object"==typeof exports?module.exports=b(require("desandro-get-style-property"),require("outlayer"),require("./rect")):a.Packery.Item=b(a.getStyleProperty,a.Outlayer,a.Packery.Rect)}(window,function(a,b,c){var d=a("transform"),e=function(){b.Item.apply(this,arguments)};e.prototype=new b.Item;var f=e.prototype._create;return e.prototype._create=function(){f.call(this),this.rect=new c,this.placeRect=new c},e.prototype.dragStart=function(){this.getPosition(),this.removeTransitionStyles(),this.isTransitioning&&d&&(this.element.style[d]="none"),this.getSize(),this.isPlacing=!0,this.needsPositioning=!1,this.positionPlaceRect(this.position.x,this.position.y),this.isTransitioning=!1,this.didDrag=!1},e.prototype.dragMove=function(a,b){this.didDrag=!0;var c=this.layout.size;a-=c.paddingLeft,b-=c.paddingTop,this.positionPlaceRect(a,b)},e.prototype.dragStop=function(){this.getPosition();var a=this.position.x!=this.placeRect.x,b=this.position.y!=this.placeRect.y;this.needsPositioning=a||b,this.didDrag=!1},e.prototype.positionPlaceRect=function(a,b,c){this.placeRect.x=this.getPlaceRectCoord(a,!0),this.placeRect.y=this.getPlaceRectCoord(b,!1,c)},e.prototype.getPlaceRectCoord=function(a,b,c){var d=b?"Width":"Height",e=this.size["outer"+d],f=this.layout[b?"columnWidth":"rowHeight"],g=this.layout.size["inner"+d];b||(g=Math.max(g,this.layout.maxY),this.layout.rowHeight||(g-=this.layout.gutter));var h;if(f){f+=this.layout.gutter,g+=b?this.layout.gutter:0,a=Math.round(a/f);var i;i=this.layout.options.isHorizontal?b?"ceil":"floor":b?"floor":"ceil";var j=Math[i](g/f);j-=Math.ceil(e/f),h=j}else h=g-e;return a=c?a:Math.min(a,h),a*=f||1,Math.max(0,a)},e.prototype.copyPlaceRectPosition=function(){this.rect.x=this.placeRect.x,this.rect.y=this.placeRect.y},e.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.layout.packer.addSpace(this.rect),this.emitEvent("remove",[this])},e}),function(a,b){"function"==typeof define&&define.amd?define("packery/js/packery",["classie/classie","get-size/get-size","outlayer/outlayer","./rect","./packer","./item"],b):"object"==typeof exports?module.exports=b(require("desandro-classie"),require("get-size"),require("outlayer"),require("./rect"),require("./packer"),require("./item")):a.Packery=b(a.classie,a.getSize,a.Outlayer,a.Packery.Rect,a.Packery.Packer,a.Packery.Item)}(window,function(a,b,c,d,e,f){function g(a,b){return a.position.y-b.position.y||a.position.x-b.position.x}function h(a,b){return a.position.x-b.position.x||a.position.y-b.position.y}d.prototype.canFit=function(a){return this.width>=a.width-1&&this.height>=a.height-1};var i=c.create("packery");return i.Item=f,i.prototype._create=function(){c.prototype._create.call(this),this.packer=new e,this.stamp(this.options.stamped);var a=this;this.handleDraggabilly={dragStart:function(){a.itemDragStart(this.element)},dragMove:function(){a.itemDragMove(this.element,this.position.x,this.position.y)},dragEnd:function(){a.itemDragEnd(this.element)}},this.handleUIDraggable={start:function(b){a.itemDragStart(b.currentTarget)},drag:function(b,c){a.itemDragMove(b.currentTarget,c.position.left,c.position.top)},stop:function(b){a.itemDragEnd(b.currentTarget)}}},i.prototype._resetLayout=function(){this.getSize(),this._getMeasurements();var a=this.packer;this.options.isHorizontal?(a.width=Number.POSITIVE_INFINITY,a.height=this.size.innerHeight+this.gutter,a.sortDirection="rightwardTopToBottom"):(a.width=this.size.innerWidth+this.gutter,a.height=Number.POSITIVE_INFINITY,a.sortDirection="downwardLeftToRight"),a.reset(),this.maxY=0,this.maxX=0},i.prototype._getMeasurements=function(){this._getMeasurement("columnWidth","width"),this._getMeasurement("rowHeight","height"),this._getMeasurement("gutter","width")},i.prototype._getItemLayoutPosition=function(a){return this._packItem(a),a.rect},i.prototype._packItem=function(a){this._setRectSize(a.element,a.rect),this.packer.pack(a.rect),this._setMaxXY(a.rect)},i.prototype._setMaxXY=function(a){this.maxX=Math.max(a.x+a.width,this.maxX),this.maxY=Math.max(a.y+a.height,this.maxY)},i.prototype._setRectSize=function(a,c){var d=b(a),e=d.outerWidth,f=d.outerHeight;(e||f)&&(e=this._applyGridGutter(e,this.columnWidth),f=this._applyGridGutter(f,this.rowHeight)),c.width=Math.min(e,this.packer.width),c.height=Math.min(f,this.packer.height)},i.prototype._applyGridGutter=function(a,b){if(!b)return a+this.gutter;b+=this.gutter;var c=a%b,d=c&&1>c?"round":"ceil";return a=Math[d](a/b)*b},i.prototype._getContainerSize=function(){return this.options.isHorizontal?{width:this.maxX-this.gutter}:{height:this.maxY-this.gutter}},i.prototype._manageStamp=function(a){var b,c=this.getItem(a);if(c&&c.isPlacing)b=c.placeRect;else{var e=this._getElementOffset(a);b=new d({x:this.options.isOriginLeft?e.left:e.right,y:this.options.isOriginTop?e.top:e.bottom})}this._setRectSize(a,b),this.packer.placed(b),this._setMaxXY(b)},i.prototype.sortItemsByPosition=function(){var a=this.options.isHorizontal?h:g;this.items.sort(a)},i.prototype.fit=function(a,b,c){var d=this.getItem(a);d&&(this._getMeasurements(),this.stamp(d.element),d.getSize(),d.isPlacing=!0,b=void 0===b?d.rect.x:b,c=void 0===c?d.rect.y:c,d.positionPlaceRect(b,c,!0),this._bindFitEvents(d),d.moveTo(d.placeRect.x,d.placeRect.y),this.layout(),this.unstamp(d.element),this.sortItemsByPosition(),d.isPlacing=!1,d.copyPlaceRectPosition())},i.prototype._bindFitEvents=function(a){function b(){d++,2==d&&c.emitEvent("fitComplete",[a])}var c=this,d=0;a.on("layout",function(){return b(),!0}),this.on("layoutComplete",function(){return b(),!0})},i.prototype.resize=function(){var a=b(this.element),c=this.size&&a,d=this.options.isHorizontal?"innerHeight":"innerWidth";c&&a[d]==this.size[d]||this.layout()},i.prototype.itemDragStart=function(a){this.stamp(a);var b=this.getItem(a);b&&b.dragStart()},i.prototype.itemDragMove=function(a,b,c){function d(){f.layout(),delete f.dragTimeout}var e=this.getItem(a);e&&e.dragMove(b,c);var f=this;this.clearDragTimeout(),this.dragTimeout=setTimeout(d,40)},i.prototype.clearDragTimeout=function(){this.dragTimeout&&clearTimeout(this.dragTimeout)},i.prototype.itemDragEnd=function(b){var c,d=this.getItem(b);if(d&&(c=d.didDrag,d.dragStop()),!d||!c&&!d.needsPositioning)return void this.unstamp(b);a.add(d.element,"is-positioning-post-drag");var e=this._getDragEndLayoutComplete(b,d);d.needsPositioning?(d.on("layout",e),d.moveTo(d.placeRect.x,d.placeRect.y)):d&&d.copyPlaceRectPosition(),this.clearDragTimeout(),this.on("layoutComplete",e),this.layout()},i.prototype._getDragEndLayoutComplete=function(b,c){var d=c&&c.needsPositioning,e=0,f=d?2:1,g=this;return function(){return e++,e!=f?!0:(c&&(a.remove(c.element,"is-positioning-post-drag"),c.isPlacing=!1,c.copyPlaceRectPosition()),g.unstamp(b),g.sortItemsByPosition(),d&&g.emitEvent("dragItemPositioned",[c]),!0)}},i.prototype.bindDraggabillyEvents=function(a){a.on("dragStart",this.handleDraggabilly.dragStart),a.on("dragMove",this.handleDraggabilly.dragMove),a.on("dragEnd",this.handleDraggabilly.dragEnd)},i.prototype.bindUIDraggableEvents=function(a){a.on("dragstart",this.handleUIDraggable.start).on("drag",this.handleUIDraggable.drag).on("dragstop",this.handleUIDraggable.stop)},i.Rect=d,i.Packer=e,i}),function(a,b){"function"==typeof define&&define.amd?define(["isotope/js/layout-mode","packery/js/packery","get-size/get-size"],b):"object"==typeof exports?module.exports=b(require("isotope-layout/js/layout-mode"),require("packery"),require("get-size")):b(a.Isotope.LayoutMode,a.Packery,a.getSize)}(window,function(a,b,c){function d(a,b){for(var c in b)a[c]=b[c];return a}var e=a.create("packery"),f=e.prototype._getElementOffset,g=e.prototype._getMeasurement;d(e.prototype,b.prototype),e.prototype._getElementOffset=f,e.prototype._getMeasurement=g;var h=e.prototype._resetLayout;e.prototype._resetLayout=function(){this.packer=this.packer||new b.Packer,h.apply(this,arguments)};var i=e.prototype._getItemLayoutPosition;e.prototype._getItemLayoutPosition=function(a){return a.rect=a.rect||new b.Rect,i.call(this,a)};var j=e.prototype._manageStamp;return e.prototype._manageStamp=function(){this.options.isOriginLeft=this.isotope.options.isOriginLeft,this.options.isOriginTop=this.isotope.options.isOriginTop,j.apply(this,arguments)},e.prototype.needsResizeLayout=function(){var a=c(this.element),b=this.size&&a,d=this.options.isHorizontal?"innerHeight":"innerWidth";return b&&a[d]!=this.size[d]},e});

/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function(){function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var i=e.prototype,r=this,o=r.EventEmitter;i.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},i.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},i.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},i.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},i.on=n("addListener"),i.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},i.once=n("addOnceListener"),i.defineEvent=function(e){return this.getListeners(e),this},i.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},i.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},i.off=n("removeListener"),i.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},i.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},i.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},i.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},i.removeAllListeners=n("removeEvent"),i.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],n.once===!0&&this.removeListener(e,n.listener),o=n.listener.apply(this,t||[]),o===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},i.trigger=n("emitEvent"),i.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},i.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return r.EventEmitter=o,e},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){function t(t){var n=e.event;return n.target=n.target||n.srcElement||t,n}var n=document.documentElement,i=function(){};n.addEventListener?i=function(e,t,n){e.addEventListener(t,n,!1)}:n.attachEvent&&(i=function(e,n,i){e[n+i]=i.handleEvent?function(){var n=t(e);i.handleEvent.call(i,n)}:function(){var n=t(e);i.call(e,n)},e.attachEvent("on"+n,e[n+i])});var r=function(){};n.removeEventListener?r=function(e,t,n){e.removeEventListener(t,n,!1)}:n.detachEvent&&(r=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var o={bind:i,unbind:r};"function"==typeof define&&define.amd?define("eventie/eventie",o):e.eventie=o}(this),function(e,t){"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(n,i){return t(e,n,i)}):"object"==typeof exports?module.exports=t(e,require("wolfy87-eventemitter"),require("eventie")):e.imagesLoaded=t(e,e.EventEmitter,e.eventie)}(window,function(e,t,n){function i(e,t){for(var n in t)e[n]=t[n];return e}function r(e){return"[object Array]"===d.call(e)}function o(e){var t=[];if(r(e))t=e;else if("number"==typeof e.length)for(var n=0,i=e.length;i>n;n++)t.push(e[n]);else t.push(e);return t}function s(e,t,n){if(!(this instanceof s))return new s(e,t);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=o(e),this.options=i({},this.options),"function"==typeof t?n=t:i(this.options,t),n&&this.on("always",n),this.getImages(),a&&(this.jqDeferred=new a.Deferred);var r=this;setTimeout(function(){r.check()})}function f(e){this.img=e}function c(e){this.src=e,v[e]=this}var a=e.jQuery,u=e.console,h=u!==void 0,d=Object.prototype.toString;s.prototype=new t,s.prototype.options={},s.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);var i=n.nodeType;if(i&&(1===i||9===i||11===i))for(var r=n.querySelectorAll("img"),o=0,s=r.length;s>o;o++){var f=r[o];this.addImage(f)}}},s.prototype.addImage=function(e){var t=new f(e);this.images.push(t)},s.prototype.check=function(){function e(e,r){return t.options.debug&&h&&u.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},s.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify&&t.jqDeferred.notify(t,e)})},s.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},a&&(a.fn.imagesLoaded=function(e,t){var n=new s(this,e,t);return n.jqDeferred.promise(a(this))}),f.prototype=new t,f.prototype.check=function(){var e=v[this.img.src]||new c(this.img.src);if(e.isConfirmed)return this.confirm(e.isLoaded,"cached was confirmed"),void 0;if(this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this;e.on("confirm",function(e,n){return t.confirm(e.isLoaded,n),!0}),e.check()},f.prototype.confirm=function(e,t){this.isLoaded=e,this.emit("confirm",this,t)};var v={};return c.prototype=new t,c.prototype.check=function(){if(!this.isChecked){var e=new Image;n.bind(e,"load",this),n.bind(e,"error",this),e.src=this.src,this.isChecked=!0}},c.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},c.prototype.onload=function(e){this.confirm(!0,"onload"),this.unbindProxyEvents(e)},c.prototype.onerror=function(e){this.confirm(!1,"onerror"),this.unbindProxyEvents(e)},c.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},c.prototype.unbindProxyEvents=function(e){n.unbind(e.target,"load",this),n.unbind(e.target,"error",this)},s});

/*!

   Flowplayer v6.0.3 (Thursday, 23. July 2015 09:32PM) | flowplayer.org/license

*/
!function(e){function t(e,t,n,r){for(var i,a=n.slice(),l=o(t,e),s=0,u=a.length;u>s&&(handler=a[s],"object"==typeof handler&&"function"==typeof handler.handleEvent?handler.handleEvent(l):handler.call(e,l),!l.stoppedImmediatePropagation);s++);return i=!l.stoppedPropagation,r&&i&&e.parentNode?e.parentNode.dispatchEvent(l):!l.defaultPrevented}function n(e,t){return{configurable:!0,get:e,set:t}}function r(e,t,r){var o=y(t||e,r);h(e,"textContent",n(function(){return o.get.call(this)},function(e){o.set.call(this,e)}))}function o(e,t){return e.currentTarget=t,e.eventPhase=e.target===e.currentTarget?2:3,e}function i(e,t){for(var n=e.length;n--&&e[n]!==t;);return n}function a(){if("BR"===this.tagName)return"\n";for(var e=this.firstChild,t=[];e;)8!==e.nodeType&&7!==e.nodeType&&t.push(e.textContent),e=e.nextSibling;return t.join("")}function l(e){var t=document.createEvent("Event");t.initEvent("input",!0,!0),(e.srcElement||e.fromElement||document).dispatchEvent(t)}function s(e){!d&&k.test(document.readyState)&&(d=!d,document.detachEvent(p,s),e=document.createEvent("Event"),e.initEvent(v,!0,!0),document.dispatchEvent(e))}function u(e){for(var t;t=this.lastChild;)this.removeChild(t);null!=e&&this.appendChild(document.createTextNode(e))}function c(t,n){return n||(n=e.event),n.target||(n.target=n.srcElement||n.fromElement||document),n.timeStamp||(n.timeStamp=(new Date).getTime()),n}if(!document.createEvent){var f=!0,d=!1,p="onreadystatechange",v="DOMContentLoaded",m="__IE8__"+Math.random(),h=Object.defineProperty||function(e,t,n){e[t]=n.value},g=Object.defineProperties||function(t,n){for(var r in n)if(b.call(n,r))try{h(t,r,n[r])}catch(o){e.console&&console.log(r+" failed on object:",t,o.message)}},y=Object.getOwnPropertyDescriptor,b=Object.prototype.hasOwnProperty,w=e.Element.prototype,x=e.Text.prototype,E=/^[a-z]+$/,k=/loaded|complete/,T={},S=document.createElement("div");r(e.HTMLCommentElement.prototype,w,"nodeValue"),r(e.HTMLScriptElement.prototype,null,"text"),r(x,null,"nodeValue"),r(e.HTMLTitleElement.prototype,null,"text"),h(e.HTMLStyleElement.prototype,"textContent",function(e){return n(function(){return e.get.call(this.styleSheet)},function(t){e.set.call(this.styleSheet,t)})}(y(e.CSSStyleSheet.prototype,"cssText"))),g(w,{textContent:{get:a,set:u},firstElementChild:{get:function(){for(var e=this.childNodes||[],t=0,n=e.length;n>t;t++)if(1==e[t].nodeType)return e[t]}},lastElementChild:{get:function(){for(var e=this.childNodes||[],t=e.length;t--;)if(1==e[t].nodeType)return e[t]}},oninput:{get:function(){return this._oninput||null},set:function(e){this._oninput&&(this.removeEventListener("input",this._oninput),this._oninput=e,e&&this.addEventListener("input",e))}},previousElementSibling:{get:function(){for(var e=this.previousSibling;e&&1!=e.nodeType;)e=e.previousSibling;return e}},nextElementSibling:{get:function(){for(var e=this.nextSibling;e&&1!=e.nodeType;)e=e.nextSibling;return e}},childElementCount:{get:function(){for(var e=0,t=this.childNodes||[],n=t.length;n--;e+=1==t[n].nodeType);return e}},addEventListener:{value:function(e,n,r){var o,a=this,s="on"+e,u=a[m]||h(a,m,{value:{}})[m],f=u[s]||(u[s]={}),d=f.h||(f.h=[]);if(!b.call(f,"w")){if(f.w=function(e){return e[m]||t(a,c(a,e),d,!1)},!b.call(T,s))if(E.test(e))try{o=document.createEventObject(),o[m]=!0,9!=a.nodeType&&null==a.parentNode&&S.appendChild(a),a.fireEvent(s,o),T[s]=!0}catch(o){for(T[s]=!1;S.hasChildNodes();)S.removeChild(S.firstChild)}else T[s]=!1;(f.n=T[s])&&a.attachEvent(s,f.w)}i(d,n)<0&&d[r?"unshift":"push"](n),"input"===e&&a.attachEvent("onkeyup",l)}},dispatchEvent:{value:function(e){var n,r=this,o="on"+e.type,i=r[m],a=i&&i[o],l=!!a;return e.target||(e.target=r),l?a.n?r.fireEvent(o,e):t(r,e,a.h,!0):(n=r.parentNode)?n.dispatchEvent(e):!0,!e.defaultPrevented}},removeEventListener:{value:function(e,t,n){var r=this,o="on"+e,a=r[m],l=a&&a[o],s=l&&l.h,u=s?i(s,t):-1;u>-1&&s.splice(u,1)}}}),g(x,{addEventListener:{value:w.addEventListener},dispatchEvent:{value:w.dispatchEvent},removeEventListener:{value:w.removeEventListener}}),g(e.XMLHttpRequest.prototype,{addEventListener:{value:function(e,t,n){var r=this,o="on"+e,a=r[m]||h(r,m,{value:{}})[m],l=a[o]||(a[o]={}),s=l.h||(l.h=[]);i(s,t)<0&&(r[o]||(r[o]=function(){var t=document.createEvent("Event");t.initEvent(e,!0,!0),r.dispatchEvent(t)}),s[n?"unshift":"push"](t))}},dispatchEvent:{value:function(e){var n=this,r="on"+e.type,o=n[m],i=o&&o[r],a=!!i;return a&&(i.n?n.fireEvent(r,e):t(n,e,i.h,!0))}},removeEventListener:{value:w.removeEventListener}}),g(e.Event.prototype,{bubbles:{value:!0,writable:!0},cancelable:{value:!0,writable:!0},preventDefault:{value:function(){this.cancelable&&(this.defaultPrevented=!0,this.returnValue=!1)}},stopPropagation:{value:function(){this.stoppedPropagation=!0,this.cancelBubble=!0}},stopImmediatePropagation:{value:function(){this.stoppedImmediatePropagation=!0,this.stopPropagation()}},initEvent:{value:function(e,t,n){this.type=e,this.bubbles=!!t,this.cancelable=!!n,this.bubbles||this.stopPropagation()}}}),g(e.HTMLDocument.prototype,{defaultView:{get:function(){return this.parentWindow}},textContent:{get:function(){return 11===this.nodeType?a.call(this):null},set:function(e){11===this.nodeType&&u.call(this,e)}},addEventListener:{value:function(t,n,r){var o=this;w.addEventListener.call(o,t,n,r),f&&t===v&&!k.test(o.readyState)&&(f=!1,o.attachEvent(p,s),e==top&&function i(e){try{o.documentElement.doScroll("left"),s()}catch(t){setTimeout(i,50)}}())}},dispatchEvent:{value:w.dispatchEvent},removeEventListener:{value:w.removeEventListener},createEvent:{value:function(e){var t;if("Event"!==e)throw new Error("unsupported "+e);return t=document.createEventObject(),t.timeStamp=(new Date).getTime(),t}}}),g(e.Window.prototype,{getComputedStyle:{value:function(){function e(e){this._=e}function t(){}var n=/^(?:[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/,r=/^(top|right|bottom|left)$/,o=/\-([a-z])/g,i=function(e,t){return t.toUpperCase()};return e.prototype.getPropertyValue=function(e){var t,a,l,s=this._,u=s.style,c=s.currentStyle,f=s.runtimeStyle;return e=("float"===e?"style-float":e).replace(o,i),t=c?c[e]:u[e],n.test(t)&&!r.test(e)&&(a=u.left,l=f&&f.left,l&&(f.left=c.left),u.left="fontSize"===e?"1em":t,t=u.pixelLeft+"px",u.left=a,l&&(f.left=l)),null==t?t:t+""||"auto"},t.prototype.getPropertyValue=function(){return null},function(n,r){return r?new t(n):new e(n)}}()},addEventListener:{value:function(n,r,o){var a,l=e,s="on"+n;l[s]||(l[s]=function(e){return t(l,c(l,e),a,!1)}),a=l[s][m]||(l[s][m]=[]),i(a,r)<0&&a[o?"unshift":"push"](r)}},dispatchEvent:{value:function(t){var n=e["on"+t.type];return n?n.call(e,t)!==!1&&!t.defaultPrevented:!0}},removeEventListener:{value:function(t,n,r){var o="on"+t,a=(e[o]||Object)[m],l=a?i(a,n):-1;l>-1&&a.splice(l,1)}}})}}(this),!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;"undefined"!=typeof window?t=window:"undefined"!=typeof global?t=global:"undefined"!=typeof self&&(t=self),t.flowplayer=e()}}(function(){var e;return function t(e,n,r){function o(a,l){if(!n[a]){if(!e[a]){var s="function"==typeof require&&require;if(!l&&s)return s(a,!0);if(i)return i(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var c=n[a]={exports:{}};e[a][0].call(c.exports,function(t){var n=e[a][1][t];return o(n?n:t)},c,c.exports,t,e,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(e,t,n){"use strict";var r=t.exports={},o=e("class-list"),i=window.jQuery,a=e("punycode"),l=e("computed-style");r.noop=function(){},r.identity=function(e){return e},r.removeNode=function(e){e&&e.parentNode&&e.parentNode.removeChild(e)},r.find=function(e,t){return i?i(e,t).toArray():(t=t||document,Array.prototype.map.call(t.querySelectorAll(e),function(e){return e}))},r.text=function(e,t){e["innerText"in e?"innerText":"textContent"]=t},r.findDirect=function(e,t){return r.find(e,t).filter(function(e){return e.parentNode===t})},r.hasClass=function(e,t){return o(e).contains(t)},r.css=function(e,t,n){return"object"==typeof t?Object.keys(t).forEach(function(n){r.css(e,n,t[n])}):"undefined"!=typeof n?""===n?e?e.style.removeProperty(t):void 0:e?e.style.setProperty(t,n):void 0:e?l(e,t):void 0},r.createElement=function(e,t,n){try{var o=document.createElement(e);for(var a in t)t.hasOwnProperty(a)&&("css"===a?r.css(o,t[a]):r.attr(o,a,t[a]));return o.innerHTML=n||"",o}catch(l){if(!i)throw l;return i("<"+e+">"+n+"</"+e+">").attr(t)[0]}},r.toggleClass=function(e,t,n){if(e){var r=o(e);"undefined"==typeof n?r.toggle(t):n?r.add(t):n||r.remove(t)}},r.addClass=function(e,t){return r.toggleClass(e,t,!0)},r.removeClass=function(e,t){return r.toggleClass(e,t,!1)},r.append=function(e,t){return e.appendChild(t),e},r.appendTo=function(e,t){return r.append(t,e),e},r.prepend=function(e,t){e.insertBefore(t,e.firstChild)},r.insertAfter=function(e,t,n){t==r.lastChild(e)&&e.appendChild(n);var o=Array.prototype.indexOf.call(e.children,t);e.insertBefore(n,e.children[o+1])},r.html=function(e,t){e=e.length?e:[e],e.forEach(function(e){e.innerHTML=t})},r.attr=function(e,t,n){if("class"===t&&(t="className"),r.hasOwnOrPrototypeProperty(e,t))try{e[t]=n}catch(o){if(!i)throw o;i(e).attr(t,n)}else n===!1?e.removeAttribute(t):e.setAttribute(t,n);return e},r.prop=function(e,t,n){return"undefined"==typeof n?e&&e[t]:void(e[t]=n)},r.offset=function(e){var t=e.getBoundingClientRect();return e.offsetWidth/e.offsetHeight>e.clientWidth/e.clientHeight&&(t={left:100*t.left,right:100*t.right,top:100*t.top,bottom:100*t.bottom,width:100*t.width,height:100*t.height}),t},r.width=function(e,t){if(t)return e.style.width=(""+t).replace(/px$/,"")+"px";var n=r.offset(e).width;return"undefined"==typeof n?e.offsetWidth:n},r.height=function(e,t){if(t)return e.style.height=(""+t).replace(/px$/,"")+"px";var n=r.offset(e).height;return"undefined"==typeof n?e.offsetHeight:n},r.lastChild=function(e){return e.children[e.children.length-1]},r.hasParent=function(e,t){for(var n=e.parentElement;n;){if(r.matches(n,t))return!0;n=n.parentElement}return!1},r.createAbsoluteUrl=function(e){return r.createElement("a",{href:e}).href},r.xhrGet=function(e,t,n){var r=new XMLHttpRequest;r.onreadystatechange=function(){return 4===this.readyState?this.status>=400?n():void t(this.responseText):void 0},r.open("get",e,!0),r.send()},r.pick=function(e,t){var n={};return t.forEach(function(t){e.hasOwnProperty(t)&&(n[t]=e[t])}),n},r.hostname=function(e){return a.toUnicode(e||window.location.hostname)},r.browser={webkit:"WebkitAppearance"in document.documentElement.style},r.getPrototype=function(e){return Object.getPrototypeOf?Object.getPrototypeOf(e):e.__proto__},r.hasOwnOrPrototypeProperty=function(e,t){for(var n=e;n;){if(Object.prototype.hasOwnProperty.call(n,t))return!0;n=r.getPrototype(n)}return!1},r.matches=function(e,t){var n=Element.prototype,r=n.matches||n.matchesSelector||n.mozMatchesSelector||n.msMatchesSelector||n.oMatchesSelector||n.webkitMatchesSelector||function(e){for(var t=this,n=(t.document||t.ownerDocument).querySelectorAll(e),r=0;n[r]&&n[r]!==t;)r++;return n[r]?!0:!1};return r.call(e,t)},function(e){function t(e){return e.replace(/-[a-z]/g,function(e){return e[1].toUpperCase()})}"undefined"!=typeof e.setAttribute&&(e.setProperty=function(e,n){return this.setAttribute(t(e),String(n))},e.getPropertyValue=function(e){return this.getAttribute(t(e))||null},e.removeProperty=function(e){var n=this.getPropertyValue(e);return this.removeAttribute(t(e)),n})}(window.CSSStyleDeclaration.prototype)},{"class-list":22,"computed-style":24,punycode:21}],2:[function(e,t,n){"use strict";var r=e("../common");t.exports=function(e,t,n,o){n=n||"opaque";var i="obj"+(""+Math.random()).slice(2,15),a='<object class="fp-engine" id="'+i+'" name="'+i+'" ',l=navigator.userAgent.indexOf("MSIE")>-1;a+=l?'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">':' data="'+e+'" type="application/x-shockwave-flash">';var s={width:"100%",height:"100%",allowscriptaccess:"always",wmode:n,quality:"high",flashvars:"",movie:e+(l?"?"+i:""),name:i};"transparent"!==n&&(s.bgcolor=o||"#333333"),Object.keys(t).forEach(function(e){s.flashvars+=e+"="+t[e]+"&"}),Object.keys(s).forEach(function(e){a+='<param name="'+e+'" value="'+s[e]+'"/>'}),a+="</object>";var u=r.createElement("div",{},a);return r.find("object",u)},window.attachEvent&&window.attachEvent("onbeforeunload",function(){__flash_savedUnloadHandler=__flash_unloadHandler=function(){}})},{"../common":1}],3:[function(e,t,n){"use strict";var r,o=e("../flowplayer"),i=e("../common"),a=e("./embed"),l=e("extend-object"),s=e("bean");r=function(e,t){function n(e){function t(e){return("0"+parseInt(e).toString(16)).slice(-2)}return(e=e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/))?"#"+t(e[1])+t(e[2])+t(e[3]):void 0}function u(e){if(7===e.length)return e;var t=e.split("").slice(1);return"#"+t.map(function(e){return e+e}).join("")}function c(e){return/application\/x-mpegurl/i.test(e.type)}var f,d,p,v=e.conf,m=(e.video,window,{engineName:r.engineName,pick:function(t){if(o.support.flashVideo){for(var n,r,i=0;i<t.length;i++)if(r=t[i],/mp4|flv|flash/i.test(r.type)&&(n=r),e.conf.swfHls&&/mpegurl/i.test(r.type)&&(n=r),n&&!/mp4/i.test(n.type))return n;return n}},load:function(r){function h(e){return e.replace(/&amp;/g,"%26").replace(/&/g,"%26").replace(/=/g,"%3D")}f=r;var g=i.findDirect("video",t)[0]||i.find(".fp-player > video",t)[0],y=h(r.src),b=/^https?:/.test(y),w=function(){i.removeNode(g)},x=function(e){return e.some(function(e){return!!g.canPlayType(e.type)})};o.support.video&&i.prop(g,"autoplay")&&x(r.sources)?s.one(g,"timeupdate",w):w();var E=r.rtmp||v.rtmp;if(b||E||(y=i.createAbsoluteUrl(y)),p&&c(r)&&p.data!==v.swfHls&&m.unload(),p){["live","preload","loop"].forEach(function(e){r.hasOwnProperty(e)&&p.__set(e,r[e])}),Object.keys(r.flashls||{}).forEach(function(e){p.__set("hls_"+e,r.flashls[e])});var k=!1;if(!b&&E)p.__set("rtmp",E.url||E);else{var T=p.__get("rtmp");k=!!T,p.__set("rtmp",null)}p.__play(y,k||r.rtmp&&r.rtmp!==v.rtmp)}else{d="fpCallback"+(""+Math.random()).slice(3,15);var S={hostname:v.embedded?i.hostname(v.hostname):i.hostname(location.hostname),url:y,callback:d};t.getAttribute("data-origin")&&(S.origin=t.getAttribute("data-origin")),["proxy","key","autoplay","preload","subscribe","live","loop","debug","splash","poster","rtmpt"].forEach(function(e){v.hasOwnProperty(e)&&(S[e]=v[e]),r.hasOwnProperty(e)&&(S[e]=r[e]),(v.rtmp||{}).hasOwnProperty(e)&&(S[e]=(v.rtmp||{})[e]),(r.rtmp||{}).hasOwnProperty(e)&&(S[e]=(r.rtmp||{})[e])}),v.rtmp&&(S.rtmp=v.rtmp.url||v.rtmp),r.rtmp&&(S.rtmp=r.rtmp.url||r.rtmp),Object.keys(r.flashls||{}).forEach(function(e){var t=r.flashls[e];S["hls_"+e]=t}),void 0!==v.bufferTime&&(S.bufferTime=v.bufferTime),b&&delete S.rtmp,S.rtmp&&(S.rtmp=h(S.rtmp));var C,N=i.css(t,"background-color")||"";0===N.indexOf("rgb")?C=n(N):0===N.indexOf("#")&&(C=u(N)),S.initialVolume=e.volumeLevel;var O=c(r)?v.swfHls:v.swf;p=a(O,S,v.wmode,C)[0];var j=i.find(".fp-player",t)[0];i.prepend(j,p),setTimeout(function(){try{if(!p.PercentLoaded())return e.trigger("error",[e,{code:7,url:v.swf}])}catch(t){}},5e3),setTimeout(function(){"undefined"==typeof p.PercentLoaded&&e.trigger("flashdisabled",[e])},1e3),p.pollInterval=setInterval(function(){if(p){var t=p.__status?p.__status():null;t&&(e.playing&&t.time&&t.time!==e.video.time&&e.trigger("progress",[e,t.time]),r.buffer=t.buffer/r.bytes*r.duration,e.trigger("buffer",[e,r.buffer]),!r.buffered&&t.time>0&&(r.buffered=!0,e.trigger("buffered",[e])))}},250),window[d]=function(n,r){var o=f;v.debug&&(0===n.indexOf("debug")&&r&&r.length?console.log.apply(console,["-- "+n].concat(r)):console.log("--",n,r));var i={type:n};switch(n){case"ready":r=l(o,r);break;case"click":i.flash=!0;break;case"keydown":i.which=r;break;case"seek":o.time=r;break;case"status":e.trigger("progress",[e,r.time]),r.buffer<o.bytes&&!o.buffered?(o.buffer=r.buffer/o.bytes*o.duration,e.trigger("buffer",o.buffer)):o.buffered||(o.buffered=!0,e.trigger("buffered"))}"click"===n||"keydown"===n?(i.target=t,s.fire(t,n,[i])):"buffered"!=n&&"unload"!==n?setTimeout(function(){e.trigger(i,[e,r])},1):"unload"===n&&e.trigger(i,[e,r])}}},speed:i.noop,unload:function(){p&&p.__unload&&p.__unload();try{d&&window[d]&&delete window[d]}catch(n){}i.find("object",t).forEach(i.removeNode),p=0,e.off(".flashengine"),clearInterval(p.pollInterval)}});return["pause","resume","seek","volume"].forEach(function(t){m[t]=function(n){try{e.ready&&("seek"==t&&e.video.time&&!e.paused&&e.trigger("beforeseek"),void 0===n?p["__"+t]():p["__"+t](n))}catch(r){if("undefined"==typeof p["__"+t])return e.trigger("flashdisabled",[e]);throw r}}}),m},r.engineName="flash",r.canPlay=function(e,t){return o.support.flashVideo&&/video\/(mp4|flash|flv)/i.test(e)||o.support.flashVideo&&t.swfHls&&/mpegurl/i.test(e)},o.engines.push(r)},{"../common":1,"../flowplayer":18,"./embed":2,bean:20,"extend-object":26}],4:[function(e,t,n){"use strict";function r(e,t){return t=t||100,Math.round(e*t)/t}function o(e){return/mpegurl/i.test(e)?"application/x-mpegurl":e}function i(e){return/^(video|application)/i.test(e)||(e=o(e)),!!v.canPlayType(e).replace("no","")}function a(e,t){var n=e.filter(function(e){return e.type===t});return n.length?n[0]:null}var l,s,u=e("../flowplayer"),c=e("bean"),f=e("class-list"),d=e("extend-object"),p=e("../common"),v=document.createElement("video"),m={ended:"finish",pause:"pause",play:"resume",progress:"buffer",timeupdate:"progress",volumechange:"volume",ratechange:"speed",seeked:"seek",loadeddata:"ready",error:"error",dataunavailable:"error",webkitendfullscreen:!u.support.inlineVideo&&"unload"},h=function(e,t,n,r){if("undefined"==typeof t&&(t=!0),"undefined"==typeof n&&(n="none"),"undefined"==typeof r&&(r=!0),r&&l)return l.type=o(e.type),l.src=e.src,l;var i=document.createElement("video");return i.src=e.src,i.type=o(e.type),i.className="fp-engine",i.autoplay=t?"autoplay":!1,i.preload=n,i.setAttribute("x-webkit-airplay","allow"),r&&(l=i),i};s=function(e,t){function n(n,o,a){var l=t.getAttribute("data-flowplayer-instance-id");return n.listeners&&n.listeners.hasOwnProperty(l)?void(n.listeners[l]=a):((n.listeners||(n.listeners={}))[l]=a,c.on(o,"error",function(t){try{i(t.target.getAttribute("type"))&&e.trigger("error",[e,{code:4,video:d(a,{src:n.src,url:n.src})}])}catch(r){}}),e.on("shutdown",function(){c.off(o)}),void Object.keys(m).forEach(function(o){var i=m[o];i&&t.addEventListener(o,function(s){if(a=n.listeners[l],s.target&&f(s.target).contains("fp-engine")&&(w.debug&&!/progress/.test(i)&&console.log(o,"->",i,s),(e.ready||/ready|error/.test(i))&&i&&p.find("video",t).length)){var u;if("unload"===i)return void e.unload();var c=function(){e.trigger(i,[e,u])};switch(i){case"ready":u=d(a,{duration:n.duration,width:n.videoWidth,height:n.videoHeight,url:n.currentSrc,src:n.currentSrc});try{u.seekable=!w.live&&/mpegurl/i.test(a?a.type||"":"")&&n.duration||n.seekable&&n.seekable.end(null)}catch(m){}if(v=v||setInterval(function(){try{u.buffer=n.buffered.end(null)}catch(t){}u.buffer&&(r(u.buffer,1e3)<r(u.duration,1e3)&&!u.buffered?e.trigger("buffer",s):u.buffered||(u.buffered=!0,e.trigger("buffer",s).trigger("buffered",s),clearInterval(v),v=0))},250),!w.live&&!u.duration&&!b.hlsDuration&&"loadeddata"===o){var h=function(){u.duration=n.duration;try{u.seekable=n.seekable&&n.seekable.end(null)}catch(e){}c(),n.removeEventListener("durationchange",h),f(t).remove("is-live")};n.addEventListener("durationchange",h);var g=function(){e.ready||n.duration||(u.duration=0,f(t).add("is-live"),c()),n.removeEventListener("timeupdate",g)};return void n.addEventListener("timeupdate",g)}break;case"progress":case"seek":e.video.duration;if(n.currentTime>0||e.live)u=Math.max(n.currentTime,0);else if("progress"==i)return;break;case"speed":u=r(n.playbackRate);break;case"volume":u=r(n.volume);break;case"error":try{u=(s.srcElement||s.originalTarget).error,u.video=d(a,{src:n.src,url:n.src})}catch(y){return}}c()}},!0)}))}var o,v,g,y=p.findDirect("video",t)[0]||p.find(".fp-player > video",t)[0],b=u.support,w=(p.find("track",y)[0],e.conf);return o={engineName:s.engineName,pick:function(e){if(b.video){if(w.videoTypePreference){var t=a(e,w.videoTypePreference);if(t)return t}for(var n=0;n<e.length;n++)if(i(e[n].type))return e[n]}},load:function(r){var o=!1,i=p.find(".fp-player",t)[0],a=!1;w.splash&&!y?(y=h(r),p.prepend(i,y),o=!0):y?(f(y).add("fp-engine"),p.find("source,track",y).forEach(p.removeNode),e.conf.nativesubtitles||p.attr(y,"crossorigin",!1),a=y.src===r.src):(y=h(r,!!r.autoplay||!!w.autoplay,w.clip.preload||"metadata",!1),p.prepend(i,y),o=!0),b.inlineVideo||p.css(y,{position:"absolute",top:"-9999em"}),c.off(y,"timeupdate",p.noop),c.on(y,"timeupdate",p.noop),p.prop(y,"loop",!(!r.loop&&!w.loop)),"undefined"!=typeof g&&(y.volume=g),(e.video.src&&r.src!=e.video.src||r.index)&&p.attr(y,"autoplay","autoplay"),y.src=r.src,y.type=r.type,n(y,p.find("source",y).concat(y),r),("none"!=w.clip.preload&&"mpegurl"!=r.type||!b.zeropreload||!b.dataload)&&y.load(),(o||a)&&y.load(),y.paused&&(r.autoplay||w.autoplay)&&y.play()},pause:function(){y.pause()},resume:function(){y.play()},speed:function(e){y.playbackRate=e},seek:function(t){try{var n=e.paused;y.currentTime=t,n&&y.pause()}catch(r){}},volume:function(e){g=e,y&&(y.volume=e)},unload:function(){p.find("video.fp-engine",t).forEach(p.removeNode),b.cachedVideoTag||(l=null),v=clearInterval(v),y=0}}},s.canPlay=function(e){return u.support.video&&i(e)},s.engineName="html5",u.engines.push(s)},{"../common":1,"../flowplayer":18,bean:20,"class-list":22,"extend-object":26}],5:[function(e,t,n){"use strict";var r=e("../flowplayer"),o=e("./resolve").TYPE_RE,i=e("scriptjs"),a=e("bean");r(function(e,t){var n,r=e.conf.analytics,l=0,s=0;if(r){"undefined"==typeof _gat&&i("//google-analytics.com/ga.js");var u=function(){var e=_gat._getTracker(r);return e._setAllowLinker(!0),e},c=function(r,i,a){if(a=a||e.video,l&&"undefined"!=typeof _gat){var s=u();s._trackEvent("Video / Seconds played",e.engine.engineName+"/"+a.type,a.title||t.getAttribute("title")||a.src.split("/").slice(-1)[0].replace(o,""),Math.round(l/1e3)),l=0,n&&(clearTimeout(n),n=null)}};e.bind("load unload",c).bind("progress",function(){e.seeking||(l+=s?+new Date-s:0,s=+new Date),n||(n=setTimeout(function(){n=null;var e=u();e._trackEvent("Flowplayer heartbeat","Heartbeat","",0,!0)},6e5))}).bind("pause",function(){s=0}),e.bind("shutdown",function(){a.off(window,"unload",c)}),a.on(window,"unload",c)}})},{"../flowplayer":18,"./resolve":13,bean:20,scriptjs:29}],6:[function(e,t,n){"use strict";var r=e("../flowplayer"),o=e("class-list"),i=e("../common"),a=e("bean");r(function(e,t){function n(e){t.className=t.className.replace(l," "),e>=0&&o(t).add("cue"+e)}function r(t){var n=t&&!isNaN(t.time)?t.time:t;return 0>n&&(n=e.video.duration+n),.125*Math.round(n/.125)}var l=/ ?cue\d+ ?/,s=!1,u={},c=-.125,f=function(t){var r=e.cuepoints.indexOf(t);isNaN(t)||(t={time:t}),t.index=r,n(r),e.trigger("cuepoint",[e,t])};e.on("progress",function(e,t,n){if(!s)for(var o=r(n);o>c;)c+=.125,u[c]&&u[c].forEach(f)}).on("unload",n).on("beforeseek",function(){s=!0}).on("seek",function(e,t,o){n(),c=r(o||0)-.125,s=!1,!o&&u[0]&&u[0].forEach(f)}).on("ready",function(t,n,r){c=-.125;var o=r.cuepoints||e.conf.cuepoints||[];e.setCuepoints(o)}).on("finish",function(){c=-.125}),e.conf.generate_cuepoints&&e.bind("load",function(){i.find(".fp-cuepoint",t).forEach(i.removeNode)}),e.setCuepoints=function(t){return e.cuepoints=[],u={},t.forEach(e.addCuepoint),e},e.addCuepoint=function(n){e.cuepoints||(e.cuepoints=[]);var o=r(n);if(u[o]||(u[o]=[]),u[o].push(n),e.cuepoints.push(n),e.conf.generate_cuepoints&&n.visible!==!1){var l=e.video.duration,s=i.find(".fp-timeline",t)[0];i.css(s,"overflow","visible");var c=n.time||n;0>c&&(c=l+n);var f=i.createElement("a",{className:"fp-cuepoint fp-cuepoint"+(e.cuepoints.length-1)});i.css(f,"left",c/l*100+"%"),s.appendChild(f),a.on(f,"mousedown",function(t){return t.preventDefault(),e.seek(c),!1})}return e},e.removeCuepoint=function(t){var n=e.cuepoints.indexOf(t),o=r(t);if(-1!==n){e.cuepoints=e.cuepoints.slice(0,n).concat(e.cuepoints.slice(n+1));var i=u[o].indexOf(t);if(-1!==i)return u[o]=u[o].slice(0,i).concat(u[o].slice(i+1)),e}}})},{"../common":1,"../flowplayer":18,bean:20,"class-list":22}],7:[function(e,t,n){"use strict";var r=e("../flowplayer"),o=e("bean"),i=e("../common"),a=(e("is-object"),e("extend-object")),l=e("class-list");r(function(e,t){if(e.conf.embed!==!1){var n=(e.conf,i.find(".fp-ui",t)[0]),r=i.createElement("a",{"class":"fp-embed",title:"Copy to your site"}),l=i.createElement("div",{"class":"fp-embed-code"},"<label>Paste this HTML code on your site to embed.</label><textarea></textarea>"),u=i.find("textarea",l)[0];n.appendChild(r),n.appendChild(l),e.embedCode=function(){var n=e.conf.embed||{},r=e.video;if(n.iframe){var o=(e.conf.embed.iframe,n.width||r.width||i.width(t)),l=n.height||r.height||i.height(t);return'<iframe src="'+e.conf.embed.iframe+'" frameBorder="0" allowfullscreen width="'+o+'" height="'+l+'"></iframe>'}var s=["ratio","rtmp","live","bufferTime","origin","analytics","key","subscribe","swf","swfHls","embed","adaptiveRatio","logo"];n.playlist&&s.push("playlist");var u=i.pick(e.conf,s);u.logo&&(u.logo=i.createElement("img",{src:u.logo}).src),n.playlist&&e.conf.playlist.length||(u.clip=a({},e.conf.clip,i.pick(e.video,["sources"])));var c='var w=window,d=document,e;w._fpes||(w._fpes=[],w.addEventListener("load",function(){var s=d.createElement("script");s.src="//embed.flowplayer.org/6.0.3/embed.min.js",d.body.appendChild(s)})),e=[].slice.call(d.getElementsByTagName("script"),-1)[0].parentNode,w._fpes.push({e:e,l:"$library",c:$conf});\n'.replace("$conf",JSON.stringify(u)).replace("$library",n.library||"");return'<a href="$href">Watch video!\n<script>$script</script></a>'.replace("$href",e.conf.origin||window.location.href).replace("$script",c)},s(t,".fp-embed","is-embedding"),o.on(t,"click",".fp-embed-code textarea",function(){u.select()}),o.on(t,"click",".fp-embed",function(){u.textContent=e.embedCode().replace(/(\r\n|\n|\r)/gm,""),u.focus(),u.select()})}});var s=function(e,t,n){function r(){a.remove(n),o.off(document,".st")}var a=l(e);o.on(e,"click",t||"a",function(e){e.preventDefault(),a.toggle(n),a.contains(n)&&(o.on(document,"keydown.st",function(e){27==e.which&&r()}),o.on(document,"click.st",function(e){i.hasParent(e.target,"."+n)||r()}))})}},{"../common":1,"../flowplayer":18,bean:20,"class-list":22,"extend-object":26,"is-object":28}],8:[function(e,t,n){"use strict";t.exports=function(e,t){t||(t=document.createElement("div"));var n={},r={},o=function(e,o,i){var a=e.split(".")[0],l=function(s){i&&(t.removeEventListener(a,l),n[e].splice(n[e].indexOf(l),1));var u=[s].concat(r[s.timeStamp+s.type]||[]);o&&o.apply(void 0,u)};t.addEventListener(a,l),n[e]||(n[e]=[]),n[e].push(l)};e.on=e.bind=function(t,n){var r=t.split(" ");return r.forEach(function(e){o(e,n)}),e},e.one=function(t,n){var r=t.split(" ");return r.forEach(function(e){o(e,n,!0)}),e};var i=function(e,t){return 0===t.filter(function(t){return-1===e.indexOf(t)}).length};e.off=e.unbind=function(r){var o=r.split(" ");return o.forEach(function(e){var r=e.split(".").slice(1),o=e.split(".")[0];Object.keys(n).filter(function(e){var t=e.split(".").slice(1);return(!o||0===e.indexOf(o))&&i(t,r)}).forEach(function(e){var r=n[e],o=e.split(".")[0];r.forEach(function(e){t.removeEventListener(o,e),r.splice(r.indexOf(e),1)})})}),e},e.trigger=function(n,o,i){if(n){o=(o||[]).length?o||[]:[o];var a,l=document.createEvent("Event");return a=n.type||n,l.initEvent(a,!1,!0),r[l.timeStamp+l.type]=o,t.dispatchEvent(l),i?l:e}}},t.exports.EVENTS=["beforeseek","disable","error","finish","fullscreen","fullscreen-exit","load","mute","pause","progress","ready","resume","seek","speed","stop","unload","volume","boot","shutdown"]},{}],9:[function(e,t,n){"use strict";var r,o=e("../flowplayer"),i=e("bean"),a=e("class-list"),l=(e("extend-object"),e("../common")),s=(o.support.browser.mozilla?"moz":"webkit","fullscreen"),u="fullscreen-exit",c=o.support.fullscreen,f=("function"==typeof document.exitFullscreen,navigator.userAgent.toLowerCase()),d=/(safari)[ \/]([\w.]+)/.exec(f)&&!/(chrome)[ \/]([\w.]+)/.exec(f);i.on(document,"fullscreenchange.ffscr webkitfullscreenchange.ffscr mozfullscreenchange.ffscr MSFullscreenChange.ffscr",function(e){var t=document.webkitCurrentFullScreenElement||document.mozFullScreenElement||document.fullscreenElement||document.msFullscreenElement||e.target;if(r||t.parentNode&&t.parentNode.getAttribute("data-flowplayer-instance-id")){var n=r||o(t.parentNode);t&&!r?r=n.trigger(s,[t]):(r.trigger(u,[r]),r=null)}}),o(function(e,t){var n=l.createElement("div",{className:"fp-player"});if(Array.prototype.map.call(t.children,l.identity).forEach(function(e){l.matches(e,".fp-ratio,script")||n.appendChild(e)}),t.appendChild(n),e.conf.fullscreen){var o,f,p=window,v=a(t);e.isFullscreen=!1,e.fullscreen=function(t){return e.disabled?void 0:(void 0===t&&(t=!e.isFullscreen),t&&(o=p.scrollY,f=p.scrollX),c?t?["requestFullScreen","webkitRequestFullScreen","mozRequestFullScreen","msRequestFullscreen"].forEach(function(e){return"function"==typeof n[e]?(n[e](Element.ALLOW_KEYBOARD_INPUT),!d||document.webkitCurrentFullScreenElement||document.mozFullScreenElement||n[e](),!1):void 0}):["exitFullscreen","webkitCancelFullScreen","mozCancelFullScreen","msExitFullscreen"].forEach(function(e){return"function"==typeof document[e]?(document[e](),!1):void 0}):e.trigger(t?s:u,[e]),e)};var m;e.on("mousedown.fs",function(){+new Date-m<150&&e.ready&&e.fullscreen(),m=+new Date}),e.on(s,function(n){v.add("is-fullscreen"),c||l.css(t,"position","fixed"),e.isFullscreen=!0}).on(u,function(n){var r;c||"html5"!==e.engine||(r=t.css("opacity")||"",l.css(t,"opacity",0)),c||l.css(t,"position",""),v.remove("is-fullscreen"),c||"html5"!==e.engine||setTimeout(function(){t.css("opacity",r)}),e.isFullscreen=!1,p.scrollTo(f,o)}).on("unload",function(){e.isFullscreen&&e.fullscreen()}),e.on("shutdown",function(){i.off(document,".ffscr"),r=null})}})},{"../common":1,"../flowplayer":18,bean:20,"class-list":22,"extend-object":26}],10:[function(e,t,n){"use strict";var r,o,i=e("../flowplayer"),a=e("bean"),l="is-help",s=e("../common"),u=e("class-list");a.on(document,"keydown.fp",function(e){var t=r,n=e.ctrlKey||e.metaKey||e.altKey,i=e.which,a=t&&t.conf,s=o&&u(o);if(t&&a.keyboard&&!t.disabled){if(-1!=[63,187,191].indexOf(i))return s.toggle(l),!1;if(27==i&&s.contains(l))return s.toggle(l),!1;if(!n&&t.ready){if(e.preventDefault(),e.shiftKey)return void(39==i?t.speed(!0):37==i&&t.speed(!1));if(58>i&&i>47)return t.seekTo(i-48);switch(i){case 38:case 75:t.volume(t.volumeLevel+.15);break;case 40:case 74:t.volume(t.volumeLevel-.15);break;case 39:case 76:t.seeking=!0,t.seek(!0);break;case 37:case 72:t.seeking=!0,t.seek(!1);break;case 190:t.seekTo();break;case 32:t.toggle();break;case 70:a.fullscreen&&t.fullscreen();break;case 77:t.mute();break;case 81:t.unload()}}}}),i(function(e,t){if(e.conf.keyboard){a.on(t,"mouseenter mouseleave",function(n){r=e.disabled||"mouseover"!=n.type?0:e,r&&(o=t)});var n=i.support.video&&"flash"!==e.conf.engine&&document.createElement("video").playbackRate?"<p><em>shift</em> + <em>&#8592;</em><em>&#8594;</em>slower / faster</p>":"";if(t.appendChild(s.createElement("div",{className:"fp-help"},'         <a class="fp-close"></a>         <div class="fp-help-section fp-help-basics">            <p><em>space</em>play / pause</p>            <p><em>q</em>unload | stop</p>            <p><em>f</em>fullscreen</p>'+n+'         </div>         <div class="fp-help-section">            <p><em>&#8593;</em><em>&#8595;</em>volume</p>            <p><em>m</em>mute</p>         </div>         <div class="fp-help-section">            <p><em>&#8592;</em><em>&#8594;</em>seek</p>            <p><em>&nbsp;. </em>seek to previous            </p><p><em>1</em><em>2</em>&hellip; <em>6</em> seek to 10%, 20% &hellip; 60% </p>         </div>   ')),
e.conf.tooltip){var c=s.find(".fp-ui",t)[0];c.setAttribute("title","Hit ? for help"),a.one(t,"mouseout.tip",".fp-ui",function(){c.removeAttribute("title")})}a.on(t,"click",".fp-close",function(){u(t).toggle(l)}),e.bind("shutdown",function(){o==t&&(o=null)})}})},{"../common":1,"../flowplayer":18,bean:20,"class-list":22}],11:[function(e,t,n){"use strict";var r=e("../flowplayer"),o=/IEMobile/.test(window.navigator.userAgent),i=e("class-list"),a=e("../common"),l=e("bean"),s=e("./ui").format,u=window.navigator.userAgent;(r.support.touch||o)&&r(function(e,t){var n=/Android/.test(u)&&!/Firefox/.test(u)&&!/Opera/.test(u),c=/Silk/.test(u),f=n?parseFloat(/Android\ (\d\.\d)/.exec(u)[1],10):0,d=i(t);if(n&&!o){if(!/Chrome/.test(u)&&4>f){var p=e.load;e.load=function(t,n){var r=p.apply(e,arguments);return e.trigger("ready",[e,e.video]),r}}var v,m=0,h=function(e){v=setInterval(function(){e.video.time=++m,e.trigger("progress",[e,m])},1e3)};e.bind("ready pause unload",function(){v&&(clearInterval(v),v=null)}),e.bind("ready",function(){m=0}),e.bind("resume",function(t,n){return n.live?m?h(n):void e.one("progress",function(e,t,n){0===n&&h(t)}):void 0})}r.support.volume||(d.add("no-volume"),d.add("no-mute")),d.add("is-touch"),e.sliders&&e.sliders.timeline&&e.sliders.timeline.disableAnimation(),(!r.support.inlineVideo||e.conf.native_fullscreen)&&(e.conf.nativesubtitles=!0);var g=!1;l.on(t,"touchmove",function(){g=!0}),l.on(t,"touchend click",function(t){return g?void(g=!1):e.playing&&!d.contains("is-mouseover")?(d.add("is-mouseover"),d.remove("is-mouseout"),t.preventDefault(),void t.stopPropagation()):void(e.playing||e.splash||!d.contains("is-mouseout")||d.contains("is-mouseover")||setTimeout(function(){e.playing||e.splash||e.resume()},400))}),e.conf.native_fullscreen&&"function"==typeof document.createElement("video").webkitEnterFullScreen&&(e.fullscreen=function(){var e=a.find("video.fp-engine",t)[0];e.webkitEnterFullScreen(),l.one(e,"webkitendfullscreen",function(){a.prop(e,"controls",!0),a.prop(e,"controls",!1)})}),(n||c)&&e.bind("ready",function(){var n=a.find("video.fp-engine",t)[0];l.one(n,"canplay",function(){n.play()}),n.play(),e.bind("progress.dur",function(){var r=n.duration;1!==r&&(e.video.duration=r,a.find(".fp-duration",t)[0].innerHTML=s(r),e.unbind("progress.dur"))})})})},{"../common":1,"../flowplayer":18,"./ui":17,bean:20,"class-list":22}],12:[function(e,t,n){"use strict";var r=e("../flowplayer"),o=e("extend-object"),i=e("bean"),a=e("class-list"),l=e("../common"),s=e("./resolve"),u=new s,c=window.jQuery,f=/^#/;r(function(e,t){function n(){return l.find(v.query,r())}function r(){return f.test(v.query)?void 0:t}function d(){return l.find(v.query+"."+m,r())}function p(){var n=l.find(".fp-playlist",t)[0];if(!n){n=l.createElement("div",{className:"fp-playlist"});var r=l.find(".fp-next,.fp-prev",t);r.length?r[0].parentElement.insertBefore(n,r[0]):l.insertAfter(t,l.find("video",t)[0],n)}n.innerHTML="",e.conf.playlist[0].length&&(e.conf.playlist=e.conf.playlist.map(function(e){if("string"==typeof e){var t=e.split(s.TYPE_RE)[1];return{sources:[{type:"m3u8"===t.toLowerCase()?"application/x-mpegurl":"video/"+t,src:e}]}}return{sources:e.map(function(e){var t={};return Object.keys(e).forEach(function(n){t.type=/mpegurl/i.test(n)?"application/x-mpegurl":"video/"+n,t.src=e[n]}),t})}})),e.conf.playlist.forEach(function(e,t){var r=e.sources[0].src;n.appendChild(l.createElement("a",{href:r,"data-index":t}))})}var v=o({active:"is-active",advance:!0,query:".fp-playlist a"},e.conf),m=v.active,h=a(t);e.play=function(t){if(void 0===t)return e.resume();if("number"==typeof t&&!e.conf.playlist[t])return e;if("number"!=typeof t)return e.load.apply(null,arguments);var n=o({index:t},e.conf.playlist[t]);return t===e.video.index?e.load(n,function(){e.resume()}):(e.off("resume.fromfirst"),e.load(n,function(){e.video.index=t}),e)},e.next=function(t){t&&t.preventDefault();var n=e.video.index;return-1!=n&&(n=n===e.conf.playlist.length-1?0:n+1,e.play(n)),e},e.prev=function(t){t&&t.preventDefault();var n=e.video.index;return-1!=n&&(n=0===n?e.conf.playlist.length-1:n-1,e.play(n)),e},e.setPlaylist=function(t){return e.conf.playlist=t,delete e.video.index,p(),e},e.addPlaylistItem=function(t){return e.setPlaylist(e.conf.playlist.concat([t]))},e.removePlaylistItem=function(t){var n=e.conf.playlist;return e.setPlaylist(n.slice(0,t).concat(n.slice(t+1)))},i.on(t,"click",".fp-next",e.next),i.on(t,"click",".fp-prev",e.prev),v.advance&&e.off("finish.pl").on("finish.pl",function(e,t){if(t.video.loop)return t.seek(0,function(){t.resume()});var n=t.video.index>=0?t.video.index+1:void 0;n<t.conf.playlist.length||v.loop?(n=n===t.conf.playlist.length?0:n,h.remove("is-finished"),setTimeout(function(){t.play(n)})):t.conf.playlist.length>1&&t.one("resume.fromfirst",function(){return t.play(0),!1})});var g=!1;e.conf.playlist.length&&(g=!0,p(),e.conf.clip&&e.conf.clip.sources.length||(e.conf.clip=e.conf.playlist[0])),n().length&&!g&&(e.conf.playlist=[],n().forEach(function(t){var n=t.href;t.setAttribute("data-index",e.conf.playlist.length);var r=u.resolve(n,e.conf.clip.sources);c&&o(r,c(t).data()),e.conf.playlist.push(r)})),i.on(f.test(v.query)?document:t,"click",v.query,function(t){t.preventDefault();var n=t.currentTarget,r=Number(n.getAttribute("data-index"));-1!=r&&e.play(r)}),e.on("load",function(n,o,i){if(e.conf.playlist.length){var s=d()[0],u=s&&s.getAttribute("data-index"),c=i.index=i.index||e.video.index||0,f=l.find(v.query+'[data-index="'+c+'"]',r())[0],p=c==e.conf.playlist.length-1;s&&a(s).remove(m),f&&a(f).add(m),h.remove("video"+u),h.add("video"+c),l.toggleClass(t,"last-video",p),i.index=o.video.index=c,i.is_last=o.video.is_last=p}}).on("unload.pl",function(){e.conf.playlist.length&&(d().forEach(function(e){a(e).toggle(m)}),e.conf.playlist.forEach(function(e,t){h.remove("video"+t)}))}),e.conf.playlist.length&&(e.conf.loop=!1)})},{"../common":1,"../flowplayer":18,"./resolve":13,bean:20,"class-list":22,"extend-object":26}],13:[function(e,t,n){"use strict";function r(e){var t=e.attr("src"),n=e.attr("type")||"",r=t.split(i)[1];return n=n.toLowerCase(),a(e.data(),{src:t,suffix:r||n,type:n||r})}function o(e){return/mpegurl/i.test(e)?"application/x-mpegurl":"video/"+e}var i=/\.(\w{3,4})(\?.*)?$/i,a=e("extend-object");t.exports=function(){var e=this;e.sourcesFromVideoTag=function(e,t){var n=[];return t("source",e).each(function(){n.push(r(t(this)))}),!n.length&&e.length&&n.push(r(e)),n},e.resolve=function(e,t){return e?("string"==typeof e&&(e={src:e,sources:[]},e.sources=(t||[]).map(function(t){var n=t.src.split(i)[1];return{type:t.type,src:e.src.replace(i,"."+n+"$2")}})),e instanceof Array&&(e={sources:e.map(function(e){return e.type&&e.src?e:Object.keys(e).reduce(function(t,n){return a(t,{type:o(n),src:e[n]})},{})})}),e):{sources:t}}},t.exports.TYPE_RE=i},{"extend-object":26}],14:[function(e,t,n){"use strict";var r=e("class-list"),o=e("bean"),i=e("../common"),a=function(e,t){var n;return function(){n||(e.apply(this,arguments),n=1,setTimeout(function(){n=0},t))}},l=function(e,t){var n,l,s,u,c,f,d,p,v=(/iPad/.test(navigator.userAgent)&&!/CriOS/.test(navigator.userAgent),i.lastChild(e)),m=r(e),h=r(v),g=!1,y=function(){l=i.offset(e),s=i.width(e),u=i.height(e),f=c?u:s,p=E(d)},b=function(t){n||t==k.value||d&&!(d>t)||(o.fire(e,"slide",[t]),k.value=t)},w=function(e){var n=e.pageX||e.clientX;!n&&e.originalEvent&&e.originalEvent.touches&&e.originalEvent.touches.length&&(n=e.originalEvent.touches[0].pageX);var r=c?e.pageY-l.top:n-l.left;r=Math.max(0,Math.min(p||f,r));var o=r/f;return c&&(o=1-o),t&&(o=1-o),x(o,0,!0)},x=function(e,t){void 0===t&&(t=0),e>1&&(e=1);var n=Math.round(1e3*e)/10+"%";return(!d||d>=e)&&(h.remove("animated"),g?h.remove("animated"):(h.add("animated"),i.css(v,"transition-duration",(t||0)+"ms")),i.css(v,"width",n)),e},E=function(e){return Math.max(0,Math.min(f,c?(1-e)*u:e*s))},k={max:function(e){d=e},disable:function(e){n=e},slide:function(e,t,n){y(),n&&b(e),x(e,t)},disableAnimation:function(t,n){g=t!==!1,i.toggleClass(e,"no-animation",!!n)}};return y(),o.on(e,"mousedown.sld touchstart",function(e){if(e.preventDefault(),!n){var t=a(b,100);y(),k.dragging=!0,m.add("is-dragging"),b(w(e)),o.on(document,"mousemove.sld touchmove.sld",function(e){e.preventDefault(),t(w(e))}),o.one(document,"mouseup touchend",function(){k.dragging=!1,m.remove("is-dragging"),o.off(document,"mousemove.sld touchmove.sld")})}}),k};t.exports=l},{"../common":1,bean:20,"class-list":22}],15:[function(e,t,n){"use strict";var r=e("../flowplayer"),o=e("../common"),i=e("bean"),a=e("class-list");r.defaults.subtitleParser=function(e){function t(e){var t=e.split(":");return 2==t.length&&t.unshift(0),60*t[0]*60+60*t[1]+parseFloat(t[2].replace(",","."))}for(var n,r,o,i=/^(([0-9]{2}:){1,2}[0-9]{2}[,.][0-9]{3}) --\> (([0-9]{2}:){1,2}[0-9]{2}[,.][0-9]{3})(.*)/,a=[],l=0,s=e.split("\n"),u=s.length,c={};u>l;l++)if(r=i.exec(s[l])){for(n=s[l-1],o="<p>"+s[++l]+"</p><br/>";"string"==typeof s[++l]&&s[l].trim()&&l<s.length;)o+="<p>"+s[l]+"</p><br/>";c={title:n,startTime:t(r[1]),endTime:t(r[3]),text:o},a.push(c)}return a},r(function(e,t){var n,l,s,u,c=a(t),f=function(){u=o.createElement("a",{className:"fp-menu"});var n=o.createElement("ul",{className:"fp-dropdown fp-dropup"});return n.appendChild(o.createElement("li",{"data-subtitle-index":-1},"No subtitles")),(e.video.subtitles||[]).forEach(function(e,t){var r=e.srclang||"en",i=e.label||"Default ("+r+")",a=o.createElement("li",{"data-subtitle-index":t},i);n.appendChild(a)}),u.appendChild(n),o.find(".fp-controls",t)[0].appendChild(u),u};i.on(t,"click",".fp-menu",function(e){a(u).toggle("dropdown-open")}),i.on(t,"click",".fp-menu li[data-subtitle-index]",function(t){var n=t.target.getAttribute("data-subtitle-index");return"-1"===n?e.disableSubtitles():void e.loadSubtitles(n)});var d=function(){var e=o.find(".fp-player",t)[0];s=o.find(".fp-subtitle",t)[0],s=s||o.appendTo(o.createElement("div",{"class":"fp-subtitle"}),e),Array.prototype.forEach.call(s.children,o.removeNode),n=a(s),o.find(".fp-menu",t).forEach(o.removeNode),f()};e.on("ready",function(n,i,a){var l=i.conf;if(r.support.subtitles&&l.nativesubtitles&&"html5"==i.engine.engineName){var s=function(e){var n=o.find("video",t)[0].textTracks;n.length&&(n[0].mode=e)};if(!a.subtitles||!a.subtitles.length)return;var u=o.find("video.fp-engine",t)[0];return a.subtitles.forEach(function(e){u.appendChild(o.createElement("track",{kind:"subtitles",srclang:e.srclang||"en",label:e.label||"en",src:e.src,"default":e["default"]}))}),s("disabled"),void s("showing")}if(i.subtitles=[],d(),c.remove("has-menu"),e.disableSubtitles(),a.subtitles&&a.subtitles.length){c.add("has-menu");var f=a.subtitles.filter(function(e){return e["default"]})[0];f&&i.loadSubtitles(a.subtitles.indexOf(f))}}),e.bind("cuepoint",function(e,t,r){r.subtitle?(l=r.index,o.html(s,r.subtitle.text),n.add("fp-active")):r.subtitleEnd&&(n.remove("fp-active"),l=r.index)}),e.bind("seek",function(t,r,o){l&&e.cuepoints[l]&&e.cuepoints[l].time>o&&(n.remove("fp-active"),l=null),(e.cuepoints||[]).forEach(function(t){var n=t.subtitle;n&&l!=t.index?o>=t.time&&(!n.endTime||o<=n.endTime)&&e.trigger("cuepoint",[e,t]):t.subtitleEnd&&o>=t.time&&t.index==l+1&&e.trigger("cuepoint",[e,t])})});var p=function(e){o.toggleClass(o.find("li.active",t)[0],"active"),o.toggleClass(o.find('li[data-subtitle-index="'+e+'"]',t)[0],"active")};e.disableSubtitles=function(){return e.subtitles=[],(e.cuepoints||[]).forEach(function(t){(t.subtitle||t.subtitleEnd)&&e.removeCuepoint(t)}),s&&Array.prototype.forEach.call(s.children,o.removeNode),p(-1),e},e.loadSubtitles=function(t){e.disableSubtitles();var n=e.video.subtitles[t],r=n.src;return r?(p(t),o.xhrGet(r,function(t){var n=e.conf.subtitleParser(t);n.forEach(function(t){var n={time:t.startTime,subtitle:t,visible:!1};e.subtitles.push(t),e.addCuepoint(n),e.addCuepoint({time:t.endTime,subtitleEnd:t.title,visible:!1}),0!==t.startTime||e.video.time||e.trigger("cuepoint",[e,n])})},function(){return e.trigger("error",{code:8,url:r}),!1}),e):void 0}})},{"../common":1,"../flowplayer":18,bean:20,"class-list":22}],16:[function(e,t,n){"use strict";var r=e("../flowplayer"),o=e("extend-object");!function(){var e=function(e){var t=/Version\/(\d\.\d)/.exec(e);return t&&t.length>1?parseFloat(t[1],10):0},t=function(){var e=document.createElement("video");return e.loop=!0,e.autoplay=!0,e.preload=!0,e},n={},i=navigator.userAgent.toLowerCase(),a=/(chrome)[ \/]([\w.]+)/.exec(i)||/(safari)[ \/]([\w.]+)/.exec(i)||/(webkit)[ \/]([\w.]+)/.exec(i)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(i)||/(msie) ([\w.]+)/.exec(i)||i.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(i)||[];a[1]&&(n[a[1]]=!0,n.version=a[2]||"0");var l=t(),s=navigator.userAgent,u=n.msie||/Trident\/7/.test(s),c=/iPad|MeeGo/.test(s)&&!/CriOS/.test(s),f=/iPad/.test(s)&&/CriOS/.test(s),d=/iP(hone|od)/i.test(s)&&!/iPad/.test(s)&&!/IEMobile/i.test(s),p=/Android/.test(s)&&!/Firefox/.test(s),v=/Android/.test(s)&&/Firefox/.test(s),m=/Silk/.test(s),h=/IEMobile/.test(s),g=h?parseFloat(/Windows\ Phone\ (\d+\.\d+)/.exec(s)[1],10):0,y=h?parseFloat(/IEMobile\/(\d+\.\d+)/.exec(s)[1],10):0,b=(c?e(s):0,p?parseFloat(/Android\ (\d\.\d)/.exec(s)[1],10):0),w=o(r.support,{browser:n,subtitles:!!l.addTextTrack,fullscreen:"function"==typeof document.webkitCancelFullScreen&&!/Mac OS X 10_5.+Version\/5\.0\.\d Safari/.test(s)||document.mozFullScreenEnabled||"function"==typeof document.exitFullscreen||"function"==typeof document.msExitFullscreen,inlineBlock:!(u&&n.version<8),touch:"ontouchstart"in window,dataload:!c&&!d&&!h,zeropreload:!u&&!p,volume:!(c||p||d||m||f),cachedVideoTag:!(c||d||f||h),firstframe:!(d||c||p||m||f||h||v),inlineVideo:!d&&(!h||g>=8.1&&y>=11)&&(!p||b>=3),hlsDuration:!p&&(!n.safari||c||d||f),seekable:!c&&!f});try{var x=navigator.plugins["Shockwave Flash"],E=u?new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version"):x.description;u||x[0].enabledPlugin?(E=E.split(/\D+/),E.length&&!E[0]&&(E=E.slice(1)),w.flashVideo=E[0]>9||9==E[0]&&E[3]>=115):w.flashVideo=!1}catch(k){}try{w.video=!!l.canPlayType,w.video&&l.canPlayType("video/mp4")}catch(T){w.video=!1}w.animation=function(){for(var e=["","Webkit","Moz","O","ms","Khtml"],t=document.createElement("p"),n=0;n<e.length;n++)if("undefined"!=typeof t.style[e[n]+"AnimationName"])return!0}()}()},{"../flowplayer":18,"extend-object":26}],17:[function(e,t,n){"use strict";function r(e){return e=parseInt(e,10),e>=10?e:"0"+e}function o(e){e=e||0;var t=Math.floor(e/3600),n=Math.floor(e/60);return e-=60*n,t>=1?(n-=60*t,t+":"+r(n)+":"+r(e)):r(n)+":"+r(e)}var i=e("../flowplayer"),a=e("../common"),l=e("class-list"),s=e("bean"),u=e("./slider");i(function(e,t){function n(e){return a.find(".fp-"+e,t)[0]}function r(e){a.css(w,"padding-top",100*e+"%"),p.inlineBlock||a.height(a.find("object",t)[0],a.height(t))}function c(e){e?(v.add("is-mouseover"),v.remove("is-mouseout")):(v.add("is-mouseout"),v.remove("is-mouseover"))}var f,d=e.conf,p=i.support,v=l(t);a.find(".fp-ratio,.fp-ui",t).forEach(a.removeNode),v.add("flowplayer"),t.appendChild(a.createElement("div",{className:"fp-ratio"}));var m=a.createElement("div",{className:"fp-ui"},'         <div class="waiting"><em></em><em></em><em></em></div>         <a class="fullscreen"></a>         <a class="unload"></a>         <p class="speed"></p>         <div class="controls">            <a class="play"></a>            <div class="timeline">               <div class="buffer"></div>               <div class="progress"></div>            </div>            <div class="timeline-tooltip fp-tooltip"></div>            <div class="volume">               <a class="mute"></a>               <div class="volumeslider">                  <div class="volumelevel"></div>               </div>            </div>         </div>         <div class="time">            <em class="elapsed">00:00</em>            <em class="remaining"></em>            <em class="duration">00:00</em>         </div>         <div class="message"><h2></h2><p></p></div>'.replace(/class="/g,'class="fp-'));t.appendChild(m);var h=(n("progress"),n("buffer")),g=n("elapsed"),y=n("remaining"),b=n("waiting"),w=n("ratio"),x=n("speed"),E=l(x),k=n("duration"),T=n("controls"),S=n("timeline-tooltip"),C=a.css(w,"padding-top"),N=n("timeline"),O=u(N,e.rtl),j=(n("volume"),n("fullscreen")),P=n("volumeslider"),A=u(P,e.rtl),_=v.contains("fixed-controls")||v.contains("no-toggle");O.disableAnimation(v.contains("is-touch")),e.sliders=e.sliders||{},e.sliders.timeline=O,e.sliders.volume=A,p.animation||a.html(b,"<p>loading &hellip;</p>"),d.ratio&&r(d.ratio);try{d.fullscreen||a.removeNode(j)}catch(D){a.removeNode(j)}e.on("ready",function(e,n,i){var l=n.video.duration;O.disable(n.disabled||!l),d.adaptiveRatio&&!isNaN(i.height/i.width)&&r(i.height/i.width,!0),a.html([k,y],o(l)),a.toggleClass(t,"is-long",l>=3600),A.slide(n.volumeLevel),"flash"===n.engine.engineName?O.disableAnimation(!0,!0):O.disableAnimation(!1),a.find(".fp-title",m).forEach(a.removeNode),i.title&&a.prepend(m,a.createElement("div",{className:"fp-title"},i.title))}).on("unload",function(){C||a.css(w,"paddingTop",""),O.slide(0)}).on("buffer",function(){var t=e.video,n=t.buffer/t.duration;!t.seekable&&p.seekable&&O.max(n),1>n?a.css(h,"width",100*n+"%"):a.css(h,"width","100%")}).on("speed",function(e,t,n){a.text(x,n+"x"),E.add("fp-hilite"),setTimeout(function(){E.remove("fp-hilite")},1e3)}).on("buffered",function(){a.css(h,"width","100%"),O.max(1)}).on("progress",function(){var t=e.video.time,n=e.video.duration;O.dragging||O.slide(t/n,e.seeking?0:250),a.html(g,o(t)),a.html(y,"-"+o(n-t))}).on("finish resume seek",function(e){a.toggleClass(t,"is-finished","finish"==e.type)}).on("stop",function(){a.html(g,o(0)),O.slide(0,100)}).on("finish",function(){a.html(g,o(e.video.duration)),O.slide(1,100),v.remove("is-seeking")}).on("beforeseek",function(){}).on("volume",function(){A.slide(e.volumeLevel)}).on("disable",function(){var n=e.disabled;O.disable(n),A.disable(n),a.toggleClass(t,"is-disabled",e.disabled)}).on("mute",function(e,n,r){a.toggleClass(t,"is-muted",r)}).on("error",function(e,n,r){if(a.removeClass(t,"is-loading"),a.addClass(t,"is-error"),r){r.message=d.errors[r.code],n.error=!0;var o=a.find(".fp-message",t)[0],i=r.video||n.video;a.find("h2",o)[0].innerHTML=(n.engine&&n.engine.engineName||"html5")+": "+r.message,a.find("p",o)[0].innerHTML=r.url||i.url||i.src||d.errorUrls[r.code],n.off("mouseenter click"),v.remove("is-mouseover")}}),s.on(t,"mouseenter mouseleave",function(n){if(!_){var r,o="mouseover"==n.type;if(c(o),o){var i=function(){c(!0),r=new Date};e.on("pause.x volume.x",i),s.on(t,"mousemove.x",i),f=setInterval(function(){new Date-r>d.mouseoutTimeout&&(c(!1),r=new Date)},100)}else s.off(t,"mousemove.x"),e.off("pause.x volume.x"),clearInterval(f)}}),s.on(t,"mouseleave",function(){(O.dragging||A.dragging)&&(v.add("is-mouseover"),v.remove("is-mouseout"))}),s.on(t,"click.player",function(t){if(!e.disabled){var n=l(t.target);return n.contains("fp-ui")||n.contains("fp-engine")||t.flash?(t.preventDefault&&t.preventDefault(),e.toggle()):void 0}}),s.on(t,"mousemove",".fp-timeline",function(t){var n=t.pageX||t.clientX,r=n-a.offset(N).left,i=r/a.width(N),l=i*e.video.duration;0>i||(a.html(S,o(l)),a.css(S,"left",n-a.offset(T).left-a.width(S)/2+"px"))}),s.on(t,"contextmenu",function(e){var n=a.offset(a.find(".fp-player",t)[0]),r=window,o=e.clientX-n.left,i=e.clientY-(n.top+r.scrollY),l=a.find(".fp-context-menu",t)[0];l&&(e.preventDefault(),a.css(l,{left:o+"px",top:i+"px",display:"block"}),s.on(t,"click",".fp-context-menu",function(e){e.stopPropagation()}),s.on(document,"click.outsidemenu",function(e){a.css(l,"display","none"),s.off(document,"click.outsidemenu")}))}),e.on("flashdisabled",function(){v.add("is-flash-disabled"),e.one("ready",function(){v.remove("is-flash-disabled"),a.find(".fp-flash-disabled",t).forEach(a.removeNode)}),t.appendChild(a.createElement("div",{className:"fp-flash-disabled"},"Adobe Flash is disabled for this page, click player area to enable"))}),d.poster&&a.css(t,"background-image","url("+d.poster+")");var I=a.css(t,"background-color"),M="none"!=a.css(t,"background-image")||I&&"rgba(0, 0, 0, 0)"!=I&&"transparent"!=I;!M||d.splash||d.autoplay||e.on("ready stop",function(){v.add("is-poster"),e.one("progress",function(){v.remove("is-poster")})}),"string"==typeof d.splash&&a.css(t,"background-image","url('"+d.splash+"')"),!M&&e.forcedSplash&&a.css(t,"background-color","#555"),s.on(t,"click",".fp-toggle, .fp-play",function(){e.disabled||e.toggle()}),s.on(t,"click",".fp-mute",function(){e.mute()}),s.on(t,"click",".fp-fullscreen",function(){e.fullscreen()}),s.on(t,"click",".fp-unload",function(){e.unload()}),s.on(N,"slide",function(t){e.seeking=!0,e.seek(t*e.video.duration)}),s.on(P,"slide",function(t){e.volume(t)});var L=n("time");s.on(t,"click",".fp-time",function(){l(L).toggle("is-inverted")}),c(_),e.on("shutdown",function(){s.off(N),s.off(P)})}),t.exports.format=o},{"../common":1,"../flowplayer":18,"./slider":14,bean:20,"class-list":22}],18:[function(e,t,n){"use strict";function r(e,t,n){t&&t.embed&&(t.embed=o({},y.defaults.embed,t.embed));var r,d,v=e,m=a(v),h=o({},y.defaults,y.conf,t),g={},x=new w;m.add("is-loading");try{g=p?window.localStorage:g}catch(E){}var k=v.currentStyle&&"rtl"===v.currentStyle.direction||window.getComputedStyle&&null!==window.getComputedStyle(v,null)&&"rtl"===window.getComputedStyle(v,null).getPropertyValue("direction");k&&m.add("is-rtl");var T={conf:h,currentSpeed:1,volumeLevel:h.muted?0:"undefined"==typeof h.volume?1*g.volume:h.volume,video:{},disabled:!1,finished:!1,loading:!1,muted:"true"==g.muted||h.muted,paused:!1,playing:!1,ready:!1,splash:!1,rtl:k,load:function(e,t){if(!T.error&&!T.loading){T.video={},T.finished=!1,e=e||h.clip,e=o({},x.resolve(e,h.clip.sources)),(T.playing||T.engine)&&(e.autoplay=!0);var n=S(e);if(!n)return T.trigger("error",[T,{code:y.support.flashVideo?5:10}]);if(!n.engineName)throw new Error("engineName property of factory should be exposed");if(T.engine&&n.engineName===T.engine.engineName||(T.ready=!1,T.engine&&(T.engine.unload(),T.conf.autoplay=!0),d=T.engine=n(T,v),T.one("ready",function(){d.volume(T.volumeLevel)})),o(e,d.pick(e.sources.filter(function(e){return e.engine?e.engine===d.engineName:!0}))),e.src){e.src=s.createElement("a",{href:e.src}).href;var r=T.trigger("load",[T,e,d],!0);r.defaultPrevented?T.loading=!1:(d.load(e),i(e)&&(t=e),t&&T.one("ready",t))}return T}},pause:function(e){return!T.ready||T.seeking||T.loading||(d.pause(),T.one("pause",e)),T},resume:function(){return T.ready&&T.paused&&(d.resume(),T.finished&&(T.trigger("resume",[T]),T.finished=!1)),T},toggle:function(){return T.ready?T.paused?T.resume():T.pause():T.load()},seek:function(e,t){if(T.ready&&!T.live){if("boolean"==typeof e){var n=.1*T.video.duration;e=T.video.time+(e?n:-n)}e=r=Math.min(Math.max(e,0),T.video.duration).toFixed(1);var o=T.trigger("beforeseek",[T,e],!0);o.defaultPrevented?(T.seeking=!1,s.toggleClass(v,"is-seeking",T.seeking)):(d.seek(e),i(t)&&T.one("seek",t))}return T},seekTo:function(e,t){var n=void 0===e?r:.1*T.video.duration*e;return T.seek(n,t)},mute:function(e,t){return void 0===e&&(e=!T.muted),t||(g.muted=T.muted=e,g.volume=isNaN(g.volume)?h.volume:g.volume),T.volume(e?0:g.volume,!0),T.trigger("mute",[T,e]),T},volume:function(e,t){return T.ready&&(e=Math.min(Math.max(e,0),1),t||(g.volume=e),d.volume(e)),T},speed:function(e,t){return T.ready&&("boolean"==typeof e&&(e=h.speeds[h.speeds.indexOf(T.currentSpeed)+(e?1:-1)]||T.currentSpeed),d.speed(e),t&&v.one("speed",t)),T},stop:function(){return T.ready&&(T.pause(),T.seek(0,function(){T.trigger("stop")})),T},unload:function(){return m.contains("is-embedding")||(h.splash?(T.trigger("unload",[T]),d&&d.unload()):T.stop()),T},shutdown:function(){T.unload(),T.trigger("shutdown",[T]),l.off(v),delete c[v.getAttribute("data-flowplayer-instance-id")]},disable:function(e){return void 0===e&&(e=!T.disabled),e!=T.disabled&&(T.disabled=e,T.trigger("disable",e)),T}};T.conf=o(T.conf,h),u(T);var S=function(e){var t,n=y.engines;if(h.engine){var r=n.filter(function(e){return e.engineName===h.engine})[0];if(r&&e.sources.some(function(e){return e.engine&&e.engine!==r.engineName?!1:r.canPlay(e.type,T.conf)}))return r}return h.enginePreference&&(n=y.engines.filter(function(e){return h.enginePreference.indexOf(e.engineName)>-1}).sort(function(e,t){return h.enginePreference.indexOf(e.engineName)-h.enginePreference.indexOf(t.engineName)})),e.sources.some(function(e){var r=n.filter(function(t){return e.engine&&e.engine!==t.engineName?!1:t.canPlay(e.type,T.conf)}).shift();return r&&(t=r),!!r}),t};return v.getAttribute("data-flowplayer-instance-id")||(v.setAttribute("data-flowplayer-instance-id",b++),T.on("boot",function(){(h.splash||m.contains("is-splash")||!y.support.firstframe)&&(T.forcedSplash=!h.splash&&!m.contains("is-splash"),T.splash=h.autoplay=!0,h.splash||(h.splash=!0),m.add("is-splash")),h.splash&&s.find("video",v).forEach(s.removeNode),(h.live||m.contains("is-live"))&&(T.live=h.live=!0,m.add("is-live")),f.forEach(function(e){e(T,v)}),c.push(T),h.splash?T.unload():T.load(),h.disabled&&T.disable(),T.one("ready",n)}).on("load",function(e,t,n){h.splash&&s.find(".flowplayer.is-ready,.flowplayer.is-loading").forEach(function(e){var t=e.getAttribute("data-flowplayer-instance-id");if(t!==v.getAttribute("data-flowplayer-instance-id")){var n=c[Number(t)];n&&n.conf.splash&&n.unload()}}),m.add("is-loading"),t.loading=!0,"undefined"!=typeof n.live&&(s.toggleClass(v,"is-live",n.live),t.live=n.live)}).on("ready",function(e,t,n){n.time=0,t.video=n,m.remove("is-loading"),t.loading=!1,t.muted?t.mute(!0,!0):t.volume(t.volumeLevel);var r=t.conf.hlsFix&&/mpegurl/i.exec(n.type);s.toggleClass(v,"hls-fix",!!r)}).on("unload",function(e){m.remove("is-loading"),T.loading=!1}).on("ready unload",function(e){var t="ready"==e.type;s.toggleClass(v,"is-splash",!t),s.toggleClass(v,"is-ready",t),T.ready=t,T.splash=!t}).on("progress",function(e,t,n){t.video.time=n}).on("speed",function(e,t,n){t.currentSpeed=n}).on("volume",function(e,t,n){t.volumeLevel=Math.round(100*n)/100,t.muted?n&&t.mute(!1):g.volume=n}).on("beforeseek seek",function(e){T.seeking="beforeseek"==e.type,s.toggleClass(v,"is-seeking",T.seeking)}).on("ready pause resume unload finish stop",function(e,t,n){T.paused=/pause|finish|unload|stop/.test(e.type),T.paused=T.paused||"ready"===e.type&&!h.autoplay&&!T.playing,T.playing=!T.paused,s.toggleClass(v,"is-paused",T.paused),s.toggleClass(v,"is-playing",T.playing),T.load.ed||T.pause()}).on("finish",function(e){T.finished=!0}).on("error",function(){})),T.trigger("boot",[T,v]),T}var o=e("extend-object"),i=e("is-function"),a=e("class-list"),l=e("bean"),s=e("./common"),u=e("./ext/events"),c=[],f=[],d=(window.navigator.userAgent,window.onbeforeunload);window.onbeforeunload=function(e){return c.forEach(function(e){e.conf.splash?e.unload():e.bind("error",function(){s.find(".flowplayer.is-error .fp-message").forEach(s.removeNode)})}),d?d(e):void 0};var p=!1;try{"object"==typeof window.localStorage&&(window.localStorage.flowplayerTestStorage="test",p=!0)}catch(v){}var m=/Safari/.exec(navigator.userAgent)&&!/Chrome/.exec(navigator.userAgent),h=/(\d+\.\d+) Safari/.exec(navigator.userAgent),g=h?Number(h[1]):100,y=t.exports=function(e,t,n){if(i(e))return f.push(e);if("number"==typeof e||"undefined"==typeof e)return c[e||0];if(e.nodeType){if(null!==e.getAttribute("data-flowplayer-instance-id"))return c[e.getAttribute("data-flowplayer-instance-id")];if(!t)return;return r(e,t,n)}if(e.jquery)return y(e[0],t,n);if("string"==typeof e){var o=s.find(e)[0];return o&&y(o,t,n)}};o(y,{version:"6.0.3",engines:[],conf:{},set:function(e,t){"string"==typeof e?y.conf[e]=t:o(y.conf,e)},support:{},defaults:{debug:p?!!localStorage.flowplayerDebug:!1,disabled:!1,fullscreen:window==window.top,keyboard:!0,ratio:9/16,adaptiveRatio:!1,rtmp:0,proxy:"best",splash:!1,live:!1,swf:"//releases.flowplayer.org/6.0.3/flowplayer.swf",swfHls:"//releases.flowplayer.org/6.0.3/flowplayerhls.swf",speeds:[.25,.5,1,1.5,2],tooltip:!0,mouseoutTimeout:5e3,volume:p?"true"==localStorage.muted?0:isNaN(localStorage.volume)?1:localStorage.volume||1:1,errors:["","Video loading aborted","Network error","Video not properly encoded","Video file not found","Unsupported video","Skin not found","SWF file not found","Subtitles not found","Invalid RTMP URL","Unsupported video format. Try installing Adobe Flash."],errorUrls:["","","","","","","","","","","http://get.adobe.com/flashplayer/"],playlist:[],hlsFix:m&&8>g},bean:l,common:s,extend:o});var b=0,w=e("./ext/resolve");if("undefined"!=typeof window.jQuery){var x=window.jQuery;x(function(){"function"==typeof x.fn.flowplayer&&x('.flowplayer:has(video,script[type="application/json"])').flowplayer()});var E=function(e){if(!e.length)return{};var t=e.data()||{},n={};return x.each(["autoplay","loop","preload","poster"],function(r,o){var i=e.attr(o);void 0!==i&&-1!==["autoplay","poster"].indexOf(o)?n[o]=i?i:!0:void 0!==i&&(t[o]=i?i:!0)}),t.subtitles=e.find("track").map(function(){var e=x(this);return{src:e.attr("src"),kind:e.attr("kind"),label:e.attr("label"),srclang:e.attr("srclang"),"default":e.prop("default")}}).get(),t.sources=(new w).sourcesFromVideoTag(e,x),o(n,{clip:t})};x.fn.flowplayer=function(e,t){return this.each(function(){"string"==typeof e&&(e={swf:e}),i(e)&&(t=e,e={});var n=x(this),o=n.find('script[type="application/json"]'),a=o.length?JSON.parse(o.text()):E(n.find("video")),l=x.extend({},e||{},a,n.data()),s=r(this,l,t);u.EVENTS.forEach(function(e){s.on(e+".jquery",function(e){n.trigger.call(n,e.type,e.detail&&e.detail.args)})}),n.data("flowplayer",s)})}}},{"./common":1,"./ext/events":8,"./ext/resolve":13,bean:20,"class-list":22,"extend-object":26,"is-function":27}],19:[function(e,t,n){e("es5-shim");var r=t.exports=e("./flowplayer");e("./ext/support"),e("./engine/embed"),e("./engine/html5"),e("./engine/flash"),e("./ext/ui"),e("./ext/keyboard"),e("./ext/playlist"),e("./ext/cuepoint"),e("./ext/subtitle"),e("./ext/analytics"),e("./ext/embed"),e("./ext/fullscreen"),e("./ext/mobile"),r(function(e,t){function n(e){var t=document.createElement("a");return t.href=e,l.hostname(t.hostname)}var o=function(e,t){var n=e.className.split(" ");-1===n.indexOf(t)&&(e.className+=" "+t)},i=function(e){return"none"!==window.getComputedStyle(e).display},a=e.conf,l=r.common,s=l.createElement,u=a.swf.indexOf("flowplayer.org")&&a.e&&t.getAttribute("data-origin"),c=u?n(u):l.hostname(),f=(document,a.key);"file:"==location.protocol&&(c="localhost"),e.load.ed=1,a.hostname=c,a.origin=u||location.href,u&&o(t,"is-embedded"),"string"==typeof f&&(f=f.split(/,\s*/));var d=function(e,n){var r=s("a",{href:n,className:"fp-brand"});r.innerHTML=e,l.find(".fp-controls",t)[0].appendChild(r)};if(f&&"function"==typeof key_check&&key_check(f,c)){if(a.logo){var p=s("a",{href:u,className:"fp-logo"});a.embed&&a.embed.popup&&(p.target="_blank");var v=s("img",{src:a.logo});p.appendChild(v),t.appendChild(p)}a.brand&&u||a.brand&&a.brand.showOnOrigin?d(a.brand.text||a.brand,u||location.href):l.addClass(t,"no-brand")}else{d("flowplayer","http://flowplayer.org");var p=s("a",{href:"http://flowplayer.org"});t.appendChild(p);var m=s("div",{className:"fp-context-menu"},'<ul><li class="copyright">&copy; 2015</li><li><a href="http://flowplayer.org">About Flowplayer</a></li><li><a href="http://flowplayer.org/license">GPL based license</a></li></ul>'),h=window.location.href.indexOf("localhost"),g=l.find(".fp-player",t)[0];7!==h&&(g||t).appendChild(m),e.on("pause resume finish unload ready",function(e,n){l.removeClass(t,"no-brand");var r=-1;if(n.video.src)for(var o=[["org","flowplayer","drive"],["org","flowplayer","my"]],a=0;a<o.length&&(r=n.video.src.indexOf("://"+o[a].reverse().join(".")),-1===r);a++);if((4===r||5===r)&&l.addClass(t,"no-brand"),/pause|resume/.test(e.type)&&"flash"!=n.engine.engineName&&4!=r&&5!=r){var s={display:"block",position:"absolute",left:"16px",bottom:"46px",zIndex:99999,width:"100px",
height:"20px",backgroundImage:"url("+[".png","logo","/",".net",".cloudfront","d32wqyuo10o653","//"].reverse().join("")+")"};for(var u in s)s.hasOwnProperty(u)&&(p.style[u]=s[u]);n.load.ed=i(p)&&(7===h||m.parentNode==t||m.parentNode==g)&&!l.hasClass(t,"no-brand"),n.load.ed||n.pause()}else p.style.display="none"})}})},{"./engine/embed":2,"./engine/flash":3,"./engine/html5":4,"./ext/analytics":5,"./ext/cuepoint":6,"./ext/embed":7,"./ext/fullscreen":9,"./ext/keyboard":10,"./ext/mobile":11,"./ext/playlist":12,"./ext/subtitle":15,"./ext/support":16,"./ext/ui":17,"./flowplayer":18,"es5-shim":25}],20:[function(t,n,r){!function(t,r,o){"undefined"!=typeof n&&n.exports?n.exports=o():"function"==typeof e&&e.amd?e(o):r[t]=o()}("bean",this,function(e,t){e=e||"bean",t=t||this;var n,r=window,o=t[e],i=/[^\.]*(?=\..*)\.|.*/,a=/\..*/,l="addEventListener",s="removeEventListener",u=document||{},c=u.documentElement||{},f=c[l],d=f?l:"attachEvent",p={},v=Array.prototype.slice,m=function(e,t){return e.split(t||" ")},h=function(e){return"string"==typeof e},g=function(e){return"function"==typeof e},y="click dblclick mouseup mousedown contextmenu mousewheel mousemultiwheel DOMMouseScroll mouseover mouseout mousemove selectstart selectend keydown keypress keyup orientationchange focus blur change reset select submit load unload beforeunload resize move DOMContentLoaded readystatechange message error abort scroll ",b="show input invalid touchstart touchmove touchend touchcancel gesturestart gesturechange gestureend textinput readystatechange pageshow pagehide popstate hashchange offline online afterprint beforeprint dragstart dragenter dragover dragleave drag drop dragend loadstart progress suspend emptied stalled loadmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate play pause ratechange volumechange cuechange checking noupdate downloading cached updateready obsolete ",w=function(e,t,n){for(n=0;n<t.length;n++)t[n]&&(e[t[n]]=1);return e}({},m(y+(f?b:""))),x=function(){var e="compareDocumentPosition"in c?function(e,t){return t.compareDocumentPosition&&16===(16&t.compareDocumentPosition(e))}:"contains"in c?function(e,t){return t=9===t.nodeType||t===window?c:t,t!==e&&t.contains(e)}:function(e,t){for(;e=e.parentNode;)if(e===t)return 1;return 0},t=function(t){var n=t.relatedTarget;return n?n!==this&&"xul"!==n.prefix&&!/document/.test(this.toString())&&!e(n,this):null==n};return{mouseenter:{base:"mouseover",condition:t},mouseleave:{base:"mouseout",condition:t},mousewheel:{base:/Firefox/.test(navigator.userAgent)?"DOMMouseScroll":"mousewheel"}}}(),E=function(){var e=m("altKey attrChange attrName bubbles cancelable ctrlKey currentTarget detail eventPhase getModifierState isTrusted metaKey relatedNode relatedTarget shiftKey srcElement target timeStamp type view which propertyName"),t=e.concat(m("button buttons clientX clientY dataTransfer fromElement offsetX offsetY pageX pageY screenX screenY toElement")),n=t.concat(m("wheelDelta wheelDeltaX wheelDeltaY wheelDeltaZ axis")),o=e.concat(m("char charCode key keyCode keyIdentifier keyLocation location")),i=e.concat(m("data")),a=e.concat(m("touches targetTouches changedTouches scale rotation")),l=e.concat(m("data origin source")),s=e.concat(m("state")),f=/over|out/,d=[{reg:/key/i,fix:function(e,t){return t.keyCode=e.keyCode||e.which,o}},{reg:/click|mouse(?!(.*wheel|scroll))|menu|drag|drop/i,fix:function(e,n,r){return n.rightClick=3===e.which||2===e.button,n.pos={x:0,y:0},e.pageX||e.pageY?(n.clientX=e.pageX,n.clientY=e.pageY):(e.clientX||e.clientY)&&(n.clientX=e.clientX+u.body.scrollLeft+c.scrollLeft,n.clientY=e.clientY+u.body.scrollTop+c.scrollTop),f.test(r)&&(n.relatedTarget=e.relatedTarget||e[("mouseover"==r?"from":"to")+"Element"]),t}},{reg:/mouse.*(wheel|scroll)/i,fix:function(){return n}},{reg:/^text/i,fix:function(){return i}},{reg:/^touch|^gesture/i,fix:function(){return a}},{reg:/^message$/i,fix:function(){return l}},{reg:/^popstate$/i,fix:function(){return s}},{reg:/.*/,fix:function(){return e}}],p={},v=function(e,t,n){if(arguments.length&&(e=e||((t.ownerDocument||t.document||t).parentWindow||r).event,this.originalEvent=e,this.isNative=n,this.isBean=!0,e)){var o,i,a,l,s,u=e.type,c=e.target||e.srcElement;if(this.target=c&&3===c.nodeType?c.parentNode:c,n){if(s=p[u],!s)for(o=0,i=d.length;i>o;o++)if(d[o].reg.test(u)){p[u]=s=d[o].fix;break}for(l=s(e,this,u),o=l.length;o--;)!((a=l[o])in this)&&a in e&&(this[a]=e[a])}}};return v.prototype.preventDefault=function(){this.originalEvent.preventDefault?this.originalEvent.preventDefault():this.originalEvent.returnValue=!1},v.prototype.stopPropagation=function(){this.originalEvent.stopPropagation?this.originalEvent.stopPropagation():this.originalEvent.cancelBubble=!0},v.prototype.stop=function(){this.preventDefault(),this.stopPropagation(),this.stopped=!0},v.prototype.stopImmediatePropagation=function(){this.originalEvent.stopImmediatePropagation&&this.originalEvent.stopImmediatePropagation(),this.isImmediatePropagationStopped=function(){return!0}},v.prototype.isImmediatePropagationStopped=function(){return this.originalEvent.isImmediatePropagationStopped&&this.originalEvent.isImmediatePropagationStopped()},v.prototype.clone=function(e){var t=new v(this,this.element,this.isNative);return t.currentTarget=e,t},v}(),k=function(e,t){return f||t||e!==u&&e!==r?e:c},T=function(){var e=function(e,t,n,r){var o=function(n,o){return t.apply(e,r?v.call(o,n?0:1).concat(r):o)},i=function(n,r){return t.__beanDel?t.__beanDel.ft(n.target,e):r},a=n?function(e){var t=i(e,this);return n.apply(t,arguments)?(e&&(e.currentTarget=t),o(e,arguments)):void 0}:function(e){return t.__beanDel&&(e=e.clone(i(e))),o(e,arguments)};return a.__beanDel=t.__beanDel,a},t=function(t,n,r,o,i,a,l){var s,u=x[n];"unload"==n&&(r=j(P,t,n,r,o)),u&&(u.condition&&(r=e(t,r,u.condition,a)),n=u.base||n),this.isNative=s=w[n]&&!!t[d],this.customType=!f&&!s&&n,this.element=t,this.type=n,this.original=o,this.namespaces=i,this.eventType=f||s?n:"propertychange",this.target=k(t,s),this[d]=!!this.target[d],this.root=l,this.handler=e(t,r,null,a)};return t.prototype.inNamespaces=function(e){var t,n,r=0;if(!e)return!0;if(!this.namespaces)return!1;for(t=e.length;t--;)for(n=this.namespaces.length;n--;)e[t]==this.namespaces[n]&&r++;return e.length===r},t.prototype.matches=function(e,t,n){return!(this.element!==e||t&&this.original!==t||n&&this.handler!==n)},t}(),S=function(){var e={},t=function(n,r,o,i,a,l){var s=a?"r":"$";if(r&&"*"!=r){var u,c=0,f=e[s+r],d="*"==n;if(!f)return;for(u=f.length;u>c;c++)if((d||f[c].matches(n,o,i))&&!l(f[c],f,c,r))return}else for(var p in e)p.charAt(0)==s&&t(n,p.substr(1),o,i,a,l)},n=function(t,n,r,o){var i,a=e[(o?"r":"$")+n];if(a)for(i=a.length;i--;)if(!a[i].root&&a[i].matches(t,r,null))return!0;return!1},r=function(e,n,r,o){var i=[];return t(e,n,r,null,o,function(e){return i.push(e)}),i},o=function(t){var n=!t.root&&!this.has(t.element,t.type,null,!1),r=(t.root?"r":"$")+t.type;return(e[r]||(e[r]=[])).push(t),n},i=function(n){t(n.element,n.type,null,n.handler,n.root,function(t,n,r){return n.splice(r,1),t.removed=!0,0===n.length&&delete e[(t.root?"r":"$")+t.type],!1})},a=function(){var t,n=[];for(t in e)"$"==t.charAt(0)&&(n=n.concat(e[t]));return n};return{has:n,get:r,put:o,del:i,entries:a}}(),C=function(e){n=arguments.length?e:u.querySelectorAll?function(e,t){return t.querySelectorAll(e)}:function(){throw new Error("Bean: No selector engine installed")}},N=function(e,t){if(f||!t||!e||e.propertyName=="_on"+t){var n=S.get(this,t||e.type,null,!1),r=n.length,o=0;for(e=new E(e,this,!0),t&&(e.type=t);r>o&&!e.isImmediatePropagationStopped();o++)n[o].removed||n[o].handler.call(this,e)}},O=f?function(e,t,n){e[n?l:s](t,N,!1)}:function(e,t,n,r){var o;n?(S.put(o=new T(e,r||t,function(t){N.call(e,t,r)},N,null,null,!0)),r&&null==e["_on"+r]&&(e["_on"+r]=0),o.target.attachEvent("on"+o.eventType,o.handler)):(o=S.get(e,r||t,N,!0)[0],o&&(o.target.detachEvent("on"+o.eventType,o.handler),S.del(o)))},j=function(e,t,n,r,o){return function(){r.apply(this,arguments),e(t,n,o)}},P=function(e,t,n,r){var o,i,l=t&&t.replace(a,""),s=S.get(e,l,null,!1),u={};for(o=0,i=s.length;i>o;o++)n&&s[o].original!==n||!s[o].inNamespaces(r)||(S.del(s[o]),!u[s[o].eventType]&&s[o][d]&&(u[s[o].eventType]={t:s[o].eventType,c:s[o].type}));for(o in u)S.has(e,u[o].t,null,!1)||O(e,u[o].t,!1,u[o].c)},A=function(e,t){var r=function(t,r){for(var o,i=h(e)?n(e,r):e;t&&t!==r;t=t.parentNode)for(o=i.length;o--;)if(i[o]===t)return t},o=function(e){var n=r(e.target,this);n&&t.apply(n,arguments)};return o.__beanDel={ft:r,selector:e},o},_=f?function(e,t,n){var o=u.createEvent(e?"HTMLEvents":"UIEvents");o[e?"initEvent":"initUIEvent"](t,!0,!0,r,1),n.dispatchEvent(o)}:function(e,t,n){n=k(n,e),e?n.fireEvent("on"+t,u.createEventObject()):n["_on"+t]++},D=function(e,t,n){var r,o,l,s,u=h(t);if(u&&t.indexOf(" ")>0){for(t=m(t),s=t.length;s--;)D(e,t[s],n);return e}if(o=u&&t.replace(a,""),o&&x[o]&&(o=x[o].base),!t||u)(l=u&&t.replace(i,""))&&(l=m(l,".")),P(e,o,n,l);else if(g(t))P(e,null,t);else for(r in t)t.hasOwnProperty(r)&&D(e,r,t[r]);return e},I=function(e,t,r,o){var l,s,u,c,f,h,y;{if(void 0!==r||"object"!=typeof t){for(g(r)?(f=v.call(arguments,3),o=l=r):(l=o,f=v.call(arguments,4),o=A(r,l,n)),u=m(t),this===p&&(o=j(D,e,t,o,l)),c=u.length;c--;)y=S.put(h=new T(e,u[c].replace(a,""),o,l,m(u[c].replace(i,""),"."),f,!1)),h[d]&&y&&O(e,h.eventType,!0,h.customType);return e}for(s in t)t.hasOwnProperty(s)&&I.call(this,e,s,t[s])}},M=function(e,t,n,r){return I.apply(null,h(n)?[e,n,t,r].concat(arguments.length>3?v.call(arguments,5):[]):v.call(arguments))},L=function(){return I.apply(p,arguments)},F=function(e,t,n){var r,o,l,s,u,c=m(t);for(r=c.length;r--;)if(t=c[r].replace(a,""),(s=c[r].replace(i,""))&&(s=m(s,".")),s||n||!e[d])for(u=S.get(e,t,null,!1),n=[!1].concat(n),o=0,l=u.length;l>o;o++)u[o].inNamespaces(s)&&u[o].handler.apply(e,n);else _(w[t],t,e);return e},$=function(e,t,n){for(var r,o,i=S.get(t,n,null,!1),a=i.length,l=0;a>l;l++)i[l].original&&(r=[e,i[l].type],(o=i[l].handler.__beanDel)&&r.push(o.selector),r.push(i[l].original),I.apply(null,r));return e},R={on:I,add:M,one:L,off:D,remove:D,clone:$,fire:F,Event:E,setSelectorEngine:C,noConflict:function(){return t[e]=o,this}};if(r.attachEvent){var V=function(){var e,t=S.entries();for(e in t)t[e].type&&"unload"!==t[e].type&&D(t[e].element,t[e].type);r.detachEvent("onunload",V),r.CollectGarbage&&r.CollectGarbage()};r.attachEvent("onunload",V)}return C(),R})},{}],21:[function(t,n,r){(function(t){!function(o){function i(e){throw RangeError(I[e])}function a(e,t){for(var n=e.length;n--;)e[n]=t(e[n]);return e}function l(e,t){return a(e.split(D),t).join(".")}function s(e){for(var t,n,r=[],o=0,i=e.length;i>o;)t=e.charCodeAt(o++),t>=55296&&56319>=t&&i>o?(n=e.charCodeAt(o++),56320==(64512&n)?r.push(((1023&t)<<10)+(1023&n)+65536):(r.push(t),o--)):r.push(t);return r}function u(e){return a(e,function(e){var t="";return e>65535&&(e-=65536,t+=F(e>>>10&1023|55296),e=56320|1023&e),t+=F(e)}).join("")}function c(e){return 10>e-48?e-22:26>e-65?e-65:26>e-97?e-97:k}function f(e,t){return e+22+75*(26>e)-((0!=t)<<5)}function d(e,t,n){var r=0;for(e=n?L(e/N):e>>1,e+=L(e/t);e>M*S>>1;r+=k)e=L(e/M);return L(r+(M+1)*e/(e+C))}function p(e){var t,n,r,o,a,l,s,f,p,v,m=[],h=e.length,g=0,y=j,b=O;for(n=e.lastIndexOf(P),0>n&&(n=0),r=0;n>r;++r)e.charCodeAt(r)>=128&&i("not-basic"),m.push(e.charCodeAt(r));for(o=n>0?n+1:0;h>o;){for(a=g,l=1,s=k;o>=h&&i("invalid-input"),f=c(e.charCodeAt(o++)),(f>=k||f>L((E-g)/l))&&i("overflow"),g+=f*l,p=b>=s?T:s>=b+S?S:s-b,!(p>f);s+=k)v=k-p,l>L(E/v)&&i("overflow"),l*=v;t=m.length+1,b=d(g-a,t,0==a),L(g/t)>E-y&&i("overflow"),y+=L(g/t),g%=t,m.splice(g++,0,y)}return u(m)}function v(e){var t,n,r,o,a,l,u,c,p,v,m,h,g,y,b,w=[];for(e=s(e),h=e.length,t=j,n=0,a=O,l=0;h>l;++l)m=e[l],128>m&&w.push(F(m));for(r=o=w.length,o&&w.push(P);h>r;){for(u=E,l=0;h>l;++l)m=e[l],m>=t&&u>m&&(u=m);for(g=r+1,u-t>L((E-n)/g)&&i("overflow"),n+=(u-t)*g,t=u,l=0;h>l;++l)if(m=e[l],t>m&&++n>E&&i("overflow"),m==t){for(c=n,p=k;v=a>=p?T:p>=a+S?S:p-a,!(v>c);p+=k)b=c-v,y=k-v,w.push(F(f(v+b%y,0))),c=L(b/y);w.push(F(f(c,0))),a=d(n,g,r==o),n=0,++r}++n,++t}return w.join("")}function m(e){return l(e,function(e){return A.test(e)?p(e.slice(4).toLowerCase()):e})}function h(e){return l(e,function(e){return _.test(e)?"xn--"+v(e):e})}var g="object"==typeof r&&r,y="object"==typeof n&&n&&n.exports==g&&n,b="object"==typeof t&&t;(b.global===b||b.window===b)&&(o=b);var w,x,E=2147483647,k=36,T=1,S=26,C=38,N=700,O=72,j=128,P="-",A=/^xn--/,_=/[^ -~]/,D=/\x2E|\u3002|\uFF0E|\uFF61/g,I={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},M=k-T,L=Math.floor,F=String.fromCharCode;if(w={version:"1.2.4",ucs2:{decode:s,encode:u},decode:p,encode:v,toASCII:h,toUnicode:m},"function"==typeof e&&"object"==typeof e.amd&&e.amd)e("punycode",function(){return w});else if(g&&!g.nodeType)if(y)y.exports=w;else for(x in w)w.hasOwnProperty(x)&&(g[x]=w[x]);else o.punycode=w}(this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],22:[function(e,t,n){function r(e){function t(e){var t=c();a(t,e)>-1||(t.push(e),f(t))}function n(e){var t=c(),n=a(t,e);-1!==n&&(t.splice(n,1),f(t))}function r(e){return a(c(),e)>-1}function l(e){return r(e)?(n(e),!1):(t(e),!0)}function s(){return e.className}function u(e){var t=c();return t[e]||null}function c(){var t=e.className;return o(t.split(" "),i)}function f(t){var n=t.length;e.className=t.join(" "),p.length=n;for(var r=0;r<t.length;r++)p[r]=t[r];delete t[n]}var d=e.classList;if(d)return d;var p={add:t,remove:n,contains:r,toggle:l,toString:s,length:0,item:u};return p}function o(e,t){for(var n=[],r=0;r<e.length;r++)t(e[r])&&n.push(e[r]);return n}function i(e){return!!e}var a=e("indexof");t.exports=r},{indexof:23}],23:[function(e,t,n){var r=[].indexOf;t.exports=function(e,t){if(r)return e.indexOf(t);for(var n=0;n<e.length;++n)if(e[n]===t)return n;return-1}},{}],24:[function(e,t,n){function r(e,t,n,r){return n=window.getComputedStyle,r=n?n(e):e.currentStyle,r?r[t.replace(/-(\w)/gi,function(e,t){return t.toUpperCase()})]:void 0}t.exports=r},{}],25:[function(t,n,r){!function(t,o){"use strict";"function"==typeof e&&e.amd?e(o):"object"==typeof r?n.exports=o():t.returnExports=o()}(this,function(){var e,t=Array,n=t.prototype,r=Object,o=r.prototype,i=Function.prototype,a=String,l=a.prototype,s=Number,u=s.prototype,c=n.slice,f=n.splice,d=n.push,p=n.unshift,v=n.concat,m=i.call,h=Math.max,g=Math.min,y=o.toString,b="function"==typeof Symbol&&"symbol"==typeof Symbol.toStringTag,w=Function.prototype.toString,x=function(e){try{return w.call(e),!0}catch(t){return!1}},E="[object Function]",k="[object GeneratorFunction]";e=function(e){if("function"!=typeof e)return!1;if(b)return x(e);var t=y.call(e);return t===E||t===k};var T,S=RegExp.prototype.exec,C=function(e){try{return S.call(e),!0}catch(t){return!1}},N="[object RegExp]";T=function(e){return"object"!=typeof e?!1:b?C(e):y.call(e)===N};var O,j=String.prototype.valueOf,P=function(e){try{return j.call(e),!0}catch(t){return!1}},A="[object String]";O=function(e){return"string"==typeof e?!0:"object"!=typeof e?!1:b?P(e):y.call(e)===A};var _=function(e){var t,n=r.defineProperty&&function(){try{var e={};r.defineProperty(e,"x",{enumerable:!1,value:e});for(var t in e)return!1;return e.x===e}catch(n){return!1}}();return t=n?function(e,t,n,o){!o&&t in e||r.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:!0,value:n})}:function(e,t,n,r){!r&&t in e||(e[t]=n)},function(n,r,o){for(var i in r)e.call(r,i)&&t(n,i,r[i],o)}}(o.hasOwnProperty),D=function(e){var t=typeof e;return null===e||"object"!==t&&"function"!==t},I={ToInteger:function(e){var t=+e;return t!==t?t=0:0!==t&&t!==1/0&&t!==-(1/0)&&(t=(t>0||-1)*Math.floor(Math.abs(t))),t},ToPrimitive:function(t){var n,r,o;if(D(t))return t;if(r=t.valueOf,e(r)&&(n=r.call(t),D(n)))return n;if(o=t.toString,e(o)&&(n=o.call(t),D(n)))return n;throw new TypeError},ToObject:function(e){if(null==e)throw new TypeError("can't convert "+e+" to object");return r(e)},ToUint32:function(e){return e>>>0}},M=function(){};_(i,{bind:function(t){var n=this;if(!e(n))throw new TypeError("Function.prototype.bind called on incompatible "+n);for(var o,i=c.call(arguments,1),a=function(){if(this instanceof o){var e=n.apply(this,v.call(i,c.call(arguments)));return r(e)===e?e:this}return n.apply(t,v.call(i,c.call(arguments)))},l=h(0,n.length-i.length),s=[],u=0;l>u;u++)d.call(s,"$"+u);return o=Function("binder","return function ("+s.join(",")+"){ return binder.apply(this, arguments); }")(a),n.prototype&&(M.prototype=n.prototype,o.prototype=new M,M.prototype=null),o}});var L=m.bind(o.hasOwnProperty),F=m.bind(o.toString),$=m.bind(l.slice),R=m.bind(l.split),V=t.isArray||function(e){return"[object Array]"===F(e)},H=1!==[].unshift(0);_(n,{unshift:function(){return p.apply(this,arguments),this.length}},H),_(t,{isArray:V});var U=r("a"),q="a"!==U[0]||!(0 in U),z=function(e){var t=!0,n=!0;return e&&(e.call("foo",function(e,n,r){"object"!=typeof r&&(t=!1)}),e.call([1],function(){"use strict";n="string"==typeof this},"x")),!!e&&t&&n};_(n,{forEach:function(t){var n,r=I.ToObject(this),o=q&&O(this)?R(this,""):r,i=-1,a=o.length>>>0;if(arguments.length>1&&(n=arguments[1]),!e(t))throw new TypeError("Array.prototype.forEach callback must be a function");for(;++i<a;)i in o&&("undefined"!=typeof n?t.call(n,o[i],i,r):t(o[i],i,r))}},!z(n.forEach)),_(n,{map:function(n){var r,o=I.ToObject(this),i=q&&O(this)?R(this,""):o,a=i.length>>>0,l=t(a);if(arguments.length>1&&(r=arguments[1]),!e(n))throw new TypeError("Array.prototype.map callback must be a function");for(var s=0;a>s;s++)s in i&&("undefined"!=typeof r?l[s]=n.call(r,i[s],s,o):l[s]=n(i[s],s,o));return l}},!z(n.map)),_(n,{filter:function(t){var n,r,o=I.ToObject(this),i=q&&O(this)?R(this,""):o,a=i.length>>>0,l=[];if(arguments.length>1&&(r=arguments[1]),!e(t))throw new TypeError("Array.prototype.filter callback must be a function");for(var s=0;a>s;s++)s in i&&(n=i[s],("undefined"==typeof r?t(n,s,o):t.call(r,n,s,o))&&d.call(l,n));return l}},!z(n.filter)),_(n,{every:function(t){var n,r=I.ToObject(this),o=q&&O(this)?R(this,""):r,i=o.length>>>0;if(arguments.length>1&&(n=arguments[1]),!e(t))throw new TypeError("Array.prototype.every callback must be a function");for(var a=0;i>a;a++)if(a in o&&!("undefined"==typeof n?t(o[a],a,r):t.call(n,o[a],a,r)))return!1;return!0}},!z(n.every)),_(n,{some:function(t){var n,r=I.ToObject(this),o=q&&O(this)?R(this,""):r,i=o.length>>>0;if(arguments.length>1&&(n=arguments[1]),!e(t))throw new TypeError("Array.prototype.some callback must be a function");for(var a=0;i>a;a++)if(a in o&&("undefined"==typeof n?t(o[a],a,r):t.call(n,o[a],a,r)))return!0;return!1}},!z(n.some));var X=!1;n.reduce&&(X="object"==typeof n.reduce.call("es5",function(e,t,n,r){return r})),_(n,{reduce:function(t){var n=I.ToObject(this),r=q&&O(this)?R(this,""):n,o=r.length>>>0;if(!e(t))throw new TypeError("Array.prototype.reduce callback must be a function");if(0===o&&1===arguments.length)throw new TypeError("reduce of empty array with no initial value");var i,a=0;if(arguments.length>=2)i=arguments[1];else for(;;){if(a in r){i=r[a++];break}if(++a>=o)throw new TypeError("reduce of empty array with no initial value")}for(;o>a;a++)a in r&&(i=t(i,r[a],a,n));return i}},!X);var B=!1;n.reduceRight&&(B="object"==typeof n.reduceRight.call("es5",function(e,t,n,r){return r})),_(n,{reduceRight:function(t){var n=I.ToObject(this),r=q&&O(this)?R(this,""):n,o=r.length>>>0;if(!e(t))throw new TypeError("Array.prototype.reduceRight callback must be a function");if(0===o&&1===arguments.length)throw new TypeError("reduceRight of empty array with no initial value");var i,a=o-1;if(arguments.length>=2)i=arguments[1];else for(;;){if(a in r){i=r[a--];break}if(--a<0)throw new TypeError("reduceRight of empty array with no initial value")}if(0>a)return i;do a in r&&(i=t(i,r[a],a,n));while(a--);return i}},!B);var Y=n.indexOf&&-1!==[0,1].indexOf(1,2);_(n,{indexOf:function(e){var t=q&&O(this)?R(this,""):I.ToObject(this),n=t.length>>>0;if(0===n)return-1;var r=0;for(arguments.length>1&&(r=I.ToInteger(arguments[1])),r=r>=0?r:h(0,n+r);n>r;r++)if(r in t&&t[r]===e)return r;return-1}},Y);var W=n.lastIndexOf&&-1!==[0,1].lastIndexOf(0,-3);_(n,{lastIndexOf:function(e){var t=q&&O(this)?R(this,""):I.ToObject(this),n=t.length>>>0;if(0===n)return-1;var r=n-1;for(arguments.length>1&&(r=g(r,I.ToInteger(arguments[1]))),r=r>=0?r:n-Math.abs(r);r>=0;r--)if(r in t&&e===t[r])return r;return-1}},W);var K=function(){var e=[1,2],t=e.splice();return 2===e.length&&V(t)&&0===t.length}();_(n,{splice:function(e,t){return 0===arguments.length?[]:f.apply(this,arguments)}},!K);var Z=function(){var e={};return n.splice.call(e,0,0,1),1===e.length}();_(n,{splice:function(e,t){if(0===arguments.length)return[];var n=arguments;return this.length=h(I.ToInteger(this.length),0),arguments.length>0&&"number"!=typeof t&&(n=c.call(arguments),n.length<2?d.call(n,this.length-e):n[1]=I.ToInteger(t)),f.apply(this,n)}},!Z);var G=function(){var e=new t(1e5);return e[8]="x",e.splice(1,1),7===e.indexOf("x")}(),J=function(){var e=256,t=[];return t[e]="a",t.splice(e+1,0,"b"),"a"===t[e]}();_(n,{splice:function(e,t){for(var n,r=I.ToObject(this),o=[],i=I.ToUint32(r.length),l=I.ToInteger(e),s=0>l?h(i+l,0):g(l,i),u=g(h(I.ToInteger(t),0),i-s),f=0;u>f;)n=a(s+f),L(r,n)&&(o[f]=r[n]),f+=1;var d,p=c.call(arguments,2),v=p.length;if(u>v){for(f=s;i-u>f;)n=a(f+u),d=a(f+v),L(r,n)?r[d]=r[n]:delete r[d],f+=1;for(f=i;f>i-u+v;)delete r[f-1],f-=1}else if(v>u)for(f=i-u;f>s;)n=a(f+u-1),d=a(f+v-1),L(r,n)?r[d]=r[n]:delete r[d],f-=1;f=s;for(var m=0;m<p.length;++m)r[f]=p[m],f+=1;return r.length=i-u+v,o}},!G||!J);var Q=!{toString:null}.propertyIsEnumerable("toString"),ee=function(){}.propertyIsEnumerable("prototype"),te=!L("x","0"),ne=function(e){var t=e.constructor;return t&&t.prototype===e},re={$window:!0,$console:!0,$parent:!0,$self:!0,$frames:!0,$frameElement:!0,$webkitIndexedDB:!0,$webkitStorageInfo:!0},oe=function(){if("undefined"==typeof window)return!1;for(var e in window)if(!re["$"+e]&&L(window,e)&&null!==window[e]&&"object"==typeof window[e])try{ne(window[e])}catch(t){return!0}return!1}(),ie=function(e){if("undefined"==typeof window||!oe)return ne(e);try{return ne(e)}catch(t){return!1}},ae=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],le=ae.length,se=function(t){var n=F(t),r="[object Arguments]"===n;return r||(r=!V(t)&&null!==t&&"object"==typeof t&&"number"==typeof t.length&&t.length>=0&&e(t.callee)),r};_(r,{keys:function(t){var n=e(t),r=se(t),o=null!==t&&"object"==typeof t,i=o&&O(t);if(!o&&!n&&!r)throw new TypeError("Object.keys called on a non-object");var l=[],s=ee&&n;if(i&&te||r)for(var u=0;u<t.length;++u)d.call(l,a(u));if(!r)for(var c in t)s&&"prototype"===c||!L(t,c)||d.call(l,a(c));if(Q)for(var f=ie(t),p=0;le>p;p++){var v=ae[p];f&&"constructor"===v||!L(t,v)||d.call(l,v)}return l}});var ue=r.keys&&function(){return 2===r.keys(arguments).length}(1,2),ce=r.keys;_(r,{keys:function(e){return ce(se(e)?c.call(e):e)}},!ue);var fe=-621987552e5,de="-000001",pe=Date.prototype.toISOString&&-1===new Date(fe).toISOString().indexOf(de),ve=Date.prototype.toISOString&&"1969-12-31T23:59:59.999Z"!==new Date(-1).toISOString();_(Date.prototype,{toISOString:function(){var e,t,n,r,o;if(!isFinite(this))throw new RangeError("Date.prototype.toISOString called on non-finite value.");for(r=this.getUTCFullYear(),o=this.getUTCMonth(),r+=Math.floor(o/12),o=(o%12+12)%12,e=[o+1,this.getUTCDate(),this.getUTCHours(),this.getUTCMinutes(),this.getUTCSeconds()],r=(0>r?"-":r>9999?"+":"")+$("00000"+Math.abs(r),r>=0&&9999>=r?-4:-6),t=e.length;t--;)n=e[t],10>n&&(e[t]="0"+n);return r+"-"+c.call(e,0,2).join("-")+"T"+c.call(e,2).join(":")+"."+$("000"+this.getUTCMilliseconds(),-3)+"Z"}},pe||ve);var me=function(){try{return Date.prototype.toJSON&&null===new Date(NaN).toJSON()&&-1!==new Date(fe).toJSON().indexOf(de)&&Date.prototype.toJSON.call({toISOString:function(){return!0}})}catch(e){return!1}}();me||(Date.prototype.toJSON=function(t){var n=r(this),o=I.ToPrimitive(n);if("number"==typeof o&&!isFinite(o))return null;var i=n.toISOString;if(!e(i))throw new TypeError("toISOString property is not callable");return i.call(n)});var he=1e15===Date.parse("+033658-09-27T01:46:40.000Z"),ge=!isNaN(Date.parse("2012-04-04T24:00:00.500Z"))||!isNaN(Date.parse("2012-11-31T23:59:59.000Z"))||!isNaN(Date.parse("2012-12-31T23:59:60.000Z")),ye=isNaN(Date.parse("2000-01-01T00:00:00.000Z"));(!Date.parse||ye||ge||!he)&&(Date=function(e){var t=function(n,r,o,i,l,s,u){var c,f=arguments.length;return c=this instanceof e?1===f&&a(n)===n?new e(t.parse(n)):f>=7?new e(n,r,o,i,l,s,u):f>=6?new e(n,r,o,i,l,s):f>=5?new e(n,r,o,i,l):f>=4?new e(n,r,o,i):f>=3?new e(n,r,o):f>=2?new e(n,r):f>=1?new e(n):new e:e.apply(this,arguments),_(c,{constructor:t},!0),c},n=new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:(\\.\\d{1,}))?)?(Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$"),r=[0,31,59,90,120,151,181,212,243,273,304,334,365],o=function(e,t){var n=t>1?1:0;return r[t]+Math.floor((e-1969+n)/4)-Math.floor((e-1901+n)/100)+Math.floor((e-1601+n)/400)+365*(e-1970)},i=function(t){return s(new e(1970,0,1,0,0,0,t))};for(var l in e)L(e,l)&&(t[l]=e[l]);_(t,{now:e.now,UTC:e.UTC},!0),t.prototype=e.prototype,_(t.prototype,{constructor:t},!0);var u=function(t){var r=n.exec(t);if(r){var a,l=s(r[1]),u=s(r[2]||1)-1,c=s(r[3]||1)-1,f=s(r[4]||0),d=s(r[5]||0),p=s(r[6]||0),v=Math.floor(1e3*s(r[7]||0)),m=Boolean(r[4]&&!r[8]),h="-"===r[9]?1:-1,g=s(r[10]||0),y=s(r[11]||0);return(d>0||p>0||v>0?24:25)>f&&60>d&&60>p&&1e3>v&&u>-1&&12>u&&24>g&&60>y&&c>-1&&c<o(l,u+1)-o(l,u)&&(a=60*(24*(o(l,u)+c)+f+g*h),a=1e3*(60*(a+d+y*h)+p)+v,m&&(a=i(a)),a>=-864e13&&864e13>=a)?a:NaN}return e.parse.apply(this,arguments)};return _(t,{parse:u}),t}(Date)),Date.now||(Date.now=function(){return(new Date).getTime()});var be=u.toFixed&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==0xde0b6b3a7640080.toFixed(0)),we={base:1e7,size:6,data:[0,0,0,0,0,0],multiply:function(e,t){for(var n=-1,r=t;++n<we.size;)r+=e*we.data[n],we.data[n]=r%we.base,r=Math.floor(r/we.base)},divide:function(e){for(var t=we.size,n=0;--t>=0;)n+=we.data[t],we.data[t]=Math.floor(n/e),n=n%e*we.base},numToString:function(){for(var e=we.size,t="";--e>=0;)if(""!==t||0===e||0!==we.data[e]){var n=a(we.data[e]);""===t?t=n:t+=$("0000000",0,7-n.length)+n}return t},pow:function Ae(e,t,n){return 0===t?n:t%2===1?Ae(e,t-1,n*e):Ae(e*e,t/2,n)},log:function(e){for(var t=0,n=e;n>=4096;)t+=12,n/=4096;for(;n>=2;)t+=1,n/=2;return t}};_(u,{toFixed:function(e){var t,n,r,o,i,l,u,c;if(t=s(e),t=t!==t?0:Math.floor(t),0>t||t>20)throw new RangeError("Number.toFixed called with invalid number of decimals");if(n=s(this),n!==n)return"NaN";if(-1e21>=n||n>=1e21)return a(n);if(r="",0>n&&(r="-",n=-n),o="0",n>1e-21)if(i=we.log(n*we.pow(2,69,1))-69,l=0>i?n*we.pow(2,-i,1):n/we.pow(2,i,1),l*=4503599627370496,i=52-i,i>0){for(we.multiply(0,l),u=t;u>=7;)we.multiply(1e7,0),u-=7;for(we.multiply(we.pow(10,u,1),0),u=i-1;u>=23;)we.divide(1<<23),u-=23;we.divide(1<<u),we.multiply(1,1),we.divide(2),o=we.numToString()}else we.multiply(0,l),we.multiply(1<<-i,0),o=we.numToString()+$("0.00000000000000000000",2,2+t);return t>0?(c=o.length,o=t>=c?r+$("0.0000000000000000000",0,t-c+2)+o:r+$(o,0,c-t)+"."+$(o,c-t)):o=r+o,o}},be),2!=="ab".split(/(?:ab)*/).length||4!==".".split(/(.?)(.?)/).length||"t"==="tesst".split(/(s)*/)[1]||4!=="test".split(/(?:)/,-1).length||"".split(/.?/).length||".".split(/()()/).length>1?!function(){var e="undefined"==typeof/()??/.exec("")[1];l.split=function(t,n){var r=this;if("undefined"==typeof t&&0===n)return[];if(!T(t))return R(this,t,n);var o,i,a,l,s=[],u=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),f=0,p=new RegExp(t.source,u+"g");r+="",e||(o=new RegExp("^"+p.source+"$(?!\\s)",u));var v="undefined"==typeof n?-1>>>0:I.ToUint32(n);for(i=p.exec(r);i&&(a=i.index+i[0].length,!(a>f&&(d.call(s,$(r,f,i.index)),!e&&i.length>1&&i[0].replace(o,function(){for(var e=1;e<arguments.length-2;e++)"undefined"==typeof arguments[e]&&(i[e]=void 0)}),i.length>1&&i.index<r.length&&d.apply(s,c.call(i,1)),l=i[0].length,f=a,s.length>=v)));)p.lastIndex===i.index&&p.lastIndex++,i=p.exec(r);return f===r.length?(l||!p.test(""))&&d.call(s,""):d.call(s,$(r,f)),s.length>v?$(s,0,v):s}}():"0".split(void 0,0).length&&(l.split=function(e,t){return"undefined"==typeof e&&0===t?[]:R(this,e,t)});var xe=l.replace,Ee=function(){var e=[];return"x".replace(/x(.)?/g,function(t,n){d.call(e,n)}),1===e.length&&"undefined"==typeof e[0]}();Ee||(l.replace=function(t,n){var r=e(n),o=T(t)&&/\)[*?]/.test(t.source);if(r&&o){var i=function(e){var r=arguments.length,o=t.lastIndex;t.lastIndex=0;var i=t.exec(e)||[];return t.lastIndex=o,d.call(i,arguments[r-2],arguments[r-1]),n.apply(this,i)};return xe.call(this,t,i)}return xe.call(this,t,n)});var ke=l.substr,Te="".substr&&"b"!=="0b".substr(-1);_(l,{substr:function(e,t){var n=e;return 0>e&&(n=h(this.length+e,0)),ke.call(this,n,t)}},Te);var Se="	\n\f\r   ᠎             　\u2028\u2029\ufeff",Ce="​",Ne="["+Se+"]",Oe=new RegExp("^"+Ne+Ne+"*"),je=new RegExp(Ne+Ne+"*$"),Pe=l.trim&&(Se.trim()||!Ce.trim());_(l,{trim:function(){if("undefined"==typeof this||null===this)throw new TypeError("can't convert "+this+" to object");return a(this).replace(Oe,"").replace(je,"")}},Pe),(8!==parseInt(Se+"08")||22!==parseInt(Se+"0x16"))&&(parseInt=function(e){var t=/^0[xX]/;return function(n,r){var o=a(n).trim(),i=s(r)||(t.test(o)?16:10);return e(o,i)}}(parseInt))})},{}],26:[function(e,t,n){var r=[],o=r.forEach,i=r.slice;t.exports=function(e){return o.call(i.call(arguments,1),function(t){if(t)for(var n in t)e[n]=t[n]}),e}},{}],27:[function(e,t,n){function r(e){var t=o.call(e);return"[object Function]"===t||"function"==typeof e&&"[object RegExp]"!==t||"undefined"!=typeof window&&(e===window.setTimeout||e===window.alert||e===window.confirm||e===window.prompt)}t.exports=r;var o=Object.prototype.toString},{}],28:[function(e,t,n){"use strict";t.exports=function(e){return"object"==typeof e&&null!==e}},{}],29:[function(t,n,r){!function(t,r){"undefined"!=typeof n&&n.exports?n.exports=r():"function"==typeof e&&e.amd?e(r):this[t]=r()}("$script",function(){function e(e,t){for(var n=0,r=e.length;r>n;++n)if(!t(e[n]))return s;return 1}function t(t,n){e(t,function(e){return!n(e)})}function n(i,a,l){function s(e){return e.call?e():d[e]}function c(){if(!--y){d[g]=1,h&&h();for(var n in v)e(n.split("|"),s)&&!t(v[n],s)&&(v[n]=[])}}i=i[u]?i:[i];var f=a&&a.call,h=f?a:l,g=f?i.join(""):a,y=i.length;return setTimeout(function(){t(i,function e(t,n){return null===t?c():(t=n||-1!==t.indexOf(".js")||/^https?:\/\//.test(t)||!o?t:o+t+".js",m[t]?(g&&(p[g]=1),2==m[t]?c():setTimeout(function(){e(t,!0)},0)):(m[t]=1,g&&(p[g]=1),void r(t,c)))})},0),n}function r(e,t){var n,r=a.createElement("script");r.onload=r.onerror=r[f]=function(){r[c]&&!/^c|loade/.test(r[c])||n||(r.onload=r[f]=null,n=1,m[e]=2,t())},r.async=1,r.src=i?e+(-1===e.indexOf("?")?"?":"&")+i:e,l.insertBefore(r,l.lastChild)}var o,i,a=document,l=a.getElementsByTagName("head")[0],s=!1,u="push",c="readyState",f="onreadystatechange",d={},p={},v={},m={};return n.get=r,n.order=function(e,t,r){!function o(i){i=e.shift(),e.length?n(i,o):n(i,t,r)}()},n.path=function(e){o=e},n.urlArgs=function(e){i=e},n.ready=function(r,o,i){r=r[u]?r:[r];var a=[];return!t(r,function(e){d[e]||a[u](e)})&&e(r,function(e){return d[e]})?o():!function(e){v[e]=v[e]||[],v[e][u](o),i&&i(a)}(r.join("|")),n},n.done=function(e){n([null],e)},n})},{}]},{},[19])(19)});


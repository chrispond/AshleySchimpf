!function(){function i(t,e,s){function n(r,l){if(!e[r]){if(!t[r]){var h="function"==typeof require&&require;if(!l&&h)return h(r,!0);if(o)return o(r,!0);var a=new Error("Cannot find module '"+r+"'");throw a.code="MODULE_NOT_FOUND",a}var d=e[r]={exports:{}};t[r][0].call(d.exports,function(i){return n(t[r][1][i]||i)},d,d.exports,i,t,e,s)}return e[r].exports}for(var o="function"==typeof require&&require,r=0;r<s.length;r++)n(s[r]);return n}return i}()({1:[function(i,t,e){"use strict";var s=i("../../components/carousel/scripts"),n=i("../../components/trim-paragraph/scripts"),o=i("../../components/trim-string/scripts");window.CpCarousel=s.CpCarousel,window.CpTrimParagraph=n.CpTrimParagraph,window.CpTrimString=o.CpTrimString;var r=document.querySelectorAll(".cp-carousel"),l=r.length,h=function(i){return i<=480?{slidesInView:1,isInfinit:!1}:i>480&&i<=960?{slidesInView:2.5,isInfinit:!0}:{slidesInView:3.5,isInfinit:!0}};if(l>0)for(var a=0;a<l;a++)!function(i){var t=r[i],e=t.clientWidth,n=new s.CpCarousel(t,h(e));n.onSlideStart(function(i){console.log("--- Start",i)}),n.onSlideStop(function(i){console.log("--- Stop",i)});var o=t.querySelector(".cp-carousel-prev"),l=t.querySelector(".cp-carousel-next");o.addEventListener("click",function(){n.onPrevious()}),l.addEventListener("click",function(){n.onNext()});var a=void 0;window.addEventListener("resize",function(){clearTimeout(a),a=setTimeout(function(){var i=t.clientWidth;n.updateOptions(h(i))},1e3)})}(a);var d=document.querySelectorAll(".cp-trim-paragraph"),u=d.length;if(u>0)for(var a=0;a<u;a++){var c=d[a];new n.CpTrimParagraph(c,150)}var p=document.querySelectorAll(".cp-trim-string"),f=p.length;if(f>0)for(var m=0;m<f;m++){var v=p[m];new o.CpTrimString(v)}},{"../../components/carousel/scripts":2,"../../components/trim-paragraph/scripts":3,"../../components/trim-string/scripts":4}],2:[function(i,t,e){"use strict";function s(i,t){if(!(i instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function i(i,t){for(var e=0;e<t.length;e++){var s=t[e];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(i,s.key,s)}}return function(t,e,s){return e&&i(t.prototype,e),s&&i(t,s),t}}(),o={isInfinit:!1,firstSlideIndex:1,slidesInView:1};e.CpCarousel=function(){function i(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o;s(this,i),this.options={isInfinit:e.isInfinit||o.isInfinit,firstSlideIndex:e.firstSlideIndex||o.firstSlideIndex,slidesInView:e.slidesInView||o.slidesInView},this.animateTransition=!1,this.element=t,this.wrapper=this.element.querySelector(".cp-carousel-wrapper"),this.slider=this.wrapper.querySelector(".cp-carousel-slider"),this.slides=this.slider.querySelectorAll(".cp-carousel-slider-slide"),this.hasEnoughSlides=this.slides.length>this.options.slidesInView,this.options.isInfinit&&this.hasEnoughSlides&&this._cloneChildren(Math.ceil(this.options.slidesInView)),this.hasEnoughSlides||this._disable(),this.carouselPosition=0,this.carouselStartPosition=this.carouselPosition,this.currentSlide=this.options.firstSlideIndex-1,this.maxSliderPosition=0,this.mouseDown=!1,this.mouseMove=0,this.mousePosition=0,this.showSlides=0,this.swipeNext=!1,this.totalSlides=this.slides.length,this.wrapperWidth=0,this.slideQuotient=this.options.slidesInView/this.totalSlides,this.sliderWidth=this.wrapperWidth*this.totalSlides,this.slideWidth=100/this.showSlides,this._onClick=this._onClick.bind(this),this._onDown=this._onDown.bind(this),this._onMove=this._onMove.bind(this),this._onTransitionEnd=this._onTransitionEnd.bind(this),this._onUp=this._onUp.bind(this),this._setProperties(),this._addEvents()}return n(i,[{key:"_addEvents",value:function(){this.slider.addEventListener("click",this._onClick,!1),this.slider.addEventListener("mousedown",this._onDown,!1),this.slider.addEventListener("touchstart",this._onDown,!1),this.slider.addEventListener("mousemove",this._onMove,!1),this.slider.addEventListener("touchmove",this._onMove,!1),this.slider.addEventListener("mouseleave",this._onUp,!1),this.slider.addEventListener("mouseup",this._onUp,!1),this.slider.addEventListener("touchend",this._onUp,!1),this.slider.addEventListener("transitionend",this._onTransitionEnd,!1)}},{key:"_removeEvents",value:function(){this.slider.removeEventListener("click",this._onClick,!1),this.slider.removeEventListener("mousedown",this._onDown,!1),this.slider.removeEventListener("touchstart",this._onDown,!1),this.slider.removeEventListener("mousemove",this._onMove,!1),this.slider.removeEventListener("touchmove",this._onMove,!1),this.slider.removeEventListener("mouseleave",this._onUp,!1),this.slider.removeEventListener("mouseup",this._onUp,!1),this.slider.removeEventListener("touchend",this._onUp,!1),this.slider.removeEventListener("transitionend",this._onTransitionEnd,!1)}},{key:"_calcMaxPos",value:function(i,t){return-(t-i)/i*100}},{key:"_calcDragPos",value:function(i){var t=this.carouselStartPosition+i;return t>0?t=.1*(this.carouselStartPosition+i):t<this.maxSliderPosition&&(t=this.maxSliderPosition+.1*i),t}},{key:"_cloneChildren",value:function(i){var t=this,e=this.slides.length,s=function(i){var t=document.createElement(i.tagName.toLowerCase());return t.innerHTML=i.innerHTML,t.className=i.className+" clone",t.setAttribute("aria-hidden","true"),t.setAttribute("tabindex","-1"),t};console.log("CLONES",Object.entries(this.slides).slice(e-i,e),Object.entries(this.slides).slice(0,i)),Object.entries(this.slides).slice(e-i,e).forEach(function(i){t.slider.insertBefore(s(i[1]),t.slides[0])}),Object.entries(this.slides).slice(0,i).forEach(function(i){t.slider.appendChild(s(i[1]))}),this.slides=this.slider.querySelectorAll(".cp-carousel-slider-slide")}},{key:"destroy",value:function(){this._removeEvents(),this._removeClonedChildren(),this._disable(),this._removeStyles()}},{key:"_disable",value:function(){this.element.classList.add("disabled")}},{key:"_enable",value:function(){this.element.classList.remove("disabled")}},{key:"onSlideStart",value:function(i){this.startCallBack=i}},{key:"onSlideStop",value:function(i){this.stopCallBack=i}},{key:"_updateA11y",value:function(){var i=this,t=this.currentSlide+Math.floor(this.options.slidesInView)-1;this.slides.forEach(function(e,s){s>=i.currentSlide&&s<=t&&!e.classList.contains("clone")?(e.setAttribute("aria-hidden",!1),e.setAttribute("tabindex","0")):(e.setAttribute("aria-hidden",!0),e.setAttribute("tabindex","-1"))})}},{key:"_onClick",value:function(i){0!==this.mousePosition&&i.preventDefault()}},{key:"_onDown",value:function(){this.animateTransition=!1,this.mouseDown=!0,this.mousePosition=0,this.mouseMove=event.clientX||event.touches[0].clientX,this.carouselStartPosition=this.carouselPosition}},{key:"_onMove",value:function(i){if(i.preventDefault(),this.mouseDown&&0===this.mousePosition&&"function"==typeof this.startCallBack&&this.startCallBack(this.currentSlide),this.mouseDown){var t=i.clientX||i.touches[0].clientX,e=this.mousePosition+(t-this.mouseMove),s=this._calcDragPos(e/this.wrapperWidth*100);this.mousePosition=e,this.mouseMove=t,this._updateSliderPosition(s)}}},{key:"onNext",value:function(){console.log("onNext",this),this.mouseDown&&0===this.mousePosition&&"function"==typeof this.startCallBack&&this.startCallBack(this.currentSlide),this.animateTransition=!0;var i=-(this.currentSlide+1)*this.slideWidth,t=i<this.maxSliderPosition?this.maxSliderPosition:i;(this.options.isInfinit||t>=this.maxSliderPosition)&&(this.currentSlide=this.currentSlide+1,this._updateSliderPosition(t))}},{key:"onPrevious",value:function(){this.mouseDown&&0===this.mousePosition&&"function"==typeof this.startCallBack&&this.startCallBack(this.currentSlide),this.animateTransition=!0;var i=-(this.currentSlide-1)*this.slideWidth;(this.options.isInfinit||i<=0)&&(this.currentSlide=this.currentSlide-1,this._updateSliderPosition(i))}},{key:"_onTransitionEnd",value:function(){if(this.options.isInfinit)if(this.animateTransition=!1,this.carouselPosition+this.slideWidth>0){var i=this.totalSlides-2*Math.ceil(this.showSlides),t=-i*this.slideWidth;this.currentSlide=this.totalSlides-2,this._updateSliderPosition(t)}else if(this.carouselPosition-this.slideWidth<this.maxSliderPosition){var e=-this.slideWidth*Math.ceil(this.showSlides);this.currentSlide=Math.ceil(this.showSlides),this._updateSliderPosition(e)}this._updateA11y(),"function"==typeof this.startCallBack&&this.stopCallBack(this.currentSlide)}},{key:"_onUp",value:function(){if(this.mouseDown){this.swipeNext=this.carouselStartPosition>this.carouselPosition;var i=Math.ceil(this.carouselPosition/this.slideWidth)*this.slideWidth;this.swipeNext&&(i=Math.floor(this.carouselPosition/this.slideWidth)*this.slideWidth),this.carouselPosition<=this.maxSliderPosition||i<=this.maxSliderPosition?i=this.maxSliderPosition:this.carouselPosition>0&&(i=0),this.animateTransition=!0,this.currentSlide=Math.ceil(Math.abs(i/this.slideWidth)),this._updateSliderPosition(i)}this.mouseDown=!1}},{key:"_removeClonedChildren",value:function(){for(var i=this.slider.querySelectorAll(".clone"),t=i.length,e=0;e<t;e++)this.slider.removeChild(i[e]);this.slides=this.slider.querySelectorAll(".cp-carousel-slider-slide")}},{key:"_setDimensions",value:function(){var i=this;this.slider.style.width="calc(("+this.totalSlides+" / "+this.showSlides+") * 100%)",this.slides.forEach(function(t){t.style.width="calc(100% / "+i.totalSlides+")"}),this._updateSliderPosition(this.carouselPosition)}},{key:"_removeStyles",value:function(){this.slider.removeAttribute("style"),this.slides.forEach(function(i){i.removeAttribute("style")})}},{key:"_setProperties",value:function(){this.totalSlides=this.slides.length,this.options.isInfinit=this.options.isInfinit&&this.hasEnoughSlides,this.showSlides=this.options.slidesInView>this.totalSlides?this.totalSlides:this.options.slidesInView;var i=this.options.firstSlideIndex<1?1:this.options.firstSlideIndex;console.log("*****",i,this.totalSlides-2*this.showSlides),this.options.isInfinit&&i>=this.totalSlides-2*this.showSlides?(i=Math.ceil(this.showSlides),console.log("3",i)):this.options.isInfinit&&this.totalSlides>this.showSlides?(i=Math.ceil(i)+Math.ceil(this.showSlides)-1,console.log("1",i)):i>this.totalSlides?(i=0,console.log("2")):i+this.showSlides>=this.totalSlides+this.showSlides?(i-=this.showSlides,console.log("5",i)):(i-=1,console.log("4")),this.hasEnoughSlides?this._enable():this._disable(),this.currentSlide=i,this.slideWidth=100/this.showSlides,this.carouselPosition=-this.currentSlide*this.slideWidth,this.carouselStartPosition=this.carouselPosition,this.slideQuotient=this.showSlides/this.totalSlides,this.wrapperWidth=this.wrapper.clientWidth,this.sliderWidth=this.wrapperWidth*(this.totalSlides/this.showSlides),this.maxSliderPosition=this._calcMaxPos(this.wrapperWidth,this.sliderWidth),this._setDimensions(),this._updateA11y()}},{key:"updateOptions",value:function(i){var t=this;this.animateTransition=!1;var e=this.currentSlide;this.hasEnoughSlides=this.slides.length>i.slidesInView,this.slider.querySelectorAll(".clone").length&&(e=Math.abs(this.currentSlide-Math.ceil(this.options.slidesInView))),(!1===i.isInfinit&&!0===this.options.isInfinit||!0===this.options.isInfinit&&!this.hasEnoughSlides)&&(this._removeClonedChildren(),this.options.firstSlideIndex=e+1),this.hasEnoughSlides&&(i.isInfinit&&!this.options.isInfinit||i.slidesInView&&i.isInfinit)&&(this._removeClonedChildren(),this._cloneChildren(Math.ceil(i.slidesInView||this.options.slidesInView)),this.options.firstSlideIndex=e+1),Object.keys(i).forEach(function(e){t.options[e]=i[e]}),!this.hasEnoughSlides&&this.options.isInfinit&&(this.options.isInfinit=!1,this.options.slidesInView=this.slides.length),this._setProperties()}},{key:"_updateSliderPosition",value:function(i){var t=this.maxSliderPosition<0?i*this.slideQuotient:0;this.animateTransition?this.slider.style.transition="transform 0.3s":this.slider.style.transition="transform 0s",this.slider.style.webkitTransform="translateX("+t+"%)",this.slider.style.transform="translateX("+t+"%)",this.carouselPosition=i}}]),i}()},{}],3:[function(i,t,e){"use strict";function s(i,t){if(!(i instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(i){return typeof i}:function(i){return i&&"function"==typeof Symbol&&i.constructor===Symbol&&i!==Symbol.prototype?"symbol":typeof i},o=function(){function i(i,t){for(var e=0;e<t.length;e++){var s=t[e];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(i,s.key,s)}}return function(t,e,s){return e&&i(t.prototype,e),s&&i(t,s),t}}(),r=e.errors={elementRequired:"CpTrimParagraph requires element paramter to be defined",elementObject:"CpTrimParagraph requires element be an object"};e.CpTrimParagraph=function(){function i(t,e){if(s(this,i),!t)throw new Error(r.elementRequired);if("object"!==(void 0===t?"undefined":n(t)))throw new Error(r.elementObject);this.element=t,this.textLimit=this.textLimit="number"!=typeof e?270:e,this.readMoreLink=this._buildReadMore(),this.originalText=this.element.innerHTML,this._toggleTextBound=this._toggleText.bind(this),this._trimParagraph()}return o(i,[{key:"_addEvents",value:function(){this.readMoreLink.addEventListener("click",this._toggleTextBound)}},{key:"_buildReadMore",value:function(){var i=document.createElement("a");return i.setAttribute("href","#"),i.setAttribute("data-gtm-event-cta","read-more"),i.classList.add("cp-trim-paragraph-read-more"),i.innerText="Read more",i}},{key:"destroy",value:function(){this._removeEvents(),this.readMoreLink.remove(),this.element.innerHTML=this.originalText}},{key:"_removeEvents",value:function(){this.readMoreLink.removeEventListener("click",this._toggleTextBound)}},{key:"_toggleText",value:function(i){i.preventDefault(),this.element.classList.contains("show")?(this.element.classList.remove("show"),this.readMoreLink.innerText="Read more"):(this.element.classList.add("show"),this.readMoreLink.innerText="Hide text")}},{key:"_trimParagraph",value:function(){var i=this.originalText.length,t=this.originalText.substr(0,this.textLimit),e=this.originalText.substr(Math.min(t.length,t.lastIndexOf(" "))),s=this.originalText.replace(e,'<span class="cp-trim-paragraph-ellipsis"></span><span class="cp-trim-paragraph-extra">'+e+"</span> ");i>this.textLimit&&(this.element.innerHTML=s,this.element.appendChild(this.readMoreLink),this._addEvents())}}]),i}()},{}],4:[function(i,t,e){"use strict";function s(i,t){if(!(i instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(i){return typeof i}:function(i){return i&&"function"==typeof Symbol&&i.constructor===Symbol&&i!==Symbol.prototype?"symbol":typeof i},o=function(){function i(i,t){for(var e=0;e<t.length;e++){var s=t[e];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(i,s.key,s)}}return function(t,e,s){return e&&i(t.prototype,e),s&&i(t,s),t}}(),r=e.errors={elementRequired:"CpTrimString requires element paramter to be defined",elementObject:"CpTrimString requires element be an object"};e.CpTrimString=function(){function i(t,e){if(s(this,i),!t)throw new Error(r.elementRequired);if("object"!==(void 0===t?"undefined":n(t)))throw new Error(r.elementObject);this.element=t,this.textLimit=this.textLimit="number"!=typeof e?50:e,this.originalText=this.element.innerHTML,this._trimString()}return o(i,[{key:"destroy",value:function(){this.element.innerHTML=this.originalText,this.element.classList.remove("trimmed")}},{key:"_trimString",value:function(){var i=this.originalText.length,t=this.originalText.substr(0,this.textLimit),e=this.originalText.substr(Math.min(t.length,t.lastIndexOf(" "))),s=this.originalText.replace(e,"");i>this.textLimit&&(this.element.innerHTML=s,this.element.classList.add("trimmed"))}}]),i}()},{}]},{},[1]);
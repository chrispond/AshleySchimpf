/**
 *@name Shadow Scripts
 *@file
 *@copyright ChrisPond.com
 *@author Chris Pond
 *@version 1.0.0
 */

/**
 * @name Shadow
 * @description Triggers/applies motion to the shadow component
 * @param {object} element - Required: DOM element to apply the shadow to
 * @example
 * const myShadow = new Shadow(document.querySelector('.my-shadow'));
 **/
export class InViewAnimate {
  constructor(element, data) {
    // Element
    this.element = element;

    // Data
    this.data = data;
    this.startData = this.data.startAnimate || 0;
    this.endData = this.data.finishAnimate || 1;

    // Events
    this._onResize = this._onResize.bind(this);
    this._onScroll = this._onScroll.bind(this);
    this._animateElement = this._animateElement.bind(this);
    // this._onTouchEnd = this._onTouchEnd.bind(this);
    // this._onTouchMove = this._onTouchMove.bind(this);
    // this._onTouchStart = this._onTouchStart.bind(this);

    this.transformValueMethod = {
      perspective: (value, unit) => `perspective(${value}${unit})`,
      rotate: (value, unit) => `rotate(${value}${unit})`,
      rotateX: (value, unit) => `rotateX(${value}${unit})`,
      rotateY: (value, unit) => `rotateY(${value}${unit})`,
      rotateZ: (value, unit) => `rotateZ(${value}${unit})`,
      scale: (value) => `scale(${value})`,
      scaleX: (value) => `scaleX(${value})`,
      scaleY: (value) => `scaleY(${value})`,
      scaleZ: (value) => `scaleZ(${value})`,
      skewX: (value) => `skewX(${value}${unit})`,
      skewY: (value) => `skewY(${value}${unit})`,
      translateX: (value, unit) => `translateX(${value}${unit})`,
      translateY: (value, unit) => `translateY(${value}${unit})`,
      translateZ: (value, unit) => `translateZ(${value}${unit})`,
    };

    this._addEvents();
    this._setProperties();
  }

  _animateElement() {
    this.isScrolling = false;
    this._setElementProperties();
    this._setFocusProperties();

    //Start focus
    const animateInPercent =
      (this.elementDistance - this.focusPoint) / this.inFocusDiff;
    const animateOutPercent =
      (this.elementDistance - this.focusPoint) / this.outFocusDiff;

    let transformStyles = '';

    if (animateOutPercent > 0) {
      const isStill = animateOutPercent >= 1;

      Object.keys(this.data.animateOutData).forEach((key) => {
        const value = this.data.animateOutData[key];
        const animateValue = this._calcAnimation(
          animateOutPercent,
          this.data.animateFocus[key],
          value
        );
        const isTransformValue = this.transformValueMethod[key];
        const updateValue = isStill ? value : animateValue;

        if (isTransformValue) {
          transformStyles += this.transformValueMethod[key](
            updateValue,
            this.data.units[key]
          );
        } else {
          this.element.style[key] = updateValue;
        }
      });
    } else if (animateInPercent > 0) {
      const isStill = animateInPercent >= 1;
      const inPercent = 1 - animateInPercent;

      Object.keys(this.data.animateInData).forEach((key) => {
        const value = this.data.animateInData[key];
        const animateValue = this._calcAnimation(
          inPercent,
          value,
          this.data.animateFocus[key]
        );
        const isTransformValue = this.transformValueMethod[key];
        const updateValue = isStill ? value : animateValue;

        if (isTransformValue) {
          transformStyles += this.transformValueMethod[key](
            updateValue,
            this.data.units[key]
          );
        } else {
          this.element.style[key] = updateValue;
        }
      });
    }

    this.element.style.webkitTransform = transformStyles;
    this.element.style.transform = transformStyles;
  }

  /**
  @name _addEvents
  @description Handles iniating event listeners
  @memberof InViewTrigger
  @method
  @private
  */
  _addEvents() {
    window.addEventListener('resize', this._onResize);
    document.addEventListener('scroll', this._onScroll);
  }

  _calcAnimation(animate, from, to) {
    if (from > to) {
      const difference = from - to;
      return from - difference * animate;
    } else {
      const difference = to - from;
      return from + difference * animate;
    }
  }

  /**
  @name _onReszie
  @description Recalculates scroll position & inFocus position
  @memberof InViewTrigger
  @method
  @private
  */
  _onResize() {
    // Initiate setTimeout to determine when resizing is over
    if (this.resizeTimer) {
      window.clearTimeout(this.resizeTimer);
    }

    this.resizeTimer = window.setTimeout(() => {
      this._setProperties();
      this.resizeTimer = undefined;
    }, 400);
  }

  _setElementProperties() {
    const elementRect = this.element.getBoundingClientRect();
    this.elementDistance = elementRect.top;
    this.elementHeight = elementRect.height;
    this.elementMiddle = this.elementHeight / 2;
  }

  _setFocusProperties() {
    this.windowHeight = window.innerHeight;
    this.scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    this.inFocusPoint =
      this.windowHeight * (1 - this.startData) - this.elementMiddle;
    this.outFocusPoint =
      this.windowHeight * (1 - this.endData) - this.elementMiddle;
    this.focusPoint =
      this.windowHeight * this.data.focusAnimate - this.elementMiddle;
    this.inFocusDiff = this.inFocusPoint - this.focusPoint;
    this.outFocusDiff = this.outFocusPoint - this.focusPoint;
  }

  _setProperties() {
    this.resizeTimer = undefined;
    this.isScrolling = false;
    this._setElementProperties();
    this._setFocusProperties();
    this._onScroll();
  }

  _removeEvents() {
    window.removeEventListener('resize', this._onResize);
    document.removeEventListener('scroll', this._onScroll);
  }

  /**
  @name _onScroll
  @description Tracks scroll position
  @memberof InViewTrigger
  @method
  @private
  */
  _onScroll() {
    // Updated Properties
    if (!this.isScrolling) {
      window.requestAnimationFrame(this._animateElement);
      this.isScrolling = true;
    }
  }
}

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
  static calcAnimate(animate, from, to) {
    if (from > to) {
      const difference = from - to;
      return from - difference * animate;
    } else {
      const difference = to - from;
      return from + difference * animate;
    }
  }

  constructor(element, data) {
    // Element
    this.element = element;

    // Data
    this.data = data;
    this.startData = this.data.startAnimate || 0;
    this.endData = this.data.endAnimate || 1;

    // Events
    this._onResize = this._onResize.bind(this);
    this._onScroll = this._onScroll.bind(this);
    this._animateElement = this._animateElement.bind(this);
    // this._onTouchEnd = this._onTouchEnd.bind(this);
    // this._onTouchMove = this._onTouchMove.bind(this);
    // this._onTouchStart = this._onTouchStart.bind(this);

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

    if (animateOutPercent < 1 && animateOutPercent > 0) {
      if (this.data.animateOutData.fade !== undefined)
        this.element.style.opacity = InViewAnimate.calcAnimate(
          animateOutPercent,
          this.data.animateFocus.fade,
          this.data.animateOutData.fade
        );
      if (this.data.animateOutData.x !== undefined)
        transformStyles += `translateX(${InViewAnimate.calcAnimate(
          animateOutPercent,
          this.data.animateFocus.x,
          this.data.animateOutData.x
        )}%)`;
      if (this.data.animateOutData.y !== undefined)
        transformStyles += `translateY(${InViewAnimate.calcAnimate(
          animateOutPercent,
          this.data.animateFocus.y,
          this.data.animateOutData.y
        )}%)`;
      if (this.data.animateOutData.scale !== undefined)
        transformStyles += `scale(${InViewAnimate.calcAnimate(
          animateOutPercent,
          this.data.animateFocus.scale,
          this.data.animateOutData.scale
        )})`;
      if (this.data.animateOutData.rotate !== undefined)
        transformStyles += `rotate(${InViewAnimate.calcAnimate(
          animateOutPercent,
          this.data.animateFocus.rotate,
          this.data.animateOutData.rotate
        )}turn)`;
    } else if (animateOutPercent >= 1) {
      if (this.data.animateOutData.fade !== undefined)
        this.element.style.opacity = this.data.animateOutData.fade;
      if (this.data.animateOutData.x !== undefined)
        transformStyles += `translateX(${this.data.animateOutData.x}%)`;
      if (this.data.animateOutData.y !== undefined)
        transformStyles += `translateY(${this.data.animateOutData.y}%)`;
      if (this.data.animateOutData.scale !== undefined)
        transformStyles += `scale(${this.data.animateOutData.scale})`;
      if (this.data.animateOutData.rotate !== undefined)
        transformStyles += `rotate(${this.data.animateOutData.rotate}turn)`;
    } else if (animateInPercent < 1 && animateInPercent > 0) {
      const inPercent = 1 - animateInPercent;
      if (this.data.animateInData.fade !== undefined)
        this.element.style.opacity = 1 - animateInPercent;
      this.element.style.opacity = InViewAnimate.calcAnimate(
        inPercent,
        this.data.animateInData.fade,
        this.data.animateFocus.fade
      );
      if (this.data.animateInData.x !== undefined)
        transformStyles += `translateX(${InViewAnimate.calcAnimate(
          inPercent,
          this.data.animateInData.x,
          this.data.animateFocus.x
        )}%)`;
      if (this.data.animateInData.y !== undefined)
        transformStyles += `translateY(${InViewAnimate.calcAnimate(
          inPercent,
          this.data.animateInData.y,
          this.data.animateFocus.y
        )}%)`;
      if (this.data.animateInData.scale !== undefined)
        transformStyles += `scale(${InViewAnimate.calcAnimate(
          inPercent,
          this.data.animateInData.scale,
          this.data.animateFocus.scale
        )})`;
      if (this.data.animateInData.rotate !== undefined)
        transformStyles += `rotate(${InViewAnimate.calcAnimate(
          inPercent,
          this.data.animateInData.rotate,
          this.data.animateFocus.rotate
        )}turn)`;
    } else if (animateInPercent >= 1) {
      if (this.data.animateInData.fade !== undefined)
        this.element.style.opacity = this.data.animateInData.fade;
      if (this.data.animateInData.x !== undefined)
        transformStyles += `translateX(${this.data.animateInData.x}%)`;
      if (this.data.animateInData.y !== undefined)
        transformStyles += `translateY(${this.data.animateInData.y}%)`;
      if (this.data.animateInData.scale !== undefined)
        transformStyles += `scale(${this.data.animateInData.scale})`;
      if (this.data.animateInData.rotate !== undefined)
        transformStyles += `rotate(${this.data.animateInData.rotate}turn)`;
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
    this.focusPoint = this.windowHeight * 0.5 - this.elementMiddle;
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

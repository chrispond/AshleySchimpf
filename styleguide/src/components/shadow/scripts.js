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
  static calcAxis(animate, axis) {
    return 100 - ((1 - axis) * animate + axis) * 100;
  }
  static calcRotate(animate, rotate) {
    return rotate * animate - rotate;
  }
  static calcScale(animate, scale) {
    return (1 - scale) * animate + scale;
  }

  constructor(element, data) {
    // Elements
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
    console.log('this:', this);
    this.isScrolling = false;
    this.scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    this.elementDistance = this.element.getBoundingClientRect().top;

    //Start focus
    const animateInPercent =
      (this.elementDistance - this.focusPoint) / this.inFocusDiff;
    const animateOutPercent =
      (this.elementDistance - this.focusPoint) / this.outFocusDiff;

    let transformStyles = '';

    if (animateOutPercent < 1 && animateOutPercent > 0) {
      const outPercent = 1 - animateOutPercent;
      if (this.data.animateOutData.fade !== undefined)
        this.element.style.opacity = 1 - animateOutPercent;
      if (this.data.animateOutData.x)
        transformStyles += `translateX(${InViewAnimate.calcAxis(
          outPercent,
          this.data.animateOutData.x
        )}%)`;
      if (this.data.animateOutData.y)
        transformStyles += `translateY(${InViewAnimate.calcAxis(
          outPercent,
          this.data.animateOutData.y
        )}%)`;
      if (this.data.animateOutData.scale)
        transformStyles += `scale(${InViewAnimate.calcScale(
          outPercent,
          this.data.animateOutData.scale
        )})`;
      if (this.data.animateOutData.rotate)
        transformStyles += `rotate(${InViewAnimate.calcRotate(
          outPercent,
          this.data.animateOutData.rotate
        )}turn)`;
    } else {
      const startOrFinished = animateOutPercent < 0 ? 1 : 0;
      if (this.data.animateOutData.fade !== undefined)
        this.element.style.opacity = animateOutPercent < 0 ? 1 : 0;
      if (this.data.animateOutData.x)
        transformStyles += `translateX(${InViewAnimate.calcAxis(
          startOrFinished,
          this.data.animateOutData.x
        )}%)`;
      if (this.data.animateOutData.y)
        transformStyles += `translateY(${InViewAnimate.calcAxis(
          startOrFinished,
          this.data.animateOutData.y
        )}%)`;
      if (this.data.animateOutData.scale)
        transformStyles += `scale(${InViewAnimate.calcScale(
          startOrFinished,
          this.data.animateOutData.scale
        )})`;
      if (this.data.animateOutData.rotate)
        transformStyles += `rotate(${InViewAnimate.calcRotate(
          startOrFinished,
          this.data.animateOutData.rotate
        )}turn)`;
    }

    if (animateInPercent < 1 && animateInPercent > 0) {
      const inPercent = 1 - animateInPercent;
      if (this.data.animateInData.fade !== undefined)
        this.element.style.opacity = 1 - animateInPercent;
      if (this.data.animateInData.x)
        transformStyles += `translateX(${InViewAnimate.calcAxis(
          inPercent,
          this.data.animateInData.x
        )}%)`;
      if (this.data.animateInData.y)
        transformStyles += `translateY(${InViewAnimate.calcAxis(
          inPercent,
          this.data.animateInData.y
        )}%)`;
      if (this.data.animateInData.scale)
        transformStyles += `scale(${InViewAnimate.calcScale(
          inPercent,
          this.data.animateInData.scale
        )})`;
      if (this.data.animateInData.rotate)
        transformStyles += `rotate(${InViewAnimate.calcRotate(
          inPercent,
          this.data.animateInData.rotate
        )}turn)`;
    } else {
      const startOrFinished = animateInPercent < 0 ? 1 : 0;
      if (this.data.animateInData.fade !== undefined)
        this.element.style.opacity = animateInPercent < 0 ? 1 : 0;
      if (this.data.animateInData.x)
        transformStyles += `translateX(${InViewAnimate.calcAxis(
          startOrFinished,
          this.data.animateInData.x
        )}%)`;
      if (this.data.animateInData.y)
        transformStyles += `translateY(${InViewAnimate.calcAxis(
          startOrFinished,
          this.data.animateInData.y
        )}%)`;
      if (this.data.animateInData.scale)
        transformStyles += `scale(${InViewAnimate.calcScale(
          startOrFinished,
          this.data.animateInData.scale
        )})`;
      if (this.data.animateInData.rotate)
        transformStyles += `rotate(${InViewAnimate.calcRotate(
          startOrFinished,
          this.data.animateInData.rotate
        )}turn)`;
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

  _setProperties() {
    this.elementPositionTop = this.element.getBoundingClientRect().top;
    this.elementHeight = this.element.clientHeight;
    this.elementMiddle = this.elementHeight / 2;
    this.resizeTimer = undefined;
    this.isScrolling = false;
    this.scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    this.windowHeight = window.innerHeight;
    this.inFocusPoint =
      this.windowHeight * (1 - this.startData) - this.elementMiddle;
    this.outFocusPoint =
      this.windowHeight * (1 - this.endData) - this.elementMiddle;
    this.focusPoint = this.windowHeight * 0.5 - this.elementMiddle;
    this.inFocusDiff = this.inFocusPoint - this.focusPoint;
    this.outFocusDiff = this.outFocusPoint - this.focusPoint;

    // Update Scroll Positions
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
    console.log('scroll:', this);
    // Updated Properties
    if (!this.isScrolling) {
      window.requestAnimationFrame(this._animateElement);
      this.isScrolling = true;
    }
  }
}

/*
-calcAxis
-calcRotate
-calcScale
-addEvents
-onResize
-onScroll
-removeEvents
-setProperties
updateAnimations
*/

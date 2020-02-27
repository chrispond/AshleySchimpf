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
export class Shadow {
  constructor(element) {
    // Validate 'element' exists and is an object; otherwise error
    if (!element) {
      throw new Error('Element is required');
    } else if (typeof element !== 'object') {
      throw new Error('Element must be an object');
    }

    // DOM elements
    this.element = element;
  }
}

/**
 *@name Boilerplate Scripts
 *@file This is a mock component script file that contains calculator component
 *@copyright ChrisPond.com
 *@author Chris Pond
 *@version 1.0.0
 */

// Custom errors for this component
export const errors = {
  elementRequired: 'Calculator requires element paramter to be defined',
  elementObject: 'Calculator requires element be an object',
  paramsRequired: method => `${method} method requires number parameters to be provided`,
  numbersRequired: method => `${method} method requires parameters to be number or integer`,
  missingElement: 'Calculator is missing an element in the DOM'
};

/**
 * @name validateElements
 * @description Validates if given elements exist
 * @param {array} elements - array of values to test
 * @return {boolean}
 * @example
 *	this.firstNumb = this.element.querySelector('.firstNumber');
 *	this.secondNumb = this.element.querySelector('.secondNumber');
 * let numbersValid = validateElements(this.firstNumb, this.secondNumb);
 **/
function validateElements(...elements) {
  let error = false;
  elements.forEach(item => {
    if (!item) {
      error = true;
    }
  });
  return error;
}

/**
 * @name validateNumbers
 * @description Validates if given values are numbers or integers
 * @param {array} numbers - array of values to test
 * @return {boolean}
 * @example
 * let numbersValid = validateNumbers(2, 2);
 **/
function validateNumbers(...numbers) {
  let error = true;
  numbers.forEach(item => {
    if (typeof item === 'number') {
      error = false;
    }
  });
  return error;
}

/**
 * @name Calculator
 * @description Calculates two numbers
 * @param {object} element - Required: DOM element containing number fields and operator
 * @example
 * const myCalculator = new Calculator(document.querySelector('.my-calculator'));
 **/
export class Calculator {
  constructor(element) {
    // Validate 'element' exists and is an object; otherwise error
    if (!element) {
      throw new Error(errors.elementRequired);
    } else if (typeof element !== 'object') {
      throw new Error(errors.elementObject);
    }

    // DOM elements
    this.element = element;
    this.firstNumb = this.element.querySelector('.firstNumber');
    this.secondNumb = this.element.querySelector('.secondNumber');
    this.operation = this.element.querySelector('.operation');
    this.submit = this.element.querySelector('.submit');
    this.answer = this.element.querySelector('.answer');

    // Validate DOM Elements
    if (validateElements(this.firstNumb, this.secondNumb, this.operation, this.submit, this.answer)) {
      throw new Error(errors.missingElement);
    }

    // Init events
    this.events();
  }

  /**
   * @name add
   * @description Adds two numbers together
   * @param {number} a - Frist number of the equation
   * @param {number} b - Second number of the equation
   * @return {array} - [answer, equationString]
   * @memberof Calculator
   * @example
   * let [answer, equation] = this.add(2, 2);
   * console.log(answer, equation);
   * //OUTPUT: 4, '2 + 2'
   */
  add(a, b) {
    // Validate 'a,b' exists and that they are numbers or integers
    if (!a || !b) {
      throw new Error(errors.paramsRequired('add'));
    } else if (validateNumbers(a, b)) {
      throw new Error(errors.numbersRequired('add'));
    }

    const answer = a + b;
    const equationString = `${a} + ${b}`;
    return [answer, equationString];
  }

  /**
   * @name divide
   * @description Divides two numbers
   * @param {number} a - Frist number of the equation
   * @param {number} b - Second number of the equation
   * @return {array} - [answer, equationString]
   * @memberof Calculator
   * @example
   * let [answer, equation] = this.divide(2, 2);
   * console.log(answer, equation);
   * //OUTPUT: 1, '2 / 2'
   */
  divide(a, b) {
    // Validate 'a,b' exists and that they are numbers or integers
    if (!a || !b) {
      throw new Error(errors.paramsRequired('divide'));
    } else if (validateNumbers(a, b)) {
      throw new Error(errors.numbersRequired('divide'));
    }

    const answer = a / b;
    const equationString = `${a} / ${b}`;
    return [answer, equationString];
  }

  /**
   * @name subtract
   * @description Subtracts two numbers
   * @param {number} a - Frist number of the equation
   * @param {number} b - Second number of the equation
   * @return {array} - [answer, equationString]
   * @memberof Calculator
   * @example
   * let [answer, equation] = this.subtract(2, 2);
   * console.log(answer, equation);
   * //OUTPUT: 0, '2 - 2'
   */
  subtract(a, b) {
    // Validate 'a,b' exists and that they are numbers or integers
    if (!a || !b) {
      throw new Error(errors.paramsRequired('subtract'));
    } else if (validateNumbers(a, b)) {
      throw new Error(errors.numbersRequired('subtract'));
    }

    const answer = a - b;
    const equationString = `${a} - ${b}`;
    return [answer, equationString];
  }

  /**
   * @name multiply
   * @description Multiply two numbers
   * @param {number} a - Frist number of the equation
   * @param {number} b - Second number of the equation
   * @return {array} - [answer, equationString]
   * @memberof Calculator
   * @example
   * let [answer, equation] = this.multiply(2, 2);
   * console.log(answer, equation);
   * //OUTPUT: 4, '2 x 2'
   */
  multiply(a, b) {
    // Validate 'a,b' exists and that they are numbers or integers
    if (!a || !b) {
      throw new Error(errors.paramsRequired('multiply'));
    } else if (validateNumbers(a, b)) {
      throw new Error(errors.numbersRequired('multiply'));
    }

    const answer = a * b;
    const equationString = `${a} x ${b}`;
    return [answer, equationString];
  }

  /**
   * @name events
   * @description Handles user interactions with calculator
   * @memberof Calculator
   */
  events() {
    // Click handler for submit button
    this.submit.addEventListener(
      'click',
      event => {
        event.preventDefault();
        const aNum = parseInt(this.firstNumb.value);
        const bNum = parseInt(this.secondNumb.value);
        const operator = this.operation.value;
        const [answer, equation] = this[operator](aNum, bNum);
        this.answer.innerHTML = `${equation} = ${answer}`;
      },
      true
    );
  }
}

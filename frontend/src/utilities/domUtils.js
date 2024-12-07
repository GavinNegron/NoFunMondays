import $ from 'jquery';

/**
 * Handles clicking outside a specific DOM element and optionally runs a callback function.
 * @param {string} selector - The CSS selector for the target element
 * @param {Event} event - The click event
 * @param {string} addElementSelector - The selector for the element that will trigger the fade effect (optional)
 * @param {function} callback - The function to execute when clicking outside the target element (optional)
 */
export const handleClickOutside = (selector, event, addElementSelector) => {
  const element = document.querySelector(selector);
  const closestElement = event.target.closest(addElementSelector);

  if (element && !closestElement) {
    $(element).stop(true, true).fadeOut(200);
  }
};

/**
 * Adds a class to a specific DOM element
 * @param {string} selector - The CSS selector for the target element
 * @param {string} className - The class to add
 */
export const addClassToElement = (selector, className) => {
  const element = document.querySelector(selector);
  if (element) {
    element.classList.add(className);
  }
};

/**
 * Removes a class from a specific DOM element
 * @param {string} selector - The CSS selector for the target element
 * @param {string} className - The class to remove
 */
export const removeClassFromElement = (selector, className) => {
  const element = document.querySelector(selector);
  if (element) {
    element.classList.remove(className);
  }
};

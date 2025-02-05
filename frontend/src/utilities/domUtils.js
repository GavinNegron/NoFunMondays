import $ from 'jquery';

/**
 * Handles clicking outside a specific DOM element and fades it out.
 * @param {HTMLElement} element - The target element to check for outside clicks
 * @param {HTMLElement} targetClasses - The target elements
 * @param {HTMLElement} targetRemove - The element to remove
 */
export const handleClickOutside = (event, targetClasses, targetRemove) => {
  const targetArray = Array.isArray(targetClasses) ? targetClasses : [targetClasses];
  const isClickInsideTarget = targetArray.some(targetClass => event.target.closest(targetClass));
  if (!isClickInsideTarget && targetRemove) {
    $(targetRemove).stop(true, true).fadeOut(200); 
  }
};

/**
 * Adds a class to a specific DOM element
 * @param {string} selector - The CSS selector for the target element
 * @param {string} className - The class to add
 */
export const addClassToElement = (selector, className) => {
  const element = document.querySelector(selector)
  if (element) {
    element.classList.add(className)
  }
}

/**
 * Removes a class from a specific DOM element
 * @param {string} selector - The CSS selector for the target element
 * @param {string} className - The class to remove
 */
export const removeClassFromElement = (selector, className) => {
  const element = document.querySelector(selector)
  if (element) {
    element.classList.remove(className)
  }
}

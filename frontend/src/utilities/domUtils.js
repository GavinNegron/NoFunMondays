import $ from 'jquery';

/**
 * Handles clicking outside a specific DOM element and fades it out.
 * @param {HTMLElement} element - The target element to check for outside clicks
 * @param {Event} event - The click event
 */
export const handleClickOutside = (element, event) => {
  const closestElement = event.target.closest('.editor-sidebar__add-elements');

  // Only fade out if the closest element is not the target element
  if (!closestElement) {
    $('.editor-sidebar__add-elements').stop(true, true).fadeOut(200);
  }
}

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

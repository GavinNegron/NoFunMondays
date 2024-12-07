/**
 * Handles the drag start event, setting the dragged item's type.
 * 
 * @param {DragEvent} e - The drag event triggered when an item starts being dragged.
 * @param {string} type - The type of the element being dragged (e.g., 'image', 'text').
 */
export const handleDragStart = (e, type) => {
    e.dataTransfer.setData("text/plain", type);
  };
  
  /**
   * Handles the drop event, adding a new element at the specified target position.
   * 
   * @param {DragEvent} e - The drop event triggered when an item is dropped.
   * @param {string} targetId - The ID of the target element where the new element will be inserted.
   * @param {Array} elements - The current list of elements in the editor.
   * @param {function} setElements - The function to update the elements state.
   * 
   * @returns {void}
   */
  export const handleDrop = (e, targetId, elements, setElements) => {
    e.preventDefault();
    const draggedType = e.dataTransfer.getData("text/plain");
    const newElement = {
      id: `${draggedType}-${Date.now()}`,
      type: draggedType,
      content: `New ${draggedType.toUpperCase()}`
    };
  
    const targetIndex = elements.findIndex((el) => el.id === targetId);
    const updatedElements = [...elements];
    updatedElements.splice(targetIndex, 0, newElement);
    setElements(updatedElements);
  };
  
  /**
   * Handles the drag over event, allowing an item to be dropped by preventing the default behavior.
   * 
   * @param {DragEvent} e - The drag event triggered when an item is being dragged over a target.
   * 
   * @returns {void}
   */
  export const handleDragOver = (e) => {
    e.preventDefault();
  };
  
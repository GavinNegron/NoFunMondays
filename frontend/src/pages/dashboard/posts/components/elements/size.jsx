import React from 'react';
import { useEditorContext } from '../../../../../contexts/EditorContext';

const Size = () => {
  const {
    style,
    selectedElement,
    setStyle
  } = useEditorContext();
  
  const handleSizeInputChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    if (!isNaN(newSize)) {
      const headingClasses = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
      headingClasses.forEach(headingClass => {
        if (selectedElement.classList.contains(headingClass)) {
          selectedElement.classList.remove(headingClass);
          selectedElement.classList.add('default-text');
        }
      });

      selectedElement.style.fontSize = `${newSize}px`;
      setStyle(prevStyle => ({ ...prevStyle, fontSize: newSize }));
    }
  };

  return (
    <div className="edit-styles__item">
      <p>Font Size: </p>
      <input
        className="edit-styles__item__size"
        type="number"
        min="1"
        value={style.fontSize || 0}
        onChange={(e) => handleSizeInputChange(e)}
      />
    </div>
  );
}

export default Size;
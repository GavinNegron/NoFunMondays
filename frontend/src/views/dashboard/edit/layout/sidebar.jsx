// React
import React, { useState } from 'react';
import Tooltip from '../../../../utilities/tooltip';
import $ from 'jquery';

// Data
import elements from '../../../../data/elements';

// Utilities
import { handleDragStart } from '../../../../utilities/dragUtils';

function EditSidebar() {
  const [activeElement, setActiveElement] = useState('text');

  const handleAddElementsClick = () => {
    $('.editor-sidebar__add-elements').stop(true, true).animate({}).fadeToggle(200);
    $('.edit-styles').stop(true, true).animate({}).fadeOut('fast');

  };

  const handleElementClick = (elementType) => {
    setActiveElement(elementType);
  };

  const includedKeys = Object.keys(elements).filter((key) => !elements[key]?.exclude);

  return (
    <aside className="editor-sidebar">
      <div className="editor-sidebar__icons">
        <div className="editor-sidebar__icons__item addElement">
          <button onClick={handleAddElementsClick}>
            <i data-tooltip-id="tip-blocks" className="fa-solid fa-plus"></i>
            <Tooltip id="tip-blocks" header="Add elements" place="right" />
          </button>
          <div className="editor-sidebar__add-elements">
            <div className="editor-sidebar__add-elements__header">
              <p>Add Elements</p>
            </div>
            <div className="d-flex flex-direction-row col-12">
              <div className="editor-sidebar__add-elements__left col-4">
                <ul>
                  {includedKeys.map((key) => (
                    <li key={key}>
                      <a onClick={() => handleElementClick(key)}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="editor-sidebar__add-elements__right col-8">
                {activeElement && elements[activeElement]?.classes?.length > 0 ? (
                  <div className={`editor-sidebar__add-elements__right__${activeElement}`}>
                  {elements[activeElement].classes
                    .filter(item => !item.exclude) 
                    .map((item) => (
                      <a
                        key={item.class}
                        className={item.class}
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e, item.class)}
                      >
                        {item.text}
                      </a>
                    ))}
                </div>
                
                ) : (
                  <p>No elements available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default EditSidebar;

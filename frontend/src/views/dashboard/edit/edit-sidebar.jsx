import React, { useState } from 'react';
import Tooltip from '../../../utilities/tooltip';
import $ from 'jquery';

function EditSidebar() {
  const [isAddElementsVisible, setIsAddElementsVisible] = useState(false);

  const handleAddElementsClick = () => {
    const element = $('.editor-sidebar__add-elements');
    
      element.stop(true, true).animate({
      }).fadeToggle(200);
    
    setIsAddElementsVisible(!isAddElementsVisible);  
  };

  return (
    <>
      <aside className="editor-sidebar">
        <div className="editor-sidebar__icons">
          <div className="editor-sidebar__icons__item">
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
                    <li><a href="">Text</a></li>
                    <li><a href="">Image</a></li>
                    <li><a href="">Button</a></li>
                    <li><a href="">Header</a></li>
                    <li><a href="">Icon</a></li>
                    <li><a href="">Text</a></li>
                    <li><a href="">Text</a></li>
                    <li><a href="">Text</a></li>
                    <li><a href="">Text</a></li>
                    <li><a href="">Text</a></li>
                    <li><a href="">Text</a></li>
                    <li><a href="">Text</a></li>
                  </ul>
                </div>
                <div className="editor-sidebar__add-elements__right col-8">
                  right
                </div>
              </div>
            </div>
          </div>
          <div className="editor-sidebar__icons__item">
            <button>
              <i data-tooltip-id="tip-sections" className="fa-solid fa-file-fragment"></i>
              <Tooltip id="tip-sections" header="Sections" place="right" />
            </button>
          </div>
          <div className="editor-sidebar__icons__item">
            <button>
              <i data-tooltip-id="tip-comments" className="fa-solid fa-comment"></i>
              <Tooltip id="tip-comments" header="Manage Comments" place="right" />
            </button>
          </div>
          <div className="editor-sidebar__icons__item">
            <button>
              <i data-tooltip-id="tip-settings" className="fa-solid fa-gear"></i>
              <Tooltip id="tip-settings" header="Settings" place="right" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default EditSidebar;

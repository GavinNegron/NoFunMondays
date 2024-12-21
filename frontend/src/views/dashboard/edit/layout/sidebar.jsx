import React, { useState } from 'react';
import Tooltip from '../../../../utilities/tooltip';
import $ from 'jquery';

function EditSidebar({ handleDragStart }) {
  const [activeElement, setActiveElement] = useState('text');

  const handleAddElementsClick = () => {
    $('.editor-sidebar__add-elements').stop(true, true).animate({}).fadeToggle(200);
  };

  const handleElementClick = (elementType) => {
    setActiveElement(elementType);
  };

  return (
    <>
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
                    <li><a onClick={() => handleElementClick('text')}>Text</a></li>
                    <li><a onClick={() => handleElementClick('image')}>Image</a></li>
                    <li><a onClick={() => handleElementClick('button')}>Button</a></li>
                    <li><a onClick={() => handleElementClick('header')}>Header</a></li>
                    <li><a onClick={() => handleElementClick('icon')}>Icon</a></li>
                    <li><a onClick={() => handleElementClick('form')}>Form</a></li>
                    <li><a onClick={() => handleElementClick('video')}>Video</a></li>
                    <li><a onClick={() => handleElementClick('blank')}>Blank Div</a></li>
                  </ul>
                </div>
                <div className="editor-sidebar__add-elements__right col-8">
                  {activeElement === 'text' && (
                    <div className="editor-sidebar__add-elements__right__text">
                      <a
                        className="default-text"
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e, 'default-text')}
                      >
                        Add default text 
                      </a>
                      <a
                        className="h1"
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e, 'h1')}
                      >
                        Add Heading 1
                      </a>
                      <a
                        className="h2"
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e, 'h2')}
                      >
                        Add Heading 2
                      </a>
                      <a
                        className="h3"
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e, 'h3')}
                      >
                        Add Heading 3
                      </a>
                      <a
                        className="h4"
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e, 'h4')}
                      >
                        Add Heading 4
                      </a>
                      <a
                        className="h5"
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e, 'h5')}
                      >
                        Add Heading 5
                      </a>
                      <a
                        className="h6"
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e, 'h6')}
                      >
                        Add Heading 6
                      </a>
                    </div>
                  )}
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

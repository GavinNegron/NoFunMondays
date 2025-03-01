// REACT
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// FEATURES
import { updatePostDescription } from '@/features/posts/postAction';

// DATA 
import elements from '@/data/elements';

// UTILITIES 
import { handleDragStart } from '@/utilities/editorFunctions';
import { handleClickOutside } from '@/utilities/editorFunctions';

import Tooltip from '@/utilities/tooltip';
import $ from 'jquery';

// STYLESHEETS
import './_index.sass'

function EditSidebar({post}) {
  const dispatch = useDispatch();
  const [activeElement, setActiveElement] = useState('text');

  const handleAddElementsClick = () => {
    $('.editor-sidebar__elements').stop(true, true).fadeToggle(200);
    $('.edit-styles').stop(true, true).fadeOut('fast');
  };

  const handlePostDetailsClick = () => {
    $('.editor-sidebar__post-details').stop(true, true).fadeToggle(200);
    $('.edit-styles').stop(true, true).fadeOut('fast');
  }

  const handleElementClick = (elementType) => {
    setActiveElement(elementType);
  };

  const handleDescriptionChange = () => {
    dispatch(updatePostDescription());
  }

  const includedKeys = Object.keys(elements).filter((key) => !elements[key]?.exclude);

  useEffect(() => {
    const handleClick = (e) => {
      handleClickOutside(e, ['.elements', '.editor-sidebar__elements'], '.editor-sidebar__elements');
      handleClickOutside(e, ['.post-details', '.editor-sidebar__post-details'], '.editor-sidebar__post-details')
    }
  
    document.addEventListener('mousedown', handleClick);
  
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);
  return (
    <aside className="editor-sidebar">
      <div className="editor-sidebar__icons">
        <div className="editor-sidebar__icons__item elements">
          <button onClick={handleAddElementsClick}>
            <i data-tooltip-id="tip-blocks" className="fa-solid fa-plus"></i>
            <Tooltip id="tip-blocks" header="Add elements" place="right" />
          </button>
          <div className="editor-sidebar__elements">
            <div className="editor-sidebar__header">
              <p>Add Elements</p>
            </div>
            <div className="editor-sidebar__elements__inner">
              <div className="editor-sidebar__elements__left">
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
              <div className="editor-sidebar__elements__right">
                {activeElement && elements[activeElement]?.classes?.length > 0 ? (
                  <div className={`editor-sidebar__elements__right__${activeElement}`}>
                  {elements[activeElement].classes
                    .filter(item => !item.exclude) 
                    .map((item) => (
                      <a
                        key={item.class}
                        className={item.class}
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e, item)}
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
        <div className="editor-sidebar__icons__item post-details">
          <button onClick={handlePostDetailsClick}>
            <i data-tooltip-id='tip-details' className="fa-solid fa-pen-to-square"></i>
            <Tooltip id="tip-details" header="Edit Post" place="right" />
          </button>
          <div className="editor-sidebar__post-details">
            <div className="editor-sidebar__header">
              <p>Post Details</p>
            </div>
            <div className="editor-sidebar__post-details__inner">
              <div className="editor-sidebar__post-details__item">
                <div className="editor-sidebar__post-details__header">
                  <span>Edit Description: </span>
                </div>
                <div className="editor-sidebar__post-details__input">
                  <textarea 
                    type="text" 
                    placeholder='Enter post description: ' 
                    defaultValue={post?.description}
                    onChange={handleDescriptionChange()}
                    maxLength={125}
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default EditSidebar;
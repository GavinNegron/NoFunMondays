import { useState, useEffect, useRef } from 'react'
import { useEditorContext } from '../../../../../contexts/EditorContext'

// Utilities
import { handleMouseMove, handleMouseUp, handleMouseDown } from '../../../../../utilities/posts/editorFunctions'
import { handleBlogPostElement } from '../../../../../utilities/posts/handleBlogPostElement'

// Elements import
import Embed from '../elements/embed'
import Icons from '../elements/icons'
import Family from '../elements/family'
import Size from '../elements/size'
import Type from '../elements/type'
import Weight from '../elements/weight'
import Margin from '../elements/margin'
import Image from '../elements/image'

const EditStyles = ({ title, elementOptions }) => { 
    const { blogPostMainRef } = useEditorContext();
  
    const [position, setPosition] = useState({ x: 0, y: 175, offsetX: 0, offsetY: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const elementRef = useRef(null);
  
    const getElementComponent = (option) => {
      switch (option) {
        case 'embed':
          return <Embed />;
        case 'icons':
          return <Icons />;
        case 'family':
          return <Family />;
        case 'image':
          return <Image alt=""/>;
        case 'margin':
          return <Margin />;
        case 'size':
          return <Size />;
        case 'type':
          return <Type />;
        case 'weight':
          return <Weight />;
        default:
          return null;
      }
    };
  
    useEffect(() => {
      const updatePosition = () => {
        if (blogPostMainRef.current) {
          const rect = blogPostMainRef.current.getBoundingClientRect();
          const xPos = rect.left;
          setPosition((prev) => ({ ...prev, x: xPos - 275 }));
        }
      };
  
      const onWindowLoad = () => {
        setTimeout(updatePosition, 100);
      };
  
      if (window.document.readyState === 'complete') onWindowLoad();
      else window.addEventListener('load', onWindowLoad);
  
      return () => window.removeEventListener('load', onWindowLoad);
    }, [blogPostMainRef]);
  
    useEffect(() => {
      if (isDragging) {
        const mouseMoveHandler = handleMouseMove(isDragging, position, setPosition, elementRef);
        const mouseUpHandler = () => handleMouseUp(setIsDragging);
  
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
  
        return () => {
          document.removeEventListener('mousemove', mouseMoveHandler);
          document.removeEventListener('mouseup', mouseUpHandler);
        };
      }
    }, [isDragging, position, setIsDragging]);
  
    const closeEditor = () => handleBlogPostElement(null);
  
    return (
      <div className="edit-styles edit-list-styles" style={{ position: 'fixed', top: `${position.y}px`, left: `${position.x}px` }}>
        <div
          className="edit-styles__header"
          style={{ cursor: isDragging ? 'grabbing' : 'move' }}
          onMouseDown={(e) => handleMouseDown(e, setIsDragging, setPosition)}
          ref={elementRef}
        >
          <p>{title}</p>
          <i onClick={closeEditor} className="fa-solid fa-light fa-xmark"></i>
        </div>
  
        <div className="edit-styles__container">
          {(elementOptions && Array.isArray(elementOptions)) ? (
            elementOptions.map((option, index) => (
              <div key={index} className="edit-styles__element">
                {getElementComponent(option)}
              </div>
            ))
          ) : (
            <p>No elements to display</p> 
          )}
        </div>
      </div>
    );
  };
  
export default EditStyles;
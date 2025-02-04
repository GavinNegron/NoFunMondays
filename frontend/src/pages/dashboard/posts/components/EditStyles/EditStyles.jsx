import { useState, useEffect, useRef } from 'react';
import { useEditorContext } from '../../../../../contexts/EditorContext';

// Utilities
import { handleMouseMove, handleMouseUp, handleMouseDown } from '../../../../../utilities/posts/editorFunctions';
import { handleElementClick } from '@/utilities/posts/editorFunctions';

// Elements import
import Embed from '../elements/embed';
import Icons from '../elements/icons';
import Family from '../elements/family';
import Size from '../elements/size';
import Type from '../elements/type';
import Weight from '../elements/weight';
import Margin from '../elements/margin';
import Image from '../elements/image';

const EditStyles = ({ type }) => { 
  const { blogPostMainRef } = useEditorContext();

  const [position, setPosition] = useState({ x: 0, y: 175, offsetX: 0, offsetY: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const elementRef = useRef(null);

  const getElementComponents = () => {
    switch (type) {
      case 'text':
        return [
          { component: <Family />},
          { component: <Type />},
          { component: <Size />},
          { component: <Weight />},
          { component: <Margin />},
        ];
      case 'image':
        return [
          { component: <Image alt=""/>},
          { component: <Margin />},
        ];
      case 'list':
        return [
          { component: <Family />},
          { component: <Size />},
          { component: <Weight />},
          { component: <Margin />},
        ];
      case 'embed':
        return [
          { component: <Embed />},
          { component: <Margin />},
        ];
      default:
        return [];
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

  const closeEditor = () => handleElementClick(null);

  return (
    <div className={`edit-styles edit-${type}-styles`} style={{ position: 'fixed', top: `${position.y}px`, left: `${position.x}px` }}>
      <div
        className="edit-styles__header"
        style={{ cursor: isDragging ? 'grabbing' : 'move' }}
        onMouseDown={(e) => handleMouseDown(e, setIsDragging, setPosition)}
        ref={elementRef}
      >
        <p>{`Edit ${type}`}</p>
        <i onClick={closeEditor} className="fa-solid fa-light fa-xmark"></i>
      </div>

      {(type === 'text' || type === 'list') && <Icons />}

      <div className="edit-styles__container">
        {getElementComponents().map((item, index) => (
          <div key={index} className="edit-styles__element">
            {item.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditStyles;

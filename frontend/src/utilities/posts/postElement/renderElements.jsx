import React, { useEffect } from 'react';
import { handleDrop, handleDragOver } from '../../dragUtils';
import { handleBlogPostElement } from './handleBlogPostElement';
import { useEditorContext } from '../../../contexts/EditorContext';
import { handleDoubleClick } from '../editor/editorFunctions';

const RenderElements = ({ element }) => {
  const {
    postElements,
    setPostElements,
    setSelectedElement,
    setElementStyles,
    elements,
    setPost,
    setImageUrl
  } = useEditorContext();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.charset = 'utf-8';
    document.body.appendChild(script);
  }, []);

  const embedTweet = (elementId) => {
    let url = document.getElementById(`twitter-${elementId}`).value;
  
    url = url.replace('x.com', 'twitter.com');
  
    const tweetContainer = document.getElementById(`tweet-container-${elementId}`);
      
    if (tweetContainer) {
      tweetContainer.innerHTML = '';
      const embedCode = `<blockquote class="twitter-tweet"><a href="${url}"></a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`;
      tweetContainer.innerHTML = embedCode;
      window.twttr.widgets.load();
    }
  };
  

  if (!element) return null; 

  const elementId = `${element.id}`;

  const renderContent = () => {
    switch (element.type) {
      case 'image':
        return <img src={element.imageUrl} alt={element.alt} />;
      case 'bullet':
        return (
          <div className="bullet-point">
            <ul>
              {(element.listItems && element.listItems.length > 0)
                ? element.listItems.map((item, idx) => (
                    <li key={`${element.id}-item-${idx}`}>{item}</li>
                  ))
                : <li>List Item 1</li>
              }
            </ul>
          </div>
        );
      case 'divider':
        return <span className='divider__container'></span>;
      case 'twitter':
        return (
          <div>
            <input className='twitter' id={`twitter-${elementId}`} placeholder='Enter Twitter Link: ' />
            <button onClick={() => embedTweet(elementId)}>Embed</button>
            <div id={`tweet-container-${elementId}`} className='tweet-container'></div>
          </div>
        );
      case 'text':
      default:
        return <p>{element.content}</p>;
    }
  };

  return (
    <div
      id={elementId}
      data-id={elementId}
      key={elementId}
      className={`blog-post-element ${element.type === 'text' ? element.tag : element.type}`}
      style={element.style || {}}
      onDrop={(e) => handleDrop(e, postElements, setPostElements)}
      onDragOver={handleDragOver}
      onClick={(event) => handleBlogPostElement(event.currentTarget, setSelectedElement, setElementStyles, elements, setImageUrl)}
      onDoubleClick={(e) => handleDoubleClick(e, setSelectedElement, setPost, setPostElements)}
      tabIndex="0"
    >
      {renderContent()}
    </div>
  );
};

export default RenderElements;

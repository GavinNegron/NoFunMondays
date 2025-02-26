// REACT
import React, { useState, useEffect } from 'react';
import { useEditorContext } from '@/contexts/EditorContext';
import { useDispatch } from 'react-redux';

// UTILITIES
import { handleDrop, handleDragOver } from '../dragUtils';
import { handleDoubleClick } from './editorFunctions';
import { handleElementClick } from './editorFunctions';

// COMPONENTS
import TwitterEmbed from './TwitterEmbed';
import { updatePostElement } from '@/features/posts/postAction';

const RenderElements = ({ element }) => {
  const {
    setSelectedElement,
    setPreviewImage,
  } = useEditorContext();

  const dispatch = useDispatch();

  const [twitterUrl, setTwitterUrl] = useState('');
  const [twitterId, setTwitterId] = useState('');

  useEffect(() => {
    if (element.twitterId) {
      setTwitterId(element.twitterId);
    }
  }, [element.twitterId]);

  useEffect(() => {}, [twitterId]);

  const handleInputChange = (e) => {
    setTwitterUrl(e.target.value);
  };

  const extractTweetID = (url) => {
    const regex = /(?:twitter|x)\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/;
    const match = url.match(regex);
    return match ? match[3] : null; 
  };
  
  const handleEmbedClick = () => {
    const tweetID = extractTweetID(twitterUrl);
    if (tweetID) {
      setTwitterId(tweetID);
    }
  };

  if (!element) return null;

  const elementId = `${element.id}`;

  const handleClick = (e) => {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      e.stopPropagation();
  
      const linkText = e.target.textContent.trim();
      const linkAddress = e.target.getAttribute('href') || '';
  
      document.querySelector('#addLink-text').value = linkText;
      document.querySelector('#addLink-address').value = linkAddress;
  
      document.querySelector('.addLink').style.display = 'flex';
    } else {
      handleElementClick(e.currentTarget, setSelectedElement, setPreviewImage);
    }
  };
  
  

  const renderContent = () => {
    switch (element.type) {
      case 'image': 
        return <img src={element.imageUrl || '/images/placeholder.png'} alt={element.imageAlt} />;
      case 'bullet':
        return (
          <div className="bullet-point">
            <ul>
              {element.listItems && element.listItems.length > 0
                ? element.listItems.map((item, idx) => (
                    <li key={`${element.id}-item-${idx}`}>{item}</li>
                  ))
                : <li>List Item 1</li>}
            </ul>
          </div>
        );
      case 'divider':
        return <span className="divider__container"></span>;
      case 'twitter':
        return twitterId ? (
          <TwitterEmbed tweetID={twitterId} />
        ) : (
          <div>
            <input
              type="text"
              value={twitterUrl}
              onChange={handleInputChange}
              placeholder="Enter Twitter URL"
              className="twitter"
            />
            <button onClick={handleEmbedClick}>Embed</button>
          </div>
        );
      case 'h1':
        return <h1 dangerouslySetInnerHTML={{ __html: element.content }} />;
      case 'h2':
        return <h2 dangerouslySetInnerHTML={{ __html: element.content }} />;
      case 'h3':
        return <h3 dangerouslySetInnerHTML={{ __html: element.content }} />;
      case 'h4':
        return <h4 dangerouslySetInnerHTML={{ __html: element.content }} />;
      case 'h5':
        return <h5 dangerouslySetInnerHTML={{ __html: element.content }} />;
      case 'h6':
        return <h6 dangerouslySetInnerHTML={{ __html: element.content }} />;
      default:
        return <p dangerouslySetInnerHTML={{ __html: element.content }} />;
    }
  };

  return (
    <div
      id={elementId}
      data-id={elementId}
      key={elementId}
      className={`blog-post-element ${element.type === 'text' ? element.tag : element.type}`}
      style={element.style || {}}
      onDrop={(e) => handleDrop(e)}
      onDragOver={handleDragOver}
      onClick={handleClick}
      onDoubleClick={(e) => handleDoubleClick(e, dispatch, updatePostElement)}
      tabIndex="0"
    >
      {renderContent()}
    </div>
  );
};

export default RenderElements;
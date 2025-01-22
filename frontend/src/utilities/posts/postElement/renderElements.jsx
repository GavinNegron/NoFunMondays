import React, { useState, useEffect } from 'react';
import { handleDrop, handleDragOver } from '../../dragUtils';
import { handleBlogPostElement } from './handleBlogPostElement';
import { useEditorContext } from '../../../contexts/EditorContext';
import { handleDoubleClick } from '../editor/editorFunctions';
import TwitterEmbed from './TwitterEmbed';


const RenderElements = ({ element }) => {
  const { setSelectedElement } = useEditorContext();

  const [twitterUrl, setTwitterUrl] = useState('');
  const [twitterId, setTwitterId] = useState('');

  useEffect(() => {
    if (element.twitterId) {
      setTwitterId(element.twitterId);
    }
  }, [element.twitterId]);

  useEffect(() => {
  }, [twitterId]);

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

  const renderContent = () => {
    switch (element.type) {
      case 'image': 
        return <img src={element.imageUrl || '/img/placeholder.png'} alt={element.alt} />;
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
      onDrop={(e) => handleDrop(e)}
      onDragOver={handleDragOver}
      onClick={(event) =>
        handleBlogPostElement(event.currentTarget, setSelectedElement)
      }
      onDoubleClick={(e) => handleDoubleClick(e)}
      tabIndex="0"
    >
      {renderContent()}
    </div>
  );
};

export default RenderElements;
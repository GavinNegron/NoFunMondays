import React, { useState, useEffect } from 'react';
import { handleDrop, handleDragOver } from '../dragUtils';
import { handleDoubleClick } from './editorFunctions';
import TwitterEmbed from './TwitterEmbed';
import { handleElementClick } from './editorFunctions';
import { useEditorContext } from '@/contexts/EditorContext';


const RenderElements = ({ element }) => {
  console.log(element)
  const {
    setSelectedElement,
    setPreviewImage,
    setPost
  } = useEditorContext();
  
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
          return <h1>{element.content}</h1>;
        case 'h2':
          return <h2>{element.content}</h2>;
        case 'h3':
          return <h3>{element.content}</h3>;
        case 'h4':
          return <h4>{element.content}</h4>;
        case 'h5':
          return <h5>{element.content}</h5>;
        case 'h6':
          return <h6>{element.content}</h6>; 
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
      onClick={(e) => handleElementClick(e.currentTarget, setSelectedElement, setPreviewImage)}
      onDoubleClick={(e) => handleDoubleClick(e)}
      tabIndex="0"
    >
      {renderContent()}
    </div>
  );
};

export default RenderElements;
import React, { useState, useEffect } from 'react';
import TwitterEmbed from './TwitterEmbed';

const RenderElements = ({ element }) => {
  if (!element) return null;

  const elementId = `${element.id}`;

  const renderContent = () => {
    switch (element.type) {
      case 'image': 
        return <img src={element.imageUrl || '/image/placeholder.png'} alt={element.alt} />;
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
        return <TwitterEmbed tweetID={element.twitterId} />
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
    >
      {renderContent()}
    </div>
  );
};

export default RenderElements;
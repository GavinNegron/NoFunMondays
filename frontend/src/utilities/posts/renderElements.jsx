import React from 'react';
import TwitterEmbed from './TwitterEmbed';

const RenderElements = ({ element }) => {
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
        return <TwitterEmbed tweetID={element.twitterId} />
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
    >
      {renderContent()}
    </div>
  );
};

export default RenderElements;
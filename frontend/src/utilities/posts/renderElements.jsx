import React from 'react';
import TwitterEmbed from './TwitterEmbed';
import VideoEmbed from './VideoEmbed';

const RenderElements = ({ element }) => {
  if (!element) return null;

  const elementId = `${element.id}`;

  const renderContent = () => {
    switch (element.type) {
      case 'image': 
        return <img className='no-select' draggable='false' src={element.imageUrl || '/images/placeholder.png'} alt={element.imageAlt} />;
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
      case 'video':
        return <VideoEmbed videoUrl={element.videoId} />
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
    >
      {renderContent()}
    </div>
  );
};

export default RenderElements;
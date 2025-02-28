import React, { useState, useEffect } from 'react';
import { useEditorContext } from '@/contexts/EditorContext';
import { useDispatch } from 'react-redux';
import { handleDrop, handleDragOver } from '../dragUtils';
import { handleDoubleClick, handleElementClick } from './editorFunctions';
import TwitterEmbed from './TwitterEmbed';
import VideoEmbed from './VideoEmbed';
import { updatePostElement } from '@/features/posts/postAction';

const RenderElements = ({ element }) => {
  const { setSelectedElement, setPreviewImage } = useEditorContext();
  const dispatch = useDispatch();
  const [twitterUrl, setTwitterUrl] = useState('');
  const [twitterId, setTwitterId] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState('');

  useEffect(() => {
    if (element.twitterId) {
      setTwitterId(element.twitterId);
    }
    if (element.videoId) {
      setVideoId(formatYouTubeEmbedUrl(element.videoId));
    }
  }, [element.twitterId, element.videoId]);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const extractTweetID = (url) => {
    const regex = /(?:twitter|x)\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/;
    const match = url.match(regex);
    return match ? match[3] : null;
  };

  const handleEmbedClick = (url, setter) => {
    const id = extractTweetID(url);
    if (id) {
      setter(id);
    }
  };

  const formatYouTubeEmbedUrl = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  if (!element) return null;

  const elementId = `${element.id}`;

  const handleClick = (e) => {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      e.stopPropagation();
      document.querySelector('#addLink-text').value = e.target.textContent.trim();
      document.querySelector('#addLink-address').value = e.target.getAttribute('href') || '';
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
              onChange={handleInputChange(setTwitterUrl)}
              placeholder="Enter Twitter URL"
              className="twitter"
            />
            <button onClick={() => handleEmbedClick(twitterUrl, setTwitterId)}>Embed</button>
          </div>
        );
      case 'video':
        return videoId ? (
          <VideoEmbed videoUrl={videoId} />
        ) : (
          <div>
            <input
              type="text"
              value={videoUrl}
              onChange={handleInputChange(setVideoUrl)}
              placeholder="Enter Video URL"
              className="video"
            />
            <button onClick={() => setVideoId(formatYouTubeEmbedUrl(videoUrl))}>Embed</button>
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
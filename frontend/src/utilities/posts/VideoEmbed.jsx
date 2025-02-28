const VideoEmbed = ({ videoUrl }) => {
    if (!videoUrl) return null;
  
    const isDirectVideo = videoUrl.match(/\.(mp4|webm|ogg)$/i);
  
    return (
      <div className="video-embed" data-videoid={videoUrl}>
        {isDirectVideo ? (
          <video controls width="100%">
            <source src={videoUrl} type={`video/${videoUrl.split('.').pop()}`} />
            Your browser does not support the video tag.
          </video>
        ) : (
          <iframe
            width="560"
            height="315"
            src={videoUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    );
  };
  
  export default VideoEmbed;
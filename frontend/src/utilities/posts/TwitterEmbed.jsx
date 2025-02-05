import React, { memo, useEffect, useRef } from 'react';
import Script from 'next/script';

const TwitterEmbed = ({ tweetID }) => {
  const isMounted = useRef(false);

  useEffect(() => {
    const loadTwitterWidget = () => {
      if (!isMounted.current && window.twttr) {
        window.twttr.widgets.createTweet(
          tweetID,
          document.getElementById(tweetID),
          {
            align: 'center',
            conversation: 'none',
            dnt: true,
            theme: 'dark',
          }
        );
        isMounted.current = true;
      }
    };

    // Check if twttr is already available, otherwise load the script
    if (window.twttr) {
      loadTwitterWidget();
    } else {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.onload = loadTwitterWidget;
      document.body.appendChild(script);
    }
  }, [tweetID]);

  return (
    <div className="w-full animate-fadeIn" id={tweetID} data-tweetid={tweetID}></div>
  );
};

TwitterEmbed.displayName = 'TwitterEmbed';

export default memo(TwitterEmbed);
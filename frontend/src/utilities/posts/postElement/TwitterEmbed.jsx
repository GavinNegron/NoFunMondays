import React, { memo, useEffect, useRef } from 'react';

const TwitterEmbed = memo(({ tweetID }) => {
  const isMounted = useRef(false);

  useEffect(() => {
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
  }, [tweetID]);

  return (
    <div className="w-full animate-fadeIn" id={tweetID}></div>
  );
});

export default TwitterEmbed;

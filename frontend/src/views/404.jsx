import React from 'react';

function NotFound() {
  return (
    <>
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"></link>
    <link rel="stylesheet" href="/css/404.css"></link>

      <div class="error-404">
        <div class="error-404__header">
            <span>404</span>
        </div>
        <div class="error-404__description">
            <span>Page Not Found</span>
        </div>
        <div class="error-404__pun">
            <span>Looks like this page has gone AFK</span>
        </div>
        <div class="error-404__btn">
          <div class="fortnite__btn">
            <span><a href="/">Return To Lobby</a></span>
          </div>
        </div>
    </div>
    </>
  );
}

export default NotFound;
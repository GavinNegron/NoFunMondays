import React from 'react';

function NotFound() {
  return (
    <>
      <div class="error-404">
        <div class="error-404__header">
            <span>404</span>
        </div>
        <div class="error-404__description">
            <span>Page Not Found</span>
        </div>
        <div class="error-404__pun">
            <span>Looks like you've hit a wrong note</span>
        </div>
        <div class="error-404__btn">
            <a href="/"><button class="btn btn-secondary">Go Back Home</button></a>
        </div>
    </div>
    </>
  );
}

export default NotFound;

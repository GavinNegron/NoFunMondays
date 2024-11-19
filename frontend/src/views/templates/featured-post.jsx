import React from 'react';

function FeaturedPost() {

  return (
    <>
    <div class="featured-post">
        <div class="featured-post__header">
            <p>Featured Article:</p>
        </div>
        <div class="featured-post__inner d-flex col-12">
            <div class="featured-post__left d-flex col-12 col-md-12 col-lg-7">
                <div class="featured-post__img">
                    <a href="/blog-post"></a>
                </div>
            </div>
            <div class="featured-post__right d-flex col-12 col-md-12 col-lg-5">
                <div class="featured-post__content">
                    <div class="featured-post__title">
                        <a href="blog-post">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</a>
                    </div>
                    <div class="featured-post__description">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quod tenetur nisi numquam saepe quibusdam illo ipsa excepturi! Quo nostrum sunt blanditiis, ex dolores beatae.</p>
                    </div>
                    <div class="featured-post__date">
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default FeaturedPost;
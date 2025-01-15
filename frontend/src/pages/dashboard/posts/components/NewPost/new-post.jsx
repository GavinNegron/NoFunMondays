import React, { useState, useEffect, useRef } from 'react';
import { useEditorContext } from '../../../../../contexts/EditorContext';
import $ from 'jquery'; 
import { handleClickOutside } from '../../../../../utilities/domUtils';
import { createPost, findTitle } from '../../../../../features/posts/postService';

function NewPost() {
    const {
        renderImageSelector,
        image,
        setTitle,
        title,
        navigate
    } = useEditorContext();

    const [error, setError] = useState(null);
    const isMountedRef = useRef(true);

    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    $(".new-post").on('click', (e) => {
        handleClickOutside(e, '.new-post__inner', '.new-post');
        $("body").css("max-height", "none");
        $("body").css("overflow", "unset");
        $(".new-post").css("display", "none");
    });

    const handleNewPost = async () => {
        let isMounted = true; 
        if (!title || !image) {
            if (isMounted) setError('Title and image are required');
            return;
        }
        try {
            const isTitleAvailable = await findTitle(title);
            if (!isTitleAvailable) {
                if (isMounted) setError('Title already exists. Please choose a different title.');
                return;
            }
            const post = { 
                title, 
                imageUrl: image,
                status: 'draft', 
            };
            const createdPost = await createPost(post);

            if (isMounted) navigate(`/dashboard/posts/edit/${createdPost.slug}`);
        } catch (error) {
            if (isMounted) setError('An error occurred while creating the post.');
        }
        return () => { isMounted = false; }; 
    };

    return (
        <div className="new-post">
            <div className="new-post__inner">
                <div className="new-post__header">
                    <span>Create New Post:</span>
                </div>
                <div className="new-post__content">
                    {error && (
                        <div className="new-post__content-error">
                            <span>{error}</span>
                        </div>
                    )}
                    <div className="new-post__content-title">
                        <span>Add a title: </span>
                        <input onChange={e => setTitle(e.target.value)} maxLength="80" type="text" placeholder="Add a title" />
                    </div>
                    <div className="new-post__content-image">
                        <span>Select Image</span>
                        <div className="new-post__content-image__preview">
                            {renderImageSelector(true)}
                        </div>
                    </div>
                    <div className="new-post__content-submit">
                        <button className="fortnite-btn" onClick={handleNewPost}>Create Post</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewPost;
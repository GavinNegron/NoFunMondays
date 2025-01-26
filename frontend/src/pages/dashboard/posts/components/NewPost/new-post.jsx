// REACT
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useEditorContext } from '../../../../../contexts/EditorContext';
import $ from 'jquery';

// COMPONENTS
import LoadingScreen from '../../../../../components/base/loading';

// FEATURES
import { createPost } from '../../../../../features/posts/postActions/createPost';
import { findTitle } from '../../../../../features/posts/postActions/fetchTitle';

// UTILITIES
import { handleClickOutside } from '../../../../../utilities/domUtils';

function NewPost() {
    const { renderImageSelector, image } = useEditorContext();
    const router = useRouter();
    const dispatch = useDispatch();
    const [title, setTitle] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        $(".new-post").on('click', (e) => {
            handleClickOutside(e, '.new-post__inner', '.new-post');
        });
    });

    const handleNewPost = async () => {
        if (!title || !image) return setError('Title and image are required');
        try {
            const isTitleAvailable = await dispatch(findTitle(title)).unwrap();
            if (!isTitleAvailable) {
                setError('Title already exists. Please choose a different title.');
                $('.new-post').addClass('error-visible'); 
                return;
            }

            const post = {
                title,
                imageUrl: image,
                status: 'draft',
            };

            const createdPost = await dispatch(createPost(post)).unwrap();
            router.push(`/dashboard/posts/edit/${createdPost.slug}`);
        } catch (error) {
            setError('Error.', error);
        } finally {
           setIsLoading(false); 
        }
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className={`new-post ${error ? 'error-visible' : ''}`}>
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
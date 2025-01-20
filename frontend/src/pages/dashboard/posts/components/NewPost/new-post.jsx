import React, { useState, useEffect, useRef } from 'react';
import { useEditorContext } from '../../../../../contexts/EditorContext';
import $ from 'jquery';
import { useDispatch } from 'react-redux';
import { handleClickOutside } from '../../../../../utilities/domUtils';
import { createPost } from '../../../../../features/posts/postSlice/createPost';
import { findTitle } from '../../../../../features/posts/postSlice/findTitle';
import { useRouter } from 'next/router';
import LoadingScreen from '../../../../components/base/loading';

function NewPost() {
    const {
        renderImageSelector,
        image,
        setTitle,
        title
    } = useEditorContext();

    const dispatch = useDispatch();
    const router = useRouter();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const isMountedRef = useRef(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            $(".new-post").on('click', (e) => {
                handleClickOutside(e, '.new-post__inner', '.new-post');
            });
        }

        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const handleNewPost = async () => {
        if (!title || !image) {
            if (isMountedRef.current) setError('Title and image are required');
            return;
        }
        try {
            const isTitleAvailable = await dispatch(findTitle(title)).unwrap();
            if (!isTitleAvailable) {
                if (isMountedRef.current) {
                    setError('Title already exists. Please choose a different title.');
                    $('.new-post').addClass('error-visible'); // Add error-visible class
                }
                return;
            }

            const post = {
                title,
                imageUrl: image,
                status: 'draft',
            };

            const createdPost = await dispatch(createPost(post)).unwrap();

            if (isMountedRef.current) router.push(`/dashboard/posts/edit/${createdPost.slug}`);
        } catch (error) {
            if (isMountedRef.current) setError('Error.', error);
        } finally {
            if (isMountedRef.current) setIsLoading(false); 
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
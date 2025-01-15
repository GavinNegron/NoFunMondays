import React, { useState, useEffect, useRef } from 'react';
import { useEditorContext } from '../../../contexts/EditorContext';
import $ from 'jquery'; 
import { handleClickOutside } from '../../../utilities/domUtils';
import { publishPost } from '../../../utilities/posts/postData/publishPost';

function Publish() {
    const {
        post,
        postElements,
        setPost,
        navigate,
        imageUrl
    } = useEditorContext();

    const isMountedRef = useRef(true);

    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    $(".publish").on('click', (e) => {
        handleClickOutside(e, '.publish__inner', '.publish');
        $("body").css("max-height", "unset");
        $("body").css("overflow", "unset");
        $(".publish").css("display", "none");
    });

    return (
        <div className="publish">
            <div className="publish__inner">
                <div className="publish__header">
                    <span>Publish Post</span>
                </div>
                <div className="publish__content">
                    <a href="#" draggable="false">
                        <div className="publish__content__item publish__content-post">
                            <span>Publish Post</span>
                            <p>Make your post public.</p>
                        </div>
                    </a>
                    <a href="#" draggable="false">
                        <div className="publish__content__item publish__content-schedule">
                            <div className="publish__content-schedule__text">
                                <span>Scheduled Publish</span>
                                <p>Select a time to make your post public.</p>
                            </div>
                            <div className="publish__content-schedule__input">
                                <input type="date" name="" id="" />
                                <input type="time" name="" id="" />
                            </div>
                            <p>Post will be <b>private</b> before set time.</p>
                        </div>
                    </a>
                    <div className="publish__content-submit">
                        <button className="fortnite-btn" onClick={() => publishPost(post, postElements, setPost, navigate, imageUrl)}>Publish Post</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Publish;
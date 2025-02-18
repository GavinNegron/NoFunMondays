import React, { useEffect, useRef } from 'react';
import { useEditorContext } from '@/contexts/EditorContext';
import { useSelector, useDispatch } from 'react-redux';
import { handleClickOutside } from '@/utilities/domUtils';
import { publishPost } from '@/features/posts/postAction';
import Checkbox from '@/components/base/checkbox/';

function Publish() {
    const dispatch = useDispatch();
    const { setPost } = useEditorContext();
    const { postElements, post } = useSelector((state) => state.posts.post);
    const isMountedRef = useRef(true);

    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        const handleClick = (e) => {
            const publish = document.querySelector('.publish');
            if (publish && publish.contains(e.target)) {
                handleClickOutside(e, '.publish__inner', '.publish');
            }
        };
    
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);
    
    const handlePublish = () => {
        dispatch(publishPost({ post, postElements })).then((action) => {
            if (action.meta.requestStatus === 'fulfilled') {
                setPost(action.payload);
            }
        });
    };

    return (
        <div className="publish">
            <div className="publish__inner">
                <div className="publish__header">
                    <span>Publish Post</span>
                </div>
                <div className="publish__content">
                    <a draggable="false">
                        <div className="publish__content__item publish__content-post">
                            <span>Publish Post</span>
                            <p>Make your post public.</p>
                        </div>
                    </a>
                    <a draggable="false">
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
                    <div className="publish__content-featured">
                        <Checkbox/>
                        <span>Feature this post</span>
                    </div>
                    <div className="publish__content-submit">
                        <button className="fortnite-btn" onClick={handlePublish}>
                            Publish Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Publish;
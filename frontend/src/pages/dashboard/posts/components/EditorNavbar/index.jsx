import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tooltip from '@/utilities/tooltip';
import $ from 'jquery';
import Publish from '../Publish/index';
import Link from 'next/link';
import { savePost } from '@/features/posts/postAction';

function EditNavbar() {
    const dispatch = useDispatch();
    const { postElements, post } = useSelector((state) => state.posts.post);
    const postSlug = post?.slug;

    const publishPost = async () => {
        $("body").css("max-height", "100vh");
        $("body").css("overflow", "hidden");
        $(".publish").css("display", "flex");
    }
    
    const postStatus = post?.status;
    console.log(post)
    if (!postStatus) {
    return null
    }

    const handleSave = () => {
        dispatch(savePost({ post, postElements }))
    };

    return (
        <>
            <div className="editor-navbar col-12">
                <div className="editor-navbar__left align-items-center d-flex">
                    <div className="editor-navbar__item__status d-flex align-items-center">
                        <span>Page Status: </span>
                        <button 
                            data-tooltip-id={`tip-${postStatus}`} 
                            className={`status-btn status-btn--${postStatus}`}
                        >
                            {postStatus.charAt(0).toUpperCase() + postStatus.slice(1)} 
                        </button>
                        <Tooltip 
                            id={`tip-${postStatus}`}
                            header={`${postStatus.charAt(0).toUpperCase() + postStatus.slice(1)}:`}
                            description={postStatus === 'published' ? 'The page you see now is what the viewer sees.' : 'The post is in draft mode.'}
                            place="bottom"
                        />
                    </div>
                </div>

                <div className="editor-navbar__middle align-items-center d-flex col-5">
                    <div className="editor-navbar__item__search">
                        <span>
                            {postSlug ? (
                                <Link href={`/blog/${postSlug}`} target="_blank" rel='noreferrer'>
                                    https://nofunmondays.com/blog/{postSlug}
                                </Link>
                            ) : (
                                <span>Loading...</span> 
                            )}
                        </span>
                    </div>
                </div>

                <div className="editor-navbar__right col-3 d-flex justify-content-end align-items-center">
                    <div className="editor-navbar__item__tools d-flex align-items-center">
                        <div className="editor-navbar__item">
                            <Link href='#f'>
                                <i data-tooltip-id="tip-tools" className="fa-solid fa-wrench"></i>
                                <Tooltip 
                                  id="tip-tools" 
                                  header="Tools:" 
                                  description="Select any tools you wish to use." 
                                  place="bottom"
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="editor-navbar__item__undoredo d-flex align-items-center">
                        <div className="editor-navbar__item">
                            <Link href='#f'>
                                <i data-tooltip-id="tip-undo" className="fa-solid fa-rotate-left"></i>
                                <Tooltip id="tip-undo" header="Undo" place="bottom" />
                            </Link>
                        </div>
                        <div className="editor-navbar__item">
                            <Link href='#f'>
                                <i data-tooltip-id="tip-redo" className="fa-solid fa-rotate-right"></i>
                                <Tooltip id="tip-redo" header="Redo" place="bottom" />
                            </Link>
                        </div>
                    </div>
                    <div className="editor-navbar__item__save d-flex align-items-center">
                        <div className="editor-navbar__item">
                            <Link data-tooltip-id='tip-save' href='#f' className='save-btn' onClick={() => handleSave()}>Save</Link>
                            <Tooltip 
                                id="tip-save" 
                                header="Autosave is on" 
                                description="Website will save every minute. Or whenever you press save."
                                place="bottom"
                            />
                        </div>
                        <div className="editor-navbar__item">
                            <Link data-tooltip-id='tip-preview' href='#f' className='preview-btn'>Preview</Link>
                            <Tooltip 
                                id="tip-preview" 
                                header="Preview Post" 
                                description="See what your post will look like from the viewers end."
                                place="bottom"
                            />
                        </div>
                        <div className="editor-navbar__item">
                            <button
                                data-tooltip-id='tip-publish'
                                className='publish-btn'
                                onClick={() => {
                                    publishPost();  
                                }}
                            >
                                Publish
                            </button>
                            <Tooltip 
                                id="tip-publish" 
                                header="Publish Post" 
                                description="Click publish to make your post go live."
                                place="bottom"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Publish />
        </>
    );
}

export default EditNavbar;

import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { useEditorContext } from '@/contexts/EditorContext';

// UTILITIES
import Tooltip from '@/utilities/tooltip';
import $ from 'jquery';
import { handleEditorClose, handleEditorOpen } from '@/utilities/editorFunctions';

// DATA
import elements from '@/data/elements';

// COMPONENTS
import Publish from '../Publish/index';

// FEATURES
import { savePost } from '@/features/posts/postAction';

function EditNavbar() {
    const [navState, setNavState] = useState(false);
    const {
        selectedElement,
        setStyle,
        isFeatured,
        isChallenge,
    } = useEditorContext();

    const dispatch = useDispatch();
    const { postElements, post } = useSelector((state) => state.posts.post);
    const postSlug = post?.slug;
    const autoSaveTimer = useRef(null);
    const postStatus = post?.status;
    const isSaving = useRef(false);
    const ctrlPressed = useRef(false);

    // Cookie helper functions
    const setCookie = (name, value, days = 30) => {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + days);
        document.cookie = `${name}=${value};expires=${expirationDate.toUTCString()};path=/`;
    };

    const getCookie = (name) => {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith(`${name}=`))
            ?.split('=')[1];
        
        return cookieValue;
    };

    useEffect(() => {
        // Check for editorState cookie on page load
        const editorStateCookie = getCookie('editorState');
        setNavState(editorStateCookie === 'true');

        resetAutoSave();
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 's') {
                event.preventDefault();
                if (!ctrlPressed.current) {
                    handleSave();
                }
                ctrlPressed.current = true;
            }
        };
        const handleKeyUp = (event) => {
            if (event.key === 'Control') {
                ctrlPressed.current = false;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [post, postElements]);

    // Modified handleEditorOpen and handleEditorClose to update navState
    const customHandleEditorOpen = () => {
        handleEditorOpen();
        setNavState(true);
        setCookie('editorState', 'true');
    };

    const customHandleEditorClose = () => {
        handleEditorClose();
        setNavState(false);
        setCookie('editorState', 'false');
    };

    const publishPost = async () => {
        $("body").css("max-height", "100vh");
        $("body").css("overflow", "hidden");
        $(".publish").css("display", "flex");
    };

    const handleSave = () => {
        $(".save-indicator").fadeIn(600).css("display", "flex");
        if (isSaving.current) return;
        isSaving.current = true;
        dispatch(savePost({ post, postElements, isFeatured, isChallenge }));
        setTimeout(() => {
            isSaving.current = false;
            $(".save-indicator").fadeOut(600);
        }, 4000); 
    };
    
    const resetAutoSave = () => {
        if (autoSaveTimer.current) {
            clearTimeout(autoSaveTimer.current);
        }
        autoSaveTimer.current = setTimeout(() => {
            dispatch(savePost({ post, postElements }));
            resetAutoSave();
        }, 60000);
    };

    const handleFamilyChange = (e) => {
        selectedElement.style.fontFamily = e.target.value;
        setStyle(prevStyle => ({ ...prevStyle, fontFamily: e.target.value }));
    };

    if (!postStatus) return null;

    return (
        <>
            <div className="editor-navbar col-12 no-select">
                <div className="editor-navbar__top">
                    <div className="editor-navbar__left align-items-center d-flex">
                        <div className="editor-navbar__status d-flex align-items-center">
                            <span className="editor-navbar__status-text">Page Status: </span>
                            <button 
                                data-tooltip-id={`tip-${postStatus}`} 
                                className={`editor-navbar__status-btn editor-navbar__status-btn--${postStatus}`}
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
                        <div className="editor-navbar__search">
                            <span className="editor-navbar__search-text">
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
                        <div className="editor-navbar__tools d-flex align-items-center">
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
                        <div className="editor-navbar__undoredo d-flex align-items-center">
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
                        <div className="editor-navbar__actions d-flex align-items-center">
                            <div className="editor-navbar__item">
                                <Link data-tooltip-id='tip-save' href='#f' className='editor-navbar__save-btn' onClick={handleSave}>Save</Link>
                                <Tooltip 
                                    id="tip-save" 
                                    header="Autosave is on" 
                                    description="Website will save every minute. Or whenever you press save."
                                    place="bottom"
                                />
                            </div>
                            <div className="editor-navbar__item">
                                <Link data-tooltip-id='tip-preview' href='#f' className='editor-navbar__preview-btn'>Preview</Link>
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
                                    className='editor-navbar__publish-btn'
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
                    <div className="editor-open" onClick={customHandleEditorOpen} style={{ display: navState ? 'none' : 'flex' }}>
                        <i className="fa-solid fa-chevron-down"></i>
                    </div>
                </div>
            <div className="editor-navbar__bottom" style={{ display: navState ? 'flex' : 'none' }}>
                <div className="editor-navbar__column">
                <div className="editor-navbar__item">
                    <select data-tooltip-id='tip-type-editor' onChange={(e) => handleFamilyChange(e)}>
                        {elements.text.classes
                        .filter(item => !item.exclude)
                        .map((item, index) => (
                            <option key={index} value={item.class}>
                            {item.text}
                            </option>
                        ))}
                    </select>
                    <Tooltip 
                        id="tip-type-editor" 
                        description="Type"
                        margin={'0 0 0 0'}
                        place={'bottom'}
                        delay={400}
                    />
                </div>
                </div>
                <div className="editor-navbar__divider"><span></span></div>
                    <div className="editor-navbar__column">
                        <div className="editor-navbar__item">
                            <select data-tooltip-id='tip-family-editor' onChange={(e) => handleFamilyChange(e)}>
                                {elements.fontOptions.options.map((font, index) => (
                                <option key={index} value={font} style={{ fontFamily: font }}>
                                    {font}
                                </option>
                                ))}
                            </select>
                            <Tooltip 
                                id="tip-family-editor" 
                                description="Family"
                                margin={'0 0 0 0'}
                                place={'bottom'}
                                delay={400}
                            />
                        </div>
                    </div>
                    <div className="editor-navbar__divider"><span></span></div>
                    <div className="editor-navbar__column editor-navbar__size">
                        <div className="editor-navbar__item">
                            <i data-tooltip-id='tip-minus-editor' className="fa-solid fa-minus"></i>
                            <Tooltip 
                                id="tip-minus-editor" 
                                description="Decrease font size."
                                margin={'0 0 0 0'}
                                place={'bottom'}
                                delay={400}
                            />
                        </div>
                        <div className="editor-navbar__item">
                            <input data-tooltip-id='tip-size-editor' type="text" />
                            <Tooltip 
                                id="tip-size-editor" 
                                description="Font size."
                                margin={'0 0 0 0'}
                                place={'bottom'}
                                delay={400}
                            />
                        </div>
                        <div className="editor-navbar__item">
                            <i data-tooltip-id='tip-plus-editor' className="fa-solid fa-plus"></i>
                            <Tooltip 
                                id="tip-plus-editor" 
                                description="Font size"
                                margin={'0 0 0 0'}
                                place={'bottom'}
                                delay={400}
                            />
                        </div>
                    </div>
                    <div className="editor-navbar__divider"><span></span></div>
                    <div className="editor-navbar__column editor-navbar__style">
                        <div className="editor-navbar__item">
                            <i data-tooltip-id='tip-bold-editor' className="fa-solid fa-bold"></i>
                            <Tooltip 
                                id="tip-bold-editor" 
                                description="Bold"
                                margin={'0 0 0 0'}
                                place={'bottom'}
                                delay={400}
                            />
                        </div>
                        <div className="editor-navbar__item">
                            <i data-tooltip-id='tip-italic-editor' className="fa-solid fa-italic"></i>
                            <Tooltip 
                                id="tip-italic-editor" 
                                description="Italic"
                                margin={'0 0 0 0'}
                                place={'bottom'}
                                delay={400}
                            />
                        </div>
                        <div className="editor-navbar__item">
                            <i data-tooltip-id='tip-underline-editor' className="fa-solid fa-underline"></i>
                            <Tooltip 
                                id="tip-underline-editor" 
                                description="Underline"
                                margin={'0 0 0 0'}
                                place={'bottom'}
                                delay={400}
                            />
                        </div>
                        <div className="editor-navbar__item">
                            <i data-tooltip-id='tip-color-editor' className="fa-solid fa-palette"></i>
                            <Tooltip 
                                id="tip-color-editor" 
                                description="Text color"
                                margin={'0 0 0 0'}
                                place={'bottom'}
                                delay={400}
                            />
                        </div>
                        <div className="editor-navbar__item">
                            <i data-tooltip-id='tip-strikethrough-editor' className="fa-solid fa-strikethrough"></i>
                            <Tooltip 
                                id="tip-strikethrough-editor" 
                                description="Strikethrough"
                                margin={'0 0 0 0'}
                                place={'bottom'}
                                delay={400}
                            />
                        </div>
                    </div>
                    <div className="editor-navbar__divider"><span></span></div>
                    <div className="editor-navbar__column editor-navbar__align">
                        <div className="editor-navbar__item">
                            <i data-tooltip-id='tip-alignleft-editor' className="fa-solid fa-align-left"></i>
                            <Tooltip 
                                id="tip-alignleft-editor" 
                                description="Left align"
                                margin={'0 0 0 0'}
                                place={'bottom'}
                                delay={400}
                            />
                        </div>
                        <div className="editor-navbar__item">
                            <i data-tooltip-id='tip-aligncenter-editor' className="fa-solid fa-align-center"></i>
                            <Tooltip 
                                id="tip-aligncenter-editor" 
                                description="Center align"
                                margin={'0 0 0 0'}
                                place={'bottom'}
                                delay={400}
                            />
                        </div>
                        <div className="editor-navbar__item">
                            <i data-tooltip-id='tip-alignright-editor' className="fa-solid fa-align-right"></i>
                            <Tooltip 
                                id="tip-alignright-editor" 
                                description="Right align"
                                margin={'0 0 0 0'}
                                place={'bottom'}
                                delay={400}
                            />
                        </div>
                    </div>
                    <div className="editor-navbar__divider"><span></span></div>
                    <div className="editor-navbar__column editor-navbar__media">
                        <div className="editor-navbar__item">
                            <i data-tooltip-id='tip-link-editor' className="fa-solid fa-link"></i>
                            <Tooltip 
                                id="tip-link-editor" 
                                description="Insert link"
                                margin={'0 0 0 0'}
                                place={'bottom'}
                                delay={400}
                            />
                        </div>
                        <div className="editor-navbar__item">
                            <i data-tooltip-id='tip-quote-editor' className="fa-solid fa-quote-right"></i>
                            <Tooltip 
                                id="tip-quote-editor" 
                                description="Blockquote"
                                margin={'0 0 0 0'}
                                place={'bottom'}
                                delay={400}
                            />
                        </div>
                    </div>
                    <div className="editor-navbar__divider"><span></span></div>
                    <div className="editor-navbar__column editor-navbar__media">
                        <div className="editor-navbar__item">
                            <i data-tooltip-id='tip-bullet-editor' className="fa-solid fa-list"></i>
                            <Tooltip 
                                id="tip-bullet-editor" 
                                description="Bullet list"
                                margin={'0 0 0 0'}
                                place={'bottom'}
                                delay={400}
                            />
                        </div>
                        <div className="editor-navbar__item">
                            <i data-tooltip-id='tip-numbered-editor' className="fa-solid fa-list-ol"></i>
                            <Tooltip 
                                id="tip-numbered-editor" 
                                description="Numbered list"
                                margin={'0 0 0 0'}
                                place={'bottom'}
                                delay={400}
                            />
                        </div>
                        <div className="editor-navbar__item">
                            <i data-tooltip-id='tip-spacing-editor' className="fa-solid fa-line-height"></i>
                            <Tooltip 
                                id="tip-spacing-editor" 
                                description="Line spacing"
                                margin={'0 0 0 0'}
                                place={'bottom'}
                                delay={400}
                            />
                        </div>
                    </div>
                    <div className="editor-navbar__divider"><span></span></div>
                    <div className="editor-navbar__column editor-navbar__media">
                        <div className="editor-navbar__item">
                            <i data-tooltip-id='tip-responsive-editor' className="fa-solid fa-display-code"></i>
                            <Tooltip 
                                id="tip-responsive-editor" 
                                description="Responsive mode"
                                margin={'0 0 0 0'}
                                place={'bottom'}
                                delay={400}
                            />
                        </div>
                    </div>
                    <div className="editor-close" onClick={customHandleEditorClose}>
                        <i className="fa-solid fa-chevron-up"></i>
                    </div>
                </div>
            </div>
            <Publish />
        </>
    );
}

export default EditNavbar;
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEditorContext } from '../../../../contexts/EditorContext';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';

// Layout
import LoadingScreen from '../../../../components/base/loading';
import NotFound from '../../../404';
import Navbar from '../../../../components/layout/navbar';
import EditorNavbar from '../components/EditorNavbar';
import EditorSidebar from '../components/Sidebar/index';

// Utilities
import { handleDrop, handleDragOver } from '../../../../utilities/dragUtils';
import RenderElements from '../../../../utilities/posts/renderElements';

// Layout
import EditStyles from '../components/EditStyles/EditStyles';

// Features
import { fetchSlug, addPostElement, deletePostElement } from '../../../../features/posts/postAction';

// Stylesheets
import '../../../../../public/css/dashboard.css';
import '../../../../../public/css/edit-post.css';

function BlogPostEditor() {
    const {
        notFound,
        selectedElement,
        setSelectedElement,
        errorMessage,
        blogPostMainRef,
        setShowColorPicker,
        imageUrl,
    } = useEditorContext();

    const dispatch = useDispatch();
    const router = useRouter();

    const [loadingState, setLoadingState] = useState(true);
    const { post, postElements, isLoading, error } = useSelector((state) => state.posts.post);
    const { slug } = router.query;

    useEffect(() => {
        const handleLoading = async () => {
            setLoadingState(true);
            try {
                if (slug) {
                    await dispatch(fetchSlug(slug));
                    await new Promise((resolve) => setTimeout(resolve, 500));
                }
            } finally {
                setLoadingState(false);
            }
        };
        handleLoading();
    }, [dispatch, slug]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.key === 'Delete' || event.key === 'Backspace') && selectedElement) {
                const activeElement = document.activeElement;
                const selectedElementNode = document.querySelector(`[data-id="${selectedElement.id}"]`);
                if (selectedElementNode && activeElement === selectedElementNode) {
                    dispatch(deletePostElement(selectedElement.id));
                    setSelectedElement(null);
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedElement, setSelectedElement, dispatch]);

    useEffect(() => {
        const handleClick = (e) => {
            if (!e.target.closest('.fa-palette')) {
                if (!e.target.closest('.edit-styles__color-picker-container')) {
                    setShowColorPicker(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, [setShowColorPicker]);

    const dropFunction = (e) => {
        const newElement = handleDrop(e);
        if (newElement) {
            dispatch(addPostElement(newElement));
        }
    };

    if (loadingState || isLoading) {
        return <LoadingScreen />;
    }

    if (error || errorMessage) {
        return <div className="error-message">{error || errorMessage}</div>;
    }

    return (
        <>
            <div className="blog-post-container">
                {notFound ? (
                    <NotFound />
                ) : (
                    <>
                        <Head>
                            <title>{post?.title}</title>
                        </Head>
                        <Navbar />
                        {post && <EditorNavbar />}
                        <EditorSidebar />
                        <div className="editor-container">
                            <div className="editor">
                                <div className="editor__back">
                                    <Link href="/dashboard/posts">
                                        <i className="fa-solid fa-arrow-left"></i>
                                        <span>Dashboard</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="blog-post-content">
                            <div
                                className="blog-post-main"
                                ref={blogPostMainRef}
                                onDrop={dropFunction}
                                onDragOver={handleDragOver}
                            >
                                <div
                                    className="blog-post-element banner"
                                    tabIndex="0"
                                    onClick={(e) => setSelectedElement(e.currentTarget)}
                                >
                                    {post?.imageUrl && <img src={imageUrl || post?.imageUrl} alt={post?.title} draggable="false" />}
                                </div>
                                <div className="blog-post-main__inner">
                                    <div
                                        className="blog-post-element title"
                                        tabIndex="0"
                                        onClick={(e) => setSelectedElement(e.currentTarget)}
                                    >
                                        <span>{post?.title}</span>
                                    </div>
                                    {postElements && postElements.length > 0 && postElements.map((element) => (
                                        <RenderElements key={element.id} element={element} editor={true} onClick={() => setSelectedElement(element)} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {selectedElement && (
                          <EditStyles
                            title={`Edit List`}
                            elementOptions={['margin', 'size', 'type']} 
                            />
                        )}
                    </>
                )}
            </div>
            <Script async src="https://platform.twitter.com/widgets.js"></Script>
        </>
    );
}

export default BlogPostEditor;

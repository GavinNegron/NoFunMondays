// React/Next.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEditorContext } from '../../../../contexts/EditorContext';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Layout
import LoadingScreen from '../../../components/base/loading';
import NotFound from '../../../404';
import Navbar from '../../../layout/navbar/navbar';
import EditorNavbar from '../components/Nav/nav1';
import EditorSidebar from '../components/Sidebar/sidebar';

// Utilities
import { handleDrop, handleDragOver } from '../../../../utilities/dragUtils';
import { handleBlogPostElement } from '../../../../utilities/posts/postElement/handleBlogPostElement';
import RenderElements from '../../../../utilities/posts/postElement/renderElements';
import { handleDoubleClick } from '../../../../utilities/posts/editor/editorFunctions';

// Layout
import TextStyles from '../components/EditStyles/text-styles';
import ImageStyles from '../components/EditStyles/image-styles';
import ListStyles from '../components/EditStyles/list-styles';
import EmbedStyles from '../components/EditStyles/embed-styles';

// Features
import { fetchSlug, addPostElement, deletePostElement } from '../../../../features/posts/postSlice/fetchSlug';

// Stylesheets
import '../../../../../public/css/dashboard.css'
import '../../../../../public/css/edit-post.css'

function BlogPostEditor() {
    const {
        setPost,
        notFound,
        selectedElement,
        setSelectedElement,
        setElementStyles,
        errorMessage,
        blogPostMainRef,
        setShowColorPicker,
    } = useEditorContext();

    const dispatch = useDispatch();
    const [loadingState, setLoadingState] = useState(true);
    const { postElements, post } = useSelector((state) => state.posts.fetchSlug);
    const router = useRouter();
    const { slug } = router.query;

     useEffect(() => {
        const handleLoading = async () => {
          setLoadingState(true); 
          try {
            if (slug) {
                await dispatch(fetchSlug({ slug, setPost }));
                await new Promise((resolve) => setTimeout(resolve, 500)); 
            }
            } finally {
                setLoadingState(false);
            }
        };
        handleLoading();
      }, [dispatch, slug, setPost]);

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
    }, [selectedElement, setSelectedElement]);

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

    if (loadingState) {
        return (
            <LoadingScreen />
        );
    }
    const dropFunction = (e) => {
      const newElement = handleDrop(e);
      if (newElement) {
          dispatch(addPostElement(newElement));
      }
  };
    return (
        <div className="blog-post-container">
            {notFound ? (
                <NotFound />
            ) : (
                <>
                    <Head>
                        <title>{post?.title}</title>
                        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&family=Sour+Gummy:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
                        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=ubuntu:wght@700;800&family=Libre+Franklin:wght@900&display=swap"></link>
                        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"></link>
                        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:400,700&display=swap" />
                        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
                        <link href="https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@600;700;800;900&family=Ubuntu:wght@700&display=swap" rel="stylesheet"></link>
                        <script defer src="https://code.jquery.com/jquery-3.7.1.min.js" type="module"></script>
                        <script async src="https://kit.fontawesome.com/5ee52856b3.js" crossorigin="anonymous"></script>
                        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                    </Head>
                    <Navbar />
                    <EditorNavbar />
                    <EditorSidebar />
                    <div className="editor-container">
                        <div className="editor">
                            <div className="editor__back">
                                <a href="/dashboard/posts">
                                    <i className="fa-solid fa-arrow-left"></i>
                                    <span>Dashboard</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="blog-post-content">
                        <div
                            className="blog-post-main"
                            ref={blogPostMainRef}
                            onDrop={(e) => dropFunction(e)}
                            onDragOver={handleDragOver}
                        >
                            <div
                                className="blog-post-element blog-post-main__image blog-post-element banner"
                                tabIndex="0"
                                onClick={(e) => handleBlogPostElement(e.currentTarget, setSelectedElement, setElementStyles)}
                            >
                                {post?.imageUrl && <img src={post?.imageUrl} alt={post?.title} draggable="false" />}
                            </div>
                            <div className="blog-post-main__inner">
                                <div
                                    className="blog-post-element blog-post-main__title blog-post-element title"
                                    tabIndex="0"
                                    onClick={(e) => handleBlogPostElement(e.currentTarget, setSelectedElement, setElementStyles)}
                                    onDoubleClick={(e) => handleDoubleClick(e)}
                                >
                                    <span>{post?.title}</span>
                                </div>
                                {postElements && postElements.length > 0 && postElements.map((element) => (
                                    <RenderElements key={element.id} element={element} editor={true} />
                                ))}
                            </div>
                        </div>
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <TextStyles />
                    <ImageStyles />
                    <ListStyles />
                    <EmbedStyles />
                </>
            )}
        </div>
    );
}

export default BlogPostEditor;

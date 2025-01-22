// React
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import $ from 'jquery';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// Layout
import Navbar from '../../layout/navbar/navbar';
import Sidebar from '../../layout/sidebar';

// Components
import NewPost from './components/NewPost/new-post';
import LoadingScreen from '../../components/base/loading'

// Services
import { fetchPosts } from '../../../features/posts/postSlice/fetchPosts';
import { deletePost } from '../../../features/posts/postSlice/deletePost';

// Stylesheets
import '../../../../public/css/dashboard.css'
import '../../../../public/css/posts.css'

function DPosts() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts.fetchPosts);
  const [postLimit, setPostLimit] = useState(5);
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loadingState, setLoadingState] = useState(true); 

  useEffect(() => {
    const handleLoading = async () => {
      setLoadingState(true); 
      try {
        await dispatch(fetchPosts({ limit: postLimit, excludeFeatured: false }));
        await new Promise((resolve) => setTimeout(resolve, 500)); 
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoadingState(false); 
      }
    };
    handleLoading();
  }, [dispatch, postLimit]);
  

  useEffect(() => {
    if (posts.length > 0) {
      setSelectedAll(selectedItems.length === posts.length);
    }
  }, [selectedItems, posts]);

  const handleSelectAll = () => {
    setSelectedAll((prev) => !prev);
    setSelectedItems(!selectedAll ? posts.map((post) => post._id) : []);
  };

  const handleCheckboxChange = (postId) => {
    setSelectedItems((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  const handleLoadMore = () => {
    setPostLimit((prev) => prev + 4);
  };

  const handleDelete = async (postId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this post?');
    if (!isConfirmed) return;

    try {
      await dispatch(deletePost(postId));
      dispatch(fetchPosts({ limit: postLimit }));
    } catch (err) {
      console.log(err)
    }
  };

  const handleNewPost = async () => {
    $("body").css("max-height", "100vh");
    $("body").css("overflow", "hidden");

    $(".new-post").css("display", "flex");
  };

  if(loadingState) {
    return (
      <LoadingScreen/>
    )
  }
  return (
    <>
      <Head>
        <title>Posts</title>
        <script defer src="https://code.jquery.com/jquery-3.7.1.min.js" type="module"></script>
        <script async src="https://kit.fontawesome.com/5ee52856b3.js" crossOrigin="anonymous"></script>
      </Head>
      <div>
        <Navbar />
        <main className="main db">
          <Sidebar />
          <div className="dashboard">
            <div className="dashboard__header">
                <span>Posts</span>
            </div>
            <div className="dashboard__top">
                <div className="dashboard__filters">
                    <div className="dashboard__filters__item">
                        <input type="checkbox" />
                        <span>Featured</span>
                    </div>
                    <span>|</span>
                    <div className="dashboard__filters__item">
                        <span>Status:</span>
                        <select name="status">
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>
                </div>
                <div className="dashboard__new-post">
                    <div className="dashboard__new-post__item">
                        <Link href="#new-post" onClick={handleNewPost}>
                          <i className="fa-solid fa-plus"></i>
                          <span>New Post</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="dashboard__posts">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <input onClick={() => handleSelectAll()} id="selectAll" type="checkbox" />
                            </th>
                            <th className="image">Image</th>
                            <th className="title">Title <i className="fa-solid fa-arrow-up"></i></th>
                            <th className="date">Date</th>
                            <th className="views">Views</th>
                            <th className="status">Status</th>
                            <th className="edit">Edit</th>
                            <th className="delete">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {posts.map((post) => (
              <tr key={post._id}>
                <td>
                  <input
                    className="dashboard__checkbox"
                    type="checkbox"
                    checked={selectedItems.includes(post._id)}
                    onChange={() => handleCheckboxChange(post._id)}
                  />
                </td>
                <td className="dashboard__posts__image">
                  <img 
                    src={post.imageUrl || 'https://via.placeholder.com/150'}
                    alt={post.title || 'Post image'}
                  />
                </td>
                <td className="dashboard__posts__title">{post.title}</td>
                <td className="dashboard__posts__date">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="dashboard__posts__views">{post.views || 0}</td>
                <td className="dashboard__posts__status">
                  <i>{post.status || 'Published'}</i>
                </td>
                <td className="">
                  <div id='edit' className="dashboard__posts__icon">
                    <p>
                      <Link className="dashboard__posts__icon--edit" href={`/dashboard/posts/edit/${post.slug}`}>Edit</Link>
                    </p>
                  </div>
                </td>
                <td className="">
                  <div id='delete' className="dashboard__posts__icon">
                    <p>
                      <Link className="dashboard__posts__icon--delete" href="#delete" onClick={() => handleDelete(post._id)}>
                        Delete
                      </Link>
                    </p>
                  </div>
                </td>
              </tr>
            ))}
                    </tbody>
                </table>
            </div>
            <div className="dashboard__load">
                <button onClick={() => handleLoadMore()} className="fortnite-btn">Load More Posts</button>
            </div>
        </div>
          <NewPost/>
        </main>
      </div>
    </>
  );
}

export default DPosts;
import React, { useEffect, useState } from 'react';
import Navbar from '../../layout/navbar/navbar';
import Sidebar from '../../layout/sidebar/sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../../../features/posts/postSlice/fetchPosts';
import { deletePost } from '../../../features/posts/postSlice/deletePost'; 
import { Helmet } from 'react-helmet-async';
import loading from '../../../utilities/loading'; 
import LoadingScreen from '../../templates/base/loading';
import NewPost from './components/NewPost/new-post';
import $ from 'jquery';

function DPosts() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const [postLimit, setPostLimit] = useState(5);
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loadingState, setLoadingState] = useState(true); 

  useEffect(() => {
    const handleLoading = async () => {
      await Promise.all([loading(['/css/posts.module.css']), new Promise(resolve => setTimeout(resolve, 500))])
      dispatch(fetchPosts({ limit: postLimit, excludeFeatured: false })); 
      setLoadingState(false);
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
    } catch (error) {}
  };

  const handleNewPost = async () => {
    $("body").css("max-height", "100vh");
    $("body").css("overflow", "hidden");

    $(".new-post").css("display", "flex");
  };

  if (loadingState) {
    return <LoadingScreen />; 
  }

  return (
    <>
      <Helmet>
        <title>Posts</title>
      </Helmet>
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
                    <div className="dashboard__filters-item">
                        <input type="checkbox" />
                        <span>Featured</span>
                    </div>
                    <span>|</span>
                    <div className="dashboard__filters-item">
                        <span>Status:</span>
                        <select name="status">
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>
                </div>
                <div className="dashboard__new-post">
                    <div className="dashboard__new-post-item">
                        <a href="#new-post" onClick={() => handleNewPost()}>
                          <i className="fa-solid fa-plus"></i>
                          <span>New Post</span>
                        </a>
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
                  <div id='edit' className="dashboard__posts-icon">
                    <p>
                      <a className="dashboard__posts-icon--edit" href={`/dashboard/posts/edit/${post.slug}`}>Edit</a>
                    </p>
                  </div>
                </td>
                <td className="">
                  <div id='delete' className="dashboard__posts-icon">
                    <p>
                      <a className="dashboard__posts-icon--delete" href="#delete" onClick={() => handleDelete(post._id)}>
                        Delete
                      </a>
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
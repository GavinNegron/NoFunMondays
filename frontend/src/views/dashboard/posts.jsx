import React, { useEffect, useState } from 'react';
import Navbar from '../layout/navbar';
import Footer from '../layout/footer';
import Sidebar from '../layout/sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, deletePost } from '../../features/posts/postSlice';
import { Helmet } from 'react-helmet-async';
import preloadPageResources from '../../utilities/loading'; 
import LoadingScreen from '../templates/base/loading';

function DPosts() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const [postLimit, setPostLimit] = useState(5);
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loadingState, setLoadingState] = useState(true); 

  useEffect(() => {
    const loadResources = async () => {
      const cssFiles = ['/css/dashboard.css'];
      await preloadPageResources(cssFiles); 
      dispatch(fetchPosts({ limit: postLimit, excludeFeatured: false })); 
      setLoadingState(false);
    };
    
    loadResources();
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

  if (loadingState) {
    return <LoadingScreen />; 
  }

  return (
    <>
      <Helmet>
        <title>Posts</title>
        <link rel="stylesheet" href="/css/dashboard.css" />
      </Helmet>
      <div>
        <Navbar />
        <main className="main db">
          <Sidebar />
          <div className="dashboard">
            <div className="dashboard__header">
              <span>Posts</span>
            </div>
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
            <div className="dashboard__posts">
              <table>
                <thead>
                  <tr>
                    <th>
                      <input
                        id="selectAll"
                        type="checkbox"
                        checked={selectedAll}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th className="image">Image</th>
                    <th className="title">
                      Title <i className="fa-solid fa-arrow-up"></i>
                    </th>
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
                      <td className="image">
                        <img
                          src={post.imageUrl || 'https://via.placeholder.com/150'}
                          alt={post.title || 'Post image'}
                          className="dashboard__posts-image"
                        />
                      </td>
                      <td className="title">{post.title}</td>
                      <td className="date">{new Date(post.createdAt).toLocaleDateString()}</td>
                      <td className="views">{post.views || 0}</td>
                      <td className="status">
                        <i>{post.status || 'Published'}</i>
                      </td>
                      <td className="edit">
                        <div className="dashboard__posts__icon">
                          <p id="edit">
                            <a href={`/dashboard/posts/edit/${post.slug}`}>Edit</a>
                          </p>
                        </div>
                      </td>
                      <td className="delete">
                        <div className="dashboard__posts__icon">
                          <p id="delete">
                            <a href="#delete" onClick={() => handleDelete(post._id)}>
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
              <button className="fortnite-btn" onClick={handleLoadMore}>
                Load More Posts
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default DPosts;
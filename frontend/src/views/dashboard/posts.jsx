import React, { useEffect, useState } from 'react';
import Navbar from '../layout/navbar';
import Footer from '../layout/footer';
import Sidebar from '../layout/sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../../features/posts/postSlice';

function DPosts() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const [postLimit, setPostLimit] = useState(4); // Initial post limit
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    dispatch(fetchPosts(postLimit)); // Fetch posts with the current limit
  }, [dispatch, postLimit]);

  useEffect(() => {
    if (posts.length > 0) {
      setSelectedAll(selectedItems.length === posts.length);
    }
  }, [selectedItems, posts]);

  const handleSelectAll = () => {
    setSelectedAll((prev) => !prev);
    setSelectedItems((prev) =>
      !selectedAll ? posts.map((post) => post._id) : []
    );
  };

  const handleCheckboxChange = (postId) => {
    setSelectedItems((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const handleLoadMore = () => {
    setPostLimit((prev) => prev + 4); // Increase post limit by 4
  };

  return (
    <div>
      <link rel="stylesheet" href="/css/dashboard.css"></link>
      <Navbar />
      <main className="main db">
        <Sidebar />
        <div className="dashboard">
          <div className="dashboard__header">
            <span>Posts</span>
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
                  <th>Image</th>
                  <th>Title <i className="fa-solid fa-arrow-up"></i></th>
                  <th>User</th>
                  <th>Date</th>
                  <th>Views</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post._id}>
                    <td>
                      <input
                        className="item"
                        type="checkbox"
                        checked={selectedItems.includes(post._id)}
                        onChange={() => handleCheckboxChange(post._id)}
                      />
                    </td>
                    <td>
                      <img
                        src={post.imageUrl || 'https://via.placeholder.com/150'}
                        alt={post.title || 'Post image'}
                      />
                    </td>
                    <td>{post.title}</td>
                    <td>{post.user || 'Unknown'}</td>
                    <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                    <td>{post.views || 0}</td>
                    <td>
                      <div className="dashboard__posts__icon">
                        <p id="edit">
                          <a href="/">Edit</a>
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="dashboard__posts__icon">
                        <p id="delete">
                          <a href="/">Delete</a>
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="dashboard__load">
            <button className="fortnite__btn" onClick={handleLoadMore}>
              Load More Posts
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default DPosts;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import $ from 'jquery';
import Head from 'next/head';
import Link from 'next/link';

// COMPONENTS
import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';
import NewPost from './components/NewPost/new-post';
import LoadingScreen from '@/components/base/loading';

// FEATURES
import { fetchPosts, deletePost } from '@/features/posts/postAction';

// STYLESHEETS
import '../../../../public/css/dashboard.css';
import '../../../../public/css/posts.css';
import Checkbox from '@/components/base/checkbox/';

function DPosts() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts.post);
  const [postLimit, setPostLimit] = useState(5);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    const handleLoading = async () => {
      setLoadingState(true);
      try {
        await dispatch(fetchPosts({ limit: postLimit, excludeFeatured: false }));
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoadingState(false);
      }
    };
    handleLoading();
  }, [dispatch, postLimit]);

  const handleLoadMore = () => {
    setPostLimit((prev) => prev + 4);
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await dispatch(deletePost(postId));
      dispatch(fetchPosts({ limit: postLimit }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewPost = () => {
    $("body").css({ "max-height": "100vh", overflow: "hidden" });
    $(".new-post").css("display", "flex");
  };

  const filteredPosts = selectedStatus
    ? posts.filter((post) => post?.status === selectedStatus)
    : posts;

  if (loadingState) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Head>
        <title>Posts</title>
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
                  <Checkbox />
                  <span>Featured</span>
                </div>
                <span>|</span>
                <div className="dashboard__filters__item">
                  <span>Status:</span>
                  <select name="status" onChange={(e) => setSelectedStatus(e.target.value)}>
                    <option value="">All</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
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
                      <Checkbox id="selectAll" />
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
                  {filteredPosts
                    .slice()
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((post) => (
                      <tr key={post?._id}>
                        <td>
                          <Checkbox />
                        </td>
                        <td className="dashboard__posts__image">
                          <img
                            src={post?.imageUrl || 'https://via.placeholder.com/150'}
                            alt={post?.title || 'Post image'}
                          />
                        </td>
                        <td className="dashboard__posts__title">{post?.title}</td>
                        <td className="dashboard__posts__date">
                          {new Date(post?.createdAt).toLocaleDateString()}
                        </td>
                        <td className="dashboard__posts__views">{post?.views || 0}</td>
                        <td className="dashboard__posts__status">
                          <i>{post?.status || 'Published'}</i>
                        </td>
                        <td className="">
                          <div id="edit" className="dashboard__posts__icon">
                            <p>
                              <Link
                                className="dashboard__posts__icon--edit"
                                href={`/dashboard/posts/edit/${post?.slug}`}
                              >
                                Edit
                              </Link>
                            </p>
                          </div>
                        </td>
                        <td className="">
                          <div id="delete" className="dashboard__posts__icon">
                            <p>
                              <Link
                                className="dashboard__posts__icon--delete"
                                href="#delete"
                                onClick={() => handleDelete(post?._id)}
                              >
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
              <button onClick={handleLoadMore} className="fortnite-btn">
                Load More Posts
              </button>
            </div>
          </div>
          <NewPost />
        </main>
      </div>
    </>
  );
}

export default DPosts;
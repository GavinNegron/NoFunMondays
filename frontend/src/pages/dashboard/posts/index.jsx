import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { requireAuth } from '@/utilities/requireAuth'

// COMPONENTS
import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';
import NewPost from './components/NewPost/new-post';
import LoadingScreen from '@/components/base/loading';
import Search from '@/components/base/search';

// UTILITIES
import { handleClickOutside } from '@/utilities/editorFunctions';

// FEATURES
import { fetchPosts, deletePost } from '@/features/posts/postAction';

// STYLESHEETS
import '../../../../public/css/dashboard.css';
import '../../../../public/css/posts.css';
import Checkbox from '@/components/base/checkbox/';

function DPosts() {
  const dispatch = useDispatch();
  const [allPosts, setAllPosts] = useState([]);
  const [postLimit, setPostLimit] = useState(5);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [showFeatured, setShowFeatured] = useState(false);
  const [showChallenges, setShowChallenges] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleLoading = async () => {
      setLoadingState(true);
      try {
        const fetchedPosts = await dispatch(fetchPosts({ limit: 1000, excludeFeatured: false }));
        setAllPosts(fetchedPosts.payload || []); // Ensure allPosts is an array
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoadingState(false);
      }
    };
    handleLoading();
  }, [dispatch]);

  useEffect(() => {
    const handleClick = (e) => {
      const confirm = document.querySelector('.dashboard__confirm');
      if (confirm && confirm.contains(e.target)) {
        handleClickOutside(e, '.dashboard__confirm__inner', '.dashboard__confirm');
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const handleLoadMore = async () => {
    const newLimit = postLimit + 4;
    setPostLimit(newLimit);
  };

  const handleDelete = async (postIds) => {
    return new Promise((resolve) => {
      const confirmBox = document.querySelector('.dashboard__confirm');
      confirmBox.style.display = 'flex';

      const confirmButton = confirmBox.querySelector('.dashboard__confirm-button button');
      confirmButton.onclick = async () => {
        confirmBox.style.display = 'none';
        resolve(true);
      };
    }).then(async (confirmed) => {
      if (confirmed) {
        if (Array.isArray(postIds)) {
          for (const postId of postIds) {
            await dispatch(deletePost(postId));
          }
        } else {
          await dispatch(deletePost(postIds));
        }
        const fetchedPosts = await dispatch(fetchPosts({ limit: 1000 })); // Fetch all posts again after deletion
        setAllPosts(fetchedPosts.payload || []);
      }
    });
  };

  const handleNewPost = () => {
    document.body.style.maxHeight = '100vh';
    document.body.style.overflow = 'hidden';
    document.querySelector('.new-post').style.display = 'flex';
  };

  const handleSelectPost = (postId) => {
    setSelectedPosts((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  const fuse = new Fuse(allPosts, {
    keys: ['title'],
    threshold: 0.3,
  });

  const filteredPosts = searchQuery
    ? fuse.search(searchQuery).map(result => result.item)
    : (Array.isArray(allPosts) ? allPosts.filter((post) => {
        if (selectedStatus && post?.status !== selectedStatus) return false;
        if (showFeatured && !post?.featured) return false;
        if (showChallenges && !post?.challenge) return false;
        return true;
      }) : []);

  const sortedPosts = filteredPosts.slice(0, postLimit).sort((a, b) => {
    if (sortConfig.key === 'date') {
      return sortConfig.direction === 'desc'
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortConfig.key === 'views') {
      return sortConfig.direction === 'desc'
        ? b.views - a.views
        : a.views - b.views;
    }
    return 0;
  });

  const handleSortChange = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAllPosts = () => {
    setSelectedPosts(selectedPosts.length === sortedPosts.length ? [] : sortedPosts.map((post) => post._id));
  };

  useEffect(() => {
    const modifySection = document.querySelector('.dashboard__modify');
    if (modifySection) {
      modifySection.style.display = selectedPosts.length > 0 ? 'flex' : 'none';
    }
  }, [selectedPosts]);

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
            <div className="dashboard__confirm">
              <div className="dashboard__confirm__inner">
                <div className="dashboard__confirm-icon">
                  <i className="fa-solid fa-warning"></i>
                </div>
                <div className="dashboard__confirm-header">
                  <span>Delete Confirmation</span>
                </div>
                <div className="dashboard__confirm-button">
                  <button>Confirm</button>
                </div>
              </div>
            </div>
            <div className="dashboard__header no-select">
              <span>Posts</span>
            </div>
            <div className="dashboard__search">
              <Search value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className="dashboard__top no-select">
              <div className="dashboard__filters">
                <div className="dashboard__filters__item">
                  <Checkbox checked={showFeatured} onChange={() => setShowFeatured(!showFeatured)} />
                  <span>Featured</span>
                </div>
                <span>|</span>
                <div className="dashboard__filters__item">
                  <Checkbox checked={showChallenges} onChange={() => setShowChallenges(!showChallenges)} />
                  <span>Challenges</span>
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
                <thead className='no-select'>
                  <tr>
                    <th id="selectAll">
                      <Checkbox
                        checked={selectedPosts.length > 0 && selectedPosts.length === sortedPosts.length}
                        onChange={handleSelectAllPosts}
                      />
                    </th>
                    <th className="image">Image</th>
                    <th className="title">Title</th>
                    <th className="date" onClick={() => handleSortChange('date')}>Date</th>
                    <th className="views" onClick={() => handleSortChange('views')}>Views</th>
                    <th className="status">Status</th>
                    <th className="edit">Edit</th>
                    <th className="delete">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPosts.map((post) => (
                    <tr key={post?._id}>
                      <td>
                        <Checkbox
                          checked={selectedPosts.includes(post._id)}
                          onChange={() => handleSelectPost(post._id)}
                        />
                      </td>
                      <td className="dashboard__posts__image no-select">
                        <a href={`/dashboard/posts/edit/${post?.slug}`}>
                          <img
                            src={post?.imageUrl || 'https://via.placeholder.com/150'}
                            alt={post?.title || 'Post image'}
                          />
                        </a>
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
            <div className="dashboard__modify">
              <div className="dashboard__modify__header">
                <span>Bulk Editing: </span>
              </div>
              <div className="dashboard__modify__buttons">
                <div className="dashboard__modify-item">
                  <button onClick={() => handleDelete(selectedPosts)}>Delete Selected</button>
                </div>
                <div className="dashboard__modify-item">
                  <button>Archive Selected</button>
                </div>
              </div>
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

export async function getServerSideProps(context) {
  return requireAuth(context)
}
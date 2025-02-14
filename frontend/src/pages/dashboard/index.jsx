// REACT
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { format, subDays } from 'date-fns';

// COMPONENTS
import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';
import LoadingScreen from '@/components/base/loading';
import ViewsChart from '@/components/analytics/ViewsChart';
import StatBox from '@/components/analytics/StatBox';

// FEATURES
import { fetchPostViews } from '@/features/posts/postAction';

// STYLESHEETS
import '../../../public/css/dashboard.css';

function Dashboard() {
  const dispatch = useDispatch();
  const { views } = useSelector((state) => state.posts.post);
  const [loadingState, setLoadingState] = useState(true);
  useEffect(() => {
    const handleLoading = async () => {
      setLoadingState(true);
      try {
        await dispatch(fetchPostViews({ days: '7' }));
      } catch (error) {
        console.error('Failed to fetch views:', error);
      } finally {
        setLoadingState(false);
      }
    };
    handleLoading();
  }, [dispatch]);

  if (loadingState) {
    return <LoadingScreen />;
  }

  const today = format(new Date(), 'yyyy-MM-dd'); 
  const todayViews = views.result.find(view => view._id === today)?.totalViews || 0;
  const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd');
  const yesterdayViews = views.result.find(view => view._id === yesterday)?.totalViews || 0;
  let viewChange = yesterdayViews === 0 
  ? todayViews > 0 ? '+100' : '0' 
  : ((todayViews - yesterdayViews) / yesterdayViews * 100).toFixed(2);

  viewChange = viewChange > 0 ? `+${viewChange}%` : `${viewChange}%`;

  const data = views.result.map(view => ({
    date: format(new Date(view._id), 'MMM d'),
    views: view.totalViews
  }));
  

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Navbar />
      <main className="main db">
        <Sidebar />
        <div className="dashboard">
          <div className="dashboard__header">
            <span>Dashboard</span>
          </div>
          <div className="dashboard__grid d-flex">
            <div className="dashboard__grid-views dashboard__grid-item">
              <div className="dashboard__grid-item__header">
                <span>Weekly Views</span>
              </div>
              <ViewsChart data={data} />
            </div>
            <StatBox 
              icon='fa-solid fa-eye'
              header='Daily Views'
              value={todayViews}
              change={viewChange}
              bgColor='#7175d224'
              color='#636af9'
            />
            <StatBox 
              icon='fa-solid fa-heart'
              header='Daily Likes'
              value={todayViews}
              change={viewChange}
              bgColor='#af71d224'
              color='#9d6fff'
            />
             <StatBox 
              icon='fa-solid fa-comment'
              header='Daily Comments'
              value={todayViews}
              change={viewChange}
              bgColor='#53caff24'
              color='#41a2e3'
            />
            <StatBox 
              icon='fa-solid fa-share'
              header='Daily Shares'
              value={todayViews}
              change={viewChange}
              bgColor='#73d9d424'
              color='#4ad89c'
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
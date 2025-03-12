import React, { useState } from 'react';
import Head from 'next/head';
import { requireAuth } from '@/utilities/requireAuth'

// COMPONENTS
import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';

// STYLESHEETS
import '../../../../public/css/dashboard.css';
import '../../../../public/css/messages.css';

function Messages() {
  const [activeTab, setActiveTab] = useState('#inbox');

  return (
    <>
      <Head>
        <title>Messages</title>
      </Head>
      <Navbar />
      <main className="main db">
        <Sidebar />
        <div className="dashboard">
          <div className="dashboard__header no-select">
            <span>Messages</span>
          </div>
          <div className="messages">
            <div className="messages__nav">
              <div className="messages__nav__select">
                <select name="email" id="email">
                  <option value="contact-1">Contact Form Messages</option>
                  <option value="contact-2">gavinnegron@nofunmondays.com</option>
                  <option value="contact-3">contact@nofunmondays.com</option>
                </select>
              </div>
              <div className="messages__nav__compose">
                <button>Send Message</button>
              </div>
              <div className="messages__nav__links">
                {[
                  { id: '#inbox', icon: 'fa-inbox', label: 'Inbox' },
                  { id: '#important', icon: 'fa-star', label: 'Important' },
                  { id: '#sent', icon: 'fa-paper-plane-top', label: 'Sent' },
                  { id: '#spam', icon: 'fa-circle-exclamation', label: 'Spam' },
                  { id: '#trash', icon: 'fa-trash-xmark', label: 'Trash' }
                ].map((item) => (
                  <a
                    key={item.id}
                    href={item.id}
                    className={`messages__nav__links-item ${activeTab === item.id ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(item.id);
                    }}
                  >
                    <i className={`fa-solid ${item.icon}`}></i>
                    <p>{item.label}</p>
                  </a>
                ))}
              </div>
            </div>
            <div className="messages__inbox"></div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Messages;

export async function getServerSideProps(context) {
  const authResult = await requireAuth(context);
  if (authResult.redirect) return authResult;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/messages?limit=5`);
    const data = await res.json();

    return {
      props: {
        ...authResult.props, 
        messages: data || [],
      },
    };
  } catch (error) {
    return {
      props: {
        ...authResult.props,
        messages: [],
      },
    };
  }
}
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

function Sidebar() {
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth <= 1109);

  useEffect(() => {
    const handleResize = () => {
      setSidebarCollapsed(window.innerWidth <= 1109);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('SidebarActive', sidebarCollapsed);
  }, [sidebarCollapsed]);

  const toggleSidebarState = () => {
    setSidebarCollapsed(prevState => !prevState);
  };

  const links = [
    { text: "Dashboard", href: "/dashboard", iconName: "chart-line" },
    { text: "Posts", href: "/dashboard/posts", iconName: "newspaper" },
    { text: "Users", href: "/dashboard/users", iconName: "users-gear" },
    { text: "Messages", href: "/dashboard/messages", iconName: "fas fa-envelope" },
    { text: "Logs", href: "/dashboard/logs", iconName: "fas fa-file-lines" },
    { text: "Settings", href: "/dashboard/settings", iconName: "gear" },
  ];

  return (
    <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar__top d-flex align-items-center">
        <div className="sidebar__top-logo">
          <Link href="/" draggable="false" className="sidebar__top-logo-name">Admin Dashboard</Link>
          <div className="sidebar__top-logo-img">
            <img src="/images/placeholder.png" alt="Placeholder Logo" />
          </div>
        </div>
        <div className="sidebar__top-arrow" onClick={toggleSidebarState}>
          <i className={`fa-solid ${sidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`} style={{ color: "#ffffff" }}></i>
        </div>
      </div>

      <div className="sidebar__profile">
        <div className="sidebar__profile-icon">
          <img src="/images/user.jpeg" draggable="false" alt="User Profile" />
        </div>
        <div className="d-flex flex-column">
          <span className="sidebar__profile-name">Gavin Negron</span>
          <span className="sidebar__profile-email">gavinnegron@icloud.com</span>
        </div>
      </div>

      <div className="sidebar__links">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`sidebar__links-item ${router.pathname === link.href ? "active" : ""}`}
            draggable="false"
          >
            <div className="sidebar__links-item-icon">
              <i className={`fa-solid fa-${link.iconName}`} style={{ color: "#ffffff" }}></i>
            </div>
            <div className="sidebar__links-item-text">
              {link.text}
            </div>
          </Link>
        ))}
      </div>

      <div className="sidebar__bottom d-flex align-items-center flex-column">
        <span className="sidebar__links-line"></span>
        <div className="sidebar__links-item">
          <div className="sidebar__links-item-icon">
            <i className="fa-solid fa-right-from-bracket" style={{ color: "#ffffff" }}></i>
          </div>
          <div className="sidebar__links-item-text">
            <Link href="/" draggable="false">Logout</Link>
          </div>
        </div>
        <div className="sidebar__links-item toggle">
          <div className="sidebar__links-item-icon">
            <i className="fa-solid fa-moon" style={{ color: "#ffffff" }}></i>
          </div>
          <div className="sidebar__links-item-text">
            <span>Theme</span>
          </div>
          <div className="sidebar__links-item-toggle">
            <i className="fa-solid fa-2xl fa-toggle-on" style={{ color: "#ffffff" }}></i>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
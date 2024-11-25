import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith("/dashboard")) {
      const script = document.createElement("script");
      script.src = "/js/app/dashboard.js";
      script.async = true;
      script.type = "module";  
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [location.pathname]);  

  const toggleSidebarState = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const links = [
    { text: "Dashboard", href: "/dashboard", iconName: "chart-simple" },
    { text: "Posts", href: "/dashboard/posts", iconName: "newspaper" },
    { text: "Users", href: "/dashboard/users", iconName: "users-gear" },
    { text: "Notifications", href: "/dashboard/notifications", iconName: "bell" },
    { text: "Tasks", href: "/dashboard/tasks", iconName: "clipboard-list" },
    { text: "Settings", href: "/dashboard/settings", iconName: "gear" },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    window.location.href = href; // Force a full page reload
  };

  return (
    <>
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar__top d-flex align-items-center">
          <div className="sidebar__top-logo">
            <a href="/" draggable="false" className="sidebar__top-logo-name">Admin Dashboard</a>
            <div className="sidebar__top-logo-img">
              <img src="/img/placeholder.png" alt="Placeholder Logo" />
            </div>
          </div>
          <div className="sidebar__top-arrow" onClick={toggleSidebarState}>
            <i className="fa-solid fa-chevron-left" style={{ color: "#ffffff" }}></i>
          </div>
        </div>

        <div className="sidebar__profile">
          <div className="sidebar__profile-icon">
            <img src="/img/user.jpeg" draggable="false" alt="User Profile" />
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
              to={link.href}
              className={`sidebar__links-item ${location.pathname === link.href ? "active" : ""}`}
              draggable="false"
              onClick={(e) => handleLinkClick(e, link.href)} // Prevent React Router and force reload
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
              <a href="/" draggable="false">Logout</a>
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
    </>
  );
}

export default Sidebar;
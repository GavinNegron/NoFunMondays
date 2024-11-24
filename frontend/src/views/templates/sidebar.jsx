import React from 'react';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__top d-flex align-items-center">
        <div className="sidebar__top-logo">
          <a href="/" draggable="false" className="sidebar__top-logo-name">Admin Dashboard</a>
          <div className="sidebar__top-logo-img">
            <img src="/img/placeholder.png" alt="Placeholder Logo" />
          </div>
        </div>
        <div className="sidebar__top-arrow">
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
        {[
          { text: "Dashboard", href: "/dashboard", iconName: "chart-simple" },
          { text: "Posts", href: "/dashboard/posts", iconName: "newspaper" },
          { text: "Users", href: "/dashboard/users", iconName: "users-gear" },
          { text: "Notifications", href: "/dashboard/notifications", iconName: "bell" },
          { text: "Tasks", href: "/dashboard/tasks", iconName: "clipboard-list" },
          { text: "Settings", href: "/dashboard/settings", iconName: "gear" },
        ].map((link, index) => (
          <div key={index} className={`sidebar__links-item ${index === 0 ? "active" : ""}`}>
            <div className="sidebar__links-item-icon">
              <i className={`fa-solid fa-${link.iconName}`} style={{ color: "#ffffff" }}></i>
            </div>
            <div className="sidebar__links-item-text">
              <a href={link.href} draggable="false">{link.text}</a>
            </div>
          </div>
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
  );
}

export default Sidebar;

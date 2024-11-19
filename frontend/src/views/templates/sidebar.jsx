import React from 'react';

function Sidebar() {
  return (
    <>
      <link rel="stylesheet" href="/css/dashboard.css"></link>
      <aside className="sidebar">
        <div className="sidebar__top d-flex align-items-center">
          <div className="sidebar__top-logo">
            <div className="sidebar__top-logo-name">
              <a href="/" draggable="false">PLACEHOLDER</a>
            </div>
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
            <div className="sidebar__profile-icon-img">
              <img src="/img/user.jpeg" draggable="false" alt="User Profile" />
            </div>
          </div>
          <div className="d-flex flex-column">
            <div className="sidebar__profile-name">
              <span>Gavin Negron</span>
            </div>
            <div className="sidebar__profile-email">
              <span>gavinnegron@icloud.com</span>
            </div>
          </div>
        </div>
        <div className="sidebar__links">
          <div className="d-flex align-items-center flex-column">
            <div className="sidebar__links-item active">
              <div className="sidebar__links-item-icon">
                <i className="fa-solid fa-objects-column" style={{ color: "#ffffff" }}></i>
              </div>
              <div className="sidebar__links-item-text">
                <a href="/" draggable="false">Dashboard</a>
              </div>
            </div>
            <div className="sidebar__links-item">
              <div className="sidebar__links-item-icon">
                <i className="fa-solid fa-calendar-days" style={{ color: "#ffffff" }}></i>
              </div>
              <div className="sidebar__links-item-text">
                <a href="/" draggable="false">Calendar</a>
              </div>
            </div>
            <div className="sidebar__links-item">
              <div className="sidebar__links-item-icon">
                <i className="fa-solid fa-users" style={{ color: "#ffffff" }}></i>
              </div>
              <div className="sidebar__links-item-text">
                <a href="/" draggable="false">Community</a>
              </div>
            </div>
            <div className="sidebar__links-item">
              <div className="sidebar__links-item-icon">
                <i className="fa-solid fa-bell" style={{ color: "#ffffff" }}></i>
              </div>
              <div className="sidebar__links-item-text">
                <a href="/" draggable="false">Notifications</a>
              </div>
            </div>
            <div className="sidebar__links-item">
              <div className="sidebar__links-item-icon">
                <i className="fa-solid fa-circle-info" style={{ color: "#ffffff" }}></i>
              </div>
              <div className="sidebar__links-item-text">
                <a href="/" draggable="false">Support</a>
              </div>
            </div>
            <div className="sidebar__links-item">
              <div className="sidebar__links-item-icon">
                <i className="fa-solid fa-gear" style={{ color: "#ffffff" }}></i>
              </div>
              <div className="sidebar__links-item-text">
                <a href="/" draggable="false">Settings</a>
              </div>
            </div>
          </div>
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

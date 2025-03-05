import React from 'react';
import { FaCalendarCheck, FaChartLine, FaComments, FaBell } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FaCalendarCheck />
          </div>
          <div className="stat-content">
            <h3>Scheduled Posts</h3>
            <p className="stat-value">12</p>
            <p className="stat-description">Next post in 2 hours</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaChartLine />
          </div>
          <div className="stat-content">
            <h3>Engagement</h3>
            <p className="stat-value">+24%</p>
            <p className="stat-description">Compared to last week</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaComments />
          </div>
          <div className="stat-content">
            <h3>Unread Messages</h3>
            <p className="stat-value">8</p>
            <p className="stat-description">Across 3 platforms</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaBell />
          </div>
          <div className="stat-content">
            <h3>Notifications</h3>
            <p className="stat-value">3</p>
            <p className="stat-description">2 require attention</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-sections">
        <div className="upcoming-posts">
          <h2>Upcoming Posts</h2>
          <div className="post-list">
            <div className="post-item">
              <div className="post-platform instagram">Instagram</div>
              <div className="post-details">
                <h4>Summer Collection Announcement</h4>
                <p>Scheduled for: Today, 2:00 PM</p>
              </div>
              <div className="post-actions">
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </div>
            
            <div className="post-item">
              <div className="post-platform linkedin">LinkedIn</div>
              <div className="post-details">
                <h4>Industry Trends Article</h4>
                <p>Scheduled for: Tomorrow, 10:00 AM</p>
              </div>
              <div className="post-actions">
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </div>
            
            <div className="post-item">
              <div className="post-platform whatsapp">WhatsApp</div>
              <div className="post-details">
                <h4>Customer Promotion</h4>
                <p>Scheduled for: Jun 18, 9:00 AM</p>
              </div>
              <div className="post-actions">
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-time">10:23 AM</div>
              <div className="activity-content">
                <strong>Instagram:</strong> New comment on your post
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-time">Yesterday</div>
              <div className="activity-content">
                <strong>LinkedIn:</strong> 5 new post reactions
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-time">Yesterday</div>
              <div className="activity-content">
                <strong>WhatsApp:</strong> 3 new customer inquiries
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-time">Jun 15</div>
              <div className="activity-content">
                <strong>System:</strong> Weekly analytics report generated
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
import React, { useContext } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { FaCalendarCheck, FaChartLine, FaComments, FaBell, FaInstagram, FaLinkedin, FaWhatsapp, FaFacebook, FaTwitter } from 'react-icons/fa';
import { PostContext } from '../context/PostContext';
import moment from 'moment';

const Dashboard = () => {
  const { posts } = useContext(PostContext);
  
  // Sort posts by date to get the upcoming ones
  const upcomingPosts = [...posts]
    .filter(post => new Date(post.start) > new Date())
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, 5); // Show only next 5 posts
  
  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'instagram': return <FaInstagram color="#E1306C" />;
      case 'linkedin': return <FaLinkedin color="#0077B5" />;
      case 'whatsapp': return <FaWhatsapp color="#25D366" />;
      case 'facebook': return <FaFacebook color="#1877F2" />;
      case 'twitter': return <FaTwitter color="#1DA1F2" />;
      default: return null;
    }
  };

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
            <p className="stat-value">{posts.length || 0}</p>
            <p className="stat-description">
              {upcomingPosts.length > 0 
                ? `Next post in ${moment(upcomingPosts[0].start).fromNow()}`
                : 'No upcoming posts'}
            </p>
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
        {/* New Upcoming Posts Section with Material-UI */}
        <div className="upcoming-posts">
          <h2>Upcoming Posts</h2>
          
          {upcomingPosts.length > 0 ? (
            <div className="post-list">
              {upcomingPosts.map(post => (
                <div className="post-item" key={post.id}>
                  <div className={`post-platform ${post.platform}`}>
                    {getPlatformIcon(post.platform)}
                    {post.platform.charAt(0).toUpperCase() + post.platform.slice(1)}
                  </div>
                  <div className="post-details">
                    <h4>{post.title}</h4>
                    <p>Scheduled for: {moment(post.start).format('MMM D, h:mm A')}</p>
                  </div>
                  <div className="post-actions">
                    <button onClick={() => window.location.href = '/calendar'}>View</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-posts">
              <p>No upcoming posts scheduled</p>
              <button onClick={() => window.location.href = '/calendar'}>Schedule a Post</button>
            </div>
          )}
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
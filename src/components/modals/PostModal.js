import React, { useState, useEffect } from 'react';
import { FaInstagram, FaLinkedin, FaWhatsapp, FaFacebook, FaTwitter, FaImage, FaTimes } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './PostModal.css';

const PostModal = ({ event, onClose, onSave, slotInfo }) => {
  const [postData, setPostData] = useState({
    id: null,
    title: '',
    platform: 'instagram',
    content: '',
    media: '',
    start: null,
    end: null,
    mediaPreview: null
  });

  useEffect(() => {
    if (event) {
      setPostData({
        id: event.id,
        title: event.title,
        platform: event.platform,
        content: event.content,
        media: event.media,
        start: event.start,
        end: event.end,
        mediaPreview: event.media
      });
    } else if (slotInfo) {
      setPostData({
        ...postData,
        id: Date.now(), // Generate a temporary ID
        start: slotInfo.start,
        end: slotInfo.end
      });
    }
  }, [event, slotInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleDateChange = (date) => {
    // Create a new date with the same time
    const newStart = new Date(date);
    newStart.setHours(
      postData.start ? postData.start.getHours() : new Date().getHours(),
      postData.start ? postData.start.getMinutes() : new Date().getMinutes()
    );
    
    // End time is 1 hour after start by default
    const newEnd = new Date(newStart);
    newEnd.setHours(newStart.getHours() + 1);
    
    setPostData({
      ...postData,
      start: newStart,
      end: newEnd
    });
  };

  const handleTimeChange = (time) => {
    const newStart = new Date(postData.start);
    newStart.setHours(time.getHours(), time.getMinutes());
    
    const newEnd = new Date(newStart);
    newEnd.setHours(newStart.getHours() + 1);
    
    setPostData({
      ...postData,
      start: newStart,
      end: newEnd
    });
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostData({
          ...postData,
          media: reader.result,
          mediaPreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeMedia = () => {
    setPostData({
      ...postData,
      media: '',
      mediaPreview: null
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Make sure we have all required data properly formatted
    const formattedPost = {
      ...postData,
      // If this is a new post and no ID was set, create one
      id: postData.id || Date.now().toString(),
      // Make sure start and end dates are properly set
      start: postData.start || new Date(),
      end: postData.end || new Date(new Date().setHours(new Date().getHours() + 1))
    };
    
    onSave(formattedPost);
  };

  return (
    <div className="modal-overlay">
      <div className="post-modal">
        <div className="modal-header">
          <h2>{event ? 'Edit Post' : 'Create New Post'}</h2>
          <button className="close-modal" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={postData.title}
              onChange={handleChange}
              placeholder="Enter post title"
              required
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label>Platform</label>
            <div className="platform-selector">
              <button
                type="button"
                className={`platform-btn ${postData.platform === 'instagram' ? 'active' : ''}`}
                onClick={() => setPostData({ ...postData, platform: 'instagram' })}
              >
                <FaInstagram /> Instagram
              </button>
              <button
                type="button"
                className={`platform-btn ${postData.platform === 'linkedin' ? 'active' : ''}`}
                onClick={() => setPostData({ ...postData, platform: 'linkedin' })}
              >
                <FaLinkedin /> LinkedIn
              </button>
              <button
                type="button"
                className={`platform-btn ${postData.platform === 'whatsapp' ? 'active' : ''}`}
                onClick={() => setPostData({ ...postData, platform: 'whatsapp' })}
              >
                <FaWhatsapp /> WhatsApp
              </button>
              <button
                type="button"
                className={`platform-btn ${postData.platform === 'facebook' ? 'active' : ''}`}
                onClick={() => setPostData({ ...postData, platform: 'facebook' })}
              >
                <FaFacebook /> Facebook
              </button>
              <button
                type="button"
                className={`platform-btn ${postData.platform === 'twitter' ? 'active' : ''}`}
                onClick={() => setPostData({ ...postData, platform: 'twitter' })}
              >
                <FaTwitter /> Twitter
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label>Content</label>
            <textarea
              name="content"
              value={postData.content}
              onChange={handleChange}
              placeholder="Write your post content here..."
              className="form-control post-textarea"
              rows={5}
            />
          </div>
          
          <div className="form-group">
            <label>Media</label>
            <div className="media-upload-container">
              <label className="media-upload-btn">
                <FaImage /> Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMediaChange}
                  style={{ display: 'none' }}
                />
              </label>
              
              {postData.mediaPreview && (
                <div className="media-preview">
                  <img src={postData.mediaPreview} alt="Preview" />
                  <button 
                    type="button" 
                    className="remove-media-btn"
                    onClick={removeMedia}
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="form-group datetime-group">
            <div className="date-picker-container">
              <label>Date</label>
              <DatePicker
                selected={postData.start}
                onChange={handleDateChange}
                dateFormat="MMMM d, yyyy"
                className="form-control"
                required
              />
            </div>
            
            <div className="time-picker-container">
              <label>Time</label>
              <DatePicker
                selected={postData.start}
                onChange={handleTimeChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="form-control"
                required
              />
            </div>
          </div>
          
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-save">
              {event ? 'Update Post' : 'Schedule Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostModal; 
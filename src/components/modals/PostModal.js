import React, { useState, useEffect } from 'react';
import { FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const PostModal = ({ event, onClose, onSave, slotInfo }) => {
  const [postData, setPostData] = useState({
    title: '',
    platform: 'instagram',
    content: '',
    media: '',
    start: null,
    end: null
  });

  useEffect(() => {
    if (event) {
      setPostData({
        title: event.title,
        platform: event.platform,
        content: event.content,
        media: event.media,
        start: event.start,
        end: event.end
      });
    } else if (slotInfo) {
      setPostData({
        ...postData,
        start: slotInfo.start,
        end: slotInfo.end
      });
    }
  }, [event, slotInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(postData);
  };

  return (
    <div className="modal-overlay">
      <div className="post-modal">
        <h2>{event ? 'Edit Post' : 'Create New Post'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={postData.title}
              onChange={handleChange}
              required
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
            </div>
          </div>
          
          <div className="form-group">
            <label>Content</label>
            <textarea
              name="content"
              value={postData.content}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label>Media URL (optional)</label>
            <input
              type="text"
              name="media"
              value={postData.media || ''}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>Scheduled Time</label>
            <div className="datetime-display">
              {postData.start && new Date(postData.start).toLocaleString()}
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
import React, { createContext, useState, useEffect } from 'react';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to add a new post
  const addPost = (newPost) => {
    setPosts([...posts, { ...newPost, id: Date.now().toString() }]);
  };

  // Function to update an existing post
  const updatePost = (updatedPost) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
  };

  // Function to delete a post
  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <PostContext.Provider value={{ posts, loading, error, addPost, updatePost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider; 
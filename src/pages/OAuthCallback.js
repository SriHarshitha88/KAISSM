// src/pages/OAuthCallback.js
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const OAuthCallback = () => {
  const location = useLocation();

  useEffect(() => {
    // The URL will look like: http://localhost:3000/oauth/callback?code=<AUTH_CODE>
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');

    if (code) {
      exchangeCodeForToken(code);
    }
  }, [location]);

  const exchangeCodeForToken = async (code) => {
    try {
      // For Instagram Basic Display API, you need your server to handle the exchange
      // because Instagram requires a client secret. If you're doing this purely front-end,
      // you may need a proxy or back-end service. For demonstration, I'll show a simple approach:
      const response = await axios.get(
        `http://localhost:5000/api/instagram/token?code=${code}`
      );
      // Store the token in local storage or context
      console.log('Access Token:', response.data.access_token);
    } catch (err) {
      console.error('Error exchanging code for token:', err);
    }
  };

  return (
    <div>
      <h2>Authenticating...</h2>
      {/* Display a loading spinner or progress bar if desired */}
    </div>
  );
};

export default OAuthCallback;
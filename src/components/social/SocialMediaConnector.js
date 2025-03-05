// src/components/social/SocialMediaConnector.js
import React from 'react';
import { Button } from '@mui/material';

const SocialMediaConnector = () => {
  const handleInstagramLogin = () => {
    const clientId = process.env.REACT_APP_IG_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_IG_REDIRECT_URI;
    const scope = 'user_profile,user_media'; // adjust scope as needed
    const responseType = 'code';

    const authUrl = `https://api.instagram.com/oauth/authorize
      ?client_id=${clientId}
      &redirect_uri=${redirectUri}
      &scope=${scope}
      &response_type=${responseType}`.replace(/\s+/g, '');

    window.location.href = authUrl;
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleInstagramLogin}>
        Connect Instagram
      </Button>
    </div>
  );
};

export default SocialMediaConnector;
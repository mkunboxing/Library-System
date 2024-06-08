// GoogleLoginButton.js
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { useUser } from './UserContext';

const GoogleLoginButton = () => {
  const { setUser } = useUser();

  const responseGoogle = async (response) => {
    try {
      const res = await axios.post('/auth/google-login', { tokenId: response.tokenId });
      setUser(res.data.user);
      // Redirect or perform any other action upon successful login
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  return (
    <GoogleLogin
      clientId="886423142119-nifdaobeo3efcf4v6ptnkpcovqrj8e2s.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle} // You can handle failure separately
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginButton;

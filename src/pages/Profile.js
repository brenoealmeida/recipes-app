import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from '../components/Header/Header';

function Profile() {
  const [emailLocalStorage, setEmailLocalStorage] = useState('');
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem('user')) || '';
    setEmailLocalStorage(email.email);
  }, []);

  return (
    <div>
      <Header />
      <Box
        sx={ {
          mt: 15,
        } }
      >
        <p data-testid="profile-email">{ emailLocalStorage }</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes

        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logout }
        >
          Logout
        </button>
      </Box>

    </div>
  );
}

export default Profile;

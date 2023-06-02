import React, { useContext } from 'react';
import Proptypes from 'prop-types';
import { Icon } from '@mui/material';
import { useHistory } from 'react-router-dom';
import searchIcon from '../../../images/searchIcon.svg';
import profileIcon from '../../../images/profileIcon.svg';
import AppContext from '../../../context/AppContext';

function IconAlt({ icon }) {
  const history = useHistory();
  const {
    toggleSearchInput,
    setToggleSearchInput,
    searchBarClassName,
    setSearchBarClassName,
  } = useContext(AppContext);

  const onClickCllbk = () => {
    const time = 200;
    setSearchBarClassName((
      (searchBarClassName === 'search-input-bar') && (toggleSearchInput))
      ? 'search-input-bar-leaving'
      : 'search-input-bar');
    setTimeout(() => {
      setToggleSearchInput(!toggleSearchInput);
    }, time);
  };

  switch (icon) {
  case 'Profile':
    return (
      <Icon
        aria-label="profile"
        sx={ { margin: 2, textAlign: 'center' } }
        onClick={ () => {
          history.push('/profile');
        } }
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          style={ { height: '100%' } }
          alt="profile-icon"
        />
      </Icon>
    );
  case 'Search':
    return (
      <Icon
        aria-label="search"
        sx={ { margin: 2, textAlign: 'center' } }
        onClick={ onClickCllbk }
      >
        <img
          data-testid="search-top-btn"
          src={ searchIcon }
          style={ { height: '100%' } }
          alt="search-icon"
        />
      </Icon>
    );
  default:
  }
}

IconAlt.propTypes = {
  icon: Proptypes.string.isRequired,
};

export default IconAlt;

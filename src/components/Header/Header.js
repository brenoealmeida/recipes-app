import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Grid,
  Toolbar,
  Box,
  Typography,
} from '@mui/material';
import AppContext from '../../context/AppContext';
import HeaderStyled from './Header.styled';
import TextFieldAlt from './components/TextField/TextField';
import IconAlt from './components/IconAlt';
import SearchBar from './components/SearchBar/SearchBar';

const getPageTitle = (location) => {
  switch (location) {
  case '/meals':
    return 'Meals';
  case '/drinks':
    return 'Drinks';
  case '/profile':
    return 'Profile';
  case '/done-recipes':
    return 'Done Recipes';
  case '/favorite-recipes':
    return 'Favorite Recipes';
  default:
  }
};

function Header() {
  const { pathname } = useLocation();
  const { toggleSearchInput, searchBarClassName } = useContext(AppContext);

  return (
    <HeaderStyled
      data-testid="header-styled"
    >
      <Grid
        container
        sx={ {
          alignItems: 'center',
          display: {
            width: '100%',
            justifyContent: 'flex-end',
            alignContent: 'center',
            flexDirection: 'row-reverse',
            flexWrap: 'nowrap',
            marginRight: 25,
            marginLeft: 20,
            xs: 'flex',
            md: 'flex',
          },
        } }
      >
        <Grid
          alignContent="center"
          sx={ { display: 'inline-flex' } }
        >
          <Typography
            data-testid="page-title"
            sx={ {
              fontWeight: 'bold',
              fontSize: 25,
              color: 'gray',
              width: '23%',
              height: '70%',
            } }
          >
            { `${getPageTitle(pathname)}` }
          </Typography>
        </Grid>
        <Toolbar
          justifyContent="flex-end"
          flexWrap="wrap"
          sx={ { width: '75%' } }
        >
          <Box
            alignItems="center"
            sx={ {
              flexGrow: 1,
              display: {
                xs: 'flex',
                md: 'flex',
              },
            } }
          >
            <IconAlt icon="Profile" />
            {
              ((pathname === '/meals') || (pathname === '/drinks')
                ? <IconAlt icon="Search" />
                : null
              )
            }
            {
              toggleSearchInput
                ? (
                  <Box
                    sx={ { display: 'inline-flex', alignItems: 'center' } }
                    className={ searchBarClassName }
                    id="search-input-bar"
                  >
                    <TextFieldAlt />
                    <SearchBar />
                  </Box>
                )
                : null
            }
          </Box>
        </Toolbar>
      </Grid>
    </HeaderStyled>
  );
}

export default Header;

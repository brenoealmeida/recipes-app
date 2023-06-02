import React /* , { useContext } */ from 'react';
import {
  Box,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material';
/* import AppContext from '../../../../context/AppContext'; */

function SearchBar() {
  return (
    <Box
      m={ 2 }
    >
      <RadioGroup
        row
        data-testid="search-bar"
      >
        <FormControlLabel
          size="small"
          data-testid="ingredient-search-radio"
          className="radio-input"
          control={ <Radio size="small" /> }
          label="Ingredient"
          value="Ingredient"
          labelPlacement="end"
        />
        <FormControlLabel
          data-testid="name-search-radio"
          className="radio-input"
          control={ <Radio size="small" /> }
          label="Name"
          value="Name"
          labelPlacement="end"
        />
        <FormControlLabel
          data-testid="first-letter-search-radio"
          className="radio-input"
          control={ <Radio size="small" /> }
          label="First Letter"
          value="First Letter"
          labelPlacement="end"
        />
      </RadioGroup>
      <Button
        data-testid="exec-search-btn"
      >
        Exec search
      </Button>
    </Box>
  );
}

export default SearchBar;

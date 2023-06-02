import styled from 'styled-components';
import { AppBar } from '@mui/material';

const HeaderStyled = styled(AppBar)`
  position: static;
  background-color: #cbcbcb !important;
  height: 10vh;  
  min-height: 3em !important;
  flex-direction: row !important;
  justify-content: flex-end !important;
  align-items: center !important;
  width: 100% !important;
`;

export default HeaderStyled;

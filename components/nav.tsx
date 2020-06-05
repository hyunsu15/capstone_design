import React, { useRef } from 'react';
import {
  Toolbar,
  Grid,
  Typography,
  Button,
  Box,
  TextField,
} from '@material-ui/core';

import style from './nav.module.css';
import { createOption } from '../lib/createEvent';

const Nav = (props) => {
  const text = useRef();
  const { setIndex, local, setLocal } = props;
  return (
    <div className={style.nav}>
      <Box>
        {title()}
        {localTextField(text, local, setLocal, setIndex)}
        {stateInterface(setIndex)}
      </Box>
    </div>
  );
};

const title = () => (
  <Typography variant="h6" align="center">
    프랜차이즈 맵
  </Typography>
);

const localTextField = (text, local, setLocal, setIndex) => (
  <Grid container justify="center">
    <TextField
      inputRef={text}
      style={{ width: '33%' }}
      size="small"
      label="지역검색"
    />
    <Button onClick={(e) => addLocal(text, local, setLocal, setIndex)}>
      추가
    </Button>
  </Grid>
);

const stateInterface = (setIndex) => (
  <div>
    <Toolbar className={style.nav_second}>
      <Typography variant="h5" align="center" className={style.state_inner}>
        지역:
      </Typography>

      <Box id="nav-local" className={style.state_inner}></Box>

      <Typography variant="h5" className={style.state_inner}>
        프랜차이즈:
      </Typography>

      <Box id="nav-franchise" className={style.state_inner}>
        {}
      </Box>

      <Button
        onClick={(e) => {
          setIndex(-1);
        }}
        className={style.state_inner}
      >
        검색
      </Button>
    </Toolbar>
  </div>
);

const addLocal = (ref, local, setLocal, setIndex) => {
  const text = ref.current.value.trim();

  if (isError(text)) {
    ref.current.value = 'Error';
    setIndex(0);
  } else if (local.indexOf(text) == -1)
    createOption('local', text, local, setLocal, null);
};

const isError = (text) => {
  const check_unCompletedKor = /[ㄱ-ㅎ|ㅏ-ㅣ]/.test(text);
  const check_spc = /[~!@#$%^&*()_+|<>?:{}]/.test(text);
  const check_eng = /[a-zA-Z]/.test(text);
  const wrongWord = check_eng || check_spc || check_unCompletedKor;

  return wrongWord || text.length == 1 || text == '' || parseInt(text)
    ? true
    : false;
};

export default Nav;

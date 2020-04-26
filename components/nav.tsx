import React, { useState, useRef, Fragment, useEffect } from 'react';
import Link from 'next/link';
import { AppBar, Typography, Button, Box, TextField } from '@material-ui/core';
import { category } from '../practice/정현수/fakeDB';
import Router from 'next/router';

export const useLocal = () => {
  const [local, setLocal] = useState([]);
  return [local, setLocal];
};

export const createOption = (id, text) => {
  const child = document.createElement('div');
  const childText = document.createElement('div');
  const button = document.createElement('span');
  button.innerHTML = 'ㅡ';
  childText.innerHTML = text + ' ';
  childText.appendChild(button);
  childText.className = 'h3';
  childText.id = text;
  document.getElementById(`nav-${id}`).appendChild(childText);

  button.onclick = () => {
    button.parentElement.parentElement.removeChild(button.parentElement);
  };
};

const Nav = (props) => {
  const [local, setLocal] = useLocal();
  const text = useRef();

  return (
    <div>
      <Box>
        <Typography variant={props.variant} align="center">
          프랜차이즈 맵
        </Typography>
        <TextField
          inputRef={text}
          style={{ width: '33%' }}
          size="small"
          label="지역검색"
        />
        <Button onClick={(e) => addLocal(text)}>추가</Button>
        <Typography variant="h5">지역:</Typography>
        <Box id="nav-local"></Box>
        <Typography variant="h5">프랜차이즈:</Typography>
        <Box id="nav-franchise">{}</Box>
        <Button
          onClick={(e) => {
            const localList = searchState('local');
            const franchiseList = searchState('franchise');

            Router.push({
              pathname: '/result',
              query: { local: localList, franchise: franchiseList },
            });
          }}
        >
          검색
        </Button>
      </Box>

      {categoryComponent()}
    </div>
  );
};

const addLocal = (ref) => {
  const text = ref.current.value;
  const local = searchState('local');
  const isContain = local.indexOf(text) != -1 ? true : false;
  if (!isContain) {
    createOption('local', text);
  }
};

const categoryComponent = () =>
  Object.keys(category['kind']).map((str) => (
    <Link
      href={{
        pathname: '/[menu]',
        query: { list: category['kind'][str] },
      }}
      as={str}
    >
      <a>{str}</a>
    </Link>
  ));

export const searchState = (option) => {
  const list = [];
  document.getElementById(`nav-${option}`).childNodes.forEach((element) => {
    list.push(element.childNodes[0].nodeValue.trim());
  });
  return list;
};
export default Nav;

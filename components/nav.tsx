import React, { useRef } from 'react';
import Link from 'next/link';
import { Typography, Button, Box, TextField } from '@material-ui/core';
import { kind } from '../practice/정현수/fakeDB';
import Router from 'next/router';

const Nav = (props) => {
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
            const local = searchState('local');
            const franchise = searchState('franchise');
            Router.push({
              pathname: '/result',
              query: { local: local, franchise: franchise },
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
const categoryComponent = () =>
  Object.keys(kind).map((str) => (
    <Link
      href={{
        pathname: '/[menu]',
      }}
      as={str}
    >
      <a>{str}</a>
    </Link>
  ));

const addLocal = (ref) => {
  const text = ref.current.value;
  const local = searchState('local');
  const isContain = local.indexOf(text) != -1 ? true : false;
  if (!isContain) {
    createOption('local', text);
  }
};

export const createOption = (parentId, text, id?) => {
  const childText = document.createElement('div');
  const button = document.createElement('span');
  button.innerHTML = 'ㅡ';
  childText.innerHTML = text + ' ';
  childText.appendChild(button);
  childText.className = 'h3';
  if (id) childText.setAttribute('id', id);
  document.getElementById(`nav-${parentId}`).appendChild(childText);

  button.onclick = () => {
    button.parentElement.parentElement.removeChild(button.parentElement);
  };
};

export const searchState = (option) => {
  const list = [];
  document.getElementById(`nav-${option}`).childNodes.forEach((element) => {
    list.push(element.childNodes[0].nodeValue.trim());
  });
  return list;
};

export default Nav;

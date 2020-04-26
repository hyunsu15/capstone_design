import React, { useState } from 'react';
import Head from 'next/head';
import Nav, { createOption, searchState } from '../components/nav';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type } from 'os';
import { category } from '../practice/정현수/fakeDB';
import {
  AppBar,
  Typography,
  Button,
  Box,
  TextField,
  Paper,
} from '@material-ui/core';

const menu = () => {
  const router = useRouter();
  const list = category['kind'][router.query.menu];

  return (
    <div>
      {/* <Nav /> */}
      {console.dir(category)}
      {router.query.menu}
      {listComponent(list)}
    </div>
  );
};

//   {typeof list == 'object' && listComponent(list)}

const listComponent = (list) => {
  return (
    typeof list == 'object' &&
    list.map((franchise) => {
      return typeof category[franchise] == 'object'
        ? listItem(franchise, true)
        : listItem(franchise, false);
    })
  );
};

const listItem = (franchise, validData) => {
  const isNotContain = () =>
    searchState('franchise').indexOf(franchise) == -1 ? true : false;

  if (validData)
    return (
      <Paper>
        <Box>{franchise}</Box>
        설명:{category[franchise]['설명']}
        <Button
          onClick={(e) => {
            if (isNotContain()) createOption('franchise', franchise);
          }}
        >
          추가
        </Button>
      </Paper>
    );
  else
    return (
      <Paper>
        {franchise}
        개발중..
      </Paper>
    );
};

export default menu;

// Array.isArray(franchiseState) &&
//               typeof changeStore == 'function' &&
//               changeStore([franchise, ...franchiseState]);
//             isContain() &&
//

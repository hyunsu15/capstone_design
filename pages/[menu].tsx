import React, { useState } from 'react';
import Head from 'next/head';
import Nav, { createOption, searchState } from '../components/nav';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type } from 'os';
import { kind } from '../practice/정현수/fakeDB';
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
  const pageName = router.query.menu;
  return (
    <div>
      {pageName}

      {listComponent(pageName)}
    </div>
  );
};

//   {typeof list == 'object' && listComponent(list)}

const listComponent = (pageName) => {
  return (
    typeof kind == 'object' &&
    typeof pageName == 'string' &&
    Object.keys(kind[pageName]).map((franchise) =>
      listItem(pageName, franchise)
    )
  );
};

const listItem = (pageName, franchise) => {
  const isNotContain = () =>
    searchState('franchise').indexOf(franchise) == -1 ? true : false;

  return (
    <Paper variant="outlined" square>
      <Box>{franchise}</Box>
      설명:{kind[pageName][franchise]}
      <Button
        onClick={(e) => {
          if (isNotContain()) createOption('franchise', franchise, pageName);
        }}
      >
        추가
      </Button>
    </Paper>
  );
};

export default menu;

// Array.isArray(franchiseState) &&
//               typeof changeStore == 'function' &&
//               changeStore([franchise, ...franchiseState]);
//             isContain() &&
//

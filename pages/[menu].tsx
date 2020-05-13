import React from 'react';
import Head from 'next/head';
import Nav, { createOption, searchState } from '../components/nav';
import fetch from 'node-fetch';
import { useRouter } from 'next/router';
import { type } from 'os';
import { kind } from '../practice/정현수/fakeDB';
import { Button, Box, Paper } from '@material-ui/core';

const menu = ({ props }) => {
  const router = useRouter();
  const pageName = router.query.menu;
  return (
    <div>
      <Head>
        <title>프랜차이즈 검색기-{pageName}</title>
      </Head>
      {pageName}
      {listComponent(pageName, props)}
    </div>
  );
};

//   {typeof list == 'object' && listComponent(list)}

menu.getInitialProps = async () => {
  const res = await fetch(process.env.KIND_HOMEPAGE);
  const kind = await res.json();

  return { props: kind };
};

const listComponent = (pageName, props) => {
  return (
    typeof pageName == 'string' &&
    Object.keys(props[pageName]).map((franchise) =>
      listItem(pageName, franchise, props)
    )
  );
};

const listItem = (pageName, franchise, props) => {
  const isNotContain = () =>
    searchState('franchise').indexOf(franchise) == -1 ? true : false;

  return (
    <Paper variant="outlined" square>
      <Box>{franchise}</Box>
      설명:{props[pageName][franchise]}
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

import React from 'react';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
const Home = () => {
  return (
    <div>
      <Head>
        <title>프랜차이즈 검색기</title>
      </Head>
    </div>
  );
};

export default Home;

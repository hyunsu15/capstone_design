import React, { useState } from 'react';
import Head from 'next/head';
import Nav from '../components/nav';
import Category from '../components/Cagetory';
import Result from '../components/Result';

const Home = () => {
  const [tab, setTab] = useState(0);
  const [local, setLocal] = useState([]);
  const [franchise, setFranchise] = useState([]);
  return (
    <div>
      <Head>
        <title>프랜차이즈 검색기</title>
      </Head>
      <Nav setIndex={setTab} local={local} setLocal={setLocal} />

      <Category
        index={tab}
        setIndex={setTab}
        franchise={franchise}
        setFranchise={setFranchise}
      />
      {tab == -1 && <Result local={local} franchise={franchise} />}
    </div>
  );
};

export default Home;

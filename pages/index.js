import React from 'react';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
const Home = ({ kind }) => {
  const { data } = useSWR(process.env.KIND_HOMEPAGE, fetcher, { kind });
  return (
    <div>
      <Head>
        <title>프랜차이즈 검색기</title>
      </Head>
      {data &&
        Object.keys(data).map((category) => (
          <Link
            href={{
              pathname: '/[menu]',
            }}
            as={category}
          >
            <a>{category}</a>
          </Link>
        ))}
      {console.log('env', process.env.KIND_PAGE)}
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(process.env.KIND_HOMEPAGE);
  const data = await res.json();
  return { props: { kind: data } };
}

export default Home;

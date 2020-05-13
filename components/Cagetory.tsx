import React, { useState } from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

import useSWR from 'swr';

const fetcher = async (url) => {
  const res = await fetch(url);
  return res.json();
};

const Category = () => {
  const { data, error } = useSWR(process.env.KIND_HOMEPAGE, fetcher);
  if (error) return <div>error</div>;
  if (!data) return <div>loading</div>;
  if (data)
    return Object.keys(data).map((category) => (
      <Link
        href={{
          pathname: '/[menu]',
        }}
        as={category}
      >
        <a>{category}</a>
      </Link>
    ));
  return <div></div>;
};

export default Category;

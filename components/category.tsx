import React, { useState } from 'react';
import Link from 'next/link';
import fetch from 'unfetch';

import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());
const Category = () => {
  const { data, error } = useSWR(process.env.KIND_HOMEPAGE, fetcher);
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
  else return error;
};

export default Category;
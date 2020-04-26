import React, { useState } from 'react';
import Head from 'next/head';
import Nav, { useLocal } from '../components/nav';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { category } from '../practice/정현수/fakeDB';

const Result = () => {
  const router = useRouter();
  const local = router.query.local;
  var franchises = router.query.franchise;

  if (typeof franchises == 'string') franchises = [franchises];
  if (Array.isArray(franchises)) return resultPaper(local, franchises);
  return <div>프랜차이즈를 골라주세요!!</div>;
};
//franchises.map((franchise) => <div>됨</div>)
const resultPaper = (local, franchises: string[]) => {
  var count = [];
  for (var i = 0; i < franchises.length; i++) count.push(0);

  return <div>검색결과...개발중</div>;
};

export default Result;

// {
//   console.log('z', franchises);
// }
//

// {
//   console.log('zz', franchises);
// }

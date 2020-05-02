import React, { useState } from 'react';
import Head from 'next/head';
import Nav from '../components/nav';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { crawlerResult } from '../practice/정현수/fakeDB';
import { Button, Typography, Paper } from '@material-ui/core';

const Result = () => {
  const router = useRouter();
  console.dir(router);
  var local = router.query.local;
  var franchises = router.query.franchise;

  if (typeof franchises == 'string') franchises = [franchises];
  if (typeof local == 'string') local = [local];

  if (Array.isArray(franchises) && Array.isArray(local))
    return (
      <div>
        <Head>
          <title>프랜차이즈 검색기-검색결과</title>
        </Head>
        결과
        {local.map(
          (element) =>
            Array.isArray(franchises) && resultPaper(element, franchises)
        )}
      </div>
    );

  if (local == null) return <div>지역을 골라주세요!!</div>;

  return <div>프랜차이즈를 골라주세요!!</div>;
};

//franchises.map((franchise) => <div>됨</div>)
const resultPaper = (local: string, franchises: string[]) => {
  let result = searchResult(local, franchises);

  return (
    <Paper>
      {local}

      {localResult(result, local)}
    </Paper>
  );
};
const searchResult = (local: string, franchises: string[]) => {
  let tokens: string[] = local.split(' ');
  let result = {};

  const categoryList = franchiseList();

  console.log(local, '+', categoryList, '+', franchises);
  let index = 0;
  categoryList.map((category) => {
    Object.keys(crawlerResult[category][franchises[index]]).map((element) => {
      tokens = local.split(' ');

      const franchiseLocation =
        crawlerResult[category][franchises[index]][element];

      if (local.length == 0) return;

      while (
        tokens.length != 0 &&
        (franchiseLocation['도로명 주소'].includes(tokens[0]) ||
          franchiseLocation['지번 주소'].includes(tokens[0]))
      ) {
        tokens.shift();
      }

      if (result[franchises[index]] == null) result[franchises[index]] = [];
      if (tokens.length == 0) result[franchises[index]].push(franchiseLocation);
    });

    index = (index + 1) % categoryList.length;
  });
  return result;
};
const localResult = (result, local) => {
  return Object.keys(result).map((franchise) => {
    if (result[franchise].length == 0) return <Paper>{franchise} 0개</Paper>;
    else
      return (
        <div>
          <Button
            onClick={(e) => {
              const resultLocations = document.getElementById(
                `result-${local}-${franchise}`
              );

              resultLocations.hidden = !resultLocations.hidden;
            }}
          >
            {franchise} {result[franchise].length}개
          </Button>

          <div hidden={true} id={`result-${local}-${franchise}`}>
            {result[franchise].map((element) => {
              return makeResultPaper(local, element, franchise);
            })}
          </div>
        </div>
      );
  });
};

const makeResultPaper = (local, franchise, name) => {
  return (
    <div>
      {Object.keys(franchise).map((locationMember) => (
        <div>
          {locationMember}:{franchise[locationMember]}
        </div>
      ))}
    </div>
  );
};

const franchiseList = () => {
  const list = [];
  document
    .getElementById('nav-franchise')
    .childNodes.forEach((element) => list.push(element['id']));

  return list;
};

export default Result;

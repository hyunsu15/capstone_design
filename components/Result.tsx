import React, { useState } from 'react';
import { Button, Box, Paper } from '@material-ui/core';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import style from './Result.module.css';
import grey from '@material-ui/core/colors/grey';
const isError = (str: string) => {
  return <Box p={3}>{`${str}를 골라주세요`}</Box>;
};

const Result = (props) => {
  const { local, franchise } = props;
  const { data, error } = useSWR(process.env.FRANCHISE_HOMEPAGE, fetcher);

  if (local.length == 0) return isError('지역');
  if (franchise.length == 0) return isError('프랜차이즈');
  if (error) return <div>error</div>;
  if (!data) return <div>loading</div>;

  return (
    <Box p={3} className={style.box}>
      {local.map((element, index) =>
        resultPaper(data, element, franchise, index)
      )}
    </Box>
  );
};

const resultPaper = (data, local: string, franchises: string[], index) => {
  let result = searchResult(data, local, franchises);

  return (
    <Box className={style.result_margin} style={{ backgroundColor: grey[200] }}>
      {local}

      {localResult(result, local)}
    </Box>
  );
};
const searchResult = (data, local: string, franchises: string[]) => {
  let tokens: string[] = local.split(' ');
  let result = {};

  let categoryList = franchiseList(franchises);
  let index = 0;

  let error = tokens.filter((element) => element.length <= 1);
  if (error.length >= 1) return result;
  if (parseInt(local)) return result;

  categoryList.map((category) => {
    Object.keys(data[category][franchises[index]]).map((element) => {
      tokens = local.split(' ');

      const franchiseLocation = data[category][franchises[index]][element];

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
  let zero = Object.keys(result).filter((x) => result[x].length != 0);
  if (zero.length == 0)
    return <span className={style.error}>존재하지않음</span>;

  return Object.keys(result).map((franchise) => {
    if (result[franchise].length >= 1)
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
            {franchise}
            {` ${result[franchise].length}개`}
          </Button>

          <div
            hidden={true}
            id={`result-${local}-${franchise}`}
            className={style.result_margin}
          >
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
    <Paper variant="outlined" square className={style.result_margin}>
      {Object.keys(franchise).map((locationMember) => (
        <div className={style.result_paper_item}>
          {locationMember}:
          {franchise[locationMember] == ''
            ? '미지원'
            : franchise[locationMember]}
        </div>
      ))}
    </Paper>
  );
};

const franchiseList = (state: string[]) => {
  let list = [];

  document
    .getElementById('nav-franchise')
    .childNodes.forEach(
      (element) =>
        state.includes(element.childNodes[0].textContent.trim()) &&
        list.push(element['id'])
    );

  return list;
};

export default Result;

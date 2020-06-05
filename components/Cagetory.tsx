import React from 'react';
import { Paper, Tabs, Tab, Button, Box } from '@material-ui/core';

import useSWR from 'swr';
import { createOption } from '../lib/createEvent';
import style from './Cagetory.module.css';
import fetcher from '../lib/fetcher';
import { explanation } from '../lib/explanation';

const Category = (props) => {
  const { index, setIndex, franchise, setFranchise } = props;

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setIndex(newValue);
  };
  const { data, error } = useSWR(process.env.KIND_HOMEPAGE, fetcher);
  if (error) return <div>error</div>;
  if (!data) return <div>loading</div>;
  if (data)
    return (
      <div>
        {TabFactory(index, handleChange, data)}
        {FranchiseTabPanelFactory(index, data, franchise, setFranchise)}
        {explanationTabPanel(index)}
      </div>
    );
};

const TabFactory = (index, handleChange, data) => (
  <Tabs
    value={index}
    onChange={handleChange}
    indicatorColor="primary"
    textColor="primary"
    variant="scrollable"
    scrollButtons="auto"
    aria-label="scrollable auto tabs example"
  >
    <Tab label={'기본'} value={0} />
    {Object.keys(data).map((str, index) => (
      <Tab
        label={str}
        onClick={(e) => {
          handleChange(e, index + 1);
        }}
      />
    ))}
    <Tab label={'결과'} value={-1} />
  </Tabs>
);

const FranchiseTabPanelFactory = (index, data, franchise, setFranchise) =>
  Object.keys(data).map(
    (str, localIndex) =>
      str != null && (
        <TabPanel
          value={index}
          index={localIndex + 1}
          data={data}
          franchise={franchise}
          setFranchise={setFranchise}
          isExplanation={false}
        >
          {str}
        </TabPanel>
      )
  );

function TabPanel(props) {
  const {
    children,
    value,
    index,
    data,
    franchise,
    setFranchise,
    isExplanation,
    ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index &&
        (isExplanation ? (
          <Box p={3}>
            {Object.keys(data).map((inform) => (
              <Paper variant="outlined" square className={style.inform_paper}>
                {data[inform].map((element, index) => (
                  <div id={style[`inform_${index}`]} className={style.inform}>
                    {index == 0 ? element : `${index}. ${element}`}
                  </div>
                ))}
              </Paper>
            ))}
          </Box>
        ) : (
          <Box p={3}>
            {Object.keys(data[children]).map((franchiseName, index) =>
              listItem(data, children, franchiseName, franchise, setFranchise)
            )}
          </Box>
        ))}
    </div>
  );
}

const listItem = (data, pageName, franchiseName, franchise, setFranchise) => {
  const isContain = franchise.indexOf(franchiseName) != -1 ? true : false;

  return (
    <Paper variant="outlined" square className={style.franchise_paper}>
      <Box className={style.franchise_name}>{franchiseName}</Box>
      설명:{data[pageName][franchiseName]}
      <Button
        onClick={(e) => {
          if (!isContain) {
            createOption(
              'franchise',
              franchiseName,
              franchise,
              setFranchise,
              pageName
            );
          }
        }}
      >
        추가
      </Button>
    </Paper>
  );
};

const explanationTabPanel = (index) => (
  <TabPanel
    value={index}
    index={0}
    isExplanation={true}
    data={explanation}
  ></TabPanel>
);

export default Category;

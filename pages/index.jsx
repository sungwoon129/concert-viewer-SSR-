import React from 'react';
import ConcertList from '../src/app/components/ConceretList';
import convert from 'xml-js';
import axios from 'axios';

const Index = ({ data }) => {
  return (
    <>
      <ConcertList list={data != null ? data.dbs.db : []}/>
    </>
  );
};

export default Index

export async function getServerSideProps() {
  const API_KEY = process.env.API_KEY;
  
  const res = await axios.get("http://www.kopis.or.kr/openApi/restful/pblprfr?service=" + API_KEY + "&stdate=20230924&eddate=20230930&cpage=1&rows=10&prfstate=01")
  .then(response => {
    return convert.xml2json(response.data, { compact: true, spaces: 4 })
  });
  
  return {
    props: {
      data : JSON.parse(res)
    }
  }
};
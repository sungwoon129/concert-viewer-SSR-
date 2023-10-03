import React from 'react';
import ConcertList from '../src/app/components/ConceretList';
import convert from 'xml-js';
import axios from 'axios';
import Footer from '../src/app/components/Footer';
import moment from 'moment';

const Index = ({ data }) => {
  console.log(data);
  
  return (
    <>
      <ConcertList list={data.dbs.db != null ? data.dbs.db : []}/>
      <Footer />
    </>
  );
};

export default Index

export async function getServerSideProps() {
  
  let from = moment().endOf('week').add(1,'d').format("YYYYMMDD");
  let to = moment().endOf('week').add(1,'d').endOf('week').format("YYYYMMDD");

   const res = await axios.get(`http://www.kopis.or.kr/openApi/restful/pblprfr?service=${process.env.API_KEY}&stdate=${from}&eddate=${to}&cpage=1&rows=10&prfstate=01`)
  .then(response => {
    return convert.xml2json(response.data, { compact: true, spaces: 4 })
  });
  
  return {
    props: {
      data : JSON.parse(res)
    }
  }

};
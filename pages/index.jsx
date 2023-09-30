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
      {/* <ConcertList list={data.dbs.db != null ? data.dbs.db : []}/>
      <Footer /> */}
    </>
  );
};

export default Index

export async function getServerSideProps() {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const API_KEY2 = process.env.NEXT_PUBLIC_API_KEY2;
  
  let from = moment().endOf('week').add(1,'d');
  let to = moment().endOf('week').add(1,'d').endOf('week');


  const res = await axios.get(`http://www.culture.go.kr/openapi/rest/publicperformancedisplays/period?from=${from}8&to=${to}&cPage=1&rows=10&place=&gpsxfrom=&gpsyfrom=&gpsxto=&gpsyto=&keyword=&sortStdr=1&serviceKey=${API_KEY2}`)
   //const res = await axios.get(`http://www.kopis.or.kr/openApi/restful/pblprfr?service=${API_KEY}&stdate=${from}&eddate=${to}&cpage=1&rows=10&prfstate=01`)
  .then(response => {
    return convert.xml2json(response.data, { compact: true, spaces: 4 })
  });
  
  return {
    props: {
      data : JSON.parse(res)
    }
  }

};
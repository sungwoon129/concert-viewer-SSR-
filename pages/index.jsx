import React from 'react';
import ConcertList from '../src/app/components/ConceretList';
import convert from 'xml-js';
import axios from 'axios';
import Footer from '../src/app/components/Footer';
import Header from '../src/app/components/Header';
import moment from 'moment';
import sample from '../SampleData';
import '../src/app/style/app.css';

const Index = ({ data, pageNumber }) => {

  console.log(data);

  return (
    <>
      <Header />
      <ConcertList list={data.dbs.db != null ? data.dbs.db : []} pageNumber={pageNumber}/>
      <Footer />
    </>
  );
};

export default Index

export async function getServerSideProps() {

  
  let from = moment().endOf('week').add(1,'d').format("YYYYMMDD");
  let to = moment().endOf('week').add(1,'d').endOf('week').format("YYYYMMDD");
  let page = 1;

  const res = await axios.get(`http://www.kopis.or.kr/openApi/restful/pblprfr?service=${process.env.API_KEY}&stdate=${from}&eddate=${to}&cpage=${page}&rows=9&prfstate=01,02`)
  .then(response => {
    return convert.xml2json(response.data, { compact: true, spaces: 4 })
  });
  
  return {
    props: {
      data : JSON.parse(res),
      currentPage: page
    }
  }

};
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Fetch() {
  const [data, setData] = useState();

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos/1').then((res) => {
      setData(res.data);
    });
    return () => {};
  }, []);

  if (!data) {
    <></>;
  }
  return <div>{data ? data.title : '로딩'}</div>;
}

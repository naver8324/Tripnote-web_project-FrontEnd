import React from 'react';
import useAxios from '../../utils/api';

const RootArea = () => {
  const { loading, data, error, refetch } = useAxios({
    url: 'https://yts.mx/api/v2/list_movies.json',
  });
  console.log(
    `Loading: ${loading}\nError:${error}\n Data: ${JSON.stringify(data)}`,
  );
  return (
    <div className="APP" style={{ height: '1000vh' }}>
      <h1 className="text-xl">status= {data && data.status}</h1>
      <h2>{loading && 'Loading...'}</h2>
      <button className="text-lg border shadow" onClick={refetch}>
        싱싱한 데이터
      </button>
    </div>
  );
};

export default RootArea;

import React, { useRef } from 'react';
import { useFetch } from './components/hooks';
import Planets from './components/Planets';

const App = () => {
  const isComponentMounted = useRef(true);

  const { data, loading, error } = useFetch(
    'http://swapi.dev/api/planets/',
    isComponentMounted,
  );

  return (
    <>
      {loading ? (
        <div>Loading ...</div>
      ) : (
        error ? (<div>error, try again</div>) : (<Planets data={data.results} />)
      )}
    </>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { IPlanet, IConfig } from '../interfaces';

export const useFetch = (url: string, ref: React.MutableRefObject<boolean>) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (ref.current) {
      const fetchData = async () => {
        try {
          const res = await fetch(url);
          const resJson = await res.json();
          setData(resJson);
          setLoading(false);
        } catch (err) {
          setError(err);
        } 

      };

      fetchData();
    }
    
    return () => {
      ref.current = false;
    };

  }, [url, ref]);

  return { loading, data, error };

};

export const useSortPlanets = (items: IPlanet[]) => {

  const [sortConfig, setSortConfig] = React.useState<IConfig>(null);
  
  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];

    if (sortConfig !== null) {
      const options = { numeric: true, sensitivity: 'base' };
      sortableItems.sort((a, b) => {
        return sortConfig.direction === 'ascending' ? 
          a[sortConfig.key].localeCompare(b[sortConfig.key], undefined, options): 
          b[sortConfig.key].localeCompare(a[sortConfig.key], undefined, options);
      });
    }

    return sortableItems;

  }, [items, sortConfig]);

  const sort = (key: string) => {
    let direction = 'ascending';

    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    setSortConfig({ key, direction });

  }

  return { items: sortedItems, sort };
}
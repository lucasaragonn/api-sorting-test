import React, { useState, useEffect } from 'react';

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

interface IConfig {
  key: string;
  direction: string;
};
const parseValue = (value: string) => {
  const toNumber = parseInt(value);
  return isNaN(toNumber) ? value : toNumber;
}
export const useSortData = (items: []) => {

  const [sortConfig, setSortConfig] = React.useState<IConfig>(null);
  
  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];

    if (sortConfig !== null) {

      sortableItems.sort((a: any, b: any) => {
        const parsedA = parseValue(a[sortConfig.key]);
        const parsedB = parseValue(b[sortConfig.key]);

        if (parsedA < parsedB) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (parsedA > parsedB) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
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
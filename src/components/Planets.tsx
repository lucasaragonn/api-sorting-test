import React from 'react';
import { useSortData } from './hooks';

interface PlanetProps {
  data: []
}

const Planets = ({ data }: PlanetProps) => {
  const { items, sort } = useSortData(data);

  return (
    <div>
      <h1 onClick={() => sort('name')}>Planets</h1>
      {
        items.map((planet: any) => <div>{planet.name}</div>)
      }
    </div>

  );
}

export default Planets;
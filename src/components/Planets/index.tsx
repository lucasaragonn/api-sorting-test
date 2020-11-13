import React from 'react';
import { useSortData } from '../hooks';
import styles from './index.module.scss';

interface PlanetProps {
  data: []
}

const Planets = ({ data }: PlanetProps) => {
  const { items, sort } = useSortData(data);

  return (
    <div className={styles.planetsContainer}>
      <table>
        <thead>
          <tr>
            <th onClick={() => sort('name')}>Name</th>
            <th onClick={() => sort('climate')}>Climate</th>
            <th onClick={() => sort('terrain')}> Terrain</th>
            <th onClick={() => sort('population')}>Population</th>
          </tr>
        </thead>
        <tbody>
          {items.map((planet: any, index)=> (
            <tr key={index}>
              <td>{planet.name}</td>
              <td>{planet.climate}</td>
              <td>{planet.terrain}</td>
              <td>{planet.population}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}

export default Planets;
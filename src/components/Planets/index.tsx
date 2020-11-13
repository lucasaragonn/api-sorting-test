import React from 'react';
import { useSortPlanets } from '../hooks';
import { IPlanet } from '../interfaces';
import styles from './index.module.scss';

interface PlanetProps {
  data: IPlanet[];
}

const Planets = ({ data }: PlanetProps) => {
  const { items, sort } = useSortPlanets(data);

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
          {items.map((planet: IPlanet, index: number)=> (
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
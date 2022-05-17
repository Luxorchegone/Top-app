import React, { useContext } from 'react';
import styles from './Menu.module.css';
import { AppContext } from '../../context/app.context';

export const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);

  return (
    <div>
      <ul>
        {menu.map((item) => {
          return (
            <li key={item._id.secondCategory}>{item._id.secondCategory}</li>
          );
        })}
      </ul>
    </div>
  );
};

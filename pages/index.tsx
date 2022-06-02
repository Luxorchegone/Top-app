import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import { Htag, Button, Ptag, Tag, Rating } from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';

function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(4);

  return (
    <>
      <Htag tag="h1">Например</Htag>
      <Button arrow={'right'} appearance="primary" className="testdff">
        Это кнопка
      </Button>
      <Button arrow={'right'} appearance="ghost">
        Это кнопка
      </Button>
      <Ptag size={'s'}>Маленький</Ptag>
      <Ptag size={'m'}>Средний</Ptag>
      <Ptag size={'l'}>Большой</Ptag>
      <Tag size="m" color="red">
        Проверяем тег
      </Tag>
      <Tag size="s" color="ghost">
        Проверяем тег
      </Tag>
      <Rating rating={rating} isEditable setRating={setRating} />
      <ul>
      {menu.map((item) => {
        return (
          <li key={item._id.secondCategory}>
            {item._id.secondCategory}
          </li>
        )
      })}
      </ul>
      
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
    {firstCategory}
  );
  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown>{
  menu: MenuItem[];
  firstCategory: number;
}

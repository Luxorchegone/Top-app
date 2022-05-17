import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import React, { useState } from 'react';
import { Htag, Button, Ptag, Tag, Rating } from '../../components';
import { withLayout } from '../../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../../interfaces/menu.interface';
import { TopPageModel } from '../../interfaces/page.interface';
import { ParsedUrlQuery } from 'querystring';
import { ProductModel } from '../../interfaces/product.interface';

const firstCategory = 0;

function Course({ menu, page, products }: CourseProps): JSX.Element {
  return (
    <>
      {products.map((i) => (
        <span>{i._id}</span>
      ))}
    </>
  );
}

export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
  //получаем список категорий курсов
  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
    { firstCategory }
  );
  //убираем вложенность => получаем массив статических путей
  return {
    paths: menu.flatMap((item) =>
      item.pages.map((page) => '/courses/' + page.alias)
    ),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<CourseProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  //если нет дальнейшего пути
  if (!params) {
    return {
      notFound: true,
    };
  }
  //получаем список направлений курсов
  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
    { firstCategory }
  );
  //получаем описание данного направления подготовки
  const { data: page } = await axios.get<TopPageModel>(
    process.env.NEXT_PUBLIC_DOMAIN + `/api/top-page/byAlias/${params.alias}`
  );
  //получаем список доступных материалов для подготовки по данному направлению
  const { data: products } = await axios.post<ProductModel[]>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find',
    {
      category: page.category,
      limit: 10,
    }
  );

  return {
    props: {
      menu,
      firstCategory,
      page,
      products,
    },
  };
};

interface CourseProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
  page: TopPageModel;
  products: ProductModel[];
}

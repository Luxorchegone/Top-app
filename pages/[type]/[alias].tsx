import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import React from 'react';
import { withLayout } from '../../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../../interfaces/menu.interface';
import {
  TopLevelCategory,
  TopPageModel,
} from '../../interfaces/page.interface';
import { ParsedUrlQuery } from 'querystring';
import { ProductModel } from '../../interfaces/product.interface';
import { firstLevelMenu } from '../../helpers/helpers';
import { TopPageComponent } from '../../page-components';

function TopPage({firstCategory, menu, page, products }: CourseProps): JSX.Element {
  return <TopPageComponent 
		firstCategory={firstCategory}
		page={page}
		products={products}/>;
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];

  for (const m of firstLevelMenu) {
    //получаем данные по всем категориям
    const { data: menu } = await axios.post<MenuItem[]>(
      process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
      { firstCategory: m.id }
    );
    paths = paths.concat(
      //убираем вложенность => получаем массив статических путей
      menu.flatMap((item) =>item.pages.map((page) => `/${m.route}/${page.alias}`)
      )
    );
  }
  return {
    paths,
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

  const firstCategoryItem = firstLevelMenu.find((m) => m.route == params.type);
  //если не нашли
  if (!firstCategoryItem) {
    return {
      notFound: true,
    };
  }

  try {
    //получаем список направлений курсов
    const { data: menu } = await axios.post<MenuItem[]>(
      process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
      { firstCategory: firstCategoryItem.id }
    );
    if (menu.length == 0) {
      return {
        notFound: true,
      };
    }
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
        firstCategory: firstCategoryItem.id,
        page,
        products,
      },
    };
  } catch (err) {
    console.warn(`Произошла ошибка:`, err);
    return {
      notFound: true,
    };
  }
};

interface CourseProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}

import React, { useContext } from "react";
import styles from "./Menu.module.css";
import { AppContext } from "../../context/app.context";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";
import CoursesIcon from "./icons/courses.svg";
import BooksIcon from "./icons/books.svg";
import ServicesIcon from "./icons/services.svg";
import ProductsIcon from "./icons/products.svg";
import { TopLevelCategory } from "../../interfaces/page.interface";
import cn from "classnames";

const firstLevelMenu: FirstLevelMenuItem[] = [
  {
    route: "courses",
    name: "Курсы",
    icon: <CoursesIcon />,
    id: TopLevelCategory.Courses,
  },
  {
    route: "books",
    name: "Книги",
    icon: <BooksIcon />,
    id: TopLevelCategory.Books,
  },
  {
    route: "services",
    name: "Сервисы",
    icon: <ServicesIcon />,
    id: TopLevelCategory.Services,
  },
  {
    route: "products",
    name: "Продукты",
    icon: <ProductsIcon />,
    id: TopLevelCategory.Products,
  },
];

export const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenu.map((item) => {
          return (
            <div key={item.route}>
              <a href={`/${item.route}`}>
                <div
                  className={cn(styles.firstLeveL, {
                    [styles.firstLeveLActive]: item.id == firstCategory,
                  })}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </div>
              </a>
              {item.id == firstCategory && buildSecondLevel(item)}
            </div>
          );
        })}
      </>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <div>
        {menu.map((m) => (
          <div key={m._id.secondCategory}>
            <div className={styles.secondLevel}>{m._id.secondCategory}</div>
            <div
              className={cn(styles.secondLevelBlock, {
                [styles.secondLevelBlockOpen]: m.isOpened,
              })}
            >
              {buildThirdLevel(m.pages, menuItem.route)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return pages.map((page) => (
      <a
        href={`/${route}/${page.alias}`}
        className={cn(styles.thirdLevel, {
          [styles.thirdLevelActive]: true,
        })}
      >
        {page.category}
      </a>
    ));
  };

  return <div className={styles.menu}>{buildFirstLevel()}</div>;
};

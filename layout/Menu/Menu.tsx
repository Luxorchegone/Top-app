import React, { useContext } from "react";
import styles from "./Menu.module.css";
import { AppContext } from "../../context/app.context";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { firstLevelMenu } from '../../helpers/helpers';

export const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  const router = useRouter();

  const openSecondLevel = (secondCategory: string) => {
    setMenu &&
      setMenu(
        menu.map((m) => {
          if (m._id.secondCategory == secondCategory) {
            m.isOpened = !m.isOpened;
          }
          return m;
        })
      );
  };

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenu.map((item) => {
          return (
            <div key={item.route}>
              <Link href={`/${item.route}`}>
                <a>
                  <div
                    className={cn(styles.firstLevel, {
                      [styles.firstLevelActive]: item.id == firstCategory,
                    })}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                </a>
              </Link>
              {item.id == firstCategory && buildSecondLevel(item)}
            </div>
          );
        })}
      </>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <div className={styles.secondBlock}>
        {menu.map((m) => {
          if (
            m.pages.map((p) => p.alias).includes(router.asPath.split("/")[2])
          ) {
            m.isOpened = true;
          }
          return (
            <div key={m._id.secondCategory}>
              <div className={styles.secondLevel} onClick={()=> openSecondLevel(m._id.secondCategory)}>{m._id.secondCategory}</div>
              <div
                className={cn(styles.secondLevelBlock, {
                  [styles.secondLevelBlockOpen]: m.isOpened,
                })}
              >
                {buildThirdLevel(m.pages, menuItem.route)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return pages.map((page) => (
      <Link href={`/${route}/${page.alias}`}>
        <a
          className={cn(styles.thirdLevel, {
            [styles.thirdLevelActive]:
              `/${route}/${page.alias}` == router.asPath,
          })}
        >
          {page.category}
        </a>
      </Link>
    ));
  };

  return <div className={styles.menu}>{buildFirstLevel()}</div>;
};

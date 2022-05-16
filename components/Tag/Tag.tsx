import React from 'react';
import { TagProps } from './Tag.props';
import styles from './Tag.module.css';
import cn from 'classnames';

export const Tag = ({
  size = 'm',
  children,
  href,
  color = 'ghost',
  className,
  ...props
}: TagProps): JSX.Element => {
  return (
    <div
      className={cn(styles.tag, className, {
        [styles.red]: color == 'red',
        [styles.ghost]: color == 'ghost',
        [styles.primary]: color == 'primary',
        [styles.gray]: color == 'gray',
        [styles.green]: color == 'green',
        [styles.s]: size == 's',
        [styles.m]: size == 'm',
      })}
      {...props}
    >
      {href ? <a href={href}>{children}</a> : <>{children}</>}
    </div>
  );
};

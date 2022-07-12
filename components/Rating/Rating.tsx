import React, { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef } from 'react';
import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import StarIcon from './star.svg';
import classNames from 'classnames';

export const Rating = forwardRef(
  (
    { isEditable = false, setRating, rating, error, className, tabIndex, ...props }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
      ratingConstructor(rating);
    }, [rating, tabIndex]);

    const ratingConstructor = (currentRating: number) => {
      const updatedArray = ratingArray.map((item: JSX.Element, i: number) => {
        return (
          <span
            className={cn(styles.star, {
              [styles.filled]: i < currentRating,
              [styles.editable]: isEditable,
            })}
            onMouseEnter={() => changeDisplay(i + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            onClick={() => onClick(i + 1)}
            tabIndex={computeFocus(rating, i)}
            onKeyDown={handleKey}
            ref={(r)=>ratingArrayRef.current.push(r)}
          >
            <StarIcon />
          </span>
        );
      });
      setRatingArray(updatedArray);
    };

    const computeFocus = (r: number, i: number): number => {
      if (!isEditable) {
        return -1;
      }
      if (!rating && i == 0) {
        return tabIndex ?? 0;
      }
      if (r == i + 1) {
        return tabIndex ?? 0;
      }
      return -1;
    };

    const changeDisplay = (i: number) => {
      if (!isEditable) {
        return;
      }
      ratingConstructor(i);
    };

    const onClick = (i: number) => {
      if (!isEditable || !setRating) {
        return;
      }
      setRating(i);
    };

    const handleKey = (e: KeyboardEvent) => {
      if (!isEditable || !setRating) {
        return;
      }
      if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
        if (!rating) {
          setRating(1);
        } else {
          e.preventDefault();
          setRating(rating < 5 ? rating + 1 : 5);
        }
        ratingArrayRef.current[rating]?.focus();
      }
      if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
        e.preventDefault();
        setRating(rating > 1 ? rating - 1 : 1);
        ratingArrayRef.current[rating - 2]?.focus();
      }
      
    };

    return (
      <div className={cn(styles.ratingWrapper, className, {
				[styles.error] : error
			})} ref={ref} {...props}>
          {ratingArray.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
				{error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);

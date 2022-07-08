import React, { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import { Card, Rating, Button, Tag, Divider, Review } from '../index';
import { declOfNum, priceRu } from '../../helpers/helpers';
import Image from 'next/image';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { motion } from 'framer-motion';

export const Product = motion(
  forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
    const reviewRef = useRef<HTMLDivElement>(null);

    const variants = {
      visible: { opacity: 1, height: 'auto' },
      hidden: { opacity: 0, height: 0 },
    };

    const scrollToReview = () => {
      setIsReviewOpened(true);
      reviewRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    };

    return (
      <div className={className} {...props} ref={ref}>
        <Card color="white" className={styles.product}>
          <div className={styles.logo}>
            <Image
              src={product.image.includes('http') ? product.image : process.env.NEXT_PUBLIC_DOMAIN + product.image}
              alt={product.title}
              width={70}
              height={70}
            />
          </div>
          <div className={styles.title}>{product.title}</div>

          <div className={styles.price}>
            {priceRu(product.price)}
            {product.oldPrice && (
              <Tag className={styles.discount} color="green">
                {priceRu(product.price - product.oldPrice)}
              </Tag>
            )}
          </div>

          <div className={styles.credit}>
            {priceRu(product.credit)}
            <span className={styles.month}>/мес</span>
          </div>
          <div className={styles.rating}>
            <Rating rating={product.reviewAvg ?? product.initialRating} />
          </div>
          <div className={styles.tags}>
            {product.categories.map((i) => (
              <Tag key={i} color="ghost" className={styles.category}>
                {i}
              </Tag>
            ))}
          </div>
          <div className={styles.priceTitle}>цена</div>
          <div className={styles.creditTitle}>в кредит</div>
          <div className={styles.rateTitle}>
            <a href="#ref" onClick={scrollToReview}>
              {product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
            </a>
          </div>
          <Divider className={styles.hr} />
          <div className={styles.description}>{product.description}</div>
          <div className={styles.feature}>
            {product.characteristics.map((item) => (
              <div key={item.name} className={styles.characteristics}>
                <span className={styles.charcteristicsName}>{item.name}</span>
                <span className={styles.charcteristicsDots}></span>
                <span className={styles.charcteristicsValue}>{item.value}</span>
              </div>
            ))}
          </div>
          <div className={styles.advBlock}>
            {product.advantages && (
              <div className={styles.advantages}>
                <div className={styles.advTitle}>Преимущества</div>
                <div>{product.advantages}</div>
              </div>
            )}
            {product.disadvantages && (
              <div className={styles.disadvantages}>
                <div className={styles.advTitle}>Недостатки</div>
                <div>{product.disadvantages}</div>
              </div>
            )}
          </div>
          <Divider className={cn(styles.hr, styles.hr2)} />
          <div className={styles.actions}>
            <Button appearance="primary">Узнать подробнее</Button>
            <Button
              className={styles.reviewButton}
              appearance="ghost"
              arrow={isReviewOpened ? 'down' : 'right'}
              onClick={() => setIsReviewOpened(!isReviewOpened)}
            >
              Читать отзывы
            </Button>
          </div>
        </Card>
        <motion.div animate={isReviewOpened ? 'visible' : 'hidden'} variants={variants} initial='hidden'>
          <Card color={'blue'} className={styles.reviews} ref={reviewRef}>
            {product.reviews.map((item) => (
              <div key={item._id}>
                <Review key={item._id} review={item} />
                <Divider />
              </div>
            ))}
            <ReviewForm productId={product._id} />
          </Card>
        </motion.div>
      </div>
    );
  })
);

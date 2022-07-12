import React, { useState } from 'react';
import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { TextArea } from '../TextArea/TextArea';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';
import { Controller, useForm } from 'react-hook-form';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';

export const ReviewForm = ({ productId, isOpened, className, ...props }: ReviewFormProps): JSX.Element => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
  } = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, { ...formData, productId });
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError('что то пошлое не так!');
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          {...register('name', { required: { value: true, message: 'Заполните имя' } })}
          placeholder="Имя"
          error={errors.name}
          tabIndex={isOpened ? 0 : -1}
        />
        <Input
          {...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
          placeholder="Заголовок отзыва"
          className={styles.titleInput}
          error={errors.title}
          tabIndex={isOpened ? 0 : -1}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{ required: { value: true, message: 'Заполните рейтинг' } }}
            render={({ field }) => (
              <Rating
                isEditable
                error={errors.rating}
                ref={field.ref}
                rating={field.value}
                setRating={field.onChange}
                tabIndex={isOpened ? 0 : -1}
              />
            )}
          />
        </div>
        <TextArea
          {...register('description', { required: { value: true, message: 'Заполните отзыв' } })}
          placeholder="Текст отзыва"
          className={styles.description}
          error={errors.description}
          tabIndex={isOpened ? 0 : -1}
        />
        <div className={styles.submit}>
          <Button appearance="primary" tabIndex={isOpened ? 0 : -1}>Отправить</Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      {isSuccess && (
        <div className={cn(styles.panel, styles.success)}>
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div>Спасибо. ваш отзыв будет опубликован после проверки!</div>
          <CloseIcon onClick={() => setIsSuccess(false)} className={styles.closeIcon} />
        </div>
      )}
      {error && (
        <div className={cn(styles.panel, styles.error)}>
          Что то пошло не так, попробуйте обновить страницу!
          {error}
          <CloseIcon onClick={() => setError(undefined)} className={styles.closeIcon} />
        </div>
      )}
    </form>
  );
};

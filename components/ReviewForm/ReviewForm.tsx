import React from 'react';
import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { TextArea } from '../TextArea/TextArea';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';
import { Controller, useForm } from 'react-hook-form';
import { IReviewForm } from './ReviewForm.interface';

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
  const { handleSubmit, register, control, formState: { errors } } = useForm<IReviewForm>();

  const onSubmit = (data: IReviewForm) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input 
          {...register('name', { required: {value: true, message: 'Заполните имя'} })} 
          placeholder="Имя" 
          error={errors.name}
        />
        <Input 
          {...register('title', { required: {value: true, message: 'Заполните заголовок'} })} 
          placeholder="Заголовок отзыва" 
          className={styles.titleInput} 
          error={errors.title}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
						rules={{required: {value: true, message: 'Заполните рейтинг'}}}
            render={({ field }) => <Rating isEditable error={errors.rating} ref={field.ref} rating={field.value} setRating={field.onChange} />}
          />
        </div>
        <TextArea 
          {...register('description', { required: {value: true, message: 'Заполните отзыв'} })} 
          placeholder="Текст отзыва" 
          className={styles.description} 
          error={errors.description}/>
        <div className={styles.submit}>
          <Button appearance="primary">Отправить</Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      <div className={styles.success}>
        <div className={styles.successTitle}>Ваш отзыв отправлен</div>
        <div>Спасибо. ваш отзыв будет опубликован после проверки!</div>
        <CloseIcon className={styles.closeIcon} />
      </div>
    </form>
  );
};

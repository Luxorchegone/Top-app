import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ReviewsModel } from '../../interfaces/product.interface';

export interface ReviewProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  review: ReviewsModel;
}

import React, { useState } from 'react';
import { Htag, Button, Ptag, Tag, Rating} from '../components';
import { withLayout } from '../layout/Layout';

function Home(): JSX.Element {
  const [rating, setRating] = useState<number>(4);

  return (
    <>
      <Htag tag='h1'>Например</Htag>
      <Button arrow={'right'} appearance='primary' className='testdff'>Это кнопка</Button>
      <Button arrow={'right'} appearance='ghost'>Это кнопка</Button>
      <Ptag size={'s'}>
        Маленький
      </Ptag>
      <Ptag size={'m'}>
        Средний
      </Ptag>
      <Ptag size={'l'}>
        Большой
      </Ptag>
			<Tag size='m' color='red'>Проверяем тег</Tag>
			<Tag size='s' color='ghost'>Проверяем тег</Tag>
			<Tag color='green'>Проверяем тег</Tag>

      <Rating rating={rating} isEditable setRating={setRating}/>
    </>
  );
}

export default withLayout(Home);

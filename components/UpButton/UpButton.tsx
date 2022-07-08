import React, { useEffect } from 'react';
import styles from './UpButton.module.css';

import { useScrollY } from '../../hooks/useScrollY';
import { useAnimation, motion} from 'framer-motion';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';

export const UpButton = (): JSX.Element => {
	const controls = useAnimation();
	const y = useScrollY();

	useEffect(()=> {
		controls.start({ opacity: y / document.body.scrollHeight });
	}, [y, controls])

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<motion.div 
			className={styles.upButton} 
			animate={controls}
			initial={{opacity: 0}}>
			<ButtonIcon appearance='primary' icon='up' onClick={scrollToTop}/>
		</motion.div>
	);
};

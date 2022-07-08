import React, { useEffect } from 'react';
import styles from './UpButton.module.css';
import UpIcon from './Up.svg';
import { useScrollY } from '../../hooks/useScrollY';
import { useAnimation, motion} from 'framer-motion';

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
		<motion.button 
			className={styles.upButton} 
			onClick={scrollToTop}
			animate={controls}
			initial={{opacity: 0}}>
			<UpIcon />
		</motion.button>
	);
};

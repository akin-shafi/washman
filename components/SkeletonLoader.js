// components/SkeletonLoader.js
import styles from "@/styles/SkeletonLoader.module.css"; // You can style this with CSS

const SkeletonLoader = () => {
	return (
		<div className={styles.skeletonWrapper}>
			{Array.from({ length: 5 }).map((_, index) => (
				<div
					key={index}
					className={styles.skeletonItem}>
					<div className={styles.skeletonText}></div>
					<div className={styles.skeletonText}></div>
					<div className={styles.skeletonAction}></div>
				</div>
			))}
		</div>
	);
};

export default SkeletonLoader;

import { Text } from 'components/text';
import clsx from 'clsx';
import styles from './Button.module.scss';

export const Button = ({
	title,
	onClick,
	type,
	className,
}: {
	title: string;
	onClick?: () => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
	className?: string;
}) => {
	return (
		<button
			className={clsx(styles.button, className)}
			type={type}
			onClick={onClick}>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import React, { useState, useRef, useEffect } from 'react';
import button_styles from '../button/Button.module.scss';
import styles from './ArticleParamsForm.module.scss';
import { Select } from '../select';
import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text';
import clsx from 'clsx';

export type ArticleStyle = {
	fontFamilyOption: OptionType;
	fontSizeOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
};

export interface ArticleParamsFormProps {
	onStyleChange: (newStyle: ArticleStyle) => void;
	onStyleReset: () => void;
}

export const ArticleParamsForm = ({
	onStyleChange,
	onStyleReset,
}: ArticleParamsFormProps) => {
	// Создаем состояние для управления видимостью формы
	const [isFormOpen, setFormOpen] = useState(false);

	const [selectedFont, setSelectedFont] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [selectedSize, setSelectedSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] =
		useState<OptionType>(defaultArticleState.backgroundColor);
	const [selectedWidthArr, setSelectedWidthArr] = useState<OptionType>(
		defaultArticleState.contentWidth
	);
	const handleWidthArrChange = (option: OptionType) => {
		setSelectedWidthArr(option);
	};
	const handleBackgroundColorChange = (option: OptionType) => {
		setSelectedBackgroundColor(option);
	};
	const handleFontColorChange = (option: OptionType) => {
		setSelectedFontColor(option);
	};
	const handleFontChange = (option: OptionType) => {
		setSelectedFont(option);
	};
	const handleFontSizeChange = (option: OptionType) => {
		setSelectedSize(option);
	};

	const formRef = useRef<HTMLDivElement>(null); // Создаем ref для формы

	// Функция для переключения состояния формы
	const toggleForm = () => {
		setFormOpen(!isFormOpen);
	};

	// Подписываемся на событие клика по документу
	useEffect(() => {
		// Функция для обработки клика вне формы
		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setFormOpen(false); // Закрыть форму
			}
		};
		// Если форма открыта, подписываемся на событие
		if (isFormOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		// Возвращаем функцию для очистки эффекта
		return () => {
			// Удаляем обработчик события при размонтировании компонента
			// или если форма закрыта
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isFormOpen]); // Зависимость от состояния формы

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onStyleChange({
			fontFamilyOption: selectedFont,
			fontSizeOption: selectedSize,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedWidthArr,
		});
	};

	// Обработчик события сброса формы
	const handleReset = () => {
		// Сбросить выбранные параметры до начальных значений
		setSelectedFont(defaultArticleState.fontFamilyOption);
		setSelectedSize(defaultArticleState.fontSizeOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedWidthArr(defaultArticleState.contentWidth);

		// Вызвать функцию onStyleReset для применения начальных стилей к статье
		onStyleReset();
	};

	return (
		<>
			<ArrowButton onClick={toggleForm} isOpen={isFormOpen} />
			<aside
				ref={formRef}
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				{isFormOpen && (
					<form
						className={clsx(styles.form)}
						onSubmit={handleSubmit}
						onReset={handleReset}>
						<Text as='h2' size={31} weight={800} align='left' uppercase>
							Задайте параметры
						</Text>
						<Select
							options={fontFamilyOptions}
							title='Шрифт'
							selected={selectedFont}
							onChange={handleFontChange}
						/>
						<RadioGroup
							title='размер шрифта'
							options={fontSizeOptions}
							selected={selectedSize}
							onChange={handleFontSizeChange}
							name=''
						/>
						<Select
							options={fontColors}
							title='цвет шрифта'
							selected={selectedFontColor}
							onChange={handleFontColorChange}
						/>
						<Separator />
						<Select
							options={backgroundColors}
							title='цвет фона'
							selected={selectedBackgroundColor}
							onChange={handleBackgroundColorChange}
						/>
						<Select
							options={contentWidthArr}
							title='ширина контента'
							selected={selectedWidthArr}
							onChange={handleWidthArrChange}
						/>
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								type='reset'
								className={button_styles.reset_button}
							/>
							<Button
								title='Применить'
								type='submit'
								className={button_styles.submit_button}
							/>
						</div>
					</form>
				)}
			</aside>
		</>
	);
};

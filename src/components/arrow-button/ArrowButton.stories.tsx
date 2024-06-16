import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton, OnClick } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;
const mockOnClick: OnClick = () => {
};

export const ArrowButtonStory: Story = {
	render: () => {
		return (
			<>
				<ArrowButton onClick={mockOnClick} isOpen ={false} />
			</>
		);
	},
};

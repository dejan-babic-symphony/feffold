import { Meta, StoryObj } from '@storybook/react';
import { App } from '../App';

export default {
  component: App,
  title: 'example/App',
  tags: ['example'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof App>;

type Story = StoryObj<typeof App>;

export const Default: Story = {};

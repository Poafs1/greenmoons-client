import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import Button from './index';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  argTypes: {
    label: {
      control: 'text',
      description: 'Button label',
    },
    variant: {
      options: ['text', 'contained'],
      control: { type: 'select' },
      description: 'Button variant',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width button',
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
      description: 'Button size',
    },
    type: {
      description: 'Button type',
    },
    href: {
      control: 'text',
      description: 'Button href',
    },
    appearance: {
      options: ['primary', 'secondary'],
      control: { type: 'select' },
      description: 'Button appearance',
    },
    startIcon: {
      description: 'Start icon',
    },
    endIcon: {
      description: 'End icon',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button',
    },
    onClick: {
      action: 'clicked',
      description: 'Button onClick event',
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Button> = {
  args: {
    label: 'Button',
  },
  render: (args) => <Button {...args} />,
};

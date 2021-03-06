import React from 'react';
import { text } from '@storybook/addon-knobs';
import ErrorMessage from '.';

export default {
  title: 'ErrorMessage',
  id: __filename,
};

export const primaryType = () => (
  <ErrorMessage errorMessage={text('Error Message:', 'There was an error!')} />
);

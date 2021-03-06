import React from 'react';
import { action } from '@storybook/addon-actions';
import MobileSyncPage from './mobile-sync.component';

export default {
  title: 'Mobile Sync',
  id: __filename,
};

export const MobileSyncComponent = () => {
  return (
    <MobileSyncPage requestRevealSeedWords={action('Mobile Sync Requested')} />
  );
};

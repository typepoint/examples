import * as React from 'react';
import { TypePointClient } from '@typepoint/client';
import { TypePointProvider } from '@typepoint/react';
import { App } from './app';

const client = new TypePointClient({
  server: 'http://localhost:3001',
});

export const AppWithProviders = React.memo(() => (
  <TypePointProvider client={client}>
    <App />
  </TypePointProvider>
));

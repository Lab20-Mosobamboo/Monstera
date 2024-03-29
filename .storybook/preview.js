/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    backgrounds: {
      default: 'light',
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;

import { withRouter } from 'storybook-addon-react-router-v6';

export const decorators = [withRouter];

export const parameters = {
  reactRouter: {
    routePath: '/',
  },
};

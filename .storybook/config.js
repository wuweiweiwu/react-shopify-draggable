/* eslint-disable import/no-extraneous-dependencies */
import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
  name: 'React Letter Morph',
  url: 'https://github.com/wuweiweiwu/react-letter-morph',
});

function loadStories() {
  // eslint-disable-next-line global-require
  require('../examples/storybooks');
}

configure(loadStories, module);

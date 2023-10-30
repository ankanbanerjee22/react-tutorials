import React from 'react';
import { action } from '@storybook/addon-actions';
import SearchBox from '../components/SearchBox';

export default {
  title: 'Movie Search Box',
  component: SearchBox,
};

const Template = (args) => <SearchBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  initialQuery: '',
  onSearch: action('Search Button Clicked'),
};

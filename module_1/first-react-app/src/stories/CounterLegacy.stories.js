import React from 'react';
import CounterLegacy from '../components/CounterLegacy';

export default {
  title: 'Counter',
  component: CounterLegacy,
};

export const Default = () => {
  return <CounterLegacy initialValue={0} />;
};
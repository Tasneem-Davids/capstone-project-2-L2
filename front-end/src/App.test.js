import { expect } from 'chai';
import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';
import onSearch from './utils/index';

test('renders correctly', () => {
  const tree = renderer
  .create(<App />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});


test('API should fetch data from server', async () => {
  const name = "Justin Bieber"
  onSearch("/get/" + name)
  .then((response) => {
    expect(response.results.artistName).toBe(name);
  })
  .catch(err => console.log(err))
})
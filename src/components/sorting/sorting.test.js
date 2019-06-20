import React from 'react';
import renderer from 'react-test-renderer';

import Sorting from './sorting.jsx';


it(`Sorting correctly renders`, () => {
  const sorting = renderer
    .create(<Sorting
      activeOption={{
        id: `test`,
        text: `test`
      }}
      isOpen={true}
      onChange={jest.fn()}
      onClick={jest.fn()}
      options={[{
        id: `test`,
        text: `test`
      }]}
    />)
    .toJSON();

  expect(sorting).toMatchSnapshot();
});

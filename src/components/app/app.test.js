import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallowToJson} from 'enzyme-to-json';

Enzyme.configure({adapter: new Adapter()});

import {App} from './app.jsx';

describe(`App Component`, () => {
  it(`App correctly renders`, () => {
    const app = shallow(<App
      places={[
        {id: 1},
        {id: 2}
      ]}
    />);

    expect(shallowToJson(app)).toMatchSnapshot();
  });
});

import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withActiveItem from './with-active-item';


Enzyme.configure({adapter: new Adapter()});


const MockComponent = () => <div />;
const WithActiveItem = withActiveItem(MockComponent);


it(`Should set activeItem`, () => {
  const component = shallow(<WithActiveItem />);

  expect(component.state().activeItem).toEqual(``);

  component.props().setActiveItem(`TestItem`);
  expect(component.state().activeItem).toEqual(`TestItem`);
});

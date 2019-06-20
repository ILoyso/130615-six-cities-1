import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withOpening from './with-opening';


configure({adapter: new Adapter()});


const MockComponent = () => <div />;
const MockComponentWrapped = withOpening(MockComponent);


describe(`withOpening`, () => {
  it(`Change state isOpen correctly works`, () => {
    const component = shallow(<MockComponentWrapped/>);

    expect(component.state().isOpen).toEqual(false);

    component.props().onClick();
    expect(component.state().isOpen).toEqual(true);

    component.props().onClick();
    expect(component.state().isOpen).toEqual(false);
  });
});

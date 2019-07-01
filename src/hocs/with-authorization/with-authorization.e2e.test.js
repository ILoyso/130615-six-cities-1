import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {withAuthorization} from './with-authorization';


configure({adapter: new Adapter()});


const MockComponent = () => <div />;
const MockComponentWrapped = withAuthorization(MockComponent);


describe(`withAuthorization`, () => {
  it(`Should change value when call onChange`, () => {
    const wrapper = shallow(<MockComponentWrapped
      onLogIn={jest.fn()}
    />);

    expect(wrapper.props().user.email).toEqual(``);
    expect(wrapper.props().user.password).toEqual(``);

    wrapper.props().onChange({
      target: {
        name: `email`,
        value: `email@email.ru`,
      }
    });
    expect(wrapper.props().user.email).toEqual(`email@email.ru`);
    expect(wrapper.props().user.password).toEqual(``);

    wrapper.props().onChange({
      target: {
        name: `password`,
        value: `testPass`,
      }
    });
    expect(wrapper.props().user.email).toEqual(`email@email.ru`);
    expect(wrapper.props().user.password).toEqual(`testPass`);
  });

});

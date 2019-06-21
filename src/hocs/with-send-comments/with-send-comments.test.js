import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {withSendComments} from './with-send-comments';


configure({adapter: new Adapter()});


const MockComponent = () => <div />;
const MockComponentWrapped = withSendComments(MockComponent);


describe(`withSendComments`, () => {
  it(`Should change value when call onChange`, () => {
    const wrapper = shallow(<MockComponentWrapped
      onSendComment={jest.fn()}
    />);

    expect(wrapper.props().rating).toEqual(``);
    expect(wrapper.props().review).toEqual(``);

    wrapper.props().onChange({
      target: {
        name: `rating`,
        value: `5`,
      }
    });
    expect(wrapper.props().rating).toEqual(`5`);
    expect(wrapper.props().review).toEqual(``);

    wrapper.props().onChange({
      target: {
        name: `review`,
        value: `Test review text`,
      }
    });
    expect(wrapper.props().rating).toEqual(`5`);
    expect(wrapper.props().review).toEqual(`Test review text`);
  });
});

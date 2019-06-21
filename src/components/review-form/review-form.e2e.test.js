import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ReviewForm from './review-form.jsx';


Enzyme.configure({adapter: new Adapter()});


describe(`ReviewForm Component`, () => {
  it(`Click on Submit button correctly works`, () => {
    const onSendComment = jest.fn();

    const reviewForm = shallow(<ReviewForm
      id={5}
      onChange={jest.fn()}
      onSendComment={onSendComment}
      rating={`3`}
      review={`test`}
    />);

    const button = reviewForm.find(`.reviews__submit`);
    button.simulate(`click`);

    expect(onSendComment).toHaveBeenCalledTimes(1);
  });

  it(`Function for change form fields correctly works`, () => {
    const onChange = jest.fn();

    const reviewForm = shallow(<ReviewForm
      id={5}
      onChange={onChange}
      onSendComment={jest.fn()}
      rating={`3`}
      review={`test`}
    />);

    const radios = reviewForm.find(`.form__rating-input`);
    const firstRadio = radios.at(0);
    const secondRadio = radios.at(1);

    firstRadio.simulate(`change`);
    expect(onChange).toHaveBeenCalledTimes(1);

    secondRadio.simulate(`change`);
    expect(onChange).toHaveBeenCalledTimes(2);

    const textarea = reviewForm.find(`.reviews__textarea`);
    textarea.simulate(`change`);
    expect(onChange).toHaveBeenCalledTimes(3);
  });
});

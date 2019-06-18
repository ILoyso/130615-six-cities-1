import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SignIn from './sign-in.jsx';


Enzyme.configure({adapter: new Adapter()});


describe(`SignIn Component`, () => {
  it(`Click on Sign In button correctly works`, () => {
    const onLogIn = jest.fn();

    const singIn = shallow(<SignIn
      onChange={jest.fn()}
      onLogIn={onLogIn}
      user={{
        email: `test@test.com`,
        password: `password`
      }}
    />);

    const button = singIn.find(`.login__submit`);
    button.simulate(`click`);

    expect(onLogIn).toHaveBeenCalledTimes(1);
  });

  it(`Function for change input fields correctly works`, () => {
    const onChange = jest.fn();

    const singIn = shallow(<SignIn
      onChange={onChange}
      onLogIn={jest.fn()}
      user={{
        email: `test@test.com`,
        password: `password`
      }}
    />);

    const inputs = singIn.find(`.login__input`);
    const inputEmail = inputs.at(0);
    const inputPassword = inputs.at(1);

    inputEmail.simulate(`change`);
    expect(onChange).toHaveBeenCalledTimes(1);

    inputPassword.simulate(`change`);
    expect(onChange).toHaveBeenCalledTimes(2);
  });
});

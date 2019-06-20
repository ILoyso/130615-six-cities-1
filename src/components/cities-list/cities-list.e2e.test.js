import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CitiesList from './cities-list.jsx';


Enzyme.configure({adapter: new Adapter()});


describe(`CitiesList Component`, () => {
  it(`Click on cities correctly works`, () => {
    const changeCity = jest.fn();
    const changeSorting = jest.fn();

    const singIn = shallow(<CitiesList
      changeCity={changeCity}
      changeSorting={changeSorting}
      cities={[`Amsterdam`, `Amsterdam2`]}
      city={`Amsterdam`}
    />);

    const links = singIn.find(`.locations__item-link`);
    const firstLink = links.at(0);
    const secondLink = links.at(1);

    firstLink.simulate(`click`, {
      preventDefault: () => {}
    });
    expect(changeCity).toHaveBeenCalledTimes(1);
    expect(changeSorting).toHaveBeenCalledTimes(1);

    secondLink.simulate(`click`, {
      preventDefault: () => {}
    });
    expect(changeCity).toHaveBeenCalledTimes(2);
    expect(changeSorting).toHaveBeenCalledTimes(2);
  });
});

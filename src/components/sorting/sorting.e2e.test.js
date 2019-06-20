import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Sorting from './sorting.jsx';


Enzyme.configure({adapter: new Adapter()});

const optionsMock = {
  id: `test`,
  text: `test`
};


describe(`Sorting Component`, () => {
  it(`Click on sorting type correctly works`, () => {
    const onChange = jest.fn();
    const onClick = jest.fn();

    const sorting = shallow(<Sorting
      activeOption={optionsMock}
      isOpen={true}
      onChange={onChange}
      onClick={onClick}
      options={[optionsMock]}
    />);

    const sortingType = sorting.find(`.places__sorting-type`);
    sortingType.simulate(`click`);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it(`Click on sorting list item correctly works`, () => {
    const onChange = jest.fn();
    const onClick = jest.fn();

    const sorting = shallow(<Sorting
      activeOption={optionsMock}
      isOpen={true}
      onChange={onChange}
      onClick={onClick}
      options={[optionsMock]}
    />);

    const options = sorting.find(`.places__option`);
    const firstOption = options.at(0);

    firstOption.simulate(`click`);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

});

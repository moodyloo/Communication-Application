import React from 'react';
import SelectionEntry from '../SelectionEntry.js';

import { configure,mount ,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Selection Entry renders correctly', () => {
  const wrapper = shallow(<SelectionEntry binder={jest.fn()} label='Test' data={[]}/>);
  expect(wrapper).toMatchSnapshot();
});

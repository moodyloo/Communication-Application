import React from 'react';
import MessageModal from '../MessageModal.js';

import { configure,mount ,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Message Modal renders correctly', () => {
  const wrapper = shallow(<MessageModal/>);
  expect(wrapper).toMatchSnapshot();
});

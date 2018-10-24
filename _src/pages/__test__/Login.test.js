import React from 'react';
import Login from '../Login.js';

import { configure,mount ,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Login page renders correctly', () => {
  const wrapper = shallow(<Login/>);
  expect(wrapper).toMatchSnapshot();
});

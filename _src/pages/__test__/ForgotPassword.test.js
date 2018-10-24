import React from 'react';
import ForgotPassword from '../ForgotPassword.js';

import { configure,mount ,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Forgot password page renders correctly', () => {
  const wrapper = shallow(<ForgotPassword/>);
  expect(wrapper).toMatchSnapshot();
});

import React from 'react';
import LoginBox from '../LoginBox.js';
import {Redirect} from 'react-router-dom';

import { configure,mount ,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Login Box renders correctly', () => {
  const wrapper = shallow(<LoginBox login={jest.fn()} loggedin={jest.fn()}/>);
  expect(wrapper).toMatchSnapshot();
});

test('handleSubmit function works',() => {
  const mk = jest.fn();
  const wrapper = shallow(<LoginBox login={mk} loggedin={jest.fn()}/>);
  wrapper.instance().handleSubmit();
  expect(mk.mock.calls.length).toBe(1);
  expect(mk.mock.instances.length).toBe(1);
});

test('redirect to message page when logged in',() => {
  const wrapper = shallow(<LoginBox login={jest.fn()} loggedin={() => {return true;}}/>);
  expect(wrapper.contains(<Redirect to='/message' />)).toBe(true);
});

test('does not redirect to message page',() => {
  const wrapper = shallow(<LoginBox login={jest.fn()} loggedin={() => {return false;}}/>);
  expect(wrapper.contains(<Redirect to='/message' />)).not.toBe(true);
});

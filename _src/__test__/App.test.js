import React from 'react';
import App from '../App.js';

import { configure,mount ,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('form page renders correctly', () => {
  const wrapper = shallow(<App/>);
  expect(wrapper).toMatchSnapshot();
});

test.skip('logout function works',() => {
  const wrapper = mount(<App/>);
  wrapper.setState({loggedin:true});
  expect(wrapper.instance().loggedin()).toBe(true);
  wrapper.instance().logout();
  expect(wrapper.instance().loggedin()).toBe(false);
});

test.skip('login function works',() => {
  const wrapper = mount(<App/>);
  const mockCallback = jest.fn();
  wrapper.instance().login(mockCallback);
  //mock function called once
  expect(mockCallback.mock.calls.length).toBe(1);
  //first argument of the call to be true
  expect(mockCallback.mock.calls[0][0]).toBe(true);
  //mock function instantiated once
  expect(mockCallback.mock.instances.length).toBe(1);
});

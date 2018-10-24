import React from 'react';
import Header from '../Header.js';

import { configure,mount ,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Header renders correctly', () => {
  const wrapper = shallow(<Header/>);
  expect(wrapper).toMatchSnapshot();
});

test('logout function works',() => {
  const mockCallback = jest.fn();
  const wrapper = shallow(<Header/>);
  wrapper.setState({loggedin:true,logout:mockCallback});
  wrapper.instance().logout();
  expect(wrapper.state('loggedin')).toBe(false);
  expect(mockCallback.mock.calls.length).toBe(1);
  expect(mockCallback.mock.instances.length).toBe(1);
});

test('header display correct text when logged in, and logged out',() => {
  const wrapper = shallow(<Header/>);
  wrapper.setState({loggedin:true});
  expect(wrapper.children().length).toBe(2);
  wrapper.setState({loggedin:false});
  expect(wrapper.children().length).toBe(1);
});

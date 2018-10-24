import React from 'react';
import MessageInput from '../MessageInput.js';

import { configure,mount ,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Message input renders correctly', () => {
  const wrapper = shallow(<MessageInput cbSelection={jest.fn()}/>);
  expect(wrapper).toMatchSnapshot();
});

test('bindTitle works',() => {
  const wrapper = shallow(<MessageInput cbSelection={jest.fn()}/>);
  wrapper.setState({title:'it works!'});
  expect(wrapper.instance().bindTitle()).toBe('it works!');
});

test('bindMessage works',() => {
  const wrapper = shallow(<MessageInput cbSelection={jest.fn()}/>);
  wrapper.setState({message:'it works again!'});
  expect(wrapper.instance().bindMessage()).toBe('it works again!');
});

test('handleTitleChange works',() => {
  const wrapper = mount(<MessageInput cbSelection={jest.fn()}/>);
  const titleArea = wrapper.find('textarea').filterWhere(n => n.props().rows === '1');
  titleArea.simulate('change',{target:{value:'This is the title'}});
  expect(wrapper.state('title')).toBe('This is the title');
});

test('handleMessageChange works',() => {
  const wrapper = mount(<MessageInput cbSelection={jest.fn()}/>);
  const messageArea = wrapper.find('textarea').filterWhere(n => n.props().rows === '3');
  messageArea.simulate('change',{target:{value:'This is the the message that will be sent to the students'}});
  expect(wrapper.state('message')).toBe('This is the the message that will be sent to the students');
});

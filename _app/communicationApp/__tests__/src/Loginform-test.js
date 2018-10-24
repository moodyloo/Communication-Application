import 'react-native';
import React from 'react';
import LoginForm from '../../src/screens/LoginForm';
import Adapter from 'enzyme-adapter-react-16';
import { configure,mount ,shallow} from 'enzyme';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

test('renders correctly', () => {
  const wrapper = shallow(<LoginForm />);
  expect(wrapper).toMatchSnapshot();
});

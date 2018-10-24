import 'react-native';
import React from 'react';
import App from '../App';
import Adapter from 'enzyme-adapter-react-16';
import { configure,mount ,shallow} from 'enzyme';

// Note: test renderer must be required after react-native.

configure({ adapter: new Adapter() });

it('renders correctly', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});

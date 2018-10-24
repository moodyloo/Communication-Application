import 'react-native';
import React from 'react';
import Messages from '../../src/screens/Messages';
import Adapter from 'enzyme-adapter-react-16';
import { configure,mount ,shallow} from 'enzyme';
//import mock from 'react-native-mock';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

test('renders correctly', () => {
  //const params = { navigate: jest.fn() };
  const item = {
    state: {
      params:{
        item:{
          
        }}
    } };
  //const navigation = { navigate: jest.fn() };
  const wrapper = shallow(<Messages navigation={item}/>);
  expect(wrapper).toMatchSnapshot();
});

import React from 'react';
import SettingsModal from '../SettingsModal.js';

import { configure,mount ,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('settings modal renders correctly',() => {
  const wrapper = shallow(<SettingsModal settings={['1']} addAdmin={jest.fn()} deleteAdmin={jest.fn()}/>);
  expect(wrapper).toMatchSnapshot();
});

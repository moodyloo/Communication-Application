import React from 'react';
import HistoryModal from '../HistoryModal.js';

import { configure,mount ,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('history modal renders correctly',() => {
  const wrapper = shallow(<HistoryModal history={['1']} deleteHistory={jest.fn()}/>);
  expect(wrapper).toMatchSnapshot();
});

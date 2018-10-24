import React from 'react';
import FileEntry from '../FileEntry.js';

import { configure,mount ,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('FileEntry renders correctly', () => {
  const wrapper = shallow(<FileEntry/>);
  expect(wrapper).toMatchSnapshot();
});

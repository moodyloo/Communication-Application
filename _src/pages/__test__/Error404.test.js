import React from 'react';
import Error404 from '../Error404.js';

import { configure,mount ,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Error page renders correctly', () => {
  const wrapper = shallow(<Error404/>);
  expect(wrapper).toMatchSnapshot();
});

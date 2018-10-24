import React from 'react';
import MessageSettings from '../MessageSettings.js';
import renderer from 'react-test-renderer';

import { configure,mount ,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Message Settings renders correctly', () => {
  var states = {
    aYears: ['1'],
  };

  const wrapper = shallow(<MessageSettings cbSelection={jest.fn()} getState={() => {return states;}}/>);
  expect(wrapper).toMatchSnapshot();
});

test('all binding functions work', () => {
  const callBack = jest.fn();
  var states = {
    aYears: ['1'],
    oYears : ['1'],
    oProgrammes : ['1'],
    oPriority: ['1'],
    oStatus: ['1'],
    oTutor: ['1'],
    oBachelors: ['1'],
    oMasters: ['1'],
    oDate: ['1'],
    oNoProgrammes :['1'],
  };
  const wrapper = mount(<MessageSettings cbSelection={callBack} getState={() => {return states;}}/>);
  const priority = wrapper.find('select');
  priority.simulate('change',{target:{value:'test'}});
  expect(callBack.mock.calls.length).toBe(5);
  expect(callBack.mock.instances.length).toBe(5);
});

test('programme only contains master programmes when only year 4 is selected',() => {
  var states = {
    aYears: ['4'],
  };
  const wrapper = shallow(<MessageSettings cbSelection={jest.fn()} getState={() => {return states;}}/>);
  expect(wrapper.find('#masterProgramme').exists()).toBe(true);
  expect(wrapper.find('#allProgramme').exists()).toBe(false);
});

test('programme contains all programmes when only years below 4 is selected',() => {
  var states = {
    aYears: ['1,2,3'],
  };
  const wrapper = shallow(<MessageSettings cbSelection={jest.fn()} getState={() => {return states;}}/>);
  expect(wrapper.find('#masterProgramme').exists()).toBe(false);
  expect(wrapper.find('#allProgramme').exists()).toBe(true);
});

test('programme contains all programmes when all years are selected',() => {
  var states = {
    aYears: ['1,2,3,4'],
  };
  const wrapper = shallow(<MessageSettings cbSelection={jest.fn()} getState={() => {return states;}}/>);
  expect(wrapper.find('#masterProgramme').exists()).toBe(false);
  expect(wrapper.find('#allProgramme').exists()).toBe(true);
});

test('programme list contains no programmes when no years are selected',() => {
  var states = {
    aYears: [],
  };
  const wrapper = shallow(<MessageSettings cbSelection={jest.fn()} getState={() => {return states;}}/>);
  expect(wrapper.find('#masterProgramme').exists()).toBe(false);
  expect(wrapper.find('#allProgramme').exists()).toBe(false);
  expect(wrapper.find('#noProgramme').exists()).toBe(true);
});

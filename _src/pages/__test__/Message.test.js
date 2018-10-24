import React from 'react';
import Message from '../Message.js';

import { configure,mount ,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

var io = require('socket.io-client');
var dummyToken = {
  token: {
    access_token:
    'eyJ0eXAiOiJKV1QiLCJub25jZSI6IkFRQUJBQUFBQUFCSGg0a21TX2FLVDVYcmp6eFJBdEh6NzJITTRVMk1lVC1oUFhVeE52enZHM3BfeVVIM1BkR1owdDFLQzRJT3pkLW1JQ2hEZ3oxVFRITU55TTJTUnVpUjR2d1pYdUdEd0NBaFl1TUE0UTBKUVNBQSIsImFsZyI6…'
    ,expires_at:
    '2018-03-20T20:06:56.742Z'
    ,expires_in:
    3599
    ,ext_expires_in:
    0
    ,id_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o'
    ,refresh_token:
    'OAQABAAAAAABHh4kmS_aKT5XrjzxRAtHzbRcxOjDgcJmAFRJoBRiVvdu4EmmH_nctvEhc2Y5thnMZFetzoSSdZvWd5H6Ht6j3OLdOiB4poGh9JU5FYLGSdDUdjOEoMRra-toRrIz8PNq8SDSBKyYEXJQdroDaCEpGivru_2fIL0CpS9CIB3Lesp4DYrFP6hCWTpncO6Q…'
    ,scope:
    'Mail.Read User.Read'
    ,token_type:
    'Bearer'
  }
};

var socket = io('http://localhost:8002');

test('message page renders',()=>{
  const wrapper = shallow(<Message token={dummyToken} socket={socket}/>);
  expect(wrapper).toMatchSnapshot();
});

test('getState works', () => {
  const wrapper = shallow(<Message token={dummyToken} socket={socket}/>);
  expect(wrapper.instance().getState()).toBe(wrapper.state());
});

test('setSelection works', () => {
  const anonymousFunction = () => {return 'works!';};
  const wrapper = shallow(<Message token={dummyToken} socket={socket}/>);
  //set various different states
  wrapper.instance().setSelection({year:['1','2','3','4']});
  wrapper.instance().setSelection({priority:'High'});
  wrapper.instance().setSelection({masters: true});
  wrapper.instance().setSelection({getTutor:anonymousFunction});
  expect(wrapper.state('year')).toEqual(['1','2','3','4']);
  expect(wrapper.state('priority')).toBe('High');
  expect(wrapper.state('masters')).toBe(true);
  expect(wrapper.state('getTutor')).toBe(anonymousFunction);
});

test.skip('handleSubmit works',() => {
  const wrapper = shallow(<Message token={dummyToken} socket={socket}/>);
});

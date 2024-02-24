
import React from 'react';
import { render, screen, fireEvent,within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers
import Userlist from './UserList';
import renderer from 'react-test-renderer';
const fackUserList = [{
    useremail: "rmsyadav567@gmail.com",
    username: "Ramashankar Kumar",
    usermobileno: "8227914199",
  
}];
 const errorSpy = jest.spyOn(global.console, 'error');
 const logSpy = jest.spyOn(global.console, 'log');
 logSpy.mockImplementation(()=>null);
 errorSpy.mockImplementation(()=>null);

 it('List component snapshot testing ',()=>{

    const UserlistCMP = renderer.create(<Userlist></Userlist>).toJSON();
    expect(UserlistCMP).toMatchSnapshot();
  })
  

test('renders userlist component', () => {
  render(<Userlist />);
  expect(screen.getByText(/registered user list/i)).toBeInTheDocument();
});

test('check each user is rendering in the list',()=>{
    const {container} = render(<Userlist userList={fackUserList}/>);
    expect(container.querySelectorAll("tbody tr")).toHaveLength(1)
    
})

test('render the email and name of each user',()=>{
    render(<Userlist userList={fackUserList}/>);
    expect(screen.getByText(/Ramashankar Kumar/i)).toBeInTheDocument();
    
})
test('check the email and name phone filed is there or not',()=>{
    const {container} = render(<Userlist userList={fackUserList}/>);
    expect(container.querySelectorAll("tbody tr td")).toHaveLength(3)
    
})

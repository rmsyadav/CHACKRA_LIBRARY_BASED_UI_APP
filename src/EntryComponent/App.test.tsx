// import { render, screen } from '@testing-library/react';
// import App from "./App";
// import Userform from './UserForm.jsx';
// import Userlist from './UserList.jsx';

// jest.mock("./UserForm.jsx");
// jest.mock("./UserList.jsx");

// test("check child componet called",()=>{
//    render(<App></App>);
//    expect(Userform).toHaveBeenCalled();
//    expect(Userlist).toHaveBeenCalled();

// })
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers
import App from './App';

// afterEach(() => {
//    jest.resetAllMocks();
//  });
//  afterAll(() => {
//    jest.clearAllMocks();
//  });

 const errorSpy = jest.spyOn(global.console, 'error');
 const logSpy = jest.spyOn(global.console, 'log');
 logSpy.mockImplementation(()=>null);
 errorSpy.mockImplementation(()=>null);

test('renders App component', () => {
  render(<App />);
  
  // You can add more specific assertions based on your component structure
  expect(screen.getByTestId('user-form')).toBeInTheDocument();
  expect(screen.getByTestId('user-list')).toBeInTheDocument();
});

test('adds user to the list on form submission', () => {
  render(<App />);
  
  // Assuming that the form input fields have appropriate labels and placeholders
  fireEvent.change(screen.getAllByTestId("textbox")[0], { target: { value: 'John Doe' } });
  fireEvent.change(screen.getAllByTestId("textbox")[1], { target: { value: 'john@example.com' } });
  fireEvent.click(screen.getByTestId("submitbtn"));

  // Check if the user is added to the list
  expect(screen.getByTestId('user-list')).toHaveTextContent('John Doe');
});

// Add more test cases to cover different scenarios and edge cases

// Example: Test what happens when the form is submitted without entering data

// Example: Test if the user list is updated when saveUserData is called

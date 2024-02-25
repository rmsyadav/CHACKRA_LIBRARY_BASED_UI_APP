/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Userform from './UserForm';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter, MemoryRouter} from 'react-router-dom';
import { mockUseLocationType } from '../../Types';

jest.mock('./App');

const mockUseLocationValue:mockUseLocationType = {
    pathname: "/",
    search: '',
    hash: '',
    state: {pageName:""}
}
jest.mock('react-router-dom', () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: jest.fn().mockImplementation(() => {
        return mockUseLocationValue;
    })
}));

afterAll(() => {
	jest.resetAllMocks();
});
afterAll(() => {
	jest.clearAllMocks();
});

const errorSpy = jest.spyOn(global.console, 'error');
const logSpy = jest.spyOn(global.console, 'log');
logSpy.mockImplementation(() => null);
errorSpy.mockImplementation(() => null);

describe('testing Userform component =>', () => {
	it('List component snapshot testing', () => {
		const UserformCMP: React.ReactElement = renderer.create(<Userform></Userform>).toJSON();
		expect(UserformCMP).toMatchSnapshot();
	});

	test('should form element exist', () => {
		render(
			<BrowserRouter>
				<Userform></Userform>
			</BrowserRouter>
		);
		const formInputControl = screen.getAllByTestId('textbox');
		const button = screen.getByTestId('submitbtn');
		expect(formInputControl).toHaveLength(3);
		expect(button).toBeInTheDocument();
	});

	test('should form input control taking value', async () => {
        mockUseLocationValue.state = {
            pageName:"adduser",

        };
		render(
			<BrowserRouter>
				<Userform></Userform>
			</BrowserRouter>
		);
		const formInputControl = screen.getAllByTestId('textbox');
		await act(async () => {
			await userEvent.type(formInputControl[0], 'Ramashankar Kumar');
		});
		expect(formInputControl[0]).toHaveValue('Ramashankar Kumar');
		await userEvent.type(formInputControl[1], 'rmsyadav567@gmail.com');

		expect(formInputControl[1]).toHaveValue('rmsyadav567@gmail.com');
		await act(async () => {
			await userEvent.type(formInputControl[2], '8227914199');
		});
		expect(formInputControl[2]).toHaveValue('8227914199');
	});

	test('should handle the submit button=>', async () => {
		render(
			<MemoryRouter>
				<Userform></Userform>
			</MemoryRouter>
		);
		const button = screen.getByTestId('submitbtn');
		await act(async () => {
			await userEvent.click(button);
		});
	});
});

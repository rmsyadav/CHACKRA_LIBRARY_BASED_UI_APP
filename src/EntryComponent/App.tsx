import { argType } from '../Components/UserFormComponents/UserForm';
import { useState } from 'react';
import Routescmp from '../Routes/Routescmp';
import { usersContext } from '../ContextStore/ContextStore';
import { Provider } from 'react-redux';
import { store, persistor } from '../ReduxStore/reduxStore';
import { PersistGate } from 'redux-persist/integration/react';
import Spinercmp from '../Components/SpinnerCmp';
//import styled from '@emotion/styled';

function App(): React.ReactElement {
	const [usersList, setUsersList] = useState<argType[]>((): argType[] => {
		const localStorageData = localStorage.getItem('users') || '[]';
		return JSON.parse(localStorageData);
	});
	function saveUserData(userData: argType) {
		setUsersList((prevState) => {
			localStorage.setItem('users', JSON.stringify([...prevState, userData]));
			return [...prevState, userData];
		});
	}
	function handleDelUser(id: String) {
		setUsersList((prev: argType[]) => {
			const newUserList = prev.filter((user: argType) => user.id !== id);
			localStorage.setItem('users', JSON.stringify(newUserList));
			return [...newUserList];
		});
	}

	function handleUpdateUser(user: argType) {
		setUsersList((prev: argType[]) => {
			const updatedUserList = prev.map((use: argType) => {
				if (use?.id === user?.id) {
					use.useremail = user.useremail;
					use.usermobileno = user.usermobileno;
					use.username = user.username;
				}
				return use;
			});
			localStorage.setItem('users', JSON.stringify(updatedUserList));
			return [...updatedUserList];
		});
	}

	//   const H1 = styled.h1`
	//   color:${(props)=>(props.primary? 'turquoise':'hotpink')};
	//   `
	// 	const Button = styled.button`
	// 		color: ${(props) => (props.primary ? 'hotpink' : 'turquoise')};
	// 	`;

	// 	const Container = styled.div(props => ({
	//     display: 'flex',
	//     flexDirection: props.column && 'column'
	//   }))
	//   const Section = styled.section`
	//   background: #333;
	//   color: #fff;
	// `

	// this component has the same styles as Section but it renders an aside
	//const Aside = Section.withComponent('aside')

	return (
		<main>
			<Provider store={store}>
				<PersistGate loading={<Spinercmp></Spinercmp>} persistor={persistor}>
					<usersContext.Provider
						value={{
							usersList,
							handleAddUser: saveUserData,
							handleDelUser: handleDelUser,
							handleUpdateUser: handleUpdateUser,
						}}
					>
						<Routescmp></Routescmp>
					</usersContext.Provider>
				</PersistGate>
			</Provider>
		</main>
	);
}

export default App;

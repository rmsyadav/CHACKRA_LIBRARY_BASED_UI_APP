import { useState } from 'react';
import Routescmp from '../Routes/Routescmp';
import { Provider } from 'react-redux';
import { store, persistor } from '../ReduxStore/reduxStore';
import { PersistGate } from 'redux-persist/integration/react';
import Spinercmp from '../Components/SpinnerCmp';
import { pageContext } from '../ContextStore/ContextStore';

//import styled from '@emotion/styled';

function App(): React.ReactElement {
	const [currentPage, setCurrentPage] = useState<string>("adduser");
	const [previousPage, setPreviousPage] = useState<string>("");

	function addCurrentAndPrevPage(currenPage:string,previousPage:string) {
		setCurrentPage(currenPage);
		setPreviousPage(previousPage);
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
					<pageContext.Provider
						value={{
							currentPage,
							previousPage,
							addCurrentAndPrevPage: addCurrentAndPrevPage
						}}
					>
						<Routescmp></Routescmp>
					</pageContext.Provider>
				</PersistGate>
			</Provider>
		</main>
	);
}

export default App;

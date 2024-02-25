import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import AirbnbCard from "../Components/MoviesComponents/MoviesCard";
import Userform from "../Components/UserFormComponents/UserForm";
import Userlist from "../Components/UsersListComponents/UserList";
import NoMatch from "../Components/Notfoundcmp";
import { Flex,Box,Spacer } from '@chakra-ui/react';
import Navbar from "./Navbar";

const Routescmp =():React.ReactElement=>{
    return<>
      <Router>
      <Flex>
				<Box p="4" bg="red.400">
					Chackra UI
				</Box>
				<Spacer bg="blue.400"/>
				<Box p="4" bg="green.400">
				   <Navbar></Navbar>
				</Box>
			</Flex>
        <Routes>
        <Route path="/" element={<Userform/>} />
        <Route path="/userlist" element={<Userlist/>}/>
        <Route path="/card" element={<AirbnbCard />} />
        <Route path="/updateuser" element={<Userform/>} />
        <Route path="*" element={<NoMatch></NoMatch>} />
      </Routes>
    </Router>
    </>
}

export default Routescmp;
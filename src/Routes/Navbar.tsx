import { ChevronRightIcon } from '@chakra-ui/icons';
import {
	Breadcrumb,
	BreadcrumbItem
} from '@chakra-ui/react';
import {  NavLink } from 'react-router-dom';

const Navbar = () => {
	return (
		<>
			<Breadcrumb
				spacing="8px"
				separator={<ChevronRightIcon color="gray.500" />}
			>
				<BreadcrumbItem>
					<NavLink to="/" state={{pageName:"adduser"}}>ADD USER</NavLink>
				</BreadcrumbItem>

                <BreadcrumbItem>
                    <NavLink to="/userlist">USERLIST</NavLink>	
				</BreadcrumbItem>

                <BreadcrumbItem>
					<NavLink to="/updateuser" state={{pageName:"navbar"}}>UPDATE USER</NavLink>
				</BreadcrumbItem>

				<BreadcrumbItem>
                    <NavLink to="/card" state={{pageName:"card"}}>PRODUCT CARD</NavLink>
				</BreadcrumbItem>
			</Breadcrumb>
		</>
	);
};

export default Navbar;

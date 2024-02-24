import { Box, Checkbox,Flex } from '@chakra-ui/react';
import { DeleteIcon,EditIcon } from '@chakra-ui/icons';
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
} from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';
import { argType } from '../UserFormComponents/UserForm';
import React, { useContext, useState } from 'react';
import { usersContext, usersContextType } from '../../ContextStore/ContextStore';
import { useNavigate } from 'react-router-dom';
export type userListPropsType = {
	userList?: argType[];
	children?: React.ReactNode;
};
type useNevigateType = ReturnType<typeof useNavigate>;

const Userlist = (props: userListPropsType): React.ReactElement => {
	const navigate:useNevigateType = useNavigate();
	const usersDataContext: usersContextType | null = useContext(usersContext);
	const deleteUser = (userId: String | undefined) => {
		usersDataContext?.handleDelUser(userId || '');
	};
	const [tempUsersData, setTempUsersdata] = useState<String[]>([]);
	const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setTempUsersdata((prev: String[]) => {
				return [...prev, e.target.value];
			});
		} else {
			setTempUsersdata((prev: String[]) => {
				prev.splice(prev.indexOf(e.target.value), 1);
				return [...prev];
			});
		}
	};
	const checkUserChecked = (userId?: String) => {
		return tempUsersData.indexOf(userId || 'user') !== -1 ? false : true;
	};

	const handleCheckBoxChecked = (userId?: String) => {
		return tempUsersData.indexOf(userId || 'user') !== -1 ? true : false;
	};
    const handleUpdateRoute = (userid?: String)=>{
		navigate("/updateuser",{state:{userData:usersDataContext?.usersList.find((user,index,users)=>user.id === userid),pageName:'userlist'}});
	}
	return (
		<>
		   <Flex>
			<Box
				w="900px"
				borderWidth="1px"
				borderRadius="lg"
				overflow="hidden"
				m="auto"
				mt="15vh"
				data-testid="user-list"
			>
				<Accordion defaultIndex={[0]} allowMultiple>
					<AccordionItem>
						<h2>
							<AccordionButton>
								<Box as="span" flex="1" textAlign="left">
									Registered User List
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={4}>
							<TableContainer>
								<Table variant="simple">
									<TableCaption>All Registered Users Data</TableCaption>
									<Thead>
										<Tr>
											<Th></Th>
											<Th>UserName</Th>
											<Th>UserEmail</Th>
											<Th>MobilNo</Th>
											<Th></Th>
											<Th></Th>
										</Tr>
									</Thead>
									<Tbody>
										{usersDataContext?.usersList?.map(
											(userData: argType, index: number) => {
												return (
													<Tr key={index}>
														<td>
															<Checkbox
																value={userData.id?.toString() || 'not'}
																isChecked={handleCheckBoxChecked(userData.id)}
																onChange={(e) => {
																	handleCheckbox(e);
																}}
															></Checkbox>
														</td>
														<Td>{userData?.username}</Td>
														<Td>{userData?.useremail}</Td>
														<Td>{userData?.usermobileno}</Td>
														<td>
														<button
																disabled={checkUserChecked(userData.id)}
																onClick={() => {
																	// setTempUsersdata((prev: String[]) => {
																	// 	prev.splice(prev.indexOf(userData.id||"user"), 1);
																	// 	return [...prev];
																	// });
																	// deleteUser(userData.id?.toString());
																	handleUpdateRoute(userData.id);
																}}
																style={{
																	opacity: (() => {
																		return checkUserChecked(userData.id)
																			? '0.5'
																			: '1';
																	})(),
																}}
															>
																<EditIcon></EditIcon>
															</button>
														</td>
														<td>
															<button
																disabled={checkUserChecked(userData.id)}
																onClick={() => {
																	setTempUsersdata((prev: String[]) => {
																		prev.splice(prev.indexOf(userData.id||"user"), 1);
																		return [...prev];
																	});
																	deleteUser(userData.id?.toString());
																}}
																style={{
																	opacity: (() => {
																		return checkUserChecked(userData.id)
																			? '0.5'
																			: '1';
																	})(),
																}}
															>
																<DeleteIcon></DeleteIcon>
																
															</button>
														</td>
													</Tr>
												);
											}
										)}
									</Tbody>
								</Table>
							</TableContainer>
						</AccordionPanel>
					</AccordionItem>
				</Accordion>
			</Box>
			</Flex>
		</>
	);
};
export default Userlist;

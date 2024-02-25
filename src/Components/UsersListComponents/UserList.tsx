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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState, initialUserState } from '../../Types';
import { deleteExistingUser } from '../../Reducers/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
export type userListPropsType = {
	userList?: initialUserState[];
	children?: React.ReactNode;
};
type useNevigateType = ReturnType<typeof useNavigate>;

const Userlist = (props: userListPropsType): React.ReactElement => {
	const navigate:useNevigateType = useNavigate();
	const dispatch = useDispatch();
	const usersdata = useSelector<RootState,initialUserState[]>((state)=>state.usersReducer);
	const deleteUser = (userId: string) => {
		dispatch(deleteExistingUser(userId));
	};
	const [tempUsersData, setTempUsersdata] = useState<string[]>([]);
	const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setTempUsersdata((prev: string[]) => {
				return [...prev, e.target.value];
			});
		} else {
			setTempUsersdata((prev: string[]) => {
				prev.splice(prev.indexOf(e.target.value), 1);
				return [...prev];
			});
		}
	};
	const checkUserChecked = (userId: string) => {
		return tempUsersData.indexOf(userId || 'user') !== -1 ? false : true;
	};

	const handleCheckBoxChecked = (userId: string) => {
		return tempUsersData.indexOf(userId) !== -1 ? true : false;
	};
    const handleUpdateRoute = (userid: string)=>{
		navigate("/updateuser",{state:{userData:usersdata.find((user,index,users)=>user.userid === userid),pageName:'userlist'}});
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
										{usersdata.length >0 && usersdata.map(
											(userData: initialUserState, index: number) => {
												return (
													<Tr key={index}>
														<td>
															<Checkbox
																value={userData.userid}
																isChecked={handleCheckBoxChecked(userData.userid)}
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
																disabled={checkUserChecked(userData.userid)}
																onClick={() => {
																	handleUpdateRoute(userData.userid);
																}}
																style={{
																	opacity: (() => {
																		return checkUserChecked(userData.userid)
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
																disabled={checkUserChecked(userData.userid)}
																onClick={() => {
																	setTempUsersdata((prev: string[]) => {
																		prev.splice(prev.indexOf(userData.userid), 1);
																		return [...prev];
																	});
																	deleteUser(userData.userid);
																}}
																style={{
																	opacity: (() => {
																		return checkUserChecked(userData.userid)
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

import { Stack, Input, Box, Select, Center } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Alert, AlertTitle } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { Formik, FormikProps } from 'formik';
//import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, initialUserState } from '../../Types';
import { addNewUser,updateExistingUser } from '../../Reducers/usersReducer';

export type formikRef = FormikProps<initialUserState>;

const Userform = (): React.ReactElement => {
	const initialValues: initialUserState = {
		useremail: '',
		usermobileno: '',
		username: '',
		userid: '',
	};
	const toast = useToast();
	const location = useLocation();
	const dispatch = useDispatch();
	const userData = useSelector<RootState,initialUserState[]>((state)=>state.usersReducer);
	const formRef = useRef<formikRef>(null);
	const [selectedUser, setSelectedUser] = useState<initialUserState>({
		userid: '',
		useremail: '',
		username: '',
		usermobileno: '',
	});
	const [slectedUserId, setSelectedUserId] = useState('');
	const [flag, setFlag] = useState(false);

	useEffect(() => {
		if (formRef.current && location.state?.pageName === 'userlist') {
			setFlag(!flag);
			formRef.current.values.username =
				(location.state?.pageName && location.state.pageName === 'userlist'
					? location.state.userData?.username
					: '') || '';
			formRef.current.values.useremail =
				(location.state?.pageName && location.state.pageName === 'userlist'
					? location.state.userData?.useremail
					: '') || '';

			formRef.current.values.usermobileno =
				(location.state?.pageName && location.state.pageName === 'userlist'
					? location.state.userData?.usermobileno
					: '') || '';
		} else if (formRef.current && location.state?.pageName === 'adduser') {
			setFlag(!flag);
			formRef.current.values.username =
				(location.state?.pageName && location.state.pageName === 'adduser'
					? location.state.userData?.username
					: '') || '';
			formRef.current.values.useremail =
				(location.state?.pageName && location.state.pageName === 'adduser'
					? location.state.userData?.useremail
					: '') || '';

			formRef.current.values.usermobileno =
				(location.state?.pageName && location.state.pageName === 'adduser'
					? location.state.userData?.usermobileno
					: '') || '';
		} else if (formRef.current && location.state?.pageName === 'navbar') {
			setFlag(!flag);
			formRef.current.values.username =
				(location.state?.pageName && location.state.pageName === 'navbar'
					? location.state.userData?.username
					: '') || '';
			formRef.current.values.useremail =
				(location.state?.pageName && location.state.pageName === 'navbar'
					? location.state.userData?.useremail
					: '') || '';

			formRef.current.values.usermobileno =
				(location.state?.pageName && location.state.pageName === 'navbar'
					? location.state.userData?.usermobileno
					: '') || '';
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]); 

	useEffect(() => {
		if (selectedUser && location.state?.pageName === 'navbar') {
			if (formRef.current) {
				formRef.current.values.username = selectedUser.username || '';
				formRef.current.values.useremail = selectedUser.useremail || '';
				formRef.current.values.usermobileno = selectedUser.usermobileno || '';
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [slectedUserId]);

	const getUniqueId = () => {
		const uniqueId =
			userData.length > 0
				? parseInt(userData[userData.length - 1].userid.slice(4)) + 1
				: 1;
		return uniqueId;
	};

	// const validationSchema = Yup.object().shape({
	// 	username: Yup.string()
	// 	  .min(2, 'Too Short!')
	// 	  .max(50, 'Too Long!')
	// 	  .required('Required'),
	// 	usermobileno: Yup.string().min(9, 'Mobile is invalid!')
	// 	.max(11, 'Mobile Number is envalid').required('Required'),
	// 	email: Yup.string().email('Invalid email').required('Required'),
	//   });
	const handleSubmit = (values: initialUserState) => {
		if (location.state?.pageName !== 'adduser') {
			dispatch(updateExistingUser({
					userid:
						location.state?.pageName === 'userlist'
							? location.state?.userData?.userid || ''
							: slectedUserId,
					useremail: values.useremail,
					username: values.username,
					usermobileno: values.usermobileno,
				}));
			toast({
				title: 'User has neen updated.',
				description: "We've updated your slected user for you.",
				status: 'success',
				duration: 9000,
				isClosable: true,
			});
		} else {
			console.log(addNewUser({
				userid: 'user' + getUniqueId(),
				useremail: values.useremail,
				username: values.username,
				usermobileno: values.usermobileno,
			}))
			dispatch(addNewUser({
					userid: 'user' + getUniqueId(),
					useremail: values.useremail,
					username: values.username,
					usermobileno: values.usermobileno,
				}));
			toast({
				title: 'Account created.',
				description: "We've created your account for you.",
				status: 'success',
				duration: 9000,
				isClosable: true,
			});
		}
	};
	return (
		<>
			<Formik<initialUserState>
				initialValues={initialValues}
				//validationSchema={validationSchema}
				onSubmit={handleSubmit}
				innerRef={formRef}
			>
				{(formik: formikRef) => (
					<Box
						w="400px"
						borderWidth="1px"
						borderRadius="lg"
						overflow="hidden"
						m="auto"
						mt="10vh"
						data-testid="user-form"
					>
						<Stack spacing={5} p="10px" justifyContent="center" alignItems="center">
							<Box as="span" color="crimson" fontWeight="600" fontSize="md">
								<Alert status="info" borderRadius="10px">
									<AlertTitle fontSize="md">
										{location?.state?.pageName !== 'adduser'
											? 'User Updation Form!'
											: 'User Registration Form!'}
									</AlertTitle>
								</Alert>
							</Box>
							<form onSubmit={formik.handleSubmit} style={{ display: 'contents' }}>
								{location?.state?.pageName === 'navbar' ? (
									<Select
										name="newuserid"
										bg="tomato"
										borderColor="tomato"
										color="white"
										value={formik.values.userid.toString()} // ...force the select's value to match the state variable...
										onChange={(e) => {
											formik.handleChange(e);
											setSelectedUserId(e.target.value);
											setSelectedUser(
												userData.find(
													(user) => user.userid === e.target.value
												) || {
													userid: '',
													useremail: '',
													username: '',
													usermobileno: '',
												}
											);
										}}
									>
										<option value="Select your username">Select your username</option>
										{userData.map((user: initialUserState, index) => (
											<option key={index} value={(user.userid || '').toString()}>
												{user.username}
											</option>
										))}
									</Select>
								) : null}
								<Input
									name="username"
									onBlur={formik.handleBlur}
									value={formik.values.username.toString()}
									data-testid="textbox"
									isInvalid={false}
									errorBorderColor="red.300"
									onChange={formik.handleChange}
									placeholder="Enter Username"
									_placeholder={{ opacity: 1, color: 'gray' }}
								/>
								{formik.errors.useremail && <span>Please enter the value</span>}
								<Input
									name="useremail"
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.useremail.toString()}
									data-testid="textbox"
									isInvalid={false}
									errorBorderColor="red.300"
									placeholder="Enter Email Address"
								/>
								<Input
									name="usermobileno"
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.usermobileno.toString()}
									data-testid="textbox"
									isInvalid={false}
									errorBorderColor="red.300"
									placeholder="Enter Your Phone Number"
								/>
								<Center>
									<Box
										data-testid="submitbtn"
										borderRadius="md"
										bg="tomato"
										color="white"
										px={8}
										h={7}
									>
										<button type="submit">
											{location?.state?.pageName !== 'adduser' ? 'Update' : 'Submit'}
										</button>
									</Box>
								</Center>
							</form>
						</Stack>
					</Box>
				)}
			</Formik>
		</>
	);
};

export default Userform;

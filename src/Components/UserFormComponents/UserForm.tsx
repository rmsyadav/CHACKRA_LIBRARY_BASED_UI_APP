import { Stack, Input, Box, Select, Center } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { Alert, AlertTitle } from '@chakra-ui/react';
import { usersContext, usersContextType } from '../../ContextStore/ContextStore';
import { useLocation } from 'react-router-dom';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

export type argType = {
	id?: String;
	useremail: String;
	username: String;
	usermobileno: String;
};
export type userFormPropsType = {
	children?: React.ReactNode;
};
export type formikInitialValueType = {
	username: String;
	useremail: String;
	usermobileno: String;
	newuserid: String;
};
export type formikRef = FormikProps<formikInitialValueType>;

const Userform = (props: userFormPropsType): React.ReactElement => {
	const initialValues: formikInitialValueType = {
		useremail: '',
		usermobileno: '',
		username: '',
		newuserid: '',
	};
	const toast = useToast();
	const location = useLocation();
	const usersDataContext: usersContextType | null = useContext(usersContext);
	const formRef = useRef<formikRef>(null);
	const [selectedUser, setSelectedUser] = useState<argType>({
		id: '',
		useremail: '',
		username: '',
		usermobileno: '',
	});
	const [newUserId, setNewUserId] = useState('');
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
	}, [location]);

	useEffect(() => {
		if (selectedUser && location.state?.pageName === 'navbar') {
			if (formRef.current) {
				formRef.current.values.username = selectedUser.username || '';
				formRef.current.values.useremail = selectedUser.useremail || '';
				formRef.current.values.usermobileno = selectedUser.usermobileno || '';
			}
		}
	}, [newUserId]);

	const getUniqueId = () => {
		const localStorageData: argType[] = JSON.parse(localStorage.getItem('users') || '[]');
		const uniqueId =
			localStorageData.length > 0
				? parseInt(localStorageData[localStorageData.length - 1]?.id?.slice(4) || '0') + 1
				: 1;
		return uniqueId;
	};

	const validationSchema = Yup.object().shape({
		username: Yup.string()
		  .min(2, 'Too Short!')
		  .max(50, 'Too Long!')
		  .required('Required'),
		usermobileno: Yup.string().min(9, 'Mobile is invalid!')
		.max(11, 'Mobile Number is envalid').required('Required'),
		email: Yup.string().email('Invalid email').required('Required'),
	  });
	const handleSubmit = (values: formikInitialValueType, { setSubmitting }) => {
		setSubmitting(false);
		if (location.state?.pageName !== 'adduser') {
			usersDataContext?.handleAddUser &&
				usersDataContext.handleUpdateUser({
					id:
						location.state?.pageName === 'userlist'
							? location.state?.userData?.id || ''
							: newUserId,
					useremail: values.useremail,
					username: values.username,
					usermobileno: values.usermobileno,
				});
			toast({
				title: 'Account created.',
				description: "We've created your account for you.",
				status: 'success',
				duration: 9000,
				isClosable: true,
			});
		} else {
			usersDataContext?.handleAddUser &&
				usersDataContext.handleAddUser({
					id: 'user' + getUniqueId(),
					useremail: values.useremail,
					username: values.username,
					usermobileno: values.usermobileno,
				});
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
			<Formik<formikInitialValueType>
				initialValues={initialValues}
				validationSchema={validationSchema}
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
										value={formik.values.newuserid.toString()} // ...force the select's value to match the state variable...
										onChange={(e) => {
											formik.handleChange(e);
											setNewUserId(e.target.value);
											setSelectedUser(
												usersDataContext?.usersList.find(
													(user) => user.id === e.target.value
												) || {
													id: '',
													useremail: '',
													username: '',
													usermobileno: '',
												}
											);
										}}
									>
										<option value="Select your username">Select your username</option>
										{usersDataContext?.usersList.map((user: argType, index) => (
											<option key={index} value={(user?.id || '').toString()}>
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

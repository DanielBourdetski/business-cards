import React, { useState } from 'react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import userService from '../lib/userService';
import { useNavigate } from 'react-router-dom';
import { validateLogin, validateSignup } from '../Validation/validation';
import useValidateField from '../hooks/useValidateField';
import { toast } from 'react-toastify';
import { toastConfig } from '../lib/config';
import useHandleErrors from '../hooks/useHandleErrors';
import fullLogo from '../media/realapp-full.png';

const cleanFormErrorState = {
	name: false,
	email: false,
	password: false,
};

const LoginAndRegistration = ({ formType = 'login' }) => {
	const [formState, setFormState] = useState({
		name: '',
		email: '',
		password: '',
		biz: false,
	});
	const [formErrors, setFormErrors] = useState(cleanFormErrorState);

	const navigate = useNavigate();
	const validateField = useValidateField(
		formType === 'login' ? 'Login' : 'Signup',
		formErrors,
		setFormErrors
	);
	const handleErrors = useHandleErrors(cleanFormErrorState, setFormErrors);

	const onSubmit = async e => {
		e.preventDefault();

		try {
			if (formType === 'login') {
				const user = { email: formState.email, password: formState.password };

				const validation = validateLogin(user);
				if (validation.error) {
					handleErrors(validation);
					return;
				}

				await userService.login(user);

				navigate('/');
			} else {
				const user = { ...formState };

				const validation = validateSignup(user);
				if (validation.error) {
					handleErrors(validation);
					return;
				}

				await userService.register({ ...formState });

				await userService.login({
					email: formState.email,
					password: formState.password,
				});

				navigate(formState.biz ? '/my-cards/add-card' : '/');
			}
		} catch (err) {
			toast.error(err.response.data, toastConfig);
		}
	};

	return (
		<form
			className='flex flex-col md:flex-row md:w-2/3 w-full mx-auto mt-10 translate-y-5 md:translate-y-1/4'
			onSubmit={onSubmit}>
			<img
				className='h-32 w-48 md:h-40 md:w-fit mx-auto md:translate-y-2/3'
				src={fullLogo}
				alt='real app logo'
			/>
			<div className='flex flex-col mx-auto pb-16 items-center bg-white w-11/12 md:w-10/12 border-2 border-gold rounded-lg shadow-lg md:p-10'>
				<h2 className='text-3xl p-3 my-2 italic'>
					{formType === 'login' ? 'Login' : 'Register'}
				</h2>

				{formType === 'register' && (
					<Input
						value={formState.name}
						className='w-10/12 md:w-full my-3 md:my-2'
						label='Name'
						name='name'
						validate={e => {
							const updatedFormState = { ...formState, name: e.target.value };
							setFormState(updatedFormState);
							validateField(updatedFormState, 'name', e.type);
						}}
						error={formErrors.name}
					/>
				)}

				<Input
					value={formState.email}
					className='w-10/12 md:w-full my-3 md:my-2'
					label='Email'
					name='email'
					validate={e => {
						const updatedFormState = { ...formState, email: e.target.value };
						setFormState(updatedFormState);
						validateField(updatedFormState, 'email', e.type);
					}}
					error={formErrors.email}
				/>

				<Input
					value={formState.password}
					className='w-10/12 md:w-full my-3 md:my-2'
					label='Password'
					type='password'
					name='password'
					validate={e => {
						const updatedFormState = { ...formState, password: e.target.value };
						setFormState(updatedFormState);
						validateField(updatedFormState, 'password', e.type);
					}}
					error={formErrors.password}
				/>

				{formType === 'register' && (
					<label htmlFor='biz' className=''>
						<input
							onChange={e =>
								setFormState({ ...formState, biz: e.target.checked })
							}
							type='checkbox'
							name='biz'
							id='biz'
							className='mr-2'
						/>
						Business Account
					</label>
				)}

				<Button
					type='submit'
					label={formType === 'login' ? 'Login' : 'Sign Up'}
				/>

				<Button
					label={
						formType === 'login'
							? 'New user? sign up'
							: 'Already a user? sign in'
					}
					overwriteClassName='text-blue-600 underline'
					callback={() =>
						navigate(formType === 'login' ? '/register' : '/login')
					}
				/>
			</div>
		</form>
	);
};

export default LoginAndRegistration;

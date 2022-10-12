import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useHandleErrors from '../../hooks/useHandleErrors';
import useValidateField from '../../hooks/useValidateField';
import { addCard, getCard, updateCard } from '../../lib/cardsService';
import { validateCard } from '../../Validation/validation';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from './Card';

const inputs = [
	{
		type: 'text',
		name: 'name',
		label: 'Business Name',
		value: null,
		error: false,
	},
	{
		type: 'text',
		name: 'description',
		label: 'Description',
		value: null,
		error: false,
	},
	{
		type: 'text',
		name: 'address',
		label: 'Address',
		value: null,
		error: false,
	},
	{
		type: 'number',
		name: 'phone',
		label: 'Business Number',
		value: null,
		error: false,
	},
	{
		type: 'text',
		name: 'image',
		label: 'Image URL',
		value: null,
		error: false,
	},
];

const cleanErrorsState = {};
const initialFormState = {};

inputs.map(i => {
	initialFormState[i.name] = '';
	cleanErrorsState[i.name] = '';
});

const CardForm = ({ edit }) => {
	const [formState, setFormState] = useState(initialFormState);
	const [errorState, setErrorState] = useState(cleanErrorsState);

	const { id } = useParams();
	const navigate = useNavigate();
	const handleErrors = useHandleErrors(cleanErrorsState, setErrorState);
	const validateField = useValidateField('Card', errorState, setErrorState);

	useEffect(() => {
		if (edit) {
			console.log('is edited');
			let card;
			getCard(id).then(res => {
				card = res.data[0];
				const { address, description, image, name, phone } = card;
				setFormState({
					address,
					description,
					image,
					name,
					phone,
				});
			});
		}
	}, []);

	const submitEdit = async e => {
		e.preventDefault();

		const validation = validateCard(formState);
		if (validation.error) {
			handleErrors(validation);
			return;
		}

		try {
			const res = await updateCard(formState, id);

			toast.success('Card updated successfuly!');

			navigate('/my-cards');
		} catch (err) {
			console.log('error at CardForm ==> submitEdit()', err);
			toast.error('Something went wrong while updating card!');
		}
	};

	const onSubmit = async e => {
		e.preventDefault();

		const validation = validateCard(formState);
		if (validation.error) {
			handleErrors(validation);
			return;
		}

		try {
			const res = await addCard(formState);
			toast.success(
				`Business card for \`${res.data.name}\` was created successfully!`
			);

			navigate('/my-cards');
		} catch (err) {}
	};

	return (
		<>
			<form className='w-10/12 mx-auto flex gap-x-8' onSubmit={onSubmit}>
				<div className='flex flex-col w-11/12 mx-auto md:w-1/2 items-center'>
					{inputs.map(i => {
						return (
							<Input
								className='mt-5 w-full'
								key={i.name}
								name={i.name}
								type={i.type}
								label={i.label}
								value={formState[i.name]}
								error={errorState[i.name]}
								validate={e => {
									const updatedFormState = {
										...formState,
										[i.name]: e.target.value,
									};
									setFormState(updatedFormState);
									validateField(updatedFormState, i.name, e.type);
								}}
							/>
						);
					})}

					<Button
						className='mt-8 md:mt-2 w-1/3'
						type='submit'
						label='Submit'
						callback={edit ? submitEdit : undefined}
					/>
				</div>
				<div className='mx-auto translate-y-10 hidden md:block'>
					<h2 className='text-xl text-center'>Card preview</h2>
					<Card card={formState} />
				</div>
			</form>
		</>
	);
};

export default CardForm;

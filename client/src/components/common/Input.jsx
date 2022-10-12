import React, { useEffect } from 'react';
import s from './Input.module.css';

const acceptedTypes = ['text', 'password', 'number'];

const Input = ({
	type = 'text',
	name,
	label,
	validate,
	value = null,
	className,
	error,
}) => {
	if (!type || !acceptedTypes.includes(type))
		throw new Error('Invalid type for input');
	if (!label || label.trim() === '') throw new Error('Invalid label for input');

	return (
		<>
			<label
				htmlFor={name}
				className={`${s.inp} ${className} ${error && 'bg-red-100'}`}>
				<input
					autoComplete='off'
					type={type}
					id={name}
					name={name}
					onChange={e => validate(e)}
					value={typeof value === 'string' ? value : ''}
					placeholder='&nbsp;'
					onBlur={e => validate(e)}
				/>
				<span className={s.label}>{label}</span>
				<span className={s['focus-bg']}></span>
			</label>
			{error ? <p className='text-sm text-red-600 mt-0 mb-2'>{error}</p> : null}
		</>
	);
};

export default Input;

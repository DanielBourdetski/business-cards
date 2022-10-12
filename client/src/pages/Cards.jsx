import React from 'react';
import { useEffect } from 'react';
import { Route, Routes, Red, Navigate } from 'react-router-dom';
import CardForm from '../components/Cards/CardForm';
import MyCards from '../components/Cards/MyCards';
import { getUser } from '../lib/userService';

const Cards = () => {
	if (!getUser().biz) return <Navigate to='/' />;

	return (
		<Routes>
			<Route path='add-card' element={<CardForm />} />
			<Route path='' element={<MyCards />} />
			<Route path='edit-card/:id' element={<CardForm edit />} />
		</Routes>
	);
};

export default Cards;

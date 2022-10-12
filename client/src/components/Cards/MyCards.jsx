import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCards } from '../../lib/cardsService';
import Button from '../common/Button';
import Card from './Card';
import NoCards from './NoCards';

const MyCards = () => {
	const [cards, setCards] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				const res = await getCards();
				setCards(res);
			} catch (err) {
				console.log(err);
				toast.error(err);
			}
		})();
	}, []);

	const updateCardList = () => {
		getCards()
			.then(res => setCards(res))
			.catch(err => {
				console.log(err);
				toast.error(
					'card reload failed, please reload the page to see updated card list'
				);
			});
	};

	if (cards === null) return <div>Loading cards...</div>;
	if (!cards.length) return <NoCards />;

	return (
		<div className='mt-4 w-fit mx-auto flex flex-col'>
			<Button
				label='Add new card'
				overwriteClassName='py-2 px-3 border border-gray-300 rounded duration-200 ease-in mr-auto hover:bg-gray-400'
				callback={() => navigate('/my-cards/add-card')}
			/>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto my-5 w-fit'>
				{cards.map(card => {
					return (
						<Card key={card.name} card={card} updateCardList={updateCardList} />
					);
				})}
			</div>
		</div>
	);
};

export default MyCards;

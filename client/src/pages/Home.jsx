import { getUser } from '../lib/userService';
import { getCards } from '../lib/cardsService';
import { useEffect, useState } from 'react';
import AccountInfo from '../components/Home/AccountInfo';

const Home = () => {
	const [cards, setCards] = useState();

	useEffect(() => {
		getCards()
			.then(fetchedCards => setCards(fetchedCards))
			.catch(setCards(false));
	}, []);

	const name = getUser().name;

	return (
		<div className='mt-4 w-1/2 mx-auto'>
			<h1 className='text-4xl text-center mx-auto mb-8 w-fit'>Hello, {name}</h1>
			<div className='w-100'>
				<AccountInfo cards={cards} />
			</div>
		</div>
	);
};

export default Home;

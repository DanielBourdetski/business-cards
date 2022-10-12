import { useNavigate } from 'react-router-dom';
import { getUser } from '../../lib/userService';
import Button from '../common/Button';

const AccountInfo = ({ cards }) => {
	const navigate = useNavigate();

	const cardsAmount = cards ? cards.length : null;
	const latestCard =
		cards &&
		cards.reduce((newestCard, card) => {
			return card.createdAt > newestCard.createdAt ? card : newestCard;
		}, cards[0]);

	if (!getUser().biz)
		return (
			<p className='mx-auto text-center'>
				Stay updated for non-business account features!
			</p>
		);

	return (
		<>
			<div className='w-fit mx-auto mb-8 italic'>
				{latestCard ? (
					<>
						<p>You have {cardsAmount} cards registered </p>
						<p>Your most recent business card is {latestCard.name}</p>
					</>
				) : (
					<p>
						Seems like you dont have any cards.{' '}
						<Button
							label='Create one here'
							callback={() => navigate('/my-cards/add-card')}
						/>
					</p>
				)}
			</div>
		</>
	);
};

export default AccountInfo;

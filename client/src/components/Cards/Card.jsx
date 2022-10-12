import React from 'react';
import Button from '../common/Button';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { deleteCard } from '../../lib/cardsService';
import { toast } from 'react-toastify';

const Card = ({ card, updateCardList }) => {
	const navigate = useNavigate();

	const deleteCardCallback = async () => {
		if (
			prompt(
				`This action is unreversible. please confirm by typing the card's name '${card.name}'`
			) === card.name
		) {
			try {
				const res = await deleteCard(card._id);

				toast.success('Card deletion successful!');
				updateCardList();
			} catch (err) {
				console.log(err);
				toast.error(
					'An error has occured while deleting the card: ',
					err.message || err
				);
			}
		}
	};

	return (
		<div className='w-[336px] h-[193px] rounded border-2 border-gold relative shadow-lg duration-300 hover:-translate-y-1 hover:shadow-xl'>
			<div className='absolute right-2 top-2 flex flex-row-reverse gap-x-2'>
				<Button
					label={<AiOutlineDelete />}
					callback={deleteCardCallback}
					overwriteClassName='w-fit h-fit rounded-full border p-1 duration-150 hover:shadow'
				/>
				<Button
					label={<AiOutlineEdit />}
					callback={() => navigate(`edit-card/${card._id}`)}
					overwriteClassName='w-fit h-fit rounded-full border p-1 duration-150 hover:shadow'
				/>
			</div>
			<div className='w-[300px] h-[170px] mx-4 my-[10px] bg-center rounded absolute -z-10'>
				{card.image && (
					<img
						className='w-full h-full opacity-30 object-cover rounded'
						src={card.image}
						alt={`${card.name}`}
					/>
				)}
			</div>
			<div className='p-6 mx-auto h-full flex flex-col gap-2'>
				<div className='flex items-baseline'>
					<h2 className='text-xl font-bold mr-4 text-black opacity-100'>
						{card.name}
					</h2>
					{card.address.includes('https://') ? (
						<a href={card.address} target='_blank' className=' text-sm ml-auto'>
							{card.address}
						</a>
					) : (
						<p className='text-gray-600 text-sm ml-auto'>{card.address}</p>
					)}
				</div>
				<p className='tracking-wide font-medium italic'>{card.description}</p>
				{/* <div className="flex w-full h-full relative">
        </div> */}
			</div>
			{card.image && <div className={'w-1/2 h-10'}></div>}
			<p className='right-10 bottom-4 absolute bg-gradient-to-br from-slate-50 to-slate-100 px-2 rounded-lg shadow-md'>
				{card.phone}
			</p>
		</div>
	);
};

export default Card;

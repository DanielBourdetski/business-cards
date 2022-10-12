import { useState } from 'react';
import { RiMenu5Fill } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';
import { pages } from '../lib/pages';
import { logout } from '../lib/userService';
import Button from './common/Button';

const HamburgerNavbar = isBizUser => {
	const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
	const navigate = useNavigate();

	const hamburgerButton = (
		<Button
			label={<RiMenu5Fill size='1.8em' />}
			overwriteClassName='p-1 mr-2'
			callback={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}
		/>
	);

	const navLinks = pages.map(page => {
		if (!page.biz || (page.biz && isBizUser)) {
			return (
				<li
					className='mx-2 duration-150 hover:shadow hover:-translate-y-[1px] rounded px-2 py-1'
					key={page.path}
					onClick={() => {
						setMobileMenuIsOpen(false);
					}}>
					<NavLink
						className={({ isActive }) => (isActive ? 'font-bold' : '')}
						to={page.path}>
						{page.name}
					</NavLink>
				</li>
			);
		}
	});

	return (
		<div className='flex ml-auto h-10 relative'>
			{hamburgerButton}
			<div
				className={`absolute top-[4em] right-4 ${
					mobileMenuIsOpen ? '' : 'translate-x-32 opacity-0'
				} border border-gray-400 w-40 bg-main shadow-2xl h-48 rounded-lg duration-300 ease-in-out`}>
				<ul className='flex flex-col justify-around items-center w-40 h-full'>
					{navLinks}
					<li>
						<Button
							label='logout'
							overwriteClassName='mt-5 text-xs mb-2 pb-[1px] text-gray-600 px-3 border-y border-gray-400'
							callback={() => {
								logout();
								navigate('/login');
							}}
						/>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default HamburgerNavbar;

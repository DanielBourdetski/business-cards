import { Link, NavLink, useNavigate } from 'react-router-dom';
import { pages } from '../lib/pages';
import { getJWT, getUser, logout } from '../lib/userService';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../media/realapp-minimal.png';
import HamburgerNavbar from './HamburgerNav';
import { useState } from 'react';
import Button from './common/Button';
import { useEffect } from 'react';

const Navbar = () => {
	const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	});

	const navigate = useNavigate();

	const isBizUser = getUser()?.biz;

	const navLinks = pages.map(page => {
		if (!page.biz || (page.biz && isBizUser)) {
			return (
				<li
					className='mx-2 duration-150 -translate-y-1 hover:-translate-y-[5px] text-shadow rounded px-2 py-1'
					key={page.path}>
					<NavLink
						className={({ isActive }) =>
							isActive ? 'font-bold underline decoration-gold' : undefined
						}
						to={page.path}>
						{page.name}
					</NavLink>
				</li>
			);
		}
	});

	return (
		getJWT() && (
			<div className='flex md:px-10 py-3 bg-slate-400 w-screen relative z-50 md:z-0'>
				{windowWidth <= 768 ? (
					<>
						<Link to={''} className='ml-6'>
							<img className='m-0 z-100 h-10' src={logo} alt='real app logo' />
						</Link>
						<HamburgerNavbar isBizUser={isBizUser} open={mobileMenuIsOpen} />
					</>
				) : (
					<>
						{' '}
						<Link to={''}>
							<img className='h-16 m-0 z-100' src={logo} alt='real app logo' />
						</Link>
						<ul className='flex ml-3 z-100 items-center'>{navLinks}</ul>
						<button
							className='ml-auto text-sm'
							onClick={() => {
								logout();
								navigate('/login');
							}}>
							logout
						</button>{' '}
					</>
				)}
				<div className='absolute w-full h-10 md:h-1/2 left-0 md:top-5 -z-10 bg-main'></div>
			</div>
		)
	);
};

export default Navbar;

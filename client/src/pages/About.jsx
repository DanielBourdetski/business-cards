import fullLogo from '../media/realapp-full.png';

const About = () => {
	return (
		<div className='md:w-10/12 mx-auto md:flex md:flex-col md:items-center mt-5 px-4'>
			<h1 className='text-3xl my-5 text-center'>About RealApp</h1>
			<div className='flex flex-col items-center md:flex-row'>
				<img src={fullLogo} className='h-40 w-fit' alt='real app logo' />
				<p className='text-center px-10 md:text-justify md:border-l-4 md:border-gray-600 my-auto'>
					<span className='font-serif text-xl tracking-wider text-'>
						Made by business owners, <br /> <span>for business owners.</span>
					</span>
					<br />
					<br />
					After years of paying tremendous amount to make business cards and
					handing them one at a time for a chance of a conversion, we can now
					finally address clients and potential co-workers online with the class
					of the real thing.
				</p>
			</div>
		</div>
	);
};

export default About;

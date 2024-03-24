import { Icon } from './Icon';

import menu from '../assets/svg/menu.svg';
import logo from '../assets/svg/Gmail Logo.svg';
import question from '../assets/svg/question_mark.svg';
import settings from '../assets/svg/settings.svg';
import apps from '../assets/svg/apps.svg';
// import user from 'https://lh3.googleusercontent.com/-70bE4uDUXzc/AAA…LKGfklNFqgBMI9LHWrIbaHGfpvePjQqRQ/photo.jpg?sz=46';

export function AppHeader({ filterBy, onSetFilter }) {
	const icons = [
		{ src: question, alt: 'help' },
		{ src: settings, alt: 'settings' },
		{ src: apps, alt: 'apps' },
		// { src: user, alt: 'user' },
	];

	return (
		<header className="app-header">
			<section className="container">
				<Icon iconData={{ src: menu, alt: 'menu' }} />
				<img src={logo} alt="gmail-logo" />
				{icons.map((icon, index) => {
					return <Icon iconData={icon} key={index} />;
				})}
			</section>
		</header>
	)
}

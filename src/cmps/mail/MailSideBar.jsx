// import path from '../services/image-path';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { emailService } from '../../services/email.Service';
import { Icon } from '../Icon';

const buttons = [
	{
		id: 'inbox',
		name: 'Inbox',
		img: 'https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/inbox_fill_baseline_n900_20dp.png',
	},
	{
		id: 'starred',
		name: 'Starred',
		img: 'https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/star_baseline_nv700_20dp.png',
	},
	{
		id: 'sent',
		name: 'Sent',
		img: 'https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/send_baseline_nv700_20dp.png',
	},
	{
		id: 'drafts',
		name: 'Drafts',
		img: 'https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/draft_baseline_nv700_20dp.png',
	},
	{
		id: 'trash',
		name: 'Trash',
		img: 'https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/delete_baseline_nv700_20dp.png',
	},

	{
		id: 'compose',
		name: 'Compose',
		img: 'https://www.gstatic.com/images/icons/material/system_gm/1x/create_black_24dp.png',
	},
];
export function MailSideBar({ emails }) {
	const [active, setActive] = useState('inbox');
	const [emailsCount, setEmailsCount] = useState(
		emailService.getEmailsCounts()
	);
	const navigate = useNavigate();
	const params = useParams(emails);

	function setActiveButton(id) {
		setActive(id);
		navigate(`/emails/${id}`);
	}

	// useEffect(() => {
	// 	setActive(params.folderId);
	// 	loadEmailsCount();
	// }, [emails]);

	// function that loading the new emails in a async way //
	async function loadEmailsCount() {
		try {
			// const emails = await emailService.query(filterBy, params.folderId);
			const emailsCount = await emailService.getEmailsCounts();
			// setEmails(emails)
			setEmailsCount(emailsCount);
		} catch (error) {
			console.error('Had issues loading the emails: ', error);
		}
	}

	return (
		<div className="side-bar-container">
			{/* <button className="compose-btn" onClick={() => onFilter}></button> */}
			<Link to={`/emails/${params.folderId}/compose`} className="compose-btn">
				<img
					className="compose-img"
					src="https://www.gstatic.com/images/icons/material/system_gm/1x/create_black_24dp.png"
				/>
				<span className="compose-text">Compose</span>
			</Link>

			{buttons.map((button) => (
				<button
					key={button.id}
					className={`side-panel-btn ${active === button.id ? 'active' : ''}`}
					onClick={() => setActiveButton(button.id)}
				>
					<img className="side-panel-img" src={button.img} alt={button.name} />
					<p className="side-panel-text">{button.name}</p>
					<span className="emails-count">{emailsCount[button.name]}</span>
				</button>
			))}
		</div>
	);
}

import { useEffect, useState } from 'react';
import {
	useParams,
	useLocation,
	useNavigate,
	useSearchParams,
} from 'react-router-dom';

import { emailService } from '../services/email.Service';
import { MailSideBar } from '../cmps/mail/MailSideBar';
import { AppHeader } from '../cmps/AppHeader';

// The email index - main component for managing emails
export function EmailIndex() {
	const params = useParams();
	const location = useLocation();
	const navigate = useNavigate();

	// The emails filter
	const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter());

	const [searchParams, setSearchParams] = useSearchParams();
	const [emails, setEmails] = useState(null);
	const [emailsCount, setEmailsCount] = useState(null);
	const [showMenu, setShowMenu] = useState(false);

	const [emailCounts, setEmailCounts] = useState(null);

	useEffect(() => {
		if (filterBy.folder !== null) {
			loadEmails();
		}
	}, [filterBy]);

	//Set Filter
	function onSetFilter(fieldsToUpdate) {
		setFilterBy((prevFilter) => ({ ...prevFilter, ...fieldsToUpdate }));
	}

	async function loadEmails() {
		try {
			const emails = await emailService.query(filterBy, params.folderId);
			const emailsCount = await emailService.getEmailsCounts();
			setEmails(emails);
		} catch (err) {
			console.log('Had problem fetch emails data: ', err);
		}
	}

	async function onUpdateEmail(email) {
		try {
			const updatedEmail = await emailService.save(email);
			setEmails((prevEmails) =>
				prevEmails.map((email) =>
					email.id === updatedEmail.id ? updatedEmail : email
				)
			);
			loadEmails();
		} catch (err) {
			console.log('Had Problem updating the email', err);
		}
	}

	async function onMailRead(emailId, field) {
		try {
			const mailToUpdate = await emailService.getById(emailId);
			const updatedMail = {
				...mailToUpdate,
				[field]: !mailToUpdate[field],
			};
			await emailService.save(updatedMail);
			loadEmails();
		} catch (err) {
			console.log('Problem with reading this email:', err);
		}
	}

	async function onStarred(emailId) {
		try {
			const mailToUpdate = await emailService.getById(emailId);
			const updatedMail = {
				...mailToUpdate,
				isStarred: !mailToUpdate.isStarred,
			};
			await emailService.save(updatedMail);
			loadEmails();
		} catch (err) {
			console.log('Problem with starring this email:', err);
		}
	}

	async function onEnterEmail(emailId) {
		try {
			const mailToUpdate = await emailService.getById(emailId);
			const updatedMail = {
				...mailToUpdate,
				isRead: true,
			};
			await emailService.save(updatedMail);
			loadEmails();
		} catch (err) {
			console.log('Problem with:', err);
		}
	}

	async function onRemoveEmail(email) {
		try {
			if (params.folderId !== 'trash') {
				email.removedAt = Date.now();
				emailService.save(email);
			} else {
				console.log('emailId', email.id);
				await emailService.remove(email.id);
			}
			setEmails((prevEmails) => prevEmails.filter((e) => e.id !== email.id));
			const emailsCount = await emailService.getEmailsCounts();
			setEmailsCount(emailsCount);
		} catch (error) {
			console.error('Had issues loading the emails:', error);
		}
	}

	if (!emails) return <div>Loading..</div>;
	return (
		<div className="email-index-container">
			<AppHeader/>
			<MailSideBar emails={emails} />
			{/* <EmailFilter onSetFilter={onSetFilter} /> */}
		</div>
	);
}

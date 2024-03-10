import { useEffect, useState } from 'react';
import { emailService } from '../services/email.Service';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

export function EmailIndex() {
	//email const :
	const [emails, setEmails] = useState(null);
	const [filter, setFilter] = useState(emailService.getDefaultFilter());
	const [showMenu, setShowMenu] = useState(false);
	const params = useParams();
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (filter.folder !== null) {
			loadEmails();
		}
	}, [filter]);

	async function loadEmails() {
		try {
			const emails = await emailService.query(filter);
			setEmails({
				data: emails,
				folder: filter.folder,
			});
		} catch (err) {
			console.log('Had problem loading fetch emails data: ', err);
		}
	}
}

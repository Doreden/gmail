import { useNavigate } from 'react-router-dom';
import { emailService } from '../services/email.Service';

export function Home() {
	const navigate = useNavigate();

	async function generateEmails() {
		 emailService.generateEmails();
		navigate('/email/inbox');
	}

	return (
		<div className="home-page">
			<Link to="/email/inbox" className="home-go-to-inbox">
				Go To Inbox
			</Link>
			<button className="home-generate-emails-button" onClick={generateEmails}>
				Generate email
			</button>
		</div>
	)
}

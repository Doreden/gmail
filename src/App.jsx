import { Home } from './pages/Home';
import { About } from './pages/About';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { EmailIndex } from './pages/EmailIndex';
export function App() {
	return (
		<Router>
			<main className="app">
				<Routes>
					<Route path="/" element={<EmailIndex />} />
					<Route path="/about" element={<About />} />
					{/* <Route path="/email/:folderId?" element={<EmailIndex />} /> */}
				</Routes>
			</main>
		</Router>
	);
}

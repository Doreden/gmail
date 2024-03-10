import { utilService } from './util.service';
import { storageService } from './async-storage.service';
//Const
export const emailService = {
	query,
	save,
	remove,
	getById,
	createEmail,
	getDefaultFilter,
	getLoggedInUser,
	generateEmails,
}

const loggedInUser = {
	email: 'dor.eden@gmail.com',
	fullName: 'Dor Eden',
}

const STORAGE_KEY = 'emails';

//Functions:
//CRUD functions:
async function query(filter) {
	let emails = await storageService.query(STORAGE_KEY);
	if (filter) {
		emails = emails.filter((email) => doesEmailMatchFilter(email, filter));
		if (filter.folder != 'drafts') {
			emails = emails.sort((e1, e2) => (e1.sentAt < e2.sentAt ? 1 : -1));
		}
	}
	return emails;
}

async function getById(id) {
	const email = await storageService.get(STORAGE_KEY, id);
	email.isRead = true
	save(email)
	return email
}
//  Create an Email using the email model
function createEmail() {
	return {
		id: null,
		subject: '',
		body: '',
		to: '',
		from: loggedInUser.email,
		isRead: false,
		isStarred: false,
		sentAt: null,
		isDeleted: false,
	};
}

function remove(id) {
	return storageService.remove(STORAGE_KEY, id);
}

function save(emailToSave) {
	if (emailToSave.id) {
		return storageService.put(STORAGE_KEY, emailToSave);
	} else {
		return storageService.post(STORAGE_KEY, emailToSave);
	}
}

// Filter Related Functions:
function getDefaultFilter() {
	return {
		isRead: null,
		isStarred: null,
		searchString: '',
		folder: null,
	};
}

// utils functions:
function getLoggedInUser() {
	return loggedInUser;
}

function generateEmails() {
	let emails = utilService.loadFromStorage(STORAGE_KEY);
	if (!emails || !emails.length) {
		// a new array of Demo emails object
		emails = [
			{
				id: utilService.makeId(),
				subject: 'about your account status',
				body: 'Dear Dor Eden,\n we have recieved your  enrollment request.\nonce we verify that you have the authority to bind your organization to Apple Developer Program legal agreements, \nwe’ll email you with instructions on how to complete your enrollment',
				to: loggedInUser.email,
				from: 'developer@email.apple.com',
				isRead: false,
				isStarred: false,
				sentAt: 1694112055000,
				isDeleted: false,
			},

			{
				id: utilService.makeId(),
				subject: 'Word Boost Fixed After comment',
				body: 'Hi Dor,\nThanks.The word Paphos is now better pronounced,\nbut the reading speed in the beginning is too fast.\nAdd a pause after dates before Sunday.',
				to: loggedInUser.email,
				from: 'hagit@upp.co.il',
				isRead: false,
				isStarred: false,
				sentAt: 1694112055000,
				isDeleted: false,
			},

			{
				id: utilService.makeId(),
				subject: 'Order from Amazon',
				body: 'your order should arrive in march 16th ',
				to: loggedInUser.email,
				from: 'orders@amazon.com',
				isRead: false,
				isStarred: false,
				sentAt: 1593210401000,
				isDeleted: false,
			},
		];
		utilService.saveToStorage(STORAGE_KEY, emails);
	}
}

function doesEmailMatchFilter(email, filter) {
	// is read
	if (filter.isRead !== null && email.isRead !== filter.isRead) {
		return false;
	}
	// is starred
	if (filter.isStarred !== null && email.isStarred !== filter.isStarred) {
		return false;
	}
	//search in string
	if (filter.searchString) {
		const lowercaseSearchString = filter.searchString.toLowerCase();
		if (
			!email.subject.toLowerCase().includes(lowercaseSearchString) &&
			!email.body.toLowerCase().includes(lowercaseSearchString)
		) {
			return false;
		}
	}

	//folder case:
	if (filter.folder != 'bin' && email.isDeleted === true) {
		return false;
	}

	switch (filter.folder) {
		case 'inbox':
			return (
				email.sentAt !== null &&
				email.to == emailService.getLoggedInUser().email
			);
		case 'sent':
			return (
				email.sentAt !== null &&
				email.from == emailService.getLoggedInUser().email
			);
		case 'drafts':
			return email.sentAt !== null;
		case 'starred':
			return email.isStarred;
		case 'all':
			return email.sentAt != null;
		case 'bin':
			return email.isDeleted === true;
	}
	return true;
}

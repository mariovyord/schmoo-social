import { LitElement, css, html } from 'lit';
import { resets } from '../common/resetsCSS';
import { setPicture, getUserInfoById } from '../api/data';
import { setUserData, getUserData } from '../utils/userData';

const windowBreakpoint = 700;

export default function renderSettings(ctx) {
	ctx.render(html`
			<settings-page .user=${ctx.user} .ctx=${ctx}></settings-page>
	`);
}

class SettingsPage extends LitElement {
	static properties = {
		ctx: { type: Object },
	}

	static styles = [
		resets,
		css`
		:host {
			display: grid;  
			grid-template-columns: 1fr 2fr; 
			gap: 10px;
		}
		:host > *:not(:last-child) {
			margin-bottom: 10px; 
		} 

		@media only screen and (max-width: ${windowBreakpoint}px) {
			:host {
				grid-template-columns: 1fr; 
			}
		}
		.button {
			color: white;
			font-size: 0.9rem;
			font-weight: 500;
			text-align: center;
			border: 0px;
			border-radius: 3px;
			background-color: #0095f6;
			padding: 0.7rem;
			max-width: 150px;
		}
		.button:hover {
			background-color: rgba(0, 149, 246, 0.8);
			cursor: pointer;
		}
		form {
			display: flex;
			flex-direction: column;
			gap: 10px;
			padding: 10px;
			border-radius: 5px;
			background-color: white;
			box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
		}
		.column {
			width: 100%;
		}
	`
	];
	constructor() {
		super();
		this.ctx = null;
		this.user = null;
	}

	async onSubmit(e) {
		e.preventDefault();
		const form = this.shadowRoot.querySelector('form');
		const profilePicture = this.shadowRoot.querySelector('input[type="file"]').files[0];
		const ctx = this.ctx;
		const reader = new FileReader();
		reader.readAsBinaryString(profilePicture);
		reader.onload = async function () {
			try {
				await setPicture(reader.result);
				const user = getUserData();
				const userData = await getUserInfoById(user.id);
				setUserData({
					username: userData.username,
					id: userData.objectId,
					accessToken: userData.sessionToken,
					pictureUrl: userData.picture.url,
					createdAt: userData.createdAt,
				});
				form.reset();
				ctx.page.redirect('/');
			} catch (err) {
				// TODO Error handling
				console.log(err);
			}
		};
	}

	render() {
		return html`
			<settings-nav></settings-nav>
			<div class="right-column column">
				<form @submit=${this.onSubmit}>
					<label for="picture">Choose a profile picture:</label>
					<input type="file" id="picture" name="picture" accept="image/png, image/jpeg">
					<input class="button" type="submit" value="Submit">
				</form>
			</div>
`;
	}
}

customElements.define('settings-page', SettingsPage);

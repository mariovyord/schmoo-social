import { LitElement, css, html } from 'lit';
import { resets } from '../components-css/resets';
import { userLogout } from '../api/auth';

export class SettingsPage extends LitElement {
	static styles = [
		resets,
		css`
		h1 {
			font-size: 3rem;
			text-align: center;
			margin: 2rem 0;
			font-weight: 500;
		}
		.center {
			display: flex;
			justify-content: center;
		}
		button {
			color: white;
			font-size: 0.9rem;
			font-weight: 500;
			text-align: center;
			border: 0px;
			border-radius: 3px;
			background-color: #0095f6;
			padding: 0.7rem;
		}
		button:hover {
			background-color: rgba(0, 149, 246, 0.8);
			cursor: pointer;
		}
	`
	];
	constructor(name = 'John') {
		super();
		this.name = name;
	}

	render() {
		return html`
		<profile-card></profile-card>
		<h1>Settings</h1>
		<div class="center">
			<button @click=${userLogout}>Logout</button>
		</div>
`;
	}
}

customElements.define('settings-page', SettingsPage);

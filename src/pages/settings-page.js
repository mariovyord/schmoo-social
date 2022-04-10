import { LitElement, css, html } from 'lit';
import { resets } from '../common/resetsCSS';

const windowBreakpoint = 700;

export default function renderSettings(ctx) {
	ctx.render(html`
			<settings-page .user=${ctx.user}></settings-page>
	`);
}

class SettingsPage extends LitElement {
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
	constructor() {
		super();
		this.user = null;
	}

	render() {
		return html`
		<settings-nav></settings-nav>
		<div>
			<edit-profile .user=${this.user}></edit-profile>
		</div>

`;
	}
}

customElements.define('settings-page', SettingsPage);

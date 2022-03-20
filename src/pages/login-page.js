import { LitElement, css, html } from 'lit';
import { resets } from '../components-css/resets';

export class LoginPage extends LitElement {
	static styles = [
		resets,
		css`
		:host {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: center;
			padding: 10px;
		}
		:host > *:not(:last-child) {
			margin-bottom: 10px; 
		}  
	`
	];

	render() {
		return html`
		<login-form></login-form>
		`;
	}
}

customElements.define('login-page', LoginPage);

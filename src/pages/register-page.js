import { LitElement, css, html } from 'lit';
import { resets } from '../../components-css/resets';

export class RegisterPage extends LitElement {
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
		<register-form></register-form>
		`;
	}
}

customElements.define('register-page', RegisterPage);

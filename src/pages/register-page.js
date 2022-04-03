import { LitElement, css, html } from 'lit';
import { resets } from '../common/resetsCSS';

export default function renderRegister(ctx) {
	ctx.render(html`
		<register-page slot="main"></register-page>
		`);
}

class RegisterPage extends LitElement {
	static styles = [
		resets,
		css`
		:host {
			max-width: 600px;
			margin: 0 auto;
			min-height: calc(100vh - 70px);
			display: flex;
			flex-direction: row;
			justify-content: center;
			background-color: white;
			box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;	
			padding: 30px 0;
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

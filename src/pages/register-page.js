import { LitElement, css, html } from 'lit';

export class RegisterPage extends LitElement {
	static styles = css`
		* {
			box-sizing: border-box;
		}
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
	`;

	render() {
		return html`
		<register-form></register-form>
		`;
	}
}

customElements.define('register-page', RegisterPage);

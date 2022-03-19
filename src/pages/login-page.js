import { LitElement, css, html } from 'lit';

export class LoginPage extends LitElement {
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
		<login-form></login-form>
		`;
	}
}

customElements.define('login-page', LoginPage);

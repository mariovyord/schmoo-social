import { LitElement, css, html } from 'lit';
import { resets } from '../components-css/resets';

export default function renderLogin(ctx) {
	ctx.render(html`
		<app-root activePage=${'/login'}> <login-page slot="main">
			</login-page>
		</app-root>`);
}

class LoginPage extends LitElement {
	static styles = [
		resets,
		css`
		:host {
			width: 100%;
			height: calc(100vh - 70px);
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
		<login-form></login-form>
		`;
	}
}

customElements.define('login-page', LoginPage);

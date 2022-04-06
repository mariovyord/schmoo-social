import { LitElement, css, html } from 'lit';
import { resets } from '../common/resetsCSS';

export default function renderLogin(ctx) {
	ctx.render(html`
		<login-page .ctx=${ctx}></login-page>
		`);
}

class LoginPage extends LitElement {
	properties = {
		ctx: { type: Object },
	}

	static styles = [
		resets,
		css`
		:host {
			max-width: 600px;
			margin: 0 auto;
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

	constructor() {
		super();
		this.ctx = {};
	}

	render() {
		return html`
		<login-form .ctx=${this.ctx}></login-form>
		`;
	}
}

customElements.define('login-page', LoginPage);

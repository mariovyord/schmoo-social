import { LitElement, css, html } from 'lit';
import { resets } from '../common/resetsCSS';

export default function renderRegister(ctx) {
	ctx.render(html`
		<register-page .ctx=${ctx}></register-page>
		`);
}

class RegisterPage extends LitElement {
	properties = {
		ctx: { type: Object },
	}

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

	constructor() {
		super();
		this.ctx = {};
	}

	render() {
		return html`
		<register-form .ctx=${this.ctx}></register-form>
		`;
	}
}

customElements.define('register-page', RegisterPage);

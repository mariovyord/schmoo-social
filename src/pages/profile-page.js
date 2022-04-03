import { LitElement, css, html } from 'lit';
import { resets } from '../common/resetsCSS';
import { getUserData } from '../utils/userData';

const windowBreakpoint = 700;

export default function renderProfile(ctx) {
	ctx.render(html`
		<profile-page activePage=${'/profile'} .user=${ctx.user}> </profile-page>`);
}

class ProfilePage extends LitElement {
	static properties = {
		name: { type: String },
		user: { type: Object },
		windowWidth: { type: Number },
		navigation: { type: String },
		activePage: { type: String },
	}

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
	`
	];
	constructor(name = 'World') {
		super();
		this.name = name;
		this.activePage = '/';
		this.user = null;
		this.windowWidth = this.getWindowWidth();
	}

	connectedCallback() {
		super.connectedCallback();
		window.addEventListener('resize', this.updateWindowWidth.bind(this));
	}

	disconnectedCallback() {
		window.removeEventListener('resize', this.updateWindowWidth.bind(this));
		super.disconnectedCallback();
	}

	getWindowWidth() {
		return window.innerWidth;
	}

	async updateWindowWidth() {
		this.windowWidth = window.innerWidth;
	}

	render() {
		return html`
				<div>
					<sidebar-usercard .user=${this.user}></sidebar-usercard>
				</div>
				<div>
					<profile-feed .isLogged=${this.user} .user=${this.user}></profile-feed>
				</div>
		`;
	}
}

customElements.define('profile-page', ProfilePage);

import { LitElement, css, html } from 'lit';
import { resets } from '../common/resetsCSS';

const windowBreakpoint = 700;

export default function renderHome(ctx) {
	ctx.render(html`
		<home-page activePage=${'/'} .user=${ctx.user}> </home-page>`);
}

class HomePage extends LitElement {
	static properties = {
		windowWidth: { type: Number },
		navigation: { type: String },
		activePage: { type: String },
		user: { type: Object },
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
				gap: 0px;
			}
		}
	`
	];
	constructor() {
		super();
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
					<welcome-sidebar user=${this.user?.username || 'guest'}></welcome-sidebar>
					<links-sidebar></links-sidebar>
				</div>
				<div>
					<home-feed .isLogged=${this.user} .user=${this.user}></home-feed>
				</div>
		`;
	}
}

customElements.define('home-page', HomePage);


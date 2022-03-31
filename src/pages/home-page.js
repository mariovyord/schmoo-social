import { LitElement, css, html } from 'lit';
import { resets } from '../components-css/resets';
import { getUser, userState } from '../api/auth';

const windowBreakpoint = 700;

export default function renderHome(ctx) {
	ctx.render(html`
		<home-page activePage=${'/'}> </home-page>`);
}

class HomePage extends LitElement {
	static properties = {
		name: { type: String },
		userState,
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
		this.isLogged = getUser();
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
					${this.windowWidth >= windowBreakpoint 
						? html`<sidebar-usercard ></sidebar-usercard>` 
						: null}
				</div>
				<div>
					<home-feed .isLogged=${this.isLogged}></home-feed>
					</div>
		`;
	}
}

customElements.define('home-page', HomePage);


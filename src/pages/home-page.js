import { LitElement, css, html } from 'lit';
import { resets } from '../common/resetsCSS';
import { getAllPosts } from '../api/data';

const windowBreakpoint = 700;

export default function renderHome(ctx) {
	ctx.render(html`
		<home-page activePage=${'/'} .user=${ctx.user}> 
			<home-feed .getPosts=${getAllPosts} .isLogged=${ctx.user} .user=${ctx.user}></home-feed>
		</home-page>`);
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

		@media only screen and (max-width: ${windowBreakpoint}px) {
			:host {
				grid-template-columns: 1fr; 
				gap: 0px;
			}
			welcome-sidebar {
				display: none;
			}
		}
	`
	];
	constructor() {
		super();
		this.activePage = '/';
		// USER comes from the outside as attribute
		this.user = null;
		this.windowWidth = this.getWindowWidth();
	}

	// Check window with and show different content at different widths
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
				${this.windowWidth > windowBreakpoint 
					? html`
						<div>
							<welcome-sidebar user=${this.user?.username || 'guest' }></welcome-sidebar>
						</div>` 
					: null}
				<div>
					<slot></slot>
				</div>
		`;
	}
}

customElements.define('home-page', HomePage);


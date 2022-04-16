import { LitElement, css, html } from 'lit';
import { until } from 'lit/directives/until.js';
import { getUserInfoById } from '../api/data';
import { resets } from '../common/resetsCSS';
import { getPostsByUserId } from '../api/data';

const windowBreakpoint = 700;

export default function renderProfile(ctx) {
	ctx.render(html`
		<profile-page activePage=${'/profile'}>
			<home-feed .getPosts=${getPostsByUserId} .isLogged=${ctx.user} .user=${ctx.user} profileId=${ctx.params.id}>
			</home-feed>
		</profile-page>`);
}

class ProfilePage extends LitElement {
	static properties = {
		name: { type: String },
		userId: { type: String },
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
	constructor() {
		super();
		this.activePage = '/';
		this.userId = null;
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

	getUserProfile = async (id) => {
		const user = await getUserInfoById(id);
		return html`
			<div>
				<sidebar-usercard .user=${user}></sidebar-usercard>
			</div>
			<div>
				<slot></slot>
			</div>
		`;
	}

	async updateWindowWidth() {
		this.windowWidth = window.innerWidth;
	}

	render() {
		return html`
			<div>
			</div>
			<div>
				<slot></slot>
			</div>
		`;
	}
}

customElements.define('profile-page', ProfilePage);

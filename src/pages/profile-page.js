import { LitElement, css, html } from 'lit';
import { until } from 'lit/directives/until.js';
import { getUserInfoById } from '../api/data';
import { resets } from '../common/resetsCSS';
import { getPostsByUserId } from '../api/data';

const windowBreakpoint = 700;

export default function renderProfile(ctx) {
	ctx.render(html`
		<profile-page activePage=${'/profile'} profileId=${ctx.params.id}>
			<home-feed usecase='profile-page' .getPosts=${getPostsByUserId} .isLogged=${ctx.user} .user=${ctx.user}
				profileId=${ctx.params.id}>
			</home-feed>
		</profile-page>`);
}

class ProfilePage extends LitElement {
	static properties = {
		name: { type: String },
		profileId: { type: String },
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
		.sidebar {
			height: fit-content;
			position: sticky;
			top: 10px;
		}
		@media only screen and (max-width: ${windowBreakpoint}px) {
			:host {
				grid-template-columns: 1fr; 
			}
			.sidebar {
				position: static;
				top: 0px;
			}
		}
	`
	];
	constructor() {
		super();
		this.activePage = '/';
		this.profileId = null;
	}

	async userCardPromise(profileId) {
		const res = await getUserInfoById(profileId);
		return html`<sidebar-usercard .user=${res}></sidebar-usercard>`
	}

	render() {
		return html`
			<div class="sidebar">
				${until(this.userCardPromise(this.profileId), html`Loading...`)}
			</div>
			<div>
				<slot></slot>
			</div>
		`;
	}
}

customElements.define('profile-page', ProfilePage);

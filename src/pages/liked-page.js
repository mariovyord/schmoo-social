import { LitElement, css, html } from 'lit';
import { resets } from '../common/resetsCSS';
import { getLikedPostsByUserId } from '../api/data';
import { getUserData } from '../utils/userData';

const windowBreakpoint = 700;

export default function renderLiked(ctx) {
	ctx.render(html`
		<liked-page activePage=${'/'} .user=${ctx.user}>
			<home-feed usecase='liked-page' .getPosts=${getLikedPostsByUserId} .isLogged=${ctx.user} .user=${ctx.user}
				profileId=${ctx.user.id}>
			</home-feed>
		</liked-page>`);
}

class LikedPage extends LitElement {
	static properties = {
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
		.greeting {
			background-color: white;
			padding: 20px;
			border-radius: 5px;
			box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
			margin-bottom: 10px;
		}
		h2 {
			font-size: 1.5rem;
			font-weight: 700;
		}
		.sidebar {
			display: flex;
			flex-direction: column;
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
			.sidebar {
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
	}

	render() {
		return html`
				<div class="sidebar">
					<sidebar-usercard .user=${getUserData()}></sidebar-usercard>
				</div>
				<div>
					<div class="greeting">
						<h2>Here are all the jokes that you loved!</h2>
					</div>
					<slot></slot>
				</div>
		`;
	}
}

customElements.define('liked-page', LikedPage);


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
		.greeting {
			background-color: white;
			padding: 20px;
			border-radius: 5px;
			box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
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
				<div class="sidebar">
					<div class="greeting">
						<h2>Here are all the jokes that you loved!</h2>
					</div>
					${this.windowWidth > windowBreakpoint 
						? html`<sidebar-usercard .user=${getUserData()}></sidebar-usercard>` 
						: null}
				</div>
				<div>
					<slot></slot>
				</div>
		`;
	}
}

customElements.define('liked-page', LikedPage);


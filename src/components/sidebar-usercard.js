import { LitElement, css, html } from 'lit';
import { resets } from '../common/resetsCSS';

class SidebarUsercard extends LitElement {
	static properties = {
		user: { type: Object },
	}

	static styles = [
		resets,
		css`
			:host {
				display: flex;
				flex-direction: column;
				gap: 10px;
				background-color: white;
				border-radius: 5px;
				padding: 20px;
				box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
			}
			
			.pic-container {
				margin: 0 auto;
				border-radius: 50%;
				width: 130px;
				height: 130px;
				overflow: hidden;
				aspect-ratio: 1;
			}
			h2 {
				text-align: center;
				font-size: 1.1rem;
				font-weight: 600;
			}
			a:hover {
				text-decoration: underline;
			}
			p {
				font-size: 0.9rem;
				text-align: center;
			}
			.handle {
				font-size: 0.9rem;
				color: gray;
			}
			.user-info {
				font-size: 0.9rem;
				line-height: 2;
			}
			.options {
				margin: 0 auto;
				display: flex;
				align-items: center;
				gap: 5px;
			}
		`
	];

	constructor() {
		super();
		// USER comes as attribute
		this.user = null;
	}

	render() {
		const date = new Date(this.user.createdAt);
		return html`
		<div>
			<div class="pic-container"><img class="profile-pic" src="${this.user.picture?.url}"></div>
		</div>
		<div>
			<h2><a href="/profile/${this.user.id}">${this.user.username}</a></h2>
		</div>
		<div class="options">
			<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="gray" class="bi bi-calendar-event"
				viewBox="0 0 16 16">
				<path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
				<path
					d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
			</svg>
			<span class="handle">Joined ${date.toLocaleString()}</span>
		</div>
	`
	}
}

customElements.define('sidebar-usercard', SidebarUsercard);
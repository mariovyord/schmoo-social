import { LitElement, css, html } from 'lit';
import { until } from 'lit/directives/until.js';

import { getUserInfoById } from '../api/data';
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
				position: sticky;
				top: 20px;
			}
			
			.profile-pic {
				display: block;
				margin: 0 auto;
				border-radius: 50%;
				width: 130px;
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
		this.user = null;
	}

	async getFullUserData(id) {
		const fullUserData = await getUserInfoById(id);

		return html`
			<div>
				<img class="profile-pic"
					src="https://i.picsum.photos/id/115/200/300.jpg?hmac=56FxuW0OCxDfO0xEEO_66UkxJMvFKomxr9pNW_uAU5A">
			</div>
			<div>
				<h2><a href="/profile/${fullUserData.id}">${fullUserData.username}</a></h2>
			</div>
			<div class="options">
				<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="gray" class="bi bi-calendar-event"
					viewBox="0 0 16 16">
					<path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
					<path
						d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
				</svg>
				<span class="handle">Joined ${fullUserData.createdAt}</span>
			</div>
		`
	}

	render() {
		return html`
			${until(this.getFullUserData(this.user.id), html`Loading...`)}
		`;
	}
}

customElements.define('sidebar-usercard', SidebarUsercard);
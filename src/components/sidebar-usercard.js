import { LitElement, css, html } from 'lit';
import { userState } from '../api/auth';
import { resets } from '../components-css/resets';

class SidebarUsercard extends LitElement {
	static properties = {
		userState,
	}

	static styles = [
		resets,
		css`
			:host {
				display: flex;
				flex-direction: column;
				gap: 10px;
				background-color: white;
				padding: 20px;
				box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
				position: sticky;
				top: 20px;
			}
			
			.profile-pic {
				display: block;
				margin: 0 auto;
				border-radius: 50%;
				width: 180px;
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
		`
	];

	constructor() {
		super();
		this.user = userState;
	}

	render() {
		return html`
			<div>
				<img class="profile-pic" src="https://picsum.photos/200/200">
			</div>
			<div>
				<h2><a href="/profile">John Atanasoff</a></h2>
				<p class="handle">@johntheslayer</p>
			</div>
			<div class="user-info">
				<p>john@abv.bg</p>
				<p>Following: 89</p>
				<p>Followers: 54</p>
			</div>
		`;
	}
}

customElements.define('sidebar-usercard', SidebarUsercard);
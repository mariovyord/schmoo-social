import { LitElement, css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

class UserCard extends LitElement {
	static properties = {
		error: { type: Boolean },
		errorMsg: { type: String },
	}

	static styles = css`
		:host {
			display: flex;
			width: 90%;
			background-color: white;
			margin: 0 auto;
		}
		:host(:hover) {
			box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
		}
		.profile-pic {
			border-radius: 50%;
			max-width: 50px;
		} 
		.left-div {
			padding: 10px;
		}
		.right-div {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			padding: 10px 10px 10px 0;
		}
		.user-info {
			margin-bottom: 10px;
		}
		#name a {
			font-weight: 700;
			text-decoration: none;
		}
		#name a:hover {
			text-decoration: underline;
			cursor: pointer;
		}
		a:visited {
			color: black;
		}
		#handle {
			font-size: 0.9rem;
			color: gray;
		}
		.options {
			cursor: pointer;
		}
	`;

	render() {
		return html`
			<div class="left-div">
				<!-- profile picture -->
				<a href="#">
					<img class="profile-pic" src="https://picsum.photos/200/200">
				</a>
			</div>
			<div class="right-div">
				<div class="user-info">
					<span id="name"><a href="/profile">John Atanasoff</a></span>
					<span id="handle">@johntheslayer</span>
				</div>
				<div class="options">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots"
						viewBox="0 0 16 16">
						<path
							d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
					</svg>
				</div>
			</div>
		`;
	}
}

customElements.define('user-card', UserCard);

import { LitElement, css, html } from 'lit';
import { userState } from '../api/auth';


class ProfileCard extends LitElement {
	static properties = {
		userState,
	}

	static styles = css`
	* {
		box-sizing: border-box;
	}
	:host {
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 10px;
		background-color: white;
		box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
		padding: 24px;
		box-sizing: border-box;
	}
	:host(:hover) {
		box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
	}
	.profile-pic {
		border-radius: 50%;
		max-width: 150px;
		box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
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
	.handle {
		font-size: 0.9rem;
		color: gray;
	}
	.options {
		display: flex;
		align-items: center;
		gap: 5px;
	}
	p {
		text-align: center;
		margin: 0;
		padding: 0;
	}
	`;

	constructor() {
		super();
		this.user = userState;
	}

	render() {
		const date = new Date(Number(this.user.reloadUserInfo.createdAt));
		return html`
		<div class="top-div">
			<!-- profile picture -->
			<a href="#">
				<img class="profile-pic" src="https://picsum.photos/200/200">
			</a>
		</div>
		<div>
			<p id="name"><a href="/profile">${this.user.displayName}</a></p>
			<p class="handle">${this.user.email}</p>
		</div>
		<div class="options">
			<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="gray" class="bi bi-calendar-event"
				viewBox="0 0 16 16">
				<path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
				<path
					d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
			</svg>
			<span class="handle">Joined ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}</span>
		</div>
		`
	}
}

customElements.define('profile-card', ProfileCard);
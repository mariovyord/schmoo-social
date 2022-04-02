import { LitElement, css, html } from 'lit';
import { until } from 'lit/directives/until.js';
import { map } from 'lit/directives/map.js';
import { classMap } from 'lit/directives/class-map.js';
import { resets } from '../components-css/resets';
import { getPostsByUserId } from '../api/data';
import { getUser } from '../api/auth';

class ProfileFeed extends LitElement {
	static properties = {
		usersPosts: { type: Array },
		user: { type: Object },
	}

	static styles = [
		resets,
		css`
		:host {
			padding-top: 23px;
		}
		:host > *:not(:last-child) {
			margin-bottom: 10px; 
		} 
		`
	];
	constructor() {
		super();
		this.userPosts = [];
		this.user = {};
	}

	connectedCallback() {
		super.connectedCallback();
		this.allUserPosts();
	}

	async allUserPosts() {
		const newData = await getPostsByUserId(this.user.uid);
		const posts = Object.entries(newData)
			.sort((a, b) => b[1].createdAt - a[1].createdAt)
			.map(el =>
				html`
				<user-post data-id=${el[0]} creatorUsername=${el[1].creatorUsername ? el[1].creatorUsername : 'User' }
					body=${el[1].body} photoURL=${el[1].photoURL}>
				</user-post>`);
		return posts;
	}

	render() {
		return html`
		${until(this.allUserPosts(), html`Loading...`)}
		`;
	}
}

customElements.define('profile-feed', ProfileFeed);

import { LitElement, css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { resets } from '../common/resetsCSS';

class DetailsNav extends LitElement {
	static properties = {
		postId: { type: String },
		likes: { type: Number },
	}

	static styles = [
		resets,
		css`
		:host {
			display: flex;
			flex-direction: row;
			gap: 10px;
			padding: 20px;
			width: 100%;
			border-radius: 5px;
			background-color: white;
			box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
		}
		a {
			display: block;
			width: 100%;
			color: white;
			font-size: 0.9rem;
			font-weight: 500;
			text-align: center;
			border: 0px;
			border-radius: 3px;
			background-color: #0095f6;
			padding: 0.7rem;
		}
		a:hover {
			background-color: rgba(0, 149, 246, 0.8);
			cursor: pointer;
		}
		.danger {
			background-color: red;
		}
		.danger:hover {
			background-color: darkred;
		}
		.likes-num {
			font-size: 0.9rem;
			opacity: 0.5;
		}
	`
	];

	constructor() {
		super();
		this.postId = null;
		this.likes = 0;
	}

	likePost(e) {
		this.likes++;
		e.target.style.pointerEvents = "none";
	}

	goBack() {
		history.go(-1);
	}

	deletePost() {
		console.log('Delete');
	}

	render() {
		return html`
		<a href="/">User Profile</a>
		<a id="like-button" href="javascript:void(0)" @click=${this.likePost}>Like <span
				class="likes-num">(${this.likes})</span> </a>
		<a class="danger" href="javascript:void(0)" @click=${this.deletePost}>Delete</a>
    `;
	}
}
customElements.define('details-nav', DetailsNav);

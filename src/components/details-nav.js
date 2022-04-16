import { LitElement, css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { deletePostById, putLikes } from '../api/data';
import { resets } from '../common/resetsCSS';

class DetailsNav extends LitElement {
	static properties = {
		postData: { type: Object },
		currentUser: { type: Object },
		likes: { type: Number },
		ctx: { type: Object },
		hasLiked: { type: Boolean },
		isOwner: { type: Boolean },
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
		.disabled{
			pointer-events:none
		}
	`
	];

	constructor() {
		super();
		this.postData = {};
		this.hasLiked = true;
		this.likes = 0;
		this.isOwner = false;
		this.currentUser = null;
		this.ctx = {};
	}

	connectedCallback() {
		super.connectedCallback();
		this.likes = this.postData.likes.length;
		this.hasLiked = this.postData.likes.includes(this.currentUser.id) === true;
		this.isOwner = this.postData.creator.objectId === this.currentUser?.id;
	}

	async likePost(e) {
		e.preventDefault();
		this.hasLiked = true;
		if (this.postData.likes.includes(this.currentUser.id) === false) {
			this.likes++;
			this.postData.likes.push(this.currentUser.id);
			try {
				await putLikes(this.postData.objectId, this.currentUser.id);
			} catch (err) {
				// TODO add error handling
				console.log(err);
			}
		}
	}

	async deletePost() {
		const postId = this.postData.objectId;
		await deletePostById(postId);
		this.ctx.page.redirect('/');
	}

	render() {
		return html`
		<a href="/profile/${this.postData.creator.objectId}">Profile</a>
		<a class="${classMap({ 'disabled': this.hasLiked })}" id="like-button" href="javascript:void(0)"
			@click=${this.likePost}>Like <span class="likes-num">(${this.likes})</span> </a>
		${this.isOwner ? html`<a class="danger" href="javascript:void(0)" @click=${this.deletePost}>Delete</a>` : null}
    `;
	}
}
customElements.define('details-nav', DetailsNav);

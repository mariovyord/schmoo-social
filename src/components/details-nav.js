import { LitElement, css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { deletePostById, addLike, removeLike } from '../api/data';
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
		if (this.currentUser) {
			this.hasLiked = this.postData.likes.includes(this.currentUser.objectId) === true;
			this.isOwner = this.postData.creator.objectId === this.currentUser.objectId;
		}
	}

	async likePost(e) {
		e.preventDefault();
		if (this.currentUser) {
			if (this.hasLiked === false) {
				this.hasLiked = true;
				this.likes++;
				try {
					await addLike(this.postData.objectId, this.currentUser.objectId);
				} catch (err) {
					// TODO add error handling
					console.log(err);
				}
			} else {
				this.hasLiked = false;
				this.likes--;
				try {
					await removeLike(this.postData.objectId, this.currentUser.objectId);
				} catch (err) {
					// TODO add error handling
					console.log(err);
				}
			}
		}
	}

	async deletePost() {
		const postId = this.postData?.objectId;
		if (confirm('Are you sure?')) {
			await deletePostById(postId);
			this.ctx.page.redirect('/');
		}
	}

	render() {
		return html`
		<a href="/profile/${this.postData?.creator.objectId}">Profile</a>
		${this.currentUser 
			? html`<a id="like-button" href="javascript:void(0)" @click=${this.likePost}>${this.hasLiked ? html`Unlike` : html`Like`} <span
				class="likes-num">(${this.likes})</span> </a>` 
			: null}
		${this.isOwner ? html`<a class="danger" href="javascript:void(0)" @click=${this.deletePost}>Delete</a>` : null}
    `;
	}
}
customElements.define('details-nav', DetailsNav);

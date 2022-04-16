import { LitElement, css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import page from 'page';
import { addLike, removeLike } from '../api/data';
import { resets } from '../common/resetsCSS';

class UserPost extends LitElement {
	static properties = {
		postType: { type: String },
		likes: { type: Number },
		reposts: { type: Number },
		body: { type: String },
		date: { type: String },
		creator: { type: Object },
		postData: { type: Object },
		currentUser: { type: Object },
		hasLiked: { type: Boolean },
		isOwner: { type: Boolean },
	}

	static styles = [
		resets,
		css`
		p {
			margin: 0;
			padding: 0;
			font-weight: normal;
		}
		:host {
			display: flex;
			background-color: white;
			box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
			padding: 10px;
			border-radius: 5px;
		}
		:host(:hover) {
			box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;
		}
		.profile-pic {
			border-radius: 50%;
			max-width: 50px;
		} 
		.user-info {
			margin-bottom: 10px;
		}
		#name {
			font-weight: 700;
		}
		#name:hover {
			text-decoration: underline;
			cursor: pointer;
		}
		#handle-and-time {
			font-size: 0.9rem;
			color: gray;
		}
		.left-div {
			padding-right: 10px;
		}
		.right-div {
		}
		#post-content {
			margin-bottom: 10px;
		}
		.options-buttons {
			display: flex;
		}
		.icon {
			display: flex;
			gap: 5px;
			align-items: center;
			margin-right: 30px;
		}
		.icon:hover {
			cursor: pointer;
		}
		.icon-number {
			color: gray;
			font-size: 0.8rem;
		}
		svg:hover {
			fill: orange;
		}
	`
	];

	constructor() {
		super();
		this.postData = {};
		this.postType = "post";
		this.likes = 0;
		this.reposts = 2;
		this.body = '';
		this.date = '4/12/2022, 5:43:26 PM';
		this.creator = {};
		this.hasLiked = true;
		this.isOwner = false;
		this.currentUser = null;
	}

	connectedCallback() {
		super.connectedCallback();
		this.likes = this.postData.likes.length;
		this.hasLiked = this.postData.likes.includes(this.currentUser.id) === true;
		this.isOwner = this.postData.creator.objectId === this.currentUser?.id;
	}

	getPostDetails(e) {
		if (this.postType === 'post') {
			const id = this.dataset.id;
			page.redirect('/posts/' + id);
		}
	}

	async likePost(e) {
		e.preventDefault();
		if (this.hasLiked === false) {
			this.hasLiked = true;
			this.likes++;
			try {
				await addLike(this.postData.objectId, this.currentUser.id);
			} catch (err) {
				// TODO add error handling
				console.log(err);
			}
		} else {
			this.hasLiked = false;
			this.likes--;
			try {
				await removeLike(this.postData.objectId, this.currentUser.id);
			} catch (err) {
				// TODO add error handling
				console.log(err);
			}
		}
	}

	render() {
		const date = new Date(this.date);
		return html`
			<div class="left-div">
				<!-- profile picture -->
				<a href="/profile/${this.creator.objectId}">
					<img class="profile-pic" src="${this.creator.picture.url}">
				</a>
			</div>
			<div class="right-div">
				<!-- New Post -->
				<div>
					<!-- User Information -->
					<div class="user-info">
						<a href="/profile/${this.creator.objectId}" id="name">${this.creator.username}</a>
						<span id="handle-and-time">(${date.toLocaleString()})</span>
					</div>
					<!-- Post Content -->
					<div>
						<p id="post-content">${this.body}</p>
					</div>
					<!-- Options -->
					${this.postType === 'post'
					? html`<div class="options-buttons">
						<div class="icon" @click=${this.getPostDetails}>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0095f6" class="bi bi-chat"
								viewBox="0 0 16 16">
								<path
									d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
							</svg>
						</div>
						<div class="icon" @click=${this.likePost}>
							${this.hasLiked 
								? html`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0095f6" class="bi bi-heart-fill"
								viewBox="0 0 16 16">
								<path fill-rule="evenodd"
									d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
								</svg>`
								:  html`
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0095f6" class="bi bi-heart"
								viewBox="0 0 16 16">
								<path
									d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
									</svg>`
							}							
							<span class="icon-number">${this.likes}</span>
						</div>
					</div>`
					: null}
				</div>
			</div>
		`;
	}
}

customElements.define('user-post', UserPost);

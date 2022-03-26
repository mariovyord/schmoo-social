import { LitElement, css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import page from 'page';

class UserPost extends LitElement {
	static properties = {
		likes: { type: Number },
		reposts: { type: Number },
		comments: { type: Number },
		body: { type: String },
		creatorUsername: { type: String },
		photoURL: { type: String },
	}

	static styles = css`
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
			cursor: pointer;
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
	`;

	constructor() {
		super();
		this.likes = 5;
		this.comments = 3;
		this.reposts = 2;
		this.body = '';
		this.creatorUsername = 'User';
		this.photoURL = 'https://picsum.photos/200/200';
	}

	getPostDetails(e) {
		e.preventDefault();
		const id = e.target.dataset.id;
		page.redirect('/posts/' + id);
	}

	connectedCallback() {
		super.connectedCallback();
		this.addEventListener('click', this.getPostDetails.bind(this));
	}

	disconnectedCallback() {
		this.removeEventListener('click', this.getPostDetails.bind(this));
		super.disconnectedCallback();
	}

	render() {
		return html`
			<div class="left-div">
				<!-- profile picture -->
				<a href="#">
					<img class="profile-pic" src="${this.photoURL}">
				</a>
			</div>
			<div class="right-div">
				<!-- New Post -->
				<div>
					<!-- User Information -->
					<div class="user-info">
						<a id="name">${this.creatorUsername}</a>
						<span id="handle-and-time">(05:27, 25.03.2022)</span>
					</div>
					<!-- Post Content -->
					<div>
						<p id="post-content">${this.body}</p>
					</div>
					<!-- Options -->
					<div class="options-buttons">
						<div class="icon">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0095f6" class="bi bi-chat"
								viewBox="0 0 16 16">
								<path
									d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
							</svg>
							<span class="icon-number">${this.comments}</span>
						</div>
						<div class="icon">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0095f6" class="bi bi-arrow-repeat"
								viewBox="0 0 16 16">
								<path
									d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
								<path fill-rule="evenodd"
									d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
							</svg>
							<span class="icon-number">${this.reposts}</span>
						</div>
						<div class="icon">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0095f6" class="bi bi-heart"
								viewBox="0 0 16 16">
								<path
									d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
							</svg>
							<span class="icon-number">${this.likes}</span>
						</div>
					</div>
				</div>
			</div>
		`;
	}
}

customElements.define('user-post', UserPost);

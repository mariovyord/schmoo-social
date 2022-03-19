// COMPONENTS
import './components/login-form.js';
import './components/register-form.js';
import './components/side-nav.js';
import './components/mobile-nav.js';
import './components/new-post.js';
import './components/user-post.js';
import './components/user-card.js';

// PAGES
import './pages/home-page.js';
import './pages/network-page.js';
import './pages/profile-page.js';
import './pages/settings-page.js';

// ROOT COMPONENT
import './pages/app-root.js'

// CSS
import '../static/app.css';

// LIBRARIES
import { LitElement, css, html, render } from 'lit';
import page from 'page';

// CONSTANTS
const outlet = document.getElementById('outlet');

// ROUTER
page('/', () => render(html`
<app-root>
	<home-page></home-page>
</app-root>`, outlet));
page('/profile', () => render(html`<app-root>
	<profile-page></profile-page>
</app-root>`, outlet));
page('/network', () => render(html`<app-root>
	<network-page></network-page>
</app-root>`, outlet));
page('/search', () => render(html`<app-root>
	<search-page></search-page>
</app-root>`, outlet));
page('/settings', () => render(html`<app-root>
	<settings-page></settings-page>
</app-root>`, outlet));
page('/login', () => render(html`<app-root>
	<login-page></login-page>
</app-root>`, outlet));
page('/register', () => render(html`<app-root>
	<register-page></register-page>
</app-root>`, outlet));
page.start();

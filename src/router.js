import { html, render } from 'lit';
import page from 'page';
import renderHome from './pages/home-page';
import attachRender from './middleware/attachRender';
import renderProfile from './pages/profile-page';
import renderCircles from './pages/circles-page';
import renderSearch from './pages/search-page';
import renderSettings from './pages/settings-page';
import renderRegister from './pages/register-page';
import renderLogin from './pages/login-page';

export const outlet = document.getElementById('outlet');

// MIDDLEWARE
page(attachRender);

// PAGES
page('/', renderHome);

page('/profile', renderProfile);

page('/circles', renderCircles);

page('/search', renderSearch);

page('/settings', renderSettings);

page('/login', renderLogin);

page('/register', renderRegister);

page('/posts/:id', () => render(html`<app-root>
	<details-page>
	</details-page>
</app-root>`, outlet));


page.start();


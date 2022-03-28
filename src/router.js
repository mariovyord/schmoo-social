import { html, render } from 'lit';
import page from 'page';
import renderHome from './pages/home-page';
import { attachMethods } from './middleware/attachMethods';

export const outlet = document.getElementById('outlet');

// MIDDLEWARE
page(attachMethods);

// PAGES
page('/', renderHome);

page('/profile', () => render(html`<app-root activePage=${'/profile'}> <profile-page>
	</profile-page>
</app-root>`, outlet));

page('/circles', () => render(html`<app-root activePage=${'/circles'}> <circles-page>
	</circles-page>
</app-root>`, outlet));

page('/search', () => render(html`<app-root activePage=${'/search'}> <search-page>
	</search-page>
</app-root>`, outlet));

page('/settings', () => render(html`<app-root activePage=${'/settings'}> <settings-page>
	</settings-page>
</app-root>`, outlet));

page('/login', () => render(html`<app-root activePage=${'/login'}> <login-page>
	</login-page>
</app-root>`, outlet));

page('/register', () => render(html`<app-root activePage=${'/register'}> <register-page>
	</register-page>
</app-root>`, outlet));

page('/posts/:id', () => render(html`<app-root>
	<details-page>
	</details-page>
</app-root>`, outlet));


page.start();


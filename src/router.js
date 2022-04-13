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
import renderDetails from './pages/details-page';
import renderNav from './middleware/renderNav';
import attachUser from './middleware/attachUser';

export const outlet = document.getElementById('outlet');

// MIDDLEWARE
page(attachRender);
page(attachUser);
page(renderNav);

// PAGES
page('/', renderHome);

page('/profile/:id', renderProfile);

page('/circles', renderCircles);

page('/search', renderSearch);

page('/settings', renderSettings);

page('/settings/edit', renderSettings);

page('/login', renderLogin);

page('/register', renderRegister);

page('/posts/:id', renderDetails);


page.start();


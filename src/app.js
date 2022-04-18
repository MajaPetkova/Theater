import { page, render } from './lib.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js'
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { profilePage } from './views/profile.js';
import { logout } from './api/data.js';
import { getUserData } from './util.js';

// console.log('it works') //proverka za vrzvaneto

import * as api from './api/data.js'; // za testvane na url
window.api = api;

const root = document.getElementById('content')
    // document.getElementById('logoutBtn').addEventListener('click', onLogout)

page(decorateContext);
// page('/', () => console.log('home page'))

page('/', homePage);
page('/login', loginPage)
page('/profile', profilePage)
page('/register', registerPage);
page('/create', createPage);
page('/edit/:id', editPage);
page('/details/:id', detailsPage);
page('/logout', onLogout)


// updateUserNav();
page.start()

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root)
    ctx.updateUserNav = updateUserNav;

    next();
}

function updateUserNav() {
    const userData = getUserData();
    if (userData) {
        document.getElementById('user').style.display = 'inline-block'
        document.getElementById('guest').style.display = 'none'
    } else {
        document.getElementById('user').style.display = 'none'
        document.getElementById('guest').style.display = 'inline-block'
    }
}


function onLogout(ctx) {
    logout();
    updateUserNav();
    ctx.page.redirect('/')
}
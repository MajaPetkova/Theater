import { getMyTheaters } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';
import { theaterCard } from './common.js';

const profileTemplate = (theaters, user) => html `<section id="profilePage">
<div class="userInfo">
    <div class="avatar">
        <img src="./images/profilePic.png">
    </div>
    <h2>${user.email}</h2>
</div>
<div class="board">
${theaters.length==0
      ?html` <div class="no-events">
              <p>This user has no events yet!</p>
             </div>`
      :html`${theaters.map(theaterCard)}`
    }

  
   
</div>
</section>`

export async function profilePage(ctx) {
    const userData = getUserData();
    const theaters = await getMyTheaters(userData.id)
    ctx.render(profileTemplate(theaters, userData))
}
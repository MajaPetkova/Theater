import { html } from '../lib.js';
import { getTheaterById } from '../api/data.js';
import { getUserData } from '../util.js';
import { deleteTheater } from '../api/data.js';


const detailsTemplate = (theater, isOwner, onDelete) => html `<section id="detailsPage">
<div id="detailsBox">
    <div class="detailsInfo">
        <h1>${theater.title}</h1>
        <div>
            <img src=${theater.imageUrl}/>
        </div>
    </div>

    <div class="details">
        <h3>Theater Description</h3>
        <p>${theater.description}</p>
        <h4>Date: ${theater.date}</h4>
        <h4>Author: ${theater.author}</h4>
        
        
         <div class="buttons">
            ${theaterControlTemplate(theater, isOwner, onDelete)}
        </div>
        <!-- <a class="btn-like" href="/likes">Like</a> -->
        <p class="likes">Likes: 0</p>
    </div>
</div>
</section>`;
const theaterControlTemplate = (theater, isOwner, onDelete) => {
    if (isOwner) {
        return html `<a @click=${onDelete} class="btn-delete" href="javascript:void(0)">Delete</a>
        <a class="btn-edit" href="/edit/${theater._id}">Edit</a>`

    } else {
        return null
    }
};



export async function detailsPage(ctx) {
    const theater = await getTheaterById(ctx.params.id);
    const userData = getUserData()
    const isOwner = userData && userData.id == theater._ownerId

    ctx.render(detailsTemplate(theater, isOwner, onDelete));


    async function onDelete() {
        const choise = confirm("Are you sure?")

        if (choise) {
            await deleteTheater(ctx.params.id)
            ctx.page.redirect('/profile')
        }

    }
}
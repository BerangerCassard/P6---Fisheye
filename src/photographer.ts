import {MediaFactory, Photographer} from "./domain/model.class";
import {Media} from "./domain/model.class";
import {Image} from "./domain/model.class";
import {Video} from "./domain/model.class";
import {StringUtil} from "./common/string.util";
//import { createRequire } from 'module';

//const require = createRequire(import.meta.url)
//const fetch = require("node-fetch");

const dataFile = "./assets/data/photographers.json";

export const getData = fetch(dataFile)
    .then( (res: any) => res.json())
    .then( (json: any) => {

        /**
         * Find photographer according to id parameter
         */
        const paramId = new URL(window.location.href).searchParams.get('id');
        const photographer = json.photographers.find( photographer => photographer.id == paramId);

        /**
         * Create a photographer object
         */
        const photographerInstance = new Photographer(photographer.name, photographer.id, photographer.city, photographer.country, photographer.price, photographer.portrait, photographer.tagline, photographer.tags);

        /**
         * Create a media Factory
         */
        const mediaFactory = new MediaFactory()

        /**
         * Gather all photographers Medias
         */
        const photographerMedias = json.media.filter( media => media.photographerId == paramId)

        /**
         * Pass medias through Factory
         */
        const photographerMediasInstances = []
        photographerMedias.forEach( media => {
            if(media.image){
                const imageMedia = new Image(media.id, media.photographerId, media.date, media['alt-txt'], media.price, media.tags, media.likes, media.image);
                photographerMediasInstances.push(imageMedia)
            } else if (media.video) {
                const videoMedia = new Video(media.id, media.photographerId, media.date, media['alt-txt'], media.price, media.tags, media.likes, media.video);
                photographerMediasInstances.push(videoMedia)
            }
            //const mediaInstance = mediaFactory.createMedia(media.id, media.photographerId, media.date, media['alt-txt'], media.price, media.tags, media.likes, media.image)
            //photographerMediasInstances.push(mediaInstance)
        })

        /**
         * Total Likes
         */
        const likesList = (photographerMediasInstances as unknown as Media[]).map( media => media.likes);
        const sumLikes = likesList.reduce( (previousValue, currentValue) => previousValue + currentValue);

        /**
         * Display photographers header and summary
         * */
        photographerInstance.profileHeaderAndSummary(sumLikes)

        /**
         * For each Media display publication
         */
        const mediasContainer = document.getElementById('publication-section');
        photographerMediasInstances.forEach( media => mediasContainer.innerHTML += media.publication())

        /**
         * Filter //TODO review filter by title
         */
        const likesFilter = document.getElementById('order-choice');
        likesFilter.addEventListener('change', (event)=> {
            mediasContainer.innerHTML = StringUtil.empty();

            if((event.target as HTMLTextAreaElement).value == 'likes') {
                (photographerMediasInstances as unknown as Media[]).sort((a,b) => b.likes - a.likes ); //TODO factor with common
                photographerMediasInstances.forEach( media => mediasContainer.innerHTML += media.publication())
            }
            else if((event.target as HTMLTextAreaElement).value == 'date') {
                (photographerMediasInstances as unknown as Media[]).sort( (a,b) => (new Date(b.date) as any) - (new Date(a.date) as any) ); //TODO factor with common
                photographerMediasInstances.forEach( media => mediasContainer.innerHTML += media.publication())
            }
            else if((event.target as HTMLTextAreaElement).value == 'title') {
                (photographerMediasInstances as unknown as Media[]).sort( (a,b) => a.altTxt.localeCompare(b.altTxt) ); //TODO factor with common
                photographerMediasInstances.forEach( media => mediasContainer.innerHTML += media.publication())

            }
/*            const target = (event.target as HTMLTextAreaElement).value;
            switch (target) {
                case 'likes':
                    mediasContainer.innerHTML = StringUtil.empty();
                    (photographerMediasInstances as unknown as Media[]).sort((a,b) => b.likes - a.likes ); //TODO try to make it works
                    photographerMediasInstances.forEach( media => mediasContainer.innerHTML += media.publication())

                case 'date':
                    mediasContainer.innerHTML = StringUtil.empty();
                    (photographerMediasInstances as unknown as Media[]).sort( (a,b) => (new Date(b.date) as any) - (new Date(a.date) as any) );
                    photographerMediasInstances.forEach( media => mediasContainer.innerHTML += media.publication())
                case 'title' :
                    mediasContainer.innerHTML = StringUtil.empty();
                    (photographerMediasInstances as unknown as Media[]).sort( (a,b) => a.altTxt.localeCompare(b.altTxt) );
                    photographerMediasInstances.forEach( media => mediasContainer.innerHTML += media.publication())
            }*/
        })

        /**
         * Open Modal
         */
        const modal = document.getElementById('open-modal');
        const contact = document.getElementById('contact-photographer'); //TODO contact or contactButton ?
        contact.addEventListener('click', ()=> modal.style.display = 'block')

        /**
         * Close Modal
         */
        const closeModal = document.getElementById('close-modal');
        closeModal.addEventListener('click', ()=> modal.style.display = 'none')

        /**
         * Modal validation
         */
        const validateModal = document.getElementById('validate-modal');
        validateModal.addEventListener('click', (event)=> {
            event.preventDefault();
            console.log('firstName', (document.getElementById('first') as HTMLInputElement).value);
            console.log('lastName', (document.getElementById('last') as HTMLInputElement).value);
            console.log('mail', (document.getElementById('mail') as HTMLInputElement).value);
        })

        /**
         * Create slides HTML for each Media, Photo or Video
         * */
            //TODO make the page number start at 1
        const modalContainer = document.getElementById('modal-medias');
        let i
        for( i=0; i<photographerMediasInstances.length; i++) {
            if(photographerMediasInstances[i].image) {
                modalContainer.innerHTML += `<div id="${photographerMediasInstances[i].id}" class="slides" style="display: none" data-rank="${i}">
                  <div class="numberText"> ${i}/ ${photographerMediasInstances.length}</div>
                  <img src="./assets/images/${paramId}/${photographerMediasInstances[i].image}" style="width:100%">
                </div>`
            }
            else if (photographerMediasInstances[i].video) {
                modalContainer.innerHTML += `<div id="${photographerMediasInstances[i].id}" class="slides" style="display: none" data-rank="${i}">
                  <div class="numberText"> ${i}/ ${photographerMediasInstances.length}</div>
                  <img src="./assets/images/${paramId}/${photographerMediasInstances[i].video}" style="width:100%">
                </div>`
            }
        }

        const slides = document.getElementsByClassName('slides')
        const images = document.getElementsByClassName('post');
        const lightboxModal = document.getElementById('lightbox-modal');
        const crossLightboxModal = document.getElementById('close-lightbox-modal');
        let clickedMedia

        /**
         * When click on Image...
         */
        Array.from(images).forEach( publication => publication.addEventListener('click', (event)=> {

            /**
             * Open Modal Lightbox
             * */
            lightboxModal.style.display = 'block';

            /**
             * Save Image ID and for each Slide test if ID is matching, if yes, display block
             * */
            clickedMedia = ((event.target as HTMLTextAreaElement).getAttribute('id'));
            Array.from(slides).forEach( slide => {
                if(slide.id == clickedMedia) {
                    (slide as HTMLTextAreaElement).style.display = 'block'
                }
            })
        }) )

        /**
         * Display next post if not last child
         * */
        const next = document.getElementById('next');
        next.addEventListener('click', ()=> {
            let i;
            for(i=0; i<Array.from(slides).length; i++) {
                if((Array.from(slides)[i] as HTMLTextAreaElement).style.display == "block" && (Array.from(slides)[i] as HTMLTextAreaElement) !== modalContainer.lastChild ) {
                    (Array.from(slides)[i] as HTMLTextAreaElement).style.display = "none";
                    (Array.from(slides)[++i] as HTMLTextAreaElement).style.display = "block"}
            }
        })

        /**
         * Display previous post if not first child
         * */
        const previous = document.getElementById('previous');
        previous.addEventListener('click', ()=> {
            let i;
            for(i=0; i<Array.from(slides).length; i++) {
                if((Array.from(slides)[i] as HTMLTextAreaElement).style.display == "block" && (Array.from(slides)[i] as HTMLTextAreaElement) !== modalContainer.firstChild) {
                    (Array.from(slides)[i] as HTMLTextAreaElement).style.display = "none";
                    (Array.from(slides)[--i] as HTMLTextAreaElement).style.display = "block"}
            }
        })


        /**
         * Close Lightbox Modal
         */
        crossLightboxModal.addEventListener('click', ()=> {
            lightboxModal.style.display = "none";

            Array.from(slides).forEach( slide => {
                (slide as HTMLTextAreaElement).style.display = 'none';
            })
        });




        /*        let slideIndex = 1;

                function showSlides (n) {
                    let slides = document.getElementsByClassName('slides');
                    const caption = document.getElementById('caption');

                    if (n > slides.length) {
                        slideIndex = 1
                    }
                    else if( n < 1) {
                        slideIndex = slides.length
                    }

                    let i;
                    for(i=0; i<slides.length; i++) {
                        (slides[i] as HTMLTextAreaElement).style.display = 'none'
                    }

                    (slides[slideIndex-1] as HTMLTextAreaElement).style.display = 'block';
                }

                showSlides(slideIndex);*/

        }
    )





import {MediaFactory, Photographer} from "./domain/model.class";
import {Media} from "./domain/model.class";
import {Image} from "./domain/model.class";
import {Video} from "./domain/model.class";
import {StringUtil} from "./common/string.util";
import "./assets/styles/sass/main.scss";


const dataFile = "./assets/data/photographers.json";

export const getData = fetch(dataFile)
    .then((res: any) => res.json())
    .then((json: any) => {

            /**
             * Find photographer according to id parameter
             */
            const paramId = new URL(window.location.href).searchParams.get('id');
            const photographer = json.photographers.find(photographer => photographer.id == paramId);

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
            const photographerMedias = json.media.filter(media => media.photographerId == paramId)

            /**
             * Pass medias through Factory
             */
            const photographerMediasInstances = []
            photographerMedias.forEach(media => {
                if (media.image) {
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
            const likesList = (photographerMediasInstances as unknown as Media[]).map(media => media.likes);
            const sumLikes = likesList.reduce((previousValue, currentValue) => previousValue + currentValue);

            /**
             * Display photographers header and summary
             * */
            photographerInstance.profileHeaderAndSummary(sumLikes)

            /**
             * For each Media display publication, if 2 publications on a line, display empty div
             */
            const mediasContainer = document.getElementById('publication-section');
            photographerMediasInstances.forEach(media => {
                mediasContainer.innerHTML += media.publication();
            })
            if(photographerMediasInstances.length % 3 == 2){
                mediasContainer.innerHTML += `<div class="publication" style="width: 350px"></div>`
            }

            /**
             * Filter //TODO review filter by title
             */
            const likesFilter = document.getElementById('order-choice');
            likesFilter.addEventListener('change', (event) => {
                mediasContainer.innerHTML = StringUtil.empty();
                if ((event.target as HTMLTextAreaElement).value == 'likes') {
                    (photographerMediasInstances as unknown as Media[]).sort((a, b) => b.likes - a.likes); //TODO factor with common
                    photographerMediasInstances.forEach(media => mediasContainer.innerHTML += media.publication())
                } else if ((event.target as HTMLTextAreaElement).value == 'date') {
                    (photographerMediasInstances as unknown as Media[]).sort((a, b) => (new Date(b.date) as any) - (new Date(a.date) as any)); //TODO factor with common
                    photographerMediasInstances.forEach(media => mediasContainer.innerHTML += media.publication())
                } else if ((event.target as HTMLTextAreaElement).value == 'title') {
                    (photographerMediasInstances as unknown as Media[]).sort((a, b) => a.altTxt.localeCompare(b.altTxt)); //TODO factor with common
                    photographerMediasInstances.forEach(media => mediasContainer.innerHTML += media.publication())
                }
            })

            /**
             * Increment Likes
             */
            const likes = document.getElementsByClassName('publication__description__infos__like');
            function incrementLikes(event) {
                (event.target as HTMLTextAreaElement).innerHTML = `${parseInt((event.target as HTMLTextAreaElement).innerText) + 1}`
            }
            Array.from(likes).forEach(like => {
                like.addEventListener('click', incrementLikes);
                like.addEventListener('keydown', (event)=> {
                    if((event as KeyboardEvent).keyCode == 13) {
                        incrementLikes(event);
                    }
                })
            })

            /**
             * Open Contact Modal and focus in//TODO factorize listener to class
             */
            const modal = document.getElementById('open-modal');
            const contact = document.getElementById('contact-photographer');
            const contactButtons = document.getElementsByClassName('contact');
            const firstName = document.getElementById('first');

                /**
                 * Enable Key to Close Modal, remove Key navigation, get the focus back to contact button
                 * */
            function enableModalKeyClose (event) {
                addEventListener('keydown', (event) => {
                    console.log('enable close contact')
                    if (event.keyCode == 27) {
                        modal.style.display = 'none';
                        console.log('remove keydown');
                        modalCross.removeEventListener('keydown', enableModalKeyClose);
                        contact.focus();
                    }
                })
            }

            Array.from(contactButtons).forEach(button => button.addEventListener('click', () => {
modal.style.display = 'block';
                firstName.focus();
                document.addEventListener('keydown', enableModalKeyClose)
            }))


            /**
             * Close Contact Modal on click
             */
            const modalCross = document.getElementById('close-modal');
            modalCross.addEventListener('click', () => modal.style.display = 'none');


            /**
             * Contact Modal validation
             */
            const validateModal = document.getElementById('validate-modal');
            validateModal.addEventListener('click', (event) => {
                event.preventDefault();
                console.log('firstName', (document.getElementById('first') as HTMLInputElement).value);
                console.log('lastName', (document.getElementById('last') as HTMLInputElement).value);
                console.log('mail', (document.getElementById('mail') as HTMLInputElement).value);
                console.log('test');
                //modal.style.display = "none";
            })

            /**
             * Create slides HTML for each Media, Photo or Video
             * */
                //TODO make the page number start at 1
            const mediaViewer = document.getElementById('media-viewer');
            let i
            for (i = 0; i < photographerMediasInstances.length; i++) {
                if (photographerMediasInstances[i].image) {
                    mediaViewer.innerHTML += `<div id="${photographerMediasInstances[i].id}" class="slides" style="display: none" data-rank="${i}">
                  <img src="./assets/images/${paramId}/${photographerMediasInstances[i].image}">
                </div>`
                } else if (photographerMediasInstances[i].video) {
                    mediaViewer.innerHTML += `<div id="${photographerMediasInstances[i].id}" class="slides" style="display: none" data-rank="${i}">
                  <video controls src="./assets/images/${paramId}/${photographerMediasInstances[i].video}"></video>
                </div>`
                }
            }

            const slides = document.getElementsByClassName('slides')
            const images = document.getElementsByClassName('post');
            const lightboxModal = document.getElementById('lightbox-modal');
            const crossLightboxModal = document.getElementById('close-lightbox-modal');
            const caption = document.getElementById('caption');
            let clickedMedia

            /**
             * Lightbox Modal
             */

                /**
                 * Enable Key navigation, to close lightbox modal, next slide and previous slide
                 * */
            function enableLightboxKeyNavigation(event) {
                if (event.keyCode == 27) {
                    lightboxModal.style.display = 'none';
                    Array.from(slides).forEach(slide => {(slide as HTMLTextAreaElement).style.display = 'none'});
                    document.removeEventListener("keydown", enableLightboxKeyNavigation);
                } else if (event.keyCode == 39) {
                    nextSlide()
                } else if (event.keyCode == 37) {
                    previousSlide()
                }
            }

            function openLightbox(event) {
                /**
                 * Open Modal Lightbox
                 * */
                lightboxModal.style.display = 'flex';

                /**
                 * Save Image ID and for each Slide test if ID is matching, if yes, display block
                 * */
                clickedMedia = ((event.target as HTMLTextAreaElement).getAttribute('id'));
                Array.from(slides).forEach(slide => {if (slide.id == clickedMedia) {(slide as HTMLTextAreaElement).style.display = 'block'}})

                /**
                 * Display caption
                 * */
                const clickedMediaInstance = photographerMediasInstances.find(media => media.id == clickedMedia);
                caption.innerHTML = `${clickedMediaInstance.altTxt}`;

                document.addEventListener("keydown", enableLightboxKeyNavigation);
            }

            Array.from(images).forEach(publication => {
                publication.addEventListener('click', openLightbox);
                publication.addEventListener('keydown', (event)=> {if((event as KeyboardEvent).keyCode == 13) {openLightbox(event)}})})

            /**
             * Find Active Media and inject altTxt in caption
             * */
            function captionForActiveMedia() {
                const openMedia = Array.from(slides).find(media => (media as HTMLTextAreaElement).style.display == 'block');
                const openMediaID = openMedia.getAttribute('id');
                const openMediaInstance = photographerMediasInstances.find(media => media.id == openMediaID);
                caption.innerHTML = `${openMediaInstance.altTxt}`
            }

            /**
             * Display next post if not last child and change caption
             * */
            const next = document.getElementById('next');
            function nextSlide () {
                let i;
                for (i = 0; i < Array.from(slides).length; i++) {
                    if ((Array.from(slides)[i] as HTMLTextAreaElement).style.display == "block" && (Array.from(slides)[i] as HTMLTextAreaElement) !== mediaViewer.lastChild) {
                        (Array.from(slides)[i] as HTMLTextAreaElement).style.display = "none";
                        (Array.from(slides)[++i] as HTMLTextAreaElement).style.display = "block"
                    }
                }
                captionForActiveMedia()
            }
            next.addEventListener('click', nextSlide)

            /**
             * Display previous post if not first child
             * */
            const previous = document.getElementById('previous');
            function previousSlide(){
                let i;
                for (i = 0; i < Array.from(slides).length; i++) {
                    if ((Array.from(slides)[i] as HTMLTextAreaElement).style.display == "block" && (Array.from(slides)[i] as HTMLTextAreaElement) !== mediaViewer.firstChild) {
                        (Array.from(slides)[i] as HTMLTextAreaElement).style.display = "none";
                        (Array.from(slides)[--i] as HTMLTextAreaElement).style.display = "block"
                    }
                }
                captionForActiveMedia()
            }
            previous.addEventListener('click', previousSlide)

            /**
             * Close Lightbox Modal and disable Accessibility commands
             */
            crossLightboxModal.addEventListener('click', () => {
                lightboxModal.style.display = "none";
                document.removeEventListener("keydown", enableLightboxKeyNavigation);

                Array.from(slides).forEach(slide => {
                    (slide as HTMLTextAreaElement).style.display = 'none';
                })
            });
        }
    )





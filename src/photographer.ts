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

        const logo = document.getElementById('logo');
        const slides = document.getElementsByClassName('slides')
        const images = document.getElementsByClassName('post');
        const lightboxModal = document.getElementById('lightbox-modal');
        const crossLightboxModal = document.getElementById('close-lightbox-modal');
        const caption = document.getElementById('caption');
        const next = document.getElementById('next');
        const previous = document.getElementById('previous');
        const pageName = document.getElementById('photographer');
        const mediasContainer = document.getElementById('publication-section');
        const likesFilter = document.getElementById('order-choice');
        const likes = document.getElementsByClassName('publication__description__infos__like');
        const modalCross = document.getElementById('close-modal');
        const validateModal = document.getElementById('validate-modal');
        const modal = document.getElementById('open-modal');
        const contact = document.getElementById('contact-photographer');
        const contactButtons = document.getElementsByClassName('contact');
        const firstName = document.getElementById('first');
        const mediaViewer = document.getElementById('media-viewer');
        const body = document.getElementById('body');
        let clickedMedia
        let clickedMediaSelector

        /**
             * Focus on logo when page loaded
             * */
            logo.focus()

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
             * Name page
             * */
            pageName.innerHTML = `${photographerInstance.name}`

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
            photographerMediasInstances.forEach(media => {
                mediasContainer.innerHTML += media.publication();
            })
            if(photographerMediasInstances.length % 3 == 2){
                mediasContainer.innerHTML += `<div class="publication" style="width: 350px"></div>`
            }

            /**
             * Increment Likes
             */
            function incrementLikes(event) {
                (event.target as HTMLTextAreaElement).innerHTML = `${parseInt((event.target as HTMLTextAreaElement).innerText) + 1}`
            }

            function enableLikeEventListener() {
                Array.from(likes).forEach(like => {
                    like.addEventListener('click', incrementLikes);
                    like.addEventListener('keydown', (event)=> {
                        if((event as KeyboardEvent).keyCode== 13) {
                            incrementLikes(event);
                        }
                    })
                })
            }
            enableLikeEventListener();

            /**
             * Open Contact Modal and focus in//TODO factorize listener to class
             */
                /**
                 * Enable Key to Close Modal, remove Key navigation, get the focus back to contact button
                 * */
            function enableModalKeyClose (event) {
                addEventListener('keydown', (event) => {
                    if (event.keyCode == 27) {
                        modal.style.display = 'none';
                        body.style.overflow = "revert";
                        modalCross.removeEventListener('keydown', enableModalKeyClose);
                        contact.focus();
                    }
                })
            }
            function enableContactEventListener () {
                Array.from(contactButtons).forEach(button => button.addEventListener('click', () => {
                    modal.style.display = 'block';
                    firstName.focus();
                    body.style.overflow = 'hidden';
                    document.addEventListener('keydown', enableModalKeyClose)
                }))
            }
            enableContactEventListener()

            /**
             * Close Contact Modal on click
             */
            modalCross.addEventListener('click', () => {
                modal.style.display = 'none';
                body.style.overflow = "revert";
            });

            /**
             * Contact Modal validation : display information in console, close modal and focus on logo
             */
            validateModal.addEventListener('click', (event) => {
                modal.style.display = "none";
                event.preventDefault();
                console.log('firstName', (document.getElementById('first') as HTMLInputElement).value);
                console.log('lastName', (document.getElementById('last') as HTMLInputElement).value);
                console.log('mail', (document.getElementById('mail') as HTMLInputElement).value);
                body.style.overflow = "revert";
                contact.focus()
            })

            /**
             * Create slides HTML for each Media, Photo or Video
             * */

            function createSlidesForLightbox() {
                mediaViewer.innerHTML = '';
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
            }

            createSlidesForLightbox()


            /**
             * Lightbox Modal
             */
                /**
                 * Enable Key navigation, to close lightbox modal, next slide and previous slide
                 * */
            function enableLightboxKeyNavigation(event) {
                if (event.keyCode == 27) {
                    lightboxModal.style.display = 'none';
                    body.style.overflow = 'revert';
                    Array.from(slides).forEach(slide => {(slide as HTMLTextAreaElement).style.display = 'none'});
                    document.removeEventListener("keydown", enableLightboxKeyNavigation);
                    clickedMediaSelector.focus();
                } else if (event.keyCode == 39) {
                    nextSlide()
                } else if (event.keyCode == 37) {
                    previousSlide()
                }
            }

            next.addEventListener("keydown", (event)=> {
                if(event.keyCode == 13) {
                    nextSlide()
                }
            });

            previous.addEventListener('keydown',(event)=> {
                if(event.keyCode == 13) {
                    previousSlide()
                }
            });

        function openLightbox(event) {
                /**
                 * Open Modal Lightbox
                 * */
                lightboxModal.style.display = 'flex';
                body.style.overflow = 'hidden';

                /**
                 * Focus on Arrow
                 */
                previous.focus()

                /**
                 * Save Image ID and for each Slide test if ID is matching, if yes, display block
                 * */
                clickedMedia = ((event.target as HTMLTextAreaElement).getAttribute('id'));
                clickedMediaSelector = document.getElementById(`${clickedMedia}`);
                Array.from(slides).forEach(slide => {if (slide.id == clickedMedia) {(slide as HTMLTextAreaElement).style.display = 'block'}})

                /**
                 * Display caption
                 * */
                const clickedMediaInstance = photographerMediasInstances.find(media => media.id == clickedMedia);
                caption.innerHTML = `${clickedMediaInstance.altTxt}`;
                caption.setAttribute('aria-label', `${clickedMediaInstance.altTxt}`)

                document.addEventListener("keydown", enableLightboxKeyNavigation);
            }

            function enableLightboxEventListener () {
                Array.from(images).forEach(publication => {
                    publication.addEventListener('click', openLightbox);
                    publication.addEventListener('keydown', (event)=> {if((event as KeyboardEvent).keyCode == 13) {openLightbox(event)}})})
            }

            enableLightboxEventListener()

            /**
             * Find Active Media and inject altTxt in caption
             * */


        function captionForActiveMedia() {
                const openMedia = Array.from(slides).find(media => (media as HTMLTextAreaElement).style.display == 'block');
                const openMediaID = openMedia.getAttribute('id');
                const openMediaInstance = photographerMediasInstances.find(media => media.id == openMediaID);
                caption.innerHTML = `${openMediaInstance.altTxt}`
                caption.setAttribute('aria-label', `${openMediaInstance.altTxt}`)
            }

            /**
             * Display next post if not last child and change caption
             * */
            function nextSlide () {
                let i;
                for (i = 0; i < Array.from(slides).length; i++) {
                    if ((Array.from(slides)[i] as HTMLTextAreaElement).style.display == "block" && (Array.from(slides)[i] as HTMLTextAreaElement) !== mediaViewer.lastChild) {
                        (Array.from(slides)[i] as HTMLTextAreaElement).style.display = "none";
                        (Array.from(slides)[++i] as HTMLTextAreaElement).style.display = "block"
                    }
                }
                captionForActiveMedia();
            }
            next.addEventListener('click', nextSlide)

            /**
             * Display previous post if not first child
             * */
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
                body.style.overflow = 'revert';
                document.removeEventListener("keydown", enableLightboxKeyNavigation);

                Array.from(slides).forEach(slide => {
                    (slide as HTMLTextAreaElement).style.display = 'none';
                })
            });

        /**
         * Filter //TODO review filter by title
         */
        likesFilter.addEventListener('change', (event) => {
            mediasContainer.innerHTML = StringUtil.empty();
            if ((event.target as HTMLTextAreaElement).value == 'likes') {
                (photographerMediasInstances as unknown as Media[]).sort((a, b) => b.likes - a.likes); //TODO factor with common
                photographerMediasInstances.forEach(media => mediasContainer.innerHTML += media.publication());
                enableLikeEventListener();
                createSlidesForLightbox();
                enableLightboxEventListener();
            } else if ((event.target as HTMLTextAreaElement).value == 'date') {
                (photographerMediasInstances as unknown as Media[]).sort((a, b) => (new Date(b.date) as any) - (new Date(a.date) as any)); //TODO factor with common
                photographerMediasInstances.forEach(media => mediasContainer.innerHTML += media.publication());
                enableLikeEventListener();
                createSlidesForLightbox();
                enableLightboxEventListener()
            } else if ((event.target as HTMLTextAreaElement).value == 'title') {
                (photographerMediasInstances as unknown as Media[]).sort((a, b) => a.altTxt.localeCompare(b.altTxt)); //TODO factor with common
                photographerMediasInstances.forEach(media => mediasContainer.innerHTML += media.publication());
                enableLikeEventListener();
                createSlidesForLightbox();
                enableLightboxEventListener();
            }
        })

        }
    )





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
         * Filter
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
         * Display Modal
         */

        }
    )





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
        photographerInstance.profileHeader()

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
         * For each Media create HTML
         */
        const mediasContainer = document.getElementById('publication-section');
        photographerMediasInstances.forEach( media => {
            mediasContainer.innerHTML += media.publication()
            }
        )

        }
    )





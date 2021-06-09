import {Photographer} from "./domain/model.class";
import {Media} from "./domain/model.class";
import {Image} from "./domain/model.class";
import {Video} from "./domain/model.class";
import {StringUtil} from "./common/string.util";
//import { createRequire } from 'module';

//const require = createRequire(import.meta.url)

const photographerA = new Photographer('Jean',456,"nantes",'France',45654, "portrait", 'portrait',["string"])
const mediaA = new Media(454,5645,'date', 'altxt',456, ['string'], 325)

photographerA.medias.push(mediaA);


//const fetch = require("node-fetch");

const dataFile = "./assets/data/photographers.json";

fetch(dataFile)
    .then( (res: any) => res.json())
    .then( (json: any) => {

            /**
             * Create photographers instances and push them into an Array
             * */
            let allPhotographersInstances: Photographer[] = [];
            let loadPhotographers = json.photographers.forEach(
                (photographer: { name: string; id: number; city: string; country: string; tags: string[]; tagline: string; price: number; portrait: string; }) => {
                    let profile = new Photographer(photographer.name, photographer.id, photographer.city, photographer.country, photographer.price, photographer.portrait, photographer.tagline, photographer.tags);
                    allPhotographersInstances.push(profile)
                }
            )

            /**
             * Filter Medias by images and videos
             * */
            let images = json.media.filter((media: { image: any; }) => media.image);
            let videos = json.media.filter(((media: { video: any; }) => media.video));

            /**
             * Create images and videos instances and push them into an Array
             * */
            const imagesInstances: Media[] = [];
            images.forEach(
                (image: { id: number; photographerId: number; date: string; altTxt: string; price: number; tags: string[]; likes: number; image: string; }) => {
                    let imageMedia = new Image(image.id, image.photographerId,image.date, image.altTxt, image.price, image.tags, image.likes, image.image)
                    imagesInstances.push(imageMedia)
                }
            )
            const videosInstances: Media[] = [];
            videos.forEach(
                (video: { id: number; photographerId: { id: number; }; date: string; altTxt: string; price: number; tags: string[]; likes: number; stringify: string; }) => {
                    let videoMedia = new Video(video.id, video.photographerId.id, video.date, video.altTxt, video.price, video.tags, video.likes, video.stringify);
                    videosInstances.push(videoMedia)
                }
            )
            /**
             * Merge Videos and Images instances into a global Media Array
             * */
            let AllMediasInstances: Media[] = imagesInstances.concat(videosInstances);
            //console.log('All Medias', AllMediasInstances)

            /**
             * For each Photographer filter his owned Medias and save them into a medias variable
             * */
            allPhotographersInstances.forEach( photographer => {
                let ownedMedias = AllMediasInstances.filter( media => media.photographerId = photographer.id);
                photographer.medias = ownedMedias

            })

            console.log('test', allPhotographersInstances)

            /**
             * Inject HTML for each photographer to display profiles
             * */
            const container = document.getElementById('profiles')
            allPhotographersInstances.forEach( photographer => {
                container.innerHTML += `${photographer.profileSummary()}`;
            })

            /**
             * For Each Tag, on click, reset HTML, filter photographers and inject new HTML
             * */
            const tagButton = document.getElementsByClassName('hashtag');
            Array.from(tagButton).forEach(tag => tag.addEventListener('click', ()=> {
                container.innerHTML = StringUtil.emptyString();
                const filterByTag = allPhotographersInstances.filter( photographer => photographer.tags.includes(StringUtil.noHashAllLowCase(tag.innerHTML)));
                filterByTag.forEach( photographer => {
                    container.innerHTML += `${photographer.profileSummary()}`
                })


            }))


        }
    )




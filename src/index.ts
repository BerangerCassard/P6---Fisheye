import {Photographer} from "./domain/model.class";
import {Media} from "./domain/model.class";
import {Image} from "./domain/model.class";
import {Video} from "./domain/model.class";
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

            let allPhotographersInstances: Photographer[] = [];
            json.photographers.forEach(
                (photographer: { name: string; id: number; city: string; country: string; tags: number; tagline: string; price: string; portrait: string[]; }) => {
                    let profile = new Photographer(photographer.name, photographer.id, photographer.city, photographer.country, photographer.tags, photographer.tagline, photographer.price, photographer.portrait);
                    allPhotographersInstances.push(profile)
                }
            )

            let images = json.media.filter((media: { image: any; }) => media.image);
            let videos = json.media.filter(((media: { video: any; }) => media.video));

            //console.log("images", images)
            //console.log("videos", videos)

            const imagesInstances: Media[] = [];
            images.forEach(
                (image: { id: number; photographerId: number; date: string; altTxt: string; price: number; tags: string[]; likes: number; image: string; }) => {
                    let imageMedia = new Image(image.id, image.photographerId,image.date, image.altTxt, image.price, image.tags, image.likes, image.image)
                    imagesInstances.push(imageMedia)
                }
            )
            //console.log('images instances', imagesInstances)

            const videosInstances: Media[] = [];
            videos.forEach(
                (video: { id: number; photographerId: { id: number; }; date: string; altTxt: string; price: number; tags: string[]; likes: number; stringify: string; }) => {
                    let videoMedia = new Video(video.id, video.photographerId.id, video.date, video.altTxt, video.price, video.tags, video.likes, video.stringify);
                    videosInstances.push(videoMedia)
                }
            )

            let AllMediasInstances: Media[] = imagesInstances.concat(videosInstances);
            //console.log('All Medias', AllMediasInstances)

            allPhotographersInstances.forEach( photographer => {
                let ownedMedias = AllMediasInstances.filter( media => media.photographerId = photographer.id);
                photographer.medias = ownedMedias

            })
            //console.log('all photographers', allPhotographersInstances)

            console.log('test')

            allPhotographersInstances.forEach( photographer => {
                const container = document.getElementById('profiles')!;
                container.innerHTML = `${photographer.profileSummary()}`
            })


        }
    )





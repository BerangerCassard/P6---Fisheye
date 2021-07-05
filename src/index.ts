import {Photographer} from "./domain/model.class";
import {Media} from "./domain/model.class";
import {Image} from "./domain/model.class";
import {Video} from "./domain/model.class";
import {StringUtil} from "./common/string.util";
import "./assets/styles/sass/main.scss"


const dataFile = "./assets/data/photographers.json";

export const getData = fetch(dataFile)
    .then((res: any) => res.json())
    .then((json: any) => {

            /**
             * Focus on logo when page loaded
             * */
            const logo = document.getElementById('logo');
            logo.focus()

            /**
             * Create photographers instances and push them into an Array
             * */
            const allPhotographersInstances: Photographer[] = [];
            const loadPhotographers = json.photographers.forEach(
                (photographer: { name: string; id: number; city: string; country: string; tags: string[]; tagline: string; price: number; portrait: string; }) => {
                    const profile = new Photographer(photographer.name, photographer.id, photographer.city, photographer.country, photographer.price, photographer.portrait, photographer.tagline, photographer.tags);
                    allPhotographersInstances.push(profile)
                }
            )

            /**
             * Filter Medias by images and videos
             * */
            const images = json.media.filter((media: { image: any; }) => media.image);
            const videos = json.media.filter(((media: { video: any; }) => media.video));

            /**
             * Create images and videos instances and push them into an Array
             * */
            const imagesInstances: Media[] = [];
            images.forEach(
                (image: { id: number; photographerId: number; date: string; altTxt: string; price: number; tags: string[]; likes: number; image: string; }) => {
                    const imageMedia = new Image(image.id, image.photographerId, image.date, image.altTxt, image.price, image.tags, image.likes, image.image)
                    imagesInstances.push(imageMedia)
                }
            )
            const videosInstances: Media[] = [];
            videos.forEach(
                (video: { id: number; photographerId: { id: number; }; date: string; altTxt: string; price: number; tags: string[]; likes: number; stringify: string; }) => {
                    const videoMedia = new Video(video.id, video.photographerId.id, video.date, video.altTxt, video.price, video.tags, video.likes, video.stringify);
                    videosInstances.push(videoMedia)
                }
            )
            /**
             * Merge Videos and Images instances into a global Media Array
             * */
            const AllMediasInstances: Media[] = imagesInstances.concat(videosInstances);

            /**
             * For each Photographer filter his owned Medias and save them into a medias variable
             * */
            allPhotographersInstances.forEach(photographer => {
                const ownedMedias = AllMediasInstances.filter(media => media.photographerId = photographer.id);
                photographer.medias = ownedMedias

            })

            /**
             * Inject HTML for each photographer to display profiles
             * */
            const container = document.getElementById('profiles')
            allPhotographersInstances.forEach(photographer => {
                container.innerHTML += `${photographer.profileSummary()}`;
            })

            /**
             * Filter with listener and event propagation
             * */

            const tagListParents = document.getElementsByClassName('tagList');
            Array.from(tagListParents).forEach(child => child.addEventListener('click', (event) => {
                const target = event.target as HTMLTextAreaElement;
                if (target.className == 'hashtag') {
                    /**
                     * Filter photographers no matching tag and hide them
                     * */
                    const photographersNoTagged = allPhotographersInstances.filter(photographer => !photographer.tags.includes(StringUtil.noHashAllLowCase(target.innerHTML)));
                    photographersNoTagged.forEach(photographer => {
                        document.getElementById(`${photographer.id}`).style.display = 'none';
                    })
                    /**
                     * Filter photographers matching tag and show them
                     * */
                    const photographersTagged = allPhotographersInstances.filter(photographer => photographer.tags.includes(StringUtil.noHashAllLowCase(target.innerHTML)));
                    photographersTagged.forEach(photographer => {
                        document.getElementById(`${photographer.id}`).style.display = 'block'
                    })
                }
            }))


        }
    )





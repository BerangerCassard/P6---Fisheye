import {Photographer} from "./domain/model.class";
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

        const paramId = new URL(window.location.href).searchParams.get('id');
        const photographer = json.photographers.find( photographer => photographer.id == paramId);

        const photographerInstance = new Photographer(photographer.name, photographer.id, photographer.city, photographer.country, photographer.price, photographer.portrait, photographer.tagline, photographer.tags);
        photographerInstance.profileHeader()

        }
    )





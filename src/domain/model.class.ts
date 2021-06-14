import {getData} from "../index";

export class Photographer {

    public medias = new Array<Media>()
    /**
     * @param name
     * @param id
     * @param city
     * @param country
     * @param price
     * @param portrait
     * @param tagLine
     * @param tag
     */
    constructor(public name: string,
                public id: number,
                public city: string,
                public country: string,
                public price: number,
                public portrait: string,
                public tagLine: string,
                public tags: string[]) {
    }

    public profileSummary() {

    return `
    <div id="${this.id}" class="components">
         <div>
            <a class="profile__header" aria-label="visit profile" href="build/profilePage.html?id=${this.id}">
              <img class="profile__header__profilepicture profile-rounded" title="${this.name}" src="/assets/images/ProfilePicture/${this.portrait}" alt="">
              <h2 class="profile__header__name">${this.name}</h2>
            </a>
        </div>
      <div class="profile__description">
        <p class="profile__description__city"><span class="location">${this.city}, ${this.country}</span></p>
        <p class="profile__description__quote">${this.tagLine}</p>
        <p class="profile__description__rate"><span class="rate">${this.price}€/jour</span></p>
      </div>
      <div>
        <ul class="profile__hashtag tagList">
        ${this.tagsList()}
        </ul>
      </div>
    </div>`
    }

    private tagsList() {
        const tagsHTML = [];
        this.tags.forEach( tag => {
            tagsHTML.push(`<li><button class="hashtag" title="${tag}">#${tag}</button></li>`);
        })
        return tagsHTML.join('')
    }


}

export class Media {

    /**
     *
     * @param id
     * @param photographerId
     * @param date
     * @param altTxt
     * @param price
     * @param tags
     * @param likes
     */
    constructor(
        public id: number,
        public photographerId: number,
        public date: string,
        public altTxt: string,
        public price: number,
        public tags: string[],
        public likes: number
    ) {
    }
}

export class Image extends Media {

    constructor(
        public id: number,
        public photographerId: number,
        public date: string,
        public altTxt: string,
        public price: number,
        public tags: string[],
        public likes: number,
        public image : string
    ) {
        super(id, photographerId, date, altTxt, price, tags, likes);
    }
}

export class Video extends Media {

    constructor(
        id: number,
        photographerId: number,
        date: string,
        altTxt: string,
        price: number,
        tags: string[],
        likes: number,
        public video : string
    ) {
        super(id, photographerId, date, altTxt, price, tags, likes);
    }
}

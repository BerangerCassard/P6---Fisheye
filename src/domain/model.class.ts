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
    <div id="${this.id}" class="components profile">
         <div>
            <a class="profile__header"aria-label="aller vers la page de ${this.name}" href="photographer.html?id=${this.id}">
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
            tagsHTML.push(`<li><button class="hashtag" title="${tag}" aria-label="filtrer par tag ${tag}">#${tag}</button></li>`);
        })
        return tagsHTML.join('')
    }

    public profileHeaderAndSummary(sumLikes: number) {
        document.getElementById('profile-header').innerHTML = `${this.name}`;
        document.getElementById('profile-location').innerHTML = `${this.city}, ${this.country}`;
        document.getElementById('profile-quote').innerHTML = `${this.tagLine}`;
        document.getElementById('profile-picture').setAttribute('src', `./assets/images/ProfilePicture/${this.id}.jpg`);
        document.getElementById('tagsList').innerHTML = `${this.tagsList()}`
        document.getElementById('summary-rate').innerHTML = `${this.price}€/jour`
        document.getElementById('summary-likes').innerHTML += sumLikes;
        document.getElementById('contact-name').innerHTML = `${this.name}`;
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

    public publication() {
        return `
    <div class="publication" data-date="${this.date}" data-likes="${this.likes}" data-id="${this.id}">
           <div class="publication__picture">
            <img id="${this.id}" class="post" src="./assets/images/${this.photographerId}/${this.image}" alt="${this.altTxt}" role="img" aria-label="afficher ${this.altTxt}">
        </div>
        <div class="publication__description">
          <div id="title" class="publication__description__title caption">${this.altTxt}</div>
          <div class="publication__description__infos">
            <p id="price" class="publication__description__infos__price caption">${this.price}€</p>
            <p id="like" class="publication__description__infos__like like">${this.likes}</p>
          </div>
        </div>  
    </div>
`
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

    public publication() {
        return `
    <div class="publication" data-date="${this.date}" data-likes="${this.likes}" data-id="${this.id}">
        <div    class="publication__picture">
            <video id="${this.id}" class="post" src="./assets/images/${this.photographerId}/${this.video}" alt="${this.altTxt}" role="img" aria-label="afficher ${this.altTxt}"></video>
        </div>
        <div class="publication__description">
          <div id="title" class="publication__description__title caption">${this.altTxt}</div>
          <div class="publication__description__infos">
            <p id="price" class="publication__description__infos__price caption">${this.price}€</p>
            <p id="like" class="publication__description__infos__like like">${this.likes}</p>
          </div>
        </div>
    </div>`

    }
}

export class MediaFactory {

    /**
     * Create a Video or an Image Object according to file type
     */
    public createMedia(id, photographerID, date, altTxt, price, tags, likes, type) {
        if(type.includes('jpg')) {
            return new Image(id, photographerID, date, altTxt, price, tags, likes, type)
        } else if (type.includes('mp4')) {
            return new Video(id, photographerID, date, altTxt, price, tags, likes, type)
        }
}}

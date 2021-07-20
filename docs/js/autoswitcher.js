class Autoswitcher {
    constructor(args) {
        this.delay = args.delay
        this.autoSlide = true
        this.currentItem = 0
        this.timeout = null
    }
    listenButtonItems(buttonItems) {
        for ( let i = 0; i < buttonItems.length; i++) {
            this.textItems[i].addEventListener('click', () => {
                this.disactivateSlide(this.currentItem)
                this.activateSlide(i)
                this.currentItem = i
                this.autoSlide = false
                window.clearTimeout(this.timeout)
            })
        }
    }

    listenButtonContainer(container) {
        container.addEventListener('mouseleave', () => {
            if (!this.autoSlide) {
                this.autoSlide = true
                this.launchTimeout()
            }
        })
    }

    launchTimeout() {
        this.timeout = window.setTimeout(() => {
            if (this.autoSlide) {
                this.hextSlide()
            } 
        }, this.delay)
    }


    start() {
        this.launchTimeout()
    }

    hextSlide() {
        this.disactivateSlide(this.currentItem)
        this.currentItem++
        if (this.currentItem >= this.imgItems.length) {
            this.currentItem = 0
        } 
        
        this.activateSlide(this.currentItem)
        if (this.autoSlide) {
            this.launchTimeout()
        }
    }

    disactivateSlide() {

    }

    activateSlide() {

    }


}

class About extends Autoswitcher {
    constructor(args) {
        super(args)
        this.textContainer = document.querySelector('[data-about-texts]')
        this.imgItems = document.querySelectorAll('[data-about-img-item]')
        this.textItems = document.querySelectorAll('[data-about-text-item]')
        this.init()
    }
    init() {
        super.listenButtonItems(this.textItems)
        
        super.listenButtonContainer(this.textContainer)
    }

    disactivateSlide(itemIndex) {
        this.imgItems[itemIndex].classList.add('hidden')
        this.textItems[itemIndex].classList.remove('about-text-item--active')
    }
    activateSlide(itemIndex) {
        this.imgItems[itemIndex].classList.remove('hidden')
        this.textItems[itemIndex].classList.add('about-text-item--active')
    }
}

class Functional extends Autoswitcher {
    constructor(args) {
        super(args)
        this.textContainer = document.querySelector('[data-functional-container]')
        this.imgItems = document.querySelectorAll('[data-functional-text]')
        this.textItems = document.querySelectorAll('[data-functional-button]')
        this.init()
    }
    init() {
        super.listenButtonItems(this.textItems)
        
        super.listenButtonContainer(this.textContainer)
    }

    disactivateSlide(itemIndex) {
        // this.imgItems[itemIndex].classList.add('hidden')
        this.imgItems[itemIndex].classList.remove('functional-text__item--active')
        this.textItems[itemIndex].classList.remove('button--primary')
        this.textItems[itemIndex].classList.add('button--secondary')
    }
    activateSlide(itemIndex) {
        // this.imgItems[itemIndex].classList.remove('hidden')
        this.imgItems[itemIndex].classList.add('functional-text__item--active')
        this.textItems[itemIndex].classList.remove('button--secondary')
        this.textItems[itemIndex].classList.add('button--primary')
    }
}

const about = new About({delay: 3000})
about.start()
const functional = new Functional({delay: 3000})
functional.start()
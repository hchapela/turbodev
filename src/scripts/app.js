class Card {
    constructor(_card) {

        // initialization
        this.initSize(_card)
        this.initImage(_card)
        this.initLabel(_card)

        // Interaction
        this.expandImage(_card)
    }

    initSize(_card) {
        _card.style.width = _card.dataset.width
        _card.style.height = _card.dataset.height

    }

    initImage(_card) {
        const cardImage = document.createElement('img')
        cardImage.classList.add('card__Picture')

        cardImage.setAttribute('src', _card.dataset.src)
        _card.appendChild(cardImage)
    }

    initLabel(_card) {
        const cardLabel = document.createElement('div')
        cardLabel.classList.add('card__Label')

        // init Title
        const cardLabelTitle = document.createElement('p')
        cardLabelTitle.classList.add('card__Label__Title')
        cardLabelTitle.innerText = _card.dataset.title

        // init Dimensions
        const cardLabelDimensions = document.createElement('p')
        cardLabelDimensions.classList.add('card__Label__Dimensions')
        cardLabelDimensions.innerText = `${_card.dataset.width}x ${_card.dataset.height}`

        // Import in html
        _card.appendChild(cardLabel)
        const $label = _card.querySelector('.card__Label')
        $label.appendChild(cardLabelTitle)
        $label.appendChild(cardLabelDimensions)
    }

    expandImage(_card) {
        let isOpened = false
        _card.addEventListener('click', () => {
            if (isOpened) {
                _card.classList.remove('is-opened')
                isOpened = false
            } else {
                _card.classList.add('is-opened')
                isOpened = true
            }
        })
    }
}

const $gallery = document.querySelector('.js-gallery')
const $cards = document.querySelectorAll('.js-card')


for (const card of $cards) {
    new Card(card)

}
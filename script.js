const grid = document.querySelector('#grid-game')

class Game {
	constructor() {
		this.cardsPicked = []
		this.icons = [
			{
				name: 'car',
				url: "url(../assets/images/car-icon.svg)"
			},
			{
				name: 'elephant',
				url: "url(../assets/images/elephant-icon.svg)"
			},
			{
				name: 'panda',
				url: "url(../assets/images/panda-icon.svg)"
			},
			{
				name: 'princess',
				url: "url(../assets/images/princess-icon.svg)"
			},
			{
				name: 'rocket',
				url: "url(../assets/images/rocket-icon.svg)"
			},
			{
				name: 'unicorn',
				url: "url(../assets/images/unicorn-icon.svg)"
			}
		]
		this.score = 0
		this.gameSize = 0
		this.counter = 0
		this.clickHandler = this.checkCard.bind(this)
		this.resetPick = this.resetPick.bind(this)
		this.clearPick = this.clearPick.bind(this)
	}


	gameGenerator(size) {
		this.gameSize = size
		console.log('game start')
		/**
		 * Check if the size is an odd number,
		 * if not we add 1 to the value of size
		 */
		if (size % 2 !== 0) {
			size = size + 1
		}

		/**
		 * Check if we have enough card available for the game
		 * If not we set the size value to the max available
		 */
		if (size / 2 > this.icons.length) {
			size = this.icons.length * 2
		}

		let iteration = 0
		let htmlDiv = []

		while (iteration < 2) {
			for (let i = 0; i < size / 2; i++) {

				const flipCard = document.createElement('div')
				const frontDiv = document.createElement('div')
				const backDiv = document.createElement('div')

				/**
				 * add CSS class
				 */
				flipCard.classList.add('flip-card', 'is-hidden')
				frontDiv.classList.add('flip-card__face', 'flip-card__front')
				backDiv.classList.add('flip-card__face', 'flip-card__back')

				frontDiv.style.backgroundImage = `${this.icons[i].url}`

				/**
				 * add card value
				 */
				flipCard.dataset.card = `${this.icons[i].name}`

				/**
				 * @type 'click'
				 * add EventListener
				 */
				flipCard.addEventListener('click', (e) => {
					e.preventDefault()
					this.counter = this.counter + 1
					if (this.counter > 2) {
						return
					}
					this.clickHandler(e.currentTarget)
				})


				flipCard.appendChild(backDiv)
				flipCard.appendChild(frontDiv)

				htmlDiv.push(flipCard)
			}
			iteration++
		}

		/**
		 * Shuffle the htmlDiv before adding them to the DOM
		 */
		// const shuffledDiv = htmlDiv.sort(() => 0.5 - Math.random())
		//
		// shuffledDiv.forEach((el) => {
		// 	grid.appendChild(el)
		// })

		// TODO for debug only
		htmlDiv.forEach((el) => {
			grid.appendChild(el)
		})

	}

	checkCard(card) {
		const cards = document.querySelectorAll('.flip-card')
		let value = card.getAttribute('data-card')

		card.classList.toggle('is-hidden')
		this.cardsPicked.push(value)

		if (this.cardsPicked.length === 2) {
			if (this.cardsPicked[0] !== this.cardsPicked[1]) {
				/**
				 * We use a timeout for the player to see which cards was picked
				 */
				setTimeout(this.resetPick, 1500)
				this.clearPick()
				return
			}
			if (this.cardsPicked[0] === this.cardsPicked[1]) {
				this.pairFound(value)
			}
		}
	}

	resetPick() {
		const cards = document.querySelectorAll('.flip-card:not(.is-hidden):not(.founded)')
		this.counter = 0
		return cards.forEach((card) => {
			card.classList.toggle('is-hidden')
		})
	}

	clearPick() {
		const cards = document.querySelectorAll('.flip-card:not(.is-hidden)')
		cards.forEach((el) => {
			el.removeEventListener('click', this.clickHandler)
		})
		return this.cardsPicked = []
	}

	pairFound() {
		const cards = document.querySelectorAll('.flip-card:not(.is-hidden)')

		cards.forEach((el) => {
			el.classList.add('founded')
			el.removeEventListener('click', this.clickHandler)
		})
		this.clearPick()
		this.checkScore()
		this.counter = 0
	}

	checkScore() {
		this.score = this.score + 1
		if (this.score >= this.gameSize / 2) {
			console.log('you won')
		}
	}

}

const game = new Game()
game.gameGenerator(12)

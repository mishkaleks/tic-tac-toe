export class Storage {
  constructor(storageName = 'gameState', initialValue = '[]') {
    this.storageName = storageName

    // check if localStorage contains any data from previous games
    if (!localStorage.getItem(storageName)) {
      // if not, create new item for our Tic Tac Toe game
      localStorage.setItem(storageName, initialValue)
    }
  }

  // load data from previous games from localStorage
  getData() {
    return JSON.parse(localStorage.getItem(this.storageName))
  }

  // update data in localStorage
  update(data) {
    localStorage.setItem(this.storageName, JSON.stringify(data))
  }
}

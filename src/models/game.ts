export class Game {
    public players: string[] = ['hans', 'peter', 'fredi'];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currenPlayer: number = 0;

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('ace_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('hearts_' + i);
        }   
        shuffle(this.stack);
    }

    // public toJson() {
    //     return {
    //         playerNames: this.playerNames,
    //         stack: this.stack,
    //         playedCards: this.playedCards,
    //         takeCardAnimation: this.takeCardAnimation,
    //         playerImgs: this.playerImgs,
    //         currentPlayer: this.currentPlayer,
    //         currentCard: this.currentCard,
    //         addPlayer: this.addPlayer,
    //         portrait: this.portrait
    //     }
    // }
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
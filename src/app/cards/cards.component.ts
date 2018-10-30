import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
  values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  deck = [];
  hand = [];
  filters = {
    suits: []
  };
  constructor() {}

  ngOnInit() {
    this.createDeck();
    console.log(this.deck)
  };

  createDeck(){   // creates deck in an Array of Objects with key-value pairs: value, suit and weight (meaning how heavy or true value of card)
    for (let i = 0 ; i < this.values.length; i++)
        {
            for(let x = 0; x < this.suits.length; x++)
            {
              let weight = parseInt(this.values[i]);
              switch(this.values[i]){
                case "J":
                  weight = 11;
                  break;
                case "Q":
                  weight = 12;
                  break;
                case "K":
                  weight = 13;
                  break;
                case "A":
                  weight = 14;
                  break;
              }
                let card = { Value: this.values[i], Suit: this.suits[x], Weight: weight  };   // initialize card object
                this.deck.push(card); // push each card into deck. this.deck.length == 52;
            }
        }
  };

  shuffle(){  // shuffle function
    for (var i = 0; i < 500; i++)
        {
            let index1 = Math.floor((Math.random() * this.deck.length));
            let index2 = Math.floor((Math.random() * this.deck.length));
            let tmp = this.deck[index1];

            this.deck[index1] = this.deck[index2];
            this.deck[index2] = tmp;
        }
  }

  reset(){
    this.deck = [];
    this.hand = [];
    this.filters = {
      suits: []
    };
    this.createDeck()
  }

  drawCard(){
    let randomIndex = Math.floor((Math.random() * this.deck.length));
    let randomCard = this.deck[randomIndex];
    this.deck.splice(randomIndex, 1);
    this.hand.push(randomCard);
    console.log(this.hand);
  };


  filterBySuit(event){
    console.log(event)
    let newArr = [];
    let copyArr = this.deck

    this.filters.suits.push(event.target.value);
    this.deck = [];
    this.createDeck();
    this.deck = this.deck.filter((card) => this.filters.suits.includes(card.Suit));   //filter with multiple suits with .filter & .includes proptotypes

    console.log(this.deck)

  };

  filterByHand(event){
    this.reset();
    this.shuffle();  // shuffles the deck first, so that it's always random which cards are being spliced every round.
    console.log(event)
    if(this.hand.length <= event.target.value || this.hand.length <= 52){
      this.deck = this.deck.splice(0, event.target.value)
    };
  };

  filterByMin(event){
    let faceValue;
    this.reset();
      if(event.target.value === "J" || event.target.value === "Q" || event.target.value === "K" || event.target.value === "A") {
        switch(event.target.value){
          case "J":
            faceValue = 11;
            break;
          case "Q":
            faceValue = 12;
            break;
          case "K":
            faceValue = 13;
            break;
          case "A":
            faceValue = 14;
            break;
        }
          this.deck = this.deck.filter(card => card.Weight >= faceValue); // made "facevalue" variable to utilize the weight property to compare the value of facecards.
      } else {
          this.deck = this.deck.filter(card => card.Weight >= event.target.value);
      }
  };

  filterByMax(event){
    let faceValue;
    this.reset();
      if(event.target.value === "J" || event.target.value === "Q" || event.target.value === "K" || event.target.value === "A") {
        switch(event.target.value){
          case "J":
            faceValue = 11;
            break;
          case "Q":
            faceValue = 12;
            break;
          case "K":
            faceValue = 13;
            break;
          case "A":
            faceValue = 14;
            break;
        }
          this.deck = this.deck.filter(card => card.Weight <= faceValue);
      } else {
          this.deck = this.deck.filter(card => card.Weight <= event.target.value);
        }
  };
}

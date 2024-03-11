// Get all elements in the game
// Block the buttons
// Waits until start button is clicked
// Create a sequence
// Display the sequence
// Unblock the buttons
// Allow the players to play
// By every click, checks if its corect
// Read the sequence and check if it is right
// Create a longer sequence or end the game

class Game
{
  colors;
  buttons;
  sequenceChosen;
  sequencePlayed;
  startButton;
  infoSpan;
  playerCanPlay;
  gameSpeed;

  constructor()
  {
    this.colors = ['blue', 'red', 'green', 'orange'];
    this.gameSpeed = 1000;

    this.sequencePlayed = [];
    this.playerCanPlay = false;
    this.buttons = [];
    this.colors.forEach(color => {
      this.buttons[color] = document.getElementById(color);
      this.buttons[color].addEventListener('click', () => {
        this.clickedButton(color);
      });
    });

    this.disableButtons();

    this.infoSpan = document.getElementById('info');

    this.startButton = document.getElementById('start');
    this.startButton.addEventListener('click', () => {
      this.startGame();
    });
  }

  clickedButton(color)
  {
    if(this.playerCanPlay == false) return;
    this.sequencePlayed.push(color);
    this.sequencePlayed.forEach((played, i) => {
      if(played != this.sequenceChosen[i]) this.lostTheGame();
      if(this.sequencePlayed.length == this.sequenceChosen.length) this.nextRoud();
    });
  }

  nextRoud()
  {
    this.sequencePlayed = [];
    this.increaseSequence();
    this.disableButtons();
    if(this.gameSpeed > 100) this.gameSpeed -= 100;
    this.displaySequence();
  }

  lostTheGame()
  {
    this.disableButtons();
    this.infoSpan.innerHTML = 'Lost!';
  }

  startGame()
  {
    this.startButton.classList.add('hidden');
    this.infoSpan.classList.remove('hidden');

    this.sequenceChosen = [];
    this.increaseSequence();

    this.displaySequence();
  }

  displaySequence()
  {
    this.playerCanPlay = false;
    this.infoSpan.innerHTML = 'Wait for the sequence';
    this.sequenceChosen.forEach((color, i) => {
      setTimeout(() => {
        this.shineButton(color, i == (this.sequenceChosen.length-1) );
      }, 2*this.gameSpeed*i);
    });
  }

  shineButton(color, isTheLast = false)
  {
    setTimeout(() => {
      this.buttons[color].classList.remove('bg-'+color+'-300');
      this.buttons[color].classList.add('bg-'+color+'-500');
    }, this.gameSpeed);

    setTimeout(() => {
      this.buttons[color].classList.add('bg-'+color+'-300');
      this.buttons[color].classList.remove('bg-'+color+'-500');
      if(isTheLast) setTimeout(this.finishedDisplayingTheSequence.bind(this), 1000);
    }, 2*this.gameSpeed);
  }

  finishedDisplayingTheSequence()
  {
    this.playerCanPlay = true;
    this.enableButtons();
    this.infoSpan.innerHTML = 'Now play';
  }

  increaseSequence()
  {
    let randomKey = Math.floor(Math.random()*(this.colors.length));
    if(randomKey == this.colors.length) randomKey -= 1;
    this.sequenceChosen.push(this.colors[randomKey]);
  }

  changeDisabledTo(state)
  {
    this.colors.forEach(color => {
      this.buttons[color].disabled = state;
      if(state === true)
      {
        this.buttons[color].classList.remove('hover:bg-'+color+'-500');
        this.buttons[color].classList.add('cursor-not-allowed');
        document.getElementById('main').classList.add('cursor-not-allowed');
      }
      else
      {
        this.buttons[color].classList.add('hover:bg-'+color+'-500');
        this.buttons[color].classList.remove('cursor-not-allowed');
        document.getElementById('main').classList.remove('cursor-not-allowed');
      }
    });
  }

  disableButtons() { this.changeDisabledTo(true); }
  
  enableButtons() { this.changeDisabledTo(false); }
}

window.onload = function() {
  const simon = new Game();
};

import { Ship } from "../Ship";

interface NewPlayerControllerParams {
  ship: Ship;
}

interface KeyboardInputState {
  left: boolean;
  right: boolean;
}

export class PlayerController {
  keyboardInput: KeyboardInputState;
  ship: Ship;

  constructor(params: NewPlayerControllerParams) {
    this.ship = params.ship;
    this.keyboardInput = {
      left: false,
      right: false,
    };

    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  }

  onKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
        this.keyboardInput.left = true;
        this.ship.vx = -1;
        break;
      case "ArrowRight":
        this.keyboardInput.right = true;
        this.ship.vx = 1;
        break;
    }
  };

  onKeyUp = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
        this.keyboardInput.left = false;
        if (!this.keyboardInput.right) {
          this.ship.vx = 0;
        }
        break;
      case "ArrowRight":
        this.keyboardInput.right = false;
        if (!this.keyboardInput.left) {
          this.ship.vx = 0;
        }
        break;
    }
  };
}

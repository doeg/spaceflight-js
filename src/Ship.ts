import { Resource, Sprite, Texture } from "pixi.js";

interface NewShipParams {
  initialPosition: { x: number; y: number };
  scalingFactor: number;
  texture: Texture<Resource>;
}

export class Ship {
  sprite: Sprite;

  horizontalVelocity: number = 3;

  vx: number = 0;
  vy: number = 0;

  constructor(params: NewShipParams) {
    this.sprite = new Sprite(params.texture);

    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;

    this.sprite.scale.set(params.scalingFactor, params.scalingFactor);

    this.sprite.x = params.initialPosition.x;
    this.sprite.y = params.initialPosition.y - this.sprite.height;
  }

  loop = () => {
    this.sprite.x += this.vx * this.horizontalVelocity;
  };
}

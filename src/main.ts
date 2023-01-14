import "./style.css";
import * as PIXI from "pixi.js";
import { Assets, Sprite } from "pixi.js";

// This matches the screen resolution of the original Game Boy
// and Game Boy colour. The Game Boy Advanced, on the other hand,
// had a screen resolution of 240x160 px.
const SCREEN_WIDTH = 160;
const SCREEN_HEIGHT = 144;

// Used to scale the screen and sprites
const SCALING_FACTOR = 4;

const app = new PIXI.Application();

app.renderer.view.width = SCREEN_WIDTH * SCALING_FACTOR;
app.renderer.view.height = SCREEN_HEIGHT * SCALING_FACTOR;

document.getElementById("app")?.appendChild(app.view as any);

const texture = await Assets.load("/sprites/ship.png");
const ship = new Sprite(texture);

ship.x = app.renderer.view.width / 2;
ship.y = app.renderer.view.height / 2;

ship.anchor.x = 0.5;
ship.anchor.y = 0.5;

ship.width = ship.width * SCALING_FACTOR;
ship.height = ship.height * SCALING_FACTOR;

app.stage.addChild(ship);

app.ticker.add(() => {
  ship.rotation += 0.01;
});

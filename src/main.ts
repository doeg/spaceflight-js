import "./style.css";
import * as PIXI from "pixi.js";
import { Assets, Sprite, TilingSprite } from "pixi.js";

// See https://pixijs.io/guides/basics/assets.html
await Assets.init({ manifest: "/asset-manifest.json" });

const gameAssets = await Assets.loadBundle("game-screen");

// This matches the screen resolution of the original Game Boy
// and Game Boy colour. The Game Boy Advanced, on the other hand,
// had a screen resolution of 240x160 px.
const SCREEN_WIDTH = 160;
const SCREEN_HEIGHT = 144;

// Used to scale the screen and sprites
const SCALING_FACTOR = 3;

const app = new PIXI.Application();

app.renderer.view.width = SCREEN_WIDTH * SCALING_FACTOR;
app.renderer.view.height = SCREEN_HEIGHT * SCALING_FACTOR;

document.getElementById("app")?.appendChild(app.view as any);

// Initialize background
const bgTilingSprite = new TilingSprite(
  gameAssets.background,
  app.renderer.width,
  app.renderer.height
);

app.stage.addChild(bgTilingSprite);

// Initialize ship
const ship = new Sprite(gameAssets.playerShip);

ship.anchor.x = 0.5;
ship.anchor.y = 0.5;

ship.width = ship.width * SCALING_FACTOR;
ship.height = ship.height * SCALING_FACTOR;

ship.x = app.renderer.view.width / 2;
ship.y = app.renderer.view.height - ship.height;

app.stage.addChild(ship);

app.ticker.add(() => {
  bgTilingSprite.tilePosition.y += 5;
});

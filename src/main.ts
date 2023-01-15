import "./style.css";
import * as PIXI from "pixi.js";
import { Assets, Sprite, TilingSprite } from "pixi.js";

// Scale mode for all textures, will retain pixelation
PIXI.BaseTexture.defaultOptions.scaleMode = PIXI.SCALE_MODES.NEAREST;

// See https://pixijs.io/guides/basics/assets.html
await Assets.init({ manifest: "/asset-manifest.json" });

const gameAssets = await Assets.loadBundle("game-screen");

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

// Initialize background
const bgTilingSprite = new TilingSprite(
  gameAssets.background,
  app.renderer.width,
  app.renderer.height
);

app.stage.addChild(bgTilingSprite);

// Initialize ship
const ship1 = new Sprite(gameAssets.ship1);

ship1.anchor.x = 0.5;
ship1.anchor.y = 0.5;

ship1.scale.set(SCALING_FACTOR, SCALING_FACTOR);

ship1.x = app.renderer.view.width / 2;
ship1.y = app.renderer.view.height - ship1.height;

app.stage.addChild(ship1);

// Initialize ship
const ship2 = new Sprite(gameAssets.ship2);

ship2.anchor.x = 0.5;
ship2.anchor.y = 0.5;

ship2.scale.set(SCALING_FACTOR, SCALING_FACTOR);

ship2.x = app.renderer.view.width * 0.25;
ship2.y = app.renderer.view.height - ship2.height;

app.stage.addChild(ship2);

// Initialize ship
const ship3 = new Sprite(gameAssets.ship3);

ship3.anchor.x = 0.5;
ship3.anchor.y = 0.5;

ship3.scale.set(SCALING_FACTOR, SCALING_FACTOR);

ship3.x = app.renderer.view.width * 0.75;
ship3.y = app.renderer.view.height - ship3.height;

app.stage.addChild(ship3);

app.ticker.add(() => {
  bgTilingSprite.tilePosition.y += 5;
});

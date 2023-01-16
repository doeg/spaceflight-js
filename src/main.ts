import "./style.css";
import * as PIXI from "pixi.js";
import { Assets, TilingSprite } from "pixi.js";
import { Ship } from "./Ship";

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

// Initialize player ship
const ship1 = new Ship({
  initialPosition: {
    x: app.renderer.view.width / 2,
    y: app.renderer.view.height,
  },
  scalingFactor: SCALING_FACTOR,
  texture: gameAssets.ship1,
});

app.stage.addChild(ship1.sprite);

// Initialize NPC ships
const ship2 = new Ship({
  initialPosition: {
    x: app.renderer.view.width * 0.25,
    y: app.renderer.view.height,
  },
  scalingFactor: SCALING_FACTOR,
  texture: gameAssets.ship2,
});

app.stage.addChild(ship2.sprite);

const ship3 = new Ship({
  initialPosition: {
    x: app.renderer.view.width * 0.75,
    y: app.renderer.view.height,
  },
  scalingFactor: SCALING_FACTOR,
  texture: gameAssets.ship3,
});

app.stage.addChild(ship3.sprite);

app.ticker.add(() => {
  bgTilingSprite.tilePosition.y += 5;
});

# Check IGN (In-Game Name) for Node.js

This library allows you to check in-game names for various games, especially for the Indonesia region, using the CodaShop API.

## Installation

```sh
pnpm add check-ign
# or
npm install check-ign
# or
yarn add check-ign
```

## Currently Supported Game
- Arena of Valor
- Call of Duty Mobile
- Free Fire
- Genshin Impact
- Honkai Impact
- Honkai Star Rail
- Mobile Legends
- Punishing: Gray Raven
- Sausage Man
- Super SUS
- Valorant

## Usage

```js
const cod = await checkIgn({
  game: "game name",  // If you use TypeScript, you will see game name autocomplete or refer to the supported games above.
  id: "game id",
  server: "server/zone id"  // Required for certain games listed below
});
```

## Example

```js
const cod = await checkIgn({
  game: "Call of Duty Mobile",
  id: "11943769307349683075",
})
```

* For Genshin Impact, Honkai Impact, Honkai Star Rail, Mobile Legends, and Punishing: Gray Raven, you need to pass the zone/server parameter.

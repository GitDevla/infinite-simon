# Infinity Simon
Csoport: Hétfő 12-14 CS1 (Pataki Dávid Ferenc, Kerekes Bence, Csendes Dávid)

A játék élő demója elérhető itt: [https://pti-szfm-2025.github.io/infinite-simon/](https://pti-szfm-2025.github.io/infinite-simon/)

## Leírás
Az Infinity Simon egy kibővített változata a klasszikus Simon játénak, ahol a játékosnak egyre hosszabb és bonyolultabb input-kombinációt kell megjegyeznie és visszaadnia. A játék célja, hogy minél tovább jussunk anélkül, hogy hibáznánk.

[Követelmény Specifikáció](./docs/req-spec.md)

[Rendszerterv](./docs/system-design.md)

## Tech Stack
- React
- TypeScript
- Express
- Node.js

## Fejlesztési környezet beállítása
1. Klónozd a repót: `git clone https://github.com/pti-szfm-2025/infinite-simon`.
2. Lépj be a könyvtárba: `cd infinite-simon`.
3. A frontend szerver elindításához futtasd: `cd frontend && npm install`.
4. Készítsd elő a környezeti változókat a `.env` fájlban a `example.env` alapján.
5. Indítsd el a frontend szervert: `npm start`.
6. A backend szerver elindításához nyiss egy új terminált, lépj be a könyvtárba és futtasd: `cd backend && npm install`.
7. Készítsd elő a környezeti változókat a `.env` fájlban a `example.env` alapján.
8. Készítsd elő az adatbázist a `npm run db:setup` segítségével.
8. Indítsd el a backend szervert: `npm run dev`.
5. Nyisd meg a böngészőt és navigálj a `http://localhost:3000` címre.
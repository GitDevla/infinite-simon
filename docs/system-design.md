# Rendszerterv
## A rendszer célja
- Memória fejlődést elősegítő játékos felület weboldalon való megvalósítása
- Rekord értékek segítségével a gyakorlottság és emlékezőképesség fejlődésének követése
- Versenyszerű kézségösszemérés egyéb játékosokkal
## Projekt terv
- Rendszer terv megírása 09.21.
- További követelmények megismerése 09.22.
- Újonnan felmerült követelmények teljesítése 09.22-29
- Webfelület létrehozása 09.27-ig
- Webfelület interaktívvá tétele 09.28-ig
- "Alap Simon says" megvalósítása 09.29-ig
- Fejlesztés közben felmerült hibák jegyzetelése 09.29-ig
- Fejlesztés közben felmerült követelmények jegyzetelése 09.29-ig
- Fejlesztés közben felmerült design "nice to have" elemek jegyzetelése 09.29.-ig
- További követelmény megismerése 09.30.
- Kritikus hibák kijavítása 09.31.
- Kissebb fontosságú hibák javítása 10.01.
- Újonnani követelmények implementálása 10.03-ig
- Design finomítása 10.03-ig
- Tesztelés minimális implementálása 10.04.
- Tesztelés során felmerült problémák jegyzetelése 10.04.
- Tesztelés folytatása és hibák javítása 10.05-ig
- Értékelésre alkalmas állapotról való meggyőződés 10.05.
## Üzleti folyamatok modellje
[![](https://img.plantuml.biz/plantuml/dsvg/TLBDIiD04BxlKmovrmUG4WeYWYWAXTwdoJHTijajkzD08Zv4xbvwpC6Ju0iiVIytcneZw6LWvflPxuTTEKRBnqe9HJi6Dc1biMV8fQMCfT42CpOMaWT_ObCW-uy4qC56EXdct-XzG7rV6XV1Ewp82d70hCI28F5lUUq_MtNkeFJzWQnkpbq2BmBWw2X3HzCB87NktzcV7CQdreEy-TwjfRpolMx2pbOXL5GmbLA7OqVZIMOiRGtQNBpEH5m8_g7T6TLWXJooFYjivbjhOotf74WfqkVEjXFPpPwoShww8TSEMgOWdkgGnLy6u97cgh6cg7mGVKaN5elqai2loO_12CRXc7ciiOyMXXAxKMQiS9LEkk0QbiizgOOf64jJ8IOa4asQLi7zy4c-0000)](https://editor.plantuml.com/uml/TLBDIiD04BxlKmovrmUG4WeYWYWAXTwdoJHTijajkzD08Zv4xbvwpC6Ju0iiVIytcneZw6LWvflPxuTTEKRBnqe9HJi6Dc1biMV8fQMCfT42CpOMaWT_ObCW-uy4qC56EXdct-XzG7rV6XV1Ewp82d70hCI28F5lUUq_MtNkeFJzWQnkpbq2BmBWw2X3HzCB87NktzcV7CQdreEy-TwjfRpolMx2pbOXL5GmbLA7OqVZIMOiRGtQNBpEH5m8_g7T6TLWXJooFYjivbjhOotf74WfqkVEjXFPpPwoShww8TSEMgOWdkgGnLy6u97cgh6cg7mGVKaN5elqai2loO_12CRXc7ciiOyMXXAxKMQiS9LEkk0QbiizgOOf64jJ8IOa4asQLi7zy4c-0000)

### Szereplők
- **Látogató**: aki csak belép az oldalra, és megnézheti az eredménytáblát.
- **Játékos**: aki ténylegesen elindítja a játékot, interakcióba lép vele, pontot szerez.

### Folyamatok
- **Játék indítása**: A látogató elindítja a játékot, ekkor a rendszer generál egy input-kombinációt, amit a játékosnak meg kell jegyeznie.
- **Játék menete**: A játékos megpróbálja megismételni az input-kombinációt. Ha sikerül, a rendszer újabb inputot ad a kombinációhoz, és a játék folytatódik. Ha nem sikerül, a játék véget ér, és a játékos pontszáma rögzítésre kerül.
- **Eredménytábla megtekintése**: A látogatók és játékosok megtekinthetik az eredménytáblát, ahol a legjobb pontszámokat látják az adott számitógépen.

### Entitások
- **Játék**: Aktuális input-sorozat, játék állapota (aktív vagy véget ért), körök száma.
- **Játékos**: Felhasználónév.
- **Pontszám**: Játékoshoz kötött pontszám, elért körök száma, dátum.
- **Eredménytábla**: Legjobb pontszámok listája, játékosok nevei és elért körök száma.

## Követelmények

### Funkcionális követelmények
- A látogató képes legyen elindítani a játékot a kezdőképernyőről.
- A látogató képes legyen megtekinteni az eredménytáblát.
- A rendszer jelenítse meg a sorozatot a játékos számára minden körben.
- A rendszer ellenőrizze a játékos bemenetét és adjon visszajelzést.
- A rendszer folytassa a játékot helyes bemenet után, növelve a sorozat hosszát és nezéségét.
- A rendszer végezze el a játék lezárását, ha a játékos hibázik.
- A rendszer mentse a játékos pontszámát.
- Az eredménytábla mindig a legjobb pontszámokat mutassa, rendezve.

### Nem funkcionális követelmények
- A felület legyen mobilon és desktopon is jól használható.
- A rendszer ne igényeljen regisztrációt a játékhoz.
- A felhasználói pontszámok csak a böngészőben tárolódjanak.
- A rendszer böngészőfüggetlenül működjön.

## Funkcionális terv
### Rendszer szereplők
[Több információ](#szereplők)

### Használati esetek
[Több információ](#folyamatok)

[User Story](user-story1.md)

### Határ osztályok
| Határ osztály | Leírás |
|---------------|--------|
| App | A fő alkalmazás osztály, amely kezeli a képernyők közötti navigációt. |
| WelcomeScreen | A játék indítására és az eredménytábla megtekintésére szolgál. |
| GameScreen | A játékos interakcióját kezeli, bemenetet fogad és visszajelzést ad. |
| GameOverModal | A játék végét jelző ablak, amely megjeleníti a pontszámot és lehetőséget ad a pontszám mentésére. |
| ScoreboardScreen | A legjobb pontszámokat jeleníti meg. |

### Menü hierarchia
```mermaid
graph LR
    A[Kezdőképernyő]
    A --> B[Játék indítása]
    B --> C[Játék képernyő]
    C --> D[Játék vége]
    D --> E[Game Over ablak]
    E --> F[Eredménytábla]
    A --> F
```

### Képernyő tervek
#TODO

## Fizikai környezet

## Absztrakt domain modell

## Architektúra terv

## Adatbázis terv

## Implementációs terv

## Tesztterv

## Telepítési terv

## Karbantartási terv

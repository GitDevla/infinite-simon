# Követelményspecifikáció

## Jelenlegi helyzet
- Jelenlegi Infinit-Simon[^7] projekt felkészítése a tovább fejlesztésre.
- A jelenlegi kód képes egy egyjátékos, végtelen kibővitett Simon says[^7] játék futtatására és pontszámok lokális tárolására.
- Tervezési fázis, az ötlet megfogalmazása és leírása.
- Ötlet szétbontása részekre.
- Dedikált backend kiválasztása.

## Vágyálomrendszer
- A létező Infinity-Simon[^7] játék továbbfejlesztése új többjátékos funkciókkal.
- A játékosok közötti versengés lehetősége.
- Pontszámok szerveren való tárolása.
- Többjátékos mód, ahol a játékosok valós időben versenyezhetnek egymás ellen.
- Részletes statisztikák és elemzések a játékos teljesítményéről.
- Különböző játékmódok bevezetése (pl. eredeti Simon says, Kibővített mód, etc.).

## Jelenlegi üzleti folyamatok
A jelenlegi rendszer egy egyjátékos kibővített "Simon says" játékot valósít meg, amely a következő funkciókat tartalmazza:
- A játékos elindítja a játékot, és a rendszer generál egy input-kombinációt.
- A játékos megpróbálja megismételni a input-kombinációt.
- Minden sikeres ismétlés után a rendszer újabb inputot ad a kombinációhoz, növeli a pontszámot, és a játék folytatódik.
- A játék addig folytatódik, amíg a játékos hibázik.
- A játék végén a játékos pontszáma lokálisan tárolásra kerül, és megtekinthető az eredménytáblán.
- A játékosok megtekinthetik a legjobb pontszámokat az adott eszközön.
- A játék reszponzív dizájnnal rendelkezik, így különböző eszközökön (mobil, tablet, desktop) is játszható.

## Igényelt üzleti folyamatok
A jövőbeni rendszer a következő új funkciókat és üzleti folyamatokat valósítja meg:
- Többjátékos mód bevezetése, ahol a játékosok valós időben versenyezhetnek egymás ellen.
- Pontszámok szerveren való tárolása, hogy a játékosok bármilyen eszközről elérhessék a pontszámaikat.
- Részletes statisztikák és elemzések a játékos teljesítményéről, beleértve a legjobb köröket, átlagos pontszámokat, és fejlődési trendeket.
- Különböző játékmódok bevezetése, mint például az eredeti Simon says mód és egyéb kihívásokkal teli módok.
- Felhasználói fiókok létrehozása.
- Hangjelzések és vizuális effektek a játékélmény fokozására.

## Rendszerre vonatkozó törvények, szabályok, ajánlások:
A weboldal megfelel az alábbi törvényeknek:
- Mivel a mi oldalunk szeretne felhasználókat azonosítani, ezért az alábbi szükséges jogszabályokat bekell tartani:
    - [GDPR](https://gdpr-info.eu/)
    - [ePrivacy Directive](https://gdpr.eu/cookies/)
- Felhasznált szabványok:
    - A webfelület szabványos eszközökkel készüljön (HTML, CSS, JavaScript)

## Követelménylista
| Modul | ID  | Név | V. | Kifejtés |
|-------|-----|-----|----|----------|
| Frontend | FR1 | Felhasználói fiók létrehozása | v0.1 | A felhasználók regisztrálhatnak és bejelentkezhetnek a rendszerbe. |
| Backend | BE1 | Felhasználói kezelés | v0.1 | A rendszer kezeli a felhasználói fiókokat, beleértve a regisztrációt, bejelentkezést és profilkezelést. |
| Backend | BE6 | Biztonság | v0.1 | A rendszer biztosítja a felhasználói adatok és pontszámok biztonságát. |
| Frontend | FR3 | Játékos profil | v0.2 | A felhasználók megtekinthetik és szerkeszthetik profiljukat. |
| Backend | BE2 | Játék logika | v0.3 | A rendszer kezeli a játék szabályait és logikáját. |
| Frontend | FR6 | Egyjátékos mód | v0.3 | A felhasználók elindíthatják a játékot egyjátékos |
| Frontend | FR2 | Többjátékos mód | v0.4 | A felhasználók elindíthatják a játékot többjátékos módban. |
| Backend | BE4 | Többjátékos támogatás | v0.4 | A rendszer lehetővé teszi a többjátékos játékot valós időben. |
| Frontend | FR4 | Eredménytábla | v0.5 | A felhasználók megtekinthetik a legjobb pontszámokat és statisztikákat. |
| Backend | BE3 | Pontszámok tárolása | v0.5 | A rendszer szerveren tárolja a játékosok pontszámait és statisztikáit. |
| Backend | BE5 | Statisztikák és elemzések | v0.6 | A rendszer részletes statisztikákat és elemzéseket biztosít a játékosok teljesítményéről. |   


## Fogalomszótár
[^1]: **Simon says**: Egy memóriára és figyelemre épülő játék, ahol a játékosnak egyre hosszabb és bonyolultabb utasítás-sorozatot kell követnie.
[^2]: **Adaptálódó nehézség**: A játék közbeni dinamikus változtatás, amely a teljesítményhez igazodik.
[^3]: **Input-típus**: A játékos által használt bevitel (pl. kattintás, szöveg írása)
[^4]: **Végtelen**: A limitáltságokon belül akkora hossz elérése mely végtelennek tűnik a játékosok képességei miatt.
[^5]: **Randomizálás**: Az a folyamat mely (pseudo) véletlenen alapulóan nem ismétlődővé teszi a játék menetét.
[^7]: **Infinity-Simon/Kibővített Simon**: A klasszikus Simon says[^1] játék továbbfejlesztett változata, amely új input-típusokat és játékmenetbeli változtatásokat vezet be a játékélmény fokozása érdekében. A projekt amire ez a specifikáció épül.

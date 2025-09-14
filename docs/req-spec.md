# Követelményspecifikáció

## 1. Jelenlegi helyzet
-Tervezési fázis, az ötlet megfogalmazása és leírása
-Ötlet szétbontása részekre
-Platform kiválasztása
-Frontend-backend kiválasztása
-Feladatok kiosztása a collaboratorok között


## 2. Vágyálomrendszer
-Egy végtelenségig tartó Simon says
-Adaptálódó nehézség ami a sikeresen teljesített körök múlásával nő

## 3. Jelenlegi üzleti folyamatok
Az eredeti Simon says[^1] játék jól ismert, és az interneten számos változata elérhető.

Ezek a változatok jellemzően:
+ Korlátozott számú körrel rendelkeznek.
+ Nem vagy csak egyszerűen növekvő nehézséget kínálnak.
+ Csak gombnyomásos inputot támogatnak, más input-típus nincs.

## 4. Igényelt üzleti folyamatok

## 5. Követelménylista
| Modul | ID  | Név | V. | Kifejtés |
|-------|-----|-----|----|----------|
| JátékLogika | K1 | Alap Simon says | 0.1 | A klasszikus 4 gombos Simon says játék megvalósítása. |
| JátékLogika | K2 | Végtelen játékmenet | 0.2 | A játék folyamatosan köröket generál, amíg a játékos el nem hibázza a sorozatot. Nem lesz előre definiált maximális körszám. |
| JátékLogika | K3 | Adaptív nehézség | 0.2 | Amennyiben a játékos hosszabb ideig, sikeres sorozatokat ér el, a játék nehézsége nő. Gyorsul a gombok felvillanásának sebessége, vagy új input-típusok jelnenek meg. |
| UI | K4 | Felhasználóbarát felület | 0.9 | A játék felülete legyen intuitív és könnyen kezelhető, hogy a játékosok gyorsan megértsék a játékmenetet. |
| Platform | K5 | Web alapú platform | 1.0 | A játék webes környezetben fusson, hogy könnyen elérhető legyen különböző eszközökről. |

## 6. Fogalomszótár
[^1]: **Simon says**: Egy memóriára és figyelemre épülő játék, ahol a játékosnak egyre hosszabb és bonyolultabb utasítás-sorozatot kell követnie.
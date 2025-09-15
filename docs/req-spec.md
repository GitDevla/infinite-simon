# Követelményspecifikáció

## 1. Jelenlegi helyzet
- Tervezési fázis, az ötlet megfogalmazása és leírása.
- Ötlet szétbontása részekre.
- Platform kiválasztása.
- Frontend-backend kiválasztása.
- Feladatok kiosztása a collaboratorok között.

## 2. Vágyálomrendszer
- Egy végtelenségig[^4] tartó Simon says.
- Adaptálódó nehézség[^2] ami a sikeresen teljesített körök múlásával nő.
- Reszponzív felület, amely mobilon és asztali környezetben egyaránt élvezhető.

## 3. Jelenlegi üzleti folyamatok
Az eredeti Simon says[^1] játék jól ismert, és az interneten számos változata elérhető.

Ezek a változatok jellemzően:
+ Korlátozott számú körrel rendelkeznek.
+ Nem vagy csak egyszerűen növekvő nehézséget kínálnak.
+ Csak gombnyomásos inputot támogatnak, más input-típus[^3] nincs.

## 4. Igényelt üzleti folyamatok
- A rendszer minden körben egy színmintát generál, amit a játékosnak helyesen kell visszajátszania.
- A sorozat hossza minden sikeres körrel nő, a hibás bevitel a játék végét jelenti.
- Az adaptálódó nehézség: gyorsuló ritmus vagy új gombok vagy akár alternatív input formák.
- A játék végén opcionálisan pontszám rögzíthető, amely később összehasonlítható más játékosok eredményeivel.
- Az elkülönűlő játékmenetek randomizálása[^5] az újrajátszhatóság növeléséért.

## 5. Követelménylista
| Modul | ID  | Név | V. | Kifejtés |
|-------|-----|-----|----|----------|
| JátékLogika | K1 | Alap Simon says | 0.1 | A klasszikus 4 gombos Simon says játék megvalósítása. |
| JátékLogika | K2 | Végtelen játékmenet | 0.2 | A játék folyamatosan köröket generál, amíg a játékos el nem hibázza a sorozatot. Nem lesz előre definiált maximális körszám. |
| JátékLogika | K3 | Adaptív nehézség | 0.2 | Amennyiben a játékos hosszabb ideig, sikeres sorozatokat ér el, a játék nehézsége nő. Gyorsul a gombok felvillanásának sebessége, vagy új input-típusok[^3] jelnenek meg. |
| UI | K4 | JátékLogika és UI integráció | 0.3 | A játék logikája és a felhasználói felület közötti kommunikáció megvalósítása. |
| UI | K5 | Reszponzív dizájn | 0.4 | A felület alkalmazkodik különböző képernyőméretekhez és eszközökhöz (mobil, tablet, desktop). |
| UI | K6 | Felhasználóbarát felület | 0.4 | A játék felülete legyen intuitív és könnyen kezelhető, hogy a játékosok gyorsan megértsék a játékmenetet. |
| JátékLogika | K7 | Pontozás és ranglista | 0.5 | Név és pontszám tárolása, ami motiválja a játékosokat a versenyzésre. |
| Telepítés | K8 | Web alapú platform | 1.0 | A játék webes környezetben fusson, hogy könnyen elérhető legyen különböző eszközökről. |
| Audio | K9 | Hangjelzések | 1.1 | Az egyes színekhez hang effektek lejátszása gomblenyomáskor. |

## 6. Fogalomszótár
[^1]: **Simon says**: Egy memóriára és figyelemre épülő játék, ahol a játékosnak egyre hosszabb és bonyolultabb utasítás-sorozatot kell követnie.
[^2]: **Adaptálódó nehézség**: A játék közbeni dinamikus változtatás, amely a teljesítményhez igazodik.
[^3]: **Input-típus**: A játékos által használt bevitel (pl. kattintás, szöveg írása)
[^4]: **Végtelen**: A limitáltságokon belül akkora hossz elérése mely végtelennek tűnik a játékosok képességei miatt.
[^5]: **Randomizálás**: Az a folyamat mely (pseudo) véletlenen alapulóan nem ismétlődővé teszi a játék menetét.

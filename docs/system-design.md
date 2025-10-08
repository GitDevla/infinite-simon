# Rendszerterv
## Projekt terv
#todo

### Csapatbeosztás
- Tervező: Pataki Dávid (közös)
- Designer: Pataki Dávid
- Implementáció
    - Frontend: Pataki Dávid
        - Backend
        - Adatbázis: Kerekes Bence
        - Játék Logika: Kerekes Bence
        - API: Csendes Dávid- Tesztelő: Csendes Dávid

## Üzleti folyamatok modellje
[![](https://img.plantuml.biz/plantuml/dsvg/ZLJ1Rjim3BqRy3yGkUoKeNBQBXsAeCNG0XiQO5ZNtbM7SJJBaY4f1wVOH-mJSkmvm7v0s7zDikKuAheX5vlaUwGUATfNsb1brXLF4uvB0qQ2OiNAm88fp0sJ8atIXEP6AhYpMoCBQkmEg0RUXs-HhwZU2Blb7LBto1UNO5zAgTiewSDpkzLxI9OjcFbZQfgNj40OVHPB9fXfxbabnGYUqmHWhJ6dse7NQuF2iD9kSsPt8v_-y8b4b9kY-R4_UsvtYy3A8jPt-_lfwKtU9E9zLNB9EConC5WouUWQ0_4q8iunppMKg50xJg2SfSdFgBdusDVTXS70KlA6LjJGKEOyOjrBfL0i03b7yUUNsXne-X0n7r5lpA1c6iz9uQAoBwA12gE-BbwBFfpeiPB9oT6Q2VcVQ98TfvfCWkntC1wFuTflc_QcMsxtcdKRq9kaRN1mwe7IcvF1FFLi1xQktsLtitkx9e5rVc3xzkji05ovu9mDsItI2_w6dFfFJhjHAgZMtB2QqmPLruFZmljPTyFkqTbJ-0YNbolaZK4trzdCOzCEk_XNQSr4mJ6kJKww9DBsHaZmihVgksY7JY1DhjobjZ-Glm00)](https://editor.plantuml.com/uml/ZLJ1Rjim3BqRy3yGkUoKeNBQBXsAeCNG0XiQO5ZNtbM7SJJBaY4f1wVOH-mJSkmvm7v0s7zDikKuAheX5vlaUwGUATfNsb1brXLF4uvB0qQ2OiNAm88fp0sJ8atIXEP6AhYpMoCBQkmEg0RUXs-HhwZU2Blb7LBto1UNO5zAgTiewSDpkzLxI9OjcFbZQfgNj40OVHPB9fXfxbabnGYUqmHWhJ6dse7NQuF2iD9kSsPt8v_-y8b4b9kY-R4_UsvtYy3A8jPt-_lfwKtU9E9zLNB9EConC5WouUWQ0_4q8iunppMKg50xJg2SfSdFgBdusDVTXS70KlA6LjJGKEOyOjrBfL0i03b7yUUNsXne-X0n7r5lpA1c6iz9uQAoBwA12gE-BbwBFfpeiPB9oT6Q2VcVQ98TfvfCWkntC1wFuTflc_QcMsxtcdKRq9kaRN1mwe7IcvF1FFLi1xQktsLtitkx9e5rVc3xzkji05ovu9mDsItI2_w6dFfFJhjHAgZMtB2QqmPLruFZmljPTyFkqTbJ-0YNbolaZK4trzdCOzCEk_XNQSr4mJ6kJKww9DBsHaZmihVgksY7JY1DhjobjZ-Glm00)
### Szereplők
- **Látogató**: aki csak belép az oldalra, nincs regisztrálva, de képes egyjátékos módban játszani.
- **Felhasználó**: aki regisztrált és bejelentkezett, játszhat a többjátékos módban, és megnézheti a saját statisztikáit.
- **Játékos**: aki játszik a játékkal, lehet látogató vagy felhasználó is.
- **Más Játékosok**: felhasználón kívüli más Játékosok akik a többjátékos módban részt vesznek.

### Entitások
- **Játékos**: felhasználónév, email, jelszó (hash-elve), avatar URI, regisztráció dátuma, utolsó bejelentkezés dátuma.
- **Játék**: sorozat (lista a bemenetekről), állapot (folyamatban, befejezett), mód (egyjátékos, többjátékos), nehézség (eredeti, kibővített), körök száma.
- **Pontszám**: pontszám érték, dátum.

## Követelmények

### Funkcionális követelmények
- A látogató képes legyen regisztrálni és bejelentkezni.
- A látogató képes legyen elindítani egy egyjátékos játékot a kezdőképernyőről.
- A felhasználó képes legyen elindítani egy új játékot (egy- vagy többjátékos mód).
- A felhasználó képes legyen csatlakozni egy többjátékos játékhoz.
- A rendszer kezelje a versenyek létrehozását és csatlakozását.
- A rendszer tárolja a verseny paramétereit, seed-jét és résztvevőinek eredményeit.
- A rendszer generáljon egyedi seed-et minden versenyhez.
- A rendszer jelenítse meg a sorozatot a játékos számára minden körben (kliens oldalon).
- A játék logika a kliens oldalon fusson a szerver által generált seed alapján, biztosítva hogy minden játékos ugyanazt a sorozatot kapja.
- A rendszer ellenőrizze a játékos bemenetét és adjon visszajelzést.
- A rendszer folytassa a játékot helyes bemenet után, növelve a sorozat hosszát és nehézségét.
- A rendszer végezze el a játék lezárását, ha a játékos hibázik vagy túl sokáig gondolkodik.
- A rendszer mentse a játékos pontszámát.

### Nem funkcionális követelmények
- A felület legyen mobilon és desktopon is jól használható.
- A rendszer böngészőfüggetlenül működjön.
- A rendszer legyen skálázható, hogy több játékost is kiszolgáljon egyszerre.
- A rendszer legyen biztonságos, különösen a felhasználói adatok és jelszavak kezelése során.
- A rendszer legyen megbízható, minimalizálva a leállások és hibák előfordulását.
- A rendszer legyen könnyen karbantartható és bővíthető a jövőbeni funkciók hozzáadásához.
- A rendszer legyen gyors, minimalizálva a késleltetést a játékos bemenet és a rendszer válasza között.

## Fizikai környezet
- A rendszer webes környezetben fusson, elérhető legyen modern böngészőkben (Chrome, Firefox, Edge).
- A rendszer frontendje React alapú legyen.
- A rendszer backendje #todo alapú legyen, #todo keretrendszerrel.
- Az adatbázis #todo legyen.

## Absztrakt domain modell
```mermaid
classDiagram
    class Játékos {
        +felhasználónév: String
        +email: String
        +jelszó: String
    }

    class Játék {
        +sorozat: List~Input~
        +állapot: "folyamatban" | "befejezett"
        +mód: "egyjátékos" | "többjátékos"
        +nehézség: "eredeti" | "kibővített"
        +körökSzáma: Int
    }

    class Pontszám {
        +pontszám: Int
        +dátum: Date
    }

    Játék "1" --> "1..*" Pontszám
    Játékos "1" --> "0..*" Pontszám

```
## Architektúra terv
### Átfogó architektúra
- A rendszer kliens-szerver architektúrára épül, Frontend és Backend részekre bontva.
- A kommunikáció REST API kapcsolatokon keresztül zajlik.

### Frontend architektúra
- A prezentációs réteg React komponensekből áll, amelyek a felhasználói interakciókat kezelik.
- A felhasználói interakciók eseményeket generálnak, amelyek HTTP kéréseket küldenek a szervernek.

### Backend architektúra
- A backend seed generálásért, felhasználókezelésért és verseny koordinációért felelős.
- A játék logika a kliens oldalon fut, minden játékos ugyanazt a seed-et kapja egy adott versenyben.
- A REST API felelős a felhasználókezelésért, seed generálásáért, versenyek kezeléséért és pontszámok rögzítéséért.
- A perszisztencia réteg a felhasználói adatok, seed-ek, versenyek és pontszámok tárolásáért felelős adatbázisban.

```mermaid
graph TD
    A[Felhasználói Interakció] -->|Interakció| B[Frontend/Prezentációs Réteg]
    B -->|HTTP kérések| C[Backend/REST API]
    C -->|Felhasználókezelés, Verseny kezelés| D[Üzleti Logika Réteg]
    D -->|Adatok mentése/lekérése| E[Perszisztencia Réteg/Adatbázis]
    E -->|Adatok| D
    D -->|Válaszok| C
    C -->|HTTP válaszok| B
    B -->|Megjelenítés| A
```

### Kommunikációs folyamatok
- REST API: 
  - Felhasználókezelés: Regisztráció, bejelentkezés, profil lekérdezés
  - Verseny kezelés: Verseny létrehozás, seed lekérése, csatlakozás, állapot lekérdezés, eredmények beküldése
  - Pontszámok: Pontszámok lekérdezése, ranglisták megtekintése
  - Seed generálás: Minden versenyhez egyedi seed generálása, amely biztosítja hogy minden játékos ugyanazt a sorozatot kapja

## Adatbázis terv
- Az adatbázis a felhasználói adatok, versenyek, seed-ek és pontszámok tárolására szolgál.
- A játékmenet lokálisan fut a kliensen egy szerver által generált seed alapján, csak a végleges pontszámok kerülnek tárolásra.
- Minden verseny egy egyedi seed-et kap, amely biztosítja hogy minden résztvevő ugyanazt a sorozatot kapja.
- Az adatbázis relációs adatbázis, amely a következő táblákat tartalmazza:
    - Felhasználók (Users)
    - Játékok (Games)
    - Játékmódok (Modes)
    - Nehézségi szintek (Difficulties)
    - Játék menetek (Matches)
    - Résztvevők (Participants)
- A táblák közötti kapcsolatok:
    - Egy játékban több résztvevő is lehet (többjátékos esetén).
    - Egy játékmód több játékhoz is tartozhat.
    - Egy nehézségi szint több játékhoz is tartozhat.
    - Egy játék több játékmenetet is tartalmazhat.
    - Egy játékmenet több résztvevőt is tartalmazhat (több játékos esetén).
```mermaid
erDiagram
    USER {
        int id PK
        string username
        string email
        string passwordhash
        string avatar_uri
        datetime joined_date
        datetime last_login
    }
    MODE {
        int id PK
        string name
    }
    DIFFICULTY {
        int id PK
        string name
    }
    GAME {
        int id PK
        int mode_id FK
        int difficulty_id FK
    }
    MATCH {
        int id PK
        int game_id FK
        string seed
        datetime started_at
        datetime ended_at
    }
    PARTICIPANT {
        int id PK
        int match_id FK
        int user_id FK
        int round_eliminated
        int mmr_at_time_of_playing
        datetime achieved_at
    }

    USER ||--o{ PARTICIPANT : "ér el"
    GAME ||--o{ MATCH : "tartalmaz"
    MODE ||--o{ GAME : "definiál"
    DIFFICULTY ||--o{ GAME : "definiál"
    MATCH ||--o{ PARTICIPANT : "eredmény"
```
## Implementációs terv
### Perszistencia réteg
+ A perszisztencia réteg #todo adatbázisra épül.
+ Az adatbázis kapcsolódást #todo biztosítja.
+ Az adatok lekérdezése és mentése aszinkron módon történik.
```mermaid
classDiagram
    class UserRepository {
        +createUser(user: User): Promise~User~
        +getUserById(id: int): Promise~User~
        +getUserByUsername(username: String): Promise~User~
        +updateUser(user: User): Promise~User~
        +deleteUser(id: int): Promise~void~
    }

    class GameRepository {
        +getAllGames(): Promise~List~Game~~
    }

    class MatchRepository {
        +createMatch(match: Match): Promise~Match~
        +getMatchById(id: int): Promise~Match~
        +updateMatch(match: Match): Promise~Match~
    }

    class ScoreRepository {
        +createScore(score: Score): Promise~Score~
        +getScoresByUserId(userId: int): Promise~List~Score~~
        +getScoresByGameId(gameId: int): Promise~List~Score~~
    }
```
+ A UserRepository a felhasználói adatok kezeléséért felelős.
+ A GameRepository a játékmódok és beállítások tárolását végzi.
+ A MatchRepository a játék meneteket kezeli.
+ A ScoreRepository a pontszámok mentését és lekérdezését valósítja meg.

### Üzleti logika réteg
+ Az üzleti logika réteg a verseny koordinációt és seed generálást kezeli.
+ A játék menetek létrehozása, seed generálása és eredmények validálása itt történik.
+ A játék logika maga a kliens oldalon fut, a backend csak seed-et generál és eredményeket validál.
```mermaid
classDiagram
    class GameService {
        +startNewGame(userId: int, modeId: int, difficultyId: int): Promise~Game~
        +generateSeed(): String
        +joinGame(userId: int, gameId: int): Promise~GameWithSeed~
        +submitScore(userId: int, gameId: int, score: int, seed: String): Promise~Score~
        +validateScore(seed: String, score: int): Boolean
    }   

    class UserService {
        +registerUser(username: String, email: String, password: String): Promise~User~
        +loginUser(username: String, password: String): Promise~String~ // returns JWT token
        +getUserProfile(userId: int): Promise~User~
        +updateUserProfile(userId: int, userData: User): Promise~User~
    }   

    class AuthService {
        +hashPassword(password: String): Promise~String~
        +verifyPassword(password: String, hash: String): Promise~Boolean~
        +generateToken(userId: int): String
        +verifyToken(token: String): Promise~int~
    }

    GameService --> GameRepository
    GameService --> MatchRepository
    GameService --> ScoreRepository
    UserService --> UserRepository
    AuthService --> UserRepository
```
+ A GameService kezeli a játék menetek létrehozását, seed generálását, csatlakozást és eredmények validálását.
+ A játék logika a kliens oldalon fut a szerver által generált seed alapján.
+ A UserService a felhasználói regisztrációt, bejelentkezést és profilkezelést végzi.
+ Az AuthService a jelszavak hash-eléséért, ellenőrzéséért és a JWT tokenek kezeléséért felelős.
+ Minden szolgáltatás a megfelelő repository-kat használja az adatok kezelésére.    


### Prezentációs réteg
+ A prezentációs réteg a felhasználói interakciókat kezeli.
+ A REST API végpontok itt kerülnek definiálásra.
```mermaid
classDiagram
    class ApiController {
        +register(req: Request, res: Response): Promise~void~
        +login(req: Request, res: Response): Promise~void~
        +getUserProfile(req: Request, res: Response): Promise~void~
        +updateUserProfile(req: Request, res: Response): Promise~void~
        +getGameModes(req: Request, res: Response): Promise~void~
        +createCompetition(req: Request, res: Response): Promise~void~
        +joinCompetition(req: Request, res: Response): Promise~void~
        +getSeed(req: Request, res: Response): Promise~void~
        +getCompetitionStatus(req: Request, res: Response): Promise~void~
        +submitScore(req: Request, res: Response): Promise~void~
        +getLeaderboard(req: Request, res: Response): Promise~void~
    }
    ApiController --> UserService
    ApiController --> GameService
```
+ Az ApiController kezeli a REST API végpontokat, és a megfelelő szolgáltatásokat hívja meg.
+ A játékmenet a kliens oldalon fut egy szerver által generált seed alapján.
+ A szerver csak a seed generálást, versenyek koordinálását és eredmények tárolását/validálását végzi.
+ Minden játékos ugyanazt a seed-et kapja egy adott versenyben, így biztosítva a fair versenyt.    

## Tesztterv
### 1. Egységtesztek
+ Minden szolgáltatás és repository osztályhoz tartozó egységtesztek írása.
+ A tesztek ellenőrzik a metódusok helyes működését, beleértve a bemenetek és kimenetek helyességét.
+ Frontend komponensek tesztelése a megfelelő viselkedés és állapotváltozások ellenőrzésére.

### 2. Felhasználói tesztek
- Játék indítása és sorozatok megjelenítése.
- Játékos bemenet ellenőrzése, helyes és helytelen válasz esetén visszajelzés.
- Eredménytábla megjelenítése és pontszámok helyes rendezése.
- Pontszám mentése és böngésző újratöltés után történő betöltése.
- Játék kései állapotának tesztelése

### 3. Nem funkcionális tesztek
- Reszponzív design ellenőrzése mobil és desktop eszközökön.
- Böngészőfüggetlenség tesztelése Chrome, Firefox, Edge böngészőkben.
- Teljesítményteszt: rövid késleltetés a sorozat megjelenítésekor.
- Játékos sebesség teszt: a bemenet sorrendjének pontossága még akkor is ha a felhasználó gyorsan üti be őket.

## Telepítési terv
#todo

## Karbantartási terv
#todo

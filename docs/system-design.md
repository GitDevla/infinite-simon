# Rendszerterv
## Projekt terv
### Csapatbeosztás
- Tervező: Pataki Dávid (közös)
- Designer: Pataki Dávid
- Implementáció
    - Frontend: Pataki Dávid
    - Backend
        - Adatbázis: Kerekes Bence
        - Játék Logika: Kerekes Bence
        - API: Csendes Dávid
    - Tesztelő: Csendes Dávid

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

## Fizikai környezet
- A rendszer webes környezetben fusson, elérhető legyen modern böngészőkben (Chrome, Firefox, Edge).
- A rendszer frontendje React alapú legyen.
- A rendszer backendje Node.js alapú legyen, Express keretrendszerrel.
- Az adatbázis SQLite relációs adatbázis legyen, Prisma ORM-mel kezelve.

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
  - Felhasználókezelés: Regisztráció, bejelentkezés, profil lekérdezés, profil frissítés
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
        string password_hash
        string avatar_uri
        datetime joined_date
        datetime last_login
        bool is_verified
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
    }
    PARTICIPANT {
        int id PK
        int match_id FK
        int user_id FK
        int round_eliminated
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
+ A perszisztencia réteg SQLite adatbázisra épül.
+ Az adatbázis kapcsolódást Prisma biztosítja.
+ Az adatok lekérdezése és mentése aszinkron módon történik.
```mermaid
classDiagram
    class PrismaUserRepository {
        +getUserByUsername(username: string): Promise<User | null>;
        +getUserById(userId: number): Promise<User | null>;
        +create(username: string, email: string, passwordHash: string, avatarUri?: string): +Promise<User>;
        +update(userId: number, data: Partial<User>): Promise<User>;
        +delete(userId: number): Promise<void>;
        +updateLastLogin(userId: number, date: Date): Promise<User>;
        +getUserScores(userId: number): Promise<any[]>;
        +getUserScoresWithFilters(query: UserScoresQuery): Promise<UserScores[]>;
        +getUserPlacementInMatch(userId: number, matchId: number): Promise<UserPlacement>;
        +getTotalGamesPlayed(userId: number): Promise<number>;
        +getBestScore(userId: number): Promise<number | null>;
        +getAverageScore(userId: number): Promise<number | null>;
        +getMultiPlayerStats(userId: number): Promise<number>;
        +getSinglePlayerStats(userId: number): Promise<number>;
        +getUserByEmail(email: string): Promise<User | null>;
    }

    class PrismaGameRepository {
        +createGame(modeId: number, difficultyId: number): Promise<Game>;
        +createMatch(data: GameSettings): Promise<Match>;
        +createGameResult(data: GameResult): Promise<any>;
        +getMatchById(matchId: number): Promise<Match | null>;
        +getGameById(gameId: number): Promise<Game | null>;
    }

    class ProfilePictureRepository {
        +save(base64: string, name: string): Promise<string>;
        +delete(uri: string): Promise<void>;
        +exists(uri: string): Promise<boolean>;
    }
```
+ A **PrismaUserRepository** a felhasználói adatok tárolását és lekérdezését, eredmények lekérdezését végzi.
+ A **PrismaGameRepository** a játékok, játékmenetek és eredmények mentését végzi.
+ A **ProfilePictureRepository** az avatar képek mentését és törlését végzi.

### Üzleti logika réteg
+ Az üzleti logika réteg a verseny koordinációt és seed generálást kezeli.
+ A játék menetek létrehozása, seed generálása és eredmények validálása itt történik.
+ A játék logika maga a kliens oldalon fut, a backend csak seed-et generál és eredményeket validál.
```mermaid
classDiagram
    class GameService {
        +startNewGame(modeId: number, difficultyId: number): Promise<MatchResult>;
        +saveGameResult(userId: number, matchId: number, roundEliminated: number): Promise<void>;
    }   

    class UserService {
        +updateLastLogin(userId: number): Promise<void>;
        +changePassword(userId: number, newPassword: string): Promise<void>;
        +getUserByUsername(username: string): Promise<User | null>;
        +getUserById(userId: number): Promise<User | null>;
        +getUserStatsExtended(userId: number, scoresQuery?: Partial<UserScoresQuery>): Promise<UserStatsExtended>;
        +updateUserProfile(userId: number, updates: Partial<UserProfileUpdate>): Promise<User>;
    }   

    class AuthService {
        +validateCredentials(username: string, password: string, email: string): ValidationResult;
        +validateEmail(email: string): ValidationResult;
        +validatePassword(password: string): ValidationResult;
        +validateUsername(username: string): ValidationResult;
        +initiateEmailVerification(userId: number): Promise<void>;
        +finalizeEmailVerification(token: string): Promise<void>;
        +initiatePasswordReset(email: string): Promise<void>;
        +finalizePasswordReset(token: string, newPassword: string): Promise<void>;
    }

    class CredentialValidator {
        +validateCredentials(username: string, password: string, email: string): ValidationResult;
        +validateEmail(email: string): ValidationResult;
        +validatePassword(password: string): ValidationResult;
        +validateUsername(username: string): ValidationResult;
    }

    class JwtTokenGenerator{
        +generate(payload: any, expiresIn?: string): string;
        +verify(token: string): any;
    }

    class BcryptPasswordHasher {
        +hash(password: string): Promise<string>;
        +compare(password: string, hash: string): Promise<boolean>;
    }

    class ResendEmailService {
        +sendEmail(to: string, subject: string, html: string): Promise<void>;
        +sendRegistrationEmail(to: string, validationLink: string): Promise<void>;
        +sendPasswordResetEmail(to: string, resetLink: string): Promise<void>;
    }
    

    GameService --> GameRepository
    UserService --> UserRepository
    UserService --> ImageRepository
    UserService --> BcryptPasswordHasher
    UserService --> CredentialValidator
    AuthService --> UserRepository
    AuthService --> CredentialValidator
    AuthService --> BcryptPasswordHasher
    AuthService --> JwtTokenGenerator
    AuthService --> ResendEmailService
```
+ A **GameService** kezeli a játék menetek létrehozását, seed generálását, csatlakozást és eredmények validálását.
+ A játék logika a kliens oldalon fut a szerver által generált seed alapján.
+ A **UserService** a felhasználói regisztrációt, bejelentkezést és profilkezelést végzi.
+ Az **CredentialValidator** a felhasználói hitelesítő adatok (felhasználónév, jelszó, email) validálásáért felelős.
+ A **JwtTokenGenerator** a JWT tokenek generálását és ellenőrzését végzi.
+ A **BcryptPasswordHasher** a jelszavak biztonságos hash-elését és ellenőrzését végzi.
+ Minden szolgáltatás a megfelelő repository-kat használja az adatok kezelésére.  
+ A **ResendEmailService** kezeli az email küldést regisztráció és jelszó visszaállítás esetén.  


### Prezentációs réteg
+ A prezentációs réteg a felhasználói interakciókat kezeli.
+ A REST API végpontok itt kerülnek definiálásra.
```mermaid
classDiagram
    class AuthController {
        +register(req: Request, res: Response): Promise<void>;
        +login(req: Request, res: Response): Promise<void>;
        +requestPasswordReset(req: Request, res: Response): Promise<void>;
        +finalizePasswordReset(req: Request, res: Response): Promise<void>;
        +finalizeEmailVerification(req: Request, res: Response): Promise<void>;
        +resendVerificationEmail(req: Request, res: Response): Promise<void>;
    }

    class UserController {
        +getMe(req: Request, res: Response): Promise<void>;
        +getStats(req: Request, res: Response): Promise<void>;
        +updateProfile(req: Request, res: Response): Promise<void>;
    }

    class GameController {
        +startNewGame(req: Request, res: Response): Promise<void>;
        +saveGameResult(req: Request, res: Response): Promise<void>;
    }

    AuthController --> AuthService
    UserController --> UserService
    GameController --> GameService
    DIContainer --> AuthController
    DIContainer --> UserController
    DIContainer --> GameController
```
+ A **DIContainer** kezeli a függőség injektálást a kontrollerek és szolgáltatások között.
+ A **AuthController** kezeli a regisztrációt és bejelentkezést.
+ A **UserController** kezeli a felhasználói profil lekérdezését és frissítését.
+ A **GameController** kezeli a játék indítását és eredmények mentését.
+ Minden kontroller a megfelelő szolgáltatásokat használja az üzleti logika végrehajtásához.


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
A rendszer telepítése a következő lépésekből áll:
1. Szerver előkészítése:
    - Operációs rendszer telepítése (pl. Ubuntu Server).
    - Docker telepítése.
2. Kód telepítése:
    - A forráskód klónozása a verziókezelő rendszerből.
    - Helyes környezeti beállítások konfigurálása.
    - A Docker konténerek felépítése és indítása.
        - A frontend és backend szolgáltatások külön konténerekben futnak.
        - Adatbázis autómatikus inicializálása a konténer indításakor.
3. Ellenőrzés:
    - A rendszer elérhetőségének ellenőrzése böngészőből.
    - Alapvető funkciók tesztelése (regisztráció, bejelentkezés, játék indítása).
4. Monitorozás beállítása:
    - Rendszer monitorozó eszközök telepítése a szerver állapotának figyelésére.

## Karbantartási terv
A rendszer karbantartása a következő tevékenységeket foglalja magában:
1. Rendszerfrissítések:
    - Rendszeres frissítések telepítése az operációs rendszerre és a Docker környezetre.
    - Alkalmazás frissítések telepítése új verziók megjelenésekor.
2. Adatbázis karbantartás:
    - Rendszeres biztonsági mentések készítése az adatbázisról.
    - Adatbázis optimalizálás és tisztítás szükség szerint.
3. Hibakezelés:
    - Hibák és problémák gyors azonosítása és javítása.
    - Felhasználói visszajelzések figyelése és kezelése.
4. Teljesítmény monitorozás:
    - A rendszer teljesítményének folyamatos figyelése.
    - Teljesítményproblémák azonosítása és optimalizálása.
5. Biztonsági intézkedések:
    - Rendszeres biztonsági auditok végrehajtása.
    - Felhasználói adatok védelme és biztonsági rések javítása.

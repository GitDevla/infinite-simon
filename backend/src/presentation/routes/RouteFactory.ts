import { Router, static as static_ } from "express";
import { AuthController } from "../controllers/AuthController";
import { GameController } from "../controllers/GameController";
import { UserController } from "../controllers/UserController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { DIContainer } from "../../config/DIContainer";

export class RouteFactory {
    static createRoutes(container: DIContainer): Router {
        const router = Router();
        
        // Initialize controllers
        const authController = new AuthController(container.getAuthService());
        const gameController = new GameController(container.getGameService());
        const userController = new UserController(container.getUserService());
        
        // Initialize middleware
        const authMiddleware = new AuthMiddleware(container.getTokenGenerator());

        // CDN and static files
        router.use("/public", Router().use(static_("public")));
        
        // Auth routes
        router.post("/login", (req, res) => authController.login(req, res));
        router.post("/register", (req, res) => authController.register(req, res));
        
        // Game routes
        router.post("/start-game", (req, res) => gameController.startNewGame(req, res));
        router.post("/save-game-result", authMiddleware.authenticate, (req, res) => gameController.saveGameResult(req, res));
        
        // User routes
        router.get("/api/me", authMiddleware.authenticate, (req, res) => userController.getMe(req, res));
        router.get("/api/stats", authMiddleware.authenticate, (req, res) => userController.getStats(req, res));
        router.put("/api/me", authMiddleware.authenticate, (req, res) => userController.updateProfile(req, res));
        
        return router;
    }
}

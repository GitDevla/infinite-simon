import { Router, static as static_ } from "express";
import { rateLimit } from "express-rate-limit";
import { AuthController } from "../controllers/AuthController";
import { GameController } from "../controllers/GameController";
import { UserController } from "../controllers/UserController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { DIContainer } from "../../config/DIContainer";

export class RouteFactory {
    static createRoutes(container: DIContainer): Router {
        const router = Router();

        const RATE_LIMIT_MESSAGE = "Too many requests from this IP, please try again later.";

        // General rate limiting
        const limiter = rateLimit({
            windowMs: 60 * 1000, // 1 minute
            max: 120, // 120 requests
            standardHeaders: true,
            message: RATE_LIMIT_MESSAGE,
            legacyHeaders: false,
        });

        // Auth rate limiting
        const authLimiter = rateLimit({
            windowMs: 60 * 1000, // 1 minute
            max: 10, // 10 requests
            standardHeaders: true,
            message: RATE_LIMIT_MESSAGE,
            legacyHeaders: false,
        });

        // Initialize controllers
        const authController = new AuthController(container.getAuthService());
        const gameController = new GameController(container.getGameService());
        const userController = new UserController(container.getUserService());
        
        // Initialize middleware
        const authMiddleware = new AuthMiddleware(container.getTokenGenerator());
        
        // Auth routes
        router.post("/login", authLimiter, (req, res) => authController.login(req, res));
        router.post("/register", authLimiter, (req, res) => authController.register(req, res));

        // Game routes
        router.post("/start-game", limiter, (req, res) => gameController.startNewGame(req, res));
        router.post("/join-game", limiter, (req, res) => gameController.joinMultiplayerMatch(req, res));
        router.post("/save-game-result", limiter, authMiddleware.authenticate, (req, res) => gameController.saveGameResult(req, res));
        
        // User routes
        router.get("/api/me", limiter, authMiddleware.authenticate, (req, res) => userController.getMe(req, res));
        router.get("/api/stats", limiter, authMiddleware.authenticate, (req, res) => userController.getStats(req, res));
        router.put("/api/me", limiter, authMiddleware.authenticate, (req, res) => userController.updateProfile(req, res));

        return router;
    }
}

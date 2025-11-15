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

        // Defined before rate limiting to allow static files to be served without limits
        router.use("/public", Router().use(static_("public")));

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
        router.post("/login", authLimiter, (req, res, next) => authController.login(req, res, next));
        router.post("/register", authLimiter, (req, res, next) => authController.register(req, res, next));
        router.post("/request-password-reset", authLimiter, (req, res, next) => authController.requestPasswordReset(req, res, next));
        router.post("/finalize-password-reset", authLimiter, (req, res, next) => authController.finalizePasswordReset(req, res, next));
        router.post("/verify-email", authLimiter, (req, res, next) => authController.finalizeEmailVerification(req, res, next));
        router.post("/resend-verification-email", authLimiter, authMiddleware.authenticate, (req, res, next) => authController.resendVerificationEmail(req, res, next));

        // Game routes
        router.post("/start-game", limiter, (req, res, next) => gameController.startNewGame(req, res, next));
        router.post("/join-game", limiter, authMiddleware.authenticate, (req, res, next) => gameController.joinMultiplayerMatch(req, res, next));
        router.post("/save-game-result", limiter, authMiddleware.authenticate, (req, res, next) => gameController.saveGameResult(req, res, next));

        // User routes
        router.get("/api/me", limiter, authMiddleware.authenticate, (req, res, next) => userController.getMe(req, res, next));
        router.get("/api/stats", limiter, authMiddleware.authenticate, (req, res, next) => userController.getStats(req, res, next));
        router.put("/api/me", limiter, authMiddleware.authenticate, (req, res, next) => userController.updateProfile(req, res, next));

        return router;
    }
}

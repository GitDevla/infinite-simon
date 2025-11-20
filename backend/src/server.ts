import cors from "cors";
import express from "express";
import { DIContainer } from "./config/DIContainer";
import { RouteFactory } from "./presentation/routes/RouteFactory";
import { processErrorMiddleware } from "./presentation/middleware/errorMiddleware";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const openapiDocument = YAML.load("./src/docs/openapi.yaml");

// Initialize dependency injection container
const container = new DIContainer();

// Middleware
app.use(cors({
	origin: FRONTEND_URL,
	credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiDocument));

// Routes
app.use(RouteFactory.createRoutes(container));

app.use(processErrorMiddleware);

// Graceful shutdown
process.on('SIGTERM', async () => {
	console.log('SIGTERM received. Shutting down gracefully...');
	await container.disconnect();
	process.exit(0);
});

process.on('SIGINT', async () => {
	console.log('SIGINT received. Shutting down gracefully...');
	await container.disconnect();
	process.exit(0);
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT} (Development)`);
});

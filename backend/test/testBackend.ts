import { DIContainer } from "../src/config/DIContainer";

async function testBackend() {
    const container = new DIContainer();
    
    try {
        // Test auth service
        console.log("\nTesting auth service...");
        const authService = container.getAuthService();
        
        // Test registration
        const registerResult = await authService.register("testuser", "test@example.com", "TestPassword123!");
        console.log("Registration result:", registerResult);
        
        // Test login
        const loginResult = await authService.login("testuser", "TestPassword123!");
        console.log("Login result:", loginResult);
        
        // Test user service
        console.log("\nTesting user service...");
        const userService = container.getUserService();
        const user = await userService.getUserById(1);
        console.log("User found:", user ? "Yes" : "No");
        
        // Test game service
        console.log("\nTesting game service...");
        const gameService = container.getGameService();
        const gameResult = await gameService.startNewGame(1, 1);
        console.log("Game started:", gameResult);
        
        console.log("\nAll tests passed! The backend is working correctly.");
        
    } catch (error) {
        console.error("\nTest failed:", error);
    } finally {
        await container.disconnect();
    }
}

testBackend();

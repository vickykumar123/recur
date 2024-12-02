import express, {Request, Response} from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Resolve paths consistently
const frontendDistPath = path.resolve(__dirname, "../../frontend/dist");

// Serve static files from the frontend build directory
app.use(express.static(frontendDistPath));

// Example API route
app.get("/api", (req: Request, res: Response) => {
  res.json({message: "Hello World"});
});

// Fallback route for SPA (must be after all API routes)
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

import express, {Request, Response} from "express";
import path from "path";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON and URL-encoded payloads
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Serve static assets from the .next folder
const staticBuildPath = path.join(__dirname, "../../frontend/.next");
app.use("/_next", express.static(staticBuildPath)); // Serve Next.js assets
app.use(express.static(path.join(staticBuildPath, "static"))); // Serve static files

// Dynamically handle paths using Next.js manifest
try {
  const manifestPath = path.join(
    staticBuildPath,
    "server",
    "pages-manifest.json"
  );
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  Object.keys(manifest).forEach((route) => {
    app.get(route, (req: Request, res: Response) => {
      const filePath = path.join(staticBuildPath, "server", manifest[route]);
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.status(404).send("Page not found");
        } else {
          res.contentType("text/html");
          res.send(data);
        }
      });
    });
  });
} catch (err) {
  console.error("Error loading Next.js manifest:", err);
}

// API routes
app.get("/api", (req: Request, res: Response) => {
  res.json({message: "Hello from the Backend!"});
});

// Catch-all route to serve the index page for SPA support
app.get("*", (req: Request, res: Response) => {
  const indexPath = path.join(staticBuildPath, "server", "pages", "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(404).send("Page not found");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});

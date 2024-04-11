import "dotenv/config";
import { Express } from "express";
import path from "node:path";
import express from "express";
import router from "./routes/routes.js";

const app: Express = express();

const port: number = parseInt(process.env.PORT, 10) || 3000;

app.set("views", path.resolve(process.cwd() + "/src/views"));

app.set("view engine", "ejs");

app.use(express.static(path.resolve("./public")));//indique le dossier des ressources statiques
app.use(express.urlencoded({ extended: false }));//permet de récupérer les données d'url encodés

app.use("/", router);

app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});

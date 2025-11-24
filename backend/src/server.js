import express from "express";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente");
});
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Simulateur de choix rationnel • Serveur lancé sur http://localhost:${PORT}`);
});

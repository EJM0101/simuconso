document.getElementById('params').addEventListener('submit', function (e) {
  e.preventDefault();

  const R = parseFloat(document.getElementById('revenu').value);
  const P1 = parseFloat(document.getElementById('p1').value);
  const P2 = parseFloat(document.getElementById('p2').value);
  const a = parseFloat(document.getElementById('a').value);
  const b = parseFloat(document.getElementById('b').value);

  // 🔢 Calcul du dénominateur (facteur de normalisation)
  const D = a * P1 + b * P2;

  // 📊 Calcul du panier optimal
  const x1 = (a * R) / D;
  const x2 = (b * R) / D;
  const U = Math.pow(x1, a) * Math.pow(x2, b);
  const TMS = P1 / P2;

  // 📉 Courbes pour le graphique
  const x = [], y1 = [], budgetY = [];
  for (let i = 1; i <= x1 * 2; i += 0.1) {
    const valY = Math.pow(U / Math.pow(i, a), 1 / b);
    const CB_y = (R - P1 * i) / P2;
    x.push(i);
    y1.push(valY);
    budgetY.push(CB_y);
  }

  // 🖼️ Affichage du graphique
  Plotly.newPlot('graph', [
    { x, y: y1, mode: 'lines', name: 'Courbe d’indifférence', line: { color: 'blue' } },
    { x, y: budgetY, mode: 'lines', name: 'Contrainte budgétaire', line: { color: 'red' } },
    { x: [x1], y: [x2], mode: 'markers', name: 'Optimum', marker: { size: 10, color: 'green' } }
  ], {
    title: 'Choix optimal du consommateur',
    xaxis: { title: 'Quantité Bien X' },
    yaxis: { title: 'Quantité Bien Y' }
  });

  // 📝 Résultats et explications affichés
  document.getElementById('resultat').innerHTML = `
    <h3>📊 Résultats détaillés</h3>
    <p><strong>Dénominateur (D) :</strong> D = a·P₁ + b·P₂ = ${a}×${P1} + ${b}×${P2} = <strong>${D.toFixed(2)}</strong></p>
    <p><strong>Formule du panier optimal :</strong> x₁* = (a·R)/D, x₂* = (b·R)/D</p>
    <p><strong>Panier optimal :</strong> X = ${x1.toFixed(2)}, Y = ${x2.toFixed(2)}</p>
    <p><strong>Utilité maximale atteinte :</strong> U = ${U.toFixed(2)}</p>
    <p><strong>Taux Marginal de Substitution (TMS) :</strong> TMS = P₁ / P₂ = ${TMS.toFixed(2)}</p>
    <button id="exportPDF" style="margin-top: 15px;">📄 Exporter en PDF</button>
  `;

  // 📤 Export PDF
  document.getElementById('exportPDF').addEventListener('click', () => {
    const content = document.getElementById('resultat').innerHTML;
    const win = window.open('', '_blank');
    win.document.write(`<html><head><title>Export Résultat</title></head><body>${content}</body></html>`);
    win.document.close();
    win.print();
  });
});
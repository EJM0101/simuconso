document.getElementById('params').addEventListener('submit', function (e) {
  e.preventDefault();

  const R = parseFloat(document.getElementById('revenu').value);
  const P1 = parseFloat(document.getElementById('p1').value);
  const P2 = parseFloat(document.getElementById('p2').value);
  const a = parseFloat(document.getElementById('a').value);
  const b = parseFloat(document.getElementById('b').value);

  const denom = a * P1 + b * P2;
  const x1 = (a * R) / denom;
  const x2 = (b * R) / denom;
  const U = Math.pow(x1, a) * Math.pow(x2, b);

  const x = [], y1 = [], budgetY = [];
  for (let i = 1; i <= x1 * 2; i += 0.1) {
    const valY = Math.pow(U / Math.pow(i, a), 1 / b);
    const CB_y = (R - P1 * i) / P2;
    x.push(i);
    y1.push(valY);
    budgetY.push(CB_y);
  }

  Plotly.newPlot('graph', [
    { x, y: y1, mode: 'lines', name: 'Courbe d’indifférence', line: { color: 'blue' } },
    { x, y: budgetY, mode: 'lines', name: 'Contrainte budgétaire', line: { color: 'red' } },
    { x: [x1], y: [x2], mode: 'markers', name: 'Optimum', marker: { size: 10, color: 'green' } }
  ], {
    title: 'Choix optimal du consommateur',
    xaxis: { title: 'Quantité Bien X' },
    yaxis: { title: 'Quantité Bien Y' }
  });

  document.getElementById('resultat').innerHTML = `
    <h3>📊 Résultat</h3>
    <p><strong>Panier optimal :</strong> X = ${x1.toFixed(2)}, Y = ${x2.toFixed(2)}</p>
    <p><strong>Utilité maximale :</strong> U = ${U.toFixed(2)}</p>
    <p><strong>TMS =</strong> P1 / P2 = ${(P1 / P2).toFixed(2)}</p>
  `;
});

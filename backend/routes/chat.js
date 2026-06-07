import express from 'express';
const router = express.Router();
router.post('/', (req, res) => {
  const text = (req.body.message || '').toLowerCase();
  let reply = 'Faleminderit! Kërkesa jote do të shqyrtohet nga një operator.';
  if (text.includes('karte') || text.includes('kartë')) reply = 'Për kartën mund të kërkosh bllokim, aktivizim ose zëvendësim.';
  if (text.includes('pin')) reply = 'PIN-i mund të ndryshohet në ATM ose nga aplikacioni mobile.';
  if (text.includes('kredi')) reply = 'Për kredi duhet formular aplikimi, të ardhura dhe verifikim financiar.';
  if (text.includes('transfert')) reply = 'Transfertat brenda bankës janë të shpejta; ndërbankare zakonisht 1-2 ditë pune.';
  res.json({ reply });
});
export default router;

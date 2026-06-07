import express from 'express';
const router = express.Router();
const faqs = [
  { question: 'Si ndryshohet PIN-i?', answer: 'PIN-i mund të ndryshohet në ATM ose në aplikacionin mobile të bankës.' },
  { question: 'Çfarë bëj nëse humbas kartën?', answer: 'Blloko kartën menjëherë nga aplikacioni ose kontakto bankën.' },
  { question: 'Sa zgjat një transfertë?', answer: 'Brenda bankës zakonisht kryhet menjëherë, ndërbankare 1-2 ditë pune.' },
  { question: 'Si hapet një llogari e re?', answer: 'Duhet dokument identifikimi dhe formulari online ose në degë.' }
];
router.get('/', (req, res) => res.json(faqs));
export default router;

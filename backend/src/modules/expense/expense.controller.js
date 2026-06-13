// expense.controller.js — Gestion des dépenses
const express = require('express');
const router = express.Router();

// GET /api/expenses 
router.get('/', async (req, res) => {
  try {
    // TODO: récupérer depuis BDD
    const expenses = [
      { id: 1, amount: 5000, category: 'Alimentation', 
        description: 'Marché', date: new Date() },
      { id: 2, amount: 2500, category: 'Transport', 
        description: 'Taxi', date: new Date() }
    ];
    res.json({ expenses, total: expenses.length });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST /api/expenses
router.post('/', async (req, res) => {
  try {
    const { amount, category, description, source } = req.body;

    if (!amount || !category) {
      return res.status(400).json({ 
        error: 'Montant et catégorie requis' 
      });
    }

    const expense = {
      id: Date.now(),
      amount: parseFloat(amount),
      category,
      description: description || '',
      source: source || 'manual', 
      date: new Date(),
      currency: 'XAF'
    };

    // TODO: sauvegarder en BDD avec Prisma
    res.status(201).json({
      message: 'Dépense enregistrée',
      expense
    });

  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// DELETE /api/expenses/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: supprimer depuis BDD
    res.json({ message: `Dépense ${id} supprimée` });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
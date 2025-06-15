// routes/marketplace.js
const express = require('express');
const router = express.Router();
const Item = require('../models/item'); // ⬅️ file name lowercase, model name capital

// ✅ POST: Add new item
router.post('/add', async (req, res) => {
  const { title, description, price, image, sellerUSN, category } = req.body;

  if (!title || !price || !sellerUSN || !category) {
    return res.status(400).json({ msg: 'Missing required fields' });
  }

  try {
    const newItem = new Item({
      title,
      description,
      price,
      image,
      sellerUSN,
      category
    });

    await newItem.save();
    res.status(201).json({ msg: 'Item added successfully', item: newItem });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err });
  }
});

// ✅ GET: View all items
router.get('/all', async (req, res) => {
  try {
    const items = await Item.find().sort({ datePosted: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching items', error: err });
  }
});

module.exports = router;
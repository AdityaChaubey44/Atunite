// routes/marketplace.js
const express = require('express');
const Item = require('../models/Item');

const router = express.Router();

// ✅ POST: Add a new item
router.post('/add', async (req, res) => {
  const { title, description, price, sellerUSN, contact, image } = req.body;

  if (!title || !price || !sellerUSN || !contact) {
    return res.status(400).json({ msg: 'Missing required fields' });
  }

  try {
    const newItem = new Item({
      title,
      description,
      price,
      sellerUSN,
      contact,
      image
    });

    await newItem.save();
    res.status(201).json({ msg: 'Item listed successfully', item: newItem });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err });
  }
});

// ✅ GET: Fetch all listed items
router.get('/all', async (req, res) => {
  try {
    const items = await Item.find().sort({ datePosted: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err });
  }
});

module.exports = router;
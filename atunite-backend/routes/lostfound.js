// routes/lostfound.js
const express = require('express');
const LostItem = require('../models/LostItem');
const User = require('../models/User');

const router = express.Router();

// ✅ POST: Report a lost item
router.post('/report', async (req, res) => {
  const { itemName, description, reportedByUSN, image } = req.body;

  if (!itemName || !reportedByUSN) {
    return res.status(400).json({ msg: 'Item name and USN are required' });
  }

  try {
    const item = new LostItem({
      itemName,
      description,
      reportedByUSN,
      image
    });

    await item.save();
    res.status(201).json({ msg: 'Lost item reported', item });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err });
  }
});

// ✅ GET: All lost items
router.get('/all', async (req, res) => {
  try {
    const items = await LostItem.find().sort({ dateReported: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err });
  }
});

// ✅ PUT: Mark item as found and give reward
router.put('/mark-found/:id', async (req, res) => {
  const { finderUSN } = req.body;
  const itemId = req.params.id;

  try {
    const item = await LostItem.findById(itemId);
    if (!item) return res.status(404).json({ msg: 'Item not found' });
    if (item.isFound) return res.status(400).json({ msg: 'Item already marked as found' });

    const finder = await User.findOne({ usn: finderUSN });
    if (!finder) return res.status(404).json({ msg: 'Finder not found' });

    const currentMonth = new Date().getMonth();

    // Reward check
    if (finder.rewardClaimedMonth === currentMonth) {
      return res.status(400).json({ msg: 'Reward already claimed this month' });
    }

    finder.credits += 10; // 10 credit points
    finder.rewardClaimedMonth = currentMonth;

    item.isFound = true;
    item.finderUSN = finderUSN;
    item.rewardGiven = true;

    await item.save();
    await finder.save();

    res.json({ msg: 'Item marked as found, reward given', item });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err });
  }
});

module.exports = router;
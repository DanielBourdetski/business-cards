const Card = require('../models/model');
const { verfyToken } = require('../../users/helpers/token');

const express = require('express');
const authorizationMiddlware = require('../../helpers/authorizationMiddleware');
const router = express.Router();

//כל הניתובים שנגדיר כאן בפנים ניתן יהיה להגיע אליהם
//דרך הקידומת
// localhost:3000/api/cards/allusercards
//+
//מה שנפרט בקובץ זה

router.get('/', authorizationMiddlware, (request, response) => {
  const mongoDbUserId = request.userid;

  Card.find({ userID: mongoDbUserId })
    .then(cards => response.json(cards))
    .catch(errors => response.status(500).json(errors));
});

router.get('/:cardid', authorizationMiddlware, (req, res) => {
  const userid = req.userid;
  const cardId = req.params.cardid;

  const filter = {
    _id: cardId,
    userID: userid,
  };

  Card.find(filter)
    .then(x => res.json(x))
    .catch(x => res.status(500).json(x));
});

router.delete('/:cardid', authorizationMiddlware, (req, res) => {
  const cardid = req.params.cardid;
  const userid = req.userid;

  const filter = {
    _id: cardid,
    userID: userid,
  };

  Card.deleteOne(filter)
    .then(x => res.json(x))
    .catch(x => res.status(500).json(x));
});

router.put('/:cardid', authorizationMiddlware, (req, res) => {
  const updatedObject = req.body;
  const userId = req.userid;
  const cardId = req.params.cardid;

  const cardFilter = {
    _id: cardId,
    userID: userId,
  };
  Card.updateOne(cardFilter, updatedObject)
    .then(y => res.json(y))
    .catch(y => res.status(500).json(y));
});

router.post('/', authorizationMiddlware, (req, res) => {
  const insertedObject = req.body;
  const userID = req.userid;
  const createdAt = Date.now();

  insertedObject.image =
    req.body.image || 'https://cdn.pixabay.com/photo/2016/11/03/18/19/social-media-1795578_960_720.jpg';

  console.log(insertedObject);

  const newCard = new Card({ ...insertedObject, userID, createdAt });
  newCard
    .save()
    .then(y => res.json(y))
    .catch(y => res.status(500).json(y));
});

module.exports = router;

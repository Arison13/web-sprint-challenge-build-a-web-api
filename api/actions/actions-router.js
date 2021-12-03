// Write your "actions" router here!
const express = require('express');
const Action = require('./actions-model');
const { checkActionBody, checkId} = require('./actions-middlware');
const router = express.Router();

router.get('/', (req, res, next)=> {
    Action.get()
    .then( actions => {
        res.json(actions)
    })
    .catch(next)
})

router.get("/:id", checkId, (req, res) => {
    res.status(200).json(req.action);
});

router.post("/", checkId, checkActionBody, (req, res, next) => {
      Action.insert(req.body)
        .then((newAction) => {
          res.status(201).json(newAction);
        })
        .catch(next);
    }
);

router.put("/:id", checkId, checkActionBody, (req, res, next) => {
      Action.update(req.params.id, req.body)
        .then((updatedAction) => {
          res.status(202).json(updatedAction);
        })
        .catch(next);
    }
);

router.delete("/:id", checkId,(req, res, next) => {
    Action.remove(req.params.id)
      .then(() => {
        res.status(204).json({});
      })
      .catch(next);
});

module.exports = router
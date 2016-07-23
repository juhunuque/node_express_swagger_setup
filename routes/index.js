var express = require('express');
var router = express.Router();

/**
 *  @swagger
 *  /helloWorld:
 *    get:
 *      tags:
 *        - index
 *      summary: Sample Hello World
 *      operationId: helloWorld
 *      description: Returns Hello message
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: Successful Operation
 *          schema:
 *            type: object
 *            properties:
 *              msg:
 *                type: string
 *        400:
 *          description: Invalid Status

 */
router.get('/helloWorld', function(req, res, next) {
  res.json({msg:"Hello World!"});
});

router.get('/', function(req, res, next) {
  res.json({msg:"Hello Index!"});
});


module.exports = router;

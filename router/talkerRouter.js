const express = require('express');

const { readFile, filterId, newTalker,
   talkerEdit, talkerDelete } = require('../middleware/talkerCRUD');

const { 
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  talkRateValidation, 
} = require('../middleware/validation/validationTalker');

const router = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 404;
const CREATED = 201;

router.get('/', async (_request, response) => {
  const data = await readFile();
  return response.status(HTTP_OK_STATUS).json(data);
  });
  
router.get('/:id', async (request, response) => {
  const result = await filterId(request.params);
    if (result) {
      return response.status(HTTP_OK_STATUS).json(result);
        } 
    if (!result) {
      return response.status(HTTP_NOT_FOUND)
        .json({ message: 'Pessoa palestrante não encontrada' });
        }
  });

  router.post('/', tokenValidation, nameValidation, ageValidation,
  talkValidation, talkRateValidation, async (request, response) => {
     const result = request.body;
     const newObj = { id: 5, ...result };
     await newTalker(newObj);
     return response.status(CREATED).json(newObj);
 });  

 router.put('/:id', tokenValidation, nameValidation, ageValidation, 
 talkValidation, talkRateValidation, async (request, response) => {
  const obj = request.body;
  const { id } = request.params; // na logica do test tem q destruturar ... ..
  const edit = await talkerEdit(obj, id);
  return response.status(HTTP_OK_STATUS).json(edit);
 });

 router.delete('/:id', tokenValidation, async (request, response) => {
  const { id } = request.params;
  const result = await talkerDelete(id);
  return response.status(204).json(result);
 });

  module.exports = router;

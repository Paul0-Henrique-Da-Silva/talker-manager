const fs = require('fs').promises;
const { join } = require('path');

const talkerFile = join(__dirname, '../talker.json');

const readFile = async () => {
  const data = await fs.readFile(talkerFile, 'utf-8');
  return JSON.parse(data);
};

const filterId = async ({ id }) => {
  const data = await readFile();
  const talker = data.find((value) => value.id === Number(id));
  if (talker) return talker;
  if (!talker) return false;
};

const stringifyFile = (value) => fs.writeFile(talkerFile, JSON.stringify(value));

const newTalker = async (obj) => {
  const data = await readFile();
  data.push(obj);
  await stringifyFile(data);
};

const talkerEdit = async (obj, id) => {
 const data = await readFile();
 const indeXof = data.indexOf((value) => value.id === Number(id));
 const objNovo = { id: Number(id), ...obj }; // obj.body
 data.splice(indeXof, 1, objNovo); // remove elemeto a partir do indice
 await stringifyFile(data);
 return objNovo;
};

const talkerDelete = async (id) => {
 const data = await readFile();
 const uptData = data.filter((value) => value.id !== Number(id));
 await stringifyFile(uptData);
 return uptData;
};

module.exports = {
  talkerDelete,
  talkerEdit,
  readFile,
  newTalker,
  filterId,
};  
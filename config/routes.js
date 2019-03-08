const axios = require('axios');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');

const duhbee = require('../database/dbConfig')

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};


///////
  // FUNKY TIME
////////
async function addstuff (widget) {
  let [id] = await duhbee('users').insert(widget)
  return findThing(id)
}

function findThing(thing) {
  return duhbee('users').where({id:thing}).first();
}
////
///////

function register(req, res) {
  // implement user registration
  const newb = req.body;
  console.log(newb.password);
  const hashtag = bcrypt.hashSync(newb.password, 12);
  newb.password = hashtag;

  addstuff(newb)
  .then(stuff => {
    if(stuff){

    res.status(200).json({message:"Newb assigned:", stuff})
    } else {
      res.send('Something went wrong...')
    }

  })
  .catch(errorz => {
    res.status(500).json({message: "username already registered..."});
  })


}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

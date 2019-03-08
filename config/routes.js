const axios = require('axios');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');

const duhbee = require('../database/dbConfig')

const { authenticate } = require('../auth/authenticate');
//const secret = require('../auth/authenticate');
//import jwtkey from '../auth/authenticate';

const jwtKey =
  process.env.JWT_SECRET ||
  'add a .env file to root of project with the JWT_SECRET variable'






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

function filter(peeps) {
  return duhbee('users').where(peeps);
}

function makeTheTolkien(obj) {
  const payload = {
    subject: obj.id,
    username: obj.username,
  };
  const options = {
    expiresIn: '1d',
  }
  return jwt.sign(payload, jwtKey ,options);
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

  let {username, password} = req.body;

  filter({username: username}).first()
  .then(person => {
    //console.log(person);
    if(person && bcrypt.compareSync(password, person.password)) {
      console.log(person);
      let tolkien = makeTheTolkien(person);

      res.status(200).json({message: `Yo ${person.username}, here's a a token:`, tolkien})
    } else {
      res.status(402).json({message: 'No... that\'s not right'})
    }
  })
  .catch(err => {
    res.status(501).json({message: 'Very No, Much Wrong'})
  })
}





function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
    // have I ever mentioned how much I just love new syntax on end of week tests...
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

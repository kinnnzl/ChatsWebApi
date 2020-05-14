'use strict';

const Router = require('express');
const chatRepo = require('../repo/chatRepository');

const getChatsRoutes = (app, express) => {
  const router = new Router();

  router;

  // Add headers
  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://chatsmeet.herokuapp.com');

    // Request methods you wish to allow
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );

    // Request headers you wish to allow
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type'
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });

  app.post('/api/chats/insertMessage', (req, res) => {
    const result = chatRepo.insertMessage(req, 'globalchat');
    res.send(result);
  });

  app.get('/api/chats/getMessages', (req, res) => {
    const result = chatRepo.getMessages('globalchat');
    res.send(result);
  });

  app.get('/api/chats/getUsers', (req, res) => {
    const result = chatRepo.getUsers('user');
    res.send(result);
  });

  app.post('/api/chats/createUser', (req, res) => {
    const result = chatRepo.createUser(req, 'user');
    res.send(result);
  });

  app.use(express.json());
};

module.exports = getChatsRoutes;

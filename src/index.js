const { request, response } = require('express')
const express = require('express')

const knex = require('../knex/connection')

const server = express()

server.use(express.json())

server.get('/users', async (request, response) => {
  const users = await knex('users').select('*');
  return response.json(users)
})

server.get('/chavePix', async (request, response) => {
  const pixes = await knex('pix').select('*');
  return response.json(pixes)
})

server.post('/chavePix', async (request, response) => {
  const { user_id, pix_key } = request.body
  const user = await knex('users').where('id', user_id).first();

  if(!user){
    return response.status(404).json({message: 'Não existe usuario'})
  }
  
  const pix_by_user = await knex('pix').where('user_id', user_id)

  if(pix_by_user.length < 3){
    const exist_pix = await knex('pix').where('key', pix_key).first();
    if(exist_pix){
      return response
      .status(501)
      .json({message: 'Chave PIX já cadastrada.'})
    }

    const trx = await knex.transaction();
    const pix = {
      key: pix_key,
      user_id
    }
    const pix_id = await trx('pix').insert(pix).returning('id');
    await trx.commit();

    return response.json({
      id: pix_id[0],
      ...pix
    })
  }

  return response
      .status(501)
      .json({message: 'Usuario não possui mais chaves disponiveis.'})
})

server.post('/users', async (request, response) => {
  const { name, phone } = request.body
  const trx = await knex.transaction();
  const user = {
    name,
    phone
  };
  const user_id = await trx('users').insert(user).returning('id');
  await trx.commit();

  return response.json({
    id: user_id[0],
    ...user
  })
});

server.listen(3000, () => {
  console.log('Server Online.')
})

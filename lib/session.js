
const SessionModal = require('../models/session.js');

const remove = function(account) {
  return new Promise((resolve, reject) => {
    SessionModal.deleteOne({
      account
    })
    .then(doc => {
      resolve(doc)
    })
    .catch(err => {
      console.log(err)
    })
  })
}
const create = async function(account) {
  const doc = await remove(account)
  return SessionModal.create({
    account
  })
}

module.exports = {
  create,
  remove
}
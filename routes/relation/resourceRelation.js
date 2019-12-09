const MenuModal = require('../../models/menu.js');
const RoleModal = require('../../models/role.js');

const resourceRelation = {
  menus: () => {
    return new Promise((resolve, reject) => {
      MenuModal.find({enabled: true})
      .then((data) => {
        return {
          key: 'menus',
          value: data.map(({_id, label}) => ({value:_id,label}))
        }
      }).then(resolve)
    })
  },
  roles: () => {
    return new Promise((resolve, reject) => {
      RoleModal.find({enabled: true})
      .then((data) => {
        return {
          key: 'roles',
          value: data.map(({_id, label}) => ({value:_id,label}))
        }
      }).then(resolve)
    })
  }
}

module.exports = resourceRelation

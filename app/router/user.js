'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  const usersRouter = router.namespace('/api/users')

  usersRouter.get('/', controller.users.index)
  usersRouter.get('/:id', controller.users.show)
  usersRouter.post('/login', controller.users.login)
  usersRouter.post('/', controller.users.create)
  usersRouter.put('/:id', controller.users.update)
  usersRouter.delete('/:id', controller.users.destroy)
}
'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app

  const file = app.middleware.file('uploads/avatars')

  const usersRouter = router.namespace('/api/users')

  usersRouter.get('/', app.role.can('auth'), controller.users.index)
  usersRouter.get('/:id', controller.users.show)
  usersRouter.post('/upload', file, controller.users.upload)
  usersRouter.post('/login', controller.users.login)
  usersRouter.post('/', controller.users.create)
  usersRouter.put('/:id', controller.users.update)
  usersRouter.delete('/:id', controller.users.destroy)
}

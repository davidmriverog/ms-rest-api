export const userErrorMapping = new Map<string, string>();

userErrorMapping
  .set('users.findById.not_record', 'Usuario no encontrado')
  .set('users.all.query_errors', 'Error al buscar el listado de Usuarios')
  .set('users.create.sql_errors', 'Error al crear un nuevo registro')
  .set('users.update.sql_errors', 'Error al actualizar el registro');


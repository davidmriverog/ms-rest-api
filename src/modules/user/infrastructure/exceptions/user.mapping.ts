export const userErrorMapping = new Map<string, string>();

userErrorMapping
  .set('users.findById.not_record', 'Usuario no encontrado')
  .set('users.all.query_errors', 'Error al buscar el listado de Usuarios');


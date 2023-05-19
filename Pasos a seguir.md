Pasos:
0.-

(Considerar agregar tipos de evento, y filtros por tipo) (conciertos, fiestas)
Empezar el Front End. Definir el diseño.

Front End: Sign up, Log in, Home (todos los eventos), Evento singular (con comentarios, asistencia, información del evento)
Seed de eventos. Los EVENTOS los modificaremos en back. Los usuarios no los van a modificar

1.-

Seed de eventos. Los EVENTOS los modificaremos en back. Los usuarios no los van a modificar.
Modelos
* Modelo Eventos.- Fecha, Nombre, Descripción, Lugar, Lista de asistencia, (Foreign Key Comentarios), imagen del evento
* Modelo Usuarios.- Nombre. Contraseña, Correo. Lista de Eventos a asistir. Lista de comentarios.
* Modelo Comentarios.- Texto, Nombre del Usuario, Nombre del Evento.
* 
2.-

Controllers.
Queries y Control Comentarios. Ruta crear, Ruta Modificar, Ruta Eliminar. Ruta obtener.
Queries y Control Usuarios. Ruta crear, Ruta Modificar, Ruta obtener.

3.-

Conectar Controllers con los botones. (Juntar front end y back end).

4.-
Hacer la presentación.

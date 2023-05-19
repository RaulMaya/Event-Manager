# Event-Manager
Event Management Platform: Users create, discover, and manage events based on location. Register, log in, create profiles, specify event details, set visibility preferences, browse events, RSVP, and communicate with organizers and attendees.


Steps:

1 User uploads event. (this may be changed for an API that provides the event).

Other users can see the list of the event.

Users can comment on the event to ask information.

Users can confirm assistance to the events, with a button.

A list will the updated with the users that confirm assistance.

--
Optional

Events will be confirmed 48 hours earlier, depending on the assistance number. Otherwise it will be canceled and users will be told.

For example. My party only had 2 of the 5 assistance confirmations, so it gets canceled. Notifying the users 



--


Technologies we plan to use:

Mongoose.
Javascript.
React. 
Node.
Express. [Mern]

(we don't know if we will use State) (PWA) 




Other Things we could do

Define general design of Front End, viable with React

Searcher of events by name

- Searcher or filter of events

- Searcher of Events by date



- Define how the events will be shown to de user at Home page. (chronological order, by number of assistances)

 - Hacer una base de datos. Crear Modelos (Eventos) (Usuarios) (Comentarios).


-----
Delegation

Front End: Saul Sharif, Freddy Corona, (Raul Maya).

Back End: David Dominguez, Samuel Russek, Freddy Corona.

--

Pasos a seguir:


0.-  

(Considerar agregar tipos de evento, y filtros por tipo) (conciertos, fiestas)

Empezar el Front End. Definir el diseño.

Front End: Sign up, Log in, Home (todos los eventos), Evento singular (con comentarios, asistencia, información del evento)

Seed de eventos. Los EVENTOS  los modificaremos en back. Los usuarios no los van a modificar

1.-

Seed de eventos. Los EVENTOS  los modificaremos en back. Los usuarios no los van a modificar.

Modelos

- Modelo Eventos.-  Fecha, Nombre, Descripción, Lugar,  Lista de asistencia, (Foreign Key Comentarios), imagen del evento 

- Modelo Usuarios.- Nombre. Contraseña, Correo. Lista de Eventos a asistir. Lista de comentarios.

- Modelo Comentarios.- Texto, Nombre del Usuario, Nombre del Evento.

2.-

Controllers. 

Queries y Control Comentarios. Ruta crear, Ruta Modificar, Ruta Eliminar. Ruta obtener.

Queries y Control Usuarios. Ruta crear, Ruta Modificar, Ruta obtener.

3.- 

Conectar Controllers con los botones. (Juntar front end y back end).

4.-

Hacer la presentación.








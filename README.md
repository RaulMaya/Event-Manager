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


Pages:
- Home (Trending Events)
- Login | Register (Page or Modal)
    * If User Log In:
        - Create Event Page
        - Specific Event Page (Can view and write comments, Assist or Interested)
        - User Dashboard (Which events the user will attend and which events the user create | List of Friends)
    
1. Fix GraphQL End Points
- User
    * CRUD User
    * Friends/Private Profile
    * Create Events
    * Assiting Events
- Events
    * Create Event - Event
    * Event List
2. User Authentication (React + Backend)
3. Investigate about image upload and image provider (Cloudinary)

# Reflect API

The Reflect API was designed too store information for the Reflect app. Users are able to store daily entries, as well as daily tasks.

## Technologies
This API Utilizes React, Node.js, PostgreSQL, and Express.

## Endpoints
'/entry': Used for GET and POST methods allowing you to view all entries, or create a new entry.
'/entry/:id': Used for GET and DELETE methods to find an entry by it's ID to view or delete.
'/habits': Used for GET and POST methods to view all the tasks or create a new task.
'/habits/:id': Used to for DELETE method to remove a task from the list.
'/home/:month_id': Used for GET methods to view the entries by the month ID.

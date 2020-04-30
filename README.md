# Reflect API

The Reflect API was designed to store information for the Reflect app. Users are able to store daily entries, as well as daily tasks.

## Summary
This app was designed to make the task of daily journaling more mobile and convenient. Reflect allows users to create daily 
entries and it stores them organized by date. Users can also create a task list, and mark that task finished or to delete it.

## Technologies 
This project utitlizes Node.js, PostgreSQL, Express, with Mocha and Chai for testing.

## Endpoints
'/entry': Used for GET and POST methods allowing you to view all entries, or create a new entry. <br/>
'/entry/:id': Used for GET and DELETE methods to find an entry by it's ID to view or delete.
'/habits': Used for GET and POST methods to view all the tasks or create a new task.
'/habits/:id': Used to for DELETE method to remove a task from the list.
'/home/:month_id': Used for GET methods to view the entries by the month ID.

## Screenshots

![main-image](https://user-images.githubusercontent.com/54726437/80525357-9d885c00-8980-11ea-9cdd-f206bf6612c2.png)
### Entries page to view, and select an entry.
![add-entry](https://user-images.githubusercontent.com/54726437/80525470-d0325480-8980-11ea-82de-1fd041909f12.png)
### Add entry page to create new entries.
![task-list](https://user-images.githubusercontent.com/54726437/80525532-ea6c3280-8980-11ea-8f31-f13cf72825e3.png)
### Task Tracker page to create, delete and check off tasks.

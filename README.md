# Book Club App
This app centers around 3 central models. Users, Clubs, and Books.

## Users
An account may be created from the login landing page if a user doesn't already have one. Basic validations are run to make sure the requirements of a username, email, and password are met. A user has their own page from which they can access their associated books and clubs that they are a part of.

## Clubs
A club may be created from a user's My Clubs section. After a valid club is created, you can access it from that club's tile. A club also has its own page with its own books and settings page. From club settings, users may be added via username and have their adminship status changed or be removed from a club outright. Currently, the user that creates the club is set as the club owner and has special permissions that regular admins and users will not be able to use. 

## Books
Currently books are added to the backend database whenever a user adds a book to a collection or a book club. A collection is made up of all the books associated with a specific user or club. From a club's page or a user's page, you can access a form to add a book. A user may either manually add all the book details or search a book using the Google Books API which has been integrated into the app. If a search result contains a Title, Description, Author, and a valid Page Count, it will allow the user to add it to the current colleciton with a simple button. 

A book also gets its own page when it is added to the database.

## Book Wiki
A book wiki is the main feature of a book page. Basic details showing what book you are accessing are shown at the top of the page. A book wiki shows categories for Characters, Times, Events, Groups, Objects, Places, Quotes, Storylines, Themes, and Miscellaneous entries. Each category type has its own corresponding database model and details that are specific to it although there are shared qualities. A user may add, edit, or delete entries for a book's wiki. 
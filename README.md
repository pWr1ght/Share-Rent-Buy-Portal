# Share-Rent-Buy-Portal
Objective:

Our project is a web application which allows users to post items for rent/buy/sell. Users can post these items, browse and search and also contact the posting individuals.

software’s main features:

The software allows users to post items with pictures, price and description. Each item is associated with an address. When searching, the software asks for permission to obtain the user's location to enhance the search feature. User’s have the option to edit the items which they posted. The User is required to register before they can post items.

How to install/build, run, and use the software:

The app is built on NodeJS. The source code can be downloaded from Github at https://github.com/CS361-Team/Share-Rent-Buy-Portal/releases/tag/v0.2-alpha then simply run npm install. The app requires access to a database. SQL code necessary to create the database is included with the Github files. 

Project's quality attributes:

-Usability

-Credibility

-Reliability

An overview of software’s architecture and design:

The app uses a MySQL database, NodeJS server, and can be run in any modern web browser. 

High Level Architecture Diagram:

<img width="646" alt="Screen Shot 2020-06-03 at 6 22 47 PM" src="https://user-images.githubusercontent.com/44282168/83704618-71877880-a5c7-11ea-8205-af894b021c24.png">


UML component diagram:

<img width="824" alt="uml_diagram 05 PM" src="https://user-images.githubusercontent.com/44282168/83704527-29685600-a5c7-11ea-80bf-e8e1b84925b5.png">

This UML component diagram represents many key components, but does represent every component or connection. (Used Lucid Chart to make diagram) https://app.lucidchart.com/invitations/accept/dffdf357-853f-4cc5-a5ed-fcb0fc95368b sharable lucid chart link


What design pattern(s) the software users, and in what modules/components:

Command Design pattern - this pattern is implemented in every page with an extensive use of HTTP requests. The pattern encapsulates requests as objects allowing for parametrization of clients with different requests. The requests are processed by different entities which reply with their own parameterized objects.

The final state/condition of the software:
An overview of known bugs/issues

-Sometimes the database is not queried. This could be due to too many processes being queired on the database.

Root directory contains these core files and folders:

main.js - creates and runs the server

package.json - lists project info and required node packages

passport-config.js - configures authentication for users

.env - contains all passwords and API keys

modules - contains custom NodeJS modules 

node_modules

public - contains all front-end files and css or js code accessible by the web browser

routes - contains all javascript files for every web page

utilities - performs same function as modules folder

views - contains all html files for every page

How members of your team and (optionally) new developers can contribute to the project in the future:

The project will remain on Github within the CS361-Team organization. Any member of the organization may add to the project. The project is closed for contributions by anyone who is not part of the organization. 

Features that could be implemented in the future:

-Shopping Cart

-Instead of just contacting the user. There will be an option to place an order of Buy, Rent, Share. This would have a notification to email or text the phone.

-Change to a different database. Currently using MySql, but maybe use MongoDB. Possibly this might deal with the problems with the stalling of the queries.

(schedule subject to change)

<img width="450" alt="Screen Shot 2020-04-08 at 10 04 31 AM" src="https://user-images.githubusercontent.com/44282168/78812572-77266080-7980-11ea-96d1-51698747be1f.png">

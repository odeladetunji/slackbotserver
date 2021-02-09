# slackbotserver
A slack Bot Server

to clone this project use the following command

git clone http://github.com/odeladetunji/slackbotserver.git

the project has been deployed with digital ocean cloud servers.

# Note
the base base url for slackinteraction api component had to be 
supplied by me, slack sends a post request to this api whenever
a user uses an interactive component. i supplied slack a personal 
url (odeladetest). This means that running this application locally 
will note work for the interactive component of slack. However everything
has been deployed to digital oceans server by me.

# Initialization Locally
1. From the root directory run the following command:
npm i --save 
this should install all dependencies needed for application.

2. the application was built using postgres Database.
Attached to the root directory is a sql script called chats.sql.
From your postgres command prompt on the terminal, execute the query script.

3. the start command  is:
supervisor app.js
please ensure to execute it at the root directory of the project.

# Api Documentation
1. there is a file called slackbotapiTunji, this file contains the postman collection
of the project.

2. import it into postman.

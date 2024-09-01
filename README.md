
# Websocket Live CHat

## A live chat made using a Websocket server.

- In this program, users can communicate in the browser via text messages.
- They can also define a nickname that will be displayed to other participants.
- The project was developed using HTML, CSS, JavaScript and Websocket technology, which allows communication between the user's browser and the server.


# How does it work?

## Communication between the websocket server and the client browser:
* Communication occurs through two commands: "emit"(sending information) and "on"(action performed with the information).
* When the form is submitted, the client sends the text written by the user to the server.
* The websocket server receives the message and sends it back to the client, containing the ID of the user who wrote it.
* It compares whether the client ID that sent the message is the same as the user ID, and displays the message on the screen in diferent ways depending on the result.
* The server listens when a user connects or disconnects, and sends the information to the client, which displays it to other users in the form of a message.
* The client informs the server when a user changes their nickname, and the server sends the information back to be displayed to other users.

## JavaScript:
* All script of the page was done in JavaScript.
* The result of communication between the client and the server is displayed on the screen in HTML tags created with JavaScript.
* Jquery was used at times to speed up the development.

## HTML structure:
* The page starts with a "header", which contains the user ID on the left side. On the right side, there is an "input" for the user to set/change their nickname.
* In the center of the page there is a "ul"(unordered list), which stores and displays the messages sent by the server in "li" tags.
* At the bottom is the input that the user will use to write their messages, and to the left there is a button to send them.

## CSS style:
* Messages sent by the user are displayed on the right side of the page and are colored green.
* Messages sent by other users are displayed on the left side of the page and are colored white.
* Nicknames are displayed before the message, and are highlighted with an "h4" tag.
* CSS was developed using root variables to facilitate development and possible future changes.
* I used Media Queries to make the page content visible and usable on smaller windows and devices.


# Creator notes:
- I'm a beginner front-end developer. This was my first project using a server, so I know I've made a lot of mistakes in this area and in others. So I appreciate anyone who feels willing to point out these mistakes and give me suggestions on how I can fix them. Feel free to comment on my code and help me improve it.
Thank you for your contribution 💜. 

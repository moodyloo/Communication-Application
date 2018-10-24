-------------------------------------------------------------------------------
Team Blue Fox:
-------------------------------------------------------------------------------

Emmanuel Wondimu

Maten Rehimi

Thiruchelvan Senthilkumar

Shivesh Khetan

John Pham

Caoky Nguyen

Ming Xuan Wu

Antony Kimpton

Aakash Ranade

-------------------------------------------------------------------------------
How I suggest you setup you Atom:
-------------------------------------------------------------------------------
Install the babel language for atom: https://atom.io/packages/language-babel

Install a terminal of your choice.

Install ESLint for atom: https://atom.io/packages/eslint

-------------------------------------------------------------------------------
Notes on project Structure:
-------------------------------------------------------------------------------
Any file in the root is either a config file, or a global file
In addition to this, the initial server script is also in the root \@server.js
server.js is the main file and any edits should be discussed.

\_app is for our App for ios and Android

\_server is for our server

\_src is for the website

public contains static assets
build contains the final react site build

node_modules contains all install packages

-------------------------------------------------------------------------------
What to do when you pull
-------------------------------------------------------------------------------
Make sure to complete a 'npm install' to download all packages.
After you have completed that, run 'npm install --only=dev' for all dev dependencies

This will pull all you need for the Server and React site, to work on the app you must:
- Move into \_app\\App folder, and run both 'npm install' and 'npm install --only=dev'
This is because the app must have its own build configurations that don't work with react.

--------------------------------------------------------------------------------
Login details for mLab

username: bluefox2018
password: bluefoxrocks2018

---------------------------------------------------------------------------------
Heroku
---------------------------------------------------------------------------------

url: https://gentle-refuge-90119.herokuapp.com/
You need to install the heroku cli to be able to push to it
You must BUILD the reactjs project with 'npm build' so heroku can run the reactjs
You must BUILD the server project with 'npm run build' so heroku can run the Server
You must then push master to heroku with:
'git push heroku master' or 'git push heroku branch-name:master'

Login details are Antony's email + password. Ask him.

---------------------------------------------------------------------------------
Firebase Login Info
---------------------------------------------------------------------------------
kclcommunication@gmail.com\n
kclcommunication123

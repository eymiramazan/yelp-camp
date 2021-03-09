# YELPCAMP
This project is part of Colt Steele's The Web Developer Bootcamp 2021 on Udemy.

Live Server: https://mysterious-caverns-21487.herokuapp.com/

#### YelpCamp is a website where users can create and review campground, and can comment on campgrounds.

- User login is required to add campground and comment.
- Users can create, edit, and remove campgrounds. Users cannot edit or delete campground that they do not have.
- To add campground, you must enter a valid location. Later, this place will be marked on the map where the campground is located.

### Run Locally
Clone This Project: `git clone git@github.com:eymiramazan/yelp-camp.git`  
Open folder: `cd YelpCamp`  

- Change the name of the .envexample file to .env  
- Write the Cloudinary, MapBox, MongoDB Atlas keys in the appropriate places in the   .env file. If you run Mongod locally, you can leave DB_URL blank.

Install dependencies: `npm install`  
Run `mongod` in another terminal and,  
Run project with nodemon: `npm run dev`  

- The server will run at:  localhost:3000/  

### Seed Database
- Go to the website and register.  
- Open Mongo Shell.
```
    use yelp-camp
    db.users.find()
```
- Find your id and go to seeds/index.js and replace current id to your id.
- The corresponding id is on line 31.
`author: "YOUR_USER_ID",`

- And finally, run the seed index `node seeds/index.js`.
- If you run it as you download it, 10 campground will be added to the database.
- If you want to change the number of campgrounds, change the number 10 in line 26 to the number you want.
- Then run the application again. `npm run dev`





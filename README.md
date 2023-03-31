# Project Description

The General Assembly's final project was undoubtedly the most demanding task for me as it required me to develop a full-stack app independently. The project involved creating a customized version of TurboSquid, a platform for buying and selling 3D-related files for 3D artists. My goal was to experiment with the concept of uploading data to a server for indefinite storage and user download. The website allows users to register, as well as create and delete their own items.

Deployment link: https://oldfom.netlify.app/

## If you’d like to try the code locally.

### Front-End

1. Clone the front-end repository
1. Run - npm i
1. Add .env file (receive upon request) at the root of the repository
1. Run - npm run dev

### Back-End

1. Have PostgreSQL installed, running and using the default port 5432
1. Clone the back-end
1. Run - pipenv install
1. Add .env file (receive upon request) at the root of the repository
1. Run - pipenv run python seed.py
1. Run - pipenv run flask run
1. You can use the URL "http://127.0.0.1:4000/api" in your preferred API testing tool and to view the available endpoints check the "views" folder.

## Timeframe

Although we were given the option to work in teams, all of us, including myself, preferred to work independently. My decision to work solo was primarily driven by a desire to learn since in my previous project I only worked on the front end. I felt that for this project, I needed to gain experience with the back-end as well so that I could determine which area I enjoyed more, front-end or back-end development. Fortunately, we had a three-week time frame for the project, which was ample time for me to complete it on my own. If the time available had been shorter, I may have considered partnering with someone else.

## Technologies Used

### Back-End

1. Python
1. Flask
1. PostgreSQL
1. Insomnia

### Front-End

1. React
1. TypeScript
1. Material UI

## Project Brief

Build a full-stack application by making your own backend and your own front-end
Use a Python Flask API using a Flask REST Framework to serve your data from a Postgres database
Consume your API with a separate front-end built with React
Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut
Have a visually impressive design to kick your portfolio up a notch and have something to wow future clients & employers. ALLOW time for this.
Be deployed online so it's publicly accessible.

## Planning

Unlike my previous projects, I decided to begin by creating an entity relationship diagram (ERD) for the current project. This allowed me to visualise all the tables and their relationships, and also helped me determine the feasibility of the project and identify any potential challenges or complexities that I might face during development.

After finishing my ERD, I required a basic user interface (UI) for the front end so that I could conduct initial testing. To achieve this, I decided to use Excalidraw to design a rudimentary wireframe of the website.

Initially, my plan was to use Figma for designing the website. However, due to unforeseen circumstances, I contracted COVID and was ill for a week, which reduced the project timeline to just two weeks. As a result, I decided to use the wireframe from Excalidraw as the design for the website, instead of using Figma as originally planned.

Since I was working solo on the project, I felt that using Jira to manage it would be excessive. Therefore, I decided to use a simple Gantt chart to keep track of my progress within the project.

## Coding Process

# Backend

### Models and Seeding

To simplify the backend development process and minimise errors, I found it helpful to break it down into separate steps. First, I utilised an ERD tool to determine all tables and their relationships, which I then used to create the necessary models using Flask-SQLAlchemy. To ensure the models were functioning correctly, I seeded them into PostgreSQL. This stage did not require serializers or controllers, which helped reduce the number of files I needed to work with. This approach was particularly useful as errors from Flask-SQLAlchemy can be complex and difficult to understand, so minimising the number of files helped simplify the debugging process.
Knowing which tables needed to be created first in the database was crucial for me because I was dealing with interdependent relationships between tables that required their existence.

### Serializers and Controllers

Subsequently, a Serializer/Deserializer was developed to enable the reception and posting of data in the accurate format utilising marshmallow-sqlalchemy. I created distinct serializers for varying scenarios where certain pages only required specific data. As an illustration, the basket schema depicted below included a nested product schema containing a simplified version of the product. This approach facilitated faster loading times when fetching the basket, and eliminated the need to load the complete product information.

Subsequently, controllers were developed to implement various operations such as creating, reading, updating, and deleting (CRUD), which were also used to test the serializers.

### User Model

The password encryption and Json Web Token (JWT) functions reside in the user model. During user registration, the passwords are first hashed and then saved in PostgreSQL using the Bcrypt library.
In order to uniquely identify users, a set of strings (header, payload, and signature) is created using a Json Web Token (JWT) library.

### Middleware/Decorator

To enable user login, authentication, and authorization, a middleware/decorator was created to verify the user's login status. This is accomplished by validating whether the Json Web Token (JWT) is valid, expired, or present in the header. This information is subsequently utilised by many controllers that require knowledge of the user's login status in order to provide information.

# Frontend

### Assets page

Within this component, I fetched the products from my API to display them on the website.

### Create product

This component is tasked with submitting a product that a user has created. It provides the required fields to create a product. Once all fields are completed, the component employs axios to utilise a post method to upload the data to the database.

### Delete Product

Within this component, there is a table that displays items the user has created. The user can select specific items, which are subsequently stored in an array by their ID. This array is then passed to an axios delete method, which asynchronously deletes the selected items from the database.

## Challenges

### Cloudinary

During the final stages of the project, I dedicated three days to understanding how to utilise Cloudinary's API to display images on my website. However, I struggled with comprehending the API's functionality despite my efforts to implement it. As an alternative, I opted to utilise Cloudinary's upload widget to store the images. While this widget provided a temporary solution, it is not without its issues, which I need to address.

### SQLAlchemy 

At the start of the project, I focused on developing my models, controllers, and serializers. However, when I installed a package that updated all my dependencies to their latest versions, it resulted in the app breaking down entirely. I struggled with this issue for two days, as I was unsure what caused it. I collaborated with my instructor to resolve the issue. It transpired that the problem was due to all packages in the pipfile being set to "*" which did not specify any specific version to use. As a result, when sqlalchemy released a minor update, the entire app crashed. Going forward, I will ensure that I tag all package versions to avoid similar issues.

### Relationships

As this project was more ambitious than previous ones, I implemented complex relationships between tables. Although we briefly discussed many-to-many and many-to-one exercises, they were not indicative of how these relationships are used in real-world scenarios. Therefore, I had to undertake extensive research on my own. I encountered difficulties in understanding one-to-many relationships, which caused a delay in the project's progress. Nevertheless, I can now confidently assert that I appreciate the power of these relationships when building a database.

### Serializers

While working on this project, I encountered the topic of serializers for the first time. In previous projects that utilised MongoDB, Mongoose library handled the serialisation/deserialization of data. However, in a Flask app, we relied on the marshmallow-sqlalchemy library. I found the concept of nesting within the schema to be particularly challenging and confusing. Nonetheless, the effort and time invested in understanding serializers proved to be worthwhile, as I now have a solid grasp of their mechanics and usefulness.

## Wins

### Cloudinary
To add images to my database, I opted for an upload widget from Cloudinary. This widget allows users to drag and drop image files into it. The widget also generates a result object to indicate the success or failure of the upload and provides a URL for accessing the uploaded images. Using these URLs, I assemble an array and pass it to the Create Product component as a prop, which appends it to the form data required to post the item to the database.

### Table selection

I implemented a table to display the items created by the user, with the functionality to select and deselect items for deletion. At first, the selection process appeared straightforward, but it turned out to be more complicated than anticipated. In order to manage the selection and deselection of items, it was necessary to keep track of each item's ID which is done with 2 functions one called handleSelectAll which selects and deselects the items from the table, and the handleSelectRow function that finds individually selected rows and add them into the state. These IDs are then used in an axios delete method to remove the selected items from the table.

### Functional Backend

As a personal MVP, I aimed to create a fully functional backend for this project, and I successfully developed all the necessary models, relationships, and endpoints to enable an interactive website.

## Key Learnings/ Takeaways

### Flask

After completing this project, I have gained more confidence in creating Flask apps. I now have a better understanding of the necessary structure and components needed for a Flask app to function properly. In my opinion, Flask is an easy and straightforward framework to work with. Additionally, I was able to apply my previous knowledge of MVC to create a more logical file system.

### Python

I was excited when I found out that we would be using Python for the project, as it was the first programming language I had ever learned. Since I was already familiar with Python's syntax, I did not face any difficulties in using the language. However, as the project progressed, I further explored the language and learned new concepts such as args, kwargs, and decorators. This enabled me to gain a deeper understanding of Python and enhance my skills.

### PostgreSQL

As someone who is new to relational databases, I have found PostgreSQL to be much more powerful than non-relational databases like MongoDB. In my opinion, PostgreSQL is much easier to comprehend, manage, and query.

### Independence

The main takeaway from this project, in my opinion, was the opportunity to work independently. This experience has allowed me to further develop important skills such as independence, responsibility, and time management. In addition, I have gained a deeper understanding of how the entire full stack developer pipeline works.

## Bugs

1. Upload image doesn’t refresh object used for sending data to back end
1. Upload image posts image to cloudinary straight away (unintended)
1. When logged in and refreshing the page login and register button will appear for a short second
1. CORS problem when trying to access data from fly.io API


## Future Improvements

1. Finish shopping basket in front-end
1. Better layout
1. Fully responsive
1. Update product
1. Add different roles
1. Upload 3D objects and being able to download
1. Single page with the user that created the item
1. Comments

# Social Network API
## Table of Contents
- [Description](#description)
- [Installation]( #installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions) 
##  Description
- The Social Network API was developed by [Inna Fedorenko](https://github.com/InnaFedorenko).
- [GiHub Link](https://github.com/InnaFedorenko/social_network_API_if)
- [Video recording](https://drive.google.com/file/d/1OojVeAW7s3qhO6Qy-RZbVi5GNFybLiLp/view)
- Date: 07-31-2023

### API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. You’ll use Express.js for routing, a MongoDB database, and the Mongoose ODM. 

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```


##  Installation
`npm install` command to install the following dependencies:
```md
    "dependencies": {
      "express": "^4.17.1",
      "mongoose": "^7.0.2"
    },
    "devDependencies": {
      "nodemon": "^2.0.9"
    }
```


##  Usage
1. open terminal in the project folder
2. to seed test data run `npm run seed`
3. to start api run `npm run start`
4. to debug project on dev server run `npm run dev`
4. open routers in [insomnia](Documentation/Insomnia_SN_API.json) and run a request


## License
![License](https://img.shields.io/badge/License-MIT-yellow.svg)  
  This application is covered under the [MIT License](https://opensource.org/licenses/MIT).
##  Contributing
Any contributors are welcome.
##  Tests
Tests are not implemented 

##  Questions
If you have any questions, you can reach out to [me](https://github.com/InnaFedorenko) at 
[ivf.fedorenko@gmail.com](mailto:ivf.fedorenko@gmail.com).
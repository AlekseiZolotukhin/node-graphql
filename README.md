Here is example of how to work with GraphQL and NodeJS. As data store we use MySQL. For frontend we use simple mini vue app for create tasks list. Index file placed inside ./public folder and of course it calling index.html.   
For work with MySQL we use Sequelize package. So here you can find also examples how to make requests with sequelize.   
For first please provide correct database connect information inside file ./utils/database.js  
Two files you need for work with GraphQL placed inside ./graphql.   
shcema.js - here described scheme for GraphQL  
resolver.js - here we have functions which return response for query  

For example you want to make next GraphQL request:    
``` 
// GraphQL request
query { 
    testRequest 
}
```  
So for this inside file schema.js you create next schema:  
``` javascript
// use buildSchema from "graphql" package
const {buildSchema} = require('graphql');

module.exports = buildSchema (`
    type Query { 
        testRequest: String!
    }
`;
```

Inside resolver.js we add next code:
```javascript
module.exports = {
    // just our test resolver function
    testRequest() {
        return 'This your first GraphQL response.'
    }
}
```

More examples you will find inside file itself.
 
 

const {buildSchema} = require('graphql');

// ! symbol mean required field
module.exports = buildSchema (`
    type Pupil {
      name: String!
      campus: String!
      age: Int!
    }
    
    type CustomType {
       count: Int!
       pupils: [Pupil!]!    
    }

    input UserInput {
      name: String!
      age: Int!
    }
    
    type Tasks {
        id: ID!
        name: String!
        completed: Boolean!
        createdAt: String,
        updatedAt: String
    }
    
    type Query {
      testRequest: String!,
      pupils: CustomType!,
      random(min: Int!, max: Int!, count: Int!): [Float!]!,
      getTasks: [Tasks!]!
    }
    
    input TaskInput {
       name: String!
    }
    
    type Mutation {
        addPupil(pupil: UserInput!): Pupil!
        addTask(task: TaskInput!): Tasks!
        completeTask(id: ID!): Tasks!
        removeTask(id: ID!): Boolean!
    }
`);
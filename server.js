const express = require('express');
const expressGraphQLAdaptor = require('express-graphql').graphqlHTTP;
const schema = require('./schemas/schema');

const app = express();

app.use('/graphql', expressGraphQLAdaptor({
    schema,
    graphiql: true
}));

app.listen(4000, ()=> {
    console.log("Listening at port 4000");
})

Agenda Points:
Modernization Update

Status update on M365 modules modernization: Migration from React 16 to React 18 successfully completed.
Brief overview of challenges faced and any pending tasks.
Mobile Testing Discussion

Evaluate the feasibility of initiating mobile testing.
If possible, commence testing during the meeting.
Resource Constraints for Mobile/Tablet Testing

Highlight the unavailability of mobile or tablet devices for testing.
Discuss potential impacts on testing timelines and project progress.
Explore options for obtaining necessary devices or alternative solutions.
Action Items and Next Steps

Assign tasks and deadlines based on discussion outcomes.
Expected Outcomes:
Finalize plan for mobile testing.
Identify solutions for device unavailability and minimize impact on testing progress.
Align team on post-modernization tasks.

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

Subject: Request for Meeting to Discuss Mobile Testing Timeline for M35 App

Dear [Management/Client Managers],

I hope you are doing well.

I am writing to request a meeting to discuss and plan the mobile testing phase for the M35 application. Here are the key points I would like to address during the meeting:

Timeline for Mobile Testing: We need to determine when we can begin testing the app on mobile devices to identify potential issues and ensure a smooth user experience.

Device Availability: As we currently do not have access to hard devices (smartphones or tablets) within the team, we are dependent on individuals who have access to such devices. This reliance introduces an additional layer of dependency in the testing process.

Testing Duration: Depending on third-party involvement for testing and sharing results could potentially extend the testing timeline, especially as we are all engaged in other activities and priorities.

Given these constraints, I believe it is important to align on a clear plan to manage the testing phase effectively and minimize delays. Please let me know your availability for a meeting, and I will schedule it at a time convenient for everyone.

Your insights and support will be crucial in ensuring the successful and timely completion of mobile testing for the M35 app.

Looking forward to your response.

Best regards,
[Your Full Name]
[Your Position]
[Your Contact Information]


Agenda Items:
Introduction and Purpose (5 minutes)

Overview of the M35 app's mobile testing requirements.
Highlight the importance of testing on hard devices to ensure real-world performance validation.
Timeline for Mobile Testing (10 minutes)

Determine a start date for the testing phase.
Discuss milestones and deadlines to maintain project momentum.
Device Availability and Dependencies (10 minutes)

Address the lack of in-house devices for testing.
Identify individuals or resources with access to suitable testing devices.
Explore potential options for securing devices if needed.
Impact of Third-Party Testing (10 minutes)

Discuss the risks of relying on third-party individuals for testing and sharing results.
Assess how this dependency could impact the overall testing duration.
Action Plan and Next Steps (10 minutes)

Establish responsibilities and roles for mobile testing.
Outline the next steps to begin the testing process.
Q&A and Feedback (5 minutes)

Open floor for questions, suggestions, and additional concerns.


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


    // debug-nx.js
const fs = require('fs');
const path = require('path');

function findDependencyReferences(startPath, searchStr) {
    if (!fs.existsSync(startPath)) {
        console.log("Directory not found:", startPath);
        return;
    }

    const files = fs.readdirSync(startPath);
    for (const file of files) {
        const filename = path.join(startPath, file);
        const stat = fs.lstatSync(filename);

        if (stat.isDirectory() && !filename.includes('node_modules')) {
            findDependencyReferences(filename, searchStr);
        } else if (filename.endsWith('.json') || filename.endsWith('.js')) {
            try {
                const content = fs.readFileSync(filename, 'utf8');
                if (content.includes(searchStr)) {
                    console.log('Found reference in:', filename);
                    // If it's a JSON file, try to parse and show relevant section
                    if (filename.endsWith('.json')) {
                        try {
                            const json = JSON.parse(content);
                            console.log('Relevant config:', JSON.stringify(json.dependencies || json.devDependencies || {}, null, 2));
                        } catch (e) {
                            console.log('Could not parse JSON');
                        }
                    }
                }
            } catch (e) {
                console.log('Error reading file:', filename);
            }
        }
    }
}

// Start search from current directory
findDependencyReferences('.', 'm365-monorepo’);

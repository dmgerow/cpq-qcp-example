# CPQ QCP Example

This repository contains a sample scratch org configuration with a QCP that demonstrates how QCPs and PSPs can be used.

If you are working with a scratch org, please see the scratch org installation section to set up the project.

If you are working with a developer sandbox, you can follow the org installation instructions instead.

This repository has sample code that can be used to show

- Page security plugins (showing, hiding and making fields read only)
- All of the quote calculation evaluation eventsQuote/Quote Line models, the data in them, and how to debug quote pricing with them
- Performing a callout to an Apex REST service to incorporate apex code into your calculation sequence (necessary if you ever want to perform callouts to external endpoints during a calculation) with test code
- Storing the results of these callouts in the quote/quote lines

## Org Installation

1. Make sure that the calculation service is authorized in package settings
2. Copy the `qcp-example.ts` file into a custom script or configure the VS Code extension to push it (steps)
3. Enable the custom script as the quote calculator plugin in package settings

## Scratch Org Installation

1. First, make sure that all of the npm modules are installed with `npm install`

2. Make a scratch org with CPQ installed with `npm run create:scratch`. This will:

   - Create the scratch org
   - Install CPQ
   - Import data
   - Generate a password for you

3. Authorize the calculation service in the CPQ package settings

4. Authorize the VS Code QCP extension via the command pallete with `SFDC QCP: Initialize Project`

5. Push your QCP to your org via the command pallete with `SFDC QCP: Push QCP files to Salesforce`

6. Enable the custom script as the quote calculator plugin in package settings

7. Open your scratch org and you will find that there is already a quote created for you to use.

## Troubleshooting

If you change orgs or scratch orgs with the same project, you will likely get an error when saving your QCP stating that it does not exist in the org. This is because the ID of the QCP in the `.qcp` folder no longer exists. If this happens, delete the `.qcp` folder and re-initialize the project. You should then be able to push your QCP.

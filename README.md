# CPQ QCP Example

This repository contains a sample scratch org configuration with a QCP that demonstrates how QCPs and PSPs can be used.

If you are working with a scratch org, please see the scratch org installation section to set up the project.

If you are working with a developer sandbox, you can follow the org installation instructions instead.

## Org Installation

1. Make sure that the calculation service is authorized in package settings
2. Copy the `qcp-example.ts` file into a custom script or configure the VS Code extension to push it (steps)
3. Enable the custom script as the quote calculator plugin in package settings

## Scratch Org Installation

1. First, make sure that all of the npm modules are installed with `npm install`

2. Make a scratch org with CPQ installed with `npm run crate:scratch`. This will:

   - Create the scratch org
   - Install CPQ
   - Import data
   - Generate a password for you

3. Authorize the calculation service in the CPQ package settings

4. Authorize the VS Code QCP extension via the command pallete with `SFDC CPQ: Initialize Project`

5. Push your QCP to your org via the command pallete with `SFDC CPQ: Push QCP files to Salesforce`

# CPQ QCP Example

This repository contains a sample scratch org configuration with a QCP that demonstrates how QCPs and PCPs can be used.

## Org Installation Notes

1. Make sure that the calculation service is authorized in package settings
2. Copy the qcp-example.ts file into a custom script or configure the VS Code extension to push it (see Scratch Org Notes)
3. Enable the custom script as the quote calculator plugin in package settings

## Implementation Considerations

-

## Scratch Org Notes

You can make a scratch org with CPQ installed using the following command:

```bash
npm run crate:scratch
```

This will:

1. Create the scratch org
2. Install CPQ
3. Import data
4. Generate a password for you

This will print out your scratch org password. Use this to authorize the VS Code QCP extension.

After this, make sure that you authorize the calculator service before pushing the sample QCPs or else the transpiler service will fail.

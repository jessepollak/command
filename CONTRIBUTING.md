# Contributing

Welcome! We're so excited to have you, no matter who you are. To make sure we're creating a safe space for everyone, please check out our [Code of Conduct](CODE_OF_CONDUCT.md).

## Getting setup

Install the necessary node modules and start the development server.

```bash
$ npm install
$ npm run dev
```

Add the development build of the extension to your browser.

1. Navigate to `chrome://extensions/` in Chrome
2. Check *Developer Mode*
3. Click on *Load unpacked extension*
4. Add `command/build`

Now, navigate to any page and open up your JS console. If there is an SSL error, right click the `localhost` link with the SSL error, open in a new tab, then confirm that you'd like to proceed. This happens because we used a self-signed SSL certificate to serve assets in development

## Creating a command

Creating a new `command` is easy. It requires creating a new command in the `commands` folder. To demonstrate how this works, let's implement a simple command that opens a new tab to `google.com`.

### Creating the command file

The first thing we need to do is create a new command folder. For the new `/google` command we are trying to create, let's add a new folder at `src/commands/Google` and a new file in that folder called `src/commands/Google/Google.js`. Now, let's make that file export the necessary API to implement a command.

```javascript
// src/commands/Google/Google.js

import * as types from 'types'

export let match = "google"
export let icon = require("./Google.png")
export let mount = (field, onDone) => {
    return onDone(new types.Redirect({
        url: 'https://google.com',
        target: '_blank'
    })
}
```

Now that we have our file created, let's walk through what exactly we've exported in this module.

* `match` - this is the name of the command that a user must type to activate it. So, for this command, a user has to type `/google` in order to activate the `Google` command.
* `icon` - this is a `required` icon in PNG form that will be used in the quick-select dropdown when a user starts typing a command.
* `mount` - this is a function which will be called when the command is selected. It is called with two arguments:
    * `field` - this is a reference to a `Field` object where the user actually typed the command. For the most part, you won't need to do anything with this: we've created a bunch of easy return `types` that will let you accomplish almost anything without touching the field in question.
    * `onDone` - this is the callback the command should call when it's done completing its desired action. This `onDone` function can be optionally called with a `type` object that declares a generic result that should either be applied to the field or happen in the browser. To learn more about the different types available, check out the source at [src/types/](src/types).
    * `onInsert` - this is a callback that can be used to insert before we call `onDone`. Like `onDone`, this should be called with a `type` object that declares a generic result to be applied to the field or happen in the browser. To learn more about the different types available, check out the source at [src/types/](src/types).

### Enabling the command

Once you've created the folder and exported the required exports, there's nothing else to do! The command should now automatically be loaded into your browser.


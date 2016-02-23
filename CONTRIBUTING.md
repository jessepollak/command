# Contributing

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

## Creating an command

Currently, the command model is built around the idea of [reusable React components](https://facebook.github.io/react/docs/reusable-components.html). To create a new command, you export a new React component in the `src/components/commands/` folder and import it in `src/components/commands/index.js`.

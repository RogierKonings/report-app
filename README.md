# ReportApp

Techstack:
- `Angular v16`
- `RxJs`
- `Typescript`
- `Jest`
- `Ionic`
- `Capacitor`

Libraries:
- `xml2js` is used to parse the XML files. For backwards compatibility because of CommonJS modules in this library
- `stream-browserify` and `timers-browserify` are used and the module is mentioned in angular.json as the allowedCommonJsDependency
- `iban` is used to change IBAN numbers for validity

Run `npm i -g yarn` to install yarn globally

Run `yarn run start` to run the application for local development

Run `yarn run test` to run the unit-tests

Run `yarn run lint` to run eslint

Run `yarn release` to make a release package

The application uses a pre-commit hook with linting with `Husky`

For the tests, I implemented `Jest` instead of the default Jasmine/Karma because this is an outdated technology

`Prettier` is also used for code style checking and aligned so that it does not collide with `eslint` rules. It is not enforced through any hooks but can easily be added if deemed necessary.

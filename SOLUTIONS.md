1. `Express` server was not intialized as app in `index.js`
2. Event Controller `findOne` query filters syntax fix
3. `Events` was exporting schema instead of model
4. Event routes was not bind to main express router in `index.js`
5. Invalid routes called in `routes/events.js`
6. Invalid methods called in controller `see` and `make` both are replaced with `find` and `constructor` (we can modify the schema in order to create custom methods)
7. mongoose connection string was missing it is added
8. fixed events controllers
9. user id added in events schema for references
10. mocha test configuration added and code coverage report enabled
11. execute `npm run test` to execute unit tests
12. test coverage report will be generated.

// const contentful = require('contentful');
// // use default environment config for convenience
// // these will be set via `env` property in nuxt.config.js
// const config = {
//   space: 'oet8rv1vvj34',
//   accessToken: 'EeMoRJQi0QB6ebLzpEEmCQ9gVHcUs0KF0VDqlM-O-bQ',
// };
//
// // export `createClient` to use it in page components
// module.exports = {
//   createClient() {
//     return contentful.createClient(config);
//   },
// };

// eslint-disable-next-line
const contentful = require('contentful')

module.exports = contentful.createClient({
  space: 'oet8rv1vvj34',
  accessToken: 'EeMoRJQi0QB6ebLzpEEmCQ9gVHcUs0KF0VDqlM-O-bQ',
})

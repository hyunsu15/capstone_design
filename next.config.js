require('dotenv').config();
module.exports = {
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    KIND_HOMEPAGE: process.env.KIND_HOMEPAGE,
    FRANCHISE_HOMEPAGE: process.env.FRANCHISE_HOMEPAGE,
  },
};

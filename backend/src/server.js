require('dotenv').config();
const app = require("./app");

const PORT = process.env.PORT

app.listen(PORT || 4000, () => {
    console.log("It's working!!!!")
});

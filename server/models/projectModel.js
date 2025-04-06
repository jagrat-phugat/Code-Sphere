const mongo = require("mongoose")

const projectSchema = new mongo.Schema ({
    title : {
        type : String
    },
    createdBy : String,
    date : {
        type : Date,
        default:Date.now
    },
    htmlCode : {
        type:String,
        default : `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Online Code IDE</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`
    },
    cssCode : {
        type : String,
        default: `body {
        margin:0;
        padding:0;
         }`
    },
    jsCode : {
        type:String,
        default : `console.log("Hello World")`
    }
});

module.exports = mongo.model("projectSchema", projectSchema)




const hapi = require("hapi");
const mongoose = require("mongoose");
const { graphqlHapi, graphiqlHapi } = require("apollo-server-hapi");
const schema = require("./graphql/schema");
const Painting = require("./models/Painting");

/*SWAGGER SECTION*/

const Inert = require("inert");
const Vision = require("vision");
const HapiSwagger = require("Hapi-swagger");
const Pack = require("./package");

///////

const server = hapi.server({
  port: 4000,
  host: "localhost"
});

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0-huzkm.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

mongoose.connection.once("open", () => {
  console.log("Connect");
});

const init = async () => {
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: "Documentation from API....",
          version: Pack.version
        }
      }
    }
  ]);

  await server.register({
    plugin: graphiqlHapi,
    options: {
      path: "/graphiql",
      graphiqlOptions: {
        endpointURL: "/graphql"
      },
      route: {
        cors: true
      }
    }
  });
  await server.register({
    plugin: graphqlHapi,
    options: {
      path: "/graphql",
      graphqlOptions: {
        schema
      },
      route: {
        cors: true
      }
    }
  });

  server.route([
    {
      method: "GET",
      path: "/",
      handler: function(request, reply) {
        return "<h1> MY API_POWERFUL </h1>";
      }
    },
    {
      method: "GET",
      path: "/api/v1/paintings",
      config: {
        description: "ALL",
        tags: ["api", "v1", "paintgin"]
      },
      handler: (req, reply) => {
        return Painting.find();
      }
    },
    {
      method: "POST",
      path: "/api/v1/paintings",
      handler: (req, reply) => {
        const { name, url, techniques } = req.payload;
        const painting = new Painting({
          name,
          url,
          techniques
        });

        return painting.save();
      }
    }
  ]);

  await server.start();
  console.log(`Server Running at:${server.info.uri}`);
};

init();

const graphql = require("graphql");
const Painting = require("./../models/Painting");
const PaintingType = require("./PaintingType");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    painting: {
      type: PaintingType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        return Painting.findById(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});

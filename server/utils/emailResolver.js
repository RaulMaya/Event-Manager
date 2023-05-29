const { GraphQLScalarType, Kind } = require('graphql');

const emailResolver = new GraphQLScalarType({
  name: 'Email',
  description: 'Email custom scalar type',
  parseValue(value) {
    // Validate and parse the email value from the input variables (e.g., from client)
    if (!validateEmail(value)) {
      throw new Error('Invalid email');
    }
    return value;
  },
  serialize(value) {
    // Convert the email value to a serialized form (e.g., for sending to client)
    return value;
  },
  parseLiteral(ast) {
    // Validate and parse the email value from the query literal
    if (ast.kind !== Kind.STRING || !validateEmail(ast.value)) {
      throw new Error('Invalid email');
    }
    return ast.value;
  },
});

// Helper function to validate email format
function validateEmail(email) {
  // Implement your email validation logic here
  // This is a basic example, you can use a library or a regex pattern for more robust validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = {
  Email: emailResolver,
};
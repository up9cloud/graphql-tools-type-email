import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'
import { GraphQLError } from 'graphql/error'
import isEmail from 'validator/lib/isEmail'

export default new GraphQLScalarType({
  name: 'Email',
  description: `Email scalar type for [graphql-tools](https://github.com/apollographql/graphql-tools)`,
  serialize (value) {
    if (typeof value !== 'string') {
      return null
    }
    if (isEmail(value)) {
      return value
    }
    return null
  },
  parseValue (value) {
    if (typeof value !== 'string') {
      throw new GraphQLError('', [])
    }
    if (isEmail(value)) {
      return value
    }
    throw new GraphQLError('', [])
  },
  parseLiteral (ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Type should be "String", found ${ast.kind}.`, [ast])
    }
    if (isEmail(ast.value)) {
      return ast.value
    }
    throw new GraphQLError(`Invalid Email literal.\n${ast.value} is not Email.`, [ast])
  }
})

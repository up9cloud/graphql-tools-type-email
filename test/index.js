import { expect } from 'chai'
import { graphql } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'

import Email from '../src'

// we trust validator/lib/isEmail, so only check basic emails
const whiteList = [
  'john.smith@example.com',
  'JSmith@example.com',
  'john.smith@eXample.cOm'
]
const blackList = [
  123,
  12.3,
  [],
  {},
  '',
  'a',
  'a@a'
]

let typeDefs = [`
scalar Email
type Query {
  value(email: Email): Email
}`
]
let resolvers = {
  Email,
  Query: {
    value: (root, { email }) => email
  }
}
let schema = makeExecutableSchema({ typeDefs, resolvers })

describe('Email', () => {
  describe('serialize', () => {
    it('valid value should pass', () => {
      for (let email of whiteList) {
        expect(Email.serialize(email)).to.be.equal(email)
      }
    })
    it('invalid value should return null', () => {
      for (let email of blackList) {
        expect(Email.serialize(email)).to.be.equal(null)
      }
    })
  })

  describe('parseValue', () => {
    it('valid value should pass', async () => {
      for (let email of whiteList) {
        let { data } = await graphql(
          schema,
          `query { value(email: ${JSON.stringify(email)}) }`
        )
        expect(data.value).to.be.equal(email)
      }
    })
    it('invalid value should return errors', async () => {
      for (let email of blackList) {
        let data = await graphql(
          schema,
          `query { value(email: ${JSON.stringify(email)}) }`
        )
        expect(data.data).to.be.equal(undefined)
        // expect(data.data.value).to.be.equal(undefined)
        expect(data.errors).to.be.an('array')
      }
    })
  })

  describe('parseLiteral', () => {
    it('valid value should pass', async () => {
      for (let email of whiteList) {
        let { data } = await graphql(
          schema,
          `query ($email: Email) {
            value(email: $email)
          }`,
          null,
          null,
          { email }
        )
        expect(data.value).to.be.equal(email)
      }
    })
    it('invalid value should return errors', async () => {
      for (let email of blackList) {
        let data = await graphql(
          schema,
          `query ($email: Email) {
            value(email: $email)
          }`,
          null,
          null,
          { email }
        )
        expect(data.data).to.be.equal(undefined)
        // expect(data.data.value).to.be.equal(undefined)
        expect(data.errors).to.be.an('array')
      }
    })
  })
})

# graphql-tools-type-email

[![Build Status](https://travis-ci.org/up9cloud/graphql-tools-type-email.svg?branch=master)](https://travis-ci.org/up9cloud/graphql-tools-type-email)
[![Coverage Status](https://coveralls.io/repos/github/up9cloud/graphql-tools-type-email/badge.svg?branch=master)](https://coveralls.io/github/up9cloud/graphql-tools-type-email?branch=master)

Email scalar type for [graphql-tools](https://github.com/apollographql/graphql-tools)

## Usage

```js
import { makeExecutableSchema } from 'graphql-tools'
import email from 'graphql-tools-type-email'

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

export default schema
```

## Minimum amount of module files

```console
$ tree ./node_modules/graphql-tools-type-email
./node_modules/graphql-tools-type-email
├── README.md
├── dist
│   └── index.js
└── package.json

1 directory, 3 files
```

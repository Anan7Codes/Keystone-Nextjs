const dotenv = require('dotenv').config()
const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const PROJECT_NAME = 'tryingoutkeystone';
const adapterConfig = { mongoUri: process.env.MONGO_URI };
const UserSchema = require('./schemas/KeystoneUser')
const BookSchema = require('./schemas/Book')


const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  cookieSecret: process.env.COOKIE_SECRET,
});

const isAdmin = ({ authentication: { item: user }}) => !!user && !!user.isAdmin;
const isLoggedIn = ({ authentication: { item: user }}) => !!user;
const isOwner = ({ authentication: { item: user }}) => {
  if(!user) {
    return false
  }

  return { id: user.id}
};

const isAdminOrOwner = auth => {
  const isAdmin = access.isAdmin(auth)
  const isOwner = access.isOwner(auth)
  return isAdmin ? isAdmin : isOwner;
}

const access = { isAdmin, isLoggedIn, isOwner, isAdminOrOwner };

keystone.createList('KeystoneUser', {
  fields: UserSchema.fields,
  access: {
    read: access.isAdmin,
    create: access.isAdmin,
    update: access.isAdminOrOwner,
    delete: access.isAdmin,
    auth: true
  },
  labelField: 'username'
})

keystone.createList('Book',{
  fields: BookSchema.fields,
  access: {
    read: true,
    create: access.isLoggedIn,
    update: access.isAdminOrOwner,
    delete: access.isAdmin,
    auth: true
  }
})

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'KeystoneUser',
  config: {
    identityField: 'username',
    secretField: 'password'
  }
})

module.exports = {
  keystone,
  apps: [new GraphQLApp(), new AdminUIApp({ name: PROJECT_NAME, enableDefaultRoute: true, authStrategy, isAccessAllowed: isAdmin })],
};

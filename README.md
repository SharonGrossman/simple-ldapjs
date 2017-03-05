# simple-ldapjs

## Installation
``` bash
$ [sudo] npm install simple-ldapjs --save
```
## Usage
### Example
```
// optional environment variables
$ LDAP_USER=ldap_user
$ LDAP_PASSWORD=ldap_user_password
$ LDAP_URL=ldap://dns.net
$ LDAP_OU=OU=Example

import ldap from 'simple-ldapjs';

// Look for a user with a certain principle like email
User.findOne(principle)
  .then(user => {
    return user || ldap({
      principal: 'example@domain.net',
      ou: 'OU=example',
      url: 'ldap://dns.net',
      user: 'ldap_user', 
      password: 'ldap_password'
      })
      .then(foundUser => {
         // foundUser is the matching AD user of the principle
        ...
      });
  });
```
## License

[MIT](LICENSE)

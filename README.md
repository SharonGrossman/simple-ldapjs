# simple-ldapjs

## Installation
``` bash
$ [sudo] npm install simple-ldapjs --save
```
## Usage
```
import ldap from 'simple-ldapjs';

// Look for a user with a certain principle like email
User.findOne(principle)
  .then(user => {
    return user || ldap(principle)
      .then(foundUser => {
        // foundUser is the matching AD user of the principle
        ...
      });
  });
```
## License

[MIT](LICENSE)

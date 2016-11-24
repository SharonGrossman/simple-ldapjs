import ldapjs from 'ldapjs';
import pify from 'pify';
import SimpleLdapError from './simple-ldap-error';

export default pify(({principal = {}, url = process.env.LDAP_URL, user = process.env.LDAP_USER, password = process.env.LDAP_PASSWORD, ou = process.env.LDAP_OU}) => {
  if (!url || !user || !password || !ou) {
    throw new SimpleLdapError('Simple LDAP failed at initializing the required parameters');
  }

  const client = ldapjs.createClient({url});

  return new Promise(resolve => {
    client.bind(user, password, err => {
      if (err) {
        throw new SimpleLdapError('Simple LDAP failed at binding to the user and password', err);
      }

      client.search(ou, {
        filter: `userPrincipalName=${principal}`,
        scope: 'sub'
      }, (err, res) => {
        if (err) {
          throw new SimpleLdapError('Simple LDAP failed at searching and finding the user', err);
        }

        let found;

        res.once('searchEntry', entry => {
          found = entry.object;
          found._fullEntry = entry;
        });

        res.on('end', res => {
          client.unbind(err => {
            if (err) {
              throw new SimpleLdapError('Simple LDAP failed at unbinding the client', err);
            }

            if (res.status !== 0) {
              throw new SimpleLdapError(`Simple LDAP failed with status code ${res.status}`);
            }

            return resolve(found);
          });
        });
      });
    });
  });
});
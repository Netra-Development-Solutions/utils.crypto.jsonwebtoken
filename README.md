# utils.crypto.jsonwebtoken
### @netra-development-solutions/utils.crypto.jsonwebtoken

A Node.js utility for strong cryptography, offering AES-256 encryption, HMAC verification, and secure random number generation.


![Logo](https://avatars.githubusercontent.com/u/125114515?s=200&v=4)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`JWT_ALGORITHM`

`ENCRYPTION_ALGORITHM`

`JWT_TOKEN_SECRET`

`AES_GCM_ENCRYPTION_KEY`

`AES_GCM_ENCRYPTION_IV`

> **NOTE:**  Values for `JWT_ALGORITHM` v1.0.0 are limited to  ['HS256', 'HS384', 'HS512'] 

> **NOTE:** Values for `ENCRYPTION_ALGORITHM` v1.0.0 are limited to ['aes-256-gcm']
## Usage/Examples

```javascript
const jwt = require('@netra-development-solutions/utils.crypto.jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const token = jwt.sign({
    data: 'foobar'
})

console.log("TOKEN => ", token);

const decoded = jwt.decode(token);

console.log("DECODED => ", decoded);
```


## Authors

- [@namankhater](https://github.com/MadMaxINDIAN)

![Logo](https://avatars.githubusercontent.com/u/125114515?s=200&v=4)


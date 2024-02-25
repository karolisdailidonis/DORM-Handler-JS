# DORM-Handler-JS (BETA)

It is a client side package to handle DORM API requests.
To use this package, a DORM API server is required, for more information see the official repository.

[https://github.com/karolisdailidonis/DORM](https://github.com/karolisdailidonis/DORM)

DORM API is still under development and not yet suitable for production use. 

Another direct dependency is the axios package which is used to send the queries ```dorm.send()``` 

## Install
```
npm i dorm-handler-js
```

```js
import { DORM } from "dorm-handler-js";

const dorm = new DORM();

dorm.addReadJob({"...."});

dorm.send();

dorm.then((response)) => {
	console.log(response);
}
```
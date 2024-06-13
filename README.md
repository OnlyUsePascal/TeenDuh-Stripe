# TEENDUH Stripe Payment server

Note
- This only works for devices connected via 
USB or run from emulator.
- Make sure port `3000` is available

Executive the following commands to operate the payment server.

```
# forwarding connection from device to local machine
adb reverse tcp:3000 tcp:3000

# clone repo
$ clone https://github.com/OnlyUsePascal/TeenDuh-Stripe.git
$ cd TeenDuh-Stripe

# operate server
$ npm install
$ npm start
```

To test if connection is working
```
$ adb shell
(emulator shell)$ curl 127.0.0.1:3000
# it works!
fare well my friend

# or not :(
curl: (52) Empty reply from server
```


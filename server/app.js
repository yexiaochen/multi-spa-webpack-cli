const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa-cors');
const session = require('koa-session');
const serve = require('koa-static');
const path = require('path')
const mongoose = require('mongoose');
const config = require('./config');
const router = require('./routes/index');
const app = new Koa();

app.keys = ['yexiaochen secret'];

let store = {
  storage: {},
  get(key) {
    return this.storage[key]
  },
  set(key, value) {
    this.storage[key] = value
  },
  destroy(key) {
    delete this.storage[key]
  }
};

const sessionConfig = {
  key: 'xiaochen:session',
  maxAge: 24 * 60 * 60 * 1000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  encode: json => JSON.stringify(json),
  decode: string => JSON.parse(string),
  store
};

app.use(serve(path.join('../dist')));
app.use(session(sessionConfig, app));
app.use(cors({ credentials: true }));
app.use(koaBody());

mongoose.connect(config.database, { useNewUrlParser: true });

app.use(router.routes()).use(router.allowedMethods());
console.log('config',config.database)

const PORT = '8080';

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});


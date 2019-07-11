const UserModel = require('../models/user');

const userController = {
  async register(ctx) {
    const { username, password } = ctx.request.body;
    if (!username || !password) {
      ctx.body = {
        "success": false,
        "message": "请填写用户名或密码"
      }
    } else {
      let user = await UserModel.findOne({ username });
      if (!user) {
        try {
          await new UserModel({
            username,
            password
          }).save();
          ctx.body = {
            "success": true,
            "message": "注册成功"
          }
        } catch (error) {
          ctx.body = {
            "success": false,
            "message": "注册失败"
          }
        }
      } else {
        ctx.body = {
          "success": false,
          "message": "用户名已存在"
        }
      }
    }
  },
  async login(ctx) {
    const { username, password } = ctx.request.body;
    const logged = ctx.session.username;

    try {
      let user = await UserModel.findOne({
        username
      });
      if (!user) {
        ctx.body = {
          "success": false,
          "message": "用户不存在"
        }
      } else {
        if (user.password == password) {
          ctx.body = {
            "success": true,
            "message": "登录成功"
          };
          if (!logged) {
            ctx.session.username = username;
          }
          console.log('user', user)
        } else {
          console.log('user', user)
          ctx.body = {
            "success": false,
            "message": "密码错误"
          }
        }
      }
    } catch (error) {
      ctx.body = {
        "success": false,
        "message": "登录失败"
      }
    }
  },
  logout(ctx) {
    ctx.session = null;
    ctx.body = {
      "code": 200,
      "message": `${ctx.session.username}, logout`
    }
  }
}

module.exports = userController;
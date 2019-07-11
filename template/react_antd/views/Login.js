// import React from 'react';
import { Form, Icon, Input, Button, Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginAction } from 'src/store/actions';

const mapDispatchToProps = dispatch => ({
  login(params, callback) {
    loginAction(params, callback)(dispatch);
  }
});

const Login = props => {
  const {
    form,
    form: { getFieldDecorator },
    login,
    history
  } = props;
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) return;
      login(values, resposne => {
        history.push({
          pathname: '/user'
        });
        console.log('resposne', values, resposne);
      });
    });
  };
  return (
    <Row type="flex" justify="center" align="middle">
      <Col
        span={12}
        style={{ maxWidth: '320px', marginTop: '50px', marginBottom: '50px' }}
      >
        <Card title="登录" headStyle={{ textAlign: 'center' }}>
          <Form onSubmit={handleSubmit}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入您的账号！' }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入您的密码！' }]
              })(
                <Input.Password
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
              >
                Login
              </Button>
              Or <Link to="/auth/register"> register now!</Link>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Form.create()(Login));

// import React from 'react';
import { Form, Icon, Input, Button, Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerAction } from 'src/store/actions';
import { useState } from 'react';

const mapDispatchToProps = dispatch => ({
  register(params, callback) {
    registerAction(params, callback)(dispatch);
  }
});

const Register = props => {
  const {
    form,
    form: { getFieldDecorator },
    register
  } = props;
  const [confirmDirty, setConfirmDirty] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) return;
      register(values, resposne => {
        console.log('resposne', resposne);
      });
    });
  };
  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };
  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };
  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  return (
    <Row type="flex" justify="center" align="middle">
      <Col
        span={12}
        style={{ maxWidth: '320px', marginTop: '50px', marginBottom: '50px' }}
      >
        <Card title="注册" headStyle={{ textAlign: 'center' }}>
          <Form onSubmit={handleSubmit}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: 'Please input your username!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!'
                  },
                  {
                    validator: validateToNextPassword
                  }
                ]
              })(
                <Input.Password
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!'
                  },
                  {
                    validator: compareToFirstPassword
                  }
                ]
              })(
                <Input.Password
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Confirm Password"
                  onBlur={handleConfirmBlur}
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
              >
                Resiger
              </Button>
              Or <Link to="/auth/login"> login now!</Link>
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
)(Form.create()(Register));

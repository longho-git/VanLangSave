import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';

function SignUpForm(props) {
  const [signupNameFocus, setSignupNameFocus] = React.useState('');
  const [signupEmailFocus, setSignupEmailFocus] = React.useState('');
  const [signupPasswordFocus, setSignupPasswordFocus] = React.useState('');
  return (
    <>
      <Form>
        <h2>Tạo tài khoản</h2>
        <FormGroup className={'mb-3 ' + signupNameFocus}>
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-circle-08"></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="Name"
              type="text"
              onFocus={() => setSignupNameFocus('focused')}
              onBlur={() => setSignupNameFocus('')}
            ></Input>
          </InputGroup>
        </FormGroup>
        <FormGroup className={'mb-3 ' + signupEmailFocus}>
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-email-83"></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="Email"
              type="email"
              onFocus={() => setSignupEmailFocus('focused')}
              onBlur={() => setSignupEmailFocus('')}
            ></Input>
          </InputGroup>
        </FormGroup>
        <FormGroup className={signupPasswordFocus}>
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-lock-circle-open"></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="Password"
              type="password"
              onFocus={() => setSignupPasswordFocus('focused')}
              onBlur={() => setSignupPasswordFocus('')}
            ></Input>
          </InputGroup>
        </FormGroup>
        <Button color="primary">Sign Up</Button>
      </Form>
    </>
  );
}

SignUpForm.propTypes = {};

export default SignUpForm;

import React from 'react';
// nodejs library that concatenates classes
import classnames from 'classnames';
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from 'reactstrap';
// core components

function Register() {
  const [focusedName, setfocusedName] = React.useState(false);
  const [focusedEmail, setfocusedEmail] = React.useState(false);
  const [focusedPassword, setfocusedPassword] = React.useState(false);
  return (
    <div className="modal-body p-0">
      <Card className="bg-secondary border-0">
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <h1>Đăng ký </h1>
            <p className="text-lead ">Nhanh chóng và dễ dàng</p>
          </div>
          <Form role="form">
            <FormGroup
              className={classnames({
                focused: focusedName,
              })}
            >
              <InputGroup className="input-group-merge input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-hat-3" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Name"
                  type="text"
                  onFocus={() => setfocusedName(true)}
                  onBlur={() => setfocusedName(false)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup
              className={classnames({
                focused: focusedEmail,
              })}
            >
              <InputGroup className="input-group-merge input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Email"
                  type="email"
                  onFocus={() => setfocusedEmail(true)}
                  onBlur={() => setfocusedEmail(false)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup
              className={classnames({
                focused: focusedPassword,
              })}
            >
              <InputGroup className="input-group-merge input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Password"
                  type="password"
                  onFocus={() => setfocusedPassword(true)}
                  onBlur={() => setfocusedPassword(false)}
                />
              </InputGroup>
            </FormGroup>
            <div className="text-muted font-italic">
              <small>
                password strength:{' '}
                <span className="text-success font-weight-700">strong</span>
              </small>
            </div>
            <Row className="my-4">
              <Col xs="12">
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id="customCheckRegister"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheckRegister"
                  >
                    <span className="text-muted">
                      I agree with the{' '}
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>
              </Col>
            </Row>
            <div className="text-center">
              <Button className="mt-4" color="info" type="button">
                Create account
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default Register;

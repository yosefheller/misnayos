import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { withRouter } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
class SiyumPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.password(this.state.password);
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label htmlFor="siyum_name">
              Enter your siyum 4 number siyum password
            </Label>
            <Input
              id="password"
              name="password"
              type="number"
              onChange={this.handleChange}
            />
          </FormGroup>

          <Button>Submit password</Button>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SiyumPassword);

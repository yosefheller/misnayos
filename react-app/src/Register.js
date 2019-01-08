import React, { Component } from "react";
import { Button, Form, Label, Input, Container } from "reactstrap";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { error: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const body = this.state;
    // console.log(body);
    fetch("http://localhost:3030/users/newuser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(json => {
        // console.log(json);
        if (json.errors) {
          this.setState({ error: json.errors });
        } else {
          this.props.history.push("/signIn");
        }
      });
  }

  render() {
    return (
      <Container>
        {this.state.error && (
          <ul>
            {this.state.error.map(error => {
              return <li key={error.msg}>{error.msg}</li>;
            })}
          </ul>
        )}

        <Form onSubmit={this.handleSubmit}>
          <Label htmlFor="user_name">Enter a user name</Label>
          <Input
            id="user_name"
            name="user_name"
            type="text"
            onChange={this.handleChange}
          />
          <Label htmlFor="email">Enter your email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            onChange={this.handleChange}
          />

          <Label htmlFor="password">Enter your password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            onChange={this.handleChange}
          />
          <Label htmlFor="password2">Re Enter your password</Label>
          <Input
            id="password2"
            name="password2"
            type="password"
            onChange={this.handleChange}
          />

          <Button>Register !</Button>
        </Form>
      </Container>
    );
  }
}

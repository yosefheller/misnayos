import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";

class SiyumForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creator_id: this.props.userinfo.id,
      error: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log(this.props.userinfo.id);

    const body = this.state;
    // console.log(body);
    fetch("http://localhost:3030/siyum/newsiyum", {
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
          window.alert("Your Siyum Id is " + json.id);
          this.props.history.push("/");
        }
      });
  }

  render() {
    if (!this.props.isSignedIn) {
      return (
        <Redirect
          to={{
            pathname: "/signIn"
          }}
        />
      );
    }
    return (
      <Container>
        {this.state.error && (
          <ul>
            {this.state.error.map(error => {
              return <li key={error.message}>{error.message}</li>;
            })}
          </ul>
        )}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label htmlFor="siyum_date">Enter your siyum date</Label>
            <Input
              id="siyum_date"
              name="siyum_date"
              type="date"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="neshama">Enter your neshama name</Label>
            <Input
              id="neshama"
              name="neshama"
              type="text"
              onChange={this.handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="siyum_name">Enter your siyum name</Label>
            <Input
              id="siyum_name"
              name="siyum_name"
              type="text"
              onChange={this.handleChange}
            />
          </FormGroup>

          <Button>Create Siyum!</Button>
        </Form>
      </Container>
    );
  }
}
export default withRouter(SiyumForm);

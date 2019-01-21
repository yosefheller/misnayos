import React, { Component } from "react";
import { Form, FormGroup, Label, Container } from "reactstrap";

import AboutASiyum from "./AboutASiyum";
import AboutMySiyumem from "./AboutMySiyumem";
export default class AdminSiyum extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      masechto_id: [],
      SiyumInfo: [],
      siyum: { siyumByID: { password: "" } },
      err: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.location.state) {
      this.fetchSiyumInfo();
    }
  }
  //   componentDidUpdate(prevProps, prevState) {
  //     if (this.props.match.params.id !== prevProps.match.params.id) {
  //       this.fetchSiyumInfo();
  //     }
  //   }

  handleSubmit(event) {
    event.preventDefault();

    const learnersId = this.state.SiyumInfo.filter(
      // eslint-disable-next-line array-callback-return
      SiyumInfo => {
        if (!SiyumInfo.completed) {
          return SiyumInfo.LearnerId;
        }
      }
    ).map(SiyumInfo => {
      //   console.log(SiyumInfo.LearnerId);
      return SiyumInfo.LearnerId;
    });
    const body = {
      learnersId: learnersId,
      siyum: this.state.siyum.siyumByID,
      url: " http://localhost:3000/siyum/" + this.props.match.params.id
    };

    fetch("http://localhost:3030/users/sendemails", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(res => {
        // console.log(res);
      });
  }

  fetchSiyumInfo() {
    fetch(
      "http://localhost:3030/masechtos_mishnayos/" + this.props.match.params.id
    )
      .then(response => response.json())
      .then(SiyumInfo => {
        // console.log(SiyumInfo);
        this.setState(() => ({ SiyumInfo: SiyumInfo }));
        fetch("http://localhost:3030/siyum/" + this.props.match.params.id)
          .then(response => response.json())
          .then(Siyum => {
            if (Siyum.error) {
              this.setState({ loading: false });
              throw new Error("an error accured");
            }
            // console.log(Siyum);
            this.setState(() => ({ siyum: Siyum, loading: false }));
          })
          .catch(error => {
            console.log(
              "There has been a problem with your fetch operation: " + error
            );
          });
      })
      .catch(error => {
        console.log("There has been a problem with your fetch operation: ");
        return this.setState({ loading: false });
      });
  }

  learnerNameOrCheckboxOrDone(LearnerName, completed) {
    if (completed === 1) {
      // eslint-disable-next-line
      return LearnerName + " " + "done";
    } else if (LearnerName) {
      return " " + LearnerName;
    }
    return "not taken";
  }
  dateFormater(oldDate) {
    let newDate = new Date(oldDate);
    return newDate.toDateString();
  }
  renderLoading() {
    return <div>Please wait... Loading</div>;
  }

  renderError() {
    return (
      <div>
        OOPS. Unable to load
        <br />
      </div>
    );
  }

  renderMySiyumInfo() {
    const SiyumInfo = this.state.SiyumInfo.map(SiyumInfo => {
      return (
        <FormGroup
          key={SiyumInfo.id}
          style={{
            border: "1px black solid",
            width: "31%",
            height: "4%"
          }}
        >
          <Label>
            {SiyumInfo.masechto_name + " :  "}
            {this.learnerNameOrCheckboxOrDone(
              SiyumInfo.LearnerName,
              SiyumInfo.completed
            )}
          </Label>
        </FormGroup>
      );
    });

    return (
      <div>
        <Container
          style={{
            width: "80%",
            margin: "auto"
          }}
        >
          <p>
            Learning is in memory of {this.state.siyum.siyumByID.neshama} and to
            be done by{" "}
            {this.dateFormater(this.state.siyum.siyumByID.siyum_date)} and the
            Siyum Id is {this.state.siyum.siyumByID.id}
          </p>
          <Form
            inline
            onSubmit={this.handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              maxHeight: "600px",
              flexWrap: "wrap",
              alignItems: "center"
            }}
          >
            {SiyumInfo}
            <button>send reminder emails</button>
          </Form>
        </Container>
      </div>
    );
  }

  render() {
    if (!localStorage.getItem("isSignedIn")) {
      return <AboutASiyum />;
    }
    if (!this.props.location.state) {
      return <AboutMySiyumem />;
    }
    if (this.state.loading) {
      return this.renderLoading();
    } else if (this.state.SiyumInfo.length > 1) {
      return this.renderMySiyumInfo();
    } else {
      return this.renderError();
    }
  }
}

import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Container } from "reactstrap";
import AboutASiyum from "./AboutASiyum";
import SiyumPassword from "./SiyumPassword";
export default class Siyum extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      masechto_id: [],
      SiyumInfo: [],
      siyum: { siyumByID: { password: "" } },
      err: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.prevHistory(this.props.history.location.pathname);
    var isSignedIn = this.props.isSignedIn || this.props.location.state;
    if (isSignedIn) {
      this.fetchSiyumInfo();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchSiyumInfo();
    }
  }
  siyumPassword = password => {
    this.setState(() => ({ siyumPassword: password }));
    localStorage.setItem(this.props.match.params.id, password);
    if (
      // eslint-disable-next-line eqeqeq
      localStorage.getItem(this.props.match.params.id) !=
      this.state.siyum.siyumByID.password
    ) {
      this.setState(() => ({ err: "wrong password" }));
    }
  };
  handleChange(event) {
    if (event.target.checked) {
      var newMasechto = this.state.masechto_id.concat(event.target.value);
      this.setState({
        masechto_id: newMasechto
      });
    } else {
      this.setState({
        masechto_id: this.state.masechto_id.filter(function(masechto_id) {
          return masechto_id !== event.target.value;
        })
      });
    }
  }

  handleSubmit(event) {
    var learner_id = this.props.userinfo || this.props.location.state.userinfo;
    event.preventDefault();
    // console.log(JSON.parse(localStorage.getItem("user")));
    const body = this.state.masechto_id.map(masechto_id => {
      return {
        learner_id: learner_id,
        masechto_id: masechto_id,
        siyum_id: this.props.match.params.id
      };
    });
    fetch("/masechtos_learned/newmasechto", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then(() => {
      this.fetchSiyumInfo();
    });
  }
  SetPasswordForMySiyumemAndMasechtos(Siyum) {
    if (this.props.location.state) {
      localStorage.setItem(
        this.props.location.state.mySiyum,
        Siyum.siyumByID.password
      );
    }
  }
  fetchSiyumInfo() {
    fetch("/masechtos_mishnayos/" + this.props.match.params.id)
      .then(response => response.json())
      .then(SiyumInfo => {
        // console.log(SiyumInfo);
        this.setState(() => ({ SiyumInfo: SiyumInfo }));
        fetch("/siyum/" + this.props.match.params.id)
          .then(response => response.json())
          .then(Siyum => {
            if (Siyum.error) {
              this.setState({ loading: false });
              throw new Error("an error accured");
            }
            // console.log(Siyum);
            this.SetPasswordForMySiyumemAndMasechtos(Siyum);
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

  learnerNameOrCheckboxOrDone(
    LearnerName,
    masechtoName,
    masechtoId,
    completed
  ) {
    if (completed === 1) {
      // eslint-disable-next-line
      return LearnerName + " " + "done";
    } else if (LearnerName) {
      return " " + LearnerName;
    }
    return (
      <Input
        name={masechtoName}
        type="checkbox"
        value={masechtoId}
        onChange={this.handleChange}
      />
    );
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
  dateFormater(oldDate) {
    let newDate = new Date(oldDate);
    return newDate.toDateString();
  }
  saderNameElement(saderName) {
    return (
      <b
        style={{
          border: "1px black solid",
          width: "31%",
          height: "4%"
        }}
      >
        {saderName}
      </b>
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
              SiyumInfo.masechto_name,
              SiyumInfo.id,
              SiyumInfo.completed
            )}
          </Label>
        </FormGroup>
      );
    });

    const zeraim = SiyumInfo.slice(0, 11);
    const moed = SiyumInfo.slice(11, 23);
    const nashim = SiyumInfo.slice(23, 30);
    const nezikin = SiyumInfo.slice(30, 40);
    const kodashim = SiyumInfo.slice(40, 51);
    const tohoros = SiyumInfo.slice(51, 63);

    return (
      <Container
        style={{
          width: "80%",
          height: "80%",
          margin: "auto"
        }}
      >
        <p>
          Learning is in memory of {this.state.siyum.siyumByID.neshama} and to
          be done by {this.dateFormater(this.state.siyum.siyumByID.siyum_date)}{" "}
          and the Siyum Id is {this.state.siyum.siyumByID.id}
        </p>
        <Form
          inline
          onSubmit={this.handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "618px",
            flexWrap: "wrap",
            alignItems: "center"
          }}
        >
          {this.saderNameElement("Zeraim")}
          {zeraim}
          {this.saderNameElement("Moed")}
          {moed}
          {this.saderNameElement("Nashim")}
          {nashim}
          {this.saderNameElement("Nezikin")}
          {nezikin}
          {this.saderNameElement("Kodashim")}
          {kodashim}
          {this.saderNameElement("Tohoros")}
          {tohoros}
          <button>add masechtos</button>
        </Form>
      </Container>
    );
  }

  render() {
    if (!localStorage.getItem("isSignedIn")) {
      return <AboutASiyum />;
    }

    if (this.state.loading) {
      return this.renderLoading();
    } else if (
      this.state.siyum.siyumByID.password != null &&
      // eslint-disable-next-line eqeqeq
      localStorage.getItem(this.props.match.params.id) !=
        this.state.siyum.siyumByID.password &&
      this.state.SiyumInfo.length > 1
    ) {
      return (
        <div>
          {this.state.err && <p>{this.state.err}</p>}
          <SiyumPassword password={this.siyumPassword} />;
        </div>
      );
    } else if (this.state.SiyumInfo.length > 1) {
      return this.renderMySiyumInfo();
    } else {
      return this.renderError();
    }
  }
}

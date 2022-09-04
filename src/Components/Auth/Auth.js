import React, { Component } from "react";
import { Formik } from "formik";

class Auth extends Component {
  state = {
    mode: "signup",
  };

  changeMode = () => {
    if (this.state.mode === "signup") {
      this.setState({
        mode: "login",
      });
    } else {
      this.setState({
        mode: "signup",
      });
    }
  };

  render() {
    return (
      <div>
        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          onSubmit={(values) => {
            console.log(values);
          }}
          validate={(values) => {
            const errors = {};

            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(
                values.email
              )
            ) {
              errors.email = "Invalid email address";
            }

            if (!values.password) {
              errors.password = "Required";
            } else if (values.password.length < 4) {
              errors.password = "Must be at least four charahters";
            }

            if (this.state.mode === "signup") {
              if (values.password !== values.confirmPassword) {
                errors.confirmPassword = "Password field does not match";
              }
            }

            console.log(errors);
            return errors;
          }}
        >
          {({ values, handleChange, handleSubmit, errors }) => (
            <div className="w-25 mt-4 mx-auto">
              <span
                role="button"
                onClick={this.changeMode}
                className="d-inline-block mb-3 text-primary fw-bold"
              >
                Switch to {this.state.mode === "signup" ? "Login" : "Signup"}
              </span>
              <form onSubmit={handleSubmit}>
                <span className="text-danger">{errors.email}</span>
                <input
                  name="email"
                  placeholder="Enter your email"
                  className="form-control mb-3"
                  value={values.email}
                  onChange={handleChange}
                />
                <span className="text-danger">{errors.password}</span>
                <input
                  name="password"
                  placeholder="Enter your password"
                  className="form-control mb-3"
                  value={values.password}
                  onChange={handleChange}
                />
                <span className="text-danger">{errors.confirmPassword}</span>
                {this.state.mode === "signup" ? (
                  <div>
                    <input
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      className="form-control mb-3"
                      value={values.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                ) : null}

                <button type="submit" className="btn btn-success">
                  {this.state.mode === "signup" ? "Signup" : "Login"}
                </button>
              </form>
            </div>
          )}
        </Formik>
      </div>
    );
  }
}

export default Auth;

import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { FiFacebook } from "react-icons/fi";
import { FiTwitter } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";

import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Campo Obligatorio.
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/profile");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="container-fluid ps-md-0">
        <div className="row g-0">
          <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image2"></div>
            <div class="col-md-8 col-lg-6">
              <div class="register d-flex align-items-center py-5">
                <div class="container">
                  <div class="row">
                    <div class="col-md-9 col-lg-8 mx-auto">
                      <h1 class="textLogo">ContigoPE</h1><br/>
                      <Form
                        onSubmit={this.handleLogin}
                        ref={c => {
                          this.form = c;
                        }}
                      >
                        <div className="form-floating mb-3">
                        <label htmlFor="floatingInput">Usuario</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="username"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            validations={[required]}
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label htmlFor="password">Password</label>
                          <Input
                            type="password"
                            className="form-control"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            validations={[required]}
                          />
                        </div>

                        <div className="form-check mb-3">
                          <input class="form-check-input" type="checkbox" value="" id="rememberPasswordCheck"/>
                          <label class="form-check-label" htmlfor="rememberPasswordCheck">Recibir Notificaciones</label>
                        </div>
                        <div class="d-grid"><br/>
                          <button
                            className="btn btn-dark btn-block"
                            disabled={this.state.loading}
                          >
                            {this.state.loading && (
                              <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                          </button><br/>
                        </div>
                        <div class="text-center">
                            <a class="small" href="/register">Aún no eres mienbro? Registrate</a>
                         </div>
                        {this.state.message && (
                          <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                              {this.state.message}
                            </div>
                          </div>
                        )}
                        <CheckButton
                          style={{ display: "none" }}
                          ref={c => {
                            this.checkBtn = c;
                          }}
                        />
                                                <br/><br/>
                                    <div class="iconosRedes mb-6">
                                        <a href="#"><FiFacebook/></a>
                                        <a href="#"><FiTwitter/></a>
                                        <a href="#"><FiInstagram/></a>
                                    </div>
                                    <br/><br/><br/><br/>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

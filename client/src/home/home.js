import React, { Component } from 'react';
import hello from 'hellojs/dist/hello.all.js';
import axios from 'axios';
import $ from 'jquery';

class Home extends Component {
  constructor(props) {
    super(props);

    const msft = hello('msft').getAuthResponse();

    if (!msft) {
      window.location = "/";
      return;
    }
    this.state = {
      me: "",
      successMessage: "",
      token: msft.access_token
    };

    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    const { token } = this.state;
    axios.get(
      'https://graph.microsoft.com/v1.0/me?$select=displayName,mail,userPrincipalName',
      { headers: { Authorization: `Bearer ${token}` }}
    ).then(res => {
      const me = res.data;
      this.setState({ me });
    }, e => {
      console.log('Authentication error!');
      window.location = "/";
    });
  }

  onLogout() {
    hello('msft').logout().then(
      () => this.props.history.push('/'),
      e => console.error(e.error.message)
    );
  }

  onProfileClick() {
    $('.js-profile-toggler').toggleClass('open');
  }

  renderMe() {
    const { me } = this.state;
    const myEmailAddress = me.mail || me.userPrincipalName;

    return (
        <tr>
          <td>{me.displayName}</td>
          <td>{myEmailAddress}</td>
        </tr>
    );
  }

  render() {
    return (
      <div>
        <header className="header">
          <div className="header-wrap">
            
            <a href="index.html" className="logo">
              <span>Beta</span>
            </a>

            <ul className="header-menu js-sidebar">
              <li className="header-menu__item active">
                <a href="index.html" className="header-menu__link">
                  <i className="icon-home"></i>
                  <span>Home</span>
                </a>
              </li>
              <li className="header-menu__item js-submenu-toggler">
                <a href="services.html" className="header-menu__link">
                  <i className="icon-services"></i>
                  <span>Services</span>
                </a>
                <div className="header-submenu">
                  <a href="">New Copyright Application</a>
                  <a href="">Amend</a>
                  <a href="">License</a>
                </div>
              </li>
              <li className="header-menu__item js-submenu-toggler">
                <a href="applications.html" className="header-menu__link">
                  <i className="icon-apps"></i>
                  <span>List</span>
                </a>
                <div className="header-submenu">
                  <a href="applications.html">All list</a>
                  <a href="applications-personal.html">Personal</a>
                  <a href="">As an Agent</a>
                </div>
              </li>
              <li className="header-menu__item js-submenu-toggler">
                <a href="resources.html" className="header-menu__link">
                  <i className="icon-resources"></i>
                  <span>Resources</span>
                </a>
                <div className="header-submenu">
                  <a href="resources.html">Copyright Law</a>
                  <a href="resources-terms.html">Terms & Conditions</a>
                  <a href="">Public Consultations</a>
                  <a href="">FAQ</a>
                </div>
              </li>
              <li className="header-menu__item">
                <a href="support.html" className="header-menu__link">
                  <i className="icon-support"></i>
                  <span>Support</span>
                </a>
              </li>
              <li className="header-menu__item header-menu__item--dismisser js-sidebar-dismisser">
                <i className="icon-cancel"></i>
              </li>
            </ul>

            <div className="header-actions">
              <p className="header-actions__text">عربي</p>
              <a href="" className="header-actions__notification">
                <i className="icon-bell"></i>
              </a>
              <div className="header__dropdown js-profile-toggler" onClick={this.onProfileClick}>
                <div className="header__dropdown-icon">
                  <i className="icon-person"></i>
                </div>
                <div className="header__dropdown-group">
                  <span>Welcome</span>
                  <p>{this.state.me.givenName} {this.state.me.surname}</p>
                </div>
                <div className="header__dropdown-angle"></div>

                <div className="header__dropdown-wrap">
                  <a href="">
                    <i className="icon-edit"></i>
                    <span>Edit Account Information</span>
                  </a>
                  <a href="" onClick={this.onLogout}>
                    <i className="icon-exit"></i>
                    <span>Sign Out</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </div>

          </div>
        </header>
        <section className="content">
          
          <div className="content-form">
            <div className="content-header b-b">
              <div className="content-header-wrap">
                <div>
                  <p className="content-header__subtitle">List</p>
                  <h2 className="content-header__title">All list</h2>
                </div>
                <div className="content-header__actions">
                  <input type="search" className="input input--blue input--sm mr-md" placeholder="Search" />
                  <button className="btn btn--blue-outline btn--sm btn--no-shadow">Filter</button>
                </div>
              </div>
            </div>

            <div className="content-table-wrap" style={{overflowX: "scroll"}}>
              <table className="content-table">
              <tbody>
                <tr>
                  <th>
                    <p className="content-table__h">
                      <span>Timestamp</span>
                      <i className="icon-arrow-long-down"></i>
                    </p>
                  </th>
                  <th>
                    <p className="content-table__h">
                      <span>TransactionDate</span>
                      <i className="icon-arrow-long-down"></i>
                    </p>
                  </th>
                  <th>
                    <p className="content-table__h">
                      <span>TransactionTime</span>
                      <i className="icon-arrow-long-down"></i>
                    </p>
                  </th>
                  <th>
                    <p className="content-table__h">
                      <span>GateBarrier</span>
                      <i className="icon-arrow-long-down"></i>
                    </p>
                  </th>
                  <th>
                    <p className="content-table__h">
                      <span>GateName</span>
                      <i className="icon-arrow-long-down"></i>
                    </p>
                  </th>
                  <th>
                    <p className="content-table__h">
                      <span>FullName</span>
                      <i className="icon-arrow-long-down"></i>
                    </p>
                  </th>
                  <th>
                    <p className="content-table__h">
                      <span>EmployeeID</span>
                      <i className="icon-arrow-long-down"></i>
                    </p>
                  </th>
                  <th>
                    <p className="content-table__h">
                      <span>DepartmentName</span>
                      <i className="icon-arrow-long-down"></i>
                    </p>
                  </th>
                  <th>
                    <p className="content-table__h">
                      <span>TransactionType</span>
                      <i className="icon-arrow-long-down"></i>
                    </p>
                  </th>
                  <th className="content-table__actions">
                    <span>Actions</span>
                  </th>
                </tr>
                <tr>
                  <td>1234567890</td>
                  <td>00/00/0000</td>
                  <td>00/00/0000</td>
                  <td className="content-table__status">
                    <p>Application Status Here</p>
                  </td>
                  <td>
                    <button className="action js-action">
                      <i className="icon-more-dots"></i>
                      <span className="action-menu">
                        <a href="#" className="action-menu__link">View</a>
                        <a href="#" className="action-menu__link">Download</a>
                      </span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>1234567890</td>
                  <td>00/00/0000</td>
                  <td>00/00/0000</td>
                  <td className="content-table__status">
                    <p>Application Status Here</p>
                  </td>
                  <td>
                    <button className="action js-action">
                      <i className="icon-more-dots"></i>
                      <span className="action-menu">
                        <a href="#" className="action-menu__link">View</a>
                        <a href="#" className="action-menu__link">Download</a>
                      </span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>1234567890</td>
                  <td>00/00/0000</td>
                  <td>00/00/0000</td>
                  <td className="content-table__status">
                    <p>Application Status Here</p>
                  </td>
                  <td>
                    <button className="action js-action">
                      <i className="icon-more-dots"></i>
                      <span className="action-menu">
                        <a href="#" className="action-menu__link">View</a>
                        <a href="#" className="action-menu__link">Download</a>
                      </span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>1234567890</td>
                  <td>00/00/0000</td>
                  <td>00/00/0000</td>
                  <td className="content-table__status">
                    <p>Application Status Here</p>
                  </td>
                  <td>
                    <button className="action js-action">
                      <i className="icon-more-dots"></i>
                      <span className="action-menu">
                        <a href="#" className="action-menu__link">View</a>
                        <a href="#" className="action-menu__link">Download</a>
                      </span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>1234567890</td>
                  <td>00/00/0000</td>
                  <td>00/00/0000</td>
                  <td className="content-table__status">
                    <p>Application Status Here</p>
                  </td>
                  <td>
                    <button className="action js-action">
                      <i className="icon-more-dots"></i>
                      <span className="action-menu">
                        <a href="#" className="action-menu__link">View</a>
                        <a href="#" className="action-menu__link">Download</a>
                      </span>
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div className="content-table-footer">
              <div className="content-table-footer__input-group">
                <p>Rows per page:</p>
                <select className="js-select2" style={{minWidth: '50px'}} defaultValue="">
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                  <option>All</option>
                </select>
              </div>
              <ul className="content-table-footer__pagination">
                <li>
                  <a href="#" className="action">
                    <i className="icon-arrow-double-left"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="action">
                    <i className="icon-arrow-left"></i>
                  </a>
                </li>
                <li className="mx-sm">
                  <span className="text-blue font-bold">01 / 01</span>
                </li>
                <li>
                  <a href="#" className="action">
                    <i className="icon-arrow-right"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="action">
                    <i className="icon-arrow-double-right"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </section>

          <footer className="footer">
              <p>All rights reserved for the Saudi Authority for Intellectual Property © 2019</p>
          </footer>
          
          <div className="overlay js-overlay"></div>
        <button onClick={this.onLogout}>Logout</button>
        <p>{this.state.successMessage}</p>
      </div>
    );
  }
}

export default Home;

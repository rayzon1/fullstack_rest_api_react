import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

const Context = React.createContext(); 

export class Provider extends Component {

  constructor() {
    super();
    this.data = new Data(); // Initialize Data class.
  }

  state = {
    // Will make auth user the cookie if present otherwise null.
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
  };

  render() {
    const { authenticatedUser } = this.state;

    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      }
    };  

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  // Signs in user with required credentials.
  signIn = async (username, password) => {
    // User retrieved from the db.
    const user = await this.data.getUser(username, password);
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });

      //! Set the cookie using js-cookie. 
      //! First param is name of cookie.
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });

    }
    return user;
  }

  signOut = () => {
    this.setState({ authenticatedUser: null });
    // Deletes cookie holding auth user credentials.
    Cookies.remove('authenticatedUser');
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}


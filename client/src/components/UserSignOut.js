import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({ context }) => {
  const authUser = context.authenticatedUser;
  console.log(`${authUser.name} is now signed out.`);
  context.actions.signOut();
  
  return (
    <Redirect to="/" />
  );
}

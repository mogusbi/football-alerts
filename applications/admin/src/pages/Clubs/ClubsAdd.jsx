// import {API, graphqlOperation} from 'aws-amplify';
import React from 'react';
import ClubsForm from './ClubsForm';

// const mutation = `mutation CreateClub($input: ClubInput!) {
//   createClub(input: $input) {
//     id
//     name
//   }
// }`;

function ClubsAdd () {
  async function submit (input) {
    // try {
    //   const club = await API.graphql(graphqlOperation(mutation, {
    //     input
    //   }));
    //
    //   console.log(club);
    // } catch (e) {
    //   console.log(e);
    // }
  }

  return (
    <ClubsForm onSubmit={submit} />
  );
}

export default ClubsAdd;

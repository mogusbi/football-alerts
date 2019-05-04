export const createClub = `
  mutation CreateClub($input: ClubInput!) {
    createClub(input: $input) {
      name
    }
  }
`;

export const deleteClub =`
  mutation DeleteClub($id: ID!) {
    deleteClub(id: $id) {
      name
    }
  }
`;

export const updateClub = `
  mutation UpdateClub($id: ID!, $input: ClubInput!) {
    updateClub(id: $id, input: $input) {
      name
    }
  }
`;

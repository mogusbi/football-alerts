export const createClub = `
  mutation CreateClub($input: ClubInput!) {
    createClub(input: $input) {
      name
    }
  }
`;

export const createSource = `
  mutation CreateSource($clubId: ID!, $input: SourceInput!) {
    createSource(clubId: $clubId, input: $input) {
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

export const deleteSource =`
  mutation DeleteSource($id: ID!, $clubId: ID!) {
    deleteSource(id: $id, clubId: $clubId) {
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

export const updateSource = `
  mutation UpdateSource($id: ID!, $clubId: ID!, $input: SourceInput!) {
    updateSource(id: $id, clubId: $clubId, input: $input) {
      name
    }
  }
`;

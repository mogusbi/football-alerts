export const getClub = `
  query GetClub($id: ID!) {
    getClub(id: $id) {
      id
      name
      twitterHandle
      website
    }
  }
`;

export const getClubs = `
  query GetClubs($limit: Int, $nextToken: String) {
    getClubs(limit: $limit, nextToken: $nextToken) {
      clubs {
        id
        name
      }
      nextToken
    }
  }
`;

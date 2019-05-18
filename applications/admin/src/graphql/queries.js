export const getClub = `
  query GetClub($id: ID!) {
    getClub(id: $id) {
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

export const getSource = `
  query GetSource($id: ID!, $clubId: ID!) {
    getSource(id: $id, clubId: $clubId) {
      description
      feed
      image {
        property
        value
      }
      link
      name
      publishDate
      title
    }
  }
`;

export const getSources = `
  query GetSources($clubId: ID!, $limit: Int, $nextToken: String) {
    getSources(clubId: $clubId, limit: $limit, nextToken: $nextToken) {
      nextToken
      sources {
        id
        name
      }
    }
  }
`;

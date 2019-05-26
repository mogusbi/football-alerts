export const dashboard = `
  query Dashboard($id: ID!) {
    getClub(id: $id) {
      name
    }
  }
`;

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

export const getImages = `
   query GetImages($limit: Int, $nextToken: String) {
    getImages(limit: $limit, nextToken: $nextToken) {
      images {
        id
        images {
          name
          path
        }
      }
      nextToken
    }
   }
`;

export const getSetting = `
  query GetSetting($id: ID!, $type: String!) {
    getSetting(id: $id, type: $type) {
      name
      value
    }
  }
`;

export const getSettings = `
  query GetSettings($type: String!, $limit: Int, $nextToken: String) {
    getSettings(type: $type, limit: $limit, nextToken: $nextToken) {
      nextToken
      settings {
        id
        name
      }
    }
  }
`;

export const getSource = `
  query GetSource($id: ID!, $clubId: ID!) {
    getSource(id: $id, clubId: $clubId) {
      description
      feed
      image {
        array
        arrayIndex
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

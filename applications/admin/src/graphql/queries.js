export const dashboard = `
  query Dashboard($id: ID!) {
    getClub(id: $id) {
      name
    }
  }
`;

export const getArticle = `
  query GetArticle($id: ID!, $clubId: ID!) {
    getArticle(id: $id, clubId: $clubId) {
      description
      imageId
      link
      status
      title
    }
  }
`;

export const getArticles = `
  query GetArticles($clubId: ID!, $status: String!, $limit: Int, $nextToken: String) {
    getArticles(clubId: $clubId, status: $status, limit: $limit, nextToken: $nextToken) {
      articles {
        id
        publishDate
        status
        title
      }
      nextToken
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

export const getImage = `
  query GetImage($id: ID!, $clubId: ID!) {
    getImage(id: $id, clubId: $clubId) {
      id
      images {
        name
        path
      }
    }
  }
`;

export const getImages = `
   query GetImages($clubId: ID!, $limit: Int, $nextToken: String) {
    getImages(clubId: $clubId, limit: $limit, nextToken: $nextToken) {
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

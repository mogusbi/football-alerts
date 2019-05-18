export const createClub = `
  mutation CreateClub($input: ClubInput!) {
    createClub(input: $input) {
      name
    }
  }
`;

export const createSetting = `
  mutation CreateSetting($type: String!, $input: SettingInput!) {
    createSetting(type: $type, input: $input) {
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

export const deleteSetting =`
  mutation DeleteSetting($id: ID!, $type: String!) {
    deleteSetting(id: $id, type: $type) {
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

export const updateSetting = `
  mutation UpdateSetting($id: ID!, $type: String!, $input: SettingInput!) {
    updateSetting(id: $id, type: $type, input: $input) {
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

import {getClubsReceived, nextClubsReceived} from '../../actions/ClubActions';
import {clubReducer, initialState} from '../club';

describe('clubReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {};
      const result = clubReducer(undefined, action);

      expect(result).toEqual(initialState);
    });
  });

  describe('getClubsReceived', () => {
    it('should fetch clubs and save them to the state', async () => {
      const action = getClubsReceived({
        clubs: [
          {
            id: 'ID-1',
            name: 'Club A'
          },
          {
            id: 'ID-2',
            name: 'Club B'
          },
          {
            id: 'ID-3',
            name: 'Club C'
          }
        ],
        nextToken: 'next-token'
      });
      const result = clubReducer(initialState, action);

      expect(result).toEqual({
        clubs: [
          {
            id: 'ID-1',
            name: 'Club A'
          },
          {
            id: 'ID-2',
            name: 'Club B'
          },
          {
            id: 'ID-3',
            name: 'Club C'
          }
        ],
        nextToken: 'next-token'
      });
    });
  });

  describe('nextClubsReceived', () => {
    it('should fetch clubs and append them to the state', () => {
      const state = {
        clubs: [
          {
            id: 'ID-1',
            name: 'Club A'
          },
          {
            id: 'ID-2',
            name: 'Club B'
          },
          {
            id: 'ID-3',
            name: 'Club C'
          }
        ],
        nextToken: 'next-token'
      };
      const action = nextClubsReceived({
        clubs: [
          {
            id: 'ID-4',
            name: 'Club D'
          },
          {
            id: 'ID-5',
            name: 'Club E'
          }
        ],
        nextToken: 'next-token-2'
      });
      const result = clubReducer(state, action);

      expect(result).toEqual({
        clubs: [
          {
            id: 'ID-1',
            name: 'Club A'
          },
          {
            id: 'ID-2',
            name: 'Club B'
          },
          {
            id: 'ID-3',
            name: 'Club C'
          },
          {
            id: 'ID-4',
            name: 'Club D'
          },
          {
            id: 'ID-5',
            name: 'Club E'
          }
        ],
        nextToken: 'next-token-2'
      });
    });
  });
});

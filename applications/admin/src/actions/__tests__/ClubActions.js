import {API, graphqlOperation} from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import history from '../../history';
import {setAlert} from '../AlertActions';
import {createClub, deleteClub, getClubs, getClubsReceived, nextClubs, nextClubsReceived, updateClub} from '../ClubActions';
import {loadingComplete, loadingStart} from '../LoaderActions';
import {setMessage} from '../MessageActions';

describe('ClubActions', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  describe('createClub', () => {
    let action;

    beforeEach(() => {
      action = createClub({
        name: 'Club A',
        twitterHandle: 'Club_A_OFFICIAL',
        website: 'https://www.club-a.com'
      });
    });

    describe('when successful', () => {
      beforeEach(() => {
        API.graphql.mockResolvedValueOnce({
          data: {
            createClub: {
              name: 'Club A'
            }
          }
        });
      });

      it('should start the loader', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingStart());
      });

      it('should execute the correct GraphQl mutation', async () => {
        await action(dispatch);

        expect(graphqlOperation).toHaveBeenCalledWith(mutations.createClub, {
          input: {
            name: 'Club A',
            twitterHandle: 'Club_A_OFFICIAL',
            website: 'https://www.club-a.com'
          }
        });
      });

      it('should display a message on successful execution', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(setMessage({
          message: 'Club A has been added!'
        }));
      });

      it('should redirect to the correct page', async () => {
        await action(dispatch);

        expect(history.push).toHaveBeenCalledWith('/clubs');
      });

      it('should stop the loader', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingComplete());
      });
    });

    describe('when unsuccessful', () => {
      beforeEach(() => {
        API.graphql.mockRejectedValueOnce({
          errors: [
            {
              message: 'Invalid name'
            },
            {
              message: 'Invalid website'
            }
          ]
        });
      });

      it('should start the loader', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingStart());
      });

      it('should display an alert if something does wrong', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(setAlert({
          message: [
            'Invalid name',
            'Invalid website'
          ],
          title: 'Unable to create club'
        }));
      });

      it('should stop the loader', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingComplete());
      });
    });
  });

  describe('deleteClub', () => {
    let action;

    beforeEach(() => {
      action = deleteClub('CLUB-ID');
    });

    describe('when successful', () => {
      beforeEach(() => {
        API.graphql.mockResolvedValueOnce({
          data: {
            deleteClub: {
              name: 'Club A'
            }
          }
        });
      });

      it('should start the loader', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingStart());
      });

      it('should execute the correct GraphQl mutation', async () => {
        await action(dispatch);

        expect(graphqlOperation).toHaveBeenCalledWith(mutations.deleteClub, {
          id: 'CLUB-ID'
        });
      });

      it('should display a message on successful execution', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(setMessage({
          message: 'Club A has been deleted!'
        }));
      });

      it('should redirect to the correct page', async () => {
        await action(dispatch);

        expect(history.push).toHaveBeenCalledWith('/clubs');
      });

      it('should stop the loader', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingComplete());
      });
    });

    describe('when unsuccessful', () => {
      beforeEach(() => {
        API.graphql.mockRejectedValueOnce({
          errors: [
            {
              message: 'Invalid ID'
            }
          ]
        });
      });

      it('should start the loader', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingStart());
      });

      it('should display an alert if something does wrong', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(setAlert({
          message: [
            'Invalid ID'
          ],
          title: 'Unable to delete club'
        }));
      });

      it('should stop the loader', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingComplete());
      });
    });
  });

  describe('getClubs', () => {
    let action;

    beforeEach(() => {
      action = getClubs(20);
    });

    describe('when successful', () => {
      beforeEach(() => {
        API.graphql.mockResolvedValueOnce({
          data: {
            getClubs: {
              clubs: [
                {
                  id: 'ID-1',
                  name: 'Club A'
                },
                {
                  id: 'ID-2',
                  name: 'Club B'
                }
              ],
              nextToken: null
            }
          }
        });
      });

      it('should start the loader', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingStart());
      });

      it('should execute the correct GraphQl query', async () => {
        await action(dispatch);

        expect(graphqlOperation).toHaveBeenCalledWith(queries.getClubs, {
          limit: 20
        });
      });

      it('should add the returned clubs to the state', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(getClubsReceived({
          clubs: [
            {
              id: 'ID-1',
              name: 'Club A'
            },
            {
              id: 'ID-2',
              name: 'Club B'
            }
          ],
          nextToken: null
        }));
      });

      it('should stop the loader', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingComplete());
      });
    });

    describe('when unsuccessful', () => {
      beforeEach(() => {
        API.graphql.mockRejectedValueOnce({
          errors: [
            {
              message: 'Something has gone wrong'
            }
          ]
        });
      });

      it('should start the loader', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingStart());
      });

      it('should display an alert if something does wrong', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(setAlert({
          message: [
            'Something has gone wrong'
          ],
          title: 'Unable to get clubs'
        }));
      });

      it('should stop the loader', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingComplete());
      });
    });
  });

  describe('nextClubs', () => {
    let action;

    beforeEach(() => {
      action = nextClubs(20, 'Next-Token-1');
    });

    describe('when successful', () => {
      beforeEach(() => {
        API.graphql.mockResolvedValueOnce({
          data: {
            getClubs: {
              clubs: [
                {
                  id: 'ID-1',
                  name: 'Club A'
                },
                {
                  id: 'ID-2',
                  name: 'Club B'
                }
              ],
              nextToken: 'Next-Token-2'
            }
          }
        });
      });

      it('should start the loader', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingStart());
      });

      it('should execute the correct GraphQl query', async () => {
        await action(dispatch);

        expect(graphqlOperation).toHaveBeenCalledWith(queries.getClubs, {
          limit: 20,
          nextToken: 'Next-Token-1'
        });
      });

      it('should add the returned clubs to the state', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(nextClubsReceived({
          clubs: [
            {
              id: 'ID-1',
              name: 'Club A'
            },
            {
              id: 'ID-2',
              name: 'Club B'
            }
          ],
          nextToken: 'Next-Token-2'
        }));
      });

      it('should stop the loader', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingComplete());
      });
    });

    describe('when unsuccessful', () => {
      beforeEach(() => {
        API.graphql.mockRejectedValueOnce({
          errors: [
            {
              message: 'Something has gone wrong'
            }
          ]
        });
      });

      it('should start the loader', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingStart());
      });

      it('should display an alert if something does wrong', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(setAlert({
          message: [
            'Something has gone wrong'
          ],
          title: 'Unable to get clubs'
        }));
      });

      it('should stop the loader', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingComplete());
      });
    });
  });

  describe('updateClub', () => {
    let action;

    beforeEach(() => {
      action = updateClub('ID-1', {
        name: 'Club A',
        twitterHandle: 'Club_A_OFFICIAL',
        website: 'https://www.club-a.com'
      });
    });

    describe('when successful', () => {
      beforeEach(() => {
        API.graphql.mockResolvedValueOnce({
          data: {
            updateClub: {
              name: 'Club A'
            }
          }
        });
      });

      it('should start the loader', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingStart());
      });

      it('should execute the correct GraphQl mutation', async () => {
        await action(dispatch);

        expect(graphqlOperation).toHaveBeenCalledWith(mutations.updateClub, {
          id: 'ID-1',
          input: {
            name: 'Club A',
            twitterHandle: 'Club_A_OFFICIAL',
            website: 'https://www.club-a.com'
          }
        });
      });

      it('should display a message on successful execution', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(setMessage({
          message: 'Club A has been updated!'
        }));
      });

      it('should redirect to the correct page', async () => {
        await action(dispatch);

        expect(history.push).toHaveBeenCalledWith('/clubs');
      });

      it('should stop the loader', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingComplete());
      });
    });

    describe('when unsuccessful', () => {
      beforeEach(() => {
        API.graphql.mockRejectedValueOnce({
          errors: [
            {
              message: 'Invalid name'
            },
            {
              message: 'Invalid website'
            }
          ]
        });
      });

      it('should start the loader', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingStart());
      });

      it('should display an alert if something does wrong', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(setAlert({
          message: [
            'Invalid name',
            'Invalid website'
          ],
          title: 'Unable to update club'
        }));
      });

      it('should stop the loader', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingComplete());
      });
    });
  });
});

import {API, graphqlOperation} from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import history from '../../history';
import {setAlert} from '../AlertActions';
import {loadingComplete, loadingStart} from '../LoaderActions';
import {setMessage} from '../MessageActions';
import {
  createSource,
  deleteSource,
  getSources,
  getSourcesReceived,
  nextSources,
  nextSourcesReceived,
  updateSource
} from '../SourceActions';

describe('SourceActions', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  describe('createSource', () => {
    let action;

    beforeEach(() => {
      action = createSource('CLUB-ID', {
        description: 'description',
        feed: 'https://www.source.com/feed.rss',
        image: {
          property: 'media:content',
          value: '$.url'
        },
        link: 'link',
        name: 'Source',
        publishDate: 'pubDate',
        title: 'title'
      });
    });

    describe('when successful', () => {
      beforeEach(() => {
        API.graphql.mockResolvedValueOnce({
          data: {
            createSource: {
              name: 'Source'
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

        expect(graphqlOperation).toHaveBeenCalledWith(mutations.createSource, {
          clubId: 'CLUB-ID',
          input: {
            description: 'description',
            feed: 'https://www.source.com/feed.rss',
            image: {
              property: 'media:content',
              value: '$.url'
            },
            link: 'link',
            name: 'Source',
            publishDate: 'pubDate',
            title: 'title'
          }
        });
      });

      it('should display a message on successful execution', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(setMessage({
          message: 'Source has been added!'
        }));
      });

      it('should redirect to the correct page', async () => {
        await action(dispatch);

        expect(history.push).toHaveBeenCalledWith('/clubs/CLUB-ID/sources');
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
              message: 'Invalid publishDate'
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
            'Invalid publishDate'
          ],
          title: 'Unable to create source'
        }));
      });

      it('should stop the loader', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingComplete());
      });
    });
  });

  describe('deleteSource', () => {
    let action;

    beforeEach(() => {
      action = deleteSource('SOURCE-ID', 'CLUB-ID');
    });

    describe('when successful', () => {
      beforeEach(() => {
        API.graphql.mockResolvedValueOnce({
          data: {
            deleteSource: {
              name: 'Source'
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

        expect(graphqlOperation).toHaveBeenCalledWith(mutations.deleteSource, {
          clubId: 'CLUB-ID',
          id: 'SOURCE-ID'
        });
      });

      it('should display a message on successful execution', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(setMessage({
          message: 'Source has been deleted!'
        }));
      });

      it('should redirect to the correct page', async () => {
        await action(dispatch);

        expect(history.push).toHaveBeenCalledWith('/clubs/CLUB-ID/sources');
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
          title: 'Unable to delete source'
        }));
      });

      it('should stop the loader', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingComplete());
      });
    });
  });

  describe('getSources', () => {
    let action;

    beforeEach(() => {
      action = getSources('CLUB-ID', 20);
    });

    describe('when successful', () => {
      beforeEach(() => {
        API.graphql.mockResolvedValueOnce({
          data: {
            getSources: {
              nextToken: null,
              sources: [
                {
                  id: 'ID-1',
                  name: 'Source A'
                },
                {
                  id: 'ID-2',
                  name: 'Source B'
                }
              ]
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

        expect(graphqlOperation).toHaveBeenCalledWith(queries.getSources, {
          clubId: 'CLUB-ID',
          limit: 20
        });
      });

      it('should add the returned clubs to the state', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(getSourcesReceived({
          nextToken: null,
          sources: [
            {
              id: 'ID-1',
              name: 'Source A'
            },
            {
              id: 'ID-2',
              name: 'Source B'
            }
          ]
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
          title: 'Unable to get sources'
        }));
      });

      it('should stop the loader', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingComplete());
      });
    });
  });

  describe('nextSources', () => {
    let action;

    beforeEach(() => {
      action = nextSources('CLUB-ID', 20, 'Next-Token-1');
    });

    describe('when successful', () => {
      beforeEach(() => {
        API.graphql.mockResolvedValueOnce({
          data: {
            getSources: {
              nextToken: 'Next-Token-2',
              sources: [
                {
                  id: 'ID-1',
                  name: 'Source A'
                },
                {
                  id: 'ID-2',
                  name: 'Source B'
                }
              ]
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

        expect(graphqlOperation).toHaveBeenCalledWith(queries.getSources, {
          clubId: 'CLUB-ID',
          limit: 20,
          nextToken: 'Next-Token-1'
        });
      });

      it('should add the returned clubs to the state', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(nextSourcesReceived({
          nextToken: 'Next-Token-2',
          sources: [
            {
              id: 'ID-1',
              name: 'Source A'
            },
            {
              id: 'ID-2',
              name: 'Source B'
            }
          ]
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
          title: 'Unable to get sources'
        }));
      });

      it('should stop the loader', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingComplete());
      });
    });
  });

  describe('updateSource', () => {
    let action;

    beforeEach(() => {
      action = updateSource('ID-1', 'CLUB-ID', {
        description: 'description',
        feed: 'https://www.source.com/feed.rss',
        image: {
          property: 'media:content',
          value: '$.url'
        },
        link: 'link',
        name: 'Source',
        publishDate: 'pubDate',
        title: 'title'
      });
    });

    describe('when successful', () => {
      beforeEach(() => {
        API.graphql.mockResolvedValueOnce({
          data: {
            updateSource: {
              name: 'Source'
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

        expect(graphqlOperation).toHaveBeenCalledWith(mutations.updateSource, {
          clubId: 'CLUB-ID',
          id: 'ID-1',
          input: {
            description: 'description',
            feed: 'https://www.source.com/feed.rss',
            image: {
              property: 'media:content',
              value: '$.url'
            },
            link: 'link',
            name: 'Source',
            publishDate: 'pubDate',
            title: 'title'
          }
        });
      });

      it('should display a message on successful execution', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(setMessage({
          message: 'Source has been updated!'
        }));
      });

      it('should redirect to the correct page', async () => {
        await action(dispatch);

        expect(history.push).toHaveBeenCalledWith('/clubs/CLUB-ID/sources');
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
              message: 'Invalid feed'
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
            'Invalid feed'
          ],
          title: 'Unable to update source'
        }));
      });

      it('should stop the loader', async () => {
        await action(dispatch);

        expect(dispatch).toHaveBeenCalledWith(loadingComplete());
      });
    });
  });
});

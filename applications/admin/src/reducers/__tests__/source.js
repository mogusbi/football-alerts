import {getSourcesReceived, nextSourcesReceived} from '../../actions/SourceActions';
import {sourceReducer, initialState} from '../source';

describe('sourceReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {};
      const result = sourceReducer(undefined, action);

      expect(result).toEqual(initialState);
    });
  });

  describe('getSourcesReceived', () => {
    it('should fetch sources and save them to the state', async () => {
      const action = getSourcesReceived({
        nextToken: 'next-token',
        sources: [
          {
            id: 'ID-1',
            name: 'Source A'
          },
          {
            id: 'ID-2',
            name: 'Source B'
          },
          {
            id: 'ID-3',
            name: 'Source C'
          }
        ]
      });
      const result = sourceReducer(initialState, action);

      expect(result).toEqual({
        nextToken: 'next-token',
        sources: [
          {
            id: 'ID-1',
            name: 'Source A'
          },
          {
            id: 'ID-2',
            name: 'Source B'
          },
          {
            id: 'ID-3',
            name: 'Source C'
          }
        ]
      });
    });
  });

  describe('nextSourcesReceived', () => {
    it('should fetch sources and append them to the state', () => {
      const state = {
        nextToken: 'next-token',
        sources: [
          {
            id: 'ID-1',
            name: 'Source A'
          },
          {
            id: 'ID-2',
            name: 'Source B'
          },
          {
            id: 'ID-3',
            name: 'Source C'
          }
        ]
      };
      const action = nextSourcesReceived({
        nextToken: 'next-token-2',
        sources: [
          {
            id: 'ID-4',
            name: 'Source D'
          },
          {
            id: 'ID-5',
            name: 'Source E'
          }
        ]
      });
      const result = sourceReducer(state, action);

      expect(result).toEqual({
        nextToken: 'next-token-2',
        sources: [
          {
            id: 'ID-1',
            name: 'Source A'
          },
          {
            id: 'ID-2',
            name: 'Source B'
          },
          {
            id: 'ID-3',
            name: 'Source C'
          },
          {
            id: 'ID-4',
            name: 'Source D'
          },
          {
            id: 'ID-5',
            name: 'Source E'
          }
        ]
      });
    });
  });
});

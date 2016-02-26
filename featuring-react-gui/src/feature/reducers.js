import featureBoardReducer from 'app/feature/FeatureBoardReducer';

export default function featureReducer(state={}, action) {
  return {
    board: featureBoardReducer(state.board, action)
  };
}

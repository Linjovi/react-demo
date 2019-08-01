var initialReposState: any[] = [];
export function _repos(state = initialReposState, action: any) {
  switch (action.type) {
    case "GET_REPOS":
      return action.repos;
    case "GET_STATUS":
      let index = state.findIndex(
        (item: any) => item.name === action.repo.name
      );
      let [...newState] = state;
      newState[index].status = action.repo.status;
      // console.log("new",newState[0].status)
      return newState;
    default:
      return state;
  }
}

import {
  LOADER_END,
  LOADER_START,
} from "./loaderType";

const loader = {
  status: false
};

const loaderReducer = (state = JSON.parse(JSON.stringify(loader)), {type, payload}) => {
  switch (type) {
    case `${LOADER_START}`: {
      return {
        ...state, loader: {
          ...state.loader, status: true
        }
      }
    }

    case `${LOADER_END}`: {
      return {
        ...state, loader: {
          ...state.loader, status: false
        }
      }
    }

    default : {
      return state;
    }
  }
};

export default loaderReducer;
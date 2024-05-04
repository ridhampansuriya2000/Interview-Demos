import {
  GET_DATA
} from "./DashboardType";

const data = {
  data: []
};

const dashboardReducer = (state = JSON.parse(JSON.stringify(data)), {type, payload}) => {
  switch (type) {
    case `${GET_DATA}_FETCHING`: {
      return {
        ...state
      }
    }

    case `${GET_DATA}_SUCCESS`: {
      return {
        ...state, data: [...state.data,...payload]
      }
    }

    case `${GET_DATA}_FAILED`: {
      return {
        ...state,
      }
    }

    default : {
      return state;
    }
  }
};

export default dashboardReducer;
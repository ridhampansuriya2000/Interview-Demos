import { GET_DATA } from "./DashboardType";

// export const getDashboardData = (data) => async (dispatch) => {
//   dispatch({
//     type: GET_DATA,
//     payload : data
//   })
// };

export const getDashboardData = data => ({
  type: GET_DATA,
  toasterString: `Waiting for new data.`,
  isHttpAction: true,
  url: `/launches/?${data.apiParams}`,
  method: 'GET',
  accessAndContentHeaders:false,
  // body: data.payload,
  callBackFun: data.callBackFun
});
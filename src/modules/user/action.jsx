import axios from 'axios';
import ActionTypes from './actionTypes';
import { ApiServer } from '../../Defaults';

const createUser = user => ({
  type: ActionTypes.CREATE_USER,
  payload: user,
});

const modifyUser = user => ({
  type: ActionTypes.MODIFY_USER,
  payload: user,
});

const removeUser = () => ({
  type: ActionTypes.REMOVE_USER,
  payload: {},
});

const removeSavedCar = carVin => function (dispatch) {
  dispatch({
    type: ActionTypes.REMOVE_SAVED_CAR_REQUESTED,
    payload: {},
  });

  return axios.delete(`${ApiServer}/api/v1/car/delete?vin=${carVin}`)
    .then((data) => {
      dispatch({
        type: ActionTypes.REMOVE_SAVED_CAR_RECEIVED,
        payload: carVin,
      });
      return data;
    });
};

const addSavedCar = carVin => function (dispatch) {
  dispatch({
    type: ActionTypes.ADD_SAVED_CAR_REQUESTED,
    payload: {},
  });

  return axios.post(`${ApiServer}/api/v1/car/save`, { vin: carVin })
    .then((data) => {
      const withPhoto = {
        ...data.data.car.car_information,
        ...data.data.car.sale_information,
        photo: `${ApiServer}/${data.data.car.car_information.images[0].f1.replace('public/', '')}`,
      };

      dispatch({
        type: ActionTypes.ADD_SAVED_CAR_RECEIVED,
        payload: withPhoto,
      });
      return withPhoto;
    });
};

const fetchSavedCars = () => function (dispatch) {
  dispatch({
    type: ActionTypes.SAVED_CARS_REQUESTED,
    payload: {},
  });

  return axios.get(`${ApiServer}/api/v1/user/saved_cars`)
    .then(
      (data) => {
        // Sample purposes
        const withPhoto = data.data.cars.map(car => ({
          ...car,
          photo: `${ApiServer}/${car.car_images[0].f1.replace('public/', '')}`,
        }));
        dispatch({
          type: ActionTypes.SAVED_CARS_RECEIVED,
          payload: withPhoto,
        });
        return withPhoto;
      },
      error => console.log(error.response),
    );
};

const modifyUserImage = photo => function (dispatch) {
  dispatch({
    type: ActionTypes.USER_IMAGE_CHANGE,
    payload: {},
  });

  const imageData = new FormData();
  imageData.append('photo', photo, photo.name);

  console.log('BEFORE REQUEST >>>>>>>> >>> Form data >>>');
  console.log(imageData, photo);

  return axios.post(`${ApiServer}/api/v1/user/photo`, imageData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Content-Disposition': 'form-data',
    },
  }).then((data) => {
    dispatch({
      type: ActionTypes.USER_IMAGE_CHANGE_SUCCESS,
      payload: `${ApiServer}/${data.data.photo_url}`,
    });
    return `${ApiServer}/${data.data.photo_url}`;
  }, (err) => {
    dispatch({
      type: ActionTypes.USER_IMAGE_CHANGE_ERROR,
      payload: photo,
    });
    return photo;
  });
};

const updateDealerLogo = logo => function (dispatch) {
  dispatch({
    type: ActionTypes.DEALER_LOGO_CHANGE,
    payload: {},
  });

  const imageData = new FormData();
  imageData.append('logo', logo, logo.name);

  return axios.post(`${ApiServer}/api/v1/user/dealers/logo`, imageData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Content-Disposition': 'form-data',
    },
  }).then((data) => {
    dispatch({
      type: ActionTypes.DEALER_LOGO_CHANGE_SUCCESS,
      payload: `${ApiServer}/${data.data.logo_url}`,
    });
    return `${ApiServer}/${data.data.logo_url}`;
  }, (err) => {
    dispatch({
      type: ActionTypes.DEALER_LOGO_CHANGE_ERROR,
      payload: logo,
    });
    return logo;
  });
};

export default {
  createUser,
  modifyUser,
  removeUser,
  fetchSavedCars,
  removeSavedCar,
  addSavedCar,
  updateDealerLogo,
  modifyUserImage,
};

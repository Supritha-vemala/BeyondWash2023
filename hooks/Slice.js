import { createSlice } from '@reduxjs/toolkit';

export const mainSlicer = createSlice({
  name: 'allReducer',
  initialState: {
    isAuthenticated: false,
    LoggedInUserData: {},
    isDrawerOpen: true,
    selectedCarType: {},
    selectedPlan: '',
    MarkerLocation: '',
    userBookings: [],
    adminBookings: [],
    isCacheThere: false,
    bookingModal: {
      status: false,
      dateSelected: {}
    },
    AdminBookingModal: {
      status: false,
      dateSelected: {}
    }
  },
  reducers: {
    LoginReducerUpdate: (state, action) => {
      state.LoggedInUserData = action.payload.userDetails;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    isDrawerOpen: (state, action) => {
      state.isDrawerOpen = action.payload;
    },
    SelectedCarType: (state, action) => {
      state.selectedCarType = action.payload;
    },
    selectedPlanType: (state, action) => {
      state.selectedPlan = action.payload;
    },
    selectedMarkerLocation: (state, action) => {
      state.MarkerLocation = action.payload;
    },
    userBookingsReducer: (state, action) => {
      state.userBookings = action.payload;
    },
    bookingModalReducer: (state, action) => {
      state.bookingModal.status = action.payload.status;
      state.bookingModal.dateSelected = action.payload.dateSelected;
    },
    adminBookingModalReducer: (state, action) => {
      state.AdminBookingModal = action.payload;
    }
  }
});

export const {
  LoginReducerUpdate,
  isDrawerOpen,
  SelectedCarType,
  selectedPlanType,
  selectedMarkerLocation,
  userBookingsReducer,
  bookingModalReducer,
  adminBookingModalReducer
} = mainSlicer.actions;

const mainReducer = mainSlicer.reducer;

export default mainReducer;

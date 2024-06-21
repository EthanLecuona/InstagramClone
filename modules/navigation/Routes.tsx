import * as MediaLibrary from "expo-media-library";

export type AuthRoutes = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  RemoveAccount: undefined;
  Password: undefined;
  OTP: undefined;
};

export type HomeRoutes = {
  StackHome: undefined;
  Notifications: undefined;
  Messages: undefined;
};

export type ProfileRoutes = {
  StackProfile: undefined;
  Settings: undefined;
};

export type SearchRoutes = {
  StackSearch: undefined;
};

export type PostRoutes = {
  SelectImage: undefined;
  EditImage: undefined | { image: MediaLibrary.Asset };
};

export type ReelRoutes = {
  StackReels: undefined;
};

export type BottomTabRoutes = {
  Home: undefined;
  Search: undefined;
  Post: undefined;
  Reels: undefined;
  Profile: undefined;
};

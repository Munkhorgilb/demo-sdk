export type UserProfile = {
  name: string;
  email: string;
};

export type RootStackParamList = {
  Home: undefined;
  Profile: { user: UserProfile };
};

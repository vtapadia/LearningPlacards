export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Practice: undefined;
  Data: undefined;
};

export type PracticeParamList = {
  PracticeScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type DictionaryItem = {
  known: string;
  unknown: string
}

export type Dictionary = Array<DictionaryItem>
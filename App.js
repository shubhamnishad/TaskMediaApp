import React from 'react';

import { GlobalProvider } from './src/context/context';

import MainNavigator from './src/MainNavigator/MainNavigator';

export default function App() {
  // const { photos, addPhoto } = useContext(GlobalContext);
  return <GlobalProvider>
    <MainNavigator></MainNavigator>
  </GlobalProvider>
}

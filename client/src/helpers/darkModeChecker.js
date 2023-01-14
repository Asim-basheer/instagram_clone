import { useContext } from 'react';
import { DarkModeContext } from '../context/darkMoodContext';

export const DarkModeChecker = () => {
  const { darkMode } = useContext(DarkModeContext);

  if (darkMode) {
    return 'dark';
  } else {
    return 'light';
  }
};

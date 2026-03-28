import { useState } from 'react';

import { createTheme } from '@mui/material';

import Dark from './dark';
import Light from './light';

const useThemeRoot = () => {
  const [Mode] = useState(true);

  const theme = () => createTheme(Mode ? Light : Dark);

  return theme;
};

export default useThemeRoot;

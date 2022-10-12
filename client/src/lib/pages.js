import About from '../pages/About';
import Cards from '../pages/Cards';
import Home from '../pages/Home';

export const pages = [
  {
    name: 'Home',
    path: '/',
    biz: false,
    element: <Home />,
  },
  {
    name: 'My Cards',
    path: '/my-cards',
    nested: '/my-cards/*',
    biz: true,
    element: <Cards />,
  },
  {
    name: 'About',
    path: '/about',
    biz: false,
    element: <About />,
  },
];

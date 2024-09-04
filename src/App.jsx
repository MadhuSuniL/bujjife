import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthWrapper from './Components/Auth/AuthWraper';
import UnauthWrapper from './Components/Auth/UnauthWrapper';
import GetStarted from './pages/GetStarted';
import NotFound from './pages/NotFound';
import BujjiLayout from './BujjiLayout';
import Store from './redux/Store';
import { Provider } from 'react-redux'
import Bujji from './pages/Bujji';
// import CurrentTopic from './pages/CurrentTopic';
// import TopicWrapper from './Components/Topics/TopicWrapper';
import Test from './pages/Test';


export default function App() {
  return (
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
  )
}


const router = createBrowserRouter([
  {
    path: '/',
    Component: BujjiLayout,
    children: [
      {
        index: true,
        // Component: Bujji
        Component: AuthWrapper(Bujji)
      },
      {
        path: 'test',
        Component: AuthWrapper(Test)
      },
      {
        path: '/t/:topic_id',
        Component: AuthWrapper(Bujji),
      },
    ]
  },
  {
    path: '/get-started',
    Component: UnauthWrapper(GetStarted)
  },
  {
    path: '*',
    Component: NotFound
  }
])
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import EventsPage, { loader as eventsLoader } from './components/pages/Events';
import ErrorPage from './components/pages/ErrorPages';
import EventDetails, { loader as eventDetailsLoader } from './components/pages/EventDetails';
import RootLayout from './components/pages/RootLayout';
import NewEventPage from './components/pages/NewEventPage';
import EditEventPage from './components/pages/EditEventPage';
import EventsRootLayout from './components/pages/EventsRootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events', element: <EventsRootLayout />, children: [
          {
            index: true, element: <EventsPage />, loader: eventsLoader
          },
          { path: 'new', element: <NewEventPage /> },
          {
            path: ':eventId', children: [
              { index: true, element: <EventDetails />, loader: eventDetailsLoader },
              { path: 'edit', element: <EditEventPage />, loader: eventDetailsLoader },
            ]
          },
        ]
      },
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

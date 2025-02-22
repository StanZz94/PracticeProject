import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import EventsPage, { loader as eventsLoader } from './components/pages/Events';
import ErrorPage from './components/pages/ErrorPages';
import EventDetails from './components/pages/EventDetails';
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
          { path: ':eventId', element: <EventDetails /> },
          { path: ':eventId/edit', element: <EditEventPage /> },
        ]
      },
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

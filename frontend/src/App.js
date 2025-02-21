import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import EventsPage from './components/pages/Events';
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
            index: true, element: <EventsPage />, loader: async () => {
              const response = await fetch('http://localhost:8081/events');

              if (!response.ok) {
                // set arror
              } else {
                const resData = await response.json();
                return resData.events
              }
            }
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

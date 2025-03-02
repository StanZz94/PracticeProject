import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import EventsPage, { loader as eventsLoader } from './components/pages/Events';
import ErrorPage from './components/pages/ErrorPages';
import EventDetails, { loader as eventDetailsLoader, action as deleteEventAction } from './components/pages/EventDetails';
import RootLayout from './components/pages/RootLayout';
import NewEventPage from './components/pages/NewEventPage';
import { action as manipulateEventAction } from './components/EventForm';
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
          { path: 'new', element: <NewEventPage />, action: manipulateEventAction },
          {
            path: ':eventId', id: 'event-details', 
            loader: eventDetailsLoader,
             children: [
              { index: true, action: deleteEventAction, element: <EventDetails /> },
              { path: 'edit', element: <EditEventPage />, action: manipulateEventAction },
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

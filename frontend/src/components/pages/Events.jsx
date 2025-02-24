import { useLoaderData } from 'react-router-dom';
import EventsList from '../EventsList';

function EventsPage() {
  const data = useLoaderData();
  const events = data.events;

  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export async function loader() {
  const response = await fetch('http://localhost:8081/events');

  if (!response.ok) {
    // set arror
  } else {
    return response
  }
}

export default EventsPage;
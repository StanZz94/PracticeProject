import { useLoaderData } from 'react-router-dom';
import EventsList from '../EventsList';

function EventsPage() {
  const events = useLoaderData();

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
    const resData = await response.json();
    return resData.events
  }
}

export default EventsPage;
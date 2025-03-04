import { useLoaderData, Await } from 'react-router-dom';
import EventsList from '../EventsList';
import { Suspense } from 'react';

function EventsPage() {
  const { events } = useLoaderData();

  return <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
    <Await resolve={events}>
      {(loadedEvents) => <EventsList events={loadedEvents} />}
    </Await>
  </Suspense>
}


async function loadEvents() {
  const response = await fetch('http://localhost:8083/events');

  if (!response.ok) {
    // return {isError: true, message: 'Could not fetch events!'}
    throw new Response(JSON.stringify({ message: 'Cloud not fetch events!' }), {
      status: 500,
    });
    //return json({ message: 'Cloud not fetch events!' },
    //  { status: 500, }
    //)
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader() {
  return {
    events: loadEvents(),
  };
}

export default EventsPage;
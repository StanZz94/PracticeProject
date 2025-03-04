import { useRouteLoaderData, redirect, Await } from 'react-router-dom';
import EventItem from '../EventItem'
import EventsList from '../EventsList';
import { Suspense } from 'react';

export default function EventDetails() {
  const { event, events } = useRouteLoaderData('event-details');

  return <>
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={event}>
        {(loadedEvent) => <EventItem event={loadedEvent} />}
      </Await>
    </Suspense>
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  </>
}

async function loadEvent(id) {
  const response = await fetch('http://localhost:8083/events/' + id);

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Cloud not fetch events!' }), {
      status: 500,
    });

  } else {
    const resData = await response.json();
    return resData.events;
  }
}

async function loadEvents() {
  const response = await fetch('http://localhost:8083/events');

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Cloud not fetch events!' }), {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({ request, params }) {
  const id = params.eventId;

  return {
    event: await loadEvent(id),
    events: loadEvents(),
  };
}

export async function action({ request, params }) {
  const eventId = params.eventId;
  const response = await fetch('http://localhost:8083/events/' + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Cloud not delete event!' }), {
      status: 500,
    });
  }

  return redirect('/events');
}
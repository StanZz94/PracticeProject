import { useRouteLoaderData, redirect } from 'react-router-dom';
import EventItem from '../EventItem'

export default function EventDetails() {
    const data = useRouteLoaderData('event-details');

    return <>
        <EventItem event={data.event} />
    </>
}

export async function loader({ request, params }) {
    const id = params.eventId;
    const response = await fetch('http://localhost:8083/events/' + id);

    if (!response.ok) {
        // return {isError: true, message: 'Could not fetch events!'}
        throw new Response(JSON.stringify({ message: 'Cloud not fetch events!' }), {
            status: 500,
        });
        //return json({ message: 'Cloud not fetch events!' },
        //  { status: 500, }
        //)
    } else {
        return response;
    }
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
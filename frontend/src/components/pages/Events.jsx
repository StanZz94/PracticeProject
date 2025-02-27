import { useLoaderData } from 'react-router-dom';
import EventsList from '../EventsList';

function EventsPage() {
  const data = useLoaderData();

  if (data.isError) {
    return <p>{data.message}</p>
  }

  const events = data.events;
  

  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export async function loader() {
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
    return response
  }
}

export default EventsPage;
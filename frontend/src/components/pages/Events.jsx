import EventsList from '../EventsList';

function EventsPage() {
  return (
    <>
      <EventsList events={fetchedEvents} />
    </>
  );
}

export default EventsPage;
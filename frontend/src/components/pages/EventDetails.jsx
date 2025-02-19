import { useParams } from 'react-router-dom';

export default function EventDetails() {
    const params = useParams();

    return <>
        <h1>Event Details</h1>
        <p>Event ID: {params.eventId}</p>
    </>
}
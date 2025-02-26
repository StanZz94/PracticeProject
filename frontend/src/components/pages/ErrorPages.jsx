import { useRouteError } from "react-router-dom";
import PageContent from "../PageContent";
import MainNavigation from "../MainNavigation";

export default function ErrorPage() {
    const error = useRouteError();

    let title = 'An error occurred!';
    let message = 'Something went wrong!';

    if (error.status === 500) {
        message = error.data.massage
    }

    if (error.status === 404) {
        title = 'Not found!';
        message = 'Could not find resource or page.';
    }

    return <>
        <MainNavigation />
        <PageContent title={title} ><p>{message}</p></PageContent>
    </>
}
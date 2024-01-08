
//export { default } from "~/old-app/App";

// Import the components used in your routes
import PageNotFound from '../old-app/components/PageNotFound';
import Counter from '../old-app/components/CounterLegacy';

import { ClientOnly } from 'remix-utils/client-only';
import { ServerOnly } from 'remix-utils/server-only';
import { useHydrated } from 'remix-utils/use-hydrated';



export default function MovieIdIndex() {
    const hydrated = useHydrated();
    return (
        <>
            <PageNotFound></PageNotFound>
        </>
    );
}
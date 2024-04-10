import Readlist from "@/components/readlist";
import { getSession } from "@/lib/session";

export default function Page() {
    const { user } = getSession();

    if (!user) throw new Error();

    return <Readlist readerId={user?.id} />
}
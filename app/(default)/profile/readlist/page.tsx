import Readlist from "@/components/readlist";
import { getSession } from "@/lib/session";

export default async function Page() {
    const { user } = await getSession();

    if (!user) throw new Error();

    return <Readlist readerId={user?.id} />
}
import { Skeleton } from "@infinityfx/fluid";

export default function LoadingBooks({ count }: { count: number; }) {

    return <>
        {new Array(count).fill(0).map((_, i) => <Skeleton key={i} style={{ aspectRatio: 0.615 }} />)}
    </>;
}
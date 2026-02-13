import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
    return (
        <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader className="gap-2">
                <Skeleton className="h-5 w-1/3 bg-zinc-800" />
                <Skeleton className="h-4 w-2/3 bg-zinc-800/60" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-20 w-full bg-zinc-800/40 rounded-md" />
            </CardContent>
        </Card>
    );
}

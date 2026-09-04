interface SkeletonProps {
    className?: string
}

function Skeleton({ className }: SkeletonProps) {
    return (
        <div className={`animate-pulse rounded-md bg-border ${className ?? ""}`} />
    )
}

export default Skeleton
import { Blog } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BlogCardProps {
    blog: Blog;
    isSelected?: boolean;
    onClick: (id: string) => void;
}

export function BlogCard({ blog, isSelected, onClick }: BlogCardProps) {
    return (
        <div
            className={cn(
                "cursor-pointer group relative p-5 bg-white rounded-xl border transition-all duration-200 border-transparent hover:shadow-md",
                isSelected
                    ? "border-l-4 border-l-primary shadow-sm ring-1 ring-primary/5 bg-primary/5"
                    : "hover:border-border"
            )}
            onClick={() => onClick(blog.id)}
        >
            <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-wider text-primary uppercase flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                        {blog.category[0]}
                    </span>
                </div>
                <span className="text-[10px] text-muted-foreground font-medium">
                    2 days ago
                </span>
            </div>

            <h3 className={cn(
                "font-bold text-base leading-snug mb-2 text-slate-800 group-hover:text-primary transition-colors",
                isSelected && "text-primary"
            )}>
                {blog.title}
            </h3>

            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                {blog.description}
            </p>

            <div className="flex gap-2">
                <Badge variant="secondary" className="h-5 px-2 text-[10px] font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 border-0 rounded-md">
                    Featured
                </Badge>
            </div>
        </div>
    );
}

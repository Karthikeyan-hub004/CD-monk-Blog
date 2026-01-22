import { useQuery } from "@tanstack/react-query";
import { getBlog } from "@/api/blogs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface BlogDetailProps {
    blogId: string | null;
}

export function BlogDetail({ blogId }: BlogDetailProps) {
    const { data: blog, isLoading, error } = useQuery({
        queryKey: ["blog", blogId],
        queryFn: () => getBlog(blogId!),
        enabled: !!blogId,
    });

    if (!blogId) {
        return (
            <div className="h-full flex items-center justify-center text-muted-foreground p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <div className="max-w-xs">
                    <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                        <span className="text-2xl">👈</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">No Blog Selected</h3>
                    <p className="text-sm text-slate-500">Select an article from the list to start reading.</p>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return <BlogDetailSkeleton />;
    }

    if (error) {
        return (
            <div className="h-full flex items-center justify-center text-destructive p-8">
                Failed to load blog details.
            </div>
        );
    }

    if (!blog) return null;

    return (
        <div className="h-full flex flex-col overflow-y-auto pr-2 custom-scrollbar pb-10">
            {/* Hero Image */}
            <div className="relative aspect-[2/1] w-full rounded-2xl overflow-hidden bg-slate-100 mb-8 shadow-sm">
                <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="max-w-3xl mx-auto w-full">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4 text-xs font-bold tracking-wider uppercase text-primary">
                        <span>{blog.category[0]}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-slate-500 font-medium normal-case tracking-normal">5 min read</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.15]">
                        {blog.title}
                    </h1>

                    <button className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
                        Share Article
                    </button>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-3 gap-4 p-6 bg-slate-50 rounded-xl mb-10 border border-slate-100">
                    <div className="text-center">
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Category</p>
                        <p className="text-sm font-semibold text-slate-700">{blog.category.join(" & ")}</p>
                    </div>
                    <div className="text-center border-l border-slate-200">
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Read Time</p>
                        <p className="text-sm font-semibold text-slate-700">5 Mins</p>
                    </div>
                    <div className="text-center border-l border-slate-200">
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Date</p>
                        <p className="text-sm font-semibold text-slate-700">{new Date(blog.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                </div>

                {/* Content */}
                <div className="prose prose-slate max-w-none prose-headings:font-bold prose-p:text-slate-600 prose-p:leading-8 prose-li:text-slate-600">
                    <p className="text-lg leading-relaxed text-slate-700 mb-8 font-medium">
                        {blog.description}
                    </p>

                    {/* Mock Content Structure based on image */}
                    {blog.content.split('\n\n').map((paragraph, idx) => (
                        <div key={idx}>
                            {idx === 1 && (
                                <blockquote className="p-6 my-8 bg-primary/5 rounded-xl border-l-4 border-primary text-slate-700 font-medium italic relative">
                                    "The accountant of the future will be a data scientist, a storyteller, and a strategic partner, all rolled into one."
                                </blockquote>
                            )}
                            <p className="mb-6">{paragraph}</p>

                        </div>
                    ))}
                </div>

                {/* Author Section */}
                <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200">
                            <img src="https://ui-avatars.com/api/?name=Arjun+Mehta&background=0D8ABC&color=fff" alt="Author" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Written by</p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-sm font-bold text-slate-900">Arjun Mehta</p>
                                <span className="text-xs text-slate-400">Senior Financial Analyst</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-slate-400">
                        <button className="hover:text-primary transition-colors"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg></button>
                        <button className="hover:text-primary transition-colors"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BlogDetailSkeleton() {
    return (
        <div className="space-y-6">
            <Skeleton className="aspect-video w-full rounded-lg" />
            <div className="space-y-4">
                <div className="flex gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
                <div className="space-y-2 pt-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </div>
        </div>
    )
}

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "@/api/blogs";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogDetail } from "@/components/blog/BlogDetail";
import { CreateBlogForm } from "@/components/blog/CreateBlog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function BlogDashboard() {
    const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const { data: blogs, isLoading, error } = useQuery({
        queryKey: ["blogs"],
        queryFn: getBlogs,
    });

    const filteredBlogs = blogs?.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleCreateClick = () => {
        setIsCreating(true);
        setSelectedBlogId(null);
    };

    const handleBlogClick = (id: string) => {
        setSelectedBlogId(id);
        setIsCreating(false);
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header />

            <main className="flex-1 flex flex-col container mx-auto px-4 py-8 max-w-7xl">
                {/* Page Hero */}
                <div className="text-center mb-12 space-y-2">
                    <h1 className="text-4xl font-black tracking-tight text-slate-900">CA Monk Blog</h1>
                    <p className="text-slate-500 font-medium max-w-2xl mx-auto">
                        Stay updated with the latest trends in finance, accounting, and career growth
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start flex-1 min-h-0">
                    {/* Left Sidebar - Blog List */}
                    <div className="w-full lg:w-[380px] flex flex-col shrink-0 lg:h-[calc(100vh-250px)]">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-slate-800">Latest Articles</h2>
                            <Button size="sm" onClick={handleCreateClick} variant="outline" className="h-8 text-xs">
                                <PlusCircle className="mr-1.5 h-3.5 w-3.5" />
                                New
                            </Button>
                        </div>

                        <div className="relative mb-6">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                type="search"
                                placeholder="Search articles..."
                                className="pl-9 bg-white border-slate-200 focus-visible:ring-primary"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar pb-4">
                            {isLoading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <div key={i} className="flex flex-col space-y-3 p-4 border rounded-xl bg-white">
                                        <Skeleton className="h-4 w-1/3" />
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-16 w-full" />
                                    </div>
                                ))
                            ) : error ? (
                                <div className="text-center text-destructive p-4">Failed to load blogs.</div>
                            ) : (
                                filteredBlogs?.map((blog) => (
                                    <BlogCard
                                        key={blog.id}
                                        blog={blog}
                                        isSelected={selectedBlogId === blog.id}
                                        onClick={handleBlogClick}
                                    />
                                ))
                            )}

                            {!isLoading && filteredBlogs?.length === 0 && (
                                <div className="text-center text-muted-foreground py-8">
                                    No articles found.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Panel - Reading Area */}
                    <div className="flex-1 w-full bg-white rounded-2xl shadow-sm border border-slate-100 h-full min-h-[600px] lg:h-[calc(100vh-250px)] overflow-hidden p-6 md:p-8">
                        {isCreating ? (
                            <CreateBlogForm onSuccess={() => setIsCreating(false)} />
                        ) : (
                            <BlogDetail blogId={selectedBlogId} />
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

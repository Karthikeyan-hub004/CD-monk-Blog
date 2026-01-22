import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createBlog } from "@/api/blogs"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    category: z.string().min(2, {
        message: "Category is required (comma separated)."
    }),
    coverImage: z.string().url({
        message: "Please enter a valid URL for the cover image."
    }),
    content: z.string().min(20, {
        message: "Content must be at least 20 characters.",
    }),
})

interface CreateBlogFormProps {
    onSuccess: () => void;
}

export function CreateBlogForm({ onSuccess }: CreateBlogFormProps) {
    const queryClient = useQueryClient()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            coverImage: "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg",
            content: "",
        },
    })

    const mutation = useMutation({
        mutationFn: createBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] })
            form.reset()
            onSuccess()
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Transform category string to array
        const payload = {
            ...values,
            category: values.category.split(',').map(c => c.trim().toUpperCase()).filter(c => c.length > 0)
        }
        mutation.mutate(payload)
    }

    return (
        <div className="h-full overflow-y-auto pr-2 custom-scrollbar p-1">
            <h2 className="text-2xl font-bold mb-6">Create New Blog</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Blog title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Short Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Brief summary of the blog post..."
                                        className="resize-none min-h-[80px]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categories</FormLabel>
                                    <FormControl>
                                        <Input placeholder="TECH, FINANCE (comma separated)" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Comma separated values (e.g. TECH, NEWS)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="coverImage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cover Image URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Write your blog content here..."
                                        className="min-h-[300px]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end pt-4">
                        <Button type="submit" size="lg" disabled={mutation.isPending}>
                            {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {mutation.isPending ? "Publishing..." : "Publish Blog"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

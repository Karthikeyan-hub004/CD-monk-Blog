import { apiClient } from "./client";
import { Blog, CreateBlogDTO } from "@/types";

export const getBlogs = async (): Promise<Blog[]> => {
    const response = await apiClient.get("/blogs");
    return response.data;
};

export const getBlog = async (id: string): Promise<Blog> => {
    const response = await apiClient.get(`/blogs/${id}`);
    return response.data;
};

export const createBlog = async (data: CreateBlogDTO): Promise<Blog> => {
    const response = await apiClient.post("/blogs", {
        ...data,
        date: new Date().toISOString(),
        id: crypto.randomUUID(), // JSON server auto-id sometimes conflicts or is simple int, better handling here if needed allowed
    });
    return response.data;
};

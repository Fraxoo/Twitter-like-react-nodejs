export type PostType = {
    id: number;
    content: string;
    image_url?: string | null;
    createdAt: string;
    commentCount: number;
    isLiked: boolean;
    likesCount: number;
    user: {
        id: number;
        name: string;
        lastname: string;
        username: string;
    };
};
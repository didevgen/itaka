export interface Media {
    contentType?: string;
    date?: Date;
    description?: string;
    dislikes?: number;
    likes?: number;
    title?: string;
    url?: string;
    userId?: string;
}
interface MediaContent {
    media: Media;
}

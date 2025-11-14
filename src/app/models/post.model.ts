export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
  
  export interface CreatePostDTO {
    title: string;
    body: string;
    userId: number;
  }
  
  export interface UpdatePostDTO {
    title?: string;
    body?: string;
  }
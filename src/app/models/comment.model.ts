export interface Comments {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
  }
  
  export interface CreateCommentDTO {
    postId: number;
    name: string;
    email: string;
    body: string;
  }
export interface Game {
  id: number;
  title: string;
  description: string;
  created_at: Date;
}

export interface Post {
    id: number;
    title: string;
    description: string;
    created_at: Date;
    is_edited: boolean;
    creator_id: number;
    game_id: number;
}

export interface Comment {
    id: number;
    content: string;
    created_at: Date;
    is_edited: boolean;
    creator_id: number;
    post_id: number;
}
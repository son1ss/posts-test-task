interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags?: (string)[] | null;
  reactions: number;
}

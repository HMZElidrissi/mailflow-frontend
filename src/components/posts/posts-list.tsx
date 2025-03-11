import { useQuery } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { FileText } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { ErrorFallback } from '@/components/error-fallback';
import api from '@/services/api';

interface Post {
  id: number;
  title: string;
  content: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await api.get('/posts');
  return data;
};

const PostsContent = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return <div className="text-center text-muted-foreground">Loading posts...</div>;
  }

  if (error) {
    throw error;
  }

  return (
    <div className="container py-6">
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Posts</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts?.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const PostsList = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <PostsContent />
    </ErrorBoundary>
  );
};

export default PostsList;
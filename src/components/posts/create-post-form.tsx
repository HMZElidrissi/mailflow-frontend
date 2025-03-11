import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PenLine } from 'lucide-react';
import { ErrorFallback } from '@/components/error-fallback';
import api from '@/services/api';

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
});

type PostFormData = z.infer<typeof postSchema>;

const CreatePostContent = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const createPostMutation = useMutation({
    mutationFn: (data: PostFormData) => api.post('/posts', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate('/posts');
    },
  });

  const onSubmit = (data: PostFormData) => {
    createPostMutation.mutate(data);
  };

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <PenLine className="h-6 w-6 text-primary" />
          <CardTitle>Create New Post</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register('title')} placeholder="Enter post title" />
            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <textarea
              id="content"
              {...register('content')}
              className="flex min-h-[150px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Write your post content here..."
            />
            {errors.content && <p className="text-sm text-destructive">{errors.content.message}</p>}
          </div>
          <CardFooter className="px-0 pt-4">
            <div className="flex space-x-2">
              <Button type="submit" disabled={createPostMutation.isPending}>
                {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/posts')}>
                Cancel
              </Button>
            </div>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

const CreatePostForm = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <CreatePostContent />
    </ErrorBoundary>
  );
};

export default CreatePostForm;
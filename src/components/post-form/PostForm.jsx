import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index'; // Assuming these are components from your project
import service from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active',
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  const submit = async (data) => {
    try {
      const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

      if (post) {
        // Update existing post
        if (file) {
          await service.deleteFile(post.featuredImage);
        }

        const updatedPost = await service.updateDocument(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });

        if (updatedPost) {
          navigate(`/post/${updatedPost.$id}`);
        } else {
          throw new Error('Failed to update post. Please try again later.');
        }
      } else {
        // Create new post
        const newPost = await service.createDocument({
          ...data,
          userId: userData.$id,
          featuredImage: file ? file.$id : undefined,
        });

        if (newPost) {
          navigate(`/post/${newPost.$id}`);
        } else {
          throw new Error('Failed to create post. Please try again later.');
        }
      }
    } catch (error) {
      console.error('Error submitting post:', error);
      // Handle error appropriately, e.g., display an error message to the user
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d\s]+/g, '-')
        .replace(/[^\w\d-]/g, '-');
    }
    return '';
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title, { shouldValidate: true }));
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <label htmlFor="title">Title:</label>
        <Input
          id="title"
          name="title"
          placeholder="Enter post title"
          {...register("title", { required: true })}
        />
      </div>
      <div>
        <label htmlFor="slug">Slug:</label>
        <Input
          id="slug"
          name="slug"
          placeholder="Enter post slug"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <RTE
          id="content"
          name="content"
          placeholder="Enter post content"
          defaultValue={getValues("content")}
        />
      </div>
      <div>
        <label htmlFor="image">Featured Image:</label>
        <Input
          id="image"
          name="image"
          type="file"
          placeholder="Upload featured image"
          {...register("image", { required: !post })}
        />
      </div>
      {post && (
        <div className="w-full mb-4">
          <img src={service.getDocument(post.featuredImage)} alt={post.title} className="rounded-lg" />
        </div>
      )}
      <Select
        option={["active", "inactive"]}
        label="Status"
        className="mb-4"
        {...register("status", { required: true })}
      />
      <Button
        type="submit"
        bgColor={post ? "bg-green-500" : undefined}
        className="w-full"
      >
        {post ? "Update" : "Submit"}
      </Button>
    </form>
  );
}

export default PostForm;

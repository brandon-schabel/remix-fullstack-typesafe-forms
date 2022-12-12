import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import invariant from "tiny-invariant";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { Input, PostView, SubmitButton, TextArea } from "~/components";
import { prisma } from "~/db.server";

const createCommentValidator = withZod(
  zfd.formData({
    content: zfd.text(z.string().min(1).max(1000)),
    author: zfd.text(z.string().min(1).max(50)),
  })
);

export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData();
  const postId = parseInt(params?.postid || "");

  const validation = await createCommentValidator.validate(formData);

  if (validation.error) {
    return validationError(validation.error);
  }

  const { content, author } = validation.data;

  try {
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        comments: {
          create: {
            author,
            content,
          },
        },
      },
    });
  } catch (error) {
    invariant(true, "Error creating comment.");
  }

  return null;
}

export async function loader({ params }: LoaderArgs) {
  // load post based on params.postid
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(params?.postid || ""),
    },
    include: {
      comments: true,
    },
  });

  return {
    post,
  };
}

export default function () {
  const { post } = useLoaderData<typeof loader>();

  if (!post) return <div>Post not found</div>;

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <PostView
        post={post}
        shortenedContent={false}
        className="!w-10/12 lg:w-1/2 m-2"
        enablePostLink={false}
      />

      {post.comments.map((comment) => (
        <div
          key={comment.id}
          className="w-10/12 lg:w-1/2 m-2 p-2 border border-gray-300 rounded"
        >
          <div className="text-gray-500">{comment.author}</div>
          <div>{comment.content}</div>
        </div>
      ))}

      <ValidatedForm
        validator={createCommentValidator}
        className="flex flex-col w-10/12 lg:w-1/2"
        method="post"
      >
        <h2 className="font-bold text-lg">Reply to Post</h2>
        <Input name="author" title="Author" />
        <TextArea name="content" title="Comment" />
        <div className="w-full flex justify-center items-center my-2">
          <SubmitButton submitText="Create Comment" />
        </div>
      </ValidatedForm>
    </div>
  );
}

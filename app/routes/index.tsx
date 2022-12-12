import { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import classNames from "classnames";
import { Button, buttonVariants, PostView } from "~/components";
import { prisma } from "~/db.server";

const showPublishedPosts = "showPublishedPosts";

export async function loader({ request }: LoaderArgs) {
  const searchParamsString = request.url.split("?")[1];
  const searchParams = new URLSearchParams(searchParamsString);

  let publishedParam = searchParams.get(showPublishedPosts);
  let published = true;

  if (publishedParam) {
    published = publishedParam === "show";
  }

  const posts = await prisma.post.findMany({
    where: {
      published,
    },
  });

  return {
    posts,
    publishedPosts: published,
  };
}

export default function () {
  const { posts, publishedPosts } = useLoaderData<typeof loader>();

  const ActionButtons = (
    <div className="flex space-x-2 p-2">
      <Link
        to="/create-post"
        className={classNames(buttonVariants["primary"], "!w-32")}
      >
        Create Post
      </Link>
      <form>
        <input
          name={showPublishedPosts}
          type="hidden"
          value={publishedPosts ? "hide" : "show"}
        />
        <Button type="submit" variant="neutral">
          {publishedPosts ? "Unpublished Posts" : "Published Posts"}
        </Button>
      </form>
    </div>
  );

  if (!posts || posts?.length === 0)
    return (
      <div>
        {ActionButtons}
        <div>Posts not found</div>
      </div>
    );

  return (
    <div>
      {ActionButtons}
      <div className="w-full flex flex-col justify-center items-center">
        {posts.map((post) => {
          return <PostView post={post} shortenedContent={true} />;
        })}
      </div>
    </div>
  );
}

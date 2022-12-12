import { Post } from "@prisma/client";
import { Link } from "@remix-run/react";
import classNames from "classnames";
import { buttonVariants } from "./button";

// since date types are converted to strings when sent to the client,
// we need to convert the dates to strings on the type
type PostData = Omit<Post, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

export const PostView = ({
  post,
  shortenedContent,
  enablePostLink = true,
  className,
}: {
  post: PostData;
  shortenedContent: boolean;
  enablePostLink?: boolean;
  className?: string;
}) => {
  const { title, content, author, published, createdAt, updatedAt } = post;

  return (
    <div className={classNames("w-96 rounded-md border shadow p-2", className)}>
      {published ? <div>Published</div> : <div>Not Published</div>}
      <h1>{title}</h1>
      <div>Author: {author}</div>
      <div>Created: {new Date(createdAt).toISOString()}</div>
      <div>Updated: {new Date(updatedAt).toISOString()}</div>
      {/* display first 100 characters of content if shortenedContent is true*/}
      <div>{shortenedContent ? content?.slice(0, 100) : content}</div>

      {enablePostLink && (
        <div className="flex w-full justify-center">
          <Link
            to={`/post/${post.id}`}
            className={classNames(buttonVariants["neutral"], "!w-32")}
          >
            View Post
          </Link>
        </div>
      )}
    </div>
  );
};

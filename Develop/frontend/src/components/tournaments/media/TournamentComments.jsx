import { Button } from "@material-tailwind/react";
import React from "react";
import { Form, useNavigation, useParams } from "react-router-dom";
import { useUser } from "../../auth/UserContext";
import { formatTimestamp } from "../../../util/date";

export default function TournamentComments(props) {
  const { comments } = props;
  const { user } = useUser();
  const { tournamentId, ownerId } = useParams();
  const navigation = useNavigation();

  return (
    <section className="bg-white dark:bg-gray-900 py-6 lg:py-16 antialiased">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Comments ({comments.length})
          </h2>
        </div>
        <Form method="post">
          <input name="formId" defaultValue="comment" hidden />
          <input name="userId" defaultValue={user?.userId} hidden />
          <input name="tournamentId" defaultValue={tournamentId} hidden />
          <input name="ownerId" defaultValue={ownerId} hidden />
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              name="commentText"
              rows="6"
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <div className="flex justify-left">
            <Button
              loading={navigation.state === "submitting"}
              color="blue"
              type="submit"
            >
              Post comment
            </Button>
          </div>
        </Form>
        {comments &&
          comments.map((comment, index) => {
            let style;
            if (index == 0)
              style =
                "p-6 text-base bg-white rounded-lg dark:bg-gray-900 dark:bg-gray-900";
            else
              style =
                "p-6 text-base bg-white rounded-lg dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900";
            return (
              <article key={comment.commentId} className={style}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                      {comment.user.firstName} {comment.user.lastName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <time
                        pubdate="true"
                        dateTime="2022-02-08"
                        title="February 8th, 2022"
                      >
                        {formatTimestamp(comment.uploadTime)}
                      </time>
                    </p>
                  </div>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-left">
                  {comment.commentText}
                </p>
              </article>
            );
          })}
      </div>
    </section>
  );
}

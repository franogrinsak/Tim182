import { Button } from "@material-tailwind/react";
import React from "react";
import { Form } from "react-router-dom";

export default function TournamentComments() {
  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Comments (20)
          </h2>
        </div>
        <Form method="post">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows="6"
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <div className="flex justify-left">
            <Button color="blue" type="submit">
              Post comment
            </Button>
          </div>
        </Form>
        <form className="mb-6"></form>
        <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                Michael Gough
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <time pubdate datetime="2022-02-08" title="February 8th, 2022">
                  Feb. 8, 2022
                </time>
              </p>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-left">
            Very straight-to-point article. Really worth time reading. Thank
            you! But tools are just the instruments for the UX designers. The
            knowledge of the design tools are as important as the creation of
            the design strategy.
          </p>
        </article>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";

export default function Home() {
  const [showResult, setShowResult] = useState(false);
  const [isHateful, setIshateful] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    fetch("http://127.0.0.1:8000/predict/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: text }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setIshateful(data.isHateful);
        setShowResult(true);
      })
      .catch((err) => {
        setLoading(false);
        setShowResult(false);
      });
  };

  return (
    <div className="mt-5 mx-auto">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight text-center">
          የጥላቻ ንግግር ማወቂያ
        </h2>
      </div>

      <div className="max-w-[600px] mx-auto my-10">
        <div>
          {showResult && isHateful && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">
                ያስገቡት ጽሑፍ የጥላቻ ንግግር ያለው ይመስላል
              </span>
              <span
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={() => setShowResult(false)}
              >
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          )}
          {showResult && !isHateful && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">
                ያስገቡት ጽሑፍ የጥላቻ ንግግር ያለው አይመስልም
              </span>
              <span
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={() => setShowResult(false)}
              >
                <svg
                  className="fill-current h-6 w-6 text-green-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1 mt-3">
          <form className="relative">
            <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
              <label htmlFor="comment" className="sr-only">
                ጽሑፍ ያስገቡ
              </label>
              <textarea
                rows={3}
                name="comment"
                id="comment"
                className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="ጽሑፍ ያስገቡ"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              {/* Spacer element to match the height of the toolbar */}
              <div className="py-2" aria-hidden="true">
                {/* Matches height of button in toolbar (1px border + 36px content height) */}
                <div className="py-px">
                  <div className="h-9" />
                </div>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex justify-end py-2 pl-3 pr-2">
              <div className="flex-shrink-0">
                <button
                  disabled={text.length < 10 || loading}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  className={`inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                    text.length < 10 || loading
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }"`}
                >
                  ለይ
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

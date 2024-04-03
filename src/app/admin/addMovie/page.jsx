"use client";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [tittle, setTittle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const addMovies = useCallback(async () => {
    try {
      await axios.post("/api/admin/movies", {
        tittle,
        videoUrl,
        thumbnailUrl,
        genre,
        duration,
        description,
      });
      setTittle("");
      setVideoUrl("");
      setThumbnailUrl("");
      setGenre("");
      setDuration("");
      setDescription("");
      toast.success("Movie Added successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (Error) {
      console.log(Error.response.data.message);
      toast.error(Error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [tittle, videoUrl, thumbnailUrl, genre, duration, description]);

  return (
    <div>
      <div className=" mx-auto w-auto flex flex-col text-gray-800  p-4 shadow-lg ">
        <input
          className="title bg-gray-100  p-2 mb-4 outline-none"
          placeholder="Title"
          type="text"
          value={tittle}
          onChange={(e) => setTittle(e.target.value)}
        />
        <input
          className="video bg-gray-100  p-2 mb-4 outline-none"
          placeholder="video Url"
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <input
          className="thumbnail bg-gray-100  p-2 mb-4 outline-none"
          placeholder="Thumbnail Url"
          type="text"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
        />
        <input
          className="genres bg-gray-100  p-2 mb-4 outline-none"
          placeholder="Genres "
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <input
          className=" duration bg-gray-100  p-2 mb-4 outline-none"
          placeholder="Duration (min)"
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <textarea
          className="description bg-gray-100 sec p-3 h-40 outline-none"
          placeholder="Description everything about this Movie here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Buttons */}
        <div className="buttons mt-6 flex justify-end">
          <button
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={addMovies}
          >
            Add Movie
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;

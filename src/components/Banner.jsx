"use client";
import React, { useEffect, useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const Banner = () => {
  const [loading, setLoading] = useState(false);
  const [rendMovie, setRendMovie] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/movies");
        const movieData = response.data.movies;

        // Pick a random movie from the movieData array
        const randomIndex = Math.floor(Math.random() * movieData.length);
        const randomMovie = movieData[randomIndex];

        setRendMovie(randomMovie);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching movie data:", error);
      }
    })();
  }, []);
  // console.log(rendMovie);
  return (
    <div className="relative h-[56.25vw]">
      {!loading ? (
        "Loading"
      ) : (
        <>
          <video
            poster={rendMovie.thumbnailUrl}
            className="w-full h-[56.25vw] object-cover brightness-[60%] transition duration-500"
            autoPlay
            muted
            loop
            src={rendMovie.videoUrl}
          ></video>
          <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
            <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
              {rendMovie.title}
            </p>
            <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
              {rendMovie.description}
            </p>
            <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
              {/* <PlayButton movieId={data?.id} /> */}
              <button
                // onClick={handleOpenModal}
                className="
            bg-white
            text-white
              bg-opacity-30 
              rounded-md 
              py-1 md:py-2 
              px-2 md:px-4
              w-auto 
              text-xs lg:text-lg 
              font-semibold
              flex
              flex-row
              items-center
              hover:bg-opacity-20
              transition
            "
              >
                <InformationCircleIcon className="w-4 md:w-7 mr-1" />
                More Info
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Banner;

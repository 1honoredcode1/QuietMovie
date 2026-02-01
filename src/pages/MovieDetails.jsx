import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { HeartIcon, PlayCircle, StarIcon } from "lucide-react";

import timeFormat from "../lib/timeFormat";

import BlurCircle from "../components/extras/BlurCircle";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/extras/MovieCard";
import Loading from "../components/extras/Loading";

import { useAppContext } from "../context/AppContext";
const MovieDetails = () => {
  const {
    shows,
    axios,
    getToken,
    user,
    fetchFavoriteMovies,
    favoriteMovies,
    image_base_url,
  } = useAppContext();

  const navigate = useNavigate();

  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [trailerLoading, setTrailerLoading] = useState(false);

  const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`);
      if (data.success) {
        setShow(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleWatchTrailer = async () => {
    try {
      setTrailerLoading(true);

      // show.movie._id might be your TMDB id if you saved it that way,
      // but you already have the route param `id` which is your movie id
      const { data } = await axios.get(`/api/show/trailer/${id}`);

      if (!data.success) {
        toast.error(data.message || "Trailer not found");
        return;
      }

      setTrailerKey(data.trailer.key);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not load trailer");
    } finally {
      setTrailerLoading(false);
    }
  };

  const handleFavorite = async () => {
    try {
      if (!user) return toast.error("Please log in to continue!");

      const token = await getToken();

      const { data } = await axios.post(
        "/api/user/update-favorite",
        { movieId: id },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        await fetchFavoriteMovies();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Could not update favorites",
      );
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);

  return show ? (
    <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <img
          src={image_base_url + show.movie.poster_path}
          alt="img shows"
          className="max-md:mx-auto rounded-xl h-104 max-w-70 object-cover"
        />
        <div className="relative flex flex-col gap-3">
          <BlurCircle top="-100px" left="-100px" />
          <p className="text-primary">ENGLISH</p>
          <h1 className="text-4xl font-semibold max-w-96 text-balance">
            {show.movie.title}{" "}
          </h1>
          <div className="flex items-center gap-2 text-gray-300">
            <StarIcon className="w-5 g-5 text-primary fill-primary" />
            {show.movie.vote_average.toFixed(1)} User Rating
          </div>
          <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
            {show.movie.overview}{" "}
          </p>
          <p className="">
            {timeFormat(show.movie.runtime)} *{" "}
            {show.movie.genres.map((genre) => genre.name).join(", ")} *{" "}
            {show.movie.release_date.split("-")[0]}{" "}
          </p>
          <div className="flex items-center flex-wrap gap-4 mt-4">
            <button
              onClick={handleWatchTrailer}
              className="flex items-center gap-2 px-7 py-3 text-sm bg-gray-800
  hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95"
            >
              <PlayCircle className="w-5 h-5" />
              {trailerLoading ? "Loading..." : "Watch Trailer"}
            </button>

            <a
              href="#dateSelect"
              className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer
            active:scale-95"
            >
              Buy Tickets
            </a>
            <button
              onClick={handleFavorite}
              className="bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95"
            >
              <HeartIcon
                className={`w-5 h-5 ${favoriteMovies.find((movie) => movie._id === id) ? "fill-primary text-primary" : ""} `}
              />
            </button>
          </div>
        </div>
      </div>

      <p className="text-lg font-medium mt-20">The Movie Cast</p>
      <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
        <div className="flex items-center gap-4 w-max px-4">
          {show.movie.casts.slice(0, 12).map((cast, index) => (
            <div className="flex flex-col items-center text-center" key={index}>
              <img
                src={image_base_url + cast.profile_path}
                alt="cast pfp"
                className="rounded-full h-20 md:h-20 aspect-square object-cover"
              />
              <p className="font-medium text-sm mt-3">{cast.name} </p>
            </div>
          ))}
        </div>
      </div>
      <DateSelect dateTime={show.dateTime} id={id} />
      <p className="text-lg font-medium mt-20 mb-8">You May Also Like</p>
      <div className="flex flex-wrap max-sm:justify-center gap-8">
        {shows.slice(0, 4).map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
      <div className="flex justify-center mt-20">
        <button
          onClick={() => {
            navigate("/movies");
            scrollTo(0, 0);
          }}
          className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull
        transition rounded-md font-medium cursor-pointer"
        >
          Show More
        </button>
      </div>
      {trailerKey && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setTrailerKey(null)}
        >
          <div
            className="w-full max-w-3xl aspect-video bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;

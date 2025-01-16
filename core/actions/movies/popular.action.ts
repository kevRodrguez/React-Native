import { MovieDBMoviesResponse } from "@/infraestructure/interfaces/moviedb-response";
import { movieAPI } from "./api/movie-api";
import { MovieMapper } from "@/infraestructure/mappers/movie.mapper";

export const popularMoviesAction = async () => {
    try {

        const { data } = await movieAPI.get<MovieDBMoviesResponse>('/popular');

        const movies = data.results.map((movie) => MovieMapper.fromMovieDBToMovie(movie));

        //console.log(movies);

        return movies;

    } catch (error) {
        console.error(error);
        throw 'Cannot load now playing movies';

    }
}
import { MovieDBMoviesResponse } from "@/infraestructure/interfaces/moviedb-response";
import { movieAPI } from "./api/movie-api";
import { MovieMapper } from "@/infraestructure/mappers/movie.mapper";

interface Options {
    page?: number;
    limit?: number;
}


export const topRatedAction = async ({ page=1, limit =10}: Options) => {
    try {

        const { data } = await movieAPI.get<MovieDBMoviesResponse>('/top_rated', {
            params: {
                page: page,
            }
        });

        const movies = data.results.map((movie) => MovieMapper.fromMovieDBToMovie(movie));

        //console.log(movies);

        return movies;

    } catch (error) {
        console.error(error);
        throw 'Cannot load now playing movies';

    }
}
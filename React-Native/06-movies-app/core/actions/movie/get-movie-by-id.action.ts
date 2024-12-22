import { movieAPI } from "../movies/api/movie-api";
import { MovieMapper } from "@/infraestructure/mappers/movie.mapper";
import { MovieDBMovieResponse } from "@/infraestructure/interfaces/moviedb-movie.response";
import { CompleteMovie } from "@/infraestructure/interfaces/movie.interface";

export const getMovieByIdAction = async (id: string | number): Promise<CompleteMovie> => {
    try {

        const { data } = await movieAPI.get<MovieDBMovieResponse>(`/${id}`);

        console.log("Peticion http cargada");

        //const movies = data.results.map((movie) => MovieMapper.fromMovieDBToMovie(movie));


        return MovieMapper.fromMovieDBToCompleteMovie(data);

    } catch (error) {
        console.error(error);
        throw 'Cannot load now playing movies';

    }
}
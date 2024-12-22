import { movieAPI } from "../movies/api/movie-api";
import { MovieMapper } from "@/infraestructure/mappers/movie.mapper";
import { MovieDBMovieResponse } from "@/infraestructure/interfaces/moviedb-movie.response";
import { CompleteMovie } from "@/infraestructure/interfaces/movie.interface";
import { MovieDBCast, MovieDBCastResponse } from "@/infraestructure/interfaces/moviedb-cast.response";
import { CastMapper } from "@/infraestructure/mappers/cast.mapper";

export const getMovieCastAction = async (id: number) => {
    try {

        const { data } = await movieAPI.get<MovieDBCastResponse>(`/${id}/credits`);

        console.log("Peticion http cargada");

        //const movies = data.results.map((movie) => MovieMapper.fromMovieDBToMovie(movie));


        return data.cast.map((actor) => CastMapper.fromMovieDBCastToEntity(actor));

    } catch (error) {
        console.error(error);
        throw 'Cannot load cast';

    }
}
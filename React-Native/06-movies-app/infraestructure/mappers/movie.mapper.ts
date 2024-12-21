import { Movie } from "../interfaces/movie.interface";
import { Result } from "../interfaces/moviedb-response";

export class MovieMapper {
    static fromMovieDBToMovie(movie: Result): Movie {
        const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        const backdrop = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;

        return {
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            releaseDate: new Date(movie.release_date),
            rating: movie.vote_average,
            poster: poster,
            backdrop: backdrop
        }
    }
}
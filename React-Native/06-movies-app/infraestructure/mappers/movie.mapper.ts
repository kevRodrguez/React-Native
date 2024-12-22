import { CompleteMovie, Movie } from "../interfaces/movie.interface";
import { MovieDBMovieResponse } from "../interfaces/moviedb-movie.response";
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

    static fromMovieDBToCompleteMovie = (movie: MovieDBMovieResponse): CompleteMovie => {
        const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        const backdrop = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;

        return {
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            releaseDate: new Date(movie.release_date),
            rating: movie.vote_average,
            poster: poster,
            backdrop: backdrop,
            genres: movie.genres.map((g: { name: any; }) => g.name),
            duration: movie.runtime,
            budget: movie.budget,
            originalTitle: movie.original_title,
            productionCompanies: movie.production_companies.map((c: { name: any; }) => c.name),
            // cast: Actor[];
            // crew: Crew[];
        }
    }
    
}
import { nowPlayingAction } from '@/core/actions/movies/now-playing.action';
import { popularMoviesAction } from '@/core/actions/movies/popular.action';
import { topRatedAction } from '@/core/actions/movies/top-rated.action';
import { upcomingAction } from '@/core/actions/movies/upcoming.action';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const useMovies = () => {
    const nowPlayingQuery = useQuery({
        queryKey: ['movies', 'now-playing'],
        queryFn: nowPlayingAction,
        staleTime: 1000 * 60 * 60 * 24, // si ya se hizo una consulta mantiene la data por 24 horas
    })

    const popularQuery = useQuery({
        queryKey: ['movies', 'popular'],
        queryFn: popularMoviesAction,
        staleTime: 1000 * 60 * 60 * 24, 
    })

    const topRatedQuery = useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ['movies', 'top_rated'],
        queryFn: ({ pageParam }) => {
            return topRatedAction({page: pageParam})
        },
        staleTime: 1000 * 60 * 60 * 24, 
        getNextPageParam: (lastPage, pages) => pages.length + 1
    })

    const upcomingQuery = useQuery({
        queryKey: ['movies', 'upcoming'],
        queryFn: upcomingAction,
        staleTime: 1000 * 60 * 60 * 24, 
    })


    
    return {
        nowPlayingQuery,
        popularQuery,
        topRatedQuery,
        upcomingQuery
    }

}
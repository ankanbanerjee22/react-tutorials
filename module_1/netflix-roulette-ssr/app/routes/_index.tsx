// Import the components used in your routes
import NetflixRoulette from '../old-app/components/NetflixRoulette';
import { LoaderFunction, json } from "@remix-run/node";
import MovieDatabaseService from  '../old-app/services/MovieDatabaseRepository';
import { SEARCH_PARAM_GENRE_KEY, SEARCH_PARAM_SORTBY_KEY, SEARCH_PARAM_QUERY_KEY, DEFAULT_PAGE_SIZE } from '../old-app/literals.js';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get(SEARCH_PARAM_QUERY_KEY) || '';
  const genreFilter = url.searchParams.get(SEARCH_PARAM_GENRE_KEY) || 'All';
  const sortCriteria = url.searchParams.get(SEARCH_PARAM_SORTBY_KEY) || 'release_date';
  const limit = DEFAULT_PAGE_SIZE;

  const { data, error } = await MovieDatabaseService.loadMovies(searchQuery, sortCriteria, genreFilter, limit);

  if (error) {
    return json({ error: 'Failed to fetch movies' }, { status: 500 });
  }

  return data.data;
};

export default function Index() {
  return (
    <NetflixRoulette/>
  );

}
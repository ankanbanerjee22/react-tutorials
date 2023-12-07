// Import the components used in your routes
import NetflixRoulette from '../old-app/components/NetflixRoulette';

import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";


import { useSearchParams, useNavigate, useParams } from "@remix-run/react";
import MovieDatabaseService from  '../old-app/services/MovieDatabaseRepository';
import { SEARCH_PARAM_GENRE_KEY, SEARCH_PARAM_SORTBY_KEY, SEARCH_PARAM_QUERY_KEY, DEFAULT_PAGE_SIZE } from '../old-app/literals.js';

export const loader: LoaderFunction = async (/* { request } */) => {
  // if (!request) {
  //   // Handle the case when request is not available
  //   return json({ error: 'Request not available' }, { status: 500 });
  // }

  // const searchParams = new URLSearchParams(request.url.split('?')[1]);
  // const searchQuery = searchParams.get(SEARCH_PARAM_QUERY_KEY) || '';
  // const genreFilter = searchParams.get(SEARCH_PARAM_GENRE_KEY) || 'All';
  // const sortCriteria = searchParams.get(SEARCH_PARAM_SORTBY_KEY) || 'release_date';
  const limit = DEFAULT_PAGE_SIZE;

  const { data, error } = await MovieDatabaseService.loadMovieById(105);

  if (error) {
    // Handle error accordingly
    return json({ error: 'Failed to fetch movies' }, { status: 500 });
  }

  //return json({ movies: data.data });
  return data;
};


export default function Index() {
  return (
    <NetflixRoulette/>
  );
}
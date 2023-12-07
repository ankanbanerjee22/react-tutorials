import NetflixRoulette from '../old-app/components/NetflixRoulette';
import { LoaderFunction, json } from "@remix-run/node";
import MovieDatabaseService from '../old-app/services/MovieDatabaseRepository';

export const loader: LoaderFunction = async ({params}) => {
  const { data, error } = await MovieDatabaseService.loadMovieById(params.movieId);

  if (error) {
    return json({ error: 'Failed to fetch movies' }, { status: 500 });
  }

  return data;
};

export default function Index() {
  return (
    <NetflixRoulette />
  );
  
}
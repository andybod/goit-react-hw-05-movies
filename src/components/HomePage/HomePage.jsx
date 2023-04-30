import Container from 'components/Container/Container';
import MovieList from 'components/MovieList/MovieList';
import NotFoundView from 'components/NotFoundView/NotFoundView';
import PageHeading from 'components/PageHeading/PageHeading';
import { useEffect } from 'react';
import { useState } from 'react';
import { getMovies } from 'services/movies-api';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrendingMovies = () => {
      setLoading(true);
      getMovies()
        .then(results => {
          setMovies(results);
        })
        .catch(error => {
          setError('Ooops. Something went wrong...');
          console.log(error);
        })
        .finally(() => setLoading(false));
    };
    fetchTrendingMovies();
  }, []);
  const isNotFound = !loading && !movies.length;
  return (
    <>
      <Container>
        <PageHeading text={'Trending Movies'}></PageHeading>
        {loading && 'Loading ...'}
        {isNotFound && <NotFoundView />}
        {error && <div>{error}</div>}
        {movies && <MovieList movies={movies} />}
      </Container>
    </>
  );
};

export default HomePage;

import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { fetchMoviesDetails } from 'services/movies-api';
import css from './MovieDetailsPage.module.css';
import Container from 'components/Container/Container';
import PageHeading from 'components/PageHeading/PageHeading';
import { Suspense } from 'react';
import plug from '../../images/broken_img.png';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getYear = () => new Date(movie.release_date).getFullYear();

  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  //   console.log(movie.poster_path);
  let activeClassName = {
    color: '#2196f3',
  };

  const handleClick = () => navigate(location?.state?.from ?? '/');

  useEffect(() => {
    setLoading(true);
    fetchMoviesDetails(movieId)
      .then(res => {
        setMovie(res);
      })
      .catch(error => {
        setError('Ooops. Something went wrong...');
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [movieId]);
  return (
    <>
      <Container>
        <button onClick={handleClick} className={css.backButton}>
          Go back
        </button>

        {movie && <PageHeading text={movie.title} />}
        {loading && 'Loading ...'}
        {error && <div>{error}</div>}
        {movie && (
          <div>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
                  : plug
              }
              //   src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>({getYear()})</p>
            <p>User Score: {movie.popularity}</p>
            <div>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </div>
          </div>
        )}
        <hr />
        {!error && (
          <div>
            <h2>Additional Information</h2>
            <NavLink
              to={`/movies/${movieId}/reviews`}
              style={({ isActive }) => (isActive ? activeClassName : undefined)}
              state={location.state}
            >
              <p className={css.reviews}>Reviews</p>
            </NavLink>

            <NavLink
              to={`/movies/${movieId}/cast`}
              style={({ isActive }) => (isActive ? activeClassName : undefined)}
              state={location.state}
            >
              <p className={css.cast}>Cast</p>
            </NavLink>
            <hr />
          </div>
        )}

        <Suspense>
          <Outlet />
        </Suspense>
      </Container>
    </>
  );
};

export default MovieDetailsPage;

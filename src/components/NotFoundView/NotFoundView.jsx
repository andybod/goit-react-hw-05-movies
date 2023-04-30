import { Link } from 'react-router-dom';

const NotFoundView = () => {
  return (
    <h1>
      Page is not found : Go to <Link to="/">Home page</Link>{' '}
    </h1>
  );
};

export default NotFoundView;

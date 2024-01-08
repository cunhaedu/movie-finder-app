type size = 'xs' | 'sm' | 'md' | 'lg';

export function retrieveMovieUrl(movieImagePath: string, size: size = 'md') {
  const sizes = {
    'md': 'w400',
    'lg': 'w780',
    'sm': 'w185',
    'xs': 'w92',
  };

  return `https://image.tmdb.org/t/p/${sizes[size]}/${movieImagePath}`;
}

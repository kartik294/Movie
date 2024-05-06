import { useState } from "react";
const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [sortType, setSortType] = useState(null);
  const [filterYear, setFilterYear] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?s=${searchTerm}&apikey= 26242e36`,
      );
      setMovies(response.data.Search);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleSort = (type) => {
    setSortType(type);
    const sortedMovies = [...movies].sort((a, b) => {
      if (type === "Title") {
        return a.Title.localeCompare(b.Title);
      } else if (type === "Year") {
        return parseInt(a.Year) - parseInt(b.Year);
      }
      return 0;
    });
    setMovies(sortedMovies);
  };

  const handleFilter = (year) => {
    setFilterYear(year);
  };

  const filteredMovies = filterYear
    ? movies.filter((movie) => movie.Year.includes(filterYear))
    : movies;

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a movie title"
      />
      <button onClick={handleSearch}>Search</button>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("Title")}>Title</th>
            <th onClick={() => handleSort("Year")}>Year</th>
            <th>Plot</th>
            <th>Poster Image</th>
          </tr>
        </thead>
        <tbody>
          {filteredMovies.map((movie, index) => (
            <tr key={index}>
              <td>{movie.Title}</td>
              <td>{movie.Year}</td>
              <td>{movie.Plot}</td>
              <td>
                <img src={movie.Poster} alt={`${movie.Title} Poster`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <input
          type="text"
          value={filterYear}
          onChange={(e) => handleFilter(e.target.value)}
          placeholder="Filter by Year"
        />
      </div>
    </div>
  );
};

export default MovieSearch;

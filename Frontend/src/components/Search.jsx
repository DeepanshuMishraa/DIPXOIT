import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";

const Search = () => {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);

  const fetchPosts = async (searchQuery) => {
    try {
      const response = await axios.get(`/api/posts?search=${searchQuery}`);
      setSearchResults(response.data);
      navigate(`/posts?search=${searchQuery}`);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setSearchResults([]);
    }
  };

  const onEnter = (event, callback) => event.key === 'Enter' && callback(prompt)

  return (
    <form onKeyUp={e => onEnter(e, fetchPosts)} className="flex justify-center items-center space-x-0"> 
      <button type="submit" className="cursor-pointer">
        <BsSearch />
      </button>
      <input
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
        className="outline-none px-3"
        placeholder="Search a post"
        type="text"
      />
    </form>
  );
};

export default Search;

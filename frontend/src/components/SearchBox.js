import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };
  return (
    <form className="d-flex me-auto" onSubmit={submitHandler}>
      <div className="input-group">
        <input
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          className="form-control"
          placeholder="search products..."
          aria-label="Search Products"
          aria-describedby="button-search"
        />
        <button
          className="btn btn-outline-primary"
          type="submit"
          id="button-search"
        >
          <i className="fas fa-search"></i>
        </button>
      </div>
    </form>
  );
}

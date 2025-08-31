import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ 
  value, 
  onChange, 
  onSearch, 
  placeholder = "Search jobs, companies, or skills...",
  suggestions = [],
  showSuggestions = false,
  onSuggestionClick = () => {}
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const recentSearches = [
    "Software Engineer",
    "Data Scientist", 
    "Product Manager",
    "UX Designer",
    "Frontend Developer"
  ];

  const popularSearches = [
    "Remote Jobs",
    "Internships",
    "Entry Level",
    "Full Stack Developer",
    "Machine Learning"
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef?.current && 
        !dropdownRef?.current?.contains(event?.target) &&
        !inputRef?.current?.contains(event?.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const newValue = e?.target?.value;
    onChange(newValue);
    setShowDropdown(newValue?.length > 0 || isFocused);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setShowDropdown(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    // Delay hiding dropdown to allow for clicks
    setTimeout(() => {
      if (!dropdownRef?.current?.matches(':hover')) {
        setShowDropdown(false);
      }
    }, 150);
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Enter') {
      e?.preventDefault();
      onSearch(value);
      setShowDropdown(false);
      inputRef?.current?.blur();
    }
    if (e?.key === 'Escape') {
      setShowDropdown(false);
      inputRef?.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion);
    onSuggestionClick(suggestion);
    onSearch(suggestion);
    setShowDropdown(false);
    inputRef?.current?.blur();
  };

  const filteredSuggestions = suggestions?.filter(suggestion =>
    suggestion?.toLowerCase()?.includes(value?.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-12"
        />
        
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Icon name="Search" size={20} color="var(--color-muted-foreground)" />
        </div>
        
        {value && (
          <button
            onClick={() => {
              onChange('');
              inputRef?.current?.focus();
            }}
            className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors duration-200"
          >
            <Icon name="X" size={16} color="var(--color-muted-foreground)" />
          </button>
        )}
        
        <button
          onClick={() => onSearch(value)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors duration-200"
        >
          <Icon name="Search" size={16} color="var(--color-primary)" />
        </button>
      </div>
      {/* Search Suggestions Dropdown */}
      {showDropdown && (
        <div 
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto animate-fade-in"
        >
          {/* Live Suggestions */}
          {value && filteredSuggestions?.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-medium text-muted-foreground px-3 py-2">
                Suggestions
              </div>
              {filteredSuggestions?.slice(0, 5)?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-3 py-2 hover:bg-muted rounded-md transition-colors duration-200 flex items-center space-x-3"
                >
                  <Icon name="Search" size={16} color="var(--color-muted-foreground)" />
                  <span className="text-sm text-foreground">{suggestion}</span>
                </button>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {!value && (
            <div className="p-2">
              <div className="text-xs font-medium text-muted-foreground px-3 py-2">
                Recent Searches
              </div>
              {recentSearches?.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(search)}
                  className="w-full text-left px-3 py-2 hover:bg-muted rounded-md transition-colors duration-200 flex items-center space-x-3"
                >
                  <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
                  <span className="text-sm text-foreground">{search}</span>
                </button>
              ))}
            </div>
          )}

          {/* Popular Searches */}
          {!value && (
            <div className="p-2 border-t border-border">
              <div className="text-xs font-medium text-muted-foreground px-3 py-2">
                Popular Searches
              </div>
              {popularSearches?.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(search)}
                  className="w-full text-left px-3 py-2 hover:bg-muted rounded-md transition-colors duration-200 flex items-center space-x-3"
                >
                  <Icon name="TrendingUp" size={16} color="var(--color-muted-foreground)" />
                  <span className="text-sm text-foreground">{search}</span>
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {value && filteredSuggestions?.length === 0 && (
            <div className="p-4 text-center">
              <Icon name="Search" size={24} color="var(--color-muted-foreground)" className="mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                No suggestions found for "{value}"
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Press Enter to search anyway
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
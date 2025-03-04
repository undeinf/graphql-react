import { useNavigate, useLocation, useSearchParams, NavigateOptions } from 'react-router-dom';
import { useCallback } from 'react';

/**
 * Options for updating query parameters
 */
interface UpdateQueryParamsOptions {
  /** Whether to retain existing parameters (default: true) */
  retainExisting?: boolean;
  /** Whether to navigate to the new URL (default: true) */
  navigate?: boolean;
  /** Navigation options to pass to the navigate function */
  navigateOptions?: NavigateOptions;
}

/**
 * Type for query parameter values that can be set or removed
 * null or undefined values will remove the parameter
 */
type QueryParamValue = string | number | boolean | null | undefined;

/**
 * Record of query parameters to update
 */
type QueryParamsRecord = Record<string, QueryParamValue>;

/**
 * Custom hook to manage URL query parameters with TypeScript type safety
 * This hook only modifies URL parameters when its functions are explicitly called
 * @returns An object with functions to update, get, and remove query parameters
 */
export const useQueryParams = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  /**
   * Updates URL query parameters
   * @param newParams - Object containing parameters to add/update
   * @param options - Configuration options
   * @returns The new URLSearchParams object
   */
  const updateQueryParams = useCallback(
    (
      newParams: QueryParamsRecord,
      options: UpdateQueryParamsOptions = {}
    ): URLSearchParams => {
      // Set default options
      const { 
        retainExisting = true, 
        navigate: shouldNavigate = true,
        navigateOptions = { replace: true }
      } = options;
      
      // Create a new URLSearchParams instance
      const queryParams = retainExisting 
        ? new URLSearchParams(location.search) 
        : new URLSearchParams();
      
      // Process each parameter in the newParams object
      Object.entries(newParams).forEach(([key, value]) => {
        // If value is null or undefined, remove the parameter
        if (value === null || value === undefined) {
          queryParams.delete(key);
        } else {
          // Convert value to string and set/update the parameter
          queryParams.set(key, String(value));
        }
      });
      
      // Update the URL if navigation is enabled
      if (shouldNavigate) {
        navigate({
          pathname: location.pathname,
          search: queryParams.toString() ? `?${queryParams.toString()}` : '',
        }, navigateOptions);
      }
      
      return queryParams;
    },
    [location.pathname, location.search, navigate]
  );

  /**
   * Gets the value of a specific query parameter
   * @param key - The parameter key to retrieve
   * @returns The parameter value or null if not found
   */
  const getQueryParam = useCallback(
    (key: string): string | null => {
      return searchParams.get(key);
    },
    [searchParams]
  );

  /**
   * Gets a query parameter as a number
   * @param key - The parameter key to retrieve
   * @param defaultValue - Default value if parameter is not found or not a valid number
   * @returns The parameter value as a number or the default value
   */
  const getQueryParamAsNumber = useCallback(
    (key: string, defaultValue: number = 0): number => {
      const value = searchParams.get(key);
      if (value === null) return defaultValue;
      
      const parsed = Number(value);
      return isNaN(parsed) ? defaultValue : parsed;
    },
    [searchParams]
  );

  /**
   * Gets a query parameter as a boolean
   * @param key - The parameter key to retrieve
   * @param defaultValue - Default value if parameter is not found
   * @returns The parameter value as a boolean or the default value
   */
  const getQueryParamAsBoolean = useCallback(
    (key: string, defaultValue: boolean = false): boolean => {
      const value = searchParams.get(key);
      if (value === null) return defaultValue;
      
      return value.toLowerCase() === 'true';
    },
    [searchParams]
  );

  /**
   * Gets all query parameters as an object
   * @returns An object containing all query parameters
   */
  const getAllQueryParams = useCallback(
    (): Record<string, string> => {
      const params: Record<string, string> = {};
      searchParams.forEach((value, key) => {
        params[key] = value;
      });
      return params;
    },
    [searchParams]
  );

  /**
   * Removes specific query parameters
   * @param keys - Array of parameter keys to remove
   * @param retainExisting - Whether to keep other existing parameters (default: true)
   * @param navigateOptions - Navigation options to pass to the navigate function
   */
  const removeQueryParams = useCallback(
    (
      keys: string[], 
      retainExisting: boolean = true,
      navigateOptions: NavigateOptions = { replace: true }
    ): void => {
      const paramsToRemove: Record<string, null> = {};
      keys.forEach(key => {
        paramsToRemove[key] = null;
      });
      
      updateQueryParams(paramsToRemove, { 
        retainExisting,
        navigateOptions
      });
    },
    [updateQueryParams]
  );

  /**
   * Clears all query parameters
   * @param navigateOptions - Navigation options to pass to the navigate function
   */
  const clearAllQueryParams = useCallback(
    (navigateOptions: NavigateOptions = { replace: true }): void => {
      navigate({ pathname: location.pathname }, navigateOptions);
    },
    [location.pathname, navigate]
  );

  /**
   * Checks if a specific query parameter exists
   * @param key - The parameter key to check
   * @returns True if the parameter exists, false otherwise
   */
  const hasQueryParam = useCallback(
    (key: string): boolean => {
      return searchParams.has(key);
    },
    [searchParams]
  );

  /**
   * Gets all values for a specific query parameter (for parameters with multiple values)
   * @param key - The parameter key to retrieve
   * @returns Array of values for the parameter
   */
  const getQueryParamAll = useCallback(
    (key: string): string[] => {
      return searchParams.getAll(key);
    },
    [searchParams]
  );

  return {
    updateQueryParams,
    getQueryParam,
    getQueryParamAsNumber,
    getQueryParamAsBoolean,
    getAllQueryParams,
    removeQueryParams,
    clearAllQueryParams,
    hasQueryParam,
    getQueryParamAll,
  };
};

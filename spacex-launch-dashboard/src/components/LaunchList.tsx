import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import { openDB } from "idb";

interface PatchLink {
  patch: {
    small: string;
  };
}

interface Launch {
  name: string;
  date_utc: string;
  success: boolean;
  id: string;
  links: PatchLink;
}

const GET_LAUNCHES = gql`
  query {
    allLaunches {
      name
      date_utc
      success
      id
      links{
        patch{
          small
        }
      }
    }
  }
`;

const LaunchList: React.FC = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  // State for filtering by name
  const [filter, setFilter] = useState<string>(""); 
  // State for filtering by success
  const [successFilter, setSuccessFilter] = useState<boolean | null>(null); 
  // State for sorting order
  const [sortAsc, setSortAsc] = useState(true); 
  // State for current page
  const [currentPage, setCurrentPage] = useState(1); 
  // Number of items per page
  const itemsPerPage = 20; 

  const { loading, error, data } = useQuery<{ allLaunches: Launch[] }>(GET_LAUNCHES);

  useEffect(() => {
    openDB("SpaceXLaunchesDB", 1, {
      upgrade: (db) => {
        db.createObjectStore("launches", { keyPath: "id" });
      },
    }).then(async (db) => {
      const tx = db.transaction("launches", "readwrite");
      const store = tx.objectStore("launches");

      if (data) {
        // If data available in the API, add it to IndexedDB
        data.allLaunches.forEach((launch: Launch) => {
          store.put(launch);
        });
      }

      // Getting all data from IndexedDB
      const launchesFromDB = await store.getAll();

      // Apply filters
      const filteredLaunches = launchesFromDB
        .filter((launch) => {
          if (successFilter !== null) {
            return launch.success === successFilter;
          }
          return true;
        })
        .filter((launch) => {
          if (filter) {
            return launch.name.toLowerCase().includes(filter.toLowerCase());
          }
          return true;
        });

      // Sort by date
      const sortedLaunches = sortAsc
        ? filteredLaunches.sort((a, b) => a.date_utc.localeCompare(b.date_utc))
        : filteredLaunches.sort((a, b) => b.date_utc.localeCompare(a.date_utc));

      setLaunches(sortedLaunches);
    });
  }, [data, filter, successFilter, sortAsc]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    // Reset to first page when filtering
    setCurrentPage(1); 
  };

  const toggleSuccessFilter = () => {
    setSuccessFilter((prev) => {
      if (prev === true) {
        return false;
      } else if (prev === false) {
        return null;
      } else {
        return true;
      }
    });
    // Reset to first page when changing the success filter
    setCurrentPage(1); 
  };

  const handleSort = () => {
    setSortAsc(!sortAsc);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data) {
    return <p>No launch data available</p>;
  }

  // Calculate the total number of pages based on the number of items and items per page
  const totalPages = Math.ceil(launches.length / itemsPerPage);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLaunches = launches.slice(startIndex, endIndex);

  return (
    <div>
      <h2>SpaceX Launch List</h2>
      <div>
        <input
          type="text"
          placeholder="Filter by name"
          value={filter}
          onChange={handleFilterChange}
        />
        <button onClick={toggleSuccessFilter}>
          {successFilter === true
            ? "Successful"
            : successFilter === false
            ? "Unsuccessful"
            : "All"}
        </button>
        <button onClick={handleSort}>
          Sort by Date ({sortAsc ? "Asc" : "Desc"})
        </button>
      </div>
      <ul>
        {currentLaunches.map((launch: Launch) => (
          <li key={launch.id}>
            <Link
              to="/launch-details"
              state={{ launchId: launch.id, name: launch.name, date_utc: launch.date_utc, success: launch.success, patch: launch.links.patch.small }}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  cursor: "pointer",
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <p>Name: {launch?.name}</p>
                <p>Launch Date (UTC): {launch?.date_utc}</p>
                <p>Success: {launch?.success ? "Yes" : "No"}</p>
                <p>Patch: {launch?.links.patch.small}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={index + 1 === currentPage}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LaunchList;

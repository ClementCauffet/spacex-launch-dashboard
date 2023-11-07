import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import { openDB } from "idb";
import "./../LaunchList.css";

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
      links {
        patch {
          small
        }
      }
    }
  }
`;

const LaunchList: React.FC = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [successFilter, setSuccessFilter] = useState<boolean | null>(true);
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const { loading, error, data } = useQuery<{ allLaunches: Launch[] }>(GET_LAUNCHES);

  //Storing data in IndexedDB
  useEffect(() => {
    openDB("SpaceXLaunchesDB", 1, {
      upgrade: (db) => {
        db.createObjectStore("launches", { keyPath: "id" });
      },
    }).then(async (db) => {
      const tx = db.transaction("launches", "readwrite");
      const store = tx.objectStore("launches");

      if (data) {
        data.allLaunches.forEach((launch: Launch) => {
          store.put(launch);
        });
      }

      const launchesFromDB = await store.getAll();
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

      const sortedLaunches = sortAsc
        ? filteredLaunches.sort((a, b) => b.date_utc.localeCompare(a.date_utc))
        : filteredLaunches.sort((a, b) => a.date_utc.localeCompare(b.date_utc));

      setLaunches(sortedLaunches);
    });
  }, [data, filter, successFilter, sortAsc]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    // Reset when filtering
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
    // Reset when filtering
    setCurrentPage(1); 
  };

  const handleSort = () => {
    setSortAsc(!sortAsc);
    //Reset to first page after sorting
    setCurrentPage(1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data) {
    return <p>No launch data available</p>;
  }

  // Calculate total number of pages
  const totalPages = Math.ceil(launches.length / itemsPerPage);

  // Calculate current index
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLaunches = launches.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="launch-list-container">
      <h2>Launch List</h2>
      <div className="filter-bar">
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
      <ul className="launches-list">
        {currentLaunches.map((launch: Launch) => (
          <li key={launch.id}>
            <Link
              to="/launch-details"
              state={{
                launchId: launch.id,
                name: launch.name,
                date_utc: launch.date_utc,
                success: launch.success,
                patch: launch.links.patch.small,
              }}
              style={{ textDecoration: "none" }}
              className="launch-link">
              <div className="launch-card">
                <div className="launch-details">
                  <h1 className="launch-name">{launch?.name}</h1>                  
                  <h2 className="launch-date">
                    {new Date(launch?.date_utc).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })} (UTC)
                  </h2>
                  <p className="launch-success">
                    Success:{" "}
                    {launch?.success ? (
                      <span className="success-icon">✔</span>
                    ) : launch?.success === false ? (
                      <span className="failure-icon">✘</span>
                    ) : (
                      <span className="unknown-icon">?</span>
                    )}
                  </p>
                </div>
                <div className="launch-image">
                  <img
                    src={launch?.links.patch.small}
                    alt="Patch"
                    style={{width: "90%", height: "auto", borderRadius: "20%"}}
                  />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="pagination">
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

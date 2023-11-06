import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import LaunchpadDetails from "./launchesInfo/LaunchpadDetails";
import PayloadDetails from "./launchesInfo/PayloadDetails";
import RocketDetails from "./launchesInfo/RocketDetails";
import CrewDetails from "./launchesInfo/CrewDetails";

import "./../LaunchDetails.css"; 

interface CrewMember {
  crew: string;
  role: string;
}

const GET_LAUNCH_DETAILS = gql`
  query GetLaunchDetails($id: String!) {
    singleLaunch(id: $id) {
      details
      rocket
      links {
        webcast
      }
      crew {
        crew
        role
      }
      launchpad
      payloads
    }
  }
`;

function LaunchDetails() {
  const location = useLocation();
  const launchId: string | undefined = location.state?.launchId;

  const { loading, error, data } = useQuery(GET_LAUNCH_DETAILS, {
    variables: { id: launchId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const launch = data.singleLaunch;

  window.scrollTo(0, 0);

  return (
    <div className="launch-details-container">
      <h2>Launch Details</h2>
      <div className="launch-info">
        <div className="launch-info-left">
          <p className="launch-name">{location?.state?.name}</p>
          <h2 className="launch-date">
            {new Date(location?.state?.date_utc).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            (UTC)
          </h2>
          <p className="launch-success">
            Success:{" "}
            {location?.state?.success ? (
              <span className="success-icon">✔</span>
            ) : location?.state?.success === false ? (
              <span className="failure-icon">✘</span>
            ) : (
              <span className="unknown-icon">?</span>
            )}
          </p>
        </div>
        <div className="launch-info-right">
          <img
            src={location?.state?.patch}
            alt="Patch"
            className="patch-image"
          />
        </div>
      </div>

      {launch.details && <p>Details: {launch.details}</p>}      

      <div className="crew-details">
        <ul className="crew-list">
          {launch.crew.map((crewMember: CrewMember, index: number) => (
            <li key={index} className="crew-member">
              <h2 className="payload-number">{crewMember.role}</h2>
              <CrewDetails crew={crewMember.crew} />
            </li>
          ))}
        </ul>
      </div>

      <div className="payloads">
        <ul className="payloads-list">
          {launch.payloads.map((payload: string, index: number) => (
            <li key={index} className="payload">
              <h2 className="payload-number">Payload #{index + 1}</h2>
              <PayloadDetails payload={payload} />
            </li>
          ))}
        </ul>
      </div>

      <h2 className="payload-number">Launchad</h2>       
        <LaunchpadDetails launchpad={launch?.launchpad} />
      <h2 className="payload-number">Rocket</h2> 
        <RocketDetails rocket={launch?.rocket} />


        <p className="webcast-link">
        <a
          href={launch?.links.webcast}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            height="30%"
            width="30%"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 461.001 461.001"
          >
            <g>
              <path
                fill="#F61C0D"
                d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728
                c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137
                C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607
                c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"
              ></path>
            </g>
          </svg>
        </a>
      </p>
    </div>
  );
}

export default LaunchDetails;

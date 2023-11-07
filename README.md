# SpaceX Launch Dashboard

SpaceX launch dashboard in Typescript

In the context of Riverflow's recruitment process, this project serves as a showcase.

<img src="./spacex-launch-dashboard/public/img/Preview SpaceX.PNG" alt="drawing" width="300px"/>

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running with Docker](#running-with-docker)
- [Examples](#examples)
- [Caching strategies](#caching-strategies)
- [Going further](#going-further)

## Prerequisites

- Docker


- (_Nice to have_ : Passion for rocket launches)

## Installation

Clone the repository from GitHub:

```bash
git clone https://github.com/ClementCauffet/spacex-launch-dashboard.git
cd spacex-launch-dashboard
```

## Running with Docker

Ensure that **Docker** is _installed_ and _running_.

Build the Docker images for the project (both front-end and back-end):
```bash
docker-compose build
```

Once the Docker images are successfully built, you can run:

```bash
docker-compose up
```

When both services are up and running, just visit the app on your browser using this URL :

```
http://localhost:80
```

# Project description

**Page Launch List**: Displays all SpaceX launches with their respective names, dates, statuses, and patch links, which can be conveniently filtered as per your preference. Click on a specific launch to access more details, depending on the information provided by the SpaceX API.

**Page Launch Details**: Provides comprehensive information about a particular launch.

## Examples

Flight names with interesting content :
- CCtCap Demo Mission 2
- Crew-5
- CRS-7

## Caching strategies

The current project utilizes the **InMemoryCache** property of Apollo Server in conjunction with **IndexedDB**.

The list of launches is stored in an IndexedDB database when the application is launched to ensure that data, including their name, date, status, and patch link, is readily available. We use the launch ID as the key in this database and pass it to LaunchDetails to query additional information from the server when required. This prevents querying **allLaunches** information every time we return to the main page of the app and ensures that it is readily accessible.

The overall performance of the app is quite satisfactory.

Further enhancements could involve integrating Redis into the application, although it hasn't been necessary at this point.



## Going further

Some work that could be added to this project :
-  **Stress mode** : simulate a lot of requests in real time to evaluate the app performance
- **Sonarcube-like** tests to check on security etc.
- **Scrapping up-to-date data** for upcoming launches
- **Improve graphics**
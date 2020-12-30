import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react';
import Layout from "../../components/layout";
import JobsList from "../../components/jobs-list";

function Jobs({ jobs }) {
  const router = useRouter();
  const [state, setState] = useState({
    jobsList: jobs ? jobs.slice(0, 10) : [],
  });
  const companyName = jobs.map(job => job.companyName);
  console.log("companyName >>> ", companyName);
  console.log("jobs >>> ", jobs);
  console.log("state.jobsList >>> ", state.jobsList);

  const handleFilterByCompanyName = (name) => {
    console.log("name >>> ", name);
  }

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <Layout>
      <Head>
        <title>Jobs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="font-sans px-2.5">
        <div className="flex content-center mt-8 mb-4 justify-start space-x-3">
          <p className="text-2xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-5xl text-black-600 tracking-wide font-medium antialiased">
            BUSINESS ANALYST
          </p>
          <p className="text-2xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-4xl text-gray-400 self-center md:self-end lg:self-end xl:self-end 2xl:self-end tracking-normal font-normal antialiased">Jobs</p>
        </div>
        <div className="border-t-2 border-gray-100"></div>
        <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row flex-wrap md:space-x-3 lg:space-x-3 xl:space-x-3 2xl:space-x-3">
          <div className="flex-grow md:flex-initial lg:flex-initial xl:flex-initial 2xl:flex-initial mt-3">
            <button
              class="dropdown:block relative px-3 py-2 text-sm font-semibold leading-relaxed text-gray-800 transition-colors duration-150 bg-white border border-gray-300 rounded-lg focus:outline-none hover:border-gray-600 focus:shadow-outline focus:border-gray-900"
              role="navigation"
              aria-haspopup="true"
            >
              <div class="flex items-center">
                <span class="px-2 text-gray-700">Company Name</span>
                <svg
                  class="w-4 h-4 text-gray-500 fill-current"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
              <ul
                className="absolute left-0 hidden w-auto p-2 mt-3 space-y-2 text-sm bg-white border border-gray-100 rounded-lg shadow-lg"
                aria-label="submenu"
              >
                {
                  companyName.map(name => {
                    return (
                      <li className="inline-block text-sm w-full px-2 py-1 font-medium text-gray-600 transition-colors duration-150 rounded-md hover:text-gray-900 focus:outline-none focus:shadow-outline hover:bg-gray-100" onClick={handleFilterByCompanyName(name)}>
                        {name}
                      </li>
                    )
                  })
                }
              </ul>
            </button>
          </div>
          <div className="flex-grow md:flex-initial lg:flex-initial xl:flex-initial 2xl:flex-initial mt-3">
            <button className="w-full rounded-md bg-blue-600 text-white font-normal tracking-wide text-xl px-3 py-2 antialiased">Company Name</button>
          </div>
        </div>
        <JobsList jobs={state.jobsList} />
      </main>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {

  // request body for fetching
  const requestBody = {
    "companySkills": true,
    "dismissedListingHashes": [],
    "fetchJobDesc": true,
    "jobTitle": "Business Analyst",
    "locations": [],
    "numJobs": 20,
    "previousListingHashes": []
  }

  // fetch options for fetch request POST
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  };

  // fetching the jobs data in https://www.zippia.com/api/jobs/
  const res = await fetch(`https://www.zippia.com/api/jobs/`, requestOptions)
  const data = await res.json();
  const jobs = (data || {}).jobs || [];

  // check if has data
  if (!jobs) {
    return {
      notFound: true,
    }
  }

  // Pass jobs data to the page via props
  return {
    props: { jobs }
  }
}

export default Jobs;

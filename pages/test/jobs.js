import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react';
import Layout from "../../components/layout";
import JobsList from "../../components/jobs-list";
import moment from "moment";

function Jobs({ jobs }) {
  const router = useRouter();
  const [state, setState] = useState({
    jobsList: jobs ? jobs.slice(0, 10) : [],
    datePosted: [
      { "value": 1, "label": "Past Day" },
      { "value": 3, "label": "Past 3 Days" },
      { "value": 7, "label": "Past Week" },
    ]
  });
  const companyName = jobs.map(job => job.companyName); // Getting all the company names

  // Filtering the posted jobs by company name
  const handleFilterByCompanyName = (name) => {
    const filteredByCompanyNameJobs = jobs.filter(job => job.companyName === name);
    const data = {
      "jobs": filteredByCompanyNameJobs,
    };

    return setState({ ...state, jobsList: filteredByCompanyNameJobs });
  }

  // Filtering the posted jobs by date posted
  const handleFilterByDatePosted = (date) => {
    let count = 0;
    // Add to temporary variable the map value of the adjusted postedDate data for filtering
    const filteredByDatePostedJobs = jobs.filter(job => {
      const { OBJpostingDate } = job;
      // convert to YYYY-MM-DD format using moment
      const datePosted = moment(OBJpostingDate).format('YYYY-MM-DD');
      // subtract the picked date from now and convert to YYYY-MM-DD format using moment
      const subtractedDate = moment().subtract(date, 'days').format('YYYY-MM-DD');

      // 1. Use moment for easy date comparison
      // 2. Check if date is equal to 1 for the past day and check if
      // the subtracted date from now is equals to posting date
      // 3. If not date is equal to 1 check if the datePosted is greater than or equal to the subtractedDate
      // eg. 3days Ago.
      //     dateNow = December 30, 2020
      //     subtractedDate = December 27, 2020
      //     datePosted = December 27, 28, 29, 30 2020
      // Also check if the datePosted is less than or equal to the date today - 1 day
      // eg. 3days Ago.
      //     dateNow-1 = December 29, 2020
      //     subtractedDate = December 27, 2020
      //     datePosted = December 27, 28, 29, 2020
      // 4. 3days ago is also applicable to 7days ago
      if (date === 1 && subtractedDate === datePosted) {
        return job;
      } else if (datePosted >= subtractedDate && datePosted <= moment().subtract(1, 'days').format('YYYY-MM-DD')) {
        return job;
      }
    });

    const data = {
      "jobs": filteredByDatePostedJobs,
    };

    return setState({ ...state, jobsList: filteredByDatePostedJobs });
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
      <main className="font-sans px-10">
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
              className="dropdown:block relative px-3 py-2 text-sm font-semibold leading-relaxed text-gray-800 transition-colors duration-150 bg-white border border-gray-300 rounded-lg focus:outline-none hover:border-gray-600 focus:shadow-outline focus:border-gray-900"
              role="navigation"
              aria-haspopup="true"
            >
              <div className="flex items-center">
                <span className="px-2 text-gray-700">Company Name</span>
                <svg
                  className="w-4 h-4 text-gray-500 fill-current"
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
                      <li
                        className="inline-block text-sm w-full bg-gray-200 px-2 py-1 font-medium text-gray-600 transition-colors duration-150 rounded-md hover:text-gray-900 focus:outline-none focus:shadow-outline hover:bg-gray-100"
                        onClick={() => { handleFilterByCompanyName(name) }}
                        key={name}
                      >
                        {name}
                      </li>
                    )
                  })
                }
              </ul>
            </button>
          </div>
          <div className="flex-grow md:flex-initial lg:flex-initial xl:flex-initial 2xl:flex-initial mt-3">
            <button
              className="dropdown:block relative px-3 py-2 text-sm font-semibold leading-relaxed text-gray-800 transition-colors duration-150 bg-white border border-gray-300 rounded-lg focus:outline-none hover:border-gray-600 focus:shadow-outline focus:border-gray-900"
              role="navigation"
              aria-haspopup="true"
            >
              <div className="flex items-center">
                <span className="px-2 text-gray-700">Date Posted</span>
                <svg
                  className="w-4 h-4 text-gray-500 fill-current"
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
                  state.datePosted.map(date => {
                    return (
                      <li
                        className="inline-block text-sm w-full bg-gray-200 px-2 py-1 font-medium text-gray-600 transition-colors duration-150 rounded-md hover:text-gray-900 focus:outline-none focus:shadow-outline hover:bg-gray-100"
                        onClick={() => { handleFilterByDatePosted(date.value) }}
                        key={date.value}
                      >
                        {date.label}
                      </li>
                    )
                  })
                }
              </ul>
            </button>
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

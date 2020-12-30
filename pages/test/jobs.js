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
            <button className="w-full rounded-md bg-blue-600 text-white font-normal tracking-wide text-xl px-3 py-2 antialiased">Company Name1</button>
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

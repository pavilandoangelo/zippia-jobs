import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from "../../components/layout";

function Jobs({ jobs }) {
  const router = useRouter();
  // console.log("jobs >>> ", jobs);

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  let createMarkup = () => {
    return { __html: 'Description of Work\n\n\nThis position has been designated as Exempt in accordance with North Carolina General Statute § 12' };
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 mt-5 mb-10">
          <div className="bg-white border rounded-lg overflow-hidden p-3">
            <div className="flex flex-col divide-y divide-gray-200">
              <div className="w-full flex flex-col mb-4">
                <div className={`h-1/3 ${true ? 'w-1/3' : 'w-1/4'}`}>
                  {/* Add condition if the data has company logo or not. */}
                  {true ? <img
                    src="https://www.aitworldwide.com/images/files/image/Media-Center/Low-Res/AIT-Worldwide-Logistics-Logo-Low-Res.jpg"
                    alt="Company Logo"
                    className="w-full h-full rounded-md object-cover"
                  /> : <div className="rounded-md bg-blue-500 text-center py-5 text-lg">
                      <span className="text-white font-semibold antialiased">M</span>
                    </div>
                  }
                </div>
                <div className="mt-2 mb-0">
                  <span className="text-base font-medium tracking-wide antialiased text-gray-800">AIT Worldwide Logistics</span>
                </div>
                <div className="mt-0">
                  <span className="text-base font-normal tracking-wide antialiased text-gray-600">Itasca, IL</span>
                </div>
                <div className="mt-2">
                  <span className="text-lg font-medium tracking-wide leading-tight antialiased text-black">Business Systems Analyst - North America</span>
                </div>
              </div>
              <div className="w-full mb-3 flex flex-row">
                <div className="text-base mt-2 font-normal tracking-wide leading-tight antialiased text-black italic whitespace-pre-wrap" dangerouslySetInnerHTML={createMarkup()}></div>
              </div>
              <div className="w-full mb-3 flex flex-row">
                <p className="w-full mt-3 text-base font-normal tracking-normal leading-tight anitialiased text-gray-800 clamp-2 overflow-ellipsis overflow-hidden">
                  Skills: Customer Requirements,Workflow,AIT,GED,Project Stakeholders,Technical Documentation,Product Offerings,Service Desk,Business Systems,Knowledge Base
                </p>
              </div>
              <div className="w-full flex flex-row space-x-3">
                <div className="flex-1 mt-2">
                  <div className="flex flex-row space-x-2 text-left">
                    <div className="flex">
                      <span className="text-base font-light tracking-wider antialiased">5d ago</span>
                    </div>
                    {/* Add condition for showing the new badge for new job posted. */}
                    {true && (
                      <div className="bg-green-500 text-white p-1 rounded items-center leading-none flex-initial text-center">
                        <span className="text-xs font-light text-white tracking-wider antialiased">NEW</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1 mt-2 text-right">
                  <span className="text-base font-light tracking-wider antialiased">$65,000 yearly est.</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-pink-300 rounded-sm p-3">2</div>
          <div className="bg-pink-300 rounded-sm p-3">3</div>
          <div className="bg-pink-300 rounded-sm p-3">4</div>
          <div className="bg-pink-300 rounded-sm p-3">5</div>
          <div className="bg-pink-300 rounded-sm p-3">6</div>
          <div className="bg-pink-300 rounded-sm p-3">7</div>
          <div className="bg-pink-300 rounded-sm p-3">8</div>
          <div className="bg-pink-300 rounded-sm p-3">9</div>
          <div className="bg-pink-300 rounded-sm p-3">10</div>
        </div>
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
  const data = await res.json()
  // check if the data has a jobs property.
  const jobs = (data || {}).jobs || [];

  // Pass jobs data to the page via props
  return {
    props: { jobs }
  }
}

export default Jobs;

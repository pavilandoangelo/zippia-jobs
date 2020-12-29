import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from "../../components/layout";

function Jobs({jobs}) {
  const router = useRouter();
  console.log("jobs >>> ", jobs);

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
          <p className="text-2xl md:text-5xl lg:text-5xl xl:text-5xl text-black-600 tracking-wide font-medium">
            BUSINESS ANALYST
          </p>
          <p className="text-2xl md:text-4xl lg:text-4xl xl:text-4xl text-gray-400 self-center md:self-end lg:self-end xl:self-end tracking-normal font-normal">Jobs</p>
        </div>
        <div className="border-t-2 border-gray-100"></div>
        <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row flex-wrap md:space-x-3 lg:space-x-3 xl:space-x-3">
          <div className="flex-grow md:flex-initial lg:flex-initial xl:flex-initial mt-3">
            <button className="w-full rounded-md bg-blue-600 text-white font-normal tracking-wide text-xl px-3 py-2">Company Namesssssss</button>
          </div>
          <div className="flex-grow md:flex-initial lg:flex-initial xl:flex-initial mt-3">
            <button className="w-full rounded-md bg-blue-600 text-white font-normal tracking-wide text-xl px-3 py-2">Company Name</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5">
          <div className="bg-white border rounded-lg overflow-hidden p-3">
            <div className="flex flex-col divide-y divide-gray-200">
              <div className="w-full flex flex-col mb-4">
                <div className="h-1/3 w-1/2">
                  <img
                    src="https://www.aitworldwide.com/images/files/image/Media-Center/Low-Res/AIT-Worldwide-Logistics-Logo-Low-Res.jpg"
                    alt=""
                    className="w-full h-full rounded-md object-cover"
                  />
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
              <div className="w-full mb-3 flex flex-col">
                <p className="w-full mt-3 text-base font-normal tracking-normal leading-tight anitialiased text-gray-800 clamp-2 overflow-ellipsis overflow-hidden">
                  Skills: Customer Requirements,Workflow,AIT,GED,Project Stakeholders,Technical Documentation,Product Offerings,Service Desk,Business Systems,Knowledge Base
                </p>
              </div>
              <div className="w-full flex flex-row space-x-3">
                <div className="flex-auto mt-2">5d ago</div>
                <div className="flex-auto mt-2">estimatedSalary</div>
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

export async function getStaticProps({ params }) {

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

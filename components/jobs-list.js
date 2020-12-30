export default function JobsList(props) {
  const { jobs } = props;

  // Creating a mark up for the shortDesc data to display
  // the html format by setting it dangerouslySetInnerHTML in the html
  let createMarkup = (htmlData) => {
    htmlData ? htmlData : "";
    return { __html: htmlData };
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 mt-5 mb-10">
      {
        jobs.map(job => {
          const {
            jobId,
            companyLogo,
            companyInitial,
            companyName,
            shortDesc,
            location,
            skillsets,
            postedDate,
            showNewJobBedge,
            jobTitle,
            estimatedSalary
          } = job;

          return (
            <div className="bg-white border rounded-lg overflow-hidden p-3" key={jobId}>
              <div className="flex flex-col divide-y divide-gray-200">
                <div className="w-full flex flex-col mb-4">
                  <div className={`h-1/3 w-1/4`}>
                    {/* Add condition if the data has company logo or not. */}
                    {companyLogo ? <img
                      src={companyLogo}
                      alt={companyName}
                      className="w-full h-full rounded-md object-cover"
                    /> : <div className="rounded-md bg-blue-500 text-center py-5 text-lg">
                        <span className="text-white font-semibold antialiased">{companyInitial}</span>
                      </div>
                    }
                  </div>
                  <div className="mt-2 mb-0">
                    <span className="text-base font-medium tracking-wide antialiased text-gray-800">{companyName}</span>
                  </div>
                  <div className="mt-0">
                    <span className="text-base font-normal tracking-wide antialiased text-gray-600">{location}</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-lg font-medium tracking-wide leading-tight antialiased text-black">{jobTitle}</span>
                  </div>
                </div>
                <div className="w-full mb-3 flex flex-row">
                  <div className="text-base mt-2 font-normal tracking-wide leading-tight antialiased text-black italic whitespace-pre-wrap" dangerouslySetInnerHTML={createMarkup(shortDesc)}></div>
                </div>
                <div className="w-full mb-3 flex flex-row">
                  <p className="w-full mt-3 text-base font-normal tracking-normal leading-tight anitialiased text-gray-800 clamp-2 overflow-ellipsis overflow-hidden">
                    Skills: {skillsets ? skillsets.toString() : "N/A"}
                  </p>
                </div>
                <div className="w-full flex flex-row space-x-3">
                  <div className="flex-1 mt-2">
                    <div className="flex flex-row space-x-2 text-left">
                      <div className="flex">
                        <span className="text-base font-light tracking-wider antialiased">{postedDate ? postedDate : ""}</span>
                      </div>
                      {/* Add condition for showing the new badge for new job posted. */}
                      {showNewJobBedge && (
                        <div className="bg-green-500 text-white p-1 rounded items-center leading-none flex-initial text-center">
                          <span className="text-xs font-light text-white tracking-wider antialiased">NEW</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 mt-2 text-right">
                    <span className="text-base font-light tracking-wider antialiased">{estimatedSalary ? estimatedSalary.includes("est") ? estimatedSalary : `${estimatedSalary} est.` : ""}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      }
    </div>
  )
}

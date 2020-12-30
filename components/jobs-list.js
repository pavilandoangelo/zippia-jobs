export default function JobsList(props) {
  console.log("props >>> ", props);

  let createMarkup = () => {
    return { __html: 'Description of Work\n\n\nThis position has been designated as Exempt in accordance with North Carolina General Statute § 12' };
  }

  return (
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
  )
}

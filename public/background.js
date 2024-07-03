/*global chrome*/

console.log("background working")
const linkedInListViewURL = "https://www.linkedin.com/jobs/collections";
const linkedInDetailView = "https://www.linkedin.com/jobs/view";


// This function returns the appropriate job description class name based on the URL.
function getJobDescriptionClassName(url) {
    // If the URL starts with the LinkedIn list view URL, return the list view class name, else return the detail view class name.
    return url.startsWith(linkedInListViewURL)
        ? "jobs-search__job-details--container"
        : "jobs-description-content__text";
}


// This function grabs the job description text from the web page.
function grabJobDescription(className) {

    // here `className` is referring to classname given to div container which holds job description data.

    const jobDetailsContainer = document.body.querySelector(`.${className}`);
    const jobDetails = jobDetailsContainer.textContent;

    //removing white space-
    const trimmedJobDetails = jobDetails.replace(/\s\s+/g, " ");
    console.log(trimmedJobDetails);
    return trimmedJobDetails;

}

// executes this func whenever there user jumps from one to another tab
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    console.log("Event listener triggered");
    if (changeInfo.status === "complete" && tab.active) {
        // Check if the URL of the tab matches the LinkedIn list or detail view URL.
        if (
            tab.url?.startsWith(linkedInListViewURL) ||
            tab.url?.startsWith(linkedInDetailView)
        ) {
            // chrome scripting takes 3 params 
            chrome.scripting
                .executeScript(
                    {
                        target: { tabId: tabId },
                        func: grabJobDescription,
                        args: [getJobDescriptionClassName(tab.url)],
                    })
                .then((queryResult) => {
                    chrome.storage.local.set({ jobDescription: queryResult[0].result });
                });

        }
    }



}
)

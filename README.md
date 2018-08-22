Prerequisite:
Make sure you have nodejs installed on your system
1. Install jest using the command
npm install --save-dev jest (in local dir)or npm install -g jest(for global installation)
2. Install puppeteer using the command
npm install --save-dev puppeteer (in local dir)or npm install -g puppeteer(for global installation)
3. clone the repo and run the test using command
npm test -- --runInBand (for sequential test case run) or npm test (for parallel execution)
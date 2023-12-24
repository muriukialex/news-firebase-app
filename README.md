# News Aggregator

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js (version 18+)
- npm (version 10+)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/muriukialex/news-firebase-app.git
    ```
2. Navigate to the project directory:

    ```bash
    cd your-nextjs-app
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```


### Features

- [x] User Authentication with Firebase
- [x] Fetch and Display News Articles
- [ ] Favorite Articles: Allow users to mark articles as favorites, and store their preferences in Firebase for persistence. This can be done by tapping on a heart icon on the top-right of the list items or the details view page.
- [ ] Grid View: Add a toggle button to show the news items in a grid view. UI styling can be of your choice here.
- [ ] News Detail View: When users tap on a news article item, it should show a detailed view
of the article in another ful screen, including the title, description, image, and a link to the
full article. You can use an in-app webview to show this if you are building a flutter app
- [ ] Offline Support: Implement caching mechanisms to allow users to read previously fetched news articles even when they are offline.
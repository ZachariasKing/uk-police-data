# uk-police-data
A web application that uses the public API from [Data.Police.UK](https://data.police.uk/) to present UK crime statistics to the user. Currently, the user can enter a valid crime category, date (YYY-MM) and post code to retrieve crime statistics from that area. 

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#Deployment">Usage</a></li>
  </ol>
</details>

## About the Project


## Built With

* Node.js
* Bootstrap
* EJS Templating


### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. You will also need your own GeoApify API key which you can get here: [Geoapify](https://www.geoapify.com/)
2. Clone the repo
   ```sh
   git clone https://github.com/ZachariasKing/uk-police-data.git
   ```
3. Install NPM packages (You may also need to run npm audit fix to download the latest versions of dependencies)
   ```sh
   npm install
   ```
4. Create a .env file in the project root directory and add the line:
   ```
   GEOAPIFY_API_KEY = '<api key here>'
   ```  
5. **(Make sure you add the .env file to your .gitignore so you don't expose your API key!!!)**

6. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```


## Deployment
This project had been deployed using [Render](https://uk-police-data.onrender.com).

<!-- CONTRIBUTING -->
## Contributing

Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

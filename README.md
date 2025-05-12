## Overview
This repository contains my second attempt to complete the [iCapital Identity Team Engineer Challenge](https://gist.github.com/pm-builder/979dcf6300d4dff1cdfd2ee4808af091), which is supposed to be completed in two hours. My first attempt is [located here](https://github.com/natedugg/icapital-no-ai), and during this attempt, I did **not** employ the help of any kind of artificial intelligence.

It turns out that without any help from AI, I ended up spending most of the allotted time in the setup / configuration phase, giving me very little time to actually build the required features. This inspired me to try again, but this time using ChatGPT. Turns out I was able to include a lot more functionality than I did with the non-AI version!

After stopping work on the non-AI assisted attempt, I started this attempt at around 3:20pm the same day and stopped working on it around 5:30pm. I wanted to apply the same two hour constraint to this attempt to make it a fair comparison.

**I understand that this was not what was requested, and that all of this might be disregarded in favor of the first attempt. That's ok. I'm just hoping that this gives you more insight into my capability as an engineer.**

## Vibes All Day!

Given the fact that I didn't get far at all with my first attempt to build this project without AI, I decided to see how far I could get with it. With ChatGPT's help, I was, in fact, able to get most of the basic intended functionality working.

I found that AI dramatically sped up the application setup/configuration phase on both the front and back ends, allowing me to dive into the actual implementation much more quickly.

**AI Prompts**
1. I started by simply copying the stated requirements from the project instructions page into ChatGPT (using `o4-mini-high`), with additional specific instructions to use Ruby on Rails as the back end API, React with Typescript as the front end.
  - this generated a project structure with a root folder called `icapital_partner_import_app` containing code for a Rails + React/TypeScript import application (split into "backend" and "frontend" folders), complete with database migrations, models, controller logic for file uploads, a CORS setup, and a simple front-end form component called `InvestorForm`, which only allowed users to add new investor profiles.
2. ChatGPT initially assumed that I wanted to use a Postgres database, since I didn't specify at the beginning. I entered another prompt to switch the application to use MySQL, which is a database I already have in my local development environment.
3. I found that some Rails installation files were missing (e.g. the `/bin` folder) from the ChatGPT-generated Rails application. I created a Rails app from scratch separately, then just copied the necessary files into the `backend` folder. That fixed the ChatGPT-generated Rails app and allowed it to start.
3. Next, I prompted ChatGPT to add a new component on the front end to show the list of investors in a table, with each row linking to an editable form for that investor account. In addition, I asked for a link on the list page to a new empty form for creating new investor accounts.
  - this worked, but somehow the file upload functionality got lost during the update; I had to ask ChatGPT to restore the upload functionality to the investor form
4. Then I asked ChatGPT to check the "Keep" checkbox to determine if existing files linked to an investor would be kept when the form was saved. A separate prompt was required to get ChatGPT to also update the controller logic in the API to actually remove files if necessary.
5. Next, I had ChatGPT change the front-end route for adding investors from `/add` to `/investors/add`, and the route for editing investors from `/:id` to `/investors/:id`. This added some clarity to the routes themselves, and made it easier to distinguish different types of endpoints in the future.

**Result**
I was left with a basically functional full-stack application. I didn't spend any time trying to add styling to the user interface, but I believe that ChatGPT could have made those improvements with a few more simple prompts. Additionally, I believe that with more time than the allotted two hours, every item listed in the **What's Left** section below could have been included by ChatGPT with very careful, specific prompting.

## What's Left

The ChatGPT-assisted development process got me further than I was able to get on my own, but after two hours there was still plenty of improvements that could have been made. Some of the [improvements from the non-AI version](https://github.com/natedugg/icapital-no-ai/blob/main/README.md#whats-left) would also apply here, and I've made note of those cases.

- Authentication / authorization: like the non-AI version, this version is also missing authentication using JWT session tokens.
- Support for large file uploads / downloads
  - Although file uploads are supported here, it only works with small files. Network bandwidth and local file system constraints currently preclude support for large files.
  - As described in the [README for the non-AI version](https://github.com/natedugg/icapital-no-ai/blob/main/README.md#whats-left), a far more scalable solution would be to use cloud storage, like AWS S3. This would allow for multi-part uploads and downloads using pre-signed URLs, which would support very large files, as well as resumable downloads and trackable upload progress to facilitate an upload progress bar on the investor form.
- 

## Screen shots

<img width="1071" alt="icapital-with-ai-list-page" src="https://github.com/user-attachments/assets/4ab9f1d4-d838-4008-b7ad-64b852b53a47" />

<img width="1071" alt="icapital-with-ai-add-page" src="https://github.com/user-attachments/assets/36ed3f65-6b51-4d6d-a8ab-3d31fa948a43" />

<img width="1070" alt="icapital-with-ai-edit-page" src="https://github.com/user-attachments/assets/93975d8d-6f6a-4096-b5f4-56ade24c54f7" />


## Configuration

1. **Clone the repo**
```bash
git clone <repo-url>
cd icapital-with-ai
```

## Backend (Ruby on Rails)

### Prerequisites
- Ruby 3.x
- Rails 7.0.x
- MySQL server (e.g. MySQL 8.0)

### Setup

2. **Back end setup**
```
cd backend
bundle install
# Ensure MySQL server is running and accessible
rails db:create db:migrate
rails server -p 3000
```

## Front end (React)

### Prerequisites
- Node

### Setup

1. **Front end setup**
```
cd ../frontend
npm install
npm start
```

2. **Usage**
- Open http://localhost:3001 in your browser.
- Fill out the investor form and upload at least one document.
- On submission, file metadata is saved in the MySQL database, and files are saved in `backend/public/uploads/:investor_id/`.


## Notes
- CORS is configured to allow requests from any origin to `/api/*`.
- Uploaded files are limited to 3 MB by default (Rails default middleware).

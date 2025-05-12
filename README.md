## Overview
Started working on this after [the non-AI experiment](https://github.com/natedugg/icapital-no-ai) at around 3:20pm on May 11, 2025. Stopped working on it a little before 5:30pm, with some time afterwards spent trying to get the Github repository situated.

For this version, I used ChatGPT as an aide. I managed to include a lot more functionality than I did with the non-AI version, with some expected sacrifices in appearance.

## Vibes All Day!

Given the fact that I didn't get far at all with my first attempt to build this project without AI, I decided to see how far I could get with it. With ChatGPT's help, I was, in fact, able to get most of the basic intended functionality working.

I found that AI dramatically sped up the application setup/configuration phase on both the front and back ends, allowing me to dive into the actual implementation much more quickly.

**AI Prompts**
1. I started by simply copying the stated requirements from the project instructions page into ChatGPT (using `o4-mini-high`), with additional specific instructions to use Ruby on Rails as the back end API, React with Typescript as the front end.
  - this generated a project structure with a root folder called `icapital_partner_import_app` containing code for a Rails + React/TypeScript import application (split into "backend" and "frontend" folders), complete with database migrations, models, controller logic for file uploads, a CORS setup, and a simple front-end form component called `InvestorForm`, which only allowed users to add new investor profiles.
2. ChatGPT initially assumed that I wanted to use a Postgres database, since I didn't specify at the beginning. I entered another prompt to switch the application to use MySQL, which is a database I already have in my local development environment.
3. I found that some Rails installation files were missing (e.g. the `/bin` folder) from the ChatGPT-generated Rails application. I created a Rails app from scratch separately, then just copied the necessary files into the `backend` folder. That fixed the ChatGPT-generated Rails app and allowed it to start.
3. Next, I prompted ChatGPT to add a new component on the front end to show the list of investors in a table, with each row linking to an editable form for that investor account. In addition, I asked for a link on the list page to a new empty form for creating new investor accounts.
  - this worked, but somehow the file upload functionality got lost during the update; I had to ask ChatGPT to restore it to the investor form
4. Then I asked ChatGPT to check the "Keep" checkbox to determine if existing files linked to an investor would be kept when the form was saved. A separate prompt was required to get ChatGPT to also update the controller logic in the API to actually remove files if necessary.
5. Next, I had ChatGPT change the front-end route for adding investors from `/add` to `/investors/add`, and the route for editing investors from `/:id` to `/investors/:id`. This added some clarity to the routes themselves, and made it easier to distinguish different types of endpoints in the future.

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

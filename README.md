## Overview
This repository contains my second attempt to complete the [iCapital Identity Team Engineer Challenge](https://gist.github.com/pm-builder/979dcf6300d4dff1cdfd2ee4808af091), which is supposed to be completed in two hours. My first attempt is [located here](https://github.com/natedugg/icapital-no-ai), and during that attempt, I did **not** employ the help of any kind of artificial intelligence.

It turns out that without any help from AI, I ended up spending most of the allotted time in the setup / configuration phase, giving me very little time to actually build the required features. This inspired me to try again, but this time using ChatGPT. Turns out I was able to include a lot more functionality than I did with the non-AI version!

After stopping work on the non-AI assisted attempt, I started this attempt at around 3:20pm the same day (May 11, 2025) and stopped working on it around 5:30pm.

**I understand that this was not what was requested, and that all of this might be disregarded in favor of the first attempt. That's ok. I'm just hoping that this gives you more, and hopefully positive insight into my capability as an engineer.**

## Vibes All Day!

Given the fact that I didn't get far at all with my first attempt to build this project without AI, I decided to see how far I could get with it. With ChatGPT's help, I was, in fact, able to get most of the basic intended functionality working.

I found that AI dramatically sped up the application setup/configuration phase on both the front and back ends, allowing me to dive into the actual implementation much more quickly. That being said, there were some manual configuration issues that came up after trying to use the ChatGPT-generated files, since ChatGPT didn't include all of the required installation files to setup working React and Rails applications.

My process was iterative, which means I started by asking ChatGPT to build an application satisfying the most basic requirements. Then I added functionality piece by piece, verifying each step as I went.

**Result**
I was left with a basically functional full-stack application. I didn't spend any time trying to add styling to the user interface, but I believe that ChatGPT could have made those improvements with a few more simple prompts. Additionally, I believe that with more time, every item listed in the **What's Left** section below could have been addressed (or assisted) by an AI with very careful, specific prompting.

## What's Left

The ChatGPT-assisted development process got me further than I was able to get on my own, but after two hours there was still plenty of improvements that could have been made. Some of the [improvements from the non-AI version](https://github.com/natedugg/icapital-no-ai/blob/main/README.md#whats-left) would also apply here, and I've made note of those cases.

- Authentication / authorization: like the non-AI version, this version is also missing authentication using JWT session tokens.
- Use cloud storage, like AWS S3, instead of local file storage for uploads
- Detection of duplicate investor entries via matching names/SSNs (also missing from the non-AI attempt). As previously described, my solution would be to add the ability for admins to merge accounts based on matching values
- **Unit Tests**
  - In hindsight, I should have included this in my prompting to the AI from the beginning, but I was perhaps too focused on getting the MVP working quickly. In any case, I believe that the AI could generate these tests as needed.
- **End-to-End Integration Tests**
  - My guess is that there might be more human involvement required to build out end-to-end tests, as opposed to unit tests

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

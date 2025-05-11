
## Backend (Ruby on Rails)

### Prerequisites
- Ruby 3.1.2
- Rails 7.0.x
- MySQL server (e.g. MySQL 8.0)

### Setup

1. **Clone the repo**
```bash
git clone <repo-url>
cd icapital_partner_import_app
```

2. **Back end setup**
```
cd backend
bundle install
# Ensure MySQL server is running and accessible
rails db:create db:migrate
rails server -p 3000
```

3. **Front end setup**
```
cd ../frontend
yarn install      # or npm install
yarn start        # or npm start
```

4. **Usage**
- Open http://localhost:3001 in your browser.
- Fill out the investor form and upload at least one document.
- On submission, data is saved in MySQL and files in `backend/public/uploads/:investor_id/`.

5. **Notes**
- CORS is configured to allow requests from any origin to /api/*.
- Uploaded files are limited to 3 MB by default (Rails default middleware).

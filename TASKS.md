# GiftLink Capstone — Exact 18-Task Checklist

Repository name: `fullstack-capstone-project`

This guide assumes you are using a Linux-style terminal such as the IBM Skills Network/Theia terminal.

## 0. One-time setup

1. Create a **public** GitHub repository named exactly `fullstack-capstone-project`.
2. Extract this starter project and open a terminal in the project root.
3. Initialize Git:

```bash
git init
git branch -M main
git add .
git commit -m "Initial GiftLink capstone setup"
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/fullstack-capstone-project.git
git push -u origin main
```

4. Configure the backend:

```bash
cd giftlink-backend
cp .env.example .env
```

Edit `.env` and set:

```text
MONGODB_URI=YOUR_REAL_MONGODB_CONNECTION_STRING
DB_NAME=giftlink
JWT_SECRET=YOUR_LONG_RANDOM_SECRET
PORT=5000
```

Never commit `.env`.

5. Install dependencies:

```bash
npm install
cd ../giftlink-frontend
npm install
cp .env.example .env
cd ..
```

6. In `giftlink-frontend/.env`, use this while working locally:

```text
VITE_API_URL=http://localhost:5000
```

---

# Task 1 — `user-story.md` [2 points]

Required file: **`user-story.md`**

Already included at the repository root.

It contains the user-story template:

```text
As a ...
I need ...
So that ...
```

with assumptions and Gherkin acceptance criteria.

Push it:

```bash
git add user-story.md
git commit -m "Add user story template"
git push
```

Submit the GitHub URL of the file, for example:

```text
https://github.com/YOUR_GITHUB_USERNAME/fullstack-capstone-project/blob/main/user-story.md
```

---

# Task 2 — `userstories.png` [4 points]

Required screenshot name: **`userstories.png`**

Create these GitHub labels exactly:

- `new`
- `icebox`
- `technical debt`
- `backlog`

Go to **GitHub repository → Issues → Labels → New label**.

Create at least these eight issues:

1. `User registration` — label `new`
2. `User login` — label `new`
3. `View all gift items` — label `backlog`
4. `View item details` — label `backlog`
5. `Search gift items by category and keyword` — label `backlog`
6. `Update user profile` — label `icebox`
7. `Add comments or reviews to gift items` — label `icebox`
8. `Improve authentication security and error handling` — label `technical debt`

Use the same user-story structure from `user-story.md` inside each issue.

Then open the repository **Issues** page. Make sure the screenshot visibly shows:

- repository name `fullstack-capstone-project`
- at least 8 issues
- the required labels

Save the screenshot exactly as:

```text
userstories.png
```

Do not fabricate this screenshot. It must show your public GitHub repository.

---

# Task 3 — `inserted_items` [2 points]

Required evidence name: **`inserted_items`**

The supplied `giftItems.json` contains exactly **16 documents**.

## Option A — MongoDB Atlas / normal `mongoimport`

From the project root:

```bash
mongoimport \
  --uri="YOUR_MONGODB_URI" \
  --db=giftlink \
  --collection=gifts \
  --file=giftItems.json \
  --jsonArray \
  --drop \
  2>&1 | tee evidence/inserted_items
```

The output must show that **16 documents were imported**.

Check the count:

```bash
mongosh "YOUR_MONGODB_URI" --eval 'db.getSiblingDB("giftlink").gifts.countDocuments({})'
```

Expected count:

```text
16
```

Open `evidence/inserted_items` and make sure the real MongoDB output is present. Remove the placeholder text first if necessary.

---

# Task 4 — `db.js` [2 points]

Required file: **`giftlink-backend/db.js`**

Already included. It contains the required MongoDB connection line:

```js
await client.connect();
```

and exports:

```js
connectToDatabase()
```

Push and submit this GitHub URL:

```text
https://github.com/YOUR_GITHUB_USERNAME/fullstack-capstone-project/blob/main/giftlink-backend/db.js
```

---

# Task 5 — `giftRoutes.js` [4 points]

Required file: **`giftlink-backend/routes/giftRoutes.js`**

Already included. It:

- calls `connectToDatabase()`
- serves `GET /api/gifts`
- serves `GET /api/gifts/:id`

Submit:

```text
https://github.com/YOUR_GITHUB_USERNAME/fullstack-capstone-project/blob/main/giftlink-backend/routes/giftRoutes.js
```

---

# Task 6 — `searchRoutes.js` [2 points]

Required file: **`giftlink-backend/routes/searchRoutes.js`**

Already included. It filters by the query-string field `category` and optionally by keyword `q`.

Example request:

```text
/api/search?category=Books&q=Python
```

Submit:

```text
https://github.com/YOUR_GITHUB_USERNAME/fullstack-capstone-project/blob/main/giftlink-backend/routes/searchRoutes.js
```

---

# Task 7 — `app.js` [2 points]

Required file: **`giftlink-backend/app.js`**

Already included. It contains:

```js
app.use("/api/search", searchRoutes);
```

Submit:

```text
https://github.com/YOUR_GITHUB_USERNAME/fullstack-capstone-project/blob/main/giftlink-backend/app.js
```

---

# Task 8 — `index.js` [2 points]

Required file: **`giftlink-backend/index.js`**

Already included. It imports the `natural` npm package:

```js
import natural from "natural";
```

`natural` is also listed in `giftlink-backend/package.json`.

Submit:

```text
https://github.com/YOUR_GITHUB_USERNAME/fullstack-capstone-project/blob/main/giftlink-backend/index.js
```

---

# Task 9 — `RegisterPage.js` [2 points]

Required file: **`giftlink-frontend/src/pages/RegisterPage.js`**

Already included. Its `fetch()` request contains:

```js
method: "POST"
```

and:

```js
headers: {
  "Content-Type": "application/json"
}
```

Submit:

```text
https://github.com/YOUR_GITHUB_USERNAME/fullstack-capstone-project/blob/main/giftlink-frontend/src/pages/RegisterPage.js
```

---

# Task 10 — `LoginPage.js` [2 points]

Required file: **`giftlink-frontend/src/pages/LoginPage.js`**

Already included. Its fetch headers include both required attributes:

```js
"Content-Type": "application/json",
"Authorization": `Bearer ${localStorage.getItem("token") || ""}`
```

Submit:

```text
https://github.com/YOUR_GITHUB_USERNAME/fullstack-capstone-project/blob/main/giftlink-frontend/src/pages/LoginPage.js
```

---

# Task 11 — `authRoutes.js` [2 points]

Required file: **`giftlink-backend/routes/authRoutes.js`**

Already included. It implements:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `PUT /api/auth/update`

Passwords are hashed with bcrypt and login returns a JWT.

Submit:

```text
https://github.com/YOUR_GITHUB_USERNAME/fullstack-capstone-project/blob/main/giftlink-backend/routes/authRoutes.js
```

---

# Run and test locally before Tasks 12–17

Open terminal 1:

```bash
cd giftlink-backend
npm run dev
```

You should see the API running on port 5000.

Test health:

```bash
curl http://localhost:5000/health
```

Expected:

```json
{"status":"ok","service":"GiftLink API"}
```

Open terminal 2:

```bash
cd giftlink-frontend
npm run dev
```

Open the URL shown by Vite.

The landing page should show:

- `GiftLink`
- the tagline
- `Get Started`

---

# Task 12 — `deployed_landingpage.png` [2 points]

Required screenshot name: **`deployed_landingpage.png`**

You need a real public deployment.

## Backend deployment using Render

1. Push your latest code to GitHub.
2. In Render create a new **Web Service** from `fullstack-capstone-project`.
3. Set **Root Directory** to:

```text
giftlink-backend
```

4. Build command:

```text
npm install
```

5. Start command:

```text
npm start
```

6. Add environment variables:

```text
MONGODB_URI=YOUR_ATLAS_URI
DB_NAME=giftlink
JWT_SECRET=YOUR_LONG_RANDOM_SECRET
```

7. Deploy.
8. Open:

```text
https://YOUR-BACKEND-URL/health
```

and then:

```text
https://YOUR-BACKEND-URL/api/gifts
```

Both must work.

## Frontend deployment using Vercel

1. Import the same GitHub repository into Vercel.
2. Set **Root Directory** to:

```text
giftlink-frontend
```

3. Add environment variable:

```text
VITE_API_URL=https://YOUR-BACKEND-URL
```

4. Deploy the Vite application.
5. Open the public frontend URL.

Your deployed landing page already contains the four rubric elements:

- deployment URL in the browser
- project title/site name: `GiftLink`
- short description/tagline
- `Get Started` button

Take a screenshot with the browser address bar visible and save it exactly as:

```text
deployed_landingpage.png
```

---

# Task 13 — `mainpage` [2 points]

Required evidence file: **`mainpage`**

Use your deployed backend URL if possible.

```bash
BACKEND_URL="https://YOUR-BACKEND-URL"
{
  echo 'curl '"$BACKEND_URL"'/api/gifts'
  curl -s "$BACKEND_URL/api/gifts"
  echo
} | tee evidence/mainpage
```

Open `evidence/mainpage`. It must contain both the cURL command and the real output listing the gift items.

---

# Task 14 — `register` [2 points]

Required evidence file: **`register`**

Use a unique email address so registration does not return “already exists”.

```bash
BACKEND_URL="https://YOUR-BACKEND-URL"
{
  echo 'curl -X POST '"$BACKEND_URL"'/api/auth/register -H "Content-Type: application/json" -d '\''{"name":"Capstone User","email":"capstoneuser@example.com","password":"StrongPass123","location":"Lahore"}'\'''
  curl -s -X POST "$BACKEND_URL/api/auth/register" \
    -H "Content-Type: application/json" \
    -d '{"name":"Capstone User","email":"capstoneuser@example.com","password":"StrongPass123","location":"Lahore"}'
  echo
} | tee evidence/register
```

Expected successful status message:

```text
User registered successfully
```

---

# Task 15 — `login` [2 points]

Required evidence file: **`login`**

Use the same account from Task 14:

```bash
BACKEND_URL="https://YOUR-BACKEND-URL"
{
  echo 'curl -X POST '"$BACKEND_URL"'/api/auth/login -H "Content-Type: application/json" -d '\''{"email":"capstoneuser@example.com","password":"StrongPass123"}'\'''
  curl -s -X POST "$BACKEND_URL/api/auth/login" \
    -H "Content-Type: application/json" \
    -d '{"email":"capstoneuser@example.com","password":"StrongPass123"}'
  echo
} | tee evidence/login
```

The real output should contain:

- `Login successful`
- a JWT `token`
- user information

---

# Task 16 — `item_detail` [2 points]

Required evidence file: **`item_detail`**

First list the gifts:

```bash
curl -s "$BACKEND_URL/api/gifts"
```

Copy one real `_id` value.

Then:

```bash
ITEM_ID="PASTE_REAL_OBJECT_ID_HERE"
{
  echo 'curl '"$BACKEND_URL"'/api/gifts/'"$ITEM_ID"
  curl -s "$BACKEND_URL/api/gifts/$ITEM_ID"
  echo
} | tee evidence/item_detail
```

The output must show one item’s full details.

---

# Task 17 — `search_item` [2 points]

Required evidence file: **`search_item`**

Run:

```bash
{
  echo 'curl "'"$BACKEND_URL"'/api/search?category=Books&q=Python"'
  curl -s "$BACKEND_URL/api/search?category=Books&q=Python"
  echo
} | tee evidence/search_item
```

The output should return the `Python Programming Book` seed item.

---

# Task 18 — `CI/CD` [2 points]

Workflow file included:

```text
.github/workflows/ci.yml
```

It runs automatically when you push to `main` and performs:

1. repository checkout
2. Node.js setup
3. backend dependency install
4. backend health test
5. frontend dependency install
6. frontend production build
7. successful final CI/CD step

Trigger it:

```bash
git add .
git commit -m "Complete GiftLink capstone"
git push
```

Then open:

```text
GitHub repository → Actions → GiftLink CI/CD → latest run
```

Make sure every step is green.

If GitHub CLI is available and authenticated, save the real workflow log with:

```bash
gh run list --limit 5
gh run view RUN_ID --log > evidence/CI-CD
```

Important: a slash `/` cannot be part of a normal local filename. If the rubric literally displays the evidence label as `CI/CD`, treat `CI/CD` as the task/evidence title. The included local evidence file is `evidence/CI-CD`.

---

# Final submission check

Before submitting, verify all required items:

```text
Task 1   user-story.md GitHub URL
Task 2   userstories.png
Task 3   inserted_items
Task 4   db.js GitHub URL
Task 5   giftRoutes.js GitHub URL
Task 6   searchRoutes.js GitHub URL
Task 7   app.js GitHub URL
Task 8   index.js GitHub URL
Task 9   RegisterPage.js GitHub URL
Task 10  LoginPage.js GitHub URL
Task 11  authRoutes.js GitHub URL
Task 12  deployed_landingpage.png
Task 13  mainpage
Task 14  register
Task 15  login
Task 16  item_detail
Task 17  search_item
Task 18  successful CI/CD output
```

Minimum pass score is 28/40, but this setup is designed to satisfy all 40 points if the real screenshots/output are produced correctly.

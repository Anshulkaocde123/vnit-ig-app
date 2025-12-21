# RAILWAY MONGODB URI - EXACT STEP-BY-STEP GUIDE

## GOAL: Add your MongoDB connection string to Railway

---

## STEP 1: Open Railway Website

**What to do:**
1. Open your web browser (Chrome, Firefox, Safari, Edge)
2. Go to: `https://railway.app`
3. You should see the Railway homepage

**What it looks like:**
- You'll see a logo and "Railway" at the top
- There will be a "Login" button (top right corner)

---

## STEP 2: Login to Railway

**What to do:**
1. Click the **"Login"** button (usually top right)
2. Click **"Login with GitHub"** 
3. You'll be taken to GitHub
4. Click **"Authorize railwayapp"** (or similar)
5. You'll be taken back to Railway dashboard

**What you're looking for:**
- After login, you should see your projects listed
- You should see **"vnit-ig-app"** in the list

---

## STEP 3: Open Your Project

**What to do:**
1. Find **"vnit-ig-app"** in your projects list
2. Click on it
3. You'll enter the project view

**What it looks like:**
- You'll see your project name at the top
- There will be different sections/cards showing your service

---

## STEP 4: Find Your Service

**What to do:**
1. Look for a card or box labeled **"vnit-ig-app"** (the backend service)
2. It might show "Latest Deployment" or "Active"
3. Click on this card/service

**What it looks like:**
- Should say something like:
  - "vnit-ig-app" 
  - "Status: Active"
  - "Latest Deploy: 5 min ago"

---

## STEP 5: Open Service Details

**What to do:**
1. After clicking the service, you'll see a detailed view
2. Look at the **top tabs/navigation**
3. You should see tabs like:
   - Overview
   - Logs
   - Variables  ← **CLICK THIS ONE**
   - Settings
   - etc.

**What to do:**
- Click on the **"Variables"** tab

**What it looks like:**
- Should be a horizontal menu at the top
- "Variables" should be one of the options

---

## STEP 6: Find the Add Variable Button

**What to do:**
1. After clicking Variables tab, you'll see a form
2. Look for a button or field to add a new variable
3. Common options:
   - A "+" button
   - "Add Variable" button
   - "New Variable" button
   - Or just empty text fields

**What to do:**
- Click the button to add a new variable
- Or scroll down to find an empty field

**What it looks like:**
- You might see existing variables like:
  - NODE_ENV = production
  - PORT = 5000
  - etc.
- Below them should be a way to add more

---

## STEP 7: Enter the MongoDB URI

**What to do:**
1. You should now see a form with two fields:
   - **Field 1: Variable Name** (or "Key")
   - **Field 2: Variable Value** (or "Value")

**In Field 1 (Variable Name), type:**
```
MONGODB_URI
```

**In Field 2 (Variable Value), copy-paste this ENTIRE line:**
```
mongodb+srv://anshuljain532006_db_user:RruAcmA5Q8HcyVqp@vnit-ig-app.iymg4sc.mongodb.net/vnit_sports?retryWrites=true&w=majority
```

**How to copy-paste:**
1. Select the entire MongoDB string above (from "mongodb" to "majority")
2. Right-click → Copy (or Ctrl+C)
3. Click in the Value field on Railway
4. Right-click → Paste (or Ctrl+V)

**What it looks like:**
```
Variable Name: | MONGODB_URI                                          |
Variable Value:| mongodb+srv://anshuljain532006_db_user:Rru...       |
```

---

## STEP 8: Save the Variable

**What to do:**
1. Look for a button to save:
   - "Save" button
   - "Add" button
   - "Submit" button
   - Or press **Enter** key

**What to do:**
- Click the Save/Add button
- Or press Enter on your keyboard

**What happens:**
- The variable should be saved
- Railway will show a success message (usually green)
- Railway should start redeploying automatically

**What it looks like:**
- Green checkmark or "✓ Saved"
- Or green notification saying "Variable added"

---

## STEP 9: Wait for Deployment

**What to do:**
1. Go to the **"Logs"** tab (same row as Variables)
2. You'll see deployment logs appearing
3. **Wait 2-5 minutes**

**What to look for:**
- Should see text like "Building...", "Deploying...", "Starting..."
- Eventually should see:
  ```
  ✅ MongoDB Connected: vnit-ig-app.iymg4sc.mongodb.net
  🚀 Server listening on port 5000
  ```

**What it looks like:**
- Logs will scroll down showing the build process
- Look for green checkmarks ✅
- Look for errors (red text) - if none, you're good!

---

## STEP 10: Test Your App

**What to do:**
1. In your project, find the **"Public URL"** or **"Domain"**
2. It will look something like:
   ```
   https://vnit-ig-app-production-xxxxx.railway.app
   ```
3. Copy this URL
4. Open it in a new browser tab

**What it looks like:**
- You should see the login page
- Username/Password fields

**What to do next:**
1. Username: `admin`
2. Password: `admin123`
3. Click Login

**If successful:**
- You'll see the admin dashboard
- The deployment is COMPLETE! 🎉

---

## TROUBLESHOOTING

### Q: I don't see a "Variables" tab
**A:** Try clicking on your service card first, then look for the tabs again

### Q: Where do I find the Public URL?
**A:** In your project view, look for your service. The URL should be displayed on the card or in the details.

### Q: I see "MongoDB Connection Error" in logs
**A:** The MONGODB_URI wasn't added correctly. Go back to Variables and check the value is copied exactly.

### Q: Still seeing errors?
**A:** Take a screenshot of the Logs and send it to me

---

## SUMMARY OF WHAT YOU'RE DOING:

1. ✅ Go to Railway.app
2. ✅ Login with GitHub
3. ✅ Open vnit-ig-app project
4. ✅ Click Variables tab
5. ✅ Add MONGODB_URI variable
6. ✅ Paste MongoDB connection string
7. ✅ Save/Submit
8. ✅ Wait 2-5 minutes
9. ✅ Check Logs for "MongoDB Connected"
10. ✅ Open your app URL
11. ✅ Login with admin/admin123
12. ✅ Done! 🎉

---

## YOUR MONGODB CONNECTION STRING:
(Copy this exact value into Railway Variables)

```
mongodb+srv://anshuljain532006_db_user:RruAcmA5Q8HcyVqp@vnit-ig-app.iymg4sc.mongodb.net/vnit_sports?retryWrites=true&w=majority
```

---

**Follow these steps exactly as written and you'll have your app live in 10 minutes!**

**Need help? Tell me which step you're stuck on and I'll help!**

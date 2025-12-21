# Verify MongoDB URI is Added to Railway

## Status: MONGODB_URI NOT YET ADDED ❌

Your app is running but can't connect to MongoDB because the environment variable wasn't added to Railway.

---

## MUST DO THIS NOW:

### **Step 1: Go to Railway Dashboard**
- URL: https://railway.app
- Login with your GitHub account

### **Step 2: Find Your Service**
- You should see your project
- Click on **vnit-ig-app** service (or the service card)

### **Step 3: Click "Variables" Tab**
- Should show a list of environment variables
- You might see some already there (NODE_ENV, PORT, etc.)

### **Step 4: ADD MONGODB_URI**

Look for a form or button that says:
- "Add Variable"
- "New Variable" 
- Or just an empty text field

**Paste this entire line:**
```
MONGODB_URI=mongodb+srv://anshuljain532006_db_user:RruAcmA5Q8HcyVqp@vnit-ig-app.iymg4sc.mongodb.net/vnit_sports?retryWrites=true&w=majority
```

### **Step 5: Save/Submit**
- Click "Save", "Add", "Submit" or press Enter
- Railway should redeploy automatically

### **Step 6: Wait & Check**
- Wait 2-3 minutes
- Look at the **"Logs"** tab
- Should see: `✅ MongoDB Connected`

---

## WHAT THE LOGS SHOW NOW:

```
❌ MongoDB Connection Error: MONGODB_URI environment variable is not set
⚠️  App starting without MongoDB - some features may not work
🚀 Server listening on port 8080
```

This means:
- ✅ App started successfully
- ❌ But MongoDB variable is missing
- ⚠️ App running but database not connected

---

## SCREENSHOT HELP:

If you're confused about WHERE to add the variable:
1. In Railway, go to Deployments section
2. Click your active service/deployment
3. Should see tabs: **Overview**, **Logs**, **Variables**, **Settings**
4. Click **Variables** tab
5. Should see input fields to add environment variables

---

## CONFIRM ADDED:

After adding MONGODB_URI in Railway Variables, you should see in logs within 2-3 minutes:

```
✅ MongoDB Connected: vnit-ig-app.iymg4sc.mongodb.net
🚀 Server listening on port 5000
```

If you see these messages, your deployment is complete! 🎉

---

**Send me a screenshot when you've added the variable, or let me know what the Logs tab shows after!**

# 🚀 QUICK VALIDATION SCRIPT

**Run this after login to verify everything is working**

## Step 1: Login
Visit: https://web-production-184c.up.railway.app/login

**Credentials**:
- Username: `admin`
- Password: `admin123`

## Step 2: Verify Departments Load
After login, go to: https://web-production-184c.up.railway.app/admin/award-points

Check:
- [ ] "Department" dropdown has 8 options:
  - [ ] Computer Science Engineering
  - [ ] Electronics & Communication Engineering
  - [ ] Electrical & Electronics Engineering
  - [ ] Mechanical Engineering
  - [ ] Chemical Engineering
  - [ ] Civil Engineering
  - [ ] Metallurgical & Materials Engineering
  - [ ] Mining Engineering

## Step 3: Check Filter on Public Dashboard
Go to: https://web-production-184c.up.railway.app

Check:
- [ ] Advanced filter opens
- [ ] Department filter shows all 8 departments
- [ ] Season filter loads (currently empty)

## Step 4: Check Leaderboard
Go to: https://web-production-184c.up.railway.app/admin/leaderboard

Check:
- [ ] All 8 departments listed
- [ ] All showing 0 points (no awards yet)
- [ ] Can award points without errors

## Step 5: API Endpoints (Optional - Use Browser DevTools)
Open DevTools (F12) → Network tab

When you load the page:
- [ ] GET `/api/departments` - 200 status ✅
- [ ] GET `/api/leaderboard` - 200 status ✅
- [ ] GET `/api/seasons` - 200 status ✅

## Expected Response Format
```json
{
  "success": true,
  "count": 8,
  "data": [...],
  "timestamp": "2025-12-21T..."
}
```

## If Something Doesn't Load

### Check #1: Browser Console (F12)
Look for red errors showing API endpoint and error message

### Check #2: Network Tab (F12)
- Check response status (should be 200 for GET requests)
- Check response body for error message
- Check response time (should be < 2 seconds)

### Check #3: Verify Login Worked
- Token should be in localStorage
- Should see admin username in top right
- Should NOT be redirected to /login

## Troubleshooting

**"Departments dropdown is empty"**
- Check Network tab: GET /api/departments status
- If 500 error: Check server logs in Railway dashboard
- If timeout: MongoDB connection issue

**"Leaderboard shows no departments"**
- Refresh page
- Check if GET /api/leaderboard returns data
- Check if department IDs match between endpoints

**"Filter shows nothing"**
- Open browser console
- Check for fetch/axios errors
- Verify API endpoints are responding

## Getting Help
- Check `DEBUG_AND_DEPLOYMENT_REPORT.md` for technical details
- Check `GOOGLE_OAUTH_ADMIN_GUIDE.md` for Google OAuth setup
- Check server logs in Railway dashboard for error messages


# 🚀 RAILWAY CONFIGURATION CHECKLIST

## ✅ Required Environment Variables in Railway Dashboard

**Go to**: https://railway.app → vnit-ig-app → Variables

### Add These Variables:

```
NODE_ENV=production
PORT=8080
MONGODB_URI=mongodb+srv://anshuljain532006_db_user:RruAcmA5Q8HcyVqp@vnit-ig-app.iymg4sc.mongodb.net/vnit_sports?retryWrites=true&w=majority
JWT_SECRET=your-secure-random-string-min-32-characters-long-1234567890
```

**Note**: Railway automatically assigns a PORT. Our code handles this correctly by reading from `process.env.PORT`. The PORT can be 5000, 8080, or any other value Railway assigns - **our code will automatically use whatever PORT Railway provides**.

## ⚙️ Server Configuration

Our server automatically:
- ✅ Reads PORT from `process.env.PORT` (Railway sets this)
- ✅ Binds to `0.0.0.0` (correct for Railway)
- ✅ Falls back to 5000 if PORT not set
- ✅ Logs startup information for debugging
- ✅ Handles all errors gracefully

## 🔍 How to Check if Railway is Working

1. **Check Build Logs**: https://railway.app → vnit-ig-app → Deployments → Click latest deployment
2. **Check Runtime Logs**: Same page, scroll down for runtime logs
3. **Look for**: `✅ Server successfully listening on 0.0.0.0:[PORT]`

## 🧪 Testing the Deployment

After deployment, test:

```bash
# Test frontend (should return HTML)
curl https://web-production-184c.up.railway.app/

# Test health endpoint
curl https://web-production-184c.up.railway.app/api/alive

# Test departments endpoint
curl https://web-production-184c.up.railway.app/api/departments
```

## 🚨 If Something Goes Wrong

1. **Check Railway logs**: Click on your deployment to see build and runtime logs
2. **Look for**: Error messages in the startup phase
3. **Common issues**:
   - Missing MONGODB_URI → Will show "MONGODB_URI is not set"
   - Port binding error → Will show "Error: listen EADDRINUSE"
   - Module not found → Will show "Cannot find module"

## 📝 What Railway Automatically Provides

- ✅ HTTPS/TLS (automatic)
- ✅ PORT assignment (we read from `process.env.PORT`)
- ✅ Domain (web-production-184c.up.railway.app)
- ✅ Auto-restart on failure
- ✅ Health checks

## ✨ Best Practices for Railway

1. **Always use process.env.PORT**: ✅ We do this
2. **Always use 0.0.0.0 for binding**: ✅ We do this
3. **Never hardcode port**: ✅ We don't
4. **Set all secrets in Variables**: ✅ Do this in Railway dashboard
5. **Never commit .env files**: ✅ Already in .gitignore

## 🎯 Summary

Your deployment should now work because:
1. ✅ Startup wrapper catches all errors before they cause silent crashes
2. ✅ Server logs explicitly show what port it's bound to
3. ✅ Railway can see startup logs to debug issues
4. ✅ Code correctly handles Railway's PORT assignment
5. ✅ All environment variables properly configured

**Just make sure MONGODB_URI is set in Railway dashboard Variables!**


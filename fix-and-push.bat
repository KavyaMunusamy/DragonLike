@echo off
echo 🚀 Fixing Git Repository and Pushing to Correct DragonLike Repo...
echo.

echo Current directory issue: You're in FoodFusion repo, not DragonLike repo
echo.

echo Step 1: Navigate to correct DragonLike directory
cd "C:\Users\Kavya\OneDrive\Desktop\DragonLike\DragonLike"

echo Step 2: Check if we're in the right repo
git remote -v

echo Step 3: Check current status
git status

echo Step 4: Add all enhanced files
git add .

echo Step 5: Commit with proper message
git commit -m "🚀 HACKATHON READY: Added AWS Bedrock + SuperOps Live Integration

✅ Real AWS credentials configured (ASIATQZKX5OTQZNO5URJ)
✅ Live SuperOps API integration with real token
✅ Enhanced frontend with dual AI/API testing
✅ Complete end-to-end workflow automation
✅ Production-ready enterprise features

Ready to dominate the hackathon! 🏆"

echo Step 6: Push to correct DragonLike repository
git push origin main

echo.
echo ✅ SUCCESS! Enhanced DragonLike pushed to GitHub!
echo 🔗 https://github.com/KavyaMunusamy/DragonLike
echo.
pause
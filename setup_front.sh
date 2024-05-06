rm -rf backend/public/
cd frontend && 
npm run build && 
cd .. &&
cp -R frontend/build backend/public/

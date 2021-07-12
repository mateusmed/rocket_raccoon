whoami
npm install
cd src/

pm2 ls
pm2 delete -s rocket_raccon || :
pm2 start index.js --name rocket_raccon -f
pm2 save

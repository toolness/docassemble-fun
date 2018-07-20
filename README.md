## Quick start

In one terminal, run `docker-compose up`.

Once you see that apache2 has started up, visit http://localhost/ and login
as `admin@admin.com` with password `password`. You'll be asked to change the
password; set it to something with least eight characters long with at least one
lowercase letter and one number.

Then visit the "playground" section of the docassemble site from the top-right
menu and click "Save" followed by "Save and Run".

In another terminal, run `npm install`, set the `PASSWORD` environment variable
to the password you just used, and run `npm run build` followed by `npm start`.

Now edit `test.yml`.  Once you save it, you should be able to reload the
playground interview in your browser and see the updated interview.

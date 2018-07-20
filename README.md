This repository contains some experimentation with [docassemble][].

[docassemble]: https://docassemble.org/

## Prerequisites

You'll need [Docker][] and [NodeJS][].

[Docker]: http://docker.com
[NodeJS]: http://nodejs.org

## Quick start

In one terminal, run `docker-compose up`. This will start up docassemble.

Note that docassemble may take a while to get all its services running.
Eventually you should see a message that looks something like this:

```
app_1  | 2018-07-20 09:19:34,431 INFO spawned: 'apache2' with pid 448
```

This means that the apache2 web server has started up, so docassemble
*should* be ready to visit. Try visiting http://localhost/ and login
as `admin@admin.com` with password `password`. You'll be asked to change the
password; set it to something with least eight characters long with at least one
lowercase letter and one number.

## Editing interviews your favorite text editor

docassemble provides a web page that allows you to edit playground
interviews, but you might want to edit interviews in your favorite text
editor instead.

To do this, first visit the "playground" section of the docassemble site
from the top-right menu and click "Save" followed by "Save and Run".

In another terminal, run `npm install`, set the `PASSWORD` environment variable
to the password you just used, and run `npm start`.

Now edit `test.yml`.  Once you save it, you should be able to reload the
playground interview in your browser and see the updated interview.

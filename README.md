# OPIS ZADATKA
Potrebno je napraviti JavaScript aplikaciju koristeći React framework koja prikazuje događaje.
Događaji se trebaju povlačiti s Google Calendar API-a ( https://developers.google.com/calendar/ ) - dokumentacija za API se nalazi na
https://developers.google.com/calendar/v3/reference/ .

Aplikacija treba sadržavati login stranicu i glavnu stranicu sa sadržajem.
Potrebno je imati sljedeće funkcionalnosti:
- Login na prvoj stranici u aplikaciju putem Google OAuth-a, nakon čega se korisnik
  preusmjerava na glavnu stranicu
- Prikaz događaja iz korisnikovog kalendara na glavnoj stranici, dodavanje novih te
  brisanje postojećih
  
Po defaultu, na glavnoj stranici se prikazuju događaji unutar sljedećih 7 dana (od trenutnog dana). Osim toga, vremenski raspon prikaza može se postaviti na 1, 7 ili 30 narednih dana.
Izgled događaja treba biti jednostavan (ime, datum i vrijeme početka i završetka). Zbog jednostavnosti, svi događaji počinju i završavaju na isti dan. Svaki događaj također sadrži i akciju za brisanje.

Događaje je potrebno prikazati u listi. Događaji su sortirani po vremenu početka i grupirani po danu (izgled kalendara ne treba oponašati izgled Google Calendara, već treba imati oblik jednostavne liste). Ukoliko je vremenski raspon 30 dana, događaje je potrebno grupirati po tjednima, a ne po danima.

Osim prikazivanja, aplikacija mora podržavati i dodavanje novih događaja, odnosno brisanje postojećih. Dodavanje događaja također mora biti jednostavno (samo ime, te datum i vrijeme početka i završetka - zanemariti dodatne opcije kao što su attendees , repeat-anje, itd).

Što se tiče user interfacea za dodavanje novih događaja, to može bili ili unutar postojeće stranice ili na novoj stranici (ili nekako treće).




## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

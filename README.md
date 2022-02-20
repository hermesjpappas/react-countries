# Country Search React App

<img src="countries.png" alt="Preview of the app"/>

This is an app built with React.js and Tailwind CSS which uses the REST Countries API (v3) to display flags and information about different countries.

You can search for any country, with a forgiving search that filters out dashes, parentheses, commas and diacriticals, but also responds to the original, intact name including those. You can also search both those versions of the names using their individual parts (e.g. type "bis" to get "Guinea-Bissau" or type "pri" to get "São Tomé and Príncipe").

You can click on any country and see a details page about it which has some info about the country, a Wikipedia link and a map. 

On that page, you can click on its
flag or coat of arms to see a pop-up displaying a larger version of them. 

From the same details page, you can click
any of the flags of the countries it borders with and go to their details, like a Wikipedia rabbit-hole.

<a href="https://hjp-world.netlify.app" target="_blank">Try it out!</a>

Notes: Should be responsive from any width of 280px and above.

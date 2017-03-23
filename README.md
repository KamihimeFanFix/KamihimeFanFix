# KamihimeFanFix
A user script designed to allow players to fix mistranslations by Nutaku in Kamihime.

## How to obtain missing language files
You can obtain files that are not currently in the repo by opening the Chrome dev tools (F12) going to the network tab and then launching the scene that you would like to get the language files for.

For example here is the window after opening Nike's introduction scene.
![](https://vgy.me/PbAH5X.png)

As you can see there is a file in the list named 41_harem-character, this is the file we are looking for. You can verify you have the right file by right clicking on it and opening it in a new tab. There you should be able to find the text for the first line of the scene.

## How to contribute changes
To contribute changes you can create a pull request for this repo. Simply fork this repo make your changes in your own copy and then submit a pull request for review. Once it is accepted it then will be available for anyone using the script.

## How to test changes
To test changes you will have to edit a single line of code in your userscript to use your repository instead of this one.
```javascript
return e.url = 'https://kamihimefanfix.github.io/KamihimeFanFix' + e.url + '.json', e;
```

Simply replace the url in the above code found in the userscript to point to your fork and be sure to turn on github pages in your repo settings.

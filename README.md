# Nexus IO

Nexus is a Peer-to-Peer Micro Social Network.  
Nexus IO is a Nexus reader and editor app in vanilla JS.

Demo available on the project website: [nexus-dock.github.io](https://nexus-dock.github.io/)

<img src="doc/NxIO-editor-screenshot.png" height="200px" />
<img src="doc/NxIO-reader-screenshot.png" height="200px" />

***

## Use the App

### Quickstart

Copy the snippet, change the `data-src`, and paste it in an html page.  

```html
<div id="Nexus" data-src="http://website.com/path/to/your/nexus/file.json#optional-thread-id"></div>
<script src="https://cdn.jsdelivr.net/gh/I-is-as-I-does/Nexus@latest/dist/js/NxIO.js"></script>
```

### Attributes

`data-src`  
Required.  
Specify here the url of the Nexus **json file** you wish to display.  
Add `#some-thread-id` to target a specific thread.  
  
> If the page containing the snippet is on the same server as the Nexus file, it can be a relative path;  
> for example: `source/nexus.json#first-thread`.  
> Otherwise, it must be an absolute path starting with `http://` (or `https://`).
  
`data-style`  
Optional.  
Specify here the **url of the theme** you wish to use.  
If you’re fine with the default theme, you can omit this parameter.   
  
> If the page containing the snippet is on the same server as the theme file, it can be a relative path;   
> for example: `assets/theme.css`.  
> Otherwise, it must be an absolute path starting with `http://` (or `https://`). 
  
`data-lang`  
Optional.  
Specify here the **default language** the app should use.  
If omitted, the app will look for the language specified in the `html` tag, or fallback to English.  
  
> Note that if another language is picked through the interface, this choice will be cached and preferred over the default setting.

Currently supported languages: `en`, `fr`.  
Additional translations are much welcomed!

### Launch the Editor

In your browser address bar, add `?new` or `?edit` to the current url.  
If a query string is already present, use `&new` or `&edit` instead. 

### Enable Console Logs

Add `?log` (or `&log`) to the current url.  

> Among other things, this can be useful to understand why a distant Nexus is not loading.

## Reader Overview

### Modules

`< ≚ >`  
History module.  

`</>`  
Snippets module.  

`First Column`  
Current Nexus author and threads list.  

`#local`  
Current thread description and its content.  

`#distant`  
Other threads and instances linked to the current local thread.  
If there is more than one distant content, you can navigate them using `⊻` and `⊼`.  

### Links

Clicking on an author handle will load its Nexus.  
To display a thread, pick one in the index list.  
Thread links in the distant module will both load the distant Nexus and related thread.  

### Hints

If a thread has not yet been visited, or if its content has been updated since your last visit, its link will be followed by an asterisk: `*`.  
  
To reset hints, **clear the app cache**.   
In your browser address bar, add `?clear` to the current url.  
If a query string is already present, use `&clear` instead.  

> This will **not** erase the editor local saves.

## Editor Overview

### Validation

Indications between brackets are hints at the field requirement.  

`[3-30]` for example indicates min. and max. characters.  
`[http]` states that the field must be a valid `http` url.  

A valid field is marked with a `✓`, an invalid one with a `✗`.  
Make sure **all your fields are valid**, or your Nexus might not load at all.  

#### Linked Threads

When you enter a Nexus url in a `linked threads` field, the app will check if it loads correctly.  

> If the field gets marked as invalid, there’s probably something wrong: 
> either the link is broken, the distant Nexus data is invalid, or the request was refused.  

#### Media Type

The form will try to guess which type of media url you’re sharing and automatically set the media `Type` field.  
Just make sure it got it right!

### Preview

Switch to `Preview Mode` by clicking on the eye icon.  
Revert to the editor with the pen icon.  

### Actions
  
Back and forward arrows lets you undo / redo your last action.  
  
Circling arrow will revert data to its original state.  
File icon create a new Nexus.  
Folder icon allows you to load a Nexus .json file from your device.  

#### Saving Data
  
Save icon **temporarily** store the current state in your **browser cache**.  
`new` and `edit` keywords have independent save slots.
To erase editor saves: in your browser address bar, add `&erase` to the current url.  
  
> If you configured your browser to prevent the use of local storage, there is no backup.  
> If you clear up your browser cache, the data will be gone.  
> The cache is also **domain dependent**. If you edit your data from another website, the saved data will not be available.

Downward arrow will generate a .json file and **download it** on your device.
This is the safe and sure way to **save** your Nexus data.

***

## Edit Source Code

This app uses [Nexus Core](https://github.com/I-is-as-I-does/Nexus-Core) for a good part of its logic; you might want to take a look at this repository too.  
It will be installed as a dependency.  

### Clone

```bash
git clone https://github.com/I-is-as-I-does/Nexus-IO
```

### Install

```bash
npm install
```

### Dev Build

Target directory: `public/`

```bash
npm run build:dev
```

### Prod Build

Target directory: `dist/`

```bash
npm run build:prod
```

## Related

For apps, documentation, demo, starter kits, ... cf. [github.com/I-is-as-I-does/Nexus](https://github.com/I-is-as-I-does/Nexus) 

## License

This project is under the **GNU AGPLv3 License**. 

<a href='https://ko-fi.com/I2I17EOYP' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://cdn.ko-fi.com/cdn/kofi2.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

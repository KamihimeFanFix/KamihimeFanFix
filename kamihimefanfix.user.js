// ==UserScript==
// @name         KamihimeFanFix
// @namespace    https://kamihimefanfix.github.io/kamihimefanfix
// @version      0.2
// @description  A user script designed to allow players to fix mistranslations by Nutaku in Kamihime PROJECT R.
// @author       You
// @match        https://cf.r.kamihimeproject.dmmgames.com/*
// @exclude      https://cf.r.kamihimeproject.dmmgames.com/front/cocos2d-proj/components-pc/scenario/tyrano.html
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @run-at       document-end
// ==/UserScript==
setTimeout(hijackkh, 1);
KFFjQuery = jQuery.noConflict(true);
var replacementIndex;

KFFjQuery.ajax({
    type: 'GET',
    url: 'https://kamihimefanfix.github.io/KamihimeFanFix/index.json',
    dataType: 'json',
    success: setReplacementIndex
});

function setReplacementIndex(e) {
    replacementIndex = e;
}

function hijackkh () {
    if(typeof kh !== 'undefined') {
        try {
            var haremSceneInstance = kh.createInstance("apiHaremScenes");
            haremSceneInstance.get = getHaremScene.bind(haremSceneInstance);
            var scenarioInstance = kh.createInstance("apiScenarios");
            scenarioInstance.get = getScenarioScene.bind(scenarioInstance);
            var httpSuperAgentConnection = kh.createInstance("HttpSuperAgentConnection");
            httpSuperAgentConnection._connect = customConnect.bind(httpSuperAgentConnection);
            console.log("successfully hijacked kamihime");
        } catch (e) {
            setTimeout(hijackkh, 1);
        }
    } else {
        setTimeout(hijackkh, 1);
    }
}

function getHaremScene(e) {
    //overwrite url delegate
    overwriteURLDelegate(this);
    //do normal request
    var data = this._http.get({
        url: "/harem_scenes/" + e
    });
    return data;
}

function getScenarioScene(e) {
    //overwrite url delegate
    overwriteURLDelegate(this);
    //do normal request
    var data = this._http.get({
        url: "/scenarios/" + e
    });
    return data;
}

function overwriteURLDelegate(e) {
    e._http._URLDelegate.process = URLDelegate.bind(e);
}

function URLDelegate(e) {
    var path = e.urlOrg.split("/").filter(Boolean);
    if (replacementIndex[path[0]] && replacementIndex[path[0]][0] == path[1]) {
        console.log('acquiring replacmeent for ' + e.url);
        return e.url = 'https://kamihimefanfix.github.io/KamihimeFanFix' + e.url + '.json', e;
    } else {
        return e.url = kh.env.urlRoot + e.url.replace(/^https?:\/\/[^\/]+?\//, "/"), e;
    }
}

function customConnect(e) {
    var t = Q.defer();
    if(e.url.match(/http[s]?:\/\/cf\.r\.kamihimeproject\.dmmgames\.com/)) {
        e.withCredentials = reqWithCredentials.bind(e);
    } else {
        e.withCredentials = reqWithoutCredentials.bind(e);
    }
    return e.withCredentials(), e.on("error", function(e) {
        t.reject(e);
    }), e.end(function(e) {
        if(e.ok) {
            t.resolve(e);
        } else {
            t.reject(e);
        }
        this._updateCsrfTokenIfExists();
    }.bind(this)), t.promise;
}

function reqWithCredentials() {
    return this._withCredentials = !0, this;
}

function reqWithoutCredentials() {
    return 0, this;
}

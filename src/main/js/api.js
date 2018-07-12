/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 */
import {getJSON} from 'sonar-request';
import axios from "axios"; // see https://github.com/SonarSource/sonarqube/blob/master/server/sonar-web/src/main/js/app/utils/exposeLibraries.js

export function findIssueAndToRedmine(project) {
    return getJSON('/api/issues/search', {
        p: 1,
        ps: 50,
        componentKey: project.key
    }).then(function (response) {
        var data = [];
        var numberOfIssue = 0;
        const numberOfIssueList = response.issues.length;
        if (numberOfIssueList > 0) {
            for (let i = 0; i < numberOfIssueList; i++) {
                let result = {
                    key: response.issues[i].key,
                    rule: "",
                    severity: "",
                    component: "",
                    line: "",
                    message: "",
                    type: ""
                };
                result.component = response.issues[i].component;
                result.line = response.issues[i].line;
                result.message = response.issues[i].message;
                result.rule = response.issues[i].rule;
                result.severity = response.issues[i].severity;
                result.type = response.issues[i].type;
                data[numberOfIssue] = result;
                numberOfIssue++;
            }
        }
        return data;
    });
}

export function RedmineSettingsAPI() {
    var projectData = [];
    var trackerData = [];
    var userData = [];
    var settingData = [];

    return axios.get('/api/settings/values?keys=sonar.redmine.hosturl,sonar.redmine.api-access-key').then(function (RedmineSettingsInfo) {
        const redmineSettingsData = RedmineSettingsInfo.data.settings.length;
        for (let i = 0; i < redmineSettingsData; i++) {
            if (RedmineSettingsInfo.data.settings[i].key === 'sonar.redmine.hosturl') {
                var url = RedmineSettingsInfo.data.settings[i].value;
            }
            else {
                var acc = RedmineSettingsInfo.data.settings[i].value;
            }
        }
        axios({
            headers: {
                'X-Redmine-API-KEY': acc,
                'Content-Type': 'application/json'
            },
            method: 'get',
            limit: 1000,
            url: url + '/projects.json'
        }).then(function (RedmineProjectInfo) {
            var number = 0;
            for (let i = 0; i < RedmineProjectInfo.data.projects.length; i++) {
                let projects = {
                    id: RedmineProjectInfo.data.projects[i].identifier,
                    name: ''
                };
                projects.name = RedmineProjectInfo.data.projects[i].name;
                projectData[number] = projects
                number++;
            }
            settingData[0] = projectData;
        });
        axios({
            headers: {
                'X-Redmine-API-KEY': acc,
                'Content-Type': 'application/json'
            },
            method: 'get',
            url: url + '/trackers.json'
        }).then(function (RedmineTrackerInfo) {
            var number = 0;
            for (let i = 0; i < RedmineTrackerInfo.data.trackers.length; i++) {
                let trackers = {
                    id: RedmineTrackerInfo.data.trackers[i].id,
                    name: ''
                };
                trackers.name = RedmineTrackerInfo.data.trackers[i].name;
                trackerData[number] = trackers
                number++;
            }
            settingData[1] = trackerData;
        });
        axios({
            headers: {
                'X-Redmine-API-KEY': acc,
                'Content-Type': 'application/json'
            },
            method: 'get',
            limit: 1000,
            url: url + '/users.json'
        }).then(function (RedmineUserInfo) {
            var number = 0;
            for (let i = 0; i < RedmineUserInfo.data.users.length; i++) {
                let users = {
                    id: RedmineUserInfo.data.users[i].id,
                    firstname: '',
                    lastname: ''
                };
                users.firstname = RedmineUserInfo.data.users[i].firstname;
                users.lastname = RedmineUserInfo.data.users[i].lastname;
                userData[number] = users
                number++;
            }
            settingData[2] = userData;
        });
        return settingData;
    });
}

export function saveSettingToRedmine(project) {
    let saveSettingsData = [];
    return axios({
        method: 'GET',
        url: '/api/settings/values?component=' + project.key + '&keys=sonar.redmine.hosturl,sonar.redmine.api-access-key,sonar.redmine.project-key,sonar.redmine.tracker-id,sonar.redmine.user-id'
    }).then(function (RedmineSettingsInfo) {
        const redmineSettingsData = RedmineSettingsInfo.data.settings.length;
        for (let i = 0; i < redmineSettingsData; i++) {
            if (RedmineSettingsInfo.data.settings[i].key === 'sonar.redmine.hosturl') {
                var url = RedmineSettingsInfo.data.settings[i].value;
            }
            else if (RedmineSettingsInfo.data.settings[i].key === 'sonar.redmine.api-access-key') {
                var acc = RedmineSettingsInfo.data.settings[i].value;
            }
            else if (RedmineSettingsInfo.data.settings[i].key === 'sonar.redmine.project-key') {
                var project = RedmineSettingsInfo.data.settings[i].value;
            }
            else if (RedmineSettingsInfo.data.settings[i].key === 'sonar.redmine.tracker-id') {
                var tracker = RedmineSettingsInfo.data.settings[i].value;
            }
            else {
                var user = RedmineSettingsInfo.data.settings[i].value;
            }
        }
        axios({
            headers: {
                'X-Redmine-API-KEY': acc,
                'Content-Type': 'application/json'
            },
            method: 'get',
            url: url + '/projects/' + project + '.json'
        }).then(function (RedmineProjectInfo) {
            if (RedmineProjectInfo.data.project != null) {
                let projects = {
                    id: RedmineProjectInfo.data.project.identifier,
                    value: RedmineProjectInfo.data.project.name,
                    label: RedmineProjectInfo.data.project.name
                };
                saveSettingsData[0] = projects;
            }
        });
        axios({
            headers: {
                'X-Redmine-API-KEY': acc,
                'Content-Type': 'application/json'
            },
            method: 'get',
            url: url + '/projects/' + project + '.json?include=trackers'
        }).then(function (RedmineTrackerInfo) {
            for (let i = 0; i < RedmineTrackerInfo.data.project.trackers.length; i++) {
                if (RedmineTrackerInfo.data.project.trackers[i].id == parseInt(tracker)) {
                    let trackers = {
                        id: RedmineTrackerInfo.data.project.trackers[i].id,
                        value: RedmineTrackerInfo.data.project.trackers[i].name,
                        label: RedmineTrackerInfo.data.project.trackers[i].name
                    };
                    saveSettingsData[1] = trackers
                }
            }
        });
        axios({
            headers: {
                'X-Redmine-API-KEY': acc,
                'Content-Type': 'application/json'
            },
            method: 'get',
            url: url + '/users/' + user + '.json'
        }).then(function (RedmineUserInfo) {
            let users = {
                id: RedmineUserInfo.data.user.id,
                value: RedmineUserInfo.data.user.firstname,
                label: RedmineUserInfo.data.user.firstname
            };
            saveSettingsData[2] = users;
        });
        return saveSettingsData;
    });
}

export function IssueToRedmine(key, rule, message) {
    var issuekey = key;
    var issuerule = rule;
    var message = message;
    axios.get('/api/settings/values?keys=sonar.redmine.hosturl,sonar.redmine.api-access-key,sonar.redmine.project-key,sonar.redmine.tracker-id,sonar.redmine.user-id')
        .then(function (sonarPredmine) {
            const sonarkeylength = sonarPredmine.data.settings.length;
            for (let i = 0; i < sonarkeylength; i++) {
                if (sonarPredmine.data.settings[i].key === 'sonar.redmine.hosturl') {
                    var url = sonarPredmine.data.settings[i].value;
                }
                else if (sonarPredmine.data.settings[i].key === 'sonar.redmine.api-access-key') {
                    var acc = sonarPredmine.data.settings[i].value;
                }
                else if (sonarPredmine.data.settings[i].key === 'sonar.redmine.project-key') {
                    var project = sonarPredmine.data.settings[i].value;
                }
                else if (sonarPredmine.data.settings[i].key === 'sonar.redmine.tracker-id') {
                    var tracker = sonarPredmine.data.settings[i].value;
                }
                else {
                    var user = sonarPredmine.data.settings[i].value;
                }
            }
            const PostData={
                'issue': {
                    'project-id': project,
                    'subject': issuerule,
                    'tracker_id': tracker,
                    'assigned_to_id': user,
                    'description': rule + "\n" + message + "\n\n" + "Check it on SonarQube"
                }
            };
            axios({
                headers: {
                    'X-Redmine-API-KEY': acc,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                url: url + '/issues.json',
                data:PostData
            }).then(function (restRedmine) {
                if (restRedmine.status === 200) {
                    axios({
                        method: 'POST',
                        url: '/api/issues/bulk_change',
                        issues: issuekey,
                        comment: url + '/issues/' + restRedmine.data.id
                    })
                }
            });
        });
}

export function TFRedmine(issue) {
    return axios({
        method: 'GET',
        url: '/api/issues/search?issues=' + issue
    }).then(function (TFIssueResponse) {
        console.log(TFIssueResponse)
        let commentData = {};
        if (TFIssueResponse.data.issues.comments!==undefined) {
            commentData = TFIssueResponse.data.issues.comments.htmlText;
        } else {
            commentData=false;
        }
        return commentData
    })
}

export function settingToRedmineProject(project, redmine_projectid) {
    axios({
        method: 'POST',
        url: '/api/settings/set?component=' + project.key + '&key=sonar.redmine.project-key&value=' + redmine_projectid
    });
}
export function settingToRedmineTracker(project, redmine_trackerid) {
    axios({
        method: 'POST',
        url: '/api/settings/set?component=' + project.key + '&key=sonar.redmine.tracker-id&value=' + redmine_trackerid
    });
}
export function settingToRedmineUser(project, redmine_userid) {
    axios({
        method: 'POST',
        url: '/api/settings/set?component=' + project.key + '&key=sonar.redmine.user-id&value=' + redmine_userid
    })
}